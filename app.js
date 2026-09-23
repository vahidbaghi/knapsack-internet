(() => {
  'use strict';

  const OPS = [
    { id: 'mci', name: 'همراه اول' },
    { id: 'irancell', name: 'ایرانسل' },
    { id: 'rightel', name: 'رایتل' },
    { id: 'shatel', name: 'شاتل موبایل' },
  ];
  const OP = Object.fromEntries(OPS.map(o => [o.id, o]));
  // how long the user needs internet
  const PERIODS = [
    { d: 1, name: 'یه روز', adj: 'یک روزه' },
    { d: 7, name: 'یه هفته', adj: 'یک هفته‌ای' },
    { d: 30, name: 'یه ماه', adj: 'یک ماهه' },
    { d: 90, name: 'سه ماه', adj: 'سه ماهه' },
    { d: 180, name: 'شش ماه', adj: 'شش ماهه' },
    { d: 365, name: 'یه سال', adj: 'یک ساله' },
  ];
  const PERIOD = Object.fromEntries(PERIODS.map(x => [x.d, x]));
  // package validity -> type name, and the "every ..." word used when it is bought again and again
  const KIND = {
    1: ['روزانه', 'روز'], 3: ['سه روزه', 'سه روز'], 7: ['هفتگی', 'هفته'], 15: ['پونزده روزه', 'پونزده روز'],
    30: ['ماهانه', 'ماه'], 60: ['دو ماهه', 'دو ماه'], 90: ['سه ماهه', 'سه ماه'], 120: ['چهار ماهه', 'چهار ماه'],
    180: ['شش ماهه', 'شش ماه'], 365: ['یک ساله', 'سال'],
  };
  const PRESETS = [50000, 100000, 200000, 500000];
  const STEPS = ['op', 'd', 't', 'b'];

  const $ = s => document.querySelector(s);
  const nf = new Intl.NumberFormat('fa-IR');
  const nf1 = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 });
  const fa = n => nf.format(Math.round(n));
  const toEn = s => String(s).replace(/[۰-۹]/g, c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c));
  const vol = mb => mb < 1024 ? `${fa(mb)} مگ` : `${nf1.format(mb / 1024)} گیگ`;
  const toman = t => t >= 1e6 ? `${nf1.format(t / 1e6)} میلیون تومن` : t >= 1000 ? `${nf1.format(t / 1000)} هزار تومن` : `${fa(t)} تومن`;
  const short = t => t >= 1e6 ? `${nf1.format(t / 1e6)} میلیون` : `${nf1.format(t / 1000)} هزار`;
  const windowLabel = w => {
    const [a, b] = w.split('-').map(Number);
    const part = h => h < 12 ? 'صبح' : h === 12 ? 'ظهر' : 'عصر';
    return part(a) === part(b) ? `${fa(a)} تا ${fa(b)} ${part(b)}` : `${fa(a)} ${part(a)} تا ${fa(b)} ${part(b)}`;
  };
  const dot = op => `<span class="dot" style="background:var(--op-${op})"></span>`;

  let PKGS = [];

  // ------------------------------------------------------------ answers live in the URL
  // so the browser back button walks back through the questions and a result can be shared
  function answers() {
    const q = new URLSearchParams(location.hash.slice(1));
    const a = {};
    if (OP[q.get('op')] || q.get('op') === 'any') a.op = q.get('op');
    if (PERIOD[q.get('d')]) a.d = +q.get('d');
    if (q.has('t')) a.t = q.get('t').split(',').filter(Boolean);
    if (+q.get('b') > 0) a.b = Math.min(+q.get('b'), 1e8);
    return a;
  }
  function go(a) {
    const q = new URLSearchParams();
    for (const k of STEPS) if (a[k] != null) q.set(k, Array.isArray(a[k]) ? a[k].join(',') : a[k]);
    location.hash = q.toString().replace(/%2C/g, ',');
  }
  function edit(key) {
    const a = answers();
    delete a[key];
    go(a);
  }

  const opsOf = a => a.op === 'any' ? OPS.map(o => o.id) : [a.op];

  // the package types a user can tick for a given period: each validity length, night packages, home-internet combos
  function kinds(a) {
    const ps = PKGS.filter(p => opsOf(a).includes(p.op) && p.days > 0);
    const out = [...new Set(ps.map(p => p.days))].filter(d => d <= a.d).sort((x, y) => x - y).map(d => {
      const n = ps.filter(p => p.days === d && !p.fixed_mb).length;
      const sub = d < a.d ? `هر ${KIND[d][1]} یکی، تا ${fa(Math.floor(a.d / d))} بار` : '';
      return { key: String(d), name: KIND[d] ? KIND[d][0] : `${fa(d)} روزه`, sub, n, on: true };
    }).filter(k => k.n);
    // packages valid for longer than needed are one choice: their volume works, the extra days are wasted
    const longer = ps.filter(p => p.days > a.d && !p.fixed_mb).length;
    if (longer) out.push({ key: 'l', name: 'بسته های طولانی‌تر', sub: `بیشتر از ${PERIOD[a.d].name} اعتبار دارن`, n: longer, on: false });
    const night = ps.filter(p => p.night_mb).length;
    if (night) out.push({ key: 'n', name: 'شبانه و ساعت خاص', sub: 'مثلا ۲ تا ۷ صبح', n: night, on: true });
    const fixed = ps.filter(p => p.fixed_mb).length;
    if (fixed) out.push({ key: 'f', name: 'همراه + اینترنت ثابت', sub: 'فقط شاتل', n: fixed, on: false });
    return out;
  }

  // which packages are allowed, what each is worth (MB), and how many times it can be bought
  function pool(op, a) {
    const t = new Set(a.t), night = t.has('n'), fixed = t.has('f');
    const kindOk = p => p.days > a.d ? t.has('l') : t.has(String(p.days));
    return PKGS.filter(p => p.op === op && p.days > 0 && kindOk(p) && (fixed || !p.fixed_mb))
      .map(p => ({ p, value: p.mb + (night ? p.night_mb : 0) + (fixed ? p.fixed_mb : 0), max: Math.max(1, Math.floor(a.d / p.days)) }))
      .filter(x => x.value > 0);
  }

  // ------------------------------------------------------------ render
  function render() {
    const a = answers();
    const step = STEPS.find(k => a[k] == null) || 'result';
    const i = step === 'result' ? STEPS.length : STEPS.indexOf(step);
    $('#dots').innerHTML = STEPS.map((_, k) => `<span class="${k <= i ? 'on' : ''}"></span>`).join('');
    $('#back').hidden = !Object.keys(a).length;
    ({ op: askOp, d: askPeriod, t: askKinds, b: askBudget, result })[step](a);
    fit();
    window.scrollTo(0, 0);
  }

  // headings always stay on one line: shrink the font until they fit
  function fit() {
    document.querySelectorAll('#screen .fit').forEach(el => {
      el.style.fontSize = '';
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth + 1 && size > 12) el.style.fontSize = `${--size}px`;
    });
  }

  function screen(html) {
    $('#screen').innerHTML = `<div class="q">${html}</div>`;
  }

  function askOp(a) {
    screen(`<h1 class="fit">سیم‌کارتت مال کدوم اپراتوره؟</h1>
      <div class="options">
        ${OPS.map(o => `<button class="opt" type="button" data-op="${o.id}">${dot(o.id)}${o.name}</button>`).join('')}
        <button class="opt wide" type="button" data-op="any">فرقی نمی‌کنه، همه رو مقایسه کن</button>
      </div>`);
    $('#screen').querySelectorAll('[data-op]').forEach(b => b.onclick = () => go({ ...a, op: b.dataset.op }));
  }

  function askPeriod(a) {
    screen(`<h1 class="fit">اینترنت رو برای چه مدت می‌خوای؟</h1>
      <div class="options">
        ${PERIODS.map(x => `<button class="opt" type="button" data-d="${x.d}">${x.name}</button>`).join('')}
      </div>`);
    // a new period means new package types, so that question is asked again
    $('#screen').querySelectorAll('[data-d]').forEach(b => b.onclick = () => { const n = { ...a, d: +b.dataset.d }; delete n.t; go(n); });
  }

  function askKinds(a) {
    const ks = kinds(a);
    screen(`<h1 class="fit">چه جور بسته هایی بخرم؟</h1>
      <div class="ticks">
        ${ks.map(k => `<label class="tick">
          <input type="checkbox" value="${k.key}" ${k.on ? 'checked' : ''}>
          <span class="box"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg></span>
          <span class="txt"><b>${k.name}</b>${k.sub ? `<small>${k.sub}</small>` : ''}</span>
          <span class="n">${fa(k.n)} بسته</span>
        </label>`).join('')}
      </div>
      <button class="go" id="go" type="button">بعدی</button>`);
    const boxes = [...$('#screen').querySelectorAll('.tick input')];
    const btn = $('#go');
    // at least one validity type has to stay ticked, night/home alone can't be bought
    const ok = () => boxes.some(x => x.checked && !['n', 'f'].includes(x.value));
    boxes.forEach(x => x.onchange = () => { btn.disabled = !ok(); });
    btn.onclick = () => go({ ...a, t: boxes.filter(x => x.checked).map(x => x.value) });
  }

  function askBudget(a) {
    screen(`<h1 class="fit">چقدر می‌خوای خرج کنی؟</h1>
      <label class="money"><input id="budget" type="text" inputmode="numeric" autocomplete="off"><span>تومن</span></label>
      <div class="words" id="words"></div>
      <div class="presets">${PRESETS.map(v => `<button class="preset" type="button" data-v="${v}">${short(v)}</button>`).join('')}</div>
      <button class="go" id="go" type="button" disabled>ببین چی بخرم</button>`);
    const input = $('#budget'), btn = $('#go');
    let val = 0;
    input.oninput = () => {
      val = Math.min(parseInt(toEn(input.value).replace(/\D/g, ''), 10) || 0, 1e8);
      input.value = val ? fa(val) : '';
      $('#words').textContent = val >= 1000 ? toman(val) : '';
      btn.disabled = !val;
    };
    input.onkeydown = e => { if (e.key === 'Enter' && val) go({ ...a, b: val }); };
    btn.onclick = () => go({ ...a, b: val });
    $('#screen').querySelectorAll('.preset').forEach(b => b.onclick = () => go({ ...a, b: +b.dataset.v }));
    if (matchMedia('(hover: hover)').matches) input.focus();
  }

  // ------------------------------------------------------------ result
  function solveFor(op, a) {
    const list = pool(op, a);
    const res = window.Solver.maxValue(list.map(x => ({ cost: x.p.price, value: x.value, max: x.max })), a.b);
    const picks = Object.entries(res.counts).map(([i, n]) => ({ ...list[i], n }))
      .sort((x, y) => y.value * y.n - x.value * x.n);
    return { op, n: list.length, picks, mb: res.value, cost: res.cost, cheapest: list.length ? Math.min(...list.map(x => x.p.price)) : 0 };
  }

  function row(x, a) {
    const { p, n } = x;
    const t = new Set(a.t);
    const parts = [];
    if (p.mb) parts.push(vol(p.mb));
    if (p.night_mb && t.has('n')) parts.push(`${vol(p.night_mb)} شبانه`);
    if (p.fixed_mb && t.has('f')) parts.push(`${vol(p.fixed_mb)} ثابت`);
    // badges: what kind of package, when it can be used, and anything else worth knowing
    const moon = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 7.5A4.5 4.5 0 0 1 4.5 2 4.5 4.5 0 1 0 10 7.5z"/></svg>';
    const badges = [`<span class="bdg">${KIND[p.days] ? KIND[p.days][0] : `${fa(p.days)} روزه`}</span>`];
    if (p.mb) badges.push(`<span class="bdg">${p.night_mb && t.has('n') ? `${vol(p.mb)} ` : ''}۲۴ ساعته</span>`);
    if (p.night_mb && t.has('n')) badges.push(`<span class="bdg hours">${moon}${p.mb ? `${vol(p.night_mb)} ` : 'فقط '}${windowLabel(p.window)}</span>`);
    if (p.fixed_mb && t.has('f')) badges.push(`<span class="bdg">${vol(p.fixed_mb)} اینترنت ثابت خونه</span>`);
    if (p.note) p.note.split('، ').forEach(x => badges.push(`<span class="bdg">${x}</span>`));
    const again = n > 1 ? `<small class="again-note">هر ${KIND[p.days][1]} یکی</small>` : '';
    return `<li>
      <span class="what"><b>${n > 1 ? `${fa(n)} تا ` : ''}${parts.join(' + ')}</b><span class="badges">${badges.join('')}</span></span>
      <span class="price">${fa(p.price * n)} تومن${again}</span>
    </li>`;
  }

  function result(a) {
    const typesLabel = `${fa(a.t.length)} نوع بسته`;
    const pen = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M8 2l2 2-6 6H2V8z"/></svg>';
    const chips = `<div class="answers">
      <button type="button" data-edit="op">${a.op === 'any' ? 'همه اپراتور ها' : OP[a.op].name}${pen}</button>
      <button type="button" data-edit="d">${PERIOD[a.d].adj}${pen}</button>
      <button type="button" data-edit="t"><span class="clip">${typesLabel}</span>${pen}</button>
      <button type="button" data-edit="b">${toman(a.b)}${pen}</button>
    </div>`;

    const all = opsOf(a).map(op => solveFor(op, a)).sort((x, y) => y.mb - x.mb || x.cost - y.cost);
    const cards = all.map((r, k) => {
      let body;
      if (!r.n) body = `<p class="card-none">با این انتخاب ها بسته‌ای نداره</p>`;
      else if (!r.picks.length) body = `<p class="card-none">با این پول هیچی نمیشه خرید. ارزون‌ترینش ${fa(r.cheapest)} تومنه</p>`;
      else body = `<ul class="buy">${r.picks.map(x => row(x, a)).join('')}</ul>
        <p class="sum">جمعش ${fa(r.cost)} تومن${a.b - r.cost >= 1000 ? ` · ${toman(a.b - r.cost)} می‌مونه` : ''}</p>`;
      return `<section class="card${k === 0 && r.mb ? ' first' : ''}">
        <h2 class="fit">${dot(r.op)}<span class="op-name">${OP[r.op].name}</span><span class="total">${r.mb ? vol(r.mb) : '—'}</span></h2>
        ${body}
      </section>`;
    }).join('');

    screen(`${chips}${cards}<button class="again" type="button" id="again">از اول</button>`);
    $('#screen').querySelectorAll('[data-edit]').forEach(b => b.onclick = () => edit(b.dataset.edit));
    $('#again').onclick = () => go({});
  }

  // ------------------------------------------------------------ start
  // back = un-answer the last question (works the same when the page was opened from a shared link)
  $('#back').onclick = () => {
    const a = answers();
    edit([...STEPS].reverse().find(k => a[k] != null));
  };
  window.addEventListener('hashchange', render);
  let rw = innerWidth;
  window.addEventListener('resize', () => { if (innerWidth !== rw) { rw = innerWidth; fit(); } });

  fetch('data.json', { cache: 'no-cache' })
    .then(r => r.json())
    .then(data => {
      PKGS = data.packages;
      try {
        $('#updated').textContent = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { day: 'numeric', month: 'long', year: 'numeric' })
          .format(new Date(data.updated + 'T12:00:00'));
      } catch (e) { $('#updated').textContent = data.updated; }
      render();
    })
    .catch(() => { $('#screen').innerHTML = '<p class="card-none">لیست بسته ها لود نشد. صفحه رو دوباره باز کن.</p>'; });
})();
