import { UnionWithStage } from '../../models';
import { UnionWithHelper } from './union-with.helper';

describe('unionWith helpers', () => {
  it('should throw an error if no coll or pipeline is provided', () => {
    expect(
      () => UnionWithHelper(undefined),
    ).toThrowError('UnionWithHelper: you must specify either coll or pipeline');
  });

  test.each([
    [UnionWithHelper('cars'), { coll: 'cars' }],
    [
      UnionWithHelper('collection', [
        { $match: { test: 'unit' } },
      ]),
      { coll: 'collection', pipeline: [{ $match: { test: 'unit' } }] },
    ],
    [
      UnionWithHelper(undefined, [
        { $match: { test: 'unit' } },
      ]),
      { pipeline: [{ $match: { test: 'unit' } }] },
    ],
  ])('%o should return %o', (
    operation: UnionWithStage,
    expected: UnionWithStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
