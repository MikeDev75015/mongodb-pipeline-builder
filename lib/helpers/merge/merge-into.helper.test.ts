import { MergeStage, PipeLineStage, WhenMatchedType, WhenNotMatchedType } from '../../models';
import { MergeIntoHelper } from './merge-into.helper';

describe('merge helpers', () => {
  test.each([

    [
      MergeIntoHelper('tests'), {
      into: 'tests',
      on: '_id',
      whenMatched: 'merge' as WhenMatchedType,
      let: { new: '$$ROOT' },
      whenNotMatched: 'insert' as WhenNotMatchedType,
    },
    ],

    [
      MergeIntoHelper('units', {
        on: 'name',
        whenMatched: [{ $project: { stats: 1 } }],
        letWhenMatched: { test: '$test', unit: '$unit' },
        whenNotMatched: 'discard',
      }), {
      into: 'units',
      on: 'name',
      whenMatched: [{ $project: { stats: 1 } }] as PipeLineStage[],
      let: { test: '$test', unit: '$unit' },
      whenNotMatched: 'discard' as WhenNotMatchedType,
    },
    ],

  ])('%o should return %o', (
    operation: any,
    expected: MergeStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
