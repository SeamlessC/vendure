import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * A form input control which displays a number input with a percentage sign suffix.
 */
export class PercentageSuffixInputComponent {
    constructor() {
        this.disabled = false;
        this.readonly = false;
    }
    ngOnChanges(changes) {
        if ('value' in changes) {
            this.writeValue(changes['value'].currentValue);
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
        this.onChange(value);
    }
    writeValue(value) {
        const numericValue = +value;
        if (!Number.isNaN(numericValue)) {
            this._value = numericValue;
        }
    }
}
PercentageSuffixInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-percentage-suffix-input',
                template: `
        <vdr-affixed-input suffix="%">
            <input
                type="number"
                step="1"
                [value]="_value"
                [disabled]="disabled"
                [readonly]="readonly"
                (input)="onInput($event.target.value)"
                (focus)="onTouch()"
            />
        </vdr-affixed-input>
    `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: PercentageSuffixInputComponent,
                        multi: true,
                    },
                ],
                styles: [`
            :host {
                padding: 0;
            }
        `]
            },] }
];
PercentageSuffixInputComponent.propDecorators = {
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudGFnZS1zdWZmaXgtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9hZmZpeGVkLWlucHV0L3BlcmNlbnRhZ2Utc3VmZml4LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFOztHQUVHO0FBK0JILE1BQU0sT0FBTyw4QkFBOEI7SUE5QjNDO1FBK0JhLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztJQWtDOUIsQ0FBQztJQTVCRyxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBc0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDakIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7WUFqRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2QkFBNkI7Z0JBUXZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0tBWVQ7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSw4QkFBOEI7d0JBQzNDLEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKO3lCQXpCRzs7OztTQUlDO2FBc0JSOzs7dUJBRUksS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBBIGZvcm0gaW5wdXQgY29udHJvbCB3aGljaCBkaXNwbGF5cyBhIG51bWJlciBpbnB1dCB3aXRoIGEgcGVyY2VudGFnZSBzaWduIHN1ZmZpeC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcGVyY2VudGFnZS1zdWZmaXgtaW5wdXQnLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx2ZHItYWZmaXhlZC1pbnB1dCBzdWZmaXg9XCIlXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cIl92YWx1ZVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Ub3VjaCgpXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvdmRyLWFmZml4ZWQtaW5wdXQ+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogUGVyY2VudGFnZVN1ZmZpeElucHV0Q29tcG9uZW50LFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGVyY2VudGFnZVN1ZmZpeElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XG4gICAgb25DaGFuZ2U6ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBvblRvdWNoOiAoKSA9PiB2b2lkO1xuICAgIF92YWx1ZTogbnVtYmVyO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlVmFsdWUoY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9ICt2YWx1ZTtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4obnVtZXJpY1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBudW1lcmljVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=