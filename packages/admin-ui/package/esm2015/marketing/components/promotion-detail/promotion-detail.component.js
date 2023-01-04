import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, encodeConfigArgValue, getConfigArgValue, getDefaultConfigArgValue, NotificationService, ServerConfigService, } from '@vendure/admin-ui/core';
import { mergeMap, take } from 'rxjs/operators';
export class PromotionDetailComponent extends BaseDetailComponent {
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
                    this.notificationService.success(_('common.notify-create-success'), {
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
            this.notificationService.error(_('common.notify-create-error'), {
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
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Promotion',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90aW9uLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL21hcmtldGluZy9zcmMvY29tcG9uZW50cy9wcm9tb3Rpb24tZGV0YWlsL3Byb21vdGlvbi1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBYSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxtQkFBbUIsRUFNbkIsV0FBVyxFQUNYLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsd0JBQXdCLEVBRXhCLG1CQUFtQixFQUVuQixtQkFBbUIsR0FFdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWhELE1BQU0sT0FBTyx3QkFDVCxTQUFRLG1CQUF1QztJQVkvQyxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0IsRUFDMUIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBRWhELEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTC9DLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FB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LFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLG02TUFBZ0Q7Z0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBM0J3QixNQUFNO1lBQXRCLGNBQWM7WUFnQm5CLG1CQUFtQjtZQWxCVyxpQkFBaUI7WUFXL0MsV0FBVztZQVZLLFdBQVc7WUFlM0IsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZURldGFpbENvbXBvbmVudCxcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dCxcbiAgICBDcmVhdGVQcm9tb3Rpb25JbnB1dCxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBlbmNvZGVDb25maWdBcmdWYWx1ZSxcbiAgICBnZXRDb25maWdBcmdWYWx1ZSxcbiAgICBnZXREZWZhdWx0Q29uZmlnQXJnVmFsdWUsXG4gICAgTGFuZ3VhZ2VDb2RlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgUHJvbW90aW9uLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlUHJvbW90aW9uSW5wdXQsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXByb21vdGlvbi1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9tb3Rpb24tZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9tb3Rpb24tZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb21vdGlvbkRldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxQcm9tb3Rpb24uRnJhZ21lbnQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIHByb21vdGlvbiQ6IE9ic2VydmFibGU8UHJvbW90aW9uLkZyYWdtZW50PjtcbiAgICBkZXRhaWxGb3JtOiBGb3JtR3JvdXA7XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIGNvbmRpdGlvbnM6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbltdID0gW107XG4gICAgYWN0aW9uczogQ29uZmlndXJhYmxlT3BlcmF0aW9uW10gPSBbXTtcblxuICAgIHByaXZhdGUgYWxsQ29uZGl0aW9uczogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBhbGxBY3Rpb25zOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ1Byb21vdGlvbicpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgY291cG9uQ29kZTogbnVsbCxcbiAgICAgICAgICAgIHBlckN1c3RvbWVyVXNhZ2VMaW1pdDogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBudWxsLFxuICAgICAgICAgICAgZW5kc0F0OiBudWxsLFxuICAgICAgICAgICAgY29uZGl0aW9uczogdGhpcy5mb3JtQnVpbGRlci5hcnJheShbXSksXG4gICAgICAgICAgICBhY3Rpb25zOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcy5yZWR1Y2UoKGhhc2gsIGZpZWxkKSA9PiAoeyAuLi5oYXNoLCBbZmllbGQubmFtZV06ICcnIH0pLCB7fSksXG4gICAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMucHJvbW90aW9uJCA9IHRoaXMuZW50aXR5JDtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9tb3Rpb24uZ2V0UHJvbW90aW9uQWN0aW9uc0FuZENvbmRpdGlvbnMoKS5zaW5nbGUkLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWxsQWN0aW9ucyA9IGRhdGEucHJvbW90aW9uQWN0aW9ucztcbiAgICAgICAgICAgIHRoaXMuYWxsQ29uZGl0aW9ucyA9IGRhdGEucHJvbW90aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBnZXRBdmFpbGFibGVDb25kaXRpb25zKCk6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbENvbmRpdGlvbnMuZmlsdGVyKG8gPT4gIXRoaXMuY29uZGl0aW9ucy5maW5kKGMgPT4gYy5jb2RlID09PSBvLmNvZGUpKTtcbiAgICB9XG5cbiAgICBnZXRDb25kaXRpb25EZWZpbml0aW9uKGNvbmRpdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKTogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbENvbmRpdGlvbnMuZmluZChjID0+IGMuY29kZSA9PT0gY29uZGl0aW9uLmNvZGUpO1xuICAgIH1cblxuICAgIGdldEF2YWlsYWJsZUFjdGlvbnMoKTogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsQWN0aW9ucy5maWx0ZXIobyA9PiAhdGhpcy5hY3Rpb25zLmZpbmQoYSA9PiBhLmNvZGUgPT09IG8uY29kZSkpO1xuICAgIH1cblxuICAgIGdldEFjdGlvbkRlZmluaXRpb24oYWN0aW9uOiBDb25maWd1cmFibGVPcGVyYXRpb24pOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsQWN0aW9ucy5maW5kKGMgPT4gYy5jb2RlID09PSBhY3Rpb24uY29kZSk7XG4gICAgfVxuXG4gICAgc2F2ZUJ1dHRvbkVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0uZGlydHkgJiZcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS52YWxpZCAmJlxuICAgICAgICAgICAgKHRoaXMuY29uZGl0aW9ucy5sZW5ndGggIT09IDAgfHwgdGhpcy5kZXRhaWxGb3JtLnZhbHVlLmNvdXBvbkNvZGUpICYmXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkQ29uZGl0aW9uKGNvbmRpdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKCdjb25kaXRpb25zJywgY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgYWRkQWN0aW9uKGFjdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKCdhY3Rpb25zJywgYWN0aW9uKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ29uZGl0aW9uKGNvbmRpdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlT3BlcmF0aW9uKCdjb25kaXRpb25zJywgY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQWN0aW9uKGFjdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlT3BlcmF0aW9uKCdhY3Rpb25zJywgYWN0aW9uKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgZm9ybUFycmF5T2Yoa2V5OiAnY29uZGl0aW9ucycgfCAnYWN0aW9ucycpOiBGb3JtQXJyYXkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxGb3JtLmdldChrZXkpIGFzIEZvcm1BcnJheTtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXRhaWxGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICBjb25zdCBpbnB1dDogQ3JlYXRlUHJvbW90aW9uSW5wdXQgPSB7XG4gICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBjb3Vwb25Db2RlOiBmb3JtVmFsdWUuY291cG9uQ29kZSxcbiAgICAgICAgICAgIHBlckN1c3RvbWVyVXNhZ2VMaW1pdDogZm9ybVZhbHVlLnBlckN1c3RvbWVyVXNhZ2VMaW1pdCxcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBmb3JtVmFsdWUuc3RhcnRzQXQsXG4gICAgICAgICAgICBlbmRzQXQ6IGZvcm1WYWx1ZS5lbmRzQXQsXG4gICAgICAgICAgICBjb25kaXRpb25zOiB0aGlzLm1hcE9wZXJhdGlvbnNUb0lucHV0cyh0aGlzLmNvbmRpdGlvbnMsIGZvcm1WYWx1ZS5jb25kaXRpb25zKSxcbiAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMubWFwT3BlcmF0aW9uc1RvSW5wdXRzKHRoaXMuYWN0aW9ucywgZm9ybVZhbHVlLmFjdGlvbnMpLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRzOiBmb3JtVmFsdWUuY3VzdG9tRmllbGRzLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb21vdGlvbi5jcmVhdGVQcm9tb3Rpb24oaW5wdXQpLnN1YnNjcmliZShcbiAgICAgICAgICAgICh7IGNyZWF0ZVByb21vdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjcmVhdGVQcm9tb3Rpb24uX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdQcm9tb3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUHJvbW90aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBjcmVhdGVQcm9tb3Rpb24uaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTWlzc2luZ0NvbmRpdGlvbnNFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoY3JlYXRlUHJvbW90aW9uLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUHJvbW90aW9uJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldGFpbEZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmRldGFpbEZvcm0udmFsdWU7XG4gICAgICAgIHRoaXMucHJvbW90aW9uJFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChwcm9tb3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dDogVXBkYXRlUHJvbW90aW9uSW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogcHJvbW90aW9uLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZm9ybVZhbHVlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmb3JtVmFsdWUuZW5hYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbkNvZGU6IGZvcm1WYWx1ZS5jb3Vwb25Db2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyQ3VzdG9tZXJVc2FnZUxpbWl0OiBmb3JtVmFsdWUucGVyQ3VzdG9tZXJVc2FnZUxpbWl0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRzQXQ6IGZvcm1WYWx1ZS5zdGFydHNBdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZHNBdDogZm9ybVZhbHVlLmVuZHNBdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHRoaXMubWFwT3BlcmF0aW9uc1RvSW5wdXRzKHRoaXMuY29uZGl0aW9ucywgZm9ybVZhbHVlLmNvbmRpdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogdGhpcy5tYXBPcGVyYXRpb25zVG9JbnB1dHModGhpcy5hY3Rpb25zLCBmb3JtVmFsdWUuYWN0aW9ucyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb21vdGlvbi51cGRhdGVQcm9tb3Rpb24oaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdQcm9tb3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUHJvbW90aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBmb3JtIHZhbHVlcyB3aGVuIHRoZSBlbnRpdHkgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhlbnRpdHk6IFByb21vdGlvbi5GcmFnbWVudCwgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgbmFtZTogZW50aXR5Lm5hbWUsXG4gICAgICAgICAgICBlbmFibGVkOiBlbnRpdHkuZW5hYmxlZCxcbiAgICAgICAgICAgIGNvdXBvbkNvZGU6IGVudGl0eS5jb3Vwb25Db2RlLFxuICAgICAgICAgICAgcGVyQ3VzdG9tZXJVc2FnZUxpbWl0OiBlbnRpdHkucGVyQ3VzdG9tZXJVc2FnZUxpbWl0LFxuICAgICAgICAgICAgc3RhcnRzQXQ6IGVudGl0eS5zdGFydHNBdCxcbiAgICAgICAgICAgIGVuZHNBdDogZW50aXR5LmVuZHNBdCxcbiAgICAgICAgfSk7XG4gICAgICAgIGVudGl0eS5jb25kaXRpb25zLmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbignY29uZGl0aW9ucycsIG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgZW50aXR5LmFjdGlvbnMuZm9yRWFjaChvID0+IHRoaXMuYWRkT3BlcmF0aW9uKCdhY3Rpb25zJywgbykpO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21GaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEN1c3RvbUZpZWxkRm9ybVZhbHVlcyh0aGlzLmN1c3RvbUZpZWxkcywgdGhpcy5kZXRhaWxGb3JtLmdldCgnY3VzdG9tRmllbGRzJyksIGVudGl0eSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIGFycmF5IG9mIGNvbmRpdGlvbnMgb3IgYWN0aW9ucyB0byB0aGUgaW5wdXQgZm9ybWF0IGV4cGVjdGVkIGJ5IHRoZSBHcmFwaFFMIEFQSS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1hcE9wZXJhdGlvbnNUb0lucHV0cyhcbiAgICAgICAgb3BlcmF0aW9uczogQ29uZmlndXJhYmxlT3BlcmF0aW9uW10sXG4gICAgICAgIGZvcm1WYWx1ZU9wZXJhdGlvbnM6IGFueSxcbiAgICApOiBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dFtdIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbnMubWFwKChvLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvZGU6IG8uY29kZSxcbiAgICAgICAgICAgICAgICBhcmd1bWVudHM6IE9iamVjdC52YWx1ZXM8YW55Pihmb3JtVmFsdWVPcGVyYXRpb25zW2ldLmFyZ3MpLm1hcCgodmFsdWUsIGopID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG8uYXJnc1tqXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZW5jb2RlQ29uZmlnQXJnVmFsdWUodmFsdWUpLFxuICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgY29uZGl0aW9uIG9yIGFjdGlvbiB0byB0aGUgcHJvbW90aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkT3BlcmF0aW9uKGtleTogJ2NvbmRpdGlvbnMnIHwgJ2FjdGlvbnMnLCBvcGVyYXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbikge1xuICAgICAgICBjb25zdCBvcGVyYXRpb25zQXJyYXkgPSB0aGlzLmZvcm1BcnJheU9mKGtleSk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBrZXkgPT09ICdjb25kaXRpb25zJyA/IHRoaXMuY29uZGl0aW9ucyA6IHRoaXMuYWN0aW9ucztcbiAgICAgICAgY29uc3QgaW5kZXggPSBvcGVyYXRpb25zQXJyYXkudmFsdWUuZmluZEluZGV4KG8gPT4gby5jb2RlID09PSBvcGVyYXRpb24uY29kZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3NIYXNoID0gb3BlcmF0aW9uLmFyZ3MucmVkdWNlKFxuICAgICAgICAgICAgICAgIChvdXRwdXQsIGFyZykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ub3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICBbYXJnLm5hbWVdOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q29uZmlnQXJnVmFsdWUoYXJnLnZhbHVlKSA/PyB0aGlzLmdldERlZmF1bHRBcmdWYWx1ZShrZXksIG9wZXJhdGlvbiwgYXJnLm5hbWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNBcnJheS5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IG9wZXJhdGlvbi5jb2RlLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzSGFzaCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IG9wZXJhdGlvbi5jb2RlLFxuICAgICAgICAgICAgICAgIGFyZ3M6IG9wZXJhdGlvbi5hcmdzLm1hcChhID0+ICh7IG5hbWU6IGEubmFtZSwgdmFsdWU6IGdldENvbmZpZ0FyZ1ZhbHVlKGEudmFsdWUpIH0pKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0QXJnVmFsdWUoXG4gICAgICAgIGtleTogJ2NvbmRpdGlvbnMnIHwgJ2FjdGlvbnMnLFxuICAgICAgICBvcGVyYXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbixcbiAgICAgICAgYXJnTmFtZTogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zdCBkZWYgPVxuICAgICAgICAgICAga2V5ID09PSAnY29uZGl0aW9ucydcbiAgICAgICAgICAgICAgICA/IHRoaXMuYWxsQ29uZGl0aW9ucy5maW5kKGMgPT4gYy5jb2RlID09PSBvcGVyYXRpb24uY29kZSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuYWxsQWN0aW9ucy5maW5kKGEgPT4gYS5jb2RlID09PSBvcGVyYXRpb24uY29kZSk7XG4gICAgICAgIGlmIChkZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ0RlZiA9IGRlZi5hcmdzLmZpbmQoYSA9PiBhLm5hbWUgPT09IGFyZ05hbWUpO1xuICAgICAgICAgICAgaWYgKGFyZ0RlZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREZWZhdWx0Q29uZmlnQXJnVmFsdWUoYXJnRGVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBkZXRlcm1pbmUgZGVmYXVsdCB2YWx1ZSBmb3IgXCJhcmdOYW1lXCJgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY29uZGl0aW9uIG9yIGFjdGlvbiBmcm9tIHRoZSBwcm9tb3Rpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVyYXRpb24oa2V5OiAnY29uZGl0aW9ucycgfCAnYWN0aW9ucycsIG9wZXJhdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IG9wZXJhdGlvbnNBcnJheSA9IHRoaXMuZm9ybUFycmF5T2Yoa2V5KTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGtleSA9PT0gJ2NvbmRpdGlvbnMnID8gdGhpcy5jb25kaXRpb25zIDogdGhpcy5hY3Rpb25zO1xuICAgICAgICBjb25zdCBpbmRleCA9IG9wZXJhdGlvbnNBcnJheS52YWx1ZS5maW5kSW5kZXgobyA9PiBvLmNvZGUgPT09IG9wZXJhdGlvbi5jb2RlKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgb3BlcmF0aW9uc0FycmF5LnJlbW92ZUF0KGluZGV4KTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==