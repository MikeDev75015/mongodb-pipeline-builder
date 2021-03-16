// Conditional Expression Operators
/**
 * Evaluates a boolean expression to return one of the two specified return expressions.
 * $cond requires all three arguments (if-then-else) for either syntax.
 * If the <boolean-expression> evaluates to true, then $cond evaluates and returns the value of the <true-case>
 * expression. Otherwise, $cond evaluates and returns the value of the <false-case> expression.
 * The arguments can be any valid expression. For more information on expressions, see Expressions.
 * @param booleanExpression
 * @param trueCase
 * @param falseCase
 * @constructor
 */
export const Cond = (booleanExpression: any, trueCase: any, falseCase: any) => ({
    $cond: [ booleanExpression, trueCase, falseCase ]
});
/**
 * Evaluates an expression and returns the value of the expression if the expression evaluates to a non-null value. If
 * the expression evaluates to a null value, including instances of undefined values or missing fields, returns the
 * value of the replacement expression.
 * @param value
 * @param replaceWith
 * @constructor
 */
export const IfNull = (value: any, replaceWith: any) => ({ $ifNull: [ value, replaceWith ] });
/**
 * Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a
 * specified expression and breaks out of the control flow.
 * @param branchList
 * @param defaultCase
 * @constructor
 */
export const Switch = (branchList: { branchCase: any; thenDo: any; }[], defaultCase: any) => ({
    $switch: {
        branches: branchList,
        default: defaultCase
    }
});
