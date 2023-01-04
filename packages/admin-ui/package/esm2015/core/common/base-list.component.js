import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, takeUntil } from 'rxjs/operators';
/**
 * @description
 * This is a base class which implements the logic required to fetch and manipulate
 * a list of data from a query which returns a PaginatedList type.
 *
 * @example
 * ```TypeScript
 * \@Component({
 *   selector: 'my-entity-list',
 *   templateUrl: './my-entity-list.component.html',
 *   styleUrls: ['./my-entity-list.component.scss'],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 * })
 * export class MyEntityListComponent extends BaseListComponent<GetMyEntityList.Query, GetMyEntityList.Items> {
 *   constructor(
 *     private dataService: DataService,
 *     router: Router,
 *     route: ActivatedRoute,
 *   ) {
 *     super(router, route);
 *     super.setQueryFn(
 *       (...args: any[]) => this.dataService.query<GetMyEntityList.Query>(GET_MY_ENTITY_LIST),
 *       data => data.myEntities,
 *     );
 *   }
 * }
 * ```
 *
 * The template for the component will typically use the {@link DataTableComponent} to display the results.
 *
 * @example
 * ```HTML
 * <vdr-action-bar>
 *   <vdr-ab-right>
 *     <a class="btn btn-primary" [routerLink]="['./create']" *vdrIfPermissions="['CreateSettings', 'CreateTaxRate']">
 *       <clr-icon shape="plus"></clr-icon>
 *       Create new my entity
 *     </a>
 *   </vdr-ab-right>
 * </vdr-action-bar>
 *
 * <vdr-data-table
 *   [items]="items$ | async"
 *   [itemsPerPage]="itemsPerPage$ | async"
 *   [totalItems]="totalItems$ | async"
 *   [currentPage]="currentPage$ | async"
 *   (pageChange)="setPageNumber($event)"
 *   (itemsPerPageChange)="setItemsPerPage($event)"
 * >
 *   <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>
 *   <vdr-dt-column></vdr-dt-column>
 *   <ng-template let-myEntity="item">
 *     <td class="left align-middle">{{ myEntity.name }}</td>
 *     <td class="right align-middle">
 *       <vdr-table-row-action
 *         iconShape="edit"
 *         [label]="'common.edit' | translate"
 *         [linkTo]="['./', myEntity.id]"
 *       ></vdr-table-row-action>
 *     </td>
 *   </ng-template>
 * </vdr-data-table>
 * ```
 *
 * @docsCategory list-detail-views
 */
