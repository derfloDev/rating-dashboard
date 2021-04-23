import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Ingredient } from '../../model/ingredient';
import { selectIngredientNames } from '../../store/nutrition.selector';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss'],
})
export class IngredientsTableComponent implements OnInit {
  @Input()
  ingredients: Ingredient[];

  public ingredientsToDisplay: LocalizedName[];

  constructor(private store: Store) {
    this.store
      .select(selectIngredientNames)
      .subscribe(
        (ingredientNames) => (this.ingredientsToDisplay = ingredientNames)
      );
  }

  ngOnInit(): void {}

  showIngredient(ingredient: Ingredient): boolean {
    return !!this.findIngredientName(ingredient);
  }

  getIngredientName(ingredient: Ingredient): string {
    return this.findIngredientName(ingredient).value;
  }

  toFixed(number: Number): string {
    return Number(number).toFixed(2);
  }

  private findIngredientName(ingredient: Ingredient): LocalizedName {
    return this.ingredientsToDisplay.find(
      (ingredientToDisplay) =>
        ingredientToDisplay.key == ingredient.id.replace(/^[^:]+:/, '')
    );
  }
}
