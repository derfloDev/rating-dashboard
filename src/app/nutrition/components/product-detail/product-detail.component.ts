import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../model/product';
import {
  selectFavorites,
  selectIngredientAnalysisNames,
  selectLoading,
  selectProduct,
} from '../../store/nutrition.selector';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import getProductImages from 'src/app/shared/functions/get-product-images';
import { ActivatedRoute } from '@angular/router';
import {
  addFavorite,
  loadProduct,
  removeFavorite,
} from '../../store/nutrition.actions';
import { selectIsAuthenticated } from 'src/app/user/store/user.selector';

@Component({
  selector: 'app-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  public ingredientAnalysisNames$: Observable<
    LocalizedName[]
  > = this.store.select(selectIngredientAnalysisNames);

  public loading$ = this.store.select(selectLoading);
  public favorites$ = this.store.select(selectFavorites);
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private store: Store,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (!!params.productId) {
        this.store.dispatch(loadProduct({ barcode: params.productId }));
      }
    });
    this.store
      .select(selectProduct)
      .subscribe((product) => (this.product = product));
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  goBack(): void {
    this.location.back();
  }

  get images(): { name: string; src: string }[] {
    return getProductImages(this.product);
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
