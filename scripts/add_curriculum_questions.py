#!/usr/bin/env python3
"""
Adds two additional high-quality questions (for a total of 3 per video)
and first-principles derivations to all 62 videos across curriculum groups 1 to 4.
"""

EXTRA_QUESTIONS = {
    # Group 1 (1-15)
    1: [
        {
            "question": "If you double the bin width in a frequency histogram while keeping total observations constant, what happens?",
            "options": ["Bin count doubles, frequencies per bin halve", "Bin count halves, frequencies per bin approximately double", "Neither bin count nor frequencies change", "Both bin count and frequencies double"],
            "answer": 1,
            "explanation": "Doubling bin width h aggregates neighboring intervals: the number of bins roughly halves, while each bin captures roughly twice as many observations."
        },
        {
            "question": "Why is a histogram with excessively narrow bin widths hazardous for statistical inference?",
            "options": ["It violates total area normalization", "It creates high-variance noisy spikes reflecting random sampling noise rather than underlying population density", "It makes the sample mean mathematically undefined", "It converts continuous variables into nominal variables"],
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
            "options": ["There is a 3% probability that the observed data (or more extreme) arose under the null hypothesis", "There is a 3% probability that the null hypothesis is true", "If H0 is true, obtaining this effect has probability 0.03", "The result is statistically significant at alpha = 0.05"],
            "answer": 1,
            "explanation": "The p-value is P(Data | H0), NOT P(H0 | Data). Conflating the two is the classical 'Prosecutor's Fallacy' or inverse fallacy."
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
    ]
}

print("Extra questions dictionary defined for testing.")
