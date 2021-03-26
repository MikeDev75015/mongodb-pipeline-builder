import {lookupPayloadValidator} from "./stages/lookup-payload.validator";
import {addFieldsPayloadValidator} from "./stages/addFields-payload.validator";
import {bucketPayloadValidator} from "./stages/bucket-payload.validator";
import {bucketAutoPayloadValidator} from "./stages/bucket-auto-payload.validator";
import {collStatsPayloadValidator} from "./stages/collStats-payload.validator";
import {countPayloadValidator} from "./stages/count-payload.validator";
import {facetPayloadValidator} from "./stages/facet-payload.validator";
import {geoNearPayloadValidator} from "./stages/geoNear-payload.validator";
import {graphLookupPayloadValidator} from "./stages/graphLookup-payload.validator";
import {groupPayloadValidator} from "./stages/group-payload.validator";
import {indexStatsPayloadValidator} from "./stages/indexStats-payload.validator";
import {limitPayloadValidator} from "./stages/limit-payload.validator";
import {listSessionsPayloadValidator} from "./stages/listSessions-payload.validator";
import {matchPayloadValidator} from "./stages/match-payload.validator";
import {mergePayloadValidator} from "./stages/merge-payload.validator";
import {outPayloadValidator} from "./stages/out-payload.validator";
import {planCacheStatsPayloadValidator} from "./stages/planCacheStats-payload.validator";
import {projectPayloadValidator} from "./stages/project-payload.validator";
import {redactPayloadValidator} from "./stages/redact-payload.validator";
import {replaceRootPayloadValidator} from "./stages/replaceRoot-payload.validator";
import {replaceWithPayloadValidator} from "./stages/replaceWith-payload.validator";
import {samplePayloadValidator} from "./stages/sample-payload.validator";
import {searchPayloadValidator} from "./stages/search-payload.validator";
import {setPayloadValidator} from "./stages/set-payload.validator";
import {skipPayloadValidator} from "./stages/skip-payload.validator";
import {sortPayloadValidator} from "./stages/sort-payload.validator";
import {sortByCountPayloadValidator} from "./stages/sortByCount-payload.validator";
import {unionWithPayloadValidator} from "./stages/unionWith-payload.validator";
import {unsetPayloadValidator} from "./stages/unset-payload.validator";
import {unwindPayloadValidator} from "./stages/unwind-payload.validator";

/**
 * list of all stage validators
 */
export const PAYLOAD_VALIDATION_ENABLED: { [key: string]: any } = {
    addFields: addFieldsPayloadValidator,
    bucket: bucketPayloadValidator,
    bucketAuto: bucketAutoPayloadValidator,
    collStats: collStatsPayloadValidator,
    count: countPayloadValidator,
    facet: facetPayloadValidator,
    geoNear: geoNearPayloadValidator,
    graphLookup: graphLookupPayloadValidator,
    group: groupPayloadValidator,
    indexStats: indexStatsPayloadValidator,
    limit: limitPayloadValidator,
    listSessions: listSessionsPayloadValidator,
    lookup: lookupPayloadValidator,
    match: matchPayloadValidator,
    merge: mergePayloadValidator,
    out: outPayloadValidator,
    planCacheStats: planCacheStatsPayloadValidator,
    project: projectPayloadValidator,
    redact: redactPayloadValidator,
    replaceRoot: replaceRootPayloadValidator,
    replaceWith: replaceWithPayloadValidator,
    sample: samplePayloadValidator,
    search: searchPayloadValidator,
    set: setPayloadValidator,
    skip: skipPayloadValidator,
    sort: sortPayloadValidator,
    sortByCount: sortByCountPayloadValidator,
    unionWith: unionWithPayloadValidator,
    unset: unsetPayloadValidator,
    unwind: unwindPayloadValidator
}
