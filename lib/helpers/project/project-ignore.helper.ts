/**
 * Returns expected project stage Ignore Object
 * @param properties
 * @constructor
 */
export const ProjectIgnoreHelper = (...properties: string[]) => {
    const projectIgnoreObject: {[index: string]: any} = {};
    properties.forEach(prop => projectIgnoreObject[prop] = 0);
    return projectIgnoreObject;
}
