import { gql } from 'apollo-angular';
export const ROLE_FRAGMENT = gql `
    fragment Role on Role {
        id
        createdAt
        updatedAt
        code
        description
        permissions
        channels {
            id
            code
            token
        }
    }
`;
export const ADMINISTRATOR_FRAGMENT = gql `
    fragment Administrator on Administrator {
        id
        createdAt
        updatedAt
        firstName
        lastName
        emailAddress
        user {
            id
            identifier
            lastLogin
            roles {
                ...Role
            }
        }
    }
    ${ROLE_FRAGMENT}
`;
export const GET_ADMINISTRATORS = gql `
    query GetAdministrators($options: AdministratorListOptions) {
        administrators(options: $options) {
            items {
                ...Administrator
            }
            totalItems
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
export const GET_ACTIVE_ADMINISTRATOR = gql `
    query GetActiveAdministrator {
        activeAdministrator {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
export const GET_ADMINISTRATOR = gql `
    query GetAdministrator($id: ID!) {
        administrator(id: $id) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
export const CREATE_ADMINISTRATOR = gql `
    mutation CreateAdministrator($input: CreateAdministratorInput!) {
        createAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
export const UPDATE_ADMINISTRATOR = gql `
    mutation UpdateAdministrator($input: UpdateAdministratorInput!) {
        updateAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
export const UPDATE_ACTIVE_ADMINISTRATOR = gql `
    mutation UpdateActiveAdministrator($input: UpdateActiveAdministratorInput!) {
        updateActiveAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
export const DELETE_ADMINISTRATOR = gql `
    mutation DeleteAdministrator($id: ID!) {
        deleteAdministrator(id: $id) {
            result
            message
        }
    }
`;
export const GET_ROLES = gql `
    query GetRoles($options: RoleListOptions) {
        roles(options: $options) {
            items {
                ...Role
            }
            totalItems
        }
    }
    ${ROLE_FRAGMENT}
`;
export const GET_ROLE = gql `
    query GetRole($id: ID!) {
        role(id: $id) {
            ...Role
        }
    }
    ${ROLE_FRAGMENT}
`;
export const CREATE_ROLE = gql `
    mutation CreateRole($input: CreateRoleInput!) {
        createRole(input: $input) {
            ...Role
        }
    }
    ${ROLE_FRAGMENT}
`;
export const UPDATE_ROLE = gql `
    mutation UpdateRole($input: UpdateRoleInput!) {
        updateRole(input: $input) {
            ...Role
        }
    }
    ${ROLE_FRAGMENT}
`;
export const DELETE_ROLE = gql `
    mutation DeleteRole($id: ID!) {
        deleteRole(id: $id) {
            result
            message
        }
    }
`;
export const ASSIGN_ROLE_TO_ADMINISTRATOR = gql `
    mutation AssignRoleToAdministrator($administratorId: ID!, $roleId: ID!) {
        assignRoleToAdministrator(administratorId: $administratorId, roleId: $roleId) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRvci1kZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9kZWZpbml0aW9ucy9hZG1pbmlzdHJhdG9yLWRlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7OztDQWMvQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztNQWlCbkMsYUFBYTtDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7TUFTL0Isc0JBQXNCO0NBQzNCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1yQyxzQkFBc0I7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTTlCLHNCQUFzQjtDQUMzQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNakMsc0JBQXNCO0NBQzNCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1qQyxzQkFBc0I7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXhDLHNCQUFzQjtDQUMzQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT3RDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7TUFTdEIsYUFBYTtDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXJCLGFBQWE7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU14QixhQUFhO0NBQ2xCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNeEIsYUFBYTtDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU83QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNekMsc0JBQXNCO0NBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBST0xFX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFJvbGUgb24gUm9sZSB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgY29kZVxuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICBwZXJtaXNzaW9uc1xuICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgdG9rZW5cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRE1JTklTVFJBVE9SX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEFkbWluaXN0cmF0b3Igb24gQWRtaW5pc3RyYXRvciB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgZmlyc3ROYW1lXG4gICAgICAgIGxhc3ROYW1lXG4gICAgICAgIGVtYWlsQWRkcmVzc1xuICAgICAgICB1c2VyIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBpZGVudGlmaWVyXG4gICAgICAgICAgICBsYXN0TG9naW5cbiAgICAgICAgICAgIHJvbGVzIHtcbiAgICAgICAgICAgICAgICAuLi5Sb2xlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtST0xFX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9BRE1JTklTVFJBVE9SUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRBZG1pbmlzdHJhdG9ycygkb3B0aW9uczogQWRtaW5pc3RyYXRvckxpc3RPcHRpb25zKSB7XG4gICAgICAgIGFkbWluaXN0cmF0b3JzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgLi4uQWRtaW5pc3RyYXRvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7QURNSU5JU1RSQVRPUl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQUNUSVZFX0FETUlOSVNUUkFUT1IgPSBncWxgXG4gICAgcXVlcnkgR2V0QWN0aXZlQWRtaW5pc3RyYXRvciB7XG4gICAgICAgIGFjdGl2ZUFkbWluaXN0cmF0b3Ige1xuICAgICAgICAgICAgLi4uQWRtaW5pc3RyYXRvclxuICAgICAgICB9XG4gICAgfVxuICAgICR7QURNSU5JU1RSQVRPUl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQURNSU5JU1RSQVRPUiA9IGdxbGBcbiAgICBxdWVyeSBHZXRBZG1pbmlzdHJhdG9yKCRpZDogSUQhKSB7XG4gICAgICAgIGFkbWluaXN0cmF0b3IoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uQWRtaW5pc3RyYXRvclxuICAgICAgICB9XG4gICAgfVxuICAgICR7QURNSU5JU1RSQVRPUl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfQURNSU5JU1RSQVRPUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVBZG1pbmlzdHJhdG9yKCRpbnB1dDogQ3JlYXRlQWRtaW5pc3RyYXRvcklucHV0ISkge1xuICAgICAgICBjcmVhdGVBZG1pbmlzdHJhdG9yKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkFkbWluaXN0cmF0b3JcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FETUlOSVNUUkFUT1JfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0FETUlOSVNUUkFUT1IgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlQWRtaW5pc3RyYXRvcigkaW5wdXQ6IFVwZGF0ZUFkbWluaXN0cmF0b3JJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlQWRtaW5pc3RyYXRvcihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5BZG1pbmlzdHJhdG9yXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBRE1JTklTVFJBVE9SX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9BQ1RJVkVfQURNSU5JU1RSQVRPUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVBY3RpdmVBZG1pbmlzdHJhdG9yKCRpbnB1dDogVXBkYXRlQWN0aXZlQWRtaW5pc3RyYXRvcklucHV0ISkge1xuICAgICAgICB1cGRhdGVBY3RpdmVBZG1pbmlzdHJhdG9yKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkFkbWluaXN0cmF0b3JcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FETUlOSVNUUkFUT1JfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0FETUlOSVNUUkFUT1IgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlQWRtaW5pc3RyYXRvcigkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVBZG1pbmlzdHJhdG9yKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9ST0xFUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRSb2xlcygkb3B0aW9uczogUm9sZUxpc3RPcHRpb25zKSB7XG4gICAgICAgIHJvbGVzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgLi4uUm9sZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7Uk9MRV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUk9MRSA9IGdxbGBcbiAgICBxdWVyeSBHZXRSb2xlKCRpZDogSUQhKSB7XG4gICAgICAgIHJvbGUoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uUm9sZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Uk9MRV9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfUk9MRSA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVSb2xlKCRpbnB1dDogQ3JlYXRlUm9sZUlucHV0ISkge1xuICAgICAgICBjcmVhdGVSb2xlKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlJvbGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1JPTEVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1JPTEUgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlUm9sZSgkaW5wdXQ6IFVwZGF0ZVJvbGVJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlUm9sZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Sb2xlXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtST0xFX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9ST0xFID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVJvbGUoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlUm9sZShpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBU1NJR05fUk9MRV9UT19BRE1JTklTVFJBVE9SID0gZ3FsYFxuICAgIG11dGF0aW9uIEFzc2lnblJvbGVUb0FkbWluaXN0cmF0b3IoJGFkbWluaXN0cmF0b3JJZDogSUQhLCAkcm9sZUlkOiBJRCEpIHtcbiAgICAgICAgYXNzaWduUm9sZVRvQWRtaW5pc3RyYXRvcihhZG1pbmlzdHJhdG9ySWQ6ICRhZG1pbmlzdHJhdG9ySWQsIHJvbGVJZDogJHJvbGVJZCkge1xuICAgICAgICAgICAgLi4uQWRtaW5pc3RyYXRvclxuICAgICAgICB9XG4gICAgfVxuICAgICR7QURNSU5JU1RSQVRPUl9GUkFHTUVOVH1cbmA7XG4iXX0=