import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  private _activatedRoute = inject(ActivatedRoute);
  private _companiesStoreService = inject(CompaniesStoreService);

  loading$ = this._companiesStoreService.loading$;
  company$ = this._companiesStoreService.currentCompany$;

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id != null && !isNaN(Number(id))) {
      this._companiesStoreService.fetchCompany({ companyId: Number(id) });
    }
  }

  ngOnDestroy(): void {
    this._companiesStoreService.destroyCurrentCompany();
  }
}
