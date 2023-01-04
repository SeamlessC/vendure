import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DataService, } from '@vendure/admin-ui/core';
import { unique } from '@vendure/common/lib/unique';
import { GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS, GET_VARIANTS_WITH_FACET_VALUES_BY_IDS, UPDATE_PRODUCTS_BULK, UPDATE_VARIANTS_BULK, } from './bulk-add-facet-values-dialog.graphql';
export class BulkAddFacetValuesDialogComponent {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        /* provided by call to ModalService */
        this.mode = 'product';
        this.facets = [];
        this.state = 'loading';
        this.selectedValues = [];
        this.items = [];
        this.facetValuesRemoved = false;
    }
    ngOnInit() {
        var _a, _b;
        const fetchData$ = this.mode === 'product'
            ? this.dataService
                .query(GET_PRODUCTS_WITH_FACET_VALUES_BY_IDS, {
                ids: (_a = this.ids) !== null && _a !== void 0 ? _a : [],
            })
                .mapSingle(({ products }) => products.items.map(p => (Object.assign(Object.assign({}, p), { facetValues: [...p.facetValues] }))))
            : this.dataService
                .query(GET_VARIANTS_WITH_FACET_VALUES_BY_IDS, {
                ids: (_b = this.ids) !== null && _b !== void 0 ? _b : [],
            })
                .mapSingle(({ productVariants }) => productVariants.items.map(p => (Object.assign(Object.assign({}, p), { facetValues: [...p.facetValues] }))));
        this.subscription = fetchData$.subscribe({
            next: items => {
                this.items = items;
                this.state = 'ready';
                this.changeDetectorRef.markForCheck();
            },
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    cancel() {
        this.resolveWith();
    }
    removeFacetValue(item, facetValueId) {
        item.facetValues = item.facetValues.filter(fv => fv.id !== facetValueId);
        this.facetValuesRemoved = true;
    }
    addFacetValues() {
        var _a, _b;
        const selectedFacetValueIds = this.selectedValues.map(sv => sv.id);
        this.state = 'saving';
        const save$ = this.mode === 'product'
            ? this.dataService.mutate(UPDATE_PRODUCTS_BULK, {
                input: (_a = this.items) === null || _a === void 0 ? void 0 : _a.map(product => ({
                    id: product.id,
                    facetValueIds: unique([
                        ...product.facetValues.map(fv => fv.id),
                        ...selectedFacetValueIds,
                    ]),
                })),
            })
            : this.dataService.mutate(UPDATE_VARIANTS_BULK, {
                input: (_b = this.items) === null || _b === void 0 ? void 0 : _b.map(product => ({
                    id: product.id,
                    facetValueIds: unique([
                        ...product.facetValues.map(fv => fv.id),
                        ...selectedFacetValueIds,
                    ]),
                })),
            });
        return save$.subscribe(result => {
            this.resolveWith(this.selectedValues);
        });
    }
}
BulkAddFacetValuesDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-bulk-add-facet-values-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'catalog.edit-facet-values' | translate }}\n</ng-template>\n\n<div class=\"flex\">\n    <div class=\"flex center\">\n        <div class=\"mr2\">\n            {{ 'catalog.add-facet-value' | translate }}\n        </div>\n        <vdr-facet-value-selector\n            [facets]=\"facets\"\n            (selectedValuesChange)=\"selectedValues = $event\"\n        ></vdr-facet-value-selector>\n    </div>\n</div>\n\n<table class=\"table\" *ngIf=\"state !== 'loading'; else placeholder\">\n    <tbody>\n        <tr *ngFor=\"let item of items\">\n            <td class=\"left align-middle\">\n                <div>{{ item.name }}</div>\n                <div *ngIf=\"item.sku\" class=\"sku\">{{ item.sku }}</div>\n            </td>\n            <td class=\"left\">\n                <vdr-facet-value-chip\n                    *ngFor=\"let facetValue of item.facetValues\"\n                    [facetValue]=\"facetValue\"\n                    (remove)=\"removeFacetValue(item, facetValue.id)\"\n                ></vdr-facet-value-chip>\n            </td>\n        </tr>\n    </tbody>\n</table>\n\n<ng-template #placeholder>\n    <div class=\"loading\">\n    <clr-spinner></clr-spinner>\n    </div>\n</ng-template>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"addFacetValues()\"\n        [disabled]=\"selectedValues.length === 0 && facetValuesRemoved === false\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".loading{min-height:25vh;display:flex;justify-content:center;align-items:center}.sku{color:var(--color-text-300)}\n"]
            },] }
];
BulkAddFacetValuesDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1hZGQtZmFjZXQtdmFsdWVzLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvYnVsay1hZGQtZmFjZXQtdmFsdWVzLWRpYWxvZy9idWxrLWFkZC1mYWNldC12YWx1ZXMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQ0gsV0FBVyxHQVVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXBELE9BQU8sRUFDSCxxQ0FBcUMsRUFDckMscUNBQXFDLEVBQ3JDLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDdkIsTUFBTSx3Q0FBd0MsQ0FBQztBQXdCaEQsTUFBTSxPQUFPLGlDQUFpQztJQWMxQyxZQUFvQixXQUF3QixFQUFVLGlCQUFvQztRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFWMUYsc0NBQXNDO1FBQ3RDLFNBQUksR0FBMEIsU0FBUyxDQUFDO1FBRXhDLFdBQU0sR0FBOEIsRUFBRSxDQUFDO1FBQ3ZDLFVBQUssR0FBbUMsU0FBUyxDQUFDO1FBRWxELG1CQUFjLEdBQThCLEVBQUUsQ0FBQztRQUMvQyxVQUFLLEdBQXVCLEVBQUUsQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7SUFFa0UsQ0FBQztJQUU5RixRQUFROztRQUNKLE1BQU0sVUFBVSxHQUNaLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVc7aUJBQ1gsS0FBSyxDQUdKLHFDQUFxQyxFQUFFO2dCQUNyQyxHQUFHLEVB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QVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN2QyxHQUFHLHFCQUFxQjtxQkFDM0IsQ0FBQztpQkFDTCxDQUFDLENBQUM7YUFDTixDQUNKLENBQUM7UUFDWixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFuR0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLHVvREFBNEQ7Z0JBRTVELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBM0NHLFdBQVc7WUFGbUIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGFTZXJ2aWNlLFxuICAgIERpYWxvZyxcbiAgICBGYWNldFdpdGhWYWx1ZXNGcmFnbWVudCxcbiAgICBHZXRQcm9kdWN0c1dpdGhGYWNldFZhbHVlc0J5SWRzUXVlcnksXG4gICAgR2V0UHJvZHVjdHNXaXRoRmFjZXRWYWx1ZXNCeUlkc1F1ZXJ5VmFyaWFibGVzLFxuICAgIEdldFZhcmlhbnRzV2l0aEZhY2V0VmFsdWVzQnlJZHNRdWVyeSxcbiAgICBVcGRhdGVQcm9kdWN0c0J1bGtNdXRhdGlvbixcbiAgICBVcGRhdGVQcm9kdWN0c0J1bGtNdXRhdGlvblZhcmlhYmxlcyxcbiAgICBVcGRhdGVWYXJpYW50c0J1bGtNdXRhdGlvbixcbiAgICBVcGRhdGVWYXJpYW50c0J1bGtNdXRhdGlvblZhcmlhYmxlcyxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyB1bmlxdWUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3VuaXF1ZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgR0VUX1BST0RVQ1RTX1dJVEhfRkFDRVRfVkFMVUVTX0JZX0lEUyxcbiAgICBHRVRfVkFSSUFOVFNfV0lUSF9GQUNFVF9WQUxVRVNfQllfSURTLFxuICAgIFVQREFURV9QUk9EVUNUU19CVUxLLFxuICAgIFVQREFURV9WQVJJQU5UU19CVUxLLFxufSBmcm9tICcuL2J1bGstYWRkLWZhY2V0LXZhbHVlcy1kaWFsb2cuZ3JhcGhxbCc7XG5cbmludGVyZmFjZSBQcm9kdWN0T3JWYXJpYW50IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBza3U/OiBzdHJpbmc7XG4gICAgZmFjZXRWYWx1ZXM6IEFycmF5PHtcbiAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBjb2RlOiBzdHJpbmc7XG4gICAgICAgIGZhY2V0OiBBcnJheTx7XG4gICAgICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgY29kZTogc3RyaW5nO1xuICAgICAgICB9PjtcbiAgICB9Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYnVsay1hZGQtZmFjZXQtdmFsdWVzLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1bGstYWRkLWZhY2V0LXZhbHVlcy1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2J1bGstYWRkLWZhY2V0LXZhbHVlcy1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQnVsa0FkZEZhY2V0VmFsdWVzRGlhbG9nQ29tcG9uZW50XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRGlhbG9nPEZhY2V0V2l0aFZhbHVlc0ZyYWdtZW50W10+XG57XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBGYWNldFdpdGhWYWx1ZXNGcmFnbWVudFtdKSA9PiB2b2lkO1xuICAgIC8qIHByb3ZpZGVkIGJ5IGNhbGwgdG8gTW9kYWxTZXJ2aWNlICovXG4gICAgbW9kZTogJ3Byb2R1Y3QnIHwgJ3ZhcmlhbnQnID0gJ3Byb2R1Y3QnO1xuICAgIGlkcz86IHN0cmluZ1tdO1xuICAgIGZhY2V0czogRmFjZXRXaXRoVmFsdWVzRnJhZ21lbnRbXSA9IFtdO1xuICAgIHN0YXRlOiAnbG9hZGluZycgfCAncmVhZHknIHwgJ3NhdmluZycgPSAnbG9hZGluZyc7XG5cbiAgICBzZWxlY3RlZFZhbHVlczogRmFjZXRXaXRoVmFsdWVzRnJhZ21lbnRbXSA9IFtdO1xuICAgIGl0ZW1zOiBQcm9kdWN0T3JWYXJpYW50W10gPSBbXTtcbiAgICBmYWNldFZhbHVlc1JlbW92ZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmZXRjaERhdGEkOiBPYnNlcnZhYmxlPGFueT4gPVxuICAgICAgICAgICAgdGhpcy5tb2RlID09PSAncHJvZHVjdCdcbiAgICAgICAgICAgICAgICA/IHRoaXMuZGF0YVNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAucXVlcnk8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEdldFByb2R1Y3RzV2l0aEZhY2V0VmFsdWVzQnlJZHNRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0UHJvZHVjdHNXaXRoRmFjZXRWYWx1ZXNCeUlkc1F1ZXJ5VmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgICAgPihHRVRfUFJPRFVDVFNfV0lUSF9GQUNFVF9WQUxVRVNfQllfSURTLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkczogdGhpcy5pZHMgPz8gW10sXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAubWFwU2luZ2xlKCh7IHByb2R1Y3RzIH0pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzLml0ZW1zLm1hcChwID0+ICh7IC4uLnAsIGZhY2V0VmFsdWVzOiBbLi4ucC5mYWNldFZhbHVlc10gfSkpLFxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHRoaXMuZGF0YVNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAucXVlcnk8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEdldFZhcmlhbnRzV2l0aEZhY2V0VmFsdWVzQnlJZHNRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0UHJvZHVjdHNXaXRoRmFjZXRWYWx1ZXNCeUlkc1F1ZXJ5VmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgICAgPihHRVRfVkFSSUFOVFNfV0lUSF9GQUNFVF9WQUxVRVNfQllfSURTLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkczogdGhpcy5pZHMgPz8gW10sXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAubWFwU2luZ2xlKCh7IHByb2R1Y3RWYXJpYW50cyB9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudHMuaXRlbXMubWFwKHAgPT4gKHsgLi4ucCwgZmFjZXRWYWx1ZXM6IFsuLi5wLmZhY2V0VmFsdWVzXSB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBmZXRjaERhdGEkLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiBpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAncmVhZHknO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmFjZXRWYWx1ZShpdGVtOiBQcm9kdWN0T3JWYXJpYW50LCBmYWNldFZhbHVlSWQ6IHN0cmluZykge1xuICAgICAgICBpdGVtLmZhY2V0VmFsdWVzID0gaXRlbS5mYWNldFZhbHVlcy5maWx0ZXIoZnYgPT4gZnYuaWQgIT09IGZhY2V0VmFsdWVJZCk7XG4gICAgICAgIHRoaXMuZmFjZXRWYWx1ZXNSZW1vdmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRGYWNldFZhbHVlcygpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRGYWNldFZhbHVlSWRzID0gdGhpcy5zZWxlY3RlZFZhbHVlcy5tYXAoc3YgPT4gc3YuaWQpO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3NhdmluZyc7XG4gICAgICAgIGNvbnN0IHNhdmUkOiBPYnNlcnZhYmxlPGFueT4gPVxuICAgICAgICAgICAgdGhpcy5tb2RlID09PSAncHJvZHVjdCdcbiAgICAgICAgICAgICAgICA/IHRoaXMuZGF0YVNlcnZpY2UubXV0YXRlPFVwZGF0ZVByb2R1Y3RzQnVsa011dGF0aW9uLCBVcGRhdGVQcm9kdWN0c0J1bGtNdXRhdGlvblZhcmlhYmxlcz4oXG4gICAgICAgICAgICAgICAgICAgICAgVVBEQVRFX1BST0RVQ1RTX0JVTEssXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5pdGVtcz8ubWFwKHByb2R1Y3QgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9kdWN0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXRWYWx1ZUlkczogdW5pcXVlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9kdWN0LmZhY2V0VmFsdWVzLm1hcChmdiA9PiBmdi5pZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc2VsZWN0ZWRGYWNldFZhbHVlSWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogdGhpcy5kYXRhU2VydmljZS5tdXRhdGU8VXBkYXRlVmFyaWFudHNCdWxrTXV0YXRpb24sIFVwZGF0ZVZhcmlhbnRzQnVsa011dGF0aW9uVmFyaWFibGVzPihcbiAgICAgICAgICAgICAgICAgICAgICBVUERBVEVfVkFSSUFOVFNfQlVMSyxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLml0ZW1zPy5tYXAocHJvZHVjdCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHByb2R1Y3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNldFZhbHVlSWRzOiB1bmlxdWUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb2R1Y3QuZmFjZXRWYWx1ZXMubWFwKGZ2ID0+IGZ2LmlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zZWxlY3RlZEZhY2V0VmFsdWVJZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gc2F2ZSQuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuc2VsZWN0ZWRWYWx1ZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=