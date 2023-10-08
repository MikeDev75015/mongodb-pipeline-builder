import {GeoNearStage} from '../../models';

/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const geoNearPayloadValidator = (payload: GeoNearStage) => {
    if (payload.near === undefined || payload.distanceField === undefined) {
        return 'The near and the distanceField properties are required.'
    }

    return 'VALID';
}
