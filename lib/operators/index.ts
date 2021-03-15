/**
 * Pipeline operators exports
 */
/**
 * Allows the use of aggregation expressions within the query language. The arguments can be any valid aggregation
 * expression.
 * @param expression
 * @constructor
 */
export const Expr = (expression) => ({ $expr: expression });
/**
 * Returns all documents whose specified field contains the searched value.
 * @param fieldName
 * @param searchedValue
 * @constructor
 */
export const Field = (fieldName: string, searchedValue) => {
    const newObject = {};
    newObject[fieldName] = searchedValue;
    return newObject;
};

// Arithmetic Expression Operators

/**
 * Returns the absolute value of a number.
 * @param num can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const Abs = (num: number) => ({ $abs: num });
/**
 * Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats
 * the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a
 * date.
 * @param args can be any valid expression as long as they resolve to either all numbers or to numbers and a date.
 * @constructor
 */
export const Add = (...args: any[]) => ({ $add: args });
/**
 * Returns the smallest integer greater than or equal to the specified number.
 * @param num can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const Ceil = (num: number) => ({ $ceil: num });
/**
 * Returns the result of dividing the first number by the second. Accepts two argument expressions.
 * @param dividend can be any valid expression as long as it resolve to a number.
 * @param divisor can be any valid expression as long as it resolve to a number.
 * @constructor
 */
export const Divide = (dividend: number, divisor: number) => ({ $divide: [ dividend, divisor ] });
/**
 * Raises e to the specified exponent.
 * @param exponent can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const Exp = (exponent: number) => ({ $exp: exponent });
/**
 * Returns the largest integer less than or equal to the specified number.
 * @param num can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const Floor = (num: number) => ({ $floor: num });
/**
 * Calculates the natural log of a number.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @constructor
 */
export const Ln = (num: number) => ({ $ln: num });
/**
 * Calculates the log of a number in the specified base.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @param base can be any valid expression as long as it resolves to a positive number greater than 1.
 * @constructor
 */
export const Log = (num: number, base: number) => ({ $log: [ num, base ] });
/**
 * Calculates the log base 10 of a number.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @constructor
 */
export const Log10 = (num: number) => ({ $log10: num });
/**
 * Returns the remainder of the first number divided by the second. Accepts two argument expressions.
 * @param dividend can be any valid expression as long as it resolves to a number.
 * @param divisor can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const Mod = (dividend: number, divisor: number) => ({ $mod: [ dividend, divisor ] });
/**
 * Multiplies numbers to return the product. Accepts any number of argument expressions.
 * @param args can be any valid expression as long as they resolve to numbers.
 * @constructor
 */
export const Multiply = (...args: any[]) => ({ $multiply: args });
/**
 * Raises a number to the specified exponent.
 * @param num can be any valid expression as long as it resolves to a number.
 * @param exponent can be any valid expression as long as it resolves to a number.
 * @constructor
 */
export const Pow = (num: number, exponent: number) => ({ $pow: [ num, exponent ] });
/**
 * Rounds a number to to a whole integer or to a specified decimal place.
 * @param num can be any valid expression that resolves to a number. Specifically, the expression must resolve to an
 * integer, double, decimal, or long.
 * @param place can be any valid expression that resolves to an integer between -20 and 100, exclusive.
 * e.g. -20 < place < 100. Defaults to 0 if unspecified.
 * @constructor
 */
export const Round = (num: number, place?: number) => ({ $round : [ num, place ] });
/**
 * Calculates the square root of a positive number and returns the result as a double.
 * @param num can be any valid expression as long as it resolves to a non-negative number.
 * @constructor
 */
export const Sqrt = (num: number) => ({ $sqrt: num });
/**
 * Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference.
 * If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in
 * milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number,
 * specify the date argument first as it is not meaningful to subtract a date from a number.
 * @param expression1 can be any valid expression as long as it resolves to a number and/or a date.
 * @param expression2 can be any valid expression as long as it resolves to a number and/or a date.
 * @constructor
 */
