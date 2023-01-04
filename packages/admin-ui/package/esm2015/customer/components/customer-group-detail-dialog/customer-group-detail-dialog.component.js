import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerConfigService, } from '@vendure/admin-ui/core';
export class CustomerGroupDetailDialogComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZ3JvdXAtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cvY3VzdG9tZXItZ3JvdXAtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUEwQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBSUgsbUJBQW1CLEdBRXRCLE1BQU0sd0JBQXdCLENBQUM7QUFRaEMsTUFBTSxPQUFPLGtDQUFrQztJQU0zQyxZQUFvQixtQkFBd0MsRUFBVSxXQUF3QjtRQUExRSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFFBQVE7O1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQzVDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxJQUFJLEtBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2pGO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUMxQixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBYyxDQUFDO1lBRXJFLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksMENBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBM0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1Qyw2NENBQTREO2dCQUU1RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVRHLG1CQUFtQjtZQUxkLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDcmVhdGVDdXN0b21lckdyb3VwSW5wdXQsXG4gICAgQ3VzdG9tRmllbGRDb25maWcsXG4gICAgRGlhbG9nLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlQ3VzdG9tZXJHcm91cElucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY3VzdG9tZXItZ3JvdXAtZGV0YWlsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWdyb3VwLWRldGFpbC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJHcm91cERldGFpbERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzxDcmVhdGVDdXN0b21lckdyb3VwSW5wdXQ+LCBPbkluaXQge1xuICAgIGdyb3VwOiB7IGlkPzogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGN1c3RvbUZpZWxkcz86IHsgW25hbWU6IHN0cmluZ106IGFueSB9IH07XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBDcmVhdGVDdXN0b21lckdyb3VwSW5wdXQpID0+IHZvaWQ7XG4gICAgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSwgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2UuZ2V0Q3VzdG9tRmllbGRzRm9yKCdDdXN0b21lckdyb3VwJyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgbmFtZTogW3RoaXMuZ3JvdXAubmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMucmVkdWNlKChoYXNoLCBmaWVsZCkgPT4gKHsgLi4uaGFzaCwgW2ZpZWxkLm5hbWVdOiAnJyB9KSwge30pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkc0dyb3VwID0gdGhpcy5mb3JtLmdldCgnY3VzdG9tRmllbGRzJykgYXMgRm9ybUdyb3VwO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuY3VzdG9tRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ3JvdXAuY3VzdG9tRmllbGRzPy5ba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gY3VzdG9tRmllbGRzR3JvdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxufVxuIl19