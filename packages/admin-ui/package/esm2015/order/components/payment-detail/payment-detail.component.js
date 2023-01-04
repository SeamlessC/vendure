import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class PaymentDetailComponent {
}
PaymentDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-detail',
                template: "<vdr-labeled-data [label]=\"'order.payment-method' | translate\">\n    {{ payment.method }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.amount' | translate\">\n    {{ payment.amount | localeCurrency: currencyCode }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"payment.errorMessage\" [label]=\"'order.error-message' | translate\">\n    {{ payment.errorMessage }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"payment.transactionId\" [label]=\"'order.transaction-id' | translate\">\n    {{ payment.transactionId }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.payment-metadata' | translate\">\n    <vdr-object-tree [value]=\"payment.metadata\"></vdr-object-tree>\n</vdr-labeled-data>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
PaymentDetailComponent.propDecorators = {
    payment: [{ type: Input }],
    currencyCode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9wYXltZW50LWRldGFpbC9wYXltZW50LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVMUUsTUFBTSxPQUFPLHNCQUFzQjs7O1lBTmxDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixzdEJBQThDO2dCQUU5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztzQkFFSSxLQUFLOzJCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDdXJyZW5jeUNvZGUsIE9yZGVyRGV0YWlsIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXBheW1lbnQtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGF5bWVudC1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BheW1lbnQtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnREZXRhaWxDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHBheW1lbnQ6IE9yZGVyRGV0YWlsLlBheW1lbnRzO1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5Q29kZTogQ3VycmVuY3lDb2RlO1xufVxuIl19