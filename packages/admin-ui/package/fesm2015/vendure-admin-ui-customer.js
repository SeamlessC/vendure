import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, Output, Injectable, NgModule } from '@angular/core';
import * as i2 from '@vendure/admin-ui/core';
import { DataService, ModalService, BaseDetailComponent, SortOrder, EditNoteDialogComponent, ServerConfigService, NotificationService, BaseListComponent, DeletionResult, HistoryEntryType, LogicalOperator, BaseEntityResolver, createResolveData, CanDeactivateDetailGuard, detailBreadcrumb, SharedModule } from '@vendure/admin-ui/core';
import { BehaviorSubject, Subject, forkJoin, from, EMPTY, combineLatest, of } from 'rxjs';
import { switchMap, map, filter, take, shareReplay, merge, startWith, mergeMap, concatMap, debounceTime, takeUntil, distinctUntilChanged, tap, mapTo } from 'rxjs/operators';
import { __rest } from 'tslib';
import { Validators, FormArray, FormControl, FormBuilder } from '@angular/forms';
import * as i1 from '@angular/router';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { SortOrder as SortOrder$1 } from '@vendure/common/lib/generated-shop-types';

class AddCustomerToGroupDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedCustomerIds = [];
        this.fetchGroupMembers$ = new BehaviorSubject({
            skip: 0,
            take: 10,
            filterTerm: '',
        });
    }
    ngOnInit() {
        const customerResult$ = this.fetchGroupMembers$.pipe(switchMap(({ skip, take, filterTerm }) => {
            return this.dataService.customer
                .getCustomerList(take, skip, filterTerm)
                .mapStream((res) => res.customers);
        }));
        this.customers$ = customerResult$.pipe(map((res) => res.items));
        this.customersTotal$ = customerResult$.pipe(map((res) => res.totalItems));
    }
    cancel() {
        this.resolveWith();
    }
    add() {
        this.resolveWith(this.selectedCustomerIds);
    }
}
AddCustomerToGroupDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-add-customer-to-group-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'customer.add-customers-to-group-with-name' | translate: {groupName: group.name} }}\n</ng-template>\n\n<vdr-customer-group-member-list\n    [members]=\"customers$ | async\"\n    [totalItems]=\"customersTotal$ | async\"\n    [route]=\"route\"\n    [selectedMemberIds]=\"selectedCustomerIds\"\n    (fetchParamsChange)=\"fetchGroupMembers$.next($event)\"\n    (selectionChange)=\"selectedCustomerIds = $event\"\n>\n\n</vdr-customer-group-member-list>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedCustomerIds.length\" class=\"btn btn-primary\">\n        {{ 'customer.add-customers-to-group-with-count' | translate: {count: selectedCustomerIds.length} }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AddCustomerToGroupDialogComponent.ctorParameters = () => [
    { type: DataService }
];

class AddressDetailDialogComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.availableCountries = [];
    }
    ngOnInit() {
        this.addressForm.valueChanges.subscribe(() => this.changeDetector.markForCheck());
    }
    cancel() {
        this.resolveWith();
    }
    save() {
        this.resolveWith(this.addressForm);
    }
}
AddressDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-address-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"addressForm.get('streetLine1')?.value as streetLine1\">{{ streetLine1 }},</span>\n    <span *ngIf=\"addressForm.get('countryCode')?.value as countryCode\"> {{ countryCode }}</span>\n</ng-template>\n\n<vdr-address-form\n    [formGroup]=\"addressForm\"\n    [availableCountries]=\"availableCountries\"\n    [customFields]=\"customFields\"\n></vdr-address-form>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"save()\"\n        [disabled]=\"!addressForm.valid || !addressForm.touched\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-input-container{margin-bottom:12px}\n"]
            },] }
];
AddressDetailDialogComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

class AddressCardComponent {
    constructor(modalService, changeDetector) {
        this.modalService = modalService;
        this.changeDetector = changeDetector;
        this.availableCountries = [];
        this.editable = true;
        this.setAsDefaultShipping = new EventEmitter();
        this.setAsDefaultBilling = new EventEmitter();
        this.deleteAddress = new EventEmitter();
        this.dataDependenciesPopulated = new BehaviorSubject(false);
    }
    ngOnInit() {
        const streetLine1 = this.addressForm.get('streetLine1');
        // Make the address dialog display automatically if there is no address line
        // as is the case when adding a new address.
        if (!streetLine1.value) {
            this.dataDependenciesPopulated
                .pipe(filter(value => value), take(1))
                .subscribe(() => {
                this.editAddress();
            });
        }
    }
    ngOnChanges(changes) {
        if (this.customFields != null && this.availableCountries != null) {
            this.dataDependenciesPopulated.next(true);
        }
    }
    getCountryName(countryCode) {
        if (!this.availableCountries) {
            return '';
        }
        const match = this.availableCountries.find(c => c.code === countryCode);
        return match ? match.name : '';
    }
    setAsDefaultBillingAddress() {
        this.setAsDefaultBilling.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    setAsDefaultShippingAddress() {
        this.setAsDefaultShipping.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    delete() {
        this.deleteAddress.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    editAddress() {
        this.modalService
            .fromComponent(AddressDetailDialogComponent, {
            locals: {
                addressForm: this.addressForm,
                customFields: this.customFields,
                availableCountries: this.availableCountries,
            },
            size: 'md',
            closable: true,
        })
            .subscribe(() => {
            this.changeDetector.markForCheck();
        });
    }
}
AddressCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-address-card',
                template: "<div class=\"card\" *ngIf=\"addressForm.value as address\">\n    <div class=\"card-header\">\n        <div class=\"address-title\">\n            <span class=\"street-line\" *ngIf=\"address.streetLine1\">{{ address.streetLine1 }},</span>\n            {{ address.countryCode }}\n        </div>\n        <div class=\"default-controls\">\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultShipping\">\n                <clr-icon shape=\"truck\"></clr-icon>\n                {{ 'customer.default-shipping-address' | translate }}\n            </vdr-chip>\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultBilling\">\n                <clr-icon shape=\"credit-card\"></clr-icon>\n                {{ 'customer.default-billing-address' | translate }}\n            </vdr-chip>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text\">\n            <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <vdr-entity-info [entity]=\"address\"></vdr-entity-info>\n        <ng-container *ngIf=\"editable\">\n            <button class=\"btn btn-sm btn-link\" (click)=\"editAddress()\">\n                {{ 'common.edit' | translate }}\n            </button>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-sm btn-link\" vdrDropdownTrigger>\n                    {{ 'common.more' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultShipping\"\n                        (click)=\"setAsDefaultShippingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-shipping-address' | translate }}\n                    </button>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultBilling\"\n                        (click)=\"setAsDefaultBillingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-billing-address' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"delete()\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;max-width:360px}clr-input-container{margin-bottom:12px}.defaul-controls{display:flex}.is-default{margin:0;color:var(--color-success-500)}\n"]
            },] }
];
AddressCardComponent.ctorParameters = () => [
    { type: ModalService },
    { type: ChangeDetectorRef }
];
AddressCardComponent.propDecorators = {
    addressForm: [{ type: Input }],
    customFields: [{ type: Input }],
    availableCountries: [{ type: Input }],
    isDefaultBilling: [{ type: Input }],
    isDefaultShipping: [{ type: Input }],
    editable: [{ type: Input }],
    setAsDefaultShipping: [{ type: Output }],
    setAsDefaultBilling: [{ type: Output }],
    deleteAddress: [{ type: Output }]
};

class SelectCustomerGroupDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedGroupIds = [];
    }
    ngOnInit() {
        this.groups$ = this.dataService.customer
            .getCustomerGroupList()
            .mapStream((res) => res.customerGroups.items);
    }
    cancel() {
        this.resolveWith();
    }
    add() {
        this.resolveWith(this.selectedGroupIds);
    }
}
SelectCustomerGroupDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-customer-group-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'customer.add-customer-to-group' | translate }}\n</ng-template>\n\n<ng-select\n    [items]=\"groups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"true\"\n    bindValue=\"id\"\n    [(ngModel)]=\"selectedGroupIds\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedGroupIds.length\" class=\"btn btn-primary\">\n        {{ 'customer.add-customer-to-groups-with-count' | translate: {count: selectedGroupIds.length} }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
SelectCustomerGroupDialogComponent.ctorParameters = () => [
    { type: DataService }
];

class CustomerDetailComponent extends BaseDetailComponent {
    constructor(route, router, serverConfigService, changeDetector, formBuilder, dataService, modalService, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.fetchHistory = new Subject();
        this.addressesToDeleteIds = new Set();
        this.addressDefaultsUpdated = false;
        this.ordersPerPage = 10;
        this.currentOrdersPage = 1;
        this.orderListUpdates$ = new Subject();
        this.customFields = this.getCustomFieldConfig('Customer');
        this.addressCustomFields = this.getCustomFieldConfig('Address');
        this.detailForm = this.formBuilder.group({
            customer: this.formBuilder.group({
                title: '',
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                phoneNumber: '',
                emailAddress: ['', [Validators.required, Validators.email]],
                password: '',
                customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
            }),
            addresses: new FormArray([]),
        });
    }
    ngOnInit() {
        this.init();
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(result => result.countries.items)
            .pipe(shareReplay(1));
        const customerWithUpdates$ = this.entity$.pipe(merge(this.orderListUpdates$));
        this.orders$ = customerWithUpdates$.pipe(map(customer => customer.orders.items));
        this.ordersCount$ = this.entity$.pipe(map(customer => customer.orders.totalItems));
        this.history$ = this.fetchHistory.pipe(startWith(null), switchMap(() => {
            return this.dataService.customer
                .getCustomerHistory(this.id, {
                sort: {
                    createdAt: SortOrder.DESC,
                },
            })
                .mapStream(data => { var _a; return (_a = data.customer) === null || _a === void 0 ? void 0 : _a.history.items; });
        }));
    }
    ngOnDestroy() {
        this.destroy();
        this.orderListUpdates$.complete();
    }
    getAddressFormControls() {
        const formArray = this.detailForm.get(['addresses']);
        return formArray.controls;
    }
    setDefaultBillingAddressId(id) {
        this.defaultBillingAddressId = id;
        this.addressDefaultsUpdated = true;
    }
    setDefaultShippingAddressId(id) {
        this.defaultShippingAddressId = id;
        this.addressDefaultsUpdated = true;
    }
    toggleDeleteAddress(id) {
        if (this.addressesToDeleteIds.has(id)) {
            this.addressesToDeleteIds.delete(id);
        }
        else {
            this.addressesToDeleteIds.add(id);
        }
    }
    addAddress() {
        const addressFormArray = this.detailForm.get('addresses');
        const newAddress = this.formBuilder.group({
            fullName: '',
            company: '',
            streetLine1: ['', Validators.required],
            streetLine2: '',
            city: '',
            province: '',
            postalCode: '',
            countryCode: ['', Validators.required],
            phoneNumber: '',
            defaultShippingAddress: false,
            defaultBillingAddress: false,
        });
        if (this.addressCustomFields.length) {
            const customFieldsGroup = this.formBuilder.group({});
            for (const fieldDef of this.addressCustomFields) {
                customFieldsGroup.addControl(fieldDef.name, new FormControl(''));
            }
            newAddress.addControl('customFields', customFieldsGroup);
        }
        addressFormArray.push(newAddress);
    }
    setOrderItemsPerPage(itemsPerPage) {
        this.ordersPerPage = +itemsPerPage;
        this.fetchOrdersList();
    }
    setOrderCurrentPage(page) {
        this.currentOrdersPage = +page;
        this.fetchOrdersList();
    }
    create() {
        var _a;
        const customerForm = this.detailForm.get('customer');
        if (!customerForm) {
            return;
        }
        const formValue = customerForm.value;
        const customFields = (_a = customerForm.get('customFields')) === null || _a === void 0 ? void 0 : _a.value;
        const customer = {
            title: formValue.title,
            emailAddress: formValue.emailAddress,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            phoneNumber: formValue.phoneNumber,
            customFields,
        };
        this.dataService.customer
            .createCustomer(customer, formValue.password)
            .subscribe(({ createCustomer }) => {
            switch (createCustomer.__typename) {
                case 'Customer':
                    this.notificationService.success(marker('common.notify-create-success'), {
                        entity: 'Customer',
                    });
                    if (createCustomer.emailAddress && !formValue.password) {
                        this.notificationService.notify({
                            message: marker('customer.email-verification-sent'),
                            translationVars: { emailAddress: formValue.emailAddress },
                            type: 'info',
                            duration: 10000,
                        });
                    }
                    this.detailForm.markAsPristine();
                    this.addressDefaultsUpdated = false;
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', createCustomer.id], { relativeTo: this.route });
                    break;
                case 'EmailAddressConflictError':
                    this.notificationService.error(createCustomer.message);
            }
        });
    }
    save() {
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            var _a;
            const saveOperations = [];
            const customerForm = this.detailForm.get('customer');
            if (customerForm && customerForm.dirty) {
                const formValue = customerForm.value;
                const customFields = (_a = customerForm.get('customFields')) === null || _a === void 0 ? void 0 : _a.value;
                const customer = {
                    id,
                    title: formValue.title,
                    emailAddress: formValue.emailAddress,
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
                    phoneNumber: formValue.phoneNumber,
                    customFields,
                };
                saveOperations.push(this.dataService.customer
                    .updateCustomer(customer)
                    .pipe(map(res => res.updateCustomer)));
            }
            const addressFormArray = this.detailForm.get('addresses');
            if ((addressFormArray && addressFormArray.dirty) || this.addressDefaultsUpdated) {
                for (const addressControl of addressFormArray.controls) {
                    if (addressControl.dirty || this.addressDefaultsUpdated) {
                        const address = addressControl.value;
                        const input = {
                            fullName: address.fullName,
                            company: address.company,
                            streetLine1: address.streetLine1,
                            streetLine2: address.streetLine2,
                            city: address.city,
                            province: address.province,
                            postalCode: address.postalCode,
                            countryCode: address.countryCode,
                            phoneNumber: address.phoneNumber,
                            defaultShippingAddress: this.defaultShippingAddressId === address.id,
                            defaultBillingAddress: this.defaultBillingAddressId === address.id,
                            customFields: address.customFields,
                        };
                        if (!address.id) {
                            saveOperations.push(this.dataService.customer
                                .createCustomerAddress(id, input)
                                .pipe(map(res => res.createCustomerAddress)));
                        }
                        else {
                            if (this.addressesToDeleteIds.has(address.id)) {
                                saveOperations.push(this.dataService.customer
                                    .deleteCustomerAddress(address.id)
                                    .pipe(map(res => res.deleteCustomerAddress)));
                            }
                            else {
                                saveOperations.push(this.dataService.customer
                                    .updateCustomerAddress(Object.assign(Object.assign({}, input), { id: address.id }))
                                    .pipe(map(res => res.updateCustomerAddress)));
                            }
                        }
                    }
                }
            }
            return forkJoin(saveOperations);
        }))
            .subscribe(data => {
            let notified = false;
            for (const result of data) {
                switch (result.__typename) {
                    case 'Customer':
                    case 'Address':
                    case 'Success':
                        if (!notified) {
                            this.notificationService.success(marker('common.notify-update-success'), {
                                entity: 'Customer',
                            });
                            notified = true;
                            this.detailForm.markAsPristine();
                            this.addressDefaultsUpdated = false;
                            this.changeDetector.markForCheck();
                            this.fetchHistory.next();
                            this.dataService.customer.getCustomer(this.id).single$.subscribe();
                        }
                        break;
                    case 'EmailAddressConflictError':
                        this.notificationService.error(result.message);
                        break;
                }
            }
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Customer',
            });
        });
    }
    addToGroup() {
        this.modalService
            .fromComponent(SelectCustomerGroupDialogComponent, {
            size: 'md',
        })
            .pipe(switchMap(groupIds => (groupIds ? from(groupIds) : EMPTY)), concatMap(groupId => this.dataService.customer.addCustomersToGroup(groupId, [this.id])))
            .subscribe({
            next: res => {
                this.notificationService.success(marker(`customer.add-customers-to-group-success`), {
                    customerCount: 1,
                    groupName: res.addCustomersToGroup.name,
                });
            },
            complete: () => {
                this.dataService.customer.getCustomer(this.id, { take: 0 }).single$.subscribe();
                this.fetchHistory.next();
            },
        });
    }
    removeFromGroup(group) {
        this.modalService
            .dialog({
            title: marker('customer.confirm-remove-customer-from-group'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response
            ? this.dataService.customer.removeCustomersFromGroup(group.id, [this.id])
            : EMPTY), switchMap(() => this.dataService.customer.getCustomer(this.id, { take: 0 }).single$))
            .subscribe(result => {
            this.notificationService.success(marker(`customer.remove-customers-from-group-success`), {
                customerCount: 1,
                groupName: group.name,
            });
            this.fetchHistory.next();
        });
    }
    addNoteToCustomer({ note }) {
        this.dataService.customer.addNoteToCustomer(this.id, note).subscribe(() => {
            this.fetchHistory.next();
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
                displayPrivacyControls: false,
                note: entry.data.note,
            },
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.dataService.customer.updateCustomerNote({
                    noteId: entry.id,
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
            .pipe(switchMap(res => (res ? this.dataService.customer.deleteCustomerNote(entry.id) : EMPTY)))
            .subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Note',
            });
        });
    }
    setFormValues(entity) {
        var _a;
        const customerGroup = this.detailForm.get('customer');
        if (customerGroup) {
            customerGroup.patchValue({
                title: entity.title,
                firstName: entity.firstName,
                lastName: entity.lastName,
                phoneNumber: entity.phoneNumber,
                emailAddress: entity.emailAddress,
            });
        }
        if (entity.addresses) {
            const addressesArray = new FormArray([]);
            for (const address of entity.addresses) {
                const _b = address, { customFields } = _b, rest = __rest(_b, ["customFields"]);
                const addressGroup = this.formBuilder.group(Object.assign(Object.assign({}, rest), { countryCode: address.country.code }));
                addressesArray.push(addressGroup);
                if (address.defaultShippingAddress) {
                    this.defaultShippingAddressId = address.id;
                }
                if (address.defaultBillingAddress) {
                    this.defaultBillingAddressId = address.id;
                }
                if (this.addressCustomFields.length) {
                    const customFieldsGroup = this.formBuilder.group({});
                    for (const fieldDef of this.addressCustomFields) {
                        const key = fieldDef.name;
                        const value = (_a = address.customFields) === null || _a === void 0 ? void 0 : _a[key];
                        const control = new FormControl(value);
                        customFieldsGroup.addControl(key, control);
                    }
                    addressGroup.addControl('customFields', customFieldsGroup);
                }
            }
            this.detailForm.setControl('addresses', addressesArray);
        }
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get(['customer', 'customFields']), entity);
        }
        this.changeDetector.markForCheck();
    }
    /**
     * Refetch the customer with the current order list settings.
     */
    fetchOrdersList() {
        this.dataService.customer
            .getCustomer(this.id, {
            take: this.ordersPerPage,
            skip: (this.currentOrdersPage - 1) * this.ordersPerPage,
        })
            .single$.pipe(map(data => data.customer), filter(notNullOrUndefined))
            .subscribe(result => this.orderListUpdates$.next(result));
    }
}
CustomerDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-customer-status-label [customer]=\"entity$ | async\"></vdr-customer-status-label>\n            <div\n                class=\"last-login\"\n                *ngIf=\"(entity$ | async)?.user?.lastLogin as lastLogin\"\n                [title]=\"lastLogin | localeDate: 'medium'\"\n            >\n                {{ 'customer.last-login' | translate }}: {{ lastLogin | timeAgo }}\n            </div>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!(addressDefaultsUpdated || (detailForm.valid && detailForm.dirty))\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"'UpdateCustomer'\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!(addressDefaultsUpdated || (detailForm.valid && detailForm.dirty))\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm.get('customer')\">\n    <vdr-form-field [label]=\"'customer.title' | translate\" for=\"title\" [readOnlyToggle]=\"!(isNew$ | async)\">\n        <input id=\"title\" type=\"text\" formControlName=\"title\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.first-name' | translate\"\n        for=\"firstName\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"firstName\" type=\"text\" formControlName=\"firstName\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.last-name' | translate\"\n        for=\"lastName\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"lastName\" type=\"text\" formControlName=\"lastName\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.email-address' | translate\"\n        for=\"emailAddress\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.phone-number' | translate\"\n        for=\"phoneNumber\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"phoneNumber\" type=\"text\" formControlName=\"phoneNumber\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'customer.password' | translate\" for=\"password\" *ngIf=\"isNew$ | async\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Customer\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get(['customer', 'customFields'])\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"customer-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n\n<div class=\"groups\" *ngIf=\"(entity$ | async)?.groups as groups\">\n    <label class=\"clr-control-label\">{{ 'customer.customer-groups' | translate }}</label>\n    <ng-container *ngIf=\"groups.length; else noGroups\">\n        <vdr-chip\n            *ngFor=\"let group of groups\"\n            [colorFrom]=\"group.id\"\n            icon=\"times\"\n            (iconClick)=\"removeFromGroup(group)\"\n            >{{ group.name }}</vdr-chip\n        >\n    </ng-container>\n    <ng-template #noGroups>\n        {{ 'customer.not-a-member-of-any-groups' | translate }}\n    </ng-template>\n    <div>\n        <button\n            class=\"btn btn-sm btn-secondary\"\n            (click)=\"addToGroup()\"\n            *vdrIfPermissions=\"'UpdateCustomerGroup'\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.add-customer-to-group' | translate }}\n        </button>\n    </div>\n</div>\n\n<div class=\"clr-row\" *ngIf=\"!(isNew$ | async)\">\n    <div class=\"clr-col-md-4\">\n        <h3>{{ 'customer.addresses' | translate }}</h3>\n        <vdr-address-card\n            *ngFor=\"let addressForm of getAddressFormControls()\"\n            [class.to-delete]=\"addressesToDeleteIds.has(addressForm.value.id)\"\n            [availableCountries]=\"availableCountries$ | async\"\n            [isDefaultBilling]=\"defaultBillingAddressId === addressForm.value.id\"\n            [isDefaultShipping]=\"defaultShippingAddressId === addressForm.value.id\"\n            [addressForm]=\"addressForm\"\n            [customFields]=\"addressCustomFields\"\n            [editable]=\"(['UpdateCustomer'] | hasPermission) && !addressesToDeleteIds.has(addressForm.value.id)\"\n            (setAsDefaultBilling)=\"setDefaultBillingAddressId($event)\"\n            (setAsDefaultShipping)=\"setDefaultShippingAddressId($event)\"\n            (deleteAddress)=\"toggleDeleteAddress($event)\"\n        ></vdr-address-card>\n        <button class=\"btn btn-secondary\" (click)=\"addAddress()\" *vdrIfPermissions=\"'UpdateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-address' | translate }}\n        </button>\n    </div>\n    <div class=\"clr-col-md-8\">\n        <h3>{{ 'customer.orders' | translate }}</h3>\n        <vdr-data-table\n            [items]=\"orders$ | async\"\n            [itemsPerPage]=\"ordersPerPage\"\n            [totalItems]=\"ordersCount$ | async\"\n            [currentPage]=\"currentOrdersPage\"\n            [emptyStateLabel]=\"'customer.no-orders-placed' | translate\"\n            (itemsPerPageChange)=\"setOrderItemsPerPage($event)\"\n            (pageChange)=\"setOrderCurrentPage($event)\"\n        >\n            <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'common.updated-at' | translate }}</vdr-dt-column>\n            <vdr-dt-column></vdr-dt-column>\n            <ng-template let-order=\"item\">\n                <td class=\"left\">{{ order.code }}</td>\n                <td class=\"left\">{{ order.state }}</td>\n                <td class=\"left\">{{ order.totalWithTax | localeCurrency: order.currencyCode }}</td>\n                <td class=\"left\">{{ order.updatedAt | localeDate: 'medium' }}</td>\n                <td class=\"right\">\n                    <vdr-table-row-action\n                        iconShape=\"shopping-cart\"\n                        [label]=\"'common.open' | translate\"\n                        [linkTo]=\"['/orders/', order.id]\"\n                    ></vdr-table-row-action>\n                </td>\n            </ng-template>\n        </vdr-data-table>\n    </div>\n</div>\n<div class=\"clr-row\" *ngIf=\"!(isNew$ | async)\">\n    <div class=\"clr-col-md-6\">\n        <vdr-customer-history\n            [customer]=\"entity$ | async\"\n            [history]=\"history$ | async\"\n            (addNote)=\"addNoteToCustomer($event)\"\n            (updateNote)=\"updateNote($event)\"\n            (deleteNote)=\"deleteNote($event)\"\n        ></vdr-customer-history>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".last-login{margin-left:6px;color:var(--color-grey-500)}.to-delete{opacity:.5}\n"]
            },] }
];
CustomerDetailComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: FormBuilder },
    { type: DataService },
    { type: ModalService },
    { type: NotificationService }
];

