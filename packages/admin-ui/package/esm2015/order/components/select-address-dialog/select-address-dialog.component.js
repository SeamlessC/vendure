import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService, } from '@vendure/admin-ui/core';
import { pick } from '@vendure/common/lib/pick';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GET_CUSTOMER_ADDRESSES } from './select-address-dialog.graphql';
export class SelectAddressDialogComponent {
    constructor(dataService, formBuilder) {
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.useExisting = true;
        this.createNew = false;
    }
    ngOnInit() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        this.addressForm = this.formBuilder.group({
            fullName: [(_b = (_a = this.currentAddress) === null || _a === void 0 ? void 0 : _a.fullName) !== null && _b !== void 0 ? _b : ''],
            company: [(_d = (_c = this.currentAddress) === null || _c === void 0 ? void 0 : _c.company) !== null && _d !== void 0 ? _d : ''],
            streetLine1: [(_f = (_e = this.currentAddress) === null || _e === void 0 ? void 0 : _e.streetLine1) !== null && _f !== void 0 ? _f : '', Validators.required],
            streetLine2: [(_h = (_g = this.currentAddress) === null || _g === void 0 ? void 0 : _g.streetLine2) !== null && _h !== void 0 ? _h : ''],
            city: [(_k = (_j = this.currentAddress) === null || _j === void 0 ? void 0 : _j.city) !== null && _k !== void 0 ? _k : '', Validators.required],
            province: [(_m = (_l = this.currentAddress) === null || _l === void 0 ? void 0 : _l.province) !== null && _m !== void 0 ? _m : ''],
            postalCode: [(_p = (_o = this.currentAddress) === null || _o === void 0 ? void 0 : _o.postalCode) !== null && _p !== void 0 ? _p : '', Validators.required],
            countryCode: [(_r = (_q = this.currentAddress) === null || _q === void 0 ? void 0 : _q.countryCode) !== null && _r !== void 0 ? _r : '', Validators.required],
            phoneNumber: [(_t = (_s = this.currentAddress) === null || _s === void 0 ? void 0 : _s.phoneNumber) !== null && _t !== void 0 ? _t : ''],
        });
        this.useExisting = !!this.customerId;
        this.addresses$ = this.customerId
            ? this.dataService
                .query(GET_CUSTOMER_ADDRESSES, { customerId: this.customerId })
                .mapSingle(({ customer }) => { var _a; return (_a = customer === null || customer === void 0 ? void 0 : customer.addresses) !== null && _a !== void 0 ? _a : []; })
                .pipe(tap(addresses => {
                if (this.currentAddress) {
                    this.selectedAddress = addresses.find(a => {
                        var _a, _b;
                        return a.streetLine1 === ((_a = this.currentAddress) === null || _a === void 0 ? void 0 : _a.streetLine1) &&
                            a.postalCode === ((_b = this.currentAddress) === null || _b === void 0 ? void 0 : _b.postalCode);
                    });
                }
                if (addresses.length === 0) {
                    this.createNew = true;
                    this.useExisting = false;
                }
            }))
            : of([]);
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(({ countries }) => countries.items);
    }
    trackByFn(item) {
        return item.id;
    }
    addressIdFn(item) {
        return item.streetLine1 + item.postalCode;
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        if (this.useExisting && this.selectedAddress) {
            this.resolveWith(Object.assign(Object.assign({}, pick(this.selectedAddress, [
                'fullName',
                'company',
                'streetLine1',
                'streetLine2',
                'city',
                'province',
                'phoneNumber',
                'postalCode',
            ])), { countryCode: this.selectedAddress.country.code }));
        }
        if (this.createNew && this.addressForm.valid) {
            const formValue = this.addressForm.value;
            this.resolveWith(formValue);
        }
    }
}
SelectAddressDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-address-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.select-address' | translate }}</ng-template>\n\n<clr-tabs *ngIf=\"addresses$ | async as addresses\">\n    <clr-tab *ngIf=\"customerId && addresses.length\">\n        <button clrTabLink>{{ 'order.existing-address' | translate }}</button>\n        <ng-template [(clrIfActive)]=\"useExisting\">\n            <clr-tab-content>\n                <vdr-radio-card-fieldset\n                    class=\"block mt4\"\n                    [idFn]=\"addressIdFn\"\n                    [selectedItemId]=\"selectedAddress && addressIdFn(selectedAddress)\"\n                    (selectItem)=\"selectedAddress = $event\"\n                >\n                    <vdr-radio-card *ngFor=\"let address of addresses\" [item]=\"address\">\n                        <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n                    </vdr-radio-card>\n                </vdr-radio-card-fieldset>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n    <clr-tab>\n        <button clrTabLink>{{ 'customer.create-new-address' | translate }}</button>\n\n        <ng-template [(clrIfActive)]=\"createNew\">\n            <clr-tab-content>\n                <vdr-address-form\n                    [formGroup]=\"addressForm\"\n                    [availableCountries]=\"availableCountries$ | async\"\n                ></vdr-address-form>\n            </clr-tab-content>\n        </ng-template>\n    </clr-tab>\n</clr-tabs>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        [disabled]=\"(useExisting && !selectedAddress) || (createNew && addressForm.invalid)\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.okay' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
SelectAddressDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: FormBuilder }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFkZHJlc3MtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvc2VsZWN0LWFkZHJlc3MtZGlhbG9nL3NlbGVjdC1hZGRyZXNzLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFJSCxXQUFXLEdBTWQsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFRekUsTUFBTSxPQUFPLDRCQUE0QjtJQVdyQyxZQUFvQixXQUF3QixFQUFVLFdBQXdCO1FBQTFELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFIOUUsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUUrRCxDQUFDO0lBRWxGLFFBQVE7O1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN0QyxRQUFRLEVBQUUsQ0FBQyxNQUFBLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsUUFBUSxtQ0FBSSxFQUFFLENBQUM7WUFDL0MsT0FBTyxFQUFFLENBQUMsTUFBQSxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLE9BQU8sbUNB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V0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFdBQVcsaUNBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzFCLFVBQVU7Z0JBQ1YsU0FBUztnQkFDVCxhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsTUFBTTtnQkFDTixVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsWUFBWTthQUNmLENBQUMsS0FDRixXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUNoRCxDQUFDO1NBQ047UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7OztZQTVGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsODJEQUFxRDtnQkFFckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFwQkcsV0FBVztZQUxOLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEFkZHJlc3NGcmFnbWVudCxcbiAgICBDcmVhdGVBZGRyZXNzSW5wdXQsXG4gICAgQ3JlYXRlQ3VzdG9tZXJJbnB1dCxcbiAgICBEYXRhU2VydmljZSxcbiAgICBEaWFsb2csXG4gICAgR2V0QXZhaWxhYmxlQ291bnRyaWVzUXVlcnksXG4gICAgR2V0Q3VzdG9tZXJBZGRyZXNzZXNRdWVyeSxcbiAgICBHZXRDdXN0b21lckFkZHJlc3Nlc1F1ZXJ5VmFyaWFibGVzLFxuICAgIE9yZGVyQWRkcmVzc0ZyYWdtZW50LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3BpY2snO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tICcuLi9zZWxlY3QtY3VzdG9tZXItZGlhbG9nL3NlbGVjdC1jdXN0b21lci1kaWFsb2cuY29tcG9uZW50JztcblxuaW1wb3J0IHsgR0VUX0NVU1RPTUVSX0FERFJFU1NFUyB9IGZyb20gJy4vc2VsZWN0LWFkZHJlc3MtZGlhbG9nLmdyYXBocWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1zZWxlY3QtYWRkcmVzcy1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtYWRkcmVzcy1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC1hZGRyZXNzLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RBZGRyZXNzRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8Q3JlYXRlQWRkcmVzc0lucHV0PiB7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBDcmVhdGVBZGRyZXNzSW5wdXQpID0+IHZvaWQ7XG4gICAgYXZhaWxhYmxlQ291bnRyaWVzJDogT2JzZXJ2YWJsZTxHZXRBdmFpbGFibGVDb3VudHJpZXNRdWVyeVsnY291bnRyaWVzJ11bJ2l0ZW1zJ10+O1xuICAgIGFkZHJlc3NlcyQ6IE9ic2VydmFibGU8QWRkcmVzc0ZyYWdtZW50W10+O1xuICAgIGN1c3RvbWVySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjdXJyZW50QWRkcmVzczogT3JkZXJBZGRyZXNzRnJhZ21lbnQgfCB1bmRlZmluZWQ7XG4gICAgYWRkcmVzc0Zvcm06IEZvcm1Hcm91cDtcbiAgICBzZWxlY3RlZEFkZHJlc3M6IEFkZHJlc3NGcmFnbWVudCB8IHVuZGVmaW5lZDtcbiAgICB1c2VFeGlzdGluZyA9IHRydWU7XG4gICAgY3JlYXRlTmV3ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRyZXNzRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgZnVsbE5hbWU6IFt0aGlzLmN1cnJlbnRBZGRyZXNzPy5mdWxsTmFtZSA/PyAnJ10sXG4gICAgICAgICAgICBjb21wYW55OiBbdGhpcy5jdXJyZW50QWRkcmVzcz8uY29tcGFueSA/PyAnJ10sXG4gICAgICAgICAgICBzdHJlZXRMaW5lMTogW3RoaXMuY3VycmVudEFkZHJlc3M/LnN0cmVldExpbmUxID8/ICcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHN0cmVldExpbmUyOiBbdGhpcy5jdXJyZW50QWRkcmVzcz8uc3RyZWV0TGluZTIgPz8gJyddLFxuICAgICAgICAgICAgY2l0eTogW3RoaXMuY3VycmVudEFkZHJlc3M/LmNpdHkgPz8gJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcHJvdmluY2U6IFt0aGlzLmN1cnJlbnRBZGRyZXNzPy5wcm92aW5jZSA/PyAnJ10sXG4gICAgICAgICAgICBwb3N0YWxDb2RlOiBbdGhpcy5jdXJyZW50QWRkcmVzcz8ucG9zdGFsQ29kZSA/PyAnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBjb3VudHJ5Q29kZTogW3RoaXMuY3VycmVudEFkZHJlc3M/LmNvdW50cnlDb2RlID8/ICcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBbdGhpcy5jdXJyZW50QWRkcmVzcz8ucGhvbmVOdW1iZXIgPz8gJyddLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51c2VFeGlzdGluZyA9ICEhdGhpcy5jdXN0b21lcklkO1xuICAgICAgICB0aGlzLmFkZHJlc3NlcyQgPSB0aGlzLmN1c3RvbWVySWRcbiAgICAgICAgICAgID8gdGhpcy5kYXRhU2VydmljZVxuICAgICAgICAgICAgICAgICAgLnF1ZXJ5PEdldEN1c3RvbWVyQWRkcmVzc2VzUXVlcnksIEdldEN1c3RvbWVyQWRkcmVzc2VzUXVlcnlWYXJpYWJsZXM+KFxuICAgICAgICAgICAgICAgICAgICAgIEdFVF9DVVNUT01FUl9BRERSRVNTRVMsXG4gICAgICAgICAgICAgICAgICAgICAgeyBjdXN0b21lcklkOiB0aGlzLmN1c3RvbWVySWQgfSxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoKHsgY3VzdG9tZXIgfSkgPT4gY3VzdG9tZXI/LmFkZHJlc3NlcyA/PyBbXSlcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgIHRhcChhZGRyZXNzZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QWRkcmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZHJlc3MgPSBhZGRyZXNzZXMuZmluZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuc3RyZWV0TGluZTEgPT09IHRoaXMuY3VycmVudEFkZHJlc3M/LnN0cmVldExpbmUxICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEucG9zdGFsQ29kZSA9PT0gdGhpcy5jdXJyZW50QWRkcmVzcz8ucG9zdGFsQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3Nlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTmV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlRXhpc3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBvZihbXSk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ291bnRyaWVzJCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC5nZXRBdmFpbGFibGVDb3VudHJpZXMoKVxuICAgICAgICAgICAgLm1hcFNpbmdsZSgoeyBjb3VudHJpZXMgfSkgPT4gY291bnRyaWVzLml0ZW1zKTtcbiAgICB9XG5cbiAgICB0cmFja0J5Rm4oaXRlbTogQ3VzdG9tZXIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaWQ7XG4gICAgfVxuXG4gICAgYWRkcmVzc0lkRm4oaXRlbTogQWRkcmVzc0ZyYWdtZW50KSB7XG4gICAgICAgIHJldHVybiBpdGVtLnN0cmVldExpbmUxICsgaXRlbS5wb3N0YWxDb2RlO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlRXhpc3RpbmcgJiYgdGhpcy5zZWxlY3RlZEFkZHJlc3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoe1xuICAgICAgICAgICAgICAgIC4uLnBpY2sodGhpcy5zZWxlY3RlZEFkZHJlc3MsIFtcbiAgICAgICAgICAgICAgICAgICAgJ2Z1bGxOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBhbnknLFxuICAgICAgICAgICAgICAgICAgICAnc3RyZWV0TGluZTEnLFxuICAgICAgICAgICAgICAgICAgICAnc3RyZWV0TGluZTInLFxuICAgICAgICAgICAgICAgICAgICAnY2l0eScsXG4gICAgICAgICAgICAgICAgICAgICdwcm92aW5jZScsXG4gICAgICAgICAgICAgICAgICAgICdwaG9uZU51bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICdwb3N0YWxDb2RlJyxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogdGhpcy5zZWxlY3RlZEFkZHJlc3MuY291bnRyeS5jb2RlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlTmV3ICYmIHRoaXMuYWRkcmVzc0Zvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuYWRkcmVzc0Zvcm0udmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKGZvcm1WYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=