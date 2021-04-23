import { Product as Beautyproduct } from 'src/app/beauty/model/product';
import { Product as NutritionProduct } from 'src/app/nutrition/model/product';
import getImageSource from './get-image-sources';

const getProductImages = (
  product: Beautyproduct | NutritionProduct
): { name: string; src: string }[] => {
  const images: { name: string; src: string }[] = [];
  if (!!product.selected_images.front?.display) {
    images.push({
      name: 'Bild',
      src: getImageSource(product.selected_images.front.display),
    });
  }
  if (!!product.selected_images.ingredients?.display) {
    images.push({
      name: 'Ingredients',
      src: getImageSource(product.selected_images.ingredients.display),
    });
  }
  if (!!product.selected_images.nutrition?.display) {
    images.push({
      name: 'Nutritions',
      src: getImageSource(product.selected_images.nutrition.display),
    });
  }
  return images;
};

export default getProductImages;
