// Deep first-principles theory and extra knowledge-check questions for module-2
export const deepContent = {
  2: {
    derivation: {
      headline: "A distribution is fixed by its CDF, and its density is the derivative of that CDF",
      axioms: [
        String.raw`A random variable $X$ is a function from a sample space $\Omega$ to the real line, so events such as $\{X \le x\}$ are well-defined subsets of $\Omega$.`,
        String.raw`A probability measure $P$ satisfies $P(E) \ge 0$ for every event $E$, $P(\Omega) = 1$, and countable additivity $P\left(\bigcup_i E_i\right) = \sum_i P(E_i)$ for pairwise disjoint events.`,
        String.raw`A continuous random variable has a density $f(t) \ge 0$ with $\int_{-\infty}^{\infty} f(t)\,dt = 1$, and this density is the only object used to describe its probabilities.`
      ],
      steps: [
        {
          title: "Reduce every event to the CDF",
          body: String.raw`Every interval event can be built from the events $\{X \le x\}$. For $a \le b$ we have $\{X \le a\} \subseteq \{X \le b\}$ and $\{a < X \le b\} = \{X \le b\} \setminus \{X \le a\}$, so additivity gives $P(a < X \le b) = P(X \le b) - P(X \le a)$. Writing $F(x) = P(X \le x)$ for the cumulative distribution function, this reads $P(a < X \le b) = F(b) - F(a)$, so the whole distribution is encoded by $F$.`
        },
        {
          title: "Pin down monotonicity and the limits",
          body: String.raw`Nonnegativity of $P$ applied to the interval $(a, b]$ gives $F(b) - F(a) = P(a < X \le b) \ge 0$, so $F$ is non-decreasing. As $x \to -\infty$ the events $\{X \le x\}$ shrink to the empty set, and as $x \to +\infty$ they grow to $\Omega$. Continuity of probability, which follows from countable additivity, then gives $F(-\infty) = 0$ and $F(+\infty) = 1$.`
        },
        {
          title: "Obtain the density by differentiating",
          body: String.raw`Suppose $F$ is differentiable with derivative $f = F'$. The fundamental theorem of calculus gives $\int_a^b f(t)\,dt = F(b) - F(a)$, and comparing with step 1 yields $P(a < X \le b) = \int_a^b f(t)\,dt$. Conversely, $\lim_{h \to 0} \frac{P(x < X \le x+h)}{h} = \lim_{h \to 0} \frac{F(x+h) - F(x)}{h} = F'(x) = f(x)$, so the density is the rate at which probability accumulates.`
        },
        {
          title: "Show that single points carry no probability",
          body: String.raw`For a continuous $X$, $F$ has no jumps, so $P(X = c) = \lim_{h \to 0^+} P(c - h < X \le c) = \lim_{h \to 0^+} \left[F(c) - F(c-h)\right] = 0$. Hence a density value $f(c)$ is not itself a probability; it is a probability per unit length, and only integrals over intervals give probabilities.`
        },
        {
          title: "Read off the constraint on the height",
          body: String.raw`The only requirements on $f$ are $f \ge 0$ and $\int f = 1$, and nothing forces $f(x) \le 1$. For $X$ uniform on $[0, 0.1]$, the density is $f(x) = 1/0.1 = 10$ on that interval, and $\int f = 10 \times 0.1 = 1$ holds exactly even though $f$ exceeds 1 everywhere on its support.`
        }
      ],
      result: String.raw`$$P(a < X \le b) = F(b) - F(a) = \int_a^b f(t)\,dt, \qquad P(X = c) = 0 \text{ for continuous } X.$$ Probabilities come from integrating a density over intervals, and the density can be larger than 1.`,
      assumptionsBreak: "The argument needs F to be continuous, which rules out atoms, and differentiable, which produces a density. For a mixed variable, such as a fee that is exactly $0$ with probability $0.3$ and otherwise drawn from a continuous distribution, F jumps at 0, so P(X = 0) = 0.3 and no density can carry that mass."
    },
    quiz: [
      {
        question: "A random variable X has CDF F(x). For a < b, which expression equals P(a < X <= b)?",
        options: ["F(a) - F(b)", "F(b) * F(a)", "F(b) + F(a)", "F(b) - F(a)"],
        answer: 3,
        explanation: "Because {X <= a} is contained in {X <= b}, removing the smaller event leaves the strip (a, b], whose probability is F(b) - F(a). The common trap is reversing the subtraction, which gives a negative number."
      },
      {
        question: String.raw`A continuous random variable has density $f(x) = 2x$ on $[0,1]$ and zero elsewhere. What is $P(X \le 1/2)$?`,
        options: ["1/2", "1/8", "1/4", "3/4"],
        answer: 2,
        explanation: String.raw`$P(X \le 1/2) = \int_0^{1/2} 2x\,dx = x^2 \big|_0^{1/2} = 1/4$. The trap is confusing the event $X \le 1/2$ with its complement, which has probability $3/4$.`
      },
      {
        question: "A random variable X has CDF F. Which expression gives P(X > b)?",
        options: ["1 - F(b)", "F(b)", "F(-b)", "1 + F(b)"],
        answer: 0,
        explanation: "The events {X > b} and {X <= b} are complements, and total probability is 1, so P(X > b) = 1 - F(b). Writing F(b) gives the lower tail, which is the opposite event."
      },
      {
        question: String.raw`A density is $f(x) = kx^2$ on $[0,2]$ and zero elsewhere. What value of $k$ makes $f$ a valid density?`,
        options: ["1/2", "3/8", "8/3", "1/8"],
        answer: 1,
        explanation: String.raw`Normalization requires $k\int_0^2 x^2\,dx = k \cdot \frac{8}{3} = 1$, so $k = 3/8$. Treating the function as a uniform density of height 1/2 ignores the $x^2$ shape.`
      },
      {
        question: String.raw`If $F$ is the CDF of a continuous random variable whose density $f$ is continuous, which expression equals $F'(x)$?`,
        options: ["1 - F(x)", "F(x) / x", "-f(x)", "f(x)"],
        answer: 3,
        explanation: String.raw`The fundamental theorem of calculus says that differentiating $F(x) = \int_{-\infty}^x f(t)\,dt$ returns the integrand, so $F' = f$. The survival function $1 - F$ has derivative $-f$, which is a common sign mistake.`
      }
    ]
  },
  3: {
    derivation: {
      headline: "The normal density follows from a quadratic log-density, a Gaussian integral, and standardization",
      axioms: [
        String.raw`The density $f$ of $X$ is strictly positive on $\mathbb{R}$, symmetric about a centre $\mu$, and its logarithm is a concave quadratic, so $\log f(x) = a - b(x-\mu)^2$ for constants $a$ and $b > 0$.`,
        String.raw`A density integrates to one, $\int_{-\infty}^{\infty} f(x)\,dx = 1$.`,
        String.raw`Expectations are defined by $E[g(X)] = \int_{-\infty}^{\infty} g(x) f(x)\,dx$ whenever this integral converges absolutely.`
      ],
      steps: [
        {
          title: "Parametrize the quadratic",
          body: String.raw`Set $\sigma = (2b)^{-1/2} > 0$, which is always possible because $b > 0$. Then $b = \frac{1}{2\sigma^2}$, and exponentiating the log-density gives $f(x) = A \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$ with $A = e^a$. The shape is now fixed, leaving only the constant $A$ and the width $\sigma$ to determine.`
        },
        {
          title: "Compute the normalizing constant",
          body: String.raw`Substitute $u = (x-\mu)/\sigma$, so $dx = \sigma\,du$ and $\int f = A\sigma \int e^{-u^2/2}\,du$. Let $I = \int_{-\infty}^{\infty} e^{-u^2/2}\,du$. Then $I^2 = \iint e^{-(u^2+v^2)/2}\,du\,dv$, and in polar coordinates $u = r\cos\theta$, $v = r\sin\theta$ this becomes $\int_0^{2\pi}\int_0^\infty e^{-r^2/2}\,r\,dr\,d\theta = 2\pi \cdot 1 = 2\pi$. Hence $I = \sqrt{2\pi}$, and normalization forces $A\sigma\sqrt{2\pi} = 1$, so $A = \frac{1}{\sigma\sqrt{2\pi}}$.`
        },
        {
          title: "Identify the mean and variance",
          body: String.raw`Symmetry about $\mu$ gives $E[X - \mu] = 0$, so $E[X] = \mu$. For the variance, substitute $x = \mu + \sigma u$ to get $\text{Var}(X) = \sigma^2 \int u^2 \phi(u)\,du$ with $\phi(u) = e^{-u^2/2}/\sqrt{2\pi}$. Integration by parts with $dv = u\,e^{-u^2/2}\,du$ gives $\int u^2 e^{-u^2/2}\,du = \left[-u e^{-u^2/2}\right] + \int e^{-u^2/2}\,du = 0 + \sqrt{2\pi}$, so $\int u^2 \phi(u)\,du = 1$ and $\text{Var}(X) = \sigma^2$.`
        },
        {
          title: "Standardize to one reference curve",
          body: String.raw`Let $Z = (X-\mu)/\sigma$. For any $x$, $P(X \le x) = P\left(Z \le \frac{x-\mu}{\sigma}\right)$, so every normal probability reduces to the standard normal CDF $\Phi(z) = P(Z \le z)$. The standard density $\phi$ is the case $\mu = 0$ and $\sigma = 1$, and only standardized values enter the calculation.`
        },
        {
          title: "Locate the inflection points",
          body: String.raw`Write $f(x) = A e^{-(x-\mu)^2/(2\sigma^2)}$. Differentiating gives $f'(x) = -\frac{x-\mu}{\sigma^2} f(x)$, and differentiating again gives $f''(x) = \left(\frac{(x-\mu)^2}{\sigma^4} - \frac{1}{\sigma^2}\right) f(x) = \frac{(x-\mu)^2 - \sigma^2}{\sigma^4} f(x)$. Since $f(x) > 0$, $f''(x) = 0$ exactly when $(x-\mu)^2 = \sigma^2$, which places the inflection points at $x = \mu \pm \sigma$.`
        }
      ],
      result: String.raw`$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \qquad E[X] = \mu, \quad \text{Var}(X) = \sigma^2.$$ Standardization turns every normal probability into a standard normal lookup, for example $P(|X - \mu| \le 2\sigma) = P(|Z| \le 2) = 2\Phi(2) - 1 \approx 0.9545$.`,
      assumptionsBreak: "Everything above depends on the log-density being exactly quadratic. Heavy-tailed data, such as a Student t with few degrees of freedom or a Cauchy variable, have log-densities that decay much more slowly than a quadratic, so normal tail probabilities and the 68-95-99.7 rule badly underestimate how often extreme values occur."
    },
    quiz: [
      {
        question: String.raw`After substituting $u = (x-\mu)/\sigma$, the normal density integrates to one only if the Gaussian integral $\int e^{-u^2/2}\,du$ equals which value?`,
        options: ["1", String.raw`$\sqrt{\pi}$`, String.raw`$\sqrt{2\pi}$`, String.raw`$2\pi$`],
        answer: 2,
        explanation: String.raw`Squaring the integral and switching to polar coordinates gives $2\pi$, so the integral itself is $\sqrt{2\pi}$, which fixes the constant $1/(\sigma\sqrt{2\pi})$. The trap is $\sqrt{\pi}$, which belongs to $\int e^{-x^2}\,dx$ with a different scale in the exponent.`
      },
      {
        question: String.raw`Using the substitution $u = (x-\mu)/\sigma$ and integration by parts on $\int u^2 e^{-u^2/2}\,du$, what is $E[(X-\mu)^2]$ for $X \sim \mathcal{N}(\mu, \sigma^2)$?`,
        options: [String.raw`$\sigma$`, String.raw`$2\sigma^2$`, String.raw`$1/\sigma^2$`, String.raw`$\sigma^2$`],
        answer: 3,
        explanation: String.raw`The substitution gives $E[(X-\mu)^2] = \sigma^2 \int u^2 \phi(u)\,du$, and the integral equals 1 after parts. The trap is $2\sigma^2$, which appears as a factor in the exponent but is not the variance.`
      },
      {
        question: String.raw`If $X \sim \mathcal{N}(100, 15^2)$, which expression equals $P(X \le 130)$ in terms of the standard normal CDF $\Phi$?`,
        options: [String.raw`$\Phi(30)$`, String.raw`$\Phi(2)$`, String.raw`$1 - \Phi(2)$`, String.raw`$\Phi(130/15)$`],
        answer: 1,
        explanation: String.raw`Standardizing gives $Z = (130 - 100)/15 = 2$, so $P(X \le 130) = \Phi(2)$. Forgetting to subtract the mean yields $\Phi(130/15)$, and using the upper tail yields $1 - \Phi(2)$, which is $P(X > 130)$.`
      },
      {
        question: String.raw`Let $X \sim \mathcal{N}(50, 25)$, so $\sigma = 5$. Which expression gives $P(45 \le X \le 60)$?`,
        options: [String.raw`$\Phi(2) - \Phi(-1)$`, String.raw`$\Phi(60) - \Phi(45)$`, String.raw`$\Phi(2) + \Phi(1)$`, String.raw`$\Phi(10) - \Phi(-5)$`],
        answer: 0,
        explanation: String.raw`Standardize both endpoints: $z = (60-50)/5 = 2$ and $z = (45-50)/5 = -1$, so the probability is $\Phi(2) - \Phi(-1)$. The trap is skipping the division by $\sigma$, which gives $\Phi(10) - \Phi(-5)$.`
      },
      {
        question: String.raw`If you double $\sigma$ in $\mathcal{N}(\mu, \sigma^2)$ while keeping $\mu$ fixed, what happens to the peak height $f(\mu)$?`,
        options: ["It doubles", "It halves", "It is unchanged", "It quadruples"],
        answer: 1,
        explanation: String.raw`The peak is $f(\mu) = 1/(\sigma\sqrt{2\pi})$, which is inversely proportional to $\sigma$, so doubling $\sigma$ halves the height while the total area stays 1. The trap is assuming the peak is unchanged because only the spread changed.`
      }
    ]
  },
  5: {
    derivation: {
      headline: "The exponential survival function follows from Poisson counts, and its density from differentiating it",
      axioms: [
        String.raw`Events occur independently in time at a constant rate $\lambda > 0$, so the number of events $N_t$ in an interval of length $t$ is Poisson with mean $\lambda t$: $P(N_t = k) = \frac{(\lambda t)^k e^{-\lambda t}}{k!}$.`,
        String.raw`The waiting time $T \ge 0$ is the time from zero until the first event, and $S(t) = P(T > t)$ denotes its survival function.`,
        String.raw`For a nonnegative random variable, the tail-integral formula holds: $E[T] = \int_0^\infty P(T > t)\,dt$.`
      ],
      steps: [
        {
          title: "Translate the waiting time into a count",
          body: String.raw`The first event occurs after time $t$ exactly when no events happen in $(0, t]$. Hence $\{T > t\} = \{N_t = 0\}$, and so $S(t) = P(T > t) = P(N_t = 0)$. The question about a waiting time has become a question about a Poisson count.`
        },
        {
          title: "Evaluate the Poisson probability",
          body: String.raw`Setting $k = 0$ in the Poisson formula gives $\frac{(\lambda t)^0 e^{-\lambda t}}{0!} = e^{-\lambda t}$, because $(\lambda t)^0 = 1$ and $0! = 1$. So $S(t) = e^{-\lambda t}$ for $t \ge 0$, with $S(0) = 1$ and $S(t) \to 0$ as $t \to \infty$.`
        },
        {
          title: "Differentiate to get the density",
          body: String.raw`The CDF is $F(t) = P(T \le t) = 1 - S(t) = 1 - e^{-\lambda t}$ for $t \ge 0$, and $F(t) = 0$ for $t < 0$. By the chain rule, $f(t) = F'(t) = \lambda e^{-\lambda t}$ for $t \ge 0$. As a check, $\int_0^\infty \lambda e^{-\lambda t}\,dt = \left[-e^{-\lambda t}\right]_0^\infty = 1$, as a density must.`
        },
        {
          title: "Derive memorylessness from the survival ratio",
          body: String.raw`By the definition of conditional probability, $P(T > s+t \mid T > s) = \frac{P(T > s+t)}{P(T > s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(T > t)$. The exponent splits additively, so the elapsed time $s$ cancels completely, and the remaining wait has the same law as a fresh wait.`
        },
        {
          title: "Compute the mean with the tail formula",
          body: String.raw`Applying the tail-integral formula gives $E[T] = \int_0^\infty e^{-\lambda t}\,dt = \left[-\frac{1}{\lambda} e^{-\lambda t}\right]_0^\infty$. The boundary term at infinity vanishes and the term at zero contributes $\frac{1}{\lambda}$, so $E[T] = \frac{1}{\lambda}$.`
        }
      ],
      result: String.raw`$$f(t) = \lambda e^{-\lambda t}, \qquad S(t) = e^{-\lambda t}, \qquad E[T] = \frac{1}{\lambda}, \qquad t \ge 0.$$ The waiting time carries no memory of how long it has already run, and the rate $\lambda$ alone controls the whole distribution.`,
      assumptionsBreak: String.raw`The derivation assumes a constant rate and independent arrivals. If the rate changes over time or events cluster, $N_t$ is no longer Poisson with mean $\lambda t$, and $P(N_t = 0)$ no longer equals $e^{-\lambda t}$. For a tire that wears out, the chance of failing soon rises with age, so $P(T > s+t \mid T > s) < P(T > t)$ and the memoryless identity breaks.`
    },
    quiz: [
      {
        question: String.raw`Using the tail formula $E[T] = \int_0^\infty P(T > t)\,dt$ with $P(T > t) = e^{-\lambda t}$, what is $E[T]$?`,
        options: [String.raw`$\lambda$`, String.raw`$1/\lambda$`, String.raw`$1/\lambda^2$`, String.raw`$\ln(\lambda)$`],
        answer: 1,
        explanation: String.raw`The integral of $e^{-\lambda t}$ from 0 to infinity is $1/\lambda$, so the mean waiting time is the reciprocal of the rate. The trap is $1/\lambda^2$, which is the variance rather than the mean.`
      },
      {
        question: String.raw`For an exponential lifetime with rate $\lambda$, what is the hazard $h(t) = f(t)/S(t)$, and what does its form imply?`,
        options: [
          "It increases linearly in t, so older items fail faster",
          "It decreases toward zero, so older items last longer",
          String.raw`It equals $\lambda$ at every $t$, so the failure risk is the same at any age`,
          String.raw`It equals $1/t$, so risk falls like a power law`
        ],
        answer: 2,
        explanation: String.raw`The ratio is $\lambda e^{-\lambda t} / e^{-\lambda t} = \lambda$ for all $t$, a constant hazard that is the mathematical content of memorylessness. The trap is assuming wear-out, which produces a hazard that increases with age.`
      },
      {
        question: String.raw`A bus wait is exponential with rate $0.1$ per minute. You have already waited 5 minutes. What is the probability you wait more than 10 additional minutes?`,
        options: [String.raw`$e^{-0.5}$`, String.raw`$e^{-1.5}$`, String.raw`$e^{-0.1}$`, String.raw`$e^{-1}$`],
        answer: 3,
        explanation: String.raw`Memorylessness gives $P(T > 15 \mid T > 5) = e^{-0.1 \cdot 15}/e^{-0.1 \cdot 5} = e^{-1}$, which equals $P(T > 10)$. The trap is answering $e^{-1.5}$, which is $P(T > 15)$ and ignores the 5 minutes already waited.`
      },
      {
        question: String.raw`A process has rate $\lambda = 2$ events per hour, modeled as Poisson. What is the probability that no event occurs in the first 30 minutes?`,
        options: [String.raw`$e^{-0.5}$`, String.raw`$e^{-1}$`, String.raw`$1 - e^{-1}$`, String.raw`$e^{-2}$`],
        answer: 1,
        explanation: String.raw`Here $t = 0.5$ hours, so $\lambda t = 1$ and $P(N_t = 0) = e^{-1}$, which is also $S(0.5)$. The trap is $1 - e^{-1}$, which is the probability that the first event arrives within 30 minutes.`
      },
      {
        question: "What is the median waiting time of an exponential variable with rate lambda?",
        options: [
          String.raw`$\ln(2)/\lambda$`,
          String.raw`$1/\lambda$`,
          String.raw`$\ln(\lambda)$`,
          String.raw`$\lambda/2$`
        ],
        answer: 0,
        explanation: String.raw`The median $m$ solves $S(m) = 1/2$, so $e^{-\lambda m} = 1/2$ and $m = \ln(2)/\lambda$. The trap is answering $1/\lambda$, the mean, because the exponential is right-skewed and its median sits below its mean.`
      }
    ]
  },
  22: {
    derivation: {
      headline: "Linearity of expectation follows from the joint PMF and the frequency meaning of probability",
      axioms: [
        String.raw`For discrete random variables $X$ and $Y$ with joint pmf $p(x,y) = P(X = x, Y = y) \ge 0$, the marginal pmf is $p_X(x) = \sum_y p(x,y)$, and $\sum_{x,y} p(x,y) = 1$.`,
        String.raw`The expectation of a discrete random variable is $E[X] = \sum_x x\,p_X(x)$, defined whenever $\sum_x |x|\,p_X(x) < \infty$.`,
        String.raw`In $n$ independent repetitions, relative frequencies of outcomes converge to their probabilities as $n \to \infty$, which is the law of large numbers.`
      ],
      steps: [
        {
          title: "Read an average as a weighted count",
          body: String.raw`Observe $X$ in $n$ trials and let $N_x$ count how often the value $x$ occurs. The sample average is $\bar{x}_n = \frac{1}{n}\sum_{i=1}^n x_i = \sum_x x \cdot \frac{N_x}{n}$, because each value is grouped with its repeats. The fraction $N_x/n$ is the relative frequency of $x$.`
        },
        {
          title: "Pass to the limit to define the expectation",
          body: String.raw`By the law of large numbers, $N_x/n \to p_X(x)$ for every $x$ as $n \to \infty$. Under absolute convergence, the limit of the weighted sum is the weighted sum of the limits, so $\bar{x}_n \to \sum_x x\,p_X(x)$. This limit is the definition $E[X] = \sum_x x\,p_X(x)$, which is why expectation is the long-run average.`
        },
        {
          title: "Prove additivity from the joint pmf",
          body: String.raw`Apply the definition to $X + Y$ using the joint distribution: $E[X+Y] = \sum_{x,y} (x+y)\,p(x,y) = \sum_x x \sum_y p(x,y) + \sum_y y \sum_x p(x,y) = \sum_x x\,p_X(x) + \sum_y y\,p_Y(y) = E[X] + E[Y]$. The marginals appear by summing out the other variable, and no factorization $p(x,y) = p_X(x)p_Y(y)$ was used.`
        },
        {
          title: "Add scalar multiples and constants",
          body: String.raw`Replacing $X$ by $aX$ changes each value $x$ to $ax$, so $E[aX] = \sum_x ax\,p_X(x) = aE[X]$. A constant $c$ is a variable that equals $c$ with probability 1, so $E[c] = c$. Applying the sum rule from the previous step to $aX$, $bY$, and $c$ gives $E[aX + bY + c] = aE[X] + bE[Y] + c$ for any pair with finite means.`
        },
        {
          title: "Locate where independence actually enters",
          body: String.raw`The product $E[XY] = \sum_{x,y} xy\,p(x,y)$ is generally not $E[X]E[Y]$. Only when $p(x,y) = p_X(x)\,p_Y(y)$ does the double sum factor into $\left(\sum_x x\,p_X(x)\right)\left(\sum_y y\,p_Y(y)\right) = E[X]E[Y]$. Independence is therefore needed for products, but never for sums.`
        }
      ],
      result: String.raw`$$E[aX + bY + c] = aE[X] + bE[Y] + c$$ holds for any random variables with finite means, while $E[XY] = E[X]E[Y]$ requires independence (or at least zero covariance).`,
      assumptionsBreak: String.raw`The rearrangements in steps 2 and 3 are valid only when the sums converge absolutely. When $\sum |x|\,p(x)$ diverges, the expectation is undefined and sample averages need not settle, so linearity has no meaning. For dependent variables such as $Y = X$, the product rule fails, since $E[X^2]$ differs from $(E[X])^2$ whenever X is not constant.`
    },
    quiz: [
      {
        question: "In proving E[X + Y] = E[X] + E[Y] from the joint pmf, which property of p(x, y) is essential?",
        options: [
          "p(x, y) factors as p(x) p(y)",
          "Summing p(x, y) over y gives p_X(x), and summing over x gives p_Y(y)",
          "p(x, y) is symmetric in x and y",
          "p(x, y) equals 1 for every pair (x, y)"
        ],
        answer: 1,
        explanation: "The double sum splits into two single sums because the marginal pmfs come from summing out the other variable. Factorization is not needed, which is why the rule holds even for dependent variables."
      },
      {
        question: "Let X equal 0 or 1 with probability 1/2 each, and let Y = X. What is E[XY]?",
        options: ["1/4", "0", "1", "1/2"],
        answer: 3,
        explanation: "Since Y = X, the product XY = X^2 = X for 0/1 values, so E[XY] = E[X] = 1/2. Multiplying the means, E[X]E[Y] = 1/4, is wrong because the variables are fully dependent."
      },
      {
        question: "If Y = 3X + 2 and E[X] = 4, what is E[Y]?",
        options: ["6", "12", "14", "24"],
        answer: 2,
        explanation: "Linearity gives E[3X + 2] = 3E[X] + 2 = 12 + 2 = 14. The trap of multiplying the constant 2 along with E[X] gives 24."
      },
      {
        question: "Two independent fair six-sided dice are rolled, with X and Y the two results. What is E[XY]?",
        options: ["7", "3.5", "6.125", "12.25"],
        answer: 3,
        explanation: String.raw`Independence gives $E[XY] = E[X]E[Y] = 3.5 \times 3.5 = 12.25$. The trap is computing $E[X+Y] = 7$, which is a sum rather than a product.`
      },
      {
        question: String.raw`Let $X_1, \ldots, X_n$ each have mean $\mu$, with no assumption about how they depend on each other. What is $E\left[(X_1 + \cdots + X_n)/n\right]$?`,
        options: [String.raw`$\mu$`, String.raw`$\mu/n$`, String.raw`$n\mu$`, String.raw`$\mu^2/n$`],
        answer: 0,
        explanation: String.raw`Linearity gives $\frac{1}{n}\sum_i E[X_i] = \frac{1}{n} \cdot n\mu = \mu$, so the sample mean is unbiased whatever the dependence structure. The trap is thinking the $1/n$ shrinks the expectation, when it only shrinks the variance.`
      }
    ]
  },
  23: {
    derivation: {
      headline: "The continuous expectation is the limit of discrete expectations over shrinking bins",
      axioms: [
        String.raw`A continuous random variable $X$ has a density $f \ge 0$ with $\int_{-\infty}^{\infty} f(x)\,dx = 1$, so that $P(a \le X \le b) = \int_a^b f(x)\,dx$.`,
        String.raw`For a discrete random variable $Y$ taking values $y_i$, $E[Y] = \sum_i y_i\,P(Y = y_i)$ whenever the sum converges absolutely.`,
        String.raw`The Riemann integral of a continuous function over a finite interval equals the limit of its Riemann sums as the mesh shrinks to zero.`
      ],
      steps: [
        {
          title: "Discretize the variable",
          body: String.raw`Partition the real line into intervals $I_i$ of width $\Delta$ with midpoints $x_i$, and define $X_\Delta = x_i$ whenever $X \in I_i$. Then $P(X_\Delta = x_i) = \int_{I_i} f(x)\,dx \approx f(x_i)\Delta$, because $f$ is nearly constant on a short interval when it is continuous.`
        },
        {
          title: "Write the discrete expectation as a Riemann sum",
          body: String.raw`Applying the discrete definition, $E[X_\Delta] = \sum_i x_i P(X_\Delta = x_i) \approx \sum_i x_i f(x_i)\Delta$. The right side is a Riemann sum for $\int x f(x)\,dx$ with mesh $\Delta$. As $\Delta \to 0$ the discretized variable approaches $X$, and the Riemann sums converge to the integral, so $E[X] = \int_{-\infty}^{\infty} x f(x)\,dx$.`
        },
        {
          title: "Extend the same argument to functions of X",
          body: String.raw`Replace $x_i$ by $g(x_i)$ in the previous step. Since $g(X_\Delta)$ takes the value $g(x_i)$ with probability about $f(x_i)\Delta$, we get $E[g(X)] \approx \sum_i g(x_i) f(x_i)\Delta \to \int g(x) f(x)\,dx$. This is the law of the unconscious statistician, so the expectation of $g(X)$ can be computed from $f$ without deriving the density of $Y = g(X)$.`
        },
        {
          title: "Derive the variance formula",
          body: String.raw`Setting $g(x) = (x-\mu)^2$ with $\mu = E[X]$ gives $\text{Var}(X) = \int (x-\mu)^2 f(x)\,dx$. Expanding the square and using linearity of the integral gives $\int (x-\mu)^2 f\,dx = \int x^2 f\,dx - 2\mu\int x f\,dx + \mu^2 \int f\,dx = E[X^2] - 2\mu^2 + \mu^2 = E[X^2] - \mu^2$, using $\int f = 1$.`
        },
        {
          title: "Check the machinery on the exponential",
          body: String.raw`For $f(x) = \lambda e^{-\lambda x}$ on $x \ge 0$, integration by parts with $u = x$ and $dv = \lambda e^{-\lambda x}\,dx$ gives $E[X] = \left[-x e^{-\lambda x}\right]_0^\infty + \int_0^\infty e^{-\lambda x}\,dx = 0 + \frac{1}{\lambda}$. The same method with $g(x) = x^2$ gives $E[X^2] = \frac{2}{\lambda^2}$, so $\text{Var}(X) = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$.`
        }
      ],
      result: String.raw`$$E[X] = \int_{-\infty}^{\infty} x f(x)\,dx, \qquad E[g(X)] = \int_{-\infty}^{\infty} g(x) f(x)\,dx, \qquad \text{Var}(X) = E[X^2] - (E[X])^2.$$ Every continuous expectation is a limit of discrete expectations, so the same linearity and definitions carry over.`,
      assumptionsBreak: String.raw`The limits in steps 2 and 3 need the integral to converge absolutely. If $\int |x| f(x)\,dx = \infty$, as for the Cauchy density, the Riemann sums do not settle to a finite value and $E[X]$ does not exist. If $X$ has point masses, the approximation $P(X_\Delta = x_i) \approx f(x_i)\Delta$ misses them, so the integral formula alone is incomplete.`
    },
    quiz: [
      {
        question: String.raw`For $X \sim \text{Exponential}(\lambda)$, integration by parts with $u = x$ and $dv = \lambda e^{-\lambda x}\,dx$ reduces $E[X]$ to an integral of which function?`,
        options: [String.raw`$e^{-\lambda x}$`, String.raw`$x e^{-\lambda x}$`, String.raw`$\lambda e^{-\lambda x}$`, String.raw`$e^{\lambda x}$`],
        answer: 0,
        explanation: String.raw`With $v = -e^{-\lambda x}$, the rule $\int u\,dv = uv - \int v\,du$ leaves $\int_0^\infty e^{-\lambda x}\,dx = 1/\lambda$. The trap is keeping the density itself, $\lambda e^{-\lambda x}$, as the remaining integrand.`
      },
      {
        question: String.raw`If $X \sim \text{Uniform}(0,1)$, what is $E[X^2]$ computed through the law of the unconscious statistician?`,
        options: ["1/2", "1/4", "1/3", "1"],
        answer: 2,
        explanation: String.raw`The formula gives $\int_0^1 x^2 \cdot 1\,dx = 1/3$, since the density is 1 on $[0,1]$. The trap is $1/4$, which is $(E[X])^2$ rather than $E[X^2]$.`
      },
      {
        question: String.raw`A continuous variable $X$ has $E[X] = 2$ and $E[X^2] = 7$. What is $\text{Var}(X)$?`,
        options: ["9", "7", "5", "3"],
        answer: 3,
        explanation: String.raw`The variance is $E[X^2] - (E[X])^2 = 7 - 4 = 3$. The trap is subtracting $E[X]$ without squaring it, which gives 5.`
      },
      {
        question: String.raw`Let $X \sim \text{Uniform}(-1,1)$ and $Y = X^2$. What is $E[Y]$?`,
        options: ["0", "1/2", "1/3", "2/3"],
        answer: 2,
        explanation: String.raw`The density is $1/2$ on $[-1,1]$, so the formula gives $\int_{-1}^1 x^2 \cdot \frac{1}{2}\,dx = \frac{1}{2} \cdot \frac{2}{3} = \frac{1}{3}$. The trap is integrating $x^2$ without the density factor, which gives $2/3$.`
      },
      {
        question: String.raw`In the Riemann-sum argument, the sum $\sum_i x_i f(x_i)\,\Delta$ converges as the bin width $\Delta$ shrinks to what quantity?`,
        options: [String.raw`$\int x^2 f(x)\,dx$`, String.raw`$\int x f(x)\,dx$`, String.raw`$\int f(x)\,dx$`, String.raw`$\sum_i x_i f(x_i)$`],
        answer: 1,
        explanation: String.raw`The factor $\Delta$ is the bin width, which turns the sum into a Riemann sum for $\int x f(x)\,dx$. The trap is dropping $\Delta$, which makes the sum scale like $1/\Delta$ and fail to settle.`
      }
    ]
  },
  24: {
    derivation: {
      headline: "The binomial PMF counts sequences, and its mean and variance follow from linearity and independence",
      axioms: [
        String.raw`Each trial $X_i$ is a Bernoulli variable taking value 1 (success) with probability $p$ and value 0 (failure) with probability $1-p$, so $E[X_i] = p$.`,
        String.raw`The trials $X_1, \ldots, X_n$ are mutually independent, so $P(X_1 = x_1, \ldots, X_n = x_n) = \prod_{i=1}^n P(X_i = x_i)$.`,
        String.raw`The number of ways to choose $k$ positions from $n$ is $\binom{n}{k} = \frac{n!}{k!(n-k)!}$, and the binomial theorem states $\sum_{k=0}^n \binom{n}{k} a^k b^{n-k} = (a+b)^n$.`
      ],
      steps: [
        {
          title: "Find the probability of one specific sequence",
          body: String.raw`Take a particular sequence of outcomes with exactly $k$ ones and $n-k$ zeros. By independence, its probability is the product $p \cdots p \cdot (1-p) \cdots (1-p) = p^k (1-p)^{n-k}$. Every sequence with the same count of ones has this same probability, so it depends only on $k$.`
        },
        {
          title: "Count the sequences",
          body: String.raw`The event $\{K = k\}$ is the union of all sequences with exactly $k$ successes. These sequences are pairwise disjoint, and each is determined by choosing which $k$ of the $n$ positions hold successes, giving $\binom{n}{k}$ sequences. Finite additivity then gives $P(K = k) = \binom{n}{k} p^k (1-p)^{n-k}$.`
        },
        {
          title: "Check normalization with the binomial theorem",
          body: String.raw`Summing over all $k$ and applying the binomial theorem with $a = p$ and $b = 1-p$ gives $\sum_{k=0}^n P(K=k) = (p + (1-p))^n = 1^n = 1$. So the formula is a valid PMF.`
        },
        {
          title: "Compute the mean with linearity",
          body: String.raw`Write $K = \sum_{i=1}^n X_i$. Linearity of expectation, which needs no independence, gives $E[K] = \sum_{i=1}^n E[X_i] = np$. This avoids summing the PMF directly.`
        },
        {
          title: "Compute the variance with independence",
          body: String.raw`Since $X_i^2 = X_i$ for 0/1 values, $E[X_i^2] = p$ and $\text{Var}(X_i) = p - p^2 = p(1-p)$. For $i \neq j$, independence gives $E[X_i X_j] = p^2 = E[X_i]E[X_j]$, so $\text{Cov}(X_i, X_j) = 0$. The variance of a sum is $\text{Var}\left(\sum_i X_i\right) = \sum_i \text{Var}(X_i) + 2\sum_{i<j} \text{Cov}(X_i, X_j)$, so $\text{Var}(K) = np(1-p)$.`
        }
      ],
      result: String.raw`$$P(K=k) = \binom{n}{k}p^k(1-p)^{n-k}, \qquad E[K] = np, \qquad \text{Var}(K) = np(1-p).$$ The exact binomial test uses this PMF directly, summing the tail probabilities under $H_0: p = p_0$ without a normal approximation.`,
      assumptionsBreak: String.raw`Every step relied on independent identical trials with a fixed p. Sampling without replacement from a finite population breaks independence: the success probability changes after each draw and the covariances are no longer zero. With $p = K/N$, the variance becomes $np(1-p)\frac{N-n}{N-1}$, which is smaller than $np(1-p)$, so the binomial test can be miscalibrated.`
    },
    quiz: [
      {
        question: "Why does the binomial coefficient appear in P(K = k) = C(n, k) p^k (1-p)^(n-k)?",
        options: [
          "We choose which k of the n trial positions are successes, and each choice gives a distinct sequence with that probability",
          "We multiply n by k to count all sequences",
          "We order the k successes among n! possible arrangements",
          "It normalizes the probabilities so they sum to 1 without counting anything"
        ],
        answer: 0,
        explanation: "A sequence is determined by the positions of its successes, so counting sequences with k successes means counting k-subsets of positions. The trap is using n! or n times k, which overcounts by treating the successes as distinguishable."
      },
      {
        question: "For independent Bernoulli(p) trials X_i and X_j with i not equal to j, why is Cov(X_i, X_j) = 0?",
        options: [
          "Both trials share the same p",
          "Bernoulli variables are uncorrelated by definition",
          "Independence gives E[X_i X_j] = E[X_i] E[X_j] = p^2, so the covariance is p^2 - p^2 = 0",
          "The covariance equals p(1-p) for any two trials"
        ],
        answer: 2,
        explanation: "Covariance is E[X_i X_j] - E[X_i]E[X_j], and independence makes the expectation of the product factor into the product of expectations. The trap is assuming that identical p values alone are enough, when the zero covariance comes from independence."
      },
      {
        question: "A fair coin is flipped 4 times. What is P(exactly 2 heads)?",
        options: ["1/4", "1/8", "1/2", "3/8"],
        answer: 3,
        explanation: String.raw`The probability is $\binom{4}{2}(1/2)^4 = 6/16 = 3/8$. The trap is 1/4, which corresponds to counting only 4 arrangements instead of the 6 ways to place the two heads.`
      },
      {
        question: String.raw`A test has $n = 5$ trials with $p = 0.5$ under $H_0$. What is $P(K \ge 4)$?`,
        options: ["5/32", "3/16", "1/2", "1/32"],
        answer: 1,
        explanation: String.raw`$P(K \ge 4) = P(K=4) + P(K=5) = (5 + 1)/32 = 6/32 = 3/16$. The trap is stopping at $P(K=4) = 5/32$ and dropping the top tail.`
      },
      {
        question: "Two balls are drawn without replacement from an urn of 10 red and 10 blue balls. Compared with drawing with replacement, how does the variance of the number of red balls change?",
        options: [
          "It is identical, both equal to 1/2",
          "It is larger without replacement, since the draws are dependent",
          "It is smaller without replacement: 9/19 versus 1/2",
          "It is zero without replacement, since the mean is fixed"
        ],
        answer: 2,
        explanation: String.raw`Without replacement the variance is $np(1-p)\frac{N-n}{N-1} = 2 \cdot \frac{1}{4} \cdot \frac{18}{19} = \frac{9}{19}$, compared with $\frac{1}{2}$ under replacement. The trap is applying the binomial formula even though the draws are dependent.`
      }
    ]
  },
  46: {
    derivation: {
      headline: "Inverse transform sampling follows from the uniformity of F(X) and the monotonicity of F",
      axioms: [
        String.raw`The CDF $F$ of a continuous variable is continuous and strictly increasing on its support, so its inverse $F^{-1}$ exists and satisfies $F^{-1}(F(x)) = x$.`,
        String.raw`$U \sim \text{Uniform}(0,1)$ means $P(U \le u) = u$ for every $u \in [0,1]$.`,
        String.raw`A pseudorandom generator is assumed to produce values whose distribution is Uniform(0,1), and this is the only source of randomness used.`
      ],
      steps: [
        {
          title: "Transform X into a uniform variable",
          body: String.raw`Let $X$ have CDF $F$ and define $U = F(X)$, which takes values in $[0,1]$. For $u \in (0,1)$, strict monotonicity of $F$ means $F(x) \le u$ holds exactly when $x \le F^{-1}(u)$, so the event $\{F(X) \le u\}$ equals $\{X \le F^{-1}(u)\}$.`
        },
        {
          title: "Evaluate the CDF of the transformed variable",
          body: String.raw`Therefore $P(U \le u) = P(X \le F^{-1}(u)) = F(F^{-1}(u)) = u$ for $u \in (0,1)$. This is exactly the CDF of Uniform(0,1), so $U = F(X) \sim \text{Uniform}(0,1)$. This is the probability integral transform.`
        },
        {
          title: "Reverse the transform",
          body: String.raw`Now let $U \sim \text{Uniform}(0,1)$ and define $X = F^{-1}(U)$. The same monotone equivalence, $F^{-1}(u) \le x$ if and only if $u \le F(x)$, gives $P(X \le x) = P(F^{-1}(U) \le x) = P(U \le F(x)) = F(x)$. So $X$ has CDF $F$, as required.`
        },
        {
          title: "Apply the transform to the exponential",
          body: String.raw`For $F(x) = 1 - e^{-\lambda x}$ with $x \ge 0$, set $u = 1 - e^{-\lambda x}$ and solve: $e^{-\lambda x} = 1 - u$, so $x = -\frac{\ln(1-u)}{\lambda}$. Thus $X = -\frac{\ln(1-U)}{\lambda}$. Because $1-U$ is also Uniform(0,1), the equivalent form $-\frac{\ln U}{\lambda}$ is often used.`
        },
        {
          title: "Confirm the sample mean",
          body: String.raw`If $X_1, \ldots, X_n$ are drawn this way, they are independent with CDF $F$, so the law of large numbers gives $\frac{1}{n}\sum_i X_i \to E[X] = \frac{1}{\lambda}$ as $n \to \infty$. Sampling therefore reproduces the population mean, which matches the expectation $1/\lambda$ derived for the exponential.`
        }
      ],
      result: String.raw`$$X = F^{-1}(U) \sim F \quad \text{whenever} \quad U \sim \text{Uniform}(0,1).$$ For an Exponential($\lambda$) variable, the transform is $X = -\frac{\ln(1-U)}{\lambda}$.`,
      assumptionsBreak: String.raw`The construction needs $F^{-1}$ to be a well-defined function. For discrete or mixed variables, $F$ has flat parts and jumps, so the inverse must be the generalized inverse $F^{-1}(u) = \min\{x : F(x) \ge u\}$, and samples land only on the jump points. When $F^{-1}$ has no closed form, as for the normal CDF, direct inversion is slow, so methods such as Box-Muller or rejection sampling are used instead.`
    },
    quiz: [
      {
        question: String.raw`In the proof that $F(X)$ is Uniform(0,1), which equivalence turns the event $\{F(X) \le u\}$ into an event about $X$?`,
        options: [
          String.raw`$X \le F^{-1}(u)$, because $F$ is strictly increasing`,
          String.raw`$X \ge F(u)$, because $F$ is decreasing`,
          String.raw`$X = u$ exactly`,
          String.raw`$F(X) = X$ for every $X$`
        ],
        answer: 0,
        explanation: String.raw`Strict monotonicity of $F$ means $F(x) \le u$ exactly when $x \le F^{-1}(u)$, and then the probability is $F(F^{-1}(u)) = u$. The trap is treating $F(X)$ as if it were equal to $X$.`
      },
      {
        question: String.raw`If $U \sim \text{Uniform}(0,1)$, which transformation yields $X \sim \text{Uniform}(2,5)$ by inverse transform?`,
        options: [String.raw`$X = 5U$`, String.raw`$X = 3 + 2U$`, String.raw`$X = 2 + 3U$`, String.raw`$X = 2 + U^2$`],
        answer: 2,
        explanation: String.raw`The CDF of Uniform(2,5) is $F(x) = (x-2)/3$ on $[2,5]$, so its inverse is $F^{-1}(u) = 2 + 3u$. The trap is $5U$, which ignores the lower endpoint 2.`
      },
      {
        question: "Using inverse transform with rate lambda = 2 and uniform draw u = 0.5 for an exponential variable, what is the sample value?",
        options: ["0.5", "ln(2)/2, about 0.347", "2 ln(2), about 1.386", "e^(-1), about 0.368"],
        answer: 1,
        explanation: String.raw`Solving gives $x = -\ln(1-u)/\lambda = -\ln(0.5)/2 = \ln(2)/2 \approx 0.347$. The trap is returning $u$ itself, which is not a draw from the exponential distribution.`
      },
      {
        question: String.raw`A discrete variable takes values 1, 2, 3 with probabilities 0.2, 0.5, 0.3, so its CDF has $F(1) = 0.2$, $F(2) = 0.7$, and $F(3) = 1$. If $U = 0.6$, which value does inverse transform return?`,
        options: ["3", "1", "0.6", "2"],
        answer: 3,
        explanation: String.raw`The generalized inverse returns the smallest $x$ with $F(x) \ge 0.6$, which is $x = 2$ because $F(1) = 0.2 < 0.6 \le 0.7 = F(2)$. The trap is returning $U$ itself or the largest value.`
      },
      {
        question: "Suppose we draw 10000 values from an exponential distribution with rate 2 by inverse transform. What is the best prediction for their sample mean?",
        options: ["2", "0.5", "0.25", "ln(2)"],
        answer: 1,
        explanation: String.raw`The sample mean converges to $E[X] = 1/\lambda = 0.5$ by the law of large numbers. The trap is answering 0.25, which is the variance $1/\lambda^2$ rather than the mean.`
      }
    ]
  }
};

export default deepContent;
