import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Favorite } from 'src/app/shared/models/favorite.model';
import { Product } from '../../model/product';
import { search } from '../../store/beauty.actions';
import {
  selectCurrentPage,
  selectFavorites,
  selectLoading,
  selectPageSize,
  selectProducts,
  selectSearchFilter,
  selectSearchTerm,
  selectTotalItems,
} from '../../store/beauty.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private products: Product[];
  private searchFilter: any;
  public loading$ = this.store.select(selectLoading);
  public totalItems$ = this.store.select(selectTotalItems);
  public currentPage$ = this.store.select(selectCurrentPage);
  public pageSize$ = this.store.select(selectPageSize);
  public favorites: Favorite[];
  private searchValue: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSearchTerm)
      .subscribe((searchTerm) => (this.searchValue = searchTerm));

    this.store
      .select(selectSearchFilter)
      .subscribe((searchFilter) => (this.searchFilter = searchFilter));

    this.store
      .select(selectProducts)
      .subscribe((products) => (this.products = products));

    this.store
      .select(selectFavorites)
      .subscribe((favorites) => (this.favorites = favorites));
  }

  pageChanged(page: number): void {
    if (!!this.searchValue) {
      this.store.dispatch(search({ searchTerm: this.searchValue, page: page }));
    }
  }

  get filteredProducts(): Product[] {
    if (this.searchFilter.onlyFavorites == true && this.products.length > 0) {
      const favoriteIds = this.favorites.map((favorite) => favorite.productId);
      return this.products.filter((product) =>
        favoriteIds.includes(product.code)
      );
    } else if (
      this.searchFilter.onlyFavorites == true &&
      this.products.length == 0
    ) {
      return this.favorites.map((favorite) => favorite.product as Product);
    }
    return this.products;
  }
}
