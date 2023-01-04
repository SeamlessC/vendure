import { ChangeDetectionStrategy, Component } from '@angular/core';
export class SettleRefundDialogComponent {
    constructor() {
        this.transactionId = '';
    }
    submit() {
        this.resolveWith(this.transactionId);
    }
    cancel() {
        this.resolveWith();
    }
}
SettleRefundDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-settle-refund-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.settle-refund' | translate }}</ng-template>\n<p class=\"instruction\">\n    {{ 'order.settle-refund-manual-instructions' | translate: { method: refund.method } }}\n</p>\n<clr-input-container>\n    <label>{{ 'order.transaction-id' | translate }}</label>\n    <input clrInput name=\"transactionId\" [(ngModel)]=\"transactionId\" />\n</clr-input-container>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" [disabled]=\"!transactionId\" class=\"btn btn-primary\">\n        {{ 'order.settle-refund' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{padding-bottom:32px}.instruction{margin-top:0;margin-bottom:24px}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGxlLXJlZnVuZC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9zZXR0bGUtcmVmdW5kLWRpYWxvZy9zZXR0bGUtcmVmdW5kLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVduRSxNQUFNLE9BQU8sMkJBQTJCO0lBTnhDO1FBUUksa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFVdkIsQ0FBQztJQVBHLE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFqQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLDZ0QkFBb0Q7Z0JBRXBELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT3JkZXJEZXRhaWwgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1zZXR0bGUtcmVmdW5kLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NldHRsZS1yZWZ1bmQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZXR0bGUtcmVmdW5kLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTZXR0bGVSZWZ1bmREaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBEaWFsb2c8c3RyaW5nPiB7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgdHJhbnNhY3Rpb25JZCA9ICcnO1xuICAgIHJlZnVuZDogT3JkZXJEZXRhaWwuUmVmdW5kcztcblxuICAgIHN1Ym1pdCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnRyYW5zYWN0aW9uSWQpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cbn1cbiJdfQ==