// Module 9 foundation, built from the ground up with worked examples.
export default {
  title: "Probability vs Likelihood and Maximum Likelihood Estimation",
  summary: "Probability and likelihood use the same formula, but they ask different questions. Probability fixes the model and asks how likely each outcome is. Likelihood fixes the observed data and asks how well each possible parameter value explains that data. Maximum likelihood estimation picks the parameter value with the highest likelihood, and it is one of the most widely used ways to estimate unknown quantities from samples.",
  steps: [
    {
      step: 1,
      title: "Probability: the model is fixed and the data vary",
      content: [
        String.raw`Suppose a coin lands heads with chance 0.5 on each flip. The chance of heads is a number between 0 and 1. We call this kind of unknown setting a parameter, and we write it as $p$. Here $p = 0.5$ is known and fixed. We flip the coin 10 times and ask a question about the data: how likely is it that we see exactly 7 heads?`,
        String.raw`Let us count it by hand. There are 120 different ways to choose which 7 of the 10 flips are heads. Each specific sequence of 10 flips has chance $0.5^{10}$, because each flip independently has chance 0.5 and the chances multiply. So the probability of exactly 7 heads is the number of ways times the chance of each way: $P(7 \mid p = 0.5) = 120 \times 0.5^{10}$.`,
        String.raw`In general, the number of ways to get $k$ heads in $n$ flips is written $\binom{n}{k}$, read “n choose k”. The probability of exactly $k$ heads in $n$ flips, when each flip has chance $p$, is $P(k \mid p) = \binom{n}{k} p^k (1-p)^{n-k}$. The vertical bar $\mid$ means “given that the parameter is” this value. A probability answers a question about outcomes: if the coin's chance is $p$, how often would each result appear?`,
      ],
      example: [
        String.raw`Check the arithmetic. $0.5^{10} = 1/1024 = 0.0009766$, and $120 \times 0.0009766 = 0.1172$. So if the coin is fair, there is about an 11.7 percent chance of exactly 7 heads in 10 flips.`,
        String.raw`Now try other counts with the same $p = 0.5$. The chance of 5 heads is $\binom{10}{5} \times 0.5^{10} = 252/1024 = 0.2461$, the largest single value. The chance of 0 heads is $1/1024 = 0.0010$. If you add the chances for every count from 0 to 10 heads, you get exactly 1, because some count must happen. Keep the formula $P(k \mid p)$ in mind, because step 3 uses the same formula with the roles reversed.`,
      ],
    },
    {
      step: 2,
      title: "For continuous data, probability is an area",
      content: [
        String.raw`Coins give counts, but many things are measured on a continuous scale, such as minutes. Imagine waiting for a bus. The wait could be 1.2 minutes, 2.73 minutes, or any other number above zero. For a continuous quantity, the chance of waiting exactly 2 minutes is zero, because there are infinitely many possible times. So we cannot list probabilities one by one as we did for coins.`,
        String.raw`Instead we use a density, which is a curve that shows how the outcomes are spread out. A distribution is the rule that tells us how likely each range of outcomes is. Assume the waiting times follow an exponential distribution with rate $\lambda = 0.5$ per minute. Here $\lambda$ (the Greek letter lambda) is the parameter, and it says how often buses come. The density is $f(x \mid \lambda) = \lambda e^{-\lambda x}$ for waiting times $x \ge 0$, where $e$ is about 2.718. On average the wait is $1/\lambda = 2$ minutes.`,
        String.raw`The key rule is this: the probability of a range of waiting times is the area under the density curve over that range. The height of the curve at a single point is not a probability. Only areas are probabilities. Here the curve is fixed by $\lambda$, and we measure how much of the curve lies between two times.`,
      ],
      example: [
        String.raw`The chance that the bus arrives between 1 and 3 minutes is the area under the curve from $x = 1$ to $x = 3$. Adding up that area (calculus calls this integration) gives $P(1 \le X \le 3 \mid \lambda = 0.5) = e^{-0.5} - e^{-1.5}$. With $e^{-0.5} = 0.6065$ and $e^{-1.5} = 0.2231$, we get $0.6065 - 0.2231 = 0.3834$. So about 38.3 percent of waiting times fall between 1 and 3 minutes.`,
        String.raw`The height at $x = 1$ is $f(1 \mid 0.5) = 0.5 \times e^{-0.5} = 0.5 \times 0.6065 = 0.3033$. This height is a density, not a probability. Over a very short window from $x = 1$ to $x = 1.01$, the area is about $0.3033 \times 0.01 = 0.0030$. The height tells us how fast area piles up at that point, while the area itself is the probability.`,
      ],
    },
    {
      step: 3,
      title: "Likelihood: the data are fixed and the parameter varies",
      content: [
        String.raw`Now turn the question around. Suppose we already flipped the coin 10 times and saw exactly 7 heads. The data are now fixed. We no longer know the coin's chance $p$, so we ask a new question: which value of $p$ best explains the 7 heads we observed? The measure of how well a value explains the data is called the likelihood.`,
        String.raw`The likelihood is written $L(p \mid 7 \text{ heads})$. It uses the same formula as step 1, $P(7 \mid p) = 120\,p^7(1-p)^3$, but we read it differently. The numbers 7 and 10 are now fixed, and $p$ is the variable. The output is a number that says how well each candidate value of $p$ explains the observed data. A larger number means a better explanation. The likelihood is a function of $p$, not a function of the outcomes.`,
        String.raw`The same idea works for a continuous model. Suppose one bus waited $x = 2$ minutes. In step 2, the density was $f(x \mid \lambda) = \lambda e^{-\lambda x}$. If we keep $x = 2$ fixed and let $\lambda$ vary, we get the likelihood $L(\lambda \mid x = 2) = \lambda e^{-2\lambda}$. The formula is identical; only our point of view has changed.`,
      ],
      example: [
        String.raw`Evaluate $L(p) = 120\,p^7(1-p)^3$ at four candidate values. At $p = 0.3$: $120 \times 0.3^7 \times 0.7^3 = 120 \times 0.0002187 \times 0.343 = 0.0090$. At $p = 0.5$: $120 \times 0.5^{10} = 0.1172$. At $p = 0.7$: $120 \times 0.7^7 \times 0.3^3 = 120 \times 0.08235 \times 0.027 = 0.2668$. At $p = 0.9$: $120 \times 0.9^7 \times 0.1^3 = 120 \times 0.4783 \times 0.001 = 0.0574$.`,
        String.raw`Among these four values, $p = 0.7$ gives the largest likelihood, 0.2668. The data are about 2.28 times as well explained at 0.7 as at 0.5, because $0.2668 / 0.1172 = 2.276$. The value 0.7 is exactly 7 out of 10, which is no accident. Step 6 proves that 0.7 is the exact peak.`,
        String.raw`For the bus, $L(\lambda) = \lambda e^{-2\lambda}$. At $\lambda = 0.1$: $0.1 \times e^{-0.2} = 0.1 \times 0.8187 = 0.0819$. At $\lambda = 0.5$: $0.5 \times e^{-1} = 0.5 \times 0.3679 = 0.1839$. At $\lambda = 1$: $e^{-2} = 0.1353$. The rate $\lambda = 0.5$ gives the largest value, and $0.5 = 1/2$ is one over the observed wait of 2 minutes.`,
      ],
    },
    {
      step: 4,
      title: "A likelihood is not a probability",
      content: [
        String.raw`Probability and likelihood use the same formula, so they are easy to confuse. The test is what adds up to 1. For a fixed $p$, the probabilities $P(k \mid p)$ over all outcomes $k = 0, 1, \dots, 10$ add to exactly 1. We checked this in step 1 for $p = 0.5$.`,
        String.raw`The likelihood over the parameter does not have to add up to 1. Take $L(p) = 120\,p^7(1-p)^3$ and let $p$ run over all values from 0 to 1. If it were a probability distribution over $p$, the total area under this curve would be 1. We compute that area with an integral, written $\int_0^1 L(p)\,dp$, which means adding up the curve's area over every small slice of $p$ between 0 and 1.`,
        String.raw`The area is $1/11$, not 1. So the likelihood curve is not a probability distribution over $p$. The useful thing about a likelihood is comparison. A bigger value means a better explanation, and a ratio of two values tells us how many times better one explanation is than another. The absolute height has no probability meaning by itself.`,
        String.raw`Common misreading: “The probability that $p$ equals 0.7 is 0.2668” is wrong. The number 0.2668 is a likelihood, and it is not the chance that $p$ equals 0.7. In the classical view used here, $p$ is a fixed unknown number, and chance does not pick its value.`,
      ],
      example: [
        String.raw`Check the area. A fine grid with one million slices, each of width 0.000001, adds up to 0.0909, which matches $1/11 = 0.0909$. The exact answer comes from the Beta integral: $\int_0^1 120\,p^7(1-p)^3\,dp = 120 \times \frac{7!\,3!}{11!} = 120 \times \frac{5040 \times 6}{39916800} = 120 \times \frac{1}{1320} = \frac{1}{11}$.`,
        String.raw`Check the ratio: $L(0.7) / L(0.5) = 0.2668 / 0.1172 = 2.28$. This ratio is meaningful even though neither number is a probability. It says the data favor $p = 0.7$ over $p = 0.5$ by a factor of about 2.28.`,
      ],
    },
    {
      step: 5,
      title: "Many observations multiply, so we take logs",
      content: [
        String.raw`Real samples have many observations. Consider 10 flips in a specific order: H H H H H H H T T T. Each head contributes a factor $p$ and each tail contributes a factor $1-p$. Independent flips do not affect each other, so their chances multiply. The likelihood of this exact sequence is $p \times p \times \cdots \times (1-p) \times (1-p) \times (1-p) = p^7(1-p)^3$. For any whole sample, the likelihood is a product with one factor per observation.`,
        String.raw`Products have two problems. First, when many numbers smaller than 1 are multiplied, the result shrinks very quickly, and a computer can lose it altogether. Second, products are harder to differentiate than sums. The natural logarithm, written $\ln$, solves both problems because $\ln(ab) = \ln a + \ln b$ turns a product into a sum. We define the log-likelihood as $\ell(p) = \ln L(p)$.`,
        String.raw`The logarithm is an increasing function. If $L(p_1)$ is bigger than $L(p_2)$, then $\ln L(p_1)$ is bigger than $\ln L(p_2)$. So the value of $p$ that makes $\ell$ largest is the same value that makes $L$ largest. We may therefore work with whichever is easier. The peak stays in the same place.`,
      ],
      example: [
        String.raw`Take $p = 0.7$. The likelihood of the sequence is $L = 0.7^7 \times 0.3^3 = 0.08235 \times 0.027 = 0.002224$. The log-likelihood is $\ell = 7\ln(0.7) + 3\ln(0.3) = 7 \times (-0.3567) + 3 \times (-1.2040) = -2.4967 - 3.6119 = -6.1086$. Check: $e^{-6.1086} = 0.002224$, so the two calculations agree.`,
        String.raw`Now compare three values using the log, which is easier to read. At $p = 0.5$, $\ell = 10\ln(0.5) = -6.9315$. At $p = 0.7$, $\ell = -6.1086$. At $p = 0.9$, $\ell = 7\ln(0.9) + 3\ln(0.1) = -0.7375 - 6.9078 = -7.6453$. The largest log-likelihood is $-6.1086$, at $p = 0.7$, the same winner as before.`,
        String.raw`The underflow problem is real. Multiply 400 probabilities, each equal to 0.01: the product is $0.01^{400} = 10^{-800}$. The smallest positive number a standard double-precision computer can store is about $5 \times 10^{-324}$, so the product is reported as 0. The log-likelihood is $\ln(0.01^{400}) = 400 \times \ln(0.01) = 400 \times (-4.6052) = -1842.07$, an ordinary number that the computer can store.`,
      ],
    },
    {
      step: 6,
      title: "Find the peak: set the slope to zero",
      content: [
        String.raw`In steps 3 and 5 we compared values one at a time, and $p = 0.7$ won among the candidates we tried. We want the exact peak. At the top of a smooth curve, the curve stops rising and starts falling, so its slope is zero there. The slope of the log-likelihood is its derivative, written $\ell'(p) = d\ell/dp$. We find the peak by setting $\ell'(p) = 0$ and solving for $p$. This slope is called the score.`,
        String.raw`Now do the same for any number of flips. Let $n$ be the number of flips and $k$ the number of heads. The log-likelihood is $\ell(p) = \ln\binom{n}{k} + k\ln p + (n-k)\ln(1-p)$. The first term does not contain $p$, so its slope is zero and it does not move the peak. The derivative of $\ln p$ is $1/p$. The derivative of $\ln(1-p)$ is $-1/(1-p)$, because the chain rule, which handles a function inside another function, adds an extra minus sign. So the score is $\ell'(p) = \frac{k}{p} - \frac{n-k}{1-p}$.`,
        String.raw`Set the score to zero and solve. Multiply both sides by $p(1-p)$ to get $k(1-p) = (n-k)p$. Expand both sides: $k - kp = np - kp$. Add $kp$ to both sides to get $k = np$. Divide by $n$. We write the result with a hat, $\hat{p}$ (read “p-hat”), to mean the value of $p$ computed from the data: $\hat{p} = k/n$. The estimate is simply the observed fraction of heads.`,
        String.raw`Check that this point is a peak and not a valley. The second derivative is $\ell''(p) = -\frac{k}{p^2} - \frac{n-k}{(1-p)^2}$. When $0 < k < n$ and $0 < p < 1$, both terms are negative, so $\ell''(p) < 0$ everywhere. A curve with this property bends downward like an upside-down bowl, so it has one peak and no other turning point.`,
      ],
      example: [
        String.raw`For 7 heads in 10 flips, the score is $\ell'(p) = \frac{7}{p} - \frac{3}{1-p}$. Test three values. At $p = 0.5$: $7/0.5 - 3/0.5 = 14 - 6 = 8$, which is positive, so the curve is still rising. At $p = 0.9$: $7/0.9 - 3/0.1 = 7.78 - 30 = -22.2$, which is negative, so the curve is falling. At $p = 0.7$: $7/0.7 - 3/0.3 = 10 - 10 = 0$. The slope changes from positive to negative through 0.7, so 0.7 is the peak.`,
        String.raw`The general formula agrees: $\hat{p} = k/n = 7/10 = 0.7$. Check the second derivative at $p = 0.7$: $-7/0.7^2 - 3/0.3^2 = -7/0.49 - 3/0.09 = -14.29 - 33.33 = -47.6$. That is negative, which confirms a peak. For a different sample, 32 heads in 50 flips gives $\hat{p} = 32/50 = 0.64$. The score there is $32/0.64 - 18/0.36 = 50 - 50 = 0$.`,
      ],
    },
    {
      step: 7,
      title: "The general recipe and the normal distribution",
      content: [
        String.raw`Here is the general method. An estimate is a number computed from data that stands in for an unknown parameter. Suppose we have independent observations $x_1, \dots, x_n$ from a density $f(x \mid \theta)$, where $\theta$ is a parameter. The log-likelihood is the sum $\ell(\theta) = \sum_{i=1}^n \ln f(x_i \mid \theta)$. The maximum likelihood estimate (MLE), $\hat{\theta}$, is the value of $\theta$ that maximizes $\ell$: $\hat{\theta} = \operatorname{argmax}_\theta\, \ell(\theta)$. We find it by solving the score equation $\ell'(\theta) = 0$. A zero slope with a negative second derivative means a peak: the curve rises just before that point and falls just after it. Since $\ln$ is increasing, the peak of $\ell$ is also the peak of $L$.`,
        String.raw`Exponential case, with $f(x \mid \lambda) = \lambda e^{-\lambda x}$. Each term is $\ln f(x_i \mid \lambda) = \ln\lambda - \lambda x_i$, so
$$\ell(\lambda) = \sum_{i=1}^n (\ln\lambda - \lambda x_i) = n\ln\lambda - \lambda\sum_{i=1}^n x_i.$$
The score is $\ell'(\lambda) = \frac{n}{\lambda} - \sum_{i=1}^n x_i$. Setting it to zero gives $\frac{n}{\hat\lambda} = \sum_{i=1}^n x_i$, so $\hat\lambda = \frac{n}{\sum x_i} = \frac{1}{\bar{x}}$, where $\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i$ is the sample mean.`,
        String.raw`Normal case. For $x_i \sim \mathcal{N}(\mu, \sigma^2)$, the log-likelihood is $\ell(\mu, \sigma^2) = -\frac{n}{2}\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^n (x_i - \mu)^2$. The slope in $\mu$ is $\frac{1}{\sigma^2}\sum_{i=1}^n (x_i - \mu)$, which is zero when $\hat\mu = \bar{x}$. Put $\hat\mu$ in and write $v = \sigma^2$ and $S = \sum_{i=1}^n (x_i - \bar{x})^2$. The slope in $v$ is $-\frac{n}{2v} + \frac{S}{2v^2}$. Setting it to zero and multiplying by $2v^2$ gives $nv = S$, so $\hat\sigma^2 = \frac{1}{n}\sum_{i=1}^n (x_i - \bar{x})^2$. This divides by $n$, not by $n-1$.`,
        String.raw`Two facts are worth remembering. First, the MLE of the variance is biased low. Its average over repeated samples is $\frac{n-1}{n}\sigma^2$, which is slightly below the true $\sigma^2$, and the gap shrinks as $n$ grows. Second, for large samples under standard conditions (a smooth density, a parameter not stuck at the edge of its allowed range, and a range of possible values that does not depend on the parameter), the MLE settles near the true value, and its spread approaches the smallest possible for any estimator, the Cramér-Rao bound. The method can break when the peak sits at the edge of the allowed range, as with 10 heads in 10 flips, where $\hat p = 1$, or when the score equation has no closed-form solution and a computer must search for the peak. Remember this: the maximum likelihood estimate is the parameter value at which the log-likelihood peaks, and you find it by setting the slope of the log-likelihood to zero.`,
      ],
      example: [
        String.raw`Waiting times in minutes for four buses are 2, 3, 5, and 10. Here $n = 4$ and $\sum x_i = 20$, so $\bar{x} = 20/4 = 5$ and $\hat\lambda = 1/5 = 0.2$ per minute. Check the score: $4/0.2 - 20 = 20 - 20 = 0$. Check the log-likelihood: $\ell(0.2) = 4\ln(0.2) - 0.2 \times 20 = -6.4378 - 4 = -10.4378$, while $\ell(0.25) = 4\ln(0.25) - 0.25 \times 20 = -5.5452 - 5 = -10.5452$. The value at 0.2 is higher, as the derivation predicts.`,
        String.raw`Take the data 2, 4, and 6. Here $n = 3$, $\bar{x} = 4$, and $S = (2-4)^2 + (4-4)^2 + (6-4)^2 = 4 + 0 + 4 = 8$. So $\hat\mu = 4$ and $\hat\sigma^2 = 8/3 = 2.67$. Check the variance score at $v = 8/3$: $-\frac{3}{2 \times 2.667} + \frac{8}{2 \times 2.667^2} = -0.5625 + 0.5625 = 0$. The usual sample variance divides by $n - 1 = 2$ instead, giving $8/2 = 4.00$, which is larger.`,
        String.raw`The bias is a real effect. With $n = 3$, the average MLE variance over many samples is $\frac{n-1}{n}\sigma^2 = \frac{2}{3}\sigma^2$. If the true variance were $\sigma^2 = 4$, the MLE would average $\frac{2}{3} \times 4 = 2.67$, which is below the truth.`,
      ],
    },
  ],
};
