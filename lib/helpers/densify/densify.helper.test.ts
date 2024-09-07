import { DensifyStage } from '../../models';
import { DensifyHelper } from './densify.helper';

describe('DensifyHelper', () => {
  const payloadList: DensifyStage[] = [
    { field: 'field', range: { bounds: 'full', step: 2, unit: 'day' } },
    { field: 'field', range: { bounds: 'partition', step: 1, unit: 'hour' }, partitionByFields: ['partitionByFields'] },
  ];

  test.each([
    [DensifyHelper(payloadList[0].field, payloadList[0].range), payloadList[0]],
    [
      DensifyHelper(
        payloadList[1].field,
        payloadList[1].range,
        { partitionByFields: payloadList[1].partitionByFields },
      ),
      payloadList[1],
    ],
  ])('%o should return %o', (
    operation: DensifyStage,
    expected: DensifyStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
