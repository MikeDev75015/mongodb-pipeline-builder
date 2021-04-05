import {deprecatedMethodWarning} from "../../warnings";
import {OnlyPayload} from "./only-payload";

/**
 * Deprecated - Use the new {@link OnlyPayload} helper instead
 */
export const Only = (...properties: string[]) => {
    deprecatedMethodWarning('Only', 'OnlyPayload');
    return OnlyPayload(...properties);
}
