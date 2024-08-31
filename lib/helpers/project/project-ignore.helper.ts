/**
 * Returns expected project stage Ignore Object
 * @param properties
 * @constructor
 */
export const ProjectIgnoreHelper = (...properties: string[]) => {
  return properties.reduce(
    (acc, prop) => {
      acc[prop] = 0;
      return acc;
    },
    {} as { [index: string]: any },
  );
};
