// Deep first-principles theory and extra knowledge-check questions for module-4
export const deepContent = {
  25: {
    derivation: {
      headline: "Standardized sample mean converges to N(0,1) via characteristic functions",
      axioms: [
        String.raw`$X_1, \dots, X_n$ are independent and identically distributed with common mean $\mu$ and finite variance $\sigma^2 \in (0, \infty)$.`,
        String.raw`Standardized variables $Y_i = (X_i - \mu)/\sigma$ satisfy $\mathbb{E}[Y_i] = 0$ and $\mathbb{E}[Y_i^2] = 1$, directly from the definitions of mean and variance.`,
        String.raw`The characteristic function $\varphi_Y(s) = \mathbb{E}[e^{isY}]$ determines a distribution uniquely, and Levy's continuity theorem says that if $\varphi_{Z_n}(t) \to e^{-t^2/2}$ for every real $t$, then $Z_n \xrightarrow{d} \mathcal{N}(0,1)$.`,
        String.raw`For real $x$, the elementary inequality $\left|e^{ix} - 1 - ix + \tfrac{x^2}{2}\right| \le \min\left(\tfrac{|x|^3}{6}, x^2\right)$ holds.`,
      ],
      steps: [
        {
          title: "Rewrite the standardized mean as a scaled sum",
          body: String.raw`Since $\bar X_n - \mu = \frac{1}{n}\sum_{i=1}^n (X_i - \mu) = \frac{\sigma}{n}\sum_{i=1}^n Y_i$, the standardized mean is $Z_n = \frac{\sqrt{n}(\bar X_n - \mu)}{\sigma} = \frac{1}{\sqrt{n}}\sum_{i=1}^n Y_i$. By independence, $\operatorname{Var}(Z_n) = \frac{1}{n}\sum_{i=1}^n \operatorname{Var}(Y_i) = \frac{1}{n}(n \cdot 1) = 1$ for every finite n, so only the shape of $Z_n$ remains to be determined.`,
        },
        {
          title: "Factor the characteristic function of the sum",
          body: String.raw`Using independence, the expectation of a product of independent factors splits into a product of expectations: $\varphi_{Z_n}(t) = \mathbb{E}\left[\prod_{i=1}^n e^{itY_i/\sqrt{n}}\right] = \prod_{i=1}^n \mathbb{E}\left[e^{itY_i/\sqrt{n}}\right] = \left[\varphi_Y\!\left(\tfrac{t}{\sqrt{n}}\right)\right]^n$. The identical distribution of the $Y_i$ makes all n factors equal, so the whole problem reduces to one variable $Y$ raised to the power n.`,
        },
        {
          title: "Expand the characteristic function near zero",
          body: String.raw`Apply the elementary inequality with $x = sY$. Taking expectations, $\varphi_Y(s) = 1 + is\,\mathbb{E}[Y] - \tfrac{s^2}{2}\mathbb{E}[Y^2] + R(s)$, where $|R(s)| \le \mathbb{E}\left[\min(|s|^3|Y|^3/6,\, s^2Y^2)\right]$. Dividing by $s^2$, the bound tends to 0 as $s \to 0$ by dominated convergence, because $\mathbb{E}[Y^2] < \infty$ dominates the integrand. The linear term vanishes since $\mathbb{E}[Y] = 0$, and the quadratic coefficient is $-\tfrac{1}{2}\mathbb{E}[Y^2] = -\tfrac{1}{2}$, so $\varphi_Y(s) = 1 - \tfrac{s^2}{2} + o(s^2)$.`,
        },
        {
          title: "Take the limit of the n-th power",
          body: String.raw`Set $s = t/\sqrt{n}$, so $s^2 = t^2/n$. The expansion gives $\varphi_Y(t/\sqrt{n}) = 1 - \frac{t^2}{2n} + \varepsilon_n$ with $n\varepsilon_n \to 0$. Hence $\varphi_{Z_n}(t) = \left(1 + \frac{a_n}{n}\right)^n$ where $a_n = -\frac{t^2}{2} + n\varepsilon_n \to -\frac{t^2}{2}$. The standard limit $\left(1 + \frac{a_n}{n}\right)^n \to e^{a}$ whenever $a_n \to a$ gives $\varphi_{Z_n}(t) \to e^{-t^2/2}$ for every real t.`,
        },
        {
          title: "Identify the limit and return to the mean",
          body: String.raw`The function $e^{-t^2/2}$ is exactly the characteristic function of $\mathcal{N}(0,1)$, so Levy's continuity theorem gives $Z_n \xrightarrow{d} \mathcal{N}(0,1)$. Inverting the standardization, $\bar X_n = \mu + \frac{\sigma}{\sqrt{n}} Z_n$, which says that for large n the sample mean is approximately $\mathcal{N}(\mu, \sigma^2/n)$ no matter what shape the population has, provided $\sigma^2$ is finite.`,
        },
      ],
      result: String.raw`$$\frac{\sqrt{n}\,(\bar X_n - \mu)}{\sigma} \xrightarrow{d} \mathcal{N}(0,1) \quad \text{as } n \to \infty$$ Equivalently, $\bar X_n \approx \mathcal{N}(\mu, \sigma^2/n)$ for large n, so the standard error is $\sigma/\sqrt{n}$.`,
      assumptionsBreak: "If the variance is infinite, as for the Cauchy distribution, the second-order expansion does not exist and the sample mean never settles into a normal law: its distribution is again Cauchy for every n. Correlated or non-identically distributed observations break the factorization step, and heavily skewed populations with finite variance converge slowly, so n = 30 can still leave visible skewness in the distribution of the mean.",
    },
    quiz: [
      {
        question: "In the proof, why does the second-order expansion of the characteristic function have no linear term?",
        options: [
          "Because the sample size n is large",
          "Because the characteristic function is always real",
          "Because E[Y] = 0 for the standardized variable, so the linear term vanishes and the quadratic coefficient is -1/2",
          "Because the Cauchy distribution has no mean",
        ],
        answer: 2,
        explanation: "The linear coefficient is i times E[Y], which is zero after standardization, and the quadratic coefficient is minus half of E[Y^2], which equals -1/2 because Var(Y) = 1. A common trap is to think the expansion works without standardizing first.",
      },
      {
        question: "Why is the variance of Z_n equal to exactly 1 for every finite n, if the CLT only describes the limiting shape?",
        options: [
          "Because Z_n is defined by dividing by its own sample standard deviation",
          "Because independence gives Var(sum Y_i / sqrt(n)) = (1/n)(n * 1) = 1 for every n, so only the shape changes with n",
          "Because the CLT forces the variance to equal the mean",
          "Because the population variance is always 1 for any distribution",
        ],
        answer: 1,
        explanation: "Variances of independent terms add, so the sum of n standardized variables has variance n, and dividing by sqrt(n) scales the variance back to 1. The CLT is a statement about the shape of the distribution, not about its variance, which is already matched.",
      },
      {
        question: "A population has mean 100 and standard deviation 20. Using the CLT, what is the approximate probability that the sample mean of n = 400 observations exceeds 102?",
        options: [
          "0.0228",
          "0.1587",
          "0.4772",
          "0.0000317",
        ],
        answer: 0,
        explanation: "The standard error is 20 / sqrt(400) = 1, so z = (102 - 100) / 1 = 2 and P(Z > 2) is about 0.0228. A common trap is using n = 100 by mistake, which gives SE = 2, z = 1 and the wrong answer 0.1587.",
      },
      {
        question: "Why does the theorem need the population variance to be finite, and not just the mean?",
        options: [
          "Because a finite variance is needed only to compute the sample mean, not for the limit",
          "Because the sample mean must have a finite variance to be an unbiased estimator of the mean",
          "Because finite variance guarantees the sample size n is odd",
          "Because the quadratic term in the expansion of the characteristic function requires E[Y^2] to exist; without it the normal limit cannot be derived",
        ],
        answer: 3,
        explanation: "Without a finite second moment there is no quadratic term in the expansion, so the derivation breaks down. Cauchy sample means keep the Cauchy shape for every n, which is why the normal limit fails there.",
      },
      {
        question: "In the proof, which step is the one that uses independence of the observations?",
        options: [
          "Standardizing each X_i to Y_i",
          "Expanding the characteristic function near zero with a Taylor bound",
          "Factoring E[exp(i t sum Y_i / sqrt(n))] into a product of n identical characteristic functions",
          "Taking the limit of (1 + a_n/n)^n",
        ],
        answer: 2,
        explanation: "The characteristic function of a sum factors into a product only when the summands are independent, and that factorization produces the n-th power. Standardization uses only the mean and variance, the Taylor step uses only moments, and the final limit is ordinary calculus.",
      },
    ],
  },
  30: {
    derivation: {
      headline: "Bootstrap standard error of the mean from the plug-in distribution",
      axioms: [
        String.raw`The observations $x_1, \dots, x_n$ are an independent and identically distributed sample from an unknown distribution $F$, and the target is the sampling distribution of $T_n = g(X_1, \dots, X_n)$ under $F$.`,
        String.raw`The empirical distribution $\hat F_n(x) = \frac{1}{n}\sum_{i=1}^n \mathbf{1}\{x_i \le x\}$ puts mass $1/n$ on each observed point and converges uniformly to $F$ (the Glivenko-Cantelli theorem).`,
        String.raw`Drawing from $\hat F_n$ with replacement means each draw $X_i^*$ independently equals $x_j$ with probability $1/n$ for each $j$.`,
        String.raw`The plug-in principle: a property of the sampling distribution under $F$ is approximated by the same property computed under $\hat F_n$.`,
      ],
      steps: [
        {
          title: "Replace the unknown distribution by the known one",
          body: String.raw`The ideal target is the law of $T_n$ when $X_i \sim F$ independently. That law depends on the unknown $F$, so it cannot be computed. The plug-in principle replaces $F$ by $\hat F_n$, which is fully known because it is just the observed data. The problem becomes: what is the law of $T^* = g(X_1^*, \dots, X_n^*)$ when each $X_i^*$ is drawn independently from $\hat F_n$?`,
        },
        {
          title: "Compute the moments of one bootstrap draw",
          body: String.raw`Each draw takes the value $x_j$ with probability $1/n$, so $\mathbb{E}^*[X^*] = \frac{1}{n}\sum_{j=1}^n x_j = \bar x$ and $\operatorname{Var}^*(X^*) = \mathbb{E}^*[(X^* - \bar x)^2] = \frac{1}{n}\sum_{j=1}^n (x_j - \bar x)^2 =: v$. Writing $s^2 = \frac{1}{n-1}\sum_j (x_j - \bar x)^2$ gives $v = \frac{n-1}{n}s^2$, a slightly smaller divisor than the textbook one.`,
        },
        {
          title: "Propagate the variance to the bootstrap mean",
          body: String.raw`The n bootstrap draws are independent with common variance $v$, so $\operatorname{Var}^*(\bar X^*) = \frac{1}{n^2}\cdot n v = \frac{v}{n}$. Taking the square root, $\widehat{\mathrm{SE}}^*(\bar x) = \sqrt{v/n} = \sqrt{\frac{n-1}{n}}\,\frac{s}{\sqrt{n}}$, which agrees with the textbook $s/\sqrt{n}$ up to the factor $\sqrt{(n-1)/n}$.`,
        },
        {
          title: "Approximate the exact distribution by Monte Carlo",
          body: String.raw`There are $n^n$ equally likely ordered resamples, which is about $10^{26}$ already at n = 20, so the exact law of $T^*$ is infeasible to enumerate. Drawing $B$ random resamples gives values $T^{*(1)}, \dots, T^{*(B)}$, and by the law of large numbers $\frac{1}{B}\sum_{b=1}^B \mathbf{1}\{T^{*(b)} \in A\} \to \Pr^*(T^* \in A)$ with Monte Carlo error of order $1/\sqrt{B}$. The sample standard deviation of the $T^{*(b)}$ then estimates the bootstrap standard error.`,
        },
        {
          title: "Check when the plug-in step is valid",
          body: String.raw`Consistency needs $\sup_x |\hat F_n(x) - F(x)| \to 0$ (Glivenko-Cantelli) and a statistic that changes smoothly with the distribution, so that small changes in $\hat F_n$ produce small changes in the law of $T^*$. For the sample mean this holds when the variance is finite, and the bootstrap distribution of $\sqrt{n}(\bar X^* - \bar x)$ then mimics the normal limit from the CLT.`,
        },
      ],
      result: String.raw`$$\widehat{\mathrm{SE}}^*(\bar x) = \sqrt{\frac{1}{n^2}\sum_{i=1}^n (x_i - \bar x)^2} \approx \frac{s}{\sqrt{n}}$$ The bootstrap distribution of $T^*$ approximates the sampling distribution of $T_n$ whenever $\hat F_n$ is a good stand-in for $F$ and $g$ is smooth enough.`,
      assumptionsBreak: String.raw`Small samples or missing tails make $\hat F_n$ a poor stand-in for $F$, so the bootstrap spread is wrong. Non-smooth statistics such as the maximum also fail: a resample contains the observed maximum with probability $1 - (1 - 1/n)^n \to 1 - 1/e \approx 0.632$, so the bootstrap distribution of the max is badly off. Dependent data such as time series break the method as well, because independent resampling destroys the correlation structure.`,
    },
    quiz: [
      {
        question: "For a sample of size n, what is the probability that the single largest observation appears at least once in a bootstrap resample, as n becomes large?",
        options: [
          "1, because the largest value is always included",
          "0.5, because each draw is a coin flip",
          "Approximately 0.632, because missing it in all n draws has probability (1 - 1/n)^n, which tends to 1/e",
          "1/n, because each draw picks it with probability 1/n",
        ],
        answer: 2,
        explanation: "Each draw misses the maximum with probability 1 - 1/n, and over n independent draws the chance of missing it every time is (1 - 1/n)^n, which tends to e^(-1), about 0.368. So the inclusion probability tends to about 0.632. The trap is treating the per-draw probability 1/n as the answer for the whole resample.",
      },
      {
        question: "Starting from the plug-in distribution with variance v = (1/n) sum (x_i - xbar)^2, what is the bootstrap standard error of the sample mean?",
        options: [
          "sqrt(v)",
          "sqrt(v / n)",
          "v / n",
          "sqrt(n v)",
        ],
        answer: 1,
        explanation: "The n bootstrap draws are independent with variance v, so the variance of their mean is v / n, and the standard error is its square root, sqrt(v / n). The trap is reporting sqrt(v), which is the spread of individual values, or v / n, which is a variance rather than a standard error.",
      },
      {
        question: "Why do we approximate the bootstrap distribution with B random resamples instead of enumerating every bootstrap sample?",
        options: [
          "Enumeration would give biased results because duplicates are double-counted",
          "Random resamples are required by the replacement rule, so exact enumeration is not allowed",
          "Bootstrap samples are not equally likely, so the exact distribution cannot be written down",
          "There are n^n equally likely ordered resamples, which grows explosively, so B random draws estimate the same distribution with error of order 1/sqrt(B)",
        ],
        answer: 3,
        explanation: "For n = 20 there are 20^20, about 10^26, ordered resamples, which cannot be enumerated. The average over B random resamples converges to the exact bootstrap probability by the law of large numbers. The trap is believing that a non-exact method cannot be trusted, when the Monte Carlo error is controlled by B.",
      },
      {
        question: "If the observations form a time series with positive autocorrelation, what is the typical effect of applying the naive i.i.d. bootstrap to the sample mean?",
        options: [
          "It understates the variance of the mean because resampling discards the positive correlation",
          "It overstates the variance because resampling adds extra correlation",
          "It has no effect because the bootstrap is immune to dependence",
          "It makes the sample mean undefined",
        ],
        answer: 0,
        explanation: "Positive autocorrelation makes the true variance of the mean larger than sigma^2 / n, but independent resampling treats the draws as uncorrelated and so produces a variance that is too small. Block bootstrap methods are used to fix this.",
      },
      {
        question: "Compare the bootstrap SE of the mean with the textbook estimate s / sqrt(n), where s uses divisor n - 1. Which statement is correct?",
        options: [
          "They are identical for every n",
          "The bootstrap SE is larger by a factor of sqrt(n)",
          "The bootstrap SE is smaller by the factor sqrt((n - 1)/n)",
          "The bootstrap SE is zero because the resamples repeat the data",
        ],
        answer: 2,
        explanation: "The bootstrap uses the plug-in variance v with divisor n, and v = ((n - 1)/n) s^2, so the bootstrap SE equals sqrt((n - 1)/n) times s / sqrt(n). The two differ by a factor that approaches 1 as n grows. The trap is thinking that resampling with replacement gives zero variability, which is the behavior of resampling without replacement and not of the bootstrap.",
      },
    ],
  },
  31: {
    derivation: {
      headline: "Exact permutation p-value validity from exchangeability and ranks",
      axioms: [
        String.raw`Under the null hypothesis $H_0$ the two groups come from one common distribution, so the $N = n_1 + n_2$ pooled observations are exchangeable: reassigning group labels leaves their joint distribution unchanged.`,
        String.raw`The test statistic $T$ is a function of the data and the labels, with large $|T|$ taken as evidence against $H_0$; $V_0$ denotes its value on the observed labelling.`,
        String.raw`The $B$ random relabellings are drawn uniformly and independently from the set of all $\binom{N}{n_1}$ ways to assign labels, and $V_b$ denotes the statistic on relabelling $b$.`,
        String.raw`For exchangeable random variables with no ties, the probability that $V_0$ holds any given rank among $B+1$ values is $1/(B+1)$, because every ordering is equally likely.`,
      ],
      steps: [
        {
          title: "Fix the pooled values and reshuffle the labels",
          body: String.raw`Condition on the pooled set of N values. Under $H_0$ the joint law of the data is invariant to permutations, and the observed labelling is just one of the $\binom{N}{n_1}$ assignments of labels to positions. Given the pooled set, the observed labelling and a uniformly random relabelling therefore have the same distribution, so the statistic has the same law on either one.`,
        },
        {
          title: "Show the simulated values are exchangeable with the observed one",
          body: String.raw`Let $V_0 = T(\text{observed labelling})$ and let $V_1, \dots, V_B$ be the statistic on $B$ independent uniform relabellings. Under $H_0$, $V_0$ and each $V_b$ are identically distributed given the pooled data, and they are mutually independent given that data. So the vector $(V_0, V_1, \dots, V_B)$ is exchangeable: every ordering of its $B+1$ entries is equally likely.`,
        },
        {
          title: "Derive the uniform distribution of the rank",
          body: String.raw`Define the rank $R = 1 + \sum_{b=1}^B \mathbf{1}\{V_b \ge V_0\}$, the number of values at least as large as $V_0$ counting $V_0$ itself. With no ties, exchangeability makes each of the $B+1$ values equally likely to occupy any position in the ordering, so $\Pr(R = k) = \frac{1}{B+1}$ for $k = 1, \dots, B+1$. Ties can only increase R, which makes the test more conservative.`,
        },
        {
          title: "Bound the type I error of the corrected p-value",
          body: String.raw`The corrected p-value is $\hat p = \frac{1 + \sum_{b=1}^B \mathbf{1}\{V_b \ge V_0\}}{B+1} = \frac{R}{B+1}$. Therefore $\Pr_{H_0}(\hat p \le \alpha) = \Pr(R \le \alpha(B+1)) = \frac{\lfloor \alpha(B+1) \rfloor}{B+1} \le \alpha$, so rejecting whenever $\hat p \le \alpha$ has type I error at most $\alpha$ for every N and every B.`,
        },
        {
          title: "Explain why the +1 correction is needed",
          body: String.raw`The naive estimate $p' = \frac{1}{B}\sum_{b=1}^B \mathbf{1}\{V_b \ge V_0\}$ ignores $V_0$ and equals exactly 0 whenever $V_0$ exceeds all B simulated values. For B = 10 that event has probability $1/11 \approx 0.091$, which is larger than $\alpha = 0.05$, so the naive version would reject too often. The corrected $\hat p$ can never be smaller than $1/(B+1)$, which removes this problem.`,
        },
      ],
      result: String.raw`$$\Pr_{H_0}\!\left(\hat p \le \alpha\right) \le \alpha \quad \text{for all } \alpha \in (0,1)$$ The permutation p-value is exactly valid under exchangeability. The mean-shifted bootstrap version only approximates this, because centring the groups matches the null in the mean but not in the rest of each distribution.`,
      assumptionsBreak: "If the groups differ in spread or shape, the exchangeability null is false even when the means match, so a permutation test can reject because of variance differences alone. Paired or clustered designs also break exchangeability unless the relabellings are restricted to respect the pairing or cluster structure.",
    },
    quiz: [
      {
        question: "Why does the exact permutation test require the stronger null that both groups share one distribution, rather than only equal means?",
        options: [
          "Because permutation tests only work when the two groups have equal sizes",
          "Because the permuted statistics must sum to the observed statistic",
          "Because exchangeability requires a common distribution; if the group variances differ, relabelling can produce rejections even when the means are equal",
          "Because the p-value must be computed from a normal table",
        ],
        answer: 2,
        explanation: "The reference distribution is built by shuffling labels, which is valid only if the labels are interchangeable under the null. Equal means alone do not make the labels interchangeable, so the test can reject for reasons other than the mean. The trap is thinking that matching means is enough.",
      },
      {
        question: "If the observed statistic is larger than all 999 simulated permutation statistics, what permutation p-value is reported with B = 999?",
        options: [
          "0",
          "0.999",
          "1/999, about 0.001001",
          "1/1000 = 0.001",
        ],
        answer: 3,
        explanation: "The corrected p-value is (1 + 0) / (999 + 1) = 1/1000 = 0.001, because the observed labelling is counted as one of the 1000 configurations. The trap is dividing by B alone to get 1/999, or reporting 0, which the corrected formula rules out.",
      },
      {
        question: "Under the exchangeable null, why is the observed statistic equally likely to occupy each rank among the B + 1 values?",
        options: [
          "Because the observed labelling and the random relabellings are interchangeable draws from the same law, so no position in the ordering is special",
          "Because the observed statistic is always the median of the reference distribution",
          "Because the simulated statistics are centred at zero by construction",
          "Because the sample size N is chosen so that all ranks are equal",
        ],
        answer: 0,
        explanation: "Under the null the observed labelling is just one more random labelling, so any ordering of the B + 1 values has the same probability and each rank is equally likely. This uniform rank is what gives exact control of the type I error. The trap is expecting the observed value to sit near the middle of the reference distribution.",
      },
      {
        question: "With B = 19 random relabellings, what is the smallest p-value this method can report?",
        options: [
          "0",
          "1/20 = 0.05",
          "1/19, about 0.0526",
          "0.001",
        ],
        answer: 1,
        explanation: "The corrected p-value is at least 1/(B + 1) = 1/20 = 0.05. With only 19 relabellings a test at alpha = 0.05 can reject only when the observed statistic is the largest of all 20 values. The trap is believing that p = 0 is attainable, or that a small p-value is available for any choice of B.",
      },
      {
        question: "Why is the mean-shifted bootstrap test generally less exact than the permutation test?",
        options: [
          "Because bootstrapping always uses fewer resamples",
          "Because bootstrap samples are drawn without replacement",
          "Because the bootstrap cannot be used when the data are continuous",
          "Because shifting the means only imposes the null on the first moment, so the bootstrap reference distribution matches the true null only approximately, typically for large samples",
        ],
        answer: 3,
        explanation: "The permutation argument is exact for finite samples under exchangeability, while the shifted bootstrap only matches the null distribution of the statistic asymptotically. The trap is assuming that resampling more often makes a test more exact.",
      },
    ],
  },
  35: {
    derivation: {
      headline: "Pivotal t-statistic gives an exact confidence interval for a normal mean",
      axioms: [
        String.raw`$X_1, \dots, X_n$ are independent and identically distributed as $\mathcal{N}(\mu, \sigma^2)$, with $\mu$ and $\sigma^2$ unknown fixed constants, and $\bar X = \frac{1}{n}\sum_i X_i$, $S^2 = \frac{1}{n-1}\sum_i (X_i - \bar X)^2$.`,
        String.raw`Standard normal sampling theory: $\bar X \sim \mathcal{N}(\mu, \sigma^2/n)$, $\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}$, and $\bar X$ and $S^2$ are statistically independent.`,
        String.raw`Definition of Student's t: if $Z \sim \mathcal{N}(0,1)$ and $V \sim \chi^2_\nu$ are independent, then $T = Z/\sqrt{V/\nu} \sim t_\nu$.`,
        String.raw`For confidence level $1 - \alpha$, the critical value $t^*$ satisfies $\Pr(-t^* \le T \le t^*) = 1 - \alpha$ when $T \sim t_{n-1}$.`,
      ],
      steps: [
        {
          title: "Standardize the mean with the true scale",
          body: String.raw`From $\bar X \sim \mathcal{N}(\mu, \sigma^2/n)$, the variable $Z = \frac{\sqrt{n}(\bar X - \mu)}{\sigma}$ is $\mathcal{N}(0,1)$. This is a valid pivot because its law does not depend on $\mu$, but it depends on the unknown $\sigma$, so it cannot be used to build an interval.`,
        },
        {
          title: "Replace sigma by its estimate to get a pivot free of unknowns",
          body: String.raw`Let $V = \frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}$. Then $\frac{Z}{\sqrt{V/(n-1)}} = \frac{\sqrt{n}(\bar X - \mu)/\sigma}{S/\sigma} = \frac{\sqrt{n}(\bar X - \mu)}{S} =: T$, in which the unknown $\sigma$ cancels. Since Z and V are independent, the definition of Student's t gives $T \sim t_{n-1}$, a law containing neither $\mu$ nor $\sigma$.`,
        },
        {
          title: "Choose the critical value from the known law of the pivot",
          body: String.raw`Because $T$ has a known distribution, choose $t^*$ with $\Pr(-t^* \le T \le t^*) = 1 - \alpha$, that is $t^* = t_{1-\alpha/2,\, n-1}$. This probability statement concerns the random quantities $\bar X$ and $S$, while $\mu$ is treated as a fixed number that is not random at all.`,
        },
        {
          title: "Rearrange the inequality into an interval for mu",
          body: String.raw`Let $a = S/\sqrt{n} > 0$. Multiplying $-t^* \le (\bar X - \mu)/a \le t^*$ by $a$ and rearranging gives $\bar X - t^* a \le \mu \le \bar X + t^* a$. Therefore $\Pr\!\left(\bar X - t^*\tfrac{S}{\sqrt{n}} \le \mu \le \bar X + t^*\tfrac{S}{\sqrt{n}}\right) = 1 - \alpha$ exactly, for every $n \ge 2$, every $\mu$, and every $\sigma$.`,
        },
        {
          title: "Interpret the realized interval and connect to the CLT",
          body: String.raw`With data, the interval is $\bar x \pm t^* s/\sqrt{n}$. For a single data set it either contains $\mu$ or it does not, so the probability $1 - \alpha$ belongs to the procedure: over repeated samples, a $(1-\alpha)$ fraction of the intervals cover the fixed $\mu$. As $n$ grows, $t^*_{1-\alpha/2, n-1} \to z_{1-\alpha/2}$, which is why the CLT justifies the same formula approximately for non-normal data.`,
        },
      ],
      result: String.raw`$$\bar x \pm t^*_{1-\alpha/2,\, n-1}\,\frac{s}{\sqrt{n}}$$ Under normality this interval covers the fixed $\mu$ in exactly a $1-\alpha$ fraction of repeated samples, and it is approximately valid for large n under the CLT.`,
      assumptionsBreak: "If the population is far from normal and n is small, the pivot T no longer follows t with n-1 degrees of freedom, so the nominal 95% coverage can be noticeably lower, especially for skewed or heavy-tailed data. If observations are correlated, S/sqrt(n) underestimates the true standard error, so the interval is too narrow even when the marginal distribution is normal.",
    },
    quiz: [
      {
        question: "Why does the t-pivot T = (xbar - mu) / (s / sqrt(n)) have a distribution that does not depend on mu or sigma?",
        options: [
          "Because s is an unbiased estimator of sigma, so it can be replaced without changing the law",
          "Because the t distribution is symmetric about the sample mean for every sample",
          "Because the unknown sigma cancels between the standardized mean and the estimated scale, leaving a t distribution with n - 1 degrees of freedom",
          "Because the Central Limit Theorem makes T exactly normal for any n",
        ],
        answer: 2,
        explanation: "Dividing the standardized mean by S / sigma removes sigma, and the remaining ratio of a standard normal to an independent scaled chi-square has a t(n-1) law. The trap is believing that the CLT makes T exactly normal for small n, when the random denominator produces a heavier-tailed t law.",
      },
      {
        question: "Why is the critical value taken from a t distribution with n - 1 degrees of freedom rather than the standard normal when sigma is replaced by s?",
        options: [
          "Because s is itself random, the denominator adds variability; the ratio follows t(n-1), which has heavier tails than N(0,1) for small n",
          "Because the sample size n is always an even number",
          "Because the t distribution always has a smaller variance than the normal",
          "Because the sample mean is biased for mu",
        ],
        answer: 0,
        explanation: "The estimated scale S fluctuates from sample to sample, which widens the distribution of the ratio. For n = 10 the 97.5th percentile of t(9) is 2.262, larger than 1.96, and the gap shrinks as n grows. The trap is treating S as if it were the true sigma.",
      },
      {
        question: "A sample of n = 10 has mean 20 and s = 4. Using t* = 2.262 for 95% confidence, what is the margin of error?",
        options: [
          "1.26",
          "2.86",
          "2.26",
          "9.05",
        ],
        answer: 1,
        explanation: "The margin of error is t* s / sqrt(n) = 2.262 x 4 / sqrt(10), which is about 2.262 x 1.265 = 2.86, giving an interval of roughly [17.14, 22.86]. The trap is 1.26, which omits t*, or 9.05, which forgets to divide by sqrt(n).",
      },
      {
        question: "If the population is strongly skewed and n is very small, what happens to the actual coverage of a nominal 95% t-interval?",
        options: [
          "Coverage rises to 100% because skewness widens the intervals",
          "Coverage stays exactly 95% because the t formula is distribution-free",
          "Coverage can fall below 95% because the pivot is no longer exactly t with n - 1 degrees of freedom",
          "The interval becomes undefined because the sample mean is not normal",
        ],
        answer: 2,
        explanation: "The exact 1 - alpha coverage depends on the pivot following a t(n-1) law, which requires normal data. Without normality the coverage is only approximate and can fall short of the nominal level. The trap is assuming the t-formula guarantees coverage for any population.",
      },
      {
        question: "Why does the critical value t*(0.975, n - 1) approach 1.96 as the sample size grows?",
        options: [
          "Because the sample mean converges to mu, so no critical value is needed",
          "Because the t distribution is defined to have 1.96 degrees of freedom in the limit",
          "Because the confidence interval width tends to zero, which makes the normal approximation exact",
          "Because S / sigma converges to 1, so T approaches a standard normal whose 97.5th percentile is 1.96",
        ],
        answer: 3,
        explanation: "As the degrees of freedom grow, the chi-square denominator concentrates at its mean, S / sigma tends to 1, and T approaches N(0,1). The critical value depends on the shape of the pivot's law, not on how wide the interval is. The trap is thinking that shrinking width is the reason the critical value changes.",
      },
    ],
  },
};

export default deepContent;
