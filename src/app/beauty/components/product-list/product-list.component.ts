import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading, selectProducts } from '../../store/beauty.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public products$ = this.store.select(selectProducts);

  public loading$ = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
