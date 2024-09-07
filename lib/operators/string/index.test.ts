import {
  $Concat, $IndexOfBytes,
  $IndexOfCP,
  $Ltrim, $RegexFind,
  $RegexFindAll, $RegexMatch, $ReplaceAll, $ReplaceOne,
  $Rtrim, $Split,
  $StrCaseCmp, $StrLenBytes,
  $StrLenCP,
  $Substr,
  $SubstrBytes, $SubstrCP, $ToLower, $ToString,
  $ToUpper, $Trim
} from "./index";

const expressions: any[] = [];
const stringExpression = '';
const substringExpression = '';
const startIndex = 2;
const endIndex = 5;
const input = '';
const chars = 'e';
const find = 'test';
const replacement = 'unit';
const delimiter = '6';
const stringLength = 8;
const byteIndex = 4;
const byteCount = 45;
const codePointCount = 4;
const codePointIndex = 5;
const expression = '';
const expression1 = '';
const expression2 = '';
const regex = / /g;

describe('string operators', () => {
  test.each([
    [$Concat(...expressions), { $concat: expressions }],
    [$IndexOfBytes(stringExpression, substringExpression, { startIndex, endIndex }), { $indexOfBytes: [stringExpression, substringExpression, startIndex, endIndex ] }],
    [$IndexOfBytes(stringExpression, substringExpression), { $indexOfBytes: [stringExpression, substringExpression ] }],
    [$IndexOfCP(stringExpression, substringExpression, { startIndex, endIndex }), { $indexOfCP: [stringExpression, substringExpression, startIndex, endIndex ] }],
    [$IndexOfCP(stringExpression, substringExpression), { $indexOfCP: [stringExpression, substringExpression ] }],
    [$Ltrim(input, { chars }), { $ltrim: { input,  chars } }],
    [$Ltrim(input), { $ltrim: { input } }],
    [$RegexFind(input, regex), { $regexFind: { input , regex } }],
    [$RegexFindAll(input, regex), { $regexFindAll: { input , regex } }],
    [$RegexMatch(input, regex), { $regexMatch: { input, regex } }],
    [$ReplaceOne(input, find, replacement), { $replaceOne: { input, find, replacement } }],
    [$ReplaceAll(input, find, replacement), { $replaceAll: { input, find, replacement } }],
    [$Rtrim(input, { chars }), { $rtrim: { input,  chars } }],
    [$Rtrim(input), { $rtrim: { input } }],
    [$Split(stringExpression, delimiter), { $split: [stringExpression, delimiter ] }],
    [$StrLenBytes(stringExpression), { $strLenBytes: stringExpression }],
    [$StrLenCP(stringExpression), { $strLenCP: stringExpression }],
    [$StrCaseCmp(expression1, expression2), { $strcasecmp: [expression1, expression2 ] }],
    [$Substr(stringExpression, startIndex, stringLength), { $substr: [stringExpression, startIndex, stringLength ] }],
    [$SubstrBytes(stringExpression, byteIndex, byteCount), { $substrBytes: [stringExpression, byteIndex, byteCount ] }],
    [$SubstrCP(stringExpression, codePointIndex, codePointCount), { $substrCP: [stringExpression, codePointIndex, codePointCount ] }],
    [$ToLower(expression), { $toLower: expression }],
    [$ToString(expression), { $toString: expression }],
    [$Trim(input, { chars }), { $trim: { input,  chars } }],
    [$Trim(input), { $trim: { input } }],
    [$ToUpper(expression), { $toUpper: expression }],
  ])('should %s', (
    operation: any,
    expected: any
  ) => {
    expect(operation).toEqual(expected);
  });
});

