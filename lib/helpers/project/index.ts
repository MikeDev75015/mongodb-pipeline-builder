import {DeprecatedMethodWarning} from "../../warnings";

/**
 * Returns expected project stage Only Object
 * @param properties
 * @constructor
 */
export const OnlyPayload = (...properties: string[]) => {
    const projectOnlyObject: {[index: string]: any} = properties.includes('_id') ? {} : { _id: 0 };
    properties.forEach(prop => {
        if (prop !== '_id') {
            projectOnlyObject[prop] = 1;
        }
    });
    return projectOnlyObject;
}

/**
 * Returns expected project stage Ignore Object
 * @param properties
 * @constructor
 */
export const IgnorePayload = (...properties: string[]) => {
    const projectIgnoreObject: {[index: string]: any} = {};
    properties.forEach(prop => projectIgnoreObject[prop] = 0);
    return projectIgnoreObject;
}

/**
 * @deprecated Use the new {@link OnlyPayload} helper instead
 */
export const Only = (...properties: string[]) => {
    new DeprecatedMethodWarning('Only', 'OnlyPayload');
    return OnlyPayload(...properties);
}

/**
 * @deprecated Use the new {@link IgnorePayload} helper instead
 */
export const Ignore = (...properties: string[]) => {
    new DeprecatedMethodWarning('Ignore', 'IgnorePayload');
    return IgnorePayload(...properties);
}
