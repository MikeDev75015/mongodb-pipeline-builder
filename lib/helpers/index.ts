import { PipelineError } from "../errors";
import {
    LookupConditionPayloadInterface,
    LookupEqualityPayloadInterface
} from "../interfaces";

const pipelineHelpers = {
    /**
     * Lookup Description
     * @param payload
     * @constructor
     */
    Lookup: (payload: LookupEqualityPayloadInterface | LookupConditionPayloadInterface) => {
        if (!payload.from || !payload.as)
            throw new PipelineError('Invalid Lookup Payload, missing "from" or "as" parameter!');

        if (payload['localField'] || payload['foreignField']) {
            if (!payload['localField'] || !payload['foreignField'])
                throw new PipelineError('Invalid Lookup Equality Payload, missing "localField" or "foreignField" parameter!\'');

            return {
                from: payload.from,
                localField: payload['localField'],
                foreignField: payload['foreignField'],
                as: payload.as
            };
        }

        const letObject = {};
        if (payload['sourceList'] && payload['sourceList'].length) {
            payload['sourceList'].forEach(s => letObject[s] = '$' + s);
        }

        let lookupPipeline = [];

        if (payload['pipeline'] && payload['pipeline'].length) lookupPipeline = lookupPipeline.concat(payload['pipeline']);

        if (payload['project'] && payload['project'].list && Object.keys(payload['project'].list).length) {
            if (!payload['project'].type)
                throw new Error('The project type parameter must be specified!');

            const projectPipeline = payload['project'].type === 'only' && !payload['project'].list.includes('_id')
                ? { _id: 0 }
                : {};
            const projectValue = payload['project'].type === 'only'? 1 : 0;
            payload['project'].list.forEach(p => projectPipeline[p] = projectValue);
            lookupPipeline = lookupPipeline.concat({ $project: projectPipeline });
        }

        return {
            from: payload.from,
            let: letObject,
            pipeline: lookupPipeline,
            as: payload.as,
        };
    }
}
export const
    Lookup = pipelineHelpers.Lookup;
