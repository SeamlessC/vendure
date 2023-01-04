import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, Injectable, ChangeDetectorRef, ElementRef, ViewChildren, HostBinding, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as i1 from '@vendure/admin-ui/core';
import { DataService, getAppConfig, I18nService, HistoryEntryType, SortOrder, ModalService, NotificationService, ADDRESS_FRAGMENT, BaseDetailComponent, DeletionResult, ServerConfigService, configurableDefinitionToInstance, GlobalFlag, configurableOperationValueIsValid, toConfigurableOperationInput, EditNoteDialogComponent, transformRelationCustomFieldInputs, BaseListComponent, LogicalOperator, LocalStorageService, AdjustmentType, CanDeactivateDetailGuard, detailBreadcrumb, SharedModule } from '@vendure/admin-ui/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Subject, concat, EMPTY, of, combineLatest, merge, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, switchMap, map, startWith, catchError, retryWhen, delay, take, tap, debounceTime, mapTo, takeUntil, shareReplay, filter } from 'rxjs/operators';
import * as i1$1 from '@angular/router';
import { Router, ActivatedRoute, ActivationStart, RouterModule } from '@angular/router';
import { pick } from '@vendure/common/lib/pick';
import { gql } from 'apollo-angular';
import { isObject, summate, assertNever, notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { simpleDeepClone } from '@vendure/common/lib/simple-deep-clone';
import { __awaiter } from 'tslib';
import dayjs from 'dayjs';

class AddManualPaymentDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.form = new FormGroup({
            method: new FormControl('', Validators.required),
            transactionId: new FormControl('', Validators.required),
        });
    }
    ngOnInit() {
        this.paymentMethods$ = this.dataService.settings
            .getPaymentMethods(999)
            .mapSingle(data => data.paymentMethods.items);
    }
    submit() {
        const formValue = this.form.value;
        this.resolveWith({
            method: formValue.method,
            transactionId: formValue.transactionId,
        });
    }
    cancel() {
        this.resolveWith();
    }
}
AddManualPaymentDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-add-manual-payment-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.add-payment-to-order' | translate }}</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'order.payment-method' | translate\" for=\"method\">\n        <ng-select\n            [items]=\"paymentMethods$ | async\"\n            bindLabel=\"code\"\n            autofocus\n            bindValue=\"code\"\n            [addTag]=\"true\"\n            formControlName=\"method\"\n        ></ng-select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'order.transaction-id' | translate\" for=\"transactionId\">\n        <input id=\"transactionId\" type=\"text\" formControlName=\"transactionId\" />\n    </vdr-form-field>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" class=\"btn btn-primary\" [disabled]=\"form.invalid || form.pristine\">\n        {{ 'order.add-payment' | translate }}  ({{ outstandingAmount | localeCurrency: currencyCode }})\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ng-select{min-width:100%}\n"]
            },] }
];
AddManualPaymentDialogComponent.ctorParameters = () => [
    { type: DataService }
];

class CancelOrderDialogComponent {
    constructor(i18nService) {
        var _a;
        this.i18nService = i18nService;
        this.cancelAll = true;
        this.lineQuantities = {};
        this.reasons = (_a = getAppConfig().cancellationReasons) !== null && _a !== void 0 ? _a : [
            marker('order.cancel-reason-customer-request'),
            marker('order.cancel-reason-not-available'),
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

class CouponCodeSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.addCouponCode = new EventEmitter();
        this.removeCouponCode = new EventEmitter();
        this.couponCodeInput$ = new Subject();
    }
    ngOnInit() {
        var _a;
        this.availableCouponCodes$ = concat(this.couponCodeInput$.pipe(distinctUntilChanged(), switchMap(term => this.dataService.promotion.getPromotions(10, 0, {
            couponCode: { contains: term },
        }).single$), map(({ promotions }) => 
        // tslint:disable-next-line:no-non-null-assertion
        promotions.items.map(p => ({ code: p.couponCode, promotionName: p.name }))), startWith([])));
        if (!this.control) {
            this.control = new FormControl((_a = this.couponCodes) !== null && _a !== void 0 ? _a : []);
        }
    }
}
CouponCodeSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-coupon-code-selector',
                template: "<ng-select\n    [items]=\"availableCouponCodes$ | async\"\n    appendTo=\"body\"\n    bindLabel=\"code\"\n    bindValue=\"code\"\n    [addTag]=\"false\"\n    [multiple]=\"true\"\n    [hideSelected]=\"true\"\n    [minTermLength]=\"2\"\n    typeToSearchText=\"\"\n    [typeahead]=\"couponCodeInput$\"\n    [formControl]=\"control\"\n    (add)=\"addCouponCode.emit($event.code)\"\n    (remove)=\"removeCouponCode.emit($event.value?.code)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip>{{ item.code }}</vdr-chip>\n        {{ item.promotionName }}\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CouponCodeSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
CouponCodeSelectorComponent.propDecorators = {
    couponCodes: [{ type: Input }],
    control: [{ type: Input }],
    addCouponCode: [{ type: Output }],
    removeCouponCode: [{ type: Output }]
};

class OrderStateSelectDialogComponent {
    constructor() {
        this.nextStates = [];
        this.message = '';
        this.selectedState = '';
    }
    select() {
        if (this.selectedState) {
            this.resolveWith(this.selectedState);
        }
    }
    cancel() {
        this.resolveWith();
    }
}
OrderStateSelectDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-state-select-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.select-state' | translate }}</ng-template>\n<p>{{ message | translate }}</p>\n<clr-select-container>\n    <select clrSelect name=\"state\" [(ngModel)]=\"selectedState\">\n        <option *ngFor=\"let state of nextStates\" [value]=\"state\">\n            {{ state | stateI18nToken | translate }}\n        </option>\n    </select>\n</clr-select-container>\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" *ngIf=\"cancellable\" (click)=\"cancel()\" class=\"btn btn-secondary\">\n        {{ 'common.cancel' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"!selectedState\">\n        {{ 'order.transition-to-state' | translate: { state: (selectedState | stateI18nToken | translate) } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

class OrderTransitionService {
    constructor(dataService, modalService, notificationService, i18nService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.i18nService = i18nService;
    }
    /**
     * Attempts to transition the Order to the last state it was in before it was transitioned
     * to the "Modifying" state. If this fails, a manual prompt is used.
     */
    transitionToPreModifyingState(orderId, nextStates) {
        return this.getPreModifyingState(orderId).pipe(switchMap(state => {
            const manualTransitionOptions = {
                orderId,
                nextStates,
                message: this.i18nService.translate(marker('order.unable-to-transition-to-state-try-another'), { state }),
                cancellable: false,
                retry: 10,
            };
            if (state) {
                return this.transitionToStateOrThrow(orderId, state).pipe(catchError(err => this.manuallyTransitionToState(manualTransitionOptions)));
            }
            else {
                return this.manuallyTransitionToState(manualTransitionOptions);
            }
        }));
    }
    /**
     * Displays a modal for manually selecting the next state.
     */
    manuallyTransitionToState(options) {
        return this.modalService
            .fromComponent(OrderStateSelectDialogComponent, {
            locals: {
                nextStates: options.nextStates,
                cancellable: options.cancellable,
                message: options.message,
            },
            closable: false,
            size: 'md',
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.transitionToStateOrThrow(options.orderId, result);
            }
            else {
                if (!options.cancellable) {
                    throw new Error(`An order state must be selected`);
                }
                else {
                    return EMPTY;
                }
            }
        }), retryWhen(errors => errors.pipe(delay(2000), take(options.retry))));
    }
    /**
     * Attempts to get the last state the Order was in before it was transitioned
     * to the "Modifying" state.
     */
    getPreModifyingState(orderId) {
        return this.dataService.order
            .getOrderHistory(orderId, {
            filter: {
                type: {
                    eq: HistoryEntryType.ORDER_STATE_TRANSITION,
                },
            },
            sort: {
                createdAt: SortOrder.DESC,
            },
        })
            .mapSingle(result => result.order)
            .pipe(map(result => {
            const item = result === null || result === void 0 ? void 0 : result.history.items.find(i => i.data.to === 'Modifying');
            if (item) {
                return item.data.from;
            }
            else {
                return;
            }
        }));
    }
    transitionToStateOrThrow(orderId, state) {
        return this.dataService.order.transitionToState(orderId, state).pipe(map(({ transitionOrderToState }) => {
            switch (transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.__typename) {
                case 'Order':
                    return transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.state;
                case 'OrderStateTransitionError':
                    this.notificationService.error(transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.transitionError);
                    throw new Error(transitionOrderToState === null || transitionOrderToState === void 0 ? void 0 : transitionOrderToState.transitionError);
            }
        }));
    }
}
OrderTransitionService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderTransitionService_Factory() { return new OrderTransitionService(i0.ɵɵinject(i1.DataService), i0.ɵɵinject(i1.ModalService), i0.ɵɵinject(i1.NotificationService), i0.ɵɵinject(i1.I18nService)); }, token: OrderTransitionService, providedIn: "root" });
OrderTransitionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderTransitionService.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: I18nService }
];

const GET_CUSTOMER_ADDRESSES = gql `
    query GetCustomerAddresses($customerId: ID!) {
        customer(id: $customerId) {
            id
            addresses {
                ...Address
            }
        }
    }
    ${ADDRESS_FRAGMENT}
`;

class SelectAddressDialogComponent {
    constructor(dataService, formBuilder) {
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.useExisting = true;
        this.createNew = false;
    }
    ngOnInit() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        this.addressForm = this.formBuilder.group({
            fullName: [(_b = (_a = this.currentAddress) === null || _a === void 0 ? void 0 : _a.fullName) !== null && _b !== void 0 ? _b : ''],
            company: [(_d = (_c = this.currentAddress) === null || _c === void 0 ? void 0 : _c.company) !== null && _d !== void 0 ? _d : ''],
            streetLine1: [(_f = (_e = this.currentAddress) === null || _e === void 0 ? void 0 : _e.streetLine1) !== null && _f !== void 0 ? _f : '', Validators.required],
            streetLine2: [(_h = (_g = this.currentAddress) === null || _g === void 0 ? void 0 : _g.streetLine2) !== null && _h !== void 0 ? _h : ''],
            city: [(_k = (_j = this.currentAddress) === null || _j === void 0 ? void 0 : _j.city) !== null && _k !== void 0 ? _k : '', Validators.required],
            province: [(_m = (_l = this.currentAddress) === null || _l === void 0 ? void 0 : _l.province) !== null && _m !== void 0 ? _m : ''],
            postalCode: [(_p = (_o = this.currentAddress) === null || _o === void 0 ? void 0 : _o.postalCode) !== null && _p !== void 0 ? _p : '', Validators.required],
            countryCode: [(_r = (_q = this.currentAddress) === null || _q === void 0 ? void 0 : _q.countryCode) !== null && _r !== void 0 ? _r : '', Validators.required],
            phoneNumber: [(_t = (_s = this.currentAddress) === null || _s === void 0 ? void 0 : _s.phoneNumber) !== null && _t !== void 0 ? _t : ''],
        });
        this.useExisting = !!this.customerId;
        this.addresses$ = this.customerId
            ? this.dataService
                .query(GET_CUSTOMER_ADDRESSES, { customerId: this.customerId })
                .mapSingle(({ customer }) => { var _a; return (_a = customer === null || customer === void 0 ? void 0 : customer.addresses) !== null && _a !== void 0 ? _a : []; })
                .pipe(tap(addresses => {
                if (this.currentAddress) {
                    this.selectedAddress = addresses.find(a => {
                        var _a, _b;
                        return a.streetLine1 === ((_a = this.currentAddress) === null || _a === void 0 ? void 0 : _a.streetLine1) &&
                            a.postalCode === ((_b = this.currentAddress) === null || _b === void 0 ? void 0 : _b.postalCode);
                    });
                }
                if (addresses.length === 0) {
                    this.createNew = true;
                    this.useExisting = false;
                }
            }))
            : of([]);
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(({ countries }) => countries.items);
    }
    trackByFn(item) {
        return item.id;
    }
    addressIdFn(item) {
        return item.streetLine1 + item.postalCode;
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        if (this.useExisting && this.selectedAddress) {
            this.resolveWith(Object.assign(Object.assign({}, pick(this.selectedAddress, [
                'fullName',
                'company',
                'streetLine1',
                'streetLine2',
                'city',
                'province',
                'phoneNumber',
                'postalCode',
            ])), { countryCode: this.selectedAddress.country.code }));
        }
        if (this.createNew && this.addressForm.valid) {
            const formValue = this.addressForm.value;
            this.resolveWith(formValue);
        }
    }
}
SelectAddressDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-address-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.select-address' | translate }}</ng-template>\n\n<clr-tabs *ngIf=\"addresses$ | async as addresses\">\n    <clr-tab *ngIf=\"customerId && addresses.length\">\n        <button clrTabLink>{{ 'order.existing-address' | translate }}</button>\n        <ng-template [(clrIfActive)]=\"useExisting\">\n            <clr-tab-content>\n                <vdr-radio-card-fieldset\n                    class=\"block mt4\"\n                    [idFn]=\"addressIdFn\"\n                    [selectedItemId]=\"selectedAddress && addressIdFn(selectedAddress)\"\n                    (selectItem)=\"selectedAddress = $event\"\n                >\n                    <vdr-radio-card *ngFor=\"let address of addresses\" [item]=\"address\">\n                        <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n                    </vdr-radio-card>\n                </vdr-radio-card-fieldset>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n    <clr-tab>\n        <button clrTabLink>{{ 'customer.create-new-address' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"createNew\">\n            <clr-tab-content>\n                <vdr-address-form\n                    [formGroup]=\"addressForm\"\n                    [availableCountries]=\"availableCountries$ | async\"\n                ></vdr-address-form>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n</clr-tabs>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"(useExisting && !selectedAddress) || (createNew && addressForm.invalid)\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
SelectAddressDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: FormBuilder }
];

class SelectCustomerDialogComponent {
    constructor(dataService, formBuilder) {
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.isLoading = false;
        this.input$ = new Subject();
        this.selectedCustomer = [];
        this.useExisting = true;
        this.createNew = false;
        this.customerForm = this.formBuilder.group({
            title: '',
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: '',
            emailAddress: ['', [Validators.required, Validators.email]],
        });
    }
    ngOnInit() {
        this.customers$ = concat(of([]), // default items
        this.input$.pipe(debounceTime(200), distinctUntilChanged(), tap(() => (this.isLoading = true)), switchMap(term => this.dataService.customer
            .getCustomerList(10, 0, term)
            .mapStream(({ customers }) => customers.items)
            .pipe(catchError(() => of([])), // empty list on error
        tap(() => (this.isLoading = false))))));
    }
    trackByFn(item) {
        return item.id;
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        if (this.useExisting && this.selectedCustomer.length === 1) {
            this.resolveWith(this.selectedCustomer[0]);
        }
        if (this.createNew && this.customerForm.valid) {
            const formValue = this.customerForm.value;
            this.resolveWith(formValue);
        }
    }
}
SelectCustomerDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-customer-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.set-customer-for-order' | translate }}</ng-template>\n\n<clr-tabs>\n    <clr-tab>\n        <button clrTabLink>{{ 'order.existing-customer' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"useExisting\">\n            <clr-tab-content>\n                <ng-select\n                    [items]=\"customers$ | async\"\n                    appendTo=\"body\"\n                    bindLabel=\"name\"\n                    [addTag]=\"false\"\n                    [multiple]=\"true\"\n                    [hideSelected]=\"true\"\n                    [trackByFn]=\"trackByFn\"\n                    [minTermLength]=\"2\"\n                    [loading]=\"isLoading\"\n                    [typeahead]=\"input$\"\n                    [(ngModel)]=\"selectedCustomer\"\n                    class=\"mt4\"\n                >\n                    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                        <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon\n                        ><span class=\"ml2 mr2\">{{ item.firstName }} {{ item.lastName }}</span>\n                        <vdr-chip>{{ item.emailAddress }}</vdr-chip>\n                    </ng-template>\n                    <ng-template ng-option-tmp let-item=\"item\">\n                        <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon\n                        ><span class=\"ml2 mr2\">{{ item.firstName }} {{ item.lastName }}</span>\n                        <vdr-chip>{{ item.emailAddress }}</vdr-chip>\n                    </ng-template>\n                </ng-select>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n    <clr-tab>\n        <button clrTabLink>{{ 'customer.create-new-customer' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"createNew\">\n            <clr-tab-content>\n                <form [formGroup]=\"customerForm\">\n                <vdr-form-field [label]=\"'customer.title' | translate\" for=\"title\">\n                    <input id=\"title\" type=\"text\" formControlName=\"title\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.first-name' | translate\" for=\"firstName\">\n                    <input id=\"firstName\" type=\"text\" formControlName=\"firstName\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.last-name' | translate\" for=\"lastName\">\n                    <input id=\"lastName\" type=\"text\" formControlName=\"lastName\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.email-address' | translate\" for=\"emailAddress\">\n                    <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\" />\n                </vdr-form-field>\n                <vdr-form-field [label]=\"'customer.phone-number' | translate\" for=\"phoneNumber\">\n                    <input id=\"phoneNumber\" type=\"text\" formControlName=\"phoneNumber\" />\n                </vdr-form-field>\n                </form>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n</clr-tabs>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"(useExisting && selectedCustomer.length === 0) || (createNew && customerForm.invalid)\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
SelectCustomerDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: FormBuilder }
];

