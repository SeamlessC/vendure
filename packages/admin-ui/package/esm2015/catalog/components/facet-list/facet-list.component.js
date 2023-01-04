import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, DeletionResult, ModalService, NotificationService, SelectionManager, ServerConfigService, } from '@vendure/admin-ui/core';
import { SortOrder } from '@vendure/common/lib/generated-shop-types';
import { EMPTY } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
export class FacetListComponent extends BaseListComponent {
    constructor(dataService, modalService, notificationService, serverConfigService, router, route) {
        super(router, route);
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.serverConfigService = serverConfigService;
        this.filterTermControl = new FormControl('');
        this.initialLimit = 3;
        this.displayLimit = {};
        super.setQueryFn((...args) => this.dataService.facet.getFacets(...args).refetchOnChannelChange(), data => data.facets, (skip, take) => ({
            options: {
                skip,
                take,
                filter: {
                    name: {
                        contains: this.filterTermControl.value,
                    },
                },
                sort: {
                    createdAt: SortOrder.DESC,
                },
            },
        }));
        this.selectionManager = new SelectionManager({
            multiSelect: true,
            itemsAreEqual: (a, b) => a.id === b.id,
            additiveMode: true,
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
        this.contentLanguage$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.contentLanguage)
            .pipe(tap(() => this.refresh()));
        this.filterTermControl.valueChanges
            .pipe(filter(value => 2 <= value.length || value.length === 0), debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
    }
    toggleDisplayLimit(facet) {
        if (this.displayLimit[facet.id] === facet.values.length) {
            this.displayLimit[facet.id] = this.initialLimit;
        }
        else {
            this.displayLimit[facet.id] = facet.values.length;
        }
    }
    deleteFacet(facetValueId) {
        this.showModalAndDelete(facetValueId)
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(facetValueId, response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }), 
        // Refresh the cached facets to reflect the changes
        switchMap(() => this.dataService.facet.getAllFacets().single$))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'FacetValue',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'FacetValue',
            });
        });
    }
    setLanguage(code) {
        this.dataService.client.setContentLanguage(code).subscribe();
    }
    showModalAndDelete(facetId, message) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-facet'),
            body: message,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                {
                    type: 'danger',
                    label: message ? _('common.force-delete') : _('common.delete'),
                    returnValue: true,
                },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.facet.deleteFacet(facetId, !!message) : EMPTY)), map(res => res.deleteFacet));
    }
}
FacetListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"\">\n            <input\n                type=\"text\"\n                name=\"searchTerm\"\n                [formControl]=\"filterTermControl\"\n                [placeholder]=\"'catalog.filter-by-name' | translate\"\n                class=\"clr-input search-input\"\n            />\n            <div>\n                <vdr-language-selector\n                    [availableLanguageCodes]=\"availableLanguages$ | async\"\n                    [currentLanguageCode]=\"contentLanguage$ | async\"\n                    (languageCodeChange)=\"setLanguage($event)\"\n                ></vdr-language-selector>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-list\"></vdr-action-bar-items>\n        <a\n            class=\"btn btn-primary\"\n            *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n            [routerLink]=\"['./create']\"\n        >\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-facet' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    [selectionManager]=\"selectionManager\"\n>\n    <vdr-bulk-action-menu\n        locationId=\"facet-list\"\n        [hostComponent]=\"this\"\n        [selectionManager]=\"selectionManager\"\n    ></vdr-bulk-action-menu>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'catalog.values' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.visibility' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-facet=\"item\">\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.code }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.name }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-facet-value-chip\n                *ngFor=\"let value of facet.values | slice: 0:displayLimit[facet.id] || 3\"\n                [facetValue]=\"value\"\n                [removable]=\"false\"\n                [displayFacetName]=\"false\"\n            ></vdr-facet-value-chip>\n            <button\n                class=\"btn btn-sm btn-secondary btn-icon\"\n                *ngIf=\"facet.values.length > initialLimit\"\n                (click)=\"toggleDisplayLimit(facet)\"\n            >\n                <ng-container *ngIf=\"(displayLimit[facet.id] || 0) < facet.values.length; else collapse\">\n                    <clr-icon shape=\"plus\"></clr-icon>\n                    {{ facet.values.length - initialLimit }}\n                </ng-container>\n                <ng-template #collapse>\n                    <clr-icon shape=\"minus\"></clr-icon>\n                </ng-template>\n            </button>\n        </td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-chip>\n                <ng-container *ngIf=\"!facet.isPrivate; else private\">{{\n                    'catalog.public' | translate\n                }}</ng-container>\n                <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n            </vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', facet.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteFacet(facet.id)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteFacet'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                styles: ["td.private{background-color:var(--color-component-bg-200)}\n"]
            },] }
];
FacetListComponent.ctorParameters = () => [
    { type: DataService },
    { type: ModalService },
    { type: NotificationService },
    { type: ServerConfigService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvZmFjZXQtbGlzdC9mYWNldC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsY0FBYyxFQUdkLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLG1CQUFtQixHQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3RGLE1BQU0sT0FBTyxrQkFDVCxTQUFRLGlCQUF5RDtJQVVqRSxZQUNZLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLG1CQUF3QyxFQUN4QyxtQkFBd0MsRUFDaEQsTUFBYyxFQUNkLEtBQXFCO1FBRXJCLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFQYixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FB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RUFBRTtnQkFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDaEQ7b0JBQ0ksSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7b0JBQzlELFdBQVcsRUFBRSxJQUFJO2lCQUNwQjthQUNKO1NBQ0osQ0FBQzthQUNELElBQUksQ0FDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3hGLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FDOUIsQ0FBQztJQUNWLENBQUM7OztZQTlISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsbzZKQUEwQzs7YUFFN0M7OztZQWpCRyxXQUFXO1lBSVgsWUFBWTtZQUNaLG1CQUFtQjtZQUVuQixtQkFBbUI7WUFYRSxNQUFNO1lBQXRCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQmFzZUxpc3RDb21wb25lbnQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgRGVsZXRpb25SZXN1bHQsXG4gICAgR2V0RmFjZXRMaXN0LFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBTZWxlY3Rpb25NYW5hZ2VyLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgU29ydE9yZGVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9nZW5lcmF0ZWQtc2hvcC10eXBlcyc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZmFjZXQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZhY2V0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZhY2V0LWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRMaXN0Q29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlTGlzdENvbXBvbmVudDxHZXRGYWNldExpc3QuUXVlcnksIEdldEZhY2V0TGlzdC5JdGVtcz5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgIGZpbHRlclRlcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBhdmFpbGFibGVMYW5ndWFnZXMkOiBPYnNlcnZhYmxlPExhbmd1YWdlQ29kZVtdPjtcbiAgICBjb250ZW50TGFuZ3VhZ2UkOiBPYnNlcnZhYmxlPExhbmd1YWdlQ29kZT47XG4gICAgcmVhZG9ubHkgaW5pdGlhbExpbWl0ID0gMztcbiAgICBkaXNwbGF5TGltaXQ6IHsgW2lkOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuICAgIHNlbGVjdGlvbk1hbmFnZXI6IFNlbGVjdGlvbk1hbmFnZXI8R2V0RmFjZXRMaXN0Lkl0ZW1zPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlciwgcm91dGUpO1xuICAgICAgICBzdXBlci5zZXRRdWVyeUZuKFxuICAgICAgICAgICAgKC4uLmFyZ3M6IGFueVtdKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmdldEZhY2V0cyguLi5hcmdzKS5yZWZldGNoT25DaGFubmVsQ2hhbmdlKCksXG4gICAgICAgICAgICBkYXRhID0+IGRhdGEuZmFjZXRzLFxuICAgICAgICAgICAgKHNraXAsIHRha2UpID0+ICh7XG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICB0YWtlLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluczogdGhpcy5maWx0ZXJUZXJtQ29udHJvbC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogU29ydE9yZGVyLkRFU0MsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIgPSBuZXcgU2VsZWN0aW9uTWFuYWdlcjxHZXRGYWNldExpc3QuSXRlbXM+KHtcbiAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgaXRlbXNBcmVFcXVhbDogKGEsIGIpID0+IGEuaWQgPT09IGIuaWQsXG4gICAgICAgICAgICBhZGRpdGl2ZU1vZGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUxhbmd1YWdlcyQgPSB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2UuZ2V0QXZhaWxhYmxlTGFuZ3VhZ2VzKCk7XG4gICAgICAgIHRoaXMuY29udGVudExhbmd1YWdlJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudWlTdGF0ZSgpXG4gICAgICAgICAgICAubWFwU3RyZWFtKCh7IHVpU3RhdGUgfSkgPT4gdWlTdGF0ZS5jb250ZW50TGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZSh0YXAoKCkgPT4gdGhpcy5yZWZyZXNoKCkpKTtcbiAgICAgICAgdGhpcy5maWx0ZXJUZXJtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiAyIDw9IHZhbHVlLmxlbmd0aCB8fCB2YWx1ZS5sZW5ndGggPT09IDApLFxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIH1cblxuICAgIHRvZ2dsZURpc3BsYXlMaW1pdChmYWNldDogR2V0RmFjZXRMaXN0Lkl0ZW1zKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlMaW1pdFtmYWNldC5pZF0gPT09IGZhY2V0LnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxpbWl0W2ZhY2V0LmlkXSA9IHRoaXMuaW5pdGlhbExpbWl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TGltaXRbZmFjZXQuaWRdID0gZmFjZXQudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZUZhY2V0KGZhY2V0VmFsdWVJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsQW5kRGVsZXRlKGZhY2V0VmFsdWVJZClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXN1bHQgPT09IERlbGV0aW9uUmVzdWx0LkRFTEVURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbdHJ1ZV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxBbmREZWxldGUoZmFjZXRWYWx1ZUlkLCByZXNwb25zZS5tZXNzYWdlIHx8ICcnKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyID0+IHIucmVzdWx0ID09PSBEZWxldGlvblJlc3VsdC5ERUxFVEVEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSBjYWNoZWQgZmFjZXRzIHRvIHJlZmxlY3QgdGhlIGNoYW5nZXNcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5kYXRhU2VydmljZS5mYWNldC5nZXRBbGxGYWNldHMoKS5zaW5nbGUkKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0ZhY2V0VmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnRmFjZXRWYWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHNldExhbmd1YWdlKGNvZGU6IExhbmd1YWdlQ29kZSkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC5zZXRDb250ZW50TGFuZ3VhZ2UoY29kZSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TW9kYWxBbmREZWxldGUoZmFjZXRJZDogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NhdGFsb2cuY29uZmlybS1kZWxldGUtZmFjZXQnKSxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBtZXNzYWdlID8gXygnY29tbW9uLmZvcmNlLWRlbGV0ZScpIDogXygnY29tbW9uLmRlbGV0ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzID0+IChyZXMgPyB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmRlbGV0ZUZhY2V0KGZhY2V0SWQsICEhbWVzc2FnZSkgOiBFTVBUWSkpLFxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLmRlbGV0ZUZhY2V0KSxcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19