// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

import {
  Expression,
  NumericExpression,
  RegExpExpression,
  RegExpOptionsExpression,
  StringExpression,
} from '../../models/core/expression';

/**
 * Concatenates any number of strings.
 * @param expressions
 * @constructor
 */
export const $Concat = (...expressions: StringExpression[]) => (
  { $concat: expressions }
);

/**
 * Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the
 * substring is not found, returns -1.
 * @param stringExpression Can be any valid expression as long as it resolves to a string. For more information on
 * expressions, see Expression Operators.
 *
 * If the string expression resolves to a value of null or refers to a field that is missing, $indexOfBytes returns
 *   null.
 *
 * If the string expression does not resolve to a string or null nor refers to a missing field, $indexOfBytes returns
 *   an error.
 * @param substringExpression Can be any valid expression as long as it resolves to a string. For more information on
 * expressions, see Expression Operators.
 * @param optional Optional.
 * @constructor
 */
export const $IndexOfBytes = (
  stringExpression: StringExpression,
  substringExpression: StringExpression,
  optional: {
    /**
     * An integral number that specifies the starting index position for the search. Can be any valid expression that
     * resolves to a non-negative integral number.
     */
    startIndex?: NumericExpression;
    /**
     * An integral number that specifies the ending index position for the search. Can be any valid expression that
     * resolves to a non-negative integral number.
     *
     * If you specify a <end> index value, you should also specify a <start> index value; otherwise, $indexOfBytes
     * uses the <end> value as the <start> index value instead of the <end> value.
     */
    endIndex?: NumericExpression;
  } = {},
) => (
  {
    $indexOfBytes: [
      stringExpression,
      substringExpression,
      ...(
        typeof optional.startIndex === 'number' ? [optional.startIndex] : []
      ),
      ...(
        typeof optional.startIndex === 'number' && typeof optional.endIndex === 'number'
          ? [optional.endIndex]
          : []
      ),
    ],
  }
);

/**
 * Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence.
 * If the substring is not found, returns -1
 * @param stringExpression Can be any valid expression as long as it resolves to a string. For more information on
 * expressions, see Expression Operators.
 *
 * If the string expression resolves to a value of null or refers to a field that is missing, $indexOfCP returns null.
 *
 * If the string expression does not resolve to a string or null nor refers to a missing field, $indexOfCP returns an
 * error.
 * @param substringExpression Can be any valid expression as long as it resolves to a string. For more information on
 * expressions, see Expression Operators.
 * @param optional Optional.
 * @constructor
 */
export const $IndexOfCP = (
  stringExpression: StringExpression,
  substringExpression: StringExpression,
  optional: {
    /**
     * An integer, or a number that can be represented as integers (such as 2.0), that specifies the starting index
     * position for the search. Can be any valid expression that resolves to a non-negative integral number.
     *
     * If unspecified, the starting index position for the search is the beginning of the string.
     */
    startIndex?: NumericExpression;
    /**
     * An integer, or a number that can be represented as integers (such as 2.0), that specifies the ending index
     * position for the search. Can be any valid expression that resolves to a non-negative integral number.
     *
     * If you specify a <end> index value, you should also specify a <start> index value; otherwise, $indexOfCP uses
     * the <end> value as the <start> index value instead of the <end> value.
     *
     * If unspecified, the ending index position for the search is the end of the string.
     */
    endIndex?: NumericExpression;
  } = {},
) => (
  {
    $indexOfCP: [
      stringExpression,
      substringExpression,
      ...(
        typeof optional.startIndex === 'number' ? [optional.startIndex] : []
      ),
      ...(
        typeof optional.startIndex === 'number' && typeof optional.endIndex === 'number'
          ? [optional.endIndex]
          : []
      ),
    ],
});

/**
 * Removes whitespace or the specified characters from the beginning of a string.
 * @param input The string to trim. The argument can be any valid expression that resolves to a string. For more
 * information on expressions, see Expression Operators.
 * @param optional Optional.
 * @constructor
 */
export const $Ltrim = (
  input: StringExpression,
  optional: {
    /**
     * The character(s) to trim from the beginning of the input.
     *
     * The argument can be any valid expression that resolves to a string. The $ltrim operator breaks down the string
     * into individual UTF code point to trim from input.
     *
     * If unspecified, $ltrim removes whitespace characters, including the null character. For the list of whitespace
     * characters, see Whitespace Characters.
     */
    chars?: StringExpression;
  } = {},
) => (
  { $ltrim: { input, ...optional } }
);

