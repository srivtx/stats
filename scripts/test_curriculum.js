// scripts/test_curriculum.js
/**
 * Rigorous Verification Suite for StatQuest Statistics Curriculum
 */

import assert from 'node:assert';
import katex from 'katex';
import { modulesData } from '../src/data/modulesData.js';
import { playlistData } from '../src/data/playlistData.js';

console.log('--- RUNNING RIGOROUS TEST SUITE ---');

// 1. Verify Video Count
assert.strictEqual(playlistData.length, 62, `Expected 62 videos, got ${playlistData.length}`);
console.log('✓ Video count is exactly 62.');

// 2. Verify Module Count
assert.strictEqual(modulesData.length, 11, `Expected 11 modules, got ${modulesData.length}`);
console.log('✓ Module count is exactly 11.');

// 3. Verify Video Indices and Uniqueness
const seenIndices = new Set();
const seenIds = new Set();
const moduleIds = new Set(modulesData.map(m => m.id));

const validInteractiveTypes = new Set([
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

let totalFormulas = 0;
let totalQuizzes = 0;

playlistData.forEach((v, idx) => {
  assert.strictEqual(v.index, idx + 1, `Video index mismatch at ${idx}: expected ${idx + 1}, got ${v.index}`);
  assert(!seenIndices.has(v.index), `Duplicate index: ${v.index}`);
  seenIndices.add(v.index);

  assert(!seenIds.has(v.id), `Duplicate videoId: ${v.id}`);
  seenIds.add(v.id);

  // Check required non-empty string fields
  ['title', 'shortTitle', 'moduleId', 'category', 'summary', 'bamIntuition', 'firstPrinciples', 'numericalExample', 'pythonCode', 'rCode', 'pitfalls', 'interactiveType'].forEach(field => {
    assert(typeof v[field] === 'string' && v[field].trim().length > 0, `Video #${v.index} missing or empty field '${field}'`);
  });

  // Check Module linkage
  assert(moduleIds.has(v.moduleId), `Video #${v.index} has unknown moduleId '${v.moduleId}'`);

  // Check interactiveType validity
  assert(validInteractiveTypes.has(v.interactiveType), `Video #${v.index} has unknown interactiveType '${v.interactiveType}'`);

  // Check Math Formulas and KaTeX validity
  assert(Array.isArray(v.mathFormulas) && v.mathFormulas.length > 0, `Video #${v.index} has no mathFormulas`);
  v.mathFormulas.forEach((f, fIdx) => {
    totalFormulas++;
    assert(f.name && f.latex && f.explanation, `Video #${v.index} formula ${fIdx} incomplete`);
    try {
      katex.renderToString(f.latex, { throwOnError: true });
    } catch (err) {
      assert.fail(`KaTeX parse error in Video #${v.index} formula '${f.name}': ${err.message}`);
    }
  });

  // Check Quiz validity
  assert(Array.isArray(v.quiz) && v.quiz.length > 0, `Video #${v.index} has no quiz questions`);
  v.quiz.forEach((q, qIdx) => {
    totalQuizzes++;
    assert(q.question && Array.isArray(q.options) && q.options.length >= 2, `Video #${v.index} question ${qIdx} malformed`);
    assert(typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length, `Video #${v.index} question ${qIdx} invalid answer index ${q.answer}`);
    assert(q.explanation && q.explanation.length > 0, `Video #${v.index} question ${qIdx} missing explanation`);
  });
});

console.log(`✓ All 62 videos validated.`);
console.log(`✓ KaTeX formulas tested: ${totalFormulas} (100% parsed successfully with throwOnError=true).`);
console.log(`✓ Quiz questions tested: ${totalQuizzes} (all have valid answer indices & explanations).`);
console.log('--- ALL TEST SUITE ASSERTIONS PASSED! ---');
