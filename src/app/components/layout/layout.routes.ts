import { Routes } from '@angular/router';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { CompanyYandexMapComponent } from '../company-yandex-map/company-yandex-map.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: CompanyListComponent,
  },
  {
    path: 'detail/:id',
    pathMatch: 'full',
    component: CompanyDetailComponent,
  },
  {
    path: 'map',
    pathMatch: 'full',
    component: CompanyYandexMapComponent,
  },
];

export default routes;
