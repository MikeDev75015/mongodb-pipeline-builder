/**
 * Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
 *
 * $match takes a document that specifies the query conditions. The query syntax is identical to the read operation
 * query syntax; i.e. $match does not accept raw aggregation expressions. Instead, use a $expr query expression to
 * include aggregation expression in $match.
 *
 * Pipeline Optimization
 * - Place the $match as early in the aggregation pipeline as possible. Because $match limits the total number of
 * documents in the aggregation pipeline, earlier $match operations minimize the amount of processing down the pipe.
 * - If you place a $match at the very beginning of a pipeline, the query can take advantage of indexes like any other
 * db.collection.find() or db.collection.findOne().
 *
 * Restrictions
 * - The $match query syntax is identical to the read operation query syntax; i.e. $match does not accept raw
 * aggregation expressions. To include aggregation expression in $match, use a $expr query expression.
 *
 * @param query
 * @constructor
 */
export const Match = (query: any) => ({ $match: query });

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
