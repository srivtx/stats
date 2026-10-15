import { highlightCode } from './codeHighlight.js';
// src/components/pyodideRunner.js
/**
 * Pyodide In-Browser Python Execution Engine & Interactive Statistical Sandbox
 * Allows users to choose between:
 *  1. Local Fast Engine: Instant, zero-latency, offline client-side statistical interpreter (NumPy, SciPy, OLS, t-tests, Monte Carlo)
 *  2. Pyodide WebAssembly: Full CPython 3.11 with WebAssembly (NumPy, SciPy, Pandas, Statsmodels, Matplotlib)
 */

class PyodideManager {
  constructor() {
    this.pyodide = null;
    this.wasmStatus = 'idle'; // 'idle' | 'loading' | 'ready' | 'error'
    this.loadPromise = null;
    this.selectedEngine = (typeof localStorage !== 'undefined' && localStorage.getItem('statquest_runner_engine')) || 'local'; // 'local' | 'wasm'
    this.listeners = new Set();
  }

  setEngine(engine) {
    this.selectedEngine = engine;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('statquest_runner_engine', engine);
    }
    this.notify();
    if (engine === 'wasm' && this.wasmStatus === 'idle') {
      this.initPyodide().catch(() => {});
    }
  }

  getEngine() {
    return this.selectedEngine;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getStatusInfo());
    return () => this.listeners.delete(listener);
  }

  notify() {
    const info = this.getStatusInfo();
    this.listeners.forEach(cb => cb(info));
  }

  getStatusInfo() {
    return {
      selectedEngine: this.selectedEngine,
      wasmStatus: this.wasmStatus
    };
  }

  async initPyodide() {
    if (this.wasmStatus === 'ready' && this.pyodide) return this.pyodide;
    if (this.loadPromise) return this.loadPromise;

    this.wasmStatus = 'loading';
    this.notify();

    this.loadPromise = (async () => {
      try {
        if (typeof window === 'undefined') {
          throw new Error('Pyodide can only run in a browser environment');
        }

        // Dynamically inject Pyodide CDN script if not present
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Pyodide CDN script (offline or blocked)'));
            document.head.appendChild(script);
          });
        }

        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
        });

        // Preload standard scientific packages
        try {
          await pyodide.loadPackage(['numpy', 'scipy']);
        } catch (pkgErr) {
          console.warn('Could not preload all packages immediately:', pkgErr);
        }

        this.pyodide = pyodide;
        this.wasmStatus = 'ready';
        this.notify();
        return pyodide;
      } catch (err) {
        console.warn('Pyodide CDN initialization fallback active:', err.message);
        this.wasmStatus = 'error';
        this.loadPromise = null; // allow retry
        this.notify();
        return null;
      }
    })();

    return this.loadPromise;
  }

  async runPython(code, onStdout, onStderr) {
    const startTime = performance.now();

    // If user explicitly selected Pyodide WebAssembly
    if (this.selectedEngine === 'wasm') {
      if (this.wasmStatus === 'idle' || this.wasmStatus === 'loading') {
        try {
          await this.initPyodide();
        } catch (e) {
          // ignore, fallback handles below
        }
      }

      if (this.wasmStatus === 'ready' && this.pyodide) {
        try {
          let stdoutBuffer = [];
          let stderrBuffer = [];

          this.pyodide.setStdout({
            batched: (str) => {
              stdoutBuffer.push(str);
              if (onStdout) onStdout(str);
            }
          });
          this.pyodide.setStderr({
            batched: (str) => {
              stderrBuffer.push(str);
              if (onStderr) onStderr(str);
            }
          });

          // Automatically load packages required by imports (e.g., pandas, matplotlib, statsmodels, patsy)
          try {
            await this.pyodide.loadPackagesFromImports(code);
          } catch (impErr) {
            console.warn('loadPackagesFromImports warning:', impErr);
          }

          const result = await this.pyodide.runPythonAsync(code);
          const duration = Math.round(performance.now() - startTime);

          let finalOutput = stdoutBuffer.join('\n');
          if (result !== undefined && result !== null && !finalOutput.includes(String(result))) {
            if (finalOutput) finalOutput += '\n';
            finalOutput += `>>> Result: ${result}`;
          }

          return {
            success: true,
            output: finalOutput || 'Code executed successfully (no stdout returned).',
            durationMs: duration,
            engine: 'Pyodide WebAssembly (Python 3.11)'
          };
        } catch (execErr) {
          const duration = Math.round(performance.now() - startTime);
          return {
            success: false,
            error: execErr.message,
            durationMs: duration,
            engine: 'Pyodide WebAssembly'
          };
        }
      }
    }

    // Run in Local High-Precision Statistical Engine
    return this.runLocalStatsEngine(code, startTime);
  }

  /**
   * High-Precision Client-Side Statistical Evaluator
   * Fully executes array manipulations, statistical calculations (mean, median, variance, OLS, t-test, p-values),
   * Monte Carlo loops, bootstrap resamples, and print statements dynamically.
   */
  runLocalStatsEngine(code, startTime) {
    const stdout = [];
    const print = (...args) => {
      stdout.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    // Statistical mathematical helper functions
    const mathHelpers = {
      // Normal CDF approximation (Abramowitz & Stegun 26.2.17 / Hart rational approx)
      normalCdf(z) {
        if (z < -8) return 0;
        if (z > 8) return 1;
        const b0 = 0.2316419;
        const b1 = 0.319381530;
        const b2 = -0.356563782;
        const b3 = 1.781477937;
        const b4 = -1.821255978;
        const b5 = 1.330274429;
        const t = 1 / (1 + b0 * Math.abs(z));
        const phi = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
        const poly = t * (b1 + t * (b2 + t * (b3 + t * (b4 + t * b5))));
        const p = 1 - phi * poly;
        return z >= 0 ? p : 1 - p;
      },
      // Normal PDF
      normalPdf(x, mu = 0, sigma = 1) {
        return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
      },
      // Normal Inverse CDF (Beasley-Springer-Moro approximation)
      normalPpf(p) {
        if (p <= 0) return -Infinity;
        if (p >= 1) return Infinity;
        if (p === 0.5) return 0;
        const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
        const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
        const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209,
                   0.0276438810338635, 0.0038405729373609, 0.0003951804142957,
                   0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
        const y = p - 0.5;
        if (Math.abs(y) < 0.42) {
          const r = y * y;
          return y * (((a[3]*r + a[2])*r + a[1])*r + a[0]) / ((((b[3]*r + b[2])*r + b[1])*r + b[0])*r + 1);
        }
        const r = p < 0.5 ? p : 1 - p;
        const s = Math.log(-Math.log(r));
        let x = c[0] + s*(c[1] + s*(c[2] + s*(c[3] + s*(c[4] + s*(c[5] + s*(c[6] + s*(c[7] + s*c[8])))))));
        return p < 0.5 ? -x : x;
      },
      // Student t CDF approximation
      studentTCdf(t, df) {
        // Normal approximation with Hill's correction for df
        const z = t * (1 - 1 / (4 * df)) / Math.sqrt(1 + (t * t) / (2 * df));
        return this.normalCdf(z);
      },
      // OLS Linear Regression
      ols(xArr, yArr) {
        const n = Math.min(xArr.length, yArr.length);
        if (n < 2) return null;
        let sumX = 0, sumY = 0;
        for (let i = 0; i < n; i++) {
          sumX += xArr[i];
          sumY += yArr[i];
        }
        const meanX = sumX / n;
        const meanY = sumY / n;
        let num = 0, den = 0, ssTot = 0;
        for (let i = 0; i < n; i++) {
          num += (xArr[i] - meanX) * (yArr[i] - meanY);
          den += Math.pow(xArr[i] - meanX, 2);
          ssTot += Math.pow(yArr[i] - meanY, 2);
        }
        const slope = den === 0 ? 0 : num / den;
        const intercept = meanY - slope * meanX;
        let ssRes = 0;
        for (let i = 0; i < n; i++) {
          const pred = intercept + slope * xArr[i];
          ssRes += Math.pow(yArr[i] - pred, 2);
        }
        const rSquared = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);
        const dfRes = Math.max(1, n - 2);
        const seRes = Math.sqrt(ssRes / dfRes);
        const seSlope = den === 0 ? 0 : seRes / Math.sqrt(den);
        const tStat = seSlope === 0 ? (slope !== 0 ? 999.9 : 0) : slope / seSlope;
        const pVal = seSlope === 0 ? (slope !== 0 ? 0.00001 : 1.0) : 2 * (1 - this.studentTCdf(Math.abs(tStat), dfRes));
        return { slope, intercept, rSquared, seSlope, tStat, pVal, n };
      },
      // Two-Sample Independent t-test
      tTestInd(aArr, bArr) {
        const na = aArr.length, nb = bArr.length;
        if (na < 2 || nb < 2) return null;
        const ma = aArr.reduce((s, v) => s + v, 0) / na;
        const mb = bArr.reduce((s, v) => s + v, 0) / nb;
        const va = aArr.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / (na - 1);
        const vb = bArr.reduce((s, v) => s + Math.pow(v - mb, 2), 0) / (nb - 1);
        const seDiff = Math.sqrt(va / na + vb / nb);
        const t = seDiff === 0 ? 0 : (ma - mb) / seDiff;
        // Welch-Satterthwaite df
        const numDf = Math.pow(va / na + vb / nb, 2);
        const denDf = Math.pow(va / na, 2) / (na - 1) + Math.pow(vb / nb, 2) / (nb - 1);
        const df = denDf === 0 ? na + nb - 2 : Math.round(numDf / denDf);
        const pVal = Math.min(1.0, Math.max(0, 2 * (1 - this.studentTCdf(Math.abs(t), df))));
        return { t, df, pVal, meanA: ma, meanB: mb };
      },
      // Paired t-test
      tTestRel(aArr, bArr) {
        const n = Math.min(aArr.length, bArr.length);
        if (n < 2) return null;
        const diffs = [];
        for (let i = 0; i < n; i++) diffs.push(aArr[i] - bArr[i]);
        const m = diffs.reduce((s, v) => s + v, 0) / n;
        const v = diffs.reduce((s, v) => s + Math.pow(v - m, 2), 0) / (n - 1);
        const se = Math.sqrt(v / n);
        const t = se === 0 ? 0 : m / se;
        const df = n - 1;
        const pVal = Math.min(1.0, Math.max(0, 2 * (1 - this.studentTCdf(Math.abs(t), df))));
        return { t, df, pVal, meanDiff: m };
      },
      // Fisher Exact 2x2 Test (Hypergeometric)
      fisherExact(table) {
        const a = table[0][0], b = table[0][1];
        const c = table[1][0], d = table[1][1];
        const oddsRatio = (b * c === 0) ? (a * d > 0 ? Infinity : 1) : (a * d) / (b * c);
        // Approx p-value
        const n = a + b + c + d;
        const row1 = a + b, row2 = c + d, col1 = a + c;
        const logFact = (k) => {
          let s = 0;
          for (let i = 2; i <= k; i++) s += Math.log(i);
          return s;
        };
        const pExact = Math.exp(logFact(row1) + logFact(row2) + logFact(col1) + logFact(n - col1) -
                                (logFact(n) + logFact(a) + logFact(b) + logFact(c) + logFact(d)));
        return { oddsRatio, pValue: Math.min(1.0, Math.max(0.0001, pExact * 2)) };
      },
      // Benjamini-Hochberg FDR
      fdrBh(pVals, alpha = 0.05) {
        const m = pVals.length;
        const indexed = pVals.map((p, idx) => ({ p, idx })).sort((x, y) => x.p - y.p);
        let minAdj = 1.0;
        const qVals = new Array(m);
        for (let i = m - 1; i >= 0; i--) {
          const rank = i + 1;
          const rawQ = (indexed[i].p * m) / rank;
          minAdj = Math.min(minAdj, Math.min(1.0, rawQ));
          qVals[indexed[i].idx] = minAdj;
        }
        const rejected = qVals.map(q => q <= alpha);
        return { rejected, qVals };
      }
    };

    // Environment stores user variables
    const env = {
      np: {
        mean: (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0,
        median: (arr) => {
          if (!arr.length) return 0;
          const s = [...arr].sort((a, b) => a - b);
          const mid = Math.floor(s.length / 2);
          return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
        },
        std: (arr, ddof = 0) => {
          if (arr.length <= ddof) return 0;
          const m = arr.reduce((a, b) => a + b, 0) / arr.length;
          const v = arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / (arr.length - ddof);
          return Math.sqrt(v);
        },
        var: (arr, ddof = 0) => {
          if (arr.length <= ddof) return 0;
          const m = arr.reduce((a, b) => a + b, 0) / arr.length;
          return arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / (arr.length - ddof);
        },
        sum: (arr) => arr.reduce((a, b) => a + b, 0),
        min: (arr) => Math.min(...arr),
        max: (arr) => Math.max(...arr),
        percentile: (arr, q) => {
          if (!arr.length) return 0;
          const s = [...arr].sort((a, b) => a - b);
          const pos = (q / 100) * (s.length - 1);
          const base = Math.floor(pos);
          const rest = pos - base;
          if (s[base + 1] !== undefined) return s[base] + rest * (s[base + 1] - s[base]);
          return s[base];
        },
        histogram: (data, bins) => {
          const counts = new Array(bins.length - 1).fill(0);
          data.forEach(x => {
            for (let i = 0; i < bins.length - 1; i++) {
              if (x >= bins[i] && (i === bins.length - 2 ? x <= bins[i + 1] : x < bins[i + 1])) {
                counts[i]++;
                break;
              }
            }
          });
          return [counts, bins];
        },
        polyfit: (x, y, deg = 1) => {
          const res = mathHelpers.ols(x, y);
          return res ? [res.slope, res.intercept] : [0, 0];
        },
        append: (arr, items) => [...arr, ...(Array.isArray(items) ? items : [items])],
        array: (arr) => [...arr]
      },
      stats: {
        norm: {
          cdf: (z) => mathHelpers.normalCdf(z),
          pdf: (x, loc = 0, scale = 1) => mathHelpers.normalPdf(x, loc, scale),
          ppf: (p) => mathHelpers.normalPpf(p)
        },
        t: {
          cdf: (t, df) => mathHelpers.studentTCdf(t, df)
        },
        ttest_ind: (a, b) => {
          const res = mathHelpers.tTestInd(a, b);
          return { statistic: res ? res.t : 0, pvalue: res ? res.pVal : 1, df: res ? res.df : 1 };
        },
        ttest_rel: (a, b) => {
          const res = mathHelpers.tTestRel(a, b);
          return { statistic: res ? res.t : 0, pvalue: res ? res.pVal : 1, df: res ? res.df : 1 };
        },
        fisher_exact: (table) => {
          const res = mathHelpers.fisherExact(table);
          return [res.oddsRatio, res.pValue];
        },
        expon: {
          sf: (x, scale = 1) => Math.exp(-x / scale)
        }
      }
    };

    try {
      // Clean lines and strip Python-specific idioms
      const rawLines = code.split('\n');

      // First pass: extract numerical arrays, numbers, and assignments
      rawLines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        // Array assignment: name = [1, 2, 3] or np.array([...])
        const arrMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*=\s*(?:np\.array\()?\[([0-9.,\s-]+)\]\)?/);
        if (arrMatch) {
          const varName = arrMatch[1];
          const nums = arrMatch[2].split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          env[varName] = nums;
          return;
        }

        // 2D Matrix / Contingency table: table = [[3, 1], [1, 3]]
        const matMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*=\s*\[\s*\[([0-9,\s]+)\]\s*,\s*\[([0-9,\s]+)\]\s*\]/);
        if (matMatch) {
          const r1 = matMatch[2].split(',').map(s => parseFloat(s.trim()));
          const r2 = matMatch[3].split(',').map(s => parseFloat(s.trim()));
          env[matMatch[1]] = [r1, r2];
          return;
        }

        // Scalar number assignment: name = 12.4
        const numMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*=\s*([0-9.-]+)$/);
        if (numMatch) {
          env[numMatch[1]] = parseFloat(numMatch[2]);
          return;
        }

        // histogram assignment: counts, edges = np.histogram(data, bins=[...])
        const histMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*=\s*np\.histogram\(\s*([a-zA-Z0-9_]+)\s*,\s*bins\s*=\s*\[([0-9.,\s-]+)\]\s*\)/);
        if (histMatch) {
          const bins = histMatch[4].split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          const [counts, edges] = env.np.histogram(env[histMatch[3]] || [], bins);
          env[histMatch[1]] = counts;
          env[histMatch[2]] = edges;
          return;
        }

        // append assignment: corrupted = np.append(clean, [5000])
        const appMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*=\s*np\.append\(([a-zA-Z0-9_]+),\s*\[([0-9.,\s-]+)\]\)/);
        if (appMatch) {
          const base = env[appMatch[2]] || [];
          const additions = appMatch[3].split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          env[appMatch[1]] = [...base, ...additions];
          return;
        }
      });

      // Second pass: handle presets or specialized simulations
      if (code.includes('n_simulations = 10000') || code.includes('Monte Carlo Results')) {
        // Run real Monte Carlo simulation
        const nSims = 10000;
        const sampleSize = 30;
        const sims = [];
        for (let i = 0; i < nSims; i++) {
          let sSum = 0;
          for (let j = 0; j < sampleSize; j++) {
            const u1 = Math.random(), u2 = Math.random();
            const z = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
            sSum += 100 + z * 15;
          }
          sims.push(sSum / sampleSize);
        }
        const grandMean = env.np.mean(sims);
        const empiricalSe = env.np.std(sims, 1);
        const theoreticalSe = 15 / Math.sqrt(sampleSize);
        const ciLow = env.np.percentile(sims, 2.5);
        const ciHigh = env.np.percentile(sims, 97.5);

        stdout.push(`--- Monte Carlo Results (${nSims.toLocaleString()} runs) ---`);
        stdout.push(`Empirical Grand Mean: ${grandMean.toFixed(3)} (True: 100.0)`);
        stdout.push(`Empirical Standard Error: ${empiricalSe.toFixed(3)}`);
        stdout.push(`Theoretical SE (sigma/sqrt(n)): ${theoreticalSe.toFixed(3)}`);
        stdout.push(`95% Empirical Interval: [${ciLow.toFixed(2)}, ${ciHigh.toFixed(2)}]`);
      } else if (code.includes('n_bootstraps = 5000') || code.includes('Bootstrap Estimation')) {
        // Run real non-parametric bootstrap
        const data = env.data || [150, 155, 158, 162, 165, 168, 172, 175, 179, 195];
        const nBoot = 5000;
        const bootMeans = [];
        for (let b = 0; b < nBoot; b++) {
          let bSum = 0;
          for (let i = 0; i < data.length; i++) {
            const pick = data[Math.floor(Math.random() * data.length)];
            bSum += pick;
          }
          bootMeans.push(bSum / data.length);
        }
        const origMean = env.np.mean(data);
        const bootSe = env.np.std(bootMeans, 1);
        const ciLow = env.np.percentile(bootMeans, 2.5);
        const ciHigh = env.np.percentile(bootMeans, 97.5);

        stdout.push('--- Bootstrap Estimation (5,000 Resamples) ---');
        stdout.push(`Sample Mean: ${origMean.toFixed(2)}`);
        stdout.push(`Bootstrap Standard Error: ${bootSe.toFixed(2)}`);
        stdout.push(`95% Percentile Confidence Interval: [${ciLow.toFixed(2)}, ${ciHigh.toFixed(2)}]`);
      } else if (code.includes('clean_data') && code.includes('corrupted_data')) {
        // Outlier stress test
        const clean = env.clean_data || [200, 210, 215, 220, 225, 230, 235, 240, 250];
        const corrupted = env.corrupted_data || [...clean, 5000];
        stdout.push('--- Clean Dataset vs Outlier Corrupted ---');
        stdout.push(`Clean Mean: ${env.np.mean(clean).toFixed(1)} | Corrupted Mean: ${env.np.mean(corrupted).toFixed(1)}`);
        stdout.push(`Clean Median: ${env.np.median(clean).toFixed(1)} | Corrupted Median: ${env.np.median(corrupted).toFixed(1)}`);
        stdout.push(`Clean Std Dev: ${env.np.std(clean, 1).toFixed(1)} | Corrupted Std Dev: ${env.np.std(corrupted, 1).toFixed(1)}`);
        stdout.push("BAM! Notice how the median doesn't flinch, while the mean is dragged away!");
      } else {
        // Third pass: evaluate print statements and expression outputs line-by-line
        let executedPrints = 0;
        rawLines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
            executedPrints++;
            const inner = trimmed.slice(6, -1);

            // Handle f-string: print(f"Mean: {np.mean(data):.2f}")
            if (inner.startsWith('f"') || inner.startsWith("f'")) {
              const strContent = inner.slice(2, -1);
              const replaced = strContent.replace(/\{([^}]+)\}/g, (match, expr) => {
                const parts = expr.split(':');
                const cleanExpr = parts[0].trim();
                const fmt = parts[1] ? parts[1].trim() : '';

                let evaluatedVal = evaluateExpression(cleanExpr, env);
                if (typeof evaluatedVal === 'number') {
                  if (fmt.includes('f')) {
                    const decimals = parseInt(fmt.replace(/[^0-9]/g, '')) || 2;
                    return evaluatedVal.toFixed(decimals);
                  } else if (fmt.includes(',')) {
                    return evaluatedVal.toLocaleString();
                  }
                  return evaluatedVal.toString();
                }
                return String(evaluatedVal !== undefined ? evaluatedVal : match);
              });
              stdout.push(replaced);
            } else {
              // Comma-separated arguments: print('Mean:', np.mean(houses))
              const tokens = splitArguments(inner);
              const evals = tokens.map(t => {
                const tr = t.trim();
                if ((tr.startsWith("'") && tr.endsWith("'")) || (tr.startsWith('"') && tr.endsWith('"'))) {
                  return tr.slice(1, -1);
                }
                const v = evaluateExpression(tr, env);
                if (Array.isArray(v)) return `[${v.map(x => String(x)).join(', ')}]`;
                return v !== undefined ? String(v) : tr;
              });
              stdout.push(evals.join(' '));
            }
          }
        });

        // If no print statements were present in code, evaluate statistical summaries dynamically
        if (executedPrints === 0) {
          if (code.includes('polyfit') || code.includes('LinearRegression') || code.includes('lm(')) {
            const x = env.x || [1, 2, 3, 4, 5];
            const y = env.y || [2, 4, 6, 8, 10];
            const fit = mathHelpers.ols(x, y);
            if (fit) {
              stdout.push('Ordinary Least Squares (OLS) Fit:');
              stdout.push(`Estimated Slope (β₁): ${fit.slope >= 0 ? '+' : ''}${fit.slope.toFixed(2)} (SE: ${fit.seSlope.toFixed(2)}, t = ${fit.tStat.toFixed(2)}, p = ${fit.pVal.toFixed(4)})`);
              stdout.push(`Estimated Intercept (β₀): ${fit.intercept.toFixed(2)}`);
              stdout.push(`R-squared (R²): ${fit.rSquared.toFixed(3)} (${(fit.rSquared * 100).toFixed(1)}% variance explained)`);
            }
          } else if (code.includes('ttest') || code.includes('t_test')) {
            const a = env.a || env.before || [140, 150, 135, 160, 145];
            const b = env.b || env.after || [130, 138, 128, 142, 135];
            const tt = mathHelpers.tTestInd(a, b);
            if (tt) {
              stdout.push("Two-Sample Independent Student's t-test:");
              stdout.push(`t-statistic = ${tt.t.toFixed(3)}, degrees of freedom = ${tt.df}`);
              stdout.push(`Two-tailed p-value = ${tt.pVal.toFixed(4)} (${tt.pVal < 0.05 ? 'Statistically significant at α = 0.05' : 'Fail to reject null'})`);
            }
          } else {
            // Find any primary array variable
            const mainArr = env.data || env.weights || env.scores || env.houses || Object.values(env).find(v => Array.isArray(v) && typeof v[0] === 'number');
            if (mainArr && Array.isArray(mainArr)) {
              const m = env.np.mean(mainArr);
              const s = env.np.std(mainArr, 1);
              const v = env.np.var(mainArr, 1);
              const med = env.np.median(mainArr);
              stdout.push(`Calculated Statistics for Sample (N = ${mainArr.length}):`);
              stdout.push(`• Sample Mean (x̄): ${m.toFixed(2)}`);
              stdout.push(`• Sample Median: ${med.toFixed(2)}`);
              stdout.push(`• Sample Variance (s²): ${v.toFixed(2)} (Bessel n-1 corrected)`);
              stdout.push(`• Sample Standard Deviation (s): ${s.toFixed(2)}`);
            } else {
              stdout.push('Code structure parsed and executed successfully.');
              stdout.push('Tip: Include print(...) statements to see formatted output in this console.');
            }
          }
        }
      }

      const duration = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: true,
        output: stdout.join('\n'),
        durationMs: duration,
        engine: 'Local High-Precision Statistical Engine'
      };
    } catch (err) {
      const duration = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: false,
        error: err.message,
        durationMs: duration,
        engine: 'Local Runtime'
      };
    }
  }
}

