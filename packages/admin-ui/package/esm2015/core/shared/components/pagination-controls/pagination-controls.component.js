import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class PaginationControlsComponent {
    constructor() {
        this.pageChange = new EventEmitter();
    }
}
PaginationControlsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-pagination-controls',
                template: "<pagination-template #p=\"paginationApi\" (pageChange)=\"pageChange.emit($event)\" [id]=\"id\">\n    <ul>\n        <li class=\"pagination-previous\">\n            <a *ngIf=\"!p.isFirstPage()\" (click)=\"p.previous()\" (keyup.enter)=\"p.previous()\" tabindex=\"0\">\u00AB</a>\n            <div *ngIf=\"p.isFirstPage()\">\u00AB</div>\n        </li>\n\n        <li *ngFor=\"let page of p.pages\">\n            <a\n                (click)=\"p.setCurrent(page.value)\"\n                (keyup.enter)=\"p.setCurrent(page.value)\"\n                *ngIf=\"p.getCurrent() !== page.value\"\n                tabindex=\"0\"\n            >\n                {{ page.label }}\n            </a>\n\n            <div class=\"current\" *ngIf=\"p.getCurrent() === page.value\">{{ page.label }}</div>\n        </li>\n\n        <li class=\"pagination-next\">\n            <a *ngIf=\"!p.isLastPage()\" (click)=\"p.next()\" (keyup.enter)=\"p.next()\" tabindex=\"0\">\u00BB</a>\n            <div *ngIf=\"p.isLastPage()\">\u00BB</div>\n        </li>\n    </ul>\n</pagination-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["pagination-template{display:block}pagination-template ul{list-style-type:none;display:flex;justify-content:center}pagination-template li{transition:border-bottom-color .2s}pagination-template li>a{cursor:pointer}pagination-template li>a:hover,pagination-template li>a:focus{border-bottom-color:var(--color-grey-300);text-decoration:none}pagination-template li>a,pagination-template li>div{padding:3px 12px;display:block;border-bottom:3px solid transparent;-webkit-user-select:none;user-select:none}pagination-template li>div.current{border-bottom-color:var(--color-primary-500)}\n"]
            },] }
];
PaginationControlsComponent.propDecorators = {
    id: [{ type: Input }],
    currentPage: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    totalItems: [{ type: Input }],
    pageChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3BhZ2luYXRpb24tY29udHJvbHMvcGFnaW5hdGlvbi1jb250cm9scy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFoRyxNQUFNLE9BQU8sMkJBQTJCO0lBTnhDO1FBV2MsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFDdEQsQ0FBQzs7O1lBWkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLGlqQ0FBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O2lCQUVJLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wYWdpbmF0aW9uLWNvbnRyb2xzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGFnaW5hdGlvbi1jb250cm9scy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFnaW5hdGlvbi1jb250cm9scy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uQ29udHJvbHNDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGlkPzogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gICAgQElucHV0KCkgaXRlbXNQZXJQYWdlOiBudW1iZXI7XG4gICAgQElucHV0KCkgdG90YWxJdGVtczogbnVtYmVyO1xuICAgIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG59XG4iXX0=