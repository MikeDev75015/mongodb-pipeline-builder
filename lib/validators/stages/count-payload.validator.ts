/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
export const countPayloadValidator = (payload: string) => {
    if (!payload.replace(/ /g, '').length) {
        return 'The value must be a non-empty string.';
    }

    if (payload.charAt(0) === '$') {
        return 'The value must not start with $.';
    }

    if (payload.includes('.')) {
        return 'The value must not contain the . character.'
    }

    return '';
}
