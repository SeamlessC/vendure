import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfigurableInputComponent } from '../../components/configurable-input/configurable-input.component';
/**
 * @description
 * A special input used to display the "Combination mode" AND/OR toggle.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class CombinationModeFormInputComponent {
    constructor(configurableInputComponent) {
        this.configurableInputComponent = configurableInputComponent;
    }
    ngOnInit() {
        const selectable$ = this.configurableInputComponent
            ? this.configurableInputComponent.positionChange$.pipe(map(position => 0 < position))
            : of(true);
        this.selectable$ = selectable$.pipe(tap(selectable => {
            if (!selectable) {
                this.formControl.setValue(true, { emitEvent: false });
            }
        }));
    }
    setCombinationModeAnd() {
        this.formControl.setValue(true);
    }
    setCombinationModeOr() {
        this.formControl.setValue(false);
    }
}
CombinationModeFormInputComponent.id = 'combination-mode-form-input';
CombinationModeFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-combination-mode-form-input',
                template: "<ng-container *ngIf=\"selectable$ | async; else default\">\n    <div class=\"btn-group btn-outline-primary btn-sm mode-select\">\n        <button\n            class=\"btn\"\n            (click)=\"setCombinationModeAnd()\"\n            [class.btn-primary]=\"formControl.value === true\"\n        >\n            {{ 'common.boolean-and' | translate }}\n        </button>\n        <button\n            class=\"btn\"\n            (click)=\"setCombinationModeOr()\"\n            [class.btn-primary]=\"formControl.value === false\"\n        >\n            {{ 'common.boolean-or' | translate }}\n        </button>\n    </div>\n</ng-container>\n<ng-template #default>\n    <small>{{ 'common.not-applicable' | translate }}</small>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mode-select{text-transform:uppercase}\n"]
            },] }
];
CombinationModeFormInputComponent.ctorParameters = () => [
    { type: ConfigurableInputComponent, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluYXRpb24tbW9kZS1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvY29tYmluYXRpb24tbW9kZS1mb3JtLWlucHV0L2NvbWJpbmF0aW9uLW1vZGUtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBRTlHOzs7Ozs7R0FNRztBQU9ILE1BQU0sT0FBTyxpQ0FBaUM7SUFPMUMsWUFBZ0MsMEJBQXNEO1FBQXRELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7SUFBRyxDQUFDO0lBRTFGLFFBQVE7UUFDSixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsMEJBQTBCO1lBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUN6RDtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7QUEzQmUsb0NBQUUsR0FBMkIsNkJBQTZCLENBQUM7O1lBUDlFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQyw4dUJBQTJEO2dCQUUzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQWRRLDBCQUEwQix1QkFzQmxCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnLCBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQsIElucHV0Q29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQgeyBDb25maWd1cmFibGVJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29uZmlndXJhYmxlLWlucHV0L2NvbmZpZ3VyYWJsZS1pbnB1dC5jb21wb25lbnQnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBzcGVjaWFsIGlucHV0IHVzZWQgdG8gZGlzcGxheSB0aGUgXCJDb21iaW5hdGlvbiBtb2RlXCIgQU5EL09SIHRvZ2dsZS5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGN1c3RvbS1pbnB1dC1jb21wb25lbnRzXG4gKiBAZG9jc1BhZ2UgZGVmYXVsdC1pbnB1dHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY29tYmluYXRpb24tbW9kZS1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tYmluYXRpb24tbW9kZS1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb21iaW5hdGlvbi1tb2RlLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29tYmluYXRpb25Nb2RlRm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBPbkluaXQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdjb21iaW5hdGlvbi1tb2RlLWZvcm0taW5wdXQnO1xuICAgIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBjb25maWc6IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnPCdjb21iaW5hdGlvbi1tb2RlLWZvcm0taW5wdXQnPjtcbiAgICBzZWxlY3RhYmxlJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgY29uZmlndXJhYmxlSW5wdXRDb21wb25lbnQ6IENvbmZpZ3VyYWJsZUlucHV0Q29tcG9uZW50KSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGFibGUkID0gdGhpcy5jb25maWd1cmFibGVJbnB1dENvbXBvbmVudFxuICAgICAgICAgICAgPyB0aGlzLmNvbmZpZ3VyYWJsZUlucHV0Q29tcG9uZW50LnBvc2l0aW9uQ2hhbmdlJC5waXBlKG1hcChwb3NpdGlvbiA9PiAwIDwgcG9zaXRpb24pKVxuICAgICAgICAgICAgOiBvZih0cnVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlJCA9IHNlbGVjdGFibGUkLnBpcGUoXG4gICAgICAgICAgICB0YXAoc2VsZWN0YWJsZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodHJ1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNldENvbWJpbmF0aW9uTW9kZUFuZCgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBzZXRDb21iaW5hdGlvbk1vZGVPcigpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShmYWxzZSk7XG4gICAgfVxufVxuIl19