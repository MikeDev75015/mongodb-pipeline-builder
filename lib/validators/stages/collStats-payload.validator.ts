import {CollStatsStage} from '../../interfaces';

/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const collStatsPayloadValidator = (payload: CollStatsStage) => {
    if (!Object.keys(payload).length) {
        return 'Invalid empty payload.';
    }
    return '';
}
