import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService, LocalStorageService } from '@vendure/admin-ui/core';
export class TestAddressFormComponent {
    constructor(formBuilder, dataService, localStorageService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.addressChange = new EventEmitter();
    }
    ngOnInit() {
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(result => result.countries.items);
        const storedValue = this.localStorageService.getForCurrentLocation('shippingTestAddress');
        const initialValue = storedValue
            ? storedValue
            : {
                city: '',
                countryCode: '',
                postalCode: '',
                province: '',
            };
        this.addressChange.emit(initialValue);
        this.form = this.formBuilder.group(initialValue);
        this.subscription = this.form.valueChanges.subscribe(value => {
            this.localStorageService.setForCurrentLocation('shippingTestAddress', value);
            this.addressChange.emit(value);
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
TestAddressFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-address-form',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        {{ 'settings.test-address' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <form [formGroup]=\"form\">\n            <clr-input-container>\n                <label>{{ 'customer.city' | translate }}</label>\n                <input formControlName=\"city\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.province' | translate }}</label>\n                <input formControlName=\"province\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.postal-code' | translate }}</label>\n                <input formControlName=\"postalCode\" type=\"text\" clrInput />\n            </clr-input-container>\n            <clr-input-container>\n                <label>{{ 'customer.country' | translate }}</label>\n                <select name=\"countryCode\" formControlName=\"countryCode\" clrInput clrSelect>\n                    <option *ngFor=\"let country of availableCountries$ | async\" [value]=\"country.code\">\n                        {{ country.name }}\n                    </option>\n                </select>\n            </clr-input-container>\n        </form>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-input-container{margin-bottom:12px}\n"]
            },] }
];
TestAddressFormComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DataService },
    { type: LocalStorageService }
];
TestAddressFormComponent.propDecorators = {
    addressChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1hZGRyZXNzLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy90ZXN0LWFkZHJlc3MtZm9ybS90ZXN0LWFkZHJlc3MtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBeUIsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWdCakcsTUFBTSxPQUFPLHdCQUF3QjtJQU1qQyxZQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLG1CQUF3QztRQUZ4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUjFDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztJQVN2RCxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDL0MscUJBQXFCLEVBQUU7YUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMxRixNQUFNLFlBQVksR0FBZ0IsV0FBVztZQUN6QyxDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQztnQkFDSSxJQUFJLEVBQUUsRUFBRTtnQkFDUixXQUFXLEVBQUUsRUFBRTtnQkFDZixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTthQUNmLENBQUM7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7WUE1Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDh6Q0FBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBaEJRLFdBQVc7WUFDWCxXQUFXO1lBQXlCLG1CQUFtQjs7OzRCQWlCM0QsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlLCBHZXRBdmFpbGFibGVDb3VudHJpZXMsIExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRlc3RBZGRyZXNzIHtcbiAgICBjaXR5OiBzdHJpbmc7XG4gICAgcHJvdmluY2U6IHN0cmluZztcbiAgICBwb3N0YWxDb2RlOiBzdHJpbmc7XG4gICAgY291bnRyeUNvZGU6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItdGVzdC1hZGRyZXNzLWZvcm0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXN0LWFkZHJlc3MtZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGVzdC1hZGRyZXNzLWZvcm0uY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVGVzdEFkZHJlc3NGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBPdXRwdXQoKSBhZGRyZXNzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUZXN0QWRkcmVzcz4oKTtcbiAgICBhdmFpbGFibGVDb3VudHJpZXMkOiBPYnNlcnZhYmxlPEdldEF2YWlsYWJsZUNvdW50cmllcy5JdGVtc1tdPjtcbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVDb3VudHJpZXMkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5nc1xuICAgICAgICAgICAgLmdldEF2YWlsYWJsZUNvdW50cmllcygpXG4gICAgICAgICAgICAubWFwU2luZ2xlKHJlc3VsdCA9PiByZXN1bHQuY291bnRyaWVzLml0ZW1zKTtcbiAgICAgICAgY29uc3Qgc3RvcmVkVmFsdWUgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0Rm9yQ3VycmVudExvY2F0aW9uKCdzaGlwcGluZ1Rlc3RBZGRyZXNzJyk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZTogVGVzdEFkZHJlc3MgPSBzdG9yZWRWYWx1ZVxuICAgICAgICAgICAgPyBzdG9yZWRWYWx1ZVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICBjaXR5OiAnJyxcbiAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiAnJyxcbiAgICAgICAgICAgICAgICAgIHBvc3RhbENvZGU6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvdmluY2U6ICcnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZHJlc3NDaGFuZ2UuZW1pdChpbml0aWFsVmFsdWUpO1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0Rm9yQ3VycmVudExvY2F0aW9uKCdzaGlwcGluZ1Rlc3RBZGRyZXNzJywgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5hZGRyZXNzQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19