import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as i1 from '@angular/router';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import * as i2 from '@vendure/admin-ui/core';
import { BaseDetailComponent, encodeConfigArgValue, getConfigArgValue, getDefaultConfigArgValue, ServerConfigService, DataService, NotificationService, BaseListComponent, ModalService, BaseEntityResolver, createResolveData, CanDeactivateDetailGuard, detailBreadcrumb, SharedModule } from '@vendure/admin-ui/core';
import { take, mergeMap, debounceTime, takeUntil, switchMap } from 'rxjs/operators';
import { merge, EMPTY } from 'rxjs';

class PromotionDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.conditions = [];
        this.actions = [];
        this.allConditions = [];
        this.allActions = [];
        this.customFields = this.getCustomFieldConfig('Promotion');
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            enabled: true,
            couponCode: null,
            perCustomerUsageLimit: null,
            startsAt: null,
            endsAt: null,
            conditions: this.formBuilder.array([]),
            actions: this.formBuilder.array([]),
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.promotion$ = this.entity$;
        this.dataService.promotion.getPromotionActionsAndConditions().single$.subscribe(data => {
            this.allActions = data.promotionActions;
            this.allConditions = data.promotionConditions;
            this.changeDetector.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroy();
    }
    getAvailableConditions() {
        return this.allConditions.filter(o => !this.conditions.find(c => c.code === o.code));
    }
    getConditionDefinition(condition) {
        return this.allConditions.find(c => c.code === condition.code);
    }
    getAvailableActions() {
        return this.allActions.filter(o => !this.actions.find(a => a.code === o.code));
    }
    getActionDefinition(action) {
        return this.allActions.find(c => c.code === action.code);
    }
    saveButtonEnabled() {
        return (this.detailForm.dirty &&
            this.detailForm.valid &&
            (this.conditions.length !== 0 || this.detailForm.value.couponCode) &&
            this.actions.length !== 0);
    }
    addCondition(condition) {
        this.addOperation('conditions', condition);
        this.detailForm.markAsDirty();
    }
    addAction(action) {
        this.addOperation('actions', action);
        this.detailForm.markAsDirty();
    }
    removeCondition(condition) {
        this.removeOperation('conditions', condition);
        this.detailForm.markAsDirty();
    }
    removeAction(action) {
        this.removeOperation('actions', action);
        this.detailForm.markAsDirty();
    }
    formArrayOf(key) {
        return this.detailForm.get(key);
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input = {
            name: formValue.name,
            enabled: true,
            couponCode: formValue.couponCode,
            perCustomerUsageLimit: formValue.perCustomerUsageLimit,
            startsAt: formValue.startsAt,
            endsAt: formValue.endsAt,
            conditions: this.mapOperationsToInputs(this.conditions, formValue.conditions),
            actions: this.mapOperationsToInputs(this.actions, formValue.actions),
            customFields: formValue.customFields,
        };
        this.dataService.promotion.createPromotion(input).subscribe(({ createPromotion }) => {
            switch (createPromotion.__typename) {
                case 'Promotion':
                    this.notificationService.success(marker('common.notify-create-success'), {
                        entity: 'Promotion',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', createPromotion.id], { relativeTo: this.route });
                    break;
                case 'MissingConditionsError':
                    this.notificationService.error(createPromotion.message);
                    break;
            }
        }, err => {
            this.notificationService.error(marker('common.notify-create-error'), {
                entity: 'Promotion',
            });
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.promotion$
            .pipe(take(1), mergeMap(promotion => {
            const input = {
                id: promotion.id,
                name: formValue.name,
                enabled: formValue.enabled,
                couponCode: formValue.couponCode,
                perCustomerUsageLimit: formValue.perCustomerUsageLimit,
                startsAt: formValue.startsAt,
                endsAt: formValue.endsAt,
                conditions: this.mapOperationsToInputs(this.conditions, formValue.conditions),
                actions: this.mapOperationsToInputs(this.actions, formValue.actions),
                customFields: formValue.customFields,
            };
            return this.dataService.promotion.updatePromotion(input);
        }))
            .subscribe(data => {
            this.notificationService.success(marker('common.notify-update-success'), {
                entity: 'Promotion',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(marker('common.notify-update-error'), {
                entity: 'Promotion',
            });
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            name: entity.name,
            enabled: entity.enabled,
            couponCode: entity.couponCode,
            perCustomerUsageLimit: entity.perCustomerUsageLimit,
            startsAt: entity.startsAt,
            endsAt: entity.endsAt,
        });
        entity.conditions.forEach(o => {
            this.addOperation('conditions', o);
        });
        entity.actions.forEach(o => this.addOperation('actions', o));
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
        }
    }
    /**
     * Maps an array of conditions or actions to the input format expected by the GraphQL API.
     */
    mapOperationsToInputs(operations, formValueOperations) {
        return operations.map((o, i) => {
            return {
                code: o.code,
                arguments: Object.values(formValueOperations[i].args).map((value, j) => ({
                    name: o.args[j].name,
                    value: encodeConfigArgValue(value),
                })),
            };
        });
    }
    /**
     * Adds a new condition or action to the promotion.
     */
    addOperation(key, operation) {
        const operationsArray = this.formArrayOf(key);
        const collection = key === 'conditions' ? this.conditions : this.actions;
        const index = operationsArray.value.findIndex(o => o.code === operation.code);
        if (index === -1) {
            const argsHash = operation.args.reduce((output, arg) => {
                var _a;
                return (Object.assign(Object.assign({}, output), { [arg.name]: (_a = getConfigArgValue(arg.value)) !== null && _a !== void 0 ? _a : this.getDefaultArgValue(key, operation, arg.name) }));
            }, {});
            operationsArray.push(this.formBuilder.control({
                code: operation.code,
                args: argsHash,
            }));
            collection.push({
                code: operation.code,
                args: operation.args.map(a => ({ name: a.name, value: getConfigArgValue(a.value) })),
            });
        }
    }
    getDefaultArgValue(key, operation, argName) {
        const def = key === 'conditions'
            ? this.allConditions.find(c => c.code === operation.code)
            : this.allActions.find(a => a.code === operation.code);
        if (def) {
            const argDef = def.args.find(a => a.name === argName);
            if (argDef) {
                return getDefaultConfigArgValue(argDef);
            }
        }
        throw new Error(`Could not determine default value for "argName"`);
    }
    /**
     * Removes a condition or action from the promotion.
     */
    removeOperation(key, operation) {
        const operationsArray = this.formArrayOf(key);
        const collection = key === 'conditions' ? this.conditions : this.actions;
        const index = operationsArray.value.findIndex(o => o.code === operation.code);
        if (index !== -1) {
            operationsArray.removeAt(index);
            collection.splice(index, 1);
        }
    }
}
PromotionDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-promotion-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <clr-toggle-wrapper *vdrIfPermissions=\"'UpdatePromotion'\">\n                <input type=\"checkbox\" clrToggle name=\"enabled\" [formControl]=\"detailForm.get(['enabled'])\" />\n                <label>{{ 'common.enabled' | translate }}</label>\n            </clr-toggle-wrapper>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"promotion-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdatePromotion'\"\n                [disabled]=\"!saveButtonEnabled()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"text\"\n            formControlName=\"name\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.starts-at' | translate\" for=\"startsAt\">\n        <vdr-datetime-picker formControlName=\"startsAt\"></vdr-datetime-picker>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.ends-at' | translate\" for=\"endsAt\">\n        <vdr-datetime-picker formControlName=\"endsAt\"></vdr-datetime-picker>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.coupon-code' | translate\" for=\"couponCode\">\n        <input\n            id=\"couponCode\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"text\"\n            formControlName=\"couponCode\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.per-customer-limit' | translate\" for=\"perCustomerUsageLimit\">\n        <input\n            id=\"perCustomerUsageLimit\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"number\"\n            min=\"1\"\n            max=\"999\"\n            formControlName=\"perCustomerUsageLimit\"\n        />\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Promotion\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n\n    <vdr-custom-detail-component-host\n        locationId=\"promotion-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n\n    <div class=\"clr-row\">\n        <div class=\"clr-col\" formArrayName=\"conditions\">\n            <label class=\"clr-control-label\">{{ 'marketing.conditions' | translate }}</label>\n            <ng-container *ngFor=\"let condition of conditions; index as i\">\n                <vdr-configurable-input\n                    (remove)=\"removeCondition($event)\"\n                    [position]=\"i\"\n                    [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n                    [operation]=\"condition\"\n                    [operationDefinition]=\"getConditionDefinition(condition)\"\n                    [formControlName]=\"i\"\n                ></vdr-configurable-input>\n            </ng-container>\n\n            <div>\n                <vdr-dropdown *vdrIfPermissions=\"'UpdatePromotion'\">\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-condition' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let condition of getAvailableConditions()\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            class=\"item-wrap\"\n                            (click)=\"addCondition(condition)\"\n                        >\n                            {{ condition.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\" formArrayName=\"actions\">\n            <label class=\"clr-control-label\">{{ 'marketing.actions' | translate }}</label>\n            <vdr-configurable-input\n                *ngFor=\"let action of actions; index as i\"\n                (remove)=\"removeAction($event)\"\n                [position]=\"i\"\n                [operation]=\"action\"\n                [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n                [operationDefinition]=\"getActionDefinition(action)\"\n                [formControlName]=\"i\"\n            ></vdr-configurable-input>\n            <div>\n                <vdr-dropdown *vdrIfPermissions=\"'UpdatePromotion'\">\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-action' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let action of getAvailableActions()\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            class=\"item-wrap\"\n                            (click)=\"addAction(action)\"\n                        >\n                            {{ action.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".item-wrap{white-space:normal}\n"]
            },] }
];
PromotionDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];

