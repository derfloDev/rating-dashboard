import { createAction, props } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';

export const loadFacts = createAction(
  '[Nutrition] load facts',
  props<{ barcode: string }>()
);
export const factsLoaded = createAction(
  '[Nutrition] facts loaded',
  props<{ product: Product }>()
);
export const factsLoadedError = createAction(
  '[Nutrition] facts loaded error',
  props<{ error: any }>()
);

export const searchProducts = createAction(
  '[Nutrition] search products',
  props<{ searchTerm: string }>()
);
export const productsLoaded = createAction(
  '[Nutrition] products loaded',
  props<{ products: Product[] }>()
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
