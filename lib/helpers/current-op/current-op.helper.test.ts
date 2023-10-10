import { CurrentOpStage } from '../../models';
import { CurrentOpHelper } from './current-op.helper';

describe('currentOp helpers', () => {
  describe('CurrentOpHelper', () => {
    const payloadList: CurrentOpStage[] = [
      { allUsers: true },
      { idleConnections: true },
      { idleCursors: true },
      { idleSessions: false },
      { localOps: true },
      { backtrace: true },
    ];

    test.each([
      [CurrentOpHelper(), {}],
      [CurrentOpHelper(payloadList[0]), payloadList[0]],
      [CurrentOpHelper(payloadList[1]), payloadList[1]],
      [CurrentOpHelper(payloadList[2]), payloadList[2]],
      [CurrentOpHelper(payloadList[3]), payloadList[3]],
      [CurrentOpHelper(payloadList[4]), payloadList[4]],
      [CurrentOpHelper(payloadList[5]), payloadList[5]],
    ])('%o should return %o', (
      operation: any,
      expected: CurrentOpStage,
    ) => {
      expect(operation).toEqual(expected);
    });
  });
});
