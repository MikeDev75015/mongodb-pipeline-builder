/**
 * Sets a default value if the provided value is not provided.
 *
 * @param defaultValue - The default value to be set.
 * @param value - The value to check.
 * @returns the value if provided, otherwise returns the default value.
 */
export function setDefaultValueIfNotProvided<T>(defaultValue: T, value?: T) {
    return value ?? defaultValue;
}

/**
 * Checks if the provided object is empty.
 *
 * @param {object} obj - The object to check.
 */
export function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0;
}

/**
 * Checks if the provided object is not empty.
 *
 * @param {object} obj - The object to check.
 */
export function isNotEmptyObject(obj: object) {
    return Object.keys(obj).length > 0;
}

