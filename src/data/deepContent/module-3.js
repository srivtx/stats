// Deep first-principles theory and extra knowledge-check questions for module-3
export const deepContent = {
  6: {
    derivation: {
      headline: "Parameters are fixed targets; estimators are random functions of the sample",
      axioms: [
        String.raw`A population is described by a distribution $F_\theta$ with a fixed but unknown parameter $\theta$, for example the mean $\mu = E[X]$.`,
        String.raw`A random sample $X_1, \dots, X_n$ is drawn independently from $F_\theta$, so every $X_i$ has the same distribution as $X$, with $E[X_i] = \mu$ and $\text{Var}(X_i) = \sigma^2 < \infty$.`,
        String.raw`An estimator $\hat{\theta} = g(X_1, \dots, X_n)$ is a function of the random sample, so it is itself a random variable.`
      ],
      steps: [
        {
          title: "The sample mean is random, the target is not",
          body: String.raw`Each observation $X_i$ is a random draw, so $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$ is a function of random variables. A new sample produces a different value of $\bar{X}$, while $\mu$ never changes. The randomness belongs to the estimator, not to the parameter.`
        },
        {
          title: "Unbiasedness follows from linearity",
          body: String.raw`By linearity of expectation, $E[\bar{X}] = \frac{1}{n}\sum_{i=1}^n E[X_i] = \frac{1}{n} \cdot n\mu = \mu$. Averaged over all possible samples, the estimator hits the fixed target exactly. This is the unbiasedness condition $E[\hat{\theta}] = \theta$ with $\hat{\theta} = \bar{X}$.`
        },
        {
          title: "The estimator's variance shrinks with n",
          body: String.raw`Independence removes all covariance terms, so $\text{Var}(\bar{X}) = \frac{1}{n^2}\sum_{i=1}^n \text{Var}(X_i) = \frac{\sigma^2}{n}$. Chebyshev's inequality then gives $P(|\bar{X} - \mu| \ge \varepsilon) \le \frac{\sigma^2}{n\varepsilon^2}$ for any fixed $\varepsilon > 0$.`
        },
        {
          title: "Consistency: the miss probability vanishes",
          body: String.raw`The right-hand side of the Chebyshev bound goes to 0 as $n \to \infty$ for every fixed $\varepsilon$. So $\bar{X}$ converges in probability to $\mu$, which is the consistency property $\hat{\theta} \to \theta$. The gap between estimate and parameter is random, with typical size of order $\sigma/\sqrt{n}$, and it is not a fixed error.`
        }
      ],
      result: String.raw`The sample mean is an unbiased and consistent estimator of the fixed parameter: $$E[\bar{X}] = \mu \quad \text{and} \quad \text{Var}(\bar{X}) = \frac{\sigma^2}{n} \to 0.$$ Estimates change from sample to sample, but the parameter $\mu$ does not.`,
      assumptionsBreak: String.raw`The argument needs independent draws from one fixed population. If observations are clustered, or the population drifts over time, $\text{Var}(\bar{X})$ is no longer $\sigma^2/n$ and the estimate can settle on the wrong target. If the variance is infinite (heavy tails), the Chebyshev bound is unusable and a few extreme draws can dominate the sample mean.`
    },
    quiz: [
      {
        question: "An analyst draws 50 independent samples of size 20 from the same population and computes a sample mean for each. Why do the 50 means differ while the population mean mu stays fixed?",
        options: [
          "Because mu itself changes each time a new sample is drawn",
          "Because each sample mean is a function of random draws, so each sample yields a different estimate of the same fixed mu",
          "Because the population mean is computed with a rounding error",
          "Because mu is defined as the largest of the sample means"
        ],
        answer: 1,
        explanation: "The randomness sits in the estimator, which is a function of random observations, while mu is a fixed property of the population. The trap is thinking the parameter itself moves between samples."
      },
      {
        question: String.raw`Given independent observations $X_1, \dots, X_n$ each with mean $\mu$, what is $E[\bar{X}]$ for $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$?`,
        options: [
          String.raw`$\mu / n$`,
          String.raw`$n\mu$`,
          String.raw`$\mu^2$`,
          String.raw`$\mu$`
        ],
        answer: 3,
        explanation: "Linearity of expectation gives (1/n) times a sum of n copies of mu, which equals mu. The trap is forgetting the 1/n factor and getting n times mu."
      },
      {
        question: String.raw`Chebyshev's inequality gives $P(|\bar{X} - \mu| \ge \varepsilon) \le \frac{\sigma^2}{n\varepsilon^2}$. What does this bound imply as $n$ grows?`,
        options: [
          "The sample mean can never be within epsilon of mu",
          "The probability of missing mu by more than epsilon increases with n",
          "For any fixed positive epsilon, the probability of a large miss goes to 0, so the sample mean is consistent",
          "The bound only holds when mu equals 0"
        ],
        answer: 2,
        explanation: "The right side shrinks like 1/n, so for any fixed tolerance the chance of a large miss vanishes. Consistency is exactly this convergence, not a claim that one sample is exact."
      },
      {
        question: "Suppose the population has a finite mean mu but infinite variance, as with a Pareto distribution whose shape lies between 1 and 2. Which part of the argument above breaks down?",
        options: [
          String.raw`The variance formula $\text{Var}(\bar{X}) = \sigma^2/n$ and the Chebyshev bound, since $\sigma^2$ is infinite`,
          String.raw`The linearity step $E[\bar{X}] = \mu$, which needs a finite variance`,
          "Nothing, because the sample mean always has finite variance",
          "The sample mean stops being a statistic and becomes a parameter"
        ],
        answer: 0,
        explanation: "Linearity of expectation needs only a finite mean, so E[X_bar] = mu survives. The variance-based proof of consistency fails even though the mean is well defined; the weak law still gives consistency, but this argument does not establish it."
      },
      {
        question: "Which statement correctly distinguishes a parameter from an estimator?",
        options: [
          "A parameter is a random variable that changes with each sample, and an estimator is a fixed constant",
          "A parameter is a fixed property of the population, and an estimator is a random variable computed from the sample",
          "Both are fixed constants that differ only in notation",
          "Both are random variables, because any number computed from data is random"
        ],
        answer: 1,
        explanation: "Parameters are fixed but unknown population quantities, while estimators are functions of random samples and therefore vary. The trap is treating a single estimate as if it were the parameter."
      }
    ]
  },
  7: {
    derivation: {
      headline: "The mean is the least-squares centre, which makes variance a squared-deviation average",
      axioms: [
        String.raw`The arithmetic mean of a sample is $\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i$, the average of the observed values.`,
        String.raw`Spread about a chosen centre $c$ is measured by $S(c) = \sum_{i=1}^n (x_i - c)^2$, since squaring stops positive and negative distances from cancelling.`,
        String.raw`The standard deviation is the positive square root of the variance, $s = \sqrt{s^2}$, so that it has the same units as the data.`
      ],
      steps: [
        {
          title: "The mean minimizes squared distances",
          body: String.raw`Expand $S(c) = \sum_{i=1}^n x_i^2 - 2c\sum_{i=1}^n x_i + nc^2$. Differentiating in $c$ gives $S'(c) = -2\sum_{i=1}^n x_i + 2nc$. Setting $S'(c) = 0$ yields $c = \frac{1}{n}\sum_{i=1}^n x_i = \bar{x}$. Since $S''(c) = 2n > 0$, this point is a minimum, so the mean is the unique least-squares centre.`
        },
        {
          title: "Deviations about the mean sum to zero",
          body: String.raw`Substituting $c = \bar{x}$ gives $\sum_{i=1}^n (x_i - \bar{x}) = \sum_{i=1}^n x_i - n\bar{x} = 0$ by the definition of the mean. Signed deviations always cancel, which is exactly why step 1 needed squares. It also means that once $n-1$ deviations are known, the last one is forced, so only $n-1$ of them are free.`
        },
        {
          title: "Average the sum of squares",
          body: String.raw`The total spread is $SS = \sum_{i=1}^n (x_i - \bar{x})^2$. Dividing by the number of free deviations gives a typical squared distance from the centre. The divisor $n-1$ is that count of free deviations, and video 62 proves it is the divisor that makes $E[s^2] = \sigma^2$.`
        },
        {
          title: "The square root restores the units",
          body: String.raw`Variance has units of the data squared, so $s = \sqrt{s^2}$ returns the spread to the original unit. For a rescaling $y_i = c\,x_i$, every deviation scales by $c$, so $s_y^2 = c^2 s_x^2$ and therefore $s_y = |c|\,s_x$.`
        }
      ],
      result: String.raw`$$s^2 = \frac{1}{n-1}\sum_{i=1}^n (x_i - \bar{x})^2, \qquad s = \sqrt{s^2}$$ The mean is the least-squares centre, and the variance averages the squared deviations over the $n-1$ free deviations.`,
      assumptionsBreak: String.raw`The least-squares argument is specific to squared error. With outliers, $\bar{x}$ and $s^2$ are both pulled strongly by one extreme value, because its square dominates the sum. For heavy-tailed data, robust summaries such as the median and the median absolute deviation are preferred.`
    },
    quiz: [
      {
        question: String.raw`Which value of $c$ minimizes $\sum_{i=1}^n (x_i - c)^2$?`,
        options: [
          "The median of the sample",
          "The mode of the sample",
          String.raw`The mean $\bar{x}$`,
          String.raw`The total $\sum_{i=1}^n x_i$`
        ],
        answer: 2,
        explanation: "Setting the derivative with respect to c to zero gives c = x-bar. The median minimizes the sum of absolute deviations instead, which is a different loss function."
      },
      {
        question: String.raw`For any sample, what does $\sum_{i=1}^n (x_i - \bar{x})$ always equal?`,
        options: [
          String.raw`$n\bar{x}$`,
          "Zero",
          String.raw`$s^2$`,
          String.raw`$\sum_{i=1}^n x_i^2$`
        ],
        answer: 1,
        explanation: "Expanding gives the sum of x_i minus n times x-bar, which is zero by the definition of the mean. The trap is assuming the sum equals n times x-bar or a sum of squares."
      },
      {
        question: "If every observation in a dataset is shifted by a constant, y_i = x_i + 10, how does the sample standard deviation change?",
        options: [
          "It increases by 10",
          "It is divided by 10",
          "It increases by a factor of 10",
          "It is unchanged, because deviations from the mean do not change under a shift"
        ],
        answer: 3,
        explanation: "The new mean is x-bar + 10, so each deviation y_i minus y-bar equals x_i minus x-bar, and the sum of squares and s are identical. The trap is confusing a location shift with a scale change."
      },
      {
        question: "A sample has n = 5 values and you already know the sample mean. How many of the 5 deviations x_i minus x-bar can still take arbitrary values?",
        options: [
          "5",
          "4",
          "1",
          "0"
        ],
        answer: 1,
        explanation: "The deviations must sum to zero, so once n minus 1 of them are chosen the last is forced. This is the degrees-of-freedom count behind the n minus 1 divisor."
      },
      {
        question: String.raw`For the data 1, 3, 8, what is the sample variance $s^2$ using the divisor $n-1$?`,
        options: [
          String.raw`$13$`,
          String.raw`$26/3 \approx 8.67$`,
          String.raw`$\sqrt{13} \approx 3.61$`,
          String.raw`$13/3 \approx 4.33$`
        ],
        answer: 0,
        explanation: "The mean is 4, the deviations are -3, -1 and 4, the sum of squares is 26, and dividing by n minus 1 = 2 gives 13. Dividing by n gives 8.67, and the square root of 13 is the standard deviation, not the variance."
      }
    ]
  },
  26: {
    derivation: {
      headline: "Averaging technical replicates removes only the measurement term of the variance",
      axioms: [
        String.raw`Each biological subject $i$ has a true underlying value $\mu_i$, and these values vary across subjects with $\text{Var}(\mu_i) = \sigma^2_{\text{bio}}$.`,
        String.raw`Each technical measurement is $Y_{ij} = \mu_i + e_{ij}$, where $E[e_{ij}] = 0$ and $\text{Var}(e_{ij}) = \sigma^2_{\text{tech}}$.`,
        String.raw`The technical errors $e_{ij}$ are mutually independent and independent of the subject values $\mu_i$.`
      ],
      steps: [
        {
          title: "Average the replicates of one subject",
          body: String.raw`For subject $i$ with $m$ technical measurements, the mean is $\bar{Y}_i = \frac{1}{m}\sum_{j=1}^m Y_{ij} = \mu_i + \bar{e}_i$, where $\bar{e}_i = \frac{1}{m}\sum_{j=1}^m e_{ij}$. The replicate average is the true value plus an averaged error term.`
        },
        {
          title: "Only the error term shrinks",
          body: String.raw`The errors are independent, so $\text{Var}(\bar{e}_i) = \frac{1}{m^2}\sum_{j=1}^m \sigma^2_{\text{tech}} = \frac{\sigma^2_{\text{tech}}}{m}$. Averaging divides the error variance by $m$, but it has no effect on $\mu_i$, which is the same value for every replicate.`
        },
        {
          title: "Add the independent parts",
          body: String.raw`Since $\mu_i$ and $\bar{e}_i$ are independent, $\text{Var}(\bar{Y}_i) = \text{Var}(\mu_i) + \text{Var}(\bar{e}_i) = \sigma^2_{\text{bio}} + \frac{\sigma^2_{\text{tech}}}{m}$. As $m$ grows the second term vanishes, but the first term is the same for every value of $m$.`
        },
        {
          title: "Biological n scales the whole expression",
          body: String.raw`Across $n$ independent subjects, the grand mean $\bar{Y} = \frac{1}{n}\sum_{i=1}^n \bar{Y}_i$ has $\text{Var}(\bar{Y}) = \frac{1}{n}\left(\sigma^2_{\text{bio}} + \frac{\sigma^2_{\text{tech}}}{m}\right)$. The factor $1/n$ multiplies both terms, so adding subjects is what reduces the whole variance.`
        }
      ],
      result: String.raw`$$\text{Var}(\bar{Y}_i) = \sigma^2_{\text{bio}} + \frac{\sigma^2_{\text{tech}}}{m}, \qquad \text{Var}(\bar{Y}) = \frac{1}{n}\left(\sigma^2_{\text{bio}} + \frac{\sigma^2_{\text{tech}}}{m}\right)$$ Technical replicates can only remove the instrument term, so biological replication controls the uncertainty about population-level means.`,
      assumptionsBreak: String.raw`Technical errors that are correlated across replicates, such as one shared pipette bias or one assay batch, make $\text{Var}(\bar{e}_i)$ fall more slowly than $1/m$. Related subjects, such as littermates, break the independence of the $\mu_i$, so the factor $1/n$ overstates the information.`
    },
    quiz: [
      {
        question: String.raw`In the model $\text{Var}(\bar{Y}_i) = \sigma^2_{\text{bio}} + \sigma^2_{\text{tech}}/m$, what is the smallest variance that can be reached by letting the number of technical replicates $m$ grow without bound?`,
        options: [
          "Zero",
          String.raw`$\sigma^2_{\text{bio}}$`,
          String.raw`$\sigma^2_{\text{tech}}$`,
          String.raw`$\sigma^2_{\text{bio}} + \sigma^2_{\text{tech}}$`
        ],
        answer: 1,
        explanation: "As m grows the technical term goes to 0, but the biological term does not depend on m. The trap is assuming enough repeats can eliminate all variance."
      },
      {
        question: String.raw`A team wants to halve $\text{Var}(\bar{Y}) = \frac{1}{n}\left(\sigma^2_{\text{bio}} + \frac{\sigma^2_{\text{tech}}}{m}\right)$, the variance of the grand mean across subjects. Which change is guaranteed to halve it?`,
        options: [
          "Double m, the number of technical replicates per subject",
          "Halve sigma_tech by buying a better plate reader",
          "Double n, the number of biological subjects",
          "Measure one subject many more times"
        ],
        answer: 2,
        explanation: "Doubling n divides the whole expression by 2. Doubling m or halving sigma_tech only changes the technical term, so neither halves the total when biological variance is nonzero."
      },
      {
        question: "Several 'biological' replicates in a study are littermates from one litter, housed in one cage and given the same treatment. Why does this make the nominal n overstate the independent information?",
        options: [
          "Littermates have higher variance, which always lowers statistical power",
          "Littermates change the Bessel correction factor",
          "Littermates make the sample mean biased upward by definition",
          "Shared litter and cage induce correlation among subjects, so the effective number of biological replicates is smaller than the head count"
        ],
        answer: 3,
        explanation: "Correlated subjects share information, so their values are not independent draws of mu_i. The effective replicate count, and hence the precision, is lower than the number of animals."
      },
      {
        question: String.raw`Averaging $m$ technical replicates changes which terms in the variance decomposition $\sigma^2_{\text{bio}} + \sigma^2_{\text{tech}}/m$?`,
        options: [
          String.raw`Both terms are divided by $m$`,
          String.raw`Only the $\sigma^2_{\text{bio}}$ term, which is the part averaging can remove`,
          String.raw`Only the $\sigma^2_{\text{tech}}/m$ term; $\sigma^2_{\text{bio}}$ is unchanged`,
          "Neither term; averaging only changes the mean"
        ],
        answer: 2,
        explanation: "Averaging acts only on the independent measurement errors, so the technical term shrinks while the biological variance stays put. The trap is assuming averaging reduces true biological variation."
      },
      {
        question: String.raw`A study has 3 treated mice and 3 control mice, each measured 10 times technically. A two-sample $t$-test is run on the mouse-level means. What is the degrees of freedom?`,
        options: [
          "4",
          "58",
          "18",
          "2"
        ],
        answer: 0,
        explanation: "Averaging the 10 replicates per mouse leaves n1 = n2 = 3, so df = 3 + 3 - 2 = 4. Using all 60 measurements would give 58 and falsely claim far more information than the animals provide."
      }
    ]
  },
  27: {
    derivation: {
      headline: "Pairwise correlation inflates the variance of the mean, which defines n_eff",
      axioms: [
        String.raw`Each observation has the same mean $\mu$ and the same finite variance $\text{Var}(X_i) = \sigma^2$.`,
        String.raw`Every pair of distinct observations has the same correlation $\text{Corr}(X_i, X_j) = \rho$ for all $i \ne j$, which gives $\text{Cov}(X_i, X_j) = \rho\sigma^2$.`,
        String.raw`The effective sample size $n_{\text{eff}}$ is defined as the number of independent observations that would give the sample mean the same variance.`
      ],
      steps: [
        {
          title: "Expand the variance of the sum",
          body: String.raw`Let $S = \sum_{i=1}^n X_i$. Then $\text{Var}(S) = \sum_{i=1}^n \text{Var}(X_i) + \sum_{i \ne j} \text{Cov}(X_i, X_j) = n\sigma^2 + n(n-1)\rho\sigma^2$. The double sum runs over $n(n-1)$ ordered pairs of distinct indices, and each contributes $\rho\sigma^2$.`
        },
        {
          title: "Divide by n squared",
          body: String.raw`Since $\bar{X} = S/n$, we get $\text{Var}(\bar{X}) = \frac{1}{n^2}\left[n\sigma^2 + n(n-1)\rho\sigma^2\right] = \frac{\sigma^2}{n}\left[1 + (n-1)\rho\right]$. Relative to the independent case $\sigma^2/n$, the correlation multiplies the variance by the bracket.`
        },
        {
          title: "Match to independent observations",
          body: String.raw`For $n_{\text{eff}}$ independent observations with variance $\sigma^2$, the mean has variance $\sigma^2/n_{\text{eff}}$. Setting $\frac{\sigma^2}{n_{\text{eff}}} = \frac{\sigma^2}{n}\left[1 + (n-1)\rho\right]$ and cancelling $\sigma^2$ gives $n_{\text{eff}} = \frac{n}{1 + (n-1)\rho}$.`
        },
        {
          title: "Check the limits",
          body: String.raw`When $\rho = 0$, $n_{\text{eff}} = n$, as expected for independent data. When $\rho = 1$, $n_{\text{eff}} = 1$, because all observations are copies of one value. For fixed $\rho > 0$, dividing numerator and denominator by $n$ gives $n_{\text{eff}} \to 1/\rho$ as $n \to \infty$, so the information has a ceiling.`
        }
      ],
      result: String.raw`$$n_{\text{eff}} = \frac{n}{1 + (n-1)\rho}$$ With $\rho > 0$, $n_{\text{eff}}$ is always below $n$, and it never exceeds $1/\rho$ no matter how large $n$ becomes.`,
      assumptionsBreak: String.raw`The formula assumes one common correlation for every pair. In real data, correlation often decays with distance or time lag, so a single $\rho$ is wrong and $n_{\text{eff}}$ must come from the full covariance structure. The equicorrelated model is also only valid when $1 + (n-1)\rho \ge 0$, because otherwise the implied variance of the mean would be negative.`
    },
    quiz: [
      {
        question: String.raw`In the equicorrelated model, $\text{Var}(\bar{X}) = \frac{\sigma^2}{n}[1+(n-1)\rho]$. What is the design effect, the ratio of this variance to the independent-case variance $\sigma^2/n$?`,
        options: [
          String.raw`$1 - (n-1)\rho$`,
          String.raw`$\frac{1}{1+(n-1)\rho}$`,
          String.raw`$1 + (n-1)\rho$`,
          String.raw`$\rho$`
        ],
        answer: 2,
        explanation: "Dividing the variance by sigma^2/n leaves the bracket 1 + (n-1) rho. The trap is inverting the ratio, which gives n_eff/n instead of the variance inflation."
      },
      {
        question: "A study has n = 50 observations with pairwise correlation rho = 0.02. What is the effective sample size?",
        options: [
          "50.0",
          "About 25.3",
          "About 2.5",
          "1.98"
        ],
        answer: 1,
        explanation: "n_eff = 50 / (1 + 49 x 0.02) = 50 / 1.98, which is about 25.3. The trap is reporting the denominator 1.98 or assuming the correlation has no effect."
      },
      {
        question: String.raw`With a fixed correlation $\rho > 0$, what value does $n_{\text{eff}} = \frac{n}{1+(n-1)\rho}$ approach as $n \to \infty$?`,
        options: [
          "Infinity",
          String.raw`$n$`,
          String.raw`$1/\rho$`,
          "Zero"
        ],
        answer: 2,
        explanation: "Dividing numerator and denominator by n gives n_eff = 1 / (1/n + rho - rho/n), which tends to 1/rho. The trap is assuming more observations always bring unlimited information."
      },
      {
        question: String.raw`Why does $\rho = 1$ imply $n_{\text{eff}} = 1$ in the formula?`,
        options: [
          "Because all observations are identical copies, so one observation carries all the information",
          "Because a correlation of 1 makes the variance of the mean zero",
          "Because the formula is only defined for rho below 1",
          "Because the sample size is reset to 1 by convention"
        ],
        answer: 0,
        explanation: "With rho = 1 every pair is perfectly correlated, so the variance of the mean stays sigma^2, just like a single observation. The trap is thinking perfect correlation makes the mean perfectly precise."
      },
      {
        question: String.raw`A survey samples 40 people from each of 3 villages (so $n = 120$) with an intraclass correlation of $\text{ICC} = 0.05$. Using $\text{DEFF} = 1 + (m-1)\text{ICC}$ with $m = 40$, what is the design effect?`,
        options: [
          "1.00",
          "6.00",
          "0.05",
          "2.95"
        ],
        answer: 3,
        explanation: "Each cluster of 40 contributes 1 + 39 x 0.05 = 2.95, so the variance of the estimate is nearly three times the simple random sample value. The trap is ignoring the cluster size m."
      }
    ]
  },
  28: {
    derivation: {
      headline: "SD estimates a fixed population constant, while SE measures the spread of the sample mean",
      axioms: [
        String.raw`Individual observations $X_1, \dots, X_n$ are independent and identically distributed with mean $\mu$ and variance $\sigma^2 < \infty$.`,
        String.raw`The sample standard deviation $s$ uses divisor $n-1$, and $E[s^2] = \sigma^2$ holds by Bessel's correction, a previously proven result shown in video 62.`,
        String.raw`The standard error is the standard deviation of the sampling distribution of the sample mean, $\text{SE}(\bar{X}) = \sqrt{\text{Var}(\bar{X})}$.`
      ],
      steps: [
        {
          title: "SD estimates a constant of the population",
          body: String.raw`Since $E[s^2] = \sigma^2$, the sample SD $s$ is the natural estimate of $\sigma$. The target $\sigma$ describes individual subjects and is the same whether we collect 10 or 10,000 of them. A larger $n$ improves the estimate of $\sigma$, but it does not change what $\sigma$ is.`
        },
        {
          title: "SE depends on n by construction",
          body: String.raw`The mean $\bar{X}$ is itself a random variable. Independence gives $\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$, so $\text{SE}(\bar{X}) = \frac{\sigma}{\sqrt{n}}$. Here the quantity being described is the mean, and its variability shrinks as more observations are averaged, which is why the SE depends on $n$.`
        },
        {
          title: "Compare the two quantities",
          body: String.raw`Dividing the two gives $\frac{\text{SE}(\bar{X})}{\sigma} = \frac{1}{\sqrt{n}}$, so the SE is the SD scaled down by $\sqrt{n}$. The SD answers how far apart individuals are, while the SE answers how far the sample mean is likely to sit from $\mu$.`
        },
        {
          title: "Look at the limit as n grows",
          body: String.raw`As $n \to \infty$, $\sigma/\sqrt{n} \to 0$ while $\sigma$ stays fixed. The SD therefore reports the irreducible variability among individuals, whereas the SE keeps shrinking. Confusing the two produces error bars that look too small for the data, or claims of precision that the data cannot support.`
        }
      ],
      result: String.raw`$$\text{SD} = \sigma, \qquad \text{SE}(\bar{X}) = \frac{\sigma}{\sqrt{n}}, \qquad \frac{\text{SE}}{\text{SD}} = \frac{1}{\sqrt{n}}$$ The SD is a property of the population, and the SE is a precision measure for the mean that falls with $\sqrt{n}$.`,
      assumptionsBreak: String.raw`The relation $\text{SE} = s/\sqrt{n}$ assumes independent observations with a common variance. For correlated data, such as repeated measures or clusters, the true SE is larger because $n$ should be replaced by the smaller $n_{\text{eff}}$. For very skewed data with small $n$, the sampling distribution of the mean is also asymmetric, so the SE alone does not describe the uncertainty.`
    },
    quiz: [
      {
        question: "As n grows without bound, which quantity converges to a fixed positive constant rather than to zero?",
        options: [
          String.raw`The standard error of the mean, $\sigma/\sqrt{n}$`,
          "The sample standard deviation s",
          String.raw`The ratio of SE to SD`,
          "The margin of error for the mean"
        ],
        answer: 1,
        explanation: "The sample SD estimates the population constant sigma, so it settles near a positive value. The SE, the SE-to-SD ratio and the margin of error all shrink toward zero as n grows."
      },
      {
        question: "The sample SD of a dataset is 10 and n = 100. What is the standard error of the mean?",
        options: [
          "1",
          "10",
          "0.1",
          "100"
        ],
        answer: 0,
        explanation: "SE = SD / sqrt(n) = 10 / sqrt(100) = 10 / 10 = 1. Reporting 10 as the SE confuses individual spread with mean precision, while 0.1 divides by n instead of its square root."
      },
      {
        question: String.raw`For an independent sample of size $n$, what is the ratio $\text{SE}/\text{SD}$ of the sample mean?`,
        options: [
          String.raw`$\sqrt{n}$`,
          String.raw`$n$`,
          String.raw`$1/\sqrt{n}$`,
          "1 regardless of n"
        ],
        answer: 2,
        explanation: "SE = sigma/sqrt(n) and SD = sigma, so the ratio is 1/sqrt(n). The trap is inverting the ratio or assuming the two always match."
      },
      {
        question: String.raw`A paper reports $\text{SE} = 1.0$ for a mean based on $n = 16$ observations. What sample SD does this imply?`,
        options: [
          "1.0",
          "16",
          "0.25",
          "4.0"
        ],
        answer: 3,
        explanation: "SE = s / sqrt(n) gives s = SE times sqrt(16) = 1.0 times 4 = 4.0. The trap is reading the SE as the data SD, or dividing by n instead of its square root."
      },
      {
        question: "A reviewer asks you to show how variable individual patients are in a figure. Which quantity should you plot, and why?",
        options: [
          "SE, because it is smaller and looks more precise",
          "SE, because more patients make individual spread smaller",
          "SD, because it describes the spread of individual observations and does not shrink as n grows",
          "SD, because SE cannot be computed from a sample"
        ],
        answer: 2,
        explanation: "SD summarizes individual variability, which is a property of the population. SE summarizes the precision of the mean and falls with n, so it would hide how variable individual patients really are."
      }
    ]
  },
  29: {
    derivation: {
      headline: "Independence makes variances add, so the variance of the mean is sigma squared over n",
      axioms: [
        String.raw`The observations $X_1, \dots, X_n$ are independent and identically distributed with mean $\mu$ and finite variance $\sigma^2$.`,
        String.raw`For any random variable $Y$ and constant $a$, $\text{Var}(aY) = a^2\,\text{Var}(Y)$, and for independent $U$ and $V$, $\text{Cov}(U,V) = 0$.`,
        String.raw`The standard error of an estimator is the square root of its variance, $\text{SE}(\hat{\theta}) = \sqrt{\text{Var}(\hat{\theta})}$.`
      ],
      steps: [
        {
          title: "Variance of the sum",
          body: String.raw`Let $S_n = \sum_{i=1}^n X_i$. Expanding the variance of a sum gives $\text{Var}(S_n) = \sum_{i=1}^n\sum_{j=1}^n \text{Cov}(X_i, X_j)$. For $i \ne j$ the observations are independent, so $\text{Cov}(X_i, X_j) = 0$, leaving only the diagonal terms $\text{Var}(X_i) = \sigma^2$. Hence $\text{Var}(S_n) = n\sigma^2$.`
        },
        {
          title: "Scale the sum into a mean",
          body: String.raw`The sample mean is $\bar{X} = \frac{1}{n}S_n$. Applying $\text{Var}(aY) = a^2\,\text{Var}(Y)$ with $a = 1/n$ gives $\text{Var}(\bar{X}) = \frac{1}{n^2}\,n\sigma^2 = \frac{\sigma^2}{n}$. The factor $1/n$ enters squared, which is why the variance shrinks by a factor of $n$.`
        },
        {
          title: "Take the square root",
          body: String.raw`The standard error is the square root of the variance of the mean: $\text{SE}(\bar{X}) = \sqrt{\sigma^2/n} = \sigma/\sqrt{n}$, where the last equality uses $\sigma \ge 0$ and $n > 0$. The square root converts the variance back to the original units of the data.`
        },
        {
          title: "Invert to get the sample size",
          body: String.raw`Suppose we want $\text{SE}(\bar{X}) = \delta$. Then $\sigma/\sqrt{n} = \delta$ gives $n = \sigma^2/\delta^2$. Halving the target SE to $\delta/2$ requires $\sigma^2/(\delta/2)^2 = 4\sigma^2/\delta^2 = 4n$ observations, so each gain in precision costs quadratically more data.`
        }
      ],
      result: String.raw`$$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}, \qquad \text{SE}(\bar{X}) = \frac{\sigma}{\sqrt{n}}$$ Precision improves with the square root of $n$, so halving the SE requires four times as many independent observations.`,
      assumptionsBreak: String.raw`The derivation needs independence and finite variance. With correlated observations, such as repeated measures on one subject, the covariance terms do not vanish and the SE is larger than $\sigma/\sqrt{n}$. If the variance is infinite, as for some heavy-tailed distributions, the formula gives no finite value and the SE is not meaningful.`
    },
    quiz: [
      {
        question: String.raw`In $\text{Var}(S_n) = \sum_i \sum_j \text{Cov}(X_i, X_j)$ for a sum of independent observations, why do the terms with $i \ne j$ vanish?`,
        options: [
          "Because the off-diagonal covariances are negative and cancel exactly",
          "Because independence implies Cov(X_i, X_j) = 0 for i not equal to j",
          "Because each X_i has covariance equal to its own variance",
          "Because every term is divided by n"
        ],
        answer: 1,
        explanation: "Independent variables are uncorrelated, so their covariance is zero. Only the n diagonal variance terms remain, giving n sigma^2. The trap is assuming the cross terms cancel rather than being exactly zero."
      },
      {
        question: "Suppose the observations have equal variance sigma^2 and pairwise correlation rho > 0. How does the true Var(X_bar) compare to sigma^2/n?",
        options: [
          "It is equal to sigma^2/n",
          "It is smaller than sigma^2/n",
          String.raw`It is larger, by the factor $1+(n-1)\rho$`,
          String.raw`It is larger, by the factor $n$`
        ],
        answer: 2,
        explanation: "The off-diagonal covariances add rho sigma^2 for each of the n(n-1) ordered pairs, inflating the variance of the mean by 1 + (n-1) rho. The trap is assuming averaging always yields sigma^2/n."
      },
      {
        question: "A manufacturer wants to cut the standard error of bolt measurements by a factor of 3, with sigma unchanged and independent measurements. By what factor must the sample size increase?",
        options: [
          "3",
          "6",
          "27",
          "9"
        ],
        answer: 3,
        explanation: "SE = sigma/sqrt(n). Reducing the SE by a factor of 3 requires sqrt(n) to triple, so n must grow by 3 squared, which is 9. The trap is multiplying by 3 instead of squaring."
      },
      {
        question: String.raw`What is $\text{Var}(3\bar{X})$ for an independent sample of size $n$ with variance $\sigma^2$?`,
        options: [
          String.raw`$9\sigma^2/n$`,
          String.raw`$3\sigma^2/n$`,
          String.raw`$\sigma^2/(3n)$`,
          String.raw`$\sigma^2/n$`
        ],
        answer: 0,
        explanation: "Var(aY) = a^2 Var(Y), so Var(3 X_bar) = 9 Var(X_bar) = 9 sigma^2/n. The trap is using a instead of a squared."
      },
      {
        question: String.raw`A student reports the standard error of the mean as $\sigma^2/n$. What is the main flaw?`,
        options: [
          "There is no flaw; variance and standard error are the same quantity",
          "The expression is the variance of the mean, not its standard deviation, so its units are squared",
          "The expression is biased and should include n minus 1 in the denominator",
          String.raw`The expression should be $n\sigma$ because more data increases spread`
        ],
        answer: 1,
        explanation: "The standard error is the standard deviation of the sampling distribution, the square root of Var(X_bar) = sigma^2/n. The trap is confusing a variance with a standard deviation."
      }
    ]
  },
  62: {
    derivation: {
      headline: "The sample mean absorbs one degree of freedom, so dividing by n underestimates variance",
      axioms: [
        String.raw`The observations $X_1, \dots, X_n$ are independent and identically distributed with $E[X_i] = \mu$ and $\text{Var}(X_i) = \sigma^2 < \infty$.`,
        String.raw`The sample mean is $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$, and by the standard result of video 29, $\text{Var}(\bar{X}) = \sigma^2/n$.`,
        String.raw`Expectation is taken over repeated samples of size $n$, and the expectation operator is linear.`
      ],
      steps: [
        {
          title: "Split the deviation from mu",
          body: String.raw`Write $X_i - \mu = (X_i - \bar{X}) + (\bar{X} - \mu)$ and square both sides. Summing over $i$ gives $\sum_{i=1}^n (X_i-\mu)^2 = \sum_{i=1}^n (X_i-\bar{X})^2 + 2(\bar{X}-\mu)\sum_{i=1}^n (X_i-\bar{X}) + n(\bar{X}-\mu)^2$.`
        },
        {
          title: "The cross term disappears",
          body: String.raw`By the definition of the sample mean, $\sum_{i=1}^n (X_i - \bar{X}) = 0$, so the middle term is zero. This leaves the deviation identity $\sum_{i=1}^n (X_i-\mu)^2 = \sum_{i=1}^n (X_i-\bar{X})^2 + n(\bar{X}-\mu)^2$, which splits the squared distance from the true mean into a within-sample part and a mean-error part.`
        },
        {
          title: "Take expectations term by term",
          body: String.raw`The left side has $E\left[\sum_{i}(X_i-\mu)^2\right] = n\sigma^2$. The last term has $E\left[n(\bar{X}-\mu)^2\right] = n\,\text{Var}(\bar{X}) = n \cdot \frac{\sigma^2}{n} = \sigma^2$, since $E[\bar{X}] = \mu$. Rearranging gives $E\left[\sum_{i}(X_i-\bar{X})^2\right] = n\sigma^2 - \sigma^2 = (n-1)\sigma^2$.`
        },
        {
          title: "Rescale to an unbiased estimator",
          body: String.raw`Let $SS = \sum_{i=1}^n (X_i-\bar{X})^2$. The divisor-$n$ estimator has $E[SS/n] = \frac{n-1}{n}\sigma^2 < \sigma^2$, so it is biased downward. Multiplying by $\frac{n}{n-1}$ cancels the factor exactly, giving $E\left[\frac{SS}{n-1}\right] = \sigma^2$.`
        }
      ],
      result: String.raw`$$E\left[\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X})^2\right] = \sigma^2, \qquad E\left[\frac{1}{n}\sum_{i=1}^n (X_i-\bar{X})^2\right] = \frac{n-1}{n}\sigma^2$$ Dividing by $n-1$ is exactly the factor that removes the bias, because the sample mean uses up one degree of freedom.`,
      assumptionsBreak: String.raw`The step $E[n(\bar{X}-\mu)^2] = \sigma^2$ relies on iid draws so that $\text{Var}(\bar{X}) = \sigma^2/n$. With correlated samples the factor $n/(n-1)$ is wrong, and the right correction depends on the correlation structure. Also, $s^2$ is unbiased for $\sigma^2$ but $s$ is still biased downward, because the square root is concave.`
    },
    quiz: [
      {
        question: String.raw`In the deviation identity $\sum_i (X_i-\mu)^2 = \sum_i (X_i-\bar{X})^2 + n(\bar{X}-\mu)^2$, which term has expectation exactly $\sigma^2$?`,
        options: [
          String.raw`$\sum_{i=1}^n (X_i - \bar{X})^2$`,
          String.raw`$n(\bar{X} - \mu)^2$`,
          String.raw`$\sum_{i=1}^n (X_i - \mu)^2$`,
          String.raw`$(n-1)\sigma^2$`
        ],
        answer: 1,
        explanation: "Since Var(X_bar) = sigma^2/n, E[n(X_bar - mu)^2] = n times sigma^2/n = sigma^2. The trap is assuming the sum of squared deviations from mu has expectation sigma^2 rather than n sigma^2."
      },
      {
        question: "With n = 2 observations, what fraction of sigma^2 does the divisor-n estimator recover on average?",
        options: [
          "1/2",
          "1",
          "2",
          "1/4"
        ],
        answer: 0,
        explanation: "E[SS] = (n-1) sigma^2 = sigma^2 when n = 2, and dividing by n = 2 leaves half of sigma^2 on average. The trap is assuming the bias vanishes for small samples."
      },
      {
        question: String.raw`Why does the cross term $2(\bar{X}-\mu)\sum_i (X_i-\bar{X})$ vanish when expanding $\sum_i (X_i-\mu)^2$?`,
        options: [
          String.raw`Because $\bar{X}$ equals $\mu$ in every sample`,
          "Because the variance of the sample is zero",
          "Because the deviations from the sample mean sum to zero by the definition of the sample mean",
          "Because the population is assumed to be symmetric"
        ],
        answer: 2,
        explanation: "The sum of deviations from the sample mean is zero by construction, so the cross term vanishes regardless of mu. The trap is thinking the cross term needs symmetry or a special value of mu."
      },
      {
        question: String.raw`A sample of $n = 10$ observations has $\sum_i (X_i - \bar{X})^2 = 45$. What are the unbiased variance $s^2$ and the divisor-$n$ estimate?`,
        options: [
          String.raw`$s^2 = 4.5$ and divisor-$n$ estimate $5.0$`,
          String.raw`$s^2 = 45$ and divisor-$n$ estimate $4.5$`,
          String.raw`$s^2 = 5.0$ and divisor-$n$ estimate $5.0$`,
          String.raw`$s^2 = 5.0$ and divisor-$n$ estimate $4.5$`
        ],
        answer: 3,
        explanation: "The unbiased value is 45/(10-1) = 5.0, and the divisor-n estimate is 45/10 = 4.5. The trap is swapping the two divisors."
      },
      {
        question: "Which statement about the sample standard deviation s (not s squared) is correct?",
        options: [
          String.raw`$E[s]$ is below $\sigma$ because the square root is concave, even though $E[s^2] = \sigma^2$`,
          "s is exactly unbiased for sigma whenever n is at least 30",
          "s is biased upward, because the square root inflates small values",
          "s is unbiased only when the data are normally distributed"
        ],
        answer: 0,
        explanation: "By Jensen's inequality for the concave square root, E[s] is less than sqrt(E[s^2]) = sigma. The trap is assuming that the unbiasedness of s^2 transfers to s."
      }
    ]
  }
};

export default deepContent;
