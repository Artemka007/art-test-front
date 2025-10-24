import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import routes from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from './http/http.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, HttpModule),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
