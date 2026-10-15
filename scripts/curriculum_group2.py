# scripts/curriculum_group2.py
"""
Rich pedagogical content for videos 16 to 30.
"""

GROUP_2 = {
    16: {
        "shortTitle": "Statistical Power",
        "moduleId": "module-6",
        "category": "Statistical Errors & Power",
        "duration": "8:10",
        "summary": "Statistical power (1 - beta) is the probability of correctly rejecting a false null hypothesis, ensuring genuine biological or physical effects are detected.",
        "bamIntuition": "Power is the sensitivity of your scientific detector! If a real effect exists, power is the chance your experiment actually spots it instead of missing it like a blind bat. BAM!",
        "firstPrinciples": "In decision theory, four outcomes exist: True Negative ($1 - \\alpha$), False Positive Type I error ($\\alpha$), False Negative Type II error ($\\beta$), and True Positive Power ($1 - \\beta$). Power is formally defined as $1 - \\beta = P(\\text{Reject } H_0 \\mid H_1 \\text{ is true})$. Power increases monotonically with: 1. Larger sample size $n$; 2. Larger true effect size $\\delta = |\\mu_1 - \\mu_0|$; 3. Lower measurement noise $\\sigma$; and 4. Higher significance threshold $\\alpha$.",
        "mathFormulas": [
            {"name": "Statistical Power Formula", "latex": "1 - \\beta = \\Phi\\left(\\frac{|\\mu_1 - \\mu_0|}{\\sigma / \\sqrt{n}} - z_{1 - \\alpha/2}\\right)", "explanation": "Probability of rejecting the null when the true mean difference is mu1 - mu0."},
            {"name": "Type II Error Rate", "latex": "\\beta = P(\\text{Fail to reject } H_0 \\mid H_1 \\text{ is true})", "explanation": "Probability of a false negative result."}
        ],
        "numericalExample": "Suppose effect size delta = 5, sigma = 10, alpha = 0.05 (z_crit = 1.96). With n = 16: SE = 10 / sqrt(16) = 2.5. Z_shift = 5 / 2.5 = 2.0. Power = Phi(2.0 - 1.96) = Phi(0.04) = 51.6% (almost a coin flip!). With n = 64: SE = 1.25. Z_shift = 5 / 1.25 = 4.0. Power = Phi(4.0 - 1.96) = Phi(2.04) = 97.9%!",
        "pythonCode": "from statsmodels.stats.power import TTestIndPower\n\nanalysis = TTestIndPower()\neffect_size = 0.5  # Cohen's d\npower = analysis.power(effect_size=effect_size, nobs1=64, alpha=0.05)\nprint(f'Calculated Statistical Power: {power:.3f}')",
        "rCode": "power.t.test(n=64, delta=0.5, sd=1, sig.level=0.05, type='two.sample')",
        "pitfalls": "Running studies with low power (e.g. 20%). When low-power studies do find p < 0.05, effect sizes are dramatically overestimated (the Winner's Curse).",
        "interactiveType": "power",
        "quiz": [
            {
                "question": "If statistical power is 80%, what is the Type II error rate beta?",
                "options": ["80%", "20%", "5%", "10%"],
                "answer": 1,
                "explanation": "By definition, Power = 1 - beta. If Power is 80% (0.80), then beta = 1 - 0.80 = 20% (0.20)."
            }
        ]
    },
    17: {
        "shortTitle": "Power Analysis",
        "moduleId": "module-6",
        "category": "Statistical Errors & Power",
        "duration": "6:45",
        "summary": "Prospective power analysis calculates the minimum sample size required before running an experiment to achieve a desired detection probability.",
        "bamIntuition": "Don't guess how many mice or patients you need! Do a Power Analysis BEFORE spending millions of dollars to ensure you have enough data to see the effect! BAM!",
        "firstPrinciples": "Prospective sample size determination solves for $n$ in the power equation: $n = \\frac{(z_{1 - \\alpha/2} + z_{1 - \\beta})^2 \\sigma^2}{(\\mu_1 - \\mu_0)^2} = \\frac{(z_{1 - \\alpha/2} + z_{1 - \\beta})^2}{d^2}$, where $d = \\frac{|\\mu_1 - \\mu_0|}{\\sigma}$ is Cohen's standardized effect size. Retrospective or post-hoc power calculated using the observed sample effect size is tautological and mathematically invalid.",
        "mathFormulas": [
            {"name": "Sample Size Equation", "latex": "n = 2 \\cdot \\left(\\frac{z_{1-\\alpha/2} + z_{1-\\beta}}{d}\\right)^2", "explanation": "Required sample size per group for a two-sample t-test with standardized effect d."},
            {"name": "Cohen's d", "latex": "d = \\frac{\\mu_1 - \\mu_2}{\\sigma_{\\text{pooled}}}", "explanation": "Difference between group means divided by pooled standard deviation."}
        ],
        "numericalExample": "To detect a medium effect size d = 0.5 at alpha = 0.05 (z = 1.96) with 80% power (z = 0.84): n = 2 * ((1.96 + 0.84) / 0.5)^2 = 2 * (2.80 / 0.5)^2 = 2 * (5.6)^2 = 2 * 31.36 = 62.72. You need 63 subjects per group (126 total).",
        "pythonCode": "from statsmodels.stats.power import TTestIndPower\n\nanalysis = TTestIndPower()\nn_required = analysis.solve_power(effect_size=0.5, power=0.80, alpha=0.05)\nprint(f'Required n per group: {int(np.ceil(n_required))}')",
        "rCode": "res <- power.t.test(delta=0.5, sd=1, power=0.8, sig.level=0.05)\ncat('Required n per group:', ceiling(res$n))",
        "pitfalls": "Calculating 'post-hoc power' from observed p-values; if p > 0.05, post-hoc power is guaranteed to look low, adding zero new information.",
        "interactiveType": "power_analysis",
        "quiz": [
            {
                "question": "If you want to double your detection resolution (cut effect size in half), by what factor must sample size increase?",
                "options": ["2x", "4x", "8x", "1.41x"],
                "answer": 1,
                "explanation": "Because n is inversely proportional to d^2, halving d requires (2)^2 = 4 times as many samples."
            }
        ]
    },
    18: {
        "shortTitle": "Covariance",
        "moduleId": "module-8",
        "category": "Covariance & Correlation",
        "duration": "7:15",
        "summary": "Covariance measures the joint variability of two random variables, indicating whether they tend to increase together or move inversely.",
        "bamIntuition": "When X is bigger than average, does Y also jump above average? If yes, their product is positive! Average those products, and BAM: Positive Covariance!",
        "firstPrinciples": "The covariance between random variables $X$ and $Y$ is defined as $\\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]$. If $X$ and $Y$ are independent, $\\text{Cov}(X, Y) = 0$ (the converse is not generally true). The sample covariance is $s_{xy} = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})$. The units of covariance are the product of the units of $X$ and $Y$, making its raw numerical magnitude difficult to interpret without standardization.",
        "mathFormulas": [
            {"name": "Population Covariance", "latex": "\\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)]", "explanation": "Expected product of deviations from respective means."},
            {"name": "Sample Covariance", "latex": "s_{xy} = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})", "explanation": "Unbiased estimator using n-1 degrees of freedom."}
        ],
        "numericalExample": "Pairs (X: Height in in, Y: Weight in lbs): (65, 130), (70, 160), (75, 190). x_bar = 70, y_bar = 160. Deviations: (-5, -30), (0, 0), (+5, +30). Products: (-5)*(-30) = 150; 0*0 = 0; (+5)*(+30) = 150. Sum = 300. Sample Covariance = 300 / (3 - 1) = 150 in*lbs.",
        "pythonCode": "import numpy as np\n\nx = np.array([65, 70, 75])\ny = np.array([130, 160, 190])\ncov_matrix = np.cov(x, y)\nprint('Sample Covariance:', cov_matrix[0, 1])",
        "rCode": "x <- c(65, 70, 75); y <- c(130, 160, 190)\ncov(x, y)",
        "pitfalls": "Assuming a large covariance means a stronger relationship than a small covariance. Covariance depends directly on the units of scale (e.g. measuring in grams vs kilograms changes covariance by 1,000x).",
        "interactiveType": "covariance",
        "quiz": [
            {
                "question": "If Cov(X, Y) = 0, are X and Y guaranteed to be independent?",
                "options": ["Yes, always", "No, zero covariance only rules out linear correlation; non-linear dependencies can still exist", "Only if both variables are discrete", "Only if sample size > 30"],
                "answer": 1,
                "explanation": "Independence implies zero covariance, but zero covariance does not imply independence (e.g. Y = X^2 with symmetric X around 0 has Cov = 0 but perfect deterministic dependence)."
            }
        ]
    },
    19: {
        "shortTitle": "Pearson's Correlation",
        "moduleId": "module-8",
        "category": "Covariance & Correlation",
        "duration": "8:20",
        "summary": "Standardizing covariance by the product of both standard deviations produces Pearson's r, a dimensionless metric bounded strictly between -1 and +1.",
        "bamIntuition": "Covariance with units stripped away! Divide covariance by both standard deviations, and BAM: you get a pure number between -1 and +1 that tells you how tight the line is!",
        "firstPrinciples": "Pearson's product-moment correlation coefficient is defined as $\\rho_{X,Y} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$. By the Cauchy-Schwarz inequality, $|\text{Cov}(X,Y)| \\le \\sqrt{\\text{Var}(X)\\text{Var}(Y)}$, proving that $-1 \\le \\rho \\le 1$. $\\rho = +1$ (or $-1$) occurs if and only if $Y = aX + b$ with $a > 0$ (or $a < 0$) with probability 1. Geometrically, $\\rho$ is the cosine of the angle $\\theta$ between the mean-centered observation vectors in $\\mathbb{R}^n$: $r = \\cos \\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$.",
        "mathFormulas": [
            {"name": "Pearson's r", "latex": "r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2} \\sqrt{\\sum_{i=1}^n (y_i - \\bar{y})^2}}", "explanation": "Ratio of sample covariance to maximum possible covariance."},
            {"name": "Dimensionless Invariance", "latex": "r(aX + b, cY + d) = \\text{sgn}(ac) \\cdot r(X, Y)", "explanation": "Correlation is invariant to positive linear scaling and shifts."}
        ],
        "numericalExample": "Using the previous example: s_xy = 150. s_x = sqrt(50/2) = 5. s_y = sqrt(1800/2) = 30. r = 150 / (5 * 30) = 150 / 150 = +1.0. A perfect positive linear relationship.",
        "pythonCode": "import numpy as np\nfrom scipy import stats\n\nx = np.array([65, 70, 75])\ny = np.array([130, 160, 190])\nr, p_val = stats.pearsonr(x, y)\nprint(f'Pearson r: {r:.4f}, p-value: {p_val:.4f}')",
        "rCode": "x <- c(65, 70, 75); y <- c(130, 160, 190)\ncor.test(x, y)",
        "pitfalls": "Assuming correlation equals causation, or assuming r = 0 means no relationship exists (e.g. parabolic data $Y = X^2$ has $r \\approx 0$ despite perfect deterministic coupling).",
        "interactiveType": "cov3d",
        "quiz": [
            {
                "question": "What is the geometric interpretation of Pearson's r between two centered data vectors?",
                "options": ["The slope of the line", "The cosine of the angle between the two vectors in data space", "The area of the projection", "The Euclidean distance between endpoints"],
                "answer": 1,
                "explanation": "In linear algebra, the centered correlation coefficient equals the dot product divided by vector norms, which is exactly cos(theta)."
            }
        ]
    },
    20: {
        "shortTitle": "Conditional Probabilities",
        "moduleId": "module-11",
        "category": "Bayesian & Odds",
        "duration": "7:40",
        "summary": "Conditional probability quantifies the updated likelihood of an event occurring given that another event has already occurred.",
        "bamIntuition": "When you get new information, your universe shrinks! Conditional probability simply cuts down the denominator to only include the cases where the condition happened. BAM!",
        "firstPrinciples": "Given events $A, B \\in \\mathcal{F}$ with $P(B) > 0$, the conditional probability of $A$ given $B$ is defined by Kolmogorov as $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$. The condition event $B$ replaces the original sample space $\\Omega$ with $B$ as the new restricted universe, renormalizing probabilities so that $P(B \\mid B) = 1$. The multiplication rule follows: $P(A \\cap B) = P(A \\mid B) P(B) = P(B \\mid A) P(A)$. Two events are independent if and only if $P(A \\mid B) = P(A)$.",
        "mathFormulas": [
            {"name": "Conditional Definition", "latex": "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}", "explanation": "Probability of A restricted to the subspace where B has occurred."},
            {"name": "Multiplication Rule", "latex": "P(A \\cap B) = P(A \\mid B) \\cdot P(B)", "explanation": "Joint probability decomposed into conditional and marginal components."}
        ],
        "numericalExample": "A standard 52-card deck. Event A: Card is a King (4 cards). Event B: Card is a Face Card (12 cards). P(King | Face Card) = P(King and Face Card) / P(Face Card) = (4/52) / (12/52) = 4 / 12 = 1/3 (33.3%). Notice prior P(King) was 4/52 = 7.7%.",
        "pythonCode": "# Deck simulation\nfaces = 12\nkings = 4\np_king_given_face = kings / faces\nprint(f'P(King | Face Card) = {p_king_given_face:.3f}')",
        "rCode": "p_king_given_face <- 4 / 12\ncat('P(King | Face):', p_king_given_face)",
        "pitfalls": "Confusing P(A | B) with P(B | A) (the prosecutor's fallacy). The probability of having a sore throat given you have strep is 90%, but the probability of having strep given you have a sore throat might only be 10%.",
        "interactiveType": "conditional_prob",
        "quiz": [
            {
                "question": "If P(A | B) = P(A), what can we conclude about events A and B?",
                "options": ["A and B are mutually exclusive", "A and B are independent", "P(B) must equal 1", "A contains B"],
                "answer": 1,
                "explanation": "If conditioning on B leaves the probability of A unchanged, A and B are statistically independent."
            }
        ]
    },
    21: {
        "shortTitle": "Bayes' Theorem",
        "moduleId": "module-11",
        "category": "Bayesian & Odds",
        "duration": "10:35",
        "summary": "Bayes' Theorem provides the mathematical framework for updating prior beliefs with empirical evidence to compute posterior probabilities.",
        "bamIntuition": "Start with your prior belief. Multiply by the likelihood of your test results. Normalize by all possible outcomes, and BAM: You get the updated posterior probability!",
        "firstPrinciples": "Equating the two forms of the intersection $P(A \\cap B) = P(B \\mid A)P(A) = P(A \\mid B)P(B)$ and dividing by $P(B)$ yields Bayes' Theorem: $P(A \\mid B) = \\frac{P(B \\mid A) P(A)}{P(B)}$. By the Law of Total Probability, the marginal evidence is $P(B) = P(B \\mid A)P(A) + P(B \\mid A^c)P(A^c)$. This illuminates the base-rate fallacy: when a condition is rare (low prior $P(A)$), even an accurate test produces a surprisingly high rate of false discoveries.",
        "mathFormulas": [
            {"name": "Bayes' Theorem", "latex": "P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}", "explanation": "Posterior equals (Likelihood times Prior) divided by Evidence."},
            {"name": "Law of Total Probability", "latex": "P(B) = \\sum_{i} P(B \\mid A_i) P(A_i)", "explanation": "Total probability of evidence aggregated over all partition states."}
        ],
        "numericalExample": "Rare disease affects 1 in 1000 people (Prior = 0.001). Test has 99% Sensitivity (P(+|D) = 0.99) and 95% Specificity (P(-|No D) = 0.95, so False Positive = 0.05). If you test positive, what is P(Disease | +)? Numerator = 0.99 * 0.001 = 0.00099. Denominator = (0.99 * 0.001) + (0.05 * 0.999) = 0.00099 + 0.04995 = 0.05094. P(Disease | +) = 0.00099 / 0.05094 = 1.94%! Despite a 99% accurate test, ~98% of positive tests are false alarms due to the low base rate.",
        "pythonCode": "prior = 0.001\nsensitivity = 0.99\nfalse_positive_rate = 0.05\n\np_pos = (sensitivity * prior) + (false_positive_rate * (1 - prior))\nposterior = (sensitivity * prior) / p_pos\nprint(f'P(Disease | Positive Test) = {posterior:.4f} ({posterior*100:.2f}%)')",
        "rCode": "prior <- 0.001; sens <- 0.99; fpr <- 0.05\np_pos <- sens * prior + fpr * (1 - prior)\nposterior <- (sens * prior) / p_pos\ncat('Posterior:', posterior)",
        "pitfalls": "Neglecting the prior base rate (base rate neglect). A 99% accurate medical test for a 1-in-a-million disease will yield overwhelmingly false positives.",
        "interactiveType": "bayes",
        "quiz": [
            {
                "question": "What is the primary reason why a 99% sensitive and 95% specific test produces mostly false positives for a very rare disease?",
                "options": ["The test was poorly calibrated", "The vast number of healthy people tested overwhelms the small number of sick people", "Bayes Theorem does not apply to medicine", "The p-value is greater than 0.05"],
                "answer": 1,
                "explanation": "Because 99.9% of the population is healthy, a 5% false positive rate across thousands of healthy individuals generates far more positive flags than the true positives."
            }
        ]
    },
    22: {
        "shortTitle": "Expected Values: Main Ideas",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "6:20",
        "summary": "Expected value is the probability-weighted long-run average of all possible values a random variable can take.",
        "bamIntuition": "If you played a lottery game a million times, what would your average payoff be per ticket? Multiply each prize by its chance of winning, add them up, and BAM: Expected Value!",
        "firstPrinciples": "For a discrete random variable $X$ taking values in $\\mathcal{X}$ with probability mass function $p(x)$, the expected value is $E[X] = \\sum_{x \\in \\mathcal{X}} x \\, p(x)$, provided $\\sum |x| p(x) < \\infty$. By the Law of Large Numbers, the sample mean $\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i$ converges almost surely to $E[X]$ as $n \\to \\infty$. Expectation is linear: $E[aX + bY] = aE[X] + bE[Y]$ regardless of whether $X$ and $Y$ are independent.",
        "mathFormulas": [
            {"name": "Discrete Expected Value", "latex": "E[X] = \\sum_{i} x_i \\cdot P(X = x_i)", "explanation": "Sum of values weighted by their respective probability masses."},
            {"name": "Linearity of Expectation", "latex": "E[aX + bY + c] = aE[X] + bE[Y] + c", "explanation": "Expectation distributes linearly without requiring independence."}
        ],
        "numericalExample": "A raffle ticket costs $5. 1 ticket wins $1000 (prob 1/1000). 10 tickets win $50 (prob 10/1000). 989 tickets win $0. Expected prize: E[X] = (1000 * 0.001) + (50 * 0.010) + (0 * 0.989) = $1.00 + $0.50 + $0 = $1.50. Expected profit = $1.50 - $5.00 = -$3.50 per ticket.",
        "pythonCode": "import numpy as np\n\nprizes = np.array([1000, 50, 0])\nprobs = np.array([1/1000, 10/1000, 989/1000])\nexpected_payout = np.sum(prizes * probs)\nprint(f'Expected payout: ${expected_payout:.2f}')",
        "rCode": "prizes <- c(1000, 50, 0)\nprobs <- c(1/1000, 10/1000, 989/1000)\ncat('Expected payout: $', sum(prizes * probs))",
        "pitfalls": "Expecting the 'expected value' to be an outcome that can actually happen in a single trial (e.g. rolling a fair die has expected value 3.5, but you can never roll a 3.5).",
        "interactiveType": "expected_value",
        "quiz": [
            {
                "question": "Does linearity of expectation E[X + Y] = E[X] + E[Y] require X and Y to be independent?",
                "options": ["Yes, always", "No, it holds unconditionally for any random variables", "Only if both variables are normal", "Only when variance is finite"],
                "answer": 1,
                "explanation": "Linearity of expectation holds unconditionally for all random variables, independent or dependent."
            }
        ]
    },
    23: {
        "shortTitle": "Expected Values for Continuous Variables",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "7:05",
        "summary": "Extending expected value to continuous domains by taking the integral of value times density across the entire real number support.",
        "bamIntuition": "Think of a continuous probability density curve as a physical wooden board. Where can you put your finger so it balances perfectly without tipping? That balance point is the Expected Value! BAM!",
        "firstPrinciples": "For a continuous random variable $X$ with PDF $f(x)$, the expected value is defined as the Riemann-Stieltjes integral $E[X] = \\int_{-\\infty}^{\\infty} x \\, f(x) \\, dx$. Physically, this represents the first moment (center of mass). For functions $g(X)$, the Law of the Unconscious Statistician (LOTUS) guarantees $E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) \\, f(x) \\, dx$. The variance is the second central moment: $\\text{Var}(X) = E[(X - E[X])^2] = \\int_{-\\infty}^\\infty (x - \\mu)^2 f(x) dx$.",
        "mathFormulas": [
            {"name": "Continuous Expected Value", "latex": "E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\,dx", "explanation": "The probability-density weighted integral across the entire domain."},
            {"name": "LOTUS Formula", "latex": "E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) \\cdot f(x)\\,dx", "explanation": "Calculating expectations of transformed functions without deriving their new PDF."}
        ],
        "numericalExample": "For an exponential distribution with rate lambda = 2: f(x) = 2e^(-2x) for x >= 0. Integral of x * 2e^(-2x) dx from 0 to infinity using integration by parts gives 1/lambda = 1/2 = 0.5.",
        "pythonCode": "import scipy.integrate as integrate\nimport numpy as np\n\nlam = 2.0\n# E[X] = integral of x * lambda * exp(-lambda * x)\nval, _ = integrate.quad(lambda x: x * lam * np.exp(-lam * x), 0, np.inf)\nprint(f'Integrated Continuous Expected Value: {val:.4f}')",
        "rCode": "f <- function(x) x * 2 * exp(-2 * x)\nintegrate(f, lower=0, upper=Inf)$value",
        "pitfalls": "Assuming all continuous distributions have a finite expected value. The Cauchy distribution $f(x) = \\frac{1}{\\pi(1+x^2)}$ has symmetric density around 0, but its integral does not converge, so its expected value is undefined.",
        "interactiveType": "expected_continuous",
        "quiz": [
            {
                "question": "What is the expected value of a standard normal distribution N(0, 1)?",
                "options": ["1", "0", "0.5", "Undefined"],
                "answer": 1,
                "explanation": "Because f(x) is perfectly symmetric around 0, x * f(x) is an odd function, integrating to exactly 0."
            }
        ]
    },
    24: {
        "shortTitle": "The Binomial Distribution and Test",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "9:15",
        "summary": "Models the number of successes in n independent Bernoulli trials with fixed probability p, providing exact hypothesis tests for proportions.",
        "bamIntuition": "Flip a coin 10 times. How many heads do you get? The Binomial Distribution counts all the different combinations of getting exactly k heads and gives you the exact probability! BAM!",
        "firstPrinciples": "Let $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Bernoulli}(p)$. The sum $K = \\sum_{i=1}^n X_i$ is distributed as $\\text{Binomial}(n, p)$. The probability mass function is $P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}$, where $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ accounts for trial permutations. The expectation is $E[K] = np$, and variance is $\\text{Var}(K) = np(1-p)$. The exact binomial test tests $H_0: p = p_0$ by summing tail probabilities without relying on asymptotic normal approximations.",
        "mathFormulas": [
            {"name": "Binomial PMF", "latex": "P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}", "explanation": "Probability of exactly k successes in n independent trials."},
            {"name": "Binomial Mean & Variance", "latex": "E[K] = np, \\quad \\text{Var}(K) = np(1-p)", "explanation": "Mean and variance scaling directly with sample size n."}
        ],
        "numericalExample": "10 patients receive a treatment with baseline recovery rate p = 0.5. 8 patients recover. Is the treatment significantly better? P(K >= 8) = P(8) + P(9) + P(10) = [binom(10,8) + binom(10,9) + binom(10,10)] * (0.5)^10 = (45 + 10 + 1) / 1024 = 56 / 1024 = 0.0547. Two-sided p-value = 2 * 0.0547 = 0.109 (not significant at alpha = 0.05).",
        "pythonCode": "from scipy import stats\n\nres = stats.binomtest(k=8, n=10, p=0.5, alternative='two-sided')\nprint(f'Binomial exact p-value: {res.pvalue:.4f}')",
        "rCode": "binom.test(8, 10, p=0.5)",
        "pitfalls": "Applying the binomial distribution when trials are dependent (e.g. sampling without replacement from a small finite population, which requires the hypergeometric distribution).",
        "interactiveType": "binomial",
        "quiz": [
            {
                "question": "What happens to the shape of a Binomial(n, p) distribution as n becomes very large?",
                "options": ["It becomes an exponential distribution", "By the de Moivre-Laplace theorem, it converges to a Normal distribution", "It becomes uniform", "It collapses to 0"],
                "answer": 1,
                "explanation": "As n -> infinity with fixed p, the standardized binomial variable converges to standard normal N(0,1)."
            }
        ]
    },
    25: {
        "shortTitle": "The Central Limit Theorem",
        "moduleId": "module-4",
        "category": "CLT & Bootstrapping",
        "duration": "10:45",
        "summary": "The cornerstone of classical statistics: the sampling distribution of the sum or mean of independent random variables approaches a normal distribution as n grows.",
        "bamIntuition": "It doesn't matter if your original data is skewed, flat, exponential, or totally crazy! Take samples of size n, compute their averages, plot them, and BAM: A pristine normal bell curve appears!",
        "firstPrinciples": "Let $X_1, X_2, \\dots, X_n$ be independent, identically distributed random variables with mean $\\mu$ and finite variance $\\sigma^2 < \\infty$. Define the sample mean $\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i$. The standardized variable $Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}}$ converges in distribution to the standard normal: $Z_n \\xrightarrow{d} \\mathcal{N}(0, 1)$ as $n \\to \\infty$. The theorem guarantees that sample means are asymptotically normal, allowing statistical inference without knowing the exact parent population distribution.",
        "mathFormulas": [
            {"name": "Central Limit Theorem", "latex": "\\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2)", "explanation": "Normalized sample mean converges to normal distribution with variance sigma^2."},
            {"name": "Standard Error of the Mean", "latex": "\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}", "explanation": "The standard deviation of the sample mean shrinks at rate 1/sqrt(n)."}
        ],
        "numericalExample": "Roll a fair 6-sided die: mu = 3.5, sigma = 1.71 (uniform discrete distribution). Sample size n = 36 dice rolls. The average of 36 rolls has expected mean = 3.5, and standard error = 1.71 / sqrt(36) = 1.71 / 6 = 0.285. By the CLT, the distribution of average roll is approximately N(3.5, 0.285^2).",
        "pythonCode": "import numpy as np\nimport matplotlib.pyplot as plt\n\n# Draw 10,000 sample means from a heavily skewed Exponential distribution\nnp.random.seed(42)\nsamples = [np.mean(np.random.exponential(scale=2.0, size=30)) for _ in range(10000)]\nprint(f'Mean of sample means: {np.mean(samples):.3f}')\nprint(f'Std of sample means: {np.std(samples):.3f} (Theory: {2.0 / np.sqrt(30):.3f})')",
        "rCode": "means <- replicate(10000, mean(rexp(30, rate=0.5)))\nhist(means, breaks=50, col='orange', main='CLT in Action')",
        "pitfalls": "Believing the individual data points become normally distributed as n increases. The raw data remains exponential or skewed; ONLY the sample mean becomes normally distributed!",
        "interactiveType": "clt",
        "quiz": [
            {
                "question": "What becomes normally distributed under the Central Limit Theorem?",
                "options": ["The individual observations in the population", "The sample mean or sum of independent observations", "The p-value", "The standard deviation"],
                "answer": 1,
                "explanation": "The CLT applies strictly to aggregations (sums, averages) of random variables, not individual observations."
            }
        ]
    },
    26: {
        "shortTitle": "Technical vs Biological Replicates",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "5:55",
        "summary": "Technical replicates measure pipette or assay instrument noise, whereas biological replicates measure true organismal or population variability.",
        "bamIntuition": "Testing the same tube of blood 5 times tells you how good your machine is (Technical). Testing blood from 5 different patients tells you how diverse humans are (Biological)! Don't mix them up! BAM!",
        "firstPrinciples": "Total variance decomposes hierarchically: $\\sigma^2_{\\text{total}} = \\sigma^2_{\\text{biological}} + \\sigma^2_{\\text{technical}}$. Running $m$ technical replicates per biological subject reduces measurement error: $\\text{Var}(\\bar{Y}_i) = \\sigma^2_{\\text{bio}} + \\frac{\\sigma^2_{\\text{tech}}}{m}$. However, treating technical replicates as independent samples ($N = n \\cdot m$) creates pseudoreplication, inflating degrees of freedom and generating artificially tiny p-values that fail replication.",
        "mathFormulas": [
            {"name": "Variance Decomposition", "latex": "\\sigma^2_{\\text{observed}} = \\sigma^2_{\\text{biological}} + \\frac{\\sigma^2_{\\text{technical}}}{m}", "explanation": "Averaging m technical repeats reduces instrument noise but cannot reduce biological spread."},
            {"name": "Degrees of Freedom Correction", "latex": "df = n_{\\text{biological}} - 1", "explanation": "Hypothesis tests must use biological replicates for valid inference."}
        ],
        "numericalExample": "You treat 1 mouse and measure its liver RNA 10 times. You find p = 0.001. Do you have evidence the drug works on mice? NO! You have n = 1 biological mouse with 10 technical measurements. You cannot generalize to any other mouse.",
        "pythonCode": "# Demonstrating proper aggregation: average technical replicates first\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'mouse_id': [1, 1, 1, 2, 2, 2, 3, 3, 3],\n    'gene_expression': [10.2, 10.4, 10.1, 14.5, 14.1, 14.3, 12.0, 12.2, 12.1]\n})\nbio_level = df.groupby('mouse_id')['gene_expression'].mean()\nprint('Biological replicate means (n=3):\\n', bio_level)",
        "rCode": "data <- data.frame(mouse=rep(1:3, each=3), expr=c(10.2,10.4,10.1, 14.5,14.1,14.3, 12,12.2,12.1))\naggregate(expr ~ mouse, data=data, mean)",
        "pitfalls": "Pseudoreplication: claiming a sample size of N = 30 by measuring 3 mice 10 times each, leading to spurious high statistical significance.",
        "interactiveType": "replicates",
        "quiz": [
            {
                "question": "What is the primary danger of treating technical replicates as independent samples?",
                "options": ["It increases computation time", "Pseudoreplication: falsely inflated sample size leading to artificially low p-values", "It changes the mean", "It makes the variance negative"],
                "answer": 1,
                "explanation": "Pseudoreplication artificially deflates standard errors, producing bogus statistical significance for conclusions that do not generalize."
            }
        ]
    },
    27: {
        "shortTitle": "Sample Size & Effective Sample Size",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "7:10",
        "summary": "When observations are correlated across time or clusters, the effective sample size (N_eff) is significantly smaller than the nominal count N.",
        "bamIntuition": "If you survey 100 people from the exact same household, they all share the same TV and fridge! You don't have 100 independent opinions, you have an effective sample size of maybe 5! BAM!",
        "firstPrinciples": "For $n$ independent observations, the variance of the mean is $\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}$. When observations have pairwise correlation $\\rho > 0$, the variance expands: $\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}[1 + (n - 1)\\rho]$. Equating this to $\\frac{\\sigma^2}{n_{\\text{eff}}}$ yields the effective sample size formula: $n_{\\text{eff}} = \\frac{n}{1 + (n - 1)\\rho}$. Even a modest correlation dramatically slashes information content.",
        "mathFormulas": [
            {"name": "Effective Sample Size", "latex": "n_{\\text{eff}} = \\frac{n}{1 + (n - 1)\\rho}", "explanation": "Effective independent observations in the presence of intraclass correlation rho."},
            {"name": "Design Effect", "latex": "\\text{DEFF} = 1 + (m - 1)\\text{ICC}", "explanation": "Factor by which variance is inflated due to cluster sampling."}
        ],
        "numericalExample": "Suppose n = 100 observations have intraclass correlation rho = 0.20. n_eff = 100 / (1 + (99 * 0.20)) = 100 / (1 + 19.8) = 100 / 20.8 = 4.8! Your 100 correlated measurements provide no more statistical power than 5 truly independent samples!",
        "pythonCode": "n = 100\nrho = 0.20\nn_eff = n / (1 + (n - 1) * rho)\nprint(f'Nominal N: {n}, Effective Sample Size (N_eff): {n_eff:.2f}')",
        "rCode": "n <- 100; rho <- 0.2\nn_eff <- n / (1 + (n - 1) * rho)\ncat('Effective sample size:', n_eff)",
        "pitfalls": "Ignoring spatial or temporal autocorrelation in time series or spatial data, leading to severe overconfidence in regression models.",
        "interactiveType": "sample_size",
        "quiz": [
            {
                "question": "If observations in a sample have strong positive correlation with each other, how does the effective sample size compare to the nominal sample size?",
                "options": ["Effective sample size is greater than nominal", "Effective sample size is substantially smaller than nominal", "They are identical", "Effective sample size becomes infinite"],
                "answer": 1,
                "explanation": "Because correlated data contains redundant information, the effective independent sample size is strictly smaller than the total observation count."
            }
        ]
    },
    28: {
        "shortTitle": "Standard Deviation vs Standard Error",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "6:15",
        "summary": "Standard deviation measures the biological spread of individual subjects; standard error measures the estimation precision of the sample mean.",
        "bamIntuition": "SD is about the INDIVIDUALS in the population. SE is about how accurately your MEAN is pinned down! As you gather more data, SD stays steady, but SE shrinks toward zero! BAM!",
        "firstPrinciples": "The standard deviation $\\sigma = \\sqrt{E[(X - \\mu)^2]}$ is a parameter of the population distribution that characterizes natural subject-to-subject variability. It does not decrease with sample size $n$. In contrast, the standard error $\\text{SE}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}$ is the standard deviation of the sampling distribution of the estimator $\\bar{x}$. By the law of large numbers, $\\text{SE} \\to 0$ as $n \\to \\infty$, reflecting increasing estimator precision.",
        "mathFormulas": [
            {"name": "Standard Deviation (Individual Spread)", "latex": "s = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}", "explanation": "Quantifies natural variation among individual measurements."},
            {"name": "Standard Error (Estimator Uncertainty)", "latex": "\\text{SE}(\\bar{x}) = \\frac{s}{\\sqrt{n}}", "explanation": "Quantifies sampling uncertainty of the mean estimator."}
        ],
        "numericalExample": "Adult human height has SD s = 3.0 inches. If you measure n = 100 people, the sample SD is still ~3.0 inches (people don't suddenly become identical). But SE = 3.0 / sqrt(100) = 0.3 inches. If you measure n = 10,000 people, SD is still ~3.0 inches, but SE = 3.0 / 100 = 0.03 inches!",
        "pythonCode": "import numpy as np\n\ndata_small = np.random.normal(70, 3, size=25)\ndata_large = np.random.normal(70, 3, size=2500)\nprint(f'N=25:   SD = {np.std(data_small, ddof=1):.2f}, SE = {stats.sem(data_small):.3f}')\nprint(f'N=2500: SD = {np.std(data_large, ddof=1):.2f}, SE = {stats.sem(data_large):.3f}')",
        "rCode": "x_small <- rnorm(25, 70, 3); x_large <- rnorm(2500, 70, 3)\ncat('Small SD:', sd(x_small), 'SE:', sd(x_small)/sqrt(25), '\\n')\ncat('Large SD:', sd(x_large), 'SE:', sd(x_large)/sqrt(2500))",
        "pitfalls": "Plotting error bars with SE instead of SD to deceptively make data variability appear small, or reporting SD when making inferences about mean differences.",
        "interactiveType": "sd_vs_se",
        "quiz": [
            {
                "question": "If you quadruple your sample size (4x data), what happens to the Standard Error of the mean?",
                "options": ["It is cut in half (divided by 2)", "It is divided by 4", "It stays the same", "It doubles"],
                "answer": 0,
                "explanation": "Because SE = s / sqrt(n), replacing n with 4n divides the denominator by sqrt(4) = 2, halving the standard error."
            }
        ]
    },
    29: {
        "shortTitle": "The Standard Error",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "7:30",
        "summary": "Deep mathematical derivation of the standard error formula and how square root scaling governs the precision of all parameter estimators.",
        "bamIntuition": "Why is there a square root of n in the denominator? Because variance divides by n, and standard error is the square root of variance! To cut error in half, you need 4 times the data! BAM!",
        "firstPrinciples": "Let $X_1, \\dots, X_n$ be independent identically distributed with variance $\\text{Var}(X_i) = \\sigma^2$. The variance of the sum is $\\text{Var}\\left(\\sum X_i\\right) = \\sum \\text{Var}(X_i) = n\\sigma^2$. For the sample mean $\\bar{X} = \\frac{1}{n}\\sum X_i$, applying the scaling property of variance $\\text{Var}(aY) = a^2 \\text{Var}(Y)$ gives: $\\text{Var}(\\bar{X}) = \\text{Var}\\left(\\frac{1}{n} \\sum X_i\\right) = \\frac{1}{n^2} \\text{Var}\\left(\\sum X_i\\right) = \\frac{1}{n^2}(n\\sigma^2) = \\frac{\\sigma^2}{n}$. Taking the square root gives $\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}$.",
        "mathFormulas": [
            {"name": "Variance of the Mean", "latex": "\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}", "explanation": "Linearity of variance for independent random variables."},
            {"name": "Standard Error", "latex": "\\text{SE}(\\bar{X}) = \\sqrt{\\text{Var}(\\bar{X})} = \\frac{\\sigma}{\\sqrt{n}}", "explanation": "Square root of variance of sample mean."}
        ],
        "numericalExample": "A factory measures bolt diameters with sigma = 0.8 mm. If you test n = 16 bolts, SE = 0.8 / sqrt(16) = 0.20 mm. If you want SE = 0.05 mm (4x more precise): 0.05 = 0.8 / sqrt(n) -> sqrt(n) = 16 -> n = 256 bolts.",
        "pythonCode": "sigma = 0.8\nfor n in [4, 16, 64, 256]:\n    se = sigma / np.sqrt(n)\n    print(f'N = {n:3d} -> Standard Error = {se:.4f}')",
        "rCode": "sigma <- 0.8; ns <- c(4, 16, 64, 256)\ncat('SE values:', sigma / sqrt(ns))",
        "pitfalls": "Believing accuracy scales linearly with sample size. Diminishing returns mean each additional observation yields progressively less reduction in error.",
        "interactiveType": "se_scaling",
        "quiz": [
            {
                "question": "Why does Var(X_bar) divide by n^2 instead of n when factoring out the 1/n?",
                "options": ["Because variance has quadratic scaling: Var(c * Y) = c^2 * Var(Y)", "Because of Bessel's correction", "It doesn't, it divides by n", "Because n is an integer"],
                "answer": 0,
                "explanation": "By definition of variance, Var(cY) = E[(cY - c*mu)^2] = c^2 * E[(Y - mu)^2] = c^2 * Var(Y)."
            }
        ]
    },
    30: {
        "shortTitle": "Bootstrapping Main Ideas",
        "moduleId": "module-4",
        "category": "CLT & Bootstrapping",
        "duration": "8:50",
        "summary": "Non-parametric bootstrapping resamples observed data with replacement to approximate the sampling distribution of any statistic without parametric assumptions.",
        "bamIntuition": "Don't know the mathematical formula for the sampling distribution of your weird statistic? Just pretend your sample IS the population, pull out random bootstrap samples WITH REPLACEMENT, and BAM: You simulate the sampling distribution directly!",
        "firstPrinciples": "Introduced by Bradley Efron in 1979, the bootstrap replaces the unknown true population distribution $F$ with the empirical distribution function $\\hat{F}_n(x) = \\frac{1}{n}\\sum_{i=1}^n \\mathbf{1}_{x_i \\le x}$. By sampling $n$ points from $\\hat{F}_n$ *with replacement*, we generate bootstrap samples $\\mathbf{x}^{*(b)}$. Computing the statistic of interest $T^{*(b)} = g(\\mathbf{x}^{*(b)})$ across $B$ bootstrap iterations yields an empirical Monte Carlo approximation of the sampling distribution of $T$, valid for means, medians, ratios, or complex machine learning models.",
        "mathFormulas": [
            {"name": "Empirical Bootstrap Distribution", "latex": "P^*(X^* = x_i) = \\frac{1}{n}, \\quad i = 1, \\dots, n", "explanation": "Uniform probability mass on each observed sample point."},
            {"name": "Bootstrap Standard Error", "latex": "\\widehat{\\text{SE}}_B(T) = \\sqrt{\\frac{1}{B-1}\\sum_{b=1}^B (T^{*(b)} - \\bar{T}^*)^2}", "explanation": "Sample standard deviation across B bootstrap replications."}
        ],
        "numericalExample": "Sample of 5 response times: [12, 14, 15, 18, 45]. Median = 15. Standard parametric formulas for the median standard error are difficult. We generate 1000 resamples of size 5 with replacement (e.g. [14, 14, 15, 45, 45] -> median 15; [12, 12, 12, 14, 18] -> median 12), computing the 2.5th and 97.5th percentiles to find the exact 95% confidence interval.",
        "pythonCode": "import numpy as np\n\ndata = np.array([12, 14, 15, 18, 45])\nB = 5000\nboot_medians = [np.median(np.random.choice(data, size=len(data), replace=True)) for _ in range(B)]\nci_lower, ci_upper = np.percentile(boot_medians, [2.5, 97.5])\nprint(f'Bootstrap 95% CI for Median: [{ci_lower:.1f}, {ci_upper:.1f}]')",
        "rCode": "data <- c(12, 14, 15, 18, 45)\nboot_medians <- replicate(5000, median(sample(data, replace=TRUE)))\nquantile(boot_medians, c(0.025, 0.975))",
        "pitfalls": "Sampling WITHOUT replacement (which would simply reproduce the original dataset unchanged!) or using bootstrap on tiny samples (n < 10) where extreme values cannot be adequately represented.",
        "interactiveType": "bootstrap",
        "quiz": [
            {
                "question": "What is the critical rule when drawing bootstrap samples from original data?",
                "options": ["You must sample without replacement", "You must sample with replacement", "You must draw twice as many samples as the original n", "Data must be sorted first"],
                "answer": 1,
                "explanation": "Sampling WITH replacement allows data points to appear multiple times or not at all, mimicking drawing fresh independent samples from the empirical distribution."
            }
        ]
    }
}

print(f"Group 2 defined with {len(GROUP_2)} videos.")
