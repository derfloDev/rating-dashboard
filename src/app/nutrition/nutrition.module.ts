import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionDetailComponent } from './components/nutrition-detail/nutrition-detail.component';
import { NutritionOverviewComponent } from './components/nutrition-overview/nutrition-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { nurtitionFeatureKey, nutritionReducer } from './store/nutrition.reducer';
import { NutritionEffects } from './store/nutrition.effects';
import { NutrimentsTableComponent } from './components/nutriments-table/nutriments-table.component';


@NgModule({
  declarations: [
    NutritionDetailComponent,
    NutritionOverviewComponent,
    NutrimentsTableComponent
  ],
  imports: [
    CommonModule,
    NutritionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(nurtitionFeatureKey, nutritionReducer),
    EffectsModule.forFeature([NutritionEffects])
  ]
})
export class NutritionModule { }
