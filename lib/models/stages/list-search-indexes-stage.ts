/**
 * You cannot specify both id and name. If you omit both the id and name fields, $listSearchIndexes returns information
 * about all Atlas Search indexes on the collection.
 */
export type ListSearchIndexesStage = {
  /**
   * The id of the index to return information about.
   */
  id?: string;
  /**
   * The name of the index to return information about.
   */
  name?: string;
};
