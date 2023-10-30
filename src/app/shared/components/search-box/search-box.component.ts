import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private _debouncer = new Subject<string>();
  private _debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  private onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this._debouncerSuscription = this._debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this._debouncerSuscription?.unsubscribe();
  }

  public onKeyPress(value: string): void {
    this._debouncer.next(value);
  }
}
