import { Component, Input, OnInit } from '@angular/core';
import { LocalizedName } from 'src/app/shared/models/localized-name';

@Component({
  selector: 'app-ingredients-analysis',
  templateUrl: './ingredients-analysis.component.html',
  styleUrls: ['./ingredients-analysis.component.scss'],
})
export class IngredientsAnalysisComponent implements OnInit {
  private defaultIngredientsAnalysisTags = [
    'en:palm-oil-content-unknown',
    'en:vegan-status-unknown',
    'en:vegetarian-status-unknown',
  ];
  private _ingredientsAnalysisTags: string[];
  get ingredientsAnalysisTags(): string[] {
    return this._ingredientsAnalysisTags;
  }

  @Input()
  set ingredientsAnalysisTags(val: string[]) {
    if (!!val && val.length > 0) {
      this._ingredientsAnalysisTags = val;
    } else {
      this._ingredientsAnalysisTags = this.defaultIngredientsAnalysisTags;
    }
  }

  @Input()
  public ingredientAnalysisNames: LocalizedName[];

  constructor() {}

  ngOnInit(): void {}

  getIngredientAnalysis(ingredientAnalysisTag: string): string {
    return this.ingredientAnalysisNames.find(
      (name) => name.key === ingredientAnalysisTag
    )?.value;
  }

  getIngredientAnalysisClass(ingredientAnalysisTag: string): string {
    if (
      ingredientAnalysisTag.includes('may-contain') ||
      ingredientAnalysisTag.includes('maybe')
    ) {
      return 'badge-warning';
    } else if (ingredientAnalysisTag.includes('unknown')) {
      return 'badge-secondary';
    } else if (
      ingredientAnalysisTag.includes('non-') ||
      ingredientAnalysisTag === 'en:palm-oil'
    ) {
      return 'badge-danger';
    } else if (ingredientAnalysisTag.includes('-free')) {
      return 'badge-success';
    }
    return 'badge-success';
  }
}
