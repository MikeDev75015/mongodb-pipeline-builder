/**
 * Check the mandatory properties of the lookup payload
 * @param payload
 * @constructor
 */
import {LookupStageInterface} from "../interfaces";

export const lookupPayloadValidator = (payload: LookupStageInterface) => {
    if (!payload.from && !payload.as) {
        return 'The from and as properties are required';
    } else if (!payload.from) {
        return 'The from property is required';
    } else if (!payload.as) {
        return 'The as property is required';
    } else if (payload.localField || payload.foreignField) {
        return lookupEqualityValidator(payload);
    } else {
        return '';
    }
}

const lookupEqualityValidator = (payload: LookupStageInterface) => {
    if (!payload.localField) {
        return 'The localField property is required when foreignField is specified.';
    } else if (!payload.foreignField) {
        return 'The foreignField property is required when localfield is specified.';
    } else {
        return '';
    }
}
