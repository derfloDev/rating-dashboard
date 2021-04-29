import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NgbCarouselModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { IngredientsAnalysisComponent } from './components/ingredients-analysis/ingredients-analysis.component';
import { PagerComponent } from './components/pager/pager.component';
import { FavoriteBtnComponent } from './components/favorite-btn/favorite-btn.component';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageCarouselComponent,
    IngredientsAnalysisComponent,
    PagerComponent,
    FavoriteBtnComponent,
    FilterDropdownComponent,
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
  ],
  exports: [
    ImageCarouselComponent,
    IngredientsAnalysisComponent,
    PagerComponent,
    FavoriteBtnComponent,
    FilterDropdownComponent,
  ],
})
export class SharedModule {}
