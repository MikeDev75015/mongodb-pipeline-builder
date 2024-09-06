import { MergeStage } from '../../models';
import { MergeStageOptional } from '../../models/stages/merge-stage';

/**
 * Into Payload
 * @param into The output collection. Specify either:
 * The collection name as a string to output to a collection in the same database where the aggregation is run. For
 * example:
 * into: "myOutput"
 * The database and collection name in a document to output to a collection in the specified database. For example:
 * into: { db:"myDB", coll:"myOutput" }
 * NOTE
 * If the output collection does not exist, $merge creates the collection:
 * For a replica set or a standalone, if the output database does not exist, $merge also creates the database.
 * For a sharded cluster, the specified output database must already exist.
 * The output collection can be a sharded collection.
 * @param optional Optionals.
 * @constructor
 */
export const MergeHelper = (
  into: MergeStage['into'],
  optional: MergeStageOptional = {},
) => (
  {
    into,
    ...optional,
  } as MergeStage
);
