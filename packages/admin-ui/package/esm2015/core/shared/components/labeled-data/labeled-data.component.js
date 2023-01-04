import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class LabeledDataComponent {
}
LabeledDataComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-labeled-data',
                template: "<div class=\"label-title\">{{ label }}</div>\n<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;margin-bottom:6px}.label-title{font-size:12px;color:var(--color-text-300);line-height:12px;margin-bottom:-4px}\n"]
            },] }
];
LabeledDataComponent.propDecorators = {
    label: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxlZC1kYXRhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvbGFiZWxlZC1kYXRhL2xhYmVsZWQtZGF0YS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLG9CQUFvQjs7O1lBTmhDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixxRkFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O29CQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1sYWJlbGVkLWRhdGEnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9sYWJlbGVkLWRhdGEuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xhYmVsZWQtZGF0YS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBMYWJlbGVkRGF0YUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbn1cbiJdfQ==