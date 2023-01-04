import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ModalService } from '../../../../providers/modal/modal.service';
import { RelationSelectorDialogComponent } from '../relation-selector-dialog/relation-selector-dialog.component';
export class RelationGenericInputComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    selectRelationId() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: _('common.select-relation-id'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue({ id: result });
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationGenericInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-generic-input',
                template: "<vdr-relation-card\n    (select)=\"selectRelationId()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"objects\"\n    [entity]=\"parentFormControl.value\"\n    [selectLabel]=\"'common.select-relation-id' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    {{ parentFormControl.value | json }}\n    <ng-template vdrRelationCardPreview>\n        <div class=\"placeholder\">\n            <clr-icon shape=\"objects\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-entity=\"entity\">\n        <div class=\"\">\n            {{ config.entity }}: <strong>{{ entity.id }}</strong>\n        </div>\n        <vdr-object-tree [value]=\"{ properties: parentFormControl.value }\"></vdr-object-tree>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <div class=\"id-select-wrapper\">\n        <clr-input-container>\n            <input [(ngModel)]=\"relationId\" type=\"text\" clrInput [readonly]=\"readonly\" />\n        </clr-input-container>\n        <div>\n            <button class=\"btn btn-primary m0\" (click)=\"select(relationId)\">\n                {{ 'common.confirm' | translate }}\n            </button>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".id-select-wrapper{display:flex;align-items:flex-end}\n"]
            },] }
];
RelationGenericInputComponent.ctorParameters = () => [
    { type: ModalService }
];
RelationGenericInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tZ2VuZXJpYy1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL3JlbGF0aW9uLWZvcm0taW5wdXQvZ2VuZXJpYy9yZWxhdGlvbi1nZW5lcmljLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFRakgsTUFBTSxPQUFPLDZCQUE2QjtJQVF0QyxZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLFlBQVk7YUFDWixhQUFhLENBQUMsK0JBQStCLEVBQUU7WUFDNUMsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO2dCQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUTthQUNsQztTQUNKLENBQUM7YUFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBckNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxpeENBQXNEO2dCQUV0RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVJRLFlBQVk7Ozt1QkFVaEIsS0FBSztnQ0FDTCxLQUFLO3FCQUNMLEtBQUs7dUJBR0wsU0FBUyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5cbmltcG9ydCB7IFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3Byb3ZpZGVycy9tb2RhbC9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlbGF0aW9uU2VsZWN0b3JEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9yZWxhdGlvbi1zZWxlY3Rvci1kaWFsb2cvcmVsYXRpb24tc2VsZWN0b3ItZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXJlbGF0aW9uLWdlbmVyaWMtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZWxhdGlvbi1nZW5lcmljLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZWxhdGlvbi1nZW5lcmljLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFJlbGF0aW9uR2VuZXJpY0lucHV0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwYXJlbnRGb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQElucHV0KCkgY29uZmlnOiBSZWxhdGlvbkN1c3RvbUZpZWxkQ29uZmlnO1xuICAgIHJlbGF0aW9uSWQ6IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdG9yJykgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKSB7fVxuXG4gICAgc2VsZWN0UmVsYXRpb25JZCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFJlbGF0aW9uU2VsZWN0b3JEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY29tbW9uLnNlbGVjdC1yZWxhdGlvbi1pZCcpLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclRlbXBsYXRlOiB0aGlzLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5zZXRWYWx1ZSh7IGlkOiByZXN1bHQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG59XG4iXX0=