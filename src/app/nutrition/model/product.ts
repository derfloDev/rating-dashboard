import { Ingredient } from "./ingredient";
import { Nutriments } from "./nutriments";
import { NutriscoreData } from "./nutriScoreData";

export interface Product {
    _id: string;
    _keywords: string[];
    additives_debug_tags: any[];
    additives_n: number;
    additives_old_n: number;
    additives_old_tags: string[];
    additives_original_tags: string[];
    additives_prev_original_tags: string[];
    additives_tags: string[];
    additives_tags_n?: any;
    allergens: string;
    allergens_from_ingredients: string;
    allergens_from_user: string;
    allergens_hierarchy: any[];
    allergens_tags: any[];
    amino_acids_prev_tags: any[];
    amino_acids_tags: any[];
    brand_owner: string;
    brand_owner_imported: string;
    brands: string;
    brands_debug_tags: any[];
    brands_tags: string[];
    categories: string;
    categories_hierarchy: string[];
    categories_imported: string;
    categories_lc: string;
    categories_old: string;
    categories_properties_tags: string[];
    categories_tags: string[];
    checkers: any[];
    checkers_tags: any[];
    ciqual_food_name_tags: string[];
    cities_tags: any[];
    code: string;
    codes_tags: string[];
    compared_to_category: string;
    complete: number;
    completed_t: number;
    completeness: number;
    correctors: string[];
    correctors_tags: string[];
    countries: string;
    countries_debug_tags: any[];
    countries_hierarchy: string[];
    countries_imported: string;
    countries_lc: string;
    countries_tags: string[];
    created_t: number;
    creator: string;
    data_quality_bugs_tags: any[];
    data_quality_errors_tags: any[];
    data_quality_info_tags: string[];
    data_quality_tags: string[];
    data_quality_warnings_tags: string[];
    data_sources: string;
    data_sources_imported: string;
    data_sources_tags: string[];
    debug_param_sorted_langs: string[];
    ecoscore_grade: string;
    ecoscore_tags: string[];
    editors: string[];
    editors_tags: string[];
    emb_codes: string;
    emb_codes_20141016: string;
    emb_codes_debug_tags: any[];
    emb_codes_orig: string;
    emb_codes_tags: any[];
    entry_dates_tags: string[];
    expiration_date: string;
    expiration_date_debug_tags: any[];
    generic_name: string;
    generic_name_en: string;
    generic_name_en_debug_tags: any[];
    id: string;
    image_front_small_url: string;
    image_front_thumb_url: string;
    image_front_url: string;
    image_ingredients_small_url: string;
    image_ingredients_thumb_url: string;
    image_ingredients_url: string;
    image_nutrition_small_url: string;
    image_nutrition_thumb_url: string;
    image_nutrition_url: string;
    image_small_url: string;
    image_thumb_url: string;
    image_url: string;
    informers: string[];
    informers_tags: string[];
    ingredients: Ingredient[];
    ingredients_analysis_tags: string[];
    ingredients_debug: string[];
    ingredients_from_or_that_may_be_from_palm_oil_n: number;
    ingredients_from_palm_oil_n: number;
    ingredients_from_palm_oil_tags: any[];
    ingredients_hierarchy: string[];
    ingredients_ids_debug: string[];
    ingredients_n: number;
    ingredients_n_tags: string[];
    ingredients_original_tags: string[];
    ingredients_percent_analysis: number;
    ingredients_tags: string[];
    ingredients_text: string;
    ingredients_text_debug: string;
    ingredients_text_en: string;
    ingredients_text_en_debug_tags: any[];
    ingredients_text_en_imported: string;
    ingredients_text_with_allergens: string;
    ingredients_text_with_allergens_en: string;
    ingredients_that_may_be_from_palm_oil_n: number;
    ingredients_that_may_be_from_palm_oil_tags: any[];
    interface_version_created: string;
    interface_version_modified: string;
    known_ingredients_n: number;
    labels: string;
    labels_hierarchy: string[];
    labels_lc: string;
    labels_prev_hierarchy: string[];
    labels_prev_tags: string[];
    labels_tags: string[];
    lang: string;
    lang_debug_tags: any[];
    languages_hierarchy: string[];
    languages_tags: string[];
    last_edit_dates_tags: string[];
    last_editor: string;
    last_image_dates_tags: string[];
    last_image_t: number;
    last_modified_by: string;
    last_modified_t: number;
    lc: string;
    lc_imported: string;
    link: string;
    link_debug_tags: any[];
    manufacturing_places: string;
    manufacturing_places_debug_tags: any[];
    manufacturing_places_tags: any[];
    max_imgid: string;
    minerals_prev_tags: any[];
    minerals_tags: any[];
    misc_tags: string[];
    new_additives_n: number;
    no_nutrition_data: string;
    nova_group: number;
    nova_group_debug: string;
    nova_groups: string;
    nova_groups_tags: string[];
    nucleotides_prev_tags: any[];
    nucleotides_tags: any[];
    nutrient_levels_tags: string[];
    nutriments: Nutriments;
    nutriscore_data: NutriscoreData;
    nutriscore_grade: string;
    nutriscore_score: number;
    nutriscore_score_opposite: number;
    nutrition_data: string;
    nutrition_data_per: string;
    nutrition_data_per_debug_tags: any[];
    nutrition_data_per_imported: string;
    nutrition_data_prepared: string;
    nutrition_data_prepared_per: string;
    nutrition_data_prepared_per_debug_tags: any[];
    nutrition_data_prepared_per_imported: string;
    nutrition_grade_fr: string;
    nutrition_grades: string;
    nutrition_grades_tags: string[];
    nutrition_score_beverage: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: number;
    origins: string;
    origins_hierarchy: string[];
    origins_lc: string;
    origins_old: string;
    origins_tags: string[];
    other_nutritional_substances_tags: any[];
    packaging: string;
    packaging_debug_tags: any[];
    packaging_tags: string[];
    photographers: string[];
    photographers_tags: string[];
    pnns_groups_1: string;
    pnns_groups_1_tags: string[];
    pnns_groups_2: string;
    pnns_groups_2_tags: string[];
    popularity_key: number;
    popularity_tags: string[];
    product_name: string;
    product_name_en: string;
    product_name_en_debug_tags: any[];
    product_name_en_imported: string;
    product_quantity: number;
    purchase_places: string;
    purchase_places_debug_tags: any[];
    purchase_places_tags: any[];
    quantity: string;
    quantity_debug_tags: any[];
    rev: number;
    scans_n: number;
    serving_quantity: number;
    serving_size: string;
    serving_size_debug_tags: any[];
    serving_size_imported: string;
    sortkey: number;
    states: string;
    states_hierarchy: string[];
    states_tags: string[];
    stores: string;
    stores_debug_tags: any[];
    stores_tags: any[];
    traces: string;
    traces_debug_tags: any[];
    traces_from_ingredients: string;
    traces_from_user: string;
    traces_hierarchy: string[];
    traces_tags: string[];
    unique_scans_n: number;
    unknown_ingredients_n: number;
    unknown_nutrients_tags: any[];
    update_key: string;
    vitamins_prev_tags: any[];
    vitamins_tags: any[];
}