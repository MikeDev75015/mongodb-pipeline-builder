import { CurrentOpStage } from '../../models';

/**
 * Returns a stream of documents containing information on active and/or dormant operations as well as inactive sessions
 * that are holding locks as part of a transaction. The stage returns a document for each operation or session. To run
 * $currentOp, use the db.aggregate() helper on the admin database.
 * The $currentOp aggregation stage is preferred over the currentOp command and its mongo shell helper db.currentOp().
 * Because currentOp command and db.currentOp() helper returns the results in a single document, the total size of the
 * currentOp result set is subject to the maximum 16MB BSON size limit for documents. The $currentOp stage returns a
 * cursor over a stream of documents, each of which reports a single operation. Each operation document is subject to
 * the 16MB BSON limit, but unlike the currentOp command, there is no limit on the overall size of the result set.
 *
 * $currentOp also enables you to perform arbitrary transformations of the results as the documents pass through the
 * pipeline.
 * @constructor
 * @param optional Optionals. If you do not specify any parameters, CurrentOp will use the default values.
 * All default to false, except idleSessions, which defaults to true.
 */
export const CurrentOpHelper = (optional: CurrentOpStage = {}) => optional;
