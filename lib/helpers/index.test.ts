import {Lookup, lookupConditionStage, lookupEqualityStage} from "./index";
import {PipelineError} from "../errors";

describe('pipeline Stage Helpers', () => {
    describe('Lookup', () => {
        let
            lookupEqualityStage = jest.fn(),
            lookupConditionSpy;

        describe('should throw a PipelineError message', () => {
            test.each([

                [
                    'if the from property is missing',
                    {as: 'test'},
                    new PipelineError('Invalid Lookup Payload, missing "from" or "as" property!')
                ],

                [
                    'if the as property is missing',
                    {from: 'test'},
                    new PipelineError('Invalid Lookup Payload, missing "from" or "as" property!')
                ],

                [
                    'if the localField property is missing in a Lookup Equality Payload',
                    {from: 'test', as: 'test', foreignField: 'test'},
                    new PipelineError('Invalid Lookup Equality Payload, missing "localField" or "foreignField" parameter!')
                ],

                [
                    'if the foreignField property is missing in a Lookup Equality Payload',
                    {from: 'test', as: 'test', localField: 'test'},
                    new PipelineError('Invalid Lookup Equality Payload, missing "localField" or "foreignField" parameter!')
                ],

                [
                    'if the type property is missing in a Lookup Condition Payload project property',
                    {from: 'test', as: 'test', project: {list: ['test']}},
                    new PipelineError('The project type property must be specified!')
                ],

            ])('%s', (
                testName: string,
                payload: any,
                errorThrown
            ) => {
                expect(() => Lookup(payload)).toThrowError(errorThrown);
            });
        });
    });

    describe('lookupEqualityStage', () => {
        it('should return a valid $lookup equality stage', () => {
            expect(lookupEqualityStage({
                from: 'from',
                localField: 'localField',
                foreignField: 'foreignField',
                as: 'as'
            })).toEqual({
                $lookup: {
                    from: 'from',
                    localField: 'localField',
                    foreignField: 'foreignField',
                    as: 'as'
                }
            });
        });
    });

    describe('lookupConditionStage', () => {
        it('should return a basic valid $lookup condition stage', () => {
            expect(lookupConditionStage({
                from: 'from',
                as: 'as'
            })).toEqual({
                $lookup: {
                    as: "as",
                    from: "from",
                },
            });
        });

        it('should return a valid $lookup condition stage with "only" project type', () => {
            expect(lookupConditionStage({
                from: 'from',
                sourceList: ['testSource'],
                project: {
                    type: 'only',
                    list: ['test1', 'test2', 'test3']
                },
                pipeline: [
                    {$match: {$expr: {$eq: ['$type', '$$testSource']}}}
                ],
                as: 'as'
            })).toEqual({
                $lookup: {
                    as: "as",
                    from: "from",
                    let: {
                        "testSource": "$testSource",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$type",
                                        "$$testSource",
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                test1: 1,
                                test2: 1,
                                test3: 1,
                            },
                        },
                    ],
                },
            });
        });

        it('should return a valid $lookup condition stage with "ignore" project type', () => {
            expect(lookupConditionStage({
                from: 'from',
                sourceList: ['testSource'],
                project: {
                    type: 'ignore',
                    list: ['test1', 'test2', 'test3']
                },
                pipeline: [
                    {$match: {$expr: {$eq: ['$type', '$$testSource']}}}
                ],
                as: 'as'
            })).toEqual({
                $lookup: {
                    as: "as",
                    from: "from",
                    let: {
                        "testSource": "$testSource",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$type",
                                        "$$testSource",
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                test1: 0,
                                test2: 0,
                                test3: 0,
                            },
                        },
                    ],
                },
            });
        });
    });
});
