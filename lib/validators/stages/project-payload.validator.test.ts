import {projectPayloadValidator} from "./project-payload.validator";

describe('project validators', () => {
    describe('projectPayloadValidator', () => {
        const payloadList: any[] = [
            {}
        ];
        test.each([
            [projectPayloadValidator(payloadList[0]),
                ''],
        ])('%o should return %s', (
            operation: any,
            expected: any
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
