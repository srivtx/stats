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
import { moduleDerivations } from './data/theoryDerivations.js';
import { deepContentByIndex } from './data/deepContent/index.js';
import { ThreeStudio } from './components/visualizations/threeStudio.js';
import { Interactive2D } from './components/visualizations/interactive2D.js';
import { renderVideoPlayer } from './components/videoPlayer.js';
import { renderQuiz } from './components/quizEngine.js';
import { renderCheatSheet } from './components/cheatsheet.js';
import { renderPyodideLab } from './components/pyodideRunner.js';
import { highlightCode } from './components/codeHighlight.js';
import { ChallengesLab } from './components/challenges.js';
import { watchInlineMath } from './components/mathify.js';

if (typeof window !== 'undefined') {
  window.lucide = {
    createIcons: (options) => createIcons({ icons, ...options }),
    icons
  };
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'play-circle', group: 'Learn' },
  { id: 'theory', label: 'Theory', icon: 'book-open' },
  { id: 'interactive3d', label: '3D Studio', icon: 'box', group: 'Simulate' },
  { id: 'interactive2d', label: '2D Lab', icon: 'sliders' },
  { id: 'code', label: 'Code Lab', icon: 'terminal', group: 'Practice' },
  { id: 'challenges', label: 'Challenges', icon: 'zap' },
  { id: 'quiz', label: 'Quiz', icon: 'circle-help' }
];

const THEMES = {
  'bw-dark': 'B&W Dark',
  'bw-light': 'B&W Light',
  'bw-contrast': 'High Contrast'
};

const SCENE_FOR_TYPE = {
  least_squares_line: 'lossBowl',
  regression3d: 'regression3d',
  regression_intro: 'regression3d',
  regression_deep: 'regression3d',
  r_squared: 'regression3d',
  r_regression: 'regression3d',
  multiple_r: 'regression3d',
  linear_models_anova: 'regression3d',
  mle3d: 'mle3d',
  mle_exp: 'mle3d',
  mle_binom: 'mle3d',
  mle_norm: 'mle3d',
  cov3d: 'cov3d',
  covariance: 'cov3d',
  normal3d: 'normal3d'
};

const SCENE_NAMES = {
  normal3d: '3D Gaussian bell & slicing manifold',
  regression3d: '3D multiple regression plane & residuals',
  lossBowl: '3D least squares loss paraboloid',
  mle3d: '3D maximum likelihood landscape',
  cov3d: '3D covariance ellipsoid & data cloud'
};

const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

class StatQuestApp {
  constructor() {
    this.playlist = playlistData;
    this.modules = modulesData;
    this.currentIndex = 1;
    this.activeTab = 'overview';
    this.completedVideos = new Set(JSON.parse(localStorage.getItem('statquest_completed_videos') || '[]'));
    this.currentTheme = localStorage.getItem('statquest_theme') || 'bw-dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);

    this.threeStudio = null;
    this.interactive2D = null;
    this.challengesLab = null;
    this.searchQuery = '';

    this.initDOM();
    this.initEvents();
    this.handleRoute();
    this.updateProgressUI();
  }

  renderMath(latex, displayMode = true) {
    try {
      return katex.renderToString(latex, { throwOnError: false, displayMode });
    } catch (e) {
      return `<code class="math-fallback">${escapeHtml(latex)}</code>`;
    }
  }

