"""
Scrape the internet packages of Irancell, MCI (Hamrah Aval), Rightel and Shatel Mobile
and write them to ../data.json, which the page loads.

    pip install requests beautifulsoup4
    python scraper.py            # fetch from the operators and write ../data.json
    python scraper.py --offline  # rebuild from the pages saved in raw/ by the last run

Only works from an Iranian IP (the operator sites block foreign traffic).

Every package in data.json looks like this:
    op        irancell | mci | rightel | shatel
    mb        volume usable at any hour (MB)
    night_mb  volume usable only at special hours (MB), with `window` naming the hours
    fixed_mb  home internet volume that comes with the package (MB, Shatel combos only)
    days      validity in days (0 = a few hours, see `note`)
    price     toman
    note      short extra info shown under the package
"""
import json
import os
import re
import sys
from datetime import date

import requests
import urllib3
from bs4 import BeautifulSoup

urllib3.disable_warnings()

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, 'raw')
OUT = os.path.join(HERE, '..', 'data.json')
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                    '(KHTML, like Gecko) Chrome/140.0 Safari/537.36'}

URLS = {
    'irancell': 'https://irancell.ir/e/products/5e16bf95d11fd7209ba56b20',
    'mci': 'https://mci.ir/internet-plans',
    'rightel_auth': 'https://portal-api.rightel.ir/user-management/api/v1/auth/authenticate',
    'rightel': 'https://portal-api.rightel.ir/extra-package/api/v1/extra-package-direct/web-site/purchasable-package',
    'shatel': 'https://shatelmobile.ir/plans-tariffs/internet-packages/',
}
RAW_FILES = {'irancell': 'irancell.html', 'mci': 'mci.html', 'rightel': 'rightel_pkgs.json', 'shatel': 'shatel.html'}

FA_DIGITS = str.maketrans('۰۱۲۳۴۵۶۷۸۹', '0123456789')
EN_DIGITS = str.maketrans('0123456789', '۰۱۲۳۴۵۶۷۸۹')


def fa2en(s):
    return s.translate(FA_DIGITS)


def fa_num(s):
    return str(s).translate(EN_DIGITS)


def to_mb(num, unit):
    v = float(num)
    return int(round(v * 1024)) if unit in ('گیگابایت', 'GB') else int(round(v))


def pkg(op, price, days, mb=0, night_mb=0, window=None, fixed_mb=0, note=''):
    p = {'op': op, 'mb': mb, 'night_mb': night_mb, 'fixed_mb': fixed_mb, 'days': days, 'price': int(price)}
    if window:
        p['window'] = window
    if note:
        p['note'] = note
    return p


