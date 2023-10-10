/**
 * ReplaceRoot Stage Interface
 */
export type ReplaceRootStage = {
  /**
   * newRoot, replacementDocument
   *
   * The replacement document can be any valid expression that resolves to a document. The stage errors and fails if
   * <replacementDocument> is not a document.
   */
  newRoot: any;
};
