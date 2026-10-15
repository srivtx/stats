# scripts/content_definitions.py
"""
Definitions for all 62 StatQuest Statistics Fundamentals videos.
"""

def get_video_content(idx, vid, raw_title):
    # Mapping table for all 62 videos
    data = {
        1: {
            "shortTitle": "Histograms",
            "moduleId": "module-1",
            "summary": "Histograms show how continuous data is distributed across equal-width intervals (bins), transforming raw measurements into visible shapes.",
            "bamIntuition": "Instead of staring at a giant table of numbers, stack coins or blocks into bins! The taller the stack, the more frequent the values in that range. BAM!",
            "firstPrinciples": "A histogram partitions the sample space into disjoint intervals $[b_k, b_{k+1})$ of width $h$. The count of observations $N_k = \\sum_{i=1}^n \\mathbf{1}_{x_i \\in [b_k, b_{k+1})}$ divided by total sample size $n$ gives the empirical probability mass. When normalized by bin width $h$, the bar heights form a non-parametric density estimator $\\hat{f}_n(x) = \\frac{N_k}{n h}$, which converges to the true underlying probability density function $f(x)$ as $n \\to \\infty$ and $h \\to 0$ with $n h \\to \\infty$.",
            "mathFormulas": [
                {"name": "Bin Count", "latex": "N_k = \\sum_{i=1}^n \\mathbf{1}_{\\{x_i \\in [b_k, b_{k+1})\\}}", "explanation": "Count of observations falling into the k-th bin."},
                {"name": "Density Estimator", "latex": "\\hat{f}(x) = \\frac{N_k}{n \\cdot h}", "explanation": "Normalized height ensuring the total area of all bars sums to exactly 1.0."}
            ],
            "numericalExample": "Given heights in inches: [62, 64, 65, 66, 67, 68, 68, 70, 71, 74]. Using bin width h = 4: Bin [60, 64): 1 observation. Bin [64, 68): 4 observations. Bin [68, 72): 4 observations. Bin [72, 76): 1 observation. Total N = 10. The peak is concentrated between 64 and 72 inches.",
            "pythonCode": "import numpy as np\nimport matplotlib.pyplot as plt\n\ndata = [62, 64, 65, 66, 67, 68, 68, 70, 71, 74]\ncounts, bin_edges = np.histogram(data, bins=4)\nprint('Counts per bin:', counts)\nprint('Bin edges:', bin_edges)",
            "rCode": "data <- c(62, 64, 65, 66, 67, 68, 68, 70, 71, 74)\nhist(data, breaks=4, col='skyblue', main='Height Distribution', xlab='Inches')",
            "pitfalls": "Choosing bin width too narrow creates excessive noise (high variance); choosing it too wide conceals multimodal structures (high bias). Never confuse histograms (continuous data grouped into intervals) with bar charts (discrete categorical counts).",
            "interactiveType": "histogram",
            "quiz": [
                {
                    "question": "What happens if histogram bin widths are made infinitely narrow with finite sample size?",
                    "options": ["The histogram becomes the true smooth density function", "Every observation gets its own spike of height 1/h, causing extreme variance", "The area under the histogram becomes zero", "The mean shifts to the median"],
                    "answer": 1,
                    "explanation": "With finite samples, narrowing bins to zero results in sparse Dirac-like spikes with high variance and zero smoothing."
                },
                {
                    "question": "In a probability density histogram, what does the total area of all bars equal?",
                    "options": ["Sample size N", "1.0", "The variance", "100 percent only if bins are equal"],
                    "answer": 1,
                    "explanation": "By definition of probability density, the integral (total area of bars) must equal 1.0."
                }
            ]
        },
        2: {
            "shortTitle": "Probability Distributions",
            "moduleId": "module-2",
            "summary": "Probability distributions describe how likely different outcomes are for a random variable, bridging discrete counts and continuous curves.",
            "bamIntuition": "A distribution is just a rule or curve that tells you where numbers like to hang out! The higher the curve, the more likely numbers land there. BAM!",
            "firstPrinciples": "A probability space $(\\Omega, \\mathcal{F}, P)$ assigns probabilities to events. For a continuous random variable $X$, the Probability Density Function (PDF) $f(x)$ satisfies $f(x) \\ge 0$ and $\\int_{-\\infty}^{\\infty} f(x)dx = 1$. The probability of an exact point $P(X = c) = \\int_c^c f(x)dx = 0$. Probabilities exist solely over non-zero intervals: $P(a \\le X \\le b) = \\int_a^b f(x)dx$. The Cumulative Distribution Function (CDF) is $F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)dt$.",
            "mathFormulas": [
                {"name": "Total Probability Axiom", "latex": "\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1", "explanation": "The entire area under the continuous density curve must sum to 1."},
                {"name": "Interval Probability", "latex": "P(a \\le X \\le b) = \\int_a^b f(x)\\,dx = F(b) - F(a)", "explanation": "Probability corresponds to the area under the curve between boundaries a and b."}
            ],
            "numericalExample": "For a Uniform distribution on [0, 10], f(x) = 1/10. The probability P(2 <= X <= 5) is the rectangle area: width (5 - 2) = 3 times height 0.1 = 0.3 (30%). Notice f(3) = 0.1, but P(X = 3) = 0.",
            "pythonCode": "from scipy import stats\n\n# Uniform distribution between 0 and 10\nu = stats.uniform(loc=0, scale=10)\nprob = u.cdf(5) - u.cdf(2)\nprint(f'P(2 <= X <= 5) = {prob:.2f}')",
            "rCode": "# Uniform distribution on [0, 10]\nprob <- punif(5, min=0, max=10) - punif(2, min=0, max=10)\ncat('P(2 <= X <= 5) =', prob)",
            "pitfalls": "Confusing probability density f(x) with probability P(X=x). In continuous distributions, density can exceed 1 (e.g. Normal with tiny standard deviation), but probability never exceeds 1.",
            "interactiveType": "pdf_cdf",
            "quiz": [
                {
                    "question": "Why is P(X = 5.0000...) strictly equal to 0 for a continuous random variable?",
                    "options": ["Because 5 is impossible to measure", "Because an exact single point has zero width, so the integral area is zero", "Because continuous variables have no mode", "Because the PDF is zero at 5"],
                    "answer": 1,
                    "explanation": "Area = width * height. Since the width of a single real number point is dx = 0, the integral over that point is 0."
                }
            ]
        },
        3: {
            "shortTitle": "The Normal Distribution",
            "moduleId": "module-2",
            "summary": "The ubiquitous bell-shaped Gaussian distribution, fully parameterized by its central location (mean) and spread (standard deviation).",
            "bamIntuition": "It's the famous bell curve! Most things cluster around the middle (mean), and as you step further out in standard deviations, outcomes get dramatically rarer. BAM!",
            "firstPrinciples": "The Gaussian distribution $\\mathcal{N}(\\mu, \\sigma^2)$ is derived as the maximum entropy distribution for a real-valued variable with specified mean $\\mu$ and variance $\\sigma^2$. The normal equation $f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)$ exhibits points of inflection at $x = \\mu \\pm \\sigma$. The empirical 68-95-99.7 rule dictates that 68.27% of density lies within $\\pm 1\\sigma$, 95.45% within $\\pm 2\\sigma$, and 99.73% within $\\pm 3\\sigma$.",
            "mathFormulas": [
                {"name": "Normal PDF", "latex": "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}", "explanation": "Probability density function parameterized by mean mu and standard deviation sigma."},
                {"name": "Z-score Transformation", "latex": "Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)", "explanation": "Standardizes any normal variable into standard normal with mean 0 and variance 1."}
            ],
            "numericalExample": "If male adult height has mu = 70 inches, sigma = 3 inches. A height of 76 inches has Z = (76 - 70) / 3 = +2.0. Approximately 97.7% of men are shorter than 76 inches (since 95% fall within +/-2 sigma, leaving 2.5% in each tail).",
            "pythonCode": "import numpy as np\nfrom scipy import stats\n\nmu, sigma = 70, 3\nz = (76 - mu) / sigma\np_less = stats.norm.cdf(76, loc=mu, scale=sigma)\nprint(f'Z-score: {z}, Cumulative Probability: {p_less:.4f}')",
            "rCode": "mu <- 70; sigma <- 3\nz <- (76 - mu) / sigma\np_less <- pnorm(76, mean=mu, sd=sigma)\ncat('Z-score:', z, 'Cumulative:', p_less)",
            "pitfalls": "Assuming real-world data is automatically normal without testing. Extreme values (black swans) often violate normality through fat tails (kurtosis).",
            "interactiveType": "normal3d",
            "quiz": [
                {
                    "question": "Where do the inflection points of the normal curve occur?",
                    "options": ["At x = mu", "At x = mu +/- sigma", "At x = mu +/- 2*sigma", "At x = 0"],
                    "answer": 1,
                    "explanation": "Setting the second derivative f''(x) = 0 yields the inflection points at exactly x = mu +/- sigma."
                }
            ]
        },
        4: {
            "shortTitle": "Mean, Median, and Mode",
            "moduleId": "module-1",
            "summary": "Three essential measures of central tendency, each reflecting different mathematical properties and sensitivities to extreme skewness or outliers.",
            "bamIntuition": "Mean is the balancing fulcrum. Median is the exact middle person in line. Mode is the most popular number. When outliers strike, the mean runs away, but the median stands firm! BAM!",
            "firstPrinciples": "The mean $\\mu = \\arg\\min_c \\sum (x_i - c)^2$ minimizes the sum of squared Euclidean distances (L2 loss). The median $M = \\arg\\min_c \\sum |x_i - c|$ minimizes the sum of absolute deviations (L1 loss), explaining its robust invariance to outliers. The mode maximizes the empirical density $\\arg\\max f(x)$. For symmetric unimodal distributions, $\\text{Mean} = \\text{Median} = \\text{Mode}$. In right-skewed data: $\\text{Mean} > \\text{Median} > \\text{Mode}$.",
            "mathFormulas": [
                {"name": "Arithmetic Mean", "latex": "\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i", "explanation": "Center of mass minimizing squared errors."},
                {"name": "Median Condition", "latex": "P(X \\le M) \\ge 0.5 \\quad \\text{and} \\quad P(X \\ge M) \\ge 0.5", "explanation": "The 50th percentile separating upper and lower halves."}
            ],
            "numericalExample": "Salaries: [$40k, $45k, $50k, $55k, $1,000,000]. Median = $50,000 (reflects typical worker). Mean = $238,000 (distorted by the single billionaire). Mode is undefined or non-unique.",
            "pythonCode": "import numpy as np\nfrom scipy import stats\n\nsalaries = [40000, 45000, 50000, 55000, 1000000]\nprint('Mean:', np.mean(salaries))\nprint('Median:', np.median(salaries))\nprint('Mode:', stats.mode(salaries, keepdims=False).mode)",
            "rCode": "salaries <- c(40000, 45000, 50000, 55000, 1000000)\ncat('Mean:', mean(salaries), 'Median:', median(salaries))",
            "pitfalls": "Reporting only the mean for skewed data (like income or hospital wait times), creating a deceptive impression of the true typical experience.",
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
            "summary": "Models the time elapsed between independent Poisson events occurring continuously at a constant average rate lambda, featuring memorylessness.",
            "bamIntuition": "How long do you have to wait for the next bus or radioactive decay? The exponential distribution drops off rapidly: short waits are common, epic long waits are rare! BAM!",
            "firstPrinciples": "Let events occur via a Poisson point process with constant rate $\\lambda > 0$. The probability of zero events in time $t$ is $P(N_t = 0) = e^{-\\lambda t}$. Thus, the survival function of waiting time $T$ is $S(t) = P(T > t) = e^{-\\lambda t}$, giving CDF $F(t) = 1 - e^{-\\lambda t}$ and PDF $f(t) = \\lambda e^{-\\lambda t}$ for $t \\ge 0$. The expected waiting time is $E[T] = 1/\\lambda$, with variance $\\text{Var}(T) = 1/\\lambda^2$. The memoryless property states $P(T > s + t \\mid T > s) = P(T > t)$.",
            "mathFormulas": [
                {"name": "Exponential PDF", "latex": "f(x) = \\lambda e^{-\\lambda x}, \\quad x \\ge 0", "explanation": "Probability density where lambda is the rate parameter."},
                {"name": "Memoryless Property", "latex": "P(X > s + t \\mid X > s) = P(X > t)", "explanation": "Having already waited s minutes does not change the distribution of remaining wait time."}
            ],
            "numericalExample": "A call center receives lambda = 0.5 calls/minute (average wait = 2 minutes). Probability of waiting more than 4 minutes: P(T > 4) = e^(-0.5 * 4) = e^(-2) = 0.135 (13.5%).",
            "pythonCode": "import numpy as np\nfrom scipy import stats\n\nlam = 0.5\n# Probability of waiting > 4 minutes\np_wait = 1 - stats.expon.cdf(4, scale=1/lam)\nprint(f'P(T > 4 min) = {p_wait:.4f}')",
            "rCode": "lam <- 0.5\np_wait <- 1 - pexp(4, rate=lam)\ncat('P(T > 4 min) =', p_wait)",
            "pitfalls": "Confusing rate parameter lambda with scale parameter beta = 1/lambda. In R `pexp(rate=lambda)`, whereas in SciPy `stats.expon(scale=1/lambda)`.",
            "interactiveType": "exponential",
            "quiz": [
                {
                    "question": "If a lightbulb has an exponential failure distribution with mean lifespan 1000 hours, and it has already lasted 1000 hours, what is its expected remaining lifespan?",
                    "options": ["0 hours", "500 hours", "1000 hours", "2000 hours"],
                    "answer": 2,
                    "explanation": "Due to the memoryless property, the remaining lifespan distribution is identical to a brand new bulb: 1000 hours."
                }
            ]
        }
    }
    return data.get(idx)

print("Sample content function loaded.")
