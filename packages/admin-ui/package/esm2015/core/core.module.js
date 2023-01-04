import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MESSAGE_FORMAT_CONFIG } from 'ngx-translate-messageformat-compiler';
import { getAppConfig } from './app.config';
import { getDefaultUiLanguage } from './common/utilities/get-default-ui-language';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ChannelSwitcherComponent } from './components/channel-switcher/channel-switcher.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OverlayHostComponent } from './components/overlay-host/overlay-host.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { UiLanguageSwitcherDialogComponent } from './components/ui-language-switcher-dialog/ui-language-switcher-dialog.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { DataModule } from './data/data.module';
import { CustomHttpTranslationLoader } from './providers/i18n/custom-http-loader';
import { InjectableTranslateMessageFormatCompiler } from './providers/i18n/custom-message-format-compiler';
import { I18nService } from './providers/i18n/i18n.service';
import { LocalStorageService } from './providers/local-storage/local-storage.service';
import { registerDefaultFormInputs } from './shared/dynamic-form-inputs/register-dynamic-input-components';
import { SharedModule } from './shared/shared.module';
export class CoreModule {
    constructor(i18nService, localStorageService, titleService) {
        this.i18nService = i18nService;
        this.localStorageService = localStorageService;
        this.titleService = titleService;
        this.initUiLanguages();
        this.initUiTitle();
    }
    initUiLanguages() {
        const defaultLanguage = getDefaultUiLanguage();
        const lastLanguage = this.localStorageService.get('uiLanguageCode');
        const availableLanguages = getAppConfig().availableLanguages;
        if (!availableLanguages.includes(defaultLanguage)) {
            throw new Error(`The defaultLanguage "${defaultLanguage}" must be one of the availableLanguages [${availableLanguages
                .map(l => `"${l}"`)
                .join(', ')}]`);
        }
        const uiLanguage = lastLanguage && availableLanguages.includes(lastLanguage) ? lastLanguage : defaultLanguage;
        this.localStorageService.set('uiLanguageCode', uiLanguage);
        this.i18nService.setLanguage(uiLanguage);
        this.i18nService.setDefaultLanguage(defaultLanguage);
        this.i18nService.setAvailableLanguages(availableLanguages || [defaultLanguage]);
    }
    initUiTitle() {
        const title = getAppConfig().brand || 'VendureAdmin';
        this.titleService.setTitle(title);
    }
}
CoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule,
                    DataModule,
                    SharedModule,
                    BrowserAnimationsModule,
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useFactory: HttpLoaderFactory,
                            deps: [HttpClient, PlatformLocation],
                        },
                        compiler: { provide: TranslateCompiler, useClass: InjectableTranslateMessageFormatCompiler },
                    }),
                ],
                providers: [
                    { provide: MESSAGE_FORMAT_CONFIG, useFactory: getLocales },
                    registerDefaultFormInputs(),
                    Title,
                ],
                exports: [SharedModule, OverlayHostComponent],
                declarations: [
                    AppShellComponent,
                    UserMenuComponent,
                    MainNavComponent,
                    BreadcrumbComponent,
                    OverlayHostComponent,
                    NotificationComponent,
                    UiLanguageSwitcherDialogComponent,
                    ChannelSwitcherComponent,
                    ThemeSwitcherComponent,
                ],
            },] }
];
CoreModule.ctorParameters = () => [
    { type: I18nService },
    { type: LocalStorageService },
    { type: Title }
];
export function HttpLoaderFactory(http, location) {
    // Dynamically get the baseHref, which is configured in the angular.json file
    const baseHref = location.getBaseHrefFromDOM();
    return new CustomHttpTranslationLoader(http, baseHref + 'i18n-messages/');
}
/**
 * Returns the locales defined in the vendure-ui-config.json, ensuring that the
 * default language is the first item in the array as per the messageformat
 * documentation:
 *
 * > The default locale will be the first entry of the array
 * https://messageformat.github.io/messageformat/MessageFormat
 */
