import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * @description
 * A checkbox input. The default input component for `boolean` fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class BooleanFormInputComponent {
}
BooleanFormInputComponent.id = 'boolean-form-input';
BooleanFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-boolean-form-input',
                template: "<clr-checkbox-wrapper>\n    <input\n        type=\"checkbox\"\n        clrCheckbox\n        [formControl]=\"formControl\"\n        [vdrDisabled]=\"!!readonly\"\n    />\n</clr-checkbox-wrapper>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvYm9vbGVhbi1mb3JtLWlucHV0L2Jvb2xlYW4tZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1uRTs7Ozs7O0dBTUc7QUFPSCxNQUFNLE9BQU8seUJBQXlCOztBQUNsQiw0QkFBRSxHQUEyQixvQkFBb0IsQ0FBQzs7WUFQckUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLDhNQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50LCBJbnB1dENvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnQtcmVnaXN0cnktdHlwZXMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBjaGVja2JveCBpbnB1dC4gVGhlIGRlZmF1bHQgaW5wdXQgY29tcG9uZW50IGZvciBgYm9vbGVhbmAgZmllbGRzLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY3VzdG9tLWlucHV0LWNvbXBvbmVudHNcbiAqIEBkb2NzUGFnZSBkZWZhdWx0LWlucHV0c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1ib29sZWFuLWZvcm0taW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ib29sZWFuLWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Jvb2xlYW4tZm9ybS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBCb29sZWFuRm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgaWQ6IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgPSAnYm9vbGVhbi1mb3JtLWlucHV0JztcbiAgICByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZzwnYm9vbGVhbi1mb3JtLWlucHV0Jz47XG59XG4iXX0=