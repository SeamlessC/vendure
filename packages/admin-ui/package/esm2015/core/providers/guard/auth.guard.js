import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { getAppConfig } from '../../app.config';
import { AuthService } from '../auth/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../auth/auth.service";
/**
 * This guard prevents unauthorized users from accessing any routes which require
 * authorization.
 */
export class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.externalLoginUrl = getAppConfig().loginUrl;
    }
    canActivate(route) {
        return this.authService.checkAuthenticatedStatus().pipe(tap(authenticated => {
            if (!authenticated) {
                if (this.externalLoginUrl) {
                    window.location.href = this.externalLoginUrl;
                }
                else {
                    this.router.navigate(['/login']);
                }
            }
        }));
    }
}
AuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.AuthService)); }, token: AuthGuard, providedIn: "root" });
AuthGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AuthGuard.ctorParameters = () => [
    { type: Router },
    { type: AuthService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL2d1YXJkL2F1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVDLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTlFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRW5EOzs7R0FHRztBQUlILE1BQU0sT0FBTyxTQUFTO0lBR2xCLFlBQW9CLE1BQWMsRUFBVSxXQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDaEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNwRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQTZCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLElBQUksQ0FDbkQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7aUJBQ2hEO3FCQUFNO29CQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDOzs7O1lBdEJKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBYjZDLE1BQU07WUFLM0MsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBnZXRBcHBDb25maWcgfSBmcm9tICcuLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgZ3VhcmQgcHJldmVudHMgdW5hdXRob3JpemVkIHVzZXJzIGZyb20gYWNjZXNzaW5nIGFueSByb3V0ZXMgd2hpY2ggcmVxdWlyZVxuICogYXV0aG9yaXphdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZXh0ZXJuYWxMb2dpblVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbExvZ2luVXJsID0gZ2V0QXBwQ29uZmlnKCkubG9naW5Vcmw7XG4gICAgfVxuXG4gICAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuY2hlY2tBdXRoZW50aWNhdGVkU3RhdHVzKCkucGlwZShcbiAgICAgICAgICAgIHRhcChhdXRoZW50aWNhdGVkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZXh0ZXJuYWxMb2dpblVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmV4dGVybmFsTG9naW5Vcmw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==