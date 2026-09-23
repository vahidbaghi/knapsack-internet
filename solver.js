// 0/1 knapsack: which packages give the most MB for at most `budget` toman.
//
// items: [{cost, value, max}]  cost in toman, value in MB, max = how many times it can be bought
// returns {counts: {itemIndex: n}, value, cost}
//
// Prices go up to millions of toman, so the DP table is capped at CELLS columns. Prices are
// rounded UP to the cell size, so an answer never breaks the budget. Below 100k toman it is exact.

window.Solver = (() => {
  const CELLS = 100000;

  // bounded knapsack -> 0/1 knapsack: 5 copies become parts of 1, 2 and 2
  function split(items) {
    const parts = [];
    items.forEach((it, i) => {
      let left = Math.max(1, it.max | 0), k = 1;
      while (left > 0) {
        const n = Math.min(k, left);
        parts.push({ i, n, cost: it.cost * n, value: it.value * n });
        left -= n;
        k *= 2;
      }
    });
    return parts;
  }

  function maxValue(items, budget) {
    const parts = split(items).filter(p => p.cost <= budget && p.value > 0);
    const step = Math.max(1, Math.ceil(budget / CELLS));
    const C = Math.floor(budget / step);
    const words = (C >>> 5) + 1;
    const dp = new Float64Array(C + 1);
    const keep = new Uint32Array(parts.length * words);
    const w = parts.map(p => Math.ceil(p.cost / step));

    parts.forEach((p, j) => {
      const base = j * words, wj = w[j], v = p.value;
      for (let c = C; c >= wj; c--) {
        const cand = dp[c - wj] + v;
        if (cand > dp[c] + 1e-7) {
          dp[c] = cand;
          keep[base + (c >>> 5)] |= 1 << (c & 31);
        }
      }
    });

    // among equally good answers take the cheapest one
    let c = C;
    while (c > 0 && dp[c - 1] >= dp[C] - 1e-7) c--;
    const counts = {};
    for (let j = parts.length - 1; j >= 0 && c > 0; j--) {
      if (keep[j * words + (c >>> 5)] & (1 << (c & 31))) {
        counts[parts[j].i] = (counts[parts[j].i] || 0) + parts[j].n;
        c -= w[j];
      }
    }
    let value = 0, cost = 0;
    for (const i in counts) {
      value += items[i].value * counts[i];
      cost += items[i].cost * counts[i];
    }
    return { counts, value, cost };
  }

  return { maxValue };
})();
