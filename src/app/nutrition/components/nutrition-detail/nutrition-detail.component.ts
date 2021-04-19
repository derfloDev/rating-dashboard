import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NutritientName } from '../../model/nutritient-name';
import { Product } from '../../model/product';
import { selectIngredientAnalysisNames, selectProduct } from '../../store/nutrition.selector';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition-detail.component.html',
  styleUrls: ['./nutrition-detail.component.scss']
})
export class NutritionDetailComponent implements OnInit {

  public product: Product;
  public ingredientAnalysisNames: NutritientName[];

  constructor(private store: Store) {
    this.store.select(selectProduct).subscribe(product => this.product = product);
    this.store.select(selectIngredientAnalysisNames).subscribe(ingredientAnalysisNames =>
      this.ingredientAnalysisNames = ingredientAnalysisNames);
  }

  ngOnInit(): void {
  }

  get nutriscoreImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/nutriscore-${this.product.nutriscore_grade}.svg`;
  }

  get novaImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/nova-group-${this.product.nova_group}.svg`;
  }

  get ecoScoreImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/ecoscore-${this.product.ecoscore_grade}.svg`;
  }

  getIngredientAnalysis(ingredientAnalysisTag: string): string {
    return this.ingredientAnalysisNames.find((name) => name.key === ingredientAnalysisTag)?.value;
  }

  getIngredientAnalysisClass(ingredientAnalysisTag: string): string {
    if (ingredientAnalysisTag.includes('may-contain')) {
      return 'badge-warning';
    } else if (ingredientAnalysisTag.includes('maybe')) {
      return 'badge-warning';
    } else if (ingredientAnalysisTag.includes('unknown')) {
      return 'badge-secondary';
    } else if (ingredientAnalysisTag.includes('non-')) {
      return 'badge-danger';
    } else if (ingredientAnalysisTag.includes('-free')) {
      return 'badge-success';
    }
    return 'badge-success';
  }
}
