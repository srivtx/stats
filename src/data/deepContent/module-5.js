// Deep first-principles theory and extra knowledge-check questions for module-5
export const deepContent = {
  8: {
    derivation: {
      headline: "Least squares: deriving the best-fitting line from a squared-error model",
      axioms: [
        String.raw`Observations follow the model $y_i = \beta_0 + \beta_1 x_i + \varepsilon_i$, where the errors $\varepsilon_i$ have mean zero and are independent of the predictor.`,
        String.raw`A candidate line $(b_0, b_1)$ is judged by its sum of squared residuals $SSE(b_0, b_1) = \sum_{i=1}^n (y_i - b_0 - b_1 x_i)^2$.`,
        String.raw`The sample means $\bar{x} = \frac{1}{n}\sum_i x_i$ and $\bar{y}$ are defined, and $S_{xx} = \sum_i (x_i - \bar{x})^2 > 0$, so the x values are not all identical.`,
      ],
      steps: [
        {
          title: "Differentiate with respect to the intercept",
          body: String.raw`Differentiate $SSE$ with respect to $b_0$: $\frac{\partial SSE}{\partial b_0} = -2\sum_i (y_i - b_0 - b_1 x_i)$. Setting this to zero and dividing by $n$ gives $b_0 = \bar{y} - b_1 \bar{x}$, so the fitted line always passes through the point $(\bar{x}, \bar{y})$.`,
        },
        {
          title: "Differentiate with respect to the slope",
          body: String.raw`Differentiate $SSE$ with respect to $b_1$: $\frac{\partial SSE}{\partial b_1} = -2\sum_i x_i (y_i - b_0 - b_1 x_i)$. Setting this to zero gives the normal equation $\sum_i x_i y_i = b_0 \sum_i x_i + b_1 \sum_i x_i^2$.`,
        },
        {
          title: "Solve the two equations",
          body: String.raw`Substitute $b_0 = \bar{y} - b_1\bar{x}$ and use $\sum_i x_i = n\bar{x}$. The slope equation becomes $\sum_i x_i y_i - n\bar{x}\bar{y} = b_1\left(\sum_i x_i^2 - n\bar{x}^2\right)$. The left side is $S_{xy} = \sum_i (x_i - \bar{x})(y_i - \bar{y})$ and the bracket is $S_{xx}$, so $b_1 = S_{xy}/S_{xx}$.`,
        },
        {
          title: "Confirm the stationary point is a minimum",
          body: String.raw`The second derivatives of $SSE$ are $2n$, $2\sum_i x_i$, and $2\sum_i x_i^2$, giving a Hessian determinant $4\left(n\sum_i x_i^2 - (\sum_i x_i)^2\right) = 4nS_{xx}$. Since $2n > 0$ and $S_{xx} > 0$, the Hessian is positive definite, so the solution is the unique minimum of the squared error.`,
        },
        {
          title: "Read off the residual property",
          body: String.raw`The first normal equation says $\sum_i e_i = 0$ for residuals $e_i = y_i - \hat{y}_i$. The least-squares line therefore places as much error above it as below it, and together with the slope formula it fully determines the line implied by the model.`,
        },
      ],
      result: String.raw`$$\hat{\beta}_1 = \frac{\sum_i (x_i-\bar{x})(y_i-\bar{y})}{\sum_i (x_i-\bar{x})^2}, \qquad \hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}$$`,
      assumptionsBreak: "If the true relationship is curved, the straight line still minimizes squared error, but it describes the data poorly and the residuals show a systematic pattern that signals misspecification. Least squares recovers the mechanism only when the chosen model family contains the truth or approximates it well.",
    },
    quiz: [
      {
        question: "In the least-squares derivation for y = b0 + b1 x, setting the partial derivative with respect to b0 to zero forces which property of the residuals?",
        options: [
          "The residuals have equal variance",
          "The residuals are all positive",
          "The residuals sum to zero",
          "The residuals are all identical",
        ],
        answer: 2,
        explanation: "The derivative with respect to b0 is proportional to the sum of residuals, so setting it to zero forces that sum to zero. The trap is confusing this with the sum of squared residuals, which is minimized but not zero.",
      },
      {
        question: "Suppose every y value is doubled while the x values stay fixed. How does the least-squares slope change?",
        options: [
          "It doubles",
          "It is unchanged",
          "It halves",
          "It becomes four times larger",
        ],
        answer: 0,
        explanation: "Sxy doubles because each product (x_i - xbar)(y_i - ybar) doubles, while Sxx depends only on x and stays fixed, so b1 = Sxy/Sxx doubles. Squaring the scale factor is a trap that applies only to variances.",
      },
      {
        question: "If the true relationship is y = x^2 + noise and you fit a straight line by least squares, which statement is correct?",
        options: [
          "The least-squares line recovers the true curve",
          "The residuals are independent and centered on zero at every value of x",
          "The noise term must be zero for the fit to work",
          "The line still minimizes squared error, but its residuals show a systematic curved pattern because the model is misspecified",
        ],
        answer: 3,
        explanation: "Least squares always returns the best straight line, even when a straight line is the wrong model. The curved pattern left in the residuals is the diagnostic that the model structure is wrong.",
      },
      {
        question: "What happens to the least-squares slope formula b1 = Sxy / Sxx if every x_i has the same value?",
        options: [
          "The slope is zero",
          "The slope is undefined because Sxx = 0",
          "The slope equals the mean of y",
          "The slope equals one",
        ],
        answer: 1,
        explanation: "When all x_i are equal, each x_i minus xbar is zero, so Sxx is zero and the division has no meaning. A line cannot be identified from data with no variation in the predictor.",
      },
      {
        question: "If every x_i is shifted by a constant c (x_i becomes x_i + c), what happens to the least-squares slope and intercept?",
        options: [
          "Both are unchanged",
          "The slope changes but the intercept does not",
          "The slope is unchanged and the intercept becomes b0 - b1 c",
          "The slope becomes b1 + c",
        ],
        answer: 2,
        explanation: "Shifting x leaves Sxy and Sxx unchanged, so the slope is the same, while the new intercept is ybar - b1(xbar + c) = b0 - b1 c. Confusing the slope with the intercept is the common error.",
      },
    ],
  },
  9: {
    derivation: {
      headline: "Deriving the rejection rule for a two-sided z-test with known sigma",
      axioms: [
        String.raw`The observations $X_1, X_2, \ldots, X_n$ are independent and identically distributed as $N(\mu, \sigma^2)$, with $\sigma$ known.`,
        String.raw`The null hypothesis is $H_0: \mu = \mu_0$ and the two-sided alternative is $H_1: \mu \ne \mu_0$.`,
        String.raw`The significance level $\alpha$ is the largest tolerated probability of rejecting $H_0$ when it is true, so $P(\text{Reject } H_0 \mid H_0) = \alpha$.`,
      ],
      steps: [
        {
          title: "Find the sampling distribution under the null",
          body: String.raw`A linear combination of independent normal variables is normal, so $\bar{X} = \frac{1}{n}\sum_i X_i \sim N(\mu, \sigma^2/n)$. Under $H_0$ this becomes $\bar{X} \sim N(\mu_0, \sigma^2/n)$, which is the reference distribution against which the observed mean is judged.`,
        },
        {
          title: "Standardize to a fixed distribution",
          body: String.raw`Define $Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}}$. Subtracting the null mean and dividing by the standard deviation of $\bar{X}$ gives $Z \sim N(0,1)$ under $H_0$, so the null distribution of $Z$ is completely specified before any data are collected.`,
        },
        {
          title: "Compute the Type I error for a symmetric rejection region",
          body: String.raw`Reject when $|Z| \ge c$. Because the standard normal density is symmetric, $P(|Z| \ge c \mid H_0) = 2P(Z \ge c) = 2\left[1 - \Phi(c)\right]$.`,
        },
        {
          title: "Choose the cutoff that fixes alpha",
          body: String.raw`Setting the Type I error equal to $\alpha$ gives $2[1 - \Phi(c)] = \alpha$, so $\Phi(c) = 1 - \alpha/2$ and $c = z_{1-\alpha/2}$. At $\alpha = 0.05$ this gives $z_{0.975} \approx 1.96$.`,
        },
        {
          title: "Translate the rule back to the data",
          body: String.raw`The condition $|Z| \ge z_{1-\alpha/2}$ is equivalent to $|\bar{X} - \mu_0| \ge z_{1-\alpha/2}\,\sigma/\sqrt{n}$. The rule was derived from the null distribution alone, so the Type I error rate equals $\alpha$ by construction, and the data only determine which side of the cutoff we land on.`,
        },
      ],
      result: String.raw`$$\text{Reject } H_0 \iff |Z| \ge z_{1-\alpha/2}, \qquad P(\text{Reject } H_0 \mid H_0) = \alpha$$`,
      assumptionsBreak: "If sigma is unknown and replaced by the sample standard deviation s, Z is no longer exactly normal: it follows a t distribution with heavier tails, so the cutoff 1.96 is too small and the true Type I error exceeds alpha when n is small. The same problem appears with strongly skewed data and small n, because the normal reference distribution is then inaccurate.",
    },
    quiz: [
      {
        question: "Why is Z = (xbar - mu0)/(sigma/sqrt(n)) exactly standard normal under H0 when the data are normal with known sigma?",
        options: [
          "Because the central limit theorem is applied to a sample of size one",
          "Because the mean of normal variables is normal with variance sigma^2/n, so centering and scaling gives N(0,1)",
          "Because sigma is always equal to 1 in hypothesis tests",
          "Because the sample mean always equals mu0 under H0",
        ],
        answer: 1,
        explanation: "The sample mean of independent normal variables is itself normal with variance sigma^2/n, so subtracting mu0 and dividing by its standard deviation gives an exact standard normal. The trap is attributing this to the central limit theorem, which is only needed when the data are not normal.",
      },
      {
        question: "Keeping the same data, if alpha is lowered from 0.05 to 0.01 in a two-sided z-test, what happens to the rejection region?",
        options: [
          "It moves outward: the cutoff rises from 1.96 to about 2.576, so it becomes harder to reject",
          "It moves inward, so it becomes easier to reject",
          "It is unchanged because the data did not change",
          "It doubles in width but keeps the same cutoff",
        ],
        answer: 0,
        explanation: "A smaller alpha leaves less tail area for the rejection region, so the cutoff z_{1-alpha/2} increases from 1.96 to about 2.576. Stricter error control always makes the test harder to pass for the same data.",
      },
      {
        question: "If H0 is true and you repeat a two-sided z-test with alpha = 0.05 on many fresh samples, what fraction of tests should reject?",
        options: [
          "Close to 0%, because the null is true",
          "Close to 50%, because the alternative is equally likely",
          "Close to 95%, because the test confirms the null",
          "Close to 5%, because each test has Type I error alpha",
        ],
        answer: 3,
        explanation: "By construction, each test rejects with probability alpha when H0 is true, so about 5% of the repeated tests reject. Reading the 95% confidence level as the rejection rate is a common mix-up.",
      },
      {
        question: "A student replaces sigma with the sample standard deviation s in Z and uses the cutoff 1.96 with n = 5. Which problem is most likely?",
        options: [
          "The test becomes exact and more powerful",
          "The rejection rate under H0 is larger than alpha, because s adds estimation uncertainty and the t distribution has heavier tails",
          "The rejection rate is smaller than alpha, because s is always larger than sigma",
          "The alternative hypothesis becomes one-sided",
        ],
        answer: 1,
        explanation: "Estimating sigma adds randomness to the denominator, so the statistic follows a t distribution with 4 degrees of freedom whose tails are heavier than the normal. The fixed cutoff 1.96 then rejects too often under H0.",
      },
      {
        question: "Holding the observed difference xbar - mu0 fixed at 2 units, what happens to Z = (xbar - mu0)/(sigma/sqrt(n)) as the sample size n grows?",
        options: [
          "Z stays the same because the difference is fixed",
          "Z shrinks in proportion to 1/n",
          "Z grows in proportion to sqrt(n)",
          "Z becomes negative",
        ],
        answer: 2,
        explanation: "Writing Z = (xbar - mu0) sqrt(n)/sigma shows that Z grows with the square root of n when the observed difference is held fixed. Larger samples give more evidence against H0 for the same effect size.",
      },
    ],
  },
  10: {
    derivation: {
      headline: "Why one-sided cutoffs are smaller than two-sided cutoffs at the same alpha",
      axioms: [
        String.raw`Under $H_0$ the standardized test statistic $Z$ follows the standard normal distribution $N(0,1)$, with cumulative distribution function $\Phi$.`,
        String.raw`The total Type I error budget is $\alpha$, meaning $P(\text{Reject } H_0 \mid H_0) = \alpha$ for every test considered.`,
        String.raw`A two-sided test rejects when $|Z|$ is large, and an upper-tailed one-sided test rejects when $Z$ is large and positive.`,
      ],
      steps: [
        {
          title: "Derive the two-sided cutoff",
          body: String.raw`The two-sided rule rejects when $|Z| \ge c$, so $\alpha = P(|Z| \ge c) = 2P(Z \ge c)$ by symmetry. Hence $P(Z \ge c) = \alpha/2$ and $c = z_{1-\alpha/2}$, which is $1.96$ at $\alpha = 0.05$.`,
        },
        {
          title: "Derive the one-sided cutoff",
          body: String.raw`The upper-tailed rule rejects when $Z \ge c'$. Requiring $\alpha = P(Z \ge c') = 1 - \Phi(c')$ gives $c' = z_{1-\alpha}$, which is $1.645$ at $\alpha = 0.05$.`,
        },
        {
          title: "Compare the two cutoffs",
          body: String.raw`Since $\Phi$ is increasing and $1 - \alpha < 1 - \alpha/2$, we get $z_{1-\alpha} < z_{1-\alpha/2}$. The whole alpha budget sits in one tail, so the boundary can lie closer to zero than the two-sided boundary, which must split alpha across two tails.`,
        },
        {
          title: "Apply the cutoffs to an observed statistic",
          body: String.raw`For an observed $Z = 1.80$, the one-sided p-value is $P(Z \ge 1.80) = 1 - \Phi(1.80) \approx 0.036$ and the two-sided p-value is $2 \times 0.036 \approx 0.072$. The statistic exceeds $1.645$ but not $1.96$, so the same data reject in the one-sided test and not in the two-sided test.`,
        },
        {
          title: "Identify the cost of the directional choice",
          body: String.raw`The upper-tailed rejection region contains no negative values, so the test can never reject for a negative $Z$, however extreme. The extra sensitivity in the chosen direction is paid for with blindness to the opposite direction.`,
        },
      ],
      result: String.raw`$$z_{1-\alpha} < z_{1-\alpha/2}, \qquad z_{0.95} \approx 1.645 < 1.96 \approx z_{0.975}$$`,
      assumptionsBreak: "The one-sided cutoff is valid only if the direction was fixed before data collection and the opposite direction is genuinely uninteresting. If the researcher inspects the data first and then picks the tail that looks promising, the nominal alpha of 0.05 is effectively doubled to about 0.10 for false positives.",
    },
    quiz: [
      {
        question: "A one-sided upper-tailed test uses alpha = 0.025. Which critical value applies?",
        options: [
          "1.645",
          "1.96",
          "2.326",
          "2.576",
        ],
        answer: 1,
        explanation: "With alpha = 0.025 in one tail, the cutoff is z_{0.975} = 1.96, the same numeric cutoff as a two-sided test at alpha = 0.05. The trap is using 1.645, which is the cutoff for a one-sided test at alpha = 0.05.",
      },
      {
        question: "Why is the one-sided cutoff at alpha = 0.05 smaller than the two-sided cutoff at alpha = 0.05?",
        options: [
          "One-sided tests use a larger sample size",
          "One-sided tests use the t distribution instead of the normal",
          "The one-sided test uses alpha squared as its threshold",
          "All of the alpha budget is in one tail, so the boundary can sit closer to zero",
        ],
        answer: 3,
        explanation: "The two-sided test must leave alpha/2 in each tail, while the one-sided test puts all alpha in a single tail, so its boundary can be closer to the center. The one-sided test is not using a different distribution or sample size.",
      },
      {
        question: "A test is pre-registered as upper-tailed (H1: mu > mu0). The observed Z = -2.50. What is the correct decision at alpha = 0.05?",
        options: [
          "Fail to reject H0, because the effect lies in the untested direction",
          "Reject H0, because |Z| exceeds 1.645",
          "Reject H0, because the lower-tail p-value of 0.006 is below 0.05 even though the test is upper-tailed",
          "Reject H0, because one-sided tests always reject",
        ],
        answer: 0,
        explanation: "An upper-tailed test has its rejection region only in positive Z values, so a Z of -2.50 cannot lead to rejection. Using the absolute value or the opposite tail after seeing the data is exactly the mistake the directional rule prevents.",
      },
      {
        question: "Given the same true effect in the upper direction and the same alpha, which test has greater power to detect it?",
        options: [
          "The two-sided test, because it uses two tails",
          "They have identical power",
          "The one-sided upper-tailed test, because its cutoff is smaller",
          "The test whose p-value is larger",
        ],
        answer: 2,
        explanation: "A smaller cutoff means a true upward effect pushes the statistic past the threshold more often, which raises power. This advantage only holds when the effect truly lies in the pre-specified direction.",
      },
      {
        question: "Under H0 with a symmetric null, in a two-sided test at alpha = 0.05, what is the probability of rejecting in the upper tail alone?",
        options: [
          "0.05",
          "0.025",
          "0.10",
          "0.005",
        ],
        answer: 1,
        explanation: "The two-sided test splits alpha equally, so each tail carries alpha/2 = 0.025 of the null probability. The total rejection probability is 0.05 only when both tails are added together.",
      },
    ],
  },
  11: {
    derivation: {
      headline: "Why p-values are uniformly distributed under the null hypothesis",
      axioms: [
        String.raw`The test statistic $T$ has a continuous, strictly increasing cumulative distribution function $F$ under $H_0$, so the inverse $F^{-1}$ exists on $(0,1)$.`,
        String.raw`The upper-tailed p-value is the random variable $p = 1 - F(T)$, the null probability of a statistic at least as large as the observed one.`,
        String.raw`Under $H_0$, probabilities of events about $T$ are given by its CDF, so $P(T \le t \mid H_0) = F(t)$ for every real $t$.`,
      ],
      steps: [
        {
          title: "Write the p-value event in terms of T",
          body: String.raw`Fix $u \in (0,1)$. The event $\{p \le u\}$ is the event $\{1 - F(T) \le u\}$, which is equivalent to $\{F(T) \ge 1 - u\}$.`,
        },
        {
          title: "Invert the CDF",
          body: String.raw`Because $F$ is continuous and strictly increasing, $F(T) \ge 1 - u$ holds exactly when $T \ge t^* = F^{-1}(1-u)$. Therefore $P(p \le u \mid H_0) = P(T \ge t^* \mid H_0)$.`,
        },
        {
          title: "Evaluate the tail probability",
          body: String.raw`Using the CDF, $P(T \ge t^* \mid H_0) = 1 - F(t^*) = 1 - F\left(F^{-1}(1-u)\right) = 1 - (1-u) = u$.`,
        },
        {
          title: "Identify the distribution",
          body: String.raw`The CDF of the p-value is $P(p \le u \mid H_0) = u$ for every $u \in [0,1]$. That is exactly the CDF of the Uniform(0,1) distribution, so $p \sim \text{Uniform}(0,1)$ under $H_0$.`,
        },
        {
          title: "Read off the consequence for thresholds",
          body: String.raw`Taking $u = \alpha$ gives $P(p \le \alpha \mid H_0) = \alpha$. Any significance threshold therefore has a built-in false-positive rate equal to itself, a fact that follows from the null distribution alone.`,
        },
      ],
      result: String.raw`$$P(p \le \alpha \mid H_0) = \alpha \quad \text{for all } \alpha \in [0,1], \qquad p \sim \text{Uniform}(0,1)$$`,
      assumptionsBreak: String.raw`For discrete statistics, such as the binomial count in the coin example or Fisher's exact test, F has jumps, so the equality becomes an inequality: $P(p \le \alpha \mid H_0) \le \alpha$. The test is then conservative and the p-value is not uniform. If H0 is false, p-values tend to pile up near zero, which is why small p-values count as evidence against H0.`,
    },
    quiz: [
      {
        question: "Under a true null hypothesis with a continuous test statistic, what is P(p <= 0.10)?",
        options: [
          "0.01",
          "0.05",
          "0.10",
          "0.90",
        ],
        answer: 2,
        explanation: "Under a continuous null the p-value is uniform on [0,1], so the probability that it falls at or below any threshold equals that threshold. The 0.90 option is the complement, a common slip.",
      },
      {
        question: "Why is the p-value from a discrete test such as a binomial test not exactly uniform under H0?",
        options: [
          "Because F has jumps, so P(p <= alpha | H0) can be strictly less than alpha, making the test conservative",
          "Because the binomial distribution is symmetric",
          "Because discrete tests always reject H0",
          "Because the p-value is always exactly 1 under H0",
        ],
        answer: 0,
        explanation: "A jump in F means the achievable p-values are spaced out, so the test cannot hit alpha exactly and rejects less often than nominal. This makes the test conservative rather than exact.",
      },
      {
        question: "Study A reports p = 0.001 and Study B reports p = 0.04. Which conclusion is justified by the p-values alone?",
        options: [
          "Study A's effect is practically larger by a factor of 40",
          "Study A has a 0.999 probability that H0 is false, and Study B has 0.96",
          "Study B's null hypothesis has been proven true",
          "Study A provides stronger evidence against H0 at the observed data, but the p-value does not measure the size of the effect",
        ],
        answer: 3,
        explanation: "A smaller p-value means the data are less compatible with H0, but it says nothing about effect size, which depends on sample size and estimate magnitude. Reading the p-value as the probability that H0 is true is the inverse-probability fallacy.",
      },
      {
        question: "For a one-sided upper-tailed test, why does a larger observed statistic produce a smaller p-value?",
        options: [
          "Because the p-value is the density at the observed value",
          "Because p = P(T >= t_obs | H0) is the tail beyond t_obs, which shrinks as t_obs moves further into the tail",
          "Because the test statistic is divided by the p-value",
          "Because H0 becomes less likely as the statistic grows",
        ],
        answer: 1,
        explanation: "The p-value is a tail area, and moving the observed value further into the tail leaves less null probability beyond it. The density at a point is a different quantity and is not the p-value.",
      },
      {
        question: "If the alternative hypothesis is true with a large effect, what happens to the distribution of p-values across repeated studies?",
        options: [
          "It is uniform on [0,1], just as under the null",
          "It is concentrated near 0.5",
          "It is concentrated near 0, so small p-values become common",
          "It is concentrated near 1 because the null is false",
        ],
        answer: 2,
        explanation: "When the effect is real and large, most studies produce statistics deep in the rejection region, so p-values cluster near zero. Uniformity is a property of the null alone, which is exactly why the null distribution of p-values is so useful.",
      },
    ],
  },
  13: {
    derivation: {
      headline: "Deriving the t-statistic null distribution from normal sampling",
      axioms: [
        String.raw`The observations $X_1, \ldots, X_n$ are independent draws from a normal population $N(\mu, \sigma^2)$ with unknown $\sigma^2$.`,
        String.raw`For normal samples, the sample mean $\bar{X}$ is independent of the sample variance $s^2$, and $V = \frac{(n-1)s^2}{\sigma^2}$ follows a chi-squared distribution with $n-1$ degrees of freedom.`,
        String.raw`If $Z \sim N(0,1)$ and $V \sim \chi^2_k$ are independent, then $Z/\sqrt{V/k}$ follows Student's t distribution with $k$ degrees of freedom.`,
      ],
      steps: [
        {
          title: "Standardize with the true sigma",
          body: String.raw`Define $Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}}$. Under $H_0: \mu = \mu_0$, $Z \sim N(0,1)$. The difficulty is that $\sigma$ is unknown, so $Z$ cannot be computed from data.`,
        },
        {
          title: "Replace sigma with its estimate",
          body: String.raw`Write $T = \frac{\bar{X} - \mu_0}{s/\sqrt{n}}$. Substituting $\bar{X} - \mu_0 = Z\sigma/\sqrt{n}$ gives $T = Z\,\sigma/s$. Since $s/\sigma = \sqrt{s^2/\sigma^2} = \sqrt{V/(n-1)}$, we obtain $T = \frac{Z}{\sqrt{V/(n-1)}}$.`,
        },
        {
          title: "Identify the independent pieces",
          body: String.raw`$Z$ is a function of $\bar{X}$ and $V$ is a function of $s^2$. Because $\bar{X}$ is independent of $s^2$, $Z$ and $V$ are independent, with $Z \sim N(0,1)$ and $V \sim \chi^2_{n-1}$ under $H_0$.`,
        },
        {
          title: "Apply the t construction",
          body: String.raw`With $k = n-1$, the representation $T = Z/\sqrt{V/(n-1)}$ matches the definition of Student's t distribution, so $T \sim t_{n-1}$ under $H_0$.`,
        },
        {
          title: "Turn the null distribution into a p-value",
          body: String.raw`For an observed $t_{\text{obs}}$, the two-sided p-value is $p = P(|T| \ge |t_{\text{obs}}|) = 2P(T \ge |t_{\text{obs}}|)$ by symmetry of the t density. With $\bar{x} = 105$, $\mu_0 = 100$, $s = 10$, $n = 25$, we have $t_{\text{obs}} = 5/(10/5) = 2.5$ with $24$ degrees of freedom, and the two-sided p-value is about $0.0198$.`,
        },
      ],
      result: String.raw`$$T = \frac{\bar{X} - \mu_0}{s/\sqrt{n}} = \frac{Z}{\sqrt{V/(n-1)}} \sim t_{n-1} \quad \text{under } H_0$$`,
      assumptionsBreak: "If the population is far from normal, the independence of the mean and variance fails and the chi-squared result no longer holds, so the t tail areas are only approximate. With small n and heavy outliers the error can be substantial, and if observations are dependent, the effective degrees of freedom are overstated and p-values come out too small.",
    },
    quiz: [
      {
        question: "Why does the one-sample statistic follow a t distribution with n-1 degrees of freedom instead of a standard normal?",
        options: [
          "Because the sample size is always small",
          "Because the data are always discrete",
          "Because sigma is replaced by the random estimate s, and a normal divided by a random scale gives a t distribution",
          "Because the t distribution has lighter tails than the normal",
        ],
        answer: 2,
        explanation: "Replacing the unknown sigma with the random estimate s adds variability to the denominator, and the ratio of a standard normal to the square root of a scaled chi-squared variable is t-distributed. The sample size does not need to be small for this to hold.",
      },
      {
        question: "For the same t_obs = 2.5, how does the two-sided p-value from the t distribution with 24 df compare to the normal approximation?",
        options: [
          "It is larger, about 0.020 versus 0.012, because the t distribution has heavier tails",
          "It is smaller, because the t distribution has lighter tails",
          "They are exactly identical",
          "It is larger, because the standard deviation is squared",
        ],
        answer: 0,
        explanation: "The t distribution with 24 df has heavier tails than the standard normal, so the same statistic has more tail area and a larger p-value (about 0.0198 versus 0.0124). Using the normal here would overstate the evidence.",
      },
      {
        question: "A student computes t = (105 - 100) / 10 = 0.5 for xbar = 105, mu0 = 100, s = 10, n = 25. What is the error?",
        options: [
          "They should use n-1 = 24 as the statistic",
          "They should have used the normal distribution",
          "They used the wrong sign for the mean difference",
          "They forgot to divide the standard deviation by sqrt(n) to get the standard error",
        ],
        answer: 3,
        explanation: "The standard error of the mean is s/sqrt(n) = 10/5 = 2, so the correct statistic is 5/2 = 2.5. Dividing by s alone ignores the sample size and shrinks the statistic by a factor of five.",
      },
      {
        question: "Why is the degrees of freedom for a one-sample t-test n-1 rather than n?",
        options: [
          "Because one sample is always discarded",
          "Because estimating the mean uses up one degree of freedom from the sample",
          "Because the t distribution has n-1 tails",
          "Because the mean is always zero",
        ],
        answer: 1,
        explanation: "The deviations x_i minus the sample mean must sum to zero, so only n-1 of them are free to vary. Estimating the mean costs one degree of freedom.",
      },
      {
        question: "If t_obs = -2.5 with the same 24 degrees of freedom, what is the two-sided p-value?",
        options: [
          "0.0062",
          "Exactly 1 minus the p-value of 2.5",
          "About 0.0198, the same as for +2.5",
          "About 0.9802, because the statistic is negative",
        ],
        answer: 2,
        explanation: "The t distribution is symmetric about zero, so the two-sided p-value depends only on the absolute value of the statistic. The sign shows the direction of the effect but not the strength of evidence in a two-sided test.",
      },
    ],
  },
  47: {
    derivation: {
      headline: "Why the mean and standard deviation are geometric distance summaries",
      axioms: [
        String.raw`Each observation $x_i$ sits at distance $|x_i - c|$ from a candidate center $c$, and its squared distance is $(x_i - c)^2$.`,
        String.raw`A good single summary $c$ is one that minimizes the total squared distance $SS(c) = \sum_{i=1}^n (x_i - c)^2$.`,
        String.raw`By the definition of the sample mean $\bar{x} = \frac{1}{n}\sum_i x_i$, the deviations from the mean satisfy $\sum_i (x_i - \bar{x}) = 0$.`,
      ],
      steps: [
        {
          title: "Expand around the mean",
          body: String.raw`Write $x_i - c = (x_i - \bar{x}) + (\bar{x} - c)$. Squaring and summing gives $SS(c) = \sum_i (x_i - \bar{x})^2 + 2(\bar{x} - c)\sum_i (x_i - \bar{x}) + n(\bar{x} - c)^2$, because $(\bar{x} - c)$ is the same for every point.`,
        },
        {
          title: "Remove the cross term",
          body: String.raw`By the third axiom the middle term is zero, so $SS(c) = SS(\bar{x}) + n(\bar{x} - c)^2$, where $SS(\bar{x}) = \sum_i (x_i - \bar{x})^2$ is the total squared distance from the mean.`,
        },
        {
          title: "Locate the minimizer",
          body: String.raw`Since $n(\bar{x} - c)^2 \ge 0$ with equality only when $c = \bar{x}$, the total squared distance is smallest at the mean and grows quadratically as $c$ moves away. The mean is the unique minimizer of squared distance, which is not true of the median.`,
        },
        {
          title: "Turn the minimum into a spread measure",
          body: String.raw`The minimum total squared distance is $\sum_i (x_i - \bar{x})^2$. Averaging over $n$ gives the mean squared distance from the center, and taking the square root returns a typical distance in the original units: $\sqrt{\frac{1}{n}\sum_i (x_i - \bar{x})^2}$.`,
        },
        {
          title: "Explain the n-1 divisor for samples",
          body: String.raw`Dividing by $n-1$ instead of $n$ corrects for the fact that $\bar{x}$ was computed from the same data, which makes the sum of squared deviations about the sample mean smaller than the sum about the true mean on average. Only $n-1$ deviations are free because they must sum to zero, so $s^2 = \frac{1}{n-1}\sum_i (x_i - \bar{x})^2$.`,
        },
      ],
      result: String.raw`$$\min_c \sum_{i=1}^n (x_i - c)^2 = \sum_{i=1}^n (x_i - \bar{x})^2, \qquad s = \sqrt{\frac{1}{n-1}\sum_{i=1}^n (x_i - \bar{x})^2}$$`,
      assumptionsBreak: "The squared-distance picture gives every point an influence equal to the square of its distance, so one extreme outlier can dominate the sum and drag both the mean and the standard deviation away from the bulk of the data. In that case a robust summary such as the median, or the median absolute deviation, is a better geometric center and spread.",
    },
    quiz: [
      {
        question: "In the expansion of SS(c), why does the cross term 2(xbar - c) times the sum of (x_i - xbar) vanish?",
        options: [
          "Because the x values are symmetric",
          "Because c is always zero",
          "Because the deviations from the sample mean sum to zero",
          "Because squared distances are always positive",
        ],
        answer: 2,
        explanation: "The sum of deviations from the sample mean is zero by definition of the mean, so the cross term disappears. Symmetry of the data is not required for this to hold.",
      },
      {
        question: "Which center c minimizes the total squared distance sum of (x_i - c)^2?",
        options: [
          "The median, because it is the middle value",
          "The mean",
          "The mode, because it is the most frequent value",
          "The midpoint between the minimum and maximum",
        ],
        answer: 1,
        explanation: "Completing the square shows the minimum is at c = xbar. The median minimizes the sum of absolute distances instead, which is a different criterion.",
      },
      {
        question: "Why is the sample variance divided by n-1 rather than n?",
        options: [
          "Because the data always have one missing value",
          "Because squaring requires one extra observation",
          "Because the mean is always an integer",
          "Because the mean was estimated from the same data, which uses up one degree of freedom and removes a downward bias",
        ],
        answer: 3,
        explanation: "Estimating the mean from the data leaves only n-1 free deviations, and dividing by n would underestimate the spread on average. The divisor n-1 is a correction for estimation, not a property of squaring.",
      },
      {
        question: "For the data x = 2, 4, 6, what is the sample standard deviation?",
        options: [
          "2",
          "4",
          "sqrt(8)",
          "8/3",
        ],
        answer: 0,
        explanation: "The mean is 4, the squared deviations sum to 4 + 0 + 4 = 8, so s^2 = 8/2 = 4 and s = 2. The option sqrt(8) comes from skipping the division, and 8/3 is the population variance rather than the standard deviation.",
      },
      {
        question: "Which property of the squared-distance picture makes the mean and standard deviation vulnerable to a single extreme value?",
        options: [
          "Squared distances are negative for outliers",
          "Outliers are removed automatically before summing",
          "Squaring gives large deviations disproportionately large weight, so one outlier can dominate the total",
          "The sample mean ignores extreme values",
        ],
        answer: 2,
        explanation: "Because the contribution of a point grows with the square of its distance, an outlier can contribute more to the sum than all the other points combined. This is why robust alternatives exist.",
      },
    ],
  },
  48: {
    derivation: {
      headline: "Deriving the loss-minimizing cutoff instead of assuming alpha = 0.05",
      axioms: [
        String.raw`The test statistic $T$ has continuous density $f_0$ under $H_0$ and $f_1$ under $H_1$, and the rule rejects $H_0$ when $T > c$.`,
        String.raw`The expected loss is $L(c) = w_0\,\alpha(c) + w_1\,\beta(c)$, where $\alpha(c) = P(T > c \mid H_0)$ and $\beta(c) = P(T \le c \mid H_1)$, with weights $w_0 = C_{\text{I}} P(H_0)$ and $w_1 = C_{\text{II}} P(H_1)$ combining error costs and prior probabilities.`,
        String.raw`The likelihood ratio $f_1(t)/f_0(t)$ is strictly increasing in $t$, which is the monotone likelihood ratio property.`,
      ],
      steps: [
        {
          title: "Differentiate the Type I error",
          body: String.raw`Since $\alpha(c) = \int_c^\infty f_0(t)\,dt$, the fundamental theorem of calculus gives $\alpha'(c) = -f_0(c)$. Raising the cutoff removes null probability from the rejection region.`,
        },
        {
          title: "Differentiate the Type II error",
          body: String.raw`Since $\beta(c) = \int_{-\infty}^c f_1(t)\,dt$, we have $\beta'(c) = f_1(c)$. Raising the cutoff moves alternative probability into the acceptance region.`,
        },
        {
          title: "Set the loss derivative to zero",
          body: String.raw`Combining the two derivatives, $L'(c) = -w_0 f_0(c) + w_1 f_1(c)$. Setting $L'(c^*) = 0$ gives the optimality condition $\frac{f_1(c^*)}{f_0(c^*)} = \frac{w_0}{w_1}$.`,
        },
        {
          title: "Confirm the stationary point is a minimum",
          body: String.raw`Write $L'(c) = f_0(c)\left[w_1\,\frac{f_1(c)}{f_0(c)} - w_0\right]$. Because the likelihood ratio is increasing, the bracket is negative below the crossing point and positive above it, so $L$ decreases and then increases, and $c^*$ is the unique minimum.`,
        },
        {
          title: "Work out the normal-shift example",
          body: String.raw`If $f_0$ is $N(0,1)$ and $f_1$ is $N(d,1)$ with $d > 0$, then $\frac{f_1(c)}{f_0(c)} = \exp\left(dc - d^2/2\right)$. Solving $\exp(dc - d^2/2) = w_0/w_1$ gives $c^* = \frac{d}{2} + \frac{\ln(w_0/w_1)}{d}$, and the optimal Type I error is $\alpha^* = 1 - \Phi(c^*)$, which is generally not 0.05.`,
        },
      ],
      result: String.raw`$$\frac{f_1(c^*)}{f_0(c^*)} = \frac{w_0}{w_1} \quad \Longrightarrow \quad \alpha^* = P(T > c^* \mid H_0) \text{ depends on the costs and priors}$$`,
      assumptionsBreak: "If the costs and prior probabilities are unknown or arbitrary, the optimal threshold cannot be computed, and alpha = 0.05 becomes a social convention rather than a derived quantity. If the assumed densities are misspecified, the cutoff is optimal only for the wrong model.",
    },
    quiz: [
      {
        question: "Setting the derivative of the expected loss to zero gives which condition on the optimal cutoff c*?",
        options: [
          String.raw`$f_1(c^*)/f_0(c^*) = w_0/w_1$`,
          String.raw`$f_0(c^*) = f_1(c^*)$`,
          String.raw`$P(T > c^* \mid H_0) = 0.05$`,
          String.raw`$c^* = 0$ for all weights`,
        ],
        answer: 0,
        explanation: "The derivative vanishes when the weighted density of the Type I error balances the weighted density of the Type II error, which gives the likelihood-ratio condition. The fixed 0.05 is not part of this derivation.",
      },
      {
        question: "In the normal-shift example, if false positives become much more costly (w_0 much larger than w_1), what happens to the optimal cutoff c*?",
        options: [
          "It falls, so alpha rises",
          "It is unchanged because only the data matter",
          "It equals d/2 regardless of the weights",
          "It rises, so alpha falls",
        ],
        answer: 3,
        explanation: "Since c* = d/2 + ln(w_0/w_1)/d, a larger w_0 raises the cutoff, which lowers the Type I error. Costly false positives therefore call for a stricter threshold.",
      },
      {
        question: "In the normal-shift setting with d = 2 and equal weights, the optimal cutoff is c* = d/2 + ln(1)/d. What is c*?",
        options: [
          "0",
          "1",
          "1.96",
          "2",
        ],
        answer: 1,
        explanation: "With equal weights the logarithm is zero, so c* = d/2 = 1. The resulting alpha is 1 - Phi(1), about 0.16, which shows that the optimal alpha is not 0.05 in general.",
      },
      {
        question: "Which statement best explains why alpha = 0.05 is a convention rather than a theorem?",
        options: [
          "Because the normal distribution has area 0.05 in its tails",
          "Because a valid p-value can never fall below 0.05",
          "Because the optimal alpha depends on the error costs and prior probabilities, which vary by application",
          "Because the Type II error is always fixed at 0.05",
        ],
        answer: 2,
        explanation: "The loss-minimizing threshold depends on the weights w_0 and w_1, which encode costs and priors that differ across fields. A single universal alpha cannot be optimal for all of them.",
      },
      {
        question: "In the loss L(c) = w_0 alpha(c) + w_1 beta(c), what does w_0 represent?",
        options: [
          "The power of the test",
          "The sample size",
          "The cost of a Type I error multiplied by the prior probability that H0 is true",
          "The derivative of the power function",
        ],
        answer: 2,
        explanation: "The weight on the Type I error combines how costly a false positive is with how likely H0 is a priori. This is why the weights, not a fixed alpha, determine the optimal rule.",
      },
    ],
  },
  49: {
    derivation: {
      headline: "Deriving the Welch-Satterthwaite degrees of freedom",
      axioms: [
        String.raw`Two independent samples have sizes $n_1, n_2$, means $\bar{x}_1, \bar{x}_2$, and sample variances $s_1^2, s_2^2$, drawn from normal populations whose variances $\sigma_1^2$ and $\sigma_2^2$ need not be equal.`,
        String.raw`Under normality, $E(s_i^2) = \sigma_i^2$ and $\operatorname{Var}(s_i^2) = \frac{2\sigma_i^4}{n_i - 1}$.`,
        String.raw`A scaled chi-squared variable $c\,\chi^2_\nu$ has mean $c\nu$ and variance $2c^2\nu$, and the Satterthwaite approximation matches the first two moments of a sum of variance estimates to such a variable.`,
      ],
      steps: [
        {
          title: "Find the variance of the difference of means",
          body: String.raw`For independent samples, $\operatorname{Var}(\bar{x}_1 - \bar{x}_2) = \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}$. Replacing $\sigma_i^2$ by $s_i^2$ gives the estimated variance $V = \frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}$ and the Welch statistic $t = (\bar{x}_1 - \bar{x}_2)/\sqrt{V}$.`,
        },
        {
          title: "Compute the mean and variance of V",
          body: String.raw`Let $a_i = \sigma_i^2/n_i$. Then $E(V) = a_1 + a_2$. Since $\operatorname{Var}(s_i^2/n_i) = \frac{2a_i^2}{n_i - 1}$ and the two samples are independent, $\operatorname{Var}(V) = \sum_i \frac{2a_i^2}{n_i - 1}$.`,
        },
        {
          title: "Match moments to a scaled chi-squared",
          body: String.raw`Suppose $V \approx c\,\chi^2_\nu$. Matching means gives $c\nu = a_1 + a_2$, and matching variances gives $2c^2\nu = \operatorname{Var}(V)$. Dividing the variance equation by the square of the mean equation yields $\frac{2}{\nu} = \frac{\operatorname{Var}(V)}{(E V)^2}$, so $\nu = \frac{2(EV)^2}{\operatorname{Var}(V)}$.`,
        },
        {
          title: "Substitute the moments",
          body: String.raw`Plugging in gives $\nu = \frac{2(a_1+a_2)^2}{\sum_i 2a_i^2/(n_i-1)} = \frac{(a_1+a_2)^2}{\sum_i a_i^2/(n_i-1)}$. Replacing $a_i$ by $s_i^2/n_i$ yields the Welch-Satterthwaite formula $\nu = \frac{(s_1^2/n_1 + s_2^2/n_2)^2}{(s_1^2/n_1)^2/(n_1-1) + (s_2^2/n_2)^2/(n_2-1)}$.`,
        },
        {
          title: "Check the equal-variance special case",
          body: String.raw`If $\sigma_1^2 = \sigma_2^2 = \sigma^2$ and $n_1 = n_2 = n$, then $a_i = \sigma^2/n$. The numerator is $(2\sigma^2/n)^2 = 4\sigma^4/n^2$ and the denominator is $2\sigma^4/(n^2(n-1))$, so $\nu = 2(n-1) = n_1 + n_2 - 2$, the pooled Student degrees of freedom.`,
        },
      ],
      result: String.raw`$$\nu = \frac{\left(\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1}+\frac{(s_2^2/n_2)^2}{n_2-1}}$$ which reduces to $n_1 + n_2 - 2$ when both variances and both sample sizes are equal.`,
      assumptionsBreak: "The Satterthwaite fit is an approximation, so with very small samples or strongly non-normal data the t reference distribution is only approximately right. If paired observations are analyzed as independent samples, their covariance is ignored, the variance of the difference is misestimated, and the test typically becomes conservative and loses power.",
    },
    quiz: [
      {
        question: "Why does the Welch degrees of freedom formula reduce to n1 + n2 - 2 when both variances and both sample sizes are equal?",
        options: [
          "Because the formula always gives n1 + n2 - 2 regardless of its inputs",
          "Because the chi-squared distribution has exactly 2 degrees of freedom",
          "Because equal variances and sizes simplify the numerator to 4 sigma^4/n^2 and the denominator to 2 sigma^4/(n^2(n-1)), giving 2(n-1)",
          "Because the sample variances are set equal to 1",
        ],
        answer: 2,
        explanation: "With equal variances and equal sizes, the ratio of the numerator to the denominator simplifies to 2(n-1), which equals n1 + n2 - 2. The formula does depend on its inputs, so it is not a constant.",
      },
      {
        question: "Two independent samples have sizes n1 = 10 and n2 = 20. Which expression is the variance of the difference of sample means under independence?",
        options: [
          String.raw`$\sigma_1^2/n_1 + \sigma_2^2/n_2$`,
          String.raw`$\sigma_1^2/n_1 - \sigma_2^2/n_2$`,
          String.raw`$(\sigma_1^2 + \sigma_2^2)/(n_1 + n_2)$`,
          String.raw`$(\sigma_1^2 + \sigma_2^2)/2$`,
        ],
        answer: 0,
        explanation: "Variances of independent quantities add, and each mean contributes sigma_i^2/n_i, so the difference has variance sigma_1^2/n_1 + sigma_2^2/n_2. The subtraction in the difference does not subtract variances.",
      },
      {
        question: "A before-and-after study measures 10 patients twice. Which degrees of freedom does the paired t-test use?",
        options: [
          "20",
          "19",
          "18",
          "9",
        ],
        answer: 3,
        explanation: "The paired test works on the n = 10 within-patient differences, so it has n - 1 = 9 degrees of freedom. The value 18 would be the pooled independent-samples count, which ignores the pairing.",
      },
      {
        question: "Why does analyzing paired data as two independent samples typically reduce power?",
        options: [
          "Because paired data always have larger means",
          "Because between-subject variability stays in the standard error, whereas differencing paired observations cancels it out",
          "Because independent tests cannot use p-values",
          "Because pairs contain fewer observations than samples",
        ],
        answer: 1,
        explanation: "Differencing within each pair removes the stable baseline differences between people, leaving a smaller variance. Treating the groups as independent keeps that large between-subject variance in the standard error.",
      },
      {
        question: "Group A has n1 = 5 with s1 = 10, and group B has n2 = 50 with s2 = 2. Which test is more defensible?",
        options: [
          "Welch's t-test, because it does not pool the unequal variances",
          "Student's pooled t-test, because it always has more power",
          "A paired t-test, because the groups have different sizes",
          "A one-sample t-test on group B alone",
        ],
        answer: 0,
        explanation: "The variances differ by a factor of 25 and the sample sizes are very unequal, so pooling would give misleading weight to the noisy small group. Welch's test handles this without assuming equal variances.",
      },
    ],
  },
  50: {
    derivation: {
      headline: "Why the two-tailed p-value is exactly twice the one-tailed value",
      axioms: [
        String.raw`Under $H_0$ the test statistic $T$ has a density $f$ that is symmetric about zero, so $f(t) = f(-t)$ for all $t$.`,
        String.raw`For an observed statistic $t_{\text{obs}} > 0$, the two-tailed p-value is $p_2 = P(|T| \ge t_{\text{obs}} \mid H_0)$.`,
        String.raw`The one-tailed p-value in the direction of the observed effect is $p_1 = P(T \ge t_{\text{obs}} \mid H_0)$.`,
      ],
      steps: [
        {
          title: "Use symmetry to match the two tails",
          body: String.raw`For any $a \ge 0$, substitute $t = -u$: $P(T \le -a) = \int_{-\infty}^{-a} f(t)\,dt = \int_a^\infty f(-u)\,du = \int_a^\infty f(u)\,du = P(T \ge a)$. The lower tail beyond $-a$ therefore has exactly the same probability as the upper tail beyond $a$.`,
        },
        {
          title: "Decompose the two-tailed event",
          body: String.raw`For $t_{\text{obs}} > 0$, the event $\{|T| \ge t_{\text{obs}}\}$ equals $\{T \ge t_{\text{obs}}\} \cup \{T \le -t_{\text{obs}}\}$. These two events are disjoint because $-t_{\text{obs}} < t_{\text{obs}}$, so no value of T lies in both.`,
        },
        {
          title: "Add the two disjoint tails",
          body: String.raw`Disjointness gives $p_2 = P(T \ge t_{\text{obs}}) + P(T \le -t_{\text{obs}})$. Applying the symmetry result with $a = t_{\text{obs}}$ to the second term gives $p_2 = p_1 + p_1 = 2p_1$.`,
        },
        {
          title: "Relate the cutoffs to the p-values",
          body: String.raw`At level alpha, the two-tailed test rejects when $|T| \ge t_{1-\alpha/2}$, and the one-tailed test rejects when $T \ge t_{1-\alpha}$. Rejecting the one-tailed test means $p_1 \le \alpha$, which is the same as $p_2 \le 2\alpha$, so the one-tailed test effectively doubles the alpha available in the observed direction.`,
        },
        {
          title: "Check with a numerical example",
          body: String.raw`With $t_{\text{obs}} = 2.10$ and $df = 20$, the upper-tail area is about $0.024$, so $p_1 \approx 0.024$ and $p_2 \approx 0.048$, consistent with $p_2 = 2p_1$.`,
        },
      ],
      result: String.raw`$$p_2 = 2\,p_1 \quad \text{whenever the null density is symmetric about } 0$$`,
      assumptionsBreak: "The doubling rule needs symmetry. For asymmetric null distributions such as the chi-squared or F distributions the two tails differ, so the two-tailed p-value must be computed directly as the total probability of outcomes at least as extreme. Choosing the tail after seeing the data is worse: under a true null, each one-sided test has a 0.05 chance of rejecting, so picking whichever tail looks significant gives a false-positive rate near 0.10.",
    },
    quiz: [
      {
        question: "For a symmetric null and observed t_obs = -2.10, what is the one-sided p-value in the observed (negative) direction?",
        options: [
          "0.024",
          "0.976",
          "0.048",
          "0.012",
        ],
        answer: 0,
        explanation: "By symmetry P(T <= -2.10) equals P(T >= 2.10), which is about 0.024. The value 0.012 comes from halving twice, which is a double-counting error.",
      },
      {
        question: "The rule p_two = 2 p_one requires which property of the null distribution?",
        options: [
          "The statistic must be non-negative",
          "The sample size must exceed 30",
          "The null density must be symmetric about zero",
          "The alpha level must equal 0.05",
        ],
        answer: 2,
        explanation: "Symmetry makes the two tail areas match, which is what allows the two-tailed event to be split into two equal pieces. Sample size and alpha play no role in this identity.",
      },
      {
        question: "With df = 20, the one-sided critical value at alpha = 0.05 is 1.725 and the two-sided critical value is 2.086. If t_obs = 1.90 and the test was pre-registered as upper-tailed, what is the decision?",
        options: [
          "Fail to reject in both tests",
          "Reject the one-tailed test but fail to reject the two-tailed test",
          "Reject in both tests",
          "Fail to reject the one-tailed test but reject the two-tailed test",
        ],
        answer: 1,
        explanation: "The observed 1.90 exceeds the one-sided cutoff of 1.725 but not the two-sided cutoff of 2.086. This is the exact situation in which the choice of tail determines the conclusion.",
      },
      {
        question: "Under H0 with a symmetric null, two one-sided tests at alpha = 0.05 are run and the researcher reports whichever gives p < 0.05. What is the approximate overall false-positive rate?",
        options: [
          "0.025",
          "0.05",
          "0.10",
          "0.20",
        ],
        answer: 2,
        explanation: "The upper-tail and lower-tail rejection events are disjoint, each with probability 0.05 under H0, so the chance of at least one rejection is about 0.10. This is the data-snooping inflation that the directional rule is meant to prevent.",
      },
      {
        question: "If a symmetric test gives a one-tailed p-value of 0.03 in the observed direction, what is the two-tailed p-value?",
        options: [
          "0.015",
          "0.03",
          "0.97",
          "0.06",
        ],
        answer: 3,
        explanation: "For a symmetric null the two-tailed p-value is twice the one-tailed value, so 2 times 0.03 gives 0.06. The value 0.97 is the complement of 0.03 and is not a p-value conversion.",
      },
    ],
  },
};

export default deepContent;
