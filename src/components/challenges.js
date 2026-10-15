// src/components/challenges.js
import { C } from './palette.js';
import { modulesData } from '../data/modulesData.js';
import {
  normalCdf, normalQuantile, tTwoTailedP, betaInc, lnGamma, mulberry32, gaussian, mean, variance, pearson, median
} from './statmath.js';
/**
 * Interactive Statistical Challenges Laboratory.
 * Every challenge belongs to one module of the course, and the lab opens module by module.
 */

const CATALOG = [
  { key: 'outlier', moduleId: 'module-1', label: 'Outlier Sabotage', icon: 'bar-chart-2', done: ['outlier_breakdown'] },
  { key: 'detective', moduleId: 'module-2', label: 'Distribution Detective', icon: 'search', done: ['detective_win'] },
  { key: 'binomial', moduleId: 'module-2', label: 'Binomial Tail Guess', icon: 'dices', done: ['binom_tail'] },
  { key: 'bessel', moduleId: 'module-3', label: "Bessel's Divisor", icon: 'divide', done: ['bessel_predict'] },
  { key: 'clt', moduleId: 'module-4', label: 'CLT Normality Race', icon: 'shuffle', done: ['clt_master'] },
  { key: 'bootstrap', moduleId: 'module-4', label: 'Bootstrap Standard Error', icon: 'refresh-cw', done: ['boot_se'] },
  { key: 'pvalue', moduleId: 'module-5', label: 'P-Value Estimator', icon: 'target', done: ['p_sniper', 'p_close'] },
  { key: 'matcher', moduleId: 'module-5', label: 'Test Matcher', icon: 'check-square', done: ['test_match'] },
  { key: 'threshold', moduleId: 'module-5', label: 'Critical Threshold Finder', icon: 'ruler', done: ['threshold_find'] },
  { key: 'power', moduleId: 'module-6', label: 'Power Optimizer', icon: 'activity', done: ['power_optimal'] },
  { key: 'fdr', moduleId: 'module-6', label: 'FDR Controller', icon: 'filter', done: ['fdr_master'] },
  { key: 'tradeoff', moduleId: 'module-6', label: 'Error Trade-off Slider', icon: 'blend', done: ['tradeoff_set'] },
  { key: 'qq', moduleId: 'module-7', label: 'Q-Q Plot Reader', icon: 'git-commit', done: ['qq_read'] },
  { key: 'correlation', moduleId: 'module-8', label: 'Correlation Guesser', icon: 'compass', done: ['corr_guess'] },
  { key: 'mle', moduleId: 'module-9', label: 'MLE Climber', icon: 'mountain', done: ['mle_summit'] },
  { key: 'poisson', moduleId: 'module-9', label: 'Poisson Rate Climber', icon: 'bar-chart-big', done: ['poisson_peak'] },
  { key: 'ols', moduleId: 'module-10', label: 'OLS Line Fitter', icon: 'trending-up', done: ['ols_perfect', 'ols_good'] },
  { key: 'anova', moduleId: 'module-10', label: 'ANOVA Group Judge', icon: 'microscope', done: ['anova_judge'] },
  { key: 'bayes', moduleId: 'module-11', label: 'Base Rate Bayes Lab', icon: 'layers', done: ['bayes_base_rate'] }
];

export class ChallengesLab {
  constructor(container, moduleId = 'module-1') {
    this.container = container;
    this.stats = JSON.parse(
      (typeof localStorage !== 'undefined' && localStorage.getItem('statquest_challenge_stats')) ||
      JSON.stringify({
        score: 0,
        completed: {},
        attempts: {}
      })
    );
    this.currentModule = modulesData.some(m => m.id === moduleId) ? moduleId : 'module-1';
    this.currentChallenge = this.challengesFor(this.currentModule)[0].key;

    this.render();
  }

  challengesFor(moduleId) {
    return CATALOG.filter(c => c.moduleId === moduleId);
  }

  isDone(challenge) {
    return challenge.done.some(k => this.stats.completed[k]);
  }

