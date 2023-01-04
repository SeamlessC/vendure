import { __awaiter } from "tslib";
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { I18nService } from '../i18n/i18n.service';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
import * as i0 from "@angular/core";
import * as i1 from "../i18n/i18n.service";
import * as i2 from "../overlay-host/overlay-host.service";
// How many ms before the toast is dismissed.
const TOAST_DURATION = 3000;
/**
 * @description
 * Provides toast notification functionality.
 *
 * @example
 * ```TypeScript
 * class MyComponent {
 *   constructor(private notificationService: NotificationService) {}
 *
 *   save() {
 *     this.notificationService
 *         .success(_('asset.notify-create-assets-success'), {
 *           count: successCount,
 *         });
 *   }
 * }
 *
 * @docsCategory providers
 * @docsPage NotificationService
 * @docsWeight 0
 */
export class NotificationService {
    constructor(i18nService, resolver, overlayHostService) {
        this.i18nService = i18nService;
        this.resolver = resolver;
        this.overlayHostService = overlayHostService;
        this.openToastRefs = [];
    }
    get hostView() {
        return this.overlayHostService.getHostView();
    }
    /**
     * @description
     * Display a success toast notification
     */
    success(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'success',
        });
    }
    /**
     * @description
     * Display an info toast notification
     */
    info(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'info',
        });
    }
    /**
     * @description
     * Display a warning toast notification
     */
    warning(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'warning',
        });
    }
    /**
     * @description
     * Display an error toast notification
     */
    error(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'error',
            duration: 20000,
        });
    }
    /**
     * @description
     * Display a toast notification.
     */
    notify(config) {
        this.createToast(config);
    }
    /**
     * Load a ToastComponent into the DOM host location.
     */
    createToast(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const toastFactory = this.resolver.resolveComponentFactory(NotificationComponent);
            const hostView = yield this.hostView;
            const ref = hostView.createComponent(toastFactory);
            const toast = ref.instance;
            const dismissFn = this.createDismissFunction(ref);
            toast.type = config.type || 'info';
            toast.message = config.message;
            toast.translationVars = this.translateTranslationVars(config.translationVars || {});
            toast.registerOnClickFn(dismissFn);
            let timerId;
            if (!config.duration || 0 < config.duration) {
                timerId = setTimeout(dismissFn, config.duration || TOAST_DURATION);
            }
            this.openToastRefs.unshift({ ref, timerId });
            setTimeout(() => this.calculatePositions());
        });
    }
    /**
     * Returns a function which will destroy the toast component and
     * remove it from the openToastRefs array.
     */
    createDismissFunction(ref) {
        return () => {
            const toast = ref.instance;
            const index = this.openToastRefs.map(o => o.ref).indexOf(ref);
            if (this.openToastRefs[index]) {
                clearTimeout(this.openToastRefs[index].timerId);
            }
            toast.fadeOut().then(() => {
                ref.destroy();
                this.openToastRefs.splice(index, 1);
                this.calculatePositions();
            });
        };
    }
    /**
     * Calculate and set the top offsets for each of the open toasts.
     */
    calculatePositions() {
        let cumulativeHeight = 10;
        this.openToastRefs.forEach(obj => {
            const toast = obj.ref.instance;
            toast.offsetTop = cumulativeHeight;
            cumulativeHeight += toast.getHeight() + 6;
        });
    }
    translateTranslationVars(translationVars) {
        for (const [key, val] of Object.entries(translationVars)) {
            if (typeof val === 'string') {
                translationVars[key] = this.i18nService.translate(val);
            }
        }
        return translationVars;
    }
}
NotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(i0.ɵɵinject(i1.I18nService), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i2.OverlayHostService)); }, token: NotificationService, providedIn: "root" });
NotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NotificationService.ctorParameters = () => [
    { type: I18nService },
    { type: ComponentFactoryResolver },
    { type: OverlayHostService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3Byb3ZpZGVycy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx3QkFBd0IsRUFBZ0IsVUFBVSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUVyRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUF5QjFFLDZDQUE2QztBQUM3QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBSUgsTUFBTSxPQUFPLG1CQUFtQjtJQU81QixZQUNZLFdBQXdCLEVBQ3hCLFFBQWtDLEVBQ2xDLGtCQUFzQztRQUZ0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBTDFDLGtCQUFhLEdBQXNFLEVBQUUsQ0FBQztJQU0zRixDQUFDO0lBVkosSUFBWSxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFVRDs7O09BR0c7SUFDSCxPQUFPLENBQUMsT0FBZSxFQUFFLGVBQW9EO1FBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixPQUFPO1lBQ1AsZUFBZTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLENBQUMsT0FBZSxFQUFFLGVBQW9EO1FBQ3RFLElBQUksQ0FB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a0IsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0ssa0JBQWtCO1FBQ3RCLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUEwQixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUN0RCxLQUFLLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1lBQ25DLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sd0JBQXdCLENBQUMsZUFBbUQ7UUFHaEYsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDdEQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ3pCLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxRDtTQUNKO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQzs7OztZQTNJSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQXBEUSxXQUFXO1lBSFgsd0JBQXdCO1lBSXhCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSTE4blNlcnZpY2UgfSBmcm9tICcuLi9pMThuL2kxOG4uc2VydmljZSc7XG5pbXBvcnQgeyBPdmVybGF5SG9zdFNlcnZpY2UgfSBmcm9tICcuLi9vdmVybGF5LWhvc3Qvb3ZlcmxheS1ob3N0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIHR5cGVzIG9mIG5vdGlmaWNhdGlvbiBhdmFpbGFibGUuXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwcm92aWRlcnNcbiAqIEBkb2NzUGFnZSBOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvblR5cGUgPSAnaW5mbycgfCAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ3dhcm5pbmcnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ29uZmlndXJhdGlvbiBmb3IgYSB0b2FzdCBub3RpZmljYXRpb24uXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwcm92aWRlcnNcbiAqIEBkb2NzUGFnZSBOb3RpZmljYXRpb25TZXJ2aWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RDb25maWcge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0cmFuc2xhdGlvblZhcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9O1xuICAgIHR5cGU/OiBOb3RpZmljYXRpb25UeXBlO1xuICAgIGR1cmF0aW9uPzogbnVtYmVyO1xufVxuXG4vLyBIb3cgbWFueSBtcyBiZWZvcmUgdGhlIHRvYXN0IGlzIGRpc21pc3NlZC5cbmNvbnN0IFRPQVNUX0RVUkFUSU9OID0gMzAwMDtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFByb3ZpZGVzIHRvYXN0IG5vdGlmaWNhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cbiAqXG4gKiAgIHNhdmUoKSB7XG4gKiAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlXG4gKiAgICAgICAgIC5zdWNjZXNzKF8oJ2Fzc2V0Lm5vdGlmeS1jcmVhdGUtYXNzZXRzLXN1Y2Nlc3MnKSwge1xuICogICAgICAgICAgIGNvdW50OiBzdWNjZXNzQ291bnQsXG4gKiAgICAgICAgIH0pO1xuICogICB9XG4gKiB9XG4gKlxuICogQGRvY3NDYXRlZ29yeSBwcm92aWRlcnNcbiAqIEBkb2NzUGFnZSBOb3RpZmljYXRpb25TZXJ2aWNlXG4gKiBAZG9jc1dlaWdodCAwXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgIHByaXZhdGUgZ2V0IGhvc3RWaWV3KCk6IFByb21pc2U8Vmlld0NvbnRhaW5lclJlZj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5SG9zdFNlcnZpY2UuZ2V0SG9zdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5Ub2FzdFJlZnM6IEFycmF5PHsgcmVmOiBDb21wb25lbnRSZWY8Tm90aWZpY2F0aW9uQ29tcG9uZW50PjsgdGltZXJJZDogYW55IH0+ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpMThuU2VydmljZTogSTE4blNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5SG9zdFNlcnZpY2U6IE92ZXJsYXlIb3N0U2VydmljZSxcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBEaXNwbGF5IGEgc3VjY2VzcyB0b2FzdCBub3RpZmljYXRpb25cbiAgICAgKi9cbiAgICBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZywgdHJhbnNsYXRpb25WYXJzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSk6IHZvaWQge1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgdHJhbnNsYXRpb25WYXJzLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBEaXNwbGF5IGFuIGluZm8gdG9hc3Qgbm90aWZpY2F0aW9uXG4gICAgICovXG4gICAgaW5mbyhtZXNzYWdlOiBzdHJpbmcsIHRyYW5zbGF0aW9uVmFycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFycyxcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogRGlzcGxheSBhIHdhcm5pbmcgdG9hc3Qgbm90aWZpY2F0aW9uXG4gICAgICovXG4gICAgd2FybmluZyhtZXNzYWdlOiBzdHJpbmcsIHRyYW5zbGF0aW9uVmFycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFycyxcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogRGlzcGxheSBhbiBlcnJvciB0b2FzdCBub3RpZmljYXRpb25cbiAgICAgKi9cbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIHRyYW5zbGF0aW9uVmFycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFycyxcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMDAsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIERpc3BsYXkgYSB0b2FzdCBub3RpZmljYXRpb24uXG4gICAgICovXG4gICAgbm90aWZ5KGNvbmZpZzogVG9hc3RDb25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jcmVhdGVUb2FzdChjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBUb2FzdENvbXBvbmVudCBpbnRvIHRoZSBET00gaG9zdCBsb2NhdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVRvYXN0KGNvbmZpZzogVG9hc3RDb25maWcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgdG9hc3RGYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOb3RpZmljYXRpb25Db21wb25lbnQpO1xuICAgICAgICBjb25zdCBob3N0VmlldyA9IGF3YWl0IHRoaXMuaG9zdFZpZXc7XG4gICAgICAgIGNvbnN0IHJlZiA9IGhvc3RWaWV3LmNyZWF0ZUNvbXBvbmVudDxOb3RpZmljYXRpb25Db21wb25lbnQ+KHRvYXN0RmFjdG9yeSk7XG4gICAgICAgIGNvbnN0IHRvYXN0OiBOb3RpZmljYXRpb25Db21wb25lbnQgPSByZWYuaW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IGRpc21pc3NGbiA9IHRoaXMuY3JlYXRlRGlzbWlzc0Z1bmN0aW9uKHJlZik7XG4gICAgICAgIHRvYXN0LnR5cGUgPSBjb25maWcudHlwZSB8fCAnaW5mbyc7XG4gICAgICAgIHRvYXN0Lm1lc3NhZ2UgPSBjb25maWcubWVzc2FnZTtcbiAgICAgICAgdG9hc3QudHJhbnNsYXRpb25WYXJzID0gdGhpcy50cmFuc2xhdGVUcmFuc2xhdGlvblZhcnMoY29uZmlnLnRyYW5zbGF0aW9uVmFycyB8fCB7fSk7XG4gICAgICAgIHRvYXN0LnJlZ2lzdGVyT25DbGlja0ZuKGRpc21pc3NGbik7XG5cbiAgICAgICAgbGV0IHRpbWVySWQ7XG4gICAgICAgIGlmICghY29uZmlnLmR1cmF0aW9uIHx8IDAgPCBjb25maWcuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KGRpc21pc3NGbiwgY29uZmlnLmR1cmF0aW9uIHx8IFRPQVNUX0RVUkFUSU9OKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlblRvYXN0UmVmcy51bnNoaWZ0KHsgcmVmLCB0aW1lcklkIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2FsY3VsYXRlUG9zaXRpb25zKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCB3aWxsIGRlc3Ryb3kgdGhlIHRvYXN0IGNvbXBvbmVudCBhbmRcbiAgICAgKiByZW1vdmUgaXQgZnJvbSB0aGUgb3BlblRvYXN0UmVmcyBhcnJheS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZURpc21pc3NGdW5jdGlvbihyZWY6IENvbXBvbmVudFJlZjxOb3RpZmljYXRpb25Db21wb25lbnQ+KTogKCkgPT4gdm9pZCB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2FzdDogTm90aWZpY2F0aW9uQ29tcG9uZW50ID0gcmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wZW5Ub2FzdFJlZnMubWFwKG8gPT4gby5yZWYpLmluZGV4T2YocmVmKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3BlblRvYXN0UmVmc1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5vcGVuVG9hc3RSZWZzW2luZGV4XS50aW1lcklkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9hc3QuZmFkZU91dCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlZi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuVG9hc3RSZWZzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBhbmQgc2V0IHRoZSB0b3Agb2Zmc2V0cyBmb3IgZWFjaCBvZiB0aGUgb3BlbiB0b2FzdHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQb3NpdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBjdW11bGF0aXZlSGVpZ2h0ID0gMTA7XG5cbiAgICAgICAgdGhpcy5vcGVuVG9hc3RSZWZzLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRvYXN0OiBOb3RpZmljYXRpb25Db21wb25lbnQgPSBvYmoucmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgdG9hc3Qub2Zmc2V0VG9wID0gY3VtdWxhdGl2ZUhlaWdodDtcbiAgICAgICAgICAgIGN1bXVsYXRpdmVIZWlnaHQgKz0gdG9hc3QuZ2V0SGVpZ2h0KCkgKyA2O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYW5zbGF0ZVRyYW5zbGF0aW9uVmFycyh0cmFuc2xhdGlvblZhcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0pOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcbiAgICB9IHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHRyYW5zbGF0aW9uVmFycykpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFyc1trZXldID0gdGhpcy5pMThuU2VydmljZS50cmFuc2xhdGUodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb25WYXJzO1xuICAgIH1cbn1cbiJdfQ==