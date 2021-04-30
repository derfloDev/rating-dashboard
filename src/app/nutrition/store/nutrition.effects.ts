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
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LoadMetadataService } from 'src/app/shared/services/load-metadata.service';
import { OpenfoodfactsService } from '../services/openfoodfacts.service';
import * as NutritionActions from './nutrition.actions';
import {
  selectPageSize,
  selectProduct,
  selectSearchFilter,
  selectSearchTerm,
} from './nutrition.selector';
import { FavoriteService } from '../services/favorite.service';

@Injectable()
export class NutritionEffects {
  loadLocalizedNutrientNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadLocalizedNutrientNames),
      mergeMap(() =>
        this.loadMetadataService.getLocalizedNutrientNames().pipe(
          map((names) =>
            NutritionActions.localizeNutrientNamesLoaded({ names: names })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
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
        this.loadMetadataService.getLocalizedIngredientNames().pipe(
          map((names) =>
            NutritionActions.localizedIngredientNamesLoaded({ names: names })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
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
              NutritionActions.metadataLoadedError({
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
      withLatestFrom(this.store.select(selectSearchFilter)),
      map(([action, searchFilter]) => {
        if (action.searchTerm == '' && Object.keys(searchFilter).length == 0) {
          return NutritionActions.resetProducts();
        } else if (isNaN(parseInt(action.searchTerm))) {
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
      withLatestFrom(
        this.store.select(selectPageSize),
        this.store.select(selectSearchFilter)
      ),
      switchMap(([action, pageSize, filter]) => {
        this.router.navigate([`/nutrition/products/${action.searchTerm}`]);
        return this.openFoodfactsService
          .searchProducts(action.searchTerm, action.page, pageSize, filter)
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

  addNutrimentFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.addNutrimentFilter),
      withLatestFrom(this.store.select(selectSearchFilter)),
      map(([action, filter]) => {
        const copyFilter = { ...filter };
        let index = -1;
        copyFilter.nutriments.some((nutriment, i) => {
          if (nutriment.key === action.filter.key) {
            index = i;
            return true;
          }
          return false;
        });
        if (index === -1) {
          index = copyFilter.nutriments.length;
        }
        return NutritionActions.addNutrimentFilterByIndex({
          index,
          filter: action.filter,
        });
      })
    )
  );

  removeNutrimentFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.removeNutrimentFilter),
      withLatestFrom(this.store.select(selectSearchFilter)),
      map(([action, filter]) => {
        const copyFilter = { ...filter };
        let index = -1;
        copyFilter.nutriments.some((nutriment, i) => {
          if (
            nutriment.key === action.filter.key &&
            nutriment.operator === action.filter.operator &&
            nutriment.value === action.filter.value
          ) {
            index = i;
            return true;
          }
          return false;
        });
        return NutritionActions.removeNutrimentFilterByIndex({ index });
      })
    )
  );

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadFavorites),
      mergeMap(() =>
        this.favoritesService.get().pipe(
          map((favorites) =>
            NutritionActions.favoritesLoaded({
              favorites: favorites,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.favoritesLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.addFavorite),
      mergeMap((action) =>
        this.favoritesService.add(action.product).pipe(
          map(() => NutritionActions.favoriteAdded()),
          catchError((error) => {
            return of(
              NutritionActions.favoriteAddedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  removeNutrimentFilterByIndex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.removeNutrimentFilterByIndex),
      withLatestFrom(this.store.select(selectSearchTerm)),
      switchMap(([action, searchTerm]) =>
        of(NutritionActions.search({ searchTerm, page: 1 }))
      )
    )
  );

  addNutrimentFilterByIndex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.addNutrimentFilterByIndex),
      withLatestFrom(this.store.select(selectSearchTerm)),
      map(([action, searchTerm]) =>
        NutritionActions.search({ searchTerm, page: 1 })
      )
    )
  );

  favoriteAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.favoriteAdded),
      map(() => NutritionActions.loadFavorites())
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.removeFavorite),
      mergeMap((action) =>
        this.favoritesService.remove(action.productId).pipe(
          map(() => NutritionActions.favoriteRemoved()),
          catchError((error) => {
            return of(
              NutritionActions.favoriteRemovedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  favoriteRemoved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.favoriteRemoved),
      map(() => NutritionActions.loadFavorites())
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

  changeServerSearchFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.changeServerSearchFilter),
      withLatestFrom(this.store.select(selectSearchTerm)),
      map(([action, searchTerm]) =>
        NutritionActions.searchProducts({ searchTerm: searchTerm, page: 1 })
      )
    )
  );

  loadCategoryNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadCategoryNames),
      mergeMap(() =>
        this.loadMetadataService.getNutritionCategoryNames().pipe(
          map((names) =>
            NutritionActions.categoryNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadAllergenNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadAllergenNames),
      mergeMap(() =>
        this.loadMetadataService.getNutritionAllergenNames().pipe(
          map((names) =>
            NutritionActions.allergenNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadBrandNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadBrandNames),
      mergeMap(() =>
        this.loadMetadataService.getNutritionBrandNames().pipe(
          map((names) =>
            NutritionActions.brandNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadAdditives$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadAddititveNames),
      mergeMap(() =>
        this.loadMetadataService.getNutritionAdditiveNames().pipe(
          map((names) =>
            NutritionActions.addititveNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadNutrientLevelNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadNutrientLevelNames),
      mergeMap(() =>
        this.loadMetadataService.getNutrientLevels().pipe(
          map((names) =>
            NutritionActions.nutrientLevelNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              NutritionActions.metadataLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NutritionActions.loadMetadata),
      mergeMap(() => {
        const returnValue = [];
        returnValue.push(NutritionActions.loadBrandNames());
        returnValue.push(NutritionActions.loadLocalizedNutrientNames());
        returnValue.push(NutritionActions.loadLocalizedIngredientNames());
        returnValue.push(
          NutritionActions.loadLocalizedIngredientAnalysisNames()
        );
        returnValue.push(NutritionActions.loadFavorites());
        returnValue.push(NutritionActions.loadCategoryNames());
        returnValue.push(NutritionActions.loadBrandNames());
        returnValue.push(NutritionActions.loadAllergenNames());
        returnValue.push(NutritionActions.loadAddititveNames());
        returnValue.push(NutritionActions.loadNutrientLevelNames());
        return returnValue;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private openFoodfactsService: OpenfoodfactsService,
    private router: Router,
    private notificationService: NotificationService,
    private loadMetadataService: LoadMetadataService,
    private store: Store,
    private favoritesService: FavoriteService
  ) {}
}
