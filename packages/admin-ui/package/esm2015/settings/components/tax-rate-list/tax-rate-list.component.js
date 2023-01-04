import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { DeletionResult } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export class TaxRateListComponent extends BaseListComponent {
    constructor(modalService, notificationService, dataService, router, route) {
        super(router, route);
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.dataService = dataService;
        super.setQueryFn((...args) => this.dataService.settings.getTaxRates(...args), data => data.taxRates);
    }
    deleteTaxRate(taxRate) {
        return this.modalService
            .dialog({
            title: _('settings.confirm-delete-tax-rate'),
            body: taxRate.name,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.settings.deleteTaxRate(taxRate.id) : EMPTY)), map(res => res.deleteTaxRate))
            .subscribe(res => {
            if (res.result === DeletionResult.DELETED) {
                this.notificationService.success(_('common.notify-delete-success'), {
                    entity: 'TaxRate',
                });
                this.refresh();
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
TaxRateListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tax-rate-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"tax-rate-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateSettings', 'CreateTaxRate']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-tax-rate' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.tax-category' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.zone' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.tax-rate' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-taxRate=\"item\">\n        <td class=\"left align-middle\">{{ taxRate.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.category.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.zone.name }}</td>\n        <td class=\"left align-middle\">{{ taxRate.value }}%</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', taxRate.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteTaxRate(taxRate)\"\n                        [disabled]=\"!(['DeleteSettings', 'DeleteTaxRate'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TaxRateListComponent.ctorParameters = () => [
    { type: ModalService },
    { type: NotificationService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LXJhdGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NldHRpbmdzL3NyYy9jb21wb25lbnRzL3RheC1yYXRlLWxpc3QvdGF4LXJhdGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsaUJBQTZEO0lBQ25HLFlBQ1ksWUFBMEIsRUFDMUIsbUJBQXdDLEVBQ3hDLFdBQXdCLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQjtRQUVyQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBTmIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUtoQyxLQUFLLENBQUMsVUFBVSxDQUNaLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUNsRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQTZCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFlBQVk7YUFDbkIsTUFBTSxDQUFDO1lBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQztZQUM1QyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFFO2dCQUNMLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2FBQ25FO1NBQ0osQ0FBQzthQUNELElBQUksQ0FDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDckYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUNoQzthQUNBLFNBQVMsQ0FDTixHQUFHLENBQUMsRUFBRTtZQUNGLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO29CQUNoRSxNQUFNLEVBQUUsU0FBUztpQkFDcEIsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7b0JBQzNFLE1BQU0sRUFBRSxTQUFTO2lCQUNwQixDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQzVELE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQzs7O1lBdERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qiw2bUZBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVBRLFlBQVk7WUFGWixtQkFBbUI7WUFDbkIsV0FBVztZQVJLLE1BQU07WUFBdEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBCYXNlTGlzdENvbXBvbmVudCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGVsZXRpb25SZXN1bHQsIEdldFRheFJhdGVMaXN0IH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXRheC1yYXRlLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YXgtcmF0ZS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YXgtcmF0ZS1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRheFJhdGVMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUxpc3RDb21wb25lbnQ8R2V0VGF4UmF0ZUxpc3QuUXVlcnksIEdldFRheFJhdGVMaXN0Lkl0ZW1zPiB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlciwgcm91dGUpO1xuICAgICAgICBzdXBlci5zZXRRdWVyeUZuKFxuICAgICAgICAgICAgKC4uLmFyZ3M6IGFueVtdKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldFRheFJhdGVzKC4uLmFyZ3MpLFxuICAgICAgICAgICAgZGF0YSA9PiBkYXRhLnRheFJhdGVzLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZVRheFJhdGUodGF4UmF0ZTogR2V0VGF4UmF0ZUxpc3QuSXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXygnc2V0dGluZ3MuY29uZmlybS1kZWxldGUtdGF4LXJhdGUnKSxcbiAgICAgICAgICAgICAgICBib2R5OiB0YXhSYXRlLm5hbWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2RhbmdlcicsIGxhYmVsOiBfKCdjb21tb24uZGVsZXRlJyksIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzID0+IChyZXMgPyB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmRlbGV0ZVRheFJhdGUodGF4UmF0ZS5pZCkgOiBFTVBUWSkpLFxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmRlbGV0ZVRheFJhdGUpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJlc3VsdCA9PT0gRGVsZXRpb25SZXN1bHQuREVMRVRFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnVGF4UmF0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHJlcy5tZXNzYWdlIHx8IF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdUYXhSYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnVGF4UmF0ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==