/**
 * Provides regular expression (regex) pattern matching capability in aggregation expressions. If a match is found,
 * returns a document that contains information on the first match. If a match is not found, returns null.
 * @param input The string on which you wish to apply the regex pattern. Can be a string or any valid expression that
 * resolves to a string.
 * @param regex The regex pattern to apply. Can be any valid expression that resolves to either a string or regex
 * pattern /<pattern>/. When using the regex /<pattern>/, you can also specify the regex options i and m (but not the s
 * or x options):
 *
 * "pattern"
 *
 * /<pattern>/
 *
 * /<pattern>/<options>
 *
 * Alternatively, you can also specify the regex options with the options field. To specify the s or x options, you
 * must use the options field.
 *
 * You cannot specify options in both the regex and the options field.
 * @param optional
 * @constructor
 */
export const $RegexFind = (
  input: StringExpression,
  regex: RegExpExpression | StringExpression,
  optional: {
    /**
     * A string of options that control the regular expression matching.
     *
     * The $regexFind operator supports the following options:
     *
     * i: Case insensitivity to match upper and lower cases.
     * m: Multiline matching.
     * x: Allows the use of white space and #comments within patterns.
     * s: Allows the dot (.) character to match all characters including newline characters.
     *
     * You cannot specify options in both the regex and the options field.
     */
    options?: RegExpOptionsExpression;
  } = {},
) => (
  { $regexFind: { input, regex, ...optional } }
);

/**
 * Provides regular expression (regex) pattern matching capability in aggregation expressions. The operator returns an
 * array of documents that contains information on each match. If a match is not found, returns an empty array.
 * @param input The string on which you wish to apply the regex pattern. Can be a string or any valid expression that
 * resolves to a string.
 * @param regex The regex pattern to apply. Can be any valid expression that resolves to either a string or regex
 * pattern /<pattern>/. When using the regex /<pattern>/, you can also specify the regex options i and m (but not the s
 * or x options):
 *
 * "pattern"
 *
 * /<pattern>/
 *
 * /<pattern>/<options>
 *
 * Alternatively, you can also specify the regex options with the options field. To specify the s or x options, you
 * must use the options field.
 *
 * You cannot specify options in both the regex and the options field.
 * @param optional
 * @constructor
 */
export const $RegexFindAll = (
  input: StringExpression,
  regex: RegExpExpression | StringExpression,
  optional: {
    /**
     * A string of options that control the regular expression matching.
     *
     * The $regexFind operator supports the following options:
     *
     * i: Case insensitivity to match upper and lower cases.
     * m: Multiline matching.
     * x: Allows the use of white space and #comments within patterns.
     * s: Allows the dot (.) character to match all characters including newline characters.
     *
     * You cannot specify options in both the regex and the options field.
     */
    options?: RegExpOptionsExpression;
  } = {},
) => (
  { $regexFindAll: { input, regex, ...optional } }
);

/**
 * Performs a regular expression (regex) pattern matching and returns:
 *
 * true if a match exists.
 *
 * false if a match doesn't exist.
 * @param input The string on which you wish to apply the regex pattern. Can be a string or any valid expression that
 * resolves to a string.
 * @param regex The regex pattern to apply. Can be any valid expression that resolves to either a string or regex
 * pattern /<pattern>/. When using the regex /<pattern>/, you can also specify the regex options i and m (but not the s
 * or x options):
 *
 * "pattern"
 *
 * /<pattern>/
 *
 * /<pattern>/<options>
 *
 * Alternatively, you can also specify the regex options with the options field. To specify the s or x options, you
 * must use the options field.
 *
 * You cannot specify options in both the regex and the options field.
 * @param optional
 * @constructor
 */
export const $RegexMatch = (
  input: StringExpression,
  regex: RegExpExpression | StringExpression,
  optional: {
    /**
     * A string of options that control the regular expression matching.
     *
     * The $regexFind operator supports the following options:
     *
     * i: Case insensitivity to match upper and lower cases.
     * m: Multiline matching.
     * x: Allows the use of white space and #comments within patterns.
     * s: Allows the dot (.) character to match all characters including newline characters.
     *
     * You cannot specify options in both the regex and the options field.
     */
    options?: RegExpOptionsExpression;
  } = {},
) => (
  { $regexMatch: { input, regex, ...optional } }
);

