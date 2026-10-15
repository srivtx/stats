#!/usr/bin/env python3
"""
Generates src/data/playlistData.js containing full first-principles documentation,
LaTeX formulas, numerical examples, reproducible Python/R scripts, pitfalls,
and quiz questions for all 62 videos in the StatQuest Statistics Fundamentals playlist.
"""

import json

# Full dataset dictionary mapping video index to rich pedagogical content
CURRICULUM = {
    1: {
        "shortTitle": "Histograms",
        "moduleId": "module-1",
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
                "question": "If a distribution is strongly skewed to the right (positive skew), what is the typical ordering of the three metrics?",
                "options": ["Mean < Median < Mode", "Mode < Median < Mean", "Median < Mode < Mean", "Mean = Median = Mode"],
                "answer": 1,
                "explanation": "The long right tail pulls the mean highest, the median stays in the middle, and the mode remains at the peak on the left: Mode < Median < Mean."
            }
        ]
    },
    5: {
        "shortTitle": "The Exponential Distribution",
        "moduleId": "module-2",
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
    }
}

print(f"Loaded {len(CURRICULUM)} initial definitions.")
