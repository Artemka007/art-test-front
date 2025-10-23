import { inject, Injectable } from '@angular/core';
import { CompaniesApiService } from '../http/companies-api/companies-api.service';
import { BehaviorSubject, combineLatest, finalize, first, Subject, switchMap } from 'rxjs';
import type { Company } from '../types/company.type';
import type {
  CompaniesResponsePagination,
  FilterOptions,
  PaginationOptions,
  SortOptions,
} from 'src/app/http/companies-api/types';

@Injectable({
  providedIn: 'root',
})
export class CompaniesStoreService {
  private _loading$ = new BehaviorSubject(false);

  private _companies$ = new BehaviorSubject<Company[] | null>(null);
  private _currentCompany$ = new Subject<Company>();

  private _sortOptions$ = new BehaviorSubject<SortOptions | null>(null);
  private _filterOptions$ = new BehaviorSubject<FilterOptions | null>(null);
  private _paginationOptions$ = new BehaviorSubject<PaginationOptions | null>(null);

  private _lastPagination$ = new BehaviorSubject<CompaniesResponsePagination | null>(null);

  public readonly loading$ = this._loading$.asObservable();

  public readonly companies$ = this._companies$.asObservable();
  public readonly currentCompany$ = this._currentCompany$.asObservable();
  public readonly sortOptions$ = this._sortOptions$.asObservable();

  public readonly filterOptions$ = this._filterOptions$.asObservable();
  public readonly paginationOptions$ = this._paginationOptions$.asObservable();

  private _companiesApiService = inject(CompaniesApiService);

  fetchCompanies = (options?: { append: boolean }) => {
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
      .subscribe(({ data, ...paginationData }) => {
        const appendedCompanies = options?.append ? this._companies$.getValue() || [] : [];
        this._companies$.next([...appendedCompanies, ...data]);
        this._lastPagination$.next(paginationData);
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

  loadNextPage = () => {
    const lastPagination = this._lastPagination$.getValue();
    if (!lastPagination?.has_next) {
      return;
    }
    this._paginationOptions$.next({
      page: lastPagination.page + 1,
      per_page: lastPagination.per_page,
      limit: lastPagination.limit,
    });
    this.fetchCompanies({ append: true });
  };

  sortCompanies = (options: SortOptions | null) => {
    this._sortOptions$.next(options);
    this._paginationOptions$.next(null);
    this.fetchCompanies();
  };

  filterCompanies = (options: FilterOptions | null) => {
    this._filterOptions$.next(options);
    this._paginationOptions$.next(null);
    this.fetchCompanies();
  };
}
