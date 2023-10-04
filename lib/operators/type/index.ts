// $Type Expression Operators

/**
 * Converts a value to a specified type.
 * @param input
 * @param to
 * @param onError
 * @param onNull
 * @constructor
 */
export const $Convert = (input: any, to: any, onError?: any, onNull?: any) => ({
    $convert:
        {
            input,
            to,
            onError,  // Optional.
            onNull    // Optional.
        }
});
/**
 * Returns boolean true if the specified expression resolves to an integer, decimal, double, or long.
 *
 * Returns boolean false if the expression resolves to any other BSON type, null, or a missing field.
 * @param expression
 * @constructor
 */
export const $IsNumber = (expression: any) => ({ $isNumber: expression });
/**
 * Converts value to a boolean.
 * @param expression
 * @constructor
 */
export const $ToBool = (expression: any) => ({ $toBool: expression });
/**
 * Converts value to a Decimal128.
 * @param expression
 * @constructor
 */
export const $ToDecimal = (expression: any) => ({ $toDecimal: expression });
/**
 * Converts value to a double.
 * @param expression
 * @constructor
 */
export const $ToDouble = (expression: any) => ({ $toDouble: expression });
/**
 * Converts value to an integer.
 * @param expression
 * @constructor
 */
export const $ToInt = (expression: any) => ({ $toInt: expression });
/**
 * Converts value to a long.
 * @param expression
 * @constructor
 */
export const $ToLong = (expression: any) => ({ $toLong: expression });
/**
 * Converts value to an ObjectId.
 * @param expression
 * @constructor
 */
export const $ToObjectId = (expression: any) => ({ $toObjectId: expression });
/**
 * Return the BSON data type of the field.
 * @param expression
 * @constructor
 */
export const $Type = (expression: any) => ({ $type: expression });
