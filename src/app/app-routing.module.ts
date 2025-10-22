import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutingModule } from './components/layout/layout-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => LayoutRoutingModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
