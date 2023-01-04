import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@vendure/admin-ui/core';
import { concat, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
export class CouponCodeSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.addCouponCode = new EventEmitter();
        this.removeCouponCode = new EventEmitter();
        this.couponCodeInput$ = new Subject();
    }
    ngOnInit() {
        var _a;
        this.availableCouponCodes$ = concat(this.couponCodeInput$.pipe(distinctUntilChanged(), switchMap(term => this.dataService.promotion.getPromotions(10, 0, {
            couponCode: { contains: term },
        }).single$), map(({ promotions }) => 
        // tslint:disable-next-line:no-non-null-assertion
        promotions.items.map(p => ({ code: p.couponCode, promotionName: p.name }))), startWith([])));
        if (!this.control) {
            this.control = new FormControl((_a = this.couponCodes) !== null && _a !== void 0 ? _a : []);
        }
    }
}
CouponCodeSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-coupon-code-selector',
                template: "<ng-select\n    [items]=\"availableCouponCodes$ | async\"\n    appendTo=\"body\"\n    bindLabel=\"code\"\n    bindValue=\"code\"\n    [addTag]=\"false\"\n    [multiple]=\"true\"\n    [hideSelected]=\"true\"\n    [minTermLength]=\"2\"\n    typeToSearchText=\"\"\n    [typeahead]=\"couponCodeInput$\"\n    [formControl]=\"control\"\n    (add)=\"addCouponCode.emit($event.code)\"\n    (remove)=\"removeCouponCode.emit($event.value?.code)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip>{{ item.code }}</vdr-chip>\n        {{ item.promotionName }}\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CouponCodeSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
CouponCodeSelectorComponent.propDecorators = {
    couponCodes: [{ type: Input }],
    control: [{ type: Input }],
    addCouponCode: [{ type: Output }],
    removeCouponCode: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cG9uLWNvZGUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9vcmRlci9zcmMvY29tcG9uZW50cy9jb3Vwb24tY29kZS1zZWxlY3Rvci9jb3Vwb24tY29kZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWpGLE1BQU0sT0FBTywyQkFBMkI7SUFPcEMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFKbEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFeEQscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztJQUNNLENBQUM7SUFFaEQsUUFBUTs7UUFDSixJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUN0QixvQkFBb0IsRUFBRSxFQUN0QixTQUFTLENBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FDSCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM1QyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1NBQ2pDLENBQUMsQ0FBQyxPQUFPLENBQ2pCLEVBQ0QsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1FBQ25CLGlEQUFpRDtRQUNqRCxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDOUUsRUFDRCxTQUFTLENBQUMsRUFBRSxDQUFDLENBQ2hCLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFBLElBQUksQ0FBQyxXQUFXLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQzs7O1lBbkNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywwbUJBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVRRLFdBQVc7OzswQkFXZixLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsTUFBTTsrQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGNvbmNhdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNvdXBvbi1jb2RlLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY291cG9uLWNvZGUtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvdXBvbi1jb2RlLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvdXBvbkNvZGVTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgY291cG9uQ29kZXM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIGNvbnRyb2w6IEZvcm1Db250cm9sIHwgdW5kZWZpbmVkO1xuICAgIEBPdXRwdXQoKSBhZGRDb3Vwb25Db2RlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHJlbW92ZUNvdXBvbkNvZGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBhdmFpbGFibGVDb3Vwb25Db2RlcyQ6IE9ic2VydmFibGU8QXJyYXk8eyBjb2RlOiBzdHJpbmc7IHByb21vdGlvbk5hbWU6IHN0cmluZyB9Pj47XG4gICAgY291cG9uQ29kZUlucHV0JCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNvdXBvbkNvZGVzJCA9IGNvbmNhdChcbiAgICAgICAgICAgIHRoaXMuY291cG9uQ29kZUlucHV0JC5waXBlKFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAgICAgICAgICAgICB0ZXJtID0+XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb21vdGlvbi5nZXRQcm9tb3Rpb25zKDEwLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cG9uQ29kZTogeyBjb250YWluczogdGVybSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuc2luZ2xlJCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1hcCgoeyBwcm9tb3Rpb25zIH0pID0+XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgcHJvbW90aW9ucy5pdGVtcy5tYXAocCA9PiAoeyBjb2RlOiBwLmNvdXBvbkNvZGUhLCBwcm9tb3Rpb25OYW1lOiBwLm5hbWUgfSkpLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5jb3Vwb25Db2RlcyA/PyBbXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=