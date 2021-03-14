/**
 * pipelineOperators
 */
const pipelineOperators = {
    /**
     * And description
     */
    // And: (...andList: any[]) => ({ $and: andList }),
    /**
     * ArrayElemAt description
     */
    // ArrayElemAt: (arrayName: string, position: number) => ({ $arrayElemAt: [arrayName, position] }),
    /**
     * Concat description
     */
    // Concat: (...arrayList: any[]) => ({ $concat: [ ...arrayList ] }),
    /**
     * Equal description
     */
    // Equal: (a: any, b: any) => ({ $eq: [a, b] }),
    /**
     * Expr description
     */
    // Expr: (expression: any) => ({ $expr: expression }),
    /**
     * Field description
     */
    // Field: (fieldName: string, soughtValue: any) => {
    //     const newObject = {};
    //     newObject[fieldName] = soughtValue;
    //     return newObject;
    // },
    /**
     * In description
     */
    // In: (valueToFind: any, arrayToSearch: any) => ({ $in: [valueToFind, arrayToSearch] }),
    /**
     * NotEqual description
     */
    // NotEqual: (a: any, b: any) => ({ $ne: [a, b] }),
    /**
     * Or description
     */
    // Or: (...orList: any[]) => ({ $or: orList }),
    /**
     * Reduce description
     */
    // Reduce: (input: any, initialValue: any, arrayMode = false) => ({
    //     $reduce: { input: input, initialValue: initialValue, in: arrayMode
    //             ? { $concatArrays : ["$$value", "$$this"] }
    //             : { $concat : ["$$value", "$$this"] } }
    // }),
    /**
     * RegexMatch description
     */
    // RegexMatch: (input: string, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } })
};

/**
 * Pipeline operators exports
 */

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


export const Multiply = () => ({  });	    // Multiplies numbers to return the product. Accepts any number of argument expressions.
export const Pow = () => ({  });	        // Raises a number to the specified exponent.
export const Round = () => ({  });	    // Rounds a number to to a whole integer or to a specified decimal place.
export const Sqrt = () => ({  });	        // Calculates the square root.
export const Subtract = () => ({  });	    // Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.
export const Trunc = () => ({  });	    // Truncates a number to a whole integer or to a specified decimal place.

// Array Expression Operators

export const ArrayElemAt = () => ({  });	    // Returns the element at the specified array index.
export const ArrayToObject = () => ({  });	// Converts an array of key value pairs to a document.
export const ConcatArrays = () => ({  });	    // Concatenates arrays to return the concatenated array.
export const Filter = () => ({  });	        // Selects a subset of the array to return an array with only the elements that match the filter condition.
export const First = () => ({  });	        // Returns the first array element. Distinct from $first accumulator.
export const In = () => ({  });	            // Returns a boolean indicating whether a specified value is in an array.
export const IndexOfArray = () => ({  });	    // Searches an array for an occurrence of a specified value and returns the array index of the first occurrence. If the substring is not found, returns -1.
export const IsArray = () => ({  });	        // Determines if the operand is an array. Returns a boolean.
export const Last = () => ({  });	            // Returns the last array element. Distinct from $last accumulator.
export const Map = () => ({  });	            // Applies a subexpression to each element of an array and returns the array of resulting values in order. Accepts named parameters.
export const ObjectToArray = () => ({  });	// Converts a document to an array of documents representing key-value pairs.
export const Range = () => ({  });	        // Outputs an array containing a sequence of integers according to user-defined inputs.
export const Reduce = () => ({  });	        // Applies an expression to each element in an array and combines them into a single value.
export const ReverseArray = () => ({  });	    // Returns an array with the elements in reverse order.
export const Size = () => ({  });	            // Returns the number of elements in the array. Accepts a single expression as argument.
export const Slice = () => ({  });	        // Returns a subset of an array.
export const Zip = () => ({  });	            // Merge two arrays together.

// Boolean Expression Operators
// Boolean expressions evaluate their argument expressions as booleans and return a boolean as the result.
// In addition to the false boolean value, Boolean expression evaluates as false the following: null, 0, and undefined values. The Boolean expression evaluates all other values as true, including non-zero numeric values and arrays.

export const And = () => ({  });	// Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
export const Not = () => ({  });	// Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
export const Or = () => ({  });	// Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.

// Comparison Expression Operators
// Comparison expressions return a boolean except for $cmp which returns a number.
// The comparison expressions take two argument expressions and compare both value and type, using the specified BSON comparison order for values of different types.

