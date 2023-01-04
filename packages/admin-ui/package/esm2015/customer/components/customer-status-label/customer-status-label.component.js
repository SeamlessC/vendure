import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class CustomerStatusLabelComponent {
}
CustomerStatusLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-status-label',
                template: "<vdr-chip *ngIf=\"customer.user?.id\">\n    <ng-container *ngIf=\"customer.user?.verified\">\n        <clr-icon shape=\"check-circle\" class=\"verified-user-icon\"></clr-icon>\n        {{ 'customer.verified' | translate }}\n    </ng-container>\n    <ng-container *ngIf=\"!customer.user?.verified\">\n        <clr-icon shape=\"check-circle\" class=\"registered-user-icon\"></clr-icon>\n        {{ 'customer.registered' | translate }}\n    </ng-container>\n</vdr-chip>\n<vdr-chip *ngIf=\"!customer.user?.id\">{{ 'customer.guest' | translate }}</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".registered-user-icon{color:var(--color-grey-300)}.verified-user-icon{color:var(--color-success-500)}\n"]
            },] }
];
CustomerStatusLabelComponent.propDecorators = {
    customer: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItc3RhdHVzLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY3VzdG9tZXIvc3JjL2NvbXBvbmVudHMvY3VzdG9tZXItc3RhdHVzLWxhYmVsL2N1c3RvbWVyLXN0YXR1cy1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFVbEYsTUFBTSxPQUFPLDRCQUE0Qjs7O1lBTnhDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxzakJBQXFEO2dCQUVyRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozt1QkFFSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jdXN0b21lci1zdGF0dXMtbGFiZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci1zdGF0dXMtbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLXN0YXR1cy1sYWJlbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclN0YXR1c0xhYmVsQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjdXN0b21lcjogQ3VzdG9tZXIuRnJhZ21lbnQ7XG59XG4iXX0=