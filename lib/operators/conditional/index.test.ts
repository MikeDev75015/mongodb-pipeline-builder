import { $Condition, $IfNull, $Switch } from './index';

const booleanExpression = true;
const trueCase = 'true';
const falseCase = 'false';
const values = ['test', 'unit'];
const replaceWith = 'unit';
const defaultCase = 'default';
const branchList: any[] = [];

describe('conditional operators', () => {
  test.each([
    [$Condition(booleanExpression, trueCase, falseCase), { $cond: [booleanExpression, trueCase, falseCase] }],
    [$IfNull(replaceWith, ...values), { $ifNull: [...values, replaceWith] }],
    [$Switch(branchList, { defaultCase }), { $switch: { branches: branchList, default: defaultCase } }],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});



