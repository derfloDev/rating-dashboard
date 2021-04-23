import { createReducer, on } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';
import * as NutritionActions from './nutrition.actions';

export interface NutritionState {
  loading: boolean;
  currentProduct?: Product;
  products: Product[];
  nutritientNames: LocalizedName[];
  ingredientNames: LocalizedName[];
  ingredientAnalysisNames: LocalizedName[];
}

export const initialNutritionState: NutritionState = {
  products: [],
  loading: false,
  nutritientNames: [],
  ingredientNames: [],
  ingredientAnalysisNames: [],
};

export const nurtitionFeatureKey = 'nutrition';

export const nutritionReducer = createReducer(
  initialNutritionState,
  on(NutritionActions.loadFacts, (state) => ({
    ...state,
    loading: true,
    currentProduct: null,
  })),
  on(NutritionActions.searchProducts, (state) => ({
    ...state,
    loading: true,
    products: [],
  })),
  on(NutritionActions.factsLoaded, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: action.product,
  })),
  on(NutritionActions.factsLoadedError, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: null,
  })),
  on(NutritionActions.localizeNutrientNamesLoaded, (state, action) => ({
    ...state,
    nutritientNames: action.names,
  })),
  on(NutritionActions.localizedIngredientNamesLoaded, (state, action) => ({
    ...state,
    ingredientNames: action.names,
  })),
  on(
    NutritionActions.localizedIngredientAnalysisNamesLoaded,
    (state, action) => ({
      ...state,
      ingredientAnalysisNames: action.names,
    })
  ),
  on(NutritionActions.productsLoaded, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
  }))
);
