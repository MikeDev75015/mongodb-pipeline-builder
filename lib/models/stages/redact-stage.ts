type RedactChoice = '$$DESCEND' | '$$PRUNE' | '$$KEEP';

export type RedactStage = {
  $cond: {
    if: any;
    then: RedactChoice;
    else: RedactChoice;
  }
};