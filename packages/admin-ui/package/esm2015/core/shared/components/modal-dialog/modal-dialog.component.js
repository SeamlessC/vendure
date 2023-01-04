import { Component, } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * This component should only be instantiated dynamically by the ModalService. It should not be used
 * directly in templates. See {@link ModalService.fromComponent} method for more detail.
 */
export class ModalDialogComponent {
    constructor() {
        this.titleTemplateRef$ = new Subject();
        this.buttonsTemplateRef$ = new Subject();
    }
    /**
     * This callback is invoked when the childComponentType is instantiated in the
     * template by the {@link DialogComponentOutletComponent}.
     * Once we have the instance, we can set the resolveWith function and any
     * locals which were specified in the config.
     */
    onCreate(componentInstance) {
        componentInstance.resolveWith = (result) => {
            this.closeModal(result);
        };
        if (this.options && this.options.locals) {
            // tslint:disable-next-line
            for (const key in this.options.locals) {
                componentInstance[key] = this.options.locals[key];
            }
        }
    }
    /**
     * This should be called by the {@link DialogTitleDirective} only
     */
    registerTitleTemplate(titleTemplateRef) {
        this.titleTemplateRef$.next(titleTemplateRef);
    }
    /**
     * This should be called by the {@link DialogButtonsDirective} only
     */
    registerButtonsTemplate(buttonsTemplateRef) {
        this.buttonsTemplateRef$.next(buttonsTemplateRef);
    }
    /**
     * Called when the modal is closed by clicking the X or the mask.
     */
    modalOpenChange(status) {
        if (status === false) {
            this.closeModal();
        }
    }
}
ModalDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-modal-dialog',
                template: "<clr-modal\n    [clrModalOpen]=\"true\"\n    (clrModalOpenChange)=\"modalOpenChange($event)\"\n    [clrModalClosable]=\"options?.closable\"\n    [clrModalSize]=\"options?.size\"\n    [ngClass]=\"'modal-valign-' + (options?.verticalAlign || 'center')\"\n>\n    <h3 class=\"modal-title\"><ng-container *ngTemplateOutlet=\"(titleTemplateRef$ | async)\"></ng-container></h3>\n    <div class=\"modal-body\">\n        <vdr-dialog-component-outlet\n            [component]=\"childComponentType\"\n            (create)=\"onCreate($event)\"\n        ></vdr-dialog-component-outlet>\n    </div>\n    <div class=\"modal-footer\">\n        <ng-container *ngTemplateOutlet=\"(buttonsTemplateRef$ | async)\"></ng-container>\n    </div>\n</clr-modal>\n",
                styles: ["::ng-deep clr-modal.modal-valign-top .modal{justify-content:flex-start}::ng-deep clr-modal.modal-valign-bottom .modal{justify-content:flex-end}.modal-body{display:flex;flex-direction:column}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvbW9kYWwtZGlhbG9nL21vZGFsLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsR0FRWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTTNDOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxvQkFBb0I7SUFMakM7UUFRSSxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUNwRCx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztJQTJDMUQsQ0FBQztJQXhDRzs7Ozs7T0FLRztJQUNILFFBQVEsQ0FBQyxpQkFBb0I7UUFDekIsaUJBQWlCLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBWSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDckMsMkJBQTJCO1lBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBZ0MsQ0FBQzthQUNwRjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCLENBQUMsZ0JBQWtDO1FBQ3BELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBdUIsQ0FBQyxrQkFBb0M7UUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBQyxNQUFXO1FBQ3ZCLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDZ1QkFBNEM7O2FBRS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGlhbG9nLCBNb2RhbE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5cbmltcG9ydCB7IERpYWxvZ0J1dHRvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2RpYWxvZy1idXR0b25zLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgc2hvdWxkIG9ubHkgYmUgaW5zdGFudGlhdGVkIGR5bmFtaWNhbGx5IGJ5IHRoZSBNb2RhbFNlcnZpY2UuIEl0IHNob3VsZCBub3QgYmUgdXNlZFxuICogZGlyZWN0bHkgaW4gdGVtcGxhdGVzLiBTZWUge0BsaW5rIE1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50fSBtZXRob2QgZm9yIG1vcmUgZGV0YWlsLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1tb2RhbC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21vZGFsLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ0NvbXBvbmVudDxUIGV4dGVuZHMgRGlhbG9nPGFueT4+IHtcbiAgICBjaGlsZENvbXBvbmVudFR5cGU6IFR5cGU8VD47XG4gICAgY2xvc2VNb2RhbDogKHJlc3VsdD86IGFueSkgPT4gdm9pZDtcbiAgICB0aXRsZVRlbXBsYXRlUmVmJCA9IG5ldyBTdWJqZWN0PFRlbXBsYXRlUmVmPGFueT4+KCk7XG4gICAgYnV0dG9uc1RlbXBsYXRlUmVmJCA9IG5ldyBTdWJqZWN0PFRlbXBsYXRlUmVmPGFueT4+KCk7XG4gICAgb3B0aW9ucz86IE1vZGFsT3B0aW9uczxUPjtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgY2FsbGJhY2sgaXMgaW52b2tlZCB3aGVuIHRoZSBjaGlsZENvbXBvbmVudFR5cGUgaXMgaW5zdGFudGlhdGVkIGluIHRoZVxuICAgICAqIHRlbXBsYXRlIGJ5IHRoZSB7QGxpbmsgRGlhbG9nQ29tcG9uZW50T3V0bGV0Q29tcG9uZW50fS5cbiAgICAgKiBPbmNlIHdlIGhhdmUgdGhlIGluc3RhbmNlLCB3ZSBjYW4gc2V0IHRoZSByZXNvbHZlV2l0aCBmdW5jdGlvbiBhbmQgYW55XG4gICAgICogbG9jYWxzIHdoaWNoIHdlcmUgc3BlY2lmaWVkIGluIHRoZSBjb25maWcuXG4gICAgICovXG4gICAgb25DcmVhdGUoY29tcG9uZW50SW5zdGFuY2U6IFQpIHtcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UucmVzb2x2ZVdpdGggPSAocmVzdWx0PzogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubG9jYWxzKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMub3B0aW9ucy5sb2NhbHMpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZVtrZXldID0gdGhpcy5vcHRpb25zLmxvY2Fsc1trZXldIGFzIFRbRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUge0BsaW5rIERpYWxvZ1RpdGxlRGlyZWN0aXZlfSBvbmx5XG4gICAgICovXG4gICAgcmVnaXN0ZXJUaXRsZVRlbXBsYXRlKHRpdGxlVGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy50aXRsZVRlbXBsYXRlUmVmJC5uZXh0KHRpdGxlVGVtcGxhdGVSZWYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUge0BsaW5rIERpYWxvZ0J1dHRvbnNEaXJlY3RpdmV9IG9ubHlcbiAgICAgKi9cbiAgICByZWdpc3RlckJ1dHRvbnNUZW1wbGF0ZShidXR0b25zVGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5idXR0b25zVGVtcGxhdGVSZWYkLm5leHQoYnV0dG9uc1RlbXBsYXRlUmVmKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkIGJ5IGNsaWNraW5nIHRoZSBYIG9yIHRoZSBtYXNrLlxuICAgICAqL1xuICAgIG1vZGFsT3BlbkNoYW5nZShzdGF0dXM6IGFueSkge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=