#!/usr/bin/env python3
"""
Complete enrichment script that expands all 62 videos to exactly 3 questions
with full first-principles pedagogical rigor, then updates the curriculum files.
"""

from curriculum_group1 import GROUP_1
from curriculum_group2 import GROUP_2
from curriculum_group3 import GROUP_3
from curriculum_group4 import GROUP_4

ALL_EXTRA_QUESTIONS = {
    # Group 1 (1-15)
    1: [
        {
            "question": "If you double the bin width in a frequency histogram while keeping total sample size constant, what happens?",
            "options": ["Bin count doubles, counts per bin halve", "Bin count roughly halves, counts per bin roughly double", "Neither bin count nor counts change", "Both bin count and counts double"],
            "answer": 1,
            "explanation": "Doubling bin width h aggregates neighboring intervals: the number of bins roughly halves, while each bin captures roughly twice as many observations."
        },
        {
            "question": "Why is a histogram with excessively narrow bin widths hazardous for statistical inference?",
            "options": ["It violates total area normalization", "It creates high-variance noisy spikes reflecting random sampling noise rather than underlying population density", "It makes the sample mean mathematically undefined", "It converts continuous variables into nominal categories"],
            "answer": 1,
            "explanation": "Too narrow bins cause severe undersmoothing/overfitting: each bin has 0 or 1 observation, obscuring the true population distribution."
        }
    ],
    2: [
        {
            "question": "For any continuous random variable X, what is the exact probability of observing an exact single real number, P(X = c)?",
            "options": ["f(c)", "1 / sigma", "0", "0.5"],
            "answer": 2,
            "explanation": "Continuous probability is defined as the integral over an interval. The integral of a single point is zero, even though density f(c) > 0."
        },
        {
            "question": "Which fundamental property must every valid Cumulative Distribution Function F(x) satisfy?",
            "options": ["It must be strictly periodic", "It must be non-decreasing with limit 0 at negative infinity and 1 at positive infinity", "Its derivative must be strictly constant", "It must be symmetric around zero"],
            "answer": 1,
            "explanation": "A CDF accumulates probability measure from negative infinity to positive infinity, so it is monotonically non-decreasing from 0 to 1."
        }
    ],
    3: [
        {
            "question": "At which exact x-axis locations do the inflection points of the normal probability density curve occur?",
            "options": ["At x = mu", "At x = mu +/- sigma", "At x = mu +/- 2*sigma", "At x = mu +/- 3*sigma"],
            "answer": 1,
            "explanation": "Setting the second derivative of the Gaussian PDF f''(x) = 0 yields (x - mu)^2 = sigma^2, placing inflection points at mu +/- sigma."
        },
        {
            "question": "If X ~ N(100, 25) and Y ~ N(50, 16) are independent, what is the distribution of W = X - Y?",
            "options": ["N(50, 9)", "N(50, 41)", "N(50, sqrt(41))", "N(150, 41)"],
            "answer": 1,
            "explanation": "Expected values subtract: 100 - 50 = 50. For independent random variables, variances ALWAYS add: Var(X - Y) = Var(X) + Var(Y) = 25 + 16 = 41."
        }
    ],
    4: [
        {
            "question": "In a distribution that is heavily right-skewed (such as household income), what is the typical ordering of central tendency measures?",
            "options": ["Mean < Median < Mode", "Mode < Median < Mean", "Median < Mode < Mean", "Mean = Median = Mode"],
            "answer": 1,
            "explanation": "Right-skewed outliers pull the arithmetic mean to the right. The mode remains at the peak, and the median sits between them: Mode < Median < Mean."
        },
        {
            "question": "What is the breakdown point of the sample median, and what does it signify?",
            "options": ["0%: a single extreme outlier corrupts it", "50%: up to half the sample can be arbitrarily corrupted without driving the median to infinity", "100%: it is mathematically impossible to change", "Equal to 1/n"],
            "answer": 1,
            "explanation": "The median has a 50% breakdown point, meaning over half of the observations must be corrupted to force the median to an arbitrary extreme."
        }
    ],
    5: [
        {
            "question": "What does the memoryless property of the exponential distribution mathematically state?",
            "options": ["P(T > s + t | T > s) = P(T > t)", "P(T < s + t) = P(T < s) * P(T < t)", "The mean equals the median", "The variance is zero"],
            "answer": 0,
            "explanation": "Memorylessness means the probability of waiting an additional t minutes given you have already waited s minutes is identical to starting fresh: P(T > s + t | T > s) = P(T > t)."
        },
        {
            "question": "If phone calls arrive at a call center at an average rate of 4 calls per hour (Poisson process), what is the expected waiting time until the next call?",
            "options": ["4 hours", "0.25 hours (15 minutes)", "1 hour", "16 hours"],
            "answer": 1,
            "explanation": "For an exponential waiting time with rate lambda = 4 calls/hour, the expected value is 1/lambda = 1/4 hour = 15 minutes."
        }
    ],
    6: [
        {
            "question": "Why are Greek letters (mu, sigma) conventionally used for population parameters and Roman letters (x-bar, s) for sample estimates?",
            "options": ["It is purely historical convention with no conceptual distinction", "Greek letters represent fixed, unobservable ground truths; Roman letters represent sample statistics computed from data", "Greek letters denote biased estimates; Roman letters denote unbiased estimates", "Roman letters are reserved for discrete variables only"],
            "answer": 1,
            "explanation": "Population parameters (mu, sigma) are fixed population constants, whereas sample statistics (x-bar, s) are random variables that vary from sample to sample."
        },
        {
            "question": "What happens to the difference between the sample estimate x-bar and the true population parameter mu as sample size n grows toward infinity?",
            "options": ["The difference increases proportionally to sqrt(n)", "The difference approaches 0 in probability by the Law of Large Numbers", "The difference approaches 1.96", "The variance of the estimate increases"],
            "answer": 1,
            "explanation": "By the Weak and Strong Laws of Large Numbers, the sample mean converges in probability and almost surely to the population parameter mu as n -> infinity."
        }
    ],
    7: [
        {
            "question": "Why do we square deviations (x_i - x-bar) when computing variance instead of simply averaging raw deviations?",
            "options": ["Because raw deviations always sum to zero, canceling positive and negative distances", "Because squaring makes the variance scale in linear units", "Because negative numbers cannot be represented on computers", "Because square roots are computationally impossible"],
            "answer": 0,
            "explanation": "By definition of the arithmetic mean, sum(x_i - x-bar) = sum(x_i) - n*(1/n*sum(x_i)) = 0. Squaring eliminates sign cancellation and penalizes large errors."
        },
        {
            "question": "If you multiply every observation in a dataset by a constant factor c = 3, how do the standard deviation and variance change?",
            "options": ["SD multiplied by 3, variance multiplied by 3", "SD multiplied by 3, variance multiplied by 9", "SD multiplied by 9, variance multiplied by 3", "Neither changes"],
            "answer": 1,
            "explanation": "Scaling by c scales standard deviation by |c| = 3 and scales variance by c^2 = 9."
        }
    ],
    8: [
        {
            "question": "What is the primary philosophical purpose of a statistical or mathematical model?",
            "options": ["To replicate every microscopic detail of reality without simplification", "To provide a useful abstraction that captures essential relationships while discarding uninformative noise", "To ensure that all p-values are less than 0.05", "To eliminate the need for empirical data collection"],
            "answer": 1,
            "explanation": "As George Box famously noted, 'All models are wrong, but some are useful.' A model abstracts complex realities into tractable predictive structures."
        },
        {
            "question": "In the linear model y = beta_0 + beta_1 * x + epsilon, what does the error term epsilon account for?",
            "options": ["Systematic computational errors by the computer", "Unmeasured covariates, measurement noise, and inherent stochastic variation", "The degrees of freedom of the intercept", "The slope of the regression line"],
            "answer": 1,
            "explanation": "The residual term epsilon captures all variation in y that cannot be explained by the linear predictor beta_0 + beta_1 * x."
        }
    ],
    9: [
        {
            "question": "What is the specific role of the Null Hypothesis (H0) in classical Neyman-Pearson hypothesis testing?",
            "options": ["It is the hypothesis the researcher hopes to prove true", "It acts as the skeptical baseline of 'no effect' or 'no difference' used to construct the reference null distribution", "It guarantees that the alternative hypothesis is mathematically false", "It sets the sample size of the experiment"],
            "answer": 1,
            "explanation": "H0 provides the baseline assumption from which the null sampling distribution is derived to determine how unexpected the observed data would be by chance alone."
        },
        {
            "question": "Failing to reject the null hypothesis (p >= alpha) mathematically implies which of the following?",
            "options": ["The null hypothesis has been proven true beyond doubt", "There is insufficient evidence in this sample to reject the null hypothesis at significance level alpha", "The alternative hypothesis is impossible", "The experiment had zero measurement error"],
            "answer": 1,
            "explanation": "Absence of evidence is not evidence of absence. Failing to reject H0 simply means the observed data are consistent with random sampling variability under H0."
        }
    ],
    10: [
        {
            "question": "When is a one-sided (directional) alternative hypothesis statistically justified?",
            "options": ["Whenever you want to achieve a smaller p-value easily", "Only when an effect in the opposite direction is physically impossible or of zero practical relevance, specified prior to data collection", "After inspecting the sample mean and seeing it is positive", "Whenever the sample size is greater than 30"],
            "answer": 1,
            "explanation": "One-sided hypotheses must be pre-registered based on domain theory. Choosing one-sided tests post-hoc after looking at data is a form of p-hacking."
        },
        {
            "question": "If you formulate H1: mu_1 != mu_2 (two-sided), where is the rejection region located under the null distribution?",
            "options": ["Entirely in the right tail", "Entirely in the left tail", "Split equally between both the upper and lower tails (alpha/2 in each tail)", "At the center of the distribution"],
            "answer": 2,
            "explanation": "A two-sided test rejects H0 for extreme departures in either direction, allocating alpha/2 probability mass to each tail."
        }
    ],
    11: [
        {
            "question": "Which of the following is a common fatal misinterpretation of a p-value = 0.03?",
            "options": ["There is a 3% probability of observing data this extreme if the null hypothesis is true", "There is a 3% probability that the null hypothesis is true", "If H0 is true, obtaining this effect has probability 0.03", "The result is statistically significant at alpha = 0.05"],
            "answer": 1,
            "explanation": "The p-value is P(Data | H0), NOT P(H0 | Data). Conflating the two is the classical Prosecutor's Fallacy."
        },
        {
            "question": "Under a true null hypothesis H0 with continuous test statistics, what is the theoretical distribution of the p-value?",
            "options": ["Standard normal N(0, 1)", "Uniform on the interval [0, 1]", "Exponential with rate 1", "Chi-square with 1 degree of freedom"],
            "answer": 1,
            "explanation": "When H0 is strictly true, the probability of obtaining p <= c equals c for any c in [0, 1], meaning p is uniformly distributed Uniform(0, 1)."
        }
    ],
    12: [
        {
            "question": "When should Fisher's Exact Test be preferred over the Chi-Square test of independence in a 2x2 contingency table?",
            "options": ["Only when sample sizes are above 10,000", "When expected cell counts in any cell fall below 5, where asymptotic chi-square approximations break down", "Only when comparing continuous variables", "Whenever the variance is greater than the mean"],
            "answer": 1,
            "explanation": "Chi-square tests rely on asymptotic normal approximations that fail when expected cell counts are small (typically < 5). Fisher's exact test computes exact hypergeometric probabilities."
        },
        {
            "question": "In the hypergeometric distribution modeling a 2x2 contingency table, what quantities are treated as fixed constants?",
            "options": ["Only the total sample size", "Both the row totals and column totals (marginal sums)", "The diagonal products only", "The p-value itself"],
            "answer": 1,
            "explanation": "Fisher's exact test conditions on both marginal totals (row and column margins) being fixed, evaluating the probability of observed internal cell configurations."
        }
    ],
    13: [
        {
            "question": "For a two-tailed test with a symmetric null distribution and an observed test statistic t_obs = +2.40, how is the p-value calculated?",
            "options": ["P(T >= 2.40)", "2 * P(T >= 2.40)", "1 - P(T <= 2.40)", "P(T = 2.40)"],
            "answer": 1,
            "explanation": "In a two-tailed test with symmetric null density, extreme values occur at both T >= +2.40 and T <= -2.40, so p = 2 * P(T >= 2.40)."
        },
        {
            "question": "If your test statistic falls inside the middle 95% of the null distribution, what is the two-tailed p-value?",
            "options": ["p < 0.01", "p < 0.05", "p > 0.05", "p = 0.00"],
            "answer": 2,
            "explanation": "If the test statistic lies inside the central 95% region, the tail areas outside it sum to more than 5%, so p > 0.05."
        }
    ],
    14: [
        {
            "question": "Which researcher behavior constitutes 'p-hacking'?",
            "options": ["Pre-registering sample size, hypotheses, and analysis scripts before data collection", "Testing multiple subgroups, dropping outliers post-hoc, or stopping data collection early once p < 0.05 is reached", "Reporting all measured dependent variables regardless of significance", "Performing power calculations before applying for a grant"],
            "answer": 1,
            "explanation": "p-hacking exploits researcher degrees of freedom by iteratively modifying analysis decisions until an arbitrary significance threshold is crossed."
        },
        {
            "question": "If you test 20 independent hypotheses at significance level alpha = 0.05 when all null hypotheses are completely true, what is the probability of obtaining AT LEAST ONE false positive?",
            "options": ["5%", "20 * 5% = 100%", "1 - (1 - 0.05)^20 = 64.15%", "0.05^20"],
            "answer": 2,
            "explanation": "The probability of no false positives is (1 - 0.05)^20 = 0.95^20 approx 35.85%. Thus the family-wise error rate is 1 - 0.3585 = 64.15%."
        }
    ],
    15: [
        {
            "question": "How does False Discovery Rate (FDR) control differ conceptually from Family-Wise Error Rate (FWER) control like Bonferroni?",
            "options": ["FDR controls the probability of making at least one false positive; FWER controls the expected proportion of false positives among rejected tests", "FDR controls the expected proportion of false positives among all rejected nulls; FWER controls the probability of making even one false positive", "FDR and FWER are mathematically identical in all scenarios", "FDR is only applicable when sample size n < 10"],
            "answer": 1,
            "explanation": "FWER is conservative: it ensures P(V >= 1) <= alpha. FDR allows discoveries while guaranteeing that among declared discoveries, on average no more than q% are false."
        },
        {
            "question": "In the Benjamini-Hochberg procedure with m tests and target FDR q, what is the critical threshold for the k-th sorted p-value p_(k)?",
            "options": ["q / m", "(k / m) * q", "k * q", "q / k"],
            "answer": 1,
            "explanation": "Benjamini-Hochberg ranks p-values p_(1) <= ... <= p_(m) and finds the largest k such that p_(k) <= (k/m) * q."
        }
    ],

    # Group 2 (16-30)
    16: [
        {
            "question": "If the true effect size in a clinical population increases while sample size and significance level alpha remain constant, what happens to statistical power?",
            "options": ["Power decreases", "Power increases", "Power remains unchanged", "Power drops to zero"],
            "answer": 1,
            "explanation": "A larger true effect size shifts the alternative distribution further away from the null mean, placing a larger portion of its mass beyond the critical threshold."
        },
        {
            "question": "What is the mathematical definition of statistical power in terms of the Type II error rate beta?",
            "options": ["Power = 1 - alpha", "Power = 1 - beta", "Power = beta / alpha", "Power = alpha * beta"],
            "answer": 1,
            "explanation": "Beta is the probability of failing to reject a false null hypothesis (Type II error). Power is the probability of correctly rejecting it: 1 - beta."
        }
    ],
    17: [
        {
            "question": "To halve the standard error of an estimate or double precision, by what factor must you increase the sample size n?",
            "options": ["By a factor of 2", "By a factor of 4", "By a factor of 8", "By a factor of sqrt(2)"],
            "answer": 1,
            "explanation": "Since SE = sigma / sqrt(n), reducing SE by half requires multiplying n by 4, because sqrt(4n) = 2*sqrt(n)."
        },
        {
            "question": "Why is 'post-hoc power' (power calculated using the observed effect size after completing an experiment) widely regarded as useless or misleading?",
            "options": ["Because computers cannot calculate post-hoc power accurately", "Because post-hoc power is merely a 1-to-1 mathematical transformation of the observed p-value, adding zero new information", "Because power can only be calculated for sample sizes under 30", "Because post-hoc power assumes beta = 0"],
            "answer": 1,
            "explanation": "Post-hoc observed power simply mirrors the observed p-value: non-significant results will always show low post-hoc power, creating a circular justification."
        }
    ],
    18: [
        {
            "question": "What is the primary practical limitation of raw covariance compared to Pearson's correlation coefficient?",
            "options": ["Covariance cannot be negative", "Covariance is scale-dependent (units are unit_X * unit_Y), making its magnitude uninterpretable across different scales", "Covariance assumes variables follow a uniform distribution", "Covariance is only defined for integer variables"],
            "answer": 1,
            "explanation": "Raw covariance depends on the arbitrary measurement units of X and Y. Measuring height in millimeters instead of meters multiplies covariance by 1,000 without changing the relationship."
        },
        {
            "question": "If two random variables X and Y are statistically independent, what is their population covariance Cov(X, Y)?",
            "options": ["Exactly 1.0", "Exactly 0", "-1.0", "Undefined"],
            "answer": 1,
            "explanation": "Independence implies E[XY] = E[X]E[Y], so Cov(X, Y) = E[XY] - E[X]E[Y] = 0. (Note that the converse is not always true for non-linear relationships)."
        }
    ],
    19: [
        {
            "question": "What is the theoretical range of Pearson's correlation coefficient r, and what does r = -1 signify?",
            "options": ["Range [0, 1]; no relationship", "Range [-1, 1]; perfect inverse linear relationship", "Range (-infinity, infinity); undefined variance", "Range [-0.5, 0.5]; weak negative relationship"],
            "answer": 1,
            "explanation": "Pearson's r is bounded in [-1, 1] by the Cauchy-Schwarz inequality. r = -1 indicates all data points lie exactly on a downward-sloping straight line."
        },
        {
            "question": "What critical lesson does Anscombe's Quartet teach researchers about the correlation coefficient r?",
            "options": ["Datasets with identical r, means, and variances can have wildly different shapes and relationships; you must always visualize your data", "Correlation implies causation when r > 0.8", "Linear regression should never use more than 11 data points", "All distributions eventually become normal"],
            "answer": 0,
            "explanation": "Anscombe created 4 distinct datasets with identical summary statistics (mean, variance, correlation r = 0.816, regression line) that appear completely different when plotted."
        }
    ],
    20: [
        {
            "question": "What is the formal Kolmogorov definition of conditional probability P(A | B)?",
            "options": ["P(A) * P(B)", "P(A cap B) / P(B), provided P(B) > 0", "P(A cup B) - P(B)", "P(B | A) / P(A)"],
            "answer": 1,
            "explanation": "The probability of event A given that event B has occurred restricts the sample space to B: P(A | B) = P(A and B) / P(B)."
        },
        {
            "question": "If events A and B are statistically independent with non-zero probabilities, what does P(A | B) equal?",
            "options": ["P(B)", "P(A)", "0", "1"],
            "answer": 1,
            "explanation": "By definition of independence, the occurrence of event B provides zero information regarding event A, so P(A | B) = P(A)."
        }
    ],
    21: [
        {
            "question": "In Bayes' theorem P(H | D) = [P(D | H) * P(H)] / P(D), what is P(H) called?",
            "options": ["The likelihood", "The posterior probability", "The prior probability", "The marginal likelihood"],
            "answer": 2,
            "explanation": "P(H) represents the prior probability of hypothesis H before observing the new evidence D."
        },
        {
            "question": "In rare disease screening (prevalence 0.1%), a diagnostic test has 99% sensitivity and 95% specificity. Why is the probability that a positive patient actually has the disease less than 20%?",
            "options": ["Because the test is mathematically defective", "Because of the Base Rate Fallacy: the vast majority of tested people are healthy, so false positives outnumber true positives", "Because sensitivity and specificity must sum to 100%", "Because conditional probability cannot be applied to medicine"],
            "answer": 1,
            "explanation": "Out of 10,000 people, 10 have disease (approx 10 test positive) and 9,990 are healthy (approx 500 test positive). Positive predictive value is 10 / (10 + 500) approx 2%."
        }
    ],
    22: [
        {
            "question": "By the linearity of expectation, for ANY two random variables X and Y (even if they are strongly correlated or dependent), what is E[aX + bY]?",
            "options": ["a*E[X] + b*E[Y] only if X and Y are independent", "a*E[X] + b*E[Y] in all cases unconditionally", "a*E[X] * b*E[Y]", "sqrt(a*E[X] + b*E[Y])"],
            "answer": 1,
            "explanation": "Linearity of expectation holds unconditionally for all random variables with finite expectations: E[aX + bY] = a*E[X] + b*E[Y], regardless of independence."
        },
        {
            "question": "What is the expected value of a single roll of a fair standard six-sided die?",
            "options": ["3.0", "3.5", "4.0", "6.0"],
            "answer": 1,
            "explanation": "E[X] = (1/6)*(1 + 2 + 3 + 4 + 5 + 6) = 21 / 6 = 3.5. Note that the expected value need not be an outcome that can actually be observed on a single roll."
        }
    ],
    23: [
        {
            "question": "How is the expected value E[X] of a continuous random variable X with probability density function f(x) formally defined?",
            "options": ["sum_{i=1}^n x_i / n", "Integral from -infinity to infinity of x * f(x) dx", "The maximum point where f'(x) = 0", "f(0)"],
            "answer": 1,
            "explanation": "For continuous random variables, the Riemann/Lebesgue integral replaces discrete summation: E[X] = int_{-infinity}^{infinity} x * f(x) dx."
        },
        {
            "question": "The Cauchy distribution has a symmetric bell-like shape centered at zero, yet its expected value is mathematically undefined. Why?",
            "options": ["Because it is asymmetric", "Because its tails decay so slowly (proportional to 1/x^2) that the integral int_{-infinity}^{infinity} |x| f(x) dx diverges to infinity", "Because its density exceeds 1.0", "Because it is discrete"],
            "answer": 1,
            "explanation": "A continuous expectation exists only if the integral converges absolutely. For Cauchy distributions, extreme values occur too frequently for the integral to settle."
        }
    ],
    24: [
        {
            "question": "Which set of conditions defines a Binomial(n, p) experiment?",
            "options": ["Fixed n trials, independent trials, two mutually exclusive outcomes (success/failure), and constant success probability p", "Continuous measurements, normal errors, and equal variances", "Random trial count until first success occurs", "Poisson arrival counts with constant rate lambda"],
            "answer": 0,
            "explanation": "A binomial experiment requires n identical Bernoulli trials that are independent with fixed probability of success p."
        },
        {
            "question": "What is the theoretical variance of a Binomial random variable with parameters n and p?",
            "options": ["n * p", "n * p * (1 - p)", "sqrt(n * p)", "p / n"],
            "answer": 1,
            "explanation": "For a sum of n independent Bernoulli variables each with variance p*(1-p), the total variance is Var(X) = n * p * (1 - p)."
        }
    ],
    25: [
        {
            "question": "What does the Central Limit Theorem state about the distribution of sample averages x-bar as sample size n grows large?",
            "options": ["The individual observations in the population become normally distributed", "The distribution of sample averages converges to a normal distribution N(mu, sigma^2/n), regardless of the shape of the underlying population", "The population variance shrinks to zero", "All outliers disappear from the raw data"],
            "answer": 1,
            "explanation": "CLT applies to the SAMPLING DISTRIBUTION OF THE MEAN, not the raw data. Even if the population is uniform or exponential, sample means become Gaussian."
        },
        {
            "question": "What is the standard deviation of the sampling distribution of the sample mean (known as the Standard Error)?",
            "options": ["sigma * n", "sigma / sqrt(n)", "sigma^2 / n", "sqrt(sigma / n)"],
            "answer": 1,
            "explanation": "The variance of the sample mean is Var(x-bar) = sigma^2 / n, so its standard deviation (Standard Error) is sigma / sqrt(n)."
        }
    ],
    26: [
        {
            "question": "What is the core distinction in purpose between technical replicates and biological replicates?",
            "options": ["Technical replicates measure variation between organisms; biological replicates measure pipetting error", "Biological replicates assess true biological variability across independent subjects; technical replicates assess instrument measurement noise", "Technical replicates are always cheaper than biological replicates", "There is no difference"],
            "answer": 1,
            "explanation": "Biological replicates capture true diversity in nature (different mice, patients, cell lines); technical replicates quantify experimental assay precision."
        },
        {
            "question": "Treating 5 technical measurements from a single mouse as n = 5 independent samples in a two-sample t-test is an example of what statistical fallacy?",
            "options": ["Pseudoreplication", "Simpson's Paradox", "Berkson's Fallacy", "Ecological Fallacy"],
            "answer": 0,
            "explanation": "Pseudoreplication treats dependent technical measurements as independent biological observations, artificially inflating sample size and degrees of freedom."
        }
    ],
    27: [
        {
            "question": "When observations in a dataset are positively correlated (e.g. repeated measures or spatial clustering), how does the effective sample size N_eff compare to the nominal sample size N?",
            "options": ["N_eff is larger than N", "N_eff is smaller than N because correlated observations share redundant information", "N_eff equals N exactly", "N_eff is negative"],
            "answer": 1,
            "explanation": "Clustered or correlated data carry less unique information per observation than independent samples, reducing the effective degrees of freedom."
        },
        {
            "question": "What does the Intraclass Correlation Coefficient (ICC) quantify in clustered experimental designs?",
            "options": ["The Pearson correlation between x and y", "The proportion of total variance explained by between-cluster differences", "The p-value of a regression slope", "The ratio of sample size to population size"],
            "answer": 1,
            "explanation": "ICC = sigma_between^2 / (sigma_between^2 + sigma_within^2). When ICC is high, individuals within the same cluster are very similar."
        }
    ],
    28: [
        {
            "question": "Standard Deviation (SD) describes: whereas Standard Error (SE) describes:",
            "options": ["The precision of a sample statistic; the spread of individual observations", "The spread of individual observations in the population; the precision/uncertainty of a sample statistic", "Measurement error; biological error", "Non-normal spread; normal spread"],
            "answer": 1,
            "explanation": "SD quantifies how widely dispersed individuals are around the mean. SE quantifies how much the sample mean would bounce around if the study were repeated."
        },
        {
            "question": "If you increase the sample size n from 25 to 100 in an experiment, what happens to the sample SD and the SE of the mean?",
            "options": ["Both SD and SE are cut in half", "SD remains roughly constant (estimating population spread); SE is cut in half", "SD quadruples; SE remains constant", "SD is cut in half; SE remains constant"],
            "answer": 1,
            "explanation": "Sample SD estimates the fixed population spread sigma, which does not shrink with n. SE = s / sqrt(n) drops by sqrt(100/25) = 2 (halved)."
        }
    ],
    29: [
        {
            "question": "What is the mathematical formula for the Standard Error of the sample mean computed from a sample of size n?",
            "options": ["s * sqrt(n)", "s / sqrt(n)", "s^2 / n", "s / n"],
            "answer": 1,
            "explanation": "The standard error of the mean is the estimated standard deviation of the sample mean: SE = s / sqrt(n)."
        },
        {
            "question": "Why do some scientific journals discourage plotting error bars representing +/- 1 SE without clear labeling?",
            "options": ["Because SE bars are computationally difficult to draw", "Because SE bars are much narrower than SD bars, creating an illusion of small variability that confuses readers who mistake SE for data spread", "Because SE bars can never be plotted for continuous data", "Because SE only applies to binary proportions"],
            "answer": 1,
            "explanation": "Many readers erroneously assume error bars show the spread of data points (SD) rather than the precision of the mean estimate (SE)."
        }
    ],
    30: [
        {
            "question": "How does non-parametric bootstrapping generate a surrogate bootstrap sample from an original dataset of size n?",
            "options": ["By drawing n observations from a fitted Gaussian distribution", "By drawing n observations from the original sample AT RANDOM WITH REPLACEMENT", "By drawing n observations without replacement", "By multiplying each observation by a random normal weight"],
            "answer": 1,
            "explanation": "Bootstrapping treats the empirical sample as an estimate of the population, drawing n items with replacement so some are duplicated and others omitted."
        },
        {
            "question": "What would happen if you performed bootstrap resampling WITHOUT replacement?",
            "options": ["You would get higher accuracy", "Every bootstrap sample would be an identical permutation of the original dataset, resulting in zero variance in sample statistics", "The computation time would double", "The sample size would shrink to 0"],
            "answer": 1,
            "explanation": "Without replacement, you would simply reshuffle the exact same n numbers every time, yielding the exact same sample mean with zero variability."
        }
    ],

    # Group 3 (31-45)
    31: [
        {
            "question": "When using bootstrapping to compute a p-value for testing H0: mu_1 = mu_2, what must you do to the original datasets before resampling?",
            "options": ["Discard half the data", "Shift or center both groups so they share the exact same overall combined mean (imposing the null hypothesis)", "Square all the numbers", "Normalize both datasets to have variance 0"],
            "answer": 1,
            "explanation": "Hypothesis testing requires calculating probabilities under the null hypothesis. Centering both samples at a common mean enforces H0."
        },
        {
            "question": "What is a major advantage of the bootstrap hypothesis test over the classical Student's t-test?",
            "options": ["It guarantees a p-value less than 0.05", "It does not rely on parametric normality assumptions or asymptotic approximations", "It does not require collecting any real data", "It works only for categorical variables"],
            "answer": 1,
            "explanation": "Bootstrapping is distribution-free: it derives the reference distribution empirically from the observed data rather than assuming theoretical normality."
        }
    ],
    32: [
        {
            "question": "Why do data visualization guidelines strongly favor bar charts over pie charts for multi-category comparisons?",
            "options": ["Pie charts take up more computer memory", "Human visual perception is substantially more accurate at judging linear lengths along a common aligned axis than comparing 2D angles, areas, or arc lengths", "Bar charts cannot display percentages", "Pie charts cannot have more than 2 categories"],
            "answer": 1,
            "explanation": "Cleveland and McGill's perceptual experiments proved that humans judge position along a common scale far more accurately than angles or slices of a circle."
        },
        {
            "question": "When is a 3D perspective pie chart appropriate in scientific publications?",
            "options": ["Whenever you have more than 5 categories", "Virtually never, because 3D perspective distortion severely misrepresents slice angles and relative visual areas", "Whenever the data are continuous", "Only in financial annual reports"],
            "answer": 1,
            "explanation": "3D perspective tilts the chart, making foreground slices appear deceptively larger than equal or larger background slices."
        }
    ],
    33: [
        {
            "question": "In a standard Tukey boxplot, what do the bottom, middle, and top horizontal lines of the box represent?",
            "options": ["Minimum, Mean, Maximum", "First quartile Q1 (25th percentile), Median (50th percentile), and Third quartile Q3 (75th percentile)", "Mean - SD, Mean, Mean + SD", "10th percentile, 50th percentile, 90th percentile"],
            "answer": 1,
            "explanation": "The box encompasses the central 50% of the distribution (the Interquartile Range IQR = Q3 - Q1), with the centerline marking the median."
        },
        {
            "question": "How are outlier points typically defined and plotted in a standard boxplot?",
            "options": ["Any point beyond 1 standard deviation from the mean", "Points beyond 1.5 * IQR above the third quartile or below the first quartile", "Points that have negative values", "The top 1% of observations regardless of spread"],
            "answer": 1,
            "explanation": "Tukey defined 'fences' at Q1 - 1.5*IQR and Q3 + 1.5*IQR. Points beyond these fences are plotted as individual outlier points."
        }
    ],
    34: [
        {
            "question": "When data span multiple orders of magnitude (e.g. gene expression or viral loads), what primary benefit does a log transformation provide?",
            "options": ["It compresses large values, stabilizes variance across groups, and converts multiplicative relationships into additive ones", "It removes all outliers permanently", "It forces the data to follow a uniform distribution", "It eliminates the need for hypothesis testing"],
            "answer": 0,
            "explanation": "Log transforms compress right-skewed tails, equalize variances (homoscedasticity), and turn multiplicative fold-changes into additive linear intervals."
        },
        {
            "question": "Why is log(0) mathematically problematic in data analysis, and what common transformation is used for count data containing zeros?",
            "options": ["log(0) equals 1; no transformation needed", "log(0) is undefined (-infinity); adding a pseudo-count c (e.g. log(x + 1)) avoids infinite values", "log(0) equals 0 on 64-bit systems", "log(0) inverts the sign of the data"],
            "answer": 1,
            "explanation": "Because lim_{x -> 0+} ln(x) = -infinity, researchers add a small constant (like 1) before taking the logarithm: log(x + 1)."
        }
    ],
    35: [
        {
            "question": "What is the precise frequentist definition of a 95% Confidence Interval [10.2, 14.8] for the population mean?",
            "options": ["There is a 95% probability that the true population mean lies between 10.2 and 14.8", "If we repeated the experiment and constructed intervals identically from many independent samples, 95% of those calculated intervals would contain the fixed true parameter", "95% of the individual observations in the sample fall between 10.2 and 14.8", "The sample mean has a 95% chance of being 12.5"],
            "answer": 1,
            "explanation": "In frequentist statistics, the population parameter is a fixed constant, not a random variable. The 95% probability describes the long-run coverage of the procedure."
        },
        {
            "question": "If you quadruple the sample size n from 50 to 200, what happens to the width of the 95% confidence interval for the mean?",
            "options": ["The width is quadrupled", "The width is cut in half", "The width decreases by 75%", "The width remains unchanged"],
            "answer": 1,
            "explanation": "CI half-width is critical_value * (s / sqrt(n)). Multiplying n by 4 multiplies the denominator by sqrt(4) = 2, cutting the interval width in half."
        }
    ],
    36: [
        {
            "question": "In a simple linear regression model, what does an R-squared value of R^2 = 0.82 mean?",
            "options": ["82% of the data points fall exactly on the regression line", "82% of the total variance in the dependent variable y is explained by the linear relationship with x", "The correlation between x and y is 0.82", "The p-value of the slope is 0.18"],
            "answer": 1,
            "explanation": "R^2 = 1 - (SS_res / SS_tot). It quantifies the proportion of total variation in y accounted for by the fitted model."
        },
        {
            "question": "Why does adding additional explanatory variables to a multiple regression never decrease the unadjusted R^2, and what metric corrects for this?",
            "options": ["OLS can always find small non-zero coefficients to fit sample noise; Adjusted R^2 penalizes added degrees of freedom", "R^2 is capped at 1.0; Pearson's r corrects for it", "Because sample size shrinks with each predictor; F-statistic corrects for it", "Because degrees of freedom increase"],
            "answer": 0,
            "explanation": "Raw R^2 monotonically increases with added predictors due to overfitting. Adjusted R^2 includes a penalty factor (n - 1)/(n - p - 1) for each added parameter."
        }
    ],
    37: [
        {
            "question": "What is the foundational statistical goal of simple linear regression?",
            "options": ["To prove that x causes y", "To model the conditional expectation E[Y | X = x] as a linear function beta_0 + beta_1 * x", "To minimize the correlation between x and y", "To make all residuals equal to 1.0"],
            "answer": 1,
            "explanation": "Linear regression models how the expected value (conditional mean) of the response Y changes as a function of the predictor X."
        },
        {
            "question": "According to the Gauss-Markov Theorem, under which condition is the Ordinary Least Squares (OLS) estimator the Best Linear Unbiased Estimator (BLUE)?",
            "options": ["Errors must be normally distributed with variance 1", "Errors must have expectation zero, constant variance (homoscedasticity), and be uncorrelated", "Sample size must be greater than 1,000", "Predictor variables must be integers"],
            "answer": 1,
            "explanation": "The Gauss-Markov theorem states OLS has minimum variance among all linear unbiased estimators when errors have mean 0, homoscedastic variance, and zero covariance."
        }
    ],
    38: [
        {
            "question": "What specific criterion does Ordinary Least Squares (OLS) minimize when fitting a line y = beta_0 + beta_1 * x?",
            "options": ["The sum of horizontal distances from points to the line", "The sum of squared vertical residuals: sum (y_i - (beta_0 + beta_1 * x_i))^2", "The maximum absolute vertical distance", "The product of slope and intercept"],
            "answer": 1,
            "explanation": "OLS minimizes the sum of squared vertical deviations (residuals) between observed values y_i and model-predicted values y_hat_i."
        },
        {
            "question": "What is the exact algebraic closed-form formula for the OLS slope coefficient beta_1 in simple linear regression?",
            "options": ["beta_1 = Cov(X, Y) / Var(X)", "beta_1 = Var(X) / Cov(X, Y)", "beta_1 = r * (s_x / s_y)", "beta_1 = Mean(Y) / Mean(X)"],
            "answer": 0,
            "explanation": "Setting partial derivatives of SS_res to zero yields beta_1 = sum((x_i - x_bar)(y_i - y_bar)) / sum((x_i - x_bar)^2) = Cov(X, Y) / Var(X)."
        }
    ],
    39: [
        {
            "question": "What does LOESS / LOWESS stand for, and how does it fit non-linear curves to data?",
            "options": ["Linear Ordinary Error Summation System; fits global straight lines", "Locally Estimated Scatterplot Smoothing; fits weighted local polynomials to localized neighborhoods of points", "Low Energy Statistical Sampling; uses Monte Carlo integrals", "Logarithmic Exponential Smoothing System"],
            "answer": 1,
            "explanation": "LOESS fits local linear or quadratic regressions using a tri-cube kernel that gives higher weight to points closest to the target x-value."
        },
        {
            "question": "In LOESS smoothing, how does adjusting the span parameter alpha (the proportion of total points included in each local neighborhood) affect the curve?",
            "options": ["Larger span creates a smoother curve with higher bias; smaller span creates a more flexible, wiggly curve with higher variance", "Larger span makes the curve more sensitive to noise", "Span has zero effect on the fit", "Smaller span forces the curve to be a straight line"],
            "answer": 0,
            "explanation": "The span controls the bias-variance tradeoff: larger span averages over more data (smoother, higher bias), while smaller span fits local fluctuations (wigglier, higher variance)."
        }
    ],
    40: [
        {
            "question": "In an ANOVA table for simple linear regression, what null hypothesis does the overall model F-statistic test?",
            "options": ["H0: The intercept beta_0 = 0", "H0: The slope beta_1 = 0 (the model explains no more variance than the sample mean alone)", "H0: Residuals are not normally distributed", "H0: Sample size n is too small"],
            "answer": 1,
            "explanation": "The F-statistic compares Mean Square Model (explained variance) to Mean Square Residual (unexplained variance), testing H0: beta_1 = 0."
        },
        {
            "question": "For a simple linear regression model with a single predictor, what is the exact mathematical relationship between the slope t-statistic and the model F-statistic?",
            "options": ["F = sqrt(t)", "F = t^2", "F = 2 * t", "F = t / 2"],
            "answer": 1,
            "explanation": "In simple linear regression with 1 numerator degree of freedom, the square of the Student's t-statistic equals the F-statistic: F = t^2."
        }
    ],
    41: [
        {
            "question": "In R, what is the primary function used to fit an ordinary least squares linear regression model?",
            "options": ["`regress(y ~ x)`", "`lm(y ~ x, data = df)`", "`fit.line(y, x)`", "`ols(y = x)`"],
            "answer": 1,
            "explanation": "The `lm()` function (Linear Model) in base R fits linear models using formula syntax `response ~ predictor`."
        },
        {
            "question": "In the output of `summary(lm(y ~ x))`, what does the p-value associated with the `x` coefficient row evaluate?",
            "options": ["The probability that the intercept is positive", "The hypothesis test H0: beta_1 = 0 against H1: beta_1 != 0", "The normality of predictor x", "The proportion of missing values in the dataframe"],
            "answer": 1,
            "explanation": "The row for predictor x tests whether its coefficient significantly differs from zero using a two-tailed t-test."
        }
    ],
    42: [
        {
            "question": "In the multiple regression model y = beta_0 + beta_1 * x_1 + beta_2 * x_2 + epsilon, what is the precise interpretation of beta_1?",
            "options": ["The total change in y as x_1 changes without regard to x_2", "The expected change in y per one-unit increase in x_1, HOLDING x_2 CONSTANT", "The correlation between x_1 and x_2", "The R-squared of x_1"],
            "answer": 1,
            "explanation": "Multiple regression coefficients are partial regression slopes: they measure the unique association of x_1 with y after adjusting for all other predictors."
        },
        {
            "question": "What is multicollinearity in multiple regression, and what metric is standardly used to diagnose its severity?",
            "options": ["Non-normal errors; diagnosed by QQ plot", "High linear correlation among predictor variables; diagnosed by the Variance Inflation Factor (VIF)", "Heteroscedasticity; diagnosed by Breusch-Pagan test", "Outliers; diagnosed by Cook's distance"],
            "answer": 1,
            "explanation": "Multicollinearity occurs when predictors are correlated, inflating standard errors. VIF > 5 or 10 indicates severe multicollinearity."
        }
    ],
    43: [
        {
            "question": "In R formula syntax for multiple regression, what does the formula `y ~ x1 * x2` specify?",
            "options": ["Only the interaction term x1:x2 without main effects", "The main effect of x1, the main effect of x2, AND the interaction term x1:x2", "Multiplication of x1 and x2 into a single column", "Division of x1 by x2"],
            "answer": 1,
            "explanation": "In R formula notation, the asterisk `*` expands to main effects plus interactions: `x1 * x2` is equivalent to `x1 + x2 + x1:x2`."
        },
        {
            "question": "What function in R performs an F-test to compare two nested models (e.g. testing whether adding x2 and x3 significantly improves model fit)?",
            "options": ["`compare(m1, m2)`", "`anova(model_reduced, model_full)`", "`t.test(m1, m2)`", "`summary(m1 - m2)`"],
            "answer": 1,
            "explanation": "Passing two nested `lm` models to `anova()` conducts a partial F-test comparing the reduction in residual sum of squares against added degrees of freedom."
        }
    ],
    44: [
        {
            "question": "How can a standard independent two-sample t-test be equivalently framed as a general linear model?",
            "options": ["y = beta_0 + beta_1 * Group + epsilon, where Group is an indicator variable coded 0 or 1", "y = Group^2 + epsilon", "Group = beta_0 + beta_1 * y", "It cannot be represented as a linear model"],
            "answer": 0,
            "explanation": "A two-sample t-test is identical to a regression on a binary indicator: beta_0 is the mean of group 0, and beta_1 is the difference in means between groups."
        },
        {
            "question": "In a linear model representing a One-Way ANOVA with 3 groups using default treatment (dummy) coding, what does the intercept beta_0 represent?",
            "options": ["The grand mean of all 3 groups combined", "The mean of the designated reference (baseline) group", "The difference between group 1 and group 2", "The standard deviation of group 1"],
            "answer": 1,
            "explanation": "Under treatment coding, beta_0 is the expected value when all dummy indicators are 0 (the reference group mean), and slopes represent pairwise deviations from reference."
        }
    ],
    45: [
        {
            "question": "In the matrix formulation of linear models Y = X*beta + epsilon, what does the first column of the design matrix X typically contain?",
            "options": ["The values of the response variable Y", "A column of 1s (the intercept column)", "Random normal errors", "The index number of each observation"],
            "answer": 1,
            "explanation": "A column of 1s ensures that when multiplied by the parameter vector beta, the first term produces the constant intercept beta_0."
        },
        {
            "question": "What mathematical condition must the design matrix X satisfy for the OLS normal equation solution beta_hat = (X^T X)^(-1) X^T Y to exist uniquely?",
            "options": ["X must have full column rank (columns must be linearly independent so X^T X is invertible)", "X must be a square matrix", "All entries in X must be positive", "The determinant of X must be zero"],
            "answer": 0,
            "explanation": "If columns of X are linearly dependent (e.g. dummy variable trap or perfect multicollinearity), X^T X is singular and cannot be inverted."
        }
    ],

    # Group 4 (46-62)
    46: [
        {
            "question": "What algorithm allows you to draw random samples from an arbitrary continuous distribution using only standard uniform random numbers U ~ Uniform(0, 1)?",
            "options": ["Inverse Transform Sampling: X = F^(-1)(U)", "Gradient Descent", "The Newton-Raphson Method", "Principal Component Analysis"],
            "answer": 0,
            "explanation": "Since the CDF F(x) maps the domain to [0, 1], applying its inverse quantile function F^(-1) to Uniform(0, 1) variables produces exact draws from F."
        },
        {
            "question": "What fundamental theorem guarantees that as the number of random draws n increases, the empirical distribution of samples converges to the true population distribution?",
            "options": ["The Glivenko-Cantelli Theorem (Fundamental Theorem of Statistics)", "Bayes' Theorem", "The Gauss-Markov Theorem", "Fermat's Last Theorem"],
            "answer": 0,
            "explanation": "The Glivenko-Cantelli theorem states that the empirical CDF F_n(x) converges uniformly almost surely to the true CDF F(x) as n -> infinity."
        }
    ],
    47: [
        {
            "question": "What is the primary pedagogical goal of the StatQuest BAM! philosophy?",
            "options": ["To eliminate all mathematical proofs from science", "To demystify complex quantitative concepts by breaking them into intuitive, visual first-principles building blocks", "To promote Python over R", "To replace hypothesis testing with machine learning"],
            "answer": 1,
            "explanation": "StatQuest shows that intimidating statistical concepts (like MLE, PCA, and ANOVA) are composed of simple, intuitive pieces that anyone can master."
        },
        {
            "question": "Why is intuitive first-principles understanding critical before applying statistical software packages?",
            "options": ["Because software packages cannot calculate p-values", "Because black-box application of algorithms without understanding assumptions leads to misinterpreting outputs and invalid scientific claims", "Because manual calculations are always faster than computers", "Because statistical packages are proprietary"],
            "answer": 1,
            "explanation": "Software will willingly compute an ANOVA or linear regression on invalid data; only the researcher's conceptual understanding can detect violated assumptions."
        }
    ],
    48: [
        {
            "question": "Who popularized the conventional significance threshold alpha = 0.05 in statistical biology?",
            "options": ["Ronald A. Fisher", "Thomas Bayes", "Pierre-Simon Laplace", "Blaise Pascal"],
            "answer": 0,
            "explanation": "R. A. Fisher suggested 1 in 20 (p = 0.05) as a convenient threshold for judging whether an experimental result warranted further investigation."
        },
        {
            "question": "Why do leading statistical organizations (like the American Statistical Association) advise against treating p = 0.05 as a bright-line boundary between truth and falsehood?",
            "options": ["Because p-values cannot be computed on modern computers", "Because a result with p = 0.049 is practically indistinguishable from p = 0.051; dichotomizing continuous evidence ignores effect size, estimation uncertainty, and prior evidence", "Because alpha = 0.05 is mathematically impossible to achieve", "Because only p < 0.0001 is true"],
            "answer": 1,
            "explanation": "Dichotomizing p-values leads to flawed conclusions where p=0.049 is called a discovery and p=0.051 is dismissed, despite virtually identical data."
        }
    ],
    49: [
        {
            "question": "When comparing two independent groups where the assumption of equal variances is questionable (sigma_1^2 != sigma_2^2), which test should be used?",
            "options": ["Student's pooled t-test", "Welch's t-test (unequal variances t-test)", "Paired t-test", "One-sample z-test"],
            "answer": 1,
            "explanation": "Welch's t-test does not assume equal variances, adjusting the standard error and using Satterthwaite degrees of freedom to maintain valid Type I error rates."
        },
        {
            "question": "When should a Paired t-test be used instead of an Independent Samples t-test?",
            "options": ["When comparing 3 or more groups", "When measurements naturally occur in linked pairs (e.g. before-and-after measurements on the same individual)", "When sample size is greater than 1,000", "When variances are unequal"],
            "answer": 1,
            "explanation": "Paired t-tests analyze the within-pair differences (d_i = x_{1,i} - x_{2,i}), removing between-subject variability and increasing statistical power."
        }
    ],
    50: [
        {
            "question": "For a symmetric test statistic with observed t = +2.20, how does the one-tailed p-value in the observed direction relate to the two-tailed p-value?",
            "options": ["p_one = 2 * p_two", "p_one = p_two / 2", "p_one = p_two", "p_one = 1 - p_two"],
            "answer": 1,
            "explanation": "A one-tailed test considers only one tail of the symmetric distribution, so its area is exactly half of the two-tailed rejection area."
        },
        {
            "question": "Why is switching from a two-tailed test to a one-tailed test AFTER observing your sample data considered improper p-hacking?",
            "options": ["Because one-tailed tests are mathematically invalid", "Because choosing the tail post-hoc effectively doubles the significance level alpha from 0.05 to 0.10, inflating false positive rates", "Because computers can only compute two-tailed tests", "Because sample sizes must be even for one-tailed tests"],
            "answer": 1,
            "explanation": "Directional hypotheses must be specified before looking at data. Testing one-sided only after seeing the direction of the mean halves the p-value post-hoc, cheating the alpha threshold."
        }
    ],
    51: [
        {
            "question": "What is the 50th percentile of any continuous probability distribution?",
            "options": ["The arithmetic mean", "The median", "The mode", "The standard deviation"],
            "answer": 1,
            "explanation": "By definition, the 50th percentile (quantile 0.50) divides the area under the probability density curve into two equal halves of 0.50."
        },
        {
            "question": "What proportion of observations in any distribution lies strictly between the 1st quartile (25th percentile) and the 3rd quartile (75th percentile)?",
            "options": ["25%", "50%", "75%", "95%"],
            "answer": 1,
            "explanation": "The Interquartile Range (IQR) spans from the 25th to the 75th percentile, encompassing exactly 75% - 25% = 50% of the distribution."
        }
    ],
    52: [
        {
            "question": "In a Quantile-Quantile (QQ) plot comparing sample quantiles against theoretical normal quantiles, what does it mean if the plotted points fall along a straight diagonal line?",
            "options": ["The sample data closely match the theoretical normal distribution", "The sample data are uniform", "The variance is zero", "The sample size is too small"],
            "answer": 0,
            "explanation": "If empirical sample quantiles match theoretical Gaussian quantiles across all percentiles, the points plot along a straight line y = mu + sigma * z."
        },
        {
            "question": "If points on a normal QQ plot deviate from the line in an S-shape (lower quantiles are lower than expected, upper quantiles are higher than expected), what does that diagnose?",
            "options": ["Light tails (bounded domain like Uniform)", "Heavy tails (leptokurtic distribution with more extreme outliers than Gaussian, like Student's t)", "Severe right skewness only", "Bimodal discrete data"],
            "answer": 1,
            "explanation": "When sample extremes are more pronounced than theoretical normal predictions, points bend downward on the left and upward on the right, diagnosing heavy tails."
        }
    ],
    53: [
        {
            "question": "In high-throughput biological experiments (such as RNA sequencing or microarrays), what is the primary objective of Quantile Normalization?",
            "options": ["To force all genes to have equal variance", "To make the empirical statistical distribution across different arrays or samples identical while preserving within-sample rank ordering", "To eliminate all zero expression values", "To cluster samples into PCA components"],
            "answer": 1,
            "explanation": "Quantile normalization removes technical between-sample batch variation by forcing all samples to have the same quantile distribution without changing within-sample ranks."
        },
        {
            "question": "What is the core algorithmic procedure of quantile normalization across multiple sample columns?",
            "options": ["Multiply each column by its median", "Rank order each column, calculate the row-wise mean across ranked values, and assign these mean values back to the original ranks in each column", "Subtract the minimum and divide by maximum", "Standardize each column to mean 0 and SD 1"],
            "answer": 1,
            "explanation": "Sorting columns, averaging corresponding rank positions across columns, and replacing raw values with the mean for that rank produces identical distributions across all columns."
        }
    ],
    54: [
        {
            "question": "What is the crucial mathematical difference between Probability P(Data | theta) and Likelihood L(theta | Data)?",
            "options": ["Probability treats parameters theta as fixed and integrates to 1 over data; Likelihood treats observed data as fixed and varies parameters theta (and does NOT integrate to 1)", "Probability is always greater than 1; Likelihood is always less than 1", "Probability is Bayesian; Likelihood is Frequentist only", "There is no mathematical difference"],
            "answer": 0,
            "explanation": "Probability is a measure over outcomes: int f(x | theta) dx = 1. Likelihood is a function of parameters theta: int L(theta | x) dtheta is generally not 1."
        },
        {
            "question": "For a continuous probability density function f(x | theta), what does the likelihood L(theta | x_0) of parameter theta given a single observed value x_0 equal?",
            "options": ["The cumulative probability F(x_0 | theta)", "The vertical height of the density function at that point: f(x_0 | theta)", "The derivative f'(x_0 | theta)", "Zero, because single points have zero probability"],
            "answer": 1,
            "explanation": "While P(X = x_0) = 0 for continuous variables, likelihood measures the relative height of the density curve at x_0 under candidate parameter theta."
        }
    ],
    55: [
        {
            "question": "Why do statisticians almost universally maximize the Log-Likelihood ln L(theta) rather than the raw Likelihood function L(theta)?",
            "options": ["Because log-likelihood produces different parameter estimates", "Because the logarithm converts products of independent probabilities into sums, simplifying differentiation and preventing computational floating-point underflow", "Because raw likelihood cannot be differentiated", "Because log-likelihood is always positive"],
            "answer": 1,
            "explanation": "Since ln(x) is a strictly monotonically increasing function, maximizing ln L(theta) yields the exact same optimum as maximizing L(theta), while turning products into tractable sums."
        },
        {
            "question": "Under standard regularity conditions, what asymptotic property do Maximum Likelihood Estimators (MLE) possess as sample size n -> infinity?",
            "options": ["They are biased by 1/n", "They are asymptotically unbiased, asymptotically normal, and achieve the minimum possible variance (Cramer-Rao Lower Bound)", "They have infinite variance", "They only converge if the distribution is exponential"],
            "answer": 1,
            "explanation": "Asymptotic efficiency of MLE means that for large samples, no consistent estimator can achieve lower mean squared error."
        }
    ],
    56: [
        {
            "question": "For a sample of independent waiting times x_1, ..., x_n drawn from an Exponential(lambda) distribution, what is the Maximum Likelihood Estimator lambda_hat?",
            "options": ["lambda_hat = x_bar", "lambda_hat = 1 / x_bar (the inverse of the sample mean)", "lambda_hat = sqrt(x_bar)", "lambda_hat = sum(x_i)"],
            "answer": 1,
            "explanation": "The log-likelihood is ln L = n*ln(lambda) - lambda*sum(x_i). Setting d(ln L)/dlambda = n/lambda - sum(x_i) = 0 gives lambda_hat = n / sum(x_i) = 1 / x_bar."
        },
        {
            "question": "If you observe 4 bus arrival waiting times: [5, 10, 15, 10] minutes, what is the Maximum Likelihood Estimate for the rate parameter lambda?",
            "options": ["lambda_hat = 10", "lambda_hat = 0.10 arrivals per minute", "lambda_hat = 1.0", "lambda_hat = 0.025"],
            "answer": 1,
            "explanation": "Sample mean x_bar = (5 + 10 + 15 + 10) / 4 = 40 / 4 = 10 minutes. The MLE rate is lambda_hat = 1 / x_bar = 1 / 10 = 0.10 arrivals per minute."
        }
    ],
    57: [
        {
            "question": "For k successes observed in n independent Bernoulli trials, what is the Maximum Likelihood Estimator p_hat for the probability of success?",
            "options": ["p_hat = n / k", "p_hat = k / n (the sample proportion of successes)", "p_hat = sqrt(k * n)", "p_hat = (k - 1) / (n - 1)"],
            "answer": 1,
            "explanation": "Setting the derivative of log-likelihood d/dp [k*ln(p) + (n-k)*ln(1-p)] = k/p - (n-k)/(1-p) = 0 solves algebraically to p_hat = k / n."
        },
        {
            "question": "You flip a coin 50 times and observe 32 heads. What is the Maximum Likelihood estimate of the probability of landing on heads?",
            "options": ["0.50", "0.64 (64%)", "0.32", "0.80"],
            "answer": 1,
            "explanation": "The MLE estimate is the sample proportion: p_hat = 32 / 50 = 0.64 (64%)."
        }
    ],
    58: [
        {
            "question": "What is the Maximum Likelihood Estimator for the population mean mu of a normal distribution N(mu, sigma^2)?",
            "options": ["The sample median", "The sample mean x_bar = (1/n) * sum(x_i)", "The sample mode", "The geometric mean"],
            "answer": 1,
            "explanation": "Maximizing the normal log-likelihood with respect to mu is mathematically equivalent to minimizing sum (x_i - mu)^2, which is uniquely minimized by the sample mean."
        },
        {
            "question": "What is the Maximum Likelihood Estimator for the normal distribution variance sigma^2, and is it unbiased?",
            "options": ["sigma_hat^2 = (1/(n-1)) * sum(x_i - x_bar)^2; it is unbiased", "sigma_hat^2 = (1/n) * sum(x_i - x_bar)^2; it is BIASED downward by a factor of (n-1)/n", "sigma_hat^2 = s^2 / 2; it is unbiased", "sigma_hat^2 = 1.0; always constant"],
            "answer": 1,
            "explanation": "The raw MLE divides by n rather than n-1. Its expectation is E[sigma_hat^2] = ((n-1)/n)*sigma^2, so it underestimates true variance in finite samples."
        }
    ],
    59: [
        {
            "question": "If the probability of an event occurring is p = 0.75, what are the odds in favor of that event?",
            "options": ["0.75", "0.75 / (1 - 0.75) = 0.75 / 0.25 = 3.0 (3 to 1)", "1.33", "0.25"],
            "answer": 1,
            "explanation": "Odds are defined as the ratio of success probability to failure probability: Odds = p / (1 - p) = 0.75 / 0.25 = 3.0."
        },
        {
            "question": "What is the logit function, and what mathematical domain and range does it map?",
            "options": ["logit(p) = ln(p); maps [0, 1] to [-1, 1]", "logit(p) = ln(p / (1 - p)); maps probability p in (0, 1) to the entire real line (-infinity, +infinity)", "logit(p) = e^p; maps reals to positive numbers", "logit(p) = 1 / (1 + e^(-p)); maps reals to [0, 1]"],
            "answer": 1,
            "explanation": "The log-odds or logit transformation maps bounded probabilities (0, 1) to (-infinity, +infinity), making it ideal for linear regression modeling (logistic regression)."
        }
    ],
    60: [
        {
            "question": "In a clinical case-control study, what does an Odds Ratio (OR) of exactly 1.0 indicate?",
            "options": ["The treatment was 100% effective", "No association: the odds of the outcome are identical in the exposed and unexposed groups", "The treatment increased disease odds by 100%", "The study had zero sample size"],
            "answer": 1,
            "explanation": "An Odds Ratio of 1.0 indicates that odds_exposed / odds_unexposed = 1, meaning exposure does not change the odds of developing the disease."
        },
        {
            "question": "Why is the Log(Odds Ratio) preferred over the raw Odds Ratio when computing confidence intervals and standard errors?",
            "options": ["Because raw odds ratios cannot exceed 1.0", "Because raw odds ratios are asymmetric (bounded between 0 and 1 for protective effects, but 1 to infinity for risk effects); log(OR) is symmetric around 0 and approximately normally distributed", "Because logarithm eliminates all random noise", "Because raw odds ratios cannot be tested with t-tests"],
            "answer": 1,
            "explanation": "A halving of odds (OR = 0.5) and a doubling of odds (OR = 2.0) have equal magnitude on the log scale: ln(0.5) = -0.693 and ln(2.0) = +0.693."
        }
    ],
    61: [
        {
            "question": "What foundational pedagogical philosophy did Frank Starmer emphasize that inspired the creation of StatQuest?",
            "options": ["Memorizing formulas is superior to visual intuition", "Mastering the first-principles mechanisms behind mathematical formulas makes complex science transparent and intuitive", "Never question published textbooks", "Always use deep learning over classical statistics"],
            "answer": 1,
            "explanation": "Josh Starmer's father Frank Starmer taught that every formula is simply a shorthand summary of a simple logical mechanism that can be understood from first principles."
        },
        {
            "question": "How does understanding first principles protect scientists when using modern automated AI and statistical toolkits?",
            "options": ["It prevents blind application of algorithms when their underlying distributional assumptions are violated by real-world data", "It guarantees that all models achieve 100% accuracy", "It eliminates the need for software validation", "It automatically repairs corrupted data"],
            "answer": 0,
            "explanation": "Automated tools will blindly fit models to invalid data without warning; only first-principles domain understanding allows researchers to judge validity."
        }
    ],
    62: [
        {
            "question": "In Bessel's correction, what is the expected value of the naive sample variance S_n^2 = (1/n) * sum(X_i - x_bar)^2 when estimating population variance sigma^2?",
            "options": ["E[S_n^2] = sigma^2", "E[S_n^2] = ((n - 1) / n) * sigma^2", "E[S_n^2] = (n / (n - 1)) * sigma^2", "E[S_n^2] = sigma^2 / n"],
            "answer": 1,
            "explanation": "Because sample deviations are measured around the sample mean x_bar rather than the true population mean mu, the sum of squares is systematically smaller by factor (n-1)/n."
        },
        {
            "question": "Why does dividing by n - 1 instead of n in the sample variance s^2 = (1/(n-1)) * sum(X_i - x_bar)^2 yield an unbiased estimator?",
            "options": ["Multiplying by n/(n-1) exactly cancels the downward bias ((n-1)/n), ensuring E[s^2] = sigma^2", "Because n - 1 is the sample standard deviation", "Because degrees of freedom must always be odd", "Because the last observation is always discarded"],
            "answer": 0,
            "explanation": "Since E[(1/n)sum(x_i - x_bar)^2] = ((n-1)/n)*sigma^2, multiplying by Bessel's correction factor n/(n-1) yields E[s^2] = sigma^2, an unbiased estimator."
        }
    ]
}

