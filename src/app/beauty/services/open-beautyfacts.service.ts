import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiFilter } from 'src/app/shared/models/api-filter';
import { Product, ProductsResponse, RootObject } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class OpenBeautyfactsService {
  constructor(private httpClient: HttpClient) {}

  searchProducts(
    tag: string,
    page: number,
    pageSize: number,
    filter: ApiFilter
  ): Observable<ProductsResponse> {
    const params = this.getQueryparams(tag, page, pageSize, filter);
    const url = `https://de.openbeautyfacts.org/cgi/search.pl?search_simple=1&action=process&json=1.json`;
    return this.httpClient
      .get<ProductsResponse>(url, { params: params })
      .pipe(
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

  private getQueryparams(
    tag: string,
    page: number,
    pageSize: number,
    filter: ApiFilter
  ): HttpParams {
    let params = new HttpParams();
    if (!!tag) {
      params = params.append('search_terms', tag);
    }
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());
    let tagIndex = 0;
    if (!!filter.allergen) {
      params = this.addTagQuery(params, tagIndex, 'allergens', filter.allergen);
      tagIndex++;
    }
    if (!!filter.category) {
      params = this.addTagQuery(
        params,
        tagIndex,
        'categories',
        filter.category
      );
      tagIndex++;
    }
    if (!!filter.brand) {
      params = this.addTagQuery(params, tagIndex, 'brands', filter.brand);
      tagIndex++;
    }
    if (!!filter.ingredientsFromPalmOil) {
      params = params.append(
        `ingredients_from_palm_oil`,
        filter.ingredientsFromPalmOil
      );
    }
    if (!!filter.sortBy) {
      params = params.append(`sort_by`, filter.sortBy);
    }

    return params;
  }

  private addTagQuery(
    params: HttpParams,
    tagIndex: number,
    tagName: string,
    tagValue: string
  ): HttpParams {
    params = params.append(`tagtype_${tagIndex}`, tagName);
    params = params.append(`tag_contains_${tagIndex}`, 'contains');
    params = params.append(`tag_${tagIndex}`, tagValue);

    return params;
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
