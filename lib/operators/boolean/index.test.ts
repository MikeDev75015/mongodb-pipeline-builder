import { $And, $Not, $Or } from './index';

const args: any[] = [];
const expression = '$t.boolean';
const object = { test: 'unit' };

describe('boolean operators', () => {
  test.each([
    [$And(...args), { $and: args }],
    [$And(object), { $and: [object] }],
    [$Not(expression), { $not: [expression] }],
    [$Not(object), { $not: [object] }],
    [$Or(...args), { $or: args }],
    [$Or(object), { $or: [object] }],
  ])('should return %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});


