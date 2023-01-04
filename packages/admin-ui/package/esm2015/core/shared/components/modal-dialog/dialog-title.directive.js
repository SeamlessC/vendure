import { Directive, TemplateRef } from '@angular/core';
import { ModalDialogComponent } from './modal-dialog.component';
/**
 * A helper directive used to correctly embed the modal title in the {@link ModalDialogComponent}.
 */
export class DialogTitleDirective {
    constructor(modal, templateRef) {
        this.modal = modal;
        this.templateRef = templateRef;
    }
    ngOnInit() {
        // setTimeout due to https://github.com/angular/angular/issues/15634
        setTimeout(() => this.modal.registerTitleTemplate(this.templateRef));
    }
}
DialogTitleDirective.decorators = [
    { type: Directive, args: [{ selector: '[vdrDialogTitle]' },] }
];
DialogTitleDirective.ctorParameters = () => [
    { type: ModalDialogComponent },
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXRpdGxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvbW9kYWwtZGlhbG9nL2RpYWxvZy10aXRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEU7O0dBRUc7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBQzdCLFlBQW9CLEtBQWdDLEVBQVUsV0FBNkI7UUFBdkUsVUFBSyxHQUFMLEtBQUssQ0FBMkI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDO0lBRS9GLFFBQVE7UUFDSixvRUFBb0U7UUFDcEUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7O1lBUEosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFOzs7WUFMbEMsb0JBQW9CO1lBRkQsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNb2RhbERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtZGlhbG9nLmNvbXBvbmVudCc7XG5cbi8qKlxuICogQSBoZWxwZXIgZGlyZWN0aXZlIHVzZWQgdG8gY29ycmVjdGx5IGVtYmVkIHRoZSBtb2RhbCB0aXRsZSBpbiB0aGUge0BsaW5rIE1vZGFsRGlhbG9nQ29tcG9uZW50fS5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZkckRpYWxvZ1RpdGxlXScgfSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dUaXRsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBzZXRUaW1lb3V0IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNTYzNFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMubW9kYWwucmVnaXN0ZXJUaXRsZVRlbXBsYXRlKHRoaXMudGVtcGxhdGVSZWYpKTtcbiAgICB9XG59XG4iXX0=