import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, Output, TemplateRef, } from '@angular/core';
export class RelationCardPreviewDirective {
}
RelationCardPreviewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrRelationCardPreview]',
            },] }
];
export class RelationCardDetailDirective {
}
RelationCardDetailDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrRelationCardDetail]',
            },] }
];
export class RelationCardComponent {
    constructor() {
        this.removable = true;
        this.select = new EventEmitter();
        this.remove = new EventEmitter();
    }
}
RelationCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-card',
                template: "<div class=\"flex\">\n    <ng-container *ngIf=\"entity; else placeholder\">\n        <div class=\"preview\">\n            <ng-container *ngTemplateOutlet=\"previewTemplate; context: { entity: entity }\"></ng-container>\n        </div>\n        <div class=\"detail\">\n            <div class=\"pl3\">\n                <ng-container *ngTemplateOutlet=\"detailTemplate; context: { entity: entity }\"></ng-container>\n            </div>\n            <button *ngIf=\"!readonly\" class=\"btn btn-sm btn-link\" (click)=\"select.emit()\">\n                <clr-icon shape=\"link\"></clr-icon> {{ 'common.change-selection' | translate }}\n            </button>\n            <button *ngIf=\"!readonly && removable\" class=\"btn btn-sm btn-link\" (click)=\"remove.emit()\">\n                <clr-icon shape=\"times\"></clr-icon> {{ 'common.remove' | translate }}\n            </button>\n        </div>\n    </ng-container>\n    <ng-template #placeholder>\n        <div class=\"preview\">\n            <div class=\"placeholder\" (click)=\"!readonly && select.emit()\">\n                <clr-icon [attr.shape]=\"placeholderIcon\" size=\"50\"></clr-icon>\n            </div>\n        </div>\n        <div class=\"detail\">\n            <div class=\"pl3 not-set\">{{ 'common.not-set' | translate }}</div>\n            <button *ngIf=\"!readonly\" class=\"btn btn-sm btn-link\" (click)=\"select.emit()\">\n                <clr-icon shape=\"link\"></clr-icon> {{ selectLabel }}\n            </button>\n        </div>\n    </ng-template>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;min-width:300px}.placeholder{color:var(--color-grey-300)}.not-set{color:var(--color-grey-300)}.detail{flex:1;overflow:hidden}.name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n"]
            },] }
];
RelationCardComponent.propDecorators = {
    entity: [{ type: Input }],
    placeholderIcon: [{ type: Input }],
    selectLabel: [{ type: Input }],
    readonly: [{ type: Input }],
    removable: [{ type: Input }],
    select: [{ type: Output }],
    remove: [{ type: Output }],
    previewTemplate: [{ type: ContentChild, args: [RelationCardPreviewDirective, { read: TemplateRef },] }],
    detailTemplate: [{ type: ContentChild, args: [RelationCardDetailDirective, { read: TemplateRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL3JlbGF0aW9uLWZvcm0taW5wdXQvcmVsYXRpb24tY2FyZC9yZWxhdGlvbi1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEdBQ2QsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLDRCQUE0Qjs7O1lBSHhDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2FBQ3ZDOztBQUtELE1BQU0sT0FBTywyQkFBMkI7OztZQUh2QyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjthQUN0Qzs7QUFTRCxNQUFNLE9BQU8scUJBQXFCO0lBTmxDO1FBV2EsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUsxQyxDQUFDOzs7WUFsQkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG9nREFBNkM7Z0JBRTdDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3FCQUVJLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDTCxNQUFNO3FCQUNOLE1BQU07OEJBQ04sWUFBWSxTQUFDLDRCQUE0QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs2QkFFaEUsWUFBWSxTQUFDLDJCQUEyQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2ZHJSZWxhdGlvbkNhcmRQcmV2aWV3XScsXG59KVxuZXhwb3J0IGNsYXNzIFJlbGF0aW9uQ2FyZFByZXZpZXdEaXJlY3RpdmUge31cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZkclJlbGF0aW9uQ2FyZERldGFpbF0nLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxhdGlvbkNhcmREZXRhaWxEaXJlY3RpdmUge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcmVsYXRpb24tY2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3JlbGF0aW9uLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3JlbGF0aW9uLWNhcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmVsYXRpb25DYXJkQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBlbnRpdHk6IGFueTtcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlckljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBzZWxlY3RMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHJlbW92YWJsZSA9IHRydWU7XG4gICAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBDb250ZW50Q2hpbGQoUmVsYXRpb25DYXJkUHJldmlld0RpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICAgIHByZXZpZXdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBAQ29udGVudENoaWxkKFJlbGF0aW9uQ2FyZERldGFpbERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KVxuICAgIGRldGFpbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuIl19