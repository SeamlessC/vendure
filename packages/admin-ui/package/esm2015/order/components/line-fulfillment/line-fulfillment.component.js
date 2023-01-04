import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class LineFulfillmentComponent {
    constructor() {
        this.fulfilledCount = 0;
        this.fulfillments = [];
    }
    ngOnChanges(changes) {
        if (this.line) {
            this.fulfilledCount = this.getDeliveredCount(this.line);
            this.fulfillmentStatus = this.getFulfillmentStatus(this.fulfilledCount, this.line.items.length);
            this.fulfillments = this.getFulfillments(this.line);
        }
    }
    /**
     * Returns the number of items in an OrderLine which are fulfilled.
     */
    getDeliveredCount(line) {
        var _a, _b;
        return ((_b = (_a = line.fulfillments) === null || _a === void 0 ? void 0 : _a.reduce((sum, fulfillment) => { var _a, _b; return sum + ((_b = (_a = fulfillment.summary.find(s => s.orderLine.id === line.id)) === null || _a === void 0 ? void 0 : _a.quantity) !== null && _b !== void 0 ? _b : 0); }, 0)) !== null && _b !== void 0 ? _b : 0);
    }
    getFulfillmentStatus(fulfilledCount, lineQuantity) {
        if (fulfilledCount === lineQuantity) {
            return 'full';
        }
        if (0 < fulfilledCount && fulfilledCount < lineQuantity) {
            return 'partial';
        }
        return 'none';
    }
    getFulfillments(line) {
        var _a, _b;
        return ((_b = (_a = line.fulfillments) === null || _a === void 0 ? void 0 : _a.map(fulfillment => {
            var _a;
            const summaryLine = fulfillment.summary.find(s => s.orderLine.id === line.id);
            return {
                count: (_a = summaryLine === null || summaryLine === void 0 ? void 0 : summaryLine.quantity) !== null && _a !== void 0 ? _a : 0,
                fulfillment,
            };
        })) !== null && _b !== void 0 ? _b : []);
    }
}
LineFulfillmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-line-fulfillment',
                template: "<vdr-dropdown class=\"search-settings-menu\" *ngIf=\"fulfilledCount || orderState === 'PartiallyDelivered'\">\n    <button type=\"button\" class=\"icon-button\" vdrDropdownTrigger>\n        <clr-icon *ngIf=\"fulfillmentStatus === 'full'\" class=\"item-fulfilled\" shape=\"check-circle\"></clr-icon>\n        <clr-icon\n            *ngIf=\"fulfillmentStatus === 'partial'\"\n            class=\"item-partially-fulfilled\"\n            shape=\"check-circle\"\n        ></clr-icon>\n        <clr-icon\n            *ngIf=\"fulfillmentStatus === 'none'\"\n            class=\"item-not-fulfilled\"\n            shape=\"exclamation-circle\"\n        ></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'full'\">\n            {{ 'order.line-fulfillment-all' | translate }}\n        </label>\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'partial'\">\n            {{\n                'order.line-fulfillment-partial' | translate: { total: line.quantity, count: fulfilledCount }\n            }}\n        </label>\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'none'\">\n            {{ 'order.line-fulfillment-none' | translate }}\n        </label>\n        <div class=\"fulfillment-detail\" *ngFor=\"let item of fulfillments\">\n            <div class=\"fulfillment-title\">\n                {{ 'order.fulfillment' | translate }} #{{ item.fulfillment.id }} ({{\n                    'order.item-count' | translate: { count: item.count }\n                }})\n            </div>\n            <vdr-labeled-data [label]=\"'common.created-at' | translate\">\n                {{ item.fulfillment.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n                {{ item.fulfillment.method }}\n            </vdr-labeled-data>\n            <vdr-labeled-data\n                *ngIf=\"item.fulfillment.trackingCode\"\n                [label]=\"'order.tracking-code' | translate\"\n            >\n                {{ item.fulfillment.trackingCode }}\n            </vdr-labeled-data>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".item-fulfilled{color:var(--color-success-500)}.item-partially-fulfilled{color:var(--color-warning-500)}.item-not-fulfilled{color:var(--color-error-500)}.fulfillment-detail{margin:6px 12px}.fulfillment-detail:not(:last-of-type){border-bottom:1px dashed var(--color-component-border-200)}\n"]
            },] }
];
LineFulfillmentComponent.propDecorators = {
    line: [{ type: Input }],
    orderState: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1mdWxmaWxsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2xpbmUtZnVsZmlsbG1lbnQvbGluZS1mdWxmaWxsbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBWXBHLE1BQU0sT0FBTyx3QkFBd0I7SUFOckM7UUFTSSxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQixpQkFBWSxHQUdQLEVBQUUsQ0FBQztJQThDWixDQUFDO0lBNUNHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUIsQ0FBQyxJQUF1Qjs7UUFDN0MsT0FBTyxDQUNILE1BQUEsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxNQUFNLENBQ3JCLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLGVBQ2pCLE9BQUEsR0FBRyxHQUFHLENBQUMsTUFBQSxNQUFBLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxRQUFRLG1DQUFJLENBQUMsQ0FBQyxDQUFBLEVBQUEsRUFDcEYsQ0FBQyxDQUNKLG1DQUFJLENBQUMsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVPLG9CQUFvQixDQUFDLGNBQXNCLEVBQUUsWUFBb0I7UUFDckUsSUFBSSxjQUFjLEtBQUssWUFBWSxFQUFFO1lBQ2pDLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsY0FBYyxJQUFJLGNBQWMsR0FBRyxZQUFZLEVBQUU7WUFDckQsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU8sZUFBZSxDQUNuQixJQUF1Qjs7UUFFdkIsT0FBTyxDQUNILE1BQUEsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUU7O1lBQ2pDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFFBQVEsbUNBQUksQ0FBQztnQkFDakMsV0FBVzthQUNkLENBQUM7UUFDTixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUNYLENBQUM7SUFDTixDQUFDOzs7WUEzREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGt2RUFBZ0Q7Z0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O21CQUVJLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsLCBPcmRlckRldGFpbEZyYWdtZW50IH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyB1bmlxdWUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3VuaXF1ZSc7XG5cbmV4cG9ydCB0eXBlIEZ1bGZpbGxtZW50U3RhdHVzID0gJ2Z1bGwnIHwgJ3BhcnRpYWwnIHwgJ25vbmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1saW5lLWZ1bGZpbGxtZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGluZS1mdWxmaWxsbWVudC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGluZS1mdWxmaWxsbWVudC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lRnVsZmlsbG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGxpbmU6IE9yZGVyRGV0YWlsLkxpbmVzO1xuICAgIEBJbnB1dCgpIG9yZGVyU3RhdGU6IHN0cmluZztcbiAgICBmdWxmaWxsZWRDb3VudCA9IDA7XG4gICAgZnVsZmlsbG1lbnRTdGF0dXM6IEZ1bGZpbGxtZW50U3RhdHVzO1xuICAgIGZ1bGZpbGxtZW50czogQXJyYXk8e1xuICAgICAgICBjb3VudDogbnVtYmVyO1xuICAgICAgICBmdWxmaWxsbWVudDogTm9uTnVsbGFibGU8T3JkZXJEZXRhaWxGcmFnbWVudFsnZnVsZmlsbG1lbnRzJ10+W251bWJlcl07XG4gICAgfT4gPSBbXTtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGluZSkge1xuICAgICAgICAgICAgdGhpcy5mdWxmaWxsZWRDb3VudCA9IHRoaXMuZ2V0RGVsaXZlcmVkQ291bnQodGhpcy5saW5lKTtcbiAgICAgICAgICAgIHRoaXMuZnVsZmlsbG1lbnRTdGF0dXMgPSB0aGlzLmdldEZ1bGZpbGxtZW50U3RhdHVzKHRoaXMuZnVsZmlsbGVkQ291bnQsIHRoaXMubGluZS5pdGVtcy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5mdWxmaWxsbWVudHMgPSB0aGlzLmdldEZ1bGZpbGxtZW50cyh0aGlzLmxpbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIGFuIE9yZGVyTGluZSB3aGljaCBhcmUgZnVsZmlsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVsaXZlcmVkQ291bnQobGluZTogT3JkZXJEZXRhaWwuTGluZXMpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgbGluZS5mdWxmaWxsbWVudHM/LnJlZHVjZShcbiAgICAgICAgICAgICAgICAoc3VtLCBmdWxmaWxsbWVudCkgPT5cbiAgICAgICAgICAgICAgICAgICAgc3VtICsgKGZ1bGZpbGxtZW50LnN1bW1hcnkuZmluZChzID0+IHMub3JkZXJMaW5lLmlkID09PSBsaW5lLmlkKT8ucXVhbnRpdHkgPz8gMCksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICkgPz8gMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RnVsZmlsbG1lbnRTdGF0dXMoZnVsZmlsbGVkQ291bnQ6IG51bWJlciwgbGluZVF1YW50aXR5OiBudW1iZXIpOiBGdWxmaWxsbWVudFN0YXR1cyB7XG4gICAgICAgIGlmIChmdWxmaWxsZWRDb3VudCA9PT0gbGluZVF1YW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Z1bGwnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgwIDwgZnVsZmlsbGVkQ291bnQgJiYgZnVsZmlsbGVkQ291bnQgPCBsaW5lUXVhbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiAncGFydGlhbCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZ1bGZpbGxtZW50cyhcbiAgICAgICAgbGluZTogT3JkZXJEZXRhaWwuTGluZXMsXG4gICAgKTogQXJyYXk8eyBjb3VudDogbnVtYmVyOyBmdWxmaWxsbWVudDogTm9uTnVsbGFibGU8T3JkZXJEZXRhaWxGcmFnbWVudFsnZnVsZmlsbG1lbnRzJ10+W251bWJlcl0gfT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgbGluZS5mdWxmaWxsbWVudHM/Lm1hcChmdWxmaWxsbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VtbWFyeUxpbmUgPSBmdWxmaWxsbWVudC5zdW1tYXJ5LmZpbmQocyA9PiBzLm9yZGVyTGluZS5pZCA9PT0gbGluZS5pZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IHN1bW1hcnlMaW5lPy5xdWFudGl0eSA/PyAwLFxuICAgICAgICAgICAgICAgICAgICBmdWxmaWxsbWVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkgPz8gW11cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=