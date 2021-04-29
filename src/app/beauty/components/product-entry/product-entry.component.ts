import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import getImageSource from 'src/app/shared/functions/get-image-sources';
import getProductIngredients from 'src/app/shared/functions/get-product-ingredients';
import getProductName from 'src/app/shared/functions/get-product-name';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import { selectIsAuthenticated } from 'src/app/user/store/user.selector';
import { Product } from '../../model/product';
import {
  addFavorite,
  productLoaded,
  removeFavorite,
} from '../../store/beauty.actions';
import { selectIngredientAnalysisNames } from '../../store/beauty.selector';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss'],
})
export class ProductEntryComponent implements OnInit {
  @Input()
  product: Product;

  @Input()
  favorites: Favorite[];

  public ingredientAnalysisNames$: Observable<
    LocalizedName[]
  > = this.store.select(selectIngredientAnalysisNames);

  public isAuthenticated$ = this.store.select(selectIsAuthenticated);

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

  toggleFavorite(add: boolean): void {
    if (add === true) {
      this.store.dispatch(addFavorite({ product: this.product }));
    } else {
      console.log('remove fav');
      this.store.dispatch(removeFavorite({ productId: this.product.code }));
    }
  }
}
