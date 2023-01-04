import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, takeUntil, tap, } from 'rxjs/operators';
export class CollectionContentsComponent {
    constructor(route, router, dataService) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.previewUpdatedFilters = false;
        this.filterTermControl = new FormControl('');
        this.isLoading = false;
        this.collectionIdChange$ = new BehaviorSubject('');
        this.parentIdChange$ = new BehaviorSubject('');
        this.filterChanges$ = new BehaviorSubject([]);
        this.refresh$ = new BehaviorSubject(true);
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.contentsCurrentPage$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('contentsPage')), map(page => (!page ? 1 : +page)), startWith(1), distinctUntilChanged());
        this.contentsItemsPerPage$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('contentsPerPage')), map(perPage => (!perPage ? 10 : +perPage)), startWith(10), distinctUntilChanged());
        const filterTerm$ = this.filterTermControl.valueChanges.pipe(debounceTime(250), tap(() => this.setContentsPageNumber(1)), startWith(''));
        const filterChanges$ = this.filterChanges$.asObservable().pipe(filter(() => this.previewUpdatedFilters), tap(() => this.setContentsPageNumber(1)), startWith([]));
        const fetchUpdate$ = combineLatest(this.collectionIdChange$, this.parentIdChange$, this.contentsCurrentPage$, this.contentsItemsPerPage$, filterTerm$, filterChanges$, this.refresh$);
        const collection$ = fetchUpdate$.pipe(takeUntil(this.destroy$), tap(() => (this.isLoading = true)), debounceTime(50), switchMap(([id, parentId, currentPage, itemsPerPage, filterTerm, filters]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            if (filters.length && this.previewUpdatedFilters) {
                const filterClause = filterTerm
                    ? { name: { contains: filterTerm } }
                    : undefined;
                return this.dataService.collection
                    .previewCollectionVariants({
                    parentId,
                    filters,
                }, {
                    take,
                    skip,
                    filter: filterClause,
                })
                    .mapSingle(data => data.previewCollectionVariants)
                    .pipe(catchError(() => of({ items: [], totalItems: 0 })));
            }
            else if (id) {
                return this.dataService.collection
                    .getCollectionContents(id, take, skip, filterTerm)
                    .mapSingle(data => { var _a; return (_a = data.collection) === null || _a === void 0 ? void 0 : _a.productVariants; });
            }
            else {
                return of(null);
            }
        }), tap(() => (this.isLoading = false)), finalize(() => (this.isLoading = false)));
        this.contents$ = collection$.pipe(map(result => (result ? result.items : [])));
        this.contentsTotalItems$ = collection$.pipe(map(result => (result ? result.totalItems : 0)));
    }
    ngOnChanges(changes) {
        if ('collectionId' in changes) {
            this.collectionIdChange$.next(changes.collectionId.currentValue);
        }
        if ('parentId' in changes) {
            this.parentIdChange$.next(changes.parentId.currentValue);
        }
        if ('updatedFilters' in changes) {
            if (this.updatedFilters) {
                this.filterChanges$.next(this.updatedFilters);
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setContentsPageNumber(page) {
        this.setParam('contentsPage', page);
    }
    setContentsItemsPerPage(perPage) {
        this.setParam('contentsPerPage', perPage);
    }
    refresh() {
        this.refresh$.next(true);
    }
    setParam(key, value) {
        this.router.navigate(['./'], {
            relativeTo: this.route,
            queryParams: {
                [key]: value,
            },
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }
}
CollectionContentsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-contents',
                template: "<div class=\"contents-header\">\n    <div class=\"header-title-row\">\n        <ng-container\n            *ngTemplateOutlet=\"headerTemplate; context: { $implicit: contentsTotalItems$ | async }\"\n        ></ng-container>\n    </div>\n    <input\n        type=\"text\"\n        [placeholder]=\"'catalog.filter-by-name' | translate\"\n        [formControl]=\"filterTermControl\"\n    />\n</div>\n<div class=\"table-wrapper\">\n    <div class=\"progress loop\" [class.visible]=\"isLoading\"></div>\n    <vdr-data-table\n        [class.loading]=\"isLoading\"\n        [items]=\"contents$ | async\"\n        [itemsPerPage]=\"contentsItemsPerPage$ | async\"\n        [totalItems]=\"contentsTotalItems$ | async\"\n        [currentPage]=\"contentsCurrentPage$ | async\"\n        (pageChange)=\"setContentsPageNumber($event)\"\n        (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n    >\n        <ng-template let-variant=\"item\">\n            <td class=\"left align-middle\">{{ variant.name }}</td>\n            <td class=\"left align-middle\"><small class=\"sku\">{{ variant.sku }}</small></td>\n            <td class=\"right align-middle\">\n                <vdr-table-row-action\n                    iconShape=\"edit\"\n                    [label]=\"'common.edit' | translate\"\n                    [linkTo]=\"['/catalog/products', variant.productId, { tab: 'variants' }]\"\n                ></vdr-table-row-action>\n            </td>\n        </ng-template>\n    </vdr-data-table>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".contents-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:1;border-bottom:1px solid var(--color-component-border-200)}.contents-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.contents-header .clr-input{width:100%}:host{display:block}:host ::ng-deep table{margin-top:-1px}vdr-data-table{opacity:1;transition:opacity .3s}vdr-data-table.loading{opacity:.5}.table-wrapper{position:relative}.progress{position:absolute;top:0;left:0;overflow:hidden;height:6px;opacity:0;transition:opacity .1s}.progress.visible{opacity:1}.sku{color:var(--color-text-200)}\n"]
            },] }
];
CollectionContentsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: DataService }
];
CollectionContentsComponent.propDecorators = {
    collectionId: [{ type: Input }],
    parentId: [{ type: Input }],
    updatedFilters: [{ type: Input }],
    previewUpdatedFilters: [{ type: Input }],
    headerTemplate: [{ type: ContentChild, args: [TemplateRef, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1jb250ZW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi1jb250ZW50cy9jb2xsZWN0aW9uLWNvbnRlbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUtMLFdBQVcsR0FDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBR0gsV0FBVyxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRSxPQUFPLEVBQ0gsVUFBVSxFQUNWLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLFFBQVEsRUFDUixHQUFHLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsR0FBRyxHQUNOLE1BQU0sZ0JBQWdCLENBQUM7QUFReEIsTUFBTSxPQUFPLDJCQUEyQjtJQW1CcEMsWUFBb0IsS0FBcUIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBL0UsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFmMUYsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBT3ZDLHNCQUFpQixHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDVix3QkFBbUIsR0FBRyxJQUFJ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UUFBUSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSztZQUN0QixXQUFXLEVBQUU7Z0JBQ1QsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLO2FBQ2Y7WUFDRCxtQkFBbUIsRUFBRSxPQUFPO1lBQzVCLFVBQVUsRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQWpKSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsdytDQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUExQlEsY0FBYztZQUFFLE1BQU07WUFJM0IsV0FBVzs7OzJCQXdCVixLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSztvQ0FDTCxLQUFLOzZCQUNMLFlBQVksU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gICAgQ29sbGVjdGlvbkZpbHRlclBhcmFtZXRlcixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dCxcbiAgICBEYXRhU2VydmljZSxcbiAgICBHZXRDb2xsZWN0aW9uQ29udGVudHMsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBjYXRjaEVycm9yLFxuICAgIGRlYm91bmNlVGltZSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgICBmaWx0ZXIsXG4gICAgZmluYWxpemUsXG4gICAgbWFwLFxuICAgIHN0YXJ0V2l0aCxcbiAgICBzd2l0Y2hNYXAsXG4gICAgdGFrZVVudGlsLFxuICAgIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jb2xsZWN0aW9uLWNvbnRlbnRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29sbGVjdGlvbi1jb250ZW50cy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29sbGVjdGlvbi1jb250ZW50cy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQ29udGVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBjb2xsZWN0aW9uSWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwYXJlbnRJZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHVwZGF0ZWRGaWx0ZXJzOiBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dFtdIHwgdW5kZWZpbmVkO1xuICAgIEBJbnB1dCgpIHByZXZpZXdVcGRhdGVkRmlsdGVycyA9IGZhbHNlO1xuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiB0cnVlIH0pIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY29udGVudHMkOiBPYnNlcnZhYmxlPEdldENvbGxlY3Rpb25Db250ZW50cy5JdGVtc1tdPjtcbiAgICBjb250ZW50c1RvdGFsSXRlbXMkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgY29udGVudHNJdGVtc1BlclBhZ2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgY29udGVudHNDdXJyZW50UGFnZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBmaWx0ZXJUZXJtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjb2xsZWN0aW9uSWRDaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgICBwcml2YXRlIHBhcmVudElkQ2hhbmdlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gICAgcHJpdmF0ZSBmaWx0ZXJDaGFuZ2VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXRbXT4oW10pO1xuICAgIHByaXZhdGUgcmVmcmVzaCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICAgIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudHNDdXJyZW50UGFnZSQgPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1NYXAucGlwZShcbiAgICAgICAgICAgIG1hcChxcG0gPT4gcXBtLmdldCgnY29udGVudHNQYWdlJykpLFxuICAgICAgICAgICAgbWFwKHBhZ2UgPT4gKCFwYWdlID8gMSA6ICtwYWdlKSksXG4gICAgICAgICAgICBzdGFydFdpdGgoMSksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY29udGVudHNJdGVtc1BlclBhZ2UkID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtTWFwLnBpcGUoXG4gICAgICAgICAgICBtYXAocXBtID0+IHFwbS5nZXQoJ2NvbnRlbnRzUGVyUGFnZScpKSxcbiAgICAgICAgICAgIG1hcChwZXJQYWdlID0+ICghcGVyUGFnZSA/IDEwIDogK3BlclBhZ2UpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgxMCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlclRlcm0kID0gdGhpcy5maWx0ZXJUZXJtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuc2V0Q29udGVudHNQYWdlTnVtYmVyKDEpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyQ2hhbmdlcyQgPSB0aGlzLmZpbHRlckNoYW5nZXMkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5wcmV2aWV3VXBkYXRlZEZpbHRlcnMpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuc2V0Q29udGVudHNQYWdlTnVtYmVyKDEpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aChbXSksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hVcGRhdGUkID0gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbklkQ2hhbmdlJCxcbiAgICAgICAgICAgIHRoaXMucGFyZW50SWRDaGFuZ2UkLFxuICAgICAgICAgICAgdGhpcy5jb250ZW50c0N1cnJlbnRQYWdlJCxcbiAgICAgICAgICAgIHRoaXMuY29udGVudHNJdGVtc1BlclBhZ2UkLFxuICAgICAgICAgICAgZmlsdGVyVGVybSQsXG4gICAgICAgICAgICBmaWx0ZXJDaGFuZ2VzJCxcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCQsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiQgPSBmZXRjaFVwZGF0ZSQucGlwZShcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiAodGhpcy5pc0xvYWRpbmcgPSB0cnVlKSksXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKChbaWQsIHBhcmVudElkLCBjdXJyZW50UGFnZSwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJUZXJtLCBmaWx0ZXJzXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRha2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpcCA9IChjdXJyZW50UGFnZSAtIDEpICogaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCAmJiB0aGlzLnByZXZpZXdVcGRhdGVkRmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDbGF1c2UgPSBmaWx0ZXJUZXJtXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICh7IG5hbWU6IHsgY29udGFpbnM6IGZpbHRlclRlcm0gfSB9IGFzIENvbGxlY3Rpb25GaWx0ZXJQYXJhbWV0ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLnByZXZpZXdDb2xsZWN0aW9uVmFyaWFudHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXJDbGF1c2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLnByZXZpZXdDb2xsZWN0aW9uVmFyaWFudHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShjYXRjaEVycm9yKCgpID0+IG9mKHsgaXRlbXM6IFtdLCB0b3RhbEl0ZW1zOiAwIH0pKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29sbGVjdGlvbkNvbnRlbnRzKGlkLCB0YWtlLCBza2lwLCBmaWx0ZXJUZXJtKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcFNpbmdsZShkYXRhID0+IGRhdGEuY29sbGVjdGlvbj8ucHJvZHVjdFZhcmlhbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMuaXNMb2FkaW5nID0gZmFsc2UpKSxcbiAgICAgICAgICAgIGZpbmFsaXplKCgpID0+ICh0aGlzLmlzTG9hZGluZyA9IGZhbHNlKSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50cyQgPSBjb2xsZWN0aW9uJC5waXBlKG1hcChyZXN1bHQgPT4gKHJlc3VsdCA/IHJlc3VsdC5pdGVtcyA6IFtdKSkpO1xuICAgICAgICB0aGlzLmNvbnRlbnRzVG90YWxJdGVtcyQgPSBjb2xsZWN0aW9uJC5waXBlKG1hcChyZXN1bHQgPT4gKHJlc3VsdCA/IHJlc3VsdC50b3RhbEl0ZW1zIDogMCkpKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICgnY29sbGVjdGlvbklkJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25JZENoYW5nZSQubmV4dChjaGFuZ2VzLmNvbGxlY3Rpb25JZC5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgncGFyZW50SWQnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50SWRDaGFuZ2UkLm5leHQoY2hhbmdlcy5wYXJlbnRJZC5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndXBkYXRlZEZpbHRlcnMnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVwZGF0ZWRGaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJDaGFuZ2VzJC5uZXh0KHRoaXMudXBkYXRlZEZpbHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudHNQYWdlTnVtYmVyKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFBhcmFtKCdjb250ZW50c1BhZ2UnLCBwYWdlKTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50c0l0ZW1zUGVyUGFnZShwZXJQYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbSgnY29udGVudHNQZXJQYWdlJywgcGVyUGFnZSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoJC5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFyYW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLyddLCB7XG4gICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBba2V5XTogdmFsdWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogJ21lcmdlJyxcbiAgICAgICAgICAgIHJlcGxhY2VVcmw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==