export function getLocales() {
    const locales = getAppConfig().availableLanguages;
    const defaultLanguage = getDefaultUiLanguage();
    const localesWithoutDefault = locales.filter(l => l !== defaultLanguage);
    return {
        locales: [defaultLanguage, ...localesWithoutDefault],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQXVCLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFbEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFB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QUFxQixFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUU7b0JBQzFELHlCQUF5QixFQUFFO29CQUMzQixLQUFLO2lCQUNSO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztnQkFDN0MsWUFBWSxFQUFFO29CQUNWLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLG1CQUFtQjtvQkFDbkIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLGlDQUFpQztvQkFDakMsd0JBQXdCO29CQUN4QixzQkFBc0I7aUJBQ3pCO2FBQ0o7OztZQXJDUSxXQUFXO1lBQ1gsbUJBQW1CO1lBcEJKLEtBQUs7O0FBOEY3QixNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBZ0IsRUFBRSxRQUEwQjtJQUMxRSw2RUFBNkU7SUFDN0UsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0MsT0FBTyxJQUFJLDJCQUEyQixDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxVQUFVO0lBQ3RCLE1BQU0sT0FBTyxHQUFHLFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO0lBQ2xELE1BQU0sZUFBZSxHQUFHLG9CQUFvQixFQUFFLENBQUM7SUFDL0MsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLE9BQU87UUFDSCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztLQUN2RCxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlLCBUaXRsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlQ29tcGlsZXIsIFRyYW5zbGF0ZUxvYWRlciwgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBNZXNzYWdlRm9ybWF0Q29uZmlnLCBNRVNTQUdFX0ZPUk1BVF9DT05GSUcgfSBmcm9tICduZ3gtdHJhbnNsYXRlLW1lc3NhZ2Vmb3JtYXQtY29tcGlsZXInO1xuXG5pbXBvcnQgeyBnZXRBcHBDb25maWcgfSBmcm9tICcuL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlsaXRpZXMvZ2V0LWRlZmF1bHQtdWktbGFuZ3VhZ2UnO1xuaW1wb3J0IHsgQXBwU2hlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwLXNoZWxsL2FwcC1zaGVsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcbmltcG9ydCB7IENoYW5uZWxTd2l0Y2hlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jaGFubmVsLXN3aXRjaGVyL2NoYW5uZWwtc3dpdGNoZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5OYXZDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFpbi1uYXYvbWFpbi1uYXYuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdmVybGF5SG9zdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9vdmVybGF5LWhvc3Qvb3ZlcmxheS1ob3N0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaGVtZVN3aXRjaGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RoZW1lLXN3aXRjaGVyL3RoZW1lLXN3aXRjaGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVaUxhbmd1YWdlU3dpdGNoZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdWktbGFuZ3VhZ2Utc3dpdGNoZXItZGlhbG9nL3VpLWxhbmd1YWdlLXN3aXRjaGVyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlck1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdXNlci1tZW51L3VzZXItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YU1vZHVsZSB9IGZyb20gJy4vZGF0YS9kYXRhLm1vZHVsZSc7XG5pbXBvcnQgeyBDdXN0b21IdHRwVHJhbnNsYXRpb25Mb2FkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9pMThuL2N1c3RvbS1odHRwLWxvYWRlcic7XG5pbXBvcnQgeyBJbmplY3RhYmxlVHJhbnNsYXRlTWVzc2FnZUZvcm1hdENvbXBpbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvaTE4bi9jdXN0b20tbWVzc2FnZS1mb3JtYXQtY29tcGlsZXInO1xuaW1wb3J0IHsgSTE4blNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9pMThuL2kxOG4uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgcmVnaXN0ZXJEZWZhdWx0Rm9ybUlucHV0cyB9IGZyb20gJy4vc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvcmVnaXN0ZXItZHluYW1pYy1pbnB1dC1jb21wb25lbnRzJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcbiAgICAgICAgRGF0YU1vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgICAgICAgbG9hZGVyOiB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxuICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IEh0dHBMb2FkZXJGYWN0b3J5LFxuICAgICAgICAgICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50LCBQbGF0Zm9ybUxvY2F0aW9uXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21waWxlcjogeyBwcm92aWRlOiBUcmFuc2xhdGVDb21waWxlciwgdXNlQ2xhc3M6IEluamVjdGFibGVUcmFuc2xhdGVNZXNzYWdlRm9ybWF0Q29tcGlsZXIgfSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNRVNTQUdFX0ZPUk1BVF9DT05GSUcsIHVzZUZhY3Rvcnk6IGdldExvY2FsZXMgfSxcbiAgICAgICAgcmVnaXN0ZXJEZWZhdWx0Rm9ybUlucHV0cygpLFxuICAgICAgICBUaXRsZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtTaGFyZWRNb2R1bGUsIE92ZXJsYXlIb3N0Q29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwU2hlbGxDb21wb25lbnQsXG4gICAgICAgIFVzZXJNZW51Q29tcG9uZW50LFxuICAgICAgICBNYWluTmF2Q29tcG9uZW50LFxuICAgICAgICBCcmVhZGNydW1iQ29tcG9uZW50LFxuICAgICAgICBPdmVybGF5SG9zdENvbXBvbmVudCxcbiAgICAgICAgTm90aWZpY2F0aW9uQ29tcG9uZW50LFxuICAgICAgICBVaUxhbmd1YWdlU3dpdGNoZXJEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIENoYW5uZWxTd2l0Y2hlckNvbXBvbmVudCxcbiAgICAgICAgVGhlbWVTd2l0Y2hlckNvbXBvbmVudCxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3JlTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpMThuU2VydmljZTogSTE4blNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB0aXRsZVNlcnZpY2U6IFRpdGxlLFxuICAgICkge1xuICAgICAgICB0aGlzLmluaXRVaUxhbmd1YWdlcygpO1xuICAgICAgICB0aGlzLmluaXRVaVRpdGxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VWlMYW5ndWFnZXMoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRMYW5ndWFnZSA9IGdldERlZmF1bHRVaUxhbmd1YWdlKCk7XG4gICAgICAgIGNvbnN0IGxhc3RMYW5ndWFnZSA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ3VpTGFuZ3VhZ2VDb2RlJyk7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZUxhbmd1YWdlcyA9IGdldEFwcENvbmZpZygpLmF2YWlsYWJsZUxhbmd1YWdlcztcblxuICAgICAgICBpZiAoIWF2YWlsYWJsZUxhbmd1YWdlcy5pbmNsdWRlcyhkZWZhdWx0TGFuZ3VhZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYFRoZSBkZWZhdWx0TGFuZ3VhZ2UgXCIke2RlZmF1bHRMYW5ndWFnZX1cIiBtdXN0IGJlIG9uZSBvZiB0aGUgYXZhaWxhYmxlTGFuZ3VhZ2VzIFske2F2YWlsYWJsZUxhbmd1YWdlc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGwgPT4gYFwiJHtsfVwiYClcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJywgJyl9XWAsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVpTGFuZ3VhZ2UgPVxuICAgICAgICAgICAgbGFzdExhbmd1YWdlICYmIGF2YWlsYWJsZUxhbmd1YWdlcy5pbmNsdWRlcyhsYXN0TGFuZ3VhZ2UpID8gbGFzdExhbmd1YWdlIDogZGVmYXVsdExhbmd1YWdlO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCd1aUxhbmd1YWdlQ29kZScsIHVpTGFuZ3VhZ2UpO1xuICAgICAgICB0aGlzLmkxOG5TZXJ2aWNlLnNldExhbmd1YWdlKHVpTGFuZ3VhZ2UpO1xuICAgICAgICB0aGlzLmkxOG5TZXJ2aWNlLnNldERlZmF1bHRMYW5ndWFnZShkZWZhdWx0TGFuZ3VhZ2UpO1xuICAgICAgICB0aGlzLmkxOG5TZXJ2aWNlLnNldEF2YWlsYWJsZUxhbmd1YWdlcyhhdmFpbGFibGVMYW5ndWFnZXMgfHwgW2RlZmF1bHRMYW5ndWFnZV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFVpVGl0bGUoKSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZ2V0QXBwQ29uZmlnKCkuYnJhbmQgfHwgJ1ZlbmR1cmVBZG1pbic7XG5cbiAgICAgICAgdGhpcy50aXRsZVNlcnZpY2Uuc2V0VGl0bGUodGl0bGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEh0dHBMb2FkZXJGYWN0b3J5KGh0dHA6IEh0dHBDbGllbnQsIGxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uKSB7XG4gICAgLy8gRHluYW1pY2FsbHkgZ2V0IHRoZSBiYXNlSHJlZiwgd2hpY2ggaXMgY29uZmlndXJlZCBpbiB0aGUgYW5ndWxhci5qc29uIGZpbGVcbiAgICBjb25zdCBiYXNlSHJlZiA9IGxvY2F0aW9uLmdldEJhc2VIcmVmRnJvbURPTSgpO1xuICAgIHJldHVybiBuZXcgQ3VzdG9tSHR0cFRyYW5zbGF0aW9uTG9hZGVyKGh0dHAsIGJhc2VIcmVmICsgJ2kxOG4tbWVzc2FnZXMvJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbG9jYWxlcyBkZWZpbmVkIGluIHRoZSB2ZW5kdXJlLXVpLWNvbmZpZy5qc29uLCBlbnN1cmluZyB0aGF0IHRoZVxuICogZGVmYXVsdCBsYW5ndWFnZSBpcyB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgYXJyYXkgYXMgcGVyIHRoZSBtZXNzYWdlZm9ybWF0XG4gKiBkb2N1bWVudGF0aW9uOlxuICpcbiAqID4gVGhlIGRlZmF1bHQgbG9jYWxlIHdpbGwgYmUgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheVxuICogaHR0cHM6Ly9tZXNzYWdlZm9ybWF0LmdpdGh1Yi5pby9tZXNzYWdlZm9ybWF0L01lc3NhZ2VGb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsZXMoKTogTWVzc2FnZUZvcm1hdENvbmZpZyB7XG4gICAgY29uc3QgbG9jYWxlcyA9IGdldEFwcENvbmZpZygpLmF2YWlsYWJsZUxhbmd1YWdlcztcbiAgICBjb25zdCBkZWZhdWx0TGFuZ3VhZ2UgPSBnZXREZWZhdWx0VWlMYW5ndWFnZSgpO1xuICAgIGNvbnN0IGxvY2FsZXNXaXRob3V0RGVmYXVsdCA9IGxvY2FsZXMuZmlsdGVyKGwgPT4gbCAhPT0gZGVmYXVsdExhbmd1YWdlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2NhbGVzOiBbZGVmYXVsdExhbmd1YWdlLCAuLi5sb2NhbGVzV2l0aG91dERlZmF1bHRdLFxuICAgIH07XG59XG4iXX0=