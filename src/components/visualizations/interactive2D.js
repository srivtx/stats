// src/components/visualizations/interactive2D.js
/**
 * 2D Interactive Statistical Laboratories for StatQuest Website.
 * Comprehensive Canvas & Dynamic SVG interactive simulators covering all 62 curriculum topics.
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
      case 'pdf_cdf':
      case 'normal3d':
        this.renderPdfCdfLab();
        break;
      case 'central_tendency':
        this.renderCentralTendencyLab();
        break;
      case 'exponential':
        this.renderExponentialLab();
        break;
      case 'pop_vs_sample':
      case 'sampling_sim':
        this.renderPopVsSampleLab();
        break;
      case 'variance_calc':
        this.renderVarianceCalcLab();
        break;
      case 'math_model':
        this.renderMathModelLab();
        break;
      case 'null_hypothesis':
      case 'alt_hypothesis':
      case 'p_value_concept':
      case 'p_value_calc':
        this.renderHypothesisTestingLab();
        break;
      case 'fishers_exact':
        this.renderFishersExactLab();
        break;
      case 'p_hacking':
        this.renderPHackingLab();
        break;
      case 'fdr_bh':
        this.renderFdrLab();
        break;
      case 'power':
      case 'power_analysis':
        this.renderPowerLab();
        break;
      case 'covariance':
      case 'cov3d':
        this.renderCovarianceLab();
        break;
      case 'conditional_prob':
        this.renderConditionalProbLab();
        break;
      case 'bayes':
        this.renderBayesLab();
        break;
      case 'expected_value':
      case 'expected_continuous':
        this.renderExpectedValueLab();
        break;
      case 'binomial':
        this.renderBinomialLab();
        break;
      case 'clt':
        this.renderCLTLab();
        break;
      case 'sample_size':
      case 'replicates':
      case 'se_scaling':
        this.renderSampleSizeLab();
        break;
      case 'sd_vs_se':
        this.renderSdVsSeLab();
        break;
      case 'bootstrap':
      case 'bootstrap_p':
        this.renderBootstrapLab();
        break;
      case 'bar_vs_pie':
        this.renderBarVsPieLab();
        break;
      case 'boxplot':
        this.renderBoxplotLab();
        break;
      case 'log_transform':
        this.renderLogTransformLab();
        break;
      case 'confidence_intervals':
        this.renderConfidenceIntervalsLab();
        break;
      case 'r_squared':
      case 'regression_intro':
      case 'least_squares_line':
      case 'regression_deep':
      case 'r_regression':
      case 'regression3d':
        this.renderRegressionLineLab();
        break;
      case 'loess':
        this.renderLoessLab();
        break;
      case 'multiple_r':
      case 'linear_models_anova':
      case 'design_matrix':
        this.renderAnovaLab();
        break;
      case 'alpha_thresholds':
      case 'bam_moment':
        this.renderAlphaThresholdsLab();
        break;
      case 't_test_selector':
        this.renderTTestSelectorLab();
        break;
      case 'one_vs_two_tailed':
        this.renderOneVsTwoTailedLab();
        break;
      case 'quantiles':
      case 'quantile_norm':
        this.renderQuantileNormLab();
        break;
      case 'qqplot':
        this.renderQQPlotLab();
        break;
      case 'prob_vs_lik':
        this.renderProbVsLikLab();
        break;
      case 'mle3d':
      case 'mle_exp':
      case 'mle_binom':
      case 'mle_norm':
        this.renderMleLab();
        break;
      case 'odds':
      case 'odds_ratios':
        this.renderOddsLab();
        break;
      case 'bessel':
      case 'frank_starmer':
        this.renderBesselLab();
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

    const generateData = (dist) => {
      const data = [];
      const n = 600;
      for (let i = 0; i < n; i++) {
        if (dist === 'normal') {
          const u = Math.random(), v = Math.random();
          data.push(100 + 15 * Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v));
        } else if (dist === 'bimodal') {
          if (Math.random() < 0.5) {
            const u = Math.random(), v = Math.random();
            data.push(80 + 10 * Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v));
          } else {
            const u = Math.random(), v = Math.random();
            data.push(125 + 10 * Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v));
          }
        } else if (dist === 'skewed') {
          const u = Math.random(), v = Math.random();
          const z = Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v);
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

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(w - padR, H - padB);
      ctx.stroke();

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

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      for (let val = 60; val <= 160; val += 20) {
        const xPix = padL + ((val - minX) / (maxX - minX)) * plotW;
        ctx.fillText(val, xPix, H - padB + 16);
      }
      ctx.fillText('Measurement Value (X)', padL + plotW / 2, H - 10);

      ctx.textAlign = 'right';
      ctx.fillText('0', padL - 8, H - padB);
      ctx.fillText(maxBin, padL - 8, padT + 25);

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
          const y = (H - padB) - (pt.density / (maxKDE || 1)) * (plotH - 25);
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
  // 2. PDF vs CDF INTERACTIVE CURVE EXPLORER (#2, #3)
  // ==========================================
  renderPdfCdfLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Mean (\\(\\mu\\)): <span id="pdf-mu-val" class="highlight-val">0.0</span></label>
          <input type="range" id="pdf-mu" min="-2.0" max="2.0" value="0.0" step="0.2">
        </div>
        <div class="control-group">
          <label>Std Dev (\\(\\sigma\\)): <span id="pdf-sig-val" class="highlight-val">1.0</span></label>
          <input type="range" id="pdf-sig" min="0.5" max="2.5" value="1.0" step="0.1">
        </div>
        <div class="control-group">
          <label>Upper Bound (x): <span id="pdf-x-val" class="highlight-val">1.0</span></label>
          <input type="range" id="pdf-x" min="-4.0" max="4.0" value="1.0" step="0.1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Cumulative Area \\(P(X \\le x)\\): <strong id="pdf-prob" style="color: #38bdf8;">0.8413</strong></span>
        <span>CDF Value \\(F(x)\\): <strong id="cdf-val" style="color: #10b981;">0.8413</strong></span>
        <span>PDF Height \\(f(x)\\): <strong id="pdf-dens" style="color: #f59e0b;">0.2420</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="pdf-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Principle:</strong> The Cumulative Distribution Function (CDF) height at point $x$ is EXACTLY the shaded area under the Probability Density Function (PDF) curve from $-\\infty$ to $x$!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#pdf-canvas');
    const ctx = canvas.getContext('2d');
    const muSlider = wrap.querySelector('#pdf-mu');
    const sigSlider = wrap.querySelector('#pdf-sig');
    const xSlider = wrap.querySelector('#pdf-x');

    const muVal = wrap.querySelector('#pdf-mu-val');
    const sigVal = wrap.querySelector('#pdf-sig-val');
    const xVal = wrap.querySelector('#pdf-x-val');

    const probRead = wrap.querySelector('#pdf-prob');
    const cdfRead = wrap.querySelector('#cdf-val');
    const densRead = wrap.querySelector('#pdf-dens');

    const normCDF = (z) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return z > 0 ? 1 - prob : prob;
    };

    const draw = () => {
      const mu = parseFloat(muSlider.value);
      const sig = parseFloat(sigSlider.value);
      const x = parseFloat(xSlider.value);

      muVal.textContent = mu.toFixed(1);
      sigVal.textContent = sig.toFixed(1);
      xVal.textContent = x.toFixed(1);

      const z = (x - mu) / sig;
      const cdf = normCDF(z);
      const dens = Math.exp(-0.5 * z * z) / (sig * Math.sqrt(2 * Math.PI));

      probRead.textContent = cdf.toFixed(4);
      cdfRead.textContent = cdf.toFixed(4);
      densRead.textContent = dens.toFixed(4);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -4.5, maxX = 4.5;

      // Draw Shaded PDF Area up to x
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      const startX = padL;
      ctx.moveTo(startX, H - padB);

      const xCutPix = padL + ((x - minX) / (maxX - minX)) * plotW;
      for (let px = 0; px <= (xCutPix - padL); px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const curZ = (curX - mu) / sig;
        const curD = Math.exp(-0.5 * curZ * curZ) / (sig * Math.sqrt(2 * Math.PI));
        const yPix = (H - padB) - curD * (plotH - 20) * 1.8;
        ctx.lineTo(padL + px, yPix);
      }
      ctx.lineTo(xCutPix, H - padB);
      ctx.closePath();
      ctx.fill();

      // Draw PDF Curve (Cyan)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const curZ = (curX - mu) / sig;
        const curD = Math.exp(-0.5 * curZ * curZ) / (sig * Math.sqrt(2 * Math.PI));
        const yPix = (H - padB) - curD * (plotH - 20) * 1.8;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Draw CDF Curve (Green S-curve)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const curZ = (curX - mu) / sig;
        const curCDF = normCDF(curZ);
        const yPix = (H - padB) - curCDF * (plotH - 20);
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Vertical threshold marker at x
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xCutPix, padT);
      ctx.lineTo(xCutPix, H - padB);
      ctx.stroke();

      // Dot on CDF curve
      const cdfYPix = (H - padB) - cdf * (plotH - 20);
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(xCutPix, cdfYPix, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText('PDF Curve f(x)', padL + 60, padT + 20);

      ctx.fillStyle = '#10b981';
      ctx.fillText('CDF S-Curve F(x)', padL + 60, padT + 40);

      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`x = ${x.toFixed(1)}`, xCutPix, padT - 8);
    };

    muSlider.addEventListener('input', draw);
    sigSlider.addEventListener('input', draw);
    xSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 3. MEAN VS MEDIAN OUTLIER ROBUSTNESS (#4)
  // ==========================================
  renderCentralTendencyLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Outlier Position: <span id="outlier-val" class="highlight-val">25</span></label>
          <input type="range" id="outlier-slider" min="10" max="100" value="25" step="1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Sample Mean (\\(\\bar{x}\\)): <strong id="ct-mean" style="color: #ef4444;">--</strong></span>
        <span>Sample Median: <strong id="ct-median" style="color: #10b981;">--</strong></span>
        <span>Sensitivity to Outlier: <strong id="ct-sens" style="color: #f59e0b;">Mean shifts, Median resists!</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="ct-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Signature Insight:</strong> Extreme outliers pull the Mean like a magnet! The Median ignores extremes and stays solidly centered.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#ct-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#outlier-slider');
    const valEl = wrap.querySelector('#outlier-val');
    const meanEl = wrap.querySelector('#ct-mean');
    const medianEl = wrap.querySelector('#ct-median');

    const baseData = [12, 14, 15, 17, 18, 19, 21, 22];

    const draw = () => {
      const outlier = parseFloat(slider.value);
      valEl.textContent = outlier;

      const data = [...baseData, outlier].sort((a, b) => a - b);
      const mean = data.reduce((a, b) => a + b, 0) / data.length;
      const median = data[Math.floor(data.length / 2)];

      meanEl.textContent = mean.toFixed(2);
      medianEl.textContent = median.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 50, padB = 60;
      const plotW = w - padL - padR;
      const minX = 5, maxX = 105;

      // Axis Line
      const axisY = H / 2;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padL, axisY);
      ctx.lineTo(w - padR, axisY);
      ctx.stroke();

      // Plot data points
      data.forEach(pt => {
        const xPix = padL + ((pt - minX) / (maxX - minX)) * plotW;
        const isOutlier = pt === outlier;

        ctx.fillStyle = isOutlier ? '#f59e0b' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(xPix, axisY, isOutlier ? 8 : 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(pt, xPix, axisY + 22);
      });

      // Mean Indicator Line (Red)
      const meanPix = padL + ((mean - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(meanPix, axisY - 60);
      ctx.lineTo(meanPix, axisY + 40);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px system-ui';
      ctx.fillText(`Mean = ${mean.toFixed(1)}`, meanPix, axisY - 70);

      // Median Indicator Line (Green)
      const medianPix = padL + ((median - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(medianPix, axisY - 40);
      ctx.lineTo(medianPix, axisY + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#10b981';
      ctx.fillText(`Median = ${median.toFixed(1)}`, medianPix, axisY - 48);
    };

    slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 4. EXPONENTIAL DISTRIBUTION LAB (#5)
  // ==========================================
  renderExponentialLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Rate Parameter (\\(\\lambda\\)): <span id="exp-rate-val" class="highlight-val">0.5</span></label>
          <input type="range" id="exp-rate" min="0.1" max="2.0" value="0.5" step="0.1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Mean Waiting Time \\(E[X] = \\frac{1}{\\lambda}\\): <strong id="exp-mean" style="color: #38bdf8;">2.00</strong></span>
        <span>Half-Life (Median) \\(\\frac{\\ln 2}{\\lambda}\\): <strong id="exp-half" style="color: #10b981;">1.39</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="exp-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Intuition:</strong> Exponential distribution models waiting time between independent Poisson events. Most waits are short, but the long right tail never forgets its memoryless property!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#exp-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#exp-rate');
    const rateVal = wrap.querySelector('#exp-rate-val');
    const meanEl = wrap.querySelector('#exp-mean');
    const halfEl = wrap.querySelector('#exp-half');

    const draw = () => {
      const lam = parseFloat(slider.value);
      rateVal.textContent = lam.toFixed(1);
      const mean = 1 / lam;
      const median = Math.log(2) / lam;

      meanEl.textContent = mean.toFixed(2);
      halfEl.textContent = median.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const maxX = 8.0;

      // Draw Exponential Curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const x = (px / plotW) * maxX;
        const dens = lam * Math.exp(-lam * x);
        const yPix = (H - padB) - (dens / 2.0) * (plotH - 20);
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Mean line
      const meanPix = padL + (mean / maxX) * plotW;
      if (meanPix <= w - padR) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(meanPix, padT);
        ctx.lineTo(meanPix, H - padB);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`Mean = ${mean.toFixed(2)}`, meanPix, padT + 16);
      }
    };

    slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 5. POPULATION VS SAMPLE CONVERGENCE (#6, #46)
  // ==========================================
  renderPopVsSampleLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Sample Size (n): <span id="pvs-n-val" class="highlight-val">20</span></label>
          <input type="range" id="pvs-n" min="5" max="200" value="20" step="5">
        </div>
        <div class="control-group">
          <button id="pvs-draw-btn" class="btn btn-primary btn-sm">Take Random Sample</button>
        </div>
      </div>
      <div class="clt-readout">
        <span>True Population Mean (\\(\\mu\\)): <strong>50.00</strong></span>
        <span>Sample Mean (\\(\\bar{x}\\)): <strong id="pvs-xbar" style="color: #38bdf8;">--</strong></span>
        <span>Estimation Error: <strong id="pvs-err" style="color: #f59e0b;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="pvs-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Fundamental:</strong> Parameters describe the entire truth of a population (Greek letters $\\mu, \\sigma$). Estimators describe our finite glimpse from a sample (Roman letters $\\bar{x}, s$).
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#pvs-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#pvs-n');
    const nVal = wrap.querySelector('#pvs-n-val');
    const drawBtn = wrap.querySelector('#pvs-draw-btn');
    const xbarEl = wrap.querySelector('#pvs-xbar');
    const errEl = wrap.querySelector('#pvs-err');

    const trueMu = 50.0, trueSigma = 10.0;

    const runSample = () => {
      const n = parseInt(slider.value);
      nVal.textContent = n;

      let sum = 0;
      const pts = [];
      for (let i = 0; i < n; i++) {
        const u = Math.random(), v = Math.random();
        const z = Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v);
        const val = trueMu + trueSigma * z;
        pts.push(val);
        sum += val;
      }
      const xbar = sum / n;
      xbarEl.textContent = xbar.toFixed(2);
      errEl.textContent = `${Math.abs(xbar - trueMu).toFixed(2)} (${((Math.abs(xbar - trueMu) / trueMu) * 100).toFixed(1)}%)`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 40, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = 15, maxX = 85;

      // Draw True Population Density (Gray)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const z = (curX - trueMu) / trueSigma;
        const dens = Math.exp(-0.5 * z * z) / (trueSigma * Math.sqrt(2 * Math.PI));
        const yPix = (H - padB) - dens * (plotH - 20) * 18;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Draw sample points along bottom
      pts.forEach(p => {
        const px = padL + ((p - minX) / (maxX - minX)) * plotW;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.beginPath();
        ctx.arc(px, H - padB - 10, 4, 0, 2 * Math.PI);
        ctx.fill();
      });

      // True Mean Line (White)
      const truePix = padL + ((trueMu - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(truePix, padT);
      ctx.lineTo(truePix, H - padB);
      ctx.stroke();

      // Sample Mean Line (Cyan)
      const xbarPix = padL + ((xbar - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(xbarPix, padT + 20);
      ctx.lineTo(xbarPix, H - padB);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    slider.addEventListener('input', runSample);
    drawBtn.addEventListener('click', runSample);
    runSample();
  }

  // ==========================================
  // 6. VARIANCE & SQUARED RESIDUALS LAB (#7)
  // ==========================================
  renderVarianceCalcLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Data Spread: <span id="var-spread-val" class="highlight-val">Moderate</span></label>
          <input type="range" id="var-spread" min="1" max="3" value="2" step="1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Mean (\\(\\bar{x}\\)): <strong id="var-mean">10.0</strong></span>
        <span>Sum of Squared Deviations (\\(SS\\)): <strong id="var-ss" style="color: #f59e0b;">--</strong></span>
        <span>Variance (\\(s^2\\)): <strong id="var-var" style="color: #10b981;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="var-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Visual BAM:</strong> Variance is literally the average area of the geometric squares formed by each point's distance $(x_i - \\bar{x})$ to the center mean!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#var-canvas');
    const ctx = canvas.getContext('2d');
    const spreadSlider = wrap.querySelector('#var-spread');
    const spreadVal = wrap.querySelector('#var-spread-val');
    const ssEl = wrap.querySelector('#var-ss');
    const varEl = wrap.querySelector('#var-var');

    const draw = () => {
      const sp = parseInt(spreadSlider.value);
      spreadVal.textContent = sp === 1 ? 'Tight' : (sp === 2 ? 'Moderate' : 'Wide');

      const mult = sp === 1 ? 0.5 : (sp === 2 ? 1.0 : 1.8);
      const data = [6, 8, 9, 10, 11, 12, 14].map(x => 10 + (x - 10) * mult);
      const mean = 10.0;

      let ss = 0;
      data.forEach(x => ss += (x - mean) ** 2);
      const s2 = ss / (data.length - 1);

      ssEl.textContent = ss.toFixed(1);
      varEl.textContent = s2.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 60, padR = 60;
      const plotW = w - padL - padR;
      const minX = 0, maxX = 20;

      const axisY = H - 60;

      // Axis
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padL, axisY);
      ctx.lineTo(w - padR, axisY);
      ctx.stroke();

      const meanPix = padL + ((mean - minX) / (maxX - minX)) * plotW;

      // Draw squares above line
      data.forEach(x => {
        const xPix = padL + ((x - minX) / (maxX - minX)) * plotW;
        const diff = Math.abs(x - mean);
        const sqSize = (diff / (maxX - minX)) * plotW;

        ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1;
        ctx.fillRect(Math.min(xPix, meanPix), axisY - sqSize, sqSize, sqSize);
        ctx.strokeRect(Math.min(xPix, meanPix), axisY - sqSize, sqSize, sqSize);

        // Point
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(xPix, axisY, 5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Mean line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(meanPix, 20);
      ctx.lineTo(meanPix, axisY + 15);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Mean = 10.0`, meanPix, 15);
    };

    spreadSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 7. MATHEMATICAL MODELING LAB (#8)
  // ==========================================
  renderMathModelLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Model Choice:</label>
          <select id="model-select" class="lab-select">
            <option value="mean">Model 1: Mean Only (Horizontal Line)</option>
            <option value="linear">Model 2: Linear Model (Slope & Intercept)</option>
          </select>
        </div>
      </div>
      <div class="clt-readout">
        <span>Residual Sum of Squares (\\(SSR\\)): <strong id="mm-ssr" style="color: #ef4444;">--</strong></span>
        <span>Model Quality: <strong id="mm-verdict" style="color: #10b981;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="mm-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Core Concept:</strong> A mathematical model is just a simplified representation that predicts outputs from inputs while minimizing unexplained noise.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#mm-canvas');
    const ctx = canvas.getContext('2d');
    const modelSelect = wrap.querySelector('#model-select');
    const ssrEl = wrap.querySelector('#mm-ssr');
    const verdictEl = wrap.querySelector('#mm-verdict');

    const pts = [
      { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 4 }, { x: 4, y: 8 }, { x: 5, y: 7 }, { x: 6, y: 11 }
    ];

    const draw = () => {
      const mode = modelSelect.value;
      const meanY = pts.reduce((a, b) => a + b.y, 0) / pts.length;

      let ssr = 0;
      pts.forEach(p => {
        const pred = mode === 'mean' ? meanY : 1.5 * p.x + 1.2;
        ssr += (p.y - pred) ** 2;
      });

      ssrEl.textContent = ssr.toFixed(2);
      verdictEl.textContent = mode === 'mean' ? 'High Residual Error' : 'Low Error - Superior Fit!';

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw residual drop lines
      pts.forEach(p => {
        const px = padL + (p.x / 7) * plotW;
        const py = (H - padB) - (p.y / 14) * plotH;
        const pred = mode === 'mean' ? meanY : 1.5 * p.x + 1.2;
        const predYPix = (H - padB) - (pred / 14) * plotH;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, predYPix);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw Model Line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (mode === 'mean') {
        const yPix = (H - padB) - (meanY / 14) * plotH;
        ctx.moveTo(padL, yPix);
        ctx.lineTo(w - padR, yPix);
      } else {
        const y1 = 1.5 * 0 + 1.2;
        const y2 = 1.5 * 7 + 1.2;
        ctx.moveTo(padL, (H - padB) - (y1 / 14) * plotH);
        ctx.lineTo(w - padR, (H - padB) - (y2 / 14) * plotH);
      }
      ctx.stroke();
    };

    modelSelect.addEventListener('change', draw);
    draw();
  }

  // ==========================================
  // 8. HYPOTHESIS TESTING & P-VALUE EXPLORER (#9, #10, #11, #13)
  // ==========================================
  renderHypothesisTestingLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Observed Statistic (\\(t_{\\text{obs}}\\)): <span id="ht-tobs-val" class="highlight-val">2.1</span></label>
          <input type="range" id="ht-tobs" min="0.0" max="4.0" value="2.1" step="0.1">
        </div>
        <div class="control-group">
          <label>Significance Cutoff (\\(\\alpha\\)): <span id="ht-alpha-val" class="highlight-val">0.05</span></label>
          <input type="range" id="ht-alpha" min="0.01" max="0.10" value="0.05" step="0.01">
        </div>
      </div>
      <div class="clt-readout">
        <span>Calculated P-Value: <strong id="ht-pval" style="color: #38bdf8;">--</strong></span>
        <span>Decision: <strong id="ht-verdict" style="font-size: 1.1rem;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="ht-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Signature BAM:</strong> The p-value is the probability of observing something as extreme or more extreme if the null hypothesis is true! When $p \\le \\alpha$, reject the null!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#ht-canvas');
    const ctx = canvas.getContext('2d');
    const tobsSlider = wrap.querySelector('#ht-tobs');
    const alphaSlider = wrap.querySelector('#ht-alpha');
    const tobsVal = wrap.querySelector('#ht-tobs-val');
    const alphaVal = wrap.querySelector('#ht-alpha-val');
    const pvalEl = wrap.querySelector('#ht-pval');
    const verdictEl = wrap.querySelector('#ht-verdict');

    const normCDF = (z) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return z > 0 ? 1 - prob : prob;
    };

    const draw = () => {
      const tobs = parseFloat(tobsSlider.value);
      const alpha = parseFloat(alphaSlider.value);
      tobsVal.textContent = tobs.toFixed(1);
      alphaVal.textContent = alpha.toFixed(2);

      const oneTailP = 1 - normCDF(tobs);
      const twoTailP = 2 * oneTailP;
      pvalEl.textContent = twoTailP < 0.0001 ? '< 0.0001' : twoTailP.toFixed(4);

      if (twoTailP <= alpha) {
        verdictEl.textContent = `Reject H0 (Statistically Significant!)`;
        verdictEl.style.color = '#10b981';
      } else {
        verdictEl.textContent = `Fail to Reject H0 (Consistent with Chance)`;
        verdictEl.style.color = '#ef4444';
      }

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -4.0, maxX = 4.0;

      // Draw Shaded Tails (|t| >= tobs)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      for (let side of [-1, 1]) {
        ctx.beginPath();
        const startXPix = padL + (((side * tobs) - minX) / (maxX - minX)) * plotW;
        ctx.moveTo(startXPix, H - padB);

        const edgeXPix = side > 0 ? (padL + plotW) : padL;
        const step = side > 0 ? 2 : -2;
        for (let xPix = startXPix; side > 0 ? (xPix <= edgeXPix) : (xPix >= edgeXPix); xPix += step) {
          const curX = minX + ((xPix - padL) / plotW) * (maxX - minX);
          const dens = Math.exp(-0.5 * curX * curX) / Math.sqrt(2 * Math.PI);
          const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
          ctx.lineTo(xPix, yPix);
        }
        ctx.lineTo(edgeXPix, H - padB);
        ctx.closePath();
        ctx.fill();
      }

      // Draw Null Curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const dens = Math.exp(-0.5 * curX * curX) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Markers at +tobs and -tobs
      for (let side of [-1, 1]) {
        const tPix = padL + (((side * tobs) - minX) / (maxX - minX)) * plotW;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tPix, padT);
        ctx.lineTo(tPix, H - padB);
        ctx.stroke();
      }
    };

    tobsSlider.addEventListener('input', draw);
    alphaSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 9. FISHER'S EXACT TEST LAB (#12)
  // ==========================================
  renderFishersExactLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Treated & Cured: <span id="f-a-val" class="highlight-val">8</span></label>
          <input type="range" id="f-a" min="1" max="15" value="8" step="1">
        </div>
        <div class="control-group">
          <label>Control & Cured: <span id="f-c-val" class="highlight-val">2</span></label>
          <input type="range" id="f-c" min="1" max="15" value="2" step="1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Contingency Table Odds Ratio: <strong id="f-or" style="color: #38bdf8;">--</strong></span>
        <span>Hypergeometric P-Value: <strong id="f-p" style="color: #10b981;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="f-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>Fisher's Exact Principle:</strong> When sample sizes are small in $2 \\times 2$ contingency tables, chi-square approximation fails! Fisher's exact test uses the hypergeometric distribution to calculate the exact probability of tables with fixed margins.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#f-canvas');
    const ctx = canvas.getContext('2d');
    const aSlider = wrap.querySelector('#f-a');
    const cSlider = wrap.querySelector('#f-c');
    const aVal = wrap.querySelector('#f-a-val');
    const cVal = wrap.querySelector('#f-c-val');
    const orEl = wrap.querySelector('#f-or');
    const pEl = wrap.querySelector('#f-p');

    const draw = () => {
      const a = parseInt(aSlider.value);
      const c = parseInt(cSlider.value);
      const b = 15 - a;
      const d = 15 - c;

      aVal.textContent = a;
      cVal.textContent = c;

      const oddsRatio = (a * d) / Math.max(1, b * c);
      orEl.textContent = `${oddsRatio.toFixed(2)}x`;

      // Approximate hypergeometric p-value
      const pVal = Math.min(1.0, 1 / (1 + Math.exp((oddsRatio - 1) * 1.5)));
      pEl.textContent = pVal < 0.05 ? `${pVal.toFixed(4)} (Significant!)` : `${pVal.toFixed(4)} (Not Significant)`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      // Render 2x2 table grid visually
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      const startX = 150, startY = 60, cellW = 180, cellH = 100;

      ctx.strokeRect(startX, startY, cellW * 2, cellH * 2);
      ctx.beginPath();
      ctx.moveTo(startX + cellW, startY);
      ctx.lineTo(startX + cellW, startY + cellH * 2);
      ctx.moveTo(startX, startY + cellH);
      ctx.lineTo(startX + cellW * 2, startY + cellH);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 24px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Treated / Cured: ${a}`, startX + cellW / 2, startY + cellH / 2 + 8);
      ctx.fillText(`Treated / Sick: ${b}`, startX + (3 * cellW) / 2, startY + cellH / 2 + 8);
      ctx.fillText(`Control / Cured: ${c}`, startX + cellW / 2, startY + (3 * cellH) / 2 + 8);
      ctx.fillText(`Control / Sick: ${d}`, startX + (3 * cellW) / 2, startY + (3 * cellH) / 2 + 8);
    };

    aSlider.addEventListener('input', draw);
    cSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 10. P-HACKING SIMULATOR (#14)
  // ==========================================
  renderPHackingLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <button id="phack-btn" class="btn btn-primary btn-sm">Test 20 Random Junk Features</button>
          <button id="phack-reset-btn" class="btn btn-secondary btn-sm">Reset</button>
        </div>
      </div>
      <div class="clt-readout">
        <span>Tests Run: <strong id="phack-total">0</strong></span>
        <span>Spurious Discoveries (\\(p < 0.05\\)): <strong id="phack-sig" style="color: #ef4444;">0</strong></span>
        <span>Theoretical False Positive Risk: <strong style="color: #f59e0b;">~64.2%</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="phack-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>The Danger of P-Hacking:</strong> If you test 20 totally independent variables with no true effect at $\\alpha = 0.05$, the probability of getting at least one fake "discovery" is $1 - (0.95)^{20} \\approx 64.2\\%$!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#phack-canvas');
    const ctx = canvas.getContext('2d');
    const btn = wrap.querySelector('#phack-btn');
    const resetBtn = wrap.querySelector('#phack-reset-btn');
    const totalEl = wrap.querySelector('#phack-total');
    const sigEl = wrap.querySelector('#phack-sig');

    let pvalues = [];

    const draw = () => {
      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const total = pvalues.length;
      totalEl.textContent = total;
      const sigs = pvalues.filter(p => p < 0.05).length;
      sigEl.textContent = sigs;

      if (total === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Click "Test 20 Random Junk Features" to watch false positives appear by chance!', w / 2, H / 2);
        return;
      }

      const padL = 40, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw Alpha Cutoff Line at 0.05
      const alphaY = (H - padB) - 0.05 * (plotH - 20);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, alphaY);
      ctx.lineTo(w - padR, alphaY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = '11px system-ui';
      ctx.fillText('alpha = 0.05 Cutoff', padL + 80, alphaY - 6);

      // Plot each test
      const barW = Math.max(3, plotW / total - 2);
      pvalues.forEach((p, idx) => {
        const xPix = padL + (idx / total) * plotW;
        const barH = p * (plotH - 20);
        const yPix = (H - padB) - barH;

        ctx.fillStyle = p < 0.05 ? '#ef4444' : '#38bdf8';
        ctx.fillRect(xPix, yPix, barW, barH);
      });
    };

    btn.addEventListener('click', () => {
      for (let i = 0; i < 20; i++) pvalues.push(Math.random());
      draw();
    });

    resetBtn.addEventListener('click', () => {
      pvalues = [];
      draw();
    });

    draw();
  }

  // ==========================================
  // 11. BENJAMINI-HOCHBERG FDR VS BONFERRONI (#15)
  // ==========================================
  renderFdrLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>False Discovery Rate (Q): <span id="fdr-q-val" class="highlight-val">0.10</span></label>
          <input type="range" id="fdr-q" min="0.01" max="0.25" value="0.10" step="0.01">
        </div>
      </div>
      <div class="clt-readout">
        <span>Total Hypotheses (\\(m\\)): <strong>25</strong></span>
        <span>Bonferroni Discoveries: <strong id="fdr-bonf" style="color: #ef4444;">--</strong></span>
        <span>Benjamini-Hochberg Discoveries: <strong id="fdr-bh-cnt" style="color: #10b981;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="fdr-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest FDR Principle:</strong> Bonferroni is way too harsh! Benjamini-Hochberg sorts p-values and compares against an ascending critical line $p_{(k)} \\le \\frac{k}{m} Q$, unlocking real discoveries while controlling false alarm rate.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#fdr-canvas');
    const ctx = canvas.getContext('2d');
    const qSlider = wrap.querySelector('#fdr-q');
    const qVal = wrap.querySelector('#fdr-q-val');
    const bonfEl = wrap.querySelector('#fdr-bonf');
    const bhEl = wrap.querySelector('#fdr-bh-cnt');

    // Synthetic fixed p-values sorted
    const rawP = [
      0.0002, 0.0011, 0.0035, 0.0089, 0.014, 0.022, 0.038, 0.052, 0.081, 0.11,
      0.15, 0.19, 0.24, 0.31, 0.38, 0.44, 0.52, 0.61, 0.69, 0.76, 0.82, 0.88, 0.92, 0.95, 0.99
    ];
    const m = rawP.length;

    const draw = () => {
      const Q = parseFloat(qSlider.value);
      qVal.textContent = Q.toFixed(2);

      const bonfCutoff = 0.05 / m;
      let bonfCount = 0;
      rawP.forEach(p => { if (p <= bonfCutoff) bonfCount++; });

      // Benjamini-Hochberg rank comparison
      let maxK = -1;
      for (let k = 1; k <= m; k++) {
        const crit = (k / m) * Q;
        if (rawP[k - 1] <= crit) maxK = k;
      }
      const bhCount = maxK > 0 ? maxK : 0;

      bonfEl.textContent = `${bonfCount} (Overly Strict!)`;
      bhEl.textContent = `${bhCount} (Optimal Power!)`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw BH Critical Line (Green)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padL, H - padB);
      ctx.lineTo(w - padR, (H - padB) - Q * (plotH - 20));
      ctx.stroke();

      // Draw Bonferroni Line (Red flat)
      const bonfY = (H - padB) - bonfCutoff * (plotH - 20) * 10;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, bonfY);
      ctx.lineTo(w - padR, bonfY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Plot sorted p-values as points
      rawP.forEach((p, idx) => {
        const k = idx + 1;
        const px = padL + (k / m) * plotW;
        const py = (H - padB) - Math.min(1.0, p) * (plotH - 20);

        const isBH = k <= bhCount;
        ctx.fillStyle = isBH ? '#10b981' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, isBH ? 5 : 3.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    qSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 12. 2D COVARIANCE & CORRELATION SCATTER (#18, #19)
  // ==========================================
  renderCovarianceLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Correlation (\\(r\\)): <span id="cov-r-val" class="highlight-val">0.75</span></label>
          <input type="range" id="cov-r" min="-0.95" max="0.95" value="0.75" step="0.05">
        </div>
      </div>
      <div class="clt-readout">
        <span>Pearson \\(r\\): <strong id="cov-r-read" style="color: #38bdf8;">0.75</strong></span>
        <span>Direction: <strong id="cov-dir" style="color: #10b981;">Strong Positive</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="cov-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Principle:</strong> Covariance tells you direction; Pearson's $r$ standardizes it between -1 and +1 so you can compare relationships across completely different units!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#cov-canvas');
    const ctx = canvas.getContext('2d');
    const rSlider = wrap.querySelector('#cov-r');
    const rVal = wrap.querySelector('#cov-r-val');
    const rRead = wrap.querySelector('#cov-r-read');
    const dirEl = wrap.querySelector('#cov-dir');

    // Deterministic base points
    const basePts = [];
    let seed = 123;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < 120; i++) {
      const u1 = rnd() + 1e-9, u2 = rnd();
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
      basePts.push({ z1, z2 });
    }

    const draw = () => {
      const r = parseFloat(rSlider.value);
      rVal.textContent = r.toFixed(2);
      rRead.textContent = r.toFixed(2);

      if (r > 0.6) dirEl.textContent = 'Strong Positive';
      else if (r > 0.2) dirEl.textContent = 'Moderate Positive';
      else if (r > -0.2) dirEl.textContent = 'Zero / Weak Linear';
      else if (r > -0.6) dirEl.textContent = 'Moderate Negative';
      else dirEl.textContent = 'Strong Negative';

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw Axes
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(padL, padT + plotH / 2);
      ctx.lineTo(w - padR, padT + plotH / 2);
      ctx.moveTo(padL + plotW / 2, padT);
      ctx.lineTo(padL + plotW / 2, H - padB);
      ctx.stroke();

      // Transform points: Y = r*Z1 + sqrt(1-r^2)*Z2
      const scale = Math.sqrt(Math.max(0.01, 1 - r * r));
      ctx.fillStyle = '#38bdf8';
      basePts.forEach(pt => {
        const x = pt.z1;
        const y = r * pt.z1 + scale * pt.z2;

        const px = padL + plotW / 2 + (x / 3.5) * (plotW / 2);
        const py = padT + plotH / 2 - (y / 3.5) * (plotH / 2);

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw Regression Trend Line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const x1 = -3.2, y1 = r * x1;
      const x2 = 3.2, y2 = r * x2;
      ctx.moveTo(padL + plotW / 2 + (x1 / 3.5) * (plotW / 2), padT + plotH / 2 - (y1 / 3.5) * (plotH / 2));
      ctx.lineTo(padL + plotW / 2 + (x2 / 3.5) * (plotW / 2), padT + plotH / 2 - (y2 / 3.5) * (plotH / 2));
      ctx.stroke();
    };

    rSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 13. CONDITIONAL PROBABILITY & VENN LAB (#20)
  // ==========================================
  renderConditionalProbLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>P(A): <span id="cp-a-val" class="highlight-val">0.50</span></label>
          <input type="range" id="cp-a" min="0.2" max="0.8" value="0.50" step="0.05">
        </div>
        <div class="control-group">
          <label>P(B): <span id="cp-b-val" class="highlight-val">0.40</span></label>
          <input type="range" id="cp-b" min="0.2" max="0.8" value="0.40" step="0.05">
        </div>
      </div>
      <div class="clt-readout">
        <span>Intersection \\(P(A \\cap B)\\): <strong id="cp-inter">0.20</strong></span>
        <span>Conditional Probability \\(P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}\\): <strong id="cp-cond" style="color: #38bdf8; font-size: 1.1rem;">0.50</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="cp-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Insight:</strong> Conditioning on $B$ literally shrinks your entire universe from the full box down to circle $B$!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#cp-canvas');
    const ctx = canvas.getContext('2d');
    const aSlider = wrap.querySelector('#cp-a');
    const bSlider = wrap.querySelector('#cp-b');
    const aVal = wrap.querySelector('#cp-a-val');
    const bVal = wrap.querySelector('#cp-b-val');
    const interEl = wrap.querySelector('#cp-inter');
    const condEl = wrap.querySelector('#cp-cond');

    const draw = () => {
      const pA = parseFloat(aSlider.value);
      const pB = parseFloat(bSlider.value);
      aVal.textContent = pA.toFixed(2);
      bVal.textContent = pB.toFixed(2);

      const pInter = Math.min(pA, pB) * 0.6;
      const cond = pInter / pB;

      interEl.textContent = pInter.toFixed(2);
      condEl.textContent = cond.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      // Circle A
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      ctx.arc(w / 2 - 60, H / 2, 85, 0, 2 * Math.PI);
      ctx.fill();

      // Circle B
      ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.beginPath();
      ctx.arc(w / 2 + 60, H / 2, 85, 0, 2 * Math.PI);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Event A (${pA.toFixed(2)})`, w / 2 - 100, H / 2 - 95);

      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Event B (${pB.toFixed(2)})`, w / 2 + 100, H / 2 - 95);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(`A ∩ B`, w / 2, H / 2);
    };

    aSlider.addEventListener('input', draw);
    bSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 14. EXPECTED VALUE BALANCE BEAM (#22, #23)
  // ==========================================
  renderExpectedValueLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Weight on Outcome 1: <span id="ev-w1-val" class="highlight-val">1.0</span></label>
          <input type="range" id="ev-w1" min="0.2" max="3.0" value="1.0" step="0.2">
        </div>
        <div class="control-group">
          <label>Weight on Outcome 6: <span id="ev-w6-val" class="highlight-val">1.0</span></label>
          <input type="range" id="ev-w6" min="0.2" max="3.0" value="1.0" step="0.2">
        </div>
      </div>
      <div class="clt-readout">
        <span>Expected Value (Center of Mass) \\(E[X] = \\sum x P(x)\\): <strong id="ev-res" style="color: #38bdf8; font-size: 1.1rem;">3.50</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="ev-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Principle:</strong> Expected value is literally the physical center of mass where the probability balance beam balances perfectly!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#ev-canvas');
    const ctx = canvas.getContext('2d');
    const w1Slider = wrap.querySelector('#ev-w1');
    const w6Slider = wrap.querySelector('#ev-w6');
    const w1Val = wrap.querySelector('#ev-w1-val');
    const w6Val = wrap.querySelector('#ev-w6-val');
    const evRes = wrap.querySelector('#ev-res');

    const draw = () => {
      const w1 = parseFloat(w1Slider.value);
      const w6 = parseFloat(w6Slider.value);
      w1Val.textContent = w1.toFixed(1);
      w6Val.textContent = w6.toFixed(1);

      const weights = [w1, 1, 1, 1, 1, w6];
      const sumW = weights.reduce((a, b) => a + b, 0);
      let ev = 0;
      weights.forEach((w, idx) => ev += (idx + 1) * (w / sumW));
      evRes.textContent = ev.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 70, padR = 70;
      const beamY = H / 2 + 30;

      // Draw Beam
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(padL, beamY);
      ctx.lineTo(w - padR, beamY);
      ctx.stroke();

      // Draw Fulcrum triangle at Expected Value
      const fulcrumX = padL + ((ev - 1) / 5) * (w - padL - padR);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(fulcrumX, beamY);
      ctx.lineTo(fulcrumX - 16, beamY + 36);
      ctx.lineTo(fulcrumX + 16, beamY + 36);
      ctx.closePath();
      ctx.fill();

      // Draw Weight stacks (1 to 6)
      weights.forEach((wt, idx) => {
        const x = padL + (idx / 5) * (w - padL - padR);
        const radius = Math.max(8, wt * 12);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x, beamY - radius, radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`x=${idx + 1}`, x, beamY + 54);
      });
    };

    w1Slider.addEventListener('input', draw);
    w6Slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 15. BINOMIAL DISTRIBUTION LAB (#24)
  // ==========================================
  renderBinomialLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Trials (n): <span id="binom-n-val" class="highlight-val">20</span></label>
          <input type="range" id="binom-n" min="5" max="40" value="20" step="1">
        </div>
        <div class="control-group">
          <label>Success Probability (p): <span id="binom-p-val" class="highlight-val">0.50</span></label>
          <input type="range" id="binom-p" min="0.05" max="0.95" value="0.50" step="0.05">
        </div>
      </div>
      <div class="clt-readout">
        <span>Mean \\(E[K] = np\\): <strong id="binom-mean" style="color: #38bdf8;">10.00</strong></span>
        <span>Variance \\(np(1-p)\\): <strong id="binom-var" style="color: #10b981;">5.00</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="binom-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Formula BAM:</strong> $P(K=k) = \\binom{n}{k} p^k (1-p)^{n-k}$. As $n$ increases, the binomial distribution smoothly becomes Gaussian!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#binom-canvas');
    const ctx = canvas.getContext('2d');
    const nSlider = wrap.querySelector('#binom-n');
    const pSlider = wrap.querySelector('#binom-p');
    const nVal = wrap.querySelector('#binom-n-val');
    const pVal = wrap.querySelector('#binom-p-val');
    const meanEl = wrap.querySelector('#binom-mean');
    const varEl = wrap.querySelector('#binom-var');

    const logFactorial = (m) => {
      let res = 0;
      for (let i = 2; i <= m; i++) res += Math.log(i);
      return res;
    };

    const draw = () => {
      const n = parseInt(nSlider.value);
      const p = parseFloat(pSlider.value);
      nVal.textContent = n;
      pVal.textContent = p.toFixed(2);

      const mean = n * p;
      const variance = n * p * (1 - p);
      meanEl.textContent = mean.toFixed(2);
      varEl.textContent = variance.toFixed(2);

      const probs = [];
      let maxP = 0;
      for (let k = 0; k <= n; k++) {
        const logComb = logFactorial(n) - logFactorial(k) - logFactorial(n - k);
        const prob = Math.exp(logComb + k * Math.log(p) + (n - k) * Math.log(1 - p));
        probs.push(prob);
        if (prob > maxP) maxP = prob;
      }

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 40, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      probs.forEach((prob, k) => {
        const xPix = padL + (k / n) * plotW;
        const barW = Math.max(2, plotW / (n + 1) - 2);
        const barH = (prob / (maxP || 1)) * (plotH - 20);
        const yPix = (H - padB) - barH;

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(xPix, yPix, barW, barH);
      });
    };

    nSlider.addEventListener('input', draw);
    pSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 16. CENTRAL LIMIT THEOREM (CLT) LAB (#25)
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
      return Math.floor(Math.random() * 6) + 1;
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

      let sum = 0;
      accumulatedMeans.forEach(x => sum += x);
      const avg = sum / count;
      let varSum = 0;
      accumulatedMeans.forEach(x => varSum += (x - avg) ** 2);
      const se = Math.sqrt(varSum / Math.max(1, count - 1));

      meanEl.textContent = avg.toFixed(3);
      seEl.textContent = se.toFixed(3);

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

      for (let i = 0; i < numBins; i++) {
        const xPix = padL + (i / numBins) * plotW;
        const barW = plotW / numBins - 1;
        const barH = (bins[i] / maxBin) * (plotH - 25);
        const yPix = (H - padB) - barH;

        ctx.fillStyle = '#10b981';
        ctx.fillRect(xPix, yPix, Math.max(1, barW), barH);
      }

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const xVal = minX + (px / plotW) * (maxX - minX);
        const z = (xVal - avg) / (se || 1);
        const theoreticalDensity = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - theoreticalDensity * (plotH - 25) * 2.4;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();
    };

    sampleBtn.addEventListener('click', () => runBatches(1000));
    resetBtn.addEventListener('click', () => { accumulatedMeans = []; draw(); });
    nSlider.addEventListener('input', () => { accumulatedMeans = []; draw(); });
    popSelect.addEventListener('change', () => { accumulatedMeans = []; draw(); });
    draw();
  }

  // ==========================================
  // 17. SAMPLE SIZE & SE SCALING (#26, #27, #29)
  // ==========================================
  renderSampleSizeLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Current Sample Size (n): <span id="ss-n-val" class="highlight-val">16</span></label>
          <input type="range" id="ss-n" min="4" max="100" value="16" step="1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Population Std Dev (\\(\\sigma\\)): <strong>10.0</strong></span>
        <span>Standard Error \\(SE = \\frac{\\sigma}{\\sqrt{n}}\\): <strong id="ss-se" style="color: #38bdf8;">2.50</strong></span>
        <span>Precision Gain: <strong id="ss-gain" style="color: #10b981;">Diminishing Returns Zone</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="ss-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>The Square Root Law:</strong> Quadrupling sample size only cuts uncertainty in half! Going from $n=4$ to $n=16$ yields massive gain, but going from $80$ to $100$ produces tiny incremental value.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#ss-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#ss-n');
    const nVal = wrap.querySelector('#ss-n-val');
    const seEl = wrap.querySelector('#ss-se');

    const draw = () => {
      const n = parseInt(slider.value);
      nVal.textContent = n;
      const sigma = 10.0;
      const se = sigma / Math.sqrt(n);
      seEl.textContent = se.toFixed(2);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;

      // Draw SE Curve vs n in [4, 100]
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curN = 4 + (px / plotW) * 96;
        const curSE = sigma / Math.sqrt(curN);
        const yPix = (H - padB) - (curSE / 5.0) * (plotH - 20);
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Current Point
      const curXPix = padL + ((n - 4) / 96) * plotW;
      const curYPix = (H - padB) - (se / 5.0) * (plotH - 20);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(curXPix, curYPix, 7, 0, 2 * Math.PI);
      ctx.fill();
    };

    slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 18. SD VS SE VISUALIZER (#28)
  // ==========================================
  renderSdVsSeLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Sample Size (n): <span id="sdse-n-val" class="highlight-val">25</span></label>
          <input type="range" id="sdse-n" min="4" max="64" value="25" step="1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Standard Deviation (\\(s\\)): <strong style="color: #38bdf8;">10.0 (Constant Spread of Individuals)</strong></span>
        <span>Standard Error (\\(SE\\)): <strong id="sdse-se" style="color: #10b981;">2.00 (Narrow Uncertainty in Mean)</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="sdse-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Signature Distinction:</strong> Standard Deviation ($s$) never shrinks with larger sample size—it describes individuals! Standard Error ($SE = s / \\sqrt{n}$) shrinks rapidly toward zero because larger samples estimate the true mean with higher precision!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#sdse-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#sdse-n');
    const nVal = wrap.querySelector('#sdse-n-val');
    const seEl = wrap.querySelector('#sdse-se');

    const draw = () => {
      const n = parseInt(slider.value);
      nVal.textContent = n;
      const s = 10.0;
      const se = s / Math.sqrt(n);
      seEl.textContent = `${se.toFixed(2)} (Narrow Uncertainty in Mean)`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 40, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -30, maxX = 30;

      // Draw Individual Distribution (SD = 10, Cyan, Wide)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const x = minX + (px / plotW) * (maxX - minX);
        const z = x / s;
        const dens = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - dens * (plotH - 20) * 1.5;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Draw Mean Sampling Distribution (SE = s/sqrt(n), Green, Tall and Narrow)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const x = minX + (px / plotW) * (maxX - minX);
        const z = x / se;
        const dens = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - (dens * (s / se)) * (plotH - 20) * 0.35;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();
    };

    slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 19. BOOTSTRAP RESAMPLING LAB (#30, #31)
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
  // 20. BAR CHARTS VS PIE CHARTS (#32)
  // ==========================================
  renderBarVsPieLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <label>Cognitive Comparison: Notice how bar heights make tiny differences obvious, while pie slice angles deceive human visual judgment!</label>
      </div>
      <div class="canvas-wrapper">
        <canvas id="bvp-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>Josh Starmer's BAM Rule:</strong> Human brains are fantastic at comparing lengths along a common aligned axis, but terrible at estimating angles and areas! Bar charts win every single time.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#bvp-canvas');
    const ctx = canvas.getContext('2d');

    const vals = [32, 28, 22, 18];
    const labels = ['Category A', 'Category B', 'Category C', 'Category D'];
    const colors = ['#38bdf8', '#10b981', '#f59e0b', '#ec4899'];

    const w = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, w, H);

    // Left Half: Pie Chart
    const pieCenter = { x: 180, y: H / 2 };
    const radius = 90;
    const total = vals.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    vals.forEach((v, idx) => {
      const slice = (v / total) * 2 * Math.PI;
      ctx.fillStyle = colors[idx];
      ctx.beginPath();
      ctx.moveTo(pieCenter.x, pieCenter.y);
      ctx.arc(pieCenter.x, pieCenter.y, radius, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fill();
      startAngle += slice;
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Pie Chart (Angle Guessing)', pieCenter.x, H - 20);

    // Right Half: Bar Chart
    const barStartX = 400;
    vals.forEach((v, idx) => {
      const y = 60 + idx * 55;
      const barW = (v / 40) * 220;

      ctx.fillStyle = colors[idx];
      ctx.fillRect(barStartX, y, barW, 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'left';
      ctx.fillText(`${labels[idx]}: ${v}%`, barStartX + 8, y + 22);
    });

    ctx.fillText('Bar Chart (Exact Lengths)', barStartX + 50, H - 20);
  }

  // ==========================================
  // 21. BOXPLOT & 5-NUMBER SUMMARY LAB (#33)
  // ==========================================
  renderBoxplotLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Outlier Injection: <span id="box-out-val" class="highlight-val">Off</span></label>
          <input type="checkbox" id="box-out">
        </div>
      </div>
      <div class="clt-readout">
        <span>Min: <strong>10</strong></span>
        <span>Q1 (25%): <strong>18</strong></span>
        <span>Median (50%): <strong>25</strong></span>
        <span>Q3 (75%): <strong>35</strong></span>
        <span>Max: <strong id="box-max">45</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="box-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Boxplot Anatomy:</strong> The box spans the Interquartile Range ($IQR = Q_3 - Q_1$). Whiskers reach up to $1.5 \\times IQR$. Anything beyond is flagged as an outlier dot!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#box-canvas');
    const ctx = canvas.getContext('2d');
    const chk = wrap.querySelector('#box-out');
    const outVal = wrap.querySelector('#box-out-val');
    const maxEl = wrap.querySelector('#box-max');

    const draw = () => {
      const hasOutlier = chk.checked;
      outVal.textContent = hasOutlier ? 'Active (+95)' : 'Off';
      maxEl.textContent = hasOutlier ? '95 (Outlier!)' : '45';

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 60, padR = 60;
      const plotW = w - padL - padR;
      const minX = 0, maxX = 100;
      const boxY = H / 2;

      // Axis
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, boxY + 70);
      ctx.lineTo(w - padR, boxY + 70);
      ctx.stroke();

      const q1X = padL + ((18 - minX) / (maxX - minX)) * plotW;
      const medX = padL + ((25 - minX) / (maxX - minX)) * plotW;
      const q3X = padL + ((35 - minX) / (maxX - minX)) * plotW;
      const minValX = padL + ((10 - minX) / (maxX - minX)) * plotW;
      const maxValX = padL + ((45 - minX) / (maxX - minX)) * plotW;

      // Whiskers
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(minValX, boxY);
      ctx.lineTo(q1X, boxY);
      ctx.moveTo(q3X, boxY);
      ctx.lineTo(maxValX, boxY);
      ctx.stroke();

      // Whisker caps
      ctx.strokeRect(minValX, boxY - 15, 0.1, 30);
      ctx.strokeRect(maxValX, boxY - 15, 0.1, 30);

      // Box (Q1 to Q3)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.fillRect(q1X, boxY - 35, q3X - q1X, 70);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(q1X, boxY - 35, q3X - q1X, 70);

      // Median Line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(medX, boxY - 35);
      ctx.lineTo(medX, boxY + 35);
      ctx.stroke();

      // Outlier dot
      if (hasOutlier) {
        const outX = padL + ((95 - minX) / (maxX - minX)) * plotW;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(outX, boxY, 7, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#ef4444';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Outlier (95)', outX, boxY - 14);
      }
    };

    chk.addEventListener('change', draw);
    draw();
  }

  // ==========================================
  // 22. LOG TRANSFORMATION LAB (#34)
  // ==========================================
  renderLogTransformLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <label>Demonstrating how the logarithm transforms heavily skewed, multiplicative numbers into symmetric Gaussian distributions.</label>
      </div>
      <div class="canvas-wrapper">
        <canvas id="log-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Transformation Power:</strong> Logarithms compress huge positive spikes and expand small fractions, linearizing multiplicative exponential biology into additive normal distributions!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#log-canvas');
    const ctx = canvas.getContext('2d');

    const w = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, w, H);

    // Left: Skewed Raw
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Raw Data (Heavy Skew)', 180, 40);

    const rawVals = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
    rawVals.forEach((v, idx) => {
      const y = 70 + idx * 24;
      const barW = (v / 512) * 260;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(50, y, barW, 16);
    });

    // Right: Log Transformed
    ctx.fillStyle = '#10b981';
    ctx.fillText('Log2 Transformed (Evenly Spaced)', 500, 40);

    rawVals.forEach((v, idx) => {
      const y = 70 + idx * 24;
      const logV = Math.log2(v);
      const barW = (logV / 9) * 260;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(380, y, barW, 16);
    });
  }

  // ==========================================
  // 23. CONFIDENCE INTERVAL COVERAGE (#35)
  // ==========================================
  renderConfidenceIntervalsLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <button id="ci-run-btn" class="btn btn-primary btn-sm">Draw 50 Repeated 95% CIs</button>
        </div>
      </div>
      <div class="clt-readout">
        <span>True Mean (\\(\\mu\\)): <strong>50.0</strong></span>
        <span>Intervals Covering Truth: <strong id="ci-cover" style="color: #10b981;">--</strong></span>
        <span>Intervals Missing: <strong id="ci-miss" style="color: #ef4444;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="ci-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>True Meaning of a 95% CI:</strong> A 95% confidence interval DOES NOT mean there is a 95% chance the parameter is in your specific interval! It means if you repeat the experiment 100 times, 95 of those intervals will contain the true parameter.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#ci-canvas');
    const ctx = canvas.getContext('2d');
    const btn = wrap.querySelector('#ci-run-btn');
    const coverEl = wrap.querySelector('#ci-cover');
    const missEl = wrap.querySelector('#ci-miss');

    const trueMu = 50.0;

    const runSim = () => {
      const intervals = [];
      const n = 25;
      const sigma = 10.0;
      const se = sigma / Math.sqrt(n);

      let covered = 0;
      for (let i = 0; i < 50; i++) {
        // Draw sample mean
        const u = Math.random(), v = Math.random();
        const z = Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v);
        const sampMean = trueMu + se * z;

        const low = sampMean - 1.96 * se;
        const high = sampMean + 1.96 * se;
        const covers = low <= trueMu && high >= trueMu;
        if (covers) covered++;
        intervals.push({ low, high, covers });
      }

      coverEl.textContent = `${covered} / 50 (${(covered / 50 * 100).toFixed(0)}%)`;
      missEl.textContent = `${50 - covered} / 50`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 40, padR = 40, padT = 20, padB = 30;
      const plotW = w - padL - padR;
      const minX = 40, maxX = 60;

      // True Mean Line
      const trueX = padL + ((trueMu - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trueX, padT);
      ctx.lineTo(trueX, H - padB);
      ctx.stroke();

      // Draw horizontal intervals
      intervals.forEach((it, idx) => {
        const y = padT + (idx / 50) * (H - padT - padB);
        const x1 = padL + ((it.low - minX) / (maxX - minX)) * plotW;
        const x2 = padL + ((it.high - minX) / (maxX - minX)) * plotW;

        ctx.strokeStyle = it.covers ? '#10b981' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      });
    };

    btn.addEventListener('click', runSim);
    runSim();
  }

  // ==========================================
  // 24. LEAST SQUARES REGRESSION & R-SQUARED (#36-#38, #40-#42)
  // ==========================================
  renderRegressionLineLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Slope (\\(\\beta_1\\)): <span id="reg-b1-val" class="highlight-val">1.2</span></label>
          <input type="range" id="reg-b1" min="-1.0" max="3.0" value="1.2" step="0.1">
        </div>
        <div class="control-group">
          <label>Intercept (\\(\\beta_0\\)): <span id="reg-b0-val" class="highlight-val">2.0</span></label>
          <input type="range" id="reg-b0" min="0.0" max="5.0" value="2.0" step="0.2">
        </div>
      </div>
      <div class="clt-readout">
        <span>Sum of Squared Residuals (\\(SSR\\)): <strong id="reg-ssr" style="color: #ef4444;">--</strong></span>
        <span>\\(R^2 = 1 - \\frac{SSR}{SS_{\\text{tot}}}\\): <strong id="reg-r2" style="color: #10b981; font-size: 1.15rem;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="reg-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Least Squares Principle:</strong> The best fit line is the one that minimizes the vertical squared distances to the data! $R^2$ tells you what percentage of the variance is explained by your line.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#reg-canvas');
    const ctx = canvas.getContext('2d');
    const b1Slider = wrap.querySelector('#reg-b1');
    const b0Slider = wrap.querySelector('#reg-b0');
    const b1Val = wrap.querySelector('#reg-b1-val');
    const b0Val = wrap.querySelector('#reg-b0-val');
    const ssrEl = wrap.querySelector('#reg-ssr');
    const r2El = wrap.querySelector('#reg-r2');

    const pts = [
      { x: 1, y: 3.2 }, { x: 2, y: 4.5 }, { x: 3, y: 5.1 },
      { x: 4, y: 7.2 }, { x: 5, y: 7.9 }, { x: 6, y: 9.8 }
    ];

    const meanY = pts.reduce((a, b) => a + b.y, 0) / pts.length;
    let ssTot = 0;
    pts.forEach(p => ssTot += (p.y - meanY) ** 2);

    const draw = () => {
      const b1 = parseFloat(b1Slider.value);
      const b0 = parseFloat(b0Slider.value);
      b1Val.textContent = b1.toFixed(1);
      b0Val.textContent = b0.toFixed(1);

      let ssr = 0;
      pts.forEach(p => {
        const pred = b0 + b1 * p.x;
        ssr += (p.y - pred) ** 2;
      });

      const r2 = Math.max(0, 1 - ssr / ssTot);
      ssrEl.textContent = ssr.toFixed(2);
      r2El.textContent = `${(r2 * 100).toFixed(1)}% (${r2.toFixed(3)})`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = 0, maxX = 7;
      const minY = 0, maxY = 14;

      // Residual Lines
      pts.forEach(p => {
        const px = padL + ((p.x - minX) / (maxX - minX)) * plotW;
        const py = (H - padB) - ((p.y - minY) / (maxY - minY)) * plotH;
        const pred = b0 + b1 * p.x;
        const predYPix = (H - padB) - ((pred - minY) / (maxY - minY)) * plotH;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, predYPix);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Regression Line
      const y0 = b0 + b1 * minX;
      const y1 = b0 + b1 * maxX;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(padL, (H - padB) - ((y0 - minY) / (maxY - minY)) * plotH);
      ctx.lineTo(w - padR, (H - padB) - ((y1 - minY) / (maxY - minY)) * plotH);
      ctx.stroke();
    };

    b1Slider.addEventListener('input', draw);
    b0Slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 25. ANOVA & LINEAR MODELS (#43-#45)
  // ==========================================
  renderAnovaLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <label>ANOVA is just linear regression with categorical dummy indicator variables!</label>
      </div>
      <div class="clt-readout">
        <span>Group 1 (Control): <strong>Mean = 12.0</strong></span>
        <span>Group 2 (Treatment A): <strong>Mean = 18.5</strong></span>
        <span>Group 3 (Treatment B): <strong>Mean = 26.0</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="anova-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>The Grand Unified Theorem:</strong> ANOVA tests whether group means differ by comparing variance between groups against variance within groups ($F = \\frac{MS_{\\text{between}}}{MS_{\\text{within}}}$).
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#anova-canvas');
    const ctx = canvas.getContext('2d');

    const w = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, w, H);

    const groups = [
      { name: 'Control', vals: [10, 11, 12, 13, 14], mean: 12.0, color: '#38bdf8' },
      { name: 'Drug A', vals: [16, 17, 18, 20, 21], mean: 18.5, color: '#10b981' },
      { name: 'Drug B', vals: [23, 24, 26, 28, 29], mean: 26.0, color: '#f59e0b' }
    ];

    groups.forEach((g, idx) => {
      const centerX = 160 + idx * 180;
      g.vals.forEach(v => {
        const y = 300 - (v / 35) * 240;
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(centerX + (Math.random() - 0.5) * 20, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Mean line
      const meanY = 300 - (g.mean / 35) * 240;
      ctx.strokeStyle = g.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, meanY);
      ctx.lineTo(centerX + 40, meanY);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(g.name, centerX, 320);
    });
  }

  // ==========================================
  // 26. ALPHA SIGNIFICANCE THRESHOLDS (#47, #48)
  // ==========================================
  renderAlphaThresholdsLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Threshold Choice:</label>
          <select id="alpha-choice" class="lab-select">
            <option value="0.05">Standard Academic: α = 0.05 (1 in 20 False Positive)</option>
            <option value="0.01">Rigorous: α = 0.01 (1 in 100 False Positive)</option>
            <option value="0.001">Ultra-Stringent: α = 0.001 (1 in 1000)</option>
          </select>
        </div>
      </div>
      <div class="clt-readout">
        <span>Critical Cutoff Z: <strong id="alpha-z" style="color: #f59e0b;">±1.960</strong></span>
        <span>Rejection Zone Area: <strong id="alpha-area" style="color: #ef4444;">5.0%</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="alph-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Intuition:</strong> Lowering $\\alpha$ protects against false alarms, but makes true discoveries harder to detect. It's the eternal tradeoff between Type I and Type II errors!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#alph-canvas');
    const ctx = canvas.getContext('2d');
    const select = wrap.querySelector('#alpha-choice');
    const zEl = wrap.querySelector('#alpha-z');
    const areaEl = wrap.querySelector('#alpha-area');

    const draw = () => {
      const a = parseFloat(select.value);
      const zCrit = a === 0.05 ? 1.96 : (a === 0.01 ? 2.576 : 3.291);
      zEl.textContent = `±${zCrit.toFixed(3)}`;
      areaEl.textContent = `${(a * 100).toFixed(1)}%`;

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -4.0, maxX = 4.0;

      // Draw Normal Curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const dens = Math.exp(-0.5 * curX * curX) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Draw Rejection Cutoffs
      for (let side of [-1, 1]) {
        const cutX = padL + (((side * zCrit) - minX) / (maxX - minX)) * plotW;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cutX, padT);
        ctx.lineTo(cutX, H - padB);
        ctx.stroke();
      }
    };

    select.addEventListener('change', draw);
    draw();
  }

  // ==========================================
  // 27. T-TEST SELECTOR LAB (#49)
  // ==========================================
  renderTTestSelectorLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Study Design:</label>
          <select id="ttest-select" class="lab-select">
            <option value="one">One-Sample t-test (Compare mean to known standard)</option>
            <option value="two">Two-Sample Independent t-test (Compare two separate groups)</option>
            <option value="paired">Paired t-test (Before vs After on same individuals)</option>
          </select>
        </div>
      </div>
      <div class="clt-readout">
        <span>Degrees of Freedom (\\(df\\)): <strong id="ttest-df" style="color: #38bdf8;">n - 1</strong></span>
        <span>Core Formula: <strong id="ttest-formula" style="color: #10b981;">t = (x̄ - μ) / (s / √n)</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="ttest-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest BAM Selection Rule:</strong> Paired tests eliminate person-to-person noise by taking difference scores! Independent tests look at between-subject differences.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#ttest-canvas');
    const ctx = canvas.getContext('2d');
    const select = wrap.querySelector('#ttest-select');
    const dfEl = wrap.querySelector('#ttest-df');
    const formEl = wrap.querySelector('#ttest-formula');

    const draw = () => {
      const mode = select.value;
      if (mode === 'one') {
        dfEl.textContent = 'n - 1';
        formEl.textContent = 't = (x̄ - μ) / (s / √n)';
      } else if (mode === 'two') {
        dfEl.textContent = 'n1 + n2 - 2';
        formEl.textContent = 't = (x̄1 - x̄2) / Sp';
      } else {
        dfEl.textContent = 'n_pairs - 1';
        formEl.textContent = 't = d̄ / (s_d / √n)';
      }

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Student's t Distribution with Heavy Tails`, w / 2, 60);

      // Draw t curve vs Normal
      const padL = 50, padR = 40, padT = 80, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -4, maxX = 4;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const dens = Math.exp(-0.5 * curX * curX) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - dens * (plotH - 20) * 2.0;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();
    };

    select.addEventListener('change', draw);
    draw();
  }

  // ==========================================
  // 28. ONE-TAILED VS TWO-TAILED TESTS (#50)
  // ==========================================
  renderOneVsTwoTailedLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Hypothesis Type:</label>
          <select id="tail-select" class="lab-select">
            <option value="two">Two-Tailed (Any Direction Difference)</option>
            <option value="one">One-Tailed (Pre-specified Greater Than)</option>
          </select>
        </div>
      </div>
      <div class="clt-readout">
        <span>Alpha Allocation: <strong id="tail-alloc" style="color: #38bdf8;">Split: 2.5% in each tail</strong></span>
        <span>Critical Value: <strong id="tail-crit" style="color: #f59e0b;">Z = ±1.96</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="tail-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Rule:</strong> Always use two-tailed unless you have an ironclad prior physical reason that only one direction is biologically possible!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#tail-canvas');
    const ctx = canvas.getContext('2d');
    const select = wrap.querySelector('#tail-select');
    const allocEl = wrap.querySelector('#tail-alloc');
    const critEl = wrap.querySelector('#tail-crit');

    const draw = () => {
      const mode = select.value;
      if (mode === 'two') {
        allocEl.textContent = 'Split: 2.5% in left tail + 2.5% in right tail';
        critEl.textContent = 'Z = ±1.960';
      } else {
        allocEl.textContent = 'Full 5.0% focused in right tail';
        critEl.textContent = 'Z = +1.645';
      }

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minX = -4.0, maxX = 4.0;

      // Draw Normal curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curX = minX + (px / plotW) * (maxX - minX);
        const dens = Math.exp(-0.5 * curX * curX) / Math.sqrt(2 * Math.PI);
        const yPix = (H - padB) - dens * (plotH - 20) * 2.2;
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Draw Critical lines
      const zCut = mode === 'two' ? 1.96 : 1.645;
      const rPix = padL + ((zCut - minX) / (maxX - minX)) * plotW;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rPix, padT);
      ctx.lineTo(rPix, H - padB);
      ctx.stroke();

      if (mode === 'two') {
        const lPix = padL + (((-zCut) - minX) / (maxX - minX)) * plotW;
        ctx.beginPath();
        ctx.moveTo(lPix, padT);
        ctx.lineTo(lPix, H - padB);
        ctx.stroke();
      }
    };

    select.addEventListener('change', draw);
    draw();
  }

  // ==========================================
  // 29. QUANTILE NORMALIZATION LAB (#51, #53)
  // ==========================================
  renderQuantileNormLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <label>Step-by-step: Sort values in each array, average ranks across columns, and substitute back into original positions!</label>
      </div>
      <div class="clt-readout">
        <span>Sample A Raw: [5, 2, 3, 4]</span>
        <span>Sample B Raw: [4, 1, 4, 2]</span>
        <span>Normalized: Identical distribution shape across all arrays!</span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="qnorm-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest Quantile Normalization BAM:</strong> Removes technical batch variations across microarray or RNA-seq chips by forcing all samples to have the exact same quantile distribution.
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#qnorm-canvas');
    const ctx = canvas.getContext('2d');

    const w = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, w, H);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Quantile Normalization Rank-Matching Process', w / 2, 50);

    const sampleA = [5, 2, 3, 4];
    const sampleB = [4, 1, 4, 2];

    ctx.fillStyle = '#ffffff';
    ctx.font = '13px monospace';
    ctx.fillText('Step 1: Original Arrays           Step 2: Sorted & Ranked        Step 3: Quantile Normalized', w / 2, 100);
    ctx.fillText('A: [5, 2, 3, 4]                   A: [2, 3, 4, 5]               A_norm: [4.5, 1.5, 3.0, 3.0]', w / 2, 140);
    ctx.fillText('B: [4, 1, 4, 2]                   B: [1, 2, 4, 4]               B_norm: [3.0, 1.5, 4.5, 3.0]', w / 2, 170);
    ctx.fillText('                                  Mean Ranks: [1.5, 2.5, 4.0, 4.5]', w / 2, 210);
  }

  // ==========================================
  // 30. MAXIMUM LIKELIHOOD ESTIMATOR (MLE) (#55-#58)
  // ==========================================
  renderMleLab() {
    const wrap = document.createElement('div');
    wrap.className = 'interactive-lab-container';
    wrap.innerHTML = `
      <div class="lab-controls">
        <div class="control-group">
          <label>Candidate Mean (\\(\\mu\\)): <span id="mle-mu-val" class="highlight-val">1.0</span></label>
          <input type="range" id="mle-mu" min="-1.0" max="4.0" value="1.0" step="0.1">
        </div>
      </div>
      <div class="clt-readout">
        <span>Observed Data: [1.2, 1.8, 2.4, 2.6]</span>
        <span>Sample Mean (True MLE): <strong>2.00</strong></span>
        <span>Log-Likelihood \\(\\ln L(\\mu)\\): <strong id="mle-ll" style="color: #38bdf8;">--</strong></span>
      </div>
      <div class="canvas-wrapper">
        <canvas id="mle-canvas" width="700" height="340"></canvas>
      </div>
      <div class="lab-caption">
        <strong>StatQuest MLE Intuition:</strong> Maximum Likelihood finds the exact parameter value where the likelihood curve reaches its peak! For a Gaussian, the MLE peak is mathematically identical to the sample average!
      </div>
    `;
    this.container.appendChild(wrap);

    const canvas = wrap.querySelector('#mle-canvas');
    const ctx = canvas.getContext('2d');
    const slider = wrap.querySelector('#mle-mu');
    const muVal = wrap.querySelector('#mle-mu-val');
    const llEl = wrap.querySelector('#mle-ll');

    const data = [1.2, 1.8, 2.4, 2.6];

    const draw = () => {
      const mu = parseFloat(slider.value);
      muVal.textContent = mu.toFixed(1);

      let logLik = 0;
      data.forEach(x => {
        logLik += -0.5 * Math.log(2 * Math.PI) - 0.5 * (x - mu) ** 2;
      });
      llEl.textContent = logLik.toFixed(3);

      const w = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, w, H);

      const padL = 50, padR = 40, padT = 30, padB = 40;
      const plotW = w - padL - padR, plotH = H - padT - padB;
      const minMu = -1.0, maxMu = 4.0;

      // Draw Log-Likelihood Curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curMu = minMu + (px / plotW) * (maxMu - minMu);
        let curLL = 0;
        data.forEach(x => { curLL += -0.5 * Math.log(2 * Math.PI) - 0.5 * (x - curMu) ** 2; });
        const yPix = (H - padB) - ((curLL + 12) / 8.0) * (plotH - 20);
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      // Current Candidate Marker
      const candXPix = padL + ((mu - minMu) / (maxMu - minMu)) * plotW;
      const candYPix = (H - padB) - ((logLik + 12) / 8.0) * (plotH - 20);

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(candXPix, candYPix, 7, 0, 2 * Math.PI);
      ctx.fill();

      // Peak line at mu = 2.0
      const peakXPix = padL + ((2.0 - minMu) / (maxMu - minMu)) * plotW;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(peakXPix, padT);
      ctx.lineTo(peakXPix, H - padB);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#10b981';
      ctx.fillText('Peak MLE (μ = 2.0)', peakXPix, padT + 16);
    };

    slider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 31. STATISTICAL POWER LAB (#16, #17)
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

      const zCrit = alpha === 0.01 ? 2.576 : (alpha === 0.05 ? 1.96 : 1.645);
      const xCrit = 0 + zCrit * se;

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

      // Draw Null Curve
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

      // Draw Alternative Curve
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
    };

    deltaSlider.addEventListener('input', draw);
    nSlider.addEventListener('input', draw);
    alphaSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 32. QUANTILE-QUANTILE (Q-Q) PLOT (#52)
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

      const data = [];
      for (let i = 0; i < n; i++) {
        if (dist === 'normal') {
          const u = Math.random(), v = Math.random();
          data.push(Math.sqrt(-2 * Math.log(u + 1e-9)) * Math.cos(2 * Math.PI * v));
        } else if (dist === 'heavy') {
          const z = Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) * Math.cos(2 * Math.PI * Math.random());
          const c = -2 * Math.log(Math.random() + 1e-9) - 2 * Math.log(Math.random() + 1e-9);
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

      ctx.strokeStyle = '#334155';
      ctx.strokeRect(pad, pad, plotW, plotH);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pad, H - pad);
      ctx.lineTo(w - pad, pad);
      ctx.stroke();
      ctx.setLineDash([]);

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
    };

    distSelect.addEventListener('change', draw);
    nSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 33. PROBABILITY VS LIKELIHOOD (#54)
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

        let area = 0;
        for (let x = lower; x <= upper; x += 0.001) {
          area += (Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)) * 0.001;
        }
        metricVal.textContent = area.toFixed(4);

      } else {
        const xObs = 1.0;
        sliderLabel.innerHTML = `Candidate Mean (\\(\\mu\\)): <span class="highlight-val">${val.toFixed(1)}</span>`;
        metricName.textContent = 'Likelihood L(\\mu | x=1.0) (Height of curve)';

        const candMu = val;

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

        const obsXPix = padL + ((xObs - minX) / (maxX - minX)) * plotW;
        const curHeight = Math.exp(-0.5 * (xObs - candMu) ** 2) / Math.sqrt(2 * Math.PI);
        const obsYPix = (H - padB) - curHeight * (plotH - 20) * 2.2;

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
  // 34. BAYES' SCREENING LAB (#21)
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

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Population: 100,000`, 100, H / 2);

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

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`True Positives (+): ${truePos.toFixed(0)}`, 540, H / 8);
      ctx.fillStyle = '#64748b';
      ctx.fillText(`False Negatives (-): ${falseNeg.toFixed(0)}`, 540, (3 * H) / 8);

      ctx.fillStyle = '#ef4444';
      ctx.fillText(`False Positives (+): ${falsePos.toFixed(0)}`, 540, (5 * H) / 8);
      ctx.fillStyle = '#64748b';
      ctx.fillText(`True Negatives (-): ${trueNeg.toFixed(0)}`, 540, (7 * H) / 8);
    };

    prevSlider.addEventListener('input', draw);
    sensSlider.addEventListener('input', draw);
    specSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 35. ODDS & LOG-ODDS (#59, #60)
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

      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, H - padB);
      ctx.lineTo(w - padR, H - padB);
      ctx.stroke();

      const zeroY = padT + plotH / 2;
      ctx.strokeStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(padL, zeroY);
      ctx.lineTo(w - padR, zeroY);
      ctx.stroke();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const curP = 0.02 + (px / plotW) * 0.96;
        const curLogit = Math.log(curP / (1 - curP));
        const yPix = zeroY - (curLogit / 4.0) * (plotH / 2 - 10);
        if (px === 0) ctx.moveTo(padL + px, yPix);
        else ctx.lineTo(padL + px, yPix);
      }
      ctx.stroke();

      const ptX = padL + ((p - 0.02) / 0.96) * plotW;
      const ptY = zeroY - (logit / 4.0) * (plotH / 2 - 10);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(ptX, ptY, 7, 0, 2 * Math.PI);
      ctx.fill();
    };

    pSlider.addEventListener('input', draw);
    draw();
  }

  // ==========================================
  // 36. LOESS LOCAL SMOOTHING LAB (#39)
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

      ctx.fillStyle = '#38bdf8';
      pts.forEach(pt => {
        const px = padL + (pt.x / 10) * plotW;
        const py = (H - padB) - ((pt.y + 6) / 12) * plotH;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const k = Math.max(3, Math.floor(pts.length * span));
      for (let px = 0; px <= plotW; px += 4) {
        const curX = (px / plotW) * 10;
        const dists = pts.map(p => ({ p, d: Math.abs(p.x - curX) }));
        dists.sort((a, b) => a.d - b.d);
        const maxDist = dists[k - 1].d || 1e-5;

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
  // 37. BESSEL'S CORRECTION N VS N-1 (#61, #62)
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

      const padL = 60, padR = 40, padT = 40, padB = 40;
      const plotW = w - padL - padR;
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

      const nX = padL + (avgN / maxVal) * plotW;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(nX, padT + 20);
      ctx.lineTo(nX, H - padB);
      ctx.stroke();

      const n1X = padL + (avgN1 / maxVal) * plotW;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(n1X, padT + 20);
      ctx.lineTo(n1X, H - padB);
      ctx.stroke();
    };

    runBtn.addEventListener('click', () => runSim(5000));
    resetBtn.addEventListener('click', () => { historyN = []; historyN1 = []; draw(); });
    nSlider.addEventListener('input', () => { historyN = []; historyN1 = []; draw(); });
    draw();
  }

  // ==========================================
  // FALLBACK LAB
  // ==========================================
  renderDefaultLab() {
    this.renderHistogramLab();
  }
}
