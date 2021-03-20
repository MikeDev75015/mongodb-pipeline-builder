import {Accumulator, FunctionOperator} from "./index";

const
    initCode = '',
    accumulateCode = '',
    accumulateArgs = '',
    mergeCode = '',
    finalizeCode = '',
    bodyCode = '',
    array = '';

let
    initArgs: never[] = [],
    langCode = 'test';

describe('custom aggregation operators', () => {
    test.each([
        [
            Accumulator(initCode, accumulateCode, accumulateArgs, mergeCode, finalizeCode, initArgs, langCode),
            { $accumulator: {init: initCode, initArgs: initArgs, accumulate: accumulateCode, accumulateArgs: accumulateArgs, merge: mergeCode, finalize: finalizeCode, lang: langCode} }
        ],
        [
            Accumulator(initCode, accumulateCode, accumulateArgs, mergeCode, finalizeCode),
            { $accumulator: {init: initCode, initArgs: [], accumulate: accumulateCode, accumulateArgs: accumulateArgs, merge: mergeCode, finalize: finalizeCode, lang: 'js'} }
        ],
        [FunctionOperator(bodyCode, array, langCode), { $function: {body: bodyCode, args: array, lang: langCode} }],
        [FunctionOperator(bodyCode, array), { $function: {body: bodyCode, args: array, lang: 'js'} }],
])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
