import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
export class AdministratorListComponent extends BaseListComponent {
    constructor(dataService, router, route, modalService, notificationService) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        super.setQueryFn((...args) => this.dataService.administrator.getAdministrators(...args), (data) => data.administrators);
    }
    deleteAdministrator(administrator) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-administrator'),
            body: `${administrator.firstName} ${administrator.lastName}`,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap((res) => res ? this.dataService.administrator.deleteAdministrator(administrator.id) : EMPTY))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Administrator',
            });
            this.refresh();
        }, (err) => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Administrator',
            });
        });
    }
}
AdministratorListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-administrator-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"administrator-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateAdministrator'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'admin.create-new-administrator' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'settings.first-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.last-name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.email-address' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-administrator=\"item\">\n        <td class=\"left align-middle\">{{ administrator.firstName }}</td>\n        <td class=\"left align-middle\">{{ administrator.lastName }}</td>\n        <td class=\"left align-middle\">{{ administrator.emailAddress }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', administrator.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteAdministrator(administrator)\"\n                        [disabled]=\"!('DeleteAdministrator' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: [""]
            },] }
];
AdministratorListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ModalService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRvci1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRvci1saXN0L2FkbWluaXN0cmF0b3ItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILGlCQUFpQixFQUNqQixXQUFXLEVBRVgsWUFBWSxFQUNaLG1CQUFtQixHQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzNDLE1BQU0sT0FBTywwQkFBMkIsU0FBUSxpQkFHL0M7SUFDRyxZQUNZLFdBQXdCLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQixFQUNiLFlBQTBCLEVBQzFCLG1CQUF3QztRQUVoRCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBTmIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUdoRCxLQUFLLENBQUMsVUFBVSxDQUNaLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQzdFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUNoQyxDQUFDO0lBQ04sQ0FBQztJQUVELG1CQUFtQixDQUFDLGFBQXNDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFlBQVk7YUFDbkIsTUFBTSxDQUFDO1lBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztZQUNoRCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDNUQsT0FBTyxFQUFFO2dCQUNMLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2FBQ25FO1NBQ0osQ0FBQzthQUNELElBQUksQ0FDRCxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQ3JGLENBQ0o7YUFDQSxTQUFTLENBQ04sR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxFQUFFLGVBQWU7YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFDRCxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ0osSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsRUFBRTtnQkFDNUQsTUFBTSxFQUFFLGVBQWU7YUFDMUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHkrRUFBa0Q7O2FBRXJEOzs7WUFaRyxXQUFXO1lBSlUsTUFBTTtZQUF0QixjQUFjO1lBTW5CLFlBQVk7WUFDWixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlTGlzdENvbXBvbmVudCxcbiAgICBEYXRhU2VydmljZSxcbiAgICBHZXRBZG1pbmlzdHJhdG9ycyxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hZG1pbmlzdHJhdG9yLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hZG1pbmlzdHJhdG9yLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FkbWluaXN0cmF0b3ItbGlzdC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbmlzdHJhdG9yTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VMaXN0Q29tcG9uZW50PFxuICAgIEdldEFkbWluaXN0cmF0b3JzLlF1ZXJ5LFxuICAgIEdldEFkbWluaXN0cmF0b3JzLkl0ZW1zXG4+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGVyLCByb3V0ZSk7XG4gICAgICAgIHN1cGVyLnNldFF1ZXJ5Rm4oXG4gICAgICAgICAgICAoLi4uYXJnczogYW55W10pID0+IHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvci5nZXRBZG1pbmlzdHJhdG9ycyguLi5hcmdzKSxcbiAgICAgICAgICAgIChkYXRhKSA9PiBkYXRhLmFkbWluaXN0cmF0b3JzLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZUFkbWluaXN0cmF0b3IoYWRtaW5pc3RyYXRvcjogR2V0QWRtaW5pc3RyYXRvcnMuSXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1hZG1pbmlzdHJhdG9yJyksXG4gICAgICAgICAgICAgICAgYm9keTogYCR7YWRtaW5pc3RyYXRvci5maXJzdE5hbWV9ICR7YWRtaW5pc3RyYXRvci5sYXN0TmFtZX1gLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChyZXMpID0+XG4gICAgICAgICAgICAgICAgICAgIHJlcyA/IHRoaXMuZGF0YVNlcnZpY2UuYWRtaW5pc3RyYXRvci5kZWxldGVBZG1pbmlzdHJhdG9yKGFkbWluaXN0cmF0b3IuaWQpIDogRU1QVFksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19