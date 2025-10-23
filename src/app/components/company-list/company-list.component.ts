import { Component, ElementRef, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CompanyItemComponent } from './company-item/company-item.component';
import { first } from 'rxjs';
import { CompanyFilterComponent } from './company-filter/company-filter.component';
import { CompanySortComponent } from './company-sort/company-sort.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CompanyItemComponent,
    AsyncPipe,
    CompanyFilterComponent,
    CompanySortComponent,
  ],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companyList = viewChild.required<ElementRef<HTMLElement>>('companyList');

  private _companiesStoreService = inject(CompaniesStoreService);

  companies$ = this._companiesStoreService.companies$;
  loading$ = this._companiesStoreService.loading$;

  ngOnInit(): void {
    this._companiesStoreService.fetchCompanies();
  }

  ngOnDestroy(): void {
    this._companiesStoreService.destroyAllCompanies();
    this._companiesStoreService.clearOptions();
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
}
