import { createFeatureSelector, createSelector } from "@ngrx/store";
import { nurtitionFeatureKey, NutritionState } from "./nutrition.reducer";

export const getNutritionState = createFeatureSelector<NutritionState>(nurtitionFeatureKey);

export const selectProduct = createSelector(
    getNutritionState,
    (state: NutritionState) => state.currentProduct
);

export const selectNutritienNames = createSelector(
    getNutritionState,
    (state: NutritionState) => state.nutritientNames
);