class CustomerGroupDetailDialogComponent {
    constructor(serverConfigService, formBuilder) {
        this.serverConfigService = serverConfigService;
        this.formBuilder = formBuilder;
        this.customFields = this.serverConfigService.getCustomFieldsFor('CustomerGroup');
    }
    ngOnInit() {
        var _a;
        this.form = this.formBuilder.group({
            name: [this.group.name, Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.form.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = (_a = this.group.customFields) === null || _a === void 0 ? void 0 : _a[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
    }
    cancel() {
        this.resolveWith();
    }
    save() {
        this.resolveWith(this.form.value);
    }
}
CustomerGroupDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"group.id\">{{ 'customer.update-customer-group' | translate }}</span>\n    <span *ngIf=\"!group.id\">{{ 'customer.create-customer-group' | translate }}</span>\n</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(['CreateCustomerGroup', 'UpdateCustomerGroup'] | hasPermission)\"\n        />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"CustomerGroup\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"form.get('customFields')\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\n        <span *ngIf=\"group.id\">{{ 'customer.update-customer-group' | translate }}</span>\n        <span *ngIf=\"!group.id\">{{ 'customer.create-customer-group' | translate }}</span>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupDetailDialogComponent.ctorParameters = () => [
    { type: ServerConfigService },
    { type: FormBuilder }
];

class CustomerGroupListComponent extends BaseListComponent {
    constructor(dataService, notificationService, modalService, route, router) {
        super(router, route);
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.searchTerm = new FormControl('');
        this.selectedCustomerIds = [];
        this.fetchGroupMembers$ = new BehaviorSubject({
            skip: 0,
            take: 0,
            filterTerm: '',
        });
        this.refreshActiveGroupMembers$ = new BehaviorSubject(undefined);
        super.setQueryFn((...args) => this.dataService.customer.getCustomerGroupList(...args).refetchOnChannelChange(), data => data.customerGroups, (skip, take) => ({
            options: {
                skip,
                take,
                filter: {
                    name: { contains: this.searchTerm.value },
                },
            },
        }));
    }
    ngOnInit() {
        super.ngOnInit();
        this.searchTerm.valueChanges
            .pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
        const activeGroupId$ = this.route.paramMap.pipe(map(pm => pm.get('contents')), distinctUntilChanged(), tap(() => (this.selectedCustomerIds = [])));
        this.listIsEmpty$ = this.items$.pipe(map(groups => groups.length === 0));
        this.activeGroup$ = combineLatest(this.items$, activeGroupId$).pipe(map(([groups, activeGroupId]) => {
            if (activeGroupId) {
                return groups.find(g => g.id === activeGroupId);
            }
        }), tap(val => (this.activeGroupId = val === null || val === void 0 ? void 0 : val.id)));
        const membersResult$ = combineLatest(this.activeGroup$, this.fetchGroupMembers$, this.refreshActiveGroupMembers$).pipe(switchMap(([activeGroup, { skip, take, filterTerm }]) => {
            if (activeGroup) {
                return this.dataService.customer
                    .getCustomerGroupWithCustomers(activeGroup.id, {
                    skip,
                    take,
                    filter: {
                        emailAddress: {
                            contains: filterTerm,
                        },
                    },
                })
                    .mapStream(res => { var _a; return (_a = res.customerGroup) === null || _a === void 0 ? void 0 : _a.customers; });
            }
            else {
                return of(undefined);
            }
        }));
        this.members$ = membersResult$.pipe(map(res => { var _a; return (_a = res === null || res === void 0 ? void 0 : res.items) !== null && _a !== void 0 ? _a : []; }));
        this.membersTotal$ = membersResult$.pipe(map(res => { var _a; return (_a = res === null || res === void 0 ? void 0 : res.totalItems) !== null && _a !== void 0 ? _a : 0; }));
    }
    create() {
        this.modalService
            .fromComponent(CustomerGroupDetailDialogComponent, { locals: { group: { name: '' } } })
            .pipe(switchMap(result => result
            ? this.dataService.customer.createCustomerGroup(Object.assign(Object.assign({}, result), { customerIds: [] }))
            : EMPTY))
            .subscribe(() => {
            this.refresh();
            this.notificationService.success(marker('common.notify-create-success'), {
                entity: 'CustomerGroup',
            });
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'CustomerGroup',
            });
        });
    }
    delete(groupId) {
        this.modalService
            .dialog({
            title: marker('customer.confirm-delete-customer-group'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.dataService.customer.deleteCustomerGroup(groupId) : EMPTY), switchMap(result => {
            if (result.deleteCustomerGroup.result === DeletionResult.DELETED) {
                // refresh list
                return this.dataService.customer
                    .getCustomerGroupList()
                    .mapSingle(() => ({ errorMessage: false }));
            }
            else {
                return of({ errorMessage: result.deleteCustomerGroup.message });
            }
        }))
            .subscribe(result => {
            if (typeof result.errorMessage === 'string') {
                this.notificationService.error(result.errorMessage);
            }
            else {
                this.refresh();
                this.notificationService.success(marker('common.notify-delete-success'), {
                    entity: 'CustomerGroup',
                });
            }
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'CustomerGroup',
            });
        });
    }
    update(group) {
        this.modalService
            .fromComponent(CustomerGroupDetailDialogComponent, { locals: { group } })
            .pipe(switchMap(result => result
            ? this.dataService.customer.updateCustomerGroup(Object.assign({ id: group.id }, result))
            : EMPTY))
            .subscribe(() => {
            this.refresh();
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'CustomerGroup',
            });
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'CustomerGroup',
            });
        });
    }
    closeMembers() {
        const params = Object.assign({}, this.route.snapshot.params);
        delete params.contents;
        this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    addToGroup(group) {
        this.modalService
            .fromComponent(AddCustomerToGroupDialogComponent, {
            locals: {
                group,
                route: this.route,
            },
            size: 'md',
            verticalAlign: 'top',
        })
            .pipe(switchMap(customerIds => customerIds
            ? this.dataService.customer
                .addCustomersToGroup(group.id, customerIds)
                .pipe(mapTo(customerIds))
            : EMPTY))
            .subscribe({
            next: result => {
                this.notificationService.success(marker(`customer.add-customers-to-group-success`), {
                    customerCount: result.length,
                    groupName: group.name,
                });
                this.refreshActiveGroupMembers$.next();
                this.selectedCustomerIds = [];
            },
        });
    }
    removeFromGroup(group, customerIds) {
        this.dataService.customer.removeCustomersFromGroup(group.id, customerIds).subscribe({
            complete: () => {
                this.notificationService.success(marker(`customer.remove-customers-from-group-success`), {
                    customerCount: customerIds.length,
                    groupName: group.name,
                });
                this.refreshActiveGroupMembers$.next();
                this.selectedCustomerIds = [];
            },
        });
    }
}
CustomerGroupListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"emailSearchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'customer.search-by-group-name' | translate\"\n            class=\"search-input\"\n        />\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-group-list\"></vdr-action-bar-items>\n        <button class=\"btn btn-primary\" *vdrIfPermissions=\"'CreateCustomerGroup'\" (click)=\"create()\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-customer-group' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"group-wrapper\">\n    <div class=\"group-list\">\n        <vdr-data-table\n            [class.expanded]=\"activeGroup$ | async\"\n            [items]=\"items$ | async\"\n            [itemsPerPage]=\"itemsPerPage$ | async\"\n            [totalItems]=\"totalItems$ | async\"\n            [currentPage]=\"currentPage$ | async\"\n            (pageChange)=\"setPageNumber($event)\"\n            (itemsPerPageChange)=\"setItemsPerPage($event)\"\n        >\n            <ng-template let-group=\"item\">\n                <td class=\"left align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <vdr-entity-info [entity]=\"group\"></vdr-entity-info>\n                </td>\n                <td class=\"left align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <vdr-chip [colorFrom]=\"group.id\">{{ group.name }}</vdr-chip>\n                </td>\n                <td class=\"left align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <a\n                        class=\"btn btn-link btn-sm\"\n                        [routerLink]=\"['./', { contents: group.id }]\"\n                        queryParamsHandling=\"preserve\"\n                    >\n                        <clr-icon shape=\"view-list\"></clr-icon>\n                        {{ 'customer.view-group-members' | translate }}\n                    </a>\n                </td>\n                <td class=\"right align-middle\" [class.active]=\"group.id === activeGroupId\">\n                    <button class=\"btn btn-link btn-sm\" (click)=\"update(group)\">\n                        <clr-icon shape=\"edit\"></clr-icon>\n                        {{ 'common.edit' | translate }}\n                    </button>\n                </td>\n                <td [class.active]=\"group.id === activeGroupId\" class=\"align-middle\">\n                    <vdr-dropdown>\n                        <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                            {{ 'common.actions' | translate }}\n                            <clr-icon shape=\"caret down\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"delete(group.id)\"\n                                [disabled]=\"!('DeleteCustomerGroup' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'common.delete' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </td>\n            </ng-template>\n        </vdr-data-table>\n    </div>\n    <ng-template #emptyPlaceholder>\n        <vdr-empty-placeholder></vdr-empty-placeholder>\n    </ng-template>\n    <div class=\"group-members\" [class.expanded]=\"activeGroup$ | async\">\n        <ng-container *ngIf=\"activeGroup$ | async as activeGroup\">\n            <div class=\"flex\">\n                <div class=\"header-title-row\">{{ activeGroup.name }} ({{ membersTotal$ | async }})</div>\n                <div class=\"flex-spacer\"></div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeMembers()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </div>\n            <div class=\"controls\">\n                <vdr-dropdown>\n                    <button\n                        type=\"button\"\n                        class=\"btn btn-secondary btn-sm\"\n                        vdrDropdownTrigger\n                        [disabled]=\"selectedCustomerIds.length === 0\"\n                    >\n                        {{ 'common.with-selected' | translate: { count: selectedCustomerIds.length } }}\n                        <clr-icon shape=\"caret down\"></clr-icon>\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                        <button\n                            type=\"button\"\n                            class=\"delete-button\"\n                            (click)=\"removeFromGroup(activeGroup, selectedCustomerIds)\"\n                            vdrDropdownItem\n                            [disabled]=\"!('UpdateCustomerGroup' | hasPermission)\"\n                        >\n                            <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                            {{ 'customer.remove-from-group' | translate }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n                <button class=\"btn btn-secondary btn-sm\" (click)=\"addToGroup(activeGroup)\">\n                    {{ 'customer.add-customers-to-group' | translate: { groupName: activeGroup.name } }}\n                </button>\n            </div>\n            <vdr-customer-group-member-list\n                [members]=\"members$ | async\"\n                [route]=\"route\"\n                [totalItems]=\"membersTotal$ | async\"\n                [selectedMemberIds]=\"selectedCustomerIds\"\n                (selectionChange)=\"selectedCustomerIds = $event\"\n                (fetchParamsChange)=\"fetchGroupMembers$.next($event)\"\n            ></vdr-customer-group-member-list>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".group-wrapper{display:flex;height:calc(100% - 50px)}.group-wrapper .group-list{flex:1;overflow:auto;margin-top:0}.group-wrapper .group-list .active{background-color:var(--clr-global-selection-color)}.group-wrapper .group-list.expanded{width:calc(100% - 40vw)}vdr-data-table ::ng-deep table{margin-top:0}.group-members{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.group-members.expanded{width:40vw;visibility:visible;opacity:1;padding-left:12px}.group-members .close-button{margin:0;background:none;border:none;cursor:pointer}.group-members ::ng-deep table.table{margin-top:0}.group-members ::ng-deep table.table th{top:0}.group-members .controls{display:flex;justify-content:space-between}vdr-empty-placeholder{flex:1}\n"]
            },] }
];
CustomerGroupListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: ActivatedRoute },
    { type: Router }
];