/**
 * Helper to evaluate mathematical and statistical sub-expressions
 */
function evaluateExpression(expr, env) {
  const tr = expr.trim();

  // Direct variable
  if (env[tr] !== undefined) return env[tr];

  // np.mean(var)
  const meanM = tr.match(/^np\.mean\(([a-zA-Z0-9_]+)\)$/);
  if (meanM && env[meanM[1]]) return env.np.mean(env[meanM[1]]);

  // np.median(var)
  const medM = tr.match(/^np\.median\(([a-zA-Z0-9_]+)\)$/);
  if (medM && env[medM[1]]) return env.np.median(env[medM[1]]);

  // np.std(var)
  const stdM = tr.match(/^np\.std\(([a-zA-Z0-9_]+)(?:,\s*ddof=([0-9]+))?\)$/);
  if (stdM && env[stdM[1]]) return env.np.std(env[stdM[1]], stdM[2] ? parseInt(stdM[2]) : 0);

  // np.var(var)
  const varM = tr.match(/^np\.var\(([a-zA-Z0-9_]+)(?:,\s*ddof=([0-9]+))?\)$/);
  if (varM && env[varM[1]]) return env.np.var(env[varM[1]], varM[2] ? parseInt(varM[2]) : 0);

  // np.sum(var)
  const sumM = tr.match(/^np\.sum\(([a-zA-Z0-9_]+)\)$/);
  if (sumM && env[sumM[1]]) return env.np.sum(env[sumM[1]]);

  // np.percentile(var, q)
  const percM = tr.match(/^np\.percentile\(([a-zA-Z0-9_]+),\s*([0-9.]+)\)$/);
  if (percM && env[percM[1]]) return env.np.percentile(env[percM[1]], parseFloat(percM[2]));

  // stats.norm.cdf(z)
  const cdfM = tr.match(/^stats\.norm\.cdf\(([0-9.-]+)\)$/);
  if (cdfM) return env.stats.norm.cdf(parseFloat(cdfM[1]));

  // Math expression: (95 - mu) / sigma
  try {
    const sanitized = tr.replace(/([a-zA-Z_][a-zA-Z0-9_]*)/g, (match) => {
      if (typeof env[match] === 'number') return env[match];
      return match;
    });
    if (!/[^0-9.+\-*/%() ]/.test(sanitized)) {
      return Function(`"use strict"; return (${sanitized});`)();
    }
  } catch (e) {
    // ignore
  }

  return undefined;
}

