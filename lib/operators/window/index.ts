// Window Operators ($setWindowFields)
// Window operators return values from a defined span of documents from a collection, known as a window. They are only
// available in the output of the $setWindowFields stage. Accumulators such as $Sum, $Average, $FirstN or $Median can
// also be used as window operators.

import { Expression } from '../../models';
import { NumericExpression } from '../../models/core/expression';

/**
 * The time unit used by $Derivative and $Integral when the sortBy field of $setWindowFields is a date.
 */
export type WindowTimeUnit = 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

/**
 * Returns the document position (known as the rank) relative to other documents in the $setWindowFields stage
 * partition. Documents with the same sortBy value receive the same rank, and the next rank skips the tied positions
 * (e.g. 1, 2, 2, 4). The sortBy option of $setWindowFields is required. Available starting MongoDB 5.0.
 * @constructor
 */
export const $Rank = () => (
  { $rank: {} }
);

/**
 * Returns the document position (known as the rank) relative to other documents in the $setWindowFields stage
 * partition. Documents with the same sortBy value receive the same rank, and the next rank does not skip any position
 * (e.g. 1, 2, 2, 3). The sortBy option of $setWindowFields is required. Available starting MongoDB 5.0.
 * @constructor
 */
export const $DenseRank = () => (
  { $denseRank: {} }
);

/**
 * Returns the position of a document (known as the document number) in the $setWindowFields stage partition,
 * starting at 1. Unlike $Rank, ties get consecutive numbers. The sortBy option of $setWindowFields is required.
 * Available starting MongoDB 5.0.
 * @constructor
 */
export const $DocumentNumber = () => (
  { $documentNumber: {} }
);

/**
 * Returns the value of an expression applied to a document in a specified position relative to the current document
 * in the $setWindowFields stage partition (e.g. the previous or the next document). The sortBy option of
 * $setWindowFields is required and no window can be specified. Available starting MongoDB 5.0.
 * @param output The expression to evaluate on the target document.
 * @param offset The position of the target document relative to the current one: a negative integer for a previous
 *   document, a positive integer for a next document, 0 for the current document.
 * @param optional Optionals.
 * @constructor
 */
export const $Shift = (
  output: Expression,
  offset: number,
  optional: {
    /**
     * Optional. The value returned when the target document is outside the partition. Defaults to null.
     */
    defaultValue?: Exclude<Expression, undefined>;
  } = {},
) => (
  {
    $shift: {
      output,
      by: offset,
      ...(optional.defaultValue !== undefined ? { default: optional.defaultValue } : {}),
    },
  }
);

/**
 * Returns the average rate of change within the specified window, computed using the first and last documents in the
 * window. The sortBy option of $setWindowFields is required, and a window must be specified. Available starting
 * MongoDB 5.0.
 * @param input The numeric expression to compute the rate of change of.
 * @param optional Optionals.
 * @constructor
 */
export const $Derivative = (
  input: NumericExpression,
  optional: {
    /**
     * Required when the sortBy field is a date. The time unit of the result (e.g. 'hour' gives a rate per hour).
     */
    unit?: WindowTimeUnit;
  } = {},
) => (
  { $derivative: { input, ...optional } }
);

/**
 * Returns the approximation of the area under a curve, calculated using the trapezoidal rule where each set of
 * adjacent documents form a trapezoid. The sortBy option of $setWindowFields is required. Available starting
 * MongoDB 5.0.
 * @param input The numeric expression to integrate.
 * @param optional Optionals.
 * @constructor
 */
export const $Integral = (
  input: NumericExpression,
  optional: {
    /**
     * Required when the sortBy field is a date. The time unit of the sortBy values used in the calculation.
     */
    unit?: WindowTimeUnit;
  } = {},
) => (
  { $integral: { input, ...optional } }
);

/**
 * Returns the exponential moving average of numeric expressions applied to documents in a partition defined in the
 * $setWindowFields stage. The sortBy option of $setWindowFields is required and no window can be specified.
 * Available starting MongoDB 5.0.
 * @param input The numeric expression to compute the moving average of.
 * @param weighting How much weight is given to the most recent values, either:
 *   - periods: the number of historical documents that have a significant weight (e.g. { periods: 3 }), or
 *   - alpha: the exponential decay value to use, between 0 and 1 (e.g. { alpha: 0.75 }).
 * @constructor
 */
export const $ExponentialMovingAverage = (
  input: NumericExpression,
  weighting: { periods: number } | { alpha: number },
) => (
  {
    $expMovingAvg: 'periods' in weighting
      ? { input, N: weighting.periods }
      : { input, alpha: weighting.alpha },
  }
);

/**
 * Fills null and missing fields in a window using linear interpolation based on surrounding field values.
 * The sortBy option of $setWindowFields is required and no window can be specified. Available starting MongoDB 5.3.
 * @param expression The expression to fill the null or missing values of.
 * @constructor
 */
export const $LinearFill = (expression: Expression) => (
  { $linearFill: expression }
);

/**
 * Last Observation Carried Forward: sets null and missing field values in a window to the last non-null value of the
 * field. The sortBy option of $setWindowFields is required and no window can be specified. Available starting
 * MongoDB 5.2.
 * @param expression The expression to fill the null or missing values of.
 * @constructor
 */
export const $LastObservationCarriedForward = (expression: Expression) => (
  { $locf: expression }
);
