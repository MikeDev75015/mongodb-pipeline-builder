import { LookupConditionHelper } from './lookup-condition.helper';

describe('ConditionStage', () => {
  it('should return a basic valid $lookup condition stage', () => {
    expect(LookupConditionHelper(
      'from',
      'as',
    )).toEqual({
      as: 'as',
      from: 'from',
    });
  });

  it('should return a valid $lookup condition stage with "only" project type', () => {
    expect(LookupConditionHelper(
      'from',
      'as',
      {
        project: { _id: 0, test1: 1, test2: 1, test3: 1 },
        pipeline: [{ $match: { $expr: { $eq: ['$type', '$$testSource'] } } }],
        let: { testSource: '$testSource' },
      },
    )).toEqual({
      as: 'as',
      from: 'from',
      let: {
        testSource: '$testSource',
      },
      pipeline: [
        { $match: { $expr: { $eq: ['$type', '$$testSource'] } } },
        { $project: { _id: 0, test1: 1, test2: 1, test3: 1 } },
      ],
    });
  });

  it('should return a valid $lookup condition stage with "ignore" project type', () => {
    expect(LookupConditionHelper(
      'from',
      'as',
      {
        project: { _id: 0, test1: 0, test2: 0, test3: 0 },
      },
    )).toEqual({
      as: 'as',
      from: 'from',
      pipeline: [
        { $project: { _id: 0, test1: 0, test2: 0, test3: 0 } },
      ],
    });
  });
});
