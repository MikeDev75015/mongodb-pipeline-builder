import { NumericExpression } from '../core/expression';

type TimeSeries = {
  /**
   * The name of the field which contains the date in each time series document. Documents in a time series collection
   * must have a valid BSON date as the value for the timeField.
   */
  timeField: string;
  /**
   * The name of the field which contains metadata in each time series document. The metadata in the specified field
   * should be data that is used to label a unique series of documents. The metadata should rarely, if ever, change The
   * name of the specified field may not be _id or the same as the timeseries.timeField. The field can be of any data
   * type.
   *
   * Although the metaField field is optional, using metadata can improve query optimization. For example, MongoDB
   * automatically creates a compound index on the metaField and timeField fields for new collections. If you do not
   * provide a value for this field, the data is bucketed solely based on time.
   */
  metaField?: string;
  /**
   * Do not use if setting bucketRoundingSeconds and bucketMaxSpanSeconds.
   *
   * Possible values are seconds (default), minutes, and hours.
   *
   * Set granularity to the value that most closely matches the time between consecutive incoming timestamps. This
   * improves performance by optimizing how MongoDB stores data in the collection.
   *
   * For more information on granularity and bucket intervals, see Set Granularity for Time Series Data.
   */
  granularity?: 'seconds' | 'minutes' | 'hours';
  /**
   * Use with bucketRoundingSeconds as an alternative to granularity. Sets the maximum time between timestamps in the
   * same bucket.
   *
   * Possible values are 1-31536000.
   *
   * New in version 6.3.
   */
  bucketMaxSpanSeconds?: NumericExpression;
  /**
   * Use with bucketMaxSpanSeconds as an alternative to granularity. Must be equal to bucketMaxSpanSeconds.
   *
   * When a document requires a new bucket, MongoDB rounds down the document's timestamp value by this interval to set
   * the minimum time for the bucket.
   *
   * New in version 6.3.
   */
  bucketRoundingSeconds?: NumericExpression;
  /**
   * Enable the automatic deletion of documents in a time series collection by specifying the number of seconds after
   * which documents expire. MongoDB deletes expired documents automatically. See Set up Automatic Removal for Time
   * Series Collections (TTL) for more information.
   */
  expireAfterSeconds?: NumericExpression;
};

type OutStageObject = {
  /**
   * The output database name.
   *
   * For a replica set or a standalone, if the output database does not exist, $out also creates the database.
   *
   * For a sharded cluster, the specified output database must already exist.
   */
  db: string;
  /**
   * The output collection name.
   */
  coll: string;
  /**
   * A document that specifies the configuration to use when writing to a time series collection. The timeField is
   * required. All other fields are optional.
   */
  timeseries?: TimeSeries;
} & Partial<Omit<TimeSeries, 'expireAfterSeconds'>>;

export type OutStageObjectOptional = Partial<Omit<OutStageObject, 'coll'>>;

/**
 * Out Stage Interface
 */
export type OutStage = string | OutStageObject;
