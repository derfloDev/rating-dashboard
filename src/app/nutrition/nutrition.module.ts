import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
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
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { ScoreImageComponent } from './components/score-image/score-image.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductOverviewComponent,
    NutrimentsTableComponent,
    IngredientsTableComponent,
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
    SharedModule,
    NgbModalModule,
  ],
})
export class NutritionModule {}
