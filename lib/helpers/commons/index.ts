/**
 * Create a list with the elements passed in parameter
 * @param args
 * @constructor
 */
export const List = (...args: any[]) => args;

/**
 * Creates a javascript object with the name and the value passed in parameter
 *
 * With .Match(), returns all documents whose specified field contains the searched value.
 *
 * With .AddFields, adds a new property to returned documents
 * @param fieldName
 * @param fieldValue
 * @constructor
 */
export const Field = (fieldName: string, fieldValue: any) => {
    return { [fieldName]: fieldValue };
};
