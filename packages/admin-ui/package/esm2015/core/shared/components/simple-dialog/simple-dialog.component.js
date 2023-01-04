import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * Used by ModalService.dialog() to host a generic configurable modal dialog.
 */
export class SimpleDialogComponent {
    constructor() {
        this.title = '';
        this.body = '';
        this.translationVars = {};
        this.buttons = [];
    }
}
SimpleDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-simple-dialog',
                template: "<ng-template vdrDialogTitle>{{ title | translate:translationVars }}</ng-template>\n<div style=\"white-space: pre-wrap;\">{{ body | translate:translationVars }}</div>\n<ng-template vdrDialogButtons>\n    <ng-container *ngFor=\"let button of buttons\">\n        <button\n            class=\"btn\"\n            [class.btn-primary]=\"button.type === 'primary'\"\n            [class.btn-danger]=\"button.type === 'danger'\"\n            (click)=\"resolveWith(button.returnValue)\"\n        >\n            {{ button.label | translate: (button.translationVars || {}) }}\n        </button>\n    </ng-container>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3NpbXBsZS1kaWFsb2cvc2ltcGxlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUkzRTs7R0FFRztBQU9ILE1BQU0sT0FBTyxxQkFBcUI7SUFObEM7UUFRSSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBbUMsRUFBRSxDQUFDO0lBQ2pELENBQUM7OztZQVpBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qix3bkJBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dCdXR0b25Db25maWcgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5cbi8qKlxuICogVXNlZCBieSBNb2RhbFNlcnZpY2UuZGlhbG9nKCkgdG8gaG9zdCBhIGdlbmVyaWMgY29uZmlndXJhYmxlIG1vZGFsIGRpYWxvZy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItc2ltcGxlLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpbXBsZS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NpbXBsZS1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgRGlhbG9nPGFueT4ge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICAgIHRpdGxlID0gJyc7XG4gICAgYm9keSA9ICcnO1xuICAgIHRyYW5zbGF0aW9uVmFycyA9IHt9O1xuICAgIGJ1dHRvbnM6IEFycmF5PERpYWxvZ0J1dHRvbkNvbmZpZzxhbnk+PiA9IFtdO1xufVxuIl19