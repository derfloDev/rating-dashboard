import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductsResponse, RootObject } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class OpenBeautyfactsService {
  constructor(private httpClient: HttpClient) {}

  searchProducts(
    tag: string,
    page: number,
    pageSize: number
  ): Observable<ProductsResponse> {
    const url = `https://de.openbeautyfacts.org/cgi/search.pl?search_terms=${tag}&search_simple=1&action=process&json=1.json&page_size=${pageSize}&page=${page}`;
    return this.httpClient.get<ProductsResponse>(url).pipe(
      map((response) => {
        if (!!response.products) {
          return response;
        } else {
          throw new Error(response.status_verbose);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getFacts(barcode: string): Observable<Product> {
    const url = `https://de.openbeautyfacts.org/api/v0/product/${barcode}.json`;
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        if (!!response.product) {
          return response.product;
        } else {
          throw new Error(response.status_verbose);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
