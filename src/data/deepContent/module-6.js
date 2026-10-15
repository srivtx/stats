// Deep first-principles theory and extra knowledge-check questions for module-6
export const deepContent = {
  12: {
    derivation: {
      headline: "Fisher's exact p-value by counting equally likely tables with fixed margins",
      axioms: [
        String.raw`A $2 \times 2$ table has cells $a, b, c, d \ge 0$ with row totals $r_1 = a+b$ and $r_2 = c+d$, column totals $c_1 = a+c$ and $c_2 = b+d$, and grand total $n = a+b+c+d$. Conditional on the margins, the only free quantity is $a$, because $b = r_1 - a$, $c = c_1 - a$, and $d = n - r_1 - c_1 + a$.`,
        String.raw`Under the null hypothesis $H_0$ of no association, with the column labels fixed, the set of units carrying the row-1 label is equally likely to be any subset of size $r_1$ drawn from the $n$ units.`,
        String.raw`The number of ways to choose $k$ items from $n$ is $\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$, and the multiplication rule multiplies the counts of independent choices.`,
      ],
      steps: [
        {
          title: "Count the equally likely outcomes",
          body: String.raw`By the randomization axiom, every row-1 assignment is a subset of size $r_1$ chosen from the $n$ units, and each subset is equally likely. The sample space therefore has $\binom{n}{r_1}$ outcomes, and each single outcome has probability $1/\binom{n}{r_1}$.`,
        },
        {
          title: "Count the assignments that produce a given cell count",
          body: String.raw`A row-1 subset gives cell count $a$ exactly when it contains $a$ of the $c_1$ column-1 units and $r_1 - a$ of the $c_2$ column-2 units. There are $\binom{c_1}{a}$ ways to choose the column-1 part and $\binom{c_2}{r_1-a}$ ways to choose the column-2 part, so by the multiplication rule the number of outcomes with cell count $a$ is $\binom{c_1}{a}\binom{c_2}{r_1-a}$.`,
        },
        {
          title: "Divide to get the hypergeometric probability",
          body: String.raw`Dividing the count from the previous step by the total from the first step gives $$P(a) = \frac{\binom{c_1}{a}\binom{c_2}{r_1-a}}{\binom{n}{r_1}}.$$ Because $c_1 + c_2 = r_1 + r_2 = n$, swapping the roles of rows and columns gives the equal form $P(a) = \binom{r_1}{a}\binom{r_2}{c_1-a} / \binom{n}{c_1}$, which is the form used in the playlist.`,
        },
        {
          title: "Sum the tables at least as unlikely as the observed one",
          body: String.raw`The two-sided p-value adds the probabilities of every feasible table whose probability is no larger than that of the observed table. For the tea table $[[3,1],[1,3]]$ we have $n = 8$ and all margins equal to 4, so $P(a) = \binom{4}{a}\binom{4}{4-a}/70$ gives $P(0)=1/70$, $P(1)=16/70$, $P(2)=36/70$, $P(3)=16/70$, $P(4)=1/70$, which sum to 1. The observed $a=3$ has probability $16/70$, and the tables with probability at most $16/70$ are $a \in \{0,1,3,4\}$, so $p = (1+16+16+1)/70 = 34/70 \approx 0.486$. The upper tail alone, $P(a \ge 3) = 17/70 \approx 0.243$, is a one-sided value.`,
        },
      ],
      result: String.raw`$$p_{\text{two-sided}} = \sum_{a' :\, P(a') \le P(a_{\text{obs}})} P(a')$$ The test is exact because it uses only the counting of equally likely arrangements under fixed margins, with no normal approximation.`,
      assumptionsBreak: "The exact p-value needs observations to be independent units whose labels are exchangeable under the null, so repeated measures on the same person break it. Because the distribution is discrete, the achieved significance level can fall below 0.05, which makes the test conservative and can cost some power.",
    },
    quiz: [
      {
        question: "A 2x2 table has n = 8 with row totals 4 and 4 and column totals 4 and 4. Under H0 with the margins fixed, what is P(a = 4), the probability that all four row-1 units are in column 1?",
        options: [
          "1/16 (each row-1 unit treated as an independent fair coin)",
          "4/70",
          "1/70",
          "1/8",
        ],
        answer: 2,
        explanation: String.raw`$P(4) = \binom{4}{4}\binom{4}{0}/\binom{8}{4} = 1/70 \approx 0.014$. The 1/16 option ignores the fixed margins and treats units as independent coin flips, which is a different model.`,
      },
      {
        question: "A 2x2 table has n = 8, row totals r_1 = 3 and r_2 = 5, and column totals c_1 = 4 and c_2 = 4. Which values can the cell count a take under the fixed margins?",
        options: [
          "a in {0, 1, 2, 3}",
          "a in {0, 1, 2, 3, 4}",
          "a in {1, 2, 3}",
          "a in {0, 1, 2, 3, 4, 5}",
        ],
        answer: 0,
        explanation: String.raw`The cell count must satisfy $a \le \min(r_1, c_1) = 3$ and $a \ge \max(0, r_1 - c_2) = 0$, so $a \in \{0,1,2,3\}$. Values such as 4 or 5 would force $b = r_1 - a$ to be negative.`,
      },
      {
        question: "A researcher computes a two-sided Fisher p-value for an asymmetric table. Which statement correctly describes how the two tails are combined?",
        options: [
          "The two-sided p-value is always exactly twice the one-sided tail, because the hypergeometric is symmetric",
          "It sums the probabilities of all tables whose null probability is no larger than the observed table's probability, which can include cells from both tails",
          "It adds the chi-square statistics from both tails",
          "It multiplies the two one-sided p-values together",
        ],
        answer: 1,
        explanation: "The hypergeometric is generally asymmetric when the margins are unequal, so doubling one tail is not correct. The definition keeps every table that is at least as improbable as the observed one, whichever side it lies on.",
      },
      {
        question: "Under H0 with n = 8 and row-1 total r_1 = 4, each outcome is a subset of size 4 chosen from the 8 units. How many equally likely outcomes are there?",
        options: [
          "8",
          "70",
          "16",
          "256",
        ],
        answer: 1,
        explanation: String.raw`The count is $\binom{8}{4} = 70$. The value 256 is $2^8$, which counts labelings where every unit could freely be in either row, ignoring the fixed row total.`,
      },
      {
        question: "Suppose the observed table has the largest null probability of any feasible table with these margins. What is its two-sided Fisher p-value?",
        options: [
          "0",
          "1/C(n, r_1), the smallest possible probability",
          "1",
          "0.5",
        ],
        answer: 2,
        explanation: String.raw`Every feasible table has probability no larger than the observed one, so every table is included in the sum and $\sum P = 1$. A p-value of 1 means the data look completely typical under the null.`,
      },
    ],
  },
  14: {
    derivation: {
      headline: "Why searching across many analyses inflates the chance of a false positive",
      axioms: [
        String.raw`Previously established result: for a single test of a true null hypothesis with a continuous test statistic, the p-value is uniformly distributed, so $P(p \le \alpha) = \alpha$ for every $\alpha \in [0,1]$.`,
        String.raw`The $m$ tests concern different hypotheses whose test statistics are independent, so for events $A_1, \dots, A_m$ built from different data, $P(A_1 \cap \dots \cap A_m) = \prod_{i=1}^{m} P(A_i)$.`,
        "Reporting only the analysis that crosses the significance threshold means the reported test was selected from all the analyses that were run, not chosen in advance.",
      ],
      steps: [
        {
          title: "Probability that no test is a false positive",
          body: String.raw`Let $A_i$ be the event that test $i$ does not reject, so $P(A_i) = 1-\alpha$ under $H_0$ by axiom 1. By independence from axiom 2, the probability that no test rejects is $P(A_1 \cap \dots \cap A_m) = \prod_{i=1}^{m} (1-\alpha) = (1-\alpha)^m$.`,
        },
        {
          title: "Take the complement to get the family-wise rate",
          body: String.raw`The probability of at least one false positive is the complement, $\alpha_{\text{family}} = 1 - (1-\alpha)^m$. For $\alpha = 0.05$ and $m = 20$, $(0.95)^{20} \approx 0.3585$, so $\alpha_{\text{family}} \approx 1 - 0.3585 = 0.6415$, a 64% chance of at least one spurious discovery.`,
        },
        {
          title: "Optional stopping is another set of tests",
          body: String.raw`Checking the data after each batch and stopping at the first $p < \alpha$ is a sequence of tests on overlapping data. Let $R_1$ and $R_2$ be the events that the first and second looks reject. Then $P(R_1 \cup R_2) = P(R_1) + P(R_2 \cap R_1^c) = \alpha + P(R_2 \cap R_1^c)$, and the second term is positive whenever the second look can reject after the first did not. So even two looks push the false positive rate above $\alpha$.`,
        },
        {
          title: "Choosing the best of k outcomes is a family of tests",
          body: String.raw`If a researcher measures $k$ outcomes and reports the smallest p-value, the reported value is $\min_i p_i$. With independent true nulls, $P(\min_i p_i > \alpha) = \prod_{i=1}^{k} P(p_i > \alpha) = (1-\alpha)^k$, so $P(\min_i p_i < \alpha) = 1 - (1-\alpha)^k$. This is exactly the family-wise formula from the second step, so selection after seeing the data inflates the error rate just as running extra tests does.`,
        },
      ],
      result: String.raw`$$\alpha_{\text{family}} = 1 - (1-\alpha)^m$$ This rate grows toward 1 as $m$ grows. Only a single test fixed in advance keeps the false positive rate at exactly $\alpha$ under $H_0$.`,
      assumptionsBreak: "The formula assumes independent tests of true nulls. With correlated outcomes, such as many endpoints measured on the same participants, the inflation is smaller but still present, and the formula does not describe an adaptive analysis where the set of tests is chosen after looking at the data.",
    },
    quiz: [
      {
        question: "Two independent tests are run, and both nulls are true with alpha = 0.05 for each test. What is the probability that both tests reject?",
        options: [
          "0.10",
          "0.0975",
          "0.0025",
          "0.05",
        ],
        answer: 2,
        explanation: String.raw`Independence gives $P(\text{both}) = 0.05 \times 0.05 = 0.0025$. The value 0.0975 equals $1 - 0.95^2$, which is the probability that at least one test rejects, a different question.`,
      },
      {
        question: "A researcher keeps adding participants and stops the first time p < 0.05. Which assumption behind the nominal 0.05 is violated?",
        options: [
          "That the effect size is at least 0.5",
          "That the sample size and stopping rule were fixed before the data were seen, so the null distribution of the p-value is the one assumed",
          "That the outcome variable is normally distributed",
          "That the number of participants is at least 30",
        ],
        answer: 1,
        explanation: "The p-value is uniform under a true null only when the test and its sample size are fixed in advance. A data-dependent stopping rule changes which outcomes lead to rejection, so the nominal 0.05 no longer describes the error rate.",
      },
      {
        question: "Ten independent analyses are run on data where every null is true, and only the smallest p-value is reported. What is the probability that the reported p-value is below 0.05?",
        options: [
          "5%",
          "0.95^10, about 59.9%",
          "10 x 5% = 50%",
          "1 - 0.95^10, about 40.1%",
        ],
        answer: 3,
        explanation: String.raw`The minimum is below 0.05 exactly when at least one analysis is, so the probability is $1 - 0.95^{10} \approx 0.401$. The 50% option adds 5% ten times and double-counts, and 59.9% is the probability that none of the tests is significant.`,
      },
      {
        question: "A researcher tests after 50 participants and again after 100, where the second test uses all the data. Under a true null, the researcher rejects if either test gives p < 0.05. What is true of the false positive rate?",
        options: [
          "It is exactly 0.05, because each individual test uses alpha = 0.05",
          "It is exactly 0.0025, because the two tests are multiplied",
          "It is strictly greater than 0.05, because P(either rejects) = 0.05 + P(second rejects and first does not)",
          "It is less than 0.05, because correlated tests cancel out the error",
        ],
        answer: 2,
        explanation: String.raw`Writing $R_1$ and $R_2$ for the two rejection events, $P(R_1 \cup R_2) = P(R_1) + P(R_2 \cap R_1^c)$. The second term is positive, so the overall rate exceeds 0.05 even though each look uses alpha = 0.05.`,
      },
      {
        question: "A study pre-registers one primary outcome, a sample size of 100, and the exact test, then analyzes it exactly as registered under a true null. What is the probability of a false positive?",
        options: [
          "Exactly 0, because preregistration removes chance",
          "0.05, because the single pre-specified test has a uniform p-value under the null",
          "About 0.64, because some outcomes were measured",
          "It cannot be computed without the observed effect size",
        ],
        answer: 1,
        explanation: "Under a true null, a single pre-specified p-value is uniform, so P(p < 0.05) = 0.05. Preregistration does not remove chance; it fixes the test so the nominal error rate applies.",
      },
    ],
  },
  15: {
    derivation: {
      headline: "The Benjamini-Hochberg threshold from estimating the false discovery proportion",
      axioms: [
        String.raw`Let $R$ be the number of rejections and $V$ the number of false rejections among them. The false discovery proportion is $\text{FDP} = V/\max(R,1)$, and the false discovery rate is $\text{FDR} = E[\text{FDP}]$.`,
        String.raw`Each true null hypothesis has a p-value satisfying $P(p \le t) = t$ for every threshold $t \in [0,1]$, and there are $m_0 \le m$ true nulls among the $m$ tests.`,
        "The p-values come from independent tests, or from positively dependent tests, which is the setting in which the Benjamini-Hochberg guarantee is proven.",
      ],
      steps: [
        {
          title: "Expected false rejections at a fixed threshold",
          body: String.raw`Apply one threshold $t$ to every test and let $V(t)$ count the true nulls with $p_i \le t$. By linearity of expectation and axiom 2, $E[V(t)] = \sum_{\text{nulls}} P(p_i \le t) = m_0 t$.`,
        },
        {
          title: "Estimate the false discovery proportion",
          body: String.raw`Since $m_0 \le m$, the expected false count is at most $m t$. Replacing the unknown $m_0$ by $m$ and using the observable count $R(t)$ of p-values at or below $t$ gives the plug-in estimate $\widehat{\text{FDP}}(t) = \frac{m t}{\max(R(t),1)}$, which requires no knowledge of which nulls are true.`,
        },
        {
          title: "Require the estimate to stay at or below q",
          body: String.raw`The condition $\frac{m t}{R(t)} \le q$ is equivalent to $R(t) \ge \frac{m t}{q}$. Choose the threshold $t = p_{(k)}$, the $k$-th smallest p-value, so that $R(p_{(k)}) = k$ when there are no ties. The condition becomes $k \ge \frac{m\, p_{(k)}}{q}$, which rearranges to $p_{(k)} \le \frac{k}{m} q$.`,
        },
        {
          title: "Take the largest feasible rank",
          body: String.raw`Every rank $k$ with $p_{(k)} \le \frac{k}{m} q$ gives an acceptable cutoff. The Benjamini-Hochberg rule scans from the largest rank downward, takes the largest $k$ that satisfies the condition, and rejects $H_{(1)}, \dots, H_{(k)}$. The formal theorem for independent tests is $\text{FDR} \le \frac{m_0}{m} q \le q$, and the heuristic above explains where the rank-scaled threshold comes from.`,
        },
        {
          title: "Check the rule on five p-values",
          body: String.raw`With $m = 5$ and $q = 0.05$, the thresholds $\frac{k}{5}(0.05)$ are $0.01, 0.02, 0.03, 0.04, 0.05$. The sorted p-values $0.001, 0.010, 0.025, 0.040, 0.150$ satisfy the condition for $k = 1,2,3,4$ and fail at $k = 5$, so four hypotheses are rejected. Bonferroni, with threshold $0.05/5 = 0.01$, rejects only two.`,
        },
      ],
      result: String.raw`$$\text{FDR} = E\!\left[\frac{V}{\max(R,1)}\right] \le \frac{m_0}{m}\, q \le q$$ The Benjamini-Hochberg cutoff is the largest rank $k$ with $p_{(k)} \le \frac{k}{m} q$, and under independence it controls the expected share of false discoveries at $q$.`,
      assumptionsBreak: String.raw`The guarantee needs independent or positively dependent p-values; under arbitrary dependence the Benjamini-Yekutieli correction replaces $q$ with $q / \sum_{i=1}^{m} 1/i$. Also, FDR is an average over repeated experiments, so any single experiment can have a false discovery proportion well above $q$.`,
    },
    quiz: [
      {
        question: "Five independent tests have sorted p-values 0.001, 0.010, 0.025, 0.040, 0.150, and the target is q = 0.05. How many rejections do Bonferroni (threshold 0.05/5) and Benjamini-Hochberg make?",
        options: [
          "Bonferroni 2, BH 4",
          "Bonferroni 4, BH 2",
          "Both 4",
          "Both 2",
        ],
        answer: 0,
        explanation: String.raw`Bonferroni admits only p-values at or below $0.01$, which are 0.001 and 0.010. BH admits all four p-values up to the rank-4 threshold $\frac{4}{5}(0.05) = 0.04$, which is the step-up result.`,
      },
      {
        question: "A study runs 1000 tests, 900 of which have true nulls, and rejects any test with p <= 0.001. What is the expected number of false rejections?",
        options: [
          "0.09",
          "1.0",
          "0.9",
          "900",
        ],
        answer: 2,
        explanation: String.raw`Each true null gives $P(p \le 0.001) = 0.001$, so the expected count is $900 \times 0.001 = 0.9$. The value 1.0 wrongly treats all 1000 tests as true nulls.`,
      },
      {
        question: "In the Benjamini-Hochberg rule, why is the cutoff for p_(k) allowed to grow with the rank k?",
        options: [
          "Because p-values under the null are normally distributed, so their quantiles increase linearly with k",
          "Because the cutoff must shrink as discoveries accumulate so that the total number of false rejections stays fixed",
          "Because a larger number of rejections R = k makes the estimated share of false discoveries smaller, so a looser cutoff is still acceptable",
          "Because the cutoff is the Bonferroni value multiplied by k",
        ],
        answer: 2,
        explanation: String.raw`The FDP estimate is $m t / R(t)$, and at the cutoff $p_{(k)}$ we have $R = k$. Each additional discovery dilutes the false fraction, which permits a larger threshold as $k$ rises.`,
      },
      {
        question: "If every null hypothesis is true, what does the FDR equal?",
        options: [
          "0, for any procedure",
          "The family-wise error rate, P(at least one false rejection)",
          "Exactly q, the target level",
          "1/m for m tests",
        ],
        answer: 1,
        explanation: String.raw`When all nulls are true, $V = R$, so $V/\max(R,1)$ equals 1 if $R \ge 1$ and 0 otherwise. Its expectation is therefore $P(R \ge 1)$, which is the family-wise error rate.`,
      },
      {
        question: "With m = 10 tests and target q = 0.05, what is the BH threshold for the third-smallest p-value p_(3)?",
        options: [
          "0.005",
          "0.03",
          "0.05",
          "0.015",
        ],
        answer: 3,
        explanation: String.raw`The BH threshold is $\frac{k}{m} q = \frac{3}{10}(0.05) = 0.015$. The value 0.05 is the threshold for the last rank $k = m$, not for rank 3.`,
      },
    ],
  },
  16: {
    derivation: {
      headline: "Power as a normal tail probability for the standardized shift",
      axioms: [
        String.raw`Observations $X_1, \dots, X_n$ are independent with $X_i \sim N(\mu, \sigma^2)$ and $\sigma$ known. We test $H_0: \mu = \mu_0$ against the specific alternative $H_1: \mu = \mu_1$, taking $\mu_1 > \mu_0$ for definiteness.`,
        String.raw`The two-sided level-$\alpha$ test rejects when $|Z| > z_{1-\alpha/2}$, where $Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}}$ and $z_{1-\alpha/2}$ is the $(1-\alpha/2)$ quantile of $N(0,1)$.`,
        String.raw`For $W \sim N(0,1)$, $P(W \le x) = \Phi(x)$, $\Phi$ is increasing, and $\Phi(-x) = 1 - \Phi(x)$. A shifted variable $Z = \delta + W$ with constant $\delta$ satisfies $Z \sim N(\delta, 1)$.`,
      ],
      steps: [
        {
          title: "Distribution of Z under the alternative",
          body: String.raw`Under $H_1$, write $\bar{X} = \mu_1 + \bar{\varepsilon}$ with $\bar{\varepsilon} \sim N(0, \sigma^2/n)$. Then $Z = \frac{\mu_1 - \mu_0}{\sigma/\sqrt{n}} + \frac{\bar{\varepsilon}}{\sigma/\sqrt{n}} = \delta_z + W$, where $W \sim N(0,1)$ and the standardized shift is $\delta_z = \frac{(\mu_1-\mu_0)\sqrt{n}}{\sigma}$.`,
        },
        {
          title: "Write power as a tail probability",
          body: String.raw`Power is $P(|Z| > c)$ with $c = z_{1-\alpha/2}$, which splits into two tails: $P(|Z| > c) = P(Z > c) + P(Z < -c)$. Using $Z = \delta_z + W$, $P(Z > c) = P(W > c - \delta_z) = 1 - \Phi(c - \delta_z) = \Phi(\delta_z - c)$, and $P(Z < -c) = \Phi(-c - \delta_z)$.`,
        },
        {
          title: "Drop the negligible lower tail",
          body: String.raw`The exact power is $1-\beta = \Phi(\delta_z - c) + \Phi(-c - \delta_z)$. When $\delta_z > 0$ the second term is tiny: for $\delta_z = 2$ and $c = 1.96$, $\Phi(-3.96) \approx 0.00004$. Dropping it gives the usual approximation $1-\beta \approx \Phi(\delta_z - z_{1-\alpha/2})$ used in the module.`,
        },
        {
          title: "Read off monotonicity and check numbers",
          body: String.raw`Since $\delta_z$ grows with $|\mu_1-\mu_0|$ and with $\sqrt{n}$, shrinks with $\sigma$, and $\Phi$ is increasing, power rises with effect size and sample size and falls with noise. Lowering $\alpha$ raises $c$ and lowers power. For $\mu_1 - \mu_0 = 5$, $\sigma = 10$, $\alpha = 0.05$: $n = 16$ gives $\delta_z = 5 \cdot 4 / 10 = 2.0$ and $1-\beta \approx \Phi(0.04) \approx 0.516$, while $n = 64$ gives $\delta_z = 4.0$ and $1-\beta \approx \Phi(2.04) \approx 0.979$.`,
        },
      ],
      result: String.raw`$$1 - \beta \approx \Phi\left(\delta_z - z_{1-\alpha/2}\right), \qquad \delta_z = \frac{(\mu_1-\mu_0)\sqrt{n}}{\sigma}$$ Power depends on the design only through the standardized shift and the critical value, so it can be computed before any data are collected.`,
      assumptionsBreak: "If the true effect is smaller than the one assumed, or sigma is underestimated, the realized power falls well below the planned value, because the standardized shift is smaller than planned. The formula also assumes known sigma and normal data; with unknown sigma and small samples a t-distribution is needed.",
    },
    quiz: [
      {
        question: "Suppose delta_z = 2.0 and the two-sided alpha is lowered from 0.05 to 0.01, so the critical value rises from 1.96 to 2.58 with n unchanged. Approximately what is the power?",
        options: [
          "0.52, unchanged because the true effect did not change",
          "0.28",
          "0.99",
          "0.05",
        ],
        answer: 1,
        explanation: String.raw`Power is $\Phi(2.0 - 2.58) = \Phi(-0.58) \approx 0.28$. A stricter alpha raises the critical value and shrinks the rejection region, so power falls even though the effect and sample size are unchanged.`,
      },
      {
        question: String.raw`In the exact two-sided power expression $\Phi(\delta_z - c) + \Phi(-c - \delta_z)$ with $\delta_z > 0$, why can the second term usually be dropped?`,
        options: [
          "Because power is defined only for one-sided tests",
          "Because $\Phi$ of any negative number is zero",
          "Because alpha is always split evenly, so the second term always equals alpha",
          String.raw`Because the alternative distribution sits far above $-c$, so landing below $-c$ has tiny probability (for $\delta_z = 2$ and $c = 1.96$ the term is about 0.00004)`,
        ],
        answer: 3,
        explanation: String.raw`With $\delta_z > 0$, the centre of $Z$ is far above $-c$, so $P(Z < -c)$ is very small. The numerical value $\Phi(-3.96) \approx 0.00004$ confirms that the term is negligible.`,
      },
      {
        question: "Holding alpha, sigma, and the true effect fixed, the sample size quadruples from 16 to 64. By what factor does the standardized shift delta_z change?",
        options: [
          "It doubles",
          "It quadruples",
          "It is unchanged",
          "It halves",
        ],
        answer: 0,
        explanation: String.raw`Since $\delta_z \propto \sqrt{n}$, quadrupling $n$ multiplies $\delta_z$ by $\sqrt{4} = 2$, which matches the move from 2.0 to 4.0 in the worked example. The 'quadruples' option confuses $n$ with its square root.`,
      },
      {
        question: "What standardized shift delta_z is needed for 80% power at two-sided alpha = 0.05?",
        options: [
          "1.96",
          "0.84",
          "2.80",
          "3.80",
        ],
        answer: 2,
        explanation: String.raw`We need $\Phi(\delta_z - 1.96) = 0.80$, so $\delta_z - 1.96 = 0.84$ and $\delta_z \approx 2.80$. The value 1.96 is the critical value alone, and 0.84 is the 80% quantile alone.`,
      },
      {
        question: "If the true standardized shift is delta_z = 2.0 and n is fixed, what is the Type II error beta = P(|Z| <= 1.96)?",
        options: [
          "0.516",
          "0.484",
          "0.025",
          "0.950",
        ],
        answer: 1,
        explanation: String.raw`$\beta = \Phi(1.96 - 2.0) - \Phi(-1.96 - 2.0) \approx \Phi(-0.04) \approx 0.484$, which is the complement of power 0.516. The option 0.516 is the power itself, not the error rate.`,
      },
    ],
  },
  17: {
    derivation: {
      headline: "Solving the power equation for the sample size per group",
      axioms: [
        String.raw`Two independent groups of size $n$ each have normal outcomes with common standard deviation $\sigma$ and means $\mu_1$ and $\mu_2$. The standardized effect is $d = \frac{\mu_1 - \mu_2}{\sigma}$.`,
        String.raw`Previously established result: the two-sided level-$\alpha$ z-test rejects when $|Z| > z_{1-\alpha/2}$, and for a test statistic with standardized shift $\delta_z$ the power is $1-\beta = \Phi(\delta_z - z_{1-\alpha/2})$.`,
        String.raw`By definition of the quantile, $\Phi(z_{1-\beta}) = 1-\beta$, so $z_{1-\beta}$ is the standard normal value with cumulative probability $1-\beta$. For 80% power, $z_{1-\beta} \approx 0.8416$.`,
      ],
      steps: [
        {
          title: "Standardized shift for two groups",
          body: String.raw`The test statistic is $Z = \frac{\bar{X}_1 - \bar{X}_2}{\sigma\sqrt{2/n}}$, because $\text{Var}(\bar{X}_1 - \bar{X}_2) = \frac{\sigma^2}{n} + \frac{\sigma^2}{n} = \frac{2\sigma^2}{n}$. Its mean is $\delta_z = \frac{\mu_1 - \mu_2}{\sigma\sqrt{2/n}} = d\sqrt{\frac{n}{2}}$.`,
        },
        {
          title: "Set power equal to the target",
          body: String.raw`Require $\Phi(\delta_z - z_{1-\alpha/2}) = 1-\beta$. Since $\Phi(z_{1-\beta}) = 1-\beta$, this holds exactly when $\delta_z - z_{1-\alpha/2} = z_{1-\beta}$, that is, $\delta_z = z_{1-\alpha/2} + z_{1-\beta}$.`,
        },
        {
          title: "Solve for the sample size",
          body: String.raw`Substitute $\delta_z = d\sqrt{n/2}$ to get $d\sqrt{n/2} = z_{1-\alpha/2} + z_{1-\beta}$. Squaring both sides gives $d^2 \cdot \frac{n}{2} = (z_{1-\alpha/2} + z_{1-\beta})^2$, so $n = \frac{2\,(z_{1-\alpha/2} + z_{1-\beta})^2}{d^2}$ per group.`,
        },
        {
          title: "Check with a numerical example",
          body: String.raw`For $d = 0.5$, $\alpha = 0.05$, and 80% power, $z_{1-\alpha/2} = 1.96$ and $z_{1-\beta} = 0.8416$, so $n = \frac{2(2.8016)^2}{0.25} \approx 62.8$, which rounds up to 63 per group. Check: with $n = 63$, $\delta_z = 0.5\sqrt{31.5} \approx 2.806$ and $\Phi(2.806 - 1.96) = \Phi(0.846) \approx 0.80$.`,
        },
        {
          title: "Why post-hoc power adds nothing",
          body: String.raw`After the study, the observed statistic $z_{\text{obs}} = |Z|$ determines the p-value. Plugging $\delta_z = z_{\text{obs}}$ into the power formula gives observed power $\Phi(z_{\text{obs}} - 1.96)$. If $p = 0.05$ exactly, then $z_{\text{obs}} = 1.96$ and observed power is $\Phi(0) = 0.5$. Any $p > 0.05$ gives observed power below 0.5, so observed power is just a relabelling of the p-value.`,
        },
      ],
      result: String.raw`$$n = \frac{2\left(z_{1-\alpha/2} + z_{1-\beta}\right)^2}{d^2} \quad \text{per group}$$ The required sample size depends only on the standardized effect $d$, the significance level, and the target power, all of which are fixed before the data are collected.`,
      assumptionsBreak: "The formula assumes the planned $d$ equals the true effect and that the normal approximation holds. If the true effect is smaller, as published effects often are, the study is underpowered, and with small groups a t-based calculation needs somewhat more participants.",
    },
    quiz: [
      {
        question: String.raw`Using $n = \frac{2(z_{1-\alpha/2}+z_{1-\beta})^2}{d^2}$ with $d = 0.2$, $\alpha = 0.05$, and 80% power, what is the required n per group?`,
        options: [
          "197",
          "393",
          "63",
          "786",
        ],
        answer: 1,
        explanation: String.raw`$2(2.8016)^2 / 0.04 \approx 392.4$, which rounds up to 393. The option 197 forgets the factor of 2, 786 doubles it, and 63 is the answer for $d = 0.5$, not $d = 0.2$.`,
      },
      {
        question: "A design with 63 per group gives 80% power for d = 0.5. What is the approximate required n per group for 90% power, using z_{1-beta} = 1.2816?",
        options: [
          "63",
          "105",
          "85",
          "126",
        ],
        answer: 2,
        explanation: String.raw`$2(1.96 + 1.2816)^2 / 0.25 = 2(10.508)/0.25 \approx 84.1$, which rounds up to 85. Doubling 63 to 126 wrongly assumes power scales linearly with n.`,
      },
      {
        question: "A study reports a two-sided p = 0.20, then computes observed power by plugging the observed effect into the power formula at alpha = 0.05. What observed power results?",
        options: [
          "0.05",
          "0.80",
          "0.50",
          "0.25",
        ],
        answer: 3,
        explanation: String.raw`A two-sided p of 0.20 corresponds to $|z_{\text{obs}}| \approx 1.28$, so observed power is $\Phi(1.28 - 1.96) = \Phi(-0.68) \approx 0.25$. Any result with p above 0.05 gives observed power below 0.50, which is why it carries no new information.`,
      },
      {
        question: "A pilot with 20 per group estimates d = 0.8, and the team plans the main study using d = 0.8. What is the main risk?",
        options: [
          "The pilot estimate is noisy and was likely selected for being large, so the true d is probably smaller and the planned n is too small",
          "No risk, because pilot effect estimates are unbiased whenever they are significant",
          "A large pilot effect means fewer participants are needed, so the study will be overpowered and wasteful",
          "The risk only arises in Bayesian analysis, since frequentist power calculations are immune to pilot estimates",
        ],
        answer: 0,
        explanation: "Effects that look large in small pilots are inflated by selection, a pattern known as the winner's curse, so the sample size computed from them is too small. The power formula is correct, but its input is biased.",
      },
      {
        question: String.raw`Holding 80% power and d = 0.5 fixed, what is the required n per group if alpha is lowered from 0.05 to 0.01, so that $z_{1-\alpha/2} = 2.5758$?`,
        options: [
          "63",
          "74",
          "94",
          "126",
        ],
        answer: 2,
        explanation: String.raw`$2(2.5758 + 0.8416)^2 / 0.25 = 2(3.4174)^2/0.25 \approx 93.4$, which rounds up to 94. The stricter alpha raises the critical value, which raises the needed standardized shift.`,
      },
    ],
  },
};

export default deepContent;
