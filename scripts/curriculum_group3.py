# scripts/curriculum_group3.py
"""
Pedagogical content for videos 31 to 45 with 3 questions each.
"""

GROUP_3 = {   31: {   'bamIntuition': 'Shift your data so the null hypothesis is true (make group means match!). Resample from '
                            'that shifted world thousands of times. The fraction of resamples that beat your real '
                            'observed difference is your exact empirical p-value! BAM!',
            'category': 'CLT & Bootstrapping',
            'duration': '8:15',
            'firstPrinciples': 'To test $H_0: \\mu_1 = \\mu_2$ non-parametrically, we construct a data world where '
                               '$H_0$ holds exactly. In permutation testing, we pool all observations $N = n_1 + n_2$, '
                               'randomly shuffle group labels without replacement, and compute the test statistic '
                               '$T^{*(b)} = \\bar{X}_1^* - \\bar{X}_2^*$. In bootstrap hypothesis testing, we '
                               'mean-center both groups so $\\bar{x}_1^{\\text{shifted}} = '
                               '\\bar{x}_2^{\\text{shifted}} = \\bar{x}_{\\text{pooled}}$, draw bootstrap samples with '
                               'replacement, and calculate: $p = \\frac{1 + \\sum_{b=1}^B \\mathbf{1}_{|T^{*(b)}| \\ge '
                               '|T_{\\text{obs}}|}}{B + 1}$.',
            'interactiveType': 'bootstrap_p',
            'mathFormulas': [   {   'explanation': 'Proportion of resampled test statistics as extreme as observed, '
                                                   'with +1 continuity correction.',
                                    'latex': 'p_{\\text{boot}} = \\frac{1 + \\sum_{b=1}^B \\mathbf{1}_{\\{|T^{*(b)}| '
                                             '\\ge |t_{\\text{obs}}|\\}}}{B + 1}',
                                    'name': 'Empirical Bootstrap p-value'},
                                {   'explanation': 'Enforces the null condition while preserving higher-order moments '
                                                   'of original samples.',
                                    'latex': '\\tilde{x}_{1i} = x_{1i} - \\bar{x}_1 + \\bar{x}_{\\text{pool}}',
                                    'name': 'Null Shift Transformation'}],
            'moduleId': 'module-4',
            'numericalExample': 'Group A: [10, 12, 14] (mean 12). Group B: [16, 18, 20] (mean 18). Observed difference '
                                '= 6.0. Pool = [10, 12, 14, 16, 18, 20]. In 1,000 permutations, only 2 permutations '
                                'yield a difference >= 6.0. Two-tailed p-value = (2 * 2 + 1) / (1000 + 1) = 5 / 1001 = '
                                '0.005.',
            'pitfalls': 'Failing to add the +1 correction in numerator and denominator, which could spuriously yield p '
                        '= 0 if no resample exceeds the observed value (a p-value cannot be strictly 0).',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'group_a = np.array([10, 12, 14])\n'
                          'group_b = np.array([16, 18, 20])\n'
                          'obs_diff = np.abs(np.mean(group_b) - np.mean(group_a))\n'
                          'pooled = np.concatenate([group_a, group_b])\n'
                          '\n'
                          'B = 5000\n'
                          'count = 0\n'
                          'for _ in range(B):\n'
                          '    shuffled = np.random.permutation(pooled)\n'
                          '    diff = np.abs(np.mean(shuffled[len(group_a):]) - np.mean(shuffled[:len(group_a)]))\n'
                          '    if diff >= obs_diff:\n'
                          '        count += 1\n'
                          '\n'
                          "print(f'Permutation p-value: {(count + 1) / (B + 1):.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Standard statistical practice adds +1 to numerator and denominator '
                                           '(including the observed test statistic itself as a member of the '
                                           'permutation distribution).',
                            'options': [   'Computers cannot store zero',
                                           'The observed data itself represents one valid possible permutation under '
                                           'the null (+1 rule)',
                                           'Because bootstrap is always two-tailed',
                                           'It can be zero if B > 100,000'],
                            'question': 'Why can an empirical bootstrap or permutation p-value never be strictly equal '
                                        'to 0.0000?'},
                        {   'answer': 1,
                            'explanation': 'Hypothesis testing requires calculating probabilities under the null '
                                           'hypothesis. Centering both samples at a common mean enforces H0.',
                            'options': [   'Discard half the data',
                                           'Shift or center both groups so they share the exact same overall combined '
                                           'mean (imposing the null hypothesis)',
                                           'Square all the numbers',
                                           'Normalize both datasets to have variance 0'],
                            'question': 'When using bootstrapping to compute a p-value for testing H0: mu_1 = mu_2, '
                                        'what must you do to the original datasets before resampling?'},
                        {   'answer': 1,
                            'explanation': 'Bootstrapping is distribution-free: it derives the reference distribution '
                                           'empirically from the observed data rather than assuming theoretical '
                                           'normality.',
                            'options': [   'It guarantees a p-value less than 0.05',
                                           'It does not rely on parametric normality assumptions or asymptotic '
                                           'approximations',
                                           'It does not require collecting any real data',
                                           'It works only for categorical variables'],
                            'question': 'What is a major advantage of the bootstrap hypothesis test over the classical '
                                        "Student's t-test?"}],
            'rCode': 'a <- c(10, 12, 14); b <- c(16, 18, 20)\n'
                     'obs <- abs(mean(b) - mean(a))\n'
                     'pool <- c(a, b)\n'
                     'null_dist <- replicate(5000, {\n'
                     '  idx <- sample(length(pool), length(a))\n'
                     '  abs(mean(pool[-idx]) - mean(pool[idx]))\n'
                     '})\n'
                     "cat('p-val:', mean(null_dist >= obs))",
            'shortTitle': 'Bootstrapping p-values',
            'summary': 'Using non-parametric permutation and bootstrap shifting under the null hypothesis to compute '
                       'empirical p-values without normality assumptions.'},
    32: {   'bamIntuition': 'Pie charts force your brain to judge weird angles and circular wedges. Bar charts align '
                            'everything on a clean flat baseline! Length is instant and effortless to compare. Never '
                            'use pie charts! BAM!',
            'category': 'Descriptive Statistics',
            'duration': '4:30',
            'firstPrinciples': "According to Cleveland and McGill's seminal 1984 psychophysical hierarchy of visual "
                               'perception, graphical elements are ranked in decreasing order of human decoding '
                               'accuracy: 1. Position along a common scale (Bar chart); 2. Position along non-aligned '
                               'scales; 3. Length; 4. Direction / Angle (Pie chart); 5. Area; 6. Volume; 7. Color '
                               'saturation. Pie charts fail because judgment of angles and curved arc lengths induces '
                               'high perceptual variance and systematic distortion, especially with 3D tilts.',
            'interactiveType': 'bar_vs_pie',
            'mathFormulas': [   {   'explanation': 'Empirical psychophysics proves position on a baseline outperforms '
                                                   'angular estimation.',
                                    'latex': '\\text{Perceptual Error}(\\text{Angle}) \\gg \\text{Perceptual '
                                             'Error}(\\text{Position on common scale})',
                                    'name': 'Linear Encoding Accuracy'},
                                {   'explanation': 'Maps frequency to degrees of an arc.',
                                    'latex': '\\theta_i = 360^\\circ \\times \\frac{x_i}{\\sum x_j}',
                                    'name': 'Slice Angle Formula'}],
            'moduleId': 'module-1',
            'numericalExample': 'Categories: A: 24%, B: 26%, C: 25%, D: 25%. In a pie chart, human observers cannot '
                                'reliably identify whether B is larger than A. In a bar chart aligned at 0%, the '
                                'difference between 24% and 26% is immediately obvious.',
            'pitfalls': "Using 3D 'exploded' pie charts in business presentations, which distort relative proportions "
                        'even further through perspective foreshortening.',
            'pythonCode': 'import matplotlib.pyplot as plt\n'
                          '\n'
                          "categories = ['A', 'B', 'C', 'D']\n"
                          'values = [24, 26, 25, 25]\n'
                          '\n'
                          'fig, ax = plt.subplots(figsize=(6, 3))\n'
                          "ax.bar(categories, values, color='#3B82F6')\n"
                          'ax.set_ylim(0, 30)\n'
                          "ax.set_ylabel('Percentage (%)')\n"
                          "ax.set_title('Clear Perception with Bar Chart')",
            'quiz': [   {   'answer': 2,
                            'explanation': 'Position along a common baseline (as in bar charts) is decoded with the '
                                           'lowest cognitive error.',
                            'options': [   'Angle and slope',
                                           'Color hue and shade',
                                           'Position along a common aligned scale',
                                           '2D surface area'],
                            'question': "According to Cleveland and McGill's visual perception hierarchy, which visual "
                                        'channel is decoded most accurately by the human visual cortex?'},
                        {   'answer': 1,
                            'explanation': "Cleveland and McGill's perceptual experiments proved that humans judge "
                                           'position along a common scale far more accurately than angles or slices of '
                                           'a circle.',
                            'options': [   'Pie charts take up more computer memory',
                                           'Human visual perception is substantially more accurate at judging linear '
                                           'lengths along a common aligned axis than comparing 2D angles, areas, or '
                                           'arc lengths',
                                           'Bar charts cannot display percentages',
                                           'Pie charts cannot have more than 2 categories'],
                            'question': 'Why do data visualization guidelines strongly favor bar charts over pie '
                                        'charts for multi-category comparisons?'},
                        {   'answer': 1,
                            'explanation': '3D perspective tilts the chart, making foreground slices appear '
                                           'deceptively larger than equal or larger background slices.',
                            'options': [   'Whenever you have more than 5 categories',
                                           'Virtually never, because 3D perspective distortion severely misrepresents '
                                           'slice angles and relative visual areas',
                                           'Whenever the data are continuous',
                                           'Only in financial annual reports'],
                            'question': 'When is a 3D perspective pie chart appropriate in scientific publications?'}],
            'rCode': "barplot(c(A=24, B=26, C=25, D=25), col='steelblue', ylim=c(0, 30), ylab='%')",
            'shortTitle': 'Bar Charts vs Pie Charts',
            'summary': 'Human visual perception decodes linear lengths along an aligned scale with far greater '
                       'precision than 2D angles, slice areas, or 3D perspective slices.'},
    33: {   'bamIntuition': 'The box holds the middle 50% of your data (the IQR). The line inside is the median. The '
                            'whiskers stretch 1.5 times the IQR. Anything outside is an outlier! Clean, compact, '
                            'awesome! BAM!',
            'category': 'Descriptive Statistics',
            'duration': '5:40',
            'firstPrinciples': "A boxplot visually encodes John Tukey's five-number summary. The Interquartile Range "
                               '$\\text{IQR} = Q_3 - Q_1$ contains the central 50% of observations. Whiskers extend to '
                               'the most extreme data point within the Tukey fences: $[Q_1 - 1.5\\cdot\\text{IQR}, \\, '
                               'Q_3 + 1.5\\cdot\\text{IQR}]$. For a Gaussian distribution, $Q_1 = \\mu - '
                               '0.6745\\sigma$ and $Q_3 = \\mu + 0.6745\\sigma$, so $\\text{IQR} \\approx '
                               '1.349\\sigma$, and the whisker fence reaches $\\pm 2.698\\sigma$ (capturing 99.3% of '
                               'normal data; points beyond are flagged as outliers).',
            'interactiveType': 'boxplot',
            'mathFormulas': [   {   'explanation': 'Spread of the central 50% of the distribution.',
                                    'latex': '\\text{IQR} = Q_3 - Q_1',
                                    'name': 'Interquartile Range'},
                                {   'explanation': 'Threshold beyond which data points are plotted as individual '
                                                   'outlier dots.',
                                    'latex': '\\text{Fence}_{\\text{upper}} = Q_3 + 1.5 \\times \\text{IQR}, \\quad '
                                             '\\text{Fence}_{\\text{lower}} = Q_1 - 1.5 \\times \\text{IQR}',
                                    'name': 'Tukey Outlier Fences'}],
            'moduleId': 'module-1',
            'numericalExample': 'Data: [10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60]. Median = 24. Q1 = 18, Q3 = 30. '
                                'IQR = 30 - 18 = 12. Upper fence = 30 + (1.5 * 12) = 30 + 18 = 48. Value 60 > 48, so '
                                '60 is flagged as an outlier dot! Upper whisker stops at 32.',
            'pitfalls': 'Failing to recognize multimodal data. A bimodal distribution with two distinct peaks looks '
                        'like a regular symmetric boxplot; always pair boxplots with stripcharts or violin plots.',
            'pythonCode': 'import matplotlib.pyplot as plt\n'
                          '\n'
                          'data = [10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60]\n'
                          'plt.boxplot(data, vert=False)\n'
                          "plt.title('Boxplot with Outlier at 60')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'The box spans from Q1 (25th percentile) to Q3 (75th percentile), enclosing '
                                           'exactly the middle 50% of the sample.',
                            'options': ['25%', '50%', '75%', '95%'],
                            'question': 'What percentage of data is contained strictly inside the rectangular box of a '
                                        'boxplot?'},
                        {   'answer': 1,
                            'explanation': 'The box encompasses the central 50% of the distribution (the Interquartile '
                                           'Range IQR = Q3 - Q1), with the centerline marking the median.',
                            'options': [   'Minimum, Mean, Maximum',
                                           'First quartile Q1 (25th percentile), Median (50th percentile), and Third '
                                           'quartile Q3 (75th percentile)',
                                           'Mean - SD, Mean, Mean + SD',
                                           '10th percentile, 50th percentile, 90th percentile'],
                            'question': 'In a standard Tukey boxplot, what do the bottom, middle, and top horizontal '
                                        'lines of the box represent?'},
                        {   'answer': 1,
                            'explanation': "Tukey defined 'fences' at Q1 - 1.5*IQR and Q3 + 1.5*IQR. Points beyond "
                                           'these fences are plotted as individual outlier points.',
                            'options': [   'Any point beyond 1 standard deviation from the mean',
                                           'Points beyond 1.5 * IQR above the third quartile or below the first '
                                           'quartile',
                                           'Points that have negative values',
                                           'The top 1% of observations regardless of spread'],
                            'question': 'How are outlier points typically defined and plotted in a standard boxplot?'}],
            'rCode': 'data <- c(10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60)\nboxplot(data, horizontal=TRUE)',
            'shortTitle': 'Boxplots are Awesome',
            'summary': "Tukey's five-number summary: minimum, Q1 (25th percentile), median (50th percentile), Q3 (75th "
                       'percentile), maximum, and outlier whiskers.'},
    34: {   'bamIntuition': 'A 2-fold increase (from 10 to 20) is +10. But a 2-fold increase from 1000 to 2000 is '
                            '+1000! Taking logs makes a 2-fold change look the same size anywhere on the graph! '
                            'Multiplicative becomes additive! BAM!',
            'category': 'Descriptive Statistics',
            'duration': '6:10',
            'firstPrinciples': 'The logarithm $\\log_b(x)$ is the inverse of exponentiation: $y = \\log_b(x) \\iff b^y '
                               '= x$. Crucial mathematical properties: 1. $\\log(u \\cdot v) = \\log(u) + \\log(v)$; '
                               '2. $\\log(u / v) = \\log(u) - \\log(v)$; 3. $\\log(u^k) = k \\log(u)$. In statistical '
                               'modeling, when multiplicative errors occur ($Y = e^{\\beta X} \\cdot \\epsilon$), '
                               'taking the log yields an additive linear model: $\\ln Y = \\beta X + \\ln \\epsilon$. '
                               'For log-normal variables, $\\ln X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, making '
                               'standard linear methods applicable.',
            'interactiveType': 'log_transform',
            'mathFormulas': [   {   'explanation': 'Transforms multiplicative scale factors into additive shifts.',
                                    'latex': '\\log_b(x \\cdot y) = \\log_b(x) + \\log_b(y)',
                                    'name': 'Multiplication to Addition'},
                                {   'explanation': 'Equal magnitude for doubling and halving.',
                                    'latex': '\\log_2(2/1) = +1, \\quad \\log_2(1/2) = -1',
                                    'name': 'Log-Ratio Symmetry'}],
            'moduleId': 'module-1',
            'numericalExample': 'Comparing gene expression: Control = 1.0. Gene A is doubled (2.0): Ratio = 2.0/1.0 = '
                                '2.0. Gene B is halved (0.5): Ratio = 0.5/1.0 = 0.5. On a raw scale, doubling is a '
                                'jump of +1.0, while halving is a jump of only -0.5 (asymmetric!). In log2 space: '
                                'log2(2) = +1.0, log2(0.5) = -1.0. Perfect symmetry!',
            'pitfalls': 'Attempting to take the logarithm of zero or negative numbers ($\\log(0) = -\\infty$). For '
                        'count data with zeros, practitioners use $\\log(x + 1)$ (pseudocounts).',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'ratios = np.array([0.1, 0.5, 1.0, 2.0, 10.0])\n'
                          'log2_ratios = np.log2(ratios)\n'
                          "print('Raw ratios: ', ratios)\n"
                          "print('Log2 ratios:', log2_ratios)",
            'quiz': [   {   'answer': 0,
                            'explanation': 'Because 2^(-3) = 1 / (2^3) = 1/8, log2(1/8) = -3.',
                            'options': ['-3', '3', '-0.125', '0'],
                            'question': 'What is the value of log2(1/8)?'},
                        {   'answer': 0,
                            'explanation': 'Log transforms compress right-skewed tails, equalize variances '
                                           '(homoscedasticity), and turn multiplicative fold-changes into additive '
                                           'linear intervals.',
                            'options': [   'It compresses large values, stabilizes variance across groups, and '
                                           'converts multiplicative relationships into additive ones',
                                           'It removes all outliers permanently',
                                           'It forces the data to follow a uniform distribution',
                                           'It eliminates the need for hypothesis testing'],
                            'question': 'When data span multiple orders of magnitude (e.g. gene expression or viral '
                                        'loads), what primary benefit does a log transformation provide?'},
                        {   'answer': 1,
                            'explanation': 'Because lim_{x -> 0+} ln(x) = -infinity, researchers add a small constant '
                                           '(like 1) before taking the logarithm: log(x + 1).',
                            'options': [   'log(0) equals 1; no transformation needed',
                                           'log(0) is undefined (-infinity); adding a pseudo-count c (e.g. log(x + 1)) '
                                           'avoids infinite values',
                                           'log(0) equals 0 on 64-bit systems',
                                           'log(0) inverts the sign of the data'],
                            'question': 'Why is log(0) mathematically problematic in data analysis, and what common '
                                        'transformation is used for count data containing zeros?'}],
            'rCode': 'ratios <- c(0.1, 0.5, 1, 2, 10)\nlog2(ratios)',
            'shortTitle': 'Logs (Logarithms), Clearly Explained',
            'summary': 'Logarithmic transformations linearize multiplicative processes, stabilize heteroscedastic '
                       'variance, and compress wide dynamic scales into symmetric distributions.'},
    35: {   'bamIntuition': 'A confidence interval is a net you toss into the lake! The fish (true population mean) '
                            "isn't swimming around—it's frozen in place. If you toss 100 nets, 95 of them will catch "
                            'the fish! BAM!',
            'category': 'CLT & Bootstrapping',
            'duration': '8:25',
            'firstPrinciples': 'Let $\\theta$ be a fixed, deterministic population parameter. A $100(1-\\alpha)\\%$ '
                               'confidence interval $[L(\\mathbf{X}), U(\\mathbf{X})]$ is a random interval '
                               'satisfying: $P(L(\\mathbf{X}) \\le \\theta \\le U(\\mathbf{X})) = 1 - \\alpha$. For '
                               'sample mean from normal distribution with unknown $\\sigma$, the pivotal quantity $T = '
                               '\\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} \\sim t_{n-1}$ yields: $\\text{CI} = \\left[ '
                               '\\bar{x} - t_{1-\\alpha/2, n-1}\\frac{s}{\\sqrt{n}}, \\; \\bar{x} + t_{1-\\alpha/2, '
                               'n-1}\\frac{s}{\\sqrt{n}} \\right]$.',
            'interactiveType': 'confidence_intervals',
            'mathFormulas': [   {   'explanation': 'The endpoints are random variables; mu is a fixed constant.',
                                    'latex': 'P\\left( \\bar{X} - t^* \\frac{s}{\\sqrt{n}} \\le \\mu \\le \\bar{X} + '
                                             't^* \\frac{s}{\\sqrt{n}} \\right) = 0.95',
                                    'name': 'Frequentist Coverage Probability'},
                                {   'explanation': 'Half-width of the confidence interval.',
                                    'latex': '\\text{ME} = t_{1-\\alpha/2, n-1} \\cdot \\frac{s}{\\sqrt{n}}',
                                    'name': 'Margin of Error'}],
            'moduleId': 'module-4',
            'numericalExample': 'Sample n = 25, mean x_bar = 50, s = 10. SE = 10 / sqrt(25) = 2.0. Degrees of freedom '
                                '= 24. For 95% confidence, t* = 2.064. Margin of Error = 2.064 * 2.0 = 4.128. 95% CI = '
                                '[50 - 4.128, 50 + 4.128] = [45.87, 54.13].',
            'pitfalls': "Saying 'There is a 95% probability that the true mean is between 45.87 and 54.13.' In "
                        'frequentist statistics, the parameter is fixed: it is either 100% inside or 100% outside; the '
                        '95% applies to the repeated procedure.',
            'pythonCode': 'from scipy import stats\n'
                          'import numpy as np\n'
                          '\n'
                          'n = 25\n'
                          'x_bar = 50\n'
                          's = 10\n'
                          'se = s / np.sqrt(n)\n'
                          'ci = stats.t.interval(0.95, df=n-1, loc=x_bar, scale=se)\n'
                          "print(f'95% Confidence Interval: [{ci[0]:.2f}, {ci[1]:.2f}]')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Frequentist confidence describes the long-run capture rate across '
                                           'hypothetical repeated samplings.',
                            'options': [   'There is a 95% chance the true mean lies in this specific interval',
                                           'In 95% of repeated experiments from the same population, the calculated '
                                           'intervals will capture the true parameter',
                                           '95% of individual data points fall inside the interval',
                                           'The sample mean is within 5% of truth'],
                            'question': 'What is the correct frequentist interpretation of a 95% confidence interval?'},
                        {   'answer': 1,
                            'explanation': 'In frequentist statistics, the population parameter is a fixed constant, '
                                           'not a random variable. The 95% probability describes the long-run coverage '
                                           'of the procedure.',
                            'options': [   'There is a 95% probability that the true population mean lies between 10.2 '
                                           'and 14.8',
                                           'If we repeated the experiment and constructed intervals identically from '
                                           'many independent samples, 95% of those calculated intervals would contain '
                                           'the fixed true parameter',
                                           '95% of the individual observations in the sample fall between 10.2 and '
                                           '14.8',
                                           'The sample mean has a 95% chance of being 12.5'],
                            'question': 'What is the precise frequentist definition of a 95% Confidence Interval '
                                        '[10.2, 14.8] for the population mean?'},
                        {   'answer': 1,
                            'explanation': 'CI half-width is critical_value * (s / sqrt(n)). Multiplying n by 4 '
                                           'multiplies the denominator by sqrt(4) = 2, cutting the interval width in '
                                           'half.',
                            'options': [   'The width is quadrupled',
                                           'The width is cut in half',
                                           'The width decreases by 75%',
                                           'The width remains unchanged'],
                            'question': 'If you quadruple the sample size n from 50 to 200, what happens to the width '
                                        'of the 95% confidence interval for the mean?'}],
            'rCode': 't.test(rnorm(25, mean=50, sd=10))$conf.int',
            'shortTitle': 'Confidence Intervals',
            'summary': 'Frequentist confidence intervals: In repeated sampling, 95% of constructed intervals contain '
                       'the true, fixed population parameter.'},
    36: {   'bamIntuition': 'Compare two models: 1. A stupid flat line at the average Y. 2. Your regression line. How '
                            'much did your line reduce the sum of squared errors compared to the flat line? That '
                            'percentage reduction is R-squared! BAM!',
            'category': 'Regression & Linear Models',
            'duration': '7:55',
            'firstPrinciples': 'Total Sum of Squares decomposes orthogonally: $SS_{\\text{tot}} = SS_{\\text{reg}} + '
                               'SS_{\\text{res}}$, where $SS_{\\text{tot}} = \\sum (y_i - \\bar{y})^2$ and '
                               '$SS_{\\text{res}} = \\sum (y_i - \\hat{y}_i)^2$. The coefficient of determination is '
                               'defined as $R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}} = '
                               '\\frac{SS_{\\text{reg}}}{SS_{\\text{tot}}}$. For simple univariate linear regression, '
                               '$R^2 = r_{xy}^2$ (the squared Pearson correlation). Adjusted $R^2 = 1 - '
                               '\\left[\\frac{(1 - R^2)(n - 1)}{n - p - 1}\\right]$ penalizes adding useless '
                               'predictors.',
            'interactiveType': 'r_squared',
            'mathFormulas': [   {   'explanation': 'Fraction of variance explained relative to a horizontal mean line.',
                                    'latex': 'R^2 = 1 - \\frac{\\sum_{i=1}^n (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^n (y_i '
                                             '- \\bar{y})^2}',
                                    'name': 'R-squared Formula'},
                                {   'explanation': 'Penalizes inclusion of redundant predictor variables p.',
                                    'latex': 'R^2_{\\text{adj}} = 1 - \\frac{SS_{\\text{res}} / (n - p - '
                                             '1)}{SS_{\\text{tot}} / (n - 1)}',
                                    'name': 'Adjusted R-squared'}],
            'moduleId': 'module-10',
            'numericalExample': 'Data: Y = [2, 4, 6, 8, 10]. y_bar = 6. SS_tot = (-4)^2 + (-2)^2 + 0^2 + 2^2 + 4^2 = '
                                '16 + 4 + 0 + 4 + 16 = 40. Model predictions: y_hat = [2.2, 3.8, 6.1, 7.9, 10.0]. '
                                'Residuals: [-0.2, +0.2, -0.1, +0.1, 0.0]. SS_res = 0.04 + 0.04 + 0.01 + 0.01 + 0 = '
                                '0.10. R^2 = 1 - (0.10 / 40) = 1 - 0.0025 = 0.9975 (99.75% of variance explained!).',
            'pitfalls': "Assuming a high R^2 means the model is correct. Anscombe's quartet shows datasets with "
                        'identical R^2 = 0.67 that are parabolic or dominated by single outliers.',
            'pythonCode': 'from sklearn.metrics import r2_score\n'
                          'import numpy as np\n'
                          '\n'
                          'y_true = np.array([2, 4, 6, 8, 10])\n'
                          'y_pred = np.array([2.2, 3.8, 6.1, 7.9, 10.0])\n'
                          'r2 = r2_score(y_true, y_pred)\n'
                          "print(f'R-squared: {r2:.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'If SS_res = SS_tot, the model provides zero predictive improvement over '
                                           'the naive baseline of predicting the sample mean.',
                            'options': [   'The model makes no errors',
                                           'The regression line explains zero variance beyond simply guessing the mean '
                                           'y_bar for every prediction',
                                           'The slope is infinite',
                                           'Data points are negative'],
                            'question': 'What does R^2 = 0 mean for a linear regression model?'},
                        {   'answer': 1,
                            'explanation': 'R^2 = 1 - (SS_res / SS_tot). It quantifies the proportion of total '
                                           'variation in y accounted for by the fitted model.',
                            'options': [   '82% of the data points fall exactly on the regression line',
                                           '82% of the total variance in the dependent variable y is explained by the '
                                           'linear relationship with x',
                                           'The correlation between x and y is 0.82',
                                           'The p-value of the slope is 0.18'],
                            'question': 'In a simple linear regression model, what does an R-squared value of R^2 = '
                                        '0.82 mean?'},
                        {   'answer': 0,
                            'explanation': 'Raw R^2 monotonically increases with added predictors due to overfitting. '
                                           'Adjusted R^2 includes a penalty factor (n - 1)/(n - p - 1) for each added '
                                           'parameter.',
                            'options': [   'OLS can always find small non-zero coefficients to fit sample noise; '
                                           'Adjusted R^2 penalizes added degrees of freedom',
                                           "R^2 is capped at 1.0; Pearson's r corrects for it",
                                           'Because sample size shrinks with each predictor; F-statistic corrects for '
                                           'it',
                                           'Because degrees of freedom increase'],
                            'question': 'Why does adding additional explanatory variables to a multiple regression '
                                        'never decrease the unadjusted R^2, and what metric corrects for this?'}],
            'rCode': 'y <- c(2, 4, 6, 8, 10)\nfit <- lm(y ~ c(1, 2, 3, 4, 5))\nsummary(fit)$r.squared',
            'shortTitle': 'R-squared, Clearly Explained',
            'summary': 'The coefficient of determination (R^2) quantifies the proportion of total variation in the '
                       'response variable explained by the regression model.'},
    37: {   'bamIntuition': 'Draw a line through a scatter of dots. Every dot has a vertical distance (residual) to '
                            'the line. Square those distances, add them up, and wiggle the line until that sum is as '
                            'tiny as possible! BAM: Linear Regression!',
            'category': 'Regression & Linear Models',
            'duration': '8:30',
            'firstPrinciples': 'Given bivariate observations $(x_1, y_1), \\dots, (x_n, y_n)$, we postulate the '
                               'relationship $y_i = \\beta_0 + \\beta_1 x_i + \\epsilon_i$, with $E[\\epsilon_i] = 0$. '
                               'The Ordinary Least Squares (OLS) objective minimizes the residual sum of squares: '
                               '$S(\\beta_0, \\beta_1) = \\sum_{i=1}^n (y_i - (\\beta_0 + \\beta_1 x_i))^2$. Taking '
                               'partial derivatives $\\frac{\\partial S}{\\partial \\beta_0} = 0$ and '
                               '$\\frac{\\partial S}{\\partial \\beta_1} = 0$ yields the normal equations, '
                               'guaranteeing a unique global minimum.',
            'interactiveType': 'regression_intro',
            'mathFormulas': [   {   'explanation': 'Minimizing the sum of squared vertical residuals.',
                                    'latex': '\\min_{\\beta_0, \\beta_1} \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 '
                                             'x_i)^2',
                                    'name': 'OLS Objective Function'},
                                {   'explanation': 'Vertical distance between observed target and fitted line.',
                                    'latex': 'e_i = y_i - \\hat{y}_i = y_i - (\\hat{\\beta}_0 + \\hat{\\beta}_1 x_i)',
                                    'name': 'Residual Definition'}],
            'moduleId': 'module-10',
            'numericalExample': 'Points: (1, 2), (2, 3), (3, 5). x_bar = 2, y_bar = 3.33. Cov(x, y) = 1.5, Var(x) = '
                                '1.0. Slope beta1 = 1.5 / 1.0 = 1.5. Intercept beta0 = 3.33 - (1.5 * 2) = 0.33. Line '
                                'equation: y = 0.33 + 1.5x.',
            'pitfalls': 'Minimizing perpendicular distance instead of vertical distance. OLS minimizes strictly '
                        'vertical error in Y because X is assumed to be known without measurement error.',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'x = np.array([1, 2, 3])\n'
                          'y = np.array([2, 3, 5])\n'
                          'slope, intercept = np.polyfit(x, y, 1)\n'
                          "print(f'Fitted Line: Y = {intercept:.2f} + {slope:.2f} * X')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Standard regression minimizes prediction error along the target axis Y '
                                           'conditional on known predictor values X.',
                            'options': [   'It is easier to calculate',
                                           'Because X is assumed fixed/independent and our goal is to minimize error '
                                           'in predicting Y',
                                           'Vertical lines are straight',
                                           'To avoid negative numbers'],
                            'question': 'Why does OLS minimize vertical distance rather than horizontal or '
                                        'perpendicular distance to the line?'},
                        {   'answer': 1,
                            'explanation': 'Linear regression models how the expected value (conditional mean) of the '
                                           'response Y changes as a function of the predictor X.',
                            'options': [   'To prove that x causes y',
                                           'To model the conditional expectation E[Y | X = x] as a linear function '
                                           'beta_0 + beta_1 * x',
                                           'To minimize the correlation between x and y',
                                           'To make all residuals equal to 1.0'],
                            'question': 'What is the foundational statistical goal of simple linear regression?'},
                        {   'answer': 1,
                            'explanation': 'The Gauss-Markov theorem states OLS has minimum variance among all linear '
                                           'unbiased estimators when errors have mean 0, homoscedastic variance, and '
                                           'zero covariance.',
                            'options': [   'Errors must be normally distributed with variance 1',
                                           'Errors must have expectation zero, constant variance (homoscedasticity), '
                                           'and be uncorrelated',
                                           'Sample size must be greater than 1,000',
                                           'Predictor variables must be integers'],
                            'question': 'According to the Gauss-Markov Theorem, under which condition is the Ordinary '
                                        'Least Squares (OLS) estimator the Best Linear Unbiased Estimator (BLUE)?'}],
            'rCode': 'fit <- lm(c(2, 3, 5) ~ c(1, 2, 3))\ncoef(fit)',
            'shortTitle': 'The Essence of Linear Regression',
            'summary': 'Linear regression establishes a straight-line relationship between an independent feature X '
                       'and a dependent target Y by minimizing the vertical residuals.'},
    38: {   'bamIntuition': 'Imagine rotating the line on a pivot. As the slope changes, the sum of squared residuals '
                            'traces out a beautiful 3D bowl! The bottom of the bowl is where the residuals are '
                            'smallest. BAM!',
            'category': 'Regression & Linear Models',
            'duration': '9:10',
            'firstPrinciples': 'The loss function $J(\\beta_0, \\beta_1) = \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 '
                               'x_i)^2$ is a strictly convex quadratic form in $(\\beta_0, \\beta_1)$. Its Hessian '
                               'matrix $\\mathbf{H} = 2 \\begin{bmatrix} n & \\sum x_i \\\\ \\sum x_i & \\sum x_i^2 '
                               '\\end{bmatrix}$ is positive definite whenever at least two distinct $x$ values exist. '
                               'This guarantees that the loss surface is an elliptical paraboloid with a unique global '
                               'minimum.',
            'interactiveType': 'least_squares_line',
            'mathFormulas': [   {   'explanation': 'Convex paraboloid in parameter space.',
                                    'latex': 'J(\\boldsymbol{\\beta}) = (\\mathbf{y} - '
                                             '\\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - '
                                             '\\mathbf{X}\\boldsymbol{\\beta})',
                                    'name': 'Quadratic Loss Surface'},
                                {   'explanation': 'Condition for the gradient of the loss surface to equal zero.',
                                    'latex': '\\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta} = \\mathbf{X}^T '
                                             '\\mathbf{y}',
                                    'name': 'Normal Equations'}],
            'moduleId': 'module-10',
            'numericalExample': 'For data points (1, 1), (2, 3), (3, 2). Centering data: x_c = [-1, 0, +1], y_c = [-1, '
                                '+1, 0]. Slope beta1 = sum(x_c * y_c) / sum(x_c^2) = (1 + 0 + 0) / (1 + 0 + 1) = 0.5. '
                                'At beta1 = 0.5, SSR is minimized at 1.5. Any other slope (e.g. 0.0 or 1.0) produces '
                                'higher SSR.',
            'pitfalls': 'Assuming Least Squares is robust to extreme outliers. Squaring residuals means an outlier '
                        'with error 10 exerts 100x the influence of an error of 1, severely pulling the fitted line.',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          'x = np.array([1, 2, 3])\n'
                          'y = np.array([1, 3, 2])\n'
                          '# Evaluate SSR for various candidate slopes\n'
                          'for slope in [0.0, 0.5, 1.0]:\n'
                          '    pred = np.mean(y) + slope * (x - np.mean(x))\n'
                          '    ssr = np.sum((y - pred)**2)\n'
                          "    print(f'Slope: {slope:.1f} -> SSR: {ssr:.2f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because the objective is a quadratic function with positive definite '
                                           'Hessian, it forms a convex paraboloid bowl.',
                            'options': [   'A saddle point',
                                           'A convex paraboloid (bowl) with a unique minimum',
                                           'A flat plane',
                                           'A sphere'],
                            'question': 'What geometric shape does the OLS residual sum of squares form in parameter '
                                        'space (beta0, beta1)?'},
                        {   'answer': 1,
                            'explanation': 'OLS minimizes the sum of squared vertical deviations (residuals) between '
                                           'observed values y_i and model-predicted values y_hat_i.',
                            'options': [   'The sum of horizontal distances from points to the line',
                                           'The sum of squared vertical residuals: sum (y_i - (beta_0 + beta_1 * '
                                           'x_i))^2',
                                           'The maximum absolute vertical distance',
                                           'The product of slope and intercept'],
                            'question': 'What specific criterion does Ordinary Least Squares (OLS) minimize when '
                                        'fitting a line y = beta_0 + beta_1 * x?'},
                        {   'answer': 0,
                            'explanation': 'Setting partial derivatives of SS_res to zero yields beta_1 = sum((x_i - '
                                           'x_bar)(y_i - y_bar)) / sum((x_i - x_bar)^2) = Cov(X, Y) / Var(X).',
                            'options': [   'beta_1 = Cov(X, Y) / Var(X)',
                                           'beta_1 = Var(X) / Cov(X, Y)',
                                           'beta_1 = r * (s_x / s_y)',
                                           'beta_1 = Mean(Y) / Mean(X)'],
                            'question': 'What is the exact algebraic closed-form formula for the OLS slope coefficient '
                                        'beta_1 in simple linear regression?'}],
            'rCode': 'x <- c(1, 2, 3); y <- c(1, 3, 2)\nlm(y ~ x)',
            'shortTitle': 'Fitting a Line to Data (Least Squares)',
            'summary': 'Exploring the 3D loss surface of Least Squares and how rotating and shifting the line explores '
                       'the parabolic bowl of residual sums.'},
    39: {   'bamIntuition': "A straight line won't fit wiggly data! Loess slides a window across your data, fits a "
                            'tiny weighted line at each point where close neighbors get the most vote, and BAM: You '
                            'get a smooth, organic curve!',
            'category': 'Regression & Linear Models',
            'duration': '8:40',
            'firstPrinciples': 'LOWESS (Cleveland 1979) estimates $f(x)$ locally without assuming a global parametric '
                               'form. At target point $x_0$, it selects the $k = \\lfloor f \\cdot n \\rfloor$ nearest '
                               'neighbors where $f \\in (0, 1)$ is the span. Weights are assigned via the tricube '
                               'kernel: $w_i(x_0) = W\\left(\\frac{|x_i - x_0|}{\\Delta(x_0)}\\right)$, where $W(u) = '
                               '(1 - |u|^3)^3$ for $|u| < 1$, and 0 otherwise. A locally weighted polynomial '
                               'regression is solved: $\\min_{\\beta} \\sum w_i (y_i - \\beta_0 - \\beta_1(x_i - '
                               'x_0))^2$, and robustness weights are iteratively updated to downweight outliers.',
            'interactiveType': 'loess',
            'mathFormulas': [   {   'explanation': 'Smooth weight decaying to zero at the neighborhood boundary.',
                                    'latex': 'W(u) = \\begin{cases} (1 - |u|^3)^3 & \\text{for } |u| < 1 \\\\ 0 & '
                                             '\\text{for } |u| \\ge 1 \\end{cases}',
                                    'name': 'Tricube Kernel Weight'},
                                {   'explanation': 'Local weighted least squares solution at target query point x0.',
                                    'latex': '\\hat{\\boldsymbol{\\beta}}(x_0) = (\\mathbf{X}^T \\mathbf{W}(x_0) '
                                             '\\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{W}(x_0) \\mathbf{y}',
                                    'name': 'Weighted Local OLS'}],
            'moduleId': 'module-10',
            'numericalExample': 'Fitting a point at x0 = 5 with span containing points at x = [4, 5, 6]. Distance to '
                                'boundary = 2. For x = 5: u = 0, weight = (1 - 0)^3 = 1.0 (full weight). For x = 4: u '
                                '= 1/2 = 0.5, weight = (1 - 0.5^3)^3 = (1 - 0.125)^3 = (0.875)^3 = 0.67. Points '
                                'outside the window receive 0 weight.',
            'pitfalls': 'Overfitting with a span (frac) that is too small (tracing every random noise bump), or '
                        'oversmoothing with a span that is too large (flattening real peaks and troughs).',
            'pythonCode': 'from statsmodels.nonparametric.smoothers_lowess import lowess\n'
                          'import numpy as np\n'
                          '\n'
                          'x = np.linspace(0, 10, 50)\n'
                          'y = np.sin(x) + np.random.normal(0, 0.2, 50)\n'
                          'smoothed = lowess(y, x, frac=0.3)\n'
                          "print('First 3 smoothed points:', smoothed[:3, 1].round(3))",
            'quiz': [   {   'answer': 0,
                            'explanation': 'When frac -> 1.0, the local neighborhood includes the entire dataset, '
                                           'converging to standard global regression.',
                            'options': [   'The curve becomes identical to a global polynomial regression line',
                                           'The curve passes through every individual data point',
                                           'The algorithm divides by zero',
                                           'Weights become negative'],
                            'question': 'What happens in Loess smoothing when you set the span parameter frac very '
                                        'close to 1.0?'},
                        {   'answer': 1,
                            'explanation': 'LOESS fits local linear or quadratic regressions using a tri-cube kernel '
                                           'that gives higher weight to points closest to the target x-value.',
                            'options': [   'Linear Ordinary Error Summation System; fits global straight lines',
                                           'Locally Estimated Scatterplot Smoothing; fits weighted local polynomials '
                                           'to localized neighborhoods of points',
                                           'Low Energy Statistical Sampling; uses Monte Carlo integrals',
                                           'Logarithmic Exponential Smoothing System'],
                            'question': 'What does LOESS / LOWESS stand for, and how does it fit non-linear curves to '
                                        'data?'},
                        {   'answer': 0,
                            'explanation': 'The span controls the bias-variance tradeoff: larger span averages over '
                                           'more data (smoother, higher bias), while smaller span fits local '
                                           'fluctuations (wigglier, higher variance).',
                            'options': [   'Larger span creates a smoother curve with higher bias; smaller span '
                                           'creates a more flexible, wiggly curve with higher variance',
                                           'Larger span makes the curve more sensitive to noise',
                                           'Span has zero effect on the fit',
                                           'Smaller span forces the curve to be a straight line'],
                            'question': 'In LOESS smoothing, how does adjusting the span parameter alpha (the '
                                        'proportion of total points included in each local neighborhood) affect the '
                                        'curve?'}],
            'rCode': 'x <- seq(0, 10, length.out=50); y <- sin(x) + rnorm(50, 0, 0.2)\n'
                     'fit <- loess(y ~ x, span=0.3)\n'
                     "plot(x, y); lines(x, predict(fit), col='red', lwd=2)",
            'shortTitle': 'Lowess and Loess, Clearly Explained',
            'summary': 'Locally Weighted Scatterplot Smoothing (LOWESS) fits non-parametric curves to data by running '
                       'weighted regressions within local sliding windows.'},
    40: {   'bamIntuition': 'The slope is Covariance of X and Y divided by Variance of X! If X goes up by 1 unit, Y '
                            'changes by the slope. Test if the slope is significantly different from 0 with a t-test, '
                            'and BAM!',
            'category': 'Regression & Linear Models',
            'duration': '12:15',
            'firstPrinciples': 'Setting the gradient of $S = \\sum (y_i - \\beta_0 - \\beta_1 x_i)^2$ to zero yields '
                               'the closed-form estimators: $\\hat{\\beta}_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - '
                               '\\bar{y})}{\\sum (x_i - \\bar{x})^2} = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)} = r '
                               '\\frac{s_y}{s_x}$, and $\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}$. Under '
                               'Gauss-Markov assumptions, $\\hat{\\beta}_1$ is the Best Linear Unbiased Estimator '
                               '(BLUE). The sampling variance is $\\text{Var}(\\hat{\\beta}_1) = '
                               '\\frac{\\sigma^2}{\\sum (x_i - \\bar{x})^2}$, leading to test statistic $t = '
                               '\\frac{\\hat{\\beta}_1}{\\text{SE}(\\hat{\\beta}_1)} \\sim t_{n-2}$.',
            'interactiveType': 'regression_deep',
            'mathFormulas': [   {   'explanation': 'Ratio of sample covariance to variance of predictor.',
                                    'latex': '\\hat{\\beta}_1 = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - '
                                             '\\bar{y})}{\\sum_{i=1}^n (x_i - \\bar{x})^2} = r \\frac{s_y}{s_x}',
                                    'name': 'Slope Estimator'},
                                {   'explanation': 'Uncertainty of slope estimator based on residual standard error '
                                                   's_e.',
                                    'latex': '\\text{SE}(\\hat{\\beta}_1) = \\frac{s_e}{\\sqrt{\\sum_{i=1}^n (x_i - '
                                             '\\bar{x})^2}}',
                                    'name': 'Slope Standard Error'}],
            'moduleId': 'module-10',
            'numericalExample': 'Height (X) vs Weight (Y) for 5 people: sum(x - x_bar)^2 = 100, sum(x - x_bar)(y - '
                                'y_bar) = 250. Slope beta1 = 250 / 100 = 2.5 lbs per inch. If x_bar = 70 and y_bar = '
                                '160: beta0 = 160 - (2.5 * 70) = 160 - 175 = -15. Prediction for a 72-inch person: -15 '
                                '+ (2.5 * 72) = 165 lbs.',
            'pitfalls': 'Confusing confidence intervals for the regression line (mean response) with prediction '
                        'intervals for an individual new point (which must include individual residual variance '
                        '$\\sigma^2$ and is much wider).',
            'pythonCode': 'import statsmodels.api as sm\n'
                          'import numpy as np\n'
                          '\n'
                          'x = np.array([65, 68, 70, 72, 75])\n'
                          'y = np.array([145, 155, 160, 168, 175])\n'
                          'X = sm.add_constant(x)\n'
                          'model = sm.OLS(y, X).fit()\n'
                          'print(model.summary())',
            'quiz': [   {   'answer': 1,
                            'explanation': 'Slope scales the standardized correlation r by the ratio of the scales: '
                                           'beta1 = r * (s_y / s_x).',
                            'options': ['beta1 = r', 'beta1 = r * (s_y / s_x)', 'beta1 = r^2', 'beta1 = s_x / s_y'],
                            'question': 'What is the relationship between the slope beta1 of simple linear regression '
                                        "and Pearson's correlation r?"},
                        {   'answer': 1,
                            'explanation': 'The F-statistic compares Mean Square Model (explained variance) to Mean '
                                           'Square Residual (unexplained variance), testing H0: beta_1 = 0.',
                            'options': [   'H0: The intercept beta_0 = 0',
                                           'H0: The slope beta_1 = 0 (the model explains no more variance than the '
                                           'sample mean alone)',
                                           'H0: Residuals are not normally distributed',
                                           'H0: Sample size n is too small'],
                            'question': 'In an ANOVA table for simple linear regression, what null hypothesis does the '
                                        'overall model F-statistic test?'},
                        {   'answer': 1,
                            'explanation': 'In simple linear regression with 1 numerator degree of freedom, the square '
                                           "of the Student's t-statistic equals the F-statistic: F = t^2.",
                            'options': ['F = sqrt(t)', 'F = t^2', 'F = 2 * t', 'F = t / 2'],
                            'question': 'For a simple linear regression model with a single predictor, what is the '
                                        'exact mathematical relationship between the slope t-statistic and the model '
                                        'F-statistic?'}],
            'rCode': 'x <- c(65, 68, 70, 72, 75); y <- c(145, 155, 160, 168, 175)\nsummary(lm(y ~ x))',
            'shortTitle': 'Linear Regression, Clearly Explained',
            'summary': 'Full algebraic derivation of the OLS slope and intercept, hypothesis tests for coefficients, '
                       'and confidence and prediction intervals.'},
    41: {   'bamIntuition': 'Running lm(y ~ x) in R spits out a summary table. Learn how to read the four columns: '
                            'Estimate, Std. Error, t value, and Pr(>|t|), and BAM: You know if your predictor matters!',
            'category': 'Regression & Linear Models',
            'duration': '7:12',
            'firstPrinciples': 'In R, formulas use Wilkinson-Rogers notation `y ~ x`. The `summary.lm()` output '
                               'reports: 1. Residual percentiles; 2. Coefficients table with estimate '
                               '$\\hat{\\beta}_j$, standard error $\\text{SE}(\\hat{\\beta}_j) = \\sqrt{s^2 '
                               '(\\mathbf{X}^T\\mathbf{X})^{-1}_{jj}}$, $t = \\hat{\\beta}_j / \\text{SE}$, and '
                               'two-tailed p-value; 3. Residual standard error $s_e = '
                               '\\sqrt{\\frac{SS_{\\text{res}}}{n - p - 1}}$; 4. Multiple and Adjusted $R^2$; 5. '
                               'Global F-statistic $F = \\frac{SS_{\\text{reg}}/p}{SS_{\\text{res}}/(n - p - 1)}$.',
            'interactiveType': 'r_regression',
            'mathFormulas': [   {   'explanation': 'Tests whether all slope coefficients simultaneously equal zero.',
                                    'latex': 'F = \\frac{(SS_{\\text{tot}} - SS_{\\text{res}})/p}{SS_{\\text{res}} / '
                                             '(n - p - 1)}',
                                    'name': 'Overall F-Statistic'},
                                {   'explanation': 'Estimated standard deviation of the error term.',
                                    'latex': 's_e = \\sqrt{\\frac{\\sum e_i^2}{n - p - 1}}',
                                    'name': 'Residual Standard Error'}],
            'moduleId': 'module-10',
            'numericalExample': 'In R, fitting mouse weight on size: `fit <- lm(weight ~ size)`. Summary output: '
                                'Coefficients: (Intercept) = 0.93, size = 0.64 (p = 0.002). Multiple R-squared: 0.78, '
                                'F-statistic: 28.5 on 1 and 8 DF, p-value: 0.00067. The size coefficient is highly '
                                'significant.',
            'pitfalls': 'Interpreting the intercept p-value as evidence for or against the scientific hypothesis. The '
                        'intercept merely represents the baseline when X = 0, which may be outside the physical data '
                        'range.',
            'pythonCode': 'import statsmodels.formula.api as smf\n'
                          'import pandas as pd\n'
                          '\n'
                          "df = pd.DataFrame({'size': [1.2, 1.5, 2.0, 2.5, 3.1], 'weight': [1.8, 2.1, 2.9, 3.4, "
                          '4.2]})\n'
                          "model = smf.ols('weight ~ size', data=df).fit()\n"
                          'print(model.summary())',
            'quiz': [   {   'answer': 1,
                            'explanation': 'The global F-test evaluates H0: beta1 = beta2 = ... = betap = 0 against '
                                           'the alternative that at least one slope is non-zero.',
                            'options': [   'That the intercept is 0',
                                           'That ALL predictor slope coefficients are simultaneously equal to zero',
                                           'That the residuals are normal',
                                           'That R^2 = 1.0'],
                            'question': 'What null hypothesis does the F-statistic test in multiple linear '
                                        'regression?'},
                        {   'answer': 1,
                            'explanation': 'The `lm()` function (Linear Model) in base R fits linear models using '
                                           'formula syntax `response ~ predictor`.',
                            'options': [   '`regress(y ~ x)`',
                                           '`lm(y ~ x, data = df)`',
                                           '`fit.line(y, x)`',
                                           '`ols(y = x)`'],
                            'question': 'In R, what is the primary function used to fit an ordinary least squares '
                                        'linear regression model?'},
                        {   'answer': 1,
                            'explanation': 'The row for predictor x tests whether its coefficient significantly '
                                           'differs from zero using a two-tailed t-test.',
                            'options': [   'The probability that the intercept is positive',
                                           'The hypothesis test H0: beta_1 = 0 against H1: beta_1 != 0',
                                           'The normality of predictor x',
                                           'The proportion of missing values in the dataframe'],
                            'question': 'In the output of `summary(lm(y ~ x))`, what does the p-value associated with '
                                        'the `x` coefficient row evaluate?'}],
            'rCode': 'size <- c(1.2, 1.5, 2.0, 2.5, 3.1)\n'
                     'weight <- c(1.8, 2.1, 2.9, 3.4, 4.2)\n'
                     'fit <- lm(weight ~ size)\n'
                     'summary(fit)',
            'shortTitle': 'Linear Regression in R',
            'summary': "Mastering the syntax and output of R's lm() function: understanding coefficients, standard "
                       'errors, t-values, p-values, and the F-statistic.'},
    42: {   'bamIntuition': 'With two predictors (X1 and X2), your regression line becomes a 3D flat plane! The slope '
                            'for X1 tells you how Y changes when you freeze X2 in place! BAM: Multiple Regression!',
            'category': 'Regression & Linear Models',
            'duration': '10:30',
            'firstPrinciples': 'Multiple linear regression models the target as $y_i = \\beta_0 + \\sum_{j=1}^p '
                               '\\beta_j x_{ij} + \\epsilon_i$. In matrix notation: $\\mathbf{y} = '
                               '\\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$. The coefficient $\\beta_j$ '
                               'represents the *partial derivative* $\\frac{\\partial E[Y]}{\\partial X_j}$, measuring '
                               'the effect of a 1-unit increase in $X_j$ while *holding all other predictors constant* '
                               '(ceteris paribus). Multicollinearity occurs when columns of $\\mathbf{X}$ are linearly '
                               'dependent, causing $(\\mathbf{X}^T\\mathbf{X})$ to become ill-conditioned and '
                               'inflating coefficient variances.',
            'interactiveType': 'regression3d',
            'mathFormulas': [   {   'explanation': 'The analytic OLS solution for multiple regression.',
                                    'latex': '\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} '
                                             '\\mathbf{X}^T \\mathbf{y}',
                                    'name': 'Matrix Normal Equation'},
                                {   'explanation': 'Measures variance inflation of coefficient j caused by '
                                                   'collinearity with other features.',
                                    'latex': '\\text{VIF}_j = \\frac{1}{1 - R_j^2}',
                                    'name': 'Variance Inflation Factor (VIF)'}],
            'moduleId': 'module-10',
            'numericalExample': 'Predicting blood pressure (Y) from Age (X1) and Weight (X2): Fitted plane: Y = 80 + '
                                '0.5 * Age + 0.3 * Weight. For two people of the exact same weight, each additional '
                                'year of age increases predicted blood pressure by 0.5 mmHg.',
            'pitfalls': 'Interpreting regression coefficients causally when omitted variable bias is present '
                        '(confounding), or including highly correlated predictors (VIF > 10) causing wild coefficient '
                        'sign flips.',
            'pythonCode': 'import statsmodels.api as sm\n'
                          'import numpy as np\n'
                          '\n'
                          '# Simulating 3D regression\n'
                          'np.random.seed(42)\n'
                          'X = np.random.randn(100, 2)\n'
                          'y = 5 + 2.5 * X[:, 0] - 1.8 * X[:, 1] + np.random.randn(100) * 0.5\n'
                          'X_design = sm.add_constant(X)\n'
                          'fit = sm.OLS(y, X_design).fit()\n'
                          "print('Estimated Coefficients:', fit.params.round(3))",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Multiple regression coefficients represent partial effects, isolating the '
                                           'change in Y per unit increase in X1 while mathematically controlling for '
                                           'X2.',
                            'options': [   'The change in Y when X1 changes, ignoring X2',
                                           'The expected change in Y per unit change in X1, holding X2 constant',
                                           'The correlation between X1 and Y',
                                           'The intercept of X1'],
                            'question': 'What is the meaning of coefficient beta1 in the multiple regression Y = beta0 '
                                        '+ beta1*X1 + beta2*X2?'},
                        {   'answer': 1,
                            'explanation': 'Multiple regression coefficients are partial regression slopes: they '
                                           'measure the unique association of x_1 with y after adjusting for all other '
                                           'predictors.',
                            'options': [   'The total change in y as x_1 changes without regard to x_2',
                                           'The expected change in y per one-unit increase in x_1, HOLDING x_2 '
                                           'CONSTANT',
                                           'The correlation between x_1 and x_2',
                                           'The R-squared of x_1'],
                            'question': 'In the multiple regression model y = beta_0 + beta_1 * x_1 + beta_2 * x_2 + '
                                        'epsilon, what is the precise interpretation of beta_1?'},
                        {   'answer': 1,
                            'explanation': 'Multicollinearity occurs when predictors are correlated, inflating '
                                           'standard errors. VIF > 5 or 10 indicates severe multicollinearity.',
                            'options': [   'Non-normal errors; diagnosed by QQ plot',
                                           'High linear correlation among predictor variables; diagnosed by the '
                                           'Variance Inflation Factor (VIF)',
                                           'Heteroscedasticity; diagnosed by Breusch-Pagan test',
                                           "Outliers; diagnosed by Cook's distance"],
                            'question': 'What is multicollinearity in multiple regression, and what metric is '
                                        'standardly used to diagnose its severity?'}],
            'rCode': 'set.seed(42)\n'
                     'x1 <- rnorm(100); x2 <- rnorm(100)\n'
                     'y <- 5 + 2.5*x1 - 1.8*x2 + rnorm(100, 0, 0.5)\n'
                     'summary(lm(y ~ x1 + x2))',
            'shortTitle': 'Multiple Regression',
            'summary': 'Extending linear regression to two or more predictor variables, creating 3D planes or '
                       'multi-dimensional hyperplanes that isolate partial effects.'},
    43: {   'bamIntuition': 'Add predictors with plus signs: lm(y ~ x1 + x2). Compare the simple model to the big '
                            'model with anova(model1, model2). If p < 0.05, the extra variable earns its keep! BAM!',
            'category': 'Regression & Linear Models',
            'duration': '8:05',
            'firstPrinciples': 'Model comparison tests whether an expanded model with $p_2$ additional parameters '
                               'significantly improves fit over a nested reduced model with $p_1$ parameters: $H_0: '
                               '\\beta_{p_1+1} = \\dots = \\beta_{p_2} = 0$. The nested partial F-test statistic is $F '
                               '= \\frac{(SS_{\\text{res, reduced}} - SS_{\\text{res, full}}) / (p_2 - '
                               'p_1)}{SS_{\\text{res, full}} / (n - p_2 - 1)} \\sim F_{p_2 - p_1, n - p_2 - 1}$. In R, '
                               '`anova(fit_reduced, fit_full)` computes this partial F-test directly.',
            'interactiveType': 'multiple_r',
            'mathFormulas': [   {   'explanation': 'Evaluates whether adding variables significantly reduces '
                                                   'unexplained variance.',
                                    'latex': 'F = \\frac{(SS_{\\text{res, red}} - SS_{\\text{res, full}}) / \\Delta '
                                             'p}{SS_{\\text{res, full}} / df_{\\text{full}}}',
                                    'name': 'Partial F-Statistic'},
                                {   'explanation': 'Identifies influential observations that dramatically shift fitted '
                                                   'values.',
                                    'latex': 'D_i = \\frac{\\sum (\\hat{y}_j - \\hat{y}_{j(i)})^2}{p \\cdot s^2}',
                                    'name': "Cook's Distance (Leverage)"}],
            'moduleId': 'module-10',
            'numericalExample': 'Reduced model (lm(y ~ x1)) has SS_res = 120 (df = 28). Full model (lm(y ~ x1 + x2)) '
                                'has SS_res = 85 (df = 27). Extra parameter Delta p = 1. Numerator = (120 - 85)/1 = '
                                '35. Denominator = 85 / 27 = 3.15. F = 35 / 3.15 = 11.11 (p = 0.0025). Adding x2 '
                                'provides a statistically significant improvement.',
            'pitfalls': 'Comparing non-nested models with ANOVA. If model A uses x1 and model B uses x2, `anova(mA, '
                        'mB)` is invalid; use AIC or BIC instead.',
            'pythonCode': 'import statsmodels.api as sm\n'
                          'from statsmodels.formula.api import ols\n'
                          'import pandas as pd\n'
                          '\n'
                          "df = pd.DataFrame({'x1': [1,2,3,4,5,6], 'x2': [2,1,4,3,6,5], 'y': [3,4,6,7,9,10]})\n"
                          "m1 = ols('y ~ x1', data=df).fit()\n"
                          "m2 = ols('y ~ x1 + x2', data=df).fit()\n"
                          'print(sm.stats.anova_lm(m1, m2))',
            'quiz': [   {   'answer': 1,
                            'explanation': 'Partial F-tests through ANOVA require the smaller model to be a strict '
                                           'mathematical sub-model (nested) of the larger model.',
                            'options': [   'Any time you have two models',
                                           'Only when model 1 is strictly nested within model 2 (model 2 contains all '
                                           'predictors of model 1 plus extras)',
                                           'Only when R^2 > 0.9',
                                           'Only when data is discrete'],
                            'question': 'When can anova(model1, model2) be used to test whether adding variables '
                                        'significantly improves fit?'},
                        {   'answer': 1,
                            'explanation': 'In R formula notation, the asterisk `*` expands to main effects plus '
                                           'interactions: `x1 * x2` is equivalent to `x1 + x2 + x1:x2`.',
                            'options': [   'Only the interaction term x1:x2 without main effects',
                                           'The main effect of x1, the main effect of x2, AND the interaction term '
                                           'x1:x2',
                                           'Multiplication of x1 and x2 into a single column',
                                           'Division of x1 by x2'],
                            'question': 'In R formula syntax for multiple regression, what does the formula `y ~ x1 * '
                                        'x2` specify?'},
                        {   'answer': 1,
                            'explanation': 'Passing two nested `lm` models to `anova()` conducts a partial F-test '
                                           'comparing the reduction in residual sum of squares against added degrees '
                                           'of freedom.',
                            'options': [   '`compare(m1, m2)`',
                                           '`anova(model_reduced, model_full)`',
                                           '`t.test(m1, m2)`',
                                           '`summary(m1 - m2)`'],
                            'question': 'What function in R performs an F-test to compare two nested models (e.g. '
                                        'testing whether adding x2 and x3 significantly improves model fit)?'}],
            'rCode': 'df <- data.frame(x1=c(1,2,3,4,5,6), x2=c(2,1,4,3,6,5), y=c(3,4,6,7,9,10))\n'
                     'm1 <- lm(y ~ x1, data=df)\n'
                     'm2 <- lm(y ~ x1 + x2, data=df)\n'
                     'anova(m1, m2)',
            'shortTitle': 'Multiple Regression in R',
            'summary': 'Hands-on implementation of multiple regression in R, comparing models with ANOVA, evaluating '
                       'adjusted R-squared, and checking diagnostic plots.'},
    44: {   'bamIntuition': 'Mind blown! A two-sample t-test is literally just a linear regression line connecting two '
                            "points! ANOVA with 3 groups is just regression with two dummy variables! It's all the "
                            'same thing! BAM!',
            'category': 'Regression & Linear Models',
            'duration': '11:40',
            'firstPrinciples': 'Consider a two-sample t-test comparing Control and Treatment. Define indicator '
                               'variable $X_i = 1$ if treated, and $0$ if control. The linear regression model $Y_i = '
                               '\\beta_0 + \\beta_1 X_i + \\epsilon_i$ yields: For Control ($X=0$): $E[Y] = \\beta_0 = '
                               '\\mu_{\\text{control}}$. For Treatment ($X=1$): $E[Y] = \\beta_0 + \\beta_1 = '
                               '\\mu_{\\text{treatment}}$. Thus, the slope $\\beta_1 = \\mu_{\\text{treatment}} - '
                               '\\mu_{\\text{control}}$, and testing $\\beta_1 = 0$ is algebraically and numerically '
                               "identical to Student's two-sample t-test ($t = \\sqrt{F}$). For $k$ groups, $k-1$ "
                               'dummy variables reproduce one-way ANOVA exactly.',
            'interactiveType': 'linear_models_anova',
            'mathFormulas': [   {   'explanation': 'Linear model representing two group means via baseline and offset.',
                                    'latex': 'Y_i = \\beta_0 + \\beta_1 D_i + \\epsilon_i, \\quad D_i \\in \\{0, 1\\}',
                                    'name': 'Dummy Variable Regression'},
                                {   'explanation': 'The squared t-statistic from regression equals the ANOVA '
                                                   'F-statistic.',
                                    'latex': 't^2 = F = \\frac{MS_{\\text{between}}}{MS_{\\text{within}}}',
                                    'name': 't-test and ANOVA Equivalence'}],
            'moduleId': 'module-10',
            'numericalExample': 'Control: [10, 12, 14] (mean = 12). Treatment: [16, 18, 20] (mean = 18). Running a '
                                'two-sample t-test gives t = -3.67, p = 0.021. Running linear regression `lm(Y ~ '
                                'Group)` gives intercept beta0 = 12.0, slope beta1 = +6.0, t = 3.67, p = 0.021. The '
                                'results are mathematically identical to the last decimal place!',
            'pitfalls': 'Thinking you must memorize dozens of disparate statistical tests; once you understand linear '
                        'models, t-tests, ANOVA, ANCOVA, and regression are revealed as the exact same mathematical '
                        'engine.',
            'pythonCode': 'from scipy import stats\n'
                          'import statsmodels.formula.api as smf\n'
                          'import pandas as pd\n'
                          '\n'
                          'df = pd.DataFrame({\n'
                          "    'group': ['Control']*3 + ['Treat']*3,\n"
                          "    'val': [10, 12, 14, 16, 18, 20]\n"
                          '})\n'
                          "t_res = stats.ttest_ind(df[df.group=='Treat'].val, df[df.group=='Control'].val, "
                          'equal_var=True)\n'
                          "lm_res = smf.ols('val ~ group', data=df).fit()\n"
                          "print(f'T-test p-value: {t_res.pvalue:.4f}')\n"
                          'print(f\'Regression slope p-value: {lm_res.pvalues["group[T.Treat]"]:.4f}\')',
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because E[Y|Control] = beta0 and E[Y|Treatment] = beta0 + beta1, beta1 is '
                                           'exactly the mean difference between the two groups.',
                            'options': [   'The mean of the treatment group',
                                           'The difference in means between Treatment and Control (Treatment - '
                                           'Control)',
                                           'The correlation coefficient',
                                           'The sample size'],
                            'question': 'In the regression model Y = beta0 + beta1*Group (where Group is 0 for Control '
                                        'and 1 for Treatment), what does beta1 represent?'},
                        {   'answer': 0,
                            'explanation': 'A two-sample t-test is identical to a regression on a binary indicator: '
                                           'beta_0 is the mean of group 0, and beta_1 is the difference in means '
                                           'between groups.',
                            'options': [   'y = beta_0 + beta_1 * Group + epsilon, where Group is an indicator '
                                           'variable coded 0 or 1',
                                           'y = Group^2 + epsilon',
                                           'Group = beta_0 + beta_1 * y',
                                           'It cannot be represented as a linear model'],
                            'question': 'How can a standard independent two-sample t-test be equivalently framed as a '
                                        'general linear model?'},
                        {   'answer': 1,
                            'explanation': 'Under treatment coding, beta_0 is the expected value when all dummy '
                                           'indicators are 0 (the reference group mean), and slopes represent pairwise '
                                           'deviations from reference.',
                            'options': [   'The grand mean of all 3 groups combined',
                                           'The mean of the designated reference (baseline) group',
                                           'The difference between group 1 and group 2',
                                           'The standard deviation of group 1'],
                            'question': 'In a linear model representing a One-Way ANOVA with 3 groups using default '
                                        'treatment (dummy) coding, what does the intercept beta_0 represent?'}],
            'rCode': "df <- data.frame(group=rep(c('Control','Treat'), each=3), val=c(10,12,14, 16,18,20))\n"
                     "cat('t-test p:', t.test(val ~ group, data=df, var.equal=TRUE)$p.value, '\\n')\n"
                     "cat('lm p:    ', summary(lm(val ~ group, data=df))$coefficients[2, 4])",
            'shortTitle': 'Linear Models for t-tests and ANOVA',
            'summary': 'The Grand Unified Theory: t-tests and ANOVA are not separate algorithms; they are simply '
                       'ordinary linear regression with dummy (indicator) variables!'},
    45: {   'bamIntuition': "Behind every R or Python model formula lurks the Design Matrix X! It's a grid of 1s and "
                            '0s that turns complex categorical experiments into clean matrix algebra: Y = X * Beta! '
                            'BAM!',
            'category': 'Regression & Linear Models',
            'duration': '9:50',
            'firstPrinciples': 'In linear algebra, any linear model can be expressed as $\\mathbf{y} = '
                               '\\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$, where $\\mathbf{X} \\in '
                               '\\mathbb{R}^{n \\times p}$ is the design (model) matrix. The first column is typically '
                               'a vector of ones $\\mathbf{1}_n$ corresponding to the intercept $\\beta_0$. '
                               'Categorical factors with $k$ levels are converted using treatment coding (dummy '
                               'coding) into $k-1$ indicator columns, omitting the reference category to prevent '
                               'column collinearity and ensure $(\\mathbf{X}^T\\mathbf{X})$ is invertible.',
            'interactiveType': 'design_matrix',
            'mathFormulas': [   {   'explanation': 'Target vector equals Design Matrix times parameter vector plus '
                                                   'noise.',
                                    'latex': '\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}',
                                    'name': 'Linear Model Matrix Form'},
                                {   'explanation': 'Orthogonal projection operator onto the column space of X.',
                                    'latex': '\\mathbf{H} = \\mathbf{X}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T, '
                                             '\\quad \\hat{\\mathbf{y}} = \\mathbf{H}\\mathbf{y}',
                                    'name': 'Projection Hat Matrix'}],
            'moduleId': 'module-10',
            'numericalExample': 'Experiment with 3 groups (A, B, C) and 1 subject each. Treatment coding with A as '
                                'baseline: Column 1 (Intercept): [1, 1, 1]^T. Column 2 (Group B): [0, 1, 0]^T. Column '
                                '3 (Group C): [0, 0, 1]^T. For group A: [1, 0, 0] * beta = beta0. For group B: [1, 1, '
                                '0] * beta = beta0 + beta1. For group C: [1, 0, 1] * beta = beta0 + beta2.',
            'pitfalls': "Falling into the 'Dummy Variable Trap': creating $k$ dummy columns while ALSO including an "
                        'intercept column of 1s. The sum of the $k$ columns equals the intercept column, creating '
                        'perfect multicollinearity and making matrix inversion impossible.',
            'pythonCode': 'import patsy\n'
                          'import pandas as pd\n'
                          '\n'
                          "df = pd.DataFrame({'group': ['A', 'B', 'C', 'A', 'B']})\n"
                          "design_matrix = patsy.dmatrix('group', df)\n"
                          "print('Patsy Design Matrix:\\n', design_matrix)",
            'quiz': [   {   'answer': 1,
                            'explanation': 'Because the sum of all k dummies equals the column of 1s, the matrix '
                                           'columns are linearly dependent, making (X^T * X) singular and '
                                           'non-invertible.',
                            'options': [   'The model runs twice as fast',
                                           'The design matrix becomes rank-deficient (singular), causing the Dummy '
                                           'Variable Trap',
                                           'The R-squared becomes negative',
                                           'P-values are cut in half'],
                            'question': 'What happens if you include k dummy columns for a k-level categorical '
                                        'variable AND an intercept column of ones?'},
                        {   'answer': 1,
                            'explanation': 'A column of 1s ensures that when multiplied by the parameter vector beta, '
                                           'the first term produces the constant intercept beta_0.',
                            'options': [   'The values of the response variable Y',
                                           'A column of 1s (the intercept column)',
                                           'Random normal errors',
                                           'The index number of each observation'],
                            'question': 'In the matrix formulation of linear models Y = X*beta + epsilon, what does '
                                        'the first column of the design matrix X typically contain?'},
                        {   'answer': 0,
                            'explanation': 'If columns of X are linearly dependent (e.g. dummy variable trap or '
                                           'perfect multicollinearity), X^T X is singular and cannot be inverted.',
                            'options': [   'X must have full column rank (columns must be linearly independent so X^T '
                                           'X is invertible)',
                                           'X must be a square matrix',
                                           'All entries in X must be positive',
                                           'The determinant of X must be zero'],
                            'question': 'What mathematical condition must the design matrix X satisfy for the OLS '
                                        'normal equation solution beta_hat = (X^T X)^(-1) X^T Y to exist uniquely?'}],
            'rCode': "df <- data.frame(group=factor(c('A', 'B', 'C', 'A', 'B')))\nmodel.matrix(~ group, data=df)",
            'shortTitle': 'Design Matrices For Linear Models',
            'summary': 'How statistical software translates experimental formulas into design matrices (X) with '
                       'columns of 1s, continuous predictors, and dummy contrasts.'}}

