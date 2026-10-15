// Module 2 foundation, built from the ground up with worked examples.
export default {
  title: "Probability Distributions and Random Variables",
  summary: "Many things we measure, such as the number of heads in ten coin flips, a person's height, or how long we wait for a bus, depend on chance. A probability distribution is a complete list of the values such a quantity can take, together with how likely each value is. This module builds that idea step by step, starting from coin flips and waiting times, and introduces the three distributions used most often in practice: the binomial, the normal, and the exponential.",
  steps: [
    {
      step: 1,
      title: "A random variable is a number that chance decides",
      content: [
        String.raw`Flip a fair coin three times. Each flip lands heads (H) or tails (T), and each is equally likely. There are $2 \times 2 \times 2 = 8$ equally likely sequences of three flips: HHH, HHT, HTH, THH, HTT, THT, TTH, and TTT. Each sequence has chance $1/8$.`,
        String.raw`Now count the heads in each sequence. TTT has 0 heads. HTT, THT, and TTH each have 1 head. HHT, HTH, and THH each have 2 heads. HHH has 3 heads. The count changes from sequence to sequence because chance picks the sequence. We call this count a random variable, and we write it with a capital letter, $X$. A random variable is a number whose value is decided by the outcome of a chance experiment.`,
        String.raw`We call $X$ discrete because it can only take separate values: 0, 1, 2, or 3, with nothing in between. Counts are always discrete. Heights and waiting times are different, and we will reach them in step 3.`,
      ],
      example: [
        String.raw`Count how many of the 8 sequences give each value of $X$. One sequence gives $X = 0$, three give $X = 1$, three give $X = 2$, and one gives $X = 3$. Check: $1 + 3 + 3 + 1 = 8$, so every sequence is counted once.`,
        String.raw`Each sequence has chance $1/8$, so the chance of exactly two heads is $3/8 = 3 \div 8 = 0.375$. We write this as $P(X = 2) = 3/8 = 0.375$. Read it as: the probability that $X$ equals 2 is 0.375, which means 37.5 times in every 100 runs of the experiment.`,
      ],
    },
    {
      step: 2,
      title: "A distribution lists the chance of every value",
      content: [
        String.raw`Remember the 8 sequences from step 1. Now list every value $X$ can take, together with its chance. $X = 0$ has chance $1/8 = 0.125$. $X = 1$ has chance $3/8 = 0.375$. $X = 2$ has chance $3/8 = 0.375$. $X = 3$ has chance $1/8 = 0.125$. This complete list is the probability distribution of $X$.`,
        String.raw`Two rules must always hold. Every chance is between 0 and 1, and all the chances add up to 1. Check: $0.125 + 0.375 + 0.375 + 0.125 = 1.000$. The rule that gives the chance of each single value is called the probability mass function. We write it as $p(x) = P(X = x)$, so $p(2) = 0.375$.`,
        String.raw`Often we want the chance of landing at or below a value. The cumulative distribution function, or CDF, adds up the chances up to $x$: $F(x) = P(X \le x)$. The CDF never goes down as $x$ grows, and it finishes at 1. A common misreading is to read $F(x)$ as the chance of exactly $x$. It is not. It is the chance of everything up to and including $x$.`,
      ],
      example: [
        String.raw`The chance of at most one head is $F(1) = P(X \le 1) = 0.125 + 0.375 = 0.500$. The chance of two or fewer heads is $F(2) = 0.125 + 0.375 + 0.375 = 0.875$. The chance of three or fewer heads is $F(3) = 1.000$, because every outcome has at most three heads.`,
        String.raw`The chance of between one and two heads is $P(1 \le X \le 2) = 0.375 + 0.375 = 0.750$. The same answer comes from the CDF: $P(1 \le X \le 2) = F(2) - F(0) = 0.875 - 0.125 = 0.750$. Subtracting the CDF at the bottom of the range from the CDF at the top gives the chance of the range.`,
      ],
    },
    {
      step: 3,
      title: "Continuous values are measured by area, not by single points",
      content: [
        String.raw`A height or a waiting time can take any value in a range, such as 12.0 minutes, 12.5 minutes, or 12.0001 minutes. There are infinitely many possible values, so we cannot list a chance for each one the way we did for coin counts. Instead we use a density, a curve $f(x)$ that is never negative. The density tells us how tightly chance is packed near each value, and the chance of a range is the area under the curve over that range.`,
        String.raw`Take a simple case: a random number $X$ that is equally likely to be anywhere between 10 and 20. Its density is flat: $f(x) = 1/(20 - 10) = 0.1$ for $10 \le x \le 20$, and $f(x) = 0$ outside that range. The total area is a rectangle of width 10 and height 0.1, so the area is $10 \times 0.1 = 1$. Total area must always equal 1. That is why the height is 0.1 and not 0.5 or 1.`,
        String.raw`A single point has zero chance: $P(X = 12) = 0$, because a line has zero width and therefore zero area. This is why we only ask for chances over ranges. The area under $f$ between $a$ and $b$ is written as an integral, $\int_a^b f(x)\,dx$. You can think of it as adding up many thin rectangles of height $f(x)$ and width $dx$.`,
      ],
      example: [
        String.raw`The chance of landing between 12 and 15 is the area of a rectangle with width $15 - 12 = 3$ and height $0.1$. So $P(12 \le X \le 15) = 3 \times 0.1 = 0.30$. That is a 30 percent chance.`,
        String.raw`A density can be bigger than 1. Take a random number spread evenly between 0 and 0.1. Its density is $f(x) = 1/(0.1 - 0) = 10$ on that range. Check the total area: $0.1 \times 10 = 1$. The chance of landing in $[0, 0.05]$ is the area $0.05 \times 10 = 0.5$, which is half of all outcomes. The density was 10, yet no probability went above 1.`,
      ],
    },
    {
      step: 4,
      title: "Expected value is the long-run average",
      content: [
        String.raw`Go back to the coin count. Suppose we repeat the three-flip experiment 1000 times. About 125 runs give 0 heads, about 375 give 1 head, about 375 give 2 heads, and about 125 give 3 heads. The total number of heads is about $0 \times 125 + 1 \times 375 + 2 \times 375 + 3 \times 125 = 1500$, so the average per run is $1500 / 1000 = 1.5$. We call this weighted average the expected value, and we write it as $E[X]$.`,
        String.raw`For a discrete variable, the expected value is each value times its chance, added up: $E[X] = \sum_x x\, p(x)$. Each value is weighted by how often it happens. The result, 1.5, is not a value $X$ can take, because nobody ever gets 1.5 heads. That is normal. The expected value is an average over many runs, not a prediction for one run.`,
        String.raw`For a continuous variable, the sum becomes an integral: $E[X] = \int x\, f(x)\,dx$. Imagine the density as a thin wooden board with weight spread along it. The expected value is the point where the board balances. Expected values also obey linearity: $E[aX + b] = aE[X] + b$ for any fixed numbers $a$ and $b$.`,
      ],
      example: [
        String.raw`Discrete case: $E[X] = 0(0.125) + 1(0.375) + 2(0.375) + 3(0.125) = 0 + 0.375 + 0.750 + 0.375 = 1.500$.`,
        String.raw`Linearity check with $a = 2$ and $b = 1$: $E[2X + 1] = 2(1.5) + 1 = 4.0$. Now check by listing. The values $2X + 1$ are 1, 3, 5, and 7, with chances 0.125, 0.375, 0.375, and 0.125. So $1(0.125) + 3(0.375) + 5(0.375) + 7(0.125) = 0.125 + 1.125 + 1.875 + 0.875 = 4.000$. The two answers agree.`,
        String.raw`Continuous case, using $f(x) = 0.1$ on $[10, 20]$: $E[X] = \int_{10}^{20} x(0.1)\,dx = 0.1 \left[\frac{x^2}{2}\right]_{10}^{20} = 0.1 \cdot \frac{400 - 100}{2} = 0.1 \cdot 150 = 15$. The balance point is 15, the middle of the range.`,
      ],
    },
    {
      step: 5,
      title: "The normal distribution is the bell curve",
      content: [
        String.raw`Many measurements cluster around a middle value and thin out in both directions. Exam scores, adult heights, and measurement errors all behave this way. The normal distribution, also called the Gaussian, is a symmetric bell-shaped density that describes many such measurements. The mean is the average, and it is the center of the bell. We write the mean of a normal distribution as $\mu$ (the Greek letter mu). The standard deviation measures how far values typically sit from the mean. We write it as $\sigma$ (sigma). The two numbers $\mu$ and $\sigma$ are called parameters because they fix the exact shape of the curve.`,
        String.raw`The density formula is $f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$. You do not need to memorize it. Look at the exponent: it is zero when $x = \mu$, and it becomes more negative as $x$ moves away from $\mu$ in either direction. So the curve peaks at the mean and falls off symmetrically. Remember from step 4 that the expected value is the balance point. For the normal distribution, the mean $\mu$ is exactly that balance point.`,
        String.raw`To compare values from different bells, we convert to a z-score: $Z = \frac{X - \mu}{\sigma}$. The z-score counts how many standard deviations $X$ lies above the mean (if positive) or below it (if negative). A useful rule of thumb is that about 68.27 percent of values lie within one standard deviation of the mean, about 95.45 percent within two, and about 99.73 percent within three.`,
      ],
      example: [
        String.raw`Exam scores follow a normal distribution with mean $\mu = 75$ and standard deviation $\sigma = 10$. A student scores 95. Her z-score is $Z = (95 - 75)/10 = 20/10 = 2.0$. She is two standard deviations above the mean.`,
        String.raw`What fraction of students score 95 or higher? Write $\Phi(z)$ for the CDF of the standard normal, the area to the left of $z$ under the bell with mean 0 and standard deviation 1. A table or calculator gives $\Phi(2.0) \approx 0.9772$. So $P(X \ge 95) = P(Z \ge 2.0) = 1 - \Phi(2.0) = 1 - 0.9772 = 0.0228$. About 2.3 percent of students score 95 or higher.`,
        String.raw`Check the rule of thumb. Scores between $75 - 10 = 65$ and $75 + 10 = 85$ are within one standard deviation. The chance is about 0.6827, so the chance of scoring above 85 is $(1 - 0.6827)/2 = 0.1587$, and the chance of scoring below 65 is also about 0.1587.`,
      ],
    },
    {
      step: 6,
      title: "The exponential distribution models waiting times",
      content: [
        String.raw`Suppose buses arrive at a bus stop at a steady average rate of $\lambda = 0.1$ buses per minute. The letter $\lambda$ (lambda) is the rate. Let $T$ be the number of minutes you wait for the next bus. The waiting time $T$ is continuous, and it can never be negative. The exponential distribution is the standard model for such waits. Its density is $f(t) = \lambda e^{-\lambda t}$ for $t \ge 0$. The density starts at height $\lambda$ when $t = 0$ and then decays.`,
        String.raw`It is often easier to work with the survival function $S(t) = P(T > t)$, the chance of waiting longer than $t$. Remember the CDF from step 2, $F(t) = P(T \le t)$, so $S(t) = 1 - F(t)$. We can find $S$ as an area under the density from $t$ to infinity: $S(t) = \int_t^\infty \lambda e^{-\lambda u}\,du = \left[-e^{-\lambda u}\right]_t^\infty = 0 - (-e^{-\lambda t}) = e^{-\lambda t}$. The mean wait is $E[T] = 1/\lambda$, which is $1/0.1 = 10$ minutes.`,
        String.raw`The exponential distribution has a special feature called memorylessness. The chance of waiting longer does not depend on how long you have already waited. In symbols, $P(T > s + t \mid T > s) = P(T > t)$. The vertical bar means “given that.” A common misreading is that this makes the wait always the same. It does not. It means the remaining wait looks exactly like a fresh wait.`,
      ],
      example: [
        String.raw`With $\lambda = 0.1$, the chance of waiting more than 15 minutes is $S(15) = e^{-0.1 \times 15} = e^{-1.5} = 0.2231$. That is about 22.3 percent. The chance of waiting at most 15 minutes is $1 - 0.2231 = 0.7769$.`,
        String.raw`Now check memorylessness. Suppose you have already waited 5 minutes. The chance of waiting more than 15 minutes in total is $P(T > 15 \mid T > 5) = \frac{P(T > 15)}{P(T > 5)} = \frac{e^{-1.5}}{e^{-0.5}} = e^{-1} = 0.3679$. The second line uses the fact that the event $T > 15$ is inside the event $T > 5$. A fresh bus arrival has chance $S(10) = e^{-1} = 0.3679$ of waiting more than 10 minutes. The 5 minutes already waited changed nothing.`,
      ],
    },
    {
      step: 7,
      title: "The binomial distribution counts successes in fixed trials",
      content: [
        String.raw`Repeat a yes-or-no trial a fixed number of times, $n$. Each trial has the same chance $p$ of success. The trials are independent, which means the result of one trial does not change the chance of the next. Let $K$ be the number of successes. Then $K$ follows the binomial distribution with parameters $n$ and $p$. The coin count from step 1 is binomial with $n = 3$ and $p = 0.5$.`,
        String.raw`To find $P(K = k)$, first count the ways to get exactly $k$ successes in $n$ trials. That count is the binomial coefficient $\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$, where $n! = n \times (n-1) \times \cdots \times 1$. For example, $3! = 3 \times 2 \times 1 = 6$. Each specific sequence with $k$ successes has chance $p^k (1-p)^{n-k}$. So $P(K = k) = \binom{n}{k} p^k (1-p)^{n-k}$.`,
        String.raw`The mean and variance follow from step 4. Let $X_i$ equal 1 if trial $i$ is a success and 0 if not. Its mean is $E[X_i] = 0(1-p) + 1(p) = p$. Since $X_i^2 = X_i$, its variance is $E[X_i^2] - (E[X_i])^2 = p - p^2 = p(1-p)$. Now $K = X_1 + X_2 + \cdots + X_n$. By linearity, $E[K] = np$. Because the trials are independent, their variances add, so $\text{Var}(K) = np(1-p)$.`,
      ],
      example: [
        String.raw`Three flips with $p = 0.5$: $P(K = 2) = \binom{3}{2}(0.5)^2(0.5)^1 = 3 \times 0.25 \times 0.5 = 0.375$. This matches step 2. The mean is $np = 3 \times 0.5 = 1.5$, which matches step 4.`,
        String.raw`Ten patients, each with chance $p = 0.5$: $P(K = 8) = \binom{10}{8}(0.5)^{10} = 45/1024 = 0.0439$. The chance of at least 8 is $P(K \ge 8) = (45 + 10 + 1)/1024 = 56/1024 = 0.0547$. The mean is $np = 10 \times 0.5 = 5$, and the variance is $np(1-p) = 10 \times 0.5 \times 0.5 = 2.5$.`,
      ],
    },
    {
      step: 8,
      title: "Sampling: turn a uniform number into any distribution",
      content: [
        String.raw`A computer can produce a uniform random number $U$ between 0 and 1. Every value in that range is equally likely. The chance that $U$ is at most $u$ is $P(U \le u) = u$ for $0 \le u \le 1$, because this chance is the area of a rectangle of height 1 and width $u$. Can we turn $U$ into a number $X$ that follows another distribution, such as the exponential from step 6? Yes, by using the inverse of the CDF.`,
        String.raw`Here is the idea. A CDF $F$ rises from 0 to 1 as $x$ moves from left to right. Pick a height $u$ between 0 and 1, move across to the curve, and then drop straight down. You land at the number $x = F^{-1}(u)$, where $F^{-1}$ is the inverse function: it returns the $x$ whose CDF value is $u$. Where the density is high, the CDF rises quickly, so many uniform heights map to that region. That is why the samples follow the density.`,
        String.raw`The inverse transform theorem says this. Let $F$ be a CDF that is continuous and strictly increasing, and let $U$ be uniform on $[0, 1]$. Then $X = F^{-1}(U)$ has CDF $F$. To prove it, note that $F$ is increasing, so $X \le x$ holds exactly when $U \le F(x)$. Therefore $P(X \le x) = P(U \le F(x)) = F(x)$, using $P(U \le u) = u$ with $u = F(x)$. Strictly increasing is the key assumption: if $F$ has a flat part, the inverse is not unique, and the proof needs a different argument.`,
      ],
      example: [
        String.raw`Sample from an exponential distribution with $\lambda = 2$. Its CDF is $F(x) = 1 - e^{-2x}$. Set $u = 1 - e^{-2x}$, so $e^{-2x} = 1 - u$, and therefore $x = -\frac{\ln(1-u)}{2}$. If the computer produces $u = 0.60$, then $x = -\ln(0.40)/2 = -(-0.9163)/2 = 0.4581$.`,
        String.raw`Check: $F(0.4581) = 1 - e^{-2(0.4581)} = 1 - e^{-0.9163} = 1 - 0.40 = 0.60$, which is the uniform value we started with. Other draws behave the same way. For $u = 0.50$, $x = -\ln(0.5)/2 = 0.3466$. For $u = 0.90$, $x = -\ln(0.1)/2 = 1.1513$. Large uniform values give large waiting times, and the shape of the samples follows the exponential curve.`,
      ],
    },
  ],
};
