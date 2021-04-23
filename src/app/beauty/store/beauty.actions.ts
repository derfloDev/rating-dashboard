import { createAction, props } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';

export const loadFacts = createAction(
  '[Beauty] load facts',
  props<{ barcode: string }>()
);
export const factsLoaded = createAction(
  '[Beauty] facts loaded',
  props<{ product: Product }>()
);
export const factsLoadedError = createAction(
  '[Beauty] facts loaded error',
  props<{ error: any }>()
);

export const searchProducts = createAction(
  '[Beauty] search products',
  props<{ searchTerm: string }>()
);
export const productsLoaded = createAction(
  '[Beauty] products loaded',
  props<{ products: Product[] }>()
);
export const productsLoadedError = createAction(
  '[Beauty] products loaded error',
  props<{ error: any }>()
);

// export const loadIngredientNames = createAction(
//   '[Beauty] load ingredient names'
// );
// export const ingredientNamesLoaded = createAction(
//   '[Beauty] ingredient names loaded',
//   props<{ names: NutritientName[] }>()
// );
// export const ingredientNamesLoadedError = createAction(
//   '[Beauty] ingredient names loaded error',
//   props<{ error: any }>()
// );

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
