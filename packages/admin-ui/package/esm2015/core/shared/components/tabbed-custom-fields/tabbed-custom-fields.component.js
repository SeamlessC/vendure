import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class TabbedCustomFieldsComponent {
    constructor() {
        this.readonly = false;
        this.compact = false;
        this.showLabel = true;
        this.defaultTabName = '__default_tab__';
    }
    ngOnInit() {
        this.tabbedCustomFields = this.groupByTabs(this.customFields);
    }
    customFieldIsSet(name) {
        var _a;
        return !!((_a = this.customFieldsFormGroup) === null || _a === void 0 ? void 0 : _a.get(name));
    }
    groupByTabs(customFieldConfigs) {
        var _a, _b, _c;
        const tabMap = new Map();
        for (const field of customFieldConfigs) {
            const tabName = (_b = (_a = field.ui) === null || _a === void 0 ? void 0 : _a.tab) !== null && _b !== void 0 ? _b : this.defaultTabName;
            if (tabMap.has(tabName)) {
                (_c = tabMap.get(tabName)) === null || _c === void 0 ? void 0 : _c.push(field);
            }
            else {
                tabMap.set(tabName, [field]);
            }
        }
        return Array.from(tabMap.entries())
            .sort((a, b) => (a[0] === this.defaultTabName ? -1 : 1))
            .map(([tabName, customFields]) => ({ tabName, customFields }));
    }
}
TabbedCustomFieldsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tabbed-custom-fields',
                template: "<ng-container *ngIf=\"1 < tabbedCustomFields.length; else singleGroup\">\n    <clr-tabs>\n        <clr-tab *ngFor=\"let group of tabbedCustomFields\">\n            <button clrTabLink>\n                {{\n                group.tabName === defaultTabName\n                    ? ('common.general' | translate)\n                    : (group.tabName | translate)\n                }}\n            </button>\n            <clr-tab-content *clrIfActive>\n                <div class=\"mt4\">\n                    <ng-container *ngFor=\"let customField of group.customFields\">\n                        <vdr-custom-field-control\n                            *ngIf=\"customFieldIsSet(customField.name)\"\n                            [entityName]=\"entityName\"\n                            [customFieldsFormGroup]=\"customFieldsFormGroup\"\n                            [customField]=\"customField\"\n                            [readonly]=\"readonly\"\n                            [compact]=\"compact\"\n                            [showLabel]=\"showLabel\"\n                        ></vdr-custom-field-control>\n                    </ng-container>\n                </div>\n            </clr-tab-content>\n        </clr-tab>\n    </clr-tabs>\n</ng-container>\n<ng-template #singleGroup>\n    <ng-container *ngFor=\"let customField of tabbedCustomFields[0]?.customFields\">\n        <vdr-custom-field-control\n            *ngIf=\"customFieldIsSet(customField.name)\"\n            [entityName]=\"entityName\"\n            [customFieldsFormGroup]=\"customFieldsFormGroup\"\n            [customField]=\"customField\"\n            [readonly]=\"readonly\"\n            [compact]=\"compact\"\n            [showLabel]=\"showLabel\"\n        ></vdr-custom-field-control>\n    </ng-container>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TabbedCustomFieldsComponent.propDecorators = {
    entityName: [{ type: Input }],
    customFields: [{ type: Input }],
    customFieldsFormGroup: [{ type: Input }],
    readonly: [{ type: Input }],
    compact: [{ type: Input }],
    showLabel: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmVkLWN1c3RvbS1maWVsZHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy90YWJiZWQtY3VzdG9tLWZpZWxkcy90YWJiZWQtY3VzdG9tLWZpZWxkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFjbEYsTUFBTSxPQUFPLDJCQUEyQjtJQU54QztRQVVhLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsaUJBQWlCLENBQUM7SUF5QmhELENBQUM7SUF0QkcsUUFBUTtRQUNKLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBWTs7UUFDekIsT0FBTyxDQUFDLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxxQkFBcUIsMENBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7SUFDbkQsQ0FBQztJQUVPLFdBQVcsQ0FBQyxrQkFBdUM7O1FBQ3ZELE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxFQUErQixDQUFDO1FBQ3RELEtBQUssTUFBTSxLQUFLLElBQUksa0JBQWtCLEVBQUU7WUFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBQSxNQUFBLEtBQUssQ0FBQyxFQUFFLDBDQUFFLEdBQUcsbUNBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNyRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JCLE1BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsMENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM5QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkQsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMseXdEQUFvRDtnQkFFcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7eUJBRUksS0FBSzsyQkFDTCxLQUFLO29DQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IEN1c3RvbUZpZWxkRW50aXR5TmFtZSB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9jdXN0b20tZmllbGQtY29tcG9uZW50L2N1c3RvbS1maWVsZC1jb21wb25lbnQuc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIEdyb3VwZWRDdXN0b21GaWVsZHMgPSBBcnJheTx7IHRhYk5hbWU6IHN0cmluZzsgY3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdIH0+O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci10YWJiZWQtY3VzdG9tLWZpZWxkcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmJlZC1jdXN0b20tZmllbGRzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YWJiZWQtY3VzdG9tLWZpZWxkcy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJiZWRDdXN0b21GaWVsZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGVudGl0eU5hbWU6IEN1c3RvbUZpZWxkRW50aXR5TmFtZTtcbiAgICBASW5wdXQoKSBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgQElucHV0KCkgY3VzdG9tRmllbGRzRm9ybUdyb3VwOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBjb21wYWN0ID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd0xhYmVsID0gdHJ1ZTtcbiAgICByZWFkb25seSBkZWZhdWx0VGFiTmFtZSA9ICdfX2RlZmF1bHRfdGFiX18nO1xuICAgIHRhYmJlZEN1c3RvbUZpZWxkczogR3JvdXBlZEN1c3RvbUZpZWxkcztcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYmJlZEN1c3RvbUZpZWxkcyA9IHRoaXMuZ3JvdXBCeVRhYnModGhpcy5jdXN0b21GaWVsZHMpO1xuICAgIH1cblxuICAgIGN1c3RvbUZpZWxkSXNTZXQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY3VzdG9tRmllbGRzRm9ybUdyb3VwPy5nZXQobmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBncm91cEJ5VGFicyhjdXN0b21GaWVsZENvbmZpZ3M6IEN1c3RvbUZpZWxkQ29uZmlnW10pOiBHcm91cGVkQ3VzdG9tRmllbGRzIHtcbiAgICAgICAgY29uc3QgdGFiTWFwID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbUZpZWxkQ29uZmlnW10+KCk7XG4gICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgY3VzdG9tRmllbGRDb25maWdzKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJOYW1lID0gZmllbGQudWk/LnRhYiA/PyB0aGlzLmRlZmF1bHRUYWJOYW1lO1xuICAgICAgICAgICAgaWYgKHRhYk1hcC5oYXModGFiTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0YWJNYXAuZ2V0KHRhYk5hbWUpPy5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiTWFwLnNldCh0YWJOYW1lLCBbZmllbGRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0YWJNYXAuZW50cmllcygpKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IChhWzBdID09PSB0aGlzLmRlZmF1bHRUYWJOYW1lID8gLTEgOiAxKSlcbiAgICAgICAgICAgIC5tYXAoKFt0YWJOYW1lLCBjdXN0b21GaWVsZHNdKSA9PiAoeyB0YWJOYW1lLCBjdXN0b21GaWVsZHMgfSkpO1xuICAgIH1cbn1cbiJdfQ==