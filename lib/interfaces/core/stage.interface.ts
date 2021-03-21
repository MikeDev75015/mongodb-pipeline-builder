import {
    BucketStageInterface,
    BucketAutoStageInterface,
    CollStatsStageInterface,
    FacetStageInterface,
    GeoNearStageInterface,
    GraphLookupStageInterface,
    GroupStageInterface,
    LookupStageInterface,
    MergeStageInterface,
    OutStageInterface, ReplaceRootStageInterface, SampleStageInterface, UnionWithStageInterface, UnwindStageInterface
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
    $graphLookup?: GraphLookupStageInterface;
    /**
     * $group
     */
    $group?: GroupStageInterface;
    /**
     * $indexStats
     */
    $indexStats?: any;
    /**
     * $limit
     */
    $limit?: number;
    /**
     * $listSessions
     */
    $listSessions?: any;
    /**
     * $lookup
     */
    $lookup?: LookupStageInterface;
    /**
     * $match
     */
    $match?: any;
    /**
     * $merge
     */
    $merge?: MergeStageInterface;
    /**
     * $out
     */
    $out?: OutStageInterface;
    /**
     * $planCacheStats
     */
    $planCacheStats?: any;
    /**
     * $project
     */
    $project?: { [key: string]: any };
    /**
     * $redact
     */
    $redact?: any;
    /**
     * $replaceRoot
     */
    $replaceRoot?: ReplaceRootStageInterface;
    /**
     * $replaceWith
     */
    $replaceWith?: any;
    /**
     * $sample
     */
    $sample?: SampleStageInterface;
    /**
     * $search
     */
    $search?: any;
    /**
     * $set
     */
    $set?: { [key: string]: any };
    /**
     * $skip
     */
    $skip?: number;
    /**
     * $sort
     */
    $sort?: { [key: string]: any };
    /**
     * $sortByCount
     */
    $sortByCount?: any;
    /**
     * $unionWith
     */
    $unionWith?: UnionWithStageInterface;
    /**
     * $unset
     */
    $unset?: string | string[];
    /**
     * $unwind
     */
    $unwind?: string | UnwindStageInterface;
}
