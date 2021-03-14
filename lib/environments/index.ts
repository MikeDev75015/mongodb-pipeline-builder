require ('custom-env').env(true);

/**
 * Environment Variables Exports
 */
export const { APP_ENV, LOGS_ENABLED,  BDD_USER, BDD_PASS, BDD_CLUSTER, BDD_BASE } = process.env;

console.log(
    'APP_ENV:', APP_ENV,
    '\nLOGS_ENABLED:', LOGS_ENABLED === 'true'
);

if (
    BDD_USER &&
    BDD_PASS &&
    BDD_CLUSTER &&
    BDD_BASE
) {
    console.log(
        'BDD_USER:', BDD_USER,
        '\nBDD_PASS:', BDD_PASS,
        '\nBDD_CLUSTER:', BDD_CLUSTER,
        '\nBDD_BASE:', BDD_BASE
    );
}
