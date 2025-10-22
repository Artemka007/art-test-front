import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyItemComponent } from './company-item/company-item.component';
import { CompanyListComponent } from './company-list.component';

@NgModule({
  declarations: [CompanyItemComponent, CompanyListComponent],
  imports: [CommonModule],
  exports: [CompanyListComponent],
})
export class CompanyListModule {}
