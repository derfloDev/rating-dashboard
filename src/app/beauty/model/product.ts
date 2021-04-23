import { SelectedImages } from 'src/app/shared/models/image.model';

export interface LanguagesCodes {
  fr: number;
}

export interface FrontFrFr {
  geometry: string;
  normalize?: any;
  imgid: string;
  sizes: {};
  rev: string;
  white_magic?: any;
}

export interface IngredientsFr {
  geometry: string;
  normalize: string;
  sizes: {};
  imgid: string;
  white_magic: string;
  rev: string;
}

export interface FrontFr {
  white_magic: string;
  rev: string;
  imgid: string;
  sizes: {};
  normalize: string;
  geometry: string;
}

export interface Images {
  1: {};
  2: {};
  3: {};
  front_fr_fr: FrontFrFr;
  ingredients_fr: IngredientsFr;
  front_fr: FrontFr;
}

export interface Languages {
  'en:french': number;
}

export interface NutrientLevels {}

export interface Nutriments {
  'fruits-vegetables-nuts-estimate-from-ingredients_100g': number;
}

export interface Ingredient {
  percent_max: number;
  id: string;
  vegan: string;
  rank: number;
  percent_min: number;
  percent_estimate: number;
  text: string;
  vegetarian: string;
  has_sub_ingredients: string;
}

export interface Product {
  allergens_from_ingredients: string;
  product_name_fr: string;
  image_ingredients_thumb_url: string;
  traces: string;
  states_hierarchy: string[];
  traces_from_user: string;
  nutrition_data_per: string;
  lc: string;
  languages_hierarchy: string[];
  states: string;
  ingredients_from_or_that_may_be_from_palm_oil_n: number;
  creator: string;
  nutrition_score_debug: string;
  labels_hierarchy: string[];
  allergens: string;
  periods_after_opening_tags: string[];
  ingredients_text_with_allergens: string;
  ingredients_text_with_allergens_en: string;
  code: string;
  languages_codes: LanguagesCodes;
  ingredients_percent_analysis: number;
  ingredients_text_with_allergens_fr: string;
  image_front_url: string;
  codes_tags: string[];
  selected_images: SelectedImages;
  additives_old_n: number;
  image_ingredients_url: string;
  nova_group_tags: string[];
  amino_acids_tags: any[];
  labels_lc: string;
  image_front_thumb_url: string;
  known_ingredients_n: number;
  nova_group_debug: string;
  additives_old_tags: string[];
  ingredients_text_debug: string;
  serving_quantity: number;
  no_nutrition_data: string;
  ingredients_debug: string[];
  languages_tags: string[];
  periods_after_opening_hierarchy: string[];
  last_modified_t: number;
  images: Images;
  additives_n: number;
  countries: string;
  other_nutritional_substances_tags: any[];
  additives_tags: string[];
  allergens_hierarchy: any[];
  emb_codes: string;
  photographers_tags: string[];
  traces_tags: any[];
  allergens_tags: any[];
  ingredients_that_may_be_from_palm_oil_tags: any[];
  traces_hierarchy: any[];
  labels_tags: string[];
  manufacturing_places: string;
  ingredients_original_tags: string[];
  checkers_tags: any[];
  ingredients_from_palm_oil_tags: any[];
  minerals_tags: any[];
  ingredients_text: string;
  ingredients_text_en: string;
  packaging_tags: string[];
  states_tags: string[];
  categories_old: string;
  nutrient_levels_tags: any[];
  origins: string;
  image_small_url: string;
  additives_debug_tags: any[];
  categories: string;
  interface_version_modified: string;
  image_front_small_url: string;
  languages: Languages;
  countries_tags: string[];
  origins_tags: any[];
  rev: number;
  stores_tags: string[];
  lang: string;
  max_imgid: string;
  ingredients_n: string;
  completed_t: number;
  traces_from_ingredients: string;
  last_edit_dates_tags: string[];
  generic_name_fr: string;
  _id: string;
  nucleotides_tags: any[];
  ingredients_text_fr: string;
  labels_old: string;
  ingredients_analysis_tags: string[];
  categories_lc: string;
  entry_dates_tags: string[];
  purchase_places_tags: string[];
  categories_hierarchy: string[];
  brands_tags: string[];
  additives_original_tags: string[];
  created_t: number;
  purchase_places: string;
  nutrient_levels: NutrientLevels;
  complete: number;
  unknown_ingredients_n: string;
  categories_tags: string[];
  nutriments: Nutriments;
  ingredients_ids_debug: string[];
  brands: string;
  periods_after_opening: string;
  correctors_tags: string[];
  stores: string;
  last_modified_by: string;
  emb_codes_tags: any[];
  informers_tags: string[];
  generic_name: string;
  generic_name_en: string;
  image_ingredients_small_url: string;
  manufacturing_places_tags: any[];
  ingredients_n_tags: string[];
  image_thumb_url: string;
  emb_codes_orig: string;
  editors_tags: string[];
  id: string;
  ingredients: Ingredient[];
  cities_tags: any[];
  vitamins_tags: any[];
  product_name: string;
  product_name_en: string;
  quantity: string;
  update_key: string;
  link: string;
  image_url: string;
  serving_size: string;
  packaging: string;
  ingredients_tags: string[];
  allergens_from_user: string;
  interface_version_created: string;
  ingredients_that_may_be_from_palm_oil_n: number;
  _keywords: string[];
  labels: string;
  ingredients_hierarchy: string[];
  ingredients_from_palm_oil_n: number;
  nutrition_grades_tags: string[];
  countries_hierarchy: string[];
  sortkey: number;
  unknown_nutrients_tags: any[];
  debug_param_sorted_langs: string[];
  expiration_date: string;
}

export interface RootObject {
  status_verbose: string;
  status: number;
  product: Product;
  code: string;
}
