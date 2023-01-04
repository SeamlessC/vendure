import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const CURRENT_USER_FRAGMENT = gql `
    fragment CurrentUser on CurrentUser {
        id
        identifier
        channels {
            id
            code
            token
            permissions
        }
    }
`;
export const ATTEMPT_LOGIN = gql `
    mutation AttemptLogin($username: String!, $password: String!, $rememberMe: Boolean!) {
        login(username: $username, password: $password, rememberMe: $rememberMe) {
            ...CurrentUser
            ...ErrorResult
        }
    }
    ${CURRENT_USER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const LOG_OUT = gql `
    mutation LogOut {
        logout {
            success
        }
    }
`;
export const GET_CURRENT_USER = gql `
    query GetCurrentUser {
        me {
            ...CurrentUser
        }
    }
    ${CURRENT_USER_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1kZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9kZWZpbml0aW9ucy9hdXRoLWRlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3ZDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O01BTzFCLHFCQUFxQjtNQUNyQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUE7Ozs7OztDQU16QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNN0IscUJBQXFCO0NBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmltcG9ydCB7IEVSUk9SX1JFU1VMVF9GUkFHTUVOVCB9IGZyb20gJy4vc2hhcmVkLWRlZmluaXRpb25zJztcblxuZXhwb3J0IGNvbnN0IENVUlJFTlRfVVNFUl9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDdXJyZW50VXNlciBvbiBDdXJyZW50VXNlciB7XG4gICAgICAgIGlkXG4gICAgICAgIGlkZW50aWZpZXJcbiAgICAgICAgY2hhbm5lbHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIHRva2VuXG4gICAgICAgICAgICBwZXJtaXNzaW9uc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEFUVEVNUFRfTE9HSU4gPSBncWxgXG4gICAgbXV0YXRpb24gQXR0ZW1wdExvZ2luKCR1c2VybmFtZTogU3RyaW5nISwgJHBhc3N3b3JkOiBTdHJpbmchLCAkcmVtZW1iZXJNZTogQm9vbGVhbiEpIHtcbiAgICAgICAgbG9naW4odXNlcm5hbWU6ICR1c2VybmFtZSwgcGFzc3dvcmQ6ICRwYXNzd29yZCwgcmVtZW1iZXJNZTogJHJlbWVtYmVyTWUpIHtcbiAgICAgICAgICAgIC4uLkN1cnJlbnRVc2VyXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VSUkVOVF9VU0VSX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IExPR19PVVQgPSBncWxgXG4gICAgbXV0YXRpb24gTG9nT3V0IHtcbiAgICAgICAgbG9nb3V0IHtcbiAgICAgICAgICAgIHN1Y2Nlc3NcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ1VSUkVOVF9VU0VSID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEN1cnJlbnRVc2VyIHtcbiAgICAgICAgbWUge1xuICAgICAgICAgICAgLi4uQ3VycmVudFVzZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NVUlJFTlRfVVNFUl9GUkFHTUVOVH1cbmA7XG4iXX0=