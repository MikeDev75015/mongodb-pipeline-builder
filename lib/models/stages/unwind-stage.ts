/**
 * Unwind Stage Interface
 */
export type UnwindStage = string | {
  /**
   * Field path to an array field. To specify a field path, prefix the field name with a dollar sign $ and enclose in
   * quotes.
   */
  path: string;
  /**
   * Optional. The name of a new field to hold the array index of the element. The name cannot start with a dollar
   * sign $.
   */
  includeArrayIndex?: string;
  /**
   * Optional.
   *
   * If true, if the path is null, missing, or an empty array, $unwind outputs the document.
   *
   * If false, if path is null, missing, or an empty array, $unwind does not output a document.
   *
   * The default value is false.
   */
  preserveNullAndEmptyArrays?: boolean;
};
