import { Component, ElementRef, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CompanyItemComponent } from './company-item/company-item.component';
import { first, Subject } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CompanyItemComponent, AsyncPipe],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companyList = viewChild.required<ElementRef<HTMLElement>>('companyList');

  private _companiesStoreService = inject(CompaniesStoreService);

  private _destroyed$ = new Subject<void>();

  companies$ = this._companiesStoreService.companies$;
  loading$ = this._companiesStoreService.loading$;

  ngOnInit(): void {
    this._companiesStoreService.fetchCompanies();
  }

  onScroll = () => {
    this._companiesStoreService.loading$.pipe(first()).subscribe(loading => {
      if (loading) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = this.companyList().nativeElement;
      const threshold = 50;
      if (scrollTop + clientHeight < scrollHeight - threshold) {
        return;
      }
      this._companiesStoreService.loadNextPage();
    });
  };

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
