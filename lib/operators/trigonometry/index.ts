// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers.
// Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees
// to convert between degree and radian measurements.

/**
 * Returns the sine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Sin = (expression: any) => ({ $sin: expression });
/**
 * Returns the cosine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Cos = (expression: any) => ({ $cos: expression });
/**
 * Returns the tangent of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Tan = (expression: any) => ({ $tan: expression });
/**
 * Returns the inverse sin (arc sine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $Asin = (expression: any) => ({ $asin: expression });
/**
 * Returns the inverse cosine (arc cosine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $Acos = (expression: any) => ({ $acos: expression });
/**
 * Returns the inverse tangent (arc tangent) of a value in radians.
 * @param expression
 * @constructor
 */
export const $Atan = (expression: any) => ({ $atan: expression });
/**
 * Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed
 * to the expression respectively.
 * @param expression1
 * @param expression2
 * @constructor
 */
export const $Atan2 = (expression1: any, expression2: any) => ({ $atan2: [expression1, expression2 ] });
/**
 * Returns the inverse hyperbolic sine (hyperbolic arc sine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $Asinh = (expression: any) => ({ $asinh: expression });
/**
 * Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians.
 * @param expression
 * @constructor
 */
export const $Acosh = (expression: any) => ({ $acosh: expression });
/**
 * Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians.
 * @param expression
 * @constructor
 */
export const $Atanh = (expression: any) => ({ $atanh: expression });
/**
 * Returns the hyperbolic sine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Sinh = (expression: any) => ({ $sinh: expression });
/**
 * Returns the hyperbolic cosine of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Cosh = (expression: any) => ({ $cosh: expression });
/**
 * Returns the hyperbolic tangent of a value that is measured in radians.
 * @param expression
 * @constructor
 */
export const $Tanh = (expression: any) => ({ $tanh: expression });
/**
 * Converts a value from degrees to radians.
 * @param expression
 * @constructor
 */
export const $DegreesToRadians = (expression: any) => ({ $degreesToRadians: expression });
/**
 * Converts a value from radians to degrees.
 * @param expression
 * @constructor
 */
export const $RadiansToDegrees = (expression: any) => ({ $radiansToDegrees: expression });
