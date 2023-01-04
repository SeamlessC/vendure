import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
export class ProfileResolver extends BaseEntityResolver {
    constructor(router, dataService) {
        super(router, {
            __typename: 'Administrator',
            id: '',
            createdAt: '',
            updatedAt: '',
            emailAddress: '',
            firstName: '',
            lastName: '',
            user: { roles: [] },
        }, id => dataService.administrator
            .getActiveAdministrator()
            .mapStream(data => data.activeAdministrator));
    }
}
ProfileResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProfileResolver_Factory() { return new ProfileResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ProfileResolver, providedIn: "root" });
ProfileResolver.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ProfileResolver.ctorParameters = () => [
    { type: Router },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL3Byb3ZpZGVycy9yb3V0aW5nL3Byb2ZpbGUtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBS3JELE1BQU0sT0FBTyxlQUFnQixTQUFRLGtCQUEwQztJQUMzRSxZQUFZLE1BQWMsRUFBRSxXQUF3QjtRQUNoRCxLQUFLLENBQ0QsTUFBTSxFQUNOO1lBQ0ksVUFBVSxFQUFFLGVBQWtDO1lBQzlDLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7WUFDWixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFTO1NBQzdCLEVBQ0QsRUFBRSxDQUFDLEVBQUUsQ0FDRCxXQUFXLENBQUMsYUFBYTthQUNwQixzQkFBc0IsRUFBRTthQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FDdkQsQ0FBQztJQUNOLENBQUM7Ozs7WUF0QkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFQUSxNQUFNO1lBR04sV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlRW50aXR5UmVzb2x2ZXIgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEFkbWluaXN0cmF0b3IsIFJvbGUgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVSZXNvbHZlciBleHRlbmRzIEJhc2VFbnRpdHlSZXNvbHZlcjxBZG1pbmlzdHJhdG9yLkZyYWdtZW50PiB7XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3R5cGVuYW1lOiAnQWRtaW5pc3RyYXRvcicgYXMgJ0FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICcnLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogJycsXG4gICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzOiAnJyxcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGxhc3ROYW1lOiAnJyxcbiAgICAgICAgICAgICAgICB1c2VyOiB7IHJvbGVzOiBbXSB9IGFzIGFueSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZCA9PlxuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLmFkbWluaXN0cmF0b3JcbiAgICAgICAgICAgICAgICAgICAgLmdldEFjdGl2ZUFkbWluaXN0cmF0b3IoKVxuICAgICAgICAgICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5hY3RpdmVBZG1pbmlzdHJhdG9yKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=