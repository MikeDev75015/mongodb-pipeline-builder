import { PipelineError } from "../../errors";
import {
    LookupEqualityInterface
} from "../../interfaces";

/**
 * Equality Match
 * To perform an equality match between a field from the input documents with a field from the documents of the “joined”
 * collection
 *
 * @param from
 * @param as
 * @param localField
 * @param foreignField
 */
export const EqualityPayload = (from: string, as: string, localField: string, foreignField: string) => {
    if (!localField || !foreignField) {
        throw new PipelineError('Invalid Lookup Equality Payload, invalid or missing "localField" or "foreignField" parameter!');
    }

    return {
        from: from,
        localField: localField,
        foreignField: foreignField,
        as: as
    } as LookupEqualityInterface;
};
