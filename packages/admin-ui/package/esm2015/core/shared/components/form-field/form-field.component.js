import { Component, ContentChild, Input, } from '@angular/core';
import { FormFieldControlDirective } from './form-field-control.directive';
/**
 * A form field wrapper which handles the correct layout and validation error display for
 * a form control.
 */
export class FormFieldComponent {
    constructor() {
        /**
         * A map of error message codes (required, pattern etc.) to messages to display
         * when those errors are present.
         */
        this.errors = {};
        /**
         * If set to true, the input will be initially set to "readOnly", and an "edit" button
         * will be displayed which allows the field to be edited.
         */
        this.readOnlyToggle = false;
        this.isReadOnly = false;
    }
    ngOnInit() {
        if (this.readOnlyToggle) {
            this.isReadOnly = true;
            this.setReadOnly(true);
        }
        this.isReadOnly = this.readOnlyToggle;
    }
    setReadOnly(value) {
        this.formFieldControl.setReadOnly(value);
        this.isReadOnly = value;
    }
    getErrorMessage() {
        if (!this.formFieldControl || !this.formFieldControl.formControlName) {
            return;
        }
        const errors = this.formFieldControl.formControlName.errors;
        if (errors) {
            for (const errorKey of Object.keys(errors)) {
                if (this.errors[errorKey]) {
                    return this.errors[errorKey];
                }
            }
        }
    }
}
FormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-form-field',
                template: "<div\n    class=\"form-group\"\n    [class.no-label]=\"!label\"\n    [class.clr-error]=\"formFieldControl?.formControlName?.invalid\"\n>\n    <label *ngIf=\"label\" [for]=\"for\" class=\"clr-control-label\">\n        {{ label }}\n        <vdr-help-tooltip *ngIf=\"tooltip\" [content]=\"tooltip\"></vdr-help-tooltip>\n    </label>\n    <label\n        [for]=\"for\"\n        aria-haspopup=\"true\"\n        role=\"tooltip\"\n        [class.invalid]=\"formFieldControl?.touched && !formFieldControl?.valid\"\n        class=\"tooltip tooltip-validation tooltip-sm tooltip-top-left\"\n    >\n        <div class=\"input-row\" [class.has-toggle]=\"readOnlyToggle\">\n            <ng-content></ng-content>\n            <button\n                *ngIf=\"readOnlyToggle\"\n                type=\"button\"\n                [disabled]=\"!isReadOnly\"\n                [title]=\"'common.edit-field' | translate\"\n                class=\"btn btn-icon edit-button\"\n                (click)=\"setReadOnly(false)\"\n            >\n                <clr-icon shape=\"edit\"></clr-icon>\n            </button>\n        </div>\n        <div class=\"clr-subtext\" *ngIf=\"getErrorMessage()\">{{ getErrorMessage() }}</div>\n        <span class=\"tooltip-content\">{{ label }} is required.</span>\n    </label>\n</div>\n",
                styles: [":host{display:block}:host .form-group>label:first-child{top:6px}:host .form-group>label:nth-of-type(2){flex:1;max-width:20rem}:host .form-group>label:nth-of-type(2) ::ng-deep>*:not(.tooltip-content){width:100%}:host .form-group .tooltip-validation{height:initial}:host .form-group.no-label{margin:-6px 0 0;padding:0;justify-content:center}:host .form-group.no-label>label{position:relative;justify-content:center}:host .form-group.no-label .input-row{justify-content:center}:host .input-row{display:flex}:host .input-row ::ng-deep input{flex:1}:host .input-row ::ng-deep input[disabled]{background-color:var(--color-component-bg-200)}:host .input-row button.edit-button{margin:0;border-radius:0 3px 3px 0}:host .input-row.has-toggle ::ng-deep input{border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:none}:host .input-row ::ng-deep clr-toggle-wrapper{margin-top:8px}.tooltip.tooltip-validation.invalid:before{position:absolute;content:\"\";height:.666667rem;width:.666667rem;top:.125rem;right:.25rem;background-image:url(data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%225%205%2026%2026%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cstyle%3E.clr-i-outline%7Bfill%3A%23a32100%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctitle%3Eexclamation-circle-line%3C%2Ftitle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20class%3D%22clr-i-outline%20clr-i-outline-path-1%22%20d%3D%22M18%2C6A12%2C12%2C0%2C1%2C0%2C30%2C18%2C12%2C12%2C0%2C0%2C0%2C18%2C6Zm0%2C22A10%2C10%2C0%2C1%2C1%2C28%2C18%2C10%2C10%2C0%2C0%2C1%2C18%2C28Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22clr-i-outline%20clr-i-outline-path-2%22%20d%3D%22M18%2C20.07a1.3%2C1.3%2C0%2C0%2C1-1.3-1.3v-6a1.3%2C1.3%2C0%2C1%2C1%2C2.6%2C0v6A1.3%2C1.3%2C0%2C0%2C1%2C18%2C20.07Z%22%3E%3C%2Fpath%3E%3Ccircle%20class%3D%22clr-i-outline%20clr-i-outline-path-3%22%20cx%3D%2217.95%22%20cy%3D%2223.02%22%20r%3D%221.5%22%3E%3C%2Fcircle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fsvg%3E);background-repeat:no-repeat;background-size:contain;vertical-align:middle;margin:0}.tooltip.tooltip-sm>.tooltip-content,.tooltip .tooltip-content.tooltip-sm{width:5rem}.tooltip:hover>.tooltip-content{right:12px;margin-bottom:0}.tooltip:not(.invalid):hover>.tooltip-content{display:none}\n"]
            },] }
];
FormFieldComponent.propDecorators = {
    label: [{ type: Input }],
    for: [{ type: Input }],
    tooltip: [{ type: Input }],
    errors: [{ type: Input }],
    readOnlyToggle: [{ type: Input }],
    formFieldControl: [{ type: ContentChild, args: [FormFieldControlDirective, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxHQUVSLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTNFOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxrQkFBa0I7SUFML0I7UUFTSTs7O1dBR0c7UUFDTSxXQUFNLEdBQThCLEVBQUUsQ0FBQztRQUNoRDs7O1dBR0c7UUFDTSxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUVoQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBNEJ2QixDQUFDO0lBMUJHLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1lBQ2xFLE9BQU87U0FDVjtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzVELElBQUksTUFBTSxFQUFFO1lBQ1IsS0FBSyxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7O1lBL0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQiw4eENBQTBDOzthQUU3Qzs7O29CQUVJLEtBQUs7a0JBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUtMLEtBQUs7NkJBS0wsS0FBSzsrQkFDTCxZQUFZLFNBQUMseUJBQXlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybUZpZWxkQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS1maWVsZC1jb250cm9sLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogQSBmb3JtIGZpZWxkIHdyYXBwZXIgd2hpY2ggaGFuZGxlcyB0aGUgY29ycmVjdCBsYXlvdXQgYW5kIHZhbGlkYXRpb24gZXJyb3IgZGlzcGxheSBmb3JcbiAqIGEgZm9ybSBjb250cm9sLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1mb3JtLWZpZWxkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZm9ybS1maWVsZC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZm9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9vbHRpcDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEEgbWFwIG9mIGVycm9yIG1lc3NhZ2UgY29kZXMgKHJlcXVpcmVkLCBwYXR0ZXJuIGV0Yy4pIHRvIG1lc3NhZ2VzIHRvIGRpc3BsYXlcbiAgICAgKiB3aGVuIHRob3NlIGVycm9ycyBhcmUgcHJlc2VudC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBlcnJvcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIGlucHV0IHdpbGwgYmUgaW5pdGlhbGx5IHNldCB0byBcInJlYWRPbmx5XCIsIGFuZCBhbiBcImVkaXRcIiBidXR0b25cbiAgICAgKiB3aWxsIGJlIGRpc3BsYXllZCB3aGljaCBhbGxvd3MgdGhlIGZpZWxkIHRvIGJlIGVkaXRlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByZWFkT25seVRvZ2dsZSA9IGZhbHNlO1xuICAgIEBDb250ZW50Q2hpbGQoRm9ybUZpZWxkQ29udHJvbERpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgZm9ybUZpZWxkQ29udHJvbDogRm9ybUZpZWxkQ29udHJvbERpcmVjdGl2ZTtcbiAgICBpc1JlYWRPbmx5ID0gZmFsc2U7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZE9ubHlUb2dnbGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkT25seSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldFJlYWRPbmx5KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNSZWFkT25seSA9IHRoaXMucmVhZE9ubHlUb2dnbGU7XG4gICAgfVxuXG4gICAgc2V0UmVhZE9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5mb3JtRmllbGRDb250cm9sLnNldFJlYWRPbmx5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5pc1JlYWRPbmx5ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0RXJyb3JNZXNzYWdlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtRmllbGRDb250cm9sIHx8ICF0aGlzLmZvcm1GaWVsZENvbnRyb2wuZm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5mb3JtRmllbGRDb250cm9sLmZvcm1Db250cm9sTmFtZS5lcnJvcnM7XG4gICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXJyb3JLZXkgb2YgT2JqZWN0LmtleXMoZXJyb3JzKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVycm9yc1tlcnJvcktleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzW2Vycm9yS2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=