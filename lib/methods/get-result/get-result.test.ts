import { PipelineError } from '../../errors';
import { GetResultResponse, PipelineStage } from '../../models';
import { GetResult } from './get-result';

const simpleResultMock = [
  { name: 'element 0' },
  { name: 'element 1' },
  { name: 'element 2' },
  { name: 'element 3' },
  { name: 'element 4' },
];

const pagingResultMock = [
  {
    docs: [
      { name: 'element 0' },
      { name: 'element 1' },
      { name: 'element 2' },
    ],
    count: [{ totalElements: 3 }],
  },
];

const targetAggregationMock = {
  aggregate: () => simpleResultMock.map((obj) => (
    { ...obj }
  )),
};
const targetPagingAggregationMock = {
  aggregate: () => [
    {
      docs: pagingResultMock[0].docs.map((obj) => (
        { ...obj }
      )),
      count: pagingResultMock[0].count,
    },
  ],
};

describe('GetResult', () => {
  test.each([
    ['the target is not valid', undefined, [], 'Application not possible, the target is not valid.'],
    [
      'the target does not have the aggregate method',
      {},
      [],
      'Application not possible, the aggregate method does not exist on the chosen target.',
    ],
    [
      'the pipeline is not valid',
      targetAggregationMock,
      undefined as unknown as PipelineStage[],
      'Application not possible, the pipeline is not valid.',
    ],
    ['the pipeline is empty', targetAggregationMock, [], 'Application not possible, the pipeline is empty.'],
    [
      'one pipeline stage is unknown or not valid',
      targetAggregationMock,
      [{ $test: 'unit' } as PipelineStage],
      'Application not possible, $test pipeline stage is unknown or not valid.',
    ],
    [
      'many pipeline stages are unknown or not valid',
      targetAggregationMock,
      [{ $test: 'unit' } as PipelineStage, { $name: 'toto' } as PipelineStage],
      'Application not possible, $test / $name pipeline stages are unknown or not valid.',
    ],
    [
      'the MongoDb operation failed',
      {
        aggregate: async () => {
          throw new Error('MongoDb aggregate method error.');
        },
      },
      [{ $match: {} }],
      `An error was encountered while executing the GetResult method:\n - MongoDb aggregate method error.`,
    ],
  ])(
    'should throw a pipeline error if %s',
    async (_: string, target: any, pipeline: PipelineStage[], errorMessage: string) => {
      await expect(() => GetResult(target, pipeline))
      .rejects
      .toThrowError(new PipelineError(errorMessage));
    },
  );

  it('should throw a pipeline error if it is a paging result', async () => {
    await expect(() => GetResult(targetPagingAggregationMock, [{ $match: {} }]))
    .rejects
    .toThrowError(new PipelineError(
      'An error was encountered while executing the GetResult method:\n - Application not possible, use the GetPagingResult method.'));
  });

  it(
    'should return an object with the GetDocs and GetCount methods as properties that get the documents (or the desired element if specified) and the total number of documents for a simple aggregate',
    async () => {
      const getResult = await GetResult(targetAggregationMock, [{ $match: {} }]) as GetResultResponse<any>;
      expect(getResult)
      .toHaveProperty('GetDocs');
      expect(getResult)
      .toHaveProperty('GetCount');
      expect(getResult.GetDocs())
      .toEqual(simpleResultMock);
      expect(getResult.GetElement(2))
      .toEqual(simpleResultMock[2]);
      expect(getResult.GetElement(10000))
      .toEqual(undefined);
      expect(getResult.GetElement('last'))
      .toEqual(simpleResultMock.pop());
      expect(getResult.GetCount())
      .toEqual(4);
    },
  );
});
