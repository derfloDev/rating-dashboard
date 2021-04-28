import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import getImageSource from 'src/app/shared/functions/get-image-sources';
import getProductIngredients from 'src/app/shared/functions/get-product-ingredients';
import getProductName from 'src/app/shared/functions/get-product-name';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { Product } from '../../model/product';
import { productLoaded } from '../../store/beauty.actions';
import { selectIngredientAnalysisNames } from '../../store/beauty.selector';

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

  get productImage(): string {
    return getImageSource(this.product.selected_images?.front?.display);
  }

  showDetails(): void {
    this.store.dispatch(productLoaded({ product: this.product }));
  }
}
