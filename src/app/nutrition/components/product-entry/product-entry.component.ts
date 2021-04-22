import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../model/product';
import { factsLoaded } from '../../store/nutrition.actions';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss'],
})
export class ProductEntryComponent implements OnInit {
  @Input()
  product: Product;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  get productName(): string {
    return this.product.generic_name_en
      ? this.product.generic_name_en
      : this.product.generic_name;
  }

  get productIngredients(): string {
    return this.product.ingredients_text_en
      ? this.product.ingredients_text_en
      : this.product.ingredients_text;
  }

  showDetails(): void {
    this.store.dispatch(factsLoaded({ product: this.product }));
  }
}
