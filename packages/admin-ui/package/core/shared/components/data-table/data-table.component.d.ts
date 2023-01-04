import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { SelectionManager } from '../../../common/utilities/selection-manager';
import { DataTableColumnComponent } from './data-table-column.component';
/**
 * @description
 * A table for displaying PaginatedList results. It is designed to be used inside components which
 * extend the {@link BaseListComponent} class.
 *
 * @example
 * ```HTML
 * <vdr-data-table
 *   [items]="items$ | async"
 *   [itemsPerPage]="itemsPerPage$ | async"
 *   [totalItems]="totalItems$ | async"
 *   [currentPage]="currentPage$ | async"
 *   (pageChange)="setPageNumber($event)"
 *   (itemsPerPageChange)="setItemsPerPage($event)"
 * >
 *   <!-- The header columns are defined first -->
 *   <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>
 *   <vdr-dt-column></vdr-dt-column>
 *   <vdr-dt-column></vdr-dt-column>
 *
 *   <!-- Then we define how a row is rendered -->
 *   <ng-template let-taxRate="item">
 *     <td class="left align-middle">{{ taxRate.name }}</td>
 *     <td class="left align-middle">{{ taxRate.category.name }}</td>
 *     <td class="left align-middle">{{ taxRate.zone.name }}</td>
 *     <td class="left align-middle">{{ taxRate.value }}%</td>
 *     <td class="right align-middle">
 *       <vdr-table-row-action
 *         iconShape="edit"
 *         [label]="'common.edit' | translate"
 *         [linkTo]="['./', taxRate.id]"
 *       ></vdr-table-row-action>
 *     </td>
 *     <td class="right align-middle">
 *       <vdr-dropdown>
 *         <button type="button" class="btn btn-link btn-sm" vdrDropdownTrigger>
 *           {{ 'common.actions' | translate }}
 *           <clr-icon shape="caret down"></clr-icon>
 *         </button>
 *         <vdr-dropdown-menu vdrPosition="bottom-right">
 *           <button
 *               type="button"
 *               class="delete-button"
 *               (click)="deleteTaxRate(taxRate)"
 *               [disabled]="!(['DeleteSettings', 'DeleteTaxRate'] | hasPermission)"
 *               vdrDropdownItem
 *           >
 *               <clr-icon shape="trash" class="is-danger"></clr-icon>
 *               {{ 'common.delete' | translate }}
 *           </button>
 *         </vdr-dropdown-menu>
 *       </vdr-dropdown>
 *     </td>
 *   </ng-template>
 * </vdr-data-table>
 * ```
 *
 * @docsCategory components
 */
export declare class DataTableComponent<T> implements AfterContentInit, OnChanges, OnInit, OnDestroy {
    private changeDetectorRef;
    customRowHeight: number;
    customRowClass: string;
    items: T[];
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    emptyStateLabel: string;
    selectionManager?: SelectionManager<T>;
    pageChange: EventEmitter<number>;
    itemsPerPageChange: EventEmitter<number>;
    /** @deprecated pass a SelectionManager instance instead */
    allSelected: boolean;
    /** @deprecated pass a SelectionManager instance instead */
    isRowSelectedFn: (item: T) => boolean;
    /** @deprecated pass a SelectionManager instance instead */
    allSelectChange: EventEmitter<void>;
    /** @deprecated pass a SelectionManager instance instead */
    rowSelectChange: EventEmitter<{
        event: MouseEvent;
        item: T;
    }>;
    columns: QueryList<DataTableColumnComponent>;
    templateRefs: QueryList<TemplateRef<any>>;
    rowTemplate: TemplateRef<any>;
    currentStart: number;
    currentEnd: number;
    disableSelect: boolean;
    private subscription;
    constructor(changeDetectorRef: ChangeDetectorRef);
    private shiftDownHandler;
    private shiftUpHandler;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    trackByFn(index: number, item: any): any;
    onToggleAllClick(): void;
    onRowClick(item: T, event: MouseEvent): void;
}
