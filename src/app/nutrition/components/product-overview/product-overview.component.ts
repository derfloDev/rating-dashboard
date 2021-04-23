import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadLocalizedIngredientAnalysisNames,
  loadLocalizedIngredientNames,
  loadLocalizedNutrientNames,
  searchProducts,
} from '../../store/nutrition.actions';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  searchControl = new FormControl('Nutella'); //'3017620421006');

  constructor(private store: Store, private route: ActivatedRoute) {
    this.store.dispatch(loadLocalizedNutrientNames());
    this.store.dispatch(loadLocalizedIngredientNames());
    this.store.dispatch(loadLocalizedIngredientAnalysisNames());

    this.route.firstChild.params.subscribe((params) => {
      if (!!params.searchTerm) {
        this.searchControl.setValue(params.searchTerm);
        this.loadFacts();
      }
    });
  }

  ngOnInit(): void {}

  loadFacts(): void {
    this.store.dispatch(
      searchProducts({ searchTerm: this.searchControl.value })
    );
    // this.store.dispatch(loadFacts({ barcode: this.searchControl.value }))
  }
}
