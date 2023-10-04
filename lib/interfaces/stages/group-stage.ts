/**
 * Group Stage Interface
 */
export interface GroupStage {
    /**
     * Required. If you specify an _id value of null, or any other constant value, the $group stage calculates
     * accumulated values for all the input documents as a whole.
     */
    _id: any;
    /**
     * field Optional. Computed using the accumulator operators.
     */
    [key: string]: any;
}