class SelectShippingMethodDialogComponent {
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

class DraftOrderDetailComponent extends BaseDetailComponent {
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
                this.notificationService.success(marker('common.notify-delete-success'), {
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

class DraftOrderVariantSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.addItem = new EventEmitter();
        this.customFieldsFormGroup = new FormGroup({});
        this.selectedVariantId$ = new Subject();
        this.quantity = 1;
    }
    ngOnInit() {
        this.selectedVariant$ = this.selectedVariantId$.pipe(switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductVariant(id)
                    .mapSingle(({ productVariant }) => productVariant);
            }
            else {
                return [undefined];
            }
        }));
        for (const customField of this.orderLineCustomFields) {
            this.customFieldsFormGroup.addControl(customField.name, new FormControl(''));
        }
    }
    addItemClick(selectedVariant) {
        if (selectedVariant) {
            this.addItem.emit({
                productVariantId: selectedVariant.id,
                quantity: this.quantity,
                customFields: this.orderLineCustomFields.length
                    ? this.customFieldsFormGroup.value
                    : undefined,
            });
            this.selectedVariantId$.next(undefined);
            this.customFieldsFormGroup.reset();
        }
    }
}
DraftOrderVariantSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-draft-order-variant-selector',
                template: "<div class=\"card\">\n    <div class=\"card-block\">\n        <h4 class=\"card-title\">{{ 'order.add-item-to-order' | translate }}</h4>\n        <vdr-product-selector\n            (productSelected)=\"selectedVariantId$.next($event.productVariantId)\"\n        ></vdr-product-selector>\n    </div>\n    <div class=\"card-block\" *ngIf=\"selectedVariant$ | async as selectedVariant\">\n        <div class=\"variant-details\">\n            <img class=\"mr2\" [src]=\"selectedVariant.featuredAsset || selectedVariant.product.featuredAsset | assetPreview: 32\">\n            <div class=\"details\">\n                <div>{{ selectedVariant?.name }}</div>\n                <div class=\"small\">{{ selectedVariant?.sku }}</div>\n            </div>\n            <div class=\"details ml4\">\n                <div class=\"small\">\n                    {{ 'catalog.stock-on-hand' | translate }}: {{ selectedVariant.stockOnHand }}\n                </div>\n                <div class=\"small\">\n                    {{ 'catalog.stock-allocated' | translate }}: {{ selectedVariant.stockAllocated }}\n                </div>\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"details\">\n                <div>{{ selectedVariant?.priceWithTax | localeCurrency: currencyCode }}</div>\n                <div class=\"small\" [title]=\"'order.net-price' | translate\">\n                    {{ selectedVariant?.price | localeCurrency: currencyCode }}\n                </div>\n            </div>\n            <div>\n                <input [disabled]=\"!selectedVariant\" type=\"number\" min=\"0\" [(ngModel)]=\"quantity\" />\n            </div>\n            <button\n                [disabled]=\"!selectedVariant\"\n                class=\"btn btn-small btn-primary\"\n                (click)=\"addItemClick(selectedVariant)\"\n            >\n                {{ 'order.add-item-to-order' | translate }}\n            </button>\n        </div>\n        <ng-container *ngIf=\"orderLineCustomFields.length\">\n            <div class=\"custom-field\" *ngFor=\"let field of orderLineCustomFields\">\n                <vdr-custom-field-control\n                    [compact]=\"true\"\n                    [readonly]=\"false\"\n                    [customField]=\"field\"\n                    [customFieldsFormGroup]=\"customFieldsFormGroup\"\n                ></vdr-custom-field-control>\n            </div>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".variant-details{display:flex;align-items:center}.variant-details img{border-radius:var(--border-radius-img);width:32px;height:32px}.variant-details .details{font-size:.65rem;line-height:.7rem}.variant-details input{width:48px;margin:0 6px}.variant-details .small{font-size:11px;color:var(--color-text-300)}\n"]
            },] }
];
DraftOrderVariantSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
DraftOrderVariantSelectorComponent.propDecorators = {
    currencyCode: [{ type: Input }],
    orderLineCustomFields: [{ type: Input }],
    addItem: [{ type: Output }]
};

class FulfillOrderDialogComponent {
    constructor(dataService, changeDetector) {
        this.dataService = dataService;
        this.changeDetector = changeDetector;
        this.fulfillmentHandlerControl = new FormControl();
        this.fulfillmentQuantities = {};
    }
    ngOnInit() {
        this.dataService.settings.getGlobalSettings().single$.subscribe(({ globalSettings }) => {
            this.fulfillmentQuantities = this.order.lines.reduce((result, line) => {
                const fulfillCount = this.getFulfillableCount(line, globalSettings.trackInventory);
                return Object.assign(Object.assign({}, result), { [line.id]: { fulfillCount, max: fulfillCount } });
            }, {});
            this.changeDetector.markForCheck();
        });
        this.dataService.shippingMethod
            .getShippingMethodOperations()
            .mapSingle(data => data.fulfillmentHandlers)
            .subscribe(handlers => {
            this.fulfillmentHandlerDef =
                handlers.find(h => { var _a, _b; return h.code === ((_b = (_a = this.order.shippingLines[0]) === null || _a === void 0 ? void 0 : _a.shippingMethod) === null || _b === void 0 ? void 0 : _b.fulfillmentHandlerCode); }) || handlers[0];
            this.fulfillmentHandler = configurableDefinitionToInstance(this.fulfillmentHandlerDef);
            this.fulfillmentHandlerControl.patchValue(this.fulfillmentHandler);
            this.changeDetector.markForCheck();
        });
    }
    getFulfillableCount(line, globalTrackInventory) {
        const { trackInventory, stockOnHand } = line.productVariant;
        const effectiveTracInventory = trackInventory === GlobalFlag.INHERIT ? globalTrackInventory : trackInventory === GlobalFlag.TRUE;
        const unfulfilledCount = this.getUnfulfilledCount(line);
        return effectiveTracInventory ? Math.min(unfulfilledCount, stockOnHand) : unfulfilledCount;
    }
    getUnfulfilledCount(line) {
        var _a, _b;
        const fulfilled = (_b = (_a = line.fulfillments) === null || _a === void 0 ? void 0 : _a.map(f => f.summary).flat().filter(row => row.orderLine.id === line.id).reduce((sum, row) => sum + row.quantity, 0)) !== null && _b !== void 0 ? _b : 0;
        return line.quantity - fulfilled;
    }
    canSubmit() {
        const totalCount = Object.values(this.fulfillmentQuantities).reduce((total, { fulfillCount }) => total + fulfillCount, 0);
        const formIsValid = configurableOperationValueIsValid(this.fulfillmentHandlerDef, this.fulfillmentHandlerControl.value) && this.fulfillmentHandlerControl.valid;
        return formIsValid && 0 < totalCount;
    }
    select() {
        const lines = Object.entries(this.fulfillmentQuantities).map(([orderLineId, { fulfillCount }]) => ({
            orderLineId,
            quantity: fulfillCount,
        }));
        this.resolveWith({
            lines,
            handler: toConfigurableOperationInput(this.fulfillmentHandler, this.fulfillmentHandlerControl.value),
        });
    }
    cancel() {
        this.resolveWith();
    }
}
FulfillOrderDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfill-order-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.fulfill-order' | translate }}</ng-template>\n\n<div class=\"fulfillment-wrapper\">\n    <div class=\"order-table\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.unfulfilled' | translate }}</th>\n                    <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n                    <th>{{ 'order.fulfill' | translate }}</th>\n                </tr>\n            </thead>\n            <tr\n                *ngFor=\"let line of order.lines\"\n                class=\"order-line\"\n                [class.ignore]=\"getUnfulfilledCount(line) === 0\"\n            >\n                <td class=\"align-middle thumb\">\n                    <img *ngIf=\"line.featuredAsset\" [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">{{ getUnfulfilledCount(line) }}</td>\n                <td class=\"align-middle quantity\">{{ line.productVariant.stockOnHand }}</td>\n                <td class=\"align-middle fulfil\">\n                    <input\n                        *ngIf=\"fulfillmentQuantities[line.id]\"\n                        [disabled]=\"getUnfulfilledCount(line) === 0\"\n                        [(ngModel)]=\"fulfillmentQuantities[line.id].fulfillCount\"\n                        type=\"number\"\n                        [max]=\"fulfillmentQuantities[line.id].max\"\n                        min=\"0\"\n                    />\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"shipping-details\">\n        <vdr-formatted-address [address]=\"order.shippingAddress\"></vdr-formatted-address>\n        <h6>{{ 'order.shipping-method' | translate }}</h6>\n        {{ order.shippingLines[0]?.shippingMethod?.name }}\n        <strong>{{ order.shipping | localeCurrency: order.currencyCode }}</strong>\n        <vdr-configurable-input\n            [operationDefinition]=\"fulfillmentHandlerDef\"\n            [operation]=\"fulfillmentHandler\"\n            [formControl]=\"fulfillmentHandlerControl\"\n            [removable]=\"false\"\n        ></vdr-configurable-input>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" [disabled]=\"!canSubmit()\" class=\"btn btn-primary\">\n        {{ 'order.create-fulfillment' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;min-height:64vh}.fulfillment-wrapper{flex:1}@media screen and (min-width: 768px){.fulfillment-wrapper{display:flex;flex-direction:row}}.fulfillment-wrapper .shipping-details{margin-top:24px}@media screen and (min-width: 768px){.fulfillment-wrapper .shipping-details{margin-top:0;margin-left:24px;width:250px}}.fulfillment-wrapper .shipping-details clr-input-container{margin-top:24px}.fulfillment-wrapper .order-table{flex:1;overflow-y:auto}.fulfillment-wrapper .order-table table{margin-top:0}.fulfillment-wrapper tr.ignore{color:var(--color-grey-300)}\n"]
            },] }
];
FulfillOrderDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];

class FulfillmentCardComponent {
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

class FulfillmentDetailComponent {
    constructor(serverConfigService) {
        this.serverConfigService = serverConfigService;
        this.customFieldConfig = [];
        this.customFieldFormGroup = new FormGroup({});
    }
    ngOnInit() {
        this.customFieldConfig = this.serverConfigService.getCustomFieldsFor('Fulfillment');
    }
    ngOnChanges(changes) {
        this.buildCustomFieldsFormGroup();
    }
    get fulfillment() {
        return this.order.fulfillments && this.order.fulfillments.find(f => f.id === this.fulfillmentId);
    }
    get items() {
        var _a, _b;
        return ((_b = (_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.summary.map(row => {
            var _a, _b;
            return {
                name: (_b = (_a = this.order.lines.find(line => line.id === row.orderLine.id)) === null || _a === void 0 ? void 0 : _a.productVariant.name) !== null && _b !== void 0 ? _b : '',
                quantity: row.quantity,
            };
        })) !== null && _b !== void 0 ? _b : []);
    }
    buildCustomFieldsFormGroup() {
        const customFields = this.fulfillment.customFields;
        for (const fieldDef of this.serverConfigService.getCustomFieldsFor('Fulfillment')) {
            this.customFieldFormGroup.addControl(fieldDef.name, new FormControl(customFields[fieldDef.name]));
        }
    }
    customFieldIsObject(customField) {
        return Array.isArray(customField) || isObject(customField);
    }
}
FulfillmentDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-detail',
                template: "<vdr-labeled-data [label]=\"'common.created-at' | translate\">\n    {{ fulfillment?.createdAt | localeDate: 'medium' }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n    {{ fulfillment?.method }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"fulfillment?.trackingCode\" [label]=\"'order.tracking-code' | translate\">\n    {{ fulfillment?.trackingCode }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.contents' | translate\">\n    <vdr-simple-item-list [items]=\"items\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<ng-container *ngFor=\"let customField of customFieldConfig\">\n    <vdr-custom-field-control\n        *ngIf=\"customFieldFormGroup.get(customField.name)\"\n        [readonly]=\"true\"\n        [compact]=\"true\"\n        [customField]=\"customField\"\n        [customFieldsFormGroup]=\"customFieldFormGroup\"\n    ></vdr-custom-field-control>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
FulfillmentDetailComponent.ctorParameters = () => [
    { type: ServerConfigService }
];
FulfillmentDetailComponent.propDecorators = {
    fulfillmentId: [{ type: Input }],
    order: [{ type: Input }]
};

class FulfillmentStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'Pending':
            case 'Shipped':
                return 'warning';
            case 'Delivered':
                return 'success';
            case 'Cancelled':
                return 'error';
        }
    }
}
FulfillmentStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-state-label',
                template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Delivered'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{font-size:14px}\n"]
            },] }
];
FulfillmentStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};

class LineFulfillmentComponent {
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

class LineRefundsComponent {
    getRefundedCount() {
        var _a, _b;
        const refunds = (_b = (_a = this.payments) === null || _a === void 0 ? void 0 : _a.reduce((all, payment) => [...all, ...payment.refunds], [])) !== null && _b !== void 0 ? _b : [];
        return this.line.items.filter(i => {
            if (i.refundId === null && !i.cancelled) {
                return false;
            }
            if (i.refundId) {
                const refund = refunds.find(r => r.id === i.refundId);
                if ((refund === null || refund === void 0 ? void 0 : refund.state) === 'Failed') {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }).length;
    }
}
LineRefundsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-line-refunds',
                template: "<span *ngIf=\"getRefundedCount()\" [title]=\"'order.refunded-count' | translate: { count: getRefundedCount() }\">\n    <clr-icon shape=\"redo\" class=\"is-solid\" dir=\"down\"></clr-icon>\n</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{color:var(--color-error-500)}\n"]
            },] }
];
LineRefundsComponent.propDecorators = {
    line: [{ type: Input }],
    payments: [{ type: Input }]
};

class ModificationDetailComponent {
    constructor() {
        this.addedItems = new Map();
        this.removedItems = new Map();
    }
    ngOnChanges() {
        const { added, removed } = this.getModifiedLines();
        this.addedItems = added;
        this.removedItems = removed;
    }
    getSurcharge(id) {
        return this.order.surcharges.find(m => m.id === id);
    }
    getAddedItems() {
        return [...this.addedItems.entries()].map(([line, count]) => {
            return { name: line.productVariant.name, quantity: count };
        });
    }
    getRemovedItems() {
        return [...this.removedItems.entries()].map(([line, count]) => {
            return { name: line.productVariant.name, quantity: count };
        });
    }
    getModifiedLines() {
        var _a, _b;
        const added = new Map();
        const removed = new Map();
        for (const _item of this.modification.orderItems || []) {
            const result = this.getOrderLineAndItem(_item.id);
            if (result) {
                const { line, item } = result;
                if (item.cancelled) {
                    const count = (_a = removed.get(line)) !== null && _a !== void 0 ? _a : 0;
                    removed.set(line, count + 1);
                }
                else {
                    const count = (_b = added.get(line)) !== null && _b !== void 0 ? _b : 0;
                    added.set(line, count + 1);
                }
            }
        }
        return { added, removed };
    }
    getOrderLineAndItem(itemId) {
        for (const line of this.order.lines) {
            const item = line.items.find(i => i.id === itemId);
            if (item) {
                return { line, item };
            }
        }
    }
}
ModificationDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-modification-detail',
                template: "<vdr-labeled-data [label]=\"'common.ID' | translate\">{{ modification.id }}</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"modification.note\" [label]=\"'order.note' | translate\">{{\n    modification.note\n}}</vdr-labeled-data>\n<vdr-labeled-data *ngFor=\"let surcharge of modification.surcharges\" [label]=\"'order.surcharges' | translate\">\n    {{ getSurcharge(surcharge.id)?.description }}\n    {{ getSurcharge(surcharge.id)?.priceWithTax | localeCurrency: order.currencyCode }}</vdr-labeled-data\n>\n<vdr-labeled-data *ngIf=\"getAddedItems().length\" [label]=\"'order.added-items' | translate\">\n    <vdr-simple-item-list [items]=\"getAddedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"getRemovedItems().length\" [label]=\"'order.removed-items' | translate\">\n    <vdr-simple-item-list [items]=\"getRemovedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ModificationDetailComponent.propDecorators = {
    order: [{ type: Input }],
    modification: [{ type: Input }]
};

class OrderCustomFieldsCardComponent {
    constructor(formBuilder, modalService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.customFieldsConfig = [];
        this.customFieldValues = {};
        this.updateClick = new EventEmitter();
        this.editable = false;
    }
    ngOnInit() {
        this.customFieldForm = this.formBuilder.group({});
        for (const field of this.customFieldsConfig) {
            this.customFieldForm.addControl(field.name, this.formBuilder.control(this.customFieldValues[field.name]));
        }
    }
    onUpdateClick() {
        this.updateClick.emit(this.customFieldForm.value);
        this.customFieldForm.markAsPristine();
        this.editable = false;
    }
    onCancelClick() {
        if (this.customFieldForm.dirty) {
            this.modalService
                .dialog({
                title: marker('catalog.confirm-cancel'),
                buttons: [
                    { type: 'secondary', label: marker('common.keep-editing') },
                    { type: 'danger', label: marker('common.discard-changes'), returnValue: true },
                ],
            })
                .subscribe(result => {
                if (result) {
                    this.customFieldForm.reset();
                    this.customFieldForm.markAsPristine();
                    this.editable = false;
                }
            });
        }
        else {
            this.editable = false;
        }
    }
}
OrderCustomFieldsCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-custom-fields-card',
                template: "<div class=\"card\" *ngIf=\"customFieldsConfig.length\">\n    <div class=\"card-header\">\n        {{ 'common.custom-fields' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text custom-field-form\" [class.editable]=\"editable\">\n            <vdr-tabbed-custom-fields\n                entityName=\"Order\"\n                [customFields]=\"customFieldsConfig\"\n                [customFieldsFormGroup]=\"customFieldForm\"\n                [readonly]=\"!editable\"\n                [compact]=\"true\"\n            ></vdr-tabbed-custom-fields>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-sm btn-secondary\" (click)=\"editable = true\" *ngIf=\"!editable\">\n            <clr-icon shape=\"pencil\"></clr-icon>\n            {{ 'common.edit' | translate }}\n        </button>\n        <button\n            class=\"btn btn-sm btn-primary\"\n            (click)=\"onUpdateClick()\"\n            *ngIf=\"editable\"\n            [disabled]=\"customFieldForm.pristine || customFieldForm.invalid\"\n        >\n            <clr-icon shape=\"check\"></clr-icon>\n            {{ 'common.update' | translate }}\n        </button>\n        <button\n            class=\"btn btn-sm btn-secondary\"\n            (click)=\"onCancelClick()\"\n            *ngIf=\"editable\"\n        >\n            <clr-icon shape=\"times\"></clr-icon>\n            {{ 'common.cancel' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-custom-field-control{margin-bottom:6px;display:block}.custom-field-form ::ng-deep .clr-control-label{color:var(--color-grey-400)}.custom-field-form.editable ::ng-deep .clr-control-label{color:inherit}\n"]
            },] }
];
OrderCustomFieldsCardComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: ModalService }
];
OrderCustomFieldsCardComponent.propDecorators = {
    customFieldsConfig: [{ type: Input }],
    customFieldValues: [{ type: Input }],
    updateClick: [{ type: Output }]
};