// tslint:disable-next-line:directive-class-suffix
export class BaseListComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.destroy$ = new Subject();
        this.onPageChangeFn = (skip, take) => ({ options: { skip, take } });
        this.refresh$ = new BehaviorSubject(undefined);
        this.defaults = { take: 10, skip: 0 };
    }
    /**
     * @description
     * Sets the fetch function for the list being implemented.
     */
    setQueryFn(listQueryFn, mappingFn, onPageChangeFn, defaults) {
        this.listQueryFn = listQueryFn;
        this.mappingFn = mappingFn;
        if (onPageChangeFn) {
            this.onPageChangeFn = onPageChangeFn;
        }
        if (defaults) {
            this.defaults = defaults;
        }
    }
    /** @internal */
    ngOnInit() {
        if (!this.listQueryFn) {
            throw new Error(`No listQueryFn has been defined. Please call super.setQueryFn() in the constructor.`);
        }
        this.listQuery = this.listQueryFn(this.defaults.take, this.defaults.skip);
        const fetchPage = ([currentPage, itemsPerPage, _]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            this.listQuery.ref.refetch(this.onPageChangeFn(skip, take));
        };
        this.result$ = this.listQuery.stream$.pipe(shareReplay(1));
        this.items$ = this.result$.pipe(map(data => this.mappingFn(data).items));
        this.totalItems$ = this.result$.pipe(map(data => this.mappingFn(data).totalItems));
        this.currentPage$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('page')), map(page => (!page ? 1 : +page)), distinctUntilChanged());
        this.itemsPerPage$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('perPage')), map(perPage => (!perPage ? this.defaults.take : +perPage)), distinctUntilChanged());
        combineLatest(this.currentPage$, this.itemsPerPage$, this.refresh$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(fetchPage);
    }
    /** @internal */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.listQuery.completed$.next();
    }
    /**
     * @description
     * Sets the current page number in the url.
     */
    setPageNumber(page) {
        this.setQueryParam('page', page, { replaceUrl: true });
    }
    /**
     * @description
     * Sets the number of items per page in the url.
     */
    setItemsPerPage(perPage) {
        this.setQueryParam('perPage', perPage, { replaceUrl: true });
    }
    /**
     * @description
     * Re-fetch the current page of results.
     */
    refresh() {
        this.refresh$.next(undefined);
    }
    setQueryParam(keyOrHash, valueOrOptions, maybeOptions) {
        var _a;
        const paramsObject = typeof keyOrHash === 'string' ? { [keyOrHash]: valueOrOptions } : keyOrHash;
        const options = (_a = (typeof keyOrHash === 'string' ? maybeOptions : valueOrOptions)) !== null && _a !== void 0 ? _a : {};
        this.router.navigate(['./'], Object.assign({ queryParams: typeof keyOrHash === 'string' ? { [keyOrHash]: valueOrOptions } : keyOrHash, relativeTo: this.route, queryParamsHandling: 'merge' }, options));
    }
}
BaseListComponent.decorators = [
    { type: Directive }
];
BaseListComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tbW9uL2Jhc2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBdUIsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUW5GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlFRztBQUVILGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8saUJBQWlCO0lBZTFCLFlBQXNCLE1BQWMsRUFBWSxLQUFxQjtRQUEvQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFUM0QsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFJakMsbUJBQWMsR0FBaUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FDbEUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBVSxDQUFBLENBQUM7UUFDakMsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFZLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELGFBQVEsR0FBbUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUVELENBQUM7SUFFekU7OztPQUdHO0lBQ0gsVUFBVSxDQUNOLFdBQW9DLEVBQ3BDLFNBQTBDLEVB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QUFDLFNBQVMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQ3hGLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUN0QixtQkFBbUIsRUFBRSxPQUFPLElBQ3pCLE9BQU8sRUFDWixDQUFDO0lBQ1AsQ0FBQzs7O1lBOUhKLFNBQVM7OztZQTVFb0MsTUFBTTtZQUEzQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFF1ZXJ5UGFyYW1zSGFuZGxpbmcsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHNoYXJlUmVwbGF5LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFF1ZXJ5UmVzdWx0IH0gZnJvbSAnLi4vZGF0YS9xdWVyeS1yZXN1bHQnO1xuXG5leHBvcnQgdHlwZSBMaXN0UXVlcnlGbjxSPiA9ICh0YWtlOiBudW1iZXIsIHNraXA6IG51bWJlciwgLi4uYXJnczogYW55W10pID0+IFF1ZXJ5UmVzdWx0PFIsIGFueT47XG5leHBvcnQgdHlwZSBNYXBwaW5nRm48VCwgUj4gPSAocmVzdWx0OiBSKSA9PiB7IGl0ZW1zOiBUW107IHRvdGFsSXRlbXM6IG51bWJlciB9O1xuZXhwb3J0IHR5cGUgT25QYWdlQ2hhbmdlRm48Vj4gPSAoc2tpcDogbnVtYmVyLCB0YWtlOiBudW1iZXIpID0+IFY7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGlzIGEgYmFzZSBjbGFzcyB3aGljaCBpbXBsZW1lbnRzIHRoZSBsb2dpYyByZXF1aXJlZCB0byBmZXRjaCBhbmQgbWFuaXB1bGF0ZVxuICogYSBsaXN0IG9mIGRhdGEgZnJvbSBhIHF1ZXJ5IHdoaWNoIHJldHVybnMgYSBQYWdpbmF0ZWRMaXN0IHR5cGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIFxcQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktZW50aXR5LWxpc3QnLFxuICogICB0ZW1wbGF0ZVVybDogJy4vbXktZW50aXR5LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICogICBzdHlsZVVybHM6IFsnLi9teS1lbnRpdHktbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICogICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlFbnRpdHlMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUxpc3RDb21wb25lbnQ8R2V0TXlFbnRpdHlMaXN0LlF1ZXJ5LCBHZXRNeUVudGl0eUxpc3QuSXRlbXM+IHtcbiAqICAgY29uc3RydWN0b3IoXG4gKiAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gKiAgICAgcm91dGVyOiBSb3V0ZXIsXG4gKiAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICogICApIHtcbiAqICAgICBzdXBlcihyb3V0ZXIsIHJvdXRlKTtcbiAqICAgICBzdXBlci5zZXRRdWVyeUZuKFxuICogICAgICAgKC4uLmFyZ3M6IGFueVtdKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLnF1ZXJ5PEdldE15RW50aXR5TGlzdC5RdWVyeT4oR0VUX01ZX0VOVElUWV9MSVNUKSxcbiAqICAgICAgIGRhdGEgPT4gZGF0YS5teUVudGl0aWVzLFxuICogICAgICk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIFRoZSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbXBvbmVudCB3aWxsIHR5cGljYWxseSB1c2UgdGhlIHtAbGluayBEYXRhVGFibGVDb21wb25lbnR9IHRvIGRpc3BsYXkgdGhlIHJlc3VsdHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYEhUTUxcbiAqIDx2ZHItYWN0aW9uLWJhcj5cbiAqICAgPHZkci1hYi1yaWdodD5cbiAqICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIFtyb3V0ZXJMaW5rXT1cIlsnLi9jcmVhdGUnXVwiICp2ZHJJZlBlcm1pc3Npb25zPVwiWydDcmVhdGVTZXR0aW5ncycsICdDcmVhdGVUYXhSYXRlJ11cIj5cbiAqICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInBsdXNcIj48L2Nsci1pY29uPlxuICogICAgICAgQ3JlYXRlIG5ldyBteSBlbnRpdHlcbiAqICAgICA8L2E+XG4gKiAgIDwvdmRyLWFiLXJpZ2h0PlxuICogPC92ZHItYWN0aW9uLWJhcj5cbiAqXG4gKiA8dmRyLWRhdGEtdGFibGVcbiAqICAgW2l0ZW1zXT1cIml0ZW1zJCB8IGFzeW5jXCJcbiAqICAgW2l0ZW1zUGVyUGFnZV09XCJpdGVtc1BlclBhZ2UkIHwgYXN5bmNcIlxuICogICBbdG90YWxJdGVtc109XCJ0b3RhbEl0ZW1zJCB8IGFzeW5jXCJcbiAqICAgW2N1cnJlbnRQYWdlXT1cImN1cnJlbnRQYWdlJCB8IGFzeW5jXCJcbiAqICAgKHBhZ2VDaGFuZ2UpPVwic2V0UGFnZU51bWJlcigkZXZlbnQpXCJcbiAqICAgKGl0ZW1zUGVyUGFnZUNoYW5nZSk9XCJzZXRJdGVtc1BlclBhZ2UoJGV2ZW50KVwiXG4gKiA+XG4gKiAgIDx2ZHItZHQtY29sdW1uPnt7ICdjb21tb24ubmFtZScgfCB0cmFuc2xhdGUgfX08L3Zkci1kdC1jb2x1bW4+XG4gKiAgIDx2ZHItZHQtY29sdW1uPjwvdmRyLWR0LWNvbHVtbj5cbiAqICAgPG5nLXRlbXBsYXRlIGxldC1teUVudGl0eT1cIml0ZW1cIj5cbiAqICAgICA8dGQgY2xhc3M9XCJsZWZ0IGFsaWduLW1pZGRsZVwiPnt7IG15RW50aXR5Lm5hbWUgfX08L3RkPlxuICogICAgIDx0ZCBjbGFzcz1cInJpZ2h0IGFsaWduLW1pZGRsZVwiPlxuICogICAgICAgPHZkci10YWJsZS1yb3ctYWN0aW9uXG4gKiAgICAgICAgIGljb25TaGFwZT1cImVkaXRcIlxuICogICAgICAgICBbbGFiZWxdPVwiJ2NvbW1vbi5lZGl0JyB8IHRyYW5zbGF0ZVwiXG4gKiAgICAgICAgIFtsaW5rVG9dPVwiWycuLycsIG15RW50aXR5LmlkXVwiXG4gKiAgICAgICA+PC92ZHItdGFibGUtcm93LWFjdGlvbj5cbiAqICAgICA8L3RkPlxuICogICA8L25nLXRlbXBsYXRlPlxuICogPC92ZHItZGF0YS10YWJsZT5cbiAqIGBgYFxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgbGlzdC1kZXRhaWwtdmlld3NcbiAqL1xuQERpcmVjdGl2ZSgpXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIEJhc2VMaXN0Q29tcG9uZW50PFJlc3VsdFR5cGUsIEl0ZW1UeXBlLCBWYXJpYWJsZVR5cGUgPSBhbnk+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHJlc3VsdCQ6IE9ic2VydmFibGU8UmVzdWx0VHlwZT47XG4gICAgaXRlbXMkOiBPYnNlcnZhYmxlPEl0ZW1UeXBlW10+O1xuICAgIHRvdGFsSXRlbXMkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgaXRlbXNQZXJQYWdlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGN1cnJlbnRQYWdlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcHJpdmF0ZSBsaXN0UXVlcnk6IFF1ZXJ5UmVzdWx0PFJlc3VsdFR5cGUsIFZhcmlhYmxlVHlwZT47XG4gICAgcHJpdmF0ZSBsaXN0UXVlcnlGbjogTGlzdFF1ZXJ5Rm48UmVzdWx0VHlwZT47XG4gICAgcHJpdmF0ZSBtYXBwaW5nRm46IE1hcHBpbmdGbjxJdGVtVHlwZSwgUmVzdWx0VHlwZT47XG4gICAgcHJpdmF0ZSBvblBhZ2VDaGFuZ2VGbjogT25QYWdlQ2hhbmdlRm48VmFyaWFibGVUeXBlPiA9IChza2lwLCB0YWtlKSA9PlxuICAgICAgICAoeyBvcHRpb25zOiB7IHNraXAsIHRha2UgfSB9IGFzIGFueSk7XG4gICAgcHJpdmF0ZSByZWZyZXNoJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8dW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIHByaXZhdGUgZGVmYXVsdHM6IHsgdGFrZTogbnVtYmVyOyBza2lwOiBudW1iZXIgfSA9IHsgdGFrZTogMTAsIHNraXA6IDAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlciwgcHJvdGVjdGVkIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFNldHMgdGhlIGZldGNoIGZ1bmN0aW9uIGZvciB0aGUgbGlzdCBiZWluZyBpbXBsZW1lbnRlZC5cbiAgICAgKi9cbiAgICBzZXRRdWVyeUZuKFxuICAgICAgICBsaXN0UXVlcnlGbjogTGlzdFF1ZXJ5Rm48UmVzdWx0VHlwZT4sXG4gICAgICAgIG1hcHBpbmdGbjogTWFwcGluZ0ZuPEl0ZW1UeXBlLCBSZXN1bHRUeXBlPixcbiAgICAgICAgb25QYWdlQ2hhbmdlRm4/OiBPblBhZ2VDaGFuZ2VGbjxWYXJpYWJsZVR5cGU+LFxuICAgICAgICBkZWZhdWx0cz86IHsgdGFrZTogbnVtYmVyOyBza2lwOiBudW1iZXIgfSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5saXN0UXVlcnlGbiA9IGxpc3RRdWVyeUZuO1xuICAgICAgICB0aGlzLm1hcHBpbmdGbiA9IG1hcHBpbmdGbjtcbiAgICAgICAgaWYgKG9uUGFnZUNoYW5nZUZuKSB7XG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZUZuID0gb25QYWdlQ2hhbmdlRm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5saXN0UXVlcnlGbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBObyBsaXN0UXVlcnlGbiBoYXMgYmVlbiBkZWZpbmVkLiBQbGVhc2UgY2FsbCBzdXBlci5zZXRRdWVyeUZuKCkgaW4gdGhlIGNvbnN0cnVjdG9yLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdFF1ZXJ5ID0gdGhpcy5saXN0UXVlcnlGbih0aGlzLmRlZmF1bHRzLnRha2UsIHRoaXMuZGVmYXVsdHMuc2tpcCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hQYWdlID0gKFtjdXJyZW50UGFnZSwgaXRlbXNQZXJQYWdlLCBfXTogW251bWJlciwgbnVtYmVyLCB1bmRlZmluZWRdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWtlID0gaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgY29uc3Qgc2tpcCA9IChjdXJyZW50UGFnZSAtIDEpICogaXRlbXNQZXJQYWdlO1xuICAgICAgICAgICAgdGhpcy5saXN0UXVlcnkucmVmLnJlZmV0Y2godGhpcy5vblBhZ2VDaGFuZ2VGbihza2lwLCB0YWtlKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXN1bHQkID0gdGhpcy5saXN0UXVlcnkuc3RyZWFtJC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcbiAgICAgICAgdGhpcy5pdGVtcyQgPSB0aGlzLnJlc3VsdCQucGlwZShtYXAoZGF0YSA9PiB0aGlzLm1hcHBpbmdGbihkYXRhKS5pdGVtcykpO1xuICAgICAgICB0aGlzLnRvdGFsSXRlbXMkID0gdGhpcy5yZXN1bHQkLnBpcGUobWFwKGRhdGEgPT4gdGhpcy5tYXBwaW5nRm4oZGF0YSkudG90YWxJdGVtcykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlJCA9IHRoaXMucm91dGUucXVlcnlQYXJhbU1hcC5waXBlKFxuICAgICAgICAgICAgbWFwKHFwbSA9PiBxcG0uZ2V0KCdwYWdlJykpLFxuICAgICAgICAgICAgbWFwKHBhZ2UgPT4gKCFwYWdlID8gMSA6ICtwYWdlKSksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLml0ZW1zUGVyUGFnZSQgPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1NYXAucGlwZShcbiAgICAgICAgICAgIG1hcChxcG0gPT4gcXBtLmdldCgncGVyUGFnZScpKSxcbiAgICAgICAgICAgIG1hcChwZXJQYWdlID0+ICghcGVyUGFnZSA/IHRoaXMuZGVmYXVsdHMudGFrZSA6ICtwZXJQYWdlKSksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5jdXJyZW50UGFnZSQsIHRoaXMuaXRlbXNQZXJQYWdlJCwgdGhpcy5yZWZyZXNoJClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZmV0Y2hQYWdlKTtcbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMubGlzdFF1ZXJ5LmNvbXBsZXRlZCQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZSBudW1iZXIgaW4gdGhlIHVybC5cbiAgICAgKi9cbiAgICBzZXRQYWdlTnVtYmVyKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW0oJ3BhZ2UnLCBwYWdlLCB7IHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogU2V0cyB0aGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIGluIHRoZSB1cmwuXG4gICAgICovXG4gICAgc2V0SXRlbXNQZXJQYWdlKHBlclBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW0oJ3BlclBhZ2UnLCBwZXJQYWdlLCB7IHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogUmUtZmV0Y2ggdGhlIGN1cnJlbnQgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqL1xuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCQubmV4dCh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRRdWVyeVBhcmFtKFxuICAgICAgICBoYXNoOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgICAgICBvcHRpb25zPzogeyByZXBsYWNlVXJsPzogYm9vbGVhbjsgcXVlcnlQYXJhbXNIYW5kbGluZz86IFF1ZXJ5UGFyYW1zSGFuZGxpbmcgfSxcbiAgICApO1xuICAgIHByb3RlY3RlZCBzZXRRdWVyeVBhcmFtKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgdmFsdWU6IGFueSxcbiAgICAgICAgb3B0aW9ucz86IHsgcmVwbGFjZVVybD86IGJvb2xlYW47IHF1ZXJ5UGFyYW1zSGFuZGxpbmc/OiBRdWVyeVBhcmFtc0hhbmRsaW5nIH0sXG4gICAgKTtcbiAgICBwcm90ZWN0ZWQgc2V0UXVlcnlQYXJhbShcbiAgICAgICAga2V5T3JIYXNoOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgICAgICB2YWx1ZU9yT3B0aW9ucz86IGFueSxcbiAgICAgICAgbWF5YmVPcHRpb25zPzogeyByZXBsYWNlVXJsPzogYm9vbGVhbjsgcXVlcnlQYXJhbXNIYW5kbGluZz86IFF1ZXJ5UGFyYW1zSGFuZGxpbmcgfSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgcGFyYW1zT2JqZWN0ID0gdHlwZW9mIGtleU9ySGFzaCA9PT0gJ3N0cmluZycgPyB7IFtrZXlPckhhc2hdOiB2YWx1ZU9yT3B0aW9ucyB9IDoga2V5T3JIYXNoO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gKHR5cGVvZiBrZXlPckhhc2ggPT09ICdzdHJpbmcnID8gbWF5YmVPcHRpb25zIDogdmFsdWVPck9wdGlvbnMpID8/IHt9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJ10sIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0eXBlb2Yga2V5T3JIYXNoID09PSAnc3RyaW5nJyA/IHsgW2tleU9ySGFzaF06IHZhbHVlT3JPcHRpb25zIH0gOiBrZXlPckhhc2gsXG4gICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogJ21lcmdlJyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==