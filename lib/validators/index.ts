import {lookupPayloadValidator} from "./stages/lookup-payload.validator";
import {addFieldsPayloadValidator} from "./stages/addFields-payload.validator";
import {bucketPayloadValidator} from "./stages/bucket-payload.validator";
import {bucketAutoPayloadValidator} from "./stages/bucket-auto-payload.validator";
import {collStatsPayloadValidator} from "./stages/collStats-payload.validator";

/**
 * list of all stage validators
 */
export const PAYLOAD_VALIDATION_ENABLED: { [key: string]: any } = {
    addFields: addFieldsPayloadValidator,
    bucket: bucketPayloadValidator,
    bucketAuto: bucketAutoPayloadValidator,
    collStats: collStatsPayloadValidator,
    count: undefined,
    facet: undefined,
    geoNear: undefined,
    graphLookup: undefined,
    group: undefined,
    indexStats: undefined,
    limit: undefined,
    listSessions: undefined,
    lookup: lookupPayloadValidator,
    match: undefined,
    merge: undefined,
    out: undefined,
    planCacheStats: undefined,
    project: undefined,
    redact: undefined,
    replaceRoot: undefined,
    replaceWith: undefined,
    sample: undefined,
    search: undefined,
    set: undefined,
    skip: undefined,
    sort: undefined,
    sortByCount: undefined,
    unionWith: undefined,
    unset: undefined,
    unwind: undefined
}
