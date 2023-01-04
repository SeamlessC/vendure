import { ChangeDetectionStrategy, Component } from '@angular/core';
export class OrderStateSelectDialogComponent {
    constructor() {
        this.nextStates = [];
        this.message = '';
        this.selectedState = '';
    }
    select() {
        if (this.selectedState) {
            this.resolveWith(this.selectedState);
        }
    }
    cancel() {
        this.resolveWith();
    }
}
OrderStateSelectDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-state-select-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'order.select-state' | translate }}</ng-template>\n<p>{{ message | translate }}</p>\n<clr-select-container>\n    <select clrSelect name=\"state\" [(ngModel)]=\"selectedState\">\n        <option *ngFor=\"let state of nextStates\" [value]=\"state\">\n            {{ state | stateI18nToken | translate }}\n        </option>\n    </select>\n</clr-select-container>\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" *ngIf=\"cancellable\" (click)=\"cancel()\" class=\"btn btn-secondary\">\n        {{ 'common.cancel' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"!selectedState\">\n        {{ 'order.transition-to-state' | translate: { state: (selectedState | stateI18nToken | translate) } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc3RhdGUtc2VsZWN0LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL29yZGVyLXN0YXRlLXNlbGVjdC1kaWFsb2cvb3JkZXItc3RhdGUtc2VsZWN0LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRSxNQUFNLE9BQU8sK0JBQStCO0lBTjVDO1FBUUksZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFXdkIsQ0FBQztJQVRHLE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFyQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLDgwQkFBeUQ7Z0JBRXpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vcmRlci1zdGF0ZS1zZWxlY3QtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItc3RhdGUtc2VsZWN0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItc3RhdGUtc2VsZWN0LWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclN0YXRlU2VsZWN0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgRGlhbG9nPHN0cmluZz4ge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0Pzogc3RyaW5nKSA9PiB2b2lkO1xuICAgIG5leHRTdGF0ZXM6IHN0cmluZ1tdID0gW107XG4gICAgbWVzc2FnZSA9ICcnO1xuICAgIGNhbmNlbGxhYmxlOiBib29sZWFuO1xuICAgIHNlbGVjdGVkU3RhdGUgPSAnJztcblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCh0aGlzLnNlbGVjdGVkU3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKCk7XG4gICAgfVxufVxuIl19