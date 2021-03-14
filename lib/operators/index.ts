/**
 * pipelineOperators
 */
const pipelineOperators = {
    /**
     * And description
     */
    And: (...andList: any[]) => ({ $and: andList }),
    /**
     * ArrayElemAt description
     */
    ArrayElemAt: (arrayName: string, position: number) => ({ $arrayElemAt: [arrayName, position] }),
    /**
     * Concat description
     */
    Concat: (...arrayList: any[]) => ({ $concat: [ ...arrayList ] }),
    /**
     * Equal description
     */
    Equal: (a: any, b: any) => ({ $eq: [a, b] }),
    /**
     * Expr description
     */
    Expr: (expression: any) => ({ $expr: expression }),
    /**
     * Field description
     */
    Field: (fieldName: string, soughtValue: any) => {
        const newObject = {};
        newObject[fieldName] = soughtValue;
        return newObject;
    },
    /**
     * In description
     */
    In: (valueToFind: any, arrayToSearch: any) => ({ $in: [valueToFind, arrayToSearch] }),
    /**
     * NotEqual description
     */
    NotEqual: (a: any, b: any) => ({ $ne: [a, b] }),
    /**
     * Or description
     */
    Or: (...orList: any[]) => ({ $or: orList }),
    /**
     * Reduce description
     */
    Reduce: (input: any, initialValue: any, arrayMode = false) => ({
        $reduce: { input: input, initialValue: initialValue, in: arrayMode
                ? { $concatArrays : ["$$value", "$$this"] }
                : { $concat : ["$$value", "$$this"] } }
    }),
    /**
     * RegexMatch description
     */
    RegexMatch: (input: string, regex: RegExp) => ({ $regexMatch: { input: input, regex: regex } })
};

/**
 * Export
 */
export const
    And = pipelineOperators.And,
    ArrayElemAt = pipelineOperators.ArrayElemAt,
    Concat = pipelineOperators.Concat,
    Equal = pipelineOperators.Equal,
    Expr = pipelineOperators.Expr,
    Field = pipelineOperators.Field,
    In = pipelineOperators.In,
    NotEqual = pipelineOperators.NotEqual,
    Or = pipelineOperators.Or,
    Reduce = pipelineOperators.Reduce,
    RegexMatch = pipelineOperators.RegexMatch;
