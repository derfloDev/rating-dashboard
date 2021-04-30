import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductsResponse } from '../model/product';
import { ApiFilter } from 'src/app/shared/models/api-filter';
import { NutrimentFilter } from 'src/app/shared/models/nutriment-filter';

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
    pageSize: number,
    filter: ApiFilter
  ): Observable<ProductsResponse> {
    const params = this.getQueryparams(tag, page, pageSize, filter);
    const url = `https://de.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=true`;
    return this.httpClient
      .get<any>(url, { params: params })
      .pipe(
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
    if (!!filter.additive) {
      params = this.addTagQuery(params, tagIndex, 'additives', filter.additive);
      tagIndex++;
    }
    if (!!filter.nutritionGrade) {
      params = this.addTagQuery(
        params,
        tagIndex,
        'nutrition_grades',
        filter.nutritionGrade
      );
      tagIndex++;
    }
    if (!!filter.ingredientsFromPalmOil) {
      params = params.append(
        `ingredients_from_palm_oil`,
        filter.ingredientsFromPalmOil
      );
    }
    if (!!filter.sortBy) {
      params = params.append(`sort_by `, filter.sortBy);
    }

    params = this.addNutrimentsQuery(params, filter.nutriments);

    return params;
  }

  private addNutrimentsQuery(
    params: HttpParams,
    nutriments: NutrimentFilter[]
  ): HttpParams {
    nutriments.forEach(
      (nutriment, index) =>
        (params = this.addNutrimentQuery(
          params,
          index,
          nutriment.key,
          nutriment.operator,
          nutriment.value
        ))
    );

    return params;
  }

  private addNutrimentQuery(
    params: HttpParams,
    nutrimentIndex: number,
    nutrimentKey: string,
    nutrimentOperator: string,
    nutrimentValue: string
  ): HttpParams {
    params = params.append(
      `nutriment_${nutrimentIndex}`,
      nutrimentKey.replace(/^[^:]+:/, '')
    );
    params = params.append(
      `nutriment_compare_${nutrimentIndex}`,
      nutrimentOperator
    );
    params = params.append(`nutriment_value_${nutrimentIndex}`, nutrimentValue);

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
}
