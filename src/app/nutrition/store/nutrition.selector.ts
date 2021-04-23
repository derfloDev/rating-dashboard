import { createFeatureSelector, createSelector } from '@ngrx/store';
import { nurtitionFeatureKey, NutritionState } from './nutrition.reducer';

export const getNutritionState = createFeatureSelector<NutritionState>(
  nurtitionFeatureKey
);

export const selectProduct = createSelector(
  getNutritionState,
  (state: NutritionState) => state.currentProduct
);

export const selectNutritienNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.nutritientNames
);

export const selectIngredientNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.ingredientNames
);

export const selectIngredientAnalysisNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.ingredientAnalysisNames
);

export const selectProducts = createSelector(
  getNutritionState,
  (state: NutritionState) => state.products
);

export const selectLoading = createSelector(
  getNutritionState,
  (state: NutritionState) => state.loading
);
