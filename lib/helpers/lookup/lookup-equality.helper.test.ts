import { LookupEqualityHelper } from './lookup-equality.helper';

describe('LookupEqualityHelper', () => {
  it('should return a valid $lookup equality stage', () => {
    expect(LookupEqualityHelper(
      'from',
      'as',
      'localField',
      'foreignField',
    )).toEqual({
      from: 'from',
      localField: 'localField',
      foreignField: 'foreignField',
      as: 'as',
    });
  });
});
