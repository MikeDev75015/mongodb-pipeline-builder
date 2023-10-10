// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers.
// Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees
// to convert between degree and radian measurements.

import { Expression } from '../../models';
import { NumericExpression } from '../../models/core/expression';

/**
 * Returns the sine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Sin = (expression: NumericExpression) => (
  { $sin: expression }
);
/**
 * Returns the cosine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Cosine = (expression: NumericExpression) => (
  { $cos: expression }
);
/**
 * Returns the tangent of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Tan = (expression: NumericExpression) => (
  { $tan: expression }
);
/**
 * Returns the inverse sin (arc sine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $ArcSine = (expression: NumericExpression) => (
  { $asin: expression }
);
/**
 * Returns the inverse cosine (arc cosine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $ArcCosine = (expression: NumericExpression) => (
  { $acos: expression }
);
/**
 * Returns the inverse tangent (arc tangent) of a value in radians.
 * @param expression
 * @constructor
 */
export const $ArcTangent = (expression: NumericExpression) => (
  { $atan: expression }
);
/**
 * Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed
 * to the expression respectively.
 * @param expression1
 * @param expression2
 * @constructor
 */
export const $ArcTangent2 = (expression1: NumericExpression, expression2: NumericExpression) => (
  { $atan2: [expression1, expression2] }
);
/**
 * Returns the inverse hyperbolic sine (hyperbolic arc sine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $ArcSineHyperbolic = (expression: NumericExpression) => (
  { $asinh: expression }
);
/**
 * Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $ArcCosineHyperbolic = (expression: NumericExpression) => (
  { $acosh: expression }
);
/**
 * Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians.
 * @param expression
 * @constructor
 */
export const $ArcTangentHyperbolic = (expression: NumericExpression) => (
  { $atanh: expression }
);
/**
 * Returns the hyperbolic sine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Sinh = (expression: NumericExpression) => (
  { $sinh: expression }
);
/**
 * Returns the hyperbolic cosine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $CosineHyperbolic = (expression: Expression) => ({ $cosh: expression });
/**
 * Returns the hyperbolic tangent of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Tanh = (expression: NumericExpression) => (
  { $tanh: expression }
);
/**
 * Converts a value from degrees to radians.
 * @param expression
 * @constructor
 */
export const $DegreesToRadians = (expression: NumericExpression) => ({ $degreesToRadians: expression });
/**
 * Converts a value from radians to degrees.
 * @param expression
 * @constructor
 */
export const $RadiansToDegrees = (expression: NumericExpression) => (
  { $radiansToDegrees: expression }
);
