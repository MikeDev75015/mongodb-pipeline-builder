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
