import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DataService } from '../../../data/providers/data.service';
import { ModalService } from '../../../providers/modal/modal.service';
import { ProductMultiSelectorDialogComponent } from '../../components/product-multi-selector-dialog/product-multi-selector-dialog.component';
export class ProductMultiSelectorFormInputComponent {
    constructor(modalService, dataService, changeDetector) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.changeDetector = changeDetector;
        this.mode = 'product';
        this.isListInput = true;
    }
    ngOnInit() {
        var _a, _b;
        this.mode = (_b = (_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.selectionMode) !== null && _b !== void 0 ? _b : 'product';
    }
    select() {
        this.modalService
            .fromComponent(ProductMultiSelectorDialogComponent, {
            size: 'xl',
            locals: {
                mode: this.mode,
                initialSelectionIds: this.formControl.value,
            },
        })
            .subscribe(selection => {
            if (selection) {
                this.formControl.setValue(selection.map(item => this.mode === 'product' ? item.productId : item.productVariantId));
                this.changeDetector.markForCheck();
            }
        });
    }
}
ProductMultiSelectorFormInputComponent.id = 'product-multi-form-input';
ProductMultiSelectorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-multi-selector-form-input',
                template: "<div class=\"flex\">\n    <button (click)=\"select()\" class=\"btn btn-sm btn-secondary\">\n        {{ 'common.items-selected-count' | translate: { count: formControl.value?.length ?? 0 } }}...\n    </button>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ProductMultiSelectorFormInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService },
    { type: ChangeDetectorRef }
];
ProductMultiSelectorFormInputComponent.propDecorators = {
    config: [{ type: Input }],
    formControl: [{ type: Input }],
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1mb3JtLWlucHV0L3Byb2R1Y3QtbXVsdGktc2VsZWN0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFLckcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSx3RkFBd0YsQ0FBQztBQVE3SSxNQUFNLE9BQU8sc0NBQXNDO0lBUS9DLFlBQ1ksWUFBMEIsRUFDMUIsV0FBd0IsRUFDeEIsY0FBaUM7UUFGakMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBUDdDLFNBQUksR0FBMEIsU0FBUyxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBT3pCLENBQUM7SUFFSixRQUFROztRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBQSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSwwQ0FBRSxhQUFhLG1DQUFJLFNBQVMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxZQUFZO2FBQ1osYUFBYSxDQUFDLG1DQUFtQyxFQUFFO1lBQ2hELElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixtQkFBbUIsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7YUFDOUM7U0FDSixDQUFDO2FBQ0QsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25CLElBQUksU0FBUyxFQUFFO2dCQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ2pCLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQ25FLENBQ0osQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztBQS9CZSx5Q0FBRSxHQUEyQiwwQkFBMEIsQ0FBQzs7WUFaM0UsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELHNPQUFpRTtnQkFFakUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFSUSxZQUFZO1lBRFosV0FBVztZQUxjLGlCQUFpQjs7O3FCQWdCOUMsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0TXVsdGlTZWxlY3RvckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1kaWFsb2cvcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LW11bHRpLXNlbGVjdG9yLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdE11bHRpU2VsZWN0b3JGb3JtSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgY29uZmlnOiBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZzwncHJvZHVjdC1tdWx0aS1mb3JtLWlucHV0Jz47XG4gICAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIG1vZGU6ICdwcm9kdWN0JyB8ICd2YXJpYW50JyA9ICdwcm9kdWN0JztcbiAgICByZWFkb25seSBpc0xpc3RJbnB1dCA9IHRydWU7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ3Byb2R1Y3QtbXVsdGktZm9ybS1pbnB1dCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1vZGUgPSB0aGlzLmNvbmZpZy51aT8uc2VsZWN0aW9uTW9kZSA/PyAncHJvZHVjdCc7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoUHJvZHVjdE11bHRpU2VsZWN0b3JEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLm1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxTZWxlY3Rpb25JZHM6IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLm1hcChpdGVtID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlID09PSAncHJvZHVjdCcgPyBpdGVtLnByb2R1Y3RJZCA6IGl0ZW0ucHJvZHVjdFZhcmlhbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19