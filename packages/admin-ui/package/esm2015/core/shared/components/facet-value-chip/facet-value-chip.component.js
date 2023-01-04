import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class FacetValueChipComponent {
    constructor() {
        this.removable = true;
        this.displayFacetName = true;
        this.remove = new EventEmitter();
    }
}
FacetValueChipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-chip',
                template: "<vdr-chip\n    [icon]=\"removable ? 'times' : undefined\"\n    [colorFrom]=\"facetValue.facet.name\"\n    (iconClick)=\"remove.emit()\"\n    [title]=\"facetValue.facet.name + ' - ' + facetValue.name\"\n>\n    <span *ngIf=\"displayFacetName\" class=\"facet-name\">{{ facetValue.facet.name }}</span>\n    {{ facetValue.name }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.facet-name{color:var(--color-grey-100);text-transform:uppercase;font-size:10px;margin-right:3px;height:11px}\n"]
            },] }
];
FacetValueChipComponent.propDecorators = {
    facetValue: [{ type: Input }],
    removable: [{ type: Input }],
    displayFacetName: [{ type: Input }],
    remove: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdmFsdWUtY2hpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2ZhY2V0LXZhbHVlLWNoaXAvZmFjZXQtdmFsdWUtY2hpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVVoRyxNQUFNLE9BQU8sdUJBQXVCO0lBTnBDO1FBUWEsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDdkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFDaEQsQ0FBQzs7O1lBWEEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLCtWQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7eUJBRUksS0FBSzt3QkFDTCxLQUFLOytCQUNMLEtBQUs7cUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGYWNldFZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWZhY2V0LXZhbHVlLWNoaXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNldC12YWx1ZS1jaGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNldC12YWx1ZS1jaGlwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VmFsdWVDaGlwQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBmYWNldFZhbHVlOiBGYWNldFZhbHVlLkZyYWdtZW50O1xuICAgIEBJbnB1dCgpIHJlbW92YWJsZSA9IHRydWU7XG4gICAgQElucHV0KCkgZGlzcGxheUZhY2V0TmFtZSA9IHRydWU7XG4gICAgQE91dHB1dCgpIHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn1cbiJdfQ==