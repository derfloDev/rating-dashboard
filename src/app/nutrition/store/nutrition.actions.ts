import { createAction, props } from '@ngrx/store';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';

export const loadProduct = createAction(
  '[Nutrition] load product',
  props<{ barcode: string }>()
);
export const productLoaded = createAction(
  '[Nutrition] product loaded',
  props<{ product: Product }>()
);
export const productLoadedError = createAction(
  '[Nutrition] product loaded error',
  props<{ error: any }>()
);

export const search = createAction(
  '[Nutrition] search',
  props<{ searchTerm: string; page: number }>()
);

export const searchProducts = createAction(
  '[Nutrition] search products',
  props<{ searchTerm: string; page: number }>()
);
export const productsLoaded = createAction(
  '[Nutrition] products loaded',
  props<{ products: Product[]; totalItems: number }>()
);
export const productsLoadedError = createAction(
  '[Nutrition] products loaded error',
  props<{ error: any }>()
);

export const loadLocalizedNutrientNames = createAction(
  '[Nutrition] load nutrient names'
);
export const localizeNutrientNamesLoaded = createAction(
  '[Nutrition] nutrient names loaded',
  props<{ names: LocalizedName[] }>()
);
export const localizedNutrientNamesLoadedError = createAction(
  '[Nutrition] nutrient names loaded error',
  props<{ error: any }>()
);

export const loadLocalizedIngredientNames = createAction(
  '[Nutrition] load ingredient names'
);
export const localizedIngredientNamesLoaded = createAction(
  '[Nutrition] ingredient names loaded',
  props<{ names: LocalizedName[] }>()
);
export const localizedIngredientNamesLoadedError = createAction(
  '[Nutrition] ingredient names loaded error',
  props<{ error: any }>()
);

export const loadLocalizedIngredientAnalysisNames = createAction(
  '[Nutrition] load ingredient analysis names'
);
export const localizedIngredientAnalysisNamesLoaded = createAction(
  '[Nutrition] ingredient analysis names loaded',
  props<{ names: LocalizedName[] }>()
);
export const localizedIngredientAnalysisNamesLoadedError = createAction(
  '[Nutrition] ingredient analysis names loaded error',
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
