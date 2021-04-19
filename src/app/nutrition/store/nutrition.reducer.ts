import { createReducer, on } from '@ngrx/store';
import { NutritientName } from '../model/nutritient-name';
import { Product } from '../model/product';
import * as NutritionActions from './nutrition.actions';

export interface NutritionState {
    loading: boolean
    currentProduct?: Product
    products: Product[]
    nutritientNames: NutritientName[]
    ingredientNames: NutritientName[]
    ingredientAnalysisNames: NutritientName[]
}

export const initialNutritionState: NutritionState = {
    products: [],
    loading: false,
    nutritientNames: [],
    ingredientNames: [],
    ingredientAnalysisNames: []
};

export const nurtitionFeatureKey = 'nutrition';

export const nutritionReducer = createReducer(
    initialNutritionState,
    on(NutritionActions.loadFacts, (state) => ({ ...state, loading: true, currentProduct: null })),
    on(NutritionActions.factsLoaded, (state, action) => ({ ...state, loading: false, currentProduct: action.product })),
    on(NutritionActions.factsLoadedError, (state, action) => ({ ...state, loading: false, currentProduct: null })),
    on(NutritionActions.nutrientNamesLoaded, (state, action) => ({ ...state, nutritientNames: action.names })),
    on(NutritionActions.ingredientNamesLoaded, (state, action) => ({ ...state, ingredientNames: action.names })),
    on(NutritionActions.ingredientAnalysisNamesLoaded, (state, action) => ({ ...state, ingredientAnalysisNames: action.names }))
);
