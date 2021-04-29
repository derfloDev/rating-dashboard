import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { LocalizedName } from '../../models/localized-name';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent implements OnInit {
  @Input()
  values: LocalizedName[] = [];

  @Output()
  valueChanged = new EventEmitter<LocalizedName>();

  model: any;

  constructor() {}

  ngOnInit(): void {}

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  formatter = (result: LocalizedName) => result.value.toUpperCase();

  inputFormatter = (x: LocalizedName) => x.value;

  searchCategory: OperatorFunction<string, readonly LocalizedName[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        const sortedNames = [...this.values].sort((a, b) => {
          return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
        });
        const retVal =
          term === ''
            ? sortedNames.slice(0, 200)
            : sortedNames
                .filter(
                  (v) => v.value?.toLowerCase().indexOf(term.toLowerCase()) > -1
                )
                .slice(0, 10);
        return retVal;
      })
    );
  };
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  itemSelected(event: NgbTypeaheadSelectItemEvent<any>): void {
    this.valueChanged.emit(event.item);
  }

  focusOut(): void {
    if (!this.model?.value) {
      this.valueChanged.emit({ key: null, value: null });
      this.model = '';
    }
  }
}
