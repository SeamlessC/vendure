import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
export class AddressDetailDialogComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.availableCountries = [];
    }
    ngOnInit() {
        this.addressForm.valueChanges.subscribe(() => this.changeDetector.markForCheck());
    }
    cancel() {
        this.resolveWith();
    }
    save() {
        this.resolveWith(this.addressForm);
    }
}
AddressDetailDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-address-detail-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span *ngIf=\"addressForm.get('streetLine1')?.value as streetLine1\">{{ streetLine1 }},</span>\n    <span *ngIf=\"addressForm.get('countryCode')?.value as countryCode\"> {{ countryCode }}</span>\n</ng-template>\n\n<vdr-address-form\n    [formGroup]=\"addressForm\"\n    [availableCountries]=\"availableCountries\"\n    [customFields]=\"customFields\"\n></vdr-address-form>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"save()\"\n        [disabled]=\"!addressForm.valid || !addressForm.touched\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-input-container{margin-bottom:12px}\n"]
            },] }
];
AddressDetailDialogComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1kZXRhaWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY3VzdG9tZXIvc3JjL2NvbXBvbmVudHMvYWRkcmVzcy1kZXRhaWwtZGlhbG9nL2FkZHJlc3MtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQVU5RixNQUFNLE9BQU8sNEJBQTRCO0lBTXJDLFlBQW9CLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUhyRCx1QkFBa0IsR0FBa0MsRUFBRSxDQUFDO0lBR0MsQ0FBQztJQUV6RCxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQXhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsMHlCQUFxRDtnQkFFckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFUaUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcsIERpYWxvZywgR2V0QXZhaWxhYmxlQ291bnRyaWVzIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFkZHJlc3MtZGV0YWlsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FkZHJlc3MtZGV0YWlsLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWRkcmVzcy1kZXRhaWwtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFkZHJlc3NEZXRhaWxEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBEaWFsb2c8Rm9ybUdyb3VwPiwgT25Jbml0IHtcbiAgICBhZGRyZXNzRm9ybTogRm9ybUdyb3VwO1xuICAgIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWc7XG4gICAgYXZhaWxhYmxlQ291bnRyaWVzOiBHZXRBdmFpbGFibGVDb3VudHJpZXMuSXRlbXNbXSA9IFtdO1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogRm9ybUdyb3VwKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgodGhpcy5hZGRyZXNzRm9ybSk7XG4gICAgfVxufVxuIl19