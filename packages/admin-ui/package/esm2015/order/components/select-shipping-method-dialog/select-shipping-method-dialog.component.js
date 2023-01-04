import { Component, ChangeDetectionStrategy } from '@angular/core';
export class SelectShippingMethodDialogComponent {
    constructor() { }
    ngOnInit() {
        if (this.currentSelectionId) {
            this.selectedMethod = this.eligibleShippingMethods.find(m => m.id === this.currentSelectionId);
        }
    }
    methodIdFn(item) {
        return item.id;
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        if (this.selectedMethod) {
            this.resolveWith(this.selectedMethod.id);
        }
    }
}
SelectShippingMethodDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-shipping-method-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.select-shipping-method' | translate }}</ng-template>\n<vdr-radio-card-fieldset\n    [idFn]=\"methodIdFn\"\n    [selectedItemId]=\"selectedMethod?.id\"\n    (selectItem)=\"selectedMethod = $event\"\n>\n    <vdr-radio-card *ngFor=\"let quote of eligibleShippingMethods\" [item]=\"quote\">\n        <div class=\"result-details\">\n            <vdr-labeled-data [label]=\"'settings.shipping-method' | translate\">\n                {{ quote.name }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ quote.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.price-with-tax' | translate\">\n                    {{ quote.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree *ngIf=\"quote.metadata\" [value]=\"quote.metadata\"></vdr-object-tree>\n        </div>\n    </vdr-radio-card>\n</vdr-radio-card-fieldset>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"!selectedMethod\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
SelectShippingMethodDialogComponent.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNoaXBwaW5nLW1ldGhvZC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9zZWxlY3Qtc2hpcHBpbmctbWV0aG9kLWRpYWxvZy9zZWxlY3Qtc2hpcHBpbmctbWV0aG9kLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlCM0UsTUFBTSxPQUFPLG1DQUFtQztJQU01QyxnQkFBZSxDQUFDO0lBRWhCLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2xHO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUF5QjtRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs7O1lBaENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QywwOUNBQTZEO2dCQUU3RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ3JlYXRlQWRkcmVzc0lucHV0LFxuICAgIEN1cnJlbmN5Q29kZSxcbiAgICBEaWFsb2csXG4gICAgRHJhZnRPcmRlckVsaWdpYmxlU2hpcHBpbmdNZXRob2RzUXVlcnksXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG50eXBlIFNoaXBwaW5nTWV0aG9kUXVvdGUgPVxuICAgIERyYWZ0T3JkZXJFbGlnaWJsZVNoaXBwaW5nTWV0aG9kc1F1ZXJ5WydlbGlnaWJsZVNoaXBwaW5nTWV0aG9kc0ZvckRyYWZ0T3JkZXInXVtudW1iZXJdO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1zZWxlY3Qtc2hpcHBpbmctbWV0aG9kLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1zaGlwcGluZy1tZXRob2QtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWxlY3Qtc2hpcHBpbmctbWV0aG9kLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RTaGlwcGluZ01ldGhvZERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRGlhbG9nPHN0cmluZz4ge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0Pzogc3RyaW5nKSA9PiB2b2lkO1xuICAgIGVsaWdpYmxlU2hpcHBpbmdNZXRob2RzOiBTaGlwcGluZ01ldGhvZFF1b3RlW107XG4gICAgY3VycmVudFNlbGVjdGlvbklkOiBzdHJpbmc7XG4gICAgY3VycmVuY3lDb2RlOiBDdXJyZW5jeUNvZGU7XG4gICAgc2VsZWN0ZWRNZXRob2Q6IFNoaXBwaW5nTWV0aG9kUXVvdGUgfCB1bmRlZmluZWQ7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTZWxlY3Rpb25JZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1ldGhvZCA9IHRoaXMuZWxpZ2libGVTaGlwcGluZ01ldGhvZHMuZmluZChtID0+IG0uaWQgPT09IHRoaXMuY3VycmVudFNlbGVjdGlvbklkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZElkRm4oaXRlbTogU2hpcHBpbmdNZXRob2RRdW90ZSkge1xuICAgICAgICByZXR1cm4gaXRlbS5pZDtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWV0aG9kKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuc2VsZWN0ZWRNZXRob2QuaWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19