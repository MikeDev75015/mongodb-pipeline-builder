import {BucketStageInterface} from "../../interfaces";

/**
 * GroupBy Payload
 * @param groupBy
 * @param boundaries
 * @param defaultId
 * @param output
 * @constructor
 */
export const GroupByPayload = (
    groupBy: any,
    boundaries: any[],
    defaultId: string | number | null = "Other",
    output: any | null = { "count": { $sum: 1 }}
) => {

    const payload = {
        groupBy: groupBy,
        boundaries: boundaries,
        default: defaultId,
        output: output
    } as BucketStageInterface;

    if (!defaultId) {
        delete payload.default;
    }

    if (!output) {
        delete payload.output;
    }

    return payload;
}
