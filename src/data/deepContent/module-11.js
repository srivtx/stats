// Deep first-principles theory and extra knowledge-check questions for module-11
export const deepContent = {
  20: {
    derivation: {
      headline: "Conditioning as restriction to B followed by renormalization",
      axioms: [
        String.raw`Let $(\Omega, \mathcal{F}, P)$ be a probability space, so that $P(A) \ge 0$, $P(\Omega) = 1$, and $P$ is additive over disjoint events.`,
        String.raw`Let $B$ be an event with $P(B) > 0$. Conditioning on $B$ replaces $\Omega$ by $B$ as the new universe and defines a new measure $Q(A) = P(A \mid B)$ for every event $A$.`,
        String.raw`Relative likelihoods are preserved: for events $E, F \subseteq B$ with $P(F) > 0$, the ratio $Q(E)/Q(F)$ equals $P(E)/P(F)$, because restricting the universe should not change how the surviving outcomes compare to each other.`
      ],
      steps: [
        {
          title: "Only the part of A inside B matters",
          body: String.raw`Any outcome outside $B$ is impossible once $B$ has occurred, so $Q(A) = Q(A \cap B)$ for every event $A$. The conditional measure therefore only has to be determined on subsets of $B$, and every such subset has the form $E = A \cap B$ for some event $A$.`
        },
        {
          title: "Proportionality fixes the shape",
          body: String.raw`Take any $E \subseteq B$ and use $F = B$ in the preserved-ratio axiom: $Q(E)/Q(B) = P(E)/P(B)$. Rearranging gives $Q(E) = c\,P(E)$ with the single constant $c = Q(B)/P(B)$, which is the same for every $E \subseteq B$.`
        },
        {
          title: "Normalization pins the scale",
          body: String.raw`The new universe must have total probability one, so $Q(B) = 1$. Substituting into $c = Q(B)/P(B)$ gives $c = 1/P(B)$, which is well defined exactly because $P(B) > 0$. Therefore $Q(A) = c\,P(A \cap B) = \frac{P(A \cap B)}{P(B)}$.`
        },
        {
          title: "The multiplication rule",
          body: String.raw`Rearranging the definition gives $P(A \cap B) = P(A \mid B)\,P(B)$. Since $A \cap B = B \cap A$, the same argument with the roles swapped gives $P(A \cap B) = P(B \mid A)\,P(A)$ whenever $P(A) > 0$.`
        },
        {
          title: "Independence is the special case where nothing changes",
          body: String.raw`Setting $P(A \mid B) = P(A)$ and multiplying by $P(B)$ gives $P(A \cap B) = P(A)\,P(B)$. Conversely, if $P(A \cap B) = P(A)\,P(B)$, dividing by $P(B)$ returns $P(A \mid B) = P(A)$. Conditioning leaves $A$ unchanged exactly when the joint probability factorizes.`
        }
      ],
      result: String.raw`$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0,$$ and the multiplication rule $P(A \cap B) = P(A \mid B)\,P(B)$ follows directly. Independence is the special case in which the joint probability factorizes.`,
      assumptionsBreak: String.raw`The formula needs $P(B) > 0$, since a zero-probability condition makes the ratio undefined and requires a limiting argument. It also assumes the information you receive is exactly the event $B$. If the fact you learn was selected by a process that depends on $A$, such as a rule that reveals only certain families or cards, then the true conditional probability differs from $P(A \cap B)/P(B)$ and the formula gives a biased answer.`
    },
    quiz: [
      {
        question: "Using only the definition, suppose P(B) = 0.4 and P(A and B) = 0.1. What is P(A | B)?",
        options: ["0.04", "0.10", "0.25", "0.40"],
        answer: 2,
        explanation: "The definition gives P(A | B) = P(A and B) / P(B) = 0.1 / 0.4 = 0.25. Multiplying the two numbers (0.04) or reporting the joint probability or the condition itself are the common traps."
      },
      {
        question: "In the derivation of P(A | B) = P(A and B) / P(B), why is the constant c forced to equal 1 / P(B) rather than being free?",
        options: [
          "Only because P(B) must be positive",
          "Proportionality of relative likelihoods within B fixes the shape, and normalization Q(B) = 1 fixes the scale",
          "Because A must be a subset of B",
          "Because A and B must be independent"
        ],
        answer: 1,
        explanation: "Proportionality fixes the shape of Q on subsets of B, and normalization fixes the scale. Positivity of P(B) is needed for the division but does not by itself determine the constant."
      },
      {
        question: "Two events satisfy P(A) = 0.2 and P(B | A) = 0.5. What is P(A and B)?",
        options: ["0.1", "0.7", "2.5", "0.3"],
        answer: 0,
        explanation: "The multiplication rule gives P(A and B) = P(B | A) P(A) = 0.5 x 0.2 = 0.1. Adding the two numbers (0.7) or dividing them (2.5) are common mistakes."
      },
      {
        question: "A fair six-sided die is rolled. Let A be the event the roll is even and B the event the roll is at least 4. What is P(A | B)?",
        options: ["1/3", "1/2", "1/6", "2/3"],
        answer: 3,
        explanation: "B = {4, 5, 6} and A and B = {4, 6}, so P(A | B) = 2/3. The value 1/2 is the unconditional P(A), which would be correct only if A and B were independent, and they are not."
      },
      {
        question: "If P(A and B) = 0.10, P(A) = 0.20 and P(B) = 0.50, which pair of conditional probabilities is correct?",
        options: [
          "P(A | B) = 0.20 and P(B | A) = 0.50",
          "P(A | B) = 0.10 and P(B | A) = 0.10",
          "P(A | B) = 0.50 and P(B | A) = 0.20",
          "P(A | B) = 0.40 and P(B | A) = 0.25"
        ],
        answer: 0,
        explanation: "P(A | B) = 0.10 / 0.50 = 0.20 and P(B | A) = 0.10 / 0.20 = 0.50. The two directions differ because they divide by different marginal probabilities."
      }
    ]
  },
  21: {
    derivation: {
      headline: "Bayes' theorem as the multiplication rule solved for the reverse conditional",
      axioms: [
        String.raw`Probability satisfies $P(A) \ge 0$, $P(\Omega) = 1$, and additivity over disjoint events, and all events considered have positive probability so that every conditional probability is defined.`,
        String.raw`For events $X$ and $Y$ with $P(Y) > 0$, the conditional probability satisfies $P(X \cap Y) = P(X \mid Y)\,P(Y)$, which is the definition of conditional probability rearranged.`,
        String.raw`The events $A_1, \dots, A_k$ form a partition of $\Omega$: they are pairwise disjoint and their union is $\Omega$.`
      ],
      steps: [
        {
          title: "Two factorizations of one intersection",
          body: String.raw`The event $A \cap B$ can be factored in two ways. Applying the multiplication rule with $A$ as the condition gives $P(A \cap B) = P(B \mid A)\,P(A)$, and with $B$ as the condition gives $P(A \cap B) = P(A \mid B)\,P(B)$. Both expressions equal the same number, so they can be set equal to each other.`
        },
        {
          title: "Solve for the reverse conditional",
          body: String.raw`Equating the two factorizations gives $P(B \mid A)\,P(A) = P(A \mid B)\,P(B)$. Dividing both sides by $P(B)$, which is positive by assumption, gives $P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}$. This expresses the reverse conditional, the posterior, in terms of the forward conditional $P(B \mid A)$ and the prior $P(A)$.`
        },
        {
          title: "Expand the evidence over a partition",
          body: String.raw`Since $B = (B \cap A) \cup (B \cap A^c)$ and these two pieces are disjoint, additivity gives $P(B) = P(B \cap A) + P(B \cap A^c)$. Applying the multiplication rule to each piece gives the Law of Total Probability, $P(B) = P(B \mid A)\,P(A) + P(B \mid A^c)\,P(A^c)$.`
        },
        {
          title: "Substitute into the denominator",
          body: String.raw`Replacing $P(B)$ in the previous result with its expansion yields $P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B \mid A)\,P(A) + P(B \mid A^c)\,P(A^c)}$. The numerator is the likelihood times the prior for hypothesis $A$, and the denominator adds the same product for every way that $B$ could have arisen.`
        },
        {
          title: "Generalize to a partition",
          body: String.raw`For a partition $A_1, \dots, A_k$, the same argument with $B = \bigcup_i (B \cap A_i)$ gives $P(B) = \sum_{j} P(B \mid A_j)\,P(A_j)$, so $P(A_i \mid B) = \frac{P(B \mid A_i)\,P(A_i)}{\sum_{j} P(B \mid A_j)\,P(A_j)}$. The denominator is a normalizing constant that makes the posteriors sum to one.`
        }
      ],
      result: String.raw`$$P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}, \qquad P(B) = \sum_{j} P(B \mid A_j)\,P(A_j),$$ so the posterior equals the likelihood times the prior, divided by the evidence.`,
      assumptionsBreak: String.raw`The formula is correct only when the $A_i$ form an exhaustive, non-overlapping partition, because otherwise the evidence $P(B)$ is double counted or missing mass. It also fails when the prior $P(A)$ or the likelihoods $P(B \mid A)$ are wrong: treating a 1 in 1000 base rate as 1 in 10 multiplies the posterior odds by about 111, since posterior odds equal prior odds times the likelihood ratio.`
    },
    quiz: [
      {
        question: "Why does the denominator of Bayes' theorem equal P(B | A) P(A) + P(B | A^c) P(A^c)?",
        options: [
          "Because B splits into two disjoint pieces, B and A and B and not-A, so P(B) is the sum of their probabilities",
          "Because P(B) is always equal to P(A)",
          "Because the prior P(A) must be added to the likelihood",
          "Because independence forces P(B | A) to equal P(B | A^c)"
        ],
        answer: 0,
        explanation: "Every outcome in B is either in A or in A^c, so B is the disjoint union of A and B and A^c and B. Treating the denominator as an arbitrary normalizing number hides the sum over the ways the evidence can arise."
      },
      {
        question: "A hypothesis has prior P(A) = 0.2, likelihood P(B | A) = 0.8, and P(B | A^c) = 0.1. What is P(A | B)?",
        options: ["0.80", "0.667", "0.20", "0.16"],
        answer: 1,
        explanation: "The numerator is 0.8 x 0.2 = 0.16 and the evidence is 0.16 + 0.1 x 0.8 = 0.24, so P(A | B) = 0.16 / 0.24 = 2/3, about 0.667. Reporting the likelihood (0.80) or the prior (0.20) directly ignores the other hypothesis."
      },
      {
        question: "A diagnostic test has sensitivity 0.99 and false positive rate 0.05 for a condition with prior probability 0.5. What is the probability of the condition given a positive test?",
        options: ["0.99", "0.50", "0.952", "0.05"],
        answer: 2,
        explanation: "The numerator is 0.99 x 0.5 = 0.495 and the evidence is 0.495 + 0.05 x 0.5 = 0.52, so the posterior is 0.495 / 0.52, about 0.952. With a prior of 0.5 the posterior sits close to the sensitivity, unlike the rare-disease case."
      },
      {
        question: "In a screening example with 0.1% prevalence, sensitivity 0.99 and false positive rate 0.05, which expression gives P(Disease | Positive)?",
        options: [
          "P(Positive | Disease) = 0.99",
          "(0.99 x 0.001) / (0.99 x 0.001 + 0.05 x 0.999)",
          "(0.99 x 0.001) / 0.001",
          "1 - 0.05 = 0.95"
        ],
        answer: 1,
        explanation: "Bayes' theorem divides the true-positive mass by all positive results, including the false positives from the 99.9% healthy group. Dividing by the prior alone just returns the sensitivity 0.99 and ignores the false positives."
      },
      {
        question: "If P(A | B) = 0.6, P(A) = 0.3 and P(B) = 0.5, what is P(B | A)?",
        options: ["0.6", "0.9", "0.5", "1.0"],
        answer: 3,
        explanation: "Bayes gives P(B | A) = P(A | B) P(B) / P(A) = 0.6 x 0.5 / 0.3 = 1.0. This means every A outcome is also a B outcome, so A is contained in B. Assuming P(B | A) must equal P(A | B) is the common reversal error."
      }
    ]
  },
  59: {
    derivation: {
      headline: "Odds as a ratio, log-odds as a symmetric bijection, and the logistic inverse",
      axioms: [
        String.raw`Let $p = P(E) \in (0, 1)$ be the probability of an event $E$, so that the complement satisfies $P(E^c) = 1 - p$ by the complement rule.`,
        String.raw`Odds are defined as the ratio of the probability of an event to the probability of its complement, $O(p) = \frac{p}{1-p}$.`,
        String.raw`The natural logarithm $\ln : (0, \infty) \to \mathbb{R}$ is a strictly increasing bijection with inverse $\exp$, and $\ln(1/x) = -\ln x$ for every $x > 0$.`
      ],
      steps: [
        {
          title: "Odds range over the positive reals",
          body: String.raw`Since $p \in (0, 1)$, both $p$ and $1-p$ are positive, so $O(p) = \frac{p}{1-p}$ is positive and finite. Its derivative $O'(p) = \frac{1}{(1-p)^2}$ is strictly positive, so $O$ increases from $0$ as $p \to 0$ to $\infty$ as $p \to 1$, taking every value in $(0, \infty)$ exactly once.`
        },
        {
          title: "The logarithm unbounds the scale",
          body: String.raw`Define $L(p) = \ln O(p) = \ln\left(\frac{p}{1-p}\right)$. Because $\ln$ is a bijection from $(0, \infty)$ onto $\mathbb{R}$, the composition is a bijection from $(0, 1)$ onto $\mathbb{R}$, and $L$ is strictly increasing in $p$. At $p = 1/2$ we get $O = 1$ and $L = 0$, so zero marks equal chances.`
        },
        {
          title: "Symmetry around one half",
          body: String.raw`Replacing $p$ by $1-p$ inverts the odds: $O(1-p) = \frac{1-p}{p} = \frac{1}{O(p)}$. Applying the logarithm and the identity $\ln(1/x) = -\ln x$ gives $L(1-p) = -L(p)$. The log-odds of an event and its complement are equal in size and opposite in sign, a symmetry that the raw odds do not have.`
        },
        {
          title: "Invert to recover the probability",
          body: String.raw`Suppose $L = \ln\left(\frac{p}{1-p}\right)$. Exponentiating gives $\frac{p}{1-p} = e^{L}$, so $p = e^{L}(1-p)$ and therefore $p(1 + e^{L}) = e^{L}$. Hence $p = \frac{e^{L}}{1 + e^{L}} = \frac{1}{1 + e^{-L}}$, the logistic sigmoid. Every real $L$ maps back to a unique probability in $(0, 1)$.`
        },
        {
          title: "A linear predictor gives the logistic model",
          body: String.raw`Modeling the log-odds as a linear function, $L = \beta_0 + \beta_1 X$, yields $p(X) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 X)}}$, which always lies in $(0, 1)$. Increasing $X$ by one unit multiplies the odds by $\frac{O(X+1)}{O(X)} = e^{\beta_1}$, so the slope acts multiplicatively on the odds.`
        }
      ],
      result: String.raw`$$\operatorname{logit}(p) = \ln\left(\frac{p}{1-p}\right), \qquad p = \frac{1}{1 + e^{-\operatorname{logit}(p)}},$$ so the logit is a bijection between $(0, 1)$ and $\mathbb{R}$ with antisymmetry $\operatorname{logit}(1-p) = -\operatorname{logit}(p)$.`,
      assumptionsBreak: String.raw`At $p = 0$ or $p = 1$ the odds are $0$ or infinite and the logit is $-\infty$ or $+\infty$, so data with a perfectly separated outcome can drive estimated coefficients toward infinity. The linear-in-$X$ log-odds assumption also fails when the true effect curves or interacts, and then the sigmoid fits the wrong shape.`
    },
    quiz: [
      {
        question: "If logit(0.8) = ln 4, which is approximately 1.386, what is logit(0.2)?",
        options: ["-1.386", "0.2", "-1.609", "+1.386"],
        answer: 0,
        explanation: "Since logit(1 - p) = -logit(p), logit(0.2) = -logit(0.8) = -1.386. The trap is taking the log of the probability itself, which gives ln(0.2) = -1.609 rather than the log-odds."
      },
      {
        question: "If the log-odds of an event equal 2, what is the probability of the event?",
        options: ["0.8808", "0.6667", "0.1192", "2.0000"],
        answer: 0,
        explanation: "Inverting the logit gives p = 1 / (1 + e^(-2)) = 1 / (1 + 0.1353) = 0.8808. Reading 2 as the odds gives 2/3 = 0.6667, and 1 - 0.8808 = 0.1192 flips the event to its complement."
      },
      {
        question: "The odds of an event are 3 to 1, so O = 3. What is the probability p?",
        options: ["0.25", "0.75", "3.00", "0.33"],
        answer: 1,
        explanation: "From O = p / (1 - p) we get p = O / (1 + O) = 3 / 4 = 0.75. The value 0.33 comes from inverting the odds, and 0.25 is the probability of the complement."
      },
      {
        question: "A logistic model gives a linear predictor of 5 for some individual. Which statement about the predicted probability is correct?",
        options: [
          "p = 5, which is impossible for a probability",
          "p = e^5, about 148, which is impossible for a probability",
          "p = 1 / (1 + e^(-5)), about 0.993, which always lies strictly between 0 and 1",
          "p = 0.5, because any positive log-odds gives equal chances"
        ],
        answer: 2,
        explanation: "The sigmoid maps any real linear predictor into (0, 1), so 5 becomes about 0.993. Treating the linear predictor itself as a probability ignores the inverse logit step."
      },
      {
        question: "In a logistic model logit(p) = beta0 + beta1 X with beta1 = 0.5, how do the odds change when X increases by one unit?",
        options: [
          "They increase by 0.5",
          "They are multiplied by 1.50 (that is, 1 + 0.5)",
          "They are multiplied by 2.0",
          "They are multiplied by e^0.5, about 1.65"
        ],
        answer: 3,
        explanation: "O(X+1) / O(X) = exp(beta0 + beta1 (X+1)) / exp(beta0 + beta1 X) = e^(beta1) = e^0.5, about 1.65. The trap is multiplying by 1 + beta1 = 1.5 instead of e^beta1."
      }
    ]
  },
  60: {
    derivation: {
      headline: "Odds ratio as a cross product, additive on the log scale, with a delta-method standard error",
      axioms: [
        String.raw`A two-by-two table has positive cell counts $a, b, c, d > 0$, where $a$ and $b$ are the diseased and healthy counts in the exposed group, and $c$ and $d$ are the diseased and healthy counts in the unexposed group.`,
        String.raw`Within each group the odds follow the definition $O = \frac{p}{1-p}$, which for counts becomes the ratio of cases to non-cases.`,
        String.raw`Counts are approximately Poisson distributed, so $\operatorname{Var}(N) \approx E[N]$ for large counts, and the four cells are approximately independent. The delta method approximates $\operatorname{Var}(g(N)) \approx g'(\mu)^2 \operatorname{Var}(N)$ for a smooth function $g$.`
      ],
      steps: [
        {
          title: "Group odds",
          body: String.raw`In the exposed group the odds of disease are $O_1 = \frac{a}{b}$, and in the unexposed group they are $O_0 = \frac{c}{d}$. Both are positive and finite because every cell count is positive, so their ratio is well defined.`
        },
        {
          title: "The odds ratio is a cross product",
          body: String.raw`The odds ratio compares the two groups: $\mathrm{OR} = \frac{O_1}{O_0} = \frac{a/b}{c/d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc}$. It equals 1 exactly when $ad = bc$, which is the same as $a/b = c/d$, meaning the disease odds are unchanged by exposure.`
        },
        {
          title: "Logs turn the ratio into a difference",
          body: String.raw`Taking logarithms converts the ratio into a difference: $\ln \mathrm{OR} = \ln a - \ln b - \ln c + \ln d$. Swapping the reference group sends the odds ratio to $1/\mathrm{OR}$, and since $\ln(1/x) = -\ln x$, the log odds ratio is symmetric about zero, so halving and doubling the odds lie the same distance from zero.`
        },
        {
          title: "Variance of a log count by the delta method",
          body: String.raw`Let $N$ be a count with mean $\mu$ and $\operatorname{Var}(N) \approx \mu$. The delta method with $g(N) = \ln N$, so $g'(N) = 1/N$, gives $\operatorname{Var}(\ln N) \approx \left(\frac{1}{\mu}\right)^2 \mu = \frac{1}{\mu}$. Replacing $\mu$ by the observed count gives $\operatorname{Var}(\ln a) \approx 1/a$, and similarly for $b$, $c$ and $d$.`
        },
        {
          title: "Add independent variances and build an interval",
          body: String.raw`The four log counts are treated as independent, so their variances add: $\operatorname{Var}(\ln \mathrm{OR}) \approx \frac{1}{a} + \frac{1}{b} + \frac{1}{c} + \frac{1}{d}$. A 95% interval on the log scale is $\ln \mathrm{OR} \pm 1.96\,\mathrm{SE}$, and exponentiating its endpoints gives an interval for the OR that is positive and asymmetric around the OR. For the smokers table (a = 20, b = 80, c = 2, d = 98) this gives OR = 12.25 and an interval of about 2.78 to 54.0.`
        }
      ],
      result: String.raw`$$\widehat{\mathrm{OR}} = \frac{ad}{bc}, \qquad \mathrm{SE}\bigl(\ln \widehat{\mathrm{OR}}\bigr) \approx \sqrt{\frac{1}{a} + \frac{1}{b} + \frac{1}{c} + \frac{1}{d}},$$ and in logistic regression the adjusted odds ratio for a predictor is $\mathrm{OR}_j = e^{\beta_j}$.`,
      assumptionsBreak: String.raw`If any cell is zero, then $ad/bc$ is zero or undefined and its log is infinite, which is why a common fix adds $0.5$ to every cell. The variance formula relies on large counts and independent cells, so it understates uncertainty for small samples or clustered data, and the OR overstates the risk ratio when the outcome is common.`
    },
    quiz: [
      {
        question: "A 2 by 2 table has a = 10, b = 40, c = 5 and d = 45. What is the odds ratio?",
        options: ["0.25", "11.25", "2.25", "0.44"],
        answer: 2,
        explanation: "OR = ad / bc = (10 x 45) / (40 x 5) = 450 / 200 = 2.25. The value 0.25 is only the exposed group's odds a/b, 11.25 omits the c term, and 0.44 is the reciprocal of the correct answer."
      },
      {
        question: "Why does the odds ratio approximate the risk ratio when the outcome is rare?",
        options: [
          "Because odds and probabilities are always equal",
          "Because when p is small, 1 - p is close to 1, so the odds p / (1 - p) are close to p and the ratio of odds is close to the ratio of risks",
          "Because ln(OR) equals RR for every table",
          "Because OR is always the square of RR"
        ],
        answer: 1,
        explanation: "The odds of a rare event are p / (1 - p), which is about p, so the ratio of odds is about the ratio of risks. The approximation breaks down when the outcome is common, which is the pitfall to watch for."
      },
      {
        question: "If the exposed risk is 0.40 and the unexposed risk is 0.20, what is the odds ratio?",
        options: ["2.67", "2.00", "0.50", "1.50"],
        answer: 0,
        explanation: "The exposed odds are 0.40 / 0.60 = 0.667 and the unexposed odds are 0.20 / 0.80 = 0.25, so OR = 0.667 / 0.25 = 2.67. The risk ratio here is 2.00, which is the trap."
      },
      {
        question: "A logistic regression gives a coefficient of 0.05 per year of age. What is the odds ratio for a 10-year increase in age?",
        options: ["1.50", "e^0.05, about 1.05", "e^0.5, about 1.65", "0.5"],
        answer: 2,
        explanation: "Log-odds are linear in age, so a 10-year increase adds 10 x 0.05 = 0.5 to the log-odds, and the odds multiply by e^0.5, about 1.65. Using e^0.05 gives only the effect of a single year."
      },
      {
        question: "Why is a confidence interval for an odds ratio built on the log scale and then exponentiated?",
        options: [
          "Because odds ratios cannot be negative, so intervals must be transformed",
          "Because exponentiation makes the standard error equal to zero",
          "Because the sample size is always 1000 in a 2 by 2 table",
          "Because a normal approximation with plus or minus 1.96 SE is reasonable on the log scale, and exponentiating keeps the interval positive and asymmetric around the OR"
        ],
        answer: 3,
        explanation: "On the log scale the estimate is approximately normal and symmetric, so ln OR plus or minus 1.96 SE is a sensible interval. Exponentiating maps it back to positive values that are asymmetric around the OR, as the smokers example shows."
      }
    ]
  },
  61: {
    derivation: {
      headline: "Deriving the variance of a sample mean from first principles rather than memory",
      axioms: [
        String.raw`Let $X_1, \dots, X_n$ be independent and identically distributed with common mean $\mu = E[X_i]$ and finite variance $\sigma^2 = \operatorname{Var}(X_i) = E[(X_i - \mu)^2]$.`,
        String.raw`The sample mean is $\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$, and expectation is linear: $E[aY + bZ] = aE[Y] + bE[Z]$ for constants $a$ and $b$.`,
        String.raw`Variance is defined as $\operatorname{Var}(Y) = E[(Y - E[Y])^2]$, and independent random variables have zero covariance, $\operatorname{Cov}(Y, Z) = 0$.`
      ],
      steps: [
        {
          title: "The sample mean is unbiased",
          body: String.raw`By linearity, $E[\bar{X}] = \frac{1}{n}\sum_{i=1}^{n} E[X_i] = \frac{1}{n} \cdot n\mu = \mu$, so the sample mean is centered on the true mean. The question of spread is separate and requires the variance, defined as the expected squared deviation from the mean.`
        },
        {
          title: "Scaling pulls out a square",
          body: String.raw`For any constant $c$, $\operatorname{Var}(cY) = E[(cY - cE[Y])^2] = c^2 E[(Y - E[Y])^2] = c^2 \operatorname{Var}(Y)$. Applying this with $c = 1/n$ gives $\operatorname{Var}(\bar{X}) = \frac{1}{n^2}\operatorname{Var}\left(\sum_{i=1}^{n} X_i\right)$.`
        },
        {
          title: "Independence kills the cross terms",
          body: String.raw`Expanding the square gives $\operatorname{Var}\left(\sum_i X_i\right) = \sum_i \operatorname{Var}(X_i) + 2\sum_{i<j} \operatorname{Cov}(X_i, X_j)$. Independence makes every covariance $\operatorname{Cov}(X_i, X_j) = 0$ for $i \ne j$, so only the $n$ diagonal terms survive and $\operatorname{Var}\left(\sum_i X_i\right) = n\sigma^2$.`
        },
        {
          title: "Divide by n squared",
          body: String.raw`Substituting into the scaling identity gives $\operatorname{Var}(\bar{X}) = \frac{1}{n^2} \cdot n\sigma^2 = \frac{\sigma^2}{n}$. The variance shrinks in proportion to $1/n$, so the standard deviation of the mean is $\sigma / \sqrt{n}$, which shrinks only with the square root of the sample size.`
        },
        {
          title: "Check the formula at its boundaries",
          body: String.raw`At $n = 1$ the mean is just $X_1$, so the formula must return $\sigma^2$, and indeed $\sigma^2 / 1 = \sigma^2$. Letting $n \to \infty$ drives the variance to $0$, consistent with the law of large numbers. Both checks follow from the derivation itself, with no memorized table needed.`
        }
      ],
      result: String.raw`$$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}, \qquad \operatorname{SD}(\bar{X}) = \frac{\sigma}{\sqrt{n}},$$ which follows from linearity, the scaling rule for variance, and the vanishing of cross-covariances under independence.`,
      assumptionsBreak: String.raw`The result requires independent observations with finite variance. If neighboring observations are positively correlated, as in many time series, the cross terms do not vanish. With equal pairwise correlation $\rho$, the variance becomes $\sigma^2\left(\frac{1}{n} + \left(1 - \frac{1}{n}\right)\rho\right)$, which stays near $\rho\sigma^2$ no matter how large $n$ grows.`
    },
    quiz: [
      {
        question: "Under iid sampling with sigma = 10, what is the standard deviation of the mean of n = 100 observations?",
        options: ["10", "0.1", "0.01", "1"],
        answer: 3,
        explanation: "SD(X-bar) = sigma / sqrt(n) = 10 / 10 = 1. Dividing by n instead of sqrt(n) gives 0.1, and reading sigma^2 / n^2 = 0.01 as a standard deviation is another error."
      },
      {
        question: "Why is Var(X_1 + ... + X_n) equal to n sigma^2 when the X_i are independent?",
        options: [
          "Because each X_i has mean zero",
          "Because the cross-covariance terms vanish under independence, so only the n variance terms remain",
          "Because variance is additive over any random variables, correlated or not",
          "Because n is large enough for the Central Limit Theorem"
        ],
        answer: 1,
        explanation: "Expanding the square gives n variance terms plus twice the sum of pairwise covariances, and independence sets every covariance to zero. Variance is additive only for uncorrelated variables, so correlation matters."
      },
      {
        question: "Suppose n = 4, sigma^2 = 1, and every pair of observations has correlation rho = 0.5. What is Var(X-bar)?",
        options: ["0.125", "0.25", "0.625", "0.5"],
        answer: 2,
        explanation: "Var(sum) = 4 + 4 x 3 x 0.5 = 10, and dividing by n^2 = 16 gives 0.625. Using the independent formula sigma^2 / n = 0.25 ignores the positive correlation."
      },
      {
        question: "Doubling the sample size from n to 2n changes the standard deviation of the mean by what factor?",
        options: [
          "It halves, a factor of 2",
          "It multiplies by 1/sqrt(2), about 0.71",
          "It falls to one quarter",
          "It does not change"
        ],
        answer: 1,
        explanation: "SD(X-bar) = sigma / sqrt(n), so at 2n it is sigma / sqrt(2n), which is 1/sqrt(2), about 0.71, of the original. Halving the standard deviation would require quadrupling the sample size."
      },
      {
        question: "As a sanity check on Var(X-bar) = sigma^2 / n, what should the formula return when n = 1, and does it?",
        options: [
          "sigma^2 / 1 = sigma^2, which equals Var(X_1), so the check passes",
          "0, which would mean a single observation has no variance, so the check fails",
          "1, because any variance divided by one is one",
          "The formula is undefined at n = 1, so no check is possible"
        ],
        answer: 0,
        explanation: "With n = 1 the sample mean is the single observation, so its variance must equal sigma^2, and the formula returns exactly that. Limiting-case checks like this catch many algebra errors without memorizing anything."
      }
    ]
  }
};

export default deepContent;
