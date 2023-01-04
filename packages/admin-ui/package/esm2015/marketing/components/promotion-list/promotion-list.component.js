import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
import { EMPTY, merge } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
export class PromotionListComponent extends BaseListComponent {
    constructor(dataService, router, route, notificationService, modalService) {
        super(router, route);
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.searchForm = new FormGroup({
            name: new FormControl(''),
            couponCode: new FormControl(''),
        });
        super.setQueryFn((...args) => this.dataService.promotion.getPromotions(...args).refetchOnChannelChange(), data => data.promotions, (skip, take) => this.createQueryOptions(skip, take, this.searchForm.value));
    }
    ngOnInit() {
        super.ngOnInit();
        merge(this.searchForm.valueChanges.pipe(debounceTime(250)), this.route.queryParamMap)
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
            if (!val.params) {
                this.setPageNumber(1);
            }
            this.refresh();
        });
    }
    deletePromotion(promotionId) {
        this.modalService
            .dialog({
            title: _('catalog.confirm-delete-promotion'),
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response ? this.dataService.promotion.deletePromotion(promotionId) : EMPTY))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Promotion',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Promotion',
            });
        });
    }
    createQueryOptions(skip, take, searchForm) {
        const filter = {};
        if (searchForm.couponCode) {
            filter.couponCode = { contains: searchForm.couponCode };
        }
        if (searchForm.name) {
            filter.name = { contains: searchForm.name };
        }
        return {
            options: {
                skip,
                take,
                filter,
            },
        };
    }
}
PromotionListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-promotion-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <form class=\"search-form\" [formGroup]=\"searchForm\">\n            <input\n                type=\"text\"\n                formControlName=\"name\"\n                [placeholder]=\"'marketing.search-by-name' | translate\"\n                class=\"search-input\"\n            />\n            <input\n                type=\"text\"\n                formControlName=\"couponCode\"\n                [placeholder]=\"'marketing.search-by-coupon-code' | translate\"\n                class=\"search-input\"\n            />\n        </form>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"promotion-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\"\n           *vdrIfPermissions=\"'CreatePromotion'\"\n           [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'marketing.create-new-promotion' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.coupon-code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.starts-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.ends-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-promotion=\"item\">\n        <td class=\"left align-middle\">{{ promotion.name }}</td>\n        <td class=\"left align-middle\">\n            <vdr-chip *ngIf=\"promotion.couponCode\">\n                {{ promotion.couponCode }}\n            </vdr-chip>\n        </td>\n        <td class=\"left align-middle\">{{ promotion.startsAt | localeDate: 'longDate' }}</td>\n        <td class=\"left align-middle\">{{ promotion.endsAt | localeDate: 'longDate' }}</td>\n        <td class=\"align-middle\">\n            <vdr-chip *ngIf=\"!promotion.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', promotion.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deletePromotion(promotion.id)\"\n                        [disabled]=\"!('DeletePromotion' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".search-form{padding:0}.search-input{margin:6px 8px 0 0;min-width:200px}\n"]
            },] }
];
PromotionListComponent.ctorParameters = () => [
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute },
    { type: NotificationService },
    { type: ModalService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90aW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9tYXJrZXRpbmcvc3JjL2NvbXBvbmVudHMvcHJvbW90aW9uLWxpc3QvcHJvbW90aW9uLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFrRCxNQUFNLHdCQUF3QixDQUFDO0FBRTNHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFhcEUsTUFBTSxPQUFPLHNCQUNULFNBQVEsaUJBQWlFO0lBT3pFLFlBQ1ksV0FBd0IsRUFDaEMsTUFBYyxFQUNkLEtBQXFCLEVBQ2IsbUJBQXdDLEVBQ3hDLFlBQTBCO1FBRWxDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFOYixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUd4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlC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QyxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9DO1FBRUQsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJO2dCQUNKLElBQUk7Z0JBQ0osTUFBTTthQUNUO1NBQ0osQ0FBQztJQUNOLENBQUM7OztZQTdGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsdWhIQUE4QztnQkFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFmUSxXQUFXO1lBTEssTUFBTTtZQUF0QixjQUFjO1lBSWQsbUJBQW1CO1lBRW5CLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IEJhc2VMaXN0Q29tcG9uZW50LCBQcm9tb3Rpb25GaWx0ZXJQYXJhbWV0ZXIsIFByb21vdGlvbkxpc3RPcHRpb25zIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBHZXRQcm9tb3Rpb25MaXN0IH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIFByb21vdGlvblNlYXJjaEZvcm0gPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNvdXBvbkNvZGU6IHN0cmluZztcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXByb21vdGlvbi1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvbW90aW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb21vdGlvbi1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb21vdGlvbkxpc3RDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VMaXN0Q29tcG9uZW50PEdldFByb21vdGlvbkxpc3QuUXVlcnksIEdldFByb21vdGlvbkxpc3QuSXRlbXM+XG4gICAgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNlYXJjaEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICAgbmFtZTogbmV3IEZvcm1Db250cm9sKCcnKSxcbiAgICAgICAgY291cG9uQ29kZTogbmV3IEZvcm1Db250cm9sKCcnKSxcbiAgICB9KTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZXIsIHJvdXRlKTtcbiAgICAgICAgc3VwZXIuc2V0UXVlcnlGbihcbiAgICAgICAgICAgICguLi5hcmdzOiBhbnlbXSkgPT4gdGhpcy5kYXRhU2VydmljZS5wcm9tb3Rpb24uZ2V0UHJvbW90aW9ucyguLi5hcmdzKS5yZWZldGNoT25DaGFubmVsQ2hhbmdlKCksXG4gICAgICAgICAgICBkYXRhID0+IGRhdGEucHJvbW90aW9ucyxcbiAgICAgICAgICAgIChza2lwLCB0YWtlKSA9PiB0aGlzLmNyZWF0ZVF1ZXJ5T3B0aW9ucyhza2lwLCB0YWtlLCB0aGlzLnNlYXJjaEZvcm0udmFsdWUpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIG1lcmdlKHRoaXMuc2VhcmNoRm9ybS52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMjUwKSksIHRoaXMucm91dGUucXVlcnlQYXJhbU1hcClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbC5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQYWdlTnVtYmVyKDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZVByb21vdGlvbihwcm9tb3Rpb25JZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1wcm9tb3Rpb24nKSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA/IHRoaXMuZGF0YVNlcnZpY2UucHJvbW90aW9uLmRlbGV0ZVByb21vdGlvbihwcm9tb3Rpb25JZCkgOiBFTVBUWSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUHJvbW90aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb21vdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUXVlcnlPcHRpb25zKFxuICAgICAgICBza2lwOiBudW1iZXIsXG4gICAgICAgIHRha2U6IG51bWJlcixcbiAgICAgICAgc2VhcmNoRm9ybTogUHJvbW90aW9uU2VhcmNoRm9ybSxcbiAgICApOiB7IG9wdGlvbnM6IFByb21vdGlvbkxpc3RPcHRpb25zIH0ge1xuICAgICAgICBjb25zdCBmaWx0ZXI6IFByb21vdGlvbkZpbHRlclBhcmFtZXRlciA9IHt9O1xuXG4gICAgICAgIGlmIChzZWFyY2hGb3JtLmNvdXBvbkNvZGUpIHtcbiAgICAgICAgICAgIGZpbHRlci5jb3Vwb25Db2RlID0geyBjb250YWluczogc2VhcmNoRm9ybS5jb3Vwb25Db2RlIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VhcmNoRm9ybS5uYW1lKSB7XG4gICAgICAgICAgICBmaWx0ZXIubmFtZSA9IHsgY29udGFpbnM6IHNlYXJjaEZvcm0ubmFtZSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=