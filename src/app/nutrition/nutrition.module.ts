import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionDetailComponent } from './components/nutrition-detail/nutrition-detail.component';
import { NutritionOverviewComponent } from './components/nutrition-overview/nutrition-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  nurtitionFeatureKey,
  nutritionReducer,
} from './store/nutrition.reducer';
import { NutritionEffects } from './store/nutrition.effects';
import { NutrimentsTableComponent } from './components/nutriments-table/nutriments-table.component';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { IngredientsAnalysisComponent } from './components/ingredients-analysis/ingredients-analysis.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { ScoreImageComponent } from './components/score-image/score-image.component';

@NgModule({
  declarations: [
    NutritionDetailComponent,
    NutritionOverviewComponent,
    NutrimentsTableComponent,
    IngredientsTableComponent,
    IngredientsAnalysisComponent,
    ProductListComponent,
    ProductEntryComponent,
    ScoreImageComponent,
  ],
  imports: [
    CommonModule,
    NutritionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(nurtitionFeatureKey, nutritionReducer),
    EffectsModule.forFeature([NutritionEffects]),
  ],
})
export class NutritionModule {}