class CustomerGroupMemberListComponent {
    constructor(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.selectedMemberIds = [];
        this.selectionChange = new EventEmitter();
        this.fetchParamsChange = new EventEmitter();
        this.filterTermControl = new FormControl('');
        this.refresh$ = new BehaviorSubject(true);
        this.destroy$ = new Subject();
        this.isMemberSelected = (member) => {
            return -1 < this.selectedMemberIds.indexOf(member.id);
        };
    }
    ngOnInit() {
        this.membersCurrentPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('membersPage')), map(page => (!page ? 1 : +page)), startWith(1), distinctUntilChanged());
        this.membersItemsPerPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('membersPerPage')), map(perPage => (!perPage ? 10 : +perPage)), startWith(10), distinctUntilChanged());
        const filterTerm$ = this.filterTermControl.valueChanges.pipe(debounceTime(250), tap(() => this.setContentsPageNumber(1)), startWith(''));
        combineLatest(this.membersCurrentPage$, this.membersItemsPerPage$, filterTerm$, this.refresh$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([currentPage, itemsPerPage, filterTerm]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            this.fetchParamsChange.emit({
                filterTerm,
                skip,
                take,
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setContentsPageNumber(page) {
        this.setParam('membersPage', page);
    }
    setContentsItemsPerPage(perPage) {
        this.setParam('membersPerPage', perPage);
    }
    refresh() {
        this.refresh$.next(true);
    }
    setParam(key, value) {
        this.router.navigate(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { [key]: value })], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
    areAllSelected() {
        if (this.members) {
            return this.selectedMemberIds.length === this.members.length;
        }
        else {
            return false;
        }
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectionChange.emit([]);
        }
        else {
            this.selectionChange.emit(this.members.map(v => v.id));
        }
    }
    toggleSelectMember({ item: member }) {
        if (this.selectedMemberIds.includes(member.id)) {
            this.selectionChange.emit(this.selectedMemberIds.filter(id => id !== member.id));
        }
        else {
            this.selectionChange.emit([...this.selectedMemberIds, member.id]);
        }
    }
}
CustomerGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-member-list',
                template: "<input\n    type=\"text\"\n    name=\"searchTerm\"\n    [formControl]=\"filterTermControl\"\n    [placeholder]=\"'customer.search-customers-by-email' | translate\"\n    class=\"search-input\"\n/>\n\n<vdr-data-table\n    [items]=\"members\"\n    [itemsPerPage]=\"membersItemsPerPage$ | async\"\n    [totalItems]=\"totalItems\"\n    [currentPage]=\"membersCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"('UpdateCustomerGroup' | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/customer', 'customers', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupMemberListComponent.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
CustomerGroupMemberListComponent.propDecorators = {
    members: [{ type: Input }],
    totalItems: [{ type: Input }],
    route: [{ type: Input }],
    selectedMemberIds: [{ type: Input }],
    selectionChange: [{ type: Output }],
    fetchParamsChange: [{ type: Output }]
};

class CustomerHistoryComponent {
    constructor() {
        this.addNote = new EventEmitter();
        this.updateNote = new EventEmitter();
        this.deleteNote = new EventEmitter();
        this.note = '';
        this.type = HistoryEntryType;
    }
    getDisplayType(entry) {
        switch (entry.type) {
            case HistoryEntryType.CUSTOMER_VERIFIED:
            case HistoryEntryType.CUSTOMER_EMAIL_UPDATE_VERIFIED:
            case HistoryEntryType.CUSTOMER_PASSWORD_RESET_VERIFIED:
                return 'success';
            case HistoryEntryType.CUSTOMER_REGISTERED:
                return 'muted';
            case HistoryEntryType.CUSTOMER_REMOVED_FROM_GROUP:
                return 'error';
            default:
                return 'default';
        }
    }
    getTimelineIcon(entry) {
        switch (entry.type) {
            case HistoryEntryType.CUSTOMER_REGISTERED:
                return 'user';
            case HistoryEntryType.CUSTOMER_VERIFIED:
                return ['assign-user', 'is-solid'];
            case HistoryEntryType.CUSTOMER_NOTE:
                return 'note';
            case HistoryEntryType.CUSTOMER_ADDED_TO_GROUP:
            case HistoryEntryType.CUSTOMER_REMOVED_FROM_GROUP:
                return 'users';
        }
    }
    isFeatured(entry) {
        switch (entry.type) {
            case HistoryEntryType.CUSTOMER_REGISTERED:
            case HistoryEntryType.CUSTOMER_VERIFIED:
                return true;
            default:
                return false;
        }
    }
    getName(entry) {
        const { administrator } = entry;
        if (administrator) {
            return `${administrator.firstName} ${administrator.lastName}`;
        }
        else {
            return `${this.customer.firstName} ${this.customer.lastName}`;
        }
    }
    addNoteToCustomer() {
        this.addNote.emit({ note: this.note });
        this.note = '';
    }
}
CustomerHistoryComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-history',
                template: "<h4>{{ 'customer.customer-history' | translate }}</h4>\n<div class=\"entry-list\">\n    <vdr-timeline-entry iconShape=\"note\" displayType=\"muted\" *vdrIfPermissions=\"'UpdateCustomer'\">\n        <div class=\"note-entry\">\n            <textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n            <button class=\"btn btn-secondary\" [disabled]=\"!note\" (click)=\"addNoteToCustomer()\">\n                {{ 'order.add-note' | translate }}\n            </button>\n        </div>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry\n        *ngFor=\"let entry of history\"\n        [displayType]=\"getDisplayType(entry)\"\n        [iconShape]=\"getTimelineIcon(entry)\"\n        [createdAt]=\"entry.createdAt\"\n        [name]=\"getName(entry)\"\n        [featured]=\"isFeatured(entry)\"\n    >\n        <ng-container [ngSwitch]=\"entry.type\">\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_REGISTERED\">\n                <div class=\"title\">\n                    {{ 'customer.history-customer-registered' | translate }}\n                </div>\n                <ng-container *ngIf=\"entry.data.strategy === 'native'; else namedStrategy\">\n                    {{ 'customer.history-using-native-auth-strategy' | translate }}\n                </ng-container>\n                <ng-template #namedStrategy>\n                    {{\n                    'customer.history-using-external-auth-strategy'\n                        | translate: { strategy: entry.data.strategy }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_VERIFIED\">\n                <div class=\"title\">\n                    {{ 'customer.history-customer-verified' | translate }}\n                </div>\n                <ng-container *ngIf=\"entry.data.strategy === 'native'; else namedStrategy\">\n                    {{ 'customer.history-using-native-auth-strategy' | translate }}\n                </ng-container>\n                <ng-template #namedStrategy>\n                    {{\n                        'customer.history-using-external-auth-strategy'\n                            | translate: { strategy: entry.data.strategy }\n                    }}\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_DETAIL_UPDATED\">\n                <div class=\"flex\">\n                    {{ 'customer.history-customer-detail-updated' | translate }}\n                    <vdr-history-entry-detail>\n                        <vdr-object-tree [value]=\"entry.data.input\"></vdr-object-tree>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDED_TO_GROUP\">\n                {{\n                    'customer.history-customer-added-to-group'\n                        | translate: { groupName: entry.data.groupName }\n                }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_REMOVED_FROM_GROUP\">\n                {{\n                    'customer.history-customer-removed-from-group'\n                        | translate: { groupName: entry.data.groupName }\n                }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDRESS_CREATED\">\n                {{ 'customer.history-customer-address-created' | translate }}\n                <div class=\"flex\">\n                    <div class=\"address-string\">{{ entry.data.address }}</div>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDRESS_UPDATED\">\n                {{ 'customer.history-customer-address-updated' | translate }}\n                <div class=\"flex\">\n                    <div class=\"address-string\">{{ entry.data.address }}</div>\n                    <vdr-history-entry-detail>\n                        <vdr-object-tree [value]=\"entry.data.input\"></vdr-object-tree>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_ADDRESS_DELETED\">\n                {{ 'customer.history-customer-address-deleted' | translate }}\n                <div class=\"address-string\">{{ entry.data.address }}</div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_PASSWORD_UPDATED\">\n                {{ 'customer.history-customer-password-updated' | translate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_PASSWORD_RESET_REQUESTED\">\n                {{ 'customer.history-customer-password-reset-requested' | translate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_PASSWORD_RESET_VERIFIED\">\n                {{ 'customer.history-customer-password-reset-verified' | translate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_EMAIL_UPDATE_REQUESTED\">\n                <div class=\"flex\">\n                    {{ 'customer.history-customer-email-update-requested' | translate }}\n                    <vdr-history-entry-detail>\n                        <vdr-labeled-data [label]=\"'customer.old-email-address' | translate\">{{\n                            entry.data.oldEmailAddress\n                        }}</vdr-labeled-data>\n                        <vdr-labeled-data [label]=\"'customer.new-email-address' | translate\">{{\n                            entry.data.newEmailAddress\n                        }}</vdr-labeled-data>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_EMAIL_UPDATE_VERIFIED\">\n                <div class=\"flex\">\n                    {{ 'customer.history-customer-email-update-verified' | translate }}\n                    <vdr-history-entry-detail>\n                        <vdr-labeled-data [label]=\"'customer.old-email-address' | translate\">{{\n                            entry.data.oldEmailAddress\n                        }}</vdr-labeled-data>\n                        <vdr-labeled-data [label]=\"'customer.new-email-address' | translate\">{{\n                            entry.data.newEmailAddress\n                        }}</vdr-labeled-data>\n                    </vdr-history-entry-detail>\n                </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"type.CUSTOMER_NOTE\">\n                <div class=\"flex\">\n                    <div class=\"note-text\">\n                        {{ entry.data.note }}\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"updateNote.emit(entry)\"\n                                [disabled]=\"!('UpdateCustomer' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"edit\"></clr-icon>\n                                {{ 'common.edit' | translate }}\n                            </button>\n                            <div class=\"dropdown-divider\"></div>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                (click)=\"deleteNote.emit(entry)\"\n                                [disabled]=\"!('UpdateCustomer' | hasPermission)\"\n                            >\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'common.delete' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </ng-container>\n        </ng-container>\n    </vdr-timeline-entry>\n    <vdr-timeline-entry [isLast]=\"true\"></vdr-timeline-entry>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".entry-list{margin-top:24px;margin-left:24px;margin-right:12px}.note-entry{display:flex;align-items:center}.note-entry .note{flex:1}.note-entry button{margin:0}textarea.note{flex:1;height:36px;border-radius:3px;margin-right:6px}.note-text{color:var(--color-text-100);white-space:pre-wrap}.address-string{font-size:smaller;color:var(--color-text-200)}\n"]
            },] }
];
CustomerHistoryComponent.propDecorators = {
    customer: [{ type: Input }],
    history: [{ type: Input }],
    addNote: [{ type: Output }],
    updateNote: [{ type: Output }],
    deleteNote: [{ type: Output }]
};

