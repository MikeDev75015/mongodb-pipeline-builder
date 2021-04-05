import {deprecatedMethodWarning} from "../../warnings";
import {IgnorePayload} from "./ignore-payload";
/**
 * Deprecated - Use the new {@link IgnorePayload} helper instead
 */
export const Ignore = (...properties: string[]) => {
    deprecatedMethodWarning('Ignore', 'IgnorePayload');
    return IgnorePayload(...properties);
}
