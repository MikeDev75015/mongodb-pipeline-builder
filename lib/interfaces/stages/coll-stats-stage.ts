/**
 * CollStats Stage Interface
 */
export interface CollStatsStage {
    /**
     * Adds latency statistics to the return document.
     *
     * latencyStats.histograms	Adds latency histogram information to the embedded documents in latencyStats if true.
     */
    latencyStats?: { histograms: boolean; };
    /**
     * Adds storage statistics to the return document.
     *
     * Specify an empty document (i.e. storageStats: {}) to use the default scale factor of 1 for the various size data.
     * Scale factor of 1 displays the returned sizes in bytes.
     *
     * Specify the scale factor (i.e. storageStats: { scale: <number> }) to use the specified scale factor for the
     * various size data. For example, to display kilobytes rather than bytes, specify a scale value of 1024.
     *
     * If you specify a non-integer scale factor, MongoDB uses the integer part of the specified factor. For example,
     * if you specify a scale factor of 1023.999, MongoDB uses 1023 as the scale factor.
     *
     * The scale factor does not affect those sizes that specify the unit of measurement in the field name, such as
     * "bytes currently in the cache".
     */
    storageStats?: { scale: number; };
    /**
     * Adds the total number of documents in the collection to the return document.
     *
     * NOTE
     *
     * The count is based on the collection’s metadata, which provides a fast but sometimes inaccurate count for
     * sharded clusters.
     */
    count?: any;
    /**
     * Adds query execution statistics to the return document.
     */
    queryExecStats?: any;
}
