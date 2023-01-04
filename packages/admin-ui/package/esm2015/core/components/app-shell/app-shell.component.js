import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { getAppConfig } from '../../app.config';
import { DataService } from '../../data/providers/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { I18nService } from '../../providers/i18n/i18n.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { ModalService } from '../../providers/modal/modal.service';
import { UiLanguageSwitcherDialogComponent } from '../ui-language-switcher-dialog/ui-language-switcher-dialog.component';
export class AppShellComponent {
    constructor(authService, dataService, router, i18nService, modalService, localStorageService) {
        this.authService = authService;
        this.dataService = dataService;
        this.router = router;
        this.i18nService = i18nService;
        this.modalService = modalService;
        this.localStorageService = localStorageService;
        this.availableLanguages = [];
        this.hideVendureBranding = getAppConfig().hideVendureBranding;
    }
    ngOnInit() {
        this.userName$ = this.dataService.client
            .userStatus()
            .single$.pipe(map(data => data.userStatus.username));
        this.uiLanguageAndLocale$ = this.dataService.client
            .uiState()
            .stream$.pipe(map(({ uiState }) => { var _a; return [uiState.language, (_a = uiState.locale) !== null && _a !== void 0 ? _a : undefined]; }));
        this.availableLanguages = this.i18nService.availableLanguages;
        this.isChannelOpen$ = this.dataService.settings
            .getActiveChannel()
            .single$.pipe(map((data) => data.activeChannel.customFields.isOpen));
    }
    selectUiLanguage() {
        this.uiLanguageAndLocale$
            .pipe(take(1), switchMap(([currentLanguage, currentLocale]) => this.modalService.fromComponent(UiLanguageSwitcherDialogComponent, {
            closable: true,
            size: 'lg',
            locals: {
                availableLanguages: this.availableLanguages,
                currentLanguage,
                currentLocale,
            },
        })), switchMap(result => result ? this.dataService.client.setUiLanguage(result[0], result[1]) : EMPTY))
            .subscribe(result => {
            var _a;
            if (result.setUiLanguage) {
                this.i18nService.setLanguage(result.setUiLanguage);
                this.localStorageService.set('uiLanguageCode', result.setUiLanguage);
                this.localStorageService.set('uiLocale', (_a = result.setUiLocale) !== null && _a !== void 0 ? _a : undefined);
            }
        });
    }
    toggleChannelOpenClosedSwitch(isOpen) {
        const activeChannelId$ = this.dataService.client
            .userStatus()
            .mapSingle(({ userStatus }) => userStatus.activeChannelId);
        activeChannelId$.subscribe(activeChannelId => {
            const input = {
                id: activeChannelId,
                customFields: {
                    isOpen,
                },
            };
            this.dataService.settings.updateChannel(input).subscribe();
        });
    }
    logOut() {
        this.authService.logOut().subscribe(() => {
            const { loginUrl } = getAppConfig();
            if (loginUrl) {
                window.location.href = loginUrl;
            }
            else {
                this.router.navigate(['/login']);
            }
        });
    }
}
AppShellComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-app-shell',
                template: "<clr-main-container>\n    <clr-header [ngStyle]=\"{ background: openCloseToggle.checked ? '#02b302' : '#ff3535' }\">\n        <div class=\"branding\">\n            <a [routerLink]=\"['/']\"><img src=\"assets/crepe_runner_logo.png\" class=\"logo\" /></a>\n        </div>\n        <div class=\"header-nav\"></div>\n        <div class=\"header-actions\">\n            <!-- <vdr-datetime-picker></vdr-datetime-picker> -->\n            <clr-toggle-wrapper>\n                <input\n                    #openCloseToggle\n                    type=\"checkbox\"\n                    (change)=\"toggleChannelOpenClosedSwitch(openCloseToggle.checked)\"\n                    [checked]=\"isChannelOpen$ | async\"\n                    clrToggle\n                    name=\"enabled\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"openCloseToggle.checked; else closed\"\n                        ><span style=\"color: white\">Open</span></ng-container\n                    >\n                    <ng-template #closed><span style=\"color: white\">Closed</span></ng-template>\n                </label>\n            </clr-toggle-wrapper>\n            <vdr-channel-switcher *vdrIfMultichannel></vdr-channel-switcher>\n            <vdr-user-menu\n                [userName]=\"userName$ | async\"\n                [uiLanguageAndLocale]=\"uiLanguageAndLocale$ | async\"\n                [availableLanguages]=\"availableLanguages\"\n                (selectUiLanguage)=\"selectUiLanguage()\"\n                (logOut)=\"logOut()\"\n            ></vdr-user-menu>\n        </div>\n    </clr-header>\n    <nav class=\"subnav\"><vdr-breadcrumb></vdr-breadcrumb></nav>\n\n    <div class=\"content-container\">\n        <div class=\"content-area\"><router-outlet></router-outlet></div>\n        <vdr-main-nav></vdr-main-nav>\n    </div>\n</clr-main-container>\n",
                styles: [".branding{min-width:0}.logo{width:120px}.wordmark{font-weight:bold;margin-left:12px;font-size:24px;color:var(--color-primary-500)}@media screen and (min-width: 768px){vdr-breadcrumb{margin-left:10.8rem}}.header-actions{align-items:center}.content-area{position:relative}::ng-deep .header{background-image:linear-gradient(to right,var(--color-header-gradient-from),var(--color-header-gradient-to))}\n"]
            },] }
];
AppShellComponent.ctorParameters = () => [
    { type: AuthService },
    { type: DataService },
    { type: Router },
    { type: I18nService },
    { type: ModalService },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNoZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy9hcHAtc2hlbGwvYXBwLXNoZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFPekgsTUFBTSxPQUFPLGlCQUFpQjtJQU8xQixZQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxXQUF3QixFQUN4QixZQUEwQixFQUMxQixtQkFBd0M7UUFMeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FB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RztnQkFDVixFQUFFLEVBQUUsZUFBZTtnQkFDbkIsWUFBWSxFQUFFO29CQUNWLE1BQU07aUJBQ1Q7YUFDa0IsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDcEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNwQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBdEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsbzNEQUF5Qzs7YUFFNUM7OztZQVZRLFdBQVc7WUFEWCxXQUFXO1lBTlgsTUFBTTtZQVFOLFdBQVc7WUFFWCxZQUFZO1lBRFosbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldEFwcENvbmZpZyB9IGZyb20gJy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgTGFuZ3VhZ2VDb2RlLCBVcGRhdGVDaGFubmVsSW5wdXQgfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2F1dGgvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEkxOG5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2kxOG4vaTE4bi5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgVWlMYW5ndWFnZVN3aXRjaGVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vdWktbGFuZ3VhZ2Utc3dpdGNoZXItZGlhbG9nL3VpLWxhbmd1YWdlLXN3aXRjaGVyLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hcHAtc2hlbGwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAtc2hlbGwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FwcC1zaGVsbC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBTaGVsbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdXNlck5hbWUkOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gICAgdWlMYW5ndWFnZUFuZExvY2FsZSQ6IE9ic2VydmFibGU8W0xhbmd1YWdlQ29kZSwgc3RyaW5nIHwgdW5kZWZpbmVkXT47XG4gICAgYXZhaWxhYmxlTGFuZ3VhZ2VzOiBMYW5ndWFnZUNvZGVbXSA9IFtdO1xuICAgIGhpZGVWZW5kdXJlQnJhbmRpbmcgPSBnZXRBcHBDb25maWcoKS5oaWRlVmVuZHVyZUJyYW5kaW5nO1xuICAgIGlzQ2hhbm5lbE9wZW4kOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBpMThuU2VydmljZTogSTE4blNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgLnNpbmdsZSQucGlwZShtYXAoZGF0YSA9PiBkYXRhLnVzZXJTdGF0dXMudXNlcm5hbWUpKTtcbiAgICAgICAgdGhpcy51aUxhbmd1YWdlQW5kTG9jYWxlJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudWlTdGF0ZSgpXG4gICAgICAgICAgICAuc3RyZWFtJC5waXBlKG1hcCgoeyB1aVN0YXRlIH0pID0+IFt1aVN0YXRlLmxhbmd1YWdlLCB1aVN0YXRlLmxvY2FsZSA/PyB1bmRlZmluZWRdKSk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlTGFuZ3VhZ2VzID0gdGhpcy5pMThuU2VydmljZS5hdmFpbGFibGVMYW5ndWFnZXM7XG4gICAgICAgIHRoaXMuaXNDaGFubmVsT3BlbiQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0QWN0aXZlQ2hhbm5lbCgpXG4gICAgICAgICAgICAuc2luZ2xlJC5waXBlKG1hcCgoZGF0YTogYW55KSA9PiBkYXRhLmFjdGl2ZUNoYW5uZWwuY3VzdG9tRmllbGRzLmlzT3BlbikpO1xuICAgIH1cblxuICAgIHNlbGVjdFVpTGFuZ3VhZ2UoKSB7XG4gICAgICAgIHRoaXMudWlMYW5ndWFnZUFuZExvY2FsZSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChbY3VycmVudExhbmd1YWdlLCBjdXJyZW50TG9jYWxlXSkgPT5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2UuZnJvbUNvbXBvbmVudChVaUxhbmd1YWdlU3dpdGNoZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZUxhbmd1YWdlczogdGhpcy5hdmFpbGFibGVMYW5ndWFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudExhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMb2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXN1bHQgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID8gdGhpcy5kYXRhU2VydmljZS5jbGllbnQuc2V0VWlMYW5ndWFnZShyZXN1bHRbMF0sIHJlc3VsdFsxXSkgOiBFTVBUWSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc2V0VWlMYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmkxOG5TZXJ2aWNlLnNldExhbmd1YWdlKHJlc3VsdC5zZXRVaUxhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgndWlMYW5ndWFnZUNvZGUnLCByZXN1bHQuc2V0VWlMYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3VpTG9jYWxlJywgcmVzdWx0LnNldFVpTG9jYWxlID8/IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQ2hhbm5lbE9wZW5DbG9zZWRTd2l0Y2goaXNPcGVuOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNoYW5uZWxJZCQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgLm1hcFNpbmdsZSgoeyB1c2VyU3RhdHVzIH0pID0+IHVzZXJTdGF0dXMuYWN0aXZlQ2hhbm5lbElkKTtcbiAgICAgICAgYWN0aXZlQ2hhbm5lbElkJC5zdWJzY3JpYmUoYWN0aXZlQ2hhbm5lbElkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgICAgICAgICAgIGlkOiBhY3RpdmVDaGFubmVsSWQsXG4gICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3BlbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSBhcyBVcGRhdGVDaGFubmVsSW5wdXQ7XG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLnVwZGF0ZUNoYW5uZWwoaW5wdXQpLnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2dPdXQoKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nT3V0KCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbG9naW5VcmwgfSA9IGdldEFwcENvbmZpZygpO1xuICAgICAgICAgICAgaWYgKGxvZ2luVXJsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsb2dpblVybDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==