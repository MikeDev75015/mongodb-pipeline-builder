import { PipelineError } from "../../errors";
import {
    LookupConditionPayloadInterface,
    LookupEqualityPayloadInterface
} from "../../interfaces";

/**
 * Performs a left outer join to an unSharded collection in the same database to filter in documents from the “joined”
 * collection for processing. To each input document, the $lookup stage adds a new array field whose elements are the
 * matching documents from the “joined” collection. The $lookup stage passes these reshaped documents to the next stage.
 *
 * @param payload
 * @constructor
 */
export const Lookup = (payload: any) => {
    if (!payload || !Object.keys(payload).length) {
        throw new PipelineError('Invalid Lookup Payload!');
    }

    if (!payload.from || !payload.as) {
        throw new PipelineError('Invalid Lookup Payload, missing "from" or "as" property!');
    }

    return { $lookup: payload };
};
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

    const payload: LookupEqualityPayloadInterface = {
        from: from,
        localField: localField,
        foreignField: foreignField,
        as: as
    };

    return payload;
};
/**
 * Join Conditions and Uncorrelated Sub-queries
 * To perform uncorrelated subQueries between two collections as well as allow other join conditions besides a single
 * equality match
 *
 * @param from
 * @param as
 * @param project
 * @param pipeline
 * @param sourceList
 */
export const ConditionPayload = (from: string, as: string, project: {[index: string]: any} = {}, pipeline: {[index: string]: any}[] = [], sourceList?: string[]) => {

    const letObject: {[index: string]: any} = {};
    if (sourceList && sourceList[0]) {
        sourceList.forEach(s => letObject[s] = '$' + s);
    }

    if (project && Object.keys(project).length) {
        pipeline = pipeline.concat([{ $project: project }]);
    }

    const payload: LookupConditionPayloadInterface = {
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
