import { ChangeStreamStage } from '../../models';
import { ChangeStreamHelper } from './change-stream.helper';

describe('ChangeStreamHelper', () => {
  const payloadList: ChangeStreamStage[] = [
    { allChangesForCluster: true },
    { fullDocument: 'required' },
    { fullDocumentBeforeChange: 'whenAvailable' },
    { resumeAfter: 2 },
    { showExpandedEvents: true },
    { startAfter: true },
    { startAtOperationTime: 123456789 },
  ];

  test.each([
    [ChangeStreamHelper(), {}],
    [ChangeStreamHelper(payloadList[0]), payloadList[0]],
    [ChangeStreamHelper(payloadList[1]), payloadList[1]],
    [ChangeStreamHelper(payloadList[2]), payloadList[2]],
    [ChangeStreamHelper(payloadList[3]), payloadList[3]],
    [ChangeStreamHelper(payloadList[4]), payloadList[4]],
    [ChangeStreamHelper(payloadList[5]), payloadList[5]],
  ])('%o should return %o', (
    operation: ChangeStreamStage,
    expected: ChangeStreamStage,
  ) => {
    expect(operation).toEqual(expected);
  });
});
