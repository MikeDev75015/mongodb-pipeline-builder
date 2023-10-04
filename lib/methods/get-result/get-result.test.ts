import { GetPagingResult, GetResult, getTotalPageNumber } from './get-result';
import { PipelineError } from '../../errors';
import { PipeLineStage } from '../../interfaces';
import { GetResultResponse } from '../../interfaces/core/get-result.response';
import { GetPagingResultResponse } from "../../interfaces/core/get-paging-result.response";

const simpleResultMock = [
  { name: 'element 0' },
  { name: 'element 1' },
  { name: 'element 2' },
  { name: 'element 3' },
  { name: 'element 4' },
];

const pagingResultMock = [{
  docs: [
    { name: 'element 0' },
    { name: 'element 1' },
    { name: 'element 2' },
  ],
  count: [{ totalElements: 3 }],
}];

const targetAggregationMock = {
  aggregate: () => simpleResultMock.map((obj) => ({ ...obj })),
};
const targetPagingAggregationMock = {
  aggregate: () => [{
    docs: pagingResultMock[0].docs.map((obj) => ({ ...obj })),
    count: pagingResultMock[0].count,
  }],
};

const pagingPipelineMock = [{
  $facet: {
    docs: [
      { $limit: 5 },
    ],
  },
}];

const pagingCountMock = [{ totalElements: 21 }];
const pagingCountMock2 = [{ totalElements: 20 }];

describe('GetResult', () => {
  it('should throw a PipelineError message if the target is not valid', async () => {
    await expect(
      () => GetResult(undefined, [])
    )
      .rejects
      .toThrowError(
        new PipelineError('Application not possible, the target is not valid.')
      );
  });

  it('should throw a PipelineError message if the target does not have the aggregate method', async () => {
    await expect(
      () => GetResult({}, [])
    )
      .rejects
      .toThrowError(
        new PipelineError('Application not possible, the aggregate method does not exist on the chosen target.')
      );
  });

  it('should throw a PipelineError message if the pipeline is not valid', async () => {
    await expect(
      () => GetResult(targetAggregationMock, undefined as unknown as PipeLineStage[])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, the pipeline is not valid.')
    );
  });

  it('should throw a PipelineError message if the pipeline is empty', async () => {
    await expect(
      () => GetResult(targetAggregationMock, [])
    )
      .rejects
      .toThrowError(
        new PipelineError('Application not possible, the pipeline is empty.')
      );
  });

  it('should throw a PipelineError message if one pipeline stage is unknown or not valid', async () => {
    await expect(
      () => GetResult(targetAggregationMock, [{ $test: 'unit' } as PipeLineStage])
    )
      .rejects
      .toThrowError(
        new PipelineError('Application not possible, $test pipeline stage is unknown or not valid.')
      );
  });

  it('should throw a PipelineError message if many pipeline stages are unknown or not valid', async () => {
    await expect(
      () => GetResult(targetAggregationMock, [{ $test: 'unit' } as PipeLineStage, { $name: 'toto' } as PipeLineStage])
    )
      .rejects
      .toThrowError(
        new PipelineError('Application not possible, $test / $name pipeline stages are unknown or not valid.')
      );
  });

  it('should throw a PipelineError message if the MongoDb operation failed', async () => {
    await expect(
      () => GetResult({
        aggregate: async () => {
          throw new Error('MongoDb aggregate method error.');
        }
      }, [{ $match: {} }])
    )
      .rejects
      .toThrowError(
        new PipelineError(
          `An error was encountered while executing the GetResult method:\n - MongoDb aggregate method error.`
        )
      );
  });

  it('should return an object with the GetDocs and GetCount methods as properties that get the documents (or the desired element if specified) and the total number of documents for a simple aggregate', async () => {
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
  });
});

describe('GetPagingResult', () => {
  it('should throw a PipelineError message if the target is not valid', async () => {
    await expect(
      () => GetPagingResult(undefined, [])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, the target is not valid.')
    );
  });

  it('should throw a PipelineError message if the target does not have the aggregate method', async () => {
    await expect(
      () => GetPagingResult({}, [])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, the aggregate method does not exist on the chosen target.')
    );
  });

  it('should throw a PipelineError message if the pipeline is not valid', async () => {
    await expect(
      () => GetPagingResult(targetAggregationMock, undefined as unknown as PipeLineStage[])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, the pipeline is not valid.')
    );
  });

  it('should throw a PipelineError message if the pipeline is empty', async () => {
    await expect(
      () => GetPagingResult(targetAggregationMock, [])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, the pipeline is empty.')
    );
  });

  it('should throw a PipelineError message if one pipeline stage is unknown or not valid', async () => {
    await expect(
      () => GetPagingResult(targetAggregationMock, [{ $test: 'unit' } as PipeLineStage])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, $test pipeline stage is unknown or not valid.')
    );
  });

  it('should throw a PipelineError message if many pipeline stages are unknown or not valid', async () => {
    await expect(
      () => GetPagingResult(targetAggregationMock, [{ $test: 'unit' } as PipeLineStage, { $name: 'toto' } as PipeLineStage])
    )
    .rejects
    .toThrowError(
      new PipelineError('Application not possible, $test / $name pipeline stages are unknown or not valid.')
    );
  });

  it('should throw a PipelineError message if the MongoDb operation failed', async () => {
    await expect(
      () => GetPagingResult({
        aggregate: async () => {
          throw new Error('MongoDb aggregate method error.');
        }
      }, [{ $match: {} }])
    )
    .rejects
    .toThrowError(
      new PipelineError(
        `An error was encountered while executing the GetPagingResult method:\n - MongoDb aggregate method error.`
      )
    );
  });

  it('should return an object with the GetDocs and GetCount methods as properties that get the documents and' +
    'the total number of documents for a paging aggregate', () => {
    GetPagingResult(targetPagingAggregationMock, [{ $match: {} }])
    .then((getPagingResult) => {
      expect(getPagingResult)
      .toHaveProperty('GetDocs');
      expect(getPagingResult)
      .toHaveProperty('GetCount');
      expect(getPagingResult.GetDocs())
      .toEqual(pagingResultMock[0].docs);
      expect(getPagingResult.GetCount())
      .toEqual(pagingResultMock[0].count[0].totalElements);
      expect((getPagingResult as GetPagingResultResponse<any>).GetTotalPageNumber())
      .toEqual(-1);
    });
  });
});

describe('getTotalPageNumber', () => {
  test.each([
    ['count is undefined', undefined, pagingPipelineMock],
    ['count is an empty array', [], pagingPipelineMock],
    ['totalElements in count is missing', [{}], pagingPipelineMock],
    ['totalElements in count is undefined', [{ totalElements: undefined }], pagingPipelineMock],

    ['pipeline is undefined', pagingCountMock, undefined],
    ['pipeline is an empty array', pagingCountMock, []],

  ])('should return -1 if %s', (
    testName: string,
    count,
    pipeline
  ) => {
    expect(
      getTotalPageNumber(count as unknown as any[], pipeline as unknown as PipeLineStage[])
    ).toEqual(-1);
  });

  it('should return -1 if elementsPerPage is not valid', () => {
    expect(getTotalPageNumber([{ totalElements: 21 }], [{
      $facet: {
        docs: [
          { $limit: 0 },
        ],
      },
    }])).toEqual(-1);
  });

  it('should return the total page number', () => {
    expect(getTotalPageNumber(pagingCountMock, pagingPipelineMock)).toEqual(5);
    expect(getTotalPageNumber(pagingCountMock2, pagingPipelineMock)).toEqual(4);
  });
});
