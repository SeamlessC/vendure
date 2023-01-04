import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * An input for monetary values. Should be used with `int` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class CurrencyFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.currencyCode$ = this.dataService.settings
            .getActiveChannel()
            .mapStream(data => data.activeChannel.currencyCode);
    }
}
CurrencyFormInputComponent.id = 'currency-form-input';
CurrencyFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-currency-form-input',
                template: "<vdr-currency-input\n    [formControl]=\"formControl\"\n    [readonly]=\"readonly\"\n    [currencyCode]=\"currencyCode$ | async\"\n></vdr-currency-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CurrencyFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
CurrencyFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2N1cnJlbmN5LWZvcm0taW5wdXQvY3VycmVuY3ktZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FOzs7Ozs7R0FNRztBQU9ILE1BQU0sT0FBTywwQkFBMEI7SUFPbkMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDekMsZ0JBQWdCLEVBQUU7YUFDbEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxDQUFDOztBQVZlLDZCQUFFLEdBQTJCLHFCQUFxQixDQUFDOztZQVB0RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsdUtBQW1EO2dCQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQWRRLFdBQVc7Ozt1QkFpQmYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnLCBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQsIElucHV0Q29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQgeyBDdXJyZW5jeUNvZGUgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIGlucHV0IGZvciBtb25ldGFyeSB2YWx1ZXMuIFNob3VsZCBiZSB1c2VkIHdpdGggYGludGAgdHlwZSBmaWVsZHMuXG4gKlxuICogQGRvY3NDYXRlZ29yeSBjdXN0b20taW5wdXQtY29tcG9uZW50c1xuICogQGRvY3NQYWdlIGRlZmF1bHQtaW5wdXRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1cnJlbmN5LWZvcm0taW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXJyZW5jeS1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jdXJyZW5jeS1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5Rm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgaWQ6IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgPSAnY3VycmVuY3ktZm9ybS1pbnB1dCc7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGN1cnJlbmN5Q29kZSQ6IE9ic2VydmFibGU8Q3VycmVuY3lDb2RlPjtcbiAgICBjb25maWc6IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnPCdjdXJyZW5jeS1mb3JtLWlucHV0Jz47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICB0aGlzLmN1cnJlbmN5Q29kZSQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0QWN0aXZlQ2hhbm5lbCgpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5hY3RpdmVDaGFubmVsLmN1cnJlbmN5Q29kZSk7XG4gICAgfVxufVxuIl19