(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@vendure/admin-ui/core'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/login', ['exports', '@angular/core', '@angular/router', '@vendure/admin-ui/core', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].login = {}), global.ng.core, global.ng.router, global.vendure['admin-ui'].core, global.rxjs.operators));
}(this, (function (exports, i0, i1, i2, operators) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var LoginComponent = /** @class */ (function () {
        function LoginComponent(authService, router) {
            this.authService = authService;
            this.router = router;
            this.username = '';
            this.password = '';
            this.rememberMe = false;
            this.version = i2.ADMIN_UI_VERSION;
            this.brand = i2.getAppConfig().brand;
            this.hideVendureBranding = i2.getAppConfig().hideVendureBranding;
            this.hideVersion = i2.getAppConfig().hideVersion;
        }
        LoginComponent.prototype.logIn = function () {
            var _this = this;
            this.errorMessage = undefined;
            this.authService.logIn(this.username, this.password, this.rememberMe).subscribe(function (result) {
                switch (result.__typename) {
                    case 'CurrentUser':
                        var redirect = _this.getRedirectRoute();
                        _this.router.navigateByUrl(redirect ? redirect : '/');
                        break;
                    case 'InvalidCredentialsError':
                    case 'NativeAuthStrategyError':
                        _this.errorMessage = result.message;
                        break;
                }
            });
        };
        /**
         * Attempts to read a redirect param from the current url and parse it into a
         * route from which the user was redirected after a 401 error.
         */
        LoginComponent.prototype.getRedirectRoute = function () {
            var redirectTo;
            var re = new RegExp(i2.AUTH_REDIRECT_PARAM + "=(.*)");
            try {
                var redirectToParam = window.location.search.match(re);
                if (redirectToParam && 1 < redirectToParam.length) {
                    redirectTo = atob(decodeURIComponent(redirectToParam[1]));
                }
            }
            catch (e) {
                // ignore
            }
            return redirectTo;
        };
        return LoginComponent;
    }());
    LoginComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-login',
                    template: "<div class=\"login-wrapper\">\n    <form class=\"login\">\n        <label class=\"title\">\n            <img src=\"assets/logo-300px.png\" />\n            <span *ngIf=\"!hideVendureBranding\">vendure</span>\n        </label>\n        <div class=\"login-group\">\n            <input\n                class=\"username\"\n                type=\"text\"\n                name=\"username\"\n                id=\"login_username\"\n                [(ngModel)]=\"username\"\n                [placeholder]=\"'common.username' | translate\"\n            />\n            <input\n                class=\"password\"\n                name=\"password\"\n                type=\"password\"\n                id=\"login_password\"\n                [(ngModel)]=\"password\"\n                [placeholder]=\"'common.password' | translate\"\n            />\n            <clr-alert [clrAlertType]=\"'danger'\"  [clrAlertClosable]=\"false\" [class.visible]=\"errorMessage\" class=\"login-error\">\n                <clr-alert-item>\n                    <span class=\"alert-text\">\n                        {{ errorMessage }}\n                    </span>\n                </clr-alert-item>\n            </clr-alert>\n            <clr-checkbox-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrCheckbox\n                    id=\"rememberme\"\n                    name=\"rememberme\"\n                    [(ngModel)]=\"rememberMe\"\n                />\n                <label>{{ 'common.remember-me' | translate }}</label>\n            </clr-checkbox-wrapper>\n            <button\n                type=\"submit\"\n                class=\"btn btn-primary\"\n                (click)=\"logIn()\"\n                [disabled]=\"!username || !password\"\n            >\n                {{ 'common.login' | translate }}\n            </button>\n        </div>\n        <div class=\"version\">\n            <span *ngIf=\"brand\">{{ brand }} <span *ngIf=\"!hideVendureBranding || !hideVersion\">-</span></span>\n            <span *ngIf=\"!hideVendureBranding\">vendure</span>\n            <span *ngIf=\"!hideVersion\">v{{ version }}</span>\n        </div>\n    </form>\n</div>\n",
                    styles: [".login-wrapper{background-image:linear-gradient(135deg,var(--color-login-gradient-top),var(--color-login-gradient-bottom)),var(--login-page-bg);background-blend-mode:screen;background-repeat:repeat;background-size:auto;background-position:initial;justify-content:center}@media screen and (max-width: 768px){.login-wrapper{justify-content:center;background-color:transparent}.login-wrapper .login{margin:20px;padding:24px}}.login{margin:5vh 0;border-radius:6px;min-height:calc(100vh - 10vh);max-height:800px}.title{display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:8vh}.title img{max-width:100%;width:150px}.title span{padding-top:12px;font-weight:bold;color:var(--color-primary-500);font-size:38px}.version{flex:1;display:flex;align-items:flex-end;justify-content:center;color:var(--color-grey-300)}.version span+span{margin-left:5px}.login-error{max-height:0;overflow:hidden}.login-error.visible{max-height:46px;transition:max-height .2s;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation-delay:.2s;transform:translate(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@keyframes shake{10%,90%{transform:translate(-1px)}20%,80%{transform:translate(2px)}30%,50%,70%{transform:translate(-4px)}40%,60%{transform:translate(4px)}}\n"]
                },] }
    ];
    LoginComponent.ctorParameters = function () { return [
        { type: i2.AuthService },
        { type: i1.Router }
    ]; };

    /**
     * This guard prevents loggen-in users from navigating to the login screen.
     */
    var LoginGuard = /** @class */ (function () {
        function LoginGuard(router, authService) {
            this.router = router;
            this.authService = authService;
        }
        LoginGuard.prototype.canActivate = function (route) {
            var _this = this;
            return this.authService.checkAuthenticatedStatus().pipe(operators.map(function (authenticated) {
                if (authenticated) {
                    _this.router.navigate(['/']);
                }
                return !authenticated;
            }));
        };
        return LoginGuard;
    }());
    LoginGuard.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function LoginGuard_Factory() { return new LoginGuard(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.AuthService)); }, token: LoginGuard, providedIn: "root" });
    LoginGuard.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    LoginGuard.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.AuthService }
    ]; };

    var loginRoutes = [
        {
            path: '',
            component: LoginComponent,
            pathMatch: 'full',
            canActivate: [LoginGuard],
        },
    ];

    var LoginModule = /** @class */ (function () {
        function LoginModule() {
        }
        return LoginModule;
    }());
    LoginModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.SharedModule, i1.RouterModule.forChild(loginRoutes)],
                    exports: [],
                    declarations: [LoginComponent],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.LoginComponent = LoginComponent;
    exports.LoginGuard = LoginGuard;
    exports.LoginModule = LoginModule;
    exports.loginRoutes = loginRoutes;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-login.umd.js.map
