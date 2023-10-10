// $Literal Expression Operator
import { Expression, FunctionExpression, NumericExpression, ObjectExpression } from '../../models/core/expression';

/**
 * Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For
 * example, use a $literal expression to a string that starts with a $ to avoid parsing as a field path.
 * @param value
 * @constructor
 */
export const $Literal = (value: Expression) => (
  { $literal: value }
);

// Miscellaneous Operators
/**
 * Returns a random float between 0 and 1
 * @constructor
 */
export const $Rand = () => (
  { $rand: {} }
);
/**
 * Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the
 * quantity chosen approximates the sample rate expressed as a percentage of the total number of documents.
 * @param nonNegativeFloat
 * @constructor
 */
export const $SampleRate = (nonNegativeFloat: NumericExpression) => (
  { $sampleRate: nonNegativeFloat }
);

// Object $Expression Operators
/**
 * Allows the use of aggregation expressions within the query language. The arguments can be any valid aggregation
 * expression.
 * @param expression
 * @constructor
 */
export const $Expression = (expression: Expression) => (
  { $expr: expression }
);
/**
 * Combines multiple documents into a single document.
 * @param documents
 * @constructor
 */
export const $MergeObjects = (...documents: ObjectExpression[]) => (
  { $mergeObjects: documents }
);

// Text Expression Operator
/**
 * Access available per-document metadata related to the aggregation operation.
 * @param metaDataKeyword. The available keywords are: 'textScore', 'indexKey'.
 *
 * If the keyword is 'textScore', $meta returns the score associated with the corresponding $text query for each
 * matching document. The text score signifies how well the document matched the search term or terms.
 *
 * If the keyword is 'indexKey', $meta returns an index key for the document if a non-text index is used. The
 * { $meta: "indexKey" } expression is for debugging purposes only, and not for application logic, and is preferred
 * over cursor.returnKey().
 * @constructor
 */
export const $Meta = (metaDataKeyword: 'textScore' | 'indexKey') => (
  { $meta: metaDataKeyword }
);

// Variable Expression Operators
/**
 * Defines variables for use within the scope of a subexpression and returns the result of the subexpression.
 * Accepts named parameters.
 *
 * Accepts any number of argument expressions.
 * @param vars
 * @param expression
 * @constructor
 */
export const $Let = (vars: ObjectExpression, expression: FunctionExpression) => (
  {
    $let: { vars, in: expression },
  }
);
/**
 * Returns the population covariance of two numeric expressions that are evaluated using documents in the
 * $setWindowFields stage window.
 * @param numericExpression1
 * @param numericExpression2
 */
export const $CovariancePop = (
  numericExpression1: NumericExpression,
  numericExpression2: NumericExpression,
) => (
  { $covariancePop: [numericExpression1, numericExpression2] }
);
/**
 * Returns the sample covariance of two numeric expressions that are evaluated using documents in the $setWindowFields
 * stage window.
 * @param numericExpression1
 * @param numericExpression2
 */
export const $CovarianceSamp = (
  numericExpression1: NumericExpression,
  numericExpression2: NumericExpression,
) => (
  { $covarianceSamp: [numericExpression1, numericExpression2] }
);
