import { Component, Input } from '@angular/core';
import { Company } from 'src/app/types/company.type';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss'],
})
export class CompanyItemComponent {
  @Input() company?: Company;
}
