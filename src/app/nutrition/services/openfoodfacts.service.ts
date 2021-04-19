import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NutritientName } from '../model/nutritient-name';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class OpenfoodfactsService {
  readonly foodFactsApi = 'https://world.openfoodfacts.org/api/v0/product/{barcode}.json';

  constructor(private httpClient: HttpClient) {
  }

  getFacts(barcode: string): Observable<Product> {
    const url = this.foodFactsApi.replace('{barcode}', barcode);
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        if (!!response.product) {
          return response.product;
        }
        else {
          throw new Error(response.status_verbose);
        }
      }),
      catchError((error) => {
        return throwError(error);
      }));
  }

  getNutrientNames(): Observable<any> {
    const url = 'https://static.openfoodfacts.org/data/taxonomies/nutrients.json';
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const nutritientNames: NutritientName[] = [];
        Object.entries(response).forEach(
          ([key, value]) => {
            nutritientNames.push({ key: key, value: (value as any).name.de })
          }
        );

        return nutritientNames;
      }));
  }
}
