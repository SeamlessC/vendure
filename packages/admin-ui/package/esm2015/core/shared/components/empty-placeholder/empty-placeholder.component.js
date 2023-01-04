import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class EmptyPlaceholderComponent {
}
EmptyPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-empty-placeholder',
                template: "<div class=\"empty-state\">\n    <clr-icon shape=\"bubble-exclamation\" size=\"64\"></clr-icon>\n    <div class=\"empty-label\">\n        <ng-container *ngIf=\"emptyStateLabel; else defaultEmptyLabel\">{{ emptyStateLabel }}</ng-container>\n        <ng-template #defaultEmptyLabel>{{ 'common.no-results' | translate }}</ng-template>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".empty-state{text-align:center;padding:60px;color:var(--color-grey-400);width:100%}.empty-state .empty-label{margin-top:12px;font-size:22px}\n"]
            },] }
];
EmptyPlaceholderComponent.propDecorators = {
    emptyStateLabel: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHktcGxhY2Vob2xkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9lbXB0eS1wbGFjZWhvbGRlci9lbXB0eS1wbGFjZWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLHlCQUF5Qjs7O1lBTnJDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw2V0FBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OzhCQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1lbXB0eS1wbGFjZWhvbGRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2VtcHR5LXBsYWNlaG9sZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9lbXB0eS1wbGFjZWhvbGRlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBFbXB0eVBsYWNlaG9sZGVyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBlbXB0eVN0YXRlTGFiZWw6IHN0cmluZztcbn1cbiJdfQ==