export const Subtract = (expression1: number, expression2: number) => ({ $subtract: [ expression1, expression2 ] });
/**
 * Truncates a number to a whole integer or to a specified decimal place.
 * @param num can be any valid expression that resolves to a number. Specifically, the expression must resolve to an
 * integer, double, decimal, or long.
 * @param place Optional Can be any valid expression that resolves to an integer between -20 and 100, exclusive. e.g.
 * -20 < place < 100. Defaults to 0 if unspecified.
 * @constructor
 */
export const Trunc = (num: number, place?: number) => ({ $trunc : [ num, place ] });

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
export const ArrayElemAt = (array, index: number) => ({ $arrayElemAt: [ array, index ] });
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
export const ArrayToObject = (literal: boolean, array) => literal
    ? ({ $arrayToObject: { $literal: array } })
    : ({ $arrayToObject: array });
/**
 * Concatenates arrays to return the concatenated array.
 * If any argument resolves to a value of null or refers to a field that is missing, $concatArrays returns null.
 * @param arrayOfArrays can be any valid expression as long as they resolve to an array.
 * @constructor
 */
export const ConcatArrays = (...arrayOfArrays) => ({ $concatArrays: arrayOfArrays });
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
export const Filter = (array, as = 'this', condition: boolean) => ({ $filter: { input: array, as: as, cond: condition } });
/**
 * Returns the first element in an array.
 * @param array
 * @constructor
 */
export const First = (array) => ({ $first: array });
/**
 * Returns a boolean indicating whether a specified value is in an array.
 * @param elementToFind can be any valid expression.
 * @param array can be any valid expression that resolves to an array.
 * @constructor
 */
export const In = (elementToFind, array) => ({ $in: [ elementToFind, array ] });
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
export const IndexOfArray = (array, elementToFind, startIndex = 0, endIndex?: number) => ({
    $indexOfArray: [ array, elementToFind, startIndex, (endIndex ? endIndex : { $size: array }) ]
});
/**
 * Determines if the operand is an array. Returns a boolean.
 * @param elementToVerify can be any valid expression.
 * @constructor
 */
export const IsArray = (elementToVerify) => ({ $isArray: elementToVerify });
/**
 * Returns the last element in an array. The $last operator is an alias for the following $arrayElemAt expression:
 * { $arrayElemAt: [ array, -1 ] }
 * @param array can be any valid expression as long as it resolves to an array, null, or missing.
 * @constructor
 */
export const Last = (array) => ({ $last: array });
/**
 * Applies an expression to each item in an array and returns an array with the applied results.
 * @param array can be any expression that resolves to an array.
 * @param as Optional. A name for the variable that represents each individual element of the input array. If no name is
 * specified, the variable name defaults to this.
 * @param apply is an expression that is applied to each element of the input array. The expression references each
 * element individually with the variable name specified in as.
 * @constructor
 */
