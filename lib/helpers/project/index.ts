/**
 * Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be
 * existing fields from the input documents or newly computed fields.
 *
 * @param value Include OR Exclude Existing Fields
 * documents, you must explicitly specify the suppression of the _id field in $project by passing false.
 * @constructor
 */
export const Project = (value: { [index: string]: any }) => ({
    $project: value
});

/**
 * Returns expected project stage Only Object
 * @param properties
 * @constructor
 */
export const Only = (...properties: string[]) => {
    const projectOnlyObject: {[index: string]: any} = properties.includes('_id') ? {} : { _id: 0 };
    properties.forEach(prop => prop !== '_id' ? projectOnlyObject[prop] = 1 : null);
    return projectOnlyObject;
}

/**
 * Returns expected project stage Ignore Object
 * @param properties
 * @constructor
 */
export const Ignore = (...properties: string[]) => {
    const projectIgnoreObject: {[index: string]: any} = {};
    properties.forEach(prop => projectIgnoreObject[prop] = 0);
    return projectIgnoreObject;
}
