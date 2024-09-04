import { OutStage } from '../../models';
import { OutHelper } from './out.helper';

describe('OutHelper', () => {
  test.each([
    [OutHelper('unit'), 'unit'],
    [OutHelper('unit', { db: 'tests' }), { db: 'tests', coll: 'unit' }],
  ])('%o should return %o', (
    operation: OutStage,
    expected: OutStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
