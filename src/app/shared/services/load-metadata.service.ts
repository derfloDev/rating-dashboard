import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { BrandName } from '../models/brand-name';
import { CategoryName } from '../models/category-name';

@Injectable({
  providedIn: 'root',
})
export class LoadMetadataService {
  constructor(private httpClient: HttpClient) {}

  getLocalizedNutrientNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getNutrients';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getLocalizedIngredientNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getIngredients';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getLocalizedIngredientAnalysisNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getIngredientAnalysis';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getAllergenNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getBeautyAllergens';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getBrandNames(): Observable<BrandName[]> {
    const url = '/.netlify/functions/getBeautyBrands';
    return this.httpClient.get<BrandName[]>(url);
  }

  getCategoryNames(): Observable<CategoryName[]> {
    const url = '/.netlify/functions/getBeautyCategories';
    return this.httpClient.get<CategoryName[]>(url);
  }

  getCountryNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getCountries';
    return this.httpClient.get<LocalizedName[]>(url);
  }
}
