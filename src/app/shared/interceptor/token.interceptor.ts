import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from 'src/app/user/model/token';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/user/store/user.selector';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private userToken: Token;
  constructor(private store: Store) {
    this.store
      .select(selectToken)
      .subscribe((userToken) => (this.userToken = userToken));
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('.netlify/functions/add-') ||
      request.url.includes('.netlify/functions/edit-') ||
      request.url.includes('.netlify/functions/get-') ||
      request.url.includes('.netlify/functions/remove-')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userToken.access_token}`,
        },
      });
    }
    return next.handle(request);
  }
}
