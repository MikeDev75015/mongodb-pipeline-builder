/**
 * constant containing all date formats used in the application. If empty, the ISO format will be used by default.
 */
export const DATE_FORMAT: { [index: string]: string } = {};
/**
 * list of all valid stages in a pipeline
 */
export const VALID_STAGE_LIST = [
    'addFields', 'bucket', 'bucketAuto', 'collStats', 'count', 'facet', 'geoNear', 'graphLookup', 'group', 'indexStats',
    'limit', 'listSessions', 'lookup', 'match', 'merge', 'out', 'planCacheStats', 'project', 'redact', 'replaceRoot',
    'replaceWith', 'sample', 'search', 'set', 'skip', 'sort', 'sortByCount', 'unionWith', 'unset', 'unwind'
];
/**
 * list of all stage validators implemented
 */
export const PAYLOAD_VALIDATION_ENABLED = [
    'lookup'
];
