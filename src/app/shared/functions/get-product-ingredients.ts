import { Product as Beautyproduct } from 'src/app/beauty/model/product';
import { Product as NutritionProduct } from 'src/app/nutrition/model/product';

const getProductIngredients = (
  product: Beautyproduct | NutritionProduct
): string => {
  if (!!product.ingredients_text_with_allergens) {
    return product.ingredients_text_with_allergens;
  } else if (!!product.ingredients_text_with_allergens_en) {
    return product.ingredients_text_with_allergens_en;
  }
  return product.ingredients_text_with_allergens_fr;
};

export default getProductIngredients;
