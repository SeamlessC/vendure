import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, DeletionResult, LogicalOperator, ModalService, NotificationService, SortOrder, } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { debounceTime, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
export class AssetListComponent extends BaseListComponent {
    constructor(notificationService, modalService, dataService, router, route) {
        super(router, route);
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchTerm$ = new BehaviorSubject(undefined);
        this.filterByTags$ = new BehaviorSubject(undefined);
        this.uploading = false;
        super.setQueryFn((...args) => this.dataService.product.getAssetList(...args), data => data.assets, (skip, take) => {
            var _a;
            const searchTerm = this.searchTerm$.value;
            const tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(t => t.value);
            return {
                options: Object.assign(Object.assign({ skip,
                    take }, (searchTerm
                    ? {
                        filter: {
                            name: { contains: searchTerm },
                        },
                    }
                    : {})), { sort: {
                        createdAt: SortOrder.DESC,
                    }, tags, tagsOperator: LogicalOperator.AND }),
            };
        }, { take: 25, skip: 0 });
    }
    ngOnInit() {
        super.ngOnInit();
        this.paginationConfig$ = combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(map(([itemsPerPage, currentPage, totalItems]) => ({ itemsPerPage, currentPage, totalItems })));
        this.searchTerm$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.filterByTags$.pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh());
        this.allTags$ = this.dataService.product.getTagList().mapStream(data => data.tags.items);
    }
    filesSelected(files) {
        if (files.length) {
            this.uploading = true;
            this.dataService.product
                .createAssets(files)
                .pipe(finalize(() => (this.uploading = false)))
                .subscribe(({ createAssets }) => {
                let successCount = 0;
                for (const result of createAssets) {
                    switch (result.__typename) {
                        case 'Asset':
                            successCount++;
                            break;
                        case 'MimeTypeError':
                            this.notificationService.error(result.message);
                            break;
                    }
                }
                if (0 < successCount) {
                    super.refresh();
                    this.notificationService.success(_('asset.notify-create-assets-success'), {
                        count: successCount,
                    });
                }
            });
        }
    }
    deleteAssets(assets) {
        this.showModalAndDelete(assets.map(a => a.id))
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(assets.map(a => a.id), response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Assets',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Assets',
            });
        });
    }
    showModalAndDelete(assetIds, message) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-assets'),
            translationVars: {
                count: assetIds.length,
            },
            body: message,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.product.deleteAssets(assetIds, !!message) : EMPTY)), map(res => res.deleteAssets));
    }
}
AssetListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <vdr-asset-search-input\n            class=\"pr4 mt1\"\n            [tags]=\"allTags$ | async\"\n            (searchTermChange)=\"searchTerm$.next($event)\"\n            (tagsChange)=\"filterByTags$.next($event)\"\n        ></vdr-asset-search-input>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-list\"></vdr-action-bar-items>\n        <vdr-asset-file-input\n            (selectFiles)=\"filesSelected($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".content-area\"\n        ></vdr-asset-file-input>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-asset-gallery\n    [assets]=\"(items$ | async)! | paginate: (paginationConfig$ | async) || {}\"\n    [multiSelect]=\"true\"\n    [canDelete]=\"['DeleteCatalog', 'DeleteAsset'] | hasPermission\"\n    (deleteAssets)=\"deleteAssets($event)\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"currentPage$ | async\"\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        [totalItems]=\"totalItems$ | async\"\n        (pageChange)=\"setPageNumber($event)\"\n    ></vdr-pagination-controls>\n</div>\n",
                styles: [":host{display:flex;flex-direction:column;height:100%}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}.search-input{margin-top:6px;min-width:300px}\n"]
            },] }
];
AssetListComponent.ctorParameters = () => [
    { type: NotificationService },
    { type: ModalService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvYXNzZXQtbGlzdC9hc3NldC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxjQUFjLEVBRWQsZUFBZSxFQUNmLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsU0FBUyxHQUVaLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPbkYsTUFBTSxPQUFPLGtCQUNULFNBQVEsaUJBQWlGO0lBUXpGLFlBQ1ksbUJBQXdDLEVBQ3hDLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQjtRQUVyQixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBTmIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVRwQyxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFxQixTQUFTLENBQUMsQ0FBQztRQUNqRSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUE0QixTQUFTLENBQUMsQ0FBQztRQUMxRSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBWWQsS0FBSyxDQUFDLFVBQVUsQ0FDWixDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsRUFDbEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNuQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTs7WUFDWCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMxQyxNQUFNLElBQUksR0FBRyxNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSywwQ0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsT0FBTztnQkFDSCxPQUFPLGdDQUNILElBQUk7b0JBQ0osSUFBSSxJQUNELENBQUMsVUFBVTtvQkFDVixDQUFDLENBQUM7d0JBQ0ksTUFBTSxFQUFFOzRCQUNKLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7eUJBQ2pDO3FCQUNKO29CQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsS0FDVCxJQUFJLEVBQUU7d0JBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO3FCQUM1QixFQUNELElBQUksRUFDSixZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsR0FDcEM7YUFDSixDQUFDO1FBQ04sQ0FBQyxFQUNELEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNoRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FDaEcsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN2QixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87aUJBQ25CLFlBQVksQ0FBQyxLQUFLLENBQUM7aUJBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzlDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixLQUFLLE1BQU0sTUFBTSxJQUFJLFlBQVksRUFBRTtvQkFDL0IsUUFBUSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUN2QixLQUFLLE9BQU87NEJBQ1IsWUFBWSxFQUFFLENBQUM7NEJBQ2YsTUFBTTt3QkFDVixLQUFLLGVBQWU7NEJBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMvQyxNQUFNO3FCQUNiO2lCQUNKO2dCQUNELElBQUksQ0FBQyxHQUFHLFlBQVksRUFBRTtvQkFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNoQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFO3dCQUN0RSxLQUFLLEVBQUUsWUFBWTtxQkFDdEIsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBZTtRQUN4QixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6QyxJQUFJLENBQ0QsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsT0FBTyxFQUFFO2dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ3JCLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUN6QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1FBQ0wsQ0FBQyxDQUFDLENBQ0w7YUFDQSxTQUFTLENBQ04sR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxFQUFFLFFBQVE7YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQzVELE1BQU0sRUFBRSxRQUFRO2FBQ25CLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVPLGtCQUFrQixDQUFDLFFBQWtCLEVBQUUsT0FBZ0I7UUFDM0QsT0FBTyxJQUFJLENBQUMsWUFBWTthQUNuQixNQUFNLENBQUM7WUFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDLCtCQUErQixDQUFDO1lBQ3pDLGVBQWUsRUFBRTtnQkFDYixLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU07YUFDekI7WUFDRCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRTtnQkFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDaEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTthQUNuRTtTQUNKLENBQUM7YUFDRCxJQUFJLENBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUM1RixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQy9CLENBQUM7SUFDVixDQUFDOzs7WUF4SUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDY1Q0FBMEM7O2FBRTdDOzs7WUFaRyxtQkFBbUI7WUFEbkIsWUFBWTtZQUpaLFdBQVc7WUFMVSxNQUFNO1lBQXRCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7XG4gICAgQXNzZXQsXG4gICAgQmFzZUxpc3RDb21wb25lbnQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgRGVsZXRpb25SZXN1bHQsXG4gICAgR2V0QXNzZXRMaXN0LFxuICAgIExvZ2ljYWxPcGVyYXRvcixcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBTb3J0T3JkZXIsXG4gICAgVGFnRnJhZ21lbnQsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaW5hbGl6ZSwgbWFwLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzZXQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2V0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Fzc2V0LWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRMaXN0Q29tcG9uZW50XG4gICAgZXh0ZW5kcyBCYXNlTGlzdENvbXBvbmVudDxHZXRBc3NldExpc3QuUXVlcnksIEdldEFzc2V0TGlzdC5JdGVtcywgR2V0QXNzZXRMaXN0LlZhcmlhYmxlcz5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc2VhcmNoVGVybSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBmaWx0ZXJCeVRhZ3MkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYWdGcmFnbWVudFtdIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIGFsbFRhZ3MkOiBPYnNlcnZhYmxlPFRhZ0ZyYWdtZW50W10+O1xuICAgIHBhZ2luYXRpb25Db25maWckOiBPYnNlcnZhYmxlPFBhZ2luYXRpb25JbnN0YW5jZT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGVyLCByb3V0ZSk7XG4gICAgICAgIHN1cGVyLnNldFF1ZXJ5Rm4oXG4gICAgICAgICAgICAoLi4uYXJnczogYW55W10pID0+IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRBc3NldExpc3QoLi4uYXJncyksXG4gICAgICAgICAgICBkYXRhID0+IGRhdGEuYXNzZXRzLFxuICAgICAgICAgICAgKHNraXAsIHRha2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hUZXJtJC52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdzID0gdGhpcy5maWx0ZXJCeVRhZ3MkLnZhbHVlPy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihzZWFyY2hUZXJtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHsgY29udGFpbnM6IHNlYXJjaFRlcm0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogU29ydE9yZGVyLkRFU0MsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFncyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3NPcGVyYXRvcjogTG9naWNhbE9wZXJhdG9yLkFORCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgdGFrZTogMjUsIHNraXA6IDAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnJCA9IGNvbWJpbmVMYXRlc3QodGhpcy5pdGVtc1BlclBhZ2UkLCB0aGlzLmN1cnJlbnRQYWdlJCwgdGhpcy50b3RhbEl0ZW1zJCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2l0ZW1zUGVyUGFnZSwgY3VycmVudFBhZ2UsIHRvdGFsSXRlbXNdKSA9PiAoeyBpdGVtc1BlclBhZ2UsIGN1cnJlbnRQYWdlLCB0b3RhbEl0ZW1zIH0pKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtJC5waXBlKGRlYm91bmNlVGltZSgyNTApLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJCeVRhZ3MkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgICAgICB0aGlzLmFsbFRhZ3MkID0gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmdldFRhZ0xpc3QoKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnRhZ3MuaXRlbXMpO1xuICAgIH1cblxuICAgIGZpbGVzU2VsZWN0ZWQoZmlsZXM6IEZpbGVbXSkge1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAuY3JlYXRlQXNzZXRzKGZpbGVzKVxuICAgICAgICAgICAgICAgIC5waXBlKGZpbmFsaXplKCgpID0+ICh0aGlzLnVwbG9hZGluZyA9IGZhbHNlKSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoeyBjcmVhdGVBc3NldHMgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZXN1bHQgb2YgY3JlYXRlQXNzZXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXNzZXQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTWltZVR5cGVFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgc3VjY2Vzc0NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlci5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdhc3NldC5ub3RpZnktY3JlYXRlLWFzc2V0cy1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogc3VjY2Vzc0NvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZUFzc2V0cyhhc3NldHM6IEFzc2V0W10pIHtcbiAgICAgICAgdGhpcy5zaG93TW9kYWxBbmREZWxldGUoYXNzZXRzLm1hcChhID0+IGEuaWQpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3VsdCA9PT0gRGVsZXRpb25SZXN1bHQuREVMRVRFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt0cnVlXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbEFuZERlbGV0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldHMubWFwKGEgPT4gYS5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICkucGlwZShtYXAociA9PiByLnJlc3VsdCA9PT0gRGVsZXRpb25SZXN1bHQuREVMRVRFRCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdBc3NldHMnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQXNzZXRzJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TW9kYWxBbmREZWxldGUoYXNzZXRJZHM6IHN0cmluZ1tdLCBtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NhdGFsb2cuY29uZmlybS1kZWxldGUtYXNzZXRzJyksXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25WYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiBhc3NldElkcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHJlcyA9PiAocmVzID8gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LmRlbGV0ZUFzc2V0cyhhc3NldElkcywgISFtZXNzYWdlKSA6IEVNUFRZKSksXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiByZXMuZGVsZXRlQXNzZXRzKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19