import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '/list',
    loadChildren: () => import('../company-list/company-list.module').then(m => m.CompanyListModule),
  },
  {
    path: '/detail/:id',
    loadChildren: () => import('../company-detail/company-detail.module').then(m => m.CompanyDetailModule),
  },
  {
    path: '/map',
    loadChildren: () => import('../company-yandex-map/company-yandex-map.module').then(m => m.CompanyYandexMapModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
