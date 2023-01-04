import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Uses a select input to allow the selection of a string value. Should be used with
 * `string` type fields with options.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class SelectFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    get options() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.options) || this.config.options;
    }
    ngOnInit() {
        this.uiLanguage$ = this.dataService.client.uiState().mapStream(({ uiState }) => uiState.language);
    }
    trackByFn(index, item) {
        return item.value;
    }
}
SelectFormInputComponent.id = 'select-form-input';
SelectFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-form-input',
                template: "<select clrSelect [formControl]=\"formControl\" [vdrDisabled]=\"readonly\">\n    <option *ngIf=\"config.nullable\" [ngValue]=\"null\"></option>\n    <option *ngFor=\"let option of options;trackBy:trackByFn\" [ngValue]=\"option.value\">\n        {{ (option | customFieldLabel:(uiLanguage$ | async)) || option.label || option.value }}\n    </option>\n</select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["select{width:100%}\n"]
            },] }
];
SelectFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
SelectFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZvcm0taW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9zZWxlY3QtZm9ybS1pbnB1dC9zZWxlY3QtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFPbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FOzs7Ozs7O0dBT0c7QUFPSCxNQUFNLE9BQU8sd0JBQXdCO0lBV2pDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUpoRCxJQUFJLE9BQU87O1FBQ1AsT0FBTyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDBDQUFFLE9BQU8sS0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMxRCxDQUFDO0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLElBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7O0FBbEJlLDJCQUFFLEdBQTJCLG1CQUFtQixDQUFDOztZQVBwRSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsb1hBQWlEO2dCQUVqRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQWZRLFdBQVc7Ozt1QkFrQmYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWcsIERlZmF1bHRGb3JtQ29tcG9uZW50SWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnQtcmVnaXN0cnktdHlwZXMnO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWdGcmFnbWVudCwgTGFuZ3VhZ2VDb2RlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBVc2VzIGEgc2VsZWN0IGlucHV0IHRvIGFsbG93IHRoZSBzZWxlY3Rpb24gb2YgYSBzdHJpbmcgdmFsdWUuIFNob3VsZCBiZSB1c2VkIHdpdGhcbiAqIGBzdHJpbmdgIHR5cGUgZmllbGRzIHdpdGggb3B0aW9ucy5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGN1c3RvbS1pbnB1dC1jb21wb25lbnRzXG4gKiBAZG9jc1BhZ2UgZGVmYXVsdC1pbnB1dHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItc2VsZWN0LWZvcm0taW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Rm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBPbkluaXQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdzZWxlY3QtZm9ybS1pbnB1dCc7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGNvbmZpZzogRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWc8J3NlbGVjdC1mb3JtLWlucHV0Jz4gJiBDdXN0b21GaWVsZENvbmZpZ0ZyYWdtZW50O1xuICAgIHVpTGFuZ3VhZ2UkOiBPYnNlcnZhYmxlPExhbmd1YWdlQ29kZT47XG5cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnVpPy5vcHRpb25zIHx8IHRoaXMuY29uZmlnLm9wdGlvbnM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51aUxhbmd1YWdlJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVpU3RhdGUoKS5tYXBTdHJlYW0oKHsgdWlTdGF0ZSB9KSA9PiB1aVN0YXRlLmxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICB0cmFja0J5Rm4oaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAgIH1cbn1cbiJdfQ==