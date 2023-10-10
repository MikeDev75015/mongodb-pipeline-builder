/**
 * Returns expected project stage Only Object
 * @param properties
 * @constructor
 */
export const ProjectOnlyHelper = (...properties: string[]) => {
  return properties.reduce(
    (acc, prop) => {
      if (prop !== '_id') {
        acc[prop] = 1;
      }
      return acc;
    },
    {
      ...(
        properties.includes('_id') ? {} : { _id: 0 }
      ),
    } as { [index: string]: any },
  );
};
