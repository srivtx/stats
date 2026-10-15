// src/components/cheatsheet.js
/**
 * Comprehensive Statistics Fundamentals Interactive Cheatsheet.
 * Fully typeset with KaTeX.
 */

import katex from 'katex';

function k(latex, displayMode = false) {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode });
  } catch (e) {
    return `<code>${latex}</code>`;
  }
}

export function renderCheatSheet(container) {
  container.innerHTML = `
    <div class="cheatsheet-wrapper">
      <div class="cheatsheet-header">
        <h2><i data-lucide="book-open"></i> Complete Statistics Fundamentals Cheatsheet</h2>
        <p>A quick-reference synthesis of all 62 StatQuest topics, decision matrices, core formulas, and BAM insights.</p>
      </div>

      <div class="cheatsheet-grid">
        <!-- Card 1: Core Measures -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-blue">Modules 1 & 3</span>
            <h3>Spread & Center</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <span class="cs-formula-title">Sample Mean:</span>
              <div class="cs-math">${k('\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Sample Variance (Bessel's Correction):</span>
              <div class="cs-math">${k('s^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Standard Error of the Mean:</span>
              <div class="cs-math">${k('SE = \\frac{s}{\\sqrt{n}}', true)}</div>
            </div>
            <p class="cs-note"><strong>BAM Rule:</strong> Standard Deviation (${k('s')}) describes individual variability. Standard Error (${k('SE')}) describes uncertainty in the mean!</p>
            <div class="cs-links">
              <a href="#video-4" class="cs-link">#4 Mean & Median →</a>
              <a href="#video-7" class="cs-link">#7 Variance & SD →</a>
              <a href="#video-28" class="cs-link">#28 SD vs SE →</a>
            </div>
          </div>
        </div>

        <!-- Card 2: Distributions -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-purple">Modules 1 & 4</span>
            <h3>Key Distributions</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <span class="cs-formula-title">Normal (Gaussian) Distribution:</span>
              <div class="cs-math">${k('f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Exponential Distribution (Wait Times):</span>
              <div class="cs-math">${k('f(x) = \\lambda e^{-\\lambda x}, \\quad E[X] = \\frac{1}{\\lambda}', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Binomial Distribution (${k('k')} successes in ${k('n')} trials):</span>
              <div class="cs-math">${k('P(K=k) = \\binom{n}{k} p^k (1-p)^{n-k}', true)}</div>
            </div>
            <p class="cs-note"><strong>BAM Rule:</strong> Discrete distributions give probabilities for specific outcomes. Continuous distributions require integration over an interval!</p>
            <div class="cs-links">
              <a href="#video-3" class="cs-link">#3 Normal Curve →</a>
              <a href="#video-5" class="cs-link">#5 Exponential →</a>
              <a href="#video-24" class="cs-link">#24 Binomial →</a>
            </div>
          </div>
        </div>

        <!-- Card 3: Hypothesis Testing & Power -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-emerald">Modules 3 & 4</span>
            <h3>Tests, P-Values & Power</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <span class="cs-formula-title">P-Value Definition:</span>
              <div class="cs-math">${k('P(T \\ge t_{\\text{obs}} \\mid H_0)', true)}</div>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Under a true null hypothesis, p-values follow a uniform distribution ${k('U(0, 1)')}.</p>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Type I Error (${k('\\alpha')}) vs Power (${k('1 - \\beta')}):</span>
              <div class="cs-math">${k('\\text{Power} = P(\\text{Reject } H_0 \\mid H_1 \\text{ is true}) = 1 - \\beta', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Benjamini-Hochberg FDR Bound:</span>
              <div class="cs-math">${k('p_{(k)} \\le \\frac{k}{m} \\cdot Q', true)}</div>
            </div>
            <p class="cs-note"><strong>BAM Rule:</strong> Never confuse a high p-value with proof that the effect is zero! It just means your data is consistent with the null.</p>
            <div class="cs-links">
              <a href="#video-11" class="cs-link">#11 p-values →</a>
              <a href="#video-15" class="cs-link">#15 FDR Control →</a>
              <a href="#video-16" class="cs-link">#16 Power & Beta →</a>
            </div>
          </div>
        </div>

        <!-- Card 4: Regression & Linear Models -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-amber">Modules 7 & 8</span>
            <h3>Linear Models & Regression</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <span class="cs-formula-title">Univariate OLS Slope:</span>
              <div class="cs-math">${k('\\hat{\\beta}_1 = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)} = r \\frac{s_y}{s_x}', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Multiple Regression Normal Equation:</span>
              <div class="cs-math">${k('\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Coefficient of Determination (${k('R^2')}):</span>
              <div class="cs-math">${k('R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}} = \\frac{SS_{\\text{tot}} - SS_{\\text{res}}}{SS_{\\text{tot}}}', true)}</div>
            </div>
            <p class="cs-note"><strong>Grand Unified Theorem:</strong> t-tests and ANOVA are identical to linear regression where columns are binary dummy variables!</p>
            <div class="cs-links">
              <a href="#video-36" class="cs-link">#36 R-squared →</a>
              <a href="#video-38" class="cs-link">#38 Least Squares →</a>
              <a href="#video-42" class="cs-link">#42 Multiple Reg →</a>
            </div>
          </div>
        </div>

        <!-- Card 5: Probability vs Likelihood & MLE -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-rose">Module 11</span>
            <h3>Likelihood & MLE</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <span class="cs-formula-title">Probability vs Likelihood (StatQuest #54):</span>
              <p style="font-size:0.84rem; margin:6px 0;"><strong>Probability:</strong> Area under fixed distribution curve.<br><strong>Likelihood:</strong> Height of variable distribution curve at fixed observation.</p>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Maximum Likelihood Estimator:</span>
              <div class="cs-math">${k('\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Bessel's Correction Proof:</span>
              <div class="cs-math">${k('E\\left[\\frac{1}{n}\\sum (x_i - \\bar{x})^2\\right] = \\frac{n-1}{n}\\sigma^2', true)}</div>
            </div>
            <p class="cs-note"><strong>BAM Rule:</strong> Dividing by ${k('n')} underestimates variance because distances from sample mean are always smaller than distances from true population mean.</p>
            <div class="cs-links">
              <a href="#video-54" class="cs-link">#54 Prob vs Likelihood →</a>
              <a href="#video-55" class="cs-link">#55 MLE Details →</a>
              <a href="#video-62" class="cs-link">#62 Bessel Correction →</a>
            </div>
          </div>
        </div>

        <!-- Card 6: Bayesian & Odds -->
        <div class="cs-card">
          <div class="cs-card-header">
            <span class="cs-badge cs-teal">Modules 4 & 11</span>
            <h3>Bayes, Odds & Log-Odds</h3>
          </div>
          <div class="cs-content">
            <div class="cs-formula-block">
              <span class="cs-formula-title">Bayes' Theorem:</span>
              <div class="cs-math">${k('P(A \\mid B) = \\frac{P(B \\mid A) P(A)}{P(B)}', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Odds and Log-Odds (Logit):</span>
              <div class="cs-math">${k('\\text{Odds} = \\frac{p}{1-p}, \\quad \\text{logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right)', true)}</div>
            </div>
            <div class="cs-formula-block">
              <span class="cs-formula-title">Odds Ratio (OR):</span>
              <div class="cs-math">${k('OR = \\frac{\\text{Odds}_1}{\\text{Odds}_2} = \\frac{p_1 / (1-p_1)}{p_2 / (1-p_2)}', true)}</div>
            </div>
            <p class="cs-note"><strong>BAM Rule:</strong> Probabilities are trapped between 0 and 1. Log-odds map probability smoothly from ${k('-\\infty')} to ${k('+\\infty')}, enabling linear modeling of binary data!</p>
            <div class="cs-links">
              <a href="#video-21" class="cs-link">#21 Bayes' Theorem →</a>
              <a href="#video-58" class="cs-link">#58 Odds & Log-Odds →</a>
              <a href="#video-59" class="cs-link">#59 Odds Ratios →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
