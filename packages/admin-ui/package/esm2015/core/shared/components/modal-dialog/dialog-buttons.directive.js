import { Directive, TemplateRef } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';
/**
 * A helper directive used to correctly embed the modal buttons in the {@link ModalDialogComponent}.
 */
export class DialogButtonsDirective {
    constructor(modal, templateRef) {
        this.modal = modal;
        this.templateRef = templateRef;
    }
    ngOnInit() {
        // setTimeout due to https://github.com/angular/angular/issues/15634
        setTimeout(() => this.modal.registerButtonsTemplate(this.templateRef));
    }
}
DialogButtonsDirective.decorators = [
    { type: Directive, args: [{ selector: '[vdrDialogButtons]' },] }
];
DialogButtonsDirective.ctorParameters = () => [
    { type: ModalDialogComponent },
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWJ1dHRvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9tb2RhbC1kaWFsb2cvZGlhbG9nLWJ1dHRvbnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFOztHQUVHO0FBRUgsTUFBTSxPQUFPLHNCQUFzQjtJQUMvQixZQUFvQixLQUFnQyxFQUFVLFdBQTZCO1FBQXZFLFVBQUssR0FBTCxLQUFLLENBQTJCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQztJQUUvRixRQUFRO1FBQ0osb0VBQW9FO1FBQ3BFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7OztZQVBKLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRTs7O1lBTHBDLG9CQUFvQjtZQUZELFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTW9kYWxEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWRpYWxvZy5jb21wb25lbnQnO1xuXG4vKipcbiAqIEEgaGVscGVyIGRpcmVjdGl2ZSB1c2VkIHRvIGNvcnJlY3RseSBlbWJlZCB0aGUgbW9kYWwgYnV0dG9ucyBpbiB0aGUge0BsaW5rIE1vZGFsRGlhbG9nQ29tcG9uZW50fS5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZkckRpYWxvZ0J1dHRvbnNdJyB9KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0J1dHRvbnNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nQ29tcG9uZW50PGFueT4sIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gc2V0VGltZW91dCBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU2MzRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm1vZGFsLnJlZ2lzdGVyQnV0dG9uc1RlbXBsYXRlKHRoaXMudGVtcGxhdGVSZWYpKTtcbiAgICB9XG59XG4iXX0=