import { Injectable } from '@angular/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { of } from 'rxjs';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { DataService } from '../../data/providers/data.service';
import { ServerConfigService } from '../../data/server-config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "../local-storage/local-storage.service";
import * as i2 from "../../data/providers/data.service";
import * as i3 from "../../data/server-config";
/**
 * This service handles logic relating to authentication of the current user.
 */
export class AuthService {
    constructor(localStorageService, dataService, serverConfigService) {
        this.localStorageService = localStorageService;
        this.dataService = dataService;
        this.serverConfigService = serverConfigService;
    }
    /**
     * Attempts to log in via the REST login endpoint and updates the app
     * state on success.
     */
    logIn(username, password, rememberMe) {
        return this.dataService.auth.attemptLogin(username, password, rememberMe).pipe(switchMap(response => {
            if (response.login.__typename === 'CurrentUser') {
                this.setChannelToken(response.login.channels);
            }
            return this.serverConfigService.getServerConfig().then(() => response.login);
        }), switchMap(login => {
            if (login.__typename === 'CurrentUser') {
                const { id } = this.getActiveChannel(login.channels);
                return this.dataService.client
                    .loginSuccess(username, id, login.channels)
                    .pipe(map(() => login));
            }
            return of(login);
        }));
    }
    /**
     * Update the user status to being logged out.
     */
    logOut() {
        return this.dataService.client.userStatus().single$.pipe(switchMap(status => {
            if (status.userStatus.isLoggedIn) {
                return this.dataService.client
                    .logOut()
                    .pipe(mergeMap(() => this.dataService.auth.logOut()));
            }
            else {
                return [];
            }
        }), mapTo(true));
    }
    /**
     * Checks the app state to see if the user is already logged in,
     * and if not, attempts to validate any auth token found.
     */
    checkAuthenticatedStatus() {
        return this.dataService.client.userStatus().single$.pipe(mergeMap(data => {
            if (!data.userStatus.isLoggedIn) {
                return this.validateAuthToken();
            }
            else {
                return of(true);
            }
        }));
    }
    /**
     * Checks for an auth token and if found, attempts to validate
     * that token against the API.
     */
    validateAuthToken() {
        return this.dataService.auth.currentUser().single$.pipe(mergeMap(result => {
            if (!result.me) {
                return of(false);
            }
            this.setChannelToken(result.me.channels);
            const { id } = this.getActiveChannel(result.me.channels);
            return this.dataService.client.loginSuccess(result.me.identifier, id, result.me.channels);
        }), mapTo(true), catchError(err => of(false)));
    }
    getActiveChannel(userChannels) {
        const lastActiveChannelToken = this.localStorageService.get('activeChannelToken');
        if (lastActiveChannelToken) {
            const lastActiveChannel = userChannels.find(c => c.token === lastActiveChannelToken);
            if (lastActiveChannel) {
                return lastActiveChannel;
            }
        }
        const defaultChannel = userChannels.find(c => c.code === DEFAULT_CHANNEL_CODE);
        return defaultChannel || userChannels[0];
    }
    setChannelToken(userChannels) {
        this.localStorageService.set('activeChannelToken', this.getActiveChannel(userChannels).token);
    }
}
AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(i1.LocalStorageService), i0.ɵɵinject(i2.DataService), i0.ɵɵinject(i3.ServerConfigService)); }, token: AuthService, providedIn: "root" });
AuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AuthService.ctorParameters = () => [
    { type: LocalStorageService },
    { type: DataService },
    { type: ServerConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9wcm92aWRlcnMvYXV0aC9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7OztBQUU3RTs7R0FFRztBQUlILE1BQU0sT0FBTyxXQUFXO0lBQ3BCLFlBQ1ksbUJBQXdDLEVBQ3hDLFdBQXdCLEVBQ3hCLG1CQUF3QztRQUZ4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDakQsQ0FBQztJQUVKOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsVUFBbUI7UUFDekQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQzFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLGFBQWEs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QUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDL0IsQ0FBQztJQUNOLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxZQUE2QztRQUNsRSxNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRixJQUFJLHNCQUFzQixFQUFFO1lBQ3hCLE1BQU0saUJBQWlCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssc0JBQXNCLENBQUMsQ0FBQztZQUNyRixJQUFJLGlCQUFpQixFQUFFO2dCQUNuQixPQUFPLGlCQUFpQixDQUFDO2FBQzVCO1NBQ0o7UUFDRCxNQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sY0FBYyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sZUFBZSxDQUFDLFlBQTZDO1FBQ2pFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLENBQUM7Ozs7WUFyR0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFQUSxtQkFBbUI7WUFGbkIsV0FBVztZQUNYLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERFRkFVTFRfQ0hBTk5FTF9DT0RFIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtY29uc3RhbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1hcFRvLCBtZXJnZU1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEF0dGVtcHRMb2dpbixcbiAgICBDdXJyZW50VXNlckNoYW5uZWwsXG4gICAgQ3VycmVudFVzZXJGcmFnbWVudCxcbiAgICBTZXRBc0xvZ2dlZEluLFxufSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlcnZlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3NlcnZlci1jb25maWcnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgaGFuZGxlcyBsb2dpYyByZWxhdGluZyB0byBhdXRoZW50aWNhdGlvbiBvZiB0aGUgY3VycmVudCB1c2VyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBsb2cgaW4gdmlhIHRoZSBSRVNUIGxvZ2luIGVuZHBvaW50IGFuZCB1cGRhdGVzIHRoZSBhcHBcbiAgICAgKiBzdGF0ZSBvbiBzdWNjZXNzLlxuICAgICAqL1xuICAgIGxvZ0luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIHJlbWVtYmVyTWU6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEF0dGVtcHRMb2dpbi5Mb2dpbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5hdXRoLmF0dGVtcHRMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQsIHJlbWVtYmVyTWUpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5sb2dpbi5fX3R5cGVuYW1lID09PSAnQ3VycmVudFVzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2hhbm5lbFRva2VuKHJlc3BvbnNlLmxvZ2luLmNoYW5uZWxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQ29uZmlnU2VydmljZS5nZXRTZXJ2ZXJDb25maWcoKS50aGVuKCgpID0+IHJlc3BvbnNlLmxvZ2luKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGxvZ2luID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobG9naW4uX190eXBlbmFtZSA9PT0gJ0N1cnJlbnRVc2VyJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEFjdGl2ZUNoYW5uZWwobG9naW4uY2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5sb2dpblN1Y2Nlc3ModXNlcm5hbWUsIGlkLCBsb2dpbi5jaGFubmVscylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgoKSA9PiBsb2dpbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2YobG9naW4pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB1c2VyIHN0YXR1cyB0byBiZWluZyBsb2dnZWQgb3V0LlxuICAgICAqL1xuICAgIGxvZ091dCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVzZXJTdGF0dXMoKS5zaW5nbGUkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoc3RhdHVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLnVzZXJTdGF0dXMuaXNMb2dnZWRJbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5sb2dPdXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWVyZ2VNYXAoKCkgPT4gdGhpcy5kYXRhU2VydmljZS5hdXRoLmxvZ091dCgpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwVG8odHJ1ZSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBhcHAgc3RhdGUgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluLFxuICAgICAqIGFuZCBpZiBub3QsIGF0dGVtcHRzIHRvIHZhbGlkYXRlIGFueSBhdXRoIHRva2VuIGZvdW5kLlxuICAgICAqL1xuICAgIGNoZWNrQXV0aGVudGljYXRlZFN0YXR1cygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVzZXJTdGF0dXMoKS5zaW5nbGUkLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEudXNlclN0YXR1cy5pc0xvZ2dlZEluKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQXV0aFRva2VuKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgYW4gYXV0aCB0b2tlbiBhbmQgaWYgZm91bmQsIGF0dGVtcHRzIHRvIHZhbGlkYXRlXG4gICAgICogdGhhdCB0b2tlbiBhZ2FpbnN0IHRoZSBBUEkuXG4gICAgICovXG4gICAgdmFsaWRhdGVBdXRoVG9rZW4oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmF1dGguY3VycmVudFVzZXIoKS5zaW5nbGUkLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0Lm1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldENoYW5uZWxUb2tlbihyZXN1bHQubWUuY2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0QWN0aXZlQ2hhbm5lbChyZXN1bHQubWUuY2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC5sb2dpblN1Y2Nlc3MocmVzdWx0Lm1lLmlkZW50aWZpZXIsIGlkLCByZXN1bHQubWUuY2hhbm5lbHMpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXBUbyh0cnVlKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IG9mKGZhbHNlKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBY3RpdmVDaGFubmVsKHVzZXJDaGFubmVsczogQ3VycmVudFVzZXJGcmFnbWVudFsnY2hhbm5lbHMnXSkge1xuICAgICAgICBjb25zdCBsYXN0QWN0aXZlQ2hhbm5lbFRva2VuID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYWN0aXZlQ2hhbm5lbFRva2VuJyk7XG4gICAgICAgIGlmIChsYXN0QWN0aXZlQ2hhbm5lbFRva2VuKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0QWN0aXZlQ2hhbm5lbCA9IHVzZXJDaGFubmVscy5maW5kKGMgPT4gYy50b2tlbiA9PT0gbGFzdEFjdGl2ZUNoYW5uZWxUb2tlbik7XG4gICAgICAgICAgICBpZiAobGFzdEFjdGl2ZUNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFzdEFjdGl2ZUNoYW5uZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVmYXVsdENoYW5uZWwgPSB1c2VyQ2hhbm5lbHMuZmluZChjID0+IGMuY29kZSA9PT0gREVGQVVMVF9DSEFOTkVMX0NPREUpO1xuICAgICAgICByZXR1cm4gZGVmYXVsdENoYW5uZWwgfHwgdXNlckNoYW5uZWxzWzBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2hhbm5lbFRva2VuKHVzZXJDaGFubmVsczogQ3VycmVudFVzZXJGcmFnbWVudFsnY2hhbm5lbHMnXSkge1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdhY3RpdmVDaGFubmVsVG9rZW4nLCB0aGlzLmdldEFjdGl2ZUNoYW5uZWwodXNlckNoYW5uZWxzKS50b2tlbik7XG4gICAgfVxufVxuIl19