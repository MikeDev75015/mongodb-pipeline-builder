/**
 * Test Result Interface
 */
export interface TestResultInterface {
    hasUndefinedValue: boolean;
    propertyList: ResultProperty[];
}

/**
 * Result Property
 */
export interface ResultProperty {
    name: string;
    depth: number;
}

/**
 * Is Undefined
 * @param v The value to test
 * @constructor
 */
export function IsUndefined(v: any): TestResultInterface {
    const testResult: TestResultInterface = {
        hasUndefinedValue: false,
        propertyList: []
    };

    return testValueOfV(v, testResult);
}

function getTypeOfV(v: any): string {
    let vType: string = typeof v;

    if (vType === 'object' && Array.isArray(v)) {
        vType = 'array';
    }

    return vType;
}

function testValueOfV(v: any, testResult: TestResultInterface, depth = 0, key = ''): TestResultInterface {
    const vType: string = getTypeOfV(v);

    switch (vType) {
        case 'string': break;
        case 'number': break;
        case 'boolean': break;
        case 'object':
            testResult = testObjectProperties(v, testResult, depth, key);
            break;
        case 'array':
            testResult = testArrayValues(v, testResult, depth, key);
            break;

        default:
            testResult.hasUndefinedValue = true;
            testResult.propertyList = key
                ? testResult.propertyList.concat([{ name: key, depth }])
                : testResult.propertyList
    }

    return testResult;
}

function testObjectProperties(
    object: { [key: string]: any },
    testResult: TestResultInterface,
    depth: number,
    key: string
): TestResultInterface {

    Object.keys(object).forEach(k => {
        testResult = testValueOfV(object[k], testResult, (depth + 1), (key ? key + ' > ' : '') + k);
    });

    return testResult;
}

function testArrayValues(
    array: any[],
    testResult: TestResultInterface,
    depth: number,
    key: string
): TestResultInterface {

    array.forEach((v, i) => {
        testResult = testValueOfV(v, testResult, (depth + 1), ((key ? key + ' > indexArray_' : 'indexArray_') + i));
    });

    return testResult;
}
