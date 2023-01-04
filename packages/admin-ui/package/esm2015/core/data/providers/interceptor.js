import { HttpErrorResponse, HttpResponse, } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DEFAULT_AUTH_TOKEN_HEADER_KEY } from '@vendure/common/lib/shared-constants';
import { switchMap, tap } from 'rxjs/operators';
import { getAppConfig } from '../../app.config';
import { AuthService } from '../../providers/auth/auth.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { NotificationService } from '../../providers/notification/notification.service';
import { DataService } from '../providers/data.service';
export const AUTH_REDIRECT_PARAM = 'redirectTo';
/**
 * The default interceptor examines all HTTP requests & responses and automatically updates the requesting state
 * and shows error notifications.
 */
export class DefaultInterceptor {
    constructor(dataService, injector, authService, router, localStorageService) {
        this.dataService = dataService;
        this.injector = injector;
        this.authService = authService;
        this.router = router;
        this.localStorageService = localStorageService;
        this.tokenMethod = 'cookie';
        this.tokenMethod = getAppConfig().tokenMethod;
        this.authTokenHeaderKey = getAppConfig().authTokenHeaderKey || DEFAULT_AUTH_TOKEN_HEADER_KEY;
    }
    intercept(req, next) {
        this.dataService.client.startRequest().subscribe();
        return this.dataService.client.uiState().single$.pipe(switchMap(({ uiState }) => {
            var _a;
            const request = req.clone({
                setParams: {
                    languageCode: (_a = uiState === null || uiState === void 0 ? void 0 : uiState.contentLanguage) !== null && _a !== void 0 ? _a : '',
                },
            });
            return next.handle(request);
        }), tap(event => {
            if (event instanceof HttpResponse) {
                this.checkForAuthToken(event);
                this.notifyOnError(event);
                this.dataService.client.completeRequest().subscribe();
            }
        }, err => {
            if (err instanceof HttpErrorResponse) {
                this.notifyOnError(err);
                this.dataService.client.completeRequest().subscribe();
            }
            else {
                this.displayErrorNotification(err.message);
            }
        }));
    }
    notifyOnError(response) {
        var _a, _b, _c;
        if (response instanceof HttpErrorResponse) {
            if (response.status === 0) {
                const { apiHost, apiPort } = getAppConfig();
                this.displayErrorNotification(_(`error.could-not-connect-to-server`), {
                    url: `${apiHost}:${apiPort}`,
                });
            }
            else if (response.status === 503 && ((_a = response.url) === null || _a === void 0 ? void 0 : _a.endsWith('/health'))) {
                this.displayErrorNotification(_(`error.health-check-failed`));
            }
            else {
                this.displayErrorNotification(this.extractErrorFromHttpResponse(response));
            }
        }
        else {
            // GraphQL errors still return 200 OK responses, but have the actual error message
            // inside the body of the response.
            const graqhQLErrors = response.body.errors;
            if (graqhQLErrors && Array.isArray(graqhQLErrors)) {
                const firstCode = (_c = (_b = graqhQLErrors[0]) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.code;
                if (firstCode === 'FORBIDDEN') {
                    this.authService.logOut().subscribe(() => {
                        if (!window.location.pathname.includes('login')) {
                            const path = graqhQLErrors[0].path.join(' > ');
                            this.displayErrorNotification(_(`error.403-forbidden`), { path });
                        }
                        this.router.navigate(['/login'], {
                            queryParams: {
                                [AUTH_REDIRECT_PARAM]: btoa(this.router.url),
                            },
                        });
                    });
                }
                else if (firstCode === 'CHANNEL_NOT_FOUND') {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    this.displayErrorNotification(message);
                    this.localStorageService.remove('activeChannelToken');
                }
                else {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    this.displayErrorNotification(message);
                }
            }
        }
    }
    extractErrorFromHttpResponse(response) {
        const errors = response.error.errors;
        if (Array.isArray(errors)) {
            return errors.map(e => e.message).join('\n');
        }
        else {
            return response.message;
        }
    }
    /**
     * We need to lazily inject the NotificationService since it depends on the I18nService which
     * eventually depends on the HttpClient (used to load messages from json files). If we were to
     * directly inject NotificationService into the constructor, we get a cyclic dependency.
     */
    displayErrorNotification(message, vars) {
        const notificationService = this.injector.get(NotificationService);
        notificationService.error(message, vars);
    }
    /**
     * If the server is configured to use the "bearer" tokenMethod, each response should be checked
     * for the existence of an auth token.
     */
    checkForAuthToken(response) {
        if (this.tokenMethod === 'bearer') {
            const authToken = response.headers.get(this.authTokenHeaderKey);
            if (authToken) {
                this.localStorageService.set('authToken', authToken);
            }
        }
    }
}
DefaultInterceptor.decorators = [
    { type: Injectable }
];
DefaultInterceptor.ctorParameters = () => [
    { type: DataService },
    { type: Injector },
    { type: AuthService },
    { type: Router },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvcHJvdmlkZXJzL2ludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFLakIsWUFBWSxHQUNmLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFHckYsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxZQUFZLENBQUM7QUFFaEQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGtCQUFrQjtJQUkzQixZQUNZLFdBQXdCLEVBQ3hCLFFBQWtCLEVBQ2xCLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxtQkFBd0M7UUFKeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixX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QVJYLE1BQU07WUFTTixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEh0dHBFcnJvclJlc3BvbnNlLFxuICAgIEh0dHBFdmVudCxcbiAgICBIdHRwSGFuZGxlcixcbiAgICBIdHRwSW50ZXJjZXB0b3IsXG4gICAgSHR0cFJlcXVlc3QsXG4gICAgSHR0cFJlc3BvbnNlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IERFRkFVTFRfQVVUSF9UT0tFTl9IRUFERVJfS0VZIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtY29uc3RhbnRzJztcbmltcG9ydCB7IEFkbWluVWlDb25maWcgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZ2V0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9hdXRoL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBBVVRIX1JFRElSRUNUX1BBUkFNID0gJ3JlZGlyZWN0VG8nO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGludGVyY2VwdG9yIGV4YW1pbmVzIGFsbCBIVFRQIHJlcXVlc3RzICYgcmVzcG9uc2VzIGFuZCBhdXRvbWF0aWNhbGx5IHVwZGF0ZXMgdGhlIHJlcXVlc3Rpbmcgc3RhdGVcbiAqIGFuZCBzaG93cyBlcnJvciBub3RpZmljYXRpb25zLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVmYXVsdEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRva2VuTWV0aG9kOiBBZG1pblVpQ29uZmlnWyd0b2tlbk1ldGhvZCddID0gJ2Nvb2tpZSc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoVG9rZW5IZWFkZXJLZXk6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMudG9rZW5NZXRob2QgPSBnZXRBcHBDb25maWcoKS50b2tlbk1ldGhvZDtcbiAgICAgICAgdGhpcy5hdXRoVG9rZW5IZWFkZXJLZXkgPSBnZXRBcHBDb25maWcoKS5hdXRoVG9rZW5IZWFkZXJLZXkgfHwgREVGQVVMVF9BVVRIX1RPS0VOX0hFQURFUl9LRVk7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnN0YXJ0UmVxdWVzdCgpLnN1YnNjcmliZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jbGllbnQudWlTdGF0ZSgpLnNpbmdsZSQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoeyB1aVN0YXRlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gcmVxLmNsb25lKHtcbiAgICAgICAgICAgICAgICAgICAgc2V0UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGU6IHVpU3RhdGU/LmNvbnRlbnRMYW5ndWFnZSA/PyAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcChcbiAgICAgICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvckF1dGhUb2tlbihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeU9uRXJyb3IoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jbGllbnQuY29tcGxldGVSZXF1ZXN0KCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlPbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC5jb21wbGV0ZVJlcXVlc3QoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yTm90aWZpY2F0aW9uKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgbm90aWZ5T25FcnJvcihyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4gfCBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgYXBpSG9zdCwgYXBpUG9ydCB9ID0gZ2V0QXBwQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JOb3RpZmljYXRpb24oXyhgZXJyb3IuY291bGQtbm90LWNvbm5lY3QtdG8tc2VydmVyYCksIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgJHthcGlIb3N0fToke2FwaVBvcnR9YCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA1MDMgJiYgcmVzcG9uc2UudXJsPy5lbmRzV2l0aCgnL2hlYWx0aCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JOb3RpZmljYXRpb24oXyhgZXJyb3IuaGVhbHRoLWNoZWNrLWZhaWxlZGApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JOb3RpZmljYXRpb24odGhpcy5leHRyYWN0RXJyb3JGcm9tSHR0cFJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBHcmFwaFFMIGVycm9ycyBzdGlsbCByZXR1cm4gMjAwIE9LIHJlc3BvbnNlcywgYnV0IGhhdmUgdGhlIGFjdHVhbCBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAvLyBpbnNpZGUgdGhlIGJvZHkgb2YgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgY29uc3QgZ3JhcWhRTEVycm9ycyA9IHJlc3BvbnNlLmJvZHkuZXJyb3JzO1xuICAgICAgICAgICAgaWYgKGdyYXFoUUxFcnJvcnMgJiYgQXJyYXkuaXNBcnJheShncmFxaFFMRXJyb3JzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q29kZTogc3RyaW5nID0gZ3JhcWhRTEVycm9yc1swXT8uZXh0ZW5zaW9ucz8uY29kZTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RDb2RlID09PSAnRk9SQklEREVOJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ091dCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygnbG9naW4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBncmFxaFFMRXJyb3JzWzBdLnBhdGguam9pbignID4gJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JOb3RpZmljYXRpb24oXyhgZXJyb3IuNDAzLWZvcmJpZGRlbmApLCB7IHBhdGggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0FVVEhfUkVESVJFQ1RfUEFSQU1dOiBidG9hKHRoaXMucm91dGVyLnVybCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0Q29kZSA9PT0gJ0NIQU5ORUxfTk9UX0ZPVU5EJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZ3JhcWhRTEVycm9ycy5tYXAoZXJyID0+IGVyci5tZXNzYWdlKS5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JOb3RpZmljYXRpb24obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2FjdGl2ZUNoYW5uZWxUb2tlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBncmFxaFFMRXJyb3JzLm1hcChlcnIgPT4gZXJyLm1lc3NhZ2UpLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvck5vdGlmaWNhdGlvbihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RFcnJvckZyb21IdHRwUmVzcG9uc2UocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzcG9uc2UuZXJyb3IuZXJyb3JzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcnMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLm1hcChlID0+IGUubWVzc2FnZSkuam9pbignXFxuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UubWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIG5lZWQgdG8gbGF6aWx5IGluamVjdCB0aGUgTm90aWZpY2F0aW9uU2VydmljZSBzaW5jZSBpdCBkZXBlbmRzIG9uIHRoZSBJMThuU2VydmljZSB3aGljaFxuICAgICAqIGV2ZW50dWFsbHkgZGVwZW5kcyBvbiB0aGUgSHR0cENsaWVudCAodXNlZCB0byBsb2FkIG1lc3NhZ2VzIGZyb20ganNvbiBmaWxlcykuIElmIHdlIHdlcmUgdG9cbiAgICAgKiBkaXJlY3RseSBpbmplY3QgTm90aWZpY2F0aW9uU2VydmljZSBpbnRvIHRoZSBjb25zdHJ1Y3Rvciwgd2UgZ2V0IGEgY3ljbGljIGRlcGVuZGVuY3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkaXNwbGF5RXJyb3JOb3RpZmljYXRpb24obWVzc2FnZTogc3RyaW5nLCB2YXJzPzogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgICAgICBjb25zdCBub3RpZmljYXRpb25TZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQ8Tm90aWZpY2F0aW9uU2VydmljZT4oTm90aWZpY2F0aW9uU2VydmljZSk7XG4gICAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdmFycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHNlcnZlciBpcyBjb25maWd1cmVkIHRvIHVzZSB0aGUgXCJiZWFyZXJcIiB0b2tlbk1ldGhvZCwgZWFjaCByZXNwb25zZSBzaG91bGQgYmUgY2hlY2tlZFxuICAgICAqIGZvciB0aGUgZXhpc3RlbmNlIG9mIGFuIGF1dGggdG9rZW4uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0ZvckF1dGhUb2tlbihyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMudG9rZW5NZXRob2QgPT09ICdiZWFyZXInKSB7XG4gICAgICAgICAgICBjb25zdCBhdXRoVG9rZW4gPSByZXNwb25zZS5oZWFkZXJzLmdldCh0aGlzLmF1dGhUb2tlbkhlYWRlcktleSk7XG4gICAgICAgICAgICBpZiAoYXV0aFRva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYXV0aFRva2VuJywgYXV0aFRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==