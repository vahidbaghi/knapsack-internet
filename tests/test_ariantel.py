"""Ariantel parser tests. Run from the repo root:  python -m unittest discover tests -v"""
import json
import os
import re
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'scraper'))
import scraper  # noqa: E402

with open(os.path.join(os.path.dirname(__file__), 'fixtures', 'ariantel.json'), encoding='utf-8') as f:
    RAW = f.read()


class Ariantel(unittest.TestCase):
    def setUp(self):
        self.skipped = []
        self.pk = scraper.ariantel(RAW, self.skipped)

    def test_student_package_is_left_out(self):
        self.assertEqual(len(self.pk), 17)
        self.assertEqual(len(self.skipped), 1)
        self.assertIn('دانشجو', self.skipped[0][1])

    def test_prices_are_toman_with_vat(self):
        # 1 GB, 1 day: 103,000 rial + 10% VAT = 113,300 rial = 11,330 toman
        p = self.pk[0]
        self.assertEqual((p['mb'], p['days'], p['price']), (1024, 1, 11330))
        for it, p in zip([i for i in json.loads(RAW)['data'] if 'دانشجو' not in i['name']], self.pk):
            self.assertEqual(p['price'] * 10, round(it['once_price'] * 1.1), it['name'])

    def test_volume_and_days_match_the_name(self):
        for it, p in zip([i for i in json.loads(RAW)['data'] if 'دانشجو' not in i['name']], self.pk):
            name = scraper.fa2en(it['name'])
            self.assertEqual(int(re.search(r'(\d+)\s*روزه', name).group(1)), p['days'], name)
            gb = float(re.match(r'\s*([\d.]+)', name).group(1))
            self.assertEqual(p['mb'], round(gb * 1024), name)
        self.assertEqual(self.pk[1]['mb'], 3584)  # "3.5 GB"

    def test_plain_packages(self):
        for p in self.pk:
            self.assertEqual((p['op'], p['night_mb'], p['fixed_mb']), ('ariantel', 0, 0))
            self.assertTrue(set(p) <= {'op', 'mb', 'night_mb', 'fixed_mb', 'days', 'price'})

    def test_error_is_not_swallowed(self):
        with self.assertRaises(ValueError):
            scraper.ariantel('{"result": "error"}', [])


if __name__ == '__main__':
    unittest.main()
