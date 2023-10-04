import {LookupStage} from '../../interfaces';

/**
 * Checks the presence of mandatory fields
 * @param payload The value passed to the Lookup stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const lookupPayloadValidator = (payload: LookupStage) => {
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

/**
 * Check that all the fields necessary for an equality payload are present
 * @param payload The value passed to the Lookup stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
const lookupEqualityValidator = (payload: LookupStage) => {
    if (!payload.localField) {
        return 'The localField property is required when foreignField is specified.';
    } else if (!payload.foreignField) {
        return 'The foreignField property is required when localfield is specified.';
    } else {
        return '';
    }
}
