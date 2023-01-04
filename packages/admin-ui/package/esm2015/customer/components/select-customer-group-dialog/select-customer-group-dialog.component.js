import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
export class SelectCustomerGroupDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedGroupIds = [];
    }
    ngOnInit() {
        this.groups$ = this.dataService.customer
            .getCustomerGroupList()
            .mapStream((res) => res.customerGroups.items);
    }
    cancel() {
        this.resolveWith();
    }
    add() {
        this.resolveWith(this.selectedGroupIds);
    }
}
SelectCustomerGroupDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-customer-group-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'customer.add-customer-to-group' | translate }}\n</ng-template>\n\n<ng-select\n    [items]=\"groups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"true\"\n    bindValue=\"id\"\n    [(ngModel)]=\"selectedGroupIds\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedGroupIds.length\" class=\"btn btn-primary\">\n        {{ 'customer.add-customer-to-groups-with-count' | translate: {count: selectedGroupIds.length} }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
SelectCustomerGroupDialogComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWN1c3RvbWVyLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9jb21wb25lbnRzL3NlbGVjdC1jdXN0b21lci1ncm91cC1kaWFsb2cvc2VsZWN0LWN1c3RvbWVyLWdyb3VwLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUzRSxPQUFPLEVBQUUsV0FBVyxFQUE4QyxNQUFNLHdCQUF3QixDQUFDO0FBVWpHLE1BQU0sT0FBTyxrQ0FBa0M7SUFLM0MsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGNUMscUJBQWdCLEdBQWEsRUFBRSxDQUFDO0lBRWUsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDbkMsb0JBQW9CLEVBQUU7YUFDdEIsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxHQUFHO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7WUF6QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLDRvQ0FBNEQ7Z0JBRTVELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBVFEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UsIERpYWxvZywgR2V0Q3VzdG9tZXJHcm91cHMsIEdldEN1c3RvbWVyTGlzdCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItc2VsZWN0LWN1c3RvbWVyLWdyb3VwLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1jdXN0b21lci1ncm91cC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC1jdXN0b21lci1ncm91cC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q3VzdG9tZXJHcm91cERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzxzdHJpbmdbXT4sIE9uSW5pdCB7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBncm91cHMkOiBPYnNlcnZhYmxlPEdldEN1c3RvbWVyR3JvdXBzLkl0ZW1zW10+O1xuICAgIHNlbGVjdGVkR3JvdXBJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdyb3VwcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAuZ2V0Q3VzdG9tZXJHcm91cExpc3QoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbSgocmVzKSA9PiByZXMuY3VzdG9tZXJHcm91cHMuaXRlbXMpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIGFkZCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGVkR3JvdXBJZHMpO1xuICAgIH1cbn1cbiJdfQ==