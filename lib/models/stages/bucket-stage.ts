/**
 * Bucket Stage Interface
 */
export type BucketStage = {
    /**
     * An expression to group documents by. To specify a field path, prefix the field name with a dollar sign $ and
     * enclose it in quotes.
     *
     * Unless $bucket includes a default specification, each input document must resolve the groupBy field path or
     * expression to a value that falls within one of the ranges specified by the boundaries.
     */
    groupBy: any;
    /**
     * An array of values based on the groupBy expression that specify the boundaries for each bucket. Each adjacent
     * pair of values acts as the inclusive lower boundary and the exclusive upper boundary for the bucket. You must
     * specify at least two boundaries.
     *
     * The specified values must be in ascending order and all of the same type. The exception is if the values are of
     * mixed numeric types, such as:
     *
     * [ 10, NumberLong(20), NumberInt(30) ]
     */
    boundaries: any[];
    /**
     * Optional. A literal that specifies the _id of an additional bucket that contains all documents whose groupBy
     * expression result does not fall into a bucket specified by boundaries.
     *
     * If unspecified, each input document must resolve the groupBy expression to a value within one of the bucket
     * ranges specified by boundaries or the operation throws an error.
     *
     * The default value must be less than the lowest boundaries value, or greater than or equal to the highest
     * boundaries value.
     *
     * The default value can be of a different type than the entries in boundaries.
     */
    default?: string | number;
    /**
     * Optional. A document that specifies the fields to include in the output documents in addition to the _id field.
     * To specify the field to include, you must use accumulator expressions.
     *
     * <outputfield1>: { <accumulator>: <expression1> },
     *
     * ...
     *
     * <outputfieldN>: { <accumulator>: <expressionN> }
     *
     * If you do not specify an output document, the operation returns a count field containing the number of documents
     * in each bucket.
     *
     * If you specify an output document, only the fields specified in the document are returned; i.e. the count field
     * is not returned unless it is explicitly included in the output document.
     */
    output?: {
        [key: string]: { [key: string]: any };
    };
};
