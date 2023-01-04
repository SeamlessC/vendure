import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class FulfillmentStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'Pending':
            case 'Shipped':
                return 'warning';
            case 'Delivered':
                return 'success';
            case 'Cancelled':
                return 'error';
        }
    }
}
FulfillmentStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-state-label',
                template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Delivered'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{font-size:14px}\n"]
            },] }
];
FulfillmentStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsZmlsbG1lbnQtc3RhdGUtbGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9mdWxmaWxsbWVudC1zdGF0ZS1sYWJlbC9mdWxmaWxsbWVudC1zdGF0ZS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLDhCQUE4QjtJQUd2QyxJQUFJLGFBQWE7UUFDYixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxTQUFTLENBQUM7WUFDckIsS0FBSyxXQUFXO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLEtBQUssV0FBVztnQkFDWixPQUFPLE9BQU8sQ0FBQztTQUN0QjtJQUNMLENBQUM7OztZQW5CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsaVBBQXVEO2dCQUV2RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztvQkFFSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZnVsZmlsbG1lbnQtc3RhdGUtbGFiZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mdWxmaWxsbWVudC1zdGF0ZS1sYWJlbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZnVsZmlsbG1lbnQtc3RhdGUtbGFiZWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRnVsZmlsbG1lbnRTdGF0ZUxhYmVsQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzdGF0ZTogc3RyaW5nO1xuXG4gICAgZ2V0IGNoaXBDb2xvclR5cGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAnUGVuZGluZyc6XG4gICAgICAgICAgICBjYXNlICdTaGlwcGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgY2FzZSAnRGVsaXZlcmVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgY2FzZSAnQ2FuY2VsbGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==