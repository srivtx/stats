// Module 11 foundation, built from the ground up with worked examples.
export default {
  title: "Bayesian Foundations, Conditional Probability & Odds",
  summary: "This module teaches how to update a probability when new information arrives. We start with conditional probability, which asks for a chance inside a smaller group. Bayes' theorem uses that idea to turn a test result into a corrected probability, and odds give the same update as a simple multiplication. The module ends with odds ratios, which researchers use to compare the odds of an outcome in two groups.",
  steps: [
    {
      step: 1,
      title: "Probability is a fraction of equally likely outcomes",
      content: [
        String.raw`Start with a bag that holds 10 marbles: 6 are red and 4 are blue. Mix the bag, reach in without looking, and pull out one marble. Every marble is equally likely to be chosen. How likely is a red marble? There are 10 marbles we could pull, and 6 of them are red, so the chance is 6 out of 10.`,
        String.raw`We write the probability of an event as $P(\text{event})$, read as “the probability of the event.” The event here is “the marble is red,” so we write $P(\text{red}) = \frac{6}{10} = 0.6$. A probability is always a number from 0 (impossible) to 1 (certain). The number 0.6 says the event happens in about 60 out of every 100 similar draws.`,
        String.raw`Every probability in this module is a fraction of this kind. The top counts the outcomes where the event happens. The bottom counts all the outcomes that could happen, which is called the sample space. For the bag, the sample space has 10 marbles. Blue is $P(\text{blue}) = \frac{4}{10} = 0.4$, and the two answers add to 1, because every marble is either red or blue.`,
      ],
      example: [
        String.raw`Check the arithmetic: $6 + 4 = 10$ marbles in total, so $P(\text{red}) + P(\text{blue}) = \frac{6}{10} + \frac{4}{10} = \frac{10}{10} = 1$.`,
        String.raw`Try the complement, the event “not red.” Not red means blue, so there are 4 such marbles and $P(\text{not red}) = \frac{4}{10} = 0.4$. Subtracting from 1 gives the same answer: $1 - 0.6 = 0.4$. The complement of any event always has probability $1 - P(\text{event})$.`,
      ],
    },
    {
      step: 2,
      title: "Conditioning shrinks the universe",
      content: [
        String.raw`Now we add information. Picture a class of 20 students: 12 are girls and 8 are boys. In the whole class, 8 students wear glasses. Six of those glasses wearers are girls, so the other 2 are boys. Pick one student at random without any extra information. The chance the student wears glasses is $\frac{8}{20} = 0.4$.`,
        String.raw`Now suppose someone tells you the student is a girl. The chance changes. You are no longer picking from all 20 students. The word “girl” removes the 8 boys, and you pick from the 12 girls alone. Of these 12 girls, 6 wear glasses, so the chance is $\frac{6}{12} = 0.5$. We write this as $P(\text{glasses} \mid \text{girl}) = 0.5$, read as “the probability of glasses given girl.” The vertical bar means “given that.” The information after the bar defines the smaller group we are now choosing from.`,
        String.raw`This is conditional probability. Conditioning on an event replaces the big group with a smaller group, the group where that event happened. The new probability is the number of cases with both features divided by the number of cases in the smaller group. A common misreading is to think the bar means we subtract or cancel something. It does not. It means we restrict attention to the given group.`,
      ],
      example: [
        String.raw`Use letters for the formula. Let $A$ be “glasses” and $B$ be “girl.” The symbol $A \cap B$ means “both A and B happen.” Count the students who are both: 6. Count the girls: 12. As fractions of the whole class of 20, $P(A \cap B) = \frac{6}{20} = 0.3$ and $P(B) = \frac{12}{20} = 0.6$.`,
        String.raw`The conditional probability is $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{0.3}{0.6} = 0.5$. Dividing by 20 on the top and the bottom gives the same number as counting: $\frac{6/20}{12/20} = \frac{6}{12} = 0.5$. The formula is just the count inside the smaller group.`,
      ],
    },
    {
      step: 3,
      title: "Reversing a condition changes the answer",
      content: [
        String.raw`Keep the same class and reverse the question. Among the 8 students who wear glasses, what fraction are girls? Now the smaller group is the glasses wearers. Six of the 8 are girls, so $P(\text{girl} \mid \text{glasses}) = \frac{6}{8} = 0.75$. Compare this with the 0.5 from step 2. The two conditional probabilities are different numbers.`,
        String.raw`Remember the 0.5 from step 2, which is $P(\text{glasses} \mid \text{girl})$. The reversed question, $P(\text{girl} \mid \text{glasses}) = 0.75$, asks a different question with a different smaller group. In general $P(A \mid B)$ is not the same as $P(B \mid A)$. Mixing these up is one of the most common errors in probability, and it causes errors in medicine and in courtrooms.`,
        String.raw`Now we can rearrange the definition. Multiply both sides of $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ by $P(B)$ to get the multiplication rule: $P(A \cap B) = P(A \mid B) \times P(B)$. Swap the roles of A and B to get $P(A \cap B) = P(B \mid A) \times P(A)$. Both products describe the same event, so they must equal each other.`,
      ],
      example: [
        String.raw`Check the multiplication rule with counts. $P(\text{glasses} \mid \text{girl}) \times P(\text{girl}) = 0.5 \times 0.6 = 0.3$. The count of girls with glasses is 6, and $\frac{6}{20} = 0.3$. The other order also works: $P(\text{girl} \mid \text{glasses}) \times P(\text{glasses}) = 0.75 \times 0.4 = 0.3$.`,
        String.raw`Independence. Two events are independent when knowing one does not change the chance of the other, so $P(A \mid B) = P(A)$. Here $P(\text{glasses} \mid \text{girl}) = 0.5$, but $P(\text{glasses}) = 0.4$. Knowing the student is a girl changes the chance of glasses, so the two events are not independent. A check with products: if they were independent, $P(\text{glasses} \cap \text{girl})$ would be $0.4 \times 0.6 = 0.24$, but the count gives 0.3.`,
      ],
    },
    {
      step: 4,
      title: "Bayes' theorem reverses a conditional probability",
      content: [
        String.raw`Here is a real question. A disease affects 1 person in 1,000. Imagine 100,000 people. Then 100 people are sick and 99,900 are healthy. A test is positive for 99 of the 100 sick people. The fraction of sick people the test catches, 0.99, is called the sensitivity. The test is also positive for 5 out of every 100 healthy people. That 0.05 is the false positive rate. Now a person tests positive. What is the chance they are sick? We want $P(\text{sick} \mid \text{positive})$.`,
        String.raw`The test gives us the opposite conditional probability, $P(\text{positive} \mid \text{sick}) = 0.99$. We want the reverse. The multiplication rule from step 3 gives two ways to write the probability that a person is sick and positive: $P(\text{sick} \cap \text{positive}) = P(\text{positive} \mid \text{sick}) \times P(\text{sick})$ and $P(\text{sick} \cap \text{positive}) = P(\text{sick} \mid \text{positive}) \times P(\text{positive})$. Set them equal and divide by $P(\text{positive})$.`,
        String.raw`The result is Bayes' theorem: $P(\text{sick} \mid \text{positive}) = \frac{P(\text{positive} \mid \text{sick}) \times P(\text{sick})}{P(\text{positive})}$. Each part has a name. $P(\text{sick})$ is the prior, the chance before the test. $P(\text{positive} \mid \text{sick})$ is the likelihood, how well the evidence fits the idea that the person is sick. $P(\text{sick} \mid \text{positive})$ is the posterior, the updated chance after seeing the evidence. The bottom term $P(\text{positive})$ is the chance of any positive result, and we must compute it first.`,
      ],
      example: [
        String.raw`Compute $P(\text{positive})$ with counts. Sick people who test positive: $0.99 \times 100 = 99$. Healthy people who test positive: $0.05 \times 99{,}900 = 4{,}995$. Total positives: $99 + 4{,}995 = 5{,}094$. So $P(\text{positive}) = \frac{5{,}094}{100{,}000} = 0.05094$. This is the law of total probability: when a population splits into groups, the chance of an outcome is the sum of its chance inside each group.`,
        String.raw`Apply the formula: $P(\text{sick} \mid \text{positive}) = \frac{0.99 \times 0.001}{0.05094} = \frac{0.00099}{0.05094} = 0.01943$. That is 1.94 percent. Check with counts: $\frac{99}{5{,}094} = 0.01943$. The two methods agree.`,
      ],
    },
    {
      step: 5,
      title: "The false positive paradox: the base rate decides",
      content: [
        String.raw`Remember the 0.01943 from step 4. Most people expect a positive result from a 99 percent accurate test to mean the person is probably sick. Here the posterior is only 1.94 percent. This is the false positive paradox. Look at the 5,094 positive results: only 99 are real, and 4,995 are false alarms. The false alarms win because almost everyone is healthy. Even a 5 percent error rate, applied to 99,900 healthy people, creates far more positives than the 99 real cases.`,
        String.raw`The cause is the prior, $P(\text{sick})$, which is also called the base rate. We can test this directly. Keep the test fixed at 99 percent sensitivity and a 5 percent false positive rate, and change only the prior. The posterior moves a lot. This is why the same test can be very useful in a clinic where the disease is common, and nearly useless in a general screening program where the disease is rare.`,
        String.raw`A common misreading is that a 99 percent accurate test makes a positive result 99 percent likely to be right. Accuracy describes $P(\text{positive} \mid \text{sick})$, the chance of a positive result given sickness. A positive result requires $P(\text{sick} \mid \text{positive})$, which also depends on the prior. Bayes' theorem is the rule that connects the two.`,
      ],
      example: [
        String.raw`Same test, three priors. Prevalence 1 in 10 (prior 0.1): $P(\text{positive}) = 0.99 \times 0.1 + 0.05 \times 0.9 = 0.099 + 0.045 = 0.144$, so the posterior is $\frac{0.099}{0.144} = 0.6875$, about 69 percent. Prevalence 1 in 100 (prior 0.01): $P(\text{positive}) = 0.0099 + 0.0495 = 0.0594$, so the posterior is $\frac{0.0099}{0.0594} = 0.1667$, about 17 percent. Prevalence 1 in 1,000 (prior 0.001): the posterior is 0.0194, about 2 percent, as in step 4.`,
        String.raw`Bayes updating in two rounds. Suppose the person from step 4 takes a second, separate test, and the two tests make independent errors. Use the posterior from round one, 0.01943, as the new prior. Then $P(\text{sick} \mid \text{second positive}) = \frac{0.99 \times 0.01943}{0.99 \times 0.01943 + 0.05 \times 0.98057} = \frac{0.01924}{0.01924 + 0.04903} = \frac{0.01924}{0.06827} = 0.2818$. One positive moved the chance from 0.001 to 0.0194, and a second positive moved it to 0.282.`,
      ],
    },
    {
      step: 6,
      title: "Odds and log-odds rewrite the same update",
      content: [
        String.raw`Probabilities are capped between 0 and 1, which makes repeated updates clumsy. Odds are another way to state a chance. Odds compare the chance that an event happens with the chance that it does not. If $p$ is the probability of the event, then the odds are $\text{odds} = \frac{p}{1 - p}$. For example, if the probability is $p = 0.8$, the odds are $\frac{0.8}{0.2} = 4$, read as “4 to 1 in favor.” Odds can be any number from 0 to infinity.`,
        String.raw`To go back from odds to probability, use $p = \frac{\text{odds}}{1 + \text{odds}}$. Odds of 4 give $p = \frac{4}{5} = 0.8$, which returns the original number. Odds equal 1 when $p = 0.5$, which is the case of a fair coin that is equally likely to land either way.`,
        String.raw`The log-odds, also called the logit, is the natural logarithm of the odds: $\text{logit}(p) = \ln\left(\frac{p}{1-p}\right)$. The natural log, written $\ln$, is the power to which the number $e \approx 2.718$ must be raised to give the input. Log-odds run over all real numbers, from negative to positive infinity. A probability of 0.5 gives log-odds 0, and positive log-odds mean the event is more likely than not.`,
      ],
      example: [
        String.raw`Compute both ways. For $p = 0.8$: the odds are $\frac{0.8}{0.2} = 4.0$, and $\ln(4.0) = 1.386$. For $p = 0.2$: the odds are $\frac{0.2}{0.8} = 0.25$, and $\ln(0.25) = -1.386$. The two log-odds have equal size and opposite sign, because $0.25 = \frac{1}{4}$ and $\ln\left(\frac{1}{4}\right) = -\ln(4)$.`,
        String.raw`Bayes in odds form. The test has a likelihood ratio of $\frac{0.99}{0.05} = 19.8$, meaning a sick person is 19.8 times as likely as a healthy person to test positive. The prior odds are $\frac{0.001}{0.999} = \frac{1}{999} = 0.001001$. Multiply: the posterior odds are $19.8 \times 0.001001 = 0.01982$. Convert back: $p = \frac{0.01982}{1.01982} = 0.01943$, matching step 4. The posterior odds equal the prior odds times the likelihood ratio. The reason is that dividing Bayes' theorem for “sick” by Bayes' theorem for “healthy” cancels the shared bottom term $P(\text{positive})$.`,
      ],
    },
    {
      step: 7,
      title: "Odds ratios compare two groups on a symmetric scale",
      content: [
        String.raw`Frank Starmer, a cardiologist, taught his son a rule that guides this module: if you cannot explain an idea with a clean picture and a count, you do not yet understand it, and you should never accept a formula you cannot derive yourself. We follow that rule. Begin with two groups of 100 people each. In the first group, 20 people have a disease and 80 do not. In the second group, 2 people have it and 98 do not.`,
        String.raw`Put the counts in a 2 by 2 table with letters: $a = 20$ people in group one with the disease, $b = 80$ in group one without, $c = 2$ in group two with the disease, and $d = 98$ in group two without. The odds of disease in group one are $\frac{a}{b}$, and in group two they are $\frac{c}{d}$. The odds ratio is the ratio of these two odds: $\text{OR} = \frac{a/b}{c/d} = \frac{ad}{bc}$. An odds ratio of 1 means the two groups have the same odds. A common misreading is that an odds ratio equals a relative risk. The risk in group one is $\frac{20}{100} = 0.20$ and in group two it is $\frac{2}{100} = 0.02$, so the relative risk is 10. The odds ratio is larger, because it compares odds, not risks. The two agree closely only when the disease is rare.`,
        String.raw`Symmetry on the log scale. An odds ratio of 2 and an odds ratio of 0.5 describe the same size of effect in opposite directions, yet they sit at different distances from 1. Taking logs fixes this: $\ln(2) = 0.693$ and $\ln(0.5) = -0.693$ are the same distance from 0. So we work with $\ln(\text{OR})$. In logistic regression, each slope coefficient $\beta$ gives an odds ratio $e^{\beta}$ for a one-unit increase in the predictor.`,
        String.raw`Derivation of the standard error. Start from $\ln(\text{OR}) = \ln(a) + \ln(d) - \ln(b) - \ln(c)$, which follows from $\ln(xy) = \ln(x) + \ln(y)$. Treat each count as a random count whose variance is roughly equal to its mean, as Poisson counts do. For a count $a$, the delta method multiplies the variance by the squared slope of $\ln$, which is $\left(\frac{1}{a}\right)^2$: $\text{Var}(\ln a) \approx \left(\frac{1}{a}\right)^2 \times \text{Var}(a) = \left(\frac{1}{a}\right)^2 \times a = \frac{1}{a}$. The four counts are independent, so their variances add: $\text{Var}(\ln \text{OR}) \approx \frac{1}{a} + \frac{1}{b} + \frac{1}{c} + \frac{1}{d}$. This is an approximation that works for large counts. It breaks down when a count is zero, because $\frac{1}{0}$ is undefined.`,
      ],
      example: [
        String.raw`Compute the odds ratio. Odds in group one: $\frac{a}{b} = \frac{20}{80} = 0.25$. Odds in group two: $\frac{c}{d} = \frac{2}{98} = 0.0204$. Odds ratio: $\text{OR} = \frac{ad}{bc} = \frac{20 \times 98}{80 \times 2} = \frac{1960}{160} = 12.25$. Group one has 12.25 times the odds of the disease. For a coefficient example, if $\beta = -0.693$ for a treatment, then $e^{-0.693} = 0.50$, so treated people have about half the odds. Check: $\ln(0.5) = -0.693$.`,
        String.raw`Use the variance formula with the counts: $\frac{1}{20} + \frac{1}{80} + \frac{1}{2} + \frac{1}{98} = 0.0500 + 0.0125 + 0.5000 + 0.0102 = 0.5727$. The standard error is $\sqrt{0.5727} = 0.757$. The log odds ratio is $\ln(12.25) = 2.506$, so an approximate 95 percent interval on the log scale is $2.506 \pm 1.96 \times 0.757$, which runs from 1.022 to 3.989. Taking $e$ to those powers gives an odds ratio interval of 2.78 to 54.0. The interval is very wide, which is what counts as small as 2 should produce. Remember the one thing for this module: $P(A \mid B)$ and $P(B \mid A)$ are different numbers, and Bayes' theorem is the exact rule that converts one into the other.`,
      ],
    },
  ],
};
