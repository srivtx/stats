// src/main.js
/**
 * StatQuest Statistics Fundamentals Interactive Platform
 * Main Application Orchestrator
 */

import 'katex/dist/katex.min.css';
import katex from 'katex';
import { createIcons, icons } from 'lucide';

import { modulesData } from './data/modulesData.js';
import { playlistData } from './data/playlistData.js';
import { ThreeStudio } from './components/visualizations/threeStudio.js';
import { Interactive2D } from './components/visualizations/interactive2D.js';
import { renderVideoPlayer } from './components/videoPlayer.js';
import { renderQuiz } from './components/quizEngine.js';
import { renderCheatSheet } from './components/cheatsheet.js';

class StatQuestApp {
  constructor() {
    this.playlist = playlistData;
    this.modules = modulesData;
    this.currentIndex = 1;
    this.activeTab = 'overview';
    this.completedVideos = new Set(JSON.parse(localStorage.getItem('statquest_completed_videos') || '[]'));

    this.threeStudio = null;
    this.interactive2D = null;
    this.searchQuery = '';

    this.initDOM();
    this.initEvents();
    this.handleRoute();
    this.updateProgressUI();
  }

  // Helper for KaTeX LaTeX rendering
  renderMath(latex, displayMode = true) {
    try {
      return katex.renderToString(latex, { throwOnError: false, displayMode });
    } catch (e) {
      return `<code class="math-fallback">${latex}</code>`;
    }
  }

  // Parse inline math $...$ in markdown text
  renderTextWithMath(text) {
    if (!text) return '';
    // Replace $$...$$ with display math
    let formatted = text.replace(/\$\$(.+?)\$\$/g, (m, tex) => this.renderMath(tex, true));
    // Replace $...$ with inline math
    formatted = formatted.replace(/\$(.+?)\$/g, (m, tex) => this.renderMath(tex, false));
    return formatted;
  }

