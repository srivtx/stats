# scripts/curriculum_group4.py
"""
Rich pedagogical content for videos 46 to 62.
"""

GROUP_4 = {
    46: {
        "shortTitle": "Sampling from a Distribution",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "7:25",
        "summary": "Generating random numbers from any probability distribution using the Inverse Transform Sampling theorem and uniform random generators.",
        "bamIntuition": "How do computers generate random numbers from a weird bell or exponential curve? They roll a uniform random number between 0 and 1 on the vertical Y-axis of the CDF, read across, drop straight down to the X-axis, and BAM: You've sampled from the distribution!",
        "firstPrinciples": "The Probability Integral Transform states that if $X$ is a continuous random variable with strictly increasing CDF $F_X(x)$, then $U = F_X(X) \\sim \\text{Uniform}(0, 1)$. Conversely, for any uniform random variable $U \\sim \\text{Uniform}(0, 1)$, the transformed variable $X = F_X^{-1}(U)$ has exact distribution $F_X$. For distributions with intractable inverse CDFs (like standard normal), the Box-Muller transform or Rejection Sampling (von Neumann) is utilized.",
        "mathFormulas": [
            {"name": "Inverse CDF Transform", "latex": "X = F^{-1}(U), \\quad U \\sim \\text{Uniform}(0, 1)", "explanation": "Generates samples from F using uniform pseudorandom numbers."},
            {"name": "CDF Uniformity", "latex": "P(F(X) \\le u) = P(X \\le F^{-1}(u)) = F(F^{-1}(u)) = u", "explanation": "Proof that applying the CDF to any random variable yields Uniform(0, 1)."}
        ],
        "numericalExample": "Sampling an Exponential(lambda = 2) variable. CDF is F(x) = 1 - e^(-2x). Inverting: u = 1 - e^(-2x) -> 1 - u = e^(-2x) -> x = -ln(1 - u) / 2. If computer rolls uniform u = 0.60: x = -ln(0.40) / 2 = -(-0.9163) / 2 = 0.458. This 0.458 is an exact draw from the exponential distribution!",
        "pythonCode": "import numpy as np\n\n# Inverse CDF sampling for Exponential(rate=2)\nu = np.random.uniform(0, 1, size=1000)\nx_samples = -np.log(1 - u) / 2.0\nprint(f'Sample mean: {np.mean(x_samples):.3f} (True: 0.500)')",
        "rCode": "u <- runif(1000)\nx_samples <- -log(1 - u) / 2\ncat('Sample mean:', mean(x_samples))",
        "pitfalls": "Using standard rejection sampling when proposal density envelopes are inefficient, causing astronomical rejection rates in high dimensions.",
        "interactiveType": "sampling_sim",
        "quiz": [
            {
                "question": "If you pass random samples from any continuous distribution through its own CDF function F(X), what distribution do the resulting values have?",
                "options": ["Normal(0, 1)", "Uniform(0, 1)", "Exponential(1)", "Chi-Square(1)"],
                "answer": 1,
                "explanation": "By the Probability Integral Transform theorem, F(X) is always distributed as Uniform(0, 1)."
            }
        ]
    },
    47: {
        "shortTitle": "BAM! Clearly Explained",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "3:10",
        "summary": "Josh Starmer's signature philosophical insight: demystifying statistics by connecting mathematical abstraction to immediate intuitive eureka moments.",
        "bamIntuition": "BAM is that magical moment when confusion evaporates! Statistics is not a torture device designed by sadists; it's a collection of simple, elegant visual ideas that let you see the truth in data. BAM!",
        "firstPrinciples": "Statistical pedagogy often obscures foundational simplicity behind impenetrable Greek notation and ad-hoc recipes. The BAM philosophy operates on cognitive first principles: 1. Ground abstract symbols in concrete geometric pictures; 2. Demonstrate what the formulas actually measure (areas, distances, slopes); 3. Reconcile intuition with formal proof. When cognitive friction is eliminated, complex algorithms (neural networks, PCA, maximum likelihood) reveal themselves as intuitive extensions of basic geometry.",
        "mathFormulas": [
            {"name": "Cognitive Clarity Formula", "latex": "\\text{Understanding} = \\lim_{\\text{Jargon} \\to 0} \\frac{\\text{First Principles}}{\\text{Visual Intuition}} = \\text{BAM!}", "explanation": "Josh Starmer's pedagogical maxim for conceptual mastery."},
            {"name": "Eureka Moment", "latex": "\\Delta \\text{Insight} = \\text{Concept}(\\text{Visual}) - \\text{Formulas}(\\text{Rote})", "explanation": "The transition from mechanical calculation to deep understanding."}
        ],
        "numericalExample": "Consider standard deviation: Rather than memorizing 'sqrt(sum(x - mean)^2 / (n-1))', visualize: How far is each dot from the center? Measure those lines, square them, average them, and take the square root. Instantly memorable!",
        "pythonCode": "def statquest_bam():\n    print('DOUBLE BAM! Clear concepts triumph over confusing jargon!')\n\nstatquest_bam()",
        "rCode": "message('BAM! Statistics clearly explained!')",
        "pitfalls": "Relying on rote memorization of formulas without understanding their geometric or physical mechanisms.",
        "interactiveType": "bam_moment",
        "quiz": [
            {
                "question": "What is the primary mission of the StatQuest methodology?",
                "options": ["To derive proofs without pictures", "To break complex statistics down into small, clearly understood first-principles steps", "To memorize p-value tables", "To replace math with code"],
                "answer": 1,
                "explanation": "StatQuest focuses on clear, step-by-step visual explanations that make core statistical concepts intuitive and memorable."
            }
        ]
    },
    48: {
        "shortTitle": "Thresholds for Significance",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "4:45",
        "summary": "The historical origins of the arbitrary alpha = 0.05 threshold, Ronald Fisher's original intent, and modern recommendations for reporting effect sizes.",
        "bamIntuition": "Why 0.05? Ronald Fisher said in 1925 that 1 in 20 was a convenient rule of thumb! There is zero divine law carved on stone tablets. A p-value of 0.049 is NOT radically different from 0.051! BAM!",
        "firstPrinciples": "The choice of significance level $\\alpha$ represents an explicit decision threshold trading off Type I error risk against Type II error risk. In Neyman-Pearson decision theory, $\\alpha$ is chosen a priori by balancing the utility/cost matrix of errors. In 2018, 72 prominent statisticians proposed lowering the default significance threshold for claiming novel discoveries from $\\alpha = 0.05$ to $\\alpha = 0.005$ to combat the replication crisis.",
        "mathFormulas": [
            {"name": "Significance Decision Boundary", "latex": "\\text{Decision} = \\begin{cases} \\text{Reject } H_0 & \\text{if } p \\le \\alpha \\\\ \\text{Fail to Reject } H_0 & \\text{if } p > \\alpha \\end{cases}", "explanation": "Dichotomous cutoff converting continuous tail probability into discrete scientific verdict."},
            {"name": "Proposed Strict Threshold", "latex": "\\alpha_{\\text{discovery}} = 0.005 \\quad (z \\approx 2.81)", "explanation": "Modern proposed threshold to dramatically reduce false positive literature claims."}
        ],
        "numericalExample": "Two studies on a cancer drug: Study 1 finds p = 0.048 (labeled 'STATISTICALLY SIGNIFICANT'). Study 2 finds p = 0.052 (labeled 'FAILED TO REPLICATE'). In reality, both studies observed nearly identical evidence. Dichotomizing continuous evidence into binary win/loss creates artificial scientific division.",
        "pythonCode": "p1 = 0.048\np2 = 0.052\nprint('Arbitrary cutoff p < 0.05:')\nprint(f'p1 = {p1} -> Significant? {p1 < 0.05}')\nprint(f'p2 = {p2} -> Significant? {p2 < 0.05}')",
        "rCode": "p_vals <- c(0.048, 0.052)\np_vals < 0.05",
        "pitfalls": "Treating p = 0.05 as an absolute cliff of truth. Always report exact p-values alongside effect sizes and 95% confidence intervals.",
        "interactiveType": "alpha_thresholds",
        "quiz": [
            {
                "question": "What did Ronald Fisher originally intend the p < 0.05 threshold to represent?",
                "options": ["Absolute scientific proof of truth", "An informal benchmark warranting further investigation, not an immutable law of nature", "A mathematical constant like pi", "The probability the hypothesis was true"],
                "answer": 1,
                "explanation": "Fisher viewed p < 0.05 as a practical indicator that an experimental effect was worth looking into further."
            }
        ]
    },
    49: {
        "shortTitle": "Which t-test to Use?",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "5:50",
        "summary": "A clean decision framework choosing between One-Sample, Independent Two-Sample (Student's), Paired, and Welch's t-test for unequal variances.",
        "bamIntuition": "One group vs known number? One-sample t-test! Same people measured before and after? Paired t-test! Two completely different groups? Independent t-test! Unequal spread? Welch's t-test! BAM!",
        "firstPrinciples": "The t-test family is governed by experimental design and variance homoscedasticity: 1. **One-sample t-test**: $t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, $df = n - 1$. 2. **Paired t-test**: Computes differences $d_i = x_{1i} - x_{2i}$, testing $H_0: \\mu_d = 0$, removing subject-specific baseline noise. 3. **Student's two-sample t-test**: Assumes equal variances $\\sigma_1^2 = \\sigma_2^2$, pooling variance: $s_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}$. 4. **Welch's t-test**: Relaxes equal variance assumption, adjusting degrees of freedom via the Welch-Satterthwaite equation.",
        "mathFormulas": [
            {"name": "Welch's t-statistic", "latex": "t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}", "explanation": "Does not pool variances; robust to heteroscedasticity."},
            {"name": "Welch-Satterthwaite df", "latex": "df = \\frac{\\left(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}\\right)^2}{\\frac{(s_1^2/n_1)^2}{n_1-1} + \\frac{(s_2^2/n_2)^2}{n_2-1}}", "explanation": "Fractional degrees of freedom correcting for unequal variances."}
        ],
        "numericalExample": "Testing patient blood pressure Before and After medication on 10 patients. Because baseline patient blood pressures vary widely, a paired t-test on differences (After - Before) eliminates inter-subject variance, drastically increasing test sensitivity compared to an unpaired test.",
        "pythonCode": "from scipy import stats\n\nbefore = [140, 150, 135, 160, 145]\nafter = [130, 138, 128, 142, 135]\n# Paired t-test\nres_paired = stats.ttest_rel(after, before)\n# Welch's independent t-test (equal_var=False)\nres_welch = stats.ttest_ind(after, before, equal_var=False)\nprint(f'Paired p-value: {res_paired.pvalue:.4f}')\nprint(f'Welch p-value:  {res_welch.pvalue:.4f}')",
        "rCode": "before <- c(140, 150, 135, 160, 145)\nafter  <- c(130, 138, 128, 142, 135)\nt.test(after, before, paired=TRUE)\nt.test(after, before, var.equal=FALSE)",
        "pitfalls": "Using standard Student's t-test when group variances or sample sizes differ substantially; Welch's t-test should be the universal default because it incurs virtually zero power penalty even when variances are equal.",
        "interactiveType": "t_test_selector",
        "quiz": [
            {
                "question": "Why is Welch's t-test recommended by modern statisticians as the universal default over Student's t-test?",
                "options": ["It is easier to calculate by hand", "It does not assume equal variances between groups and loses almost no power when variances happen to be equal", "It does not use degrees of freedom", "It requires smaller sample sizes"],
                "answer": 1,
                "explanation": "Welch's t-test robustly protects against Type I error inflation under heteroscedasticity while performing with nearly identical power to Student's test when variances are equal."
            }
        ]
    },
    50: {
        "shortTitle": "One or Two Tailed P-Values",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "6:10",
        "summary": "Comparing one-tailed and two-tailed p-values, symmetric rejection zones, and the ethical rules governing directional hypothesis testing.",
        "bamIntuition": "If you are testing whether a coin is biased, it could be biased towards heads OR tails! Look at both tails of the distribution. If you only look at one tail after seeing the data, you cut your p-value in half dishonestly! BAM!",
        "firstPrinciples": "A test statistic $T$ has null distribution density $f(t)$ symmetric around 0. In a two-tailed test: $p_{2\\text{-tail}} = 2 \\cdot P(T \\ge |t_{\\text{obs}}|) = 2 \\int_{|t_{\\text{obs}}|}^\\infty f(u) du$. In a one-tailed test in the direction of the observed effect: $p_{1\\text{-tail}} = P(T \\ge t_{\\text{obs}}) = \\frac{1}{2} p_{2\\text{-tail}}$. Using a one-tailed test doubles your effective alpha level in that direction, making it twice as easy to achieve nominal significance.",
        "mathFormulas": [
            {"name": "Tail Relationship", "latex": "p_{2\\text{-tailed}} = 2 \\cdot p_{1\\text{-tailed}}", "explanation": "Two-tailed p-value doubles one-tailed p-value for symmetric distributions."},
            {"name": "Rejection Condition", "latex": "|T| \\ge t_{1 - \\alpha/2} \\quad \\text{vs} \\quad T \\ge t_{1 - \\alpha}", "explanation": "Critical thresholds for two-tailed vs one-tailed tests."}
        ],
        "numericalExample": "Calculated t-statistic = 2.10 with df = 20. One-tail area = 0.024. Two-tail p-value = 2 * 0.024 = 0.048. If the researcher had mistakenly not doubled the tail, they might report 0.024, misrepresenting their two-sided risk.",
        "pythonCode": "from scipy import stats\n\nt_val = 2.10\ndf = 20\np_one = 1 - stats.t.cdf(t_val, df=df)\np_two = 2 * p_one\nprint(f'One-tailed p: {p_one:.4f}, Two-tailed p: {p_two:.4f}')",
        "rCode": "t_val <- 2.10; df <- 20\np_one <- 1 - pt(t_val, df=df)\ncat('1-tail:', p_one, '2-tail:', 2 * p_one)",
        "pitfalls": "Choosing a one-tailed test AFTER observing which direction the sample drifted. That is unethical data snooping and inflates Type I errors to 10%.",
        "interactiveType": "one_vs_two_tailed",
        "quiz": [
            {
                "question": "What is the relationship between one-tailed and two-tailed p-values for a symmetric test statistic?",
                "options": ["They are identical", "The two-tailed p-value is exactly twice the one-tailed p-value", "The two-tailed p-value is squared", "The one-tailed p-value is always greater"],
                "answer": 1,
                "explanation": "Because a two-tailed test integrates both tails of equal area, its p-value is exactly twice the one-tailed value."
            }
        ]
    },
    51: {
        "shortTitle": "Quantiles and Percentiles",
        "moduleId": "module-7",
        "category": "Quantiles & QQ-Plots",
        "duration": "6:35",
        "summary": "Quantiles slice sorted continuous distributions into equal probability intervals, with percentiles dividing data into 100 equal slices.",
        "bamIntuition": "Sort everyone from shortest to tallest. Cut the line into 100 equal chunks! The 50th percentile is the median. The 25th is Q1. The 75th is Q3. That's all quantiles are: ranks converted to cuts! BAM!",
        "firstPrinciples": "For a cumulative distribution function $F$, the $q$-th quantile (where $q \\in [0, 1]$) is defined by the generalized inverse: $Q(q) = F^{-1}(q) = \\inf \\{x : F(x) \\ge q\\}$. For sample data $x_{(1)} \\le x_{(2)} \\le \\dots \\le x_{(n)}$, empirical quantiles interpolate between adjacent order statistics: $\\hat{q}(p) = (1 - \\gamma) x_{(j)} + \\gamma x_{(j+1)}$. Common quantiles include quartiles (4 cuts: $q = 0.25, 0.50, 0.75$), deciles (10 cuts), and percentiles (100 cuts).",
        "mathFormulas": [
            {"name": "Quantile Function", "latex": "Q(p) = F^{-1}(p) = \\inf \\{x \\in \\mathbb{R} : F(x) \\ge p\\}", "explanation": "Inverse CDF mapping probability p to value threshold x."},
            {"name": "Median as 0.50 Quantile", "latex": "Q(0.50) = \\text{Median} = F^{-1}(0.50)", "explanation": "The 50th percentile is the exact center of probability mass."}
        ],
        "numericalExample": "Sorted test scores: [55, 60, 65, 70, 75, 80, 85, 90, 95, 100]. n = 10. The 90th percentile is the score below which 90% of scores fall: index = 0.90 * 10 = 9th score = 95. The 50th percentile (median) is (75 + 80)/2 = 77.5.",
        "pythonCode": "import numpy as np\n\nscores = np.array([55, 60, 65, 70, 75, 80, 85, 90, 95, 100])\nprint('25th percentile (Q1):', np.percentile(scores, 25))\nprint('50th percentile (Median):', np.percentile(scores, 50))\nprint('90th percentile:', np.percentile(scores, 90))",
        "rCode": "scores <- c(55, 60, 65, 70, 75, 80, 85, 90, 95, 100)\nquantile(scores, probs=c(0.25, 0.50, 0.90))",
        "pitfalls": "Confusing percentiles (ranks along the distribution from 0 to 100) with percentages (proportions of correct answers on a test). Scoring 90% on an exam is not the same as being in the 90th percentile of test-takers.",
        "interactiveType": "quantiles",
        "quiz": [
            {
                "question": "What is another name for the 0.50 quantile of a distribution?",
                "options": ["Mean", "Median", "Mode", "Standard Deviation"],
                "answer": 1,
                "explanation": "The 0.50 quantile (50th percentile) is precisely the median."
            }
        ]
    },
    52: {
        "shortTitle": "Quantile-Quantile Plots (Q-Q Plots)",
        "moduleId": "module-7",
        "category": "Quantiles & QQ-Plots",
        "duration": "8:40",
        "summary": "Plotting sample quantiles against theoretical Gaussian quantiles to diagnose normality, skewness, heavy tails, and kurtosis.",
        "bamIntuition": "Sort your data and plot it against what a perfect bell curve would predict! If the dots form a dead-straight diagonal line, your data is normal! If it curves or snakes, you've got skew or fat tails! BAM!",
        "firstPrinciples": "A Q-Q plot evaluates whether a sample $\\mathbf{x}$ follows theoretical distribution $F_0$. For sorted observations $x_{(1)} \\le x_{(2)} \\le \\dots \\le x_{(n)}$, empirical plotting positions are $p_i = \\frac{i - 3/8}{n + 1/4}$ (Blom's formula). The plot graphs pairs $(q_i, x_{(i)})$, where $q_i = \\Phi^{-1}(p_i)$ are theoretical standard normal quantiles. If $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, then $x_{(i)} \\approx \\mu + \\sigma q_i$, forming a straight line with intercept $\\mu$ and slope $\\sigma$. S-shaped deviations indicate heavy or light tails; upward/downward curvature reveals skewness.",
        "mathFormulas": [
            {"name": "Theoretical Normal Quantile", "latex": "q_i = \\Phi^{-1}\\left(\\frac{i - 3/8}{n + 1/4}\\right)", "explanation": "Expected position of i-th order statistic from standard normal distribution."},
            {"name": "Linear Alignment Condition", "latex": "x_{(i)} = \\mu + \\sigma \\cdot q_i", "explanation": "If data is normal, points fall along a straight line with slope equal to sigma."}
        ],
        "numericalExample": "If data has fat tails (Student's t-distribution), extreme observations on both ends are much further out than a normal curve predicts. On the Q-Q plot, the left points plunge below the line and right points soar above the line, forming an inverted-S shape.",
        "pythonCode": "import statsmodels.api as sm\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Sample from standard normal vs heavy-tailed t-distribution\nnormal_data = np.random.normal(size=100)\nfig, ax = plt.subplots(figsize=(6, 4))\nsm.qqplot(normal_data, line='45', ax=ax)\nplt.title('Q-Q Plot of Normal Data')",
        "rCode": "data <- rnorm(100)\nqqnorm(data); qqline(data, col='red')",
        "pitfalls": "Over-interpreting wiggles at the extreme edges of a Q-Q plot in small samples ($n < 30$), where sample quantile variance is naturally elevated.",
        "interactiveType": "qqplot",
        "quiz": [
            {
                "question": "What pattern does a right-skewed distribution display on a normal Q-Q plot?",
                "options": ["A perfectly straight line", "An upward-curving parabolic shape (both ends curve upward above the straight line)", "A horizontal line", "A zigzag"],
                "answer": 1,
                "explanation": "Right-skewed data has compressed lower values and stretched upper values, causing the Q-Q points to curve upward."
            }
        ]
    },
    53: {
        "shortTitle": "Quantile Normalization",
        "moduleId": "module-7",
        "category": "Quantiles & QQ-Plots",
        "duration": "9:15",
        "summary": "Making statistical distributions identical across biological replicates or microarray/RNA-seq samples by aligning ranked values to average quantiles.",
        "bamIntuition": "Sample 1 was scanned on a bright day, Sample 2 on a dim day! Their distributions look totally different because of instrument drift. Sort each sample, replace each rank with the average across all samples, restore original order, and BAM: Perfectly normalized!",
        "firstPrinciples": "Quantile normalization (Bolstad et al. 2003) transforms $p$ sample arrays $\\mathbf{x}_1, \\dots, \\mathbf{x}_p \\in \\mathbb{R}^n$ so that they share identical empirical distribution functions while preserving each feature's rank within its sample. Algorithm: 1. Form matrix $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$; 2. Sort each column independently to obtain $\\mathbf{X}_{\\text{sort}}$; 3. Compute row means $\\bar{r}_i = \\frac{1}{p}\\sum_{j=1}^p X_{\\text{sort}, ij}$; 4. Replace each sorted element with $\\bar{r}_i$; 5. Restore elements to their original sample ranks. Geometrically, this projects data onto the diagonal vector of equality in $\\mathbb{R}^p$.",
        "mathFormulas": [
            {"name": "Mean Quantile Vector", "latex": "\\bar{r}_i = \\frac{1}{p} \\sum_{j=1}^p x_{(i), j}", "explanation": "Average value of the i-th highest observation across all p samples."},
            {"name": "Normalized Value Assignment", "latex": "x_{ij}^{\\text{norm}} = \\bar{r}_{\\text{rank}(x_{ij})}", "explanation": "Substitutes mean quantile back into original observation position."}
        ],
        "numericalExample": "Two samples with 3 genes each: Sample A: [2, 4, 9]. Sample B: [4, 6, 8]. Both already sorted. Row means: Row 1: (2+4)/2 = 3.0. Row 2: (4+6)/2 = 5.0. Row 3: (9+8)/2 = 8.5. Normalized Sample A = [3.0, 5.0, 8.5]. Normalized Sample B = [3.0, 5.0, 8.5]. Both samples now have identical distributions, eliminating technical batch differences.",
        "pythonCode": "import pandas as pd\nimport numpy as np\n\ndef quantile_normalize(df):\n    df_sort = pd.DataFrame(np.sort(df.values, axis=0), index=df.index, columns=df.columns)\n    df_mean = df_sort.mean(axis=1)\n    df_norm = df.rank(method='min').stack().astype(int).map(df_mean).unstack()\n    return df_norm\n\ndf = pd.DataFrame({'Sample1': [2, 4, 9], 'Sample2': [4, 6, 8]})\nprint('Normalized:\\n', quantile_normalize(df))",
        "rCode": "# Quantile normalization in R\nlibrary(preprocessCore)\nmat <- matrix(c(2,4,9, 4,6,8), nrow=3)\nnormalize.quantiles(mat)",
        "pitfalls": "Applying quantile normalization when there are massive true global biological shifts (e.g. comparing healthy cells to cells where 80% of transcription is shut down), which erases real biology.",
        "interactiveType": "quantile_norm",
        "quiz": [
            {
                "question": "What is preserved for each feature within a sample during quantile normalization?",
                "options": ["Its original numerical value", "Its relative rank order within that sample", "Its variance", "Its mean"],
                "answer": 1,
                "explanation": "Quantile normalization preserves the exact relative rank order of features within each sample while equalizing all distribution shapes."
            }
        ]
    },
    54: {
        "shortTitle": "Probability is NOT Likelihood",
        "moduleId": "module-9",
        "category": "Probability vs Likelihood & MLE",
        "duration": "8:05",
        "summary": "In statistics, Probability is the area under a fixed distribution given parameters; Likelihood is the curve height for fixed observed data as parameters vary.",
        "bamIntuition": "Probability = Fixed curve, variable data (Area under curve!). Likelihood = Fixed data point, variable curve (Height of curve at that point!). They are literally opposite directions! BAM!",
        "firstPrinciples": "Let $f(x \\mid \\theta)$ be a probability density function. When the parameter $\\theta$ is fixed and $x$ varies, $f(\\cdot \\mid \\theta)$ is a probability density: $\\int_{\\mathcal{X}} f(x \\mid \\theta) dx = 1$, and probabilities are areas. Conversely, when data $\\mathbf{x}$ is fixed and observed, the function $L(\\theta \\mid \\mathbf{x}) = f(\\mathbf{x} \\mid \\theta)$ is the Likelihood function of $\\theta$. Crucially, $\\int_\\Theta L(\\theta \\mid \\mathbf{x}) d\\theta \\ne 1$; likelihood is NOT a probability distribution over $\\theta$!",
        "mathFormulas": [
            {"name": "Probability (Fixed Theta)", "latex": "P(a \\le X \\le b \\mid \\theta) = \\int_a^b f(x \\mid \\theta)\\,dx", "explanation": "Integral of PDF over data interval with fixed model parameters."},
            {"name": "Likelihood (Fixed Data)", "latex": "L(\\theta \\mid x_{\\text{obs}}) = f(x_{\\text{obs}} \\mid \\theta)", "explanation": "Function of parameter theta evaluated at fixed observed observation."}
        ],
        "numericalExample": "Observed mouse weight x = 32 grams. Candidate Model A: N(mu = 32, sigma = 2). Height of curve at x = 32 is f(32 | mu=32, sigma=2) = 1/(2*sqrt(2*pi)) = 0.199. Candidate Model B: N(mu = 25, sigma = 2). Height at x = 32 is f(32 | mu=25, sigma=2) = 0.0004. Model A has 500x higher likelihood than Model B!",
        "pythonCode": "from scipy import stats\n\nx_obs = 32\nlik_model_a = stats.norm.pdf(x_obs, loc=32, scale=2)\nlik_model_b = stats.norm.pdf(x_obs, loc=25, scale=2)\nprint(f'Likelihood under Model A: {lik_model_a:.4f}')\nprint(f'Likelihood under Model B: {lik_model_b:.4f}')",
        "rCode": "x_obs <- 32\ncat('Lik A:', dnorm(x_obs, 32, 2), 'Lik B:', dnorm(x_obs, 25, 2))",
        "pitfalls": "Integrating the likelihood function with respect to $\\theta$ and calling the result a probability; in frequentist statistics, likelihood does not integrate to 1 and is not a probability density.",
        "interactiveType": "prob_vs_lik",
        "quiz": [
            {
                "question": "What is the key difference between probability and likelihood?",
                "options": ["They are synonyms", "Probability measures data outcomes under fixed parameters; Likelihood measures parameter plausibility given fixed data", "Probability is for discrete data, Likelihood is for continuous data", "Likelihood must integrate to 1.0"],
                "answer": 1,
                "explanation": "Probability varies data over fixed parameters; Likelihood varies parameters over fixed observed data."
            }
        ]
    },
    55: {
        "shortTitle": "Maximum Likelihood Estimation",
        "moduleId": "module-9",
        "category": "Probability vs Likelihood & MLE",
        "duration": "9:40",
        "summary": "Maximum Likelihood Estimation (MLE) finds the parameter values that maximize the joint probability of observing the collected sample data.",
        "bamIntuition": "Shift and stretch your distribution until the curve peak aligns with where your data is clustered! When the product of all curve heights reaches the absolute summit, BAM: Maximum Likelihood!",
        "firstPrinciples": "Given i.i.d. observations $\\mathbf{x} = (x_1, \\dots, x_n)$, the joint likelihood is the product of individual densities: $L(\\theta \\mid \\mathbf{x}) = \\prod_{i=1}^n f(x_i \\mid \\theta)$. Because products are analytically unwieldy and numerically prone to underflow, we take the natural logarithm to obtain the log-likelihood: $\\ell(\\theta) = \\ln L(\\theta) = \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)$. The MLE estimator $\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\ell(\\theta)$ solves the score equation $\\nabla_\\theta \\ell(\\theta) = \\mathbf{0}$. By the Cramér-Rao bound, MLE is asymptotically efficient and attains minimum variance.",
        "mathFormulas": [
            {"name": "Log-Likelihood Objective", "latex": "\\ell(\\theta) = \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)", "explanation": "Sum of log-densities converting multiplication into addition."},
            {"name": "Score Equation", "latex": "S(\\theta) = \\frac{\\partial \\ell(\\theta)}{\\partial \\theta} = 0", "explanation": "First-order optimality condition for the likelihood peak."}
        ],
        "numericalExample": "Three observations: x = [10, 11, 12]. Candidate mu = 11: Residuals are [-1, 0, +1]. Squared sum = 2. Candidate mu = 15: Residuals are [-5, -4, -3]. Squared sum = 50. Since normal log-likelihood is proportional to -sum(x - mu)^2, mu = 11 maximizes the likelihood.",
        "pythonCode": "from scipy.optimize import minimize\nimport numpy as np\n\ndata = np.array([10, 11, 12])\ndef neg_log_lik(mu):\n    return np.sum((data - mu)**2) / 2.0  # proportional to negative log-likelihood\n\nres = minimize(neg_log_lik, x0=[0.0])\nprint(f'MLE for mu: {res.x[0]:.2f} (Sample Mean: {np.mean(data):.2f})')",
        "rCode": "data <- c(10, 11, 12)\nmle <- optimize(function(mu) -sum(dnorm(data, mu, 1, log=TRUE)), interval=c(0, 20))\ncat('MLE for mu:', mle$minimum)",
        "pitfalls": "Directly multiplying raw densities on a computer: for $n = 100$, $(0.05)^{100} \\approx 10^{-130}$, which underflows to 0.0 in floating point. Always work in log-likelihood space!",
        "interactiveType": "mle3d",
        "quiz": [
            {
                "question": "Why do statisticians maximize log-likelihood rather than raw likelihood?",
                "options": ["Log-likelihood has a different maximum", "The log converts products of densities into sums, simplifying calculus and preventing numerical underflow", "Logs remove negative numbers", "Computers only understand logs"],
                "answer": 1,
                "explanation": "Because log is a monotonically increasing function, maximizing log-likelihood yields the exact same optimal parameter while turning unstable products into tractable sums."
            }
        ]
    },
    56: {
        "shortTitle": "MLE for the Exponential Distribution",
        "moduleId": "module-9",
        "category": "Probability vs Likelihood & MLE",
        "duration": "7:50",
        "summary": "Deriving the maximum likelihood estimator for rate parameter lambda by differentiating the log-likelihood and solving for zero.",
        "bamIntuition": "Write down the likelihood for waiting times. Take the log. Differentiate with respect to lambda. Set to zero, and BAM: lambda_hat = 1 / x_bar! The best rate is 1 divided by the sample average!",
        "firstPrinciples": "For $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)$, the PDF is $f(x_i \\mid \\lambda) = \\lambda e^{-\\lambda x_i}$. The likelihood is $L(\\lambda) = \\prod_{i=1}^n \\lambda e^{-\\lambda x_i} = \\lambda^n \\exp\\left(-\\lambda \\sum_{i=1}^n x_i\\right)$. Taking the natural log gives: $\\ell(\\lambda) = n \\ln \\lambda - \\lambda \\sum_{i=1}^n x_i$. Differentiating with respect to $\\lambda$: $\\frac{d\\ell}{d\\lambda} = \\frac{n}{\\lambda} - \\sum_{i=1}^n x_i$. Setting $\\frac{d\\ell}{d\\lambda} = 0$: $\\frac{n}{\\lambda} = \\sum_{i=1}^n x_i \\implies \\hat{\\lambda}_{\\text{MLE}} = \\frac{n}{\\sum x_i} = \\frac{1}{\\bar{x}}$. The second derivative $\\frac{d^2\\ell}{d\\lambda^2} = -\\frac{n}{\\lambda^2} < 0$ confirms this is a maximum.",
        "mathFormulas": [
            {"name": "Exponential Log-Likelihood", "latex": "\\ell(\\lambda) = n \\ln(\\lambda) - \\lambda \\sum_{i=1}^n x_i", "explanation": "Log-likelihood as a function of rate lambda."},
            {"name": "MLE Rate Estimator", "latex": "\\hat{\\lambda}_{\\text{MLE}} = \\frac{1}{\\bar{x}}", "explanation": "The optimal rate parameter is the reciprocal of the sample mean."}
        ],
        "numericalExample": "Observed waiting times for 4 bus arrivals: [2, 3, 5, 10] minutes. Sum = 20 minutes. Mean x_bar = 20 / 4 = 5.0 minutes per bus. MLE rate lambda_hat = 1 / 5.0 = 0.20 buses per minute.",
        "pythonCode": "import numpy as np\n\nwait_times = np.array([2, 3, 5, 10])\nx_bar = np.mean(wait_times)\nlambda_mle = 1.0 / x_bar\nprint(f'Sample mean: {x_bar:.1f} min -> MLE lambda: {lambda_mle:.3f} per min')",
        "rCode": "wait_times <- c(2, 3, 5, 10)\nlambda_mle <- 1 / mean(wait_times)\ncat('MLE lambda:', lambda_mle)",
        "pitfalls": "Confusing rate parameterization ($f(x) = \\lambda e^{-\\lambda x}$) with scale parameterization ($f(x) = \\frac{1}{\\beta} e^{-x/\\beta}$). For scale, $\\hat{\\beta} = \\bar{x}$.",
        "interactiveType": "mle_exp",
        "quiz": [
            {
                "question": "What is the maximum likelihood estimator for the rate parameter lambda of an exponential distribution?",
                "options": ["x_bar", "1 / x_bar", "sqrt(x_bar)", "x_bar^2"],
                "answer": 1,
                "explanation": "Solving d/dlambda [n * ln(lambda) - lambda * sum(x_i)] = 0 directly gives lambda_hat = 1 / x_bar."
            }
        ]
    },
    57: {
        "shortTitle": "MLE for the Binomial Distribution",
        "moduleId": "module-9",
        "category": "Probability vs Likelihood & MLE",
        "duration": "8:25",
        "summary": "Deriving the maximum likelihood estimator for success probability p from n coin tosses or clinical trials from first principles.",
        "bamIntuition": "Flip a coin 100 times and get 60 heads. What's the most likely probability of heads? 60 / 100 = 0.60! MLE proves mathematically why your gut instinct is 100% correct! BAM!",
        "firstPrinciples": "For $k$ successes in $n$ independent Bernoulli trials, the likelihood is $L(p) = \\binom{n}{k} p^k (1-p)^{n-k}$. The log-likelihood is: $\\ell(p) = \\ln \\binom{n}{k} + k \\ln p + (n-k) \\ln (1-p)$. Differentiating with respect to $p$: $\\frac{d\\ell}{dp} = \\frac{k}{p} - \\frac{n-k}{1-p}$. Setting to zero: $\\frac{k}{p} = \\frac{n-k}{1-p} \\implies k(1-p) = p(n-k) \\implies k - kp = np - kp \\implies \\hat{p}_{\\text{MLE}} = \\frac{k}{n}$. The sample proportion is the exact MLE estimator.",
        "mathFormulas": [
            {"name": "Binomial Log-Likelihood", "latex": "\\ell(p) = \\ln \\binom{n}{k} + k \\ln(p) + (n-k) \\ln(1-p)", "explanation": "Log-likelihood function parameterized by probability p."},
            {"name": "MLE Success Probability", "latex": "\\hat{p}_{\\text{MLE}} = \\frac{k}{n}", "explanation": "The maximum likelihood estimator is the observed sample proportion."}
        ],
        "numericalExample": "Testing an ad: 150 clicks out of 1000 impressions. k = 150, n = 1000. MLE p_hat = 150 / 1000 = 0.15 (15% click-through rate). Any other value of p (e.g. 0.10 or 0.20) has lower likelihood.",
        "pythonCode": "k = 150\nn = 1000\np_mle = k / n\nprint(f'MLE estimate p-hat: {p_mle:.3f}')",
        "rCode": "k <- 150; n <- 1000\ncat('MLE p:', k / n)",
        "pitfalls": "Zero counts: If you flip a coin twice and get 2 heads, MLE says $\\hat{p} = 1.0$, predicting that tails is physically impossible! Bayesian estimation with Beta prior solves this via Laplace smoothing.",
        "interactiveType": "mle_binom",
        "quiz": [
            {
                "question": "What is the maximum likelihood estimator for success probability p given k successes in n trials?",
                "options": ["k / (n + 1)", "k / n", "(k - 1) / n", "sqrt(k / n)"],
                "answer": 1,
                "explanation": "Setting the derivative of the binomial log-likelihood to zero yields the sample proportion p_hat = k / n."
            }
        ]
    },
    58: {
        "shortTitle": "MLE for the Normal Distribution",
        "moduleId": "module-9",
        "category": "Probability vs Likelihood & MLE",
        "duration": "11:15",
        "summary": "Step-by-step multivariate calculus derivation of MLE for both parameters of the normal distribution: mean mu and variance sigma^2.",
        "bamIntuition": "We have TWO dials to twist: center (mu) and width (sigma)! Twist mu until the curve is centered on the average. Twist sigma until the bell width matches the spread! That 3D mountain peak is the joint MLE! BAM!",
        "firstPrinciples": "For $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\mathcal{N}(\\mu, \\sigma^2)$, the joint density yields log-likelihood: $\\ell(\\mu, \\sigma^2) = -\\frac{n}{2}\\ln(2\\pi) - \\frac{n}{2}\\ln(\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n (x_i - \\mu)^2$. Taking partial derivatives: 1. $\\frac{\\partial \\ell}{\\partial \\mu} = \\frac{1}{\\sigma^2}\\sum (x_i - \\mu) = 0 \\implies \\hat{\\mu}_{\\text{MLE}} = \\frac{1}{n}\\sum x_i = \\bar{x}$. 2. $\\frac{\\partial \\ell}{\\partial (\\sigma^2)} = -\\frac{n}{2\\sigma^2} + \\frac{1}{2(\\sigma^2)^2}\\sum (x_i - \\mu)^2 = 0 \\implies \\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum (x_i - \\bar{x})^2$. Notice MLE divides by $n$, not $n-1$, making $\\hat{\\sigma}^2_{\\text{MLE}}$ slightly biased downward!",
        "mathFormulas": [
            {"name": "Normal Log-Likelihood", "latex": "\\ell(\\mu, \\sigma^2) = -\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{\\sum_{i=1}^n (x_i - \\mu)^2}{2\\sigma^2}", "explanation": "Joint log-likelihood surface over parameters mu and sigma^2."},
            {"name": "MLE Variance Estimator", "latex": "\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2", "explanation": "Maximum likelihood divides by n (biased), unlike Bessel's correction which divides by n-1."}
        ],
        "numericalExample": "Sample: [2, 4, 6]. n = 3. Mean x_bar = 4. Squared deviations: (2-4)^2 + (4-4)^2 + (6-4)^2 = 4 + 0 + 4 = 8. MLE variance = 8 / 3 = 2.67. Unbiased sample variance s^2 = 8 / (3 - 1) = 4.00.",
        "pythonCode": "import numpy as np\n\ndata = np.array([2, 4, 6])\nmu_mle = np.mean(data)\nvar_mle = np.var(data, ddof=0)  # ddof=0 is MLE (divides by n)\nvar_unbiased = np.var(data, ddof=1)  # ddof=1 is Bessel (divides by n-1)\nprint(f'MLE mu: {mu_mle}, MLE sigma^2: {var_mle:.2f}, Unbiased s^2: {var_unbiased:.2f}')",
        "rCode": "data <- c(2, 4, 6)\ncat('MLE var:', mean((data - mean(data))^2), 'Unbiased s2:', var(data))",
        "pitfalls": "Assuming MLE is always unbiased. The MLE variance estimator $\\hat{\\sigma}^2_{\\text{MLE}}$ is biased: $E[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{n-1}{n}\\sigma^2$. As $n \\to \\infty$, the bias vanishes asymptotically.",
        "interactiveType": "mle_norm",
        "quiz": [
            {
                "question": "Does the Maximum Likelihood Estimator for normal variance divide by n or n-1?",
                "options": ["It divides by n-1", "It divides by n (which is biased)", "It divides by n+1", "It divides by degrees of freedom"],
                "answer": 1,
                "explanation": "Pure calculus optimization of the likelihood function produces 1/n in the variance estimator; Bessel's n-1 correction is an ad-hoc adjustment for unbiasedness."
            }
        ]
    },
    59: {
        "shortTitle": "Odds and Log(Odds)",
        "moduleId": "module-11",
        "category": "Bayesian & Odds",
        "duration": "8:50",
        "summary": "Transforming bounded probability p in [0, 1] into unbounded odds in [0, inf) and symmetric log-odds in (-inf, +inf), the backbone of logistic regression.",
        "bamIntuition": "Probability stops at 0 and 1. Odds = Chance of Winning / Chance of Losing. If you have 80% chance of winning, your odds are 80/20 = 4 to 1! Take the logarithm, and BAM: You map everything smoothly from negative infinity to positive infinity!",
        "firstPrinciples": "Let $p = P(E) \\in [0, 1]$ be the probability of an event. The odds are defined as the ratio $\\text{Odds} = \\frac{p}{1 - p} \\in [0, \\infty)$. Odds equal 1.0 at equal likelihood ($p = 0.5$). The logit function is the natural log of odds: $\\text{logit}(p) = \\ln\\left(\\frac{p}{1 - p}\\right) \\in (-\\infty, \\infty)$. The logit maps the constrained probability interval $(0, 1)$ onto the real line $\\mathbb{R}$, allowing linear modeling: $\\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 X$. Inverting yields the logistic sigmoid: $p = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 X)}}$.",
        "mathFormulas": [
            {"name": "Odds Definition", "latex": "\\text{Odds} = \\frac{p}{1 - p}", "explanation": "Ratio of probability of occurrence to probability of non-occurrence."},
            {"name": "Log-Odds (Logit)", "latex": "\\text{Logit}(p) = \\ln\\left(\\frac{p}{1 - p}\\right)", "explanation": "Transforms probability into an unbounded symmetric linear scale."}
        ],
        "numericalExample": "If p = 0.80: Odds = 0.80 / (1 - 0.80) = 0.80 / 0.20 = 4.0 (or '4 to 1'). Log-odds = ln(4.0) = +1.386. If p = 0.20: Odds = 0.20 / 0.80 = 0.25 (or '1 to 4'). Log-odds = ln(0.25) = -1.386. Notice that log-odds has perfect anti-symmetry around 0!",
        "pythonCode": "import numpy as np\n\ndef prob_to_log_odds(p):\n    odds = p / (1 - p)\n    return np.log(odds)\n\nfor p in [0.1, 0.2, 0.5, 0.8, 0.9]:\n    print(f'p = {p:.1f} -> Odds = {p/(1-p):.2f} -> Log(Odds) = {prob_to_log_odds(p):.3f}')",
        "rCode": "p <- c(0.1, 0.2, 0.5, 0.8, 0.9)\nqlogis(p)  # R built-in logit function",
        "pitfalls": "Confusing odds with probability. Saying 'odds are 50%' is meaningless; odds of 1 to 1 corresponds to a 50% probability.",
        "interactiveType": "odds",
        "quiz": [
            {
                "question": "What is the log-odds (logit) when probability p = 0.50?",
                "options": ["1.0", "0.0", "0.50", "-1.0"],
                "answer": 1,
                "explanation": "When p = 0.50, Odds = 0.50 / 0.50 = 1.0. The natural log of 1.0 is ln(1) = 0."
            }
        ]
    },
    60: {
        "shortTitle": "Odds Ratios and Log(Odds Ratios)",
        "moduleId": "module-11",
        "category": "Bayesian & Odds",
        "duration": "9:30",
        "summary": "Comparing odds between two groups to quantify association strength in case-control studies, and exponentiating logistic regression coefficients.",
        "bamIntuition": "Did people taking the drug have lower odds of disease than people taking placebo? Divide the two odds! If the Odds Ratio is 0.25, the treated group has one-quarter the odds of sickness! BAM: Odds Ratio!",
        "firstPrinciples": "In a $2 \\times 2$ contingency table with groups (Exposed vs Unexposed) and outcomes (Disease vs Healthy): Group 1 odds is $\\text{Odds}_1 = \\frac{a}{b}$, and Group 2 odds is $\\text{Odds}_2 = \\frac{c}{d}$. The Odds Ratio is $\\text{OR} = \\frac{a/b}{c/d} = \\frac{ad}{bc}$. An $\\text{OR} = 1.0$ indicates no association. $\\text{OR} > 1$ implies positive association with exposure. In logistic regression, exponentiating a slope coefficient gives the adjusted odds ratio: $\\text{OR}_j = e^{\\beta_j}$. Taking the natural log yields symmetric log(odds ratio): $\\ln(\\text{OR}) = \\ln(a) - \\ln(b) - \\ln(c) + \\ln(d)$, with asymptotic standard error $\\text{SE}(\\ln \\text{OR}) = \\sqrt{\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} + \\frac{1}{d}}$.",
        "mathFormulas": [
            {"name": "Cross-Product Odds Ratio", "latex": "\\text{OR} = \\frac{a \\cdot d}{b \\cdot c}", "explanation": "Ratio of odds in exposed versus unexposed populations."},
            {"name": "Logistic Slope Exponentiation", "latex": "\\text{OR}_j = e^{\\beta_j}", "explanation": "Factor by which odds multiply for a 1-unit increase in predictor X_j."}
        ],
        "numericalExample": "Smokers: 20 lung cancer, 80 healthy (Odds = 20/80 = 0.25). Non-smokers: 2 lung cancer, 98 healthy (Odds = 2/98 = 0.0204). Odds Ratio = 0.25 / 0.0204 = 12.25. Smokers have 12.25 times higher odds of lung cancer compared to non-smokers.",
        "pythonCode": "import numpy as np\nfrom scipy import stats\n\ntable = [[20, 80], [2, 98]]\nres = stats.contingency.odds_ratio(table)\nprint(f'Sample Odds Ratio: {res.statistic:.2f}')\nprint(f'95% CI: [{res.confidence_interval().low:.2f}, {res.confidence_interval().high:.2f}]')",
        "rCode": "tab <- matrix(c(20, 80, 2, 98), nrow=2, byrow=TRUE)\n(tab[1,1]*tab[2,2]) / (tab[1,2]*tab[2,1])",
        "pitfalls": "Confusing Odds Ratio (OR) with Relative Risk (RR). When an outcome is common (e.g. 40% prevalence), the Odds Ratio dramatically overstates the Relative Risk.",
        "interactiveType": "odds_ratios",
        "quiz": [
            {
                "question": "If a logistic regression coefficient for a treatment is beta = -0.693, what is the treatment Odds Ratio e^beta?",
                "options": ["-0.693", "0.50", "2.0", "1.0"],
                "answer": 1,
                "explanation": "e^(-0.693) = 0.50, meaning the treated group has half the odds of the adverse outcome."
            }
        ]
    },
    61: {
        "shortTitle": "Frank Starmer Clearly Explained",
        "moduleId": "module-11",
        "category": "Bayesian & Odds",
        "duration": "6:50",
        "summary": "Honoring Frank Starmer: the mentor, cardiologist, and father who taught Josh Starmer how to strip away academic pretense and focus on first-principles clarity.",
        "bamIntuition": "Josh's pop, Frank Starmer, taught him the golden rule of science: If you can't explain it simply with clean pictures, you don't really understand it! That's the heart and soul of StatQuest! BAM!",
        "firstPrinciples": "Scientific inquiry often suffers from the curse of knowledge: experts forget what it was like not knowing a concept, constructing impenetrable fortresses of jargon. Frank Starmer advocated radical pedagogical reductionism: 1. Always trace any metric back to its physical or biological origin; 2. Never hide behind formulas you cannot derive from scratch on a chalkboard; 3. Use visual analogies that anchor directly in human sensory experience. This philosophy forms the foundation of all StatQuest visual paradigms.",
        "mathFormulas": [
            {"name": "First-Principles Pedagogy", "latex": "\\text{Mastery} = \\frac{\\text{Conceptual Clarity}}{\\text{Unnecessary Jargon}}", "explanation": "The Frank Starmer educational principle: minimize rote memorization, maximize visual intuition."},
            {"name": "Simplicity Principle", "latex": "\\lim_{t \\to \\infty} \\text{Truth} = \\text{Simplicity}", "explanation": "True understanding converges to simple, self-evident models."}
        ],
        "numericalExample": "Instead of defining an eigenvalue as 'roots of the characteristic polynomial det(A - lambda*I) = 0', Frank taught: 'When you stretch the rubber sheet, which directions don't rotate? Those are the eigenvectors!'",
        "pythonCode": "# The StatQuest Philosophy\ndef explain_clearly(topic):\n    return f'Break {topic} into bite-sized visual pieces. BAM!'\n\nprint(explain_clearly('Statistics'))",
        "rCode": "message('Keep it simple. Draw pictures. BAM!')",
        "pitfalls": "Believing that making an explanation needlessly dense, dry, or mathematically intimidating makes it more rigorous.",
        "interactiveType": "frank_starmer",
        "quiz": [
            {
                "question": "What is the primary philosophical lesson passed from Frank Starmer to StatQuest?",
                "options": ["Always use R instead of Python", "If you can't explain an idea simply with clear visuals, you haven't mastered it from first principles", "Statistics requires memorizing 50 test formulas", "Publish as many papers as possible"],
                "answer": 1,
                "explanation": "True mastery is demonstrated by the ability to explain complex ideas simply and intuitively from first principles."
            }
        ]
    },
    62: {
        "shortTitle": "Why Dividing by N Underestimates Variance",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "10:15",
        "summary": "Mathematical proof of Bessel's correction: why sample deviations from the sample mean x_bar systematically underestimate true variance from population mean mu.",
        "bamIntuition": "Data points are naturally CLOSER to their own sample mean than to the true hidden population mean! Measuring deviations from x_bar underestimates the real spread. Dividing by n-1 instead of n gives it the exact mathematical boost it needs! BAM!",
        "firstPrinciples": "Let $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} (\\mu, \\sigma^2)$. If we knew $\\mu$, the unbiased estimator would be $\\frac{1}{n}\\sum (X_i - \\mu)^2$. However, we must substitute the sample mean $\\bar{X}$. We expand the deviation: $X_i - \\mu = (X_i - \\bar{X}) + (\\bar{X} - \\mu)$. Squaring and summing gives: $\\sum_{i=1}^n (X_i - \\mu)^2 = \\sum_{i=1}^n (X_i - \\bar{X})^2 + n(\\bar{X} - \\mu)^2$. Taking expectations: $E\\left[\\sum (X_i - \\mu)^2\\right] = n\\sigma^2$. The second term is $E[n(\\bar{X} - \\mu)^2] = n \\text{Var}(\\bar{X}) = n \\left(\\frac{\\sigma^2}{n}\\right) = \\sigma^2$. Therefore: $E\\left[\\sum (X_i - \\bar{X})^2\\right] = n\\sigma^2 - \\sigma^2 = (n - 1)\\sigma^2$. Dividing by $n$ yields $\\frac{n-1}{n}\\sigma^2 < \\sigma^2$ (biased!). Dividing by $n-1$ yields exactly $E[s^2] = \\sigma^2$.",
        "mathFormulas": [
            {"name": "Deviation Identity", "latex": "\\sum_{i=1}^n (X_i - \\mu)^2 = \\sum_{i=1}^n (X_i - \\bar{X})^2 + n(\\bar{X} - \\mu)^2", "explanation": "Total squared distance from true mean equals sum of squared deviations from sample mean plus mean estimation error."},
            {"name": "Expectation of Sample Variance", "latex": "E\\left[\\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2\\right] = \\sigma^2", "explanation": "Bessel's correction cancels the (n-1) factor, ensuring the estimator is exactly unbiased."}
        ],
        "numericalExample": "Population: [0, 10], true mu = 5, true sigma^2 = ((0-5)^2 + (10-5)^2)/2 = 25. Draw sample of size n = 2: Case 1: [0, 0] -> x_bar = 0, dev^2 = 0. Case 2: [10, 10] -> x_bar = 10, dev^2 = 0. Case 3: [0, 10] -> x_bar = 5, dev^2 = 50. Average sample dev^2 = (0 + 0 + 50 + 50)/4 = 25. If you divide by n = 2: variance estimate = 12.5 (underestimates 25 by exactly half!). If you divide by n - 1 = 1: variance estimate = 25 / 1 = 25 (exact unbiased truth!).",
        "pythonCode": "import numpy as np\n\n# Monte Carlo proof of Bessel's correction\ntrue_sigma2 = 16.0\nn = 4\nB = 100000\n\nsamples = np.random.normal(loc=10, scale=4.0, size=(B, n))\nvar_n = np.mean(np.var(samples, axis=1, ddof=0))\nvar_n_minus_1 = np.mean(np.var(samples, axis=1, ddof=1))\n\nprint(f'True Variance:        {true_sigma2:.2f}')\nprint(f'Dividing by N:        {var_n:.2f} (Biased downward!)')\nprint(f'Dividing by N-1:      {var_n_minus_1:.2f} (Unbiased!)')",
        "rCode": "samples <- matrix(rnorm(400000, 10, 4), ncol=4)\ncat('Div by N:  ', mean(apply(samples, 1, function(x) mean((x-mean(x))^2))), '\\n')\ncat('Div by N-1:', mean(apply(samples, 1, var)))",
        "pitfalls": "Believing Bessel's correction makes the standard deviation unbiased. The square root function is concave, so by Jensen's inequality: $E[s] = E[\\sqrt{s^2}] < \\sqrt{E[s^2]} = \\sigma$. While $s^2$ is unbiased for $\\sigma^2$, sample standard deviation $s$ still slightly underestimates true $\\sigma$!",
        "interactiveType": "bessel",
        "quiz": [
            {
                "question": "Why does measuring deviations from the sample mean x_bar underestimate spread compared to measuring from the true mean mu?",
                "options": ["Because computers have rounding errors", "Because x_bar is by definition the center of the sample, so data points are closer to x_bar than to any other number (including mu)", "Because variance must always be positive", "Because n is less than infinity"],
                "answer": 1,
                "explanation": "By definition, the sample mean minimizes sum(x_i - c)^2. Substituting true mean mu instead of x_bar produces a strictly larger sum of squares, so deviations from x_bar are systematically compressed."
            }
        ]
    }
}

print(f"Group 4 defined with {len(GROUP_4)} videos.")
