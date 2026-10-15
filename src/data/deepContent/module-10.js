// Deep first-principles theory and extra knowledge-check questions for module-10
export const deepContent = {
  36: {
    derivation: {
      headline: "R-squared as the share of baseline squared error removed by the fitted line",
      axioms: [
        String.raw`The baseline predictor is the sample mean, so its total squared error is $SS_{\text{tot}} = \sum_{i=1}^n (y_i - \bar{y})^2$.`,
        String.raw`A least squares fit with an intercept produces fitted values $\hat{y}_i$ and residuals $e_i = y_i - \hat{y}_i$ satisfying $\sum_i e_i = 0$ and $\sum_i \hat{y}_i e_i = 0$.`,
        String.raw`The regression sum of squares is $SS_{\text{reg}} = \sum_i (\hat{y}_i - \bar{y})^2$ and the residual sum of squares is $SS_{\text{res}} = \sum_i e_i^2$.`
      ],
      steps: [
        {
          title: "Split each deviation into explained and unexplained parts",
          body: String.raw`Write $y_i - \bar{y} = (\hat{y}_i - \bar{y}) + e_i$. Squaring and summing over $i$ gives $SS_{\text{tot}} = SS_{\text{reg}} + SS_{\text{res}} + 2\sum_i (\hat{y}_i - \bar{y}) e_i$, so the only question is whether the cross term vanishes.`
        },
        {
          title: "The cross term vanishes by orthogonality",
          body: String.raw`Expand $\sum_i (\hat{y}_i - \bar{y}) e_i = \sum_i \hat{y}_i e_i - \bar{y}\sum_i e_i$. Both pieces are zero by the orthogonality axiom, so $SS_{\text{tot}} = SS_{\text{reg}} + SS_{\text{res}}$ with nothing left over between the two parts.`
        },
        {
          title: "Define R-squared as a fraction of the baseline error",
          body: String.raw`Both $SS_{\text{reg}}$ and $SS_{\text{res}}$ are nonnegative and they add to $SS_{\text{tot}}$. So $R^2 = \frac{SS_{\text{reg}}}{SS_{\text{tot}}} = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}}$ lies in $[0,1]$ when $SS_{\text{tot}} > 0$, and it is the proportion of the mean-only squared error that the fitted line removes.`
        },
        {
          title: "Simple regression collapses R-squared to r squared",
          body: String.raw`With one predictor, $\hat{y}_i - \bar{y} = b_1(x_i - \bar{x})$ where $b_1 = S_{xy}/S_{xx}$, $S_{xy} = \sum_i (x_i - \bar{x})(y_i - \bar{y})$ and $S_{xx} = \sum_i (x_i - \bar{x})^2$. Then $SS_{\text{reg}} = b_1^2 S_{xx} = S_{xy}^2/S_{xx}$ and $SS_{\text{tot}} = S_{yy}$, so $R^2 = \frac{S_{xy}^2}{S_{xx}S_{yy}}$, which is exactly the squared Pearson correlation $r^2$.`
        },
        {
          title: "Adding predictors never raises the residual sum",
          body: String.raw`A model with more predictors contains every fit of a smaller nested model, so its minimal $SS_{\text{res}}$ cannot be larger while $SS_{\text{tot}}$ stays fixed. Raw $R^2$ therefore never falls. Adjusted R-squared uses $R^2_{\text{adj}} = 1 - (1-R^2)\frac{n-1}{n-p-1}$, so an added predictor must lower $SS_{\text{res}}$ enough to pay for its lost degree of freedom.`
        }
      ],
      result: String.raw`$R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}} = \frac{SS_{\text{reg}}}{SS_{\text{tot}}}$, which equals $r^2$ in simple regression and lies between 0 and 1 whenever an intercept is included.`,
      assumptionsBreak: "Without an intercept the residuals no longer sum to zero, the decomposition fails, and 1 - SS_res/SS_tot can be negative. A high R-squared also says nothing about whether a straight line is the right shape, and a single outlier can produce a large R-squared that describes one point rather than the trend."
    },
    quiz: [
      {
        question: String.raw`In simple linear regression with one predictor $x$, why is R-squared exactly equal to the squared Pearson correlation $r^2$?`,
        options: [
          "Because the slope b_1 always equals r",
          String.raw`Because $SS_{\text{reg}} = S_{xy}^2/S_{xx}$ and $SS_{\text{tot}} = S_{yy}$, so their ratio is $S_{xy}^2/(S_{xx}S_{yy}) = r^2$`,
          "Because the residuals are always equal to r times x",
          "Because the intercept equals the correlation"
        ],
        answer: 1,
        explanation: String.raw`The ratio collapses once $SS_{\text{reg}}$ is written as $S_{xy}^2/S_{xx}$, which is the definition of $r^2$ after dividing by $S_{yy}$. The trap is assuming the slope itself equals r; the slope is $r\,s_y/s_x$ and carries units while r does not.`
      },
      {
        question: "A regression is fit without an intercept term. Why can R-squared, computed as 1 - SS_res / SS_tot, come out negative?",
        options: [
          "Because negative slopes always produce negative R-squared",
          "Because a model with no intercept always has a steeper slope than the mean-only baseline",
          "Because the residuals no longer sum to zero, so SS_tot is no longer SS_reg plus SS_res and SS_res can exceed SS_tot",
          "Because R-squared is negative whenever the sample size is odd"
        ],
        answer: 2,
        explanation: "Without an intercept the orthogonality that forces the residuals to sum to zero is lost, so the decomposition SS_tot = SS_reg + SS_res breaks down. SS_res can then exceed SS_tot and push 1 - SS_res/SS_tot below zero. The trap is assuming R-squared is always a squared quantity."
      },
      {
        question: String.raw`Every $y_i$ is multiplied by 10 and the model is refit with the same $x$ values. What happens to R-squared?`,
        options: [
          "It is unchanged",
          "It is multiplied by 10",
          "It is multiplied by 100",
          "It is divided by 10"
        ],
        answer: 0,
        explanation: String.raw`Both $SS_{\text{res}}$ and $SS_{\text{tot}}$ scale by $10^2 = 100$, so their ratio, and therefore R-squared, is unchanged. The trap is treating R-squared as a quantity with the units of y.`
      },
      {
        question: String.raw`If $SS_{\text{res}} = 0.25\,SS_{\text{tot}}$ for a fitted model, what is R-squared?`,
        options: [
          "0.25",
          "0.50",
          "1.25",
          "0.75"
        ],
        answer: 3,
        explanation: String.raw`$R^2 = 1 - SS_{\text{res}}/SS_{\text{tot}} = 1 - 0.25 = 0.75$. The trap is reporting the unexplained fraction 0.25 as R-squared.`
      },
      {
        question: String.raw`A dataset has $n = 20$. A predictor is added so $p$ goes from 1 to 2, and raw $R^2$ rises from 0.700 to 0.705. Using $R^2_{\text{adj}} = 1 - (1-R^2)\frac{n-1}{n-p-1}$, what happens to adjusted R-squared?`,
        options: [
          "It rises, because raw R-squared rose",
          "It falls from about 0.683 to about 0.670",
          "It stays exactly at 0.705",
          "It becomes equal to the correlation between the two predictors"
        ],
        answer: 1,
        explanation: String.raw`Before: $(0.300)(19/18) = 0.3167$, so adjusted $R^2 = 0.6833$. After: $(0.295)(19/17) = 0.3297$, so adjusted $R^2 = 0.6703$. The extra degree of freedom costs more than the small raw gain. The trap is trusting the unadjusted rise.`
      }
    ]
  },
  37: {
    derivation: {
      headline: "The OLS line from minimizing the sum of squared vertical residuals",
      axioms: [
        String.raw`The model is $y_i = \beta_0 + \beta_1 x_i + \epsilon_i$ with the $x_i$ treated as known, $E[\epsilon_i] = 0$, and the vertical deviation $e_i = y_i - \hat{y}_i$ is the error the fit is judged by.`,
        String.raw`For candidate intercept and slope $(b_0, b_1)$, the criterion is $S(b_0, b_1) = \sum_{i=1}^n (y_i - b_0 - b_1 x_i)^2$, to be minimized over all real pairs.`,
        String.raw`Not all $x_i$ are equal, so $S_{xx} = \sum_i (x_i - \bar{x})^2 > 0$, and the calculus rule for a differentiable sum applies to $S$.`
      ],
      steps: [
        {
          title: "Set the partial derivatives to zero",
          body: String.raw`$\partial S/\partial b_0 = -2\sum_i (y_i - b_0 - b_1 x_i)$ and $\partial S/\partial b_1 = -2\sum_i x_i (y_i - b_0 - b_1 x_i)$. At the minimum, with $e_i = y_i - b_0 - b_1 x_i$, these give the normal equations $\sum_i e_i = 0$ and $\sum_i x_i e_i = 0$.`
        },
        {
          title: "Solve the intercept equation for b0",
          body: String.raw`The first normal equation is $n b_0 + b_1 \sum_i x_i = \sum_i y_i$. Dividing by $n$ gives $\bar{y} = b_0 + b_1 \bar{x}$, so $b_0 = \bar{y} - b_1\bar{x}$. The fitted line therefore passes through the centroid $(\bar{x}, \bar{y})$ for any slope.`
        },
        {
          title: "Substitute into the slope equation",
          body: String.raw`Replacing $b_0$ in $\sum_i x_i (y_i - b_0 - b_1 x_i) = 0$ gives $\sum_i x_i\big[(y_i - \bar{y}) - b_1(x_i - \bar{x})\big] = 0$. Since $\sum_i x_i(y_i - \bar{y}) = \sum_i (x_i - \bar{x})(y_i - \bar{y})$ and $\sum_i x_i(x_i - \bar{x}) = S_{xx}$, we get $b_1 = S_{xy}/S_{xx}$.`
        },
        {
          title: "Confirm the critical point is a global minimum",
          body: String.raw`The Hessian of $S$ is $2\begin{pmatrix} n & \sum x_i \\ \sum x_i & \sum x_i^2 \end{pmatrix}$, with determinant $4(n\sum x_i^2 - (\sum x_i)^2) = 4nS_{xx} > 0$ and positive diagonal entries. So $S$ is strictly convex, and the unique stationary point is the global minimum.`
        },
        {
          title: "Read off the meaning of the slope",
          body: String.raw`Because $S_{xy}/S_{xx} = r\,s_y/s_x$, the slope is the correlation rescaled by the ratio of the standard deviations. Its units are units of y per unit of x, and the line passes through the means, which is why the residuals have zero sum and zero covariance with x.`
        }
      ],
      result: String.raw`$\hat\beta_1 = \dfrac{S_{xy}}{S_{xx}} = \dfrac{\sum_i (x_i - \bar{x})(y_i - \bar{y})}{\sum_i (x_i - \bar{x})^2}$ and $\hat\beta_0 = \bar{y} - \hat\beta_1 \bar{x}$ minimize the sum of squared vertical residuals.`,
      assumptionsBreak: "If x is measured with error, minimizing vertical residuals pulls the estimated slope toward zero, which is regression dilution, so the fitted line is biased for the true relation. If the conditional mean is curved, the line is only the best linear approximation, and orthogonal or total least squares are appropriate only when both variables carry comparable error."
    },
    quiz: [
      {
        question: String.raw`Setting the partial derivative with respect to $b_0$ to zero forces $\sum_i e_i = 0$. What does this force about the fitted line?`,
        options: [
          "It must pass through the origin (0, 0)",
          String.raw`It must pass through the centroid $(\bar{x}, \bar{y})$, since $\sum_i e_i = 0$ rearranges to $\bar{y} = b_0 + b_1 \bar{x}$`,
          "It must have slope exactly 1",
          "It must cross every data point"
        ],
        answer: 1,
        explanation: String.raw`The intercept condition $\sum_i e_i = 0$ rearranges to $\bar{y} = b_0 + b_1\bar{x}$. The trap is assuming the line passes through the origin because the intercept is the starting value of a line.`
      },
      {
        question: String.raw`If every $x_i$ is centered as $x_i - \bar{x}$ before fitting, what happens to the least squares estimates?`,
        options: [
          "Both the slope and the intercept become zero",
          "The intercept becomes zero and the slope changes",
          String.raw`The slope is unchanged and the new intercept equals $\bar{y}$`,
          "The slope doubles and the intercept is unchanged"
        ],
        answer: 2,
        explanation: String.raw`Shifting x changes the location of the origin but not $S_{xy}$ or $S_{xx}$, so the slope is unchanged. With $\bar{x} = 0$ the formula $b_0 = \bar{y} - b_1\bar{x}$ gives $b_0 = \bar{y}$. The trap is thinking any change of x alters the slope.`
      },
      {
        question: "Why does OLS have a unique solution when the x values differ, but fail when every x_i is equal?",
        options: [
          "When all x_i are equal, the columns of the design matrix [1, x] are linearly dependent, so only b0 + b1*c is identified",
          "When all x_i are equal, every residual is negative",
          "When all x_i are equal, the slope is forced to equal the correlation",
          "When all x_i are equal, the sample size effectively becomes zero"
        ],
        answer: 0,
        explanation: "With constant x equal to c, the second design column is a multiple of the intercept column, so X'X is singular and infinitely many (b0, b1) pairs give the same fitted values. Only the combination b0 + b1*c is determined. The trap is blaming the response y instead of the predictor."
      },
      {
        question: String.raw`For simple regression, the minimized residual sum of squares equals $S_{yy} - S_{xy}^2/S_{xx}$. Why can this value never exceed $S_{yy}$?`,
        options: [
          String.raw`Because $S_{xx}$ is always at least 1`,
          String.raw`Because the slope is always between 0 and 1`,
          "Because residuals are squared, so they can never be larger than the data",
          String.raw`Because $S_{xy}^2/S_{xx} \ge 0$, so subtracting it from $S_{yy}$ cannot increase the value`
        ],
        answer: 3,
        explanation: String.raw`$S_{xy}^2/S_{xx}$ is a square over a positive number, so it is nonnegative and subtracting it can only shrink $S_{yy}$. The flat line $b_1 = 0$ is one candidate with error $S_{yy}$, so the minimum cannot be larger. The trap is assuming the fitted line must beat an arbitrary line without checking the flat baseline.`
      },
      {
        question: "Which statement about the OLS fit is always true when an intercept is included?",
        options: [
          "The fitted values are identical to the observed values",
          "The residuals are orthogonal to the fitted values, so the sum of yhat_i times e_i equals zero",
          "The residuals are normally distributed",
          "The sum of the fitted values equals n times the slope"
        ],
        answer: 1,
        explanation: "The normal equations force the residual vector to be orthogonal to the column space of X, which contains the fitted values, so their dot product is zero. Normality is an extra assumption about the errors, not a consequence of least squares. The trap is confusing a geometric property with a distributional assumption."
      }
    ]
  },
  38: {
    derivation: {
      headline: "Profiling out the intercept turns the least squares loss into a parabola in the slope",
      axioms: [
        String.raw`The data are $n$ pairs $(x_i, y_i)$ with means $\bar{x}$ and $\bar{y}$, and centered sums $S_{xx} = \sum_i (x_i - \bar{x})^2 > 0$, $S_{xy} = \sum_i (x_i - \bar{x})(y_i - \bar{y})$, and $S_{yy} = \sum_i (y_i - \bar{y})^2$.`,
        String.raw`The line is $y = b_0 + b_1 x$ and the loss is the residual sum of squares $J(b_0, b_1) = \sum_i (y_i - b_0 - b_1 x_i)^2$.`,
        String.raw`Centered deviations sum to zero, so $\sum_i (y_i - \bar{y}) = 0$ and $\sum_i (x_i - \bar{x}) = 0$.`
      ],
      steps: [
        {
          title: "Re-center the residual around the means",
          body: String.raw`Let $c = \bar{y} - b_0 - b_1\bar{x}$ and $u_i = (y_i - \bar{y}) - b_1(x_i - \bar{x})$. Then $y_i - b_0 - b_1 x_i = u_i + c$, so $J = \sum_i u_i^2 + 2c\sum_i u_i + nc^2$. The middle sum is zero because both centered sums vanish.`
        },
        {
          title: "Expand the centered loss",
          body: String.raw`Expanding $\sum_i u_i^2 = \sum_i (y_i - \bar{y})^2 - 2b_1\sum_i (x_i - \bar{x})(y_i - \bar{y}) + b_1^2\sum_i (x_i - \bar{x})^2$ gives $J = S_{yy} - 2b_1 S_{xy} + b_1^2 S_{xx} + nc^2$. The intercept appears only through the term $nc^2 \ge 0$.`
        },
        {
          title: "Profile out the intercept",
          body: String.raw`The term $nc^2$ is zero exactly when $b_0 = \bar{y} - b_1\bar{x}$, and that choice is available for every slope. So the best intercept for a given slope removes $nc^2$, leaving the profile loss $J(b_1) = S_{yy} - 2b_1 S_{xy} + b_1^2 S_{xx}$, a function of the slope alone.`
        },
        {
          title: "Complete the square",
          body: String.raw`Write $b_1^2 S_{xx} - 2b_1 S_{xy} = S_{xx}\left(b_1 - \frac{S_{xy}}{S_{xx}}\right)^2 - \frac{S_{xy}^2}{S_{xx}}$, so $J(b_1) = \left(S_{yy} - \frac{S_{xy}^2}{S_{xx}}\right) + S_{xx}\left(b_1 - \frac{S_{xy}}{S_{xx}}\right)^2$. Since $S_{xx} > 0$, the second term is nonnegative and vanishes only at $b_1 = S_{xy}/S_{xx}$.`
        },
        {
          title: "Identify the bowl and its bottom",
          body: String.raw`The profile loss is a parabola in $b_1$ with curvature $S_{xx}$, so it has a unique minimum at $\hat b_1 = S_{xy}/S_{xx}$. Its minimum value is $S_{yy} - S_{xy}^2/S_{xx} = S_{yy}(1 - r^2)$, because $r^2 = S_{xy}^2/(S_{xx}S_{yy})$. More spread in x makes the bowl steeper, so the slope is pinned down more tightly.`
        }
      ],
      result: String.raw`$\hat b_1 = S_{xy}/S_{xx}$, $\hat b_0 = \bar{y} - \hat b_1\bar{x}$, and the minimum residual sum of squares is $S_{yy}(1 - r^2)$.`,
      assumptionsBreak: "If all x values are identical, S_xx = 0, the parabola degenerates into a flat line, and the slope is not identified. Outliers add large squared deviations that can dominate the bowl's shape, so the minimum is pulled toward them."
    },
    quiz: [
      {
        question: String.raw`When the intercept offset $c$ is combined with centered deviations, the cross term $2c\sum_i u_i$ appears. Why does it vanish for any choice of $b_0$ and $b_1$?`,
        options: [
          "Because c is always zero at the optimum",
          "Because x_i and y_i are both centered at zero",
          String.raw`Because $\sum_i (y_i - \bar{y}) = 0$ and $\sum_i (x_i - \bar{x}) = 0$, so the bracketed sum is zero whatever the slope`,
          "Because the cross term is multiplied by n and then divided by n"
        ],
        answer: 2,
        explanation: String.raw`The sum $\sum_i u_i$ is built from centered deviations, which always sum to zero, so the cross term vanishes for every $b_0$ and $b_1$. The trap is thinking the cross term vanishes only at the optimum, which would make the argument circular.`
      },
      {
        question: "If every x_i is doubled, what happens to the least squares slope?",
        options: [
          "It doubles",
          "It halves",
          "It stays the same",
          "It quadruples"
        ],
        answer: 1,
        explanation: String.raw`The new $S_{xy}$ is $2S_{xy}$ and the new $S_{xx}$ is $4S_{xx}$, so the slope becomes $2S_{xy}/(4S_{xx})$, which is half the original. The trap is forgetting that the denominator scales with the square of the change in x.`
      },
      {
        question: "If every y_i is multiplied by 3, what happens to the OLS slope and to the minimum residual sum of squares?",
        options: [
          "The slope triples and the minimum SSR is multiplied by 9",
          "The slope is unchanged and the minimum SSR is multiplied by 3",
          "The slope is divided by 3 and the minimum SSR is unchanged",
          "The slope triples and the minimum SSR is unchanged"
        ],
        answer: 0,
        explanation: String.raw`$S_{xy}$ triples, so the slope triples, and the residuals triple, so the sum of their squares scales by $3^2 = 9$. The trap is treating the residual sum of squares as linear in the scale of y.`
      },
      {
        question: "Which expression gives the minimum residual sum of squares of the least squares line in terms of R-squared?",
        options: [
          "S_yy * R^2",
          "S_xx * (1 - R^2)",
          "S_yy * (1 + R^2)",
          String.raw`$S_{yy}(1 - R^2)$`
        ],
        answer: 3,
        explanation: String.raw`The minimum equals $S_{yy} - S_{xy}^2/S_{xx} = S_{yy} - r^2 S_{yy} = S_{yy}(1 - R^2)$. The trap is confusing the explained share $R^2$ with the unexplained share $1 - R^2$.`
      },
      {
        question: String.raw`Suppose every $x_i$ is equal, so $S_{xx} = 0$ and $S_{xy} = 0$. What does the profiled loss $J(b_1) = S_{yy} - 2b_1 S_{xy} + b_1^2 S_{xx}$ look like?`,
        options: [
          "It is a parabola with a unique minimum at b_1 = 0",
          "It is constant in b_1, so the slope is not identified",
          "It is a downward-opening parabola with no minimum",
          "It becomes negative for every slope"
        ],
        answer: 1,
        explanation: String.raw`When $S_{xx} = 0$ both the linear and quadratic terms in $b_1$ vanish, so every slope gives the same loss $S_{yy}$. The trap is expecting a parabola to always have a unique minimum regardless of the data.`
      }
    ]
  },
  39: {
    derivation: {
      headline: "Each Loess value is a weighted local regression evaluated at the query point",
      axioms: [
        String.raw`Near a target point $x_0$, the regression function is approximated by a first-order Taylor expansion $f(x) \approx \beta_0 + \beta_1 (x - x_0)$, with $\beta_0 = f(x_0)$ and $\beta_1 = f'(x_0)$.`,
        String.raw`The weights are $w_i = W(|x_i - x_0|/\Delta)$, where $W(u) = (1 - |u|^3)^3$ for $|u| < 1$, $W(u) = 0$ otherwise, and $\Delta$ is the distance from $x_0$ to its $k$-th nearest neighbor.`,
        String.raw`The local estimate is the weighted least squares minimizer of $\sum_i w_i\big(y_i - \beta_0 - \beta_1 d_i\big)^2$, where $d_i = x_i - x_0$.`
      ],
      steps: [
        {
          title: "Read the fitted curve off the intercept",
          body: String.raw`Under the local model, the prediction at $x = x_0$ is $\beta_0$ regardless of $\beta_1$, because $d = 0$ there. So the Loess estimate at $x_0$ is $\hat f(x_0) = \hat\beta_0$, and the fit is rebuilt at every query point.`
        },
        {
          title: "Write the weighted normal equations",
          body: String.raw`Set $S_0 = \sum_i w_i$, $S_1 = \sum_i w_i d_i$, $S_2 = \sum_i w_i d_i^2$, $T_0 = \sum_i w_i y_i$, and $T_1 = \sum_i w_i d_i y_i$. Setting the derivatives of the weighted loss to zero gives $S_0\beta_0 + S_1\beta_1 = T_0$ and $S_1\beta_0 + S_2\beta_1 = T_1$.`
        },
        {
          title: "Solve the 2 by 2 system",
          body: String.raw`Solving by elimination gives $\hat\beta_0 = \dfrac{S_2 T_0 - S_1 T_1}{S_0 S_2 - S_1^2}$. This is a fixed linear combination of the $y_i$ with coefficients that depend only on the $x_i$, $x_0$, and the weights. With a degree-zero local model, the same algebra gives the weighted average $T_0/S_0$.`
        },
        {
          title: "Show why the tricube kernel gives smooth changes",
          body: String.raw`The tricube has $W(0) = 1$ and $W(1) = 0$. Its derivative for $0 < u < 1$ is $W'(u) = -9u^2(1-u^3)^2$, which also vanishes at $u = 1$. So a point entering or leaving the window changes the weights continuously, and the fitted curve moves smoothly as the query point slides along the data.`
        },
        {
          title: "Connect the span to bandwidth and bias",
          body: String.raw`The span $f$ sets $k = \lfloor fn \rfloor$ neighbors and so sets the bandwidth $\Delta$. A larger $\Delta$ includes more points, which lowers the variance of $\hat\beta_0$ but makes the first-order Taylor approximation worse on curved stretches, so the bias grows with the window.`
        }
      ],
      result: String.raw`$\hat f(x_0) = \hat\beta_0(x_0) = \sum_i \ell_i(x_0)\, y_i$ with $\ell_i(x_0) = \dfrac{w_i\,(S_2 - S_1 d_i)}{S_0 S_2 - S_1^2}$, so the non-robust Loess curve is a linear smoother in $y$.`,
      assumptionsBreak: "Loess assumes that a low-degree polynomial describes the curve within each window and that the noise is roughly symmetric. Sharp peaks and corners get rounded, and sparse regions give unstable local fits. Robustness iterations protect against a minority of outliers, but they make the smoother depend on y and therefore nonlinear."
    },
    quiz: [
      {
        question: String.raw`In a local linear fit at $x_0$, the regressors are centered as $d_i = x_i - x_0$. Why does the intercept $\beta_0$ equal the fitted curve value at $x_0$?`,
        options: [
          "Because beta0 is always the average of all y values",
          "Because the slope is zero by construction",
          String.raw`Because at $x = x_0$ we have $d = 0$, so the local line's height there is $\beta_0$`,
          "Because the tricube weight at x0 is zero"
        ],
        answer: 2,
        explanation: String.raw`The local model is $\beta_0 + \beta_1(x - x_0)$, so at $x = x_0$ the prediction is $\beta_0$ whatever the slope. The trap is confusing the local intercept with a global intercept for the whole dataset.`
      },
      {
        question: String.raw`What is the tricube weight $W(u)$ for a point exactly at the bandwidth edge, $|u| = 1$, and why does that matter?`,
        options: [
          "1, so boundary points get full weight",
          "0, so points leaving the window drop out without jumps",
          "0.5, so boundary points get half weight",
          "Undefined, because the weight would divide by zero"
        ],
        answer: 1,
        explanation: String.raw`$W(1) = (1 - 1)^3 = 0$, and its derivative also vanishes there, so the fitted curve changes smoothly as points enter and leave the window. The trap is thinking the kernel must be a hard indicator that switches on and off.`
      },
      {
        question: "If the local model is only a constant (degree zero), what does the Loess estimate reduce to?",
        options: [
          "The unweighted global mean of y",
          "A tricube-weighted average of the nearby y values, sum of w_i y_i divided by sum of w_i",
          "The median of the nearest neighbor x values",
          "The largest y value in the window"
        ],
        answer: 1,
        explanation: String.raw`With only an intercept, the weighted least squares minimizer is the weighted mean $\sum_i w_i y_i/\sum_i w_i$, which is a kernel smoother. The trap is thinking local smoothing always needs a slope term to work.`
      },
      {
        question: "Is the non-robust Loess estimate at a point x0 linear in the response values y?",
        options: [
          "No, because the tricube weights depend on the values of y",
          "No, because the weights are squared",
          "Yes, but only when the span equals 1",
          String.raw`Yes, because $\hat f(x_0) = \sum_i \ell_i(x_0) y_i$ with weights $\ell_i$ that depend only on the $x$ positions and the span`
        ],
        answer: 3,
        explanation: String.raw`The weights depend on the x locations and the span, not on y, so the estimate is a fixed linear combination of the responses. Robustness iterations add y-dependent weights and make the procedure nonlinear. The trap is assuming every smoother that bends is nonlinear in y.`
      },
      {
        question: String.raw`For a local linear fit, the bias from curvature scales with the square of the bandwidth $\Delta$. If the bandwidth doubles, roughly how does this bias change?`,
        options: [
          "It quadruples",
          "It doubles",
          "It halves",
          "It stays the same"
        ],
        answer: 0,
        explanation: String.raw`The first-order Taylor error is proportional to $f''(x)\,\Delta^2$, so doubling $\Delta$ multiplies the error by four for the same curvature. The trap is assuming bias grows linearly with the window size.`
      }
    ]
  },
  40: {
    derivation: {
      headline: "Sampling variance of the slope and the t-test built from the linear estimator",
      axioms: [
        String.raw`The model is $y_i = \beta_0 + \beta_1 x_i + \epsilon_i$ with the $x_i$ fixed, $E[\epsilon_i] = 0$, $\text{Var}(\epsilon_i) = \sigma^2$, and the errors uncorrelated across observations.`,
        String.raw`The OLS slope is $\hat\beta_1 = S_{xy}/S_{xx}$, where $S_{xx} = \sum_i (x_i - \bar{x})^2 > 0$ and $S_{xy} = \sum_i (x_i - \bar{x})(y_i - \bar{y})$.`,
        String.raw`The residual variance estimator $s^2 = SSE/(n-2)$ satisfies $E[s^2] = \sigma^2$, a standard result for the two-parameter simple regression.`
      ],
      steps: [
        {
          title: "Write the slope as a weighted sum of responses",
          body: String.raw`Because $\sum_i (x_i - \bar{x}) = 0$, we have $S_{xy} = \sum_i (x_i - \bar{x}) y_i$, so $\hat\beta_1 = \sum_i c_i y_i$ with weights $c_i = (x_i - \bar{x})/S_{xx}$. The estimator is a fixed linear combination of the responses, which makes its mean and variance computable.`
        },
        {
          title: "Check unbiasedness with two weight identities",
          body: String.raw`The weights satisfy $\sum_i c_i = 0$ and $\sum_i c_i x_i = \sum_i (x_i - \bar{x})x_i/S_{xx} = S_{xx}/S_{xx} = 1$. Therefore $E[\hat\beta_1] = \sum_i c_i(\beta_0 + \beta_1 x_i) = \beta_0 \cdot 0 + \beta_1 \cdot 1 = \beta_1$, so the intercept drops out and the slope estimator is unbiased.`
        },
        {
          title: "Derive the sampling variance",
          body: String.raw`With uncorrelated errors of variance $\sigma^2$, $\text{Var}(\hat\beta_1) = \sigma^2\sum_i c_i^2 = \frac{\sigma^2}{S_{xx}^2}\sum_i (x_i - \bar{x})^2 = \frac{\sigma^2}{S_{xx}}$. Wider spread in the predictor shrinks the sampling variance of the slope.`
        },
        {
          title: "Build the t-statistic",
          body: String.raw`Replacing $\sigma^2$ by $s^2$ gives $\text{SE}(\hat\beta_1) = s/\sqrt{S_{xx}}$. Under normal errors, $Z = (\hat\beta_1 - \beta_1)\sqrt{S_{xx}}/\sigma$ is standard normal and $V = (n-2)s^2/\sigma^2$ is an independent chi-square with $n-2$ degrees of freedom, so $t = Z/\sqrt{V/(n-2)} \sim t_{n-2}$.`
        },
        {
          title: "Separate the mean response from a new observation",
          body: String.raw`For a point at $x_0$, the fitted mean has $\text{Var}(\hat y_0) = \sigma^2\left(\frac{1}{n} + \frac{(x_0-\bar{x})^2}{S_{xx}}\right)$, because $\bar{y}$ and $\hat\beta_1$ are uncorrelated when $\sum_i c_i = 0$. A new response adds an independent error $\epsilon_0$, so the prediction error has variance $\sigma^2\left(1 + \frac{1}{n} + \frac{(x_0-\bar{x})^2}{S_{xx}}\right)$, which is why prediction intervals are wider.`
        }
      ],
      result: String.raw`$\text{Var}(\hat\beta_1) = \sigma^2/S_{xx}$, $\text{SE}(\hat\beta_1) = s/\sqrt{S_{xx}}$, and $t = \hat\beta_1/\text{SE}(\hat\beta_1) \sim t_{n-2}$ under $H_0: \beta_1 = 0$.`,
      assumptionsBreak: "If the error variance changes with x or errors are correlated, as in many time series, the formula sigma squared over S_xx is wrong, and so are the t reference distribution and the intervals. Heavy tails in small samples also undermine the normal-based reasoning, so robust or bootstrap standard errors are safer."
    },
    quiz: [
      {
        question: String.raw`Why is the OLS slope an unbiased estimator of $\beta_1$ under the model $E[\epsilon_i] = 0$?`,
        options: [
          "Because the errors have variance 1",
          String.raw`Because the weights $c_i = (x_i - \bar{x})/S_{xx}$ satisfy $\sum_i c_i = 0$ and $\sum_i c_i x_i = 1$, so $E[\hat\beta_1] = \beta_1$`,
          "Because the estimator is the median of the pairwise slopes",
          "Because the law of large numbers applies only when n is large"
        ],
        answer: 1,
        explanation: String.raw`Writing $\hat\beta_1$ as a weighted sum of $y_i$ and applying $E[y_i] = \beta_0 + \beta_1 x_i$, the two weight identities remove the intercept and leave $\beta_1$. The trap is thinking unbiasedness requires a large sample.`
      },
      {
        question: String.raw`Holding $\sigma$ fixed, what happens to $\text{SE}(\hat\beta_1)$ when the spread of $x$ increases so that $S_{xx}$ grows?`,
        options: [
          "It increases in proportion to S_xx",
          "It is unchanged, since only the residuals matter",
          String.raw`It decreases in proportion to $1/\sqrt{S_{xx}}$`,
          "It doubles whenever S_xx doubles"
        ],
        answer: 2,
        explanation: String.raw`$\text{Var}(\hat\beta_1) = \sigma^2/S_{xx}$, so $\text{SE} = \sigma/\sqrt{S_{xx}}$ shrinks as the predictor spreads out. The trap is assuming more spread in x inflates the uncertainty.`
      },
      {
        question: "Why is the prediction interval for a new observation at x0 wider than the confidence interval for the mean response at x0?",
        options: [
          "Because prediction intervals use the t distribution and confidence intervals use the normal",
          "Because the prediction interval is computed from a larger sample",
          "Because the prediction interval ignores the uncertainty in the slope",
          String.raw`Because a new observation adds its own error variance, so the prediction variance is $\sigma^2[1 + 1/n + (x_0-\bar{x})^2/S_{xx}]$`
        ],
        answer: 3,
        explanation: String.raw`The variance of the fitted mean is $\sigma^2[1/n + (x_0-\bar{x})^2/S_{xx}]$, and a new observation adds the irreducible $\sigma^2$. The trap is treating the extra width as a sample-size effect.`
      },
      {
        question: "Why is the t distribution with n - 2 degrees of freedom used for the slope test instead of the normal distribution?",
        options: [
          "Because sigma is unknown and is estimated by s with n - 2 degrees of freedom, and a normal divided by the square root of a scaled chi-square gives a t",
          "Because the regression has only n - 2 observations",
          "Because the slope estimator takes only discrete values",
          "Because the t distribution always has the same variance as the normal"
        ],
        answer: 0,
        explanation: String.raw`Replacing $\sigma$ by $s$ adds randomness, and the ratio of a standard normal to the square root of an independent chi-square over its degrees of freedom is a t variable. The trap is applying the normal table to a variance estimated from a small sample.`
      },
      {
        question: String.raw`Suppose the error variance grows with $x$, for example $\text{Var}(\epsilon_i) = c\,x_i^2$. What is the consequence for the textbook standard error $s/\sqrt{S_{xx}}$?`,
        options: [
          "Nothing changes, because the formula only needs n",
          "It becomes exactly zero",
          "It can mislead, because it assumes constant error variance, so the t-test and interval may be wrong",
          "It becomes the square of the slope"
        ],
        answer: 2,
        explanation: "The textbook standard error comes from one common sigma squared, so with nonconstant variance the true sampling variance differs and p-values and intervals can be wrong. Robust (sandwich) standard errors address this. The trap is trusting default output when a diagnostic assumption is violated."
      }
    ]
  },
  41: {
    derivation: {
      headline: "Why summary(lm) prints residual error, t values, and an F-statistic from one projection",
      axioms: [
        String.raw`The model is $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$, where $\mathbf{X}$ is $n \times (p+1)$ with a column of ones, has full column rank, and $\boldsymbol{\epsilon} \sim N(\mathbf{0}, \sigma^2\mathbf{I}_n)$.`,
        String.raw`The hat matrix $\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ is symmetric and idempotent, $\mathbf{H}^2 = \mathbf{H}$, and $\mathbf{H}\mathbf{X} = \mathbf{X}$.`,
        String.raw`The total sum of squares splits as $SS_{\text{tot}} = SS_{\text{reg}} + SS_{\text{res}}$, with $SS_{\text{reg}} = \sum_i (\hat y_i - \bar y)^2$, a result proved in the R-squared derivation.`
      ],
      steps: [
        {
          title: "Show that the residual variance estimate is unbiased",
          body: String.raw`Since $\mathbf{H}\mathbf{X} = \mathbf{X}$, the residuals are $\mathbf{e} = (\mathbf{I} - \mathbf{H})\mathbf{y} = (\mathbf{I} - \mathbf{H})\boldsymbol{\epsilon}$. For a symmetric idempotent matrix, $E[\mathbf{e}^T\mathbf{e}] = \sigma^2\operatorname{tr}(\mathbf{I} - \mathbf{H})$, and $\operatorname{tr}(\mathbf{H}) = \operatorname{tr}\big((\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{X}\big) = p+1$. So $E[SS_{\text{res}}] = (n-p-1)\sigma^2$, which justifies $s_e^2 = SS_{\text{res}}/(n-p-1)$.`
        },
        {
          title: "Derive the coefficient standard errors",
          body: String.raw`Because $\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ is linear in $\boldsymbol\epsilon$, its covariance is $\sigma^2(\mathbf{X}^T\mathbf{X})^{-1}$. Replacing $\sigma^2$ by $s_e^2$ gives $\text{SE}(\hat\beta_j) = s_e\sqrt{[(\mathbf{X}^T\mathbf{X})^{-1}]_{jj}}$, and the printed t value is $\hat\beta_j/\text{SE}(\hat\beta_j)$.`
        },
        {
          title: "Build the overall F-statistic from two sums of squares",
          body: String.raw`Under $H_0: \beta_1 = \cdots = \beta_p = 0$, $SS_{\text{reg}}/\sigma^2 \sim \chi^2_p$ and $SS_{\text{res}}/\sigma^2 \sim \chi^2_{n-p-1}$, and the two are independent because they come from orthogonal projections onto complementary subspaces. Their ratio of mean squares is $F = \frac{SS_{\text{reg}}/p}{SS_{\text{res}}/(n-p-1)} \sim F_{p,\,n-p-1}$.`
        },
        {
          title: "Rewrite F in terms of R-squared",
          body: String.raw`Since $SS_{\text{reg}} = R^2 SS_{\text{tot}}$ and $SS_{\text{res}} = (1-R^2)SS_{\text{tot}}$, the factor $SS_{\text{tot}}$ cancels and $F = \frac{R^2}{1-R^2}\cdot\frac{n-p-1}{p}$. For example, $n = 12$, $p = 2$, and $R^2 = 0.2$ give $F = 0.25 \times 4.5 = 1.125$ on 2 and 9 degrees of freedom.`
        },
        {
          title: "Recover adjusted R-squared from the same mean squares",
          body: String.raw`Dividing each sum of squares by its degrees of freedom gives $s_e^2$ and $SS_{\text{tot}}/(n-1)$. Their ratio yields $R^2_{\text{adj}} = 1 - \frac{s_e^2}{SS_{\text{tot}}/(n-1)} = 1 - (1-R^2)\frac{n-1}{n-p-1}$, so each added parameter shrinks the denominator and is penalized.`
        }
      ],
      result: String.raw`$F = \frac{R^2}{1-R^2}\cdot\frac{n-p-1}{p}$ under the null, and each coefficient has $t_j = \hat\beta_j/\text{SE}(\hat\beta_j)$ with $\text{SE}(\hat\beta_j)^2 = s_e^2[(\mathbf{X}^T\mathbf{X})^{-1}]_{jj}$.`,
      assumptionsBreak: "The t and F reference distributions require normal errors with constant variance and a correctly specified mean. Under heteroscedasticity, heavy tails, or a missing predictor, the printed standard errors and p-values can be wrong even though the summary table looks precise."
    },
    quiz: [
      {
        question: String.raw`Why does the residual standard error in summary(lm) divide $SS_{\text{res}}$ by $n - p - 1$ rather than by $n$?`,
        options: [
          String.raw`Because the $p+1$ estimated coefficients use up degrees of freedom, and $E[SS_{\text{res}}] = (n-p-1)\sigma^2$`,
          "Because the residuals must be divided by the number of predictors",
          "Because the residuals always have mean n",
          "Because SS_res is always an integer"
        ],
        answer: 0,
        explanation: String.raw`$E[SS_{\text{res}}] = (n-p-1)\sigma^2$, so dividing by $n-p-1$ gives an unbiased estimate of $\sigma^2$. The trap is dividing by n, which systematically underestimates the error variance.`
      },
      {
        question: "A model with p = 2 predictors and n = 12 observations has R^2 = 0.2. What overall F-statistic does summary report?",
        options: [
          "0.25",
          "1.125",
          "2.25",
          "9.0"
        ],
        answer: 1,
        explanation: String.raw`$F = \frac{R^2}{1-R^2}\cdot\frac{n-p-1}{p} = 0.25 \times 9/2 = 1.125$ on 2 and 9 degrees of freedom. The trap is dropping the division by p, which gives 2.25.`
      },
      {
        question: "For a model with p slopes plus an intercept fit to n observations, what are the numerator and denominator degrees of freedom of the overall F-test?",
        options: [
          "Numerator n - 1, denominator p",
          "Numerator p + 1, denominator n",
          String.raw`Numerator $p$, denominator $n - p - 1$`,
          "Numerator p, denominator n - 1"
        ],
        answer: 2,
        explanation: String.raw`The regression sum of squares has $p$ degrees of freedom under the null, and the residual sum of squares has $n-p-1$. The trap is using $n-1$ for the denominator, which belongs to the total variance.`
      },
      {
        question: "Holding R^2 fixed at 0.60, what happens to adjusted R^2 as the number of predictors p increases?",
        options: [
          "It increases, because more predictors explain more variance",
          "It stays exactly at 0.60",
          "It becomes exactly 1 minus the p-value",
          String.raw`It decreases, because the factor $(n-1)/(n-p-1)$ grows with $p$`
        ],
        answer: 3,
        explanation: String.raw`Adjusted $R^2 = 1 - (1-R^2)\frac{n-1}{n-p-1}$, and with $R^2$ fixed the penalty factor grows with $p$, so adjusted R-squared falls. The trap is reading adjusted R-squared as a function of R-squared alone.`
      },
      {
        question: "The overall F-test p-value is 0.03, but no individual slope has a p-value below 0.05. What is the most sensible explanation?",
        options: [
          "The predictors are highly correlated, so each t-test has inflated standard errors while the joint F-test still detects combined signal",
          "The F-test is wrong and should be ignored",
          "The individual p-values were computed with the wrong sign",
          "The residuals must have zero variance"
        ],
        answer: 0,
        explanation: "When predictors share information, each coefficient's standard error inflates, but the F-test asks whether the slopes jointly explain variance. The trap is concluding that one test must be broken when two different hypotheses are being tested."
      }
    ]
  },
  42: {
    derivation: {
      headline: "Each multiple regression coefficient is a slope between residuals after the other predictors are removed",
      axioms: [
        String.raw`The model is $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \boldsymbol\epsilon$ with $\mathbf{X} = [\mathbf{X}_2 \mid \mathbf{x}_1]$, where $\mathbf{X}_2$ holds the intercept and all predictors other than $x_1$.`,
        String.raw`The least squares estimates solve the normal equations $\mathbf{X}^T(\mathbf{y} - \mathbf{X}\boldsymbol\beta) = \mathbf{0}$, and $\mathbf{X}^T\mathbf{X}$ is invertible.`,
        String.raw`The matrix $\mathbf{M} = \mathbf{I} - \mathbf{H}_2$ with $\mathbf{H}_2 = \mathbf{X}_2(\mathbf{X}_2^T\mathbf{X}_2)^{-1}\mathbf{X}_2^T$ is symmetric and idempotent, and $\mathbf{M}\mathbf{X}_2 = \mathbf{0}$.`
      ],
      steps: [
        {
          title: "Split the normal equations into two blocks",
          body: String.raw`Writing the normal equations in blocks gives $\mathbf{X}_2^T(\mathbf{y} - \mathbf{X}_2\mathbf{b}_2 - \mathbf{x}_1 b_1) = \mathbf{0}$ and $\mathbf{x}_1^T(\mathbf{y} - \mathbf{X}_2\mathbf{b}_2 - \mathbf{x}_1 b_1) = 0$. The first block determines the other coefficients for any given $b_1$.`
        },
        {
          title: "Solve the first block for the other coefficients",
          body: String.raw`The first block gives $\mathbf{b}_2 = (\mathbf{X}_2^T\mathbf{X}_2)^{-1}\mathbf{X}_2^T(\mathbf{y} - \mathbf{x}_1 b_1)$. Writing $\mathbf{H}_2 = \mathbf{X}_2(\mathbf{X}_2^T\mathbf{X}_2)^{-1}\mathbf{X}_2^T$, this means $\mathbf{X}_2\mathbf{b}_2 = \mathbf{H}_2(\mathbf{y} - \mathbf{x}_1 b_1)$.`
        },
        {
          title: "Substitute into the second block",
          body: String.raw`Because $(\mathbf{I} - \mathbf{H}_2)(\mathbf{y} - \mathbf{x}_1 b_1) = \mathbf{M}(\mathbf{y} - \mathbf{x}_1 b_1)$, the second block becomes $\mathbf{x}_1^T\mathbf{M}(\mathbf{y} - \mathbf{x}_1 b_1) = 0$. Since $\mathbf{M}$ is symmetric and idempotent, $\mathbf{x}_1^T\mathbf{M}\mathbf{x}_1 = (\mathbf{M}\mathbf{x}_1)^T(\mathbf{M}\mathbf{x}_1)$ and $\mathbf{x}_1^T\mathbf{M}\mathbf{y} = (\mathbf{M}\mathbf{x}_1)^T(\mathbf{M}\mathbf{y})$.`
        },
        {
          title: "Read the coefficient as a slope between residuals",
          body: String.raw`Solving gives $b_1 = \frac{(\mathbf{M}\mathbf{x}_1)^T(\mathbf{M}\mathbf{y})}{(\mathbf{M}\mathbf{x}_1)^T(\mathbf{M}\mathbf{x}_1)}$. The vector $\mathbf{M}\mathbf{y}$ holds the residuals of $y$ after regressing on $\mathbf{X}_2$, and $\mathbf{M}\mathbf{x}_1$ holds the residuals of $x_1$ after the same regression. So $b_1$ is the slope between these two residual vectors, which is the partial effect of $x_1$.`
        },
        {
          title: "Connect the partial effect to the simple slope",
          body: String.raw`For two predictors $y = b_0 + b_1x_1 + b_2x_2 + e$ with $e$ uncorrelated with $x_1$ in the sample, $\text{Cov}(x_1, y)/\text{Var}(x_1) = b_1 + b_2\,\text{Cov}(x_1,x_2)/\text{Var}(x_1)$. The simple slope equals the partial effect plus an omitted-variable term, and that term vanishes only when $x_1$ and $x_2$ are uncorrelated in the sample.`
        }
      ],
      result: String.raw`$\hat b_1 = \dfrac{\mathbf{x}_1^T\mathbf{M}\mathbf{y}}{\mathbf{x}_1^T\mathbf{M}\mathbf{x}_1}$, the slope of the y residuals on the $x_1$ residuals after removing $\mathbf{X}_2$, and $\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ for the full vector.`,
      assumptionsBreak: "The partial reading requires the model to include the confounders that drive both y and x_1. If a confounder is omitted, the omitted-variable term is nonzero, and if x_1 is nearly a linear combination of the other predictors, Mx_1 is near zero and b_1 has a huge variance."
    },
    quiz: [
      {
        question: String.raw`In a regression on $x_1$ and $x_2$, suppose $x_1$ is uncorrelated with $x_2$ in the sample. How does the multiple regression coefficient of $x_1$ compare with the slope from regressing $y$ on $x_1$ alone?`,
        options: [
          String.raw`They are identical, because the omitted-variable term $b_2\,\text{Cov}(x_1,x_2)/\text{Var}(x_1)$ is zero`,
          "The multiple coefficient is always twice as large",
          "The multiple coefficient is always zero",
          "The multiple coefficient equals the correlation between y and x1"
        ],
        answer: 0,
        explanation: String.raw`The simple slope equals $b_1 + b_2\,\text{Cov}(x_1,x_2)/\text{Var}(x_1)$, and the second term vanishes when the predictors are uncorrelated. The trap is assuming that adding a second predictor always changes the first coefficient.`
      },
      {
        question: String.raw`In matrix form, the coefficient of $x_1$ in a model that also includes $x_2$ equals which quantity?`,
        options: [
          "The raw slope of y on x1 with no adjustment",
          "The correlation between x1 and x2 divided by their variances",
          "The slope from regressing the residuals of y on x2 against the residuals of x1 on x2",
          "The inverse of the regression of x2 on x1"
        ],
        answer: 2,
        explanation: String.raw`Using $\mathbf{M}$ to remove $\mathbf{X}_2$ from both $y$ and $x_1$, the coefficient is $\mathbf{x}_1^T\mathbf{M}\mathbf{y}/\mathbf{x}_1^T\mathbf{M}\mathbf{x}_1$, which is a slope between residuals. The trap is treating the coefficient as the raw association instead of the partial one.`
      },
      {
        question: String.raw`The true model is $y = 2 + 3x_1 + 4x_2$. Suppose $x_2$ regressed on $x_1$ has slope $d = 0.5$. What slope does the simple regression of $y$ on $x_1$ alone recover?`,
        options: [
          "3",
          "5",
          "3.5",
          "7"
        ],
        answer: 1,
        explanation: String.raw`The simple slope equals $\beta_1 + \beta_2 d = 3 + 4(0.5) = 5$, which mixes in the effect of $x_2$ because $x_1$ carries part of its information. The trap is reading the simple slope as the partial effect.`
      },
      {
        question: "Why is the least squares formula (X'X)^(-1) X'y well defined only when the columns of X are linearly independent?",
        options: [
          "Because y must have full rank for the inverse to exist",
          "Because the hat matrix must be diagonal",
          "Because X'X must be symmetric, which only holds for square X",
          String.raw`Because if some nonzero $\mathbf{v}$ satisfies $\mathbf{X}\mathbf{v} = \mathbf{0}$, then $\mathbf{X}^T\mathbf{X}\mathbf{v} = \mathbf{0}$, so $\mathbf{X}^T\mathbf{X}$ is singular`
        ],
        answer: 3,
        explanation: String.raw`Full column rank of $\mathbf{X}$ is equivalent to $\mathbf{X}^T\mathbf{X}$ being invertible, and dependent columns create a null vector of $\mathbf{X}^T\mathbf{X}$. The trap is putting the rank condition on the response vector y.`
      },
      {
        question: "What does the residual vector e = y - X beta_hat satisfy with respect to the columns of X?",
        options: [
          "e has the same length as beta_hat",
          "e is always equal to y",
          "X'e = 0, so the residuals are orthogonal to every column of X",
          "X'e = n times the mean residual"
        ],
        answer: 2,
        explanation: "The normal equations are X'(y - X beta_hat) = 0, which is exactly the orthogonality condition on the residuals. The trap is treating residuals as random noise unrelated to the design."
      }
    ]
  },
  43: {
    derivation: {
      headline: "The partial F-test is a ratio of two independent chi-square pieces from nested projections",
      axioms: [
        String.raw`The models are nested: the reduced design $\mathbf{X}_r$ has $p_r$ slopes, the full design $\mathbf{X}_f$ has $p_f = p_r + q$ slopes, and $\text{col}(\mathbf{X}_r) \subseteq \text{col}(\mathbf{X}_f)$.`,
        String.raw`Under $H_0$ the reduced model is correct, so $\mathbf{y} = \mathbf{X}_r\boldsymbol\beta_r + \boldsymbol\epsilon$ with $\boldsymbol\epsilon \sim N(\mathbf{0}, \sigma^2\mathbf{I}_n)$.`,
        String.raw`For full-rank designs, $\mathbf{H}_r$ and $\mathbf{H}_f$ are symmetric idempotent projections with $\operatorname{rank}(\mathbf{H}_r) = p_r+1$ and $\operatorname{rank}(\mathbf{H}_f) = p_f+1$.`
      ],
      steps: [
        {
          title: "Nesting gives a projection difference",
          body: String.raw`Because $\text{col}(\mathbf{X}_r) \subseteq \text{col}(\mathbf{X}_f)$, we have $\mathbf{H}_f\mathbf{H}_r = \mathbf{H}_r\mathbf{H}_f = \mathbf{H}_r$. Hence $\mathbf{P} = \mathbf{H}_f - \mathbf{H}_r$ is symmetric and idempotent, with $\operatorname{rank}(\mathbf{P}) = q$ and $\mathbf{P}\mathbf{X}_r = \mathbf{0}$.`
        },
        {
          title: "Split the reduced residuals into two orthogonal pieces",
          body: String.raw`The reduced residual is $\mathbf{e}_r = (\mathbf{I} - \mathbf{H}_r)\mathbf{y} = (\mathbf{I} - \mathbf{H}_f)\mathbf{y} + \mathbf{P}\mathbf{y}$. Since $\mathbf{H}_f\mathbf{P} = \mathbf{P}$, we get $(\mathbf{I} - \mathbf{H}_f)\mathbf{P} = \mathbf{0}$, so the cross term vanishes and $SSE_r = SSE_f + \mathbf{y}^T\mathbf{P}\mathbf{y}$.`
        },
        {
          title: "Find the null distribution of each piece",
          body: String.raw`Under $H_0$, $\mathbf{P}\mathbf{X}_r = \mathbf{0}$ removes the mean, so $\mathbf{y}^T\mathbf{P}\mathbf{y} = \boldsymbol\epsilon^T\mathbf{P}\boldsymbol\epsilon$. Scaled by $\sigma^2$ this is a quadratic form in standard normal variables with an idempotent matrix of rank $q$, so $SS_{\text{extra}}/\sigma^2 \sim \chi^2_q$. Similarly $SSE_f/\sigma^2 \sim \chi^2_{n-p_f-1}$, and the two are independent because $\mathbf{P}(\mathbf{I} - \mathbf{H}_f) = \mathbf{0}$.`
        },
        {
          title: "Form the F ratio and check it on numbers",
          body: String.raw`Dividing each chi-square by its degrees of freedom and taking the ratio gives $F = \frac{SS_{\text{extra}}/q}{SSE_f/(n-p_f-1)} \sim F_{q,\,n-p_f-1}$, with $\sigma^2$ cancelling. For example, with $SSE_r = 120$, $SSE_f = 85$, $n = 30$, and $q = 1$, we get $F = 35/(85/27) = 945/85 \approx 11.12$ on 1 and 27 degrees of freedom.`
        },
        {
          title: "Rewrite the statistic in R-squared terms",
          body: String.raw`Since $SSE_r = (1-R_r^2)SS_{\text{tot}}$ and $SSE_f = (1-R_f^2)SS_{\text{tot}}$, we have $SS_{\text{extra}} = (R_f^2 - R_r^2)SS_{\text{tot}}$. The $SS_{\text{tot}}$ factor cancels, giving $F = \frac{(R_f^2 - R_r^2)/q}{(1-R_f^2)/(n-p_f-1)}$.`
        }
      ],
      result: String.raw`$F = \frac{(SSE_r - SSE_f)/q}{SSE_f/(n-p_f-1)} \sim F_{q,\,n-p_f-1}$ under $H_0$, which is the comparison printed by anova(reduced, full).`,
      assumptionsBreak: "The chi-square and F results need nested models and normal errors with constant variance. Two non-nested models do not share this projection structure, so the difference of their residual sums is not a chi-square quantity and the resulting F p-value has no valid meaning."
    },
    quiz: [
      {
        question: String.raw`Why does $SSE_r - SSE_f$, divided by $\sigma^2$, follow a chi-square distribution with $q$ degrees of freedom under $H_0$?`,
        options: [
          String.raw`Because $\mathbf{P} = \mathbf{H}_f - \mathbf{H}_r$ is an idempotent projection of rank $q$, so $\mathbf{y}^T\mathbf{P}\mathbf{y}/\sigma^2$ has $q$ degrees of freedom under the null`,
          "Because the difference of any two sums of squares is chi-square",
          "Because the reduced model has exactly q predictors",
          "Because uniform errors produce chi-square statistics by the central limit theorem"
        ],
        answer: 0,
        explanation: String.raw`Under $H_0$ the mean part is annihilated by $\mathbf{P}$, and the remaining quadratic form in normal errors with a rank-$q$ idempotent matrix is chi-square with $q$ degrees of freedom. The trap is assuming any difference of squared quantities is chi-square without checking the projection structure.`
      },
      {
        question: "Using SSE_full = 85, SSE_reduced = 120, n = 30, and a full model with p = 2 predictors, what is the partial F-statistic for adding one predictor?",
        options: [
          "35.00",
          "11.12",
          "3.15 (the MS residual of the full model alone)",
          "0.09"
        ],
        answer: 1,
        explanation: String.raw`$F = \frac{35/1}{85/27} = \frac{945}{85} \approx 11.12$ on 1 and 27 degrees of freedom. The trap is dropping the denominator mean square, which would leave 35.`
      },
      {
        question: String.raw`Why does $SSE_r = SSE_f + SS_{\text{extra}}$ have no cross term?`,
        options: [
          "Because the residuals are always zero",
          "Because the reduced model has no intercept",
          String.raw`Because $\mathbf{H}_f\mathbf{H}_r = \mathbf{H}_r$, so $(\mathbf{I} - \mathbf{H}_f)(\mathbf{H}_f - \mathbf{H}_r) = \mathbf{0}$ and the full residuals are orthogonal to the extra component`,
          "Because SS_extra is defined to equal zero under the alternative"
        ],
        answer: 2,
        explanation: String.raw`The reduced column space sits inside the full one, so the extra fitted component is annihilated by the full residual projection and the cross product is zero. The trap is assuming sums of squares add without an orthogonality argument.`
      },
      {
        question: String.raw`Adding one predictor raises R-squared from 0.60 to 0.61 with $n = 50$, going from $p = 2$ to $p = 3$ predictors. What is the partial F-statistic computed from these R-squared values?`,
        options: [
          "0.0100 (the change in R-squared alone)",
          "2.71",
          "0.39 (the unexplained share alone)",
          "1.18"
        ],
        answer: 3,
        explanation: String.raw`$F = \frac{(0.61 - 0.60)/1}{(1 - 0.61)/46} = \frac{0.46}{0.39} \approx 1.18$. The trap is reading the raw change in R-squared as the test statistic without scaling by the unexplained share and the degrees of freedom.`
      },
      {
        question: "With one predictor added (q = 1), what is the relation between the partial F-statistic for that predictor and its t-statistic in the full model?",
        options: [
          "F = t^2, so the two tests give identical p-values",
          "F = sqrt(t), so F is always smaller",
          "F = t, but with different degrees of freedom",
          "They are unrelated, because F compares SSEs while t compares coefficients"
        ],
        answer: 0,
        explanation: String.raw`With $q = 1$ the numerator is the squared standardized coefficient and the denominator is the same $s^2$ used by the t-test, so $F = t^2$. The trap is treating the F-test and the coefficient t-test as different tests even though they give the same p-value here.`
      }
    ]
  },
  44: {
    derivation: {
      headline: "A dummy-coded one-way model reproduces group means, and its F-test is the pooled t-test squared",
      axioms: [
        String.raw`There are $k$ groups with sizes $n_1, \dots, n_k$, total $N = \sum_g n_g$, observations $y_{gi}$, group means $\bar y_g$, and grand mean $\bar y$.`,
        String.raw`The model is $y_{gi} = \mu_g + \epsilon_{gi}$ written as a regression on group indicators, with independent errors of mean zero and variance $\sigma^2$, normal when exact tests are needed.`,
        String.raw`The within-group sum of squares is $SSW = \sum_{g}\sum_{i}(y_{gi} - \bar y_g)^2$, the between-group sum is $SSB = \sum_g n_g(\bar y_g - \bar y)^2$, and the total is $SST = \sum_{g,i}(y_{gi} - \bar y)^2$.`
      ],
      steps: [
        {
          title: "Identify the column space with group indicators",
          body: String.raw`Dummy coding with a reference group produces columns that span the same space as the $k$ group indicators $\mathbf{I}_1, \dots, \mathbf{I}_k$, as shown in the design-matrix argument. So the fitted vector is the orthogonal projection of $\mathbf{y}$ onto $\operatorname{span}(\mathbf{I}_1, \dots, \mathbf{I}_k)$.`
        },
        {
          title: "Residuals sum to zero within each group",
          body: String.raw`Orthogonality of the residuals to each indicator gives $\sum_{i \in g}(y_{gi} - \hat y_{gi}) = 0$ for every $g$. Any vector in the span is constant within a group, so $\hat y_{gi} = \hat\mu_g$ for all $i$ in group $g$, and $n_g\hat\mu_g = \sum_{i\in g} y_{gi}$. Hence $\hat\mu_g = \bar y_g$.`
        },
        {
          title: "Read the coefficients from the reference group",
          body: String.raw`With group 1 as the reference, $\hat\beta_0 = \hat\mu_1 = \bar y_1$ and $\hat\beta_g = \hat\mu_g - \hat\mu_1 = \bar y_g - \bar y_1$ for $g \ge 2$. Each dummy coefficient is the difference between that group's mean and the baseline mean.`
        },
        {
          title: "Split the total variation into within and between parts",
          body: String.raw`Write $y_{gi} - \bar y = (y_{gi} - \bar y_g) + (\bar y_g - \bar y)$, square, and sum. The cross term $2\sum_g(\bar y_g - \bar y)\sum_{i\in g}(y_{gi} - \bar y_g)$ is zero because each inner sum vanishes, so $SST = SSW + SSB$. Under the dummy model, $SSW$ is the full-model residual sum and $SST$ is the intercept-only residual sum.`
        },
        {
          title: "Form the ANOVA F and reduce it to t squared when k is 2",
          body: String.raw`The partial F-test for the $k-1$ dummies is $F = \frac{SSB/(k-1)}{SSW/(N-k)} = \frac{MSB}{MSW}$. When $k=2$, $SSB = \frac{n_1 n_2}{N}(\bar y_2 - \bar y_1)^2$ and $SSW/(N-2) = s_p^2$, so $F = \frac{(\bar y_2 - \bar y_1)^2}{s_p^2(1/n_1 + 1/n_2)} = t^2$. With control $[10, 12, 14]$ and treatment $[16, 18, 20]$, $SSB = 54$ and $SSW = 16$, so $F = 54/4 = 13.5$ and $t = 3.67$.`
        }
      ],
      result: String.raw`$\hat\beta_0 = \bar y_1$, $\hat\beta_g = \bar y_g - \bar y_1$, and $F = \dfrac{SSB/(k-1)}{SSW/(N-k)}$, which equals $t^2$ for the pooled two-sample test when $k = 2$.`,
      assumptionsBreak: "All of this assumes equal error variance across groups and independent errors, normal for exact tests. With clearly unequal variances and unbalanced group sizes, the pooled F and pooled t are not trustworthy, and Welch-type tests or heteroscedasticity-robust errors are needed."
    },
    quiz: [
      {
        question: "Why does the fitted value for every observation in a group equal that group's sample mean in a dummy-coded one-way model?",
        options: [
          "Because the group indicator columns span the design, so residuals are orthogonal to each indicator and sum to zero within each group",
          "Because the dummy variables are chosen to equal the group means",
          "Because the intercept is always the grand mean of all observations",
          "Because the residuals are forced to equal the observed values"
        ],
        answer: 0,
        explanation: "Orthogonality to each indicator says the residuals within a group sum to zero, and the fitted value is constant within a group, so it must equal the group mean. The trap is treating the group mean as an approximation rather than the exact least squares result."
      },
      {
        question: "In a three-group one-way model with group A as the baseline, what is the coefficient for group C?",
        options: [
          "The mean of group C",
          "The mean of group B minus the mean of group C",
          "The mean of group C minus the mean of group A",
          "The average of all three group means"
        ],
        answer: 2,
        explanation: String.raw`The fitted mean for C is $\beta_0 + \beta_C$ and $\beta_0$ is the mean of A, so $\beta_C = \bar y_C - \bar y_A$. The trap is comparing C to the grand mean instead of the reference group.`
      },
      {
        question: "Using control [10, 12, 14] and treatment [16, 18, 20], the between-group sum of squares is 54 and the within-group sum of squares is 16. What is the ANOVA F-statistic?",
        options: [
          "13.5",
          "3.67",
          "54.0",
          "4.0"
        ],
        answer: 0,
        explanation: String.raw`$F = (SSB/1)/(SSW/4) = 54/4 = 13.5$, which equals $t^2$ with $t = 3.67$. The trap is leaving out the denominator mean square, which would give 54.`
      },
      {
        question: String.raw`Why does $SST = SSB + SSW$ hold in one-way ANOVA?`,
        options: [
          "Because the between-group deviations always equal the within-group deviations",
          "Because the sample size is the same in every group",
          "Because the group means are all equal under the alternative",
          String.raw`Because $y_{gi} - \bar y = (y_{gi} - \bar y_g) + (\bar y_g - \bar y)$, and the cross term sums to zero within each group`
        ],
        answer: 3,
        explanation: String.raw`The cross term is $2\sum_g(\bar y_g - \bar y)\sum_{i\in g}(y_{gi} - \bar y_g)$, and each inner sum is zero. The trap is assuming the decomposition needs equal group sizes.`
      },
      {
        question: "Suppose group 1 has standard deviation 1 and group 2 has standard deviation 10, with very unequal group sizes. What is the main risk of the pooled equal-variance t-test, which is the same as the regression t-test with a dummy?",
        options: [
          "It has no risk, because regression is always robust",
          "Its p-values can be unreliable, so Welch's unequal-variance test is safer",
          "It can only detect differences in variance",
          "Its F-statistic becomes negative"
        ],
        answer: 1,
        explanation: "The pooled variance assumes one common sigma squared. With unequal variances and unbalanced sizes, the statistic does not follow the nominal t distribution. The trap is believing regression with dummy variables removes the equal-variance assumption."
      }
    ]
  },
  45: {
    derivation: {
      headline: "The column space fixes the fitted values, and the coding matrix only reparametrizes the coefficients",
      axioms: [
        String.raw`A linear model with full-rank design $\mathbf{X} \in \mathbb{R}^{n\times p}$ has least squares solution $\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ and fitted values $\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$ with $\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$.`,
        String.raw`The fitted values depend on the design only through its column space $\text{col}(\mathbf{X}) = \{\mathbf{X}\mathbf{b} : \mathbf{b} \in \mathbb{R}^p\}$.`,
        String.raw`Transposes and inverses satisfy $(\mathbf{M}\mathbf{N})^T = \mathbf{N}^T\mathbf{M}^T$ and $(\mathbf{M}\mathbf{N})^{-1} = \mathbf{N}^{-1}\mathbf{M}^{-1}$ for invertible square matrices.`
      ],
      steps: [
        {
          title: "Start from indicator columns and treatment coding",
          body: String.raw`For a factor with groups $1, \dots, k$, let $\mathbf{I}_g$ be the indicator of group $g$ and $\mathbf{X}_I = [\mathbf{I}_1 \cdots \mathbf{I}_k]$. Its columns are orthogonal with $\mathbf{X}_I^T\mathbf{X}_I = \operatorname{diag}(n_1, \dots, n_k)$, so it is invertible. Treatment coding uses $\mathbf{X}_T = [\mathbf{1}, \mathbf{I}_2, \dots, \mathbf{I}_k]$ instead, dropping the baseline indicator.`
        },
        {
          title: "Relate the two designs by an invertible matrix",
          body: String.raw`Since $\mathbf{1} = \mathbf{I}_1 + \cdots + \mathbf{I}_k$, we can write $\mathbf{X}_T = \mathbf{X}_I\mathbf{A}$, where the columns of $\mathbf{A}$ are $\mathbf{e}_1 + \cdots + \mathbf{e}_k, \mathbf{e}_2, \dots, \mathbf{e}_k$. This $\mathbf{A}$ is the identity with its first column replaced by a vector of ones, so $\det\mathbf{A} = 1$ and $\text{col}(\mathbf{X}_T) = \text{col}(\mathbf{X}_I)$. Including both the intercept and all $k$ indicators would instead give $\mathbf{1} - \sum_g \mathbf{I}_g = \mathbf{0}$, a rank-deficient design.`
        },
        {
          title: "Recover the group means as fitted values",
          body: String.raw`For the indicator design, $\hat{\boldsymbol\mu} = (\mathbf{X}_I^T\mathbf{X}_I)^{-1}\mathbf{X}_I^T\mathbf{y}$, whose $g$th entry is $\frac{1}{n_g}\sum_{i\in g} y_i = \bar y_g$. Each observation's fitted value is therefore the mean of its own group.`
        },
        {
          title: "Show that the hat matrix is invariant to reparametrization",
          body: String.raw`For any invertible $\mathbf{A}$ and $\mathbf{X}^* = \mathbf{X}\mathbf{A}$, we have $(\mathbf{X}^*)^T\mathbf{X}^* = \mathbf{A}^T\mathbf{X}^T\mathbf{X}\mathbf{A}$. So $\mathbf{H}^* = \mathbf{X}\mathbf{A}\,\mathbf{A}^{-1}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{A}^{-T}\,\mathbf{A}^T\mathbf{X}^T = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T = \mathbf{H}$. Fitted values and residuals are identical under any full-rank coding.`
        },
        {
          title: "Trace how the coefficients change with the coding",
          body: String.raw`From $\mathbf{X}_T\boldsymbol\beta_T = \mathbf{X}_I\mathbf{A}\boldsymbol\beta_T$, the cell-means coefficients satisfy $\boldsymbol\beta_I = \mathbf{A}\boldsymbol\beta_T$. With $\boldsymbol\beta_T = (\beta_0, \beta_2, \dots, \beta_k)^T$, the first entry gives $\mu_1 = \beta_0$ and entry $g \ge 2$ gives $\mu_g = \beta_0 + \beta_g$. So $\beta_g = \mu_g - \mu_1$. For means 10, 14, and 20 for groups A, B, and C, treatment coding with A as baseline gives $\boldsymbol\beta_T = (10, 4, 10)^T$.`
        }
      ],
      result: String.raw`The column space of $\mathbf{X}$ determines $\mathbf{H}$ and the fitted values, while the coding matrix determines the coefficients through $\boldsymbol\beta^* = \mathbf{A}^{-1}\boldsymbol\beta$ for $\mathbf{X}^* = \mathbf{X}\mathbf{A}$.`,
      assumptionsBreak: "A design whose columns are dependent, such as an intercept plus every indicator, has no inverse and its coefficients are not identified. Coefficients from different full-rank codings are also not comparable unless the coding is known: treatment coefficients are contrasts with a baseline, while sum-to-zero coefficients are deviations from an average."
    },
    quiz: [
      {
        question: String.raw`With treatment coding and group A as the baseline, the group means are $\bar y_A = 10$, $\bar y_B = 14$, and $\bar y_C = 20$. What is the coefficient for the C indicator?`,
        options: [
          "20",
          "10",
          "7",
          "-10"
        ],
        answer: 1,
        explanation: String.raw`Under treatment coding, $\beta_C = \bar y_C - \bar y_A = 20 - 10 = 10$. The trap is reporting the group mean itself rather than the offset from the baseline, and the value 10 also happens to be the intercept here.`
      },
      {
        question: String.raw`Why do the fitted values stay the same when the design $\mathbf{X}$ is replaced by $\mathbf{X}\mathbf{A}$ for an invertible $\mathbf{A}$?`,
        options: [
          "Because A is always the identity matrix",
          "Because the coefficients are rescaled so the predictions are averaged",
          "Because the residuals become zero under any reparametrization",
          String.raw`Because $\mathbf{H}^* = \mathbf{X}\mathbf{A}(\mathbf{A}^T\mathbf{X}^T\mathbf{X}\mathbf{A})^{-1}\mathbf{A}^T\mathbf{X}^T$ simplifies back to $\mathbf{H}$`
        ],
        answer: 3,
        explanation: String.raw`The factors of $\mathbf{A}$ cancel, so the hat matrix depends only on the column space of $\mathbf{X}$. Only the coefficient vector changes, through $\boldsymbol\beta^* = \mathbf{A}^{-1}\boldsymbol\beta$. The trap is thinking any change of coding changes the predictions.`
      },
      {
        question: "Three groups are coded with an intercept and indicators for A, B, and C, all included. Which vector v gives X v = 0 and reveals the dependence?",
        options: [
          "(1, 1, 1, 1)^T",
          "(0, 1, 1, 1)^T",
          "(1, -1, -1, -1)^T",
          "(1, 0, 0, 0)^T"
        ],
        answer: 2,
        explanation: String.raw`The intercept column equals the sum of the three indicators, so $\mathbf{1} - \mathbf{I}_A - \mathbf{I}_B - \mathbf{I}_C = \mathbf{0}$. The trap is checking only the indicators and missing that the intercept column already lies in their span.`
      },
      {
        question: "A 4-level factor is coded with treatment coding plus an intercept and no other predictors. Assuming every level appears in the data, what is the rank of the design matrix?",
        options: [
          "3",
          "4",
          "5",
          "2"
        ],
        answer: 1,
        explanation: "Treatment coding uses k - 1 = 3 dummies plus the intercept, giving 4 linearly independent columns, so the rank is 4. The trap is counting all 4 levels as dummies, which together with the intercept gives 5 columns of rank only 4."
      },
      {
        question: "For the indicator design X_I = [I_1, ..., I_k] with no intercept column, what are the fitted values?",
        options: [
          "The grand mean repeated for every observation",
          "The observed y values unchanged",
          "Each observation's own group mean, repeated for every observation in that group",
          "A vector of zeros"
        ],
        answer: 2,
        explanation: String.raw`Since $\mathbf{X}_I^T\mathbf{X}_I = \operatorname{diag}(n_g)$ and $\mathbf{X}_I^T\mathbf{y}$ holds group sums, the coefficients are the group means and each fitted value is its group mean. The trap is expecting the grand mean to appear here.`
      }
    ]
  }
};

export default deepContent;
