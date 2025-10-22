import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyItemComponent } from './company-item/company-item.component';
import { CompanyListComponent } from './company-list.component';
import { CompanyListRoutingModule } from './company-list-routing.module';

@NgModule({
  declarations: [CompanyItemComponent, CompanyListComponent],
  imports: [CommonModule, CompanyListRoutingModule],
})
export class CompanyListModule {}
