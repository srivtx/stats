// src/components/visualizations/interactive2D.js
/**
 * 2D Interactive Statistical Laboratories for StatQuest Website.
 * Canvas and dynamic SVG based interactive simulators.
 */

export class Interactive2D {
  constructor(containerElement, type, options = {}) {
    this.container = containerElement;
    this.type = type;
    this.options = options;
    this.animFrameId = null;
    this.state = {};
    this.render();
  }

  destroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.container.innerHTML = '';
  }

  render() {
    this.container.innerHTML = '';
    switch (this.type) {
      case 'histogram':
        this.renderHistogramLab();
        break;
      case 'clt':
        this.renderCLTLab();
        break;
      case 'bessel':
        this.renderBesselLab();
        break;
      case 'power':
      case 'power_analysis':
        this.renderPowerLab();
        break;
      case 'qqplot':
        this.renderQQPlotLab();
        break;
      case 'prob_vs_lik':
        this.renderProbVsLikLab();
        break;
      case 'bayes':
        this.renderBayesLab();
        break;
      case 'odds':
      case 'odds_ratios':
        this.renderOddsLab();
        break;
      case 'loess':
        this.renderLoessLab();
        break;
      case 'bootstrap':
      case 'bootstrap_p':
        this.renderBootstrapLab();
        break;
      default:
        this.renderDefaultLab();
        break;
    }
  }

  // ==========================================
  // 1. HISTOGRAM & DENSITY ESTIMATION LAB
  // ==========================================
  renderHistogramLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Bin Width (h): <span id="bw-val" class="highlight-val">10</span></label>
          <input type="range" id="bw-slider" min="3" max="25" value="10" step="1">
        </div>
        <div class="control-group">
          <label>Distribution:</label>
          <select id="dist-select" class="lab-select">
            <option value="normal">Gaussian (Normal)</option>
            <option value="bimodal">Bimodal Mixture</option>
            <option value="skewed">Right-Skewed (Log-Normal)</option>
            <option value="uniform">Uniform</option>
          </select>
        </div>
        <div class="control-group">
          <label><input type="checkbox" id="kde-toggle" checked> Overlay Kernel Density (KDE)</label>
        </div>
      </div>
      <div class="canvas-wrapper">
        <canvas id="hist-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Intuition:</strong> Adjusting bin width balances bias vs variance! Too wide hides real peaks; too narrow produces noisy spikes.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#hist-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#bw-slider');
    const bwVal = wrap.querySelector('#bw-val');
    const distSelect = wrap.querySelector('#dist-select');
    const kdeToggle = wrap.querySelector('#kde-toggle');

    // Generate synthetic dataset
    const generateData = (dist) => {
      const data = [];
      const n = 600;
      for (let i = 0; i < n; i++) {
        if (dist === 'normal') {
          const u = Math.random(), v = Math.random();
          data.push(100 + 15 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
        } else if (dist === 'bimodal') {
          if (Math.random() < 0.5) {
            const u = Math.random(), v = Math.random();
            data.push(80 + 10 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
          } else {
            const u = Math.random(), v = Math.random();
            data.push(125 + 10 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
          }
        } else if (dist === 'skewed') {
          const u = Math.random(), v = Math.random();
          const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
          data.push(60 + Math.exp(z * 0.6 + 3.8));
        } else {
          data.push(50 + Math.random() * 100);
        }
      }
      return data;
    };

    let dataset = generateData('normal');

    const draw = () => {
      const h = parseFloat(slider.value);
      bwVal.textContent = h;
      const showKDE = kdeToggle.checked;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      // Margins
      const padL = 50, padR = 30, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      const minX = 40, maxX = 160;
      const numBins = Math.ceil((maxX - minX) / h);
      const bins = new Array(numBins).fill(0);

      dataset.forEach(x => {
        if (x >= minX && x < maxX) {
          const idx = Math.floor((x - minX) / h);
          if (idx >= 0 && idx < numBins) bins[idx]++;
        }
      });

      const maxBin = Math.max(1, ...bins);

      // Axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(w - padR, H - padB);
      ctx.stroke();

      // Bars
      for (let i = 0; i < numBins; i++) {
        const binStart = minX + i * h;
        const xPix = padL + ((binStart - minX) / (maxX - minX)) * plotW;
        const barW = (h / (maxX - minX)) * plotW - 1;
        const barH = (bins[i] / maxBin) * (plotH - 20);
        const yPix = (H - padB) - barH;

        const grad = ctx.createLinearGradient(0, yPix, 0, H - padB);
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(1, '#1e3a8a');

        ctx.fillStyle = grad;
        ctx.fillRect(xPix, yPix, Math.max(1, barW), barH);

        ctx.strokeStyle = '#0284c7';
        ctx.strokeRect(xPix, yPix, Math.max(1, barW), barH);
      }

      // X-Ticks
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      for (let val = 60; val <= 160; val += 20) {
        const xPix = padL + ((val - minX) / (maxX - minX)) * plotW;
        ctx.fillText(val, xPix, H - padB + 16);
      }
      ctx.fillText('Measurement Value (X)', padL + plotW / 2, H - 10);

      // Y-Ticks
      ctx.textAlign = 'right';
      ctx.fillText('0', padL - 8, H - padB);
      ctx.fillText(maxBin, padL - 8, padT + 25);

      // KDE Curve
      if (showKDE) {
        const bandwidth = 6;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();

        let maxKDE = 0;
        const kdePoints = [];
        for (let px = 0; px <= plotW; px += 4) {
          const xVal = minX + (px / plotW) * (maxX - minX);
          let sum = 0;
          dataset.forEach(d => {
            const z = (xVal - d) / bandwidth;
            sum += Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
          });
          const density = sum / (dataset.length * bandwidth);
          if (density > maxKDE) maxKDE = density;
          kdePoints.push({ x: padL + px, density });
        }

        kdePoints.forEach((pt, idx) => {
          const y = (H - padB) - (pt.density / maxKDE) * (plotH - 25);
          if (idx === 0) ctx.moveTo(pt.x, y);
          else ctx.lineTo(pt.x, y);
        });
        ctx.stroke();
      }
    };

    slider.addEventListener('input', draw);
    distSelect.addEventListener('change', () => {
      dataset = generateData(distSelect.value);
      draw();
    });
    kdeToggle.addEventListener('change', draw);

    draw();
  }

  // ==========================================
  // 2. CENTRAL LIMIT THEOREM MONTE CARLO LAB
  // ==========================================
  renderCLTLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Source Population:</label>
          <select id="clt-pop-select" class="lab-select">
            <option value="skewed">Skewed Exponential (Decay)</option>
            <option value="uniform">Flat Uniform</option>
            <option value="bimodal">Bimodal (Two Spikes)</option>
            <option value="dice">Fair 6-Sided Die</option>
          </select>
        </div>
        <div class="control-group">
          <label>Sample Size (n): <span id="clt-n-val" class="highlight-val">25</span></label>
          <input type="range" id="clt-n-slider" min="2" max="64" value="25" step="1">
        </div>
        <div class="control-group">
          <button id="clt-sample-btn" class="btn btn-primary">Take 1,000 Samples</button>
          <button id="clt-reset-btn" class="btn btn-secondary">Reset</button>
        </div>
      </div>
      <div class="clt-readout">
        <span>Accumulated Sample Means: <strong id="clt-count">0</strong></span>
        <span>Mean of Means: <strong id="clt-mean">--</strong></span>
        <span>Empirical SE: <strong id="clt-se">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="clt-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Insight:</strong> Regardless of how non-normal the starting population is, the sample average $\\bar{X}$ converges to a bell-shaped Gaussian normal distribution!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#clt-canvas');
    const ctx = canvas.getContext('2d');
    const popSelect = wrap.querySelector('#clt-pop-select');
    const nSlider = wrap.querySelector('#clt-n-slider');
    const nVal = wrap.querySelector('#clt-n-val');
    const sampleBtn = wrap.querySelector('#clt-sample-btn');
    const resetBtn = wrap.querySelector('#clt-reset-btn');
    const countEl = wrap.querySelector('#clt-count');
    const meanEl = wrap.querySelector('#clt-mean');
    const seEl = wrap.querySelector('#clt-se');

    let accumulatedMeans = [];

    const drawPopSample = (dist) => {
      if (dist === 'skewed') return -Math.log(Math.random() + 1e-9) * 4;
      if (dist === 'uniform') return Math.random() * 10;
      if (dist === 'bimodal') return Math.random() < 0.5 ? 2 + Math.random() * 2 : 7 + Math.random() * 2;
      return Math.floor(Math.random() * 6) + 1; // dice
    };

    const runBatches = (batchCount = 1000) => {
      const n = parseInt(nSlider.value);
      const dist = popSelect.value;

      for (let b = 0; b < batchCount; b++) {
        let sum = 0;
        for (let i = 0; i < n; i++) sum += drawPopSample(dist);
        accumulatedMeans.push(sum / n);
      }
      draw();
    };

    const draw = () => {
      nVal.textContent = nSlider.value;
      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const count = accumulatedMeans.length;
      countEl.textContent = count;

      if (count === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Click "Take 1,000 Samples" to simulate the Central Limit Theorem!', w / 2, H / 2);
        meanEl.textContent = '--';
        seEl.textContent = '--';
        return;
      }

      // Compute statistics
      let sum = 0;
      accumulatedMeans.forEach(x => sum += x);
      const avg = sum / count;
      let varSum = 0;
      accumulatedMeans.forEach(x => varSum += (x - avg) ** 2);
      const se = Math.sqrt(varSum / Math.max(1, count - 1));

      meanEl.textContent = avg.toFixed(3);
      seEl.textContent = se.toFixed(3);

      // Plot Histogram
      const padL = 50, padR = 30, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      const minX = avg - 3.8 * se;
      const maxX = avg + 3.8 * se;
      const numBins = 40;
      const h = (maxX - minX) / numBins;
      const bins = new Array(numBins).fill(0);

      accumulatedMeans.forEach(x => {
        if (x >= minX && x < maxX) {
          const idx = Math.floor((x - minX) / h);
          if (idx >= 0 && idx < numBins) bins[idx]++;
        }
      });

      const maxBin = Math.max(1, ...bins);

      // Bars
      for (let i = 0; i < numBins; i++) {
        const xPix = padL + (i / numBins) * plotW;
        const barW = plotW / numBins - 1;
        const barH = (bins[i] / maxBin) * (plotH - 25);
        const yPix = (H - padB) - barH;

        ctx.fillStyle = '#10b981';
        ctx.fillRect(xPix, yPix, Math.max(1, barW), barH);
      }

      // Theoretical Normal Curve Overlay
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const xVal = minX + (px / plotW) * (maxX - minX);
        const z = (xVal - avg) / (se || 1);
        const theoreticalDensity = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        // Scaled to histogram height
        const yPix = (H - padB) - theoreticalDensity * (plotH - 25) * 2.4;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Axes & Mean line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      const meanXPix = padL + ((avg - minX) / (maxX - minX)) * plotW;
      ctx.beginPath();
      ctx.moveTo(meanXPix, padT);
      ctx.lineTo(meanXPix, H - padB);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Mean = ${avg.toFixed(2)}`, meanXPix, padT - 8);
    };

    sampleBtn.addEventListener('click', () => runBatches(1000));
    resetBtn.addEventListener('click', () => {
      accumulatedMeans = [];
      draw();
    });
    nSlider.addEventListener('input', () => {
      accumulatedMeans = [];
      draw();
    });
    popSelect.addEventListener('change', () => {
      accumulatedMeans = [];
      draw();
    });

    draw();
  }

  // ==========================================
  // 3. BESSEL'S CORRECTION (N vs N-1) LAB
  // ==========================================
  renderBesselLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Sample Size (n): <span id="bessel-n-val" class="highlight-val">4</span></label>
          <input type="range" id="bessel-n-slider" min="2" max="15" value="4" step="1">
        </div>
        <div class="control-group">
          <button id="bessel-run-btn" class="btn btn-primary">Draw 5,000 Samples</button>
          <button id="bessel-reset-btn" class="btn btn-secondary">Reset</button>
        </div>
      </div>
      <div class="clt-readout">
        <span>True Population Variance (\\(\\sigma^2\\)): <strong>16.00</strong></span>
        <span>Average Dividing by N: <strong id="bessel-n-avg" style="color: #ef4444;">--</strong></span>
        <span>Average Dividing by N-1: <strong id="bessel-n1-avg" style="color: #10b981;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="bessel-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>Mathematical Proof:</strong> Deviations from sample mean $\\bar{x}$ are always smaller than deviations from true population mean $\\mu$. Dividing by $N$ underestimates variance by exactly $\\frac{N-1}{N}$.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#bessel-canvas');
    const ctx = canvas.getContext('2d');
    const nSlider = wrap.querySelector('#bessel-n-slider');
    const nVal = wrap.querySelector('#bessel-n-val');
    const runBtn = wrap.querySelector('#bessel-run-btn');
    const resetBtn = wrap.querySelector('#bessel-reset-btn');
    const nAvgEl = wrap.querySelector('#bessel-n-avg');
    const n1AvgEl = wrap.querySelector('#bessel-n1-avg');

    let historyN = [];
    let historyN1 = [];
    const trueSigma2 = 16.0;

    const runSim = (samplesCount = 5000) => {
      const n = parseInt(nSlider.value);
      for (let s = 0; s < samplesCount; s++) {
        // Draw n from N(10, 4) -> true sigma^2 = 16
        const draws = [];
        let mean = 0;
        for (let i = 0; i < n; i++) {
          const u1 = Math.random(), u2 = Math.random();
          const val = 10 + 4.0 * Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
          draws.push(val);
          mean += val;
        }
        mean /= n;

        let ss = 0;
        draws.forEach(d => ss += (d - mean) ** 2);
        historyN.push(ss / n);
        historyN1.push(ss / (n - 1));
      }
      draw();
    };

    const draw = () => {
      nVal.textContent = nSlider.value;
      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const total = historyN.length;
      if (total === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Click "Draw 5,000 Samples" to simulate Bessel\'s Correction!', w / 2, H / 2);
        nAvgEl.textContent = '--';
        n1AvgEl.textContent = '--';
        return;
      }

      const avgN = historyN.reduce((a, b) => a + b, 0) / total;
      const avgN1 = historyN1.reduce((a, b) => a + b, 0) / total;

      nAvgEl.textContent = `${avgN.toFixed(2)} (Biased - Underestimates!)`;
      n1AvgEl.textContent = `${avgN1.toFixed(2)} (Unbiased - Exact!)`;

      // Plot comparison bars / histograms
      const padL = 60, padR = 40, padT = 40, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw Truth line at 16.0
      const maxVal = 32.0;
      const truthX = padL + (trueSigma2 / maxVal) * plotW;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(truthX, padT);
      ctx.lineTo(truthX, H - padB);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`True \\sigma^2 = 16.0`, truthX, padT - 10);

      // Dividing by N line (Red)
      const nX = padL + (avgN / maxVal) * plotW;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(nX, padT + 20);
      ctx.lineTo(nX, H - padB);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Div by N: ${avgN.toFixed(2)}`, nX, H - padB + 20);

      // Dividing by N-1 line (Green)
      const n1X = padL + (avgN1 / maxVal) * plotW;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(n1X, padT + 20);
      ctx.lineTo(n1X, H - padB);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.fillText(`Div by N-1: ${avgN1.toFixed(2)}`, n1X, H - padB + 34);
    };

    runBtn.addEventListener('click', () => runSim(5000));
    resetBtn.addEventListener('click', () => {
      historyN = [];
      historyN1 = [];
      draw();
    });
    nSlider.addEventListener('input', () => {
      historyN = [];
      historyN1 = [];
      draw();
    });

    draw();
  }

  // ==========================================
  // 4. STATISTICAL POWER & HYPOTHESIS TESTING LAB
  // ==========================================
  renderPowerLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Effect Size (\\(\\delta\\)): <span id="pwr-delta-val" class="highlight-val">2.0</span></label>
          <input type="range" id="pwr-delta" min="0.5" max="4.0" value="2.0" step="0.1">
        </div>
        <div class="control-group">
          <label>Sample Size (n): <span id="pwr-n-val" class="highlight-val">16</span></label>
          <input type="range" id="pwr-n" min="4" max="64" value="16" step="1">
        </div>
        <div class="control-group">
          <label>Significance (\\(\\alpha\\)): <span id="pwr-alpha-val" class="highlight-val">0.05</span></label>
          <input type="range" id="pwr-alpha" min="0.01" max="0.10" value="0.05" step="0.01">
        </div>
      </div>
      <div class="clt-readout">
        <span>Type I Error (\\(\\alpha\\)): <strong style="color: #ef4444;" id="pwr-alpha-read">5%</strong></span>
        <span>Type II Error (\\(\\beta\\)): <strong style="color: #8b5cf6;" id="pwr-beta-read">--</strong></span>
        <span>Statistical Power (\\(1 - \\beta\\)): <strong style="color: #10b981;" id="pwr-power-read">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="pwr-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Power Rule:</strong> Increase sample size or effect size, and the alternative curve moves away from the null, pushing power ($1-\\beta$) toward 100%!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#pwr-canvas');
    const ctx = canvas.getContext('2d');
    const deltaSlider = wrap.querySelector('#pwr-delta');
    const nSlider = wrap.querySelector('#pwr-n');
    const alphaSlider = wrap.querySelector('#pwr-alpha');

    const deltaVal = wrap.querySelector('#pwr-delta-val');
    const nVal = wrap.querySelector('#pwr-n-val');
    const alphaVal = wrap.querySelector('#pwr-alpha-val');

    const alphaRead = wrap.querySelector('#pwr-alpha-read');
    const betaRead = wrap.querySelector('#pwr-beta-read');
    const powerRead = wrap.querySelector('#pwr-power-read');

    const normCDF = (x) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(x));
      const d = 0.3989423 * Math.exp(-x * x / 2);
      const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return x > 0 ? 1 - prob : prob;
    };

    const draw = () => {
      const delta = parseFloat(deltaSlider.value);
      const n = parseInt(nSlider.value);
      const alpha = parseFloat(alphaSlider.value);

      deltaVal.textContent = delta.toFixed(1);
      nVal.textContent = n;
      alphaVal.textContent = alpha.toFixed(2);

      const sigma = 3.0;
      const se = sigma / Math.sqrt(n);

      // Critical cutoff Z for two-sided test
      const zCrit = alpha === 0.01 ? 2.576 : (alpha === 0.05 ? 1.96 : 1.645);
      const xCrit = 0 + zCrit * se;

      // Power = 1 - beta = P(X >= xCrit | Alternative H1)
      const zAlt = (xCrit - delta) / se;
      const beta = normCDF(zAlt);
      const power = 1 - beta;

      alphaRead.textContent = `${(alpha * 100).toFixed(0)}%`;
      betaRead.textContent = `${(beta * 100).toFixed(1)}%`;
      powerRead.textContent = `${(power * 100).toFixed(1)}%`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 40, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      const minX = -4.0, maxX = 8.0;

      // Draw Null Curve (H0, center 0)
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const x = minX + (px / plotW) * (maxX - minX);
        const z0 = (x - 0) / se;
        const dens = Math.exp(-0.5 * z0 * z0) / (se * Math.sqrt(2 * Math.PI));
        const yPix = (H - padB) - (dens * se) * (plotH - 20) * 2.2;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Draw Alternative Curve (H1, center delta)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const x = minX + (px / plotW) * (maxX - minX);
        const z1 = (x - delta) / se;
        const dens = Math.exp(-0.5 * z1 * z1) / (se * Math.sqrt(2 * Math.PI));
        const yPix = (H - padB) - (dens * se) * (plotH - 20) * 2.2;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Critical line
      const critPix = padL + ((xCrit - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(critPix, padT);
      ctx.lineTo(critPix, H - padB);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Critical Value`, critPix, padT - 5);

      // Labels
      ctx.fillStyle = '#64748b';
      ctx.fillText('Null H0 (\\mu = 0)', padL + ((0 - minX) / (maxX - minX)) * plotW, padT + 30);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Alt H1 (\\mu = ${delta.toFixed(1)})`, padL + ((delta - minX) / (maxX - minX)) * plotW, padT + 15);
    };

    deltaSlider.addEventListener('input', draw);
    nSlider.addEventListener('input', draw);
    alphaSlider.addEventListener('input', draw);

    draw();
  }

  // ==========================================
  // 5. QUANTILE-QUANTILE (Q-Q) PLOT STUDIO
  // ==========================================
  renderQQPlotLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Sample Distribution:</label>
          <select id="qq-dist" class="lab-select">
            <option value="normal">Standard Normal N(0, 1) -> Straight Line</option>
            <option value="heavy">Heavy-Tailed (Student t df=3) -> Inverted S</option>
            <option value="skewed">Right-Skewed (Exponential) -> Upward Curve</option>
            <option value="uniform">Light-Tailed (Uniform) -> S-Curve</option>
          </select>
        </div>
        <div class="control-group">
          <label>Sample Size (n): <span id="qq-n-val" class="highlight-val">100</span></label>
          <input type="range" id="qq-n" min="30" max="300" value="100" step="10">
        </div>
      </div>
      <div class="canvas-wrapper">
        <canvas id="qq-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Diagnostic:</strong> If dots fall along the diagonal line, data is normal! Upward bend = Skew. S-shape = Tail thickness differences.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#qq-canvas');
    const ctx = canvas.getContext('2d');
    const distSelect = wrap.querySelector('#qq-dist');
    const nSlider = wrap.querySelector('#qq-n');
    const nVal = wrap.querySelector('#qq-n-val');

    const normInv = (p) => {
      // Acklam normal quantile approximation
      const a = [-39.69683, 220.94609, -275.92851, 138.35775, -30.66479, 2.50662];
      const b = [-54.47609, 161.58583, -155.69897, 66.80131, -13.28068];
      const q = p - 0.5;
      if (Math.abs(q) <= 0.42) {
        const r = q * q;
        return q * (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5]) / (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
      }
      const r = p < 0.5 ? p : 1 - p;
      const s = Math.sqrt(-Math.log(r));
      let val = s - (2.515517 + 0.802853*s + 0.010328*s*s) / (1 + 1.432788*s + 0.189269*s*s + 0.001308*s*s*s);
      return p < 0.5 ? -val : val;
    };

    const draw = () => {
      const n = parseInt(nSlider.value);
      nVal.textContent = n;
      const dist = distSelect.value;

      // Generate data
      const data = [];
      for (let i = 0; i < n; i++) {
        if (dist === 'normal') {
          const u = Math.random(), v = Math.random();
          data.push(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
        } else if (dist === 'heavy') {
          // t(df=3) = Z / sqrt(chisq/3)
          const z = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
          const c = -2 * Math.log(Math.random()) - 2 * Math.log(Math.random());
          data.push(z / Math.sqrt((c + 1e-9) / 3));
        } else if (dist === 'skewed') {
          data.push(-Math.log(Math.random() + 1e-9));
        } else {
          data.push((Math.random() - 0.5) * 3.4);
        }
      }

      data.sort((a, b) => a - b);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const pad = 50;
      const plotW = w - 2 * pad, plotH = H - 2 * pad;

      // Axes
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(pad, pad, plotW, plotH);

      // Reference Line 45 degrees
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pad, H - pad);
      ctx.lineTo(w - pad, pad);
      ctx.stroke();
      ctx.setLineDash([]);

      // Compute pairs: (theoretical quantile, sample quantile)
      const minTheoretical = -3.2, maxTheoretical = 3.2;
      const minSample = Math.min(-3.2, data[0]);
      const maxSample = Math.max(3.2, data[data.length - 1]);

      ctx.fillStyle = '#38bdf8';
      for (let i = 0; i < n; i++) {
        const p = (i + 0.5) / n;
        const qTheo = normInv(p);
        const qSamp = data[i];

        const xPix = pad + ((qTheo - minTheoretical) / (maxTheoretical - minTheoretical)) * plotW;
        const yPix = (H - pad) - ((qSamp - minSample) / (maxSample - minSample)) * plotH;

        ctx.beginPath();
        ctx.arc(xPix, yPix, 3.5, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Theoretical Normal Quantiles', pad + plotW / 2, H - 15);
      ctx.save();
      ctx.translate(15, pad + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Sample Quantiles', 0, 0);
      ctx.restore();
    };

    distSelect.addEventListener('change', draw);
    nSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 6. PROBABILITY VS LIKELIHOOD LAB (Video #54)
  // ==========================================
  renderProbVsLikLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Mode:</label>
          <select id="pvl-mode" class="lab-select">
            <option value="prob">Probability Mode (Fixed Distribution, Variable Interval)</option>
            <option value="lik">Likelihood Mode (Fixed Data Point, Variable Parameters)</option>
          </select>
        </div>
        <div class="control-group" id="pvl-param-group">
          <label id="pvl-slider-label">Interval Boundary: <span id="pvl-slider-val" class="highlight-val">1.0</span></label>
          <input type="range" id="pvl-slider" min="-3" max="3" value="1.0" step="0.1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Current Metric: <strong id="pvl-metric-name" style="color: #38bdf8;">Probability (Area)</strong></span>
        <span>Value: <strong id="pvl-metric-val" style="color: #f59e0b;">0.3413</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="pvl-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Signature BAM (#54):</strong> Probability is the AREA under a fixed curve! Likelihood is the HEIGHT of a shifting curve at your fixed data point!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#pvl-canvas');
    const ctx = canvas.getContext('2d');
    const modeSelect = wrap.querySelector('#pvl-mode');
    const slider = wrap.querySelector('#pvl-slider');
    const sliderLabel = wrap.querySelector('#pvl-slider-label');
    const sliderVal = wrap.querySelector('#pvl-slider-val');
    const metricName = wrap.querySelector('#pvl-metric-name');
    const metricVal = wrap.querySelector('#pvl-metric-val');

    const draw = () => {
      const mode = modeSelect.value;
      const val = parseFloat(slider.value);
      sliderVal.textContent = val.toFixed(1);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 40, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -4, maxX = 4;

      if (mode === 'prob') {
        sliderLabel.innerHTML = `Right Boundary (b): <span class="highlight-val">${val.toFixed(1)}</span>`;
        metricName.textContent = 'Probability P(0 <= X <= b) (Area under curve)';

        // Fixed Distribution: N(0, 1)
        // Shaded area from 0 to val
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        const startXPix = padL + ((0 - minX) / (maxX - minX)) * plotW;
        ctx.moveTo(startXPix, H - padB);

        const step = 0.05;
        const lower = Math.min(0, val), upper = Math.max(0, val);
        for (let x = lower; x <= upper; x += step) {
          const dens = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
          const xPix = padL + ((x - minX) / (maxX - minX)) * plotW;
          const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
          ctx.lineTo(xPix, yPix);
        }
        const endXPix = padL + ((val - minX) / (maxX - minX)) * plotW;
        ctx.lineTo(endXPix, H - padB);
        ctx.closePath();
        ctx.fill();

        // Draw Normal Curve
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let px = 0; px <= plotW; px += 2) {
          const x = minX + (px / plotW) * (maxX - minX);
          const dens = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
          const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
          if (px === 0) ctx.moveTo(padL + px, yPix);
          else ctx.lineTo(padL + px, yPix);
        }
        ctx.stroke();

        // Area calculation
        let area = 0;
        for (let x = lower; x <= upper; x += 0.001) {
          area += (Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)) * 0.001;
        }
        metricVal.textContent = area.toFixed(4);

      } else {
        // Likelihood Mode: Fixed data point at x_obs = 1.0, shifting candidate mu
        const xObs = 1.0;
        sliderLabel.innerHTML = `Candidate Mean (\\(\\mu\\)): <span class="highlight-val">${val.toFixed(1)}</span>`;
        metricName.textContent = 'Likelihood L(\\mu | x=1.0) (Height of curve)';

        const candMu = val;

        // Draw shifting Normal Curve N(candMu, 1)
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let px = 0; px <= plotW; px += 2) {
          const x = minX + (px / plotW) * (maxX - minX);
          const dens = Math.exp(-0.5 * (x - candMu) ** 2) / Math.sqrt(2 * Math.PI);
          const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
          if (px === 0) ctx.moveTo(padL + px, yPix);
          else ctx.lineTo(padL + px, yPix);
        }
        ctx.stroke();

        // Fixed data point marker at xObs = 1.0
        const obsXPix = padL + ((xObs - minX) / (maxX - minX)) * plotW;
        const curHeight = Math.exp(-0.5 * (xObs - candMu) ** 2) / Math.sqrt(2 * Math.PI);
        const obsYPix = (H - padB) - curHeight * (plotH - 20) * 2.2;

        // Vertical height pillar
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(obsXPix, H - padB);
        ctx.lineTo(obsXPix, obsYPix);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(obsXPix, obsYPix, 6, 0, 2 * Math.PI);
        ctx.fill();

        metricVal.textContent = curHeight.toFixed(4);
      }
    };

    modeSelect.addEventListener('change', draw);
    slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 7. BAYES' THEOREM SCREENING LAB
  // ==========================================
  renderBayesLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Prevalence (Base Rate): <span id="bayes-prev-val" class="highlight-val">1.0%</span></label>
          <input type="range" id="bayes-prev" min="0.1" max="10.0" value="1.0" step="0.1">
        </div>
        <div class="control-group">
          <label>Test Sensitivity: <span id="bayes-sens-val" class="highlight-val">99%</span></label>
          <input type="range" id="bayes-sens" min="80" max="100" value="99" step="1">
        </div>
        <div class="control-group">
          <label>Test Specificity: <span id="bayes-spec-val" class="highlight-val">95%</span></label>
          <input type="range" id="bayes-spec" min="80" max="100" value="95" step="1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Probability of Disease given Positive Test \\(P(D \\mid +)\\): <strong id="bayes-posterior" style="color: #ef4444; font-size: 1.2rem;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="bayes-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>The Base Rate Fallacy:</strong> Even with a 99% accurate test, if the disease is rare, false alarms from the healthy majority easily outnumber true positive cases!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#bayes-canvas');
    const ctx = canvas.getContext('2d');
    const prevSlider = wrap.querySelector('#bayes-prev');
    const sensSlider = wrap.querySelector('#bayes-sens');
    const specSlider = wrap.querySelector('#bayes-spec');

    const prevVal = wrap.querySelector('#bayes-prev-val');
    const sensVal = wrap.querySelector('#bayes-sens-val');
    const specVal = wrap.querySelector('#bayes-spec-val');
    const postEl = wrap.querySelector('#bayes-posterior');

    const draw = () => {
      const prev = parseFloat(prevSlider.value) / 100;
      const sens = parseFloat(sensSlider.value) / 100;
      const spec = parseFloat(specSlider.value) / 100;

      prevVal.textContent = `${(prev * 100).toFixed(1)}%`;
      sensVal.textContent = `${(sens * 100).toFixed(0)}%`;
      specVal.textContent = `${(spec * 100).toFixed(0)}%`;

      const totalPop = 100000;
      const sick = totalPop * prev;
      const healthy = totalPop * (1 - prev);

      const truePos = sick * sens;
      const falseNeg = sick * (1 - sens);
      const falsePos = healthy * (1 - spec);
      const trueNeg = healthy * spec;

      const totalPos = truePos + falsePos;
      const posterior = totalPos > 0 ? (truePos / totalPos) : 0;

      postEl.textContent = `${(posterior * 100).toFixed(1)}%`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      // Draw Tree Diagram
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;

      // Root
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Population: 100,000`, 100, H / 2);

      // Branches: Sick vs Healthy
      ctx.beginPath();
      ctx.moveTo(160, H / 2);
      ctx.lineTo(260, H / 4);
      ctx.moveTo(160, H / 2);
      ctx.lineTo(260, (3 * H) / 4);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Sick: ${sick.toFixed(0)} (${(prev * 100).toFixed(1)}%)`, 280, H / 4);

      ctx.fillStyle = '#10b981';
      ctx.fillText(`Healthy: ${healthy.toFixed(0)} (${((1 - prev) * 100).toFixed(1)}%)`, 280, (3 * H) / 4);

      // Secondary branches: Test Results
      ctx.beginPath();
      ctx.moveTo(340, H / 4);
      ctx.lineTo(440, H / 8);
      ctx.moveTo(340, H / 4);
      ctx.lineTo(440, (3 * H) / 8);

      ctx.moveTo(340, (3 * H) / 4);
      ctx.lineTo(440, (5 * H) / 8);
      ctx.moveTo(340, (3 * H) / 4);
      ctx.lineTo(440, (7 * H) / 8);
      ctx.stroke();

      // Outcomes
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`True Positives (+): ${truePos.toFixed(0)}`, 540, H / 8);
      ctx.fillStyle = '#64748b';
      ctx.fillText(`False Negatives (-): ${falseNeg.toFixed(0)}`, 540, (3 * H) / 8);

      ctx.fillStyle = '#ef4444';
      ctx.fillText(`False Positives (+): ${falsePos.toFixed(0)}`, 540, (5 * H) / 8);
      ctx.fillStyle = '#64748b';
      ctx.fillText(`True Negatives (-): ${trueNeg.toFixed(0)}`, 540, (7 * H) / 8);

      // Contrast box
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.fillRect(450, (5 * H) / 8 - 14, 210, 24);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.fillRect(450, H / 8 - 14, 210, 24);
    };

    prevSlider.addEventListener('input', draw);
    sensSlider.addEventListener('input', draw);
    specSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 8. ODDS AND LOG-ODDS (LOGIT) LAB
  // ==========================================
  renderOddsLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Probability (p): <span id="odds-p-val" class="highlight-val">0.80</span></label>
          <input type="range" id="odds-p" min="0.01" max="0.99" value="0.80" step="0.01">
        </div>
      </div>
      <div class="clt-readout">
        <span>Probability: <strong id="read-p">0.80</strong></span>
        <span>Odds \\(\\frac{p}{1-p}\\): <strong id="read-odds" style="color: #38bdf8;">4.00</strong></span>
        <span>Log-Odds (Logit): <strong id="read-logit" style="color: #f59e0b;">+1.386</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="odds-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Key Idea:</strong> Probabilities are trapped between 0 and 1. Odds range from 0 to infinity. Log(Odds) maps smoothly across all positive and negative numbers!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#odds-canvas');
    const ctx = canvas.getContext('2d');
    const pSlider = wrap.querySelector('#odds-p');
    const pVal = wrap.querySelector('#odds-p-val');

    const readP = wrap.querySelector('#read-p');
    const readOdds = wrap.querySelector('#read-odds');
    const readLogit = wrap.querySelector('#read-logit');

    const draw = () => {
      const p = parseFloat(pSlider.value);
      pVal.textContent = p.toFixed(2);

      const odds = p / (1 - p);
      const logit = Math.log(odds);

      readP.textContent = p.toFixed(2);
      readOdds.textContent = `${odds.toFixed(2)} to 1`;
      readLogit.textContent = (logit >= 0 ? '+' : '') + logit.toFixed(3);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 60, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Axes for Logit Curve
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(w - padR, H - padB);
      ctx.stroke();

      // Zero Logit line
      const zeroY = padT + plotH / 2;
      ctx.strokeStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(padL, zeroY);
      ctx.lineTo(w - padR, zeroY);
      ctx.stroke();

      // Plot Logit(p) Curve across p in (0.02, 0.98)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curP = 0.02 + (px / plotW) * 0.96;
        const curLogit = Math.log(curP / (1 - curP));
        // Map logit in [-4, 4] to plotH
        const yPix = zeroY - (curLogit / 4.0) * (plotH / 2 - 10);
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Current Point Marker
      const ptX = padL + ((p - 0.02) / 0.96) * plotW;
      const ptY = zeroY - (logit / 4.0) * (plotH / 2 - 10);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(ptX, ptY, 7, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`(${p.toFixed(2)}, ${logit.toFixed(2)})`, ptX, ptY - 12);
    };

    pSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 9. LOESS / LOWESS LOCAL SMOOTHING LAB
  // ==========================================
  renderLoessLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Smoothing Span (frac): <span id="loess-span-val" class="highlight-val">0.30</span></label>
          <input type="range" id="loess-span" min="0.1" max="0.9" value="0.30" step="0.05">
        </div>
      </div>
      <div class="canvas-wrapper">
        <canvas id="loess-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Loess Principle:</strong> Fits tiny weighted regressions within local sliding windows using the tricube kernel.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#loess-canvas');
    const ctx = canvas.getContext('2d');
    const spanSlider = wrap.querySelector('#loess-span');
    const spanVal = wrap.querySelector('#loess-span-val');

    // Synthetic non-linear data
    const pts = [];
    for (let x = 0; x <= 10; x += 0.25) {
      const y = Math.sin(x) * 3 + Math.cos(x * 0.5) * 2 + (Math.random() - 0.5) * 1.8;
      pts.push({ x, y });
    }

    const draw = () => {
      const span = parseFloat(spanSlider.value);
      spanVal.textContent = span.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 40, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw Raw Points
      ctx.fillStyle = '#38bdf8';
      pts.forEach(pt => {
        const px = padL + (pt.x / 10) * plotW;
        const py = (H - padB) - ((pt.y + 6) / 12) * plotH;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Fit Loess curve
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const k = Math.max(3, Math.floor(pts.length * span));
      for (let px = 0; px <= plotW; px += 4) {
        const curX = (px / plotW) * 10;

        // Distances
        const dists = pts.map(p => ({ p, d: Math.abs(p.x - curX) }));
        dists.sort((a, b) => a.d - b.d);
        const maxDist = dists[k - 1].d || 1e-5;

        // Tricube weights
        let sumW = 0, sumWY = 0;
        for (let i = 0; i < k; i++) {
          const u = dists[i].d / maxDist;
          const weight = (1 - u ** 3) ** 3;
          sumW += weight;
          sumWY += weight * dists[i].p.y;
        }
        const smoothedY = sumWY / (sumW || 1);
        const py = (H - padB) - ((smoothedY + 6) / 12) * plotH;

        if (px === 0) ctx.moveTo(padL + px, py);
        else ctx.lineTo(padL + px, py);
      }
      ctx.stroke();
    };

    spanSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 10. BOOTSTRAP RESAMPLING LAB
  // ==========================================
  renderBootstrapLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <button id="boot-run-btn" class="btn btn-primary">Draw 1,000 Bootstrap Resamples</button>
          <button id="boot-reset-btn" class="btn btn-secondary">Reset</button>
        </div>
      </div>
      <div class="clt-readout">
        <span>Original Data: [12, 14, 15, 18, 45]</span>
        <span>Original Median: <strong>15.0</strong></span>
        <span>Bootstrap 95% CI: <strong id="boot-ci" style="color: #10b981;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="boot-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>Bootstrapping Magic:</strong> Resampling WITH REPLACEMENT simulates the sampling distribution of complex statistics without any formulas!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#boot-canvas');
    const ctx = canvas.getContext('2d');
    const runBtn = wrap.querySelector('#boot-run-btn');
    const resetBtn = wrap.querySelector('#boot-reset-btn');
    const ciEl = wrap.querySelector('#boot-ci');

    const originalData = [12, 14, 15, 18, 45];
    let resampledMedians = [];

    const draw = () => {
      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      if (resampledMedians.length === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Click "Draw 1,000 Bootstrap Resamples" to begin!', w / 2, H / 2);
        ciEl.textContent = '--';
        return;
      }

      resampledMedians.sort((a, b) => a - b);
      const low = resampledMedians[Math.floor(resampledMedians.length * 0.025)];
      const high = resampledMedians[Math.floor(resampledMedians.length * 0.975)];
      ciEl.textContent = `[${low.toFixed(1)}, ${high.toFixed(1)}]`;

      // Plot histogram of medians
      const counts = {};
      resampledMedians.forEach(m => counts[m] = (counts[m] || 0) + 1);

      const keys = Object.keys(counts).map(Number).sort((a, b) => a - b);
      const maxC = Math.max(...Object.values(counts));

      const padL = 60, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      keys.forEach((k, i) => {
        const xPix = padL + (i / keys.length) * plotW;
        const barW = plotW / keys.length - 8;
        const barH = (counts[k] / maxC) * (plotH - 20);
        const yPix = (H - padB) - barH;

        ctx.fillStyle = (k >= low && k <= high) ? '#10b981' : '#ef4444';
        ctx.fillRect(xPix, yPix, barW, barH);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(k, xPix + barW / 2, H - padB + 16);
      });
    };

    runBtn.addEventListener('click', () => {
      for (let b = 0; b < 1000; b++) {
        const resample = [];
        for (let i = 0; i < originalData.length; i++) {
          resample.push(originalData[Math.floor(Math.random() * originalData.length)]);
        }
        resample.sort((a, b) => a - b);
        resampledMedians.push(resample[Math.floor(resample.length / 2)]);
      }
      draw();
    });

    resetBtn.addEventListener('click', () => {
      resampledMedians = [];
      draw();
    });

    draw();
  }

  // ==========================================
  // FALLBACK DEFAULT LAB
  // ==========================================
  renderDefaultLab() {
    this.container.innerHTML = `
      <div class="interactive-lab-container" style="text-align: center; padding: 40px;">
        <h3 style="color: #38bdf8;">Interactive Concept Sandbox</h3>
        <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 20px;">
          This topic is deeply integrated with our foundational 3D and 2D simulation engines.
          Toggle the 3D Studio tab above to explore full spatial manifolds!
        </p>
      </div>
    `;
  }
}
