// $Type Expression Operators

import { Expression } from '../../models';
import { NumericExpression, StringExpression } from '../../models/core/expression';
import { NumericIdentifier, StringIdentifier } from '../../models/core/identifiers';

/**
 * Converts a value to a specified type.
 * @param input can be any valid expression.
 * @param to can be any valid expression that resolves to one of the following numeric or string identifiers.
 * @param optional Optional. Additional arguments can be any valid expression.
 * @constructor
 */
export const $Convert = (
  input: Expression,
  to: StringExpression | NumericExpression | StringIdentifier | NumericIdentifier,
  optional: {
    /**
     * The value to return on encountering an error during conversion, including unsupported type conversions.
     */
    onError?: Expression,
    /**
     * The value to return if the input is null or missing. The arguments can be any valid expression. If unspecified,
     * $convert returns null if the input is null or missing.
     */
    onNull?: Expression,
  } = {},
) => (
  { $convert: { input, to, ...optional } }
);
/**
 * Returns boolean true if the specified expression resolves to an integer, decimal, double, or long.
 *
 * Returns boolean false if the expression resolves to any other BSON type, null, or a missing field.
 * @param expression
 * @constructor
 */
export const $IsNumber = (expression: Expression) => (
  { $isNumber: expression }
);
/**
 * Converts value to a boolean.
 * @param expression
 * @constructor
 */
export const $ToBool = (expression: Expression) => (
  { $toBool: expression }
);
/**
 * Converts value to a Decimal128.
 * @param expression
 * @constructor
 */
export const $ToDecimal = (expression: Expression) => (
  { $toDecimal: expression }
);
/**
 * Converts value to a double.
 * @param expression
 * @constructor
 */
export const $ToDouble = (expression: Expression) => (
  { $toDouble: expression }
);
/**
 * Converts value to an integer.
 * @param expression
 * @constructor
 */
export const $ToInt = (expression: Expression) => (
  { $toInt: expression }
);
/**
 * Converts value to a long.
 * @param expression
 * @constructor
 */
export const $ToLong = (expression: Expression) => (
  { $toLong: expression }
);
/**
 * Converts value to an ObjectId.
 * @param expression
 * @constructor
 */
export const $ToObjectId = (expression: Expression) => (
  { $toObjectId: expression }
);
/**
 * Return the BSON data type of the field.
 * @param expression
 * @constructor
 */
export const $Type = (expression: Expression) => (
  { $type: expression }
);
