# scripts/curriculum_group3.py
"""
Rich pedagogical content for videos 31 to 45.
"""

GROUP_3 = {
    31: {
        "shortTitle": "Bootstrapping p-values",
        "moduleId": "module-4",
        "category": "CLT & Bootstrapping",
        "duration": "8:15",
        "summary": "Using non-parametric permutation and bootstrap shifting under the null hypothesis to compute empirical p-values without normality assumptions.",
        "bamIntuition": "Shift your data so the null hypothesis is true (make group means match!). Resample from that shifted world thousands of times. The fraction of resamples that beat your real observed difference is your exact empirical p-value! BAM!",
        "firstPrinciples": "To test $H_0: \\mu_1 = \\mu_2$ non-parametrically, we construct a data world where $H_0$ holds exactly. In permutation testing, we pool all observations $N = n_1 + n_2$, randomly shuffle group labels without replacement, and compute the test statistic $T^{*(b)} = \\bar{X}_1^* - \\bar{X}_2^*$. In bootstrap hypothesis testing, we mean-center both groups so $\\bar{x}_1^{\\text{shifted}} = \\bar{x}_2^{\\text{shifted}} = \\bar{x}_{\\text{pooled}}$, draw bootstrap samples with replacement, and calculate: $p = \\frac{1 + \\sum_{b=1}^B \\mathbf{1}_{|T^{*(b)}| \\ge |T_{\\text{obs}}|}}{B + 1}$.",
        "mathFormulas": [
            {"name": "Empirical Bootstrap p-value", "latex": "p_{\\text{boot}} = \\frac{1 + \\sum_{b=1}^B \\mathbf{1}_{\\{|T^{*(b)}| \\ge |t_{\\text{obs}}|\\}}}{B + 1}", "explanation": "Proportion of resampled test statistics as extreme as observed, with +1 continuity correction."},
            {"name": "Null Shift Transformation", "latex": "\\tilde{x}_{1i} = x_{1i} - \\bar{x}_1 + \\bar{x}_{\\text{pool}}", "explanation": "Enforces the null condition while preserving higher-order moments of original samples."}
        ],
        "numericalExample": "Group A: [10, 12, 14] (mean 12). Group B: [16, 18, 20] (mean 18). Observed difference = 6.0. Pool = [10, 12, 14, 16, 18, 20]. In 1,000 permutations, only 2 permutations yield a difference >= 6.0. Two-tailed p-value = (2 * 2 + 1) / (1000 + 1) = 5 / 1001 = 0.005.",
        "pythonCode": "import numpy as np\n\ngroup_a = np.array([10, 12, 14])\ngroup_b = np.array([16, 18, 20])\nobs_diff = np.abs(np.mean(group_b) - np.mean(group_a))\npooled = np.concatenate([group_a, group_b])\n\nB = 5000\ncount = 0\nfor _ in range(B):\n    shuffled = np.random.permutation(pooled)\n    diff = np.abs(np.mean(shuffled[len(group_a):]) - np.mean(shuffled[:len(group_a)]))\n    if diff >= obs_diff:\n        count += 1\n\nprint(f'Permutation p-value: {(count + 1) / (B + 1):.4f}')",
        "rCode": "a <- c(10, 12, 14); b <- c(16, 18, 20)\nobs <- abs(mean(b) - mean(a))\npool <- c(a, b)\nnull_dist <- replicate(5000, {\n  idx <- sample(length(pool), length(a))\n  abs(mean(pool[-idx]) - mean(pool[idx]))\n})\ncat('p-val:', mean(null_dist >= obs))",
        "pitfalls": "Failing to add the +1 correction in numerator and denominator, which could spuriously yield p = 0 if no resample exceeds the observed value (a p-value cannot be strictly 0).",
        "interactiveType": "bootstrap_p",
        "quiz": [
            {
                "question": "Why can an empirical bootstrap or permutation p-value never be strictly equal to 0.0000?",
                "options": ["Computers cannot store zero", "The observed data itself represents one valid possible permutation under the null (+1 rule)", "Because bootstrap is always two-tailed", "It can be zero if B > 100,000"],
                "answer": 1,
                "explanation": "Standard statistical practice adds +1 to numerator and denominator (including the observed test statistic itself as a member of the permutation distribution)."
            }
        ]
    },
    32: {
        "shortTitle": "Bar Charts vs Pie Charts",
        "moduleId": "module-1",
        "category": "Descriptive Statistics",
        "duration": "4:30",
        "summary": "Human visual perception decodes linear lengths along an aligned scale with far greater precision than 2D angles, slice areas, or 3D perspective slices.",
        "bamIntuition": "Pie charts force your brain to judge weird angles and circular wedges. Bar charts align everything on a clean flat baseline! Length is instant and effortless to compare. Never use pie charts! BAM!",
        "firstPrinciples": "According to Cleveland and McGill's seminal 1984 psychophysical hierarchy of visual perception, graphical elements are ranked in decreasing order of human decoding accuracy: 1. Position along a common scale (Bar chart); 2. Position along non-aligned scales; 3. Length; 4. Direction / Angle (Pie chart); 5. Area; 6. Volume; 7. Color saturation. Pie charts fail because judgment of angles and curved arc lengths induces high perceptual variance and systematic distortion, especially with 3D tilts.",
        "mathFormulas": [
            {"name": "Linear Encoding Accuracy", "latex": "\\text{Perceptual Error}(\\text{Angle}) \\gg \\text{Perceptual Error}(\\text{Position on common scale})", "explanation": "Empirical psychophysics proves position on a baseline outperforms angular estimation."},
            {"name": "Slice Angle Formula", "latex": "\\theta_i = 360^\\circ \\times \\frac{x_i}{\\sum x_j}", "explanation": "Maps frequency to degrees of an arc."}
        ],
        "numericalExample": "Categories: A: 24%, B: 26%, C: 25%, D: 25%. In a pie chart, human observers cannot reliably identify whether B is larger than A. In a bar chart aligned at 0%, the difference between 24% and 26% is immediately obvious.",
        "pythonCode": "import matplotlib.pyplot as plt\n\ncategories = ['A', 'B', 'C', 'D']\nvalues = [24, 26, 25, 25]\n\nfig, ax = plt.subplots(figsize=(6, 3))\nax.bar(categories, values, color='#3B82F6')\nax.set_ylim(0, 30)\nax.set_ylabel('Percentage (%)')\nax.set_title('Clear Perception with Bar Chart')",
        "rCode": "barplot(c(A=24, B=26, C=25, D=25), col='steelblue', ylim=c(0, 30), ylab='%')",
        "pitfalls": "Using 3D 'exploded' pie charts in business presentations, which distort relative proportions even further through perspective foreshortening.",
        "interactiveType": "bar_vs_pie",
        "quiz": [
            {
                "question": "According to Cleveland and McGill's visual perception hierarchy, which visual channel is decoded most accurately by the human visual cortex?",
                "options": ["Angle and slope", "Color hue and shade", "Position along a common aligned scale", "2D surface area"],
                "answer": 2,
                "explanation": "Position along a common baseline (as in bar charts) is decoded with the lowest cognitive error."
            }
        ]
    },
    33: {
        "shortTitle": "Boxplots are Awesome",
        "moduleId": "module-1",
        "category": "Descriptive Statistics",
        "duration": "5:40",
        "summary": "Tukey's five-number summary: minimum, Q1 (25th percentile), median (50th percentile), Q3 (75th percentile), maximum, and outlier whiskers.",
        "bamIntuition": "The box holds the middle 50% of your data (the IQR). The line inside is the median. The whiskers stretch 1.5 times the IQR. Anything outside is an outlier! Clean, compact, awesome! BAM!",
        "firstPrinciples": "A boxplot visually encodes John Tukey's five-number summary. The Interquartile Range $\\text{IQR} = Q_3 - Q_1$ contains the central 50% of observations. Whiskers extend to the most extreme data point within the Tukey fences: $[Q_1 - 1.5\\cdot\\text{IQR}, \\, Q_3 + 1.5\\cdot\\text{IQR}]$. For a Gaussian distribution, $Q_1 = \\mu - 0.6745\\sigma$ and $Q_3 = \\mu + 0.6745\\sigma$, so $\\text{IQR} \\approx 1.349\\sigma$, and the whisker fence reaches $\\pm 2.698\\sigma$ (capturing 99.3% of normal data; points beyond are flagged as outliers).",
        "mathFormulas": [
            {"name": "Interquartile Range", "latex": "\\text{IQR} = Q_3 - Q_1", "explanation": "Spread of the central 50% of the distribution."},
            {"name": "Tukey Outlier Fences", "latex": "\\text{Fence}_{\\text{upper}} = Q_3 + 1.5 \\times \\text{IQR}, \\quad \\text{Fence}_{\\text{lower}} = Q_1 - 1.5 \\times \\text{IQR}", "explanation": "Threshold beyond which data points are plotted as individual outlier dots."}
        ],
        "numericalExample": "Data: [10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60]. Median = 24. Q1 = 18, Q3 = 30. IQR = 30 - 18 = 12. Upper fence = 30 + (1.5 * 12) = 30 + 18 = 48. Value 60 > 48, so 60 is flagged as an outlier dot! Upper whisker stops at 32.",
        "pythonCode": "import matplotlib.pyplot as plt\n\ndata = [10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60]\nplt.boxplot(data, vert=False)\nplt.title('Boxplot with Outlier at 60')",
        "rCode": "data <- c(10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60)\nboxplot(data, horizontal=TRUE)",
        "pitfalls": "Failing to recognize multimodal data. A bimodal distribution with two distinct peaks looks like a regular symmetric boxplot; always pair boxplots with stripcharts or violin plots.",
        "interactiveType": "boxplot",
        "quiz": [
            {
                "question": "What percentage of data is contained strictly inside the rectangular box of a boxplot?",
                "options": ["25%", "50%", "75%", "95%"],
                "answer": 1,
                "explanation": "The box spans from Q1 (25th percentile) to Q3 (75th percentile), enclosing exactly the middle 50% of the sample."
            }
        ]
    },
    34: {
        "shortTitle": "Logs (Logarithms), Clearly Explained",
        "moduleId": "module-1",
        "category": "Descriptive Statistics",
        "duration": "6:10",
        "summary": "Logarithmic transformations linearize multiplicative processes, stabilize heteroscedastic variance, and compress wide dynamic scales into symmetric distributions.",
        "bamIntuition": "A 2-fold increase (from 10 to 20) is +10. But a 2-fold increase from 1000 to 2000 is +1000! Taking logs makes a 2-fold change look the same size anywhere on the graph! Multiplicative becomes additive! BAM!",
        "firstPrinciples": "The logarithm $\\log_b(x)$ is the inverse of exponentiation: $y = \\log_b(x) \\iff b^y = x$. Crucial mathematical properties: 1. $\\log(u \\cdot v) = \\log(u) + \\log(v)$; 2. $\\log(u / v) = \\log(u) - \\log(v)$; 3. $\\log(u^k) = k \\log(u)$. In statistical modeling, when multiplicative errors occur ($Y = e^{\\beta X} \\cdot \\epsilon$), taking the log yields an additive linear model: $\\ln Y = \\beta X + \\ln \\epsilon$. For log-normal variables, $\\ln X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, making standard linear methods applicable.",
        "mathFormulas": [
            {"name": "Multiplication to Addition", "latex": "\\log_b(x \\cdot y) = \\log_b(x) + \\log_b(y)", "explanation": "Transforms multiplicative scale factors into additive shifts."},
            {"name": "Log-Ratio Symmetry", "latex": "\\log_2(2/1) = +1, \\quad \\log_2(1/2) = -1", "explanation": "Equal magnitude for doubling and halving."}
        ],
        "numericalExample": "Comparing gene expression: Control = 1.0. Gene A is doubled (2.0): Ratio = 2.0/1.0 = 2.0. Gene B is halved (0.5): Ratio = 0.5/1.0 = 0.5. On a raw scale, doubling is a jump of +1.0, while halving is a jump of only -0.5 (asymmetric!). In log2 space: log2(2) = +1.0, log2(0.5) = -1.0. Perfect symmetry!",
        "pythonCode": "import numpy as np\n\nratios = np.array([0.1, 0.5, 1.0, 2.0, 10.0])\nlog2_ratios = np.log2(ratios)\nprint('Raw ratios: ', ratios)\nprint('Log2 ratios:', log2_ratios)",
        "rCode": "ratios <- c(0.1, 0.5, 1, 2, 10)\nlog2(ratios)",
        "pitfalls": "Attempting to take the logarithm of zero or negative numbers ($\log(0) = -\\infty$). For count data with zeros, practitioners use $\\log(x + 1)$ (pseudocounts).",
        "interactiveType": "log_transform",
        "quiz": [
            {
                "question": "What is the value of log2(1/8)?",
                "options": ["-3", "3", "-0.125", "0"],
                "answer": 0,
                "explanation": "Because 2^(-3) = 1 / (2^3) = 1/8, log2(1/8) = -3."
            }
        ]
    },
    35: {
        "shortTitle": "Confidence Intervals",
        "moduleId": "module-4",
        "category": "CLT & Bootstrapping",
        "duration": "8:25",
        "summary": "Frequentist confidence intervals: In repeated sampling, 95% of constructed intervals contain the true, fixed population parameter.",
        "bamIntuition": "A confidence interval is a net you toss into the lake! The fish (true population mean) isn't swimming around—it's frozen in place. If you toss 100 nets, 95 of them will catch the fish! BAM!",
        "firstPrinciples": "Let $\\theta$ be a fixed, deterministic population parameter. A $100(1-\\alpha)\\%$ confidence interval $[L(\\mathbf{X}), U(\\mathbf{X})]$ is a random interval satisfying: $P(L(\\mathbf{X}) \\le \\theta \\le U(\\mathbf{X})) = 1 - \\alpha$. For sample mean from normal distribution with unknown $\\sigma$, the pivotal quantity $T = \\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} \\sim t_{n-1}$ yields: $\\text{CI} = \\left[ \\bar{x} - t_{1-\\alpha/2, n-1}\\frac{s}{\\sqrt{n}}, \\; \\bar{x} + t_{1-\\alpha/2, n-1}\\frac{s}{\\sqrt{n}} \\right]$.",
        "mathFormulas": [
            {"name": "Frequentist Coverage Probability", "latex": "P\\left( \\bar{X} - t^* \\frac{s}{\\sqrt{n}} \\le \\mu \\le \\bar{X} + t^* \\frac{s}{\\sqrt{n}} \\right) = 0.95", "explanation": "The endpoints are random variables; mu is a fixed constant."},
            {"name": "Margin of Error", "latex": "\\text{ME} = t_{1-\\alpha/2, n-1} \\cdot \\frac{s}{\\sqrt{n}}", "explanation": "Half-width of the confidence interval."}
        ],
        "numericalExample": "Sample n = 25, mean x_bar = 50, s = 10. SE = 10 / sqrt(25) = 2.0. Degrees of freedom = 24. For 95% confidence, t* = 2.064. Margin of Error = 2.064 * 2.0 = 4.128. 95% CI = [50 - 4.128, 50 + 4.128] = [45.87, 54.13].",
        "pythonCode": "from scipy import stats\nimport numpy as np\n\nn = 25\nx_bar = 50\ns = 10\nse = s / np.sqrt(n)\nci = stats.t.interval(0.95, df=n-1, loc=x_bar, scale=se)\nprint(f'95% Confidence Interval: [{ci[0]:.2f}, {ci[1]:.2f}]')",
        "rCode": "t.test(rnorm(25, mean=50, sd=10))$conf.int",
        "pitfalls": "Saying 'There is a 95% probability that the true mean is between 45.87 and 54.13.' In frequentist statistics, the parameter is fixed: it is either 100% inside or 100% outside; the 95% applies to the repeated procedure.",
        "interactiveType": "confidence_intervals",
        "quiz": [
            {
                "question": "What is the correct frequentist interpretation of a 95% confidence interval?",
                "options": ["There is a 95% chance the true mean lies in this specific interval", "In 95% of repeated experiments from the same population, the calculated intervals will capture the true parameter", "95% of individual data points fall inside the interval", "The sample mean is within 5% of truth"],
                "answer": 1,
                "explanation": "Frequentist confidence describes the long-run capture rate across hypothetical repeated samplings."
            }
        ]
    },
    36: {
        "shortTitle": "R-squared, Clearly Explained",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "7:55",
        "summary": "The coefficient of determination (R^2) quantifies the proportion of total variation in the response variable explained by the regression model.",
        "bamIntuition": "Compare two models: 1. A stupid flat line at the average Y. 2. Your regression line. How much did your line reduce the sum of squared errors compared to the flat line? That percentage reduction is R-squared! BAM!",
        "firstPrinciples": "Total Sum of Squares decomposes orthogonally: $SS_{\\text{tot}} = SS_{\\text{reg}} + SS_{\\text{res}}$, where $SS_{\\text{tot}} = \\sum (y_i - \\bar{y})^2$ and $SS_{\\text{res}} = \\sum (y_i - \\hat{y}_i)^2$. The coefficient of determination is defined as $R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}} = \\frac{SS_{\\text{reg}}}{SS_{\\text{tot}}}$. For simple univariate linear regression, $R^2 = r_{xy}^2$ (the squared Pearson correlation). Adjusted $R^2 = 1 - \\left[\\frac{(1 - R^2)(n - 1)}{n - p - 1}\\right]$ penalizes adding useless predictors.",
        "mathFormulas": [
            {"name": "R-squared Formula", "latex": "R^2 = 1 - \\frac{\\sum_{i=1}^n (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^n (y_i - \\bar{y})^2}", "explanation": "Fraction of variance explained relative to a horizontal mean line."},
            {"name": "Adjusted R-squared", "latex": "R^2_{\\text{adj}} = 1 - \\frac{SS_{\\text{res}} / (n - p - 1)}{SS_{\\text{tot}} / (n - 1)}", "explanation": "Penalizes inclusion of redundant predictor variables p."}
        ],
        "numericalExample": "Data: Y = [2, 4, 6, 8, 10]. y_bar = 6. SS_tot = (-4)^2 + (-2)^2 + 0^2 + 2^2 + 4^2 = 16 + 4 + 0 + 4 + 16 = 40. Model predictions: y_hat = [2.2, 3.8, 6.1, 7.9, 10.0]. Residuals: [-0.2, +0.2, -0.1, +0.1, 0.0]. SS_res = 0.04 + 0.04 + 0.01 + 0.01 + 0 = 0.10. R^2 = 1 - (0.10 / 40) = 1 - 0.0025 = 0.9975 (99.75% of variance explained!).",
        "pythonCode": "from sklearn.metrics import r2_score\nimport numpy as np\n\ny_true = np.array([2, 4, 6, 8, 10])\ny_pred = np.array([2.2, 3.8, 6.1, 7.9, 10.0])\nr2 = r2_score(y_true, y_pred)\nprint(f'R-squared: {r2:.4f}')",
        "rCode": "y <- c(2, 4, 6, 8, 10)\nfit <- lm(y ~ c(1, 2, 3, 4, 5))\nsummary(fit)$r.squared",
        "pitfalls": "Assuming a high R^2 means the model is correct. Anscombe's quartet shows datasets with identical R^2 = 0.67 that are parabolic or dominated by single outliers.",
        "interactiveType": "r_squared",
        "quiz": [
            {
                "question": "What does R^2 = 0 mean for a linear regression model?",
                "options": ["The model makes no errors", "The regression line explains zero variance beyond simply guessing the mean y_bar for every prediction", "The slope is infinite", "Data points are negative"],
                "answer": 1,
                "explanation": "If SS_res = SS_tot, the model provides zero predictive improvement over the naive baseline of predicting the sample mean."
            }
        ]
    },
    37: {
        "shortTitle": "The Essence of Linear Regression",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "8:30",
        "summary": "Linear regression establishes a straight-line relationship between an independent feature X and a dependent target Y by minimizing the vertical residuals.",
        "bamIntuition": "Draw a line through a scatter of dots. Every dot has a vertical distance (residual) to the line. Square those distances, add them up, and wiggle the line until that sum is as tiny as possible! BAM: Linear Regression!",
        "firstPrinciples": "Given bivariate observations $(x_1, y_1), \\dots, (x_n, y_n)$, we postulate the relationship $y_i = \\beta_0 + \\beta_1 x_i + \\epsilon_i$, with $E[\\epsilon_i] = 0$. The Ordinary Least Squares (OLS) objective minimizes the residual sum of squares: $S(\\beta_0, \\beta_1) = \\sum_{i=1}^n (y_i - (\\beta_0 + \\beta_1 x_i))^2$. Taking partial derivatives $\\frac{\\partial S}{\\partial \\beta_0} = 0$ and $\\frac{\\partial S}{\\partial \\beta_1} = 0$ yields the normal equations, guaranteeing a unique global minimum.",
        "mathFormulas": [
            {"name": "OLS Objective Function", "latex": "\\min_{\\beta_0, \\beta_1} \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 x_i)^2", "explanation": "Minimizing the sum of squared vertical residuals."},
            {"name": "Residual Definition", "latex": "e_i = y_i - \\hat{y}_i = y_i - (\\hat{\\beta}_0 + \\hat{\\beta}_1 x_i)", "explanation": "Vertical distance between observed target and fitted line."}
        ],
        "numericalExample": "Points: (1, 2), (2, 3), (3, 5). x_bar = 2, y_bar = 3.33. Cov(x, y) = 1.5, Var(x) = 1.0. Slope beta1 = 1.5 / 1.0 = 1.5. Intercept beta0 = 3.33 - (1.5 * 2) = 0.33. Line equation: y = 0.33 + 1.5x.",
        "pythonCode": "import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 3, 5])\nslope, intercept = np.polyfit(x, y, 1)\nprint(f'Fitted Line: Y = {intercept:.2f} + {slope:.2f} * X')",
        "rCode": "fit <- lm(c(2, 3, 5) ~ c(1, 2, 3))\ncoef(fit)",
        "pitfalls": "Minimizing perpendicular distance instead of vertical distance. OLS minimizes strictly vertical error in Y because X is assumed to be known without measurement error.",
        "interactiveType": "regression_intro",
        "quiz": [
            {
                "question": "Why does OLS minimize vertical distance rather than horizontal or perpendicular distance to the line?",
                "options": ["It is easier to calculate", "Because X is assumed fixed/independent and our goal is to minimize error in predicting Y", "Vertical lines are straight", "To avoid negative numbers"],
                "answer": 1,
                "explanation": "Standard regression minimizes prediction error along the target axis Y conditional on known predictor values X."
            }
        ]
    },
    38: {
        "shortTitle": "Fitting a Line to Data (Least Squares)",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "9:10",
        "summary": "Exploring the 3D loss surface of Least Squares and how rotating and shifting the line explores the parabolic bowl of residual sums.",
        "bamIntuition": "Imagine rotating the line on a pivot. As the slope changes, the sum of squared residuals traces out a beautiful 3D bowl! The bottom of the bowl is where the residuals are smallest. BAM!",
        "firstPrinciples": "The loss function $J(\\beta_0, \\beta_1) = \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 x_i)^2$ is a strictly convex quadratic form in $(\\beta_0, \\beta_1)$. Its Hessian matrix $\\mathbf{H} = 2 \\begin{bmatrix} n & \\sum x_i \\\\ \\sum x_i & \\sum x_i^2 \\end{bmatrix}$ is positive definite whenever at least two distinct $x$ values exist. This guarantees that the loss surface is an elliptical paraboloid with a unique global minimum.",
        "mathFormulas": [
            {"name": "Quadratic Loss Surface", "latex": "J(\\boldsymbol{\\beta}) = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})", "explanation": "Convex paraboloid in parameter space."},
            {"name": "Normal Equations", "latex": "\\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}", "explanation": "Condition for the gradient of the loss surface to equal zero."}
        ],
        "numericalExample": "For data points (1, 1), (2, 3), (3, 2). Centering data: x_c = [-1, 0, +1], y_c = [-1, +1, 0]. Slope beta1 = sum(x_c * y_c) / sum(x_c^2) = (1 + 0 + 0) / (1 + 0 + 1) = 0.5. At beta1 = 0.5, SSR is minimized at 1.5. Any other slope (e.g. 0.0 or 1.0) produces higher SSR.",
        "pythonCode": "import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([1, 3, 2])\n# Evaluate SSR for various candidate slopes\nfor slope in [0.0, 0.5, 1.0]:\n    pred = np.mean(y) + slope * (x - np.mean(x))\n    ssr = np.sum((y - pred)**2)\n    print(f'Slope: {slope:.1f} -> SSR: {ssr:.2f}')",
        "rCode": "x <- c(1, 2, 3); y <- c(1, 3, 2)\nlm(y ~ x)",
        "pitfalls": "Assuming Least Squares is robust to extreme outliers. Squaring residuals means an outlier with error 10 exerts 100x the influence of an error of 1, severely pulling the fitted line.",
        "interactiveType": "least_squares_line",
        "quiz": [
            {
                "question": "What geometric shape does the OLS residual sum of squares form in parameter space (beta0, beta1)?",
                "options": ["A saddle point", "A convex paraboloid (bowl) with a unique minimum", "A flat plane", "A sphere"],
                "answer": 1,
                "explanation": "Because the objective is a quadratic function with positive definite Hessian, it forms a convex paraboloid bowl."
            }
        ]
    },
    39: {
        "shortTitle": "Lowess and Loess, Clearly Explained",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "8:40",
        "summary": "Locally Weighted Scatterplot Smoothing (LOWESS) fits non-parametric curves to data by running weighted regressions within local sliding windows.",
        "bamIntuition": "A straight line won't fit wiggly data! Loess slides a window across your data, fits a tiny weighted line at each point where close neighbors get the most vote, and BAM: You get a smooth, organic curve!",
        "firstPrinciples": "LOWESS (Cleveland 1979) estimates $f(x)$ locally without assuming a global parametric form. At target point $x_0$, it selects the $k = \\lfloor f \\cdot n \\rfloor$ nearest neighbors where $f \\in (0, 1)$ is the span. Weights are assigned via the tricube kernel: $w_i(x_0) = W\\left(\\frac{|x_i - x_0|}{\\Delta(x_0)}\\right)$, where $W(u) = (1 - |u|^3)^3$ for $|u| < 1$, and 0 otherwise. A locally weighted polynomial regression is solved: $\\min_{\\beta} \\sum w_i (y_i - \\beta_0 - \\beta_1(x_i - x_0))^2$, and robustness weights are iteratively updated to downweight outliers.",
        "mathFormulas": [
            {"name": "Tricube Kernel Weight", "latex": "W(u) = \\begin{cases} (1 - |u|^3)^3 & \\text{for } |u| < 1 \\\\ 0 & \\text{for } |u| \\ge 1 \\end{cases}", "explanation": "Smooth weight decaying to zero at the neighborhood boundary."},
            {"name": "Weighted Local OLS", "latex": "\\hat{\\boldsymbol{\\beta}}(x_0) = (\\mathbf{X}^T \\mathbf{W}(x_0) \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{W}(x_0) \\mathbf{y}", "explanation": "Local weighted least squares solution at target query point x0."}
        ],
        "numericalExample": "Fitting a point at x0 = 5 with span containing points at x = [4, 5, 6]. Distance to boundary = 2. For x = 5: u = 0, weight = (1 - 0)^3 = 1.0 (full weight). For x = 4: u = 1/2 = 0.5, weight = (1 - 0.5^3)^3 = (1 - 0.125)^3 = (0.875)^3 = 0.67. Points outside the window receive 0 weight.",
        "pythonCode": "from statsmodels.nonparametric.smoothers_lowess import lowess\nimport numpy as np\n\nx = np.linspace(0, 10, 50)\ny = np.sin(x) + np.random.normal(0, 0.2, 50)\nsmoothed = lowess(y, x, frac=0.3)\nprint('First 3 smoothed points:', smoothed[:3, 1].round(3))",
        "rCode": "x <- seq(0, 10, length.out=50); y <- sin(x) + rnorm(50, 0, 0.2)\nfit <- loess(y ~ x, span=0.3)\nplot(x, y); lines(x, predict(fit), col='red', lwd=2)",
        "pitfalls": "Overfitting with a span (frac) that is too small (tracing every random noise bump), or oversmoothing with a span that is too large (flattening real peaks and troughs).",
        "interactiveType": "loess",
        "quiz": [
            {
                "question": "What happens in Loess smoothing when you set the span parameter frac very close to 1.0?",
                "options": ["The curve becomes identical to a global polynomial regression line", "The curve passes through every individual data point", "The algorithm divides by zero", "Weights become negative"],
                "answer": 0,
                "explanation": "When frac -> 1.0, the local neighborhood includes the entire dataset, converging to standard global regression."
            }
        ]
    },
    40: {
        "shortTitle": "Linear Regression, Clearly Explained",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "12:15",
        "summary": "Full algebraic derivation of the OLS slope and intercept, hypothesis tests for coefficients, and confidence and prediction intervals.",
        "bamIntuition": "The slope is Covariance of X and Y divided by Variance of X! If X goes up by 1 unit, Y changes by the slope. Test if the slope is significantly different from 0 with a t-test, and BAM!",
        "firstPrinciples": "Setting the gradient of $S = \\sum (y_i - \\beta_0 - \\beta_1 x_i)^2$ to zero yields the closed-form estimators: $\\hat{\\beta}_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)} = r \\frac{s_y}{s_x}$, and $\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}$. Under Gauss-Markov assumptions, $\\hat{\\beta}_1$ is the Best Linear Unbiased Estimator (BLUE). The sampling variance is $\\text{Var}(\\hat{\\beta}_1) = \\frac{\\sigma^2}{\\sum (x_i - \\bar{x})^2}$, leading to test statistic $t = \\frac{\\hat{\\beta}_1}{\\text{SE}(\\hat{\\beta}_1)} \\sim t_{n-2}$.",
        "mathFormulas": [
            {"name": "Slope Estimator", "latex": "\\hat{\\beta}_1 = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^n (x_i - \\bar{x})^2} = r \\frac{s_y}{s_x}", "explanation": "Ratio of sample covariance to variance of predictor."},
            {"name": "Slope Standard Error", "latex": "\\text{SE}(\\hat{\\beta}_1) = \\frac{s_e}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2}}", "explanation": "Uncertainty of slope estimator based on residual standard error s_e."}
        ],
        "numericalExample": "Height (X) vs Weight (Y) for 5 people: sum(x - x_bar)^2 = 100, sum(x - x_bar)(y - y_bar) = 250. Slope beta1 = 250 / 100 = 2.5 lbs per inch. If x_bar = 70 and y_bar = 160: beta0 = 160 - (2.5 * 70) = 160 - 175 = -15. Prediction for a 72-inch person: -15 + (2.5 * 72) = 165 lbs.",
        "pythonCode": "import statsmodels.api as sm\nimport numpy as np\n\nx = np.array([65, 68, 70, 72, 75])\ny = np.array([145, 155, 160, 168, 175])\nX = sm.add_constant(x)\nmodel = sm.OLS(y, X).fit()\nprint(model.summary())",
        "rCode": "x <- c(65, 68, 70, 72, 75); y <- c(145, 155, 160, 168, 175)\nsummary(lm(y ~ x))",
        "pitfalls": "Confusing confidence intervals for the regression line (mean response) with prediction intervals for an individual new point (which must include individual residual variance $\\sigma^2$ and is much wider).",
        "interactiveType": "regression_deep",
        "quiz": [
            {
                "question": "What is the relationship between the slope beta1 of simple linear regression and Pearson's correlation r?",
                "options": ["beta1 = r", "beta1 = r * (s_y / s_x)", "beta1 = r^2", "beta1 = s_x / s_y"],
                "answer": 1,
                "explanation": "Slope scales the standardized correlation r by the ratio of the scales: beta1 = r * (s_y / s_x)."
            }
        ]
    },
    41: {
        "shortTitle": "Linear Regression in R",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "7:12",
        "summary": "Mastering the syntax and output of R's lm() function: understanding coefficients, standard errors, t-values, p-values, and the F-statistic.",
        "bamIntuition": "Running lm(y ~ x) in R spits out a summary table. Learn how to read the four columns: Estimate, Std. Error, t value, and Pr(>|t|), and BAM: You know if your predictor matters!",
        "firstPrinciples": "In R, formulas use Wilkinson-Rogers notation `y ~ x`. The `summary.lm()` output reports: 1. Residual percentiles; 2. Coefficients table with estimate $\\hat{\\beta}_j$, standard error $\\text{SE}(\\hat{\\beta}_j) = \\sqrt{s^2 (\\mathbf{X}^T\\mathbf{X})^{-1}_{jj}}$, $t = \\hat{\\beta}_j / \\text{SE}$, and two-tailed p-value; 3. Residual standard error $s_e = \\sqrt{\\frac{SS_{\\text{res}}}{n - p - 1}}$; 4. Multiple and Adjusted $R^2$; 5. Global F-statistic $F = \\frac{SS_{\\text{reg}}/p}{SS_{\\text{res}}/(n - p - 1)}$.",
        "mathFormulas": [
            {"name": "Overall F-Statistic", "latex": "F = \\frac{(SS_{\\text{tot}} - SS_{\\text{res}})/p}{SS_{\\text{res}} / (n - p - 1)}", "explanation": "Tests whether all slope coefficients simultaneously equal zero."},
            {"name": "Residual Standard Error", "latex": "s_e = \\sqrt{\\frac{\\sum e_i^2}{n - p - 1}}", "explanation": "Estimated standard deviation of the error term."}
        ],
        "numericalExample": "In R, fitting mouse weight on size: `fit <- lm(weight ~ size)`. Summary output: Coefficients: (Intercept) = 0.93, size = 0.64 (p = 0.002). Multiple R-squared: 0.78, F-statistic: 28.5 on 1 and 8 DF, p-value: 0.00067. The size coefficient is highly significant.",
        "pythonCode": "import statsmodels.formula.api as smf\nimport pandas as pd\n\ndf = pd.DataFrame({'size': [1.2, 1.5, 2.0, 2.5, 3.1], 'weight': [1.8, 2.1, 2.9, 3.4, 4.2]})\nmodel = smf.ols('weight ~ size', data=df).fit()\nprint(model.summary())",
        "rCode": "size <- c(1.2, 1.5, 2.0, 2.5, 3.1)\nweight <- c(1.8, 2.1, 2.9, 3.4, 4.2)\nfit <- lm(weight ~ size)\nsummary(fit)",
        "pitfalls": "Interpreting the intercept p-value as evidence for or against the scientific hypothesis. The intercept merely represents the baseline when X = 0, which may be outside the physical data range.",
        "interactiveType": "r_regression",
        "quiz": [
            {
                "question": "What null hypothesis does the F-statistic test in multiple linear regression?",
                "options": ["That the intercept is 0", "That ALL predictor slope coefficients are simultaneously equal to zero", "That the residuals are normal", "That R^2 = 1.0"],
                "answer": 1,
                "explanation": "The global F-test evaluates H0: beta1 = beta2 = ... = betap = 0 against the alternative that at least one slope is non-zero."
            }
        ]
    },
    42: {
        "shortTitle": "Multiple Regression",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "10:30",
        "summary": "Extending linear regression to two or more predictor variables, creating 3D planes or multi-dimensional hyperplanes that isolate partial effects.",
        "bamIntuition": "With two predictors (X1 and X2), your regression line becomes a 3D flat plane! The slope for X1 tells you how Y changes when you freeze X2 in place! BAM: Multiple Regression!",
        "firstPrinciples": "Multiple linear regression models the target as $y_i = \\beta_0 + \\sum_{j=1}^p \\beta_j x_{ij} + \\epsilon_i$. In matrix notation: $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$. The coefficient $\\beta_j$ represents the *partial derivative* $\\frac{\\partial E[Y]}{\\partial X_j}$, measuring the effect of a 1-unit increase in $X_j$ while *holding all other predictors constant* (ceteris paribus). Multicollinearity occurs when columns of $\\mathbf{X}$ are linearly dependent, causing $(\\mathbf{X}^T\\mathbf{X})$ to become ill-conditioned and inflating coefficient variances.",
        "mathFormulas": [
            {"name": "Matrix Normal Equation", "latex": "\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}", "explanation": "The analytic OLS solution for multiple regression."},
            {"name": "Variance Inflation Factor (VIF)", "latex": "\\text{VIF}_j = \\frac{1}{1 - R_j^2}", "explanation": "Measures variance inflation of coefficient j caused by collinearity with other features."}
        ],
        "numericalExample": "Predicting blood pressure (Y) from Age (X1) and Weight (X2): Fitted plane: Y = 80 + 0.5 * Age + 0.3 * Weight. For two people of the exact same weight, each additional year of age increases predicted blood pressure by 0.5 mmHg.",
        "pythonCode": "import statsmodels.api as sm\nimport numpy as np\n\n# Simulating 3D regression\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = 5 + 2.5 * X[:, 0] - 1.8 * X[:, 1] + np.random.randn(100) * 0.5\nX_design = sm.add_constant(X)\nfit = sm.OLS(y, X_design).fit()\nprint('Estimated Coefficients:', fit.params.round(3))",
        "rCode": "set.seed(42)\nx1 <- rnorm(100); x2 <- rnorm(100)\ny <- 5 + 2.5*x1 - 1.8*x2 + rnorm(100, 0, 0.5)\nsummary(lm(y ~ x1 + x2))",
        "pitfalls": "Interpreting regression coefficients causally when omitted variable bias is present (confounding), or including highly correlated predictors (VIF > 10) causing wild coefficient sign flips.",
        "interactiveType": "regression3d",
        "quiz": [
            {
                "question": "What is the meaning of coefficient beta1 in the multiple regression Y = beta0 + beta1*X1 + beta2*X2?",
                "options": ["The change in Y when X1 changes, ignoring X2", "The expected change in Y per unit change in X1, holding X2 constant", "The correlation between X1 and Y", "The intercept of X1"],
                "answer": 1,
                "explanation": "Multiple regression coefficients represent partial effects, isolating the change in Y per unit increase in X1 while mathematically controlling for X2."
            }
        ]
    },
    43: {
        "shortTitle": "Multiple Regression in R",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "8:05",
        "summary": "Hands-on implementation of multiple regression in R, comparing models with ANOVA, evaluating adjusted R-squared, and checking diagnostic plots.",
        "bamIntuition": "Add predictors with plus signs: lm(y ~ x1 + x2). Compare the simple model to the big model with anova(model1, model2). If p < 0.05, the extra variable earns its keep! BAM!",
        "firstPrinciples": "Model comparison tests whether an expanded model with $p_2$ additional parameters significantly improves fit over a nested reduced model with $p_1$ parameters: $H_0: \\beta_{p_1+1} = \\dots = \\beta_{p_2} = 0$. The nested partial F-test statistic is $F = \\frac{(SS_{\\text{res, reduced}} - SS_{\\text{res, full}}) / (p_2 - p_1)}{SS_{\\text{res, full}} / (n - p_2 - 1)} \\sim F_{p_2 - p_1, n - p_2 - 1}$. In R, `anova(fit_reduced, fit_full)` computes this partial F-test directly.",
        "mathFormulas": [
            {"name": "Partial F-Statistic", "latex": "F = \\frac{(SS_{\\text{res, red}} - SS_{\\text{res, full}}) / \\Delta p}{SS_{\\text{res, full}} / df_{\\text{full}}}", "explanation": "Evaluates whether adding variables significantly reduces unexplained variance."},
            {"name": "Cook's Distance (Leverage)", "latex": "D_i = \\frac{\\sum (\\hat{y}_j - \\hat{y}_{j(i)})^2}{p \\cdot s^2}", "explanation": "Identifies influential observations that dramatically shift fitted values."}
        ],
        "numericalExample": "Reduced model (lm(y ~ x1)) has SS_res = 120 (df = 28). Full model (lm(y ~ x1 + x2)) has SS_res = 85 (df = 27). Extra parameter Delta p = 1. Numerator = (120 - 85)/1 = 35. Denominator = 85 / 27 = 3.15. F = 35 / 3.15 = 11.11 (p = 0.0025). Adding x2 provides a statistically significant improvement.",
        "pythonCode": "import statsmodels.api as sm\nfrom statsmodels.formula.api import ols\nimport pandas as pd\n\ndf = pd.DataFrame({'x1': [1,2,3,4,5,6], 'x2': [2,1,4,3,6,5], 'y': [3,4,6,7,9,10]})\nm1 = ols('y ~ x1', data=df).fit()\nm2 = ols('y ~ x1 + x2', data=df).fit()\nprint(sm.stats.anova_lm(m1, m2))",
        "rCode": "df <- data.frame(x1=c(1,2,3,4,5,6), x2=c(2,1,4,3,6,5), y=c(3,4,6,7,9,10))\nm1 <- lm(y ~ x1, data=df)\nm2 <- lm(y ~ x1 + x2, data=df)\nanova(m1, m2)",
        "pitfalls": "Comparing non-nested models with ANOVA. If model A uses x1 and model B uses x2, `anova(mA, mB)` is invalid; use AIC or BIC instead.",
        "interactiveType": "multiple_r",
        "quiz": [
            {
                "question": "When can anova(model1, model2) be used to test whether adding variables significantly improves fit?",
                "options": ["Any time you have two models", "Only when model 1 is strictly nested within model 2 (model 2 contains all predictors of model 1 plus extras)", "Only when R^2 > 0.9", "Only when data is discrete"],
                "answer": 1,
                "explanation": "Partial F-tests through ANOVA require the smaller model to be a strict mathematical sub-model (nested) of the larger model."
            }
        ]
    },
    44: {
        "shortTitle": "Linear Models for t-tests and ANOVA",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "11:40",
        "summary": "The Grand Unified Theory: t-tests and ANOVA are not separate algorithms; they are simply ordinary linear regression with dummy (indicator) variables!",
        "bamIntuition": "Mind blown! A two-sample t-test is literally just a linear regression line connecting two points! ANOVA with 3 groups is just regression with two dummy variables! It's all the same thing! BAM!",
        "firstPrinciples": "Consider a two-sample t-test comparing Control and Treatment. Define indicator variable $X_i = 1$ if treated, and $0$ if control. The linear regression model $Y_i = \\beta_0 + \\beta_1 X_i + \\epsilon_i$ yields: For Control ($X=0$): $E[Y] = \\beta_0 = \\mu_{\\text{control}}$. For Treatment ($X=1$): $E[Y] = \\beta_0 + \\beta_1 = \\mu_{\\text{treatment}}$. Thus, the slope $\\beta_1 = \\mu_{\\text{treatment}} - \\mu_{\\text{control}}$, and testing $\\beta_1 = 0$ is algebraically and numerically identical to Student's two-sample t-test ($t = \\sqrt{F}$). For $k$ groups, $k-1$ dummy variables reproduce one-way ANOVA exactly.",
        "mathFormulas": [
            {"name": "Dummy Variable Regression", "latex": "Y_i = \\beta_0 + \\beta_1 D_i + \\epsilon_i, \\quad D_i \\in \\{0, 1\\}", "explanation": "Linear model representing two group means via baseline and offset."},
            {"name": "t-test and ANOVA Equivalence", "latex": "t^2 = F = \\frac{MS_{\\text{between}}}{MS_{\\text{within}}}", "explanation": "The squared t-statistic from regression equals the ANOVA F-statistic."}
        ],
        "numericalExample": "Control: [10, 12, 14] (mean = 12). Treatment: [16, 18, 20] (mean = 18). Running a two-sample t-test gives t = -3.67, p = 0.021. Running linear regression `lm(Y ~ Group)` gives intercept beta0 = 12.0, slope beta1 = +6.0, t = 3.67, p = 0.021. The results are mathematically identical to the last decimal place!",
        "pythonCode": "from scipy import stats\nimport statsmodels.formula.api as smf\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'group': ['Control']*3 + ['Treat']*3,\n    'val': [10, 12, 14, 16, 18, 20]\n})\nt_res = stats.ttest_ind(df[df.group=='Treat'].val, df[df.group=='Control'].val, equal_var=True)\nlm_res = smf.ols('val ~ group', data=df).fit()\nprint(f'T-test p-value: {t_res.pvalue:.4f}')\nprint(f'Regression slope p-value: {lm_res.pvalues[\"group[T.Treat]\"]:.4f}')",
        "rCode": "df <- data.frame(group=rep(c('Control','Treat'), each=3), val=c(10,12,14, 16,18,20))\ncat('t-test p:', t.test(val ~ group, data=df, var.equal=TRUE)$p.value, '\\n')\ncat('lm p:    ', summary(lm(val ~ group, data=df))$coefficients[2, 4])",
        "pitfalls": "Thinking you must memorize dozens of disparate statistical tests; once you understand linear models, t-tests, ANOVA, ANCOVA, and regression are revealed as the exact same mathematical engine.",
        "interactiveType": "linear_models_anova",
        "quiz": [
            {
                "question": "In the regression model Y = beta0 + beta1*Group (where Group is 0 for Control and 1 for Treatment), what does beta1 represent?",
                "options": ["The mean of the treatment group", "The difference in means between Treatment and Control (Treatment - Control)", "The correlation coefficient", "The sample size"],
                "answer": 1,
                "explanation": "Because E[Y|Control] = beta0 and E[Y|Treatment] = beta0 + beta1, beta1 is exactly the mean difference between the two groups."
            }
        ]
    },
    45: {
        "shortTitle": "Design Matrices For Linear Models",
        "moduleId": "module-10",
        "category": "Regression & Linear Models",
        "duration": "9:50",
        "summary": "How statistical software translates experimental formulas into design matrices (X) with columns of 1s, continuous predictors, and dummy contrasts.",
        "bamIntuition": "Behind every R or Python model formula lurks the Design Matrix X! It's a grid of 1s and 0s that turns complex categorical experiments into clean matrix algebra: Y = X * Beta! BAM!",
        "firstPrinciples": "In linear algebra, any linear model can be expressed as $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$, where $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ is the design (model) matrix. The first column is typically a vector of ones $\\mathbf{1}_n$ corresponding to the intercept $\\beta_0$. Categorical factors with $k$ levels are converted using treatment coding (dummy coding) into $k-1$ indicator columns, omitting the reference category to prevent column collinearity and ensure $(\\mathbf{X}^T\\mathbf{X})$ is invertible.",
        "mathFormulas": [
            {"name": "Linear Model Matrix Form", "latex": "\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}", "explanation": "Target vector equals Design Matrix times parameter vector plus noise."},
            {"name": "Projection Hat Matrix", "latex": "\\mathbf{H} = \\mathbf{X}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T, \\quad \\hat{\\mathbf{y}} = \\mathbf{H}\\mathbf{y}", "explanation": "Orthogonal projection operator onto the column space of X."}
        ],
        "numericalExample": "Experiment with 3 groups (A, B, C) and 1 subject each. Treatment coding with A as baseline: Column 1 (Intercept): [1, 1, 1]^T. Column 2 (Group B): [0, 1, 0]^T. Column 3 (Group C): [0, 0, 1]^T. For group A: [1, 0, 0] * beta = beta0. For group B: [1, 1, 0] * beta = beta0 + beta1. For group C: [1, 0, 1] * beta = beta0 + beta2.",
        "pythonCode": "import patsy\nimport pandas as pd\n\ndf = pd.DataFrame({'group': ['A', 'B', 'C', 'A', 'B']})\ndesign_matrix = patsy.dmatrix('group', df)\nprint('Patsy Design Matrix:\\n', design_matrix)",
        "rCode": "df <- data.frame(group=factor(c('A', 'B', 'C', 'A', 'B')))\nmodel.matrix(~ group, data=df)",
        "pitfalls": "Falling into the 'Dummy Variable Trap': creating $k$ dummy columns while ALSO including an intercept column of 1s. The sum of the $k$ columns equals the intercept column, creating perfect multicollinearity and making matrix inversion impossible.",
        "interactiveType": "design_matrix",
        "quiz": [
            {
                "question": "What happens if you include k dummy columns for a k-level categorical variable AND an intercept column of ones?",
                "options": ["The model runs twice as fast", "The design matrix becomes rank-deficient (singular), causing the Dummy Variable Trap", "The R-squared becomes negative", "P-values are cut in half"],
                "answer": 1,
                "explanation": "Because the sum of all k dummies equals the column of 1s, the matrix columns are linearly dependent, making (X^T * X) singular and non-invertible."
            }
        ]
    }
}

print(f"Group 3 defined with {len(GROUP_3)} videos.")
