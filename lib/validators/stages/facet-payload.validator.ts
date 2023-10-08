import { FacetStage, PipeLineStage, ValidPipelineStageNameList } from '../../models';

/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const facetPayloadValidator = (payload: FacetStage) => {
  if (!Object.keys(payload).length) {
    return 'You must specify at least one output field with its sub-pipeline.';
  }

  const invalidValueType = Object.keys(payload).filter(
    k => !Array.isArray(payload[k]),
  );
  if (invalidValueType.length) {
    return `The ${invalidValueType.join(' / ')} pipeline${invalidValueType.length > 1
      ? 's are not valid'
      : ' is not valid'}.`;
  }

  const pipelineName = Object.keys(payload);
  const pipelineList = Object.values(payload) as (PipeLineStage & { disableValidation?: boolean })[][];
  const pipelineErrors: string[] = [];

  pipelineList.forEach((pipeline, i) => {
    const stageErrorList = pipeline.map((stage) => {
      const [stageName] = Object.keys(stage);
      if (stage.disableValidation || ValidPipelineStageNameList.includes(stageName)) {
        return;
      }

      return stageName;
    }).filter((name) => !!name);

    if (stageErrorList.length) {
      pipelineErrors.push(`The ${pipelineName[i]} contains invalid stage(s): ${stageErrorList.join(', ')}.`);
    }
  });

  if (pipelineErrors.length) {
    return pipelineErrors.join('\n');
  }

  const facetExceptionStageList = [
    '$collStats', '$facet', '$geoNear', '$indexStats', '$out', '$merge', '$planCacheStats',
  ];
  const incompatibleStageList = Object.keys(payload).filter(
    k => !!(
      payload[k].find(
        s => (
          facetExceptionStageList.includes(Object.keys(s)[0])
        ),
      )
    ),
  );
  if (incompatibleStageList.length) {
    return `The ${incompatibleStageList.join(' / ')} output${incompatibleStageList.length > 1
      ? 's'
      : ''} contains one or more incompatible stages.`;
  }

  return 'VALID';
};