class CustomerListComponent extends BaseListComponent {
    constructor(dataService, router, route, modalService, notificationService) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.searchTerm = new FormControl('');
        super.setQueryFn((...args) => this.dataService.customer.getCustomerList(...args).refetchOnChannelChange(), data => data.customers, (skip, take) => ({
            options: {
                skip,
                take,
                filter: {
                    emailAddress: {
                        contains: this.searchTerm.value,
                    },
                    lastName: {
                        contains: this.searchTerm.value,
                    },
                    postalCode: {
                        contains: this.searchTerm.value,
                    },
                },
                filterOperator: LogicalOperator.OR,
                sort: {
                    createdAt: SortOrder$1.DESC,
                },
            },
        }));
    }
    ngOnInit() {
        super.ngOnInit();
        this.searchTerm.valueChanges
            .pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
    }
    deleteCustomer(customer) {
        return this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-customer'),
            body: `${customer.firstName} ${customer.lastName}`,
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.customer.deleteCustomer(customer.id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Customer',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Customer',
            });
        });
    }
}
CustomerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"emailSearchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'customer.search-customers-by-email-last-name-postal-code' | translate\"\n            class=\"search-input\"\n        />\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-customer' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'customer.customer-type' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"left align-middle\">\n            <vdr-customer-status-label [customer]=\"customer\"></vdr-customer-status-label>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteCustomer(customer)\"\n                        [disabled]=\"!('DeleteCustomer' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [".search-input{margin-top:6px;min-width:300px}\n"]
            },] }
];
CustomerListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];

