import { $AddToSet, $Average, $Bottom, $BottomN, $Count, $Max, $Min, $Push, $StdDevPop, $StdDevSamp, $Sum } from './';

const expression = '$toto';
const bottomExpression = {
  output: ['toto', 'tata'],
  sortBy: { tata: -1 } as { [key: string]: 1 | -1 },
};
const bottomNExpression = {
  output: 'toto',
  sortBy: { toto: 1 } as { [key: string]: 1 | -1 },
  n: 5,
};

describe('accumulator operators', () => {
  test.each([
    [$AddToSet(expression), { $addToSet: expression }],
    [$Average(expression), { $avg: expression }],
    [$Bottom(bottomExpression.sortBy, ...bottomExpression.output), { $bottom: bottomExpression }],
    [
      $BottomN(bottomNExpression.n, bottomNExpression.sortBy, bottomNExpression.output),
      { $bottomN: { ...bottomNExpression, output: [bottomNExpression.output] } },
    ],
    [$Count(), { $count: {} }],
    [$Max(expression), { $max: expression }],
    [$Min(expression), { $min: expression }],
    [$Push(expression), { $push: expression }],
    [$StdDevPop(expression), { $stdDevPop: expression }],
    [$StdDevSamp(expression), { $stdDevSamp: expression }],
    [$Sum(expression), { $sum: expression }],
  ])('should %s', (
    operator: any,
    expected: any,
  ) => {
    expect(operator).toEqual(expected);
  });
});
