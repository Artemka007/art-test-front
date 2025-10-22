import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.endsWith('.svg') && !/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: 'https://faker-api.milki.space' + request.url });
    }

    return next.handle(request);
  }
}
