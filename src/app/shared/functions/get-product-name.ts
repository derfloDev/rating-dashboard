import { Product as Beautyproduct } from 'src/app/beauty/model/product';
import { Product as NutritionProduct } from 'src/app/nutrition/model/product';

const getProductName = (product: Beautyproduct | NutritionProduct): string => {
  if (!!product.product_name) {
    return product.product_name;
  } else if (!!product.product_name_en) {
    return product.product_name_en;
  } else if (!!product.product_name_fr) {
    return product.product_name_fr;
  }
  if (!!product.generic_name) {
    return product.generic_name;
  } else if (!!product.generic_name_en) {
    return product.generic_name_en;
  }
  return product.generic_name_fr;
};

export default getProductName;
