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
