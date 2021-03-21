/**
 * Allows the use of aggregation expressions within the query language. The arguments can be any valid aggregation
 * expression.
 * @param expression
 * @constructor
 */
export const Expression = (expression: any) => ({ $expr: expression });
