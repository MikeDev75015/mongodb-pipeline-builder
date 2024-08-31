import { PipelineStage, StageValidatorsBundle } from '../models';
import * as Validators from '../validators';

/**
 * Contains the list of all stage validators available.
 */
export const STAGE_PAYLOAD_VALIDATORS_AVAILABLE: StageValidatorsBundle = {
  $addFields: Validators.addFieldsPayloadValidator,
  $bucket: Validators.bucketPayloadValidator,
  $bucketAuto: Validators.bucketAutoPayloadValidator,
  $collStats: Validators.collStatsPayloadValidator,
  $count: Validators.countPayloadValidator,
  $facet: Validators.facetPayloadValidator,
  $geoNear: Validators.geoNearPayloadValidator,
  $lookup: Validators.lookupPayloadValidator,
  $match: Validators.matchPayloadValidator,
  $project: Validators.projectPayloadValidator,
  $set: Validators.setPayloadValidator,
  $sort: Validators.sortPayloadValidator,
};

export const NON_DUPLICABLE_STAGE_LIST: (keyof PipelineStage)[] = [
  '$changeStream', '$changeStreamSplitLargeEvent', '$geoNear', '$merge', '$out',
];
