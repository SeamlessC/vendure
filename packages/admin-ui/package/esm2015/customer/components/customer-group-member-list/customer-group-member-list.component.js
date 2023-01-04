import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators';
export class CustomerGroupMemberListComponent {
    constructor(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.selectedMemberIds = [];
        this.selectionChange = new EventEmitter();
        this.fetchParamsChange = new EventEmitter();
        this.filterTermControl = new FormControl('');
        this.refresh$ = new BehaviorSubject(true);
        this.destroy$ = new Subject();
        this.isMemberSelected = (member) => {
            return -1 < this.selectedMemberIds.indexOf(member.id);
        };
    }
    ngOnInit() {
        this.membersCurrentPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('membersPage')), map(page => (!page ? 1 : +page)), startWith(1), distinctUntilChanged());
        this.membersItemsPerPage$ = this.route.paramMap.pipe(map(qpm => qpm.get('membersPerPage')), map(perPage => (!perPage ? 10 : +perPage)), startWith(10), distinctUntilChanged());
        const filterTerm$ = this.filterTermControl.valueChanges.pipe(debounceTime(250), tap(() => this.setContentsPageNumber(1)), startWith(''));
        combineLatest(this.membersCurrentPage$, this.membersItemsPerPage$, filterTerm$, this.refresh$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([currentPage, itemsPerPage, filterTerm]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            this.fetchParamsChange.emit({
                filterTerm,
                skip,
                take,
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setContentsPageNumber(page) {
        this.setParam('membersPage', page);
    }
    setContentsItemsPerPage(perPage) {
        this.setParam('membersPerPage', perPage);
    }
    refresh() {
        this.refresh$.next(true);
    }
    setParam(key, value) {
        this.router.navigate(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { [key]: value })], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
    areAllSelected() {
        if (this.members) {
            return this.selectedMemberIds.length === this.members.length;
        }
        else {
            return false;
        }
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectionChange.emit([]);
        }
        else {
            this.selectionChange.emit(this.members.map(v => v.id));
        }
    }
    toggleSelectMember({ item: member }) {
        if (this.selectedMemberIds.includes(member.id)) {
            this.selectionChange.emit(this.selectedMemberIds.filter(id => id !== member.id));
        }
        else {
            this.selectionChange.emit([...this.selectedMemberIds, member.id]);
        }
    }
}
CustomerGroupMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-member-list',
                template: "<input\n    type=\"text\"\n    name=\"searchTerm\"\n    [formControl]=\"filterTermControl\"\n    [placeholder]=\"'customer.search-customers-by-email' | translate\"\n    class=\"search-input\"\n/>\n\n<vdr-data-table\n    [items]=\"members\"\n    [itemsPerPage]=\"membersItemsPerPage$ | async\"\n    [totalItems]=\"totalItems\"\n    [currentPage]=\"membersCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"('UpdateCustomerGroup' | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/customer', 'customers', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupMemberListComponent.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
CustomerGroupMemberListComponent.propDecorators = {
    members: [{ type: Input }],
    totalItems: [{ type: Input }],
    route: [{ type: Input }],
    selectedMemberIds: [{ type: Input }],
    selectionChange: [{ type: Output }],
    fetchParamsChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jdXN0b21lci9zcmMvY29tcG9uZW50cy9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC9jdXN0b21lci1ncm91cC1tZW1iZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBa0IsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFZLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBbUJwRyxNQUFNLE9BQU8sZ0NBQWdDO0lBY3pDLFlBQW9CLE1BQWMsRUFBVSxXQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWM0Qsc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUlqRixzQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFDOUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFzRnZDLHFCQUFnQixHQUFHLENBQUMsTUFBc0IsRUFBVyxFQUFFO1lBQ25ELE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0lBdEZxRSxDQUFDO0lBRXhFLFFBQVE7UUFDSixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNoQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQztRQUVGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUNyQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDMUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLG9CQUFvQixFQUFFLENBQ3pCLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDeEQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3hDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FDaEIsQ0FBQztRQUVGLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3pGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFO1lBQ25ELE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQztZQUMxQixNQUFNLElBQUksR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDeEIsVUFBVTtnQkFDVixJQUFJO2dCQUNKLElBQUk7YUFDUCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxJQUFZO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxPQUFlO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxrQ0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUcsRUFBRTtZQUMxRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDdEIsbUJBQW1CLEVBQUUsT0FBTztTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoRTthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVELGtCQUFrQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBNEI7UUFDekQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQzs7O1lBdEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxxZ0RBQTBEO2dCQUUxRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQXJCd0IsTUFBTTtZQUNaLFdBQVc7OztzQkFzQnpCLEtBQUs7eUJBQ0wsS0FBSztvQkFDTCxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsTUFBTTtnQ0FDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDdXN0b21lciwgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbWVyR3JvdXBNZW1iZXJGZXRjaFBhcmFtcyB7XG4gICAgc2tpcDogbnVtYmVyO1xuICAgIHRha2U6IG51bWJlcjtcbiAgICBmaWx0ZXJUZXJtOiBzdHJpbmc7XG59XG5cbnR5cGUgQ3VzdG9tZXJHcm91cE1lbWJlciA9IFBpY2s8XG4gICAgQ3VzdG9tZXIsXG4gICAgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCcgfCAndGl0bGUnIHwgJ2ZpcnN0TmFtZScgfCAnbGFzdE5hbWUnIHwgJ2VtYWlsQWRkcmVzcydcbj47XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1c3RvbWVyLWdyb3VwLW1lbWJlci1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItZ3JvdXAtbWVtYmVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWdyb3VwLW1lbWJlci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyR3JvdXBNZW1iZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG1lbWJlcnM6IEN1c3RvbWVyR3JvdXBNZW1iZXJbXTtcbiAgICBASW5wdXQoKSB0b3RhbEl0ZW1zOiBudW1iZXI7XG4gICAgQElucHV0KCkgcm91dGU6IEFjdGl2YXRlZFJvdXRlO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkTWVtYmVySWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICAgIEBPdXRwdXQoKSBmZXRjaFBhcmFtc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q3VzdG9tZXJHcm91cE1lbWJlckZldGNoUGFyYW1zPigpO1xuXG4gICAgbWVtYmVyc0l0ZW1zUGVyUGFnZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBtZW1iZXJzQ3VycmVudFBhZ2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgZmlsdGVyVGVybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHByaXZhdGUgcmVmcmVzaCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZW1iZXJzQ3VycmVudFBhZ2UkID0gdGhpcy5yb3V0ZS5wYXJhbU1hcC5waXBlKFxuICAgICAgICAgICAgbWFwKHFwbSA9PiBxcG0uZ2V0KCdtZW1iZXJzUGFnZScpKSxcbiAgICAgICAgICAgIG1hcChwYWdlID0+ICghcGFnZSA/IDEgOiArcGFnZSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKDEpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm1lbWJlcnNJdGVtc1BlclBhZ2UkID0gdGhpcy5yb3V0ZS5wYXJhbU1hcC5waXBlKFxuICAgICAgICAgICAgbWFwKHFwbSA9PiBxcG0uZ2V0KCdtZW1iZXJzUGVyUGFnZScpKSxcbiAgICAgICAgICAgIG1hcChwZXJQYWdlID0+ICghcGVyUGFnZSA/IDEwIDogK3BlclBhZ2UpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgxMCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlclRlcm0kID0gdGhpcy5maWx0ZXJUZXJtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuc2V0Q29udGVudHNQYWdlTnVtYmVyKDEpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLm1lbWJlcnNDdXJyZW50UGFnZSQsIHRoaXMubWVtYmVyc0l0ZW1zUGVyUGFnZSQsIGZpbHRlclRlcm0kLCB0aGlzLnJlZnJlc2gkKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW2N1cnJlbnRQYWdlLCBpdGVtc1BlclBhZ2UsIGZpbHRlclRlcm1dKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFrZSA9IGl0ZW1zUGVyUGFnZTtcbiAgICAgICAgICAgICAgICBjb25zdCBza2lwID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBpdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFBhcmFtc0NoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGVybSxcbiAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHNldENvbnRlbnRzUGFnZU51bWJlcihwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbSgnbWVtYmVyc1BhZ2UnLCBwYWdlKTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50c0l0ZW1zUGVyUGFnZShwZXJQYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbSgnbWVtYmVyc1BlclBhZ2UnLCBwZXJQYWdlKTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2gkLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYXJhbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJywgeyAuLi50aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtcywgW2tleV06IHZhbHVlIH1dLCB7XG4gICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogJ21lcmdlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJlQWxsU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm1lbWJlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTWVtYmVySWRzLmxlbmd0aCA9PT0gdGhpcy5tZW1iZXJzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXJlQWxsU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMubWVtYmVycy5tYXAodiA9PiB2LmlkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RNZW1iZXIoeyBpdGVtOiBtZW1iZXIgfTogeyBpdGVtOiB7IGlkOiBzdHJpbmcgfSB9KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVtYmVySWRzLmluY2x1ZGVzKG1lbWJlci5pZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZE1lbWJlcklkcy5maWx0ZXIoaWQgPT4gaWQgIT09IG1lbWJlci5pZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbLi4udGhpcy5zZWxlY3RlZE1lbWJlcklkcywgbWVtYmVyLmlkXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01lbWJlclNlbGVjdGVkID0gKG1lbWJlcjogeyBpZDogc3RyaW5nIH0pOiBib29sZWFuID0+IHtcbiAgICAgICAgcmV0dXJuIC0xIDwgdGhpcy5zZWxlY3RlZE1lbWJlcklkcy5pbmRleE9mKG1lbWJlci5pZCk7XG4gICAgfTtcbn1cbiJdfQ==