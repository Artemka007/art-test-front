import { Company } from 'src/app/types/company.type';
import { SortBy, SortOrder } from './enums';

export type SortOptions = Partial<{
  sort_by: SortBy;
  sort_order: SortOrder;
}>;

export type FilterOptions = Partial<{
  q: string | null;
  industry: string | null;
  company_type: string | null;
}>;

export type PaginationOptions = Partial<{
  page: number;
  per_page: number;
  count: number;
  limit: number;
}>;

export type Query = SortOptions & FilterOptions & PaginationOptions;

export interface CompaniesResponsePagination {
  has_next: boolean;
  has_prev: boolean;
  limit: number;
  offset: number;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export type CompaniesResponse = {
  data: Company[];
} & CompaniesResponsePagination;
