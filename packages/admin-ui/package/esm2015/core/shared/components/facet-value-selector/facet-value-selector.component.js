import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { flattenFacetValues } from '../../../common/utilities/flatten-facet-values';
import { DataService } from '../../../data/providers/data.service';
/**
 * @description
 * A form control for selecting facet values.
 *
 * @example
 * ```HTML
 * <vdr-facet-value-selector
 *   [facets]="facets"
 *   (selectedValuesChange)="selectedValues = $event"
 * ></vdr-facet-value-selector>
 * ```
 * The `facets` input should be provided from the parent component
 * like this:
 *
 * @example
 * ```TypeScript
 * this.facets = this.dataService
 *   .facet.getAllFacets()
 *   .mapSingle(data => data.facets.items);
 * ```
 * @docsCategory components
 */
export class FacetValueSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedValuesChange = new EventEmitter();
        this.readonly = false;
        this.transformControlValueAccessorValue = value => value;
        this.facetValues = [];
        this.disabled = false;
        this.toSelectorItem = (facetValue) => {
            return {
                name: facetValue.name,
                facetName: facetValue.facet.name,
                id: facetValue.id,
                value: facetValue,
            };
        };
    }
    ngOnInit() {
        this.facetValues = flattenFacetValues(this.facets).map(this.toSelectorItem);
    }
    onChange(selected) {
        if (this.readonly) {
            return;
        }
        this.selectedValuesChange.emit(selected.map(s => s.value));
        if (this.onChangeFn) {
            const transformedValue = this.transformControlValueAccessorValue(selected);
            this.onChangeFn(transformedValue);
        }
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    focus() {
        this.ngSelect.focus();
    }
    writeValue(obj) {
        if (typeof obj === 'string') {
            try {
                const facetIds = JSON.parse(obj);
                this.value = facetIds;
            }
            catch (err) {
                // TODO: log error
                throw err;
            }
        }
        else if (Array.isArray(obj)) {
            const isIdArray = (input) => input.every(i => typeof i === 'number' || typeof i === 'string');
            if (isIdArray(obj)) {
                this.value = obj.map(fv => fv.toString());
            }
            else {
                this.value = obj.map(fv => fv.id);
            }
        }
    }
}
FacetValueSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-selector',
                template: "<ng-select\n    [items]=\"facetValues\"\n    [addTag]=\"false\"\n    [hideSelected]=\"true\"\n    bindValue=\"id\"\n    multiple=\"true\"\n    appendTo=\"body\"\n    bindLabel=\"name\"\n    [disabled]=\"disabled || readonly\"\n    [ngModel]=\"value\"\n    (change)=\"onChange($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-facet-value-chip\n            *ngIf=\"item.value; else facetNotFound\"\n            [facetValue]=\"item.value\"\n            [removable]=\"!readonly\"\n            (remove)=\"clear(item)\"\n        ></vdr-facet-value-chip>\n        <ng-template #facetNotFound>\n            <vdr-chip colorType=\"error\" icon=\"times\" (iconClick)=\"clear(item)\">{{\n                'catalog.facet-value-not-available' | translate: { id: item.id }\n            }}</vdr-chip>\n        </ng-template>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-facet-value-chip [facetValue]=\"item.value\" [removable]=\"false\"></vdr-facet-value-chip>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: FacetValueSelectorComponent,
                        multi: true,
                    },
                ],
                styles: [":host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}\n"]
            },] }
];
FacetValueSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
FacetValueSelectorComponent.propDecorators = {
    selectedValuesChange: [{ type: Output }],
    facets: [{ type: Input }],
    readonly: [{ type: Input }],
    transformControlValueAccessorValue: [{ type: Input }],
    ngSelect: [{ type: ViewChild, args: [NgSelectComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdmFsdWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9mYWNldC12YWx1ZS1zZWxlY3Rvci9mYWNldC12YWx1ZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFTbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQWNILE1BQU0sT0FBTywyQkFBMkI7SUFhcEMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFabEMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFFbEUsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQix1Q0FBa0MsR0FBOEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFJeEcsZ0JBQVcsR0FBNEIsRUFBRSxDQUFDO1FBRzFDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUF1RFQsbUJBQWMsR0FBRyxDQUFDLFVBQStCLEVBQXlCLEVBQUU7WUFDaEYsT0FBTztnQkFDSCxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7Z0JBQ3JCLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQ2hDLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTtnQkFDakIsS0FBSyxFQUFFLFVBQVU7YUFDcEIsQ0FBQztRQUNOLENBQUMsQ0FBQztJQTVENkMsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsUUFBUSxDQUFDLFFBQWlDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBbUU7UUFDMUUsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSTtnQkFDQSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBYSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQzthQUN6QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLGtCQUFrQjtnQkFDbEIsTUFBTSxHQUFHLENBQUM7YUFDYjtTQUNKO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBZ0IsRUFBbUMsRUFBRSxDQUNwRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ3JFLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckM7U0FDSjtJQUNMLENBQUM7OztZQTdFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsdWpDQUFvRDtnQkFFcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsMkJBQTJCO3dCQUN4QyxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjs7YUFDSjs7O1lBM0NRLFdBQVc7OzttQ0E2Q2YsTUFBTTtxQkFDTixLQUFLO3VCQUNMLEtBQUs7aURBQ0wsS0FBSzt1QkFFTCxTQUFTLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuXG5pbXBvcnQgeyBGYWNldFZhbHVlLCBGYWNldFdpdGhWYWx1ZXMgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IGZsYXR0ZW5GYWNldFZhbHVlcyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvZmxhdHRlbi1mYWNldC12YWx1ZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBGYWNldFZhbHVlU2VsZXRvckl0ZW0gPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGZhY2V0TmFtZTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdmFsdWU6IEZhY2V0VmFsdWUuRnJhZ21lbnQ7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBmb3JtIGNvbnRyb2wgZm9yIHNlbGVjdGluZyBmYWNldCB2YWx1ZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYEhUTUxcbiAqIDx2ZHItZmFjZXQtdmFsdWUtc2VsZWN0b3JcbiAqICAgW2ZhY2V0c109XCJmYWNldHNcIlxuICogICAoc2VsZWN0ZWRWYWx1ZXNDaGFuZ2UpPVwic2VsZWN0ZWRWYWx1ZXMgPSAkZXZlbnRcIlxuICogPjwvdmRyLWZhY2V0LXZhbHVlLXNlbGVjdG9yPlxuICogYGBgXG4gKiBUaGUgYGZhY2V0c2AgaW5wdXQgc2hvdWxkIGJlIHByb3ZpZGVkIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcbiAqIGxpa2UgdGhpczpcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgVHlwZVNjcmlwdFxuICogdGhpcy5mYWNldHMgPSB0aGlzLmRhdGFTZXJ2aWNlXG4gKiAgIC5mYWNldC5nZXRBbGxGYWNldHMoKVxuICogICAubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS5mYWNldHMuaXRlbXMpO1xuICogYGBgXG4gKiBAZG9jc0NhdGVnb3J5IGNvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZmFjZXQtdmFsdWUtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNldC12YWx1ZS1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmFjZXQtdmFsdWUtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogRmFjZXRWYWx1ZVNlbGVjdG9yQ29tcG9uZW50LFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRWYWx1ZVNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldFZhbHVlLkZyYWdtZW50W10+KCk7XG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldFdpdGhWYWx1ZXMuRnJhZ21lbnRbXTtcbiAgICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHRyYW5zZm9ybUNvbnRyb2xWYWx1ZUFjY2Vzc29yVmFsdWU6ICh2YWx1ZTogRmFjZXRWYWx1ZVNlbGV0b3JJdGVtW10pID0+IGFueVtdID0gdmFsdWUgPT4gdmFsdWU7XG5cbiAgICBAVmlld0NoaWxkKE5nU2VsZWN0Q29tcG9uZW50KSBwcml2YXRlIG5nU2VsZWN0OiBOZ1NlbGVjdENvbXBvbmVudDtcblxuICAgIGZhY2V0VmFsdWVzOiBGYWNldFZhbHVlU2VsZXRvckl0ZW1bXSA9IFtdO1xuICAgIG9uQ2hhbmdlRm46ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBvblRvdWNoRm46ICgpID0+IHZvaWQ7XG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB2YWx1ZTogQXJyYXk8c3RyaW5nIHwgRmFjZXRWYWx1ZS5GcmFnbWVudD47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mYWNldFZhbHVlcyA9IGZsYXR0ZW5GYWNldFZhbHVlcyh0aGlzLmZhY2V0cykubWFwKHRoaXMudG9TZWxlY3Rvckl0ZW0pO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkOiBGYWNldFZhbHVlU2VsZXRvckl0ZW1bXSkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZXNDaGFuZ2UuZW1pdChzZWxlY3RlZC5tYXAocyA9PiBzLnZhbHVlKSk7XG4gICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlRm4pIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkVmFsdWUgPSB0aGlzLnRyYW5zZm9ybUNvbnRyb2xWYWx1ZUFjY2Vzc29yVmFsdWUoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUZuKHRyYW5zZm9ybWVkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VGbiA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoRm4gPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMubmdTZWxlY3QuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogc3RyaW5nIHwgRmFjZXRWYWx1ZS5GcmFnbWVudFtdIHwgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2V0SWRzID0gSlNPTi5wYXJzZShvYmopIGFzIHN0cmluZ1tdO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBmYWNldElkcztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGxvZyBlcnJvclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzSWRBcnJheSA9IChpbnB1dDogdW5rbm93bltdKTogaW5wdXQgaXMgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9PlxuICAgICAgICAgICAgICAgIGlucHV0LmV2ZXJ5KGkgPT4gdHlwZW9mIGkgPT09ICdudW1iZXInIHx8IHR5cGVvZiBpID09PSAnc3RyaW5nJyk7XG4gICAgICAgICAgICBpZiAoaXNJZEFycmF5KG9iaikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gb2JqLm1hcChmdiA9PiBmdi50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9iai5tYXAoZnYgPT4gZnYuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b1NlbGVjdG9ySXRlbSA9IChmYWNldFZhbHVlOiBGYWNldFZhbHVlLkZyYWdtZW50KTogRmFjZXRWYWx1ZVNlbGV0b3JJdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IGZhY2V0VmFsdWUubmFtZSxcbiAgICAgICAgICAgIGZhY2V0TmFtZTogZmFjZXRWYWx1ZS5mYWNldC5uYW1lLFxuICAgICAgICAgICAgaWQ6IGZhY2V0VmFsdWUuaWQsXG4gICAgICAgICAgICB2YWx1ZTogZmFjZXRWYWx1ZSxcbiAgICAgICAgfTtcbiAgICB9O1xufVxuIl19