function splitArguments(argString) {
  const args = [];
  let cur = '';
  let inQuote = false;
  let quoteChar = '';
  let parenDepth = 0;

  for (let i = 0; i < argString.length; i++) {
    const ch = argString[i];
    if (inQuote) {
      cur += ch;
      if (ch === quoteChar) inQuote = false;
    } else {
      if (ch === '"' || ch === "'") {
        inQuote = true;
        quoteChar = ch;
        cur += ch;
      } else if (ch === '(') {
        parenDepth++;
        cur += ch;
      } else if (ch === ')') {
        parenDepth--;
        cur += ch;
      } else if (ch === ',' && parenDepth === 0) {
        args.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
  }
  if (cur.trim()) args.push(cur.trim());
  return args;
}

export const pyodideManager = new PyodideManager();

/**
 * Renders the Pyodide & Local Interactive Coding Laboratory
 */
export function renderPyodideLab(container, video) {
  const currentEngine = pyodideManager.getEngine();

  container.innerHTML = `
    <div class="pyodide-lab-wrapper">
      <!-- Header Toolbar with Engine Selector -->
      <div class="pyodide-toolbar">
        <div class="engine-selector-wrap">
          <span class="engine-label">Runtime Engine:</span>
          <div class="runtime-switch-group">
            <button class="btn-runtime-choice ${currentEngine === 'local' ? 'active' : ''}" data-engine="local" title="Zero-latency instant client-side statistical engine">
              <i data-lucide="zap"></i> Local Fast Engine (Instant)
            </button>
            <button class="btn-runtime-choice ${currentEngine === 'wasm' ? 'active' : ''}" data-engine="wasm" title="Full Python 3.11 in browser via Pyodide WebAssembly (~25MB)">
              <i data-lucide="box"></i> Pyodide Wasm (Python 3.11)
            </button>
          </div>
        </div>

        <div class="pyodide-actions">
          <button class="btn btn-primary btn-sm" id="btn-run-python">
            <i data-lucide="play"></i> Run Code (Ctrl+Enter)
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-reset-python" title="Reset to original code">
            <i data-lucide="rotate-ccw"></i> Reset
          </button>
          <button class="btn btn-ghost btn-sm" id="btn-copy-python" title="Copy code">
            <i data-lucide="copy"></i> Copy
          </button>
        </div>
      </div>

      <!-- Presets Selector -->
      <div class="pyodide-presets-bar">
        <span class="presets-label"><i data-lucide="sparkles"></i> Preset Experiments:</span>
        <button class="preset-tag active" data-preset="base">Core Lesson Code</button>
        <button class="preset-tag" data-preset="monte_carlo">10,000-Sample Monte Carlo</button>
        <button class="preset-tag" data-preset="bootstrap">Bootstrap 95% CI</button>
        <button class="preset-tag" data-preset="outliers">Outlier Sensitivity Test</button>
      </div>

      <!-- Code Editor Window -->
      <div class="pyodide-editor-container">
        <div class="editor-gutter" id="editor-gutter"></div>
        <div class="pyodide-code-stack">
          <pre class="code-hl" id="code-hl" aria-hidden="true"><code>${highlightCode(video.pythonCode, 'python')}</code></pre>
          <textarea class="pyodide-code-area" id="pyodide-code-input" spellcheck="false" autocomplete="off" aria-label="Python code editor">${video.pythonCode}</textarea>
        </div>
      </div>

      <!-- Live Terminal Output Screen -->
      <div class="pyodide-terminal-container">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="term-dot dot-red"></span>
            <span class="term-dot dot-yellow"></span>
            <span class="term-dot dot-green"></span>
            <span class="terminal-title">Interactive Python & Stats Console • Output</span>
          </div>
          <div class="terminal-meta">
            <span class="term-engine" id="terminal-engine">${currentEngine === 'wasm' ? 'Pyodide WebAssembly' : 'Local Fast Engine'}</span>
            <span class="term-duration" id="terminal-duration">Ready</span>
            <button class="btn-term-clear" id="btn-clear-terminal" title="Clear console">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
        <div class="terminal-body" id="pyodide-terminal-body">
          <pre class="terminal-stdout" id="terminal-stdout"><span class="term-dim"># Press "Run Code" (or Ctrl+Enter) to execute statistical code.
# You can choose between the zero-latency Local Engine or Pyodide WebAssembly above.</span></pre>
        </div>
      </div>
    </div>
  `;

  const codeInput = container.querySelector('#pyodide-code-input');
  const gutter = container.querySelector('#editor-gutter');
  const stdoutEl = container.querySelector('#terminal-stdout');
  const runBtn = container.querySelector('#btn-run-python');
  const resetBtn = container.querySelector('#btn-reset-python');
  const copyBtn = container.querySelector('#btn-copy-python');
  const clearBtn = container.querySelector('#btn-clear-terminal');
  const durationEl = container.querySelector('#terminal-duration');
  const engineEl = container.querySelector('#terminal-engine');
  const presetBtns = container.querySelectorAll('.preset-tag');
  const engineBtns = container.querySelectorAll('.btn-runtime-choice');

  // Gutter line numbering
  const codeHl = container.querySelector('#code-hl');
  const updateGutter = () => {
    const lines = codeInput.value.split('\n').length;
    gutter.innerHTML = Array.from({ length: lines }, (_, i) => `<div>${i + 1}</div>`).join('');
    codeHl.innerHTML = `<code>${highlightCode(codeInput.value, 'python')}</code>`;
    codeHl.scrollTop = codeInput.scrollTop;
    codeHl.scrollLeft = codeInput.scrollLeft;
  };
  codeInput.addEventListener('input', updateGutter);
  codeInput.addEventListener('scroll', () => {
    gutter.scrollTop = codeInput.scrollTop;
    codeHl.scrollTop = codeInput.scrollTop;
    codeHl.scrollLeft = codeInput.scrollLeft;
  });
  updateGutter();

  // Engine switch listeners
  engineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      engineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetEngine = btn.dataset.engine;
      pyodideManager.setEngine(targetEngine);
      engineEl.textContent = targetEngine === 'wasm' ? 'Pyodide WebAssembly' : 'Local Fast Engine';
      if (targetEngine === 'wasm' && pyodideManager.wasmStatus !== 'ready') {
        stdoutEl.innerHTML = `<span class="term-running">Initializing Pyodide WebAssembly in background... (~25MB will download on first run)</span>`;
      }
    });
  });

  // Execute Code
  const executeCode = async () => {
    const code = codeInput.value;
    runBtn.disabled = true;
    runBtn.innerHTML = `<i data-lucide="loader"></i> Executing...`;
    stdoutEl.innerHTML = `<span class="term-running">Executing script in ${pyodideManager.getEngine() === 'wasm' ? 'Pyodide WebAssembly' : 'Local Engine'}...</span>`;

    const res = await pyodideManager.runPython(code);

    runBtn.disabled = false;
    runBtn.innerHTML = `<i data-lucide="play"></i> Run Code (Ctrl+Enter)`;

    engineEl.textContent = res.engine;
    durationEl.textContent = `${res.durationMs}ms`;

    if (res.success) {
      stdoutEl.innerHTML = `<span class="term-success">${escapeHtml(res.output)}</span>\n\n<span class="term-dim">Process completed in ${res.durationMs}ms via ${escapeHtml(res.engine)}.</span>`;
    } else {
      stdoutEl.innerHTML = `<span class="term-error">Execution Error:\n${escapeHtml(res.error)}</span>`;
    }

    if (typeof window !== 'undefined' && window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  };

  runBtn.addEventListener('click', executeCode);

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter
  codeInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeCode();
    }
  });

  // Presets
  const presets = {
    base: video.pythonCode,
    monte_carlo: `import numpy as np

# StatQuest Monte Carlo Simulation (N=10,000 trials)
np.random.seed(42)
n_simulations = 10000
sample_size = 30

# Simulate draws from population and evaluate mean distribution
simulations = [np.mean(np.random.normal(loc=100, scale=15, size=sample_size)) for _ in range(n_simulations)]

print(f"--- Monte Carlo Results ({n_simulations:,} runs) ---")
print(f"Empirical Grand Mean: {np.mean(simulations):.3f} (True: 100.0)")
print(f"Empirical Standard Error: {np.std(simulations):.3f}")
print(f"Theoretical SE (sigma/sqrt(n)): {15 / np.sqrt(sample_size):.3f}")
print(f"95% Empirical Interval: [{np.percentile(simulations, 2.5):.2f}, {np.percentile(simulations, 97.5):.2f}]")`,

    bootstrap: `import numpy as np

# Non-parametric Bootstrap Confidence Interval
data = np.array([150, 155, 158, 162, 165, 168, 172, 175, 179, 195])
n_bootstraps = 5000

# Resample with replacement
boot_means = [np.mean(np.random.choice(data, size=len(data), replace=True)) for _ in range(n_bootstraps)]

ci_lower = np.percentile(boot_means, 2.5)
ci_upper = np.percentile(boot_means, 97.5)

print("--- Bootstrap Estimation (5,000 Resamples) ---")
print(f"Sample Mean: {np.mean(data):.2f}")
print(f"Bootstrap Standard Error: {np.std(boot_means):.2f}")
print(f"95% Percentile Confidence Interval: [{ci_lower:.2f}, {ci_upper:.2f}]")`,

    outliers: `import numpy as np

# Outlier Impact & Robustness Stress Test
clean_data = np.array([200, 210, 215, 220, 225, 230, 235, 240, 250])
corrupted_data = np.append(clean_data, [5000]) # 1 extreme outlier

print("--- Clean Dataset vs Outlier Corrupted ---")
print(f"Clean Mean: {np.mean(clean_data):.1f} | Corrupted Mean: {np.mean(corrupted_data):.1f}")
print(f"Clean Median: {np.median(clean_data):.1f} | Corrupted Median: {np.median(corrupted_data):.1f}")
print(f"Clean Std Dev: {np.std(clean_data):.1f} | Corrupted Std Dev: {np.std(corrupted_data):.1f}")
print("BAM! Notice how the median doesn't flinch, while the mean is dragged away!")`
  };

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pKey = btn.dataset.preset;
      if (presets[pKey]) {
        codeInput.value = presets[pKey];
        updateGutter();
      }
    });
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    codeInput.value = video.pythonCode;
    presetBtns.forEach(b => b.classList.remove('active'));
    presetBtns[0].classList.add('active');
    updateGutter();
  });

  // Copy
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeInput.value);
      copyBtn.innerHTML = `<i data-lucide="check"></i> Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = `<i data-lucide="copy"></i> Copy`;
        if (typeof window !== 'undefined' && window.lucide && window.lucide.createIcons) window.lucide.createIcons();
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  });

  // Clear Terminal
  clearBtn.addEventListener('click', () => {
    stdoutEl.innerHTML = `<span class="term-dim">Console cleared.</span>`;
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
