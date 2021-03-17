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
    initArgs: any[] = [''],
    langCode = 'test';

describe('custom aggregation operators', () => {
    test.each([
        [Accumulator(initCode, accumulateCode, accumulateArgs, mergeCode, finalizeCode, initArgs = [], langCode = 'js'), { $accumulator: {init: initCode, initArgs: initArgs, accumulate: accumulateCode, accumulateArgs: accumulateArgs, merge: mergeCode, finalize: finalizeCode, lang: langCode} }],
        [FunctionOperator(bodyCode, array, langCode = 'js'), { $function: {body: bodyCode, args: array, lang: langCode} }],

])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});
