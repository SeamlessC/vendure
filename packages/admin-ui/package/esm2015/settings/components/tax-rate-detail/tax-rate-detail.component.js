import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, NotificationService, Permission, ServerConfigService, } from '@vendure/admin-ui/core';
import { mergeMap, take } from 'rxjs/operators';
export class TaxRateDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateTaxRate];
        this.customFields = this.getCustomFieldConfig('TaxRate');
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            enabled: [true],
            value: [0, Validators.required],
            taxCategoryId: [''],
            zoneId: [''],
            customerGroupId: [''],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.taxCategories$ = this.dataService.settings
            .getTaxCategories()
            .mapSingle(data => data.taxCategories);
        this.zones$ = this.dataService.settings.getZones().mapSingle(data => data.zones);
    }
    ngOnDestroy() {
        this.destroy();
    }
    saveButtonEnabled() {
        return this.detailForm.dirty && this.detailForm.valid;
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input = {
            name: formValue.name,
            enabled: formValue.enabled,
            value: formValue.value,
            categoryId: formValue.taxCategoryId,
            zoneId: formValue.zoneId,
            customerGroupId: formValue.customerGroupId,
            customFields: formValue.customFields,
        };
        this.dataService.settings.createTaxRate(input).subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'TaxRate',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createTaxRate.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'TaxRate',
            });
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.entity$
            .pipe(take(1), mergeMap(taxRate => {
            const input = {
                id: taxRate.id,
                name: formValue.name,
                enabled: formValue.enabled,
                value: formValue.value,
                categoryId: formValue.taxCategoryId,
                zoneId: formValue.zoneId,
                customerGroupId: formValue.customerGroupId,
                customFields: formValue.customFields,
            };
            return this.dataService.settings.updateTaxRate(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'TaxRate',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'TaxRate',
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
            value: entity.value,
            taxCategoryId: entity.category ? entity.category.id : '',
            zoneId: entity.zone ? entity.zone.id : '',
            customerGroupId: entity.customerGroup ? entity.customerGroup.id : '',
        });
        if (this.customFields.length) {
            this.setCustomFieldFormValues(this.customFields, this.detailForm.get('customFields'), entity);
        }
    }
}
TaxRateDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-rate-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!saveButtonEnabled()\"\n                *vdrIfPermissions=\"updatePermission\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.rate' | translate\" for=\"value\">\n        <vdr-affixed-input suffix=\"%\">\n            <input\n                id=\"value\"\n                type=\"number\"\n                step=\"0.1\"\n                formControlName=\"value\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n            />\n        </vdr-affixed-input>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.tax-category' | translate\" for=\"taxCategoryId\">\n        <select\n            clrSelect\n            name=\"taxCategoryId\"\n            formControlName=\"taxCategoryId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let taxCategory of taxCategories$ | async\" [value]=\"taxCategory.id\">\n                {{ taxCategory.name }}\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.zone' | translate\" for=\"zoneId\">\n        <select\n            clrSelect\n            name=\"zoneId\"\n            formControlName=\"zoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"TaxRate\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <vdr-custom-detail-component-host\n        locationId=\"tax-rate-detail\"\n        [entity$]=\"entity$\"\n        [detailForm]=\"detailForm\"\n    ></vdr-custom-detail-component-host>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxRateDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LXJhdGUtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvdGF4LXJhdGUtZGV0YWlsL3RheC1yYXRlLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQUluQixXQUFXLEVBR1gsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixtQkFBbUIsR0FJdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWhELE1BQU0sT0FBTyxzQkFDVCxTQUFRLG1CQUFxQztJQVU3QyxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0IsRUFDMUIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBRWhELEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTC9DLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBVDNDLHFCQUFnQixHQUFHLENBQUMsVUFBVSxDQUFDLGNB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LDRpSEFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBekJ3QixNQUFNO1lBQXRCLGNBQWM7WUFZbkIsbUJBQW1CO1lBZFcsaUJBQWlCO1lBUy9DLFdBQVc7WUFSTixXQUFXO1lBV2hCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlRGV0YWlsQ29tcG9uZW50LFxuICAgIENyZWF0ZVRheFJhdGVJbnB1dCxcbiAgICBDdXN0b21lckdyb3VwLFxuICAgIEN1c3RvbUZpZWxkQ29uZmlnLFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIEdldFpvbmVzLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFBlcm1pc3Npb24sXG4gICAgU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICBUYXhDYXRlZ29yeSxcbiAgICBUYXhSYXRlLFxuICAgIFVwZGF0ZVRheFJhdGVJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdGF4LXJhdGUtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGF4LXJhdGUtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YXgtcmF0ZS1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGF4UmF0ZURldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxUYXhSYXRlLkZyYWdtZW50PlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICB0YXhDYXRlZ29yaWVzJDogT2JzZXJ2YWJsZTxUYXhDYXRlZ29yeS5GcmFnbWVudFtdPjtcbiAgICB6b25lcyQ6IE9ic2VydmFibGU8R2V0Wm9uZXMuWm9uZXNbXT47XG4gICAgZ3JvdXBzJDogT2JzZXJ2YWJsZTxDdXN0b21lckdyb3VwW10+O1xuICAgIGRldGFpbEZvcm06IEZvcm1Hcm91cDtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgcmVhZG9ubHkgdXBkYXRlUGVybWlzc2lvbiA9IFtQZXJtaXNzaW9uLlVwZGF0ZVNldHRpbmdzLCBQZXJtaXNzaW9uLlVwZGF0ZVRheFJhdGVdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnVGF4UmF0ZScpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBlbmFibGVkOiBbdHJ1ZV0sXG4gICAgICAgICAgICB2YWx1ZTogWzAsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgdGF4Q2F0ZWdvcnlJZDogWycnXSxcbiAgICAgICAgICAgIHpvbmVJZDogWycnXSxcbiAgICAgICAgICAgIGN1c3RvbWVyR3JvdXBJZDogWycnXSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcy5yZWR1Y2UoKGhhc2gsIGZpZWxkKSA9PiAoeyAuLi5oYXNoLCBbZmllbGQubmFtZV06ICcnIH0pLCB7fSksXG4gICAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMudGF4Q2F0ZWdvcmllcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0VGF4Q2F0ZWdvcmllcygpXG4gICAgICAgICAgICAubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS50YXhDYXRlZ29yaWVzKTtcbiAgICAgICAgdGhpcy56b25lcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldFpvbmVzKCkubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS56b25lcyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHNhdmVCdXR0b25FbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxGb3JtLmRpcnR5ICYmIHRoaXMuZGV0YWlsRm9ybS52YWxpZDtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXRhaWxGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgICAgIG5hbWU6IGZvcm1WYWx1ZS5uYW1lLFxuICAgICAgICAgICAgZW5hYmxlZDogZm9ybVZhbHVlLmVuYWJsZWQsXG4gICAgICAgICAgICB2YWx1ZTogZm9ybVZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogZm9ybVZhbHVlLnRheENhdGVnb3J5SWQsXG4gICAgICAgICAgICB6b25lSWQ6IGZvcm1WYWx1ZS56b25lSWQsXG4gICAgICAgICAgICBjdXN0b21lckdyb3VwSWQ6IGZvcm1WYWx1ZS5jdXN0b21lckdyb3VwSWQsXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgIH0gYXMgQ3JlYXRlVGF4UmF0ZUlucHV0O1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmNyZWF0ZVRheFJhdGUoaW5wdXQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdUYXhSYXRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgZGF0YS5jcmVhdGVUYXhSYXRlLmlkXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnVGF4UmF0ZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXRhaWxGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAodGF4UmF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRheFJhdGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZvcm1WYWx1ZS5lbmFibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm1WYWx1ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGZvcm1WYWx1ZS50YXhDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgem9uZUlkOiBmb3JtVmFsdWUuem9uZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJHcm91cElkOiBmb3JtVmFsdWUuY3VzdG9tZXJHcm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiBmb3JtVmFsdWUuY3VzdG9tRmllbGRzLFxuICAgICAgICAgICAgICAgICAgICB9IGFzIFVwZGF0ZVRheFJhdGVJbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MudXBkYXRlVGF4UmF0ZShpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1RheFJhdGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnVGF4UmF0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZm9ybSB2YWx1ZXMgd2hlbiB0aGUgZW50aXR5IGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoZW50aXR5OiBUYXhSYXRlLkZyYWdtZW50LCBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgICAgICBuYW1lOiBlbnRpdHkubmFtZSxcbiAgICAgICAgICAgIGVuYWJsZWQ6IGVudGl0eS5lbmFibGVkLFxuICAgICAgICAgICAgdmFsdWU6IGVudGl0eS52YWx1ZSxcbiAgICAgICAgICAgIHRheENhdGVnb3J5SWQ6IGVudGl0eS5jYXRlZ29yeSA/IGVudGl0eS5jYXRlZ29yeS5pZCA6ICcnLFxuICAgICAgICAgICAgem9uZUlkOiBlbnRpdHkuem9uZSA/IGVudGl0eS56b25lLmlkIDogJycsXG4gICAgICAgICAgICBjdXN0b21lckdyb3VwSWQ6IGVudGl0eS5jdXN0b21lckdyb3VwID8gZW50aXR5LmN1c3RvbWVyR3JvdXAuaWQgOiAnJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VzdG9tRmllbGRGb3JtVmFsdWVzKHRoaXMuY3VzdG9tRmllbGRzLCB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjdXN0b21GaWVsZHMnKSwgZW50aXR5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==