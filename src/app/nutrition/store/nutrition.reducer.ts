import { createReducer, on } from '@ngrx/store';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';
import * as NutritionActions from './nutrition.actions';

export interface NutritionState {
  loading: boolean;
  searchTerm: string;
  currentProduct?: Product;
  products: Product[];
  totalItems: number;
  curentPage: number;
  pageSize: number;
  pageCount: number;
  nutritientNames: LocalizedName[];
  ingredientNames: LocalizedName[];
  ingredientAnalysisNames: LocalizedName[];
  favorites: Favorite[];
}

export const initialNutritionState: NutritionState = {
  products: [],
  loading: false,
  searchTerm: '',
  nutritientNames: [],
  ingredientNames: [],
  ingredientAnalysisNames: [],
  totalItems: 0,
  curentPage: 0,
  pageSize: 20,
  pageCount: 0,
  favorites: [],
};

export const nurtitionFeatureKey = 'nutrition';

export const nutritionReducer = createReducer(
  initialNutritionState,
  on(NutritionActions.loadProduct, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(NutritionActions.search, (state, action) => ({
    ...state,
    products: [],
    loading: true,
    currentProduct: null,
    searchTerm: action.searchTerm,
    curentPage: action.page,
  })),
  on(NutritionActions.productLoaded, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: action.product,
  })),
  on(NutritionActions.productLoadedError, (state, action) => ({
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
    totalItems: action.totalItems,
  })),
  on(NutritionActions.favoritesLoaded, (state, action) => ({
    ...state,
    favorites: action.favorites,
  }))
);
