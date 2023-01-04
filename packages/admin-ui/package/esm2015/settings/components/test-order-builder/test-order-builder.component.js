import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { DataService, LocalStorageService, } from '@vendure/admin-ui/core';
export class TestOrderBuilderComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.orderLinesChange = new EventEmitter();
        this.lines = [];
    }
    get subTotal() {
        return this.lines.reduce((sum, l) => sum + l.unitPriceWithTax * l.quantity, 0);
    }
    ngOnInit() {
        this.lines = this.loadFromLocalStorage();
        if (this.lines) {
            this.orderLinesChange.emit(this.lines);
        }
        this.dataService.settings.getActiveChannel('cache-first').single$.subscribe(result => {
            this.currencyCode = result.activeChannel.currencyCode;
        });
    }
    selectResult(result) {
        if (result) {
            this.addToLines(result);
        }
    }
    addToLines(result) {
        var _a, _b;
        if (!this.lines.find(l => l.id === result.productVariantId)) {
            this.lines.push({
                id: result.productVariantId,
                name: result.productVariantName,
                preview: (_b = (_a = result.productAsset) === null || _a === void 0 ? void 0 : _a.preview) !== null && _b !== void 0 ? _b : '',
                quantity: 1,
                sku: result.sku,
                unitPriceWithTax: (result.priceWithTax.__typename === 'SinglePrice' && result.priceWithTax.value) || 0,
            });
            this.persistToLocalStorage();
            this.orderLinesChange.emit(this.lines);
        }
    }
    updateQuantity() {
        this.persistToLocalStorage();
        this.orderLinesChange.emit(this.lines);
    }
    removeLine(line) {
        this.lines = this.lines.filter(l => l.id !== line.id);
        this.persistToLocalStorage();
        this.orderLinesChange.emit(this.lines);
    }
    persistToLocalStorage() {
        this.localStorageService.setForCurrentLocation('shippingTestOrder', this.lines);
    }
    loadFromLocalStorage() {
        return this.localStorageService.getForCurrentLocation('shippingTestOrder') || [];
    }
}
TestOrderBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-order-builder',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-order' | translate }}\n    </div>\n    <table class=\"order-table table\" *ngIf=\"lines.length; else emptyPlaceholder\">\n        <thead>\n            <tr>\n                <th></th>\n                <th>{{ 'order.product-name' | translate }}</th>\n                <th>{{ 'order.product-sku' | translate }}</th>\n                <th>{{ 'order.unit-price' | translate }}</th>\n                <th>{{ 'order.quantity' | translate }}</th>\n                <th>{{ 'order.total' | translate }}</th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let line of lines\" class=\"order-line\">\n            <td class=\"align-middle thumb\">\n                <img [src]=\"line.preview + '?preset=tiny'\" />\n            </td>\n            <td class=\"align-middle name\">{{ line.name }}</td>\n            <td class=\"align-middle sku\">{{ line.sku }}</td>\n            <td class=\"align-middle unit-price\">\n                {{ line.unitPriceWithTax | localeCurrency: currencyCode }}\n            </td>\n            <td class=\"align-middle quantity\">\n                <input\n                    [(ngModel)]=\"line.quantity\"\n                    (change)=\"updateQuantity()\"\n                    type=\"number\"\n                    max=\"9999\"\n                    min=\"1\"\n                />\n                <button class=\"icon-button\" (click)=\"removeLine(line)\">\n                    <clr-icon shape=\"trash\"></clr-icon>\n                </button>\n            </td>\n            <td class=\"align-middle total\">\n                {{ (line.unitPriceWithTax * line.quantity) | localeCurrency: currencyCode }}\n            </td>\n        </tr>\n        <tr class=\"sub-total\">\n            <td class=\"left\">{{ 'order.sub-total' | translate }}</td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td>{{ subTotal | localeCurrency: currencyCode }}</td>\n        </tr>\n    </table>\n\n    <ng-template #emptyPlaceholder>\n        <div class=\"card-block empty-placeholder\">\n            <div class=\"empty-text\">{{ 'settings.add-products-to-test-order' | translate }}</div>\n            <clr-icon shape=\"arrow\" dir=\"down\" size=\"96\"></clr-icon>\n        </div>\n    </ng-template>\n    <div class=\"card-block\">\n        <vdr-product-selector (productSelected)=\"selectResult($event)\"> </vdr-product-selector>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".empty-placeholder{color:var(--color-grey-400);text-align:center}.empty-text{font-size:22px}\n"]
            },] }
];
TestOrderBuilderComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];
TestOrderBuilderComponent.propDecorators = {
    orderLinesChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1idWlsZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvdGVzdC1vcmRlci1idWlsZGVyL3Rlc3Qtb3JkZXItYnVpbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFFSCxXQUFXLEVBQ1gsbUJBQW1CLEdBRXRCLE1BQU0sd0JBQXdCLENBQUM7QUFpQmhDLE1BQU0sT0FBTyx5QkFBeUI7SUFRbEMsWUFBb0IsV0FBd0IsRUFBVSxtQkFBd0M7UUFBMUUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUHBGLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ2pFLFVBQUssR0FBb0IsRUFBRSxDQUFDO0lBTXFFLENBQUM7SUFKbEcsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQW1DO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBbUM7O1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1osRUFBRSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7Z0JBQzNCLElBQUksRUFBRSxNQUFNLENBQUMsa0JBQWtCO2dCQUMvQixPQUFPLEVBQUUsTUFBQSxNQUFBLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLE9BQU8sbUNBQUksRUFBRTtnQkFDM0MsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUNmLGdCQUFnQixFQUNaLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEtBQUssYUFBYSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUMzRixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFtQjtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLHFCQUFxQjtRQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTyxvQkFBb0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckYsQ0FBQzs7O1lBakVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyx5OEVBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQW5CRyxXQUFXO1lBQ1gsbUJBQW1COzs7K0JBb0JsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDdXJyZW5jeUNvZGUsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICBQcm9kdWN0U2VsZWN0b3JTZWFyY2gsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRlc3RPcmRlckxpbmUge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHByZXZpZXc6IHN0cmluZztcbiAgICBza3U6IHN0cmluZztcbiAgICB1bml0UHJpY2VXaXRoVGF4OiBudW1iZXI7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdGVzdC1vcmRlci1idWlsZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGVzdC1vcmRlci1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXN0LW9yZGVyLWJ1aWxkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGVzdE9yZGVyQnVpbGRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQE91dHB1dCgpIG9yZGVyTGluZXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRlc3RPcmRlckxpbmVbXT4oKTtcbiAgICBsaW5lczogVGVzdE9yZGVyTGluZVtdID0gW107XG4gICAgY3VycmVuY3lDb2RlOiBDdXJyZW5jeUNvZGU7XG4gICAgZ2V0IHN1YlRvdGFsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpbmVzLnJlZHVjZSgoc3VtLCBsKSA9PiBzdW0gKyBsLnVuaXRQcmljZVdpdGhUYXggKiBsLnF1YW50aXR5LCAwKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubGluZXMgPSB0aGlzLmxvYWRGcm9tTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIGlmICh0aGlzLmxpbmVzKSB7XG4gICAgICAgICAgICB0aGlzLm9yZGVyTGluZXNDaGFuZ2UuZW1pdCh0aGlzLmxpbmVzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldEFjdGl2ZUNoYW5uZWwoJ2NhY2hlLWZpcnN0Jykuc2luZ2xlJC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lDb2RlID0gcmVzdWx0LmFjdGl2ZUNoYW5uZWwuY3VycmVuY3lDb2RlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RSZXN1bHQocmVzdWx0OiBQcm9kdWN0U2VsZWN0b3JTZWFyY2guSXRlbXMpIHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0xpbmVzKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvTGluZXMocmVzdWx0OiBQcm9kdWN0U2VsZWN0b3JTZWFyY2guSXRlbXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxpbmVzLmZpbmQobCA9PiBsLmlkID09PSByZXN1bHQucHJvZHVjdFZhcmlhbnRJZCkpIHtcbiAgICAgICAgICAgIHRoaXMubGluZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHJlc3VsdC5wcm9kdWN0VmFyaWFudElkLFxuICAgICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC5wcm9kdWN0VmFyaWFudE5hbWUsXG4gICAgICAgICAgICAgICAgcHJldmlldzogcmVzdWx0LnByb2R1Y3RBc3NldD8ucHJldmlldyA/PyAnJyxcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcbiAgICAgICAgICAgICAgICBza3U6IHJlc3VsdC5za3UsXG4gICAgICAgICAgICAgICAgdW5pdFByaWNlV2l0aFRheDpcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5wcmljZVdpdGhUYXguX190eXBlbmFtZSA9PT0gJ1NpbmdsZVByaWNlJyAmJiByZXN1bHQucHJpY2VXaXRoVGF4LnZhbHVlKSB8fCAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBlcnNpc3RUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICAgICAgdGhpcy5vcmRlckxpbmVzQ2hhbmdlLmVtaXQodGhpcy5saW5lcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVRdWFudGl0eSgpIHtcbiAgICAgICAgdGhpcy5wZXJzaXN0VG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5vcmRlckxpbmVzQ2hhbmdlLmVtaXQodGhpcy5saW5lcyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTGluZShsaW5lOiBUZXN0T3JkZXJMaW5lKSB7XG4gICAgICAgIHRoaXMubGluZXMgPSB0aGlzLmxpbmVzLmZpbHRlcihsID0+IGwuaWQgIT09IGxpbmUuaWQpO1xuICAgICAgICB0aGlzLnBlcnNpc3RUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLm9yZGVyTGluZXNDaGFuZ2UuZW1pdCh0aGlzLmxpbmVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBlcnNpc3RUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldEZvckN1cnJlbnRMb2NhdGlvbignc2hpcHBpbmdUZXN0T3JkZXInLCB0aGlzLmxpbmVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRGcm9tTG9jYWxTdG9yYWdlKCk6IFRlc3RPcmRlckxpbmVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0Rm9yQ3VycmVudExvY2F0aW9uKCdzaGlwcGluZ1Rlc3RPcmRlcicpIHx8IFtdO1xuICAgIH1cbn1cbiJdfQ==