class OrderProcessGraphDialogComponent {
    constructor(serverConfigService) {
        this.serverConfigService = serverConfigService;
        this.states = [];
    }
    ngOnInit() {
        this.states = this.serverConfigService.getOrderProcessStates();
    }
}
OrderProcessGraphDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-graph-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.order-state-diagram' | translate }}</ng-template>\n\n<vdr-order-process-graph [states]=\"states\" [initialState]=\"activeState\"></vdr-order-process-graph>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
OrderProcessGraphDialogComponent.ctorParameters = () => [
    { type: ServerConfigService }
];

class RefundOrderDialogComponent {
    constructor(i18nService) {
        var _a;
        this.i18nService = i18nService;
        this.lineQuantities = {};
        this.refundShipping = false;
        this.adjustment = 0;
        this.reasons = (_a = getAppConfig().cancellationReasons) !== null && _a !== void 0 ? _a : [
            marker('order.refund-reason-customer-request'),
            marker('order.refund-reason-not-available'),
        ];
        this.reasons = this.reasons.map(r => this.i18nService.translate(r));
    }
    get refundTotal() {
        const itemTotal = this.order.lines.reduce((total, line) => {
            const lineRef = this.lineQuantities[line.id];
            const refundCount = (lineRef.refund && lineRef.quantity) || 0;
            return total + line.proratedUnitPriceWithTax * refundCount;
        }, 0);
        return itemTotal + (this.refundShipping ? this.order.shippingWithTax : 0) + this.adjustment;
    }
    get settledPaymentsTotal() {
        return this.settledPayments
            .map(payment => {
            const paymentTotal = payment.amount;
            const alreadyRefundedTotal = summate(payment.refunds.filter(r => r.state !== 'Failed'), 'total');
            return paymentTotal - alreadyRefundedTotal;
        })
            .reduce((sum, amount) => sum + amount, 0);
    }
    lineCanBeRefundedOrCancelled(line) {
        var _a, _b;
        const refunds = (_b = (_a = this.order.payments) === null || _a === void 0 ? void 0 : _a.reduce((all, payment) => [...all, ...payment.refunds], [])) !== null && _b !== void 0 ? _b : [];
        const refundable = line.items.filter(i => {
            if (i.cancelled) {
                return false;
            }
            if (i.refundId == null) {
                return true;
            }
            const refund = refunds.find(r => r.id === i.refundId);
            return (refund === null || refund === void 0 ? void 0 : refund.state) === 'Failed';
        });
        return 0 < refundable.length;
    }
    ngOnInit() {
        this.lineQuantities = this.order.lines.reduce((result, line) => {
            return Object.assign(Object.assign({}, result), { [line.id]: {
                    quantity: 0,
                    refund: false,
                    cancel: false,
                } });
        }, {});
        this.settledPayments = (this.order.payments || []).filter(p => p.state === 'Settled');
        if (this.settledPayments.length) {
            this.selectedPayment = this.settledPayments[0];
        }
    }
    handleZeroQuantity(line) {
        if ((line === null || line === void 0 ? void 0 : line.quantity) === 0) {
            line.cancel = false;
            line.refund = false;
        }
    }
    isRefunding() {
        const result = Object.values(this.lineQuantities).reduce((isRefunding, line) => {
            return isRefunding || (0 < line.quantity && line.refund);
        }, false);
        return result;
    }
    isCancelling() {
        const result = Object.values(this.lineQuantities).reduce((isCancelling, line) => {
            return isCancelling || (0 < line.quantity && line.cancel);
        }, false);
        return result;
    }
    canSubmit() {
        if (this.isRefunding()) {
            return !!(this.selectedPayment &&
                this.reason &&
                0 < this.refundTotal &&
                this.refundTotal <= this.settledPaymentsTotal);
        }
        else if (this.isCancelling()) {
            return !!this.reason;
        }
        return false;
    }
    select() {
        const payment = this.selectedPayment;
        if (payment) {
            const refundLines = this.getOrderLineInput(line => line.refund);
            const cancelLines = this.getOrderLineInput(line => line.cancel);
            this.resolveWith({
                refund: {
                    lines: refundLines,
                    reason: this.reason,
                    shipping: this.refundShipping ? this.order.shippingWithTax : 0,
                    adjustment: this.adjustment,
                    paymentId: payment.id,
                },
                cancel: {
                    lines: cancelLines,
                    orderId: this.order.id,
                    reason: this.reason,
                    cancelShipping: this.refundShipping,
                },
            });
        }
    }
    cancel() {
        this.resolveWith();
    }
    getOrderLineInput(filterFn) {
        return Object.entries(this.lineQuantities)
            .filter(([orderLineId, line]) => 0 < line.quantity && filterFn(line))
            .map(([orderLineId, line]) => ({
            orderLineId,
            quantity: line.quantity,
        }));
    }
}
RefundOrderDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-refund-order-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.refund-and-cancel-order' | translate }}</ng-template>\n\n<div class=\"refund-wrapper\">\n    <div class=\"order-table\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'order.product-name' | translate }}</th>\n                    <th>{{ 'order.product-sku' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.unit-price' | translate }}</th>\n                    <th>{{ 'order.prorated-unit-price' | translate }}</th>\n                    <th>{{ 'order.quantity' | translate }}</th>\n                    <th>{{ 'order.refund' | translate }}</th>\n                    <th>{{ 'order.cancel' | translate }}</th>\n                </tr>\n            </thead>\n            <tr *ngFor=\"let line of order.lines\" class=\"order-line\">\n                <td class=\"align-middle thumb\">\n                    <img [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle quantity\">\n                    {{ line.quantity }}\n                    <vdr-line-refunds [line]=\"line\" [payments]=\"order.payments\"></vdr-line-refunds>\n                </td>\n                <td class=\"align-middle quantity\">\n                    {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                </td>\n                <td class=\"align-middle quantity\">\n                    <div class=\"prorated-wrapper\">\n                        {{ line.proratedUnitPriceWithTax | localeCurrency: order.currencyCode }}\n                        <ng-container *ngIf=\"line.discounts as discounts\">\n                            <vdr-dropdown *ngIf=\"discounts.length\">\n                                <div class=\"promotions-label\" vdrDropdownTrigger>\n                                    <button class=\"icon-button\"><clr-icon shape=\"info\"></clr-icon></button>\n                                </div>\n                                <vdr-dropdown-menu>\n                                    <div class=\"line-promotion\" *ngFor=\"let discount of discounts\">\n                                        {{ discount.description }}\n                                        <div class=\"promotion-amount\">\n                                            {{\n                                                discount.amount / 100 / line.quantity\n                                                    | number: '1.0-2'\n                                                    | currency: order.currencyCode\n                                            }}\n                                        </div>\n                                    </div>\n                                </vdr-dropdown-menu>\n                            </vdr-dropdown>\n                        </ng-container>\n                    </div>\n                </td>\n                <td class=\"align-middle quantity-col\">\n                    <input\n                        *ngIf=\"lineCanBeRefundedOrCancelled(line)\"\n                        [(ngModel)]=\"lineQuantities[line.id].quantity\"\n                        type=\"number\"\n                        [max]=\"line.quantity\"\n                        min=\"0\"\n                        (input)=\"handleZeroQuantity(lineQuantities[line.id])\"\n                    />\n                </td>\n                <td class=\"align-middle\">\n                    <div class=\"cancel-checkbox-wrapper\">\n                        <input\n                            type=\"checkbox\"\n                            *ngIf=\"lineCanBeRefundedOrCancelled(line)\"\n                            clrCheckbox\n                            [disabled]=\"0 === lineQuantities[line.id].quantity\"\n                            [(ngModel)]=\"lineQuantities[line.id].refund\"\n                        />\n                    </div>\n                </td>\n                <td class=\"align-middle\">\n                    <div class=\"cancel-checkbox-wrapper\">\n                        <input\n                            type=\"checkbox\"\n                            *ngIf=\"lineCanBeRefundedOrCancelled(line)\"\n                            clrCheckbox\n                            [disabled]=\"0 === lineQuantities[line.id].quantity\"\n                            [(ngModel)]=\"lineQuantities[line.id].cancel\"\n                        />\n                    </div>\n                </td>\n            </tr>\n        </table>\n    </div>\n    <div class=\"refund-details mt4\" [class.faded]=\"!isRefunding() && !isCancelling()\">\n        <div>\n            <label class=\"clr-control-label\">{{ 'order.refund-cancellation-reason' | translate }}</label>\n            <ng-select\n                [disabled]=\"!isRefunding() && !isCancelling()\"\n                [items]=\"reasons\"\n                bindLabel=\"name\"\n                autofocus\n                [placeholder]=\"'order.refund-cancellation-reason-required' | translate\"\n                bindValue=\"id\"\n                [addTag]=\"true\"\n                [(ngModel)]=\"reason\"\n            ></ng-select>\n        </div>\n\n        <div>\n            <clr-select-container>\n                <label>{{ 'order.payment-to-refund' | translate }}</label>\n                <select clrSelect name=\"options\" [(ngModel)]=\"selectedPayment\" [disabled]=\"!isRefunding()\">\n                    <option\n                        *ngFor=\"let payment of settledPayments\"\n                        [ngValue]=\"payment\"\n                        [disabled]=\"payment.state !== 'Settled'\"\n                    >\n                        #{{ payment.id }} {{ payment.method }}:\n                        {{ payment.amount | localeCurrency: order.currencyCode }}\n                    </option>\n                </select>\n            </clr-select-container>\n\n            <clr-checkbox-wrapper>\n                <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"refundShipping\" [disabled]=\"!isRefunding()\" />\n                <label>\n                    {{ 'order.refund-shipping' | translate }} ({{\n                        order.shippingWithTax | localeCurrency: order.currencyCode\n                    }})\n                </label>\n            </clr-checkbox-wrapper>\n            <clr-input-container>\n                <label>{{ 'order.refund-adjustment' | translate }}</label>\n                <vdr-currency-input\n                    clrInput\n                    [disabled]=\"!isRefunding()\"\n                    [currencyCode]=\"order.currencyCode\"\n                    [(ngModel)]=\"adjustment\"\n                ></vdr-currency-input>\n            </clr-input-container>\n            <div class=\"totals\" [class.disabled]=\"!isRefunding()\">\n                <div class=\"order-total\">\n                    {{ 'order.payment-amount' | translate }}:\n                    {{ selectedPayment.amount | localeCurrency: order.currencyCode }}\n                </div>\n                <div class=\"refund-total\">\n                    {{ 'order.refund-total' | translate }}:\n                    {{ refundTotal | localeCurrency: order.currencyCode }}\n                </div>\n                <div class=\"refund-total-error\" *ngIf=\"refundTotal < 0 || settledPaymentsTotal < refundTotal\">\n                    {{\n                        'order.refund-total-error'\n                            | translate\n                                : {\n                                      min: 0 | currency: order.currencyCode,\n                                      max: settledPaymentsTotal | localeCurrency: order.currencyCode\n                                  }\n                    }}\n                </div>\n                <div class=\"refund-total-warning\" *ngIf=\"selectedPayment.amount < refundTotal\">\n                    {{ 'order.refund-total-warning' | translate }}\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" [disabled]=\"!canSubmit()\" class=\"btn btn-primary\">\n        <ng-container *ngIf=\"isRefunding(); else cancelling\">\n            {{\n                'order.refund-with-amount'\n                    | translate: { amount: refundTotal | localeCurrency: order.currencyCode }\n            }}\n        </ng-container>\n        <ng-template #cancelling>\n            {{ 'order.cancel-selected-items' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;min-height:64vh}.refund-wrapper{flex:1;flex-direction:column}.refund-wrapper .order-table{flex:1;overflow-y:auto}.refund-wrapper .order-table table{margin-top:0}.refund-wrapper tr.ignore{color:var(--color-grey-300)}.quantity-col{background-color:var(--color-warning-100)}.cancel-checkbox-wrapper{display:flex;align-items:center;justify-content:center}clr-checkbox-wrapper{margin-top:12px;margin-bottom:12px;display:block}.refund-details{display:flex;justify-content:space-between}.refund-details.faded{opacity:.5}.totals{margin-top:48px}.totals .refund-total{font-size:18px}.totals .refund-total-error{color:var(--color-error-500)}.totals .refund-total-warning{color:var(--color-warning-600);max-width:250px}.totals.disabled{color:var(--color-grey-300)}.prorated-wrapper{display:flex;justify-content:center}.line-promotion{display:flex;justify-content:space-between;font-size:12px;padding:3px 6px}.line-promotion .promotion-amount{margin-left:12px}\n"]
            },] }
];
RefundOrderDialogComponent.ctorParameters = () => [
    { type: I18nService }
];

class SettleRefundDialogComponent {
    constructor() {
        this.transactionId = '';
    }
    submit() {
        this.resolveWith(this.transactionId);
    }
    cancel() {
        this.resolveWith();
    }
}
SettleRefundDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-settle-refund-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.settle-refund' | translate }}</ng-template>\n<p class=\"instruction\">\n    {{ 'order.settle-refund-manual-instructions' | translate: { method: refund.method } }}\n</p>\n<clr-input-container>\n    <label>{{ 'order.transaction-id' | translate }}</label>\n    <input clrInput name=\"transactionId\" [(ngModel)]=\"transactionId\" />\n</clr-input-container>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" [disabled]=\"!transactionId\" class=\"btn btn-primary\">\n        {{ 'order.settle-refund' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{padding-bottom:32px}.instruction{margin-top:0;margin-bottom:24px}\n"]
            },] }
];