def fetch(name, offline):
    path = os.path.join(RAW, RAW_FILES[name])
    if offline:
        with open(path, encoding='utf-8') as f:
            return f.read()
    if name == 'rightel':
        h = {**UA, 'Origin': 'https://package.rightel.ir', 'Referer': 'https://package.rightel.ir/'}
        # the package site logs in as the public "website" user and sends that token along
        tok = requests.post(URLS['rightel_auth'], json={'username': 'website'}, headers=h, timeout=60).json()['data']['token']
        r = requests.get(URLS['rightel'], headers={**h, 'Authorization': 'Bearer ' + tok}, timeout=60)
    else:
        r = requests.get(URLS[name], headers=UA, timeout=60, verify=(name != 'mci'))
    r.raise_for_status()
    r.encoding = 'utf-8'
    os.makedirs(RAW, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(r.text)
    return r.text


# ---------------------------------------------------------------- Irancell
IRANCELL_DAYS = {'daily': 1, '3days': 3, '7days': 7, '10days': 10, '14days': 14, '15days': 15, '30days': 30,
                 '60days': 60, '90days': 90, '120days': 120, '180days': 180, '365days': 365}


def irancell(text, skipped):
    out = []
    for p in json.loads(text):
        spec = {s['key']: s for s in p['specification_contents']}
        name = fa2en(p['name']['fa'].strip())
        mb = int(spec['traffic']['desc']['fa'] or 0)
        days = IRANCELL_DAYS.get(spec['package_type']['value'])
        if not mb or days is None:
            skipped.append(('irancell', name, 'no fixed volume'))
            continue
        if 'جمعه' in p['sub_title']['fa']:
            skipped.append(('irancell', name, 'only sold on Fridays'))
            continue
        m = re.match(r'(\d+)(MB|GB)\+(\d+)GB \(2-7AM\)', p['name']['en'])
        if m:
            assert to_mb(m.group(1), m.group(2)) == mb, name
            out.append(pkg('irancell', p['price'], days, mb=mb, night_mb=to_mb(m.group(3), 'GB'), window='2-7'))
        else:
            out.append(pkg('irancell', p['price'], days, mb=mb))
    return out


# ---------------------------------------------------------------- MCI
MCI_DAYS = {'one-day': 1, 'three-days': 3, 'seven-days': 7, 'fifteen-days': 15, 'thirty-days': 30,
            'two-months': 60, 'three-months': 90, 'four-months': 120, 'six-months': 180, 'unlimited-monthly': 30}


def mci(text, skipped):
    out = []
    soup = BeautifulSoup(text, 'html.parser')
    for li in soup.find('ul', {'id': 'alphaPlusPackageList'}).find_all('li', {'class': 'package-list-item'}):
        kind, price = li['data-package-type'], int(li['data-price'])
        days = MCI_DAYS[li['data-duration']]
        txt = ' '.join(li.get_text(' ').split())
        if kind == 'new-sub':
            skipped.append(('mci', li['data-volume'], 'new subscribers only'))
        elif kind == 'sobhanet':
            out.append(pkg('mci', price, days, night_mb=int(li['data-volume']), window='6-12', note='صبحانت'))
        elif kind == 'unlimited':
            m = re.search(r'(\d+) بامداد تا (\d+) صبح', txt)
            fair = re.search(r'بالای (\d+) گیگابایت', txt)
            # "unlimited" slows down past the fair-use cap, so the cap is what we count
            out.append(pkg('mci', price, days, night_mb=to_mb(fair.group(1), 'GB'), window=f'{m.group(1)}-{m.group(2)}',
                           note=f'نامحدود، بالای {fa_num(fair.group(1))} گیگ سرعت کم میشه'))
        else:
            mb = int(li['data-volume'])
            if mb == 2548:  # typo on the site, the text says 2.5 GB
                mb = 2560
            out.append(pkg('mci', price, days, mb=mb))
    return out


# ---------------------------------------------------------------- Rightel
def rightel(text, skipped):
    out, seen = [], set()
    for it in json.loads(text)['data']:
        p = it['purchasablePackage']
        cats = {c['channelCategoryNameEn'] for c in it['channelCategories']}
        name = fa2en(p['purchasablePackageNameFa'].strip())
        if 'internet' not in cats:
            if cats & {'Modem', 'Hybrid'}:
                skipped.append(('rightel', name, '/'.join(cats)))
            continue
        vol = re.search(r'(\d+(?:\.\d+)?)\s*(گیگابایت|مگابایت)', name)
        dur = re.search(r'(\d+)\s*(روزه|ماهه|ساله)', name)
        days = int(dur.group(1)) * {'روزه': 1, 'ماهه': 30, 'ساله': 365}[dur.group(2)]
        mb = to_mb(vol.group(1), vol.group(2))
        desc = fa2en(p['descriptionFa'] or '')
        hours = re.search(r'(\d+)\s*(?:صبح\s*)?الی\s*(\d+)', desc)
        price = p['packagePrice'] // 10  # rial -> toman
        key = (name, price, desc)
        if key in seen:  # every package is listed twice, once for prepaid and once for postpaid
            continue
        seen.add(key)
        if hours:
            out.append(pkg('rightel', price, days, night_mb=mb, window=f'{hours.group(1)}-{hours.group(2)}'))
        else:
            assert not desc.strip(), desc
            out.append(pkg('rightel', price, days, mb=mb))
    return out


# ---------------------------------------------------------------- Shatel Mobile
SHATEL_DAYS = {'hourly': 0, 'daily': 1, '3day': 3, 'weekly': 7, '15day': 15, 'monthly': 30, '2month': 60,
               '3month': 90, '6month': 180, 'annual': 365}


def shatel(text, skipped):
    out = []
    soup = BeautifulSoup(text, 'html.parser')
    for box in soup.select('div.lte-pack-new.pack.lte-packages.list-item.box'):
        info = box.find('div', {'class': 'filter-range-info'})
        tags = [s.get('class', [''])[0] for s in info.find_all('span')]
        # the hidden "package_size" field has typos, the visible text is right
        inc = fa2en(' '.join(box.find('div', {'class': 'lte2-includes'}).get_text(' ').split()))
        price = int(re.sub(r'\D', '', fa2en(box.find('div', {'class': 'lte2-price'}).get_text())))
        days = SHATEL_DAYS[next(t for t in tags if t in SHATEL_DAYS)]
        m = re.match(r'(\d+(?:\.\d+)?)\s*(گیگابایت|مگابایت)', inc)
        if not m:
            skipped.append(('shatel', inc, 'no internet volume'))
            continue
        fixed = re.search(r'(\d+)\s*گیگابایت ثابت', inc)
        notes = []
        if days == 0:
            hrs = re.search(r'(\d+)\s*ساعته', fa2en(box.find('div', {'class': 'lte2-title'}).get_text()))
            notes.append(f'{fa_num(hrs.group(1))} ساعته')
        if 'مکالمه' in inc:
            notes.append('همراه با مکالمه' + (' و پیامک' if 'پیامک' in inc else ''))
        if 'ماهانه' in inc:
            notes.append('حجم ماه به ماه تقسیم میشه')
        if 'promotion' in tags:
            notes.append('پیشنهاد ویژه')
        out.append(pkg('shatel', price, days, mb=to_mb(m.group(1), m.group(2)),
                       fixed_mb=to_mb(fixed.group(1), 'GB') if fixed else 0, note='، '.join(notes)))
    return out


def main():
    offline = '--offline' in sys.argv
    skipped, packages, counts = [], [], {}
    for name, parse in [('irancell', irancell), ('mci', mci), ('rightel', rightel), ('shatel', shatel)]:
        got = parse(fetch(name, offline), skipped)
        if not got:
            sys.exit(f'{name}: no packages found, the site has probably changed. data.json was not touched.')
        counts[name] = len(got)
        packages += got
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump({'updated': date.today().isoformat(), 'packages': packages}, f, ensure_ascii=False, indent=1)
    print('packages:', counts)
    print('skipped:')
    for s in skipped:
        print('  ', *s)


if __name__ == '__main__':
    main()
