// src/components/challenges.js
/**
 * Interactive Statistical Challenges Laboratory
 * Gamified first-principles challenges:
 * 1. OLS Regression Fitter (Least Squares RSS minimization)
 * 2. Distribution Detective (Identify distributions from sample histograms & moments)
 * 3. P-Value Estimator (Estimate p-values from test statistics)
 * 4. Research Test Selector (Match clinical study designs to appropriate statistical tests)
 * 5. Power & Sample Size Optimizer (Balance alpha, effect size, and n to reach 80% power)
 * 6. Central Limit Theorem Normality Race (Tune n until sample mean passes Gaussian normality)
 * 7. Maximum Likelihood Peak Climber (Climb the log-likelihood surface to find analytical MLE)
 * 8. False Discovery Rate (FDR) Controller (Master Benjamini-Hochberg vs Bonferroni multiple testing)
 */

export class ChallengesLab {
  constructor(container) {
    this.container = container;
    this.currentChallenge = 'ols';
    this.stats = JSON.parse(
      (typeof localStorage !== 'undefined' && localStorage.getItem('statquest_challenge_stats')) ||
      JSON.stringify({
        score: 0,
        completed: {},
        attempts: {}
      })
    );

    this.render();
  }

  saveStats() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('statquest_challenge_stats', JSON.stringify(this.stats));
    }
  }

  getThemeColors() {
    const theme = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'bw-dark';
    if (theme === 'bw-light') {
      return {
        bg: '#ffffff',
        grid: '#e4e4e7',
        text: '#09090b',
        muted: '#71717a',
        accent: '#09090b',
        success: '#059669',
        warn: '#d97706',
        error: '#dc2626'
      };
    } else if (theme === 'bw-contrast') {
      return {
        bg: '#000000',
        grid: '#ffffff',
        text: '#ffffff',
        muted: '#a1a1aa',
        accent: '#ffffff',
        success: '#ffffff',
        warn: '#ffffff',
        error: '#ffffff'
      };
    }
    return {
      bg: '#000000',
      grid: '#27272a',
      text: '#ffffff',
      muted: '#71717a',
      accent: '#ffffff',
      success: '#10b981',
      warn: '#f59e0b',
      error: '#ef4444'
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="challenges-wrapper">
        <!-- Challenges Header & Scoreboard -->
        <div class="challenges-header">
          <div class="challenges-title-wrap">
            <h2><i data-lucide="zap"></i> Interactive Statistical Challenges Hub</h2>
            <p>Hands-on gamified laboratories to test, sharpen, and certify your first-principles statistical intuition.</p>
          </div>
          <div class="challenges-score-badge">
            <div class="score-label">Mastery Points</div>
            <div class="score-val" id="challenge-score-display">${this.stats.score} PTS</div>
            <div class="score-rank">${this.getRankTitle(this.stats.score)}</div>
            <button class="btn btn-ghost btn-sm btn-view-cert" id="btn-view-certificate" style="margin-top: 6px;">
              <i data-lucide="award"></i> View Certificate
            </button>
          </div>
        </div>

        <!-- Challenge Navigation Pills -->
        <div class="challenge-nav-bar">
          <button class="ch-nav-btn ${this.currentChallenge === 'ols' ? 'active' : ''}" data-ch="ols">
            <i data-lucide="trending-up"></i> 1. OLS Fitter
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'detective' ? 'active' : ''}" data-ch="detective">
            <i data-lucide="search"></i> 2. Distribution Detective
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'pvalue' ? 'active' : ''}" data-ch="pvalue">
            <i data-lucide="target"></i> 3. P-Value Estimator
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'matcher' ? 'active' : ''}" data-ch="matcher">
            <i data-lucide="check-square"></i> 4. Test Matcher
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'power' ? 'active' : ''}" data-ch="power">
            <i data-lucide="activity"></i> 5. Power Optimizer
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'clt' ? 'active' : ''}" data-ch="clt">
            <i data-lucide="shuffle"></i> 6. CLT Normality Race
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'mle' ? 'active' : ''}" data-ch="mle">
            <i data-lucide="mountain"></i> 7. MLE Climber
          </button>
          <button class="ch-nav-btn ${this.currentChallenge === 'fdr' ? 'active' : ''}" data-ch="fdr">
            <i data-lucide="filter"></i> 8. FDR Controller
          </button>
        </div>

        <!-- Active Challenge Sandbox -->
        <div class="challenge-stage" id="challenge-stage"></div>

        <!-- Certificate Modal Container -->
        <div id="certificate-modal-mount"></div>
      </div>
    `;

    // Attach nav listeners
    this.container.querySelectorAll('.ch-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.ch-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentChallenge = btn.dataset.ch;
        this.renderStage();
      });
    });

    // Certificate button listener
    const certBtn = this.container.querySelector('#btn-view-certificate');
    if (certBtn) {
      certBtn.addEventListener('click', () => this.showCertificateModal());
    }

    this.renderStage();
    this.refreshIcons();
  }

  refreshIcons() {
    if (typeof window !== 'undefined' && window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }

  getRankTitle(score) {
    if (score >= 600) return '🏆 StatQuest Grandmaster';
    if (score >= 400) return '⭐ Senior Mathematical Statistician';
    if (score >= 250) return '🔬 Applied Data Scientist';
    if (score >= 120) return '📐 Regression Specialist';
    if (score >= 50) return '🔍 Curious Apprentice';
    return '🌱 Statistical Novice';
  }

  renderStage() {
    const stage = this.container.querySelector('#challenge-stage');
    if (!stage) return;
    stage.innerHTML = '';

    switch (this.currentChallenge) {
      case 'ols':
        this.renderOLSChallenge(stage);
        break;
      case 'detective':
        this.renderDetectiveChallenge(stage);
        break;
      case 'pvalue':
        this.renderPValueChallenge(stage);
        break;
      case 'matcher':
        this.renderMatcherChallenge(stage);
        break;
      case 'power':
        this.renderPowerChallenge(stage);
        break;
      case 'clt':
        this.renderCLTChallenge(stage);
        break;
      case 'mle':
        this.renderMLEChallenge(stage);
        break;
      case 'fdr':
        this.renderFDRChallenge(stage);
        break;
    }

    this.refreshIcons();
  }

  // ============================================================
  // CHALLENGE 1: OLS Line Fitter
  // ============================================================
  renderOLSChallenge(stage) {
    const points = [
      { x: 10, y: 28 }, { x: 18, y: 38 }, { x: 25, y: 52 },
      { x: 32, y: 56 }, { x: 40, y: 72 }, { x: 50, y: 80 },
      { x: 62, y: 102 }, { x: 70, y: 108 }, { x: 82, y: 124 }, { x: 92, y: 140 }
    ];

    const n = points.length;
    const sumX = points.reduce((a, p) => a + p.x, 0);
    const sumY = points.reduce((a, p) => a + p.y, 0);
    const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
    const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);
    const optSlope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const optIntercept = (sumY - optSlope * sumX) / n;

    let optRSS = 0;
    points.forEach(p => {
      const pred = optIntercept + optSlope * p.x;
      optRSS += Math.pow(p.y - pred, 2);
    });

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="trending-up"></i> Challenge 1: The Least Squares Fitter</h3>
            <p>Adjust slope (\\(\\beta_1\\)) and intercept (\\(\\beta_0\\)) to manually minimize the Sum of Squared Residuals (RSS). Can human intuition match analytical calculus?</p>
          </div>
          <span class="ch-badge">Target: RSS &le; ${Math.round(optRSS * 1.05)}</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="ols-canvas" width="600" height="380" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="ch-metric-box">
              <div class="metric-label">Your Residual Sum of Squares (RSS)</div>
              <div class="metric-val" id="user-rss">---</div>
              <div class="metric-sub" id="opt-rss-comparison">Global OLS Optimum: ${Math.round(optRSS)}</div>
            </div>

            <div class="control-group">
              <label>Slope (\\(\\beta_1\\)): <span id="lbl-slope" class="highlight-val">1.00</span></label>
              <input type="range" id="ch-slider-slope" min="0.2" max="2.5" step="0.05" value="1.00">
            </div>

            <div class="control-group">
              <label>Intercept (\\(\\beta_0\\)): <span id="lbl-intercept" class="highlight-val">25.0</span></label>
              <input type="range" id="ch-slider-intercept" min="-20" max="60" step="1" value="25">
            </div>

            <div class="ch-actions-row">
              <button class="btn btn-primary" id="btn-submit-ols">
                <i data-lucide="check-circle"></i> Lock In & Grade Fit
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-solve-ols">
                <i data-lucide="sparkles"></i> Reveal OLS Solution
              </button>
            </div>
            <div id="ols-result-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#ols-canvas');
    const ctx = canvas.getContext('2d');
    const sSlope = stage.querySelector('#ch-slider-slope');
    const sIntercept = stage.querySelector('#ch-slider-intercept');
    const lblSlope = stage.querySelector('#lbl-slope');
    const lblIntercept = stage.querySelector('#lbl-intercept');
    const userRssEl = stage.querySelector('#user-rss');
    const banner = stage.querySelector('#ols-result-banner');

    let showSolution = false;

    const draw = () => {
      const colors = this.getThemeColors();
      const slope = parseFloat(sSlope.value);
      const intercept = parseFloat(sIntercept.value);
      lblSlope.textContent = slope.toFixed(2);
      lblIntercept.textContent = intercept.toFixed(1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const padL = 40, padR = 20, padT = 20, padB = 40;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padT - padB;
      const mapX = (x) => padL + (x / 100) * w;
      const mapY = (y) => canvas.height - padB - (y / 160) * h;

      // Draw Grid
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      for (let x = 0; x <= 100; x += 20) {
        ctx.beginPath();
        ctx.moveTo(mapX(x), padT);
        ctx.lineTo(mapX(x), canvas.height - padB);
        ctx.stroke();
      }
      for (let y = 0; y <= 160; y += 40) {
        ctx.beginPath();
        ctx.moveTo(padL, mapY(y));
        ctx.lineTo(canvas.width - padR, mapY(y));
        ctx.stroke();
      }

      // Calculate RSS
      let userRSS = 0;
      points.forEach(p => {
        const predY = intercept + slope * p.x;
        const res = p.y - predY;
        userRSS += res * res;

        // Draw Residual Stems (dashed)
        ctx.strokeStyle = colors.error;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(mapX(p.x), mapY(p.y));
        ctx.lineTo(mapX(p.x), mapY(predY));
        ctx.stroke();
        ctx.setLineDash([]);
      });

      userRssEl.textContent = Math.round(userRSS).toLocaleString();
      userRssEl.style.color = userRSS <= optRSS * 1.08 ? colors.success : colors.warn;

      // Draw User Line
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(mapX(0), mapY(intercept));
      ctx.lineTo(mapX(100), mapY(intercept + slope * 100));
      ctx.stroke();

      // Draw Optimal Line if revealed
      if (showSolution) {
        ctx.strokeStyle = colors.success;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(mapX(0), mapY(optIntercept));
        ctx.lineTo(mapX(100), mapY(optIntercept + optSlope * 100));
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Scatter Points
      points.forEach(p => {
        ctx.fillStyle = colors.text;
        ctx.strokeStyle = colors.bg;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mapX(p.x), mapY(p.y), 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    };

    sSlope.addEventListener('input', draw);
    sIntercept.addEventListener('input', draw);
    draw();

    stage.querySelector('#btn-solve-ols').addEventListener('click', () => {
      showSolution = true;
      sSlope.value = optSlope.toFixed(2);
      sIntercept.value = optIntercept.toFixed(1);
      draw();
      banner.className = 'ch-result-banner show success';
      banner.innerHTML = `<strong>BAM!</strong> Global OLS solved: \\(\\beta_1 = ${optSlope.toFixed(2)}, \\beta_0 = ${optIntercept.toFixed(1)}\\). Minimum RSS = ${Math.round(optRSS)}.`;
    });

    stage.querySelector('#btn-submit-ols').addEventListener('click', () => {
      const slope = parseFloat(sSlope.value);
      const intercept = parseFloat(sIntercept.value);
      let userRSS = 0;
      points.forEach(p => {
        const predY = intercept + slope * p.x;
        userRSS += Math.pow(p.y - predY, 2);
      });

      const ratio = userRSS / optRSS;
      banner.className = 'ch-result-banner show';
      if (ratio <= 1.05) {
        const pts = 50;
        this.addScore('ols_perfect', pts);
        banner.classList.add('success');
        banner.innerHTML = `<strong>Magnificent!</strong> You found the minimum within 5% of theoretical OLS! (+${pts} Points). BAM!`;
      } else if (ratio <= 1.25) {
        const pts = 25;
        this.addScore('ols_good', pts);
        banner.classList.add('success');
        banner.innerHTML = `<strong>Close!</strong> Your RSS is within 25% of optimal (+${pts} Points). Try nudging slope slightly!`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Keep tuning:</strong> Your RSS (${Math.round(userRSS)}) is above optimal (${Math.round(optRSS)}). Adjust slope and intercept to shorten red residual stems.`;
      }
    });
  }

  // ============================================================
  // CHALLENGE 2: Distribution Detective
  // ============================================================
  renderDetectiveChallenge(stage) {
    const distributions = [
      { id: 'normal', name: 'Normal (Gaussian)', desc: 'Symmetric bell with zero skewness and kurtosis ~ 3' },
      { id: 'exponential', name: 'Exponential', desc: 'Strictly positive waiting times with steep decay and right skewness' },
      { id: 'uniform', name: 'Continuous Uniform', desc: 'Flat flat flat across domain with zero modality' },
      { id: 'bimodal', name: 'Bimodal Mixture', desc: 'Two distinct congregations representing two subpopulations' }
    ];

    const choice = distributions[Math.floor(Math.random() * distributions.length)];
    const N = 300;
    let samples = [];
    if (choice.id === 'normal') {
      for (let i = 0; i < N; i++) {
        const u1 = Math.random(), u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
        samples.push(50 + z * 10);
      }
    } else if (choice.id === 'exponential') {
      const lambda = 0.05;
      for (let i = 0; i < N; i++) {
        samples.push(-Math.log(1 - Math.random() + 1e-9) / lambda);
      }
    } else if (choice.id === 'uniform') {
      for (let i = 0; i < N; i++) {
        samples.push(10 + Math.random() * 80);
      }
    } else if (choice.id === 'bimodal') {
      for (let i = 0; i < N; i++) {
        const u1 = Math.random(), u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
        const center = Math.random() > 0.5 ? 30 : 70;
        samples.push(center + z * 7);
      }
    }

    const mean = samples.reduce((a, b) => a + b, 0) / N;
    const variance = samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (N - 1);
    const sd = Math.sqrt(variance);
    const skewness = (samples.reduce((a, b) => a + Math.pow((b - mean) / sd, 3), 0) / N).toFixed(2);
    const sorted = [...samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(N / 2)].toFixed(1);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="search"></i> Challenge 2: The Distribution Detective</h3>
            <p>An unknown scientific process generated N = ${N} observations. Inspect the sample histogram and sample moments to identify the distribution.</p>
          </div>
          <span class="ch-badge">Clue: Skewness = ${skewness}</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="detective-canvas" width="600" height="350" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="ch-stats-summary">
              <div><strong>Sample Mean:</strong> ${mean.toFixed(1)}</div>
              <div><strong>Sample Median:</strong> ${median}</div>
              <div><strong>Sample Skewness:</strong> ${skewness}</div>
              <div><strong>Sample Std Dev:</strong> ${sd.toFixed(1)}</div>
            </div>

            <div class="detective-options">
              <label style="font-weight:600; font-size:0.85rem; margin-bottom:8px; display:block;">Select Candidate Identity:</label>
              ${distributions.map(d => `
                <button class="btn btn-secondary btn-detective" data-dist="${d.id}" style="width:100%; text-align:left; margin-bottom:8px; justify-content:flex-start;">
                  <i data-lucide="help-circle"></i> ${d.name}
                </button>
              `).join('')}
            </div>

            <div id="detective-banner" class="ch-result-banner"></div>
            <button class="btn btn-ghost btn-sm" id="btn-next-detective" style="margin-top:10px;">
              <i data-lucide="refresh-cw"></i> Sample Another Mystery Distribution
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#detective-canvas');
    const ctx = canvas.getContext('2d');
    const banner = stage.querySelector('#detective-banner');
    const colors = this.getThemeColors();

    const minVal = Math.min(...samples);
    const maxVal = Math.max(...samples);
    const numBins = 20;
    const binWidth = (maxVal - minVal) / numBins;
    const counts = new Array(numBins).fill(0);
    samples.forEach(s => {
      const bIdx = Math.min(numBins - 1, Math.floor((s - minVal) / binWidth));
      counts[bIdx]++;
    });
    const maxCount = Math.max(...counts);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const padL = 40, padR = 20, padT = 20, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padB - padT;

    const bW = w / numBins;
    counts.forEach((c, i) => {
      const bH = (c / maxCount) * h;
      const x = padL + i * bW;
      const y = canvas.height - padB - bH;
      ctx.fillStyle = colors.text;
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.fillRect(x, y, bW - 2, bH);
      ctx.strokeRect(x, y, bW - 2, bH);
    });

    stage.querySelectorAll('.btn-detective').forEach(btn => {
      btn.addEventListener('click', () => {
        const guess = btn.dataset.dist;
        banner.className = 'ch-result-banner show';
        if (guess === choice.id) {
          this.addScore('detective_win', 40);
          banner.classList.add('success');
          banner.innerHTML = `<strong>BAM! Correct!</strong> The mystery distribution was indeed <strong>${choice.name}</strong>. (+40 Points). ${choice.desc}.`;
        } else {
          banner.classList.add('warn');
          banner.innerHTML = `<strong>Incorrect identity:</strong> You guessed ${guess}, but the actual distribution was <strong>${choice.name}</strong>. Notice skewness = ${skewness}!`;
        }
      });
    });

    stage.querySelector('#btn-next-detective').addEventListener('click', () => {
      this.renderDetectiveChallenge(stage);
    });
  }

  // ============================================================
  // CHALLENGE 3: P-Value Estimator
  // ============================================================
  renderPValueChallenge(stage) {
    const tVal = (1.5 + Math.random() * 2.5).toFixed(2);
    const df = 38;
    const t = parseFloat(tVal);
    // Student t CDF approximation for tail area
    const z = t * (1 - 1 / (4 * df)) / Math.sqrt(1 + (t * t) / (2 * df));
    const tailArea = 1 / (1 + Math.exp(-0.07056 * Math.pow(z, 3) - 1.5976 * z));
    const trueP = Math.max(0.0001, (2 * tailArea));

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="target"></i> Challenge 3: P-Value Estimator</h3>
            <p>A clinical study observed a two-sample test statistic of <strong>t = ${tVal}</strong> with <strong>df = ${df}</strong>. Estimate the two-tailed p-value!</p>
          </div>
          <span class="ch-badge">Neyman-Pearson Decision</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="pvalue-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Your Estimated P-Value: <span id="lbl-guess-p" class="highlight-val">0.050</span></label>
              <input type="range" id="slider-guess-p" min="0.001" max="0.300" step="0.002" value="0.050">
            </div>

            <div class="ch-metric-box">
              <div class="metric-label">Significance Decision at \\(\\alpha = 0.05\\)</div>
              <div class="metric-val" id="metric-decision" style="font-size:1.1rem;">${t >= 2.0 ? 'Reject Null (Significant)' : 'Fail to Reject Null'}</div>
            </div>

            <button class="btn btn-primary" id="btn-submit-p" style="width:100%;">
              <i data-lucide="check"></i> Submit Prediction
            </button>
            <div id="p-result-banner" class="ch-result-banner"></div>
            <button class="btn btn-ghost btn-sm" id="btn-next-p" style="margin-top:10px;">
              <i data-lucide="refresh-cw"></i> New Scenario
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#pvalue-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-guess-p');
    const lblGuess = stage.querySelector('#lbl-guess-p');
    const banner = stage.querySelector('#p-result-banner');
    const colors = this.getThemeColors();

    const drawCurve = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const padL = 30, padR = 30, padB = 40, padT = 30;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padB - padT;

      const mapX = (x) => padL + ((x + 4) / 8) * w;
      const mapY = (y) => canvas.height - padB - (y / 0.42) * h;

      // Draw Bell Curve
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -4; x <= 4; x += 0.1) {
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        if (x === -4) ctx.moveTo(mapX(x), mapY(y));
        else ctx.lineTo(mapX(x), mapY(y));
      }
      ctx.stroke();

      // Draw Test Statistic Stem at +t and -t
      ctx.strokeStyle = colors.error;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mapX(t), mapY(0));
      ctx.lineTo(mapX(t), mapY(0.35));
      ctx.moveTo(mapX(-t), mapY(0));
      ctx.lineTo(mapX(-t), mapY(0.35));
      ctx.stroke();

      // Fill rejection tails
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.beginPath();
      ctx.moveTo(mapX(t), mapY(0));
      for (let x = t; x <= 4; x += 0.05) {
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        ctx.lineTo(mapX(x), mapY(y));
      }
      ctx.lineTo(mapX(4), mapY(0));
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(mapX(-4), mapY(0));
      for (let x = -4; x <= -t; x += 0.05) {
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        ctx.lineTo(mapX(x), mapY(y));
      }
      ctx.lineTo(mapX(-t), mapY(0));
      ctx.fill();

      ctx.fillStyle = colors.error;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`+t = ${tVal}`, mapX(t) - 15, mapY(0.37));
      ctx.fillText(`-t = -${tVal}`, mapX(-t) - 20, mapY(0.37));
    };

    drawCurve();

    slider.addEventListener('input', () => {
      lblGuess.textContent = parseFloat(slider.value).toFixed(3);
    });

    stage.querySelector('#btn-submit-p').addEventListener('click', () => {
      const guess = parseFloat(slider.value);
      const diff = Math.abs(guess - trueP);
      banner.className = 'ch-result-banner show';

      if (diff <= 0.015) {
        this.addScore('p_sniper', 45);
        banner.classList.add('success');
        banner.innerHTML = `<strong>Bullseye!</strong> True two-tailed p-value = <strong>${trueP.toFixed(3)}</strong> (Your guess: ${guess.toFixed(3)}). (+45 Points). BAM!`;
      } else if (diff <= 0.04) {
        this.addScore('p_close', 20);
        banner.classList.add('success');
        banner.innerHTML = `<strong>Close estimate!</strong> True p-value = <strong>${trueP.toFixed(3)}</strong> (Your guess: ${guess.toFixed(3)}). (+20 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Off target:</strong> True two-tailed p-value = <strong>${trueP.toFixed(3)}</strong>. Remember: t = 2.0 corresponds roughly to p = 0.045 for typical sample sizes!`;
      }
    });

    stage.querySelector('#btn-next-p').addEventListener('click', () => {
      this.renderPValueChallenge(stage);
    });
  }

  // ============================================================
  // CHALLENGE 4: Statistical Test Matcher
  // ============================================================
  renderMatcherChallenge(stage) {
    const questions = [
      {
        scenario: "Measuring blood pressure in the SAME 25 hypertensive patients before taking a drug and 4 weeks after.",
        correct: "paired_t",
        options: [
          { id: "paired_t", label: "Paired Samples t-test" },
          { id: "indep_t", label: "Independent Two-Sample t-test" },
          { id: "anova", label: "One-Way ANOVA" },
          { id: "fisher", label: "Fisher's Exact Test" }
        ],
        expl: "Because the pre- and post-observations are gathered on the exact same biological subjects, within-subject pairing controls for baseline variation."
      },
      {
        scenario: "Evaluating whether a rare gene mutation is associated with drug toxicity in a small pilot cohort of 12 patients (some expected cell counts are 2).",
        correct: "fisher",
        options: [
          { id: "fisher", label: "Fisher's Exact Test" },
          { id: "chisq", label: "Pearson's Chi-Square Test" },
          { id: "linear_reg", label: "Simple Linear Regression" },
          { id: "mann_whitney", label: "Mann-Whitney U Test" }
        ],
        expl: "Chi-square asymptotic approximations break down when expected contingency table frequencies are below 5. Fisher's exact test uses hypergeometric distribution without large-sample approximations."
      },
      {
        scenario: "Comparing the mean test scores across 4 different high school physics curriculums (Group A, B, C, D) with independent students.",
        correct: "anova",
        options: [
          { id: "anova", label: "One-Way ANOVA (Analysis of Variance)" },
          { id: "paired_t", label: "Paired t-test" },
          { id: "t_test_multiple", label: "6 Separate Independent t-tests" },
          { id: "binomial", label: "Binomial Sign Test" }
        ],
        expl: "Running multiple pairwise t-tests inflates family-wise error rate. One-Way ANOVA tests H0: mu_1 = mu_2 = mu_3 = mu_4 in a single unified F-test."
      }
    ];

    let currentQ = 0;

    const renderQ = () => {
      const q = questions[currentQ];
      stage.innerHTML = `
        <div class="ch-card">
          <div class="ch-header-row">
            <div>
              <h3><i data-lucide="check-square"></i> Challenge 4: Statistical Test Selector</h3>
              <p>Scenario ${currentQ + 1} of ${questions.length}: Select the most appropriate, mathematically sound statistical test.</p>
            </div>
            <span class="ch-badge">Methodology Diagnosis</span>
          </div>

          <div class="scenario-box">
            <p><strong>Clinical Research Question:</strong> "${q.scenario}"</p>
          </div>

          <div class="test-options-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin: 20px 0;">
            ${q.options.map(opt => `
              <button class="btn btn-secondary btn-opt-test" data-opt="${opt.id}" style="padding:14px; text-align:left; justify-content:flex-start;">
                <i data-lucide="git-commit"></i> ${opt.label}
              </button>
            `).join('')}
          </div>

          <div id="matcher-banner" class="ch-result-banner"></div>
        </div>
      `;

      const banner = stage.querySelector('#matcher-banner');
      stage.querySelectorAll('.btn-opt-test').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = btn.dataset.opt;
          banner.className = 'ch-result-banner show';
          if (chosen === q.correct) {
            this.addScore('test_match', 35);
            banner.classList.add('success');
            banner.innerHTML = `<strong>BAM! Absolutely correct!</strong> ${q.expl} (+35 Points).`;
          } else {
            banner.classList.add('warn');
            banner.innerHTML = `<strong>Not optimal:</strong> ${q.expl}`;
          }

          setTimeout(() => {
            if (currentQ < questions.length - 1) {
              currentQ++;
              renderQ();
              this.refreshIcons();
            }
          }, 3000);
        });
      });
      this.refreshIcons();
    };

    renderQ();
  }

  // ============================================================
  // CHALLENGE 5: Power & Sample Size Optimizer
  // ============================================================
  renderPowerChallenge(stage) {
    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="activity"></i> Challenge 5: Power & Sample Size Optimizer</h3>
            <p>You have a research grant. To detect a small effect size (Cohen's \\(d = 0.35\\)) at \\(\\alpha = 0.05\\), tune sample size \\(n\\) to reach the gold standard <strong>80% Power (\\(1 - \\beta = 0.80\\))</strong> without exceeding budget!</p>
          </div>
          <span class="ch-badge">Grant Optimization</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="power-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Sample Size per Arm (\\(n\\)): <span id="lbl-power-n" class="highlight-val">40</span></label>
              <input type="range" id="slider-power-n" min="15" max="250" step="5" value="40">
            </div>

            <div class="ch-metric-box">
              <div class="metric-label">Estimated Statistical Power (\\(1 - \\beta\\))</div>
              <div class="metric-val" id="val-power-pct">35%</div>
              <div class="metric-sub" id="lbl-cost-summary">Total Study Budget: $4,000 ($50/patient)</div>
            </div>

            <button class="btn btn-primary" id="btn-submit-power" style="width:100%;">
              <i data-lucide="award"></i> Submit Grant Proposal
            </button>
            <div id="power-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#power-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-power-n');
    const lblN = stage.querySelector('#lbl-power-n');
    const valPower = stage.querySelector('#val-power-pct');
    const lblCost = stage.querySelector('#lbl-cost-summary');
    const banner = stage.querySelector('#power-banner');
    const colors = this.getThemeColors();

    const updatePower = () => {
      const n = parseInt(slider.value);
      lblN.textContent = n;
      const d = 0.35;
      const delta = d * Math.sqrt(n / 2);
      const zCrit = 1.96;
      const zDiff = delta - zCrit;
      const power = 1 / (1 + Math.exp(-0.07056 * Math.pow(zDiff, 3) - 1.5976 * zDiff));
      const powerPct = Math.round(Math.min(0.999, Math.max(0.05, power)) * 100);

      valPower.textContent = `${powerPct}%`;
      valPower.style.color = powerPct >= 80 ? colors.success : colors.warn;
      lblCost.textContent = `Total Study Cost: $${(n * 2 * 50).toLocaleString()} ($50/subject across 2 arms)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const padL = 40, padR = 20, padB = 40, padT = 20;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padB - padT;

      // 80% Power Target Line
      const y80 = canvas.height - padB - (0.80) * h;
      ctx.strokeStyle = colors.success;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y80);
      ctx.lineTo(canvas.width - padR, y80);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = colors.success;
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('Target Power: 80%', padL + 10, y80 - 6);

      // Curve
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let testN = 15; testN <= 250; testN += 5) {
        const del = d * Math.sqrt(testN / 2);
        const zd = del - 1.96;
        const pwr = 1 / (1 + Math.exp(-0.07056 * Math.pow(zd, 3) - 1.5976 * zd));
        const px = padL + ((testN - 15) / (250 - 15)) * w;
        const py = canvas.height - padB - Math.min(1.0, Math.max(0.05, pwr)) * h;
        if (testN === 15) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Current Point Marker
      const curX = padL + ((n - 15) / (250 - 15)) * w;
      const curY = canvas.height - padB - (powerPct / 100) * h;
      ctx.fillStyle = powerPct >= 80 ? colors.success : colors.warn;
      ctx.beginPath();
      ctx.arc(curX, curY, 7, 0, Math.PI * 2);
      ctx.fill();
    };

    slider.addEventListener('input', updatePower);
    updatePower();

    stage.querySelector('#btn-submit-power').addEventListener('click', () => {
      const n = parseInt(slider.value);
      const d = 0.35;
      const delta = d * Math.sqrt(n / 2);
      const power = 1 / (1 + Math.exp(-0.07056 * Math.pow(delta - 1.96, 3) - 1.5976 * (delta - 1.96)));
      banner.className = 'ch-result-banner show';

      if (power >= 0.80 && n <= 140) {
        this.addScore('power_optimal', 50);
        banner.classList.add('success');
        banner.innerHTML = `<strong>Grant Approved!</strong> You achieved \\(\\ge 80\\%\\) power with efficient budget allocation at n = ${n}! (+50 Points). BAM!`;
      } else if (power >= 0.80) {
        banner.classList.add('success');
        banner.innerHTML = `<strong>Sufficient Power!</strong> You reached 80% power, but n = ${n} is slightly overbudget. Try finding the lowest n that reaches 80%!`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Underpowered Study:</strong> At n = ${n}, power is only ${Math.round(power * 100)}%. There is a high risk of Type II error (failing to detect a real drug effect). Increase sample size!`;
      }
    });
  }

  // ============================================================
  // CHALLENGE 6: CLT Normality Race
  // ============================================================
  renderCLTChallenge(stage) {
    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="shuffle"></i> Challenge 6: Central Limit Theorem Normality Race</h3>
            <p>Start with a heavily skewed, non-normal population (Exponential \\(\\lambda = 1.0\\), skewness = 2.0). Increase sample size \\(N\\) to observe how the sampling distribution of the sample mean \\(\\bar{X}_N\\) converges to a Gaussian bell curve. Achieve skewness \\(|\\gamma_1| < 0.15\\) to pass!</p>
          </div>
          <span class="ch-badge">Asymptotic Convergence</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="clt-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Sample Size (\\(N\\)): <span id="lbl-clt-n" class="highlight-val">4</span></label>
              <input type="range" id="slider-clt-n" min="2" max="60" step="2" value="4">
            </div>

            <div class="ch-metric-box">
              <div class="metric-label">Sampling Distribution Skewness (\\(\\gamma_1\\))</div>
              <div class="metric-val" id="val-clt-skewness">1.00</div>
              <div class="metric-sub" id="lbl-clt-status">Target: |Skewness| &lt; 0.15</div>
            </div>

            <button class="btn btn-primary" id="btn-submit-clt" style="width:100%;">
              <i data-lucide="check-circle"></i> Verify Normality Pass
            </button>
            <div id="clt-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#clt-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-clt-n');
    const lblN = stage.querySelector('#lbl-clt-n');
    const valSkew = stage.querySelector('#val-clt-skewness');
    const banner = stage.querySelector('#clt-banner');
    const colors = this.getThemeColors();

    const drawCLT = () => {
      const N = parseInt(slider.value);
      lblN.textContent = N;

      // Theoretical skewness for sample mean from Exp(1) is 2 / sqrt(N)
      const theoSkew = 2 / Math.sqrt(N);
      valSkew.textContent = theoSkew.toFixed(3);
      valSkew.style.color = theoSkew < 0.15 ? colors.success : colors.warn;

      // Simulate 1,500 sample means
      const nDraws = 1500;
      const means = [];
      for (let i = 0; i < nDraws; i++) {
        let s = 0;
        for (let j = 0; j < N; j++) {
          s += -Math.log(1 - Math.random() + 1e-9);
        }
        means.push(s / N);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const padL = 40, padR = 20, padT = 20, padB = 40;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padB - padT;

      const numBins = 28;
      const minVal = 0.2, maxVal = 2.5;
      const binW = (maxVal - minVal) / numBins;
      const counts = new Array(numBins).fill(0);
      means.forEach(m => {
        if (m >= minVal && m <= maxVal) {
          const idx = Math.min(numBins - 1, Math.floor((m - minVal) / binW));
          counts[idx]++;
        }
      });
      const maxC = Math.max(...counts);

      // Draw Histogram Bars
      const pxPerBin = w / numBins;
      counts.forEach((c, i) => {
        const bH = (c / maxC) * h;
        const x = padL + i * pxPerBin;
        const y = canvas.height - padB - bH;
        ctx.fillStyle = colors.text;
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        ctx.fillRect(x, y, pxPerBin - 2, bH);
        ctx.strokeRect(x, y, pxPerBin - 2, bH);
      });

      // Draw overlay theoretical normal bell
      ctx.strokeStyle = colors.success;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const mu = 1.0;
      const se = 1.0 / Math.sqrt(N);
      for (let xVal = minVal; xVal <= maxVal; xVal += 0.05) {
        const z = (xVal - mu) / se;
        const pdf = (1 / (se * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
        const normPx = padL + ((xVal - minVal) / (maxVal - minVal)) * w;
        const normPy = canvas.height - padB - Math.min(1.0, pdf * binW * (nDraws / maxC) * 0.9) * h;
        if (xVal === minVal) ctx.moveTo(normPx, normPy);
        else ctx.lineTo(normPx, normPy);
      }
      ctx.stroke();
    };

    slider.addEventListener('input', drawCLT);
    drawCLT();

    stage.querySelector('#btn-submit-clt').addEventListener('click', () => {
      const N = parseInt(slider.value);
      const skew = 2 / Math.sqrt(N);
      banner.className = 'ch-result-banner show';
      if (skew < 0.15) {
        this.addScore('clt_master', 50);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM! Central Limit Theorem Proven!</strong> At N = ${N}, the sampling distribution skewness has dropped to ${skew.toFixed(3)} (< 0.15), conforming to a Gaussian distribution regardless of the original skew! (+50 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Still Asymmetric:</strong> At N = ${N}, skewness is ${skew.toFixed(3)}. The right tail remains too thick. Increase N to compress the tail error!`;
      }
    });
  }

  // ============================================================
  // CHALLENGE 7: Maximum Likelihood Peak Climber
  // ============================================================
  renderMLEChallenge(stage) {
    // Secret population data: N=15 draws with mu=50, sigma=8
    const sample = [38, 42, 45, 47, 49, 50, 51, 52, 53, 55, 57, 58, 62, 65, 46];
    const n = sample.length;
    const trueMu = sample.reduce((a, b) => a + b, 0) / n;
    const trueVar = sample.reduce((a, b) => a + Math.pow(b - trueMu, 2), 0) / n; // MLE uses / n
    const trueSig = Math.sqrt(trueVar);

    const logLik = (mu, sig) => {
      let s = 0;
      sample.forEach(x => {
        s += Math.pow(x - mu, 2);
      });
      return - (n / 2) * Math.log(2 * Math.PI * sig * sig) - (1 / (2 * sig * sig)) * s;
    };

    const maxLogLik = logLik(trueMu, trueSig);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="mountain"></i> Challenge 7: Maximum Likelihood Peak Climber</h3>
            <p>You observed N = 15 sample data points. Adjust candidate parameters \\(\\mu\\) and \\(\\sigma\\) to climb the log-likelihood peak \\(\\ln \\mathcal{L}(\\mu, \\sigma)\\). Can you match the calculus derivation?</p>
          </div>
          <span class="ch-badge">Calculus Peak</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="mle-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Candidate Mean (\\(\\mu\\)): <span id="lbl-mle-mu" class="highlight-val">45.0</span></label>
              <input type="range" id="slider-mle-mu" min="35" max="65" step="0.5" value="45.0">
            </div>

            <div class="control-group">
              <label>Candidate Std Dev (\\(\\sigma\\)): <span id="lbl-mle-sig" class="highlight-val">12.0</span></label>
              <input type="range" id="slider-mle-sig" min="3.0" max="18.0" step="0.5" value="12.0">
            </div>

            <div class="ch-metric-box">
              <div class="metric-label">Log-Likelihood \\(\\ln \\mathcal{L}\\)</div>
              <div class="metric-val" id="val-log-lik">-80.0</div>
              <div class="metric-sub" id="lbl-mle-peak">Analytical Peak: ${maxLogLik.toFixed(1)}</div>
            </div>

            <button class="btn btn-primary" id="btn-submit-mle" style="width:100%;">
              <i data-lucide="check"></i> Lock In Candidate MLE
            </button>
            <div id="mle-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#mle-canvas');
    const ctx = canvas.getContext('2d');
    const sMu = stage.querySelector('#slider-mle-mu');
    const sSig = stage.querySelector('#slider-mle-sig');
    const lblMu = stage.querySelector('#lbl-mle-mu');
    const lblSig = stage.querySelector('#lbl-mle-sig');
    const valLL = stage.querySelector('#val-log-lik');
    const banner = stage.querySelector('#mle-banner');
    const colors = this.getThemeColors();

    const drawMLE = () => {
      const mu = parseFloat(sMu.value);
      const sig = parseFloat(sSig.value);
      lblMu.textContent = mu.toFixed(1);
      lblSig.textContent = sig.toFixed(1);

      const curLL = logLik(mu, sig);
      valLL.textContent = curLL.toFixed(1);
      valLL.style.color = Math.abs(curLL - maxLogLik) <= 1.0 ? colors.success : colors.warn;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const padL = 40, padR = 20, padT = 20, padB = 40;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padB - padT;

      // Draw Likelihood curve as a function of mu holding current sigma
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let testMu = 35; testMu <= 65; testMu += 0.5) {
        const ll = logLik(testMu, sig);
        const px = padL + ((testMu - 35) / 30) * w;
        const py = canvas.height - padB - Math.max(0, (ll - (-100)) / (maxLogLik - (-100))) * h;
        if (testMu === 35) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Plot data points along bottom axis
      sample.forEach(x => {
        const px = padL + ((x - 35) / 30) * w;
        ctx.fillStyle = colors.muted;
        ctx.beginPath();
        ctx.arc(px, canvas.height - padB, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Current point marker
      const curPx = padL + ((mu - 35) / 30) * w;
      const curPy = canvas.height - padB - Math.max(0, (curLL - (-100)) / (maxLogLik - (-100))) * h;
      ctx.fillStyle = Math.abs(curLL - maxLogLik) <= 1.0 ? colors.success : colors.warn;
      ctx.beginPath();
      ctx.arc(curPx, curPy, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    sMu.addEventListener('input', drawMLE);
    sSig.addEventListener('input', drawMLE);
    drawMLE();

    stage.querySelector('#btn-submit-mle').addEventListener('click', () => {
      const mu = parseFloat(sMu.value);
      const sig = parseFloat(sSig.value);
      const curLL = logLik(mu, sig);
      const diff = Math.abs(curLL - maxLogLik);

      banner.className = 'ch-result-banner show';
      if (diff <= 0.8) {
        this.addScore('mle_summit', 50);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM! Maximum Likelihood Summit Reached!</strong> Analytical peak: \\(\\hat{\\mu} = ${trueMu.toFixed(1)}, \\hat{\\sigma} = ${trueSig.toFixed(1)}\\). Your parameters matched the calculus derivation! (+50 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Close to peak:</strong> Your log-likelihood is ${curLL.toFixed(1)} (Peak: ${maxLogLik.toFixed(1)}). Remember: \\(\\hat{\\mu} = \\bar{x}\\) and \\(\\hat{\\sigma} = \\sqrt{\\frac{1}{n}\\sum (x_i - \\bar{x})^2}\\).`;
      }
    });
  }

  // ============================================================
  // CHALLENGE 8: False Discovery Rate (FDR) Controller
  // ============================================================
  renderFDRChallenge(stage) {
    // 30 simultaneous hypothesis tests: 25 null genes (uniform p-values), 5 real genes (tiny p-values)
    const pValues = [
      0.0001, 0.0004, 0.0012, 0.0025, 0.0080, // Real differential genes
      0.035, 0.048, 0.071, 0.112, 0.145,
      0.189, 0.231, 0.285, 0.320, 0.380,
      0.440, 0.510, 0.560, 0.620, 0.680,
      0.720, 0.770, 0.810, 0.850, 0.890,
      0.920, 0.940, 0.960, 0.980, 0.995
    ];

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="filter"></i> Challenge 8: False Discovery Rate (FDR) Controller</h3>
            <p>Testing 30 biological targets simultaneously. Choose between <strong>Raw P-Value (\\(\\alpha = 0.05\\))</strong>, <strong>Bonferroni Correction</strong>, or <strong>Benjamini-Hochberg (BH) FDR</strong> to discover real signals without false positive contamination!</p>
          </div>
          <span class="ch-badge">Multiplicity Control</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="fdr-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Multiplicity Adjustment Method:</label>
              <select id="sel-fdr-method" class="lab-select">
                <option value="raw">1. Unadjusted (Raw \\(\\alpha = 0.05\\)) - P-Hacking Trap</option>
                <option value="bonferroni">2. Bonferroni (\\(\\alpha / m = 0.00167\\)) - Overly Conservative</option>
                <option value="bh" selected>3. Benjamini-Hochberg FDR (\\(q = 0.05\\)) - Gold Standard</option>
              </select>
            </div>

            <div class="ch-metric-box">
              <div class="metric-label">Discovered Targets (Rejected \\(H_0\\))</div>
              <div class="metric-val" id="val-fdr-count">5 Targets</div>
              <div class="metric-sub" id="lbl-fdr-sub">True Positives: 5 | False Positives: 0</div>
            </div>

            <button class="btn btn-primary" id="btn-submit-fdr" style="width:100%;">
              <i data-lucide="award"></i> Lock In Multiple Testing Protocol
            </button>
            <div id="fdr-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#fdr-canvas');
    const ctx = canvas.getContext('2d');
    const selMethod = stage.querySelector('#sel-fdr-method');
    const valCount = stage.querySelector('#val-fdr-count');
    const lblSub = stage.querySelector('#lbl-fdr-sub');
    const banner = stage.querySelector('#fdr-banner');
    const colors = this.getThemeColors();

    const drawFDR = () => {
      const method = selMethod.value;
      const m = pValues.length;

      let rejections = [];
      if (method === 'raw') {
        rejections = pValues.map(p => p <= 0.05);
      } else if (method === 'bonferroni') {
        const bonfAlpha = 0.05 / m;
        rejections = pValues.map(p => p <= bonfAlpha);
      } else if (method === 'bh') {
        // BH procedure
        const q = 0.05;
        let maxK = -1;
        for (let i = 0; i < m; i++) {
          const rank = i + 1;
          if (pValues[i] <= (rank / m) * q) {
            maxK = i;
          }
        }
        rejections = pValues.map((p, idx) => idx <= maxK);
      }

      const totalRej = rejections.filter(Boolean).length;
      const truePos = rejections.slice(0, 5).filter(Boolean).length;
      const falsePos = totalRej - truePos;

      valCount.textContent = `${totalRej} Significant Targets`;
      valCount.style.color = (truePos === 5 && falsePos === 0) ? colors.success : colors.warn;
      lblSub.textContent = `True Real Signals: ${truePos}/5 | False Discoveries: ${falsePos}`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const padL = 40, padR = 20, padT = 20, padB = 40;
      const w = canvas.width - padL - padR;
      const h = canvas.height - padB - padT;

      // Draw P-Value Rank Plot (Ordered p-values)
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(padL, padT, w, h);

      // Draw BH line: y = (i / m) * 0.05
      ctx.strokeStyle = colors.success;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, canvas.height - padB);
      ctx.lineTo(canvas.width - padR, canvas.height - padB - (0.05 / 1.0) * h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw raw alpha=0.05 horizontal line
      ctx.strokeStyle = colors.error;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, canvas.height - padB - (0.05 / 1.0) * h);
      ctx.lineTo(canvas.width - padR, canvas.height - padB - (0.05 / 1.0) * h);
      ctx.stroke();

      // Draw points
      pValues.forEach((p, idx) => {
        const px = padL + ((idx + 1) / m) * w;
        const py = canvas.height - padB - (p / 1.0) * h;
        const isRej = rejections[idx];
        const isReal = idx < 5;

        ctx.fillStyle = isRej ? (isReal ? colors.success : colors.error) : colors.muted;
        ctx.beginPath();
        ctx.arc(px, py, isRej ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    selMethod.addEventListener('change', drawFDR);
    drawFDR();

    stage.querySelector('#btn-submit-fdr').addEventListener('click', () => {
      const method = selMethod.value;
      banner.className = 'ch-result-banner show';
      if (method === 'bh') {
        this.addScore('fdr_master', 50);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM! The FDR Master Solution!</strong> Benjamini-Hochberg accurately controls the False Discovery Rate to 5%, successfully discovering all 5 real genes while rejecting 0 false positives! (+50 Points).`;
      } else if (method === 'raw') {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>P-Hacking Alert!</strong> The raw \\(\\alpha = 0.05\\) threshold suffered from multiple testing inflation: 2 false positive genes were declared significant by random luck!`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Overly Conservative:</strong> Bonferroni strictly eliminates false positives, but it is so punitive (\\(\\alpha/30\\)) that it misses true biological targets (Type II error)!`;
      }
    });
  }

  showCertificateModal() {
    const mount = this.container.querySelector('#certificate-modal-mount');
    if (!mount) return;

    const rank = this.getRankTitle(this.stats.score);
    const completedCount = Object.keys(this.stats.completed).length;

    mount.innerHTML = `
      <div class="modal-overlay" id="cert-modal-backdrop">
        <div class="certificate-card">
          <div class="cert-header">
            <div class="cert-bam">BAM!</div>
            <h3>StatQuest Statistics Fundamentals</h3>
            <div class="cert-sub">Certificate of Statistical Intuition & Mastery</div>
          </div>

          <div class="cert-body">
            <p>This certifies that the candidate has completed first-principles empirical statistical challenges across:</p>
            <div class="cert-topics-list">
              <span>• Ordinary Least Squares</span>
              <span>• Distribution Identification</span>
              <span>• P-Values & Null Hypotheses</span>
              <span>• Clinical Test Selection</span>
              <span>• Power Analysis</span>
              <span>• Central Limit Theorem</span>
              <span>• Maximum Likelihood Estimation</span>
              <span>• False Discovery Rate (FDR)</span>
            </div>

            <div class="cert-stats-row">
              <div class="cert-stat-item">
                <span class="cert-stat-label">Total Points</span>
                <span class="cert-stat-num">${this.stats.score} PTS</span>
              </div>
              <div class="cert-stat-item">
                <span class="cert-stat-label">Conferred Rank</span>
                <span class="cert-stat-rank">${rank}</span>
              </div>
              <div class="cert-stat-item">
                <span class="cert-stat-label">Challenges Solved</span>
                <span class="cert-stat-num">${completedCount} / 8</span>
              </div>
            </div>
          </div>

          <div class="cert-footer">
            <div class="cert-seal">
              <div class="seal-inner">STATQUEST<br>VERIFIED</div>
            </div>
            <button class="btn btn-primary" id="btn-close-cert">
              Close Certificate
            </button>
          </div>
        </div>
      </div>
    `;

    const closeBtn = mount.querySelector('#btn-close-cert');
    const backdrop = mount.querySelector('#cert-modal-backdrop');
    const closeModal = () => { mount.innerHTML = ''; };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }
    this.refreshIcons();
  }

  addScore(challengeKey, points) {
    if (!this.stats.completed[challengeKey]) {
      this.stats.completed[challengeKey] = true;
      this.stats.score += points;
      this.saveStats();

      const scoreDisplay = this.container.querySelector('#challenge-score-display');
      if (scoreDisplay) {
        scoreDisplay.textContent = `${this.stats.score} PTS`;
      }
      const rankEl = this.container.querySelector('.score-rank');
      if (rankEl) {
        rankEl.textContent = this.getRankTitle(this.stats.score);
      }
    }
  }
}
