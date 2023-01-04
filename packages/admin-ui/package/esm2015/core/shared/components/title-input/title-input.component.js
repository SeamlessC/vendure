import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
export class TitleInputComponent {
    constructor() {
        this.readonly = false;
    }
}
TitleInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-title-input',
                template: "<ng-content></ng-content>\n<div class=\"edit-icon\" *ngIf=\"!readonly\">\n    <clr-icon shape=\"edit\"></clr-icon>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:relative}:host ::ng-deep input{font-size:18px;color:var(--clr-p1-color);max-width:100%}:host ::ng-deep input:not(:focus){border-color:transparent!important;background-color:var(--color-component-bg-100)!important}:host ::ng-deep input:focus{background-color:var(--clr-global-app-background)}:host ::ng-deep .clr-control-container{max-width:100%}:host ::ng-deep .clr-input-wrapper{max-width:100%!important}:host .edit-icon{position:absolute;right:8px;top:6px;color:var(--color-grey-400);opacity:0;transition:opacity .2s}:host:hover ::ng-deep input:not(:focus){background-color:var(--color-component-bg-200)!important}:host:hover .edit-icon{opacity:1}:host.readonly .edit-icon{display:none}:host.readonly:hover ::ng-deep input:not(:focus){background-color:var(--color-grey-200)!important}\n"]
            },] }
];
TitleInputComponent.propDecorators = {
    readonly: [{ type: HostBinding, args: ['class.readonly',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy90aXRsZS1pbnB1dC90aXRsZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUXZGLE1BQU0sT0FBTyxtQkFBbUI7SUFOaEM7UUFTSSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7OztZQVZBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix3SUFBMkM7Z0JBRTNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUVJLFdBQVcsU0FBQyxnQkFBZ0IsY0FDNUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci10aXRsZS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpdGxlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aXRsZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUaXRsZUlucHV0Q29tcG9uZW50IHtcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJlYWRvbmx5JylcbiAgICBASW5wdXQoKVxuICAgIHJlYWRvbmx5ID0gZmFsc2U7XG59XG4iXX0=