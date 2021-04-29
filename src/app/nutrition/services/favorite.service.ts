import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private httpClient: HttpClient) {}

  add(productId: string): Observable<any> {
    const url = '/.netlify/functions/add-nutritionFavorite';
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

  remove(productId: string): Observable<any> {
    const url = '/.netlify/functions/remove-nutritionFavorite';
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
    const url = '/.netlify/functions/get-nutritionFavoritesByUser';
    return this.httpClient.get<any>(url).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }
}
