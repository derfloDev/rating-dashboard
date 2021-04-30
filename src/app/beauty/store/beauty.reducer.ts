import { createReducer, on } from '@ngrx/store';
import { BrandName } from 'src/app/shared/models/brand-name';
import { CategoryName } from 'src/app/shared/models/category-name';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';
import * as BeautyActions from './beauty.actions';

export default interface BeautyState {
  loading: boolean;
  searchTerm: string;
  searchFilter: any;
  currentProduct?: Product;
  products: Product[];
  totalItems: number;
  curentPage: number;
  pageSize: number;
  pageCount: number;
  ingredientAnalysisNames: LocalizedName[];
  countryNames: LocalizedName[];
  favorites: Favorite[];
  allergenNames: LocalizedName[];
  brandNames: BrandName[];
  categoryNames: CategoryName[];
  additiveNames: CategoryName[];
}

export const initialBeautyState: BeautyState = {
  products: [],
  searchTerm: '',
  searchFilter: {},
  loading: false,
  ingredientAnalysisNames: [],
  totalItems: 0,
  curentPage: 0,
  pageSize: 20,
  pageCount: 0,
  countryNames: [],
  favorites: [],
  allergenNames: [],
  brandNames: [],
  categoryNames: [],
  additiveNames: [],
};

export const beautyFeatureKey = 'beauty';

export const beautyReducer = createReducer(
  initialBeautyState,
  on(BeautyActions.resetProducts, (state, action) => ({
    ...state,
    products: [],
    loading: false,
    currentProduct: null,
    searchTerm: '',
    curentPage: 1,
  })),
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
  })),
  on(BeautyActions.favoritesLoaded, (state, action) => ({
    ...state,
    favorites: action.favorites,
  })),
  on(BeautyActions.changeClientSearchFilter, (state, action) => ({
    ...state,
    searchFilter: { ...state.searchFilter, ...action.filter },
  })),
  on(BeautyActions.changeServerSearchFilter, (state, action) => ({
    ...state,
    searchFilter: { ...state.searchFilter, ...action.filter },
  })),
  on(BeautyActions.allergenNamesLoaded, (state, action) => ({
    ...state,
    allergenNames: action.names,
  })),
  on(BeautyActions.brandNamesLoaded, (state, action) => ({
    ...state,
    brandNames: action.names,
  })),
  on(BeautyActions.categoryNamesLoaded, (state, action) => ({
    ...state,
    categoryNames: action.names,
  })),
  on(BeautyActions.addititveNamesLoaded, (state, action) => ({
    ...state,
    additiveNames: action.names,
  }))
);