class OrderDetailComponent extends BaseDetailComponent {
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
                    this.notificationService.success(marker('order.transitioned-to-state-success'), { state });
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
            message: marker('order.manually-transition-to-state-message'),
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
            this.notificationService.success(marker('common.notify-update-success'), { entity: 'Order' });
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
                        this.notificationService.success(marker('order.settle-payment-success'));
                    }
                    else {
                        this.notificationService.error(marker('order.settle-payment-error'));
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
                        this.notificationService.success(marker('order.transitioned-payment-to-state-success'), {
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
                        this.notificationService.success(marker('order.transitioned-payment-to-state-success'), {
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
                    this.notificationService.success(marker('order.add-payment-to-order-success'));
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
                        this.notificationService.success(marker('order.create-fulfillment-success'));
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
            this.notificationService.success(marker('order.successfully-updated-fulfillment'));
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
                this.notificationService.success(marker('order.settle-refund-success'));
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
            this.notificationService.success(marker('common.notify-create-success'), {
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
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Note',
            });
        });
    }
    deleteNote(entry) {
        return this.modalService
            .dialog({
            title: marker('common.confirm-delete-note'),
            body: entry.data.note,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.order.deleteOrderNote(entry.id) : EMPTY)))
            .subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(marker('common.notify-delete-success'), {
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
                this.notificationService.success(marker('order.cancelled-order-success'));
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
                            this.notificationService.success(marker('order.cancelled-order-success'));
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
                            this.notificationService.error(marker('order.refund-order-failed'));
                        }
                        else {
                            this.notificationService.success(marker('order.refund-order-success'));
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

var OrderEditResultType;
(function (OrderEditResultType) {
    OrderEditResultType[OrderEditResultType["Refund"] = 0] = "Refund";
    OrderEditResultType[OrderEditResultType["Payment"] = 1] = "Payment";
    OrderEditResultType[OrderEditResultType["PriceUnchanged"] = 2] = "PriceUnchanged";
    OrderEditResultType[OrderEditResultType["Cancel"] = 3] = "Cancel";
})(OrderEditResultType || (OrderEditResultType = {}));
class OrderEditsPreviewDialogComponent {
    get priceDifference() {
        return this.order.totalWithTax - this.originalTotalWithTax;
    }
    ngOnInit() {
        this.refundNote = this.modifyOrderInput.note || '';
    }
    cancel() {
        this.resolveWith({
            result: OrderEditResultType.Cancel,
        });
    }
    submit() {
        if (0 < this.priceDifference) {
            this.resolveWith({
                result: OrderEditResultType.Payment,
            });
        }
        else if (this.priceDifference < 0) {
            this.resolveWith({
                result: OrderEditResultType.Refund,
                // tslint:disable-next-line:no-non-null-assertion
                refundPaymentId: this.selectedPayment.id,
                refundNote: this.refundNote,
            });
        }
        else {
            this.resolveWith({
                result: OrderEditResultType.PriceUnchanged,
            });
        }
    }
}
OrderEditsPreviewDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-edits-preview-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.confirm-modifications' | translate }}</ng-template>\n<vdr-order-table [order]=\"order\" [orderLineCustomFields]=\"orderLineCustomFields\"></vdr-order-table>\n\n<h4 class=\"h4\">\n    {{ 'order.modify-order-price-difference' | translate }}:\n    <strong>{{ priceDifference | localeCurrency: order.currencyCode }}</strong>\n</h4>\n<div *ngIf=\"priceDifference < 0\">\n<clr-select-container>\n    <label>{{ 'order.payment-to-refund' | translate }}</label>\n    <select clrSelect name=\"options\" [(ngModel)]=\"selectedPayment\">\n        <option\n            *ngFor=\"let payment of order.payments\"\n            [ngValue]=\"payment\"\n        >\n            #{{ payment.id }} {{ payment.method }}:\n            {{ payment.amount | localeCurrency: order.currencyCode }}\n        </option>\n    </select>\n</clr-select-container>\n    <label class=\"clr-control-label\">{{ 'order.refund-cancellation-reason' | translate }}</label>\n    <textarea [(ngModel)]=\"refundNote\" name=\"refundNote\" clrTextarea required></textarea>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"submit()\" [disabled]=\"priceDifference < 0 && !selectedPayment\" class=\"btn btn-primary\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

class OrderEditorComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, notificationService, modalService, orderTransitionService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.orderTransitionService = orderTransitionService;
        this.detailForm = new FormGroup({});
        this.couponCodesControl = new FormControl();
        this.modifyOrderInput = {
            dryRun: true,
            orderId: '',
            addItems: [],
            adjustOrderLines: [],
            surcharges: [],
            note: '',
            updateShippingAddress: {},
            updateBillingAddress: {},
        };
        this.note = '';
        this.recalculateShipping = true;
        this.addedVariants = new Map();
    }
    get addedLines() {
        const getSinglePriceValue = (price) => price.__typename === 'SinglePrice' ? price.value : 0;
        return (this.modifyOrderInput.addItems || [])
            .map(row => {
            const variantInfo = this.addedVariants.get(row.productVariantId);
            if (variantInfo) {
                return Object.assign(Object.assign({}, variantInfo), { price: getSinglePriceValue(variantInfo.price), priceWithTax: getSinglePriceValue(variantInfo.priceWithTax), quantity: row.quantity });
            }
        })
            .filter(notNullOrUndefined);
    }
    ngOnInit() {
        this.init();
        this.dataService.promotion.getPromotions();
        this.addressCustomFields = this.getCustomFieldConfig('Address');
        this.modifyOrderInput.orderId = this.route.snapshot.paramMap.get('id');
        this.orderLineCustomFields = this.getCustomFieldConfig('OrderLine');
        this.entity$.pipe(takeUntil(this.destroy$)).subscribe(order => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            if (order.couponCodes.length) {
                this.couponCodesControl.setValue(order.couponCodes);
            }
            this.surchargeForm = new FormGroup({
                description: new FormControl('', Validators.required),
                sku: new FormControl(''),
                price: new FormControl(0, Validators.required),
                priceIncludesTax: new FormControl(true),
                taxRate: new FormControl(0),
                taxDescription: new FormControl(''),
            });
            if (!this.shippingAddressForm) {
                this.shippingAddressForm = new FormGroup({
                    fullName: new FormControl((_a = order.shippingAddress) === null || _a === void 0 ? void 0 : _a.fullName),
                    company: new FormControl((_b = order.shippingAddress) === null || _b === void 0 ? void 0 : _b.company),
                    streetLine1: new FormControl((_c = order.shippingAddress) === null || _c === void 0 ? void 0 : _c.streetLine1),
                    streetLine2: new FormControl((_d = order.shippingAddress) === null || _d === void 0 ? void 0 : _d.streetLine2),
                    city: new FormControl((_e = order.shippingAddress) === null || _e === void 0 ? void 0 : _e.city),
                    province: new FormControl((_f = order.shippingAddress) === null || _f === void 0 ? void 0 : _f.province),
                    postalCode: new FormControl((_g = order.shippingAddress) === null || _g === void 0 ? void 0 : _g.postalCode),
                    countryCode: new FormControl((_h = order.shippingAddress) === null || _h === void 0 ? void 0 : _h.countryCode),
                    phoneNumber: new FormControl((_j = order.shippingAddress) === null || _j === void 0 ? void 0 : _j.phoneNumber),
                });
                this.addAddressCustomFieldsFormGroup(this.shippingAddressForm, order.shippingAddress);
            }
            if (!this.billingAddressForm) {
                this.billingAddressForm = new FormGroup({
                    fullName: new FormControl((_k = order.billingAddress) === null || _k === void 0 ? void 0 : _k.fullName),
                    company: new FormControl((_l = order.billingAddress) === null || _l === void 0 ? void 0 : _l.company),
                    streetLine1: new FormControl((_m = order.billingAddress) === null || _m === void 0 ? void 0 : _m.streetLine1),
                    streetLine2: new FormControl((_o = order.billingAddress) === null || _o === void 0 ? void 0 : _o.streetLine2),
                    city: new FormControl((_p = order.billingAddress) === null || _p === void 0 ? void 0 : _p.city),
                    province: new FormControl((_q = order.billingAddress) === null || _q === void 0 ? void 0 : _q.province),
                    postalCode: new FormControl((_r = order.billingAddress) === null || _r === void 0 ? void 0 : _r.postalCode),
                    countryCode: new FormControl((_s = order.billingAddress) === null || _s === void 0 ? void 0 : _s.countryCode),
                    phoneNumber: new FormControl((_t = order.billingAddress) === null || _t === void 0 ? void 0 : _t.phoneNumber),
                });
                this.addAddressCustomFieldsFormGroup(this.billingAddressForm, order.billingAddress);
            }
            this.orderLineCustomFieldsFormArray = new FormArray([]);
            for (const line of order.lines) {
                const formGroup = new FormGroup({});
                for (const { name } of this.orderLineCustomFields) {
                    formGroup.addControl(name, new FormControl(line.customFields[name]));
                }
                formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
                    let modifyRow = this.modifyOrderInput.adjustOrderLines.find(l => l.orderLineId === line.id);
                    if (!modifyRow) {
                        modifyRow = {
                            orderLineId: line.id,
                            quantity: line.quantity,
                        };
                        this.modifyOrderInput.adjustOrderLines.push(modifyRow);
                    }
                    if (this.orderLineCustomFields.length) {
                        modifyRow.customFields = value;
                    }
                });
                this.orderLineCustomFieldsFormArray.push(formGroup);
            }
        });
        this.addItemCustomFieldsFormArray = new FormArray([]);
        this.addItemCustomFieldsForm = new FormGroup({});
        for (const customField of this.orderLineCustomFields) {
            this.addItemCustomFieldsForm.addControl(customField.name, new FormControl());
        }
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(result => result.countries.items)
            .pipe(shareReplay(1));
        this.dataService.order
            .getOrderHistory(this.id, {
            take: 1,
            sort: {
                createdAt: SortOrder.DESC,
            },
            filter: { type: { eq: HistoryEntryType.ORDER_STATE_TRANSITION } },
        })
            .single$.subscribe(({ order }) => {
            this.previousState = order === null || order === void 0 ? void 0 : order.history.items[0].data.from;
        });
    }
    ngOnDestroy() {
        this.destroy();
    }
    transitionToPriorState(order) {
        this.orderTransitionService
            .transitionToPreModifyingState(order.id, order.nextStates)
            .subscribe(result => {
            this.router.navigate(['..'], { relativeTo: this.route });
        });
    }
    canPreviewChanges() {
        const { addItems, adjustOrderLines, surcharges } = this.modifyOrderInput;
        return (!!(addItems === null || addItems === void 0 ? void 0 : addItems.length) ||
            !!(surcharges === null || surcharges === void 0 ? void 0 : surcharges.length) ||
            !!(adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.length) ||
            (this.shippingAddressForm.dirty && this.shippingAddressForm.valid) ||
            (this.billingAddressForm.dirty && this.billingAddressForm.valid) ||
            this.couponCodesControl.dirty);
    }
    isLineModified(line) {
        var _a;
        return !!((_a = this.modifyOrderInput.adjustOrderLines) === null || _a === void 0 ? void 0 : _a.find(l => l.orderLineId === line.id && l.quantity !== line.quantity));
    }
    updateLineQuantity(line, quantity) {
        const { adjustOrderLines } = this.modifyOrderInput;
        let row = adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.find(l => l.orderLineId === line.id);
        if (row && +quantity === line.quantity) {
            // Remove the modification if the quantity is the same as
            // the original order
            adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.splice(adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.indexOf(row), 1);
        }
        if (!row) {
            row = { orderLineId: line.id, quantity: +quantity };
            adjustOrderLines === null || adjustOrderLines === void 0 ? void 0 : adjustOrderLines.push(row);
        }
        row.quantity = +quantity;
    }
    updateAddedItemQuantity(item, quantity) {
        var _a;
        const row = (_a = this.modifyOrderInput.addItems) === null || _a === void 0 ? void 0 : _a.find(l => l.productVariantId === item.productVariantId);
        if (row) {
            row.quantity = +quantity;
        }
    }
    trackByProductVariantId(index, item) {
        return item.productVariantId;
    }
    getSelectedItemPrice(result) {
        switch (result === null || result === void 0 ? void 0 : result.priceWithTax.__typename) {
            case 'SinglePrice':
                return result.priceWithTax.value;
            default:
                return 0;
        }
    }
    addItemToOrder(result) {
        var _a, _b;
        if (!result) {
            return;
        }
        const customFields = this.orderLineCustomFields.length
            ? this.addItemCustomFieldsForm.value
            : undefined;
        let row = (_a = this.modifyOrderInput.addItems) === null || _a === void 0 ? void 0 : _a.find(l => this.isMatchingAddItemRow(l, result, customFields));
        if (!row) {
            row = { productVariantId: result.productVariantId, quantity: 1 };
            if (customFields) {
                row.customFields = customFields;
            }
            (_b = this.modifyOrderInput.addItems) === null || _b === void 0 ? void 0 : _b.push(row);
        }
        else {
            row.quantity++;
        }
        if (customFields) {
            const formGroup = new FormGroup({});
            for (const [key, value] of Object.entries(customFields)) {
                formGroup.addControl(key, new FormControl(value));
            }
            this.addItemCustomFieldsFormArray.push(formGroup);
            formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
                if (row) {
                    row.customFields = value;
                }
            });
        }
        this.addItemCustomFieldsForm.reset({});
        this.addItemSelectedVariant = undefined;
        this.addedVariants.set(result.productVariantId, result);
    }
    isMatchingAddItemRow(row, result, customFields) {
        return (row.productVariantId === result.productVariantId &&
            JSON.stringify(row.customFields) === JSON.stringify(customFields));
    }
    removeAddedItem(index) {
        this.modifyOrderInput.addItems.splice(index, 1);
        if (-1 < index) {
            this.addItemCustomFieldsFormArray.removeAt(index);
        }
    }
    getSurchargePrices(surcharge) {
        const priceWithTax = surcharge.priceIncludesTax
            ? surcharge.price
            : Math.round(surcharge.price * ((100 + (surcharge.taxRate || 0)) / 100));
        const price = surcharge.priceIncludesTax
            ? Math.round(surcharge.price / ((100 + (surcharge.taxRate || 0)) / 100))
            : surcharge.price;
        return {
            price,
            priceWithTax,
        };
    }
    addSurcharge(value) {
        var _a;
        (_a = this.modifyOrderInput.surcharges) === null || _a === void 0 ? void 0 : _a.push(value);
        this.surchargeForm.reset({
            price: 0,
            priceIncludesTax: true,
            taxRate: 0,
        });
    }
    removeSurcharge(index) {
        var _a;
        (_a = this.modifyOrderInput.surcharges) === null || _a === void 0 ? void 0 : _a.splice(index, 1);
    }
    previewAndModify(order) {
        var _a;
        const modifyOrderInput = Object.assign(Object.assign({}, this.modifyOrderInput), { adjustOrderLines: this.modifyOrderInput.adjustOrderLines.map(line => {
                return transformRelationCustomFieldInputs(simpleDeepClone(line), this.orderLineCustomFields);
            }) });
        const input = Object.assign(Object.assign(Object.assign(Object.assign({}, modifyOrderInput), (this.billingAddressForm.dirty ? { updateBillingAddress: this.billingAddressForm.value } : {})), (this.shippingAddressForm.dirty
            ? { updateShippingAddress: this.shippingAddressForm.value }
            : {})), { dryRun: true, couponCodes: this.couponCodesControl.dirty ? this.couponCodesControl.value : undefined, note: (_a = this.note) !== null && _a !== void 0 ? _a : '', options: {
                recalculateShipping: this.recalculateShipping,
            } });
        const originalTotalWithTax = order.totalWithTax;
        this.dataService.order
            .modifyOrder(input)
            .pipe(switchMap(({ modifyOrder }) => {
            switch (modifyOrder.__typename) {
                case 'Order':
                    return this.modalService.fromComponent(OrderEditsPreviewDialogComponent, {
                        size: 'xl',
                        closable: false,
                        locals: {
                            originalTotalWithTax,
                            order: modifyOrder,
                            orderLineCustomFields: this.orderLineCustomFields,
                            modifyOrderInput: input,
                        },
                    });
                case 'InsufficientStockError':
                case 'NegativeQuantityError':
                case 'NoChangesSpecifiedError':
                case 'OrderLimitError':
                case 'OrderModificationStateError':
                case 'PaymentMethodMissingError':
                case 'RefundPaymentIdMissingError':
                case 'CouponCodeLimitError':
                case 'CouponCodeExpiredError':
                case 'CouponCodeInvalidError': {
                    this.notificationService.error(modifyOrder.message);
                    return of(false);
                }
                case null:
                case undefined:
                    return of(false);
                default:
                    assertNever(modifyOrder);
            }
        }), switchMap(result => {
            if (!result || result.result === OrderEditResultType.Cancel) {
                // re-fetch so that the preview values get overwritten in the cache.
                return this.dataService.order.getOrder(this.id).mapSingle(() => false);
            }
            else {
                // Do the modification
                const wetRunInput = Object.assign(Object.assign({}, input), { dryRun: false });
                if (result.result === OrderEditResultType.Refund) {
                    wetRunInput.refund = {
                        paymentId: result.refundPaymentId,
                        reason: result.refundNote,
                    };
                }
                return this.dataService.order.modifyOrder(wetRunInput).pipe(switchMap(({ modifyOrder }) => {
                    if (modifyOrder.__typename === 'Order') {
                        const priceDelta = modifyOrder.totalWithTax - originalTotalWithTax;
                        const nextState = 0 < priceDelta ? 'ArrangingAdditionalPayment' : this.previousState;
                        return this.dataService.order
                            .transitionToState(order.id, nextState)
                            .pipe(mapTo(true));
                    }
                    else {
                        this.notificationService.error(modifyOrder.message);
                        return EMPTY;
                    }
                }));
            }
        }))
            .subscribe(result => {
            if (result) {
                this.router.navigate(['../'], { relativeTo: this.route });
            }
        });
    }
    addAddressCustomFieldsFormGroup(parentFormGroup, address) {
        var _a;
        if (address && this.addressCustomFields.length) {
            const addressCustomFieldsFormGroup = new FormGroup({});
            for (const customFieldDef of this.addressCustomFields) {
                const name = customFieldDef.name;
                const value = (_a = address.customFields) === null || _a === void 0 ? void 0 : _a[name];
                addressCustomFieldsFormGroup.addControl(name, new FormControl(value));
            }
            parentFormGroup.addControl('customFields', addressCustomFieldsFormGroup);
        }
    }
    setFormValues(entity, languageCode) {
        /* not used */
    }
}
OrderEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-editor',
                template: "<vdr-action-bar *ngIf=\"entity$ | async as order\">\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <button class=\"btn btn-secondary\" (click)=\"transitionToPriorState(order)\">\n            {{ 'order.cancel-modification' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngIf=\"entity$ | async as order\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-lg-8\">\n            <table class=\"order-table table\">\n                <thead>\n                    <tr>\n                        <th></th>\n                        <th>{{ 'order.product-name' | translate }}</th>\n                        <th>{{ 'order.product-sku' | translate }}</th>\n                        <th>{{ 'order.unit-price' | translate }}</th>\n                        <th>{{ 'order.quantity' | translate }}</th>\n                        <th *ngIf=\"orderLineCustomFields.length\">{{ 'common.custom-fields' | translate }}</th>\n                        <th>{{ 'order.total' | translate }}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr\n                        *ngFor=\"let line of order.lines; let i = index\"\n                        class=\"order-line\"\n                        [class.is-cancelled]=\"line.quantity === 0\"\n                        [class.modified]=\"isLineModified(line)\"\n                    >\n                        <td class=\"align-middle thumb\">\n                            <img\n                                *ngIf=\"line.featuredAsset\"\n                                [src]=\"line.featuredAsset | assetPreview: 'tiny'\"\n                            />\n                        </td>\n                        <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                        <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                        <td class=\"align-middle unit-price\">\n                            {{ line.unitPriceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ line.unitPrice | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                        <td class=\"align-middle quantity\">\n                            <input\n                                type=\"number\"\n                                min=\"0\"\n                                [value]=\"line.quantity\"\n                                (input)=\"updateLineQuantity(line, $event.target.value)\"\n                            />\n                            <vdr-line-refunds [line]=\"line\" [payments]=\"order.payments\"></vdr-line-refunds>\n                            <vdr-line-fulfillment\n                                [line]=\"line\"\n                                [orderState]=\"order.state\"\n                            ></vdr-line-fulfillment>\n                        </td>\n                        <td *ngIf=\"orderLineCustomFields.length\" class=\"order-line-custom-field align-middle\">\n                            <vdr-tabbed-custom-fields\n                                entityName=\"OrderLine\"\n                                [customFields]=\"orderLineCustomFields\"\n                                [customFieldsFormGroup]=\"orderLineCustomFieldsFormArray.get([i])\"\n                                [compact]=\"true\"\n                            ></vdr-tabbed-custom-fields>\n                        </td>\n                        <td class=\"align-middle total\">\n                            {{ line.linePriceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ line.linePrice | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr\n                        *ngFor=\"let addedLine of addedLines; trackBy: trackByProductVariantId; let i = index\"\n                        class=\"modified\"\n                    >\n                        <td class=\"align-middle thumb\">\n                            <img\n                                *ngIf=\"addedLine.productAsset\"\n                                [src]=\"addedLine.productAsset | assetPreview: 'tiny'\"\n                            />\n                        </td>\n                        <td class=\"align-middle name\">{{ addedLine.productVariantName }}</td>\n                        <td class=\"align-middle sku\">{{ addedLine.sku }}</td>\n                        <td class=\"align-middle unit-price\">\n                            {{ addedLine.priceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ addedLine.price | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                        <td class=\"align-middle quantity\">\n                            <input\n                                type=\"number\"\n                                min=\"0\"\n                                [value]=\"addedLine.quantity\"\n                                (input)=\"updateAddedItemQuantity(addedLine, $event.target.value)\"\n                            />\n                            <button class=\"icon-button\" (click)=\"removeAddedItem(i)\">\n                                <clr-icon shape=\"trash\"></clr-icon>\n                            </button>\n                        </td>\n                        <td *ngIf=\"orderLineCustomFields.length\" class=\"order-line-custom-field align-middle\">\n                            <ng-container *ngFor=\"let customField of orderLineCustomFields\">\n                                <vdr-custom-field-control\n                                    [customField]=\"customField\"\n                                    [customFieldsFormGroup]=\"addItemCustomFieldsFormArray.get([i])\"\n                                    entityName=\"OrderLine\"\n                                    [compact]=\"true\"\n                                ></vdr-custom-field-control>\n                            </ng-container>\n                        </td>\n                        <td class=\"align-middle total\">\n                            {{\n                                (addedLine.priceWithTax * addedLine.quantity) / 100\n                                    | currency: order.currencyCode\n                            }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{\n                                    (addedLine.price * addedLine.quantity) / 100\n                                        | currency: order.currencyCode\n                                }}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr class=\"surcharge\" *ngFor=\"let surcharge of order.surcharges\">\n                        <td class=\"align-middle name left\" colspan=\"2\">{{ surcharge.description }}</td>\n                        <td class=\"align-middle sku\">{{ surcharge.sku }}</td>\n                        <td class=\"align-middle\"></td>\n                        <td></td>\n                        <td *ngIf=\"orderLineCustomFields.length\"></td>\n                        <td class=\"align-middle total\">\n                            {{ surcharge.priceWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ surcharge.price | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr\n                        class=\"surcharge modified\"\n                        *ngFor=\"let surcharge of modifyOrderInput.surcharges; let i = index\"\n                    >\n                        <td class=\"align-middle name left\" colspan=\"2\">\n                            {{ surcharge.description }}\n                            <button class=\"icon-button\" (click)=\"removeSurcharge(i)\">\n                                <clr-icon shape=\"trash\"></clr-icon>\n                            </button>\n                        </td>\n                        <td class=\"align-middle sku\">{{ surcharge.sku }}</td>\n                        <td class=\"align-middle\"></td>\n                        <td></td>\n                        <td *ngIf=\"orderLineCustomFields.length\"></td>\n                        <td class=\"align-middle total\">\n                            <ng-container *ngIf=\"getSurchargePrices(surcharge) as surchargePrice\">\n                                {{ surchargePrice.priceWithTax | localeCurrency: order.currencyCode }}\n                                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                    {{ surchargePrice.price | localeCurrency: order.currencyCode }}\n                                </div>\n                            </ng-container>\n                        </td>\n                    </tr>\n                    <tr class=\"shipping\">\n                        <td class=\"left clr-align-middle\">{{ 'order.shipping' | translate }}</td>\n                        <td class=\"clr-align-middle\">{{ order.shippingLines[0]?.shippingMethod?.name }}</td>\n                        <td colspan=\"3\"></td>\n                        <td *ngIf=\"orderLineCustomFields.length\"></td>\n                        <td class=\"clr-align-middle\">\n                            {{ order.shippingWithTax | localeCurrency: order.currencyCode }}\n                            <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                {{ order.shipping | localeCurrency: order.currencyCode }}\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n\n            <h4 class=\"mb2\">{{ 'order.modifications' | translate }}</h4>\n            <clr-accordion>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.add-item-to-order' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-product-selector class=\"mb4\" (productSelected)=\"addItemSelectedVariant = $event\">\n                        </vdr-product-selector>\n                        <div *ngIf=\"addItemSelectedVariant\" class=\"flex mb4\">\n                            <img\n                                *ngIf=\"addItemSelectedVariant.productAsset as asset\"\n                                [src]=\"asset | assetPreview: 'tiny'\"\n                                class=\"mr4\"\n                            />\n                            <div>\n                                <strong class=\"mr4\">{{ addItemSelectedVariant.productVariantName }}</strong>\n                                <small>{{ addItemSelectedVariant.sku }}</small>\n                                <div>\n                                    {{\n                                        getSelectedItemPrice(addItemSelectedVariant)\n                                            | localeCurrency: order.currencyCode\n                                    }}\n                                </div>\n                            </div>\n                        </div>\n                        <ng-container *ngFor=\"let customField of orderLineCustomFields\">\n                            <vdr-custom-field-control\n                                [readonly]=\"!addItemSelectedVariant\"\n                                [customField]=\"customField\"\n                                [customFieldsFormGroup]=\"addItemCustomFieldsForm\"\n                                entityName=\"OrderLine\"\n                                [compact]=\"true\"\n                            ></vdr-custom-field-control>\n                        </ng-container>\n                        <button\n                            class=\"btn btn-secondary\"\n                            [disabled]=\"!addItemSelectedVariant || addItemCustomFieldsForm.invalid\"\n                            (click)=\"addItemToOrder(addItemSelectedVariant)\"\n                        >\n                            {{ 'order.add-item-to-order' | translate }}\n                        </button>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.set-coupon-codes' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-coupon-code-selector\n                            [control]=\"couponCodesControl\"\n                        ></vdr-coupon-code-selector>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.add-surcharge' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <form [formGroup]=\"surchargeForm\" (submit)=\"addSurcharge(surchargeForm.value)\">\n                            <vdr-form-field [label]=\"'common.description' | translate\" for=\"description\"\n                                ><input id=\"description\" type=\"text\" formControlName=\"description\"\n                            /></vdr-form-field>\n                            <vdr-form-field [label]=\"'order.product-sku' | translate\" for=\"sku\"\n                                ><input id=\"sku\" type=\"text\" formControlName=\"sku\"\n                            /></vdr-form-field>\n                            <vdr-form-field [label]=\"'common.price' | translate\" for=\"price\">\n                                <vdr-currency-input\n                                    [currencyCode]=\"order.currencyCode\"\n                                    id=\"price\"\n                                    formControlName=\"price\"\n                                ></vdr-currency-input>\n                            </vdr-form-field>\n                            <vdr-form-field\n                                [label]=\"\n                                    'catalog.price-includes-tax-at'\n                                        | translate: { rate: surchargeForm.get('taxRate')?.value }\n                                \"\n                                for=\"priceIncludesTax\"\n                                ><input\n                                    id=\"priceIncludesTax\"\n                                    type=\"checkbox\"\n                                    clrCheckbox\n                                    formControlName=\"priceIncludesTax\"\n                            /></vdr-form-field>\n                            <vdr-form-field [label]=\"'order.tax-rate' | translate\" for=\"taxRate\">\n                                <vdr-affixed-input suffix=\"%\"\n                                    ><input\n                                        id=\"taxRate\"\n                                        type=\"number\"\n                                        min=\"0\"\n                                        max=\"100\"\n                                        formControlName=\"taxRate\"\n                                /></vdr-affixed-input>\n                            </vdr-form-field>\n                            <vdr-form-field [label]=\"'order.tax-description' | translate\" for=\"taxDescription\"\n                                ><input id=\"taxDescription\" type=\"text\" formControlName=\"taxDescription\"\n                            /></vdr-form-field>\n                            <button\n                                class=\"btn btn-secondary\"\n                                [disabled]=\"\n                                    surchargeForm.invalid ||\n                                    surchargeForm.pristine ||\n                                    surchargeForm.get('price')?.value === 0\n                                \"\n                            >\n                                {{ 'order.add-surcharge' | translate }}\n                            </button>\n                        </form>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.edit-shipping-address' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-address-form\n                            [formGroup]=\"shippingAddressForm\"\n                            [availableCountries]=\"availableCountries$ | async\"\n                            [customFields]=\"addressCustomFields\"\n                        ></vdr-address-form>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n                <clr-accordion-panel>\n                    <clr-accordion-title>{{ 'order.edit-billing-address' | translate }}</clr-accordion-title>\n                    <clr-accordion-content *clrIfExpanded>\n                        <vdr-address-form\n                            [formGroup]=\"billingAddressForm\"\n                            [availableCountries]=\"availableCountries$ | async\"\n                            [customFields]=\"addressCustomFields\"\n                        ></vdr-address-form>\n                    </clr-accordion-content>\n                </clr-accordion-panel>\n            </clr-accordion>\n        </div>\n        <div class=\"clr-col-lg-4 order-cards\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    {{ 'order.modification-summary' | translate }}\n                </div>\n                <div class=\"card-block\">\n                    <ul>\n                        <li *ngIf=\"modifyOrderInput.addItems?.length\">\n                            {{\n                                'order.modification-adding-items'\n                                    | translate: { count: modifyOrderInput.addItems?.length }\n                            }}\n                        </li>\n                        <li *ngIf=\"modifyOrderInput.adjustOrderLines?.length\">\n                            {{\n                                'order.modification-adjusting-lines'\n                                    | translate: { count: modifyOrderInput.adjustOrderLines?.length }\n                            }}\n                        </li>\n                        <li *ngIf=\"modifyOrderInput.surcharges?.length\">\n                            {{\n                                'order.modification-adding-surcharges'\n                                    | translate: { count: modifyOrderInput.surcharges?.length }\n                            }}\n                        </li>\n                        <li *ngIf=\"shippingAddressForm.dirty\">\n                            {{ 'order.modification-updating-shipping-address' | translate }}\n                        </li>\n                        <li *ngIf=\"billingAddressForm.dirty\">\n                            {{ 'order.modification-updating-billing-address' | translate }}\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"card-block\">\n                    <label class=\"clr-control-label\">{{ 'order.note' | translate }}</label>\n                    <textarea [(ngModel)]=\"note\" name=\"note\" clrTextarea required></textarea>\n                    <clr-checkbox-wrapper class=\"\">\n                        <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"recalculateShipping\" />\n                        <label>{{ 'order.modification-recalculate-shipping' | translate }}</label>\n                    </clr-checkbox-wrapper>\n                </div>\n                <div class=\"card-footer\">\n                    <button\n                        class=\"btn btn-primary\"\n                        [disabled]=\"!canPreviewChanges()\"\n                        (click)=\"previewAndModify(order)\"\n                    >\n                        {{ 'order.preview-changes' | translate }}\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".order-table .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}.order-table .sub-total td{border-top:1px dashed var(--color-component-border-200)}.order-table .total td{font-weight:bold;border-top:1px dashed var(--color-component-border-200)}.order-table td.custom-fields-row{border-top-style:dashed;border-top-color:var(--color-grey-200)}.order-table img{border-radius:var(--border-radius-img)}.order-table .order-line-custom-fields{display:flex;flex-wrap:wrap}.order-table .order-line-custom-fields .custom-field{text-align:start;max-width:200px;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px;margin-right:18px}.order-table .draft-qty{max-width:48px}.order-table .order-line-custom-field{background-color:var(--color-component-bg-100)}.order-table .order-line-custom-field .custom-field-ellipsis{color:var(--color-text-300)}.order-table .net-price{font-size:11px;color:var(--color-text-300)}.order-table .promotions-label{-webkit-text-decoration:underline dotted var(--color-text-200);text-decoration:underline dotted var(--color-text-200);font-size:11px;margin-top:6px;cursor:pointer;text-transform:lowercase}.order-table .thumb img{width:50px;height:50px}.order-table tr.modified td{background-color:var(--color-warning-100)}.order-table .order-line-custom-field{text-align:start}\n"]
            },] }
];
OrderEditorComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: OrderTransitionService }
];