class PromotionListComponent extends BaseListComponent {
    constructor(dataService, router, route, notificationService, modalService) {
        super(router, route);
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.searchForm = new FormGroup({
            name: new FormControl(''),
            couponCode: new FormControl(''),
        });
        super.setQueryFn((...args) => this.dataService.promotion.getPromotions(...args).refetchOnChannelChange(), data => data.promotions, (skip, take) => this.createQueryOptions(skip, take, this.searchForm.value));
    }
    ngOnInit() {
        super.ngOnInit();
        merge(this.searchForm.valueChanges.pipe(debounceTime(250)), this.route.queryParamMap)
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
            if (!val.params) {
                this.setPageNumber(1);
            }
            this.refresh();
        });
    }
    deletePromotion(promotionId) {
        this.modalService
            .dialog({
            title: marker('catalog.confirm-delete-promotion'),
            buttons: [
                { type: 'secondary', label: marker('common.cancel') },
                { type: 'danger', label: marker('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.dataService.promotion.deletePromotion(promotionId) : EMPTY))
            .subscribe(() => {
            this.notificationService.success(marker('common.notify-delete-success'), {
                entity: 'Promotion',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(marker('common.notify-delete-error'), {
                entity: 'Promotion',
            });
        });
    }
    createQueryOptions(skip, take, searchForm) {
        const filter = {};
        if (searchForm.couponCode) {
            filter.couponCode = { contains: searchForm.couponCode };
        }
        if (searchForm.name) {
            filter.name = { contains: searchForm.name };
        }
        return {
            options: {
                skip,
                take,
                filter,
            },
        };
    }
}
PromotionListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-promotion-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <form class=\"search-form\" [formGroup]=\"searchForm\">\n            <input\n                type=\"text\"\n                formControlName=\"name\"\n                [placeholder]=\"'marketing.search-by-name' | translate\"\n                class=\"search-input\"\n            />\n            <input\n                type=\"text\"\n                formControlName=\"couponCode\"\n                [placeholder]=\"'marketing.search-by-coupon-code' | translate\"\n                class=\"search-input\"\n            />\n        </form>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"promotion-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\"\n           *vdrIfPermissions=\"'CreatePromotion'\"\n           [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'marketing.create-new-promotion' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.coupon-code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.starts-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.ends-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-promotion=\"item\">\n        <td class=\"left align-middle\">{{ promotion.name }}</td>\n        <td class=\"left align-middle\">\n            <vdr-chip *ngIf=\"promotion.couponCode\">\n                {{ promotion.couponCode }}\n            </vdr-chip>\n        </td>\n        <td class=\"left align-middle\">{{ promotion.startsAt | localeDate: 'longDate' }}</td>\n        <td class=\"left align-middle\">{{ promotion.endsAt | localeDate: 'longDate' }}</td>\n        <td class=\"align-middle\">\n            <vdr-chip *ngIf=\"!promotion.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', promotion.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deletePromotion(promotion.id)\"\n                        [disabled]=\"!('DeletePromotion' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".search-form{padding:0}.search-input{margin:6px 8px 0 0;min-width:200px}\n"]
            },] }
];
PromotionListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: NotificationService },
    { type: ModalService }
];

