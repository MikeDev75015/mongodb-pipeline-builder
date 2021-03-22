import { PipelineError } from "../../errors";
import {
    LookupConditionInterface, LookupEqualityInterface, StageInterface
} from "../../interfaces";

/**
 * Equality Match
 * To perform an equality match between a field from the input documents with a field from the documents of the “joined”
 * collection
 *
 * @param from
 * @param as
 * @param localField
 * @param foreignField
 */
export const EqualityPayload = (from: string, as: string, localField: string, foreignField: string) => {
    if (!localField || !foreignField) {
        throw new PipelineError('Invalid Lookup Equality Payload, invalid or missing "localField" or "foreignField" parameter!');
    }

    return {
        from: from,
        localField: localField,
        foreignField: foreignField,
        as: as
    } as LookupEqualityInterface;
};
/**
 * Join Conditions and Uncorrelated Sub-queries
 * To perform uncorrelated subQueries between two collections as well as allow other join conditions besides a single
 * equality match
 *
 * @param from
 * @param as
 * @param optional
 * OPTIONAL project
 * OPTIONAL pipeline
 * OPTIONAL sourceList
 */
export const ConditionPayload = (
    from: string, as: string,
    optional?: {
        project?: {[index: string]: any},
        pipeline?: StageInterface[],
        sourceList?: string[]
    }
) => {
    const letObject: {[index: string]: any} = {};
    let pipeline: StageInterface[] = [];

    if (optional) {
        if (optional.pipeline) {
            pipeline = optional.pipeline;
        }

        if (optional.sourceList && optional.sourceList[0]) {
            optional.sourceList.forEach(s => letObject[s] = '$' + s);
        }

        if (optional.project && Object.keys(optional.project).length) {
            pipeline = pipeline.concat([{ $project: optional.project }]);
        }
    }

    const payload: LookupConditionInterface = {
        from: from,
        as: as,
    };

    if (Object.keys(letObject).length) {
        payload.let = letObject;
    }

    if (pipeline.length) {
        payload.pipeline = pipeline;
    }

    return payload;
};
