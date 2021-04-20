import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NutritientName } from '../../model/nutritient-name';
import { selectIngredientAnalysisNames } from '../../store/nutrition.selector';

@Component({
  selector: 'app-ingredients-analysis',
  templateUrl: './ingredients-analysis.component.html',
  styleUrls: ['./ingredients-analysis.component.scss']
})
export class IngredientsAnalysisComponent implements OnInit {

  @Input()
  ingredientsAnalysisTags: string[];

  public ingredientAnalysisNames: NutritientName[];

  constructor(private store: Store) {
    this.store.select(selectIngredientAnalysisNames).subscribe(ingredientAnalysisNames =>
      this.ingredientAnalysisNames = ingredientAnalysisNames);
  }

  ngOnInit(): void {
  }

  getIngredientAnalysis(ingredientAnalysisTag: string): string {
    return this.ingredientAnalysisNames.find((name) => name.key === ingredientAnalysisTag)?.value;
  }

  getIngredientAnalysisClass(ingredientAnalysisTag: string): string {
    if (ingredientAnalysisTag.includes('may-contain') || ingredientAnalysisTag.includes('maybe')) {
      return 'badge-warning';
    } else if (ingredientAnalysisTag.includes('unknown')) {
      return 'badge-secondary';
    } else if (ingredientAnalysisTag.includes('non-') || ingredientAnalysisTag.includes('palm-oil')) {
      return 'badge-danger';
    } else if (ingredientAnalysisTag.includes('-free')) {
      return 'badge-success';
    }
    return 'badge-success';
  }
}
