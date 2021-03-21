import { Expression } from "./index";

describe('$match stage helpers', () => {
    describe('Expression', () => {
        it('should return a $expr object with specified value', () => {
            expect(Expression(1)).toEqual({ $expr: 1 });
        });
    });
});
