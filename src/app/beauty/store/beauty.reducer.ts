import { createReducer, on } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';
import * as BeautyActions from './beauty.actions';

export default interface BeautyState {
  loading: boolean;
  currentProduct?: Product;
  products: Product[];
  ingredientAnalysisNames: LocalizedName[];
}

export const initialBeautyState: BeautyState = {
  products: [],
  loading: false,
  ingredientAnalysisNames: [],
};

export const beautyFeatureKey = 'beauty';

export const beautyReducer = createReducer(
  initialBeautyState,
  on(BeautyActions.loadFacts, (state) => ({
    ...state,
    loading: true,
  })),
  on(BeautyActions.factsLoaded, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: action.product,
  })),
  on(BeautyActions.factsLoadedError, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: null,
  })),
  on(BeautyActions.searchProducts, (state, action) => ({
    ...state,
    products: [],
    loading: true,
  })),
  on(BeautyActions.productsLoaded, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
  })),
  on(BeautyActions.productsLoadedError, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(BeautyActions.localizedIngredientAnalysisNamesLoaded, (state, action) => ({
    ...state,
    ingredientAnalysisNames: action.names,
  }))
);
