import {StageInterface} from "../interfaces";
import {PipelineError} from "../errors";
import {GetResultResponseInterface} from "../interfaces/core/get-result-response.interface";

/**
 * Apply the aggregate method on the chosen target
 * @param target The collection or the mongoose model where to apply the pipeline. The target must have the aggregate
 * method
 * @param pipeline The pipeline to apply to the target
 * @returns 2 methods, GetDocs() and GetCount()
 * @constructor
 */
export const GetResult = async (target: any, pipeline: StageInterface[]) => {
    if (!target) {
        throw new PipelineError('Application not possible, the target is not valid.');
    }
    if (!target.aggregate) {
        throw new PipelineError('Application not possible, the aggregate method does not exist on the chosen target.');
    }
    if (!pipeline.length) {
        throw new PipelineError('Application not possible, the pipeline is empty.');
    }

    const result = await target.aggregate(pipeline);

    // Paging result
    if (result.length === 1 && result[0].docs && result[0].count && result[0].count[0]) {

        return {
            GetDocs: () => result[0].docs,
            GetCount: () => result[0].count[0].totalElements
        } as GetResultResponseInterface;
    }

    // Default result
    return {
        GetDocs: () => result,
        GetCount: () => result.length
    } as GetResultResponseInterface;
}


