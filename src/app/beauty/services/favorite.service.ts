import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private httpClient: HttpClient) {}

  add(product: Product): Observable<any> {
    const url = '/.netlify/functions/add-beautyFavorite';
    return this.httpClient
      .post<any>(url, {
        product: product,
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  remove(productId: string): Observable<any> {
    const url = '/.netlify/functions/remove-beautyFavorite';
    return this.httpClient
      .post<any>(url, {
        productId: productId,
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  get(): Observable<any> {
    const url = '/.netlify/functions/get-beautyFavoritesByUser';
    return this.httpClient.get<any>(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
