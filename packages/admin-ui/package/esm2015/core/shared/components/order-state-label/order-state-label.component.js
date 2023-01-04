import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * @description
 * Displays the state of an order in a colored chip.
 *
 * @example
 * ```HTML
 * <vdr-order-state-label [state]="order.state"></vdr-order-state-label>
 * ```
 * @docsCategory components
 */
export class OrderStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'AddingItems':
            case 'ArrangingPayment':
                return '';
            case 'Delivered':
                return 'success';
            case 'Cancelled':
            case 'Draft':
                return 'error';
            case 'PaymentAuthorized':
            case 'PaymentSettled':
            case 'PartiallyDelivered':
            case 'PartiallyShipped':
            case 'Shipped':
            default:
                return 'warning';
        }
    }
}
OrderStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-state-label',
                template: "<vdr-chip [ngClass]=\"state\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'Delivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'PartiallyDelivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"ban\" *ngIf=\"state === 'Cancelled'\" size=\"12\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n    <ng-content></ng-content>\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-icon{margin-right:3px}\n"]
            },] }
];
OrderStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc3RhdGUtbGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9vcmRlci1zdGF0ZS1sYWJlbC9vcmRlci1zdGF0ZS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUU7Ozs7Ozs7OztHQVNHO0FBT0gsTUFBTSxPQUFPLHdCQUF3QjtJQUdqQyxJQUFJLGFBQWE7UUFDYixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxrQkFBa0I7Z0JBQ25CLE9BQU8sRUFBRSxDQUFDO1lBQ2QsS0FBSyxXQUFXO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssT0FBTztnQkFDUixPQUFPLE9BQU8sQ0FBQztZQUNuQixLQUFLLG1CQUFtQixDQUFDO1lBQ3pCLEtBQUssZ0JBQWdCLENBQUM7WUFDdEIsS0FBSyxvQkFBb0IsQ0FBQztZQUMxQixLQUFLLGtCQUFrQixDQUFDO1lBQ3hCLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksT0FBTyxTQUFTLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7WUEzQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLHNjQUFpRDtnQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7b0JBRUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEaXNwbGF5cyB0aGUgc3RhdGUgb2YgYW4gb3JkZXIgaW4gYSBjb2xvcmVkIGNoaXAuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYEhUTUxcbiAqIDx2ZHItb3JkZXItc3RhdGUtbGFiZWwgW3N0YXRlXT1cIm9yZGVyLnN0YXRlXCI+PC92ZHItb3JkZXItc3RhdGUtbGFiZWw+XG4gKiBgYGBcbiAqIEBkb2NzQ2F0ZWdvcnkgY29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1zdGF0ZS1sYWJlbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLXN0YXRlLWxhYmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vcmRlci1zdGF0ZS1sYWJlbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclN0YXRlTGFiZWxDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHN0YXRlOiBzdHJpbmc7XG5cbiAgICBnZXQgY2hpcENvbG9yVHlwZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICdBZGRpbmdJdGVtcyc6XG4gICAgICAgICAgICBjYXNlICdBcnJhbmdpbmdQYXltZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICBjYXNlICdEZWxpdmVyZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBjYXNlICdDYW5jZWxsZWQnOlxuICAgICAgICAgICAgY2FzZSAnRHJhZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICAgICAgY2FzZSAnUGF5bWVudEF1dGhvcml6ZWQnOlxuICAgICAgICAgICAgY2FzZSAnUGF5bWVudFNldHRsZWQnOlxuICAgICAgICAgICAgY2FzZSAnUGFydGlhbGx5RGVsaXZlcmVkJzpcbiAgICAgICAgICAgIGNhc2UgJ1BhcnRpYWxseVNoaXBwZWQnOlxuICAgICAgICAgICAgY2FzZSAnU2hpcHBlZCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnd2FybmluZyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=