import {
  $DenseRank,
  $Derivative,
  $DocumentNumber,
  $ExponentialMovingAverage,
  $Integral,
  $LastObservationCarriedForward,
  $LinearFill,
  $Rank,
  $Shift,
} from './';

describe('window operators', () => {
  test.each([
    [$Rank(), { $rank: {} }],
    [$DenseRank(), { $denseRank: {} }],
    [$DocumentNumber(), { $documentNumber: {} }],
    [$Shift('$quantity', -1), { $shift: { output: '$quantity', by: -1 } }],
    [$Shift('$quantity', 1, { defaultValue: 0 }), { $shift: { output: '$quantity', by: 1, default: 0 } }],
    [$Shift('$quantity', 1, { defaultValue: null }), { $shift: { output: '$quantity', by: 1, default: null } }],
    [$Derivative('$miles'), { $derivative: { input: '$miles' } }],
    [$Derivative('$miles', { unit: 'hour' }), { $derivative: { input: '$miles', unit: 'hour' } }],
    [$Integral('$kilowatts'), { $integral: { input: '$kilowatts' } }],
    [$Integral('$kilowatts', { unit: 'hour' }), { $integral: { input: '$kilowatts', unit: 'hour' } }],
    [$ExponentialMovingAverage('$price', { periods: 2 }), { $expMovingAvg: { input: '$price', N: 2 } }],
    [$ExponentialMovingAverage('$price', { alpha: 0.75 }), { $expMovingAvg: { input: '$price', alpha: 0.75 } }],
    [$LinearFill('$price'), { $linearFill: '$price' }],
    [$LastObservationCarriedForward('$price'), { $locf: '$price' }],
  ])('should %s', (
    operation: any,
    expected: any,
  ) => {
    expect(operation).toEqual(expected);
  });
});
