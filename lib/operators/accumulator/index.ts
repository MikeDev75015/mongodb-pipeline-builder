// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums,
// minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the
// expression once for each input document, and maintain their stage for the group of documents that share the same
// group key.

import { Expression } from '../../models';
import { ArrayExpression, NumericExpression, StringExpression } from '../../models/core/expression';
import { SortBy } from '../../models/stages/sort-stage';

/**
 * Returns an array of unique expression values for each group. Order of the array elements is undefined.
 * @param expression
 * @constructor
 */
export const $AddToSet = (expression: ArrayExpression) => (
  { $addToSet: expression }
);

/**
 * Returns an average of numerical values. Ignores non-numeric values.
 * @param values
 * @constructor
 */
export const $Average = (...values: Expression[]) => (
  { $avg: values.length === 1 ? values[0] : values }
);

/**
 * Returns the bottom element within a group according to the specified sort order.
 * @param output Represents the output for each element in the group and can be any expression.
 * @param sortBy Specifies the order of results.
 * @constructor
 */
export const $Bottom = (sortBy: SortBy, ...output: StringExpression[]) => (
  { $bottom: { sortBy, output } }
);

/**
 * Returns an aggregation of the bottom n elements within a group, according to the specified sort order. If the group
 * contains fewer than n elements, $bottomN returns all elements in the group.
 * @param output represents the output for each element in the group and can be any expression.
 * @param sortBy specifies the order of results.
 * @param n limits the number of results per group and has to be a positive integral
 *   expression that is either a constant or depends on the _id value for $group.
 * @constructor
 */
export const $BottomN = (
  n: NumericExpression | { [key: string]: any },
  sortBy: SortBy,
  ...output: StringExpression[]
) => (
  { $bottomN: { output, sortBy, n } }
);

/**
 * Returns the number of documents in a group. Available in these stages: $bucket, $bucketAuto, $group, $setWindowFields
 *
 * $count does not accept any parameters.
 * @constructor
 */
export const $Count = () => (
  { $count: {} }
);

/**
 * Returns the highest expression value for each group.
 * @param expression The expression can be any valid expression.
 * @constructor
 */
export const $Max = (expression: NumericExpression | (number | NumericExpression)[]) => (
  { $max: expression }
);

/**
 * Returns the lowest expression value for each group.
 * @param expression The expression can be any valid expression.
 * @constructor
 */
export const $Min = (expression: NumericExpression | (number | NumericExpression)[]) => (
  { $min: expression }
);

/**
 * Returns an array of expression values for each group.
 * @param expression
 * @constructor
 */
export const $Push = (expression: Expression) => (
  { $push: expression }
);

/**
 * Returns the population standard deviation of the input values.
 *
 * When used in the $bucket, $bucketAuto, $group, and $setWindowFields stages, $stdDevPop has this syntax:
 * { $stdDevPop: <expression> }
 *
 * When used in other supported stages, $stdDevPop has one of two syntaxes:
 *
 * $stdDevPop has one specified expression as its operand:
 * { $stdDevPop: <expression> }
 *
 * $stdDevPop has a list of specified expressions as its operand:
 * { $stdDevPop: [ <expression1>, <expression2> ... ]  }
 *
 * The argument for $stdDevPop can be any expression as long as it resolves to an array.
 *
 * For more information on expressions, see Expression Operators.
 * @constructor
 * @param expressions can be any expressions as long as they resolve to arrays.
 */
export const $StdDevPop = (...expressions: ArrayExpression[]) => (
  { $stdDevPop: expressions.length === 1 ? expressions[0] : expressions }
);

/**
 * Returns the sample standard deviation of the input values.
 *
 * When used in the $bucket, $bucketAuto, $group, and $setWindowFields stages, $stdDevSamp has this syntax:
 * { $stdDevSamp: <expression> }
 *
 * When used in other supported stages, $stdDevSamp has one of two syntaxes:
 *
 * $stdDevSamp has one specified expression as its operand:
 * { $stdDevSamp: <expression> }
 *
 * $stdDevSamp has a list of specified expressions as its operand:
 * { $stdDevSamp: [ <expression1>, <expression2> ... ]  }
 *
 * The argument for $stdDevSamp can be any expression as long as it resolves to an array.
 *
 * For more information on expressions, see Expression Operators.
 * @param expressions can be any expressions as long as they resolve to arrays.
 * @constructor
 */
export const $StdDevSamp = (...expressions: ArrayExpression[]) => (
  { $stdDevSamp: expressions.length === 1 ? expressions[0] : expressions }
);

/**
 * Returns a sum of numerical values. Ignores non-numeric values.
 *
 * When used as an accumulator, $sum has this syntax:
 * { $sum: <expression> }
 *
 * When not used as an accumulator, $sum has this syntax:
 * { $sum: [ <expression1>, <expression2> ... ]  }
 *
 * For more information on expressions, see Expression Operators.
 * @param expressions can be any expressions as long as they resolve to numbers.
 * @constructor
 */
export const $Sum = (...expressions: NumericExpression[]) => (
  { $sum: expressions.length === 1 ? expressions[0] : expressions }
);
