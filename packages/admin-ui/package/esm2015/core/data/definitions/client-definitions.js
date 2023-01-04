import { gql } from 'apollo-angular';
export const REQUEST_STARTED = gql `
    mutation RequestStarted {
        requestStarted @client
    }
`;
export const REQUEST_COMPLETED = gql `
    mutation RequestCompleted {
        requestCompleted @client
    }
`;
export const USER_STATUS_FRAGMENT = gql `
    fragment UserStatus on UserStatus {
        username
        isLoggedIn
        loginTime
        activeChannelId
        permissions
        channels {
            id
            code
            token
            permissions
        }
    }
`;
export const SET_AS_LOGGED_IN = gql `
    mutation SetAsLoggedIn($input: UserStatusInput!) {
        setAsLoggedIn(input: $input) @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
export const SET_AS_LOGGED_OUT = gql `
    mutation SetAsLoggedOut {
        setAsLoggedOut @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
export const SET_UI_LANGUAGE_AND_LOCALE = gql `
    mutation SetUiLanguage($languageCode: LanguageCode!, $locale: String) {
        setUiLanguage(languageCode: $languageCode) @client
        setUiLocale(locale: $locale) @client
    }
`;
export const SET_UI_LOCALE = gql `
    mutation SetUiLocale($locale: String) {
        setUiLocale(locale: $locale) @client
    }
`;
export const SET_DISPLAY_UI_EXTENSION_POINTS = gql `
    mutation SetDisplayUiExtensionPoints($display: Boolean!) {
        setDisplayUiExtensionPoints(display: $display) @client
    }
`;
export const SET_CONTENT_LANGUAGE = gql `
    mutation SetContentLanguage($languageCode: LanguageCode!) {
        setContentLanguage(languageCode: $languageCode) @client
    }
`;
export const SET_UI_THEME = gql `
    mutation SetUiTheme($theme: String!) {
        setUiTheme(theme: $theme) @client
    }
`;
export const GET_NEWTORK_STATUS = gql `
    query GetNetworkStatus {
        networkStatus @client {
            inFlightRequests
        }
    }
`;
export const GET_USER_STATUS = gql `
    query GetUserStatus {
        userStatus @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
export const GET_UI_STATE = gql `
    query GetUiState {
        uiState @client {
            language
            locale
            contentLanguage
            theme
            displayUiExtensionPoints
        }
    }
`;
export const GET_CLIENT_STATE = gql `
    query GetClientState {
        networkStatus @client {
            inFlightRequests
        }
        userStatus @client {
            ...UserStatus
        }
        uiState @client {
            language
            locale
            contentLanguage
            theme
            displayUiExtensionPoints
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
export const SET_ACTIVE_CHANNEL = gql `
    mutation SetActiveChannel($channelId: ID!) {
        setActiveChannel(channelId: $channelId) @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
export const UPDATE_USER_CHANNELS = gql `
    mutation UpdateUserChannels($channels: [CurrentUserChannelInput!]!) {
        updateUserChannels(channels: $channels) @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWRlZmluaXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9kYXRhL2RlZmluaXRpb25zL2NsaWVudC1kZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQTs7OztDQUlqQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBOzs7O0NBSW5DLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7O0NBY3RDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU03QixvQkFBb0I7Q0FDekIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTTlCLG9CQUFvQjtDQUN6QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsR0FBRyxDQUFBOzs7OztDQUs1QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQTs7OztDQUkvQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsR0FBRyxDQUFBOzs7O0NBSWpELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7Q0FJdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUE7Ozs7Q0FJOUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O0NBTXBDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNNUIsb0JBQW9CO0NBQ3pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O0NBVTlCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQjdCLG9CQUFvQjtDQUN6QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNL0Isb0JBQW9CO0NBQ3pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1qQyxvQkFBb0I7Q0FDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcblxuZXhwb3J0IGNvbnN0IFJFUVVFU1RfU1RBUlRFRCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZXF1ZXN0U3RhcnRlZCB7XG4gICAgICAgIHJlcXVlc3RTdGFydGVkIEBjbGllbnRcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVRVUVTVF9DT01QTEVURUQgPSBncWxgXG4gICAgbXV0YXRpb24gUmVxdWVzdENvbXBsZXRlZCB7XG4gICAgICAgIHJlcXVlc3RDb21wbGV0ZWQgQGNsaWVudFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVU0VSX1NUQVRVU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBVc2VyU3RhdHVzIG9uIFVzZXJTdGF0dXMge1xuICAgICAgICB1c2VybmFtZVxuICAgICAgICBpc0xvZ2dlZEluXG4gICAgICAgIGxvZ2luVGltZVxuICAgICAgICBhY3RpdmVDaGFubmVsSWRcbiAgICAgICAgcGVybWlzc2lvbnNcbiAgICAgICAgY2hhbm5lbHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIHRva2VuXG4gICAgICAgICAgICBwZXJtaXNzaW9uc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNFVF9BU19MT0dHRURfSU4gPSBncWxgXG4gICAgbXV0YXRpb24gU2V0QXNMb2dnZWRJbigkaW5wdXQ6IFVzZXJTdGF0dXNJbnB1dCEpIHtcbiAgICAgICAgc2V0QXNMb2dnZWRJbihpbnB1dDogJGlucHV0KSBAY2xpZW50IHtcbiAgICAgICAgICAgIC4uLlVzZXJTdGF0dXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1VTRVJfU1RBVFVTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNFVF9BU19MT0dHRURfT1VUID0gZ3FsYFxuICAgIG11dGF0aW9uIFNldEFzTG9nZ2VkT3V0IHtcbiAgICAgICAgc2V0QXNMb2dnZWRPdXQgQGNsaWVudCB7XG4gICAgICAgICAgICAuLi5Vc2VyU3RhdHVzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtVU0VSX1NUQVRVU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTRVRfVUlfTEFOR1VBR0VfQU5EX0xPQ0FMRSA9IGdxbGBcbiAgICBtdXRhdGlvbiBTZXRVaUxhbmd1YWdlKCRsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSEsICRsb2NhbGU6IFN0cmluZykge1xuICAgICAgICBzZXRVaUxhbmd1YWdlKGxhbmd1YWdlQ29kZTogJGxhbmd1YWdlQ29kZSkgQGNsaWVudFxuICAgICAgICBzZXRVaUxvY2FsZShsb2NhbGU6ICRsb2NhbGUpIEBjbGllbnRcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUX1VJX0xPQ0FMRSA9IGdxbGBcbiAgICBtdXRhdGlvbiBTZXRVaUxvY2FsZSgkbG9jYWxlOiBTdHJpbmcpIHtcbiAgICAgICAgc2V0VWlMb2NhbGUobG9jYWxlOiAkbG9jYWxlKSBAY2xpZW50XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNFVF9ESVNQTEFZX1VJX0VYVEVOU0lPTl9QT0lOVFMgPSBncWxgXG4gICAgbXV0YXRpb24gU2V0RGlzcGxheVVpRXh0ZW5zaW9uUG9pbnRzKCRkaXNwbGF5OiBCb29sZWFuISkge1xuICAgICAgICBzZXREaXNwbGF5VWlFeHRlbnNpb25Qb2ludHMoZGlzcGxheTogJGRpc3BsYXkpIEBjbGllbnRcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUX0NPTlRFTlRfTEFOR1VBR0UgPSBncWxgXG4gICAgbXV0YXRpb24gU2V0Q29udGVudExhbmd1YWdlKCRsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSEpIHtcbiAgICAgICAgc2V0Q29udGVudExhbmd1YWdlKGxhbmd1YWdlQ29kZTogJGxhbmd1YWdlQ29kZSkgQGNsaWVudFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTRVRfVUlfVEhFTUUgPSBncWxgXG4gICAgbXV0YXRpb24gU2V0VWlUaGVtZSgkdGhlbWU6IFN0cmluZyEpIHtcbiAgICAgICAgc2V0VWlUaGVtZSh0aGVtZTogJHRoZW1lKSBAY2xpZW50XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9ORVdUT1JLX1NUQVRVUyA9IGdxbGBcbiAgICBxdWVyeSBHZXROZXR3b3JrU3RhdHVzIHtcbiAgICAgICAgbmV0d29ya1N0YXR1cyBAY2xpZW50IHtcbiAgICAgICAgICAgIGluRmxpZ2h0UmVxdWVzdHNcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfVVNFUl9TVEFUVVMgPSBncWxgXG4gICAgcXVlcnkgR2V0VXNlclN0YXR1cyB7XG4gICAgICAgIHVzZXJTdGF0dXMgQGNsaWVudCB7XG4gICAgICAgICAgICAuLi5Vc2VyU3RhdHVzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtVU0VSX1NUQVRVU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfVUlfU1RBVEUgPSBncWxgXG4gICAgcXVlcnkgR2V0VWlTdGF0ZSB7XG4gICAgICAgIHVpU3RhdGUgQGNsaWVudCB7XG4gICAgICAgICAgICBsYW5ndWFnZVxuICAgICAgICAgICAgbG9jYWxlXG4gICAgICAgICAgICBjb250ZW50TGFuZ3VhZ2VcbiAgICAgICAgICAgIHRoZW1lXG4gICAgICAgICAgICBkaXNwbGF5VWlFeHRlbnNpb25Qb2ludHNcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ0xJRU5UX1NUQVRFID0gZ3FsYFxuICAgIHF1ZXJ5IEdldENsaWVudFN0YXRlIHtcbiAgICAgICAgbmV0d29ya1N0YXR1cyBAY2xpZW50IHtcbiAgICAgICAgICAgIGluRmxpZ2h0UmVxdWVzdHNcbiAgICAgICAgfVxuICAgICAgICB1c2VyU3RhdHVzIEBjbGllbnQge1xuICAgICAgICAgICAgLi4uVXNlclN0YXR1c1xuICAgICAgICB9XG4gICAgICAgIHVpU3RhdGUgQGNsaWVudCB7XG4gICAgICAgICAgICBsYW5ndWFnZVxuICAgICAgICAgICAgbG9jYWxlXG4gICAgICAgICAgICBjb250ZW50TGFuZ3VhZ2VcbiAgICAgICAgICAgIHRoZW1lXG4gICAgICAgICAgICBkaXNwbGF5VWlFeHRlbnNpb25Qb2ludHNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1VTRVJfU1RBVFVTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNFVF9BQ1RJVkVfQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBTZXRBY3RpdmVDaGFubmVsKCRjaGFubmVsSWQ6IElEISkge1xuICAgICAgICBzZXRBY3RpdmVDaGFubmVsKGNoYW5uZWxJZDogJGNoYW5uZWxJZCkgQGNsaWVudCB7XG4gICAgICAgICAgICAuLi5Vc2VyU3RhdHVzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtVU0VSX1NUQVRVU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfVVNFUl9DSEFOTkVMUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVVc2VyQ2hhbm5lbHMoJGNoYW5uZWxzOiBbQ3VycmVudFVzZXJDaGFubmVsSW5wdXQhXSEpIHtcbiAgICAgICAgdXBkYXRlVXNlckNoYW5uZWxzKGNoYW5uZWxzOiAkY2hhbm5lbHMpIEBjbGllbnQge1xuICAgICAgICAgICAgLi4uVXNlclN0YXR1c1xuICAgICAgICB9XG4gICAgfVxuICAgICR7VVNFUl9TVEFUVVNfRlJBR01FTlR9XG5gO1xuIl19