class CustomerStatusLabelComponent {
}
CustomerStatusLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-status-label',
                template: "<vdr-chip *ngIf=\"customer.user?.id\">\n    <ng-container *ngIf=\"customer.user?.verified\">\n        <clr-icon shape=\"check-circle\" class=\"verified-user-icon\"></clr-icon>\n        {{ 'customer.verified' | translate }}\n    </ng-container>\n    <ng-container *ngIf=\"!customer.user?.verified\">\n        <clr-icon shape=\"check-circle\" class=\"registered-user-icon\"></clr-icon>\n        {{ 'customer.registered' | translate }}\n    </ng-container>\n</vdr-chip>\n<vdr-chip *ngIf=\"!customer.user?.id\">{{ 'customer.guest' | translate }}</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".registered-user-icon{color:var(--color-grey-300)}.verified-user-icon{color:var(--color-success-500)}\n"]
            },] }
];
CustomerStatusLabelComponent.propDecorators = {
    customer: [{ type: Input }]
};

class CustomerResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Customer',
            id: '',
            createdAt: '',
            updatedAt: '',
            title: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            addresses: null,
            user: null,
        }, id => dataService.customer.getCustomer(id).mapStream(data => data.customer));
    }
}
CustomerResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CustomerResolver_Factory() { return new CustomerResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CustomerResolver, providedIn: "root" });
CustomerResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CustomerResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

