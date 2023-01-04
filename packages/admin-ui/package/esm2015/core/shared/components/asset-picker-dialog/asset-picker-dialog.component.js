import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, delay, finalize, map, take as rxjsTake, takeUntil, tap } from 'rxjs/operators';
import { LogicalOperator, SortOrder, } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { NotificationService } from '../../../providers/notification/notification.service';
/**
 * @description
 * A dialog which allows the creation and selection of assets.
 *
 * @example
 * ```TypeScript
 * selectAssets() {
 *   this.modalService
 *     .fromComponent(AssetPickerDialogComponent, {
 *         size: 'xl',
 *     })
 *     .subscribe(result => {
 *         if (result && result.length) {
 *             // ...
 *         }
 *     });
 * }
 * ```
 *
 * @docsCategory components
 */
export class AssetPickerDialogComponent {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.paginationConfig = {
            currentPage: 1,
            itemsPerPage: 25,
            totalItems: 1,
        };
        this.multiSelect = true;
        this.initialTags = [];
        this.selection = [];
        this.searchTerm$ = new BehaviorSubject(undefined);
        this.filterByTags$ = new BehaviorSubject(undefined);
        this.uploading = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.listQuery = this.dataService.product.getAssetList(this.paginationConfig.itemsPerPage, 0);
        this.allTags$ = this.dataService.product.getTagList().mapSingle(data => data.tags.items);
        this.assets$ = this.listQuery.stream$.pipe(tap(result => (this.paginationConfig.totalItems = result.assets.totalItems)), map(result => result.assets.items));
        this.searchTerm$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => {
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        });
        this.filterByTags$.pipe(debounceTime(100), takeUntil(this.destroy$)).subscribe(() => {
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        });
    }
    ngAfterViewInit() {
        if (0 < this.initialTags.length) {
            this.allTags$
                .pipe(rxjsTake(1), map(allTags => allTags.filter(tag => this.initialTags.includes(tag.value))), tap(tags => this.filterByTags$.next(tags)), delay(1))
                .subscribe(tags => this.assetSearchInputComponent.setTags(tags));
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    pageChange(page) {
        this.paginationConfig.currentPage = page;
        this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
    }
    itemsPerPageChange(itemsPerPage) {
        this.paginationConfig.itemsPerPage = itemsPerPage;
        this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        this.resolveWith(this.selection);
    }
    createAssets(files) {
        if (files.length) {
            this.uploading = true;
            this.dataService.product
                .createAssets(files)
                .pipe(finalize(() => (this.uploading = false)))
                .subscribe(res => {
                this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
                this.notificationService.success(_('asset.notify-create-assets-success'), {
                    count: files.length,
                });
                const assets = res.createAssets.filter(a => a.__typename === 'Asset');
                this.assetGalleryComponent.selectMultiple(assets);
            });
        }
    }
    fetchPage(currentPage, itemsPerPage) {
        var _a;
        const take = +itemsPerPage;
        const skip = (currentPage - 1) * +itemsPerPage;
        const searchTerm = this.searchTerm$.value;
        const tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(t => t.value);
        this.listQuery.ref.refetch({
            options: {
                skip,
                take,
                filter: {
                    name: {
                        contains: searchTerm,
                    },
                },
                sort: {
                    createdAt: SortOrder.DESC,
                },
                tags,
                tagsOperator: LogicalOperator.AND,
            },
        });
    }
}
AssetPickerDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-picker-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        <span>{{ 'asset.select-assets' | translate }}</span>\n        <div class=\"flex-spacer\"></div>\n        <vdr-asset-file-input\n            class=\"ml3\"\n            (selectFiles)=\"createAssets($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".modal-content\"\n        ></vdr-asset-file-input>\n    </div>\n</ng-template>\n<vdr-asset-search-input\n    class=\"mb2\"\n    [tags]=\"allTags$ | async\"\n    (searchTermChange)=\"searchTerm$.next($event)\"\n    (tagsChange)=\"filterByTags$.next($event)\"\n    #assetSearchInputComponent\n></vdr-asset-search-input>\n<vdr-asset-gallery\n    [assets]=\"(assets$ | async)! | paginate: paginationConfig\"\n    [multiSelect]=\"multiSelect\"\n    (selectionChange)=\"selection = $event\"\n    #assetGalleryComponent\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        (itemsPerPageChange)=\"itemsPerPageChange($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"paginationConfig.currentPage\"\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        [totalItems]=\"paginationConfig.totalItems\"\n        (pageChange)=\"pageChange($event)\"\n    ></vdr-pagination-controls>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"selection.length === 0\">\n        {{ 'asset.add-asset-with-count' | translate: { count: selection.length } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;height:70vh}.title-row{display:flex;align-items:center;justify-content:space-between}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between;flex-shrink:0}\n"]
            },] }
];
AssetPickerDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
AssetPickerDialogComponent.propDecorators = {
    assetSearchInputComponent: [{ type: ViewChild, args: ['assetSearchInputComponent',] }],
    assetGalleryComponent: [{ type: ViewChild, args: ['assetGalleryComponent',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcGlja2VyLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LXBpY2tlci1kaWFsb2cvYXNzZXQtcGlja2VyLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBR1QsU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLElBQUksUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RyxPQUFPLEVBSUgsZUFBZSxFQUNmLFNBQVMsR0FFWixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUduRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUkzRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFPSCxNQUFNLE9BQU8sMEJBQTBCO0lBd0JuQyxZQUFvQixXQUF3QixFQUFVLG1CQUF3QztRQUExRSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFyQjlGLHFCQUFnQixHQUF1QjtZQUNuQyxXQUFXLEVBQUUsQ0FBQztZQUNkLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFVBQVUsRUFBRSxDQUFDO1NBQ2hCLENBQUM7UUFNRixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNu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VztZQUdYLG1CQUFtQjs7O3dDQXVDdkIsU0FBUyxTQUFDLDJCQUEyQjtvQ0FFckMsU0FBUyxTQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRlbGF5LCBmaW5hbGl6ZSwgbWFwLCB0YWtlIGFzIHJ4anNUYWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgICBBc3NldCxcbiAgICBDcmVhdGVBc3NldHMsXG4gICAgR2V0QXNzZXRMaXN0LFxuICAgIExvZ2ljYWxPcGVyYXRvcixcbiAgICBTb3J0T3JkZXIsXG4gICAgVGFnRnJhZ21lbnQsXG59IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlcnlSZXN1bHQgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3F1ZXJ5LXJlc3VsdCc7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBc3NldEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuLi9hc3NldC1nYWxsZXJ5L2Fzc2V0LWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IEFzc2V0U2VhcmNoSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9hc3NldC1zZWFyY2gtaW5wdXQvYXNzZXQtc2VhcmNoLWlucHV0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGRpYWxvZyB3aGljaCBhbGxvd3MgdGhlIGNyZWF0aW9uIGFuZCBzZWxlY3Rpb24gb2YgYXNzZXRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBzZWxlY3RBc3NldHMoKSB7XG4gKiAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gKiAgICAgLmZyb21Db21wb25lbnQoQXNzZXRQaWNrZXJEaWFsb2dDb21wb25lbnQsIHtcbiAqICAgICAgICAgc2l6ZTogJ3hsJyxcbiAqICAgICB9KVxuICogICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAqICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoKSB7XG4gKiAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgfVxuICogICAgIH0pO1xuICogfVxuICogYGBgXG4gKlxuICogQGRvY3NDYXRlZ29yeSBjb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFzc2V0LXBpY2tlci1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hc3NldC1waWNrZXItZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hc3NldC1waWNrZXItZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzc2V0UGlja2VyRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIERpYWxvZzxBc3NldFtdPiB7XG4gICAgYXNzZXRzJDogT2JzZXJ2YWJsZTxHZXRBc3NldExpc3QuSXRlbXNbXT47XG4gICAgYWxsVGFncyQ6IE9ic2VydmFibGU8VGFnRnJhZ21lbnRbXT47XG4gICAgcGFnaW5hdGlvbkNvbmZpZzogUGFnaW5hdGlvbkluc3RhbmNlID0ge1xuICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgaXRlbXNQZXJQYWdlOiAyNSxcbiAgICAgICAgdG90YWxJdGVtczogMSxcbiAgICB9O1xuICAgIEBWaWV3Q2hpbGQoJ2Fzc2V0U2VhcmNoSW5wdXRDb21wb25lbnQnKVxuICAgIHByaXZhdGUgYXNzZXRTZWFyY2hJbnB1dENvbXBvbmVudDogQXNzZXRTZWFyY2hJbnB1dENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKCdhc3NldEdhbGxlcnlDb21wb25lbnQnKVxuICAgIHByaXZhdGUgYXNzZXRHYWxsZXJ5Q29tcG9uZW50OiBBc3NldEdhbGxlcnlDb21wb25lbnQ7XG5cbiAgICBtdWx0aVNlbGVjdCA9IHRydWU7XG4gICAgaW5pdGlhbFRhZ3M6IHN0cmluZ1tdID0gW107XG5cbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IEFzc2V0W10pID0+IHZvaWQ7XG4gICAgc2VsZWN0aW9uOiBBc3NldFtdID0gW107XG4gICAgc2VhcmNoVGVybSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBmaWx0ZXJCeVRhZ3MkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYWdGcmFnbWVudFtdIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIHByaXZhdGUgbGlzdFF1ZXJ5OiBRdWVyeVJlc3VsdDxHZXRBc3NldExpc3QuUXVlcnksIEdldEFzc2V0TGlzdC5WYXJpYWJsZXM+O1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxpc3RRdWVyeSA9IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRBc3NldExpc3QodGhpcy5wYWdpbmF0aW9uQ29uZmlnLml0ZW1zUGVyUGFnZSwgMCk7XG4gICAgICAgIHRoaXMuYWxsVGFncyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3QuZ2V0VGFnTGlzdCgpLm1hcFNpbmdsZShkYXRhID0+IGRhdGEudGFncy5pdGVtcyk7XG4gICAgICAgIHRoaXMuYXNzZXRzJCA9IHRoaXMubGlzdFF1ZXJ5LnN0cmVhbSQucGlwZShcbiAgICAgICAgICAgIHRhcChyZXN1bHQgPT4gKHRoaXMucGFnaW5hdGlvbkNvbmZpZy50b3RhbEl0ZW1zID0gcmVzdWx0LmFzc2V0cy50b3RhbEl0ZW1zKSksXG4gICAgICAgICAgICBtYXAocmVzdWx0ID0+IHJlc3VsdC5hc3NldHMuaXRlbXMpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLnBpcGUoZGVib3VuY2VUaW1lKDI1MCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hQYWdlKHRoaXMucGFnaW5hdGlvbkNvbmZpZy5jdXJyZW50UGFnZSwgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLml0ZW1zUGVyUGFnZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZpbHRlckJ5VGFncyQucGlwZShkZWJvdW5jZVRpbWUoMTAwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaFBhZ2UodGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoMCA8IHRoaXMuaW5pdGlhbFRhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmFsbFRhZ3MkXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHJ4anNUYWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICBtYXAoYWxsVGFncyA9PiBhbGxUYWdzLmZpbHRlcih0YWcgPT4gdGhpcy5pbml0aWFsVGFncy5pbmNsdWRlcyh0YWcudmFsdWUpKSksXG4gICAgICAgICAgICAgICAgICAgIHRhcCh0YWdzID0+IHRoaXMuZmlsdGVyQnlUYWdzJC5uZXh0KHRhZ3MpKSxcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodGFncyA9PiB0aGlzLmFzc2V0U2VhcmNoSW5wdXRDb21wb25lbnQuc2V0VGFncyh0YWdzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwYWdlQ2hhbmdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmZldGNoUGFnZSh0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudFBhZ2UsIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5pdGVtc1BlclBhZ2UpO1xuICAgIH1cblxuICAgIGl0ZW1zUGVyUGFnZUNoYW5nZShpdGVtc1BlclBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlID0gaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLmZldGNoUGFnZSh0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudFBhZ2UsIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5pdGVtc1BlclBhZ2UpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgY3JlYXRlQXNzZXRzKGZpbGVzOiBGaWxlW10pIHtcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgLmNyZWF0ZUFzc2V0cyhmaWxlcylcbiAgICAgICAgICAgICAgICAucGlwZShmaW5hbGl6ZSgoKSA9PiAodGhpcy51cGxvYWRpbmcgPSBmYWxzZSkpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaFBhZ2UodGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnYXNzZXQubm90aWZ5LWNyZWF0ZS1hc3NldHMtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogZmlsZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzZXRzID0gcmVzLmNyZWF0ZUFzc2V0cy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBhID0+IGEuX190eXBlbmFtZSA9PT0gJ0Fzc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgKSBhcyBDcmVhdGVBc3NldHMuQXNzZXRJbmxpbmVGcmFnbWVudFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0R2FsbGVyeUNvbXBvbmVudC5zZWxlY3RNdWx0aXBsZShhc3NldHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaFBhZ2UoY3VycmVudFBhZ2U6IG51bWJlciwgaXRlbXNQZXJQYWdlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgdGFrZSA9ICtpdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHNraXAgPSAoY3VycmVudFBhZ2UgLSAxKSAqICtpdGVtc1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSB0aGlzLnNlYXJjaFRlcm0kLnZhbHVlO1xuICAgICAgICBjb25zdCB0YWdzID0gdGhpcy5maWx0ZXJCeVRhZ3MkLnZhbHVlPy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5saXN0UXVlcnkucmVmLnJlZmV0Y2goe1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbnM6IHNlYXJjaFRlcm0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogU29ydE9yZGVyLkRFU0MsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWdzLFxuICAgICAgICAgICAgICAgIHRhZ3NPcGVyYXRvcjogTG9naWNhbE9wZXJhdG9yLkFORCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==