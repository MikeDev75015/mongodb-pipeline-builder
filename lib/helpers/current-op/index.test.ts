import {OpPayload} from "./index";
import {CurrentOpInterface} from "../../interfaces";

describe('currentOp helpers', () => {
    describe('OpPayload', () => {
        const payloadList = [
            { allUsers: true },
            { idleConnections: true },
            { idleCursors: true },
            { idleSessions: false },
            { localOps: true },
            { backtrace: true },
        ];

        test.each([
            [OpPayload(),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [OpPayload(payloadList[0]),
                {
                    allUsers: true, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [OpPayload(payloadList[1]),
                {
                    allUsers: false, idleConnections: true, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [OpPayload(payloadList[2]),
                {
                    allUsers: false, idleConnections: false, idleCursors: true,
                    idleSessions: true, localOps: false, backtrace: false,
                }],
            [OpPayload(payloadList[3]),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: false, localOps: false, backtrace: false,
                }],
            [OpPayload(payloadList[4]),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: true, backtrace: false,
                }],
            [OpPayload(payloadList[5]),
                {
                    allUsers: false, idleConnections: false, idleCursors: false,
                    idleSessions: true, localOps: false, backtrace: true,
                }],
        ])('%o should return %o', (
            operation: any,
            expected: CurrentOpInterface
        ) => {
            expect(operation).toEqual(expected);
        });
    });
});
