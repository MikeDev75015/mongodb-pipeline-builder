/**
 * custom-env lib to load the .env expected file
 */
require ('custom-env').env(true);

/**
 * Export environment variables
 */
export const { APP_ENV, APP_TIMEZONE, LOGS_ENABLED,  BDD_USER, BDD_PASS, BDD_CLUSTER, BDD_BASE } = process.env;
