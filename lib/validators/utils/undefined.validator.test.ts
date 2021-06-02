import {IsUndefined, ResultProperty, TestResultInterface} from "./undefined.validator";

describe('IsUndefined', () => {
    const valueToTest: any[] = [
        undefined,
        { name: 'toto', test: undefined },
        [ 2, 4, undefined, 8 ],
        [ { unit: undefined }, { name: 'toto' }, { tests: [ undefined ] } ],
        { test: [ { toto: undefined } ], unit: { tests: undefined }, undefined }
    ];

    test.each([
        [valueToTest[0], { hasUndefinedValue: true, propertyList: [] }],
        [valueToTest[1], { hasUndefinedValue: true, propertyList: [{ depth: 1, name: "test" }] }],
        [valueToTest[2], { hasUndefinedValue: true, propertyList: [{ depth: 1, name: "indexArray_2" }] }],
        [valueToTest[3], { hasUndefinedValue: true, propertyList: [
                { name: 'indexArray_0 > unit', depth: 2 },
                { name: 'indexArray_2 > tests > indexArray_0', depth: 3 }
        ] }],
        [valueToTest[4], { hasUndefinedValue: true, propertyList: [
                { name: 'test > indexArray_0 > toto', depth: 3 },
                { name: 'unit > tests', depth: 2 },
                { name: 'undefined', depth: 1 }
        ] }],
    ])('%o should return %o', (
        value: any,
        expected: TestResultInterface
    ) => {
        const operation = IsUndefined(value);
        expect(operation.hasUndefinedValue).toEqual(expected.hasUndefinedValue);
        expect(operation.propertyList).toHaveLength(expected.propertyList.length);

        if (operation.propertyList.length) {
            operation.propertyList.forEach((v: ResultProperty, i: number) => {
                expect(v.name).toEqual(expected.propertyList[i].name);
                expect(v.depth).toEqual(expected.propertyList[i].depth);
            });
        }
    });
});
