import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BaseCodeEditorFormInputComponent } from './base-code-editor-form-input.component';
export function jsonValidator() {
    return (control) => {
        const error = { jsonInvalid: true };
        try {
            JSON.parse(control.value);
        }
        catch (e) {
            control.setErrors(error);
            return error;
        }
        control.setErrors(null);
        return null;
    };
}
/**
 * @description
 * A JSON editor input with syntax highlighting and error detection. Works well
 * with `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class JsonEditorFormInputComponent extends BaseCodeEditorFormInputComponent {
    constructor(changeDetector) {
        super(changeDetector);
        this.changeDetector = changeDetector;
    }
    ngOnInit() {
        this.configure({
            validator: jsonValidator,
            highlight: (json, errorPos) => {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                let hasMarkedError = false;
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match, ...args) => {
                    let cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        }
                        else {
                            cls = 'string';
                        }
                    }
                    else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    }
                    else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    let errorClass = '';
                    if (errorPos && !hasMarkedError) {
                        const length = args[0].length;
                        const offset = args[4];
                        if (errorPos <= length + offset) {
                            errorClass = 'je-error';
                            hasMarkedError = true;
                        }
                    }
                    return '<span class="je-' + cls + ' ' + errorClass + '">' + match + '</span>';
                });
            },
            getErrorMessage: (json) => {
                try {
                    JSON.parse(json);
                }
                catch (e) {
                    return e.message;
                }
                return;
            },
        });
    }
}
JsonEditorFormInputComponent.id = 'json-editor-form-input';
JsonEditorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-json-editor-form-input',
                template: "<div #editor class=\"code-editor json-editor\" [class.invalid]=\"!isValid\" [style.height]=\"height || '300px'\"></div>\n<div class=\"error-message\">\n    <span *ngIf=\"errorMessage\">{{ errorMessage }}</span>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".code-editor{min-height:6rem;background-color:var(--color-json-editor-background-color);color:var(--color-json-editor-text);border:1px solid var(--color-component-border-200);border-radius:3px;padding:6px;-moz-tab-size:4;tab-size:4;font-family:\"Source Code Pro\",\"Lucida Console\",Monaco,monospace;font-size:14px;font-weight:400;height:340px;letter-spacing:normal;line-height:20px;resize:both;text-align:initial;min-width:200px}.code-editor:focus{border-color:var(--color-primary-500)}.code-editor.invalid{border-color:var(--clr-forms-invalid-color)}.error-message{min-height:1rem;color:var(--color-json-editor-error)}.code-editor ::ng-deep .je-string{color:var(--color-json-editor-string)}.code-editor ::ng-deep .je-number{color:var(--color-json-editor-number)}.code-editor ::ng-deep .je-boolean{color:var(--color-json-editor-boolean)}.code-editor ::ng-deep .je-null{color:var(--color-json-editor-null)}.code-editor ::ng-deep .je-key{color:var(--color-json-editor-key)}.code-editor ::ng-deep .je-error{-webkit-text-decoration-line:underline;text-decoration-line:underline;-webkit-text-decoration-style:wavy;text-decoration-style:wavy;-webkit-text-decoration-color:var(--color-json-editor-error);text-decoration-color:var(--color-json-editor-error)}\n"]
            },] }
];
JsonEditorFormInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2NvZGUtZWRpdG9yLWZvcm0taW5wdXQvanNvbi1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFNN0csT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFM0YsTUFBTSxVQUFVLGFBQWE7SUFDekIsT0FBTyxDQUFDLE9BQXdCLEVBQTJCLEVBQUU7UUFDekQsTUFBTSxLQUFLLEdBQXFCLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXRELElBQUk7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFPSCxNQUFNLE9BQU8sNEJBQ1QsU0FBUSxnQ0FBZ0M7SUFLeEMsWUFBc0IsY0FBaUM7UUFDbkQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBREosbUJBQWMsR0FBZCxjQUFjLENBQW1CO0lBRXZELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNYLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLElBQVksRUFBRSxRQUE0QixFQUFFLEVBQUU7Z0JBQ3RELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQy9FLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUNmLHdHQUF3RyxFQUN4RyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO29CQUNmLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztvQkFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ2xCLEdBQUcsR0FBRyxLQUFLLENBQUM7eUJBQ2Y7NkJBQU07NEJBQ0gsR0FBRyxHQUFHLFFBQVEsQ0FBQzt5QkFDbEI7cUJBQ0o7eUJBQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNqQyxHQUFHLEdBQUcsU0FBUyxDQUFDO3FCQUNuQjt5QkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQzNCLEdBQUcsR0FBRyxNQUFNLENBQUM7cUJBQ2hCO29CQUNELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxRQUFRLElBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxRQUFRLElBQUksTUFBTSxHQUFHLE1BQU0sRUFBRTs0QkFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQzs0QkFDeEIsY0FBYyxHQUFHLElBQUksQ0FBQzt5QkFDekI7cUJBQ0o7b0JBQ0QsT0FBTyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDbEYsQ0FBQyxDQUNKLENBQUM7WUFDTixDQUFDO1lBQ0QsZUFBZSxFQUFFLENBQUMsSUFBWSxFQUFzQixFQUFFO2dCQUNsRCxJQUFJO29CQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3BCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztpQkFDcEI7Z0JBQ0QsT0FBTztZQUNYLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDOztBQWpEZSwrQkFBRSxHQUEyQix3QkFBd0IsQ0FBQzs7WUFWekUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLHdPQUFzRDtnQkFFdEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFyQ2dELGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcblxuaW1wb3J0IHsgQmFzZUNvZGVFZGl0b3JGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29kZS1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24ganNvblZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yOiBWYWxpZGF0aW9uRXJyb3JzID0geyBqc29uSW52YWxpZDogdHJ1ZSB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb250cm9sLnNldEVycm9ycyhlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICBjb250cm9sLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgSlNPTiBlZGl0b3IgaW5wdXQgd2l0aCBzeW50YXggaGlnaGxpZ2h0aW5nIGFuZCBlcnJvciBkZXRlY3Rpb24uIFdvcmtzIHdlbGxcbiAqIHdpdGggYHRleHRgIHR5cGUgZmllbGRzLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY3VzdG9tLWlucHV0LWNvbXBvbmVudHNcbiAqIEBkb2NzUGFnZSBkZWZhdWx0LWlucHV0c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1qc29uLWVkaXRvci1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vanNvbi1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vanNvbi1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBKc29uRWRpdG9yRm9ybUlucHV0Q29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlQ29kZUVkaXRvckZvcm1JbnB1dENvbXBvbmVudFxuICAgIGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkluaXRcbntcbiAgICBzdGF0aWMgcmVhZG9ubHkgaWQ6IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgPSAnanNvbi1lZGl0b3ItZm9ybS1pbnB1dCc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmUoe1xuICAgICAgICAgICAgdmFsaWRhdG9yOiBqc29uVmFsaWRhdG9yLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiAoanNvbjogc3RyaW5nLCBlcnJvclBvczogbnVtYmVyIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNNYXJrZWRFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc29uLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaCwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNscyA9ICdudW1iZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzID0gJ3N0cmluZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvdHJ1ZXxmYWxzZS8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9udWxsLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscyA9ICdudWxsJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnJvckNsYXNzID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JQb3MgJiYgIWhhc01hcmtlZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gYXJnc1swXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gYXJnc1s0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JQb3MgPD0gbGVuZ3RoICsgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2xhc3MgPSAnamUtZXJyb3InO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNNYXJrZWRFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cImplLScgKyBjbHMgKyAnICcgKyBlcnJvckNsYXNzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEVycm9yTWVzc2FnZTogKGpzb246IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==