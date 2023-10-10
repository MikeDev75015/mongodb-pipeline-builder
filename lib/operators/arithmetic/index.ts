// Arithmetic Expression Operators
import { NumericExpression } from '../../models/core/expression';

/**
 * Returns the absolute value of a number.
 * @param num can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const $Absolute = (num: NumericExpression) => (
  { $abs: num }
);
/**
 * Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats
 * the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a
 * date.
 * @param args can be any valid expression as long as they resolve to either all numbers or to numbers and a date.
 * @constructor
 */
export const $Add = (...args: NumericExpression[]) => (
  { $add: args }
);
/**
 * Returns the smallest integer greater than or equal to the specified number.
 * @constructor
 * @param num can be any valid expression as long as it resolves to a number.
 */
export const $Ceil = (num: NumericExpression) => (
  { $ceil: num }
);
/**
 * Returns the result of dividing the first number by the second. Accepts two argument expressions.
 * @param dividend can be any valid expression as long as it resolve to a number.
 * @param divisor can be any valid expression as long as it resolve to a number.
 * @constructor
 */
export const $Divide = (dividend: NumericExpression, divisor: NumericExpression) => (
  { $divide: [dividend, divisor] }
);
/**
 * Raises e to the specified exponent.
 * @param exponent can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const $Exponent = (exponent: NumericExpression) => (
  { $exp: exponent }
);
/**
 * Returns the largest integer less than or equal to the specified number.
 * @param num can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const $Floor = (num: NumericExpression) => (
  { $floor: num }
);
/**
 * Calculates the natural log of a number.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @constructor
 */
export const $NaturalLog = (num: NumericExpression) => (
  { $ln: num }
);
/**
 * Calculates the log of a number in the specified base.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @param base can be any valid expression as long as it resolves to a positive number greater than 1.
 * @constructor
 */
export const $Log = (num: NumericExpression, base: NumericExpression) => (
  { $log: [num, base] }
);
/**
 * Calculates the log base 10 of a number.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @constructor
 */
export const $Log10 = (num: NumericExpression) => (
  { $log10: num }
);
/**
 * Returns the remainder of the first number divided by the second. Accepts two argument expressions.
 * @param dividend can be any valid expression as long as it resolves to a number.
 * @param divisor can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const $Mod = (dividend: NumericExpression, divisor: NumericExpression) => (
  { $mod: [dividend, divisor] }
);
/**
 * Multiplies numbers to return the product. Accepts any number of argument expressions.
 * @param args can be any valid expression as long as they resolve to numbers.
 * @constructor
 */
export const $Multiply = (...args: NumericExpression[]) => (
  { $multiply: args }
);
/**
 * Raises a number to the specified exponent.
 * @param num can be any valid expression as long as it resolves to a number.
 * @param exponent can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const $Pow = (num: NumericExpression, exponent: NumericExpression) => (
  { $pow: [num, exponent] }
);
/**
 * Rounds a number to to a whole integer or to a specified decimal place.
 * @param num can be any valid expression that resolves to a number. Specifically, the expression must resolve to an
 * integer, double, decimal, or long.
 * @param place can be any valid expression that resolves to an integer between -20 and 100, exclusive.
 * e.g. -20 < place < 100. Defaults to 0 if unspecified.
 * @constructor
 */
export const $Round = (num: NumericExpression, place?: NumericExpression) => (
  { $round: [num, place] }
);
/**
 * Calculates the square root of a positive number and returns the result as a double.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @constructor
 */
export const $Sqrt = (num: NumericExpression) => (
  { $sqrt: num }
);
/**
 * Returns the result of subtracting the second value from the first. If the two values are numbers, return the
 * difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a
 * number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date
 * and a number, specify the date argument first as it is not meaningful to subtract a date from a number.
 * @param expression1 can be any valid expression as long as it resolves to a number and/or a date.
 * @param expression2 can be any valid expression as long as it resolves to a number and/or a date.
 * @constructor
 */
export const $Subtract = (expression1: NumericExpression, expression2: NumericExpression) => (
  { $subtract: [expression1, expression2] }
);
/**
 * Truncates a number to a whole integer or to a specified decimal place.
 * @param num can be any valid expression that resolves to a number. Specifically, the expression must resolve to an
 * integer, double, decimal, or long.
 * @param place Optional Can be any valid expression that resolves to an integer between -20 and 100, exclusive. e.g.
 * -20 < place < 100. Defaults to 0 if unspecified.
 * @constructor
 */
export const $Trunc = (num: NumericExpression, place?: NumericExpression) => (
  { $trunc: [num, place] }
);
