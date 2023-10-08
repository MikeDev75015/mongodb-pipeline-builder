/**
 * Out Stage Interface
 */
export type OutStage = string | {
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
};
