import {MergeStage, WhenMatchedType, WhenNotMatchedType, PipeLineStage} from "../../models";

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
 * @param optional OPTIONAL on. Field or fields that act as a unique identifier for a document. The identifier determines if a
 * results document matches an already existing document in the output collection. Specify either:
 * A single field name as a string. For example:
 * on: "_id"
 * A combination of fields in an array. For example:
 * on: [ "date", "customerId" ]
 * The order of the fields in the array does not matter, and you cannot specify the same field multiple times.
 * For the specified field or fields:
 * The aggregation results documents must contain the field(s) specified in the on, unless the on field is the _id
 * field. If the _id field is missing from a results document, MongoDB adds it automatically.
 * The specified field or fields cannot contain a null or an array value.
 * $merge requires a unique, index with keys that correspond to the on identifier fields. Although the order of the
 * index key specification does not matter, the unique index must only contain the on fields as its keys.
 * The index must also have the same collation as the aggregation’s collation.
 * The unique index can be a sparse index.
 * For output collections that already exist, the corresponding index must already exist.
 * The default value for on depends on the output collection:
 * If the output collection does not exist, the on identifier must be and defaults to the _id field. The
 * corresponding unique _id index is automatically created.
 * TIP
 * To use a different on identifier field(s) for a collection that does not exist, you can create the collection
 * first by creating a unique index on the desired field(s). See the section on non-existent output collection for
 * an example.
 * If the existing output collection is unsharded, the on identifier defaults to the _id field.
 * If the existing output collection is a sharded collection, the on identifier defaults to all the shard key fields
 * and the _id field. If specifying a different on identifier, the on must contain all the shard key fields.
 * OPTIONAL whenMatched. The behavior of $merge if a result document and an existing document in the collection
 * have the same value for the specified on field(s).
 * OPTIONAL letWhenMatched. Specifies variables accessible for use in the whenMatched pipeline
 * the $$new variable is reserved, and cannot be overridden.
 * To access the let variables in the whenMatched pipeline, use the double dollar signs ($$) prefix and variable
 * name $$<variable>.
 * OPTIONAL whenNotMatched. The behavior of $merge if a result document does not match an existing document in
 * the out collection.
 * @constructor
 */
export const MergeIntoHelper = (
    into: string | { [key: string]: string },
    optional?: {
        on?: string | string[],
        whenMatched?: WhenMatchedType | PipeLineStage[],
        letWhenMatched?: { [key: string]: any },
        whenNotMatched?: WhenNotMatchedType }
) => {
    return {
        into,
        on: optional?.on ? optional.on : '_id',
        whenMatched: optional?.whenMatched ? optional.whenMatched : 'merge',
        whenNotMatched: optional?.whenNotMatched ? optional.whenNotMatched : 'insert',
        let: optional?.letWhenMatched ? optional.letWhenMatched : { new: "$$ROOT" }
    } as MergeStage;
}
