import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SelectionManager } from '../../../common/utilities/selection-manager';
import { DataService } from '../../../data/providers/data.service';
export class ProductMultiSelectorDialogComponent {
    constructor(dataService, changeDetector) {
        this.dataService = dataService;
        this.changeDetector = changeDetector;
        this.mode = 'product';
        this.initialSelectionIds = [];
        this.searchTerm$ = new BehaviorSubject('');
        this.searchFacetValueIds$ = new BehaviorSubject([]);
        this.paginationConfig = {
            currentPage: 1,
            itemsPerPage: 25,
            totalItems: 1,
        };
        this.paginationConfig$ = new BehaviorSubject(this.paginationConfig);
    }
    ngOnInit() {
        const idFn = this.mode === 'product'
            ? (a, b) => a.productId === b.productId
            : (a, b) => a.productVariantId === b.productVariantId;
        this.selectionManager = new SelectionManager({
            multiSelect: true,
            itemsAreEqual: idFn,
            additiveMode: true,
        });
        const searchQueryResult = this.dataService.product.searchProducts('', this.paginationConfig.itemsPerPage, 0);
        const result$ = combineLatest(this.searchTerm$, this.searchFacetValueIds$, this.paginationConfig$).subscribe(([term, facetValueIds, pagination]) => {
            const take = +pagination.itemsPerPage;
            const skip = (pagination.currentPage - 1) * take;
            return searchQueryResult.ref.refetch({
                input: { skip, take, term, facetValueIds, groupByProduct: this.mode === 'product' },
            });
        });
        this.items$ = searchQueryResult.stream$.pipe(tap(data => {
            this.paginationConfig.totalItems = data.search.totalItems;
            this.selectionManager.setCurrentItems(data.search.items);
        }), map(data => data.search.items));
        this.facetValues$ = searchQueryResult.stream$.pipe(map(data => data.search.facetValues));
        if (this.initialSelectionIds.length) {
            if (this.mode === 'product') {
                this.dataService.product
                    .getProducts({
                    filter: {
                        id: {
                            in: this.initialSelectionIds,
                        },
                    },
                })
                    .single$.subscribe(({ products }) => {
                    this.selectionManager.selectMultiple(products.items.map(product => ({
                        productId: product.id,
                        productName: product.name,
                    })));
                    this.changeDetector.markForCheck();
                });
            }
            else {
                this.dataService.product
                    .getProductVariants({
                    filter: {
                        id: {
                            in: this.initialSelectionIds,
                        },
                    },
                })
                    .single$.subscribe(({ productVariants }) => {
                    this.selectionManager.selectMultiple(productVariants.items.map(variant => ({
                        productVariantId: variant.id,
                        productVariantName: variant.name,
                    })));
                    this.changeDetector.markForCheck();
                });
            }
        }
    }
    trackByFn(index, item) {
        return item.productId;
    }
    setSearchTerm(term) {
        this.searchTerm$.next(term);
    }
    setFacetValueIds(ids) {
        this.searchFacetValueIds$.next(ids);
    }
    toggleSelection(item, event) {
        this.selectionManager.toggleSelection(item, event);
    }
    clearSelection() {
        this.selectionManager.selectMultiple([]);
    }
    isSelected(item) {
        return this.selectionManager.isSelected(item);
    }
    entityInfoClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    pageChange(page) {
        this.paginationConfig.currentPage = page;
        this.paginationConfig$.next(this.paginationConfig);
    }
    itemsPerPageChange(itemsPerPage) {
        this.paginationConfig.itemsPerPage = itemsPerPage;
        this.paginationConfig$.next(this.paginationConfig);
    }
    select() {
        this.resolveWith(this.selectionManager.selection);
    }
    cancel() {
        this.resolveWith();
    }
}
ProductMultiSelectorDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-multi-selector-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        <span *ngIf=\"mode === 'product'\">{{ 'common.select-products' | translate }}</span>\n        <span *ngIf=\"mode === 'variant'\">{{ 'common.select-variants' | translate }}</span>\n    </div>\n</ng-template>\n<vdr-product-search-input\n    #productSearchInputComponent\n    [facetValueResults]=\"facetValues$ | async\"\n    (searchTermChange)=\"setSearchTerm($event)\"\n    (facetValueChange)=\"setFacetValueIds($event)\"\n></vdr-product-search-input>\n<div class=\"flex-wrapper\">\n    <div class=\"gallery\">\n        <div\n            class=\"card\"\n            *ngFor=\"let item of (items$ | async) || [] | paginate: paginationConfig; trackBy: trackByFn\"\n            (click)=\"toggleSelection(item, $event)\"\n            [class.selected]=\"isSelected(item)\"\n        >\n            <div class=\"card-img\">\n                <vdr-select-toggle\n                    [selected]=\"isSelected(item)\"\n                    [disabled]=\"true\"\n                    [hiddenWhenOff]=\"true\"\n                ></vdr-select-toggle>\n                <img\n                    [src]=\"\n                        (mode === 'product'\n                            ? item.productAsset\n                            : item.productVariantAsset || item.productAsset\n                        ) | assetPreview: 'thumb'\n                    \"\n                />\n            </div>\n            <div class=\"detail\">\n                <span [title]=\"mode === 'product' ? item.productName : item.productVariantName\">{{\n                    mode === 'product' ? item.productName : item.productVariantName\n                }}</span>\n                <div *ngIf=\"mode === 'variant'\"><small>{{ item.sku }}</small></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"selection\">\n        <div class=\"m2 flex center\">\n            <div>\n                {{ 'common.items-selected-count' | translate: { count: selectionManager.selection.length } }}\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <button class=\"btn btn-sm btn-link\" (click)=\"clearSelection()\">\n                <cds-icon shape=\"times\"></cds-icon> {{ 'common.clear-selection' | translate }}\n            </button>\n        </div>\n        <div class=\"selected-items\">\n            <div *ngFor=\"let item of selectionManager.selection\" class=\"flex item-row\">\n                <div class=\"\">{{ mode === 'product' ? item.productName : item.productVariantName }}</div>\n                <div class=\"flex-spacer\"></div>\n                <div>\n                    <button class=\"icon-button\" (click)=\"toggleSelection(item, $event)\">\n                        <cds-icon shape=\"times\"></cds-icon>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        (itemsPerPageChange)=\"itemsPerPageChange($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"paginationConfig.currentPage\"\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        [totalItems]=\"paginationConfig.totalItems\"\n        (pageChange)=\"pageChange($event)\"\n    ></vdr-pagination-controls>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        class=\"btn btn-primary\"\n        [disabled]=\"selectionManager.selection.length === 0\"\n    >\n        {{ 'common.select-items-with-count' | translate: { count: selectionManager.selection.length } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;flex-direction:1;height:70vh}.flex-wrapper{display:flex;overflow-y:hidden}.gallery{flex:1;display:grid;grid-template-columns:repeat(auto-fill,125px);grid-template-rows:repeat(auto-fill,200px);grid-gap:10px 20px;padding-left:12px;padding-top:12px;padding-bottom:64px;overflow-y:auto}.gallery .card:hover{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.detail{margin:0 3px;font-size:12px;line-height:.8rem}vdr-select-toggle{position:absolute;top:-12px;left:-12px}vdr-select-toggle ::ng-deep .toggle{box-shadow:0 5px 5px -4px #000000bf}.card.selected{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card.selected .selected-checkbox{opacity:1}.selection{width:23vw;max-width:400px;padding:6px;display:flex;flex-direction:column}.selection .selected-items{flex:1;overflow-y:auto}.selection .selected-items .item-row{padding-left:3px}.selection .selected-items .item-row:hover{background-color:var(--color-component-bg-200)}.paging-controls{display:flex;align-items:center;justify-content:space-between}\n"]
            },] }
];
ProductMultiSelectorDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9wcm9kdWN0LW11bHRpLXNlbGVjdG9yLWRpYWxvZy9wcm9kdWN0LW11bHRpLXNlbGVjdG9yLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUU5RixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQVduRSxNQUFNLE9BQU8sbUNBQW1DO0lBaUI1QyxZQUFvQixXQUF3QixFQUFVLGNBQWlDO1FBQW5FLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBaEJ2RixTQUFJLEdBQTBCLFNBQVMsQ0FBQztRQUN4Qyx3QkFBbUIsR0FBYSxFQUFFLENBQUM7UUFHbkMsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUM5Qyx5QkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUN6RCxxQkFBZ0IsR0FBdUI7WUFDbkMsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBSU0sc0JBQWlCLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxnQkFBZ0Is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ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU2VhcmNoUHJvZHVjdHNRdWVyeSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvc2VsZWN0aW9uLW1hbmFnZXInO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBTZWFyY2hJdGVtID0gU2VhcmNoUHJvZHVjdHNRdWVyeVsnc2VhcmNoJ11bJ2l0ZW1zJ11bbnVtYmVyXTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0LW11bHRpLXNlbGVjdG9yLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZHVjdC1tdWx0aS1zZWxlY3Rvci1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdE11bHRpU2VsZWN0b3JEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERpYWxvZzxTZWFyY2hJdGVtW10+IHtcbiAgICBtb2RlOiAncHJvZHVjdCcgfCAndmFyaWFudCcgPSAncHJvZHVjdCc7XG4gICAgaW5pdGlhbFNlbGVjdGlvbklkczogc3RyaW5nW10gPSBbXTtcbiAgICBpdGVtcyQ6IE9ic2VydmFibGU8U2VhcmNoSXRlbVtdPjtcbiAgICBmYWNldFZhbHVlcyQ6IE9ic2VydmFibGU8U2VhcmNoUHJvZHVjdHNRdWVyeVsnc2VhcmNoJ11bJ2ZhY2V0VmFsdWVzJ10+O1xuICAgIHNlYXJjaFRlcm0kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgICBzZWFyY2hGYWNldFZhbHVlSWRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICBpdGVtc1BlclBhZ2U6IDI1LFxuICAgICAgICB0b3RhbEl0ZW1zOiAxLFxuICAgIH07XG4gICAgc2VsZWN0aW9uTWFuYWdlcjogU2VsZWN0aW9uTWFuYWdlcjxTZWFyY2hJdGVtPjtcblxuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogU2VhcmNoSXRlbVtdKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcGFnaW5hdGlvbkNvbmZpZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhZ2luYXRpb25JbnN0YW5jZT4odGhpcy5wYWdpbmF0aW9uQ29uZmlnKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpZEZuID1cbiAgICAgICAgICAgIHRoaXMubW9kZSA9PT0gJ3Byb2R1Y3QnXG4gICAgICAgICAgICAgICAgPyAoYTogU2VhcmNoSXRlbSwgYjogU2VhcmNoSXRlbSkgPT4gYS5wcm9kdWN0SWQgPT09IGIucHJvZHVjdElkXG4gICAgICAgICAgICAgICAgOiAoYTogU2VhcmNoSXRlbSwgYjogU2VhcmNoSXRlbSkgPT4gYS5wcm9kdWN0VmFyaWFudElkID09PSBiLnByb2R1Y3RWYXJpYW50SWQ7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlciA9IG5ldyBTZWxlY3Rpb25NYW5hZ2VyPFNlYXJjaEl0ZW0+KHtcbiAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgaXRlbXNBcmVFcXVhbDogaWRGbixcbiAgICAgICAgICAgIGFkZGl0aXZlTW9kZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaFF1ZXJ5UmVzdWx0ID0gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0LnNlYXJjaFByb2R1Y3RzKFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0JCA9IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLFxuICAgICAgICAgICAgdGhpcy5zZWFyY2hGYWNldFZhbHVlSWRzJCxcbiAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZyQsXG4gICAgICAgICkuc3Vic2NyaWJlKChbdGVybSwgZmFjZXRWYWx1ZUlkcywgcGFnaW5hdGlvbl0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRha2UgPSArcGFnaW5hdGlvbi5pdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICBjb25zdCBza2lwID0gKHBhZ2luYXRpb24uY3VycmVudFBhZ2UgLSAxKSAqIHRha2U7XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoUXVlcnlSZXN1bHQucmVmLnJlZmV0Y2goe1xuICAgICAgICAgICAgICAgIGlucHV0OiB7IHNraXAsIHRha2UsIHRlcm0sIGZhY2V0VmFsdWVJZHMsIGdyb3VwQnlQcm9kdWN0OiB0aGlzLm1vZGUgPT09ICdwcm9kdWN0JyB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXRlbXMkID0gc2VhcmNoUXVlcnlSZXN1bHQuc3RyZWFtJC5waXBlKFxuICAgICAgICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy50b3RhbEl0ZW1zID0gZGF0YS5zZWFyY2gudG90YWxJdGVtcztcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2V0Q3VycmVudEl0ZW1zKGRhdGEuc2VhcmNoLml0ZW1zKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKGRhdGEgPT4gZGF0YS5zZWFyY2guaXRlbXMpLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZmFjZXRWYWx1ZXMkID0gc2VhcmNoUXVlcnlSZXN1bHQuc3RyZWFtJC5waXBlKG1hcChkYXRhID0+IGRhdGEuc2VhcmNoLmZhY2V0VmFsdWVzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFNlbGVjdGlvbklkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdwcm9kdWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW46IHRoaXMuaW5pdGlhbFNlbGVjdGlvbklkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSQuc3Vic2NyaWJlKCh7IHByb2R1Y3RzIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RNdWx0aXBsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0cy5pdGVtcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3QgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIFNlYXJjaEl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdFZhcmlhbnRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluOiB0aGlzLmluaXRpYWxTZWxlY3Rpb25JZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zaW5nbGUkLnN1YnNjcmliZSgoeyBwcm9kdWN0VmFyaWFudHMgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdE11bHRpcGxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50cy5pdGVtcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRJZDogdmFyaWFudC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudE5hbWU6IHZhcmlhbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgU2VhcmNoSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYWNrQnlGbihpbmRleDogbnVtYmVyLCBpdGVtOiBTZWFyY2hJdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnByb2R1Y3RJZDtcbiAgICB9XG5cbiAgICBzZXRTZWFyY2hUZXJtKHRlcm06IHN0cmluZykge1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLm5leHQodGVybSk7XG4gICAgfVxuICAgIHNldEZhY2V0VmFsdWVJZHMoaWRzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNlYXJjaEZhY2V0VmFsdWVJZHMkLm5leHQoaWRzKTtcbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3Rpb24oaXRlbTogU2VhcmNoSXRlbSwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnRvZ2dsZVNlbGVjdGlvbihpdGVtLCBldmVudCk7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RNdWx0aXBsZShbXSk7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChpdGVtOiBTZWFyY2hJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuaXNTZWxlY3RlZChpdGVtKTtcbiAgICB9XG5cbiAgICBlbnRpdHlJbmZvQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgcGFnZUNoYW5nZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnRQYWdlID0gcGFnZTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnJC5uZXh0KHRoaXMucGFnaW5hdGlvbkNvbmZpZyk7XG4gICAgfVxuXG4gICAgaXRlbXNQZXJQYWdlQ2hhbmdlKGl0ZW1zUGVyUGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZyQubmV4dCh0aGlzLnBhZ2luYXRpb25Db25maWcpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG59XG4iXX0=