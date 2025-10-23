import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpModule } from './app/http/http.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, HttpModule), ...appConfig.providers],
}).catch(err => console.error(err));
