// Module 5 foundation, built from the ground up with worked examples.
export default {
  title: "Hypothesis Testing, P-Values and Significance",
  summary: "Hypothesis testing asks whether data show a real effect or only random chance. It starts with a skeptical default, the null hypothesis, which says that nothing special is happening. The p-value measures how surprising our data would be if that default were true, and a small p-value is our reason to give it up. This module builds these ideas from a single coin, then adds t-tests, one-tailed and two-tailed tests, and the 0.05 threshold.",
  steps: [
    {
      step: 1,
      title: "Start with a model: a fair coin",
      content: [
        String.raw`Suppose a friend hands you a coin and says it is fair. You flip it 10 times and get 9 heads. Is the coin really fair, or did you just get lucky? To answer that question we need a rule that says what a fair coin should do. A rule like that is called a model.`,
        String.raw`A model is a simple description of how something works, written so that we can make predictions from it. Our model says that each flip lands heads with a fixed chance and that one flip does not change the next. We call that chance of heads $\theta$ (the Greek letter theta). For a fair coin, $\theta = 0.5$, which means heads and tails are equally likely on every flip. The number $\theta$ is a parameter: a fixed number that describes the coin.`,
        String.raw`Every model simplifies reality. A real coin is never perfectly balanced, and a real flip depends on air and hand motion. The statistician George Box put it this way: “All models are wrong, but some are useful.” Our fair-coin model is wrong in tiny ways, but it is useful because it makes a clear prediction that we can check against the 10 flips.`,
      ],
      example: [
        String.raw`Under the fair-coin model, what do we expect? “Expected” means the average result over many repeats. If we repeated the 10 flips over and over, the average number of heads would be half of 10. Calculation: $$\text{expected heads} = 10 \times 0.5 = 5.$$`,
        String.raw`We observed 9 heads. The gap between what we observed and what the model expects is $9 - 5 = 4$ heads. Is a gap of 4 heads big enough to doubt the model? We cannot answer that yet. We need to know how often a fair coin would produce a gap that large, and steps 2 to 4 build the tool for that.`,
      ],
    },
    {
      step: 2,
      title: "The null hypothesis is the skeptic",
      content: [
        String.raw`A hypothesis is a specific claim about the world that data can test. Hypothesis testing begins by naming two of them. The first is the null hypothesis, written $H_0$ (read “H naught”). It is the skeptical default: nothing special is happening, and any difference we see is just random chance. For the coin, the null hypothesis says the coin is fair: $$H_0: \theta = 0.5.$$`,
        String.raw`Think of the null hypothesis as a skeptic who must be convinced. The skeptic says, “Nothing interesting is going on here.” We only give up the skeptic’s view if the data would be very hard to explain by chance alone. Until then, the skeptic stays in charge. This is why the null hypothesis is the default and the claim we test, not the claim we hope to prove.`,
        String.raw`The second claim is the alternative hypothesis, written $H_1$. It says that something is going on. For the coin, the alternative is that the coin is not fair, so $\theta \neq 0.5$. The two claims cover all possibilities, and they cannot both be true. Step 3 looks at the alternative more closely.`,
      ],
      example: [
        String.raw`What does $H_0$ predict for 10 flips? There are $2^{10} = 1024$ equally likely sequences of 10 flips. Of these, 210 have exactly 4 heads, 252 have exactly 5 heads, and 210 have exactly 6 heads. So 4, 5, or 6 heads together have chance $\frac{210 + 252 + 210}{1024} = \frac{672}{1024} = 0.656$, about 66%. Under $H_0$, counts near 5 are common.`,
        String.raw`Now compare that with what we saw. Under $H_0$, 9 heads is far from the middle of this range. We will compute how far in chance terms in step 4. For now, the key point is the direction of the logic: we assume the skeptic is right, and then ask how surprising our data are.`,
        String.raw`Common misreading: if the data had been 5 heads, we still would not have proved the coin is fair. We would only have found no strong evidence against it. Ten flips is too few to prove that the exact chance is 0.5.`,
      ],
    },
    {
      step: 3,
      title: "The alternative hypothesis sets the direction",
      content: [
        String.raw`The alternative hypothesis can point in one direction or in two. A two-sided alternative says the coin is biased in either direction: $H_1: \theta \neq 0.5$. A one-sided alternative names one direction: $H_1: \theta > 0.5$, which means heads come up too often. We must choose the alternative before we see the data, because it changes where we look for surprising results.`,
        String.raw`A test has a rejection region, the set of results for which we would give up $H_0$. We choose the rejection region so that, if $H_0$ is true, the chance of landing in it is at most $\alpha$, the significance level. The Greek letter $\alpha$ (alpha) is a number we pick in advance. The usual choice is $\alpha = 0.05$, which means 5 chances in 100, or 1 in 20.`,
        String.raw`For a two-sided test, the rejection region is split evenly: each tail gets $\frac{\alpha}{2}$. For a one-sided test, all of $\alpha$ sits in one tail. Picture the 11 possible head counts, 0 through 10, laid out on a line. The two ends of the line are the two tails. A two-sided test looks at both ends, and a one-sided test looks only at the upper end.`,
      ],
      example: [
        String.raw`First, the chance of each end under $H_0$. There are $2^{10} = 1024$ equally likely sequences of 10 flips. Exactly 10 heads happens in 1 of them, so its chance is $\frac{1}{1024} = 0.00098$. Exactly 9 heads happens in 10 of them, so its chance is $\frac{10}{1024} = 0.00977$. Together, 9 or 10 heads have chance $\frac{1 + 10}{1024} = \frac{11}{1024} = 0.0107$.`,
        String.raw`Two-sided test at $\alpha = 0.05$: each tail may hold at most $\frac{0.05}{2} = 0.025$. The upper tail “9 or 10 heads” holds $0.0107$, which fits. Adding 8 heads would make the tail “8, 9, or 10 heads” hold $\frac{45 + 10 + 1}{1024} = \frac{56}{1024} = 0.0547$, which is too big because $0.0547 > 0.025$. The lower tail mirrors the upper one, so the two-sided rejection region is {0, 1, 9, 10} heads, with total chance $\frac{22}{1024} = 0.0215$ under $H_0$.`,
        String.raw`One-sided test at $\alpha = 0.05$: the whole 0.05 sits in the upper tail. The region “8 or more heads” has chance $\frac{56}{1024} = 0.0547$, which is larger than 0.05, so it is not allowed. The region “9 or more heads” has chance $0.0107$, which is allowed. So the one-sided rejection region is {9, 10} heads.`,
      ],
    },
    {
      step: 4,
      title: "The p-value measures surprise under the null",
      content: [
        String.raw`The p-value answers one question: if $H_0$ were true, how likely is a result at least as extreme as the one we got? It is a surprise score. A small p-value means the data would be rare under the skeptic’s view, so the skeptic is in trouble. When the picture clicks, you see the p-value as the tail area of the null curve beyond your data. That is the BAM moment.`,
        String.raw`In symbols, the one-sided p-value is $p = P(X \ge x_{\text{obs}} \mid H_0)$. Here $X$ is the test statistic, which for the coin is simply the number of heads. The symbol $x_{\text{obs}}$ is the value we observed, which is 9. The vertical bar $\mid$ means “given that” or “assuming.” So the formula reads: the probability that the count is at least 9, assuming $H_0$ is true.`,
        String.raw`Be careful with what the p-value is not. It is the chance of the data given $H_0$. It is not the chance that $H_0$ is true. A p-value of 0.02 does not mean there is a 2% chance the coin is fair. Confusing these two probabilities is the most common mistake about p-values, and step 8 explains why the p-value is a statement about the data, not about the coin.`,
      ],
      example: [
        String.raw`Observed: 9 heads. Under $H_0$, outcomes at least this extreme in the upper direction are 9 heads or 10 heads. So $$p_{\text{one}} = \frac{10}{1024} + \frac{1}{1024} = \frac{11}{1024} = 0.0107,$$ which is about 1.07%.`,
        String.raw`The two-sided p-value also counts the mirror-image result. Zero or one head is just as far from 5 heads on the other side, and it has the same chance, $\frac{11}{1024}$. So $$p_{\text{two}} = \frac{11}{1024} + \frac{11}{1024} = \frac{22}{1024} = 0.0215,$$ about 2.15%.`,
        String.raw`Decision at $\alpha = 0.05$: since $0.0215 \le 0.05$, the result falls inside the two-sided rejection region found in step 3, so we reject $H_0$. We reject the fair-coin claim at the 5% level. That is a statement about how surprising the data are, not a proof that the coin is biased.`,
      ],
    },
    {
      step: 5,
      title: "From a test statistic to a t-test",
      content: [
        String.raw`The coin example worked because we could count outcomes exactly. Most real data are measurements, such as heights or blood pressures, and they do not come in a short list of outcomes. So we summarize the data with one number, a test statistic. The most common choice for comparing means is the t-statistic. It measures the gap between the observed mean and the value $H_0$ predicts, in units of standard error.`,
        String.raw`The standard error is the typical size of the random error in a sample mean. The standard deviation $s$ is the typical distance of a number from the average of its group. For $n$ numbers, the standard error of the mean is $$SE = \frac{s}{\sqrt{n}}.$$ A bigger spread makes the standard error larger, and a bigger sample makes it smaller. Write the sample mean as $\bar{x}$ (read “x-bar”) and the value under $H_0$ as $\mu_0$ (read “mu-zero”). Then the t-statistic is $$t = \frac{\bar{x} - \mu_0}{SE}.$$`,
        String.raw`The t-statistic is compared with a t-distribution, a bell-shaped curve centered at zero that is a little wider than the normal bell curve. Its width depends on the degrees of freedom, $df$. For a one-sample test, $df = n - 1$, the number of values that are free to vary once the mean is fixed. The p-value is the tail area of the t-curve beyond the observed $t$.`,
        String.raw`Choosing the right version depends on the design. A one-sample t-test compares one mean with a fixed value. A paired t-test uses the differences within the same subjects, $d = \text{after} - \text{before}$. A two-sample t-test compares two separate groups. Welch’s t-test is a safe default for two groups, because it does not assume the two spreads are equal and it performs nearly as well when they are.`,
      ],
      example: [
        String.raw`One-sample example. A sample of $n = 25$ people has mean $\bar{x} = 105$ and standard deviation $s = 10$. $H_0$ says $\mu_0 = 100$. Then $$SE = \frac{10}{\sqrt{25}} = \frac{10}{5} = 2.0, \qquad t = \frac{105 - 100}{2.0} = 2.50,$$ with $df = 25 - 1 = 24$. On a t-curve with 24 degrees of freedom, the one-sided tail beyond 2.50 is 0.00983. The two-sided p-value is $2 \times 0.00983 = 0.0197$, which is below 0.05.`,
        String.raw`Paired example. Five people have systolic blood pressure before and after a drug: before = 140, 150, 135, 160, 145; after = 130, 138, 128, 142, 135. The differences $d = \text{after} - \text{before}$ are $-10, -12, -7, -18, -10$. Their mean is $\frac{-57}{5} = -11.4$. The deviations from that mean are $1.4, -0.6, 4.4, -6.6, 1.4$, and their squares sum to $67.2$. So $s^2 = \frac{67.2}{5 - 1} = 16.8$ and $s = \sqrt{16.8} = 4.099$. Then $SE = \frac{4.099}{\sqrt{5}} = 1.833$, $t = \frac{-11.4}{1.833} = -6.22$ with $df = 4$, and the two-sided p-value is 0.0034.`,
      ],
    },
    {
      step: 6,
      title: "One-tailed and two-tailed p-values",
      content: [
        String.raw`Suppose a test statistic has a symmetric null distribution centered at zero, like the t-curve or the normal bell curve. The one-sided p-value is the tail area on the side the data point to. The two-sided p-value adds the mirror-image tail on the other side. When the observed value points in the direction the one-sided test looks, the two tails are equal, so $$p_{\text{two}} = 2 \cdot P(T \ge |t_{\text{obs}}| \mid H_0) = 2\,p_{\text{one}}.$$`,
        String.raw`Why does the choice matter? A one-sided test puts all of $\alpha$ in one tail, so it needs a smaller statistic to reach significance. That is its advantage when the other direction truly cannot matter. It is also its danger. If you look at the data first, see which way the sample moved, and then pick that tail, you have quietly allowed rejection in either tail. That roughly doubles the false positive rate, from 5% to about 10%.`,
        String.raw`The rule is simple. Use a one-sided test only if an effect in the other direction is impossible or of no interest, and only if you decided this before collecting the data. In all other cases, use a two-sided test. A common misreading is that the one-sided test is a free way to get a smaller p-value. It is not free. The halved p-value is paid for by giving up any ability to detect an effect in the other direction.`,
      ],
      example: [
        String.raw`Take $t = 2.10$ with $df = 20$. The one-sided tail beyond 2.10 is $P(T \ge 2.10) = 0.0243$. The two-sided p-value is $$p_{\text{two}} = 2 \times 0.0243 = 0.0486.$$ Both values are below 0.05, so both tests reject $H_0$ here.`,
        String.raw`A borderline case shows how the choice can change the verdict. Take a standard normal statistic $z = 1.80$. The standard normal curve is the bell curve with mean 0 and standard deviation 1. The one-sided p-value is $P(Z \ge 1.80) = 0.03593$, and the two-sided p-value is $2 \times 0.03593 = 0.0719$. At $\alpha = 0.05$, the one-sided test calls the result significant and the two-sided test does not. The data did not change, only the question did, which is why the question must be fixed in advance.`,
      ],
    },
    {
      step: 7,
      title: "The 0.05 threshold is a convention",
      content: [
        String.raw`The decision rule is short. Set $\alpha$ before collecting data. Reject $H_0$ when $p \le \alpha$, and fail to reject when $p > \alpha$. The value 0.05 is a convention, not a law of nature. In the 1920s, the statistician Ronald Fisher suggested that 1 in 20 was a convenient level for deciding whether a result deserved a closer look. He meant it as a rule of thumb for judging evidence, not as a sharp line between truth and error.`,
        String.raw`A sharp cutoff creates problems. A p-value of 0.049 is labeled a discovery, while 0.051 is labeled a failure, even though the two results are almost identical. A yes-or-no verdict throws away information about how large the effect is and how uncertain the estimate is. A confidence interval is a range of values for the effect that the data are compatible with. Reporting that range, along with the exact p-value, tells the reader more than the verdict alone.`,
        String.raw`In 2016, the American Statistical Association warned against treating $p < 0.05$ as a bright line between true and false findings. In 2018, a group of 72 researchers proposed a stricter threshold of $\alpha = 0.005$ before claiming a new discovery. Both messages say the same thing: a p-value is one piece of evidence, not a verdict. Report the exact p-value, the size of the effect, and the uncertainty around it.`,
      ],
      example: [
        String.raw`Two studies test the same cancer drug. Study A reports $p = 0.048$ and Study B reports $p = 0.052$. With $\alpha = 0.05$, Study A is called a success and Study B a failure. Yet both p-values sit right beside the cutoff, so the evidence is nearly the same. Read honestly, both suggest the drug may help, and both call for more data.`,
        String.raw`Measure the gap: $0.052 - 0.048 = 0.004$. Compared with the cutoff, that gap is $\frac{0.004}{0.05} = 0.08$, or 8% of the threshold itself. A rule that flips the verdict over a gap of 8% of the cutoff is much too sharp. Reporting $p = 0.048$ and $p = 0.052$ exactly, along with the effect size, is far more honest than the labels success and failure.`,
      ],
    },
    {
      step: 8,
      title: "Why alpha is the false positive rate",
      content: [
        String.raw`Now we explain why $\alpha$ really is the false positive rate. Let $T$ be the test statistic, and let $F(t) = P(T \le t \mid H_0)$ be its cumulative distribution function, which is the chance that the statistic is at most $t$ when $H_0$ is true. Assume $F$ is continuous and strictly increasing, so every value $u$ between 0 and 1 is reached exactly once. The inverse function $F^{-1}(u)$ is the value $t$ at which $F(t) = u$. Because the sample is random, the p-value is random too: $p = 1 - F(T)$.`,
        String.raw`Now the key fact. Under $H_0$, the random value $U = F(T)$ is uniform on the interval from 0 to 1. Uniform means every part of that interval is equally likely, so the chance that $U$ is at most $u$ is exactly $u$. Here is the algebra: $$P(U \le u) = P\big(T \le F^{-1}(u)\big) = F\big(F^{-1}(u)\big) = u.$$ The first step holds because $F$ is increasing, so $F(T) \le u$ exactly when $T \le F^{-1}(u)$.`,
        String.raw`Next, the p-value. We have $p = 1 - U$. The chance that $p$ is at most $\alpha$ is $$P(p \le \alpha \mid H_0) = P(1 - U \le \alpha) = P(U \ge 1 - \alpha) = 1 - P(U < 1 - \alpha) = 1 - (1 - \alpha) = \alpha.$$ The step $P(U < 1 - \alpha) = P(U \le 1 - \alpha)$ holds because $U$ has a continuous distribution, so the chance of hitting exactly one value is zero. Therefore, when $H_0$ is true, the p-value falls at or below $\alpha$ with probability exactly $\alpha$.`,
        String.raw`This argument is why $\alpha$ is the long-run false positive rate. The theory breaks when its assumptions fail. If the statistic is discrete, as with counts of heads, $F$ jumps, the p-value is not exactly uniform, and the real false positive rate can be lower than $\alpha$. If the data violate the model, for example by being dependent or by coming from the wrong distribution, the real rate can be higher. The theory tells us what a p-value means, but not whether the model is right.`,
      ],
      example: [
        String.raw`Check with the coin. Under $H_0$, the two-sided p-value is at most 0.05 exactly for outcomes 0, 1, 9, and 10 heads, as step 3 showed. The chance of landing in that set is $\frac{22}{1024} = 0.0215$. Here the statistic is a count with only 11 possible values, so the p-values come in jumps and are not uniform. The false positive rate is 0.0215, below the chosen 0.05. That gap is the cost of working with discrete counts.`,
        String.raw`Now imagine running 1,000 experiments in which $H_0$ is true for a continuous statistic. The uniform fact predicts that about $1000 \times 0.05 = 50$ of them will give $p \le 0.05$. The number of false discoveries is controlled by $\alpha$, not by how surprising any single result looks. Remember this: a p-value is the probability of data at least this extreme assuming $H_0$ is true, so it measures surprise under the skeptic, and it can never tell you the probability that the skeptic is right.`,
      ],
    },
  ],
};
