import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BarcodeService } from 'src/app/shared/services/barcode.service';
import {
  loadLocalizedIngredientAnalysisNames,
  searchProducts,
} from '../../store/beauty.actions';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  searchControl = new FormControl('Nivea'); //'4005900388490');

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private barcodeService: BarcodeService
  ) {
    // this.store.dispatch(loadNutrientNames());
    this.store.dispatch(loadLocalizedIngredientAnalysisNames());
    this.route.firstChild.params.subscribe((params) => {
      if (!!params.searchTerm) {
        this.searchControl.setValue(params.searchTerm);
        this.loadFacts();
      }
    });
  }

  ngOnInit(): void {
    this.barcodeService.init('#barcode');
  }

  loadFacts(): void {
    this.store.dispatch(
      searchProducts({ searchTerm: this.searchControl.value })
    );
  }
}
