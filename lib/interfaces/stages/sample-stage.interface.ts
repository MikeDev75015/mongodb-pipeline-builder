/**
 * Sample Stage Interface
 */
export interface SampleStageInterface {
    /**
     * size, positive integer
     *
     * N random documents, depending on the size of the collection, the size of N, and $sample’s position in the
     * pipeline.
     */
    size: number;
}
