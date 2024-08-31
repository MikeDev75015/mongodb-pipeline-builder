import { OutDbCollHelper } from './out-db-coll.helper';

describe('out helpers', () => {
  describe('OutDbCollHelper', () => {
    test.each([
      [OutDbCollHelper('unit'), 'unit'],
      [OutDbCollHelper('unit', 'tests'), { db: 'tests', coll: 'unit' }],
    ])('%o should return %o', (
      operation: any,
      expected: any,
    ) => {
      expect(operation).toEqual(expected);
    });
  });
});
