import { SampleStage } from '../../models';

/**
 * $Size Payload
 * @param size positive integer. Default to 1
 * @constructor
 */
export const SampleHelper = (size: number) => (
  { size } as SampleStage
);
