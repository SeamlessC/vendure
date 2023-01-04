import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * A form input control which displays currency in decimal format, whilst working
 * with the integer cent value in the background.
 *
 * @example
 * ```HTML
 * <vdr-currency-input
 *     [(ngModel)]="entityPrice"
 *     [currencyCode]="currencyCode"
 * ></vdr-currency-input>
 * ```
 *
 * @docsCategory components
 */
export class CurrencyInputComponent {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.disabled = false;
        this.readonly = false;
        this.currencyCode = '';
        this.valueChange = new EventEmitter();
        this.hasFractionPart = true;
        this.currencyCode$ = new BehaviorSubject('');
    }
    ngOnInit() {
        const languageCode$ = this.dataService.client.uiState().mapStream(data => data.uiState.language);
        const shouldPrefix$ = combineLatest(languageCode$, this.currencyCode$).pipe(map(([languageCode, currencyCode]) => {
            var _a, _b;
            if (!currencyCode) {
                return '';
            }
            const locale = languageCode.replace(/_/g, '-');
            const parts = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).formatToParts();
            const NaNString = (_b = (_a = parts.find(p => p.type === 'nan')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 'NaN';
            const localised = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).format(undefined);
            return localised.indexOf(NaNString) > 0;
        }));
        this.prefix$ = shouldPrefix$.pipe(map(shouldPrefix => (shouldPrefix ? this.currencyCode : '')));
        this.suffix$ = shouldPrefix$.pipe(map(shouldPrefix => (shouldPrefix ? '' : this.currencyCode)));
        this.subscription = combineLatest(languageCode$, this.currencyCode$).subscribe(([languageCode, currencyCode]) => {
            if (!currencyCode) {
                return '';
            }
            const locale = languageCode.replace(/_/g, '-');
            const parts = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).formatToParts(123.45);
            this.hasFractionPart = !!parts.find(p => p.type === 'fraction');
            this._inputValue = this.toNumericString(this._inputValue);
        });
    }
    ngOnChanges(changes) {
        if ('value' in changes) {
            this.writeValue(changes['value'].currentValue);
        }
        if ('currencyCode' in changes) {
            this.currencyCode$.next(this.currencyCode);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onInput(value) {
        const integerValue = Math.round(+value * 100);
        if (typeof this.onChange === 'function') {
            this.onChange(integerValue);
        }
        this.valueChange.emit(integerValue);
        const delta = Math.abs(Number(this._inputValue) - Number(value));
        if (0.009 < delta && delta < 0.011) {
            this._inputValue = this.toNumericString(value);
        }
        else {
            this._inputValue = value;
        }
    }
    onFocus() {
        if (typeof this.onTouch === 'function') {
            this.onTouch();
        }
    }
    writeValue(value) {
        const numericValue = +value;
        if (!Number.isNaN(numericValue)) {
            this._inputValue = this.toNumericString(Math.floor(value) / 100);
        }
    }
    toNumericString(value) {
        return this.hasFractionPart ? Number(value).toFixed(2) : Number(value).toFixed(0);
    }
}
CurrencyInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-currency-input',
                template: "<vdr-affixed-input\n    [prefix]=\"prefix$ | async | localeCurrencyName: 'symbol'\"\n    [suffix]=\"suffix$ | async | localeCurrencyName: 'symbol'\"\n>\n    <input\n        type=\"number\"\n        [step]=\"hasFractionPart ? 0.01 : 1\"\n        [value]=\"_inputValue\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        (input)=\"onInput($event.target.value)\"\n        (focus)=\"onFocus()\"\n    />\n</vdr-affixed-input>\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: CurrencyInputComponent,
                        multi: true,
                    },
                ],
                styles: [":host{padding:0;border:none}input{max-width:96px}input[readonly]{background-color:transparent}\n"]
            },] }
];
CurrencyInputComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
CurrencyInputComponent.propDecorators = {
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    value: [{ type: Input }],
    currencyCode: [{ type: Input }],
    valueChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jdXJyZW5jeS1pbnB1dC9jdXJyZW5jeS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUE0QixNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBYUgsTUFBTSxPQUFPLHNCQUFzQjtJQWUvQixZQUFvQixXQUF3QixFQUFVLGlCQUFvQztRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFkakYsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUczQyxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUlmLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFHcUMsQ0FBQztJQUU5RixRQUFRO1FBQ0osTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFF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IENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBmb3JtIGlucHV0IGNvbnRyb2wgd2hpY2ggZGlzcGxheXMgY3VycmVuY3kgaW4gZGVjaW1hbCBmb3JtYXQsIHdoaWxzdCB3b3JraW5nXG4gKiB3aXRoIHRoZSBpbnRlZ2VyIGNlbnQgdmFsdWUgaW4gdGhlIGJhY2tncm91bmQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYEhUTUxcbiAqIDx2ZHItY3VycmVuY3ktaW5wdXRcbiAqICAgICBbKG5nTW9kZWwpXT1cImVudGl0eVByaWNlXCJcbiAqICAgICBbY3VycmVuY3lDb2RlXT1cImN1cnJlbmN5Q29kZVwiXG4gKiA+PC92ZHItY3VycmVuY3ktaW5wdXQ+XG4gKiBgYGBcbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGNvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY3VycmVuY3ktaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXJyZW5jeS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3VycmVuY3ktaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogQ3VycmVuY3lJbnB1dENvbXBvbmVudCxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XG4gICAgQElucHV0KCkgY3VycmVuY3lDb2RlID0gJyc7XG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHByZWZpeCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgICBzdWZmaXgkOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gICAgaGFzRnJhY3Rpb25QYXJ0ID0gdHJ1ZTtcbiAgICBvbkNoYW5nZTogKHZhbDogYW55KSA9PiB2b2lkO1xuICAgIG9uVG91Y2g6ICgpID0+IHZvaWQ7XG4gICAgX2lucHV0VmFsdWU6IHN0cmluZztcbiAgICBwcml2YXRlIGN1cnJlbmN5Q29kZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VDb2RlJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVpU3RhdGUoKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnVpU3RhdGUubGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBzaG91bGRQcmVmaXgkID0gY29tYmluZUxhdGVzdChsYW5ndWFnZUNvZGUkLCB0aGlzLmN1cnJlbmN5Q29kZSQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtsYW5ndWFnZUNvZGUsIGN1cnJlbmN5Q29kZV0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbmN5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsZSA9IGxhbmd1YWdlQ29kZS5yZXBsYWNlKC9fL2csICctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSAoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5RGlzcGxheTogJ3N5bWJvbCcsXG4gICAgICAgICAgICAgICAgICAgIH0pIGFzIGFueVxuICAgICAgICAgICAgICAgICkuZm9ybWF0VG9QYXJ0cygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IE5hTlN0cmluZyA9IHBhcnRzLmZpbmQocCA9PiBwLnR5cGUgPT09ICduYW4nKT8udmFsdWUgPz8gJ05hTic7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxpc2VkID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lEaXNwbGF5OiAnc3ltYm9sJyxcbiAgICAgICAgICAgICAgICB9KS5mb3JtYXQodW5kZWZpbmVkIGFzIGFueSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXNlZC5pbmRleE9mKE5hTlN0cmluZykgPiAwO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHJlZml4JCA9IHNob3VsZFByZWZpeCQucGlwZShtYXAoc2hvdWxkUHJlZml4ID0+IChzaG91bGRQcmVmaXggPyB0aGlzLmN1cnJlbmN5Q29kZSA6ICcnKSkpO1xuICAgICAgICB0aGlzLnN1ZmZpeCQgPSBzaG91bGRQcmVmaXgkLnBpcGUobWFwKHNob3VsZFByZWZpeCA9PiAoc2hvdWxkUHJlZml4ID8gJycgOiB0aGlzLmN1cnJlbmN5Q29kZSkpKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QobGFuZ3VhZ2VDb2RlJCwgdGhpcy5jdXJyZW5jeUNvZGUkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoW2xhbmd1YWdlQ29kZSwgY3VycmVuY3lDb2RlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVuY3lDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxlID0gbGFuZ3VhZ2VDb2RlLnJlcGxhY2UoL18vZywgJy0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lEaXNwbGF5OiAnc3ltYm9sJyxcbiAgICAgICAgICAgICAgICAgICAgfSkgYXMgYW55XG4gICAgICAgICAgICAgICAgKS5mb3JtYXRUb1BhcnRzKDEyMy40NSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNGcmFjdGlvblBhcnQgPSAhIXBhcnRzLmZpbmQocCA9PiBwLnR5cGUgPT09ICdmcmFjdGlvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSB0aGlzLnRvTnVtZXJpY1N0cmluZyh0aGlzLl9pbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlVmFsdWUoY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnY3VycmVuY3lDb2RlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5Q29kZSQubmV4dCh0aGlzLmN1cnJlbmN5Q29kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW50ZWdlclZhbHVlID0gTWF0aC5yb3VuZCgrdmFsdWUgKiAxMDApO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoaW50ZWdlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoaW50ZWdlclZhbHVlKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBNYXRoLmFicyhOdW1iZXIodGhpcy5faW5wdXRWYWx1ZSkgLSBOdW1iZXIodmFsdWUpKTtcbiAgICAgICAgaWYgKDAuMDA5IDwgZGVsdGEgJiYgZGVsdGEgPCAwLjAxMSkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXRWYWx1ZSA9IHRoaXMudG9OdW1lcmljU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRvdWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBudW1lcmljVmFsdWUgPSArdmFsdWU7XG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKG51bWVyaWNWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSB0aGlzLnRvTnVtZXJpY1N0cmluZyhNYXRoLmZsb29yKHZhbHVlKSAvIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRvTnVtZXJpY1N0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzRnJhY3Rpb25QYXJ0ID8gTnVtYmVyKHZhbHVlKS50b0ZpeGVkKDIpIDogTnVtYmVyKHZhbHVlKS50b0ZpeGVkKDApO1xuICAgIH1cbn1cbiJdfQ==