/**
 * Resolves the id from the path into a Customer entity.
 */
class PromotionResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Promotion',
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            enabled: false,
            conditions: [],
            actions: [],
        }, id => dataService.promotion.getPromotion(id).mapStream(data => data.promotion));
    }
}
PromotionResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function PromotionResolver_Factory() { return new PromotionResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: PromotionResolver, providedIn: "root" });
PromotionResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
PromotionResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];

const ɵ0 = {
    breadcrumb: marker('breadcrumb.promotions'),
}, ɵ1 = {
    breadcrumb: promotionBreadcrumb,
};
const marketingRoutes = [
    {
        path: 'promotions',
        component: PromotionListComponent,
        data: ɵ0,
    },
    {
        path: 'promotions/:id',
        component: PromotionDetailComponent,
        resolve: createResolveData(PromotionResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: ɵ1,
    },
];
function promotionBreadcrumb(data, params) {
    return detailBreadcrumb({
        entity: data.entity,
        id: params.id,
        breadcrumbKey: 'breadcrumb.promotions',
        getName: promotion => promotion.name,
        route: 'promotions',
    });
}

class MarketingModule {
}
MarketingModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(marketingRoutes)],
                declarations: [PromotionListComponent, PromotionDetailComponent],
            },] }
];

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { MarketingModule, PromotionDetailComponent, PromotionListComponent, PromotionResolver, marketingRoutes, promotionBreadcrumb, ɵ0, ɵ1 };
//# sourceMappingURL=vendure-admin-ui-marketing.js.map
