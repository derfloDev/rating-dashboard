import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LoadMetadataService } from 'src/app/shared/services/load-metadata.service';
import { OpenBeautyfactsService } from '../services/open-beautyfacts.service';
import * as BeautyActions from './beauty.actions';
import { selectProduct } from './beauty.selector';

@Injectable()
export class BeautyEffects {
  loadFacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.loadFacts),
      concatLatestFrom(() => this.store.select(selectProduct)),
      mergeMap(([action, product]) => {
        if (!!product) {
          return of(BeautyActions.factsLoaded({ product: product }));
        } else {
          return this.openBeautyfactsService.getFacts(action.barcode).pipe(
            map((product) => BeautyActions.factsLoaded({ product: product })),
            catchError((error) => {
              console.log(error);
              return of(BeautyActions.factsLoadedError({ error: error }));
            })
          );
        }
      })
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.searchProducts),
      exhaustMap((action) => {
        this.router.navigate([`/beauty/products/${action.searchTerm}`]);
        return this.openBeautyfactsService
          .searchProducts(action.searchTerm)
          .pipe(
            map((products) =>
              BeautyActions.productsLoaded({ products: products })
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
        ofType(BeautyActions.factsLoaded),
        map((action) => {
          this.router.navigate([`/beauty/product/${action.product.code}`]);
        })
      ),
    { dispatch: false }
  );

  factsLoadedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BeautyActions.factsLoadedError),
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

  constructor(
    private actions$: Actions,
    private openBeautyfactsService: OpenBeautyfactsService,
    private router: Router,
    private notificationService: NotificationService,
    private loadMetadataService: LoadMetadataService,
    private store: Store
  ) {}
}
