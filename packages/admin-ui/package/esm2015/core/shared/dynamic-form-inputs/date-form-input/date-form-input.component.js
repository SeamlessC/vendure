import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * @description
 * Allows selection of a datetime. Default input for `datetime` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class DateFormInputComponent {
    get min() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.min) || this.config.min;
    }
    get max() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.max) || this.config.max;
    }
    get yearRange() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.yearRange) || this.config.yearRange;
    }
}
DateFormInputComponent.id = 'date-form-input';
DateFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-date-form-input',
                template: "<vdr-datetime-picker\n    [formControl]=\"formControl\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [yearRange]=\"yearRange\"\n    [readonly]=\"readonly\"\n>\n</vdr-datetime-picker>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DateFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvZGF0ZS1mb3JtLWlucHV0L2RhdGUtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNMUU7Ozs7OztHQU1HO0FBT0gsTUFBTSxPQUFPLHNCQUFzQjtJQUsvQixJQUFJLEdBQUc7O1FBQ0gsT0FBTyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDBDQUFFLEdBQUcsS0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsSUFBSSxHQUFHOztRQUNILE9BQU8sQ0FBQSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSwwQ0FBRSxHQUFHLEtBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDbEQsQ0FBQztJQUNELElBQUksU0FBUzs7UUFDVCxPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsMENBQUUsU0FBUyxLQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzlELENBQUM7O0FBWmUseUJBQUUsR0FBMkIsaUJBQWlCLENBQUM7O1lBUGxFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixrTUFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUdJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbGxvd3Mgc2VsZWN0aW9uIG9mIGEgZGF0ZXRpbWUuIERlZmF1bHQgaW5wdXQgZm9yIGBkYXRldGltZWAgdHlwZSBmaWVsZHMuXG4gKlxuICogQGRvY3NDYXRlZ29yeSBjdXN0b20taW5wdXQtY29tcG9uZW50c1xuICogQGRvY3NQYWdlIGRlZmF1bHQtaW5wdXRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWRhdGUtZm9ybS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZS1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVGb3JtSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBGb3JtSW5wdXRDb21wb25lbnQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdkYXRlLWZvcm0taW5wdXQnO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBjb25maWc6IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnPCdkYXRlLWZvcm0taW5wdXQnPjtcbiAgICBnZXQgbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudWk/Lm1pbiB8fCB0aGlzLmNvbmZpZy5taW47XG4gICAgfVxuICAgIGdldCBtYXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy51aT8ubWF4IHx8IHRoaXMuY29uZmlnLm1heDtcbiAgICB9XG4gICAgZ2V0IHllYXJSYW5nZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnVpPy55ZWFyUmFuZ2UgfHwgdGhpcy5jb25maWcueWVhclJhbmdlO1xuICAgIH1cbn1cbiJdfQ==