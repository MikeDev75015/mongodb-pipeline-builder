// Accumulators ($group)
// Available for use in the $group stage, accumulators are operators that maintain their state (e.g. totals, maximums,
// minimums, and related data) as documents progress through the pipeline.
// When used as accumulators in the $group stage, these operators take as input a single expression, evaluating the
// expression once for each input document, and maintain their stage for the group of documents that share the same
// group key.

export const AddToSet = (expression: any) => ({ $addToSet: expression });
export const Avg = (expression: any) => ({ $avg: expression });
export const Max = (expression: any) => ({ $max: expression });
export const Min = (expression: any) => ({ $min: expression });
export const Push = (expression: any) => ({ $push: expression });
export const StdDevPop = (expression: any) => ({ $stdDevPop: expression });
export const StdDevSamp = (expression: any) => ({ $stdDevSamp: expression });
export const Sum = (expression: any) => ({ $sum: expression });
