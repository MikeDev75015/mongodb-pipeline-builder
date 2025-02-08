import { PipelineError } from '../../errors';
import { GetResultResponse, PipelineStage } from '../../models';
import { checkArgsValidity, throwError } from '../method-utils';

/**
 * Apply the aggregate method on the chosen target
 * @param target The collection or the mongoose model where to apply the pipeline. The target must have the aggregate
 * method
 * @param pipeline The pipeline to apply to the target
 * @returns 2 methods, GetDocs() and GetCount()
 * @constructor
 */
export const GetResult = async <T = any>(
  target: any, pipeline: PipelineStage[],
): Promise<GetResultResponse<T>> => {
  checkArgsValidity(target, pipeline);

  try {
    const result: any[] = await target.aggregate(pipeline);

    // Paging result
    if (
      result.length === 1 &&
      result[0].docs &&
      result[0].count &&
      result[0].count[0] &&
      result[0].count[0].totalElements !== undefined
    ) {
      throwError('Application not possible, use the GetPagingResult method.');
    }

    // Default result
    return {
      GetDocs: () => result,
      GetElement: (index: number | 'last') => getElementByIndex(result, index),
      GetCount: () => result.length,
    } as GetResultResponse<T>;

  } catch (e) {
    throw new PipelineError(`An error was encountered while executing the GetResult method:\n - ${e.message}`);
  }
};

/**
 * Apply the arguments of the GetDocs method of a default result
 * @param result The default result when pagination is not used
 * @param index The index of the element to return
 */
const getElementByIndex = <T>(result: T[], index: number | 'last'): T => {
  if (index === 'last') {
    return result.pop() as T;
  }

  return result[index];
};
