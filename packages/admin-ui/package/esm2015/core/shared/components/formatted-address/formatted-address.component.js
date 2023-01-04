import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class FormattedAddressComponent {
    getCountryName() {
        if (this.isAddressFragment(this.address)) {
            return this.address.country.name;
        }
        else {
            return this.address.country || '';
        }
    }
    getCustomFields() {
        const customFields = this.address.customFields;
        if (customFields) {
            return Object.entries(customFields)
                .filter(([key]) => key !== '__typename')
                .map(([key, value]) => { var _a, _b; return ({ key, value: (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '-' }); });
        }
        else {
            return [];
        }
    }
    isAddressFragment(input) {
        return typeof input.country !== 'string';
    }
}
FormattedAddressComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-formatted-address',
                template: "<ul class=\"address-lines\">\n    <li *ngIf=\"address.fullName\">{{ address.fullName }}</li>\n    <li *ngIf=\"address.company\">{{ address.company }}</li>\n    <li *ngIf=\"address.streetLine1\">{{ address.streetLine1 }}</li>\n    <li *ngIf=\"address.streetLine2\">{{ address.streetLine2 }}</li>\n    <li *ngIf=\"address.city\">{{ address.city }}</li>\n    <li *ngIf=\"address.province\">{{ address.province }}</li>\n    <li *ngIf=\"address.postalCode\">{{ address.postalCode }}</li>\n    <li *ngIf=\"address.country\">\n        <clr-icon shape=\"world\" size=\"12\"></clr-icon>\n        {{ getCountryName() }}\n    </li>\n    <li *ngIf=\"address.phoneNumber\">\n        <clr-icon shape=\"phone-handset\" size=\"12\"></clr-icon>\n        {{ address.phoneNumber }}\n    </li>\n    <li *ngFor=\"let customField of getCustomFields()\" class=\"custom-field\">\n        <vdr-labeled-data [label]=\"customField.key\">{{ customField.value }}</vdr-labeled-data>\n    </li>\n</ul>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".address-lines{list-style-type:none;line-height:1.2em}.custom-field{margin-top:6px}\n"]
            },] }
];
FormattedAddressComponent.propDecorators = {
    address: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVkLWFkZHJlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9mb3JtYXR0ZWQtYWRkcmVzcy9mb3JtYXR0ZWQtYWRkcmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVMUUsTUFBTSxPQUFPLHlCQUF5QjtJQUdsQyxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ3BDO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsTUFBTSxZQUFZLEdBQUksSUFBSSxDQUFDLE9BQWUsQ0FBQyxZQUFZLENBQUM7UUFDeEQsSUFBSSxZQUFZLEVBQUU7WUFDZCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2lCQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDO2lCQUN2QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGVBQUMsT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFBLE1BQUMsS0FBYSwwQ0FBRSxRQUFRLEVBQUUsbUNBQUksR0FBRyxFQUFFLENBQUMsQ0FBQSxFQUFBLENBQUMsQ0FBQztTQUNuRjthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFxQztRQUMzRCxPQUFPLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUM7SUFDN0MsQ0FBQzs7O1lBOUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyx3OUJBQWlEO2dCQUVqRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztzQkFFSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWRkcmVzc0ZyYWdtZW50LCBPcmRlckFkZHJlc3MgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZm9ybWF0dGVkLWFkZHJlc3MnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mb3JtYXR0ZWQtYWRkcmVzcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZm9ybWF0dGVkLWFkZHJlc3MuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWF0dGVkQWRkcmVzc0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgYWRkcmVzczogQWRkcmVzc0ZyYWdtZW50IHwgT3JkZXJBZGRyZXNzO1xuXG4gICAgZ2V0Q291bnRyeU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBZGRyZXNzRnJhZ21lbnQodGhpcy5hZGRyZXNzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkcmVzcy5jb3VudHJ5Lm5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRyZXNzLmNvdW50cnkgfHwgJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDdXN0b21GaWVsZHMoKTogQXJyYXk8eyBrZXk6IHN0cmluZzsgdmFsdWU6IGFueSB9PiB7XG4gICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkcyA9ICh0aGlzLmFkZHJlc3MgYXMgYW55KS5jdXN0b21GaWVsZHM7XG4gICAgICAgIGlmIChjdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhjdXN0b21GaWVsZHMpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW2tleV0pID0+IGtleSAhPT0gJ19fdHlwZW5hbWUnKVxuICAgICAgICAgICAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHsga2V5LCB2YWx1ZTogKHZhbHVlIGFzIGFueSk/LnRvU3RyaW5nKCkgPz8gJy0nIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNBZGRyZXNzRnJhZ21lbnQoaW5wdXQ6IEFkZHJlc3NGcmFnbWVudCB8IE9yZGVyQWRkcmVzcyk6IGlucHV0IGlzIEFkZHJlc3NGcmFnbWVudCB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaW5wdXQuY291bnRyeSAhPT0gJ3N0cmluZyc7XG4gICAgfVxufVxuIl19