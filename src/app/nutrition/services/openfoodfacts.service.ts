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

  searchProducts(tag: string): Observable<Product[]> {
    const url = `https://world.openfoodfacts.org/api/v1/search?action=process&tag_contains_1=contains&tag_1=A&json=true`
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        if (!!response.products) {
          return response.products;
        }
        else {
          throw new Error(response.status_verbose);
        }
      }),
      catchError((error) => {
        return throwError(error);
      }));
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
    const url = '/.netlify/functions/getNutrients';
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const nutritientNames: NutritientName[] = response.message;
        return nutritientNames;
      }));
  }

  getIngredientNames(): Observable<any> {
    const url = '/.netlify/functions/getIngredients';
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const ingretientNames: NutritientName[] = response.message;
        return ingretientNames;
      }));
  }

  getIngredientAnalysisNames(): Observable<any> {
    const url = '/.netlify/functions/getIngredientAnalysis';
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        const ingretientAnylysisNames: NutritientName[] = response.message;
        return ingretientAnylysisNames;
      }));
  }
}
