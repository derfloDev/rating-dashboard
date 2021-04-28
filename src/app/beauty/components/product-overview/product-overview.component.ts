import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BarcodeService } from 'src/app/shared/services/barcode.service';
import {
  loadProduct,
  loadLocalizedIngredientAnalysisNames,
  search,
  loadCountryNames,
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
    this.store.dispatch(loadCountryNames());
    this.store.dispatch(loadLocalizedIngredientAnalysisNames());
    this.route.firstChild.params.subscribe((params) => {
      if (!!params.searchTerm) {
        this.searchControl.setValue(params.searchTerm);
        this.search();
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
    const modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });

    this.barcodeService.initStream('#barcode').subscribe(
      (barcode) => this.barcodeProcessed(barcode),
      (error) => this.barcodeError(error)
    );

    modal.dismissed.subscribe(() => {
      this.barcodeService.close();
    });
  }

  barcodeProcessed(barcode: string): void {
    if (!!barcode) {
      this.searchControl.setValue(barcode);
      this.barcodeService.close();
      this.loadProduct(barcode);
      this.modalService.dismissAll();
    }
  }

  barcodeError(error: any): void {
    this.notificationService.error('Barcode not found');
  }

  loadProduct(barcode: string): void {
    this.store.dispatch(loadProduct({ barcode: barcode }));
  }

  search(): void {
    this.store.dispatch(
      search({ searchTerm: this.searchControl.value, page: 1 })
    );
  }
}
