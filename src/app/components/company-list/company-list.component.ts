import { Component, inject, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  private _companiesStoreService = inject(CompaniesStoreService);
  companies$ = this._companiesStoreService.companies$.pipe(tap(console.log));

  ngOnInit(): void {
    this._companiesStoreService.fetchAllCompanies();
  }
}
