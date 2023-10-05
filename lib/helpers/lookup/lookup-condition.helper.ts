import {
    LookupCondition, PipeLineStage
} from "../../interfaces";

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
 * LookupConditionHelper('customers', 'customer', { sourceList: ['customerId'], project: { firstname: 1 },
 * pipeline: [{ $match: { $expr: { $eq: ['$id', '$$customerId'] } } }] }
 * OPTIONAL project
 * OPTIONAL pipeline
 * OPTIONAL sourceList
 */
export const LookupConditionHelper = (
    from: string, as: string,
    optional?: {
        project?: {[index: string]: any},
        pipeline?: PipeLineStage[],
        sourceList?: string[]
    }
) => {
    const letObject: {[index: string]: any} = {};
    let pipeline: PipeLineStage[] = [];

    if (optional?.pipeline) {
        pipeline = optional.pipeline;
    }

    if (optional?.sourceList && optional.sourceList[0]) {
        optional.sourceList.forEach(s => letObject[s] = '$' + s);
    }

    if (optional?.project && Object.keys(optional.project).length) {
        pipeline = pipeline.concat([{ $project: optional.project }]);
    }

    const payload: LookupCondition = {
        from,
        as,
    };

    if (Object.keys(letObject).length) {
        payload.let = letObject;
    }

    if (pipeline.length) {
        payload.pipeline = pipeline;
    }

    return payload;
};
