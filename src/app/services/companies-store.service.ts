import { inject, Injectable } from '@angular/core';
import { CompaniesApiService } from '../http/companies-api/companies-api.service';
import { BehaviorSubject, finalize, Subject } from 'rxjs';
import { Company } from '../types/company.type';

@Injectable({
  providedIn: 'root',
})
export class CompaniesStoreService {
  private _loading$ = new BehaviorSubject(false);
  private _companies$ = new Subject<Company[]>();
  private _currentCompany$ = new Subject<Company>();

  public readonly loading$ = this._loading$.asObservable();
  public readonly companies$ = this._companies$.asObservable();
  public readonly currentCompany$ = this._currentCompany$.asObservable();

  private _companiesApiService = inject(CompaniesApiService);

  fetchAllCompanies = () => {
    this._loading$.next(true);
    this._companiesApiService
      .getCompanies({})
      .pipe(
        finalize(() => {
          this._loading$.next(false);
        })
      )
      .subscribe(companies => {
        this._companies$.next(companies);
      });
  };

  fetchCompany = ({ companyId }: { companyId: number }) => {
    this._loading$.next(true);
    this._companiesApiService
      .getCompany({ companyId })
      .pipe(
        finalize(() => {
          this._loading$.next(false);
        })
      )
      .subscribe(company => {
        if (!company) {
          return;
        }
        this._currentCompany$.next(company);
      });
  };
}
