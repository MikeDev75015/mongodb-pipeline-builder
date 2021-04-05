/**
 * test Min Length
 * @param newVal
 * @param minLength
 * @param errorList
 */
export function testMinLength(newVal: string, minLength: number, errorList: string[]) {
    if (newVal.replace(/_\d+$/g, '').length < minLength) {
        errorList.push(`${errorList.length + 1}. The pipeline name must have at least ${minLength} character(s).`);
    }
}

/**
 * test Max Length
 * @param newVal
 * @param maxLength
 * @param errorList
 */
export function testMaxLength(newVal: string, maxLength: number, errorList: string[]) {
    if (newVal.replace(/_\d+$/g, '').length > maxLength) {
        errorList.push(`${errorList.length + 1}. The pipeline name must have a maximum of ${maxLength} character(s).`);
    }
}

/**
 * test No Space
 * @param newVal
 * @param errorList
 */
export function testNoSpace(newVal: string, errorList: string[]) {
    if (newVal.match(/ /g)) {
        errorList.push(`${errorList.length + 1}. The pipeline name cannot contain spaces.`);
    }
}

/**
 * test No Special Char
 * @param newVal
 * @param errorList
 */
export function testNoSpecialChar(newVal: string, errorList: string[]) {
    if (!newVal.match(/^[\w\- ]+$/g)) {
        errorList.push(`${errorList.length + 1}. The pipeline name cannot contain any special character(s) except "-" or "_".`);
    }
}