class OrderHistoryComponent {
    constructor() {
        this.addNote = new EventEmitter();
        this.updateNote = new EventEmitter();
        this.deleteNote = new EventEmitter();
        this.note = '';
        this.noteIsPrivate = true;
        this.expanded = false;
        this.type = HistoryEntryType;
    }
    getDisplayType(entry) {
        if (entry.type === HistoryEntryType.ORDER_STATE_TRANSITION) {
            if (entry.data.to === 'Delivered') {
                return 'success';
            }
            if (entry.data.to === 'Cancelled') {
                return 'error';
            }
        }
        if (entry.type === HistoryEntryType.ORDER_FULFILLMENT_TRANSITION) {
            if (entry.data.to === 'Delivered') {
                return 'success';
            }
        }
        if (entry.type === HistoryEntryType.ORDER_PAYMENT_TRANSITION) {
            if (entry.data.to === 'Declined' || entry.data.to === 'Cancelled') {
                return 'error';
            }
        }
        if (entry.type === HistoryEntryType.ORDER_CANCELLATION) {
            return 'error';
        }
        if (entry.type === HistoryEntryType.ORDER_REFUND_TRANSITION) {
            return 'warning';
        }
        return 'default';
    }
    getTimelineIcon(entry) {
        if (entry.type === HistoryEntryType.ORDER_STATE_TRANSITION) {
            if (entry.data.to === 'Delivered') {
                return ['success-standard', 'is-solid'];
            }
            if (entry.data.to === 'Cancelled') {
                return 'ban';
            }
        }
        if (entry.type === HistoryEntryType.ORDER_PAYMENT_TRANSITION) {
            if (entry.data.to === 'Settled') {
                return 'credit-card';
            }
        }
        if (entry.type === HistoryEntryType.ORDER_NOTE) {
            return 'note';
        }
        if (entry.type === HistoryEntryType.ORDER_MODIFIED) {
            return 'pencil';
        }
        if (entry.type === HistoryEntryType.ORDER_FULFILLMENT_TRANSITION) {
            if (entry.data.to === 'Shipped') {
                return 'truck';
            }
            if (entry.data.to === 'Delivered') {
                return 'truck';
            }
        }
    }
    isFeatured(entry) {
        switch (entry.type) {
            case HistoryEntryType.ORDER_STATE_TRANSITION: {
                return (entry.data.to === 'Delivered' ||
                    entry.data.to === 'Cancelled' ||
                    entry.data.to === 'Settled');
            }
            case HistoryEntryType.ORDER_PAYMENT_TRANSITION:
                return entry.data.to === 'Settled' || entry.data.to === 'Cancelled';
            case HistoryEntryType.ORDER_FULFILLMENT_TRANSITION:
                return entry.data.to === 'Delivered' || entry.data.to === 'Shipped';
            case HistoryEntryType.ORDER_NOTE:
            case HistoryEntryType.ORDER_MODIFIED:
                return true;
            default:
                return false;
        }
    }
    getFulfillment(entry) {
        if ((entry.type === HistoryEntryType.ORDER_FULFILLMENT ||
            entry.type === HistoryEntryType.ORDER_FULFILLMENT_TRANSITION) &&
            this.order.fulfillments) {
            return this.order.fulfillments.find(f => f.id === entry.data.fulfillmentId);
        }
    }
    getPayment(entry) {
        if (entry.type === HistoryEntryType.ORDER_PAYMENT_TRANSITION && this.order.payments) {
            return this.order.payments.find(p => p.id === entry.data.paymentId);
        }
    }
    getCancelledItems(entry) {
        const itemMap = new Map();
        const cancelledItemIds = entry.data.orderItemIds;
        for (const line of this.order.lines) {
            for (const item of line.items) {
                if (cancelledItemIds.includes(item.id)) {
                    const count = itemMap.get(line.productVariant.name);
                    if (count != null) {
                        itemMap.set(line.productVariant.name, count + 1);
                    }
                    else {
                        itemMap.set(line.productVariant.name, 1);
                    }
                }
            }
        }
        return Array.from(itemMap.entries()).map(([name, quantity]) => ({ name, quantity }));
    }
    getModification(id) {
        return this.order.modifications.find(m => m.id === id);
    }
    getName(entry) {
        const { administrator } = entry;
        if (administrator) {
            return `${administrator.firstName} ${administrator.lastName}`;
        }
        else {
            const customer = this.order.customer;
            if (customer) {
                return `${customer.firstName} ${customer.lastName}`;
            }
        }
        return '';
    }
    addNoteToOrder() {
        this.addNote.emit({ note: this.note, isPublic: !this.noteIsPrivate });
        this.note = '';
        this.noteIsPrivate = true;
    }
}
OrderHistoryComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-history',
                template: "<h4>{{ 'order.order-history' | translate }}</h4>\n<div class=\"entry-list\" [class.expanded]=\"expanded\">\n    <vdr-timeline-entry iconShape=\"note\" displayType=\"muted\" [featured]=\"true\">\n        <div class=\"note-entry\">\n            <textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n            <button class=\"btn btn-secondary\" [disabled]=\"!note\" (click)=\"addNoteToOrder()\">\n                {{ 'common.add-note' | translate }}\n            </button>\n        </div>\n        <div class=\"visibility-select\">\n            <clr-checkbox-wrapper>\n                <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"noteIsPrivate\" />\n                <label>{{ 'order.note-is-private' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <span *ngIf=\"noteIsPrivate\" class=\"private\">\n                {{ 'order.note-only-visible-to-administrators' | translate }}\n            </span>\n            <span *ngIf=\"!noteIsPrivate\" class=\"public\">\n                {{ 'order.note-visible-to-customer' | translate }}\n            </span>\n        </div>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry\n        *ngFor=\"let entry of history\"\n        [displayType]=\"getDisplayType(entry)\"\n        [iconShape]=\"getTimelineIcon(entry)\"\n        [createdAt]=\"entry.createdAt\"\n        [name]=\"getName(entry)\"\n        [featured]=\"isFeatured(entry)\"\n        [collapsed]=\"!expanded && !isFeatured(entry)\"\n        (expandClick)=\"expanded = !expanded\"\n    >\n        <ng-container [ngSwitch]=\"entry.type\">\n            <ng-container *ngSwitchCase=\"type.ORDER_STATE_TRANSITION\">\n                <div class=\"title\" *ngIf=\"entry.data.to === 'Delivered'\">\n                    {{ 'order.history-order-fulfilled' | translate }}\n                </div>\n                <div class=\"title\" *ngIf=\"entry.data.to === 'Cancelled'\">\n                    {{ 'order.history-order-cancelled' | translate }}\n                </div>\n                <ng-template [ngIf]=\"entry.data.to !== 'Cancelled' && entry.data.to !== 'Delivered'\">\n                    {{\n                        'order.history-order-transition'\n                            | translate: { from: entry.data.from, to: entry.data.to }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_MODIFIED\">\n                <div class=\"title\">\n                    {{ 'order.history-order-modified' | translate }}\n                </div>\n                <ng-container *ngIf=\"getModification(entry.data.modificationId) as modification\">\n                    {{ 'order.modify-order-price-difference' | translate }}:\n                    <strong>{{ modification.priceChange | localeCurrency: order.currencyCode }}</strong>\n                    <vdr-chip colorType=\"success\" *ngIf=\"modification.isSettled\">{{\n                        'order.modification-settled' | translate\n                    }}</vdr-chip>\n                    <vdr-chip colorType=\"error\" *ngIf=\"!modification.isSettled\">{{\n                        'order.modification-not-settled' | translate\n                    }}</vdr-chip>\n                    <vdr-history-entry-detail>\n                        <vdr-modification-detail\n                            [order]=\"order\"\n                            [modification]=\"modification\"\n                        ></vdr-modification-detail>\n                    </vdr-history-entry-detail>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_PAYMENT_TRANSITION\">\n                <ng-container *ngIf=\"entry.data.to === 'Settled'; else regularPaymentTransition\">\n                    <div class=\"title\">\n                        {{ 'order.history-payment-settled' | translate }}\n                    </div>\n                    {{ 'order.transaction-id' | translate }}: {{ getPayment(entry)?.transactionId }}\n                    <vdr-history-entry-detail *ngIf=\"getPayment(entry) as payment\">\n                        <vdr-payment-detail\n                            [payment]=\"payment\"\n                            [currencyCode]=\"order.currencyCode\"\n                        ></vdr-payment-detail>\n                    </vdr-history-entry-detail>\n                </ng-container>\n                <ng-template #regularPaymentTransition>\n                    {{\n                        'order.history-payment-transition'\n                            | translate\n                                : {\n                                      from: entry.data.from,\n                                      to: entry.data.to,\n                                      id: getPayment(entry)?.transactionId\n                                  }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_REFUND_TRANSITION\">\n                {{\n                    'order.history-refund-transition'\n                        | translate: { from: entry.data.from, to: entry.data.to, id: entry.data.refundId }\n                }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_CANCELLATION\">\n                {{ 'order.history-items-cancelled' | translate: { count: entry.data.orderItemIds.length } }}\n                <vdr-history-entry-detail *ngIf=\"getCancelledItems(entry) as items\">\n                    <vdr-labeled-data [label]=\"'order.cancellation-reason' | translate\">\n                        {{ entry.data.reason }}\n                    </vdr-labeled-data>\n                    <vdr-labeled-data [label]=\"'order.contents' | translate\">\n                        <vdr-simple-item-list [items]=\"items\"></vdr-simple-item-list>\n                    </vdr-labeled-data>\n                    <vdr-labeled-data [label]=\"'order.shipping-cancelled' | translate\">\n                        {{ entry.data.shippingCancelled }}\n                    </vdr-labeled-data>\n                </vdr-history-entry-detail>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_FULFILLMENT\">\n                {{ 'order.history-fulfillment-created' | translate }}\n                <vdr-history-entry-detail *ngIf=\"getFulfillment(entry) as fulfillment\">\n                    <vdr-fulfillment-detail\n                        [fulfillmentId]=\"fulfillment.id\"\n                        [order]=\"order\"\n                    ></vdr-fulfillment-detail>\n                </vdr-history-entry-detail>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_FULFILLMENT_TRANSITION\">\n                <ng-container *ngIf=\"entry.data.to === 'Delivered'\">\n                    <div class=\"title\">\n                        {{ 'order.history-fulfillment-delivered' | translate }}\n                    </div>\n                    {{ 'order.tracking-code' | translate }}: {{ getFulfillment(entry)?.trackingCode }}\n                </ng-container>\n                <ng-container *ngIf=\"entry.data.to === 'Shipped'\">\n                    <div class=\"title\">\n                        {{ 'order.history-fulfillment-shipped' | translate }}\n                    </div>\n                    {{ 'order.tracking-code' | translate }}: {{ getFulfillment(entry)?.trackingCode }}\n                </ng-container>\n                <ng-container *ngIf=\"entry.data.to !== 'Delivered' && entry.data.to !== 'Shipped'\">\n                    {{\n                        'order.history-fulfillment-transition'\n                            | translate: { from: entry.data.from, to: entry.data.to }\n                    }}\n                </ng-container>\n                <vdr-history-entry-detail *ngIf=\"getFulfillment(entry) as fulfillment\">\n                    <vdr-fulfillment-detail\n                        [fulfillmentId]=\"fulfillment.id\"\n                        [order]=\"order\"\n                    ></vdr-fulfillment-detail>\n                </vdr-history-entry-detail>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_NOTE\">\n                <div class=\"flex\">\n                    <div class=\"note-text\">\n                        <span *ngIf=\"entry.isPublic\" class=\"note-visibility public\">{{\n                            'common.public' | translate\n                        }}</span>\n                        <span *ngIf=\"!entry.isPublic\" class=\"note-visibility private\">{{\n                            'common.private' | translate\n                        }}</span>\n                        {{ entry.data.note }}\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"updateNote.emit(entry)\"\n                                [disabled]=\"!('UpdateOrder' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"edit\"></clr-icon>\n                                {{ 'common.edit' | translate }}\n                            </button>\n                            <div class=\"dropdown-divider\"></div>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"deleteNote.emit(entry)\"\n                                [disabled]=\"!('UpdateOrder' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'common.delete' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_COUPON_APPLIED\">\n                {{ 'order.history-coupon-code-applied' | translate }}:\n                <vdr-chip>\n                    <a [routerLink]=\"['/marketing', 'promotions', entry.data.promotionId]\">{{\n                        entry.data.couponCode\n                    }}</a>\n                </vdr-chip>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.ORDER_COUPON_REMOVED\">\n                {{ 'order.history-coupon-code-removed' | translate }}:\n                <vdr-chip\n                    ><span class=\"cancelled-coupon-code\">{{ entry.data.couponCode }}</span></vdr-chip\n                >\n            </ng-container>\n        </ng-container>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry [isLast]=\"true\" [createdAt]=\"order.createdAt\" [featured]=\"true\">\n        <div class=\"title\">\n            {{ 'order.history-order-created' | translate }}\n        </div>\n    </vdr-timeline-entry>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{margin-top:48px;display:block}.entry-list{margin-top:24px;margin-left:24px;margin-right:12px}.note-entry{display:flex;align-items:center}.note-entry .note{flex:1}.note-entry button{margin:0}.visibility-select{display:flex;justify-content:space-between;align-items:baseline}.visibility-select .public{color:var(--color-warning-500)}.visibility-select .private{color:var(--color-success-500)}textarea.note{flex:1;height:36px;border-radius:3px;margin-right:6px}.note-text{color:var(--color-grey-800);white-space:pre-wrap}.cancelled-coupon-code{text-decoration:line-through}.note-visibility{text-transform:lowercase}.note-visibility.public{color:var(--color-warning-500)}.note-visibility.private{color:var(--color-success-500)}\n"]
            },] }
];
OrderHistoryComponent.propDecorators = {
    order: [{ type: Input }],
    history: [{ type: Input }],
    addNote: [{ type: Output }],
    updateNote: [{ type: Output }],
    deleteNote: [{ type: Output }]
};

