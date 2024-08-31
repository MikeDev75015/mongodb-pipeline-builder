/**
 * Creates a javascript object with the name and the value passed in parameter
 *
 * With .Match(), returns all documents whose specified field contains the searched value.
 *
 * With .AddFields, adds a new property to returned documents
 * @param name
 * @param value
 * @constructor
 */
export const Field = (name: string, value: any) => (
  { [name]: value }
);
