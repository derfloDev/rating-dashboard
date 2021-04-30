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

  getBeautyAllergenNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getBeautyAllergens';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getBeautyBrandNames(): Observable<BrandName[]> {
    const url = '/.netlify/functions/getBeautyBrands';
    return this.httpClient.get<BrandName[]>(url);
  }

  getBeautyCategoryNames(): Observable<CategoryName[]> {
    const url = '/.netlify/functions/getBeautyCategories';
    return this.httpClient.get<CategoryName[]>(url);
  }

  getNutritionAllergenNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getNutritionAllergens';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getNutritionBrandNames(): Observable<BrandName[]> {
    const url = '/.netlify/functions/getNutritionBrands';
    return this.httpClient.get<BrandName[]>(url);
  }

  getNutritionAdditiveNames(): Observable<CategoryName[]> {
    const url = '/.netlify/functions/getNutritionAdditives';
    return this.httpClient.get<CategoryName[]>(url);
  }

  getNutrientLevels(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getNutrientLevels';
    return this.httpClient.get<LocalizedName[]>(url);
  }

  getBeautyAdditiveNames(): Observable<CategoryName[]> {
    const url = '/.netlify/functions/getBeautyAdditives';
    return this.httpClient.get<CategoryName[]>(url);
  }

  getNutritionCategoryNames(): Observable<CategoryName[]> {
    const url = '/.netlify/functions/getNutritionCategories';
    return this.httpClient.get<CategoryName[]>(url);
  }

  getCountryNames(): Observable<LocalizedName[]> {
    const url = '/.netlify/functions/getCountries';
    return this.httpClient.get<LocalizedName[]>(url);
  }
}
