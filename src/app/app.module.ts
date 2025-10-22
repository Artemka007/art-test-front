import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { HttpModule } from './http/http.module';
import { LayoutRoutingModule } from './components/layout/layout-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LayoutRoutingModule, HttpModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
