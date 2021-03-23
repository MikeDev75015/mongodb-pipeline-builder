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
 * @param from the collection in the same database to perform the join with. The from collection cannot be sharded.
 * @param as Specifies the name of the new array field to add to the input documents. The new array field contains the
 * matching documents from the from collection.
 * @param optional All optional parameters of the method - sourceList, project and pipeline.
 *
 * @example
 * // with optional parameters
 * ConditionPayload('customers', 'customer', { sourceList: ['customerId'], project: { firstname: 1 },
 * pipeline: [{ $match: { $expr: { $eq: ['$id', '$$customerId'] } } }] }
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

    if (optional && optional.pipeline) {
        pipeline = optional.pipeline;
    }

    if (optional && optional.sourceList && optional.sourceList[0]) {
        optional.sourceList.forEach(s => letObject[s] = '$' + s);
    }

    if (optional && optional.project && Object.keys(optional.project).length) {
        pipeline = pipeline.concat([{ $project: optional.project }]);
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
