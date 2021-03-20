import { ConditionPayload, EqualityPayload } from "./";
import {PipelineError} from "../../errors";

describe('$lookup stage helpers', () => {

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

    describe('LookupConditionStage', () => {
        it('should return a basic valid $lookup condition stage', () => {
            expect(ConditionPayload(
                'from',
                'as'
            )).toEqual({
                as: "as",
                from: "from",
            });
        });

        it('should return a valid $lookup condition stage with "only" project type', () => {
            expect(ConditionPayload(
                'from',
                'as',
                { _id: 0, test1: 1, test2: 1, test3: 1 },
                [{ $match: { $expr: { $eq: ["$type", "$$testSource"] } } }],
                ['testSource']
            )).toEqual({
                as: "as",
                from: "from",
                let: {
                    "testSource": "$testSource",
                },
                pipeline: [
                    { $match: { $expr: { $eq: ["$type", "$$testSource"] } } },
                    { $project: { _id: 0, test1: 1, test2: 1, test3: 1 } }
                ],
            });
        });

        it('should return a valid $lookup condition stage with "ignore" project type', () => {
            expect(ConditionPayload(
                'from',
                'as',
                { test1: 0, test2: 0, test3: 0 },
                [{ $match: { $expr: { $eq: ["$type", "$$testSource"] } } }],
                ['testSource']
            )).toEqual({
                as: "as",
                from: "from",
                let: {
                    "testSource": "$testSource",
                },
                pipeline: [
                    { $match: { $expr: { $eq: ["$type", "$$testSource"] } } },
                    { $project: { test1: 0, test2: 0, test3: 0 } }
                ],
            });
        });
    });
});
