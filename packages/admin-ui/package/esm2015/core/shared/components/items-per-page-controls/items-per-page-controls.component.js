import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A control for setting the number of items per page in a paginated list.
 */
export class ItemsPerPageControlsComponent {
    constructor() {
        this.itemsPerPage = 10;
        this.itemsPerPageChange = new EventEmitter();
    }
}
ItemsPerPageControlsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-items-per-page-controls',
                template: "<div class=\"select\">\n    <select [ngModel]=\"itemsPerPage\" (change)=\"itemsPerPageChange.emit($event.target.value)\">\n        <option [value]=\"10\">{{ 'common.items-per-page-option' | translate: { count: 10 } }}</option>\n        <option [value]=\"25\">{{ 'common.items-per-page-option' | translate: { count: 25 } }}</option>\n        <option [value]=\"50\">{{ 'common.items-per-page-option' | translate: { count: 50 } }}</option>\n        <option [value]=\"100\">{{ 'common.items-per-page-option' | translate: { count: 100 } }}</option>\n    </select>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ItemsPerPageControlsComponent.propDecorators = {
    itemsPerPage: [{ type: Input }],
    itemsPerPageChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMtcGVyLXBhZ2UtY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9pdGVtcy1wZXItcGFnZS1jb250cm9scy9pdGVtcy1wZXItcGFnZS1jb250cm9scy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRzs7R0FFRztBQU9ILE1BQU0sT0FBTyw2QkFBNkI7SUFOMUM7UUFPYSxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNqQix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQzlELENBQUM7OztZQVRBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyxva0JBQXVEO2dCQUV2RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzsyQkFFSSxLQUFLO2lDQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGNvbnRyb2wgZm9yIHNldHRpbmcgdGhlIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBpbiBhIHBhZ2luYXRlZCBsaXN0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1pdGVtcy1wZXItcGFnZS1jb250cm9scycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2l0ZW1zLXBlci1wYWdlLWNvbnRyb2xzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pdGVtcy1wZXItcGFnZS1jb250cm9scy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc1BlclBhZ2VDb250cm9sc0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgaXRlbXNQZXJQYWdlID0gMTA7XG4gICAgQE91dHB1dCgpIGl0ZW1zUGVyUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xufVxuIl19