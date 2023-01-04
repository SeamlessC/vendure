import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, DeletionResult, ModalService, NotificationService, ServerConfigService, } from '@vendure/admin-ui/core';
import { combineLatest, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OrderTransitionService } from '../../providers/order-transition.service';
import { SelectAddressDialogComponent } from '../select-address-dialog/select-address-dialog.component';
import { SelectCustomerDialogComponent } from '../select-customer-dialog/select-customer-dialog.component';
import { SelectShippingMethodDialogComponent } from '../select-shipping-method-dialog/select-shipping-method-dialog.component';
export class DraftOrderDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.orderTransitionService = orderTransitionService;
        this.detailForm = new FormGroup({});
        this.fetchHistory = new Subject();
        this.displayCouponCodeInput = false;
    }
    ngOnInit() {
        this.init();
        this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
        this.eligibleShippingMethods$ = this.entity$.pipe(switchMap(order => this.dataService.order
            .getDraftOrderEligibleShippingMethods(order.id)
            .mapSingle(({ eligibleShippingMethodsForDraftOrder }) => eligibleShippingMethodsForDraftOrder)));
        this.customFields = this.getCustomFieldConfig('Order');
        this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
    }
    ngOnDestroy() {
        this.destroy();
    }
    addItemToOrder(event) {
        this.dataService.order.addItemToDraftOrder(this.id, event).subscribe(result => {
            if (result.addItemToDraftOrder.__typename !== 'Order') {
                this.notificationService.error(result.addItemToDraftOrder.message);
            }
        });
    }
    adjustOrderLine(event) {
        this.dataService.order
            .adjustDraftOrderLine(this.id, { orderLineId: event.lineId, quantity: event.quantity })
            .subscribe(result => {
            if (result.adjustDraftOrderLine.__typename !== 'Order') {
                this.notificationService.error(result.adjustDraftOrderLine.message);
            }
        });
    }
    removeOrderLine(event) {
        this.dataService.order.removeDraftOrderLine(this.id, event.lineId).subscribe(result => {
            if (result.removeDraftOrderLine.__typename !== 'Order') {
                this.notificationService.error(result.removeDraftOrderLine.message);
            }
        });
    }
    getOrderAddressLines(orderAddress) {
        if (!orderAddress) {
            return [];
        }
        return Object.values(orderAddress)
            .filter(val => val !== 'OrderAddress')
            .filter(line => !!line);
    }
    setCustomer() {
        this.modalService.fromComponent(SelectCustomerDialogComponent).subscribe(result => {
            if (this.hasId(result)) {
                this.dataService.order
                    .setCustomerForDraftOrder(this.id, { customerId: result.id })
                    .subscribe();
            }
            else if (result) {
                this.dataService.order.setCustomerForDraftOrder(this.id, { input: result }).subscribe();
            }
        });
    }
    setShippingAddress() {
        this.entity$
            .pipe(take(1), switchMap(order => {
            var _a, _b;
            return this.modalService.fromComponent(SelectAddressDialogComponent, {
                locals: {
                    customerId: (_a = order.customer) === null || _a === void 0 ? void 0 : _a.id,
                    currentAddress: (_b = order.shippingAddress) !== null && _b !== void 0 ? _b : undefined,
                },
            });
        }))
            .subscribe(result => {
            if (result) {
                this.dataService.order.setDraftOrderShippingAddress(this.id, result).subscribe();
            }
        });
    }
    setBillingAddress() {
        this.entity$
            .pipe(take(1), switchMap(order => {
            var _a, _b;
            return this.modalService.fromComponent(SelectAddressDialogComponent, {
                locals: {
                    customerId: (_a = order.customer) === null || _a === void 0 ? void 0 : _a.id,
                    currentAddress: (_b = order.billingAddress) !== null && _b !== void 0 ? _b : undefined,
                },
            });
        }))
            .subscribe(result => {
            if (result) {
                this.dataService.order.setDraftOrderBillingAddress(this.id, result).subscribe();
            }
        });
    }
    applyCouponCode(couponCode) {
        this.dataService.order.applyCouponCodeToDraftOrder(this.id, couponCode).subscribe();
    }
    removeCouponCode(couponCode) {
        this.dataService.order.removeCouponCodeFromDraftOrder(this.id, couponCode).subscribe();
    }
    setShippingMethod() {
        combineLatest(this.entity$, this.eligibleShippingMethods$)
            .pipe(take(1), switchMap(([order, methods]) => {
            var _a, _b;
            return this.modalService.fromComponent(SelectShippingMethodDialogComponent, {
                locals: {
                    eligibleShippingMethods: methods,
                    currencyCode: order.currencyCode,
                    currentSelectionId: (_b = (_a = order.shippingLines) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.shippingMethod.id,
                },
            });
        }))
            .subscribe(result => {
            if (result) {
                this.dataService.order.setDraftOrderShippingMethod(this.id, result).subscribe();
            }
        });
    }
    updateCustomFields(customFieldsValue) {
        this.dataService.order
            .updateOrderCustomFields({
            id: this.id,
            customFields: customFieldsValue,
        })
            .subscribe();
    }
    deleteOrder() {
        this.dataService.order.deleteDraftOrder(this.id).subscribe(({ deleteDraftOrder }) => {
            if (deleteDraftOrder.result === DeletionResult.DELETED) {
                this.notificationService.success(_('common.notify-delete-success'), {
                    entity: 'Order',
                });
                this.router.navigate(['/orders']);
            }
            else if (deleteDraftOrder.message) {
                this.notificationService.error(deleteDraftOrder.message);
            }
        });
    }
    completeOrder() {
        this.dataService.order
            .transitionToState(this.id, 'ArrangingPayment')
            .subscribe(({ transitionOrderToState }) => {
            if ((transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) === 'Order') {
                this.router.navigate(['/orders', this.id]);
            }
            else if ((transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) === 'OrderStateTransitionError') {
                this.notificationService.error(transitionOrderToState.transitionError);
            }
        });
    }
    hasId(input) {
        return typeof input === 'object' && !!input.id;
    }
    setFormValues(entity) {
        // empty
    }
}
DraftOrderDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-draft-order-detail',
                template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"completeOrder()\"\n            [disabled]=\"!order.customer || !order.lines.length || !order.shippingLines.length\"\n        >\n            <clr-icon shape=\"check\"></clr-icon>\n            {{ 'order.complete-draft-order' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"deleteOrder()\">\n                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                    {{ 'order.delete-draft-order' | translate }}\n                </button>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <vdr-draft-order-variant-selector\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n                [currencyCode]=\"order.currencyCode\"\n                (addItem)=\"addItemToOrder($event)\"\n            ></vdr-draft-order-variant-selector>\n            <vdr-order-table\n                [order]=\"order\"\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n                [isDraft]=\"true\"\n                (adjust)=\"adjustOrderLine($event)\"\n                (remove)=\"removeOrderLine($event)\"\n            ></vdr-order-table>\n            <div class=\"flex\">\n                <button\n                    *ngIf=\"order.couponCodes.length === 0 && !displayCouponCodeInput\"\n                    class=\"btn btn-link btn-sm mr2\"\n                    (click)=\"displayCouponCodeInput = !displayCouponCodeInput\"\n                >\n                    {{ 'order.set-coupon-codes' | translate }}\n                </button>\n                <div *ngIf=\"order.couponCodes.length || displayCouponCodeInput\">\n                    <label>{{ 'order.set-coupon-codes' | translate }}</label>\n                    <vdr-coupon-code-selector\n                        [couponCodes]=\"order.couponCodes\"\n                        (addCouponCode)=\"applyCouponCode($event)\"\n                        (removeCouponCode)=\"removeCouponCode($event)\"\n                    ></vdr-coupon-code-selector>\n                </div>\n            </div>\n            <ng-container *ngIf=\"order.taxSummary.length\">\n                <h4>{{ 'order.tax-summary' | translate }}</h4>\n                <table class=\"table\">\n                    <thead>\n                        <tr>\n                            <th>{{ 'common.description' | translate }}</th>\n                            <th>{{ 'order.tax-rate' | translate }}</th>\n                            <th>{{ 'order.tax-base' | translate }}</th>\n                            <th>{{ 'order.tax-total' | translate }}</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let row of order.taxSummary\">\n                            <td>{{ row.description }}</td>\n                            <td>{{ row.taxRate / 100 | percent }}</td>\n                            <td>{{ row.taxBase | localeCurrency: order.currencyCode }}</td>\n                            <td>{{ row.taxTotal | localeCurrency: order.currencyCode }}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </ng-container>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <clr-icon *ngIf=\"!order.customer\" shape=\"unknown-status\" class=\"is-warning\"></clr-icon>\n                    <clr-icon *ngIf=\"order.customer\" shape=\"check\" class=\"is-success\"></clr-icon>\n                    {{ 'order.customer' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-customer-label\n                            class=\"block mb2\"\n                            *ngIf=\"order.customer\"\n                            [customer]=\"order.customer\"\n                        ></vdr-customer-label>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setCustomer()\">\n                            {{ 'order.set-customer-for-order' | translate }}\n                        </button>\n                    </div>\n                </div>\n                <div class=\"card-block\">\n                    <h4 class=\"card-title\">\n                        <clr-icon\n                            *ngIf=\"!order.billingAddress.streetLine1\"\n                            shape=\"unknown-status\"\n                            class=\"is-warning\"\n                        ></clr-icon>\n                        <clr-icon\n                            *ngIf=\"order.billingAddress.streetLine1\"\n                            shape=\"check\"\n                            class=\"is-success\"\n                        ></clr-icon>\n                        {{ 'order.billing-address' | translate }}\n                    </h4>\n                    <div class=\"card-text\">\n                        <vdr-formatted-address\n                            class=\"block mb2\"\n                            *ngIf=\"order.billingAddress\"\n                            [address]=\"order.billingAddress\"\n                        ></vdr-formatted-address>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setBillingAddress()\">\n                            {{ 'order.set-billing-address' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <clr-icon\n                        *ngIf=\"!order.shippingAddress.streetLine1 || !order.shippingLines.length\"\n                        shape=\"unknown-status\"\n                        class=\"is-warning\"\n                    ></clr-icon>\n                    <clr-icon\n                        *ngIf=\"order.shippingAddress.streetLine1 && order.shippingLines.length\"\n                        shape=\"check\"\n                        class=\"is-success\"\n                    ></clr-icon>\n                    {{ 'order.shipping' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-formatted-address\n                            class=\"block mb2\"\n                            *ngIf=\"order.shippingAddress\"\n                            [address]=\"order.shippingAddress\"\n                        ></vdr-formatted-address>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setShippingAddress()\">\n                            {{ 'order.set-shipping-address' | translate }}\n                        </button>\n                    </div>\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <div *ngFor=\"let shippingLine of order.shippingLines\">\n                            {{ shippingLine.shippingMethod.name }}\n                        </div>\n                        <button class=\"btn btn-link btn-sm\" (click)=\"setShippingMethod()\">\n                            {{ 'order.set-shipping-method' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <vdr-order-custom-fields-card\n                [customFieldsConfig]=\"customFields\"\n                [customFieldValues]=\"order.customFields\"\n                (updateClick)=\"updateCustomFields($event)\"\n            ></vdr-order-custom-fields-card>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DraftOrderDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: OrderTransitionService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZnQtb3JkZXItZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvZHJhZnQtb3JkZXItZGV0YWlsL2RyYWZ0LW9yZGVyLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsbUJBQW1CLEVBRW5CLFdBQVcsRUFDWCxjQUFjLEVBRWQsWUFBWSxFQUNaLG1CQUFtQixFQUduQixtQkFBbUIsR0FDdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQzNHLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBUS9ILE1BQU0sT0FBTyx5QkFDVCxTQUFRLG1CQUF5QztJQWFqRCxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0Is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QUMzRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8sS0FBSyxDQUEyQixLQUFjO1FBQ2xELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFUyxhQUFhLENBQUMsTUFBc0I7UUFDMUMsUUFBUTtJQUNaLENBQUM7OztZQWpOSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsa3lRQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUEzQndCLE1BQU07WUFBdEIsY0FBYztZQVluQixtQkFBbUI7WUFkVyxpQkFBaUI7WUFPL0MsV0FBVztZQUlYLG1CQUFtQjtZQURuQixZQUFZO1lBU1Asc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBEZWxldGlvblJlc3VsdCxcbiAgICBEcmFmdE9yZGVyRWxpZ2libGVTaGlwcGluZ01ldGhvZHNRdWVyeSxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBPcmRlcixcbiAgICBPcmRlckRldGFpbCxcbiAgICBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgT3JkZXJUcmFuc2l0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9vcmRlci10cmFuc2l0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0QWRkcmVzc0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3NlbGVjdC1hZGRyZXNzLWRpYWxvZy9zZWxlY3QtYWRkcmVzcy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdEN1c3RvbWVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VsZWN0LWN1c3RvbWVyLWRpYWxvZy9zZWxlY3QtY3VzdG9tZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RTaGlwcGluZ01ldGhvZERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3NlbGVjdC1zaGlwcGluZy1tZXRob2QtZGlhbG9nL3NlbGVjdC1zaGlwcGluZy1tZXRob2QtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWRyYWZ0LW9yZGVyLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RyYWZ0LW9yZGVyLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZHJhZnQtb3JkZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIERyYWZ0T3JkZXJEZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8T3JkZXJEZXRhaWwuRnJhZ21lbnQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIGRldGFpbEZvcm0gPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBlbGlnaWJsZVNoaXBwaW5nTWV0aG9kcyQ6IE9ic2VydmFibGU8XG4gICAgICAgIERyYWZ0T3JkZXJFbGlnaWJsZVNoaXBwaW5nTWV0aG9kc1F1ZXJ5WydlbGlnaWJsZVNoaXBwaW5nTWV0aG9kc0ZvckRyYWZ0T3JkZXInXVxuICAgID47XG4gICAgbmV4dFN0YXRlcyQ6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICAgIGZldGNoSGlzdG9yeSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIG9yZGVyTGluZUN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBkaXNwbGF5Q291cG9uQ29kZUlucHV0ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBvcmRlclRyYW5zaXRpb25TZXJ2aWNlOiBPcmRlclRyYW5zaXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLm9yZGVyTGluZUN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ09yZGVyTGluZScpO1xuICAgICAgICB0aGlzLmVsaWdpYmxlU2hpcHBpbmdNZXRob2RzJCA9IHRoaXMuZW50aXR5JC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKG9yZGVyID0+XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RHJhZnRPcmRlckVsaWdpYmxlU2hpcHBpbmdNZXRob2RzKG9yZGVyLmlkKVxuICAgICAgICAgICAgICAgICAgICAubWFwU2luZ2xlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHsgZWxpZ2libGVTaGlwcGluZ01ldGhvZHNGb3JEcmFmdE9yZGVyIH0pID0+IGVsaWdpYmxlU2hpcHBpbmdNZXRob2RzRm9yRHJhZnRPcmRlcixcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnT3JkZXInKTtcbiAgICAgICAgdGhpcy5vcmRlckxpbmVDdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdPcmRlckxpbmUnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgYWRkSXRlbVRvT3JkZXIoZXZlbnQ6IHsgcHJvZHVjdFZhcmlhbnRJZDogc3RyaW5nOyBxdWFudGl0eTogbnVtYmVyOyBjdXN0b21GaWVsZHM6IGFueSB9KSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuYWRkSXRlbVRvRHJhZnRPcmRlcih0aGlzLmlkLCBldmVudCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmFkZEl0ZW1Ub0RyYWZ0T3JkZXIuX190eXBlbmFtZSAhPT0gJ09yZGVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcigocmVzdWx0LmFkZEl0ZW1Ub0RyYWZ0T3JkZXIgYXMgYW55KS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRqdXN0T3JkZXJMaW5lKGV2ZW50OiB7IGxpbmVJZDogc3RyaW5nOyBxdWFudGl0eTogbnVtYmVyIH0pIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgLmFkanVzdERyYWZ0T3JkZXJMaW5lKHRoaXMuaWQsIHsgb3JkZXJMaW5lSWQ6IGV2ZW50LmxpbmVJZCwgcXVhbnRpdHk6IGV2ZW50LnF1YW50aXR5IH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5hZGp1c3REcmFmdE9yZGVyTGluZS5fX3R5cGVuYW1lICE9PSAnT3JkZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcigocmVzdWx0LmFkanVzdERyYWZ0T3JkZXJMaW5lIGFzIGFueSkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlT3JkZXJMaW5lKGV2ZW50OiB7IGxpbmVJZDogc3RyaW5nIH0pIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5yZW1vdmVEcmFmdE9yZGVyTGluZSh0aGlzLmlkLCBldmVudC5saW5lSWQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5yZW1vdmVEcmFmdE9yZGVyTGluZS5fX3R5cGVuYW1lICE9PSAnT3JkZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKChyZXN1bHQucmVtb3ZlRHJhZnRPcmRlckxpbmUgYXMgYW55KS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3JkZXJBZGRyZXNzTGluZXMob3JkZXJBZGRyZXNzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKCFvcmRlckFkZHJlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhvcmRlckFkZHJlc3MpXG4gICAgICAgICAgICAuZmlsdGVyKHZhbCA9PiB2YWwgIT09ICdPcmRlckFkZHJlc3MnKVxuICAgICAgICAgICAgLmZpbHRlcihsaW5lID0+ICEhbGluZSk7XG4gICAgfVxuXG4gICAgc2V0Q3VzdG9tZXIoKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoU2VsZWN0Q3VzdG9tZXJEaWFsb2dDb21wb25lbnQpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzSWQocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgICAgICAgICAgLnNldEN1c3RvbWVyRm9yRHJhZnRPcmRlcih0aGlzLmlkLCB7IGN1c3RvbWVySWQ6IHJlc3VsdC5pZCB9KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuc2V0Q3VzdG9tZXJGb3JEcmFmdE9yZGVyKHRoaXMuaWQsIHsgaW5wdXQ6IHJlc3VsdCB9KS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2hpcHBpbmdBZGRyZXNzKCkge1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKG9yZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoU2VsZWN0QWRkcmVzc0RpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJJZDogb3JkZXIuY3VzdG9tZXI/LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBZGRyZXNzOiBvcmRlci5zaGlwcGluZ0FkZHJlc3MgPz8gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLnNldERyYWZ0T3JkZXJTaGlwcGluZ0FkZHJlc3ModGhpcy5pZCwgcmVzdWx0KS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRCaWxsaW5nQWRkcmVzcygpIHtcbiAgICAgICAgdGhpcy5lbnRpdHkkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChvcmRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50KFNlbGVjdEFkZHJlc3NEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVySWQ6IG9yZGVyLmN1c3RvbWVyPy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWRkcmVzczogb3JkZXIuYmlsbGluZ0FkZHJlc3MgPz8gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLnNldERyYWZ0T3JkZXJCaWxsaW5nQWRkcmVzcyh0aGlzLmlkLCByZXN1bHQpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwcGx5Q291cG9uQ29kZShjb3Vwb25Db2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5hcHBseUNvdXBvbkNvZGVUb0RyYWZ0T3JkZXIodGhpcy5pZCwgY291cG9uQ29kZSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ291cG9uQ29kZShjb3Vwb25Db2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5yZW1vdmVDb3Vwb25Db2RlRnJvbURyYWZ0T3JkZXIodGhpcy5pZCwgY291cG9uQ29kZSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2V0U2hpcHBpbmdNZXRob2QoKSB7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5lbnRpdHkkLCB0aGlzLmVsaWdpYmxlU2hpcHBpbmdNZXRob2RzJClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChbb3JkZXIsIG1ldGhvZHNdKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50KFNlbGVjdFNoaXBwaW5nTWV0aG9kRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGlnaWJsZVNoaXBwaW5nTWV0aG9kczogbWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGU6IG9yZGVyLmN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uSWQ6IG9yZGVyLnNoaXBwaW5nTGluZXM/LlswXT8uc2hpcHBpbmdNZXRob2QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5zZXREcmFmdE9yZGVyU2hpcHBpbmdNZXRob2QodGhpcy5pZCwgcmVzdWx0KS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDdXN0b21GaWVsZHMoY3VzdG9tRmllbGRzVmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAudXBkYXRlT3JkZXJDdXN0b21GaWVsZHMoe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogY3VzdG9tRmllbGRzVmFsdWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGRlbGV0ZU9yZGVyKCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmRlbGV0ZURyYWZ0T3JkZXIodGhpcy5pZCkuc3Vic2NyaWJlKCh7IGRlbGV0ZURyYWZ0T3JkZXIgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRlbGV0ZURyYWZ0T3JkZXIucmVzdWx0ID09PSBEZWxldGlvblJlc3VsdC5ERUxFVEVEKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ09yZGVyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcnMnXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlbGV0ZURyYWZ0T3JkZXIubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihkZWxldGVEcmFmdE9yZGVyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZU9yZGVyKCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAudHJhbnNpdGlvblRvU3RhdGUodGhpcy5pZCwgJ0FycmFuZ2luZ1BheW1lbnQnKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoeyB0cmFuc2l0aW9uT3JkZXJUb1N0YXRlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNpdGlvbk9yZGVyVG9TdGF0ZT8uX190eXBlbmFtZSA9PT0gJ09yZGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vcmRlcnMnLCB0aGlzLmlkXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uT3JkZXJUb1N0YXRlPy5fX3R5cGVuYW1lID09PSAnT3JkZXJTdGF0ZVRyYW5zaXRpb25FcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHRyYW5zaXRpb25PcmRlclRvU3RhdGUudHJhbnNpdGlvbkVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc0lkPFQgZXh0ZW5kcyB7IGlkOiBzdHJpbmcgfT4oaW5wdXQ6IFQgfCBhbnkpOiBpbnB1dCBpcyB7IGlkOiBzdHJpbmcgfSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmICEhaW5wdXQuaWQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoZW50aXR5OiBPcmRlci5GcmFnbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBlbXB0eVxuICAgIH1cbn1cbiJdfQ==