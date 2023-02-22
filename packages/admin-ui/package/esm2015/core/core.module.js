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
        const title = getAppConfig().brand || 'Crepe Runner Backend';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQXVCLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFbEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFB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cUJBQXFCLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtvQkFDMUQseUJBQXlCLEVBQUU7b0JBQzNCLEtBQUs7aUJBQ1I7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDO2dCQUM3QyxZQUFZLEVBQUU7b0JBQ1YsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIsbUJBQW1CO29CQUNuQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsaUNBQWlDO29CQUNqQyx3QkFBd0I7b0JBQ3hCLHNCQUFzQjtpQkFDekI7YUFDSjs7O1lBckNRLFdBQVc7WUFDWCxtQkFBbUI7WUFwQkosS0FBSzs7QUE4RjdCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFnQixFQUFFLFFBQTBCO0lBQzFFLDZFQUE2RTtJQUM3RSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvQyxPQUFPLElBQUksMkJBQTJCLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLFVBQVU7SUFDdEIsTUFBTSxPQUFPLEdBQUcsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7SUFDbEQsTUFBTSxlQUFlLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztJQUMvQyxNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssZUFBZSxDQUFDLENBQUM7SUFDekUsT0FBTztRQUNILE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLHFCQUFxQixDQUFDO0tBQ3ZELENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUsIFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVDb21waWxlciwgVHJhbnNsYXRlTG9hZGVyLCBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE1lc3NhZ2VGb3JtYXRDb25maWcsIE1FU1NBR0VfRk9STUFUX0NPTkZJRyB9IGZyb20gJ25neC10cmFuc2xhdGUtbWVzc2FnZWZvcm1hdC1jb21waWxlcic7XG5cbmltcG9ydCB7IGdldEFwcENvbmZpZyB9IGZyb20gJy4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0VWlMYW5ndWFnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxpdGllcy9nZXQtZGVmYXVsdC11aS1sYW5ndWFnZSc7XG5pbXBvcnQgeyBBcHBTaGVsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAtc2hlbGwvYXBwLXNoZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhbm5lbFN3aXRjaGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NoYW5uZWwtc3dpdGNoZXIvY2hhbm5lbC1zd2l0Y2hlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpbk5hdkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYWluLW5hdi9tYWluLW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE92ZXJsYXlIb3N0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL292ZXJsYXktaG9zdC9vdmVybGF5LWhvc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRoZW1lU3dpdGNoZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGhlbWUtc3dpdGNoZXIvdGhlbWUtc3dpdGNoZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFVpTGFuZ3VhZ2VTd2l0Y2hlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy91aS1sYW5ndWFnZS1zd2l0Y2hlci1kaWFsb2cvdWktbGFuZ3VhZ2Utc3dpdGNoZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyTWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy91c2VyLW1lbnUvdXNlci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhTW9kdWxlIH0gZnJvbSAnLi9kYXRhL2RhdGEubW9kdWxlJztcbmltcG9ydCB7IEN1c3RvbUh0dHBUcmFuc2xhdGlvbkxvYWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2kxOG4vY3VzdG9tLWh0dHAtbG9hZGVyJztcbmltcG9ydCB7IEluamVjdGFibGVUcmFuc2xhdGVNZXNzYWdlRm9ybWF0Q29tcGlsZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9pMThuL2N1c3RvbS1tZXNzYWdlLWZvcm1hdC1jb21waWxlcic7XG5pbXBvcnQgeyBJMThuU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2kxOG4vaTE4bi5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyByZWdpc3RlckRlZmF1bHRGb3JtSW5wdXRzIH0gZnJvbSAnLi9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9yZWdpc3Rlci1keW5hbWljLWlucHV0LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBCcm93c2VyTW9kdWxlLFxuICAgICAgICBEYXRhTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICAgICAgICBsb2FkZXI6IHtcbiAgICAgICAgICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogSHR0cExvYWRlckZhY3RvcnksXG4gICAgICAgICAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIFBsYXRmb3JtTG9jYXRpb25dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBpbGVyOiB7IHByb3ZpZGU6IFRyYW5zbGF0ZUNvbXBpbGVyLCB1c2VDbGFzczogSW5qZWN0YWJsZVRyYW5zbGF0ZU1lc3NhZ2VGb3JtYXRDb21waWxlciB9LFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1FU1NBR0VfRk9STUFUX0NPTkZJRywgdXNlRmFjdG9yeTogZ2V0TG9jYWxlcyB9LFxuICAgICAgICByZWdpc3RlckRlZmF1bHRGb3JtSW5wdXRzKCksXG4gICAgICAgIFRpdGxlLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1NoYXJlZE1vZHVsZSwgT3ZlcmxheUhvc3RDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBTaGVsbENvbXBvbmVudCxcbiAgICAgICAgVXNlck1lbnVDb21wb25lbnQsXG4gICAgICAgIE1haW5OYXZDb21wb25lbnQsXG4gICAgICAgIEJyZWFkY3J1bWJDb21wb25lbnQsXG4gICAgICAgIE92ZXJsYXlIb3N0Q29tcG9uZW50LFxuICAgICAgICBOb3RpZmljYXRpb25Db21wb25lbnQsXG4gICAgICAgIFVpTGFuZ3VhZ2VTd2l0Y2hlckRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgQ2hhbm5lbFN3aXRjaGVyQ29tcG9uZW50LFxuICAgICAgICBUaGVtZVN3aXRjaGVyQ29tcG9uZW50LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvcmVNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGkxOG5TZXJ2aWNlOiBJMThuU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHRpdGxlU2VydmljZTogVGl0bGUsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW5pdFVpTGFuZ3VhZ2VzKCk7XG4gICAgICAgIHRoaXMuaW5pdFVpVGl0bGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVaUxhbmd1YWdlcygpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdExhbmd1YWdlID0gZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKTtcbiAgICAgICAgY29uc3QgbGFzdExhbmd1YWdlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgndWlMYW5ndWFnZUNvZGUnKTtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlTGFuZ3VhZ2VzID0gZ2V0QXBwQ29uZmlnKCkuYXZhaWxhYmxlTGFuZ3VhZ2VzO1xuXG4gICAgICAgIGlmICghYXZhaWxhYmxlTGFuZ3VhZ2VzLmluY2x1ZGVzKGRlZmF1bHRMYW5ndWFnZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgVGhlIGRlZmF1bHRMYW5ndWFnZSBcIiR7ZGVmYXVsdExhbmd1YWdlfVwiIG11c3QgYmUgb25lIG9mIHRoZSBhdmFpbGFibGVMYW5ndWFnZXMgWyR7YXZhaWxhYmxlTGFuZ3VhZ2VzXG4gICAgICAgICAgICAgICAgICAgIC5tYXAobCA9PiBgXCIke2x9XCJgKVxuICAgICAgICAgICAgICAgICAgICAuam9pbignLCAnKX1dYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdWlMYW5ndWFnZSA9XG4gICAgICAgICAgICBsYXN0TGFuZ3VhZ2UgJiYgYXZhaWxhYmxlTGFuZ3VhZ2VzLmluY2x1ZGVzKGxhc3RMYW5ndWFnZSkgPyBsYXN0TGFuZ3VhZ2UgOiBkZWZhdWx0TGFuZ3VhZ2U7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ3VpTGFuZ3VhZ2VDb2RlJywgdWlMYW5ndWFnZSk7XG4gICAgICAgIHRoaXMuaTE4blNlcnZpY2Uuc2V0TGFuZ3VhZ2UodWlMYW5ndWFnZSk7XG4gICAgICAgIHRoaXMuaTE4blNlcnZpY2Uuc2V0RGVmYXVsdExhbmd1YWdlKGRlZmF1bHRMYW5ndWFnZSk7XG4gICAgICAgIHRoaXMuaTE4blNlcnZpY2Uuc2V0QXZhaWxhYmxlTGFuZ3VhZ2VzKGF2YWlsYWJsZUxhbmd1YWdlcyB8fCBbZGVmYXVsdExhbmd1YWdlXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VWlUaXRsZSgpIHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBnZXRBcHBDb25maWcoKS5icmFuZCB8fCAnQ3JlcGUgUnVubmVyIEJhY2tlbmQnO1xuXG4gICAgICAgIHRoaXMudGl0bGVTZXJ2aWNlLnNldFRpdGxlKHRpdGxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIdHRwTG9hZGVyRmFjdG9yeShodHRwOiBIdHRwQ2xpZW50LCBsb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbikge1xuICAgIC8vIER5bmFtaWNhbGx5IGdldCB0aGUgYmFzZUhyZWYsIHdoaWNoIGlzIGNvbmZpZ3VyZWQgaW4gdGhlIGFuZ3VsYXIuanNvbiBmaWxlXG4gICAgY29uc3QgYmFzZUhyZWYgPSBsb2NhdGlvbi5nZXRCYXNlSHJlZkZyb21ET00oKTtcbiAgICByZXR1cm4gbmV3IEN1c3RvbUh0dHBUcmFuc2xhdGlvbkxvYWRlcihodHRwLCBiYXNlSHJlZiArICdpMThuLW1lc3NhZ2VzLycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGxvY2FsZXMgZGVmaW5lZCBpbiB0aGUgdmVuZHVyZS11aS1jb25maWcuanNvbiwgZW5zdXJpbmcgdGhhdCB0aGVcbiAqIGRlZmF1bHQgbGFuZ3VhZ2UgaXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGFycmF5IGFzIHBlciB0aGUgbWVzc2FnZWZvcm1hdFxuICogZG9jdW1lbnRhdGlvbjpcbiAqXG4gKiA+IFRoZSBkZWZhdWx0IGxvY2FsZSB3aWxsIGJlIHRoZSBmaXJzdCBlbnRyeSBvZiB0aGUgYXJyYXlcbiAqIGh0dHBzOi8vbWVzc2FnZWZvcm1hdC5naXRodWIuaW8vbWVzc2FnZWZvcm1hdC9NZXNzYWdlRm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbGVzKCk6IE1lc3NhZ2VGb3JtYXRDb25maWcge1xuICAgIGNvbnN0IGxvY2FsZXMgPSBnZXRBcHBDb25maWcoKS5hdmFpbGFibGVMYW5ndWFnZXM7XG4gICAgY29uc3QgZGVmYXVsdExhbmd1YWdlID0gZ2V0RGVmYXVsdFVpTGFuZ3VhZ2UoKTtcbiAgICBjb25zdCBsb2NhbGVzV2l0aG91dERlZmF1bHQgPSBsb2NhbGVzLmZpbHRlcihsID0+IGwgIT09IGRlZmF1bHRMYW5ndWFnZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9jYWxlczogW2RlZmF1bHRMYW5ndWFnZSwgLi4ubG9jYWxlc1dpdGhvdXREZWZhdWx0XSxcbiAgICB9O1xufVxuIl19