import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BaseCodeEditorFormInputComponent } from './base-code-editor-form-input.component';
function htmlValidator() {
    return (control) => {
        return null;
    };
}
const HTML_TAG_RE = /<\/?[^>]+>?/g;
/**
 * @description
 * A JSON editor input with syntax highlighting and error detection. Works well
 * with `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class HtmlEditorFormInputComponent extends BaseCodeEditorFormInputComponent {
    constructor(changeDetector) {
        super(changeDetector);
        this.changeDetector = changeDetector;
    }
    ngOnInit() {
        this.configure({
            validator: htmlValidator,
            highlight: (html, errorPos) => {
                let hasMarkedError = false;
                return html.replace(HTML_TAG_RE, (match, ...args) => {
                    let errorClass = '';
                    if (errorPos && !hasMarkedError) {
                        const length = args[0].length;
                        const offset = args[4];
                        if (errorPos <= length + offset) {
                            errorClass = 'je-error';
                            hasMarkedError = true;
                        }
                    }
                    return ('<span class="he-tag' +
                        ' ' +
                        errorClass +
                        '">' +
                        this.encodeHtmlChars(match).replace(/([a-zA-Z0-9-]+=)(["'][^'"]*["'])/g, (_match, ..._args) => `${_args[0]}<span class="he-attr">${_args[1]}</span>`) +
                        '</span>');
                });
            },
            getErrorMessage: (json) => {
                return;
            },
        });
    }
    encodeHtmlChars(html) {
        return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}
HtmlEditorFormInputComponent.id = 'html-editor-form-input';
HtmlEditorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-html-editor-form-input',
                template: "<div #editor class=\"code-editor html-editor\" [class.invalid]=\"!isValid\" [style.height]=\"height || '300px'\"></div>\n<div class=\"error-message\">\n    <span *ngIf=\"errorMessage\">{{ errorMessage }}</span>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".code-editor{min-height:6rem;background-color:var(--color-json-editor-background-color);color:var(--color-json-editor-text);border:1px solid var(--color-component-border-200);border-radius:3px;padding:6px;-moz-tab-size:4;tab-size:4;font-family:\"Source Code Pro\",\"Lucida Console\",Monaco,monospace;font-size:14px;font-weight:400;height:340px;letter-spacing:normal;line-height:20px;resize:both;text-align:initial;min-width:200px}.code-editor:focus{border-color:var(--color-primary-500)}.code-editor.invalid{border-color:var(--clr-forms-invalid-color)}.error-message{min-height:1rem;color:var(--color-json-editor-error)}.code-editor ::ng-deep .he-tag{color:var(--color-json-editor-key)}.code-editor ::ng-deep .he-attr{color:var(--color-json-editor-number)}.code-editor ::ng-deep .he-error{-webkit-text-decoration-line:underline;text-decoration-line:underline;-webkit-text-decoration-style:wavy;text-decoration-style:wavy;-webkit-text-decoration-color:var(--color-json-editor-error);text-decoration-color:var(--color-json-editor-error)}\n"]
            },] }
];
HtmlEditorFormInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2NvZGUtZWRpdG9yLWZvcm0taW5wdXQvaHRtbC1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFNN0csT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFM0YsU0FBUyxhQUFhO0lBQ2xCLE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1FBQ3pELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUM7QUFFbkM7Ozs7Ozs7R0FPRztBQU9ILE1BQU0sT0FBTyw0QkFDVCxTQUFRLGdDQUFnQztJQUt4QyxZQUFzQixjQUFpQztRQUNuRCxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFESixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7SUFFdkQsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ1gsU0FBUyxFQUFFLGFBQWE7WUFDeEIsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFFLFFBQTRCLEVBQUUsRUFBRTtnQkFDdEQsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUU7b0JBQ2hELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxRQUFRLElBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxRQUFRLElBQUksTUFBTSxHQUFHLE1BQU0sRUFBRTs0QkFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQzs0QkFDeEIsY0FBYyxHQUFHLElBQUksQ0FBQzt5QkFDekI7cUJBQ0o7b0JBQ0QsT0FBTyxDQUNILHFCQUFxQjt3QkFDckIsR0FBRzt3QkFDSCxVQUFVO3dCQUNWLElBQUk7d0JBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQy9CLG1DQUFtQyxFQUNuQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDOUU7d0JBQ0QsU0FBUyxDQUNaLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsZUFBZSxFQUFFLENBQUMsSUFBWSxFQUFzQixFQUFFO2dCQUNsRCxPQUFPO1lBQ1gsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxlQUFlLENBQUMsSUFBWTtRQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRixDQUFDOztBQTFDZSwrQkFBRSxHQUEyQix3QkFBd0IsQ0FBQzs7WUFWekUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLHdPQUFzRDtnQkFFdEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUE3QmdELGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcblxuaW1wb3J0IHsgQmFzZUNvZGVFZGl0b3JGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29kZS1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQnO1xuXG5mdW5jdGlvbiBodG1sVmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbn1cblxuY29uc3QgSFRNTF9UQUdfUkUgPSAvPFxcLz9bXj5dKz4/L2c7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIEpTT04gZWRpdG9yIGlucHV0IHdpdGggc3ludGF4IGhpZ2hsaWdodGluZyBhbmQgZXJyb3IgZGV0ZWN0aW9uLiBXb3JrcyB3ZWxsXG4gKiB3aXRoIGB0ZXh0YCB0eXBlIGZpZWxkcy5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGN1c3RvbS1pbnB1dC1jb21wb25lbnRzXG4gKiBAZG9jc1BhZ2UgZGVmYXVsdC1pbnB1dHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItaHRtbC1lZGl0b3ItZm9ybS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2h0bWwtZWRpdG9yLWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2h0bWwtZWRpdG9yLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSHRtbEVkaXRvckZvcm1JbnB1dENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZUNvZGVFZGl0b3JGb3JtSW5wdXRDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0XG57XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ2h0bWwtZWRpdG9yLWZvcm0taW5wdXQnO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihjaGFuZ2VEZXRlY3Rvcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJlKHtcbiAgICAgICAgICAgIHZhbGlkYXRvcjogaHRtbFZhbGlkYXRvcixcbiAgICAgICAgICAgIGhpZ2hsaWdodDogKGh0bWw6IHN0cmluZywgZXJyb3JQb3M6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBoYXNNYXJrZWRFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoSFRNTF9UQUdfUkUsIChtYXRjaCwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JDbGFzcyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JQb3MgJiYgIWhhc01hcmtlZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBhcmdzWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGFyZ3NbNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JQb3MgPD0gbGVuZ3RoICsgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDbGFzcyA9ICdqZS1lcnJvcic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTWFya2VkRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJoZS10YWcnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNsYXNzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5jb2RlSHRtbENoYXJzKG1hdGNoKS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8oW2EtekEtWjAtOS1dKz0pKFtcIiddW14nXCJdKltcIiddKS9nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfbWF0Y2gsIC4uLl9hcmdzKSA9PiBgJHtfYXJnc1swXX08c3BhbiBjbGFzcz1cImhlLWF0dHJcIj4ke19hcmdzWzFdfTwvc3Bhbj5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRFcnJvck1lc3NhZ2U6IChqc29uOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5jb2RlSHRtbENoYXJzKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbiAgICB9XG59XG4iXX0=