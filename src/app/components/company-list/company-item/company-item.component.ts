import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import type { Company } from 'src/app/types/company.type';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
  standalone: true,
  imports: [CommonModule],
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
