import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { CustomFieldComponentService, } from '../../../providers/custom-field-component/custom-field-component.service';
/**
 * This component renders the appropriate type of form input control based
 * on the "type" property of the provided CustomFieldConfig.
 */
export class CustomFieldControlComponent {
    constructor(dataService, customFieldComponentService) {
        this.dataService = dataService;
        this.customFieldComponentService = customFieldComponentService;
        this.compact = false;
        this.showLabel = true;
        this.readonly = false;
        this.hasCustomControl = false;
    }
    ngOnInit() {
        this.uiLanguage$ = this.dataService.client
            .uiState()
            .stream$.pipe(map(({ uiState }) => uiState.language));
    }
    getFieldDefinition() {
        const config = Object.assign({}, this.customField);
        const id = this.customFieldComponentService.customFieldComponentExists(this.entityName, this.customField.name);
        if (id) {
            config.ui = { component: id };
        }
        switch (config.__typename) {
            case 'IntCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.intMin, max: config.intMax, step: config.intStep });
            case 'FloatCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.floatMin, max: config.floatMax, step: config.floatStep });
            case 'DateTimeCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.datetimeMin, max: config.datetimeMax, step: config.datetimeStep });
            default:
                return Object.assign({}, config);
        }
    }
}
CustomFieldControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-custom-field-control',
                template: "<div class=\"clr-form-control\" *ngIf=\"compact\">\n    <label for=\"basic\" class=\"clr-control-label\">{{ customField | customFieldLabel:(uiLanguage$ | async) }}</label>\n    <div class=\"clr-control-container\">\n        <div class=\"clr-input-wrapper\">\n            <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n        </div>\n    </div>\n</div>\n<vdr-form-field [label]=\"customField | customFieldLabel:(uiLanguage$ | async)\" [for]=\"customField.name\" *ngIf=\"!compact\">\n    <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n</vdr-form-field>\n\n<ng-template #inputs>\n    <ng-container [formGroup]=\"formGroup\">\n        <vdr-dynamic-form-input\n            [formControlName]=\"customField.name\"\n            [readonly]=\"readonly || customField.readonly\"\n            [control]=\"formGroup.get(customField.name)\"\n            [def]=\"getFieldDefinition()\"\n        >\n        </vdr-dynamic-form-input>\n    </ng-container>\n</ng-template>\n",
                styles: [":host{display:block;width:100%}:host .toggle-switch{margin-top:0;margin-bottom:0}\n"]
            },] }
];
CustomFieldControlComponent.ctorParameters = () => [
    { type: DataService },
    { type: CustomFieldComponentService }
];
CustomFieldControlComponent.propDecorators = {
    entityName: [{ type: Input }],
    formGroup: [{ type: Input, args: ['customFieldsFormGroup',] }],
    customField: [{ type: Input }],
    compact: [{ type: Input }],
    showLabel: [{ type: Input }],
    readonly: [{ type: Input }],
    customComponentPlaceholder: [{ type: ViewChild, args: ['customComponentPlaceholder', { read: ViewContainerRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZpZWxkLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jdXN0b20tZmllbGQtY29udHJvbC9jdXN0b20tZmllbGQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsS0FBSyxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd4RyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFDSCwyQkFBMkIsR0FHOUIsTUFBTSwwRUFBMEUsQ0FBQztBQUVsRjs7O0dBR0c7QUFNSCxNQUFNLE9BQU8sMkJBQTJCO0lBY3BDLFlBQ1ksV0FBd0IsRUFDeEIsMkJBQXdEO1FBRHhELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFaM0QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBVXRCLENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07YUFDckMsT0FBTyxFQUFFO2FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsTUFBTSxNQUFNLHFCQUNMLElBQUksQ0FBQyxXQUFXLENBQ3RCLENBQUM7UUFDRixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsMEJBQTBCLENBQ2xFLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3hCLENBQUM7UUFDRixJQUFJLEVBQUUsRUFBRTtZQUNKLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDakM7UUFDRCxRQUFRLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDdkIsS0FBSyxzQkFBc0I7Z0JBQ3ZCLHVDQUNPLE1BQU0sS0FDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDbEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQ2xCLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxJQUN0QjtZQUNOLEtBQUssd0JBQXdCO2dCQUN6Qix1Q0FDTyxNQUFNLEtBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQ3BCLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUNwQixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsSUFDeEI7WUFDTixLQUFLLDJCQUEyQjtnQkFDNUIsdUNBQ08sTUFBTSxLQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUN2QixHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZLElBQzNCO1lBQ047Z0JBQ0kseUJBQ08sTUFBTSxFQUNYO1NBQ1Q7SUFDTCxDQUFDOzs7WUFwRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLGsrQkFBb0Q7O2FBRXZEOzs7WUFmUSxXQUFXO1lBRWhCLDJCQUEyQjs7O3lCQWUxQixLQUFLO3dCQUNMLEtBQUssU0FBQyx1QkFBdUI7MEJBQzdCLEtBQUs7c0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7eUNBRUwsU0FBUyxTQUFDLDRCQUE0QixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSW5wdXRDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IEN1c3RvbUZpZWxkQ29uZmlnLCBDdXN0b21GaWVsZHNGcmFnbWVudCwgTGFuZ3VhZ2VDb2RlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEN1c3RvbUZpZWxkQ29tcG9uZW50U2VydmljZSxcbiAgICBDdXN0b21GaWVsZENvbnRyb2wsXG4gICAgQ3VzdG9tRmllbGRFbnRpdHlOYW1lLFxufSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvY3VzdG9tLWZpZWxkLWNvbXBvbmVudC9jdXN0b20tZmllbGQtY29tcG9uZW50LnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgdGhlIGFwcHJvcHJpYXRlIHR5cGUgb2YgZm9ybSBpbnB1dCBjb250cm9sIGJhc2VkXG4gKiBvbiB0aGUgXCJ0eXBlXCIgcHJvcGVydHkgb2YgdGhlIHByb3ZpZGVkIEN1c3RvbUZpZWxkQ29uZmlnLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jdXN0b20tZmllbGQtY29udHJvbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbS1maWVsZC1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jdXN0b20tZmllbGQtY29udHJvbC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21GaWVsZENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGVudGl0eU5hbWU6IEN1c3RvbUZpZWxkRW50aXR5TmFtZTtcbiAgICBASW5wdXQoJ2N1c3RvbUZpZWxkc0Zvcm1Hcm91cCcpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuICAgIEBJbnB1dCgpIGN1c3RvbUZpZWxkOiBDdXN0b21GaWVsZHNGcmFnbWVudDtcbiAgICBASW5wdXQoKSBjb21wYWN0ID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd0xhYmVsID0gdHJ1ZTtcbiAgICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xuICAgIGhhc0N1c3RvbUNvbnRyb2wgPSBmYWxzZTtcbiAgICBAVmlld0NoaWxkKCdjdXN0b21Db21wb25lbnRQbGFjZWhvbGRlcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICAgIHByaXZhdGUgY3VzdG9tQ29tcG9uZW50UGxhY2Vob2xkZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBwcml2YXRlIGN1c3RvbUNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Q3VzdG9tRmllbGRDb250cm9sPiB8IHVuZGVmaW5lZDtcbiAgICB1aUxhbmd1YWdlJDogT2JzZXJ2YWJsZTxMYW5ndWFnZUNvZGU+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGN1c3RvbUZpZWxkQ29tcG9uZW50U2VydmljZTogQ3VzdG9tRmllbGRDb21wb25lbnRTZXJ2aWNlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVpTGFuZ3VhZ2UkID0gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgIC51aVN0YXRlKClcbiAgICAgICAgICAgIC5zdHJlYW0kLnBpcGUobWFwKCh7IHVpU3RhdGUgfSkgPT4gdWlTdGF0ZS5sYW5ndWFnZSkpO1xuICAgIH1cblxuICAgIGdldEZpZWxkRGVmaW5pdGlvbigpOiBDdXN0b21GaWVsZENvbmZpZyAmIHsgdWk/OiBJbnB1dENvbXBvbmVudENvbmZpZyB9IHtcbiAgICAgICAgY29uc3QgY29uZmlnOiBDdXN0b21GaWVsZHNGcmFnbWVudCAmIHsgdWk/OiBJbnB1dENvbXBvbmVudENvbmZpZyB9ID0ge1xuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21GaWVsZCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmN1c3RvbUZpZWxkQ29tcG9uZW50U2VydmljZS5jdXN0b21GaWVsZENvbXBvbmVudEV4aXN0cyhcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TmFtZSxcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGQubmFtZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICBjb25maWcudWkgPSB7IGNvbXBvbmVudDogaWQgfTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNvbmZpZy5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdJbnRDdXN0b21GaWVsZENvbmZpZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICAgICAgICBtaW46IGNvbmZpZy5pbnRNaW4sXG4gICAgICAgICAgICAgICAgICAgIG1heDogY29uZmlnLmludE1heCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogY29uZmlnLmludFN0ZXAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ0Zsb2F0Q3VzdG9tRmllbGRDb25maWcnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgbWluOiBjb25maWcuZmxvYXRNaW4sXG4gICAgICAgICAgICAgICAgICAgIG1heDogY29uZmlnLmZsb2F0TWF4LFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiBjb25maWcuZmxvYXRTdGVwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdEYXRlVGltZUN1c3RvbUZpZWxkQ29uZmlnJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogY29uZmlnLmRhdGV0aW1lTWluLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IGNvbmZpZy5kYXRldGltZU1heCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogY29uZmlnLmRhdGV0aW1lU3RlcCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==