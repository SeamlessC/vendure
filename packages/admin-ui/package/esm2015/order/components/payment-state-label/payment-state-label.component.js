import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class PaymentStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'Authorized':
                return 'warning';
            case 'Settled':
                return 'success';
            case 'Declined':
            case 'Cancelled':
                return 'error';
        }
    }
}
PaymentStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-state-label',
                template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Settled'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{font-size:14px}\n"]
            },] }
];
PaymentStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1zdGF0ZS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL3BheW1lbnQtc3RhdGUtbGFiZWwvcGF5bWVudC1zdGF0ZS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLDBCQUEwQjtJQUduQyxJQUFJLGFBQWE7UUFDYixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxZQUFZO2dCQUNiLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLEtBQUssU0FBUztnQkFDVixPQUFPLFNBQVMsQ0FBQztZQUNyQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLFdBQVc7Z0JBQ1osT0FBTyxPQUFPLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7WUFuQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLCtPQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7b0JBRUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXBheW1lbnQtc3RhdGUtbGFiZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYXltZW50LXN0YXRlLWxhYmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wYXltZW50LXN0YXRlLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnRTdGF0ZUxhYmVsQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzdGF0ZTogc3RyaW5nO1xuXG4gICAgZ2V0IGNoaXBDb2xvclR5cGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAnQXV0aG9yaXplZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3YXJuaW5nJztcbiAgICAgICAgICAgIGNhc2UgJ1NldHRsZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBjYXNlICdEZWNsaW5lZCc6XG4gICAgICAgICAgICBjYXNlICdDYW5jZWxsZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19