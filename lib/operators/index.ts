/**
 * pipelineOperators
 */
const pipelineOperators = {
    /**
     * Concat description
     */
    // Concat: (...arrayList: any[]) => ({ $concat: [ ...arrayList ] }),
    /**
     * NotEqual description
     */
    // NotEqual: (a: any, b: any) => ({ $ne: [a, b] }),
};

/**
 * Pipeline operators exports
 */
/**
 * Allows the use of aggregation expressions within the query language. The arguments can be any valid aggregation
 * expression.
 * @param expression
 * @constructor
 */
export const Expr = (expression: any) => ({ $expr: expression });
/**
 * Returns all documents whose specified field contains the searched value.
 * @param fieldName
 * @param searchedValue
 * @constructor
 */
export const Field = (fieldName: string, searchedValue: any) => {
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
export const ArrayElemAt = (array: any, index: number) => ({ $arrayElemAt: [ array, index ] });
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
export const ArrayToObject = (literal: boolean, array: any) => literal
    ? ({ $arrayToObject: { $literal: array } })
    : ({ $arrayToObject: array });
/**
 * Concatenates arrays to return the concatenated array.
 * If any argument resolves to a value of null or refers to a field that is missing, $concatArrays returns null.
 * @param arrayOfArray can be any valid expression as long as they resolve to an array.
 * @constructor
 */
export const ConcatArrays = (...arrayOfArrays: any) => ({ $concatArrays: arrayOfArrays });
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
export const Filter = (array: any, as: string = 'this', condition: boolean) => ({ $filter: { input: array, as: as, cond: condition } });
/**
 * Returns the first element in an array.
 * @param array
 * @constructor
 */
export const First = (array: any) => ({ $first: array });
/**
 * Returns a boolean indicating whether a specified value is in an array.
 * @param elementToFind can be any valid expression.
 * @param array can be any valid expression that resolves to an array.
 * @constructor
 */
export const In = (elementToFind: any, array: any) => ({ $in: [ elementToFind, array ] });
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
export const IndexOfArray = (array: any, elementToFind: any, startIndex = 0, endIndex?: number) => ({ $indexOfArray: [ array, elementToFind, startIndex, (endIndex ? endIndex : { $size: array }) ] });
/**
 * Determines if the operand is an array. Returns a boolean.
 * @param elementToVerify can be any valid expression.
 * @constructor
 */
export const IsArray = (elementToVerify: any) => ({ $isArray: elementToVerify });
/**
 * Returns the last element in an array. The $last operator is an alias for the following $arrayElemAt expression:
 * { $arrayElemAt: [ array, -1 ] }
 * @param array can be any valid expression as long as it resolves to an array, null, or missing.
 * @constructor
 */
export const Last = (array: any) => ({ $last: array });
/**
 * Applies an expression to each item in an array and returns an array with the applied results.
 * @param array can be any expression that resolves to an array.
 * @param as Optional. A name for the variable that represents each individual element of the input array. If no name is
 * specified, the variable name defaults to this.
 * @param apply is an expression that is applied to each element of the input array. The expression references each
 * element individually with the variable name specified in as.
 * @constructor
 */
export const Map = (array: any, as: string = 'this', apply: any) => ({ $map: { input: array, as: as, in: apply } });
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
export const ObjectToArray = (object: any) => ({ $objectToArray: object });
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
export const Range = (startIndex: number, endIndex: number, step = 1) => ({ $range: [ startIndex, endIndex, step ] });
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
export const Reduce = (array: any, initialValue: any, apply: any) => ({
    $reduce: { input: array, initialValue: initialValue, in: apply }
});
/**
 * Accepts an array expression as an argument and returns an array with the elements in reverse order.
 * @param array can be any valid expression as long as it resolves to an array.
 * @constructor
 */
export const ReverseArray = (array: any) => ({ $reverseArray: array });
/**
 * Counts and returns the total number of items in an array.
 * @param array can be any expression as long as it resolves to an array.
 * @constructor
 */
export const Size = (array: any) => ({ $size: array });
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
export const Slice = (array: any, position = 0, numberOfElement: number) => ({
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
export const Zip = (arrayOfArrays: any, longestLength = false, defaultArray?: any) => ({
    $zip: {
        inputs: arrayOfArrays,
        useLongestLength: longestLength,
        defaults:  defaultArray
    }
});

// Boolean Expression Operators
// Boolean expressions evaluate their argument expressions as booleans and return a boolean as the result.
// In addition to the false boolean value, Boolean expression evaluates as false the following: null, 0, and undefined values. The Boolean expression evaluates all other values as true, including non-zero numeric values and arrays.

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
export const Not = (expression: any) => ({ $not: [ expression ] });
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
// The comparison expressions take two argument expressions and compare both value and type, using the specified BSON comparison order for values of different types.

export const Cmp = () => ({  });
export const Eq = (a: any, b: any) => ({ $eq: [a, b] });
export const Gt = () => ({  });
export const Gte = () => ({  });
export const Lt = () => ({  });
export const Lte = () => ({  });
export const Ne = (a: any, b: any) => ({ $ne: [a, b] });

// Conditional Expression Operators

export const Cond = () => ({  });
export const IfNull = () => ({  });
export const Switch = () => ({  });

// Custom Aggregation Expression Operators

export const Accumulator = () => ({  });

export const Function = () => ({  });

// Data Size Operators
// The following operators return the size of a data element:

export const BinarySize = () => ({  });
export const BsonSize = () => ({  });

// Date Expression Operators
// The following operators returns date objects or components of a date object:

export const DateFromParts = () => ({  });
export const DateFromString = () => ({  });
export const DateToParts = () => ({  });
export const DateToString = () => ({  });
export const DayOfMonth = () => ({  });
export const DayOfWeek = () => ({  });
export const DayOfYear = () => ({  });
export const Hour = () => ({  });
export const IsoDayOfWeek = () => ({  });
export const IsoWeek = () => ({  });
export const IsoWeekYear = () => ({  });
export const Millisecond = () => ({  });
export const Minute = () => ({  });
export const Month = () => ({  });
export const Second = () => ({  });
export const ToDate = () => ({  });
export const Week = () => ({  });
export const Year = () => ({  });

// Literal Expression Operator

export const Literal = () => ({  });

// Miscellaneous Operators

export const Rand = () => ({  });
export const SampleRate = () => ({  });

// Object Expression Operators

export const MergeObjects = () => ({  });

// Set Expression Operators
// Set expressions performs set operation on arrays, treating arrays as sets.
// Set expressions ignores the duplicate entries in each input array and the order of the elements.
// If the set operation returns a set, the operation filters out duplicates in the result to output an array that
// contains only unique entries. The order of the elements in the output array is unspecified.
// If a set contains a nested array element, the set expression does not descend into the nested array but evaluates
// the array at top-level.

export const AllElementsTrue = () => ({  });
export const AnyElementTrue = () => ({  });
export const SetDifference = () => ({  });
export const SetEquals = () => ({  });
export const SetIntersection = () => ({  });
export const SetIsSubset = () => ({  });
export const SetUnion = () => ({  });

// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

export const Concat = () => ({  });
export const IndexOfBytes = () => ({  });
export const IndexOfCP = () => ({  });
export const Ltrim = () => ({  });


export const RegexFind = () => ({  });
export const RegexFindAll = () => ({  });
export const RegexMatch = (input: string, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } });
export const ReplaceOne = () => ({  });
export const ReplaceAll = () => ({  });
export const Rtrim = () => ({  });
export const Split = () => ({  });
export const StrLenBytes = () => ({  });
export const StrLenCP = () => ({  });
export const StrCaseCmp = () => ({  });
export const Substr = () => ({  });
export const SubstrBytes = () => ({  });
export const SubstrCP = () => ({  });
export const ToLower = () => ({  });
export const ToString = () => ({  });
export const Trim = () => ({  });
export const ToUpper = () => ({  });

// Text Expression Operator

export const Meta = () => ({  });

// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers.
// Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees
// to convert between degree and radian measurements.

export const Sin = () => ({  });
export const Cos = () => ({  });
export const Tan = () => ({  });
export const Asin = () => ({  });
export const Acos = () => ({  });
export const Atan = () => ({  });
export const Atan2 = () => ({  });
export const Asinh = () => ({  });
export const Acosh = () => ({  });
export const Atanh = () => ({  });
export const Sinh = () => ({  });
export const Cosh = () => ({  });
export const Tanh = () => ({  });
export const DegreesToRadians = () => ({  });
export const RadiansToDegrees = () => ({  });

// Type Expression Operators

export const Convert = () => ({  });

export const IsNumber = () => ({  });

export const ToBool = () => ({  });
export const ToDecimal = () => ({  });
export const ToDouble = () => ({  });
export const ToInt = () => ({  });
export const ToLong = () => ({  });
export const ToObjectId = () => ({  });
export const Type = () => ({  });

// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums,
// minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the
// expression once for each input document, and maintain their stage for the group of documents that share the same
// group key.

export const AddToSet = () => ({  });
export const Avg = () => ({  });
export const Max = () => ({  });
export const Min = () => ({  });
export const Push = () => ({  });
export const StdDevPop = () => ({  });
export const StdDevSamp = () => ({  });
export const Sum = () => ({  });

// Variable Expression Operators

export const Let = () => ({  });
