import { GeoNearHelper } from './geo-near.helper';

describe('GeoNearHelper', () => {
  test.each([
    [
      GeoNearHelper('tests', 'unit'),
      { near: 'tests', distanceField: 'unit' },
    ],
    [
      GeoNearHelper('tests', 'unit', { key: 'enter' }),
      { near: 'tests', distanceField: 'unit', key: 'enter' },
    ],
  ])('%o should return %o', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
