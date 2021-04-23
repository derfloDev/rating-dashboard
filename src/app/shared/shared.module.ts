import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { IngredientsAnalysisComponent } from './components/ingredients-analysis/ingredients-analysis.component';

@NgModule({
  declarations: [ImageCarouselComponent, IngredientsAnalysisComponent],
  imports: [CommonModule],
  exports: [ImageCarouselComponent, IngredientsAnalysisComponent],
})
export class SharedModule {}
