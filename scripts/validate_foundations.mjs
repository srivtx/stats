// Validates src/data/foundations/module-N.js against the foundation schema.
// Usage: node scripts/validate_foundations.mjs 3      (one module)
//        node scripts/validate_foundations.mjs         (all modules)
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import katex from 'katex';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv[2];
const modules = arg ? [Number(arg)] : Array.from({ length: 11 }, (_, i) => i + 1);

const MIN_STEPS = 6;
const MAX_STEPS = 8;
const MIN_STEP_WORDS = 170;
const MIN_MODULE_WORDS = 1600;
const ADVANCED_TERMS = [
  'sigma-algebra', 'σ-algebra', 'Radon', 'Lebesgue', 'Hilbert', 'Banach',
  'almost surely', 'measure space', 'characteristic function', 'Kolmogorov',
];

function mathSegments(text) {
  const out = [];
  (text.match(/\$\$([\s\S]+?)\$\$/g) || []).forEach(m => out.push({ tex: m.slice(2, -2), display: true }));
  const rest = text.replace(/\$\$([\s\S]+?)\$\$/g, '');
  (rest.match(/\$([^$]+?)\$/g) || []).forEach(m => out.push({ tex: m.slice(1, -1), display: false }));
  return out;
}

function checkMath(label, text, errors) {
  if (/\\\(|\\\)|\\\[|\\\]/.test(text)) errors.push(`${label}: use $...$ not \\( \\) or \\[ \\]`);
  for (const seg of mathSegments(text)) {
    try {
      katex.renderToString(seg.tex, { throwOnError: true, displayMode: seg.display });
    } catch (e) {
      errors.push(`${label}: KaTeX error in "${seg.tex.slice(0, 70)}": ${e.message.split('\n')[0]}`);
    }
  }
}

const wordCount = s => s.replace(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/g, ' x ').split(/\s+/).filter(Boolean).length;

let totalErrors = 0;
let totalWarnings = 0;

for (const m of modules) {
  const errors = [];
  const warnings = [];
  const file = path.join(root, 'src/data/foundations', `module-${m}.js`);
  let mod;
  try {
    mod = (await import(pathToFileURL(file).href)).default;
  } catch (e) {
    console.log(`module-${m}: cannot load ${file}: ${e.message.split('\n')[0]}`);
    totalErrors++;
    continue;
  }

  if (!mod || typeof mod.title !== 'string' || !mod.title.trim()) errors.push('title missing');
  if (!mod || typeof mod.summary !== 'string') {
    errors.push('summary missing');
  } else {
    checkMath('summary', mod.summary, errors);
    if (wordCount(mod.summary) < 40) errors.push(`summary too short (${wordCount(mod.summary)} words, need 40+)`);
  }

  const steps = Array.isArray(mod.steps) ? mod.steps : [];
  if (steps.length < MIN_STEPS || steps.length > MAX_STEPS) {
    errors.push(`${steps.length} steps (need ${MIN_STEPS} to ${MAX_STEPS})`);
  }

  let moduleWords = wordCount(mod.summary || '') + wordCount(mod.title || '');
  steps.forEach((s, i) => {
    const L = `step ${i + 1}`;
    if (s.step !== i + 1) errors.push(`${L}: step number is ${s.step}, expected ${i + 1}`);
    if (typeof s.title !== 'string' || !s.title.trim()) errors.push(`${L}: title missing`);
    else checkMath(`${L} title`, s.title, errors);

    if (!Array.isArray(s.content) || s.content.length < 2 || s.content.length > 4) {
      errors.push(`${L}: content must be an array of 2 to 4 paragraphs`);
    }
    if (!Array.isArray(s.example) || s.example.length < 1 || s.example.length > 3) {
      errors.push(`${L}: example must be an array of 1 to 3 paragraphs`);
    }

    const content = Array.isArray(s.content) ? s.content : [];
    const example = Array.isArray(s.example) ? s.example : [];
    content.forEach((p, j) => checkMath(`${L} content[${j}]`, p, errors));
    example.forEach((p, j) => checkMath(`${L} example[${j}]`, p, errors));

    if (example.length && !example.join(' ').match(/\d/)) {
      errors.push(`${L}: example has no numbers (worked examples need real values)`);
    }

    const words = [...content, ...example].reduce((n, p) => n + wordCount(p), 0);
    moduleWords += words;
    if (words < MIN_STEP_WORDS) errors.push(`${L}: ${words} words (need ${MIN_STEP_WORDS}+)`);

    const all = [s.title, ...content, ...example].join(' ');
    for (const term of ADVANCED_TERMS) {
      if (all.includes(term)) warnings.push(`${L}: advanced term "${term}"`);
    }
  });

  if (moduleWords < MIN_MODULE_WORDS) errors.push(`module total ${moduleWords} words (need ${MIN_MODULE_WORDS}+)`);

  const label = `module-${m} (${moduleWords} words, ${steps.length} steps)`;
  if (errors.length || warnings.length) {
    console.log(`${label}:`);
    errors.forEach(e => console.log(`  ERROR  ${e}`));
    warnings.forEach(w => console.log(`  warn   ${w}`));
  } else {
    console.log(`${label}: OK`);
  }
  totalErrors += errors.length;
  totalWarnings += warnings.length;
}

console.log(`\n${totalErrors} error(s), ${totalWarnings} warning(s)`);
process.exit(totalErrors ? 1 : 0);
