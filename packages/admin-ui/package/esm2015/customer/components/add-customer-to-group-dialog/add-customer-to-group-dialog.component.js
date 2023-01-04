import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
export class AddCustomerToGroupDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedCustomerIds = [];
        this.fetchGroupMembers$ = new BehaviorSubject({
            skip: 0,
            take: 10,
            filterTerm: '',
        });
    }
    ngOnInit() {
        const customerResult$ = this.fetchGroupMembers$.pipe(switchMap(({ skip, take, filterTerm }) => {
            return this.dataService.customer
                .getCustomerList(take, skip, filterTerm)
                .mapStream((res) => res.customers);
        }));
        this.customers$ = customerResult$.pipe(map((res) => res.items));
        this.customersTotal$ = customerResult$.pipe(map((res) => res.totalItems));
    }
    cancel() {
        this.resolveWith();
    }
    add() {
        this.resolveWith(this.selectedCustomerIds);
    }
}
AddCustomerToGroupDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-add-customer-to-group-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'customer.add-customers-to-group-with-name' | translate: {groupName: group.name} }}\n</ng-template>\n\n<vdr-customer-group-member-list\n    [members]=\"customers$ | async\"\n    [totalItems]=\"customersTotal$ | async\"\n    [route]=\"route\"\n    [selectedMemberIds]=\"selectedCustomerIds\"\n    (fetchParamsChange)=\"fetchGroupMembers$.next($event)\"\n    (selectionChange)=\"selectedCustomerIds = $event\"\n>\n\n</vdr-customer-group-member-list>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"add()\" [disabled]=\"!selectedCustomerIds.length\" class=\"btn btn-primary\">\n        {{ 'customer.add-customers-to-group-with-count' | translate: {count: selectedCustomerIds.length} }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AddCustomerToGroupDialogComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWN1c3RvbWVyLXRvLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9jb21wb25lbnRzL2FkZC1jdXN0b21lci10by1ncm91cC1kaWFsb2cvYWRkLWN1c3RvbWVyLXRvLWdyb3VwLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUzRSxPQUFPLEVBQUUsV0FBVyxFQUE4QyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVVoRCxNQUFNLE9BQU8saUNBQWlDO0lBYTFDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVDVDLHdCQUFtQixHQUFhLEVBQUUsQ0FBQztRQUduQyx1QkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBaUM7WUFDckUsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUMsQ0FBQztJQUU0QyxDQUFDO0lBRWhELFFBQVE7UUFDSixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUNoRCxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtpQkFDM0IsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDO2lCQUN2QyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELEdBQUc7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7OztZQXhDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsZzRCQUE0RDtnQkFFNUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFYUSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEYXRhU2VydmljZSwgRGlhbG9nLCBHZXRDdXN0b21lckdyb3VwcywgR2V0Q3VzdG9tZXJMaXN0IH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDdXN0b21lckdyb3VwTWVtYmVyRmV0Y2hQYXJhbXMgfSBmcm9tICcuLi9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hZGQtY3VzdG9tZXItdG8tZ3JvdXAtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWRkLWN1c3RvbWVyLXRvLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWRkLWN1c3RvbWVyLXRvLWdyb3VwLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRDdXN0b21lclRvR3JvdXBEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBEaWFsb2c8c3RyaW5nW10+LCBPbkluaXQge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0Pzogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgZ3JvdXA6IEdldEN1c3RvbWVyR3JvdXBzLkl0ZW1zO1xuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcbiAgICBzZWxlY3RlZEN1c3RvbWVySWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGN1c3RvbWVycyQ6IE9ic2VydmFibGU8R2V0Q3VzdG9tZXJMaXN0Lkl0ZW1zW10+O1xuICAgIGN1c3RvbWVyc1RvdGFsJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGZldGNoR3JvdXBNZW1iZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q3VzdG9tZXJHcm91cE1lbWJlckZldGNoUGFyYW1zPih7XG4gICAgICAgIHNraXA6IDAsXG4gICAgICAgIHRha2U6IDEwLFxuICAgICAgICBmaWx0ZXJUZXJtOiAnJyxcbiAgICB9KTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyUmVzdWx0JCA9IHRoaXMuZmV0Y2hHcm91cE1lbWJlcnMkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKHsgc2tpcCwgdGFrZSwgZmlsdGVyVGVybSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXJcbiAgICAgICAgICAgICAgICAgICAgLmdldEN1c3RvbWVyTGlzdCh0YWtlLCBza2lwLCBmaWx0ZXJUZXJtKVxuICAgICAgICAgICAgICAgICAgICAubWFwU3RyZWFtKChyZXMpID0+IHJlcy5jdXN0b21lcnMpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lcnMkID0gY3VzdG9tZXJSZXN1bHQkLnBpcGUobWFwKChyZXMpID0+IHJlcy5pdGVtcykpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyc1RvdGFsJCA9IGN1c3RvbWVyUmVzdWx0JC5waXBlKG1hcCgocmVzKSA9PiByZXMudG90YWxJdGVtcykpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIGFkZCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGVkQ3VzdG9tZXJJZHMpO1xuICAgIH1cbn1cbiJdfQ==