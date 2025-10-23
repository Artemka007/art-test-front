import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/types/company.type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class CompanyItemComponent {
  private _router = inject(Router);

  @Input() company?: Company;

  onClick = () => {
    if (!this.company) {
      return;
    }
    this._router.navigate(['detail', this.company?.id]);
  };
}
