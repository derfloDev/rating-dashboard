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
import { OpenfoodfactsService } from '../services/openfoodfacts.service';
import * as NutritionActions from './nutrition.actions';
import { selectPageSize, selectProduct } from './nutrition.selector';

@Injectable()
export class NutritionEffects {
  loadLocalizedNutrientNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadLocalizedNutrientNames),
      mergeMap(() =>
        this.openFoodfactsService.getLocalizedNutrientNames().pipe(
          map((names) =>
            NutritionActions.localizeNutrientNamesLoaded({ names: names })
          ),
          catchError((error) => {
            return of(
              NutritionActions.localizedNutrientNamesLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadIngredientNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadLocalizedIngredientNames),
      mergeMap(() =>
        this.openFoodfactsService.getIngredientNames().pipe(
          map((names) =>
            NutritionActions.localizedIngredientNamesLoaded({ names: names })
          ),
          catchError((error) => {
            return of(
              NutritionActions.localizedIngredientNamesLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadLocalizedIngredAnalysisientNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadLocalizedIngredientAnalysisNames),
      mergeMap(() =>
        this.loadMetadataService.getLocalizedIngredientAnalysisNames().pipe(
          map((names) =>
            NutritionActions.localizedIngredientAnalysisNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.localizedIngredientAnalysisNamesLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadProduct),
      concatLatestFrom(() => this.store.select(selectProduct)),
      mergeMap(([action, product]) => {
        if (!!product) {
          return of(NutritionActions.productLoaded({ product: product }));
        } else {
          return this.openFoodfactsService.getFacts(action.barcode).pipe(
            map((product) => {
              return NutritionActions.productLoaded({ product: product });
            }),
            catchError((error) => {
              console.log(error);
              return of(NutritionActions.productLoadedError({ error: error }));
            })
          );
        }
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.search),
      map((action) => {
        if (isNaN(parseInt(action.searchTerm))) {
          return NutritionActions.searchProducts({
            searchTerm: action.searchTerm,
            page: action.page,
          });
        } else {
          return NutritionActions.loadProduct({ barcode: action.searchTerm });
        }
      })
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.searchProducts),
      withLatestFrom(this.store.select(selectPageSize)),
      exhaustMap(([action, pageSize]) => {
        this.router.navigate([`/nutrition/products/${action.searchTerm}`]);
        return this.openFoodfactsService
          .searchProducts(action.searchTerm, action.page, pageSize)
          .pipe(
            map((response) =>
              NutritionActions.productsLoaded({
                products: response.products,
                totalItems: response.count,
              })
            ),
            catchError((error) => {
              console.log(error);
              return of(NutritionActions.productsLoadedError({ error: error }));
            })
          );
      })
    )
  );

  factsLoaded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NutritionActions.productLoaded),
        map((action) => {
          this.router.navigate([`/nutrition/product/${action.product.code}`]);
        })
      ),
    { dispatch: false }
  );

  factsLoadedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NutritionActions.productLoadedError),
        map((action) => {
          this.notificationService.error(action.error);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private openFoodfactsService: OpenfoodfactsService,
    private router: Router,
    private notificationService: NotificationService,
    private loadMetadataService: LoadMetadataService,
    private store: Store
  ) {}
}
