/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const sortPayloadValidator = (payload: { [key: string]: any }) => {
    if (Array.isArray(payload)) {
        return 'The payload is not valid.';
    }

    const keyList = Object.keys(payload);
    if (!keyList.length) {
        return 'No fields have been added.';
    }

    const valueErrorList = Object.keys(payload).filter((v) => payload[v] === undefined);
    if (valueErrorList.length) {
        return 'One or more field values are not defined.'
    }

    const unexpectedValues = Object.values(payload).filter((v) => !((typeof v === 'number' && (v === 1 || v === -1)) || (typeof v === 'object' && v.$meta)));
    if (unexpectedValues.length) {
        return `One or more values are not valid. ${unexpectedValues.join(', ')}...`
    }

    return 'VALID';
}
