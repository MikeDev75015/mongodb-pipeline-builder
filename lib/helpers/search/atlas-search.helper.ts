import { SearchOperator, AtlasSearchStage } from '../../interfaces/stages/atlas-search-stage';

export const AtlasSearchHelper = (operator: SearchOperator, operatorOptions: { [key: string]: any }, optional?: AtlasSearchStage) => ({
  [operator]: operatorOptions,
  ...(optional? optional : {}),
} as AtlasSearchStage);
