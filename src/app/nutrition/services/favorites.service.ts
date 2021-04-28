import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private httpClient: HttpClient) {}

  add(productId: string): Observable<any> {
    const url = '/.netlify/functions/add-productFavorite';
    return this.httpClient
      .post<any>(url, {
        productId: productId,
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }

  get(): Observable<any> {
    const url = '/.netlify/functions/get-productFavoritesByUser';
    return this.httpClient
      .get<any>(url)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }
}
