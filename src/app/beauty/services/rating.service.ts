import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private httpClient: HttpClient) {}

  addRating(): Observable<any> {
    const url = '/.netlify/functions/add-product-rating';
    return this.httpClient.post<any>(url, {}).pipe(
      map((response: any) => {
        const nutritientNames: LocalizedName[] = response.message;
        return nutritientNames;
      })
    );
  }
}
