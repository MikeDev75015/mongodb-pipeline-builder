import {CollStatsStage} from '../../interfaces';

/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const collStatsPayloadValidator = (payload: CollStatsStage) => {
    const missingFields = [
        payload.latencyStats === undefined ? 'latencyStats' : '',
        payload.storageStats === undefined ? 'storageStats' : '',
        payload.count === undefined ? 'count' : '',
        payload.queryExecStats === undefined ? 'queryExecStats' : ''
    ].filter(missing => missing);

    if (payload.latencyStats === undefined || payload.storageStats === undefined || payload.count === undefined || payload.queryExecStats === undefined) {
        return `The following mandatory fields are missing: ${missingFields.join((', '))}.`;
    } else if (payload.latencyStats && payload.latencyStats.histograms === undefined) {
        return 'The histograms latencyStats property is missing.';
    } else if (payload.storageStats && payload.storageStats.scale === undefined) {
        return 'The scale storageStats property is missing.';
    }
    return '';
}
