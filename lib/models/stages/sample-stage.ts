/**
 * Sample Stage Interface
 */
export type SampleStage = {
    /**
     * size, positive integer
     *
     * N random documents, depending on the size of the collection, the size of N, and $sample’s position in the
     * pipeline.
     */
    size: number;
};