const ɵ0 = {
    breadcrumb: marker('breadcrumb.customers'),
}, ɵ1 = {
    breadcrumb: customerBreadcrumb,
}, ɵ2 = {
    breadcrumb: marker('breadcrumb.customer-groups'),
};
const customerRoutes = [
    {
        path: 'customers',
        component: CustomerListComponent,
        pathMatch: '',
        data: ɵ0,
    },
    {
        path: 'customers/:id',
        component: CustomerDetailComponent,
        resolve: createResolveData(CustomerResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
    {
        path: 'groups',
        component: CustomerGroupListComponent,
        data: ɵ2,
    },
];
function customerBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.customers',
        getName: (customer) => `${customer.firstName} ${customer.lastName}`,
        route: 'customers',
    });
}

class CustomerModule {
}
CustomerModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(customerRoutes)],
                declarations: [
                    CustomerListComponent,
                    CustomerDetailComponent,
                    CustomerStatusLabelComponent,
                    AddressCardComponent,
                    CustomerGroupListComponent,
                    CustomerGroupDetailDialogComponent,
                    AddCustomerToGroupDialogComponent,
                    CustomerGroupMemberListComponent,
                    SelectCustomerGroupDialogComponent,
                    CustomerHistoryComponent,
                    AddressDetailDialogComponent,
                ],
                exports: [AddressCardComponent],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { AddCustomerToGroupDialogComponent, AddressCardComponent, AddressDetailDialogComponent, CustomerDetailComponent, CustomerGroupDetailDialogComponent, CustomerGroupListComponent, CustomerGroupMemberListComponent, CustomerHistoryComponent, CustomerListComponent, CustomerModule, CustomerResolver, CustomerStatusLabelComponent, SelectCustomerGroupDialogComponent, customerBreadcrumb, customerRoutes, ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=vendure-admin-ui-customer.js.map
