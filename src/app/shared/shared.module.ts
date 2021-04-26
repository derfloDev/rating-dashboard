import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { IngredientsAnalysisComponent } from './components/ingredients-analysis/ingredients-analysis.component';

@NgModule({
  declarations: [ImageCarouselComponent, IngredientsAnalysisComponent],
  imports: [CommonModule, NgbCarouselModule],
  exports: [ImageCarouselComponent, IngredientsAnalysisComponent],
})
export class SharedModule {}
