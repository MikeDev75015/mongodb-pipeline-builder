import {CurrentOpHelper} from "./current-op.helper";
import {CurrentOpStage} from "../../models";

describe('currentOp helpers', () => {
    describe('CurrentOpHelper', () => {
        const payloadList = [
            { allUsers: true },
            { idleConnections: true },
            { idleCursors: true },
            { idleSessions: false },
            { localOps: true },
            { backtrace: true },
        ];

        test.each([
            [CurrentOpHelper(),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [CurrentOpHelper(payloadList[0]),
                {
                    allUsers: true, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [CurrentOpHelper(payloadList[1]),
                {
                    allUsers: false, idleConnections: true, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [CurrentOpHelper(payloadList[2]),
                {
                    allUsers: false, idleConnections: false, idleCursors: true,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [CurrentOpHelper(payloadList[3]),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: false, localOps: false, backtrace: false,
                }],
            [CurrentOpHelper(payloadList[4]),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: true, backtrace: false,
                }],
            [CurrentOpHelper(payloadList[5]),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: true,
                }],
        ])('%o should return %o', (
            operation: any,
            expected: CurrentOpStage
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
