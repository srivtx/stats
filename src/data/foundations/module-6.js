// Module 6 foundation, built from the ground up with worked examples.
export default {
  title: "Statistical Errors, Power & Multiple Testing",
  summary: "Every statistical test can fail in two ways. It can announce an effect that is not there, which is a false alarm, or it can miss an effect that is really there, which is a miss. This module explains both errors, the power of a test to find real effects, and how to plan a study big enough to have good power. It also shows why running many tests at once creates false alarms, and how the false discovery rate keeps them under control.",
  steps: [
    {
      step: 1,
      title: "Two ways a test can be wrong",
      content: [
        String.raw`Imagine a friend says she can taste whether milk or tea was poured into a cup first. We give her 8 cups. Four cups have milk poured first and four have tea poured first. She must sort the cups into two piles of four: the four she thinks are milk-first, and the four she thinks are tea-first. Suppose she is only guessing. How many different ways can she choose which four cups go in the milk-first pile? The number of ways to choose 4 items from 8, ignoring order, is written $\binom{8}{4}$, and it equals $\binom{8}{4} = \frac{8 \cdot 7 \cdot 6 \cdot 5}{4 \cdot 3 \cdot 2 \cdot 1} = \frac{1680}{24} = 70$.`,
        String.raw`A test looks at data and makes a decision. There are two ways that decision can be wrong. The first is a false alarm: we decide she really can taste the difference, but she was only guessing. Statisticians call this a Type I error. The second is a miss: we decide she was only guessing, but she really can taste the difference. This is a Type II error. A good test keeps both kinds of mistake rare, and as we will see, making one rarer tends to make the other more common.`,
        String.raw`Notice that the two errors concern different truths. A Type I error can happen only when there is really no skill, and a Type II error can happen only when there really is skill. Before we can measure either error, we must say which truth we are testing against. That is the job of the next step.`,
      ],
      example: [
        String.raw`Check the count. Out of the 70 possible choices, exactly one is a perfect sort: the pile of the four milk-first cups. So if she is guessing, the chance of a perfect sort is $\frac{1}{70} = 0.0143$, which is about 1.4 percent.`,
        String.raw`Now check every case. Let $X$ be the number of cups she gets right, so $X$ can be 0, 1, 2, 3, or 4. The numbers of choices that give $X = 0, 1, 2, 3, 4$ are 1, 16, 36, 16, and 1. They add to $1 + 16 + 36 + 16 + 1 = 70$, which accounts for every possible choice. Dividing each count by 70 gives the chance of each score under guessing: $\frac{1}{70} = 0.014$ for 0 right, $\frac{16}{70} = 0.229$ for 1 right, $\frac{36}{70} = 0.514$ for 2 right, $\frac{16}{70} = 0.229$ for 3 right, and $\frac{1}{70} = 0.014$ for 4 right. These five chances add to 1.`,
      ],
    },
    {
      step: 2,
      title: "The null hypothesis, the p-value, and the false alarm limit",
      content: [
        String.raw`To test her, we need a starting assumption to test against. This is the null hypothesis, written $H_0$. Here $H_0$ says she is only guessing. A null hypothesis describes the world where nothing interesting is happening. The test asks one question: if $H_0$ were true, how surprising would our result be? The number that answers this question is the p-value. It is the probability, calculated assuming $H_0$ is true, of getting a result at least as extreme as the one we actually saw.`,
        String.raw`Take the case where she sorts all four cups correctly. Under guessing, there is only one perfect sort out of 70 choices, so the p-value is $P = \frac{1}{70} = 0.0143$. Now suppose she gets 3 right. A result at least this extreme means 3 or 4 right, so the p-value is $P = \frac{16 + 1}{70} = 0.243$. Calculating these exact probabilities by counting arrangements is called Fisher's exact test, and it is the standard test for a 2 by 2 table like this one.`,
        String.raw`Before looking at any data, we choose a significance level, written $\alpha$ (the Greek letter alpha). The usual choice is $\alpha = 0.05$. The rule is simple: reject $H_0$ when the p-value is at most $\alpha$. Under this rule, she must sort all four cups correctly to be declared a real taster, because $0.0143 \le 0.05$ but $0.243 > 0.05$. Common misreading: $\alpha$ is not the chance that she is guessing. It is the false alarm rate we accept, computed on the assumption that $H_0$ is true.`,
      ],
      example: [
        String.raw`The false alarm rate of the rule “reject only when all four are right” is the chance of 4 right under guessing: $P = \frac{1}{70} = 0.0143$, or 1.43 percent. That is below $\alpha = 0.05$, so the rule is allowed. The rule “reject when 3 or more are right” has a false alarm rate of $\frac{17}{70} = 0.243$, or 24.3 percent. That is far above 0.05, so the rule is not allowed.`,
        String.raw`Picture 1,000 people who are all only guessing and each take this test. About $1000 \times 0.0143 = 14.3$ of them, roughly 14 people, would sort all four cups correctly by luck and be declared real tasters. This is the Type I error rate in action. Because the cups give only whole-number scores, the real rate is exactly 0.0143, which sits below $\alpha$. The test is therefore conservative: it makes fewer false alarms than we allow.`,
      ],
    },
    {
      step: 3,
      title: "Type II error and power: missing a real effect",
      content: [
        String.raw`Now the other mistake. We switch to a simpler setting that is easier to count. A coin is either fair, with heads on each flip having probability 0.5, or it is biased, with heads probability 0.7. The null hypothesis $H_0$ says the coin is fair. The alternative hypothesis, written $H_1$, is the claim we want to detect: the coin has heads probability 0.7. We flip the coin 10 times and count the heads, which we call $X$. Our rule: reject $H_0$ if $X \ge 9$.`,
        String.raw`The chance of exactly $k$ heads in 10 flips is $\binom{10}{k} p^k (1-p)^{10-k}$, where $p$ is the heads probability on one flip. Here $\binom{10}{k}$ counts the ways to place the $k$ heads among the 10 flips. This is the binomial probability: a count of yes-or-no outcomes in a fixed number of independent trials. Let us check it for a fair coin with $k = 9$: $\binom{10}{9} \cdot 0.5^9 \cdot 0.5 = 10 \cdot \frac{1}{1024} = \frac{10}{1024}$.`,
        String.raw`The Type I error rate is the chance of rejecting $H_0$ when $H_0$ is true. For the fair coin, $X \ge 9$ means 9 or 10 heads, so $\alpha = P(X \ge 9 \mid p = 0.5) = \frac{10 + 1}{1024} = 0.0107$. This is below 0.05, so the rule is allowed. The Type II error rate, written $\beta$ (the Greek letter beta), is the chance of failing to reject $H_0$ when $H_1$ is true. Its complement, $1 - \beta$, is called the power: the probability that the test detects the effect when it is really there.`,
      ],
      example: [
        String.raw`Under $H_1$ (heads probability 0.7), the chance of exactly 9 heads is $10 \times 0.7^9 \times 0.3 = 10 \times 0.040354 \times 0.3 = 0.1211$, and the chance of 10 heads is $0.7^{10} = 0.0282$. So the power is $1 - \beta = P(X \ge 9) = 0.1211 + 0.0282 = 0.1493$, or 14.9 percent. The Type II error is $\beta = 1 - 0.1493 = 0.851$, which means this test misses the biased coin 85 percent of the time.`,
        String.raw`The trade-off. Try a looser rule: reject when $X \ge 8$. For the fair coin, $P(X \ge 8) = \frac{45 + 10 + 1}{1024} = \frac{56}{1024} = 0.0547$, which is above 0.05, so this rule breaks our limit. Its power under $p = 0.7$ is $0.2335 + 0.1211 + 0.0282 = 0.3828$, about 38.3 percent. The looser rule raised power and also raised the false alarm rate. A stricter rule does the reverse: it lowers $\alpha$ and raises $\beta$.`,
      ],
    },
    {
      step: 4,
      title: "What makes power larger: effect size, noise, and sample size",
      content: [
        String.raw`Now a measurement example that is closer to real studies. A new drug is expected to lower blood pressure by an average of $\delta = 5$ points. The Greek letter delta, $\delta$, is the true size of the effect, meaning the difference from no effect. Individual patients vary a lot. Their changes have standard deviation $\sigma = 10$ points, where the standard deviation is the typical distance of one patient from the average. We test $n$ patients and use their average change. That average also wobbles from study to study, and its typical wobble is the standard error $SE = \frac{\sigma}{\sqrt{n}}$.`,
        String.raw`Our rule is based on the normal distribution, the bell-shaped curve that describes values clustering around a middle value. If the drug does nothing, the average is centered at 0, and only 2.5 percent of its values lie above $1.96$ standard errors. So we reject $H_0$ when the average is at least $1.96 \cdot SE$ away from 0. Both tails together give a false alarm rate of 5 percent.`,
        String.raw`Now suppose the drug really works, so the average is centered at $\delta = 5$. The chance that our average lands past the rejection line is the power. The distance from the center to the line, measured in standard errors, is $\frac{\delta}{SE} - 1.96$. Writing $\Phi(z)$ for the chance that a standard normal value is at most $z$, the power is $1 - \beta = \Phi\left(\frac{\delta}{SE} - 1.96\right)$. Since $SE = \sigma / \sqrt{n}$, the shift $\frac{\delta}{SE} = \frac{\delta\sqrt{n}}{\sigma}$ grows with $\sqrt{n}$. Larger studies therefore have more power.`,
      ],
      example: [
        String.raw`Let $\sigma = 10$ and $\delta = 5$ at $\alpha = 0.05$, so the rejection line is at $1.96$ standard errors. With $n = 16$ patients, $SE = \frac{10}{\sqrt{16}} = \frac{10}{4} = 2.5$. The shift is $\frac{5}{2.5} = 2.0$, so the power is $\Phi(2.0 - 1.96) = \Phi(0.04) = 0.516$. The rejection line sits at $1.96 \times 2.5 = 4.9$ points, and the true average of 5 points only just clears it about half the time. Power is 51.6 percent, almost a coin flip.`,
        String.raw`With $n = 64$ patients, $SE = \frac{10}{\sqrt{64}} = \frac{10}{8} = 1.25$. The shift is $\frac{5}{1.25} = 4.0$, so the power is $\Phi(4.0 - 1.96) = \Phi(2.04) = 0.979$. The rejection line is now $1.96 \times 1.25 = 2.45$ points, and the true 5-point average clears it easily. Power rises to 97.9 percent. Quadrupling the sample from 16 to 64 doubled the shift and lifted the power from 51.6 percent to 97.9 percent. The formula ignores the tiny chance of a result far out in the opposite tail, which is less than 0.0001 here.`,
      ],
    },
    {
      step: 5,
      title: "Plan the sample size before you collect data",
      content: [
        String.raw`Power analysis works backward. Before a study starts, we choose the power we want, usually 80 percent, and ask how many people we need. To do this we need a measure of effect size that does not depend on units. Cohen's $d$ does this: $d = \frac{\mu_1 - \mu_2}{\sigma_{\text{pooled}}}$. Here $\mu_1$ and $\mu_2$ are the true averages of the two groups, and $\sigma_{\text{pooled}}$ is their common standard deviation. A value of $d = 0.5$ means the two group averages differ by half a standard deviation.`,
        String.raw`Now the derivation. Put $n$ people in each group. The difference between two sample averages has standard error $\sigma\sqrt{\frac{2}{n}}$, because the variance of a difference of two independent averages is the sum of their variances: $\frac{\sigma^2}{n} + \frac{\sigma^2}{n} = \frac{2\sigma^2}{n}$. Taking the square root gives the standard error. The shift in standard errors is therefore $\frac{\delta}{\sigma\sqrt{2/n}} = d\sqrt{\frac{n}{2}}$.`,
        String.raw`For power $1 - \beta$ at significance level $\alpha$, the shift must equal the sum of two critical values. The first, $z_{1-\alpha/2}$, is the distance from the null center to the rejection line, measured in standard errors. The second, $z_{1-\beta}$, is the distance from the rejection line to the true center. Power equals $1 - \beta$ exactly when the true center sits $z_{1-\beta}$ beyond the line, so $d\sqrt{\frac{n}{2}} = z_{1-\alpha/2} + z_{1-\beta}$. Squaring after dividing by $d$ gives $\frac{n}{2} = \left(\frac{z_{1-\alpha/2} + z_{1-\beta}}{d}\right)^2$, and so $n = 2\left(\frac{z_{1-\alpha/2} + z_{1-\beta}}{d}\right)^2$. Common misreading: do not compute power after the study from the effect you happened to observe. That number only restates the p-value. If the result was not significant, it will always come out below about 50 percent.`,
      ],
      example: [
        String.raw`Let us plan a study that detects a medium effect, $d = 0.5$, with $\alpha = 0.05$ and 80 percent power. Then $z_{1-\alpha/2} = 1.96$ and $z_{1-\beta} = z_{0.80} = 0.84$. Substitute: $n = 2\left(\frac{1.96 + 0.84}{0.5}\right)^2 = 2\left(\frac{2.80}{0.5}\right)^2 = 2 \times (5.6)^2 = 2 \times 31.36 = 62.72$.`,
        String.raw`We cannot enroll 0.72 of a person, so we round up to $n = 63$ people per group, or 126 in total. Check the rounding: with $n = 63$, the shift is $d\sqrt{n/2} = 0.5 \times \sqrt{31.5} = 0.5 \times 5.612 = 2.806$, which is just above 2.80. The normal formula is an approximation. The exact calculation for a t-test, the usual test for comparing two group averages, gives 64 per group, so a careful plan enrolls 64 per group.`,
      ],
    },
    {
      step: 6,
      title: "Many tests, many false alarms",
      content: [
        String.raw`Suppose a researcher tests 20 jelly bean colors to see whether any of them is linked to acne. Assume that none of them has any real effect, so $H_0$ is true for all 20 tests. Each test has a 5 percent false alarm rate. We want the chance that at least one of the 20 tests reports a false alarm. This is the family-wise error rate: the chance of at least one false alarm across the whole family of tests.`,
        String.raw`Start with one test. The chance of no false alarm is $1 - 0.05 = 0.95$. Assume the tests are independent, meaning the result of one tells us nothing about the others. For independent events, the chance that all of them happen is the product of their chances. So the chance of no false alarm across 20 tests is $0.95 \times 0.95 \times \cdots \times 0.95 = 0.95^{20}$, with 20 factors. The chance of at least one false alarm is the complement, $1 - 0.95^{20}$.`,
        String.raw`A different and simpler number is the expected count of false alarms: $20 \times 0.05 = 1$. On average, one of the 20 tests fires by chance. Common misreading: an average of 1 does not mean there is exactly one false alarm. The count can be zero, one, two, or more, and the family-wise error rate asks about the chance of at least one.`,
        String.raw`This pattern is called p-hacking: searching until something looks significant. Common routes include testing many outcomes and reporting only the one with p below 0.05, trying several rules for removing outliers until the result crosses the line, splitting the data into subgroups after seeing the results, and collecting more data after each look and stopping the first time $p < 0.05$. The last route, called optional stopping, can push the false alarm rate far above 5 percent even when no effect exists.`,
      ],
      example: [
        String.raw`Compute the numbers. $0.95^2 = 0.9025$, $0.95^4 = 0.9025^2 = 0.8145$, $0.95^8 = 0.8145^2 = 0.6634$, and $0.95^{16} = 0.6634^2 = 0.4401$. Then $0.95^{20} = 0.95^{16} \times 0.95^4 = 0.4401 \times 0.8145 = 0.3585$. The chance of no false alarm is 0.3585, so the family-wise error rate is $1 - 0.3585 = 0.6415$, about 64 percent. Testing 20 colors with no real effects gives a false “discovery” nearly two times out of three.`,
        String.raw`With 40 food items, each tested at 5 percent, the expected number of false alarms is $40 \times 0.05 = 2$. The chance of at least one false alarm is $1 - 0.95^{40} = 1 - 0.3585^2 = 1 - 0.1285 = 0.8715$, about 87 percent. A headline claiming that some food causes cancer is therefore likely to appear from chance alone once someone checks enough foods.`,
      ],
    },
    {
      step: 7,
      title: "Controlling false alarms across many tests",
      content: [
        String.raw`We can fix the problem by tightening each test. The Bonferroni rule gives each of $m$ tests the threshold $\alpha / m$. Why does this work? Let $A_i$ be the event that test $i$ produces a false alarm, so under its null hypothesis $P(A_i) \le \alpha / m$ for each $i$. The chance of at least one false alarm is $P(A_1 \cup A_2 \cup \cdots \cup A_m)$, where $\cup$ means “or”. For two events, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$. The overlap $P(A \cap B)$ is never negative, so $P(A \cup B) \le P(A) + P(B)$. Adding one event at a time gives $P(A_1 \cup \cdots \cup A_m) \le \sum_{i=1}^{m} P(A_i)$. Each term is at most $\alpha / m$, so the total is at most $m \times \frac{\alpha}{m} = \alpha$.`,
        String.raw`Bonferroni is strict. It controls the chance of any false alarm, but it can throw away many real discoveries. A milder goal is the false discovery rate, or FDR. Let $R$ be the number of tests we declare significant, and let $V$ be the number of those that are false alarms. The FDR is the long-run average of the fraction of discoveries that are false: $\text{FDR} = E\left[\frac{V}{\max(R, 1)}\right]$. Here $E$ means the average over many imagined repeats of the study, and $\max(R, 1)$ avoids dividing by zero when $R = 0$.`,
        String.raw`The Benjamini–Hochberg rule controls the FDR. Sort the $m$ p-values from smallest to largest: $p_{(1)} \le p_{(2)} \le \cdots \le p_{(m)}$. Find the largest rank $k$ with $p_{(k)} \le \frac{k}{m} Q$, where $Q$ is the target FDR, usually 0.05. Declare the $k$ smallest p-values significant. The theorem, due to Benjamini and Hochberg in 1995, says that when the tests are independent, the FDR of this rule is at most $Q$. We state the theorem without its full proof, which is longer than this module. If the tests depend on each other in arbitrary ways, the guarantee can fail, and a stricter variant divides $Q$ by $1 + \frac{1}{2} + \cdots + \frac{1}{m}$.`,
      ],
      example: [
        String.raw`Bonferroni with 5 tests at $\alpha = 0.05$ uses the threshold $0.05 / 5 = 0.01$. Take 5 sorted p-values: 0.001, 0.010, 0.025, 0.040, and 0.150. Bonferroni declares only the two with $p \le 0.01$ significant: 0.001 and 0.010.`,
        String.raw`Now Benjamini–Hochberg with $Q = 0.05$ and $m = 5$. The thresholds $\frac{k}{5} \times 0.05$ for $k = 1, 2, 3, 4, 5$ are 0.010, 0.020, 0.030, 0.040, and 0.050. Compare each sorted p-value with its threshold: $0.001 \le 0.010$ yes; $0.010 \le 0.020$ yes; $0.025 \le 0.030$ yes; $0.040 \le 0.040$ yes; $0.150 \le 0.050$ no. The largest passing rank is $k = 4$, so BH declares the four smallest p-values significant. That is two more discoveries than Bonferroni, at the price of accepting that about 5 percent of discoveries, on average, may be false. The one thing to remember: every test carries its own chance of a false alarm, so the more tests you run, the more false alarms you collect, and the whole family of tests must be corrected together.`,
      ],
    },
  ],
};
