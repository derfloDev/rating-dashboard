import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalizedName } from 'src/app/shared/models/localized-name';

@Injectable({
  providedIn: 'root',
})
export class LoadMetadataService {
  constructor(private httpClient: HttpClient) {}

  getLocalizedNutrientNames(): Observable<any> {
    const url = '/.netlify/functions/getNutrients';
    return this.httpClient.get<any>(url).pipe(
      map((response: any) => {
        const nutritientNames: LocalizedName[] = response.message;
        return nutritientNames;
      })
    );
  }

  getLocalizedIngredientNames(): Observable<any> {
    const url = '/.netlify/functions/getIngredients';
    return this.httpClient.get<any>(url).pipe(
      map((response: any) => {
        const ingretientNames: LocalizedName[] = response.message;
        return ingretientNames;
      })
    );
  }

  getLocalizedIngredientAnalysisNames(): Observable<any> {
    const url = '/.netlify/functions/getIngredientAnalysis';
    return this.httpClient.get<any>(url).pipe(
      map((response: any) => {
        const ingretientAnylysisNames: LocalizedName[] = response.message;
        return ingretientAnylysisNames;
      })
    );
  }

  getCountryNames(): Observable<any> {
    const url = '/.netlify/functions/getCountries';
    return this.httpClient.get<any>(url).pipe(
      map((response: any) => {
        const ingretientAnylysisNames: LocalizedName[] = response.message;
        return ingretientAnylysisNames;
      })
    );
  }
}
