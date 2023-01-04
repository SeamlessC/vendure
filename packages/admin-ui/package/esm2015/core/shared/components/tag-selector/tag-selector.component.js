import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataService } from '../../../data/providers/data.service';
export class TagSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.allTags$ = this.dataService.product
            .getTagList()
            .mapStream(data => data.tags.items.map(i => i.value));
    }
    addTagFn(val) {
        return val;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            this._value = obj;
        }
    }
    valueChanged(event) {
        this.onChange(event);
    }
}
TagSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tag-selector',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [multiple]=\"true\"\n    [ngModel]=\"_value\"\n    [clearable]=\"true\"\n    [searchable]=\"true\"\n    [disabled]=\"disabled\"\n    [placeholder]=\"placeholder\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-tag=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"tag\" icon=\"close\" (iconClick)=\"clear(tag)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag }}</vdr-chip>\n    </ng-template>\n    <ng-option *ngFor=\"let tag of allTags$ | async\" [value]=\"tag\">\n        <vdr-chip [colorFrom]=\"tag\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag }}</vdr-chip>\n    </ng-option>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: TagSelectorComponent,
                        multi: true,
                    },
                ],
                styles: [":host{display:block;margin-top:12px;position:relative}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}\n"]
            },] }
];
TagSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
TagSelectorComponent.propDecorators = {
    placeholder: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvdGFnLXNlbGVjdG9yL3RhZy1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQWVuRSxNQUFNLE9BQU8sb0JBQW9CO0lBUTdCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87YUFDbkMsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBWTtRQUNuQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWU7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7WUFyREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDRzQkFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLG9CQUFvQjt3QkFDakMsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0o7O2FBQ0o7OztZQWRRLFdBQVc7OzswQkFnQmYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci10YWctc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWctc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RhZy1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBUYWdTZWxlY3RvckNvbXBvbmVudCxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRhZ1NlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhbGxUYWdzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gICAgb25DaGFuZ2U6ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBvblRvdWNoOiAoKSA9PiB2b2lkO1xuICAgIF92YWx1ZTogc3RyaW5nW107XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFsbFRhZ3MkID0gdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAuZ2V0VGFnTGlzdCgpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS50YWdzLml0ZW1zLm1hcChpID0+IGkudmFsdWUpKTtcbiAgICB9XG5cbiAgICBhZGRUYWdGbih2YWw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShvYmo6IHVua25vd24pOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBvYmo7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZUNoYW5nZWQoZXZlbnQ6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==