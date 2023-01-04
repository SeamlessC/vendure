import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_UI_VERSION, AuthService, AUTH_REDIRECT_PARAM, getAppConfig } from '@vendure/admin-ui/core';
export class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.username = '';
        this.password = '';
        this.rememberMe = false;
        this.version = ADMIN_UI_VERSION;
        this.brand = getAppConfig().brand;
        this.hideVendureBranding = getAppConfig().hideVendureBranding;
        this.hideVersion = getAppConfig().hideVersion;
    }
    logIn() {
        this.errorMessage = undefined;
        this.authService.logIn(this.username, this.password, this.rememberMe).subscribe(result => {
            switch (result.__typename) {
                case 'CurrentUser':
                    const redirect = this.getRedirectRoute();
                    this.router.navigateByUrl(redirect ? redirect : '/');
                    break;
                case 'InvalidCredentialsError':
                case 'NativeAuthStrategyError':
                    this.errorMessage = result.message;
                    break;
            }
        });
    }
    /**
     * Attempts to read a redirect param from the current url and parse it into a
     * route from which the user was redirected after a 401 error.
     */
    getRedirectRoute() {
        let redirectTo;
        const re = new RegExp(`${AUTH_REDIRECT_PARAM}=(.*)`);
        try {
            const redirectToParam = window.location.search.match(re);
            if (redirectToParam && 1 < redirectToParam.length) {
                redirectTo = atob(decodeURIComponent(redirectToParam[1]));
            }
        }
        catch (e) {
            // ignore
        }
        return redirectTo;
    }
}
LoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-login',
                template: "<div class=\"login-wrapper\">\n    <form class=\"login\">\n        <label class=\"title\">\n            <img src=\"assets/logo-300px.png\" />\n            <span *ngIf=\"!hideVendureBranding\">vendure</span>\n        </label>\n        <div class=\"login-group\">\n            <input\n                class=\"username\"\n                type=\"text\"\n                name=\"username\"\n                id=\"login_username\"\n                [(ngModel)]=\"username\"\n                [placeholder]=\"'common.username' | translate\"\n            />\n            <input\n                class=\"password\"\n                name=\"password\"\n                type=\"password\"\n                id=\"login_password\"\n                [(ngModel)]=\"password\"\n                [placeholder]=\"'common.password' | translate\"\n            />\n            <clr-alert [clrAlertType]=\"'danger'\"  [clrAlertClosable]=\"false\" [class.visible]=\"errorMessage\" class=\"login-error\">\n                <clr-alert-item>\n                    <span class=\"alert-text\">\n                        {{ errorMessage }}\n                    </span>\n                </clr-alert-item>\n            </clr-alert>\n            <clr-checkbox-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrCheckbox\n                    id=\"rememberme\"\n                    name=\"rememberme\"\n                    [(ngModel)]=\"rememberMe\"\n                />\n                <label>{{ 'common.remember-me' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <button\n                type=\"submit\"\n                class=\"btn btn-primary\"\n                (click)=\"logIn()\"\n                [disabled]=\"!username || !password\"\n            >\n                {{ 'common.login' | translate }}\n            </button>\n        </div>\n        <div class=\"version\">\n            <span *ngIf=\"brand\">{{ brand }} <span *ngIf=\"!hideVendureBranding || !hideVersion\">-</span></span>\n            <span *ngIf=\"!hideVendureBranding\">vendure</span>\n            <span *ngIf=\"!hideVersion\">v{{ version }}</span>\n        </div>\n    </form>\n</div>\n",
                styles: [".login-wrapper{background-image:linear-gradient(135deg,var(--color-login-gradient-top),var(--color-login-gradient-bottom)),var(--login-page-bg);background-blend-mode:screen;background-repeat:repeat;background-size:auto;background-position:initial;justify-content:center}@media screen and (max-width: 768px){.login-wrapper{justify-content:center;background-color:transparent}.login-wrapper .login{margin:20px;padding:24px}}.login{margin:5vh 0;border-radius:6px;min-height:calc(100vh - 10vh);max-height:800px}.title{display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:8vh}.title img{max-width:100%;width:150px}.title span{padding-top:12px;font-weight:bold;color:var(--color-primary-500);font-size:38px}.version{flex:1;display:flex;align-items:flex-end;justify-content:center;color:var(--color-grey-300)}.version span+span{margin-left:5px}.login-error{max-height:0;overflow:hidden}.login-error.visible{max-height:46px;transition:max-height .2s;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation-delay:.2s;transform:translate(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@keyframes shake{10%,90%{transform:translate(-1px)}20%,80%{transform:translate(2px)}30%,50%,70%{transform:translate(-4px)}40%,60%{transform:translate(4px)}}\n"]
            },] }
];
LoginComponent.ctorParameters = () => [
    { type: AuthService },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9sb2dpbi9zcmMvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU8xRyxNQUFNLE9BQU8sY0FBYztJQVV2QixZQUFvQixXQUF3QixFQUFVLE1BQWM7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVHBFLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixZQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFFM0IsVUFBSyxHQUFHLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQztRQUM3Qix3QkFBbUIsR0FBRyxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztRQUN6RCxnQkFBVyxHQUFHLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUU4QixDQUFDO0lBRXhFLEtBQUs7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyRixRQUFRLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3ZCLEtBQUssYUFBYTtvQkFDZCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxNQUFNO2dCQUNWLEtBQUsseUJBQXlCLENBQUM7Z0JBQy9CLEtBQUsseUJBQXlCO29CQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ25DLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGdCQUFnQjtRQUNwQixJQUFJLFVBQThCLENBQUM7UUFDbkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxtQkFBbUIsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSTtZQUNBLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLGVBQWUsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDL0MsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLFNBQVM7U0FDWjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7OztZQWpESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLHNwRUFBcUM7O2FBRXhDOzs7WUFOMEIsV0FBVztZQUQ3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQURNSU5fVUlfVkVSU0lPTiwgQXV0aFNlcnZpY2UsIEFVVEhfUkVESVJFQ1RfUEFSQU0sIGdldEFwcENvbmZpZyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1sb2dpbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XG4gICAgdXNlcm5hbWUgPSAnJztcbiAgICBwYXNzd29yZCA9ICcnO1xuICAgIHJlbWVtYmVyTWUgPSBmYWxzZTtcbiAgICB2ZXJzaW9uID0gQURNSU5fVUlfVkVSU0lPTjtcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBicmFuZCA9IGdldEFwcENvbmZpZygpLmJyYW5kO1xuICAgIGhpZGVWZW5kdXJlQnJhbmRpbmcgPSBnZXRBcHBDb25maWcoKS5oaWRlVmVuZHVyZUJyYW5kaW5nO1xuICAgIGhpZGVWZXJzaW9uID0gZ2V0QXBwQ29uZmlnKCkuaGlkZVZlcnNpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIGxvZ0luKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dJbih0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkLCB0aGlzLnJlbWVtYmVyTWUpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0N1cnJlbnRVc2VyJzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB0aGlzLmdldFJlZGlyZWN0Um91dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChyZWRpcmVjdCA/IHJlZGlyZWN0IDogJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSW52YWxpZENyZWRlbnRpYWxzRXJyb3InOlxuICAgICAgICAgICAgICAgIGNhc2UgJ05hdGl2ZUF1dGhTdHJhdGVneUVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIHJlYWQgYSByZWRpcmVjdCBwYXJhbSBmcm9tIHRoZSBjdXJyZW50IHVybCBhbmQgcGFyc2UgaXQgaW50byBhXG4gICAgICogcm91dGUgZnJvbSB3aGljaCB0aGUgdXNlciB3YXMgcmVkaXJlY3RlZCBhZnRlciBhIDQwMSBlcnJvci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlZGlyZWN0Um91dGUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IHJlZGlyZWN0VG86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKGAke0FVVEhfUkVESVJFQ1RfUEFSQU19PSguKilgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0VG9QYXJhbSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2gocmUpO1xuICAgICAgICAgICAgaWYgKHJlZGlyZWN0VG9QYXJhbSAmJiAxIDwgcmVkaXJlY3RUb1BhcmFtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG8gPSBhdG9iKGRlY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFRvUGFyYW1bMV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0VG87XG4gICAgfVxufVxuIl19