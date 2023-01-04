import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class CustomerLabelComponent {
}
CustomerLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-label',
                template: "<clr-icon shape=\"user\" [class.is-solid]=\"customer\"></clr-icon>\n<div *ngIf=\"customer\">\n    <a [routerLink]=\"['/customer', 'customers', customer.id]\">\n        {{ customer.firstName }} {{ customer.lastName }}\n    </a>\n    <br />\n    <a [routerLink]=\"['/customer', 'customers', customer.id]\">\n        {{ customer.phoneNumber }}\n    </a>\n</div>\n<div *ngIf=\"!customer\">{{ 'common.guest' | translate }}</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center}clr-icon{margin-right:6px}\n"]
            },] }
];
CustomerLabelComponent.propDecorators = {
    customer: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jdXN0b21lci1sYWJlbC9jdXN0b21lci1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFVbEYsTUFBTSxPQUFPLHNCQUFzQjs7O1lBTmxDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixxYkFBOEM7Z0JBRTlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1c3RvbWVyLWxhYmVsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTGFiZWxDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGN1c3RvbWVyOiBDdXN0b21lci5GcmFnbWVudDtcbn1cbiJdfQ==