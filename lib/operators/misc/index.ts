// Literal Expression Operator

export const Literal = (value: any) => ({ $literal: value });

// Miscellaneous Operators

export const Rand = () => ({ $rand: {} });
export const SampleRate = (nonNegativeFloat: any) => ({ $sampleRate: nonNegativeFloat });

// Object Expression Operators

export const MergeObjects = (...documents: any) => ({ $mergeObjects: documents });

// Text Expression Operator

export const Meta = (metaDataKeyword: any) => ({ $meta: metaDataKeyword });

// Variable Expression Operators

export const Let = (vars: any, expression: any) => ({
    $let: { vars: vars, in: expression }
});
