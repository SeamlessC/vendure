import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, isDevMode } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { DataService } from './data/providers/data.service';
import { ServerConfigService } from './data/server-config';
import { LocalStorageService } from './providers/local-storage/local-storage.service';
export class AppComponent {
    constructor(dataService, serverConfigService, localStorageService, document) {
        this.dataService = dataService;
        this.serverConfigService = serverConfigService;
        this.localStorageService = localStorageService;
        this.document = document;
        this._document = document;
    }
    ngOnInit() {
        this.loading$ = this.dataService.client
            .getNetworkStatus()
            .stream$.pipe(map(data => 0 < data.networkStatus.inFlightRequests));
        this.dataService.client
            .uiState()
            .mapStream(data => data.uiState.theme)
            .subscribe(theme => {
            var _a;
            (_a = this._document) === null || _a === void 0 ? void 0 : _a.body.setAttribute('data-theme', theme);
        });
        // Once logged in, keep the localStorage "contentLanguageCode" in sync with the
        // uiState. Also perform a check to ensure that the current contentLanguage is
        // one of the availableLanguages per GlobalSettings.
        this.dataService.client
            .userStatus()
            .mapStream(({ userStatus }) => userStatus.isLoggedIn)
            .pipe(filter(loggedIn => loggedIn === true), switchMap(() => {
            return this.dataService.client.uiState().mapStream(data => data.uiState.contentLanguage);
        }), switchMap(contentLang => {
            return this.serverConfigService
                .getAvailableLanguages()
                .pipe(map(available => [contentLang, available]));
        }))
            .subscribe({
            next: ([contentLanguage, availableLanguages]) => {
                this.localStorageService.set('contentLanguageCode', contentLanguage);
                if (availableLanguages.length && !availableLanguages.includes(contentLanguage)) {
                    this.dataService.client.setContentLanguage(availableLanguages[0]).subscribe();
                }
            },
        });
        if (isDevMode()) {
            // tslint:disable-next-line:no-console
            console.log(`%cVendure Admin UI: Press "ctrl/cmd + u" to view UI extension points`, `color: #17C1FF; font-weight: bold;`);
        }
    }
    handleGlobalHotkeys(event) {
        if ((event.ctrlKey === true || event.metaKey === true) && event.key === 'u') {
            event.preventDefault();
            if (isDevMode()) {
                this.dataService.client
                    .uiState()
                    .single$.pipe(switchMap(({ uiState }) => this.dataService.client.setDisplayUiExtensionPoints(!uiState.displayUiExtensionPoints)))
                    .subscribe();
            }
        }
    }
}
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-root',
                template: "<div class=\"progress loop\" [class.visible]=\"loading$ | async\"></div>\n<router-outlet></router-outlet>\n<vdr-overlay-host></vdr-overlay-host>\n",
                styles: [".progress{position:absolute;overflow:hidden;height:4px;background-color:var(--color-grey-500);opacity:0;transition:opacity .1s}.progress.visible{opacity:1}\n"]
            },] }
];
AppComponent.ctorParameters = () => [
    { type: DataService },
    { type: ServerConfigService },
    { type: LocalStorageService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
AppComponent.propDecorators = {
    handleGlobalHotkeys: [{ type: HostListener, args: ['window:keydown', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFPdEYsTUFBTSxPQUFPLFlBQVk7SUFJckIsWUFDWSxXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsbUJBQXdDLEVBQ3RCLFFBQWM7UUFIaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQU07UUFFeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTthQUNsQyxnQkFBZ0IsRUFBRTthQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07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QyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBJbmplY3QsIGlzRGV2TW9kZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlcnZlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2RhdGEvc2VydmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1yb290JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBsb2FkaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBwcml2YXRlIF9kb2N1bWVudD86IERvY3VtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudD86IGFueSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAuZ2V0TmV0d29ya1N0YXR1cygpXG4gICAgICAgICAgICAuc3RyZWFtJC5waXBlKG1hcChkYXRhID0+IDAgPCBkYXRhLm5ldHdvcmtTdGF0dXMuaW5GbGlnaHRSZXF1ZXN0cykpO1xuXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudWlTdGF0ZSgpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS51aVN0YXRlLnRoZW1lKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGVtZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnQ/LmJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdGhlbWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT25jZSBsb2dnZWQgaW4sIGtlZXAgdGhlIGxvY2FsU3RvcmFnZSBcImNvbnRlbnRMYW5ndWFnZUNvZGVcIiBpbiBzeW5jIHdpdGggdGhlXG4gICAgICAgIC8vIHVpU3RhdGUuIEFsc28gcGVyZm9ybSBhIGNoZWNrIHRvIGVuc3VyZSB0aGF0IHRoZSBjdXJyZW50IGNvbnRlbnRMYW5ndWFnZSBpc1xuICAgICAgICAvLyBvbmUgb2YgdGhlIGF2YWlsYWJsZUxhbmd1YWdlcyBwZXIgR2xvYmFsU2V0dGluZ3MuXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAubWFwU3RyZWFtKCh7IHVzZXJTdGF0dXMgfSkgPT4gdXNlclN0YXR1cy5pc0xvZ2dlZEluKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKGxvZ2dlZEluID0+IGxvZ2dlZEluID09PSB0cnVlKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jbGllbnQudWlTdGF0ZSgpLm1hcFN0cmVhbShkYXRhID0+IGRhdGEudWlTdGF0ZS5jb250ZW50TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChjb250ZW50TGFuZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRBdmFpbGFibGVMYW5ndWFnZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKGF2YWlsYWJsZSA9PiBbY29udGVudExhbmcsIGF2YWlsYWJsZV0gYXMgY29uc3QpKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG5leHQ6IChbY29udGVudExhbmd1YWdlLCBhdmFpbGFibGVMYW5ndWFnZXNdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2NvbnRlbnRMYW5ndWFnZUNvZGUnLCBjb250ZW50TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlTGFuZ3VhZ2VzLmxlbmd0aCAmJiAhYXZhaWxhYmxlTGFuZ3VhZ2VzLmluY2x1ZGVzKGNvbnRlbnRMYW5ndWFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnNldENvbnRlbnRMYW5ndWFnZShhdmFpbGFibGVMYW5ndWFnZXNbMF0pLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGAlY1ZlbmR1cmUgQWRtaW4gVUk6IFByZXNzIFwiY3RybC9jbWQgKyB1XCIgdG8gdmlldyBVSSBleHRlbnNpb24gcG9pbnRzYCxcbiAgICAgICAgICAgICAgICBgY29sb3I6ICMxN0MxRkY7IGZvbnQtd2VpZ2h0OiBib2xkO2AsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24nLCBbJyRldmVudCddKVxuICAgIGhhbmRsZUdsb2JhbEhvdGtleXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKChldmVudC5jdHJsS2V5ID09PSB0cnVlIHx8IGV2ZW50Lm1ldGFLZXkgPT09IHRydWUpICYmIGV2ZW50LmtleSA9PT0gJ3UnKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgLnVpU3RhdGUoKVxuICAgICAgICAgICAgICAgICAgICAuc2luZ2xlJC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKCh7IHVpU3RhdGUgfSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC5zZXREaXNwbGF5VWlFeHRlbnNpb25Qb2ludHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICF1aVN0YXRlLmRpc3BsYXlVaUV4dGVuc2lvblBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=