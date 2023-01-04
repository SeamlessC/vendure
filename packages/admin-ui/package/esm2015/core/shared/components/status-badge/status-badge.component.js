import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class StatusBadgeComponent {
    constructor() {
        this.type = 'info';
    }
}
StatusBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-status-badge',
                template: "<div class=\"status-badge\" [class]=\"type\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:absolute}.status-badge{width:10px;height:10px;border-radius:50%;border:1px solid var(--color-component-border-100)}.status-badge.info{background-color:var(--color-primary-600)}.status-badge.success{background-color:var(--color-success-500)}.status-badge.warning{background-color:var(--color-warning-500)}.status-badge.error{background-color:var(--color-error-400)}\n"]
            },] }
];
StatusBadgeComponent.propDecorators = {
    type: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvc3RhdHVzLWJhZGdlL3N0YXR1cy1iYWRnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLG9CQUFvQjtJQU5qQztRQU9hLFNBQUksR0FBNkMsTUFBTSxDQUFDO0lBQ3JFLENBQUM7OztZQVJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixpRUFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O21CQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1zdGF0dXMtYmFkZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zdGF0dXMtYmFkZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3N0YXR1cy1iYWRnZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNCYWRnZUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdHlwZTogJ2luZm8nIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyA9ICdpbmZvJztcbn1cbiJdfQ==