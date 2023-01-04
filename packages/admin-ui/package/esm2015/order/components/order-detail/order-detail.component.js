import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, EditNoteDialogComponent, ModalService, NotificationService, ServerConfigService, SortOrder, } from '@vendure/admin-ui/core';
import { assertNever, summate } from '@vendure/common/lib/shared-utils';
import { EMPTY, of, Subject } from 'rxjs';
import { map, mapTo, startWith, switchMap, take } from 'rxjs/operators';
import { OrderTransitionService } from '../../providers/order-transition.service';
import { AddManualPaymentDialogComponent } from '../add-manual-payment-dialog/add-manual-payment-dialog.component';
import { CancelOrderDialogComponent } from '../cancel-order-dialog/cancel-order-dialog.component';
import { FulfillOrderDialogComponent } from '../fulfill-order-dialog/fulfill-order-dialog.component';
import { OrderProcessGraphDialogComponent } from '../order-process-graph-dialog/order-process-graph-dialog.component';
import { RefundOrderDialogComponent } from '../refund-order-dialog/refund-order-dialog.component';
import { SettleRefundDialogComponent } from '../settle-refund-dialog/settle-refund-dialog.component';
export class OrderDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.orderTransitionService = orderTransitionService;
        this.detailForm = new FormGroup({});
        this.fetchHistory = new Subject();
        this.defaultStates = [
            'AddingItems',
            'ArrangingPayment',
            'PaymentAuthorized',
            'PaymentSettled',
            'PartiallyShipped',
            'Shipped',
            'PartiallyDelivered',
            'Delivered',
            'Cancelled',
            'Modifying',
            'ArrangingAdditionalPayment',
        ];
    }
    ngOnInit() {
        this.init();
        this.entity$.pipe(take(1)).subscribe(order => {
            if (order.state === 'Modifying') {
                this.router.navigate(['./', 'modify'], { relativeTo: this.route });
            }
        });
        this.customFields = this.getCustomFieldConfig('Order');
        this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
        this.history$ = this.fetchHistory.pipe(startWith(null), switchMap(() => {
            return this.dataService.order
                .getOrderHistory(this.id, {
                sort: {
                    createdAt: SortOrder.DESC,
                },
            })
                .mapStream(data => { var _a; return (_a = data.order) === null || _a === void 0 ? void 0 : _a.history.items; });
        }));
        this.nextStates$ = this.entity$.pipe(map(order => {
            const isInCustomState = !this.defaultStates.includes(order.state);
            return isInCustomState
                ? order.nextStates
                : order.nextStates.filter(s => !this.defaultStates.includes(s));
        }));
    }
    ngOnDestroy() {
        this.destroy();
    }
    openStateDiagram() {
        this.entity$
            .pipe(take(1), switchMap(order => this.modalService.fromComponent(OrderProcessGraphDialogComponent, {
            closable: true,
            locals: {
                activeState: order.state,
            },
        })))
            .subscribe();
    }
    transitionToState(state) {
        this.dataService.order.transitionToState(this.id, state).subscribe(({ transitionOrderToState }) => {
            switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                case 'Order':
                    this.notificationService.success(_('order.transitioned-to-state-success'), { state });
                    this.fetchHistory.next();
                    break;
                case 'OrderStateTransitionError':
                    this.notificationService.error(transitionOrderToState.transitionError);
            }
        });
    }
    manuallyTransitionToState(order) {
        this.orderTransitionService
            .manuallyTransitionToState({
            orderId: order.id,
            nextStates: order.nextStates,
            cancellable: true,
            message: _('order.manually-transition-to-state-message'),
            retry: 0,
        })
            .subscribe();
    }
    transitionToModifying() {
        this.dataService.order
            .transitionToState(this.id, 'Modifying')
            .subscribe(({ transitionOrderToState }) => {
            switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                case 'Order':
                    this.router.navigate(['./modify'], { relativeTo: this.route });
                    break;
                case 'OrderStateTransitionError':
                    this.notificationService.error(transitionOrderToState.transitionError);
            }
        });
    }
    updateCustomFields(customFieldsValue) {
        this.dataService.order
            .updateOrderCustomFields({
            id: this.id,
            customFields: customFieldsValue,
        })
            .subscribe(() => {
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Order' });
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
    settlePayment(payment) {
        this.dataService.order.settlePayment(payment.id).subscribe(({ settlePayment }) => {
            switch (settlePayment.__typename) {
                case 'Payment':
                    if (settlePayment.state === 'Settled') {
                        this.notificationService.success(_('order.settle-payment-success'));
                    }
                    else {
                        this.notificationService.error(_('order.settle-payment-error'));
                    }
                    this.dataService.order.getOrder(this.id).single$.subscribe();
                    this.fetchHistory.next();
                    break;
                case 'OrderStateTransitionError':
                case 'PaymentStateTransitionError':
                case 'SettlePaymentError':
                    this.notificationService.error(settlePayment.message);
            }
        });
    }
    transitionPaymentState({ payment, state }) {
        if (state === 'Cancelled') {
            this.dataService.order.cancelPayment(payment.id).subscribe(({ cancelPayment }) => {
                switch (cancelPayment.__typename) {
                    case 'Payment':
                        this.notificationService.success(_('order.transitioned-payment-to-state-success'), {
                            state,
                        });
                        this.dataService.order.getOrder(this.id).single$.subscribe();
                        this.fetchHistory.next();
                        break;
                    case 'PaymentStateTransitionError':
                        this.notificationService.error(cancelPayment.transitionError);
                        break;
                    case 'CancelPaymentError':
                        this.notificationService.error(cancelPayment.paymentErrorMessage);
                        break;
                }
            });
        }
        else {
            this.dataService.order
                .transitionPaymentToState(payment.id, state)
                .subscribe(({ transitionPaymentToState }) => {
                switch (transitionPaymentToState.__typename) {
                    case 'Payment':
                        this.notificationService.success(_('order.transitioned-payment-to-state-success'), {
                            state,
                        });
                        this.dataService.order.getOrder(this.id).single$.subscribe();
                        this.fetchHistory.next();
                        break;
                    case 'PaymentStateTransitionError':
                        this.notificationService.error(transitionPaymentToState.message);
                        break;
                }
            });
        }
    }
    canAddFulfillment(order) {
        var _a;
        const allFulfillmentSummaryRows = ((_a = order.fulfillments) !== null && _a !== void 0 ? _a : []).reduce((all, fulfillment) => [...all, ...fulfillment.summary], []);
        let allItemsFulfilled = true;
        for (const line of order.lines) {
            const totalFulfilledCount = allFulfillmentSummaryRows
                .filter(row => row.orderLine.id === line.id)
                .reduce((sum, row) => sum + row.quantity, 0);
            if (totalFulfilledCount < line.quantity) {
                allItemsFulfilled = false;
            }
        }
        return (!allItemsFulfilled &&
            !this.hasUnsettledModifications(order) &&
            this.outstandingPaymentAmount(order) === 0 &&
            (order.nextStates.includes('Shipped') ||
                order.nextStates.includes('PartiallyShipped') ||
                order.nextStates.includes('Delivered')));
    }
    hasUnsettledModifications(order) {
        return 0 < order.modifications.filter(m => !m.isSettled).length;
    }
    getOutstandingModificationAmount(order) {
        return summate(order.modifications.filter(m => !m.isSettled), 'priceChange');
    }
    outstandingPaymentAmount(order) {
        var _a, _b, _c;
        const paymentIsValid = (p) => p.state !== 'Cancelled' && p.state !== 'Declined' && p.state !== 'Error';
        let amountCovered = 0;
        for (const payment of (_b = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(paymentIsValid)) !== null && _b !== void 0 ? _b : []) {
            const refunds = (_c = payment.refunds.filter(r => r.state !== 'Failed')) !== null && _c !== void 0 ? _c : [];
            const refundsTotal = summate(refunds, 'total');
            amountCovered += payment.amount - refundsTotal;
        }
        return order.totalWithTax - amountCovered;
    }
    addManualPayment(order) {
        const priorState = order.state;
        this.modalService
            .fromComponent(AddManualPaymentDialogComponent, {
            closable: true,
            locals: {
                outstandingAmount: this.outstandingPaymentAmount(order),
                currencyCode: order.currencyCode,
            },
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.dataService.order.addManualPaymentToOrder({
                    orderId: this.id,
                    transactionId: result.transactionId,
                    method: result.method,
                    metadata: result.metadata || {},
                });
            }
            else {
                return EMPTY;
            }
        }), switchMap(({ addManualPaymentToOrder }) => {
            switch (addManualPaymentToOrder.__typename) {
                case 'Order':
                    this.notificationService.success(_('order.add-payment-to-order-success'));
                    if (priorState === 'ArrangingAdditionalPayment') {
                        return this.orderTransitionService.transitionToPreModifyingState(order.id, order.nextStates);
                    }
                    else {
                        return this.dataService.order
                            .transitionToState(this.id, 'PaymentSettled')
                            .pipe(mapTo('PaymentSettled'));
                    }
                case 'ManualPaymentStateError':
                    this.notificationService.error(addManualPaymentToOrder.message);
                    return EMPTY;
                default:
                    return EMPTY;
            }
        }))
            .subscribe(result => {
            if (result) {
                this.refetchOrder({ result });
            }
        });
    }
    fulfillOrder() {
        this.entity$
            .pipe(take(1), switchMap(order => {
            return this.modalService.fromComponent(FulfillOrderDialogComponent, {
                size: 'xl',
                locals: {
                    order,
                },
            });
        }), switchMap(input => {
            if (input) {
                return this.dataService.order.createFulfillment(input);
            }
            else {
                return of(undefined);
            }
        }), switchMap(result => this.refetchOrder(result).pipe(mapTo(result))))
            .subscribe(result => {
            if (result) {
                const { addFulfillmentToOrder } = result;
                switch (addFulfillmentToOrder.__typename) {
                    case 'Fulfillment':
                        this.notificationService.success(_('order.create-fulfillment-success'));
                        break;
                    case 'EmptyOrderLineSelectionError':
                    case 'InsufficientStockOnHandError':
                    case 'ItemsAlreadyFulfilledError':
                    case 'InvalidFulfillmentHandlerError':
                        this.notificationService.error(addFulfillmentToOrder.message);
                        break;
                    case 'FulfillmentStateTransitionError':
                        this.notificationService.error(addFulfillmentToOrder.transitionError);
                        break;
                    case 'CreateFulfillmentError':
                        this.notificationService.error(addFulfillmentToOrder.fulfillmentHandlerError);
                        break;
                    case undefined:
                        this.notificationService.error(JSON.stringify(addFulfillmentToOrder));
                        break;
                    default:
                        assertNever(addFulfillmentToOrder);
                }
            }
        });
    }
    transitionFulfillment(id, state) {
        this.dataService.order
            .transitionFulfillmentToState(id, state)
            .pipe(switchMap(result => this.refetchOrder(result)))
            .subscribe(() => {
            this.notificationService.success(_('order.successfully-updated-fulfillment'));
        });
    }
    cancelOrRefund(order) {
        const isRefundable = this.orderHasSettledPayments(order);
        if (order.state === 'PaymentAuthorized' || order.active === true || !isRefundable) {
            this.cancelOrder(order);
        }
        else {
            this.refundOrder(order);
        }
    }
    settleRefund(refund) {
        this.modalService
            .fromComponent(SettleRefundDialogComponent, {
            size: 'md',
            locals: {
                refund,
            },
        })
            .pipe(switchMap(transactionId => {
            if (transactionId) {
                return this.dataService.order.settleRefund({
                    transactionId,
                    id: refund.id,
                }, this.id);
            }
            else {
                return of(undefined);
            }
        }))
            .subscribe(result => {
            if (result) {
                this.notificationService.success(_('order.settle-refund-success'));
            }
        });
    }
    addNote(event) {
        const { note, isPublic } = event;
        this.dataService.order
            .addNoteToOrder({
            id: this.id,
            note,
            isPublic,
        })
            .pipe(switchMap(result => this.refetchOrder(result)))
            .subscribe(result => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Note',
            });
        });
    }
    updateNote(entry) {
        this.modalService
            .fromComponent(EditNoteDialogComponent, {
            closable: true,
            locals: {
                displayPrivacyControls: true,
                note: entry.data.note,
                noteIsPrivate: !entry.isPublic,
            },
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.dataService.order.updateOrderNote({
                    noteId: entry.id,
                    isPublic: !result.isPrivate,
                    note: result.note,
                });
            }
            else {
                return EMPTY;
            }
        }))
            .subscribe(result => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Note',
            });
        });
    }
    deleteNote(entry) {
        return this.modalService
            .dialog({
            title: _('common.confirm-delete-note'),
            body: entry.data.note,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.order.deleteOrderNote(entry.id) : EMPTY)))
            .subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Note',
            });
        });
    }
    orderHasSettledPayments(order) {
        var _a;
        return !!((_a = order.payments) === null || _a === void 0 ? void 0 : _a.find(p => p.state === 'Settled'));
    }
    cancelOrder(order) {
        this.modalService
            .fromComponent(CancelOrderDialogComponent, {
            size: 'xl',
            locals: {
                order,
            },
        })
            .pipe(switchMap(input => {
            if (input) {
                return this.dataService.order.cancelOrder(input);
            }
            else {
                return of(undefined);
            }
        }), switchMap(result => this.refetchOrder(result)))
            .subscribe(result => {
            if (result) {
                this.notificationService.success(_('order.cancelled-order-success'));
            }
        });
    }
    refundOrder(order) {
        this.modalService
            .fromComponent(RefundOrderDialogComponent, {
            size: 'xl',
            locals: {
                order,
            },
        })
            .pipe(switchMap(input => {
            var _a;
            if (!input) {
                return of(undefined);
            }
            if ((_a = input.cancel.lines) === null || _a === void 0 ? void 0 : _a.length) {
                return this.dataService.order.cancelOrder(input.cancel).pipe(map(res => {
                    const result = res.cancelOrder;
                    switch (result.__typename) {
                        case 'Order':
                            this.refetchOrder(result).subscribe();
                            this.notificationService.success(_('order.cancelled-order-success'));
                            return input;
                        case 'CancelActiveOrderError':
                        case 'QuantityTooGreatError':
                        case 'MultipleOrderError':
                        case 'OrderStateTransitionError':
                        case 'EmptyOrderLineSelectionError':
                            this.notificationService.error(result.message);
                            return undefined;
                    }
                }));
            }
            else {
                return [input];
            }
        }), switchMap(input => {
            if (!input) {
                return of(undefined);
            }
            if (input.refund.lines.length) {
                return this.dataService.order
                    .refundOrder(input.refund)
                    .pipe(map(res => res.refundOrder));
            }
            else {
                return [undefined];
            }
        }))
            .subscribe(result => {
            if (result) {
                switch (result.__typename) {
                    case 'Refund':
                        this.refetchOrder(result).subscribe();
                        if (result.state === 'Failed') {
                            this.notificationService.error(_('order.refund-order-failed'));
                        }
                        else {
                            this.notificationService.success(_('order.refund-order-success'));
                        }
                        break;
                    case 'AlreadyRefundedError':
                    case 'NothingToRefundError':
                    case 'PaymentOrderMismatchError':
                    case 'RefundOrderStateError':
                    case 'RefundStateTransitionError':
                        this.notificationService.error(result.message);
                        break;
                }
            }
        });
    }
    refetchOrder(result) {
        this.fetchHistory.next();
        if (result) {
            return this.dataService.order.getOrder(this.id).single$;
        }
        else {
            return of(undefined);
        }
    }
    setFormValues(entity) {
        // empty
    }
}
OrderDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-detail',
                template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\">\n                <button\n                    class=\"icon-button\"\n                    (click)=\"openStateDiagram()\"\n                    [title]=\"'order.order-state-diagram' | translate\"\n                >\n                    <clr-icon shape=\"list\"></clr-icon>\n                </button>\n            </vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"\n                (order.state === 'ArrangingPayment' || order.state === 'ArrangingAdditionalPayment') &&\n                (hasUnsettledModifications(order) || 0 < outstandingPaymentAmount(order))\n            \"\n            (click)=\"addManualPayment(order)\"\n        >\n            {{ 'order.add-payment-to-order' | translate }}\n            ({{ outstandingPaymentAmount(order) | localeCurrency: order.currencyCode }})\n        </button>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"\n                order.active === false &&\n                order.state !== 'ArrangingAdditionalPayment' &&\n                order.state !== 'ArrangingPayment' &&\n                0 < outstandingPaymentAmount(order)\n            \"\n            (click)=\"transitionToState('ArrangingAdditionalPayment')\"\n        >\n            {{ 'order.arrange-additional-payment' | translate }}\n        </button>\n        <button class=\"btn btn-primary\" (click)=\"fulfillOrder()\" [disabled]=\"!canAddFulfillment(order)\">\n            {{ 'order.fulfill-order' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngIf=\"order.nextStates.includes('Modifying')\">\n                    <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"transitionToModifying()\">\n                        <clr-icon shape=\"pencil\"></clr-icon>\n                        {{ 'order.modify-order' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                </ng-container>\n                <button\n                    type=\"button\"\n                    class=\"btn\"\n                    vdrDropdownItem\n                    *ngIf=\"order.nextStates.includes('Cancelled')\"\n                    (click)=\"cancelOrRefund(order)\"\n                >\n                    <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                    <ng-container *ngIf=\"orderHasSettledPayments(order); else cancelOnly\">\n                        {{ 'order.refund-and-cancel-order' | translate }}\n                    </ng-container>\n                    <ng-template #cancelOnly>\n                        {{ 'order.cancel-order' | translate }}\n                    </ng-template>\n                </button>\n\n                <ng-container *ngIf=\"(nextStates$ | async)?.length\">\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        *ngFor=\"let nextState of nextStates$ | async\"\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionToState(nextState)\"\n                    >\n                        <clr-icon shape=\"step-forward-2\"></clr-icon>\n                        {{\n                            'order.transition-to-state'\n                                | translate: { state: (nextState | stateI18nToken | translate) }\n                        }}\n                    </button>\n                </ng-container>\n                <div class=\"dropdown-divider\"></div>\n                <button type=\"button\" class=\"btn\" vdrDropdownItem (click)=\"manuallyTransitionToState(order)\">\n                    <clr-icon shape=\"step-forward-2\" class=\"is-warning\"></clr-icon>\n                    {{ 'order.manually-transition-to-state' | translate }}\n                </button>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <vdr-order-table\n                [order]=\"order\"\n                [orderLineCustomFields]=\"orderLineCustomFields\"\n            ></vdr-order-table>\n            <h4>{{ 'order.tax-summary' | translate }}</h4>\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th>{{ 'common.description' | translate }}</th>\n                        <th>{{ 'order.tax-rate' | translate }}</th>\n                        <th>{{ 'order.tax-base' | translate }}</th>\n                        <th>{{ 'order.tax-total' | translate }}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let row of order.taxSummary\">\n                        <td>{{ row.description }}</td>\n                        <td>{{ row.taxRate / 100 | percent }}</td>\n                        <td>{{ row.taxBase | localeCurrency: order.currencyCode }}</td>\n                        <td>{{ row.taxTotal | localeCurrency: order.currencyCode }}</td>\n                    </tr>\n                </tbody>\n            </table>\n\n            <vdr-custom-detail-component-host\n                locationId=\"order-detail\"\n                [entity$]=\"entity$\"\n                [detailForm]=\"detailForm\"\n            ></vdr-custom-detail-component-host>\n\n            <vdr-order-history\n                [order]=\"order\"\n                [history]=\"history$ | async\"\n                (addNote)=\"addNote($event)\"\n                (updateNote)=\"updateNote($event)\"\n                (deleteNote)=\"deleteNote($event)\"\n            ></vdr-order-history>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <vdr-order-custom-fields-card\n                [customFieldsConfig]=\"customFields\"\n                [customFieldValues]=\"order.customFields\"\n                (updateClick)=\"updateCustomFields($event)\"\n            ></vdr-order-custom-fields-card>\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    {{ 'order.customer' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <div class=\"card-text\">\n                        <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n                        <h6 *ngIf=\"getOrderAddressLines(order.shippingAddress).length\">\n                            {{ 'order.shipping-address' | translate }}\n                        </h6>\n                        <vdr-formatted-address [address]=\"order.shippingAddress\"></vdr-formatted-address>\n                        <h6 *ngIf=\"getOrderAddressLines(order.billingAddress).length\">\n                            {{ 'order.billing-address' | translate }}\n                        </h6>\n                        <vdr-formatted-address [address]=\"order.billingAddress\"></vdr-formatted-address>\n                    </div>\n                </div>\n            </div>\n            <ng-container *ngIf=\"order.payments && order.payments.length\">\n                <vdr-order-payment-card\n                    *ngFor=\"let payment of order.payments\"\n                    [currencyCode]=\"order.currencyCode\"\n                    [payment]=\"payment\"\n                    (settlePayment)=\"settlePayment($event)\"\n                    (transitionPaymentState)=\"transitionPaymentState($event)\"\n                    (settleRefund)=\"settleRefund($event)\"\n                ></vdr-order-payment-card>\n            </ng-container>\n            <ng-container *ngFor=\"let fulfillment of order.fulfillments\">\n                <vdr-fulfillment-card\n                    [fulfillment]=\"fulfillment\"\n                    [order]=\"order\"\n                    (transitionState)=\"transitionFulfillment(fulfillment.id, $event)\"\n                ></vdr-fulfillment-card>\n            </ng-container>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".shipping-address{list-style-type:none;line-height:1.3em}.order-cards h6{margin-top:6px;color:var(--color-text-200)}\n"]
            },] }
];
OrderDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: OrderTransitionService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItZGV0YWlsL29yZGVyLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQ0gsbUJBQW1CLEVBR25CLFdBQVcsRUFDWCx1QkFBdUIsRUFPdkIsWUFBWSxFQUNaLG1CQUFtQixFQU9uQixtQkFBbUIsRUFDbkIsU0FBUyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsS0FBSyxFQUFxQixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbEYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDbkgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDckcsT0FB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LHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUEzQ3dCLE1BQU07WUFBdEIsY0FBYztZQXNCbkIsbUJBQW1CO1lBeEJXLGlCQUFpQjtZQVEvQyxXQUFXO1lBU1gsbUJBQW1CO1lBRG5CLFlBQVk7WUFnQlAsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDYW5jZWxPcmRlcixcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCxcbiAgICBGdWxmaWxsbWVudEZyYWdtZW50LFxuICAgIEZ1bGZpbGxtZW50TGluZVN1bW1hcnksXG4gICAgR2V0T3JkZXJIaXN0b3J5LFxuICAgIEdldE9yZGVyUXVlcnksXG4gICAgSGlzdG9yeUVudHJ5LFxuICAgIEhpc3RvcnlFbnRyeVR5cGUsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgT3JkZXIsXG4gICAgT3JkZXJEZXRhaWwsXG4gICAgT3JkZXJEZXRhaWxGcmFnbWVudCxcbiAgICBPcmRlckxpbmVGcmFnbWVudCxcbiAgICBSZWZ1bmQsXG4gICAgUmVmdW5kT3JkZXIsXG4gICAgU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICBTb3J0T3JkZXIsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvcGljayc7XG5pbXBvcnQgeyBhc3NlcnROZXZlciwgc3VtbWF0ZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWFwVG8sIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBPcmRlclRyYW5zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL29yZGVyLXRyYW5zaXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBZGRNYW51YWxQYXltZW50RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vYWRkLW1hbnVhbC1wYXltZW50LWRpYWxvZy9hZGQtbWFudWFsLXBheW1lbnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW5jZWxPcmRlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2NhbmNlbC1vcmRlci1kaWFsb2cvY2FuY2VsLW9yZGVyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnVsZmlsbE9yZGVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vZnVsZmlsbC1vcmRlci1kaWFsb2cvZnVsZmlsbC1vcmRlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyUHJvY2Vzc0dyYXBoRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vb3JkZXItcHJvY2Vzcy1ncmFwaC1kaWFsb2cvb3JkZXItcHJvY2Vzcy1ncmFwaC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFJlZnVuZE9yZGVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVmdW5kLW9yZGVyLWRpYWxvZy9yZWZ1bmQtb3JkZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXR0bGVSZWZ1bmREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9zZXR0bGUtcmVmdW5kLWRpYWxvZy9zZXR0bGUtcmVmdW5kLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZGVyLWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckRldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxPcmRlckRldGFpbC5GcmFnbWVudD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgZGV0YWlsRm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGhpc3RvcnkkOiBPYnNlcnZhYmxlPEdldE9yZGVySGlzdG9yeS5JdGVtc1tdIHwgdW5kZWZpbmVkPjtcbiAgICBuZXh0U3RhdGVzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gICAgZmV0Y2hIaXN0b3J5ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgb3JkZXJMaW5lQ3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdFN0YXRlcyA9IFtcbiAgICAgICAgJ0FkZGluZ0l0ZW1zJyxcbiAgICAgICAgJ0FycmFuZ2luZ1BheW1lbnQnLFxuICAgICAgICAnUGF5bWVudEF1dGhvcml6ZWQnLFxuICAgICAgICAnUGF5bWVudFNldHRsZWQnLFxuICAgICAgICAnUGFydGlhbGx5U2hpcHBlZCcsXG4gICAgICAgICdTaGlwcGVkJyxcbiAgICAgICAgJ1BhcnRpYWxseURlbGl2ZXJlZCcsXG4gICAgICAgICdEZWxpdmVyZWQnLFxuICAgICAgICAnQ2FuY2VsbGVkJyxcbiAgICAgICAgJ01vZGlmeWluZycsXG4gICAgICAgICdBcnJhbmdpbmdBZGRpdGlvbmFsUGF5bWVudCcsXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG9yZGVyVHJhbnNpdGlvblNlcnZpY2U6IE9yZGVyVHJhbnNpdGlvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuZW50aXR5JC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShvcmRlciA9PiB7XG4gICAgICAgICAgICBpZiAob3JkZXIuc3RhdGUgPT09ICdNb2RpZnlpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLycsICdtb2RpZnknXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdPcmRlcicpO1xuICAgICAgICB0aGlzLm9yZGVyTGluZUN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ09yZGVyTGluZScpO1xuICAgICAgICB0aGlzLmhpc3RvcnkkID0gdGhpcy5mZXRjaEhpc3RvcnkucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgICAgICAgICAgLmdldE9yZGVySGlzdG9yeSh0aGlzLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBTb3J0T3JkZXIuREVTQyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLm9yZGVyPy5oaXN0b3J5Lml0ZW1zKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLm5leHRTdGF0ZXMkID0gdGhpcy5lbnRpdHkkLnBpcGUoXG4gICAgICAgICAgICBtYXAob3JkZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzSW5DdXN0b21TdGF0ZSA9ICF0aGlzLmRlZmF1bHRTdGF0ZXMuaW5jbHVkZXMob3JkZXIuc3RhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0luQ3VzdG9tU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgPyBvcmRlci5uZXh0U3RhdGVzXG4gICAgICAgICAgICAgICAgICAgIDogb3JkZXIubmV4dFN0YXRlcy5maWx0ZXIocyA9PiAhdGhpcy5kZWZhdWx0U3RhdGVzLmluY2x1ZGVzKHMpKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBvcGVuU3RhdGVEaWFncmFtKCkge1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKG9yZGVyID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoT3JkZXJQcm9jZXNzR3JhcGhEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3RhdGU6IG9yZGVyLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uVG9TdGF0ZShzdGF0ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIudHJhbnNpdGlvblRvU3RhdGUodGhpcy5pZCwgc3RhdGUpLnN1YnNjcmliZSgoeyB0cmFuc2l0aW9uT3JkZXJUb1N0YXRlIH0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAodHJhbnNpdGlvbk9yZGVyVG9TdGF0ZT8uX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ09yZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIudHJhbnNpdGlvbmVkLXRvLXN0YXRlLXN1Y2Nlc3MnKSwgeyBzdGF0ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHRyYW5zaXRpb25PcmRlclRvU3RhdGUudHJhbnNpdGlvbkVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFudWFsbHlUcmFuc2l0aW9uVG9TdGF0ZShvcmRlcjogT3JkZXJEZXRhaWxGcmFnbWVudCkge1xuICAgICAgICB0aGlzLm9yZGVyVHJhbnNpdGlvblNlcnZpY2VcbiAgICAgICAgICAgIC5tYW51YWxseVRyYW5zaXRpb25Ub1N0YXRlKHtcbiAgICAgICAgICAgICAgICBvcmRlcklkOiBvcmRlci5pZCxcbiAgICAgICAgICAgICAgICBuZXh0U3RhdGVzOiBvcmRlci5uZXh0U3RhdGVzLFxuICAgICAgICAgICAgICAgIGNhbmNlbGxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8oJ29yZGVyLm1hbnVhbGx5LXRyYW5zaXRpb24tdG8tc3RhdGUtbWVzc2FnZScpLFxuICAgICAgICAgICAgICAgIHJldHJ5OiAwLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uVG9Nb2RpZnlpbmcoKSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgIC50cmFuc2l0aW9uVG9TdGF0ZSh0aGlzLmlkLCAnTW9kaWZ5aW5nJylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHsgdHJhbnNpdGlvbk9yZGVyVG9TdGF0ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cmFuc2l0aW9uT3JkZXJUb1N0YXRlPy5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ09yZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi9tb2RpZnknXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ09yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHRyYW5zaXRpb25PcmRlclRvU3RhdGUudHJhbnNpdGlvbkVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDdXN0b21GaWVsZHMoY3VzdG9tRmllbGRzVmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAudXBkYXRlT3JkZXJDdXN0b21GaWVsZHMoe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogY3VzdG9tRmllbGRzVmFsdWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7IGVudGl0eTogJ09yZGVyJyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE9yZGVyQWRkcmVzc0xpbmVzKG9yZGVyQWRkcmVzcz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICghb3JkZXJBZGRyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMob3JkZXJBZGRyZXNzKVxuICAgICAgICAgICAgLmZpbHRlcih2YWwgPT4gdmFsICE9PSAnT3JkZXJBZGRyZXNzJylcbiAgICAgICAgICAgIC5maWx0ZXIobGluZSA9PiAhIWxpbmUpO1xuICAgIH1cblxuICAgIHNldHRsZVBheW1lbnQocGF5bWVudDogT3JkZXJEZXRhaWwuUGF5bWVudHMpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5zZXR0bGVQYXltZW50KHBheW1lbnQuaWQpLnN1YnNjcmliZSgoeyBzZXR0bGVQYXltZW50IH0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2V0dGxlUGF5bWVudC5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGF5bWVudCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0bGVQYXltZW50LnN0YXRlID09PSAnU2V0dGxlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLnNldHRsZS1wYXltZW50LXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnb3JkZXIuc2V0dGxlLXBheW1lbnQtZXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5nZXRPcmRlcih0aGlzLmlkKS5zaW5nbGUkLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ09yZGVyU3RhdGVUcmFuc2l0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1BheW1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0dGxlUGF5bWVudEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHNldHRsZVBheW1lbnQubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyYW5zaXRpb25QYXltZW50U3RhdGUoeyBwYXltZW50LCBzdGF0ZSB9OiB7IHBheW1lbnQ6IE9yZGVyRGV0YWlsLlBheW1lbnRzOyBzdGF0ZTogc3RyaW5nIH0pIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSAnQ2FuY2VsbGVkJykge1xuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5jYW5jZWxQYXltZW50KHBheW1lbnQuaWQpLnN1YnNjcmliZSgoeyBjYW5jZWxQYXltZW50IH0pID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNhbmNlbFBheW1lbnQuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdQYXltZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLnRyYW5zaXRpb25lZC1wYXltZW50LXRvLXN0YXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmdldE9yZGVyKHRoaXMuaWQpLnNpbmdsZSQuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihjYW5jZWxQYXltZW50LnRyYW5zaXRpb25FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ2FuY2VsUGF5bWVudEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihjYW5jZWxQYXltZW50LnBheW1lbnRFcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb25QYXltZW50VG9TdGF0ZShwYXltZW50LmlkLCBzdGF0ZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh7IHRyYW5zaXRpb25QYXltZW50VG9TdGF0ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHJhbnNpdGlvblBheW1lbnRUb1N0YXRlLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1BheW1lbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfKCdvcmRlci50cmFuc2l0aW9uZWQtcGF5bWVudC10by1zdGF0ZS1zdWNjZXNzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlci5nZXRPcmRlcih0aGlzLmlkKS5zaW5nbGUkLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1BheW1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHRyYW5zaXRpb25QYXltZW50VG9TdGF0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuQWRkRnVsZmlsbG1lbnQob3JkZXI6IE9yZGVyRGV0YWlsLkZyYWdtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGFsbEZ1bGZpbGxtZW50U3VtbWFyeVJvd3M6IEZ1bGZpbGxtZW50RnJhZ21lbnRbJ3N1bW1hcnknXSA9IChvcmRlci5mdWxmaWxsbWVudHMgPz8gW10pLnJlZHVjZShcbiAgICAgICAgICAgIChhbGwsIGZ1bGZpbGxtZW50KSA9PiBbLi4uYWxsLCAuLi5mdWxmaWxsbWVudC5zdW1tYXJ5XSxcbiAgICAgICAgICAgIFtdIGFzIEZ1bGZpbGxtZW50RnJhZ21lbnRbJ3N1bW1hcnknXSxcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGFsbEl0ZW1zRnVsZmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIG9yZGVyLmxpbmVzKSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbEZ1bGZpbGxlZENvdW50ID0gYWxsRnVsZmlsbG1lbnRTdW1tYXJ5Um93c1xuICAgICAgICAgICAgICAgIC5maWx0ZXIocm93ID0+IHJvdy5vcmRlckxpbmUuaWQgPT09IGxpbmUuaWQpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoc3VtLCByb3cpID0+IHN1bSArIHJvdy5xdWFudGl0eSwgMCk7XG4gICAgICAgICAgICBpZiAodG90YWxGdWxmaWxsZWRDb3VudCA8IGxpbmUucXVhbnRpdHkpIHtcbiAgICAgICAgICAgICAgICBhbGxJdGVtc0Z1bGZpbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhYWxsSXRlbXNGdWxmaWxsZWQgJiZcbiAgICAgICAgICAgICF0aGlzLmhhc1Vuc2V0dGxlZE1vZGlmaWNhdGlvbnMob3JkZXIpICYmXG4gICAgICAgICAgICB0aGlzLm91dHN0YW5kaW5nUGF5bWVudEFtb3VudChvcmRlcikgPT09IDAgJiZcbiAgICAgICAgICAgIChvcmRlci5uZXh0U3RhdGVzLmluY2x1ZGVzKCdTaGlwcGVkJykgfHxcbiAgICAgICAgICAgICAgICBvcmRlci5uZXh0U3RhdGVzLmluY2x1ZGVzKCdQYXJ0aWFsbHlTaGlwcGVkJykgfHxcbiAgICAgICAgICAgICAgICBvcmRlci5uZXh0U3RhdGVzLmluY2x1ZGVzKCdEZWxpdmVyZWQnKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBoYXNVbnNldHRsZWRNb2RpZmljYXRpb25zKG9yZGVyOiBPcmRlckRldGFpbEZyYWdtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAwIDwgb3JkZXIubW9kaWZpY2F0aW9ucy5maWx0ZXIobSA9PiAhbS5pc1NldHRsZWQpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRPdXRzdGFuZGluZ01vZGlmaWNhdGlvbkFtb3VudChvcmRlcjogT3JkZXJEZXRhaWxGcmFnbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzdW1tYXRlKFxuICAgICAgICAgICAgb3JkZXIubW9kaWZpY2F0aW9ucy5maWx0ZXIobSA9PiAhbS5pc1NldHRsZWQpLFxuICAgICAgICAgICAgJ3ByaWNlQ2hhbmdlJyxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvdXRzdGFuZGluZ1BheW1lbnRBbW91bnQob3JkZXI6IE9yZGVyRGV0YWlsRnJhZ21lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBwYXltZW50SXNWYWxpZCA9IChwOiBPcmRlckRldGFpbC5QYXltZW50cyk6IGJvb2xlYW4gPT5cbiAgICAgICAgICAgIHAuc3RhdGUgIT09ICdDYW5jZWxsZWQnICYmIHAuc3RhdGUgIT09ICdEZWNsaW5lZCcgJiYgcC5zdGF0ZSAhPT0gJ0Vycm9yJztcblxuICAgICAgICBsZXQgYW1vdW50Q292ZXJlZCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgcGF5bWVudCBvZiBvcmRlci5wYXltZW50cz8uZmlsdGVyKHBheW1lbnRJc1ZhbGlkKSA/PyBbXSkge1xuICAgICAgICAgICAgY29uc3QgcmVmdW5kcyA9IHBheW1lbnQucmVmdW5kcy5maWx0ZXIociA9PiByLnN0YXRlICE9PSAnRmFpbGVkJykgPz8gW107XG4gICAgICAgICAgICBjb25zdCByZWZ1bmRzVG90YWwgPSBzdW1tYXRlKHJlZnVuZHMgYXMgQXJyYXk8UmVxdWlyZWQ8UmVmdW5kPj4sICd0b3RhbCcpO1xuICAgICAgICAgICAgYW1vdW50Q292ZXJlZCArPSBwYXltZW50LmFtb3VudCAtIHJlZnVuZHNUb3RhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JkZXIudG90YWxXaXRoVGF4IC0gYW1vdW50Q292ZXJlZDtcbiAgICB9XG5cbiAgICBhZGRNYW51YWxQYXltZW50KG9yZGVyOiBPcmRlckRldGFpbEZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IHByaW9yU3RhdGUgPSBvcmRlci5zdGF0ZTtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KEFkZE1hbnVhbFBheW1lbnREaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0c3RhbmRpbmdBbW91bnQ6IHRoaXMub3V0c3RhbmRpbmdQYXltZW50QW1vdW50KG9yZGVyKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBvcmRlci5jdXJyZW5jeUNvZGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuYWRkTWFudWFsUGF5bWVudFRvT3JkZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVySWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JZDogcmVzdWx0LnRyYW5zYWN0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiByZXN1bHQubWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiByZXN1bHQubWV0YWRhdGEgfHwge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoeyBhZGRNYW51YWxQYXltZW50VG9PcmRlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWRkTWFudWFsUGF5bWVudFRvT3JkZXIuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnT3JkZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLmFkZC1wYXltZW50LXRvLW9yZGVyLXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaW9yU3RhdGUgPT09ICdBcnJhbmdpbmdBZGRpdGlvbmFsUGF5bWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3JkZXJUcmFuc2l0aW9uU2VydmljZS50cmFuc2l0aW9uVG9QcmVNb2RpZnlpbmdTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIubmV4dFN0YXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb25Ub1N0YXRlKHRoaXMuaWQsICdQYXltZW50U2V0dGxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXBUbygnUGF5bWVudFNldHRsZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTWFudWFsUGF5bWVudFN0YXRlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihhZGRNYW51YWxQYXltZW50VG9PcmRlci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZldGNoT3JkZXIoeyByZXN1bHQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVsZmlsbE9yZGVyKCkge1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKG9yZGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLmZyb21Db21wb25lbnQoRnVsZmlsbE9yZGVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW5wdXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmNyZWF0ZUZ1bGZpbGxtZW50KGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlc3VsdCA9PiB0aGlzLnJlZmV0Y2hPcmRlcihyZXN1bHQpLnBpcGUobWFwVG8ocmVzdWx0KSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBhZGRGdWxmaWxsbWVudFRvT3JkZXIgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhZGRGdWxmaWxsbWVudFRvT3JkZXIuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRnVsZmlsbG1lbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLmNyZWF0ZS1mdWxmaWxsbWVudC1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRW1wdHlPcmRlckxpbmVTZWxlY3Rpb25FcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdJbnN1ZmZpY2llbnRTdG9ja09uSGFuZEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0l0ZW1zQWxyZWFkeUZ1bGZpbGxlZEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0ludmFsaWRGdWxmaWxsbWVudEhhbmRsZXJFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKGFkZEZ1bGZpbGxtZW50VG9PcmRlci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bGZpbGxtZW50U3RhdGVUcmFuc2l0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihhZGRGdWxmaWxsbWVudFRvT3JkZXIudHJhbnNpdGlvbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0NyZWF0ZUZ1bGZpbGxtZW50RXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihhZGRGdWxmaWxsbWVudFRvT3JkZXIuZnVsZmlsbG1lbnRIYW5kbGVyRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKEpTT04uc3RyaW5naWZ5KGFkZEZ1bGZpbGxtZW50VG9PcmRlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnROZXZlcihhZGRGdWxmaWxsbWVudFRvT3JkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJhbnNpdGlvbkZ1bGZpbGxtZW50KGlkOiBzdHJpbmcsIHN0YXRlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5vcmRlclxuICAgICAgICAgICAgLnRyYW5zaXRpb25GdWxmaWxsbWVudFRvU3RhdGUoaWQsIHN0YXRlKVxuICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKHJlc3VsdCA9PiB0aGlzLnJlZmV0Y2hPcmRlcihyZXN1bHQpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLnN1Y2Nlc3NmdWxseS11cGRhdGVkLWZ1bGZpbGxtZW50JykpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsT3JSZWZ1bmQob3JkZXI6IE9yZGVyRGV0YWlsLkZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IGlzUmVmdW5kYWJsZSA9IHRoaXMub3JkZXJIYXNTZXR0bGVkUGF5bWVudHMob3JkZXIpO1xuICAgICAgICBpZiAob3JkZXIuc3RhdGUgPT09ICdQYXltZW50QXV0aG9yaXplZCcgfHwgb3JkZXIuYWN0aXZlID09PSB0cnVlIHx8ICFpc1JlZnVuZGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIob3JkZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZ1bmRPcmRlcihvcmRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXR0bGVSZWZ1bmQocmVmdW5kOiBPcmRlckRldGFpbC5SZWZ1bmRzKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChTZXR0bGVSZWZ1bmREaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICByZWZ1bmQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAodHJhbnNhY3Rpb25JZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5vcmRlci5zZXR0bGVSZWZ1bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVmdW5kLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIC8vIHN3aXRjaE1hcChyZXN1bHQgPT4gdGhpcy5yZWZldGNoT3JkZXIocmVzdWx0KSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdvcmRlci5zZXR0bGUtcmVmdW5kLXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkTm90ZShldmVudDogeyBub3RlOiBzdHJpbmc7IGlzUHVibGljOiBib29sZWFuIH0pIHtcbiAgICAgICAgY29uc3QgeyBub3RlLCBpc1B1YmxpYyB9ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXJcbiAgICAgICAgICAgIC5hZGROb3RlVG9PcmRlcih7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICAgICAgbm90ZSxcbiAgICAgICAgICAgICAgICBpc1B1YmxpYyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShzd2l0Y2hNYXAocmVzdWx0ID0+IHRoaXMucmVmZXRjaE9yZGVyKHJlc3VsdCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdOb3RlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZU5vdGUoZW50cnk6IEhpc3RvcnlFbnRyeSkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoRWRpdE5vdGVEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVByaXZhY3lDb250cm9sczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbm90ZTogZW50cnkuZGF0YS5ub3RlLFxuICAgICAgICAgICAgICAgICAgICBub3RlSXNQcml2YXRlOiAhZW50cnkuaXNQdWJsaWMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIudXBkYXRlT3JkZXJOb3RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlSWQ6IGVudHJ5LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHVibGljOiAhcmVzdWx0LmlzUHJpdmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlOiByZXN1bHQubm90ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdOb3RlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZU5vdGUoZW50cnk6IEhpc3RvcnlFbnRyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjb21tb24uY29uZmlybS1kZWxldGUtbm90ZScpLFxuICAgICAgICAgICAgICAgIGJvZHk6IGVudHJ5LmRhdGEubm90ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKHN3aXRjaE1hcChyZXMgPT4gKHJlcyA/IHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuZGVsZXRlT3JkZXJOb3RlKGVudHJ5LmlkKSA6IEVNUFRZKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ05vdGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3JkZXJIYXNTZXR0bGVkUGF5bWVudHMob3JkZXI6IE9yZGVyRGV0YWlsLkZyYWdtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIW9yZGVyLnBheW1lbnRzPy5maW5kKHAgPT4gcC5zdGF0ZSA9PT0gJ1NldHRsZWQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbmNlbE9yZGVyKG9yZGVyOiBPcmRlckRldGFpbC5GcmFnbWVudCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQ2FuY2VsT3JkZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBvcmRlcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChpbnB1dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuY2FuY2VsT3JkZXIoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzdWx0ID0+IHRoaXMucmVmZXRjaE9yZGVyKHJlc3VsdCkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIuY2FuY2VsbGVkLW9yZGVyLXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZ1bmRPcmRlcihvcmRlcjogT3JkZXJEZXRhaWwuRnJhZ21lbnQpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFJlZnVuZE9yZGVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3hsJyxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW5wdXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jYW5jZWwubGluZXM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uub3JkZXIuY2FuY2VsT3JkZXIoaW5wdXQuY2FuY2VsKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXMuY2FuY2VsT3JkZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0Ll9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ09yZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZmV0Y2hPcmRlcihyZXN1bHQpLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ29yZGVyLmNhbmNlbGxlZC1vcmRlci1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0NhbmNlbEFjdGl2ZU9yZGVyRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUXVhbnRpdHlUb29HcmVhdEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ011bHRpcGxlT3JkZXJFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VtcHR5T3JkZXJMaW5lU2VsZWN0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbaW5wdXRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKGlucHV0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnJlZnVuZC5saW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZnVuZE9yZGVyKGlucHV0LnJlZnVuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5yZWZ1bmRPcmRlcikpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt1bmRlZmluZWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdSZWZ1bmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmZXRjaE9yZGVyKHJlc3VsdCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0ZSA9PT0gJ0ZhaWxlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ29yZGVyLnJlZnVuZC1vcmRlci1mYWlsZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnb3JkZXIucmVmdW5kLW9yZGVyLXN1Y2Nlc3MnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQWxyZWFkeVJlZnVuZGVkRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTm90aGluZ1RvUmVmdW5kRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUGF5bWVudE9yZGVyTWlzbWF0Y2hFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdSZWZ1bmRPcmRlclN0YXRlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUmVmdW5kU3RhdGVUcmFuc2l0aW9uRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZmV0Y2hPcmRlcihyZXN1bHQ6IG9iamVjdCB8IHVuZGVmaW5lZCk6IE9ic2VydmFibGU8R2V0T3JkZXJRdWVyeSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLm9yZGVyLmdldE9yZGVyKHRoaXMuaWQpLnNpbmdsZSQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKGVudGl0eTogT3JkZXIuRnJhZ21lbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gZW1wdHlcbiAgICB9XG59XG4iXX0=