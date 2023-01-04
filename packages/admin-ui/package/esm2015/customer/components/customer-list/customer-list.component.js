import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, LogicalOperator, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { SortOrder } from '@vendure/common/lib/generated-shop-types';
import { EMPTY } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
export class CustomerListComponent extends BaseListComponent {
    constructor(dataService, router, route, modalService, notificationService) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.searchTerm = new FormControl('');
        super.setQueryFn((...args) => this.dataService.customer.getCustomerList(...args).refetchOnChannelChange(), data => data.customers, (skip, take) => ({
            options: {
                skip,
                take,
                filter: {
                    emailAddress: {
                        contains: this.searchTerm.value,
                    },
                    lastName: {
                        contains: this.searchTerm.value,
                    },
                    postalCode: {
                        contains: this.searchTerm.value,
                    },
                },
                filterOperator: LogicalOperator.OR,
                sort: {
                    createdAt: SortOrder.DESC,
                },
            },
        }));
    }
    ngOnInit() {
        super.ngOnInit();
        this.searchTerm.valueChanges
            .pipe(filter(value => 2 < value.length || value.length === 0), debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
    }
    deleteCustomer(customer) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-customer'),
            body: `${customer.firstName} ${customer.lastName}`,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.customer.deleteCustomer(customer.id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Customer',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Customer',
            });
        });
    }
}
CustomerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <input\n            type=\"text\"\n            name=\"emailSearchTerm\"\n            [formControl]=\"searchTerm\"\n            [placeholder]=\"'customer.search-customers-by-email-last-name-postal-code' | translate\"\n            class=\"search-input\"\n        />\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-customer' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'customer.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'customer.customer-type' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-customer=\"item\">\n        <td class=\"left align-middle\">\n            {{ customer.title }} {{ customer.firstName }} {{ customer.lastName }}\n        </td>\n        <td class=\"left align-middle\">{{ customer.emailAddress }}</td>\n        <td class=\"left align-middle\">\n            <vdr-customer-status-label [customer]=\"customer\"></vdr-customer-status-label>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', customer.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteCustomer(customer)\"\n                        [disabled]=\"!('DeleteCustomer' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [".search-input{margin-top:6px;min-width:300px}\n"]
            },] }
];
CustomerListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2N1c3RvbWVyL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyLWxpc3QvY3VzdG9tZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsV0FBVyxFQUVYLGVBQWUsRUFDZixZQUFZLEVBQ1osbUJBQW1CLEdBQ3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzVFLE1BQU0sT0FBTyxxQkFDVCxTQUFRLGlCQUErRDtJQUl2RSxZQUNZLFdBQXdCLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQixFQUNiLFlBQTBCLEVBQzFCLG1CQUF3QztRQUVoRCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBTmIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQU5wRCxlQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFTN0Is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QUFXO1lBSlUsTUFBTTtZQUF0QixjQUFjO1lBT25CLFlBQVk7WUFDWixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZUxpc3RDb21wb25lbnQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgR2V0Q3VzdG9tZXJMaXN0LFxuICAgIExvZ2ljYWxPcGVyYXRvcixcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBTb3J0T3JkZXIgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL2dlbmVyYXRlZC1zaG9wLXR5cGVzJztcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1c3RvbWVyLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jdXN0b21lci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTGlzdENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZUxpc3RDb21wb25lbnQ8R2V0Q3VzdG9tZXJMaXN0LlF1ZXJ5LCBHZXRDdXN0b21lckxpc3QuSXRlbXM+XG4gICAgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgICBzZWFyY2hUZXJtID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGVyLCByb3V0ZSk7XG4gICAgICAgIHN1cGVyLnNldFF1ZXJ5Rm4oXG4gICAgICAgICAgICAoLi4uYXJnczogYW55W10pID0+IHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIuZ2V0Q3VzdG9tZXJMaXN0KC4uLmFyZ3MpLnJlZmV0Y2hPbkNoYW5uZWxDaGFuZ2UoKSxcbiAgICAgICAgICAgIGRhdGEgPT4gZGF0YS5jdXN0b21lcnMsXG4gICAgICAgICAgICAoc2tpcCwgdGFrZSkgPT4gKHtcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbnM6IHRoaXMuc2VhcmNoVGVybS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiB0aGlzLnNlYXJjaFRlcm0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGFsQ29kZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiB0aGlzLnNlYXJjaFRlcm0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJPcGVyYXRvcjogTG9naWNhbE9wZXJhdG9yLk9SLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IDIgPCB2YWx1ZS5sZW5ndGggfHwgdmFsdWUubGVuZ3RoID09PSAwKSxcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjUwKSxcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgICB9XG5cbiAgICBkZWxldGVDdXN0b21lcihjdXN0b21lcjogR2V0Q3VzdG9tZXJMaXN0Lkl0ZW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NhdGFsb2cuY29uZmlybS1kZWxldGUtY3VzdG9tZXInKSxcbiAgICAgICAgICAgICAgICBib2R5OiBgJHtjdXN0b21lci5maXJzdE5hbWV9ICR7Y3VzdG9tZXIubGFzdE5hbWV9YCxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKHN3aXRjaE1hcChyZXMgPT4gKHJlcyA/IHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIuZGVsZXRlQ3VzdG9tZXIoY3VzdG9tZXIuaWQpIDogRU1QVFkpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0N1c3RvbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0N1c3RvbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19