import {PipelineError} from "../errors";
/**
 * IsValidName property decorator
 * @param options
 * @constructor
 */
export function IsValidName(options?: {
    minLength?: number,
    maxLength?: number,
    noSpace?: boolean,
    noSpecialChar?: boolean
}) {
    console.log('add IsValidName decorator - options:\n', options);
    return function (target: Object | any, propertyKey: string) {
        let value: string;
        const getter = function() {
            return value;
        };
        const setter = function(newVal: string) {
            try {
                const errorList: string[] = [];
                const isEmptyString = !newVal.replace(/ /g, '').length;

                if (isEmptyString) {
                    errorList.push(`${errorList.length + 1}. The pipeline name cannot be an empty string.`);
                }

                if (!isEmptyString && options) {
                    Object.keys(options).forEach(key => {
                        switch (key) {
                            case 'minLength':
                                testMinLength(newVal, options.minLength as number, errorList);
                                break;
                            case 'maxLength':
                                testMaxLength(newVal, options.maxLength as number, errorList);
                                break;
                            case 'noSpace':
                                testNoSpace(newVal, errorList);
                                break;
                            case 'noSpecialChar':
                                testNoSpecialChar(newVal, errorList);
                                break;
                            default: errorList.push(`${errorList.length + 1}. Unknown option ${key} key.`);
                        }
                    });
                }

                if (errorList.length) {
                    throw new PipelineError(errorList.join('\n'));
                } else {
                    value = newVal.trim();
                }
            } catch (e) {
                console.error(e.message);
            }
        };

        const descriptor = {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        }

        return Object.defineProperty(target, propertyKey, descriptor);
    }
}

/**
 * test Min Length
 * @param newVal
 * @param minLength
 * @param errorList
 */
function testMinLength(newVal: string, minLength: number, errorList: string[]) {
    if (newVal.length < minLength) {
        errorList.push(`${errorList.length + 1}. The pipeline name must have at least ${minLength} character(s).`);
    }
}

/**
 * test Max Length
 * @param newVal
 * @param maxLength
 * @param errorList
 */
function testMaxLength(newVal: string, maxLength: number, errorList: string[]) {
    if (newVal.length > maxLength) {
        errorList.push(`${errorList.length + 1}. The pipeline name must have a maximum of ${maxLength} character (s).`);
    }
}

/**
 * test No Space
 * @param newVal
 * @param errorList
 */
function testNoSpace(newVal: string, errorList: string[]) {
    if (newVal.match(/ /g)) {
        errorList.push(`${errorList.length + 1}. The pipeline name cannot contain spaces.`);
    }
}

/**
 * test No Special Char
 * @param newVal
 * @param errorList
 */
function testNoSpecialChar(newVal: string, errorList: string[]) {
    if (!newVal.match(/^[\w\- ]+$/g)) {
        errorList.push(`${errorList.length + 1}. The pipeline name cannot contain any special character(s) except "-" or "_".`);
    }
}


