import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class FulfillmentCardComponent {
    constructor() {
        this.transitionState = new EventEmitter();
    }
    nextSuggestedState() {
        var _a;
        if (!this.fulfillment) {
            return;
        }
        const { nextStates } = this.fulfillment;
        const namedStateOrDefault = (targetState) => nextStates.includes(targetState) ? targetState : nextStates[0];
        switch ((_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.state) {
            case 'Pending':
                return namedStateOrDefault('Shipped');
            case 'Shipped':
                return namedStateOrDefault('Delivered');
            default:
                return nextStates.find(s => s !== 'Cancelled');
        }
    }
    nextOtherStates() {
        if (!this.fulfillment) {
            return [];
        }
        const suggested = this.nextSuggestedState();
        return this.fulfillment.nextStates.filter(s => s !== suggested);
    }
}
FulfillmentCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-card',
                template: "<div class=\"card\">\n    <div class=\"card-header fulfillment-header\">\n        <div>{{ 'order.fulfillment' | translate }}</div>\n        <div class=\"fulfillment-state\">\n            <vdr-fulfillment-state-label [state]=\"fulfillment?.state\"></vdr-fulfillment-state-label>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <vdr-fulfillment-detail\n            *ngIf=\"!!fulfillment\"\n            [fulfillmentId]=\"fulfillment?.id\"\n            [order]=\"order\"\n        ></vdr-fulfillment-detail>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"fulfillment?.nextStates.length\">\n        <ng-container *ngIf=\"nextSuggestedState() as suggestedState\">\n            <button class=\"btn btn-sm btn-primary\" (click)=\"transitionState.emit(suggestedState)\">\n                {{ 'order.set-fulfillment-state' | translate: { state: (suggestedState | stateI18nToken | translate) } }}\n            </button>\n        </ng-container>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngFor=\"let nextState of nextOtherStates()\">\n                    <button\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionState.emit(nextState)\"\n                    >\n                        <ng-container *ngIf=\"nextState !== 'Cancelled'; else cancel\">\n                            <clr-icon shape=\"step-forward-2\"></clr-icon>\n                            {{ 'order.transition-to-state' | translate: { state: (nextState | stateI18nToken | translate) } }}\n                        </ng-container>\n                        <ng-template #cancel>\n                            <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                            {{ 'order.cancel-fulfillment' | translate }}\n                        </ng-template>\n                    </button>\n                </ng-container>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".fulfillment-header{display:flex;justify-content:space-between;align-items:center}.card-footer{display:flex;align-items:center;justify-content:flex-end}\n"]
            },] }
];
FulfillmentCardComponent.propDecorators = {
    fulfillment: [{ type: Input }],
    order: [{ type: Input }],
    transitionState: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2Z1bGZpbGxtZW50LWNhcmQvZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNoRyxNQUFNLE9BQU8sd0JBQXdCO0lBTnJDO1FBU2Msb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBMEIzRCxDQUFDO0lBeEJHLGtCQUFrQjs7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsV0FBbUIsRUFBRSxFQUFFLENBQ2hELFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLFFBQVEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxLQUFLLEVBQUU7WUFDN0IsS0FBSyxTQUFTO2dCQUNWLE9BQU8sbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsS0FBSyxTQUFTO2dCQUNWLE9BQU8sbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUM7Z0JBQ0ksT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDO1NBQ3REO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7O1lBbENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyx1dEVBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzswQkFFSSxLQUFLO29CQUNMLEtBQUs7OEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnVsZmlsbG1lbnQsIE9yZGVyRGV0YWlsIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWZ1bGZpbGxtZW50LWNhcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mdWxmaWxsbWVudC1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mdWxmaWxsbWVudC1jYXJkLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxtZW50Q2FyZENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgZnVsZmlsbG1lbnQ6IEZ1bGZpbGxtZW50LkZyYWdtZW50IHwgdW5kZWZpbmVkO1xuICAgIEBJbnB1dCgpIG9yZGVyOiBPcmRlckRldGFpbC5GcmFnbWVudDtcbiAgICBAT3V0cHV0KCkgdHJhbnNpdGlvblN0YXRlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBuZXh0U3VnZ2VzdGVkU3RhdGUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF0aGlzLmZ1bGZpbGxtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBuZXh0U3RhdGVzIH0gPSB0aGlzLmZ1bGZpbGxtZW50O1xuICAgICAgICBjb25zdCBuYW1lZFN0YXRlT3JEZWZhdWx0ID0gKHRhcmdldFN0YXRlOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBuZXh0U3RhdGVzLmluY2x1ZGVzKHRhcmdldFN0YXRlKSA/IHRhcmdldFN0YXRlIDogbmV4dFN0YXRlc1swXTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmZ1bGZpbGxtZW50Py5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAnUGVuZGluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWVkU3RhdGVPckRlZmF1bHQoJ1NoaXBwZWQnKTtcbiAgICAgICAgICAgIGNhc2UgJ1NoaXBwZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lZFN0YXRlT3JEZWZhdWx0KCdEZWxpdmVyZWQnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHRTdGF0ZXMuZmluZChzID0+IHMgIT09ICdDYW5jZWxsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRPdGhlclN0YXRlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICghdGhpcy5mdWxmaWxsbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1Z2dlc3RlZCA9IHRoaXMubmV4dFN1Z2dlc3RlZFN0YXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bGZpbGxtZW50Lm5leHRTdGF0ZXMuZmlsdGVyKHMgPT4gcyAhPT0gc3VnZ2VzdGVkKTtcbiAgICB9XG59XG4iXX0=