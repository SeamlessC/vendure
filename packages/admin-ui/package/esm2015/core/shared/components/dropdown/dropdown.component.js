import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * @description
 * Used for building dropdown menus.
 *
 * @example
 * ```HTML
 * <vdr-dropdown>
 *   <button class="btn btn-outline" vdrDropdownTrigger>
 *       <clr-icon shape="plus"></clr-icon>
 *       Select type
 *   </button>
 *   <vdr-dropdown-menu vdrPosition="bottom-left">
 *     <button
 *       *ngFor="let typeName of allTypes"
 *       type="button"
 *       vdrDropdownItem
 *       (click)="selectType(typeName)"
 *     >
 *       typeName
 *     </button>
 *   </vdr-dropdown-menu>
 * </vdr-dropdown>
 * ```
 * @docsCategory components
 */
export class DropdownComponent {
    constructor() {
        this.isOpen = false;
        this.onOpenChangeCallbacks = [];
        this.manualToggle = false;
    }
    onClick() {
        if (!this.manualToggle) {
            this.toggleOpen();
        }
    }
    toggleOpen() {
        this.isOpen = !this.isOpen;
        this.onOpenChangeCallbacks.forEach(fn => fn(this.isOpen));
    }
    onOpenChange(callback) {
        this.onOpenChangeCallbacks.push(callback);
    }
    setTriggerElement(elementRef) {
        this.trigger = elementRef;
    }
}
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dropdown',
                template: "<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DropdownComponent.propDecorators = {
    manualToggle: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQU9ILE1BQU0sT0FBTyxpQkFBaUI7SUFOOUI7UUFPWSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsMEJBQXFCLEdBQXFDLEVBQUUsQ0FBQztRQUU1RCxpQkFBWSxHQUFHLEtBQUssQ0FBQztJQW9CbEMsQ0FBQztJQWxCRyxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxZQUFZLENBQUMsUUFBbUM7UUFDNUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBc0I7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDOUIsQ0FBQzs7O1lBN0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsdUNBQXdDO2dCQUV4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzsyQkFLSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFVzZWQgZm9yIGJ1aWxkaW5nIGRyb3Bkb3duIG1lbnVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBIVE1MXG4gKiA8dmRyLWRyb3Bkb3duPlxuICogICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lXCIgdmRyRHJvcGRvd25UcmlnZ2VyPlxuICogICAgICAgPGNsci1pY29uIHNoYXBlPVwicGx1c1wiPjwvY2xyLWljb24+XG4gKiAgICAgICBTZWxlY3QgdHlwZVxuICogICA8L2J1dHRvbj5cbiAqICAgPHZkci1kcm9wZG93bi1tZW51IHZkclBvc2l0aW9uPVwiYm90dG9tLWxlZnRcIj5cbiAqICAgICA8YnV0dG9uXG4gKiAgICAgICAqbmdGb3I9XCJsZXQgdHlwZU5hbWUgb2YgYWxsVHlwZXNcIlxuICogICAgICAgdHlwZT1cImJ1dHRvblwiXG4gKiAgICAgICB2ZHJEcm9wZG93bkl0ZW1cbiAqICAgICAgIChjbGljayk9XCJzZWxlY3RUeXBlKHR5cGVOYW1lKVwiXG4gKiAgICAgPlxuICogICAgICAgdHlwZU5hbWVcbiAqICAgICA8L2J1dHRvbj5cbiAqICAgPC92ZHItZHJvcGRvd24tbWVudT5cbiAqIDwvdmRyLWRyb3Bkb3duPlxuICogYGBgXG4gKiBAZG9jc0NhdGVnb3J5IGNvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24uY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Db21wb25lbnQge1xuICAgIHByaXZhdGUgaXNPcGVuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBvbk9wZW5DaGFuZ2VDYWxsYmFja3M6IEFycmF5PChpc09wZW46IGJvb2xlYW4pID0+IHZvaWQ+ID0gW107XG4gICAgcHVibGljIHRyaWdnZXI6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgbWFudWFsVG9nZ2xlID0gZmFsc2U7XG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMubWFudWFsVG9nZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZU9wZW4oKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuICAgICAgICB0aGlzLm9uT3BlbkNoYW5nZUNhbGxiYWNrcy5mb3JFYWNoKGZuID0+IGZuKHRoaXMuaXNPcGVuKSk7XG4gICAgfVxuXG4gICAgb25PcGVuQ2hhbmdlKGNhbGxiYWNrOiAoaXNPcGVuOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub25PcGVuQ2hhbmdlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHNldFRyaWdnZXJFbGVtZW50KGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gZWxlbWVudFJlZjtcbiAgICB9XG59XG4iXX0=