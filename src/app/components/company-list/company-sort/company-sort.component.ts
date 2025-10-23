import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { first } from 'rxjs';
import { SORT_BY, SortBy } from 'src/app/http/companies-api/enums';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';

@Component({
  selector: 'app-company-sort',
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CompanySortComponent {
  private _companiesStoreService = inject(CompaniesStoreService);

  activeSortOptions$ = this._companiesStoreService.sortOptions$;

  sortTabs = SORT_BY;

  onSortClick = (sortBy: SortBy) => {
    this.activeSortOptions$.pipe(first()).subscribe(active => {
      this._companiesStoreService.sortCompanies(
        active?.sort_by !== sortBy ? { sort_by: sortBy } : null
      );
    });
  };
}
