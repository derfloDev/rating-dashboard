import { createAction, props } from '@ngrx/store';
import { NutritientName } from '../model/nutritient-name';
import { Product } from '../model/product';

export const loadFacts = createAction('[Nutrition] load facts', props<{ barcode: string }>());
export const factsLoaded = createAction('[Nutrition] facts loaded', props<{ product: Product }>());
export const factsLoadedError = createAction('[Nutrition] facts loaded error', props<{ error: any }>());

export const loadNutrientNames = createAction('[Nutrition] load nutrient names');
export const nutrientNamesLoaded = createAction('[Nutrition] nutrient names loaded', props<{ names: NutritientName[] }>());
export const nutrientNamesLoadedError = createAction('[Nutrition] nutrient names loaded error', props<{ error: any }>());

export const loadIngredientNames = createAction('[Nutrition] load ingredient names');
export const ingredientNamesLoaded = createAction('[Nutrition] ingredient names loaded', props<{ names: NutritientName[] }>());
export const ingredientNamesLoadedError = createAction('[Nutrition] ingredient names loaded error', props<{ error: any }>());

export const loadIngredientAnalysisNames = createAction('[Nutrition] load ingredient analysis names');
export const ingredientAnalysisNamesLoaded = createAction('[Nutrition] ingredient analysis names loaded', props<{ names: NutritientName[] }>());
export const ingredientAnalysisNamesLoadedError = createAction('[Nutrition] ingredient analysis names loaded error', props<{ error: any }>());