import { PipelineError } from '../../errors';
import { GetPagingResultResponse, GetResultResponse, PipelineStage, ValidPipelineStageNameList } from '../../models';

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
 * Apply the aggregate method on the chosen target
 * @param target The collection or the mongoose model where to apply the pipeline. The target must have the aggregate
 * method
 * @param pipeline The pipeline to apply to the target
 * @returns 2 methods, GetDocs() and GetCount()
 * @constructor
 */
export const GetPagingResult = async <T = any>(
  target: any, pipeline: PipelineStage[],
): Promise<GetPagingResultResponse<T>> => {
  checkArgsValidity(target, pipeline);

  try {
    const result: any[] = await target.aggregate(pipeline);

    // Paging result
    if (
      result.length > 1 ||
      !result[0].docs ||
      !result[0].count ||
      !result[0].count[0] ||
      result[0].count[0].totalElements === undefined
    ) {
      throwError('Application not possible, use the GetResult method.');
    }

    // Default result
    const { docs, count } = result[0];
    return {
      GetDocs: () => docs as T[],
      GetCount: () => count[0].totalElements,
      GetTotalPageNumber: (): number => getTotalPageNumber(count, pipeline),
    } as GetPagingResultResponse<T>;

  } catch (e) {
    throw new PipelineError(`An error was encountered while executing the GetPagingResult method:\n - ${e.message}`);
  }
};

/**
 * Calculates the total number of pages for a pagination result
 * @param count The result of the pipeline count of the stage facet
 * @param pipeline The pipeline applied to the target
 */
export const getTotalPageNumber = (count: { totalElements: number; }[], pipeline: PipelineStage[]): number => {
  if (
    !count?.length || count[0].totalElements === undefined ||
    !pipeline?.length
  ) {
    return -1;
  }

  const totalElements = count[0].totalElements;
  const limitStage = pipeline[0].$facet ? pipeline[0].$facet.docs.find((s) => s.$limit) : undefined;
  const elementsPerPage = limitStage ? limitStage.$limit as number : undefined;

  if (!elementsPerPage) {
    return -1;
  }

  return totalElements % elementsPerPage
    ? Math.floor(totalElements / elementsPerPage) + 1
    : Math.floor(totalElements / elementsPerPage);
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

const checkArgsValidity = (target: any, pipeline: PipelineStage[]) => {
  if (!target) {
    throw new PipelineError('Application not possible, the target is not valid.');
  }
  if (!target.aggregate) {
    throw new PipelineError('Application not possible, the aggregate method does not exist on the chosen target.');
  }
  if (!pipeline) {
    throw new PipelineError('Application not possible, the pipeline is not valid.');
  }
  if (!pipeline.length) {
    throw new PipelineError('Application not possible, the pipeline is empty.');
  }
  // @ts-ignore
  const unknownStageList: any[] = pipeline.filter((s) => !ValidPipelineStageNameList.includes(Object.keys(s)[0]));
  if (unknownStageList?.length) {
    const unknownStageNameList = unknownStageList.map((s) => Object.keys(s)[0]);
    throw new PipelineError(`Application not possible, ${unknownStageNameList.length > 1
      ? unknownStageNameList.join(' / ') + ' pipeline stages are'
      : unknownStageNameList[0] + ' pipeline stage is'
    } unknown or not valid.`);
  }
};

const throwError = (message: string): void => {
  throw new PipelineError(message);
};
