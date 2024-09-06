// Conditional Expression Operators
import { BooleanExpression, Expression } from '../../models/core/expression';

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
export const $Condition = (
  booleanExpression: BooleanExpression,
  trueCase: Expression,
  falseCase: Expression,
) => (
  {
    $cond: [booleanExpression, trueCase, falseCase],
  }
);
/**
 * The $ifNull expression evaluates input expressions for null values and returns:
 *
 * The first non-null input expression value found.
 *
 * A replacement expression value if all input expressions evaluate to null.
 *
 * $ifNull treats undefined values and missing fields as null.
 * @param replaceWith The replacement expression value if all input expressions evaluate to null.
 * @param values A list of expressions to evaluate.
 * @constructor
 */
export const $IfNull = (replaceWith: Expression, ...values: Expression[]) => (
  { $ifNull: [...values, replaceWith] }
);

/**
 * Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a
 * specified expression and breaks out of the control flow.
 * @param branches An array of control branch documents. Each branch is a document with the following fields:
 *
 * case
 * Can be any valid expression that resolves to a boolean. If the result is not a boolean, it is coerced to a boolean
 * value. More information about how MongoDB evaluates expressions as either true or false can be found here.
 * then
 * Can be any valid expression.
 * The branches array must contain at least one branch document.
 * @param optional Optionals.
 * @constructor
 */
export const $Switch = (
  branches: { branchCase: BooleanExpression; thenDo: Expression; }[],
  optional: {
    /**
     * The path to take if no branch case expression evaluates to true.
     *
     * Although optional, if default is unspecified and no branch case evaluates to true, $switch returns an error.
     */
    defaultCase?: Expression;
  } = {},
) => (
  { $switch: { branches, ...(optional.defaultCase ? { default: optional.defaultCase } : {} ) } }
);
