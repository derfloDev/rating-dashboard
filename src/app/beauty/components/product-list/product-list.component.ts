import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { search } from '../../store/beauty.actions';
import {
  selectCurrentPage,
  selectLoading,
  selectPageSize,
  selectProducts,
  selectSearchTerm,
  selectTotalItems,
} from '../../store/beauty.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public products$ = this.store.select(selectProducts);
  public loading$ = this.store.select(selectLoading);
  public totalItems$ = this.store.select(selectTotalItems);
  public currentPage$ = this.store.select(selectCurrentPage);
  public pageSize$ = this.store.select(selectPageSize);
  private searchValue: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSearchTerm)
      .subscribe((searchTerm) => (this.searchValue = searchTerm));
  }

  pageChanged(page: number): void {
    if (!!this.searchValue) {
      this.store.dispatch(search({ searchTerm: this.searchValue, page: page }));
    }
  }
}
