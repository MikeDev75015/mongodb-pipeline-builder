/**
 * pipelineOperators
 */
const pipelineOperators = {
    /**
     * And description
     */
    And: (...andList: any[]) => ({ $and: andList }),
    /**
     * ArrayElemAt description
     */
    ArrayElemAt: (arrayName: string, position: number) => ({ $arrayElemAt: [arrayName, position] }),
    /**
     * Concat description
     */
    Concat: (...arrayList: any[]) => ({ $concat: [ ...arrayList ] }),
    /**
     * Equal description
     */
    Equal: (a: any, b: any) => ({ $eq: [a, b] }),
    /**
     * Expr description
     */
    Expr: (expression: any) => ({ $expr: expression }),
    /**
     * Field description
     */
    Field: (fieldName: string, soughtValue: any) => {
        const newObject = {};
        newObject[fieldName] = soughtValue;
        return newObject;
    },
    /**
     * In description
     */
    In: (valueToFind: any, arrayToSearch: any) => ({ $in: [valueToFind, arrayToSearch] }),
    /**
     * NotEqual description
     */
    NotEqual: (a: any, b: any) => ({ $ne: [a, b] }),
    /**
     * Or description
     */
    Or: (...orList: any[]) => ({ $or: orList }),
    /**
     * Reduce description
     */
    Reduce: (input: any, initialValue: any, arrayMode = false) => ({
        $reduce: { input: input, initialValue: initialValue, in: arrayMode
                ? { $concatArrays : ["$$value", "$$this"] }
                : { $concat : ["$$value", "$$this"] } }
    }),
    /**
     * RegexMatch description
     */
    RegexMatch: (input: string, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } })
};

/**
 * Pipeline operators exports
 */
export const
    And = pipelineOperators.And,
    ArrayElemAt = pipelineOperators.ArrayElemAt,
    Concat = pipelineOperators.Concat,
    Equal = pipelineOperators.Equal,
    Expr = pipelineOperators.Expr,
    Field = pipelineOperators.Field,
    In = pipelineOperators.In,
    NotEqual = pipelineOperators.NotEqual,
    Or = pipelineOperators.Or,
    Reduce = pipelineOperators.Reduce,
    RegexMatch = pipelineOperators.RegexMatch;

