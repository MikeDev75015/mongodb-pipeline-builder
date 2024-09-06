import { GeoNearStage } from '../../models';
import { GeoNearHelper } from './geo-near.helper';

describe('GeoNearHelper', () => {
  test.each([
    [
      GeoNearHelper('$tests', 'unit'),
      { near: '$tests', distanceField: 'unit' } as GeoNearStage,
    ],
    [
      GeoNearHelper('$tests', 'unit', { key: 'enter' }),
      { near: '$tests', distanceField: 'unit', key: 'enter' } as GeoNearStage,
    ],
  ])('%o should return %o', (
    operation: GeoNearStage,
    expected: GeoNearStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
