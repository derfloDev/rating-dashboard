import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import getProductIngredients from 'src/app/shared/functions/get-product-ingredients';
import getProductName from 'src/app/shared/functions/get-product-name';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../../model/product';
import { factsLoaded } from '../../store/nutrition.actions';
import { selectIngredientAnalysisNames } from '../../store/nutrition.selector';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss'],
})
export class ProductEntryComponent implements OnInit {
  @Input()
  product: Product;

  public ingredientAnalysisNames$: Observable<
    LocalizedName[]
  > = this.store.select(selectIngredientAnalysisNames);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  get productName(): string {
    return getProductName(this.product);
  }

  get productIngredients(): string {
    return getProductIngredients(this.product);
  }

  showDetails(): void {
    this.store.dispatch(factsLoaded({ product: this.product }));
  }
}
