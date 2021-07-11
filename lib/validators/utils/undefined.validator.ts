/**
 * Test Result Response
 */
export interface TestResultResponse {
  /**
   * A boolean specifying if an undefined value has been encountered
   */
  hasUndefinedValue: boolean;
  /**
   * Contains a list of properties with an undefined value
   */
  propertyList: ResultProperty[];
}

/**
 * Result Property Model
 */
export interface ResultProperty {
  /**
   * Name of property with undefined value
   */
  name: string;
  /**
   * Depth of property with undefined value
   */
  depth: number;
}

/**
 * Is Undefined
 * @param v The value to test
 * @constructor
 */
export function IsUndefined(v: any): TestResultResponse {
  const testResult: TestResultResponse = {
    hasUndefinedValue: false,
    propertyList: []
  };
  
  return testValueOfV(v, testResult);
}

/**
 * Gets the type of the specified value
 * @param v
 */
function getTypeOfV(v: any): string {
  let vType: string = typeof v;
  
  if (vType === 'object' && Array.isArray(v)) {
    vType = 'array';
  }
  
  return vType;
}

/**
 * Tests the specified value
 * @param v
 * @param testResult
 * @param depth
 * @param key
 */
function testValueOfV(v: any, testResult: TestResultResponse, depth = 0, key = ''): TestResultResponse {
  const vType: string = getTypeOfV(v);
  
  switch (vType) {
    case 'string':
      break;
    case 'number':
      break;
    case 'boolean':
      break;
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
        : testResult.propertyList;
  }
  
  return testResult;
}

/**
 * Tests an object and its properties
 * @param object
 * @param testResult
 * @param depth
 * @param key
 */
function testObjectProperties(
  object: { [key: string]: any },
  testResult: TestResultResponse,
  depth: number,
  key: string
): TestResultResponse {
  
  Object.keys(object)
        .forEach(k => {
          testResult = testValueOfV(object[k], testResult, (depth + 1), (key ? key + ' > ' : '') + k);
        });
  
  return testResult;
}

/**
 * Tests an array and its elements
 * @param array
 * @param testResult
 * @param depth
 * @param key
 */
function testArrayValues(
  array: any[],
  testResult: TestResultResponse,
  depth: number,
  key: string
): TestResultResponse {
  
  array.forEach((v, i) => {
    testResult = testValueOfV(v, testResult, (depth + 1), ((key ? key + ' > indexArray_' : 'indexArray_') + i));
  });
  
  return testResult;
}
