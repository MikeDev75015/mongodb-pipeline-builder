import { MergeStage, PipelineStage } from '../../models';
import { MergeHelper } from './merge.helper';

describe('merge helpers', () => {
  test.each([

    [MergeHelper('tests'), { into: 'tests' }],

    [
      MergeHelper('units', {
        on: 'name',
        whenMatched: [{ $project: { stats: 1 } }],
        let: { test: '$test', unit: '$unit' },
        whenNotMatched: 'discard',
      }),
      {
        into: 'units',
        on: 'name',
        whenMatched: [{ $project: { stats: 1 } }] as PipelineStage[],
        let: { test: '$test', unit: '$unit' },
        whenNotMatched: 'discard',
      } as MergeStage
    ],

  ])('%o should return %o', (
    operation: MergeStage,
    expected: MergeStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
