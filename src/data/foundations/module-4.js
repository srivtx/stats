// Module 4 foundation, built from the ground up with worked examples.
export default {
  title: String.raw`The Central Limit Theorem, Bootstrapping and Resampling`,
  summary: String.raw`Statistics asks what would happen if we repeated our study many times, but we almost never can. This module shows that averages of measurements follow a predictable bell-shaped pattern, even when the original measurements are lopsided. That result is the Central Limit Theorem. It then shows how to use the one sample we have, by resampling it with replacement (the bootstrap), to measure uncertainty and test claims when no formula is available. Finally it explains what a 95% confidence interval actually promises.`,
  steps: [
    {
      step: 1,
      title: String.raw`Averages wobble from sample to sample`,
      content: [
        String.raw`Imagine a fair six-sided die. Each roll gives a whole number from 1 to 6, and each face is equally likely. Roll it three times. Suppose you get 2, 6, and 4. Their average is $(2 + 6 + 4)/3 = 12/3 = 4$. We call the average of a sample the sample mean and write it as $\bar{x}$ (read “x bar”). For this sample, $\bar{x} = 4$.`,
        String.raw`Now roll the die three more times. This time you get 1, 1, and 6. The sample mean is $(1 + 1 + 6)/3 = 8/3 \approx 2.67$. Roll three more times and get 3, 5, and 3. The sample mean is $(3 + 5 + 3)/3 = 11/3 \approx 3.67$. It is the same die and the same number of rolls, yet we got three different averages. The sample mean is not fixed. It changes from one sample to the next.`,
        String.raw`The die itself has a fixed center. Its population mean, written $\mu$ (the Greek letter mu), is the average of all six faces, each weighted by its chance of appearing. Here that is $\mu = (1+2+3+4+5+6)/6 = 21/6 = 3.5$. None of our three samples equals 3.5 exactly, but they all land near it. The central question of this module is: how do sample averages spread around $\mu$, and can we predict that spread?`,
      ],
      example: [
        String.raw`Check the arithmetic with a calculator. $1 + 2 + 3 + 4 + 5 + 6 = 21$, and $21/6 = 3.5$. Now compare each sample mean with 3.5. The distances are $4 - 3.5 = +0.50$, $2.67 - 3.5 = -0.83$, and $3.67 - 3.5 = +0.17$. All three distances are less than 1 in size, but they have different signs and different sizes.`,
        String.raw`Each sample mean is a random quantity, because the next three rolls could give a different number. The collection of all sample means you could get from all possible samples of size 3, together with how often each one occurs, is called the sampling distribution of the sample mean. A distribution here simply means a list of possible values together with how likely each one is. Our job is to describe this sampling distribution.`,
      ],
    },
    {
      step: 2,
      title: String.raw`Averaging two dice narrows the spread`,
      content: [
        String.raw`Keep the same die, with faces 1 to 6 and population mean $\mu = 3.5$. This time take samples of size 2: roll the die twice and average the two numbers. There are $6 \times 6 = 36$ equally likely pairs of rolls, because each first roll can go with any of the six second rolls. We can therefore list every possible average and count how many pairs produce it. Dividing each count by 36 gives a probability.`,
        String.raw`The pair (1, 1) has average 1. Only one of the 36 pairs does this, so $P(\bar{x} = 1) = 1/36$. The average 1.5 comes from (1, 2) and (2, 1), so $P(\bar{x} = 1.5) = 2/36$. The average 2 comes from (1, 3), (2, 2), and (3, 1), so $P(\bar{x} = 2) = 3/36$. Continuing in the same way, the probabilities are $4/36$ for 2.5, $5/36$ for 3, $6/36$ for 3.5, $5/36$ for 4, $4/36$ for 4.5, $3/36$ for 5, $2/36$ for 5.5, and $1/36$ for 6.`,
        String.raw`Compare this with a single die, where each face has probability $1/6$ and the shape is perfectly flat. The two-dice averages form a peak. Most of their probability, $24/36 = 2/3$, sits between 2.5 and 4.5, and the peak is at 3.5. Averages land near the center more often than single rolls do, because an extreme average needs both dice to be extreme in the same direction. Averaging two rolls has already made the sample mean less wild.`,
      ],
      example: [
        String.raw`Check the total: $1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1 = 36$, so the probabilities add to $36/36 = 1$. Check the center: the probability-weighted average is $(1 \times 1 + 1.5 \times 2 + 2 \times 3 + 2.5 \times 4 + 3 \times 5 + 3.5 \times 6 + 4 \times 5 + 4.5 \times 4 + 5 \times 3 + 5.5 \times 2 + 6 \times 1)/36 = 126/36 = 3.5$.`,
        String.raw`Compare the tails. For one die, $P(X \ge 5) = 2/6 = 0.333$, because faces 5 and 6 qualify. For the average of two dice, $P(\bar{x} \ge 5) = (3 + 2 + 1)/36 = 6/36 = 0.167$, because the averages 5, 5.5, and 6 have counts 3, 2, and 1. Averaging two rolls cut the chance of an extreme value in half.`,
      ],
    },
    {
      step: 3,
      title: String.raw`The standard error shrinks with the square root of n`,
      content: [
        String.raw`Step 2 found the spread of two-dice averages by listing all 36 pairs. We need a rule that works for any sample size. Start with one die. The variance, written $\sigma^2$ (sigma squared), is the average squared distance of the values from the mean. The standard deviation $\sigma$ is its square root, a typical distance from the mean in the original units. For one die, the six distances from 3.5 are $-2.5, -1.5, -0.5, +0.5, +1.5, +2.5$. Their squares are $6.25, 2.25, 0.25, 0.25, 2.25, 6.25$, and these sum to $17.5$. So $\sigma^2 = 17.5/6 = 35/12 \approx 2.917$ and $\sigma \approx 1.708$.`,
        String.raw`Now take $n$ rolls and call the $i$th roll $X_i$. The rolls are independent, which means one roll does not change the odds for the others. We write $\text{Var}(X)$ for the variance of a quantity $X$. The variance of a sum of independent quantities is the sum of their variances, so $\text{Var}(X_1 + \dots + X_n) = \sigma^2 + \dots + \sigma^2 = n\sigma^2$. The sample mean is the sum divided by $n$. Multiplying a quantity by a constant $c$ multiplies its variance by $c^2$, so $\text{Var}(\bar{X}) = \frac{1}{n^2} \cdot n\sigma^2 = \frac{\sigma^2}{n}$.`,
        String.raw`The standard deviation of the sample mean is called the standard error, written $\text{SE}$. Taking the square root gives $\text{SE} = \frac{\sigma}{\sqrt{n}}$. Read this as: the typical wobble of a sample mean shrinks with the square root of the sample size. To cut the wobble in half, you need four times as many observations, not twice as many.`,
      ],
      example: [
        String.raw`Two dice: $\text{SE} = 1.708/\sqrt{2} = 1.708/1.414 = 1.208$. In step 2 we found the spread of the 36 two-dice averages directly: $\sqrt{1.458} = 1.208$. The formula and the direct count agree.`,
        String.raw`Thirty-six rolls: $\text{SE} = 1.708/\sqrt{36} = 1.708/6 = 0.285$. Four rolls: $1.708/\sqrt{4} = 0.854$. Sixteen rolls: $1.708/\sqrt{16} = 0.427$. Going from 4 rolls to 16 rolls multiplies the sample size by 4, and the standard error is halved, from 0.854 to 0.427.`,
      ],
    },
    {
      step: 4,
      title: String.raw`Averages of a lopsided population look bell-shaped`,
      content: [
        String.raw`Dice are symmetric, so their averages look bell-shaped quickly. Now try a population that is badly lopsided. Picture a large bag of items where 90 out of every 100 items have value 0 and 10 out of every 100 have value 10. Draw one item at random. Its value is 10 with probability $0.1$ and 0 with probability $0.9$. The shape is very skewed: a tall spike at 0 and a thin spike at 10, with nothing in between.`,
        String.raw`The expected value $E[X]$ is the average of a random quantity, weighting each possible value by its probability. For this bag, $\mu = E[X] = 0.9 \times 0 + 0.1 \times 10 = 1$. The variance is $\sigma^2 = E[(X - \mu)^2]$, which can also be computed as $E[X^2] - \mu^2$. Here $E[X^2] = 0.9 \times 0 + 0.1 \times 100 = 10$, so $\sigma^2 = 10 - 1^2 = 9$ and $\sigma = 3$.`,
        String.raw`Now draw $n = 100$ items and compute the sample mean $\bar{x}$. Each 10 adds 10 to the total and each 0 adds nothing, so $\bar{x} = 10K/100 = K/10$, where $K$ is the number of 10s in the sample. The event $\bar{x} \ge 1.3$ is therefore the same event as $K \ge 13$. The Central Limit Theorem (CLT) says that for a large enough sample, the sample mean is approximately normally distributed, meaning it follows the familiar bell curve with mean $\mu$ and standard error $\sigma/\sqrt{n}$. This holds no matter how lopsided the original population was. Here $\sigma/\sqrt{n} = 3/10 = 0.3$.`,
      ],
      example: [
        String.raw`The exact probability $P(\bar{x} \ge 1.3) = P(K \ge 13)$ is the sum of the binomial terms $\binom{100}{k}(0.1)^k(0.9)^{100-k}$ for $k = 13$ up to $100$. A calculator sum gives $0.198$. The normal approximation uses $z = (1.3 - 1)/0.3 = 1.00$, and $1 - \Phi(1.00) = 1 - 0.8413 = 0.159$. Here $\Phi(z)$ is the area under the standard normal bell curve to the left of $z$.`,
        String.raw`The approximation is too low by about 4 percentage points. Part of the reason is that the population is lopsided, and $n = 100$ is only a modest sample for it. A continuity correction moves the cutoff halfway between the whole numbers 12 and 13, to 12.5. That gives $z = (1.25 - 1)/0.3 = 0.833$ and $1 - \Phi(0.833) = 0.202$, close to the exact 0.198. In the lower tail, the exact value is $P(\bar{x} \le 0.5) = P(K \le 5) = 0.0576$, while the normal approximation gives $\Phi(-1.667) = 0.0478$.`,
      ],
    },
    {
      step: 5,
      title: String.raw`Bootstrap: resample your own sample with replacement`,
      content: [
        String.raw`Step 4 knew the population. In real life we do not, and we have only one sample. We cannot repeat the study a thousand times. The bootstrap, introduced by the statistician Bradley Efron in 1979, makes a simple substitution: treat our sample as a stand-in for the population, and draw new samples from it. It does not require a formula for the spread of the sample mean.`,
        String.raw`Resampling with replacement works like this. Write each value on a card. Draw one card, record its value, and put the card back. Repeat until you have $n$ values. A bootstrap sample has the same size as the original sample, but some values may appear twice and others not at all. Each bootstrap sample has its own sample mean.`,
        String.raw`Repeat the resampling many times, say $B = 1000$ times. The collection of the $B$ bootstrap means approximates the sampling distribution from step 1, built only from the data we have. Its spread estimates the standard error. The bootstrap is a simulation that uses the sample in place of the population.`,
      ],
      example: [
        String.raw`Our sample has three values: 2, 4, and 9. The sample mean is $\bar{x} = (2 + 4 + 9)/3 = 15/3 = 5$. The deviations from the mean are $-3$, $-1$, and $+4$, with squares $9$, $1$, and $16$ that sum to $26$. The sample variance is $s^2 = 26/(3 - 1) = 13$, so $s = \sqrt{13} = 3.61$. The textbook standard error is $s/\sqrt{n} = 3.61/\sqrt{3} = 2.08$.`,
        String.raw`Now resample. With three cards drawn three times, there are $3 \times 3 \times 3 = 27$ equally likely ordered draws. Three of them: (2, 2, 2) gives mean $6/3 = 2.00$; (2, 4, 9) gives $15/3 = 5.00$; (9, 9, 4) gives $22/3 = 7.33$. Listing all 27 gives these means, with the number of draws that produce each: 2.00 (1), 2.67 (3), 3.33 (3), 4.00 (1), 4.33 (3), 5.00 (6), 5.67 (3), 6.67 (3), 7.33 (3), 9.00 (1). The counts add to 27, and the mean of the 27 means is exactly 5. Their standard deviation is $\sqrt{26/9} = 1.70$.`,
        String.raw`Common misreading: the bootstrap spread, 1.70, is smaller than the textbook 2.08. The reason is the divisor. The bootstrap variance of the mean is $\frac{1}{n^2}\sum (x_i - \bar{x})^2 = \frac{26}{9}$, while $s^2/n = 13/3$ divides by $n - 1$ instead. The ratio is $\frac{26/9}{13/3} = \frac{2}{3}$, so the bootstrap standard deviation is $\sqrt{2/3} \times 2.08 = 0.816 \times 2.08 = 1.70$. With small samples this difference is noticeable; with large samples it fades.`,
      ],
    },
    {
      step: 6,
      title: String.raw`Confidence intervals and what 95% really promises`,
      content: [
        String.raw`A confidence interval is a range computed from the data that is designed to contain the unknown population mean $\mu$. The interval changes from one study to the next, because it depends on the sample. The population mean does not change; it is a fixed number that we are trying to pin down. A 95% confidence interval is produced by a method that, across many repeated studies, traps the fixed $\mu$ in about 95 out of every 100 intervals.`,
        String.raw`The simplest bootstrap interval is the percentile interval. Take $B$ bootstrap means, sort them from smallest to largest, and read off the value 2.5% of the way up the list and the value 97.5% of the way up. Those two numbers form the 95% interval. With $B = 1000$, the 2.5% position is the 25th sorted value and the 97.5% position is the 975th, because $0.025 \times 1000 = 25$ and $0.975 \times 1000 = 975$.`,
        String.raw`A formula-based interval uses the same structure: estimate $\pm$ (cutoff) $\times$ (standard error). The cutoff $t^*$ comes from the t distribution, a bell-shaped curve with heavier tails than the normal curve, whose exact shape depends on the degrees of freedom. The degrees of freedom are the number of values free to vary once the mean is fixed. For a sample of $n$ values, that is $n - 1$. The t cutoff is slightly wider than 1.96 because we estimated $\sigma$ from the same sample.`,
      ],
      example: [
        String.raw`Take $n = 25$ values with mean $\bar{x} = 50$ and sample standard deviation $s = 10$. The standard error is $s/\sqrt{n} = 10/5 = 2.0$. The degrees of freedom are $25 - 1 = 24$, and the 95% cutoff from the t table is $t^* = 2.064$. The margin of error is $2.064 \times 2.0 = 4.128$. The interval runs from $50 - 4.128 = 45.87$ to $50 + 4.128 = 54.13$, written $[45.87, 54.13]$.`,
        String.raw`What does the 95% mean here? It does not mean that $\mu$ has a 95% chance of lying in $[45.87, 54.13]$. Once the interval is computed, $\mu$ is either inside it or not. The 95% describes the method. To check this, we ran a computer simulation of 20,000 studies. Each study drew 25 values from a normal population with mean 10 and standard deviation 10, and built an interval the same way. In the simulation, 95.1% of the intervals contained the true mean of 10, which is what the method promises.`,
      ],
    },
    {
      step: 7,
      title: String.raw`A permutation test and the bootstrap p-value`,
      content: [
        String.raw`Step 6 estimated a difference with an interval. Now we test a claim. The null hypothesis $H_0$ is the skeptical claim that nothing is going on: the two groups come from the same population, so the group labels carry no information. The p-value is the probability, if $H_0$ were true, of a result at least as extreme as the one we observed. A small p-value means the observed result is hard to explain by chance alone.`,
        String.raw`If $H_0$ is true, the labels are arbitrary, so shuffling them should produce differences similar to the one we saw. The permutation test does exactly this: pool all the values, reshuffle which values belong to each group many times, and count how often a shuffled difference is at least as large as the observed one. The bootstrap version first shifts both groups so their means match, which builds a world where $H_0$ holds, and then resamples with replacement. Its p-value is $p = (1 + \text{count})/(B + 1)$, where count is the number of resamples at least as extreme. Adding one to the top and to the bottom keeps the p-value from being exactly zero.`,
        String.raw`A common misreading: the p-value is not the probability that $H_0$ is true. It is a probability computed while assuming $H_0$. A p-value also does not measure how large or important an effect is.`,
      ],
      example: [
        String.raw`Group A: 10, 12, 14, with mean 12. Group B: 16, 18, 20, with mean 18. The observed difference is $18 - 12 = 6$. Pool the six values: 10, 12, 14, 16, 18, 20. Choosing which three values go into group A gives $\binom{6}{3} = \frac{6 \times 5 \times 4}{3 \times 2 \times 1} = 20$ equally likely labelings. With only 20 labelings, we can list all of them and skip the random shuffles.`,
        String.raw`For a labeling whose group A sum is $S_A$, the group B sum is $90 - S_A$, and the difference in means is $\frac{S_A}{3} - \frac{90 - S_A}{3} = \frac{2S_A - 90}{3}$. A difference of size at least 6 needs $|2S_A - 90| \ge 18$, that is, $S_A \le 36$ or $S_A \ge 54$. Only $\{10, 12, 14\}$ (sum 36) and $\{16, 18, 20\}$ (sum 54) qualify. So 2 of the 20 labelings are as extreme as the observed split, and the p-value is $p = 2/20 = 0.10$. Because $0.10 > 0.05$, we do not reject $H_0$ at the 5% level.`,
      ],
    },
    {
      step: 8,
      title: String.raw`The Central Limit Theorem, stated and derived`,
      content: [
        String.raw`Now we state the theorem that explains step 4. Let $X_1, X_2, \dots, X_n$ be independent draws from one population with mean $\mu$ and finite variance $\sigma^2$. Finite variance means $\sigma^2$ is a real number, not infinity. Step 3 showed that $\text{Var}(\bar{X}) = \sigma^2/n$, and $E[\bar{X}] = \mu$ holds because the expected value of a sum is the sum of the expected values, divided by $n$. Define the standardized sample mean $Z_n = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}}$, which measures how many standard errors the sample mean lies from $\mu$. The Central Limit Theorem says that for every number $z$, $P(Z_n \le z) \to \Phi(z)$ as $n \to \infty$. In words: $Z_n$ approaches the standard normal distribution, which has mean 0 and variance 1.`,
        String.raw`Here is the derivation of the first two moments. Write $Y_i = \frac{X_i - \mu}{\sigma}$. Then $E[Y_i] = \frac{E[X_i] - \mu}{\sigma} = 0$ and $E[Y_i^2] = \frac{E[(X_i - \mu)^2]}{\sigma^2} = 1$. Since $Z_n = \frac{1}{\sqrt{n}} \sum_{i=1}^n Y_i$, we have $E[Z_n] = 0$. Because the $Y_i$ are independent, $\text{Var}(Z_n) = \frac{1}{n} \sum_{i=1}^n \text{Var}(Y_i) = \frac{1}{n} \cdot n \cdot 1 = 1$. The mean and variance of $Z_n$ are fixed for every $n$, so the theorem is really about the shape.`,
        String.raw`The shape comes from the Fourier transform of the distribution, defined for a variable $Y$ as $\varphi_Y(s) = E[e^{isY}]$, where $i = \sqrt{-1}$ and $e^{isY}$ is a unit arrow that rotates in the plane as $s$ changes. Two facts do the work. First, $\varphi_Y$ determines the distribution of $Y$. Second, for independent summands, the transform of the sum is the product of the individual transforms. Expanding $e^{isY} = 1 + isY - \frac{s^2 Y^2}{2} + \dots$ and taking expectations, with $E[Y] = 0$ and $E[Y^2] = 1$, gives $\varphi_Y(s) = 1 - \frac{s^2}{2} + o(s^2)$. Here $o(s^2)$ stands for any term that shrinks faster than $s^2$ as $s$ approaches 0.`,
        String.raw`Now $Z_n = \frac{1}{\sqrt{n}}\sum Y_i$, so $\varphi_{Z_n}(t) = \left[\varphi_Y\left(\frac{t}{\sqrt{n}}\right)\right]^n$. Substituting $s = t/\sqrt{n}$ gives $\varphi_Y(t/\sqrt{n}) = 1 - \frac{t^2}{2n} + o\left(\frac{1}{n}\right)$. Using the limit $(1 + a/n)^n \to e^a$, we get $\varphi_{Z_n}(t) \to e^{-t^2/2}$. This is exactly the transform of the standard normal distribution. Convergence of these transforms implies convergence of the distributions, a standard result we use without proof, so $Z_n$ approaches the standard normal. The argument needs finite variance: the Cauchy distribution, a bell shape with extremely heavy tails, has no finite mean or variance. The average of $n$ Cauchy values has the same Cauchy distribution for every $n$, so averaging never narrows the spread and no bell forms. The approximation is also weak for small $n$ with a very skewed population, and it fails when the values are not independent.`,
      ],
      example: [
        String.raw`Check the theorem with the dice: $\mu = 3.5$, $\sigma = 1.708$, and $n = 36$, so $\text{SE} = 0.285$. Suppose the 36 rolls average $\bar{x} = 3.8$. Then $Z_{36} = (3.8 - 3.5)/0.285 = 0.3/0.285 = 1.05$. The normal approximation says $P(Z_{36} \le 1.05) \approx \Phi(1.05) = 0.853$, so a sample mean of 3.8 or less would occur about 85% of the time.`,
        String.raw`Check the variance identity with the lopsided bag from step 4. There $\sigma^2 = 9$ and $n = 100$, so $\text{Var}(\bar{X}) = 9/100 = 0.09$ and $\text{SE} = \sqrt{0.09} = 0.3$, which matches $\sigma/\sqrt{n} = 3/10 = 0.3$. The one thing to remember: when measurements are independent and have finite variance, their average is approximately normal with mean $\mu$ and standard error $\sigma/\sqrt{n}$, however lopsided the original data are, and that is what lets us build confidence intervals and p-values from a single sample.`,
      ],
    },
  ],
};
