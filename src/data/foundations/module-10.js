// Module 10 foundation, built from the ground up with worked examples.
export default {
  title: "Regression, Linear Models & ANOVA",
  summary: String.raw`Regression finds the straight line, or flat plane, that predicts one quantity from others by making the squared misses as small as possible. We measure how much of the variation a fit explains with R-squared, see how loess bends a line locally, and then learn how multiple predictors, design matrices, t-tests, and analysis of variance (ANOVA) all turn out to be the same least squares calculation.`,
  steps: [
    {
      step: 1,
      title: "A line is a rule with an intercept and a slope",
      content: [
        String.raw`Start with a bike rental shop. It charges a fixed fee of 2 dollars to start a ride, and then 3 dollars for every hour you ride. If you ride for $x$ hours, the total cost $y$, in dollars, is 2 plus 3 times $x$. We write this rule as $y = 2 + 3x$. The number $x$ is the input we choose (the hours), and $y$ is the number the rule gives back (the cost).`,
        String.raw`A rule like this is a straight line. Each extra hour adds the same 3 dollars, so the cost climbs at a steady rate. Two names help us talk about the two numbers in the rule. The intercept is the value the line takes when $x = 0$, which is the starting fee of 2 dollars. The slope is how much the line rises for each one-unit step in $x$, which is 3 dollars per hour. In general we write the rule as $y = b_0 + b_1 x$, with intercept $b_0$ and slope $b_1$.`,
        String.raw`Why does this matter? A line turns one number into another. If you know the rule, you can answer questions the shop never told you, such as the cost of a ride you have not taken yet. Regression works in the other direction. We start with a list of hours and costs, and we look for the values of $b_0$ and $b_1$ that best match that list. Step 2 explains what “best” means.`,
      ],
      example: [
        String.raw`Check the rule at a few values. At $x = 0$ hours the cost is $2 + 3 \times 0 = 2$ dollars. At $x = 1$ hour it is $2 + 3 \times 1 = 5$ dollars. At $x = 2$ hours it is $2 + 3 \times 2 = 8$ dollars. At $x = 4$ hours it is $2 + 3 \times 4 = 14$ dollars.`,
        String.raw`Look at the changes. From 1 hour to 2 hours the cost goes from 5 to 8, a rise of $8 - 5 = 3$ dollars. From 2 hours to 4 hours the cost goes from 8 to 14, a rise of $14 - 8 = 6 = 2 \times 3$ dollars, which is two steps of 3 dollars. For a ride of 2.5 hours the cost is $2 + 3 \times 2.5 = 2 + 7.5 = 9.5$ dollars.`,
      ],
    },
    {
      step: 2,
      title: "Residuals measure how far the line misses",
      content: [
        String.raw`Now we move from rules to data. Suppose five students each study for some number of hours $x$, and then each takes a quiz scored out of 5. Their data are $x = 1, 2, 3, 4, 5$ hours and $y = 2, 4, 5, 4, 5$ points. No straight line passes through all five points, so every line misses some of them. The task is to find the line that misses least.`,
        String.raw`For any line we draw, the miss at each point is called the residual. It is the observed value minus the value the line predicts: $e_i = y_i - \hat{y}_i$. The hat on $\hat{y}_i$ means “the height the line predicts for student $i$.” A positive residual means the point sits above the line, and a negative residual means it sits below.`,
        String.raw`How do we score a line using five residuals? Adding them is a poor choice, because positive and negative residuals cancel. A line can have residuals that add to zero and still miss badly. Squaring each residual removes the signs, so every miss counts. The sum of squared residuals, $SSR = \sum_{i}(y_i - \hat{y}_i)^2$, is our score, and a smaller SSR means a better line. Common misreading: a residual sum of zero does not mean the line fits well.`,
      ],
      example: [
        String.raw`Take the flat line $\hat{y} = 4$, which predicts 4 for every student. The residuals are $2 - 4 = -2$, $4 - 4 = 0$, $5 - 4 = 1$, $4 - 4 = 0$, and $5 - 4 = 1$. Their plain sum is $-2 + 0 + 1 + 0 + 1 = 0$, which looks perfect. The squares are $4, 0, 1, 0, 1$, so $SSR = 4 + 0 + 1 + 0 + 1 = 6$.`,
        String.raw`Now try the line $\hat{y} = 2 + 0.5x$. Its predictions for $x = 1, 2, 3, 4, 5$ are $2.5, 3.0, 3.5, 4.0, 4.5$. The residuals are $-0.5, 1.0, 1.5, 0.0, 0.5$, and their squares are $0.25, 1.00, 2.25, 0.00, 0.25$. So $SSR = 0.25 + 1.00 + 2.25 + 0.00 + 0.25 = 3.75$. This line scores better than the flat line, because $3.75 < 6$.`,
      ],
    },
    {
      step: 3,
      title: "The least squares line has the smallest SSR",
      content: [
        String.raw`Remember the scores from step 2: 6 for the flat line and 3.75 for the line $2 + 0.5x$. Least squares means choosing the slope $b_1$ and the intercept $b_0$ that make SSR as small as possible. We do not have to guess. A formula gives the answer, and it is built from two averages.`,
        String.raw`The mean of $x$, written $\bar{x}$ (read “x-bar”), is the sum of the $x$ values divided by how many there are. The mean of $y$, written $\bar{y}$, works the same way. Next we measure how $x$ and $y$ move together with $S_{xy} = \sum (x_i - \bar{x})(y_i - \bar{y})$, and how far $x$ spreads with $S_{xx} = \sum (x_i - \bar{x})^2$. Both sums use deviations, which are distances from the mean.`,
        String.raw`The least squares answers are $b_1 = S_{xy}/S_{xx}$ and $b_0 = \bar{y} - b_1\bar{x}$. The slope is the ratio of joint movement to spread. The intercept is chosen so that the line passes through $(\bar{x}, \bar{y})$, the center of the data. Step 7 derives the general version of these formulas. Here we test them on real numbers.`,
      ],
      example: [
        String.raw`For the five students, $\bar{x} = (1+2+3+4+5)/5 = 15/5 = 3$ and $\bar{y} = (2+4+5+4+5)/5 = 20/5 = 4$. The deviations $x_i - 3$ are $-2, -1, 0, 1, 2$, and the deviations $y_i - 4$ are $-2, 0, 1, 0, 1$. Then $S_{xx} = 4 + 1 + 0 + 1 + 4 = 10$ and $S_{xy} = (-2)(-2) + (-1)(0) + (0)(1) + (1)(0) + (2)(1) = 4 + 0 + 0 + 0 + 2 = 6$.`,
        String.raw`So $b_1 = 6/10 = 0.6$ and $b_0 = 4 - 0.6 \times 3 = 2.2$. The least squares line is $\hat{y} = 2.2 + 0.6x$. Its predictions are $2.8, 3.4, 4.0, 4.6, 5.2$, its residuals are $-0.8, 0.6, 1.0, -0.6, -0.2$, and the squares add to $0.64 + 0.36 + 1.00 + 0.36 + 0.04 = 2.40$. That beats 3.75. To test the claim, tilt the line. Slope 0.5 with intercept $4 - 0.5 \times 3 = 2.5$ gives SSR $= 2.50$, and slope 0.7 with intercept $4 - 0.7 \times 3 = 1.9$ gives SSR $= 2.50$. Both tilts are worse than 2.40.`,
      ],
    },
    {
      step: 4,
      title: "R-squared is the share of variation explained",
      content: [
        String.raw`The flat line $\hat{y} = 4$ is the simplest model there is: it predicts the mean of $y$ for everyone. Its SSR is 6, and that number has a name. Call it the total sum of squares, $SS_{\text{tot}} = \sum (y_i - \bar{y})^2$. It measures how much the $y$ values vary around their own mean. For our five students, $SS_{\text{tot}} = 6$.`,
        String.raw`The regression line leaves a smaller unexplained part, $SS_{\text{res}} = \sum (y_i - \hat{y}_i)^2$, which is the SSR from step 3. The difference $SS_{\text{tot}} - SS_{\text{res}}$ is the variation the line explains. R-squared is the fraction explained: $R^2 = 1 - SS_{\text{res}}/SS_{\text{tot}}$. It lies between 0 and 1. A value near 1 means the line removes almost all of the variation.`,
        String.raw`Common misreading: a high R-squared does not prove that the line is the right model. A curved pattern or one extreme point can still produce a respectable R-squared, so look at a plot of the data too.`,
      ],
      example: [
        String.raw`Use the numbers from step 3: $SS_{\text{tot}} = 6$ and $SS_{\text{res}} = 2.40$. Then $R^2 = 1 - 2.40/6 = 1 - 0.40 = 0.60$. The line explains 60% of the variation in quiz scores, and the remaining 40% is left over as residual variation.`,
        String.raw`Check the answer another way. The explained part is $6 - 2.4 = 3.6$, and $3.6/6 = 0.6$. Let $S_{yy} = \sum (y_i - \bar{y})^2 = 6$, which equals $SS_{\text{tot}}$. The correlation $r = S_{xy}/\sqrt{S_{xx} S_{yy}} = 6/\sqrt{10 \times 6} = 6/7.746 = 0.775$ measures how tightly $x$ and $y$ move together, on a scale from -1 to 1. Squaring it gives $0.775^2 = 0.60$. With one predictor, R-squared is always the square of the correlation.`,
      ],
    },
    {
      step: 5,
      title: "Loess bends the line by weighting nearby points",
      content: [
        String.raw`Look at the scores in step 2 again: 2, 4, 5, 4, 5. They rise, dip at the fourth student, and rise again. A single straight line cannot follow that zigzag. Loess (short for locally estimated scatterplot smoothing) draws a curve instead. It makes a separate local fit for each place where we want a prediction, and it uses only the nearby points for that fit.`,
        String.raw`The points near the target should count most, so loess gives each point a weight. A weight is a number between 0 and 1 that says how much a point counts. The common choice is the tricube weight. Let $d$ be the distance from the target $x_0$ to a point, and let $\Delta$ be the window half-width, the largest distance that still counts. Set $u = d/\Delta$. The weight is $(1 - u^3)^3$ when $u < 1$, and 0 when $u \ge 1$. A point at the target gets weight 1, and a point at the window edge gets weight 0.`,
        String.raw`Once the weights are set, loess fits a weighted straight line through the nearby points. The curve is the chain of these local fits. The span, the fraction of all points inside each window, controls how wiggly the curve is. A small span follows every bump, including random noise. A large span averages out real bumps and gives a smoother curve, though it is still not a straight line unless the data are straight.`,
      ],
      example: [
        String.raw`Predict the score at $x_0 = 3$ with window half-width $\Delta = 2$, so the window reaches from $x = 1$ to $x = 5$. The distances from 3 are $0$ for $x = 3$, $1$ for $x = 2$ and $x = 4$, and $2$ for $x = 1$ and $x = 5$. For $x = 3$, $u = 0$ and the weight is $1$. For $x = 2$ and $x = 4$, $u = 1/2 = 0.5$ and the weight is $(1 - 0.5^3)^3 = 0.875^3 = 0.670$, rounded. For $x = 1$ and $x = 5$, $u = 2/2 = 1$ and the weight is $0$.`,
        String.raw`The weighted average of the $y$ values is $\frac{0.670 \times 4 + 1 \times 5 + 0.670 \times 4}{0.670 + 1 + 0.670} = \frac{10.36}{2.34} = 4.43$. The line from step 3 predicts $2.2 + 0.6 \times 3 = 4.0$ at $x = 3$, and the observed score there is 5. Loess lands between the two, at 4.43. The three nearby points are symmetric around 3, so the weighted straight line through them is flat and also passes through 4.43.`,
      ],
    },
    {
      step: 6,
      title: "Multiple regression fits a plane",
      content: [
        String.raw`Often several things drive an outcome. Suppose a student's score depends on hours studied, $x_1$, and hours slept, $x_2$. A model with two predictors is $y = b_0 + b_1 x_1 + b_2 x_2$. Each data point is now a dot in three dimensions, and the best-fitting shape is a flat plane instead of a line. We still choose $b_0$, $b_1$, and $b_2$ to make SSR as small as possible, exactly as in step 3.`,
        String.raw`The coefficient $b_1$ is a partial slope. It says how much $y$ changes when $x_1$ goes up by one unit while $x_2$ is held fixed. The phrase “held fixed” matters. If $x_1$ and $x_2$ move together in the data, a simple regression of $y$ on $x_1$ alone mixes the two effects. Multiple regression separates them.`,
        String.raw`Adding a predictor never increases SSR, because the bigger model can always copy the smaller one. The real question is whether the drop is large enough to matter. The partial F statistic compares the drop with the leftover noise: $F = \frac{(SSR_{\text{small}} - SSR_{\text{big}})/k}{SSR_{\text{big}}/(n - p)}$. Here $k$ is the number of added predictors, $n$ is the number of data points, and $p$ is the number of coefficients including the intercept. The quantity $n - p$ is the residual degrees of freedom, the number of values left free after the fit.`,
      ],
      example: [
        String.raw`Take four data points $(x_1, x_2, y)$: $(0, 0, 1)$, $(1, 0, 3)$, $(0, 1, 4)$, and $(1, 1, 7)$. The least squares plane for these points is $\hat{y} = 0.75 + 2.5x_1 + 3.5x_2$. Step 7 shows how to compute these three numbers. Here we check the plane. Its predictions are $0.75$, $3.25$, $4.25$, and $6.75$. The residuals are $1 - 0.75 = 0.25$, $3 - 3.25 = -0.25$, $4 - 4.25 = -0.25$, and $7 - 6.75 = 0.25$. Their squares sum to $4 \times 0.0625 = 0.25$, so $SSR = 0.25$ for this plane.`,
        String.raw`Partial slope: with $x_2 = 0$, raising $x_1$ from 0 to 1 raises the prediction from 0.75 to 3.25, a rise of 2.5. With $x_2 = 1$, the prediction rises from 4.25 to 6.75, which is also 2.5. So $b_1 = 2.5$ is the change in predicted score for one more hour of study, with sleep held fixed. Here $x_1$ and $x_2$ are uncorrelated, so the simple slope for $x_1$ alone is also 2.5. With correlated predictors, the two slopes would differ.`,
        String.raw`Is $x_2$ worth keeping? Drop it and fit $\hat{y} = 2.5 + 2.5x_1$. Its residuals for the four points, in the order listed, are $1 - 2.5 = -1.5$, $3 - 5 = -2$, $4 - 2.5 = 1.5$, and $7 - 5 = 2$. So $SSR_{\text{small}} = 2.25 + 4 + 2.25 + 4 = 12.5$. With $k = 1$, $n = 4$, and $p = 3$, the partial F is $F = (12.5 - 0.25)/1 \div (0.25/1) = 12.25/0.25 = 49$. Adding $x_2$ removes 98% of the SSR left by the simpler model, so $x_2$ earns its place.`,
      ],
    },
    {
      step: 7,
      title: "Design matrices solve every linear model with one formula",
      content: [
        String.raw`Step 6 had three coefficients and four data points. Writing every equation out by hand gets tedious, so we stack the data into matrices. Let $\mathbf{y}$ be the column of outcomes, $\boldsymbol{\beta}$ the column $(b_0, b_1, b_2)$ of coefficients, and $\mathbf{X}$ the design matrix. The matrix $\mathbf{X}$ has one row per data point. Its first column is all 1s, which multiply the intercept, and each later column holds one predictor's values. For the four points in step 6, the rows of $\mathbf{X}$ are $(1, 0, 0)$, $(1, 1, 0)$, $(1, 0, 1)$, and $(1, 1, 1)$. The model is $\mathbf{y} \approx \mathbf{X}\boldsymbol{\beta}$.`,
        String.raw`Categories fit into the same matrix. A dummy variable is a 0/1 column that marks membership in one group. A two-group comparison, such as a t-test, needs one dummy column. A one-way analysis of variance (ANOVA), which asks whether several group means differ, needs one dummy column for each group except a baseline group. With groups A, B, and C and A as the baseline, the row for a group C point is $(1, 0, 1)$. The intercept is then the baseline mean, and each dummy coefficient is the difference from the baseline. A t-test and an ANOVA are therefore both least squares fits on a design matrix.`,
        String.raw`Now the general solution. Let $S(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$ be the SSR for any coefficient vector. Expanding the product gives $$S(\boldsymbol{\beta}) = \mathbf{y}^T\mathbf{y} - 2\boldsymbol{\beta}^T\mathbf{X}^T\mathbf{y} + \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta},$$ where the two cross terms are equal because $(\mathbf{X}\boldsymbol{\beta})^T\mathbf{y} = \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{y}$ is a single number. Differentiate with respect to $\boldsymbol{\beta}$, using the rule that the derivative of $b^2$ is $2b$, applied to each coordinate: $$\frac{\partial S}{\partial \boldsymbol{\beta}} = -2\mathbf{X}^T\mathbf{y} + 2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}.$$ Setting this to zero gives the normal equations $\mathbf{X}^T\mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}^T\mathbf{y}$. If $\mathbf{X}^T\mathbf{X}$ can be inverted, then $$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}.$$`,
        String.raw`Why is this the minimum and not a maximum? The second derivative is $2\mathbf{X}^T\mathbf{X}$. For any nonzero vector $\mathbf{v}$, $\mathbf{v}^T\mathbf{X}^T\mathbf{X}\mathbf{v} = \|\mathbf{X}\mathbf{v}\|^2 > 0$, because $\mathbf{X}\mathbf{v} \neq \mathbf{0}$ when the columns of $\mathbf{X}$ are independent. So the SSR surface is a bowl with one lowest point. Under the usual assumptions (errors with mean zero, the same spread everywhere, and no correlation between errors), this estimator is also the best linear unbiased estimator. The formula breaks when the columns of $\mathbf{X}$ depend on each other. With an intercept and all $k$ dummy columns, the dummies add up to the column of 1s, so $\mathbf{X}^T\mathbf{X}$ cannot be inverted; this is the dummy variable trap. It also breaks when the true pattern is curved, which is why loess and extra terms exist. The one thing to remember: every linear model, from a straight line to a t-test to a three-group ANOVA, is solved by the same formula $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$, so choosing the columns of $\mathbf{X}$ is the whole modeling decision.`,
      ],
      example: [
        String.raw`Control scores are 10, 12, and 14. Treatment scores are 16, 18, and 20. Let $D = 0$ for control and $D = 1$ for treatment. The design matrix has six rows: $(1, 0)$ for each control point and $(1, 1)$ for each treatment point. Then $\mathbf{X}^T\mathbf{X} = \begin{pmatrix} 6 & 3 \\ 3 & 3 \end{pmatrix}$, because there are 6 rows and 3 treatment rows. Also $\mathbf{X}^T\mathbf{y} = \begin{pmatrix} 90 \\ 54 \end{pmatrix}$, where 90 is the sum of all six scores and 54 is the sum of the three treatment scores.`,
        String.raw`The determinant is $6 \times 3 - 3 \times 3 = 9$, so $(\mathbf{X}^T\mathbf{X})^{-1} = \frac{1}{9}\begin{pmatrix} 3 & -3 \\ -3 & 6 \end{pmatrix}$. Then $\hat{\boldsymbol{\beta}} = \frac{1}{9}\begin{pmatrix} 3 \times 90 - 3 \times 54 \\ -3 \times 90 + 6 \times 54 \end{pmatrix} = \frac{1}{9}\begin{pmatrix} 108 \\ 54 \end{pmatrix} = \begin{pmatrix} 12 \\ 6 \end{pmatrix}$. The intercept 12 is the control mean, and the slope 6 is the difference in means. The step 6 plane passes the same test. Its $\mathbf{X}^T\mathbf{X}$ has rows $(4, 2, 2)$, $(2, 2, 1)$, and $(2, 1, 2)$, and its $\mathbf{X}^T\mathbf{y} = (15, 10, 11)$. With $\hat{\boldsymbol{\beta}} = (0.75, 2.5, 3.5)$, the first row gives $4 \times 0.75 + 2 \times 2.5 + 2 \times 3.5 = 15$, and the other two rows give 10 and 11 in the same way.`,
        String.raw`The fitted values are 12 for each control point and 18 for each treatment point. The residuals are $-2, 0, 2$ and $-2, 0, 2$, so SSR $= 4 + 0 + 4 + 4 + 0 + 4 = 16$. The error variance estimate is $s^2 = 16/(6 - 2) = 4$, so $s = 2$. The standard error of the slope is $s/\sqrt{\sum (D_i - \bar{D})^2} = 2/\sqrt{1.5} = 1.633$, where $\bar{D} = 0.5$. The t statistic is $t = 6/1.633 = 3.67$, and its two-sided p-value on 4 degrees of freedom is about 0.021. The ANOVA gives the same answer: between-group SS is $3(12-15)^2 + 3(18-15)^2 = 54$, within-group SS is 16, and $F = (54/1)/(16/4) = 13.5 = 3.67^2$.`,
      ],
    },
  ],
};
