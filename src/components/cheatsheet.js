// src/components/cheatsheet.js
/**
 * Comprehensive Statistics Fundamentals Interactive Cheatsheet.
 */

export function renderCheatSheet(container) {
  container.innerHTML = `
    <div class="cheatsheet-wrapper">
      <div class="cheatsheet-header">
        <h2><i data-feather="book-open"></i> Complete Statistics Fundamentals Cheatsheet</h2>
        <p>A quick-reference synthesis of all 62 StatQuest topics, decision matrices, core formulas, and BAM insights.</p>
      </div>

      <div class="cheatsheet-grid">
        <!-- Card 1: Core Measures -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-blue">Module 1 & 3</span>
            <h3>Spread & Center</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <strong>Sample Mean:</strong>
              <code>\\bar{x} = \\frac{1}{n}\\sum x_i</code>
            </div>
            <div class="cs-formula-block">
              <strong>Sample Variance (Bessel's Correction):</strong>
              <code>s^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2</code>
            </div>
            <div class="cs-formula-block">
              <strong>Standard Error:</strong>
              <code>SE = \\frac{s}{\\sqrt{n}}</code>
            </div>
            <p class="cs-note"><strong>BAM Rule:</strong> Standard Deviation (s) describes the individuals. Standard Error (SE) describes the mean!</p>
          </div>
        </div>

        <!-- Card 2: Distributions -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-purple">Module 2</span>
            <h3>Key Distributions</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <strong>Normal (Gaussian):</strong>
              <code>f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}</code>
            </div>
            <div class="cs-formula-block">
              <strong>Exponential (Waiting Times):</strong>
              <code>f(x) = \\lambda e^{-\\lambda x}, \\quad E[X] = \\frac{1}{\\lambda}</code>
            </div>
            <div class="cs-formula-block">
              <strong>Binomial (k in n trials):</strong>
              <code>P(K=k) = \\binom{n}{k} p^k (1-p)^{n-k}</code>
            </div>
          </div>
        </div>

        <!-- Card 3: Hypothesis Testing & Power -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-emerald">Module 5 & 6</span>
            <h3>Tests, P-Values & Power</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <strong>P-Value:</strong>
              <code>P(T \\ge t_{\\text{obs}} \\mid H_0)</code>
              <p>Under a true null, p-values are uniformly distributed between 0 and 1.</p>
            </div>
            <div class="cs-formula-block">
              <strong>Type I Error (\\(\\alpha\\)):</strong> False Discovery Rate
            </div>
            <div class="cs-formula-block">
              <strong>Statistical Power (\\(1 - \\beta\\)):</strong> True Positive Rate
            </div>
            <div class="cs-formula-block">
              <strong>Benjamini-Hochberg FDR:</strong>
              <code>p_{(k)} \\le \\frac{k}{m} \\cdot Q</code>
            </div>
          </div>
        </div>

        <!-- Card 4: Regression & Linear Models -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-amber">Module 10</span>
            <h3>Linear Models & Regression</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <strong>Univariate OLS Slope:</strong>
              <code>\\hat{\\beta}_1 = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)} = r \\frac{s_y}{s_x}</code>
            </div>
            <div class="cs-formula-block">
              <strong>Multiple Regression Matrix Form:</strong>
              <code>\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}</code>
            </div>
            <div class="cs-formula-block">
              <strong>Coefficient of Determination:</strong>
              <code>R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}}</code>
            </div>
            <p class="cs-note"><strong>Grand Unified Theory:</strong> t-tests and ANOVA are just linear regression with dummy indicator columns!</p>
          </div>
        </div>

        <!-- Card 5: Probability vs Likelihood & MLE -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-rose">Module 9</span>
            <h3>Likelihood & MLE</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <strong>Probability vs Likelihood:</strong>
              <p>Probability = Area under fixed curve.<br>Likelihood = Height of moving curve at fixed observation.</p>
            </div>
            <div class="cs-formula-block">
              <strong>Maximum Likelihood Objective:</strong>
              <code>\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)</code>
            </div>
          </div>
        </div>

        <!-- Card 6: Bayesian & Odds -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-teal">Module 11</span>
            <h3>Bayes & Log-Odds</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <strong>Bayes' Theorem:</strong>
              <code>P(A \\mid B) = \\frac{P(B \\mid A) P(A)}{P(B)}</code>
            </div>
            <div class="cs-formula-block">
              <strong>Odds:</strong>
              <code>\\text{Odds} = \\frac{p}{1-p}</code>
            </div>
            <div class="cs-formula-block">
              <strong>Log-Odds (Logit):</strong>
              <code>\\text{logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
