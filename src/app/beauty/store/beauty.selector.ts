import { createFeatureSelector, createSelector } from '@ngrx/store';
import BeautyState, { beautyFeatureKey } from './beauty.reducer';

export const getNutritionState = createFeatureSelector<BeautyState>(
  beautyFeatureKey
);

export const selectProduct = createSelector(
  getNutritionState,
  (state: BeautyState) => state.currentProduct
);

export const selectProducts = createSelector(
  getNutritionState,
  (state: BeautyState) => state.products
);

export const selectIngredientAnalysisNames = createSelector(
  getNutritionState,
  (state: BeautyState) => state.ingredientAnalysisNames
);

export const selectLoading = createSelector(
  getNutritionState,
  (state: BeautyState) => state.loading
);
