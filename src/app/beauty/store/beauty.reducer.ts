import { createReducer, on } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';
import * as BeautyActions from './beauty.actions';

export default interface BeautyState {
  loading: boolean;
  searchTerm: string;
  currentProduct?: Product;
  products: Product[];
  totalItems: number;
  curentPage: number;
  pageSize: number;
  pageCount: number;
  ingredientAnalysisNames: LocalizedName[];
  countryNames: LocalizedName[];
}

export const initialBeautyState: BeautyState = {
  products: [],
  searchTerm: '',
  loading: false,
  ingredientAnalysisNames: [],
  totalItems: 0,
  curentPage: 0,
  pageSize: 20,
  pageCount: 0,
  countryNames: [],
};

export const beautyFeatureKey = 'beauty';

export const beautyReducer = createReducer(
  initialBeautyState,
  on(BeautyActions.loadProduct, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(BeautyActions.productLoaded, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: action.product,
  })),
  on(BeautyActions.productLoadedError, (state, action) => ({
    ...state,
    loading: false,
    currentProduct: null,
  })),
  on(BeautyActions.search, (state, action) => ({
    ...state,
    products: [],
    loading: true,
    currentProduct: null,
    searchTerm: action.searchTerm,
    curentPage: action.page,
  })),
  on(BeautyActions.productsLoaded, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    totalItems: action.totalItems,
  })),
  on(BeautyActions.productsLoadedError, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(BeautyActions.localizedIngredientAnalysisNamesLoaded, (state, action) => ({
    ...state,
    ingredientAnalysisNames: action.names,
  })),
  on(BeautyActions.countryNamesLoaded, (state, action) => ({
    ...state,
    countryNames: action.names,
  }))
);
