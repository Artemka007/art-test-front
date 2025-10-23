import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { COMPANY_INDUSTRIES, COMPANY_TYPES } from 'src/app/enums/company.enum';
import { FilterOptions } from 'src/app/http/companies-api/types';
import { CompaniesStoreService } from 'src/app/services/companies-store.service';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CompanyFilterComponent implements OnInit, OnDestroy {
  private _formBuilder = inject(FormBuilder);
  private _companiesStoreService = inject(CompaniesStoreService);

  private _destroyed$ = new Subject<void>();

  initialState = {
    q: '',
    industry: '',
    company_type: '',
  };

  types = COMPANY_TYPES;
  industries = COMPANY_INDUSTRIES;

  filterForm = this._formBuilder.group<FilterOptions>(this.initialState);

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(takeUntil(this._destroyed$)).subscribe(value => {
      this._companiesStoreService.filterCompanies(value);
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  clearFilters = () => {
    this.filterForm.setValue(this.initialState);
  };
}
