import {$And, $Not, $Or} from "./index";

const args: any[] = [];
const expression = '';

describe('boolean operators', () => {
    test.each([
        [$And(...args), { $and: args }],
        [$Not(expression), { $not: [expression ] }],
        [$Or(...args), { $or: args }],
    ])('should return %s', (
        operation: any,
        expected: any
    ) => {
        expect(operation).toEqual(expected);
    });
});


