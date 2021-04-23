import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../model/product';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss'],
})
export class IngredientsTableComponent implements OnInit {
  @Input()
  ingredients: Ingredient[];

  constructor() {}

  ngOnInit(): void {}

  showIngredient(ingredient: Ingredient): boolean {
    return !!ingredient.text;
  }

  getIngredientName(ingredient: Ingredient): string {
    return ingredient.text;
  }

  toFixed(number: Number): string {
    return Number(number).toFixed(2);
  }
}