/**
 * Replaces the first instance of a search string in an input string with a replacement string.
 *
 * If no occurrences are found, $replaceOne evaluates to the input string.
 *
 * $replaceOne is both case-sensitive and diacritic-sensitive, and ignores any collation present on a collection.
 * @param input The string on which you wish to apply the find. Can be any valid expression that resolves to a string
 * or a null. If input refers to a field that is missing, $replaceOne returns null.
 * @param find The string to search for within the given input. Can be any valid expression that resolves to a string
 * or a null. If find refers to a field that is missing, $replaceOne returns null.
 * @param replacement The string to use to replace the first matched instance of find in input. Can be any valid
 * expression that resolves to a string or a null.
 * @constructor
 */
export const $ReplaceOne = (
  input: StringExpression | null,
  find: StringExpression | null,
  replacement: StringExpression | null,
) => (
  {
    $replaceOne: { input, find, replacement },
});

/**
 * Replaces all instances of a search string in an input string with a replacement string.
 *
 * $replaceAll is both case-sensitive and diacritic-sensitive, and ignores any collation present on a collection.
 * @param input The string on which you wish to apply the find. Can be any valid expression that resolves to a string
 * or a null. If input refers to a field that is missing, $replaceAll returns null.
 * @param find The string to search for within the given input. Can be any valid expression that resolves to a string
 * or a null. If find refers to a field that is missing, $replaceAll returns null.
 * @param replacement The string to use to replace all matched instances of find in input. Can be any valid expression
 * that resolves to a string or a null.
 * @constructor
 */
export const $ReplaceAll = (
  input: StringExpression | null,
  find: StringExpression | null,
  replacement: StringExpression | null,
) => (
  {
    $replaceAll: { input, find, replacement },
});

/**
 * Removes whitespace or the specified characters from the end of a string.
 * @param input The string to trim. The argument can be any valid expression that resolves to a string. For more
 * information on expressions, see Expression Operators.
 * @param optional Optional.
 * @constructor
 */
export const $Rtrim = (
  input: StringExpression,
  optional: {
    /**
     * The character(s) to trim from the end of the input.
     *
     * The argument can be any valid expression that resolves to a string. The $rtrim operator breaks down the string
     * into individual UTF code point to trim from input.
     *
     * If unspecified, $rtrim removes whitespace characters, including the null character. For the list of whitespace
     * characters, see Whitespace Characters.
     */
    chars?: StringExpression;
  } = {},
) => (
  { $rtrim: { input, ...optional } }
);

/**
 * Divides a string into an array of substrings based on a delimiter. $split removes the delimiter and returns the
 * resulting substrings as elements of an array. If the delimiter is not found in the string, $split returns the
 * original string as the only element of an array.
 * @param stringExpression The string to be split. string expression can be any valid expression as long as it resolves
 * to a string. For more information on expressions, see Expression Operators.
 * @param delimiter The delimiter to use when splitting the string expression. delimiter can be any valid expression
 * as long as it resolves to a string.
 * @constructor
 */
export const $Split = (
  stringExpression: StringExpression,
  delimiter: StringExpression,
) => (
  { $split: [stringExpression, delimiter] }
);

/**
 * Returns the number of UTF-8 encoded bytes in the specified string.
 * @param stringExpression The argument can be any valid expression as long as it resolves to a string. For more
 * information on expressions, see Expression Operators.
 *
 * If the argument resolves to a value of null or refers to a missing field, $strLenBytes returns an error.
 * @constructor
 */
export const $StrLenBytes = (stringExpression: StringExpression) => (
  { $strLenBytes: stringExpression }
);

/**
 * Returns the number of UTF-8 code points in the specified string.
 * @param stringExpression The argument can be any valid expression that resolves to a string.
 *
 * If the argument resolves to a value of null or refers to a missing field, $strLenCP returns an error.
 * @constructor
 */
export const $StrLenCP = (stringExpression: StringExpression) => (
  { $strLenCP: stringExpression }
);

/**
 * Performs case-insensitive comparison of two strings. Returns
 *
 * 1 if first string is "greater than" the second string.
 *
 * 0 if the two strings are equal.
 *
 * -1 if the first string is "less than" the second string.
 * @param expression1 The argument can be any valid expression that resolves to a string.
 * @param expression2 The argument can be any valid expression that resolves to a string.
 * @constructor
 */
export const $StrCaseCmp = (
  expression1: StringExpression,
  expression2: StringExpression,
) => (
  { $strcasecmp: [expression1, expression2] }
);

