import {BucketStage} from '../../models';

/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const bucketPayloadValidator = (payload: BucketStage) => {
    if (payload.groupBy === undefined && payload.boundaries === undefined) {
        return 'The groupBy and boundaries properties are required.';
    } else if (payload.groupBy === undefined) {
        return 'The groupBy property is required.';
    } else if (payload.boundaries === undefined) {
        return 'The boundaries property is required.';
    } else if (payload.boundaries.length < 2) {
        return 'The boundaries value is not valid. You must specify at least two boundaries.';
    }

    return 'VALID';
}
