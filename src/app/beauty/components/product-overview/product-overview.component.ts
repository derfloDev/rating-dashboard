import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BarcodeService } from 'src/app/shared/services/barcode.service';
import {
  loadFacts,
  loadLocalizedIngredientAnalysisNames,
  searchProducts,
} from '../../store/beauty.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductOverviewComponent implements OnInit {
  searchControl = new FormControl('Nivea'); //'4005900388490');

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private barcodeService: BarcodeService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    // this.store.dispatch(loadNutrientNames());
    this.store.dispatch(loadLocalizedIngredientAnalysisNames());
    this.route.firstChild.params.subscribe((params) => {
      if (!!params.searchTerm) {
        this.searchControl.setValue(params.searchTerm);
        this.searchProducts();
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

  scanCode(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    this.barcodeService.initStream('#barcode').subscribe(
      (barcode) => this.barcodeProcessed(barcode),
      (error) => this.barcodeError(error)
    );
  }

  barcodeProcessed(barcode: string): void {
    if (!!barcode) {
      this.searchControl.setValue(barcode);
      this.barcodeService.close('#barcode');
      this.loadFacts(barcode);
      this.modalService.dismissAll();
    }
  }

  barcodeError(error: any): void {
    this.notificationService.error(error.toString());
  }

  loadFacts(barcode: string): void {
    this.store.dispatch(loadFacts({ barcode: barcode }));
  }

  searchProducts(): void {
    this.store.dispatch(
      searchProducts({ searchTerm: this.searchControl.value })
    );
  }
}
