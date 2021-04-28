import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LoadMetadataService } from 'src/app/shared/services/load-metadata.service';
import { OpenBeautyfactsService } from '../services/open-beautyfacts.service';
import * as BeautyActions from './beauty.actions';
import { selectPageSize, selectProduct } from './beauty.selector';

@Injectable()
export class BeautyEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.loadProduct),
      concatLatestFrom(() => this.store.select(selectProduct)),
      mergeMap(([action, product]) => {
        if (!!product) {
          return of(BeautyActions.productLoaded({ product: product }));
        } else {
          return this.openBeautyfactsService.getFacts(action.barcode).pipe(
            map((product) => BeautyActions.productLoaded({ product: product })),
            catchError((error) => {
              console.log(error);
              return of(BeautyActions.productLoadedError({ error: error }));
            })
          );
        }
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.search),
      map((action) => {
        if (isNaN(parseInt(action.searchTerm))) {
          return BeautyActions.searchProducts({
            searchTerm: action.searchTerm,
            page: action.page,
          });
        } else {
          return BeautyActions.loadProduct({ barcode: action.searchTerm });
        }
      })
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.searchProducts),
      withLatestFrom(this.store.select(selectPageSize)),
      exhaustMap(([action, pageSize]) => {
        this.router.navigate([`/beauty/products/${action.searchTerm}`]);
        return this.openBeautyfactsService
          .searchProducts(action.searchTerm, action.page, pageSize)
          .pipe(
            map((response) =>
              BeautyActions.productsLoaded({
                products: response.products,
                totalItems: response.count,
              })
            ),
            catchError((error) => {
              console.log(error);
              return of(BeautyActions.productsLoadedError({ error: error }));
            })
          );
      })
    )
  );

  factsLoaded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BeautyActions.productLoaded),
        map((action) => {
          this.router.navigate([`/beauty/product/${action.product.code}`]);
        })
      ),
    { dispatch: false }
  );

  factsLoadedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BeautyActions.productLoadedError),
        map((action) => {
          this.notificationService.error(action.error);
        })
      ),
    { dispatch: false }
  );

  loadLocalizedIngredAnalysisientNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.loadLocalizedIngredientAnalysisNames),
      mergeMap(() =>
        this.loadMetadataService.getLocalizedIngredientAnalysisNames().pipe(
          map((names) =>
            BeautyActions.localizedIngredientAnalysisNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              BeautyActions.localizedIngredientAnalysisNamesLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.loadCountryNames),
      mergeMap(() =>
        this.loadMetadataService.getCountryNames().pipe(
          map((names) =>
            BeautyActions.countryNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              BeautyActions.countryNamesLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private openBeautyfactsService: OpenBeautyfactsService,
    private router: Router,
    private notificationService: NotificationService,
    private loadMetadataService: LoadMetadataService,
    private store: Store
  ) {}
}
