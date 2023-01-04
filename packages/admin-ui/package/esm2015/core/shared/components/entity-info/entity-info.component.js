import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class EntityInfoComponent {
    constructor() {
        this.small = false;
    }
}
EntityInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-entity-info',
                template: "<vdr-dropdown *ngIf=\"entity.id\">\n    <button class=\"btn btn-icon btn-link info-button\" [class.btn-sm]=\"small\" vdrDropdownTrigger>\n        <clr-icon shape=\"info-standard\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"entity-info\">\n            <vdr-labeled-data [label]=\"'common.ID' | translate\">\n                {{ entity.id }}\n            </vdr-labeled-data>\n            <vdr-labeled-data *ngIf=\"entity.createdAt\" [label]=\"'common.created-at' | translate\">\n                {{ entity.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data *ngIf=\"entity.updatedAt\" [label]=\"'common.updated-at' | translate\">\n                {{ entity.updatedAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".info-button{color:var(--color-icon-button)}.entity-info{margin:0 12px}\n"]
            },] }
];
EntityInfoComponent.propDecorators = {
    small: [{ type: Input }],
    entity: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktaW5mby9lbnRpdHktaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLG1CQUFtQjtJQU5oQztRQU9hLFVBQUssR0FBRyxLQUFLLENBQUM7SUFFM0IsQ0FBQzs7O1lBVEEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHkyQkFBMkM7Z0JBRTNDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O29CQUVJLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWVudGl0eS1pbmZvJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZW50aXR5LWluZm8uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2VudGl0eS1pbmZvLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEVudGl0eUluZm9Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIHNtYWxsID0gZmFsc2U7XG4gICAgQElucHV0KCkgZW50aXR5OiB7IGlkOiBzdHJpbmc7IGNyZWF0ZWRBdD86IHN0cmluZzsgdXBkYXRlZEF0Pzogc3RyaW5nIH07XG59XG4iXX0=