import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { BeautyRoutingModule } from './beauty-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { beautyFeatureKey, beautyReducer } from './store/beauty.reducer';
import { BeautyEffects } from './store/beauty.effects';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { TestOuterComponent } from './components/test-outer/test-outer.component';
import { TestInnerComponent } from './components/test-inner/test-inner.component';
import { SharedModule } from '../shared/shared.module';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductOverviewComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductEntryComponent,
    TestOuterComponent,
    TestInnerComponent,
    IngredientsTableComponent,
  ],
  imports: [
    NgbModalModule,
    CommonModule,
    BeautyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(beautyFeatureKey, beautyReducer),
    EffectsModule.forFeature([BeautyEffects]),
    SharedModule,
  ],
})
export class BeautyModule {}
