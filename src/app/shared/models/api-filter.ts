import { NutrimentFilter } from './nutriment-filter';

export interface ApiFilter {
  onlyFavorites?: boolean;
  brand?: string;
  category?: string;
  allergen?: string;
  additive?: string;
  nutritionGrade?: string;
  ingredientsFromPalmOil?: string;
  sortBy?: string;
  nutriments?: NutrimentFilter[];
}
