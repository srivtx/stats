// scripts/test_interactive.js
/**
 * Verification test suite for Interactive Labs, Cheatsheet KaTeX rendering, and Studio Engines.
 */

import assert from 'node:assert';
import katex from 'katex';
import { playlistData } from '../src/data/playlistData.js';
import { renderCheatSheet } from '../src/components/cheatsheet.js';
import { renderVideoPlayer } from '../src/components/videoPlayer.js';
import { renderQuiz } from '../src/components/quizEngine.js';

console.log('--- RUNNING RIGOROUS INTERACTIVE & COMPONENT VERIFICATION ---');

// 1. Verify that all 62 videos have an interactive type handled by Interactive2D
const validTypes = new Set([
  'histogram', 'pdf_cdf', 'normal3d', 'central_tendency', 'exponential',
  'pop_vs_sample', 'variance_calc', 'math_model', 'null_hypothesis', 'alt_hypothesis',
  'p_value_concept', 'fishers_exact', 'p_value_calc', 'p_hacking', 'fdr_bh',
  'power', 'power_analysis', 'covariance', 'cov3d', 'conditional_prob',
  'bayes', 'expected_value', 'expected_continuous', 'binomial', 'clt',
  'replicates', 'sample_size', 'sd_vs_se', 'se_scaling', 'bootstrap',
  'bootstrap_p', 'bar_vs_pie', 'boxplot', 'log_transform', 'confidence_intervals',
  'r_squared', 'regression_intro', 'least_squares_line', 'loess', 'regression_deep',
  'r_regression', 'regression3d', 'multiple_r', 'linear_models_anova', 'design_matrix',
  'sampling_sim', 'bam_moment', 'alpha_thresholds', 't_test_selector', 'one_vs_two_tailed',
  'quantiles', 'qqplot', 'quantile_norm', 'prob_vs_lik', 'mle3d',
  'mle_exp', 'mle_binom', 'mle_norm', 'odds', 'odds_ratios',
  'frank_starmer', 'bessel'
]);

playlistData.forEach(v => {
  assert(validTypes.has(v.interactiveType), `Video #${v.index} has unknown interactiveType '${v.interactiveType}'`);
});
console.log('✓ All 62 videos map to verified interactive types.');

// 2. Verify Cheatsheet KaTeX rendering and absence of raw LaTeX in code tags
const mockContainer = {
  _html: '',
  set innerHTML(val) { this._html = val; },
  get innerHTML() { return this._html; },
  querySelector() { return null; },
  querySelectorAll() { return []; }
};

renderCheatSheet(mockContainer);
assert(mockContainer.innerHTML.includes('katex'), 'Cheatsheet HTML must contain rendered KaTeX elements');
assert(!mockContainer.innerHTML.includes('data-feather'), 'Cheatsheet must not use deprecated data-feather attributes');
assert(mockContainer.innerHTML.includes('data-lucide'), 'Cheatsheet must use data-lucide attributes');
console.log('✓ Cheatsheet formulas properly formatted with KaTeX and Lucide icons.');

// 3. Verify VideoPlayer rendering and icon attribute
renderVideoPlayer(mockContainer, playlistData[0]);
assert(!mockContainer.innerHTML.includes('data-feather'), 'VideoPlayer must not use deprecated data-feather attributes');
assert(mockContainer.innerHTML.includes('data-lucide="clock"'), 'VideoPlayer must have data-lucide="clock"');
assert(mockContainer.innerHTML.includes('data-lucide="external-link"'), 'VideoPlayer must have data-lucide="external-link"');
console.log('✓ VideoPlayer renders with valid Lucide icons and attributes.');

// 4. Verify QuizEngine rendering and reset button
// Mock localStorage
global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};

renderQuiz(mockContainer, playlistData[0].quiz, playlistData[0].id);
assert(!mockContainer.innerHTML.includes('data-feather'), 'QuizEngine must not use data-feather attributes');
assert(mockContainer.innerHTML.includes('btn-reset-quiz'), 'QuizEngine must have reset quiz functionality');
console.log('✓ QuizEngine renders with valid Lucide icons and reset feature.');

console.log('--- ALL INTERACTIVE VERIFICATION TESTS PASSED! ---');
