import { createReducer, on } from '@ngrx/store';
import { ApiFilter } from 'src/app/shared/models/api-filter';
import { BrandName } from 'src/app/shared/models/brand-name';
import { CategoryName } from 'src/app/shared/models/category-name';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../model/product';
import * as NutritionActions from './nutrition.actions';

export interface NutritionState {
  loading: boolean;
  searchTerm: string;
  searchFilter: ApiFilter;
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
  allergenNames: LocalizedName[];
  brandNames: BrandName[];
  categoryNames: CategoryName[];
  additiveNames: CategoryName[];
  nutrientLevelNames: LocalizedName[];
}

export const initialNutritionState: NutritionState = {
  products: [],
  loading: false,
  searchTerm: '',
  searchFilter: { nutriments: [] },
  nutritientNames: [],
  ingredientNames: [],
  ingredientAnalysisNames: [],
  totalItems: 0,
  curentPage: 0,
  pageSize: 20,
  pageCount: 0,
  favorites: [],
  allergenNames: [],
  brandNames: [],
  categoryNames: [],
  additiveNames: [],
  nutrientLevelNames: [],
};

export const nurtitionFeatureKey = 'nutrition';

export const nutritionReducer = createReducer(
  initialNutritionState,
  on(NutritionActions.resetProducts, (state, action) => ({
    ...state,
    products: [],
    loading: false,
    currentProduct: null,
    searchTerm: '',
    curentPage: 1,
  })),
  on(NutritionActions.loadProduct, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(NutritionActions.searchProducts, (state, action) => ({
    ...state,
    products: [],
    loading: true,
    currentProduct: null,
    searchTerm: action.searchTerm,
    curentPage: action.page,
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
  })),
  on(NutritionActions.changeClientSearchFilter, (state, action) => ({
    ...state,
    searchFilter: { ...state.searchFilter, ...action.filter },
  })),
  on(NutritionActions.changeServerSearchFilter, (state, action) => ({
    ...state,
    searchFilter: { ...state.searchFilter, ...action.filter },
  })),
  on(NutritionActions.allergenNamesLoaded, (state, action) => ({
    ...state,
    allergenNames: action.names,
  })),
  on(NutritionActions.brandNamesLoaded, (state, action) => ({
    ...state,
    brandNames: action.names,
  })),
  on(NutritionActions.categoryNamesLoaded, (state, action) => ({
    ...state,
    categoryNames: action.names,
  })),
  on(NutritionActions.addititveNamesLoaded, (state, action) => ({
    ...state,
    additiveNames: action.names,
  })),
  on(NutritionActions.nutrientLevelNamesLoaded, (state, action) => ({
    ...state,
    nutrientLevelNames: action.names,
  })),
  on(NutritionActions.addNutrimentFilterByIndex, (state, action) => {
    const copyNutriments = [...state.searchFilter.nutriments];
    copyNutriments.splice(action.index, 1, action.filter);
    return {
      ...state,
      searchFilter: {
        ...state.searchFilter,
        nutriments: [...copyNutriments],
      },
    };
  }),
  on(NutritionActions.removeNutrimentFilterByIndex, (state, action) => ({
    ...state,
    searchFilter: {
      ...state.searchFilter,
      nutriments: [
        ...state.searchFilter.nutriments.slice(0, action.index),
        ...state.searchFilter.nutriments.slice(action.index + 1),
      ],
    },
  }))
);
