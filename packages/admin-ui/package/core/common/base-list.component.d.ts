import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, QueryParamsHandling, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { QueryResult } from '../data/query-result';
export declare type ListQueryFn<R> = (take: number, skip: number, ...args: any[]) => QueryResult<R, any>;
export declare type MappingFn<T, R> = (result: R) => {
    items: T[];
    totalItems: number;
};
export declare type OnPageChangeFn<V> = (skip: number, take: number) => V;
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
export declare class BaseListComponent<ResultType, ItemType, VariableType = any> implements OnInit, OnDestroy {
    protected router: Router;
    protected route: ActivatedRoute;
    result$: Observable<ResultType>;
    items$: Observable<ItemType[]>;
    totalItems$: Observable<number>;
    itemsPerPage$: Observable<number>;
    currentPage$: Observable<number>;
    protected destroy$: Subject<void>;
    private listQuery;
    private listQueryFn;
    private mappingFn;
    private onPageChangeFn;
    private refresh$;
    private defaults;
    constructor(router: Router, route: ActivatedRoute);
    /**
     * @description
     * Sets the fetch function for the list being implemented.
     */
    setQueryFn(listQueryFn: ListQueryFn<ResultType>, mappingFn: MappingFn<ItemType, ResultType>, onPageChangeFn?: OnPageChangeFn<VariableType>, defaults?: {
        take: number;
        skip: number;
    }): void;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    /**
     * @description
     * Sets the current page number in the url.
     */
    setPageNumber(page: number): void;
    /**
     * @description
     * Sets the number of items per page in the url.
     */
    setItemsPerPage(perPage: number): void;
    /**
     * @description
     * Re-fetch the current page of results.
     */
    refresh(): void;
    protected setQueryParam(hash: {
        [key: string]: any;
    }, options?: {
        replaceUrl?: boolean;
        queryParamsHandling?: QueryParamsHandling;
    }): any;
    protected setQueryParam(key: string, value: any, options?: {
        replaceUrl?: boolean;
        queryParamsHandling?: QueryParamsHandling;
    }): any;
}
