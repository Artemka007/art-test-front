import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailComponent } from './company-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyDetailRoutingModule {}
