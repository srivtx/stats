// Deep first-principles theory and extra knowledge-check questions for module-1
export const deepContent = {
  1: {
    derivation: {
      headline: "Bin counts are binomial, so histogram heights estimate density with a variance that shrinks as nh grows",
      axioms: [
        String.raw`The data are $x_1, \dots, x_n$, independent draws from an unknown continuous density $f$, and the range is partitioned into disjoint half-open bins $[b_k, b_{k+1})$ of common width $h = b_{k+1} - b_k$.`,
        String.raw`A bin's true probability is $\pi_k = P(b_k \le X < b_{k+1}) = \int_{b_k}^{b_{k+1}} f(t)\,dt$, and the bin count $N_k = \sum_{i=1}^n \mathbf{1}\{x_i \in [b_k, b_{k+1})\}$ counts the observations that fall in bin $k$.`,
        String.raw`The density estimate uses bar height $\hat f_k = \dfrac{N_k}{nh}$, and $f$ is smooth enough that its derivative $f'$ is bounded near the point of interest.`,
      ],
      steps: [
        {
          title: "Each observation lands in exactly one bin",
          body: String.raw`Because the bins are disjoint and cover the sample range, each $x_i$ satisfies $\mathbf{1}\{x_i \in [b_k, b_{k+1})\} = 1$ for exactly one $k$. Summing over all bins gives $\sum_k N_k = n$, so the relative frequencies $N_k / n$ add up to 1.`,
        },
        {
          title: "Bar areas equal relative frequencies",
          body: String.raw`The area of bin $k$ is $\hat f_k \cdot h = \dfrac{N_k}{nh} \cdot h = \dfrac{N_k}{n}$. Summing all bar areas gives $\sum_k \hat f_k h = \sum_k N_k / n = 1$, which is exactly the normalization a probability density requires. Dividing by $h$ is what makes areas, rather than heights, carry probability.`,
        },
        {
          title: "Counts are binomial with mean n times pi",
          body: String.raw`Each $x_i$ independently lands in bin $k$ with probability $\pi_k$, so $N_k \sim \text{Binomial}(n, \pi_k)$, which gives $E[N_k] = n\pi_k$ and $\text{Var}(N_k) = n\pi_k(1-\pi_k)$. By the mean value theorem for integrals, $\pi_k = f(\xi_k)\,h$ for some $\xi_k$ inside the bin, so $E[\hat f_k] = \pi_k / h = f(\xi_k)$, which is close to $f$ at the bin when $h$ is small.`,
        },
        {
          title: "Variance and bias follow from the binomial",
          body: String.raw`$\text{Var}(\hat f_k) = \dfrac{\text{Var}(N_k)}{(nh)^2} = \dfrac{\pi_k(1-\pi_k)}{n h^2}$. Substituting $\pi_k = f(\xi_k)\,h$ gives $\dfrac{f(\xi_k)\,(1-\pi_k)}{nh}$, which is approximately $f/(nh)$ for small $h$. The bias $E[\hat f_k] - f(x)$ is bounded by $\sup|f'| \cdot h$ for any $x$ in the bin, so bias is of order $h$ while variance grows as $h$ shrinks.`,
        },
        {
          title: "Bias-variance trade-off and consistency",
          body: String.raw`Mean squared error is approximately $\text{MSE} \approx C_1 h^2 + \dfrac{C_2}{nh}$ for constants $C_1, C_2$ that depend on $f$. Shrinking $h$ reduces bias but inflates variance. The derivative $2C_1 h - \dfrac{C_2}{n h^2}$ vanishes at $h^3 = \dfrac{C_2}{2C_1 n}$, so the best width scales as $h^* \propto n^{-1/3}$. The estimate converges to $f$ only when $h \to 0$ and $nh \to \infty$.`,
        },
      ],
      result: String.raw`$$\text{Var}\big(\hat f(x)\big) \approx \frac{f(x)}{nh}$$ The histogram height has variance of order $1/(nh)$ and bias of order $h$. It is therefore consistent when $h \to 0$ and $nh \to \infty$, and its error-minimizing bin width scales as $h^* \propto n^{-1/3}$.`,
      assumptionsBreak: "The derivation assumes independent draws and a bin grid fixed before looking at the data. If the bins are tuned until a pattern appears, or the variable is discrete or unordered, the bin-probability argument fails and bar heights can be artifacts of where the edges happen to fall.",
    },
    quiz: [
      {
        question: String.raw`In a density histogram with bin width $h$ and sample size $n$, the height of bin $k$ is $N_k/(nh)$ rather than $N_k/n$. Why?`,
        options: [
          "To make the tallest bar always equal 1",
          String.raw`To make the bar area equal the bin's relative frequency, so all bar areas sum to 1 for any bin width`,
          "To guarantee that every bin contains at least one observation",
          "Because histogram heights must be integers",
        ],
        answer: 1,
        explanation: String.raw`Area is height times width: $\frac{N_k}{nh} \cdot h = \frac{N_k}{n}$, so the areas, not the heights, carry probability and they total 1. The trap is thinking the division by $h$ only keeps the heights small or tidy.`,
      },
      {
        question: String.raw`Bin counts follow a Binomial distribution with $n = 200$ and bin probability $\pi = 0.1$. What is $\text{Var}(N_k)$?`,
        options: [
          "20",
          "2",
          "180",
          "18",
        ],
        answer: 3,
        explanation: String.raw`$\text{Var}(N_k) = n\pi(1-\pi) = 200 \cdot 0.1 \cdot 0.9 = 18$. The traps are reporting the mean $n\pi = 20$ or using $n(1-\pi) = 180$.`,
      },
      {
        question: String.raw`With sample size $n$ fixed and $h$ small, $\text{Var}(\hat f(x)) \approx f(x)/(nh)$. If the bin width is halved from $h$ to $h/2$, what happens to the variance of the bin height?`,
        options: [
          "It halves",
          "It quadruples",
          "It doubles",
          "It stays the same",
        ],
        answer: 2,
        explanation: String.raw`The variance is inversely proportional to $h$, so $\frac{f}{n(h/2)} = 2 \cdot \frac{f}{nh}$. The trap is assuming the variance scales like $1/h^2$ and therefore quadruples.`,
      },
      {
        question: String.raw`For a histogram of a smooth density, what happens to the bias of the bin height as the bin width $h$ increases?`,
        options: [
          String.raw`Bias grows roughly in proportion to $h$, since a flat bar smears density across the whole bin`,
          "Bias shrinks as h grows, because each bar covers more data",
          "Bias is zero for any h once the sample is large",
          "Bias depends only on n and not on h",
        ],
        answer: 0,
        explanation: String.raw`The bar height is a flat average of $f$ across a width-$h$ interval, so the error from treating a sloped density as flat is bounded by $\sup|f'| \cdot h$. The trap is believing that a large sample removes this bias, when it only reduces the variance.`,
      },
      {
        question: String.raw`Which pair of conditions makes a histogram estimate converge to the true density $f(x)$ as $n \to \infty$?`,
        options: [
          String.raw`$h \to 0$ alone`,
          String.raw`$nh \to \infty$ alone`,
          String.raw`$h \to 0$ and $nh \to \infty$`,
          String.raw`$n \to \infty$ with $h$ fixed at 1`,
        ],
        answer: 2,
        explanation: String.raw`Bias vanishes only if $h \to 0$, and the variance term $f/(nh)$ vanishes only if $nh \to \infty$. Shrinking $h$ alone inflates variance, and fixed bins never remove bias.`,
      },
    ],
  },
  4: {
    derivation: {
      headline: "Squared loss yields the mean, absolute loss yields the median, and their breakdown points differ sharply",
      axioms: [
        String.raw`The sample is $x_1, \dots, x_n$ with $n \ge 1$, and the ordered values are $x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$.`,
        String.raw`For a candidate center $c$, the squared-error loss is $L_2(c) = \sum_{i=1}^n (x_i - c)^2$ and the absolute-error loss is $L_1(c) = \sum_{i=1}^n |x_i - c|$.`,
        String.raw`The mode of a discrete sample is a value $v$ that maximizes the count $N_v = \#\{i : x_i = v\}$, so it is defined by counting rather than by minimizing a loss.`,
      ],
      steps: [
        {
          title: "The mean minimizes squared loss",
          body: String.raw`Differentiate $L_2(c)$ with respect to $c$: $\dfrac{d}{dc}\sum_i (x_i - c)^2 = -2\sum_i (x_i - c)$. Setting this to zero gives $\sum_i x_i = nc$, so $c = \bar x = \dfrac{1}{n}\sum_i x_i$. The second derivative is $2n > 0$, so this critical point is a minimum.`,
        },
        {
          title: "The median minimizes absolute loss",
          body: String.raw`$L_1$ is piecewise linear, and at every $c$ that is not a data point its slope is $\#\{i : x_i < c\} - \#\{i : x_i > c\}$. Each time $c$ crosses a data point the slope rises by 2, so it climbs from $-n$ at the far left to $+n$ at the far right. The slope is zero where the two counts balance, which is the middle order statistic for odd $n$ and any value between the two middle order statistics for even $n$.`,
        },
        {
          title: "The mode is an argmax of counts",
          body: String.raw`The mode is not the minimizer of any loss. It is the maximizer of frequency, $\operatorname{argmax}_v N_v$ for discrete data or $\operatorname{argmax}_x \hat f(x)$ for a density estimate. Ties are possible: when two values share the highest count, the sample has two modes.`,
        },
        {
          title: "The mean has a breakdown point of 1/n",
          body: String.raw`Replace one observation $x_1$ by a value $M$. The new mean is $\bar x' = \bar x + (M - x_1)/n$, which goes to $+\infty$ as $M \to \infty$. A single corrupted point therefore ruins the mean, and its breakdown point is $1/n$, which vanishes as the sample grows.`,
        },
        {
          title: "The median has a breakdown point of 50%",
          body: String.raw`For odd $n = 2m+1$ the median is $x_{(m+1)}$. Pushing it to $+\infty$ requires the $m+1$ largest values $x_{(m+1)}, \dots, x_{(n)}$ to all go to infinity, so at least $(n+1)/2$ observations must be corrupted. Asymptotically this is half of the sample, so the median's breakdown point is 50%.`,
        },
      ],
      result: String.raw`$$\bar x = \operatorname{argmin}_c \sum_{i=1}^n (x_i - c)^2, \qquad \tilde x = \operatorname{argmin}_c \sum_{i=1}^n |x_i - c|$$ The mean is the squared-error center and the median is the absolute-error center. A single extreme point drives the mean to infinity, while the median needs about half the sample to be corrupted.`,
      assumptionsBreak: "The mean is the right center only when squared error is the relevant loss and the data are not heavy-tailed. For skewed quantities such as incomes or latencies, one extreme value dominates the sum, so the mean describes the tail rather than a typical member. For continuous data without repeated values, the mode is not well defined without binning.",
    },
    quiz: [
      {
        question: String.raw`You transform every observation by $y_i = a x_i + b$, where $a$ and $b$ are constants. Which expression gives the mean of the new sample?`,
        options: [
          String.raw`$a\,\bar{x} + b$`,
          String.raw`$\bar{x} + b$, because the scale $a$ does not affect the mean`,
          String.raw`$a\,\bar{x} + \dfrac{b}{n}$`,
          String.raw`$(a + b)\,\bar{x}$`,
        ],
        answer: 0,
        explanation: String.raw`Summing gives $\frac{1}{n}\sum_i (a x_i + b) = a\bar{x} + \frac{nb}{n} = a\bar{x} + b$. The common trap is writing $b/n$, forgetting that the constant is added once per observation.`,
      },
      {
        question: String.raw`A sample has seven distinct values. A candidate center $c$ lies strictly between the third and fourth ordered values. What is the slope of $L_1(c) = \sum_i |x_i - c|$ with respect to $c$ at this point?`,
        options: [
          "+1",
          "0",
          "-1",
          "-7",
        ],
        answer: 2,
        explanation: String.raw`Three points lie below $c$ and four lie above it, so the slope is $3 - 4 = -1$. Moving $c$ to the right brings it closer to the four upper points than it moves away from the three lower ones. The trap is answering $-7$, which uses the total count instead of the balance.`,
      },
      {
        question: String.raw`A sample has $n = 9$ values. Some of them are replaced by values that tend to $+\infty$. What is the smallest number of replaced values that can force the sample median to $+\infty$?`,
        options: [
          "1",
          "5",
          "4",
          "9",
        ],
        answer: 1,
        explanation: String.raw`The median is $x_{(5)}$, and it goes to infinity only if $x_{(5)}, \dots, x_{(9)}$ all do, which is five values, or $(n+1)/2$. The trap is $4 = \lfloor n/2 \rfloor$, which falls one short.`,
      },
      {
        question: String.raw`A discrete sample has these counts: the value 1 appears 3 times, the value 2 appears 5 times, the value 3 appears 5 times, and the value 4 appears 2 times. Which statement about the mode is correct?`,
        options: [
          "Exactly one mode, the value 2, because it is the first maximum",
          "No mode exists, because the mean is not an observed value",
          "The mode equals the mean, so the question is moot",
          "Two modes, 2 and 3, since both have the maximal count of 5",
        ],
        answer: 3,
        explanation: String.raw`The mode is the argmax of the counts, and the values 2 and 3 tie at 5, so the sample is bimodal. The trap is choosing the first maximum by position, which has no statistical meaning.`,
      },
      {
        question: String.raw`A sample is $\{2, 4, 6, 8\}$. A fifth value, $100$, is appended. How do the mean and median change?`,
        options: [
          "The mean goes from 5 to 24, and the median goes from 5 to 6",
          "Both stay at 5",
          "The mean stays at 5, and the median jumps to 24",
          "The mean becomes 20, and the median stays at 5",
        ],
        answer: 0,
        explanation: String.raw`The new mean is $120/5 = 24$, while the new median is the middle value $6$ of $\{2, 4, 6, 8, 100\}$. The median moves only from 5 to 6 because the outlier sits above it and only its rank matters.`,
      },
    ],
  },
  32: {
    derivation: {
      headline: "A chart is a noisy channel, so the gap needed to order two categories scales with that channel's perceptual noise",
      axioms: [
        String.raw`Categories $i = 1, \dots, k$ have true proportions $p_i \ge 0$ with $\sum_{i=1}^k p_i = 1$, and the goal of a chart is to let a viewer order any pair of categories correctly.`,
        String.raw`A viewer's reading of category $i$ is an unbiased but noisy estimate $\hat p_i = p_i + \varepsilon_i$, where the errors $\varepsilon_i$ have mean zero, are independent across categories, and have a variance $\sigma^2_{\text{ch}}$ that depends on the visual channel.`,
        String.raw`$\Phi$ denotes the standard normal CDF, and the difference of two independent zero-mean normal errors is normal with variance equal to the sum of their variances.`,
      ],
      steps: [
        {
          title: "Each chart encodes the same proportion in a different channel",
          body: String.raw`A bar chart of maximum height $L$ encodes category $i$ as length $H_i = L\,p_i$ on a common baseline. A pie chart of radius $r$ encodes it as sector angle $\theta_i = 2\pi p_i$ and sector area $A_i = \pi r^2 p_i$. All three encodings are linear in $p_i$, so the information is identical. What differs is the visual channel the eye must decode.`,
        },
        {
          title: "Perception becomes a noise model",
          body: String.raw`Convert each reading back into proportion units by dividing a length reading by $L$ or an angle reading by $2\pi$. The viewer then reads $\hat p_i = p_i + \varepsilon_i$, where the noise scale $\sigma_{\text{ch}}$ depends on the channel. The chart matters only through how large the noise is for the channel it uses.`,
        },
        {
          title: "Probability of a correct ordering",
          body: String.raw`Take $p_A > p_B$ with gap $\Delta = p_A - p_B > 0$. The viewer orders them correctly when $\hat p_A > \hat p_B$, which is the same as $\varepsilon_B - \varepsilon_A < \Delta$. Because the errors are independent, $\varepsilon_B - \varepsilon_A$ has variance $\sigma_A^2 + \sigma_B^2$, so $P(\text{correct}) = \Phi\left(\dfrac{\Delta}{\sqrt{\sigma_A^2 + \sigma_B^2}}\right)$.`,
        },
        {
          title: "The required gap scales with the noise",
          body: String.raw`For a target reliability $1-\alpha$, the required gap is $\Delta^* = z_{1-\alpha}\sqrt{\sigma_A^2 + \sigma_B^2}$, where $z_{1-\alpha} = \Phi^{-1}(1-\alpha)$. If both channels have the same noise $\sigma$, then $\Delta^* = z_{1-\alpha}\sqrt{2}\,\sigma$, which is proportional to $\sigma$. Doubling the noise therefore doubles the smallest gap a viewer can reliably see.`,
        },
        {
          title: "Pie channels are noisier than bar channels",
          body: String.raw`Cleveland and McGill's 1984 experiments found that viewers judge positions along a common scale more accurately than angles and areas, which means $\sigma_{\text{pie}} > \sigma_{\text{bar}}$ in practice. Because $\Delta^*$ is proportional to this noise, a pie chart needs a larger gap than a bar chart to reach the same reliability. This is why a 24% versus 26% difference is easy to see in bars and hard to judge in a pie.`,
        },
      ],
      result: String.raw`$$P(\text{correct order}) = \Phi\left(\frac{\Delta}{\sqrt{\sigma_A^2 + \sigma_B^2}}\right)$$ A chart is better when its channel has smaller noise, because it reveals smaller true gaps at the same reliability. Bar charts place proportions on a common baseline, so they have the smallest noise and are the default choice.`,
      assumptionsBreak: "The model assumes independent, unbiased noise. Systematic distortions, such as 3D perspective that enlarges foreground slices, do not average out across viewers and can reverse an ordering however many people look. Pies remain acceptable when the gap is large relative to the noise, for example a 90% slice versus a 10% slice, because $\Delta / \sqrt{\sigma_A^2 + \sigma_B^2}$ is then very large.",
    },
    quiz: [
      {
        question: String.raw`Two categories have true proportions that differ by $\Delta = 0.02$. Each reading has independent noise with standard deviation $\sigma = 0.01$. What is the z-argument $\Delta / \sqrt{\sigma_A^2 + \sigma_B^2}$?`,
        options: [
          String.raw`1.0, from adding the standard deviations`,
          String.raw`2.0, from using one sigma only`,
          String.raw`$\sqrt{2} \approx 1.41$`,
          "0.5",
        ],
        answer: 2,
        explanation: String.raw`The combined standard deviation is $\sqrt{2 \cdot 0.01^2} = 0.01\sqrt{2}$, so the argument is $0.02 / (0.01\sqrt{2}) = \sqrt{2}$. The traps are adding the standard deviations (giving 1.0) or ignoring the second noise term (giving 2.0).`,
      },
      {
        question: String.raw`For a pair of categories, the per-category noise on pie angles is twice the noise on bar lengths. By what factor must the true gap $\Delta$ grow for a pie chart to order the pair with the same reliability as a bar chart?`,
        options: [
          "It stays the same",
          "It doubles",
          "It quadruples",
          "It halves",
        ],
        answer: 1,
        explanation: String.raw`The required gap is $\Delta^* = z\sqrt{\sigma_A^2 + \sigma_B^2}$, which is proportional to $\sigma$, so doubling both noise terms doubles $\Delta^*$. The trap is squaring the noise factor, since the variance quadruples while the required gap only doubles.`,
      },
      {
        question: String.raw`Let $\varepsilon_A$ and $\varepsilon_B$ be independent errors with standard deviations $\sigma_A$ and $\sigma_B$. What is the standard deviation of $\varepsilon_B - \varepsilon_A$?`,
        options: [
          String.raw`$\sqrt{\sigma_A^2 + \sigma_B^2}$`,
          String.raw`$\sigma_A + \sigma_B$`,
          String.raw`$|\sigma_A - \sigma_B|$`,
          String.raw`$\sigma_A \sigma_B$`,
        ],
        answer: 0,
        explanation: String.raw`For independent errors, $\text{Var}(\varepsilon_B - \varepsilon_A) = \sigma_A^2 + \sigma_B^2$, so the standard deviation is the square root of that sum. The trap is adding standard deviations linearly, which ignores that variances add.`,
      },
      {
        question: String.raw`A 3D tilt makes slice $A$ look $b > 0$ larger than it really is, while slice $B$ is read correctly. If the true gap satisfies $\Delta < b$, what happens to the ordering?`,
        options: [
          "The ordering is still correct, with probability approaching 1 as more viewers respond",
          "The ordering is systematically wrong no matter how many viewers respond",
          "The ordering is always correct whenever $\Delta > 0$",
          "Averaging viewers removes the distortion, because it behaves like random noise",
        ],
        answer: 1,
        explanation: String.raw`A systematic bias shifts every reading in the same direction, so averaging over viewers does not remove it and the wrong order persists. The trap is treating distortion as random noise, which averages out.`,
      },
      {
        question: String.raw`A two-slice pie shows 90% and 10%, so $\Delta = 0.8$, with noise $\sigma = 0.05$ on each slice. What is the z-argument $\Delta / \sqrt{\sigma_A^2 + \sigma_B^2}$, and what does it imply?`,
        options: [
          String.raw`About 11.3, so the ordering is nearly certain`,
          String.raw`16, from dividing $0.8$ by $0.05$`,
          String.raw`8, from dividing $0.8$ by the sum $0.05 + 0.05$`,
          String.raw`About 0.07, the combined standard deviation`,
        ],
        answer: 0,
        explanation: String.raw`The combined standard deviation is $\sqrt{0.0025 + 0.0025} = 0.0707$, so the argument is $0.8 / 0.0707 \approx 11.3$, a huge value that makes the ordering nearly certain. The traps are ignoring one noise term or adding standard deviations instead of variances.`,
      },
    ],
  },
  33: {
    derivation: {
      headline: "Quartiles depend only on rank, so the box and Tukey fences are robust, and their 1.5 IQR rule matches a normal law",
      axioms: [
        String.raw`The sorted sample is $x_{(1)} \le \dots \le x_{(n)}$, and the median $M$ is the middle value, or the average of the two middle values when $n$ is even.`,
        String.raw`Tukey's quartiles $Q_1$ and $Q_3$ are the medians of the lower and upper halves of the sorted sample, and $\text{IQR} = Q_3 - Q_1$ is the spread of the central half.`,
        String.raw`For a normal law $X \sim \mathcal{N}(\mu, \sigma^2)$, the standardized variable $Z = (X - \mu)/\sigma$ has CDF $\Phi$, and $\Phi^{-1}(0.75) \approx 0.6745$.`,
      ],
      steps: [
        {
          title: "Quartiles depend only on ranks",
          body: String.raw`The median and quartiles are determined by positions in the sorted order, not by how large the extreme values are. In the 11-point example, replacing 60 with 10000 leaves the median at 24, the quartiles at 18 and 30, and the IQR at 12 unchanged, because the value only occupies the top rank. Only the plotted position of that outlier moves.`,
        },
        {
          title: "Tukey's fences scale with the central spread",
          body: String.raw`Tukey flags a point as an outlier when it lies outside $[Q_1 - 1.5\,\text{IQR},\; Q_3 + 1.5\,\text{IQR}]$. Because the fence is a multiple of the IQR, it tracks the spread of the central half and is not inflated by the extreme point it is meant to detect. In the 11-point example, $\text{IQR} = 12$, so the upper fence is $30 + 18 = 48$. The value 60 is flagged, and the upper whisker stops at 32, the largest value not exceeding 48.`,
        },
        {
          title: "Normal calibration of the 1.5 multiplier",
          body: String.raw`For a normal sample, $Q_1 \approx \mu - 0.6745\sigma$ and $Q_3 \approx \mu + 0.6745\sigma$, so $\text{IQR} \approx 1.349\sigma$. The upper fence is then $\mu + 0.6745\sigma + 1.5(1.349\sigma) \approx \mu + 2.698\sigma$. The tail probability beyond it is $1 - \Phi(2.698) \approx 0.0035$, so about 0.7% of a normal sample is flagged across both tails and about 99.3% lies inside the whiskers.`,
        },
        {
          title: "Quartile conventions change the edges",
          body: String.raw`A finite sample does not define quartiles uniquely. The median-of-halves rule used above gives $Q_1 = 18$ and $Q_3 = 30$ for the 11-point example. The linear-interpolation rule that is the default in R's quantile() and NumPy's percentile() gives $Q_1 = 19$ and $Q_3 = 29$. Both conventions agree on the median and on the outlier at 60, but the box and fence edges shift slightly.`,
        },
      ],
      result: String.raw`$$\text{Fence}_{\text{upper}} = Q_3 + 1.5\,\text{IQR}, \qquad \text{Fence}_{\text{lower}} = Q_1 - 1.5\,\text{IQR}$$ The five-number summary is robust because it is built from ranks, and under normality the 1.5 IQR rule flags only about 0.7% of ordinary observations. A flagged point is a value far from the central body, not proof of an error.`,
      assumptionsBreak: "Five numbers hide shape. A bimodal sample can share the quartiles and fences of a unimodal one, so a boxplot should be paired with the raw points. The 1.5 IQR multiplier is calibrated for roughly symmetric data, and for strongly skewed data it flags many ordinary points on the long side.",
    },
    quiz: [
      {
        question: String.raw`In the 11-point example, the largest value 60 is replaced by 10000, and the sample order is otherwise unchanged. Which description of the boxplot is correct?`,
        options: [
          "The plot changes to 10000, because the whisker follows every point",
          "Only the IQR changes, because it uses the range",
          "Q1, the median, Q3, and the IQR all stay the same, and only the outlier dot moves",
          "The upper whisker moves to 10000",
        ],
        answer: 2,
        explanation: String.raw`The quartiles and median depend only on ranks, and the top value still occupies the top rank, so the box, the fences, and the upper whisker at 32 do not move. The trap is assuming the whisker or the IQR must follow the extreme value.`,
      },
      {
        question: String.raw`For a normal population with mean $\mu$ and standard deviation $\sigma$, the Tukey upper fence $Q_3 + 1.5\,\text{IQR}$ sits how many standard deviations above $\mu$?`,
        options: [
          "1.0",
          "1.5",
          "2.698",
          "3.0",
        ],
        answer: 2,
        explanation: String.raw`Using $Q_3 \approx \mu + 0.6745\sigma$ and $\text{IQR} \approx 1.349\sigma$, the fence is $\mu + (0.6745 + 2.0235)\sigma = \mu + 2.698\sigma$. The trap is reading the 1.5 multiplier as the number of standard deviations.`,
      },
      {
        question: String.raw`A normal sample has standard deviation $\sigma = 4$. What is its approximate interquartile range?`,
        options: [
          "5.4",
          "8.0",
          "4.0",
          "2.7",
        ],
        answer: 0,
        explanation: String.raw`$\text{IQR} = Q_3 - Q_1 \approx 2(0.6745)\sigma = 1.349\sigma \approx 5.4$. The trap is equating the IQR with $2\sigma$, which gives 8.0 and describes a much wider interval.`,
      },
      {
        question: String.raw`A sorted sample has $n = 8$ values, $x_{(1)} \le \dots \le x_{(8)}$. Using the median-of-halves rule, which expression gives $Q_1$?`,
        options: [
          String.raw`$x_{(2)}$ alone`,
          String.raw`$x_{(3)}$ alone`,
          String.raw`$\frac{x_{(1)} + x_{(4)}}{2}$`,
          String.raw`$\frac{x_{(2)} + x_{(3)}}{2}$`,
        ],
        answer: 3,
        explanation: String.raw`The lower half is $x_{(1)}, \dots, x_{(4)}$, and its median is the average of its two middle values, $(x_{(2)} + x_{(3)})/2$. The trap is picking a single order statistic, which ignores that an even-sized half has two middle values.`,
      },
      {
        question: String.raw`Two samples have identical five-number summaries, but one of them is clearly bimodal. Which conclusion is most sound?`,
        options: [
          "The Tukey fences automatically reveal the second mode",
          "The five-number summary cannot distinguish the shapes, so the boxplot should be paired with the raw data or a stripchart or violin plot",
          "Bimodal samples always have an IQR of zero",
          "Identical five-number summaries imply identical samples, so the bimodality must be an error",
        ],
        answer: 1,
        explanation: String.raw`A five-number summary records only a few ranks and the spread between them, so very different shapes can share it. The trap is believing that fences or the IQR reveal multimodality.`,
      },
    ],
  },
  34: {
    derivation: {
      headline: "Logs turn multiplicative fold changes into equal additive steps and stabilize variance under constant relative error",
      axioms: [
        String.raw`For base $b > 0$ with $b \ne 1$ and $x > 0$, the logarithm is defined by $\log_b x = y$ exactly when $b^y = x$.`,
        String.raw`Exponents add under multiplication, $b^u \, b^v = b^{u+v}$, and multiply under powers, $(b^u)^k = b^{uk}$.`,
        String.raw`A multiplicative error model writes each observation as $Y = \mu\,\varepsilon$ with $\varepsilon > 0$, and the delta method approximates $g(Y) \approx g(\mu) + g'(\mu)(Y - \mu)$ for small deviations around $\mu = E[Y]$.`,
      ],
      steps: [
        {
          title: "Product, quotient, and power rules",
          body: String.raw`Let $u = \log_b x$ and $v = \log_b y$, so $x = b^u$ and $y = b^v$. Then $xy = b^u b^v = b^{u+v}$, which means $\log_b(xy) = u + v = \log_b x + \log_b y$. The same argument with $x/y = b^{u-v}$ gives the quotient rule, and $x^k = b^{ku}$ gives $\log_b(x^k) = k\log_b x$.`,
        },
        {
          title: "Changing the base only rescales",
          body: String.raw`Let $y = \log_b x$, so $b^y = x$. Taking natural logs gives $y \ln b = \ln x$, hence $\log_b x = \dfrac{\ln x}{\ln b}$. Every base is therefore a constant multiple of the natural log, and switching bases only rescales values by the constant $1/\ln b$. For base 2, $\log_2 x = \ln x / \ln 2$.`,
        },
        {
          title: "Fold changes become equal steps",
          body: String.raw`Consider a fold change $c$ applied to a level $r$, taking $r$ to $cr$. On the log scale the change is $\log_b(cr) - \log_b r = \log_b c$, which does not depend on $r$. Doubling from 1000 to 2000 and doubling from 10 to 20 both produce the same step $\log_2 2 = 1$. On the raw scale the same doubling moves the value by $cr - r = (c-1)r$, which grows with the starting level.`,
        },
        {
          title: "Multiplicative noise becomes additive",
          body: String.raw`If $Y = \mu(X)\,\varepsilon$ with $\varepsilon > 0$, then $\ln Y = \ln \mu(X) + \ln \varepsilon$. When $\mu(X) = e^{\beta X}$, this becomes $\ln Y = \beta X + \ln \varepsilon$, which is linear in $X$. Ordinary least squares on $\ln Y$ is therefore a linear model with additive error.`,
        },
        {
          title: "The delta method stabilizes variance",
          body: String.raw`Expanding $\ln Y$ around $\mu = E[Y]$ gives $\ln Y \approx \ln \mu + (Y - \mu)/\mu$, so $\text{Var}(\ln Y) \approx \text{Var}(Y)/\mu^2$. If the coefficient of variation $\text{SD}(Y)/\mu$ is a constant $\kappa$, then $\text{Var}(\ln Y) \approx \kappa^2$ at every level of $\mu$. Logging turns a variance that grows with the mean into one that does not.`,
        },
      ],
      result: String.raw`$$\log_b(xy) = \log_b x + \log_b y$$ Logs convert multiplicative effects into additive ones, so a fold change $c$ contributes the same step $\log_b c$ at every level. Under constant relative error, the variance of $\ln Y$ is approximately the constant $\kappa^2$.`,
      assumptionsBreak: String.raw`Logs require strictly positive values, since $\ln 0 = -\infty$, so zeros need a pseudocount such as $\ln(x+1)$, which changes the scale near zero. The delta-method variance approximation degrades when the coefficient of variation is large, and back-transforming the average of $\ln Y$ yields the geometric mean rather than the arithmetic mean.`,
    },
    quiz: [
      {
        question: String.raw`If $\log_{10} x = 3.2$, what is $\log_{10}(100x)$?`,
        options: [
          "5.2",
          "320",
          "3.4",
          "6.4",
        ],
        answer: 0,
        explanation: String.raw`Since $\log_{10}(100x) = \log_{10} 100 + \log_{10} x = 2 + 3.2 = 5.2$. The traps are multiplying the log by 100, which gives 320, or doubling the log, which gives 6.4.`,
      },
      {
        question: String.raw`A gene's expression goes from 100 to 200, and another goes from 1 to 2. On the raw scale the changes are +100 and +1. What is the change for each on a $\log_2$ scale?`,
        options: [
          "They remain different, at +100 and +1",
          "Both are +2",
          "Both are +0.5",
          "Both are +1, since each is a 2-fold change",
        ],
        answer: 3,
        explanation: String.raw`Both are 2-fold changes, so $\log_2(200/100) = \log_2(2/1) = 1$ and $\log_2(2/1) = 1$ for each. The raw difference is misleading because the size of a raw step depends on the starting level.`,
      },
      {
        question: String.raw`Suppose $Y$ has mean $\mu$ and standard deviation $0.2\mu$, a constant coefficient of variation. By the delta method, what is approximately $\text{Var}(\ln Y)$?`,
        options: [
          "0.2",
          "0.04",
          String.raw`$0.2\mu$`,
          "0.4",
        ],
        answer: 1,
        explanation: String.raw`$\text{Var}(\ln Y) \approx \text{Var}(Y)/\mu^2 = (0.2\mu)^2/\mu^2 = 0.04$, so the standard deviation of $\ln Y$ is about 0.2. The trap is reporting the standard deviation 0.2 as if it were the variance.`,
      },
      {
        question: String.raw`A count variable contains zeros. Why is $\ln(x+1)$ used for such data, and what is $\ln(0+1)$?`,
        options: [
          String.raw`$\ln 0 = 0$, so no transformation is needed`,
          String.raw`$\ln 1 = 1$, so zeros map to 1`,
          String.raw`$\ln 1 = 0$, so zeros map to 0 and remain finite`,
          "It is undefined, so zeros must be dropped from the data",
        ],
        answer: 2,
        explanation: String.raw`Since $\ln(0+1) = \ln 1 = 0$, zeros stay finite and the transform is defined for every nonnegative count. The trap is claiming $\ln 0 = 0$, which is false because $\ln x \to -\infty$ as $x \to 0^+$.`,
      },
      {
        question: String.raw`A sample $x_1, \dots, x_n$ of positive values is log-transformed, averaged, and then exponentiated. Which quantity results?`,
        options: [
          String.raw`The arithmetic mean $\frac{1}{n}\sum_i x_i$`,
          String.raw`The geometric mean $(x_1 x_2 \cdots x_n)^{1/n}$`,
          "The median of the sample",
          String.raw`The harmonic mean $n / \sum_i (1/x_i)$`,
        ],
        answer: 1,
        explanation: String.raw`$\exp\left(\frac{1}{n}\sum_i \ln x_i\right) = \left(\prod_i x_i\right)^{1/n}$ by the product and power rules. The trap is assuming that back-transforming the average of logs returns the arithmetic mean.`,
      },
    ],
  },
};

export default deepContent;
