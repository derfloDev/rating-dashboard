import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../model/product';
import { selectProduct } from '../../store/nutrition.selector';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition-detail.component.html',
  styleUrls: ['./nutrition-detail.component.scss'],
})
export class NutritionDetailComponent implements OnInit {
  public product: Product;

  constructor(private store: Store, private router: Router) {
    this.store
      .select(selectProduct)
      .subscribe((product) => (this.product = product));
  }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/nutrition']);
  }
}
