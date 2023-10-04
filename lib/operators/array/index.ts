// Array Expression Operators

/**
 * Returns the element at the specified array index.
 * If the <idx> expression resolves to zero or a positive integer, $arrayElemAt returns the element at the idx position,
 * counting from the start of the array.
 * If the <idx> expression resolves to a negative integer, $arrayElemAt returns the element at the idx position, counting
 * from the end of the array.
 * If idx exceeds the array bounds, $arrayElemAt does not return a result.
 * @param array can be any valid expression that resolves to an array.
 * @param index can be any valid expression that resolves to an integer:
 * @constructor
 */
export const $ArrayElemAt = (array: any, index: number) => ({ $arrayElemAt: [array, index ] });
/**
 * Converts an array into a single document; the array must be either:
 * - An array of two-element arrays where the first element is the field name, and the second element is the field value:
 * [ [ "item", "abc123"], [ "qty", 25 ] ]
 * OR
 * - An array of documents that contains two fields, k and v where the k field contains the field name and the v field
 * contains the value of the field: [ { "k": "item", "v": "abc123"}, { "k": "qty", "v": 25 } ]
 * @param literal returns a value without parsing. Use for values that the aggregation pipeline may interpret as an
 * expression.
 * @param array can be any valid expression that resolves to an array of two-element arrays or array of documents that
 * contains “k” and “v” fields.
 * @constructor
 */
export const $ArrayToObject = (literal: boolean, array: any) => literal
    ? ({ $arrayToObject: { $literal: array } })
    : ({ $arrayToObject: array });
/**
 * Concatenates arrays to return the concatenated array.
 * If any argument resolves to a value of null or refers to a field that is missing, $concatArrays returns null.
 * @param arrayOfArrays can be any valid expression as long as they resolve to an array.
 * @constructor
 */
export const $ConcatArrays = (...arrayOfArrays: any) => ({ $concatArrays: arrayOfArrays });
/**
 * Selects a subset of an array to return based on the specified condition. Returns an array with only those elements
 * that match the condition. The returned elements are in the original order.
 * @param array can be any expression that resolves to an array.
 * @param as Optional. A name for the variable that represents each individual element of the input array. If no name is
 * specified, the variable name defaults to this.
 * @param condition can be an expression that resolves to a boolean value used to determine if an element should be
 * included in the output array. The expression references each element of the input array individually with the
 * variable name specified in as.
 * @constructor
 */
export const $Filter = (array: any, condition: any, as = 'this') => ({ $filter: { input: array, as, cond: condition } });
/**
 * Returns the first element in an array.
 * @param array
 * @constructor
 */
export const $First = (array: any) => ({ $first: array });
/**
 * Returns a boolean indicating whether a specified value is in an array.
 * @param elementToFind can be any valid expression.
 * @param array can be any valid expression that resolves to an array.
 * @constructor
 */
export const $In = (elementToFind: any, array: any) => ({ $in: [elementToFind, array ] });
/**
 * Searches an array for an occurrence of a specified value and returns the array index (zero-based) of the first
 * occurrence. If the value is not found, returns -1. If the array expression resolves to a value of null or refers to a
 * field that is missing, $indexOfArray returns null. If the array expression does not resolve to an array or null nor
 * refers to a missing field, $indexOfArray returns an error.
 * @param array can be any valid expression as long as it resolves to an array.
 * @param elementToFind can be any valid expression.
 * @param startIndex Optional. An integer, or a number that can be represented as integers, that specifies the starting
 * index position for the search. Can be any valid expression that resolves to a non-negative integral number. If
 * unspecified, the starting index position for the search is the beginning of the string.
 * @param endIndex Optional. An integer, or a number that can be represented as integers, that specifies the ending
 * index position for the search. Can be any valid expression that resolves to a non-negative integral number. If you
 * specify a <end> index value, you should also specify a <start> index value; otherwise, $indexOfArray uses the <end>
 * value as the <start> index value instead of the <end> value.
 * @constructor
 */
export const $IndexOfArray = (array: any, elementToFind: any, startIndex = 0, endIndex?: number) => ({
    $indexOfArray: [ array, elementToFind, startIndex, endIndex ]
});
/**
 * Determines if the operand is an array. Returns a boolean.
 * @param elementToVerify can be any valid expression.
 * @constructor
 */
export const $IsArray = (elementToVerify: any) => ({ $isArray: elementToVerify });
/**
 * Returns the last element in an array. The $last operator is an alias for the following $arrayElemAt expression:
 * { $arrayElemAt: [ array, -1 ] }
 * @param array can be any valid expression as long as it resolves to an array, null, or missing.
 * @constructor
 */
export const $Last = (array: any) => ({ $last: array });
/**
 * Applies an expression to each item in an array and returns an array with the applied results.
 * @param array can be any expression that resolves to an array.
 * @param as Optional. A name for the variable that represents each individual element of the input array. If no name is
 * specified, the variable name defaults to this.
 * @param apply is an expression that is applied to each element of the input array. The expression references each
 * element individually with the variable name specified in as.
 * @constructor
 */
