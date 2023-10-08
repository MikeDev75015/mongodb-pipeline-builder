import { SortStage } from './sort-stage';

export type FillStage = {
  /**
   * Specifies an expression to group the documents. In the
   * $fill
   *  stage, a group of documents is known as a partition.
   *
   * If you omit
   * partitionBy
   *  and
   * partitionByFields
   * ,
   * $fill
   *  uses one partition for the entire collection.
   */
  partitionBy?: any;
  /**
   * Specifies an array of fields as the compound key to group the documents. In the
   * $fill
   *  stage, each group of documents is known as a partition.
   *
   * If you omit
   * partitionBy
   *  and
   * partitionByFields
   * ,
   * $fill
   *  uses one partition for the entire collection.
   */
  partitionByFields?: string[];
  /**
   * Required if
   * method
   *  is specified in at least one
   * output.<field>.
   *
   * Specifies the field or fields to sort the documents within each partition. Uses the same syntax as the $sort stage.
   */
  sortBy?: SortStage;
  /**
   * Specifies an object indicating how to fill missing values in the target field.
   *
   * The object name must be either value or method. If the name is:
   *
   * value, the value must be an expression indicating the value used to fill the target field.
   *
   * method, the value must be either linear or locf. If you specify:
   *
   * linear fill method, values are filled using linear interpolation based on the surrounding non-null values in the
   * sequence.
   *
   * locf fill method, values are filled based on the last non-null value for the field in the partition. locf stands
   * for last observation carried forward.
   */
  output: {
    [key: string]: { value: any } | { method: 'linear' | 'locf' };
  };
};
