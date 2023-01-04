import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Allows the selection of a Customer via an autocomplete select input.
 * Should be used with `ID` type fields which represent Customer IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class CustomerGroupFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.customerGroups$ = this.dataService.customer
            .getCustomerGroupList({
            take: 1000,
        })
            .mapSingle(res => res.customerGroups.items)
            .pipe(startWith([]));
    }
    selectGroup(group) {
        this.formControl.setValue(group.id);
    }
}
CustomerGroupFormInputComponent.id = 'customer-group-form-input';
CustomerGroupFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-form-input',
                template: "<ng-select\n    [items]=\"customerGroups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    bindValue=\"id\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n    [ngModel]=\"formControl.value\"\n    (change)=\"selectGroup($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
CustomerGroupFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2N1c3RvbWVyLWdyb3VwLWZvcm0taW5wdXQvY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFJbEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVuRTs7Ozs7OztHQU9HO0FBT0gsTUFBTSxPQUFPLCtCQUErQjtJQU94QyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2FBQzNDLG9CQUFvQixDQUFDO1lBQ2xCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQzthQUNELFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO2FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQThCO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOztBQW5CZSxrQ0FBRSxHQUEyQiwyQkFBMkIsQ0FBQzs7WUFQNUUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLCtsQkFBeUQ7Z0JBRXpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBZlEsV0FBVzs7O3VCQWtCZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQgeyBHZXRDdXN0b21lckdyb3VwcyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQWxsb3dzIHRoZSBzZWxlY3Rpb24gb2YgYSBDdXN0b21lciB2aWEgYW4gYXV0b2NvbXBsZXRlIHNlbGVjdCBpbnB1dC5cbiAqIFNob3VsZCBiZSB1c2VkIHdpdGggYElEYCB0eXBlIGZpZWxkcyB3aGljaCByZXByZXNlbnQgQ3VzdG9tZXIgSURzLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY3VzdG9tLWlucHV0LWNvbXBvbmVudHNcbiAqIEBkb2NzUGFnZSBkZWZhdWx0LWlucHV0c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jdXN0b21lci1ncm91cC1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lckdyb3VwRm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBPbkluaXQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdjdXN0b21lci1ncm91cC1mb3JtLWlucHV0JztcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY3VzdG9tZXJHcm91cHMkOiBPYnNlcnZhYmxlPEdldEN1c3RvbWVyR3JvdXBzLkl0ZW1zW10+O1xuICAgIGNvbmZpZzogRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWc8J2N1c3RvbWVyLWdyb3VwLWZvcm0taW5wdXQnPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJHcm91cHMkID0gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lclxuICAgICAgICAgICAgLmdldEN1c3RvbWVyR3JvdXBMaXN0KHtcbiAgICAgICAgICAgICAgICB0YWtlOiAxMDAwLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXBTaW5nbGUocmVzID0+IHJlcy5jdXN0b21lckdyb3Vwcy5pdGVtcylcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChbXSkpO1xuICAgIH1cblxuICAgIHNlbGVjdEdyb3VwKGdyb3VwOiBHZXRDdXN0b21lckdyb3Vwcy5JdGVtcykge1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKGdyb3VwLmlkKTtcbiAgICB9XG59XG4iXX0=