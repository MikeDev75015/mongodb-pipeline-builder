import { PipelineError } from "../../errors";
import {
    LookupConditionPayloadInterface
} from "../../interfaces";

/**
 * Check the mandatory properties of the lookup payload
 * @param payload
 * @constructor
 */
export const validLookupPayload = (payload: any) => {
    if (!payload.from && !payload.as) {
        return 'The from and as properties are required';
    } else if (!payload.from) {
        return 'The from property is required';
    } else if (!payload.as) {
        return 'The as property is required';
    } else {
        return '';
    }
}
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
    };
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
