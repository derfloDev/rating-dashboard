import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BarcodeService } from 'src/app/shared/services/barcode.service';
import {
  loadLocalizedIngredientAnalysisNames,
  searchProducts,
} from '../../store/beauty.actions';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductOverviewComponent implements OnInit {
  searchControl = new FormControl('Nivea'); //'4005900388490');
  scanningCode = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private barcodeService: BarcodeService,
    private notificationService: NotificationService
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

  ngOnInit(): void {}

  fileUploaded(event: any): void {
    const file: File = event.target.files[0];
    if (!!file) {
      const url = URL.createObjectURL(file);
      this.barcodeService.initSingle(url).subscribe(
        (barcode) => this.barcodeProcessed(barcode),
        (error) => this.barcodeError(error)
      );
    }
  }

  scanCode(): void {
    this.scanningCode = true;
    this.barcodeService.initStream('#barcode').subscribe(
      (barcode) => this.barcodeProcessed(barcode),
      (error) => this.barcodeError(error)
    );
  }

  barcodeProcessed(barcode: string): void {
    if (!!barcode) {
      this.searchControl.setValue(barcode);
      this.barcodeService.close('#barcode');
      this.loadFacts();
      this.scanningCode = false;
      $('#exampleModal').modal('hide')
    }
  }

  barcodeError(error: any): void {
    this.notificationService.error(error.toString());
  }

  loadFacts(): void {
    this.store.dispatch(
      searchProducts({ searchTerm: this.searchControl.value })
    );
  }
}
