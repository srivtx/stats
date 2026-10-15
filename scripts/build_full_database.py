#!/usr/bin/env python3
"""
Comprehensive builder for StatQuest Statistics Fundamentals full catalog (62 videos).
"""
import json

with open('playlist_videos.json') as f:
    raw_list = json.load(f)

# Module mapping
MODULE_MAP = {
    1: ("module-1", "Descriptive Statistics"),
    4: ("module-1", "Descriptive Statistics"),
    32: ("module-1", "Descriptive Statistics"),
    33: ("module-1", "Descriptive Statistics"),
    34: ("module-1", "Descriptive Statistics"),

    2: ("module-2", "Probability Distributions"),
    3: ("module-2", "Probability Distributions"),
    5: ("module-2", "Probability Distributions"),
    22: ("module-2", "Probability Distributions"),
    23: ("module-2", "Probability Distributions"),
    24: ("module-2", "Probability Distributions"),
    46: ("module-2", "Probability Distributions"),

    6: ("module-3", "Parameters, Samples & Spread"),
    7: ("module-3", "Parameters, Samples & Spread"),
    26: ("module-3", "Parameters, Samples & Spread"),
    27: ("module-3", "Parameters, Samples & Spread"),
    28: ("module-3", "Parameters, Samples & Spread"),
    29: ("module-3", "Parameters, Samples & Spread"),
    62: ("module-3", "Parameters, Samples & Spread"),

    25: ("module-4", "CLT & Bootstrapping"),
    30: ("module-4", "CLT & Bootstrapping"),
    31: ("module-4", "CLT & Bootstrapping"),
    35: ("module-4", "CLT & Bootstrapping"),

    8: ("module-5", "Hypothesis Testing & P-Values"),
    9: ("module-5", "Hypothesis Testing & P-Values"),
    10: ("module-5", "Hypothesis Testing & P-Values"),
    11: ("module-5", "Hypothesis Testing & P-Values"),
    13: ("module-5", "Hypothesis Testing & P-Values"),
    47: ("module-5", "Hypothesis Testing & P-Values"),
    48: ("module-5", "Hypothesis Testing & P-Values"),
    49: ("module-5", "Hypothesis Testing & P-Values"),
    50: ("module-5", "Hypothesis Testing & P-Values"),

    12: ("module-6", "Statistical Errors & Power"),
    14: ("module-6", "Statistical Errors & Power"),
    15: ("module-6", "Statistical Errors & Power"),
    16: ("module-6", "Statistical Errors & Power"),
    17: ("module-6", "Statistical Errors & Power"),

    51: ("module-7", "Quantiles & QQ-Plots"),
    52: ("module-7", "Quantiles & QQ-Plots"),
    53: ("module-7", "Quantiles & QQ-Plots"),

    18: ("module-8", "Covariance & Correlation"),
    19: ("module-8", "Covariance & Correlation"),

    54: ("module-9", "Probability vs Likelihood & MLE"),
    55: ("module-9", "Probability vs Likelihood & MLE"),
    56: ("module-9", "Probability vs Likelihood & MLE"),
    57: ("module-9", "Probability vs Likelihood & MLE"),
    58: ("module-9", "Probability vs Likelihood & MLE"),

    36: ("module-10", "Regression & Linear Models"),
    37: ("module-10", "Regression & Linear Models"),
    38: ("module-10", "Regression & Linear Models"),
    39: ("module-10", "Regression & Linear Models"),
    40: ("module-10", "Regression & Linear Models"),
    41: ("module-10", "Regression & Linear Models"),
    42: ("module-10", "Regression & Linear Models"),
    43: ("module-10", "Regression & Linear Models"),
    44: ("module-10", "Regression & Linear Models"),
    45: ("module-10", "Regression & Linear Models"),

    20: ("module-11", "Bayesian & Odds"),
    21: ("module-11", "Bayesian & Odds"),
    59: ("module-11", "Bayesian & Odds"),
    60: ("module-11", "Bayesian & Odds"),
    61: ("module-11", "Bayesian & Odds"),
}

print(f"Total mappings configured: {len(MODULE_MAP)}")
