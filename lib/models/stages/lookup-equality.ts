/**
 * Lookup Equality Payload Interface
 */
export type LookupEquality = {
  /**
   * Specifies the collection in the same database to perform the join with. The from collection cannot be sharded.
   */
  from: string;
  /**
   * Specifies the field from the documents input to the $lookup stage. $lookup performs an equality match on the
   * localField to the foreignField from the documents of the from collection. If an input document does not contain
   * the localField, the $lookup treats the field as having a value of null for matching purposes.
   */
  localField: string;
  /**
   * Specifies the field from the documents in the from collection. $lookup performs an equality match on the
   * foreignField to the localField from the input documents. If a document in the from collection does not contain
   * the foreignField, the $lookup treats the value as null for matching purposes.
   */
  foreignField: string;
  /**
   * Specifies the name of the new array field to add to the input documents. The new array field contains the
   * matching documents from the from collection. If the specified name already exists in the input document, the
   * existing field is overwritten.
   */
  as: string
};
