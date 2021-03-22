import {IntoPayload} from "./index";
import {MergeStageInterface, StageInterface, WhenMatchedType, WhenNotMatchedType} from "../../interfaces";

describe('merge helpers', () => {
    test.each([

        [IntoPayload('tests'), {
            into: 'tests',
            on: '_id',
            whenMatched: 'merge' as WhenMatchedType,
            let: { new: "$$ROOT" },
            whenNotMatched: 'insert' as WhenNotMatchedType }],

        [IntoPayload('units', {
            on: 'name',
            whenMatched: [{ $project: { stats: 1 } }],
            letWhenMatched: { test: '$test', unit: '$unit'},
            whenNotMatched: 'discard'
        }), {
            into: 'units',
            on: 'name',
            whenMatched: [{ $project: { stats: 1 } }] as StageInterface[],
            let: { test: '$test', unit: '$unit'},
            whenNotMatched: 'discard' as WhenNotMatchedType }],

    ])('%o should return %o', (
        operation: any,
        expected: MergeStageInterface
    ) => {
        expect(operation).toEqual(expected);
    });
});
