import { AtlasSearchStage, SearchOperator } from '../../models/stages/atlas-search-stage';

export const SearchHelper = (
  operator: SearchOperator,
  operatorOptions: { [key: string]: any },
  optional: AtlasSearchStage = {},
) => (
  {
    [operator]: operatorOptions,
    ...optional,
  } as AtlasSearchStage
);
