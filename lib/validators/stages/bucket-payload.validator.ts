import {BucketStageInterface} from "../../interfaces";

/**
 * Checks the presence of mandatory fields
 * @param payload The value passed to the Bucket stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const bucketPayloadValidator = (payload: BucketStageInterface) => {
    if (!payload.groupBy && !payload.boundaries) {
        return 'The groupBy and boundaries properties are required.';
    } else if (!payload.groupBy) {
        return 'The groupBy property is required.';
    } else if (!payload.boundaries) {
        return 'The boundaries property is required.';
    } else if (payload.boundaries.length < 2) {
        return 'The boundaries value is not valid. You must specify at least two boundaries.';
    }

    return '';
}
