import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from 'openfoodfac-ts/dist/OpenFoodFactsApi/types';
import { NutritientName } from '../../model/nutritient-name';
import { selectIngredientNames } from '../../store/nutrition.selector';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit {

  @Input()
  ingredients: Ingredient[];

  @Input()
  nutritionDataPer: string;

  public ingredientsToDisplay: NutritientName[];

  constructor(private store: Store) {
    this.store.select(selectIngredientNames).subscribe(ingredientNames =>
      this.ingredientsToDisplay = ingredientNames);
  }

  ngOnInit(): void {
  }

  showIngredient(ingredient: Ingredient): boolean {
    return !!this.findIngredientName(ingredient);
  }

  getIngredientName(ingredient: Ingredient): string {
    return this.findIngredientName(ingredient).value;
  }

  toFixed(number: Number): string {
    return Number(number).toFixed(2);
  }

  private findIngredientName(ingredient: Ingredient): NutritientName {
    return this.ingredientsToDisplay.find(ingredientToDisplay => ingredientToDisplay.key == ingredient.id);
  }
}
