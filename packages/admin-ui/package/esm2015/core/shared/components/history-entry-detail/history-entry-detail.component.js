import { ChangeDetectionStrategy, Component } from '@angular/core';
export class HistoryEntryDetailComponent {
}
HistoryEntryDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-history-entry-detail',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n        <clr-icon shape=\"details\" size=\"12\"></clr-icon>\n        {{ 'common.details' | translate }}\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"entry-dropdown\">\n            <ng-content></ng-content>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".entry-dropdown{margin:0 12px}.details-button{margin:0}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS1lbnRyeS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9oaXN0b3J5LWVudHJ5LWRldGFpbC9oaXN0b3J5LWVudHJ5LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFuRSxNQUFNLE9BQU8sMkJBQTJCOzs7WUFOdkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLHFZQUFvRDtnQkFFcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1oaXN0b3J5LWVudHJ5LWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hpc3RvcnktZW50cnktZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9oaXN0b3J5LWVudHJ5LWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBIaXN0b3J5RW50cnlEZXRhaWxDb21wb25lbnQge31cbiJdfQ==