import { EqualityPayload } from "./equality-payload";
import {PipelineError} from "../../errors";

describe('EqualityPayload', () => {
    describe('should throw a PipelineError message', () => {
        test.each([
            [
                'if the localField property is invalid or missing in a Lookup Equality Payload',
                ['from', 'as', undefined, 'foreignField']
            ],

            [
                'if the foreignField property is invalid or missing in a Lookup Equality Payload',
                ['from', 'as', 'localField', undefined]
            ]

        ])('%s', (
            testName: string,
            payload: any
        ) => {
            expect(
                () => EqualityPayload(
                    payload[0], payload[1], payload[2], payload[3]
                )
            ).toThrowError(
                new PipelineError('Invalid Lookup Equality Payload, invalid or missing "localField" or "foreignField" parameter!')
            );
        });
    });

    it('should return a valid $lookup equality stage', () => {
        expect(EqualityPayload(
            'from',
            'as',
            'localField',
            'foreignField'
        )).toEqual({
            from: 'from',
            localField: 'localField',
            foreignField: 'foreignField',
            as: 'as'
        });
    });
});
