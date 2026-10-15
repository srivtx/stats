// src/components/quizEngine.js
/**
 * Interactive Knowledge Check Quiz Component.
 * Supports multi-question mastery checks per lesson with live scoring,
 * category badges, detailed pedagogical explanations, and reset functionality.
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

  // Calculate current score
  let correctCount = 0;
  let answeredCount = 0;
  questions.forEach((q, idx) => {
    if (videoState[idx] !== undefined) {
      answeredCount++;
      if (videoState[idx] === q.answer) correctCount++;
    }
  });

  const categories = [
    { title: "Conceptual Intuition", icon: "brain" },
    { title: "Mathematical Mechanics", icon: "calculator" },
    { title: "Critical Pitfall & Diagnosis", icon: "alert-triangle" }
  ];

  const allCompleted = answeredCount === questions.length;
  const isPerfect = allCompleted && correctCount === questions.length;

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <div class="quiz-header-left">
          <h3><i data-lucide="check-circle"></i> Knowledge Check: Test Your Intuition</h3>
          <div class="quiz-score-badge ${isPerfect ? 'score-perfect' : ''}">
            Score: <span id="quiz-score-num">${correctCount}</span> / ${questions.length}
          </div>
        </div>
        <div class="quiz-header-right">
          <button class="btn btn-ghost btn-sm" id="btn-reset-quiz" title="Reset this quiz to try again">
            <i data-lucide="rotate-ccw"></i> Reset Quiz
          </button>
        </div>
      </div>

      ${isPerfect ? `
        <div class="quiz-mastery-banner">
          <div class="mastery-badge">BAM!</div>
          <div class="mastery-text">
            <strong>Mastery Achieved!</strong> You answered all ${questions.length} first-principles questions correctly.
          </div>
        </div>
      ` : ''}

      <div class="quiz-questions-list">
        ${questions.map((q, qIdx) => {
          const userAns = videoState[qIdx];
          const answered = userAns !== undefined;
          const cat = categories[qIdx % categories.length];

          return `
            <div class="quiz-question-card ${answered ? (userAns === q.answer ? 'card-correct' : 'card-incorrect') : ''}" data-qidx="${qIdx}">
              <div class="question-meta-row">
                <span class="q-number-pill">Question ${qIdx + 1} of ${questions.length}</span>
                <span class="q-category-tag"><i data-lucide="${cat.icon}"></i> ${cat.title}</span>
              </div>
              <p class="question-text">${q.question}</p>
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
                <p><strong>First-Principles Explanation:</strong> ${q.explanation}</p>
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

        if (chosen === qData.answer) {
          card.classList.add('card-correct');
        } else {
          card.classList.add('card-incorrect');
        }

        // Re-render to update score header and check mastery
        renderQuiz(container, questions, videoId, onComplete);

        if (onComplete) onComplete(qIdx, chosen === qData.answer);
      });
    });
  });

  if (typeof window !== 'undefined' && window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}
