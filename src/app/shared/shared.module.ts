import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NgbCarouselModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { IngredientsAnalysisComponent } from './components/ingredients-analysis/ingredients-analysis.component';
import { PagerComponent } from './components/pager/pager.component';

@NgModule({
  declarations: [
    ImageCarouselComponent,
    IngredientsAnalysisComponent,
    PagerComponent,
  ],
  imports: [CommonModule, NgbCarouselModule, NgbPaginationModule],
  exports: [
    ImageCarouselComponent,
    IngredientsAnalysisComponent,
    PagerComponent,
  ],
})
export class SharedModule {}
