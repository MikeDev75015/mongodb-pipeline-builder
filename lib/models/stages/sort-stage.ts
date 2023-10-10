export type SortBy = { [key: string]: 1 | -1 };


export type SortStage = { [key: string]: 1 | -1 | { $meta: 'textScore' } };
