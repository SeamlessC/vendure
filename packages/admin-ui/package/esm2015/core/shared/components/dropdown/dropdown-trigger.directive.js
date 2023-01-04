import { Directive, ElementRef, HostListener } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
export class DropdownTriggerDirective {
    constructor(dropdown, elementRef) {
        this.dropdown = dropdown;
        this.elementRef = elementRef;
        dropdown.setTriggerElement(this.elementRef);
    }
    onDropdownTriggerClick(event) {
        this.dropdown.toggleOpen();
    }
}
DropdownTriggerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrDropdownTrigger]',
            },] }
];
DropdownTriggerDirective.ctorParameters = () => [
    { type: DropdownComponent },
    { type: ElementRef }
];
DropdownTriggerDirective.propDecorators = {
    onDropdownTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUt6RCxNQUFNLE9BQU8sd0JBQXdCO0lBQ2pDLFlBQW9CLFFBQTJCLEVBQVUsVUFBc0I7UUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzNFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELHNCQUFzQixDQUFDLEtBQVU7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7WUFYSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjthQUNuQzs7O1lBSlEsaUJBQWlCO1lBRk4sVUFBVTs7O3FDQVl6QixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZkckRyb3Bkb3duVHJpZ2dlcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93blRyaWdnZXJEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJvcGRvd246IERyb3Bkb3duQ29tcG9uZW50LCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgZHJvcGRvd24uc2V0VHJpZ2dlckVsZW1lbnQodGhpcy5lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25Ecm9wZG93blRyaWdnZXJDbGljayhldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24udG9nZ2xlT3BlbigpO1xuICAgIH1cbn1cbiJdfQ==