class OrderListComponent extends BaseListComponent {
    constructor(serverConfigService, dataService, localStorageService, router, route, modalService, notificationService) {
        var _a;
        super(router, route);
        this.serverConfigService = serverConfigService;
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.itemList = [];
        this.audioOn = false;
        this.searchControl = new FormControl('');
        this.searchOrderCodeControl = new FormControl('');
        this.searchLastNameControl = new FormControl('');
        this.orderStates = this.serverConfigService.getOrderProcessStates().map(item => item.name);
        this.filterPresets = [
            {
                name: 'open',
                label: marker('order.filter-preset-open'),
                config: {
                    active: false,
                    states: this.orderStates.filter(s => s !== 'Completed' && s !== 'Cancelled' && s !== 'Draft'),
                },
            },
            {
                name: 'completed',
                label: marker('order.filter-preset-completed'),
                config: {
                    states: ['Completed', 'Cancelled'],
                },
            },
            {
                name: 'active',
                label: marker('order.filter-preset-active'),
                config: {
                    active: true,
                },
            },
            {
                name: 'draft',
                label: marker('order.filter-preset-draft'),
                config: {
                    active: false,
                    states: ['Draft'],
                },
            },
        ];
        this.canCreateDraftOrder = false;
        super.setQueryFn(
        // tslint:disable-next-line:no-shadowed-variable
        (take, skip) => this.dataService.order.getOrders({ take, skip }).refetchOnChannelChange(), data => data.orders, 
        // tslint:disable-next-line:no-shadowed-variable
        (skip, take) => this.createQueryOptions(skip, take, this.searchControl.value, this.route.snapshot.queryParamMap.get('filter') || 'open'));
        const lastFilters = this.localStorageService.get('orderListLastCustomFilters');
        if (lastFilters) {
            this.setQueryParam(lastFilters, { replaceUrl: true });
        }
        this.canCreateDraftOrder = !!((_a = this.serverConfigService
            .getOrderProcessStates()
            .find(state => state.name === 'Created')) === null || _a === void 0 ? void 0 : _a.to.includes('Draft'));
        if (!this.canCreateDraftOrder) {
            this.filterPresets = this.filterPresets.filter(p => p.name !== 'draft');
        }
    }
    ngOnInit() {
        const _super = Object.create(null, {
            ngOnInit: { get: () => super.ngOnInit }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.ngOnInit.call(this);
            this.activePreset$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('filter') || 'open'), distinctUntilChanged());
            this.dataService.settings.getActiveChannel().single$.subscribe(channel => {
                this.processingTime = channel.activeChannel['customFields']['processingTime'];
            });
            const searchTerms$ = merge(this.searchControl.valueChanges).pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250));
            merge(searchTerms$, this.route.queryParamMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(val => {
                this.refresh();
            });
            const queryParamMap = this.route.snapshot.queryParamMap;
            this.customFilterForm = new FormGroup({
                states: new FormControl((_a = queryParamMap.getAll('states')) !== null && _a !== void 0 ? _a : []),
                placedAtStart: new FormControl(queryParamMap.get('placedAtStart')),
                placedAtEnd: new FormControl(queryParamMap.get('placedAtEnd')),
            });
            this.setItemsPerPage(50); // default to 50
            this.refreshInterval = setInterval(() => {
                // const currentList = await this.items$.toPromise();
                this.refresh();
                // const newList = await this.items$.toPromise();
                // console.log(newList.length, currentList.length);
            }, 15000);
            this.audioElem = document.getElementById('audio_player');
            this.audioElem.muted = true;
            this.audioElem.addEventListener('play', () => {
                this.audioOn = true;
                this.audioElem.addEventListener('ended', () => {
                    this.audioOn = true;
                    this.audioElem.muted = false;
                });
            }, { once: true });
            this.audioElem.play().then(() => {
                this.audioOn = true;
            });
            this.items$.subscribe(value => {
                if (this.itemList.length !== 0 && this.itemList.length < value.length) {
                    this.playAudio();
                }
                this.itemList = value;
                // console.log(previousValue?.length, currentValue?.length);
                /** Do something */
            });
        });
    }
    toggleAudio() {
        if (!this.audioOn) {
            this.audioElem.play();
        }
        else {
            this.audioOn = !this.audioOn;
            this.audioElem.muted = !this.audioOn;
        }
    }
    playAudio() {
        var _a;
        (_a = this.audioElem) === null || _a === void 0 ? void 0 : _a.play();
    }
    formatTime(date) {
        return dayjs(date).format('hh:mm A');
    }
    formatDate(date) {
        return dayjs(date).format('DD/MMM');
    }
    getNextState(order, buttonText = false) {
        var _a;
        const authorizedCashPayment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(p => p.state === 'Authorized' && p.method === 'cash')[0];
        if (order.state === 'PaymentSettled' || order.state === 'PaymentAuthorized') {
            return 'Processing';
        }
        if (order.state === 'Processing') {
            return buttonText ? 'Ready For Pickup' : 'ReadyForPickup';
        }
        if (order.state === 'ReadyForPickup') {
            if (order.shippingLines[0].shippingMethod.code === 'delivery') {
                return 'Delivering';
            }
            if (authorizedCashPayment) {
                return buttonText ? 'Collect Cash' : 'Completed';
            }
            else {
                return 'Completed';
            }
        }
        if (order.state === 'Delivering') {
            if (authorizedCashPayment) {
                return buttonText ? 'Collect Cash' : 'Completed';
            }
            else {
                return 'Completed';
            }
        }
        return 'Processing';
    }
    toNextState(order) {
        return this.modalService
            .dialog({
            title: `Proceed to ${this.getNextState(order, true)}?`,
            body: `Are you sure you want to proceed to '${this.getNextState(order, true)}'?`,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'primary', label: 'Confirm', returnValue: true },
            ],
        })
            .pipe(switchMap((res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (res) {
                if (this.getNextState(order) === 'Completed') {
                    const authorizedCashPayment = (_a = order.payments) === null || _a === void 0 ? void 0 : _a.filter(p => p.state === 'Authorized' && p.method === 'cash')[0];
                    if (authorizedCashPayment) {
                        const output = yield this.dataService.order
                            .settlePayment(authorizedCashPayment === null || authorizedCashPayment === void 0 ? void 0 : authorizedCashPayment.id.toString())
                            .toPromise();
                    }
                }
                yield this.dataService.order
                    .transitionToState(order.id.toString(), this.getNextState(order))
                    .toPromise();
                return true;
            }
            return EMPTY;
        })))
            .subscribe(() => {
            this.notificationService.success('Successfully Updated Order State');
            this.refresh();
        }, err => {
            this.notificationService.error('Error Updating Order State');
        });
    }
    selectFilterPreset(presetName) {
        var _a;
        const lastCustomFilters = (_a = this.localStorageService.get('orderListLastCustomFilters')) !== null && _a !== void 0 ? _a : {};
        const emptyCustomFilters = { states: undefined, placedAtStart: undefined, placedAtEnd: undefined };
        const filters = presetName === 'custom' ? lastCustomFilters : emptyCustomFilters;
        this.setQueryParam(Object.assign({ filter: presetName, page: 1 }, filters), { replaceUrl: true });
    }
    applyCustomFilters() {
        const formValue = this.customFilterForm.value;
        const customFilters = {
            states: formValue.states,
            placedAtStart: formValue.placedAtStart,
            placedAtEnd: formValue.placedAtEnd,
        };
        this.setQueryParam(Object.assign({ filter: 'custom' }, customFilters));
        this.customFilterForm.markAsPristine();
        this.localStorageService.set('orderListLastCustomFilters', customFilters);
    }
    createQueryOptions(
    // tslint:disable-next-line:no-shadowed-variable
    skip, take, searchTerm, activeFilterPreset) {
        var _a;
        const filterConfig = this.filterPresets.find(p => p.name === activeFilterPreset);
        // tslint:disable-next-line:no-shadowed-variable
        let filter = {};
        let filterOperator = LogicalOperator.AND;
        if (filterConfig) {
            if (filterConfig.config.active != null) {
                filter.active = {
                    eq: filterConfig.config.active,
                };
            }
            if (filterConfig.config.states) {
                filter.state = {
                    in: filterConfig.config.states,
                };
            }
        }
        else if (activeFilterPreset === 'custom') {
            const queryParams = this.route.snapshot.queryParamMap;
            const states = (_a = queryParams.getAll('states')) !== null && _a !== void 0 ? _a : [];
            const placedAtStart = queryParams.get('placedAtStart');
            const placedAtEnd = queryParams.get('placedAtEnd');
            if (states.length) {
                filter.state = {
                    in: states,
                };
            }
            if (placedAtStart && placedAtEnd) {
                filter.orderPlacedAt = {
                    between: {
                        start: placedAtStart,
                        end: placedAtEnd,
                    },
                };
            }
            else if (placedAtStart) {
                filter.orderPlacedAt = {
                    after: placedAtStart,
                };
            }
            else if (placedAtEnd) {
                filter.orderPlacedAt = {
                    before: placedAtEnd,
                };
            }
        }
        if (searchTerm) {
            filter = {
                customerLastName: {
                    contains: searchTerm,
                },
                transactionId: {
                    contains: searchTerm,
                },
                code: {
                    contains: searchTerm,
                },
            };
            filterOperator = LogicalOperator.OR;
        }
        return {
            options: {
                skip,
                take,
                filter: Object.assign({}, (filter !== null && filter !== void 0 ? filter : {})),
                sort: {
                    updatedAt: SortOrder.DESC,
                },
                filterOperator,
            },
        };
    }
    getShippingNames(order) {
        if (order.shippingLines.length) {
            return order.shippingLines.map(shippingLine => shippingLine.shippingMethod.name).join(', ');
        }
        else {
            return '';
        }
    }
    ngOnDestroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }
}
OrderListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-list',
                template: "<audio src=\"assets/notification.mp3\" id=\"audio_player\"></audio>\n<clr-toggle-wrapper>\n    <input\n        id=\"audioToggle\"\n        type=\"checkbox\"\n        (change)=\"toggleAudio()\"\n        [checked]=\"audioOn\"\n        clrToggle\n        name=\"enabled\"\n    />\n    <label class=\"visible-toggle\"> <span>Play Notification Sound</span></label></clr-toggle-wrapper\n>\n<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"search-form\">\n            <div\n                class=\"filter-presets btn-group btn-outline-primary\"\n                *ngIf=\"activePreset$ | async as activePreset\"\n            >\n                <button\n                    class=\"btn\"\n                    *ngFor=\"let preset of filterPresets\"\n                    [class.btn-primary]=\"activePreset === preset.name\"\n                    (click)=\"selectFilterPreset(preset.name)\"\n                >\n                    {{ preset.label | translate }}\n                </button>\n                <button\n                    class=\"btn\"\n                    [class.btn-primary]=\"activePreset === 'custom'\"\n                    (click)=\"selectFilterPreset('custom')\"\n                >\n                    {{ 'order.filter-custom' | translate }}\n                    <clr-icon shape=\"angle down\"></clr-icon>\n                </button>\n            </div>\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"searchControl\"\n                [placeholder]=\"'order.search-by-order-filters' | translate\"\n                class=\"search-input\"\n            />\n        </div>\n        <div class=\"custom-filters\" [class.expanded]=\"(activePreset$ | async) === 'custom'\">\n            <form [formGroup]=\"customFilterForm\">\n                <div class=\"flex align-center\">\n                    <ng-select\n                        [items]=\"orderStates\"\n                        appendTo=\"body\"\n                        [addTag]=\"false\"\n                        [multiple]=\"true\"\n                        formControlName=\"states\"\n                        [placeholder]=\"'state.all-orders' | translate\"\n                        [clearable]=\"true\"\n                        [searchable]=\"false\"\n                    >\n                        <ng-template ng-option-tmp let-item=\"item\">{{\n                            item | stateI18nToken | translate\n                        }}</ng-template>\n                        <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n                            <span class=\"ng-value-label\"> {{ item | stateI18nToken | translate }}</span>\n                            <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\"\n                                >\u00D7</span\n                            >\n                        </ng-template>\n                    </ng-select>\n                    <button\n                        class=\"btn btn-secondary\"\n                        [disabled]=\"customFilterForm.pristine\"\n                        (click)=\"applyCustomFilters()\"\n                    >\n                        {{ 'order.apply-filters' | translate }}\n                        <clr-icon shape=\"filter\"></clr-icon>\n                    </button>\n                </div>\n                <div class=\"flex\">\n                    <div>\n                        <label>{{ 'order.placed-at-start' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtStart\"></vdr-datetime-picker>\n                    </div>\n                    <div>\n                        <label>{{ 'order.placed-at-end' | translate }}</label>\n                        <vdr-datetime-picker formControlName=\"placedAtEnd\"></vdr-datetime-picker>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"order-list\"></vdr-action-bar-items>\n        <ng-container *ngIf=\"canCreateDraftOrder\">\n            <a\n                class=\"btn btn-primary mt1\"\n                *vdrIfPermissions=\"['CreateOrder']\"\n                [routerLink]=\"['./draft/create']\"\n            >\n                <clr-icon shape=\"plus\"></clr-icon>\n                {{ 'catalog.create-draft-order' | translate }}\n            </a>\n        </ng-container>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [customRowHeight]=\"5\"\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.customer' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.placed-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.time-left' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'order.shipping' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">\n            <vdr-order-label [order]=\"order\"></vdr-order-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.totalWithTax | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">\n            {{ formatTime(order.orderPlacedAt) }}<br />{{ formatDate(order.orderPlacedAt) }}\n        </td>\n        <td class=\"left align-middle\" style=\"font-size: 16px\">\n            <vdr-cd-timer\n                [autoStart]\n                [scheduledTime]=\"order.customFields.scheduledTime\"\n                [processingTime]=\"processingTime\"\n                [placedTime]=\"order.orderPlacedAt\"\n                format=\"ms\"\n                maxTimeUnit=\"hour\"\n            ></vdr-cd-timer>\n        </td>\n        <td class=\"left align-middle\">{{ getShippingNames(order) }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                [large]=\"true\"\n                *ngIf=\"order.nextStates.length > 0\"\n                iconShape=\"step-forward-2\"\n                [label]=\"getNextState(order, true)\"\n                (click)=\"toNextState(order)\"\n            ></vdr-table-row-action>\n            <!-- <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"\n                    order.state === 'Modifying'\n                        ? ['./', order.id, 'modify']\n                        : order.state === 'Draft'\n                        ? ['./draft', order.id]\n                        : ['./', order.id]\n                \"\n            ></vdr-table-row-action> -->\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".search-form{display:flex;flex-direction:column;align-items:baseline;width:100%;max-width:100vw;margin-bottom:6px}.filter-presets{max-width:90vw;overflow-x:auto}.search-input{margin-top:6px;min-width:300px}.custom-filters{overflow:hidden;max-height:0;padding-bottom:6px}.custom-filters.expanded{max-height:initial}.custom-filters>form{display:flex;flex-direction:column;align-items:center}.custom-filters>form>div{width:100%}ng-select{flex:1;min-width:200px;height:36px}ng-select ::ng-deep .ng-select-container{height:36px}tbody tr{height:5rem!important}\n"]
            },] }
];
OrderListComponent.ctorParameters = () => [
    { type: ServerConfigService },
    { type: DataService },
    { type: LocalStorageService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];

class OrderPaymentCardComponent {
    constructor() {
        this.settlePayment = new EventEmitter();
        this.transitionPaymentState = new EventEmitter();
        this.settleRefund = new EventEmitter();
    }
    refundHasMetadata(refund) {
        return !!refund && Object.keys(refund.metadata).length > 0;
    }
    nextOtherStates() {
        if (!this.payment) {
            return [];
        }
        return this.payment.nextStates.filter(s => s !== 'Settled' && s !== 'Error');
    }
}
OrderPaymentCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-payment-card',
                template: "<div class=\"card\">\n    <div class=\"card-header payment-header\">\n        <div>\n            {{ 'order.payment' | translate }}\n            <ng-container *ngIf=\"payment.transactionId\">#{{ payment.transactionId }}</ng-container>\n        </div>\n        <div class=\"payment-state\">\n            <vdr-payment-state-label [state]=\"payment.state\"></vdr-payment-state-label>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <vdr-payment-detail [payment]=\"payment\" [currencyCode]=\"currencyCode\"></vdr-payment-detail>\n    </div>\n    <ng-container *ngFor=\"let refund of payment.refunds\">\n        <div class=\"card-header payment-header\">\n            <clr-icon shape=\"redo\" class=\"refund-icon\" dir=\"down\"></clr-icon>\n            {{ 'order.refund' | translate }} #{{ refund.id }}\n            <div class=\"clr-flex-fill\"></div>\n            <vdr-refund-state-label [state]=\"refund.state\"></vdr-refund-state-label>\n        </div>\n        <div class=\"card-block\">\n            <vdr-labeled-data [label]=\"'common.created-at' | translate\">\n                {{ refund.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.refund-total' | translate\">\n                {{ refund.total | localeCurrency: currencyCode }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.transaction-id' | translate\" *ngIf=\"refund.transactionId\">\n                {{ refund.transactionId }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.refund-reason' | translate\" *ngIf=\"refund.reason\">\n                {{ refund.reason }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.refund-metadata' | translate\" *ngIf=\"refundHasMetadata(refund)\">\n                <vdr-object-tree [value]=\"refund.metadata\"></vdr-object-tree>\n            </vdr-labeled-data>\n        </div>\n        <div class=\"card-footer\" *ngIf=\"refund.state === 'Pending'\">\n            <button class=\"btn btn-sm btn-primary\" (click)=\"settleRefund.emit(refund)\">\n                {{ 'order.settle-refund' | translate }}\n            </button>\n        </div>\n    </ng-container>\n    <div class=\"card-footer\" *ngIf=\"payment.nextStates.length\">\n        <button\n            class=\"btn btn-sm btn-primary\"\n            *ngIf=\"payment.nextStates.includes('Settled')\"\n            (click)=\"settlePayment.emit(payment)\"\n        >\n            {{ 'order.settle-payment' | translate }}\n        </button>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngFor=\"let nextState of nextOtherStates()\">\n                    <button\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionPaymentState.emit({ payment: payment, state: nextState })\"\n                    >\n                        <ng-container *ngIf=\"nextState !== 'Cancelled'; else cancel\">\n                            <clr-icon shape=\"step-forward-2\"></clr-icon>\n                            {{\n                                'order.transition-to-state'\n                                    | translate: { state: (nextState | stateI18nToken | translate) }\n                            }}\n                        </ng-container>\n                        <ng-template #cancel>\n                            <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                            {{ 'order.cancel-payment' | translate }}\n                        </ng-template>\n                    </button>\n                </ng-container>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".payment-header{display:flex;justify-content:space-between;align-items:center}.refund-icon{margin-right:6px;color:var(--color-grey-400)}.card-footer{display:flex;align-items:center;justify-content:flex-end}\n"]
            },] }
];
OrderPaymentCardComponent.propDecorators = {
    payment: [{ type: Input }],
    currencyCode: [{ type: Input }],
    settlePayment: [{ type: Output }],
    transitionPaymentState: [{ type: Output }],
    settleRefund: [{ type: Output }]
};

