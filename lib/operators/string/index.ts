// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

/**
 * Concatenates any number of strings.
 * @param expressions
 * @constructor
 */
export const Concat = (...expressions: any) => ({ $concat: expressions });
/**
 * Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the
 * substring is not found, returns -1.
 * @param stringExpression
 * @param substringExpression
 * @param startIndex
 * @param endIndex
 * @constructor
 */
export const IndexOfBytes = (stringExpression: any, substringExpression: any, startIndex: any, endIndex: any) => ({
    $indexOfBytes: [ stringExpression, substringExpression, startIndex, endIndex ]
});
/**
 * Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence.
 * If the substring is not found, returns -1
 * @param stringExpression
 * @param substringExpression
 * @param startIndex
 * @param endIndex
 * @constructor
 */
export const IndexOfCP = (stringExpression: any, substringExpression: any, startIndex: any, endIndex: any) => ({
    $indexOfCP: [ stringExpression, substringExpression, startIndex, endIndex ]
});
/**
 * Removes whitespace or the specified characters from the beginning of a string.
 * @param input
 * @param chars
 * @constructor
 */
export const Ltrim = (input: any, chars: any) => ({ $ltrim: { input: input,  chars: chars } });
/**
 * Applies a regular expression (regex) to a string and returns information on the first matched substring.
 * @param input
 * @param regex
 * @constructor
 */
export const RegexFind = (input: any, regex: any) => ({ $regexFind: { input: input , regex: regex } });
/**
 * Applies a regular expression (regex) to a string and returns information on the all matched substrings.
 * @param input
 * @param regex
 * @constructor
 */
export const RegexFindAll = (input: any, regex: any) => ({ $regexFindAll: { input: input , regex: regex } });
/**
 * Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
 * @param input
 * @param regex
 * @constructor
 */
export const RegexMatch = (input: any, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } });
/**
 * Replaces the first instance of a matched string in a given input.
 * @param input
 * @param find
 * @param replacement
 * @constructor
 */
export const ReplaceOne = (input: any, find: any, replacement: any) => ({
    $replaceOne: { input: input, find: find, replacement: replacement }
});
/**
 * Replaces all instances of a matched string in a given input.
 * @param input
 * @param find
 * @param replacement
 * @constructor
 */
export const ReplaceAll = (input: any, find: any, replacement: any) => ({
    $replaceAll: { input: input, find: find, replacement: replacement }
});
/**
 * Removes whitespace or the specified characters from the end of a string.
 * @param input
 * @param chars
 * @constructor
 */
export const Rtrim = (input: any, chars: any) => ({ $rtrim: { input: input,  chars: chars } });
/**
 * Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found
 * within the string, returns an array containing the original string.
 * @param stringExpression
 * @param delimiter
 * @constructor
 */
export const Split = (stringExpression: any, delimiter: any) => ({ $split: [ stringExpression, delimiter ] });
/**
 * Returns the number of UTF-8 encoded bytes in a string.
 * @param stringExpression
 * @constructor
 */
export const StrLenBytes = (stringExpression: any) => ({ $strLenBytes: stringExpression });
/**
 * Returns the number of UTF-8 code points in a string.
 * @param stringExpression
 * @constructor
 */
export const StrLenCP = (stringExpression: any) => ({ $strLenCP: stringExpression });
/**
 * Performs case-insensitive string comparison and returns: 0 if two strings are equivalent, 1 if the first string is greater than the second, and -1 if the first string is less than the second.
 * @param expression1
 * @param expression2
 * @constructor
 */
export const StrCaseCmp = (expression1: any, expression2: any) => ({ $strcasecmp: [ expression1, expression2 ] });
/**
 * Deprecated. Use $substrBytes or $substrCP.
 * @param stringExpression
 * @param startIndex
 * @param stringLength
 * @constructor
 */
export const Substr = (stringExpression: any, startIndex: any, stringLength: any) => ({
    $substr: [ stringExpression, startIndex, stringLength ]
});
/**
 * Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the
 * string and continues for the specified number of bytes.
 * @param stringExpression
 * @param byteIndex
 * @param byteCount
 * @constructor
 */
export const SubstrBytes = (stringExpression: any, byteIndex: any, byteCount: any) => ({
    $substrBytes: [ stringExpression, byteIndex, byteCount ]
});
/**
 * Returns the substring of a string. Starts with the character at the specified UTF-8 code point (CP) index
 * (zero-based) in the string and continues for the number of code points specified.
 * @param stringExpression
 * @param codePointIndex
 * @param codePointCount
 * @constructor
 */
export const SubstrCP = (stringExpression: any, codePointIndex: any, codePointCount: any) => ({
    $substrCP: [ stringExpression, codePointIndex, codePointCount ]
});
/**
 * Converts a string to lowercase. Accepts a single argument expression.
 * @param expression
 * @constructor
 */
export const ToLower = (expression: any) => ({ $toLower: expression });
/**
 * Converts value to a string.
 * @param expression
 * @constructor
 */
export const ToString = (expression: any) => ({ $toString: expression });
/**
 * Removes whitespace or the specified characters from the beginning and end of a string.
 * @param input
 * @param chars
 * @constructor
 */
export const Trim = (input: any, chars: any) => ({ $trim: { input: input,  chars: chars } });
/**
 * Converts a string to uppercase. Accepts a single argument expression.
 * @param expression
 * @constructor
 */
export const ToUpper = (expression: any) => ({ $toUpper: expression });
