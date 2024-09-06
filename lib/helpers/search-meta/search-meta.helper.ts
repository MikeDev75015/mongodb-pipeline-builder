import { SearchMetaStage } from '../../models';
import { SearchMetaFields, SearchMetaOperators } from '../../models/stages/search-meta-stage';

export const SearchMetaHelper = (
  operator: SearchMetaOperators,
  optional: SearchMetaFields = {},
) => (
  {
    ...operator,
    ...optional,
  } as SearchMetaStage
);
