import { CollStatsStage } from '../../models';
import { CollStatsHelper } from './coll-stats.helper';

describe('CollStatsHelper', () => {
  const payloadList: CollStatsStage[] = [
    { latencyStats: {} },
    { latencyStats: { histograms: true } },
    { storageStats: {} },
    { storageStats: { scale: 2 } },
    { count: 1 },
    { queryExecStats: false },
  ];

  test.each([
    [CollStatsHelper(), {}],
    [CollStatsHelper(payloadList[0]), payloadList[0]],
    [CollStatsHelper(payloadList[1]), payloadList[1]],
    [CollStatsHelper(payloadList[2]), payloadList[2]],
    [CollStatsHelper(payloadList[3]), payloadList[3]],
    [CollStatsHelper(payloadList[4]), payloadList[4]],
    [CollStatsHelper(payloadList[5]), { queryExecStats: {} }],
  ])('%o should return %o', (
    operation: CollStatsStage,
    expected: CollStatsStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
