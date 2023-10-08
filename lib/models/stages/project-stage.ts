type ProjectCondition = {
  $cond: {
    if: any;
    then: any;
    else: any;
  };
};

export type ProjectStage = { [field: string]: 0 | 1 | false | true | ProjectCondition };
