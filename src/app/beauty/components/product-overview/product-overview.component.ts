import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BarcodeService } from 'src/app/shared/services/barcode.service';
import {
  loadProduct,
  search,
  changeClientSearchFilter,
  changeServerSearchFilter,
  loadMetadata,
} from '../../store/beauty.actions';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { selectIsAuthenticated } from 'src/app/user/store/user.selector';
import {
  selectAdditiveNames,
  selectAllergenNames,
  selectBrandNames,
  selectCategoryNames,
} from '../../store/beauty.selector';
import { LocalizedName } from 'src/app/shared/models/localized-name';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductOverviewComponent implements OnInit {
  searchControl = new FormControl('');
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);
  public onlyFavorites: boolean = false;
  public isFilterCollapsed = true;
  public allergenNames$ = this.store.select(selectAllergenNames);
  public brandNames$ = this.store.select(selectBrandNames);
  public categoryNames$ = this.store.select(selectCategoryNames);
  public additiveNames$ = this.store.select(selectAdditiveNames);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private barcodeService: BarcodeService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    this.store.dispatch(loadMetadata());
    this.route.firstChild.params.subscribe((params) => {
      if (!!params.searchTerm) {
        this.searchControl.setValue(params.searchTerm);
        this.search();
      }
    });
  }

  ngOnInit(): void {}

  get isMediadeviceSupported(): boolean {
    return this.barcodeService.isMediaDeviceSupported();
  }

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

  toggleTooltip(tooltip: NgbTooltip, hide: boolean) {
    if (tooltip.isOpen() || hide) {
      tooltip.close();
    } else if (!this.isMediadeviceSupported) {
      tooltip.open();
    }
  }

  toggleFavorites(): void {
    this.onlyFavorites = !this.onlyFavorites;
    this.store.dispatch(
      changeClientSearchFilter({
        filter: { onlyFavorites: this.onlyFavorites },
      })
    );
  }

  filterChanged(event: { key: string; value: string }): void {
    this.store.dispatch(
      changeServerSearchFilter({ filter: { [event.key]: event.value } })
    );
  }

  get ingredientsFromPalmOil(): LocalizedName[] {
    return [
      { key: 'with', value: 'Ja' },
      { key: 'without', value: 'Nein' },
      { key: 'indifferent', value: 'Egal' },
    ];
  }
}
