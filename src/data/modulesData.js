// src/data/modulesData.js
/**
 * 11 Thematic Modules grouping the 62 StatQuest Statistics Fundamentals videos.
 */

export const modulesData = [
  {
    "id": "module-1",
    "number": 1,
    "title": "Descriptive Statistics & Data Foundations",
    "description": "The fundamental building blocks of data visualization, central tendency, scale transformations, and exploratory data analysis.",
    "icon": "bar-chart-2",
    "color": "#3B82F6",
    "videoIndices": [1, 4, 32, 33, 34]
  },
  {
    "id": "module-2",
    "number": 2,
    "title": "Probability Distributions & Random Variables",
    "description": "Understanding PDFs, CDFs, continuous vs discrete variables, Gaussian, Exponential, and Binomial distributions from first principles.",
    "icon": "activity",
    "color": "#8B5CF6",
    "videoIndices": [2, 3, 5, 22, 23, 24, 46]
  },
  {
    "id": "module-3",
    "number": 3,
    "title": "Population Parameters, Samples & Spread",
    "description": "Greek vs Latin notation, sample variance, standard deviation vs standard error, degrees of freedom, and why we divide by N-1.",
    "icon": "target",
    "color": "#10B981",
    "videoIndices": [6, 7, 26, 27, 28, 29, 62]
  },
  {
    "id": "module-4",
    "number": 4,
    "title": "Central Limit Theorem, Bootstrapping & Resampling",
    "description": "The miracle of the Central Limit Theorem, empirical resampling, non-parametric inference, and confidence interval coverage.",
    "icon": "repeat",
    "color": "#F59E0B",
    "videoIndices": [25, 30, 31, 35]
  },
  {
    "id": "module-5",
    "number": 5,
    "title": "Hypothesis Testing, P-Values & Significance",
    "description": "The null hypothesis as the default skeptical prior, p-value calculations, one vs two tails, t-test selections, and the BAM moment.",
    "icon": "help-circle",
    "color": "#EC4899",
    "videoIndices": [8, 9, 10, 11, 13, 47, 48, 49, 50]
  },
  {
    "id": "module-6",
    "number": 6,
    "title": "Statistical Errors, Power & Multiple Testing",
    "description": "Type I vs Type II errors, statistical power (1 - beta), power calculations, p-hacking hazards, and False Discovery Rate (FDR).",
    "icon": "shield-alert",
    "color": "#EF4444",
    "videoIndices": [12, 14, 15, 16, 17]
  },
  {
    "id": "module-7",
    "number": 7,
    "title": "Quantiles, QQ-Plots & Normalization",
    "description": "Quantiles, percentiles, diagnosing normality with Quantile-Quantile (Q-Q) plots, and quantile normalization across datasets.",
    "icon": "git-commit",
    "color": "#6366F1",
    "videoIndices": [51, 52, 53]
  },
  {
    "id": "module-8",
    "number": 8,
    "title": "Covariance, Correlation & Bivariate Analysis",
    "description": "Measuring joint variation between random variables, scale sensitivity, Pearson's r coefficient, and geometric interpretation.",
    "icon": "compass",
    "color": "#14B8A6",
    "videoIndices": [18, 19]
  },
  {
    "id": "module-9",
    "number": 9,
    "title": "Probability vs Likelihood & Maximum Likelihood Estimation",
    "description": "The crucial distinction between probability and likelihood, log-likelihood derivation, and finding parameter peaks for various distributions.",
    "icon": "maximize-2",
    "color": "#F97316",
    "videoIndices": [54, 55, 56, 57, 58]
  },
  {
    "id": "module-10",
    "number": 10,
    "title": "Regression, Linear Models & ANOVA",
    "description": "Least squares line fitting, R-squared variance explained, Loess smoothing, multiple regression planes, design matrices, and unifying ANOVA.",
    "icon": "trending-up",
    "color": "#06B6D4",
    "videoIndices": [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    "id": "module-11",
    "number": 11,
    "title": "Bayesian Foundations, Conditional Probability & Odds",
    "description": "Conditional probabilities, Bayes' Theorem, false positive paradox, odds vs log-odds, odds ratios in medical epidemiology, and Frank Starmer's wisdom.",
    "icon": "layers",
    "color": "#84CC16",
    "videoIndices": [20, 21, 59, 60, 61]
  }
];
