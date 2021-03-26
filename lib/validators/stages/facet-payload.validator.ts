/**
 * Checks the presence of mandatory fields and the validity of each field present in the payload
 * @param payload The value passed to the stage
 * @returns an error message if non-compliant, an empty string if compliant
 */
import {FacetStageInterface, getStageTypeValue, StageLabel} from "../../interfaces";

export const facetPayloadValidator = (payload: FacetStageInterface) => {
    if (!Object.keys(payload).length) {
        return 'You must specify at least one output field with its sub-pipeline.'
    }

    const invalidValueType = Object.keys(payload).filter(
        k => !Array.isArray(payload[k])
    );
    if (invalidValueType.length) {
        return `The ${invalidValueType.join(' / ')} pipeline${invalidValueType.length > 1
            ? 's are not valid'
            : ' is not valid'}.`
    }

    const invalidStageList = Object.keys(payload).filter(
        k => !!(payload[k].find(
            s => (!getStageTypeValue(Object.keys(s)[0].substr(1) as StageLabel))
        ))
    );
    if (invalidStageList.length) {
        return `The ${invalidStageList.join(' / ')} output${invalidStageList.length > 1
            ? 's'
            : ''} contains one or more invalid stages.`
    }

    const facetExceptionStageList = [
        '$collStats', '$facet', '$geoNear', '$indexStats', '$out', '$merge', '$planCacheStats'
    ];
    const incompatibleStageList = Object.keys(payload).filter(
        k => !!(payload[k].find(
            s => (facetExceptionStageList.includes(Object.keys(s)[0]))
        ))
    );
    if (incompatibleStageList.length) {
        return `The ${incompatibleStageList.join(' / ')} output${incompatibleStageList.length > 1
            ? 's'
            : ''} contains one or more incompatible stages.`
    }

    return '';
}
