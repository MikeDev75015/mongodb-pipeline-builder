import { PipelineError } from '../errors';
import { PipelineStage, ValidPipelineStageNameList } from '../models';

export const checkArgsValidity = (target: any, pipeline: PipelineStage[]) => {
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

export const throwError = (message: string): void => {
  throw new PipelineError(message);
};