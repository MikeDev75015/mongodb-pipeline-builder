import { FilePath } from '../../models';
import { $AddToSet, $Average, $Bottom, $BottomN, $Count, $Max, $Min, $Push, $StdDevPop, $StdDevSamp, $Sum } from './';

const expression = '$toto';
const expressions = ['$toto.age', '$tata.age'] as FilePath[];
const expressions2 = ['$unit', '$test'];
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
    [$Average(...expressions), { $avg: expressions }],
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
    [$StdDevPop(expressions, expressions2), { $stdDevPop: [expressions, expressions2] }],
    [$StdDevSamp(expression), { $stdDevSamp: expression }],
    [$StdDevSamp(expressions, expressions2), { $stdDevSamp: [expressions, expressions2] }],
    [$Sum(expression), { $sum: expression }],
    [$Sum(...expressions), { $sum: expressions }],
  ])('should %s', (
    operator: any,
    expected: any,
  ) => {
    expect(operator).toEqual(expected);
  });
});
