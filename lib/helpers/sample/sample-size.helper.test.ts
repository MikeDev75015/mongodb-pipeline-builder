import { SampleSizeHelper } from './sample-size.helper';

describe('sample helpers', () => {
  describe('SampleSizeHelper', () => {
    test.each([
      [SampleSizeHelper(), { size: 1 }],
      [SampleSizeHelper(5), { size: 5 }],
    ])('%o should return %o', (
      operation: any,
      expected: any,
    ) => {
      expect(operation).toEqual(expected);
    });
  });
});
