import { createAction, props } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
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

export const loadCountryNames = createAction(
  '[Beauty] load countries'
);
export const countryNamesLoaded = createAction(
  '[Beauty] countries loaded',
  props<{ names: LocalizedName[] }>()
);
export const countryNamesLoadedError = createAction(
  '[Beauty] countries loaded error',
  props<{ error: any }>()
);

export const loadLocalizedIngredientAnalysisNames = createAction(
  '[Beauty] load ingredient analysis names'
);
export const localizedIngredientAnalysisNamesLoaded = createAction(
  '[Beauty] ingredient analysis names loaded',
  props<{ names: LocalizedName[] }>()
);
export const localizedIngredientAnalysisNamesLoadedError = createAction(
  '[Beauty] ingredient analysis names loaded error',
  props<{ error: any }>()
);
