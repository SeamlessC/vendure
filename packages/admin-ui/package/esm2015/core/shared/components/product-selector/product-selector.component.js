import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { concat, merge, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * A component for selecting product variants via an autocomplete-style select input.
 *
 * @example
 * ```HTML
 * <vdr-product-selector
 *   (productSelected)="selectResult($event)"></vdr-product-selector>
 * ```
 *
 * @docsCategory components
 */
export class ProductSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.searchInput$ = new Subject();
        this.searchLoading = false;
        this.productSelected = new EventEmitter();
    }
    ngOnInit() {
        this.initSearchResults();
    }
    initSearchResults() {
        const searchItems$ = this.searchInput$.pipe(debounceTime(200), distinctUntilChanged(), tap(() => (this.searchLoading = true)), switchMap(term => {
            if (!term) {
                return of([]);
            }
            return this.dataService.product
                .productSelectorSearch(term, 10)
                .mapSingle(result => result.search.items);
        }), tap(() => (this.searchLoading = false)));
        const clear$ = this.productSelected.pipe(mapTo([]));
        this.searchResults$ = concat(of([]), merge(searchItems$, clear$));
    }
    selectResult(product) {
        if (product) {
            this.productSelected.emit(product);
            this.ngSelect.clearModel();
        }
    }
}
ProductSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-selector',
                template: "<ng-select\n    #autoComplete\n    [items]=\"searchResults$ | async\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    [hideSelected]=\"true\"\n    [loading]=\"searchLoading\"\n    [typeahead]=\"searchInput$\"\n    [appendTo]=\"'body'\"\n    [placeholder]=\"'settings.search-by-product-name-or-sku' | translate\"\n    (change)=\"selectResult($event)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <img [src]=\"item.productAsset | assetPreview: 32\">\n        {{ item.productVariantName }}\n        <small class=\"sku\">{{ item.sku }}</small>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.sku{margin-left:12px;color:var(--color-grey-500)}img{border-radius:var(--border-radius-img)}\n"]
            },] }
];
ProductSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
ProductSelectorComponent.propDecorators = {
    productSelected: [{ type: Output }],
    ngSelect: [{ type: ViewChild, args: ['autoComplete', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3Byb2R1Y3Qtc2VsZWN0b3IvcHJvZHVjdC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFHekcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FOzs7Ozs7Ozs7OztHQVdHO0FBT0gsTUFBTSxPQUFPLHdCQUF3QjtJQVFqQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVA1QyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDckMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFWixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUErQixDQUFDO0lBSTdCLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3ZDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUN0QyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2pCO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87aUJBQzFCLHFCQUFxQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7aUJBQy9CLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUMxQyxDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQXFDO1FBQzlDLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7OztZQTdDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMscW1CQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFuQlEsV0FBVzs7OzhCQXdCZixNQUFNO3VCQUVOLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IGNvbmNhdCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXBUbywgc3dpdGNoTWFwLCB0YXAsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUHJvZHVjdFNlbGVjdG9yU2VhcmNoIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGNvbXBvbmVudCBmb3Igc2VsZWN0aW5nIHByb2R1Y3QgdmFyaWFudHMgdmlhIGFuIGF1dG9jb21wbGV0ZS1zdHlsZSBzZWxlY3QgaW5wdXQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYEhUTUxcbiAqIDx2ZHItcHJvZHVjdC1zZWxlY3RvclxuICogICAocHJvZHVjdFNlbGVjdGVkKT1cInNlbGVjdFJlc3VsdCgkZXZlbnQpXCI+PC92ZHItcHJvZHVjdC1zZWxlY3Rvcj5cbiAqIGBgYFxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wcm9kdWN0LXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZHVjdC1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNlYXJjaElucHV0JCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBzZWFyY2hMb2FkaW5nID0gZmFsc2U7XG4gICAgc2VhcmNoUmVzdWx0cyQ6IE9ic2VydmFibGU8UHJvZHVjdFNlbGVjdG9yU2VhcmNoLkl0ZW1zW10+O1xuICAgIEBPdXRwdXQoKSBwcm9kdWN0U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2R1Y3RTZWxlY3RvclNlYXJjaC5JdGVtcz4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2F1dG9Db21wbGV0ZScsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBuZ1NlbGVjdDogTmdTZWxlY3RDb21wb25lbnQ7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0U2VhcmNoUmVzdWx0cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaEl0ZW1zJCA9IHRoaXMuc2VhcmNoSW5wdXQkLnBpcGUoXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMuc2VhcmNoTG9hZGluZyA9IHRydWUpKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRlcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAucHJvZHVjdFNlbGVjdG9yU2VhcmNoKHRlcm0sIDEwKVxuICAgICAgICAgICAgICAgICAgICAubWFwU2luZ2xlKHJlc3VsdCA9PiByZXN1bHQuc2VhcmNoLml0ZW1zKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLnNlYXJjaExvYWRpbmcgPSBmYWxzZSkpLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGNsZWFyJCA9IHRoaXMucHJvZHVjdFNlbGVjdGVkLnBpcGUobWFwVG8oW10pKTtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzJCA9IGNvbmNhdChvZihbXSksIG1lcmdlKHNlYXJjaEl0ZW1zJCwgY2xlYXIkKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0UmVzdWx0KHByb2R1Y3Q/OiBQcm9kdWN0U2VsZWN0b3JTZWFyY2guSXRlbXMpIHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFNlbGVjdGVkLmVtaXQocHJvZHVjdCk7XG4gICAgICAgICAgICB0aGlzLm5nU2VsZWN0LmNsZWFyTW9kZWwoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==