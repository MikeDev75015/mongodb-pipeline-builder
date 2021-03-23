import {OutStageInterface} from "../../interfaces";

/**
 * Database Payload
 * @param db The output database name.
 * For a replica set or a standalone, if the output database does not exist, $out also creates the database.
 * For a sharded cluster, the specified output database must already exist.
 * @param coll The output collection name.
 * @constructor
 */
export const DbCollPayload = (coll: string, db?: string) => {
    if (db) {
        return {
            db,
            coll
        } as OutStageInterface;
    }

    return coll;
}
