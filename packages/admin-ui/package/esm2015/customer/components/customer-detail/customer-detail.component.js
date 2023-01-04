import { __rest } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, EditNoteDialogComponent, ModalService, NotificationService, ServerConfigService, SortOrder, } from '@vendure/admin-ui/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { EMPTY, forkJoin, from, Subject } from 'rxjs';
import { concatMap, filter, map, merge, mergeMap, shareReplay, startWith, switchMap, take, } from 'rxjs/operators';
import { SelectCustomerGroupDialogComponent } from '../select-customer-group-dialog/select-customer-group-dialog.component';
export class CustomerDetailComponent extends BaseDetailComponent {
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
                    this.notificationService.success(_('common.notify-create-success'), {
                        entity: 'Customer',
                    });
                    if (createCustomer.emailAddress && !formValue.password) {
                        this.notificationService.notify({
                            message: _('customer.email-verification-sent'),
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
                            this.notificationService.success(_('common.notify-update-success'), {
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
            this.notificationService.error(_('common.notify-update-error'), {
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
                this.notificationService.success(_(`customer.add-customers-to-group-success`), {
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
            title: _('customer.confirm-remove-customer-from-group'),
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response
            ? this.dataService.customer.removeCustomersFromGroup(group.id, [this.id])
            : EMPTY), switchMap(() => this.dataService.customer.getCustomer(this.id, { take: 0 }).single$))
            .subscribe(result => {
            this.notificationService.success(_(`customer.remove-customers-from-group-success`), {
                customerCount: 1,
                groupName: group.name,
            });
            this.fetchHistory.next();
        });
    }
    addNoteToCustomer({ note }) {
        this.dataService.customer.addNoteToCustomer(this.id, note).subscribe(() => {
            this.fetchHistory.next();
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
            .pipe(switchMap(res => (res ? this.dataService.customer.deleteCustomerNote(entry.id) : EMPTY)))
            .subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-delete-success'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY3VzdG9tZXIvc3JjL2NvbXBvbmVudHMvY3VzdG9tZXItZGV0YWlsL2N1c3RvbWVyLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQU9uQixXQUFXLEVBRVgsdUJBQXVCLEVBTXZCLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLFNBQVMsR0FNWixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBZSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sR0FBRyxFQUNILEtBQUssRUFDTCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxHQUNQLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFVNUgsTUFBTSxPQUFPLHVCQUNULFNBQVEsbUJBQXVDO0lBbUIvQyxZQUNJLEtBQXFCLEVBQ3JCLE1B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aUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7O1lBeGRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixtc1BBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQW5EUSxjQUFjO1lBQUUsTUFBTTtZQW9CM0IsbUJBQW1CO1lBdEJXLGlCQUFpQjtZQUMvQixXQUFXO1lBVzNCLFdBQVc7WUFRWCxZQUFZO1lBQ1osbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ3JlYXRlQWRkcmVzc0lucHV0LFxuICAgIENyZWF0ZUN1c3RvbWVyQWRkcmVzcyxcbiAgICBDcmVhdGVDdXN0b21lckFkZHJlc3NNdXRhdGlvbixcbiAgICBDcmVhdGVDdXN0b21lcklucHV0LFxuICAgIEN1c3RvbWVyLFxuICAgIEN1c3RvbUZpZWxkQ29uZmlnLFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIERlbGV0ZUN1c3RvbWVyQWRkcmVzcyxcbiAgICBFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCxcbiAgICBHZXRBdmFpbGFibGVDb3VudHJpZXMsXG4gICAgR2V0Q3VzdG9tZXIsXG4gICAgR2V0Q3VzdG9tZXJIaXN0b3J5LFxuICAgIEdldEN1c3RvbWVyUXVlcnksXG4gICAgSGlzdG9yeUVudHJ5LFxuICAgIE1vZGFsU2VydmljZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxuICAgIFVwZGF0ZUN1c3RvbWVyLFxuICAgIFVwZGF0ZUN1c3RvbWVyQWRkcmVzcyxcbiAgICBVcGRhdGVDdXN0b21lckFkZHJlc3NNdXRhdGlvbixcbiAgICBVcGRhdGVDdXN0b21lcklucHV0LFxuICAgIFVwZGF0ZUN1c3RvbWVyTXV0YXRpb24sXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIsIG5vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcbmltcG9ydCB7IEVNUFRZLCBmb3JrSm9pbiwgZnJvbSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBjb25jYXRNYXAsXG4gICAgZmlsdGVyLFxuICAgIG1hcCxcbiAgICBtZXJnZSxcbiAgICBtZXJnZU1hcCxcbiAgICBzaGFyZVJlcGxheSxcbiAgICBzdGFydFdpdGgsXG4gICAgc3dpdGNoTWFwLFxuICAgIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU2VsZWN0Q3VzdG9tZXJHcm91cERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3NlbGVjdC1jdXN0b21lci1ncm91cC1kaWFsb2cvc2VsZWN0LWN1c3RvbWVyLWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuXG50eXBlIEN1c3RvbWVyV2l0aE9yZGVycyA9IE5vbk51bGxhYmxlPEdldEN1c3RvbWVyUXVlcnlbJ2N1c3RvbWVyJ10+O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jdXN0b21lci1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lckRldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxDdXN0b21lcldpdGhPcmRlcnM+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIGRldGFpbEZvcm06IEZvcm1Hcm91cDtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgYWRkcmVzc0N1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBhdmFpbGFibGVDb3VudHJpZXMkOiBPYnNlcnZhYmxlPEdldEF2YWlsYWJsZUNvdW50cmllcy5JdGVtc1tdPjtcbiAgICBvcmRlcnMkOiBPYnNlcnZhYmxlPEdldEN1c3RvbWVyLkl0ZW1zW10+O1xuICAgIG9yZGVyc0NvdW50JDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGhpc3RvcnkkOiBPYnNlcnZhYmxlPEdldEN1c3RvbWVySGlzdG9yeS5JdGVtc1tdIHwgdW5kZWZpbmVkPjtcbiAgICBmZXRjaEhpc3RvcnkgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGRlZmF1bHRTaGlwcGluZ0FkZHJlc3NJZDogc3RyaW5nO1xuICAgIGRlZmF1bHRCaWxsaW5nQWRkcmVzc0lkOiBzdHJpbmc7XG4gICAgYWRkcmVzc2VzVG9EZWxldGVJZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBhZGRyZXNzRGVmYXVsdHNVcGRhdGVkID0gZmFsc2U7XG4gICAgb3JkZXJzUGVyUGFnZSA9IDEwO1xuICAgIGN1cnJlbnRPcmRlcnNQYWdlID0gMTtcbiAgICBwcml2YXRlIG9yZGVyTGlzdFVwZGF0ZXMkID0gbmV3IFN1YmplY3Q8Q3VzdG9tZXJXaXRoT3JkZXJzPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdDdXN0b21lcicpO1xuICAgICAgICB0aGlzLmFkZHJlc3NDdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdBZGRyZXNzJyk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgY3VzdG9tZXI6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzczogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF1dLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBhZGRyZXNzZXM6IG5ldyBGb3JtQXJyYXkoW10pLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ291bnRyaWVzJCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC5nZXRBdmFpbGFibGVDb3VudHJpZXMoKVxuICAgICAgICAgICAgLm1hcFNpbmdsZShyZXN1bHQgPT4gcmVzdWx0LmNvdW50cmllcy5pdGVtcylcbiAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcblxuICAgICAgICBjb25zdCBjdXN0b21lcldpdGhVcGRhdGVzJCA9IHRoaXMuZW50aXR5JC5waXBlKG1lcmdlKHRoaXMub3JkZXJMaXN0VXBkYXRlcyQpKTtcbiAgICAgICAgdGhpcy5vcmRlcnMkID0gY3VzdG9tZXJXaXRoVXBkYXRlcyQucGlwZShtYXAoY3VzdG9tZXIgPT4gY3VzdG9tZXIub3JkZXJzLml0ZW1zKSk7XG4gICAgICAgIHRoaXMub3JkZXJzQ291bnQkID0gdGhpcy5lbnRpdHkkLnBpcGUobWFwKGN1c3RvbWVyID0+IGN1c3RvbWVyLm9yZGVycy50b3RhbEl0ZW1zKSk7XG4gICAgICAgIHRoaXMuaGlzdG9yeSQgPSB0aGlzLmZldGNoSGlzdG9yeS5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q3VzdG9tZXJIaXN0b3J5KHRoaXMuaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuY3VzdG9tZXI/Lmhpc3RvcnkuaXRlbXMpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9yZGVyTGlzdFVwZGF0ZXMkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0QWRkcmVzc0Zvcm1Db250cm9scygpOiBGb3JtQ29udHJvbFtdIHtcbiAgICAgICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5kZXRhaWxGb3JtLmdldChbJ2FkZHJlc3NlcyddKSBhcyBGb3JtQXJyYXk7XG4gICAgICAgIHJldHVybiBmb3JtQXJyYXkuY29udHJvbHMgYXMgRm9ybUNvbnRyb2xbXTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0QmlsbGluZ0FkZHJlc3NJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdEJpbGxpbmdBZGRyZXNzSWQgPSBpZDtcbiAgICAgICAgdGhpcy5hZGRyZXNzRGVmYXVsdHNVcGRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0U2hpcHBpbmdBZGRyZXNzSWQoaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRlZmF1bHRTaGlwcGluZ0FkZHJlc3NJZCA9IGlkO1xuICAgICAgICB0aGlzLmFkZHJlc3NEZWZhdWx0c1VwZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvZ2dsZURlbGV0ZUFkZHJlc3MoaWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5hZGRyZXNzZXNUb0RlbGV0ZUlkcy5oYXMoaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlc1RvRGVsZXRlSWRzLmRlbGV0ZShpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlc1RvRGVsZXRlSWRzLmFkZChpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBZGRyZXNzKCkge1xuICAgICAgICBjb25zdCBhZGRyZXNzRm9ybUFycmF5ID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnYWRkcmVzc2VzJykgYXMgRm9ybUFycmF5O1xuICAgICAgICBjb25zdCBuZXdBZGRyZXNzID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBmdWxsTmFtZTogJycsXG4gICAgICAgICAgICBjb21wYW55OiAnJyxcbiAgICAgICAgICAgIHN0cmVldExpbmUxOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgc3RyZWV0TGluZTI6ICcnLFxuICAgICAgICAgICAgY2l0eTogJycsXG4gICAgICAgICAgICBwcm92aW5jZTogJycsXG4gICAgICAgICAgICBwb3N0YWxDb2RlOiAnJyxcbiAgICAgICAgICAgIGNvdW50cnlDb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnLFxuICAgICAgICAgICAgZGVmYXVsdFNoaXBwaW5nQWRkcmVzczogZmFsc2UsXG4gICAgICAgICAgICBkZWZhdWx0QmlsbGluZ0FkZHJlc3M6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuYWRkcmVzc0N1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkc0dyb3VwID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuYWRkcmVzc0N1c3RvbUZpZWxkcykge1xuICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkc0dyb3VwLmFkZENvbnRyb2woZmllbGREZWYubmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdBZGRyZXNzLmFkZENvbnRyb2woJ2N1c3RvbUZpZWxkcycsIGN1c3RvbUZpZWxkc0dyb3VwKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzRm9ybUFycmF5LnB1c2gobmV3QWRkcmVzcyk7XG4gICAgfVxuXG4gICAgc2V0T3JkZXJJdGVtc1BlclBhZ2UoaXRlbXNQZXJQYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vcmRlcnNQZXJQYWdlID0gK2l0ZW1zUGVyUGFnZTtcbiAgICAgICAgdGhpcy5mZXRjaE9yZGVyc0xpc3QoKTtcbiAgICB9XG5cbiAgICBzZXRPcmRlckN1cnJlbnRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPcmRlcnNQYWdlID0gK3BhZ2U7XG4gICAgICAgIHRoaXMuZmV0Y2hPcmRlcnNMaXN0KCk7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBjdXN0b21lckZvcm0gPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjdXN0b21lcicpO1xuICAgICAgICBpZiAoIWN1c3RvbWVyRm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IGN1c3RvbWVyRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzID0gY3VzdG9tZXJGb3JtLmdldCgnY3VzdG9tRmllbGRzJyk/LnZhbHVlO1xuICAgICAgICBjb25zdCBjdXN0b21lcjogQ3JlYXRlQ3VzdG9tZXJJbnB1dCA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBmb3JtVmFsdWUudGl0bGUsXG4gICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGZvcm1WYWx1ZS5lbWFpbEFkZHJlc3MsXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZvcm1WYWx1ZS5maXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogZm9ybVZhbHVlLmxhc3ROYW1lLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGZvcm1WYWx1ZS5waG9uZU51bWJlcixcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkcyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jdXN0b21lclxuICAgICAgICAgICAgLmNyZWF0ZUN1c3RvbWVyKGN1c3RvbWVyLCBmb3JtVmFsdWUucGFzc3dvcmQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh7IGNyZWF0ZUN1c3RvbWVyIH0pID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNyZWF0ZUN1c3RvbWVyLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ3VzdG9tZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3JlYXRlQ3VzdG9tZXIuZW1haWxBZGRyZXNzICYmICFmb3JtVmFsdWUucGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uubm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXygnY3VzdG9tZXIuZW1haWwtdmVyaWZpY2F0aW9uLXNlbnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25WYXJzOiB7IGVtYWlsQWRkcmVzczogZm9ybVZhbHVlLmVtYWlsQWRkcmVzcyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzRGVmYXVsdHNVcGRhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBjcmVhdGVDdXN0b21lci5pZF0sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdFbWFpbEFkZHJlc3NDb25mbGljdEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihjcmVhdGVDdXN0b21lci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHsgaWQgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYXZlT3BlcmF0aW9uczogQXJyYXk8XG4gICAgICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlPFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVXBkYXRlQ3VzdG9tZXIuVXBkYXRlQ3VzdG9tZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IENyZWF0ZUN1c3RvbWVyQWRkcmVzcy5DcmVhdGVDdXN0b21lckFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFVwZGF0ZUN1c3RvbWVyQWRkcmVzcy5VcGRhdGVDdXN0b21lckFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERlbGV0ZUN1c3RvbWVyQWRkcmVzcy5EZWxldGVDdXN0b21lckFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21lckZvcm0gPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjdXN0b21lcicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tZXJGb3JtICYmIGN1c3RvbWVyRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gY3VzdG9tZXJGb3JtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzID0gY3VzdG9tZXJGb3JtLmdldCgnY3VzdG9tRmllbGRzJyk/LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tZXI6IFVwZGF0ZUN1c3RvbWVySW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZvcm1WYWx1ZS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGZvcm1WYWx1ZS5lbWFpbEFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmb3JtVmFsdWUuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBmb3JtVmFsdWUubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGZvcm1WYWx1ZS5waG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZU9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51cGRhdGVDdXN0b21lcihjdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMudXBkYXRlQ3VzdG9tZXIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkcmVzc0Zvcm1BcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2FkZHJlc3NlcycpIGFzIEZvcm1BcnJheTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChhZGRyZXNzRm9ybUFycmF5ICYmIGFkZHJlc3NGb3JtQXJyYXkuZGlydHkpIHx8IHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhZGRyZXNzQ29udHJvbCBvZiBhZGRyZXNzRm9ybUFycmF5LmNvbnRyb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3NDb250cm9sLmRpcnR5IHx8IHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYWRkcmVzc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0OiBDcmVhdGVBZGRyZXNzSW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZTogYWRkcmVzcy5mdWxsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhbnk6IGFkZHJlc3MuY29tcGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVldExpbmUxOiBhZGRyZXNzLnN0cmVldExpbmUxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWV0TGluZTI6IGFkZHJlc3Muc3RyZWV0TGluZTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBhZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aW5jZTogYWRkcmVzcy5wcm92aW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RhbENvZGU6IGFkZHJlc3MucG9zdGFsQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBhZGRyZXNzLmNvdW50cnlDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGFkZHJlc3MucGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2hpcHBpbmdBZGRyZXNzOiB0aGlzLmRlZmF1bHRTaGlwcGluZ0FkZHJlc3NJZCA9PT0gYWRkcmVzcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRCaWxsaW5nQWRkcmVzczogdGhpcy5kZWZhdWx0QmlsbGluZ0FkZHJlc3NJZCA9PT0gYWRkcmVzcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogYWRkcmVzcy5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWRkcmVzcy5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZU9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVDdXN0b21lckFkZHJlc3MoaWQsIGlucHV0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5jcmVhdGVDdXN0b21lckFkZHJlc3MpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRyZXNzZXNUb0RlbGV0ZUlkcy5oYXMoYWRkcmVzcy5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlT3BlcmF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVsZXRlQ3VzdG9tZXJBZGRyZXNzKGFkZHJlc3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5kZWxldGVDdXN0b21lckFkZHJlc3MpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlT3BlcmF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudXBkYXRlQ3VzdG9tZXJBZGRyZXNzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYWRkcmVzcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy51cGRhdGVDdXN0b21lckFkZHJlc3MpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihzYXZlT3BlcmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm90aWZpZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZXN1bHQgb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0N1c3RvbWVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBZGRyZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdTdWNjZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub3RpZmllZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIuZ2V0Q3VzdG9tZXIodGhpcy5pZCkuc2luZ2xlJC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdFbWFpbEFkZHJlc3NDb25mbGljdEVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdDdXN0b21lcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZFRvR3JvdXAoKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChTZWxlY3RDdXN0b21lckdyb3VwRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoZ3JvdXBJZHMgPT4gKGdyb3VwSWRzID8gZnJvbShncm91cElkcykgOiBFTVBUWSkpLFxuICAgICAgICAgICAgICAgIGNvbmNhdE1hcChncm91cElkID0+IHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIuYWRkQ3VzdG9tZXJzVG9Hcm91cChncm91cElkLCBbdGhpcy5pZF0pKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG5leHQ6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oYGN1c3RvbWVyLmFkZC1jdXN0b21lcnMtdG8tZ3JvdXAtc3VjY2Vzc2ApLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lckNvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiByZXMuYWRkQ3VzdG9tZXJzVG9Hcm91cC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIuZ2V0Q3VzdG9tZXIodGhpcy5pZCwgeyB0YWtlOiAwIH0pLnNpbmdsZSQuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRnJvbUdyb3VwKGdyb3VwOiBHZXRDdXN0b21lci5Hcm91cHMpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjdXN0b21lci5jb25maXJtLXJlbW92ZS1jdXN0b21lci1mcm9tLWdyb3VwJyksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2RhbmdlcicsIGxhYmVsOiBfKCdjb21tb24uZGVsZXRlJyksIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5yZW1vdmVDdXN0b21lcnNGcm9tR3JvdXAoZ3JvdXAuaWQsIFt0aGlzLmlkXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogRU1QVFksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5nZXRDdXN0b21lcih0aGlzLmlkLCB7IHRha2U6IDAgfSkuc2luZ2xlJCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXyhgY3VzdG9tZXIucmVtb3ZlLWN1c3RvbWVycy1mcm9tLWdyb3VwLXN1Y2Nlc3NgKSwge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21lckNvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IGdyb3VwLm5hbWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkTm90ZVRvQ3VzdG9tZXIoeyBub3RlIH06IHsgbm90ZTogc3RyaW5nIH0pIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5hZGROb3RlVG9DdXN0b21lcih0aGlzLmlkLCBub3RlKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgZW50aXR5OiAnTm90ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTm90ZShlbnRyeTogSGlzdG9yeUVudHJ5KSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJpdmFjeUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbm90ZTogZW50cnkuZGF0YS5ub3RlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyLnVwZGF0ZUN1c3RvbWVyTm90ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90ZUlkOiBlbnRyeS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlOiByZXN1bHQubm90ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdOb3RlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZU5vdGUoZW50cnk6IEhpc3RvcnlFbnRyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjb21tb24uY29uZmlybS1kZWxldGUtbm90ZScpLFxuICAgICAgICAgICAgICAgIGJvZHk6IGVudHJ5LmRhdGEubm90ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKHN3aXRjaE1hcChyZXMgPT4gKHJlcyA/IHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIuZGVsZXRlQ3VzdG9tZXJOb3RlKGVudHJ5LmlkKSA6IEVNUFRZKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ05vdGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoZW50aXR5OiBDdXN0b21lcldpdGhPcmRlcnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VzdG9tZXJHcm91cCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2N1c3RvbWVyJyk7XG4gICAgICAgIGlmIChjdXN0b21lckdyb3VwKSB7XG4gICAgICAgICAgICBjdXN0b21lckdyb3VwLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBlbnRpdHkudGl0bGUsXG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBlbnRpdHkuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBlbnRpdHkubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGVudGl0eS5waG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGVudGl0eS5lbWFpbEFkZHJlc3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRpdHkuYWRkcmVzc2VzKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzZXNBcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhZGRyZXNzIG9mIGVudGl0eS5hZGRyZXNzZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGN1c3RvbUZpZWxkcywgLi4ucmVzdCB9ID0gYWRkcmVzcyBhcyBhbnk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkcmVzc0dyb3VwID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBhZGRyZXNzLmNvdW50cnkuY29kZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhZGRyZXNzZXNBcnJheS5wdXNoKGFkZHJlc3NHcm91cCk7XG4gICAgICAgICAgICAgICAgaWYgKGFkZHJlc3MuZGVmYXVsdFNoaXBwaW5nQWRkcmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRTaGlwcGluZ0FkZHJlc3NJZCA9IGFkZHJlc3MuaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzLmRlZmF1bHRCaWxsaW5nQWRkcmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRCaWxsaW5nQWRkcmVzc0lkID0gYWRkcmVzcy5pZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRyZXNzQ3VzdG9tRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21GaWVsZHNHcm91cCA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuYWRkcmVzc0N1c3RvbUZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKGFkZHJlc3MgYXMgYW55KS5jdXN0b21GaWVsZHM/LltrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHNHcm91cC5hZGRDb250cm9sKGtleSwgY29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0dyb3VwLmFkZENvbnRyb2woJ2N1c3RvbUZpZWxkcycsIGN1c3RvbUZpZWxkc0dyb3VwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0uc2V0Q29udHJvbCgnYWRkcmVzc2VzJywgYWRkcmVzc2VzQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXN0b21GaWVsZEZvcm1WYWx1ZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmdldChbJ2N1c3RvbWVyJywgJ2N1c3RvbUZpZWxkcyddKSxcbiAgICAgICAgICAgICAgICBlbnRpdHksXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmZXRjaCB0aGUgY3VzdG9tZXIgd2l0aCB0aGUgY3VycmVudCBvcmRlciBsaXN0IHNldHRpbmdzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZmV0Y2hPcmRlcnNMaXN0KCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAuZ2V0Q3VzdG9tZXIodGhpcy5pZCwge1xuICAgICAgICAgICAgICAgIHRha2U6IHRoaXMub3JkZXJzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICBza2lwOiAodGhpcy5jdXJyZW50T3JkZXJzUGFnZSAtIDEpICogdGhpcy5vcmRlcnNQZXJQYWdlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zaW5nbGUkLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKGRhdGEgPT4gZGF0YS5jdXN0b21lciksXG4gICAgICAgICAgICAgICAgZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB0aGlzLm9yZGVyTGlzdFVwZGF0ZXMkLm5leHQocmVzdWx0KSk7XG4gICAgfVxufVxuIl19