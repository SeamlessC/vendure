import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * @description
 * Uses textarea form input. This is the default input for `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class TextareaFormInputComponent {
    get spellcheck() {
        return this.config.spellcheck === true;
    }
}
TextareaFormInputComponent.id = 'textarea-form-input';
TextareaFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-textarea-form-input',
                template: "<textarea [spellcheck]=\"spellcheck\" autocomplete=\"off\" autocorrect=\"off\"\n    [readonly]=\"readonly\"\n    [formControl]=\"formControl\"\n></textarea>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host textarea{resize:both;height:6rem;width:100%}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL3RleHRhcmVhLWZvcm0taW5wdXQvdGV4dGFyZWEtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1uRTs7Ozs7O0dBTUc7QUFPSCxNQUFNLE9BQU8sMEJBQTBCO0lBTW5DLElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDO0lBQzNDLENBQUM7O0FBUGUsNkJBQUUsR0FBMkIscUJBQXFCLENBQUM7O1lBUHRFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQywwS0FBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWcsIERlZmF1bHRGb3JtQ29tcG9uZW50SWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCwgSW5wdXRDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFVzZXMgdGV4dGFyZWEgZm9ybSBpbnB1dC4gVGhpcyBpcyB0aGUgZGVmYXVsdCBpbnB1dCBmb3IgYHRleHRgIHR5cGUgZmllbGRzLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY3VzdG9tLWlucHV0LWNvbXBvbmVudHNcbiAqIEBkb2NzUGFnZSBkZWZhdWx0LWlucHV0c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci10ZXh0YXJlYS1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dGFyZWEtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGV4dGFyZWEtZm9ybS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ3RleHRhcmVhLWZvcm0taW5wdXQnO1xuICAgIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBjb25maWc6IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnPCd0ZXh0YXJlYS1mb3JtLWlucHV0Jz47XG5cbiAgICBnZXQgc3BlbGxjaGVjaygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnNwZWxsY2hlY2sgPT09IHRydWU7XG4gICAgfVxufVxuIl19