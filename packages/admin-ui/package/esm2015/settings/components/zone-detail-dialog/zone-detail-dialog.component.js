import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerConfigService } from '@vendure/admin-ui/core';
export class ZoneDetailDialogComponent {
    constructor(serverConfigService, formBuilder) {
        this.serverConfigService = serverConfigService;
        this.formBuilder = formBuilder;
        this.customFields = this.serverConfigService.getCustomFieldsFor('Zone');
    }
    ngOnInit() {
        var _a;
        this.form = this.formBuilder.group({
            name: [this.zone.name, Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.form.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = (_a = this.zone.customFields) === null || _a === void 0 ? void 0 : _a[key];
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
ZoneDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n    <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n</ng-template>\n<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-tabbed-custom-fields\n        entityName=\"Zone\"\n        [customFields]=\"customFields\"\n        [customFieldsFormGroup]=\"form.get('customFields')\"\n        [readonly]=\"!(['UpdateSettings', 'UpdateZone'] | hasPermission)\"\n    ></vdr-tabbed-custom-fields>\n</form>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"save()\" [disabled]=\"form.invalid\" class=\"btn btn-primary\">\n        <span *ngIf=\"zone.id\">{{ 'settings.update-zone' | translate }}</span>\n        <span *ngIf=\"!zone.id\">{{ 'settings.create-zone' | translate }}</span>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ZoneDetailDialogComponent.ctorParameters = () => [
    { type: ServerConfigService },
    { type: FormBuilder }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1kZXRhaWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvem9uZS1kZXRhaWwtZGlhbG9nL3pvbmUtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBOEMsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF6RyxNQUFNLE9BQU8seUJBQXlCO0lBT2xDLFlBQW9CLG1CQUF3QyxFQUFVLFdBQXdCO1FBQTFFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsUUFBUTs7UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDM0MsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGlDQUFNLElBQUksS0FBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUcsRUFBRSxFQUFFLENBQUMsQ0FDakY7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzFCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFjLENBQUM7WUFFckUsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUMxQixNQUFNLEtBQUssR0FBRyxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSwwQ0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLE9BQU8sRUFBRTtvQkFDVCxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3QjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7WUE1Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHd1Q0FBa0Q7Z0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBUG9ELG1CQUFtQjtZQUQvRCxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ3JlYXRlWm9uZUlucHV0LCBDdXN0b21GaWVsZENvbmZpZywgRGlhbG9nLCBTZXJ2ZXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXpvbmUtZGV0YWlsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3pvbmUtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vem9uZS1kZXRhaWwtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFpvbmVEZXRhaWxEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBEaWFsb2c8Q3JlYXRlWm9uZUlucHV0PiwgT25Jbml0IHtcbiAgICB6b25lOiB7IGlkPzogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGN1c3RvbUZpZWxkcz86IHsgW25hbWU6IHN0cmluZ106IGFueSB9IH07XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBDcmVhdGVab25lSW5wdXQpID0+IHZvaWQ7XG5cbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLCBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRDdXN0b21GaWVsZHNGb3IoJ1pvbmUnKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBuYW1lOiBbdGhpcy56b25lLm5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21GaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21GaWVsZHNHcm91cCA9IHRoaXMuZm9ybS5nZXQoJ2N1c3RvbUZpZWxkcycpIGFzIEZvcm1Hcm91cDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZERlZiBvZiB0aGlzLmN1c3RvbUZpZWxkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZpZWxkRGVmLm5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnpvbmUuY3VzdG9tRmllbGRzPy5ba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gY3VzdG9tRmllbGRzR3JvdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxufVxuIl19