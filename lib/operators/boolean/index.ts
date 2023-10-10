// Boolean Expression Operators
// Boolean expressions evaluate their argument expressions as booleans and return a boolean as the result.
// $In addition to the false boolean value, Boolean expression evaluates as false the following: null, 0, and undefined
// values. The Boolean expression evaluates all other values as true, including non-zero numeric values and arrays.

import { BooleanExpression } from '../../models/core/expression';

/**
 * Evaluates one or more expressions and returns true if all of the expressions are true or if evoked with no argument
 * expressions. Otherwise, $and returns false. $and uses short-circuit logic: the operation stops evaluation after
 * encountering the first false expression. $In addition to the false boolean value, $and evaluates as false the
 * following: null, 0, and undefined values. The $and evaluates all other values as true, including non-zero numeric
 * values and arrays.
 * @param args
 * @constructor
 */
export const $And = (...args: BooleanExpression[]) => (
  { $and: args }
);

/**
 * Evaluates a boolean and returns the opposite boolean value; i.e. when passed an expression that evaluates to true,
 * $not returns false; when passed an expression that evaluates to false, $not returns true. $In addition to the false
 * boolean value, $not evaluates as false the following: null, 0, and undefined values. The $not evaluates all other
 * values as true, including non-zero numeric values and arrays.
 * @param expression to evaluate
 * @constructor
 */
export const $Not = (expression: BooleanExpression) => (
  { $not: [expression] }
);

/**
 * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, $or returns false.
 * $or uses short-circuit logic: the operation stops evaluation after encountering the first true expression. $In
 * addition to the false boolean value, $or evaluates as false the following: null, 0, and undefined values. The $or
 * evaluates all other values as true, including non-zero numeric values and arrays.
 * @param args
 * @constructor
 */
export const $Or = (...args: BooleanExpression[]) => (
  { $or: args }
);
