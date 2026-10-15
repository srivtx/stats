# scripts/curriculum_group1.py
"""
Rich pedagogical content for videos 1 to 15.
"""

GROUP_1 = {
    1: {
        "shortTitle": "Histograms",
        "moduleId": "module-1",
        "category": "Descriptive Statistics",
        "duration": "3:42",
        "summary": "Histograms group continuous numerical data into discrete bins along an axis to visualize sample density, modality, skewness, and spread.",
        "bamIntuition": "Instead of staring at a raw spreadsheet of heights, stack blocks into bins! The taller the pile, the more frequent the numbers in that range. BAM!",
        "firstPrinciples": "A histogram partitions the domain into disjoint intervals $[b_k, b_{k+1})$. The count $N_k = \\sum_{i=1}^n \\mathbf{1}_{x_i \\in [b_k, b_{k+1})}$ gives the raw frequency. When normalized by total sample size $n$ and bin width $h$, the bar height represents density: $\\hat{f}_n(x) = \\frac{N_k}{n \\cdot h}$. As sample size $n \\to \\infty$ and bin width $h \\to 0$, the histogram converges to the true continuous probability density function $f(x)$.",
        "mathFormulas": [
            {"name": "Bin Count", "latex": "N_k = \\sum_{i=1}^n \\mathbf{1}_{\\{x_i \\in [b_k, b_{k+1})\\}}", "explanation": "The number of observations that fall within bin interval k."},
            {"name": "Empirical Density", "latex": "\\hat{f}(x) = \\frac{N_k}{n \\cdot h}", "explanation": "Normalized height such that the sum of all bar areas equals 1.0."}
        ],
        "numericalExample": "Consider 10 weights (lbs): [150, 155, 158, 162, 165, 168, 172, 175, 179, 195]. For bins of width 10 starting at 150: [150, 160) has 3; [160, 170) has 3; [170, 180) has 3; [180, 190) has 0; [190, 200) has 1 (an outlier).",
        "pythonCode": "import numpy as np\nimport matplotlib.pyplot as plt\n\ndata = [150, 155, 158, 162, 165, 168, 172, 175, 179, 195]\ncounts, edges = np.histogram(data, bins=[150, 160, 170, 180, 190, 200])\nprint('Counts per bin:', counts)\nprint('Edges:', edges)",
        "rCode": "weights <- c(150, 155, 158, 162, 165, 168, 172, 175, 179, 195)\nhist(weights, breaks=seq(150, 200, by=10), col='skyblue', main='Weight Distribution')",
        "pitfalls": "Never use bar charts for continuous data or histograms for discrete unordered categories. Watch out for bin width sensitivity: too wide hides bimodal peaks; too narrow produces noisy jagged spikes.",
        "interactiveType": "histogram",
        "quiz": [
            {
                "question": "What is the defining requirement for a probability density histogram?",
                "options": ["Every bar must have equal width", "The sum of all bar areas must equal 1.0", "The highest bar must equal 1.0", "All frequencies must be prime"],
                "answer": 1,
                "explanation": "In a probability density histogram, area represents probability, so the total area must integrate to 1.0."
            }
        ]
    },
    2: {
        "shortTitle": "Probability Distributions",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "6:15",
        "summary": "Probability distributions are mathematical blueprints specifying the relative likelihood of every possible event in a sample space.",
        "bamIntuition": "A probability distribution is just a shape that shows where numbers love to congregate! For continuous distributions, probability is area under the curve. BAM!",
        "firstPrinciples": "Formally, a probability distribution assigns a measure $P: \\mathcal{F} \\to [0, 1]$ satisfying Kolmogorov's axioms: $P(E) \\ge 0$, $P(\\Omega) = 1$, and countable additivity. For continuous random variables, $P(X = x) = 0$ for every individual point. Probabilities exist only over measurable intervals: $P(a \\le X \\le b) = \\int_a^b f(x) dx$.",
        "mathFormulas": [
            {"name": "Total Integral", "latex": "\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1", "explanation": "The total area under any probability density curve must equal unity."},
            {"name": "Cumulative Distribution", "latex": "F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt", "explanation": "CDF accumulates probability from negative infinity up to point x."}
        ],
        "numericalExample": "For a continuous uniform distribution on [10, 20], f(x) = 1/(20 - 10) = 0.1. The probability of landing between 12 and 15 is: Area = (15 - 12) * 0.1 = 3 * 0.1 = 0.30 (30%).",
        "pythonCode": "from scipy import stats\n\nunif = stats.uniform(loc=10, scale=10)\nprob = unif.cdf(15) - unif.cdf(12)\nprint(f'P(12 <= X <= 15) = {prob:.2f}')",
        "rCode": "prob <- punif(15, min=10, max=20) - punif(12, min=10, max=20)\ncat('Probability:', prob)",
        "pitfalls": "Confusing density f(x) with probability. The density f(x) can easily exceed 1.0 (e.g. Uniform[0, 0.1] has f(x) = 10 everywhere), but probabilities never exceed 1.0.",
        "interactiveType": "pdf_cdf",
        "quiz": [
            {
                "question": "Can the probability density function f(x) of a continuous random variable be greater than 1?",
                "options": ["No, probabilities can never exceed 1", "Yes, because f(x) is density per unit, not probability itself", "Only if the mean is negative", "Only for discrete variables"],
                "answer": 1,
                "explanation": "Density has dimensions of 1/unit. As long as the integral over the domain equals 1, the instantaneous density height can be arbitrarily large."
            }
        ]
    },
    3: {
        "shortTitle": "The Normal Distribution",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "5:12",
        "summary": "The symmetric bell curve parameterized by mean mu and standard deviation sigma, central to statistical inference and the Central Limit Theorem.",
        "bamIntuition": "It's the classic bell curve! The peak sits right on the mean mu, and the width is controlled by sigma. Step 1, 2, or 3 sigmas away, and you capture 68%, 95%, and 99.7% of the data! BAM!",
        "firstPrinciples": "The Gaussian distribution $\\mathcal{N}(\\mu, \\sigma^2)$ is uniquely characterized as the continuous distribution with maximum entropy for a given mean and variance. It solves the diffusion equation $\\frac{\\partial u}{\\partial t} = \\frac{1}{2} \\frac{\\partial^2 u}{\\partial x^2}$. Inflection points occur exactly at $x = \\mu \\pm \\sigma$. The standardized Z-transform maps $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$ to $Z = (X - \\mu)/\\sigma \\sim \\mathcal{N}(0, 1)$.",
        "mathFormulas": [
            {"name": "Gaussian PDF", "latex": "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}", "explanation": "The normal curve equation parameterized by center mu and scale sigma."},
            {"name": "Empirical Rule", "latex": "P(|X - \\mu| \\le k\\sigma) \\approx \\{68.3\\%, 95.5\\%, 99.7\\%\\} \\quad \\text{for } k=1, 2, 3", "explanation": "Exact cumulative mass within integer multiples of standard deviation."}
        ],
        "numericalExample": "Suppose exam scores follow N(mu = 75, sigma = 10). A student scores 95. The Z-score is (95 - 75)/10 = +2.0. The probability of scoring 95 or higher is 1 - Phi(2.0) = 1 - 0.9772 = 0.0228 (top 2.28%).",
        "pythonCode": "import numpy as np\nfrom scipy import stats\n\nmu, sigma = 75, 10\nz = (95 - mu) / sigma\np_val = 1 - stats.norm.cdf(z)\nprint(f'Z: {z}, P(X >= 95): {p_val:.4f}')",
        "rCode": "mu <- 75; sigma <- 10\nz <- (95 - mu) / sigma\np_val <- 1 - pnorm(95, mean=mu, sd=sigma)\ncat('Tail probability:', p_val)",
        "pitfalls": "Assuming every bell-shaped distribution is Gaussian. The Student's t-distribution or Cauchy distribution look bell-shaped but have heavy tails that produce far more extreme outliers.",
        "interactiveType": "normal3d",
        "quiz": [
            {
                "question": "What percentage of normal distribution values lie between mu - 2*sigma and mu + 2*sigma?",
                "options": ["50%", "68.3%", "95.45%", "99.73%"],
                "answer": 2,
                "explanation": "By the empirical 68-95-99.7 rule, approximately 95.45% of the probability mass falls within two standard deviations of the mean."
            }
        ]
    },
    4: {
        "shortTitle": "Mean, Median & Mode",
        "moduleId": "module-1",
        "category": "Descriptive Statistics",
        "duration": "4:48",
        "summary": "Comparing three measures of central tendency, their mathematical optimization objectives, and their behavior under skewed distributions.",
        "bamIntuition": "The mean is pulled like a magnet toward crazy outliers. The median sits peacefully in the middle and doesn't flinch. Mode is just the most common crowd favorite. BAM!",
        "firstPrinciples": "The mean minimizes expected squared Euclidean loss: $\\mu = \\arg\\min_c E[(X - c)^2]$. The median minimizes absolute loss: $M = \\arg\\min_c E[|X - c|]$, which gives it a breakdown point of 50% (half the data must be corrupted to ruin it, whereas a single infinity ruins the mean). Mode maximizes density $\\arg\\max f(x)$.",
        "mathFormulas": [
            {"name": "Sample Mean", "latex": "\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i", "explanation": "Arithmetic average minimizing sum of squared errors."},
            {"name": "Sample Median", "latex": "\\tilde{x} = \\begin{cases} x_{(\\frac{n+1}{2})} & n \\text{ odd} \\\\ \\frac{1}{2}(x_{(\\frac{n}{2})} + x_{(\\frac{n}{2}+1)}) & n \\text{ even} \\end{cases}", "explanation": "Middle value of ordered sample data."}
        ],
        "numericalExample": "Home values on a street: [$200k, $220k, $230k, $250k, $5,000,000]. Median = $230k (representative of the neighborhood). Mean = $1,180,000 (meaningless for prospective home buyers).",
        "pythonCode": "import numpy as np\n\nhouses = [200, 220, 230, 250, 5000]\nprint('Mean:', np.mean(houses))\nprint('Median:', np.median(houses))",
        "rCode": "houses <- c(200, 220, 230, 250, 5000)\ncat('Mean:', mean(houses), 'Median:', median(houses))",
        "pitfalls": "Using the arithmetic mean to describe heavily skewed data (wealth, house prices, web traffic latency).",
        "interactiveType": "central_tendency",
        "quiz": [
            {
                "question": "Which loss function does the sample mean minimize?",
                "options": ["Sum of absolute errors (L1)", "Sum of squared errors (L2)", "Maximum error (L-infinity)", "Zero-one loss"],
                "answer": 1,
                "explanation": "Taking the derivative of sum((x_i - c)^2) with respect to c and setting it to 0 yields c = (1/n)*sum(x_i)."
            }
        ]
    },
    5: {
        "shortTitle": "The Exponential Distribution",
        "moduleId": "module-2",
        "category": "Probability Distributions",
        "duration": "7:22",
        "summary": "Describes continuous waiting times between Poisson events, possessing the remarkable and unique memoryless property.",
        "bamIntuition": "Waiting for the next radioactive decay or server request? Most waits are short, but every once in a while you wait forever! And the best part: the process doesn't remember how long you've already waited. BAM!",
        "firstPrinciples": "If events arrive independently according to a Poisson process with constant intensity $\\lambda$, the count in interval $t$ is $N_t \\sim \\text{Poisson}(\\lambda t)$. The waiting time $T$ until the first event exceeds $t$ if and only if $N_t = 0$: $P(T > t) = P(N_t = 0) = \\frac{(\\lambda t)^0 e^{-\\lambda t}}{0!} = e^{-\\lambda t}$. Differentiating $F(t) = 1 - e^{-\\lambda t}$ yields $f(t) = \\lambda e^{-\\lambda t}$. The memoryless property $P(T > s + t \\mid T > s) = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t} = P(T > t)$.",
        "mathFormulas": [
            {"name": "Exponential Density", "latex": "f(x) = \\lambda e^{-\\lambda x}, \\quad x \\ge 0", "explanation": "Rate parameter lambda controls how steeply the density decays."},
            {"name": "Survival Function", "latex": "S(t) = P(T > t) = e^{-\\lambda t}", "explanation": "Probability of waiting longer than time t."}
        ],
        "numericalExample": "Bus arrivals follow an exponential distribution with lambda = 0.1 buses/min (mean wait = 10 min). What is the probability you wait more than 15 minutes? S(15) = e^(-0.1 * 15) = e^(-1.5) = 0.2231 (22.3%).",
        "pythonCode": "from scipy import stats\nimport numpy as np\n\nrate = 0.1\np_wait = stats.expon.sf(15, scale=1/rate)\nprint(f'Probability of waiting > 15 min: {p_wait:.4f}')",
        "rCode": "rate <- 0.1\np_wait <- 1 - pexp(15, rate=rate)\ncat('Probability:', p_wait)",
        "pitfalls": "Applying exponential waiting times to systems with wear-and-tear or fatigue (like car tires), where hazard rates increase over time and memorylessness fails.",
        "interactiveType": "exponential",
        "quiz": [
            {
                "question": "What is the variance of an exponential random variable with rate lambda?",
                "options": ["1 / lambda", "1 / (lambda^2)", "lambda", "lambda^2"],
                "answer": 1,
                "explanation": "For an exponential distribution, the expected value is 1/lambda, and the variance is 1/(lambda^2)."
            }
        ]
    },
    6: {
        "shortTitle": "Population vs Estimated Parameters",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "4:15",
        "summary": "Distinguishing between true unobservable population parameters (Greek letters) and sample estimates calculated from finite data (Latin letters).",
        "bamIntuition": "Greek letters (mu, sigma) are the holy truth about the entire universe of data that you can almost never observe. Latin letters (x-bar, s) are your best estimates based on the small sample you have in your hand. BAM!",
        "firstPrinciples": "A population is an underlying data-generating distribution $F_\\theta$. The parameter $\\theta \\in \\Theta$ is fixed and deterministic in frequentist statistics. A sample $(X_1, \\dots, X_n)$ yields an estimator $\\hat{\\theta} = g(X_1, \\dots, X_n)$, which is itself a random variable with a sampling distribution. An estimator is unbiased if $E[\\hat{\\theta}] = \\theta$, and consistent if $\\text{plim}_{n \\to \\infty} \\hat{\\theta} = \\theta$.",
        "mathFormulas": [
            {"name": "Population vs Sample Mean", "latex": "\\mu = E[X] \\quad \\longleftrightarrow \\quad \\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i", "explanation": "Population mean mu vs sample mean estimator x-bar."},
            {"name": "Unbiasedness Condition", "latex": "E[\\hat{\\theta}] = \\theta", "explanation": "The expected value of the estimator across repeated sampling equals the true parameter."}
        ],
        "numericalExample": "Suppose all 1,000,000 fish in a lake have true average length mu = 12.4 inches. You catch 20 fish and calculate x-bar = 12.1 inches. mu is fixed and unknown; x-bar is your random sample estimate.",
        "pythonCode": "import numpy as np\n\n# True population: 10,000 values with mean 12.4\ntrue_population = np.random.normal(loc=12.4, scale=2.0, size=10000)\nsample = np.random.choice(true_population, size=25, replace=False)\nprint(f'True Population Mean (mu): {np.mean(true_population):.2f}')\nprint(f'Sample Estimate (x-bar): {np.mean(sample):.2f}')",
        "rCode": "pop <- rnorm(10000, mean=12.4, sd=2)\nsample <- sample(pop, 25)\ncat('True mu:', mean(pop), 'Sample x-bar:', mean(sample))",
        "pitfalls": "Confusing the sample mean with the population mean, or writing mu when referring to an empirical sample calculation.",
        "interactiveType": "pop_vs_sample",
        "quiz": [
            {
                "question": "Which letter convention denotes true population parameters versus sample statistics?",
                "options": ["Greek for population, Latin for sample", "Latin for population, Greek for sample", "Hebrew for population, Latin for sample", "Upper case for population, lower case for sample"],
                "answer": 0,
                "explanation": "Standard statistical convention uses Greek letters (mu, sigma, beta) for population parameters and Latin letters (x-bar, s, b) for sample estimates."
            }
        ]
    },
    7: {
        "shortTitle": "Mean, Variance & Standard Deviation",
        "moduleId": "module-3",
        "category": "Parameters, Samples & Spread",
        "duration": "8:35",
        "summary": "Computing the arithmetic mean, sum of squared deviations, variance, and standard deviation to quantify variability in original measurement units.",
        "bamIntuition": "Subtract the mean from each number to find the deviation. Square them so negatives don't cancel positives! Average them to get Variance. Take the square root to get Standard Deviation back in real units! BAM!",
        "firstPrinciples": "Variance measures the dispersion of a random variable around its mean: $\\text{Var}(X) = E[(X - \\mu)^2] = E[X^2] - (E[X])^2$. In a sample, deviations $(x_i - \\bar{x})$ satisfy $\\sum_{i=1}^n (x_i - \\bar{x}) = 0$, consuming one degree of freedom. Dividing by $n-1$ (Bessel's correction) yields an unbiased estimator: $E[s^2] = \\sigma^2$. The standard deviation $s = \\sqrt{s^2}$ restores the original dimension of the data.",
        "mathFormulas": [
            {"name": "Sample Variance", "latex": "s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2", "explanation": "Unbiased estimator of population variance using Bessel's correction."},
            {"name": "Sample Standard Deviation", "latex": "s = \\sqrt{s^2} = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}", "explanation": "Square root of variance in the original measurement units."}
        ],
        "numericalExample": "Dataset: [2, 4, 4, 4, 5, 5, 7, 9]. n = 8. Sum = 40. Mean = 40/8 = 5. Deviations: [-3, -1, -1, -1, 0, 0, +2, +4]. Squared deviations: [9, 1, 1, 1, 0, 0, 4, 16]. Sum of squares = 32. Variance s^2 = 32 / (8 - 1) = 32 / 7 = 4.57. Standard deviation s = sqrt(4.57) = 2.14.",
        "pythonCode": "import numpy as np\n\ndata = np.array([2, 4, 4, 4, 5, 5, 7, 9])\nmean = np.mean(data)\nvar = np.var(data, ddof=1)  # ddof=1 for n-1\nsd = np.std(data, ddof=1)\nprint(f'Mean: {mean}, Variance: {var:.2f}, SD: {sd:.2f}')",
        "rCode": "data <- c(2, 4, 4, 4, 5, 5, 7, 9)\ncat('Mean:', mean(data), 'Var:', var(data), 'SD:', sd(data))",
        "pitfalls": "Forgetting that `np.var()` in NumPy defaults to ddof=0 (population formula dividing by N). Always specify `ddof=1` for sample variance!",
        "interactiveType": "variance_calc",
        "quiz": [
            {
                "question": "Why do we take the square root of the variance to get standard deviation?",
                "options": ["To make the value smaller", "To return the spread metric to the original units of the data", "To remove negative numbers", "Because variance cannot be plotted"],
                "answer": 1,
                "explanation": "Because variance squares the units (e.g. dollars squared, inches squared), taking the square root restores the original units (dollars, inches)."
            }
        ]
    },
    8: {
        "shortTitle": "What is a Mathematical Model?",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "4:50",
        "summary": "A mathematical model is a deliberate simplification of reality used to approximate mechanisms, test hypotheses, and generate predictions.",
        "bamIntuition": "All models are approximations of the messy real world! A straight line, a bell curve, or a coin toss formula doesn't capture every atom—it captures the dominant pattern so we can make smart decisions. BAM!",
        "firstPrinciples": "Formally, a statistical model is a family of probability distributions $\\mathcal{P} = \\{P_\\theta : \\theta \\in \\Theta\\}$ defined on sample space $\\mathcal{X}$. As George Box famously declared: 'All models are wrong, but some are useful.' A model introduces structural inductive biases (e.g. linearity, independence, normality) to convert high-dimensional noisy data into low-dimensional interpretable representations.",
        "mathFormulas": [
            {"name": "General Model Form", "latex": "Y = f(X; \\theta) + \\epsilon, \\quad \\epsilon \\sim \\mathcal{D}(0, \\sigma^2)", "explanation": "Deterministic structural signal plus stochastic noise term."},
            {"name": "Occam's Parsimony (AIC)", "latex": "\\text{AIC} = 2k - 2\\ln(\\hat{L})", "explanation": "Balances model goodness of fit with penalty for number of parameters k."}
        ],
        "numericalExample": "Predicting mouse weight from tail length. Model 1: Weight = 10 + 2 * (Tail Length). Mouse with 5cm tail predicted weight = 20g. If actual weight is 21g, error epsilon = +1g.",
        "pythonCode": "import numpy as np\n\ndef model(tail_length, beta0=10, beta1=2):\n    return beta0 + beta1 * tail_length\n\npred = model(5)\nprint(f'Predicted weight for 5cm tail: {pred}g')",
        "rCode": "model <- function(tail_len) 10 + 2 * tail_len\ncat('Predicted weight:', model(5))",
        "pitfalls": "Mistaking the mathematical model for absolute physical reality (reification fallacy), or creating overly complex models that overfit noise.",
        "interactiveType": "math_model",
        "quiz": [
            {
                "question": "What is the primary trade-off in statistical model building?",
                "options": ["Speed vs programming language", "Bias vs Variance (overfitting vs underfitting)", "Mean vs Median", "Alpha vs Beta"],
                "answer": 1,
                "explanation": "Simple models risk high bias (underfitting), whereas overly intricate models suffer from high variance (overfitting noise)."
            }
        ]
    },
    9: {
        "shortTitle": "Hypothesis Testing & The Null Hypothesis",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "7:10",
        "summary": "Hypothesis testing establishes a skeptical baseline (Null Hypothesis H0) and evaluates whether observed data provides sufficient evidence to reject it.",
        "bamIntuition": "The Null Hypothesis is the skeptical grinch saying: 'Nothing interesting is happening here! Any difference is just random dumb luck!' To claim a discovery, you must prove the grinch is wildly improbable. BAM!",
        "firstPrinciples": "Hypothesis testing formulates two mutually exclusive states: $H_0: \\theta \\in \\Theta_0$ (null hypothesis: no effect, equality) versus $H_1: \\theta \\in \\Theta_1$ (alternative hypothesis: an effect exists). The test constructs a test statistic $T(X)$ with a known null distribution $P(T \\mid H_0)$. If the observed statistic $T_{\\text{obs}}$ falls in the critical rejection region $\\mathcal{R}_\\alpha = \\{t : P(T \\in \\mathcal{R}_\\alpha \\mid H_0) = \\alpha\\}$, we reject $H_0$. Crucially, failing to reject $H_0$ never proves $H_0$ is true—absence of evidence is not evidence of absence.",
        "mathFormulas": [
            {"name": "Null & Alternative Form", "latex": "H_0: \\mu_1 = \\mu_2 \\quad \\text{vs} \\quad H_1: \\mu_1 \\ne \\mu_2", "explanation": "The baseline null of no treatment effect versus the two-sided alternative."},
            {"name": "Type I Error Rate", "latex": "\\alpha = P(\\text{Reject } H_0 \\mid H_0 \\text{ is true})", "explanation": "The significance level: probability of a false positive discovery."}
        ],
        "numericalExample": "Testing a new blood pressure drug. H0: Mean reduction = 0 mmHg. H1: Mean reduction > 0 mmHg. In a trial of 100 patients, the average reduction is 8 mmHg with SE = 2 mmHg. Test statistic Z = (8 - 0)/2 = 4.0. The probability of seeing a Z >= 4.0 by pure chance under H0 is less than 0.0001.",
        "pythonCode": "from scipy import stats\n\n# Blood pressure reductions in treated group vs null (0)\nreductions = [8, 6, 9, 12, 7, 5, 10, 8, 11, 4]\nt_stat, p_val = stats.ttest_1samp(reductions, popmean=0)\nprint(f'T-statistic: {t_stat:.2f}, p-value: {p_val:.6f}')",
        "rCode": "reductions <- c(8, 6, 9, 12, 7, 5, 10, 8, 11, 4)\nt.test(reductions, mu=0)",
        "pitfalls": "Believing that 'failing to reject H0' proves that the groups are identical. A small sample with low power can fail to detect even a massive real difference.",
        "interactiveType": "null_hypothesis",
        "quiz": [
            {
                "question": "What does 'failing to reject the null hypothesis' strictly mean?",
                "options": ["We have proved the null hypothesis is true", "We do not have sufficient evidence from our sample to rule out random chance", "The alternative hypothesis is false", "The experiment was done incorrectly"],
                "answer": 1,
                "explanation": "Hypothesis testing can only reject or fail to reject; it can never prove that H0 is exactly true."
            }
        ]
    },
    10: {
        "shortTitle": "Alternative Hypotheses: Main Ideas",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "5:30",
        "summary": "Exploring the structure of alternative hypotheses (one-tailed vs two-tailed) and how directional expectations dictate the critical rejection region.",
        "bamIntuition": "The alternative hypothesis is what you're hoping to prove! If you care whether a drug is better OR worse, split your doubt into two tails. If you only care if it's strictly better, put all your chips on one tail. BAM!",
        "firstPrinciples": "The alternative hypothesis $H_1$ specifies the parameter subspace where the researcher asserts an effect exists. A two-sided alternative $H_1: \\mu \\ne \\mu_0$ allocates the significance level $\\alpha$ equally across both distribution tails $(\\alpha/2$ on the left and $\\alpha/2$ on the right). A one-sided alternative $H_1: \\mu > \\mu_0$ concentrates the entire rejection area $\\alpha$ into the upper tail, requiring a smaller observed test statistic to achieve significance at the cost of zero sensitivity to negative effects.",
        "mathFormulas": [
            {"name": "Two-Sided Alternative", "latex": "H_1: \\theta \\ne \\theta_0 \\implies \\text{Reject if } |T| \\ge z_{1 - \\alpha/2}", "explanation": "Detects changes in either positive or negative direction."},
            {"name": "One-Sided Alternative", "latex": "H_1: \\theta > \\theta_0 \\implies \\text{Reject if } T \\ge z_{1 - \\alpha}", "explanation": "Directional test concentrating all rejection mass into one tail."}
        ],
        "numericalExample": "At alpha = 0.05: For a two-tailed standard normal test, the critical cutoff is Z = 1.96. For a one-tailed test, the critical cutoff is Z = 1.645. An observed Z = 1.80 is statistically significant in a one-tailed test (p = 0.036), but NOT significant in a two-tailed test (p = 0.072).",
        "pythonCode": "from scipy import stats\n\nz_crit_2sided = stats.norm.ppf(0.975)\nz_crit_1sided = stats.norm.ppf(0.95)\nprint(f'2-Sided Cutoff: {z_crit_2sided:.3f}, 1-Sided Cutoff: {z_crit_1sided:.3f}')",
        "rCode": "cat('2-sided:', qnorm(0.975), '1-sided:', qnorm(0.95))",
        "pitfalls": "Switching from a two-tailed test to a one-tailed test AFTER looking at the data to sneak under the p < 0.05 threshold (a classic form of p-hacking).",
        "interactiveType": "alt_hypothesis",
        "quiz": [
            {
                "question": "When is it legitimate to use a one-tailed test?",
                "options": ["Whenever you want your p-value to be smaller", "Only when a directional effect was pre-registered and an outcome in the opposite direction is theoretically impossible or irrelevant", "After you check which tail has more data", "Never, one-tailed tests are invalid"],
                "answer": 1,
                "explanation": "One-tailed tests must be decided a priori based strictly on domain theory where the opposite direction carries zero interest or possibility."
            }
        ]
    },
    11: {
        "shortTitle": "p-values: What They Are & How to Interpret Them",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "10:14",
        "summary": "Demystifying the p-value: the probability of obtaining test results at least as extreme as the observed data, assuming the null hypothesis is true.",
        "bamIntuition": "A p-value is NOT the probability that the null hypothesis is true! It is: IF the null hypothesis were true, how weird and surprise-worthy is our data? Small p-value = rare and weird! BAM!",
        "firstPrinciples": "Formally, given test statistic $T$ and observed value $t_{\\text{obs}}$, the p-value is defined as $p = P(T \\ge t_{\\text{obs}} \\mid H_0)$. Under the null hypothesis, if the test statistic distribution is continuous, the p-value is a uniform random variable: $p \\sim \\text{Uniform}(0, 1)$. Therefore, $P(p \\le \\alpha \\mid H_0) = \\alpha$. The p-value does NOT measure effect size, biological importance, or the posterior probability $P(H_0 \\mid \\text{Data})$.",
        "mathFormulas": [
            {"name": "P-Value Definition", "latex": "p = P(T(X) \\ge T(x_{\\text{obs}}) \\mid H_0)", "explanation": "Tail probability of observing data as extreme or more extreme under the null."},
            {"name": "Uniformity under Null", "latex": "p \\sim \\text{Uniform}(0, 1) \\quad \\text{under } H_0", "explanation": "Under a true null, all p-values between 0 and 1 are equally likely."}
        ],
        "numericalExample": "You flip a coin 10 times and get 9 heads. Null hypothesis: Coin is fair (p = 0.5). Probability of 9 or 10 heads: P(X >= 9) = (10 + 1) * (0.5)^10 = 11 / 1024 = 0.0107. Two-tailed p-value = 2 * 0.0107 = 0.0215 (2.15%). Since p < 0.05, we reject the fair coin hypothesis.",
        "pythonCode": "from scipy import stats\n\n# Binomial test: 9 heads out of 10 flips\nresult = stats.binomtest(k=9, n=10, p=0.5, alternative='two-sided')\nprint(f'p-value: {result.pvalue:.4f}')",
        "rCode": "binom.test(9, 10, p=0.5)",
        "pitfalls": "The catastrophic misconception: 'p = 0.03 means there is a 3% chance the null is true, and 97% chance the drug works.' That is the inverse probability fallacy!",
        "interactiveType": "p_value_concept",
        "quiz": [
            {
                "question": "What does a p-value of 0.03 actually mean?",
                "options": ["There is a 3% probability the null hypothesis is true", "If the null hypothesis were true, there is a 3% probability of seeing data this extreme or more extreme by random chance", "The treatment increases performance by 3%", "The experiment has a 97% replication probability"],
                "answer": 1,
                "explanation": "p-value is conditioned on the null being true: P(Data >= observed | H0)."
            }
        ]
    },
    12: {
        "shortTitle": "Fisher's Exact Test & Hypergeometric Distribution",
        "moduleId": "module-6",
        "category": "Statistical Errors & Power",
        "duration": "11:20",
        "summary": "Exact test for 2x2 contingency tables based on the hypergeometric distribution, valid even for very small sample sizes where Chi-square fails.",
        "bamIntuition": "Lady tasting tea! Can she actually tell if milk or tea was poured first, or is she guessing? Fisher calculated the exact number of card-dealing combinations under the null. BAM!",
        "firstPrinciples": "For a 2x2 table with fixed marginal totals $a+b, c+d, a+c, b+d$ and grand total $n$, the count of successes $a$ follows the Hypergeometric distribution: $P(A = a) = \\frac{\\binom{a+b}{a} \\binom{c+d}{c}}{\\binom{n}{a+c}}$. Unlike the Chi-Square test which relies on asymptotic large-sample normal approximations, Fisher's test computes the exact combinatorial probability of the observed table and all tables more extreme.",
        "mathFormulas": [
            {"name": "Hypergeometric PMF", "latex": "P(a) = \\frac{\\binom{a+b}{a}\\binom{c+d}{c}}{\\binom{n}{a+c}}", "explanation": "Probability of observing cell count a given fixed marginal totals."},
            {"name": "Fisher's Two-Sided p-value", "latex": "p = \\sum_{T : P(T) \\le P(T_{\\text{obs}})} P(T)", "explanation": "Sum of exact probabilities of all contingency tables as unlikely or less likely than observed."}
        ],
        "numericalExample": "Tea Tasting Table: Milk first correctly identified: 3 (out of 4). Tea first correctly identified: 3 (out of 4). Table: [[3, 1], [1, 3]]. P(table) = [binom(4,3)*binom(4,1)] / binom(8,4) = (4 * 4) / 70 = 16/70 = 0.228. Extreme table [[4,0],[0,4]] has P = 1/70 = 0.014. Fisher p-value = 0.228 + 0.014 = 0.242.",
        "pythonCode": "from scipy import stats\n\ntable = [[3, 1], [1, 3]]\nodds_ratio, p_value = stats.fisher_exact(table)\nprint(f'Odds Ratio: {odds_ratio:.2f}, p-value: {p_value:.4f}')",
        "rCode": "tea <- matrix(c(3, 1, 1, 3), nrow=2)\nfisher.test(tea)",
        "pitfalls": "Using standard Chi-Square tests when expected cell counts are below 5; in that regime, Chi-square is inaccurate and Fisher's exact test is required.",
        "interactiveType": "fishers_exact",
        "quiz": [
            {
                "question": "Why is Fisher's Exact Test called 'exact'?",
                "options": ["It never makes an error", "It uses the exact combinatorial hypergeometric distribution rather than an asymptotic approximation", "It requires exact sample sizes", "It was invented by an exact scientist"],
                "answer": 1,
                "explanation": "It calculates the exact hypergeometric probability of the observed configuration directly from combinatorics rather than approximating it via a continuous Chi-square distribution."
            }
        ]
    },
    13: {
        "shortTitle": "How to Calculate p-values",
        "moduleId": "module-5",
        "category": "Hypothesis Testing & P-Values",
        "duration": "8:45",
        "summary": "Step-by-step walkthrough of computing test statistics (Z, t, F) and integrating the null distribution's tail area to determine p-values.",
        "bamIntuition": "Calculate your test statistic (how far your data is from zero in noise units). Look up that number on the null curve. The shaded area in the tail is your p-value! BAM!",
        "firstPrinciples": "Calculating a p-value consists of three rigorous mathematical steps: 1. State $H_0$ and derive the reference distribution for the test statistic $T$ under $H_0$. 2. Compute the sample statistic $t_{\\text{obs}} = \\frac{\\text{Estimate} - \\text{Null Value}}{\\text{Standard Error}}$. 3. Integrate the tail area: For two-tailed tests with symmetric distributions, $p = 2 \\int_{|t_{\\text{obs}}|}^\\infty f_T(u) du$.",
        "mathFormulas": [
            {"name": "Standardized Test Statistic", "latex": "t_{\\text{obs}} = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}", "explanation": "Measures signal-to-noise ratio in units of standard error."},
            {"name": "Two-Tailed Tail Integral", "latex": "p = 2 \\cdot \\left[1 - F_T(|t_{\\text{obs}}|)\\right]", "explanation": "Doubling the one-sided tail area for symmetric distributions."}
        ],
        "numericalExample": "Testing sample mean = 105 against mu0 = 100 with s = 10, n = 25. SE = 10 / sqrt(25) = 2.0. t = (105 - 100)/2 = 2.50. Degrees of freedom = 24. Look up t = 2.5 on t-distribution with 24 df: One-tail p = 0.0099. Two-tail p = 2 * 0.0099 = 0.0198 (p < 0.05).",
        "pythonCode": "from scipy import stats\n\nt_stat = 2.50\ndf = 24\np_val = 2 * (1 - stats.t.cdf(abs(t_stat), df=df))\nprint(f'Two-tailed p-value: {p_val:.4f}')",
        "rCode": "p_val <- 2 * (1 - pt(2.5, df=24))\ncat('Two-tailed p-value:', p_val)",
        "pitfalls": "Forgetting to multiply by 2 when performing a two-tailed test, erroneously reporting a one-tailed p-value that is half as large.",
        "interactiveType": "p_value_calc",
        "quiz": [
            {
                "question": "What is the standard error in the denominator of a one-sample t-statistic?",
                "options": ["s", "s^2 / n", "s / sqrt(n)", "sigma * n"],
                "answer": 2,
                "explanation": "Standard error of the sample mean is sample standard deviation divided by the square root of sample size: s / sqrt(n)."
            }
        ]
    },
    14: {
        "shortTitle": "p-hacking: What It Is & How to Avoid It",
        "moduleId": "module-6",
        "category": "Statistical Errors & Power",
        "duration": "7:50",
        "summary": "How questionable research practices, optional stopping, and post-hoc subgroup analysis inflate false positive rates, and how preregistration solves it.",
        "bamIntuition": "If you test 20 different jelly bean colors, one will show p < 0.05 purely by random chance! That's not science, that's p-hacking! BAM!",
        "firstPrinciples": "If $m$ independent hypotheses are tested where all nulls are true, the probability of at least one false positive (Family-Wise Error Rate) is $\\alpha_{\\text{family}} = 1 - (1 - \\alpha)^m$. For $\\alpha = 0.05$ and $m = 20$, $\\alpha_{\\text{family}} = 1 - (0.95)^{20} \\approx 0.642$ (a 64.2% chance of a spurious discovery!). Common p-hacking strategies include: collecting data until p < 0.05 (optional stopping), trying multiple outlier removal rules, switching dependent variables, and exploring arbitrary subgroup interactions.",
        "mathFormulas": [
            {"name": "Family-Wise False Positive Rate", "latex": "\\alpha_{\\text{family}} = 1 - (1 - \\alpha)^m", "explanation": "The probability of at least one spurious p < 0.05 across m tests."},
            {"name": "Optional Stopping Bias", "latex": "P(\\text{Reject } H_0 \\text{ eventually}) \\to 1.0", "explanation": "Repeatedly testing accumulating data guarantees eventual false rejection."}
        ],
        "numericalExample": "Testing 40 food items against cancer risk with no true effects. Expected false positives = 40 * 0.05 = 2 foods falsely linked to cancer at p < 0.05! Headline: 'Scientists find green jelly beans cause cancer!'",
        "pythonCode": "import numpy as np\n\n# Simulate 20 independent experiments under true null\nnp.random.seed(42)\np_values = np.random.uniform(0, 1, size=20)\nfalse_positives = np.sum(p_values < 0.05)\nprint(f'Significant results purely by luck: {false_positives}')\nprint(f'Minimum p-value found: {np.min(p_values):.4f}')",
        "rCode": "set.seed(42)\np_vals <- runif(20)\ncat('False positives:', sum(p_vals < 0.05), 'Min p:', min(p_vals))",
        "pitfalls": "Treating exploratory data mining as confirmatory hypothesis testing without adjusting alpha or preregistering hypotheses.",
        "interactiveType": "p_hacking",
        "quiz": [
            {
                "question": "What is the probability of at least one false positive when performing 20 independent tests at alpha = 0.05?",
                "options": ["5%", "20%", "64.2%", "100%"],
                "answer": 2,
                "explanation": "1 - (1 - 0.05)^20 = 1 - (0.95)^20 = 1 - 0.3585 = 0.6415 (64.2%)."
            }
        ]
    },
    15: {
        "shortTitle": "False Discovery Rates (FDR)",
        "moduleId": "module-6",
        "category": "Statistical Errors & Power",
        "duration": "9:35",
        "summary": "Controlling the proportion of false positives among rejected hypotheses using the Benjamini-Hochberg (BH) procedure in high-throughput data.",
        "bamIntuition": "Bonferroni is super strict: it guarantees ZERO mistakes, but kills your real discoveries. FDR is smarter: it allows a controlled percentage (like 5%) of your discoveries to be false, keeping the rest! BAM!",
        "firstPrinciples": "Let $R$ be total rejections and $V$ be false rejections (Type I errors). False Discovery Rate is defined as $\\text{FDR} = E\\left[\\frac{V}{R} \\mid R > 0\\right] P(R > 0)$. The Benjamini-Hochberg (BH) step-up algorithm sorts $m$ p-values in ascending order: $p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$. It finds the largest rank $k$ such that $p_{(k)} \\le \\frac{k}{m} Q$, where $Q$ is the target FDR. It rejects all null hypotheses for $i = 1, \\dots, k$, provably controlling $\\text{FDR} \\le Q$ under independent or positively dependent tests.",
        "mathFormulas": [
            {"name": "Benjamini-Hochberg Condition", "latex": "p_{(k)} \\le \\frac{k}{m} \\cdot Q", "explanation": "Threshold line scaling linearly with rank k to control FDR at level Q."},
            {"name": "FDR vs FWER", "latex": "\\text{FDR} = E\\left[\\frac{V}{\\max(R, 1)}\\right] \\le \\text{FWER} = P(V \\ge 1)", "explanation": "FDR is less conservative and far more powerful than Family-Wise Error Rate."}
        ],
        "numericalExample": "Testing 5 genes with sorted p-values: [0.001, 0.010, 0.025, 0.040, 0.150]. Target FDR Q = 0.05, m = 5. Thresholds (k/5)*0.05: k=1: 0.010 (0.001 <= 0.010 OK); k=2: 0.020 (0.010 <= 0.020 OK); k=3: 0.030 (0.025 <= 0.030 OK); k=4: 0.040 (0.040 <= 0.040 OK); k=5: 0.050 (0.150 > 0.050 NO). Reject top 4 genes!",
        "pythonCode": "from statsmodels.stats.multitest import multipletests\n\np_vals = [0.001, 0.010, 0.025, 0.040, 0.150]\nrejected, p_adj, _, _ = multipletests(p_vals, alpha=0.05, method='fdr_bh')\nprint('Rejected:', rejected)\nprint('Adjusted p-values (q-values):', p_adj.round(4))",
        "rCode": "p_vals <- c(0.001, 0.010, 0.025, 0.040, 0.150)\np.adjust(p_vals, method='BH')",
        "pitfalls": "Using Bonferroni correction in genomics or proteomics with 20,000 genes; $\\alpha = 0.05/20000 = 2.5 \\times 10^{-6}$, resulting in zero statistical power.",
        "interactiveType": "fdr_bh",
        "quiz": [
            {
                "question": "What is the difference between Bonferroni correction and Benjamini-Hochberg FDR?",
                "options": ["Bonferroni controls the chance of ANY false positive, while BH controls the fraction of false positives among all discoveries", "Bonferroni is for continuous data, BH is for discrete data", "BH is stricter than Bonferroni", "Bonferroni controls Type II errors"],
                "answer": 0,
                "explanation": "Bonferroni controls FWER (P(at least one false positive)), whereas BH controls FDR (expected ratio of false positives among reported discoveries)."
            }
        ]
    }
}

print(f"Group 1 defined with {len(GROUP_1)} videos.")
