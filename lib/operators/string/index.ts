// String Expression Operators
// String expressions, with the exception of $concat, only have a well-defined behavior for strings of ASCII characters.

export const Concat = (...expressions: any) => ({ $concat: expressions });
export const IndexOfBytes = (stringExpression: any, substringExpression: any, startIndex: any, endIndex: any) => ({
    $indexOfBytes: [ stringExpression, substringExpression, startIndex, endIndex ]
});
export const IndexOfCP = (stringExpression: any, substringExpression: any, startIndex: any, endIndex: any) => ({
    $indexOfCP: [ stringExpression, substringExpression, startIndex, endIndex ]
});
export const Ltrim = (input: any, chars: any) => ({ $ltrim: { input: input,  chars: chars } });
export const RegexFind = (input: any, regex: any) => ({ $regexFind: { input: input , regex: regex } });
export const RegexFindAll = (input: any, regex: any) => ({ $regexFindAll: { input: input , regex: regex } });
export const RegexMatch = (input: any, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } });
export const ReplaceOne = (input: any, find: any, replacement: any) => ({
    $replaceOne: { input: input, find: find, replacement: replacement }
});
export const ReplaceAll = (input: any, find: any, replacement: any) => ({
    $replaceAll: { input: input, find: find, replacement: replacement }
});
export const Rtrim = (input: any, chars: any) => ({ $rtrim: { input: input,  chars: chars } });
export const Split = (stringExpression: any, delimiter: any) => ({ $split: [ stringExpression, delimiter ] });
export const StrLenBytes = (stringExpression: any) => ({ $strLenBytes: stringExpression });
export const StrLenCP = (stringExpression: any) => ({ $strLenCP: stringExpression });
export const StrCaseCmp = (expression1: any, expression2: any) => ({ $strcasecmp: [ expression1, expression2 ] });
export const Substr = (stringExpression: any, startIndex: any, stringLength: any) => ({
    $substr: [ stringExpression, startIndex, stringLength ]
});
export const SubstrBytes = (stringExpression: any, byteIndex: any, byteCount: any) => ({
    $substrBytes: [ stringExpression, byteIndex, byteCount ]
});
export const SubstrCP = (stringExpression: any, codePointIndex: any, codePointCount: any) => ({
    $substrCP: [ stringExpression, codePointIndex, codePointCount ]
});
export const ToLower = (expression: any) => ({ $toLower: expression });
export const ToString = (expression: any) => ({ $toString: expression });
export const Trim = (input: any, chars: any) => ({ $trim: { input: input,  chars: chars } });
export const ToUpper = (expression: any) => ({ $toUpper: expression });
