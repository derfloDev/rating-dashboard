import { createAction, props } from '@ngrx/store';
import { BrandName } from 'src/app/shared/models/brand-name';
import { CategoryName } from 'src/app/shared/models/category-name';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { ApiFilter } from '../model/api-filter';
import { Product } from '../model/product';

export const loadProduct = createAction(
  '[Beauty] load product',
  props<{ barcode: string }>()
);
export const productLoaded = createAction(
  '[Beauty] product loaded',
  props<{ product: Product }>()
);
export const productLoadedError = createAction(
  '[Beauty] product loaded error',
  props<{ error: any }>()
);

export const search = createAction(
  '[Beauty] search',
  props<{ searchTerm: string; page: number }>()
);

export const resetProducts = createAction('[Beauty] reset products');
export const searchProducts = createAction(
  '[Beauty] search products',
  props<{ searchTerm: string; page: number }>()
);
export const productsLoaded = createAction(
  '[Beauty] products loaded',
  props<{ products: Product[]; totalItems: number }>()
);
export const productsLoadedError = createAction(
  '[Beauty] products loaded error',
  props<{ error: any }>()
);

export const loadCountryNames = createAction('[Beauty] load countries');
export const countryNamesLoaded = createAction(
  '[Beauty] countries loaded',
  props<{ names: LocalizedName[] }>()
);
export const loadLocalizedIngredientAnalysisNames = createAction(
  '[Beauty] load ingredient analysis names'
);
export const localizedIngredientAnalysisNamesLoaded = createAction(
  '[Beauty] ingredient analysis names loaded',
  props<{ names: LocalizedName[] }>()
);
export const metadataLoadedError = createAction(
  '[Beauty] metadata loaded error',
  props<{ error: any }>()
);

export const loadFavorites = createAction('[Nutrition] load favorites');
export const favoritesLoaded = createAction(
  '[Nutrition] favorites loaded',
  props<{ favorites: Favorite[] }>()
);
export const favoritesLoadedError = createAction(
  '[Nutrition] favorites loaded error',
  props<{ error: any }>()
);

export const addFavorite = createAction(
  '[Nutrition] add favorite',
  props<{ product: Product }>()
);
export const favoriteAdded = createAction('[Nutrition] favorite added');
export const favoriteAddedError = createAction(
  '[Nutrition] favorite added error',
  props<{ error: any }>()
);

export const removeFavorite = createAction(
  '[Nutrition] removed favorite',
  props<{ productId: string }>()
);
export const favoriteRemoved = createAction('[Nutrition] favorite removed');
export const favoriteRemovedError = createAction(
  '[Nutrition] favorite removed error',
  props<{ error: any }>()
);

export const changeClientSearchFilter = createAction(
  '[Nutrition] change client search filter',
  props<{ filter: any }>()
);

export const changeServerSearchFilter = createAction(
  '[Nutrition] change server search filter',
  props<{ filter: ApiFilter }>()
);

export const loadBrandNames = createAction('[Beauty] load brand names');
export const brandNamesLoaded = createAction(
  '[Beauty] brand names loaded',
  props<{ names: BrandName[] }>()
);

export const loadCategoryNames = createAction('[Beauty] load category names');
export const categoryNamesLoaded = createAction(
  '[Beauty] category names loaded',
  props<{ names: CategoryName[] }>()
);

export const loadAllergenNames = createAction('[Beauty] load allergen names');
export const allergenNamesLoaded = createAction(
  '[Beauty] allergen names loaded',
  props<{ names: LocalizedName[] }>()
);
