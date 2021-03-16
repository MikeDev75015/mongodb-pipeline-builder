/**
 * Allows the use of aggregation expressions within the query language. The arguments can be any valid aggregation
 * expression.
 * @param expression
 * @constructor
 */
export const Expression = (expression: any) => ({ $expr: expression });
/**
 * Returns all documents whose specified field contains the searched value.
 * @param fieldName
 * @param searchedValue
 * @constructor
 */
export const Field = (fieldName: string, searchedValue: any) => {
    const newObject: {[index: string]: any} = {};
    newObject[fieldName] = searchedValue;
    return newObject;
};

// Literal Expression Operator

export const Literal = (value: any) => ({ $literal: value });

// Miscellaneous Operators

export const Rand = () => ({ $rand: {} });
export const SampleRate = (nonNegativeFloat: any) => ({ $sampleRate: nonNegativeFloat });

// Object Expression Operators

export const MergeObjects = (...documents: any) => ({ $mergeObjects: documents });

// Text Expression Operator

export const Meta = (metaDataKeyword: any) => ({ $meta: metaDataKeyword });

// Variable Expression Operators

export const Let = (vars: any, expression: any) => ({
    $let: { vars: vars, in: expression }
});
