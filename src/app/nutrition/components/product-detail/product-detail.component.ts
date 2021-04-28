import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../model/product';
import {
  selectIngredientAnalysisNames,
  selectLoading,
  selectProduct,
} from '../../store/nutrition.selector';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { LocalizedName } from 'src/app/shared/models/localized-name';
import getProductImages from 'src/app/shared/functions/get-product-images';
import { ActivatedRoute } from '@angular/router';
import { loadProduct } from '../../store/nutrition.actions';
import { FavoritesService } from '../../services/favorites.service';

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

  constructor(
    private store: Store,
    private location: Location,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {
    this.route.params.subscribe((params) => {
      if (!!params.productId) {
        this.store.dispatch(loadProduct({ barcode: params.productId }));
      }
    });
    this.store
      .select(selectProduct)
      .subscribe((product) => (this.product = product));

    this.favoritesService.get().subscribe();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  goBack(): void {
    this.location.back();
  }

  addFavorite(): void {
    this.favoritesService.add(this.product.code).subscribe();
  }

  get images(): { name: string; src: string }[] {
    return getProductImages(this.product);
  }
}
