import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadFacts, loadNutrientNames } from '../../store/nutrition.actions';

@Component({
  selector: 'app-nutrition-overview',
  templateUrl: './nutrition-overview.component.html',
  styleUrls: ['./nutrition-overview.component.scss']
})
export class NutritionOverviewComponent implements OnInit {

  searchControl = new FormControl('737628064502');

  constructor(private store: Store) {
    this.store.dispatch(loadNutrientNames());
   }

  ngOnInit(): void {
  }

  loadFacts(): void {
    this.store.dispatch(loadFacts({ barcode: this.searchControl.value }))
  }

}
