import {CurrentOpInterface} from "../../interfaces";

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
 * @param parameters Optional. If you do not specify any parameters, CurrentOp will use the default values.
 * All default to false, except idleSessions, which defaults to true.
 */
export const OpPayload = (parameters?: {
    allUsers?: boolean;
    idleConnections?: boolean;
    idleCursors?: boolean;
    idleSessions?: boolean;
    localOps?: boolean;
    backtrace?: boolean;
}) => ({
    allUsers: parameters && parameters.allUsers !== undefined
        ? parameters.allUsers
        : false,
    idleConnections: parameters && parameters.idleConnections !== undefined
        ? parameters.idleConnections
        : false,
    idleCursors: parameters && parameters.idleCursors !== undefined
        ? parameters.idleCursors
        : false,
    idleSessions: parameters && parameters.idleSessions !== undefined
        ? parameters.idleSessions
        : true,
    localOps: parameters && parameters.localOps !== undefined
        ? parameters.localOps
        : false,
    backtrace: parameters && parameters.backtrace !== undefined
        ? parameters.backtrace
        : false
}) as CurrentOpInterface;
