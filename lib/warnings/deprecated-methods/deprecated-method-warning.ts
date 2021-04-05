/**
 * DeprecatedMethodWarning
 */
export const deprecatedMethodWarning = (
    oldMethod: string, newMethod: string
) => console.warn(`Warning: The ${oldMethod} method is deprecated and will be removed in the future version, please use ${newMethod} instead.`);
