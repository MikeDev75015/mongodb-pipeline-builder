/**
 * Checks that the payload contains fields and that the value of each field is valid
 * @param payload The value passed to the AddFields stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const addFieldsPayloadValidator = (payload: { [key: string]: any }) => {
    if (Array.isArray(payload)) {
        return 'The payload is not valid.';
    }

    const keyList = Object.keys(payload);
    if (!keyList.length) {
        return 'No fields have been added.';
    }

    const valueErrorList = Object.keys(payload).filter(v => payload[v] === undefined);
    if (valueErrorList.length) {
        return 'One or more field values are not defined.'
    }

    return 'VALID';
}
