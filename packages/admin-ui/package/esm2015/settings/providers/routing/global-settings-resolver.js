import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * Resolves the global settings.
 */
export class GlobalSettingsResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, 
        // we will never be creating a new GlobalSettings entity, so this part is not used.
        {}, () => dataService.settings.getGlobalSettings().mapStream(data => data.globalSettings));
    }
}
GlobalSettingsResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalSettingsResolver_Factory() { return new GlobalSettingsResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: GlobalSettingsResolver, providedIn: "root" });
GlobalSettingsResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
GlobalSettingsResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXNldHRpbmdzLXJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvcHJvdmlkZXJzL3JvdXRpbmcvZ2xvYmFsLXNldHRpbmdzLXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUVyRDs7R0FFRztBQUlILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxrQkFBb0Q7SUFDNUYsWUFBWSxNQUFjLEVBQUUsV0FBd0I7UUFDaEQsS0FBSyxDQUNELE1BQU07UUFDTixtRkFBbUY7UUFDbkYsRUFBUyxFQUNULEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQ3hGLENBQUM7SUFDTixDQUFDOzs7O1lBWEosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFWUSxNQUFNO1lBR04sV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEdldEdsb2JhbFNldHRpbmdzIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBnbG9iYWwgc2V0dGluZ3MuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbFNldHRpbmdzUmVzb2x2ZXIgZXh0ZW5kcyBCYXNlRW50aXR5UmVzb2x2ZXI8R2V0R2xvYmFsU2V0dGluZ3MuR2xvYmFsU2V0dGluZ3M+IHtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBuZXZlciBiZSBjcmVhdGluZyBhIG5ldyBHbG9iYWxTZXR0aW5ncyBlbnRpdHksIHNvIHRoaXMgcGFydCBpcyBub3QgdXNlZC5cbiAgICAgICAgICAgIHt9IGFzIGFueSxcbiAgICAgICAgICAgICgpID0+IGRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldEdsb2JhbFNldHRpbmdzKCkubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5nbG9iYWxTZXR0aW5ncyksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19