import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * @description
 * Displays a number input. Default input for `int` and `float` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class NumberFormInputComponent {
    get prefix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.prefix) || this.config.prefix;
    }
    get suffix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.suffix) || this.config.suffix;
    }
    get min() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.min) || this.config.min;
    }
    get max() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.max) || this.config.max;
    }
    get step() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.step) || this.config.step;
    }
}
NumberFormInputComponent.id = 'number-form-input';
NumberFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-number-form-input',
                template: "<vdr-affixed-input\n    [suffix]=\"suffix\"\n    [prefix]=\"prefix\"\n>\n    <input\n        type=\"number\"\n        [readonly]=\"readonly\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"step\"\n        [formControl]=\"formControl\"\n    />\n</vdr-affixed-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
NumberFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWZvcm0taW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9udW1iZXItZm9ybS1pbnB1dC9udW1iZXItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNMUU7Ozs7OztHQU1HO0FBT0gsTUFBTSxPQUFPLHdCQUF3QjtJQU1qQyxJQUFJLE1BQU07O1FBQ04sT0FBTyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDBDQUFFLE1BQU0sS0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN4RCxDQUFDO0lBQ0QsSUFBSSxNQUFNOztRQUNOLE9BQU8sQ0FBQSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSwwQ0FBRSxNQUFNLEtBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDeEQsQ0FBQztJQUNELElBQUksR0FBRzs7UUFDSCxPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsMENBQUUsR0FBRyxLQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2xELENBQUM7SUFDRCxJQUFJLEdBQUc7O1FBQ0gsT0FBTyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDBDQUFFLEdBQUcsS0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsSUFBSSxJQUFJOztRQUNKLE9BQU8sQ0FBQSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSwwQ0FBRSxJQUFJLEtBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQzs7QUFuQmUsMkJBQUUsR0FBMkIsbUJBQW1CLENBQUM7O1lBUHBFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyx1U0FBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUdJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEaXNwbGF5cyBhIG51bWJlciBpbnB1dC4gRGVmYXVsdCBpbnB1dCBmb3IgYGludGAgYW5kIGBmbG9hdGAgdHlwZSBmaWVsZHMuXG4gKlxuICogQGRvY3NDYXRlZ29yeSBjdXN0b20taW5wdXQtY29tcG9uZW50c1xuICogQGRvY3NQYWdlIGRlZmF1bHQtaW5wdXRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW51bWJlci1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbnVtYmVyLWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL251bWJlci1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ251bWJlci1mb3JtLWlucHV0JztcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZzwnbnVtYmVyLWZvcm0taW5wdXQnPjtcblxuICAgIGdldCBwcmVmaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy51aT8ucHJlZml4IHx8IHRoaXMuY29uZmlnLnByZWZpeDtcbiAgICB9XG4gICAgZ2V0IHN1ZmZpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnVpPy5zdWZmaXggfHwgdGhpcy5jb25maWcuc3VmZml4O1xuICAgIH1cbiAgICBnZXQgbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudWk/Lm1pbiB8fCB0aGlzLmNvbmZpZy5taW47XG4gICAgfVxuICAgIGdldCBtYXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy51aT8ubWF4IHx8IHRoaXMuY29uZmlnLm1heDtcbiAgICB9XG4gICAgZ2V0IHN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy51aT8uc3RlcCB8fCB0aGlzLmNvbmZpZy5zdGVwO1xuICAgIH1cbn1cbiJdfQ==