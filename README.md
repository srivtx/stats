# 📊 StatQuest: Statistics Fundamentals — Interactive 3D Masterclass

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-049EF4?style=flat&logo=three.js)](https://threejs.org/)
[![KaTeX](https://img.shields.io/badge/KaTeX-LaTeX_Math-3298DC?style=flat)](https://katex.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Videos Covered](https://img.shields.io/badge/Playlist_Videos-62_of_62_(100%25)-10B981)](https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9)

A comprehensive, first-principles interactive learning platform built for the **entire 62-video "Statistics Fundamentals" playlist** by **Josh Starmer (StatQuest)**. 

Every single video is paired with:
1. **Embedded YouTube Video Player** (with direct playlist links and timestamp shortcuts).
2. **"BAM!" Core Intuition**: Josh Starmer's signature visual mental model.
3. **Rigorous First-Principles Derivation**: Axiomatic proofs, continuous vs discrete analysis, and mathematical foundations.
4. **Formal KaTeX LaTeX Formulations**: Typeset equations for probability densities, expectations, variances, and estimators.
5. **Step-by-Step Worked Numerical Walkthrough**: Exact numbers illustrating how the math works out by hand.
6. **3D Interactive WebGL Spatial Studios**: Rotating 3D Gaussian bells, multiple regression planes, loss paraboloids, and maximum likelihood manifolds built from scratch with Three.js.
7. **2D Simulation Labs**: Monte Carlo simulations of the Central Limit Theorem, Bessel's correction, statistical power, Q-Q plots, and bootstrapping.
8. **Reproducible Python & R Code**: Copy-ready snippets utilizing NumPy, SciPy, Statsmodels, and base R.
9. **Knowledge Check Quizzes**: Interactive self-tests with detailed feedback on misconceptions and traps.
10. **Printable Cheatsheet**: Quick-reference guide covering decision matrices and formulas.

---

## 🧭 The 11 Curriculum Modules (All 62 Videos)

| Module | Title | Videos Covered | Core Concepts |
| :--- | :--- | :--- | :--- |
| **01** | **Descriptive Statistics & Data Foundations** | #1, #4, #32, #33, #34 | Histograms, Bins, Mean vs Median vs Mode, Bar vs Pie charts, Boxplots, Tukey fences, Log transformations |
| **02** | **Probability Distributions & Random Variables** | #2, #3, #5, #22, #23, #24, #46 | PDFs, CDFs, Gaussian Normal distribution, Exponential distribution, Expected value ($E[X]$), Binomial distribution, Inverse Transform Sampling |
| **03** | **Population Parameters, Samples & Spread** | #6, #7, #26, #27, #28, #29, #62 | $\mu$ vs $\bar{x}$, $\sigma$ vs $s$, Sample variance, Technical vs Biological replicates, Effective sample size, SD vs SE, Bessel's correction ($N$ vs $N-1$) |
| **04** | **Central Limit Theorem & Bootstrapping** | #25, #30, #31, #35 | Central Limit Theorem convergence, Empirical resampling with replacement, Bootstrap p-values, Frequentist Confidence Intervals |
| **05** | **Hypothesis Testing, P-Values & Significance** | #8, #9, #10, #11, #13, #47, #48, #49, #50 | Mathematical models, Null Hypothesis $H_0$, Alternative $H_1$, P-value definition & calculation, The BAM! philosophy, $\alpha$ thresholds, t-test selection, One vs Two-tailed tests |
| **06** | **Statistical Errors, Power & Multiple Testing** | #12, #14, #15, #16, #17 | Fisher's Exact Test, Hypergeometric distribution, p-hacking & optional stopping, False Discovery Rate (Benjamini-Hochberg), Statistical Power ($1 - \beta$), Sample size calculation |
| **07** | **Quantiles, QQ-Plots & Normalization** | #51, #52, #53 | Quantiles & percentiles, Normal Q-Q plots for skew and kurtosis diagnosis, Quantile Normalization for batch correction |
| **08** | **Covariance, Correlation & Bivariate Analysis** | #18, #19 | Population & sample covariance, Pearson's correlation coefficient $r$, Geometric cosine interpretation, Scale invariance |
| **09** | **Probability vs Likelihood & Maximum Likelihood** | #54, #55, #56, #57, #58 | Probability (Area) vs Likelihood (Height), MLE score equations, MLE for Exponential, Binomial, and Normal distributions |
| **10** | **Regression, Linear Models & ANOVA** | #36, #37, #38, #39, #40, #41, #42, #43, #44, #45 | $R^2$ variance explained, Ordinary Least Squares (OLS), Residual sum of squares, Loess smoothing, Multiple regression planes, t-test & ANOVA equivalence, Design matrices |
| **11** | **Bayesian Foundations, Conditional Probability & Odds** | #20, #21, #59, #60, #61 | Conditional probability $P(A \mid B)$, Bayes' Theorem, Base rate fallacy in screening, Odds $\frac{p}{1-p}$, Logit function, Odds Ratios, Frank Starmer's clarity principles |

---

## 🕹️ Interactive 3D & 2D Features

### 1. 3D WebGL Spatial Studio (Three.js)
- **3D Bivariate Gaussian Bell**: Dynamic $\mu_x, \mu_y, \sigma_x, \sigma_y, \rho$ sliders, color-coded elevation heatmaps, and draggable cross-section plane showing the 1D slice distribution.
- **3D Multiple Linear Regression Plane**: Live 3D scatter cloud $(X_1, X_2, Y)$, movable regression plane with partial slopes $\beta_1$ and $\beta_2$, and vertical residual lines displaying Sum of Squared Residuals ($SSR$).
- **3D Loss Paraboloid**: Visualizes the quadratic loss bowl $SSR(\beta_1, \beta_2)$ with an interactive ball rolling toward the global OLS minimum.
- **3D Maximum Likelihood Landscape**: Log-likelihood surface $\ell(\mu, \sigma)$ with real-time gradient ascent marker.
- **3D Covariance Ellipsoid**: Real-time visualization of how correlation $\rho$ tilts and stretches the data cloud along its eigenvectors.

### 2. 2D Simulation Laboratories (Canvas & SVG)
- **Histogram & Density Lab**: Live bin-width slider balancing bias vs variance with Kernel Density Estimation (KDE) curve overlay.
- **Central Limit Theorem Lab**: Monte Carlo sampling from skewed, uniform, bimodal, or dice populations, demonstrating the emergence of the Gaussian curve.
- **Bessel's Correction Bias Simulator**: Generates thousands of samples, comparing $\frac{1}{N}$ (biased downward) against $\frac{1}{N-1}$ (unbiased).
- **Statistical Power & Alpha Lab**: Dual normal distributions ($H_0$ and $H_1$) visualizing Type I error ($\alpha$), Type II error ($\beta$), and Statistical Power ($1 - \beta$).
- **Quantile-Quantile (Q-Q) Plot Studio**: Diagnoses normal, heavy-tailed (t-distribution), and skewed data against the 45-degree theoretical reference line.
- **Probability vs Likelihood Lab (Video #54)**: Interactive toggle comparing area under a fixed curve with curve height at a fixed observation.
- **Bayes' Screening Test Simulator**: Explores how a 99% accurate test for a rare disease yields overwhelmingly false positive discoveries.
- **Odds & Logit Explorer**: Interactive probability slider mapping directly onto the symmetric logit curve $\ln\left(\frac{p}{1-p}\right)$.
- **Loess Local Regression**: Sliding window with tricube kernel weights.
- **Bootstrap Resampler**: Step-by-step resampling with replacement and 95% percentile confidence interval generation.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` (v9 or higher)

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/srivtx/stats.git
cd stats

# Install dependencies
npm install

# Start local development server with Hot Module Replacement
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

The compiled static bundle is located in the `dist/` directory and can be hosted on GitHub Pages, Vercel, Netlify, or any static web server.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Runtime**: Native Modern ES Modules (ES2022)
- **Build Engine**: [Vite 6](https://vitejs.dev/) (lightning-fast bundling, zero runtime server overhead)
- **3D Graphics Engine**: [Three.js](https://threejs.org/) + OrbitControls (WebGL 2.0)
- **Mathematical Typesetting**: [KaTeX](https://katex.org/) (fast browser-side LaTeX rendering)
- **UI Icons**: [Lucide](https://lucide.dev/)
- **State Management**: Zero-dependency reactive controller with `localStorage` persistence
- **CI/CD**: GitHub Actions workflow for automated deployment to GitHub Pages

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

## ❤️ Acknowledgments

This educational platform is dedicated to **Josh Starmer** and **StatQuest**, whose unparalleled ability to break complex statistical ideas into intuitive visual steps inspired this complete first-principles masterclass.

*Double BAM!* 💥
