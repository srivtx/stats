// src/components/codeHighlight.js
// Small Python/R tokenizer for the code views. Black-and-white by design:
// tokens are told apart by weight, italics, and tone rather than by hue.

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const PY_KEYWORDS = 'import|from|as|def|return|if|elif|else|for|while|in|not|and|or|is|None|True|False|class|with|lambda|try|except|finally|raise|pass|break|continue|yield|global|del|assert';
const R_KEYWORDS = 'function|if|else|for|while|repeat|return|in|next|break|TRUE|FALSE|NULL|NA|Inf|NaN';

const LANG = {
  python: {
    comment: '#[^\\n]*',
    string: '"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'',
    keyword: `\\b(?:${PY_KEYWORDS})\\b`,
    call: '\\b[A-Za-z_]\\w*(?=\\()',
  },
  r: {
    comment: '#[^\\n]*',
    string: '"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'',
    keyword: `\\b(?:${R_KEYWORDS})\\b`,
    call: '[A-Za-z_.][\\w.]*(?=\\()',
  },
};

const NUMBER = '\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?L?\\b';

export function highlightCode(code, lang = 'python') {
  const spec = LANG[lang] || LANG.python;
  const order = [
    ['hl-com', spec.comment],
    ['hl-str', spec.string],
    ['hl-kw', spec.keyword],
    ['hl-fn', spec.call],
    ['hl-num', NUMBER],
  ];
  const pattern = new RegExp(order.map(([, src]) => `(${src})`).join('|'), 'g');

  let html = '';
  let last = 0;
  let m;
  while ((m = pattern.exec(code)) !== null) {
    if (m[0] === '') {
      pattern.lastIndex++;
      continue;
    }
    html += escape(code.slice(last, m.index));
    const idx = m.slice(1).findIndex(g => g !== undefined);
    html += `<span class="${order[idx][0]}">${escape(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  html += escape(code.slice(last));
  return html + '\n';
}
