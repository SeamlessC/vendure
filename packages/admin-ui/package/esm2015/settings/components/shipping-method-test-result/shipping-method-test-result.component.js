import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class ShippingMethodTestResultComponent {
    constructor() {
        this.okToRun = false;
        this.testDataUpdated = false;
        this.runTest = new EventEmitter();
    }
}
ShippingMethodTestResultComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-method-test-result',
                template: "<div\n    class=\"test-result card\"\n    [ngClass]=\"{\n        success: testResult?.eligible === true,\n        error: testResult?.eligible === false,\n        unknown: !testResult\n    }\"\n>\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.eligible' | translate\">\n                <div class=\"eligible-icon\">\n                    <clr-icon\n                        shape=\"success-standard\"\n                        class=\"is-solid success\"\n                        *ngIf=\"testResult?.eligible\"\n                    ></clr-icon>\n                    <clr-icon\n                        shape=\"ban\"\n                        class=\"is-solid error\"\n                        *ngIf=\"testResult?.eligible === false\"\n                    ></clr-icon>\n                    <clr-icon shape=\"unknown-status\" *ngIf=\"!testResult\"></clr-icon>\n                </div>\n                {{ testResult?.eligible }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data\n                    [label]=\"'common.price' | translate\"\n                    *ngIf=\"testResult?.quote?.price != null\"\n                >\n                    {{ testResult.quote?.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data\n                    [label]=\"'common.price-with-tax' | translate\"\n                    *ngIf=\"testResult?.quote?.priceWithTax != null\"\n                >\n                    {{ testResult.quote?.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree\n                *ngIf=\"testResult?.quote?.metadata\"\n                [value]=\"testResult?.quote?.metadata\"\n            ></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-method' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".test-result.success .card-block{background-color:var(--color-success-100)}.test-result.error .card-block{background-color:var(--color-error-100)}.test-result.unknown .card-block{background-color:var(--color-component-bg-100)}.result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.eligible-icon{display:inline-block}.eligible-icon .success{color:var(--color-success-500)}.eligible-icon .error{color:var(--color-error-500)}.price-row{display:flex}.price-row>*:not(:first-child){margin-left:24px}\n"]
            },] }
];
ShippingMethodTestResultComponent.propDecorators = {
    testResult: [{ type: Input }],
    okToRun: [{ type: Input }],
    testDataUpdated: [{ type: Input }],
    currencyCode: [{ type: Input }],
    runTest: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmctbWV0aG9kLXRlc3QtcmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvc2hpcHBpbmctbWV0aG9kLXRlc3QtcmVzdWx0L3NoaXBwaW5nLW1ldGhvZC10ZXN0LXJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVVoRyxNQUFNLE9BQU8saUNBQWlDO0lBTjlDO1FBUWEsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV2QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUNqRCxDQUFDOzs7WUFaQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0MsdXVFQUEyRDtnQkFFM0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7eUJBRUksS0FBSztzQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEN1cnJlbmN5Q29kZSwgVGVzdFNoaXBwaW5nTWV0aG9kUmVzdWx0IH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXNoaXBwaW5nLW1ldGhvZC10ZXN0LXJlc3VsdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoaXBwaW5nLW1ldGhvZC10ZXN0LXJlc3VsdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2hpcHBpbmctbWV0aG9kLXRlc3QtcmVzdWx0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNoaXBwaW5nTWV0aG9kVGVzdFJlc3VsdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdGVzdFJlc3VsdDogVGVzdFNoaXBwaW5nTWV0aG9kUmVzdWx0O1xuICAgIEBJbnB1dCgpIG9rVG9SdW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0ZXN0RGF0YVVwZGF0ZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBjdXJyZW5jeUNvZGU6IEN1cnJlbmN5Q29kZTtcbiAgICBAT3V0cHV0KCkgcnVuVGVzdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn1cbiJdfQ==