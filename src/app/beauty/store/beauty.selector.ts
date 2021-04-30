import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import BeautyState, { beautyFeatureKey } from './beauty.reducer';

export const getBeautyState = createFeatureSelector<BeautyState>(
  beautyFeatureKey
);

export const selectProduct = createSelector(
  getBeautyState,
  (state: BeautyState) => state.currentProduct
);

export const selectProducts = createSelector(
  getBeautyState,
  (state: BeautyState) => state.products
);

export const selectIngredientAnalysisNames = createSelector(
  getBeautyState,
  (state: BeautyState) => state.ingredientAnalysisNames
);

export const selectCountryNames = createSelector(
  getBeautyState,
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
  getBeautyState,
  (state: BeautyState) => state.loading
);

export const selectCurrentPage = createSelector(
  getBeautyState,
  (state: BeautyState) => state.curentPage
);

export const selectTotalItems = createSelector(
  getBeautyState,
  (state: BeautyState) => state.totalItems
);

export const selectPageSize = createSelector(
  getBeautyState,
  (state: BeautyState) => state.pageSize
);

export const selectSearchTerm = createSelector(
  getBeautyState,
  (state: BeautyState) => state.searchTerm
);

export const selectFavorites = createSelector(
  getBeautyState,
  (state: BeautyState) => state.favorites
);

export const selectSearchFilter = createSelector(
  getBeautyState,
  (state: BeautyState) => state.searchFilter
);

export const selectAllergenNames = createSelector(
  getBeautyState,
  (state: BeautyState) => state.allergenNames
);

export const selectCategoryNames = createSelector(
  getBeautyState,
  (state: BeautyState) => state.categoryNames
);

export const selectBrandNames = createSelector(
  getBeautyState,
  (state: BeautyState) => state.brandNames
);

export const selectAdditiveNames = createSelector(
  getBeautyState,
  (state: BeautyState) => state.additiveNames
);