/**
 * Returns a substring of a string, starting at a specified index position and including the specified number of
 * characters. The index is zero-based.
 * @deprecated Deprecated since version 3.4: $substr is now an alias for $substrBytes.
 * @param stringExpression The argument can be any valid expression that resolves to a string.
 * @param startIndex The argument can be any valid expression that resolves to a number.
 * @param stringLength The argument can be any valid expression that resolves to a number.
 * @constructor
 */
export const $Substr = (
  stringExpression: StringExpression,
  startIndex: NumericExpression,
  stringLength: NumericExpression,
) => (
  {
    $substr: [stringExpression, startIndex, stringLength],
});

/**
 * Returns the substring of a string. The substring starts with the character at the specified UTF-8 byte index
 * (zero-based) in the string and continues for the number of bytes specified.
 * @param stringExpression The string from which the substring will be extracted. string expression can be any valid
 * expression as long as it resolves to a string. For more information on expressions, see Expression Operators.
 *
 * If the argument resolves to a value of null or refers to a field that is missing, $substrBytes returns an empty
 *   string.
 *
 * If the argument does not resolve to a string or null nor refers to a missing field, $substrBytes returns an error.
 * @param byteIndex Indicates the starting point of the substring. byte index can be any valid expression as long as it
 * resolves to a non-negative integer or number that can be represented as an integer (such as 2.0).
 *
 * byte index cannot refer to a starting index located in the middle of a multi-byte UTF-8 character.
 * @param byteCount Can be any valid expression as long as it resolves to a non-negative integer or number that can be
 * represented as an integer (such as 2.0).
 *
 * byte count can not result in an ending index that is in the middle of a UTF-8 character.
 * @constructor
 */
export const $SubstrBytes = (
  stringExpression: StringExpression,
  byteIndex: NumericExpression,
  byteCount: NumericExpression,
) => (
  {
    $substrBytes: [stringExpression, byteIndex, byteCount],
});

/**
 * Returns the substring of a string. The substring starts with the character at the specified UTF-8 code point (CP)
 * index (zero-based) in the string for the number of code points specified.
 * @param stringExpression The string from which the substring will be extracted. string expression can be any valid
 * expression as long as it resolves to a string. For more information on expressions, see Expression Operators.
 *
 * If the argument resolves to a value of null or refers to a field that is missing, $substrCP returns an empty string.
 *
 * If the argument does not resolve to a string or null nor refers to a missing field, $substrCP returns an error.
 * @param codePointIndex Indicates the starting point of the substring. code point index can be any valid expression as
 * long as it resolves to a non-negative integer.
 * @param codePointCount Can be any valid expression as long as it resolves to a non-negative integer or number that
 * can be represented as an integer (such as 2.0).
 * @constructor
 */
export const $SubstrCP = (
  stringExpression: StringExpression,
  codePointIndex: NumericExpression,
  codePointCount: NumericExpression,
) => (
  {
    $substrCP: [stringExpression, codePointIndex, codePointCount],
});

/**
 * Converts a string to lowercase, returning the result.
 * @param expression  can be any expression as long as it resolves to a string. For more information on expressions,
 * see Expression Operators.
 * @constructor
 */
export const $ToLower = (expression: StringExpression) => ({ $toLower: expression });

/**
 * Converts a value to a string. If the value cannot be converted to a string, $toString errors. If the value is null or missing, $toString returns null.
 * @param expression Any valid expression.
 * @constructor
 */
export const $ToString = (expression: Expression) => ({ $toString: expression });

/**
 * Removes whitespace characters, including null, or the specified characters from the beginning and end of a string.
 * @param input The string to trim. The argument can be any valid expression that resolves to a string. For more
 * information on expressions, see Expression Operators.
 * @param optional Optional.
 * @constructor
 */
export const $Trim = (
  input: StringExpression,
  optional: {
    /**
     * The character(s) to trim from input.
     *
     * The argument can be any valid expression that resolves to a string. The $trim operator breaks down the string
     * into individual UTF code point to trim from input.
     *
     * If unspecified, $trim removes whitespace characters, including the null character. For the list of whitespace
     * characters, see Whitespace Characters.
     */
    chars?: StringExpression;
  } = {},
) => ({ $trim: { input, ...optional } });

/**
 * Converts a string to uppercase, returning the result.
 * @param expression can be any expression as long as it resolves to a string. For more information on expressions,
 * see Expression Operators.
 * @constructor
 */
export const $ToUpper = (expression: StringExpression) => ({ $toUpper: expression });
