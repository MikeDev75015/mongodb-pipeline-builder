import { $Accumulator, $FunctionOperator } from './index';

const initCode = () => (
  {}
);
const accumulateCode = () => (
  {}
);
const accumulateArgs: string[] = [];
const mergeCode = () => (
  {}
);
const finalizeCode = () => (
  {}
);
const bodyCode = '';
const array = '';

const initArgs: string[] = [];
const langCode = 'test';

describe('custom aggregation operators', () => {
  test.each([
    [
      $Accumulator<{}, {}, string>(
        initCode,
        accumulateCode,
        accumulateArgs,
        mergeCode,
        { finalize: finalizeCode, initArgs, lang: langCode },
      ),
      {
        $accumulator: {
          init: initCode,
          initArgs,
          accumulate: accumulateCode,
          accumulateArgs,
          merge: mergeCode,
          finalize: finalizeCode,
          lang: langCode,
        },
      },
    ],
    [
      $Accumulator<{}, {}, string>(
        initCode,
        accumulateCode,
        accumulateArgs,
        mergeCode,
      ),
      {
        $accumulator: {
          init: initCode,
          accumulate: accumulateCode,
          accumulateArgs,
          merge: mergeCode,
          lang: 'js',
        },
      },
    ],
    [$FunctionOperator(bodyCode, array, langCode), { $function: { body: bodyCode, args: array, lang: langCode } }],
    [$FunctionOperator(bodyCode, array), { $function: { body: bodyCode, args: array, lang: 'js' } }],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
