import { FillStage } from '../../models';
import { FillHelper } from './fill.helper';

describe('FillHelper', () => {
  const payloadList = [
    { output: { unit: { value: '$test' } } as FillStage['output'] },
    {
      output: { test: { method: 'linear' } } as FillStage['output'],
      optional: {
        partitionBy: { test: '$test' },
        partitionByFields: ['test'],
        sortBy: { test: 1 },
      } as Partial<Omit<FillStage, 'output'>>,
    },
  ];

  test.each([
    [FillHelper(payloadList[0].output), payloadList[0]],
    [
      FillHelper(payloadList[1].output, payloadList[1].optional),
      { output: payloadList[1].output, ...payloadList[1].optional },
    ],
  ])('%o should return %o', (
    operation,
    expected,
  ) => {
    expect(operation).toEqual(expected);
  });
});
