// Module 8 foundation, built from the ground up with worked examples.
export default {
  title: "Covariance, Correlation & Bivariate Analysis",
  summary: "Often two things change together: taller people tend to weigh more, and hotter days tend to bring more ice cream sales. Covariance measures this joint movement, and Pearson's correlation coefficient r rescales it into a pure number between minus 1 and plus 1 so that different studies can be compared. This module builds both measures from three people's heights and weights, one small step at a time, and ends with the proof that r can never leave the range from minus 1 to plus 1.",
  steps: [
    {
      step: 1,
      title: "Two measurements per person, and the distance from the average",
      content: [
        String.raw`Start with three people. Person A is 65 inches tall and weighs 130 pounds. Person B is 70 inches tall and weighs 170 pounds. Person C is 75 inches tall and weighs 180 pounds. Each person gives us two numbers, so we have two lists: one list of heights and one list of weights. A quantity whose value changes from person to person is called a variable. If we pick one of the three people at random, the height we see is a random variable, because chance decides which person we get.`,
        String.raw`We call the height $x$ and the weight $y$. Add up the three heights: $65 + 70 + 75 = 210$. Divide by 3 to get the average height, $\bar{x} = 210/3 = 70$ inches. Read the bar in $\bar{x}$ as “the average of $x$.” The weights add to $130 + 170 + 180 = 480$, so the average weight is $\bar{y} = 480/3 = 160$ pounds.`,
        String.raw`Now measure how far each person sits from the average. That distance is called a deviation. For height, the deviation of person $i$ is $x_i - \bar{x}$, where $i$ is 1, 2, or 3 for A, B, and C. Person A: $65 - 70 = -5$. Person B: $70 - 70 = 0$. Person C: $75 - 70 = 5$. For weight, the deviations are $130 - 160 = -30$, $170 - 160 = 10$, and $180 - 160 = 20$.`,
        String.raw`Common misreading: a deviation is not a height. A deviation of minus 5 means five inches below the average height, not a height of minus 5 inches. The deviations in each list always sum to zero, because the average is the balance point of the list.`,
      ],
      example: [
        String.raw`Check the arithmetic line by line. Heights: $65 - 70 = -5$, $70 - 70 = 0$, $75 - 70 = 5$. Their sum is $-5 + 0 + 5 = 0$.`,
        String.raw`Weights: $130 - 160 = -30$, $170 - 160 = 10$, $180 - 160 = 20$. Their sum is $-30 + 10 + 20 = 0$. Keep these six deviations. Step 2 combines them.`,
      ],
    },
    {
      step: 2,
      title: "Matching deviations: the product shows whether two people move together",
      content: [
        String.raw`Remember the six deviations from step 1. For each person, multiply the height deviation by the weight deviation. Call the result that person's agreement score. If both deviations are positive, the person is above average in both, and the product is positive. If both are negative, the person is below average in both, and the product is still positive, because a negative times a negative is positive. If one deviation is positive and the other is negative, the product is negative. A positive score means the person fits the pattern “above average in one, above average in the other.”`,
        String.raw`Now compute the three products. Person A: $(-5) \times (-30) = 150$. Person B: $0 \times 10 = 0$. Person C: $5 \times 20 = 100$. Person B is exactly average in height, so B contributes nothing, whatever B's weight is. We write the sum of the products with the Greek capital letter sigma, $\sum$, which means “add up all the terms.” So $\sum (x_i - \bar{x})(y_i - \bar{y}) = 150 + 0 + 100 = 250$.`,
        String.raw`Why does this total matter? When the two lists move together, most products are positive and the total is large and positive. If the heavy people were the short ones, the products would be negative and the total would be negative. The sign tells us the direction of the relationship. The size of the total is not yet useful for comparing studies, because it grows just by adding more people. The next step turns it into a fair average.`,
      ],
      example: [
        String.raw`Line by line: $(-5)(-30) = 150$; $(0)(10) = 0$; $(5)(20) = 100$; and $150 + 0 + 100 = 250$.`,
        String.raw`Now swap the weights of A and C, so the tallest person is the lightest. The weight deviations become $+20$ for A, $+10$ for B, and $-30$ for C. The products are $(-5)(20) = -100$, $(0)(10) = 0$, and $(5)(-30) = -150$. Their sum is $-250$. The size is the same, but the sign is opposite, because the lists now move in opposite directions.`,
      ],
    },
    {
      step: 3,
      title: "Average the products: the sample covariance",
      content: [
        String.raw`Remember the total of 250 from step 2. Let $n$ stand for the number of people, so here $n = 3$. A total grows when we add more people, even if the relationship stays the same. So we average the products instead. Statisticians divide by $n - 1$ rather than $n$ when the data are a sample taken from a larger group. Here $n - 1 = 3 - 1 = 2$.`,
        String.raw`Why $n - 1$? The deviations always sum to zero (step 1), so once you know all but one of them, the last one is forced. Only $n - 1$ of the deviations are free to vary. Dividing by $n - 1$ corrects for the fact that the sample average was computed from the same data. The result is an unbiased estimate: a rule that is right on average when we repeat the sampling many times.`,
        String.raw`We call this the sample covariance and write it $s_{xy}$. Its name says what it is: the variance shared by two lists. The formula is $s_{xy} = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})$. In words: take each person's agreement score from step 2, add them up, and divide by $n - 1$. A positive covariance means the lists tend to rise and fall together. A negative one means one tends to rise when the other falls. A value near zero means there is no straight-line pattern. The units of covariance are the units of height times the units of weight, which here is inch-pounds.`,
      ],
      example: [
        String.raw`With $n = 3$, we have $n - 1 = 2$. So $s_{xy} = \frac{250}{3 - 1} = \frac{250}{2} = 125$ inch-pounds.`,
        String.raw`Check by averaging the three products directly: $(150 + 0 + 100)/2 = 250/2 = 125$. Common misreading: 125 is not a percentage, and it has no upper limit of 100. Its size depends on the units we chose.`,
      ],
    },
    {
      step: 4,
      title: "Change the units and the covariance changes",
      content: [
        String.raw`Remember the covariance of 125 from step 3. Now measure height in centimeters instead of inches. One inch is 2.54 centimeters, so the heights become $65 \times 2.54 = 165.1$, $70 \times 2.54 = 177.8$, and $75 \times 2.54 = 190.5$ centimeters. The people have not changed, and neither has the relationship between height and weight. Yet the covariance is different. This is scale sensitivity: covariance grows or shrinks when we rescale one of its variables.`,
        String.raw`Why? Each height deviation is the height minus a constant, so rescaling the heights rescales every height deviation by the same factor, 2.54. Each product in the sum is then multiplied by 2.54, and so is the covariance. In general, if we multiply $X$ by a number $a$, the covariance is multiplied by $a$. Multiplying the heights by 2.54 changed the covariance from 125 to $125 \times 2.54 = 317.5$, even though no person's relationship to any other person changed.`,
        String.raw`Common misreading: a covariance of 317.5 does not mean the relationship is stronger than a covariance of 125. The number is simply bigger because the unit is smaller. Two researchers who measure the same people in different units will report different covariances, so raw covariances cannot be compared across studies. We need a measure that does not depend on units. Step 5 builds that measure.`,
      ],
      example: [
        String.raw`The centimeter heights are $165.1$, $177.8$, and $190.5$. Their average is $(165.1 + 177.8 + 190.5)/3 = 533.4/3 = 177.8$. The deviations are $165.1 - 177.8 = -12.7$, $177.8 - 177.8 = 0$, and $190.5 - 177.8 = 12.7$.`,
        String.raw`Multiply by the weight deviations $-30$, $10$, and $20$: $(-12.7)(-30) = 381$, $0 \times 10 = 0$, and $(12.7)(20) = 254$. The sum is $381 + 0 + 254 = 635$. Divide by $n - 1 = 2$ to get $635/2 = 317.5$, which matches $125 \times 2.54 = 317.5$.`,
      ],
    },
    {
      step: 5,
      title: "Divide by the spread: Pearson's r",
      content: [
        String.raw`Remember the covariance of 125 inch-pounds from step 3. To remove the units, we need a yardstick for how spread out each list is. That yardstick is the standard deviation, which is roughly the typical distance of a value from the average. Compute it with the same deviations: square each deviation, average the squares using $n - 1$, and take the square root. We write the sample variance of $x$ as $s_x^2$, and the standard deviation as $s_x$.`,
        String.raw`For height, the squared deviations are $(-5)^2 = 25$, $0^2 = 0$, and $5^2 = 25$. Their sum is 50. Divide by 2 to get the variance $s_x^2 = 25$, so $s_x = \sqrt{25} = 5$ inches. For weight, the squared deviations are $900$, $100$, and $400$, with sum $1400$. Divide by 2 to get $s_y^2 = 700$, so $s_y = \sqrt{700} \approx 26.46$ pounds.`,
        String.raw`Now divide the covariance by both standard deviations. This is Pearson's correlation coefficient, written $r$:
$$r = \frac{s_{xy}}{s_x \, s_y}$$
The inch-pounds on top are matched by the inches and pounds on the bottom, so they cancel and $r$ is a pure number with no units. Pearson's $r$ is the covariance measured in standard-deviation units. It compares how the two lists move together with how much each list moves on its own.`,
      ],
      example: [
        String.raw`Plug in the numbers: $r = \frac{125}{5 \times 26.46} = \frac{125}{132.29} \approx 0.945$. The top is in inch-pounds and the bottom is inches times pounds, so the units cancel.`,
        String.raw`Check that units do not matter. In centimeters, $s_x = 5 \times 2.54 = 12.7$ cm, and the covariance is 317.5. Then $r = \frac{317.5}{12.7 \times 26.46} = \frac{317.5}{336.0} \approx 0.945$. The covariance changed from 125 to 317.5, but $r$ did not change.`,
      ],
    },
    {
      step: 6,
      title: "Geometry: r is the cosine of an angle",
      content: [
        String.raw`Remember the six deviations from step 1. Arrange the height deviations as one list of three numbers, and the weight deviations as another. Each list can be read as an arrow in three-dimensional space, with one axis for each person. The height arrow is $\mathbf{u} = (-5, 0, 5)$, and the weight arrow is $\mathbf{v} = (-30, 10, 20)$.`,
        String.raw`Two arrows have a dot product: multiply matching coordinates and add the results. Here $\mathbf{u} \cdot \mathbf{v} = (-5)(-30) + (0)(10) + (5)(20) = 150 + 0 + 100 = 250$. This is exactly the sum from step 2. Each arrow also has a length, found by the Pythagorean rule: $\|\mathbf{u}\| = \sqrt{25 + 0 + 25} = \sqrt{50}$ and $\|\mathbf{v}\| = \sqrt{900 + 100 + 400} = \sqrt{1400}$. The length of $\mathbf{u}$ is the square root of the sum of squared height deviations from step 5.`,
        String.raw`The cosine of the angle $\theta$ between two arrows is their dot product divided by both lengths: $\cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \, \|\mathbf{v}\|}$. Compare this with step 5. The dot product is the sum of products, and the lengths are the square roots of the sums of squares. The factors of $n - 1$ cancel, so $r = \cos \theta$ exactly. An angle near zero means the arrows point the same way, which is a strong positive $r$. A right angle means no straight-line pattern, so $r = 0$. An angle of 180 degrees means the arrows point in opposite directions, so $r = -1$.`,
      ],
      example: [
        String.raw`Compute the cosine: $\cos \theta = \frac{250}{\sqrt{50} \times \sqrt{1400}} = \frac{250}{7.071 \times 37.417} = \frac{250}{264.58} \approx 0.945$. This is the same value as $r$ in step 5.`,
        String.raw`The angle is $\theta = \arccos(0.945) \approx 19.1^\circ$. An angle of about 19 degrees is small, so the two arrows nearly point the same way. Check: $\cos(19.1^\circ) \approx 0.945$, which returns the number we started with.`,
      ],
    },
    {
      step: 7,
      title: "The full theory: why r always stays between minus 1 and plus 1",
      content: [
        String.raw`Now the general case. Let $X$ and $Y$ be random variables, meaning numbers whose values depend on chance. The expected value $E[X]$ is the average of $X$ over all outcomes, where each outcome is weighted by its probability. For a fair die, $E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5$. Write $\mu_X = E[X]$ and $\mu_Y = E[Y]$. The population covariance is $\text{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$, and the population correlation is $\rho = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$, where $\sigma_X = \sqrt{\text{Var}(X)}$ and $\sigma_Y = \sqrt{\text{Var}(Y)}$. The sample versions in steps 3 and 5 use sample averages in place of expected values, and the factor $n-1$ cancels in $r$.`,
        String.raw`Covariance has a simpler form. Expand the product: $(X-\mu_X)(Y-\mu_Y) = XY - \mu_Y X - \mu_X Y + \mu_X\mu_Y$. Take expected values term by term. A constant comes out of an expected value unchanged, so $E[\mu_Y X] = \mu_Y\mu_X$ and $E[\mu_X Y] = \mu_X\mu_Y$. Then $\text{Cov}(X,Y) = E[XY] - \mu_X\mu_Y - \mu_X\mu_Y + \mu_X\mu_Y = E[XY] - E[X]E[Y]$. If $X$ and $Y$ are independent, then $E[XY] = E[X]E[Y]$, so the covariance is zero. The converse is false, as the example shows.`,
        String.raw`Why must $\rho$ lie between $-1$ and $+1$? Let $A = X - \mu_X$, let $B = Y - \mu_Y$, and let $t$ be any number. Expanding gives $E[(tA+B)^2] = t^2 E[A^2] + 2t\,E[AB] + E[B^2] = t^2\sigma_X^2 + 2t\,\text{Cov}(X,Y) + \sigma_Y^2$. The left side is an average of squares, so it is never negative, whatever $t$ is. A quadratic $at^2 + bt + c$ that is never negative cannot cross zero twice, so its discriminant $b^2 - 4ac$ is at most zero. Here $b^2 - 4ac = 4\,\text{Cov}^2 - 4\sigma_X^2\sigma_Y^2 \le 0$, which gives $\text{Cov}^2 \le \sigma_X^2\sigma_Y^2$ and therefore $|\rho| \le 1$.`,
        String.raw`When is $\rho = 1$ exactly? Equality needs $E[(tA+B)^2] = 0$ for some $t$. An average of squares is zero only when every squared term is zero, so $tA + B = 0$ in every outcome that can occur. Writing $a = -t$ gives $Y = aX + b$ with a constant $b$, which is an exact straight line. The sign of $\rho$ is the sign of $a$, because $\text{Cov} = a\sigma_X^2$ and $\sigma_Y = |a|\sigma_X$. So $\rho = +1$ for an exact upward line, $\rho = -1$ for an exact downward line, and $\rho$ breaks down for curved patterns, where a strong relationship can give $\rho = 0$. The one thing to remember: $r$ measures only how closely points follow a straight line, after the units are removed.`,
      ],
      example: [
        String.raw`The converse fails. Let $X$ take the values $-2, -1, 0, 1, 2$, each with probability $1/5$, and let $Y = X^2$. Then $E[X] = (-2-1+0+1+2)/5 = 0$, and $E[Y] = (4+1+0+1+4)/5 = 2$. Also $E[XY] = E[X^3] = ((-2)^3 + (-1)^3 + 0^3 + 1^3 + 2^3)/5 = (-8-1+0+1+8)/5 = 0$.`,
        String.raw`So $\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0 - 0 \times 2 = 0$, and $\rho = 0$. Yet $Y$ is completely determined by $X$: knowing $X = 2$ tells us $Y = 4$ exactly. The points form a U-shape, and a straight-line measure sees no pattern in it.`,
      ],
    },
  ],
};
