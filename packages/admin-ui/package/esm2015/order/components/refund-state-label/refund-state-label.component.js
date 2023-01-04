import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class RefundStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'Pending':
                return 'warning';
            case 'Settled':
                return 'success';
            case 'Failed':
                return 'error';
        }
    }
}
RefundStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-refund-state-label',
                template: "<vdr-chip [title]=\"'order.payment-state' | translate\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"check-circle\" *ngIf=\"state === 'Settled'\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{font-size:14px}\n"]
            },] }
];
RefundStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdW5kLXN0YXRlLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvcmVmdW5kLXN0YXRlLWxhYmVsL3JlZnVuZC1zdGF0ZS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLHlCQUF5QjtJQUdsQyxJQUFJLGFBQWE7UUFDYixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxTQUFTO2dCQUNWLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLEtBQUssU0FBUztnQkFDVixPQUFPLFNBQVMsQ0FBQztZQUNyQixLQUFLLFFBQVE7Z0JBQ1QsT0FBTyxPQUFPLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7WUFsQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLCtPQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7b0JBRUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXJlZnVuZC1zdGF0ZS1sYWJlbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3JlZnVuZC1zdGF0ZS1sYWJlbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVmdW5kLXN0YXRlLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFJlZnVuZFN0YXRlTGFiZWxDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHN0YXRlOiBzdHJpbmc7XG5cbiAgICBnZXQgY2hpcENvbG9yVHlwZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICdQZW5kaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgY2FzZSAnU2V0dGxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ0ZhaWxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=