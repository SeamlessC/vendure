import { ChangeDetectionStrategy, Component } from '@angular/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { forkJoin, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Allows the selection of multiple ProductVariants via an autocomplete select input.
 * Should be used with `ID` type **list** fields which represent ProductVariant IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class ProductSelectorFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isListInput = true;
    }
    ngOnInit() {
        this.formControl.setValidators([
            control => {
                if (!control.value || !control.value.length) {
                    return {
                        atLeastOne: { length: control.value.length },
                    };
                }
                return null;
            },
        ]);
        this.selection$ = this.formControl.valueChanges.pipe(startWith(this.formControl.value), switchMap(value => {
            if (Array.isArray(value) && 0 < value.length) {
                return forkJoin(value.map(id => this.dataService.product
                    .getProductVariant(id)
                    .mapSingle(data => data.productVariant)));
            }
            return of([]);
        }), map(variants => variants.filter(notNullOrUndefined)));
    }
    addProductVariant(product) {
        const value = this.formControl.value;
        this.formControl.setValue([...new Set([...value, product.productVariantId])]);
    }
    removeProductVariant(id) {
        const value = this.formControl.value;
        this.formControl.setValue(value.filter(_id => _id !== id));
    }
}
ProductSelectorFormInputComponent.id = 'product-selector-form-input';
ProductSelectorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-selector-form-input',
                template: "<ul class=\"list-unstyled\">\n    <li *ngFor=\"let variant of selection$ | async\" class=\"variant\">\n        <div class=\"thumb\">\n            <img [src]=\"variant.product.featuredAsset | assetPreview: 32\" />\n        </div>\n        <div class=\"detail\">\n            <div>{{ variant.name }}</div>\n            <div class=\"sku\">{{ variant.sku }}</div>\n        </div>\n        <div class=\"flex-spacer\"></div>\n        <button\n            class=\"btn btn-link btn-sm btn-warning\"\n            (click)=\"removeProductVariant(variant.id)\"\n            [title]=\"'common.remove-item-from-list' | translate\"\n        >\n            <clr-icon shape=\"times\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<vdr-product-selector (productSelected)=\"addProductVariant($event)\"></vdr-product-selector>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".variant{margin-bottom:6px;display:flex;align-items:center;transition:background-color .2s}.variant:hover{background-color:var(--color-component-bg-200)}.thumb{margin-right:6px}.sku{color:var(--color-grey-400);font-size:smaller;line-height:1em}\n"]
            },] }
];
ProductSelectorFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvcHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0L3Byb2R1Y3Qtc2VsZWN0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsUUFBUSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFbkU7Ozs7Ozs7R0FPRztBQU9ILE1BQU0sT0FBTyxpQ0FBaUM7SUFRMUMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFObkMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUFNbUIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7WUFDM0IsT0FBTyxDQUFDLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDekMsT0FBTzt3QkFDSCxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7cUJBQy9DLENBQUM7aUJBQ0w7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFDakMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxPQUFPLFFBQVEsQ0FDWCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO3FCQUNuQixpQkFBaUIsQ0FBQyxFQUFFLENBQUM7cUJBQ3JCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FDOUMsQ0FDSixDQUFDO2FBQ0w7WUFDRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FDdkQsQ0FBQztJQUNOLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxPQUFvQztRQUNsRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQWlCLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELG9CQUFvQixDQUFDLEVBQVU7UUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFpQixDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOztBQS9DZSxvQ0FBRSxHQUEyQiw2QkFBNkIsQ0FBQzs7WUFQOUUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLHd6QkFBMkQ7Z0JBRTNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBZlEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQsIElucHV0Q29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQgeyBHZXRQcm9kdWN0VmFyaWFudCwgUHJvZHVjdFNlbGVjdG9yU2VhcmNoIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbGxvd3MgdGhlIHNlbGVjdGlvbiBvZiBtdWx0aXBsZSBQcm9kdWN0VmFyaWFudHMgdmlhIGFuIGF1dG9jb21wbGV0ZSBzZWxlY3QgaW5wdXQuXG4gKiBTaG91bGQgYmUgdXNlZCB3aXRoIGBJRGAgdHlwZSAqKmxpc3QqKiBmaWVsZHMgd2hpY2ggcmVwcmVzZW50IFByb2R1Y3RWYXJpYW50IElEcy5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IGN1c3RvbS1pbnB1dC1jb21wb25lbnRzXG4gKiBAZG9jc1BhZ2UgZGVmYXVsdC1pbnB1dHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LXNlbGVjdG9yLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFNlbGVjdG9yRm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBPbkluaXQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdwcm9kdWN0LXNlbGVjdG9yLWZvcm0taW5wdXQnO1xuICAgIHJlYWRvbmx5IGlzTGlzdElucHV0ID0gdHJ1ZTtcbiAgICByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBJbnB1dENvbXBvbmVudENvbmZpZztcbiAgICBzZWxlY3Rpb24kOiBPYnNlcnZhYmxlPEdldFByb2R1Y3RWYXJpYW50LlByb2R1Y3RWYXJpYW50W10+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWxpZGF0b3JzKFtcbiAgICAgICAgICAgIGNvbnRyb2wgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY29udHJvbC52YWx1ZSB8fCAhY29udHJvbC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0TGVhc3RPbmU6IHsgbGVuZ3RoOiBjb250cm9sLnZhbHVlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uJCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5mb3JtQ29udHJvbC52YWx1ZSksXG4gICAgICAgICAgICBzd2l0Y2hNYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiAwIDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm1hcChpZCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdFZhcmlhbnQoaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLnByb2R1Y3RWYXJpYW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCh2YXJpYW50cyA9PiB2YXJpYW50cy5maWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkUHJvZHVjdFZhcmlhbnQocHJvZHVjdDogUHJvZHVjdFNlbGVjdG9yU2VhcmNoLkl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSBhcyBzdHJpbmdbXTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShbLi4ubmV3IFNldChbLi4udmFsdWUsIHByb2R1Y3QucHJvZHVjdFZhcmlhbnRJZF0pXSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUHJvZHVjdFZhcmlhbnQoaWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgYXMgc3RyaW5nW107XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUuZmlsdGVyKF9pZCA9PiBfaWQgIT09IGlkKSk7XG4gICAgfVxufVxuIl19