/*

export const abs = () => {  };	        // Returns the absolute value of a number.
export const add = () => {  };	        // Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date.
export const ceil = () => {  };	        // Returns the smallest integer greater than or equal to the specified number.
export const divide = () => {  };	    // Returns the result of dividing the first number by the second. Accepts two argument expressions.
export const exp = () => {  };	        // Raises e to the specified exponent.
export const floor = () => {  };	    // Returns the largest integer less than or equal to the specified number.
export const ln = () => {  };	        // Calculates the natural log of a number.
export const log = () => {  };	        // Calculates the log of a number in the specified base.
export const log10 = () => {  };	    // Calculates the log base 10 of a number.
export const mod = () => {  };	        // Returns the remainder of the first number divided by the second. Accepts two argument expressions.
export const multiply = () => {  };	    // Multiplies numbers to return the product. Accepts any number of argument expressions.
export const pow = () => {  };	        // Raises a number to the specified exponent.
export const round = () => {  };	    // Rounds a number to to a whole integer or to a specified decimal place.
export const sqrt = () => {  };	        // Calculates the square root.
export const subtract = () => {  };	    // Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.
export const trunc = () => {  };	    // Truncates a number to a whole integer or to a specified decimal place.

// Array Expression Operators

export const arrayElemAt = () => {  };	    // Returns the element at the specified array index.
export const arrayToObject = () => {  };	// Converts an array of key value pairs to a document.
export const concatArrays = () => {  };	    // Concatenates arrays to return the concatenated array.
export const filter = () => {  };	        // Selects a subset of the array to return an array with only the elements that match the filter condition.
export const first = () => {  };	        // Returns the first array element. Distinct from $first accumulator.
export const in = () => {  };	            // Returns a boolean indicating whether a specified value is in an array.
export const indexOfArray = () => {  };	    // Searches an array for an occurrence of a specified value and returns the array index of the first occurrence. If the substring is not found, returns -1.
export const isArray = () => {  };	        // Determines if the operand is an array. Returns a boolean.
export const last = () => {  };	            // Returns the last array element. Distinct from $last accumulator.
export const map = () => {  };	            // Applies a subexpression to each element of an array and returns the array of resulting values in order. Accepts named parameters.
export const objectToArray = () => {  };	// Converts a document to an array of documents representing key-value pairs.
export const range = () => {  };	        // Outputs an array containing a sequence of integers according to user-defined inputs.
export const reduce = () => {  };	        // Applies an expression to each element in an array and combines them into a single value.
export const reverseArray = () => {  };	    // Returns an array with the elements in reverse order.
export const size = () => {  };	            // Returns the number of elements in the array. Accepts a single expression as argument.
export const slice = () => {  };	        // Returns a subset of an array.
export const zip = () => {  };	            // Merge two arrays together.

// Boolean Expression Operators
// Boolean expressions evaluate their argument expressions as booleans and return a boolean as the result.
// In addition to the false boolean value, Boolean expression evaluates as false the following: null, 0, and undefined values. The Boolean expression evaluates all other values as true, including non-zero numeric values and arrays.

export const and = () => {  };	// Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
export const not = () => {  };	// Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
export const or = () => {  };	// Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.

// Comparison Expression Operators
// Comparison expressions return a boolean except for $cmp which returns a number.
// The comparison expressions take two argument expressions and compare both value and type, using the specified BSON comparison order for values of different types.

export const cmp = () => {  };	// Returns 0 if the two values are equivalent, 1 if the first value is greater than the second, and -1 if the first value is less than the second.
export const eq = () => {  };	// Returns true if the values are equivalent.
export const gt = () => {  };	// Returns true if the first value is greater than the second.
export const gte = () => {  };	// Returns true if the first value is greater than or equal to the second.
export const lt = () => {  };	// Returns true if the first value is less than the second.
export const lte = () => {  };	// Returns true if the first value is less than or equal to the second.
export const ne = () => {  };	// Returns true if the values are not equivalent.

// Conditional Expression Operators

export const cond = () => {  };	    // A ternary operator that evaluates one expression, and depending on the result, returns the value of one of the other two expressions. Accepts either three expressions in an ordered list or three named parameters.
export const ifNull = () => {  };	// Returns either the non-null result of the first expression or the result of the second expression if the first expression results in a null result. Null result encompasses instances of undefined values or missing fields. Accepts two expressions as arguments. The result of the second expression can be null.
export const switch = () => {  };	// Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a specified expression and breaks out of the control flow.

// Custom Aggregation Expression Operators

export const accumulator = () => {  };  // Defines a custom accumulator function.

export const function = () => {  };     // Defines a custom function.

// Data Size Operators
// The following operators return the size of a data element:

export const binarySize = () => {  };	// Returns the size of a given string or binary data value’s content in bytes.
export const bsonSize = () => {  };	    // Returns the size in bytes of a given document (i.e. bsontype Object) when encoded as BSON.

// Date Expression Operators
// The following operators returns date objects or components of a date object:

export const dateFromParts = () => {  };	// Constructs a BSON Date object given the date’s constituent parts.
export const dateFromString = () => {  };	// Converts a date/time string to a date object.
export const dateToParts = () => {  };	    // Returns a document containing the constituent parts of a date.
export const dateToString = () => {  };	    // Returns the date as a formatted string.
export const dayOfMonth = () => {  };	    // Returns the day of the month for a date as a number between 1 and 31.
export const dayOfWeek = () => {  };	    // Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
export const dayOfYear = () => {  };	    // Returns the day of the year for a date as a number between 1 and 366 (leap year).
export const hour = () => {  };	            // Returns the hour for a date as a number between 0 and 23.
export const isoDayOfWeek = () => {  };	    // Returns the weekday number in ISO 8601 format, ranging from 1 (for Monday) to 7 (for Sunday).
export const isoWeek = () => {  };	        // Returns the week number in ISO 8601 format, ranging from 1 to 53. Week numbers start at 1 with the week (Monday through Sunday) that contains the year’s first Thursday.
export const isoWeekYear = () => {  };	    // Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the Sunday of the last week (ISO 8601).
export const millisecond = () => {  };	    // Returns the milliseconds of a date as a number between 0 and 999.
export const minute = () => {  };	        // Returns the minute for a date as a number between 0 and 59.
export const month = () => {  };	        // Returns the month for a date as a number between 1 (January) and 12 (December).
export const second = () => {  };	        // Returns the seconds for a date as a number between 0 and 60 (leap seconds).
export const toDate = () => {  };           // Converts value to a Date.

export const week = () => {  };     // Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the year) and 53 (leap year).
export const year = () => {  };     // Returns the year for a date as a number (e.g. 2014).

// The following arithmetic operators can take date operands:

export const add = () => {  };	Adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date.
export const subtract = () => {  };	Returns the result of subtracting the second value from the first. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.

// Literal Expression Operator

export const literal = () => {  };	// Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For example, use a $literal expression to a string that starts with a $ to avoid parsing as a field path.

// Miscellaneous Operators

export const rand = () => {  };         // Returns a random float between 0 and 1
export const sampleRate = () => {  };   // Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the quantity chosen approximates the sample rate expressed as a percentage of the total number of documents.

Object Expression Operators

export const mergeObjects = () => {  };           Combines multiple documents into a single document.
export const objectToArray = () => {  };          Converts a document to an array of documents representing key-value pairs.

// Set Expression Operators
// Set expressions performs set operation on arrays, treating arrays as sets. Set expressions ignores the duplicate entries in each input array and the order of the elements.
// If the set operation returns a set, the operation filters out duplicates in the result to output an array that contains only unique entries. The order of the elements in the output array is unspecified.
// If a set contains a nested array element, the set expression does not descend into the nested array but evaluates the array at top-level.

export const allElementsTrue = () => {  };	// Returns true if no element of a set evaluates to false, otherwise, returns false. Accepts a single argument expression.
export const anyElementTrue = () => {  };	// Returns true if any elements of a set evaluate to true; otherwise, returns false. Accepts a single argument expression.
export const setDifference = () => {  };	// Returns a set with elements that appear in the first set but not in the second set; i.e. performs a relative complement of the second set relative to the first. Accepts exactly two argument expressions.
export const setEquals = () => {  };	    // Returns true if the input sets have the same distinct elements. Accepts two or more argument expressions.
export const setIntersection = () => {  };	// Returns a set with elements that appear in all of the input sets. Accepts any number of argument expressions.
export const setIsSubset = () => {  };	    // Returns true if all elements of the first set appear in the second set, including when the first set equals the second set; i.e. not a strict subset. Accepts exactly two argument expressions.
export const setUnion = () => {  };	        // Returns a set with elements that appear in any of the input sets.

// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

export const concat = () => {  };           // behavior is well-defined regardless of the characters used.
export const concat = () => {  };	        // Concatenates any number of strings.
export const dateFromString = () => {  };	// Converts a date/time string to a date object.
export const dateToString = () => {  };	    // Returns the date as a formatted string.
export const indexOfBytes = () => {  };	    // Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the substring is not found, returns -1.
export const indexOfCP = () => {  };	    // Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence. If the substring is not found, returns -1
export const ltrim = () => {  };            // Removes whitespace or the specified characters from the beginning of a string.


export const regexFind = () => {  };      // Applies a regular expression (regex) to a string and returns information on the first matched substring.
export const regexFindAll = () => {  };   // Applies a regular expression (regex) to a string and returns information on the all matched substrings.
export const regexMatch = () => {  };            //     Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
export const replaceOne = () => {  };            //     Replaces the first instance of a matched string in a given input.
export const replaceAll = () => {  };            //     Replaces all instances of a matched string in a given input.
export const rtrim = () => {  };            //      Removes whitespace or the specified characters from the end of a string.
export const split = () => {  };            //	    Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found within the string, returns an array containing the original string.
export const strLenBytes = () => {  };            //	Returns the number of UTF-8 encoded bytes in a string.
export const strLenCP = () => {  };            //	Returns the number of UTF-8 code points in a string.
export const strcasecmp = () => {  };            //	    Performs case-insensitive string comparison and returns: 0 if two strings are equivalent, 1 if the first string is greater than the second, and -1 if the first string is less than the second.
export const substr = () => {  };            //	    Deprecated. Use $substrBytes or $substrCP.
export const substrBytes = () => {  };            //	Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the string and continues for the specified number of bytes.
export const substrCP = () => {  };            //	Returns the substring of a string. Starts with the character at the specified UTF-8 code point (CP) index (zero-based) in the string and continues for the number of code points specified.
export const toLower = () => {  };            //	Converts a string to lowercase. Accepts a single argument expression.
export const toString = () => {  };            //   Converts value to a string.
export const trim = () => {  };            //       Removes whitespace or the specified characters from the beginning and end of a string.
export const toUpper = () => {  };            //	Converts a string to uppercase. Accepts a single argument expression.

// Text Expression Operator

export const meta = () => {  };            //	Access available per-document metadata related to the aggregation operation.

// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers. Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees to convert between degree and radian measurements.

export const sin = () => {  };            //	Returns the sine of a value that is measured in radians.
export const cos = () => {  };            //	Returns the cosine of a value that is measured in radians.
export const tan = () => {  };            //	Returns the tangent of a value that is measured in radians.
export const asin = () => {  };            //	Returns the inverse sin (arc sine) of a value in radians.
export const acos = () => {  };            //	Returns the inverse cosine (arc cosine) of a value in radians.
export const atan = () => {  };            //	Returns the inverse tangent (arc tangent) of a value in radians.
export const atan2 = () => {  };            //	Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed to the expression respectively.
export const asinh = () => {  };            //	Returns the inverse hyperbolic sine (hyperbolic arc sine) of a value in radians.
export const acosh = () => {  };            //	Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians.
export const atanh = () => {  };            //	Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians.
export const sinh = () => {  };            //	Returns the hyperbolic sine of a value that is measured in radians.
export const cosh = () => {  };            //	Returns the hyperbolic cosine of a value that is measured in radians.
export const tanh = () => {  };            //	Returns the hyperbolic tangent of a value that is measured in radians.
export const degreesToRadians = () => {  };            //	Converts a value from degrees to radians.
export const radiansToDegrees = () => {  };            //	Converts a value from radians to degrees.

// Type Expression Operators

export const convert = () => {  };            //    Converts a value to a specified type.

export const isNumber = () => {  };            // Returns boolean true if the specified expression resolves to an integer, decimal, double, or long.
// Returns boolean false if the expression resolves to any other BSON type, null, or a missing field.

export const toBool = () => {  };            //     Converts value to a boolean.
export const toDate = () => {  };            //     Converts value to a Date.
export const toDecimal = () => {  };            //  Converts value to a Decimal128.
export const toDouble = () => {  };            //   Converts value to a double.
export const toInt = () => {  };            //      Converts value to an integer.
export const toLong = () => {  };            //     Converts value to a long.
export const toObjectId = () => {  };            //     Converts value to an ObjectId.
export const toString = () => {  };            //   Converts value to a string.
export const type = () => {  };            //	Return the BSON data type of the field.

// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums, minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the expression once for each input document, and maintain their stage for the group of documents that share the same group key.

export const accumulator = () => {  };            //	Returns the result of a user-defined accumulator function.
export const addToSet = () => {  };            //	Returns an array of unique expression values for each group. Order of the array elements is undefined.
export const avg = () => {  };            //	Returns an average of numerical values. Ignores non-numeric values.
export const first = () => {  };            //  Returns a value from the first document for each group. Order is only defined if the documents are in a defined order.
// Distinct from the $first array operator.
export const last = () => {  };            //   Returns a value from the last document for each group. Order is only defined if the documents are in a defined order.
// Distinct from the $last array operator.
export const max = () => {  };            //	Returns the highest expression value for each group.
export const mergeObjects = () => {  };            //	Returns a document created by combining the input documents for each group.
export const min = () => {  };            //	Returns the lowest expression value for each group.
export const push = () => {  };            //	Returns an array of expression values for each group.
export const stdDevPop = () => {  };            //	Returns the population standard deviation of the input values.
export const stdDevSamp = () => {  };            //	Returns the sample standard deviation of the input values.
export const sum = () => {  };            //	Returns a sum of numerical values. Ignores non-numeric values.

// Accumulators (in Other Stages)
// Some operators that are available as accumulators for the $group stage are also available for use in other stages but not as accumulators. When used in these other stages, these operators do not maintain their state and can take as input either a single argument or multiple arguments. For details, refer to the specific operator page.
// The following accumulator operators are also available in the $project, $addFields, and $set stages.

export const avg = () => {  };            //	Returns an average of the specified expression or list of expressions for each document. Ignores non-numeric values.
export const max = () => {  };            //	Returns the maximum of the specified expression or list of expressions for each document
export const min = () => {  };            //	Returns the minimum of the specified expression or list of expressions for each document
export const stdDevPop = () => {  };            //	Returns the population standard deviation of the input values.
export const stdDevSamp = () => {  };            //	Returns the sample standard deviation of the input values.
export const sum = () => {  };            //	Returns a sum of numerical values. Ignores non-numeric values.

// Variable Expression Operators

export const let = () => {  };            //    Defines variables for use within the scope of a subexpression and returns the result of the subexpression. Accepts named parameters.

// Accepts any number of argument expressions.
// Alphabetical Listing of Expression Operators

export const abs = () => {  };            //	Returns the absolute value of a number.
export const accumulator = () => {  };            //	Returns the result of a user-defined accumulator function.
export const acos = () => {  };            //	Returns the inverse cosine (arc cosine) of a value in radians.
export const acosh = () => {  };            //	Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians.
export const add = () => {  };            //	Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date.
export const addToSet = () => {  };            //   Returns an array of unique expression values for each group. Order of the array elements is undefined.

// Available in $group stage only.

export const allElementsTrue = () => {  };            //	Returns true if no element of a set evaluates to false, otherwise, returns false. Accepts a single argument expression.
export const and = () => {  };            //	Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
export const anyElementTrue = () => {  };            //	Returns true if any elements of a set evaluate to true; otherwise, returns false. Accepts a single argument expression.
export const arrayElemAt = () => {  };            //	Returns the element at the specified array index.
export const arrayToObject = () => {  };            //	Converts an array of key value pairs to a document.
export const asin = () => {  };            //	Returns the inverse sine (arc sine) of a value in radians.
export const asinh = () => {  };            //	Returns the inverse hyperbolic sin (hyperbolic arc sine) of a value in radians.
export const atan = () => {  };            //	Returns the inverse tangent (arc tangent) of a value in radians.
export const atan2 = () => {  };            //	Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed to the expression respectively.
export const atanh = () => {  };            //	Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians.
export const avg = () => {  };            //    Returns an average of numerical values. Ignores non-numeric values.
export const binarySize = () => {  };            //     Returns the size of a given string or binary data value’s content in bytes.
export const bsonSize = () => {  };            //   Returns the size in bytes of a given document (i.e. bsontype Object) when encoded as BSON.
export const ceil = () => {  };            //	Returns the smallest integer greater than or equal to the specified number.
export const cmp = () => {  };            //	Returns: 0 if the two values are equivalent, 1 if the first value is greater than the second, and -1 if the first value is less than the second.
export const concat = () => {  };            //	Concatenates any number of strings.
export const concatArrays = () => {  };            //	Concatenates arrays to return the concatenated array.
export const cond = () => {  };            //	A ternary operator that evaluates one expression, and depending on the result, returns the value of one of the other two expressions. Accepts either three expressions in an ordered list or three named parameters.
export const convert = () => {  };            //	Converts a value to a specified type.
export const cos = () => {  };            //	Returns the cosine of a value that is measured in radians.
export const cosh = () => {  };            //	Returns the hyperbolic cosine of a value that is measured in radians.
export const dateFromParts = () => {  };            //	Constructs a BSON Date object given the date’s constituent parts.
export const dateToParts = () => {  };            //	Returns a document containing the constituent parts of a date.
export const dateFromString = () => {  };            //	Returns a date/time as a date object.
export const dateToString = () => {  };            //	Returns the date as a formatted string.
export const dayOfMonth = () => {  };            //	Returns the day of the month for a date as a number between 1 and 31.
export const dayOfWeek = () => {  };            //	Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
export const dayOfYear = () => {  };            //	Returns the day of the year for a date as a number between 1 and 366 (leap year).
export const degreesToRadians = () => {  };            //	Converts a value from degrees to radians.
export const divide = () => {  };            //	Returns the result of dividing the first number by the second. Accepts two argument expressions.
export const eq = () => {  };            //	Returns true if the values are equivalent.
export const exp = () => {  };            //	Raises e to the specified exponent.
export const filter = () => {  };            //	Selects a subset of the array to return an array with only the elements that match the filter condition.
export const first = () => {  };            //  Returns a value from the first document for each group. Order is only defined if the documents are in a defined order.

// Available in $group stage only.

export const first = () => {  };            //  Returns the first array element.
export const floor = () => {  };            //	Returns the largest integer less than or equal to the specified number.
export const function = () => {  };            //   Defines a custom aggregation function.
export const gt = () => {  };            //	Returns true if the first value is greater than the second.
export const gte = () => {  };            //	Returns true if the first value is greater than or equal to the second.
export const hour = () => {  };            //	Returns the hour for a date as a number between 0 and 23.
export const ifNull = () => {  };            //	Returns either the non-null result of the first expression or the result of the second expression if the first expression results in a null result. Null result encompasses instances of undefined values or missing fields. Accepts two expressions as arguments. The result of the second expression can be null.
export const in = () => {  };            //	Returns a boolean indicating whether a specified value is in an array.
export const indexOfArray = () => {  };            //	Searches an array for an occurrence of a specified value and returns the array index of the first occurrence. If the substring is not found, returns -1.
export const indexOfBytes = () => {  };            //	Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the substring is not found, returns -1.
export const indexOfCP = () => {  };            //	Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence. If the substring is not found, returns -1.
export const isArray = () => {  };            //	Determines if the operand is an array. Returns a boolean.
export const isNumber = () => {  };            //	Determines if the expression resolves to an integer, double, decimal, or long.
export const isoDayOfWeek = () => {  };            //	Returns the weekday number in ISO 8601 format, ranging from 1 (for Monday) to 7 (for Sunday).
export const isoWeek = () => {  };            //	Returns the week number in ISO 8601 format, ranging from 1 to 53. Week numbers start at 1 with the week (Monday through Sunday) that contains the year’s first Thursday.
export const isoWeekYear = () => {  };            //	Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the Sunday of the last week (ISO 8601).
export const last = () => {  };            //   Returns a value from the last document for each group. Order is only defined if the documents are in a defined order.
// Available in $group stage only.
// Distinct from the $last array operator.
// $last   Returns the last array element.
// Distinct from the $last accumulator.
export const let = () => {  };            //    Defines variables for use within the scope of a subexpression and returns the result of the subexpression. Accepts named parameters.
// Accepts any number of argument expressions.
export const literal = () => {  };            //	Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For example, use a $literal expression to a string that starts with a $ to avoid parsing as a field path.
export const ln = () => {  };            //	Calculates the natural log of a number.
export const log = () => {  };            //	Calculates the log of a number in the specified base.
export const log10 = () => {  };            //	Calculates the log base 10 of a number.
export const lt = () => {  };            //	Returns true if the first value is less than the second.
export const lte = () => {  };            //	Returns true if the first value is less than or equal to the second.
export const ltrim = () => {  };            //	Removes whitespace or the specified characters from the beginning of a string.
export const map = () => {  };            //	Applies a subexpression to each element of an array and returns the array of resulting values in order. Accepts named parameters.
export const max = () => {  };            //    Returns the highest expression value for each group.
export const mergeObjects = () => {  };            //	Combines multiple documents into a single document.
export const meta = () => {  };            //	Access available per-document metadata related to the aggregation operation.
export const min = () => {  };            //    Returns the lowest expression value for each group.
export const millisecond = () => {  };            //	Returns the milliseconds of a date as a number between 0 and 999.
export const minute = () => {  };            //	Returns the minute for a date as a number between 0 and 59.
export const mod = () => {  };            //	Returns the remainder of the first number divided by the second. Accepts two argument expressions.
export const month = () => {  };            //	Returns the month for a date as a number between 1 (January) and 12 (December).
export const multiply = () => {  };            //	Multiplies numbers to return the product. Accepts any number of argument expressions.
export const ne = () => {  };            //	Returns true if the values are not equivalent.
export const not = () => {  };            //	Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
export const objectToArray = () => {  };            //	Converts a document to an array of documents representing key-value pairs.
export const or = () => {  };            //	Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.
export const pow = () => {  };            //	Raises a number to the specified exponent.
export const push = () => {  };            //   Returns an array of expression values for each group.
// Available in $group stage only.
export const radiansToDegrees = () => {  };            //	Converts a value from radians to degrees.
export const rand = () => {  };            //   Returns a random float between 0 and 1.
export const range = () => {  };            //	Outputs an array containing a sequence of integers according to user-defined inputs.
export const reduce = () => {  };            //	Applies an expression to each element in an array and combines them into a single value.
export const regexFind = () => {  };            //	Applies a regular expression (regex) to a string and returns information on the first matched substring.
export const regexFindAll = () => {  };            //	Applies a regular expression (regex) to a string and returns information on the all matched substrings.
export const regexMatch = () => {  };            //	Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
export const replaceOne = () => {  };            // Replaces the first instance of a matched string in a given input.
export const replaceAll = () => {  };            //     Replaces all instances of a matched string in a given input.
export const reverseArray = () => {  };            //	Returns an array with the elements in reverse order.
export const round = () => {  };            //	Rounds a number to a whole integer or to a specified decimal place.
export const rtrim = () => {  };            //	Removes whitespace or the specified characters from the end of a string.
export const sampleRate = () => {  };            //     Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the quantity chosen approximates the sample rate expressed as a percentage of the total number of documents.
export const second = () => {  };            //	    Returns the seconds for a date as a number between 0 and 60 (leap seconds).
export const setDifference = () => {  };            //	Returns a set with elements that appear in the first set but not in the second set; i.e. performs a relative complement of the second set relative to the first. Accepts exactly two argument expressions.
export const setEquals = () => {  };            //	    Returns true if the input sets have the same distinct elements. Accepts two or more argument expressions.
export const setIntersection = () => {  };            //	Returns a set with elements that appear in all of the input sets. Accepts any number of argument expressions.
export const setIsSubset = () => {  };            //	Returns true if all elements of the first set appear in the second set, including when the first set equals the second set; i.e. not a strict subset. Accepts exactly two argument expressions.
export const setUnion = () => {  };            //	Returns a set with elements that appear in any of the input sets.
export const size = () => {  };            //	Returns the number of elements in the array. Accepts a single expression as argument.
export const sin = () => {  };            //	Returns the sine of a value that is measured in radians.
export const sinh = () => {  };            //	Returns the hyperbolic sine of a value that is measured in radians.
export const slice = () => {  };            //	Returns a subset of an array.
export const split = () => {  };            //	Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found within the string, returns an array containing the original string.
export const sqrt = () => {  };            //	Calculates the square root.
export const stdDevPop = () => {  };            //  Returns the population standard deviation of the input values.
export const stdDevSamp = () => {  };            //     Returns the sample standard deviation of the input values.
export const strcasecmp = () => {  };            //	    Performs case-insensitive string comparison and returns: 0 if two strings are equivalent, 1 if the first string is greater than the second, and -1 if the first string is less than the second.
export const strLenBytes = () => {  };            //	Returns the number of UTF-8 encoded bytes in a string.
export const strLenCP = () => {  };            //	Returns the number of UTF-8 code points in a string.
export const substr = () => {  };            //	    Deprecated. Use $substrBytes or $substrCP.
export const substrBytes = () => {  };            //	Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the string and continues for the specified number of bytes.
export const substrCP = () => {  };            //	Returns the substring of a string. Starts with the character at the specified UTF-8 code point (CP) index (zero-based) in the string and continues for the number of code points specified.
export const subtract = () => {  };            //	Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.
export const sum = () => {  };            //    Returns a sum of numerical values. Ignores non-numeric values.
export const switch = () => {  };            //	Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a specified expression and breaks out of the control flow.
export const tan = () => {  };            //	Returns the tangent of a value that is measured in radians.
export const tanh = () => {  };            //	Returns the hyperbolic tangent of a value that is measured in radians.
export const toBool = () => {  };            //	Converts value to a boolean.
export const toDate = () => {  };            //	Converts value to a Date.
export const toDecimal = () => {  };            //	Converts value to a Decimal128.
export const toDouble = () => {  };            //	Converts value to a double.
export const toInt = () => {  };            //	Converts value to an integer.
export const toLong = () => {  };            //	Converts value to a long.
export const toObjectId = () => {  };            //	Converts value to an ObjectId.
export const toString = () => {  };            //	Converts value to a string.
export const toLower = () => {  };            //	Converts a string to lowercase. Accepts a single argument expression.
export const toUpper = () => {  };            //	Converts a string to uppercase. Accepts a single argument expression.
export const trim = () => {  };            //	Removes whitespace or the specified characters from the beginning and end of a string.
export const trunc = () => {  };            //	Truncates a number to a whole integer or to a specified decimal place.
export const type = () => {  };            //	Return the BSON data type of the field.
export const week = () => {  };            //	Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the year) and 53 (leap year).
export const year = () => {  };            //	Returns the year for a date as a number (e.g. 2014).
export const zip = () => {  };            //	Merge two arrays together.
 */

