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
 * Returns an aggregation of the first n elements within a group. The elements returned are meaningful only if in a
 * specified sort order. If the group contains fewer than n elements, $firstN returns all elements in the group.
 * Also available as an array operator to return the first n elements of an array. Available starting MongoDB 5.2.
 * @param input The value to take the first n elements from (in $group), or the array (as an array operator).
 * @param n The number of elements to return, a positive integral expression that is either a constant or depends on
 *   the _id value for $group.
 * @constructor
 */
export const $FirstN = (input: Expression, n: NumericExpression) => (
  { $firstN: { input, n } }
);

/**
 * Returns an aggregation of the last n elements within a group. The elements returned are meaningful only if in a
 * specified sort order. If the group contains fewer than n elements, $lastN returns all elements in the group.
 * Also available as an array operator to return the last n elements of an array. Available starting MongoDB 5.2.
 * @param input The value to take the last n elements from (in $group), or the array (as an array operator).
 * @param n The number of elements to return, a positive integral expression that is either a constant or depends on
 *   the _id value for $group.
 * @constructor
 */
export const $LastN = (input: Expression, n: NumericExpression) => (
  { $lastN: { input, n } }
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
 * Returns an aggregation of the maximum value n elements within a group. If the group contains fewer than n elements,
 * $maxN returns all elements in the group. Null and missing values are ignored.
 * Also available as an array operator to return the n largest values of an array. Available starting MongoDB 5.2.
 * @param input The values to take the n largest from (in $group), or the array (as an array operator).
 * @param n The number of elements to return, a positive integral expression that is either a constant or depends on
 *   the _id value for $group.
 * @constructor
 */
export const $MaxN = (input: Expression, n: NumericExpression) => (
  { $maxN: { input, n } }
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
 * Returns an aggregation of the minimum value n elements within a group. If the group contains fewer than n elements,
 * $minN returns all elements in the group. Null and missing values are ignored.
 * Also available as an array operator to return the n smallest values of an array. Available starting MongoDB 5.2.
 * @param input The values to take the n smallest from (in $group), or the array (as an array operator).
 * @param n The number of elements to return, a positive integral expression that is either a constant or depends on
 *   the _id value for $group.
 * @constructor
 */
export const $MinN = (input: Expression, n: NumericExpression) => (
  { $minN: { input, n } }
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

/**
 * Returns an approximation of the median, the 50th percentile, as a scalar value.
 * Available in $group, $setWindowFields and as an expression in other stages starting MongoDB 7.0.
 *
 * In $group and $setWindowFields, the input is a single expression evaluated for each document.
 * As an expression, the input can also be an array of values or expressions.
 * @param input The numeric value(s) to compute the median of. Non-numeric values are ignored.
 * @param method The calculation method. Defaults to 'approximate', the only method currently accepted by MongoDB.
 * @constructor
 */
export const $Median = (
  input: NumericExpression | NumericExpression[],
  method: 'approximate' | 'exact' = 'approximate',
) => (
  { $median: { input, method } }
);

/**
 * Returns an array of scalar values that correspond to the specified percentile values.
 * Available in $group, $setWindowFields and as an expression in other stages starting MongoDB 7.0.
 * @param input The numeric value(s) to compute the percentiles of. Non-numeric values are ignored.
 * @param percentiles The percentiles to compute, each between 0.0 and 1.0 (e.g. [0.5, 0.9] for the median and the 90th
 *   percentile).
 * @param method The calculation method. Defaults to 'approximate', the only method currently accepted by MongoDB.
 * @constructor
 */
export const $Percentile = (
  input: NumericExpression | NumericExpression[],
  percentiles: NumericExpression[],
  method: 'approximate' | 'exact' = 'approximate',
) => (
  { $percentile: { input, p: percentiles, method } }
);

/**
 * Returns the top element within a group according to the specified sort order.
 * Available in $group, $bucket, $bucketAuto, and $setWindowFields stages.
 * @param sortBy Specifies the order of results
 * @param output Represents the output for each element in the group
 * @constructor
 */
export const $Top = (
  sortBy: SortBy,
  ...output: StringExpression[]
) => (
  { $top: { sortBy, output } }
);

/**
 * Returns an aggregation of the top n elements within a group according to the specified sort order.
 * If the group contains fewer than n elements, $topN returns all elements in the group.
 * @param n limits the number of results per group
 * @param sortBy specifies the order of results
 * @param output represents the output for each element in the group
 * @constructor
 */
export const $TopN = (
  n: NumericExpression | { [key: string]: any },
  sortBy: SortBy,
  ...output: StringExpression[]
) => (
  { $topN: { output, sortBy, n } }
);
