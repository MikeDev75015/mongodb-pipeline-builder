// Comparison Expression Operators
// Comparison expressions return a boolean except for $cmp which returns a number.
// The comparison expressions take two argument expressions and compare both value and type, using the specified BSON
// comparison order for values of different types.

import { Expression } from '../../models';
import { NumericExpression } from '../../models/core/expression';

/**
 * Compares two values and returns:
 * - -1 if the first value is less than the second.
 * - 1 if the first value is greater than the second.
 * - 0 if the two values are equivalent.
 * The $cmp compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a The first expression to compare.
 * @param b The second expression to compare.
 * @constructor
 */
export const $Compare = (a: Expression, b: Expression) => (
  { $cmp: [a, b] }
);

/**
 * Compares two values and returns:
 * - true when the values are equivalent.
 * - false when the values are not equivalent.
 * The $eq compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $Equal = (a: Expression, b: Expression) => (
  { $eq: [a, b] }
);

/**
 * Compares two values and returns:
 * - true when the first value is greater than the second value.
 * - false when the first value is less than or equivalent to the second value.
 * The $gt compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $GreaterThan = (a: NumericExpression, b: NumericExpression) => (
  { $gt: [a, b] }
);

/**
 * Compares two values and returns:
 * - true when the first value is greater than or equivalent to the second value.
 * - false when the first value is less than the second value.
 * The $gte compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $GreaterThanEqual = (a: NumericExpression, b: NumericExpression) => (
  { $gte: [a, b] }
);

/**
 * Compares two values and returns:
 * - true when the first value is less than the second value.
 * - false when the first value is greater than or equivalent to the second value.
 * The $lt compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $LessThan = (a: NumericExpression, b: NumericExpression) => (
  { $lt: [a, b] }
);

/**
 * Compares two values and returns:
 * - true when the first value is less than or equivalent to the second value.
 * - false when the first value is greater than the second value.
 * The $lte compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $LessThanEqual = (a: NumericExpression, b: NumericExpression) => (
  { $lte: [a, b] }
);

/**
 * Compares two values and returns:
 * - true when the values are not equivalent.
 * - false when the values are equivalent.
 * The $ne compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $NotEqual = (a: Expression, b: Expression) => (
  { $ne: [a, b] }
);
