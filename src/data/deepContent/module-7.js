// Deep first-principles theory and extra knowledge-check questions for module-7
export const deepContent = {
  51: {
    derivation: {
      headline: "The q-quantile inverts the CDF: it is the smallest x whose cumulative probability reaches q",
      axioms: [
        String.raw`A cumulative distribution function $F(x) = P(X \le x)$ is nondecreasing, right-continuous, and satisfies $F(-\infty) = 0$ and $F(+\infty) = 1$.`,
        String.raw`For a level $q \in (0,1)$, the $q$-quantile is defined as $Q(q) = \inf\{x : F(x) \ge q\}$, the smallest value at which the cumulative probability reaches $q$.`,
        String.raw`For a sample $x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$, the empirical CDF $\hat{F}_n(x) = \frac{1}{n}\#\{i : x_i \le x\}$ jumps by $1/n$ at each observation.`
      ],
      steps: [
        {
          title: "Continuous, strictly increasing case",
          body: String.raw`Suppose $F$ is continuous and strictly increasing. Then for each $q \in (0,1)$ there is exactly one $x$ with $F(x) = q$, namely $x = F^{-1}(q)$. Because $F$ increases through the level $q$ only once, the set $\{x : F(x) \ge q\}$ equals $[F^{-1}(q), \infty)$. Its infimum is therefore $F^{-1}(q)$, and $F(Q(q)) = q$.`
        },
        {
          title: "Probability reading",
          body: String.raw`Since $F(Q(q)) = q$, we have $P(X \le Q(q)) = q$ and therefore $P(X > Q(q)) = 1 - q$. A fraction $q$ of the probability mass lies at or below $Q(q)$, which is exactly what a quantile means. For example, $Q(0.9)$ is the value that 90% of outcomes do not exceed.`
        },
        {
          title: "Empirical version",
          body: String.raw`For a sample of size $n$ with no ties, the empirical CDF equals $k/n$ on the interval from $x_{(k)}$ up to $x_{(k+1)}$. The smallest $x$ with $\hat{F}_n(x) \ge q$ is therefore $x_{(k)}$ for the smallest integer $k$ satisfying $k/n \ge q$, which is $k = \lceil nq \rceil$. The nearest-rank sample quantile is $\hat{Q}(q) = x_{(\lceil nq \rceil)}$, and it always returns an observed value.`
        },
        {
          title: "Interpolated version",
          body: String.raw`Many software packages, including NumPy's default, place the quantile at position $h = (n-1)q + 1$ in the sorted sample. Let $j = \lfloor h \rfloor$ and $\gamma = h - j$. The quantile is $\hat{Q}(q) = (1-\gamma)\,x_{(j)} + \gamma\,x_{(j+1)}$, which interpolates between neighbors. With $n = 10$ and $q = 0.5$, we get $h = 5.5$, $j = 5$, $\gamma = 0.5$, so the median is $(75 + 80)/2 = 77.5$, not the observed value 75 given by the nearest-rank rule.`
        }
      ],
      result: String.raw`The population quantile is the inverse CDF: $$Q(q) = F^{-1}(q) = \inf\{x : F(x) \ge q\}$$ Its sample analogue is the nearest-rank value $\hat{Q}(q) = x_{(\lceil nq \rceil)}$. Interpolated sample quantiles are alternative conventions that estimate the same target.`,
      assumptionsBreak: "When $F$ is flat over an interval, many $x$ share the same level and the infimum silently picks the left end of that interval. With small samples the nearest-rank rule jumps by whole observations, and statistical software uses different interpolation rules (R's quantile function alone offers nine types), so the same data can produce different percentiles across tools."
    },
    quiz: [
      {
        question: String.raw`Using the nearest-rank rule $\hat{Q}(q) = x_{(\lceil nq \rceil)}$ on the sorted sample [55, 60, 65, 70, 75, 80, 85, 90, 95, 100], which value is the 0.30 quantile?`,
        options: ["60", "65", "68.5", "70"],
        answer: 1,
        explanation: "Here nq = 10 x 0.30 = 3, so the answer is the 3rd order statistic, 65. Choosing 70 comes from using floor(nq) + 1 by mistake, and 68.5 is the value under the interpolated convention, which is a different rule."
      },
      {
        question: "Suppose a continuous variable X has CDF F(x) = x for 0 <= x <= 1 (uniform on [0,1]). What is the 0.30 quantile Q(0.30)?",
        options: ["0.70", "0.15", "0.30", "3.00"],
        answer: 2,
        explanation: "Setting F(Q) = q gives Q = q, so Q(0.30) = 0.30. The trap is using the upper tail 1 - q = 0.70, or halving q to get 0.15 by confusing the CDF with a density."
      },
      {
        question: "If the 0.90 quantile of a continuous distribution equals 95, which statement is correct?",
        options: ["P(X <= 95) = 0.90", "P(X <= 95) = 0.10", "P(X > 95) = 0.90", "The mean of X is 95"],
        answer: 0,
        explanation: "By definition F(95) = 0.90, so 90% of the probability lies at or below 95. The common mistake is reversing the inequality, which gives P(X > 95) = 0.90, the wrong direction."
      },
      {
        question: "Which statement correctly contrasts the nearest-rank and interpolated sample quantile conventions?",
        options: [
          "Interpolation always returns one of the observed data values",
          "The nearest-rank rule can return a value strictly between two observations",
          "Both rules always return the sample mean",
          "The nearest-rank rule always returns an observed data value, while interpolation can return a value between adjacent order statistics"
        ],
        answer: 3,
        explanation: "Nearest-rank selects x_(ceil(nq)), which is always an observed value. Interpolation blends two adjacent order statistics, so it can produce a value like 77.5 that never appeared in the data."
      },
      {
        question: "A survey places a respondent at the 90th percentile of income among 1000 people. Roughly how many people earned more than this respondent?",
        options: ["About 900", "About 100", "About 10", "About 500"],
        answer: 1,
        explanation: "The 90th percentile leaves 10% of the distribution above it, so about 0.10 x 1000 = 100 people earned more. Mixing up the two sides of the percentile gives the 900 distractor."
      }
    ]
  },
  52: {
    derivation: {
      headline: "Q-Q points fall on a line because normal quantiles are an affine function of the standard normal quantiles",
      axioms: [
        String.raw`Let $X \sim \mathcal{N}(\mu, \sigma^2)$ with $\sigma > 0$, and let $\Phi$ be the standard normal CDF, which is continuous and strictly increasing so that $\Phi^{-1}$ exists on $(0,1)$.`,
        String.raw`The standardized variable $Z = (X - \mu)/\sigma$ follows the standard normal distribution, $Z \sim \mathcal{N}(0,1)$, and its quantiles are $z_p = \Phi^{-1}(p)$.`,
        String.raw`For an i.i.d. sample from a continuous distribution $F$, the probability integral transform gives $U_i = F(X_i) \sim \text{Uniform}(0,1)$, and the $i$-th order statistic of $n$ such uniforms satisfies $U_{(i)} \sim \text{Beta}(i, n+1-i)$.`
      ],
      steps: [
        {
          title: "Theoretical quantile of a normal",
          body: String.raw`Let $p \in (0,1)$ and set $x = \mu + \sigma z_p$. Then $P(X \le x) = P\left(Z \le \frac{x-\mu}{\sigma}\right) = \Phi\left(\frac{x-\mu}{\sigma}\right) = \Phi(z_p) = p$. Hence the normal quantile function is $Q_X(p) = \mu + \sigma\,\Phi^{-1}(p)$, an affine function of the standard normal quantile $z_p$.`
        },
        {
          title: "Plotting pairs against a line",
          body: String.raw`A Q-Q plot draws the pairs $(z_{p_i}, x_{(i)})$, where $x_{(i)}$ is the $i$-th smallest observation and $p_i$ is a plotting position assigned to it. If each sample point is close to its theoretical quantile, $x_{(i)} \approx Q_X(p_i) = \mu + \sigma z_{p_i}$. The vertical coordinate is then an intercept $\mu$ plus a slope $\sigma$ times the horizontal coordinate, so a line $y = a + bz$ has $a = \mu$ and $b = \sigma$.`
        },
        {
          title: "Choosing plotting positions",
          body: String.raw`Under the uniform transform, the mean of the $i$-th order statistic is $E[U_{(i)}] = \frac{i}{i + (n+1-i)} = \frac{i}{n+1}$, using the mean $a/(a+b)$ of a Beta$(a,b)$ distribution. So the $i$-th sorted point sits on average at probability $i/(n+1)$, which is the natural plotting position. Blom's formula $p_i = \frac{i - 3/8}{n + 1/4}$ is a widely used refinement that matches expected normal order statistics more closely.`
        },
        {
          title: "Curvature from skewness",
          body: String.raw`If the data are not normal, the map from $z$ to the sample quantile is not affine. Take $X = e^{Z}$ with $Z \sim \mathcal{N}(0,1)$, a lognormal variable. Then $Q_X(p) = e^{z_p}$, and the slope of the Q-Q curve is $\frac{d}{dz}e^{z} = e^{z}$, which increases with $z$. The curve is nearly flat in the lower tail and steep in the upper tail, bending upward on the right, which is the signature of right skew.`
        }
      ],
      result: String.raw`$$x_{(i)} \approx \mu + \sigma z_{p_i}$$ A normal sample therefore traces a straight line with intercept $\mu$ and slope $\sigma$, and sustained curvature in a Q-Q plot signals that the data depart from the normal shape.`,
      assumptionsBreak: String.raw`Each order statistic fluctuates around its expected value, so with $n < 30$ the extreme points wobble noticeably even for truly normal data. The parameters $\mu$ and $\sigma$ are estimated, and a straight line only checks the shape up to location and scale, so a nearly straight plot does not prove normality.`
    },
    quiz: [
      {
        question: "A Q-Q plot of a sample x against standard normal quantiles z is a straight line y = 3 + 2z. What are the mean and standard deviation of the underlying distribution?",
        options: ["Mean 3, standard deviation 2", "Mean 2, standard deviation 3", "Mean 3, variance 2", "Mean 0, standard deviation 5"],
        answer: 0,
        explanation: "Since x = mu + sigma z, the intercept gives mu = 3 and the slope gives sigma = 2, so the standard deviation is 2 and the variance is 4. The traps are swapping intercept and slope, or reporting the slope as a variance."
      },
      {
        question: "For a sample of n = 4 i.i.d. Uniform(0,1) draws, what is the expected value of the second order statistic, E[U_(2)]?",
        options: ["0.25", "0.40", "0.50", "0.67"],
        answer: 1,
        explanation: "U_(2) follows Beta(2, 3), whose mean is 2/(2+3) = 2/5 = 0.40, which equals i/(n+1). The trap is using i/n = 0.50 or i/(n-1) = 0.67 as the plotting position."
      },
      {
        question: "Suppose X = exp(Z) with Z ~ N(0,1), and we make a Q-Q plot of X against standard normal quantiles. What is the theoretical sample quantile at z = 1, that is Q_X(Phi(1))?",
        options: ["1.00", "1.65", "0.37", "2.72 (about e)"],
        answer: 3,
        explanation: "Because Q_X(p) = exp(z_p), the point z = 1 corresponds to exp(1) = e, about 2.72. The distractor 1.65 comes from reading z as a probability and taking the 95th percentile, and 0.37 = 1/e comes from a sign error."
      },
      {
        question: "Two Q-Q plots of data against standard normal quantiles are both straight lines, one with slope 1 and the other with slope 4. How do their standard deviations and variances compare?",
        options: ["SD ratio 16, variance ratio 4", "SD ratio 2, variance ratio 4", "SD ratio 4, variance ratio 16", "SD ratio 4, variance ratio 4"],
        answer: 2,
        explanation: "The slopes are the standard deviations, so the SD ratio is 4, and squaring gives a variance ratio of 16. The common error is reversing the two ratios or taking square roots where squaring is needed."
      },
      {
        question: "Why do heavy tails bend a normal Q-Q plot into an S-shape rather than a single bend?",
        options: [
          "Heavy tails shift the whole distribution, which changes only the intercept",
          "Heavy tails make the slope of the plot zero",
          "Extreme sample quantiles at both ends lie farther out than normal quantiles, so the two ends bend away from the line in opposite directions",
          "Heavy tails only change the plotting positions and leave the sample values unchanged"
        ],
        answer: 2,
        explanation: "Heavier tails push the lowest sample values below the normal line and the highest above it, producing an S-shape. A shift of the mean would move the whole line instead of bending its ends, which is the misconception to avoid."
      }
    ]
  },
  53: {
    derivation: {
      headline: "Quantile normalization makes all columns identical by averaging sorted values rank by rank",
      axioms: [
        String.raw`Let $\mathbf{X} \in \mathbb{R}^{n \times p}$ have columns $\mathbf{x}_1, \dots, \mathbf{x}_p$, where column $j$ holds $n$ features measured on array $j$, and assume for now that the entries within each column are distinct.`,
        String.raw`For each column, let $X^{\text{sort}}_{ij}$ denote the $i$-th smallest value of column $j$, so that $X^{\text{sort}}_{1j} \le X^{\text{sort}}_{2j} \le \dots \le X^{\text{sort}}_{nj}$, and each sorted column contains exactly the values of the original column.`,
        String.raw`The rank of entry $X_{kj}$ within column $j$ is the position $r_j(k) \in \{1, \dots, n\}$ satisfying $X^{\text{sort}}_{r_j(k), j} = X_{kj}$.`
      ],
      steps: [
        {
          title: "Sort each column",
          body: String.raw`Sorting each column independently produces $\mathbf{X}^{\text{sort}}$. Each sorted column is a permutation of the original column, so sorting leaves every array's set of values unchanged. What sorting destroys is the association between each value and its feature, which must be restored at the end.`
        },
        {
          title: "Build a reference distribution",
          body: String.raw`Define the reference values $\bar{r}_i = \frac{1}{p}\sum_{j=1}^{p} X^{\text{sort}}_{ij}$ for $i = 1, \dots, n$. If $i < i'$, then $X^{\text{sort}}_{ij} \le X^{\text{sort}}_{i'j}$ for every column $j$. Summing over $j$ and dividing by $p$ preserves the inequality, so $\bar{r}_1 \le \bar{r}_2 \le \dots \le \bar{r}_n$.`
        },
        {
          title: "Make every column identical",
          body: String.raw`Replace every sorted entry $X^{\text{sort}}_{ij}$ with $\bar{r}_i$. Column $j$ now contains the values $\bar{r}_1, \dots, \bar{r}_n$, each exactly once, so every column has the same empirical CDF $\hat{F}(x) = \frac{1}{n}\#\{i : \bar{r}_i \le x\}$. The vector $\bar{r}$ is the common quantile profile shared by all arrays.`
        },
        {
          title: "Restore the original order",
          body: String.raw`Return each value to its original position by giving entry $X_{kj}$ the reference value at its own rank, $Y_{kj} = \bar{r}_{r_j(k)}$. This map is monotone within column $j$: if $X_{kj} < X_{lj}$ then $r_j(k) < r_j(l)$, so $\bar{r}_{r_j(k)} \le \bar{r}_{r_j(l)}$. Within-sample ordering is therefore preserved, while every column's distribution equals the reference distribution.`
        },
        {
          title: "Worked check",
          body: String.raw`Take $\mathbf{x}_1 = (7, 1, 4)$ and $\mathbf{x}_2 = (3, 9, 6)$. The sorted columns are $(1, 4, 7)$ and $(3, 6, 9)$, so $\bar{r} = \left(\frac{1+3}{2}, \frac{4+6}{2}, \frac{7+9}{2}\right) = (2, 5, 8)$. Column 1 has ranks $(3, 1, 2)$, giving $Y_1 = (8, 2, 5)$. Column 2 has ranks $(1, 3, 2)$, giving $Y_2 = (2, 8, 5)$. Both columns now contain $\{2, 5, 8\}$, and the original order $7 > 4 > 1$ is kept as $8 > 5 > 2$.`
        }
      ],
      result: String.raw`$$Y_{kj} = \bar{r}_{\operatorname{rank}_j(k)}, \qquad \bar{r}_i = \frac{1}{p}\sum_{j=1}^{p} X^{\text{sort}}_{ij}$$ Every column of $\mathbf{Y}$ has the same empirical distribution, given by the reference $\bar{r}$, and each feature keeps its rank within its own sample.`,
      assumptionsBreak: "The method assumes that differences between arrays are technical, so forcing equal distributions erases real global biology when, for example, a treatment shifts most transcripts. It can also distort the tails when many features are truly differentially expressed, and with very small $n$ the reference profile is itself noisy."
    },
    quiz: [
      {
        question: "Using the example x1 = (7, 1, 4) and x2 = (3, 9, 6), what is the normalized value of the entry 4 in x1?",
        options: ["2", "4", "5", "6"],
        answer: 2,
        explanation: "The value 4 has rank 2 in x1, and the reference for rank 2 is (4 + 6)/2 = 5. Leaving it at 4 treats the raw value as unchanged, and 6 wrongly takes the middle value from the second column without averaging."
      },
      {
        question: "Suppose x2 equals x1 plus 10 for every feature. What are the normalized values of the two arrays?",
        options: [
          "They differ by exactly 10 for every feature",
          "They differ by 10 times the reference vector",
          "They differ by the sample variance",
          "They are identical"
        ],
        answer: 3,
        explanation: "A constant shift does not change any rank, so each feature in both arrays receives the same reference value. Normalization depends only on ranks, which is why a shift does not survive and the arrays become identical."
      },
      {
        question: "Which property of the reference vector guarantees that quantile normalization preserves the within-sample ordering of features?",
        options: [
          "The reference vector is nondecreasing, since sorted columns are nondecreasing and averaging preserves inequalities",
          "The reference vector has zero mean",
          "The reference vector equals the median of the raw data",
          "The reference vector has the same variance as each raw sample"
        ],
        answer: 0,
        explanation: "If r1 <= r2 <= ... <= rn, then mapping each rank to its reference value is a monotone map, so larger original values never receive smaller normalized values. The distractors describe properties that are not needed for rank preservation."
      },
      {
        question: "Suppose most transcripts are truly shut down in a treated group, so the treated distribution sits far below the control distribution. What does applying quantile normalization do to this difference?",
        options: [
          "It keeps the shift because ranks are preserved",
          "It removes the shift by forcing both groups to share one distribution",
          "It doubles the shift",
          "It moves the shift into the variance only"
        ],
        answer: 1,
        explanation: "Ranks are preserved within each sample, but the values are replaced by a common reference distribution, so the global shift in level disappears. The trap is assuming that preserved ranks mean preserved magnitudes."
      },
      {
        question: "Quantile normalization is applied to p arrays with n features each. How many distinct reference values r_i does it create?",
        options: ["p", "n", "n times p", "1"],
        answer: 1,
        explanation: "The reference vector has one value per rank, so there are n distinct reference values, shared across all p arrays. Confusing the number of arrays with the number of features, or counting n times p entries, is the common error."
      }
    ]
  }
};

export default deepContent;
