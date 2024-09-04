import { BucketAutoHelper } from './bucket-auto.helper';

describe('BucketAutoHelper', () => {
  test.each([
    [
      BucketAutoHelper('$age', 5),
      { groupBy: '$age', buckets: 5 },
    ],
    [
      BucketAutoHelper('$age', 21,
        { output: { 'ages': { $push: '$age' } }, granularity: 'R5' },
      ),
      { groupBy: '$age', buckets: 21, output: { 'ages': { $push: '$age' } }, granularity: 'R5' },
    ],
  ])('%o should return %o', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
