import { Product as NutritionProduct } from 'src/app/nutrition/model/product';
import { Product as BeautyProduct } from 'src/app/beauty/model/product';

export interface Favorite {
  productId: string;
  product: NutritionProduct | BeautyProduct;
}
