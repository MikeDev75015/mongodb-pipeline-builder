import {BucketAutoStage} from "../../interfaces";

/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const bucketAutoPayloadValidator = (payload: BucketAutoStage) => {
    const granularityValueList = [
        'R5', 'R10', 'R20', 'R40', 'R80', '1-2-5', 'E6', 'E12', 'E24', 'E48', 'E96', 'E192', 'POWERSOF2'
    ];

    if (payload.groupBy === undefined && payload.buckets === undefined) {
        return 'The groupBy and buckets properties are required.';
    } else if (payload.groupBy === undefined) {
        return 'The groupBy property is required.';
    } else if (payload.buckets === undefined) {
        return 'The buckets property is required.';
    } else if (payload.buckets < 1) {
        return 'The buckets value is not valid. You must specify a positive 32-bit integer.';
    } else if (payload.granularity && !granularityValueList.includes(payload.granularity)) {
        return `The granularity value is not valid. You must specify one of these possible values: ${granularityValueList.join(' | ')}.`;
    }
    return '';
}
