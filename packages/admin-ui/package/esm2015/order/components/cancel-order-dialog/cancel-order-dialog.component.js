import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { getAppConfig, I18nService, } from '@vendure/admin-ui/core';
export class CancelOrderDialogComponent {
    constructor(i18nService) {
        var _a;
        this.i18nService = i18nService;
        this.cancelAll = true;
        this.lineQuantities = {};
        this.reasons = (_a = getAppConfig().cancellationReasons) !== null && _a !== void 0 ? _a : [
            _('order.cancel-reason-customer-request'),
            _('order.cancel-reason-not-available'),
        ];
        this.reasons = this.reasons.map(r => this.i18nService.translate(r));
    }
    get selectionCount() {
        return Object.values(this.lineQuantities).reduce((sum, n) => sum + n, 0);
    }
    ngOnInit() {
        this.lineQuantities = this.order.lines.reduce((result, line) => {
            return Object.assign(Object.assign({}, result), { [line.id]: line.quantity });
        }, {});
    }
    radioChanged() {
        if (this.cancelAll) {
            for (const line of this.order.lines) {
                this.lineQuantities[line.id] = line.quantity;
            }
        }
        else {
            for (const line of this.order.lines) {
                this.lineQuantities[line.id] = 0;
            }
        }
    }
    checkIfAllSelected() {
        var _a;
        for (const [lineId, quantity] of Object.entries(this.lineQuantities)) {
            const quantityInOrder = (_a = this.order.lines.find(line => line.id === lineId)) === null || _a === void 0 ? void 0 : _a.quantity;
            if (quantityInOrder && quantity < quantityInOrder) {
                return;
            }
        }
        // If we got here, all of the selected quantities are equal to the order
        // line quantities, i.e. everything is selected.
        this.cancelAll = true;
    }
    select() {
        this.resolveWith({
            orderId: this.order.id,
            lines: this.getLineInputs(),
            reason: this.reason,
            cancelShipping: this.cancelAll,
        });
    }
    cancel() {
        this.resolveWith();
    }
    getLineInputs() {
        if (this.order.active) {
            return;
        }
        return Object.entries(this.lineQuantities)
            .map(([orderLineId, quantity]) => ({
            orderLineId,
            quantity,
        }))
            .filter(l => 0 < l.quantity);
    }
}
CancelOrderDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-cancel-order-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.cancel-order' | translate }}</ng-template>\n\n<div class=\"fulfillment-wrapper\">\n    <div class=\"order-lines\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.unit-price' | translate }}</th>\n                    <th>{{ 'order.cancel' | translate }}</th>\n                </tr>\n            </thead>\n            <tr\n                *ngFor=\"let line of order.lines\"\n                class=\"order-line\"\n                [class.is-disabled]=\"cancelAll\"\n                [class.is-cancelled]=\"line.quantity === 0\"\n            >\n                <td class=\"align-middle thumb\">\n                    <img [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">{{ line.quantity }}</td>\n                <td class=\"align-middle quantity\">\n                    {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                </td>\n                <td class=\"align-middle fulfil\">\n                    <input\n                        *ngIf=\"line.quantity > 0 && !order.active; else nonEditable\"\n                        [(ngModel)]=\"lineQuantities[line.id]\"\n                        (input)=\"checkIfAllSelected()\"\n                        [disabled]=\"cancelAll\"\n                        type=\"number\"\n                        [max]=\"line.quantity\"\n                        min=\"0\"\n                    />\n                    <ng-template #nonEditable>{{ line.quantity }}</ng-template>\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"cancellation-details\">\n        <ng-container *ngIf=\"order.active !== true\">\n            <clr-radio-wrapper>\n                <input\n                    type=\"radio\"\n                    clrRadio\n                    [value]=\"true\"\n                    [(ngModel)]=\"cancelAll\"\n                    name=\"options\"\n                    (ngModelChange)=\"radioChanged()\"\n                />\n                <label>{{ 'order.cancel-entire-order' | translate }}</label>\n            </clr-radio-wrapper>\n            <clr-radio-wrapper>\n                <input\n                    type=\"radio\"\n                    clrRadio\n                    [value]=\"false\"\n                    [(ngModel)]=\"cancelAll\"\n                    name=\"options\"\n                    (ngModelChange)=\"radioChanged()\"\n                />\n                <label>{{ 'order.cancel-specified-items' | translate }}</label>\n            </clr-radio-wrapper>\n        </ng-container>\n        <label class=\"clr-control-label\">{{ 'order.cancellation-reason' | translate }}</label>\n        <ng-select\n            [items]=\"reasons\"\n            bindLabel=\"name\"\n            autofocus\n            bindValue=\"id\"\n            [addTag]=\"true\"\n            [(ngModel)]=\"reason\"\n        ></ng-select>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"!reason || (!order.active && selectionCount === 0)\"\n        class=\"btn btn-primary\"\n    >\n        <ng-container *ngIf=\"!order.active\">\n            {{ 'order.cancel-selected-items' | translate }}\n        </ng-container>\n        <ng-container *ngIf=\"order.active\">\n            {{ 'order.cancel-order' | translate }}\n        </ng-container>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;min-height:64vh}.fulfillment-wrapper{flex:1}@media screen and (min-width: 768px){.fulfillment-wrapper{display:flex;flex-direction:row}}@media screen and (min-width: 768px){.fulfillment-wrapper .cancellation-details{margin-top:0;margin-left:24px;width:250px}}.fulfillment-wrapper .order-lines{flex:1;overflow-y:auto}.fulfillment-wrapper .order-lines table{margin-top:0}.fulfillment-wrapper tr.ignore{color:var(--color-grey-300)}.fulfillment-wrapper .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}.fulfillment-wrapper .is-disabled td,.fulfillment-wrapper .is-disabled td input{background-color:var(--color-component-bg-200)}\n"]
            },] }
];
CancelOrderDialogComponent.ctorParameters = () => [
    { type: I18nService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2NhbmNlbC1vcmRlci1kaWFsb2cvY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFHSCxZQUFZLEVBQ1osV0FBVyxHQUdkLE1BQU0sd0JBQXdCLENBQUM7QUFRaEMsTUFBTSxPQUFPLDBCQUEwQjtJQWVuQyxZQUFvQixXQUF3Qjs7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFiNUMsY0FBUyxHQUFHLElBQUksQ0FBQztRQUdqQixtQkFBYyxHQUFpQyxFQUFFLENBQUM7UUFDbEQsWUFBTyxHQUFhLE1BQUEsWUFBWSxFQUFFLENBQUMsbUJBQW1CLG1DQUFJO1lBQ3RELENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztZQUN6QyxDQUFDLENBQUMsbUNBQW1DLENBQUM7U0FDekMsQ0FBQztRQU9FLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFORCxJQUFJLGNBQWM7UUFDZCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQU1ELFFBQVE7UUFDSixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMzRCx1Q0FBWSxNQUFNLEtBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBRztRQUNuRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2hEO1NBQ0o7YUFBTTtZQUNILEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQztTQUNKO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjs7UUFDZCxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDbEUsTUFBTSxlQUFlLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQywwQ0FBRSxRQUFRLENBQUM7WUFDcEYsSUFBSSxlQUFlLElBQUksUUFBUSxHQUFHLGVBQWUsRUFBRTtnQkFDL0MsT0FBTzthQUNWO1NBQ0o7UUFDRCx3RUFBd0U7UUFDeEUsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUNqQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sYUFBYTtRQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU87U0FDVjtRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLFdBQVc7WUFDWCxRQUFRO1NBQ1gsQ0FBQyxDQUFDO2FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUE5RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLGc5SEFBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBVkcsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBDYW5jZWxPcmRlcklucHV0LFxuICAgIERpYWxvZyxcbiAgICBnZXRBcHBDb25maWcsXG4gICAgSTE4blNlcnZpY2UsXG4gICAgT3JkZXJEZXRhaWxGcmFnbWVudCxcbiAgICBPcmRlckxpbmVJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNhbmNlbC1vcmRlci1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYW5jZWwtb3JkZXItZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYW5jZWwtb3JkZXItZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENhbmNlbE9yZGVyRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8Q2FuY2VsT3JkZXJJbnB1dD4ge1xuICAgIG9yZGVyOiBPcmRlckRldGFpbEZyYWdtZW50O1xuICAgIGNhbmNlbEFsbCA9IHRydWU7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBDYW5jZWxPcmRlcklucHV0KSA9PiB2b2lkO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGxpbmVRdWFudGl0aWVzOiB7IFtsaW5lSWQ6IHN0cmluZ106IG51bWJlciB9ID0ge307XG4gICAgcmVhc29uczogc3RyaW5nW10gPSBnZXRBcHBDb25maWcoKS5jYW5jZWxsYXRpb25SZWFzb25zID8/IFtcbiAgICAgICAgXygnb3JkZXIuY2FuY2VsLXJlYXNvbi1jdXN0b21lci1yZXF1ZXN0JyksXG4gICAgICAgIF8oJ29yZGVyLmNhbmNlbC1yZWFzb24tbm90LWF2YWlsYWJsZScpLFxuICAgIF07XG5cbiAgICBnZXQgc2VsZWN0aW9uQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5saW5lUXVhbnRpdGllcykucmVkdWNlKChzdW0sIG4pID0+IHN1bSArIG4sIDApO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4blNlcnZpY2U6IEkxOG5TZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucmVhc29ucyA9IHRoaXMucmVhc29ucy5tYXAociA9PiB0aGlzLmkxOG5TZXJ2aWNlLnRyYW5zbGF0ZShyKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubGluZVF1YW50aXRpZXMgPSB0aGlzLm9yZGVyLmxpbmVzLnJlZHVjZSgocmVzdWx0LCBsaW5lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5yZXN1bHQsIFtsaW5lLmlkXTogbGluZS5xdWFudGl0eSB9O1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgcmFkaW9DaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5jYW5jZWxBbGwpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGluZSBvZiB0aGlzLm9yZGVyLmxpbmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lUXVhbnRpdGllc1tsaW5lLmlkXSA9IGxpbmUucXVhbnRpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgdGhpcy5vcmRlci5saW5lcykge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZVF1YW50aXRpZXNbbGluZS5pZF0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tJZkFsbFNlbGVjdGVkKCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtsaW5lSWQsIHF1YW50aXR5XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmxpbmVRdWFudGl0aWVzKSkge1xuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlJbk9yZGVyID0gdGhpcy5vcmRlci5saW5lcy5maW5kKGxpbmUgPT4gbGluZS5pZCA9PT0gbGluZUlkKT8ucXVhbnRpdHk7XG4gICAgICAgICAgICBpZiAocXVhbnRpdHlJbk9yZGVyICYmIHF1YW50aXR5IDwgcXVhbnRpdHlJbk9yZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGdvdCBoZXJlLCBhbGwgb2YgdGhlIHNlbGVjdGVkIHF1YW50aXRpZXMgYXJlIGVxdWFsIHRvIHRoZSBvcmRlclxuICAgICAgICAvLyBsaW5lIHF1YW50aXRpZXMsIGkuZS4gZXZlcnl0aGluZyBpcyBzZWxlY3RlZC5cbiAgICAgICAgdGhpcy5jYW5jZWxBbGwgPSB0cnVlO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh7XG4gICAgICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVyLmlkLFxuICAgICAgICAgICAgbGluZXM6IHRoaXMuZ2V0TGluZUlucHV0cygpLFxuICAgICAgICAgICAgcmVhc29uOiB0aGlzLnJlYXNvbixcbiAgICAgICAgICAgIGNhbmNlbFNoaXBwaW5nOiB0aGlzLmNhbmNlbEFsbCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMaW5lSW5wdXRzKCk6IE9yZGVyTGluZUlucHV0W10gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5hY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5saW5lUXVhbnRpdGllcylcbiAgICAgICAgICAgIC5tYXAoKFtvcmRlckxpbmVJZCwgcXVhbnRpdHldKSA9PiAoe1xuICAgICAgICAgICAgICAgIG9yZGVyTGluZUlkLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5LFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAuZmlsdGVyKGwgPT4gMCA8IGwucXVhbnRpdHkpO1xuICAgIH1cbn1cbiJdfQ==