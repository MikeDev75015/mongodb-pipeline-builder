import {$Cond, $IfNull, $Switch} from "./index";

const booleanExpression = true;
const trueCase = 'true';
const falseCase = 'false';
const value = 'test';
const replaceWith = 'unit';
const defaultCase = 'default';
const branchList: any[] = [];


describe('conditional operators', () => {
    test.each([
        [$Cond(booleanExpression, trueCase, falseCase), { $cond: [booleanExpression, trueCase, falseCase ] }],
        [$IfNull(value, replaceWith), { $ifNull: [value, replaceWith ] }],
        [$Switch(branchList, defaultCase), { $switch: {branches: branchList, default: defaultCase} }],
    ])('should %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});



