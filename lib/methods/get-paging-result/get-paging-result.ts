import { PipelineError } from '../../errors';
import { GetPagingResultResponse, PipelineStage } from '../../models';
import { checkArgsValidity, throwError } from '../method-utils';

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
      (result[0].count[0] && result[0].count[0].totalElements === undefined)
    ) {
      throwError('Application not possible, use the GetResult method.');
    }

    // Default result
    const { docs, count } = result[0];
    return {
      GetDocs: () => docs as T[],
      GetCount: () => count[0]?.totalElements ?? 0,
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
    return 0;
  }

  const totalElements = count[0].totalElements;
  const limitStage = pipeline[0].$facet ? pipeline[0].$facet.docs.find((s) => s.$limit) : undefined;
  const elementsPerPage = limitStage ? limitStage.$limit as number : undefined;

  if (!elementsPerPage) {
    return 0;
  }

  return totalElements % elementsPerPage
    ? Math.floor(totalElements / elementsPerPage) + 1
    : Math.floor(totalElements / elementsPerPage);
};
