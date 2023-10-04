// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums,
// minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the
// expression once for each input document, and maintain their stage for the group of documents that share the same
// group key.

/**
 * Returns an array of unique expression values for each group. Order of the array elements is undefined.
 * @param expression
 * @constructor
 */
export const $AddToSet = (expression: any) => ({ $addToSet: expression });
/**
 * Returns an average of numerical values. Ignores non-numeric values.
 * @param expression
 * @constructor
 */
export const $Avg = (expression: any) => ({ $avg: expression });
/**
 * Returns the highest expression value for each group.
 * @param expression
 * @constructor
 */
export const $Max = (expression: any) => ({ $max: expression });
/**
 * Returns the lowest expression value for each group.
 * @param expression
 * @constructor
 */
export const $Min = (expression: any) => ({ $min: expression });
/**
 * Returns an array of expression values for each group.
 * @param expression
 * @constructor
 */
export const $Push = (expression: any) => ({ $push: expression });
/**
 * Returns the population standard deviation of the input values.
 * @param expression
 * @constructor
 */
export const $StdDevPop = (expression: any) => ({ $stdDevPop: expression });
/**
 * Returns the sample standard deviation of the input values.
 * @param expression
 * @constructor
 */
export const $StdDevSamp = (expression: any) => ({ $stdDevSamp: expression });
/**
 * Returns a sum of numerical values. Ignores non-numeric values.
 * @param expression
 * @constructor
 */
export const $Sum = (expression: any) => ({ $sum: expression });
