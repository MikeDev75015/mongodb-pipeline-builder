import { NumericExpression } from '../../models/core/expression';

/**
 * Returns the result of a bitwise and operation on an array of int or long values.
 * @param expressions int or long values
 * @constructor
 */
export const $BitwiseAnd = (...expressions: NumericExpression[]) => (
  {
    $bitAnd: expressions.length === 1 && `${expressions[0]}`.includes('$')
      ? expressions[0]
      : expressions,
  }
);

/**
 * Returns the result of a bitwise not operation on a single int or long value.
 * @param expression int or long element
 * @constructor
 */
export const $BitwiseNot = (expression: NumericExpression) => (
  { $bitNot: expression }
);

/**
 * Returns the result of a bitwise or operation on an array of int and long values.
 * @param expressions int or long values
 * @constructor
 */
export const $BitwiseOr = (...expressions: NumericExpression[]) => (
  {
    $bitOr: expressions.length === 1 && `${expressions[0]}`.includes('$')
      ? expressions[0]
      : expressions,
  }
);

/**
 * Returns the result of a bitwise xor (exclusive or) operation on an array of int and long values.
 * @param expressions int or long valuesv
 */
export const $BitwiseXor = (...expressions: NumericExpression[]) => (
  {
    $bitXor: expressions.length === 1 && `${expressions[0]}`.includes('$')
      ? expressions[0]
      : expressions,
  }
);
