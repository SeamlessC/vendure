import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { PaginationService } from 'ngx-pagination';
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
export class DataTableComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
        /** @deprecated pass a SelectionManager instance instead */
        this.allSelectChange = new EventEmitter();
        /** @deprecated pass a SelectionManager instance instead */
        this.rowSelectChange = new EventEmitter();
        // This is used to apply a `user-select: none` CSS rule to the table,
        // which allows shift-click multi-row selection
        this.disableSelect = false;
        this.shiftDownHandler = (event) => {
            if (event.shiftKey && !this.disableSelect) {
                this.disableSelect = true;
                this.changeDetectorRef.markForCheck();
            }
        };
        this.shiftUpHandler = (event) => {
            if (this.disableSelect) {
                this.disableSelect = false;
                this.changeDetectorRef.markForCheck();
            }
        };
    }
    ngOnInit() {
        var _a;
        if (typeof this.isRowSelectedFn === 'function' || this.selectionManager) {
            document.addEventListener('keydown', this.shiftDownHandler, { passive: true });
            document.addEventListener('keyup', this.shiftUpHandler, { passive: true });
        }
        this.subscription = (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.selectionChanges$.subscribe(() => this.changeDetectorRef.markForCheck());
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (changes.items) {
            this.currentStart = this.itemsPerPage * (this.currentPage - 1);
            this.currentEnd = this.currentStart + ((_a = changes.items.currentValue) === null || _a === void 0 ? void 0 : _a.length);
            (_b = this.selectionManager) === null || _b === void 0 ? void 0 : _b.setCurrentItems(this.items);
        }
    }
    ngOnDestroy() {
        var _a;
        if (typeof this.isRowSelectedFn === 'function' || this.selectionManager) {
            document.removeEventListener('keydown', this.shiftDownHandler);
            document.removeEventListener('keyup', this.shiftUpHandler);
        }
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    ngAfterContentInit() {
        this.rowTemplate = this.templateRefs.last;
    }
    trackByFn(index, item) {
        if (item.id != null) {
            return item.id;
        }
        else {
            return index;
        }
    }
    onToggleAllClick() {
        var _a;
        this.allSelectChange.emit();
        (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.toggleSelectAll();
    }
    onRowClick(item, event) {
        var _a;
        this.rowSelectChange.emit({ event, item });
        (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.toggleSelection(item, event);
    }
}
DataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-data-table',
                template: "<ng-container *ngIf=\"!items || (items && items.length); else emptyPlaceholder\">\n    <div class=\"bulk-actions\">\n        <ng-content select=\"vdr-bulk-action-menu\"></ng-content>\n    </div>\n    <table class=\"table\" [class.no-select]=\"disableSelect\">\n        <thead [class.items-selected]=\"selectionManager?.selection.length\">\n            <tr>\n                <th *ngIf=\"isRowSelectedFn || selectionManager\" class=\"align-middle\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"allSelected ? allSelected : selectionManager?.areAllCurrentItemsSelected()\"\n                        (change)=\"onToggleAllClick()\"\n                    />\n                </th>\n                <th\n                    *ngFor=\"let header of columns?.toArray()\"\n                    class=\"left align-middle\"\n                    [class.expand]=\"header.expand\"\n                >\n                    <ng-container *ngTemplateOutlet=\"header.template\"></ng-container>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr\n                [ngClass]=\"'order-status-' + item.state\"\n                [ngStyle]=\"{ height: customRowHeight ? customRowHeight + 'rem' : 'auto' }\"\n                *ngFor=\"\n                    let item of items\n                        | paginate\n                            : {\n                                  itemsPerPage: itemsPerPage,\n                                  currentPage: currentPage,\n                                  totalItems: totalItems\n                              };\n                    index as i;\n                    trackBy: trackByFn\n                \"\n            >\n                <td *ngIf=\"isRowSelectedFn || selectionManager\" class=\"align-middle selection-col\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"\n                            isRowSelectedFn ? isRowSelectedFn(item) : selectionManager?.isSelected(item)\n                        \"\n                        (click)=\"onRowClick(item, $event)\"\n                    />\n                </td>\n                <ng-container\n                    *ngTemplateOutlet=\"rowTemplate; context: { item: item, index: i }\"\n                ></ng-container>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"table-footer\">\n        <vdr-items-per-page-controls\n            *ngIf=\"totalItems\"\n            [itemsPerPage]=\"itemsPerPage\"\n            (itemsPerPageChange)=\"itemsPerPageChange.emit($event)\"\n        ></vdr-items-per-page-controls>\n        <div *ngIf=\"totalItems\" class=\"p5\">\n            {{ 'common.total-items' | translate: { currentStart, currentEnd, totalItems } }}\n        </div>\n\n        <vdr-pagination-controls\n            *ngIf=\"totalItems\"\n            [currentPage]=\"currentPage\"\n            [itemsPerPage]=\"itemsPerPage\"\n            [totalItems]=\"totalItems\"\n            (pageChange)=\"pageChange.emit($event)\"\n        ></vdr-pagination-controls>\n    </div>\n</ng-container>\n<ng-template #emptyPlaceholder>\n    <vdr-empty-placeholder [emptyStateLabel]=\"emptyStateLabel\"></vdr-empty-placeholder>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [PaginationService],
                styles: [":host{display:block;max-width:100%;overflow:auto;position:relative}.bulk-actions{position:absolute;left:50px;top:30px;z-index:2}table.table{color:#000;max-width:100vw;overflow-x:auto}table.no-select{-webkit-user-select:none;user-select:none}.order-status-PaymentAuthorized,.order-status-PaymentSettled{background:#ffab8f}thead th{position:sticky;top:24px;z-index:1}thead th.expand{width:100%}thead.items-selected tr th{color:transparent}.selection-col{width:24px}.table-footer{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}.tall-row{height:5rem}.order-status-Received{background:#ebbb61}.order-status-Processing{background:#ffffca}.order-status-ReadyForPickup{background:#79f087}.order-status-Finished{background:#6ebef6}\n"]
            },] }
];
DataTableComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableComponent.propDecorators = {
    customRowHeight: [{ type: Input }],
    customRowClass: [{ type: Input }],
    items: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    currentPage: [{ type: Input }],
    totalItems: [{ type: Input }],
    emptyStateLabel: [{ type: Input }],
    selectionManager: [{ type: Input }],
    pageChange: [{ type: Output }],
    itemsPerPageChange: [{ type: Output }],
    allSelected: [{ type: Input }],
    isRowSelectedFn: [{ type: Input }],
    allSelectChange: [{ type: Output }],
    rowSelectChange: [{ type: Output }],
    columns: [{ type: ContentChildren, args: [DataTableColumnComponent,] }],
    templateRefs: [{ type: ContentChildren, args: [TemplateRef,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHTixXQUFXLEdBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNbkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwREc7QUFRSCxNQUFNLE9BQU8sa0JBQWtCO0lBK0IzQixZQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXRCOUMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQU0xRCwyREFBMkQ7UUFDakQsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3JELDJEQUEyRDtRQUNqRCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBTy9FLHFFQUFxRTtRQUNyRSwrQ0FBK0M7UUFDL0Msa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFLZCxxQkFBZ0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUNoRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFD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LEVBQUUsZ0JBQWdCO2dCQUMxQiwyeUdBQXdDO2dCQUV4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7O2FBQ2pDOzs7WUF0RkcsaUJBQWlCOzs7OEJBd0ZoQixLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLOytCQUNMLEtBQUs7eUJBQ0wsTUFBTTtpQ0FDTixNQUFNOzBCQUdOLEtBQUs7OEJBRUwsS0FBSzs4QkFFTCxNQUFNOzhCQUVOLE1BQU07c0JBRU4sZUFBZSxTQUFDLHdCQUF3QjsyQkFDeEMsZUFBZSxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRpb25TZXJ2aWNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFNlbGVjdGlvbk1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbGl0aWVzL3NlbGVjdGlvbi1tYW5hZ2VyJztcblxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSB0YWJsZSBmb3IgZGlzcGxheWluZyBQYWdpbmF0ZWRMaXN0IHJlc3VsdHMuIEl0IGlzIGRlc2lnbmVkIHRvIGJlIHVzZWQgaW5zaWRlIGNvbXBvbmVudHMgd2hpY2hcbiAqIGV4dGVuZCB0aGUge0BsaW5rIEJhc2VMaXN0Q29tcG9uZW50fSBjbGFzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgSFRNTFxuICogPHZkci1kYXRhLXRhYmxlXG4gKiAgIFtpdGVtc109XCJpdGVtcyQgfCBhc3luY1wiXG4gKiAgIFtpdGVtc1BlclBhZ2VdPVwiaXRlbXNQZXJQYWdlJCB8IGFzeW5jXCJcbiAqICAgW3RvdGFsSXRlbXNdPVwidG90YWxJdGVtcyQgfCBhc3luY1wiXG4gKiAgIFtjdXJyZW50UGFnZV09XCJjdXJyZW50UGFnZSQgfCBhc3luY1wiXG4gKiAgIChwYWdlQ2hhbmdlKT1cInNldFBhZ2VOdW1iZXIoJGV2ZW50KVwiXG4gKiAgIChpdGVtc1BlclBhZ2VDaGFuZ2UpPVwic2V0SXRlbXNQZXJQYWdlKCRldmVudClcIlxuICogPlxuICogICA8IS0tIFRoZSBoZWFkZXIgY29sdW1ucyBhcmUgZGVmaW5lZCBmaXJzdCAtLT5cbiAqICAgPHZkci1kdC1jb2x1bW4+e3sgJ2NvbW1vbi5uYW1lJyB8IHRyYW5zbGF0ZSB9fTwvdmRyLWR0LWNvbHVtbj5cbiAqICAgPHZkci1kdC1jb2x1bW4+PC92ZHItZHQtY29sdW1uPlxuICogICA8dmRyLWR0LWNvbHVtbj48L3Zkci1kdC1jb2x1bW4+XG4gKlxuICogICA8IS0tIFRoZW4gd2UgZGVmaW5lIGhvdyBhIHJvdyBpcyByZW5kZXJlZCAtLT5cbiAqICAgPG5nLXRlbXBsYXRlIGxldC10YXhSYXRlPVwiaXRlbVwiPlxuICogICAgIDx0ZCBjbGFzcz1cImxlZnQgYWxpZ24tbWlkZGxlXCI+e3sgdGF4UmF0ZS5uYW1lIH19PC90ZD5cbiAqICAgICA8dGQgY2xhc3M9XCJsZWZ0IGFsaWduLW1pZGRsZVwiPnt7IHRheFJhdGUuY2F0ZWdvcnkubmFtZSB9fTwvdGQ+XG4gKiAgICAgPHRkIGNsYXNzPVwibGVmdCBhbGlnbi1taWRkbGVcIj57eyB0YXhSYXRlLnpvbmUubmFtZSB9fTwvdGQ+XG4gKiAgICAgPHRkIGNsYXNzPVwibGVmdCBhbGlnbi1taWRkbGVcIj57eyB0YXhSYXRlLnZhbHVlIH19JTwvdGQ+XG4gKiAgICAgPHRkIGNsYXNzPVwicmlnaHQgYWxpZ24tbWlkZGxlXCI+XG4gKiAgICAgICA8dmRyLXRhYmxlLXJvdy1hY3Rpb25cbiAqICAgICAgICAgaWNvblNoYXBlPVwiZWRpdFwiXG4gKiAgICAgICAgIFtsYWJlbF09XCInY29tbW9uLmVkaXQnIHwgdHJhbnNsYXRlXCJcbiAqICAgICAgICAgW2xpbmtUb109XCJbJy4vJywgdGF4UmF0ZS5pZF1cIlxuICogICAgICAgPjwvdmRyLXRhYmxlLXJvdy1hY3Rpb24+XG4gKiAgICAgPC90ZD5cbiAqICAgICA8dGQgY2xhc3M9XCJyaWdodCBhbGlnbi1taWRkbGVcIj5cbiAqICAgICAgIDx2ZHItZHJvcGRvd24+XG4gKiAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGJ0bi1zbVwiIHZkckRyb3Bkb3duVHJpZ2dlcj5cbiAqICAgICAgICAgICB7eyAnY29tbW9uLmFjdGlvbnMnIHwgdHJhbnNsYXRlIH19XG4gKiAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2FyZXQgZG93blwiPjwvY2xyLWljb24+XG4gKiAgICAgICAgIDwvYnV0dG9uPlxuICogICAgICAgICA8dmRyLWRyb3Bkb3duLW1lbnUgdmRyUG9zaXRpb249XCJib3R0b20tcmlnaHRcIj5cbiAqICAgICAgICAgICA8YnV0dG9uXG4gKiAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICogICAgICAgICAgICAgICBjbGFzcz1cImRlbGV0ZS1idXR0b25cIlxuICogICAgICAgICAgICAgICAoY2xpY2spPVwiZGVsZXRlVGF4UmF0ZSh0YXhSYXRlKVwiXG4gKiAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhKFsnRGVsZXRlU2V0dGluZ3MnLCAnRGVsZXRlVGF4UmF0ZSddIHwgaGFzUGVybWlzc2lvbilcIlxuICogICAgICAgICAgICAgICB2ZHJEcm9wZG93bkl0ZW1cbiAqICAgICAgICAgICA+XG4gKiAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInRyYXNoXCIgY2xhc3M9XCJpcy1kYW5nZXJcIj48L2Nsci1pY29uPlxuICogICAgICAgICAgICAgICB7eyAnY29tbW9uLmRlbGV0ZScgfCB0cmFuc2xhdGUgfX1cbiAqICAgICAgICAgICA8L2J1dHRvbj5cbiAqICAgICAgICAgPC92ZHItZHJvcGRvd24tbWVudT5cbiAqICAgICAgIDwvdmRyLWRyb3Bkb3duPlxuICogICAgIDwvdGQ+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKiA8L3Zkci1kYXRhLXRhYmxlPlxuICogYGBgXG4gKlxuICogQGRvY3NDYXRlZ29yeSBjb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWRhdGEtdGFibGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnZGF0YS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2RhdGEtdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtQYWdpbmF0aW9uU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGN1c3RvbVJvd0hlaWdodDogbnVtYmVyOyAvLyByZW1zXG4gICAgQElucHV0KCkgY3VzdG9tUm93Q2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKSBpdGVtczogVFtdO1xuICAgIEBJbnB1dCgpIGl0ZW1zUGVyUGFnZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gICAgQElucHV0KCkgdG90YWxJdGVtczogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGVtcHR5U3RhdGVMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1hbmFnZXI/OiBTZWxlY3Rpb25NYW5hZ2VyPFQ+O1xuICAgIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIGl0ZW1zUGVyUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgLyoqIEBkZXByZWNhdGVkIHBhc3MgYSBTZWxlY3Rpb25NYW5hZ2VyIGluc3RhbmNlIGluc3RlYWQgKi9cbiAgICBASW5wdXQoKSBhbGxTZWxlY3RlZDogYm9vbGVhbjtcbiAgICAvKiogQGRlcHJlY2F0ZWQgcGFzcyBhIFNlbGVjdGlvbk1hbmFnZXIgaW5zdGFuY2UgaW5zdGVhZCAqL1xuICAgIEBJbnB1dCgpIGlzUm93U2VsZWN0ZWRGbjogKGl0ZW06IFQpID0+IGJvb2xlYW47XG4gICAgLyoqIEBkZXByZWNhdGVkIHBhc3MgYSBTZWxlY3Rpb25NYW5hZ2VyIGluc3RhbmNlIGluc3RlYWQgKi9cbiAgICBAT3V0cHV0KCkgYWxsU2VsZWN0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8qKiBAZGVwcmVjYXRlZCBwYXNzIGEgU2VsZWN0aW9uTWFuYWdlciBpbnN0YW5jZSBpbnN0ZWFkICovXG4gICAgQE91dHB1dCgpIHJvd1NlbGVjdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgaXRlbTogVCB9PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihEYXRhVGFibGVDb2x1bW5Db21wb25lbnQpIGNvbHVtbnM6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW5Db21wb25lbnQ+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIHJvd1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIGN1cnJlbnRTdGFydDogbnVtYmVyO1xuICAgIGN1cnJlbnRFbmQ6IG51bWJlcjtcbiAgICAvLyBUaGlzIGlzIHVzZWQgdG8gYXBwbHkgYSBgdXNlci1zZWxlY3Q6IG5vbmVgIENTUyBydWxlIHRvIHRoZSB0YWJsZSxcbiAgICAvLyB3aGljaCBhbGxvd3Mgc2hpZnQtY2xpY2sgbXVsdGktcm93IHNlbGVjdGlvblxuICAgIGRpc2FibGVTZWxlY3QgPSBmYWxzZTtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBwcml2YXRlIHNoaWZ0RG93bkhhbmRsZXIgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmICF0aGlzLmRpc2FibGVTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgc2hpZnRVcEhhbmRsZXIgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZVNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaXNSb3dTZWxlY3RlZEZuID09PSAnZnVuY3Rpb24nIHx8IHRoaXMuc2VsZWN0aW9uTWFuYWdlcikge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuc2hpZnREb3duSGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLnNoaWZ0VXBIYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0aW9uTWFuYWdlcj8uc2VsZWN0aW9uQ2hhbmdlcyQuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXJ0ID0gdGhpcy5pdGVtc1BlclBhZ2UgKiAodGhpcy5jdXJyZW50UGFnZSAtIDEpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RW5kID0gdGhpcy5jdXJyZW50U3RhcnQgKyBjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZT8ubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyPy5zZXRDdXJyZW50SXRlbXModGhpcy5pdGVtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmlzUm93U2VsZWN0ZWRGbiA9PT0gJ2Z1bmN0aW9uJyB8fCB0aGlzLnNlbGVjdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLnNoaWZ0RG93bkhhbmRsZXIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLnNoaWZ0VXBIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm93VGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlUmVmcy5sYXN0O1xuICAgIH1cblxuICAgIHRyYWNrQnlGbihpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpIHtcbiAgICAgICAgaWYgKChpdGVtIGFzIGFueSkuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChpdGVtIGFzIGFueSkuaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvZ2dsZUFsbENsaWNrKCkge1xuICAgICAgICB0aGlzLmFsbFNlbGVjdENoYW5nZS5lbWl0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlcj8udG9nZ2xlU2VsZWN0QWxsKCk7XG4gICAgfVxuXG4gICAgb25Sb3dDbGljayhpdGVtOiBULCBldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnJvd1NlbGVjdENoYW5nZS5lbWl0KHsgZXZlbnQsIGl0ZW0gfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlcj8udG9nZ2xlU2VsZWN0aW9uKGl0ZW0sIGV2ZW50KTtcbiAgICB9XG59XG4iXX0=