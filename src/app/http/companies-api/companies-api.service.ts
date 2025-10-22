import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../types/company.type';
import { PaginationQuery } from './types';

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService {
  private _http = inject(HttpClient);

  getCompanies = ({ query }: { query?: PaginationQuery }) => {
    return this._http.get<Company[]>('/companies', { params: query });
  };

  getCompany = ({ companyId }: { companyId: number }) => {
    return this._http.get<Company | null>(`/companies/${companyId}`);
  };
}
