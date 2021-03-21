import {BucketStageInterface} from "../../interfaces";

/**
 * GroupBy Payload
 * @param groupBy
 * @param boundaries
 * @param default_id
 * @param output
 * @constructor
 */
export const GroupByPayload = (
    groupBy: any,
    boundaries: any[],
    default_id: string | number | null = "Other",
    output: any | null = { "count": { $sum: 1 }}
) => {

    const payload = {
        groupBy: groupBy,
        boundaries: boundaries,
        default: default_id,
        output: output
    } as BucketStageInterface;

    if (!default_id) delete payload.default;
    if (!output) delete payload.output;

    return payload;
}
