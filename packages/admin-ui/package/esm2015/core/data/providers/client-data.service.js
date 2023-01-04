import { GET_NEWTORK_STATUS, GET_UI_STATE, GET_USER_STATUS, REQUEST_COMPLETED, REQUEST_STARTED, SET_ACTIVE_CHANNEL, SET_AS_LOGGED_IN, SET_AS_LOGGED_OUT, SET_CONTENT_LANGUAGE, SET_DISPLAY_UI_EXTENSION_POINTS, SET_UI_LANGUAGE_AND_LOCALE, SET_UI_LOCALE, SET_UI_THEME, UPDATE_USER_CHANNELS, } from '../definitions/client-definitions';
/**
 * Note: local queries all have a fetch-policy of "cache-first" explicitly specified due to:
 * https://github.com/apollographql/apollo-link-state/issues/236
 */
export class ClientDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    startRequest() {
        return this.baseDataService.mutate(REQUEST_STARTED);
    }
    completeRequest() {
        return this.baseDataService.mutate(REQUEST_COMPLETED);
    }
    getNetworkStatus() {
        return this.baseDataService.query(GET_NEWTORK_STATUS, {}, 'cache-first');
    }
    loginSuccess(username, activeChannelId, channels) {
        return this.baseDataService.mutate(SET_AS_LOGGED_IN, {
            input: {
                username,
                loginTime: Date.now().toString(),
                activeChannelId,
                channels,
            },
        });
    }
    logOut() {
        return this.baseDataService.mutate(SET_AS_LOGGED_OUT);
    }
    userStatus() {
        return this.baseDataService.query(GET_USER_STATUS, {}, 'cache-first');
    }
    uiState() {
        return this.baseDataService.query(GET_UI_STATE, {}, 'cache-first');
    }
    setUiLanguage(languageCode, locale) {
        return this.baseDataService.mutate(SET_UI_LANGUAGE_AND_LOCALE, {
            languageCode,
            locale,
        });
    }
    setUiLocale(locale) {
        return this.baseDataService.mutate(SET_UI_LOCALE, {
            locale,
        });
    }
    setContentLanguage(languageCode) {
        return this.baseDataService.mutate(SET_CONTENT_LANGUAGE, {
            languageCode,
        });
    }
    setUiTheme(theme) {
        return this.baseDataService.mutate(SET_UI_THEME, {
            theme,
        });
    }
    setDisplayUiExtensionPoints(display) {
        return this.baseDataService.mutate(SET_DISPLAY_UI_EXTENSION_POINTS, {
            display,
        });
    }
    setActiveChannel(channelId) {
        return this.baseDataService.mutate(SET_ACTIVE_CHANNEL, {
            channelId,
        });
    }
    updateUserChannels(channels) {
        return this.baseDataService.mutate(UPDATE_USER_CHANNELS, {
            channels,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9wcm92aWRlcnMvY2xpZW50LWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQkEsT0FBTyxFQUNILGtCQUFrQixFQUNsQixZQUFZLEVBQ1osZUFBZSxFQUNmLGlCQUFpQixFQUNqQixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLCtCQUErQixFQUMvQiwwQkFBMEIsRUFDMUIsYUFBYSxFQUNiLFlBQVksRUFDWixvQkFBb0IsR0FDdkIsTUFBTSxtQ0FBbUMsQ0FBQztBQUkzQzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQzFCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7SUFFeEQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQTBCLGVBQWUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxlQUFlO1FBQ1gsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBNEIsaUJBQWlCLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBeUIsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBZ0IsRUFBRSxlQUF1QixFQUFFLFFBQThCO1FBQ2xGLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQzlCLGdCQUFnQixFQUNoQjtZQUNJLEtBQUssRUFBRTtnQkFDSCxRQUFRO2dCQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUNoQyxlQUFlO2dCQUNmLFFBQVE7YUFDWDtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBc0IsZUFBZSxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQW1CLFlBQVksRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGFBQWEsQ0FBQyxZQUEwQixFQUFFLE1BQWU7UUFDckQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FDOUIsMEJBQTBCLEVBQzFCO1lBQ0ksWUFBWTtZQUNaLE1BQU07U0FDVCxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQTBCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQThDLGFBQWEsRUFBRTtZQUMzRixNQUFNO1NBQ1QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtCQUFrQixDQUFDLFlBQTBCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQzlCLG9CQUFvQixFQUNwQjtZQUNJLFlBQVk7U0FDZixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBNEMsWUFBWSxFQUFFO1lBQ3hGLEtBQUs7U0FDUixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQTJCLENBQUMsT0FBZ0I7UUFDeEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FHaEMsK0JBQStCLEVBQUU7WUFDL0IsT0FBTztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUM5QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUM5QixrQkFBa0IsRUFDbEI7WUFDSSxTQUFTO1NBQ1osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQW1DO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQzlCLG9CQUFvQixFQUNwQjtZQUNJLFFBQVE7U0FDWCxDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEN1cnJlbnRVc2VyQ2hhbm5lbCxcbiAgICBDdXJyZW50VXNlckNoYW5uZWxJbnB1dCxcbiAgICBHZXROZXR3b3JrU3RhdHVzLFxuICAgIEdldFVpU3RhdGUsXG4gICAgR2V0VXNlclN0YXR1cyxcbiAgICBMYW5ndWFnZUNvZGUsXG4gICAgUmVxdWVzdENvbXBsZXRlZCxcbiAgICBSZXF1ZXN0U3RhcnRlZCxcbiAgICBTZXRBY3RpdmVDaGFubmVsLFxuICAgIFNldEFzTG9nZ2VkSW4sXG4gICAgU2V0Q29udGVudExhbmd1YWdlLFxuICAgIFNldERpc3BsYXlVaUV4dGVuc2lvblBvaW50cyxcbiAgICBTZXRVaUxhbmd1YWdlLFxuICAgIFNldFVpTG9jYWxlLFxuICAgIFNldFVpVGhlbWUsXG4gICAgVXBkYXRlVXNlckNoYW5uZWxzLFxufSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7XG4gICAgR0VUX05FV1RPUktfU1RBVFVTLFxuICAgIEdFVF9VSV9TVEFURSxcbiAgICBHRVRfVVNFUl9TVEFUVVMsXG4gICAgUkVRVUVTVF9DT01QTEVURUQsXG4gICAgUkVRVUVTVF9TVEFSVEVELFxuICAgIFNFVF9BQ1RJVkVfQ0hBTk5FTCxcbiAgICBTRVRfQVNfTE9HR0VEX0lOLFxuICAgIFNFVF9BU19MT0dHRURfT1VULFxuICAgIFNFVF9DT05URU5UX0xBTkdVQUdFLFxuICAgIFNFVF9ESVNQTEFZX1VJX0VYVEVOU0lPTl9QT0lOVFMsXG4gICAgU0VUX1VJX0xBTkdVQUdFX0FORF9MT0NBTEUsXG4gICAgU0VUX1VJX0xPQ0FMRSxcbiAgICBTRVRfVUlfVEhFTUUsXG4gICAgVVBEQVRFX1VTRVJfQ0hBTk5FTFMsXG59IGZyb20gJy4uL2RlZmluaXRpb25zL2NsaWVudC1kZWZpbml0aW9ucyc7XG5cbmltcG9ydCB7IEJhc2VEYXRhU2VydmljZSB9IGZyb20gJy4vYmFzZS1kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIE5vdGU6IGxvY2FsIHF1ZXJpZXMgYWxsIGhhdmUgYSBmZXRjaC1wb2xpY3kgb2YgXCJjYWNoZS1maXJzdFwiIGV4cGxpY2l0bHkgc3BlY2lmaWVkIGR1ZSB0bzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcG9sbG9ncmFwaHFsL2Fwb2xsby1saW5rLXN0YXRlL2lzc3Vlcy8yMzZcbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudERhdGFTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VEYXRhU2VydmljZTogQmFzZURhdGFTZXJ2aWNlKSB7fVxuXG4gICAgc3RhcnRSZXF1ZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFJlcXVlc3RTdGFydGVkLk11dGF0aW9uPihSRVFVRVNUX1NUQVJURUQpO1xuICAgIH1cblxuICAgIGNvbXBsZXRlUmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxSZXF1ZXN0Q29tcGxldGVkLk11dGF0aW9uPihSRVFVRVNUX0NPTVBMRVRFRCk7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya1N0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldE5ldHdvcmtTdGF0dXMuUXVlcnk+KEdFVF9ORVdUT1JLX1NUQVRVUywge30sICdjYWNoZS1maXJzdCcpO1xuICAgIH1cblxuICAgIGxvZ2luU3VjY2Vzcyh1c2VybmFtZTogc3RyaW5nLCBhY3RpdmVDaGFubmVsSWQ6IHN0cmluZywgY2hhbm5lbHM6IEN1cnJlbnRVc2VyQ2hhbm5lbFtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8U2V0QXNMb2dnZWRJbi5NdXRhdGlvbiwgU2V0QXNMb2dnZWRJbi5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgU0VUX0FTX0xPR0dFRF9JTixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbG9naW5UaW1lOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNoYW5uZWxJZCxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbG9nT3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlKFNFVF9BU19MT0dHRURfT1VUKTtcbiAgICB9XG5cbiAgICB1c2VyU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0VXNlclN0YXR1cy5RdWVyeT4oR0VUX1VTRVJfU1RBVFVTLCB7fSwgJ2NhY2hlLWZpcnN0Jyk7XG4gICAgfVxuXG4gICAgdWlTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldFVpU3RhdGUuUXVlcnk+KEdFVF9VSV9TVEFURSwge30sICdjYWNoZS1maXJzdCcpO1xuICAgIH1cblxuICAgIHNldFVpTGFuZ3VhZ2UobGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUsIGxvY2FsZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFNldFVpTGFuZ3VhZ2UuTXV0YXRpb24sIFNldFVpTGFuZ3VhZ2UuVmFyaWFibGVzPihcbiAgICAgICAgICAgIFNFVF9VSV9MQU5HVUFHRV9BTkRfTE9DQUxFLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNldFVpTG9jYWxlKGxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8U2V0VWlMb2NhbGUuTXV0YXRpb24sIFNldFVpTG9jYWxlLlZhcmlhYmxlcz4oU0VUX1VJX0xPQ0FMRSwge1xuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50TGFuZ3VhZ2UobGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxTZXRDb250ZW50TGFuZ3VhZ2UuTXV0YXRpb24sIFNldENvbnRlbnRMYW5ndWFnZS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgU0VUX0NPTlRFTlRfTEFOR1VBR0UsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXRVaVRoZW1lKHRoZW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxTZXRVaVRoZW1lLk11dGF0aW9uLCBTZXRVaVRoZW1lLlZhcmlhYmxlcz4oU0VUX1VJX1RIRU1FLCB7XG4gICAgICAgICAgICB0aGVtZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0RGlzcGxheVVpRXh0ZW5zaW9uUG9pbnRzKGRpc3BsYXk6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxcbiAgICAgICAgICAgIFNldERpc3BsYXlVaUV4dGVuc2lvblBvaW50cy5NdXRhdGlvbixcbiAgICAgICAgICAgIFNldERpc3BsYXlVaUV4dGVuc2lvblBvaW50cy5WYXJpYWJsZXNcbiAgICAgICAgPihTRVRfRElTUExBWV9VSV9FWFRFTlNJT05fUE9JTlRTLCB7XG4gICAgICAgICAgICBkaXNwbGF5LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVDaGFubmVsKGNoYW5uZWxJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8U2V0QWN0aXZlQ2hhbm5lbC5NdXRhdGlvbiwgU2V0QWN0aXZlQ2hhbm5lbC5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgU0VUX0FDVElWRV9DSEFOTkVMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNoYW5uZWxJZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlVXNlckNoYW5uZWxzKGNoYW5uZWxzOiBDdXJyZW50VXNlckNoYW5uZWxJbnB1dFtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8VXBkYXRlVXNlckNoYW5uZWxzLk11dGF0aW9uLCBVcGRhdGVVc2VyQ2hhbm5lbHMuVmFyaWFibGVzPihcbiAgICAgICAgICAgIFVQREFURV9VU0VSX0NIQU5ORUxTLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNoYW5uZWxzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=