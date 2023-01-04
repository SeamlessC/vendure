import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
export class DataTableColumnComponent {
    constructor() {
        /**
         * When set to true, this column will expand to use avaiable width
         */
        this.expand = false;
    }
}
DataTableColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dt-column',
                template: `
        <ng-template><ng-content></ng-content></ng-template>
    `
            },] }
];
DataTableColumnComponent.propDecorators = {
    expand: [{ type: Input }],
    template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUtY29sdW1uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUWpGLE1BQU0sT0FBTyx3QkFBd0I7SUFOckM7UUFPSTs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFFNUIsQ0FBQzs7O1lBWkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7O0tBRVQ7YUFDSjs7O3FCQUtJLEtBQUs7dUJBQ0wsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZHQtY29sdW1uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNldCB0byB0cnVlLCB0aGlzIGNvbHVtbiB3aWxsIGV4cGFuZCB0byB1c2UgYXZhaWFibGUgd2lkdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKSBleHBhbmQgPSBmYWxzZTtcbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cbiJdfQ==