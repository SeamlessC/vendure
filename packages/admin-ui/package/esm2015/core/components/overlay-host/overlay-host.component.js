import { Component, ViewContainerRef } from '@angular/core';
import { OverlayHostService } from '../../providers/overlay-host/overlay-host.service';
/**
 * The OverlayHostComponent is a placeholder component which provides a location in the DOM into which overlay
 * elements (modals, notify notifications etc) may be injected dynamically.
 */
export class OverlayHostComponent {
    constructor(viewContainerRef, overlayHostService) {
        overlayHostService.registerHostView(viewContainerRef);
    }
}
OverlayHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-overlay-host',
                template: '<!-- -->'
            },] }
];
OverlayHostComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: OverlayHostService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1ob3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy9vdmVybGF5LWhvc3Qvb3ZlcmxheS1ob3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXZGOzs7R0FHRztBQUtILE1BQU0sT0FBTyxvQkFBb0I7SUFDN0IsWUFBWSxnQkFBa0MsRUFBRSxrQkFBc0M7UUFDbEYsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7WUFQSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLFVBQVU7YUFDdkI7OztZQVhtQixnQkFBZ0I7WUFFM0Isa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE92ZXJsYXlIb3N0U2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9vdmVybGF5LWhvc3Qvb3ZlcmxheS1ob3N0LnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoZSBPdmVybGF5SG9zdENvbXBvbmVudCBpcyBhIHBsYWNlaG9sZGVyIGNvbXBvbmVudCB3aGljaCBwcm92aWRlcyBhIGxvY2F0aW9uIGluIHRoZSBET00gaW50byB3aGljaCBvdmVybGF5XG4gKiBlbGVtZW50cyAobW9kYWxzLCBub3RpZnkgbm90aWZpY2F0aW9ucyBldGMpIG1heSBiZSBpbmplY3RlZCBkeW5hbWljYWxseS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItb3ZlcmxheS1ob3N0JyxcbiAgICB0ZW1wbGF0ZTogJzwhLS0gLS0+Jyxcbn0pXG5leHBvcnQgY2xhc3MgT3ZlcmxheUhvc3RDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIG92ZXJsYXlIb3N0U2VydmljZTogT3ZlcmxheUhvc3RTZXJ2aWNlKSB7XG4gICAgICAgIG92ZXJsYXlIb3N0U2VydmljZS5yZWdpc3Rlckhvc3RWaWV3KHZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cbn1cbiJdfQ==