export const Cmp = () => ({  });	// Returns 0 if the two values are equivalent, 1 if the first value is greater than the second, and -1 if the first value is less than the second.
export const Eq = () => ({  });	// Returns true if the values are equivalent.
export const Gt = () => ({  });	// Returns true if the first value is greater than the second.
export const Gte = () => ({  });	// Returns true if the first value is greater than or equal to the second.
export const Lt = () => ({  });	// Returns true if the first value is less than the second.
export const Lte = () => ({  });	// Returns true if the first value is less than or equal to the second.
export const Ne = () => ({  });	// Returns true if the values are not equivalent.

// Conditional Expression Operators

export const Cond = () => ({  });	    // A ternary operator that evaluates one expression, and depending on the result, returns the value of one of the other two expressions. Accepts either three expressions in an ordered list or three named parameters.
export const IfNull = () => ({  });	// Returns either the non-null result of the first expression or the result of the second expression if the first expression results in a null result. Null result encompasses instances of undefined values or missing fields. Accepts two expressions as arguments. The result of the second expression can be null.
export const Switch = () => ({  });	// Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a specified expression and breaks out of the control flow.

// Custom Aggregation Expression Operators

export const Accumulator = () => ({  });  // Defines a custom accumulator function.

export const Function = () => ({  });     // Defines a custom function.

// Data Size Operators
// The following operators return the size of a data element:

export const BinarySize = () => ({  });	// Returns the size of a given string or binary data value’s content in bytes.
export const BsonSize = () => ({  });	    // Returns the size in bytes of a given document (i.e. bsontype Object) when encoded as BSON.

// Date Expression Operators
// The following operators returns date objects or components of a date object:

export const DateFromParts = () => ({  });	// Constructs a BSON Date object given the date’s constituent parts.
export const DateFromString = () => ({  });	// Converts a date/time string to a date object.
export const DateToParts = () => ({  });	    // Returns a document containing the constituent parts of a date.
export const DateToString = () => ({  });	    // Returns the date as a formatted string.
export const DayOfMonth = () => ({  });	    // Returns the day of the month for a date as a number between 1 and 31.
export const DayOfWeek = () => ({  });	    // Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
export const DayOfYear = () => ({  });	    // Returns the day of the year for a date as a number between 1 and 366 (leap year).
export const Hour = () => ({  });	            // Returns the hour for a date as a number between 0 and 23.
export const IsoDayOfWeek = () => ({  });	    // Returns the weekday number in ISO 8601 format, ranging from 1 (for Monday) to 7 (for Sunday).
export const IsoWeek = () => ({  });	        // Returns the week number in ISO 8601 format, ranging from 1 to 53. Week numbers start at 1 with the week (Monday through Sunday) that contains the year’s first Thursday.
export const IsoWeekYear = () => ({  });	    // Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the Sunday of the last week (ISO 8601).
export const Millisecond = () => ({  });	    // Returns the milliseconds of a date as a number between 0 and 999.
export const Minute = () => ({  });	        // Returns the minute for a date as a number between 0 and 59.
export const Month = () => ({  });	        // Returns the month for a date as a number between 1 (January) and 12 (December).
export const Second = () => ({  });	        // Returns the seconds for a date as a number between 0 and 60 (leap seconds).
export const ToDate = () => ({  });           // Converts value to a Date.

export const Week = () => ({  });     // Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the year) and 53 (leap year).
export const Year = () => ({  });     // Returns the year for a date as a number (e.g. 2014).

// The following arithmetic operators can take date operands:

// export const Add = () => ({  });	        // Adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date.
// export const Subtract = () => ({  });	    // Returns the result of subtracting the second value from the first. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.

// Literal Expression Operator

export const Literal = () => ({  });	// Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For example, use a $literal expression to a string that starts with a $ to avoid parsing as a field path.

// Miscellaneous Operators

export const Rand = () => ({  });         // Returns a random float between 0 and 1
export const SampleRate = () => ({  });   // Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the quantity chosen approximates the sample rate expressed as a percentage of the total number of documents.

// Object Expression Operators

export const MergeObjects = () => ({  });           // Combines multiple documents into a single document.
// export const ObjectToArray = () => ({  });          // Converts a document to an array of documents representing key-value pairs.

