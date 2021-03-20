// Literal Expression Operator
/**
 * Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For
 * example, use a $literal expression to a string that starts with a $ to avoid parsing as a field path.
 * @param value
 * @constructor
 */
export const Literal = (value: any) => ({ $literal: value });

// Miscellaneous Operators
/**
 * Returns a random float between 0 and 1
 * @constructor
 */
export const Rand = () => ({ $rand: {} });
/**
 * Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the
 * quantity chosen approximates the sample rate expressed as a percentage of the total number of documents.
 * @param nonNegativeFloat
 * @constructor
 */
export const SampleRate = (nonNegativeFloat: any) => ({ $sampleRate: nonNegativeFloat });

// Object Expression Operators
/**
 * Combines multiple documents into a single document.
 * @param documents
 * @constructor
 */
export const MergeObjects = (...documents: any) => ({ $mergeObjects: documents });

// Text Expression Operator
/**
 * Access available per-document metadata related to the aggregation operation.
 * @param metaDataKeyword
 * @constructor
 */
export const Meta = (metaDataKeyword: any) => ({ $meta: metaDataKeyword });

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
export const Let = (vars: any, expression: any) => ({
    $let: { vars: vars, in: expression }
});
