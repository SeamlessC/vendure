import { Directive, HostListener } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
export class DropdownItemDirective {
    constructor(dropdown) {
        this.dropdown = dropdown;
    }
    onDropdownItemClick(event) {
        this.dropdown.onClick();
    }
}
DropdownItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrDropdownItem]',
                // tslint:disable-next-line
                host: { '[class.dropdown-item]': 'true' },
            },] }
];
DropdownItemDirective.ctorParameters = () => [
    { type: DropdownComponent }
];
DropdownItemDirective.propDecorators = {
    onDropdownItemClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBT3pELE1BQU0sT0FBTyxxQkFBcUI7SUFDOUIsWUFBb0IsUUFBMkI7UUFBM0IsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7SUFBRyxDQUFDO0lBR25ELG1CQUFtQixDQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUFYSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMkJBQTJCO2dCQUMzQixJQUFJLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUU7YUFDNUM7OztZQU5RLGlCQUFpQjs7O2tDQVVyQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZkckRyb3Bkb3duSXRlbV0nLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIGhvc3Q6IHsgJ1tjbGFzcy5kcm9wZG93bi1pdGVtXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkl0ZW1EaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJvcGRvd246IERyb3Bkb3duQ29tcG9uZW50KSB7fVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uRHJvcGRvd25JdGVtQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLm9uQ2xpY2soKTtcbiAgICB9XG59XG4iXX0=