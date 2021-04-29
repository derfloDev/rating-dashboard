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
import {
  selectPageSize,
  selectProduct,
  selectSearchFilter,
  selectSearchTerm,
} from './beauty.selector';
import { FavoriteService } from '../services/favorite.service';

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
      withLatestFrom(this.store.select(selectSearchFilter)),
      map(([action, searchFilter]) => {
        if (action.searchTerm == '' && Object.keys(!searchFilter).length == 0) {
          return BeautyActions.resetProducts();
        } else if (isNaN(parseInt(action.searchTerm))) {
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
      withLatestFrom(
        this.store.select(selectPageSize),
        this.store.select(selectSearchFilter)
      ),
      exhaustMap(([action, pageSize, filter]) => {
        this.router.navigate([`/beauty/products/${action.searchTerm}`]);
        return this.openBeautyfactsService
          .searchProducts(action.searchTerm, action.page, pageSize, filter)
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
              BeautyActions.metadataLoadedError({
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
              BeautyActions.metadataLoadedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.loadFavorites),
      mergeMap(() =>
        this.favoriteService.get().pipe(
          map((favorites) =>
            BeautyActions.favoritesLoaded({
              favorites: favorites,
            })
          ),
          catchError((error) => {
            return of(
              BeautyActions.favoritesLoadedError({
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
      ofType(BeautyActions.addFavorite),
      mergeMap((action) =>
        this.favoriteService.add(action.product).pipe(
          map(() => BeautyActions.favoriteAdded()),
          catchError((error) => {
            return of(
              BeautyActions.favoriteAddedError({
                error: error,
              })
            );
          })
        )
      )
    )
  );

  favoriteAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.favoriteAdded),
      map(() => BeautyActions.loadFavorites())
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.removeFavorite),
      mergeMap((action) =>
        this.favoriteService.remove(action.productId).pipe(
          map(() => BeautyActions.favoriteRemoved()),
          catchError((error) => {
            return of(
              BeautyActions.favoriteRemovedError({
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
      ofType(BeautyActions.favoriteRemoved),
      map(() => BeautyActions.loadFavorites())
    )
  );

  changeServerSearchFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.changeServerSearchFilter),
      withLatestFrom(this.store.select(selectSearchTerm)),
      map(([action, searchTerm]) =>
        BeautyActions.searchProducts({ searchTerm: searchTerm, page: 1 })
      )
    )
  );

  loadCategoryNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeautyActions.loadCategoryNames),
      mergeMap(() =>
        this.loadMetadataService.getCategoryNames().pipe(
          map((names) =>
            BeautyActions.categoryNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              BeautyActions.metadataLoadedError({
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
      ofType(BeautyActions.loadAllergenNames),
      mergeMap(() =>
        this.loadMetadataService.getAllergenNames().pipe(
          map((names) =>
            BeautyActions.allergenNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              BeautyActions.metadataLoadedError({
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
      ofType(BeautyActions.loadBrandNames),
      mergeMap(() =>
        this.loadMetadataService.getBrandNames().pipe(
          map((names) =>
            BeautyActions.brandNamesLoaded({
              names: names,
            })
          ),
          catchError((error) => {
            return of(
              BeautyActions.metadataLoadedError({
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
    private store: Store,
    private favoriteService: FavoriteService
  ) {}
}
