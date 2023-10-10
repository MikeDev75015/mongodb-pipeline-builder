import { $BitwiseAnd, $BitwiseNot, $BitwiseOr, $BitwiseXor } from './index';

describe('bitwise operators', () => {
  test.each([
    [$BitwiseAnd('$array'), { $bitAnd: '$array' }],
    [$BitwiseAnd(0, 127, 5), { $bitAnd: [0, 127, 5] }],
    [$BitwiseNot('$long'), { $bitNot: '$long' }],
    [$BitwiseOr('$array'), { $bitOr: '$array' }],
    [$BitwiseOr(0, 127, 5), { $bitOr: [0, 127, 5] }],
    [$BitwiseXor('$array'), { $bitXor: '$array' }],
    [$BitwiseXor(0, 127, 5), { $bitXor: [0, 127, 5] }],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});