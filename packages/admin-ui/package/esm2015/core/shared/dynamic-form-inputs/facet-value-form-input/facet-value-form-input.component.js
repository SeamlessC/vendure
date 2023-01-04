import { ChangeDetectionStrategy, Component } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * Allows the selection of multiple FacetValues via an autocomplete select input.
 * Should be used with `ID` type **list** fields which represent FacetValue IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
export class FacetValueFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isListInput = true;
        this.valueTransformFn = (values) => {
            const isUsedInConfigArg = this.config.__typename === 'ConfigArgDefinition';
            if (isUsedInConfigArg) {
                return JSON.stringify(values.map(s => s.id));
            }
            else {
                return values;
            }
        };
    }
    ngOnInit() {
        this.facets$ = this.dataService.facet
            .getAllFacets()
            .mapSingle(data => data.facets.items)
            .pipe(shareReplay(1));
    }
}
FacetValueFormInputComponent.id = 'facet-value-form-input';
FacetValueFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-form-input',
                template: "<vdr-facet-value-selector\n    *ngIf=\"facets$ | async as facets\"\n    [readonly]=\"readonly\"\n    [facets]=\"facets\"\n    [formControl]=\"formControl\"\n    [transformControlValueAccessorValue]=\"valueTransformFn\"\n></vdr-facet-value-selector>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
FacetValueFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdmFsdWUtZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2ZhY2V0LXZhbHVlLWZvcm0taW5wdXQvZmFjZXQtdmFsdWUtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUduRTs7Ozs7OztHQU9HO0FBT0gsTUFBTSxPQUFPLDRCQUE0QjtJQU9yQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxuQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQWM1QixxQkFBZ0IsR0FBRyxDQUFDLE1BQStCLEVBQUUsRUFBRTtZQUNuRCxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLHFCQUFxQixDQUFDO1lBQzNFLElBQUksaUJBQWlCLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0gsT0FBTyxNQUFNLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUM7SUFoQjZDLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2FBQ2hDLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDOztBQWJlLCtCQUFFLEdBQTJCLHdCQUF3QixDQUFDOztZQVB6RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsc1FBQXNEO2dCQUV0RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQWhCUSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCwgSW5wdXRDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IEZhY2V0V2l0aFZhbHVlcyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmFjZXRWYWx1ZVNlbGV0b3JJdGVtIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9mYWNldC12YWx1ZS1zZWxlY3Rvci9mYWNldC12YWx1ZS1zZWxlY3Rvci5jb21wb25lbnQnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQWxsb3dzIHRoZSBzZWxlY3Rpb24gb2YgbXVsdGlwbGUgRmFjZXRWYWx1ZXMgdmlhIGFuIGF1dG9jb21wbGV0ZSBzZWxlY3QgaW5wdXQuXG4gKiBTaG91bGQgYmUgdXNlZCB3aXRoIGBJRGAgdHlwZSAqKmxpc3QqKiBmaWVsZHMgd2hpY2ggcmVwcmVzZW50IEZhY2V0VmFsdWUgSURzLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgY3VzdG9tLWlucHV0LWNvbXBvbmVudHNcbiAqIEBkb2NzUGFnZSBkZWZhdWx0LWlucHV0c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1mYWNldC12YWx1ZS1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtdmFsdWUtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmFjZXQtdmFsdWUtZm9ybS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldFZhbHVlRm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBPbkluaXQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdmYWNldC12YWx1ZS1mb3JtLWlucHV0JztcbiAgICByZWFkb25seSBpc0xpc3RJbnB1dCA9IHRydWU7XG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGZhY2V0cyQ6IE9ic2VydmFibGU8RmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50W10+O1xuICAgIGNvbmZpZzogSW5wdXRDb21wb25lbnRDb25maWc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mYWNldHMkID0gdGhpcy5kYXRhU2VydmljZS5mYWNldFxuICAgICAgICAgICAgLmdldEFsbEZhY2V0cygpXG4gICAgICAgICAgICAubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS5mYWNldHMuaXRlbXMpXG4gICAgICAgICAgICAucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gICAgfVxuXG4gICAgdmFsdWVUcmFuc2Zvcm1GbiA9ICh2YWx1ZXM6IEZhY2V0VmFsdWVTZWxldG9ySXRlbVtdKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzVXNlZEluQ29uZmlnQXJnID0gdGhpcy5jb25maWcuX190eXBlbmFtZSA9PT0gJ0NvbmZpZ0FyZ0RlZmluaXRpb24nO1xuICAgICAgICBpZiAoaXNVc2VkSW5Db25maWdBcmcpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZXMubWFwKHMgPT4gcy5pZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=