export const $Map = (array: any, apply: any, as = 'this') => ({ $map: { input: array, as, in: apply } });
/**
 * Converts a document to an array. The return array contains an element for each field/value pair in the original
 * document. Each element in the return array is a document that contains two fields k and v:
 * - The k field contains the field name in the original document.
 * - The v field contains the value of the field in the original document.
 * @param object can be any valid expression as long as it resolves to a document object. $objectToArray applies to the
 * top-level fields of its argument. If the argument is a document that itself contains embedded document fields, the
 * $objectToArray does not recursively apply to the embedded document fields.
 * @constructor
 */
export const $ObjectToArray = (object: any) => ({ $objectToArray: object });
/**
 * Returns an array whose elements are a generated sequence of numbers. $range generates the sequence from the specified
 * starting number by successively incrementing the starting number by the specified step value up to but not including
 * the end point.
 * @param startIndex specifies the start of the sequence. Can be any valid expression that resolves to an integer.
 * @param endIndex specifies the exclusive upper limit of the sequence. Can be any valid expression that resolves to an
 * integer.
 * @param step Optional. An integer that specifies the increment value. Can be any valid expression that resolves to a
 * non-zero integer. Defaults to 1.
 * @constructor
 */
export const $Range = (startIndex: number, endIndex: number, step = 1) => ({
    $range: [ startIndex, endIndex, step ]
});
/**
 * Applies an expression to each element in an array and combines them into a single value. If input resolves to an
 * empty array, $reduce returns initialValue. During evaluation of the in expression, two variables will be available:
 * - value is the variable that represents the cumulative value of the expression.
 * - this is the variable that refers to the element being processed.
 * @param array can be any valid expression that resolves to an array. If the argument resolves to a value of null or
 * refers to a missing field, $reduce returns null. If the argument does not resolve to an array or null nor refers to a
 * missing field, $reduce returns an error.
 * @param initialValue is the initial cumulative value set before in is applied to the first element of the input array.
 * @param apply can be any valid expression that $reduce applies to each element in the input array in left-to-right
 * order. Wrap the input value with $reverseArray to yield the equivalent of applying the combining expression from
 * right-to-left.
 * @constructor
 */
export const $Reduce = (array: any, initialValue: any, apply: any) => ({
    $reduce: { input: array, initialValue, in: apply }
});
/**
 * Accepts an array expression as an argument and returns an array with the elements in reverse order.
 * @param array can be any valid expression as long as it resolves to an array.
 * @constructor
 */
export const $ReverseArray = (array: any) => ({ $reverseArray: array });
/**
 * Counts and returns the total number of items in an array.
 * @param array can be any expression as long as it resolves to an array.
 * @constructor
 */
export const $Size = (array: any) => ({ $size: array });
/**
 * Returns a subset of an array.
 * @param array can be any valid expression as long as it resolves to an array.
 * @param position can be any valid expression as long as it resolves to an integer. If positive, $slice determines the
 * starting position from the start of the array. If <position> is greater than the number of elements, the $slice
 * returns an empty array. If negative, $slice determines the starting position from the end of the array. If the
 * absolute value of the <position> is greater than the number of elements, the starting position is the start of the
 * array.
 * @param numberOfElement can be any valid expression as long as it resolves to an integer. If positive, $slice returns
 * up to the first n elements in the array. If the <position> is specified, $slice returns the first n elements starting
 * from the position. If negative, $slice returns up to the last n elements in the array.
 * @constructor
 */
export const $Slice = (array: any, numberOfElement: number, position = 0) => ({
    $slice: [ array, position, numberOfElement ]
});
/**
 * Transposes an array of input arrays so that the first element of the output array would be an array containing, the
 * first element of the first input array, the first element of the second input array, etc.
 * @param arrayOfArrays is an array of expressions that resolve to arrays. The elements of these input arrays combine to
 * form the arrays of the output array. If any of the inputs arrays resolves to a value of null or refers to a missing
 * field, $zip returns null. If any of the inputs arrays does not resolve to an array or null nor refers to a missing
 * field, $zip returns an error.
 * @param longestLength specifies whether the length of the longest array determines the number of arrays in the output
 * array. The default value is false: the shortest array length determines the number of arrays in the output array.
 * @param defaultArray is an array of default element values to use if the input arrays have different lengths. You must
 * specify useLongestLength: true along with this field, or else $zip will return an error. If useLongestLength: true
 * but defaults is empty or not specified, $zip uses null as the default value. If specifying a non-empty defaults, you
 * must specify a default for each input array or else $zip will return an error.
 * @constructor
 */
export const $Zip = (arrayOfArrays: any, longestLength = false, defaultArray?: any) => ({
    $zip: {
        inputs: arrayOfArrays,
        useLongestLength: longestLength,
        defaults:  defaultArray
    }
});
