import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadFacts, loadIngredientAnalysisNames, loadIngredientNames, loadNutrientNames, searchProducts } from '../../store/nutrition.actions';

@Component({
  selector: 'app-nutrition-overview',
  templateUrl: './nutrition-overview.component.html',
  styleUrls: ['./nutrition-overview.component.scss']
})
export class NutritionOverviewComponent implements OnInit {

  searchControl = new FormControl('3017620421006');

  constructor(private store: Store) {
    this.store.dispatch(loadNutrientNames());
    this.store.dispatch(loadIngredientNames());
    this.store.dispatch(loadIngredientAnalysisNames());
  }

  ngOnInit(): void {
  }

  loadFacts(): void {
    this.store.dispatch(searchProducts({ tag: this.searchControl.value }))
    // this.store.dispatch(loadFacts({ barcode: this.searchControl.value }))
  }

}
