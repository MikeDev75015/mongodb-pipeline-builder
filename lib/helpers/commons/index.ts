/**
 * Create a list with the elements passed in parameter
 * @param args
 * @constructor
 */
export const List = (...args: any[]) => args;
/**
 * Creates a javascript object with the name and the value passed in parameter
 * @param name
 * @param value
 * @constructor
 */
export const Property = (name: string, value: any) => ({ [name]: value });
