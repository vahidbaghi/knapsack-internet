// Solver + Samantel data checks.  Run from the repo root:  node --test "tests/*.test.js"
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

global.window = {};
require('../solver.js');
const { maxValue } = window.Solver;
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data.json'), 'utf8'));
const sam = data.packages.filter(p => p.op === 'samantel');

// same rule as app.js: every general package of the right validity, 24h volume only (night packages off)
function solve(budget, friday, days = 365) {
  const items = sam.filter(p => p.mb && p.days <= days)
    .map(p => ({ cost: friday && p.fri_price ? p.fri_price : p.price, value: p.mb, max: Math.floor(days / p.days) }));
  return { items, ...maxValue(items, budget) };
}

test('samantel data is in data.json and well formed', () => {
  assert.ok(sam.length > 0);
  for (const p of sam) {
    assert.ok(Number.isInteger(p.price) && p.price > 0, JSON.stringify(p));
    assert.ok(p.days > 0 && (p.mb > 0 || p.night_mb > 0));
    assert.equal(p.fixed_mb, 0);
    if (p.fri_price) assert.ok(p.fri_price < p.price && Number.isInteger(p.fri_price));
    if (p.night_mb) assert.equal(p.window, '1-6');
  }
  assert.equal(new Set(sam.map(p => p.sid)).size, sam.length, 'offer ids are unique');
  assert.ok(!/9\d{9}/.test(JSON.stringify(data)), 'no phone number in data.json');
});

// counts change with every price update, so only check that every operator is there
test('every operator has packages', () => {
  const ops = new Set(data.packages.map(p => p.op));
  assert.deepEqual([...ops].sort(), ['ariantel', 'irancell', 'mci', 'rightel', 'samantel', 'shatel']);
});

test('with 21,000,000 rial (2,310,000 toman) on a Friday the 400 GB year package wins', () => {
  const r = solve(2310000, true);
  assert.equal(r.value, 409600);
  assert.equal(r.cost, 2310000);
});

test('a Friday never gives less than a normal day, and the budget is never broken', () => {
  for (const b of [10000, 11000, 50000, 100000, 354000, 1000000, 2100000, 2310000, 3000000, 5000000]) {
    const n = solve(b, false), f = solve(b, true);
    assert.ok(n.cost <= b && f.cost <= b, `budget ${b}`);
    assert.ok(f.value >= n.value, `budget ${b}: friday ${f.value} < normal ${n.value}`);
  }
});

test('Friday is a real gain for a budget that buys discounted packages', () => {
  const n = solve(2310000, false), f = solve(2310000, true);
  assert.ok(f.value > n.value * 1.3,`${f.value} vs ${n.value}`);
});

test('too little money buys nothing', () => {
  const r = solve(9000, true);
  assert.equal(r.value, 0);
  assert.deepEqual(r.counts, {});
});
