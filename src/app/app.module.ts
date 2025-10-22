import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyYandexMapComponent } from './components/company-yandex-map/company-yandex-map.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';

@NgModule({
  declarations: [AppComponent, CompanyListComponent, CompanyYandexMapComponent, CompanyDetailComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
