import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../model/product';
import { selectProduct } from '../../store/nutrition.selector';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition-detail.component.html',
  styleUrls: ['./nutrition-detail.component.scss']
})
export class NutritionDetailComponent implements OnInit {

  public product: Product;

  constructor(private store: Store) {
    this.store.select(selectProduct).subscribe(product => this.product = product);
  }

  ngOnInit(): void {
  }

  get nutriscoreImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/nutriscore-${this.product.nutriscore_grade}.svg`;
  }

  get novaImageUrl():string{
    return `https://static.openfoodfacts.org/images/attributes/nova-group-${this.product.nova_group}.svg`;

  }
}
