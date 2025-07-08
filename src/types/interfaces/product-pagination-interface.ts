import { IProductQuery } from './product-query-interface';
import { IPagination } from './base/pagination-interface';

export type IProductPagination = Partial<IProductQuery> & Partial<IPagination>;
