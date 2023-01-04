import { Component, Input } from '@angular/core';
/**
 * A button link to be used as actions in rows of a table.
 */
export class TableRowActionComponent {
    constructor() {
        this.large = false;
        this.disabled = false;
    }
}
TableRowActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-table-row-action',
                template: "<ng-container *ngIf=\"!disabled; else disabledLink\">\n    <a class=\"btn btn-sm\" [routerLink]=\"linkTo\" [ngClass]=\"{ 'big-btn': large }\">\n        <clr-icon [attr.shape]=\"iconShape\"></clr-icon>\n        {{ label }}\n    </a>\n</ng-container>\n<ng-template #disabledLink>\n    <button class=\"btn btn-sm\" disabled>\n        <clr-icon [attr.shape]=\"iconShape\"></clr-icon>\n        {{ label }}\n    </button>\n</ng-template>\n",
                styles: ["a.btn{margin:0}.big-btn{font-size:16px;padding:.5rem 1rem;height:100%}\n"]
            },] }
];
TableRowActionComponent.propDecorators = {
    large: [{ type: Input }],
    linkTo: [{ type: Input }],
    label: [{ type: Input }],
    iconShape: [{ type: Input }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcm93LWFjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlLXJvdy1hY3Rpb24vdGFibGUtcm93LWFjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQ7O0dBRUc7QUFNSCxNQUFNLE9BQU8sdUJBQXVCO0lBTHBDO1FBTWEsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUlkLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQzs7O1lBWEEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLDZiQUFnRDs7YUFFbkQ7OztvQkFFSSxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGJ1dHRvbiBsaW5rIHRvIGJlIHVzZWQgYXMgYWN0aW9ucyBpbiByb3dzIG9mIGEgdGFibGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXRhYmxlLXJvdy1hY3Rpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1yb3ctYWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YWJsZS1yb3ctYWN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlUm93QWN0aW9uQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBsYXJnZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGxpbmtUbzogYW55W107XG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBpY29uU2hhcGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xufVxuIl19