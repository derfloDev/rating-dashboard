import { Ingredient as ApiIngredient } from 'openfoodfac-ts/dist/OpenFoodFactsApi/types';
export interface Ingredient extends ApiIngredient {
  vegan: string;
  vegetarian: string;
  has_sub_ingredients: string;
  percent_estimate: number;
  processing: string;
}
