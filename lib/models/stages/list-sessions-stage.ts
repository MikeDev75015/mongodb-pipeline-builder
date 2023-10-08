export type ListSessionsStage =
/**
 * If running with access control, returns all sessions for the current authenticated user.
 *
 * If running without access control, returns all sessions.
 */
  | {}
  /**
   * Returns all sessions for the specified users. If running with access control, the authenticated user must have
   * privileges with listSessions action on the cluster to list sessions for other users.
   */
  | { allUsers: true }
  /**
   * Returns all sessions for all users. If running with access control, the authenticated user must have privileges
   * with listSessions action on the cluster.
   */
  | { users: { user: string; db: string }[] };
