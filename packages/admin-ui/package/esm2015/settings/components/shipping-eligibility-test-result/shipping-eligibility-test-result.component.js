import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class ShippingEligibilityTestResultComponent {
    constructor() {
        this.okToRun = false;
        this.testDataUpdated = false;
        this.runTest = new EventEmitter();
    }
}
ShippingEligibilityTestResultComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-shipping-eligibility-test-result',
                template: "<div class=\"test-result card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-result' | translate }}\n    </div>\n    <div class=\"card-block\" *ngFor=\"let quote of testResult\">\n        <div class=\"result-details\" [class.stale]=\"testDataUpdated\">\n            <vdr-labeled-data [label]=\"'settings.shipping-method' | translate\">\n                {{ quote.name }}\n            </vdr-labeled-data>\n            <div class=\"price-row\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ quote.price | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.price-with-tax' | translate\">\n                    {{ quote.priceWithTax | localeCurrency: currencyCode }}\n                </vdr-labeled-data>\n            </div>\n            <vdr-object-tree *ngIf=\"quote.metadata\" [value]=\"quote.metadata\"></vdr-object-tree>\n        </div>\n    </div>\n    <div class=\"card-block\" *ngIf=\"testResult?.length === 0\">\n        <clr-icon shape=\"ban\" class=\"is-solid error\"></clr-icon>\n        {{ 'settings.no-eligible-shipping-methods' | translate }}\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-secondary\" (click)=\"runTest.emit()\" [disabled]=\"!okToRun\">\n            {{ 'settings.test-shipping-methods' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".result-details{transition:opacity .2s}.result-details.stale{opacity:.5}.price-row{display:flex}.price-row>*:not(:first-child){margin-left:24px}clr-icon.error{color:var(--color-error-500)}\n"]
            },] }
];
ShippingEligibilityTestResultComponent.propDecorators = {
    testResult: [{ type: Input }],
    okToRun: [{ type: Input }],
    testDataUpdated: [{ type: Input }],
    currencyCode: [{ type: Input }],
    runTest: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmctZWxpZ2liaWxpdHktdGVzdC1yZXN1bHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVVoRyxNQUFNLE9BQU8sc0NBQXNDO0lBTm5EO1FBUWEsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV2QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUNqRCxDQUFDOzs7WUFaQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQseTZDQUFnRTtnQkFFaEUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7eUJBRUksS0FBSztzQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEN1cnJlbmN5Q29kZSwgU2hpcHBpbmdNZXRob2RRdW90ZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoaXBwaW5nLWVsaWdpYmlsaXR5LXRlc3QtcmVzdWx0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaGlwcGluZy1lbGlnaWJpbGl0eS10ZXN0LXJlc3VsdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTaGlwcGluZ0VsaWdpYmlsaXR5VGVzdFJlc3VsdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdGVzdFJlc3VsdDogU2hpcHBpbmdNZXRob2RRdW90ZVtdO1xuICAgIEBJbnB1dCgpIG9rVG9SdW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0ZXN0RGF0YVVwZGF0ZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBjdXJyZW5jeUNvZGU6IEN1cnJlbmN5Q29kZTtcbiAgICBAT3V0cHV0KCkgcnVuVGVzdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn1cbiJdfQ==