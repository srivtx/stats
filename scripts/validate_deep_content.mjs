// Validates src/data/deepContent/module-N.js against the schema.
// Usage: node scripts/validate_deep_content.mjs 3      (one module)
//        node scripts/validate_deep_content.mjs         (all modules)
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import katex from 'katex';
import { playlistData } from '../src/data/playlistData.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv[2];
const modules = arg ? [Number(arg)] : Array.from({ length: 11 }, (_, i) => i + 1);

function mathSegments(text) {
  const out = [];
  const display = text.match(/\$\$([\s\S]+?)\$\$/g) || [];
  display.forEach(m => out.push({ tex: m.slice(2, -2), display: true }));
  const rest = text.replace(/\$\$([\s\S]+?)\$\$/g, '');
  (rest.match(/\$([^$]+?)\$/g) || []).forEach(m => out.push({ tex: m.slice(1, -1), display: false }));
  return out;
}

function checkMath(label, text, errors) {
  if (typeof text !== 'string') return;
  for (const seg of mathSegments(text)) {
    try {
      katex.renderToString(seg.tex, { throwOnError: true, displayMode: seg.display });
    } catch (e) {
      errors.push(`${label}: KaTeX error in "${seg.tex.slice(0, 80)}": ${e.message.split('\n')[0]}`);
    }
  }
}

let totalErrors = 0;

for (const m of modules) {
  const errors = [];
  const file = path.join(root, 'src/data/deepContent', `module-${m}.js`);
  let content;
  try {
    content = (await import(pathToFileURL(file).href)).default;
  } catch (e) {
    console.log(`module-${m}: cannot load ${file}: ${e.message.split('\n')[0]}`);
    totalErrors++;
    continue;
  }

  const expected = playlistData.filter(v => v.moduleId === `module-${m}`).map(v => v.index);
  const present = Object.keys(content).map(Number);
  for (const idx of expected) {
    if (!present.includes(idx)) errors.push(`#${idx}: missing entry`);
  }
  for (const idx of present) {
    if (!expected.includes(idx)) errors.push(`#${idx}: not a video of module-${m}`);
  }

  for (const idx of expected) {
    const entry = content[idx];
    if (!entry) continue;
    const L = `#${idx}`;
    const d = entry.derivation;
    if (!d) { errors.push(`${L}: missing derivation`); continue; }
    if (typeof d.headline !== 'string' || d.headline.length < 10) errors.push(`${L}: headline missing/too short`);
    if (!Array.isArray(d.axioms) || d.axioms.length < 2 || d.axioms.length > 4) errors.push(`${L}: axioms must have 2-4 items`);
    else d.axioms.forEach((a, i) => { if (typeof a !== 'string' || a.length < 15) errors.push(`${L}: axiom ${i + 1} too short`); checkMath(`${L} axiom ${i + 1}`, a, errors); });
    if (!Array.isArray(d.steps) || d.steps.length < 4 || d.steps.length > 5) errors.push(`${L}: steps must have 4-5 items`);
    else d.steps.forEach((s, i) => {
      if (!s || typeof s.title !== 'string' || typeof s.body !== 'string' || s.body.length < 60) errors.push(`${L}: step ${i + 1} needs title and body (60+ chars)`);
      else checkMath(`${L} step ${i + 1}`, s.body, errors);
    });
    if (typeof d.result !== 'string' || d.result.length < 20) errors.push(`${L}: result missing/too short`);
    else checkMath(`${L} result`, d.result, errors);
    if (typeof d.assumptionsBreak !== 'string' || d.assumptionsBreak.length < 40) errors.push(`${L}: assumptionsBreak missing/too short`);
    else checkMath(`${L} assumptionsBreak`, d.assumptionsBreak, errors);

    if (!Array.isArray(entry.quiz) || entry.quiz.length !== 5) {
      errors.push(`${L}: quiz must have exactly 5 questions`);
    } else {
      const video = playlistData.find(v => v.index === idx);
      const existing = new Set((video?.quiz || []).map(q => q.question.trim().toLowerCase()));
      entry.quiz.forEach((q, i) => {
        const QL = `${L} q${i + 1}`;
        if (typeof q.question !== 'string' || q.question.length < 20) errors.push(`${QL}: question missing/too short`);
        else { checkMath(QL, q.question, errors); if (existing.has(q.question.trim().toLowerCase())) errors.push(`${QL}: duplicates an existing question`); }
        if (!Array.isArray(q.options) || q.options.length !== 4) errors.push(`${QL}: needs exactly 4 options`);
        else {
          if (new Set(q.options).size !== 4) errors.push(`${QL}: options must be distinct`);
          q.options.forEach(o => checkMath(QL, o, errors));
        }
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errors.push(`${QL}: answer must be an index 0-3`);
        if (typeof q.explanation !== 'string' || q.explanation.length < 25) errors.push(`${QL}: explanation missing/too short`);
        else checkMath(`${QL} explanation`, q.explanation, errors);
      });
      const answers = entry.quiz.map(q => q.answer);
      if (new Set(answers).size === 1) errors.push(`${L}: all answers share the same index; vary them`);
    }
  }

  if (errors.length) {
    totalErrors += errors.length;
    console.log(`module-${m}: ${errors.length} problem(s)`);
    errors.forEach(e => console.log('  - ' + e));
  } else {
    console.log(`module-${m}: OK (${expected.length} videos)`);
  }
}

process.exitCode = totalErrors ? 1 : 0;
