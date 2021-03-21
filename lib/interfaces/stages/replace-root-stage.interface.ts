/**
 * ReplaceRoot Stage Interface
 */
export interface ReplaceRootStageInterface {
    /**
     * newRoot, replacementDocument
     *
     * The replacement document can be any valid expression that resolves to a document. The stage errors and fails if
     * <replacementDocument> is not a document.
     */
    newRoot: any;
}
