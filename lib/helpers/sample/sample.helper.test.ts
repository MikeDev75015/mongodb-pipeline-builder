import { SampleStage } from '../../models';
import { SampleHelper } from './sample.helper';

describe('SampleHelper', () => {
  test.each([
    [SampleHelper(5), { size: 5 }],
  ])('%o should return %o', (
    operation: SampleStage,
    expected: SampleStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
