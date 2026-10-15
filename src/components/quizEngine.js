// src/components/quizEngine.js
/**
 * Interactive Knowledge Check Quiz Component.
 */

export function renderQuiz(container, questions, videoId, onComplete = null) {
  if (!questions || questions.length === 0) {
    container.innerHTML = `
      <div class="empty-quiz-notice">
        <p>No quiz questions available for this conceptual overview.</p>
      </div>
    `;
    return;
  }

  const storedQuiz = JSON.parse(localStorage.getItem('statquest_quiz_progress') || '{}');
  const videoState = storedQuiz[videoId] || {};

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <div class="quiz-header-left">
          <h3><i data-lucide="check-circle"></i> Knowledge Check: Test Your Intuition</h3>
          <span class="quiz-status-badge">Concept Mastery</span>
        </div>
        <div class="quiz-header-right">
          <button class="btn btn-ghost btn-sm" id="btn-reset-quiz" title="Reset this quiz to try again">
            <i data-lucide="rotate-ccw"></i> Reset Quiz
          </button>
        </div>
      </div>
      <div class="quiz-questions-list">
        ${questions.map((q, qIdx) => {
          const userAns = videoState[qIdx];
          const answered = userAns !== undefined;
          return `
            <div class="quiz-question-card" data-qidx="${qIdx}">
              <p class="question-text"><strong>Q${qIdx + 1}:</strong> ${q.question}</p>
              <div class="quiz-options">
                ${q.options.map((opt, optIdx) => {
                  let optClass = 'quiz-option-btn';
                  if (answered) {
                    if (optIdx === q.answer) optClass += ' option-correct';
                    else if (optIdx === userAns) optClass += ' option-incorrect';
                    else optClass += ' option-disabled';
                  }
                  return `
                    <button class="${optClass}" data-optidx="${optIdx}" ${answered ? 'disabled' : ''}>
                      <span class="opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                      <span class="opt-label">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>
              <div class="quiz-explanation ${answered ? 'revealed' : ''}">
                <p><strong>Explanation:</strong> ${q.explanation}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Reset quiz button
  const resetBtn = container.querySelector('#btn-reset-quiz');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const allProgress = JSON.parse(localStorage.getItem('statquest_quiz_progress') || '{}');
      delete allProgress[videoId];
      localStorage.setItem('statquest_quiz_progress', JSON.stringify(allProgress));
      renderQuiz(container, questions, videoId, onComplete);
    });
  }

  // Attach click handlers
  const questionCards = container.querySelectorAll('.quiz-question-card');
  questionCards.forEach(card => {
    const qIdx = parseInt(card.dataset.qidx);
    const qData = questions[qIdx];
    const buttons = card.querySelectorAll('.quiz-option-btn');
    const expl = card.querySelector('.quiz-explanation');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = parseInt(btn.dataset.optidx);

        // Update localStorage
        const allProgress = JSON.parse(localStorage.getItem('statquest_quiz_progress') || '{}');
        if (!allProgress[videoId]) allProgress[videoId] = {};
        allProgress[videoId][qIdx] = chosen;
        localStorage.setItem('statquest_quiz_progress', JSON.stringify(allProgress));

        // Update button states
        buttons.forEach((b, bIdx) => {
          b.disabled = true;
          if (bIdx === qData.answer) {
            b.classList.add('option-correct');
          } else if (bIdx === chosen) {
            b.classList.add('option-incorrect');
          } else {
            b.classList.add('option-disabled');
          }
        });

        expl.classList.add('revealed');

        if (onComplete) onComplete(qIdx, chosen === qData.answer);
      });
    });
  });
}
