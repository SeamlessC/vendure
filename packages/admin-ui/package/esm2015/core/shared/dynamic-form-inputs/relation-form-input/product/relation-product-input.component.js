import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { RelationSelectorDialogComponent } from '../relation-selector-dialog/relation-selector-dialog.component';
export class RelationProductInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    ngOnInit() {
        this.product$ = this.parentFormControl.valueChanges.pipe(startWith(this.parentFormControl.value), map(product => product === null || product === void 0 ? void 0 : product.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductSimple(id)
                    .mapStream(data => data.product || undefined);
            }
            else {
                return of(undefined);
            }
        }));
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.product
                .getProducts(Object.assign(Object.assign({}, (term
                ? {
                    filter: {
                        name: {
                            contains: term,
                        },
                    },
                }
                : {})), { take: 10 }))
                .mapSingle(data => data.products.items);
        }));
    }
    selectProduct() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: _('catalog.select-product'),
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
RelationProductInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-product-input',
                template: "<vdr-relation-card\n    (select)=\"selectProduct()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"product$ | async\"\n    [selectLabel]=\"'catalog.select-product' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-product=\"entity\">\n        <img *ngIf=\"product.featuredAsset\" [src]=\"product.featuredAsset | assetPreview: 'tiny'\" />\n        <div class=\"placeholder\" *ngIf=\"!product.featuredAsset\">\n            <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-product=\"entity\">\n        <a [routerLink]=\"['/catalog/products', product.id]\">{{ product.name }}</a>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img [src]=\"item.featuredAsset | assetPreview: 32\" />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{color:var(--color-grey-300)}\n"]
            },] }
];
RelationProductInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationProductInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tcHJvZHVjdC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL3JlbGF0aW9uLWZvcm0taW5wdXQvcHJvZHVjdC9yZWxhdGlvbi1wcm9kdWN0LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8vRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBUWpILE1BQU0sT0FBTyw2QkFBNkI7SUFZdEMsWUFBb0IsWUFBMEIsRUFBVSxXQUF3QjtRQUE1RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTGhGLGtCQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBSStDLENBQUM7SUFFcEYsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3BELFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxFQUFFLENBQUMsRUFDM0Isb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQzFCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztxQkFDcEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2lCQUMxQixXQUFXLGlDQUNMLENBQUMsSUFBSTtnQkFDSixDQUFDLENBQUM7b0JBQ0ksTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRTs0QkFDRixRQUFRLEVBQUUsSUFBSTt5QkFDakI7cUJBQ0o7aUJBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUNULElBQUksRUFBRSxFQUFFLElBQ1Y7aUJBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsWUFBWTthQUNaLGFBQWEsQ0FBQywrQkFBK0IsRUFBRTtZQUM1QyxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxDQUFDLENBQUMsd0JBQXdCLENBQUM7Z0JBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ2xDO1NBQ0osQ0FBQzthQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQixJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBOUVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0Qyw2cUNBQXNEO2dCQUV0RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVJRLFlBQVk7WUFEWixXQUFXOzs7dUJBV2YsS0FBSztnQ0FDTCxLQUFLO3FCQUNMLEtBQUs7dUJBRUwsU0FBUyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEdldFByb2R1Y3RMaXN0LFxuICAgIEdldFByb2R1Y3RTaW1wbGUsXG4gICAgUmVsYXRpb25DdXN0b21GaWVsZENvbmZpZyxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBSZWxhdGlvblNlbGVjdG9yRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVsYXRpb24tc2VsZWN0b3ItZGlhbG9nL3JlbGF0aW9uLXNlbGVjdG9yLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1yZWxhdGlvbi1wcm9kdWN0LWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVsYXRpb24tcHJvZHVjdC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVsYXRpb24tcHJvZHVjdC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxhdGlvblByb2R1Y3RJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcGFyZW50Rm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIEBJbnB1dCgpIGNvbmZpZzogUmVsYXRpb25DdXN0b21GaWVsZENvbmZpZztcblxuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdG9yJykgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBzZWFyY2hDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICBzZWFyY2hUZXJtJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICByZXN1bHRzJDogT2JzZXJ2YWJsZTxHZXRQcm9kdWN0TGlzdC5JdGVtc1tdPjtcbiAgICBwcm9kdWN0JDogT2JzZXJ2YWJsZTxHZXRQcm9kdWN0U2ltcGxlLlByb2R1Y3QgfCB1bmRlZmluZWQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0JCA9IHRoaXMucGFyZW50Rm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5wYXJlbnRGb3JtQ29udHJvbC52YWx1ZSksXG4gICAgICAgICAgICBtYXAocHJvZHVjdCA9PiBwcm9kdWN0Py5pZCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFByb2R1Y3RTaW1wbGUoaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5wcm9kdWN0IHx8IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yZXN1bHRzJCA9IHRoaXMuc2VhcmNoVGVybSQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmdldFByb2R1Y3RzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih0ZXJtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zOiB0ZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcFNpbmdsZShkYXRhID0+IGRhdGEucHJvZHVjdHMuaXRlbXMpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJvZHVjdCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFJlbGF0aW9uU2VsZWN0b3JEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5zZWxlY3QtcHJvZHVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclRlbXBsYXRlOiB0aGlzLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5zZXRWYWx1ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnBhcmVudEZvcm1Db250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgICAgICB0aGlzLnBhcmVudEZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxufVxuIl19