import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class OpenBeautyfactsService {
  constructor(private httpClient: HttpClient) {}

  searchProducts(tag: string): Observable<Product[]> {
    const url = `https://de.openbeautyfacts.org/cgi/search.pl?search_terms=${tag}&page=1&search_simple=1&action=process&json=1.json`;
    // const headers = new HttpHeaders({
    //   'User-Agent': 'Sample Rating App - Web - Version 0.1',
    // });
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        if (!!response.products) {
          return response.products;
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