// Set Expression Operators
// Set expressions performs set operation on arrays, treating arrays as sets. Set expressions ignores the duplicate entries in each input array and the order of the elements.
// If the set operation returns a set, the operation filters out duplicates in the result to output an array that contains only unique entries. The order of the elements in the output array is unspecified.
// If a set contains a nested array element, the set expression does not descend into the nested array but evaluates the array at top-level.

export const AllElementsTrue = () => ({  });	// Returns true if no element of a set evaluates to false, otherwise, returns false. Accepts a single argument expression.
export const AnyElementTrue = () => ({  });	// Returns true if any elements of a set evaluate to true; otherwise, returns false. Accepts a single argument expression.
export const SetDifference = () => ({  });	// Returns a set with elements that appear in the first set but not in the second set; i.e. performs a relative complement of the second set relative to the first. Accepts exactly two argument expressions.
export const SetEquals = () => ({  });	    // Returns true if the input sets have the same distinct elements. Accepts two or more argument expressions.
export const SetIntersection = () => ({  });	// Returns a set with elements that appear in all of the input sets. Accepts any number of argument expressions.
export const SetIsSubset = () => ({  });	    // Returns true if all elements of the first set appear in the second set, including when the first set equals the second set; i.e. not a strict subset. Accepts exactly two argument expressions.
export const SetUnion = () => ({  });	        // Returns a set with elements that appear in any of the input sets.

// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

export const Concat = () => ({  });           // behavior is well-defined regardless of the characters used.
// export const Concat = () => ({  });	        // Concatenates any number of strings.
// export const DateFromString = () => ({  });	// Converts a date/time string to a date object.
// export const DateToString = () => ({  });	    // Returns the date as a formatted string.
export const IndexOfBytes = () => ({  });	    // Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the substring is not found, returns -1.
export const IndexOfCP = () => ({  });	    // Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence. If the substring is not found, returns -1
export const Ltrim = () => ({  });            // Removes whitespace or the specified characters from the beginning of a string.


export const RegexFind = () => ({  });      // Applies a regular expression (regex) to a string and returns information on the first matched substring.
export const RegexFindAll = () => ({  });   // Applies a regular expression (regex) to a string and returns information on the all matched substrings.
export const RegexMatch = () => ({  });            //     Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
export const ReplaceOne = () => ({  });            //     Replaces the first instance of a matched string in a given input.
export const ReplaceAll = () => ({  });            //     Replaces all instances of a matched string in a given input.
export const Rtrim = () => ({  });            //      Removes whitespace or the specified characters from the end of a string.
export const Split = () => ({  });            //	    Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found within the string, returns an array containing the original string.
export const StrLenBytes = () => ({  });            //	Returns the number of UTF-8 encoded bytes in a string.
export const StrLenCP = () => ({  });            //	Returns the number of UTF-8 code points in a string.
export const StrCaseCmp = () => ({  });            //	    Performs case-insensitive string comparison and returns: 0 if two strings are equivalent, 1 if the first string is greater than the second, and -1 if the first string is less than the second.
export const Substr = () => ({  });            //	    Deprecated. Use $substrBytes or $substrCP.
export const SubstrBytes = () => ({  });            //	Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the string and continues for the specified number of bytes.
export const SubstrCP = () => ({  });            //	Returns the substring of a string. Starts with the character at the specified UTF-8 code point (CP) index (zero-based) in the string and continues for the number of code points specified.
export const ToLower = () => ({  });            //	Converts a string to lowercase. Accepts a single argument expression.
export const ToString = () => ({  });            //   Converts value to a string.
export const Trim = () => ({  });            //       Removes whitespace or the specified characters from the beginning and end of a string.
export const ToUpper = () => ({  });            //	Converts a string to uppercase. Accepts a single argument expression.

// Text Expression Operator

export const Meta = () => ({  });            //	Access available per-document metadata related to the aggregation operation.

// Trigonometry Expression Operators
// Trigonometry expressions perform trigonometric operations on numbers. Values that represent angles are always input or output in radians. Use $degreesToRadians and $radiansToDegrees to convert between degree and radian measurements.

