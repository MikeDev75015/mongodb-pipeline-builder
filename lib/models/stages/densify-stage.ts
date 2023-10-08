type DensifyRange = {
  /**
   * The amount to increment the
   * field
   *  value in each document.
   * $densify
   *  creates a new document for each step between the existing documents.
   *
   * If
   * range.unit
   *  is specified, step must be an integer. Otherwise, step can be any numeric value.
   */
  step: number;
  /**
   * Required if field is a date.
   *
   * The unit to apply to the
   * step
   *  field when incrementing date values in
   * field.
   *
   * You can specify one of the following values for unit as a string:
   *
   * millisecond
   *
   * second
   *
   * minute
   *
   * hour
   *
   * day
   *
   * week
   *
   * month
   *
   * quarter
   *
   * year
   */
  unit?: any;
  /**
   * If bounds is an array:
   *
   * $densify
   *  adds documents spanning the range of values within the specified bounds.
   *
   * The data type for the bounds must correspond to the data type in the
   * field
   *  being densified.
   *
   * For behavior details, see
   * range.bounds Behavior.
   *
   * If bounds is "full":
   *
   * $densify
   *  adds documents spanning the full range of values of the field being densified.
   *
   * If bounds is "partition":
   *
   * $densify
   *  adds documents to each partition, similar to if you had run a full range densification on each partition
   * individually.
   */
  bounds: 'full' | 'partition' | ('lower bound' | 'upper bound')[];
};

export type DensifyStage = {
  /**
   * The field to densify. The values of the specified field must either be all numeric values or all dates.
   *
   * Documents that do not contain the specified field continue through the pipeline unmodified.
   *
   * To specify a <field> in an embedded document or in an array, use dot notation.
   */
  field: string;
  /**
   * The set of fields to act as the compound key to group the documents. In the
   * $densify
   *  stage, each group of documents is known as a partition.
   *
   * If you omit this field,
   * $densify
   *  uses one partition for the entire collection.
   */
  partitionByFields?: string[];
  /**
   * An object that specifies how the data is densified.
   */
  range: DensifyRange
};
