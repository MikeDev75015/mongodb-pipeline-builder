/**
 * custom-env lib to load the .env expected file
 */
require ('custom-env').env(true);

/**
 * Export environment variables
 */
export const { APP_ENV, LOGS_ENABLED,  BDD_USER, BDD_PASS, BDD_CLUSTER, BDD_BASE } = process.env;

if (
    LOGS_ENABLED === 'true'
) {
    console.log(
        'APP_ENV:', APP_ENV,
        '\nLOGS_ENABLED:', LOGS_ENABLED === 'true',
        '\n\nMongoDB Database Config:' +
        '\nBDD_USER:', BDD_USER,
        '\nBDD_PASS:', BDD_PASS,
        '\nBDD_CLUSTER:', BDD_CLUSTER,
        '\nBDD_BASE:', BDD_BASE
    );
}
