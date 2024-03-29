import {OutStage} from "../../models";

/**
 * Database Payload
 * @param db The output database name.
 * For a replica set or a standalone, if the output database does not exist, $out also creates the database.
 * For a sharded cluster, the specified output database must already exist.
 * @param coll The output collection name.
 * @constructor
 */
export const OutDbCollHelper = (coll: string, db?: string) => {
    if (db) {
        return {
            db,
            coll
        } as OutStage;
    }

    return coll;
}
