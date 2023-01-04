import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * @description
 * Uses a regular text form input. This is the default input for `string` and `localeString` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class TextFormInputComponent {
    get prefix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.prefix) || this.config.prefix;
    }
    get suffix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.suffix) || this.config.suffix;
    }
}
TextFormInputComponent.id = 'text-form-input';
TextFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-text-form-input',
                template: "<vdr-affixed-input\n    [suffix]=\"suffix\"\n    [prefix]=\"prefix\"\n>\n    <input type=\"text\" [readonly]=\"readonly\" [formControl]=\"formControl\" />\n</vdr-affixed-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["input{width:100%}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvdGV4dC1mb3JtLWlucHV0L3RleHQtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1uRTs7Ozs7O0dBTUc7QUFPSCxNQUFNLE9BQU8sc0JBQXNCO0lBTS9CLElBQUksTUFBTTs7UUFDTixPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsMENBQUUsTUFBTSxLQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3hELENBQUM7SUFFRCxJQUFJLE1BQU07O1FBQ04sT0FBTyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLDBDQUFFLE1BQU0sS0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN4RCxDQUFDOztBQVhlLHlCQUFFLEdBQTJCLGlCQUFpQixDQUFDOztZQVBsRSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsOExBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnLCBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQsIElucHV0Q29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBVc2VzIGEgcmVndWxhciB0ZXh0IGZvcm0gaW5wdXQuIFRoaXMgaXMgdGhlIGRlZmF1bHQgaW5wdXQgZm9yIGBzdHJpbmdgIGFuZCBgbG9jYWxlU3RyaW5nYCB0eXBlIGZpZWxkcy5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGN1c3RvbS1pbnB1dC1jb21wb25lbnRzXG4gKiBAZG9jc1BhZ2UgZGVmYXVsdC1pbnB1dHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdGV4dC1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXh0LWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGV4dEZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ3RleHQtZm9ybS1pbnB1dCc7XG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGNvbmZpZzogRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWc8J3RleHQtZm9ybS1pbnB1dCc+O1xuXG4gICAgZ2V0IHByZWZpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnVpPy5wcmVmaXggfHwgdGhpcy5jb25maWcucHJlZml4O1xuICAgIH1cblxuICAgIGdldCBzdWZmaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy51aT8uc3VmZml4IHx8IHRoaXMuY29uZmlnLnN1ZmZpeDtcbiAgICB9XG59XG4iXX0=