export const Sin = () => ({  });            //	Returns the sine of a value that is measured in radians.
export const Cos = () => ({  });            //	Returns the cosine of a value that is measured in radians.
export const Tan = () => ({  });            //	Returns the tangent of a value that is measured in radians.
export const Asin = () => ({  });            //	Returns the inverse sin (arc sine) of a value in radians.
export const Acos = () => ({  });            //	Returns the inverse cosine (arc cosine) of a value in radians.
export const Atan = () => ({  });            //	Returns the inverse tangent (arc tangent) of a value in radians.
export const Atan2 = () => ({  });            //	Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed to the expression respectively.
export const Asinh = () => ({  });            //	Returns the inverse hyperbolic sine (hyperbolic arc sine) of a value in radians.
export const Acosh = () => ({  });            //	Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians.
export const Atanh = () => ({  });            //	Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians.
export const Sinh = () => ({  });            //	Returns the hyperbolic sine of a value that is measured in radians.
export const Cosh = () => ({  });            //	Returns the hyperbolic cosine of a value that is measured in radians.
export const Tanh = () => ({  });            //	Returns the hyperbolic tangent of a value that is measured in radians.
export const DegreesToRadians = () => ({  });            //	Converts a value from degrees to radians.
export const RadiansToDegrees = () => ({  });            //	Converts a value from radians to degrees.

// Type Expression Operators

export const Convert = () => ({  });            //    Converts a value to a specified type.

export const IsNumber = () => ({  });            // Returns boolean true if the specified expression resolves to an integer, decimal, double, or long.
// Returns boolean false if the expression resolves to any other BSON type, null, or a missing field.

export const ToBool = () => ({  });            //     Converts value to a boolean.
// export const ToDate = () => ({  });            //     Converts value to a Date.
export const ToDecimal = () => ({  });            //  Converts value to a Decimal128.
export const ToDouble = () => ({  });            //   Converts value to a double.
export const ToInt = () => ({  });            //      Converts value to an integer.
export const ToLong = () => ({  });            //     Converts value to a long.
export const ToObjectId = () => ({  });            //     Converts value to an ObjectId.
// export const ToString = () => ({  });            //   Converts value to a string.
export const Type = () => ({  });            //	Return the BSON data type of the field.

// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums, minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the expression once for each input document, and maintain their stage for the group of documents that share the same group key.

// export const Accumulator = () => ({  });            //	Returns the result of a user-defined accumulator function.
export const AddToSet = () => ({  });            //	Returns an array of unique expression values for each group. Order of the array elements is undefined.
export const Avg = () => ({  });            //	Returns an average of numerical values. Ignores non-numeric values.
// export const First = () => ({  });            //  Returns a value from the first document for each group. Order is only defined if the documents are in a defined order.
// Distinct from the $first array operator.
// export const Last = () => ({  });            //   Returns a value from the last document for each group. Order is only defined if the documents are in a defined order.
// Distinct from the $last array operator.
export const Max = () => ({  });            //	Returns the highest expression value for each group.
// export const MergeObjects = () => ({  });            //	Returns a document created by combining the input documents for each group.
export const Min = () => ({  });            //	Returns the lowest expression value for each group.
export const Push = () => ({  });            //	Returns an array of expression values for each group.
export const StdDevPop = () => ({  });            //	Returns the population standard deviation of the input values.
export const StdDevSamp = () => ({  });            //	Returns the sample standard deviation of the input values.
export const Sum = () => ({  });            //	Returns a sum of numerical values. Ignores non-numeric values.

// Accumulators (in Other Stages)
// Some operators that are available as accumulators for the $group stage are also available for use in other stages but not as accumulators. When used in these other stages, these operators do not maintain their state and can take as input either a single argument or multiple arguments. For details, refer to the specific operator page.
// The following accumulator operators are also available in the $project, $addFields, and $set stages.
/*

export const Avg = () => ({  });            //	Returns an average of the specified expression or list of expressions for each document. Ignores non-numeric values.
export const Max = () => ({  });            //	Returns the maximum of the specified expression or list of expressions for each document
export const Min = () => ({  });            //	Returns the minimum of the specified expression or list of expressions for each document
export const StdDevPop = () => ({  });            //	Returns the population standard deviation of the input values.
export const StdDevSamp = () => ({  });            //	Returns the sample standard deviation of the input values.
export const Sum = () => ({  });            //	Returns a sum of numerical values. Ignores non-numeric values.
*/

// Variable Expression Operators

export const Let = () => ({  });            //    Defines variables for use within the scope of a subexpression and returns the result of the subexpression. Accepts named parameters.

