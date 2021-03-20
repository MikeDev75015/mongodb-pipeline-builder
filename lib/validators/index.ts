
/**
 * Check the mandatory properties of the lookup payload
 * @param payload
 * @constructor
 */
export const lookupPayloadValidator = (payload: any) => {
    if (!payload.from && !payload.as) {
        return 'The from and as properties are required';
    } else if (!payload.from) {
        return 'The from property is required';
    } else if (!payload.as) {
        return 'The as property is required';
    } else {
        return '';
    }
}
