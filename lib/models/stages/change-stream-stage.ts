export type ChangeStreamStage = {
  /**
   * Optional: Sets whether the change stream should include all changes in the cluster. May only be opened on the
   * admin database.
   */
  allChangesForCluster?: boolean;
  /**
   * Optional: Specifies whether change notifications include a copy of the full document when modified by update
   * operations.
   *
   * default: Change notifications do not include the full document for update operations.
   *
   * required: Change notifications includes a copy of the modified document as it appeared immediately after the
   * change. If the document cannot be found, the change stream throws an error.
   *
   * To use this option, you must first use the collMod command to enable the changeStreamPreAndPostImages option.
   *
   * New in version 6.0.
   *
   * updateLookup: Change notifications includes a copy of the document modified by the change. This document is the
   * current majority-committed document or null if it no longer exists.
   *
   * whenAvailable: Change notification includes a copy of the modified document as it appeared immediately after the
   * change or null if the document is unavailable.
   *
   * To use this option, you must first use the collMod command to enable the changeStreamPreAndPostImages option.
   *
   * New in version 6.0.
   *
   * In the case of partial updates, the change notification also provides a description of the change.
   */
  fullDocument?: 'default' | 'required' | 'updateLookup' | 'whenAvailable';
  /**
   * Include the full document from before the change. This field accepts the following values:
   *
   * off: Disables inclusion of the document from before the change.
   *
   * whenAvailable: Includes document from before the change. The query does not fail if the unmodified document is not
   * available.
   *
   * required: Includes document from before the change. The query fails if the unmodified document is not available.
   */
  fullDocumentBeforeChange?: 'off' | 'whenAvailable' | 'required';
  /**
   * Specifies a resume token as the logical starting point for the change stream. Cannot be used with startAfter or
   * startAtOperationTime fields.
   */
  resumeAfter?: number;
  /**
   * Specifies whether to include additional change events, such as such as DDL and index operations.
   *
   * New in version 6.0.
   */
  showExpandedEvents?: boolean;
  /**
   * Specifies a resume token as the logical starting point for the change stream. Cannot be used with resumeAfter or
   * startAtOperationTime fields.
   */
  startAfter?: any;
  /**
   * Specifies a time as the logical starting point for the change stream. Cannot be used with resumeAfter or
   * startAfter fields.
   */
  startAtOperationTime?: Date | number;
};