const NODE_HEIGHT = 72;

class OrderProcessEdgeComponent {
    ngOnInit() {
        this.active$ = this.from.active$
            .asObservable()
            .pipe(tap((active) => this.to.activeTarget$.next(active)));
    }
    getStyle() {
        const direction = this.from.index < this.to.index ? 'down' : 'up';
        const startPos = this.from.getPos(direction === 'down' ? 'bottom' : 'top');
        const endPos = this.to.getPos(direction === 'down' ? 'top' : 'bottom');
        const dX = Math.abs(startPos.x - endPos.x);
        const dY = Math.abs(startPos.y - endPos.y);
        const length = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        return Object.assign({ 'top.px': startPos.y, 'left.px': startPos.x + (direction === 'down' ? 10 : 40) + this.index * 12, 'height.px': length, 'width.px': 1 }, (direction === 'up'
            ? {
                transform: 'rotateZ(180deg)',
                'transform-origin': 'top',
            }
            : {}));
    }
}
OrderProcessEdgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-edge',
                template: "<div\n    [attr.data-from]=\"from.node.name\"\n    [attr.data-to]=\"to.node.name\"\n    [ngStyle]=\"getStyle()\"\n    [class.active]=\"active$ | async\"\n    class=\"edge\">\n    <clr-icon shape=\"arrow\" flip=\"vertical\" class=\"arrow\"></clr-icon>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".edge{position:absolute;border:1px solid var(--color-component-border-200);background-color:var(--color-component-bg-300);opacity:.3;transition:border .2s,opacity .2s,background-color .2s}.edge.active{border-color:var(--color-primary-500);background-color:var(--color-primary-500);opacity:1}.edge.active .arrow{color:var(--color-primary-500)}.edge .arrow{position:absolute;bottom:-4px;left:-8px;color:var(--color-grey-300)}\n"]
            },] }
];
OrderProcessEdgeComponent.propDecorators = {
    from: [{ type: Input }],
    to: [{ type: Input }],
    index: [{ type: Input }]
};

class OrderProcessNodeComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.active$ = new BehaviorSubject(false);
        this.activeTarget$ = new BehaviorSubject(false);
        this.isCancellable = false;
        // We use a class field here to prevent the
        // i18n extractor from extracting a "Cancelled" key
        this.cancelledState = 'Cancelled';
    }
    ngOnChanges(changes) {
        this.isCancellable = !!this.node.to.find((s) => s.name === 'Cancelled');
        if (changes.active) {
            this.active$.next(this.active);
        }
    }
    getPos(origin = 'top') {
        var _a, _b;
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const nodeHeight = (_b = (_a = this.elementRef.nativeElement.querySelector('.node')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0;
        return {
            x: 10,
            y: this.index * NODE_HEIGHT + (origin === 'bottom' ? nodeHeight : 0),
        };
    }
    getStyle() {
        const pos = this.getPos();
        return {
            'top.px': pos.y,
            'left.px': pos.x,
        };
    }
}
OrderProcessNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-node',
                template: "<div class=\"node-wrapper\" [ngStyle]=\"getStyle()\" [class.active]=\"active$ | async\">\n    <div\n        class=\"node\"\n        [class.active-target]=\"activeTarget$ | async\"\n    >\n        {{ node.name | stateI18nToken | translate }}\n    </div>\n    <div class=\"cancelled-wrapper\" *ngIf=\"isCancellable\">\n        <div class=\"cancelled-edge\">\n        </div>\n        <clr-icon shape=\"dot-circle\"></clr-icon>\n        <div class=\"cancelled-node\">\n            {{ cancelledState | stateI18nToken | translate }}\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.node-wrapper{position:absolute;z-index:1;display:flex;align-items:center}.node{display:inline-block;border:2px solid var(--color-component-border-200);border-radius:3px;padding:3px 6px;z-index:1;background-color:var(--color-component-bg-100);opacity:.7;transition:opacity .2s,background-color .2s,color .2s;cursor:default}.node.active-target{border-color:var(--color-primary-500);opacity:.9}.cancelled-wrapper{display:flex;align-items:center;color:var(--color-grey-300);transition:color .2s,opacity .2s;opacity:.7}.cancelled-edge{width:48px;height:2px;background-color:var(--color-component-bg-300);transition:background-color .2s}clr-icon{margin-left:-1px}.cancelled-node{margin-left:6px}.active .cancelled-wrapper{opacity:1}.active .node{opacity:1;background-color:var(--color-primary-600);border-color:var(--color-primary-600);color:var(--color-primary-100)}.active .cancelled-wrapper{color:var(--color-error-500)}.active .cancelled-edge{background-color:var(--color-error-500)}\n"]
            },] }
];
OrderProcessNodeComponent.ctorParameters = () => [
    { type: ElementRef }
];
OrderProcessNodeComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    active: [{ type: Input }]
};

class OrderProcessGraphComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.setActiveState$ = new BehaviorSubject(undefined);
        this.nodes = [];
        this.edges = [];
    }
    get outerHeight() {
        return this.nodes.length * NODE_HEIGHT;
    }
    ngOnInit() {
        this.setActiveState$.next(this.initialState);
        this.activeState$ = this.setActiveState$.pipe(debounceTime(150));
    }
    ngOnChanges(changes) {
        this.populateNodes();
    }
    ngAfterViewInit() {
        setTimeout(() => this.populateEdges());
    }
    onMouseOver(stateName) {
        this.setActiveState$.next(stateName);
    }
    onMouseOut() {
        this.setActiveState$.next(this.initialState);
    }
    getNodeFor(state) {
        if (this.nodeComponents) {
            return this.nodeComponents.find((n) => n.node.name === state);
        }
    }
    populateNodes() {
        var _a, _b;
        const stateNodeMap = new Map();
        for (const state of this.states) {
            stateNodeMap.set(state.name, {
                name: state.name,
                to: [],
            });
        }
        for (const [name, stateNode] of stateNodeMap.entries()) {
            const targets = (_b = (_a = this.states.find((s) => s.name === name)) === null || _a === void 0 ? void 0 : _a.to) !== null && _b !== void 0 ? _b : [];
            for (const target of targets) {
                const targetNode = stateNodeMap.get(target);
                if (targetNode) {
                    stateNode.to.push(targetNode);
                }
            }
        }
        this.nodes = [...stateNodeMap.values()].filter((n) => n.name !== 'Cancelled');
    }
    populateEdges() {
        for (const node of this.nodes) {
            const nodeCmp = this.getNodeFor(node.name);
            let index = 0;
            for (const to of node.to) {
                const toCmp = this.getNodeFor(to.name);
                if (nodeCmp && toCmp && nodeCmp !== toCmp) {
                    this.edges.push({
                        to: toCmp,
                        from: nodeCmp,
                        index,
                    });
                    index++;
                }
            }
        }
        this.edges = [...this.edges];
        this.changeDetector.markForCheck();
    }
}
OrderProcessGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-graph',
                template: "<ng-container *ngFor=\"let state of nodes; let i = index\">\n    <vdr-order-process-node\n        [node]=\"state\"\n        [index]=\"i\"\n        [active]=\"(activeState$ | async) === state.name\"\n        (mouseenter)=\"onMouseOver(state.name)\"\n        (mouseleave)=\"onMouseOut()\"\n    ></vdr-order-process-node>\n</ng-container>\n<ng-container *ngFor=\"let edge of edges\">\n    <vdr-order-process-edge [from]=\"edge.from\" [to]=\"edge.to\" [index]=\"edge.index\"></vdr-order-process-edge>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;border:1px hotpink;margin:20px;padding:12px;position:relative}.state-row{display:flex}\n"]
            },] }
];
OrderProcessGraphComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OrderProcessGraphComponent.propDecorators = {
    states: [{ type: Input }],
    initialState: [{ type: Input }],
    nodeComponents: [{ type: ViewChildren, args: [OrderProcessNodeComponent,] }],
    outerHeight: [{ type: HostBinding, args: ['style.height.px',] }]
};

