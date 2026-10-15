// Module 7 foundation, built from the ground up with worked examples.
export default {
  title: String.raw`Quantiles, Q-Q Plots, and Normalization`,
  summary: String.raw`A quantile tells us where a value sits in a sorted list. The median is the middle value, and percentiles cut the list into hundredths. A quantile-quantile plot, or Q-Q plot, compares the sorted values in our data with the values a bell-shaped normal curve would predict, so we can see whether the data look normal. Quantile normalization uses the same ranking idea to give several samples the same pattern of values, which removes technical differences between them.`,
  steps: [
    {
      step: 1,
      title: String.raw`Line the data up in order and find the middle`,
      content: [
        String.raw`Suppose five students score 7, 3, 9, 5, and 6 on a quiz. A list of numbers is hard to read until we put it in order, so we write the scores from smallest to largest: 3, 5, 6, 7, 9. Each score now has a place in the line. The first place holds 3, the second holds 5, and so on up to the fifth place, which holds 9.`,
        String.raw`Statisticians have a short way to name these places. We write the value in the i-th place as $x_{(i)}$, read as “x sub i in parentheses”. So $x_{(1)} = 3$, $x_{(2)} = 5$, and $x_{(5)} = 9$. The letter $n$ stands for the number of values, so here $n = 5$. The brackets tell us the list has been sorted, and the subscript tells us the place, not the student number.`,
        String.raw`The middle value is called the median. With $n = 5$ values, the middle place is the third one, because two values sit below it and two sit above it. The third value is $x_{(3)} = 6$, so the median is 6. In general, when $n$ is odd, the median sits in place $(n+1)/2$.`,
        String.raw`Common misreading: the median is not simply the average of the values. The median depends only on the middle place, so a very large or very small value at the end of the line does not move it. If the student who scored 9 had scored 90 instead, the sorted list would be 3, 5, 6, 7, 90. The median would still be 6, but the average would jump from 6 to $111/5 = 22.2$.`,
      ],
      example: [
        String.raw`Check the median with the sorted list. The places are 1, 2, 3, 4, and 5, and the values are 3, 5, 6, 7, and 9. The middle place is $(5+1)/2 = 3$, and the value there is 6.`,
        String.raw`Now add a sixth student who scored 10. The sorted list becomes 3, 5, 6, 7, 9, 10. There are six values, so no single value sits in the exact middle. The two middle places are $n/2 = 3$ and $n/2 + 1 = 4$, which hold 6 and 7. The median is their average: $(6+7)/2 = 13/2 = 6.5$.`,
      ],
    },
    {
      step: 2,
      title: String.raw`Percentiles cut the sorted line into equal shares`,
      content: [
        String.raw`A percentile tells us where a value sits in the sorted line. The 90th percentile is the value that has 90 out of every 100 values below it. A fraction $p$ is a number between 0 and 1, and the quantile at $p$ is the value with a fraction $p$ of the data below it. So the 0.90 quantile is the 90th percentile, and the 0.50 quantile is the median from step 1. A quartile is a quantile at 0.25, 0.50, or 0.75. We write $Q_1$ for the first quartile at 0.25 and $Q_3$ for the third quartile at 0.75.`,
        String.raw`Often the position we want falls between two values, so we need a rule for that case. With $n$ sorted values, we compute the position $h = p(n-1) + 1$. The whole part of $h$ tells us the lower value, and the leftover fraction tells us how far to move toward the next value. For example, if $h = 3.25$, we start at the third value and move a quarter of the way to the fourth. This linear rule is the one most calculators and spreadsheets use, although some programs use slightly different rules and report slightly different answers.`,
        String.raw`Check the rule with the median from step 1. For $p = 0.5$ and five values, $h = 0.5 \times 4 + 1 = 3$, which is exactly the third place and gives the median 6. When $n$ is even, $h$ lands halfway between two places, which gives the average of two values, just as in step 1.`,
      ],
      example: [
        String.raw`Take ten sorted test scores: 55, 60, 65, 70, 75, 80, 85, 90, 95, and 100. Here $n = 10$, so $n - 1 = 9$ and the rule becomes $h = 9p + 1$. Write $x_{(k)}$ for the score in place $k$. Then $x_{(3)} = 65$, $x_{(4)} = 70$, $x_{(5)} = 75$, $x_{(6)} = 80$, $x_{(7)} = 85$, $x_{(8)} = 90$, $x_{(9)} = 95$, and $x_{(10)} = 100$.`,
        String.raw`Median: $h = 9(0.50) + 1 = 5.5$. The whole part is 5, so we start at $x_{(5)} = 75$ and move half of the way to $x_{(6)} = 80$: $75 + 0.5 \times (80 - 75) = 77.5$. First quartile: $h = 9(0.25) + 1 = 3.25$. We start at $x_{(3)} = 65$ and move a quarter of the way to 70: $65 + 0.25 \times 5 = 66.25$. Third quartile: $h = 9(0.75) + 1 = 7.75$. We start at $x_{(7)} = 85$ and move three quarters of the way to 90: $85 + 0.75 \times 5 = 88.75$.`,
        String.raw`The 90th percentile: $h = 9(0.90) + 1 = 9.1$. We start at $x_{(9)} = 95$ and move a tenth of the way to 100: $95 + 0.1 \times 5 = 95.5$. Check the spacing: the quartiles 66.25, 77.5, and 88.75 are 11.25 apart on each side, which is what we expect when the scores are spread evenly.`,
      ],
    },
    {
      step: 3,
      title: String.raw`A quantile is the inverse of the cumulative probability`,
      content: [
        String.raw`Lists of numbers are only one source of quantiles. A distribution describes the pattern of values that a random measurement could take, such as the weight of a bag of flour we have not yet weighed. We write that future measurement as $X$. The cumulative probability $F(x)$ is the chance that $X$ is at most $x$. We write $F(x) = P(X \le x)$, where $P$ stands for probability. As $x$ moves from left to right, $F(x)$ rises steadily from 0 toward 1.`,
        String.raw`The quantile reverses this question. Instead of asking “what chance is there of being at or below $x$?”, it asks “which value $x$ has a chance $p$ of being at or below it?” In symbols, the quantile $Q(p)$ is the value $x$ that solves $F(x) = p$. We write $Q(p) = F^{-1}(p)$, read “F inverse of p”. The $-1$ means inverse function, not the reciprocal $1/F$. Picture it as reading the graph of $F$ backwards: start at height $p$, move right to the curve, and drop down to the horizontal axis.`,
        String.raw`Here is a simple distribution. In the uniform distribution on $[0, 10]$, every value between 0 and 10 is equally likely. Then $F(x) = x/10$ for $0 \le x \le 10$. Solving $x/10 = p$ gives $Q(p) = 10p$. The standard normal distribution is the bell curve centered at 0, with standard deviation 1. The standard deviation is a typical distance from the center. Its random value is written $Z$, and its cumulative probability is written $\Phi(z) = P(Z \le z)$, using the Greek letter Phi. Its values have no simple formula, so we read them from a table or a calculator.`,
        String.raw`A normal curve with mean $\mu$ and standard deviation $\sigma$ is written $N(\mu, \sigma^2)$. The mean $\mu$ is the balance point of the curve. The variance $\sigma^2$ is the square of the standard deviation. Its quantile at $p$ is found by scaling the standard normal quantile: $Q(p) = \mu + \sigma\,\Phi^{-1}(p)$. Step 6 proves this formula, and for now we simply use it.`,
      ],
      example: [
        String.raw`Uniform check: the 0.9 quantile is $Q(0.9) = 10 \times 0.9 = 9$. To confirm, $F(9) = 9/10 = 0.9$, so there is a 90% chance of a value at most 9. The 0.25 quantile is $10 \times 0.25 = 2.5$, and indeed $F(2.5) = 0.25$.`,
        String.raw`Table check: $\Phi(1.96) = 0.9750$, so $\Phi^{-1}(0.975) = 1.96$. Also $\Phi(0) = 0.5$, so $\Phi^{-1}(0.5) = 0$, the median of the standard normal. The curve is symmetric, so $\Phi^{-1}(0.25) = -0.6745$ and $\Phi^{-1}(0.75) = 0.6745$.`,
        String.raw`Heights: suppose adult heights follow $N(170, 10^2)$, so $\mu = 170$ cm and $\sigma = 10$ cm. The 97.5th percentile is $Q(0.975) = 170 + 10 \times 1.96 = 170 + 19.6 = 189.6$ cm. So 97.5% of these heights fall at or below 189.6 cm, and only 2.5% rise above it.`,
      ],
    },
    {
      step: 4,
      title: String.raw`Pair sorted data with normal quantiles in a Q-Q plot`,
      content: [
        String.raw`Now we turn the idea around. We have a sample, which is a set of measurements, and we want to know whether it could have come from a normal curve. A Q-Q plot puts two lists of quantiles side by side. The horizontal axis holds normal quantiles, which are what a normal curve predicts for each place in the line. The vertical axis holds the sorted data, which are the values we actually measured. Each measurement becomes one dot.`,
        String.raw`The main question is which normal quantile to pair with each sorted value. With $n$ sorted values, we give the value in place $i$ the plotting position $p_i = \frac{i - 3/8}{n + 1/4}$. This is Blom's formula, and it keeps every plotting position strictly between 0 and 1. Then we look up the normal quantile $q_i = \Phi^{-1}(p_i)$. The dot for place $i$ is $(q_i, x_{(i)})$, with horizontal position $q_i$ and vertical position $x_{(i)}$.`,
        String.raw`Symmetry helps. The plotting positions are symmetric around 0.5, because $p_i + p_{n+1-i} = 1$. So the normal quantiles come in matching pairs, with $q_{n+1-i} = -q_i$. When $n$ is odd, the middle quantile is exactly 0.`,
        String.raw`Common misreading: the two axes are measured in different units. The horizontal axis counts standard deviations of a standard normal curve, so its values usually lie between $-2$ and $2$. The vertical axis is in the units of the data, here kilograms. A Q-Q plot is not a histogram, and it does not show how often values occur. It compares each sorted value with the value a normal curve would give for the same place.`,
      ],
      example: [
        String.raw`Take five measurements in kilograms: 4.2, 4.8, 5.0, 5.3, and 5.9. They are already sorted, so $x_{(1)} = 4.2$, $x_{(2)} = 4.8$, $x_{(3)} = 5.0$, $x_{(4)} = 5.3$, and $x_{(5)} = 5.9$. With $n = 5$, the denominator is $n + 1/4 = 5.25$. The numerators $i - 3/8$ are 0.625, 1.625, 2.625, 3.625, and 4.625.`,
        String.raw`Plotting positions: $p_1 = 0.625/5.25 = 0.119$, $p_2 = 1.625/5.25 = 0.310$, $p_3 = 2.625/5.25 = 0.500$, $p_4 = 3.625/5.25 = 0.690$, and $p_5 = 4.625/5.25 = 0.881$. Look up the normal quantiles in a table or calculator: $\Phi^{-1}(0.119) = -1.18$, $\Phi^{-1}(0.310) = -0.50$, $\Phi^{-1}(0.500) = 0$, $\Phi^{-1}(0.690) = 0.50$, and $\Phi^{-1}(0.881) = 1.18$.`,
        String.raw`The five dots are $(-1.18, 4.2)$, $(-0.50, 4.8)$, $(0, 5.0)$, $(0.50, 5.3)$, and $(1.18, 5.9)$. Plotted, they rise steadily from the lower left to the upper right.`,
      ],
    },
    {
      step: 5,
      title: String.raw`Read the Q-Q plot: a straight line suggests normal data`,
      content: [
        String.raw`If the data are normal, the dots should lie close to one straight line. A straight line has the form $y = a + bx$. Here $a$ is the intercept, the height where the line crosses the vertical axis at $x = 0$, and $b$ is the slope, which is how much the line rises for each unit it moves to the right. For a normal sample, the intercept estimates the mean $\mu$ and the slope estimates the standard deviation $\sigma$. Step 6 proves this.`,
        String.raw`Let us read the dots from step 4. Their sample mean is $(4.2+4.8+5.0+5.3+5.9)/5 = 25.2/5 = 5.04$, and their sample standard deviation is about 0.63. The line $x_{(i)} \approx 5.04 + 0.63\,q_i$ predicts the dots closely. At $q = -1.18$ it predicts $5.04 - 0.74 = 4.30$, while the measured value is 4.2. At $q = 1.18$ it predicts $5.04 + 0.74 = 5.78$, while the measured value is 5.9. The largest gap is 0.12 kg, so the dots lie close to a line.`,
        String.raw`Shapes away from the line carry information. A U-shape, with both ends above the line, means the data are skewed to the right. The long right tail pushes the top values higher than the line predicts, and the short left side keeps the bottom values higher than predicted. An S-shape, with the lowest dots below the line and the highest dots above it, means heavy tails: extreme values are more common than a normal curve allows.`,
        String.raw`Common misreading: a few wiggles at the ends of a small sample do not prove anything. When $n$ is below 30, the extreme dots move a lot from sample to sample, so look at the overall pattern rather than at one dot.`,
      ],
      example: [
        String.raw`Test the reading with a known normal population. Heights follow $N(170, 10^2)$, so $\mu = 170$ and $\sigma = 10$. The line for the dots is $x = 170 + 10q$. At $q = -1.5$ it gives $170 - 15 = 155$. At $q = 0$ it gives 170. At $q = 1.5$ it gives $170 + 15 = 185$. The three points $(-1.5, 155)$, $(0, 170)$, and $(1.5, 185)$ all lie on one line.`,
        String.raw`Read the line back. Its slope is $(185 - 155)/(1.5 - (-1.5)) = 30/3 = 10$, which is $\sigma$. It crosses the vertical axis at 170, which is $\mu$. The reading matches the parameters we started with.`,
      ],
    },
    {
      step: 6,
      title: String.raw`Why normal data give a straight line`,
      content: [
        String.raw`Here is the full theory for the normal case. Let $X$ be a normal measurement with mean $\mu$ and standard deviation $\sigma$, and let $Z$ be a standard normal value, with mean 0 and standard deviation 1. Then $X = \mu + \sigma Z$. This says: take a standard normal value, stretch it by $\sigma$ so its spread matches, and then shift it by $\mu$ so its center matches. Because $\sigma > 0$, the stretch never reverses the order of values.`,
        String.raw`Now write the cumulative probability of $X$. The event $X \le x$ is the same as $\mu + \sigma Z \le x$. Subtract $\mu$ from both sides and divide both sides by $\sigma > 0$, which keeps the inequality pointing the same way, to get $Z \le (x-\mu)/\sigma$. Therefore $F_X(x) = P(X \le x) = P\left(Z \le \frac{x-\mu}{\sigma}\right) = \Phi\left(\frac{x-\mu}{\sigma}\right)$.`,
        String.raw`Now invert it. The quantile $Q_X(p)$ is the value $x$ with $F_X(x) = p$. So $\Phi\left(\frac{x-\mu}{\sigma}\right) = p$, which gives $\frac{x-\mu}{\sigma} = \Phi^{-1}(p)$, and therefore $x = \mu + \sigma\,\Phi^{-1}(p)$. We have shown $Q_X(p) = \mu + \sigma\,\Phi^{-1}(p)$. Each quantile of $X$ is a straight-line function of the standard normal quantile $\Phi^{-1}(p)$, with intercept $\mu$ and slope $\sigma$.`,
        String.raw`Now connect this to the sample. The sorted values $x_{(i)}$ approximate the true quantiles $Q_X(p_i)$, and the normal quantiles are $q_i = \Phi^{-1}(p_i)$. So for normal data, $x_{(i)} \approx \mu + \sigma q_i$, and the Q-Q dots lie close to a line with intercept $\mu$ and slope $\sigma$. The approximation gets better as $n$ grows. The argument needs $F_X$ to rise steadily, which the normal curve does for every $\sigma > 0$. When the data come from a skewed or heavy-tailed curve, $Q_X$ no longer has this straight-line form, and the dots bend.`,
      ],
      example: [
        String.raw`Check the formula with $N(170, 10^2)$ at $p = 0.975$. The formula gives $Q_X(0.975) = 170 + 10 \times 1.96 = 189.6$. Now go the other way: $F_X(189.6) = \Phi\left(\frac{189.6 - 170}{10}\right) = \Phi(1.96) = 0.975$. The forward and backward steps agree.`,
        String.raw`Check the slope. The quantile at $p = 0.025$ is $170 + 10 \times (-1.96) = 150.4$. The two quantiles $Q_X(0.975) = 189.6$ and $Q_X(0.025) = 150.4$ have normal quantiles $1.96$ and $-1.96$. The slope between them is $\frac{189.6 - 150.4}{1.96 - (-1.96)} = \frac{39.2}{3.92} = 10 = \sigma$.`,
      ],
    },
    {
      step: 7,
      title: String.raw`Quantile normalization gives samples the same pattern of values`,
      content: [
        String.raw`Now the same ranking idea appears in a new setting. Suppose a lab measures the same three genes in two samples, but the scanner ran brighter for sample B. Sample B reads every gene a little higher, so the two samples look different even if the biology is identical. Quantile normalization removes this kind of technical difference. After it, every sample has exactly the same sorted values, while each gene keeps its own rank within its sample.`,
        String.raw`The procedure has four moves. First, sort each sample on its own. Second, for each place $i$ from 1 to $n$, average the $i$-th smallest values across the $p$ samples: $\bar{r}_i = \frac{1}{p}\sum_{j=1}^{p} x_{(i),j}$, where $x_{(i),j}$ is the $i$-th smallest value in sample $j$. Third, replace the $i$-th smallest value in every sample by $\bar{r}_i$. Fourth, put each value back in its original position, so each gene keeps its own place in its own sample. Because the $\bar{r}_i$ never decrease as $i$ grows, the order of genes within a sample does not change, except where values tie.`,
        String.raw`Why do the samples match exactly? After the third move, the sorted version of every sample is the same list, $\bar{r}_1 \le \bar{r}_2 \le \dots \le \bar{r}_n$. Two samples with the same sorted values contain the same numbers with the same counts, so they have identical distributions. The average is also preserved. The mean of normalized sample $j$ is $\frac{1}{n}\sum_{i=1}^{n} \bar{r}_i = \frac{1}{np}\sum_{k=1}^{p}\sum_{i=1}^{n} x_{(i),k} = \frac{1}{p}\sum_{k=1}^{p} \bar{x}_k$, where $\bar{x}_k$ is the original mean of sample $k$. Every normalized sample therefore has the same mean, equal to the average of the original sample means.`,
        String.raw`Common misreading: quantile normalization does not know which differences are technical. If one sample truly has 80% of its genes switched off, the forced shared pattern hides that real change and erases the biology. Use it only when the samples should share one underlying pattern. The one thing to remember: quantile normalization gives every sample the average of the sorted values, so all samples share the same distribution while each item keeps its rank.`,
      ],
      example: [
        String.raw`Sample A has values 9, 2, and 4 for genes 1, 2, and 3. Sample B has values 8, 4, and 6 for the same genes. Sort each one: A becomes 2, 4, 9, and B becomes 4, 6, 8. Average each place across the two samples: place 1 gives $(2+4)/2 = 3$, place 2 gives $(4+6)/2 = 5$, and place 3 gives $(9+8)/2 = 8.5$. So $\bar{r} = (3, 5, 8.5)$.`,
        String.raw`Replace and restore. In sample A, the value 9 is in place 3, so it becomes 8.5. The value 2 is in place 1, so it becomes 3. The value 4 is in place 2, so it becomes 5. Restoring the gene order gives A = $(8.5, 3, 5)$. In sample B, 8 is in place 3, so it becomes 8.5; 4 is in place 1, so it becomes 3; and 6 is in place 2, so it becomes 5. Restoring the gene order gives B = $(8.5, 3, 5)$.`,
        String.raw`Both samples now hold the values 3, 5, and 8.5, and both have mean $(8.5+3+5)/3 = 5.5$. The original means were $(9+2+4)/3 = 5$ and $(8+4+6)/3 = 6$, and their average is $(5+6)/2 = 5.5$, exactly as the theory predicts. Gene 1 is still the largest in both samples, and gene 2 is still the smallest.`,
      ],
    },
  ],
};
