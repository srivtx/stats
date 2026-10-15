// Deep first-principles theory and extra knowledge-check questions for module-8
export const deepContent = {
  18: {
    derivation: {
      headline: "Covariance as the expected product of centered deviations",
      axioms: [
        String.raw`Let $X$ and $Y$ be random variables with finite means $\mu_X = E[X]$ and $\mu_Y = E[Y]$ and finite second moments, so that every expectation used below exists.`,
        String.raw`Expectation is linear: $E[aX + bY] = aE[X] + bE[Y]$ for constants $a$ and $b$, and $E[c] = c$ for any constant $c$.`,
        String.raw`Covariance is defined as the expected product of centered deviations, $\text{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$, and variance is the special case $\text{Var}(X) = \text{Cov}(X,X)$.`,
      ],
      steps: [
        {
          title: "Expand the centered product",
          body: String.raw`Start from the definition $\text{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$ and multiply out the bracket term by term: $(X-\mu_X)(Y-\mu_Y) = XY - \mu_Y X - \mu_X Y + \mu_X \mu_Y$. This is an exact algebraic identity for every outcome, because the constants $\mu_X$ and $\mu_Y$ simply distribute across the product.`,
        },
        {
          title: "Apply linearity of expectation",
          body: String.raw`Take the expectation of each of the four terms. Since $\mu_X$ and $\mu_Y$ are constants, linearity gives $E[XY] - \mu_Y E[X] - \mu_X E[Y] + \mu_X \mu_Y$. Because $E[X] = \mu_X$ and $E[Y] = \mu_Y$, this becomes $E[XY] - \mu_Y \mu_X - \mu_X \mu_Y + \mu_X \mu_Y$.`,
        },
        {
          title: "Collapse the constant terms",
          body: String.raw`The last three terms combine as $-\mu_X \mu_Y - \mu_X \mu_Y + \mu_X \mu_Y = -\mu_X \mu_Y$. Therefore $\text{Cov}(X,Y) = E[XY] - \mu_X \mu_Y = E[XY] - E[X]E[Y]$. This shortcut form is usually easier to compute, and it shows that covariance measures how far the expected product departs from the product of expectations.`,
        },
        {
          title: "Read off the special cases",
          body: String.raw`Setting $Y = X$ in the shortcut gives $\text{Cov}(X,X) = E[X^2] - E[X]^2 = \text{Var}(X)$, so variance is the diagonal case of covariance. If $X$ and $Y$ are independent, the joint distribution factorizes, so $E[XY] = E[X]E[Y]$ and therefore $\text{Cov}(X,Y) = 0$. The implication runs only one way, because a zero covariance can still hide a nonlinear dependence.`,
        },
        {
          title: "Track how scaling changes covariance",
          body: String.raw`Replace $X$ by $aX$ and $Y$ by $cY$ for constants $a$ and $c$. The centered deviations scale as $aX - a\mu_X = a(X-\mu_X)$ and $cY - c\mu_Y = c(Y-\mu_Y)$, so $\text{Cov}(aX, cY) = E[ac(X-\mu_X)(Y-\mu_Y)] = ac\,\text{Cov}(X,Y)$. The magnitude therefore carries the product of the units of $X$ and $Y$, which is why raw covariance is hard to compare across different measurement scales.`,
        },
      ],
      result: String.raw`The whole theory collapses to one formula, $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$, which gives $\text{Cov}(X,X) = \text{Var}(X)$, zero covariance under independence, and the scaling rule $\text{Cov}(aX, cY) = ac\,\text{Cov}(X,Y)$. Display form: $$\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$$`,
      assumptionsBreak: String.raw`The derivation needs $E[XY]$ to exist, which fails for heavy-tailed variables: when $E[X^2]$ is infinite, as with the Cauchy distribution, the covariance is undefined. The converse also fails, since for $X$ uniform on $\{-1, 0, 1\}$ and $Y = X^2$ we get $\text{Cov}(X,Y) = 0$ even though $Y$ is completely determined by $X$.`,
    },
    quiz: [
      {
        question: String.raw`Using the derivation, what is $\text{Cov}(X, X)$ for any random variable $X$ with finite second moment?`,
        options: [
          "0, since a variable has no covariance with itself",
          String.raw`$E[X]^2$, the square of the mean`,
          String.raw`$\text{Var}(X)$, the variance of $X$`,
          "1, by normalization",
        ],
        answer: 2,
        explanation: String.raw`Setting $Y = X$ in the shortcut $E[XY] - E[X]E[Y]$ gives $E[X^2] - E[X]^2 = \text{Var}(X)$. The trap is confusing $E[X]^2$ (a subtracted term) with the full covariance.`,
      },
      {
        question: String.raw`Starting from the definition, what is $\text{Cov}(2X, 3Y)$ in terms of $\text{Cov}(X, Y)$?`,
        options: [
          String.raw`$\text{Cov}(X,Y)$, since constants cancel out`,
          String.raw`$6\,\text{Cov}(X,Y)$`,
          String.raw`$5\,\text{Cov}(X,Y)$, adding the constants`,
          String.raw`$\text{Cov}(X,Y)/6$`,
        ],
        answer: 1,
        explanation: String.raw`Centering gives $2X - 2\mu_X = 2(X-\mu_X)$ and $3Y - 3\mu_Y = 3(Y-\mu_Y)$, so the product picks up the factor $2 \cdot 3 = 6$. The trap is adding the constants instead of multiplying them.`,
      },
      {
        question: String.raw`Suppose $E[XY] = 10$, $E[X] = 2$, and $E[Y] = 3$. What is $\text{Cov}(X, Y)$?`,
        options: [
          "4",
          "10",
          "-4",
          "5",
        ],
        answer: 0,
        explanation: String.raw`The shortcut gives $\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 10 - 2 \cdot 3 = 4$. Subtracting the sum $E[X] + E[Y] = 5$ instead of the product is the common slip.`,
      },
      {
        question: String.raw`For the shifted variables $X' = X + 5$ and $Y' = Y - 3$, which identity holds?`,
        options: [
          String.raw`$\text{Cov}(X',Y') = \text{Cov}(X,Y) + 15$`,
          String.raw`$\text{Cov}(X',Y') = 0$`,
          String.raw`$\text{Cov}(X',Y') = \text{Cov}(X,Y) - 15$`,
          String.raw`$\text{Cov}(X',Y') = \text{Cov}(X,Y)$`,
        ],
        answer: 3,
        explanation: String.raw`Shifts by constants cancel in the centered deviations, since $(X+5) - (\mu_X+5) = X - \mu_X$. Only multiplicative scale factors change covariance, so the shift leaves it unchanged.`,
      },
      {
        question: String.raw`Let $\text{Var}(X) = \sigma^2 > 0$ and $Y = -X$. What is $\text{Cov}(X, Y)$?`,
        options: [
          String.raw`$-2\sigma^2$`,
          String.raw`$-\sigma^2$`,
          String.raw`$0$`,
          String.raw`$+\sigma^2$`,
        ],
        answer: 1,
        explanation: String.raw`Since $Y = -X$, $\text{Cov}(X, -X) = -\text{Cov}(X,X) = -\text{Var}(X) = -\sigma^2$. The trap is doubling the variance as if the two copies added together.`,
      },
    ],
  },
  19: {
    derivation: {
      headline: "Pearson's r as covariance of standardized variables bounded in [-1, 1]",
      axioms: [
        String.raw`Let $X$ and $Y$ have finite variances $\sigma_X^2 = \text{Var}(X) > 0$ and $\sigma_Y^2 = \text{Var}(Y) > 0$, so both standard deviations are positive and the ratio below is defined.`,
        String.raw`Pearson's correlation is defined as $\rho = \dfrac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$, where $\text{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$ and linearity of expectation holds.`,
        String.raw`For every random variable $W$ with finite second moment, $E[W^2] \ge 0$, and $E[W^2] = 0$ implies $W = 0$ with probability one.`,
      ],
      steps: [
        {
          title: "Standardize both variables",
          body: String.raw`Define $Z_X = (X-\mu_X)/\sigma_X$ and $Z_Y = (Y-\mu_Y)/\sigma_Y$. Then $E[Z_X] = 0$ and $E[Z_X^2] = \text{Var}(X)/\sigma_X^2 = 1$, and likewise for $Z_Y$. Multiplying the two definitions gives $E[Z_X Z_Y] = \text{Cov}(X,Y)/(\sigma_X \sigma_Y) = \rho$, so $\rho$ is simply the covariance of the standardized variables.`,
        },
        {
          title: "Bound the correlation with a squared sum",
          body: String.raw`Let $U = Z_X + Z_Y$. Since $E[U] = 0$, we have $E[U^2] = E[Z_X^2] + 2E[Z_X Z_Y] + E[Z_Y^2] = 1 + 2\rho + 1 = 2 + 2\rho$. Because $E[U^2] \ge 0$, this forces $\rho \ge -1$. Similarly, $V = Z_X - Z_Y$ gives $E[V^2] = 2 - 2\rho \ge 0$, which forces $\rho \le 1$. Together, $-1 \le \rho \le 1$.`,
        },
        {
          title: "Characterize the boundary cases",
          body: String.raw`If $\rho = 1$, then $E[V^2] = 0$, so $V = 0$ with probability one, meaning $Z_X = Z_Y$. That gives $(Y-\mu_Y)/\sigma_Y = (X-\mu_X)/\sigma_X$, which rearranges to $Y = aX + b$ with $a = \sigma_Y/\sigma_X > 0$ and $b = \mu_Y - a\mu_X$. If $\rho = -1$, then $E[U^2] = 0$ gives $Z_Y = -Z_X$, and the same algebra yields a line with slope $a = -\sigma_Y/\sigma_X < 0$.`,
        },
        {
          title: "Show invariance under rescaling",
          body: String.raw`Take $X' = aX + b$ and $Y' = cY + d$ with $a, c \ne 0$. Then $\sigma_{X'} = |a|\sigma_X$, $\sigma_{Y'} = |c|\sigma_Y$, and $\text{Cov}(X',Y') = ac\,\text{Cov}(X,Y)$, because the shifts $b$ and $d$ drop out of the centered deviations. Hence $r(X',Y') = \dfrac{ac\,\text{Cov}(X,Y)}{|a|\sigma_X \, |c|\sigma_Y} = \text{sgn}(ac)\, r(X,Y)$. The magnitude of $r$ is unchanged, and only the sign can flip.`,
        },
      ],
      result: String.raw`Pearson's $r$ is the covariance of the standardized variables, it always lies in $[-1,1]$, and $\pm 1$ occurs exactly when $Y$ is an exact linear function of $X$. Display form: $$\rho = E[Z_X Z_Y] = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y} \in [-1, 1]$$`,
      assumptionsBreak: String.raw`The argument needs finite second moments and nonzero spread: if $\sigma_Y = 0$ the denominator vanishes and $r$ is undefined, and heavy tails make the sample $r$ unstable. Pearson's $r$ measures only linear association, so a perfect curve can still give $\rho = 0$; for example, $X$ uniform on $\{-1, 0, 1\}$ and $Y = X^2$ gives $\rho = 0$ despite exact dependence.`,
    },
    quiz: [
      {
        question: String.raw`In the derivation, the standardized variables $Z_X$ and $Z_Y$ each have variance 1. What is $\text{Var}(Z_X + Z_Y)$ in terms of $\rho$?`,
        options: [
          String.raw`$2 - 2\rho$`,
          String.raw`$2 + 2\rho$`,
          String.raw`$1 + \rho$`,
          String.raw`$\rho^2$`,
        ],
        answer: 1,
        explanation: String.raw`Expanding gives $\text{Var}(Z_X) + \text{Var}(Z_Y) + 2\,\text{Cov}(Z_X, Z_Y) = 1 + 1 + 2\rho$. The trap is the minus sign, which is the correct result for the difference $Z_X - Z_Y$ instead.`,
      },
      {
        question: String.raw`Suppose the sample correlation between $X$ and $Y$ is exactly $r = +1$. Which statement must be true?`,
        options: [
          "$X$ and $Y$ are independent",
          String.raw`$Y = aX + b$ with $a > 0$ for every observed pair`,
          String.raw`$Y = aX + b$ with $a < 0$ for every observed pair`,
          String.raw`$\bar{x} = \bar{y}$ always holds`,
        ],
        answer: 1,
        explanation: String.raw`From the boundary analysis, $\rho = +1$ forces an exact line with positive slope $a = \sigma_Y/\sigma_X > 0$. The trap is mixing up the sign of the slope with the sign of the correlation, or assuming a perfect correlation implies independence.`,
      },
      {
        question: String.raw`The correlation between $X$ and $Y$ is $r$. You create $X' = 100X$ and $Y' = -Y/1000$. What is the correlation between $X'$ and $Y'$?`,
        options: [
          String.raw`$100r$`,
          String.raw`$-r/1000$`,
          String.raw`$-r$`,
          String.raw`$r$`,
        ],
        answer: 2,
        explanation: String.raw`The rule $r(aX, cY) = \text{sgn}(ac)\, r(X,Y)$ with $a = 100$ and $c = -1/1000$ gives $\text{sgn}(-0.1) = -1$, so $r' = -r$. The trap is rescaling $r$ by the factors, which only happens to covariance, or forgetting that a negative scale factor flips the sign.`,
      },
      {
        question: String.raw`Let $X$ take the values $-1, 0, 1$ with equal probability and let $Y = X^2$. What is the population correlation $\rho_{X,Y}$?`,
        options: [
          String.raw`$1$, because $Y$ is a deterministic function of $X$`,
          String.raw`$-1$, because the curve bends downward`,
          String.raw`Undefined, because $Y$ depends on $X$`,
          String.raw`$0$, because $\text{Cov}(X, X^2) = E[X^3] - E[X]E[X^2] = 0$`,
        ],
        answer: 3,
        explanation: String.raw`Here $E[X] = 0$ and $E[X^3] = (-1 + 0 + 1)/3 = 0$, so the covariance is zero and $\rho = 0$. The trap is treating deterministic dependence as perfect correlation, which only holds for linear functions.`,
      },
      {
        question: String.raw`If $Y$ takes the same value for every observation, what happens to Pearson's $r$ between $X$ and $Y$?`,
        options: [
          String.raw`It is undefined, because the denominator contains $\sigma_Y = 0$`,
          String.raw`It equals $0$, because there is no variation in $Y$`,
          String.raw`It equals $1$, because $Y$ is perfectly predicted by $X$`,
          String.raw`It equals $-1$, because the covariance is negative`,
        ],
        answer: 0,
        explanation: String.raw`The numerator $\text{Cov}(X,Y)$ is zero and the denominator $\sigma_X \sigma_Y$ is zero, so $r$ is a $0/0$ expression with no value. The trap is reading zero variation as a correlation of zero.`,
      },
    ],
  },
};

export default deepContent;
