/**
 * DeprecatedMethodWarning
 */
export const deprecatedMethodWarning = (
    oldMethod: string, newMethod: string
) => console.warn(`Warning: The ${oldMethod} method is deprecated, please use ${newMethod} instead.`);
