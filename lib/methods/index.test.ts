import {GetResult} from "./index";
import {PipelineError} from "../errors";

const targetAggregationMock = {
    aggregate: () => []
};
const targetPagingAggregationMock = {
    aggregate: () => [{
        docs: [],
        count: [{ totalElements: 0 }]
    }]
};
describe('GetResult', () => {

    it('should throw a PipelineError message if the target is not valid', async () => {
        await expect(
            () => GetResult(undefined, [])
        ).rejects.toThrowError(
            new PipelineError('Application not possible, the target is not valid.')
        )
    });

    it('should throw a PipelineError message if the target does not have the aggregate method', async () => {
        await expect(
            () => GetResult({}, [])
        ).rejects.toThrowError(
            new PipelineError('Application not possible, the aggregate method does not exist on the chosen target.')
        )
    });

    it('should throw a PipelineError message if the pipeline is empty', async () => {
        await expect(
            () => GetResult(targetAggregationMock, [])
        ).rejects.toThrowError(
            new PipelineError('Application not possible, the pipeline is empty.')
        )
    });

    it('should return an object with the GetDocs and GetCount methods as properties that get the documents and' +
        'the total number of documents for a simple aggregate', async () => {
        const getResult = await GetResult(targetAggregationMock, [{ $match: {} } ]);
        await expect(getResult).toHaveProperty('GetDocs');
        await expect(getResult).toHaveProperty('GetCount');
        await expect(getResult.GetDocs()).toEqual([]);
        await expect(getResult.GetCount()).toEqual(0);
    });

    it('should return an object with the GetDocs and GetCount methods as properties that get the documents and' +
        'the total number of documents for a paging aggregate', async () => {
        const getResult = await GetResult(targetPagingAggregationMock, [{ $match: {} }]);
        await expect(getResult).toHaveProperty('GetDocs');
        await expect(getResult).toHaveProperty('GetCount');
        await expect(getResult.GetDocs()).toEqual([]);
        await expect(getResult.GetCount()).toEqual(0);
    });

    it('should throw a PipelineError message if the operation failed', async () => {
        await expect(
            () => GetResult({ aggregate: async () => {
                throw new Error('The collection does not exist.')
                }}, [{ $match: {} }])
        ).rejects.toThrowError(
            new PipelineError(
                `An error was encountered while executing the GetResult method:\n - The collection does not exist.`
            )
        )
    });
});
