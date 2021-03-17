import { PipelineError } from "../errors";
import {
    LookupConditionPayloadInterface,
    LookupEqualityPayloadInterface
} from "../interfaces";

/**
 * Export pipeline helpers
 */

/**
 * Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be
 * existing fields from the input documents or newly computed fields.
 *
 * @param value Include / Exclude Existing Fields
 * @param _id By default, the _id field is included in the output documents. To exclude the _id field from the output
 * documents, you must explicitly specify the suppression of the _id field in $project by passing false.
 * @constructor
 */
export const Project = (value: { [index: string]: any }, _id = true) => _id ? value : ({ ...value, _id: 0 })

/**
 * Performs a left outer join to an unSharded collection in the same database to filter in documents from the “joined”
 * collection for processing. To each input document, the $lookup stage adds a new array field whose elements are the
 * matching documents from the “joined” collection. The $lookup stage passes these reshaped documents to the next stage.
 *
 * @param payload
 * @constructor
 */
export const Lookup = (payload: any) => {
    if (!payload.from || !payload.as) {
        throw new PipelineError('Invalid Lookup Payload, missing "from" or "as" property!');
    }

    if (payload['localField'] || payload['foreignField']) {
        return lookupEqualityStage(payload as LookupEqualityPayloadInterface);
    }

    return lookupConditionStage(payload as LookupConditionPayloadInterface);
};
/**
 * Equality Match
 * To perform an equality match between a field from the input documents with a field from the documents of the “joined”
 * collection
 *
 * @param payload
 */
export const lookupEqualityStage = (payload: LookupEqualityPayloadInterface) => {
    const { from, as, localField, foreignField } = payload;

    if (!localField || !foreignField) {
        throw new PipelineError('Invalid Lookup Equality Payload, missing "localField" or "foreignField" parameter!');
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
 * @param payload
 */
export const lookupConditionStage = (payload: LookupConditionPayloadInterface) => {
    const { from, as, sourceList, pipeline, project } = payload;

    const letObject: {[index: string]: any} = {};
    if (sourceList) {
        sourceList.forEach(s => letObject[s] = '$' + s);
    }

    let lookupPipeline: any[] = pipeline ? pipeline : [];

    if (project && project.list && project.list.length) {
        if (!project.type) {
            throw new Error('The project type property must be specified!');
        }

        const projectPipeline: {[index: string]: any} =
            project.type === 'only' && !project.list.includes('_id')
                ? { _id: 0 }
                : {};

        const projectValue = project.type === 'only'? 1 : 0;
        project.list.forEach(p => projectPipeline[p] = projectValue);
        lookupPipeline = lookupPipeline.concat({ $project: projectPipeline });
    }

    const lookupStage: {
        from: string;
        as: string;
        let?: any;
        pipeline?: any[];
    } = {
        from: from,
        as: as,
    };

    if (Object.keys(letObject).length) {
        lookupStage.let = letObject;
    }
    if (lookupPipeline.length) {
        lookupStage.pipeline = lookupPipeline;
    }

    return lookupStage;
};
