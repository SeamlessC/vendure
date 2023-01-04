import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { ModalService } from '@vendure/admin-ui/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AddressDetailDialogComponent } from '../address-detail-dialog/address-detail-dialog.component';
export class AddressCardComponent {
    constructor(modalService, changeDetector) {
        this.modalService = modalService;
        this.changeDetector = changeDetector;
        this.availableCountries = [];
        this.editable = true;
        this.setAsDefaultShipping = new EventEmitter();
        this.setAsDefaultBilling = new EventEmitter();
        this.deleteAddress = new EventEmitter();
        this.dataDependenciesPopulated = new BehaviorSubject(false);
    }
    ngOnInit() {
        const streetLine1 = this.addressForm.get('streetLine1');
        // Make the address dialog display automatically if there is no address line
        // as is the case when adding a new address.
        if (!streetLine1.value) {
            this.dataDependenciesPopulated
                .pipe(filter(value => value), take(1))
                .subscribe(() => {
                this.editAddress();
            });
        }
    }
    ngOnChanges(changes) {
        if (this.customFields != null && this.availableCountries != null) {
            this.dataDependenciesPopulated.next(true);
        }
    }
    getCountryName(countryCode) {
        if (!this.availableCountries) {
            return '';
        }
        const match = this.availableCountries.find(c => c.code === countryCode);
        return match ? match.name : '';
    }
    setAsDefaultBillingAddress() {
        this.setAsDefaultBilling.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    setAsDefaultShippingAddress() {
        this.setAsDefaultShipping.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    delete() {
        this.deleteAddress.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    editAddress() {
        this.modalService
            .fromComponent(AddressDetailDialogComponent, {
            locals: {
                addressForm: this.addressForm,
                customFields: this.customFields,
                availableCountries: this.availableCountries,
            },
            size: 'md',
            closable: true,
        })
            .subscribe(() => {
            this.changeDetector.markForCheck();
        });
    }
}
AddressCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-address-card',
                template: "<div class=\"card\" *ngIf=\"addressForm.value as address\">\n    <div class=\"card-header\">\n        <div class=\"address-title\">\n            <span class=\"street-line\" *ngIf=\"address.streetLine1\">{{ address.streetLine1 }},</span>\n            {{ address.countryCode }}\n        </div>\n        <div class=\"default-controls\">\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultShipping\">\n                <clr-icon shape=\"truck\"></clr-icon>\n                {{ 'customer.default-shipping-address' | translate }}\n            </vdr-chip>\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultBilling\">\n                <clr-icon shape=\"credit-card\"></clr-icon>\n                {{ 'customer.default-billing-address' | translate }}\n            </vdr-chip>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text\">\n            <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <vdr-entity-info [entity]=\"address\"></vdr-entity-info>\n        <ng-container *ngIf=\"editable\">\n            <button class=\"btn btn-sm btn-link\" (click)=\"editAddress()\">\n                {{ 'common.edit' | translate }}\n            </button>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-sm btn-link\" vdrDropdownTrigger>\n                    {{ 'common.more' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultShipping\"\n                        (click)=\"setAsDefaultShippingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-shipping-address' | translate }}\n                    </button>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultBilling\"\n                        (click)=\"setAsDefaultBillingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-billing-address' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"delete()\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;max-width:360px}clr-input-container{margin-bottom:12px}.defaul-controls{display:flex}.is-default{margin:0;color:var(--color-success-500)}\n"]
            },] }
];
AddressCardComponent.ctorParameters = () => [
    { type: ModalService },
    { type: ChangeDetectorRef }
];
AddressCardComponent.propDecorators = {
    addressForm: [{ type: Input }],
    customFields: [{ type: Input }],
    availableCountries: [{ type: Input }],
    isDefaultBilling: [{ type: Input }],
    isDefaultShipping: [{ type: Input }],
    editable: [{ type: Input }],
    setAsDefaultShipping: [{ type: Output }],
    setAsDefaultBilling: [{ type: Output }],
    deleteAddress: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY3VzdG9tZXIvc3JjL2NvbXBvbmVudHMvYWRkcmVzcy1jYXJkL2FkZHJlc3MtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEMsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBUXhHLE1BQU0sT0FBTyxvQkFBb0I7SUFZN0IsWUFBb0IsWUFBMEIsRUFBVSxjQUFpQztRQUFyRSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQVRoRix1QkFBa0IsR0FBa0MsRUFBRSxDQUFDO1FBR3ZELGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDZix5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2xELHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDakQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzdDLDhCQUF5QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRW9CLENBQUM7SUFFN0YsUUFBUTtRQUNKLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBZ0IsQ0FBQztRQUN2RSw0RUFBNEU7UUFDNUUsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyx5QkFBeUI7aUJBQ3pCLElBQUksQ0FDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWO2lCQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtZQUM5RCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUFtQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQztRQUN4RSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwyQkFBMkI7UUFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZO2FBQ1osYUFBYSxDQUFDLDRCQUE0QixFQUFFO1lBQ3pDLE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDL0Isa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjthQUM5QztZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQzthQUNELFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBL0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixnM0ZBQTRDO2dCQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVhrRCxZQUFZO1lBVjNELGlCQUFpQjs7OzBCQXVCaEIsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLO3VCQUNMLEtBQUs7bUNBQ0wsTUFBTTtrQ0FDTixNQUFNOzRCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcsIEdldEF2YWlsYWJsZUNvdW50cmllcywgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWRkcmVzc0RldGFpbERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2FkZHJlc3MtZGV0YWlsLWRpYWxvZy9hZGRyZXNzLWRldGFpbC1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYWRkcmVzcy1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWRkcmVzcy1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hZGRyZXNzLWNhcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWRkcmVzc0NhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgYWRkcmVzc0Zvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnO1xuICAgIEBJbnB1dCgpIGF2YWlsYWJsZUNvdW50cmllczogR2V0QXZhaWxhYmxlQ291bnRyaWVzLkl0ZW1zW10gPSBbXTtcbiAgICBASW5wdXQoKSBpc0RlZmF1bHRCaWxsaW5nOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaXNEZWZhdWx0U2hpcHBpbmc6IHN0cmluZztcbiAgICBASW5wdXQoKSBlZGl0YWJsZSA9IHRydWU7XG4gICAgQE91dHB1dCgpIHNldEFzRGVmYXVsdFNoaXBwaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHNldEFzRGVmYXVsdEJpbGxpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgZGVsZXRlQWRkcmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgZGF0YURlcGVuZGVuY2llc1BvcHVsYXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3RyZWV0TGluZTEgPSB0aGlzLmFkZHJlc3NGb3JtLmdldCgnc3RyZWV0TGluZTEnKSBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgLy8gTWFrZSB0aGUgYWRkcmVzcyBkaWFsb2cgZGlzcGxheSBhdXRvbWF0aWNhbGx5IGlmIHRoZXJlIGlzIG5vIGFkZHJlc3MgbGluZVxuICAgICAgICAvLyBhcyBpcyB0aGUgY2FzZSB3aGVuIGFkZGluZyBhIG5ldyBhZGRyZXNzLlxuICAgICAgICBpZiAoIXN0cmVldExpbmUxLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFEZXBlbmRlbmNpZXNQb3B1bGF0ZWRcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdEFkZHJlc3MoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzICE9IG51bGwgJiYgdGhpcy5hdmFpbGFibGVDb3VudHJpZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhRGVwZW5kZW5jaWVzUG9wdWxhdGVkLm5leHQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb3VudHJ5TmFtZShjb3VudHJ5Q29kZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5hdmFpbGFibGVDb3VudHJpZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuYXZhaWxhYmxlQ291bnRyaWVzLmZpbmQoYyA9PiBjLmNvZGUgPT09IGNvdW50cnlDb2RlKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2gubmFtZSA6ICcnO1xuICAgIH1cblxuICAgIHNldEFzRGVmYXVsdEJpbGxpbmdBZGRyZXNzKCkge1xuICAgICAgICB0aGlzLnNldEFzRGVmYXVsdEJpbGxpbmcuZW1pdCh0aGlzLmFkZHJlc3NGb3JtLnZhbHVlLmlkKTtcbiAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHNldEFzRGVmYXVsdFNoaXBwaW5nQWRkcmVzcygpIHtcbiAgICAgICAgdGhpcy5zZXRBc0RlZmF1bHRTaGlwcGluZy5lbWl0KHRoaXMuYWRkcmVzc0Zvcm0udmFsdWUuaWQpO1xuICAgICAgICB0aGlzLmFkZHJlc3NGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICB0aGlzLmRlbGV0ZUFkZHJlc3MuZW1pdCh0aGlzLmFkZHJlc3NGb3JtLnZhbHVlLmlkKTtcbiAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIGVkaXRBZGRyZXNzKCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQWRkcmVzc0RldGFpbERpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzRm9ybTogdGhpcy5hZGRyZXNzRm9ybSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlQ291bnRyaWVzOiB0aGlzLmF2YWlsYWJsZUNvdW50cmllcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==