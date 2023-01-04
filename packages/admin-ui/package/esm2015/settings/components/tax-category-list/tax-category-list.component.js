import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DeletionResult } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export class TaxCategoryListComponent {
    constructor(dataService, notificationService, modalService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.queryResult = this.dataService.settings.getTaxCategories();
        this.taxCategories$ = this.queryResult.mapStream(data => data.taxCategories);
    }
    deleteTaxCategory(taxCategory) {
        return this.modalService
            .dialog({
            title: _('settings.confirm-delete-tax-category'),
            body: taxCategory.name,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.settings.deleteTaxCategory(taxCategory.id) : EMPTY)), map(res => res.deleteTaxCategory))
            .subscribe(res => {
            if (res.result === DeletionResult.DELETED) {
                this.notificationService.success(_('common.notify-delete-success'), {
                    entity: 'TaxRate',
                });
                this.queryResult.ref.refetch();
            }
            else {
                this.notificationService.error(res.message || _('common.notify-delete-error'), {
                    entity: 'TaxRate',
                });
            }
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'TaxRate',
            });
        });
    }
}
TaxCategoryListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-category-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreateTaxCategory']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-tax-category' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table [items]=\"taxCategories$ | async\">\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-taxCategory=\"item\">\n        <td class=\"left align-middle\">{{ taxCategory.name }}</td>\n        <td class=\"left align-middle\">\n            <vdr-chip *ngIf=\"taxCategory.isDefault\">{{ 'common.default-tax-category' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', taxCategory.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteTaxCategory(taxCategory)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteTaxCategory'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxCategoryListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LWNhdGVnb3J5LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy90YXgtY2F0ZWdvcnktbGlzdC90YXgtY2F0ZWdvcnktbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsY0FBYyxFQUFpQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdEQsTUFBTSxPQUFPLHdCQUF3QjtJQUlqQyxZQUNZLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxZQUEwQjtRQUYxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRWxDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxXQUFpQztRQUMvQyxPQUFPLElBQUksQ0FBQyxZQUFZO2FBQ25CLE1BQU0sQ0FBQztZQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsc0NBQXNDLENBQUM7WUFDaEQsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO1lBQ3RCLE9BQU8sRUFBRTtnQkFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDaEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTthQUNuRTtTQUNKLENBQUM7YUFDRCxJQUFJLENBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDN0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQ3BDO2FBQ0EsU0FBUyxDQUNOLEdBQUcsQ0FBQyxFQUFFO1lBQ0YsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLEVBQUU7b0JBQ2hFLE1BQU0sRUFBRSxTQUFTO2lCQUNwQixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO29CQUMzRSxNQUFNLEVBQUUsU0FBUztpQkFDcEIsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7OztZQXBESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDJzRUFBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBVFEsV0FBVztZQURYLG1CQUFtQjtZQUduQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEZWxldGlvblJlc3VsdCwgR2V0VGF4Q2F0ZWdvcmllcywgVGF4Q2F0ZWdvcnkgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBRdWVyeVJlc3VsdCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXRheC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGF4LWNhdGVnb3J5LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RheC1jYXRlZ29yeS1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRheENhdGVnb3J5TGlzdENvbXBvbmVudCB7XG4gICAgdGF4Q2F0ZWdvcmllcyQ6IE9ic2VydmFibGU8VGF4Q2F0ZWdvcnkuRnJhZ21lbnRbXT47XG4gICAgcHJpdmF0ZSBxdWVyeVJlc3VsdDogUXVlcnlSZXN1bHQ8R2V0VGF4Q2F0ZWdvcmllcy5RdWVyeT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5xdWVyeVJlc3VsdCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MuZ2V0VGF4Q2F0ZWdvcmllcygpO1xuICAgICAgICB0aGlzLnRheENhdGVnb3JpZXMkID0gdGhpcy5xdWVyeVJlc3VsdC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnRheENhdGVnb3JpZXMpO1xuICAgIH1cblxuICAgIGRlbGV0ZVRheENhdGVnb3J5KHRheENhdGVnb3J5OiBUYXhDYXRlZ29yeS5GcmFnbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdzZXR0aW5ncy5jb25maXJtLWRlbGV0ZS10YXgtY2F0ZWdvcnknKSxcbiAgICAgICAgICAgICAgICBib2R5OiB0YXhDYXRlZ29yeS5uYW1lLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlcyA9PiAocmVzID8gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5kZWxldGVUYXhDYXRlZ29yeSh0YXhDYXRlZ29yeS5pZCkgOiBFTVBUWSkpLFxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmRlbGV0ZVRheENhdGVnb3J5KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHQgPT09IERlbGV0aW9uUmVzdWx0LkRFTEVURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1RheFJhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5UmVzdWx0LnJlZi5yZWZldGNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IocmVzLm1lc3NhZ2UgfHwgXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1RheFJhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdUYXhSYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19