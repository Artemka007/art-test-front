import { inject, Injectable } from '@angular/core';
import { CompaniesApiService } from '../http/companies-api/companies-api.service';
import { BehaviorSubject, combineLatest, finalize, first, Subject, switchMap, tap } from 'rxjs';
import { Company } from '../types/company.type';
import { FilterOptions, PaginationOptions, SortOptions } from 'src/app/http/companies-api/types';

@Injectable({
  providedIn: 'root',
})
export class CompaniesStoreService {
  private _loading$ = new BehaviorSubject(false);

  private _companies$ = new Subject<Company[]>();
  private _currentCompany$ = new Subject<Company>();

  private _sortOptions$ = new BehaviorSubject<SortOptions | null>(null);
  private _filterOptions$ = new BehaviorSubject<FilterOptions | null>(null);
  private _paginationOptions$ = new BehaviorSubject<PaginationOptions | null>(null);

  private _paginationCache$ = new BehaviorSubject<PaginationOptions[]>([]);

  public readonly loading$ = this._loading$.asObservable();

  public readonly companies$ = this._companies$.asObservable();
  public readonly currentCompany$ = this._currentCompany$.asObservable();
  public readonly sortOptions$ = this._sortOptions$.asObservable();

  public readonly filterOptions$ = this._filterOptions$.asObservable();
  public readonly paginationOptions$ = this._paginationOptions$.asObservable();

  private _companiesApiService = inject(CompaniesApiService);

  fetchCompanies = () => {
    this._loading$.next(true);
    combineLatest([this.sortOptions$, this.filterOptions$, this.paginationOptions$])
      .pipe(
        first(),
        switchMap(([sortOptions, filterOptions, paginationOptions]) => {
          return this._companiesApiService.getCompanies({
            query: {
              ...sortOptions,
              ...filterOptions,
              ...paginationOptions,
            },
          });
        }),
        finalize(() => {
          this._loading$.next(false);
        })
      )
      .subscribe(({ data }) => {
        this._companies$.next(data);
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

  sortCompanies = (options: SortOptions) => {
    this._sortOptions$.next(options);
    this.fetchCompanies();
  };

  filterCompanies = (options: FilterOptions) => {
    this._filterOptions$.next(options);
    this.fetchCompanies();
  };

  paginateCompanies = (options: PaginationOptions) => {
    this._paginationOptions$.next(options);
    this.fetchCompanies();
  };
}
