# scripts/curriculum_group1.py
"""
Pedagogical content for videos 1 to 15 with 3 questions each.
"""

GROUP_1 = {   1: {   'bamIntuition': 'Instead of staring at a raw spreadsheet of heights, stack blocks into bins! The taller the '
                           'pile, the more frequent the numbers in that range. BAM!',
           'category': 'Descriptive Statistics',
           'duration': '3:42',
           'firstPrinciples': 'A histogram partitions the domain into disjoint intervals $[b_k, b_{k+1})$. The count '
                              '$N_k = \\sum_{i=1}^n \\mathbf{1}_{x_i \\in [b_k, b_{k+1})}$ gives the raw frequency. '
                              'When normalized by total sample size $n$ and bin width $h$, the bar height represents '
                              'density: $\\hat{f}_n(x) = \\frac{N_k}{n \\cdot h}$. As sample size $n \\to \\infty$ and '
                              'bin width $h \\to 0$, the histogram converges to the true continuous probability '
                              'density function $f(x)$.',
           'interactiveType': 'histogram',
           'mathFormulas': [   {   'explanation': 'The number of observations that fall within bin interval k.',
                                   'latex': 'N_k = \\sum_{i=1}^n \\mathbf{1}_{\\{x_i \\in [b_k, b_{k+1})\\}}',
                                   'name': 'Bin Count'},
                               {   'explanation': 'Normalized height such that the sum of all bar areas equals 1.0.',
                                   'latex': '\\hat{f}(x) = \\frac{N_k}{n \\cdot h}',
                                   'name': 'Empirical Density'}],
           'moduleId': 'module-1',
           'numericalExample': 'Consider 10 weights (lbs): [150, 155, 158, 162, 165, 168, 172, 175, 179, 195]. For '
                               'bins of width 10 starting at 150: [150, 160) has 3; [160, 170) has 3; [170, 180) has '
                               '3; [180, 190) has 0; [190, 200) has 1 (an outlier).',
           'pitfalls': 'Never use bar charts for continuous data or histograms for discrete unordered categories. '
                       'Watch out for bin width sensitivity: too wide hides bimodal peaks; too narrow produces noisy '
                       'jagged spikes.',
           'pythonCode': 'import numpy as np\n'
                         'import matplotlib.pyplot as plt\n'
                         '\n'
                         'data = [150, 155, 158, 162, 165, 168, 172, 175, 179, 195]\n'
                         'counts, edges = np.histogram(data, bins=[150, 160, 170, 180, 190, 200])\n'
                         "print('Counts per bin:', counts)\n"
                         "print('Edges:', edges)",
           'quiz': [   {   'answer': 1,
                           'explanation': 'In a probability density histogram, area represents probability, so the '
                                          'total area must integrate to 1.0.',
                           'options': [   'Every bar must have equal width',
                                          'The sum of all bar areas must equal 1.0',
                                          'The highest bar must equal 1.0',
                                          'All frequencies must be prime'],
                           'question': 'What is the defining requirement for a probability density histogram?'},
                       {   'answer': 1,
                           'explanation': 'Doubling bin width h aggregates neighboring intervals: the number of bins '
                                          'roughly halves, while each bin captures roughly twice as many observations.',
                           'options': [   'Bin count doubles, counts per bin halve',
                                          'Bin count roughly halves, counts per bin roughly double',
                                          'Neither bin count nor counts change',
                                          'Both bin count and counts double'],
                           'question': 'If you double the bin width in a frequency histogram while keeping total '
                                       'sample size constant, what happens?'},
                       {   'answer': 1,
                           'explanation': 'Too narrow bins cause severe undersmoothing/overfitting: each bin has 0 or '
                                          '1 observation, obscuring the true population distribution.',
                           'options': [   'It violates total area normalization',
                                          'It creates high-variance noisy spikes reflecting random sampling noise '
                                          'rather than underlying population density',
                                          'It makes the sample mean mathematically undefined',
                                          'It converts continuous variables into nominal categories'],
                           'question': 'Why is a histogram with excessively narrow bin widths hazardous for '
                                       'statistical inference?'}],
           'rCode': 'weights <- c(150, 155, 158, 162, 165, 168, 172, 175, 179, 195)\n'
                    "hist(weights, breaks=seq(150, 200, by=10), col='skyblue', main='Weight Distribution')",
           'shortTitle': 'Histograms',
           'summary': 'Histograms group continuous numerical data into discrete bins along an axis to visualize sample '
                      'density, modality, skewness, and spread.'},
    2: {   'bamIntuition': 'A probability distribution is just a shape that shows where numbers love to congregate! '
                           'For continuous distributions, probability is area under the curve. BAM!',
           'category': 'Probability Distributions',
           'duration': '6:15',
           'firstPrinciples': 'Formally, a probability distribution assigns a measure $P: \\mathcal{F} \\to [0, 1]$ '
                              "satisfying Kolmogorov's axioms: $P(E) \\ge 0$, $P(\\Omega) = 1$, and countable "
                              'additivity. For continuous random variables, $P(X = x) = 0$ for every individual point. '
                              'Probabilities exist only over measurable intervals: $P(a \\le X \\le b) = \\int_a^b '
                              'f(x) dx$.',
           'interactiveType': 'pdf_cdf',
           'mathFormulas': [   {   'explanation': 'The total area under any probability density curve must equal '
                                                  'unity.',
                                   'latex': '\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1',
                                   'name': 'Total Integral'},
                               {   'explanation': 'CDF accumulates probability from negative infinity up to point x.',
                                   'latex': 'F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt',
                                   'name': 'Cumulative Distribution'}],
           'moduleId': 'module-2',
           'numericalExample': 'For a continuous uniform distribution on [10, 20], f(x) = 1/(20 - 10) = 0.1. The '
                               'probability of landing between 12 and 15 is: Area = (15 - 12) * 0.1 = 3 * 0.1 = 0.30 '
                               '(30%).',
           'pitfalls': 'Confusing density f(x) with probability. The density f(x) can easily exceed 1.0 (e.g. '
                       'Uniform[0, 0.1] has f(x) = 10 everywhere), but probabilities never exceed 1.0.',
           'pythonCode': 'from scipy import stats\n'
                         '\n'
                         'unif = stats.uniform(loc=10, scale=10)\n'
                         'prob = unif.cdf(15) - unif.cdf(12)\n'
                         "print(f'P(12 <= X <= 15) = {prob:.2f}')",
           'quiz': [   {   'answer': 1,
                           'explanation': 'Density has dimensions of 1/unit. As long as the integral over the domain '
                                          'equals 1, the instantaneous density height can be arbitrarily large.',
                           'options': [   'No, probabilities can never exceed 1',
                                          'Yes, because f(x) is density per unit, not probability itself',
                                          'Only if the mean is negative',
                                          'Only for discrete variables'],
                           'question': 'Can the probability density function f(x) of a continuous random variable be '
                                       'greater than 1?'},
                       {   'answer': 2,
                           'explanation': 'Continuous probability is defined as the integral over an interval. The '
                                          'integral of a single point is zero, even though density f(c) > 0.',
                           'options': ['f(c)', '1 / sigma', '0', '0.5'],
                           'question': 'For any continuous random variable X, what is the exact probability of '
                                       'observing an exact single real number, P(X = c)?'},
                       {   'answer': 1,
                           'explanation': 'A CDF accumulates probability measure from negative infinity to positive '
                                          'infinity, so it is monotonically non-decreasing from 0 to 1.',
                           'options': [   'It must be strictly periodic',
                                          'It must be non-decreasing with limit 0 at negative infinity and 1 at '
                                          'positive infinity',
                                          'Its derivative must be strictly constant',
                                          'It must be symmetric around zero'],
                           'question': 'Which fundamental property must every valid Cumulative Distribution Function '
                                       'F(x) satisfy?'}],
           'rCode': "prob <- punif(15, min=10, max=20) - punif(12, min=10, max=20)\ncat('Probability:', prob)",
           'shortTitle': 'Probability Distributions',
           'summary': 'Probability distributions are mathematical blueprints specifying the relative likelihood of '
                      'every possible event in a sample space.'},
    3: {   'bamIntuition': "It's the classic bell curve! The peak sits right on the mean mu, and the width is "
                           'controlled by sigma. Step 1, 2, or 3 sigmas away, and you capture 68%, 95%, and 99.7% of '
                           'the data! BAM!',
           'category': 'Probability Distributions',
           'duration': '5:12',
           'firstPrinciples': 'The Gaussian distribution $\\mathcal{N}(\\mu, \\sigma^2)$ is uniquely characterized as '
                              'the continuous distribution with maximum entropy for a given mean and variance. It '
                              'solves the diffusion equation $\\frac{\\partial u}{\\partial t} = \\frac{1}{2} '
                              '\\frac{\\partial^2 u}{\\partial x^2}$. Inflection points occur exactly at $x = \\mu '
                              '\\pm \\sigma$. The standardized Z-transform maps $X \\sim \\mathcal{N}(\\mu, '
                              '\\sigma^2)$ to $Z = (X - \\mu)/\\sigma \\sim \\mathcal{N}(0, 1)$.',
           'interactiveType': 'normal3d',
           'mathFormulas': [   {   'explanation': 'The normal curve equation parameterized by center mu and scale '
                                                  'sigma.',
                                   'latex': 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} '
                                            'e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}',
                                   'name': 'Gaussian PDF'},
                               {   'explanation': 'Exact cumulative mass within integer multiples of standard '
                                                  'deviation.',
                                   'latex': 'P(|X - \\mu| \\le k\\sigma) \\approx \\{68.3\\%, 95.5\\%, 99.7\\%\\} '
                                            '\\quad \\text{for } k=1, 2, 3',
                                   'name': 'Empirical Rule'}],
           'moduleId': 'module-2',
           'numericalExample': 'Suppose exam scores follow N(mu = 75, sigma = 10). A student scores 95. The Z-score is '
                               '(95 - 75)/10 = +2.0. The probability of scoring 95 or higher is 1 - Phi(2.0) = 1 - '
                               '0.9772 = 0.0228 (top 2.28%).',
           'pitfalls': "Assuming every bell-shaped distribution is Gaussian. The Student's t-distribution or Cauchy "
                       'distribution look bell-shaped but have heavy tails that produce far more extreme outliers.',
           'pythonCode': 'import numpy as np\n'
                         'from scipy import stats\n'
                         '\n'
                         'mu, sigma = 75, 10\n'
                         'z = (95 - mu) / sigma\n'
                         'p_val = 1 - stats.norm.cdf(z)\n'
                         "print(f'Z: {z}, P(X >= 95): {p_val:.4f}')",
           'quiz': [   {   'answer': 2,
                           'explanation': 'By the empirical 68-95-99.7 rule, approximately 95.45% of the probability '
                                          'mass falls within two standard deviations of the mean.',
                           'options': ['50%', '68.3%', '95.45%', '99.73%'],
                           'question': 'What percentage of normal distribution values lie between mu - 2*sigma and mu '
                                       '+ 2*sigma?'},
                       {   'answer': 1,
                           'explanation': "Setting the second derivative of the Gaussian PDF f''(x) = 0 yields (x - "
                                          'mu)^2 = sigma^2, placing inflection points at mu +/- sigma.',
                           'options': [   'At x = mu',
                                          'At x = mu +/- sigma',
                                          'At x = mu +/- 2*sigma',
                                          'At x = mu +/- 3*sigma'],
                           'question': 'At which exact x-axis locations do the inflection points of the normal '
                                       'probability density curve occur?'},
                       {   'answer': 1,
                           'explanation': 'Expected values subtract: 100 - 50 = 50. For independent random variables, '
                                          'variances ALWAYS add: Var(X - Y) = Var(X) + Var(Y) = 25 + 16 = 41.',
                           'options': ['N(50, 9)', 'N(50, 41)', 'N(50, sqrt(41))', 'N(150, 41)'],
                           'question': 'If X ~ N(100, 25) and Y ~ N(50, 16) are independent, what is the distribution '
                                       'of W = X - Y?'}],
           'rCode': 'mu <- 75; sigma <- 10\n'
                    'z <- (95 - mu) / sigma\n'
                    'p_val <- 1 - pnorm(95, mean=mu, sd=sigma)\n'
                    "cat('Tail probability:', p_val)",
           'shortTitle': 'The Normal Distribution',
           'summary': 'The symmetric bell curve parameterized by mean mu and standard deviation sigma, central to '
                      'statistical inference and the Central Limit Theorem.'},
    4: {   'bamIntuition': 'The mean is pulled like a magnet toward crazy outliers. The median sits peacefully in the '
                           "middle and doesn't flinch. Mode is just the most common crowd favorite. BAM!",
           'category': 'Descriptive Statistics',
           'duration': '4:48',
           'firstPrinciples': 'The mean minimizes expected squared Euclidean loss: $\\mu = \\arg\\min_c E[(X - c)^2]$. '
                              'The median minimizes absolute loss: $M = \\arg\\min_c E[|X - c|]$, which gives it a '
                              'breakdown point of 50% (half the data must be corrupted to ruin it, whereas a single '
                              'infinity ruins the mean). Mode maximizes density $\\arg\\max f(x)$.',
           'interactiveType': 'central_tendency',
           'mathFormulas': [   {   'explanation': 'Arithmetic average minimizing sum of squared errors.',
                                   'latex': '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i',
                                   'name': 'Sample Mean'},
                               {   'explanation': 'Middle value of ordered sample data.',
                                   'latex': '\\tilde{x} = \\begin{cases} x_{(\\frac{n+1}{2})} & n \\text{ odd} \\\\ '
                                            '\\frac{1}{2}(x_{(\\frac{n}{2})} + x_{(\\frac{n}{2}+1)}) & n \\text{ even} '
                                            '\\end{cases}',
                                   'name': 'Sample Median'}],
           'moduleId': 'module-1',
           'numericalExample': 'Home values on a street: [$200k, $220k, $230k, $250k, $5,000,000]. Median = $230k '
                               '(representative of the neighborhood). Mean = $1,180,000 (meaningless for prospective '
                               'home buyers).',
           'pitfalls': 'Using the arithmetic mean to describe heavily skewed data (wealth, house prices, web traffic '
                       'latency).',
           'pythonCode': 'import numpy as np\n'
                         '\n'
                         'houses = [200, 220, 230, 250, 5000]\n'
                         "print('Mean:', np.mean(houses))\n"
                         "print('Median:', np.median(houses))",
           'quiz': [   {   'answer': 1,
                           'explanation': 'Taking the derivative of sum((x_i - c)^2) with respect to c and setting it '
                                          'to 0 yields c = (1/n)*sum(x_i).',
                           'options': [   'Sum of absolute errors (L1)',
                                          'Sum of squared errors (L2)',
                                          'Maximum error (L-infinity)',
                                          'Zero-one loss'],
                           'question': 'Which loss function does the sample mean minimize?'},
                       {   'answer': 1,
                           'explanation': 'Right-skewed outliers pull the arithmetic mean to the right. The mode '
                                          'remains at the peak, and the median sits between them: Mode < Median < '
                                          'Mean.',
                           'options': [   'Mean < Median < Mode',
                                          'Mode < Median < Mean',
                                          'Median < Mode < Mean',
                                          'Mean = Median = Mode'],
                           'question': 'In a distribution that is heavily right-skewed (such as household income), '
                                       'what is the typical ordering of central tendency measures?'},
                       {   'answer': 1,
                           'explanation': 'The median has a 50% breakdown point, meaning over half of the observations '
                                          'must be corrupted to force the median to an arbitrary extreme.',
                           'options': [   '0%: a single extreme outlier corrupts it',
                                          '50%: up to half the sample can be arbitrarily corrupted without driving the '
                                          'median to infinity',
                                          '100%: it is mathematically impossible to change',
                                          'Equal to 1/n'],
                           'question': 'What is the breakdown point of the sample median, and what does it signify?'}],
           'rCode': "houses <- c(200, 220, 230, 250, 5000)\ncat('Mean:', mean(houses), 'Median:', median(houses))",
           'shortTitle': 'Mean, Median & Mode',
           'summary': 'Comparing three measures of central tendency, their mathematical optimization objectives, and '
                      'their behavior under skewed distributions.'},
    5: {   'bamIntuition': 'Waiting for the next radioactive decay or server request? Most waits are short, but every '
                           "once in a while you wait forever! And the best part: the process doesn't remember how long "
                           "you've already waited. BAM!",
           'category': 'Probability Distributions',
           'duration': '7:22',
           'firstPrinciples': 'If events arrive independently according to a Poisson process with constant intensity '
                              '$\\lambda$, the count in interval $t$ is $N_t \\sim \\text{Poisson}(\\lambda t)$. The '
                              'waiting time $T$ until the first event exceeds $t$ if and only if $N_t = 0$: $P(T > t) '
                              '= P(N_t = 0) = \\frac{(\\lambda t)^0 e^{-\\lambda t}}{0!} = e^{-\\lambda t}$. '
                              'Differentiating $F(t) = 1 - e^{-\\lambda t}$ yields $f(t) = \\lambda e^{-\\lambda t}$. '
                              'The memoryless property $P(T > s + t \\mid T > s) = '
                              '\\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t} = P(T > t)$.',
           'interactiveType': 'exponential',
           'mathFormulas': [   {   'explanation': 'Rate parameter lambda controls how steeply the density decays.',
                                   'latex': 'f(x) = \\lambda e^{-\\lambda x}, \\quad x \\ge 0',
                                   'name': 'Exponential Density'},
                               {   'explanation': 'Probability of waiting longer than time t.',
                                   'latex': 'S(t) = P(T > t) = e^{-\\lambda t}',
                                   'name': 'Survival Function'}],
           'moduleId': 'module-2',
           'numericalExample': 'Bus arrivals follow an exponential distribution with lambda = 0.1 buses/min (mean wait '
                               '= 10 min). What is the probability you wait more than 15 minutes? S(15) = e^(-0.1 * '
                               '15) = e^(-1.5) = 0.2231 (22.3%).',
           'pitfalls': 'Applying exponential waiting times to systems with wear-and-tear or fatigue (like car tires), '
                       'where hazard rates increase over time and memorylessness fails.',
           'pythonCode': 'from scipy import stats\n'
                         'import numpy as np\n'
                         '\n'
                         'rate = 0.1\n'
                         'p_wait = stats.expon.sf(15, scale=1/rate)\n'
                         "print(f'Probability of waiting > 15 min: {p_wait:.4f}')",
           'quiz': [   {   'answer': 1,
                           'explanation': 'For an exponential distribution, the expected value is 1/lambda, and the '
                                          'variance is 1/(lambda^2).',
                           'options': ['1 / lambda', '1 / (lambda^2)', 'lambda', 'lambda^2'],
                           'question': 'What is the variance of an exponential random variable with rate lambda?'},
                       {   'answer': 0,
                           'explanation': 'Memorylessness means the probability of waiting an additional t minutes '
                                          'given you have already waited s minutes is identical to starting fresh: P(T '
                                          '> s + t | T > s) = P(T > t).',
                           'options': [   'P(T > s + t | T > s) = P(T > t)',
                                          'P(T < s + t) = P(T < s) * P(T < t)',
                                          'The mean equals the median',
                                          'The variance is zero'],
                           'question': 'What does the memoryless property of the exponential distribution '
                                       'mathematically state?'},
                       {   'answer': 1,
                           'explanation': 'For an exponential waiting time with rate lambda = 4 calls/hour, the '
                                          'expected value is 1/lambda = 1/4 hour = 15 minutes.',
                           'options': ['4 hours', '0.25 hours (15 minutes)', '1 hour', '16 hours'],
                           'question': 'If phone calls arrive at a call center at an average rate of 4 calls per hour '
                                       '(Poisson process), what is the expected waiting time until the next call?'}],
           'rCode': "rate <- 0.1\np_wait <- 1 - pexp(15, rate=rate)\ncat('Probability:', p_wait)",
           'shortTitle': 'The Exponential Distribution',
           'summary': 'Describes continuous waiting times between Poisson events, possessing the remarkable and unique '
                      'memoryless property.'},
    6: {   'bamIntuition': 'Greek letters (mu, sigma) are the holy truth about the entire universe of data that you '
                           'can almost never observe. Latin letters (x-bar, s) are your best estimates based on the '
                           'small sample you have in your hand. BAM!',
           'category': 'Parameters, Samples & Spread',
           'duration': '4:15',
           'firstPrinciples': 'A population is an underlying data-generating distribution $F_\\theta$. The parameter '
                              '$\\theta \\in \\Theta$ is fixed and deterministic in frequentist statistics. A sample '
                              '$(X_1, \\dots, X_n)$ yields an estimator $\\hat{\\theta} = g(X_1, \\dots, X_n)$, which '
                              'is itself a random variable with a sampling distribution. An estimator is unbiased if '
                              '$E[\\hat{\\theta}] = \\theta$, and consistent if $\\text{plim}_{n \\to \\infty} '
                              '\\hat{\\theta} = \\theta$.',
           'interactiveType': 'pop_vs_sample',
           'mathFormulas': [   {   'explanation': 'Population mean mu vs sample mean estimator x-bar.',
                                   'latex': '\\mu = E[X] \\quad \\longleftrightarrow \\quad \\bar{x} = '
                                            '\\frac{1}{n}\\sum_{i=1}^n x_i',
                                   'name': 'Population vs Sample Mean'},
                               {   'explanation': 'The expected value of the estimator across repeated sampling equals '
                                                  'the true parameter.',
                                   'latex': 'E[\\hat{\\theta}] = \\theta',
                                   'name': 'Unbiasedness Condition'}],
           'moduleId': 'module-3',
           'numericalExample': 'Suppose all 1,000,000 fish in a lake have true average length mu = 12.4 inches. You '
                               'catch 20 fish and calculate x-bar = 12.1 inches. mu is fixed and unknown; x-bar is '
                               'your random sample estimate.',
           'pitfalls': 'Confusing the sample mean with the population mean, or writing mu when referring to an '
                       'empirical sample calculation.',
           'pythonCode': 'import numpy as np\n'
                         '\n'
                         '# True population: 10,000 values with mean 12.4\n'
                         'true_population = np.random.normal(loc=12.4, scale=2.0, size=10000)\n'
                         'sample = np.random.choice(true_population, size=25, replace=False)\n'
                         "print(f'True Population Mean (mu): {np.mean(true_population):.2f}')\n"
                         "print(f'Sample Estimate (x-bar): {np.mean(sample):.2f}')",
           'quiz': [   {   'answer': 0,
                           'explanation': 'Standard statistical convention uses Greek letters (mu, sigma, beta) for '
                                          'population parameters and Latin letters (x-bar, s, b) for sample estimates.',
                           'options': [   'Greek for population, Latin for sample',
                                          'Latin for population, Greek for sample',
                                          'Hebrew for population, Latin for sample',
                                          'Upper case for population, lower case for sample'],
                           'question': 'Which letter convention denotes true population parameters versus sample '
                                       'statistics?'},
                       {   'answer': 1,
                           'explanation': 'Population parameters (mu, sigma) are fixed population constants, whereas '
                                          'sample statistics (x-bar, s) are random variables that vary from sample to '
                                          'sample.',
                           'options': [   'It is purely historical convention with no conceptual distinction',
                                          'Greek letters represent fixed, unobservable ground truths; Roman letters '
                                          'represent sample statistics computed from data',
                                          'Greek letters denote biased estimates; Roman letters denote unbiased '
                                          'estimates',
                                          'Roman letters are reserved for discrete variables only'],
                           'question': 'Why are Greek letters (mu, sigma) conventionally used for population '
                                       'parameters and Roman letters (x-bar, s) for sample estimates?'},
                       {   'answer': 1,
                           'explanation': 'By the Weak and Strong Laws of Large Numbers, the sample mean converges in '
                                          'probability and almost surely to the population parameter mu as n -> '
                                          'infinity.',
                           'options': [   'The difference increases proportionally to sqrt(n)',
                                          'The difference approaches 0 in probability by the Law of Large Numbers',
                                          'The difference approaches 1.96',
                                          'The variance of the estimate increases'],
                           'question': 'What happens to the difference between the sample estimate x-bar and the true '
                                       'population parameter mu as sample size n grows toward infinity?'}],
           'rCode': 'pop <- rnorm(10000, mean=12.4, sd=2)\n'
                    'sample <- sample(pop, 25)\n'
                    "cat('True mu:', mean(pop), 'Sample x-bar:', mean(sample))",
           'shortTitle': 'Population vs Estimated Parameters',
           'summary': 'Distinguishing between true unobservable population parameters (Greek letters) and sample '
                      'estimates calculated from finite data (Latin letters).'},
    7: {   'bamIntuition': "Subtract the mean from each number to find the deviation. Square them so negatives don't "
                           'cancel positives! Average them to get Variance. Take the square root to get Standard '
                           'Deviation back in real units! BAM!',
           'category': 'Parameters, Samples & Spread',
           'duration': '8:35',
           'firstPrinciples': 'Variance measures the dispersion of a random variable around its mean: $\\text{Var}(X) '
                              '= E[(X - \\mu)^2] = E[X^2] - (E[X])^2$. In a sample, deviations $(x_i - \\bar{x})$ '
                              'satisfy $\\sum_{i=1}^n (x_i - \\bar{x}) = 0$, consuming one degree of freedom. Dividing '
                              "by $n-1$ (Bessel's correction) yields an unbiased estimator: $E[s^2] = \\sigma^2$. The "
                              'standard deviation $s = \\sqrt{s^2}$ restores the original dimension of the data.',
           'interactiveType': 'variance_calc',
           'mathFormulas': [   {   'explanation': "Unbiased estimator of population variance using Bessel's "
                                                  'correction.',
                                   'latex': 's^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2',
                                   'name': 'Sample Variance'},
                               {   'explanation': 'Square root of variance in the original measurement units.',
                                   'latex': 's = \\sqrt{s^2} = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}',
                                   'name': 'Sample Standard Deviation'}],
           'moduleId': 'module-3',
           'numericalExample': 'Dataset: [2, 4, 4, 4, 5, 5, 7, 9]. n = 8. Sum = 40. Mean = 40/8 = 5. Deviations: [-3, '
                               '-1, -1, -1, 0, 0, +2, +4]. Squared deviations: [9, 1, 1, 1, 0, 0, 4, 16]. Sum of '
                               'squares = 32. Variance s^2 = 32 / (8 - 1) = 32 / 7 = 4.57. Standard deviation s = '
                               'sqrt(4.57) = 2.14.',
           'pitfalls': 'Forgetting that `np.var()` in NumPy defaults to ddof=0 (population formula dividing by N). '
                       'Always specify `ddof=1` for sample variance!',
           'pythonCode': 'import numpy as np\n'
                         '\n'
                         'data = np.array([2, 4, 4, 4, 5, 5, 7, 9])\n'
                         'mean = np.mean(data)\n'
                         'var = np.var(data, ddof=1)  # ddof=1 for n-1\n'
                         'sd = np.std(data, ddof=1)\n'
                         "print(f'Mean: {mean}, Variance: {var:.2f}, SD: {sd:.2f}')",
           'quiz': [   {   'answer': 1,
                           'explanation': 'Because variance squares the units (e.g. dollars squared, inches squared), '
                                          'taking the square root restores the original units (dollars, inches).',
                           'options': [   'To make the value smaller',
                                          'To return the spread metric to the original units of the data',
                                          'To remove negative numbers',
                                          'Because variance cannot be plotted'],
                           'question': 'Why do we take the square root of the variance to get standard deviation?'},
                       {   'answer': 0,
                           'explanation': 'By definition of the arithmetic mean, sum(x_i - x-bar) = sum(x_i) - '
                                          'n*(1/n*sum(x_i)) = 0. Squaring eliminates sign cancellation and penalizes '
                                          'large errors.',
                           'options': [   'Because raw deviations always sum to zero, canceling positive and negative '
                                          'distances',
                                          'Because squaring makes the variance scale in linear units',
                                          'Because negative numbers cannot be represented on computers',
                                          'Because square roots are computationally impossible'],
                           'question': 'Why do we square deviations (x_i - x-bar) when computing variance instead of '
                                       'simply averaging raw deviations?'},
                       {   'answer': 1,
                           'explanation': 'Scaling by c scales standard deviation by |c| = 3 and scales variance by '
                                          'c^2 = 9.',
                           'options': [   'SD multiplied by 3, variance multiplied by 3',
                                          'SD multiplied by 3, variance multiplied by 9',
                                          'SD multiplied by 9, variance multiplied by 3',
                                          'Neither changes'],
                           'question': 'If you multiply every observation in a dataset by a constant factor c = 3, how '
                                       'do the standard deviation and variance change?'}],
           'rCode': "data <- c(2, 4, 4, 4, 5, 5, 7, 9)\ncat('Mean:', mean(data), 'Var:', var(data), 'SD:', sd(data))",
           'shortTitle': 'Mean, Variance & Standard Deviation',
           'summary': 'Computing the arithmetic mean, sum of squared deviations, variance, and standard deviation to '
                      'quantify variability in original measurement units.'},
    8: {   'bamIntuition': 'All models are approximations of the messy real world! A straight line, a bell curve, or a '
                           "coin toss formula doesn't capture every atom—it captures the dominant pattern so we can "
                           'make smart decisions. BAM!',
           'category': 'Hypothesis Testing & P-Values',
           'duration': '4:50',
           'firstPrinciples': 'Formally, a statistical model is a family of probability distributions $\\mathcal{P} = '
                              '\\{P_\\theta : \\theta \\in \\Theta\\}$ defined on sample space $\\mathcal{X}$. As '
                              "George Box famously declared: 'All models are wrong, but some are useful.' A model "
                              'introduces structural inductive biases (e.g. linearity, independence, normality) to '
                              'convert high-dimensional noisy data into low-dimensional interpretable representations.',
           'interactiveType': 'math_model',
           'mathFormulas': [   {   'explanation': 'Deterministic structural signal plus stochastic noise term.',
                                   'latex': 'Y = f(X; \\theta) + \\epsilon, \\quad \\epsilon \\sim \\mathcal{D}(0, '
                                            '\\sigma^2)',
                                   'name': 'General Model Form'},
                               {   'explanation': 'Balances model goodness of fit with penalty for number of '
                                                  'parameters k.',
                                   'latex': '\\text{AIC} = 2k - 2\\ln(\\hat{L})',
                                   'name': "Occam's Parsimony (AIC)"}],
           'moduleId': 'module-5',
           'numericalExample': 'Predicting mouse weight from tail length. Model 1: Weight = 10 + 2 * (Tail Length). '
                               'Mouse with 5cm tail predicted weight = 20g. If actual weight is 21g, error epsilon = '
                               '+1g.',
           'pitfalls': 'Mistaking the mathematical model for absolute physical reality (reification fallacy), or '
                       'creating overly complex models that overfit noise.',
           'pythonCode': 'import numpy as np\n'
                         '\n'
                         'def model(tail_length, beta0=10, beta1=2):\n'
                         '    return beta0 + beta1 * tail_length\n'
                         '\n'
                         'pred = model(5)\n'
                         "print(f'Predicted weight for 5cm tail: {pred}g')",
           'quiz': [   {   'answer': 1,
                           'explanation': 'Simple models risk high bias (underfitting), whereas overly intricate '
                                          'models suffer from high variance (overfitting noise).',
                           'options': [   'Speed vs programming language',
                                          'Bias vs Variance (overfitting vs underfitting)',
                                          'Mean vs Median',
                                          'Alpha vs Beta'],
                           'question': 'What is the primary trade-off in statistical model building?'},
                       {   'answer': 1,
                           'explanation': "As George Box famously noted, 'All models are wrong, but some are useful.' "
                                          'A model abstracts complex realities into tractable predictive structures.',
                           'options': [   'To replicate every microscopic detail of reality without simplification',
                                          'To provide a useful abstraction that captures essential relationships while '
                                          'discarding uninformative noise',
                                          'To ensure that all p-values are less than 0.05',
                                          'To eliminate the need for empirical data collection'],
                           'question': 'What is the primary philosophical purpose of a statistical or mathematical '
                                       'model?'},
                       {   'answer': 1,
                           'explanation': 'The residual term epsilon captures all variation in y that cannot be '
                                          'explained by the linear predictor beta_0 + beta_1 * x.',
                           'options': [   'Systematic computational errors by the computer',
                                          'Unmeasured covariates, measurement noise, and inherent stochastic variation',
                                          'The degrees of freedom of the intercept',
                                          'The slope of the regression line'],
                           'question': 'In the linear model y = beta_0 + beta_1 * x + epsilon, what does the error '
                                       'term epsilon account for?'}],
           'rCode': "model <- function(tail_len) 10 + 2 * tail_len\ncat('Predicted weight:', model(5))",
           'shortTitle': 'What is a Mathematical Model?',
           'summary': 'A mathematical model is a deliberate simplification of reality used to approximate mechanisms, '
                      'test hypotheses, and generate predictions.'},
    9: {   'bamIntuition': "The Null Hypothesis is the skeptical grinch saying: 'Nothing interesting is happening "
                           "here! Any difference is just random dumb luck!' To claim a discovery, you must prove the "
                           'grinch is wildly improbable. BAM!',
           'category': 'Hypothesis Testing & P-Values',
           'duration': '7:10',
           'firstPrinciples': 'Hypothesis testing formulates two mutually exclusive states: $H_0: \\theta \\in '
                              '\\Theta_0$ (null hypothesis: no effect, equality) versus $H_1: \\theta \\in \\Theta_1$ '
                              '(alternative hypothesis: an effect exists). The test constructs a test statistic $T(X)$ '
                              'with a known null distribution $P(T \\mid H_0)$. If the observed statistic '
                              '$T_{\\text{obs}}$ falls in the critical rejection region $\\mathcal{R}_\\alpha = \\{t : '
                              'P(T \\in \\mathcal{R}_\\alpha \\mid H_0) = \\alpha\\}$, we reject $H_0$. Crucially, '
                              'failing to reject $H_0$ never proves $H_0$ is true—absence of evidence is not evidence '
                              'of absence.',
           'interactiveType': 'null_hypothesis',
           'mathFormulas': [   {   'explanation': 'The baseline null of no treatment effect versus the two-sided '
                                                  'alternative.',
                                   'latex': 'H_0: \\mu_1 = \\mu_2 \\quad \\text{vs} \\quad H_1: \\mu_1 \\ne \\mu_2',
                                   'name': 'Null & Alternative Form'},
                               {   'explanation': 'The significance level: probability of a false positive discovery.',
                                   'latex': '\\alpha = P(\\text{Reject } H_0 \\mid H_0 \\text{ is true})',
                                   'name': 'Type I Error Rate'}],
           'moduleId': 'module-5',
           'numericalExample': 'Testing a new blood pressure drug. H0: Mean reduction = 0 mmHg. H1: Mean reduction > 0 '
                               'mmHg. In a trial of 100 patients, the average reduction is 8 mmHg with SE = 2 mmHg. '
                               'Test statistic Z = (8 - 0)/2 = 4.0. The probability of seeing a Z >= 4.0 by pure '
                               'chance under H0 is less than 0.0001.',
           'pitfalls': "Believing that 'failing to reject H0' proves that the groups are identical. A small sample "
                       'with low power can fail to detect even a massive real difference.',
           'pythonCode': 'from scipy import stats\n'
                         '\n'
                         '# Blood pressure reductions in treated group vs null (0)\n'
                         'reductions = [8, 6, 9, 12, 7, 5, 10, 8, 11, 4]\n'
                         't_stat, p_val = stats.ttest_1samp(reductions, popmean=0)\n'
                         "print(f'T-statistic: {t_stat:.2f}, p-value: {p_val:.6f}')",
           'quiz': [   {   'answer': 1,
                           'explanation': 'Hypothesis testing can only reject or fail to reject; it can never prove '
                                          'that H0 is exactly true.',
                           'options': [   'We have proved the null hypothesis is true',
                                          'We do not have sufficient evidence from our sample to rule out random '
                                          'chance',
                                          'The alternative hypothesis is false',
                                          'The experiment was done incorrectly'],
                           'question': "What does 'failing to reject the null hypothesis' strictly mean?"},
                       {   'answer': 1,
                           'explanation': 'H0 provides the baseline assumption from which the null sampling '
                                          'distribution is derived to determine how unexpected the observed data would '
                                          'be by chance alone.',
                           'options': [   'It is the hypothesis the researcher hopes to prove true',
                                          "It acts as the skeptical baseline of 'no effect' or 'no difference' used to "
                                          'construct the reference null distribution',
                                          'It guarantees that the alternative hypothesis is mathematically false',
                                          'It sets the sample size of the experiment'],
                           'question': 'What is the specific role of the Null Hypothesis (H0) in classical '
                                       'Neyman-Pearson hypothesis testing?'},
                       {   'answer': 1,
                           'explanation': 'Absence of evidence is not evidence of absence. Failing to reject H0 simply '
                                          'means the observed data are consistent with random sampling variability '
                                          'under H0.',
                           'options': [   'The null hypothesis has been proven true beyond doubt',
                                          'There is insufficient evidence in this sample to reject the null hypothesis '
                                          'at significance level alpha',
                                          'The alternative hypothesis is impossible',
                                          'The experiment had zero measurement error'],
                           'question': 'Failing to reject the null hypothesis (p >= alpha) mathematically implies '
                                       'which of the following?'}],
           'rCode': 'reductions <- c(8, 6, 9, 12, 7, 5, 10, 8, 11, 4)\nt.test(reductions, mu=0)',
           'shortTitle': 'Hypothesis Testing & The Null Hypothesis',
           'summary': 'Hypothesis testing establishes a skeptical baseline (Null Hypothesis H0) and evaluates whether '
                      'observed data provides sufficient evidence to reject it.'},
    10: {   'bamIntuition': "The alternative hypothesis is what you're hoping to prove! If you care whether a drug is "
                            "better OR worse, split your doubt into two tails. If you only care if it's strictly "
                            'better, put all your chips on one tail. BAM!',
            'category': 'Hypothesis Testing & P-Values',
            'duration': '5:30',
            'firstPrinciples': 'The alternative hypothesis $H_1$ specifies the parameter subspace where the researcher '
                               'asserts an effect exists. A two-sided alternative $H_1: \\mu \\ne \\mu_0$ allocates '
                               'the significance level $\\alpha$ equally across both distribution tails $(\\alpha/2$ '
                               'on the left and $\\alpha/2$ on the right). A one-sided alternative $H_1: \\mu > '
                               '\\mu_0$ concentrates the entire rejection area $\\alpha$ into the upper tail, '
                               'requiring a smaller observed test statistic to achieve significance at the cost of '
                               'zero sensitivity to negative effects.',
            'interactiveType': 'alt_hypothesis',
            'mathFormulas': [   {   'explanation': 'Detects changes in either positive or negative direction.',
                                    'latex': 'H_1: \\theta \\ne \\theta_0 \\implies \\text{Reject if } |T| \\ge z_{1 - '
                                             '\\alpha/2}',
                                    'name': 'Two-Sided Alternative'},
                                {   'explanation': 'Directional test concentrating all rejection mass into one tail.',
                                    'latex': 'H_1: \\theta > \\theta_0 \\implies \\text{Reject if } T \\ge z_{1 - '
                                             '\\alpha}',
                                    'name': 'One-Sided Alternative'}],
            'moduleId': 'module-5',
            'numericalExample': 'At alpha = 0.05: For a two-tailed standard normal test, the critical cutoff is Z = '
                                '1.96. For a one-tailed test, the critical cutoff is Z = 1.645. An observed Z = 1.80 '
                                'is statistically significant in a one-tailed test (p = 0.036), but NOT significant in '
                                'a two-tailed test (p = 0.072).',
            'pitfalls': 'Switching from a two-tailed test to a one-tailed test AFTER looking at the data to sneak '
                        'under the p < 0.05 threshold (a classic form of p-hacking).',
            'pythonCode': 'from scipy import stats\n'
                          '\n'
                          'z_crit_2sided = stats.norm.ppf(0.975)\n'
                          'z_crit_1sided = stats.norm.ppf(0.95)\n'
                          "print(f'2-Sided Cutoff: {z_crit_2sided:.3f}, 1-Sided Cutoff: {z_crit_1sided:.3f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'One-tailed tests must be decided a priori based strictly on domain theory '
                                           'where the opposite direction carries zero interest or possibility.',
                            'options': [   'Whenever you want your p-value to be smaller',
                                           'Only when a directional effect was pre-registered and an outcome in the '
                                           'opposite direction is theoretically impossible or irrelevant',
                                           'After you check which tail has more data',
                                           'Never, one-tailed tests are invalid'],
                            'question': 'When is it legitimate to use a one-tailed test?'},
                        {   'answer': 1,
                            'explanation': 'One-sided hypotheses must be pre-registered based on domain theory. '
                                           'Choosing one-sided tests post-hoc after looking at data is a form of '
                                           'p-hacking.',
                            'options': [   'Whenever you want to achieve a smaller p-value easily',
                                           'Only when an effect in the opposite direction is physically impossible or '
                                           'of zero practical relevance, specified prior to data collection',
                                           'After inspecting the sample mean and seeing it is positive',
                                           'Whenever the sample size is greater than 30'],
                            'question': 'When is a one-sided (directional) alternative hypothesis statistically '
                                        'justified?'},
                        {   'answer': 2,
                            'explanation': 'A two-sided test rejects H0 for extreme departures in either direction, '
                                           'allocating alpha/2 probability mass to each tail.',
                            'options': [   'Entirely in the right tail',
                                           'Entirely in the left tail',
                                           'Split equally between both the upper and lower tails (alpha/2 in each '
                                           'tail)',
                                           'At the center of the distribution'],
                            'question': 'If you formulate H1: mu_1 != mu_2 (two-sided), where is the rejection region '
                                        'located under the null distribution?'}],
            'rCode': "cat('2-sided:', qnorm(0.975), '1-sided:', qnorm(0.95))",
            'shortTitle': 'Alternative Hypotheses: Main Ideas',
            'summary': 'Exploring the structure of alternative hypotheses (one-tailed vs two-tailed) and how '
                       'directional expectations dictate the critical rejection region.'},
    11: {   'bamIntuition': 'A p-value is NOT the probability that the null hypothesis is true! It is: IF the null '
                            'hypothesis were true, how weird and surprise-worthy is our data? Small p-value = rare and '
                            'weird! BAM!',
            'category': 'Hypothesis Testing & P-Values',
            'duration': '10:14',
            'firstPrinciples': 'Formally, given test statistic $T$ and observed value $t_{\\text{obs}}$, the p-value '
                               'is defined as $p = P(T \\ge t_{\\text{obs}} \\mid H_0)$. Under the null hypothesis, if '
                               'the test statistic distribution is continuous, the p-value is a uniform random '
                               'variable: $p \\sim \\text{Uniform}(0, 1)$. Therefore, $P(p \\le \\alpha \\mid H_0) = '
                               '\\alpha$. The p-value does NOT measure effect size, biological importance, or the '
                               'posterior probability $P(H_0 \\mid \\text{Data})$.',
            'interactiveType': 'p_value_concept',
            'mathFormulas': [   {   'explanation': 'Tail probability of observing data as extreme or more extreme '
                                                   'under the null.',
                                    'latex': 'p = P(T(X) \\ge T(x_{\\text{obs}}) \\mid H_0)',
                                    'name': 'P-Value Definition'},
                                {   'explanation': 'Under a true null, all p-values between 0 and 1 are equally '
                                                   'likely.',
                                    'latex': 'p \\sim \\text{Uniform}(0, 1) \\quad \\text{under } H_0',
                                    'name': 'Uniformity under Null'}],
            'moduleId': 'module-5',
            'numericalExample': 'You flip a coin 10 times and get 9 heads. Null hypothesis: Coin is fair (p = 0.5). '
                                'Probability of 9 or 10 heads: P(X >= 9) = (10 + 1) * (0.5)^10 = 11 / 1024 = 0.0107. '
                                'Two-tailed p-value = 2 * 0.0107 = 0.0215 (2.15%). Since p < 0.05, we reject the fair '
                                'coin hypothesis.',
            'pitfalls': "The catastrophic misconception: 'p = 0.03 means there is a 3% chance the null is true, and "
                        "97% chance the drug works.' That is the inverse probability fallacy!",
            'pythonCode': 'from scipy import stats\n'
                          '\n'
                          '# Binomial test: 9 heads out of 10 flips\n'
                          "result = stats.binomtest(k=9, n=10, p=0.5, alternative='two-sided')\n"
                          "print(f'p-value: {result.pvalue:.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'p-value is conditioned on the null being true: P(Data >= observed | H0).',
                            'options': [   'There is a 3% probability the null hypothesis is true',
                                           'If the null hypothesis were true, there is a 3% probability of seeing data '
                                           'this extreme or more extreme by random chance',
                                           'The treatment increases performance by 3%',
                                           'The experiment has a 97% replication probability'],
                            'question': 'What does a p-value of 0.03 actually mean?'},
                        {   'answer': 1,
                            'explanation': 'The p-value is P(Data | H0), NOT P(H0 | Data). Conflating the two is the '
                                           "classical Prosecutor's Fallacy.",
                            'options': [   'There is a 3% probability of observing data this extreme if the null '
                                           'hypothesis is true',
                                           'There is a 3% probability that the null hypothesis is true',
                                           'If H0 is true, obtaining this effect has probability 0.03',
                                           'The result is statistically significant at alpha = 0.05'],
                            'question': 'Which of the following is a common fatal misinterpretation of a p-value = '
                                        '0.03?'},
                        {   'answer': 1,
                            'explanation': 'When H0 is strictly true, the probability of obtaining p <= c equals c for '
                                           'any c in [0, 1], meaning p is uniformly distributed Uniform(0, 1).',
                            'options': [   'Standard normal N(0, 1)',
                                           'Uniform on the interval [0, 1]',
                                           'Exponential with rate 1',
                                           'Chi-square with 1 degree of freedom'],
                            'question': 'Under a true null hypothesis H0 with continuous test statistics, what is the '
                                        'theoretical distribution of the p-value?'}],
            'rCode': 'binom.test(9, 10, p=0.5)',
            'shortTitle': 'p-values: What They Are & How to Interpret Them',
            'summary': 'Demystifying the p-value: the probability of obtaining test results at least as extreme as the '
                       'observed data, assuming the null hypothesis is true.'},
    12: {   'bamIntuition': 'Lady tasting tea! Can she actually tell if milk or tea was poured first, or is she '
                            'guessing? Fisher calculated the exact number of card-dealing combinations under the null. '
                            'BAM!',
            'category': 'Statistical Errors & Power',
            'duration': '11:20',
            'firstPrinciples': 'For a 2x2 table with fixed marginal totals $a+b, c+d, a+c, b+d$ and grand total $n$, '
                               'the count of successes $a$ follows the Hypergeometric distribution: $P(A = a) = '
                               '\\frac{\\binom{a+b}{a} \\binom{c+d}{c}}{\\binom{n}{a+c}}$. Unlike the Chi-Square test '
                               "which relies on asymptotic large-sample normal approximations, Fisher's test computes "
                               'the exact combinatorial probability of the observed table and all tables more extreme.',
            'interactiveType': 'fishers_exact',
            'mathFormulas': [   {   'explanation': 'Probability of observing cell count a given fixed marginal totals.',
                                    'latex': 'P(a) = \\frac{\\binom{a+b}{a}\\binom{c+d}{c}}{\\binom{n}{a+c}}',
                                    'name': 'Hypergeometric PMF'},
                                {   'explanation': 'Sum of exact probabilities of all contingency tables as unlikely '
                                                   'or less likely than observed.',
                                    'latex': 'p = \\sum_{T : P(T) \\le P(T_{\\text{obs}})} P(T)',
                                    'name': "Fisher's Two-Sided p-value"}],
            'moduleId': 'module-6',
            'numericalExample': 'Tea Tasting Table: Milk first correctly identified: 3 (out of 4). Tea first correctly '
                                'identified: 3 (out of 4). Table: [[3, 1], [1, 3]]. P(table) = [binom(4,3)*binom(4,1)] '
                                '/ binom(8,4) = (4 * 4) / 70 = 16/70 = 0.228. Extreme table [[4,0],[0,4]] has P = 1/70 '
                                '= 0.014. Fisher p-value = 0.228 + 0.014 = 0.242.',
            'pitfalls': 'Using standard Chi-Square tests when expected cell counts are below 5; in that regime, '
                        "Chi-square is inaccurate and Fisher's exact test is required.",
            'pythonCode': 'from scipy import stats\n'
                          '\n'
                          'table = [[3, 1], [1, 3]]\n'
                          'odds_ratio, p_value = stats.fisher_exact(table)\n'
                          "print(f'Odds Ratio: {odds_ratio:.2f}, p-value: {p_value:.4f}')",
            'quiz': [   {   'answer': 1,
                            'explanation': 'It calculates the exact hypergeometric probability of the observed '
                                           'configuration directly from combinatorics rather than approximating it via '
                                           'a continuous Chi-square distribution.',
                            'options': [   'It never makes an error',
                                           'It uses the exact combinatorial hypergeometric distribution rather than an '
                                           'asymptotic approximation',
                                           'It requires exact sample sizes',
                                           'It was invented by an exact scientist'],
                            'question': "Why is Fisher's Exact Test called 'exact'?"},
                        {   'answer': 1,
                            'explanation': 'Chi-square tests rely on asymptotic normal approximations that fail when '
                                           "expected cell counts are small (typically < 5). Fisher's exact test "
                                           'computes exact hypergeometric probabilities.',
                            'options': [   'Only when sample sizes are above 10,000',
                                           'When expected cell counts in any cell fall below 5, where asymptotic '
                                           'chi-square approximations break down',
                                           'Only when comparing continuous variables',
                                           'Whenever the variance is greater than the mean'],
                            'question': "When should Fisher's Exact Test be preferred over the Chi-Square test of "
                                        'independence in a 2x2 contingency table?'},
                        {   'answer': 1,
                            'explanation': "Fisher's exact test conditions on both marginal totals (row and column "
                                           'margins) being fixed, evaluating the probability of observed internal cell '
                                           'configurations.',
                            'options': [   'Only the total sample size',
                                           'Both the row totals and column totals (marginal sums)',
                                           'The diagonal products only',
                                           'The p-value itself'],
                            'question': 'In the hypergeometric distribution modeling a 2x2 contingency table, what '
                                        'quantities are treated as fixed constants?'}],
            'rCode': 'tea <- matrix(c(3, 1, 1, 3), nrow=2)\nfisher.test(tea)',
            'shortTitle': "Fisher's Exact Test & Hypergeometric Distribution",
            'summary': 'Exact test for 2x2 contingency tables based on the hypergeometric distribution, valid even for '
                       'very small sample sizes where Chi-square fails.'},
    13: {   'bamIntuition': 'Calculate your test statistic (how far your data is from zero in noise units). Look up '
                            'that number on the null curve. The shaded area in the tail is your p-value! BAM!',
            'category': 'Hypothesis Testing & P-Values',
            'duration': '8:45',
            'firstPrinciples': 'Calculating a p-value consists of three rigorous mathematical steps: 1. State $H_0$ '
                               'and derive the reference distribution for the test statistic $T$ under $H_0$. 2. '
                               'Compute the sample statistic $t_{\\text{obs}} = \\frac{\\text{Estimate} - \\text{Null '
                               'Value}}{\\text{Standard Error}}$. 3. Integrate the tail area: For two-tailed tests '
                               'with symmetric distributions, $p = 2 \\int_{|t_{\\text{obs}}|}^\\infty f_T(u) du$.',
            'interactiveType': 'p_value_calc',
            'mathFormulas': [   {   'explanation': 'Measures signal-to-noise ratio in units of standard error.',
                                    'latex': 't_{\\text{obs}} = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}',
                                    'name': 'Standardized Test Statistic'},
                                {   'explanation': 'Doubling the one-sided tail area for symmetric distributions.',
                                    'latex': 'p = 2 \\cdot \\left[1 - F_T(|t_{\\text{obs}}|)\\right]',
                                    'name': 'Two-Tailed Tail Integral'}],
            'moduleId': 'module-5',
            'numericalExample': 'Testing sample mean = 105 against mu0 = 100 with s = 10, n = 25. SE = 10 / sqrt(25) = '
                                '2.0. t = (105 - 100)/2 = 2.50. Degrees of freedom = 24. Look up t = 2.5 on '
                                't-distribution with 24 df: One-tail p = 0.0099. Two-tail p = 2 * 0.0099 = 0.0198 (p < '
                                '0.05).',
            'pitfalls': 'Forgetting to multiply by 2 when performing a two-tailed test, erroneously reporting a '
                        'one-tailed p-value that is half as large.',
            'pythonCode': 'from scipy import stats\n'
                          '\n'
                          't_stat = 2.50\n'
                          'df = 24\n'
                          'p_val = 2 * (1 - stats.t.cdf(abs(t_stat), df=df))\n'
                          "print(f'Two-tailed p-value: {p_val:.4f}')",
            'quiz': [   {   'answer': 2,
                            'explanation': 'Standard error of the sample mean is sample standard deviation divided by '
                                           'the square root of sample size: s / sqrt(n).',
                            'options': ['s', 's^2 / n', 's / sqrt(n)', 'sigma * n'],
                            'question': 'What is the standard error in the denominator of a one-sample t-statistic?'},
                        {   'answer': 1,
                            'explanation': 'In a two-tailed test with symmetric null density, extreme values occur at '
                                           'both T >= +2.40 and T <= -2.40, so p = 2 * P(T >= 2.40).',
                            'options': ['P(T >= 2.40)', '2 * P(T >= 2.40)', '1 - P(T <= 2.40)', 'P(T = 2.40)'],
                            'question': 'For a two-tailed test with a symmetric null distribution and an observed test '
                                        'statistic t_obs = +2.40, how is the p-value calculated?'},
                        {   'answer': 2,
                            'explanation': 'If the test statistic lies inside the central 95% region, the tail areas '
                                           'outside it sum to more than 5%, so p > 0.05.',
                            'options': ['p < 0.01', 'p < 0.05', 'p > 0.05', 'p = 0.00'],
                            'question': 'If your test statistic falls inside the middle 95% of the null distribution, '
                                        'what is the two-tailed p-value?'}],
            'rCode': "p_val <- 2 * (1 - pt(2.5, df=24))\ncat('Two-tailed p-value:', p_val)",
            'shortTitle': 'How to Calculate p-values',
            'summary': 'Step-by-step walkthrough of computing test statistics (Z, t, F) and integrating the null '
                       "distribution's tail area to determine p-values."},
    14: {   'bamIntuition': 'If you test 20 different jelly bean colors, one will show p < 0.05 purely by random '
                            "chance! That's not science, that's p-hacking! BAM!",
            'category': 'Statistical Errors & Power',
            'duration': '7:50',
            'firstPrinciples': 'If $m$ independent hypotheses are tested where all nulls are true, the probability of '
                               'at least one false positive (Family-Wise Error Rate) is $\\alpha_{\\text{family}} = 1 '
                               '- (1 - \\alpha)^m$. For $\\alpha = 0.05$ and $m = 20$, $\\alpha_{\\text{family}} = 1 - '
                               '(0.95)^{20} \\approx 0.642$ (a 64.2% chance of a spurious discovery!). Common '
                               'p-hacking strategies include: collecting data until p < 0.05 (optional stopping), '
                               'trying multiple outlier removal rules, switching dependent variables, and exploring '
                               'arbitrary subgroup interactions.',
            'interactiveType': 'p_hacking',
            'mathFormulas': [   {   'explanation': 'The probability of at least one spurious p < 0.05 across m tests.',
                                    'latex': '\\alpha_{\\text{family}} = 1 - (1 - \\alpha)^m',
                                    'name': 'Family-Wise False Positive Rate'},
                                {   'explanation': 'Repeatedly testing accumulating data guarantees eventual false '
                                                   'rejection.',
                                    'latex': 'P(\\text{Reject } H_0 \\text{ eventually}) \\to 1.0',
                                    'name': 'Optional Stopping Bias'}],
            'moduleId': 'module-6',
            'numericalExample': 'Testing 40 food items against cancer risk with no true effects. Expected false '
                                'positives = 40 * 0.05 = 2 foods falsely linked to cancer at p < 0.05! Headline: '
                                "'Scientists find green jelly beans cause cancer!'",
            'pitfalls': 'Treating exploratory data mining as confirmatory hypothesis testing without adjusting alpha '
                        'or preregistering hypotheses.',
            'pythonCode': 'import numpy as np\n'
                          '\n'
                          '# Simulate 20 independent experiments under true null\n'
                          'np.random.seed(42)\n'
                          'p_values = np.random.uniform(0, 1, size=20)\n'
                          'false_positives = np.sum(p_values < 0.05)\n'
                          "print(f'Significant results purely by luck: {false_positives}')\n"
                          "print(f'Minimum p-value found: {np.min(p_values):.4f}')",
            'quiz': [   {   'answer': 2,
                            'explanation': '1 - (1 - 0.05)^20 = 1 - (0.95)^20 = 1 - 0.3585 = 0.6415 (64.2%).',
                            'options': ['5%', '20%', '64.2%', '100%'],
                            'question': 'What is the probability of at least one false positive when performing 20 '
                                        'independent tests at alpha = 0.05?'},
                        {   'answer': 1,
                            'explanation': 'p-hacking exploits researcher degrees of freedom by iteratively modifying '
                                           'analysis decisions until an arbitrary significance threshold is crossed.',
                            'options': [   'Pre-registering sample size, hypotheses, and analysis scripts before data '
                                           'collection',
                                           'Testing multiple subgroups, dropping outliers post-hoc, or stopping data '
                                           'collection early once p < 0.05 is reached',
                                           'Reporting all measured dependent variables regardless of significance',
                                           'Performing power calculations before applying for a grant'],
                            'question': "Which researcher behavior constitutes 'p-hacking'?"},
                        {   'answer': 2,
                            'explanation': 'The probability of no false positives is (1 - 0.05)^20 = 0.95^20 approx '
                                           '35.85%. Thus the family-wise error rate is 1 - 0.3585 = 64.15%.',
                            'options': ['5%', '20 * 5% = 100%', '1 - (1 - 0.05)^20 = 64.15%', '0.05^20'],
                            'question': 'If you test 20 independent hypotheses at significance level alpha = 0.05 when '
                                        'all null hypotheses are completely true, what is the probability of obtaining '
                                        'AT LEAST ONE false positive?'}],
            'rCode': 'set.seed(42)\n'
                     'p_vals <- runif(20)\n'
                     "cat('False positives:', sum(p_vals < 0.05), 'Min p:', min(p_vals))",
            'shortTitle': 'p-hacking: What It Is & How to Avoid It',
            'summary': 'How questionable research practices, optional stopping, and post-hoc subgroup analysis inflate '
                       'false positive rates, and how preregistration solves it.'},
    15: {   'bamIntuition': 'Bonferroni is super strict: it guarantees ZERO mistakes, but kills your real discoveries. '
                            'FDR is smarter: it allows a controlled percentage (like 5%) of your discoveries to be '
                            'false, keeping the rest! BAM!',
            'category': 'Statistical Errors & Power',
            'duration': '9:35',
            'firstPrinciples': 'Let $R$ be total rejections and $V$ be false rejections (Type I errors). False '
                               'Discovery Rate is defined as $\\text{FDR} = E\\left[\\frac{V}{R} \\mid R > 0\\right] '
                               'P(R > 0)$. The Benjamini-Hochberg (BH) step-up algorithm sorts $m$ p-values in '
                               'ascending order: $p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$. It finds the largest '
                               'rank $k$ such that $p_{(k)} \\le \\frac{k}{m} Q$, where $Q$ is the target FDR. It '
                               'rejects all null hypotheses for $i = 1, \\dots, k$, provably controlling $\\text{FDR} '
                               '\\le Q$ under independent or positively dependent tests.',
            'interactiveType': 'fdr_bh',
            'mathFormulas': [   {   'explanation': 'Threshold line scaling linearly with rank k to control FDR at '
                                                   'level Q.',
                                    'latex': 'p_{(k)} \\le \\frac{k}{m} \\cdot Q',
                                    'name': 'Benjamini-Hochberg Condition'},
                                {   'explanation': 'FDR is less conservative and far more powerful than Family-Wise '
                                                   'Error Rate.',
                                    'latex': '\\text{FDR} = E\\left[\\frac{V}{\\max(R, 1)}\\right] \\le \\text{FWER} = '
                                             'P(V \\ge 1)',
                                    'name': 'FDR vs FWER'}],
            'moduleId': 'module-6',
            'numericalExample': 'Testing 5 genes with sorted p-values: [0.001, 0.010, 0.025, 0.040, 0.150]. Target FDR '
                                'Q = 0.05, m = 5. Thresholds (k/5)*0.05: k=1: 0.010 (0.001 <= 0.010 OK); k=2: 0.020 '
                                '(0.010 <= 0.020 OK); k=3: 0.030 (0.025 <= 0.030 OK); k=4: 0.040 (0.040 <= 0.040 OK); '
                                'k=5: 0.050 (0.150 > 0.050 NO). Reject top 4 genes!',
            'pitfalls': 'Using Bonferroni correction in genomics or proteomics with 20,000 genes; $\\alpha = '
                        '0.05/20000 = 2.5 \\times 10^{-6}$, resulting in zero statistical power.',
            'pythonCode': 'from statsmodels.stats.multitest import multipletests\n'
                          '\n'
                          'p_vals = [0.001, 0.010, 0.025, 0.040, 0.150]\n'
                          "rejected, p_adj, _, _ = multipletests(p_vals, alpha=0.05, method='fdr_bh')\n"
                          "print('Rejected:', rejected)\n"
                          "print('Adjusted p-values (q-values):', p_adj.round(4))",
            'quiz': [   {   'answer': 0,
                            'explanation': 'Bonferroni controls FWER (P(at least one false positive)), whereas BH '
                                           'controls FDR (expected ratio of false positives among reported '
                                           'discoveries).',
                            'options': [   'Bonferroni controls the chance of ANY false positive, while BH controls '
                                           'the fraction of false positives among all discoveries',
                                           'Bonferroni is for continuous data, BH is for discrete data',
                                           'BH is stricter than Bonferroni',
                                           'Bonferroni controls Type II errors'],
                            'question': 'What is the difference between Bonferroni correction and Benjamini-Hochberg '
                                        'FDR?'},
                        {   'answer': 1,
                            'explanation': 'FWER is conservative: it ensures P(V >= 1) <= alpha. FDR allows '
                                           'discoveries while guaranteeing that among declared discoveries, on average '
                                           'no more than q% are false.',
                            'options': [   'FDR controls the probability of making at least one false positive; FWER '
                                           'controls the expected proportion of false positives among rejected tests',
                                           'FDR controls the expected proportion of false positives among all rejected '
                                           'nulls; FWER controls the probability of making even one false positive',
                                           'FDR and FWER are mathematically identical in all scenarios',
                                           'FDR is only applicable when sample size n < 10'],
                            'question': 'How does False Discovery Rate (FDR) control differ conceptually from '
                                        'Family-Wise Error Rate (FWER) control like Bonferroni?'},
                        {   'answer': 1,
                            'explanation': 'Benjamini-Hochberg ranks p-values p_(1) <= ... <= p_(m) and finds the '
                                           'largest k such that p_(k) <= (k/m) * q.',
                            'options': ['q / m', '(k / m) * q', 'k * q', 'q / k'],
                            'question': 'In the Benjamini-Hochberg procedure with m tests and target FDR q, what is '
                                        'the critical threshold for the k-th sorted p-value p_(k)?'}],
            'rCode': "p_vals <- c(0.001, 0.010, 0.025, 0.040, 0.150)\np.adjust(p_vals, method='BH')",
            'shortTitle': 'False Discovery Rates (FDR)',
            'summary': 'Controlling the proportion of false positives among rejected hypotheses using the '
                       'Benjamini-Hochberg (BH) procedure in high-throughput data.'}}

