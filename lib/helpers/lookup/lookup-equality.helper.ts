import { LookupStage } from '../../models';

/**
 * Equality Match
 * To perform an equality match between a field from the input documents with a field from the documents of the “joined”
 * collection
 *
 * @param from Specifies the collection in the same database to perform the join with.
 *
 * from is optional, you can use a $documents stage in a $lookup stage instead. For an example, see Use a $documents
 * Stage in a $lookup Stage.
 *
 * Starting in MongoDB 5.1, the collection specified in the from parameter can be sharded.
 * @param as Specifies the name of the new array field to add to the input documents. The new array field contains the
 * matching documents from the from collection. If the specified name already exists in the input document, the
 * existing field is overwritten.
 * @param localField Specifies the field from the documents input to the $lookup stage. $lookup performs an equality
 * match on the localField to the foreignField from the documents of the from collection. If an input document does not
 * contain the localField, the $lookup treats the field as having a value of null for matching purposes.
 * @param foreignField Specifies the field from the documents in the from collection. $lookup performs an equality
 * match on the foreignField to the localField from the input documents. If a document in the from collection does not
 * contain the foreignField, the $lookup treats the value as null for matching purposes.
 */
export const LookupEqualityHelper = (from: string, as: string, localField: string, foreignField: string) => (
  {
    from,
    localField,
    foreignField,
    as,
  } as LookupStage
);
