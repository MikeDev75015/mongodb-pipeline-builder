import { SearchStage } from '../../models';
import { SearchStageFields, SearchStageOperators } from '../../models/stages/search-stage';

export const SearchHelper = (
  operator: SearchStageOperators,
  optional: SearchStageFields = {},
) => (
  {
    ...operator,
    ...optional,
  } as SearchStage
);
