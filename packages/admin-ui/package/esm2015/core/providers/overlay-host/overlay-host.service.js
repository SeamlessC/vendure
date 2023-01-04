import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The OverlayHostService is used to get a reference to the ViewConainerRef of the
 * OverlayHost component, so that other components may insert components & elements
 * into the DOM at that point.
 */
export class OverlayHostService {
    constructor() {
        this.promiseResolveFns = [];
    }
    /**
     * Used to pass in the ViewContainerRed from the OverlayHost component.
     * Should not be used by any other component.
     */
    registerHostView(viewContainerRef) {
        this.hostView = viewContainerRef;
        if (0 < this.promiseResolveFns.length) {
            this.resolveHostView();
        }
    }
    /**
     * Returns a promise which resolves to the ViewContainerRef of the OverlayHost
     * component. This can then be used to insert components and elements into the
     * DOM at that point.
     */
    getHostView() {
        return new Promise((resolve) => {
            this.promiseResolveFns.push(resolve);
            if (this.hostView !== undefined) {
                this.resolveHostView();
            }
        });
    }
    resolveHostView() {
        this.promiseResolveFns.forEach(resolve => resolve(this.hostView));
        this.promiseResolveFns = [];
    }
}
OverlayHostService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OverlayHostService_Factory() { return new OverlayHostService(); }, token: OverlayHostService, providedIn: "root" });
OverlayHostService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1ob3N0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3Byb3ZpZGVycy9vdmVybGF5LWhvc3Qvb3ZlcmxheS1ob3N0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBb0IsTUFBTSxlQUFlLENBQUM7O0FBRTdEOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBSC9CO1FBS1ksc0JBQWlCLEdBQWlDLEVBQUUsQ0FBQztLQStCaEU7SUE3Qkc7OztPQUdHO0lBQ0gsZ0JBQWdCLENBQUMsZ0JBQWtDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVc7UUFDUCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBOEIsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sZUFBZTtRQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztZQW5DSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIE92ZXJsYXlIb3N0U2VydmljZSBpcyB1c2VkIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgVmlld0NvbmFpbmVyUmVmIG9mIHRoZVxuICogT3ZlcmxheUhvc3QgY29tcG9uZW50LCBzbyB0aGF0IG90aGVyIGNvbXBvbmVudHMgbWF5IGluc2VydCBjb21wb25lbnRzICYgZWxlbWVudHNcbiAqIGludG8gdGhlIERPTSBhdCB0aGF0IHBvaW50LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5SG9zdFNlcnZpY2Uge1xuICAgIHByaXZhdGUgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWY7XG4gICAgcHJpdmF0ZSBwcm9taXNlUmVzb2x2ZUZuczogQXJyYXk8KHJlc3VsdDogYW55KSA9PiB2b2lkPiA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBwYXNzIGluIHRoZSBWaWV3Q29udGFpbmVyUmVkIGZyb20gdGhlIE92ZXJsYXlIb3N0IGNvbXBvbmVudC5cbiAgICAgKiBTaG91bGQgbm90IGJlIHVzZWQgYnkgYW55IG90aGVyIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICByZWdpc3Rlckhvc3RWaWV3KHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3N0VmlldyA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgICAgIGlmICgwIDwgdGhpcy5wcm9taXNlUmVzb2x2ZUZucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZUhvc3RWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB0byB0aGUgVmlld0NvbnRhaW5lclJlZiBvZiB0aGUgT3ZlcmxheUhvc3RcbiAgICAgKiBjb21wb25lbnQuIFRoaXMgY2FuIHRoZW4gYmUgdXNlZCB0byBpbnNlcnQgY29tcG9uZW50cyBhbmQgZWxlbWVudHMgaW50byB0aGVcbiAgICAgKiBET00gYXQgdGhhdCBwb2ludC5cbiAgICAgKi9cbiAgICBnZXRIb3N0VmlldygpOiBQcm9taXNlPFZpZXdDb250YWluZXJSZWY+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiAocmVzdWx0OiBhbnkpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZVJlc29sdmVGbnMucHVzaChyZXNvbHZlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3RWaWV3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVIb3N0VmlldygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc29sdmVIb3N0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcm9taXNlUmVzb2x2ZUZucy5mb3JFYWNoKHJlc29sdmUgPT4gcmVzb2x2ZSh0aGlzLmhvc3RWaWV3KSk7XG4gICAgICAgIHRoaXMucHJvbWlzZVJlc29sdmVGbnMgPSBbXTtcbiAgICB9XG59XG4iXX0=