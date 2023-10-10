import { $Compare, $Equal, $GreaterThan, $GreaterThanEqual, $LessThan, $LessThanEqual, $NotEqual } from './';

const a = 2;
const b = 5;

describe('comparison operators', () => {
  test.each([
    [$Compare(a, b), { $cmp: [a, b] }],
    [$Equal(a, b), { $eq: [a, b] }],
    [$GreaterThan(a, b), { $gt: [a, b] }],
    [$GreaterThanEqual(a, b), { $gte: [a, b] }],
    [$LessThan(a, b), { $lt: [a, b] }],
    [$LessThanEqual(a, b), { $lte: [a, b] }],
    [$NotEqual(a, b), { $ne: [a, b] }],
  ])('should return %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
