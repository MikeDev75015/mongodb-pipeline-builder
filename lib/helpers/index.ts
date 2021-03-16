import { PipelineError } from "../errors";
import {
    LookupConditionPayloadInterface,
    LookupEqualityPayloadInterface
} from "../interfaces";

/**
 * Export pipeline helpers
 */


/**
 * Lookup Description
 * @param payload
 * @constructor
 */
export const
    Lookup = (payload: LookupEqualityPayloadInterface | LookupConditionPayloadInterface) => {
        if (!payload.from || !payload.as)
            throw new PipelineError('Invalid Lookup Payload, missing "from" or "as" property!');

        if (payload['localField'] || payload['foreignField']) {
            return lookupEqualityStage(payload as LookupEqualityPayloadInterface);
        }

        return lookupConditionStage(payload as LookupConditionPayloadInterface);
    };

export const lookupEqualityStage = (payload: LookupEqualityPayloadInterface) => {
    const { from, as, localField, foreignField } = payload;

    if (!localField || !foreignField)
        throw new PipelineError('Invalid Lookup Equality Payload, missing "localField" or "foreignField" parameter!');

    return {
        $lookup: {
            from: from,
            localField: localField,
            foreignField: foreignField,
            as: as
        }
    };
};

export const lookupConditionStage = (payload: LookupConditionPayloadInterface) => {
    const { from, as, sourceList, pipeline, project } = payload;

    const letObject = {};
    if (sourceList && sourceList.length) {
        sourceList.forEach(s => letObject[s] = '$' + s);
    }

    let lookupPipeline = [];

    if (pipeline && pipeline.length) lookupPipeline = lookupPipeline.concat(pipeline);

    if (project && project.list && Object.keys(project.list).length) {
        if (!project.type)
            throw new Error('The project type property must be specified!');

        const projectPipeline =
            project.type === 'ignore' ||
            (project.type === 'only' && project.list.includes('_id'))
                ? {}
                : { _id: 0 };

        const projectValue = project.type === 'only'? 1 : 0;
        project.list.forEach(p => projectPipeline[p] = projectValue);
        lookupPipeline = lookupPipeline.concat({ $project: projectPipeline });
    }

    const lookupStage = {
        $lookup: {
            from: from,
            as: as,
        }
    };

    if (Object.keys(letObject).length) lookupStage.$lookup['let'] = letObject;
    if (lookupPipeline.length) lookupStage.$lookup['pipeline'] = lookupPipeline;

    return lookupStage;
};
