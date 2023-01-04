import { Component, ContentChild, Input } from '@angular/core';
export class ActionBarLeftComponent {
    constructor() {
        this.grow = false;
    }
}
ActionBarLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ab-left',
                template: ` <ng-content></ng-content> `
            },] }
];
ActionBarLeftComponent.propDecorators = {
    grow: [{ type: Input }]
};
export class ActionBarRightComponent {
    constructor() {
        this.grow = false;
    }
}
ActionBarRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ab-right',
                template: ` <ng-content></ng-content> `
            },] }
];
ActionBarRightComponent.propDecorators = {
    grow: [{ type: Input }]
};
export class ActionBarComponent {
}
ActionBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-action-bar',
                template: "<div class=\"left-content\" [class.grow]=\"left?.grow\"><ng-content select=\"vdr-ab-left\"></ng-content></div>\n<div class=\"right-content\" [class.grow]=\"right?.grow\"><ng-content select=\"vdr-ab-right\"></ng-content></div>\n",
                styles: [":host{display:flex;justify-content:space-between;align-items:baseline;background-color:var(--color-component-bg-100);position:sticky;top:-24px;z-index:25;border-bottom:1px solid var(--color-component-border-200);flex-direction:column-reverse}:host>.grow{flex:1}:host .right-content{width:100%;display:flex;justify-content:flex-end}:host ::ng-deep vdr-ab-right>*:last-child{margin-right:0}@media screen and (min-width: 768px){:host{flex-direction:row}:host .right-content{width:initial}}\n"]
            },] }
];
ActionBarComponent.propDecorators = {
    left: [{ type: ContentChild, args: [ActionBarLeftComponent,] }],
    right: [{ type: ContentChild, args: [ActionBarRightComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBTXZFLE1BQU0sT0FBTyxzQkFBc0I7SUFKbkM7UUFLYSxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7OztZQU5BLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLDZCQUE2QjthQUMxQzs7O21CQUVJLEtBQUs7O0FBT1YsTUFBTSxPQUFPLHVCQUF1QjtJQUpwQztRQUthLFNBQUksR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7O1lBTkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsNkJBQTZCO2FBQzFDOzs7bUJBRUksS0FBSzs7QUFRVixNQUFNLE9BQU8sa0JBQWtCOzs7WUFMOUIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLCtPQUEwQzs7YUFFN0M7OzttQkFFSSxZQUFZLFNBQUMsc0JBQXNCO29CQUNuQyxZQUFZLFNBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYWItbGVmdCcsXG4gICAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBBY3Rpb25CYXJMZWZ0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBncm93ID0gZmFsc2U7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFiLXJpZ2h0JyxcbiAgICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhclJpZ2h0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBncm93ID0gZmFsc2U7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFjdGlvbi1iYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hY3Rpb24tYmFyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhckNvbXBvbmVudCB7XG4gICAgQENvbnRlbnRDaGlsZChBY3Rpb25CYXJMZWZ0Q29tcG9uZW50KSBsZWZ0OiBBY3Rpb25CYXJMZWZ0Q29tcG9uZW50O1xuICAgIEBDb250ZW50Q2hpbGQoQWN0aW9uQmFyUmlnaHRDb21wb25lbnQpIHJpZ2h0OiBBY3Rpb25CYXJSaWdodENvbXBvbmVudDtcbn1cbiJdfQ==