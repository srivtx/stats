// Module 3 foundation, built from the ground up with worked examples.
export default {
  title: "Population Parameters, Samples & Spread",
  summary: "A population is the whole group we want to understand, and a sample is the part we can actually measure. Greek letters such as mu and sigma describe the population and stay fixed, while Latin letters such as x-bar and s are computed from the sample and change from one sample to the next. This module explains how spread is measured, why we divide by n minus 1 when we only have a sample, and how the standard deviation differs from the standard error.",
  steps: [
    {
      step: 1,
      title: "A population and a sample",
      content: [
        String.raw`Imagine a bakery that makes exactly ten loaves of bread today. We weigh each loaf in grams and get 500, 502, 498, 505, 495, 500, 503, 497, 501, and 499 grams. These ten loaves form a population: the complete set of things we want to know about. A population is the whole group, not a piece of it.`,
        String.raw`Suppose we cannot weigh every loaf, perhaps because the scale is slow or the loaves sell before we get to them. So we pick three loaves and weigh them, getting 498, 505, and 501 grams. These three weights form a sample: a part of the population that we actually measure.`,
        String.raw`Two kinds of numbers come out of this. A parameter is a number that describes the whole population. The mean (the arithmetic average: add the values and divide by how many there are) of all ten loaves is a parameter, because it uses every loaf in the population. A statistic is a number computed from the sample only. The mean of our three loaves is a statistic. It is a guess at the parameter, and it is usually not exactly right.`,
      ],
      example: [
        String.raw`Population mean: add all ten weights. 500 + 502 + 498 + 505 + 495 + 500 + 503 + 497 + 501 + 499 = 5000. Divide by the count: 5000 / 10 = 500 grams. This is a parameter.`,
        String.raw`Sample mean: add the three weights and divide by 3. 498 + 505 + 501 = 1504, and 1504 / 3 = 501.33 grams, rounded to two decimals. This is a statistic. It is close to 500 but not equal to it.`,
      ],
    },
    {
      step: 2,
      title: "Greek letters for the truth, Latin letters for estimates",
      content: [
        String.raw`Statisticians use two alphabets to keep these two kinds of numbers apart. Parameters of the population get Greek letters. The population mean is written $\mu$ (read “mu”), so for the bakery $\mu = 500$ grams. The population spread gets the Greek letter $\sigma$ (read “sigma”), which we build in step 3.`,
        String.raw`Numbers computed from a sample get Latin letters. The values we weighed are $x_1 = 498$, $x_2 = 505$, and $x_3 = 501$. Their mean is written $\bar{x}$ (read “x-bar”), so $\bar{x} = 501.33$ grams. The sample spread is written $s$ (the sample standard deviation), and $s^2$ is the sample variance. A rule that turns sample values into a guess at a parameter is called an estimator, and $\bar{x}$ is an estimator of $\mu$.`,
        String.raw`The most important difference is behavior, not the alphabet. The parameter $\mu$ is fixed. There is exactly one population mean for these ten loaves, and it does not change when we choose different loaves. A statistic changes. If we chose three other loaves, we would get a different $\bar{x}$. A quantity whose value depends on chance, such as which loaves land in the sample, is called random.`,
      ],
      example: [
        String.raw`Draw a second sample: loaves weighing 495, 500, and 503 grams. Its mean is $(495 + 500 + 503)/3 = 1498/3 = 499.33$ grams, rounded.`,
        String.raw`Compare the samples. The first sample gave $\bar{x} = 501.33$ grams and the second gave $\bar{x} = 499.33$ grams. The population mean stayed at $\mu = 500$ grams both times. The Latin-letter number moved from sample to sample, and the Greek-letter number did not.`,
      ],
    },
    {
      step: 3,
      title: "Spread is the average squared distance from the mean",
      content: [
        String.raw`The mean tells us where the middle is, but not how spread out the loaves are. Two bakeries could both average 500 grams, one with every loaf between 498 and 502 grams and the other with loaves ranging from 450 to 550 grams. We need a second number that measures spread.`,
        String.raw`Start with the distance of each loaf from the mean. This distance is called a deviation, and for a loaf weighing $x$ grams it is $x - \mu$. A loaf of 505 grams has deviation $505 - 500 = +5$, and a loaf of 495 grams has deviation $495 - 500 = -5$. We cannot simply average the deviations, because positive and negative values cancel and they always sum to zero. So we square each deviation first, which makes every squared distance positive.`,
        String.raw`Now average the squared deviations. Because we know every loaf in the population, we divide by the population size $N$, which is 10 here. The symbol $\sum$ means add up the terms. The result is the population variance, written $\sigma^2$ (sigma squared), which is the average squared distance from the mean: $\sigma^2 = \frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2$. Its square root, $\sigma = \sqrt{\sigma^2}$, is the population standard deviation, which returns the spread to grams.`,
      ],
      example: [
        String.raw`Deviations from $\mu = 500$ for the ten loaves, in order: $0, 2, -2, 5, -5, 0, 3, -3, 1, -1$. Check that they sum to zero: $0 + 2 - 2 + 5 - 5 + 0 + 3 - 3 + 1 - 1 = 0$.`,
        String.raw`Squares of the deviations: $0, 4, 4, 25, 25, 0, 9, 9, 1, 1$. Their sum is 78. So $\sigma^2 = 78 / 10 = 7.8$ square grams, and $\sigma = \sqrt{7.8} = 2.79$ grams. The loaves are spread out by about 2.8 grams around the mean.`,
      ],
    },
    {
      step: 4,
      title: "Without mu: use x-bar and lose one degree of freedom",
      content: [
        String.raw`In real life we almost never know $\mu$. We have only the sample, so we measure deviations from the sample mean $\bar{x}$ instead. Remember the deviation idea from step 3. Take our three loaves, 498, 505, and 501 grams, with $\bar{x} = 501.33$ grams. Their deviations are $498 - 501.33 = -3.33$, $505 - 501.33 = +3.67$, and $501 - 501.33 = -0.33$.`,
        String.raw`These three deviations must sum to zero, because $\bar{x}$ is the balance point of the sample (the mean always is). That means only two of them are free. Pick any two, and the third is forced. We say the sample has $n - 1 = 2$ degrees of freedom, where $n = 3$ is the sample size. Degrees of freedom count how many values can still vary once a quantity has been computed from the same data.`,
        String.raw`The sample variance uses this count. We add the squared deviations from $\bar{x}$ and divide by $n - 1$, not by $n$: $s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2$. The sample standard deviation is $s = \sqrt{s^2}$. The reason for $n - 1$ is subtle, so we will test it carefully in steps 6 and 7.`,
      ],
      example: [
        String.raw`Squared deviations, using exact fractions: the deviations are $-10/3$, $11/3$, and $-1/3$. Their squares are $100/9$, $121/9$, and $1/9$. The sum is $222/9 = 74/3 = 24.67$ square grams, rounded.`,
        String.raw`Divide by $n - 1 = 2$: $s^2 = 24.67 / 2 = 12.33$ square grams, so $s = \sqrt{12.33} = 3.51$ grams. For comparison, dividing by $n = 3$ gives $24.67 / 3 = 8.22$. The smaller number is the one that tends to be too small, as step 6 shows.`,
      ],
    },
    {
      step: 5,
      title: "Standard deviation describes loaves; standard error describes the mean",
      content: [
        String.raw`We now have spread numbers that answer different questions. The sample standard deviation $s$ answers: if I pick one loaf, how far is its weight from the average loaf? That is a fact about the loaves themselves, so it stays roughly the same no matter how many loaves we weigh.`,
        String.raw`The standard error answers a different question: how far is our sample mean likely to be from the true population mean $\mu$? It is written $\text{SE}$ and equals the sample standard deviation divided by the square root of the sample size: $\text{SE}(\bar{x}) = \frac{s}{\sqrt{n}}$. The mean is more precise than any single loaf, because the random ups and downs of different loaves partly cancel when we average them. More loaves means a smaller standard error.`,
        String.raw`Common misreading: $n$ must count independent units. Weighing the same loaf three times on a scale gives three readings of one loaf, not three loaves, so for questions about bread $n$ is still 1. Counting repeated readings as separate samples makes the standard error look far too small, and the result then looks more certain than it is.`,
      ],
      example: [
        String.raw`Our sample of three loaves has $s = 3.51$ grams, so $\text{SE}(\bar{x}) = 3.51 / \sqrt{3} = 3.51 / 1.732 = 2.03$ grams. Our sample mean of 501.33 grams is uncertain by about 2 grams.`,
        String.raw`Now suppose we weighed twelve loaves and the spread stayed at $s = 3.51$ grams (a hypothetical). Then $\text{SE}(\bar{x}) = 3.51 / \sqrt{12} = 3.51 / 3.464 = 1.01$ grams. Twelve is four times three, so the standard error is halved, from 2.03 to 1.01, while the spread of the loaves stayed at 3.51 grams.`,
      ],
    },
    {
      step: 6,
      title: "Dividing by n underestimates spread on average",
      content: [
        String.raw`Here is an experiment we can finish by hand. Pick two loaves from the bakery with replacement, meaning we put the first loaf back before picking the second. Every pick is equally likely to be any of the ten loaves, so there are $10 \times 10 = 100$ equally likely ordered pairs. For each pair, compute its sample variance, then average the results over all 100 pairs.`,
        String.raw`Take one pair as an example: 498 and 505 grams. Its mean is $(498 + 505)/2 = 501.5$. The squared deviations are $(498 - 501.5)^2 = 12.25$ and $(505 - 501.5)^2 = 12.25$, which sum to 24.5. Dividing by $n = 2$ gives 12.25. Dividing by $n - 1 = 1$ gives 24.5. Now do the same for every pair and average.`,
        String.raw`The complete average is the key result. Dividing by $n$ averages to 3.9 square grams, which is only half of the true $\sigma^2 = 7.8$. Dividing by $n - 1$ averages to exactly 7.8, which equals $\sigma^2$. The shortfall is not bad luck. Dividing by $n$ underestimates the spread systematically, and dividing by $n - 1$ is correct on average.`,
      ],
      example: [
        String.raw`For any two numbers $a$ and $b$, the sum of squared deviations from their own mean is $(a-b)^2/2$. Check with 498 and 505: $(498 - 505)^2 / 2 = 49/2 = 24.5$, which matches the pair above. So the average over the 100 pairs is the average of $(a-b)^2/2$.`,
        String.raw`Now average $(a-b)^2$ over all 100 pairs. Use the population facts from step 3: the average of $X$ over the ten loaves is 500, and the average of $X^2$ is $\sigma^2 + \mu^2 = 7.8 + 250000 = 250007.8$. Expanding, $(a-b)^2 = a^2 - 2ab + b^2$, and for two independent picks the average of $ab$ is $500 \times 500 = 250000$. So the average of $(a-b)^2$ is $2 \times 250007.8 - 2 \times 250000 = 500015.6 - 500000 = 15.6$.`,
        String.raw`Half of 15.6 is 7.8, the average sum of squares over the pairs. Divide that by $n = 2$ to get 3.9, and divide by $n - 1 = 1$ to get 7.8. These are the same 3.9 and 7.8 from above, now shown without listing all 100 pairs.`,
      ],
    },
    {
      step: 7,
      title: "Why we divide by n minus 1: the full derivation",
      content: [
        String.raw`Let $X_1, X_2, \dots, X_n$ be the values in a sample. We assume each value is drawn independently from the same population. Independent means that one draw does not affect another. The population has mean $\mu$ and variance $\sigma^2$. Drawing with replacement from the bakery produces exactly this kind of sample, with mean 500 and variance 7.8. Let $\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$ be the sample mean, and let $E$ mean the average over all possible samples. We want to show $E\left[\frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2\right] = \sigma^2$.`,
        String.raw`The trick is to measure each value from the true $\mu$ instead, using the split $X_i - \mu = (X_i - \bar{X}) + (\bar{X} - \mu)$. Square both sides and add over $i$. The cross term is $2(\bar{X} - \mu)\sum_{i}(X_i - \bar{X})$, and $\sum_{i}(X_i - \bar{X}) = 0$ by the definition of $\bar{X}$, so it disappears. This gives the deviation identity: $\sum_{i=1}^{n}(X_i - \mu)^2 = \sum_{i=1}^{n}(X_i - \bar{X})^2 + n(\bar{X} - \mu)^2$.`,
        String.raw`Now take averages. Each $X_i$ satisfies $E[(X_i - \mu)^2] = \sigma^2$, so the left side averages to $n\sigma^2$. For the last term, $\text{Var}\left(\sum_{i} X_i\right) = n\sigma^2$ because the variances of independent values add. Multiplying by $\frac{1}{n}$ multiplies the variance by $\frac{1}{n^2}$, so $\text{Var}(\bar{X}) = \frac{1}{n^2} \cdot n\sigma^2 = \frac{\sigma^2}{n}$. Since $\bar{X}$ has mean $\mu$, $E[(\bar{X} - \mu)^2] = \text{Var}(\bar{X})$, and therefore $E[n(\bar{X} - \mu)^2] = n \cdot \frac{\sigma^2}{n} = \sigma^2$.`,
        String.raw`Put these together: $n\sigma^2 = E\left[\sum_{i}(X_i - \bar{X})^2\right] + \sigma^2$, so $E\left[\sum_{i}(X_i - \bar{X})^2\right] = (n-1)\sigma^2$. Dividing both sides by $n - 1$ gives $E[s^2] = \sigma^2$. The sample mean absorbs one degree of freedom, leaving $n - 1$ to measure $\sigma^2$. The derivation depends on independence. With correlated observations, such as several readings from one loaf or people from one household, the variance of the mean is larger than $\sigma^2/n$, so the standard error from step 5 is too small. Remember this one fact: the squared deviations from the sample mean average to $(n-1)\sigma^2$, so dividing them by $n - 1$ gives the true variance on average.`,
      ],
      example: [
        String.raw`Check with $n = 2$ and the bakery numbers. The derivation predicts $E\left[\sum (X_i - \bar{X})^2\right] = (2-1) \times 7.8 = 7.8$. In step 6 we found that the average sum of squares over all 100 pairs is 7.8. The algebra and the count agree.`,
        String.raw`Check with $n = 3$, using all 1,000 ordered triples of loaves drawn with replacement. The derivation predicts an average sum of squares of $(3-1) \times 7.8 = 15.6$. Dividing that by $n = 3$ gives 5.2, which is too small, and dividing by $n - 1 = 2$ gives 7.8, which equals $\sigma^2$. A computer check over all 1,000 triples gives the same averages: 15.6, 5.2, and 7.8.`,
      ],
    },
  ],
};
