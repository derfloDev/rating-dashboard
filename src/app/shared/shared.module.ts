import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { IngredientsAnalysisComponent } from './components/ingredients-analysis/ingredients-analysis.component';
import { PagerComponent } from './components/pager/pager.component';
import { FavoriteBtnComponent } from './components/favorite-btn/favorite-btn.component';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown.component';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { SortingButtonComponent } from './components/sorting-button/sorting-button.component';
import { NutrimentFilterEntryComponent } from './components/nutriment-filter-entry/nutriment-filter-entry.component';

@NgModule({
  declarations: [
    ImageCarouselComponent,
    IngredientsAnalysisComponent,
    PagerComponent,
    FavoriteBtnComponent,
    FilterDropdownComponent,
    ProductFilterComponent,
    SortingButtonComponent,
    NutrimentFilterEntryComponent,
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    NgbDropdownModule,
  ],
  exports: [
    ImageCarouselComponent,
    IngredientsAnalysisComponent,
    PagerComponent,
    FavoriteBtnComponent,
    FilterDropdownComponent,
    ProductFilterComponent,
    SortingButtonComponent,
  ],
})
export class SharedModule {}
