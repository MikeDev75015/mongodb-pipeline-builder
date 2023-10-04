// Comparison Expression Operators
// Comparison expressions return a boolean except for $cmp which returns a number.
// The comparison expressions take two argument expressions and compare both value and type, using the specified BSON
// comparison order for values of different types.

/**
 * Compares two values and returns:
 * - -1 if the first value is less than the second.
 * - 1 if the first value is greater than the second.
 * - 0 if the two values are equivalent.
 * The $cmp compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $Compare = (a: any, b: any) => ({ $cmp: [a, b ] });
/**
 * Compares two values and returns:
 * - true when the values are equivalent.
 * - false when the values are not equivalent.
 * The $eq compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $Equal = (a: any, b: any) => ({ $eq: [a, b] });
/**
 * Compares two values and returns:
 * - true when the first value is greater than the second value.
 * - false when the first value is less than or equivalent to the second value.
 * The $gt compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $GreaterThan = (a: any, b: any) => ({ $gt: [a, b ] });
/**
 * Compares two values and returns:
 * - true when the first value is greater than or equivalent to the second value.
 * - false when the first value is less than the second value.
 * The $gte compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $GreaterThanEqual = (a: any, b: any) => ({ $gte: [a, b ] });
/**
 * Compares two values and returns:
 * - true when the first value is less than the second value.
 * - false when the first value is greater than or equivalent to the second value.
 * The $lt compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $LessThan = (a: any, b: any) => ({ $lt: [a, b ] });
/**
 * Compares two values and returns:
 * - true when the first value is less than or equivalent to the second value.
 * - false when the first value is greater than the second value.
 * The $lte compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $LessThanEqual = (a: any, b: any) => ({ $lte: [a, b] });
/**
 * Compares two values and returns:
 * - true when the values are not equivalent.
 * - false when the values are equivalent.
 * The $ne compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const $NotEqual = (a: any, b: any) => ({ $ne: [a, b] });
