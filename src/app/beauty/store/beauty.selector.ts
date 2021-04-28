import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
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

export const selectCountryNames = createSelector(
  getNutritionState,
  (state: BeautyState) => state.countryNames
);

export const selectCountryNamesByTags = createSelector(
  selectCountryNames,
  (countryNames: LocalizedName[], tags: string[]) =>
    countryNames
      .filter((countryName) => tags.includes(countryName.key))
      .map((countryName) => countryName.value)
      .join(', ')
);

export const selectLoading = createSelector(
  getNutritionState,
  (state: BeautyState) => state.loading
);

export const selectCurrentPage = createSelector(
  getNutritionState,
  (state: BeautyState) => state.curentPage
);

export const selectTotalItems = createSelector(
  getNutritionState,
  (state: BeautyState) => state.totalItems
);

export const selectPageSize = createSelector(
  getNutritionState,
  (state: BeautyState) => state.pageSize
);

export const selectSearchTerm = createSelector(
  getNutritionState,
  (state: BeautyState) => state.searchTerm
);
