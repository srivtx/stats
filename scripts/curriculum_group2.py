# scripts/curriculum_group2.py
"""
Pedagogical content for videos 16 to 30 with 3 questions each.
"""

GROUP_2 = {   16: {   'bamIntuition': 'Power is the sensitivity of your scientific detector! If a real effect exists, power is '
                            'the chance your experiment actually spots it instead of missing it like a blind bat. BAM!',
            'category': 'Statistical Errors & Power',
            'duration': '8:10',
            'firstPrinciples': 'In decision theory, four outcomes exist: True Negative ($1 - \\alpha$), False Positive '
                               'Type I error ($\\alpha$), False Negative Type II error ($\\beta$), and True Positive '
                               'Power ($1 - \\beta$). Power is formally defined as $1 - \\beta = P(\\text{Reject } H_0 '
                               '\\mid H_1 \\text{ is true})$. Power increases monotonically with: 1. Larger sample '
                               'size $n$; 2. Larger true effect size $\\delta = |\\mu_1 - \\mu_0|$; 3. Lower '
                               'measurement noise $\\sigma$; and 4. Higher significance threshold $\\alpha$.',
            'interactiveType': 'power',
            'mathFormulas': [   {   'explanation': 'Probability of rejecting the null when the true mean difference is '
                                                   'mu1 - mu0.',
                                    'latex': '1 - \\beta = \\Phi\\left(\\frac{|\\mu_1 - \\mu_0|}{\\sigma / \\sqrt{n}} '
                                             '- z_{1 - \\alpha/2}\\right)',
                                    'name': 'Statistical Power Formula'},
                                {   'explanation': 'Probability of a false negative result.',
                                    'latex': '\\beta = P(\\text{Fail to reject } H_0 \\mid H_1 \\text{ is true})',
                                    'name': 'Type II Error Rate'}],
            'moduleId': 'module-6',
            'numericalExample': 'Suppose effect size delta = 5, sigma = 10, alpha = 0.05 (z_crit = 1.96). With n = 16: '
                                'SE = 10 / sqrt(16) = 2.5. Z_shift = 5 / 2.5 = 2.0. Power = Phi(2.0 - 1.96) = '
                                'Phi(0.04) = 51.6% (almost a coin flip!). With n = 64: SE = 1.25. Z_shift = 5 / 1.25 = '
                                '4.0. Power = Phi(4.0 - 1.96) = Phi(2.04) = 97.9%!',
            'pitfalls': 'Running studies with low power (e.g. 20%). When low-power studies do find p < 0.05, effect '
                        "sizes are dramatically overestimated (the Winner's Curse).",
            'pythonCode': 'from statsmodels.stats.power import TTestIndPower\n'
                          '\n'
                          'analysis = TTestIndPower()\n'
                          "effect_size = 0.5  # Cohen's d\n"
                          'power = analysis.power(effect_size=effect_size, nobs1=64, alpha=0.05)\n'
                          "print(f'Calculated Statistical Power: {power:.3f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'By definition, Power = 1 - beta. If Power is 80% (0.80), then beta = 1 - '
                                           '0.80 = 20% (0.20).',
                            'options': ['80%', '20%', '5%', '10%'],
                            'question': 'If statistical power is 80%, what is the Type II error rate beta?'},
                        {   'answer': 1,
                            'explanation': 'A larger true effect size shifts the alternative distribution further away '
                                           'from the null mean, placing a larger portion of its mass beyond the '
                                           'critical threshold.',
                            'options': [   'Power decreases',
                                           'Power increases',
                                           'Power remains unchanged',
                                           'Power drops to zero'],
                            'question': 'If the true effect size in a clinical population increases while sample size '
                                        'and significance level alpha remain constant, what happens to statistical '
                                        'power?'},
                        {   'answer': 1,
                            'explanation': 'Beta is the probability of failing to reject a false null hypothesis (Type '
                                           'II error). Power is the probability of correctly rejecting it: 1 - beta.',
                            'options': [   'Power = 1 - alpha',
                                           'Power = 1 - beta',
                                           'Power = beta / alpha',
                                           'Power = alpha * beta'],
                            'question': 'What is the mathematical definition of statistical power in terms of the Type '
                                        'II error rate beta?'}],
            'rCode': "power.t.test(n=64, delta=0.5, sd=1, sig.level=0.05, type='two.sample')",
            'shortTitle': 'Statistical Power',
            'summary': 'Statistical power (1 - beta) is the probability of correctly rejecting a false null '
                       'hypothesis, ensuring genuine biological or physical effects are detected.'},
    17: {   'bamIntuition': "Don't guess how many mice or patients you need! Do a Power Analysis BEFORE spending "
                            'millions of dollars to ensure you have enough data to see the effect! BAM!',
            'category': 'Statistical Errors & Power',
            'duration': '6:45',
            'firstPrinciples': 'Prospective sample size determination solves for $n$ in the power equation: $n = '
                               '\\frac{(z_{1 - \\alpha/2} + z_{1 - \\beta})^2 \\sigma^2}{(\\mu_1 - \\mu_0)^2} = '
                               '\\frac{(z_{1 - \\alpha/2} + z_{1 - \\beta})^2}{d^2}$, where $d = \\frac{|\\mu_1 - '
                               "\\mu_0|}{\\sigma}$ is Cohen's standardized effect size. Retrospective or post-hoc "
                               'power calculated using the observed sample effect size is tautological and '
                               'mathematically invalid.',
            'interactiveType': 'power_analysis',
            'mathFormulas': [   {   'explanation': 'Required sample size per group for a two-sample t-test with '
                                                   'standardized effect d.',
                                    'latex': 'n = 2 \\cdot \\left(\\frac{z_{1-\\alpha/2} + z_{1-\\beta}}{d}\\right)^2',
                                    'name': 'Sample Size Equation'},
                                {   'explanation': 'Difference between group means divided by pooled standard '
                                                   'deviation.',
                                    'latex': 'd = \\frac{\\mu_1 - \\mu_2}{\\sigma_{\\text{pooled}}}',
                                    'name': "Cohen's d"}],
            'moduleId': 'module-6',
            'numericalExample': 'To detect a medium effect size d = 0.5 at alpha = 0.05 (z = 1.96) with 80% power (z = '
                                '0.84): n = 2 * ((1.96 + 0.84) / 0.5)^2 = 2 * (2.80 / 0.5)^2 = 2 * (5.6)^2 = 2 * 31.36 '
                                '= 62.72. You need 63 subjects per group (126 total).',
            'pitfalls': "Calculating 'post-hoc power' from observed p-values; if p > 0.05, post-hoc power is "
                        'guaranteed to look low, adding zero new information.',
            'pythonCode': 'from statsmodels.stats.power import TTestIndPower\n'
                          '\n'
                          'analysis = TTestIndPower()\n'
                          'n_required = analysis.solve_power(effect_size=0.5, power=0.80, alpha=0.05)\n'
                          "print(f'Required n per group: {int(np.ceil(n_required))}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because n is inversely proportional to d^2, halving d requires (2)^2 = 4 '
                                           'times as many samples.',
                            'options': ['2x', '4x', '8x', '1.41x'],
                            'question': 'If you want to double your detection resolution (cut effect size in half), by '
                                        'what factor must sample size increase?'},
                        {   'answer': 1,
                            'explanation': 'Since SE = sigma / sqrt(n), reducing SE by half requires multiplying n by '
                                           '4, because sqrt(4n) = 2*sqrt(n).',
                            'options': [   'By a factor of 2',
                                           'By a factor of 4',
                                           'By a factor of 8',
                                           'By a factor of sqrt(2)'],
                            'question': 'To halve the standard error of an estimate or double precision, by what '
                                        'factor must you increase the sample size n?'},
                        {   'answer': 1,
                            'explanation': 'Post-hoc observed power simply mirrors the observed p-value: '
                                           'non-significant results will always show low post-hoc power, creating a '
                                           'circular justification.',
                            'options': [   'Because computers cannot calculate post-hoc power accurately',
                                           'Because post-hoc power is merely a 1-to-1 mathematical transformation of '
                                           'the observed p-value, adding zero new information',
                                           'Because power can only be calculated for sample sizes under 30',
                                           'Because post-hoc power assumes beta = 0'],
                            'question': "Why is 'post-hoc power' (power calculated using the observed effect size "
                                        'after completing an experiment) widely regarded as useless or misleading?'}],
            'rCode': 'res <- power.t.test(delta=0.5, sd=1, power=0.8, sig.level=0.05)\n'
                     "cat('Required n per group:', ceiling(res$n))",
            'shortTitle': 'Power Analysis',
            'summary': 'Prospective power analysis calculates the minimum sample size required before running an '
                       'experiment to achieve a desired detection probability.'},
    18: {   'bamIntuition': 'When X is bigger than average, does Y also jump above average? If yes, their product is '
                            'positive! Average those products, and BAM: Positive Covariance!',
            'category': 'Covariance & Correlation',
            'duration': '7:15',
            'firstPrinciples': 'The covariance between random variables $X$ and $Y$ is defined as $\\text{Cov}(X, Y) = '
                               'E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]$. If $X$ and $Y$ are independent, '
                               '$\\text{Cov}(X, Y) = 0$ (the converse is not generally true). The sample covariance is '
                               '$s_{xy} = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})$. The units of '
                               'covariance are the product of the units of $X$ and $Y$, making its raw numerical '
                               'magnitude difficult to interpret without standardization.',
            'interactiveType': 'covariance',
            'mathFormulas': [   {   'explanation': 'Expected product of deviations from respective means.',
                                    'latex': '\\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)]',
                                    'name': 'Population Covariance'},
                                {   'explanation': 'Unbiased estimator using n-1 degrees of freedom.',
                                    'latex': 's_{xy} = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})',
                                    'name': 'Sample Covariance'}],
            'moduleId': 'module-8',
            'numericalExample': 'Pairs (X: Height in in, Y: Weight in lbs): (65, 130), (70, 160), (75, 190). x_bar = '
                                '70, y_bar = 160. Deviations: (-5, -30), (0, 0), (+5, +30). Products: (-5)*(-30) = '
                                '150; 0*0 = 0; (+5)*(+30) = 150. Sum = 300. Sample Covariance = 300 / (3 - 1) = 150 '
                                'in*lbs.',
            'pitfalls': 'Assuming a large covariance means a stronger relationship than a small covariance. Covariance '
                        'depends directly on the units of scale (e.g. measuring in grams vs kilograms changes '
                        'covariance by 1,000x).',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'x = np.array([65, 70, 75])\n'
                          'y = np.array([130, 160, 190])\n'
                          'cov_matrix = np.cov(x, y)\n'
                          "print('Sample Covariance:', cov_matrix[0, 1])",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Independence implies zero covariance, but zero covariance does not imply '
                                           'independence (e.g. Y = X^2 with symmetric X around 0 has Cov = 0 but '
                                           'perfect deterministic dependence).',
                            'options': [   'Yes, always',
                                           'No, zero covariance only rules out linear correlation; non-linear '
                                           'dependencies can still exist',
                                           'Only if both variables are discrete',
                                           'Only if sample size > 30'],
                            'question': 'If Cov(X, Y) = 0, are X and Y guaranteed to be independent?'},
                        {   'answer': 1,
                            'explanation': 'Raw covariance depends on the arbitrary measurement units of X and Y. '
                                           'Measuring height in millimeters instead of meters multiplies covariance by '
                                           '1,000 without changing the relationship.',
                            'options': [   'Covariance cannot be negative',
                                           'Covariance is scale-dependent (units are unit_X * unit_Y), making its '
                                           'magnitude uninterpretable across different scales',
                                           'Covariance assumes variables follow a uniform distribution',
                                           'Covariance is only defined for integer variables'],
                            'question': 'What is the primary practical limitation of raw covariance compared to '
                                        "Pearson's correlation coefficient?"},
                        {   'answer': 1,
                            'explanation': 'Independence implies E[XY] = E[X]E[Y], so Cov(X, Y) = E[XY] - E[X]E[Y] = '
                                           '0. (Note that the converse is not always true for non-linear '
                                           'relationships).',
                            'options': ['Exactly 1.0', 'Exactly 0', '-1.0', 'Undefined'],
                            'question': 'If two random variables X and Y are statistically independent, what is their '
                                        'population covariance Cov(X, Y)?'}],
            'rCode': 'x <- c(65, 70, 75); y <- c(130, 160, 190)\ncov(x, y)',
            'shortTitle': 'Covariance',
            'summary': 'Covariance measures the joint variability of two random variables, indicating whether they '
                       'tend to increase together or move inversely.'},
    19: {   'bamIntuition': 'Covariance with units stripped away! Divide covariance by both standard deviations, and '
                            'BAM: you get a pure number between -1 and +1 that tells you how tight the line is!',
            'category': 'Covariance & Correlation',
            'duration': '8:20',
            'firstPrinciples': "Pearson's product-moment correlation coefficient is defined as $\\rho_{X,Y} = "
                               '\\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$. By the Cauchy-Schwarz inequality, $|\t'
                               'ext{Cov}(X,Y)| \\le \\sqrt{\\text{Var}(X)\\text{Var}(Y)}$, proving that $-1 \\le \\rho '
                               '\\le 1$. $\\rho = +1$ (or $-1$) occurs if and only if $Y = aX + b$ with $a > 0$ (or $a '
                               '< 0$) with probability 1. Geometrically, $\\rho$ is the cosine of the angle $\\theta$ '
                               'between the mean-centered observation vectors in $\\mathbb{R}^n$: $r = \\cos \\theta = '
                               '\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$.',
            'interactiveType': 'cov3d',
            'mathFormulas': [   {   'explanation': 'Ratio of sample covariance to maximum possible covariance.',
                                    'latex': 'r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - '
                                             '\\bar{y})}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2} \\sqrt{\\sum_{i=1}^n '
                                             '(y_i - \\bar{y})^2}}',
                                    'name': "Pearson's r"},
                                {   'explanation': 'Correlation is invariant to positive linear scaling and shifts.',
                                    'latex': 'r(aX + b, cY + d) = \\text{sgn}(ac) \\cdot r(X, Y)',
                                    'name': 'Dimensionless Invariance'}],
            'moduleId': 'module-8',
            'numericalExample': 'Using the previous example: s_xy = 150. s_x = sqrt(50/2) = 5. s_y = sqrt(1800/2) = '
                                '30. r = 150 / (5 * 30) = 150 / 150 = +1.0. A perfect positive linear relationship.',
            'pitfalls': 'Assuming correlation equals causation, or assuming r = 0 means no relationship exists (e.g. '
                        'parabolic data $Y = X^2$ has $r \\approx 0$ despite perfect deterministic coupling).',
            'pythonCode': 'import numpy as np\n'
                          'from scipy import stats\n'
                          '\n'
                          'x = np.array([65, 70, 75])\n'
                          'y = np.array([130, 160, 190])\n'
                          'r, p_val = stats.pearsonr(x, y)\n'
                          "print(f'Pearson r: {r:.4f}, p-value: {p_val:.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'In linear algebra, the centered correlation coefficient equals the dot '
                                           'product divided by vector norms, which is exactly cos(theta).',
                            'options': [   'The slope of the line',
                                           'The cosine of the angle between the two vectors in data space',
                                           'The area of the projection',
                                           'The Euclidean distance between endpoints'],
                            'question': "What is the geometric interpretation of Pearson's r between two centered data "
                                        'vectors?'},
                        {   'answer': 1,
                            'explanation': "Pearson's r is bounded in [-1, 1] by the Cauchy-Schwarz inequality. r = -1 "
                                           'indicates all data points lie exactly on a downward-sloping straight line.',
                            'options': [   'Range [0, 1]; no relationship',
                                           'Range [-1, 1]; perfect inverse linear relationship',
                                           'Range (-infinity, infinity); undefined variance',
                                           'Range [-0.5, 0.5]; weak negative relationship'],
                            'question': "What is the theoretical range of Pearson's correlation coefficient r, and "
                                        'what does r = -1 signify?'},
                        {   'answer': 0,
                            'explanation': 'Anscombe created 4 distinct datasets with identical summary statistics '
                                           '(mean, variance, correlation r = 0.816, regression line) that appear '
                                           'completely different when plotted.',
                            'options': [   'Datasets with identical r, means, and variances can have wildly different '
                                           'shapes and relationships; you must always visualize your data',
                                           'Correlation implies causation when r > 0.8',
                                           'Linear regression should never use more than 11 data points',
                                           'All distributions eventually become normal'],
                            'question': "What critical lesson does Anscombe's Quartet teach researchers about the "
                                        'correlation coefficient r?'}],
            'rCode': 'x <- c(65, 70, 75); y <- c(130, 160, 190)\ncor.test(x, y)',
            'shortTitle': "Pearson's Correlation",
            'summary': "Standardizing covariance by the product of both standard deviations produces Pearson's r, a "
                       'dimensionless metric bounded strictly between -1 and +1.'},
    20: {   'bamIntuition': 'When you get new information, your universe shrinks! Conditional probability simply cuts '
                            'down the denominator to only include the cases where the condition happened. BAM!',
            'category': 'Bayesian & Odds',
            'duration': '7:40',
            'firstPrinciples': 'Given events $A, B \\in \\mathcal{F}$ with $P(B) > 0$, the conditional probability of '
                               '$A$ given $B$ is defined by Kolmogorov as $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$. '
                               'The condition event $B$ replaces the original sample space $\\Omega$ with $B$ as the '
                               'new restricted universe, renormalizing probabilities so that $P(B \\mid B) = 1$. The '
                               'multiplication rule follows: $P(A \\cap B) = P(A \\mid B) P(B) = P(B \\mid A) P(A)$. '
                               'Two events are independent if and only if $P(A \\mid B) = P(A)$.',
            'interactiveType': 'conditional_prob',
            'mathFormulas': [   {   'explanation': 'Probability of A restricted to the subspace where B has occurred.',
                                    'latex': 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}',
                                    'name': 'Conditional Definition'},
                                {   'explanation': 'Joint probability decomposed into conditional and marginal '
                                                   'components.',
                                    'latex': 'P(A \\cap B) = P(A \\mid B) \\cdot P(B)',
                                    'name': 'Multiplication Rule'}],
            'moduleId': 'module-11',
            'numericalExample': 'A standard 52-card deck. Event A: Card is a King (4 cards). Event B: Card is a Face '
                                'Card (12 cards). P(King | Face Card) = P(King and Face Card) / P(Face Card) = (4/52) '
                                '/ (12/52) = 4 / 12 = 1/3 (33.3%). Notice prior P(King) was 4/52 = 7.7%.',
            'pitfalls': "Confusing P(A | B) with P(B | A) (the prosecutor's fallacy). The probability of having a sore "
                        'throat given you have strep is 90%, but the probability of having strep given you have a sore '
                        'throat might only be 10%.',
            'pythonCode': '# Deck simulation\n'
                          'faces = 12\n'
                          'kings = 4\n'
                          'p_king_given_face = kings / faces\n'
                          "print(f'P(King | Face Card) = {p_king_given_face:.3f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'If conditioning on B leaves the probability of A unchanged, A and B are '
                                           'statistically independent.',
                            'options': [   'A and B are mutually exclusive',
                                           'A and B are independent',
                                           'P(B) must equal 1',
                                           'A contains B'],
                            'question': 'If P(A | B) = P(A), what can we conclude about events A and B?'},
                        {   'answer': 1,
                            'explanation': 'The probability of event A given that event B has occurred restricts the '
                                           'sample space to B: P(A | B) = P(A and B) / P(B).',
                            'options': [   'P(A) * P(B)',
                                           'P(A cap B) / P(B), provided P(B) > 0',
                                           'P(A cup B) - P(B)',
                                           'P(B | A) / P(A)'],
                            'question': 'What is the formal Kolmogorov definition of conditional probability P(A | '
                                        'B)?'},
                        {   'answer': 1,
                            'explanation': 'By definition of independence, the occurrence of event B provides zero '
                                           'information regarding event A, so P(A | B) = P(A).',
                            'options': ['P(B)', 'P(A)', '0', '1'],
                            'question': 'If events A and B are statistically independent with non-zero probabilities, '
                                        'what does P(A | B) equal?'}],
            'rCode': "p_king_given_face <- 4 / 12\ncat('P(King | Face):', p_king_given_face)",
            'shortTitle': 'Conditional Probabilities',
            'summary': 'Conditional probability quantifies the updated likelihood of an event occurring given that '
                       'another event has already occurred.'},
    21: {   'bamIntuition': 'Start with your prior belief. Multiply by the likelihood of your test results. Normalize '
                            'by all possible outcomes, and BAM: You get the updated posterior probability!',
            'category': 'Bayesian & Odds',
            'duration': '10:35',
            'firstPrinciples': 'Equating the two forms of the intersection $P(A \\cap B) = P(B \\mid A)P(A) = P(A '
                               "\\mid B)P(B)$ and dividing by $P(B)$ yields Bayes' Theorem: $P(A \\mid B) = \\frac{P(B "
                               '\\mid A) P(A)}{P(B)}$. By the Law of Total Probability, the marginal evidence is $P(B) '
                               '= P(B \\mid A)P(A) + P(B \\mid A^c)P(A^c)$. This illuminates the base-rate fallacy: '
                               'when a condition is rare (low prior $P(A)$), even an accurate test produces a '
                               'surprisingly high rate of false discoveries.',
            'interactiveType': 'bayes',
            'mathFormulas': [   {   'explanation': 'Posterior equals (Likelihood times Prior) divided by Evidence.',
                                    'latex': 'P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}',
                                    'name': "Bayes' Theorem"},
                                {   'explanation': 'Total probability of evidence aggregated over all partition '
                                                   'states.',
                                    'latex': 'P(B) = \\sum_{i} P(B \\mid A_i) P(A_i)',
                                    'name': 'Law of Total Probability'}],
            'moduleId': 'module-11',
            'numericalExample': 'Rare disease affects 1 in 1000 people (Prior = 0.001). Test has 99% Sensitivity '
                                '(P(+|D) = 0.99) and 95% Specificity (P(-|No D) = 0.95, so False Positive = 0.05). If '
                                'you test positive, what is P(Disease | +)? Numerator = 0.99 * 0.001 = 0.00099. '
                                'Denominator = (0.99 * 0.001) + (0.05 * 0.999) = 0.00099 + 0.04995 = 0.05094. '
                                'P(Disease | +) = 0.00099 / 0.05094 = 1.94%! Despite a 99% accurate test, ~98% of '
                                'positive tests are false alarms due to the low base rate.',
            'pitfalls': 'Neglecting the prior base rate (base rate neglect). A 99% accurate medical test for a '
                        '1-in-a-million disease will yield overwhelmingly false positives.',
            'pythonCode': 'prior = 0.001\n'
                          'sensitivity = 0.99\n'
                          'false_positive_rate = 0.05\n'
                          '\n'
                          'p_pos = (sensitivity * prior) + (false_positive_rate * (1 - prior))\n'
                          'posterior = (sensitivity * prior) / p_pos\n'
                          "print(f'P(Disease | Positive Test) = {posterior:.4f} ({posterior*100:.2f}%)')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because 99.9% of the population is healthy, a 5% false positive rate '
                                           'across thousands of healthy individuals generates far more positive flags '
                                           'than the true positives.',
                            'options': [   'The test was poorly calibrated',
                                           'The vast number of healthy people tested overwhelms the small number of '
                                           'sick people',
                                           'Bayes Theorem does not apply to medicine',
                                           'The p-value is greater than 0.05'],
                            'question': 'What is the primary reason why a 99% sensitive and 95% specific test produces '
                                        'mostly false positives for a very rare disease?'},
                        {   'answer': 2,
                            'explanation': 'P(H) represents the prior probability of hypothesis H before observing the '
                                           'new evidence D.',
                            'options': [   'The likelihood',
                                           'The posterior probability',
                                           'The prior probability',
                                           'The marginal likelihood'],
                            'question': "In Bayes' theorem P(H | D) = [P(D | H) * P(H)] / P(D), what is P(H) called?"},
                        {   'answer': 1,
                            'explanation': 'Out of 10,000 people, 10 have disease (approx 10 test positive) and 9,990 '
                                           'are healthy (approx 500 test positive). Positive predictive value is 10 / '
                                           '(10 + 500) approx 2%.',
                            'options': [   'Because the test is mathematically defective',
                                           'Because of the Base Rate Fallacy: the vast majority of tested people are '
                                           'healthy, so false positives outnumber true positives',
                                           'Because sensitivity and specificity must sum to 100%',
                                           'Because conditional probability cannot be applied to medicine'],
                            'question': 'In rare disease screening (prevalence 0.1%), a diagnostic test has 99% '
                                        'sensitivity and 95% specificity. Why is the probability that a positive '
                                        'patient actually has the disease less than 20%?'}],
            'rCode': 'prior <- 0.001; sens <- 0.99; fpr <- 0.05\n'
                     'p_pos <- sens * prior + fpr * (1 - prior)\n'
                     'posterior <- (sens * prior) / p_pos\n'
                     "cat('Posterior:', posterior)",
            'shortTitle': "Bayes' Theorem",
            'summary': "Bayes' Theorem provides the mathematical framework for updating prior beliefs with empirical "
                       'evidence to compute posterior probabilities.'},
    22: {   'bamIntuition': 'If you played a lottery game a million times, what would your average payoff be per '
                            'ticket? Multiply each prize by its chance of winning, add them up, and BAM: Expected '
                            'Value!',
            'category': 'Probability Distributions',
            'duration': '6:20',
            'firstPrinciples': 'For a discrete random variable $X$ taking values in $\\mathcal{X}$ with probability '
                               'mass function $p(x)$, the expected value is $E[X] = \\sum_{x \\in \\mathcal{X}} x \\, '
                               'p(x)$, provided $\\sum |x| p(x) < \\infty$. By the Law of Large Numbers, the sample '
                               'mean $\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i$ converges almost surely to $E[X]$ as '
                               '$n \\to \\infty$. Expectation is linear: $E[aX + bY] = aE[X] + bE[Y]$ regardless of '
                               'whether $X$ and $Y$ are independent.',
            'interactiveType': 'expected_value',
            'mathFormulas': [   {   'explanation': 'Sum of values weighted by their respective probability masses.',
                                    'latex': 'E[X] = \\sum_{i} x_i \\cdot P(X = x_i)',
                                    'name': 'Discrete Expected Value'},
                                {   'explanation': 'Expectation distributes linearly without requiring independence.',
                                    'latex': 'E[aX + bY + c] = aE[X] + bE[Y] + c',
                                    'name': 'Linearity of Expectation'}],
            'moduleId': 'module-2',
            'numericalExample': 'A raffle ticket costs $5. 1 ticket wins $1000 (prob 1/1000). 10 tickets win $50 (prob '
                                '10/1000). 989 tickets win $0. Expected prize: E[X] = (1000 * 0.001) + (50 * 0.010) + '
                                '(0 * 0.989) = $1.00 + $0.50 + $0 = $1.50. Expected profit = $1.50 - $5.00 = -$3.50 '
                                'per ticket.',
            'pitfalls': "Expecting the 'expected value' to be an outcome that can actually happen in a single trial "
                        '(e.g. rolling a fair die has expected value 3.5, but you can never roll a 3.5).',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'prizes = np.array([1000, 50, 0])\n'
                          'probs = np.array([1/1000, 10/1000, 989/1000])\n'
                          'expected_payout = np.sum(prizes * probs)\n'
                          "print(f'Expected payout: ${expected_payout:.2f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Linearity of expectation holds unconditionally for all random variables, '
                                           'independent or dependent.',
                            'options': [   'Yes, always',
                                           'No, it holds unconditionally for any random variables',
                                           'Only if both variables are normal',
                                           'Only when variance is finite'],
                            'question': 'Does linearity of expectation E[X + Y] = E[X] + E[Y] require X and Y to be '
                                        'independent?'},
                        {   'answer': 1,
                            'explanation': 'Linearity of expectation holds unconditionally for all random variables '
                                           'with finite expectations: E[aX + bY] = a*E[X] + b*E[Y], regardless of '
                                           'independence.',
                            'options': [   'a*E[X] + b*E[Y] only if X and Y are independent',
                                           'a*E[X] + b*E[Y] in all cases unconditionally',
                                           'a*E[X] * b*E[Y]',
                                           'sqrt(a*E[X] + b*E[Y])'],
                            'question': 'By the linearity of expectation, for ANY two random variables X and Y (even '
                                        'if they are strongly correlated or dependent), what is E[aX + bY]?'},
                        {   'answer': 1,
                            'explanation': 'E[X] = (1/6)*(1 + 2 + 3 + 4 + 5 + 6) = 21 / 6 = 3.5. Note that the '
                                           'expected value need not be an outcome that can actually be observed on a '
                                           'single roll.',
                            'options': ['3.0', '3.5', '4.0', '6.0'],
                            'question': 'What is the expected value of a single roll of a fair standard six-sided '
                                        'die?'}],
            'rCode': 'prizes <- c(1000, 50, 0)\n'
                     'probs <- c(1/1000, 10/1000, 989/1000)\n'
                     "cat('Expected payout: $', sum(prizes * probs))",
            'shortTitle': 'Expected Values: Main Ideas',
            'summary': 'Expected value is the probability-weighted long-run average of all possible values a random '
                       'variable can take.'},
    23: {   'bamIntuition': 'Think of a continuous probability density curve as a physical wooden board. Where can you '
                            'put your finger so it balances perfectly without tipping? That balance point is the '
                            'Expected Value! BAM!',
            'category': 'Probability Distributions',
            'duration': '7:05',
            'firstPrinciples': 'For a continuous random variable $X$ with PDF $f(x)$, the expected value is defined as '
                               'the Riemann-Stieltjes integral $E[X] = \\int_{-\\infty}^{\\infty} x \\, f(x) \\, dx$. '
                               'Physically, this represents the first moment (center of mass). For functions $g(X)$, '
                               'the Law of the Unconscious Statistician (LOTUS) guarantees $E[g(X)] = '
                               '\\int_{-\\infty}^{\\infty} g(x) \\, f(x) \\, dx$. The variance is the second central '
                               'moment: $\\text{Var}(X) = E[(X - E[X])^2] = \\int_{-\\infty}^\\infty (x - \\mu)^2 f(x) '
                               'dx$.',
            'interactiveType': 'expected_continuous',
            'mathFormulas': [   {   'explanation': 'The probability-density weighted integral across the entire '
                                                   'domain.',
                                    'latex': 'E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\,dx',
                                    'name': 'Continuous Expected Value'},
                                {   'explanation': 'Calculating expectations of transformed functions without deriving '
                                                   'their new PDF.',
                                    'latex': 'E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) \\cdot f(x)\\,dx',
                                    'name': 'LOTUS Formula'}],
            'moduleId': 'module-2',
            'numericalExample': 'For an exponential distribution with rate lambda = 2: f(x) = 2e^(-2x) for x >= 0. '
                                'Integral of x * 2e^(-2x) dx from 0 to infinity using integration by parts gives '
                                '1/lambda = 1/2 = 0.5.',
            'pitfalls': 'Assuming all continuous distributions have a finite expected value. The Cauchy distribution '
                        '$f(x) = \\frac{1}{\\pi(1+x^2)}$ has symmetric density around 0, but its integral does not '
                        'converge, so its expected value is undefined.',
            'pythonCode': 'import scipy.integrate as integrate\n'
                          'import numpy as np\n'
                          '\n'
                          'lam = 2.0\n'
                          '# E[X] = integral of x * lambda * exp(-lambda * x)\n'
                          'val, _ = integrate.quad(lambda x: x * lam * np.exp(-lam * x), 0, np.inf)\n'
                          "print(f'Integrated Continuous Expected Value: {val:.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because f(x) is perfectly symmetric around 0, x * f(x) is an odd function, '
                                           'integrating to exactly 0.',
                            'options': ['1', '0', '0.5', 'Undefined'],
                            'question': 'What is the expected value of a standard normal distribution N(0, 1)?'},
                        {   'answer': 1,
                            'explanation': 'For continuous random variables, the Riemann/Lebesgue integral replaces '
                                           'discrete summation: E[X] = int_{-infinity}^{infinity} x * f(x) dx.',
                            'options': [   'sum_{i=1}^n x_i / n',
                                           'Integral from -infinity to infinity of x * f(x) dx',
                                           "The maximum point where f'(x) = 0",
                                           'f(0)'],
                            'question': 'How is the expected value E[X] of a continuous random variable X with '
                                        'probability density function f(x) formally defined?'},
                        {   'answer': 1,
                            'explanation': 'A continuous expectation exists only if the integral converges absolutely. '
                                           'For Cauchy distributions, extreme values occur too frequently for the '
                                           'integral to settle.',
                            'options': [   'Because it is asymmetric',
                                           'Because its tails decay so slowly (proportional to 1/x^2) that the '
                                           'integral int_{-infinity}^{infinity} |x| f(x) dx diverges to infinity',
                                           'Because its density exceeds 1.0',
                                           'Because it is discrete'],
                            'question': 'The Cauchy distribution has a symmetric bell-like shape centered at zero, yet '
                                        'its expected value is mathematically undefined. Why?'}],
            'rCode': 'f <- function(x) x * 2 * exp(-2 * x)\nintegrate(f, lower=0, upper=Inf)$value',
            'shortTitle': 'Expected Values for Continuous Variables',
            'summary': 'Extending expected value to continuous domains by taking the integral of value times density '
                       'across the entire real number support.'},
    24: {   'bamIntuition': 'Flip a coin 10 times. How many heads do you get? The Binomial Distribution counts all the '
                            'different combinations of getting exactly k heads and gives you the exact probability! '
                            'BAM!',
            'category': 'Probability Distributions',
            'duration': '9:15',
            'firstPrinciples': 'Let $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Bernoulli}(p)$. The sum $K '
                               '= \\sum_{i=1}^n X_i$ is distributed as $\\text{Binomial}(n, p)$. The probability mass '
                               'function is $P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}$, where $\\binom{n}{k} = '
                               '\\frac{n!}{k!(n-k)!}$ accounts for trial permutations. The expectation is $E[K] = np$, '
                               'and variance is $\\text{Var}(K) = np(1-p)$. The exact binomial test tests $H_0: p = '
                               'p_0$ by summing tail probabilities without relying on asymptotic normal '
                               'approximations.',
            'interactiveType': 'binomial',
            'mathFormulas': [   {   'explanation': 'Probability of exactly k successes in n independent trials.',
                                    'latex': 'P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
                                    'name': 'Binomial PMF'},
                                {   'explanation': 'Mean and variance scaling directly with sample size n.',
                                    'latex': 'E[K] = np, \\quad \\text{Var}(K) = np(1-p)',
                                    'name': 'Binomial Mean & Variance'}],
            'moduleId': 'module-2',
            'numericalExample': '10 patients receive a treatment with baseline recovery rate p = 0.5. 8 patients '
                                'recover. Is the treatment significantly better? P(K >= 8) = P(8) + P(9) + P(10) = '
                                '[binom(10,8) + binom(10,9) + binom(10,10)] * (0.5)^10 = (45 + 10 + 1) / 1024 = 56 / '
                                '1024 = 0.0547. Two-sided p-value = 2 * 0.0547 = 0.109 (not significant at alpha = '
                                '0.05).',
            'pitfalls': 'Applying the binomial distribution when trials are dependent (e.g. sampling without '
                        'replacement from a small finite population, which requires the hypergeometric distribution).',
            'pythonCode': 'from scipy import stats\n'
                          '\n'
                          "res = stats.binomtest(k=8, n=10, p=0.5, alternative='two-sided')\n"
                          "print(f'Binomial exact p-value: {res.pvalue:.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'As n -> infinity with fixed p, the standardized binomial variable '
                                           'converges to standard normal N(0,1).',
                            'options': [   'It becomes an exponential distribution',
                                           'By the de Moivre-Laplace theorem, it converges to a Normal distribution',
                                           'It becomes uniform',
                                           'It collapses to 0'],
                            'question': 'What happens to the shape of a Binomial(n, p) distribution as n becomes very '
                                        'large?'},
                        {   'answer': 0,
                            'explanation': 'A binomial experiment requires n identical Bernoulli trials that are '
                                           'independent with fixed probability of success p.',
                            'options': [   'Fixed n trials, independent trials, two mutually exclusive outcomes '
                                           '(success/failure), and constant success probability p',
                                           'Continuous measurements, normal errors, and equal variances',
                                           'Random trial count until first success occurs',
                                           'Poisson arrival counts with constant rate lambda'],
                            'question': 'Which set of conditions defines a Binomial(n, p) experiment?'},
                        {   'answer': 1,
                            'explanation': 'For a sum of n independent Bernoulli variables each with variance p*(1-p), '
                                           'the total variance is Var(X) = n * p * (1 - p).',
                            'options': ['n * p', 'n * p * (1 - p)', 'sqrt(n * p)', 'p / n'],
                            'question': 'What is the theoretical variance of a Binomial random variable with '
                                        'parameters n and p?'}],
            'rCode': 'binom.test(8, 10, p=0.5)',
            'shortTitle': 'The Binomial Distribution and Test',
            'summary': 'Models the number of successes in n independent Bernoulli trials with fixed probability p, '
                       'providing exact hypothesis tests for proportions.'},
    25: {   'bamIntuition': "It doesn't matter if your original data is skewed, flat, exponential, or totally crazy! "
                            'Take samples of size n, compute their averages, plot them, and BAM: A pristine normal '
                            'bell curve appears!',
            'category': 'CLT & Bootstrapping',
            'duration': '10:45',
            'firstPrinciples': 'Let $X_1, X_2, \\dots, X_n$ be independent, identically distributed random variables '
                               'with mean $\\mu$ and finite variance $\\sigma^2 < \\infty$. Define the sample mean '
                               '$\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i$. The standardized variable $Z_n = '
                               '\\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}}$ converges in distribution to the '
                               'standard normal: $Z_n \\xrightarrow{d} \\mathcal{N}(0, 1)$ as $n \\to \\infty$. The '
                               'theorem guarantees that sample means are asymptotically normal, allowing statistical '
                               'inference without knowing the exact parent population distribution.',
            'interactiveType': 'clt',
            'mathFormulas': [   {   'explanation': 'Normalized sample mean converges to normal distribution with '
                                                   'variance sigma^2.',
                                    'latex': '\\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2)',
                                    'name': 'Central Limit Theorem'},
                                {   'explanation': 'The standard deviation of the sample mean shrinks at rate '
                                                   '1/sqrt(n).',
                                    'latex': '\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}',
                                    'name': 'Standard Error of the Mean'}],
            'moduleId': 'module-4',
            'numericalExample': 'Roll a fair 6-sided die: mu = 3.5, sigma = 1.71 (uniform discrete distribution). '
                                'Sample size n = 36 dice rolls. The average of 36 rolls has expected mean = 3.5, and '
                                'standard error = 1.71 / sqrt(36) = 1.71 / 6 = 0.285. By the CLT, the distribution of '
                                'average roll is approximately N(3.5, 0.285^2).',
            'pitfalls': 'Believing the individual data points become normally distributed as n increases. The raw data '
                        'remains exponential or skewed; ONLY the sample mean becomes normally distributed!',
            'pythonCode': 'import numpy as np\n'
                          'import matplotlib.pyplot as plt\n'
                          '\n'
                          '# Draw 10,000 sample means from a heavily skewed Exponential distribution\n'
                          'np.random.seed(42)\n'
                          'samples = [np.mean(np.random.exponential(scale=2.0, size=30)) for _ in range(10000)]\n'
                          "print(f'Mean of sample means: {np.mean(samples):.3f}')\n"
                          "print(f'Std of sample means: {np.std(samples):.3f} (Theory: {2.0 / np.sqrt(30):.3f})')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'The CLT applies strictly to aggregations (sums, averages) of random '
                                           'variables, not individual observations.',
                            'options': [   'The individual observations in the population',
                                           'The sample mean or sum of independent observations',
                                           'The p-value',
                                           'The standard deviation'],
                            'question': 'What becomes normally distributed under the Central Limit Theorem?'},
                        {   'answer': 1,
                            'explanation': 'CLT applies to the SAMPLING DISTRIBUTION OF THE MEAN, not the raw data. '
                                           'Even if the population is uniform or exponential, sample means become '
                                           'Gaussian.',
                            'options': [   'The individual observations in the population become normally distributed',
                                           'The distribution of sample averages converges to a normal distribution '
                                           'N(mu, sigma^2/n), regardless of the shape of the underlying population',
                                           'The population variance shrinks to zero',
                                           'All outliers disappear from the raw data'],
                            'question': 'What does the Central Limit Theorem state about the distribution of sample '
                                        'averages x-bar as sample size n grows large?'},
                        {   'answer': 1,
                            'explanation': 'The variance of the sample mean is Var(x-bar) = sigma^2 / n, so its '
                                           'standard deviation (Standard Error) is sigma / sqrt(n).',
                            'options': ['sigma * n', 'sigma / sqrt(n)', 'sigma^2 / n', 'sqrt(sigma / n)'],
                            'question': 'What is the standard deviation of the sampling distribution of the sample '
                                        'mean (known as the Standard Error)?'}],
            'rCode': 'means <- replicate(10000, mean(rexp(30, rate=0.5)))\n'
                     "hist(means, breaks=50, col='orange', main='CLT in Action')",
            'shortTitle': 'The Central Limit Theorem',
            'summary': 'The cornerstone of classical statistics: the sampling distribution of the sum or mean of '
                       'independent random variables approaches a normal distribution as n grows.'},
    26: {   'bamIntuition': 'Testing the same tube of blood 5 times tells you how good your machine is (Technical). '
                            'Testing blood from 5 different patients tells you how diverse humans are (Biological)! '
                            "Don't mix them up! BAM!",
            'category': 'Parameters, Samples & Spread',
            'duration': '5:55',
            'firstPrinciples': 'Total variance decomposes hierarchically: $\\sigma^2_{\\text{total}} = '
                               '\\sigma^2_{\\text{biological}} + \\sigma^2_{\\text{technical}}$. Running $m$ technical '
                               'replicates per biological subject reduces measurement error: $\\text{Var}(\\bar{Y}_i) '
                               '= \\sigma^2_{\\text{bio}} + \\frac{\\sigma^2_{\\text{tech}}}{m}$. However, treating '
                               'technical replicates as independent samples ($N = n \\cdot m$) creates '
                               'pseudoreplication, inflating degrees of freedom and generating artificially tiny '
                               'p-values that fail replication.',
            'interactiveType': 'replicates',
            'mathFormulas': [   {   'explanation': 'Averaging m technical repeats reduces instrument noise but cannot '
                                                   'reduce biological spread.',
                                    'latex': '\\sigma^2_{\\text{observed}} = \\sigma^2_{\\text{biological}} + '
                                             '\\frac{\\sigma^2_{\\text{technical}}}{m}',
                                    'name': 'Variance Decomposition'},
                                {   'explanation': 'Hypothesis tests must use biological replicates for valid '
                                                   'inference.',
                                    'latex': 'df = n_{\\text{biological}} - 1',
                                    'name': 'Degrees of Freedom Correction'}],
            'moduleId': 'module-3',
            'numericalExample': 'You treat 1 mouse and measure its liver RNA 10 times. You find p = 0.001. Do you have '
                                'evidence the drug works on mice? NO! You have n = 1 biological mouse with 10 '
                                'technical measurements. You cannot generalize to any other mouse.',
            'pitfalls': 'Pseudoreplication: claiming a sample size of N = 30 by measuring 3 mice 10 times each, '
                        'leading to spurious high statistical significance.',
            'pythonCode': '# Demonstrating proper aggregation: average technical replicates first\n'
                          'import pandas as pd\n'
                          '\n'
                          'df = pd.DataFrame({\n'
                          "    'mouse_id': [1, 1, 1, 2, 2, 2, 3, 3, 3],\n"
                          "    'gene_expression': [10.2, 10.4, 10.1, 14.5, 14.1, 14.3, 12.0, 12.2, 12.1]\n"
                          '})\n'
                          "bio_level = df.groupby('mouse_id')['gene_expression'].mean()\n"
                          "print('Biological replicate means (n=3):\\n', bio_level)",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Pseudoreplication artificially deflates standard errors, producing bogus '
                                           'statistical significance for conclusions that do not generalize.',
                            'options': [   'It increases computation time',
                                           'Pseudoreplication: falsely inflated sample size leading to artificially '
                                           'low p-values',
                                           'It changes the mean',
                                           'It makes the variance negative'],
                            'question': 'What is the primary danger of treating technical replicates as independent '
                                        'samples?'},
                        {   'answer': 1,
                            'explanation': 'Biological replicates capture true diversity in nature (different mice, '
                                           'patients, cell lines); technical replicates quantify experimental assay '
                                           'precision.',
                            'options': [   'Technical replicates measure variation between organisms; biological '
                                           'replicates measure pipetting error',
                                           'Biological replicates assess true biological variability across '
                                           'independent subjects; technical replicates assess instrument measurement '
                                           'noise',
                                           'Technical replicates are always cheaper than biological replicates',
                                           'There is no difference'],
                            'question': 'What is the core distinction in purpose between technical replicates and '
                                        'biological replicates?'},
                        {   'answer': 0,
                            'explanation': 'Pseudoreplication treats dependent technical measurements as independent '
                                           'biological observations, artificially inflating sample size and degrees of '
                                           'freedom.',
                            'options': [   'Pseudoreplication',
                                           "Simpson's Paradox",
                                           "Berkson's Fallacy",
                                           'Ecological Fallacy'],
                            'question': 'Treating 5 technical measurements from a single mouse as n = 5 independent '
                                        'samples in a two-sample t-test is an example of what statistical fallacy?'}],
            'rCode': 'data <- data.frame(mouse=rep(1:3, each=3), expr=c(10.2,10.4,10.1, 14.5,14.1,14.3, '
                     '12,12.2,12.1))\n'
                     'aggregate(expr ~ mouse, data=data, mean)',
            'shortTitle': 'Technical vs Biological Replicates',
            'summary': 'Technical replicates measure pipette or assay instrument noise, whereas biological replicates '
                       'measure true organismal or population variability.'},
    27: {   'bamIntuition': 'If you survey 100 people from the exact same household, they all share the same TV and '
                            "fridge! You don't have 100 independent opinions, you have an effective sample size of "
                            'maybe 5! BAM!',
            'category': 'Parameters, Samples & Spread',
            'duration': '7:10',
            'firstPrinciples': 'For $n$ independent observations, the variance of the mean is $\\text{Var}(\\bar{X}) = '
                               '\\frac{\\sigma^2}{n}$. When observations have pairwise correlation $\\rho > 0$, the '
                               'variance expands: $\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}[1 + (n - 1)\\rho]$. '
                               'Equating this to $\\frac{\\sigma^2}{n_{\\text{eff}}}$ yields the effective sample size '
                               'formula: $n_{\\text{eff}} = \\frac{n}{1 + (n - 1)\\rho}$. Even a modest correlation '
                               'dramatically slashes information content.',
            'interactiveType': 'sample_size',
            'mathFormulas': [   {   'explanation': 'Effective independent observations in the presence of intraclass '
                                                   'correlation rho.',
                                    'latex': 'n_{\\text{eff}} = \\frac{n}{1 + (n - 1)\\rho}',
                                    'name': 'Effective Sample Size'},
                                {   'explanation': 'Factor by which variance is inflated due to cluster sampling.',
                                    'latex': '\\text{DEFF} = 1 + (m - 1)\\text{ICC}',
                                    'name': 'Design Effect'}],
            'moduleId': 'module-3',
            'numericalExample': 'Suppose n = 100 observations have intraclass correlation rho = 0.20. n_eff = 100 / (1 '
                                '+ (99 * 0.20)) = 100 / (1 + 19.8) = 100 / 20.8 = 4.8! Your 100 correlated '
                                'measurements provide no more statistical power than 5 truly independent samples!',
            'pitfalls': 'Ignoring spatial or temporal autocorrelation in time series or spatial data, leading to '
                        'severe overconfidence in regression models.',
            'pythonCode': 'n = 100\n'
                          'rho = 0.20\n'
                          'n_eff = n / (1 + (n - 1) * rho)\n'
                          "print(f'Nominal N: {n}, Effective Sample Size (N_eff): {n_eff:.2f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because correlated data contains redundant information, the effective '
                                           'independent sample size is strictly smaller than the total observation '
                                           'count.',
                            'options': [   'Effective sample size is greater than nominal',
                                           'Effective sample size is substantially smaller than nominal',
                                           'They are identical',
                                           'Effective sample size becomes infinite'],
                            'question': 'If observations in a sample have strong positive correlation with each other, '
                                        'how does the effective sample size compare to the nominal sample size?'},
                        {   'answer': 1,
                            'explanation': 'Clustered or correlated data carry less unique information per observation '
                                           'than independent samples, reducing the effective degrees of freedom.',
                            'options': [   'N_eff is larger than N',
                                           'N_eff is smaller than N because correlated observations share redundant '
                                           'information',
                                           'N_eff equals N exactly',
                                           'N_eff is negative'],
                            'question': 'When observations in a dataset are positively correlated (e.g. repeated '
                                        'measures or spatial clustering), how does the effective sample size N_eff '
                                        'compare to the nominal sample size N?'},
                        {   'answer': 1,
                            'explanation': 'ICC = sigma_between^2 / (sigma_between^2 + sigma_within^2). When ICC is '
                                           'high, individuals within the same cluster are very similar.',
                            'options': [   'The Pearson correlation between x and y',
                                           'The proportion of total variance explained by between-cluster differences',
                                           'The p-value of a regression slope',
                                           'The ratio of sample size to population size'],
                            'question': 'What does the Intraclass Correlation Coefficient (ICC) quantify in clustered '
                                        'experimental designs?'}],
            'rCode': "n <- 100; rho <- 0.2\nn_eff <- n / (1 + (n - 1) * rho)\ncat('Effective sample size:', n_eff)",
            'shortTitle': 'Sample Size & Effective Sample Size',
            'summary': 'When observations are correlated across time or clusters, the effective sample size (N_eff) is '
                       'significantly smaller than the nominal count N.'},
    28: {   'bamIntuition': 'SD is about the INDIVIDUALS in the population. SE is about how accurately your MEAN is '
                            'pinned down! As you gather more data, SD stays steady, but SE shrinks toward zero! BAM!',
            'category': 'Parameters, Samples & Spread',
            'duration': '6:15',
            'firstPrinciples': 'The standard deviation $\\sigma = \\sqrt{E[(X - \\mu)^2]}$ is a parameter of the '
                               'population distribution that characterizes natural subject-to-subject variability. It '
                               'does not decrease with sample size $n$. In contrast, the standard error '
                               '$\\text{SE}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}$ is the standard deviation of the '
                               'sampling distribution of the estimator $\\bar{x}$. By the law of large numbers, '
                               '$\\text{SE} \\to 0$ as $n \\to \\infty$, reflecting increasing estimator precision.',
            'interactiveType': 'sd_vs_se',
            'mathFormulas': [   {   'explanation': 'Quantifies natural variation among individual measurements.',
                                    'latex': 's = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}',
                                    'name': 'Standard Deviation (Individual Spread)'},
                                {   'explanation': 'Quantifies sampling uncertainty of the mean estimator.',
                                    'latex': '\\text{SE}(\\bar{x}) = \\frac{s}{\\sqrt{n}}',
                                    'name': 'Standard Error (Estimator Uncertainty)'}],
            'moduleId': 'module-3',
            'numericalExample': 'Adult human height has SD s = 3.0 inches. If you measure n = 100 people, the sample '
                                "SD is still ~3.0 inches (people don't suddenly become identical). But SE = 3.0 / "
                                'sqrt(100) = 0.3 inches. If you measure n = 10,000 people, SD is still ~3.0 inches, '
                                'but SE = 3.0 / 100 = 0.03 inches!',
            'pitfalls': 'Plotting error bars with SE instead of SD to deceptively make data variability appear small, '
                        'or reporting SD when making inferences about mean differences.',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'data_small = np.random.normal(70, 3, size=25)\n'
                          'data_large = np.random.normal(70, 3, size=2500)\n'
                          "print(f'N=25:   SD = {np.std(data_small, ddof=1):.2f}, SE = {stats.sem(data_small):.3f}')\n"
                          "print(f'N=2500: SD = {np.std(data_large, ddof=1):.2f}, SE = {stats.sem(data_large):.3f}')",
            'quiz': [   {   'answer': 0,
                            'explanation': 'Because SE = s / sqrt(n), replacing n with 4n divides the denominator by '
                                           'sqrt(4) = 2, halving the standard error.',
                            'options': [   'It is cut in half (divided by 2)',
                                           'It is divided by 4',
                                           'It stays the same',
                                           'It doubles'],
                            'question': 'If you quadruple your sample size (4x data), what happens to the Standard '
                                        'Error of the mean?'},
                        {   'answer': 1,
                            'explanation': 'SD quantifies how widely dispersed individuals are around the mean. SE '
                                           'quantifies how much the sample mean would bounce around if the study were '
                                           'repeated.',
                            'options': [   'The precision of a sample statistic; the spread of individual observations',
                                           'The spread of individual observations in the population; the '
                                           'precision/uncertainty of a sample statistic',
                                           'Measurement error; biological error',
                                           'Non-normal spread; normal spread'],
                            'question': 'Standard Deviation (SD) describes: whereas Standard Error (SE) describes:'},
                        {   'answer': 1,
                            'explanation': 'Sample SD estimates the fixed population spread sigma, which does not '
                                           'shrink with n. SE = s / sqrt(n) drops by sqrt(100/25) = 2 (halved).',
                            'options': [   'Both SD and SE are cut in half',
                                           'SD remains roughly constant (estimating population spread); SE is cut in '
                                           'half',
                                           'SD quadruples; SE remains constant',
                                           'SD is cut in half; SE remains constant'],
                            'question': 'If you increase the sample size n from 25 to 100 in an experiment, what '
                                        'happens to the sample SD and the SE of the mean?'}],
            'rCode': 'x_small <- rnorm(25, 70, 3); x_large <- rnorm(2500, 70, 3)\n'
                     "cat('Small SD:', sd(x_small), 'SE:', sd(x_small)/sqrt(25), '\\n')\n"
                     "cat('Large SD:', sd(x_large), 'SE:', sd(x_large)/sqrt(2500))",
            'shortTitle': 'Standard Deviation vs Standard Error',
            'summary': 'Standard deviation measures the biological spread of individual subjects; standard error '
                       'measures the estimation precision of the sample mean.'},
    29: {   'bamIntuition': 'Why is there a square root of n in the denominator? Because variance divides by n, and '
                            'standard error is the square root of variance! To cut error in half, you need 4 times the '
                            'data! BAM!',
            'category': 'Parameters, Samples & Spread',
            'duration': '7:30',
            'firstPrinciples': 'Let $X_1, \\dots, X_n$ be independent identically distributed with variance '
                               '$\\text{Var}(X_i) = \\sigma^2$. The variance of the sum is $\\text{Var}\\left(\\sum '
                               'X_i\\right) = \\sum \\text{Var}(X_i) = n\\sigma^2$. For the sample mean $\\bar{X} = '
                               '\\frac{1}{n}\\sum X_i$, applying the scaling property of variance $\\text{Var}(aY) = '
                               'a^2 \\text{Var}(Y)$ gives: $\\text{Var}(\\bar{X}) = \\text{Var}\\left(\\frac{1}{n} '
                               '\\sum X_i\\right) = \\frac{1}{n^2} \\text{Var}\\left(\\sum X_i\\right) = '
                               '\\frac{1}{n^2}(n\\sigma^2) = \\frac{\\sigma^2}{n}$. Taking the square root gives '
                               '$\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}$.',
            'interactiveType': 'se_scaling',
            'mathFormulas': [   {   'explanation': 'Linearity of variance for independent random variables.',
                                    'latex': '\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}',
                                    'name': 'Variance of the Mean'},
                                {   'explanation': 'Square root of variance of sample mean.',
                                    'latex': '\\text{SE}(\\bar{X}) = \\sqrt{\\text{Var}(\\bar{X})} = '
                                             '\\frac{\\sigma}{\\sqrt{n}}',
                                    'name': 'Standard Error'}],
            'moduleId': 'module-3',
            'numericalExample': 'A factory measures bolt diameters with sigma = 0.8 mm. If you test n = 16 bolts, SE = '
                                '0.8 / sqrt(16) = 0.20 mm. If you want SE = 0.05 mm (4x more precise): 0.05 = 0.8 / '
                                'sqrt(n) -> sqrt(n) = 16 -> n = 256 bolts.',
            'pitfalls': 'Believing accuracy scales linearly with sample size. Diminishing returns mean each additional '
                        'observation yields progressively less reduction in error.',
            'pythonCode': 'sigma = 0.8\n'
                          'for n in [4, 16, 64, 256]:\n'
                          '    se = sigma / np.sqrt(n)\n'
                          "    print(f'N = {n:3d} -> Standard Error = {se:.4f}')",
            'quiz': [   {   'answer': 0,
                            'explanation': 'By definition of variance, Var(cY) = E[(cY - c*mu)^2] = c^2 * E[(Y - '
                                           'mu)^2] = c^2 * Var(Y).',
                            'options': [   'Because variance has quadratic scaling: Var(c * Y) = c^2 * Var(Y)',
                                           "Because of Bessel's correction",
                                           "It doesn't, it divides by n",
                                           'Because n is an integer'],
                            'question': 'Why does Var(X_bar) divide by n^2 instead of n when factoring out the 1/n?'},
                        {   'answer': 1,
                            'explanation': 'The standard error of the mean is the estimated standard deviation of the '
                                           'sample mean: SE = s / sqrt(n).',
                            'options': ['s * sqrt(n)', 's / sqrt(n)', 's^2 / n', 's / n'],
                            'question': 'What is the mathematical formula for the Standard Error of the sample mean '
                                        'computed from a sample of size n?'},
                        {   'answer': 1,
                            'explanation': 'Many readers erroneously assume error bars show the spread of data points '
                                           '(SD) rather than the precision of the mean estimate (SE).',
                            'options': [   'Because SE bars are computationally difficult to draw',
                                           'Because SE bars are much narrower than SD bars, creating an illusion of '
                                           'small variability that confuses readers who mistake SE for data spread',
                                           'Because SE bars can never be plotted for continuous data',
                                           'Because SE only applies to binary proportions'],
                            'question': 'Why do some scientific journals discourage plotting error bars representing '
                                        '+/- 1 SE without clear labeling?'}],
            'rCode': "sigma <- 0.8; ns <- c(4, 16, 64, 256)\ncat('SE values:', sigma / sqrt(ns))",
            'shortTitle': 'The Standard Error',
            'summary': 'Deep mathematical derivation of the standard error formula and how square root scaling governs '
                       'the precision of all parameter estimators.'},
    30: {   'bamIntuition': "Don't know the mathematical formula for the sampling distribution of your weird "
                            'statistic? Just pretend your sample IS the population, pull out random bootstrap samples '
                            'WITH REPLACEMENT, and BAM: You simulate the sampling distribution directly!',
            'category': 'CLT & Bootstrapping',
            'duration': '8:50',
            'firstPrinciples': 'Introduced by Bradley Efron in 1979, the bootstrap replaces the unknown true '
                               'population distribution $F$ with the empirical distribution function $\\hat{F}_n(x) = '
                               '\\frac{1}{n}\\sum_{i=1}^n \\mathbf{1}_{x_i \\le x}$. By sampling $n$ points from '
                               '$\\hat{F}_n$ *with replacement*, we generate bootstrap samples $\\mathbf{x}^{*(b)}$. '
                               'Computing the statistic of interest $T^{*(b)} = g(\\mathbf{x}^{*(b)})$ across $B$ '
                               'bootstrap iterations yields an empirical Monte Carlo approximation of the sampling '
                               'distribution of $T$, valid for means, medians, ratios, or complex machine learning '
                               'models.',
            'interactiveType': 'bootstrap',
            'mathFormulas': [   {   'explanation': 'Uniform probability mass on each observed sample point.',
                                    'latex': 'P^*(X^* = x_i) = \\frac{1}{n}, \\quad i = 1, \\dots, n',
                                    'name': 'Empirical Bootstrap Distribution'},
                                {   'explanation': 'Sample standard deviation across B bootstrap replications.',
                                    'latex': '\\widehat{\\text{SE}}_B(T) = \\sqrt{\\frac{1}{B-1}\\sum_{b=1}^B '
                                             '(T^{*(b)} - \\bar{T}^*)^2}',
                                    'name': 'Bootstrap Standard Error'}],
            'moduleId': 'module-4',
            'numericalExample': 'Sample of 5 response times: [12, 14, 15, 18, 45]. Median = 15. Standard parametric '
                                'formulas for the median standard error are difficult. We generate 1000 resamples of '
                                'size 5 with replacement (e.g. [14, 14, 15, 45, 45] -> median 15; [12, 12, 12, 14, 18] '
                                '-> median 12), computing the 2.5th and 97.5th percentiles to find the exact 95% '
                                'confidence interval.',
            'pitfalls': 'Sampling WITHOUT replacement (which would simply reproduce the original dataset unchanged!) '
                        'or using bootstrap on tiny samples (n < 10) where extreme values cannot be adequately '
                        'represented.',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'data = np.array([12, 14, 15, 18, 45])\n'
                          'B = 5000\n'
                          'boot_medians = [np.median(np.random.choice(data, size=len(data), replace=True)) for _ in '
                          'range(B)]\n'
                          'ci_lower, ci_upper = np.percentile(boot_medians, [2.5, 97.5])\n'
                          "print(f'Bootstrap 95% CI for Median: [{ci_lower:.1f}, {ci_upper:.1f}]')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Sampling WITH replacement allows data points to appear multiple times or '
                                           'not at all, mimicking drawing fresh independent samples from the empirical '
                                           'distribution.',
                            'options': [   'You must sample without replacement',
                                           'You must sample with replacement',
                                           'You must draw twice as many samples as the original n',
                                           'Data must be sorted first'],
                            'question': 'What is the critical rule when drawing bootstrap samples from original data?'},
                        {   'answer': 1,
                            'explanation': 'Bootstrapping treats the empirical sample as an estimate of the '
                                           'population, drawing n items with replacement so some are duplicated and '
                                           'others omitted.',
                            'options': [   'By drawing n observations from a fitted Gaussian distribution',
                                           'By drawing n observations from the original sample AT RANDOM WITH '
                                           'REPLACEMENT',
                                           'By drawing n observations without replacement',
                                           'By multiplying each observation by a random normal weight'],
                            'question': 'How does non-parametric bootstrapping generate a surrogate bootstrap sample '
                                        'from an original dataset of size n?'},
                        {   'answer': 1,
                            'explanation': 'Without replacement, you would simply reshuffle the exact same n numbers '
                                           'every time, yielding the exact same sample mean with zero variability.',
                            'options': [   'You would get higher accuracy',
                                           'Every bootstrap sample would be an identical permutation of the original '
                                           'dataset, resulting in zero variance in sample statistics',
                                           'The computation time would double',
                                           'The sample size would shrink to 0'],
                            'question': 'What would happen if you performed bootstrap resampling WITHOUT '
                                        'replacement?'}],
            'rCode': 'data <- c(12, 14, 15, 18, 45)\n'
                     'boot_medians <- replicate(5000, median(sample(data, replace=TRUE)))\n'
                     'quantile(boot_medians, c(0.025, 0.975))',
            'shortTitle': 'Bootstrapping Main Ideas',
            'summary': 'Non-parametric bootstrapping resamples observed data with replacement to approximate the '
                       'sampling distribution of any statistic without parametric assumptions.'}}

