import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * A wrapper around an <input> element which adds a prefix and/or a suffix element.
 */
export class AffixedInputComponent {
}
AffixedInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-affixed-input',
                template: "<div [class.has-prefix]=\"!!prefix\" [class.has-suffix]=\"!!suffix\">\n    <ng-content></ng-content>\n</div>\n<div class=\"affix prefix\" *ngIf=\"prefix\">{{ prefix }}</div>\n<div class=\"affix suffix\" *ngIf=\"suffix\">{{ suffix }}</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-flex}.affix{color:var(--color-grey-800);display:flex;align-items:center;background-color:var(--color-grey-200);border:1px solid var(--color-component-border-300);top:1px;padding:3px;line-height:.58333rem;transition:border .2s}::ng-deep .has-prefix input{border-top-left-radius:0!important;border-bottom-left-radius:0!important}.prefix{order:-1;border-radius:3px 0 0 3px;border-right:none}::ng-deep .has-suffix input{border-top-right-radius:0!important;border-bottom-right-radius:0!important}.suffix{border-radius:0 3px 3px 0;border-left:none}\n"]
            },] }
];
AffixedInputComponent.propDecorators = {
    prefix: [{ type: Input }],
    suffix: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZmaXhlZC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2FmZml4ZWQtaW5wdXQvYWZmaXhlZC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUU7O0dBRUc7QUFPSCxNQUFNLE9BQU8scUJBQXFCOzs7WUFOakMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDRQQUE2QztnQkFFN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7cUJBRUksS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIGFuIDxpbnB1dD4gZWxlbWVudCB3aGljaCBhZGRzIGEgcHJlZml4IGFuZC9vciBhIHN1ZmZpeCBlbGVtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hZmZpeGVkLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWZmaXhlZC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWZmaXhlZC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBZmZpeGVkSW5wdXRDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHByZWZpeDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nO1xufVxuIl19