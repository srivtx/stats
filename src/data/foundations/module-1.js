// Module 1 foundation, built from the ground up with worked examples.
export default {
  title: "Descriptive Statistics and Data Foundations",
  summary: "Descriptive statistics is the art of summarizing a list of numbers so that a person can see its shape, center, and spread at a glance. In this module you will learn to count values into a histogram, to find the mean, median, and mode, to draw a boxplot, to choose charts that people read accurately, and to use logarithms when numbers grow by multiplying rather than adding. These tools come before any test or model, because a wrong picture of the data leads to wrong conclusions.",
  steps: [
    {
      step: 1,
      title: "Counting values into bins makes a histogram",
      content: [
        String.raw`Imagine you measure the weights of ten people, in pounds: 150, 155, 158, 162, 165, 168, 172, 175, 179, and 195. A plain list of ten numbers is hard to read. Where are most of the weights? Is any weight unusual? To answer these questions, we first split the number line into equal intervals called bins. Our bins are 150 up to 160, then 160 up to 170, and so on. Each bin is 10 pounds wide.`,
        String.raw`Next we count. A bin includes its left edge but not its right edge. So the first bin, written $[150, 160)$, contains every weight from 150 up to but not including 160. The weights 150, 155, and 158 fall inside it, so its count is 3. For the k-th bin, we write the count as $N_k$. Doing the same for every bin gives $N_1 = 3$, $N_2 = 3$, $N_3 = 3$, $N_4 = 0$, and $N_5 = 1$.`,
        String.raw`A histogram draws each count as a vertical bar, one bar per bin, with the bars touching each other. Touching bars tell the reader that the values run continuously across the bins, which is the right picture for measurements such as weight. A taller bar means more people fall in that range. The histogram shows the shape of the whole list at once, something a column of numbers never does.`,
      ],
      example: [
        String.raw`Count check. The five bins hold $3 + 3 + 3 + 0 + 1 = 10$ weights. This equals the sample size, which we write as $n$. Here $n = 10$. Always check that the counts add up to $n$ before you draw anything, because a missing count means a value was lost.`,
        String.raw`The last bin, $[190, 200)$, holds only the weight 195. It stands alone, far from the rest of the group, so the histogram shows a lone bar on the right. That lone bar is the first hint of an outlier, which is a value that sits far away from the others. We will meet outliers again when we study boxplots.`,
      ],
    },
    {
      step: 2,
      title: "Bar heights must be scaled so the total area is one",
      content: [
        String.raw`Step 1 gave us the counts 3, 3, 3, 0, and 1, for bins that are $h = 10$ pounds wide, with sample size $n = 10$. We call $h$ the bin width. Counts alone are not a fair picture, because a bin twice as wide will collect more people just by being wider. We need a bar height that does not depend on the bin width. A density does this. A density is an amount per unit of width. Here the amount is the share of people, and the unit is one pound.`,
        String.raw`For bin $k$, the share of people is $N_k / n$. Dividing that share by the width $h$ gives the height of the bar. The area of a bar is its height times its width, so the width cancels:`,
        String.raw`$$\text{Area}_k = \frac{N_k}{n\,h} \cdot h = \frac{N_k}{n}$$`,
        String.raw`Adding the areas of all bins, and using the fact that the counts add up to $n$, gives $\sum_k N_k / n = n / n = 1$. The total area is exactly one whole. Common misreading: the height is not the share. The height 0.03 is 3 percent of people per pound. Multiply by the 10-pound width and you get 0.30, which is the 30 percent of people (3 out of 10) in that bin.`,
      ],
      example: [
        String.raw`Bin 1 has $N_1 = 3$, so its height is $\frac{3}{10 \cdot 10} = \frac{3}{100} = 0.03$, and its area is $0.03 \cdot 10 = 0.30$. Bins 2 and 3 have the same height and area. Bin 4 has height 0 and area 0. Bin 5 has $N_5 = 1$, so its height is $\frac{1}{100} = 0.01$ and its area is $0.01 \cdot 10 = 0.10$. The total area is $0.30 + 0.30 + 0.30 + 0 + 0.10 = 1.00$.`,
        String.raw`Now change the bin width to $h = 20$ pounds, starting at 150. The new bins are $[150, 170)$, $[170, 190)$, and $[190, 210)$, with counts 6, 3, and 1. Their heights are $\frac{6}{10 \cdot 20} = 0.03$, $\frac{3}{200} = 0.015$, and $\frac{1}{200} = 0.005$. Their areas are $20 \cdot 0.03 = 0.60$, $20 \cdot 0.015 = 0.30$, and $20 \cdot 0.005 = 0.10$. The total is $0.60 + 0.30 + 0.10 = 1.00$ again. The total area stays at one, but the shape changes, which is why the choice of bin width matters.`,
      ],
    },
    {
      step: 3,
      title: "The mean is the balance point of the data",
      content: [
        String.raw`Now we want one number that says where the middle of the data sits. The most familiar one is the average, which statisticians call the mean. Take five numbers: 1, 2, 3, 4, and 10. Picture each number as a one-kilogram weight placed on a number line at its position. Where should a single support go so the line balances? Try 3. The weight at 10 is seven units to the right of 3, while the weights at 1 and 2 are only two and one units to the left. The line tips to the right, so 3 is too far left.`,
        String.raw`The balance point is the mean. The mean is the total of the numbers divided by how many there are. We write $\bar{x}$, read as x-bar, for the mean of the sample $x_1, x_2, \dots, x_n$, where $n$ is how many numbers there are. The symbol $\sum$ means add up the terms, so $\sum_{i=1}^{n} x_i$ means add $x_1$ through $x_n$:`,
        String.raw`$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$`,
        String.raw`Why does this formula give the balance point? A point $c$ balances the data when the signed distances from $c$ add to zero: $\sum_{i=1}^{n} (x_i - c) = 0$. Here $x_i - c$ is positive when the value sits to the right of $c$, and negative when it sits to the left. Splitting the sum gives $\sum_i x_i - nc = 0$, so $c = \frac{1}{n}\sum_i x_i = \bar{x}$. The mean is the only point where the signed distances cancel.`,
      ],
      example: [
        String.raw`Check with the five numbers. The total is $1 + 2 + 3 + 4 + 10 = 20$, and $n = 5$, so the mean is $\bar{x} = 20 / 5 = 4$. The signed distances from 4 are $1 - 4 = -3$, $2 - 4 = -2$, $3 - 4 = -1$, $4 - 4 = 0$, and $10 - 4 = 6$. Their total is $-3 - 2 - 1 + 0 + 6 = 0$. The line balances at 4.`,
        String.raw`Notice the 10. It sits far to the right and pulls the balance point toward itself. Without the 10, the four numbers 1, 2, 3, and 4 have a mean of $10 / 4 = 2.5$. With the 10 included, the mean rises to 4. One extreme value moved the mean by $4 - 2.5 = 1.5$. This is the first warning sign of the mean: it responds strongly to extreme values.`,
      ],
    },
    {
      step: 4,
      title: "The median and the mode describe the middle in other ways",
      content: [
        String.raw`Remember the mean of 4 from step 3, and the outlier that pulled it. Another way to find the middle is to sort the list from smallest to largest and pick the value in the center. This value is the median. If the number of values is odd, the median is the single middle value. If the number of values is even, the median is the average of the two middle values. Half of the data lies below the median and half lies above it.`,
        String.raw`The third measure is the mode, which is the value that appears most often. A list can have one mode, several modes, or no mode at all when every value is different. Mode, median, and mean are called measures of central tendency, because each one tries to locate the center of the data in a different way.`,
        String.raw`Which measure is right? It depends on the question. The mean uses every value, so one extreme value can drag it far away. The median depends only on the values near the center. If you change the largest value in a list from 10 to 1000, the median does not move at all, while the mean moves a lot. This resistance to extreme values is why the median is the usual summary for house prices and incomes.`,
      ],
      example: [
        String.raw`Take the eight numbers 2, 4, 4, 4, 5, 5, 7, and 9. They are already sorted. Here $n = 8$ is even, so the median is the average of the 4th and 5th values: $(4 + 5) / 2 = 4.5$. The mode is 4, because 4 appears three times, more than any other value. The mean is $\bar{x} = (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) / 8 = 40 / 8 = 5$. So the order is mode 4, then median 4.5, then mean 5. The large value 9 pulls the mean to the right.`,
        String.raw`House prices in thousands of dollars: 200, 220, 230, 250, and 5000. Sorted, the middle value is 230, so the median is 230. The mean is $(200 + 220 + 230 + 250 + 5000) / 5 = 5900 / 5 = 1180$, or 1180 thousand dollars. Now replace the 5000 with 50000. The median stays at 230, while the mean becomes $(200 + 220 + 230 + 250 + 50000) / 5 = 50900 / 5 = 10180$. The median did not notice the change, but the mean rose by more than eight times.`,
      ],
    },
    {
      step: 5,
      title: "A boxplot shows the middle half and flags outliers",
      content: [
        String.raw`Step 4 introduced the median, which splits the sorted data in half. The median of the lower half is called the first quartile, written $Q_1$. It marks the 25 percent point, so about a quarter of the data lies below it. The median of the upper half is called the third quartile, written $Q_3$. It marks the 75 percent point. The median itself sits at the 50 percent point.`,
        String.raw`A boxplot draws five numbers, called the five-number summary: the minimum, $Q_1$, the median, $Q_3$, and the maximum. A box runs from $Q_1$ up to $Q_3$, with a line drawn across it at the median. The box therefore contains the middle half of the data. Its length is the interquartile range, written $\text{IQR}$, which equals $Q_3 - Q_1$. The IQR measures spread: it is how wide the middle half is.`,
        String.raw`The whiskers reach out from the box toward the extreme values, but they stop at fences. The fences are $Q_1 - 1.5 \cdot \text{IQR}$ and $Q_3 + 1.5 \cdot \text{IQR}$. A point beyond a fence is an outlier, and it is drawn as a separate dot. Each whisker stops at the most extreme value that is still inside its fence. Why this matters: the boxplot reveals outliers without the reader scanning the whole list.`,
      ],
      example: [
        String.raw`Data: 10, 15, 18, 20, 22, 24, 25, 28, 30, 32, 60. There are $n = 11$ values, so the median is the 6th value, 24. The lower half is 10, 15, 18, 20, 22, whose median is 18, so $Q_1 = 18$. The upper half is 25, 28, 30, 32, 60, whose median is 30, so $Q_3 = 30$. The IQR is $30 - 18 = 12$. The five-number summary is 10, 18, 24, 30, 60.`,
        String.raw`The upper fence is $30 + 1.5 \cdot 12 = 30 + 18 = 48$. The value 60 is above 48, so it is an outlier and gets its own dot. The upper whisker stops at 32, the largest value below 48. The lower fence is $18 - 1.5 \cdot 12 = 18 - 18 = 0$. The smallest value, 10, is above 0, so the lower whisker reaches 10. Software packages sometimes compute quartiles with slightly different rules, so your numbers may differ a little for small lists.`,
      ],
    },
    {
      step: 6,
      title: "People compare lengths on a common baseline more accurately than slices",
      content: [
        String.raw`Now we ask how well people read a chart. Suppose four categories, A, B, C, and D, make up 24 percent, 26 percent, 25 percent, and 25 percent of a total. A pie chart gives each category a slice. The slice angle $\theta_i$ for category $i$ is proportional to its share: a whole circle has 360 degrees, so $\theta_i = 360 \cdot (\text{share}_i)$. Here the four angles are 86.4, 93.6, 90, and 90 degrees.`,
        String.raw`A bar chart gives each category one bar. All the bars stand on the same baseline at zero, and each bar's height equals its percentage. In 1984, William Cleveland and Robert McGill tested how accurately people judge different visual cues. They found that people judge positions along a common baseline most accurately, then lengths, and that angles and areas are judged less accurately than lengths. A pie chart asks the reader to judge angles.`,
        String.raw`The rule follows directly. When you want readers to compare several categories, use bars on a common baseline. Pie charts are hard to compare when the slices are close in size, and a three-dimensional pie chart is worse, because the tilt distorts the slices further. Use a pie chart only for a single part of a whole, and only when the parts are clearly different in size.`,
      ],
      example: [
        String.raw`For the pie chart, the angles are $0.24 \cdot 360 = 86.4$, $0.26 \cdot 360 = 93.6$, $0.25 \cdot 360 = 90$, and $0.25 \cdot 360 = 90$ degrees. They add to $86.4 + 93.6 + 90 + 90 = 360$, as they should. Now ask: is B bigger than A? B's slice is $93.6 - 86.4 = 7.2$ degrees wider, which is about 8 percent larger in angle. Most readers cannot see a gap that small by eye.`,
        String.raw`For the bar chart, the heights are 24, 26, 25, and 25 on a scale from 0 to 30. B's bar is $26 - 24 = 2$ units taller than A's. Both bars start at the same zero line, so the eye compares their tops directly. The gap of 2 is $2 / 26 \approx 0.077$, about 7.7 percent of the taller bar. Comparing two tops on a common line is an easy judgment, so the same data becomes readable.`,
      ],
    },
    {
      step: 7,
      title: "Logarithms turn multiplying into adding",
      content: [
        String.raw`So far every step used sums and differences. Many real quantities grow by multiplying, such as a population that doubles each year or a gene whose activity is halved by a drug. On a raw scale, a doubling and a halving look unequal. Going from 1.0 to 2.0 adds 1.0, but going from 1.0 to 0.5 subtracts only 0.5, even though both are a factor of two. A logarithm puts equal factors at equal distances.`,
        String.raw`The base-2 logarithm asks how many times we must multiply 2 by itself to reach a number $x$. We write $y = \log_2(x)$ when $2^y = x$. For example, $\log_2(8) = 3$, because $2 \cdot 2 \cdot 2 = 8$. Also $\log_2(1/2) = -1$, because $2^{-1} = 1/2$. The natural logarithm $\ln$ uses base $e \approx 2.718$ instead of 2, but the rules below hold for every base $b > 0$ with $b \ne 1$.`,
        String.raw`Now the rules. Let $u$ and $v$ be positive numbers, and let $p = \log_b(u)$ and $q = \log_b(v)$, so that $u = b^p$ and $v = b^q$. Multiplying gives $uv = b^p b^q = b^{p+q}$, and taking the logarithm of both sides gives $\log_b(uv) = p + q$. Dividing gives $u / v = b^{p-q}$, and raising to a power gives $u^k = b^{kp}$. Therefore: $$\log_b(uv) = \log_b(u) + \log_b(v), \qquad \log_b\left(\frac{u}{v}\right) = \log_b(u) - \log_b(v), \qquad \log_b(u^k) = k\log_b(u)$$`,
        String.raw`The rules break at zero and below. As $x$ approaches 0 from above, $\log(x)$ falls toward minus infinity, so $\log(0)$ has no finite value, and negative numbers have no real logarithm. Count data often contain zeros, so practitioners use $\log(x + 1)$ instead, which is a convention and must be reported as one.`,
      ],
      example: [
        String.raw`Gene activity, with control set to 1.0. Gene A doubles to 2.0, so its ratio to control is $2.0 / 1.0 = 2.0$. Gene B halves to 0.5, so its ratio is $0.5 / 1.0 = 0.5$. On the raw scale the changes are $+1.0$ and $-0.5$, which look asymmetric. On the base-2 log scale they are $\log_2(2) = 1$ and $\log_2(0.5) = -1$. The changes are now equal in size and opposite in sign.`,
        String.raw`Take 1000 and 2000, and then 10 and 20. The raw differences are 1000 and 10, which are very different sizes, even though both pairs are a factor of two. Their logarithms are $\log_2(2000) - \log_2(1000) = \log_2\left(\frac{2000}{1000}\right) = \log_2(2) = 1$ and $\log_2(20) - \log_2(10) = \log_2(2) = 1$. Remember this: a ratio becomes a difference, $\log_b(u/v) = \log_b(u) - \log_b(v)$, so equal fold changes become equal steps on a log scale.`,
      ],
    },
  ],
};
