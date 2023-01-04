import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { RelationSelectorDialogComponent } from '../relation-selector-dialog/relation-selector-dialog.component';
export class RelationProductVariantInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    ngOnInit() {
        this.productVariant$ = this.parentFormControl.valueChanges.pipe(startWith(this.parentFormControl.value), map(variant => variant === null || variant === void 0 ? void 0 : variant.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductVariant(id)
                    .mapStream(data => data.productVariant || undefined);
            }
            else {
                return of(undefined);
            }
        }));
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.product
                .getProductVariantsSimple(Object.assign(Object.assign({}, (term
                ? {
                    filter: {
                        name: {
                            contains: term,
                        },
                    },
                }
                : {})), { take: 10 }))
                .mapSingle(data => data.productVariants.items);
        }));
    }
    selectProductVariant() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: _('catalog.select-product-variant'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue(result);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationProductVariantInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-product-variant-input',
                template: "<vdr-relation-card\n    (select)=\"selectProductVariant()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"productVariant$ | async\"\n    [selectLabel]=\"'catalog.select-product-variant' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-variant=\"entity\">\n        <img\n            *ngIf=\"variant.featuredAsset || variant.product.featuredAsset as asset; else placeholder\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n        />\n        <ng-template #placeholder>\n            <div class=\"placeholder\" *ngIf=\"!variant.featuredAsset\">\n                <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n            </div>\n        </ng-template>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-variant=\"entity\">\n        <a [routerLink]=\"['/catalog/products', variant.product.id, { tab: 'variants' }]\">{{ variant.name }}</a>\n        <div class=\"\">{{ variant.sku }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img\n                *ngIf=\"item.featuredAsset || item.product.featuredAsset as asset\"\n                [src]=\"asset | assetPreview: 32\"\n            />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{color:var(--color-grey-300)}\n"]
            },] }
];
RelationProductVariantInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationProductVariantInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tcHJvZHVjdC12YXJpYW50LWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvcmVsYXRpb24tZm9ybS1pbnB1dC9wcm9kdWN0LXZhcmlhbnQvcmVsYXRpb24tcHJvZHVjdC12YXJpYW50LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVEvRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBUWpILE1BQU0sT0FBTyxvQ0FBb0M7SUFZN0MsWUFBb0IsWUFBMEIsRUFBVSxXQUF3QjtRQUE1RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTGhGLGtCQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBSStDLENBQUM7SUFFcEYsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzNELFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxFQUFFLENBQUMsRUFDM0Isb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQzFCLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztxQkFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2lCQUMxQix3QkFBd0IsaUNBQ2xCLENBQUMsSUFBSTtnQkFDSixDQUFDLENBQUM7b0JBQ0ksTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRTs0QkFDRixRQUFRLEVBQUUsSUFBSTt5QkFDakI7cUJBQ0o7aUJBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUNULElBQUksRUFBRSxFQUFFLElBQ1Y7aUJBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELG9CQUFvQjtRQUNoQixJQUFJLENBQUMsWUFBWTthQUNaLGFBQWEsQ0FBQywrQkFBK0IsRUFBRTtZQUM1QyxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsZ0NBQWdDLENBQUM7Z0JBQzFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ2xDO1NBQ0osQ0FBQzthQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQixJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBOUVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5Qyw4Z0RBQThEO2dCQUU5RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVJRLFlBQVk7WUFEWixXQUFXOzs7dUJBV2YsS0FBSztnQ0FDTCxLQUFLO3FCQUNMLEtBQUs7dUJBRUwsU0FBUyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEdldFByb2R1Y3RWYXJpYW50LFxuICAgIEdldFByb2R1Y3RWYXJpYW50TGlzdCxcbiAgICBHZXRQcm9kdWN0VmFyaWFudExpc3RTaW1wbGUsXG4gICAgUmVsYXRpb25DdXN0b21GaWVsZENvbmZpZyxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBSZWxhdGlvblNlbGVjdG9yRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVsYXRpb24tc2VsZWN0b3ItZGlhbG9nL3JlbGF0aW9uLXNlbGVjdG9yLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1yZWxhdGlvbi1wcm9kdWN0LXZhcmlhbnQtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZWxhdGlvbi1wcm9kdWN0LXZhcmlhbnQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3JlbGF0aW9uLXByb2R1Y3QtdmFyaWFudC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxhdGlvblByb2R1Y3RWYXJpYW50SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHBhcmVudEZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBASW5wdXQoKSBjb25maWc6IFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWc7XG5cbiAgICBAVmlld0NoaWxkKCdzZWxlY3RvcicpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgc2VhcmNoQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgc2VhcmNoVGVybSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgcmVzdWx0cyQ6IE9ic2VydmFibGU8R2V0UHJvZHVjdFZhcmlhbnRMaXN0U2ltcGxlLkl0ZW1zW10+O1xuICAgIHByb2R1Y3RWYXJpYW50JDogT2JzZXJ2YWJsZTxHZXRQcm9kdWN0VmFyaWFudC5Qcm9kdWN0VmFyaWFudCB8IHVuZGVmaW5lZD47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RWYXJpYW50JCA9IHRoaXMucGFyZW50Rm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5wYXJlbnRGb3JtQ29udHJvbC52YWx1ZSksXG4gICAgICAgICAgICBtYXAodmFyaWFudCA9PiB2YXJpYW50Py5pZCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFByb2R1Y3RWYXJpYW50KGlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEucHJvZHVjdFZhcmlhbnQgfHwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJlc3VsdHMkID0gdGhpcy5zZWFyY2hUZXJtJC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdFZhcmlhbnRzU2ltcGxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih0ZXJtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiB0ZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcFNpbmdsZShkYXRhID0+IGRhdGEucHJvZHVjdFZhcmlhbnRzLml0ZW1zKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNlbGVjdFByb2R1Y3RWYXJpYW50KCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoUmVsYXRpb25TZWxlY3RvckRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjYXRhbG9nLnNlbGVjdC1wcm9kdWN0LXZhcmlhbnQnKSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JUZW1wbGF0ZTogdGhpcy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wuc2V0VmFsdWUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cbn1cbiJdfQ==