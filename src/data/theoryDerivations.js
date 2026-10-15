// src/data/theoryDerivations.js
/**
 * Rigorous 4-Step First-Principles Mathematical Derivations for all 11 Modules
 * Derived from Kolmogorov probability axioms, loss minimization, calculus optimization,
 * Gauss-Markov theorems, and asymptotic convergence.
 */

export const moduleDerivations = {
  'module-1': {
    title: "Axiomatic Foundations of Descriptive Statistics & Loss Functions",
    steps: [
      {
        step: 1,
        title: "Sample Space, Random Variables & Empirical Measure",
        content: "Let $(\\Omega, \\mathcal{F}, P)$ be a probability space with data-generating distribution $F$. An i.i.d. sample $\\mathbf{x} = (x_1, \\dots, x_n)$ defines the empirical probability measure $P_n = \\frac{1}{n}\\sum_{i=1}^n \\delta_{x_i}$. Glivenko-Cantelli's fundamental theorem guarantees uniform convergence of the empirical CDF: $\\sup_x |F_n(x) - F(x)| \\xrightarrow{a.s.} 0$ as $n \\to \\infty$."
      },
      {
        step: 2,
        title: "Loss Minimization: Mean as L2 Risk, Median as L1 Risk",
        content: "Central tendency measures are variational minimizers of expected risk $R(c) = E[L(X - c)]$. For quadratic loss $L(u) = u^2$, setting $\\frac{d}{dc}E[(X-c)^2] = -2E[X-c] = 0$ uniquely yields the sample mean $c^* = \\bar{x} = E[X]$. For absolute loss $L(u) = |u|$, the subgradient vanishes at the median $P(X \\le M) = 1/2$. This proves why the median has a 50% breakdown point while the mean has 0%."
      },
      {
        step: 3,
        title: "Non-Parametric Density Estimation via Histograms & Kernel Smoothing",
        content: "A density histogram partitions $\\mathbb{R}$ into disjoint intervals $[b_k, b_k + h)$ with density estimator $\\hat{f}_h(x) = \\frac{N_k}{n \\cdot h}$. The Mean Integrated Squared Error decomposes into $\\text{MISE} = \\text{Bias}^2 + \\text{Variance} = \\frac{h^2}{12}\\int (f'(x))^2 dx + \\frac{1}{nh}$. Minimizing MISE yields optimal bandwidth $h^* \\propto n^{-1/3}$ (Scott's Rule), balancing undersmoothing noise vs oversmoothing bias."
      },
      {
        step: 4,
        title: "Scale Transformations & Moment Invariance",
        content: "Under monotonic transformations $Y = g(X)$, quantiles transform equivariantly: $Q_Y(p) = g(Q_X(p))$, so $\\text{Median}(Y) = g(\\text{Median}(X))$. However, by Jensen's inequality for convex $g$, $E[g(X)] \\ge g(E[X])$. For log-normal multiplicative processes ($Y = e^{\\beta X} \\cdot \\epsilon$), the logarithmic transform $\\ln Y = \\beta X + \\ln \\epsilon$ converts multiplicative errors into additive linear Gaussian variance."
      }
    ]
  },
  'module-2': {
    title: "Axiomatic Foundations of Probability Distributions & Densities",
    steps: [
      {
        step: 1,
        title: "Kolmogorov's Probability Axioms",
        content: "A probability space is a triple $(\\Omega, \\mathcal{F}, P)$ where sample space $\\Omega$ represents all elementary outcomes, $\\sigma$-algebra $\\mathcal{F}$ represents measurable events, and measure $P: \\mathcal{F} \\to [0, 1]$ satisfies Kolmogorov's three axioms: (i) Non-negativity $P(E) \\ge 0$; (ii) Unitarity $P(\\Omega) = 1$; and (iii) Countable additivity $P(\\bigcup_{i=1}^\\infty E_i) = \\sum_{i=1}^\\infty P(E_i)$ for pairwise disjoint events."
      },
      {
        step: 2,
        title: "Cumulative Distribution & Radon-Nikodym Densities",
        content: "The cumulative distribution function $F_X(x) = P(X \\le x)$ is non-decreasing, right-continuous, with $\\lim_{x\\to-\\infty} F(x) = 0$ and $\\lim_{x\\to+\\infty} F(x) = 1$. When $F_X$ is absolutely continuous with respect to Lebesgue measure, the Radon-Nikodym derivative yields the probability density function $f_X(x) = \\frac{dF_X(x)}{dx}$, guaranteeing $P(a \\le X \\le b) = \\int_a^b f_X(x) dx$ and $P(X = x) = 0$ for every single continuous point."
      },
      {
        step: 3,
        title: "Maximum Entropy Characterization of the Gaussian Distribution",
        content: "Among all continuous distributions with fixed mean $\\mu$ and fixed variance $\\sigma^2$, the Gaussian distribution $\\mathcal{N}(\\mu, \\sigma^2)$ uniquely maximizes differential Shannon entropy $H(f) = -\\int f(x) \\ln f(x) dx$. Using calculus of variations with Lagrange multipliers $\\mathcal{L} = -\\int f \\ln f dx - \\lambda_0(\\int f dx - 1) - \\lambda_1(\\int (x-\\mu)^2 f dx - \\sigma^2)$, the Euler-Lagrange stationarity condition yields $f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$."
      },
      {
        step: 4,
        title: "Poisson Counting Processes & Exponential Waiting Times",
        content: "Let $N_t$ be a Poisson counting process with arrival intensity $\\lambda$. The count in interval $[0, t]$ follows $P(N_t = k) = \\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}$. The waiting time $T$ until the first arrival satisfies $P(T > t) = P(N_t = 0) = e^{-\\lambda t}$. Differentiating $F_T(t) = 1 - e^{-\\lambda t}$ yields the exponential density $f_T(t) = \\lambda e^{-\\lambda t}$, having the unique memoryless property $P(T > s + t \\mid T > s) = P(T > t)$."
      }
    ]
  },
  'module-3': {
    title: "Axiomatic Derivation of Sample Variance, Degrees of Freedom & Bessel's Correction",
    steps: [
      {
        step: 1,
        title: "Population Parameters vs Sample Estimators",
        content: "Let $X_1, \\dots, X_n$ be an i.i.d. sample from a population with true expectation $\\mu = E[X]$ and true finite variance $\\sigma^2 = \\text{Var}(X) = E[(X - \\mu)^2]$. The sample mean $\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i$ is a linear unbiased estimator: $E[\\bar{X}] = \\frac{1}{n}\\sum E[X_i] = \\mu$, with sampling variance $\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}$."
      },
      {
        step: 2,
        title: "The Degeneracy Constraint sum(Xi - Xbar) = 0",
        content: "Because deviations from the sample mean identically sum to zero: $\\sum_{i=1}^n (X_i - \\bar{X}) = \\sum X_i - n\\bar{X} = n\\bar{X} - n\\bar{X} \\equiv 0$, the $n$ deviation vectors are linearly dependent and span an $(n-1)$-dimensional linear subspace of $\\mathbb{R}^n$. One full degree of freedom is consumed estimating the unknown population center $\\mu$ by $\\bar{X}$."
      },
      {
        step: 3,
        title: "Analytic Proof of Bessel's Correction",
        content: "Expanding deviation around true parameter $\\mu$: $X_i - \\bar{X} = (X_i - \\mu) - (\\bar{X} - \\mu)$. Squaring and summing: $\\sum (X_i - \\bar{X})^2 = \\sum (X_i - \\mu)^2 - n(\\bar{X} - \\mu)^2$. Taking mathematical expectation: $E[\\sum (X_i - \\bar{X})^2] = \\sum E[(X_i - \\mu)^2] - n E[(\\bar{X} - \\mu)^2] = n\\sigma^2 - n\\left(\\frac{\\sigma^2}{n}\\right) = (n - 1)\\sigma^2$. Dividing by $n-1$ yields the unique unbiased estimator $s^2 = \\frac{1}{n-1}\\sum (X_i - \\bar{X})^2$ with $E[s^2] = \\sigma^2$."
      },
      {
        step: 4,
        title: "Standard Deviation vs Standard Error of the Mean",
        content: "Sample standard deviation $s = \\sqrt{s^2}$ quantifies the spread of individual observations in the sample space. In contrast, Standard Error of the Mean $\\text{SE}(\\bar{X}) = \\frac{s}{\\sqrt{n}}$ quantifies the precision of the sample mean estimator across repeated experiments. By the $\\sqrt{n}$ scaling law, quadrupling sample size halves estimation uncertainty."
      }
    ]
  },
  'module-4': {
    title: "Axiomatic Derivation of the Central Limit Theorem & Resampling",
    steps: [
      {
        step: 1,
        title: "Sums of Independent Identically Distributed Random Variables",
        content: "Let $X_1, X_2, \\dots, X_n$ be an i.i.d. sequence with $E[X_i] = \\mu$ and $\\text{Var}(X_i) = \\sigma^2 < \\infty$. Define the standardized sample sum $Z_n = \\frac{\\sum_{i=1}^n X_i - n\\mu}{\\sigma\\sqrt{n}} = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}}$. Note that $E[Z_n] = 0$ and $\\text{Var}(Z_n) = 1$ for all sample sizes $n$ regardless of the shape of the underlying population."
      },
      {
        step: 2,
        title: "Characteristic Function Taylor Series Expansion",
        content: "Let $\\phi_Y(t) = E[e^{itY}]$ be the characteristic function of centered variable $Y_i = \\frac{X_i - \\mu}{\\sigma}$. Since $E[Y_i] = 0$ and $E[Y_i^2] = 1$, Taylor's theorem expands $\\phi_Y(t) = 1 - \\frac{t^2}{2} + o(t^2)$. The standardized sum $Z_n = \\frac{1}{\\sqrt{n}}\\sum_{i=1}^n Y_i$ has characteristic function $\\phi_{Z_n}(t) = \\left[ \\phi_Y\\left(\\frac{t}{\\sqrt{n}}\\right) \\right]^n = \\left( 1 - \\frac{t^2}{2n} + o\\left(\\frac{t^2}{n}\\right) \\right)^n$."
      },
      {
        step: 3,
        title: "Lévy's Continuity Theorem & Asymptotic Normality",
        content: "Taking the limit as $n \\to \\infty$: $\\lim_{n \\to \\infty} \\left(1 - \\frac{t^2 / 2}{n}\\right)^n = e^{-t^2 / 2}$, which is precisely the characteristic function of the standard normal distribution $\\mathcal{N}(0, 1)$. By Lévy's Continuity Theorem, $Z_n \\xrightarrow{d} \\mathcal{N}(0, 1)$ in distribution as $n \\to \\infty$. The Berry-Esseen theorem bounds the maximum discrepancy $\\sup_z |F_n(z) - \\Phi(z)| \\le \\frac{C \\rho}{\\sigma^3 \\sqrt{n}}$, where $\\rho = E[|X-\\mu|^3]$."
      },
      {
        step: 4,
        title: "Efron's Non-Parametric Bootstrap Plug-in Principle",
        content: "When analytical sampling distributions are intractable, Efron's Bootstrap replaces the unknown population distribution $F$ with the empirical distribution $\\hat{F}_n$. Resampling $n$ observations with replacement generates the bootstrap distribution $\\hat{\\theta}^* = g(X_1^*, \\dots, X_n^*)$. By the Mallows metric theorem, the empirical bootstrap distribution converges almost surely to the true sampling distribution as $n \\to \\infty$."
      }
    ]
  },
  'module-5': {
    title: "Axiomatic Derivation of Hypothesis Testing, P-Values & Decision Rules",
    steps: [
      {
        step: 1,
        title: "Null Hypothesis as the Skeptical Generative Model",
        content: "In frequentist hypothesis testing, parameter space $\\Theta$ is partitioned into null hypothesis $\\Theta_0$ and alternative hypothesis $\\Theta_1 = \\Theta \\setminus \\Theta_0$. The null hypothesis $H_0: \\theta \\in \\Theta_0$ serves as the default skeptical baseline model. Any observed effect is presumed to be the result of random sampling noise unless proven otherwise."
      },
      {
        step: 2,
        title: "Test Statistic Mapping & Reference Distribution",
        content: "A test statistic $T = t(\\mathbf{X}): \\mathcal{X}^n \\to \\mathbb{R}$ condenses the high-dimensional data vector $\\mathbf{X}$ into a scalar measuring deviation from $H_0$. Under $H_0$, $T$ has a known null distribution $F_0(t)$. For sample mean testing with unknown variance, the pivotal Studentized quantity $T = \\frac{\\bar{X} - \\mu_0}{S / \\sqrt{n}} \\sim t_{n-1}$ eliminates nuisance parameter $\\sigma$."
      },
      {
        step: 3,
        title: "Formal Definition of the P-Value",
        content: "The p-value is the conditional probability, calculated under the assumption that $H_0$ is true, of observing a test statistic at least as extreme as the empirical value $t_{\\text{obs}}$: $p = P(T(\\mathbf{X}) \\ge t_{\\text{obs}} \\mid H_0)$. Under $H_0$, because the CDF of a continuous random variable is uniformly distributed, $p \\sim \\text{Uniform}(0, 1)$. Thus, $P(p \\le \\alpha \\mid H_0) = \\alpha$ exactly."
      },
      {
        step: 4,
        title: "The Neyman-Pearson Decision Framework",
        content: "The Neyman-Pearson lemma proves that for simple hypotheses $H_0: \\theta = \\theta_0$ vs $H_1: \\theta = \\theta_1$, the likelihood ratio test $\\Lambda(\\mathbf{x}) = \\frac{\\mathcal{L}(\\theta_0; \\mathbf{x})}{\\mathcal{L}(\\theta_1; \\mathbf{x})} \\le k$ is the uniformly most powerful (UMP) test of size $\\alpha$. Rejecting $H_0$ when $p \\le \\alpha$ strictly bounds the Type I error rate to $\\alpha$."
      }
    ]
  },
  'module-6': {
    title: "Axiomatic Derivation of Statistical Errors, Power & False Discovery Control",
    steps: [
      {
        step: 1,
        title: "The Binary Decision Matrix & Error Spaces",
        content: "Statistical testing maps data into a binary decision: Accept $H_0$ ($D=0$) or Reject $H_0$ ($D=1$). Two orthogonal errors occur: Type I Error (False Positive) $\\alpha = P(D=1 \\mid H_0)$, and Type II Error (False Negative) $\\beta = P(D=0 \\mid H_1)$. Statistical power is the sensitivity to detect a real effect: $\\text{Power} = 1 - \\beta = P(D=1 \\mid H_1)$."
      },
      {
        step: 2,
        title: "Non-Central Shift & Power Formulation",
        content: "Under alternative hypothesis $H_1: \\mu = \\mu_0 + \\Delta$, the test statistic shifts by non-centrality parameter $\\delta = \\frac{\\Delta}{\\sigma / \\sqrt{n}} = d \\sqrt{n}$, where $d = \\Delta / \\sigma$ is Cohen's effect size. The power formula is given by $1 - \\beta = \\Phi\\left(\\delta - z_{1-\\alpha/2}\\right) + \\Phi\\left(-\\delta - z_{1-\\alpha/2}\\right)$. Solving for sample size yields $n \\ge \\frac{2(z_{1-\\alpha/2} + z_{1-\\beta})^2}{d^2}$."
      },
      {
        step: 3,
        title: "Multiplicity Crisis & Family-Wise Error Rate",
        content: "When testing $m$ independent true null hypotheses at significance level $\\alpha$, the probability of at least one false positive (Family-Wise Error Rate) inflates exponentially: $\\text{FWER} = 1 - (1 - \\alpha)^m$. For $m = 20$ tests at $\\alpha = 0.05$, $\\text{FWER} = 1 - 0.95^{20} = 64.2\\%$; for $m = 100$, $\\text{FWER} = 99.4\\%$. P-hacking exploits this inflation by cherry-picking false positives."
      },
      {
        step: 4,
        title: "Benjamini-Hochberg False Discovery Rate (FDR) Control",
        content: "Benjamini and Hochberg (1995) redefined error control for high-throughput testing by bounding the False Discovery Rate $\\text{FDR} = E[Q] = E[V / \\max(R, 1)] \\le q$. Sorting $p$-values $p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$, the BH step-up threshold finds $k = \\max\\{i : p_{(i)} \\le \\frac{i}{m} q\\}$. By martingale stopping time theory, this guarantees $\\text{FDR} \\le \\frac{m_0}{m} q \\le q$ under independent and PRDS test statistics."
      }
    ]
  },
  'module-7': {
    title: "Axiomatic Derivation of Quantiles, QQ-Plots & Rank Invariance",
    steps: [
      {
        step: 1,
        title: "Generalized Inverse CDF (Quantile Function)",
        content: "For a cumulative distribution function $F$, the quantile function $Q(p) = F^{-1}(p)$ is defined as the generalized inverse: $Q(p) = \\inf \\{x \\in \\mathbb{R} : F(x) \\ge p\\}$ for $p \\in (0, 1)$. By the Probability Integral Transform, if $U \\sim \\text{Uniform}(0, 1)$, then $X = Q(U)$ has distribution function $F_X(x) \\equiv F(x)$."
      },
      {
        step: 2,
        title: "Joint Distribution of Order Statistics",
        content: "Given an i.i.d. sample $X_1, \\dots, X_n$, sorting yields order statistics $X_{(1)} \\le X_{(2)} \\le \\dots \\le X_{(n)}$. The marginal density of the $k$-th order statistic $X_{(k)}$ is $f_{X_{(k)}}(x) = \\frac{n!}{(k-1)!(n-k)!} [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x)$. For standard uniform draws, $U_{(k)} \\sim \\text{Beta}(k, n - k + 1)$ with expected quantile position $E[U_{(k)}] = \\frac{k}{n + 1}$."
      },
      {
        step: 3,
        title: "Linear Invariance of Quantile-Quantile (Q-Q) Plots",
        content: "Let $Y = \\mu + \\sigma X$ be a location-scale transformation of reference variable $X$. The quantile function transforms strictly linearly: $Q_Y(p) = \\mu + \\sigma Q_X(p)$. Plotting empirical sample quantiles $y_{(k)}$ against theoretical reference quantiles $Q_X\\left(\\frac{k - 0.5}{n}\\right)$ produces a straight line with slope equal to scale $\\sigma$ and intercept equal to location $\\mu$. S-shaped curves indicate heavy/light tails; U-shaped curves indicate skewness."
      },
      {
        step: 4,
        title: "Quantile Normalization as Rank-Preserving Projection",
        content: "Given high-dimensional biological array data $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ corrupted by non-biological technical batch effects, quantile normalization enforces identical empirical distributions across all $p$ channels. Sorting each column, computing row-wise mean $\\bar{x}_{(k)} = \\frac{1}{p}\\sum_{j=1}^p X_{(k), j}$, and replacing each original value by the row mean corresponding to its original rank preserves intra-channel ordinal rank information while removing experimental batch shifts."
      }
    ]
  },
  'module-8': {
    title: "Axiomatic Derivation of Covariance, Correlation & Inner-Product Geometry",
    steps: [
      {
        step: 1,
        title: "Bivariate Expectation & Joint Distribution",
        content: "Let $(X, Y)$ be a bivariate random vector defined on probability space $(\\Omega, \\mathcal{F}, P)$ with joint density $f_{X,Y}(x, y)$, marginal expectations $\\mu_X = E[X]$, $\\mu_Y = E[Y]$, and marginal variances $\\sigma_X^2, \\sigma_Y^2$. If $X$ and $Y$ are independent, $f_{X,Y}(x, y) = f_X(x) f_Y(y)$ and $E[XY] = E[X]E[Y]$."
      },
      {
        step: 2,
        title: "Covariance as an L2 Inner Product",
        content: "Covariance is defined as $\\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)] = E[XY] - \\mu_X \\mu_Y$. In the Hilbert space $L^2(P)$ of centered random variables with finite second moments, covariance functions as an inner product: $\\langle U, V \\rangle = E[UV]$, satisfying symmetry $\\text{Cov}(X, Y) = \\text{Cov}(Y, X)$, bilinearity $\\text{Cov}(aX + b, Y) = a\\text{Cov}(X, Y)$, and positivity $\\text{Cov}(X, X) = \\text{Var}(X) \\ge 0$."
      },
      {
        step: 3,
        title: "Cauchy-Schwarz Inequality & Pearson Normalization",
        content: "By the Cauchy-Schwarz inequality for inner-product spaces: $|\\langle U, V \\rangle|^2 \\le \\langle U, U \\rangle \\langle V, V \\rangle \\implies [\\text{Cov}(X, Y)]^2 \\le \\text{Var}(X) \\text{Var}(Y)$. Normalizing covariance by the product of marginal standard deviations yields Pearson's correlation coefficient $\\rho_{X,Y} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$. The Cauchy-Schwarz bound mathematically guarantees $-1 \\le \\rho_{X,Y} \\le +1$, with equality $|\\rho| = 1$ if and only if $Y = aX + b$ almost surely."
      },
      {
        step: 4,
        title: "Geometric Angle Interpretation cos(theta) = r",
        content: "For centered sample vectors $\\mathbf{u} = \\mathbf{x} - \\bar{x}\\mathbf{1}$ and $\\mathbf{v} = \\mathbf{y} - \\bar{y}\\mathbf{1}$ in $\\mathbb{R}^n$, the sample correlation is identical to the cosine of the geometric angle $\\theta$ between the two data vectors: $r = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|} = \\cos(\\theta)$. When $r = 0$, $\\theta = 90^\\circ$ (vectors are orthogonal in sample space); when $r = 1$, $\\theta = 0^\\circ$ (collinear alignment)."
      }
    ]
  },
  'module-9': {
    title: "Axiomatic Derivation of Likelihood, Score Functions & Maximum Likelihood Estimation",
    steps: [
      {
        step: 1,
        title: "The Directional Inversion: Probability vs Likelihood",
        content: "Let $f(\\mathbf{x}; \\theta)$ be the joint probability density function of sample $\\mathbf{x} = (x_1, \\dots, x_n)$ given parameter $\\theta \\in \\Theta$. When parameter $\\theta$ is fixed, $f(\\mathbf{x}; \\theta)$ is a function of $\\mathbf{x}$ integrating to 1 over $\\mathcal{X}$. In contrast, after sample $\\mathbf{x}$ is observed, the Likelihood function $\\mathcal{L}(\\theta; \\mathbf{x}) = \\prod_{i=1}^n f(x_i; \\theta)$ is a function of parameter $\\theta$ with data $\\mathbf{x}$ fixed. Likelihood measures plausibility, NOT probability (it does NOT integrate to 1 over $\\Theta$)."
      },
      {
        step: 2,
        title: "Log-Likelihood Transformation",
        content: "Because multiplying small probabilities causes numerical underflow and makes differentiation of products unwieldy, we apply the strictly monotonic concave logarithmic transformation $\\ell(\\theta) = \\ln \\mathcal{L}(\\theta; \\mathbf{x}) = \\sum_{i=1}^n \\ln f(x_i; \\theta)$. Because $\\ln$ is strictly increasing, $\\arg\\max_\\theta \\mathcal{L}(\\theta) = \\arg\\max_\\theta \\ell(\\theta)$, converting products into manageable additive sums."
      },
      {
        step: 3,
        title: "Score Function & First-Order Optimization",
        content: "The Score Function is the gradient of the log-likelihood: $S(\\theta) = \\nabla_\\theta \\ell(\\theta) = \\sum_{i=1}^n \\frac{\\partial \\ln f(x_i; \\theta)}{\\partial \\theta}$. Under standard regularity conditions (differentiating under the integral sign), the expected score is zero: $E[S(\\theta)] = \\mathbf{0}$. The Maximum Likelihood Estimator $\\hat{\\theta}_{\\text{MLE}}$ solves the stationary normal equation $S(\\hat{\\theta}) = \\mathbf{0}$, with negative definite Hessian matrix $\\mathcal{H}(\\hat{\\theta}) < 0$ ensuring a global peak."
      },
      {
        step: 4,
        title: "Fisher Information & Cramér-Rao Asymptotic Efficiency",
        content: "Fisher Information is defined as $I(\\theta) = E\\left[\\left(\\frac{\\partial \\ln f}{\\partial \\theta}\\right)^2\\right] = -E\\left[\\frac{\\partial^2 \\ln f}{\\partial \\theta^2}\\right]$, quantifying the expected curvature of the log-likelihood peak. The Cramér-Rao inequality establishes that any unbiased estimator has variance $\\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{n I(\\theta)}$. By Wilks and Wald theorems, MLE achieves this minimum variance asymptotically: $\\sqrt{n}(\\hat{\\theta}_{\\text{MLE}} - \\theta) \\xrightarrow{d} \\mathcal{N}(0, I(\\theta)^{-1})$."
      }
    ]
  },
  'module-10': {
    title: "Axiomatic Derivation of Linear Models, OLS & ANOVA Decomposition",
    steps: [
      {
        step: 1,
        title: "Linear Data Generating Process",
        content: "We postulate the matrix linear model $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$, where $\\mathbf{y} \\in \\mathbb{R}^n$ is the response vector, $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ is the full-rank design matrix with $\\text{rank}(\\mathbf{X}) = p < n$, $\\boldsymbol{\\beta} \\in \\mathbb{R}^p$ is the unknown parameter vector, and disturbance vector $\\boldsymbol{\\epsilon}$ satisfies the Gauss-Markov assumptions: $E[\\boldsymbol{\\epsilon}] = \\mathbf{0}$ and $\\text{Cov}(\\boldsymbol{\\epsilon}) = \\sigma^2 \\mathbf{I}_n$."
      },
      {
        step: 2,
        title: "Orthogonal Projection & Normal Equations",
        content: "The Ordinary Least Squares (OLS) objective minimizes the Euclidean norm of residual errors: $S(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^2 = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})$. Differentiating with respect to $\\boldsymbol{\\beta}$: $\\nabla_{\\boldsymbol{\\beta}} S = -2\\mathbf{X}^T(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = \\mathbf{0}$. This yields the fundamental Normal Equations $\\mathbf{X}^T\\mathbf{X}\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}^T\\mathbf{y}$, giving unique solution $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}$."
      },
      {
        step: 3,
        title: "The Gauss-Markov Theorem (BLUE)",
        content: "The Gauss-Markov theorem proves that among all linear unbiased estimators $\\tilde{\\boldsymbol{\\beta}} = \\mathbf{C}\\mathbf{y}$ satisfying $E[\\tilde{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta}$, the OLS estimator $\\hat{\\boldsymbol{\\beta}}$ has the minimal sampling variance in the positive semidefinite ordering: $\\text{Var}(\\tilde{\\boldsymbol{\\beta}}) - \\text{Var}(\\hat{\\boldsymbol{\\beta}}) \\ge 0$. Thus, OLS is the Best Linear Unbiased Estimator (BLUE)."
      },
      {
        step: 4,
        title: "Pythagorean Variance Decomposition & Unified ANOVA F-Test",
        content: "Because fitted vector $\\hat{\\mathbf{y}} = \\mathbf{P}\\mathbf{y}$ is an orthogonal projection via hat matrix $\\mathbf{P} = \\mathbf{X}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T$, the residual vector $\\mathbf{e} = (\\mathbf{I} - \\mathbf{P})\\mathbf{y}$ is strictly orthogonal to $\\hat{\\mathbf{y}}$: $\\mathbf{e}^T\\hat{\\mathbf{y}} = 0$. By the Pythagorean theorem in $\\mathbb{R}^n$, Total Sum of Squares decomposes exactly: $SS_{\\text{tot}} = SS_{\\text{model}} + SS_{\\text{res}}$. The coefficient of determination is $R^2 = \\frac{SS_{\\text{model}}}{SS_{\\text{tot}}}$, and the overall model $F$-statistic $F = \\frac{SS_{\\text{model}} / (p - 1)}{SS_{\\text{res}} / (n - p)} \\sim F_{p-1, n-p}$ unifies ANOVA and regression."
      }
    ]
  },
  'module-11': {
    title: "Axiomatic Derivation of Bayesian Foundations, Conditional Probability & Odds",
    steps: [
      {
        step: 1,
        title: "Kolmogorov's Product Rule & Conditional Probability",
        content: "For events $A, B \\in \\mathcal{F}$ with $P(B) > 0$, conditional probability is defined as the measure of $A$ restricted to subspace $B$: $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$. By symmetry of the joint intersection $A \\cap B = B \\cap A$, the product rule yields $P(A \\cap B) = P(A \\mid B)P(B) = P(B \\mid A)P(A)$."
      },
      {
        step: 2,
        title: "Law of Total Probability & Normalizing Evidence",
        content: "Let $\\{H_1, H_2, \\dots, H_K\\}$ form a disjoint partition of sample space $\\Omega$ such that $\\bigcup_{i=1}^K H_i = \\Omega$ and $H_i \\cap H_j = \\emptyset$ for $i \\ne j$. By countable additivity, the total marginal probability of observing evidence $D$ decomposes into the weighted mixture $P(D) = \\sum_{i=1}^K P(D \\mid H_i)P(H_i)$. This denominator guarantees that all posterior probabilities sum strictly to 1.0."
      },
      {
        step: 3,
        title: "Bayes' Theorem: Prior to Posterior Updating",
        content: "Combining the product rule and total probability yields Bayes' Theorem: $P(H_k \\mid D) = \\frac{P(D \\mid H_k) P(H_k)}{\\sum_{i=1}^K P(D \\mid H_i) P(H_i)}$. In words: $\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}$. For rare disease screening where disease prevalence $P(H_1) = 0.1\\%$, even with $99\\%$ test specificity and sensitivity, $P(\\text{Disease} \\mid \\text{Positive Test}) \\approx \\frac{0.99 \\times 0.001}{0.99 \\times 0.001 + 0.01 \\times 0.999} \\approx 9\\%$ (the base rate fallacy)."
      },
      {
        step: 4,
        title: "Odds Formulation & The Bayes Factor",
        content: "Odds express probability as a ratio of favoring to opposing weights: $\\text{Odds}(E) = \\frac{P(E)}{1 - P(E)}$. Dividing the posterior probabilities of two competing hypotheses $H_1$ and $H_0$ eliminates the normalizing marginal denominator $P(D)$: $\\frac{P(H_1 \\mid D)}{P(H_0 \\mid D)} = \\frac{P(H_1)}{P(H_0)} \\times \\frac{P(D \\mid H_1)}{P(D \\mid H_0)}$. In words: $\\text{Posterior Odds} = \\text{Prior Odds} \\times \\text{Bayes Factor}$. Taking the logarithm yields an additive information evidence score $\\text{logit}(P(H_1 \\mid D)) = \\text{logit}(P(H_1)) + \\ln(\\text{BF})$."
      }
    ]
  }
};
