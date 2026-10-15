// src/components/mathify.js
/**
 * Typesets inline \(...\) LaTeX found in text nodes under a root element.
 * Labels in the 2D lab and challenges are written with \( \) delimiters, and they
 * change as the user interacts, so a MutationObserver re-applies the typesetting.
 */

import katex from 'katex';

const INLINE = /\\\((.+?)\\\)/g;

export function typesetInlineMath(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes('\\(')) targets.push(walker.currentNode);
  }

  targets.forEach(node => {
    const text = node.nodeValue;
    const frag = document.createDocumentFragment();
    let last = 0;
    let match;
    INLINE.lastIndex = 0;
    while ((match = INLINE.exec(text)) !== null) {
      frag.append(text.slice(last, match.index));
      const span = document.createElement('span');
      span.innerHTML = katex.renderToString(match[1], { throwOnError: false });
      frag.append(span);
      last = match.index + match[0].length;
    }
    frag.append(text.slice(last));
    node.parentNode.replaceChild(frag, node);
  });
}

export function watchInlineMath(root) {
  typesetInlineMath(root);
  const observer = new MutationObserver(() => typesetInlineMath(root));
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  return observer;
}
