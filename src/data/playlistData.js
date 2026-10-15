// Comprehensive StatQuest Statistics Fundamentals Catalog (62 Videos)
export const playlistData = [
  {
    "index": 1,
    "id": "qBigTkBLU6g",
    "title": "StatQuest: Histograms, Clearly Explained",
    "shortTitle": "Histograms",
    "moduleId": "module-1",
    "category": "Descriptive Statistics",
    "duration": "3:42",
    "embedUrl": "https://www.youtube-nocookie.com/embed/qBigTkBLU6g?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=qBigTkBLU6g&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=1",
    "summary": "Histograms group continuous numerical data into discrete bins along an axis to visualize sample density, modality, skewness, and spread.",
    "bamIntuition": "Instead of staring at a raw spreadsheet of heights, stack blocks into bins! The taller the pile, the more frequent the numbers in that range. BAM!",
    "firstPrinciples": "A histogram partitions the domain into disjoint intervals $[b_k, b_{k+1})$. The count $N_k = \\sum_{i=1}^n \\mathbf{1}_{x_i \\in [b_k, b_{k+1})}$ gives the raw frequency. When normalized by total sample size $n$ and bin width $h$, the bar height represents density: $\\hat{f}_n(x) = \\frac{N_k}{n \\cdot h}$. As sample size $n \\to \\infty$ and bin width $h \\to 0$, the histogram converges to the true continuous probability density function $f(x)$.",
    "mathFormulas": [
      {
        "explanation": "The number of observations that fall within bin interval k.",
        "latex": "N_k = \\sum_{i=1}^n \\mathbf{1}_{\\{x_i \\in [b_k, b_{k+1})\\}}",
        "name": "Bin Count"
      },
      {
        "explanation": "Normalized height such that the sum of all bar areas equals 1.0.",
        "latex": "\\hat{f}(x) = \\frac{N_k}{n \\cdot h}",
        "name": "Empirical Density"
      }
    ],
    "numericalExample": "Consider 10 weights (lbs): [150, 155, 158, 162, 165, 168, 172, 175, 179, 195]. For bins of width 10 starting at 150: [150, 160) has 3; [160, 170) has 3; [170, 180) has 3; [180, 190) has 0; [190, 200) has 1 (an outlier).",
    "pythonCode": "import numpy as np\nimport matplotlib.pyplot as plt\n\ndata = [150, 155, 158, 162, 165, 168, 172, 175, 179, 195]\ncounts, edges = np.histogram(data, bins=[150, 160, 170, 180, 190, 200])\nprint('Counts per bin:', counts)\nprint('Edges:', edges)",
    "rCode": "weights <- c(150, 155, 158, 162, 165, 168, 172, 175, 179, 195)\nhist(weights, breaks=seq(150, 200, by=10), col='skyblue', main='Weight Distribution')",
    "pitfalls": "Never use bar charts for continuous data or histograms for discrete unordered categories. Watch out for bin width sensitivity: too wide hides bimodal peaks; too narrow produces noisy jagged spikes.",
    "interactiveType": "histogram",
    "quiz": [
      {
        "answer": 1,
        "explanation": "In a probability density histogram, area represents probability, so the total area must integrate to 1.0.",
        "options": [
          "Every bar must have equal width",
          "The sum of all bar areas must equal 1.0",
          "The highest bar must equal 1.0",
          "All frequencies must be prime"
        ],
        "question": "What is the defining requirement for a probability density histogram?"
      },
      {
        "answer": 1,
        "explanation": "Doubling bin width h aggregates neighboring intervals: the number of bins roughly halves, while each bin captures roughly twice as many observations.",
        "options": [
          "Bin count doubles, counts per bin halve",
          "Bin count roughly halves, counts per bin roughly double",
          "Neither bin count nor counts change",
          "Both bin count and counts double"
        ],
        "question": "If you double the bin width in a frequency histogram while keeping total sample size constant, what happens?"
      },
      {
        "answer": 1,
        "explanation": "Too narrow bins cause severe undersmoothing/overfitting: each bin has 0 or 1 observation, obscuring the true population distribution.",
        "options": [
          "It violates total area normalization",
          "It creates high-variance noisy spikes reflecting random sampling noise rather than underlying population density",
          "It makes the sample mean mathematically undefined",
          "It converts continuous variables into nominal categories"
        ],
        "question": "Why is a histogram with excessively narrow bin widths hazardous for statistical inference?"
      }
    ]
  },
  {
    "index": 2,
    "id": "oI3hZJqXJuc",
    "title": "The Main Ideas behind Probability Distributions",
    "shortTitle": "Probability Distributions",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "6:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/oI3hZJqXJuc?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=oI3hZJqXJuc&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=2",
    "summary": "Probability distributions are mathematical blueprints specifying the relative likelihood of every possible event in a sample space.",
    "bamIntuition": "A probability distribution is just a shape that shows where numbers love to congregate! For continuous distributions, probability is area under the curve. BAM!",
    "firstPrinciples": "Formally, a probability distribution assigns a measure $P: \\mathcal{F} \\to [0, 1]$ satisfying Kolmogorov's axioms: $P(E) \\ge 0$, $P(\\Omega) = 1$, and countable additivity. For continuous random variables, $P(X = x) = 0$ for every individual point. Probabilities exist only over measurable intervals: $P(a \\le X \\le b) = \\int_a^b f(x) dx$.",
    "mathFormulas": [
      {
        "explanation": "The total area under any probability density curve must equal unity.",
        "latex": "\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1",
        "name": "Total Integral"
      },
      {
        "explanation": "CDF accumulates probability from negative infinity up to point x.",
        "latex": "F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt",
        "name": "Cumulative Distribution"
      }
    ],
    "numericalExample": "For a continuous uniform distribution on [10, 20], f(x) = 1/(20 - 10) = 0.1. The probability of landing between 12 and 15 is: Area = (15 - 12) * 0.1 = 3 * 0.1 = 0.30 (30%).",
    "pythonCode": "from scipy import stats\n\nunif = stats.uniform(loc=10, scale=10)\nprob = unif.cdf(15) - unif.cdf(12)\nprint(f'P(12 <= X <= 15) = {prob:.2f}')",
    "rCode": "prob <- punif(15, min=10, max=20) - punif(12, min=10, max=20)\ncat('Probability:', prob)",
    "pitfalls": "Confusing density f(x) with probability. The density f(x) can easily exceed 1.0 (e.g. Uniform[0, 0.1] has f(x) = 10 everywhere), but probabilities never exceed 1.0.",
    "interactiveType": "pdf_cdf",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Density has dimensions of 1/unit. As long as the integral over the domain equals 1, the instantaneous density height can be arbitrarily large.",
        "options": [
          "No, probabilities can never exceed 1",
          "Yes, because f(x) is density per unit, not probability itself",
          "Only if the mean is negative",
          "Only for discrete variables"
        ],
        "question": "Can the probability density function f(x) of a continuous random variable be greater than 1?"
      },
      {
        "answer": 2,
        "explanation": "Continuous probability is defined as the integral over an interval. The integral of a single point is zero, even though density f(c) > 0.",
        "options": [
          "f(c)",
          "1 / sigma",
          "0",
          "0.5"
        ],
        "question": "For any continuous random variable X, what is the exact probability of observing an exact single real number, P(X = c)?"
      },
      {
        "answer": 1,
        "explanation": "A CDF accumulates probability measure from negative infinity to positive infinity, so it is monotonically non-decreasing from 0 to 1.",
        "options": [
          "It must be strictly periodic",
          "It must be non-decreasing with limit 0 at negative infinity and 1 at positive infinity",
          "Its derivative must be strictly constant",
          "It must be symmetric around zero"
        ],
        "question": "Which fundamental property must every valid Cumulative Distribution Function F(x) satisfy?"
      }
    ]
  },
  {
    "index": 3,
    "id": "rzFX5NWojp0",
    "title": "The Normal Distribution, Clearly Explained!!!",
    "shortTitle": "The Normal Distribution",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "5:12",
    "embedUrl": "https://www.youtube-nocookie.com/embed/rzFX5NWojp0?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=rzFX5NWojp0&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=3",
    "summary": "The symmetric bell curve parameterized by mean mu and standard deviation sigma, central to statistical inference and the Central Limit Theorem.",
    "bamIntuition": "It's the classic bell curve! The peak sits right on the mean mu, and the width is controlled by sigma. Step 1, 2, or 3 sigmas away, and you capture 68%, 95%, and 99.7% of the data! BAM!",
    "firstPrinciples": "The Gaussian distribution $\\mathcal{N}(\\mu, \\sigma^2)$ is uniquely characterized as the continuous distribution with maximum entropy for a given mean and variance. It solves the diffusion equation $\\frac{\\partial u}{\\partial t} = \\frac{1}{2} \\frac{\\partial^2 u}{\\partial x^2}$. Inflection points occur exactly at $x = \\mu \\pm \\sigma$. The standardized Z-transform maps $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$ to $Z = (X - \\mu)/\\sigma \\sim \\mathcal{N}(0, 1)$.",
    "mathFormulas": [
      {
        "explanation": "The normal curve equation parameterized by center mu and scale sigma.",
        "latex": "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}",
        "name": "Gaussian PDF"
      },
      {
        "explanation": "Exact cumulative mass within integer multiples of standard deviation.",
        "latex": "P(|X - \\mu| \\le k\\sigma) \\approx \\{68.3\\%, 95.5\\%, 99.7\\%\\} \\quad \\text{for } k=1, 2, 3",
        "name": "Empirical Rule"
      }
    ],
    "numericalExample": "Suppose exam scores follow N(mu = 75, sigma = 10). A student scores 95. The Z-score is (95 - 75)/10 = +2.0. The probability of scoring 95 or higher is 1 - Phi(2.0) = 1 - 0.9772 = 0.0228 (top 2.28%).",
    "pythonCode": "import numpy as np\nfrom scipy import stats\n\nmu, sigma = 75, 10\nz = (95 - mu) / sigma\np_val = 1 - stats.norm.cdf(z)\nprint(f'Z: {z}, P(X >= 95): {p_val:.4f}')",
    "rCode": "mu <- 75; sigma <- 10\nz <- (95 - mu) / sigma\np_val <- 1 - pnorm(95, mean=mu, sd=sigma)\ncat('Tail probability:', p_val)",
    "pitfalls": "Assuming every bell-shaped distribution is Gaussian. The Student's t-distribution or Cauchy distribution look bell-shaped but have heavy tails that produce far more extreme outliers.",
    "interactiveType": "normal3d",
    "quiz": [
      {
        "answer": 2,
        "explanation": "By the empirical 68-95-99.7 rule, approximately 95.45% of the probability mass falls within two standard deviations of the mean.",
        "options": [
          "50%",
          "68.3%",
          "95.45%",
          "99.73%"
        ],
        "question": "What percentage of normal distribution values lie between mu - 2*sigma and mu + 2*sigma?"
      },
      {
        "answer": 1,
        "explanation": "Setting the second derivative of the Gaussian PDF f''(x) = 0 yields (x - mu)^2 = sigma^2, placing inflection points at mu +/- sigma.",
        "options": [
          "At x = mu",
          "At x = mu +/- sigma",
          "At x = mu +/- 2*sigma",
          "At x = mu +/- 3*sigma"
        ],
        "question": "At which exact x-axis locations do the inflection points of the normal probability density curve occur?"
      },
      {
        "answer": 1,
        "explanation": "Expected values subtract: 100 - 50 = 50. For independent random variables, variances ALWAYS add: Var(X - Y) = Var(X) + Var(Y) = 25 + 16 = 41.",
        "options": [
          "N(50, 9)",
          "N(50, 41)",
          "N(50, sqrt(41))",
          "N(150, 41)"
        ],
        "question": "If X ~ N(100, 25) and Y ~ N(50, 16) are independent, what is the distribution of W = X - Y?"
      }
    ]
  },
  {
    "index": 4,
    "id": "-14BImgVENA",
    "title": "The mean, the median, and the mode.",
    "shortTitle": "Mean, Median & Mode",
    "moduleId": "module-1",
    "category": "Descriptive Statistics",
    "duration": "4:48",
    "embedUrl": "https://www.youtube-nocookie.com/embed/-14BImgVENA?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=-14BImgVENA&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=4",
    "summary": "Comparing three measures of central tendency, their mathematical optimization objectives, and their behavior under skewed distributions.",
    "bamIntuition": "The mean is pulled like a magnet toward crazy outliers. The median sits peacefully in the middle and doesn't flinch. Mode is just the most common crowd favorite. BAM!",
    "firstPrinciples": "The mean minimizes expected squared Euclidean loss: $\\mu = \\arg\\min_c E[(X - c)^2]$. The median minimizes absolute loss: $M = \\arg\\min_c E[|X - c|]$, which gives it a breakdown point of 50% (half the data must be corrupted to ruin it, whereas a single infinity ruins the mean). Mode maximizes density $\\arg\\max f(x)$.",
    "mathFormulas": [
      {
        "explanation": "Arithmetic average minimizing sum of squared errors.",
        "latex": "\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i",
        "name": "Sample Mean"
      },
      {
        "explanation": "Middle value of ordered sample data.",
        "latex": "\\tilde{x} = \\begin{cases} x_{(\\frac{n+1}{2})} & n \\text{ odd} \\\\ \\frac{1}{2}(x_{(\\frac{n}{2})} + x_{(\\frac{n}{2}+1)}) & n \\text{ even} \\end{cases}",
        "name": "Sample Median"
      }
    ],
    "numericalExample": "Home values on a street: [$200k, $220k, $230k, $250k, $5,000,000]. Median = $230k (representative of the neighborhood). Mean = $1,180,000 (meaningless for prospective home buyers).",
    "pythonCode": "import numpy as np\n\nhouses = [200, 220, 230, 250, 5000]\nprint('Mean:', np.mean(houses))\nprint('Median:', np.median(houses))",
    "rCode": "houses <- c(200, 220, 230, 250, 5000)\ncat('Mean:', mean(houses), 'Median:', median(houses))",
    "pitfalls": "Using the arithmetic mean to describe heavily skewed data (wealth, house prices, web traffic latency).",
    "interactiveType": "central_tendency",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Taking the derivative of sum((x_i - c)^2) with respect to c and setting it to 0 yields c = (1/n)*sum(x_i).",
        "options": [
          "Sum of absolute errors (L1)",
          "Sum of squared errors (L2)",
          "Maximum error (L-infinity)",
          "Zero-one loss"
        ],
        "question": "Which loss function does the sample mean minimize?"
      },
      {
        "answer": 1,
        "explanation": "Right-skewed outliers pull the arithmetic mean to the right. The mode remains at the peak, and the median sits between them: Mode < Median < Mean.",
        "options": [
          "Mean < Median < Mode",
          "Mode < Median < Mean",
          "Median < Mode < Mean",
          "Mean = Median = Mode"
        ],
        "question": "In a distribution that is heavily right-skewed (such as household income), what is the typical ordering of central tendency measures?"
      },
      {
        "answer": 1,
        "explanation": "The median has a 50% breakdown point, meaning over half of the observations must be corrupted to force the median to an arbitrary extreme.",
        "options": [
          "0%: a single extreme outlier corrupts it",
          "50%: up to half the sample can be arbitrarily corrupted without driving the median to infinity",
          "100%: it is mathematically impossible to change",
          "Equal to 1/n"
        ],
        "question": "What is the breakdown point of the sample median, and what does it signify?"
      }
    ]
  },
  {
    "index": 5,
    "id": "wtLQUjfomig",
    "title": "The Exponential Distribution",
    "shortTitle": "The Exponential Distribution",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "7:22",
    "embedUrl": "https://www.youtube-nocookie.com/embed/wtLQUjfomig?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=wtLQUjfomig&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=5",
    "summary": "Describes continuous waiting times between Poisson events, possessing the remarkable and unique memoryless property.",
    "bamIntuition": "Waiting for the next radioactive decay or server request? Most waits are short, but every once in a while you wait forever! And the best part: the process doesn't remember how long you've already waited. BAM!",
    "firstPrinciples": "If events arrive independently according to a Poisson process with constant intensity $\\lambda$, the count in interval $t$ is $N_t \\sim \\text{Poisson}(\\lambda t)$. The waiting time $T$ until the first event exceeds $t$ if and only if $N_t = 0$: $P(T > t) = P(N_t = 0) = \\frac{(\\lambda t)^0 e^{-\\lambda t}}{0!} = e^{-\\lambda t}$. Differentiating $F(t) = 1 - e^{-\\lambda t}$ yields $f(t) = \\lambda e^{-\\lambda t}$. The memoryless property $P(T > s + t \\mid T > s) = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t} = P(T > t)$.",
    "mathFormulas": [
      {
        "explanation": "Rate parameter lambda controls how steeply the density decays.",
        "latex": "f(x) = \\lambda e^{-\\lambda x}, \\quad x \\ge 0",
        "name": "Exponential Density"
      },
      {
        "explanation": "Probability of waiting longer than time t.",
        "latex": "S(t) = P(T > t) = e^{-\\lambda t}",
        "name": "Survival Function"
      }
    ],
    "numericalExample": "Bus arrivals follow an exponential distribution with lambda = 0.1 buses/min (mean wait = 10 min). What is the probability you wait more than 15 minutes? S(15) = e^(-0.1 * 15) = e^(-1.5) = 0.2231 (22.3%).",
    "pythonCode": "from scipy import stats\nimport numpy as np\n\nrate = 0.1\np_wait = stats.expon.sf(15, scale=1/rate)\nprint(f'Probability of waiting > 15 min: {p_wait:.4f}')",
    "rCode": "rate <- 0.1\np_wait <- 1 - pexp(15, rate=rate)\ncat('Probability:', p_wait)",
    "pitfalls": "Applying exponential waiting times to systems with wear-and-tear or fatigue (like car tires), where hazard rates increase over time and memorylessness fails.",
    "interactiveType": "exponential",
    "quiz": [
      {
        "answer": 1,
        "explanation": "For an exponential distribution, the expected value is 1/lambda, and the variance is 1/(lambda^2).",
        "options": [
          "1 / lambda",
          "1 / (lambda^2)",
          "lambda",
          "lambda^2"
        ],
        "question": "What is the variance of an exponential random variable with rate lambda?"
      },
      {
        "answer": 0,
        "explanation": "Memorylessness means the probability of waiting an additional t minutes given you have already waited s minutes is identical to starting fresh: P(T > s + t | T > s) = P(T > t).",
        "options": [
          "P(T > s + t | T > s) = P(T > t)",
          "P(T < s + t) = P(T < s) * P(T < t)",
          "The mean equals the median",
          "The variance is zero"
        ],
        "question": "What does the memoryless property of the exponential distribution mathematically state?"
      },
      {
        "answer": 1,
        "explanation": "For an exponential waiting time with rate lambda = 4 calls/hour, the expected value is 1/lambda = 1/4 hour = 15 minutes.",
        "options": [
          "4 hours",
          "0.25 hours (15 minutes)",
          "1 hour",
          "16 hours"
        ],
        "question": "If phone calls arrive at a call center at an average rate of 4 calls per hour (Poisson process), what is the expected waiting time until the next call?"
      }
    ]
  },
  {
    "index": 6,
    "id": "vikkiwjQqfU",
    "title": "Population and Estimated Parameters, Clearly Explained!!!",
    "shortTitle": "Population vs Estimated Parameters",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "4:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/vikkiwjQqfU?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=vikkiwjQqfU&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=6",
    "summary": "Distinguishing between true unobservable population parameters (Greek letters) and sample estimates calculated from finite data (Latin letters).",
    "bamIntuition": "Greek letters (mu, sigma) are the holy truth about the entire universe of data that you can almost never observe. Latin letters (x-bar, s) are your best estimates based on the small sample you have in your hand. BAM!",
    "firstPrinciples": "A population is an underlying data-generating distribution $F_\\theta$. The parameter $\\theta \\in \\Theta$ is fixed and deterministic in frequentist statistics. A sample $(X_1, \\dots, X_n)$ yields an estimator $\\hat{\\theta} = g(X_1, \\dots, X_n)$, which is itself a random variable with a sampling distribution. An estimator is unbiased if $E[\\hat{\\theta}] = \\theta$, and consistent if $\\text{plim}_{n \\to \\infty} \\hat{\\theta} = \\theta$.",
    "mathFormulas": [
      {
        "explanation": "Population mean mu vs sample mean estimator x-bar.",
        "latex": "\\mu = E[X] \\quad \\longleftrightarrow \\quad \\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i",
        "name": "Population vs Sample Mean"
      },
      {
        "explanation": "The expected value of the estimator across repeated sampling equals the true parameter.",
        "latex": "E[\\hat{\\theta}] = \\theta",
        "name": "Unbiasedness Condition"
      }
    ],
    "numericalExample": "Suppose all 1,000,000 fish in a lake have true average length mu = 12.4 inches. You catch 20 fish and calculate x-bar = 12.1 inches. mu is fixed and unknown; x-bar is your random sample estimate.",
    "pythonCode": "import numpy as np\n\n# True population: 10,000 values with mean 12.4\ntrue_population = np.random.normal(loc=12.4, scale=2.0, size=10000)\nsample = np.random.choice(true_population, size=25, replace=False)\nprint(f'True Population Mean (mu): {np.mean(true_population):.2f}')\nprint(f'Sample Estimate (x-bar): {np.mean(sample):.2f}')",
    "rCode": "pop <- rnorm(10000, mean=12.4, sd=2)\nsample <- sample(pop, 25)\ncat('True mu:', mean(pop), 'Sample x-bar:', mean(sample))",
    "pitfalls": "Confusing the sample mean with the population mean, or writing mu when referring to an empirical sample calculation.",
    "interactiveType": "pop_vs_sample",
    "quiz": [
      {
        "answer": 0,
        "explanation": "Standard statistical convention uses Greek letters (mu, sigma, beta) for population parameters and Latin letters (x-bar, s, b) for sample estimates.",
        "options": [
          "Greek for population, Latin for sample",
          "Latin for population, Greek for sample",
          "Hebrew for population, Latin for sample",
          "Upper case for population, lower case for sample"
        ],
        "question": "Which letter convention denotes true population parameters versus sample statistics?"
      },
      {
        "answer": 1,
        "explanation": "Population parameters (mu, sigma) are fixed population constants, whereas sample statistics (x-bar, s) are random variables that vary from sample to sample.",
        "options": [
          "It is purely historical convention with no conceptual distinction",
          "Greek letters represent fixed, unobservable ground truths; Roman letters represent sample statistics computed from data",
          "Greek letters denote biased estimates; Roman letters denote unbiased estimates",
          "Roman letters are reserved for discrete variables only"
        ],
        "question": "Why are Greek letters (mu, sigma) conventionally used for population parameters and Roman letters (x-bar, s) for sample estimates?"
      },
      {
        "answer": 1,
        "explanation": "By the Weak and Strong Laws of Large Numbers, the sample mean converges in probability and almost surely to the population parameter mu as n -> infinity.",
        "options": [
          "The difference increases proportionally to sqrt(n)",
          "The difference approaches 0 in probability by the Law of Large Numbers",
          "The difference approaches 1.96",
          "The variance of the estimate increases"
        ],
        "question": "What happens to the difference between the sample estimate x-bar and the true population parameter mu as sample size n grows toward infinity?"
      }
    ]
  },
  {
    "index": 7,
    "id": "SzZ6GpcfoQY",
    "title": "Calculating the Mean, Variance and Standard Deviation, Clearly Explained!!!",
    "shortTitle": "Mean, Variance & Standard Deviation",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "8:35",
    "embedUrl": "https://www.youtube-nocookie.com/embed/SzZ6GpcfoQY?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=SzZ6GpcfoQY&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=7",
    "summary": "Computing the arithmetic mean, sum of squared deviations, variance, and standard deviation to quantify variability in original measurement units.",
    "bamIntuition": "Subtract the mean from each number to find the deviation. Square them so negatives don't cancel positives! Average them to get Variance. Take the square root to get Standard Deviation back in real units! BAM!",
    "firstPrinciples": "Variance measures the dispersion of a random variable around its mean: $\\text{Var}(X) = E[(X - \\mu)^2] = E[X^2] - (E[X])^2$. In a sample, deviations $(x_i - \\bar{x})$ satisfy $\\sum_{i=1}^n (x_i - \\bar{x}) = 0$, consuming one degree of freedom. Dividing by $n-1$ (Bessel's correction) yields an unbiased estimator: $E[s^2] = \\sigma^2$. The standard deviation $s = \\sqrt{s^2}$ restores the original dimension of the data.",
    "mathFormulas": [
      {
        "explanation": "Unbiased estimator of population variance using Bessel's correction.",
        "latex": "s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2",
        "name": "Sample Variance"
      },
      {
        "explanation": "Square root of variance in the original measurement units.",
        "latex": "s = \\sqrt{s^2} = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}",
        "name": "Sample Standard Deviation"
      }
    ],
    "numericalExample": "Dataset: [2, 4, 4, 4, 5, 5, 7, 9]. n = 8. Sum = 40. Mean = 40/8 = 5. Deviations: [-3, -1, -1, -1, 0, 0, +2, +4]. Squared deviations: [9, 1, 1, 1, 0, 0, 4, 16]. Sum of squares = 32. Variance s^2 = 32 / (8 - 1) = 32 / 7 = 4.57. Standard deviation s = sqrt(4.57) = 2.14.",
    "pythonCode": "import numpy as np\n\ndata = np.array([2, 4, 4, 4, 5, 5, 7, 9])\nmean = np.mean(data)\nvar = np.var(data, ddof=1)  # ddof=1 for n-1\nsd = np.std(data, ddof=1)\nprint(f'Mean: {mean}, Variance: {var:.2f}, SD: {sd:.2f}')",
    "rCode": "data <- c(2, 4, 4, 4, 5, 5, 7, 9)\ncat('Mean:', mean(data), 'Var:', var(data), 'SD:', sd(data))",
    "pitfalls": "Forgetting that `np.var()` in NumPy defaults to ddof=0 (population formula dividing by N). Always specify `ddof=1` for sample variance!",
    "interactiveType": "variance_calc",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because variance squares the units (e.g. dollars squared, inches squared), taking the square root restores the original units (dollars, inches).",
        "options": [
          "To make the value smaller",
          "To return the spread metric to the original units of the data",
          "To remove negative numbers",
          "Because variance cannot be plotted"
        ],
        "question": "Why do we take the square root of the variance to get standard deviation?"
      },
      {
        "answer": 0,
        "explanation": "By definition of the arithmetic mean, sum(x_i - x-bar) = sum(x_i) - n*(1/n*sum(x_i)) = 0. Squaring eliminates sign cancellation and penalizes large errors.",
        "options": [
          "Because raw deviations always sum to zero, canceling positive and negative distances",
          "Because squaring makes the variance scale in linear units",
          "Because negative numbers cannot be represented on computers",
          "Because square roots are computationally impossible"
        ],
        "question": "Why do we square deviations (x_i - x-bar) when computing variance instead of simply averaging raw deviations?"
      },
      {
        "answer": 1,
        "explanation": "Scaling by c scales standard deviation by |c| = 3 and scales variance by c^2 = 9.",
        "options": [
          "SD multiplied by 3, variance multiplied by 3",
          "SD multiplied by 3, variance multiplied by 9",
          "SD multiplied by 9, variance multiplied by 3",
          "Neither changes"
        ],
        "question": "If you multiply every observation in a dataset by a constant factor c = 3, how do the standard deviation and variance change?"
      }
    ]
  },
  {
    "index": 8,
    "id": "yQhTtdq_y9M",
    "title": "What is a (mathematical) model?",
    "shortTitle": "What is a Mathematical Model?",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "4:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/yQhTtdq_y9M?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=yQhTtdq_y9M&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=8",
    "summary": "A mathematical model is a deliberate simplification of reality used to approximate mechanisms, test hypotheses, and generate predictions.",
    "bamIntuition": "All models are approximations of the messy real world! A straight line, a bell curve, or a coin toss formula doesn't capture every atom\u2014it captures the dominant pattern so we can make smart decisions. BAM!",
    "firstPrinciples": "Formally, a statistical model is a family of probability distributions $\\mathcal{P} = \\{P_\\theta : \\theta \\in \\Theta\\}$ defined on sample space $\\mathcal{X}$. As George Box famously declared: 'All models are wrong, but some are useful.' A model introduces structural inductive biases (e.g. linearity, independence, normality) to convert high-dimensional noisy data into low-dimensional interpretable representations.",
    "mathFormulas": [
      {
        "explanation": "Deterministic structural signal plus stochastic noise term.",
        "latex": "Y = f(X; \\theta) + \\epsilon, \\quad \\epsilon \\sim \\mathcal{D}(0, \\sigma^2)",
        "name": "General Model Form"
      },
      {
        "explanation": "Balances model goodness of fit with penalty for number of parameters k.",
        "latex": "\\text{AIC} = 2k - 2\\ln(\\hat{L})",
        "name": "Occam's Parsimony (AIC)"
      }
    ],
    "numericalExample": "Predicting mouse weight from tail length. Model 1: Weight = 10 + 2 * (Tail Length). Mouse with 5cm tail predicted weight = 20g. If actual weight is 21g, error epsilon = +1g.",
    "pythonCode": "import numpy as np\n\ndef model(tail_length, beta0=10, beta1=2):\n    return beta0 + beta1 * tail_length\n\npred = model(5)\nprint(f'Predicted weight for 5cm tail: {pred}g')",
    "rCode": "model <- function(tail_len) 10 + 2 * tail_len\ncat('Predicted weight:', model(5))",
    "pitfalls": "Mistaking the mathematical model for absolute physical reality (reification fallacy), or creating overly complex models that overfit noise.",
    "interactiveType": "math_model",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Simple models risk high bias (underfitting), whereas overly intricate models suffer from high variance (overfitting noise).",
        "options": [
          "Speed vs programming language",
          "Bias vs Variance (overfitting vs underfitting)",
          "Mean vs Median",
          "Alpha vs Beta"
        ],
        "question": "What is the primary trade-off in statistical model building?"
      },
      {
        "answer": 1,
        "explanation": "As George Box famously noted, 'All models are wrong, but some are useful.' A model abstracts complex realities into tractable predictive structures.",
        "options": [
          "To replicate every microscopic detail of reality without simplification",
          "To provide a useful abstraction that captures essential relationships while discarding uninformative noise",
          "To ensure that all p-values are less than 0.05",
          "To eliminate the need for empirical data collection"
        ],
        "question": "What is the primary philosophical purpose of a statistical or mathematical model?"
      },
      {
        "answer": 1,
        "explanation": "The residual term epsilon captures all variation in y that cannot be explained by the linear predictor beta_0 + beta_1 * x.",
        "options": [
          "Systematic computational errors by the computer",
          "Unmeasured covariates, measurement noise, and inherent stochastic variation",
          "The degrees of freedom of the intercept",
          "The slope of the regression line"
        ],
        "question": "In the linear model y = beta_0 + beta_1 * x + epsilon, what does the error term epsilon account for?"
      }
    ]
  },
  {
    "index": 9,
    "id": "0oc49DyA3hU",
    "title": "Hypothesis Testing and The Null Hypothesis, Clearly Explained!!!",
    "shortTitle": "Hypothesis Testing & The Null Hypothesis",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "7:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/0oc49DyA3hU?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=0oc49DyA3hU&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=9",
    "summary": "Hypothesis testing establishes a skeptical baseline (Null Hypothesis H0) and evaluates whether observed data provides sufficient evidence to reject it.",
    "bamIntuition": "The Null Hypothesis is the skeptical grinch saying: 'Nothing interesting is happening here! Any difference is just random dumb luck!' To claim a discovery, you must prove the grinch is wildly improbable. BAM!",
    "firstPrinciples": "Hypothesis testing formulates two mutually exclusive states: $H_0: \\theta \\in \\Theta_0$ (null hypothesis: no effect, equality) versus $H_1: \\theta \\in \\Theta_1$ (alternative hypothesis: an effect exists). The test constructs a test statistic $T(X)$ with a known null distribution $P(T \\mid H_0)$. If the observed statistic $T_{\\text{obs}}$ falls in the critical rejection region $\\mathcal{R}_\\alpha = \\{t : P(T \\in \\mathcal{R}_\\alpha \\mid H_0) = \\alpha\\}$, we reject $H_0$. Crucially, failing to reject $H_0$ never proves $H_0$ is true\u2014absence of evidence is not evidence of absence.",
    "mathFormulas": [
      {
        "explanation": "The baseline null of no treatment effect versus the two-sided alternative.",
        "latex": "H_0: \\mu_1 = \\mu_2 \\quad \\text{vs} \\quad H_1: \\mu_1 \\ne \\mu_2",
        "name": "Null & Alternative Form"
      },
      {
        "explanation": "The significance level: probability of a false positive discovery.",
        "latex": "\\alpha = P(\\text{Reject } H_0 \\mid H_0 \\text{ is true})",
        "name": "Type I Error Rate"
      }
    ],
    "numericalExample": "Testing a new blood pressure drug. H0: Mean reduction = 0 mmHg. H1: Mean reduction > 0 mmHg. In a trial of 100 patients, the average reduction is 8 mmHg with SE = 2 mmHg. Test statistic Z = (8 - 0)/2 = 4.0. The probability of seeing a Z >= 4.0 by pure chance under H0 is less than 0.0001.",
    "pythonCode": "from scipy import stats\n\n# Blood pressure reductions in treated group vs null (0)\nreductions = [8, 6, 9, 12, 7, 5, 10, 8, 11, 4]\nt_stat, p_val = stats.ttest_1samp(reductions, popmean=0)\nprint(f'T-statistic: {t_stat:.2f}, p-value: {p_val:.6f}')",
    "rCode": "reductions <- c(8, 6, 9, 12, 7, 5, 10, 8, 11, 4)\nt.test(reductions, mu=0)",
    "pitfalls": "Believing that 'failing to reject H0' proves that the groups are identical. A small sample with low power can fail to detect even a massive real difference.",
    "interactiveType": "null_hypothesis",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Hypothesis testing can only reject or fail to reject; it can never prove that H0 is exactly true.",
        "options": [
          "We have proved the null hypothesis is true",
          "We do not have sufficient evidence from our sample to rule out random chance",
          "The alternative hypothesis is false",
          "The experiment was done incorrectly"
        ],
        "question": "What does 'failing to reject the null hypothesis' strictly mean?"
      },
      {
        "answer": 1,
        "explanation": "H0 provides the baseline assumption from which the null sampling distribution is derived to determine how unexpected the observed data would be by chance alone.",
        "options": [
          "It is the hypothesis the researcher hopes to prove true",
          "It acts as the skeptical baseline of 'no effect' or 'no difference' used to construct the reference null distribution",
          "It guarantees that the alternative hypothesis is mathematically false",
          "It sets the sample size of the experiment"
        ],
        "question": "What is the specific role of the Null Hypothesis (H0) in classical Neyman-Pearson hypothesis testing?"
      },
      {
        "answer": 1,
        "explanation": "Absence of evidence is not evidence of absence. Failing to reject H0 simply means the observed data are consistent with random sampling variability under H0.",
        "options": [
          "The null hypothesis has been proven true beyond doubt",
          "There is insufficient evidence in this sample to reject the null hypothesis at significance level alpha",
          "The alternative hypothesis is impossible",
          "The experiment had zero measurement error"
        ],
        "question": "Failing to reject the null hypothesis (p >= alpha) mathematically implies which of the following?"
      }
    ]
  },
  {
    "index": 10,
    "id": "5koKb5B_YWo",
    "title": "Alternative Hypotheses: Main Ideas!!!",
    "shortTitle": "Alternative Hypotheses: Main Ideas",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "5:30",
    "embedUrl": "https://www.youtube-nocookie.com/embed/5koKb5B_YWo?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=5koKb5B_YWo&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=10",
    "summary": "Exploring the structure of alternative hypotheses (one-tailed vs two-tailed) and how directional expectations dictate the critical rejection region.",
    "bamIntuition": "The alternative hypothesis is what you're hoping to prove! If you care whether a drug is better OR worse, split your doubt into two tails. If you only care if it's strictly better, put all your chips on one tail. BAM!",
    "firstPrinciples": "The alternative hypothesis $H_1$ specifies the parameter subspace where the researcher asserts an effect exists. A two-sided alternative $H_1: \\mu \\ne \\mu_0$ allocates the significance level $\\alpha$ equally across both distribution tails $(\\alpha/2$ on the left and $\\alpha/2$ on the right). A one-sided alternative $H_1: \\mu > \\mu_0$ concentrates the entire rejection area $\\alpha$ into the upper tail, requiring a smaller observed test statistic to achieve significance at the cost of zero sensitivity to negative effects.",
    "mathFormulas": [
      {
        "explanation": "Detects changes in either positive or negative direction.",
        "latex": "H_1: \\theta \\ne \\theta_0 \\implies \\text{Reject if } |T| \\ge z_{1 - \\alpha/2}",
        "name": "Two-Sided Alternative"
      },
      {
        "explanation": "Directional test concentrating all rejection mass into one tail.",
        "latex": "H_1: \\theta > \\theta_0 \\implies \\text{Reject if } T \\ge z_{1 - \\alpha}",
        "name": "One-Sided Alternative"
      }
    ],
    "numericalExample": "At alpha = 0.05: For a two-tailed standard normal test, the critical cutoff is Z = 1.96. For a one-tailed test, the critical cutoff is Z = 1.645. An observed Z = 1.80 is statistically significant in a one-tailed test (p = 0.036), but NOT significant in a two-tailed test (p = 0.072).",
    "pythonCode": "from scipy import stats\n\nz_crit_2sided = stats.norm.ppf(0.975)\nz_crit_1sided = stats.norm.ppf(0.95)\nprint(f'2-Sided Cutoff: {z_crit_2sided:.3f}, 1-Sided Cutoff: {z_crit_1sided:.3f}')",
    "rCode": "cat('2-sided:', qnorm(0.975), '1-sided:', qnorm(0.95))",
    "pitfalls": "Switching from a two-tailed test to a one-tailed test AFTER looking at the data to sneak under the p < 0.05 threshold (a classic form of p-hacking).",
    "interactiveType": "alt_hypothesis",
    "quiz": [
      {
        "answer": 1,
        "explanation": "One-tailed tests must be decided a priori based strictly on domain theory where the opposite direction carries zero interest or possibility.",
        "options": [
          "Whenever you want your p-value to be smaller",
          "Only when a directional effect was pre-registered and an outcome in the opposite direction is theoretically impossible or irrelevant",
          "After you check which tail has more data",
          "Never, one-tailed tests are invalid"
        ],
        "question": "When is it legitimate to use a one-tailed test?"
      },
      {
        "answer": 1,
        "explanation": "One-sided hypotheses must be pre-registered based on domain theory. Choosing one-sided tests post-hoc after looking at data is a form of p-hacking.",
        "options": [
          "Whenever you want to achieve a smaller p-value easily",
          "Only when an effect in the opposite direction is physically impossible or of zero practical relevance, specified prior to data collection",
          "After inspecting the sample mean and seeing it is positive",
          "Whenever the sample size is greater than 30"
        ],
        "question": "When is a one-sided (directional) alternative hypothesis statistically justified?"
      },
      {
        "answer": 2,
        "explanation": "A two-sided test rejects H0 for extreme departures in either direction, allocating alpha/2 probability mass to each tail.",
        "options": [
          "Entirely in the right tail",
          "Entirely in the left tail",
          "Split equally between both the upper and lower tails (alpha/2 in each tail)",
          "At the center of the distribution"
        ],
        "question": "If you formulate H1: mu_1 != mu_2 (two-sided), where is the rejection region located under the null distribution?"
      }
    ]
  },
  {
    "index": 11,
    "id": "vemZtEM63GY",
    "title": "p-values: What they are and how to interpret them",
    "shortTitle": "p-values: What They Are & How to Interpret Them",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "10:14",
    "embedUrl": "https://www.youtube-nocookie.com/embed/vemZtEM63GY?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=vemZtEM63GY&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=11",
    "summary": "Demystifying the p-value: the probability of obtaining test results at least as extreme as the observed data, assuming the null hypothesis is true.",
    "bamIntuition": "A p-value is NOT the probability that the null hypothesis is true! It is: IF the null hypothesis were true, how weird and surprise-worthy is our data? Small p-value = rare and weird! BAM!",
    "firstPrinciples": "Formally, given test statistic $T$ and observed value $t_{\\text{obs}}$, the p-value is defined as $p = P(T \\ge t_{\\text{obs}} \\mid H_0)$. Under the null hypothesis, if the test statistic distribution is continuous, the p-value is a uniform random variable: $p \\sim \\text{Uniform}(0, 1)$. Therefore, $P(p \\le \\alpha \\mid H_0) = \\alpha$. The p-value does NOT measure effect size, biological importance, or the posterior probability $P(H_0 \\mid \\text{Data})$.",
    "mathFormulas": [
      {
        "explanation": "Tail probability of observing data as extreme or more extreme under the null.",
        "latex": "p = P(T(X) \\ge T(x_{\\text{obs}}) \\mid H_0)",
        "name": "P-Value Definition"
      },
      {
        "explanation": "Under a true null, all p-values between 0 and 1 are equally likely.",
        "latex": "p \\sim \\text{Uniform}(0, 1) \\quad \\text{under } H_0",
        "name": "Uniformity under Null"
      }
    ],
    "numericalExample": "You flip a coin 10 times and get 9 heads. Null hypothesis: Coin is fair (p = 0.5). Probability of 9 or 10 heads: P(X >= 9) = (10 + 1) * (0.5)^10 = 11 / 1024 = 0.0107. Two-tailed p-value = 2 * 0.0107 = 0.0215 (2.15%). Since p < 0.05, we reject the fair coin hypothesis.",
    "pythonCode": "from scipy import stats\n\n# Binomial test: 9 heads out of 10 flips\nresult = stats.binomtest(k=9, n=10, p=0.5, alternative='two-sided')\nprint(f'p-value: {result.pvalue:.4f}')",
    "rCode": "binom.test(9, 10, p=0.5)",
    "pitfalls": "The catastrophic misconception: 'p = 0.03 means there is a 3% chance the null is true, and 97% chance the drug works.' That is the inverse probability fallacy!",
    "interactiveType": "p_value_concept",
    "quiz": [
      {
        "answer": 1,
        "explanation": "p-value is conditioned on the null being true: P(Data >= observed | H0).",
        "options": [
          "There is a 3% probability the null hypothesis is true",
          "If the null hypothesis were true, there is a 3% probability of seeing data this extreme or more extreme by random chance",
          "The treatment increases performance by 3%",
          "The experiment has a 97% replication probability"
        ],
        "question": "What does a p-value of 0.03 actually mean?"
      },
      {
        "answer": 1,
        "explanation": "The p-value is P(Data | H0), NOT P(H0 | Data). Conflating the two is the classical Prosecutor's Fallacy.",
        "options": [
          "There is a 3% probability of observing data this extreme if the null hypothesis is true",
          "There is a 3% probability that the null hypothesis is true",
          "If H0 is true, obtaining this effect has probability 0.03",
          "The result is statistically significant at alpha = 0.05"
        ],
        "question": "Which of the following is a common fatal misinterpretation of a p-value = 0.03?"
      },
      {
        "answer": 1,
        "explanation": "When H0 is strictly true, the probability of obtaining p <= c equals c for any c in [0, 1], meaning p is uniformly distributed Uniform(0, 1).",
        "options": [
          "Standard normal N(0, 1)",
          "Uniform on the interval [0, 1]",
          "Exponential with rate 1",
          "Chi-square with 1 degree of freedom"
        ],
        "question": "Under a true null hypothesis H0 with continuous test statistics, what is the theoretical distribution of the p-value?"
      }
    ]
  },
  {
    "index": 12,
    "id": "udyAvvaMjfM",
    "title": "Fisher's Exact Test and the Hypergeometric Distribution",
    "shortTitle": "Fisher's Exact Test & Hypergeometric Distribution",
    "moduleId": "module-6",
    "category": "Statistical Errors & Power",
    "duration": "11:20",
    "embedUrl": "https://www.youtube-nocookie.com/embed/udyAvvaMjfM?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=udyAvvaMjfM&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=12",
    "summary": "Exact test for 2x2 contingency tables based on the hypergeometric distribution, valid even for very small sample sizes where Chi-square fails.",
    "bamIntuition": "Lady tasting tea! Can she actually tell if milk or tea was poured first, or is she guessing? Fisher calculated the exact number of card-dealing combinations under the null. BAM!",
    "firstPrinciples": "For a 2x2 table with fixed marginal totals $a+b, c+d, a+c, b+d$ and grand total $n$, the count of successes $a$ follows the Hypergeometric distribution: $P(A = a) = \\frac{\\binom{a+b}{a} \\binom{c+d}{c}}{\\binom{n}{a+c}}$. Unlike the Chi-Square test which relies on asymptotic large-sample normal approximations, Fisher's test computes the exact combinatorial probability of the observed table and all tables more extreme.",
    "mathFormulas": [
      {
        "explanation": "Probability of observing cell count a given fixed marginal totals.",
        "latex": "P(a) = \\frac{\\binom{a+b}{a}\\binom{c+d}{c}}{\\binom{n}{a+c}}",
        "name": "Hypergeometric PMF"
      },
      {
        "explanation": "Sum of exact probabilities of all contingency tables as unlikely or less likely than observed.",
        "latex": "p = \\sum_{T : P(T) \\le P(T_{\\text{obs}})} P(T)",
        "name": "Fisher's Two-Sided p-value"
      }
    ],
    "numericalExample": "Tea Tasting Table: Milk first correctly identified: 3 (out of 4). Tea first correctly identified: 3 (out of 4). Table: [[3, 1], [1, 3]]. P(table) = [binom(4,3)*binom(4,1)] / binom(8,4) = (4 * 4) / 70 = 16/70 = 0.228. Extreme table [[4,0],[0,4]] has P = 1/70 = 0.014. Fisher p-value = 0.228 + 0.014 = 0.242.",
    "pythonCode": "from scipy import stats\n\ntable = [[3, 1], [1, 3]]\nodds_ratio, p_value = stats.fisher_exact(table)\nprint(f'Odds Ratio: {odds_ratio:.2f}, p-value: {p_value:.4f}')",
    "rCode": "tea <- matrix(c(3, 1, 1, 3), nrow=2)\nfisher.test(tea)",
    "pitfalls": "Using standard Chi-Square tests when expected cell counts are below 5; in that regime, Chi-square is inaccurate and Fisher's exact test is required.",
    "interactiveType": "fishers_exact",
    "quiz": [
      {
        "answer": 1,
        "explanation": "It calculates the exact hypergeometric probability of the observed configuration directly from combinatorics rather than approximating it via a continuous Chi-square distribution.",
        "options": [
          "It never makes an error",
          "It uses the exact combinatorial hypergeometric distribution rather than an asymptotic approximation",
          "It requires exact sample sizes",
          "It was invented by an exact scientist"
        ],
        "question": "Why is Fisher's Exact Test called 'exact'?"
      },
      {
        "answer": 1,
        "explanation": "Chi-square tests rely on asymptotic normal approximations that fail when expected cell counts are small (typically < 5). Fisher's exact test computes exact hypergeometric probabilities.",
        "options": [
          "Only when sample sizes are above 10,000",
          "When expected cell counts in any cell fall below 5, where asymptotic chi-square approximations break down",
          "Only when comparing continuous variables",
          "Whenever the variance is greater than the mean"
        ],
        "question": "When should Fisher's Exact Test be preferred over the Chi-Square test of independence in a 2x2 contingency table?"
      },
      {
        "answer": 1,
        "explanation": "Fisher's exact test conditions on both marginal totals (row and column margins) being fixed, evaluating the probability of observed internal cell configurations.",
        "options": [
          "Only the total sample size",
          "Both the row totals and column totals (marginal sums)",
          "The diagonal products only",
          "The p-value itself"
        ],
        "question": "In the hypergeometric distribution modeling a 2x2 contingency table, what quantities are treated as fixed constants?"
      }
    ]
  },
  {
    "index": 13,
    "id": "JQc3yx0-Q9E",
    "title": "How to calculate p-values",
    "shortTitle": "How to Calculate p-values",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "8:45",
    "embedUrl": "https://www.youtube-nocookie.com/embed/JQc3yx0-Q9E?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=JQc3yx0-Q9E&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=13",
    "summary": "Step-by-step walkthrough of computing test statistics (Z, t, F) and integrating the null distribution's tail area to determine p-values.",
    "bamIntuition": "Calculate your test statistic (how far your data is from zero in noise units). Look up that number on the null curve. The shaded area in the tail is your p-value! BAM!",
    "firstPrinciples": "Calculating a p-value consists of three rigorous mathematical steps: 1. State $H_0$ and derive the reference distribution for the test statistic $T$ under $H_0$. 2. Compute the sample statistic $t_{\\text{obs}} = \\frac{\\text{Estimate} - \\text{Null Value}}{\\text{Standard Error}}$. 3. Integrate the tail area: For two-tailed tests with symmetric distributions, $p = 2 \\int_{|t_{\\text{obs}}|}^\\infty f_T(u) du$.",
    "mathFormulas": [
      {
        "explanation": "Measures signal-to-noise ratio in units of standard error.",
        "latex": "t_{\\text{obs}} = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}",
        "name": "Standardized Test Statistic"
      },
      {
        "explanation": "Doubling the one-sided tail area for symmetric distributions.",
        "latex": "p = 2 \\cdot \\left[1 - F_T(|t_{\\text{obs}}|)\\right]",
        "name": "Two-Tailed Tail Integral"
      }
    ],
    "numericalExample": "Testing sample mean = 105 against mu0 = 100 with s = 10, n = 25. SE = 10 / sqrt(25) = 2.0. t = (105 - 100)/2 = 2.50. Degrees of freedom = 24. Look up t = 2.5 on t-distribution with 24 df: One-tail p = 0.0099. Two-tail p = 2 * 0.0099 = 0.0198 (p < 0.05).",
    "pythonCode": "from scipy import stats\n\nt_stat = 2.50\ndf = 24\np_val = 2 * (1 - stats.t.cdf(abs(t_stat), df=df))\nprint(f'Two-tailed p-value: {p_val:.4f}')",
    "rCode": "p_val <- 2 * (1 - pt(2.5, df=24))\ncat('Two-tailed p-value:', p_val)",
    "pitfalls": "Forgetting to multiply by 2 when performing a two-tailed test, erroneously reporting a one-tailed p-value that is half as large.",
    "interactiveType": "p_value_calc",
    "quiz": [
      {
        "answer": 2,
        "explanation": "Standard error of the sample mean is sample standard deviation divided by the square root of sample size: s / sqrt(n).",
        "options": [
          "s",
          "s^2 / n",
          "s / sqrt(n)",
          "sigma * n"
        ],
        "question": "What is the standard error in the denominator of a one-sample t-statistic?"
      },
      {
        "answer": 1,
        "explanation": "In a two-tailed test with symmetric null density, extreme values occur at both T >= +2.40 and T <= -2.40, so p = 2 * P(T >= 2.40).",
        "options": [
          "P(T >= 2.40)",
          "2 * P(T >= 2.40)",
          "1 - P(T <= 2.40)",
          "P(T = 2.40)"
        ],
        "question": "For a two-tailed test with a symmetric null distribution and an observed test statistic t_obs = +2.40, how is the p-value calculated?"
      },
      {
        "answer": 2,
        "explanation": "If the test statistic lies inside the central 95% region, the tail areas outside it sum to more than 5%, so p > 0.05.",
        "options": [
          "p < 0.01",
          "p < 0.05",
          "p > 0.05",
          "p = 0.00"
        ],
        "question": "If your test statistic falls inside the middle 95% of the null distribution, what is the two-tailed p-value?"
      }
    ]
  },
  {
    "index": 14,
    "id": "HDCOUXE3HMM",
    "title": "p-hacking: What it is and how to avoid it!",
    "shortTitle": "p-hacking: What It Is & How to Avoid It",
    "moduleId": "module-6",
    "category": "Statistical Errors & Power",
    "duration": "7:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/HDCOUXE3HMM?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=HDCOUXE3HMM&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=14",
    "summary": "How questionable research practices, optional stopping, and post-hoc subgroup analysis inflate false positive rates, and how preregistration solves it.",
    "bamIntuition": "If you test 20 different jelly bean colors, one will show p < 0.05 purely by random chance! That's not science, that's p-hacking! BAM!",
    "firstPrinciples": "If $m$ independent hypotheses are tested where all nulls are true, the probability of at least one false positive (Family-Wise Error Rate) is $\\alpha_{\\text{family}} = 1 - (1 - \\alpha)^m$. For $\\alpha = 0.05$ and $m = 20$, $\\alpha_{\\text{family}} = 1 - (0.95)^{20} \\approx 0.642$ (a 64.2% chance of a spurious discovery!). Common p-hacking strategies include: collecting data until p < 0.05 (optional stopping), trying multiple outlier removal rules, switching dependent variables, and exploring arbitrary subgroup interactions.",
    "mathFormulas": [
      {
        "explanation": "The probability of at least one spurious p < 0.05 across m tests.",
        "latex": "\\alpha_{\\text{family}} = 1 - (1 - \\alpha)^m",
        "name": "Family-Wise False Positive Rate"
      },
      {
        "explanation": "Repeatedly testing accumulating data guarantees eventual false rejection.",
        "latex": "P(\\text{Reject } H_0 \\text{ eventually}) \\to 1.0",
        "name": "Optional Stopping Bias"
      }
    ],
    "numericalExample": "Testing 40 food items against cancer risk with no true effects. Expected false positives = 40 * 0.05 = 2 foods falsely linked to cancer at p < 0.05! Headline: 'Scientists find green jelly beans cause cancer!'",
    "pythonCode": "import numpy as np\n\n# Simulate 20 independent experiments under true null\nnp.random.seed(42)\np_values = np.random.uniform(0, 1, size=20)\nfalse_positives = np.sum(p_values < 0.05)\nprint(f'Significant results purely by luck: {false_positives}')\nprint(f'Minimum p-value found: {np.min(p_values):.4f}')",
    "rCode": "set.seed(42)\np_vals <- runif(20)\ncat('False positives:', sum(p_vals < 0.05), 'Min p:', min(p_vals))",
    "pitfalls": "Treating exploratory data mining as confirmatory hypothesis testing without adjusting alpha or preregistering hypotheses.",
    "interactiveType": "p_hacking",
    "quiz": [
      {
        "answer": 2,
        "explanation": "1 - (1 - 0.05)^20 = 1 - (0.95)^20 = 1 - 0.3585 = 0.6415 (64.2%).",
        "options": [
          "5%",
          "20%",
          "64.2%",
          "100%"
        ],
        "question": "What is the probability of at least one false positive when performing 20 independent tests at alpha = 0.05?"
      },
      {
        "answer": 1,
        "explanation": "p-hacking exploits researcher degrees of freedom by iteratively modifying analysis decisions until an arbitrary significance threshold is crossed.",
        "options": [
          "Pre-registering sample size, hypotheses, and analysis scripts before data collection",
          "Testing multiple subgroups, dropping outliers post-hoc, or stopping data collection early once p < 0.05 is reached",
          "Reporting all measured dependent variables regardless of significance",
          "Performing power calculations before applying for a grant"
        ],
        "question": "Which researcher behavior constitutes 'p-hacking'?"
      },
      {
        "answer": 2,
        "explanation": "The probability of no false positives is (1 - 0.05)^20 = 0.95^20 approx 35.85%. Thus the family-wise error rate is 1 - 0.3585 = 64.15%.",
        "options": [
          "5%",
          "20 * 5% = 100%",
          "1 - (1 - 0.05)^20 = 64.15%",
          "0.05^20"
        ],
        "question": "If you test 20 independent hypotheses at significance level alpha = 0.05 when all null hypotheses are completely true, what is the probability of obtaining AT LEAST ONE false positive?"
      }
    ]
  },
  {
    "index": 15,
    "id": "L3nlGfSyHV0",
    "title": "False Discovery Rates, FDR, clearly explained",
    "shortTitle": "False Discovery Rates (FDR)",
    "moduleId": "module-6",
    "category": "Statistical Errors & Power",
    "duration": "9:35",
    "embedUrl": "https://www.youtube-nocookie.com/embed/L3nlGfSyHV0?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=L3nlGfSyHV0&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=15",
    "summary": "Controlling the proportion of false positives among rejected hypotheses using the Benjamini-Hochberg (BH) procedure in high-throughput data.",
    "bamIntuition": "Bonferroni is super strict: it guarantees ZERO mistakes, but kills your real discoveries. FDR is smarter: it allows a controlled percentage (like 5%) of your discoveries to be false, keeping the rest! BAM!",
    "firstPrinciples": "Let $R$ be total rejections and $V$ be false rejections (Type I errors). False Discovery Rate is defined as $\\text{FDR} = E\\left[\\frac{V}{R} \\mid R > 0\\right] P(R > 0)$. The Benjamini-Hochberg (BH) step-up algorithm sorts $m$ p-values in ascending order: $p_{(1)} \\le p_{(2)} \\le \\dots \\le p_{(m)}$. It finds the largest rank $k$ such that $p_{(k)} \\le \\frac{k}{m} Q$, where $Q$ is the target FDR. It rejects all null hypotheses for $i = 1, \\dots, k$, provably controlling $\\text{FDR} \\le Q$ under independent or positively dependent tests.",
    "mathFormulas": [
      {
        "explanation": "Threshold line scaling linearly with rank k to control FDR at level Q.",
        "latex": "p_{(k)} \\le \\frac{k}{m} \\cdot Q",
        "name": "Benjamini-Hochberg Condition"
      },
      {
        "explanation": "FDR is less conservative and far more powerful than Family-Wise Error Rate.",
        "latex": "\\text{FDR} = E\\left[\\frac{V}{\\max(R, 1)}\\right] \\le \\text{FWER} = P(V \\ge 1)",
        "name": "FDR vs FWER"
      }
    ],
    "numericalExample": "Testing 5 genes with sorted p-values: [0.001, 0.010, 0.025, 0.040, 0.150]. Target FDR Q = 0.05, m = 5. Thresholds (k/5)*0.05: k=1: 0.010 (0.001 <= 0.010 OK); k=2: 0.020 (0.010 <= 0.020 OK); k=3: 0.030 (0.025 <= 0.030 OK); k=4: 0.040 (0.040 <= 0.040 OK); k=5: 0.050 (0.150 > 0.050 NO). Reject top 4 genes!",
    "pythonCode": "from statsmodels.stats.multitest import multipletests\n\np_vals = [0.001, 0.010, 0.025, 0.040, 0.150]\nrejected, p_adj, _, _ = multipletests(p_vals, alpha=0.05, method='fdr_bh')\nprint('Rejected:', rejected)\nprint('Adjusted p-values (q-values):', p_adj.round(4))",
    "rCode": "p_vals <- c(0.001, 0.010, 0.025, 0.040, 0.150)\np.adjust(p_vals, method='BH')",
    "pitfalls": "Using Bonferroni correction in genomics or proteomics with 20,000 genes; $\\alpha = 0.05/20000 = 2.5 \\times 10^{-6}$, resulting in zero statistical power.",
    "interactiveType": "fdr_bh",
    "quiz": [
      {
        "answer": 0,
        "explanation": "Bonferroni controls FWER (P(at least one false positive)), whereas BH controls FDR (expected ratio of false positives among reported discoveries).",
        "options": [
          "Bonferroni controls the chance of ANY false positive, while BH controls the fraction of false positives among all discoveries",
          "Bonferroni is for continuous data, BH is for discrete data",
          "BH is stricter than Bonferroni",
          "Bonferroni controls Type II errors"
        ],
        "question": "What is the difference between Bonferroni correction and Benjamini-Hochberg FDR?"
      },
      {
        "answer": 1,
        "explanation": "FWER is conservative: it ensures P(V >= 1) <= alpha. FDR allows discoveries while guaranteeing that among declared discoveries, on average no more than q% are false.",
        "options": [
          "FDR controls the probability of making at least one false positive; FWER controls the expected proportion of false positives among rejected tests",
          "FDR controls the expected proportion of false positives among all rejected nulls; FWER controls the probability of making even one false positive",
          "FDR and FWER are mathematically identical in all scenarios",
          "FDR is only applicable when sample size n < 10"
        ],
        "question": "How does False Discovery Rate (FDR) control differ conceptually from Family-Wise Error Rate (FWER) control like Bonferroni?"
      },
      {
        "answer": 1,
        "explanation": "Benjamini-Hochberg ranks p-values p_(1) <= ... <= p_(m) and finds the largest k such that p_(k) <= (k/m) * q.",
        "options": [
          "q / m",
          "(k / m) * q",
          "k * q",
          "q / k"
        ],
        "question": "In the Benjamini-Hochberg procedure with m tests and target FDR q, what is the critical threshold for the k-th sorted p-value p_(k)?"
      }
    ]
  },
  {
    "index": 16,
    "id": "Rsc5znwR5FA",
    "title": "Statistical Power, Clearly Explained!!!",
    "shortTitle": "Statistical Power",
    "moduleId": "module-6",
    "category": "Statistical Errors & Power",
    "duration": "8:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/Rsc5znwR5FA?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=Rsc5znwR5FA&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=16",
    "summary": "Statistical power (1 - beta) is the probability of correctly rejecting a false null hypothesis, ensuring genuine biological or physical effects are detected.",
    "bamIntuition": "Power is the sensitivity of your scientific detector! If a real effect exists, power is the chance your experiment actually spots it instead of missing it like a blind bat. BAM!",
    "firstPrinciples": "In decision theory, four outcomes exist: True Negative ($1 - \\alpha$), False Positive Type I error ($\\alpha$), False Negative Type II error ($\\beta$), and True Positive Power ($1 - \\beta$). Power is formally defined as $1 - \\beta = P(\\text{Reject } H_0 \\mid H_1 \\text{ is true})$. Power increases monotonically with: 1. Larger sample size $n$; 2. Larger true effect size $\\delta = |\\mu_1 - \\mu_0|$; 3. Lower measurement noise $\\sigma$; and 4. Higher significance threshold $\\alpha$.",
    "mathFormulas": [
      {
        "explanation": "Probability of rejecting the null when the true mean difference is mu1 - mu0.",
        "latex": "1 - \\beta = \\Phi\\left(\\frac{|\\mu_1 - \\mu_0|}{\\sigma / \\sqrt{n}} - z_{1 - \\alpha/2}\\right)",
        "name": "Statistical Power Formula"
      },
      {
        "explanation": "Probability of a false negative result.",
        "latex": "\\beta = P(\\text{Fail to reject } H_0 \\mid H_1 \\text{ is true})",
        "name": "Type II Error Rate"
      }
    ],
    "numericalExample": "Suppose effect size delta = 5, sigma = 10, alpha = 0.05 (z_crit = 1.96). With n = 16: SE = 10 / sqrt(16) = 2.5. Z_shift = 5 / 2.5 = 2.0. Power = Phi(2.0 - 1.96) = Phi(0.04) = 51.6% (almost a coin flip!). With n = 64: SE = 1.25. Z_shift = 5 / 1.25 = 4.0. Power = Phi(4.0 - 1.96) = Phi(2.04) = 97.9%!",
    "pythonCode": "from statsmodels.stats.power import TTestIndPower\n\nanalysis = TTestIndPower()\neffect_size = 0.5  # Cohen's d\npower = analysis.power(effect_size=effect_size, nobs1=64, alpha=0.05)\nprint(f'Calculated Statistical Power: {power:.3f}')",
    "rCode": "power.t.test(n=64, delta=0.5, sd=1, sig.level=0.05, type='two.sample')",
    "pitfalls": "Running studies with low power (e.g. 20%). When low-power studies do find p < 0.05, effect sizes are dramatically overestimated (the Winner's Curse).",
    "interactiveType": "power",
    "quiz": [
      {
        "answer": 1,
        "explanation": "By definition, Power = 1 - beta. If Power is 80% (0.80), then beta = 1 - 0.80 = 20% (0.20).",
        "options": [
          "80%",
          "20%",
          "5%",
          "10%"
        ],
        "question": "If statistical power is 80%, what is the Type II error rate beta?"
      },
      {
        "answer": 1,
        "explanation": "A larger true effect size shifts the alternative distribution further away from the null mean, placing a larger portion of its mass beyond the critical threshold.",
        "options": [
          "Power decreases",
          "Power increases",
          "Power remains unchanged",
          "Power drops to zero"
        ],
        "question": "If the true effect size in a clinical population increases while sample size and significance level alpha remain constant, what happens to statistical power?"
      },
      {
        "answer": 1,
        "explanation": "Beta is the probability of failing to reject a false null hypothesis (Type II error). Power is the probability of correctly rejecting it: 1 - beta.",
        "options": [
          "Power = 1 - alpha",
          "Power = 1 - beta",
          "Power = beta / alpha",
          "Power = alpha * beta"
        ],
        "question": "What is the mathematical definition of statistical power in terms of the Type II error rate beta?"
      }
    ]
  },
  {
    "index": 17,
    "id": "VX_M3tIyiYk",
    "title": "Power Analysis, Clearly Explained!!!",
    "shortTitle": "Power Analysis",
    "moduleId": "module-6",
    "category": "Statistical Errors & Power",
    "duration": "6:45",
    "embedUrl": "https://www.youtube-nocookie.com/embed/VX_M3tIyiYk?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=VX_M3tIyiYk&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=17",
    "summary": "Prospective power analysis calculates the minimum sample size required before running an experiment to achieve a desired detection probability.",
    "bamIntuition": "Don't guess how many mice or patients you need! Do a Power Analysis BEFORE spending millions of dollars to ensure you have enough data to see the effect! BAM!",
    "firstPrinciples": "Prospective sample size determination solves for $n$ in the power equation: $n = \\frac{(z_{1 - \\alpha/2} + z_{1 - \\beta})^2 \\sigma^2}{(\\mu_1 - \\mu_0)^2} = \\frac{(z_{1 - \\alpha/2} + z_{1 - \\beta})^2}{d^2}$, where $d = \\frac{|\\mu_1 - \\mu_0|}{\\sigma}$ is Cohen's standardized effect size. Retrospective or post-hoc power calculated using the observed sample effect size is tautological and mathematically invalid.",
    "mathFormulas": [
      {
        "explanation": "Required sample size per group for a two-sample t-test with standardized effect d.",
        "latex": "n = 2 \\cdot \\left(\\frac{z_{1-\\alpha/2} + z_{1-\\beta}}{d}\\right)^2",
        "name": "Sample Size Equation"
      },
      {
        "explanation": "Difference between group means divided by pooled standard deviation.",
        "latex": "d = \\frac{\\mu_1 - \\mu_2}{\\sigma_{\\text{pooled}}}",
        "name": "Cohen's d"
      }
    ],
    "numericalExample": "To detect a medium effect size d = 0.5 at alpha = 0.05 (z = 1.96) with 80% power (z = 0.84): n = 2 * ((1.96 + 0.84) / 0.5)^2 = 2 * (2.80 / 0.5)^2 = 2 * (5.6)^2 = 2 * 31.36 = 62.72. You need 63 subjects per group (126 total).",
    "pythonCode": "from statsmodels.stats.power import TTestIndPower\n\nanalysis = TTestIndPower()\nn_required = analysis.solve_power(effect_size=0.5, power=0.80, alpha=0.05)\nprint(f'Required n per group: {int(np.ceil(n_required))}')",
    "rCode": "res <- power.t.test(delta=0.5, sd=1, power=0.8, sig.level=0.05)\ncat('Required n per group:', ceiling(res$n))",
    "pitfalls": "Calculating 'post-hoc power' from observed p-values; if p > 0.05, post-hoc power is guaranteed to look low, adding zero new information.",
    "interactiveType": "power_analysis",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because n is inversely proportional to d^2, halving d requires (2)^2 = 4 times as many samples.",
        "options": [
          "2x",
          "4x",
          "8x",
          "1.41x"
        ],
        "question": "If you want to double your detection resolution (cut effect size in half), by what factor must sample size increase?"
      },
      {
        "answer": 1,
        "explanation": "Since SE = sigma / sqrt(n), reducing SE by half requires multiplying n by 4, because sqrt(4n) = 2*sqrt(n).",
        "options": [
          "By a factor of 2",
          "By a factor of 4",
          "By a factor of 8",
          "By a factor of sqrt(2)"
        ],
        "question": "To halve the standard error of an estimate or double precision, by what factor must you increase the sample size n?"
      },
      {
        "answer": 1,
        "explanation": "Post-hoc observed power simply mirrors the observed p-value: non-significant results will always show low post-hoc power, creating a circular justification.",
        "options": [
          "Because computers cannot calculate post-hoc power accurately",
          "Because post-hoc power is merely a 1-to-1 mathematical transformation of the observed p-value, adding zero new information",
          "Because power can only be calculated for sample sizes under 30",
          "Because post-hoc power assumes beta = 0"
        ],
        "question": "Why is 'post-hoc power' (power calculated using the observed effect size after completing an experiment) widely regarded as useless or misleading?"
      }
    ]
  },
  {
    "index": 18,
    "id": "qtaqvPAeEJY",
    "title": "Covariance, Clearly Explained!!!",
    "shortTitle": "Covariance",
    "moduleId": "module-8",
    "category": "Covariance & Correlation",
    "duration": "7:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/qtaqvPAeEJY?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=qtaqvPAeEJY&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=18",
    "summary": "Covariance measures the joint variability of two random variables, indicating whether they tend to increase together or move inversely.",
    "bamIntuition": "When X is bigger than average, does Y also jump above average? If yes, their product is positive! Average those products, and BAM: Positive Covariance!",
    "firstPrinciples": "The covariance between random variables $X$ and $Y$ is defined as $\\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]$. If $X$ and $Y$ are independent, $\\text{Cov}(X, Y) = 0$ (the converse is not generally true). The sample covariance is $s_{xy} = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})$. The units of covariance are the product of the units of $X$ and $Y$, making its raw numerical magnitude difficult to interpret without standardization.",
    "mathFormulas": [
      {
        "explanation": "Expected product of deviations from respective means.",
        "latex": "\\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)]",
        "name": "Population Covariance"
      },
      {
        "explanation": "Unbiased estimator using n-1 degrees of freedom.",
        "latex": "s_{xy} = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})",
        "name": "Sample Covariance"
      }
    ],
    "numericalExample": "Pairs (X: Height in in, Y: Weight in lbs): (65, 130), (70, 160), (75, 190). x_bar = 70, y_bar = 160. Deviations: (-5, -30), (0, 0), (+5, +30). Products: (-5)*(-30) = 150; 0*0 = 0; (+5)*(+30) = 150. Sum = 300. Sample Covariance = 300 / (3 - 1) = 150 in*lbs.",
    "pythonCode": "import numpy as np\n\nx = np.array([65, 70, 75])\ny = np.array([130, 160, 190])\ncov_matrix = np.cov(x, y)\nprint('Sample Covariance:', cov_matrix[0, 1])",
    "rCode": "x <- c(65, 70, 75); y <- c(130, 160, 190)\ncov(x, y)",
    "pitfalls": "Assuming a large covariance means a stronger relationship than a small covariance. Covariance depends directly on the units of scale (e.g. measuring in grams vs kilograms changes covariance by 1,000x).",
    "interactiveType": "covariance",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Independence implies zero covariance, but zero covariance does not imply independence (e.g. Y = X^2 with symmetric X around 0 has Cov = 0 but perfect deterministic dependence).",
        "options": [
          "Yes, always",
          "No, zero covariance only rules out linear correlation; non-linear dependencies can still exist",
          "Only if both variables are discrete",
          "Only if sample size > 30"
        ],
        "question": "If Cov(X, Y) = 0, are X and Y guaranteed to be independent?"
      },
      {
        "answer": 1,
        "explanation": "Raw covariance depends on the arbitrary measurement units of X and Y. Measuring height in millimeters instead of meters multiplies covariance by 1,000 without changing the relationship.",
        "options": [
          "Covariance cannot be negative",
          "Covariance is scale-dependent (units are unit_X * unit_Y), making its magnitude uninterpretable across different scales",
          "Covariance assumes variables follow a uniform distribution",
          "Covariance is only defined for integer variables"
        ],
        "question": "What is the primary practical limitation of raw covariance compared to Pearson's correlation coefficient?"
      },
      {
        "answer": 1,
        "explanation": "Independence implies E[XY] = E[X]E[Y], so Cov(X, Y) = E[XY] - E[X]E[Y] = 0. (Note that the converse is not always true for non-linear relationships).",
        "options": [
          "Exactly 1.0",
          "Exactly 0",
          "-1.0",
          "Undefined"
        ],
        "question": "If two random variables X and Y are statistically independent, what is their population covariance Cov(X, Y)?"
      }
    ]
  },
  {
    "index": 19,
    "id": "xZ_z8KWkhXE",
    "title": "Pearson's Correlation, Clearly Explained!!!",
    "shortTitle": "Pearson's Correlation",
    "moduleId": "module-8",
    "category": "Covariance & Correlation",
    "duration": "8:20",
    "embedUrl": "https://www.youtube-nocookie.com/embed/xZ_z8KWkhXE?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=xZ_z8KWkhXE&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=19",
    "summary": "Standardizing covariance by the product of both standard deviations produces Pearson's r, a dimensionless metric bounded strictly between -1 and +1.",
    "bamIntuition": "Covariance with units stripped away! Divide covariance by both standard deviations, and BAM: you get a pure number between -1 and +1 that tells you how tight the line is!",
    "firstPrinciples": "Pearson's product-moment correlation coefficient is defined as $\\rho_{X,Y} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$. By the Cauchy-Schwarz inequality, $|\text{Cov}(X,Y)| \\le \\sqrt{\\text{Var}(X)\\text{Var}(Y)}$, proving that $-1 \\le \\rho \\le 1$. $\\rho = +1$ (or $-1$) occurs if and only if $Y = aX + b$ with $a > 0$ (or $a < 0$) with probability 1. Geometrically, $\\rho$ is the cosine of the angle $\\theta$ between the mean-centered observation vectors in $\\mathbb{R}^n$: $r = \\cos \\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$.",
    "mathFormulas": [
      {
        "explanation": "Ratio of sample covariance to maximum possible covariance.",
        "latex": "r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2} \\sqrt{\\sum_{i=1}^n (y_i - \\bar{y})^2}}",
        "name": "Pearson's r"
      },
      {
        "explanation": "Correlation is invariant to positive linear scaling and shifts.",
        "latex": "r(aX + b, cY + d) = \\text{sgn}(ac) \\cdot r(X, Y)",
        "name": "Dimensionless Invariance"
      }
    ],
    "numericalExample": "Using the previous example: s_xy = 150. s_x = sqrt(50/2) = 5. s_y = sqrt(1800/2) = 30. r = 150 / (5 * 30) = 150 / 150 = +1.0. A perfect positive linear relationship.",
    "pythonCode": "import numpy as np\nfrom scipy import stats\n\nx = np.array([65, 70, 75])\ny = np.array([130, 160, 190])\nr, p_val = stats.pearsonr(x, y)\nprint(f'Pearson r: {r:.4f}, p-value: {p_val:.4f}')",
    "rCode": "x <- c(65, 70, 75); y <- c(130, 160, 190)\ncor.test(x, y)",
    "pitfalls": "Assuming correlation equals causation, or assuming r = 0 means no relationship exists (e.g. parabolic data $Y = X^2$ has $r \\approx 0$ despite perfect deterministic coupling).",
    "interactiveType": "cov3d",
    "quiz": [
      {
        "answer": 1,
        "explanation": "In linear algebra, the centered correlation coefficient equals the dot product divided by vector norms, which is exactly cos(theta).",
        "options": [
          "The slope of the line",
          "The cosine of the angle between the two vectors in data space",
          "The area of the projection",
          "The Euclidean distance between endpoints"
        ],
        "question": "What is the geometric interpretation of Pearson's r between two centered data vectors?"
      },
      {
        "answer": 1,
        "explanation": "Pearson's r is bounded in [-1, 1] by the Cauchy-Schwarz inequality. r = -1 indicates all data points lie exactly on a downward-sloping straight line.",
        "options": [
          "Range [0, 1]; no relationship",
          "Range [-1, 1]; perfect inverse linear relationship",
          "Range (-infinity, infinity); undefined variance",
          "Range [-0.5, 0.5]; weak negative relationship"
        ],
        "question": "What is the theoretical range of Pearson's correlation coefficient r, and what does r = -1 signify?"
      },
      {
        "answer": 0,
        "explanation": "Anscombe created 4 distinct datasets with identical summary statistics (mean, variance, correlation r = 0.816, regression line) that appear completely different when plotted.",
        "options": [
          "Datasets with identical r, means, and variances can have wildly different shapes and relationships; you must always visualize your data",
          "Correlation implies causation when r > 0.8",
          "Linear regression should never use more than 11 data points",
          "All distributions eventually become normal"
        ],
        "question": "What critical lesson does Anscombe's Quartet teach researchers about the correlation coefficient r?"
      }
    ]
  },
  {
    "index": 20,
    "id": "_IgyaD7vOOA",
    "title": "Conditional Probabilities, Clearly Explained!!!",
    "shortTitle": "Conditional Probabilities",
    "moduleId": "module-11",
    "category": "Bayesian & Odds",
    "duration": "7:40",
    "embedUrl": "https://www.youtube-nocookie.com/embed/_IgyaD7vOOA?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=_IgyaD7vOOA&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=20",
    "summary": "Conditional probability quantifies the updated likelihood of an event occurring given that another event has already occurred.",
    "bamIntuition": "When you get new information, your universe shrinks! Conditional probability simply cuts down the denominator to only include the cases where the condition happened. BAM!",
    "firstPrinciples": "Given events $A, B \\in \\mathcal{F}$ with $P(B) > 0$, the conditional probability of $A$ given $B$ is defined by Kolmogorov as $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$. The condition event $B$ replaces the original sample space $\\Omega$ with $B$ as the new restricted universe, renormalizing probabilities so that $P(B \\mid B) = 1$. The multiplication rule follows: $P(A \\cap B) = P(A \\mid B) P(B) = P(B \\mid A) P(A)$. Two events are independent if and only if $P(A \\mid B) = P(A)$.",
    "mathFormulas": [
      {
        "explanation": "Probability of A restricted to the subspace where B has occurred.",
        "latex": "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}",
        "name": "Conditional Definition"
      },
      {
        "explanation": "Joint probability decomposed into conditional and marginal components.",
        "latex": "P(A \\cap B) = P(A \\mid B) \\cdot P(B)",
        "name": "Multiplication Rule"
      }
    ],
    "numericalExample": "A standard 52-card deck. Event A: Card is a King (4 cards). Event B: Card is a Face Card (12 cards). P(King | Face Card) = P(King and Face Card) / P(Face Card) = (4/52) / (12/52) = 4 / 12 = 1/3 (33.3%). Notice prior P(King) was 4/52 = 7.7%.",
    "pythonCode": "# Deck simulation\nfaces = 12\nkings = 4\np_king_given_face = kings / faces\nprint(f'P(King | Face Card) = {p_king_given_face:.3f}')",
    "rCode": "p_king_given_face <- 4 / 12\ncat('P(King | Face):', p_king_given_face)",
    "pitfalls": "Confusing P(A | B) with P(B | A) (the prosecutor's fallacy). The probability of having a sore throat given you have strep is 90%, but the probability of having strep given you have a sore throat might only be 10%.",
    "interactiveType": "conditional_prob",
    "quiz": [
      {
        "answer": 1,
        "explanation": "If conditioning on B leaves the probability of A unchanged, A and B are statistically independent.",
        "options": [
          "A and B are mutually exclusive",
          "A and B are independent",
          "P(B) must equal 1",
          "A contains B"
        ],
        "question": "If P(A | B) = P(A), what can we conclude about events A and B?"
      },
      {
        "answer": 1,
        "explanation": "The probability of event A given that event B has occurred restricts the sample space to B: P(A | B) = P(A and B) / P(B).",
        "options": [
          "P(A) * P(B)",
          "P(A cap B) / P(B), provided P(B) > 0",
          "P(A cup B) - P(B)",
          "P(B | A) / P(A)"
        ],
        "question": "What is the formal Kolmogorov definition of conditional probability P(A | B)?"
      },
      {
        "answer": 1,
        "explanation": "By definition of independence, the occurrence of event B provides zero information regarding event A, so P(A | B) = P(A).",
        "options": [
          "P(B)",
          "P(A)",
          "0",
          "1"
        ],
        "question": "If events A and B are statistically independent with non-zero probabilities, what does P(A | B) equal?"
      }
    ]
  },
  {
    "index": 21,
    "id": "9wCnvr7Xw4E",
    "title": "Bayes' Theorem, Clearly Explained!!!!",
    "shortTitle": "Bayes' Theorem",
    "moduleId": "module-11",
    "category": "Bayesian & Odds",
    "duration": "10:35",
    "embedUrl": "https://www.youtube-nocookie.com/embed/9wCnvr7Xw4E?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=9wCnvr7Xw4E&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=21",
    "summary": "Bayes' Theorem provides the mathematical framework for updating prior beliefs with empirical evidence to compute posterior probabilities.",
    "bamIntuition": "Start with your prior belief. Multiply by the likelihood of your test results. Normalize by all possible outcomes, and BAM: You get the updated posterior probability!",
    "firstPrinciples": "Equating the two forms of the intersection $P(A \\cap B) = P(B \\mid A)P(A) = P(A \\mid B)P(B)$ and dividing by $P(B)$ yields Bayes' Theorem: $P(A \\mid B) = \\frac{P(B \\mid A) P(A)}{P(B)}$. By the Law of Total Probability, the marginal evidence is $P(B) = P(B \\mid A)P(A) + P(B \\mid A^c)P(A^c)$. This illuminates the base-rate fallacy: when a condition is rare (low prior $P(A)$), even an accurate test produces a surprisingly high rate of false discoveries.",
    "mathFormulas": [
      {
        "explanation": "Posterior equals (Likelihood times Prior) divided by Evidence.",
        "latex": "P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}",
        "name": "Bayes' Theorem"
      },
      {
        "explanation": "Total probability of evidence aggregated over all partition states.",
        "latex": "P(B) = \\sum_{i} P(B \\mid A_i) P(A_i)",
        "name": "Law of Total Probability"
      }
    ],
    "numericalExample": "Rare disease affects 1 in 1000 people (Prior = 0.001). Test has 99% Sensitivity (P(+|D) = 0.99) and 95% Specificity (P(-|No D) = 0.95, so False Positive = 0.05). If you test positive, what is P(Disease | +)? Numerator = 0.99 * 0.001 = 0.00099. Denominator = (0.99 * 0.001) + (0.05 * 0.999) = 0.00099 + 0.04995 = 0.05094. P(Disease | +) = 0.00099 / 0.05094 = 1.94%! Despite a 99% accurate test, ~98% of positive tests are false alarms due to the low base rate.",
    "pythonCode": "prior = 0.001\nsensitivity = 0.99\nfalse_positive_rate = 0.05\n\np_pos = (sensitivity * prior) + (false_positive_rate * (1 - prior))\nposterior = (sensitivity * prior) / p_pos\nprint(f'P(Disease | Positive Test) = {posterior:.4f} ({posterior*100:.2f}%)')",
    "rCode": "prior <- 0.001; sens <- 0.99; fpr <- 0.05\np_pos <- sens * prior + fpr * (1 - prior)\nposterior <- (sens * prior) / p_pos\ncat('Posterior:', posterior)",
    "pitfalls": "Neglecting the prior base rate (base rate neglect). A 99% accurate medical test for a 1-in-a-million disease will yield overwhelmingly false positives.",
    "interactiveType": "bayes",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because 99.9% of the population is healthy, a 5% false positive rate across thousands of healthy individuals generates far more positive flags than the true positives.",
        "options": [
          "The test was poorly calibrated",
          "The vast number of healthy people tested overwhelms the small number of sick people",
          "Bayes Theorem does not apply to medicine",
          "The p-value is greater than 0.05"
        ],
        "question": "What is the primary reason why a 99% sensitive and 95% specific test produces mostly false positives for a very rare disease?"
      },
      {
        "answer": 2,
        "explanation": "P(H) represents the prior probability of hypothesis H before observing the new evidence D.",
        "options": [
          "The likelihood",
          "The posterior probability",
          "The prior probability",
          "The marginal likelihood"
        ],
        "question": "In Bayes' theorem P(H | D) = [P(D | H) * P(H)] / P(D), what is P(H) called?"
      },
      {
        "answer": 1,
        "explanation": "Out of 10,000 people, 10 have disease (approx 10 test positive) and 9,990 are healthy (approx 500 test positive). Positive predictive value is 10 / (10 + 500) approx 2%.",
        "options": [
          "Because the test is mathematically defective",
          "Because of the Base Rate Fallacy: the vast majority of tested people are healthy, so false positives outnumber true positives",
          "Because sensitivity and specificity must sum to 100%",
          "Because conditional probability cannot be applied to medicine"
        ],
        "question": "In rare disease screening (prevalence 0.1%), a diagnostic test has 99% sensitivity and 95% specificity. Why is the probability that a positive patient actually has the disease less than 20%?"
      }
    ]
  },
  {
    "index": 22,
    "id": "KLs_7b7SKi4",
    "title": "Expected Values, Main Ideas!!!",
    "shortTitle": "Expected Values: Main Ideas",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "6:20",
    "embedUrl": "https://www.youtube-nocookie.com/embed/KLs_7b7SKi4?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=KLs_7b7SKi4&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=22",
    "summary": "Expected value is the probability-weighted long-run average of all possible values a random variable can take.",
    "bamIntuition": "If you played a lottery game a million times, what would your average payoff be per ticket? Multiply each prize by its chance of winning, add them up, and BAM: Expected Value!",
    "firstPrinciples": "For a discrete random variable $X$ taking values in $\\mathcal{X}$ with probability mass function $p(x)$, the expected value is $E[X] = \\sum_{x \\in \\mathcal{X}} x \\, p(x)$, provided $\\sum |x| p(x) < \\infty$. By the Law of Large Numbers, the sample mean $\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i$ converges almost surely to $E[X]$ as $n \\to \\infty$. Expectation is linear: $E[aX + bY] = aE[X] + bE[Y]$ regardless of whether $X$ and $Y$ are independent.",
    "mathFormulas": [
      {
        "explanation": "Sum of values weighted by their respective probability masses.",
        "latex": "E[X] = \\sum_{i} x_i \\cdot P(X = x_i)",
        "name": "Discrete Expected Value"
      },
      {
        "explanation": "Expectation distributes linearly without requiring independence.",
        "latex": "E[aX + bY + c] = aE[X] + bE[Y] + c",
        "name": "Linearity of Expectation"
      }
    ],
    "numericalExample": "A raffle ticket costs $5. 1 ticket wins $1000 (prob 1/1000). 10 tickets win $50 (prob 10/1000). 989 tickets win $0. Expected prize: E[X] = (1000 * 0.001) + (50 * 0.010) + (0 * 0.989) = $1.00 + $0.50 + $0 = $1.50. Expected profit = $1.50 - $5.00 = -$3.50 per ticket.",
    "pythonCode": "import numpy as np\n\nprizes = np.array([1000, 50, 0])\nprobs = np.array([1/1000, 10/1000, 989/1000])\nexpected_payout = np.sum(prizes * probs)\nprint(f'Expected payout: ${expected_payout:.2f}')",
    "rCode": "prizes <- c(1000, 50, 0)\nprobs <- c(1/1000, 10/1000, 989/1000)\ncat('Expected payout: $', sum(prizes * probs))",
    "pitfalls": "Expecting the 'expected value' to be an outcome that can actually happen in a single trial (e.g. rolling a fair die has expected value 3.5, but you can never roll a 3.5).",
    "interactiveType": "expected_value",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Linearity of expectation holds unconditionally for all random variables, independent or dependent.",
        "options": [
          "Yes, always",
          "No, it holds unconditionally for any random variables",
          "Only if both variables are normal",
          "Only when variance is finite"
        ],
        "question": "Does linearity of expectation E[X + Y] = E[X] + E[Y] require X and Y to be independent?"
      },
      {
        "answer": 1,
        "explanation": "Linearity of expectation holds unconditionally for all random variables with finite expectations: E[aX + bY] = a*E[X] + b*E[Y], regardless of independence.",
        "options": [
          "a*E[X] + b*E[Y] only if X and Y are independent",
          "a*E[X] + b*E[Y] in all cases unconditionally",
          "a*E[X] * b*E[Y]",
          "sqrt(a*E[X] + b*E[Y])"
        ],
        "question": "By the linearity of expectation, for ANY two random variables X and Y (even if they are strongly correlated or dependent), what is E[aX + bY]?"
      },
      {
        "answer": 1,
        "explanation": "E[X] = (1/6)*(1 + 2 + 3 + 4 + 5 + 6) = 21 / 6 = 3.5. Note that the expected value need not be an outcome that can actually be observed on a single roll.",
        "options": [
          "3.0",
          "3.5",
          "4.0",
          "6.0"
        ],
        "question": "What is the expected value of a single roll of a fair standard six-sided die?"
      }
    ]
  },
  {
    "index": 23,
    "id": "OSPr6G6Ka-U",
    "title": "Expected Values for Continuous Variables!!!",
    "shortTitle": "Expected Values for Continuous Variables",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "7:05",
    "embedUrl": "https://www.youtube-nocookie.com/embed/OSPr6G6Ka-U?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=OSPr6G6Ka-U&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=23",
    "summary": "Extending expected value to continuous domains by taking the integral of value times density across the entire real number support.",
    "bamIntuition": "Think of a continuous probability density curve as a physical wooden board. Where can you put your finger so it balances perfectly without tipping? That balance point is the Expected Value! BAM!",
    "firstPrinciples": "For a continuous random variable $X$ with PDF $f(x)$, the expected value is defined as the Riemann-Stieltjes integral $E[X] = \\int_{-\\infty}^{\\infty} x \\, f(x) \\, dx$. Physically, this represents the first moment (center of mass). For functions $g(X)$, the Law of the Unconscious Statistician (LOTUS) guarantees $E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) \\, f(x) \\, dx$. The variance is the second central moment: $\\text{Var}(X) = E[(X - E[X])^2] = \\int_{-\\infty}^\\infty (x - \\mu)^2 f(x) dx$.",
    "mathFormulas": [
      {
        "explanation": "The probability-density weighted integral across the entire domain.",
        "latex": "E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\,dx",
        "name": "Continuous Expected Value"
      },
      {
        "explanation": "Calculating expectations of transformed functions without deriving their new PDF.",
        "latex": "E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) \\cdot f(x)\\,dx",
        "name": "LOTUS Formula"
      }
    ],
    "numericalExample": "For an exponential distribution with rate lambda = 2: f(x) = 2e^(-2x) for x >= 0. Integral of x * 2e^(-2x) dx from 0 to infinity using integration by parts gives 1/lambda = 1/2 = 0.5.",
    "pythonCode": "import scipy.integrate as integrate\nimport numpy as np\n\nlam = 2.0\n# E[X] = integral of x * lambda * exp(-lambda * x)\nval, _ = integrate.quad(lambda x: x * lam * np.exp(-lam * x), 0, np.inf)\nprint(f'Integrated Continuous Expected Value: {val:.4f}')",
    "rCode": "f <- function(x) x * 2 * exp(-2 * x)\nintegrate(f, lower=0, upper=Inf)$value",
    "pitfalls": "Assuming all continuous distributions have a finite expected value. The Cauchy distribution $f(x) = \\frac{1}{\\pi(1+x^2)}$ has symmetric density around 0, but its integral does not converge, so its expected value is undefined.",
    "interactiveType": "expected_continuous",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because f(x) is perfectly symmetric around 0, x * f(x) is an odd function, integrating to exactly 0.",
        "options": [
          "1",
          "0",
          "0.5",
          "Undefined"
        ],
        "question": "What is the expected value of a standard normal distribution N(0, 1)?"
      },
      {
        "answer": 1,
        "explanation": "For continuous random variables, the Riemann/Lebesgue integral replaces discrete summation: E[X] = int_{-infinity}^{infinity} x * f(x) dx.",
        "options": [
          "sum_{i=1}^n x_i / n",
          "Integral from -infinity to infinity of x * f(x) dx",
          "The maximum point where f'(x) = 0",
          "f(0)"
        ],
        "question": "How is the expected value E[X] of a continuous random variable X with probability density function f(x) formally defined?"
      },
      {
        "answer": 1,
        "explanation": "A continuous expectation exists only if the integral converges absolutely. For Cauchy distributions, extreme values occur too frequently for the integral to settle.",
        "options": [
          "Because it is asymmetric",
          "Because its tails decay so slowly (proportional to 1/x^2) that the integral int_{-infinity}^{infinity} |x| f(x) dx diverges to infinity",
          "Because its density exceeds 1.0",
          "Because it is discrete"
        ],
        "question": "The Cauchy distribution has a symmetric bell-like shape centered at zero, yet its expected value is mathematically undefined. Why?"
      }
    ]
  },
  {
    "index": 24,
    "id": "J8jNoF-K8E8",
    "title": "The Binomial Distribution and Test, Clearly Explained!!!",
    "shortTitle": "The Binomial Distribution and Test",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "9:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/J8jNoF-K8E8?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=J8jNoF-K8E8&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=24",
    "summary": "Models the number of successes in n independent Bernoulli trials with fixed probability p, providing exact hypothesis tests for proportions.",
    "bamIntuition": "Flip a coin 10 times. How many heads do you get? The Binomial Distribution counts all the different combinations of getting exactly k heads and gives you the exact probability! BAM!",
    "firstPrinciples": "Let $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Bernoulli}(p)$. The sum $K = \\sum_{i=1}^n X_i$ is distributed as $\\text{Binomial}(n, p)$. The probability mass function is $P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}$, where $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ accounts for trial permutations. The expectation is $E[K] = np$, and variance is $\\text{Var}(K) = np(1-p)$. The exact binomial test tests $H_0: p = p_0$ by summing tail probabilities without relying on asymptotic normal approximations.",
    "mathFormulas": [
      {
        "explanation": "Probability of exactly k successes in n independent trials.",
        "latex": "P(K = k) = \\binom{n}{k} p^k (1-p)^{n-k}",
        "name": "Binomial PMF"
      },
      {
        "explanation": "Mean and variance scaling directly with sample size n.",
        "latex": "E[K] = np, \\quad \\text{Var}(K) = np(1-p)",
        "name": "Binomial Mean & Variance"
      }
    ],
    "numericalExample": "10 patients receive a treatment with baseline recovery rate p = 0.5. 8 patients recover. Is the treatment significantly better? P(K >= 8) = P(8) + P(9) + P(10) = [binom(10,8) + binom(10,9) + binom(10,10)] * (0.5)^10 = (45 + 10 + 1) / 1024 = 56 / 1024 = 0.0547. Two-sided p-value = 2 * 0.0547 = 0.109 (not significant at alpha = 0.05).",
    "pythonCode": "from scipy import stats\n\nres = stats.binomtest(k=8, n=10, p=0.5, alternative='two-sided')\nprint(f'Binomial exact p-value: {res.pvalue:.4f}')",
    "rCode": "binom.test(8, 10, p=0.5)",
    "pitfalls": "Applying the binomial distribution when trials are dependent (e.g. sampling without replacement from a small finite population, which requires the hypergeometric distribution).",
    "interactiveType": "binomial",
    "quiz": [
      {
        "answer": 1,
        "explanation": "As n -> infinity with fixed p, the standardized binomial variable converges to standard normal N(0,1).",
        "options": [
          "It becomes an exponential distribution",
          "By the de Moivre-Laplace theorem, it converges to a Normal distribution",
          "It becomes uniform",
          "It collapses to 0"
        ],
        "question": "What happens to the shape of a Binomial(n, p) distribution as n becomes very large?"
      },
      {
        "answer": 0,
        "explanation": "A binomial experiment requires n identical Bernoulli trials that are independent with fixed probability of success p.",
        "options": [
          "Fixed n trials, independent trials, two mutually exclusive outcomes (success/failure), and constant success probability p",
          "Continuous measurements, normal errors, and equal variances",
          "Random trial count until first success occurs",
          "Poisson arrival counts with constant rate lambda"
        ],
        "question": "Which set of conditions defines a Binomial(n, p) experiment?"
      },
      {
        "answer": 1,
        "explanation": "For a sum of n independent Bernoulli variables each with variance p*(1-p), the total variance is Var(X) = n * p * (1 - p).",
        "options": [
          "n * p",
          "n * p * (1 - p)",
          "sqrt(n * p)",
          "p / n"
        ],
        "question": "What is the theoretical variance of a Binomial random variable with parameters n and p?"
      }
    ]
  },
  {
    "index": 25,
    "id": "YAlJCEDH2uY",
    "title": "The Central Limit Theorem, Clearly Explained!!!",
    "shortTitle": "The Central Limit Theorem",
    "moduleId": "module-4",
    "category": "CLT & Bootstrapping",
    "duration": "10:45",
    "embedUrl": "https://www.youtube-nocookie.com/embed/YAlJCEDH2uY?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=YAlJCEDH2uY&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=25",
    "summary": "The cornerstone of classical statistics: the sampling distribution of the sum or mean of independent random variables approaches a normal distribution as n grows.",
    "bamIntuition": "It doesn't matter if your original data is skewed, flat, exponential, or totally crazy! Take samples of size n, compute their averages, plot them, and BAM: A pristine normal bell curve appears!",
    "firstPrinciples": "Let $X_1, X_2, \\dots, X_n$ be independent, identically distributed random variables with mean $\\mu$ and finite variance $\\sigma^2 < \\infty$. Define the sample mean $\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^n X_i$. The standardized variable $Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}}$ converges in distribution to the standard normal: $Z_n \\xrightarrow{d} \\mathcal{N}(0, 1)$ as $n \\to \\infty$. The theorem guarantees that sample means are asymptotically normal, allowing statistical inference without knowing the exact parent population distribution.",
    "mathFormulas": [
      {
        "explanation": "Normalized sample mean converges to normal distribution with variance sigma^2.",
        "latex": "\\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2)",
        "name": "Central Limit Theorem"
      },
      {
        "explanation": "The standard deviation of the sample mean shrinks at rate 1/sqrt(n).",
        "latex": "\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}",
        "name": "Standard Error of the Mean"
      }
    ],
    "numericalExample": "Roll a fair 6-sided die: mu = 3.5, sigma = 1.71 (uniform discrete distribution). Sample size n = 36 dice rolls. The average of 36 rolls has expected mean = 3.5, and standard error = 1.71 / sqrt(36) = 1.71 / 6 = 0.285. By the CLT, the distribution of average roll is approximately N(3.5, 0.285^2).",
    "pythonCode": "import numpy as np\nimport matplotlib.pyplot as plt\n\n# Draw 10,000 sample means from a heavily skewed Exponential distribution\nnp.random.seed(42)\nsamples = [np.mean(np.random.exponential(scale=2.0, size=30)) for _ in range(10000)]\nprint(f'Mean of sample means: {np.mean(samples):.3f}')\nprint(f'Std of sample means: {np.std(samples):.3f} (Theory: {2.0 / np.sqrt(30):.3f})')",
    "rCode": "means <- replicate(10000, mean(rexp(30, rate=0.5)))\nhist(means, breaks=50, col='orange', main='CLT in Action')",
    "pitfalls": "Believing the individual data points become normally distributed as n increases. The raw data remains exponential or skewed; ONLY the sample mean becomes normally distributed!",
    "interactiveType": "clt",
    "quiz": [
      {
        "answer": 1,
        "explanation": "The CLT applies strictly to aggregations (sums, averages) of random variables, not individual observations.",
        "options": [
          "The individual observations in the population",
          "The sample mean or sum of independent observations",
          "The p-value",
          "The standard deviation"
        ],
        "question": "What becomes normally distributed under the Central Limit Theorem?"
      },
      {
        "answer": 1,
        "explanation": "CLT applies to the SAMPLING DISTRIBUTION OF THE MEAN, not the raw data. Even if the population is uniform or exponential, sample means become Gaussian.",
        "options": [
          "The individual observations in the population become normally distributed",
          "The distribution of sample averages converges to a normal distribution N(mu, sigma^2/n), regardless of the shape of the underlying population",
          "The population variance shrinks to zero",
          "All outliers disappear from the raw data"
        ],
        "question": "What does the Central Limit Theorem state about the distribution of sample averages x-bar as sample size n grows large?"
      },
      {
        "answer": 1,
        "explanation": "The variance of the sample mean is Var(x-bar) = sigma^2 / n, so its standard deviation (Standard Error) is sigma / sqrt(n).",
        "options": [
          "sigma * n",
          "sigma / sqrt(n)",
          "sigma^2 / n",
          "sqrt(sigma / n)"
        ],
        "question": "What is the standard deviation of the sampling distribution of the sample mean (known as the Standard Error)?"
      }
    ]
  },
  {
    "index": 26,
    "id": "Exk0OoRG0PQ",
    "title": "The Difference Between Technical and Biological Replicates",
    "shortTitle": "Technical vs Biological Replicates",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "5:55",
    "embedUrl": "https://www.youtube-nocookie.com/embed/Exk0OoRG0PQ?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=Exk0OoRG0PQ&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=26",
    "summary": "Technical replicates measure pipette or assay instrument noise, whereas biological replicates measure true organismal or population variability.",
    "bamIntuition": "Testing the same tube of blood 5 times tells you how good your machine is (Technical). Testing blood from 5 different patients tells you how diverse humans are (Biological)! Don't mix them up! BAM!",
    "firstPrinciples": "Total variance decomposes hierarchically: $\\sigma^2_{\\text{total}} = \\sigma^2_{\\text{biological}} + \\sigma^2_{\\text{technical}}$. Running $m$ technical replicates per biological subject reduces measurement error: $\\text{Var}(\\bar{Y}_i) = \\sigma^2_{\\text{bio}} + \\frac{\\sigma^2_{\\text{tech}}}{m}$. However, treating technical replicates as independent samples ($N = n \\cdot m$) creates pseudoreplication, inflating degrees of freedom and generating artificially tiny p-values that fail replication.",
    "mathFormulas": [
      {
        "explanation": "Averaging m technical repeats reduces instrument noise but cannot reduce biological spread.",
        "latex": "\\sigma^2_{\\text{observed}} = \\sigma^2_{\\text{biological}} + \\frac{\\sigma^2_{\\text{technical}}}{m}",
        "name": "Variance Decomposition"
      },
      {
        "explanation": "Hypothesis tests must use biological replicates for valid inference.",
        "latex": "df = n_{\\text{biological}} - 1",
        "name": "Degrees of Freedom Correction"
      }
    ],
    "numericalExample": "You treat 1 mouse and measure its liver RNA 10 times. You find p = 0.001. Do you have evidence the drug works on mice? NO! You have n = 1 biological mouse with 10 technical measurements. You cannot generalize to any other mouse.",
    "pythonCode": "# Demonstrating proper aggregation: average technical replicates first\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'mouse_id': [1, 1, 1, 2, 2, 2, 3, 3, 3],\n    'gene_expression': [10.2, 10.4, 10.1, 14.5, 14.1, 14.3, 12.0, 12.2, 12.1]\n})\nbio_level = df.groupby('mouse_id')['gene_expression'].mean()\nprint('Biological replicate means (n=3):\\n', bio_level)",
    "rCode": "data <- data.frame(mouse=rep(1:3, each=3), expr=c(10.2,10.4,10.1, 14.5,14.1,14.3, 12,12.2,12.1))\naggregate(expr ~ mouse, data=data, mean)",
    "pitfalls": "Pseudoreplication: claiming a sample size of N = 30 by measuring 3 mice 10 times each, leading to spurious high statistical significance.",
    "interactiveType": "replicates",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Pseudoreplication artificially deflates standard errors, producing bogus statistical significance for conclusions that do not generalize.",
        "options": [
          "It increases computation time",
          "Pseudoreplication: falsely inflated sample size leading to artificially low p-values",
          "It changes the mean",
          "It makes the variance negative"
        ],
        "question": "What is the primary danger of treating technical replicates as independent samples?"
      },
      {
        "answer": 1,
        "explanation": "Biological replicates capture true diversity in nature (different mice, patients, cell lines); technical replicates quantify experimental assay precision.",
        "options": [
          "Technical replicates measure variation between organisms; biological replicates measure pipetting error",
          "Biological replicates assess true biological variability across independent subjects; technical replicates assess instrument measurement noise",
          "Technical replicates are always cheaper than biological replicates",
          "There is no difference"
        ],
        "question": "What is the core distinction in purpose between technical replicates and biological replicates?"
      },
      {
        "answer": 0,
        "explanation": "Pseudoreplication treats dependent technical measurements as independent biological observations, artificially inflating sample size and degrees of freedom.",
        "options": [
          "Pseudoreplication",
          "Simpson's Paradox",
          "Berkson's Fallacy",
          "Ecological Fallacy"
        ],
        "question": "Treating 5 technical measurements from a single mouse as n = 5 independent samples in a two-sample t-test is an example of what statistical fallacy?"
      }
    ]
  },
  {
    "index": 27,
    "id": "67zCIqdeXpo",
    "title": "Sample Size and Effective Sample Size, Clearly Explained!!!",
    "shortTitle": "Sample Size & Effective Sample Size",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "7:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/67zCIqdeXpo?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=67zCIqdeXpo&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=27",
    "summary": "When observations are correlated across time or clusters, the effective sample size (N_eff) is significantly smaller than the nominal count N.",
    "bamIntuition": "If you survey 100 people from the exact same household, they all share the same TV and fridge! You don't have 100 independent opinions, you have an effective sample size of maybe 5! BAM!",
    "firstPrinciples": "For $n$ independent observations, the variance of the mean is $\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}$. When observations have pairwise correlation $\\rho > 0$, the variance expands: $\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}[1 + (n - 1)\\rho]$. Equating this to $\\frac{\\sigma^2}{n_{\\text{eff}}}$ yields the effective sample size formula: $n_{\\text{eff}} = \\frac{n}{1 + (n - 1)\\rho}$. Even a modest correlation dramatically slashes information content.",
    "mathFormulas": [
      {
        "explanation": "Effective independent observations in the presence of intraclass correlation rho.",
        "latex": "n_{\\text{eff}} = \\frac{n}{1 + (n - 1)\\rho}",
        "name": "Effective Sample Size"
      },
      {
        "explanation": "Factor by which variance is inflated due to cluster sampling.",
        "latex": "\\text{DEFF} = 1 + (m - 1)\\text{ICC}",
        "name": "Design Effect"
      }
    ],
    "numericalExample": "Suppose n = 100 observations have intraclass correlation rho = 0.20. n_eff = 100 / (1 + (99 * 0.20)) = 100 / (1 + 19.8) = 100 / 20.8 = 4.8! Your 100 correlated measurements provide no more statistical power than 5 truly independent samples!",
    "pythonCode": "n = 100\nrho = 0.20\nn_eff = n / (1 + (n - 1) * rho)\nprint(f'Nominal N: {n}, Effective Sample Size (N_eff): {n_eff:.2f}')",
    "rCode": "n <- 100; rho <- 0.2\nn_eff <- n / (1 + (n - 1) * rho)\ncat('Effective sample size:', n_eff)",
    "pitfalls": "Ignoring spatial or temporal autocorrelation in time series or spatial data, leading to severe overconfidence in regression models.",
    "interactiveType": "sample_size",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because correlated data contains redundant information, the effective independent sample size is strictly smaller than the total observation count.",
        "options": [
          "Effective sample size is greater than nominal",
          "Effective sample size is substantially smaller than nominal",
          "They are identical",
          "Effective sample size becomes infinite"
        ],
        "question": "If observations in a sample have strong positive correlation with each other, how does the effective sample size compare to the nominal sample size?"
      },
      {
        "answer": 1,
        "explanation": "Clustered or correlated data carry less unique information per observation than independent samples, reducing the effective degrees of freedom.",
        "options": [
          "N_eff is larger than N",
          "N_eff is smaller than N because correlated observations share redundant information",
          "N_eff equals N exactly",
          "N_eff is negative"
        ],
        "question": "When observations in a dataset are positively correlated (e.g. repeated measures or spatial clustering), how does the effective sample size N_eff compare to the nominal sample size N?"
      },
      {
        "answer": 1,
        "explanation": "ICC = sigma_between^2 / (sigma_between^2 + sigma_within^2). When ICC is high, individuals within the same cluster are very similar.",
        "options": [
          "The Pearson correlation between x and y",
          "The proportion of total variance explained by between-cluster differences",
          "The p-value of a regression slope",
          "The ratio of sample size to population size"
        ],
        "question": "What does the Intraclass Correlation Coefficient (ICC) quantify in clustered experimental designs?"
      }
    ]
  },
  {
    "index": 28,
    "id": "A82brFpdr9g",
    "title": "Standard Deviation vs Standard Error, Clearly Explained!!!",
    "shortTitle": "Standard Deviation vs Standard Error",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "6:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/A82brFpdr9g?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=A82brFpdr9g&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=28",
    "summary": "Standard deviation measures the biological spread of individual subjects; standard error measures the estimation precision of the sample mean.",
    "bamIntuition": "SD is about the INDIVIDUALS in the population. SE is about how accurately your MEAN is pinned down! As you gather more data, SD stays steady, but SE shrinks toward zero! BAM!",
    "firstPrinciples": "The standard deviation $\\sigma = \\sqrt{E[(X - \\mu)^2]}$ is a parameter of the population distribution that characterizes natural subject-to-subject variability. It does not decrease with sample size $n$. In contrast, the standard error $\\text{SE}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}$ is the standard deviation of the sampling distribution of the estimator $\\bar{x}$. By the law of large numbers, $\\text{SE} \\to 0$ as $n \\to \\infty$, reflecting increasing estimator precision.",
    "mathFormulas": [
      {
        "explanation": "Quantifies natural variation among individual measurements.",
        "latex": "s = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}",
        "name": "Standard Deviation (Individual Spread)"
      },
      {
        "explanation": "Quantifies sampling uncertainty of the mean estimator.",
        "latex": "\\text{SE}(\\bar{x}) = \\frac{s}{\\sqrt{n}}",
        "name": "Standard Error (Estimator Uncertainty)"
      }
    ],
    "numericalExample": "Adult human height has SD s = 3.0 inches. If you measure n = 100 people, the sample SD is still ~3.0 inches (people don't suddenly become identical). But SE = 3.0 / sqrt(100) = 0.3 inches. If you measure n = 10,000 people, SD is still ~3.0 inches, but SE = 3.0 / 100 = 0.03 inches!",
    "pythonCode": "import numpy as np\n\ndata_small = np.random.normal(70, 3, size=25)\ndata_large = np.random.normal(70, 3, size=2500)\nprint(f'N=25:   SD = {np.std(data_small, ddof=1):.2f}, SE = {stats.sem(data_small):.3f}')\nprint(f'N=2500: SD = {np.std(data_large, ddof=1):.2f}, SE = {stats.sem(data_large):.3f}')",
    "rCode": "x_small <- rnorm(25, 70, 3); x_large <- rnorm(2500, 70, 3)\ncat('Small SD:', sd(x_small), 'SE:', sd(x_small)/sqrt(25), '\\n')\ncat('Large SD:', sd(x_large), 'SE:', sd(x_large)/sqrt(2500))",
    "pitfalls": "Plotting error bars with SE instead of SD to deceptively make data variability appear small, or reporting SD when making inferences about mean differences.",
    "interactiveType": "sd_vs_se",
    "quiz": [
      {
        "answer": 0,
        "explanation": "Because SE = s / sqrt(n), replacing n with 4n divides the denominator by sqrt(4) = 2, halving the standard error.",
        "options": [
          "It is cut in half (divided by 2)",
          "It is divided by 4",
          "It stays the same",
          "It doubles"
        ],
        "question": "If you quadruple your sample size (4x data), what happens to the Standard Error of the mean?"
      },
      {
        "answer": 1,
        "explanation": "SD quantifies how widely dispersed individuals are around the mean. SE quantifies how much the sample mean would bounce around if the study were repeated.",
        "options": [
          "The precision of a sample statistic; the spread of individual observations",
          "The spread of individual observations in the population; the precision/uncertainty of a sample statistic",
          "Measurement error; biological error",
          "Non-normal spread; normal spread"
        ],
        "question": "Standard Deviation (SD) describes: whereas Standard Error (SE) describes:"
      },
      {
        "answer": 1,
        "explanation": "Sample SD estimates the fixed population spread sigma, which does not shrink with n. SE = s / sqrt(n) drops by sqrt(100/25) = 2 (halved).",
        "options": [
          "Both SD and SE are cut in half",
          "SD remains roughly constant (estimating population spread); SE is cut in half",
          "SD quadruples; SE remains constant",
          "SD is cut in half; SE remains constant"
        ],
        "question": "If you increase the sample size n from 25 to 100 in an experiment, what happens to the sample SD and the SE of the mean?"
      }
    ]
  },
  {
    "index": 29,
    "id": "XNgt7F6FqDU",
    "title": "The standard error, Clearly Explained!!!",
    "shortTitle": "The Standard Error",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "7:30",
    "embedUrl": "https://www.youtube-nocookie.com/embed/XNgt7F6FqDU?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=XNgt7F6FqDU&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=29",
    "summary": "Deep mathematical derivation of the standard error formula and how square root scaling governs the precision of all parameter estimators.",
    "bamIntuition": "Why is there a square root of n in the denominator? Because variance divides by n, and standard error is the square root of variance! To cut error in half, you need 4 times the data! BAM!",
    "firstPrinciples": "Let $X_1, \\dots, X_n$ be independent identically distributed with variance $\\text{Var}(X_i) = \\sigma^2$. The variance of the sum is $\\text{Var}\\left(\\sum X_i\\right) = \\sum \\text{Var}(X_i) = n\\sigma^2$. For the sample mean $\\bar{X} = \\frac{1}{n}\\sum X_i$, applying the scaling property of variance $\\text{Var}(aY) = a^2 \\text{Var}(Y)$ gives: $\\text{Var}(\\bar{X}) = \\text{Var}\\left(\\frac{1}{n} \\sum X_i\\right) = \\frac{1}{n^2} \\text{Var}\\left(\\sum X_i\\right) = \\frac{1}{n^2}(n\\sigma^2) = \\frac{\\sigma^2}{n}$. Taking the square root gives $\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}$.",
    "mathFormulas": [
      {
        "explanation": "Linearity of variance for independent random variables.",
        "latex": "\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}",
        "name": "Variance of the Mean"
      },
      {
        "explanation": "Square root of variance of sample mean.",
        "latex": "\\text{SE}(\\bar{X}) = \\sqrt{\\text{Var}(\\bar{X})} = \\frac{\\sigma}{\\sqrt{n}}",
        "name": "Standard Error"
      }
    ],
    "numericalExample": "A factory measures bolt diameters with sigma = 0.8 mm. If you test n = 16 bolts, SE = 0.8 / sqrt(16) = 0.20 mm. If you want SE = 0.05 mm (4x more precise): 0.05 = 0.8 / sqrt(n) -> sqrt(n) = 16 -> n = 256 bolts.",
    "pythonCode": "sigma = 0.8\nfor n in [4, 16, 64, 256]:\n    se = sigma / np.sqrt(n)\n    print(f'N = {n:3d} -> Standard Error = {se:.4f}')",
    "rCode": "sigma <- 0.8; ns <- c(4, 16, 64, 256)\ncat('SE values:', sigma / sqrt(ns))",
    "pitfalls": "Believing accuracy scales linearly with sample size. Diminishing returns mean each additional observation yields progressively less reduction in error.",
    "interactiveType": "se_scaling",
    "quiz": [
      {
        "answer": 0,
        "explanation": "By definition of variance, Var(cY) = E[(cY - c*mu)^2] = c^2 * E[(Y - mu)^2] = c^2 * Var(Y).",
        "options": [
          "Because variance has quadratic scaling: Var(c * Y) = c^2 * Var(Y)",
          "Because of Bessel's correction",
          "It doesn't, it divides by n",
          "Because n is an integer"
        ],
        "question": "Why does Var(X_bar) divide by n^2 instead of n when factoring out the 1/n?"
      },
      {
        "answer": 1,
        "explanation": "The standard error of the mean is the estimated standard deviation of the sample mean: SE = s / sqrt(n).",
        "options": [
          "s * sqrt(n)",
          "s / sqrt(n)",
          "s^2 / n",
          "s / n"
        ],
        "question": "What is the mathematical formula for the Standard Error of the sample mean computed from a sample of size n?"
      },
      {
        "answer": 1,
        "explanation": "Many readers erroneously assume error bars show the spread of data points (SD) rather than the precision of the mean estimate (SE).",
        "options": [
          "Because SE bars are computationally difficult to draw",
          "Because SE bars are much narrower than SD bars, creating an illusion of small variability that confuses readers who mistake SE for data spread",
          "Because SE bars can never be plotted for continuous data",
          "Because SE only applies to binary proportions"
        ],
        "question": "Why do some scientific journals discourage plotting error bars representing +/- 1 SE without clear labeling?"
      }
    ]
  },
  {
    "index": 30,
    "id": "Xz0x-8-cgaQ",
    "title": "Bootstrapping Main Ideas!!!",
    "shortTitle": "Bootstrapping Main Ideas",
    "moduleId": "module-4",
    "category": "CLT & Bootstrapping",
    "duration": "8:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/Xz0x-8-cgaQ?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=Xz0x-8-cgaQ&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=30",
    "summary": "Non-parametric bootstrapping resamples observed data with replacement to approximate the sampling distribution of any statistic without parametric assumptions.",
    "bamIntuition": "Don't know the mathematical formula for the sampling distribution of your weird statistic? Just pretend your sample IS the population, pull out random bootstrap samples WITH REPLACEMENT, and BAM: You simulate the sampling distribution directly!",
    "firstPrinciples": "Introduced by Bradley Efron in 1979, the bootstrap replaces the unknown true population distribution $F$ with the empirical distribution function $\\hat{F}_n(x) = \\frac{1}{n}\\sum_{i=1}^n \\mathbf{1}_{x_i \\le x}$. By sampling $n$ points from $\\hat{F}_n$ *with replacement*, we generate bootstrap samples $\\mathbf{x}^{*(b)}$. Computing the statistic of interest $T^{*(b)} = g(\\mathbf{x}^{*(b)})$ across $B$ bootstrap iterations yields an empirical Monte Carlo approximation of the sampling distribution of $T$, valid for means, medians, ratios, or complex machine learning models.",
    "mathFormulas": [
      {
        "explanation": "Uniform probability mass on each observed sample point.",
        "latex": "P^*(X^* = x_i) = \\frac{1}{n}, \\quad i = 1, \\dots, n",
        "name": "Empirical Bootstrap Distribution"
      },
      {
        "explanation": "Sample standard deviation across B bootstrap replications.",
        "latex": "\\widehat{\\text{SE}}_B(T) = \\sqrt{\\frac{1}{B-1}\\sum_{b=1}^B (T^{*(b)} - \\bar{T}^*)^2}",
        "name": "Bootstrap Standard Error"
      }
    ],
    "numericalExample": "Sample of 5 response times: [12, 14, 15, 18, 45]. Median = 15. Standard parametric formulas for the median standard error are difficult. We generate 1000 resamples of size 5 with replacement (e.g. [14, 14, 15, 45, 45] -> median 15; [12, 12, 12, 14, 18] -> median 12), computing the 2.5th and 97.5th percentiles to find the exact 95% confidence interval.",
    "pythonCode": "import numpy as np\n\ndata = np.array([12, 14, 15, 18, 45])\nB = 5000\nboot_medians = [np.median(np.random.choice(data, size=len(data), replace=True)) for _ in range(B)]\nci_lower, ci_upper = np.percentile(boot_medians, [2.5, 97.5])\nprint(f'Bootstrap 95% CI for Median: [{ci_lower:.1f}, {ci_upper:.1f}]')",
    "rCode": "data <- c(12, 14, 15, 18, 45)\nboot_medians <- replicate(5000, median(sample(data, replace=TRUE)))\nquantile(boot_medians, c(0.025, 0.975))",
    "pitfalls": "Sampling WITHOUT replacement (which would simply reproduce the original dataset unchanged!) or using bootstrap on tiny samples (n < 10) where extreme values cannot be adequately represented.",
    "interactiveType": "bootstrap",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Sampling WITH replacement allows data points to appear multiple times or not at all, mimicking drawing fresh independent samples from the empirical distribution.",
        "options": [
          "You must sample without replacement",
          "You must sample with replacement",
          "You must draw twice as many samples as the original n",
          "Data must be sorted first"
        ],
        "question": "What is the critical rule when drawing bootstrap samples from original data?"
      },
      {
        "answer": 1,
        "explanation": "Bootstrapping treats the empirical sample as an estimate of the population, drawing n items with replacement so some are duplicated and others omitted.",
        "options": [
          "By drawing n observations from a fitted Gaussian distribution",
          "By drawing n observations from the original sample AT RANDOM WITH REPLACEMENT",
          "By drawing n observations without replacement",
          "By multiplying each observation by a random normal weight"
        ],
        "question": "How does non-parametric bootstrapping generate a surrogate bootstrap sample from an original dataset of size n?"
      },
      {
        "answer": 1,
        "explanation": "Without replacement, you would simply reshuffle the exact same n numbers every time, yielding the exact same sample mean with zero variability.",
        "options": [
          "You would get higher accuracy",
          "Every bootstrap sample would be an identical permutation of the original dataset, resulting in zero variance in sample statistics",
          "The computation time would double",
          "The sample size would shrink to 0"
        ],
        "question": "What would happen if you performed bootstrap resampling WITHOUT replacement?"
      }
    ]
  },
  {
    "index": 31,
    "id": "N4ZQQqyIf6k",
    "title": "Using Bootstrapping to Calculate p-values!!!",
    "shortTitle": "Bootstrapping p-values",
    "moduleId": "module-4",
    "category": "CLT & Bootstrapping",
    "duration": "8:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/N4ZQQqyIf6k?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=N4ZQQqyIf6k&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=31",
    "summary": "Using non-parametric permutation and bootstrap shifting under the null hypothesis to compute empirical p-values without normality assumptions.",
    "bamIntuition": "Shift your data so the null hypothesis is true (make group means match!). Resample from that shifted world thousands of times. The fraction of resamples that beat your real observed difference is your exact empirical p-value! BAM!",
    "firstPrinciples": "To test $H_0: \\mu_1 = \\mu_2$ non-parametrically, we construct a data world where $H_0$ holds exactly. In permutation testing, we pool all observations $N = n_1 + n_2$, randomly shuffle group labels without replacement, and compute the test statistic $T^{*(b)} = \\bar{X}_1^* - \\bar{X}_2^*$. In bootstrap hypothesis testing, we mean-center both groups so $\\bar{x}_1^{\\text{shifted}} = \\bar{x}_2^{\\text{shifted}} = \\bar{x}_{\\text{pooled}}$, draw bootstrap samples with replacement, and calculate: $p = \\frac{1 + \\sum_{b=1}^B \\mathbf{1}_{|T^{*(b)}| \\ge |T_{\\text{obs}}|}}{B + 1}$.",
    "mathFormulas": [
      {
        "explanation": "Proportion of resampled test statistics as extreme as observed, with +1 continuity correction.",
        "latex": "p_{\\text{boot}} = \\frac{1 + \\sum_{b=1}^B \\mathbf{1}_{\\{|T^{*(b)}| \\ge |t_{\\text{obs}}|\\}}}{B + 1}",
        "name": "Empirical Bootstrap p-value"
      },
      {
        "explanation": "Enforces the null condition while preserving higher-order moments of original samples.",
        "latex": "\\tilde{x}_{1i} = x_{1i} - \\bar{x}_1 + \\bar{x}_{\\text{pool}}",
        "name": "Null Shift Transformation"
      }
    ],
    "numericalExample": "Group A: [10, 12, 14] (mean 12). Group B: [16, 18, 20] (mean 18). Observed difference = 6.0. Pool = [10, 12, 14, 16, 18, 20]. In 1,000 permutations, only 2 permutations yield a difference >= 6.0. Two-tailed p-value = (2 * 2 + 1) / (1000 + 1) = 5 / 1001 = 0.005.",
    "pythonCode": "import numpy as np\n\ngroup_a = np.array([10, 12, 14])\ngroup_b = np.array([16, 18, 20])\nobs_diff = np.abs(np.mean(group_b) - np.mean(group_a))\npooled = np.concatenate([group_a, group_b])\n\nB = 5000\ncount = 0\nfor _ in range(B):\n    shuffled = np.random.permutation(pooled)\n    diff = np.abs(np.mean(shuffled[len(group_a):]) - np.mean(shuffled[:len(group_a)]))\n    if diff >= obs_diff:\n        count += 1\n\nprint(f'Permutation p-value: {(count + 1) / (B + 1):.4f}')",
    "rCode": "a <- c(10, 12, 14); b <- c(16, 18, 20)\nobs <- abs(mean(b) - mean(a))\npool <- c(a, b)\nnull_dist <- replicate(5000, {\n  idx <- sample(length(pool), length(a))\n  abs(mean(pool[-idx]) - mean(pool[idx]))\n})\ncat('p-val:', mean(null_dist >= obs))",
    "pitfalls": "Failing to add the +1 correction in numerator and denominator, which could spuriously yield p = 0 if no resample exceeds the observed value (a p-value cannot be strictly 0).",
    "interactiveType": "bootstrap_p",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Standard statistical practice adds +1 to numerator and denominator (including the observed test statistic itself as a member of the permutation distribution).",
        "options": [
          "Computers cannot store zero",
          "The observed data itself represents one valid possible permutation under the null (+1 rule)",
          "Because bootstrap is always two-tailed",
          "It can be zero if B > 100,000"
        ],
        "question": "Why can an empirical bootstrap or permutation p-value never be strictly equal to 0.0000?"
      },
      {
        "answer": 1,
        "explanation": "Hypothesis testing requires calculating probabilities under the null hypothesis. Centering both samples at a common mean enforces H0.",
        "options": [
          "Discard half the data",
          "Shift or center both groups so they share the exact same overall combined mean (imposing the null hypothesis)",
          "Square all the numbers",
          "Normalize both datasets to have variance 0"
        ],
        "question": "When using bootstrapping to compute a p-value for testing H0: mu_1 = mu_2, what must you do to the original datasets before resampling?"
      },
      {
        "answer": 1,
        "explanation": "Bootstrapping is distribution-free: it derives the reference distribution empirically from the observed data rather than assuming theoretical normality.",
        "options": [
          "It guarantees a p-value less than 0.05",
          "It does not rely on parametric normality assumptions or asymptotic approximations",
          "It does not require collecting any real data",
          "It works only for categorical variables"
        ],
        "question": "What is a major advantage of the bootstrap hypothesis test over the classical Student's t-test?"
      }
    ]
  },
  {
    "index": 32,
    "id": "RiEZ_hEf96A",
    "title": "Bar Charts Are Better than Pie Charts",
    "shortTitle": "Bar Charts vs Pie Charts",
    "moduleId": "module-1",
    "category": "Descriptive Statistics",
    "duration": "4:30",
    "embedUrl": "https://www.youtube-nocookie.com/embed/RiEZ_hEf96A?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=RiEZ_hEf96A&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=32",
    "summary": "Human visual perception decodes linear lengths along an aligned scale with far greater precision than 2D angles, slice areas, or 3D perspective slices.",
    "bamIntuition": "Pie charts force your brain to judge weird angles and circular wedges. Bar charts align everything on a clean flat baseline! Length is instant and effortless to compare. Never use pie charts! BAM!",
    "firstPrinciples": "According to Cleveland and McGill's seminal 1984 psychophysical hierarchy of visual perception, graphical elements are ranked in decreasing order of human decoding accuracy: 1. Position along a common scale (Bar chart); 2. Position along non-aligned scales; 3. Length; 4. Direction / Angle (Pie chart); 5. Area; 6. Volume; 7. Color saturation. Pie charts fail because judgment of angles and curved arc lengths induces high perceptual variance and systematic distortion, especially with 3D tilts.",
    "mathFormulas": [
      {
        "explanation": "Empirical psychophysics proves position on a baseline outperforms angular estimation.",
        "latex": "\\text{Perceptual Error}(\\text{Angle}) \\gg \\text{Perceptual Error}(\\text{Position on common scale})",
        "name": "Linear Encoding Accuracy"
      },
      {
        "explanation": "Maps frequency to degrees of an arc.",
        "latex": "\\theta_i = 360^\\circ \\times \\frac{x_i}{\\sum x_j}",
        "name": "Slice Angle Formula"
      }
    ],
    "numericalExample": "Categories: A: 24%, B: 26%, C: 25%, D: 25%. In a pie chart, human observers cannot reliably identify whether B is larger than A. In a bar chart aligned at 0%, the difference between 24% and 26% is immediately obvious.",
    "pythonCode": "import matplotlib.pyplot as plt\n\ncategories = ['A', 'B', 'C', 'D']\nvalues = [24, 26, 25, 25]\n\nfig, ax = plt.subplots(figsize=(6, 3))\nax.bar(categories, values, color='#3B82F6')\nax.set_ylim(0, 30)\nax.set_ylabel('Percentage (%)')\nax.set_title('Clear Perception with Bar Chart')",
    "rCode": "barplot(c(A=24, B=26, C=25, D=25), col='steelblue', ylim=c(0, 30), ylab='%')",
    "pitfalls": "Using 3D 'exploded' pie charts in business presentations, which distort relative proportions even further through perspective foreshortening.",
    "interactiveType": "bar_vs_pie",
    "quiz": [
      {
        "answer": 2,
        "explanation": "Position along a common baseline (as in bar charts) is decoded with the lowest cognitive error.",
        "options": [
          "Angle and slope",
          "Color hue and shade",
          "Position along a common aligned scale",
          "2D surface area"
        ],
        "question": "According to Cleveland and McGill's visual perception hierarchy, which visual channel is decoded most accurately by the human visual cortex?"
      },
      {
        "answer": 1,
        "explanation": "Cleveland and McGill's perceptual experiments proved that humans judge position along a common scale far more accurately than angles or slices of a circle.",
        "options": [
          "Pie charts take up more computer memory",
          "Human visual perception is substantially more accurate at judging linear lengths along a common aligned axis than comparing 2D angles, areas, or arc lengths",
          "Bar charts cannot display percentages",
          "Pie charts cannot have more than 2 categories"
        ],
        "question": "Why do data visualization guidelines strongly favor bar charts over pie charts for multi-category comparisons?"
      },
      {
        "answer": 1,
        "explanation": "3D perspective tilts the chart, making foreground slices appear deceptively larger than equal or larger background slices.",
        "options": [
          "Whenever you have more than 5 categories",
          "Virtually never, because 3D perspective distortion severely misrepresents slice angles and relative visual areas",
          "Whenever the data are continuous",
          "Only in financial annual reports"
        ],
        "question": "When is a 3D perspective pie chart appropriate in scientific publications?"
      }
    ]
  },
  {
    "index": 33,
    "id": "fHLhBnmwUM0",
    "title": "Boxplots are Awesome!!!",
    "shortTitle": "Boxplots are Awesome",
    "moduleId": "module-1",
    "category": "Descriptive Statistics",
    "duration": "5:40",
    "embedUrl": "https://www.youtube-nocookie.com/embed/fHLhBnmwUM0?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=fHLhBnmwUM0&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=33",
    "summary": "Tukey's five-number summary: minimum, Q1 (25th percentile), median (50th percentile), Q3 (75th percentile), maximum, and outlier whiskers.",
    "bamIntuition": "The box holds the middle 50% of your data (the IQR). The line inside is the median. The whiskers stretch 1.5 times the IQR. Anything outside is an outlier! Clean, compact, awesome! BAM!",
    "firstPrinciples": "A boxplot visually encodes John Tukey's five-number summary. The Interquartile Range $\\text{IQR} = Q_3 - Q_1$ contains the central 50% of observations. Whiskers extend to the most extreme data point within the Tukey fences: $[Q_1 - 1.5\\cdot\\text{IQR}, \\, Q_3 + 1.5\\cdot\\text{IQR}]$. For a Gaussian distribution, $Q_1 = \\mu - 0.6745\\sigma$ and $Q_3 = \\mu + 0.6745\\sigma$, so $\\text{IQR} \\approx 1.349\\sigma$, and the whisker fence reaches $\\pm 2.698\\sigma$ (capturing 99.3% of normal data; points beyond are flagged as outliers).",
    "mathFormulas": [
      {
        "explanation": "Spread of the central 50% of the distribution.",
        "latex": "\\text{IQR} = Q_3 - Q_1",
        "name": "Interquartile Range"
      },
      {
        "explanation": "Threshold beyond which data points are plotted as individual outlier dots.",
        "latex": "\\text{Fence}_{\\text{upper}} = Q_3 + 1.5 \\times \\text{IQR}, \\quad \\text{Fence}_{\\text{lower}} = Q_1 - 1.5 \\times \\text{IQR}",
        "name": "Tukey Outlier Fences"
      }
    ],
    "numericalExample": "Data: [10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60]. Median = 24. Q1 = 18, Q3 = 30. IQR = 30 - 18 = 12. Upper fence = 30 + (1.5 * 12) = 30 + 18 = 48. Value 60 > 48, so 60 is flagged as an outlier dot! Upper whisker stops at 32.",
    "pythonCode": "import matplotlib.pyplot as plt\n\ndata = [10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60]\nplt.boxplot(data, vert=False)\nplt.title('Boxplot with Outlier at 60')",
    "rCode": "data <- c(10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60)\nboxplot(data, horizontal=TRUE)",
    "pitfalls": "Failing to recognize multimodal data. A bimodal distribution with two distinct peaks looks like a regular symmetric boxplot; always pair boxplots with stripcharts or violin plots.",
    "interactiveType": "boxplot",
    "quiz": [
      {
        "answer": 1,
        "explanation": "The box spans from Q1 (25th percentile) to Q3 (75th percentile), enclosing exactly the middle 50% of the sample.",
        "options": [
          "25%",
          "50%",
          "75%",
          "95%"
        ],
        "question": "What percentage of data is contained strictly inside the rectangular box of a boxplot?"
      },
      {
        "answer": 1,
        "explanation": "The box encompasses the central 50% of the distribution (the Interquartile Range IQR = Q3 - Q1), with the centerline marking the median.",
        "options": [
          "Minimum, Mean, Maximum",
          "First quartile Q1 (25th percentile), Median (50th percentile), and Third quartile Q3 (75th percentile)",
          "Mean - SD, Mean, Mean + SD",
          "10th percentile, 50th percentile, 90th percentile"
        ],
        "question": "In a standard Tukey boxplot, what do the bottom, middle, and top horizontal lines of the box represent?"
      },
      {
        "answer": 1,
        "explanation": "Tukey defined 'fences' at Q1 - 1.5*IQR and Q3 + 1.5*IQR. Points beyond these fences are plotted as individual outlier points.",
        "options": [
          "Any point beyond 1 standard deviation from the mean",
          "Points beyond 1.5 * IQR above the third quartile or below the first quartile",
          "Points that have negative values",
          "The top 1% of observations regardless of spread"
        ],
        "question": "How are outlier points typically defined and plotted in a standard boxplot?"
      }
    ]
  },
  {
    "index": 34,
    "id": "VSi0Z04fWj0",
    "title": "Logs (logarithms), Clearly Explained!!!",
    "shortTitle": "Logs (Logarithms), Clearly Explained",
    "moduleId": "module-1",
    "category": "Descriptive Statistics",
    "duration": "6:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/VSi0Z04fWj0?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=VSi0Z04fWj0&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=34",
    "summary": "Logarithmic transformations linearize multiplicative processes, stabilize heteroscedastic variance, and compress wide dynamic scales into symmetric distributions.",
    "bamIntuition": "A 2-fold increase (from 10 to 20) is +10. But a 2-fold increase from 1000 to 2000 is +1000! Taking logs makes a 2-fold change look the same size anywhere on the graph! Multiplicative becomes additive! BAM!",
    "firstPrinciples": "The logarithm $\\log_b(x)$ is the inverse of exponentiation: $y = \\log_b(x) \\iff b^y = x$. Crucial mathematical properties: 1. $\\log(u \\cdot v) = \\log(u) + \\log(v)$; 2. $\\log(u / v) = \\log(u) - \\log(v)$; 3. $\\log(u^k) = k \\log(u)$. In statistical modeling, when multiplicative errors occur ($Y = e^{\\beta X} \\cdot \\epsilon$), taking the log yields an additive linear model: $\\ln Y = \\beta X + \\ln \\epsilon$. For log-normal variables, $\\ln X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, making standard linear methods applicable.",
    "mathFormulas": [
      {
        "explanation": "Transforms multiplicative scale factors into additive shifts.",
        "latex": "\\log_b(x \\cdot y) = \\log_b(x) + \\log_b(y)",
        "name": "Multiplication to Addition"
      },
      {
        "explanation": "Equal magnitude for doubling and halving.",
        "latex": "\\log_2(2/1) = +1, \\quad \\log_2(1/2) = -1",
        "name": "Log-Ratio Symmetry"
      }
    ],
    "numericalExample": "Comparing gene expression: Control = 1.0. Gene A is doubled (2.0): Ratio = 2.0/1.0 = 2.0. Gene B is halved (0.5): Ratio = 0.5/1.0 = 0.5. On a raw scale, doubling is a jump of +1.0, while halving is a jump of only -0.5 (asymmetric!). In log2 space: log2(2) = +1.0, log2(0.5) = -1.0. Perfect symmetry!",
    "pythonCode": "import numpy as np\n\nratios = np.array([0.1, 0.5, 1.0, 2.0, 10.0])\nlog2_ratios = np.log2(ratios)\nprint('Raw ratios: ', ratios)\nprint('Log2 ratios:', log2_ratios)",
    "rCode": "ratios <- c(0.1, 0.5, 1, 2, 10)\nlog2(ratios)",
    "pitfalls": "Attempting to take the logarithm of zero or negative numbers ($\\log(0) = -\\infty$). For count data with zeros, practitioners use $\\log(x + 1)$ (pseudocounts).",
    "interactiveType": "log_transform",
    "quiz": [
      {
        "answer": 0,
        "explanation": "Because 2^(-3) = 1 / (2^3) = 1/8, log2(1/8) = -3.",
        "options": [
          "-3",
          "3",
          "-0.125",
          "0"
        ],
        "question": "What is the value of log2(1/8)?"
      },
      {
        "answer": 0,
        "explanation": "Log transforms compress right-skewed tails, equalize variances (homoscedasticity), and turn multiplicative fold-changes into additive linear intervals.",
        "options": [
          "It compresses large values, stabilizes variance across groups, and converts multiplicative relationships into additive ones",
          "It removes all outliers permanently",
          "It forces the data to follow a uniform distribution",
          "It eliminates the need for hypothesis testing"
        ],
        "question": "When data span multiple orders of magnitude (e.g. gene expression or viral loads), what primary benefit does a log transformation provide?"
      },
      {
        "answer": 1,
        "explanation": "Because lim_{x -> 0+} ln(x) = -infinity, researchers add a small constant (like 1) before taking the logarithm: log(x + 1).",
        "options": [
          "log(0) equals 1; no transformation needed",
          "log(0) is undefined (-infinity); adding a pseudo-count c (e.g. log(x + 1)) avoids infinite values",
          "log(0) equals 0 on 64-bit systems",
          "log(0) inverts the sign of the data"
        ],
        "question": "Why is log(0) mathematically problematic in data analysis, and what common transformation is used for count data containing zeros?"
      }
    ]
  },
  {
    "index": 35,
    "id": "TqOeMYtOc1w",
    "title": "Confidence Intervals, Clearly Explained!!!",
    "shortTitle": "Confidence Intervals",
    "moduleId": "module-4",
    "category": "CLT & Bootstrapping",
    "duration": "8:25",
    "embedUrl": "https://www.youtube-nocookie.com/embed/TqOeMYtOc1w?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=TqOeMYtOc1w&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=35",
    "summary": "Frequentist confidence intervals: In repeated sampling, 95% of constructed intervals contain the true, fixed population parameter.",
    "bamIntuition": "A confidence interval is a net you toss into the lake! The fish (true population mean) isn't swimming around\u2014it's frozen in place. If you toss 100 nets, 95 of them will catch the fish! BAM!",
    "firstPrinciples": "Let $\\theta$ be a fixed, deterministic population parameter. A $100(1-\\alpha)\\%$ confidence interval $[L(\\mathbf{X}), U(\\mathbf{X})]$ is a random interval satisfying: $P(L(\\mathbf{X}) \\le \\theta \\le U(\\mathbf{X})) = 1 - \\alpha$. For sample mean from normal distribution with unknown $\\sigma$, the pivotal quantity $T = \\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} \\sim t_{n-1}$ yields: $\\text{CI} = \\left[ \\bar{x} - t_{1-\\alpha/2, n-1}\\frac{s}{\\sqrt{n}}, \\; \\bar{x} + t_{1-\\alpha/2, n-1}\\frac{s}{\\sqrt{n}} \\right]$.",
    "mathFormulas": [
      {
        "explanation": "The endpoints are random variables; mu is a fixed constant.",
        "latex": "P\\left( \\bar{X} - t^* \\frac{s}{\\sqrt{n}} \\le \\mu \\le \\bar{X} + t^* \\frac{s}{\\sqrt{n}} \\right) = 0.95",
        "name": "Frequentist Coverage Probability"
      },
      {
        "explanation": "Half-width of the confidence interval.",
        "latex": "\\text{ME} = t_{1-\\alpha/2, n-1} \\cdot \\frac{s}{\\sqrt{n}}",
        "name": "Margin of Error"
      }
    ],
    "numericalExample": "Sample n = 25, mean x_bar = 50, s = 10. SE = 10 / sqrt(25) = 2.0. Degrees of freedom = 24. For 95% confidence, t* = 2.064. Margin of Error = 2.064 * 2.0 = 4.128. 95% CI = [50 - 4.128, 50 + 4.128] = [45.87, 54.13].",
    "pythonCode": "from scipy import stats\nimport numpy as np\n\nn = 25\nx_bar = 50\ns = 10\nse = s / np.sqrt(n)\nci = stats.t.interval(0.95, df=n-1, loc=x_bar, scale=se)\nprint(f'95% Confidence Interval: [{ci[0]:.2f}, {ci[1]:.2f}]')",
    "rCode": "t.test(rnorm(25, mean=50, sd=10))$conf.int",
    "pitfalls": "Saying 'There is a 95% probability that the true mean is between 45.87 and 54.13.' In frequentist statistics, the parameter is fixed: it is either 100% inside or 100% outside; the 95% applies to the repeated procedure.",
    "interactiveType": "confidence_intervals",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Frequentist confidence describes the long-run capture rate across hypothetical repeated samplings.",
        "options": [
          "There is a 95% chance the true mean lies in this specific interval",
          "In 95% of repeated experiments from the same population, the calculated intervals will capture the true parameter",
          "95% of individual data points fall inside the interval",
          "The sample mean is within 5% of truth"
        ],
        "question": "What is the correct frequentist interpretation of a 95% confidence interval?"
      },
      {
        "answer": 1,
        "explanation": "In frequentist statistics, the population parameter is a fixed constant, not a random variable. The 95% probability describes the long-run coverage of the procedure.",
        "options": [
          "There is a 95% probability that the true population mean lies between 10.2 and 14.8",
          "If we repeated the experiment and constructed intervals identically from many independent samples, 95% of those calculated intervals would contain the fixed true parameter",
          "95% of the individual observations in the sample fall between 10.2 and 14.8",
          "The sample mean has a 95% chance of being 12.5"
        ],
        "question": "What is the precise frequentist definition of a 95% Confidence Interval [10.2, 14.8] for the population mean?"
      },
      {
        "answer": 1,
        "explanation": "CI half-width is critical_value * (s / sqrt(n)). Multiplying n by 4 multiplies the denominator by sqrt(4) = 2, cutting the interval width in half.",
        "options": [
          "The width is quadrupled",
          "The width is cut in half",
          "The width decreases by 75%",
          "The width remains unchanged"
        ],
        "question": "If you quadruple the sample size n from 50 to 200, what happens to the width of the 95% confidence interval for the mean?"
      }
    ]
  },
  {
    "index": 36,
    "id": "2AQKmw14mHM",
    "title": "R-squared, Clearly Explained!!!",
    "shortTitle": "R-squared, Clearly Explained",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "7:55",
    "embedUrl": "https://www.youtube-nocookie.com/embed/2AQKmw14mHM?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=2AQKmw14mHM&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=36",
    "summary": "The coefficient of determination (R^2) quantifies the proportion of total variation in the response variable explained by the regression model.",
    "bamIntuition": "Compare two models: 1. A stupid flat line at the average Y. 2. Your regression line. How much did your line reduce the sum of squared errors compared to the flat line? That percentage reduction is R-squared! BAM!",
    "firstPrinciples": "Total Sum of Squares decomposes orthogonally: $SS_{\\text{tot}} = SS_{\\text{reg}} + SS_{\\text{res}}$, where $SS_{\\text{tot}} = \\sum (y_i - \\bar{y})^2$ and $SS_{\\text{res}} = \\sum (y_i - \\hat{y}_i)^2$. The coefficient of determination is defined as $R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}} = \\frac{SS_{\\text{reg}}}{SS_{\\text{tot}}}$. For simple univariate linear regression, $R^2 = r_{xy}^2$ (the squared Pearson correlation). Adjusted $R^2 = 1 - \\left[\\frac{(1 - R^2)(n - 1)}{n - p - 1}\\right]$ penalizes adding useless predictors.",
    "mathFormulas": [
      {
        "explanation": "Fraction of variance explained relative to a horizontal mean line.",
        "latex": "R^2 = 1 - \\frac{\\sum_{i=1}^n (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^n (y_i - \\bar{y})^2}",
        "name": "R-squared Formula"
      },
      {
        "explanation": "Penalizes inclusion of redundant predictor variables p.",
        "latex": "R^2_{\\text{adj}} = 1 - \\frac{SS_{\\text{res}} / (n - p - 1)}{SS_{\\text{tot}} / (n - 1)}",
        "name": "Adjusted R-squared"
      }
    ],
    "numericalExample": "Data: Y = [2, 4, 6, 8, 10]. y_bar = 6. SS_tot = (-4)^2 + (-2)^2 + 0^2 + 2^2 + 4^2 = 16 + 4 + 0 + 4 + 16 = 40. Model predictions: y_hat = [2.2, 3.8, 6.1, 7.9, 10.0]. Residuals: [-0.2, +0.2, -0.1, +0.1, 0.0]. SS_res = 0.04 + 0.04 + 0.01 + 0.01 + 0 = 0.10. R^2 = 1 - (0.10 / 40) = 1 - 0.0025 = 0.9975 (99.75% of variance explained!).",
    "pythonCode": "from sklearn.metrics import r2_score\nimport numpy as np\n\ny_true = np.array([2, 4, 6, 8, 10])\ny_pred = np.array([2.2, 3.8, 6.1, 7.9, 10.0])\nr2 = r2_score(y_true, y_pred)\nprint(f'R-squared: {r2:.4f}')",
    "rCode": "y <- c(2, 4, 6, 8, 10)\nfit <- lm(y ~ c(1, 2, 3, 4, 5))\nsummary(fit)$r.squared",
    "pitfalls": "Assuming a high R^2 means the model is correct. Anscombe's quartet shows datasets with identical R^2 = 0.67 that are parabolic or dominated by single outliers.",
    "interactiveType": "r_squared",
    "quiz": [
      {
        "answer": 1,
        "explanation": "If SS_res = SS_tot, the model provides zero predictive improvement over the naive baseline of predicting the sample mean.",
        "options": [
          "The model makes no errors",
          "The regression line explains zero variance beyond simply guessing the mean y_bar for every prediction",
          "The slope is infinite",
          "Data points are negative"
        ],
        "question": "What does R^2 = 0 mean for a linear regression model?"
      },
      {
        "answer": 1,
        "explanation": "R^2 = 1 - (SS_res / SS_tot). It quantifies the proportion of total variation in y accounted for by the fitted model.",
        "options": [
          "82% of the data points fall exactly on the regression line",
          "82% of the total variance in the dependent variable y is explained by the linear relationship with x",
          "The correlation between x and y is 0.82",
          "The p-value of the slope is 0.18"
        ],
        "question": "In a simple linear regression model, what does an R-squared value of R^2 = 0.82 mean?"
      },
      {
        "answer": 0,
        "explanation": "Raw R^2 monotonically increases with added predictors due to overfitting. Adjusted R^2 includes a penalty factor (n - 1)/(n - p - 1) for each added parameter.",
        "options": [
          "OLS can always find small non-zero coefficients to fit sample noise; Adjusted R^2 penalizes added degrees of freedom",
          "R^2 is capped at 1.0; Pearson's r corrects for it",
          "Because sample size shrinks with each predictor; F-statistic corrects for it",
          "Because degrees of freedom increase"
        ],
        "question": "Why does adding additional explanatory variables to a multiple regression never decrease the unadjusted R^2, and what metric corrects for this?"
      }
    ]
  },
  {
    "index": 37,
    "id": "aFDOzpTeg0s",
    "title": "The Essence of Linear Regression!!!",
    "shortTitle": "The Essence of Linear Regression",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "8:30",
    "embedUrl": "https://www.youtube-nocookie.com/embed/aFDOzpTeg0s?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=aFDOzpTeg0s&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=37",
    "summary": "Linear regression establishes a straight-line relationship between an independent feature X and a dependent target Y by minimizing the vertical residuals.",
    "bamIntuition": "Draw a line through a scatter of dots. Every dot has a vertical distance (residual) to the line. Square those distances, add them up, and wiggle the line until that sum is as tiny as possible! BAM: Linear Regression!",
    "firstPrinciples": "Given bivariate observations $(x_1, y_1), \\dots, (x_n, y_n)$, we postulate the relationship $y_i = \\beta_0 + \\beta_1 x_i + \\epsilon_i$, with $E[\\epsilon_i] = 0$. The Ordinary Least Squares (OLS) objective minimizes the residual sum of squares: $S(\\beta_0, \\beta_1) = \\sum_{i=1}^n (y_i - (\\beta_0 + \\beta_1 x_i))^2$. Taking partial derivatives $\\frac{\\partial S}{\\partial \\beta_0} = 0$ and $\\frac{\\partial S}{\\partial \\beta_1} = 0$ yields the normal equations, guaranteeing a unique global minimum.",
    "mathFormulas": [
      {
        "explanation": "Minimizing the sum of squared vertical residuals.",
        "latex": "\\min_{\\beta_0, \\beta_1} \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 x_i)^2",
        "name": "OLS Objective Function"
      },
      {
        "explanation": "Vertical distance between observed target and fitted line.",
        "latex": "e_i = y_i - \\hat{y}_i = y_i - (\\hat{\\beta}_0 + \\hat{\\beta}_1 x_i)",
        "name": "Residual Definition"
      }
    ],
    "numericalExample": "Points: (1, 2), (2, 3), (3, 5). x_bar = 2, y_bar = 3.33. Cov(x, y) = 1.5, Var(x) = 1.0. Slope beta1 = 1.5 / 1.0 = 1.5. Intercept beta0 = 3.33 - (1.5 * 2) = 0.33. Line equation: y = 0.33 + 1.5x.",
    "pythonCode": "import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 3, 5])\nslope, intercept = np.polyfit(x, y, 1)\nprint(f'Fitted Line: Y = {intercept:.2f} + {slope:.2f} * X')",
    "rCode": "fit <- lm(c(2, 3, 5) ~ c(1, 2, 3))\ncoef(fit)",
    "pitfalls": "Minimizing perpendicular distance instead of vertical distance. OLS minimizes strictly vertical error in Y because X is assumed to be known without measurement error.",
    "interactiveType": "regression_intro",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Standard regression minimizes prediction error along the target axis Y conditional on known predictor values X.",
        "options": [
          "It is easier to calculate",
          "Because X is assumed fixed/independent and our goal is to minimize error in predicting Y",
          "Vertical lines are straight",
          "To avoid negative numbers"
        ],
        "question": "Why does OLS minimize vertical distance rather than horizontal or perpendicular distance to the line?"
      },
      {
        "answer": 1,
        "explanation": "Linear regression models how the expected value (conditional mean) of the response Y changes as a function of the predictor X.",
        "options": [
          "To prove that x causes y",
          "To model the conditional expectation E[Y | X = x] as a linear function beta_0 + beta_1 * x",
          "To minimize the correlation between x and y",
          "To make all residuals equal to 1.0"
        ],
        "question": "What is the foundational statistical goal of simple linear regression?"
      },
      {
        "answer": 1,
        "explanation": "The Gauss-Markov theorem states OLS has minimum variance among all linear unbiased estimators when errors have mean 0, homoscedastic variance, and zero covariance.",
        "options": [
          "Errors must be normally distributed with variance 1",
          "Errors must have expectation zero, constant variance (homoscedasticity), and be uncorrelated",
          "Sample size must be greater than 1,000",
          "Predictor variables must be integers"
        ],
        "question": "According to the Gauss-Markov Theorem, under which condition is the Ordinary Least Squares (OLS) estimator the Best Linear Unbiased Estimator (BLUE)?"
      }
    ]
  },
  {
    "index": 38,
    "id": "PaFPbb66DxQ",
    "title": "The Main Ideas of Fitting a Line to Data (The Main Ideas of Least Squares and Linear Regression.)",
    "shortTitle": "Fitting a Line to Data (Least Squares)",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "9:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/PaFPbb66DxQ?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=PaFPbb66DxQ&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=38",
    "summary": "Exploring the 3D loss surface of Least Squares and how rotating and shifting the line explores the parabolic bowl of residual sums.",
    "bamIntuition": "Imagine rotating the line on a pivot. As the slope changes, the sum of squared residuals traces out a beautiful 3D bowl! The bottom of the bowl is where the residuals are smallest. BAM!",
    "firstPrinciples": "The loss function $J(\\beta_0, \\beta_1) = \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 x_i)^2$ is a strictly convex quadratic form in $(\\beta_0, \\beta_1)$. Its Hessian matrix $\\mathbf{H} = 2 \\begin{bmatrix} n & \\sum x_i \\\\ \\sum x_i & \\sum x_i^2 \\end{bmatrix}$ is positive definite whenever at least two distinct $x$ values exist. This guarantees that the loss surface is an elliptical paraboloid with a unique global minimum.",
    "mathFormulas": [
      {
        "explanation": "Convex paraboloid in parameter space.",
        "latex": "J(\\boldsymbol{\\beta}) = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})",
        "name": "Quadratic Loss Surface"
      },
      {
        "explanation": "Condition for the gradient of the loss surface to equal zero.",
        "latex": "\\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}",
        "name": "Normal Equations"
      }
    ],
    "numericalExample": "For data points (1, 1), (2, 3), (3, 2). Centering data: x_c = [-1, 0, +1], y_c = [-1, +1, 0]. Slope beta1 = sum(x_c * y_c) / sum(x_c^2) = (1 + 0 + 0) / (1 + 0 + 1) = 0.5. At beta1 = 0.5, SSR is minimized at 1.5. Any other slope (e.g. 0.0 or 1.0) produces higher SSR.",
    "pythonCode": "import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([1, 3, 2])\n# Evaluate SSR for various candidate slopes\nfor slope in [0.0, 0.5, 1.0]:\n    pred = np.mean(y) + slope * (x - np.mean(x))\n    ssr = np.sum((y - pred)**2)\n    print(f'Slope: {slope:.1f} -> SSR: {ssr:.2f}')",
    "rCode": "x <- c(1, 2, 3); y <- c(1, 3, 2)\nlm(y ~ x)",
    "pitfalls": "Assuming Least Squares is robust to extreme outliers. Squaring residuals means an outlier with error 10 exerts 100x the influence of an error of 1, severely pulling the fitted line.",
    "interactiveType": "least_squares_line",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because the objective is a quadratic function with positive definite Hessian, it forms a convex paraboloid bowl.",
        "options": [
          "A saddle point",
          "A convex paraboloid (bowl) with a unique minimum",
          "A flat plane",
          "A sphere"
        ],
        "question": "What geometric shape does the OLS residual sum of squares form in parameter space (beta0, beta1)?"
      },
      {
        "answer": 1,
        "explanation": "OLS minimizes the sum of squared vertical deviations (residuals) between observed values y_i and model-predicted values y_hat_i.",
        "options": [
          "The sum of horizontal distances from points to the line",
          "The sum of squared vertical residuals: sum (y_i - (beta_0 + beta_1 * x_i))^2",
          "The maximum absolute vertical distance",
          "The product of slope and intercept"
        ],
        "question": "What specific criterion does Ordinary Least Squares (OLS) minimize when fitting a line y = beta_0 + beta_1 * x?"
      },
      {
        "answer": 0,
        "explanation": "Setting partial derivatives of SS_res to zero yields beta_1 = sum((x_i - x_bar)(y_i - y_bar)) / sum((x_i - x_bar)^2) = Cov(X, Y) / Var(X).",
        "options": [
          "beta_1 = Cov(X, Y) / Var(X)",
          "beta_1 = Var(X) / Cov(X, Y)",
          "beta_1 = r * (s_x / s_y)",
          "beta_1 = Mean(Y) / Mean(X)"
        ],
        "question": "What is the exact algebraic closed-form formula for the OLS slope coefficient beta_1 in simple linear regression?"
      }
    ]
  },
  {
    "index": 39,
    "id": "Vf7oJ6z2LCc",
    "title": "Lowess and Loess, Clearly Explained!!!",
    "shortTitle": "Lowess and Loess, Clearly Explained",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "8:40",
    "embedUrl": "https://www.youtube-nocookie.com/embed/Vf7oJ6z2LCc?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=Vf7oJ6z2LCc&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=39",
    "summary": "Locally Weighted Scatterplot Smoothing (LOWESS) fits non-parametric curves to data by running weighted regressions within local sliding windows.",
    "bamIntuition": "A straight line won't fit wiggly data! Loess slides a window across your data, fits a tiny weighted line at each point where close neighbors get the most vote, and BAM: You get a smooth, organic curve!",
    "firstPrinciples": "LOWESS (Cleveland 1979) estimates $f(x)$ locally without assuming a global parametric form. At target point $x_0$, it selects the $k = \\lfloor f \\cdot n \\rfloor$ nearest neighbors where $f \\in (0, 1)$ is the span. Weights are assigned via the tricube kernel: $w_i(x_0) = W\\left(\\frac{|x_i - x_0|}{\\Delta(x_0)}\\right)$, where $W(u) = (1 - |u|^3)^3$ for $|u| < 1$, and 0 otherwise. A locally weighted polynomial regression is solved: $\\min_{\\beta} \\sum w_i (y_i - \\beta_0 - \\beta_1(x_i - x_0))^2$, and robustness weights are iteratively updated to downweight outliers.",
    "mathFormulas": [
      {
        "explanation": "Smooth weight decaying to zero at the neighborhood boundary.",
        "latex": "W(u) = \\begin{cases} (1 - |u|^3)^3 & \\text{for } |u| < 1 \\\\ 0 & \\text{for } |u| \\ge 1 \\end{cases}",
        "name": "Tricube Kernel Weight"
      },
      {
        "explanation": "Local weighted least squares solution at target query point x0.",
        "latex": "\\hat{\\boldsymbol{\\beta}}(x_0) = (\\mathbf{X}^T \\mathbf{W}(x_0) \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{W}(x_0) \\mathbf{y}",
        "name": "Weighted Local OLS"
      }
    ],
    "numericalExample": "Fitting a point at x0 = 5 with span containing points at x = [4, 5, 6]. Distance to boundary = 2. For x = 5: u = 0, weight = (1 - 0)^3 = 1.0 (full weight). For x = 4: u = 1/2 = 0.5, weight = (1 - 0.5^3)^3 = (1 - 0.125)^3 = (0.875)^3 = 0.67. Points outside the window receive 0 weight.",
    "pythonCode": "from statsmodels.nonparametric.smoothers_lowess import lowess\nimport numpy as np\n\nx = np.linspace(0, 10, 50)\ny = np.sin(x) + np.random.normal(0, 0.2, 50)\nsmoothed = lowess(y, x, frac=0.3)\nprint('First 3 smoothed points:', smoothed[:3, 1].round(3))",
    "rCode": "x <- seq(0, 10, length.out=50); y <- sin(x) + rnorm(50, 0, 0.2)\nfit <- loess(y ~ x, span=0.3)\nplot(x, y); lines(x, predict(fit), col='red', lwd=2)",
    "pitfalls": "Overfitting with a span (frac) that is too small (tracing every random noise bump), or oversmoothing with a span that is too large (flattening real peaks and troughs).",
    "interactiveType": "loess",
    "quiz": [
      {
        "answer": 0,
        "explanation": "When frac -> 1.0, the local neighborhood includes the entire dataset, converging to standard global regression.",
        "options": [
          "The curve becomes identical to a global polynomial regression line",
          "The curve passes through every individual data point",
          "The algorithm divides by zero",
          "Weights become negative"
        ],
        "question": "What happens in Loess smoothing when you set the span parameter frac very close to 1.0?"
      },
      {
        "answer": 1,
        "explanation": "LOESS fits local linear or quadratic regressions using a tri-cube kernel that gives higher weight to points closest to the target x-value.",
        "options": [
          "Linear Ordinary Error Summation System; fits global straight lines",
          "Locally Estimated Scatterplot Smoothing; fits weighted local polynomials to localized neighborhoods of points",
          "Low Energy Statistical Sampling; uses Monte Carlo integrals",
          "Logarithmic Exponential Smoothing System"
        ],
        "question": "What does LOESS / LOWESS stand for, and how does it fit non-linear curves to data?"
      },
      {
        "answer": 0,
        "explanation": "The span controls the bias-variance tradeoff: larger span averages over more data (smoother, higher bias), while smaller span fits local fluctuations (wigglier, higher variance).",
        "options": [
          "Larger span creates a smoother curve with higher bias; smaller span creates a more flexible, wiggly curve with higher variance",
          "Larger span makes the curve more sensitive to noise",
          "Span has zero effect on the fit",
          "Smaller span forces the curve to be a straight line"
        ],
        "question": "In LOESS smoothing, how does adjusting the span parameter alpha (the proportion of total points included in each local neighborhood) affect the curve?"
      }
    ]
  },
  {
    "index": 40,
    "id": "7ArmBVF2dCs",
    "title": "Linear Regression, Clearly Explained!!!",
    "shortTitle": "Linear Regression, Clearly Explained",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "12:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/7ArmBVF2dCs?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=7ArmBVF2dCs&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=40",
    "summary": "Full algebraic derivation of the OLS slope and intercept, hypothesis tests for coefficients, and confidence and prediction intervals.",
    "bamIntuition": "The slope is Covariance of X and Y divided by Variance of X! If X goes up by 1 unit, Y changes by the slope. Test if the slope is significantly different from 0 with a t-test, and BAM!",
    "firstPrinciples": "Setting the gradient of $S = \\sum (y_i - \\beta_0 - \\beta_1 x_i)^2$ to zero yields the closed-form estimators: $\\hat{\\beta}_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)} = r \\frac{s_y}{s_x}$, and $\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}$. Under Gauss-Markov assumptions, $\\hat{\\beta}_1$ is the Best Linear Unbiased Estimator (BLUE). The sampling variance is $\\text{Var}(\\hat{\\beta}_1) = \\frac{\\sigma^2}{\\sum (x_i - \\bar{x})^2}$, leading to test statistic $t = \\frac{\\hat{\\beta}_1}{\\text{SE}(\\hat{\\beta}_1)} \\sim t_{n-2}$.",
    "mathFormulas": [
      {
        "explanation": "Ratio of sample covariance to variance of predictor.",
        "latex": "\\hat{\\beta}_1 = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^n (x_i - \\bar{x})^2} = r \\frac{s_y}{s_x}",
        "name": "Slope Estimator"
      },
      {
        "explanation": "Uncertainty of slope estimator based on residual standard error s_e.",
        "latex": "\\text{SE}(\\hat{\\beta}_1) = \\frac{s_e}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2}}",
        "name": "Slope Standard Error"
      }
    ],
    "numericalExample": "Height (X) vs Weight (Y) for 5 people: sum(x - x_bar)^2 = 100, sum(x - x_bar)(y - y_bar) = 250. Slope beta1 = 250 / 100 = 2.5 lbs per inch. If x_bar = 70 and y_bar = 160: beta0 = 160 - (2.5 * 70) = 160 - 175 = -15. Prediction for a 72-inch person: -15 + (2.5 * 72) = 165 lbs.",
    "pythonCode": "import statsmodels.api as sm\nimport numpy as np\n\nx = np.array([65, 68, 70, 72, 75])\ny = np.array([145, 155, 160, 168, 175])\nX = sm.add_constant(x)\nmodel = sm.OLS(y, X).fit()\nprint(model.summary())",
    "rCode": "x <- c(65, 68, 70, 72, 75); y <- c(145, 155, 160, 168, 175)\nsummary(lm(y ~ x))",
    "pitfalls": "Confusing confidence intervals for the regression line (mean response) with prediction intervals for an individual new point (which must include individual residual variance $\\sigma^2$ and is much wider).",
    "interactiveType": "regression_deep",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Slope scales the standardized correlation r by the ratio of the scales: beta1 = r * (s_y / s_x).",
        "options": [
          "beta1 = r",
          "beta1 = r * (s_y / s_x)",
          "beta1 = r^2",
          "beta1 = s_x / s_y"
        ],
        "question": "What is the relationship between the slope beta1 of simple linear regression and Pearson's correlation r?"
      },
      {
        "answer": 1,
        "explanation": "The F-statistic compares Mean Square Model (explained variance) to Mean Square Residual (unexplained variance), testing H0: beta_1 = 0.",
        "options": [
          "H0: The intercept beta_0 = 0",
          "H0: The slope beta_1 = 0 (the model explains no more variance than the sample mean alone)",
          "H0: Residuals are not normally distributed",
          "H0: Sample size n is too small"
        ],
        "question": "In an ANOVA table for simple linear regression, what null hypothesis does the overall model F-statistic test?"
      },
      {
        "answer": 1,
        "explanation": "In simple linear regression with 1 numerator degree of freedom, the square of the Student's t-statistic equals the F-statistic: F = t^2.",
        "options": [
          "F = sqrt(t)",
          "F = t^2",
          "F = 2 * t",
          "F = t / 2"
        ],
        "question": "For a simple linear regression model with a single predictor, what is the exact mathematical relationship between the slope t-statistic and the model F-statistic?"
      }
    ]
  },
  {
    "index": 41,
    "id": "u1cc1r_Y7M0",
    "title": "Linear Regression in R, Step-by-Step",
    "shortTitle": "Linear Regression in R",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "7:12",
    "embedUrl": "https://www.youtube-nocookie.com/embed/u1cc1r_Y7M0?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=u1cc1r_Y7M0&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=41",
    "summary": "Mastering the syntax and output of R's lm() function: understanding coefficients, standard errors, t-values, p-values, and the F-statistic.",
    "bamIntuition": "Running lm(y ~ x) in R spits out a summary table. Learn how to read the four columns: Estimate, Std. Error, t value, and Pr(>|t|), and BAM: You know if your predictor matters!",
    "firstPrinciples": "In R, formulas use Wilkinson-Rogers notation `y ~ x`. The `summary.lm()` output reports: 1. Residual percentiles; 2. Coefficients table with estimate $\\hat{\\beta}_j$, standard error $\\text{SE}(\\hat{\\beta}_j) = \\sqrt{s^2 (\\mathbf{X}^T\\mathbf{X})^{-1}_{jj}}$, $t = \\hat{\\beta}_j / \\text{SE}$, and two-tailed p-value; 3. Residual standard error $s_e = \\sqrt{\\frac{SS_{\\text{res}}}{n - p - 1}}$; 4. Multiple and Adjusted $R^2$; 5. Global F-statistic $F = \\frac{SS_{\\text{reg}}/p}{SS_{\\text{res}}/(n - p - 1)}$.",
    "mathFormulas": [
      {
        "explanation": "Tests whether all slope coefficients simultaneously equal zero.",
        "latex": "F = \\frac{(SS_{\\text{tot}} - SS_{\\text{res}})/p}{SS_{\\text{res}} / (n - p - 1)}",
        "name": "Overall F-Statistic"
      },
      {
        "explanation": "Estimated standard deviation of the error term.",
        "latex": "s_e = \\sqrt{\\frac{\\sum e_i^2}{n - p - 1}}",
        "name": "Residual Standard Error"
      }
    ],
    "numericalExample": "In R, fitting mouse weight on size: `fit <- lm(weight ~ size)`. Summary output: Coefficients: (Intercept) = 0.93, size = 0.64 (p = 0.002). Multiple R-squared: 0.78, F-statistic: 28.5 on 1 and 8 DF, p-value: 0.00067. The size coefficient is highly significant.",
    "pythonCode": "import statsmodels.formula.api as smf\nimport pandas as pd\n\ndf = pd.DataFrame({'size': [1.2, 1.5, 2.0, 2.5, 3.1], 'weight': [1.8, 2.1, 2.9, 3.4, 4.2]})\nmodel = smf.ols('weight ~ size', data=df).fit()\nprint(model.summary())",
    "rCode": "size <- c(1.2, 1.5, 2.0, 2.5, 3.1)\nweight <- c(1.8, 2.1, 2.9, 3.4, 4.2)\nfit <- lm(weight ~ size)\nsummary(fit)",
    "pitfalls": "Interpreting the intercept p-value as evidence for or against the scientific hypothesis. The intercept merely represents the baseline when X = 0, which may be outside the physical data range.",
    "interactiveType": "r_regression",
    "quiz": [
      {
        "answer": 1,
        "explanation": "The global F-test evaluates H0: beta1 = beta2 = ... = betap = 0 against the alternative that at least one slope is non-zero.",
        "options": [
          "That the intercept is 0",
          "That ALL predictor slope coefficients are simultaneously equal to zero",
          "That the residuals are normal",
          "That R^2 = 1.0"
        ],
        "question": "What null hypothesis does the F-statistic test in multiple linear regression?"
      },
      {
        "answer": 1,
        "explanation": "The `lm()` function (Linear Model) in base R fits linear models using formula syntax `response ~ predictor`.",
        "options": [
          "`regress(y ~ x)`",
          "`lm(y ~ x, data = df)`",
          "`fit.line(y, x)`",
          "`ols(y = x)`"
        ],
        "question": "In R, what is the primary function used to fit an ordinary least squares linear regression model?"
      },
      {
        "answer": 1,
        "explanation": "The row for predictor x tests whether its coefficient significantly differs from zero using a two-tailed t-test.",
        "options": [
          "The probability that the intercept is positive",
          "The hypothesis test H0: beta_1 = 0 against H1: beta_1 != 0",
          "The normality of predictor x",
          "The proportion of missing values in the dataframe"
        ],
        "question": "In the output of `summary(lm(y ~ x))`, what does the p-value associated with the `x` coefficient row evaluate?"
      }
    ]
  },
  {
    "index": 42,
    "id": "zITIFTsivN8",
    "title": "Multiple Regression, Clearly Explained!!!",
    "shortTitle": "Multiple Regression",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "10:30",
    "embedUrl": "https://www.youtube-nocookie.com/embed/zITIFTsivN8?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=zITIFTsivN8&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=42",
    "summary": "Extending linear regression to two or more predictor variables, creating 3D planes or multi-dimensional hyperplanes that isolate partial effects.",
    "bamIntuition": "With two predictors (X1 and X2), your regression line becomes a 3D flat plane! The slope for X1 tells you how Y changes when you freeze X2 in place! BAM: Multiple Regression!",
    "firstPrinciples": "Multiple linear regression models the target as $y_i = \\beta_0 + \\sum_{j=1}^p \\beta_j x_{ij} + \\epsilon_i$. In matrix notation: $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$. The coefficient $\\beta_j$ represents the *partial derivative* $\\frac{\\partial E[Y]}{\\partial X_j}$, measuring the effect of a 1-unit increase in $X_j$ while *holding all other predictors constant* (ceteris paribus). Multicollinearity occurs when columns of $\\mathbf{X}$ are linearly dependent, causing $(\\mathbf{X}^T\\mathbf{X})$ to become ill-conditioned and inflating coefficient variances.",
    "mathFormulas": [
      {
        "explanation": "The analytic OLS solution for multiple regression.",
        "latex": "\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}",
        "name": "Matrix Normal Equation"
      },
      {
        "explanation": "Measures variance inflation of coefficient j caused by collinearity with other features.",
        "latex": "\\text{VIF}_j = \\frac{1}{1 - R_j^2}",
        "name": "Variance Inflation Factor (VIF)"
      }
    ],
    "numericalExample": "Predicting blood pressure (Y) from Age (X1) and Weight (X2): Fitted plane: Y = 80 + 0.5 * Age + 0.3 * Weight. For two people of the exact same weight, each additional year of age increases predicted blood pressure by 0.5 mmHg.",
    "pythonCode": "import statsmodels.api as sm\nimport numpy as np\n\n# Simulating 3D regression\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = 5 + 2.5 * X[:, 0] - 1.8 * X[:, 1] + np.random.randn(100) * 0.5\nX_design = sm.add_constant(X)\nfit = sm.OLS(y, X_design).fit()\nprint('Estimated Coefficients:', fit.params.round(3))",
    "rCode": "set.seed(42)\nx1 <- rnorm(100); x2 <- rnorm(100)\ny <- 5 + 2.5*x1 - 1.8*x2 + rnorm(100, 0, 0.5)\nsummary(lm(y ~ x1 + x2))",
    "pitfalls": "Interpreting regression coefficients causally when omitted variable bias is present (confounding), or including highly correlated predictors (VIF > 10) causing wild coefficient sign flips.",
    "interactiveType": "regression3d",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Multiple regression coefficients represent partial effects, isolating the change in Y per unit increase in X1 while mathematically controlling for X2.",
        "options": [
          "The change in Y when X1 changes, ignoring X2",
          "The expected change in Y per unit change in X1, holding X2 constant",
          "The correlation between X1 and Y",
          "The intercept of X1"
        ],
        "question": "What is the meaning of coefficient beta1 in the multiple regression Y = beta0 + beta1*X1 + beta2*X2?"
      },
      {
        "answer": 1,
        "explanation": "Multiple regression coefficients are partial regression slopes: they measure the unique association of x_1 with y after adjusting for all other predictors.",
        "options": [
          "The total change in y as x_1 changes without regard to x_2",
          "The expected change in y per one-unit increase in x_1, HOLDING x_2 CONSTANT",
          "The correlation between x_1 and x_2",
          "The R-squared of x_1"
        ],
        "question": "In the multiple regression model y = beta_0 + beta_1 * x_1 + beta_2 * x_2 + epsilon, what is the precise interpretation of beta_1?"
      },
      {
        "answer": 1,
        "explanation": "Multicollinearity occurs when predictors are correlated, inflating standard errors. VIF > 5 or 10 indicates severe multicollinearity.",
        "options": [
          "Non-normal errors; diagnosed by QQ plot",
          "High linear correlation among predictor variables; diagnosed by the Variance Inflation Factor (VIF)",
          "Heteroscedasticity; diagnosed by Breusch-Pagan test",
          "Outliers; diagnosed by Cook's distance"
        ],
        "question": "What is multicollinearity in multiple regression, and what metric is standardly used to diagnose its severity?"
      }
    ]
  },
  {
    "index": 43,
    "id": "hokALdIst8k",
    "title": "Multiple Regression in R, Step-by-Step!!!",
    "shortTitle": "Multiple Regression in R",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "8:05",
    "embedUrl": "https://www.youtube-nocookie.com/embed/hokALdIst8k?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=hokALdIst8k&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=43",
    "summary": "Hands-on implementation of multiple regression in R, comparing models with ANOVA, evaluating adjusted R-squared, and checking diagnostic plots.",
    "bamIntuition": "Add predictors with plus signs: lm(y ~ x1 + x2). Compare the simple model to the big model with anova(model1, model2). If p < 0.05, the extra variable earns its keep! BAM!",
    "firstPrinciples": "Model comparison tests whether an expanded model with $p_2$ additional parameters significantly improves fit over a nested reduced model with $p_1$ parameters: $H_0: \\beta_{p_1+1} = \\dots = \\beta_{p_2} = 0$. The nested partial F-test statistic is $F = \\frac{(SS_{\\text{res, reduced}} - SS_{\\text{res, full}}) / (p_2 - p_1)}{SS_{\\text{res, full}} / (n - p_2 - 1)} \\sim F_{p_2 - p_1, n - p_2 - 1}$. In R, `anova(fit_reduced, fit_full)` computes this partial F-test directly.",
    "mathFormulas": [
      {
        "explanation": "Evaluates whether adding variables significantly reduces unexplained variance.",
        "latex": "F = \\frac{(SS_{\\text{res, red}} - SS_{\\text{res, full}}) / \\Delta p}{SS_{\\text{res, full}} / df_{\\text{full}}}",
        "name": "Partial F-Statistic"
      },
      {
        "explanation": "Identifies influential observations that dramatically shift fitted values.",
        "latex": "D_i = \\frac{\\sum (\\hat{y}_j - \\hat{y}_{j(i)})^2}{p \\cdot s^2}",
        "name": "Cook's Distance (Leverage)"
      }
    ],
    "numericalExample": "Reduced model (lm(y ~ x1)) has SS_res = 120 (df = 28). Full model (lm(y ~ x1 + x2)) has SS_res = 85 (df = 27). Extra parameter Delta p = 1. Numerator = (120 - 85)/1 = 35. Denominator = 85 / 27 = 3.15. F = 35 / 3.15 = 11.11 (p = 0.0025). Adding x2 provides a statistically significant improvement.",
    "pythonCode": "import statsmodels.api as sm\nfrom statsmodels.formula.api import ols\nimport pandas as pd\n\ndf = pd.DataFrame({'x1': [1,2,3,4,5,6], 'x2': [2,1,4,3,6,5], 'y': [3,4,6,7,9,10]})\nm1 = ols('y ~ x1', data=df).fit()\nm2 = ols('y ~ x1 + x2', data=df).fit()\nprint(sm.stats.anova_lm(m1, m2))",
    "rCode": "df <- data.frame(x1=c(1,2,3,4,5,6), x2=c(2,1,4,3,6,5), y=c(3,4,6,7,9,10))\nm1 <- lm(y ~ x1, data=df)\nm2 <- lm(y ~ x1 + x2, data=df)\nanova(m1, m2)",
    "pitfalls": "Comparing non-nested models with ANOVA. If model A uses x1 and model B uses x2, `anova(mA, mB)` is invalid; use AIC or BIC instead.",
    "interactiveType": "multiple_r",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Partial F-tests through ANOVA require the smaller model to be a strict mathematical sub-model (nested) of the larger model.",
        "options": [
          "Any time you have two models",
          "Only when model 1 is strictly nested within model 2 (model 2 contains all predictors of model 1 plus extras)",
          "Only when R^2 > 0.9",
          "Only when data is discrete"
        ],
        "question": "When can anova(model1, model2) be used to test whether adding variables significantly improves fit?"
      },
      {
        "answer": 1,
        "explanation": "In R formula notation, the asterisk `*` expands to main effects plus interactions: `x1 * x2` is equivalent to `x1 + x2 + x1:x2`.",
        "options": [
          "Only the interaction term x1:x2 without main effects",
          "The main effect of x1, the main effect of x2, AND the interaction term x1:x2",
          "Multiplication of x1 and x2 into a single column",
          "Division of x1 by x2"
        ],
        "question": "In R formula syntax for multiple regression, what does the formula `y ~ x1 * x2` specify?"
      },
      {
        "answer": 1,
        "explanation": "Passing two nested `lm` models to `anova()` conducts a partial F-test comparing the reduction in residual sum of squares against added degrees of freedom.",
        "options": [
          "`compare(m1, m2)`",
          "`anova(model_reduced, model_full)`",
          "`t.test(m1, m2)`",
          "`summary(m1 - m2)`"
        ],
        "question": "What function in R performs an F-test to compare two nested models (e.g. testing whether adding x2 and x3 significantly improves model fit)?"
      }
    ]
  },
  {
    "index": 44,
    "id": "NF5_btOaCig",
    "title": "Using Linear Models for t-tests and ANOVA, Clearly Explained!!!",
    "shortTitle": "Linear Models for t-tests and ANOVA",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "11:40",
    "embedUrl": "https://www.youtube-nocookie.com/embed/NF5_btOaCig?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=NF5_btOaCig&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=44",
    "summary": "The Grand Unified Theory: t-tests and ANOVA are not separate algorithms; they are simply ordinary linear regression with dummy (indicator) variables!",
    "bamIntuition": "Mind blown! A two-sample t-test is literally just a linear regression line connecting two points! ANOVA with 3 groups is just regression with two dummy variables! It's all the same thing! BAM!",
    "firstPrinciples": "Consider a two-sample t-test comparing Control and Treatment. Define indicator variable $X_i = 1$ if treated, and $0$ if control. The linear regression model $Y_i = \\beta_0 + \\beta_1 X_i + \\epsilon_i$ yields: For Control ($X=0$): $E[Y] = \\beta_0 = \\mu_{\\text{control}}$. For Treatment ($X=1$): $E[Y] = \\beta_0 + \\beta_1 = \\mu_{\\text{treatment}}$. Thus, the slope $\\beta_1 = \\mu_{\\text{treatment}} - \\mu_{\\text{control}}$, and testing $\\beta_1 = 0$ is algebraically and numerically identical to Student's two-sample t-test ($t = \\sqrt{F}$). For $k$ groups, $k-1$ dummy variables reproduce one-way ANOVA exactly.",
    "mathFormulas": [
      {
        "explanation": "Linear model representing two group means via baseline and offset.",
        "latex": "Y_i = \\beta_0 + \\beta_1 D_i + \\epsilon_i, \\quad D_i \\in \\{0, 1\\}",
        "name": "Dummy Variable Regression"
      },
      {
        "explanation": "The squared t-statistic from regression equals the ANOVA F-statistic.",
        "latex": "t^2 = F = \\frac{MS_{\\text{between}}}{MS_{\\text{within}}}",
        "name": "t-test and ANOVA Equivalence"
      }
    ],
    "numericalExample": "Control: [10, 12, 14] (mean = 12). Treatment: [16, 18, 20] (mean = 18). Running a two-sample t-test gives t = -3.67, p = 0.021. Running linear regression `lm(Y ~ Group)` gives intercept beta0 = 12.0, slope beta1 = +6.0, t = 3.67, p = 0.021. The results are mathematically identical to the last decimal place!",
    "pythonCode": "from scipy import stats\nimport statsmodels.formula.api as smf\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'group': ['Control']*3 + ['Treat']*3,\n    'val': [10, 12, 14, 16, 18, 20]\n})\nt_res = stats.ttest_ind(df[df.group=='Treat'].val, df[df.group=='Control'].val, equal_var=True)\nlm_res = smf.ols('val ~ group', data=df).fit()\nprint(f'T-test p-value: {t_res.pvalue:.4f}')\nprint(f'Regression slope p-value: {lm_res.pvalues[\"group[T.Treat]\"]:.4f}')",
    "rCode": "df <- data.frame(group=rep(c('Control','Treat'), each=3), val=c(10,12,14, 16,18,20))\ncat('t-test p:', t.test(val ~ group, data=df, var.equal=TRUE)$p.value, '\\n')\ncat('lm p:    ', summary(lm(val ~ group, data=df))$coefficients[2, 4])",
    "pitfalls": "Thinking you must memorize dozens of disparate statistical tests; once you understand linear models, t-tests, ANOVA, ANCOVA, and regression are revealed as the exact same mathematical engine.",
    "interactiveType": "linear_models_anova",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because E[Y|Control] = beta0 and E[Y|Treatment] = beta0 + beta1, beta1 is exactly the mean difference between the two groups.",
        "options": [
          "The mean of the treatment group",
          "The difference in means between Treatment and Control (Treatment - Control)",
          "The correlation coefficient",
          "The sample size"
        ],
        "question": "In the regression model Y = beta0 + beta1*Group (where Group is 0 for Control and 1 for Treatment), what does beta1 represent?"
      },
      {
        "answer": 0,
        "explanation": "A two-sample t-test is identical to a regression on a binary indicator: beta_0 is the mean of group 0, and beta_1 is the difference in means between groups.",
        "options": [
          "y = beta_0 + beta_1 * Group + epsilon, where Group is an indicator variable coded 0 or 1",
          "y = Group^2 + epsilon",
          "Group = beta_0 + beta_1 * y",
          "It cannot be represented as a linear model"
        ],
        "question": "How can a standard independent two-sample t-test be equivalently framed as a general linear model?"
      },
      {
        "answer": 1,
        "explanation": "Under treatment coding, beta_0 is the expected value when all dummy indicators are 0 (the reference group mean), and slopes represent pairwise deviations from reference.",
        "options": [
          "The grand mean of all 3 groups combined",
          "The mean of the designated reference (baseline) group",
          "The difference between group 1 and group 2",
          "The standard deviation of group 1"
        ],
        "question": "In a linear model representing a One-Way ANOVA with 3 groups using default treatment (dummy) coding, what does the intercept beta_0 represent?"
      }
    ]
  },
  {
    "index": 45,
    "id": "CqLGvwi-5Pc",
    "title": "Design Matrices For Linear Models, Clearly Explained!!!",
    "shortTitle": "Design Matrices For Linear Models",
    "moduleId": "module-10",
    "category": "Regression & Linear Models",
    "duration": "9:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/CqLGvwi-5Pc?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=CqLGvwi-5Pc&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=45",
    "summary": "How statistical software translates experimental formulas into design matrices (X) with columns of 1s, continuous predictors, and dummy contrasts.",
    "bamIntuition": "Behind every R or Python model formula lurks the Design Matrix X! It's a grid of 1s and 0s that turns complex categorical experiments into clean matrix algebra: Y = X * Beta! BAM!",
    "firstPrinciples": "In linear algebra, any linear model can be expressed as $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}$, where $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$ is the design (model) matrix. The first column is typically a vector of ones $\\mathbf{1}_n$ corresponding to the intercept $\\beta_0$. Categorical factors with $k$ levels are converted using treatment coding (dummy coding) into $k-1$ indicator columns, omitting the reference category to prevent column collinearity and ensure $(\\mathbf{X}^T\\mathbf{X})$ is invertible.",
    "mathFormulas": [
      {
        "explanation": "Target vector equals Design Matrix times parameter vector plus noise.",
        "latex": "\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}",
        "name": "Linear Model Matrix Form"
      },
      {
        "explanation": "Orthogonal projection operator onto the column space of X.",
        "latex": "\\mathbf{H} = \\mathbf{X}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T, \\quad \\hat{\\mathbf{y}} = \\mathbf{H}\\mathbf{y}",
        "name": "Projection Hat Matrix"
      }
    ],
    "numericalExample": "Experiment with 3 groups (A, B, C) and 1 subject each. Treatment coding with A as baseline: Column 1 (Intercept): [1, 1, 1]^T. Column 2 (Group B): [0, 1, 0]^T. Column 3 (Group C): [0, 0, 1]^T. For group A: [1, 0, 0] * beta = beta0. For group B: [1, 1, 0] * beta = beta0 + beta1. For group C: [1, 0, 1] * beta = beta0 + beta2.",
    "pythonCode": "import patsy\nimport pandas as pd\n\ndf = pd.DataFrame({'group': ['A', 'B', 'C', 'A', 'B']})\ndesign_matrix = patsy.dmatrix('group', df)\nprint('Patsy Design Matrix:\\n', design_matrix)",
    "rCode": "df <- data.frame(group=factor(c('A', 'B', 'C', 'A', 'B')))\nmodel.matrix(~ group, data=df)",
    "pitfalls": "Falling into the 'Dummy Variable Trap': creating $k$ dummy columns while ALSO including an intercept column of 1s. The sum of the $k$ columns equals the intercept column, creating perfect multicollinearity and making matrix inversion impossible.",
    "interactiveType": "design_matrix",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because the sum of all k dummies equals the column of 1s, the matrix columns are linearly dependent, making (X^T * X) singular and non-invertible.",
        "options": [
          "The model runs twice as fast",
          "The design matrix becomes rank-deficient (singular), causing the Dummy Variable Trap",
          "The R-squared becomes negative",
          "P-values are cut in half"
        ],
        "question": "What happens if you include k dummy columns for a k-level categorical variable AND an intercept column of ones?"
      },
      {
        "answer": 1,
        "explanation": "A column of 1s ensures that when multiplied by the parameter vector beta, the first term produces the constant intercept beta_0.",
        "options": [
          "The values of the response variable Y",
          "A column of 1s (the intercept column)",
          "Random normal errors",
          "The index number of each observation"
        ],
        "question": "In the matrix formulation of linear models Y = X*beta + epsilon, what does the first column of the design matrix X typically contain?"
      },
      {
        "answer": 0,
        "explanation": "If columns of X are linearly dependent (e.g. dummy variable trap or perfect multicollinearity), X^T X is singular and cannot be inverted.",
        "options": [
          "X must have full column rank (columns must be linearly independent so X^T X is invertible)",
          "X must be a square matrix",
          "All entries in X must be positive",
          "The determinant of X must be zero"
        ],
        "question": "What mathematical condition must the design matrix X satisfy for the OLS normal equation solution beta_hat = (X^T X)^(-1) X^T Y to exist uniquely?"
      }
    ]
  },
  {
    "index": 46,
    "id": "XLCWeSVzHUU",
    "title": "Sampling from a Distribution, Clearly Explained!!!",
    "shortTitle": "Sampling from a Distribution",
    "moduleId": "module-2",
    "category": "Probability Distributions",
    "duration": "7:25",
    "embedUrl": "https://www.youtube-nocookie.com/embed/XLCWeSVzHUU?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=XLCWeSVzHUU&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=46",
    "summary": "Generating random numbers from any probability distribution using the Inverse Transform Sampling theorem and uniform random generators.",
    "bamIntuition": "How do computers generate random numbers from a weird bell or exponential curve? They roll a uniform random number between 0 and 1 on the vertical Y-axis of the CDF, read across, drop straight down to the X-axis, and BAM: You've sampled from the distribution!",
    "firstPrinciples": "The Probability Integral Transform states that if $X$ is a continuous random variable with strictly increasing CDF $F_X(x)$, then $U = F_X(X) \\sim \\text{Uniform}(0, 1)$. Conversely, for any uniform random variable $U \\sim \\text{Uniform}(0, 1)$, the transformed variable $X = F_X^{-1}(U)$ has exact distribution $F_X$. For distributions with intractable inverse CDFs (like standard normal), the Box-Muller transform or Rejection Sampling (von Neumann) is utilized.",
    "mathFormulas": [
      {
        "explanation": "Generates samples from F using uniform pseudorandom numbers.",
        "latex": "X = F^{-1}(U), \\quad U \\sim \\text{Uniform}(0, 1)",
        "name": "Inverse CDF Transform"
      },
      {
        "explanation": "Proof that applying the CDF to any random variable yields Uniform(0, 1).",
        "latex": "P(F(X) \\le u) = P(X \\le F^{-1}(u)) = F(F^{-1}(u)) = u",
        "name": "CDF Uniformity"
      }
    ],
    "numericalExample": "Sampling an Exponential(lambda = 2) variable. CDF is F(x) = 1 - e^(-2x). Inverting: u = 1 - e^(-2x) -> 1 - u = e^(-2x) -> x = -ln(1 - u) / 2. If computer rolls uniform u = 0.60: x = -ln(0.40) / 2 = -(-0.9163) / 2 = 0.458. This 0.458 is an exact draw from the exponential distribution!",
    "pythonCode": "import numpy as np\n\n# Inverse CDF sampling for Exponential(rate=2)\nu = np.random.uniform(0, 1, size=1000)\nx_samples = -np.log(1 - u) / 2.0\nprint(f'Sample mean: {np.mean(x_samples):.3f} (True: 0.500)')",
    "rCode": "u <- runif(1000)\nx_samples <- -log(1 - u) / 2\ncat('Sample mean:', mean(x_samples))",
    "pitfalls": "Using standard rejection sampling when proposal density envelopes are inefficient, causing astronomical rejection rates in high dimensions.",
    "interactiveType": "sampling_sim",
    "quiz": [
      {
        "answer": 1,
        "explanation": "By the Probability Integral Transform theorem, F(X) is always distributed as Uniform(0, 1).",
        "options": [
          "Normal(0, 1)",
          "Uniform(0, 1)",
          "Exponential(1)",
          "Chi-Square(1)"
        ],
        "question": "If you pass random samples from any continuous distribution through its own CDF function F(X), what distribution do the resulting values have?"
      },
      {
        "answer": 0,
        "explanation": "Since the CDF F(x) maps the domain to [0, 1], applying its inverse quantile function F^(-1) to Uniform(0, 1) variables produces exact draws from F.",
        "options": [
          "Inverse Transform Sampling: X = F^(-1)(U)",
          "Gradient Descent",
          "The Newton-Raphson Method",
          "Principal Component Analysis"
        ],
        "question": "What algorithm allows you to draw random samples from an arbitrary continuous distribution using only standard uniform random numbers U ~ Uniform(0, 1)?"
      },
      {
        "answer": 0,
        "explanation": "The Glivenko-Cantelli theorem states that the empirical CDF F_n(x) converges uniformly almost surely to the true CDF F(x) as n -> infinity.",
        "options": [
          "The Glivenko-Cantelli Theorem (Fundamental Theorem of Statistics)",
          "Bayes' Theorem",
          "The Gauss-Markov Theorem",
          "Fermat's Last Theorem"
        ],
        "question": "What fundamental theorem guarantees that as the number of random draws n increases, the empirical distribution of samples converges to the true population distribution?"
      }
    ]
  },
  {
    "index": 47,
    "id": "i4iUvjsGCMc",
    "title": "Bam!!! Clearly Explained!!!",
    "shortTitle": "BAM! Clearly Explained",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "3:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/i4iUvjsGCMc?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=i4iUvjsGCMc&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=47",
    "summary": "Josh Starmer's signature philosophical insight: demystifying statistics by connecting mathematical abstraction to immediate intuitive eureka moments.",
    "bamIntuition": "BAM is that magical moment when confusion evaporates! Statistics is not a torture device designed by sadists; it's a collection of simple, elegant visual ideas that let you see the truth in data. BAM!",
    "firstPrinciples": "Statistical pedagogy often obscures foundational simplicity behind impenetrable Greek notation and ad-hoc recipes. The BAM philosophy operates on cognitive first principles: 1. Ground abstract symbols in concrete geometric pictures; 2. Demonstrate what the formulas actually measure (areas, distances, slopes); 3. Reconcile intuition with formal proof. When cognitive friction is eliminated, complex algorithms (neural networks, PCA, maximum likelihood) reveal themselves as intuitive extensions of basic geometry.",
    "mathFormulas": [
      {
        "explanation": "Josh Starmer's pedagogical maxim for conceptual mastery.",
        "latex": "\\text{Understanding} = \\lim_{\\text{Jargon} \\to 0} \\frac{\\text{First Principles}}{\\text{Visual Intuition}} = \\text{BAM!}",
        "name": "Cognitive Clarity Formula"
      },
      {
        "explanation": "The transition from mechanical calculation to deep understanding.",
        "latex": "\\Delta \\text{Insight} = \\text{Concept}(\\text{Visual}) - \\text{Formulas}(\\text{Rote})",
        "name": "Eureka Moment"
      }
    ],
    "numericalExample": "Consider standard deviation: Rather than memorizing 'sqrt(sum(x - mean)^2 / (n-1))', visualize: How far is each dot from the center? Measure those lines, square them, average them, and take the square root. Instantly memorable!",
    "pythonCode": "def statquest_bam():\n    print('DOUBLE BAM! Clear concepts triumph over confusing jargon!')\n\nstatquest_bam()",
    "rCode": "message('BAM! Statistics clearly explained!')",
    "pitfalls": "Relying on rote memorization of formulas without understanding their geometric or physical mechanisms.",
    "interactiveType": "bam_moment",
    "quiz": [
      {
        "answer": 1,
        "explanation": "StatQuest focuses on clear, step-by-step visual explanations that make core statistical concepts intuitive and memorable.",
        "options": [
          "To derive proofs without pictures",
          "To break complex statistics down into small, clearly understood first-principles steps",
          "To memorize p-value tables",
          "To replace math with code"
        ],
        "question": "What is the primary mission of the StatQuest methodology?"
      },
      {
        "answer": 1,
        "explanation": "StatQuest shows that intimidating statistical concepts (like MLE, PCA, and ANOVA) are composed of simple, intuitive pieces that anyone can master.",
        "options": [
          "To eliminate all mathematical proofs from science",
          "To demystify complex quantitative concepts by breaking them into intuitive, visual first-principles building blocks",
          "To promote Python over R",
          "To replace hypothesis testing with machine learning"
        ],
        "question": "What is the primary pedagogical goal of the StatQuest BAM! philosophy?"
      },
      {
        "answer": 1,
        "explanation": "Software will willingly compute an ANOVA or linear regression on invalid data; only the researcher's conceptual understanding can detect violated assumptions.",
        "options": [
          "Because software packages cannot calculate p-values",
          "Because black-box application of algorithms without understanding assumptions leads to misinterpreting outputs and invalid scientific claims",
          "Because manual calculations are always faster than computers",
          "Because statistical packages are proprietary"
        ],
        "question": "Why is intuitive first-principles understanding critical before applying statistical software packages?"
      }
    ]
  },
  {
    "index": 48,
    "id": "KEofcJ1tfkI",
    "title": "StatQuickie: Thresholds for Significance",
    "shortTitle": "Thresholds for Significance",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "4:45",
    "embedUrl": "https://www.youtube-nocookie.com/embed/KEofcJ1tfkI?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=KEofcJ1tfkI&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=48",
    "summary": "The historical origins of the arbitrary alpha = 0.05 threshold, Ronald Fisher's original intent, and modern recommendations for reporting effect sizes.",
    "bamIntuition": "Why 0.05? Ronald Fisher said in 1925 that 1 in 20 was a convenient rule of thumb! There is zero divine law carved on stone tablets. A p-value of 0.049 is NOT radically different from 0.051! BAM!",
    "firstPrinciples": "The choice of significance level $\\alpha$ represents an explicit decision threshold trading off Type I error risk against Type II error risk. In Neyman-Pearson decision theory, $\\alpha$ is chosen a priori by balancing the utility/cost matrix of errors. In 2018, 72 prominent statisticians proposed lowering the default significance threshold for claiming novel discoveries from $\\alpha = 0.05$ to $\\alpha = 0.005$ to combat the replication crisis.",
    "mathFormulas": [
      {
        "explanation": "Dichotomous cutoff converting continuous tail probability into discrete scientific verdict.",
        "latex": "\\text{Decision} = \\begin{cases} \\text{Reject } H_0 & \\text{if } p \\le \\alpha \\\\ \\text{Fail to Reject } H_0 & \\text{if } p > \\alpha \\end{cases}",
        "name": "Significance Decision Boundary"
      },
      {
        "explanation": "Modern proposed threshold to dramatically reduce false positive literature claims.",
        "latex": "\\alpha_{\\text{discovery}} = 0.005 \\quad (z \\approx 2.81)",
        "name": "Proposed Strict Threshold"
      }
    ],
    "numericalExample": "Two studies on a cancer drug: Study 1 finds p = 0.048 (labeled 'STATISTICALLY SIGNIFICANT'). Study 2 finds p = 0.052 (labeled 'FAILED TO REPLICATE'). In reality, both studies observed nearly identical evidence. Dichotomizing continuous evidence into binary win/loss creates artificial scientific division.",
    "pythonCode": "p1 = 0.048\np2 = 0.052\nprint('Arbitrary cutoff p < 0.05:')\nprint(f'p1 = {p1} -> Significant? {p1 < 0.05}')\nprint(f'p2 = {p2} -> Significant? {p2 < 0.05}')",
    "rCode": "p_vals <- c(0.048, 0.052)\np_vals < 0.05",
    "pitfalls": "Treating p = 0.05 as an absolute cliff of truth. Always report exact p-values alongside effect sizes and 95% confidence intervals.",
    "interactiveType": "alpha_thresholds",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Fisher viewed p < 0.05 as a practical indicator that an experimental effect was worth looking into further.",
        "options": [
          "Absolute scientific proof of truth",
          "An informal benchmark warranting further investigation, not an immutable law of nature",
          "A mathematical constant like pi",
          "The probability the hypothesis was true"
        ],
        "question": "What did Ronald Fisher originally intend the p < 0.05 threshold to represent?"
      },
      {
        "answer": 0,
        "explanation": "R. A. Fisher suggested 1 in 20 (p = 0.05) as a convenient threshold for judging whether an experimental result warranted further investigation.",
        "options": [
          "Ronald A. Fisher",
          "Thomas Bayes",
          "Pierre-Simon Laplace",
          "Blaise Pascal"
        ],
        "question": "Who popularized the conventional significance threshold alpha = 0.05 in statistical biology?"
      },
      {
        "answer": 1,
        "explanation": "Dichotomizing p-values leads to flawed conclusions where p=0.049 is called a discovery and p=0.051 is dismissed, despite virtually identical data.",
        "options": [
          "Because p-values cannot be computed on modern computers",
          "Because a result with p = 0.049 is practically indistinguishable from p = 0.051; dichotomizing continuous evidence ignores effect size, estimation uncertainty, and prior evidence",
          "Because alpha = 0.05 is mathematically impossible to achieve",
          "Because only p < 0.0001 is true"
        ],
        "question": "Why do leading statistical organizations (like the American Statistical Association) advise against treating p = 0.05 as a bright-line boundary between truth and falsehood?"
      }
    ]
  },
  {
    "index": 49,
    "id": "nnBJeb_I-q8",
    "title": "StatQuickie: Which t test to use",
    "shortTitle": "Which t-test to Use?",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "5:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/nnBJeb_I-q8?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=nnBJeb_I-q8&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=49",
    "summary": "A clean decision framework choosing between One-Sample, Independent Two-Sample (Student's), Paired, and Welch's t-test for unequal variances.",
    "bamIntuition": "One group vs known number? One-sample t-test! Same people measured before and after? Paired t-test! Two completely different groups? Independent t-test! Unequal spread? Welch's t-test! BAM!",
    "firstPrinciples": "The t-test family is governed by experimental design and variance homoscedasticity: 1. **One-sample t-test**: $t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, $df = n - 1$. 2. **Paired t-test**: Computes differences $d_i = x_{1i} - x_{2i}$, testing $H_0: \\mu_d = 0$, removing subject-specific baseline noise. 3. **Student's two-sample t-test**: Assumes equal variances $\\sigma_1^2 = \\sigma_2^2$, pooling variance: $s_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}$. 4. **Welch's t-test**: Relaxes equal variance assumption, adjusting degrees of freedom via the Welch-Satterthwaite equation.",
    "mathFormulas": [
      {
        "explanation": "Does not pool variances; robust to heteroscedasticity.",
        "latex": "t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}",
        "name": "Welch's t-statistic"
      },
      {
        "explanation": "Fractional degrees of freedom correcting for unequal variances.",
        "latex": "df = \\frac{\\left(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}\\right)^2}{\\frac{(s_1^2/n_1)^2}{n_1-1} + \\frac{(s_2^2/n_2)^2}{n_2-1}}",
        "name": "Welch-Satterthwaite df"
      }
    ],
    "numericalExample": "Testing patient blood pressure Before and After medication on 10 patients. Because baseline patient blood pressures vary widely, a paired t-test on differences (After - Before) eliminates inter-subject variance, drastically increasing test sensitivity compared to an unpaired test.",
    "pythonCode": "from scipy import stats\n\nbefore = [140, 150, 135, 160, 145]\nafter = [130, 138, 128, 142, 135]\n# Paired t-test\nres_paired = stats.ttest_rel(after, before)\n# Welch's independent t-test (equal_var=False)\nres_welch = stats.ttest_ind(after, before, equal_var=False)\nprint(f'Paired p-value: {res_paired.pvalue:.4f}')\nprint(f'Welch p-value:  {res_welch.pvalue:.4f}')",
    "rCode": "before <- c(140, 150, 135, 160, 145)\nafter  <- c(130, 138, 128, 142, 135)\nt.test(after, before, paired=TRUE)\nt.test(after, before, var.equal=FALSE)",
    "pitfalls": "Using standard Student's t-test when group variances or sample sizes differ substantially; Welch's t-test should be the universal default because it incurs virtually zero power penalty even when variances are equal.",
    "interactiveType": "t_test_selector",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Welch's t-test robustly protects against Type I error inflation under heteroscedasticity while performing with nearly identical power to Student's test when variances are equal.",
        "options": [
          "It is easier to calculate by hand",
          "It does not assume equal variances between groups and loses almost no power when variances happen to be equal",
          "It does not use degrees of freedom",
          "It requires smaller sample sizes"
        ],
        "question": "Why is Welch's t-test recommended by modern statisticians as the universal default over Student's t-test?"
      },
      {
        "answer": 1,
        "explanation": "Welch's t-test does not assume equal variances, adjusting the standard error and using Satterthwaite degrees of freedom to maintain valid Type I error rates.",
        "options": [
          "Student's pooled t-test",
          "Welch's t-test (unequal variances t-test)",
          "Paired t-test",
          "One-sample z-test"
        ],
        "question": "When comparing two independent groups where the assumption of equal variances is questionable (sigma_1^2 != sigma_2^2), which test should be used?"
      },
      {
        "answer": 1,
        "explanation": "Paired t-tests analyze the within-pair differences (d_i = x_{1,i} - x_{2,i}), removing between-subject variability and increasing statistical power.",
        "options": [
          "When comparing 3 or more groups",
          "When measurements naturally occur in linked pairs (e.g. before-and-after measurements on the same individual)",
          "When sample size is greater than 1,000",
          "When variances are unequal"
        ],
        "question": "When should a Paired t-test be used instead of an Independent Samples t-test?"
      }
    ]
  },
  {
    "index": 50,
    "id": "bsZGt-caXO4",
    "title": "StatQuest:  One or Two Tailed P-Values",
    "shortTitle": "One or Two Tailed P-Values",
    "moduleId": "module-5",
    "category": "Hypothesis Testing & P-Values",
    "duration": "6:10",
    "embedUrl": "https://www.youtube-nocookie.com/embed/bsZGt-caXO4?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=bsZGt-caXO4&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=50",
    "summary": "Comparing one-tailed and two-tailed p-values, symmetric rejection zones, and the ethical rules governing directional hypothesis testing.",
    "bamIntuition": "If you are testing whether a coin is biased, it could be biased towards heads OR tails! Look at both tails of the distribution. If you only look at one tail after seeing the data, you cut your p-value in half dishonestly! BAM!",
    "firstPrinciples": "A test statistic $T$ has null distribution density $f(t)$ symmetric around 0. In a two-tailed test: $p_{2\\text{-tail}} = 2 \\cdot P(T \\ge |t_{\\text{obs}}|) = 2 \\int_{|t_{\\text{obs}}|}^\\infty f(u) du$. In a one-tailed test in the direction of the observed effect: $p_{1\\text{-tail}} = P(T \\ge t_{\\text{obs}}) = \\frac{1}{2} p_{2\\text{-tail}}$. Using a one-tailed test doubles your effective alpha level in that direction, making it twice as easy to achieve nominal significance.",
    "mathFormulas": [
      {
        "explanation": "Two-tailed p-value doubles one-tailed p-value for symmetric distributions.",
        "latex": "p_{2\\text{-tailed}} = 2 \\cdot p_{1\\text{-tailed}}",
        "name": "Tail Relationship"
      },
      {
        "explanation": "Critical thresholds for two-tailed vs one-tailed tests.",
        "latex": "|T| \\ge t_{1 - \\alpha/2} \\quad \\text{vs} \\quad T \\ge t_{1 - \\alpha}",
        "name": "Rejection Condition"
      }
    ],
    "numericalExample": "Calculated t-statistic = 2.10 with df = 20. One-tail area = 0.024. Two-tail p-value = 2 * 0.024 = 0.048. If the researcher had mistakenly not doubled the tail, they might report 0.024, misrepresenting their two-sided risk.",
    "pythonCode": "from scipy import stats\n\nt_val = 2.10\ndf = 20\np_one = 1 - stats.t.cdf(t_val, df=df)\np_two = 2 * p_one\nprint(f'One-tailed p: {p_one:.4f}, Two-tailed p: {p_two:.4f}')",
    "rCode": "t_val <- 2.10; df <- 20\np_one <- 1 - pt(t_val, df=df)\ncat('1-tail:', p_one, '2-tail:', 2 * p_one)",
    "pitfalls": "Choosing a one-tailed test AFTER observing which direction the sample drifted. That is unethical data snooping and inflates Type I errors to 10%.",
    "interactiveType": "one_vs_two_tailed",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because a two-tailed test integrates both tails of equal area, its p-value is exactly twice the one-tailed value.",
        "options": [
          "They are identical",
          "The two-tailed p-value is exactly twice the one-tailed p-value",
          "The two-tailed p-value is squared",
          "The one-tailed p-value is always greater"
        ],
        "question": "What is the relationship between one-tailed and two-tailed p-values for a symmetric test statistic?"
      },
      {
        "answer": 1,
        "explanation": "A one-tailed test considers only one tail of the symmetric distribution, so its area is exactly half of the two-tailed rejection area.",
        "options": [
          "p_one = 2 * p_two",
          "p_one = p_two / 2",
          "p_one = p_two",
          "p_one = 1 - p_two"
        ],
        "question": "For a symmetric test statistic with observed t = +2.20, how does the one-tailed p-value in the observed direction relate to the two-tailed p-value?"
      },
      {
        "answer": 1,
        "explanation": "Directional hypotheses must be specified before looking at data. Testing one-sided only after seeing the direction of the mean halves the p-value post-hoc, cheating the alpha threshold.",
        "options": [
          "Because one-tailed tests are mathematically invalid",
          "Because choosing the tail post-hoc effectively doubles the significance level alpha from 0.05 to 0.10, inflating false positive rates",
          "Because computers can only compute two-tailed tests",
          "Because sample sizes must be even for one-tailed tests"
        ],
        "question": "Why is switching from a two-tailed test to a one-tailed test AFTER observing your sample data considered improper p-hacking?"
      }
    ]
  },
  {
    "index": 51,
    "id": "IFKQLDmRK0Y",
    "title": "Quantiles and Percentiles, Clearly Explained!!!",
    "shortTitle": "Quantiles and Percentiles",
    "moduleId": "module-7",
    "category": "Quantiles & QQ-Plots",
    "duration": "6:35",
    "embedUrl": "https://www.youtube-nocookie.com/embed/IFKQLDmRK0Y?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=IFKQLDmRK0Y&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=51",
    "summary": "Quantiles slice sorted continuous distributions into equal probability intervals, with percentiles dividing data into 100 equal slices.",
    "bamIntuition": "Sort everyone from shortest to tallest. Cut the line into 100 equal chunks! The 50th percentile is the median. The 25th is Q1. The 75th is Q3. That's all quantiles are: ranks converted to cuts! BAM!",
    "firstPrinciples": "For a cumulative distribution function $F$, the $q$-th quantile (where $q \\in [0, 1]$) is defined by the generalized inverse: $Q(q) = F^{-1}(q) = \\inf \\{x : F(x) \\ge q\\}$. For sample data $x_{(1)} \\le x_{(2)} \\le \\dots \\le x_{(n)}$, empirical quantiles interpolate between adjacent order statistics: $\\hat{q}(p) = (1 - \\gamma) x_{(j)} + \\gamma x_{(j+1)}$. Common quantiles include quartiles (4 cuts: $q = 0.25, 0.50, 0.75$), deciles (10 cuts), and percentiles (100 cuts).",
    "mathFormulas": [
      {
        "explanation": "Inverse CDF mapping probability p to value threshold x.",
        "latex": "Q(p) = F^{-1}(p) = \\inf \\{x \\in \\mathbb{R} : F(x) \\ge p\\}",
        "name": "Quantile Function"
      },
      {
        "explanation": "The 50th percentile is the exact center of probability mass.",
        "latex": "Q(0.50) = \\text{Median} = F^{-1}(0.50)",
        "name": "Median as 0.50 Quantile"
      }
    ],
    "numericalExample": "Sorted test scores: [55, 60, 65, 70, 75, 80, 85, 90, 95, 100]. n = 10. The 90th percentile is the score below which 90% of scores fall: index = 0.90 * 10 = 9th score = 95. The 50th percentile (median) is (75 + 80)/2 = 77.5.",
    "pythonCode": "import numpy as np\n\nscores = np.array([55, 60, 65, 70, 75, 80, 85, 90, 95, 100])\nprint('25th percentile (Q1):', np.percentile(scores, 25))\nprint('50th percentile (Median):', np.percentile(scores, 50))\nprint('90th percentile:', np.percentile(scores, 90))",
    "rCode": "scores <- c(55, 60, 65, 70, 75, 80, 85, 90, 95, 100)\nquantile(scores, probs=c(0.25, 0.50, 0.90))",
    "pitfalls": "Confusing percentiles (ranks along the distribution from 0 to 100) with percentages (proportions of correct answers on a test). Scoring 90% on an exam is not the same as being in the 90th percentile of test-takers.",
    "interactiveType": "quantiles",
    "quiz": [
      {
        "answer": 1,
        "explanation": "The 0.50 quantile (50th percentile) is precisely the median.",
        "options": [
          "Mean",
          "Median",
          "Mode",
          "Standard Deviation"
        ],
        "question": "What is another name for the 0.50 quantile of a distribution?"
      },
      {
        "answer": 1,
        "explanation": "By definition, the 50th percentile (quantile 0.50) divides the area under the probability density curve into two equal halves of 0.50.",
        "options": [
          "The arithmetic mean",
          "The median",
          "The mode",
          "The standard deviation"
        ],
        "question": "What is the 50th percentile of any continuous probability distribution?"
      },
      {
        "answer": 1,
        "explanation": "The Interquartile Range (IQR) spans from the 25th to the 75th percentile, encompassing exactly 75% - 25% = 50% of the distribution.",
        "options": [
          "25%",
          "50%",
          "75%",
          "95%"
        ],
        "question": "What proportion of observations in any distribution lies strictly between the 1st quartile (25th percentile) and the 3rd quartile (75th percentile)?"
      }
    ]
  },
  {
    "index": 52,
    "id": "okjYjClSjOg",
    "title": "Quantile-Quantile Plots (QQ plots), Clearly Explained!!!",
    "shortTitle": "Quantile-Quantile Plots (Q-Q Plots)",
    "moduleId": "module-7",
    "category": "Quantiles & QQ-Plots",
    "duration": "8:40",
    "embedUrl": "https://www.youtube-nocookie.com/embed/okjYjClSjOg?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=okjYjClSjOg&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=52",
    "summary": "Plotting sample quantiles against theoretical Gaussian quantiles to diagnose normality, skewness, heavy tails, and kurtosis.",
    "bamIntuition": "Sort your data and plot it against what a perfect bell curve would predict! If the dots form a dead-straight diagonal line, your data is normal! If it curves or snakes, you've got skew or fat tails! BAM!",
    "firstPrinciples": "A Q-Q plot evaluates whether a sample $\\mathbf{x}$ follows theoretical distribution $F_0$. For sorted observations $x_{(1)} \\le x_{(2)} \\le \\dots \\le x_{(n)}$, empirical plotting positions are $p_i = \\frac{i - 3/8}{n + 1/4}$ (Blom's formula). The plot graphs pairs $(q_i, x_{(i)})$, where $q_i = \\Phi^{-1}(p_i)$ are theoretical standard normal quantiles. If $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, then $x_{(i)} \\approx \\mu + \\sigma q_i$, forming a straight line with intercept $\\mu$ and slope $\\sigma$. S-shaped deviations indicate heavy or light tails; upward/downward curvature reveals skewness.",
    "mathFormulas": [
      {
        "explanation": "Expected position of i-th order statistic from standard normal distribution.",
        "latex": "q_i = \\Phi^{-1}\\left(\\frac{i - 3/8}{n + 1/4}\\right)",
        "name": "Theoretical Normal Quantile"
      },
      {
        "explanation": "If data is normal, points fall along a straight line with slope equal to sigma.",
        "latex": "x_{(i)} = \\mu + \\sigma \\cdot q_i",
        "name": "Linear Alignment Condition"
      }
    ],
    "numericalExample": "If data has fat tails (Student's t-distribution), extreme observations on both ends are much further out than a normal curve predicts. On the Q-Q plot, the left points plunge below the line and right points soar above the line, forming an inverted-S shape.",
    "pythonCode": "import statsmodels.api as sm\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Sample from standard normal vs heavy-tailed t-distribution\nnormal_data = np.random.normal(size=100)\nfig, ax = plt.subplots(figsize=(6, 4))\nsm.qqplot(normal_data, line='45', ax=ax)\nplt.title('Q-Q Plot of Normal Data')",
    "rCode": "data <- rnorm(100)\nqqnorm(data); qqline(data, col='red')",
    "pitfalls": "Over-interpreting wiggles at the extreme edges of a Q-Q plot in small samples ($n < 30$), where sample quantile variance is naturally elevated.",
    "interactiveType": "qqplot",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Right-skewed data has compressed lower values and stretched upper values, causing the Q-Q points to curve upward.",
        "options": [
          "A perfectly straight line",
          "An upward-curving parabolic shape (both ends curve upward above the straight line)",
          "A horizontal line",
          "A zigzag"
        ],
        "question": "What pattern does a right-skewed distribution display on a normal Q-Q plot?"
      },
      {
        "answer": 0,
        "explanation": "If empirical sample quantiles match theoretical Gaussian quantiles across all percentiles, the points plot along a straight line y = mu + sigma * z.",
        "options": [
          "The sample data closely match the theoretical normal distribution",
          "The sample data are uniform",
          "The variance is zero",
          "The sample size is too small"
        ],
        "question": "In a Quantile-Quantile (QQ) plot comparing sample quantiles against theoretical normal quantiles, what does it mean if the plotted points fall along a straight diagonal line?"
      },
      {
        "answer": 1,
        "explanation": "When sample extremes are more pronounced than theoretical normal predictions, points bend downward on the left and upward on the right, diagnosing heavy tails.",
        "options": [
          "Light tails (bounded domain like Uniform)",
          "Heavy tails (leptokurtic distribution with more extreme outliers than Gaussian, like Student's t)",
          "Severe right skewness only",
          "Bimodal discrete data"
        ],
        "question": "If points on a normal QQ plot deviate from the line in an S-shape (lower quantiles are lower than expected, upper quantiles are higher than expected), what does that diagnose?"
      }
    ]
  },
  {
    "index": 53,
    "id": "ecjN6Xpv6SE",
    "title": "Quantile Normalization, Clearly Explained!!!",
    "shortTitle": "Quantile Normalization",
    "moduleId": "module-7",
    "category": "Quantiles & QQ-Plots",
    "duration": "9:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/ecjN6Xpv6SE?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=ecjN6Xpv6SE&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=53",
    "summary": "Making statistical distributions identical across biological replicates or microarray/RNA-seq samples by aligning ranked values to average quantiles.",
    "bamIntuition": "Sample 1 was scanned on a bright day, Sample 2 on a dim day! Their distributions look totally different because of instrument drift. Sort each sample, replace each rank with the average across all samples, restore original order, and BAM: Perfectly normalized!",
    "firstPrinciples": "Quantile normalization (Bolstad et al. 2003) transforms $p$ sample arrays $\\mathbf{x}_1, \\dots, \\mathbf{x}_p \\in \\mathbb{R}^n$ so that they share identical empirical distribution functions while preserving each feature's rank within its sample. Algorithm: 1. Form matrix $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$; 2. Sort each column independently to obtain $\\mathbf{X}_{\\text{sort}}$; 3. Compute row means $\\bar{r}_i = \\frac{1}{p}\\sum_{j=1}^p X_{\\text{sort}, ij}$; 4. Replace each sorted element with $\\bar{r}_i$; 5. Restore elements to their original sample ranks. Geometrically, this projects data onto the diagonal vector of equality in $\\mathbb{R}^p$.",
    "mathFormulas": [
      {
        "explanation": "Average value of the i-th highest observation across all p samples.",
        "latex": "\\bar{r}_i = \\frac{1}{p} \\sum_{j=1}^p x_{(i), j}",
        "name": "Mean Quantile Vector"
      },
      {
        "explanation": "Substitutes mean quantile back into original observation position.",
        "latex": "x_{ij}^{\\text{norm}} = \\bar{r}_{\\text{rank}(x_{ij})}",
        "name": "Normalized Value Assignment"
      }
    ],
    "numericalExample": "Two samples with 3 genes each: Sample A: [2, 4, 9]. Sample B: [4, 6, 8]. Both already sorted. Row means: Row 1: (2+4)/2 = 3.0. Row 2: (4+6)/2 = 5.0. Row 3: (9+8)/2 = 8.5. Normalized Sample A = [3.0, 5.0, 8.5]. Normalized Sample B = [3.0, 5.0, 8.5]. Both samples now have identical distributions, eliminating technical batch differences.",
    "pythonCode": "import pandas as pd\nimport numpy as np\n\ndef quantile_normalize(df):\n    df_sort = pd.DataFrame(np.sort(df.values, axis=0), index=df.index, columns=df.columns)\n    df_mean = df_sort.mean(axis=1)\n    df_norm = df.rank(method='min').stack().astype(int).map(df_mean).unstack()\n    return df_norm\n\ndf = pd.DataFrame({'Sample1': [2, 4, 9], 'Sample2': [4, 6, 8]})\nprint('Normalized:\\n', quantile_normalize(df))",
    "rCode": "# Quantile normalization in R\nlibrary(preprocessCore)\nmat <- matrix(c(2,4,9, 4,6,8), nrow=3)\nnormalize.quantiles(mat)",
    "pitfalls": "Applying quantile normalization when there are massive true global biological shifts (e.g. comparing healthy cells to cells where 80% of transcription is shut down), which erases real biology.",
    "interactiveType": "quantile_norm",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Quantile normalization preserves the exact relative rank order of features within each sample while equalizing all distribution shapes.",
        "options": [
          "Its original numerical value",
          "Its relative rank order within that sample",
          "Its variance",
          "Its mean"
        ],
        "question": "What is preserved for each feature within a sample during quantile normalization?"
      },
      {
        "answer": 1,
        "explanation": "Quantile normalization removes technical between-sample batch variation by forcing all samples to have the same quantile distribution without changing within-sample ranks.",
        "options": [
          "To force all genes to have equal variance",
          "To make the empirical statistical distribution across different arrays or samples identical while preserving within-sample rank ordering",
          "To eliminate all zero expression values",
          "To cluster samples into PCA components"
        ],
        "question": "In high-throughput biological experiments (such as RNA sequencing or microarrays), what is the primary objective of Quantile Normalization?"
      },
      {
        "answer": 1,
        "explanation": "Sorting columns, averaging corresponding rank positions across columns, and replacing raw values with the mean for that rank produces identical distributions across all columns.",
        "options": [
          "Multiply each column by its median",
          "Rank order each column, calculate the row-wise mean across ranked values, and assign these mean values back to the original ranks in each column",
          "Subtract the minimum and divide by maximum",
          "Standardize each column to mean 0 and SD 1"
        ],
        "question": "What is the core algorithmic procedure of quantile normalization across multiple sample columns?"
      }
    ]
  },
  {
    "index": 54,
    "id": "pYxNSUDSFH4",
    "title": "In Statistics, Probability is not Likelihood.",
    "shortTitle": "Probability is NOT Likelihood",
    "moduleId": "module-9",
    "category": "Probability vs Likelihood & MLE",
    "duration": "8:05",
    "embedUrl": "https://www.youtube-nocookie.com/embed/pYxNSUDSFH4?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=pYxNSUDSFH4&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=54",
    "summary": "In statistics, Probability is the area under a fixed distribution given parameters; Likelihood is the curve height for fixed observed data as parameters vary.",
    "bamIntuition": "Probability = Fixed curve, variable data (Area under curve!). Likelihood = Fixed data point, variable curve (Height of curve at that point!). They are literally opposite directions! BAM!",
    "firstPrinciples": "Let $f(x \\mid \\theta)$ be a probability density function. When the parameter $\\theta$ is fixed and $x$ varies, $f(\\cdot \\mid \\theta)$ is a probability density: $\\int_{\\mathcal{X}} f(x \\mid \\theta) dx = 1$, and probabilities are areas. Conversely, when data $\\mathbf{x}$ is fixed and observed, the function $L(\\theta \\mid \\mathbf{x}) = f(\\mathbf{x} \\mid \\theta)$ is the Likelihood function of $\\theta$. Crucially, $\\int_\\Theta L(\\theta \\mid \\mathbf{x}) d\\theta \\ne 1$; likelihood is NOT a probability distribution over $\\theta$!",
    "mathFormulas": [
      {
        "explanation": "Integral of PDF over data interval with fixed model parameters.",
        "latex": "P(a \\le X \\le b \\mid \\theta) = \\int_a^b f(x \\mid \\theta)\\,dx",
        "name": "Probability (Fixed Theta)"
      },
      {
        "explanation": "Function of parameter theta evaluated at fixed observed observation.",
        "latex": "L(\\theta \\mid x_{\\text{obs}}) = f(x_{\\text{obs}} \\mid \\theta)",
        "name": "Likelihood (Fixed Data)"
      }
    ],
    "numericalExample": "Observed mouse weight x = 32 grams. Candidate Model A: N(mu = 32, sigma = 2). Height of curve at x = 32 is f(32 | mu=32, sigma=2) = 1/(2*sqrt(2*pi)) = 0.199. Candidate Model B: N(mu = 25, sigma = 2). Height at x = 32 is f(32 | mu=25, sigma=2) = 0.0004. Model A has 500x higher likelihood than Model B!",
    "pythonCode": "from scipy import stats\n\nx_obs = 32\nlik_model_a = stats.norm.pdf(x_obs, loc=32, scale=2)\nlik_model_b = stats.norm.pdf(x_obs, loc=25, scale=2)\nprint(f'Likelihood under Model A: {lik_model_a:.4f}')\nprint(f'Likelihood under Model B: {lik_model_b:.4f}')",
    "rCode": "x_obs <- 32\ncat('Lik A:', dnorm(x_obs, 32, 2), 'Lik B:', dnorm(x_obs, 25, 2))",
    "pitfalls": "Integrating the likelihood function with respect to $\\theta$ and calling the result a probability; in frequentist statistics, likelihood does not integrate to 1 and is not a probability density.",
    "interactiveType": "prob_vs_lik",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Probability varies data over fixed parameters; Likelihood varies parameters over fixed observed data.",
        "options": [
          "They are synonyms",
          "Probability measures data outcomes under fixed parameters; Likelihood measures parameter plausibility given fixed data",
          "Probability is for discrete data, Likelihood is for continuous data",
          "Likelihood must integrate to 1.0"
        ],
        "question": "What is the key difference between probability and likelihood?"
      },
      {
        "answer": 0,
        "explanation": "Probability is a measure over outcomes: int f(x | theta) dx = 1. Likelihood is a function of parameters theta: int L(theta | x) dtheta is generally not 1.",
        "options": [
          "Probability treats parameters theta as fixed and integrates to 1 over data; Likelihood treats observed data as fixed and varies parameters theta (and does NOT integrate to 1)",
          "Probability is always greater than 1; Likelihood is always less than 1",
          "Probability is Bayesian; Likelihood is Frequentist only",
          "There is no mathematical difference"
        ],
        "question": "What is the crucial mathematical difference between Probability P(Data | theta) and Likelihood L(theta | Data)?"
      },
      {
        "answer": 1,
        "explanation": "While P(X = x_0) = 0 for continuous variables, likelihood measures the relative height of the density curve at x_0 under candidate parameter theta.",
        "options": [
          "The cumulative probability F(x_0 | theta)",
          "The vertical height of the density function at that point: f(x_0 | theta)",
          "The derivative f'(x_0 | theta)",
          "Zero, because single points have zero probability"
        ],
        "question": "For a continuous probability density function f(x | theta), what does the likelihood L(theta | x_0) of parameter theta given a single observed value x_0 equal?"
      }
    ]
  },
  {
    "index": 55,
    "id": "XepXtl9YKwc",
    "title": "Maximum Likelihood, clearly explained!!!",
    "shortTitle": "Maximum Likelihood Estimation",
    "moduleId": "module-9",
    "category": "Probability vs Likelihood & MLE",
    "duration": "9:40",
    "embedUrl": "https://www.youtube-nocookie.com/embed/XepXtl9YKwc?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=XepXtl9YKwc&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=55",
    "summary": "Maximum Likelihood Estimation (MLE) finds the parameter values that maximize the joint probability of observing the collected sample data.",
    "bamIntuition": "Shift and stretch your distribution until the curve peak aligns with where your data is clustered! When the product of all curve heights reaches the absolute summit, BAM: Maximum Likelihood!",
    "firstPrinciples": "Given i.i.d. observations $\\mathbf{x} = (x_1, \\dots, x_n)$, the joint likelihood is the product of individual densities: $L(\\theta \\mid \\mathbf{x}) = \\prod_{i=1}^n f(x_i \\mid \\theta)$. Because products are analytically unwieldy and numerically prone to underflow, we take the natural logarithm to obtain the log-likelihood: $\\ell(\\theta) = \\ln L(\\theta) = \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)$. The MLE estimator $\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\ell(\\theta)$ solves the score equation $\\nabla_\\theta \\ell(\\theta) = \\mathbf{0}$. By the Cram\u00e9r-Rao bound, MLE is asymptotically efficient and attains minimum variance.",
    "mathFormulas": [
      {
        "explanation": "Sum of log-densities converting multiplication into addition.",
        "latex": "\\ell(\\theta) = \\sum_{i=1}^n \\ln f(x_i \\mid \\theta)",
        "name": "Log-Likelihood Objective"
      },
      {
        "explanation": "First-order optimality condition for the likelihood peak.",
        "latex": "S(\\theta) = \\frac{\\partial \\ell(\\theta)}{\\partial \\theta} = 0",
        "name": "Score Equation"
      }
    ],
    "numericalExample": "Three observations: x = [10, 11, 12]. Candidate mu = 11: Residuals are [-1, 0, +1]. Squared sum = 2. Candidate mu = 15: Residuals are [-5, -4, -3]. Squared sum = 50. Since normal log-likelihood is proportional to -sum(x - mu)^2, mu = 11 maximizes the likelihood.",
    "pythonCode": "from scipy.optimize import minimize\nimport numpy as np\n\ndata = np.array([10, 11, 12])\ndef neg_log_lik(mu):\n    return np.sum((data - mu)**2) / 2.0  # proportional to negative log-likelihood\n\nres = minimize(neg_log_lik, x0=[0.0])\nprint(f'MLE for mu: {res.x[0]:.2f} (Sample Mean: {np.mean(data):.2f})')",
    "rCode": "data <- c(10, 11, 12)\nmle <- optimize(function(mu) -sum(dnorm(data, mu, 1, log=TRUE)), interval=c(0, 20))\ncat('MLE for mu:', mle$minimum)",
    "pitfalls": "Directly multiplying raw densities on a computer: for $n = 100$, $(0.05)^{100} \\approx 10^{-130}$, which underflows to 0.0 in floating point. Always work in log-likelihood space!",
    "interactiveType": "mle3d",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Because log is a monotonically increasing function, maximizing log-likelihood yields the exact same optimal parameter while turning unstable products into tractable sums.",
        "options": [
          "Log-likelihood has a different maximum",
          "The log converts products of densities into sums, simplifying calculus and preventing numerical underflow",
          "Logs remove negative numbers",
          "Computers only understand logs"
        ],
        "question": "Why do statisticians maximize log-likelihood rather than raw likelihood?"
      },
      {
        "answer": 1,
        "explanation": "Since ln(x) is a strictly monotonically increasing function, maximizing ln L(theta) yields the exact same optimum as maximizing L(theta), while turning products into tractable sums.",
        "options": [
          "Because log-likelihood produces different parameter estimates",
          "Because the logarithm converts products of independent probabilities into sums, simplifying differentiation and preventing computational floating-point underflow",
          "Because raw likelihood cannot be differentiated",
          "Because log-likelihood is always positive"
        ],
        "question": "Why do statisticians almost universally maximize the Log-Likelihood ln L(theta) rather than the raw Likelihood function L(theta)?"
      },
      {
        "answer": 1,
        "explanation": "Asymptotic efficiency of MLE means that for large samples, no consistent estimator can achieve lower mean squared error.",
        "options": [
          "They are biased by 1/n",
          "They are asymptotically unbiased, asymptotically normal, and achieve the minimum possible variance (Cramer-Rao Lower Bound)",
          "They have infinite variance",
          "They only converge if the distribution is exponential"
        ],
        "question": "Under standard regularity conditions, what asymptotic property do Maximum Likelihood Estimators (MLE) possess as sample size n -> infinity?"
      }
    ]
  },
  {
    "index": 56,
    "id": "p3T-_LMrvBc",
    "title": "Maximum Likelihood for the Exponential Distribution, Clearly Explained!!!",
    "shortTitle": "MLE for the Exponential Distribution",
    "moduleId": "module-9",
    "category": "Probability vs Likelihood & MLE",
    "duration": "7:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/p3T-_LMrvBc?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=p3T-_LMrvBc&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=56",
    "summary": "Deriving the maximum likelihood estimator for rate parameter lambda by differentiating the log-likelihood and solving for zero.",
    "bamIntuition": "Write down the likelihood for waiting times. Take the log. Differentiate with respect to lambda. Set to zero, and BAM: lambda_hat = 1 / x_bar! The best rate is 1 divided by the sample average!",
    "firstPrinciples": "For $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)$, the PDF is $f(x_i \\mid \\lambda) = \\lambda e^{-\\lambda x_i}$. The likelihood is $L(\\lambda) = \\prod_{i=1}^n \\lambda e^{-\\lambda x_i} = \\lambda^n \\exp\\left(-\\lambda \\sum_{i=1}^n x_i\\right)$. Taking the natural log gives: $\\ell(\\lambda) = n \\ln \\lambda - \\lambda \\sum_{i=1}^n x_i$. Differentiating with respect to $\\lambda$: $\\frac{d\\ell}{d\\lambda} = \\frac{n}{\\lambda} - \\sum_{i=1}^n x_i$. Setting $\\frac{d\\ell}{d\\lambda} = 0$: $\\frac{n}{\\lambda} = \\sum_{i=1}^n x_i \\implies \\hat{\\lambda}_{\\text{MLE}} = \\frac{n}{\\sum x_i} = \\frac{1}{\\bar{x}}$. The second derivative $\\frac{d^2\\ell}{d\\lambda^2} = -\\frac{n}{\\lambda^2} < 0$ confirms this is a maximum.",
    "mathFormulas": [
      {
        "explanation": "Log-likelihood as a function of rate lambda.",
        "latex": "\\ell(\\lambda) = n \\ln(\\lambda) - \\lambda \\sum_{i=1}^n x_i",
        "name": "Exponential Log-Likelihood"
      },
      {
        "explanation": "The optimal rate parameter is the reciprocal of the sample mean.",
        "latex": "\\hat{\\lambda}_{\\text{MLE}} = \\frac{1}{\\bar{x}}",
        "name": "MLE Rate Estimator"
      }
    ],
    "numericalExample": "Observed waiting times for 4 bus arrivals: [2, 3, 5, 10] minutes. Sum = 20 minutes. Mean x_bar = 20 / 4 = 5.0 minutes per bus. MLE rate lambda_hat = 1 / 5.0 = 0.20 buses per minute.",
    "pythonCode": "import numpy as np\n\nwait_times = np.array([2, 3, 5, 10])\nx_bar = np.mean(wait_times)\nlambda_mle = 1.0 / x_bar\nprint(f'Sample mean: {x_bar:.1f} min -> MLE lambda: {lambda_mle:.3f} per min')",
    "rCode": "wait_times <- c(2, 3, 5, 10)\nlambda_mle <- 1 / mean(wait_times)\ncat('MLE lambda:', lambda_mle)",
    "pitfalls": "Confusing rate parameterization ($f(x) = \\lambda e^{-\\lambda x}$) with scale parameterization ($f(x) = \\frac{1}{\\beta} e^{-x/\\beta}$). For scale, $\\hat{\\beta} = \\bar{x}$.",
    "interactiveType": "mle_exp",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Solving d/dlambda [n * ln(lambda) - lambda * sum(x_i)] = 0 directly gives lambda_hat = 1 / x_bar.",
        "options": [
          "x_bar",
          "1 / x_bar",
          "sqrt(x_bar)",
          "x_bar^2"
        ],
        "question": "What is the maximum likelihood estimator for the rate parameter lambda of an exponential distribution?"
      },
      {
        "answer": 1,
        "explanation": "The log-likelihood is ln L = n*ln(lambda) - lambda*sum(x_i). Setting d(ln L)/dlambda = n/lambda - sum(x_i) = 0 gives lambda_hat = n / sum(x_i) = 1 / x_bar.",
        "options": [
          "lambda_hat = x_bar",
          "lambda_hat = 1 / x_bar (the inverse of the sample mean)",
          "lambda_hat = sqrt(x_bar)",
          "lambda_hat = sum(x_i)"
        ],
        "question": "For a sample of independent waiting times x_1, ..., x_n drawn from an Exponential(lambda) distribution, what is the Maximum Likelihood Estimator lambda_hat?"
      },
      {
        "answer": 1,
        "explanation": "Sample mean x_bar = (5 + 10 + 15 + 10) / 4 = 40 / 4 = 10 minutes. The MLE rate is lambda_hat = 1 / x_bar = 1 / 10 = 0.10 arrivals per minute.",
        "options": [
          "lambda_hat = 10",
          "lambda_hat = 0.10 arrivals per minute",
          "lambda_hat = 1.0",
          "lambda_hat = 0.025"
        ],
        "question": "If you observe 4 bus arrival waiting times: [5, 10, 15, 10] minutes, what is the Maximum Likelihood Estimate for the rate parameter lambda?"
      }
    ]
  },
  {
    "index": 57,
    "id": "4KKV9yZCoM4",
    "title": "Maximum Likelihood for the Binomial Distribution, Clearly Explained!!!",
    "shortTitle": "MLE for the Binomial Distribution",
    "moduleId": "module-9",
    "category": "Probability vs Likelihood & MLE",
    "duration": "8:25",
    "embedUrl": "https://www.youtube-nocookie.com/embed/4KKV9yZCoM4?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=4KKV9yZCoM4&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=57",
    "summary": "Deriving the maximum likelihood estimator for success probability p from n coin tosses or clinical trials from first principles.",
    "bamIntuition": "Flip a coin 100 times and get 60 heads. What's the most likely probability of heads? 60 / 100 = 0.60! MLE proves mathematically why your gut instinct is 100% correct! BAM!",
    "firstPrinciples": "For $k$ successes in $n$ independent Bernoulli trials, the likelihood is $L(p) = \\binom{n}{k} p^k (1-p)^{n-k}$. The log-likelihood is: $\\ell(p) = \\ln \\binom{n}{k} + k \\ln p + (n-k) \\ln (1-p)$. Differentiating with respect to $p$: $\\frac{d\\ell}{dp} = \\frac{k}{p} - \\frac{n-k}{1-p}$. Setting to zero: $\\frac{k}{p} = \\frac{n-k}{1-p} \\implies k(1-p) = p(n-k) \\implies k - kp = np - kp \\implies \\hat{p}_{\\text{MLE}} = \\frac{k}{n}$. The sample proportion is the exact MLE estimator.",
    "mathFormulas": [
      {
        "explanation": "Log-likelihood function parameterized by probability p.",
        "latex": "\\ell(p) = \\ln \\binom{n}{k} + k \\ln(p) + (n-k) \\ln(1-p)",
        "name": "Binomial Log-Likelihood"
      },
      {
        "explanation": "The maximum likelihood estimator is the observed sample proportion.",
        "latex": "\\hat{p}_{\\text{MLE}} = \\frac{k}{n}",
        "name": "MLE Success Probability"
      }
    ],
    "numericalExample": "Testing an ad: 150 clicks out of 1000 impressions. k = 150, n = 1000. MLE p_hat = 150 / 1000 = 0.15 (15% click-through rate). Any other value of p (e.g. 0.10 or 0.20) has lower likelihood.",
    "pythonCode": "k = 150\nn = 1000\np_mle = k / n\nprint(f'MLE estimate p-hat: {p_mle:.3f}')",
    "rCode": "k <- 150; n <- 1000\ncat('MLE p:', k / n)",
    "pitfalls": "Zero counts: If you flip a coin twice and get 2 heads, MLE says $\\hat{p} = 1.0$, predicting that tails is physically impossible! Bayesian estimation with Beta prior solves this via Laplace smoothing.",
    "interactiveType": "mle_binom",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Setting the derivative of the binomial log-likelihood to zero yields the sample proportion p_hat = k / n.",
        "options": [
          "k / (n + 1)",
          "k / n",
          "(k - 1) / n",
          "sqrt(k / n)"
        ],
        "question": "What is the maximum likelihood estimator for success probability p given k successes in n trials?"
      },
      {
        "answer": 1,
        "explanation": "Setting the derivative of log-likelihood d/dp [k*ln(p) + (n-k)*ln(1-p)] = k/p - (n-k)/(1-p) = 0 solves algebraically to p_hat = k / n.",
        "options": [
          "p_hat = n / k",
          "p_hat = k / n (the sample proportion of successes)",
          "p_hat = sqrt(k * n)",
          "p_hat = (k - 1) / (n - 1)"
        ],
        "question": "For k successes observed in n independent Bernoulli trials, what is the Maximum Likelihood Estimator p_hat for the probability of success?"
      },
      {
        "answer": 1,
        "explanation": "The MLE estimate is the sample proportion: p_hat = 32 / 50 = 0.64 (64%).",
        "options": [
          "0.50",
          "0.64 (64%)",
          "0.32",
          "0.80"
        ],
        "question": "You flip a coin 50 times and observe 32 heads. What is the Maximum Likelihood estimate of the probability of landing on heads?"
      }
    ]
  },
  {
    "index": 58,
    "id": "Dn6b9fCIUpM",
    "title": "Maximum Likelihood For the Normal Distribution, step-by-step!!!",
    "shortTitle": "MLE for the Normal Distribution",
    "moduleId": "module-9",
    "category": "Probability vs Likelihood & MLE",
    "duration": "11:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/Dn6b9fCIUpM?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=Dn6b9fCIUpM&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=58",
    "summary": "Step-by-step multivariate calculus derivation of MLE for both parameters of the normal distribution: mean mu and variance sigma^2.",
    "bamIntuition": "We have TWO dials to twist: center (mu) and width (sigma)! Twist mu until the curve is centered on the average. Twist sigma until the bell width matches the spread! That 3D mountain peak is the joint MLE! BAM!",
    "firstPrinciples": "For $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} \\mathcal{N}(\\mu, \\sigma^2)$, the joint density yields log-likelihood: $\\ell(\\mu, \\sigma^2) = -\\frac{n}{2}\\ln(2\\pi) - \\frac{n}{2}\\ln(\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n (x_i - \\mu)^2$. Taking partial derivatives: 1. $\\frac{\\partial \\ell}{\\partial \\mu} = \\frac{1}{\\sigma^2}\\sum (x_i - \\mu) = 0 \\implies \\hat{\\mu}_{\\text{MLE}} = \\frac{1}{n}\\sum x_i = \\bar{x}$. 2. $\\frac{\\partial \\ell}{\\partial (\\sigma^2)} = -\\frac{n}{2\\sigma^2} + \\frac{1}{2(\\sigma^2)^2}\\sum (x_i - \\mu)^2 = 0 \\implies \\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum (x_i - \\bar{x})^2$. Notice MLE divides by $n$, not $n-1$, making $\\hat{\\sigma}^2_{\\text{MLE}}$ slightly biased downward!",
    "mathFormulas": [
      {
        "explanation": "Joint log-likelihood surface over parameters mu and sigma^2.",
        "latex": "\\ell(\\mu, \\sigma^2) = -\\frac{n}{2}\\ln(2\\pi\\sigma^2) - \\frac{\\sum_{i=1}^n (x_i - \\mu)^2}{2\\sigma^2}",
        "name": "Normal Log-Likelihood"
      },
      {
        "explanation": "Maximum likelihood divides by n (biased), unlike Bessel's correction which divides by n-1.",
        "latex": "\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2",
        "name": "MLE Variance Estimator"
      }
    ],
    "numericalExample": "Sample: [2, 4, 6]. n = 3. Mean x_bar = 4. Squared deviations: (2-4)^2 + (4-4)^2 + (6-4)^2 = 4 + 0 + 4 = 8. MLE variance = 8 / 3 = 2.67. Unbiased sample variance s^2 = 8 / (3 - 1) = 4.00.",
    "pythonCode": "import numpy as np\n\ndata = np.array([2, 4, 6])\nmu_mle = np.mean(data)\nvar_mle = np.var(data, ddof=0)  # ddof=0 is MLE (divides by n)\nvar_unbiased = np.var(data, ddof=1)  # ddof=1 is Bessel (divides by n-1)\nprint(f'MLE mu: {mu_mle}, MLE sigma^2: {var_mle:.2f}, Unbiased s^2: {var_unbiased:.2f}')",
    "rCode": "data <- c(2, 4, 6)\ncat('MLE var:', mean((data - mean(data))^2), 'Unbiased s2:', var(data))",
    "pitfalls": "Assuming MLE is always unbiased. The MLE variance estimator $\\hat{\\sigma}^2_{\\text{MLE}}$ is biased: $E[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{n-1}{n}\\sigma^2$. As $n \\to \\infty$, the bias vanishes asymptotically.",
    "interactiveType": "mle_norm",
    "quiz": [
      {
        "answer": 1,
        "explanation": "Pure calculus optimization of the likelihood function produces 1/n in the variance estimator; Bessel's n-1 correction is an ad-hoc adjustment for unbiasedness.",
        "options": [
          "It divides by n-1",
          "It divides by n (which is biased)",
          "It divides by n+1",
          "It divides by degrees of freedom"
        ],
        "question": "Does the Maximum Likelihood Estimator for normal variance divide by n or n-1?"
      },
      {
        "answer": 1,
        "explanation": "Maximizing the normal log-likelihood with respect to mu is mathematically equivalent to minimizing sum (x_i - mu)^2, which is uniquely minimized by the sample mean.",
        "options": [
          "The sample median",
          "The sample mean x_bar = (1/n) * sum(x_i)",
          "The sample mode",
          "The geometric mean"
        ],
        "question": "What is the Maximum Likelihood Estimator for the population mean mu of a normal distribution N(mu, sigma^2)?"
      },
      {
        "answer": 1,
        "explanation": "The raw MLE divides by n rather than n-1. Its expectation is E[sigma_hat^2] = ((n-1)/n)*sigma^2, so it underestimates true variance in finite samples.",
        "options": [
          "sigma_hat^2 = (1/(n-1)) * sum(x_i - x_bar)^2; it is unbiased",
          "sigma_hat^2 = (1/n) * sum(x_i - x_bar)^2; it is BIASED downward by a factor of (n-1)/n",
          "sigma_hat^2 = s^2 / 2; it is unbiased",
          "sigma_hat^2 = 1.0; always constant"
        ],
        "question": "What is the Maximum Likelihood Estimator for the normal distribution variance sigma^2, and is it unbiased?"
      }
    ]
  },
  {
    "index": 59,
    "id": "ARfXDSkQf1Y",
    "title": "Odds and Log(Odds), Clearly Explained!!!",
    "shortTitle": "Odds and Log(Odds)",
    "moduleId": "module-11",
    "category": "Bayesian & Odds",
    "duration": "8:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/ARfXDSkQf1Y?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=ARfXDSkQf1Y&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=59",
    "summary": "Transforming bounded probability p in [0, 1] into unbounded odds in [0, inf) and symmetric log-odds in (-inf, +inf), the backbone of logistic regression.",
    "bamIntuition": "Probability stops at 0 and 1. Odds = Chance of Winning / Chance of Losing. If you have 80% chance of winning, your odds are 80/20 = 4 to 1! Take the logarithm, and BAM: You map everything smoothly from negative infinity to positive infinity!",
    "firstPrinciples": "Let $p = P(E) \\in [0, 1]$ be the probability of an event. The odds are defined as the ratio $\\text{Odds} = \\frac{p}{1 - p} \\in [0, \\infty)$. Odds equal 1.0 at equal likelihood ($p = 0.5$). The logit function is the natural log of odds: $\\text{logit}(p) = \\ln\\left(\\frac{p}{1 - p}\\right) \\in (-\\infty, \\infty)$. The logit maps the constrained probability interval $(0, 1)$ onto the real line $\\mathbb{R}$, allowing linear modeling: $\\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 X$. Inverting yields the logistic sigmoid: $p = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 X)}}$.",
    "mathFormulas": [
      {
        "explanation": "Ratio of probability of occurrence to probability of non-occurrence.",
        "latex": "\\text{Odds} = \\frac{p}{1 - p}",
        "name": "Odds Definition"
      },
      {
        "explanation": "Transforms probability into an unbounded symmetric linear scale.",
        "latex": "\\text{Logit}(p) = \\ln\\left(\\frac{p}{1 - p}\\right)",
        "name": "Log-Odds (Logit)"
      }
    ],
    "numericalExample": "If p = 0.80: Odds = 0.80 / (1 - 0.80) = 0.80 / 0.20 = 4.0 (or '4 to 1'). Log-odds = ln(4.0) = +1.386. If p = 0.20: Odds = 0.20 / 0.80 = 0.25 (or '1 to 4'). Log-odds = ln(0.25) = -1.386. Notice that log-odds has perfect anti-symmetry around 0!",
    "pythonCode": "import numpy as np\n\ndef prob_to_log_odds(p):\n    odds = p / (1 - p)\n    return np.log(odds)\n\nfor p in [0.1, 0.2, 0.5, 0.8, 0.9]:\n    print(f'p = {p:.1f} -> Odds = {p/(1-p):.2f} -> Log(Odds) = {prob_to_log_odds(p):.3f}')",
    "rCode": "p <- c(0.1, 0.2, 0.5, 0.8, 0.9)\nqlogis(p)  # R built-in logit function",
    "pitfalls": "Confusing odds with probability. Saying 'odds are 50%' is meaningless; odds of 1 to 1 corresponds to a 50% probability.",
    "interactiveType": "odds",
    "quiz": [
      {
        "answer": 1,
        "explanation": "When p = 0.50, Odds = 0.50 / 0.50 = 1.0. The natural log of 1.0 is ln(1) = 0.",
        "options": [
          "1.0",
          "0.0",
          "0.50",
          "-1.0"
        ],
        "question": "What is the log-odds (logit) when probability p = 0.50?"
      },
      {
        "answer": 1,
        "explanation": "Odds are defined as the ratio of success probability to failure probability: Odds = p / (1 - p) = 0.75 / 0.25 = 3.0.",
        "options": [
          "0.75",
          "0.75 / (1 - 0.75) = 0.75 / 0.25 = 3.0 (3 to 1)",
          "1.33",
          "0.25"
        ],
        "question": "If the probability of an event occurring is p = 0.75, what are the odds in favor of that event?"
      },
      {
        "answer": 1,
        "explanation": "The log-odds or logit transformation maps bounded probabilities (0, 1) to (-infinity, +infinity), making it ideal for linear regression modeling (logistic regression).",
        "options": [
          "logit(p) = ln(p); maps [0, 1] to [-1, 1]",
          "logit(p) = ln(p / (1 - p)); maps probability p in (0, 1) to the entire real line (-infinity, +infinity)",
          "logit(p) = e^p; maps reals to positive numbers",
          "logit(p) = 1 / (1 + e^(-p)); maps reals to [0, 1]"
        ],
        "question": "What is the logit function, and what mathematical domain and range does it map?"
      }
    ]
  },
  {
    "index": 60,
    "id": "8nm0G-1uJzA",
    "title": "Odds Ratios and Log(Odds Ratios), Clearly Explained!!!",
    "shortTitle": "Odds Ratios and Log(Odds Ratios)",
    "moduleId": "module-11",
    "category": "Bayesian & Odds",
    "duration": "9:30",
    "embedUrl": "https://www.youtube-nocookie.com/embed/8nm0G-1uJzA?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=8nm0G-1uJzA&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=60",
    "summary": "Comparing odds between two groups to quantify association strength in case-control studies, and exponentiating logistic regression coefficients.",
    "bamIntuition": "Did people taking the drug have lower odds of disease than people taking placebo? Divide the two odds! If the Odds Ratio is 0.25, the treated group has one-quarter the odds of sickness! BAM: Odds Ratio!",
    "firstPrinciples": "In a $2 \\times 2$ contingency table with groups (Exposed vs Unexposed) and outcomes (Disease vs Healthy): Group 1 odds is $\\text{Odds}_1 = \\frac{a}{b}$, and Group 2 odds is $\\text{Odds}_2 = \\frac{c}{d}$. The Odds Ratio is $\\text{OR} = \\frac{a/b}{c/d} = \\frac{ad}{bc}$. An $\\text{OR} = 1.0$ indicates no association. $\\text{OR} > 1$ implies positive association with exposure. In logistic regression, exponentiating a slope coefficient gives the adjusted odds ratio: $\\text{OR}_j = e^{\\beta_j}$. Taking the natural log yields symmetric log(odds ratio): $\\ln(\\text{OR}) = \\ln(a) - \\ln(b) - \\ln(c) + \\ln(d)$, with asymptotic standard error $\\text{SE}(\\ln \\text{OR}) = \\sqrt{\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} + \\frac{1}{d}}$.",
    "mathFormulas": [
      {
        "explanation": "Ratio of odds in exposed versus unexposed populations.",
        "latex": "\\text{OR} = \\frac{a \\cdot d}{b \\cdot c}",
        "name": "Cross-Product Odds Ratio"
      },
      {
        "explanation": "Factor by which odds multiply for a 1-unit increase in predictor X_j.",
        "latex": "\\text{OR}_j = e^{\\beta_j}",
        "name": "Logistic Slope Exponentiation"
      }
    ],
    "numericalExample": "Smokers: 20 lung cancer, 80 healthy (Odds = 20/80 = 0.25). Non-smokers: 2 lung cancer, 98 healthy (Odds = 2/98 = 0.0204). Odds Ratio = 0.25 / 0.0204 = 12.25. Smokers have 12.25 times higher odds of lung cancer compared to non-smokers.",
    "pythonCode": "import numpy as np\nfrom scipy import stats\n\ntable = [[20, 80], [2, 98]]\nres = stats.contingency.odds_ratio(table)\nprint(f'Sample Odds Ratio: {res.statistic:.2f}')\nprint(f'95% CI: [{res.confidence_interval().low:.2f}, {res.confidence_interval().high:.2f}]')",
    "rCode": "tab <- matrix(c(20, 80, 2, 98), nrow=2, byrow=TRUE)\n(tab[1,1]*tab[2,2]) / (tab[1,2]*tab[2,1])",
    "pitfalls": "Confusing Odds Ratio (OR) with Relative Risk (RR). When an outcome is common (e.g. 40% prevalence), the Odds Ratio dramatically overstates the Relative Risk.",
    "interactiveType": "odds_ratios",
    "quiz": [
      {
        "answer": 1,
        "explanation": "e^(-0.693) = 0.50, meaning the treated group has half the odds of the adverse outcome.",
        "options": [
          "-0.693",
          "0.50",
          "2.0",
          "1.0"
        ],
        "question": "If a logistic regression coefficient for a treatment is beta = -0.693, what is the treatment Odds Ratio e^beta?"
      },
      {
        "answer": 1,
        "explanation": "An Odds Ratio of 1.0 indicates that odds_exposed / odds_unexposed = 1, meaning exposure does not change the odds of developing the disease.",
        "options": [
          "The treatment was 100% effective",
          "No association: the odds of the outcome are identical in the exposed and unexposed groups",
          "The treatment increased disease odds by 100%",
          "The study had zero sample size"
        ],
        "question": "In a clinical case-control study, what does an Odds Ratio (OR) of exactly 1.0 indicate?"
      },
      {
        "answer": 1,
        "explanation": "A halving of odds (OR = 0.5) and a doubling of odds (OR = 2.0) have equal magnitude on the log scale: ln(0.5) = -0.693 and ln(2.0) = +0.693.",
        "options": [
          "Because raw odds ratios cannot exceed 1.0",
          "Because raw odds ratios are asymmetric (bounded between 0 and 1 for protective effects, but 1 to infinity for risk effects); log(OR) is symmetric around 0 and approximately normally distributed",
          "Because logarithm eliminates all random noise",
          "Because raw odds ratios cannot be tested with t-tests"
        ],
        "question": "Why is the Log(Odds Ratio) preferred over the raw Odds Ratio when computing confidence intervals and standard errors?"
      }
    ]
  },
  {
    "index": 61,
    "id": "6fWk_lQ_K5A",
    "title": "Frank Starmer Clearly Explained (How my pop influenced StatQuest!!!)",
    "shortTitle": "Frank Starmer Clearly Explained",
    "moduleId": "module-11",
    "category": "Bayesian & Odds",
    "duration": "6:50",
    "embedUrl": "https://www.youtube-nocookie.com/embed/6fWk_lQ_K5A?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=6fWk_lQ_K5A&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=61",
    "summary": "Honoring Frank Starmer: the mentor, cardiologist, and father who taught Josh Starmer how to strip away academic pretense and focus on first-principles clarity.",
    "bamIntuition": "Josh's pop, Frank Starmer, taught him the golden rule of science: If you can't explain it simply with clean pictures, you don't really understand it! That's the heart and soul of StatQuest! BAM!",
    "firstPrinciples": "Scientific inquiry often suffers from the curse of knowledge: experts forget what it was like not knowing a concept, constructing impenetrable fortresses of jargon. Frank Starmer advocated radical pedagogical reductionism: 1. Always trace any metric back to its physical or biological origin; 2. Never hide behind formulas you cannot derive from scratch on a chalkboard; 3. Use visual analogies that anchor directly in human sensory experience. This philosophy forms the foundation of all StatQuest visual paradigms.",
    "mathFormulas": [
      {
        "explanation": "The Frank Starmer educational principle: minimize rote memorization, maximize visual intuition.",
        "latex": "\\text{Mastery} = \\frac{\\text{Conceptual Clarity}}{\\text{Unnecessary Jargon}}",
        "name": "First-Principles Pedagogy"
      },
      {
        "explanation": "True understanding converges to simple, self-evident models.",
        "latex": "\\lim_{t \\to \\infty} \\text{Truth} = \\text{Simplicity}",
        "name": "Simplicity Principle"
      }
    ],
    "numericalExample": "Instead of defining an eigenvalue as 'roots of the characteristic polynomial det(A - lambda*I) = 0', Frank taught: 'When you stretch the rubber sheet, which directions don't rotate? Those are the eigenvectors!'",
    "pythonCode": "# The StatQuest Philosophy\ndef explain_clearly(topic):\n    return f'Break {topic} into bite-sized visual pieces. BAM!'\n\nprint(explain_clearly('Statistics'))",
    "rCode": "message('Keep it simple. Draw pictures. BAM!')",
    "pitfalls": "Believing that making an explanation needlessly dense, dry, or mathematically intimidating makes it more rigorous.",
    "interactiveType": "frank_starmer",
    "quiz": [
      {
        "answer": 1,
        "explanation": "True mastery is demonstrated by the ability to explain complex ideas simply and intuitively from first principles.",
        "options": [
          "Always use R instead of Python",
          "If you can't explain an idea simply with clear visuals, you haven't mastered it from first principles",
          "Statistics requires memorizing 50 test formulas",
          "Publish as many papers as possible"
        ],
        "question": "What is the primary philosophical lesson passed from Frank Starmer to StatQuest?"
      },
      {
        "answer": 1,
        "explanation": "Josh Starmer's father Frank Starmer taught that every formula is simply a shorthand summary of a simple logical mechanism that can be understood from first principles.",
        "options": [
          "Memorizing formulas is superior to visual intuition",
          "Mastering the first-principles mechanisms behind mathematical formulas makes complex science transparent and intuitive",
          "Never question published textbooks",
          "Always use deep learning over classical statistics"
        ],
        "question": "What foundational pedagogical philosophy did Frank Starmer emphasize that inspired the creation of StatQuest?"
      },
      {
        "answer": 0,
        "explanation": "Automated tools will blindly fit models to invalid data without warning; only first-principles domain understanding allows researchers to judge validity.",
        "options": [
          "It prevents blind application of algorithms when their underlying distributional assumptions are violated by real-world data",
          "It guarantees that all models achieve 100% accuracy",
          "It eliminates the need for software validation",
          "It automatically repairs corrupted data"
        ],
        "question": "How does understanding first principles protect scientists when using modern automated AI and statistical toolkits?"
      }
    ]
  },
  {
    "index": 62,
    "id": "sHRBg6BhKjI",
    "title": "Why Dividing By N Underestimates the Variance",
    "shortTitle": "Why Dividing by N Underestimates Variance",
    "moduleId": "module-3",
    "category": "Parameters, Samples & Spread",
    "duration": "10:15",
    "embedUrl": "https://www.youtube-nocookie.com/embed/sHRBg6BhKjI?rel=0",
    "youtubeUrl": "https://www.youtube.com/watch?v=sHRBg6BhKjI&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9&index=62",
    "summary": "Mathematical proof of Bessel's correction: why sample deviations from the sample mean x_bar systematically underestimate true variance from population mean mu.",
    "bamIntuition": "Data points are naturally CLOSER to their own sample mean than to the true hidden population mean! Measuring deviations from x_bar underestimates the real spread. Dividing by n-1 instead of n gives it the exact mathematical boost it needs! BAM!",
    "firstPrinciples": "Let $X_1, \\dots, X_n \\stackrel{\\text{iid}}{\\sim} (\\mu, \\sigma^2)$. If we knew $\\mu$, the unbiased estimator would be $\\frac{1}{n}\\sum (X_i - \\mu)^2$. However, we must substitute the sample mean $\\bar{X}$. We expand the deviation: $X_i - \\mu = (X_i - \\bar{X}) + (\\bar{X} - \\mu)$. Squaring and summing gives: $\\sum_{i=1}^n (X_i - \\mu)^2 = \\sum_{i=1}^n (X_i - \\bar{X})^2 + n(\\bar{X} - \\mu)^2$. Taking expectations: $E\\left[\\sum (X_i - \\mu)^2\\right] = n\\sigma^2$. The second term is $E[n(\\bar{X} - \\mu)^2] = n \\text{Var}(\\bar{X}) = n \\left(\\frac{\\sigma^2}{n}\\right) = \\sigma^2$. Therefore: $E\\left[\\sum (X_i - \\bar{X})^2\\right] = n\\sigma^2 - \\sigma^2 = (n - 1)\\sigma^2$. Dividing by $n$ yields $\\frac{n-1}{n}\\sigma^2 < \\sigma^2$ (biased!). Dividing by $n-1$ yields exactly $E[s^2] = \\sigma^2$.",
    "mathFormulas": [
      {
        "explanation": "Total squared distance from true mean equals sum of squared deviations from sample mean plus mean estimation error.",
        "latex": "\\sum_{i=1}^n (X_i - \\mu)^2 = \\sum_{i=1}^n (X_i - \\bar{X})^2 + n(\\bar{X} - \\mu)^2",
        "name": "Deviation Identity"
      },
      {
        "explanation": "Bessel's correction cancels the (n-1) factor, ensuring the estimator is exactly unbiased.",
        "latex": "E\\left[\\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2\\right] = \\sigma^2",
        "name": "Expectation of Sample Variance"
      }
    ],
    "numericalExample": "Population: [0, 10], true mu = 5, true sigma^2 = ((0-5)^2 + (10-5)^2)/2 = 25. Draw sample of size n = 2: Case 1: [0, 0] -> x_bar = 0, dev^2 = 0. Case 2: [10, 10] -> x_bar = 10, dev^2 = 0. Case 3: [0, 10] -> x_bar = 5, dev^2 = 50. Average sample dev^2 = (0 + 0 + 50 + 50)/4 = 25. If you divide by n = 2: variance estimate = 12.5 (underestimates 25 by exactly half!). If you divide by n - 1 = 1: variance estimate = 25 / 1 = 25 (exact unbiased truth!).",
    "pythonCode": "import numpy as np\n\n# Monte Carlo proof of Bessel's correction\ntrue_sigma2 = 16.0\nn = 4\nB = 100000\n\nsamples = np.random.normal(loc=10, scale=4.0, size=(B, n))\nvar_n = np.mean(np.var(samples, axis=1, ddof=0))\nvar_n_minus_1 = np.mean(np.var(samples, axis=1, ddof=1))\n\nprint(f'True Variance:        {true_sigma2:.2f}')\nprint(f'Dividing by N:        {var_n:.2f} (Biased downward!)')\nprint(f'Dividing by N-1:      {var_n_minus_1:.2f} (Unbiased!)')",
    "rCode": "samples <- matrix(rnorm(400000, 10, 4), ncol=4)\ncat('Div by N:  ', mean(apply(samples, 1, function(x) mean((x-mean(x))^2))), '\\n')\ncat('Div by N-1:', mean(apply(samples, 1, var)))",
    "pitfalls": "Believing Bessel's correction makes the standard deviation unbiased. The square root function is concave, so by Jensen's inequality: $E[s] = E[\\sqrt{s^2}] < \\sqrt{E[s^2]} = \\sigma$. While $s^2$ is unbiased for $\\sigma^2$, sample standard deviation $s$ still slightly underestimates true $\\sigma$!",
    "interactiveType": "bessel",
    "quiz": [
      {
        "answer": 1,
        "explanation": "By definition, the sample mean minimizes sum(x_i - c)^2. Substituting true mean mu instead of x_bar produces a strictly larger sum of squares, so deviations from x_bar are systematically compressed.",
        "options": [
          "Because computers have rounding errors",
          "Because x_bar is by definition the center of the sample, so data points are closer to x_bar than to any other number (including mu)",
          "Because variance must always be positive",
          "Because n is less than infinity"
        ],
        "question": "Why does measuring deviations from the sample mean x_bar underestimate spread compared to measuring from the true mean mu?"
      },
      {
        "answer": 1,
        "explanation": "Because sample deviations are measured around the sample mean x_bar rather than the true population mean mu, the sum of squares is systematically smaller by factor (n-1)/n.",
        "options": [
          "E[S_n^2] = sigma^2",
          "E[S_n^2] = ((n - 1) / n) * sigma^2",
          "E[S_n^2] = (n / (n - 1)) * sigma^2",
          "E[S_n^2] = sigma^2 / n"
        ],
        "question": "In Bessel's correction, what is the expected value of the naive sample variance S_n^2 = (1/n) * sum(X_i - x_bar)^2 when estimating population variance sigma^2?"
      },
      {
        "answer": 0,
        "explanation": "Since E[(1/n)sum(x_i - x_bar)^2] = ((n-1)/n)*sigma^2, multiplying by Bessel's correction factor n/(n-1) yields E[s^2] = sigma^2, an unbiased estimator.",
        "options": [
          "Multiplying by n/(n-1) exactly cancels the downward bias ((n-1)/n), ensuring E[s^2] = sigma^2",
          "Because n - 1 is the sample standard deviation",
          "Because degrees of freedom must always be odd",
          "Because the last observation is always discarded"
        ],
        "question": "Why does dividing by n - 1 instead of n in the sample variance s^2 = (1/(n-1)) * sum(X_i - x_bar)^2 yield an unbiased estimator?"
      }
    ]
  }
];
