import { Product as ApiProduct } from 'openfoodfac-ts/dist/OpenFoodFactsApi/types';

export interface Product extends ApiProduct {
  nova_group: number;
  nova_group_debug: string;
  nova_groups: string;
  nova_groups_tags: string[];
  ecoscore_grade: string;
  ecoscore_tags: string[];
}
