import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@vendure/admin-ui/core";
/**
 * This guard prevents loggen-in users from navigating to the login screen.
 */
export class LoginGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate(route) {
        return this.authService.checkAuthenticatedStatus().pipe(map(authenticated => {
            if (authenticated) {
                this.router.navigate(['/']);
            }
            return !authenticated;
        }));
    }
}
LoginGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function LoginGuard_Factory() { return new LoginGuard(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.AuthService)); }, token: LoginGuard, providedIn: "root" });
LoginGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
LoginGuard.ctorParameters = () => [
    { type: Router },
    { type: AuthService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2xvZ2luL3NyYy9wcm92aWRlcnMvbG9naW4uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVDLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFckM7O0dBRUc7QUFJSCxNQUFNLE9BQU8sVUFBVTtJQUNuQixZQUFvQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUV4RSxXQUFXLENBQUMsS0FBNkI7UUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQzs7OztZQWZKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBVjZDLE1BQU07WUFDM0MsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBUaGlzIGd1YXJkIHByZXZlbnRzIGxvZ2dlbi1pbiB1c2VycyBmcm9tIG5hdmlnYXRpbmcgdG8gdGhlIGxvZ2luIHNjcmVlbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge31cblxuICAgIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmNoZWNrQXV0aGVudGljYXRlZFN0YXR1cygpLnBpcGUoXG4gICAgICAgICAgICBtYXAoYXV0aGVudGljYXRlZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWF1dGhlbnRpY2F0ZWQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=