  renderTextWithMath(text) {
    if (!text) return '';
    let formatted = text.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => this.renderMath(tex, true));
    formatted = formatted.replace(/\$([^$]+?)\$/g, (m, tex) => this.renderMath(tex, false));
    return formatted;
  }

  getVideo(index = this.currentIndex) {
    return this.playlist.find(v => v.index === index);
  }

  getModule(moduleId) {
    return this.modules.find(m => m.id === moduleId);
  }

  getQuestions(video) {
    const deep = deepContentByIndex[video.index];
    return [...(video.quiz || []), ...((deep && deep.quiz) || [])];
  }

  initDOM() {
    const appEl = document.getElementById('app');
    const tabsHtml = TABS.map((t, i) => `
      ${t.group && i > 0 ? '<span class="tab-divider" aria-hidden="true"></span>' : ''}
      <button class="tab-btn ${t.id === this.activeTab ? 'active' : ''}" role="tab" title="${t.label}"
        id="tab-${t.id}" data-tab="${t.id}" aria-controls="content-body"
        aria-selected="${t.id === this.activeTab}" tabindex="${t.id === this.activeTab ? 0 : -1}">
        <i data-lucide="${t.icon}" aria-hidden="true"></i>
        <span class="tab-label">${t.label}</span>
        <span class="tab-count" id="tab-count-${t.id}" hidden></span>
      </button>
    `).join('');

    appEl.innerHTML = `
      <a class="skip-link" href="#content-body">Skip to lesson content</a>
      <div class="app-layout">
        <div class="sidebar-backdrop" id="sidebar-backdrop"></div>

        <aside class="sidebar" id="sidebar" aria-label="Course navigation">
          <div class="sidebar-header">
            <div class="brand-title">
              <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                <rect width="40" height="40" rx="9"/>
                <path class="brand-bell" d="M6 30 C12 30 14 9 20 9 C26 9 28 30 34 30"/>
              </svg>
              <div>
                <div class="brand-name">StatQuest</div>
                <div class="brand-sub">Statistics Fundamentals</div>
              </div>
            </div>
          </div>

          <div class="curriculum-progress-wrap">
            <div class="progress-header">
              <span>Course progress</span>
              <span id="progress-percent">0%</span>
            </div>
            <div class="progress-bar-bg" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" id="progress-track">
              <div class="progress-bar-fill" id="progress-fill"></div>
            </div>
          </div>

          <div class="search-container">
            <label class="sr-only" for="search-input">Search videos and formulas</label>
            <div class="search-input-wrap">
              <i data-lucide="search" class="search-icon" aria-hidden="true"></i>
              <input type="search" id="search-input" class="search-input" placeholder="Search videos and formulas" autocomplete="off">
            </div>
          </div>

          <nav class="sidebar-nav" id="sidebar-nav" aria-label="Modules and videos"></nav>

          <div class="sidebar-footer">
            <button class="btn btn-secondary btn-sm" id="btn-open-cheatsheet" type="button">
              <i data-lucide="book-open" aria-hidden="true"></i> Cheatsheet
            </button>
            <a href="https://github.com/srivtx/stats" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">
              <i data-lucide="external-link" aria-hidden="true"></i> Source
            </a>
          </div>
        </aside>

        <div class="main-viewport" id="main-viewport">
          <header class="top-header">
            <div class="header-left">
              <button class="menu-toggle-btn" id="menu-toggle" type="button" aria-label="Open course navigation" aria-controls="sidebar" aria-expanded="false">
                <i data-lucide="menu" aria-hidden="true"></i>
              </button>
              <div class="video-heading-wrap">
                <p class="eyebrow" id="header-eyebrow">StatQuest Statistics Fundamentals</p>
                <h1 id="header-video-title">Loading lesson…</h1>
              </div>
            </div>
            <div class="header-right">
              <button class="theme-toggle-btn" id="btn-theme-toggle" type="button" title="Cycle black and white themes">
                <i data-lucide="sun-moon" aria-hidden="true"></i>
                <span id="theme-text">${THEMES[this.currentTheme]}</span>
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-toggle-complete" type="button" aria-pressed="false">
                <i data-lucide="check-circle" id="complete-icon" aria-hidden="true"></i>
                <span id="complete-text">Mark completed</span>
              </button>
            </div>
          </header>

          <nav class="view-tabs-bar" aria-label="Lesson sections">
            <div class="tablist" role="tablist" aria-label="Lesson sections" id="view-tabs">${tabsHtml}</div>
          </nav>

          <div class="content-body" id="content-body" role="tabpanel" aria-labelledby="tab-${this.activeTab}" tabindex="-1"></div>
        </div>
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

      const isOpen = Boolean(query) || moduleVideos.some(v => v.index === this.currentIndex);
      const doneInModule = moduleVideos.filter(v => this.completedVideos.has(v.index)).length;

      return `
        <div class="module-group ${isOpen ? 'open' : ''}" data-modid="${mod.id}">
          <button class="module-header" type="button" aria-expanded="${isOpen}">
            <span class="module-title-left">
              <span class="module-number">${String(mod.number).padStart(2, '0')}</span>
              <span class="module-name">${escapeHtml(mod.title)}</span>
            </span>
            <span class="module-meta">
              <span class="module-progress">${doneInModule}/${moduleVideos.length}</span>
              <i data-lucide="chevron-right" class="module-chevron" aria-hidden="true"></i>
            </span>
          </button>
          <ul class="video-list">
            ${filteredVideos.map(v => {
              const isActive = v.index === this.currentIndex;
              const isChecked = this.completedVideos.has(v.index);
              return `
                <li>
                  <div class="video-nav-item ${isActive ? 'active' : ''}" data-index="${v.index}">
                    <a href="#video-${v.index}" class="nav-link" ${isActive ? 'aria-current="page"' : ''}>
                      <span class="nav-idx">#${v.index}</span>
                      <span class="nav-title">${escapeHtml(v.shortTitle)}</span>
                    </a>
                    <button type="button" class="nav-completed-check ${isChecked ? 'checked' : ''}" data-chkidx="${v.index}"
                      aria-label="${isChecked ? 'Unmark' : 'Mark'} #${v.index} ${escapeHtml(v.shortTitle)} as completed">
                      ${isChecked ? '<i data-lucide="check" aria-hidden="true"></i>' : ''}
                    </button>
                  </div>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `;
    }).join('');

    nav.querySelectorAll('.module-header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.module-group');
        group.classList.toggle('open');
        header.setAttribute('aria-expanded', String(group.classList.contains('open')));
        this.refreshIcons();
      });
    });

    nav.querySelectorAll('.nav-completed-check').forEach(chk => {
      chk.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleVideoCompleted(parseInt(chk.dataset.chkidx));
      });
    });

    setTimeout(() => {
      const activeEl = nav.querySelector('.video-nav-item.active');
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 50);

    this.refreshIcons();
  }

  initEvents() {
    window.addEventListener('hashchange', () => this.handleRoute());

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderSidebarNav();
    });

    const tablist = document.getElementById('view-tabs');
    tablist.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn) this.selectTab(btn.dataset.tab);
    });
    tablist.addEventListener('keydown', (e) => {
      const tabs = [...tablist.querySelectorAll('.tab-btn')];
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      let next = null;
      if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      tabs[next].focus();
      this.selectTab(tabs[next].dataset.tab);
    });

    const menuBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const setMenu = (open) => {
      sidebar.classList.toggle('mobile-open', open);
      backdrop.classList.toggle('active', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setMenu(!sidebar.classList.contains('mobile-open')));
    backdrop.addEventListener('click', () => setMenu(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    document.addEventListener('click', (e) => {
      const isNav = e.target.closest('.video-nav-item') || e.target.closest('#btn-open-cheatsheet');
      if (isNav && window.innerWidth <= 900) setMenu(false);
    });

    window.addEventListener('keydown', (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t.closest && (t.closest('input, textarea, select, [contenteditable="true"], [role="tablist"]'))) return;
      if (e.key === 'ArrowLeft' && this.currentIndex > 1) {
        window.location.hash = `#video-${this.currentIndex - 1}`;
      } else if (e.key === 'ArrowRight' && this.currentIndex < this.playlist.length) {
        window.location.hash = `#video-${this.currentIndex + 1}`;
      }
    });

    document.getElementById('btn-toggle-complete').addEventListener('click', () => {
      this.toggleVideoCompleted(this.currentIndex);
    });

    const themeBtn = document.getElementById('btn-theme-toggle');
    themeBtn.addEventListener('click', () => {
      const themeKeys = Object.keys(THEMES);
      const nextTheme = themeKeys[(themeKeys.indexOf(this.currentTheme) + 1) % themeKeys.length];
      this.currentTheme = nextTheme;
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('statquest_theme', nextTheme);
      document.getElementById('theme-text').textContent = THEMES[nextTheme];
      if (this.threeStudio && this.threeStudio.setTheme) this.threeStudio.setTheme(nextTheme);
      if (this.activeTab === 'challenges' && this.challengesLab) this.challengesLab.renderStage();
      else this.renderActiveTabContent();
      this.refreshIcons();
    });

    document.getElementById('btn-open-cheatsheet').addEventListener('click', () => this.openCheatsheet());
  }

  selectTab(tabId) {
    if (!TABS.some(t => t.id === tabId) || tabId === this.activeTab) {
      this.syncTabState();
      return;
    }
    this.activeTab = tabId;
    this.syncTabState();
    this.renderActiveTabContent();
  }

  syncTabState() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === this.activeTab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });
    const panel = document.getElementById('content-body');
    if (panel) panel.setAttribute('aria-labelledby', `tab-${this.activeTab}`);
  }

  handleRoute() {
    const hash = window.location.hash;
    if (hash === '#cheatsheet') {
      this.openCheatsheet();
      return;
    }

    const match = hash.match(/#video-(\d+)/);
    if (match) {
      const idx = parseInt(match[1]);
      if (idx >= 1 && idx <= this.playlist.length) {
        this.currentIndex = idx;
      }
    }
    this.renderCurrentVideo();
  }

  renderCurrentVideo() {
    const video = this.getVideo();
    if (!video) return;

    document.getElementById('view-tabs').closest('nav').style.display = '';

    const mod = this.getModule(video.moduleId);
    document.getElementById('header-eyebrow').textContent = `Module ${mod ? mod.number : ''} · ${mod ? mod.title : video.category}`;
    document.getElementById('header-video-title').textContent = `#${video.index} ${video.title}`;
    document.title = `#${video.index} ${video.shortTitle} · StatQuest Interactive`;

    const quizCount = document.getElementById('tab-count-quiz');
    if (quizCount) {
      quizCount.textContent = this.getQuestions(video).length;
      quizCount.hidden = false;
    }

    this.updateHeaderCompleteBtn();
    this.renderSidebarNav();
    this.renderActiveTabContent();
  }

  updateHeaderCompleteBtn() {
    const isCompleted = this.completedVideos.has(this.currentIndex);
    const btn = document.getElementById('btn-toggle-complete');
    const text = document.getElementById('complete-text');
    const icon = document.getElementById('complete-icon');
    btn.setAttribute('aria-pressed', String(isCompleted));
    btn.classList.toggle('btn-primary', isCompleted);
    btn.classList.toggle('btn-secondary', !isCompleted);
    text.textContent = isCompleted ? 'Completed' : 'Mark completed';
    if (icon) icon.setAttribute('data-lucide', isCompleted ? 'check-circle' : 'circle');
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
    const track = document.getElementById('progress-track');
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}% (${count}/${total})`;
    if (track) track.setAttribute('aria-valuenow', String(pct));
  }

  renderLessonFooter(container) {
    const prev = this.getVideo(this.currentIndex - 1);
    const next = this.getVideo(this.currentIndex + 1);

    const footer = document.createElement('nav');
    footer.className = 'lesson-nav-footer';
    footer.setAttribute('aria-label', 'Lesson navigation');
    footer.innerHTML = `
      <div class="lesson-nav-left">
        ${prev ? `
          <a href="#video-${prev.index}" class="btn btn-secondary btn-nav-prev">
            <i data-lucide="arrow-left" aria-hidden="true"></i> Previous: #${prev.index} ${escapeHtml(prev.shortTitle)}
          </a>
        ` : ''}
      </div>
      <div class="lesson-nav-right">
        ${next ? `
          <a href="#video-${next.index}" class="btn btn-primary btn-nav-next">
            Next: #${next.index} ${escapeHtml(next.shortTitle)} <i data-lucide="arrow-right" aria-hidden="true"></i>
          </a>
        ` : `
          <button class="btn btn-primary" id="btn-finish-cheatsheet" type="button">
            Finish course & open cheatsheet <i data-lucide="award" aria-hidden="true"></i>
          </button>
        `}
      </div>
    `;
    container.appendChild(footer);

    const finishBtn = footer.querySelector('#btn-finish-cheatsheet');
    if (finishBtn) finishBtn.addEventListener('click', () => this.openCheatsheet());
  }

  renderActiveTabContent() {
    const container = document.getElementById('content-body');
    const video = this.getVideo();
    if (!container || !video) return;

    if (this.threeStudio) {
      this.threeStudio.destroy();
      this.threeStudio = null;
    }
    if (this.interactive2D) {
      this.interactive2D.destroy();
      this.interactive2D = null;
    }

    if (this.mathObserver) this.mathObserver.disconnect();
    this.syncTabState();
    container.innerHTML = '';
    container.scrollTop = 0;

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
      case 'challenges':
        this.challengesLab = new ChallengesLab(container, video.moduleId);
        break;
      case 'quiz':
        this.renderQuizTab(container, video);
        break;
    }

    this.renderLessonFooter(container);
    this.mathObserver = watchInlineMath(container);
    this.refreshIcons();
  }

  renderOverviewTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'lesson-page';

    const playerBox = document.createElement('div');
    renderVideoPlayer(playerBox, video);
    wrap.appendChild(playerBox);

    const mod = this.getModule(video.moduleId);
    const deep = deepContentByIndex[video.index];
    const headline = deep ? deep.derivation.headline : null;

    wrap.insertAdjacentHTML('beforeend', `
      <div class="bam-banner">
        <span class="bam-badge-large">BAM!</span>
        <p class="bam-text">${this.renderTextWithMath(video.bamIntuition)}</p>
      </div>

      <div class="meta-strip" aria-label="Lesson facts">
        <div><span class="meta-label">Module</span><span class="meta-value">${mod ? mod.number : '—'} · ${escapeHtml(mod ? mod.title : '')}</span></div>
        <div><span class="meta-label">Video length</span><span class="meta-value">${escapeHtml(video.duration)}</span></div>
        <div><span class="meta-label">Questions</span><span class="meta-value">${this.getQuestions(video).length}</span></div>
        <div><span class="meta-label">Simulation</span><span class="meta-value">2D lab${SCENE_FOR_TYPE[video.interactiveType] ? ' + 3D studio' : ''}</span></div>
      </div>

      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="info" aria-hidden="true"></i> Summary</h2>
        <p>${this.renderTextWithMath(video.summary)}</p>
      </section>

      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="compass" aria-hidden="true"></i> The first-principles idea</h2>
        <p>${this.renderTextWithMath(video.firstPrinciples)}</p>
        ${headline ? `<p class="theory-teaser">Derivation: <strong>${this.renderTextWithMath(headline)}</strong></p>` : ''}
        <button class="btn btn-secondary btn-sm" id="btn-jump-theory" type="button">
          Open the full derivation <i data-lucide="arrow-right" aria-hidden="true"></i>
        </button>
      </section>
    `);

    container.appendChild(wrap);

    const jump = wrap.querySelector('#btn-jump-theory');
    if (jump) jump.addEventListener('click', () => this.selectTab('theory'));
  }

  renderTheoryTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'lesson-page theory-page';
    const deep = deepContentByIndex[video.index];
    const mod = this.getModule(video.moduleId);
    const moduleDeriv = moduleDerivations[video.moduleId] || moduleDerivations['module-1'];
    const d = deep ? deep.derivation : null;

    const derivationBlock = d ? `
      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="git-merge" aria-hidden="true"></i> Starting axioms</h2>
        <p class="section-lede">Everything below follows from these. If one of them fails, the conclusion can fail with it.</p>
        <ol class="axiom-list">
          ${d.axioms.map(a => `<li><div>${this.renderTextWithMath(a)}</div></li>`).join('')}
        </ol>
      </section>

      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="list-ordered" aria-hidden="true"></i> Derivation, step by step</h2>
        <ol class="derivation-steps">
          ${d.steps.map((s, i) => `
            <li class="derivation-step">
              <span class="step-num" aria-hidden="true">${i + 1}</span>
              <div>
                <h3 class="step-title">${this.renderTextWithMath(s.title)}</h3>
                <p>${this.renderTextWithMath(s.body)}</p>
              </div>
            </li>
          `).join('')}
        </ol>
      </section>

      <section class="result-box" aria-label="Key result">
        <span class="result-label">Result</span>
        <div class="result-body">${this.renderTextWithMath(d.result)}</div>
      </section>

      <section class="section-card break-card">
        <h2 class="section-heading"><i data-lucide="alert-triangle" aria-hidden="true"></i> Where the assumptions break</h2>
        <p>${this.renderTextWithMath(d.assumptionsBreak)}</p>
      </section>
    ` : `
      <section class="section-card">
        <p class="section-lede">A video-specific derivation for this lesson is still being written. The module-level derivation below covers the same ideas.</p>
      </section>
    `;

    wrap.innerHTML = `
      <header class="lesson-intro">
        <p class="eyebrow">Theory · #${video.index} · ${escapeHtml(mod ? mod.title : '')}</p>
        <h2 class="lesson-title">${escapeHtml(video.shortTitle)}</h2>
        <p class="section-lede">${this.renderTextWithMath(video.firstPrinciples)}</p>
      </header>

      ${derivationBlock}

      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="cpu" aria-hidden="true"></i> Formulas</h2>
        <div class="formulas-list">
          ${video.mathFormulas.map(f => `
            <figure class="formula-block">
              <figcaption class="formula-name">${escapeHtml(f.name)}</figcaption>
              <div class="formula-math">${this.renderMath(f.latex, true)}</div>
              <p class="formula-expl">${this.renderTextWithMath(f.explanation)}</p>
            </figure>
          `).join('')}
        </div>
      </section>

      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="hash" aria-hidden="true"></i> Worked numerical example</h2>
        <div class="numerical-box">
          <p>${this.renderTextWithMath(video.numericalExample)}</p>
        </div>
      </section>

      <section class="section-card">
        <h2 class="section-heading"><i data-lucide="alert-triangle" aria-hidden="true"></i> Common pitfalls</h2>
        <div class="pitfall-box">
          <p>${this.renderTextWithMath(video.pitfalls)}</p>
        </div>
      </section>

      <details class="section-card foundation-details">
        <summary>
          <span class="section-heading"><i data-lucide="layers" aria-hidden="true"></i> Module foundation: ${escapeHtml(moduleDeriv.title)}</span>
        </summary>
        <p class="section-lede">${this.renderTextWithMath(moduleDeriv.summary)}</p>
        <ol class="derivation-steps">
          ${moduleDeriv.steps.map(s => `
            <li class="derivation-step">
              <span class="step-num" aria-hidden="true">${s.step}</span>
              <div>
                <h3 class="step-title">${this.renderTextWithMath(s.title)}</h3>
                ${s.content.map(p => `<p>${this.renderTextWithMath(p)}</p>`).join('')}
                <div class="numerical-box foundation-example">
                  <span class="example-label">Worked example</span>
                  ${s.example.map(p => `<p>${this.renderTextWithMath(p)}</p>`).join('')}
                </div>
              </div>
            </li>
          `).join('')}
        </ol>
      </details>
    `;

    container.appendChild(wrap);
    this.refreshIcons();
  }

  renderInteractive3DTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'three-studio-card';

    const defaultMode = SCENE_FOR_TYPE[video.interactiveType] || 'normal3d';
    const exact = Boolean(SCENE_FOR_TYPE[video.interactiveType]);

    wrap.innerHTML = `
      <div class="three-toolbar">
        <div class="three-controls-row">
          <label for="three-mode-select" class="control-title">3D scene</label>
          <select id="three-mode-select" class="lab-select">
            <option value="normal3d" ${defaultMode === 'normal3d' ? 'selected' : ''}>${SCENE_NAMES.normal3d}</option>
            <option value="regression3d" ${defaultMode === 'regression3d' ? 'selected' : ''}>${SCENE_NAMES.regression3d}</option>
            <option value="lossBowl" ${defaultMode === 'lossBowl' ? 'selected' : ''}>${SCENE_NAMES.lossBowl}</option>
            <option value="mle3d" ${defaultMode === 'mle3d' ? 'selected' : ''}>${SCENE_NAMES.mle3d}</option>
            <option value="cov3d" ${defaultMode === 'cov3d' ? 'selected' : ''}>${SCENE_NAMES.cov3d}</option>
          </select>
          ${exact ? '' : '<span class="scene-note">Closest 3D scene for this topic.</span>'}
        </div>
        <div class="three-controls-row" id="three-dynamic-controls"></div>
      </div>
      <div class="three-viewport-container" id="three-viewport" role="img" aria-label="Interactive 3D scene. Drag to orbit, scroll to zoom, right-drag to pan.">
        <div class="three-instructions-overlay">
          <i data-lucide="move-3d" aria-hidden="true"></i> Drag to orbit · Scroll to zoom · Right-drag to pan
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const viewport = wrap.querySelector('#three-viewport');
    this.threeStudio = new ThreeStudio(viewport);

    const modeSelect = wrap.querySelector('#three-mode-select');
    const dynamicControls = wrap.querySelector('#three-dynamic-controls');

    const slider = (id, label, min, max, step, value, decimals = 1) => `
      <div class="control-group">
        <label for="${id}">${label} <output id="${id}-out" class="highlight-val" for="${id}">${Number(value).toFixed(decimals)}</output></label>
        <input type="range" id="${id}" min="${min}" max="${max}" value="${value}" step="${step}">
      </div>`;

    const bindSliders = (ids, decimals, onChange) => {
      const refresh = () => {
        ids.forEach(id => {
          const el = dynamicControls.querySelector(`#${id}`);
          dynamicControls.querySelector(`#${id}-out`).textContent = Number(el.value).toFixed(decimals);
        });
        onChange(Object.fromEntries(ids.map(id => [id, parseFloat(dynamicControls.querySelector(`#${id}`).value)])));
      };
      ids.forEach(id => dynamicControls.querySelector(`#${id}`).addEventListener('input', refresh));
      refresh();
    };

    const updateControlsAndRender = () => {
      const mode = modeSelect.value;
      dynamicControls.innerHTML = '';

      if (mode === 'normal3d') {
        dynamicControls.innerHTML = `
          ${slider('slider-rho', 'Correlation ρ', -0.9, 0.9, 0.1, 0.0)}
          <div class="control-group">
            <label class="check-label"><input type="checkbox" id="chk-slice"> Show slice at x</label>
            ${slider('slider-slice', 'Slice position x', -4, 4, 0.5, 0, 1)}
          </div>`;
        const chk = dynamicControls.querySelector('#chk-slice');
        const sliceEl = dynamicControls.querySelector('#slider-slice');
        const render = (v) => {
          this.threeStudio.renderNormal3D({
            muX: 0, muY: 0, sigmaX: 2.0, sigmaY: 2.0,
            rho: v['slider-rho'],
            slicePos: chk.checked ? v['slider-slice'] : null
          });
        };
        const refresh = () => {
          dynamicControls.querySelector('#slider-rho-out').textContent = parseFloat(dynamicControls.querySelector('#slider-rho').value).toFixed(1);
          sliceEl.disabled = !chk.checked;
          render({ 'slider-rho': parseFloat(dynamicControls.querySelector('#slider-rho').value), 'slider-slice': parseFloat(sliceEl.value) });
        };
        dynamicControls.querySelector('#slider-rho').addEventListener('input', refresh);
        sliceEl.addEventListener('input', refresh);
        chk.addEventListener('change', refresh);
        refresh();

      } else if (mode === 'regression3d') {
        dynamicControls.innerHTML = `
          ${slider('slider-b1', 'β₁ (X₁ slope)', -2.0, 3.0, 0.1, 1.2)}
          ${slider('slider-b2', 'β₂ (X₂ slope)', -2.0, 2.0, 0.1, -0.8)}`;
        bindSliders(['slider-b1', 'slider-b2'], 1, v => {
          this.threeStudio.renderRegression3D({ beta0: 2.0, beta1: v['slider-b1'], beta2: v['slider-b2'], showResiduals: true, showLossBowl: false });
        });

      } else if (mode === 'lossBowl') {
        dynamicControls.innerHTML = `
          ${slider('slider-b1', 'Candidate β₁', -1.0, 3.0, 0.1, 1.2)}
          ${slider('slider-b2', 'Candidate β₂', -2.0, 1.0, 0.1, -0.8)}
          <div class="control-group">
            <button id="btn-ols-solve" class="btn btn-primary btn-sm" type="button">Jump to the OLS minimum</button>
          </div>`;
        const b1 = dynamicControls.querySelector('#slider-b1');
        const b2 = dynamicControls.querySelector('#slider-b2');
        bindSliders(['slider-b1', 'slider-b2'], 1, v => {
          this.threeStudio.renderRegression3D({ beta0: 2.0, beta1: v['slider-b1'], beta2: v['slider-b2'], showResiduals: false, showLossBowl: true });
        });
        dynamicControls.querySelector('#btn-ols-solve').addEventListener('click', () => {
          b1.value = 1.2;
          b2.value = -0.8;
          b1.dispatchEvent(new Event('input'));
        });

      } else if (mode === 'mle3d') {
        dynamicControls.innerHTML = `
          ${slider('slider-mle-mu', 'Candidate μ', -2.0, 2.0, 0.1, 0.0)}
          ${slider('slider-mle-sig', 'Candidate σ', 0.6, 3.0, 0.1, 1.5)}`;
        bindSliders(['slider-mle-mu', 'slider-mle-sig'], 1, v => {
          this.threeStudio.renderMLE3D({ candidateMu: v['slider-mle-mu'], candidateSigma: v['slider-mle-sig'] });
        });

      } else if (mode === 'cov3d') {
        dynamicControls.innerHTML = `
          ${slider('slider-cov', 'Correlation ρ_XY', -0.95, 0.95, 0.05, 0.70, 2)}`;
        bindSliders(['slider-cov'], 2, v => {
          this.threeStudio.renderCovariance3D({ rhoXY: v['slider-cov'], rhoXZ: 0.3, rhoYZ: 0.2 });
        });
      }
      this.refreshIcons();
    };

    modeSelect.addEventListener('change', updateControlsAndRender);
    updateControlsAndRender();
  }

  renderInteractive2DTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'lab-page';
    container.appendChild(wrap);
    this.interactive2D = new Interactive2D(wrap, video.interactiveType);
  }

  renderCodeTab(container, video) {
    const wrap = document.createElement('div');
    wrap.className = 'code-tabs-wrapper';

    wrap.innerHTML = `
      <div class="segmented" role="group" aria-label="Choose language">
        <button class="segment code-switch-btn active" data-lang="python" type="button" aria-pressed="true">
          <i data-lucide="terminal" aria-hidden="true"></i> Python · Pyodide
        </button>
        <button class="segment code-switch-btn" data-lang="r" type="button" aria-pressed="false">
          <i data-lucide="code" aria-hidden="true"></i> R
        </button>
      </div>
      <div id="code-panel-mount"></div>
    `;

    container.appendChild(wrap);

    const mount = wrap.querySelector('#code-panel-mount');
    const switchBtns = wrap.querySelectorAll('.code-switch-btn');

    const renderMode = (lang) => {
      switchBtns.forEach(btn => {
        const on = btn.dataset.lang === lang;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', String(on));
      });

      mount.innerHTML = '';
      if (lang === 'python') {
        renderPyodideLab(mount, video);
      } else {
        const rBox = document.createElement('div');
        rBox.className = 'section-card';
        rBox.innerHTML = `
          <div class="code-card-head">
            <div class="code-card-title">
              <span class="badge badge-primary">R 4.x</span>
              <strong>R statistical implementation</strong>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-copy-r-code" type="button">
              <i data-lucide="copy" aria-hidden="true"></i> Copy R script
            </button>
          </div>
          <pre class="code-block" tabindex="0" aria-label="R code"><code>${highlightCode(video.rCode, 'r')}</code></pre>
        `;
        mount.appendChild(rBox);

        const copyBtn = rBox.querySelector('#btn-copy-r-code');
        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(video.rCode);
            copyBtn.innerHTML = `<i data-lucide="check" aria-hidden="true"></i> Copied`;
            setTimeout(() => {
              copyBtn.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i> Copy R script`;
              this.refreshIcons();
            }, 1800);
          } catch (err) {
            console.error('Clipboard copy error:', err);
          }
        });
      }
      this.refreshIcons();
    };

    switchBtns.forEach(b => b.addEventListener('click', () => renderMode(b.dataset.lang)));
    renderMode('python');
  }

  renderQuizTab(container, video) {
    const wrap = document.createElement('div');
    container.appendChild(wrap);
    renderQuiz(wrap, this.getQuestions(video), video.id, (qIdx, isCorrect) => {
      if (isCorrect) {
        this.completedVideos.add(video.index);
        localStorage.setItem('statquest_completed_videos', JSON.stringify([...this.completedVideos]));
        this.updateProgressUI();
        this.updateHeaderCompleteBtn();
        this.renderSidebarNav();
      }
    });
  }

  openCheatsheet() {
    const container = document.getElementById('content-body');
    if (!container) return;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
    });
    document.getElementById('header-eyebrow').textContent = 'Reference';
    document.getElementById('header-video-title').textContent = 'Statistics cheatsheet';
    document.title = 'Cheatsheet · StatQuest Interactive';
    container.innerHTML = '';
    renderCheatSheet(container);
    this.refreshIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new StatQuestApp();
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.error('Service worker registration failed:', err));
  }
});
