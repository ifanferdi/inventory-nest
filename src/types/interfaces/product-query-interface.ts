import { IQuery } from './base/query-interface';

export type IProductQuery = Partial<IQuery> & {
  'category.q'?: string;
};
