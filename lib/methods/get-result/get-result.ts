import { StageInterface, StageTypeEnum } from '../../interfaces';
import { PipelineError } from '../../errors';
import { GetResultResponse } from '../../interfaces/core/get-result.response';
import { GetPagingResultResponse } from '../../interfaces/core/get-paging-result.response';

/**
 * Apply the aggregate method on the chosen target
 * @param target The collection or the mongoose model where to apply the pipeline. The target must have the aggregate
 * method
 * @param pipeline The pipeline to apply to the target
 * @returns 2 methods, GetDocs() and GetCount()
 * @constructor
 */
export const GetResult = async (
  target: any, pipeline: StageInterface[]
): Promise<GetResultResponse | GetPagingResultResponse> => {
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
  const unknownStageList: any[] = pipeline.filter((s) => !StageTypeEnum[Object.keys(s)[0].substr(1)]);
  if (unknownStageList && unknownStageList.length) {
    const unknownStageNameList = unknownStageList.map((s) => Object.keys(s)[0]);
    throw new PipelineError(`Application not possible, ${unknownStageNameList.length > 1
      ? unknownStageNameList.join(' / ') + ' pipeline stages are'
      : unknownStageNameList[0] + ' pipeline stage is'
    } unknown or not valid.`);
  }

  try {
    const result: any[] = await target.aggregate(pipeline);

    // Paging result
    if (
      result.length === 1 &&
      result[0].docs &&
      result[0].count &&
      result[0].count[0] &&
      result[0].count[0].totalElements !== undefined &&
      result[0].count[0].totalElements >= 0
    ) {
      const { docs, count } = result[0];
      return {
        GetDocs: () => {
          return docs;
        },
        GetCount: () => count[0].totalElements,
        GetTotalPageNumber: (): number => getTotalPageNumber(count, pipeline),
      } as GetPagingResultResponse;
    }

    // Default result
    return {
      GetDocs: (element?: number | 'last') => getDocsOfDefaultResult(result, element),
      GetCount: () => result.length
    } as GetResultResponse;

  } catch (e) {
    throw new PipelineError(`An error was encountered while executing the GetResult method:\n - ${e.message}`);
  }
};

/**
 * Calculates the total number of pages for a pagination result
 * @param count The result of the pipeline count of the stage facet
 * @param pipeline The pipeline applied to the target
 */
export const getTotalPageNumber = (count: { totalElements: number; }[], pipeline: StageInterface[]): number => {
  if (
    !count || !count.length || count[0].totalElements === undefined ||
    !pipeline || !pipeline.length
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
}

/**
 * Apply the arguments of the GetDocs method of a default result
 * @param result The default result when pagination is not used
 * @param element The argument passed as a parameter of the GetDocs method of a result without pagination
 */
export const getDocsOfDefaultResult = (result: any[], element?: number | 'last') => {
  if (element === undefined) {
    return result;
  }
  const lastIndex = result.length - 1;
  if (element > lastIndex || element === 'last') {
    return result[lastIndex];
  }
  return result[element];
}