  renderNav() {
    const chipBar = this.container.querySelector('#module-chip-bar');
    const nav = this.container.querySelector('#challenge-nav-bar');
    if (!chipBar || !nav) return;

    chipBar.innerHTML = modulesData.map(m => {
      const list = this.challengesFor(m.id);
      const done = list.filter(c => this.isDone(c)).length;
      const active = m.id === this.currentModule;
      return `
        <button class="module-chip ${active ? 'active' : ''}" data-module="${m.id}" aria-pressed="${active}" title="${m.title}">
          <span class="mc-num">${m.number}</span>
          <span class="mc-title">${m.title}</span>
          <span class="mc-count">${done}/${list.length}</span>
        </button>
      `;
    }).join('');

    nav.innerHTML = this.challengesFor(this.currentModule).map(c => `
      <button class="ch-nav-btn ${c.key === this.currentChallenge ? 'active' : ''}" data-ch="${c.key}" aria-pressed="${c.key === this.currentChallenge}">
        <i data-lucide="${c.icon}"></i> ${c.label}${this.isDone(c) ? ' <span class="ch-done" aria-label="completed">✓</span>' : ''}
      </button>
    `).join('');

    chipBar.querySelectorAll('.module-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentModule = btn.dataset.module;
        this.currentChallenge = this.challengesFor(this.currentModule)[0].key;
        this.renderNav();
        this.renderStage();
      });
    });

    nav.querySelectorAll('.ch-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentChallenge = btn.dataset.ch;
        this.renderNav();
        this.renderStage();
      });
    });
    this.refreshIcons();
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
        success: '#0a0a0a',
        warn: '#6b6b6b',
        error: '#0a0a0a'
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
      success: '#fafafa',
      warn: '#a3a3a3',
      error: '#fafafa'
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

        <!-- Module picker and the challenges inside the chosen module -->
        <div class="module-chip-bar" id="module-chip-bar" role="group" aria-label="Choose a module"></div>
        <div class="challenge-nav-bar" id="challenge-nav-bar" role="group" aria-label="Challenges in this module"></div>

        <!-- Active Challenge Sandbox -->
        <div class="challenge-stage" id="challenge-stage"></div>

        <!-- Certificate Modal Container -->
        <div id="certificate-modal-mount"></div>
      </div>
    `;

    // Certificate button listener
    const certBtn = this.container.querySelector('#btn-view-certificate');
    if (certBtn) {
      certBtn.addEventListener('click', () => this.showCertificateModal());
    }

    this.renderNav();
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
      case 'outlier':
        this.renderOutlierChallenge(stage);
        break;
      case 'detective':
        this.renderDetectiveChallenge(stage);
        break;
      case 'bessel':
        this.renderBesselChallenge(stage);
        break;
      case 'clt':
        this.renderCLTChallenge(stage);
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
      case 'fdr':
        this.renderFDRChallenge(stage);
        break;
      case 'qq':
        this.renderQQChallenge(stage);
        break;
      case 'correlation':
        this.renderCorrelationChallenge(stage);
        break;
      case 'mle':
        this.renderMLEChallenge(stage);
        break;
      case 'ols':
        this.renderOLSChallenge(stage);
        break;
      case 'binomial':
        this.renderBinomialChallenge(stage);
        break;
      case 'bootstrap':
        this.renderBootstrapChallenge(stage);
        break;
      case 'threshold':
        this.renderThresholdChallenge(stage);
        break;
      case 'tradeoff':
        this.renderTradeoffChallenge(stage);
        break;
      case 'poisson':
        this.renderPoissonChallenge(stage);
        break;
      case 'anova':
        this.renderANOVAChallenge(stage);
        break;
      case 'bayes':
        this.renderBayesChallenge(stage);
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
            <h3><i data-lucide="trending-up"></i> The Least Squares Fitter</h3>
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
      { id: 'normal', name: 'Normal (Gaussian)', desc: 'Symmetric bell: skewness near 0 and excess kurtosis near 0' },
      { id: 'exponential', name: 'Exponential', desc: 'Positive waiting times with a long right tail: skewness near 2' },
      { id: 'uniform', name: 'Continuous Uniform', desc: 'Flat across its whole range: excess kurtosis near -1.2' },
      { id: 'bimodal', name: 'Bimodal Mixture', desc: 'Two separated clumps: skewness near 0 but strongly negative excess kurtosis' }
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
    const kurtosis = (samples.reduce((a, b) => a + Math.pow((b - mean) / sd, 4), 0) / N - 3).toFixed(2);
    const sorted = [...samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(N / 2)].toFixed(1);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="search"></i> The Distribution Detective</h3>
            <p>An unknown scientific process generated N = ${N} observations. Inspect the sample histogram and the sample moments (skewness and excess kurtosis) to identify the distribution.</p>
          </div>
          <span class="ch-badge">Clues: skew ${skewness}, excess kurtosis ${kurtosis}</span>
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
              <div><strong>Sample Excess Kurtosis:</strong> ${kurtosis}</div>
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
          banner.innerHTML = `<strong>Incorrect identity:</strong> You guessed ${btn.textContent.trim()}, but the actual distribution was <strong>${choice.name}</strong>. Sample skewness = ${skewness}, excess kurtosis = ${kurtosis}. ${choice.desc}.`;
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
    const tVal = (1.5 + Math.random() * 2.0).toFixed(2);
    const df = 38;
    const t = parseFloat(tVal);
    const trueP = tTwoTailedP(t, df);
    const pAtTwo = tTwoTailedP(2, df);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="target"></i> The P-Value Estimator</h3>
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
              <input type="range" id="slider-guess-p" min="0.001" max="0.300" step="0.001" value="0.050">
            </div>

            <div class="ch-metric-box">
              <div class="metric-label">Significance Decision at \\(\\alpha = 0.05\\)</div>
              <div class="metric-val" id="metric-decision" style="font-size:1.1rem;">${trueP <= 0.05 ? 'Reject Null (Significant)' : 'Fail to Reject Null'}</div>
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
      ctx.fillStyle = C.a(0.22);
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
        banner.innerHTML = `<strong>Off target:</strong> True two-tailed p-value = <strong>${trueP.toFixed(3)}</strong>. Remember: with df = ${df}, t = 2.00 gives p = ${pAtTwo.toFixed(3)}, just above 0.05, so the exact degrees of freedom matter.`;
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
              <h3><i data-lucide="check-square"></i> Statistical Test Selector</h3>
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
      let answered = false;
      stage.querySelectorAll('.btn-opt-test').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
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
            } else {
              banner.className = 'ch-result-banner show success';
              banner.innerHTML = `${banner.innerHTML}<p style="margin-top:10px;"><strong>Set complete.</strong> All ${questions.length} scenarios reviewed.</p><button class="btn btn-ghost btn-sm" id="btn-matcher-restart"><i data-lucide="refresh-cw"></i> Start over</button>`;
              banner.querySelector('#btn-matcher-restart').addEventListener('click', () => {
                currentQ = 0;
                renderQ();
              });
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
            <h3><i data-lucide="activity"></i> Power & Sample Size Optimizer</h3>
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

    const d = 0.35;
    const twoSamplePower = (n) => {
      const delta = d * Math.sqrt(n / 2);
      return normalCdf(delta - 1.96) + normalCdf(-delta - 1.96);
    };

    const updatePower = () => {
      const n = parseInt(slider.value);
      lblN.textContent = n;
      const power = twoSamplePower(n);
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
        const pwr = twoSamplePower(testN);
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
      const power = twoSamplePower(n);
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
            <h3><i data-lucide="shuffle"></i> Central Limit Theorem Normality Race</h3>
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
              <input type="range" id="slider-clt-n" min="2" max="400" step="2" value="4">
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
      const mu = 1.0;
      const se = 1.0 / Math.sqrt(N);
      const minVal = Math.max(0, mu - 4 * se);
      const maxVal = mu + 4 * se;
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

      // Overlay the theoretical CLT normal curve, scaled to the bins
      ctx.strokeStyle = colors.success;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let xVal = minVal; xVal <= maxVal + 1e-9; xVal += (maxVal - minVal) / 200) {
        const z = (xVal - mu) / se;
        const pdf = (1 / (se * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
        const expectedPerBin = pdf * binW * nDraws;
        const normPx = padL + ((xVal - minVal) / (maxVal - minVal)) * w;
        const normPy = canvas.height - padB - Math.min(1, expectedPerBin / maxC) * h;
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
            <h3><i data-lucide="mountain"></i> Maximum Likelihood Peak Climber</h3>
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
            <h3><i data-lucide="filter"></i> False Discovery Rate (FDR) Controller</h3>
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

  // ============================================================
  // MODULE 1: Outlier Sabotage (mean vs median breakdown)
  // ============================================================
  renderOutlierChallenge(stage) {
    const base = [32, 35, 38, 40, 41, 43, 45, 47, 50];
    const baseMean = mean(base);
    const baseMedian = median(base);
    const MAX_X = 500;
    const TARGET_MEAN = 60;
    const MAX_MEDIAN_SHIFT = 1.5;

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="bar-chart-2"></i> Outlier Sabotage</h3>
            <p>Nine households report their monthly savings (in dollars). Add a tenth household with any value you like. Your goal: push the <strong>mean to at least ${TARGET_MEAN}</strong> while the <strong>median moves by no more than ${MAX_MEDIAN_SHIFT}</strong>.</p>
          </div>
          <span class="ch-badge">Breakdown Point</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="outlier-canvas" width="600" height="280" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>New household's savings: <span id="lbl-outlier-x" class="highlight-val">40</span></label>
              <input type="range" id="slider-outlier-x" min="0" max="${MAX_X}" step="1" value="40">
            </div>
            <div class="ch-metric-box">
              <div class="metric-label">Mean of the 10 households</div>
              <div class="metric-val" id="val-outlier-mean">--</div>
              <div class="metric-sub" id="val-outlier-median">Median: --</div>
              <div class="metric-sub">Before the new household: mean ${baseMean.toFixed(1)}, median ${baseMedian.toFixed(1)}</div>
            </div>
            <button class="btn btn-primary" id="btn-submit-outlier" style="width:100%;">
              <i data-lucide="check"></i> Submit Household
            </button>
            <div id="outlier-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#outlier-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-outlier-x');
    const lbl = stage.querySelector('#lbl-outlier-x');
    const valMean = stage.querySelector('#val-outlier-mean');
    const valMedian = stage.querySelector('#val-outlier-median');
    const banner = stage.querySelector('#outlier-banner');
    const colors = this.getThemeColors();
    const padL = 40, padR = 30, lineY = 170;
    const xToPx = v => padL + (v / MAX_X) * (canvas.width - padL - padR);

    const draw = () => {
      const x = parseFloat(slider.value);
      const data = [...base, x];
      const m = mean(data);
      const md = median(data);
      lbl.textContent = `$${x}`;
      valMean.textContent = `$${m.toFixed(1)}`;
      valMean.style.color = m >= TARGET_MEAN ? colors.success : colors.warn;
      valMedian.textContent = `Median $${md.toFixed(1)} (moved ${(md - baseMedian).toFixed(1)})`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, lineY);
      ctx.lineTo(canvas.width - padR, lineY);
      ctx.stroke();

      ctx.fillStyle = colors.muted;
      ctx.font = '11px JetBrains Mono, monospace';
      for (let v = 0; v <= MAX_X; v += 100) {
        const px = xToPx(v);
        ctx.beginPath();
        ctx.moveTo(px, lineY);
        ctx.lineTo(px, lineY + 6);
        ctx.stroke();
        ctx.fillText(`$${v}`, px - 10, lineY + 22);
      }

      ctx.fillStyle = colors.muted;
      base.forEach(v => {
        ctx.beginPath();
        ctx.arc(xToPx(v), lineY - 14, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = colors.text;
      ctx.beginPath();
      ctx.arc(xToPx(x), lineY - 14, 7, 0, Math.PI * 2);
      ctx.fill();

      const marker = (v, color, dash, label, row) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.moveTo(xToPx(v), 30 + row * 26);
        ctx.lineTo(xToPx(v), lineY);
        ctx.stroke();
        ctx.restore();
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(`${label} $${v.toFixed(1)}`, xToPx(v) + 6, 30 + row * 26 + 4);
      };
      marker(md, colors.success, [6, 4], 'median', 0);
      marker(m, colors.text, [], 'mean', 1);
    };

    slider.addEventListener('input', draw);
    draw();

    stage.querySelector('#btn-submit-outlier').addEventListener('click', () => {
      const x = parseFloat(slider.value);
      const data = [...base, x];
      const m = mean(data);
      const shift = Math.abs(median(data) - baseMedian);
      banner.className = 'ch-result-banner show';
      if (m >= TARGET_MEAN && shift <= MAX_MEDIAN_SHIFT) {
        this.addScore('outlier_breakdown', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> One household at $${x} lifted the mean to $${m.toFixed(1)}, but the median moved only ${shift.toFixed(1)}. The mean has a breakdown point of 0: one value can drag it anywhere. The median keeps its place until about half the data are corrupted. (+40 Points).`;
      } else if (m < TARGET_MEAN) {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Mean too low:</strong> With $${x}, the mean is $${m.toFixed(1)}. The target is $${TARGET_MEAN}, so the new value must be much larger.`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Median moved too much:</strong> The median shifted by ${shift.toFixed(1)}. A value that lands inside the middle of the data moves the median, so place the new value far above the middle.`;
      }
    });
  }

  // ============================================================
  // MODULE 3: Bessel's Divisor (why we divide by n - 1)
  // ============================================================
  renderBesselChallenge(stage) {
    const sigma2 = 100;
    const n0 = 5;
    const choices = [
      { value: 100, label: 'About 100 (the true variance)' },
      { value: 80, label: 'About 80' },
      { value: 20, label: 'About 20' },
      { value: 120, label: 'About 120' }
    ];
    const correctValue = ((n0 - 1) / n0) * sigma2;

    const rng = mulberry32(20260416);
    const reps = 4000;
    const sims = {};
    for (let n = 2; n <= 30; n++) {
      let sumBiased = 0;
      let sumUnbiased = 0;
      for (let r = 0; r < reps; r++) {
        const xs = [];
        for (let i = 0; i < n; i++) xs.push(50 + 10 * gaussian(rng));
        const xbar = mean(xs);
        const ss = xs.reduce((a, b) => a + (b - xbar) * (b - xbar), 0);
        sumBiased += ss / n;
        sumUnbiased += ss / (n - 1);
      }
      sims[n] = { biased: sumBiased / reps, unbiased: sumUnbiased / reps };
    }

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="divide"></i> Bessel's Divisor</h3>
            <p>A population has true variance σ² = 100 (standard deviation 10). From a sample of n = 5 values we compute the sum of squared deviations from the sample mean. Before looking at any simulation, <strong>predict the average</strong> of the estimate when we divide that sum by n.</p>
          </div>
          <span class="ch-badge">Unbiased Estimation</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="bessel-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:8px;">Step 1 · Predict the average of SS / n at n = 5:</label>
            <div class="detective-options">
              ${choices.map((c, i) => `
                <button class="btn btn-secondary btn-bessel" data-idx="${i}" style="width:100%; text-align:left; margin-bottom:8px; justify-content:flex-start;">${c.label}</button>
              `).join('')}
            </div>
            <div class="control-group">
              <label>Step 2 · Sample size (n): <span id="lbl-bessel-n" class="highlight-val">5</span></label>
              <input type="range" id="slider-bessel-n" min="2" max="30" step="1" value="5" disabled>
            </div>
            <div class="ch-stats-summary">
              <div><strong>Average of SS / n:</strong> <span id="val-bessel-biased">--</span></div>
              <div><strong>Average of SS / (n − 1):</strong> <span id="val-bessel-unbiased">--</span></div>
              <div><strong>True variance σ²:</strong> ${sigma2}</div>
            </div>
            <div id="bessel-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#bessel-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-bessel-n');
    const lbl = stage.querySelector('#lbl-bessel-n');
    const valB = stage.querySelector('#val-bessel-biased');
    const valU = stage.querySelector('#val-bessel-unbiased');
    const banner = stage.querySelector('#bessel-banner');
    const colors = this.getThemeColors();
    const padL = 50, padR = 20, padT = 40, padB = 40;
    let answered = false;

    const drawPlaceholder = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colors.muted;
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText('Make your prediction to unlock the simulation.', padL, canvas.height / 2);
    };

    const draw = () => {
      const n = parseInt(slider.value);
      lbl.textContent = n;
      const s = sims[n];
      valB.textContent = s.biased.toFixed(1);
      valU.textContent = s.unbiased.toFixed(1);

      const w = canvas.width - padL - padR;
      const h = canvas.height - padT - padB;
      const mapX = k => padL + ((k - 2) / 28) * w;
      const mapY = v => canvas.height - padB - (v / 120) * h;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.fillStyle = colors.muted;
      ctx.font = '11px JetBrains Mono, monospace';
      for (let v = 0; v <= 120; v += 40) {
        ctx.beginPath();
        ctx.moveTo(padL, mapY(v));
        ctx.lineTo(canvas.width - padR, mapY(v));
        ctx.stroke();
        ctx.fillText(String(v), 12, mapY(v) + 4);
      }
      ctx.fillText('n', canvas.width - padR - 8, canvas.height - 12);

      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = colors.success;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padL, mapY(sigma2));
      ctx.lineTo(canvas.width - padR, mapY(sigma2));
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = colors.error;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let k = 2; k <= 30; k++) {
        if (k === 2) ctx.moveTo(mapX(k), mapY(sims[k].biased));
        else ctx.lineTo(mapX(k), mapY(sims[k].biased));
      }
      ctx.stroke();

      ctx.save();
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let k = 2; k <= 30; k++) {
        if (k === 2) ctx.moveTo(mapX(k), mapY(sims[k].unbiased));
        else ctx.lineTo(mapX(k), mapY(sims[k].unbiased));
      }
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = colors.error;
      ctx.beginPath();
      ctx.arc(mapX(n), mapY(s.biased), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = colors.text;
      ctx.beginPath();
      ctx.arc(mapX(n), mapY(s.unbiased), 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = colors.muted;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('solid: divide by n    dotted: divide by n − 1    dashed: true σ² = 100', padL, 24);
    };

    drawPlaceholder();

    stage.querySelectorAll('.btn-bessel').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const choice = choices[parseInt(btn.dataset.idx)];
        stage.querySelectorAll('.btn-bessel').forEach(b => { b.disabled = true; });
        banner.className = 'ch-result-banner show';
        if (choice.value === correctValue) {
          this.addScore('bessel_predict', 45);
          banner.classList.add('success');
          banner.innerHTML = `<strong>BAM! Correct.</strong> At n = 5, the average of SS / n is (n − 1)/n × σ² = 4/5 × 100 = 80. Dividing by n − 1 instead removes the shortfall. (+45 Points).`;
        } else {
          banner.classList.add('warn');
          banner.innerHTML = `<strong>Not quite.</strong> The average of SS / n is (n − 1)/n × σ² = 4/5 × 100 = 80, so it systematically undershoots. Use the slider to see the pattern for every n.`;
        }
        slider.disabled = false;
        draw();
      });
    });

    slider.addEventListener('input', () => {
      if (answered) draw();
    });
  }

  // ============================================================
  // MODULE 7: Q-Q Plot Reader (normal, heavy-tailed, or skewed?)
  // ============================================================
  renderQQChallenge(stage) {
    const shapes = [
      { id: 'normal', name: 'Normal', note: 'The points hug the straight reference line across all quantiles, so the tails match a normal distribution.' },
      { id: 'heavy', name: 'Heavy-tailed', note: 'S-shaped: both extremes sit farther out than a normal would produce, so the ends stretch away from the line.' },
      { id: 'skewed', name: 'Right-skewed', note: 'Curved: the largest values rise above the line (a long upper tail), and the smallest values are compressed above it.' }
    ];
    const generators = {
      normal: rng => gaussian(rng),
      heavy: rng => {
        const z = gaussian(rng);
        let chi = 0;
        for (let k = 0; k < 3; k++) {
          const g = gaussian(rng);
          chi += g * g;
        }
        return z / Math.sqrt(chi / 3);
      },
      skewed: rng => -Math.log(1 - rng())
    };

    const truth = shapes[Math.floor(Math.random() * shapes.length)];
    const rng = mulberry32(Math.floor(Math.random() * 2 ** 31));
    const n = 150;
    const raw = Array.from({ length: n }, () => generators[truth.id](rng));
    const m = mean(raw);
    const s = Math.sqrt(variance(raw, 1));
    const sorted = raw.map(x => (x - m) / s).sort((a, b) => a - b);
    const points = sorted.map((z, i) => ({ theory: normalQuantile((i + 0.5) / n), sample: z }));

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="git-commit"></i> Q-Q Plot Reader</h3>
            <p>${n} observations were drawn from one unknown distribution. The Q-Q plot compares each sorted, standardized observation (vertical axis) with the matching standard normal quantile (horizontal axis). Read the shape and name the distribution.</p>
          </div>
          <span class="ch-badge">Quantile Diagnostics</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="qq-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:8px;">Which distribution produced this Q-Q plot?</label>
            <div class="detective-options">
              ${shapes.map(sh => `
                <button class="btn btn-secondary btn-qq" data-shape="${sh.id}" style="width:100%; text-align:left; margin-bottom:8px; justify-content:flex-start;">${sh.name}</button>
              `).join('')}
            </div>
            <div id="qq-banner" class="ch-result-banner"></div>
            <button class="btn btn-ghost btn-sm" id="btn-next-qq" style="margin-top:10px;">
              <i data-lucide="refresh-cw"></i> Draw a New Sample
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#qq-canvas');
    const ctx = canvas.getContext('2d');
    const banner = stage.querySelector('#qq-banner');
    const colors = this.getThemeColors();
    const padL = 50, padR = 20, padT = 20, padB = 40;
    const lim = 3.5;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;
    const mapX = v => padL + ((v + lim) / (2 * lim)) * w;
    const mapY = v => canvas.height - padB - ((v + lim) / (2 * lim)) * h;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let v = -3; v <= 3; v++) {
      ctx.beginPath();
      ctx.moveTo(mapX(v), padT);
      ctx.lineTo(mapX(v), canvas.height - padB);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padL, mapY(v));
      ctx.lineTo(canvas.width - padR, mapY(v));
      ctx.stroke();
    }

    ctx.strokeStyle = colors.success;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(mapX(-lim), mapY(-lim));
    ctx.lineTo(mapX(lim), mapY(lim));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = colors.text;
    points.forEach(p => {
      const px = mapX(Math.max(-lim, Math.min(lim, p.theory)));
      const py = mapY(Math.max(-lim, Math.min(lim, p.sample)));
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = colors.muted;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText('theoretical normal quantile', canvas.width - padR - 170, canvas.height - 12);
    ctx.save();
    ctx.translate(14, padT + 170);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('sample quantile (standardized)', 0, 0);
    ctx.restore();

    let answered = false;
    stage.querySelectorAll('.btn-qq').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        stage.querySelectorAll('.btn-qq').forEach(b => { b.disabled = true; });
        const chosen = btn.dataset.shape;
        banner.className = 'ch-result-banner show';
        if (chosen === truth.id) {
          this.addScore('qq_read', 40);
          banner.classList.add('success');
          banner.innerHTML = `<strong>BAM! The plot is ${truth.name}.</strong> ${truth.note} (+40 Points).`;
        } else {
          banner.classList.add('warn');
          banner.innerHTML = `<strong>The true distribution was ${truth.name}.</strong> ${truth.note}`;
        }
      });
    });

    stage.querySelector('#btn-next-qq').addEventListener('click', () => {
      this.renderQQChallenge(stage);
      this.refreshIcons();
    });
  }

  // ============================================================
  // MODULE 8: Correlation Guesser (Pearson's r from a scatter plot)
  // ============================================================
  renderCorrelationChallenge(stage) {
    const rng = mulberry32(Math.floor(Math.random() * 2 ** 31));
    const rOptions = [-0.9, -0.7, -0.4, 0, 0.3, 0.6, 0.85];
    const rTrue = rOptions[Math.floor(Math.random() * rOptions.length)];
    const n = 60;
    const xs = [];
    const ys = [];
    for (let i = 0; i < n; i++) {
      const x = gaussian(rng);
      const e = gaussian(rng);
      xs.push(x);
      ys.push(rTrue * x + Math.sqrt(1 - rTrue * rTrue) * e);
    }
    const rSample = pearson(xs, ys);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="compass"></i> Correlation Guesser</h3>
            <p>${n} paired observations are plotted below. Estimate Pearson's correlation r, which is the average product of standardized x and y values: r = Σ(xᵢ − x̄)(yᵢ − ȳ) / √[Σ(xᵢ − x̄)² Σ(yᵢ − ȳ)²]. Land within ±0.10 of the sample r.</p>
          </div>
          <span class="ch-badge">Pearson's r</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="corr-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Your guess for r: <span id="lbl-corr-guess" class="highlight-val">0.00</span></label>
              <input type="range" id="slider-corr-guess" min="-1" max="1" step="0.01" value="0">
            </div>
            <button class="btn btn-primary" id="btn-submit-corr" style="width:100%;">
              <i data-lucide="check"></i> Submit Guess
            </button>
            <div id="corr-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#corr-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-corr-guess');
    const lbl = stage.querySelector('#lbl-corr-guess');
    const banner = stage.querySelector('#corr-banner');
    const colors = this.getThemeColors();
    const padL = 50, padR = 20, padT = 20, padB = 40;
    const lim = 3.5;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;
    const mapX = v => padL + ((v + lim) / (2 * lim)) * w;
    const mapY = v => canvas.height - padB - ((v + lim) / (2 * lim)) * h;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    ctx.strokeRect(padL, padT, w, h);
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mapX(0), padT);
    ctx.lineTo(mapX(0), canvas.height - padB);
    ctx.moveTo(padL, mapY(0));
    ctx.lineTo(canvas.width - padR, mapY(0));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = colors.text;
    xs.forEach((x, i) => {
      ctx.beginPath();
      ctx.arc(mapX(x), mapY(ys[i]), 4, 0, Math.PI * 2);
      ctx.fill();
    });

    slider.addEventListener('input', () => {
      lbl.textContent = parseFloat(slider.value).toFixed(2);
    });

    stage.querySelector('#btn-submit-corr').addEventListener('click', () => {
      const guess = parseFloat(slider.value);
      const diff = Math.abs(guess - rSample);
      banner.className = 'ch-result-banner show';
      if (diff <= 0.10) {
        this.addScore('corr_guess', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> The sample r is ${rSample.toFixed(2)}, and your guess was ${guess.toFixed(2)}. r is the cosine of the angle between the two centered data vectors, so r = 0 means perpendicular and |r| = 1 means collinear. (+40 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Off by ${diff.toFixed(2)}:</strong> The sample r is ${rSample.toFixed(2)}. Look at how tightly the points follow a line and whether that line slopes up or down.`;
      }
    });
  }

  // ============================================================
  // MODULE 11: Base Rate Bayes Lab (P(sick | positive))
  // ============================================================
  renderBayesChallenge(stage) {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const prev = pick([0.005, 0.01, 0.02, 0.05, 0.1]);
    const sens = pick([0.9, 0.95, 0.99]);
    const spec = pick([0.9, 0.95, 0.98]);
    const exact = (sens * prev) / (sens * prev + (1 - spec) * (1 - prev));
    const N = 10000;
    const D = Math.round(prev * N);
    const TP = Math.round(sens * D);
    const FP = Math.round((1 - spec) * (N - D));

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="layers"></i> Base Rate Bayes Lab</h3>
            <p>A disease affects a fraction of the population. A test has the sensitivity and specificity shown. A randomly chosen person tests <strong>positive</strong>. Before the grid is revealed, predict the probability that this person actually has the disease.</p>
          </div>
          <span class="ch-badge">Bayes' Theorem</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="bayes-canvas" width="600" height="340" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="ch-stats-summary">
              <div><strong>Prevalence P(sick):</strong> ${(prev * 100).toFixed(1)}%</div>
              <div><strong>Sensitivity P(+ | sick):</strong> ${(sens * 100).toFixed(0)}%</div>
              <div><strong>Specificity P(− | healthy):</strong> ${(spec * 100).toFixed(0)}%</div>
            </div>
            <div class="control-group">
              <label>Your prediction for P(sick | positive): <span id="lbl-bayes-guess" class="highlight-val">50%</span></label>
              <input type="range" id="slider-bayes-guess" min="0" max="100" step="1" value="50">
            </div>
            <button class="btn btn-primary" id="btn-submit-bayes" style="width:100%;">
              <i data-lucide="check"></i> Lock In Prediction
            </button>
            <div id="bayes-banner" class="ch-result-banner"></div>
            <button class="btn btn-ghost btn-sm" id="btn-next-bayes" style="margin-top:10px;">
              <i data-lucide="refresh-cw"></i> New Scenario
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#bayes-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-bayes-guess');
    const lbl = stage.querySelector('#lbl-bayes-guess');
    const banner = stage.querySelector('#bayes-banner');
    const colors = this.getThemeColors();

    const drawPlaceholder = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colors.muted;
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(`Imagine ${N.toLocaleString()} people. Make your prediction to reveal them.`, 20, canvas.height / 2);
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = 100;
      const cell = 2.6;
      const ox = 20;
      const oy = 20;
      for (let i = 0; i < N; i++) {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const x = ox + c * cell;
        const y = oy + r * cell;
        if (i < D) {
          ctx.fillStyle = i < TP ? colors.text : colors.muted;
        } else {
          ctx.fillStyle = i - D < FP ? colors.warn : colors.grid;
        }
        ctx.fillRect(x, y, cell - 0.6, cell - 0.6);
      }

      const legendX = 320;
      ctx.font = '13px Inter, sans-serif';
      const rows = [
        [colors.text, `Sick and test positive (TP): ${TP.toLocaleString()}`],
        [colors.warn, `Healthy but test positive (FP): ${FP.toLocaleString()}`],
        [colors.muted, `Sick but test negative (FN): ${(D - TP).toLocaleString()}`],
        [colors.grid, `Healthy and test negative (TN): ${(N - D - FP).toLocaleString()}`]
      ];
      rows.forEach(([color, text], i) => {
        ctx.fillStyle = color;
        ctx.fillRect(legendX, 30 + i * 28, 12, 12);
        ctx.fillStyle = colors.text;
        ctx.fillText(text, legendX + 20, 41 + i * 28);
      });
      ctx.fillStyle = colors.text;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.fillText(`P(sick | +) = TP / (TP + FP)`, legendX, 180);
      ctx.fillText(`= ${TP} / ${TP + FP} = ${((TP / (TP + FP)) * 100).toFixed(1)}%`, legendX, 202);
    };

    drawPlaceholder();

    slider.addEventListener('input', () => {
      lbl.textContent = `${slider.value}%`;
    });

    let answered = false;
    stage.querySelector('#btn-submit-bayes').addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const guess = parseFloat(slider.value) / 100;
      const diff = Math.abs(guess - exact);
      drawGrid();
      banner.className = 'ch-result-banner show';
      const exactTxt = (exact * 100).toFixed(1);
      if (diff <= 0.03) {
        this.addScore('bayes_base_rate', 45);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> The true probability is ${exactTxt}%. Only ${TP} of the ${TP + FP} positives are sick; the rest of the positives are false alarms among the ${N - D} healthy people. The low base rate dominates. (+45 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Base-rate trap:</strong> The true probability is ${exactTxt}%, not ${(guess * 100).toFixed(0)}%. Among ${TP + FP} positives, ${TP} are sick and ${FP} are healthy false alarms. Accuracy of the test alone does not set the answer; the prevalence does too.`;
      }
    });

    stage.querySelector('#btn-next-bayes').addEventListener('click', () => {
      this.renderBayesChallenge(stage);
      this.refreshIcons();
    });
  }

  // ============================================================
  // MODULE 2: Binomial Tail Guess (P(X >= k) for X ~ Binomial(n, p))
  // ============================================================
  renderBinomialChallenge(stage) {
    const n = 10;
    const p = [0.2, 0.3, 0.4, 0.6, 0.7, 0.8][Math.floor(Math.random() * 6)];
    const k = Math.round(n * p) + 1;
    const pmfs = Array.from({ length: n + 1 }, (_, x) =>
      Math.exp(lnGamma(n + 1) - lnGamma(x + 1) - lnGamma(n - x + 1) + x * Math.log(p) + (n - x) * Math.log(1 - p)));
    const exact = pmfs.reduce((a, pv, x) => (x >= k ? a + pv : a), 0);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="dices"></i> Binomial Tail Guess</h3>
            <p>Each of n = ${n} independent trials succeeds with probability p = ${p}. Let X count the successes, so X ~ Binomial(${n}, ${p}) with mean np = ${(n * p).toFixed(1)}. Estimate the probability of at least ${k} successes, P(X ≥ ${k}). The distribution appears after you lock in your estimate.</p>
          </div>
          <span class="ch-badge">Discrete Distributions</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="binom-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Your estimate of P(X ≥ ${k}): <span id="lbl-binom-guess" class="highlight-val">50%</span></label>
              <input type="range" id="slider-binom-guess" min="0" max="100" step="1" value="50">
            </div>
            <button class="btn btn-primary" id="btn-submit-binom" style="width:100%;">
              <i data-lucide="check"></i> Lock In & Reveal
            </button>
            <div id="binom-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#binom-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-binom-guess');
    const lbl = stage.querySelector('#lbl-binom-guess');
    const banner = stage.querySelector('#binom-banner');
    const colors = this.getThemeColors();
    const padL = 50, padR = 20, padT = 40, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;
    const maxP = Math.max(...pmfs);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.muted;
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('Make your estimate to reveal the distribution.', padL, canvas.height / 2);

    slider.addEventListener('input', () => {
      lbl.textContent = `${slider.value}%`;
    });

    let answered = false;
    stage.querySelector('#btn-submit-binom').addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const guess = parseFloat(slider.value) / 100;
      const diff = Math.abs(guess - exact);
      const bw = w / (n + 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pmfs.forEach((pv, x) => {
        const bh = (pv / maxP) * h;
        const bx = padL + x * bw + 4;
        const by = canvas.height - padB - bh;
        ctx.fillStyle = x >= k ? colors.success : colors.muted;
        ctx.fillRect(bx, by, bw - 8, bh);
        ctx.fillStyle = colors.muted;
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText(String(x), bx + (bw - 8) / 2 - 3, canvas.height - padB + 16);
      });
      ctx.fillStyle = colors.text;
      ctx.font = '13px Inter, sans-serif';
      ctx.fillText(`Green: P(X ≥ ${k}) = ${(exact * 100).toFixed(1)}%`, padL, padT - 14);

      banner.className = 'ch-result-banner show';
      if (diff <= 0.03) {
        this.addScore('binom_tail', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> The exact tail probability is ${(exact * 100).toFixed(1)}%. The green bars are the outcomes X = ${k} to ${n}, and adding their probabilities gives the answer. Your estimate was within 3 points. (+40 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Off target:</strong> The exact value is ${(exact * 100).toFixed(1)}%, not ${(guess * 100).toFixed(0)}%. Sum the bars from X = ${k} upward. The bars drop off quickly on the right when p is small, and the mean np = ${(n * p).toFixed(1)} sits near the middle.`;
      }
    });
  }

  // ============================================================
  // MODULE 4: Bootstrap Standard Error (resampling the sample)
  // ============================================================
  renderBootstrapChallenge(stage) {
    const n = 25;
    const sample = Array.from({ length: n }, () => 50 + 10 * gaussian());
    const sampleSd = Math.sqrt(variance(sample, 1));
    const theorySE = sampleSd / Math.sqrt(n);
    const B = 2000;
    const boot = [];
    for (let b = 0; b < B; b++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += sample[Math.floor(Math.random() * n)];
      boot.push(s / n);
    }
    const bootSE = Math.sqrt(variance(boot, 1));

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="refresh-cw"></i> Bootstrap Standard Error</h3>
            <p>You have one sample of n = ${n} measurements (dots below). You cannot repeat the study, so you resample: draw ${n} values from your sample <em>with replacement</em>, compute the mean, and repeat ${B.toLocaleString()} times. Estimate the standard error of the sample mean, which is the standard deviation of those resampled means.</p>
          </div>
          <span class="ch-badge">Resampling</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="boot-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Your estimate of the standard error: <span id="lbl-boot-guess" class="highlight-val">2.0</span></label>
              <input type="range" id="slider-boot-guess" min="0.2" max="5" step="0.1" value="2">
            </div>
            <button class="btn btn-primary" id="btn-submit-boot" style="width:100%;">
              <i data-lucide="check"></i> Run the Bootstrap & Grade
            </button>
            <div id="boot-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#boot-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-boot-guess');
    const lbl = stage.querySelector('#lbl-boot-guess');
    const banner = stage.querySelector('#boot-banner');
    const colors = this.getThemeColors();
    const padL = 50, padR = 20, padT = 40, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;

    const sampleX = v => padL + ((v - 25) / 50) * w;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colors.grid;
    ctx.beginPath();
    ctx.moveTo(padL, canvas.height - padB);
    ctx.lineTo(canvas.width - padR, canvas.height - padB);
    ctx.stroke();
    ctx.fillStyle = colors.text;
    sample.forEach(v => {
      ctx.beginPath();
      ctx.arc(sampleX(v), canvas.height / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = colors.muted;
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText(`Your sample: n = ${n}, sample mean = ${mean(sample).toFixed(1)}`, padL, padT - 14);

    slider.addEventListener('input', () => {
      lbl.textContent = parseFloat(slider.value).toFixed(1);
    });

    let answered = false;
    stage.querySelector('#btn-submit-boot').addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const guess = parseFloat(slider.value);
      const rel = Math.abs(guess - bootSE) / bootSE;

      const lo = Math.min(...boot);
      const hi = Math.max(...boot);
      const bins = 30;
      const bwid = (hi - lo) / bins;
      const counts = new Array(bins).fill(0);
      boot.forEach(v => {
        counts[Math.min(bins - 1, Math.floor((v - lo) / bwid))]++;
      });
      const maxC = Math.max(...counts);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colors.text;
      counts.forEach((c, i) => {
        const bh = (c / maxC) * h;
        ctx.fillRect(padL + (i * w) / bins + 1, canvas.height - padB - bh, w / bins - 2, bh);
      });
      ctx.strokeStyle = colors.grid;
      ctx.beginPath();
      ctx.moveTo(padL, canvas.height - padB);
      ctx.lineTo(canvas.width - padR, canvas.height - padB);
      ctx.stroke();
      ctx.fillStyle = colors.muted;
      ctx.font = '13px Inter, sans-serif';
      ctx.fillText(`Bootstrap means: SD = ${bootSE.toFixed(2)}`, padL, padT - 14);

      banner.className = 'ch-result-banner show';
      const se = `Bootstrap SE = ${bootSE.toFixed(2)}, matching the formula s/√n = ${theorySE.toFixed(2)}.`;
      if (rel <= 0.15) {
        this.addScore('boot_se', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> ${se} The resampling spread of the mean shows how much the mean would move from study to study. (+40 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Off target:</strong> Your guess was ${guess.toFixed(1)}. ${se} The SE is the spread of the mean, not of the individual values, so it shrinks with √n.`;
      }
    });
  }

  // ============================================================
  // MODULE 5: Critical Threshold Finder (Type I error of a coin test)
  // ============================================================
  renderThresholdChallenge(stage) {
    const n = 100;
    const pmfs = Array.from({ length: n + 1 }, (_, k) =>
      Math.exp(lnGamma(n + 1) - lnGamma(k + 1) - lnGamma(n - k + 1) - n * Math.log(2)));
    const alphaFor = c => pmfs.reduce((a, pv, k) => (Math.abs(k - 50) >= c ? a + pv : a), 0);
    let best = 1;
    while (alphaFor(best) > 0.05) best++;

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="ruler"></i> Critical Threshold Finder</h3>
            <p>A fair coin is flipped n = ${n} times. The null hypothesis says the coin is fair, so the number of heads X has mean 50. Your rule rejects the null when |X − 50| ≥ c. Choose the <strong>smallest</strong> c whose Type I error α (the chance of rejecting a true null) is at most 0.05. Red bars are outcomes that would lead to rejection.</p>
          </div>
          <span class="ch-badge">Type I Error</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="threshold-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Cutoff c: <span id="lbl-threshold-c" class="highlight-val">10</span></label>
              <input type="range" id="slider-threshold-c" min="1" max="30" step="1" value="10">
            </div>
            <div class="ch-metric-box">
              <div class="metric-label">Type I error α for this rule</div>
              <div class="metric-val" id="val-threshold-alpha">--</div>
            </div>
            <button class="btn btn-primary" id="btn-submit-threshold" style="width:100%;">
              <i data-lucide="check"></i> Submit Cutoff
            </button>
            <div id="threshold-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#threshold-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-threshold-c');
    const lbl = stage.querySelector('#lbl-threshold-c');
    const valAlpha = stage.querySelector('#val-threshold-alpha');
    const banner = stage.querySelector('#threshold-banner');
    const colors = this.getThemeColors();
    const padL = 40, padR = 20, padT = 30, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;
    const lo = 30, hi = 70;
    const bw = w / (hi - lo + 1);
    const maxP = Math.max(...pmfs);

    const draw = () => {
      const c = parseInt(slider.value);
      lbl.textContent = c;
      const a = alphaFor(c);
      valAlpha.textContent = `${(a * 100).toFixed(2)}%`;
      valAlpha.style.color = a <= 0.05 ? colors.success : colors.error;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let k = lo; k <= hi; k++) {
        const bh = (pmfs[k] / maxP) * h;
        const bx = padL + (k - lo) * bw + 1;
        ctx.fillStyle = Math.abs(k - 50) >= c ? colors.error : colors.muted;
        ctx.fillRect(bx, canvas.height - padB - bh, bw - 2, bh);
      }
      ctx.strokeStyle = colors.grid;
      ctx.beginPath();
      ctx.moveTo(padL, canvas.height - padB);
      ctx.lineTo(canvas.width - padR, canvas.height - padB);
      ctx.stroke();
      ctx.fillStyle = colors.muted;
      ctx.font = '11px JetBrains Mono, monospace';
      [30, 40, 50, 60, 70].forEach(k => {
        ctx.fillText(String(k), padL + (k - lo) * bw - 4, canvas.height - padB + 16);
      });
      ctx.fillStyle = colors.text;
      ctx.font = '13px Inter, sans-serif';
      ctx.fillText(`Reject when X ≤ ${50 - c} or X ≥ ${50 + c}`, padL, padT - 10);
    };

    slider.addEventListener('input', draw);
    draw();

    stage.querySelector('#btn-submit-threshold').addEventListener('click', () => {
      const c = parseInt(slider.value);
      const a = alphaFor(c);
      banner.className = 'ch-result-banner show';
      if (c === best) {
        this.addScore('threshold_find', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> c = ${c} is the smallest cutoff with α = ${(a * 100).toFixed(2)}% ≤ 5%. A smaller c would push α above 5%. (+40 Points).`;
      } else if (a > 0.05) {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Too permissive:</strong> With c = ${c}, α = ${(a * 100).toFixed(2)}%, which is above 5%. Increase c.`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Too conservative:</strong> With c = ${c}, α = ${(a * 100).toFixed(2)}%. That passes, but c = ${best} also passes and is the smallest such cutoff, so it rejects more often when the coin really is biased.`;
      }
    });
  }

  // ============================================================
  // MODULE 6: Error Trade-off Slider (alpha vs power for one cutoff)
  // ============================================================
  renderTradeoffChallenge(stage) {
    const delta = [1.5, 2, 2.5][Math.floor(Math.random() * 3)];
    const cBest = normalQuantile(0.95);
    const alphaOf = c => 1 - normalCdf(c);
    const powerOf = c => 1 - normalCdf(c - delta);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="blend"></i> Error Trade-off Slider</h3>
            <p>A test statistic is Normal(0, 1) when the null is true and Normal(${delta}, 1) when the alternative is true. You reject when the statistic exceeds the cutoff c. Move c to keep the Type I error α at or below 0.05 while making the power (the chance of detecting the alternative) as large as possible.</p>
          </div>
          <span class="ch-badge">α vs Power</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="tradeoff-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Cutoff c: <span id="lbl-tradeoff-c" class="highlight-val">1.00</span></label>
              <input type="range" id="slider-tradeoff-c" min="-1" max="4" step="0.01" value="1">
            </div>
            <div class="ch-stats-summary">
              <div><strong>Type I error α:</strong> <span id="val-tradeoff-alpha">--</span></div>
              <div><strong>Power 1 − β:</strong> <span id="val-tradeoff-power">--</span></div>
            </div>
            <button class="btn btn-primary" id="btn-submit-tradeoff" style="width:100%;">
              <i data-lucide="check"></i> Submit Cutoff
            </button>
            <div id="tradeoff-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#tradeoff-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-tradeoff-c');
    const lbl = stage.querySelector('#lbl-tradeoff-c');
    const valA = stage.querySelector('#val-tradeoff-alpha');
    const valP = stage.querySelector('#val-tradeoff-power');
    const banner = stage.querySelector('#tradeoff-banner');
    const colors = this.getThemeColors();
    const padL = 40, padR = 20, padT = 30, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;
    const xMin = -3.5, xMax = delta + 3.5;
    const mapX = x => padL + ((x - xMin) / (xMax - xMin)) * w;
    const phi = x => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    const mapY = y => canvas.height - padB - (y / phi(0)) * h * 0.95;

    const curve = (shift, color, fillFrom) => {
      ctx.beginPath();
      for (let x = xMin; x <= xMax + 1e-9; x += 0.02) {
        const px = mapX(x);
        const py = mapY(phi(x - shift));
        if (x === xMin) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      if (fillFrom !== null) {
        ctx.beginPath();
        ctx.moveTo(mapX(fillFrom), canvas.height - padB);
        for (let x = fillFrom; x <= xMax + 1e-9; x += 0.02) ctx.lineTo(mapX(x), mapY(phi(x - shift)));
        ctx.lineTo(mapX(xMax), canvas.height - padB);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.35;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const draw = () => {
      const c = parseFloat(slider.value);
      lbl.textContent = c.toFixed(2);
      const a = alphaOf(c);
      const pw = powerOf(c);
      valA.textContent = `${(a * 100).toFixed(1)}%`;
      valA.style.color = a <= 0.05 ? colors.success : colors.error;
      valP.textContent = `${(pw * 100).toFixed(1)}%`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = colors.grid;
      ctx.beginPath();
      ctx.moveTo(padL, canvas.height - padB);
      ctx.lineTo(canvas.width - padR, canvas.height - padB);
      ctx.stroke();
      curve(0, colors.muted, c);
      curve(delta, colors.success, c);
      curve(0, colors.muted, null);
      curve(delta, colors.success, null);
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(mapX(c), padT);
      ctx.lineTo(mapX(c), canvas.height - padB);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = colors.text;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('grey: null (α = shaded area right of c)   green: alternative (power = shaded area)', padL, padT - 10);
    };

    slider.addEventListener('input', draw);
    draw();

    stage.querySelector('#btn-submit-tradeoff').addEventListener('click', () => {
      const c = parseFloat(slider.value);
      banner.className = 'ch-result-banner show';
      if (Math.abs(c - cBest) <= 0.02) {
        this.addScore('tradeoff_set', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> c = ${cBest.toFixed(3)} = Φ⁻¹(0.95) gives α = 5% exactly. Any lower cutoff raises α above 5%, and any higher cutoff lowers power. Power here is ${(powerOf(cBest) * 100).toFixed(1)}%. (+40 Points).`;
      } else if (c < cBest) {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>α too large:</strong> α = ${(alphaOf(c) * 100).toFixed(1)}% is above 5%. Lowering the cutoff gains power but breaks the Type I error budget.`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Power wasted:</strong> α = ${(alphaOf(c) * 100).toFixed(1)}% is below the budget, but power is only ${(powerOf(c) * 100).toFixed(1)}%. The cutoff c = ${cBest.toFixed(3)} keeps α = 5% and gives more power.`;
      }
    });
  }

  // ============================================================
  // MODULE 9: Poisson Rate Climber (MLE of an event rate)
  // ============================================================
  renderPoissonChallenge(stage) {
    const lamTrue = 2 + Math.random() * 6;
    const drawPoisson = () => {
      const L = Math.exp(-lamTrue);
      let k = 0;
      let p = 1;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      return k - 1;
    };
    const xs = Array.from({ length: 12 }, drawPoisson);
    const lamHat = mean(xs);
    const logLik = lam => xs.reduce((a, x) => a + x * Math.log(lam) - lam - lnGamma(x + 1), 0);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="bar-chart-big"></i> Poisson Rate Climber</h3>
            <p>Twelve counts were recorded: <strong>${xs.join(', ')}</strong>. Each count comes from a Poisson(λ) process with the same unknown rate λ. The log-likelihood is ℓ(λ) = Σ [xᵢ ln λ − λ − ln xᵢ!]. Adjust λ to climb to the value that makes ℓ(λ) as large as possible.</p>
          </div>
          <span class="ch-badge">Maximum Likelihood</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="poisson-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <div class="control-group">
              <label>Rate λ: <span id="lbl-poisson-lam" class="highlight-val">5.00</span></label>
              <input type="range" id="slider-poisson-lam" min="0.5" max="12" step="0.05" value="5">
            </div>
            <div class="ch-metric-box">
              <div class="metric-label">Log-likelihood ℓ(λ) at your λ</div>
              <div class="metric-val" id="val-poisson-ll">--</div>
            </div>
            <button class="btn btn-primary" id="btn-submit-poisson" style="width:100%;">
              <i data-lucide="check"></i> Lock In λ & Reveal the Curve
            </button>
            <div id="poisson-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#poisson-canvas');
    const ctx = canvas.getContext('2d');
    const slider = stage.querySelector('#slider-poisson-lam');
    const lbl = stage.querySelector('#lbl-poisson-lam');
    const valLL = stage.querySelector('#val-poisson-ll');
    const banner = stage.querySelector('#poisson-banner');
    const colors = this.getThemeColors();
    const padL = 60, padR = 20, padT = 30, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;

    ctx.fillStyle = colors.muted;
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('Lock in your λ to reveal the log-likelihood curve.', padL, canvas.height / 2);

    slider.addEventListener('input', () => {
      const lam = parseFloat(slider.value);
      lbl.textContent = lam.toFixed(2);
      valLL.textContent = logLik(lam).toFixed(2);
    });
    valLL.textContent = logLik(parseFloat(slider.value)).toFixed(2);

    let answered = false;
    stage.querySelector('#btn-submit-poisson').addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const lam = parseFloat(slider.value);
      const grid = [];
      for (let l = 0.5; l <= 12; l += 0.05) grid.push([l, logLik(l)]);
      const lls = grid.map(g => g[1]);
      const minLL = Math.min(...lls);
      const maxLL = Math.max(...lls);
      const mapX = l => padL + ((l - 0.5) / 11.5) * w;
      const mapY = v => padT + ((maxLL - v) / (maxLL - minLL)) * h;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      grid.forEach(([l, v], i) => {
        if (i === 0) ctx.moveTo(mapX(l), mapY(v)); else ctx.lineTo(mapX(l), mapY(v));
      });
      ctx.stroke();
      ctx.strokeStyle = colors.success;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(mapX(lamHat), padT);
      ctx.lineTo(mapX(lamHat), canvas.height - padB);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = colors.error;
      ctx.beginPath();
      ctx.arc(mapX(lam), mapY(logLik(lam)), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = colors.muted;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('ℓ(λ) against λ. Dashed line: the peak at λ̂ = x̄', padL, padT - 10);

      banner.className = 'ch-result-banner show';
      if (Math.abs(lam - lamHat) <= 0.3) {
        this.addScore('poisson_peak', 40);
        banner.classList.add('success');
        banner.innerHTML = `<strong>BAM!</strong> The peak is at λ̂ = x̄ = ${lamHat.toFixed(2)}. Setting the derivative Σxᵢ/λ − n = 0 gives the sample mean, so the MLE of a Poisson rate is simply the average count. (+40 Points).`;
      } else {
        banner.classList.add('warn');
        banner.innerHTML = `<strong>Not at the peak:</strong> Your λ = ${lam.toFixed(2)}. The likelihood peaks at λ̂ = x̄ = ${lamHat.toFixed(2)}. Set the derivative Σxᵢ/λ − n to zero to see why.`;
      }
    });
  }

  // ============================================================
  // MODULE 10: ANOVA Group Judge (is the difference real?)
  // ============================================================
  renderANOVAChallenge(stage) {
    const real = Math.random() < 0.5;
    const means = real ? [50, 50, 58] : [50, 50, 50];
    const sd = 8;
    const nPer = 8;
    const groups = means.map(m => Array.from({ length: nPer }, () => m + sd * gaussian()));
    const grand = mean(groups.flat());
    const ssb = groups.reduce((a, g) => a + nPer * (mean(g) - grand) ** 2, 0);
    const ssw = groups.reduce((a, g) => a + g.reduce((b, x) => b + (x - mean(g)) ** 2, 0), 0);
    const d1 = means.length - 1;
    const d2 = means.length * nPer - means.length;
    const F = (ssb / d1) / (ssw / d2);
    const pVal = betaInc(d2 / (d2 + d1 * F), d2 / 2, d1 / 2);

    stage.innerHTML = `
      <div class="ch-card">
        <div class="ch-header-row">
          <div>
            <h3><i data-lucide="microscope"></i> ANOVA Group Judge</h3>
            <p>Three treatment groups of ${nPer} subjects each were measured. Look at the spread of the dots within each group and the gap between the group means. Judge whether the group means differ <strong>significantly</strong> at α = 0.05 under a one-way ANOVA F test. The F statistic and exact p-value appear after you answer.</p>
          </div>
          <span class="ch-badge">One-Way ANOVA</span>
        </div>

        <div class="ch-body-grid">
          <div class="canvas-wrap">
            <canvas id="anova-canvas" width="600" height="320" class="ch-canvas"></canvas>
          </div>
          <div class="ch-controls-panel">
            <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:8px;">Are the group means significantly different?</label>
            <div class="detective-options">
              <button class="btn btn-secondary btn-anova" data-ans="yes" style="width:100%; margin-bottom:8px; justify-content:flex-start;">Yes, significant (p &lt; 0.05)</button>
              <button class="btn btn-secondary btn-anova" data-ans="no" style="width:100%; margin-bottom:8px; justify-content:flex-start;">No, not significant (p ≥ 0.05)</button>
            </div>
            <div id="anova-banner" class="ch-result-banner"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = stage.querySelector('#anova-canvas');
    const ctx = canvas.getContext('2d');
    const banner = stage.querySelector('#anova-banner');
    const colors = this.getThemeColors();
    const padL = 50, padR = 20, padT = 30, padB = 40;
    const w = canvas.width - padL - padR;
    const h = canvas.height - padT - padB;
    const mapY = v => padT + ((80 - v) / 50) * h;
    const mapX = gi => padL + ((gi + 0.5) / 3) * w;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colors.grid;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, canvas.height - padB);
    ctx.stroke();
    groups.forEach((g, gi) => {
      ctx.fillStyle = colors.text;
      g.forEach((v, j) => {
        ctx.beginPath();
        ctx.arc(mapX(gi) + (j - nPer / 2) * 9, mapY(v), 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = colors.success;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mapX(gi) - 70, mapY(mean(g)));
      ctx.lineTo(mapX(gi) + 70, mapY(mean(g)));
      ctx.stroke();
      ctx.fillStyle = colors.muted;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Group ${gi + 1}`, mapX(gi) - 26, canvas.height - padB + 18);
    });
    ctx.fillStyle = colors.muted;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Green lines: group means', padL, padT - 10);

    let answered = false;
    stage.querySelectorAll('.btn-anova').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        stage.querySelectorAll('.btn-anova').forEach(b => { b.disabled = true; });
        const says = btn.dataset.ans === 'yes';
        const sig = pVal < 0.05;
        const summary = `F(${d1}, ${d2}) = ${F.toFixed(2)}, exact p = ${pVal.toFixed(3)}.`;
        banner.className = 'ch-result-banner show';
        if (says === sig) {
          this.addScore('anova_judge', 40);
          banner.classList.add('success');
          banner.innerHTML = `<strong>BAM!</strong> ${summary} ${sig ? 'The between-group spread is large relative to the within-group spread.' : 'The gap between means is within the noise of the within-group spread.'} (+40 Points).`;
        } else {
          banner.classList.add('warn');
          banner.innerHTML = `<strong>Not quite.</strong> ${summary} The F ratio compares between-group variance to within-group variance. Judge the gap against the scatter inside each group.`;
        }
      });
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
      this.renderNav();
    }
  }
}
