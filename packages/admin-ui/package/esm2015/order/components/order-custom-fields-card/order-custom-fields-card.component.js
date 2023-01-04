import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ModalService } from '@vendure/admin-ui/core';
export class OrderCustomFieldsCardComponent {
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
                title: _('catalog.confirm-cancel'),
                buttons: [
                    { type: 'secondary', label: _('common.keep-editing') },
                    { type: 'danger', label: _('common.discard-changes'), returnValue: true },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY3VzdG9tLWZpZWxkcy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItY3VzdG9tLWZpZWxkcy1jYXJkL29yZGVyLWN1c3RvbS1maWVsZHMtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBQXFCLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBUXpFLE1BQU0sT0FBTyw4QkFBOEI7SUFNdkMsWUFBb0IsV0FBd0IsRUFBVSxZQUEwQjtRQUE1RCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTHZFLHVCQUFrQixHQUF3QixFQUFFLENBQUM7UUFDN0Msc0JBQWlCLEdBQTRCLEVBQUUsQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFaEQsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUNrRSxDQUFDO0lBRXBGLFFBQVE7UUFDSixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUMzQixLQUFLLENBQUMsSUFBSSxFQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDL0QsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFO1lBQzVCLElBQUksQ0FBQyxZQUFZO2lCQUNaLE1BQU0sQ0FBQztnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO2dCQUNsQyxPQUFPLEVBQUU7b0JBQ0wsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRTtvQkFDdEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsd0JBQXdCLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2lCQUM1RTthQUNKLENBQUM7aUJBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoQixJQUFJLE1BQU0sRUFBRTtvQkFDUixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDekI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNMLENBQUM7OztZQWxESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsNjlDQUF3RDtnQkFFeEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFUUSxXQUFXO1lBRVEsWUFBWTs7O2lDQVNuQyxLQUFLO2dDQUNMLEtBQUs7MEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcsIE1vZGFsU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1jdXN0b20tZmllbGRzLWNhcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1jdXN0b20tZmllbGRzLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZGVyLWN1c3RvbS1maWVsZHMtY2FyZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckN1c3RvbUZpZWxkc0NhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGN1c3RvbUZpZWxkc0NvbmZpZzogQ3VzdG9tRmllbGRDb25maWdbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGN1c3RvbUZpZWxkVmFsdWVzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgIEBPdXRwdXQoKSB1cGRhdGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIGN1c3RvbUZpZWxkRm9ybTogRm9ybUdyb3VwO1xuICAgIGVkaXRhYmxlID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiB0aGlzLmN1c3RvbUZpZWxkc0NvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZEZvcm0uYWRkQ29udHJvbChcbiAgICAgICAgICAgICAgICBmaWVsZC5uYW1lLFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh0aGlzLmN1c3RvbUZpZWxkVmFsdWVzW2ZpZWxkLm5hbWVdKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNsaWNrLmVtaXQodGhpcy5jdXN0b21GaWVsZEZvcm0udmFsdWUpO1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25DYW5jZWxDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWNhbmNlbCcpLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmtlZXAtZWRpdGluZycpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRpc2NhcmQtY2hhbmdlcycpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21GaWVsZEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19