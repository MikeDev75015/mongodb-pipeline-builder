import {
    BucketStageInterface,
    BucketAutoStageInterface,
    CollStatsStageInterface,
    FacetStageInterface,
    GeoNearStageInterface
} from "../";

/**
 * interface StageInterface
 */
export interface StageInterface {
    /**
     * $addFields
     */
    $addFields?: { [key: string]: any; } | { [key: string]: any; }[];
    /**
     * $bucket
     */
    $bucket?: BucketStageInterface;
    /**
     * $bucketAuto
     */
    $bucketAuto?: BucketAutoStageInterface;
    /**
     * $collStats
     */
    $collStats?: CollStatsStageInterface;
    /**
     * $count
     * Passes a document to the next stage that contains a count of the number of documents input to the stage.
     */
    $count?: string;
    /**
     * $facet
     */
    $facet?: FacetStageInterface;
    /**
     * $geoNear
     */
    $geoNear?: GeoNearStageInterface;
    /**
     * $graphLookup
     */
    $graphLookup?: any;
    /**
     * $group
     */
    $group?: any;
    /**
     * $indexStats
     */
    $indexStats?: any;
    /**
     * $limit
     */
    $limit?: any;
    /**
     * $listSessions
     */
    $listSessions?: any;
    /**
     * $lookup
     */
    $lookup?: any;
    /**
     * $match
     */
    $match?: any;
    /**
     * $merge
     */
    $merge?: any;
    /**
     * $out
     */
    $out?: any;
    /**
     * $planCacheStats
     */
    $planCacheStats?: any;
    /**
     * $project
     */
    $project?: any;
    /**
     * $redact
     */
    $redact?: any;
    /**
     * $replaceRoot
     */
    $replaceRoot?: any;
    /**
     * $replaceWith
     */
    $replaceWith?: any;
    /**
     * $sample
     */
    $sample?: any;
    /**
     * $search
     */
    $search?: any;
    /**
     * $set
     */
    $set?: any;
    /**
     * $skip
     */
    $skip?: any;
    /**
     * $sort
     */
    $sort?: any;
    /**
     * $sortByCount
     */
    $sortByCount?: any;
    /**
     * $unionWith
     */
    $unionWith?: any;
    /**
     * $unset
     */
    $unset?: any;
    /**
     * $unwind
     */
    $unwind?: any;
}
