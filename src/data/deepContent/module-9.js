// Deep first-principles theory and extra knowledge-check questions for module-9
export const deepContent = {
  54: {
    derivation: {
      headline: "Same formula, two roles: a density in x versus a function of theta",
      axioms: [
        String.raw`For each fixed parameter $\theta$, the function $x \mapsto f(x \mid \theta)$ is a probability density: $f(x \mid \theta) \ge 0$ and $\int f(x \mid \theta)\,dx = 1$.`,
        String.raw`Probabilities of intervals are areas under the density: $P(a \le X \le b \mid \theta) = \int_a^b f(x \mid \theta)\,dx$.`,
        String.raw`For a fixed observed value $x_0$, the likelihood is defined as the same expression read as a function of the parameter: $L(\theta \mid x_0) = f(x_0 \mid \theta)$.`,
      ],
      steps: [
        {
          title: "Fix theta and vary the data",
          body: String.raw`With $\theta$ held fixed, the density $f(\cdot \mid \theta)$ spreads a total mass of 1 across the data axis. Any interval $[a,b]$ receives the mass $\int_a^b f(x \mid \theta)\,dx$, so this is a genuine probability: it is an area, it lies between 0 and 1, and the areas over the whole axis add up to $\int f(x \mid \theta)\,dx = 1$.`,
        },
        {
          title: "Fix the data and vary theta",
          body: String.raw`Now freeze the observed value $x_0$ and let $\theta$ move. The expression $f(x_0 \mid \theta)$ is still a number for each $\theta$, but it is no longer a mass assigned to outcomes. Defining $L(\theta \mid x_0) = f(x_0 \mid \theta)$ as a function of $\theta$ gives the height of the density curve at the single point $x_0$, and each candidate curve (each value of $\theta$) gives a different height.`,
        },
        {
          title: "Compare the two objects",
          body: String.raw`Because $L$ is a height read across parameters, its integral over the parameter space has no reason to equal 1. For Bernoulli data with $x_0 = 1$, $f(1 \mid p) = p$, so $L(p \mid 1) = p$ on $p \in [0,1]$, and $\int_0^1 p\,dp = \frac{1}{2}$, not 1. The normalization that makes $f$ a density in $x$ simply is not present in $L$ as a function of $\theta$.`,
        },
        {
          title: "Ratios carry the information",
          body: String.raw`Only comparisons across $\theta$ matter, so the absolute height is not meaningful but the ratio is. For a Normal model with $x_0 = 32$: $f(32 \mid \mu = 32, \sigma = 2) = \frac{1}{2\sqrt{2\pi}} \approx 0.1995$ and $f(32 \mid \mu = 25, \sigma = 2) = \frac{1}{2\sqrt{2\pi}} e^{-49/8} \approx 0.000436$, so the ratio is about 457. Multiplying the whole likelihood by any positive constant that does not depend on $\theta$ leaves every ratio unchanged.`,
        },
      ],
      result: String.raw`Probability integrates over outcomes with $\theta$ fixed: $\int f(x \mid \theta)\,dx = 1$. Likelihood is a function of $\theta$ with $x_0$ fixed, so $\int L(\theta \mid x_0)\,d\theta$ is generally not 1, and only ratios $L(\theta_1 \mid x_0) / L(\theta_2 \mid x_0)$ carry comparative meaning.`,
      assumptionsBreak: "The reading of likelihood as relative plausibility of parameters breaks when someone rescales it to integrate to 1 over theta and reads the result as the probability that theta lies in a region. That step needs a prior distribution for theta, which the likelihood alone does not supply, so the resulting numbers depend on the arbitrary range chosen for theta.",
    },
    quiz: [
      {
        question: String.raw`Let $X$ be Bernoulli with success probability $p$, and observe $X = 1$, so $L(p \mid 1) = f(1 \mid p)$. Which statement about this likelihood is correct?`,
        options: [
          "It integrates to 1 over p in [0,1], so it is a probability distribution for p",
          "It equals p and integrates to 1/2 over p in [0,1], so it is not a density in p, though ratios such as L(0.8 | 1) / L(0.2 | 1) = 4 are meaningful",
          "It equals 1 - p and is maximized at p = 0.5",
          "It equals p and is maximized at p = 0.5 because the Bernoulli is symmetric",
        ],
        answer: 1,
        explanation: String.raw`Here $f(1 \mid p) = p$, so $\int_0^1 p\,dp = \frac{1}{2}$. The likelihood is not a density in $p$, but the ratio $L(0.8 \mid 1)/L(0.2 \mid 1) = 4$ is meaningful. The trap is expecting every likelihood to integrate to 1.`,
      },
      {
        question: String.raw`A single observation $x = 2$ comes from $\mathcal{N}(\mu, 1)$. How many times more likely is the data under $\mu = 2$ than under $\mu = 0$?`,
        options: [
          "2 times",
          "4 times",
          "$e^{2}$, about 7.39 times",
          "$e^{-2}$, about 0.14 times",
        ],
        answer: 2,
        explanation: String.raw`The likelihood is proportional to $e^{-(x-\mu)^2/2}$, so $L(2)/L(0) = e^{0}/e^{-2} = e^{2} \approx 7.39$. The answer comes from exponentiating the difference in half-squared distances, not from the squared distance itself or from the inverse ratio.`,
      },
      {
        question: "A student reads a fitted model and says: 'The likelihood of theta = 0 is 0.3, so there is a 30% chance that theta equals 0.' What is the most accurate critique?",
        options: [
          "A likelihood is a relative measure of how well each parameter value explains fixed data; 0.3 is a density value, not a probability, and it cannot be read as a 30% chance about theta",
          "The student is correct, because likelihoods always lie between 0 and 1 and so are probabilities",
          "The error is that likelihoods must be exactly 0 for every parameter except the MLE",
          "The student should have reported the cumulative distribution instead, which is the probability of theta",
        ],
        answer: 0,
        explanation: String.raw`In the frequentist view theta is fixed, and likelihood values are only compared through ratios. Density heights can even exceed 1, so the 0-to-1 reading is wrong on two counts.`,
      },
      {
        question: String.raw`For a continuous density $f(x \mid \theta)$, consider $P(x_0 - h \le X \le x_0 + h \mid \theta)$ for a small $h > 0$. How does this quantity relate to $L(\theta \mid x_0)$?`,
        options: [
          String.raw`It is approximately $2h\,L(\theta \mid x_0)$; the factor $2h$ is the same for every $\theta$, so ratios of window probabilities equal likelihood ratios`,
          String.raw`It is exactly $L(\theta \mid x_0)$ for every $h$, so the window probability is the likelihood`,
          String.raw`It is zero for every $\theta$, because a single point has zero probability`,
          String.raw`It is approximately $2h\,L(\theta \mid x_0)^2$, so the ratios of window probabilities are the squares of the likelihood ratios`,
        ],
        answer: 0,
        explanation: String.raw`For small $h$, $\int_{x_0-h}^{x_0+h} f(x \mid \theta)\,dx \approx 2h\,f(x_0 \mid \theta)$ because the density is nearly constant over the window. The factor $2h$ does not depend on $\theta$, so it cancels when comparing parameter values.`,
      },
      {
        question: String.raw`In a Binomial model with $n = 5$ trials, $k = 3$ successes are observed, so $L(p \mid k = 3) = 10\,p^3(1-p)^2$ for $p \in [0,1]$. Which statement is true?`,
        options: [
          "Its maximum is at p = 0.5, because the binomial distribution is symmetric about one half",
          "Its integral over p from 0 to 1 equals 1, because binomial probabilities sum to 1",
          "It is a valid probability distribution over p, so P(p <= 0.5 | k = 3) = 1/2",
          "Its maximum is at p = 0.6, but its integral over p from 0 to 1 is 1/6, not 1",
        ],
        answer: 3,
        explanation: String.raw`Binomial probabilities sum to 1 over $k$ for fixed $p$, not over $p$ for fixed $k$. Setting $\frac{d}{dp}\ln L = \frac{3}{p} - \frac{2}{1-p}$ to zero gives $p = \frac{3}{5}$, while $\int_0^1 10\,p^3(1-p)^2\,dp = 10 \cdot \frac{1}{60} = \frac{1}{6}$.`,
      },
    ],
  },
  55: {
    derivation: {
      headline: "Log-likelihood turns a product into a sum with the same argmax",
      axioms: [
        String.raw`The observations $x_1, \dots, x_n$ are independent and identically distributed with density $f(x \mid \theta)$, so the joint density of the sample is the product $\prod_{i=1}^n f(x_i \mid \theta)$.`,
        String.raw`The likelihood is the joint density read as a function of $\theta$ with the data fixed: $L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$.`,
        String.raw`The natural logarithm is strictly increasing on $(0,\infty)$, so for positive numbers $a$ and $b$, $a > b$ holds if and only if $\ln a > \ln b$.`,
        String.raw`The MLE is a maximizer, $\hat{\theta} = \arg\max_\theta L(\theta)$, and $f(x_i \mid \theta)$ is differentiable in $\theta$ with the maximum at an interior point of the parameter space.`,
      ],
      steps: [
        {
          title: "Factorize the joint density",
          body: String.raw`Independence means the joint density of $(x_1,\dots,x_n)$ is the product of the marginal densities. Fixing the data and varying $\theta$ gives $L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$. Each factor is a density height at $x_i$, and the product is a single function of $\theta$ that we want to maximize.`,
        },
        {
          title: "Take the logarithm",
          body: String.raw`Let $\ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln f(x_i \mid \theta)$, using $\ln\left(\prod a_i\right) = \sum \ln a_i$. If $\theta_1$ gives a larger $L$ than $\theta_2$, then $\ln L(\theta_1) > \ln L(\theta_2)$ because ln is strictly increasing. The maximizers of $L$ and $\ell$ are therefore identical, while $\ell$ is a sum that is far easier to differentiate.`,
        },
        {
          title: "Set the score to zero",
          body: String.raw`At an interior maximum of a differentiable function the derivative vanishes, so $\hat{\theta}$ satisfies the score equation $S(\hat{\theta}) = \ell'(\hat{\theta}) = \sum_{i=1}^n \frac{\partial}{\partial \theta}\ln f(x_i \mid \hat{\theta}) = 0$. The score is a sum of one contribution per data point, and the root of that sum is the estimate.`,
        },
        {
          title: "Check the Normal case with known sigma",
          body: String.raw`Take $f(x \mid \mu) = \frac{1}{\sqrt{2\pi}} e^{-(x-\mu)^2/2}$. Then $\ell(\mu) = -\frac{n}{2}\ln(2\pi) - \frac{1}{2}\sum_{i=1}^n (x_i-\mu)^2$, so $\ell'(\mu) = \sum_{i=1}^n (x_i - \mu)$, and setting this to zero gives $\hat{\mu} = \bar{x}$. For the data 10, 11, 12, the sum of squared residuals is 2 at $\mu = 11$ and 50 at $\mu = 15$, so $\ell$ is larger at $\mu = 11$.`,
        },
        {
          title: "Check curvature and numerical stability",
          body: String.raw`The second derivative is $\ell''(\mu) = -n < 0$ for every $\mu$, so the log-likelihood is strictly concave and its stationary point is the unique global maximum. The logarithm also matters numerically: 1000 densities each equal to 0.05 multiply to about $10^{-1301}$, far below the smallest positive double, so the raw product becomes 0, while the log-likelihood stays the finite sum $1000 \ln 0.05 \approx -2996$.`,
        },
      ],
      result: String.raw`The MLE is $\hat{\theta} = \arg\max_\theta \sum_{i=1}^n \ln f(x_i \mid \theta)$, equivalently the root of the score equation $\sum_{i=1}^n \frac{\partial}{\partial \theta}\ln f(x_i \mid \theta) = 0$ whenever that root is an interior maximum. The log changes the computation but not the answer.`,
      assumptionsBreak: String.raw`The score equation can mislead when the maximum sits on the boundary of the parameter space, as with Uniform(0, theta), where the likelihood is largest at $\hat{\theta} = \max x_i$ and no derivative vanishes there. Mixture models can have an unbounded likelihood or several local maxima, so the root found by calculus may not be the global peak.`,
    },
    quiz: [
      {
        question: String.raw`Observations $x = (2, 5, 3)$ come from Uniform$(0, \theta)$, whose density is $1/\theta$ on $0 \le x \le \theta$. What is the MLE of $\theta$?`,
        options: [
          String.raw`$\hat{\theta} = \bar{x} = 10/3$, found by setting the score to zero`,
          String.raw`$\hat{\theta} = 5$, the largest observation: $L(\theta) = \theta^{-3}$ for $\theta \ge 5$ is largest at the smallest allowed $\theta$, and no derivative vanishes`,
          String.raw`$\hat{\theta} = 3$, the median, since the likelihood is symmetric`,
          String.raw`$\hat{\theta} = 0$, because the log-likelihood has no maximum`,
        ],
        answer: 1,
        explanation: String.raw`The likelihood is $\theta^{-3}$ for $\theta \ge 5$ and zero otherwise. It is decreasing on its support, so the maximum sits at the boundary $\theta = 5$. The trap is setting the derivative to zero, which gives $-3/\theta = 0$ with no solution.`,
      },
      {
        question: String.raw`For the exponential log-likelihood $\ell(\lambda) = n\ln\lambda - \lambda\sum x_i$, the second derivative is $-n/\lambda^2$. Why does this show that the stationary point $\hat{\lambda} = n/\sum x_i$ is a maximum?`,
        options: [
          String.raw`Because the second derivative is positive, so the curve is convex and opens upward`,
          String.raw`Because the first derivative is nonzero at the stationary point, which means the curve is flat there`,
          String.raw`Because $n/\lambda^2$ is the sample variance, which must be positive`,
          String.raw`Because $-n/\lambda^2 < 0$ for every $\lambda > 0$, so $\ell$ is strictly concave and the stationary point is the unique global maximum`,
        ],
        answer: 3,
        explanation: String.raw`A negative second derivative everywhere means $\ell$ is strictly concave, so any stationary point is a global maximum, and there is only one. The trap is reading a positive second derivative as a maximum, which is the sign of a minimum.`,
      },
      {
        question: String.raw`Suppose you multiply the likelihood by a constant $c > 0$ that does not depend on $\theta$, for example to change units. What happens to the MLE?`,
        options: [
          String.raw`It does not change, because $\ln(cL) = \ln c + \ln L$, so the constant shifts the log-likelihood without moving its maximum`,
          String.raw`It is multiplied by $c$, because the likelihood scales linearly`,
          String.raw`It changes only if $c$ is greater than 1`,
          String.raw`It becomes undefined, because the log of a constant is not allowed`,
        ],
        answer: 0,
        explanation: String.raw`Since $\ln(cL(\theta)) = \ln c + \ln L(\theta)$, the constant adds the same offset at every $\theta$, so the argmax is unchanged. Only the value of the maximum changes. The trap is confusing the height of the likelihood with its location.`,
      },
      {
        question: "A computer evaluates the likelihood of 800 independent observations by multiplying their densities directly, and the result is 0.0 in double precision. Which statement correctly diagnoses the problem and the fix?",
        options: [
          "The MLE is wrong, so the observations must be re-centered to mean zero before multiplying",
          "The true likelihood is negative, so take absolute values before comparing candidate parameters",
          "The product underflowed below the smallest representable positive double, so candidates cannot be compared; sum the logs of the densities instead",
          "The result overflowed to infinity, so divide each density by n before multiplying",
        ],
        answer: 2,
        explanation: String.raw`A product of many numbers below 1 shrinks exponentially. Summing $\ln f(x_i \mid \theta)$ keeps every quantity in a representable range, and the argmax is unchanged because the logarithm is strictly increasing.`,
      },
      {
        question: String.raw`Two candidate parameter values have nearly identical likelihood curves near the peak, meaning the curvature $-\ell''(\hat{\theta})$ is small. What does this imply about the MLE?`,
        options: [
          "The MLE is very precise, because a flat peak identifies the maximum clearly",
          "Many nearby parameter values are almost equally supported by the data, so the MLE is imprecise and its variance is large",
          "The MLE is biased upward by a factor of 2",
          "The MLE does not exist, because the maximum is not unique",
        ],
        answer: 1,
        explanation: String.raw`The asymptotic variance of the MLE is roughly $-1/\ell''(\hat{\theta})$, so small curvature means large variance. A flat peak can still have a unique maximum; the trap is confusing a clearly located maximum with a precise estimate.`,
      },
    ],
  },
  56: {
    derivation: {
      headline: "Rate MLE: differentiate n ln(lambda) minus lambda S and solve",
      axioms: [
        String.raw`The waiting times $X_1,\dots,X_n$ are independent and identically distributed as $\text{Exp}(\lambda)$, with density $f(x \mid \lambda) = \lambda e^{-\lambda x}$ for $x \ge 0$ and rate $\lambda > 0$.`,
        String.raw`The sum $S = \sum_{i=1}^n x_i$ is positive, and the sample mean is $\bar{x} = S/n$.`,
        String.raw`Because the logarithm is strictly increasing, maximizing $\ell(\lambda) = \sum_{i=1}^n \ln f(x_i \mid \lambda)$ over $\lambda > 0$ gives the same MLE as maximizing $L(\lambda) = \prod_{i=1}^n f(x_i \mid \lambda)$.`,
      ],
      steps: [
        {
          title: "Form the likelihood",
          body: String.raw`By independence, $L(\lambda) = \prod_{i=1}^n \lambda e^{-\lambda x_i}$. Pulling out the $n$ factors of $\lambda$ and combining the exponentials with $\prod e^{a_i} = e^{\sum a_i}$ gives $L(\lambda) = \lambda^n \exp\left(-\lambda \sum_{i=1}^n x_i\right) = \lambda^n e^{-\lambda S}$. The data reach the likelihood only through the sum $S$.`,
        },
        {
          title: "Take the log",
          body: String.raw`Applying $\ln$ turns the product into a sum: $\ell(\lambda) = n\ln\lambda - \lambda S$, because $\ln(\lambda^n) = n\ln\lambda$ and $\ln(e^{-\lambda S}) = -\lambda S$. Since the logarithm is strictly increasing, maximizing $\ell$ gives the same $\hat{\lambda}$ as maximizing $L$.`,
        },
        {
          title: "Differentiate and set to zero",
          body: String.raw`The derivative is $\ell'(\lambda) = \frac{n}{\lambda} - S$. At the maximum $\ell'(\hat{\lambda}) = 0$, so $\frac{n}{\hat{\lambda}} = S$, which rearranges to $\hat{\lambda} = \frac{n}{S} = \frac{1}{\bar{x}}$. Units check: if the times are in minutes, the rate is events per minute, which is exactly what $1/\bar{x}$ gives.`,
        },
        {
          title: "Confirm it is a maximum",
          body: String.raw`The second derivative is $\ell''(\lambda) = -\frac{n}{\lambda^2}$, which is negative for every $\lambda > 0$. So $\ell$ is strictly concave, the stationary point is the unique global maximum, and $\hat{\lambda}$ is not merely a critical point. As a consistency check, $\ell(\lambda) \to -\infty$ both as $\lambda \to 0^+$ (through $n\ln\lambda$) and as $\lambda \to \infty$ (through $-\lambda S$).`,
        },
        {
          title: "Relate the answer to the mean",
          body: String.raw`The population mean of an exponential is $E[X] = \int_0^\infty x\,\lambda e^{-\lambda x}\,dx$. Integrating by parts with $u = x$ and $dv = \lambda e^{-\lambda x}\,dx$ gives $E[X] = \left[-x e^{-\lambda x}\right]_0^\infty + \int_0^\infty e^{-\lambda x}\,dx = \frac{1}{\lambda}$, since the boundary term vanishes. Setting $E[X] = \bar{x}$ gives $\lambda = 1/\bar{x}$, the same answer as the MLE.`,
        },
      ],
      result: String.raw`The MLE of the rate is $\hat{\lambda} = \frac{n}{\sum x_i} = \frac{1}{\bar{x}}$, so the estimated rate is the reciprocal of the sample mean. At the maximum, $\ell(\hat{\lambda}) = n\ln(n/S) - n$.`,
      assumptionsBreak: String.raw`The formula assumes every observation is a complete, independent waiting time from one exponential law. If the rate drifts over time, the pooled $1/\bar{x}$ blends different rates into one number that can match none of them. Censored data, such as bulbs still working when a test stops, changes the likelihood, and ignoring that changes the estimate.`,
    },
    quiz: [
      {
        question: String.raw`A colleague parameterizes the same exponential waiting times by the mean $\beta = 1/\lambda$ instead of the rate. Using the invariance property of the MLE, what is $\hat{\beta}$?`,
        options: [
          String.raw`$1/\bar{x}$, the rate estimate, unchanged`,
          String.raw`$\bar{x}^2$`,
          String.raw`$\bar{x}$, the sample mean`,
          String.raw`$n/\bar{x}$`,
        ],
        answer: 2,
        explanation: String.raw`Since $\beta = 1/\lambda$, the MLE transforms as $\hat{\beta} = 1/\hat{\lambda} = \bar{x}$. The trap is keeping the rate estimate $1/\bar{x}$ after changing the parameterization.`,
      },
      {
        question: String.raw`What is the maximized log-likelihood $\ell(\hat{\lambda})$ for $n$ exponential observations with total $S = \sum x_i$?`,
        options: [
          String.raw`$n\ln(n/S) - n$`,
          String.raw`$n\ln(S/n)$`,
          String.raw`$n\ln(n/S)$`,
          String.raw`$S/n - n$`,
        ],
        answer: 0,
        explanation: String.raw`Substitute $\hat{\lambda} = n/S$ into $n\ln\lambda - \lambda S$. The second term becomes $-(n/S)S = -n$, giving $n\ln(n/S) - n$. The trap is dropping the $-n$ from the rate term.`,
      },
      {
        question: String.raw`For a sample of size $n = 2$ from $\text{Exp}(\lambda)$, consider the MLE $\hat{\lambda} = 1/\bar{x}$. Which statement about its expectation is correct?`,
        options: [
          String.raw`$E[\hat{\lambda}] = \lambda$, so the MLE is unbiased`,
          String.raw`$E[\hat{\lambda}] = \lambda/2$`,
          String.raw`$E[\hat{\lambda}]$ is infinite, because $E[1/X]$ diverges for exponential data`,
          String.raw`$E[\hat{\lambda}] = 2\lambda$, so the MLE overestimates the rate on average`,
        ],
        answer: 3,
        explanation: String.raw`The sum $S = x_1 + x_2$ is Gamma$(2,\lambda)$, so $E[1/S] = \int_0^\infty \frac{1}{s}\,\lambda^2 s e^{-\lambda s}\,ds = \lambda$ and $E[\hat{\lambda}] = 2E[1/S] = 2\lambda$. Since $1/\bar{x}$ is convex in $\bar{x}$, Jensen's inequality predicts the upward direction of this bias, which shrinks as $n$ grows.`,
      },
      {
        question: String.raw`Suppose $d$ of $n$ bulbs fail at observed times, while the other $n-d$ are still working when the test stops at time $T$ (right-censored). Each working bulb contributes only the survival probability $e^{-\lambda T}$. Let $S$ be the sum of all failure times plus $T$ for each working bulb. What is the MLE of $\lambda$?`,
        options: [
          String.raw`$d/n$, the observed failure fraction`,
          String.raw`$d/S$, the number of failures divided by the total time at risk`,
          String.raw`$n/S$, treating every bulb as a failure`,
          String.raw`$1/\bar{x}$ computed from the failure times only`,
        ],
        answer: 1,
        explanation: String.raw`Each failure at time $t_i$ contributes $\ln\lambda - \lambda t_i$, and each working bulb contributes $-\lambda T$. Summing gives $\ell(\lambda) = d\ln\lambda - \lambda S$, and $d/\lambda - S = 0$ yields $\hat{\lambda} = d/S$. The trap is treating censored bulbs as failures.`,
      },
      {
        question: "Every observed waiting time is doubled, so x_i becomes 2x_i. How does the MLE of the rate lambda change?",
        options: [
          "It is unchanged, since the rate is a property of the process",
          "It doubles, because the rate scales with the data",
          String.raw`It halves, because the new mean is $2\bar{x}$ and $\hat{\lambda}_{\text{new}} = 1/(2\bar{x}) = \hat{\lambda}/2$`,
          String.raw`It becomes $\sqrt{2}\,\hat{\lambda}$, since the exponential scales with the square root`,
        ],
        answer: 2,
        explanation: String.raw`The new MLE is $1/(2\bar{x}) = \hat{\lambda}/2$. Stretching times by a factor of 2 slows the process, so events occur half as often. The trap is assuming that larger numbers in the data increase the rate.`,
      },
    ],
  },
  57: {
    derivation: {
      headline: "p-hat = k/n follows from setting the Bernoulli score to zero",
      axioms: [
        String.raw`Each trial $X_i \in \{0,1\}$ is independent with $P(X_i = x_i \mid p) = p^{x_i}(1-p)^{1-x_i}$, where $0 < p < 1$ is the success probability.`,
        String.raw`The number of successes is $k = \sum_{i=1}^n x_i$, and for the count alone $P(K = k \mid p) = \binom{n}{k} p^k (1-p)^{n-k}$.`,
        String.raw`The MLE maximizes $\ell(p) = \ln L(p)$ over $p \in [0,1]$, and wherever the maximum is interior it satisfies $\ell'(p) = 0$.`,
      ],
      steps: [
        {
          title: "Write the likelihood",
          body: String.raw`Because the trials are independent, the probability of a specific sequence is $\prod_{i=1}^n p^{x_i}(1-p)^{1-x_i}$. Using $\sum x_i = k$ and $\sum (1 - x_i) = n-k$, this collapses to $L(p) = p^k (1-p)^{n-k}$. The likelihood in $p$ depends on the data only through the count $k$.`,
        },
        {
          title: "Take the log",
          body: String.raw`Applying $\ln$ gives $\ell(p) = k\ln p + (n-k)\ln(1-p)$. The binomial coefficient $\binom{n}{k}$, if kept, adds only a constant that does not depend on $p$, so it does not move the maximizer. The logarithm turns powers into multiples of logs that are easy to differentiate.`,
        },
        {
          title: "Differentiate",
          body: String.raw`For $0 < p < 1$, the derivative is $\ell'(p) = \frac{k}{p} - \frac{n-k}{1-p}$. The first term weighs the successes by $1/p$ and the second weighs the failures by $1/(1-p)$, so the score balances the two kinds of outcome.`,
        },
        {
          title: "Solve the score equation",
          body: String.raw`Setting $\ell'(p) = 0$ and multiplying both sides by $p(1-p) > 0$ gives $k(1-p) = (n-k)p$. Expanding, $k - kp = np - kp$, so the $kp$ terms cancel and $k = np$. Hence $\hat{p} = \frac{k}{n}$, the observed proportion of successes.`,
        },
        {
          title: "Check the boundary and concavity",
          body: String.raw`The second derivative $\ell''(p) = -\frac{k}{p^2} - \frac{n-k}{(1-p)^2}$ is negative whenever $0 < k < n$, so the stationary point is the unique maximum. If $k = 0$ or $k = n$, the score has no interior root and the maximum sits on the boundary: $L(p) = (1-p)^n$ peaks at $p = 0$ and $L(p) = p^n$ peaks at $p = 1$. Both still agree with $\hat{p} = k/n$.`,
        },
      ],
      result: String.raw`For $k$ successes in $n$ independent Bernoulli trials, the MLE is $\hat{p} = \frac{k}{n}$, the sample proportion, and it is the maximizer over the whole closed interval $[0,1]$.`,
      assumptionsBreak: String.raw`The formula assumes independent trials with one fixed p. If trials cluster, such as repeated measures on the same person, the product likelihood overstates the information and the precision looks better than it is. Even inside the model, after 2 heads in 2 flips the MLE is $\hat{p} = 1$, which predicts tails is impossible; a Beta(1,1) prior gives the posterior mean $(k+1)/(n+2) = 3/4$ instead.`,
    },
    quiz: [
      {
        question: "Team A observes 3 successes in 10 trials. Team B observes 30 successes in 100 trials. Which statement about their MLEs is correct?",
        options: [
          "Team A's MLE is 0.10 because 3 is smaller than 30",
          String.raw`Both MLEs equal 0.30, but Team B's estimate is far more precise, with standard error about $\sqrt{0.21/100} \approx 0.046$ versus about $0.145$ for Team A`,
          "Team A's MLE is more reliable because its smaller sample is less noisy",
          "Team B's MLE is 0.03 because 30 is divided by 1000 total trials",
        ],
        answer: 1,
        explanation: String.raw`The MLE depends only on the proportion $k/n$, so both are $0.30$. The uncertainty depends on $n$ through the standard error $\sqrt{\hat{p}(1-\hat{p})/n}$, which a single point estimate hides.`,
      },
      {
        question: String.raw`In the derivation, the score equation is $\frac{k}{p} - \frac{n-k}{1-p} = 0$. Which algebra is correct after multiplying both sides by $p(1-p)$?`,
        options: [
          String.raw`$k(1-p) = (n-k)p$, which simplifies to $k = np$`,
          String.raw`$kp = (n-k)(1-p)$, which simplifies to $p = (n-k)/n$`,
          String.raw`$k/p = (n-k)p$, which gives $p = \sqrt{k/n}$`,
          String.raw`$k + p = (n-k) + (1-p)$, which gives $p = n/2$`,
        ],
        answer: 0,
        explanation: String.raw`Multiplying $\frac{k}{p}$ by $p(1-p)$ leaves $k(1-p)$, and multiplying $\frac{n-k}{1-p}$ leaves $(n-k)p$. Swapping which denominator cancels gives the sign-flipped answer $p = (n-k)/n$, which is the failure proportion.`,
      },
      {
        question: String.raw`All $n$ trials are failures, so $k = 0$. What is the MLE of $p$, and why?`,
        options: [
          String.raw`$\hat{p} = 1/2$ by the symmetry of the Bernoulli`,
          String.raw`$\hat{p} = 1/(n+1)$, because the MLE always keeps a pseudocount`,
          String.raw`$\hat{p} = 0$, because $L(p) = (1-p)^n$ is largest at $p = 0$; the score $-\frac{n}{1-p}$ has no root in $(0,1)$, so the maximum is on the boundary`,
          String.raw`$\hat{p}$ is undefined, because $k/n = 0$ and the log of 0 is undefined`,
        ],
        answer: 2,
        explanation: String.raw`With $k = 0$ the term $k\ln p$ vanishes and $L(p) = (1-p)^n$, which is maximized at $p = 0$. The score $-\frac{n}{1-p}$ is never zero on $(0,1)$. The answer matches $k/n = 0$, but only because the maximum lies on the closed boundary.`,
      },
      {
        question: String.raw`Let the log-odds be $\theta = \ln\left(\frac{p}{1-p}\right)$. Using invariance of the MLE, what is $\hat{\theta}$ from $k$ successes in $n$ trials, when $0 < k < n$?`,
        options: [
          String.raw`$\hat{\theta} = \ln\left(\frac{k}{n-k}\right)$, the log-odds of $\hat{p}$`,
          String.raw`$\hat{\theta} = \frac{k}{n-k}$, the odds`,
          String.raw`$\hat{\theta} = \hat{p} = \frac{k}{n}$, because reparameterization does not change estimates`,
          String.raw`$\hat{\theta} = \ln\left(\frac{n}{k}\right)$`,
        ],
        answer: 0,
        explanation: String.raw`The MLE is invariant: if $\hat{p}$ maximizes the likelihood, then $g(\hat{p})$ is the MLE of $\theta = g(p)$. Here $\hat{\theta} = \ln\left(\frac{\hat{p}}{1-\hat{p}}\right) = \ln\left(\frac{k}{n-k}\right)$.`,
      },
      {
        question: String.raw`A coin is flipped $n = 40$ times and lands heads $k = 24$ times, so $\hat{p} = 0.6$. Roughly how many times more likely are these data under $p = 0.6$ than under $p = 0.5$?`,
        options: [
          "About 0.8 times",
          "About 1.2 times",
          "About 24 times",
          "About 2.24 times",
        ],
        answer: 3,
        explanation: String.raw`The binomial coefficient $\binom{40}{24}$ cancels in the ratio, leaving $\left(\frac{0.6}{0.5}\right)^{24}\left(\frac{0.4}{0.5}\right)^{16} = 1.2^{24} \cdot 0.8^{16} \approx 79.5 \times 0.0281 \approx 2.24$. The trap is taking the ratio as just $0.6/0.5 = 1.2$, which ignores the failures.`,
      },
    ],
  },
  58: {
    derivation: {
      headline: "Solve both partial derivatives; the variance MLE divides by n",
      axioms: [
        String.raw`The observations $x_1,\dots,x_n$ are independent and identically distributed as $\mathcal{N}(\mu,\sigma^2)$, with density $f(x \mid \mu,\sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$.`,
        String.raw`The parameter space is $\mu \in \mathbb{R}$ and $\sigma^2 > 0$, and the sample mean is $\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i$.`,
        String.raw`Because the logarithm is strictly increasing, maximizing the likelihood is equivalent to maximizing $\ell(\mu,\sigma^2) = \sum_{i=1}^n \ln f(x_i \mid \mu,\sigma^2)$.`,
      ],
      steps: [
        {
          title: "Write the log-likelihood",
          body: String.raw`Taking the log of each factor gives $\ln f(x_i \mid \mu,\sigma^2) = -\frac{1}{2}\ln(2\pi\sigma^2) - \frac{(x_i-\mu)^2}{2\sigma^2}$. Summing over $i$,
$$\ell(\mu,\sigma^2) = -\frac{n}{2}\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^n (x_i-\mu)^2.$$
The data enter only through $\sum (x_i-\mu)^2$, so this is the object to differentiate.`,
        },
        {
          title: "Maximize over mu",
          body: String.raw`Since $\sigma^2 > 0$, the factor $\frac{1}{\sigma^2}$ is positive, so $\frac{\partial \ell}{\partial \mu} = \frac{1}{\sigma^2}\sum_{i=1}^n (x_i-\mu)$ vanishes exactly when $\sum_{i=1}^n (x_i - \mu) = 0$. That gives $n\mu = \sum x_i$, so $\hat{\mu} = \bar{x}$ for every value of $\sigma^2$.`,
        },
        {
          title: "Maximize over sigma squared",
          body: String.raw`Substitute $\hat{\mu} = \bar{x}$ and write $v = \sigma^2$ and $S = \sum_{i=1}^n (x_i-\bar{x})^2$. Then $\ell(v) = -\frac{n}{2}\ln(2\pi v) - \frac{S}{2v}$, so $\frac{d\ell}{dv} = -\frac{n}{2v} + \frac{S}{2v^2} = \frac{S - nv}{2v^2}$. Setting this to zero gives $\hat{\sigma}^2 = \frac{S}{n} = \frac{1}{n}\sum_{i=1}^n (x_i-\bar{x})^2$, which divides by $n$.`,
        },
        {
          title: "Verify it is a maximum",
          body: String.raw`The sign of $\frac{S - nv}{2v^2}$ is positive when $v < S/n$ and negative when $v > S/n$, because the denominator is always positive. The log-likelihood rises and then falls, so $\hat{v} = S/n$ is the unique maximum. Profiling out $\mu$ is legitimate because $\hat{\mu} = \bar{x}$ was the maximizer for every $v$, so maximizing over the pair is the same as maximizing over $v$ after substitution.`,
        },
        {
          title: "Expected value and bias",
          body: String.raw`Expanding around $\bar{x}$ gives $\sum (x_i-\mu)^2 = \sum (x_i-\bar{x})^2 + n(\bar{x}-\mu)^2$, because the cross term $2(\bar{x}-\mu)\sum(x_i-\bar{x})$ vanishes. Then $E\left[\sum (x_i-\mu)^2\right] = n\sigma^2$ and $E\left[n(\bar{x}-\mu)^2\right] = n\cdot\frac{\sigma^2}{n} = \sigma^2$, so $E[S] = (n-1)\sigma^2$ and $E[\hat{\sigma}^2] = \frac{n-1}{n}\sigma^2$. The MLE is biased downward.`,
        },
      ],
      result: String.raw`The MLEs are $\hat{\mu} = \bar{x} = \frac{1}{n}\sum x_i$ and $\hat{\sigma}^2 = \frac{1}{n}\sum (x_i-\bar{x})^2$. The variance MLE divides by $n$ and is biased, with $E[\hat{\sigma}^2] = \frac{n-1}{n}\sigma^2$.`,
      assumptionsBreak: String.raw`These formulas assume the observations are independent and normal. If one observation equals $M$ and all others equal 0, the variance MLE becomes $\frac{M^2(n-1)}{n^2}$, which grows with the square of the outlier, so heavy tails make the estimate fragile. Dependence between observations also invalidates the independence step.`,
    },
    quiz: [
      {
        question: String.raw`A sample of $n = 4$ observations has $\sum (x_i - \bar{x})^2 = 12$. What are the MLE of $\sigma^2$ and the usual unbiased estimate $s^2$?`,
        options: [
          String.raw`MLE $= 3$ and $s^2 = 4$`,
          String.raw`MLE $= 4$ and $s^2 = 3$`,
          String.raw`MLE $= 12$ and $s^2 = 4$`,
          String.raw`MLE $= 3$ and $s^2 = 12$`,
        ],
        answer: 0,
        explanation: String.raw`The MLE divides by $n$, giving $12/4 = 3$. The unbiased estimate divides by $n-1 = 3$, giving $12/3 = 4$. Swapping the divisors is the common trap.`,
      },
      {
        question: String.raw`After substituting $\hat{\mu} = \bar{x}$, the derivative of the variance log-likelihood is $\frac{S - nv}{2v^2}$ with $v = \sigma^2$ and $S = \sum (x_i-\bar{x})^2$. What does this sign pattern show?`,
        options: [
          "The derivative is zero for all v, so there is no unique maximum",
          String.raw`It is positive for $v < S/n$ and negative for $v > S/n$, so the maximum is at $v = S/n$`,
          "It is always negative, so the maximum is at v approaching 0",
          "It is always positive, so the variance estimate grows without bound",
        ],
        answer: 1,
        explanation: String.raw`The numerator $S - nv$ changes sign exactly at $v = S/n$, and the denominator $2v^2$ is always positive. A function that increases and then decreases peaks at the sign change.`,
      },
      {
        question: String.raw`The true variance is $\sigma^2 = 4$ and the sample size is $n = 5$. What is the expected value of the variance MLE?`,
        options: [
          "4.0, since the MLE is unbiased",
          "5.0, since the MLE is the sum of squared deviations",
          String.raw`3.2, since $E[\hat{\sigma}^2] = \frac{n-1}{n}\sigma^2 = \frac{4}{5} \cdot 4$`,
          String.raw`2.5, since the MLE divides by $n-2$`,
        ],
        answer: 2,
        explanation: String.raw`Using $E\left[\sum (x_i-\bar{x})^2\right] = (n-1)\sigma^2$, the MLE has expectation $\frac{n-1}{n}\sigma^2 = \frac{4}{5} \cdot 4 = 3.2$. The trap is assuming the MLE is unbiased, which holds only asymptotically.`,
      },
      {
        question: String.raw`One observation equals $M$ and the other $n-1$ observations equal 0. What is the variance MLE for this sample, in terms of $M$ and $n$?`,
        options: [
          String.raw`$M^2/n$ exactly, because the outlier only adds one squared term`,
          String.raw`$\frac{M^2(n-1)}{n^2}$`,
          String.raw`$M(n-1)/n$, which grows only linearly in $M$`,
          String.raw`$0$, because the MLE is robust to outliers`,
        ],
        answer: 1,
        explanation: String.raw`Here $\bar{x} = M/n$ and $\sum (x_i-\bar{x})^2 = M^2 - M^2/n = \frac{M^2(n-1)}{n}$, so dividing by $n$ gives $\frac{M^2(n-1)}{n^2}$. The estimate scales with the square of the outlier, so it is not robust.`,
      },
      {
        question: String.raw`Why can $\hat{\mu}$ in a Normal model be found without first determining $\sigma^2$?`,
        options: [
          String.raw`Because the joint likelihood separates into a function of $\mu$ times a function of $\sigma^2$ with no shared terms`,
          String.raw`Because $\sigma^2$ is known to equal 1 in every Normal MLE calculation`,
          String.raw`Because the MLE of $\mu$ is always the median, which does not depend on $\sigma^2$`,
          String.raw`Because $\frac{\partial \ell}{\partial \mu} = \frac{1}{\sigma^2}\sum (x_i-\mu)$, and the positive factor $\frac{1}{\sigma^2}$ does not change where this equals zero, so $\hat{\mu} = \bar{x}$ for every $\sigma^2$`,
        ],
        answer: 3,
        explanation: String.raw`The $\mu$ score is a positive multiple of $\sum (x_i - \mu)$, so its root is the sample mean regardless of $\sigma^2$. The trap is believing that $\sigma^2$ moves the peak in $\mu$; it only changes how wide the peak is.`,
      },
    ],
  },
};

export default deepContent;