class OrderTableComponent {
    constructor() {
        this.isDraft = false;
        this.adjust = new EventEmitter();
        this.remove = new EventEmitter();
        this.orderLineCustomFieldsVisible = false;
        this.customFieldsForLine = {};
    }
    get visibleOrderLineCustomFields() {
        return this.orderLineCustomFieldsVisible ? this.orderLineCustomFields : [];
    }
    get showElided() {
        return !this.orderLineCustomFieldsVisible && 0 < this.orderLineCustomFields.length;
    }
    ngOnInit() {
        this.orderLineCustomFieldsVisible = this.orderLineCustomFields.length < 2;
        this.getLineCustomFields();
    }
    draftInputBlur(line, quantity) {
        if (line.quantity !== quantity) {
            this.adjust.emit({ lineId: line.id, quantity });
        }
    }
    toggleOrderLineCustomFields() {
        this.orderLineCustomFieldsVisible = !this.orderLineCustomFieldsVisible;
    }
    getLineDiscounts(line) {
        return line.discounts.filter(a => a.type === AdjustmentType.PROMOTION);
    }
    getLineCustomFields() {
        for (const line of this.order.lines) {
            const formGroup = new FormGroup({});
            const result = this.orderLineCustomFields
                .map(config => {
                const value = line.customFields[config.name];
                formGroup.addControl(config.name, new FormControl(value));
                return {
                    config,
                    formGroup,
                    value,
                };
            })
                .filter(field => {
                return this.orderLineCustomFieldsVisible ? true : field.value != null;
            });
            this.customFieldsForLine[line.id] = result;
        }
    }
    getPromotionLink(promotion) {
        const id = promotion.adjustmentSource.split(':')[1];
        return ['/marketing', 'promotions', id];
    }
    getCouponCodeForAdjustment(order, promotionAdjustment) {
        const id = promotionAdjustment.adjustmentSource.split(':')[1];
        const promotion = order.promotions.find(p => p.id === id);
        if (promotion) {
            return promotion.couponCode || undefined;
        }
    }
    getShippingNames(order) {
        if (order.shippingLines.length) {
            return order.shippingLines.map(shippingLine => shippingLine.shippingMethod.name).join(', ');
        }
        else {
            return '';
        }
    }
}
OrderTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-table',
                template: "<table class=\"order-table table\">\n    <thead>\n        <tr>\n            <th></th>\n            <th>{{ 'order.product-name' | translate }}</th>\n            <th>{{ 'order.product-sku' | translate }}</th>\n            <th>Is Cone</th>\n            <th>{{ 'order.quantity' | translate }}</th>\n            <th>{{ 'order.total' | translate }}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <ng-container *ngFor=\"let line of order.lines\">\n            <tr class=\"order-line\" [class.is-cancelled]=\"line.quantity === 0\">\n                <td class=\"align-middle thumb\">\n                    <img *ngIf=\"line.featuredAsset\" [src]=\"line.featuredAsset | assetPreview: 'tiny'\" />\n                </td>\n                <td class=\"align-middle name\">{{ line.productVariant.name }}</td>\n                <td class=\"align-middle sku\">{{ line.productVariant.sku }}</td>\n                <td class=\"align-middle unit-price\">\n                    {{ line.customFields.isCone ? 'Yes' : 'No' }}\n                    <!-- <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                        {{ line.unitPrice | localeCurrency: order.currencyCode }}\n                    </div> -->\n                </td>\n                <td class=\"align-middle quantity\">\n                    <ng-container *ngIf=\"!isDraft; else draft\">\n                        {{ line.quantity }}\n                    </ng-container>\n                    <ng-template #draft>\n                        <div class=\"flex\">\n                            <input\n                                class=\"draft-qty\"\n                                type=\"number\"\n                                min=\"0\"\n                                #qtyInput\n                                [value]=\"line.quantity\"\n                                (blur)=\"draftInputBlur(line, qtyInput.valueAsNumber)\"\n                            />\n                            <button class=\"icon-button\" (click)=\"remove.emit({ lineId: line.id })\">\n                                <clr-icon shape=\"trash\"></clr-icon>\n                            </button>\n                        </div>\n                    </ng-template>\n                    <vdr-line-refunds [line]=\"line\" [payments]=\"order.payments\"></vdr-line-refunds>\n                    <vdr-line-fulfillment [line]=\"line\" [orderState]=\"order.state\"></vdr-line-fulfillment>\n                </td>\n                <td class=\"align-middle total\">\n                    {{ line.linePriceWithTax | localeCurrency: order.currencyCode }}\n                    <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                        {{ line.linePrice | localeCurrency: order.currencyCode }}\n                    </div>\n\n                    <ng-container *ngIf=\"getLineDiscounts(line) as discounts\">\n                        <vdr-dropdown *ngIf=\"discounts.length\">\n                            <div class=\"promotions-label\" vdrDropdownTrigger>\n                                {{ 'order.promotions-applied' | translate }}\n                            </div>\n                            <vdr-dropdown-menu>\n                                <div class=\"line-promotion\" *ngFor=\"let discount of discounts\">\n                                    <a class=\"promotion-name\" [routerLink]=\"getPromotionLink(discount)\">{{\n                                        discount.description\n                                    }}</a>\n                                    <div class=\"promotion-amount\">\n                                        {{ discount.amountWithTax | localeCurrency: order.currencyCode }}\n                                        <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                                            {{ discount.amount | localeCurrency: order.currencyCode }}\n                                        </div>\n                                    </div>\n                                </div>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </ng-container>\n                </td>\n            </tr>\n            <!-- <ng-container *ngIf=\"customFieldsForLine[line.id] as customFields\">\n                <tr *ngIf=\"customFields.length\">\n                    <td colspan=\"6\" class=\"custom-fields-row\">\n                        <div class=\"order-line-custom-fields\">\n                            <div class=\"custom-field\" *ngFor=\"let field of customFields\">\n                                <vdr-custom-field-control\n                                    [compact]=\"true\"\n                                    [readonly]=\"true\"\n                                    [customField]=\"field.config\"\n                                    [customFieldsFormGroup]=\"field.formGroup\"\n                                ></vdr-custom-field-control>\n                            </div>\n                        </div>\n                    </td>\n                </tr>\n            </ng-container> -->\n        </ng-container>\n        <tr class=\"surcharge\" *ngFor=\"let surcharge of order.surcharges\">\n            <td class=\"align-middle name left\" colspan=\"2\">{{ surcharge.description }}</td>\n            <td class=\"align-middle sku\">{{ surcharge.sku }}</td>\n            <td class=\"align-middle\" colspan=\"2\"></td>\n            <td class=\"align-middle total\">\n                {{ surcharge.priceWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ surcharge.price | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n        <ng-container *ngFor=\"let discount of order.discounts\">\n            <tr class=\"order-adjustment\" *ngIf=\"discount.type !== 'OTHER'\">\n                <td colspan=\"5\" class=\"left clr-align-middle\">\n                    <a [routerLink]=\"getPromotionLink(discount)\">{{ discount.description }}</a>\n                    <vdr-chip *ngIf=\"getCouponCodeForAdjustment(order, discount) as couponCode\">{{\n                        couponCode\n                    }}</vdr-chip>\n                </td>\n                <td class=\"clr-align-middle\">\n                    {{ discount.amountWithTax | localeCurrency: order.currencyCode }}\n                    <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                        {{ discount.amount | localeCurrency: order.currencyCode }}\n                    </div>\n                </td>\n            </tr>\n        </ng-container>\n        <tr class=\"sub-total\">\n            <td class=\"left clr-align-middle\">{{ 'order.sub-total' | translate }}</td>\n            <td colspan=\"4\"></td>\n            <td class=\"clr-align-middle\">\n                {{ order.subTotalWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ order.subTotal | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n        <tr class=\"shipping\">\n            <td class=\"left clr-align-middle\">{{ 'order.shipping' | translate }}</td>\n            <td class=\"clr-align-middle\">{{ getShippingNames(order) }}</td>\n            <td colspan=\"3\"></td>\n            <td class=\"clr-align-middle\">\n                {{ order.shippingWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ order.shipping | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n        <tr class=\"total\">\n            <td class=\"left clr-align-middle\">{{ 'order.total' | translate }}</td>\n            <td colspan=\"4\"></td>\n            <td class=\"clr-align-middle\">\n                {{ order.totalWithTax | localeCurrency: order.currencyCode }}\n                <div class=\"net-price\" [title]=\"'order.net-price' | translate\">\n                    {{ order.total | localeCurrency: order.currencyCode }}\n                </div>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".order-table .is-cancelled td{text-decoration:line-through;background-color:var(--color-component-bg-200)}.order-table .sub-total td{border-top:1px dashed var(--color-component-border-200)}.order-table .total td{font-weight:bold;border-top:1px dashed var(--color-component-border-200)}.order-table td.custom-fields-row{border-top-style:dashed;border-top-color:var(--color-grey-200)}.order-table img{border-radius:var(--border-radius-img)}.order-table .order-line-custom-fields{display:flex;flex-wrap:wrap}.order-table .order-line-custom-fields .custom-field{text-align:start;max-width:200px;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px;margin-right:18px}.order-table .draft-qty{max-width:48px}.order-table .order-line-custom-field{background-color:var(--color-component-bg-100)}.order-table .order-line-custom-field .custom-field-ellipsis{color:var(--color-text-300)}.order-table .net-price{font-size:11px;color:var(--color-text-300)}.order-table .promotions-label{-webkit-text-decoration:underline dotted var(--color-text-200);text-decoration:underline dotted var(--color-text-200);font-size:11px;margin-top:6px;cursor:pointer;text-transform:lowercase}.order-table .thumb img{width:50px;height:50px}::ng-deep .line-promotion{display:flex;justify-content:space-between;padding:6px 12px}::ng-deep .line-promotion .promotion-amount{margin-left:12px}::ng-deep .line-promotion .net-price{font-size:11px;color:var(--color-text-300)}\n"]
            },] }
];
OrderTableComponent.propDecorators = {
    order: [{ type: Input }],
    orderLineCustomFields: [{ type: Input }],
    isDraft: [{ type: Input }],
    adjust: [{ type: Output }],
    remove: [{ type: Output }]
};

class PaymentDetailComponent {
}
PaymentDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-detail',
                template: "<vdr-labeled-data [label]=\"'order.payment-method' | translate\">\n    {{ payment.method }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.amount' | translate\">\n    {{ payment.amount | localeCurrency: currencyCode }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"payment.errorMessage\" [label]=\"'order.error-message' | translate\">\n    {{ payment.errorMessage }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"payment.transactionId\" [label]=\"'order.transaction-id' | translate\">\n    {{ payment.transactionId }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.payment-metadata' | translate\">\n    <vdr-object-tree [value]=\"payment.metadata\"></vdr-object-tree>\n</vdr-labeled-data>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
PaymentDetailComponent.propDecorators = {
    payment: [{ type: Input }],
    currencyCode: [{ type: Input }]
};

class PaymentStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'Authorized':
                return 'warning';
            case 'Settled':
                return 'success';
            case 'Declined':
            case 'Cancelled':
                return 'error';
        }
    }
}
PaymentStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-state-label',
                template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Settled'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{font-size:14px}\n"]
            },] }
];
PaymentStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};

class RefundStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'Pending':
                return 'warning';
            case 'Settled':
                return 'success';
            case 'Failed':
                return 'error';
        }
    }
}
RefundStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-refund-state-label',
                template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Settled'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{font-size:14px}\n"]
            },] }
];
RefundStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};

class SimpleItemListComponent {
}
SimpleItemListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-simple-item-list',
                template: "<div class=\"items-list\">\n    <ul>\n        <li *ngFor=\"let item of items\" [title]=\"item.name\">\n            <div class=\"quantity\">{{ item.quantity }}</div>\n            <clr-icon shape=\"times\" size=\"12\"></clr-icon>\n            {{ item.name }}\n        </li>\n    </ul>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".items-list{font-size:12px}.items-list ul{margin-top:6px;list-style-type:none;margin-left:2px}.items-list ul li{line-height:14px;text-overflow:ellipsis;overflow:hidden}.items-list .quantity{min-width:16px;display:inline-block}\n"]
            },] }
];
SimpleItemListComponent.propDecorators = {
    items: [{ type: Input }]
};

/**
 * Resolves the id from the path into a Customer entity.
 */
class OrderResolver {
    constructor(router, dataService) {
        this.router = router;
        this.dataService = dataService;
    }
    /** @internal */
    resolve(route, state) {
        const id = route.paramMap.get('id');
        // Complete the entity stream upon navigating away
        const navigateAway$ = this.router.events.pipe(filter(event => event instanceof ActivationStart));
        const stream = this.dataService.order
            .getOrder(id)
            .mapStream(data => data.order)
            .pipe(switchMap(order => {
            if ((order === null || order === void 0 ? void 0 : order.state) === 'Draft' && route.component !== DraftOrderDetailComponent) {
                // Make sure Draft orders only get displayed with the DraftOrderDetailComponent
                this.router.navigate(['/orders/draft', id]);
                return EMPTY;
            }
            else {
                return [order];
            }
        }), takeUntil(navigateAway$), filter(notNullOrUndefined), shareReplay(1));
        return stream.pipe(take(1), map(() => stream));
    }
}
OrderResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderResolver_Factory() { return new OrderResolver(i0.ɵɵinject(i1$1.Router), i0.ɵɵinject(i1.DataService)); }, token: OrderResolver, providedIn: "root" });
OrderResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

class OrderGuard {
    constructor(dataService, router) {
        this.dataService = dataService;
        this.router = router;
    }
    canActivate(route, state) {
        const isDraft = state.url.includes('orders/draft');
        const id = route.paramMap.get('id');
        if (isDraft) {
            if (id === 'create') {
                return this.dataService.order
                    .createDraftOrder()
                    .pipe(map(({ createDraftOrder }) => this.router.parseUrl(`/orders/draft/${createDraftOrder.id}`)));
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
}
OrderGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrderGuard_Factory() { return new OrderGuard(i0.ɵɵinject(i1.DataService), i0.ɵɵinject(i1$1.Router)); }, token: OrderGuard, providedIn: "root" });
OrderGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OrderGuard.ctorParameters = () => [
    { type: DataService },
    { type: Router }
];

const ɵ0 = {
    breadcrumb: marker('breadcrumb.orders'),
}, ɵ1 = {
    breadcrumb: orderBreadcrumb,
}, ɵ2 = {
    breadcrumb: orderBreadcrumb,
}, ɵ3 = {
    breadcrumb: modifyingOrderBreadcrumb,
};
const orderRoutes = [
    {
        path: '',
        component: OrderListComponent,
        data: ɵ0,
    },
    {
        path: 'draft/:id',
        component: DraftOrderDetailComponent,
        resolve: {
            entity: OrderResolver,
        },
        canActivate: [OrderGuard],
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
    {
        path: ':id',
        component: OrderDetailComponent,
        resolve: {
            entity: OrderResolver,
        },
        canActivate: [OrderGuard],
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ2,
    },
    {
        path: ':id/modify',
        component: OrderEditorComponent,
        resolve: {
            entity: OrderResolver,
        },
        // canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ3,
    },
];
function orderBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.orders',
        getName: order => order.code,
        route: '',
    });
}
function modifyingOrderBreadcrumb(data, params) {
    return orderBreadcrumb(data, params).pipe(map((breadcrumbs) => {
        const modifiedBreadcrumbs = breadcrumbs.slice();
        modifiedBreadcrumbs[0].link[0] = '../';
        modifiedBreadcrumbs[1].link[0] = '../orders';
        return modifiedBreadcrumbs.concat({ label: marker('breadcrumb.modifying'), link: [''] });
    }));
}

class OrderModule {
}
OrderModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(orderRoutes)],
                declarations: [
                    OrderListComponent,
                    OrderDetailComponent,
                    FulfillOrderDialogComponent,
                    LineFulfillmentComponent,
                    RefundOrderDialogComponent,
                    CancelOrderDialogComponent,
                    PaymentStateLabelComponent,
                    LineRefundsComponent,
                    OrderPaymentCardComponent,
                    RefundStateLabelComponent,
                    SettleRefundDialogComponent,
                    OrderHistoryComponent,
                    FulfillmentDetailComponent,
                    PaymentDetailComponent,
                    SimpleItemListComponent,
                    OrderCustomFieldsCardComponent,
                    OrderProcessGraphComponent,
                    OrderProcessNodeComponent,
                    OrderProcessEdgeComponent,
                    OrderProcessGraphDialogComponent,
                    FulfillmentStateLabelComponent,
                    FulfillmentCardComponent,
                    OrderEditorComponent,
                    OrderTableComponent,
                    OrderEditsPreviewDialogComponent,
                    ModificationDetailComponent,
                    AddManualPaymentDialogComponent,
                    OrderStateSelectDialogComponent,
                    DraftOrderDetailComponent,
                    DraftOrderVariantSelectorComponent,
                    SelectCustomerDialogComponent,
                    SelectAddressDialogComponent,
                    CouponCodeSelectorComponent,
                    SelectShippingMethodDialogComponent,
                ],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { AddManualPaymentDialogComponent, CancelOrderDialogComponent, CouponCodeSelectorComponent, DraftOrderDetailComponent, DraftOrderVariantSelectorComponent, FulfillOrderDialogComponent, FulfillmentCardComponent, FulfillmentDetailComponent, FulfillmentStateLabelComponent, GET_CUSTOMER_ADDRESSES, LineFulfillmentComponent, LineRefundsComponent, ModificationDetailComponent, NODE_HEIGHT, OrderCustomFieldsCardComponent, OrderDetailComponent, OrderEditResultType, OrderEditorComponent, OrderEditsPreviewDialogComponent, OrderGuard, OrderHistoryComponent, OrderListComponent, OrderModule, OrderPaymentCardComponent, OrderProcessEdgeComponent, OrderProcessGraphComponent, OrderProcessGraphDialogComponent, OrderProcessNodeComponent, OrderResolver, OrderStateSelectDialogComponent, OrderTableComponent, OrderTransitionService, PaymentDetailComponent, PaymentStateLabelComponent, RefundOrderDialogComponent, RefundStateLabelComponent, SelectAddressDialogComponent, SelectCustomerDialogComponent, SelectShippingMethodDialogComponent, SettleRefundDialogComponent, SimpleItemListComponent, modifyingOrderBreadcrumb, orderBreadcrumb, orderRoutes, ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=vendure-admin-ui-order.js.map