export const Map = (array, as: string = 'this', apply) => ({ $map: { input: array, as: as, in: apply } });
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
export const ObjectToArray = (object) => ({ $objectToArray: object });
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
export const Range = (startIndex: number, endIndex: number, step = 1) => ({
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
export const Reduce = (array, initialValue, apply) => ({
    $reduce: { input: array, initialValue: initialValue, in: apply }
});
/**
 * Accepts an array expression as an argument and returns an array with the elements in reverse order.
 * @param array can be any valid expression as long as it resolves to an array.
 * @constructor
 */
export const ReverseArray = (array) => ({ $reverseArray: array });
/**
 * Counts and returns the total number of items in an array.
 * @param array can be any expression as long as it resolves to an array.
 * @constructor
 */
export const Size = (array) => ({ $size: array });
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
export const Slice = (array, position = 0, numberOfElement: number) => ({
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
export const Zip = (arrayOfArrays, longestLength = false, defaultArray?) => ({
    $zip: {
        inputs: arrayOfArrays,
        useLongestLength: longestLength,
        defaults:  defaultArray
    }
});

// Boolean Expression Operators
// Boolean expressions evaluate their argument expressions as booleans and return a boolean as the result.
// In addition to the false boolean value, Boolean expression evaluates as false the following: null, 0, and undefined
// values. The Boolean expression evaluates all other values as true, including non-zero numeric values and arrays.

/**
 * Evaluates one or more expressions and returns true if all of the expressions are true or if evoked with no argument
 * expressions. Otherwise, $and returns false. $and uses short-circuit logic: the operation stops evaluation after
 * encountering the first false expression. In addition to the false boolean value, $and evaluates as false the
 * following: null, 0, and undefined values. The $and evaluates all other values as true, including non-zero numeric
 * values and arrays.
 * @param args
 * @constructor
 */
export const And = (...args: any[]) => ({ $and: args });
/**
 * Evaluates a boolean and returns the opposite boolean value; i.e. when passed an expression that evaluates to true,
 * $not returns false; when passed an expression that evaluates to false, $not returns true. In addition to the false
 * boolean value, $not evaluates as false the following: null, 0, and undefined values. The $not evaluates all other
 * values as true, including non-zero numeric values and arrays.
 * @param expression to evaluate
 * @constructor
 */
export const Not = (expression) => ({ $not: [ expression ] });
/**
 * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, $or returns false.
 * $or uses short-circuit logic: the operation stops evaluation after encountering the first true expression. In
 * addition to the false boolean value, $or evaluates as false the following: null, 0, and undefined values. The $or
 * evaluates all other values as true, including non-zero numeric values and arrays.
 * @param args
 * @constructor
 */
export const Or = (...args: any[]) => ({ $or: args });

// Comparison Expression Operators
// Comparison expressions return a boolean except for $cmp which returns a number.
// The comparison expressions take two argument expressions and compare both value and type, using the specified BSON
// comparison order for values of different types.

/**
 * Compares two values and returns:
 * - -1 if the first value is less than the second.
 * - 1 if the first value is greater than the second.
 * - 0 if the two values are equivalent.
 * The $cmp compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const Compare = (a, b) => ({ $cmp: [ a, b ] });
/**
 * Compares two values and returns:
 * - true when the values are equivalent.
 * - false when the values are not equivalent.
 * The $eq compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const Equal = (a, b) => ({ $eq: [a, b] });
/**
 * Compares two values and returns:
 * - true when the first value is greater than the second value.
 * - false when the first value is less than or equivalent to the second value.
 * The $gt compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const GreaterThan = (a, b) => ({ $gt: [ a, b ] });
/**
 * Compares two values and returns:
 * - true when the first value is greater than or equivalent to the second value.
 * - false when the first value is less than the second value.
 * The $gte compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const GreaterThanEqual = (a, b) => ({ $gte: [ a, b ] });
/**
 * Compares two values and returns:
 * - true when the first value is less than the second value.
 * - false when the first value is greater than or equivalent to the second value.
 * The $lt compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const LessThan = (a, b) => ({ $lt: [ a, b ] });
/**
 * Compares two values and returns:
 * - true when the first value is less than or equivalent to the second value.
 * - false when the first value is greater than the second value.
 * The $lte compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const LessThanEqual = (a, b) => ({ $lte: [a, b] });
/**
 * Compares two values and returns:
 * - true when the values are not equivalent.
 * - false when the values are equivalent.
 * The $ne compares both value and type, using the specified BSON comparison order for values of different types.
 * @param a
 * @param b
 * @constructor
 */
export const NotEqual = (a, b) => ({ $ne: [a, b] });

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
export const Cond = (booleanExpression, trueCase, falseCase) => ({
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
export const IfNull = (value, replaceWith) => ({ $ifNull: [ value, replaceWith ] });
/**
 * Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a
 * specified expression and breaks out of the control flow.
 * @param branchList
 * @param defaultCase
 * @constructor
 */
export const Switch = (branchList: { branchCase; thenDo }[], defaultCase) => ({
    $switch: {
        branches: branchList,
        default: defaultCase
    }
});

// Custom Aggregation Expression Operators

/**
 * Defines a custom accumulator operator. Accumulators are operators that maintain their state (e.g. totals, maximums,
 * minimums, and related data) as documents progress through the pipeline. Use the $accumulator operator to execute your
 * own JavaScript functions to implement behavior not supported by the MongoDB Query Language.
 *
 * The following steps outline how the $accumulator operator processes documents:
 * - The operator begins at an initial state, defined by the init function.
 * - For each document, the operator updates the state based on the accumulate function. The accumulate function’s first
 * argument is the current state, and additional arguments are be specified in the accumulateArgs array.
 * - When the operator needs to merge multiple intermediate states, it executes the merge function. For more information
 * on when the merge function is called, see Merge Two States with $merge.
 * - If a finalize function has been defined, once all documents have been processed and the state has been updated
 * accordingly, finalize converts the state to a final output.
 *
 * Merge Two States with $merge
 * As part of its internal operations, the $accumulator operator may need to merge two separate, intermediate states.
 * The merge function specifies how the operator should merge two states.
 * For example, $accumulator may need to combine two states when:
 * - $accumulator is run on a sharded cluster. The operator needs to merge the results from each shard to obtain the
 * final result.
 * - A single $accumulator operation exceeds its specified memory limit. If you specify the allowDiskUse option, the
 * operator stores the in-progress operation on disk and finishes the operation in memory. Once the operation finishes,
 * the results from disk and memory are merged together using the merge function.
 * @param initCode is a function used to initialize the state. The init function receives its arguments from the
 * initArgs array expression. You can specify the function definition as either BSON type Code or String.
 * @param initArgs Optional. Arguments passed to the init function.
 * @param accumulateCode is a function used to accumulate documents. The accumulate function receives its arguments from
 * the current state and accumulateArgs array expression. The result of the accumulate function becomes the new state.
 * You can specify the function definition as either BSON type Code or String.
 * @param accumulateArgs are Arguments passed to the accumulate function. You can use accumulateArgs to specify what
 * field value(s) to pass to the accumulate function.
 * @param mergeCode is a Function used to merge two internal states. merge must be either a String or Code BSON type.
 * merge returns the combined result of the two merged states. For information on when the merge function is called,
 * see Merge Two States with $merge.
 * @param finalizeCode Optional. Function used to update the result of the accumulation.
 * @param langCode is the language used in the $accumulator code. Currently, the only supported value for lang is js.
 * @constructor
 */
export const Accumulator = (
    initCode, initArgs = [], accumulateCode, accumulateArgs, mergeCode, finalizeCode, langCode = 'js'
) => ({
    $accumulator: {
        init: initCode,
        initArgs: initArgs,        // Optional
        accumulate: accumulateCode,
        accumulateArgs: accumulateArgs,
        merge: mergeCode,
        finalize: finalizeCode,                    // Optional
        lang: langCode
    }
});

/**
 * Defines a custom aggregation function or expression in JavaScript.
 *
 * You can use the $function operator to define custom functions to implement behavior not supported by the MongoDB
 * Query Language.
 *
 * IMPORTANT
 *
 * Executing JavaScript inside an aggregation expression may decrease performance. Only use the $function operator if
 * the provided pipeline operators cannot fulfill your application’s needs.
 *
 * @param bodyCode
 * @param array
 * @param langCode
 * @constructor
 */
export const Function = (bodyCode, array, langCode = 'js') => ({
    $function: {
        body: bodyCode,
        args: array,
        lang: langCode
    }
});

// Data Size Operators
// The following operators return the size of a data element:

/**
 * Returns the size of a given string or binary data value’s content in bytes.
 *
 * The argument for $binarySize must resolve to either:
 * - A string,
 * - A binary data value, or
 * - null.
 *
 * If the argument is a string or binary data value, the expression returns the size of the argument in bytes.
 * If the argument is null, the expression returns null.
 * If the argument resolves to any other data type, $binarySize errors.
 *
 * @param stringOrBinaryData can be any valid expression as long as it resolves to either a string or binary data value.
 * @constructor
 */
export const BinarySize = (stringOrBinaryData) => ({ $binarySize: stringOrBinaryData });
/**
 * Returns the size in bytes of a given document (i.e. bsontype Object) when encoded as BSON. You can use $bsonSize as
 * an alternative to the Object.bsonSize() method.
 *
 * If the argument is an object, the expression returns the size of the object in bytes when the object is encoded as
 * BSON.
 * If the argument is null, the expression returns null.
 * If the argument resolves to a data type other than an object or null, $bsonSize errors.
 *
 * @param object
 * @constructor
 */
export const BsonSize = (object) => ({ $bsonSize: object });

// Date Expression Operators
// The following operators returns date objects or components of a date object:

/**
 * Constructs and returns a Date object given the date’s constituent properties.
 *
 * IMPORTANT
 * You cannot combine the use of calendar dates and ISO week date fields when constructing your $dateFromParts input
 * document.
 *
 * @param year Required if not using isoWeekYear. Calendar year. Can be any expression that evaluates to a number.
 * Value range: 1-9999. If the number specified is outside this range, $dateFromParts errors. Starting in MongoDB 4.4,
 * the lower bound for this value is 1. In previous versions of MongoDB, the lower bound was 0.
 * @param month Optional. Can only be used with year. Can be any expression that evaluates to a number.
 * Value range: 1-12. if the number specified is outside this range, $dateFromParts incorporates the difference in the
 * date calculation.
 * @param day Optional. Can only be used with year. Day of month. Can be any expression that evaluates to a number.
 * Value range: 1-31. Starting in MongoDB 4.0, if the number specified is outside this range, $dateFromParts
 * incorporates the difference in the date calculation.
 * @param isoWeekYear Required if not using year. ISO Week Date Year. Can be any expression that evaluates to a number.
 * Value range: 1-9999. If the number specified is outside this range, $dateFromParts errors. Starting in MongoDB 4.4,
 * the lower bound for this value is 1. In previous versions of MongoDB, the lower bound was 0.
 * @param isoWeek Optional. Can only be used with isoWeekYear. Week of year. Can be any expression that evaluates to a
 * number. Value range: 1-53. If the number specified is outside this range, $dateFromParts incorporates the difference
 * in the date calculation.
 * @param isoDayOfWeek Optional. Can only be used with isoWeekYear. Day of week (Monday 1 - Sunday 7). Can be any
 * expression that evaluates to a number. Value range: 1-7. If the number specified is outside
 * this range, $dateFromParts incorporates the difference in the date calculation.
 * @param hour Optional. Can be any expression that evaluates to a number. Value range: 0-23. If the number specified is
 * outside this range, $dateFromParts incorporates the difference in the date calculation.
 * @param minute Optional. Can be any expression that evaluates to a number. Value range: 0-59. If the number specified
 * is outside this range, $dateFromParts incorporates the difference in the date calculation.
 * @param second Optional. Can be any expression that evaluates to a number. Value range: 0-59. If the number specified
 * is outside this range, $dateFromParts incorporates the difference in the date calculation.
 * @param millisecond Optional. Can be any expression that evaluates to a number. Value range: 0-999. If the number
 * specified is outside this range, $dateFromParts incorporates the difference in the date calculation.
 * @param timezone Optional. can be any expression that evaluates to a string whose value is either:
 * - an Olson Timezone Identifier, such as "Europe/London" or "America/New_York", or a UTC offset in the form:
 * +/-[hh]:[mm], e.g. "+04:45", or +/-[hh][mm], e.g. "-0530", or +/-[hh], e.g. "+03".
 * @constructor
 */
export const DateFromParts = (
    year?, month = 1, day = 1,
    isoWeekYear?, isoWeek = 1, isoDayOfWeek = 1,
    hour = 0, minute = 0, second = 0, millisecond = 0, timezone?
) => year
    ? ({
        $dateFromParts : {
            'year': year, 'month': month, 'day': day,
            'hour': hour, 'minute': minute, 'second': second,
            'millisecond': millisecond, 'timezone': timezone
        }
    })
    : ({
        $dateFromParts : {
            'isoWeekYear': isoWeekYear, 'isoWeek': isoWeek, 'isoDayOfWeek': isoDayOfWeek,
            'hour': hour, 'minute': minute, 'second': second,
            'millisecond': millisecond, 'timezone': timezone
        }
    });
/**
 * Converts a date/time string to a date object.
 *
 * @param dateString The date/time string to convert to a date object. See Date for more information on date/time
 * formats.
 *
 * NOTE
 * If specifying the timezone option to the operator, do not include time zone information in the dateString.
 * @param formatString Optional. The date format specification of the dateString. The format can be any expression that
 * evaluates to a string literal, containing 0 or more format specifiers. For a list of specifiers available
 * @param timezone Optional. The time zone to use to format the date.
 *
 * NOTE
 * If the dateString argument is formatted like ‘2017-02-08T12:10:40.787Z’, in which the ‘Z’ at the end indicates Zulu
 * time (UTC time zone), you cannot specify the timezone argument. <timezone> allows for the following options and
 * expressions that evaluate to them:
 * - an Olson Timezone Identifier, such as "Europe/London" or "America/New_York", or
 * - a UTC offset in the form: +/-[hh]:[mm], e.g. "+04:45", or +/-[hh][mm], e.g. "-0530", or +/-[hh], e.g. "+03", or
 * - The strings “Z”, “UTC”, or “GMT”.
 * @param onError Optional. If $dateFromString encounters an error while parsing the given dateString, it outputs the
 * result value of the provided onError expression. This result value can be of any type. If you do not specify onError,
 * $dateFromString throws an error if it cannot parse dateString.
 * @param onNull Optional. If the dateString provided to $dateFromString is null or missing, it outputs the result value
 * of the provided onNull expression. This result value can be of any type. If you do not specify onNull and dateString
 * is null or missing, then $dateFromString outputs null.
 * @constructor
 */
export const DateFromString = (
    dateString, formatString = '%Y-%m-%dT%H:%M:%S.%LZ', timezone?, onError?, onNull?
) => ({
    $dateFromString: {
        dateString: dateString,
        format: formatString,
        timezone: timezone,
        onError: onError,
        onNull: onNull
    }
});


export const DateToParts = (dateExpression, timezone?, iso8601 = false) => ({
    $dateToParts: {
        'date' : dateExpression,
        'timezone' : timezone,
        'iso8601' : iso8601
    }
});
export const DateToString = (
    dateExpression, formatString = '%Y-%m-%dT%H:%M:%S.%LZ', timezone?, onNull?
) => ({
    $dateToString: {
        date: dateExpression,
        format: formatString,
        timezone: timezone,
        onNull: onNull
    }
});
export const DayOfMonth = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const DayOfWeek = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const DayOfYear = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const Hour = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const IsoDayOfWeek = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const IsoWeek = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const IsoWeekYear = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const Millisecond = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const Minute = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const Month = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const Second = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const ToDate = (expression) => ({ $toDate: expression });
export const Week = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });
export const Year = (dateExpression, timezone) => ({ date: dateExpression, timezone: timezone });

// Literal Expression Operator

export const Literal = (value) => ({ $literal: value });

// Miscellaneous Operators

export const Rand = () => ({ $rand: {} });
export const SampleRate = (nonNegativeFloat) => ({ $sampleRate: nonNegativeFloat });

// Object Expression Operators

export const MergeObjects = (...documents) => ({ $mergeObjects: documents });

// Set Expression Operators
// Set expressions performs set operation on arrays, treating arrays as sets.
// Set expressions ignores the duplicate entries in each input array and the order of the elements.
// If the set operation returns a set, the operation filters out duplicates in the result to output an array that
// contains only unique entries. The order of the elements in the output array is unspecified.
// If a set contains a nested array element, the set expression does not descend into the nested array but evaluates
// the array at top-level.

export const AllElementsTrue = (array) => ({ $allElementsTrue: [ array ] });
export const AnyElementTrue = (array) => ({ $anyElementTrue: [ array ] });
export const SetDifference = (array1, array2) => ({ $setDifference: [ array1, array2 ] });
export const SetEquals = (...arrayOfArrays) => ({ $setEquals: arrayOfArrays });
export const SetIntersection = (...arrayOfArrays) => ({ $setIntersection: arrayOfArrays });
export const SetIsSubset = (array1, array2) => ({ $setIsSubset: [ array1, array2 ] });
export const SetUnion = (...arrayOfArrays) => ({ $setUnion: arrayOfArrays });

// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

export const Concat = (...expressions) => ({ $concat: expressions });
export const IndexOfBytes = (stringExpression, substringExpression, startIndex, endIndex) => ({
    $indexOfBytes: [ stringExpression, substringExpression, startIndex, endIndex ]
});
export const IndexOfCP = (stringExpression, substringExpression, startIndex, endIndex) => ({
    $indexOfCP: [ stringExpression, substringExpression, startIndex, endIndex ]
});
export const Ltrim = (input, chars) => ({ $ltrim: { input: input,  chars: chars } });
export const RegexFind = (input, regex) => ({ $regexFind: { input: input , regex: regex } });
export const RegexFindAll = (input, regex) => ({ $regexFindAll: { input: input , regex: regex } });
export const RegexMatch = (input, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } });
export const ReplaceOne = (input, find, replacement) => ({
    $replaceOne: { input: input, find: find, replacement: replacement }
});
export const ReplaceAll = (input, find, replacement) => ({
    $replaceAll: { input: input, find: find, replacement: replacement }
});
export const Rtrim = (input, chars) => ({ $rtrim: { input: input,  chars: chars } });
export const Split = (stringExpression, delimiter) => ({ $split: [ stringExpression, delimiter ] });
export const StrLenBytes = (stringExpression) => ({ $strLenBytes: stringExpression });
export const StrLenCP = (stringExpression) => ({ $strLenCP: stringExpression });
export const StrCaseCmp = (expression1, expression2) => ({ $strcasecmp: [ expression1, expression2 ] });
export const Substr = (stringExpression, startIndex, stringLength) => ({
    $substr: [ stringExpression, startIndex, stringLength ]
});
export const SubstrBytes = (stringExpression, byteIndex, byteCount) => ({
    $substrBytes: [ stringExpression, byteIndex, byteCount ]
});
export const SubstrCP = (stringExpression, codePointIndex, codePointCount) => ({
    $substrCP: [ stringExpression, codePointIndex, codePointCount ]
});
export const ToLower = (expression) => ({ $toLower: expression });
export const ToString = (expression) => ({ $toString: expression });
export const Trim = (input, chars) => ({ $trim: { input: input,  chars: chars } });
export const ToUpper = (expression) => ({ $toUpper: expression });

// Text Expression Operator

export const Meta = (metaDataKeyword) => ({ $meta: metaDataKeyword });

// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers.
// Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees
// to convert between degree and radian measurements.

export const Sin = (expression) => ({ $sin: expression });
export const Cos = (expression) => ({ $cos: expression });
export const Tan = (expression) => ({ $tan: expression });
export const Asin = (expression) => ({ $asin: expression });
export const Acos = (expression) => ({ $acos: expression });
export const Atan = (expression) => ({ $atan: expression });
export const Atan2 = (expression1, expression2) => ({ $atan2: [ expression1, expression2 ] });
export const Asinh = (expression) => ({ $asinh: expression });
export const Acosh = (expression) => ({ $acosh: expression });
export const Atanh = (expression) => ({ $atanh: expression });
export const Sinh = (expression) => ({ $sinh: expression });
export const Cosh = (expression) => ({ $cosh: expression });
export const Tanh = (expression) => ({ $tanh: expression });
export const DegreesToRadians = (expression) => ({ $degreesToRadians: expression });
export const RadiansToDegrees = (expression) => ({ $radiansToDegrees: expression });

// Type Expression Operators

export const Convert = (input, to, onError?, onNull?) => ({
    $convert:
        {
            input: input,
            to: to,
            onError: onError,  // Optional.
            onNull: onNull    // Optional.
        }
});
export const IsNumber = (expression) => ({ $isNumber: expression });
export const ToBool = (expression) => ({ $toBool: expression });
export const ToDecimal = (expression) => ({ $toDecimal: expression });
export const ToDouble = (expression) => ({ $toDouble: expression });
export const ToInt = (expression) => ({ $toInt: expression });
export const ToLong = (expression) => ({ $toLong: expression });
export const ToObjectId = (expression) => ({ $toObjectId: expression });
export const Type = (expression) => ({ $type: expression });

// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums,
// minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the
// expression once for each input document, and maintain their stage for the group of documents that share the same
// group key.

export const AddToSet = (expression) => ({ $addToSet: expression });
export const Avg = (expression) => ({ $avg: expression });
export const Max = (expression) => ({ $max: expression });
export const Min = (expression) => ({ $min: expression });
export const Push = (expression) => ({ $push: expression });
export const StdDevPop = (expression) => ({ $stdDevPop: expression });
export const StdDevSamp = (expression) => ({ $stdDevSamp: expression });
export const Sum = (expression) => ({ $sum: expression });

// Variable Expression Operators

export const Let = (vars, expression) => ({
    $let: { vars: vars, in: expression }
});