// Accepts any number of argument expressions.
// Alphabetical Listing of Expression Operators
/*
export const Abs = () => ({  });            //	Returns the absolute value of a number.
export const Accumulator = () => ({  });            //	Returns the result of a user-defined accumulator function.
export const Acos = () => ({  });            //	Returns the inverse cosine (arc cosine) of a value in radians.
export const Acosh = () => ({  });            //	Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians.
export const Add = () => ({  });            //	Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date.
export const AddToSet = () => ({  });            //   Returns an array of unique expression values for each group. Order of the array elements is undefined.

// Available in $group stage only.

export const AllElementsTrue = () => ({  });            //	Returns true if no element of a set evaluates to false, otherwise, returns false. Accepts a single argument expression.
export const And = () => ({  });            //	Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
export const AnyElementTrue = () => ({  });            //	Returns true if any elements of a set evaluate to true; otherwise, returns false. Accepts a single argument expression.
export const ArrayElemAt = () => ({  });            //	Returns the element at the specified array index.
export const ArrayToObject = () => ({  });            //	Converts an array of key value pairs to a document.
export const Asin = () => ({  });            //	Returns the inverse sine (arc sine) of a value in radians.
export const Asinh = () => ({  });            //	Returns the inverse hyperbolic sin (hyperbolic arc sine) of a value in radians.
export const Atan = () => ({  });            //	Returns the inverse tangent (arc tangent) of a value in radians.
export const Atan2 = () => ({  });            //	Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed to the expression respectively.
export const Atanh = () => ({  });            //	Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians.
export const Avg = () => ({  });            //    Returns an average of numerical values. Ignores non-numeric values.
export const BinarySize = () => ({  });            //     Returns the size of a given string or binary data value’s content in bytes.
export const BsonSize = () => ({  });            //   Returns the size in bytes of a given document (i.e. bsontype Object) when encoded as BSON.
export const Ceil = () => ({  });            //	Returns the smallest integer greater than or equal to the specified number.
export const Cmp = () => ({  });            //	Returns: 0 if the two values are equivalent, 1 if the first value is greater than the second, and -1 if the first value is less than the second.
export const Concat = () => ({  });            //	Concatenates any number of strings.
export const ConcatArrays = () => ({  });            //	Concatenates arrays to return the concatenated array.
export const Cond = () => ({  });            //	A ternary operator that evaluates one expression, and depending on the result, returns the value of one of the other two expressions. Accepts either three expressions in an ordered list or three named parameters.
export const Convert = () => ({  });            //	Converts a value to a specified type.
export const Cos = () => ({  });            //	Returns the cosine of a value that is measured in radians.
export const Cosh = () => ({  });            //	Returns the hyperbolic cosine of a value that is measured in radians.
export const DateFromParts = () => ({  });            //	Constructs a BSON Date object given the date’s constituent parts.
export const DateToParts = () => ({  });            //	Returns a document containing the constituent parts of a date.
export const DateFromString = () => ({  });            //	Returns a date/time as a date object.
export const DateToString = () => ({  });            //	Returns the date as a formatted string.
export const DayOfMonth = () => ({  });            //	Returns the day of the month for a date as a number between 1 and 31.
export const DayOfWeek = () => ({  });            //	Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
export const DayOfYear = () => ({  });            //	Returns the day of the year for a date as a number between 1 and 366 (leap year).
export const DegreesToRadians = () => ({  });            //	Converts a value from degrees to radians.
export const Divide = () => ({  });            //	Returns the result of dividing the first number by the second. Accepts two argument expressions.
export const Eq = () => ({  });            //	Returns true if the values are equivalent.
export const Exp = () => ({  });            //	Raises e to the specified exponent.
export const Filter = () => ({  });            //	Selects a subset of the array to return an array with only the elements that match the filter condition.
export const First = () => ({  });            //  Returns a value from the first document for each group. Order is only defined if the documents are in a defined order.

// Available in $group stage only.

export const First = () => ({  });            //  Returns the first array element.
export const Floor = () => ({  });            //	Returns the largest integer less than or equal to the specified number.
export const Function = () => ({  });            //   Defines a custom aggregation function.
export const Gt = () => ({  });            //	Returns true if the first value is greater than the second.
export const Gte = () => ({  });            //	Returns true if the first value is greater than or equal to the second.
export const Hour = () => ({  });            //	Returns the hour for a date as a number between 0 and 23.
export const IfNull = () => ({  });            //	Returns either the non-null result of the first expression or the result of the second expression if the first expression results in a null result. Null result encompasses instances of undefined values or missing fields. Accepts two expressions as arguments. The result of the second expression can be null.
export const In = () => ({  });            //	Returns a boolean indicating whether a specified value is in an array.
export const IndexOfArray = () => ({  });            //	Searches an array for an occurrence of a specified value and returns the array index of the first occurrence. If the substring is not found, returns -1.
export const IndexOfBytes = () => ({  });            //	Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the substring is not found, returns -1.
export const IndexOfCP = () => ({  });            //	Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence. If the substring is not found, returns -1.
export const IsArray = () => ({  });            //	Determines if the operand is an array. Returns a boolean.
export const IsNumber = () => ({  });            //	Determines if the expression resolves to an integer, double, decimal, or long.
export const IsoDayOfWeek = () => ({  });            //	Returns the weekday number in ISO 8601 format, ranging from 1 (for Monday) to 7 (for Sunday).
export const IsoWeek = () => ({  });            //	Returns the week number in ISO 8601 format, ranging from 1 to 53. Week numbers start at 1 with the week (Monday through Sunday) that contains the year’s first Thursday.
export const IsoWeekYear = () => ({  });            //	Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the Sunday of the last week (ISO 8601).
export const Last = () => ({  });            //   Returns a value from the last document for each group. Order is only defined if the documents are in a defined order.
// Available in $group stage only.
// Distinct from the $last array operator.
// $last   Returns the last array element.
// Distinct from the $last accumulator.
export const Let = () => ({  });            //    Defines variables for use within the scope of a subexpression and returns the result of the subexpression. Accepts named parameters.
// Accepts any number of argument expressions.
export const Literal = () => ({  });            //	Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For example, use a $literal expression to a string that starts with a $ to avoid parsing as a field path.
export const Ln = () => ({  });            //	Calculates the natural log of a number.
export const Log = () => ({  });            //	Calculates the log of a number in the specified base.
export const Log10 = () => ({  });            //	Calculates the log base 10 of a number.
export const Lt = () => ({  });            //	Returns true if the first value is less than the second.
export const Lte = () => ({  });            //	Returns true if the first value is less than or equal to the second.
export const Ltrim = () => ({  });            //	Removes whitespace or the specified characters from the beginning of a string.
export const Map = () => ({  });            //	Applies a subexpression to each element of an array and returns the array of resulting values in order. Accepts named parameters.
export const Max = () => ({  });            //    Returns the highest expression value for each group.
export const MergeObjects = () => ({  });            //	Combines multiple documents into a single document.
export const Meta = () => ({  });            //	Access available per-document metadata related to the aggregation operation.
export const Min = () => ({  });            //    Returns the lowest expression value for each group.
export const Millisecond = () => ({  });            //	Returns the milliseconds of a date as a number between 0 and 999.
export const Minute = () => ({  });            //	Returns the minute for a date as a number between 0 and 59.
export const Mod = () => ({  });            //	Returns the remainder of the first number divided by the second. Accepts two argument expressions.
export const Month = () => ({  });            //	Returns the month for a date as a number between 1 (January) and 12 (December).
export const Multiply = () => ({  });            //	Multiplies numbers to return the product. Accepts any number of argument expressions.
export const Ne = () => ({  });            //	Returns true if the values are not equivalent.
export const Not = () => ({  });            //	Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
export const ObjectToArray = () => ({  });            //	Converts a document to an array of documents representing key-value pairs.
export const Or = () => ({  });            //	Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.
export const Pow = () => ({  });            //	Raises a number to the specified exponent.
export const Push = () => ({  });            //   Returns an array of expression values for each group.
// Available in $group stage only.
export const RadiansToDegrees = () => ({  });            //	Converts a value from radians to degrees.
export const Rand = () => ({  });            //   Returns a random float between 0 and 1.
export const Range = () => ({  });            //	Outputs an array containing a sequence of integers according to user-defined inputs.
export const Reduce = () => ({  });            //	Applies an expression to each element in an array and combines them into a single value.
export const RegexFind = () => ({  });            //	Applies a regular expression (regex) to a string and returns information on the first matched substring.
export const RegexFindAll = () => ({  });            //	Applies a regular expression (regex) to a string and returns information on the all matched substrings.
export const RegexMatch = () => ({  });            //	Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
export const ReplaceOne = () => ({  });            // Replaces the first instance of a matched string in a given input.
export const ReplaceAll = () => ({  });            //     Replaces all instances of a matched string in a given input.
export const ReverseArray = () => ({  });            //	Returns an array with the elements in reverse order.
export const Round = () => ({  });            //	Rounds a number to a whole integer or to a specified decimal place.
export const Rtrim = () => ({  });            //	Removes whitespace or the specified characters from the end of a string.
export const SampleRate = () => ({  });            //     Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the quantity chosen approximates the sample rate expressed as a percentage of the total number of documents.
export const Second = () => ({  });            //	    Returns the seconds for a date as a number between 0 and 60 (leap seconds).
export const SetDifference = () => ({  });            //	Returns a set with elements that appear in the first set but not in the second set; i.e. performs a relative complement of the second set relative to the first. Accepts exactly two argument expressions.
export const SetEquals = () => ({  });            //	    Returns true if the input sets have the same distinct elements. Accepts two or more argument expressions.
export const SetIntersection = () => ({  });            //	Returns a set with elements that appear in all of the input sets. Accepts any number of argument expressions.
export const SetIsSubset = () => ({  });            //	Returns true if all elements of the first set appear in the second set, including when the first set equals the second set; i.e. not a strict subset. Accepts exactly two argument expressions.
export const SetUnion = () => ({  });            //	Returns a set with elements that appear in any of the input sets.
export const Size = () => ({  });            //	Returns the number of elements in the array. Accepts a single expression as argument.
export const Sin = () => ({  });            //	Returns the sine of a value that is measured in radians.
export const Sinh = () => ({  });            //	Returns the hyperbolic sine of a value that is measured in radians.
export const Slice = () => ({  });            //	Returns a subset of an array.
export const Split = () => ({  });            //	Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found within the string, returns an array containing the original string.
export const Sqrt = () => ({  });            //	Calculates the square root.
export const StdDevPop = () => ({  });            //  Returns the population standard deviation of the input values.
export const StdDevSamp = () => ({  });            //     Returns the sample standard deviation of the input values.
export const StrCaseCmp = () => ({  });            //	    Performs case-insensitive string comparison and returns: 0 if two strings are equivalent, 1 if the first string is greater than the second, and -1 if the first string is less than the second.
export const StrLenBytes = () => ({  });            //	Returns the number of UTF-8 encoded bytes in a string.
export const StrLenCP = () => ({  });            //	Returns the number of UTF-8 code points in a string.
export const Substr = () => ({  });            //	    Deprecated. Use $substrBytes or $substrCP.
export const SubstrBytes = () => ({  });            //	Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the string and continues for the specified number of bytes.
export const SubstrCP = () => ({  });            //	Returns the substring of a string. Starts with the character at the specified UTF-8 code point (CP) index (zero-based) in the string and continues for the number of code points specified.
export const Subtract = () => ({  });            //	Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number.
export const Sum = () => ({  });            //    Returns a sum of numerical values. Ignores non-numeric values.
export const Switch = () => ({  });            //	Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a specified expression and breaks out of the control flow.
export const Tan = () => ({  });            //	Returns the tangent of a value that is measured in radians.
export const Tanh = () => ({  });            //	Returns the hyperbolic tangent of a value that is measured in radians.
export const ToBool = () => ({  });            //	Converts value to a boolean.
export const ToDate = () => ({  });            //	Converts value to a Date.
export const ToDecimal = () => ({  });            //	Converts value to a Decimal128.
export const ToDouble = () => ({  });            //	Converts value to a double.
export const ToInt = () => ({  });            //	Converts value to an integer.
export const ToLong = () => ({  });            //	Converts value to a long.
export const ToObjectId = () => ({  });            //	Converts value to an ObjectId.
export const ToString = () => ({  });            //	Converts value to a string.
export const ToLower = () => ({  });            //	Converts a string to lowercase. Accepts a single argument expression.
export const ToUpper = () => ({  });            //	Converts a string to uppercase. Accepts a single argument expression.
export const Trim = () => ({  });            //	Removes whitespace or the specified characters from the beginning and end of a string.
export const Trunc = () => ({  });            //	Truncates a number to a whole integer or to a specified decimal place.
export const Type = () => ({  });            //	Return the BSON data type of the field.
export const Week = () => ({  });            //	Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the year) and 53 (leap year).
export const Year = () => ({  });            //	Returns the year for a date as a number (e.g. 2014).
export const Zip = () => ({  });            //	Merge two arrays together.
 */

