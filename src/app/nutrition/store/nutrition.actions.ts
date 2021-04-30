import { createAction, props } from '@ngrx/store';
import { ApiFilter } from 'src/app/shared/models/api-filter';
import { BrandName } from 'src/app/shared/models/brand-name';
import { CategoryName } from 'src/app/shared/models/category-name';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { NutrimentFilter } from 'src/app/shared/models/nutriment-filter';
import { Product } from '../model/product';

export const loadProduct = createAction(
  '[Nutrition] load product',
  props<{ barcode: string }>()
);
export const productLoaded = createAction(
  '[Nutrition] product loaded',
  props<{ product: Product }>()
);
export const productLoadedError = createAction(
  '[Nutrition] product loaded error',
  props<{ error: any }>()
);

export const search = createAction(
  '[Nutrition] search',
  props<{ searchTerm: string; page: number }>()
);

export const resetProducts = createAction('[Nutrition] reset products');
export const searchProducts = createAction(
  '[Nutrition] search products',
  props<{ searchTerm: string; page: number }>()
);
export const productsLoaded = createAction(
  '[Nutrition] products loaded',
  props<{ products: Product[]; totalItems: number }>()
);
export const productsLoadedError = createAction(
  '[Nutrition] products loaded error',
  props<{ error: any }>()
);

export const loadLocalizedNutrientNames = createAction(
  '[Nutrition] load nutrient names'
);
export const localizeNutrientNamesLoaded = createAction(
  '[Nutrition] nutrient names loaded',
  props<{ names: LocalizedName[] }>()
);

export const loadLocalizedIngredientNames = createAction(
  '[Nutrition] load ingredient names'
);
export const localizedIngredientNamesLoaded = createAction(
  '[Nutrition] ingredient names loaded',
  props<{ names: LocalizedName[] }>()
);

export const loadLocalizedIngredientAnalysisNames = createAction(
  '[Nutrition] load ingredient analysis names'
);
export const localizedIngredientAnalysisNamesLoaded = createAction(
  '[Nutrition] ingredient analysis names loaded',
  props<{ names: LocalizedName[] }>()
);
export const metadataLoadedError = createAction(
  '[Nutrition] metadata loaded error',
  props<{ error: any }>()
);

export const loadFavorites = createAction('[Nutrition] load favorites');
export const favoritesLoaded = createAction(
  '[Nutrition] favorites loaded',
  props<{ favorites: Favorite[] }>()
);
export const favoritesLoadedError = createAction(
  '[Nutrition] favorites loaded error',
  props<{ error: any }>()
);

export const addFavorite = createAction(
  '[Nutrition] add favorite',
  props<{ product: Product }>()
);
export const favoriteAdded = createAction('[Nutrition] favorite added');
export const favoriteAddedError = createAction(
  '[Nutrition] favorite added error',
  props<{ error: any }>()
);

export const removeFavorite = createAction(
  '[Nutrition] removed favorite',
  props<{ productId: string }>()
);
export const favoriteRemoved = createAction('[Nutrition] favorite removed');
export const favoriteRemovedError = createAction(
  '[Nutrition] favorite removed error',
  props<{ error: any }>()
);

export const changeClientSearchFilter = createAction(
  '[Nutrition] change client search filter',
  props<{ filter: any }>()
);

export const changeServerSearchFilter = createAction(
  '[Nutrition] change server search filter',
  props<{ filter: ApiFilter }>()
);

export const loadBrandNames = createAction('[Nutrition] load brand names');
export const brandNamesLoaded = createAction(
  '[Nutrition] brand names loaded',
  props<{ names: BrandName[] }>()
);

export const loadCategoryNames = createAction(
  '[Nutrition] load category names'
);
export const categoryNamesLoaded = createAction(
  '[Nutrition] category names loaded',
  props<{ names: CategoryName[] }>()
);

export const loadAllergenNames = createAction(
  '[Nutrition] load allergen names'
);
export const allergenNamesLoaded = createAction(
  '[Nutrition] allergen names loaded',
  props<{ names: LocalizedName[] }>()
);

export const loadAddititveNames = createAction(
  '[Nutrition] load additive names'
);
export const addititveNamesLoaded = createAction(
  '[Nutrition] additive names loaded',
  props<{ names: CategoryName[] }>()
);

export const loadNutrientLevelNames = createAction(
  '[Nutrition] load nutrientLevel names'
);
export const nutrientLevelNamesLoaded = createAction(
  '[Nutrition] nutrientLevel names loaded',
  props<{ names: LocalizedName[] }>()
);
export const addNutrimentFilter = createAction(
  '[Nutrition] add nutriment filter',
  props<{ filter: NutrimentFilter }>()
);
export const addNutrimentFilterByIndex = createAction(
  '[Nutrition] add nutriment filter by index',
  props<{ index: number; filter: NutrimentFilter }>()
);

export const removeNutrimentFilter = createAction(
  '[Nutrition] remove nutriment filter',
  props<{ filter: NutrimentFilter }>()
);

export const removeNutrimentFilterByIndex = createAction(
  '[Nutrition] remove nutriment filter by index',
  props<{ index: number }>()
);

export const loadMetadata = createAction('[Nutrition] load metadata');
