import { ChangeDetectionStrategy, Component } from '@angular/core';
export class ConfirmVariantDeletionDialogComponent {
    constructor() {
        this.variants = [];
    }
    confirm() {
        this.resolveWith(true);
    }
    cancel() {
        this.resolveWith();
    }
}
ConfirmVariantDeletionDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-confirm-variant-deletion-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'catalog.confirm-deletion-of-unused-variants-title' | translate }}\n</ng-template>\n{{ 'catalog.confirm-deletion-of-unused-variants-body' | translate }}\n<ul>\n    <li *ngFor=\"let variant of variants\">{{ variant.name }} ({{ variant.sku }})</li>\n</ul>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"confirm()\" class=\"btn btn-primary\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS12YXJpYW50LWRlbGV0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvY29uZmlybS12YXJpYW50LWRlbGV0aW9uLWRpYWxvZy9jb25maXJtLXZhcmlhbnQtZGVsZXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU25FLE1BQU0sT0FBTyxxQ0FBcUM7SUFObEQ7UUFRSSxhQUFRLEdBQXdDLEVBQUUsQ0FBQztJQVN2RCxDQUFDO0lBUEcsT0FBTztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7O1lBaEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUNBQXFDO2dCQUMvQyxvbEJBQStEO2dCQUUvRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEaWFsb2csIEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jb25maXJtLXZhcmlhbnQtZGVsZXRpb24tZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29uZmlybS12YXJpYW50LWRlbGV0aW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29uZmlybS12YXJpYW50LWRlbGV0aW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtVmFyaWFudERlbGV0aW9uRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgRGlhbG9nPGJvb2xlYW4+IHtcbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgdmFyaWFudHM6IEdldFByb2R1Y3RWYXJpYW50T3B0aW9ucy5WYXJpYW50c1tdID0gW107XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRydWUpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cbn1cbiJdfQ==