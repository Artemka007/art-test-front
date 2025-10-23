import { Component, inject, OnInit } from '@angular/core';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { CompanyItemComponent } from './company-item/company-item.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  standalone: true,
  imports: [NgFor, CompanyItemComponent, AsyncPipe],
})
export class CompanyListComponent implements OnInit {
  private _companiesStoreService = inject(CompaniesStoreService);
  companies$ = this._companiesStoreService.companies$;
  loading$ = this._companiesStoreService.loading$;

  ngOnInit(): void {
    this._companiesStoreService.fetchCompanies();
  }
}
