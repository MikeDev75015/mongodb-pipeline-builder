/**
 * Interface representing a save of a builder action
 */
export type DebuggedAction = {
  /**
   * The name of the action
   */
  action: string;
  /**
   * The last values received
   */
  value: any;
};
