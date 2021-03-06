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

export const selectCurrentPage = createSelector(
  getNutritionState,
  (state: NutritionState) => state.curentPage
);

export const selectTotalItems = createSelector(
  getNutritionState,
  (state: NutritionState) => state.totalItems
);

export const selectPageSize = createSelector(
  getNutritionState,
  (state: NutritionState) => state.pageSize
);

export const selectSearchTerm = createSelector(
  getNutritionState,
  (state: NutritionState) => state.searchTerm
);

export const selectFavorites = createSelector(
  getNutritionState,
  (state: NutritionState) => state.favorites
);

export const selectSearchFilter = createSelector(
  getNutritionState,
  (state: NutritionState) => state.searchFilter
);

export const selectAllergenNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.allergenNames
);

export const selectCategoryNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.categoryNames
);

export const selectBrandNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.brandNames
);

export const selectAdditiveNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.additiveNames
);

export const selectNutrientLevelNames = createSelector(
  getNutritionState,
  (state: NutritionState) => state.nutrientLevelNames
);
