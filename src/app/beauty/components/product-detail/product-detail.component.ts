import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../model/product';
import {
  selectIngredientAnalysisNames,
  selectLoading,
  selectProduct,
} from '../../store/beauty.selector';
import { Location } from '@angular/common';
import getImageSource from 'src/app/shared/functions/get-image-sources';
import { Observable } from 'rxjs';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import getProductIngredients from 'src/app/shared/functions/get-product-ingredients';
import getProductImages from 'src/app/shared/functions/get-product-images';
import { ActivatedRoute } from '@angular/router';
import { loadFacts } from '../../store/beauty.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  public ingredientAnalysisNames$: Observable<
    LocalizedName[]
  > = this.store.select(selectIngredientAnalysisNames);
  
  public loading$ = this.store.select(selectLoading);

  constructor(
    private store: Store,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (!!params.productId) {
        this.store.dispatch(loadFacts({ barcode: params.productId }));
      }
    });
    this.store
      .select(selectProduct)
      .subscribe((product) => (this.product = product));
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  get images(): { name: string; src: string }[] {
    return getProductImages(this.product);
  }

  get ingredients(): string {
    return getProductIngredients(this.product);
  }
}
