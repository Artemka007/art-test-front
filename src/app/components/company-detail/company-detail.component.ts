import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _companiesStoreService = inject(CompaniesStoreService);

  company$ = this._companiesStoreService.currentCompany$;

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id != null && !isNaN(Number(id))) {
      this._companiesStoreService.fetchCompany({ companyId: Number(id) });
    }
  }
}
