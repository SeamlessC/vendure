import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, } from '@angular/core';
import { FacetValueSelectorComponent } from '@vendure/admin-ui/core';
export class ApplyFacetDialogComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.selectedValues = [];
    }
    ngAfterViewInit() {
        setTimeout(() => this.selector.focus(), 0);
    }
    selectValues() {
        this.resolveWith(this.selectedValues);
    }
    cancel() {
        this.resolveWith();
    }
}
ApplyFacetDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-apply-facet-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'catalog.add-facets' | translate }}</ng-template>\n\n<vdr-facet-value-selector\n    [facets]=\"facets\"\n    (selectedValuesChange)=\"selectedValues = $event\"\n></vdr-facet-value-selector>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"selectValues()\"\n        [disabled]=\"selectedValues.length === 0\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.add-facets' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ApplyFacetDialogComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
ApplyFacetDialogComponent.propDecorators = {
    selector: [{ type: ViewChild, args: [FacetValueSelectorComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktZmFjZXQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hcHBseS1mYWNldC1kaWFsb2cvYXBwbHktZmFjZXQtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBc0IsMkJBQTJCLEVBQW1CLE1BQU0sd0JBQXdCLENBQUM7QUFRMUcsTUFBTSxPQUFPLHlCQUF5QjtJQU9sQyxZQUFvQixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFKckQsbUJBQWMsR0FBaUIsRUFBRSxDQUFDO0lBSXNCLENBQUM7SUFFekQsZUFBZTtRQUNYLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7O1lBekJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyw4bUJBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVhHLGlCQUFpQjs7O3VCQWFoQixTQUFTLFNBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGlhbG9nLCBGYWNldFZhbHVlLCBGYWNldFZhbHVlU2VsZWN0b3JDb21wb25lbnQsIEZhY2V0V2l0aFZhbHVlcyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hcHBseS1mYWNldC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHBseS1mYWNldC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FwcGx5LWZhY2V0LWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBseUZhY2V0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgRGlhbG9nPEZhY2V0VmFsdWVbXT4sIEFmdGVyVmlld0luaXQge1xuICAgIEBWaWV3Q2hpbGQoRmFjZXRWYWx1ZVNlbGVjdG9yQ29tcG9uZW50KSBwcml2YXRlIHNlbGVjdG9yOiBGYWNldFZhbHVlU2VsZWN0b3JDb21wb25lbnQ7XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBGYWNldFZhbHVlW10pID0+IHZvaWQ7XG4gICAgc2VsZWN0ZWRWYWx1ZXM6IEZhY2V0VmFsdWVbXSA9IFtdO1xuICAgIC8vIFByb3ZpZGVkIGJ5IGNhbGxlclxuICAgIGZhY2V0czogRmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbGVjdG9yLmZvY3VzKCksIDApO1xuICAgIH1cblxuICAgIHNlbGVjdFZhbHVlcygpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGVkVmFsdWVzKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoKTtcbiAgICB9XG59XG4iXX0=