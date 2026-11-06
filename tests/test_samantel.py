"""Samantel parser tests. Run from the repo root:  python -m unittest discover tests -v"""
import copy
import json
import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'scraper'))
import scraper  # noqa: E402

with open(os.path.join(os.path.dirname(__file__), 'fixtures', 'samantel-friday.json'), encoding='utf-8') as f:
    FRIDAY = json.load(f)


def parse(payload, prev=()):
    skipped = []
    return scraper.samantel(json.dumps(payload), skipped, prev), skipped


def not_friday(payload):
    """What the API sends on any other day: the normal price in `price`, no `oldPrice`."""
    p = copy.deepcopy(payload)
    for r in p['result']:
        if r.get('oldPrice'):
            r['price'] = r['oldPrice']
            r['priceNoTax'] = r['oldPriceNoTax']
            del r['oldPrice'], r['oldPriceNoTax']
    return p


class Samantel(unittest.TestCase):
    def setUp(self):
        self.pk, self.skipped = parse(FRIDAY)
        self.by = {p['sid']: p for p in self.pk}

    def test_only_normal_and_night_packages(self):
        general = [p for p in self.pk if p['mb']]
        night = [p for p in self.pk if p['night_mb']]
        self.assertEqual((len(general), len(night)), (18, 2))
        self.assertEqual(len(self.pk) + len(self.skipped), len(FRIDAY['result']))
        for name in ('نذرآب', 'رومینگ', 'پیامک'):
            self.assertFalse([p for p in self.pk if name in p.get('note', '')])
        self.assertTrue(all(p['op'] == 'samantel' and p['fixed_mb'] == 0 and p['price'] > 0 for p in self.pk))

    def test_prices_are_toman_with_vat(self):
        # 1 day, 1 GB: 105,600 rial with VAT = 10,560 toman on Friday, 17,600 normally
        p = self.by[350]
        self.assertEqual((p['mb'], p['days'], p['price'], p['fri_price']), (1024, 1, 17600, 10560))
        # the biggest package: 400 GB, 365 days
        p = self.by[1293]
        self.assertEqual((p['mb'], p['days'], p['price'], p['fri_price']), (409600, 365, 3850000, 2310000))

    def test_friday_is_exactly_40_percent_off(self):
        discounted = [p for p in self.pk if 'fri_price' in p]
        self.assertEqual(len(discounted), 14)
        for p in discounted:
            self.assertLess(p['fri_price'], p['price'])
            self.assertEqual(p['fri_price'], round(p['price'] * 0.6), p)
        self.assertFalse([s for s in self.skipped if 'not 40%' in s[2]])

    def test_no_discount_for_x2_night_and_150gb(self):
        for sid in (385, 389, 631, 619, 878, 879):
            self.assertNotIn('fri_price', self.by[sid], sid)

    def test_x2_packages_count_double_volume(self):
        self.assertEqual([self.by[s]['mb'] for s in (385, 389, 631)], [16384, 20480, 40960])
        self.assertEqual([self.by[s]['note'] for s in (385, 389, 631)], ['۸ گیگ × ۲', '۱۰ گیگ × ۲', '۲۰ گیگ × ۲'])
        for s in (385, 389, 631):
            self.assertIn('× ۲', self.by[s]['note'])
        # the ordinary 30 day packages are not doubled
        self.assertEqual(self.by[380]['mb'], 4096)

    def test_night_packages(self):
        for sid, gb in ((878, 14), (879, 20)):
            p = self.by[sid]
            self.assertEqual((p['mb'], p['night_mb'], p['window'], p['days']), (0, gb * 1024, '1-6', 30))

    def test_prices_are_whole_toman(self):
        for p in self.pk:
            self.assertIsInstance(p['price'], int)
            self.assertIsInstance(p.get('fri_price', 0), int)

    def test_other_day_keeps_friday_info_from_last_run(self):
        pk, _ = parse(not_friday(FRIDAY), prev=self.pk)
        self.assertEqual(pk, self.pk)

    def test_other_day_without_history_has_no_friday_prices(self):
        pk, skipped = parse(not_friday(FRIDAY))
        self.assertFalse([p for p in pk if 'fri_price' in p])
        self.assertTrue([s for s in skipped if 'Friday' in s[2]])
        # normal prices are the same either way
        self.assertEqual([p['price'] for p in pk], [p['price'] for p in self.pk])

    def test_api_error_is_not_swallowed(self):
        with self.assertRaises(RuntimeError):
            parse({'errCode': 32, 'errDesc': 'bad number', 'result': []})

    def test_fixture_has_no_phone_number(self):
        self.assertNotIn('9999968669', json.dumps(FRIDAY))


if __name__ == '__main__':
    unittest.main()
