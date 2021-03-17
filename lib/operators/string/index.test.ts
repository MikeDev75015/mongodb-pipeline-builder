import {
    Concat, IndexOfBytes,
    IndexOfCP,
    Ltrim, RegexFind,
    RegexFindAll, RegexMatch, ReplaceAll, ReplaceOne,
    Rtrim, Split,
    StrCaseCmp, StrLenBytes,
    StrLenCP,
    Substr,
    SubstrBytes, SubstrCP, ToLower, ToString,
    ToUpper, Trim
} from "./index";

const
    expressions: any[] = [],
    stringExpression = '',
    substringExpression = '',
    startIndex = 2,
    endIndex = 5,
    input = '',
    chars = 'e',
    find = 'test',
    replacement = 'unit',
    delimiter = 6,
    stringLength = 8,
    byteIndex = 4,
    byteCount = 45,
    codePointCount = 4,
    codePointIndex = 5,
    expression = '',
    expression1 = '',
    expression2 = '',
    regex = / /g;

describe('string operators', () => {
    test.each([
    [Concat(...expressions), { $concat: expressions }],
    [IndexOfBytes(stringExpression, substringExpression, startIndex, endIndex), { $indexOfBytes: [ stringExpression, substringExpression, startIndex, endIndex ] }],
    [IndexOfCP(stringExpression, substringExpression, startIndex, endIndex), { $indexOfCP: [ stringExpression, substringExpression, startIndex, endIndex ] }],
    [Ltrim(input, chars), { $ltrim: { input: input,  chars: chars } }],
    [RegexFind(input, regex), { $regexFind: { input: input , regex: regex } }],
    [RegexFindAll(input, regex), { $regexFindAll: { input: input , regex: regex } }],
    [RegexMatch(input, regex), { $regexMatch: { input: input, regex: regex } }],
    [ReplaceOne(input, find, replacement), { $replaceOne: { input: input, find: find, replacement: replacement } }],
    [ReplaceAll(input, find, replacement), { $replaceAll: { input: input, find: find, replacement: replacement } }],
    [Rtrim(input, chars), { $rtrim: { input: input,  chars: chars } }],
    [Split(stringExpression, delimiter), { $split: [ stringExpression, delimiter ] }],
    [StrLenBytes(stringExpression), { $strLenBytes: stringExpression }],
    [StrLenCP(stringExpression), { $strLenCP: stringExpression }],
    [StrCaseCmp(expression1, expression2), { $strcasecmp: [ expression1, expression2 ] }],
    [Substr(stringExpression, startIndex, stringLength), { $substr: [ stringExpression, startIndex, stringLength ] }],
    [SubstrBytes(stringExpression, byteIndex, byteCount), { $substrBytes: [ stringExpression, byteIndex, byteCount ] }],
    [SubstrCP(stringExpression, codePointIndex, codePointCount), { $substrCP: [ stringExpression, codePointIndex, codePointCount ] }],
    [ToLower(expression), { $toLower: expression }],
    [ToString(expression), { $toString: expression }],
    [Trim(input, chars), { $trim: { input: input,  chars: chars } }],
    [ToUpper(expression), { $toUpper: expression }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});

