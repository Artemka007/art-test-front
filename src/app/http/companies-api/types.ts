import { Company } from 'src/app/types/company.type';

export type PaginationQuery = Partial<{
  page: number;
  per_page: number;
  count: number;
  limit: number;
  q: string;
  industry: string;
  company_type: string;
  sort_by: string;
  sort_order: string;
}>;

export interface CompaniesResponse {
  data: Company[];
  has_next: boolean;
  has_prev: boolean;
  limit: 50;
  offset: 0;
  page: 1;
  per_page: 50;
  total: 1000;
  total_pages: 20;
}
