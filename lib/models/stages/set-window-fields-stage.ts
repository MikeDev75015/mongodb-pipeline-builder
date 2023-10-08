import { SortStage } from './sort-stage';

type WindowOperators = {
  // Accumulator operators
  $addToSet?: any;
  $avg?: any;
  $bottom?: any;
  $bottomN?: any;
  $count?: any;
  $covariancePop?: any;
  $covarianceSamp?: any;
  $derivative?: any;
  $expMovingAvg?: any;
  $firstN?: any;
  $integral?: any;
  $lastN?: any;
  $max?: any;
  $maxN?: any;
  $median?: any;
  $min?: any;
  $minN?: any;
  $percentile?: any;
  $push?: any;
  $stdDevSamp?: any;
  $stdDevPop?: any;
  $sum?: any;
  $top?: any;
  $topN?: any;
  // Gap filling operators
  $linearFill?: any;
  $locf?: any;
  // Order operators
  $first?: any;
  $last?: any;
  $shift?: any;
  // Rank operators
  $denseRank?: any;
  $documentNumber?: any;
  $rank?: any;
};

type TimeRangeWindowBoundariesUnit = 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export type SetWindowFieldsStage = {
  /**
   * Specifies an expression to group the documents. In the $setWindowFields stage, the group of documents is known as
   * a partition. Default is one partition for the entire collection.
   */
  partitionBy?: any;
  /**
   * Required for some operators
   *
   * Specifies the field(s) to sort the documents by in the partition. Uses the same syntax as the $sort stage. Default
   * is no sorting.
   */
  sortBy?: SortStage;
  /**
   * Specifies the field(s) to append to the documents in the output returned by the $setWindowFields stage. Each field
   * is set to the result returned by the window operator.
   *
   * A field can contain dots to specify embedded document fields and array fields. The semantics for the embedded
   * document dotted notation in the $setWindowFields stage are the same as the $addFields and $set stages. See
   * embedded document $addFields example and embedded document $set example.
   *
   * The window operator is the window operator name to use in the $setWindowFields stage.
   *
   * The window operator parameters are the parameters to pass to the window operator.
   */
  output: {
    [key: string]: {
      /**
       * Specifies the window boundaries and parameters. Window boundaries are inclusive. Default is an unbounded
       * window, which includes all documents in the partition.
       *
       * Specify either a documents or range window.
       */
      window?: {
        /**
         * A window where the lower and upper boundaries are specified relative to the position of the current document
         * read from the collection.
         *
         * The window boundaries are specified using a two element array containing a lower and upper limit string or
         * integer. Use:
         *
         * The "current" string for the current document position in the output.
         *
         * The "unbounded" string for the first or last document position in the partition.
         *
         * An integer for a position relative to the current document. Use a negative integer for a position before the
         * current document. Use a positive integer for a position after the current document. 0 is the current
         * document position.
         */
        documents?: [('unbounded' | 'current' | number), ('unbounded' | 'current' | number)];
        /**
         * A window where the lower and upper boundaries are defined using a range of values based on the sortBy field
         * in the current document.
         *
         * The window boundaries are specified using a two element array containing a lower and upper limit string or
         * number. Use:
         *
         * The "current" string for the current document position in the output.
         *
         * The "unbounded" string for the first or last document position in the partition.
         *
         * A number to add to the value of the sortBy field for the current document. A document is in the window if
         * the sortBy field value is inclusively within the lower and upper boundaries.
         */
        range?: [('unbounded' | 'current' | number), ('unbounded' | 'current' | number)];
        /**
         * Specifies the units for time range window boundaries.
         */
        unit?: TimeRangeWindowBoundariesUnit;
      };
    } & WindowOperators;
  };
};
