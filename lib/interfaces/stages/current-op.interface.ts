/**
 * CurrentOp Interface
 */
export interface CurrentOpInterface {
    /**
     * If set to false, $currentOp will only report on operations/idle connections/idle cursors/idle sessions belonging
     * to the user who ran the command.
     *
     * If set to true, $currentOp will report operations belonging to all users.
     *
     * NOTE
     *
     * For standalone and replica sets that enforce access control, inprog privilege is required if allUsers: true.
     *
     * For sharded clusters that enforce access control, the inprog privilege is required to run $currentOp.
     *
     * Defaults to false.
     */
    allUsers: boolean;
    /**
     * If set to false, $currentOp will only report active operations. If set to true, all operations including idle
     * connections will be returned.
     *
     * Defaults to false.
     */
    idleConnections: boolean;
    /**
     * If set to true, $currentOp will report on cursors that are “idle”; i.e. open but not currently active in a
     * getMore operation.
     *
     * Information on idle cursors have the type set to "idleCursor".
     *
     * Information on cursors currently active in a getMore operation information have the type set to "op" and op set
     * to getmore.
     *
     * Defaults to false.
     */
    idleCursors: boolean;
    /**
     * If set to true, in addition to active/dormant operations, $currentOp will report on:
     *
     * Inactive sessions that are holding locks as part of a transaction. Each inactive session will appear as a
     * separate document in the $currentOp stream.
     *
     * The document for a session includes information on the session id in the lsid field and the transaction in the
     * transaction field.
     *
     * Starting in MongoDB 4.2, information on idle sessions have the type set to "idleSession".
     *
     * $currentOp.twoPhaseCommitCoordinator in inactive state
     *
     * If set to false, $currentOp will not report on:
     *
     * Inactive sessions
     *
     * $currentOp.twoPhaseCommitCoordinator information in inactive state
     *
     * Defaults to true.
     */
    idleSessions: boolean;
    /**
     * If set to true for an aggregation running on mongos, $currentOp reports only those operations running locally on
     * that mongos.
     *
     * If false, then the $currentOp will instead report operations running on the shards.
     *
     * The localOps parameter has no effect for $currentOp aggregations running on mongod.
     *
     * Defaults to false.
     */
    localOps: boolean;
    /**
     * Determines whether callstack information is returned as part of the waitingForLatch output field.
     *
     * If set to true, $currentOp includes waitingForLatch.backtrace field that contains the callstack information, if
     * available. If unavailable, the field contains an empty array.
     *
     * If set to false, $currentOp omits the waitingForLatch.backtrace field.
     *
     * Defaults to false.
     */
    backtrace: boolean;
}
