import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class OrderLabelComponent {
}
OrderLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-label',
                template: "<clr-icon shape=\"shopping-cart\" [class.is-solid]=\"order\"></clr-icon>\n<div>\n    <a [routerLink]=\"['/orders', order.id]\"> {{ order.code }} </a>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center}clr-icon{margin-right:6px}\n"]
            },] }
];
OrderLabelComponent.propDecorators = {
    order: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItbGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9vcmRlci1sYWJlbC9vcmRlci1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFVbEYsTUFBTSxPQUFPLG1CQUFtQjs7O1lBTi9CLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiwyS0FBMkM7Z0JBRTNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O29CQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLWxhYmVsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZGVyLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyTGFiZWxDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIG9yZGVyOiBPcmRlci5GcmFnbWVudDtcbn1cbiJdfQ==