def enrich_group(group_dict):
    count = 0
    for idx, video in group_dict.items():
        if idx in ALL_EXTRA_QUESTIONS:
            extra = ALL_EXTRA_QUESTIONS[idx]
            # Ensure quiz exists
            if "quiz" not in video:
                video["quiz"] = []
            
            # If video currently has only 1 question, add the 2 extra questions
            if len(video["quiz"]) == 1:
                video["quiz"].extend(extra)
                count += 1
            elif len(video["quiz"]) == 0:
                video["quiz"] = extra
                count += 1
    return count

print("Enriching Group 1...")
c1 = enrich_group(GROUP_1)
print(f"Group 1 enriched: {c1} videos.")

print("Enriching Group 2...")
c2 = enrich_group(GROUP_2)
print(f"Group 2 enriched: {c2} videos.")

print("Enriching Group 3...")
c3 = enrich_group(GROUP_3)
print(f"Group 3 enriched: {c3} videos.")

print("Enriching Group 4...")
c4 = enrich_group(GROUP_4)
print(f"Group 4 enriched: {c4} videos.")

# Format helper to serialize Python dict as valid Python source
def write_group_file(filepath, var_name, group_dict, docstring):
    import pprint
    with open(filepath, 'w') as f:
        f.write(f'# {filepath}\n"""\n{docstring}\n"""\n\n')
        f.write(f'{var_name} = ')
        pprint.pprint(group_dict, stream=f, indent=4, width=120)
        f.write('\n')

write_group_file('scripts/curriculum_group1.py', 'GROUP_1', GROUP_1, 'Pedagogical content for videos 1 to 15 with 3 questions each.')
write_group_file('scripts/curriculum_group2.py', 'GROUP_2', GROUP_2, 'Pedagogical content for videos 16 to 30 with 3 questions each.')
write_group_file('scripts/curriculum_group3.py', 'GROUP_3', GROUP_3, 'Pedagogical content for videos 31 to 45 with 3 questions each.')
write_group_file('scripts/curriculum_group4.py', 'GROUP_4', GROUP_4, 'Pedagogical content for videos 46 to 62 with 3 questions each.')

print("All curriculum files updated successfully!")