  initDOM() {
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
      <div class="app-layout">
        <!-- Sidebar Navigation -->
        <aside class="sidebar" id="sidebar">
          <div class="sidebar-header">
            <div class="brand-title">
              <div class="brand-icon">SQ</div>
              <span>StatQuest Interactive</span>
            </div>
            <span class="bam-tag">BAM!</span>
          </div>

          <!-- Progress Header -->
          <div class="curriculum-progress-wrap">
            <div class="progress-header">
              <span>Course Progress</span>
              <span id="progress-percent">0%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" id="progress-fill"></div>
            </div>
          </div>

          <!-- Search Filter -->
          <div class="search-container">
            <div class="search-input-wrap">
              <i data-lucide="search" class="search-icon"></i>
              <input type="text" id="search-input" class="search-input" placeholder="Search 62 videos, formulas...">
            </div>
          </div>

          <!-- Module Tree -->
          <nav class="sidebar-nav" id="sidebar-nav"></nav>

          <!-- Sidebar Footer -->
          <div class="sidebar-footer">
            <button class="btn btn-secondary btn-sm" id="btn-open-cheatsheet" style="flex: 1;">
              <i data-lucide="book-open"></i> Cheatsheet
            </button>
            <a href="https://github.com/srivtx/stats" target="_blank" class="btn btn-ghost btn-sm" title="View Source on GitHub">
              <i data-lucide="github"></i>
            </a>
          </div>
        </aside>

        <!-- Main Viewport -->
        <main class="main-viewport" id="main-viewport">
          <!-- Top App Bar -->
          <header class="top-header">
            <div class="header-left">
              <button class="menu-toggle-btn" id="menu-toggle" aria-label="Toggle Navigation">
                <i data-lucide="menu"></i>
              </button>
              <div class="video-heading-wrap">
                <h1 id="header-video-title">StatQuest Statistics Fundamentals</h1>
              </div>
            </div>
            <div class="header-right">
              <button class="btn btn-secondary btn-sm" id="btn-toggle-complete">
                <i data-lucide="check-circle" id="complete-icon"></i>
                <span id="complete-text">Mark Completed</span>
              </button>
            </div>
          </header>

          <!-- Navigation Tabs Bar -->
          <div class="view-tabs-bar" id="view-tabs">
            <button class="tab-btn active" data-tab="overview">
              <i data-lucide="play-circle"></i> Overview & Video
            </button>
            <button class="tab-btn" data-tab="theory">
              <i data-lucide="file-text"></i> First-Principles Theory
            </button>
            <button class="tab-btn" data-tab="interactive3d">
              <i data-lucide="box"></i> 3D Spatial Studio
            </button>
            <button class="tab-btn" data-tab="interactive2d">
              <i data-lucide="sliders"></i> 2D Simulation Lab
            </button>
            <button class="tab-btn" data-tab="code">
              <i data-lucide="code"></i> Python & R
            </button>
            <button class="tab-btn" data-tab="quiz">
              <i data-lucide="help-circle"></i> Knowledge Check
            </button>
          </div>

          <!-- Body Content Area -->
          <div class="content-body" id="content-body"></div>
        </main>
      </div>
    `;

    this.renderSidebarNav();
    this.refreshIcons();
  }

  refreshIcons() {
    createIcons({ icons });
  }

  renderSidebarNav() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    const query = this.searchQuery.toLowerCase().trim();

    nav.innerHTML = this.modules.map(mod => {
      // Find matching videos for this module
      const moduleVideos = this.playlist.filter(v => v.moduleId === mod.id);
      const filteredVideos = moduleVideos.filter(v => {
        if (!query) return true;
        return (
          v.title.toLowerCase().includes(query) ||
          v.summary.toLowerCase().includes(query) ||
          v.shortTitle.toLowerCase().includes(query) ||
          v.firstPrinciples.toLowerCase().includes(query)
        );
      });

      if (query && filteredVideos.length === 0) return '';

      const isOpen = query || moduleVideos.some(v => v.index === this.currentIndex);

      return `
        <div class="module-group ${isOpen ? 'open' : ''}" data-modid="${mod.id}">
          <div class="module-header">
            <div class="module-title-left">
              <span class="module-dot" style="background-color: ${mod.color};"></span>
              <span>Mod ${mod.number}: ${mod.title}</span>
            </div>
            <i data-lucide="chevron-right" class="module-chevron"></i>
          </div>
          <div class="video-list">
            ${filteredVideos.map(v => {
              const isActive = v.index === this.currentIndex;
              const isChecked = this.completedVideos.has(v.index);
              return `
                <a href="#video-${v.index}" class="video-nav-item ${isActive ? 'active' : ''}" data-index="${v.index}">
                  <div class="nav-item-left">
                    <span class="nav-idx">#${v.index}</span>
                    <span class="nav-title">${v.shortTitle}</span>
                  </div>
                  <div class="nav-completed-check ${isChecked ? 'checked' : ''}" data-chkidx="${v.index}" title="Mark learned">
                    ${isChecked ? '✓' : ''}
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Module collapse toggles
    nav.querySelectorAll('.module-header').forEach(header => {
      header.addEventListener('click', () => {
        header.closest('.module-group').classList.toggle('open');
        this.refreshIcons();
      });
    });

    // Checkbox toggles in sidebar
    nav.querySelectorAll('.nav-completed-check').forEach(chk => {
      chk.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(chk.dataset.chkidx);
        this.toggleVideoCompleted(idx);
      });
    });

    this.refreshIcons();
  }

  initEvents() {
    // Window hash routing
    window.addEventListener('hashchange', () => this.handleRoute());

    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderSidebarNav();
    });

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.dataset.tab;
        this.renderActiveTabContent();
      });
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Top Header Complete Button
    const completeBtn = document.getElementById('btn-toggle-complete');
    completeBtn.addEventListener('click', () => {
      this.toggleVideoCompleted(this.currentIndex);
    });

    // Cheatsheet modal / tab
    document.getElementById('btn-open-cheatsheet').addEventListener('click', () => {
      this.openCheatsheet();
    });
  }

  handleRoute() {
    const hash = window.location.hash;
    const match = hash.match(/#video-(\d+)/);
    if (match) {
      const idx = parseInt(match[1]);
      if (idx >= 1 && idx <= 62) {
        this.currentIndex = idx;
      }
    }
    this.renderCurrentVideo();
  }

  renderCurrentVideo() {
    const video = this.playlist.find(v => v.index === this.currentIndex);
    if (!video) return;

    // Update Header
    document.getElementById('header-video-title').textContent = `#${video.index}. ${video.title}`;
    document.title = `#${video.index} ${video.shortTitle} - StatQuest Interactive`;

    // Update complete button status
    this.updateHeaderCompleteBtn();

    // Re-render sidebar active highlight
    this.renderSidebarNav();

    // Render active tab view
    this.renderActiveTabContent();
  }

  updateHeaderCompleteBtn() {
    const isCompleted = this.completedVideos.has(this.currentIndex);
    const completeBtn = document.getElementById('btn-toggle-complete');
    const completeText = document.getElementById('complete-text');
    if (isCompleted) {
      completeBtn.classList.remove('btn-secondary');
      completeBtn.classList.add('btn-primary');
      completeText.textContent = 'Completed ✓';
    } else {
      completeBtn.classList.remove('btn-primary');
      completeBtn.classList.add('btn-secondary');
      completeText.textContent = 'Mark Completed';
    }
  }

  toggleVideoCompleted(idx) {
    if (this.completedVideos.has(idx)) {
      this.completedVideos.delete(idx);
    } else {
      this.completedVideos.add(idx);
    }
    localStorage.setItem('statquest_completed_videos', JSON.stringify([...this.completedVideos]));
    this.updateProgressUI();
    this.updateHeaderCompleteBtn();
    this.renderSidebarNav();
  }

  updateProgressUI() {
    const count = this.completedVideos.size;
    const total = this.playlist.length;
    const pct = Math.round((count / total) * 100);

    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-percent');
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}% (${count}/${total})`;
  }

  renderActiveTabContent() {
    const container = document.getElementById('content-body');
    const video = this.playlist.find(v => v.index === this.currentIndex);
    if (!container || !video) return;

    // Cleanup previous interactive instances
    if (this.threeStudio) {
      this.threeStudio.destroy();
      this.threeStudio = null;
    }
    if (this.interactive2D) {
      this.interactive2D.destroy();
      this.interactive2D = null;
    }

    container.innerHTML = '';

    switch (this.activeTab) {
      case 'overview':
        this.renderOverviewTab(container, video);
        break;
      case 'theory':
        this.renderTheoryTab(container, video);
        break;
      case 'interactive3d':
        this.renderInteractive3DTab(container, video);
        break;
      case 'interactive2d':
        this.renderInteractive2DTab(container, video);
        break;
      case 'code':
        this.renderCodeTab(container, video);
        break;
      case 'quiz':
        this.renderQuizTab(container, video);
        break;
    }

    this.refreshIcons();
  }

  // ==========================================
  // TAB 1: OVERVIEW & VIDEO
  // ==========================================
  renderOverviewTab(container, video) {
    const wrap = document.createElement('div');

    // Video Player
    const playerBox = document.createElement('div');
    renderVideoPlayer(playerBox, video);
    wrap.appendChild(playerBox);

    // BAM Banner
    wrap.innerHTML += `
      <div class="bam-banner">
        <span class="bam-badge-large">BAM!</span>
        <div class="bam-text">
          <p>${video.bamIntuition}</p>
        </div>
      </div>

      <div class="section-card">
        <h3><i data-lucide="info"></i> Executive Summary</h3>
        <p>${video.summary}</p>
      </div>

      <div class="section-card">
        <h3><i data-lucide="compass"></i> Why This Matters</h3>
        <p>${this.renderTextWithMath(video.firstPrinciples.slice(0, 300))}...</p>
        <button class="btn btn-secondary btn-sm" id="btn-jump-theory">
          Read Complete First-Principles Mathematical Derivation →
        </button>
      </div>
    `;

    container.appendChild(wrap);

    const jumpTheory = wrap.querySelector('#btn-jump-theory');
    if (jumpTheory) {
      jumpTheory.addEventListener('click', () => {
        document.querySelector('[data-tab="theory"]').click();
      });
    }
  }

  // ==========================================
  // TAB 2: FIRST-PRINCIPLES THEORY
  // ==========================================
  renderTheoryTab(container, video) {
    const wrap = document.createElement('div');

    wrap.innerHTML = `
      <div class="bam-banner">
        <span class="bam-badge-large">BAM!</span>
        <div class="bam-text">
          <p>${video.bamIntuition}</p>
        </div>
      </div>

      <div class="section-card">
        <h3><i data-lucide="book-open"></i> First-Principles Mathematical Foundation</h3>
        <p>${this.renderTextWithMath(video.firstPrinciples)}</p>
      </div>

      <div class="section-card">
        <h3><i data-lucide="cpu"></i> Mathematical Formulation & Formulas</h3>
        <div class="formulas-list">
          ${video.mathFormulas.map(f => `
            <div class="formula-block">
              <div class="formula-name">${f.name}</div>
              <div class="formula-math">${this.renderMath(f.latex, true)}</div>
              <div class="formula-expl">${this.renderTextWithMath(f.explanation)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section-card">
        <h3><i data-lucide="hash"></i> Step-by-Step Worked Numerical Walkthrough</h3>
        <div class="numerical-box">
          <p>${this.renderTextWithMath(video.numericalExample)}</p>
        </div>
      </div>

      <div class="section-card">
        <h3><i data-lucide="alert-triangle"></i> Common Pitfalls & Traps</h3>
        <div class="pitfall-box">
          <p>${this.renderTextWithMath(video.pitfalls)}</p>
        </div>
      </div>
    `;

    container.appendChild(wrap);
  }

  // ==========================================
  // TAB 3: 3D SPATIAL STUDIO
  // ==========================================
  renderInteractive3DTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'three-studio-card';

    // Decide initial 3D mode
    let defaultMode = 'normal3d';
    if (['regression3d', 'r_squared', 'regression_intro', 'least_squares_line', 'multiple_r', 'linear_models_anova'].includes(video.interactiveType)) {
      defaultMode = 'regression3d';
    } else if (['mle3d', 'mle_exp', 'mle_binom', 'mle_norm'].includes(video.interactiveType)) {
      defaultMode = 'mle3d';
    } else if (['cov3d', 'covariance'].includes(video.interactiveType)) {
      defaultMode = 'cov3d';
    }

    wrap.innerHTML = `
      <div class="three-toolbar">
        <div class="three-controls-row">
          <label style="font-weight: 600; font-size: 0.88rem;">3D Spatial Scene:</label>
          <select id="three-mode-select" class="lab-select">
            <option value="normal3d" ${defaultMode === 'normal3d' ? 'selected' : ''}>3D Gaussian Bell & Slicing Manifold</option>
            <option value="regression3d" ${defaultMode === 'regression3d' ? 'selected' : ''}>3D Multiple Regression Plane & Residuals</option>
            <option value="lossBowl" ${defaultMode === 'lossBowl' ? 'selected' : ''}>3D Least Squares Loss Paraboloid (Bowl)</option>
            <option value="mle3d" ${defaultMode === 'mle3d' ? 'selected' : ''}>3D Maximum Likelihood Landscape</option>
            <option value="cov3d" ${defaultMode === 'cov3d' ? 'selected' : ''}>3D Covariance Ellipsoid & Data Cloud</option>
          </select>
        </div>
        <div class="three-controls-row" id="three-dynamic-controls"></div>
      </div>
      <div class="three-viewport-container" id="three-viewport">
        <div class="three-instructions-overlay">
          <i data-lucide="move-3d"></i> Click & Drag to Orbit Camera | Scroll to Zoom | Right Click to Pan
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const viewport = wrap.querySelector('#three-viewport');
    this.threeStudio = new ThreeStudio(viewport);

    const modeSelect = wrap.querySelector('#three-mode-select');
    const dynamicControls = wrap.querySelector('#three-dynamic-controls');

    const updateControlsAndRender = () => {
      const mode = modeSelect.value;
      dynamicControls.innerHTML = '';

      if (mode === 'normal3d') {
        dynamicControls.innerHTML = `
          <div class="control-group">
            <label>\\(\\rho\\) (Corr): <span id="val-rho" class="highlight-val">0.0</span></label>
            <input type="range" id="slider-rho" min="-0.9" max="0.9" value="0.0" step="0.1">
          </div>
          <div class="control-group">
            <label>Slice X: <span id="val-slice" class="highlight-val">Off</span></label>
            <input type="range" id="slider-slice" min="-4" max="4" value="0" step="0.5">
            <input type="checkbox" id="chk-slice">
          </div>
        `;
        const sRho = dynamicControls.querySelector('#slider-rho');
        const vRho = dynamicControls.querySelector('#val-rho');
        const sSlice = dynamicControls.querySelector('#slider-slice');
        const vSlice = dynamicControls.querySelector('#val-slice');
        const chkSlice = dynamicControls.querySelector('#chk-slice');

        const refreshNormal = () => {
          const rho = parseFloat(sRho.value);
          vRho.textContent = rho.toFixed(1);
          const slicePos = chkSlice.checked ? parseFloat(sSlice.value) : null;
          vSlice.textContent = chkSlice.checked ? sSlice.value : 'Off';
          this.threeStudio.renderNormal3D({ muX: 0, muY: 0, sigmaX: 2.0, sigmaY: 2.0, rho, slicePos });
        };

        sRho.addEventListener('input', refreshNormal);
        sSlice.addEventListener('input', refreshNormal);
        chkSlice.addEventListener('change', refreshNormal);
        refreshNormal();

      } else if (mode === 'regression3d') {
        dynamicControls.innerHTML = `
          <div class="control-group">
            <label>\\(\\beta_1\\) (X1 Slope): <span id="val-b1" class="highlight-val">1.2</span></label>
            <input type="range" id="slider-b1" min="-2.0" max="3.0" value="1.2" step="0.1">
          </div>
          <div class="control-group">
            <label>\\(\\beta_2\\) (X2 Slope): <span id="val-b2" class="highlight-val">-0.8</span></label>
            <input type="range" id="slider-b2" min="-2.0" max="2.0" value="-0.8" step="0.1">
          </div>
        `;
        const sB1 = dynamicControls.querySelector('#slider-b1');
        const sB2 = dynamicControls.querySelector('#slider-b2');
        const vB1 = dynamicControls.querySelector('#val-b1');
        const vB2 = dynamicControls.querySelector('#val-b2');

        const refreshReg = () => {
          const b1 = parseFloat(sB1.value);
          const b2 = parseFloat(sB2.value);
          vB1.textContent = b1.toFixed(1);
          vB2.textContent = b2.toFixed(1);
          this.threeStudio.renderRegression3D({ beta0: 2.0, beta1: b1, beta2: b2, showResiduals: true, showLossBowl: false });
        };

        sB1.addEventListener('input', refreshReg);
        sB2.addEventListener('input', refreshReg);
        refreshReg();

      } else if (mode === 'lossBowl') {
        dynamicControls.innerHTML = `
          <div class="control-group">
            <label>Candidate \\(\\beta_1\\): <span id="val-b1" class="highlight-val">1.2</span></label>
            <input type="range" id="slider-b1" min="-1.0" max="3.0" value="1.2" step="0.1">
          </div>
          <div class="control-group">
            <button id="btn-ols-solve" class="btn btn-primary btn-sm">Solve Global Minimum</button>
          </div>
        `;
        const sB1 = dynamicControls.querySelector('#slider-b1');
        const vB1 = dynamicControls.querySelector('#val-b1');
        const btnSolve = dynamicControls.querySelector('#btn-ols-solve');

        const refreshLoss = (b1Val) => {
          vB1.textContent = b1Val.toFixed(1);
          this.threeStudio.renderRegression3D({ beta0: 2.0, beta1: b1Val, beta2: -0.8, showResiduals: false, showLossBowl: true });
        };

        sB1.addEventListener('input', () => refreshLoss(parseFloat(sB1.value)));
        btnSolve.addEventListener('click', () => {
          sB1.value = 1.2;
          refreshLoss(1.2);
        });
        refreshLoss(parseFloat(sB1.value));

      } else if (mode === 'mle3d') {
        dynamicControls.innerHTML = `
          <div class="control-group">
            <label>Candidate \\(\\mu\\): <span id="val-mle-mu" class="highlight-val">0.0</span></label>
            <input type="range" id="slider-mle-mu" min="-2.0" max="2.0" value="0.0" step="0.1">
          </div>
          <div class="control-group">
            <label>Candidate \\(\\sigma\\): <span id="val-mle-sig" class="highlight-val">1.5</span></label>
            <input type="range" id="slider-mle-sig" min="0.6" max="3.0" value="1.5" step="0.1">
          </div>
        `;
        const sMu = dynamicControls.querySelector('#slider-mle-mu');
        const sSig = dynamicControls.querySelector('#slider-mle-sig');
        const vMu = dynamicControls.querySelector('#val-mle-mu');
        const vSig = dynamicControls.querySelector('#val-mle-sig');

        const refreshMLE = () => {
          const mu = parseFloat(sMu.value);
          const sig = parseFloat(sSig.value);
          vMu.textContent = mu.toFixed(1);
          vSig.textContent = sig.toFixed(1);
          this.threeStudio.renderMLE3D({ candidateMu: mu, candidateSigma: sig });
        };

        sMu.addEventListener('input', refreshMLE);
        sSig.addEventListener('input', refreshMLE);
        refreshMLE();

      } else if (mode === 'cov3d') {
        dynamicControls.innerHTML = `
          <div class="control-group">
            <label>Correlation \\(\\rho_{XY}\\): <span id="val-cov" class="highlight-val">0.70</span></label>
            <input type="range" id="slider-cov" min="-0.95" max="0.95" value="0.70" step="0.05">
          </div>
        `;
        const sCov = dynamicControls.querySelector('#slider-cov');
        const vCov = dynamicControls.querySelector('#val-cov');

        const refreshCov = () => {
          const r = parseFloat(sCov.value);
          vCov.textContent = r.toFixed(2);
          this.threeStudio.renderCovariance3D({ rhoXY: r, rhoXZ: 0.3, rhoYZ: 0.2 });
        };

        sCov.addEventListener('input', refreshCov);
        refreshCov();
      }
    };

    modeSelect.addEventListener('change', updateControlsAndRender);
    updateControlsAndRender();
  }

  // ==========================================
  // TAB 4: 2D SIMULATION LAB
  // ==========================================
  renderInteractive2DTab(container, video) {
    const wrap = document.createElement('div');
    container.appendChild(wrap);
    this.interactive2D = new Interactive2D(wrap, video.interactiveType);
  }

  // ==========================================
  // TAB 5: PYTHON & R CODE
  // ==========================================
  renderCodeTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'code-tabs-container';

    wrap.innerHTML = `
      <div class="code-tabs-header">
        <div class="code-tabs-left">
          <button class="code-tab-btn active" data-lang="python">Python (NumPy / SciPy)</button>
          <button class="code-tab-btn" data-lang="r">R (Base / Stats)</button>
        </div>
        <button class="btn btn-ghost btn-sm" id="btn-copy-code">
          <i data-lucide="copy"></i> Copy Code
        </button>
      </div>
      <div class="code-body">
        <pre class="code-block-pre"><code id="code-display">${video.pythonCode}</code></pre>
      </div>
    `;

    container.appendChild(wrap);

    const display = wrap.querySelector('#code-display');
    const copyBtn = wrap.querySelector('#btn-copy-code');
    const tabs = wrap.querySelectorAll('.code-tab-btn');

    let currentCode = video.pythonCode;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (tab.dataset.lang === 'python') {
          currentCode = video.pythonCode;
          display.textContent = video.pythonCode;
        } else {
          currentCode = video.rCode;
          display.textContent = video.rCode;
        }
      });
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(currentCode);
        copyBtn.innerHTML = `<i data-lucide="check"></i> Copied!`;
        setTimeout(() => {
          copyBtn.innerHTML = `<i data-lucide="copy"></i> Copy Code`;
          this.refreshIcons();
        }, 2000);
      } catch (err) {
        console.error('Clipboard copy error:', err);
      }
    });
  }

  // ==========================================
  // TAB 6: QUIZ & SELF-CHECK
  // ==========================================
  renderQuizTab(container, video) {
    const wrap = document.createElement('div');
    container.appendChild(wrap);
    renderQuiz(wrap, video.quiz, video.id, (qIdx, isCorrect) => {
      if (isCorrect) {
        // If all questions answered, auto-mark completed!
        this.completedVideos.add(video.index);
        localStorage.setItem('statquest_completed_videos', JSON.stringify([...this.completedVideos]));
        this.updateProgressUI();
        this.updateHeaderCompleteBtn();
        this.renderSidebarNav();
      }
    });
  }

  // Cheatsheet View
  openCheatsheet() {
    const container = document.getElementById('content-body');
    if (!container) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.innerHTML = '';
    renderCheatSheet(container);
    this.refreshIcons();
  }
}

// Bootstrap on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new StatQuestApp();
});
