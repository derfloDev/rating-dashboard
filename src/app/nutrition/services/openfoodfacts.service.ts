import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductsResponse } from '../model/product';
import { LocalizedName } from 'src/app/shared/models/localized-name';

@Injectable({
  providedIn: 'root',
})
export class OpenfoodfactsService {
  readonly foodFactsApi =
    'https://world.openfoodfacts.org/api/v0/product/{barcode}.json';

  constructor(private httpClient: HttpClient) {}

  searchProducts(
    tag: string,
    page: number,
    pageSize: number
  ): Observable<ProductsResponse> {
    const url = `https://de.openfoodfacts.org/cgi/search.pl?search_terms=${tag}&search_simple=1&action=process&json=1.json&page_size=${pageSize}&page=${page}`;
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const castedResponse = (response as unknown) as ProductsResponse;
        if (!!castedResponse.products) {
          return castedResponse;
        } else {
          throw new Error(castedResponse.status_verbose);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getFacts(barcode: string): Observable<Product> {
    const url = this.foodFactsApi.replace('{barcode}', barcode);
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

  getLocalizedNutrientNames(): Observable<any> {
    const url = '/.netlify/functions/getNutrients';
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const nutritientNames: LocalizedName[] = response.message;
        return nutritientNames;
      })
    );
  }

  getIngredientNames(): Observable<any> {
    const url = '/.netlify/functions/getIngredients';
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const ingretientNames: LocalizedName[] = response.message;
        return ingretientNames;
      })
    );
  }
}
