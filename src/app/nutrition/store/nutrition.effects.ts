import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { LoadMetadataService } from 'src/app/shared/services/load-metadata.service';
import { OpenfoodfactsService } from '../services/openfoodfacts.service';
import * as NutritionActions from './nutrition.actions';
import { selectProduct } from './nutrition.selector';

@Injectable()
export class NutritionEffects {
  loadLocalizedNutrientNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadLocalizedNutrientNames),
      concatLatestFrom(() => this.store.select(selectProduct)),
      mergeMap(([action, product]) => {
        if (!!product) {
          return of(NutritionActions.factsLoaded({ product: product }));
        } else {
          return this.openFoodfactsService.getLocalizedNutrientNames().pipe(
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
          );
        }
      })
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

  loadFacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadFacts),
      mergeMap((action) =>
        this.openFoodfactsService.getFacts(action.barcode).pipe(
          map((product) => NutritionActions.factsLoaded({ product: product })),
          catchError((error) => {
            console.log(error);
            return of(NutritionActions.factsLoadedError({ error: error }));
          })
        )
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.searchProducts),
      exhaustMap((action) => {
        this.router.navigate([`/nutrition/products/${action.searchTerm}`]);
        return this.openFoodfactsService.searchProducts(action.searchTerm).pipe(
          map((products) =>
            NutritionActions.productsLoaded({ products: products })
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
        ofType(NutritionActions.factsLoaded),
        map((action) => {
          this.router.navigate([`/nutrition/product/${action.product.code}`]);
        })
      ),
    { dispatch: false }
  );

  factsLoadedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NutritionActions.factsLoadedError),
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
