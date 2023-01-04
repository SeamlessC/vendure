import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const ADDRESS_FRAGMENT = gql `
    fragment Address on Address {
        id
        createdAt
        updatedAt
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;
export const CUSTOMER_FRAGMENT = gql `
    fragment Customer on Customer {
        id
        createdAt
        updatedAt
        title
        firstName
        lastName
        phoneNumber
        emailAddress
        user {
            id
            identifier
            verified
            lastLogin
        }
        addresses {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const CUSTOMER_GROUP_FRAGMENT = gql `
    fragment CustomerGroup on CustomerGroup {
        id
        createdAt
        updatedAt
        name
    }
`;
export const GET_CUSTOMER_LIST = gql `
    query GetCustomerList($options: CustomerListOptions) {
        customers(options: $options) {
            items {
                id
                createdAt
                updatedAt
                title
                firstName
                lastName
                emailAddress
                user {
                    id
                    verified
                }
            }
            totalItems
        }
    }
`;
export const GET_CUSTOMER = gql `
    query GetCustomer($id: ID!, $orderListOptions: OrderListOptions) {
        customer(id: $id) {
            ...Customer
            groups {
                id
                name
            }
            orders(options: $orderListOptions) {
                items {
                    id
                    code
                    state
                    totalWithTax
                    currencyCode
                    updatedAt
                }
                totalItems
            }
        }
    }
    ${CUSTOMER_FRAGMENT}
`;
export const CREATE_CUSTOMER = gql `
    mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {
        createCustomer(input: $input, password: $password) {
            ...Customer
            ...ErrorResult
        }
    }
    ${CUSTOMER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const UPDATE_CUSTOMER = gql `
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
        updateCustomer(input: $input) {
            ...Customer
            ...ErrorResult
        }
    }
    ${CUSTOMER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const DELETE_CUSTOMER = gql `
    mutation DeleteCustomer($id: ID!) {
        deleteCustomer(id: $id) {
            result
            message
        }
    }
`;
export const CREATE_CUSTOMER_ADDRESS = gql `
    mutation CreateCustomerAddress($customerId: ID!, $input: CreateAddressInput!) {
        createCustomerAddress(customerId: $customerId, input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const UPDATE_CUSTOMER_ADDRESS = gql `
    mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
export const DELETE_CUSTOMER_ADDRESS = gql `
    mutation DeleteCustomerAddress($id: ID!) {
        deleteCustomerAddress(id: $id) {
            success
        }
    }
`;
export const CREATE_CUSTOMER_GROUP = gql `
    mutation CreateCustomerGroup($input: CreateCustomerGroupInput!) {
        createCustomerGroup(input: $input) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
export const UPDATE_CUSTOMER_GROUP = gql `
    mutation UpdateCustomerGroup($input: UpdateCustomerGroupInput!) {
        updateCustomerGroup(input: $input) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
export const DELETE_CUSTOMER_GROUP = gql `
    mutation DeleteCustomerGroup($id: ID!) {
        deleteCustomerGroup(id: $id) {
            result
            message
        }
    }
`;
export const GET_CUSTOMER_GROUPS = gql `
    query GetCustomerGroups($options: CustomerGroupListOptions) {
        customerGroups(options: $options) {
            items {
                ...CustomerGroup
            }
            totalItems
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
export const GET_CUSTOMER_GROUP_WITH_CUSTOMERS = gql `
    query GetCustomerGroupWithCustomers($id: ID!, $options: CustomerListOptions) {
        customerGroup(id: $id) {
            ...CustomerGroup
            customers(options: $options) {
                items {
                    id
                    createdAt
                    updatedAt
                    emailAddress
                    firstName
                    lastName
                }
                totalItems
            }
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
export const ADD_CUSTOMERS_TO_GROUP = gql `
    mutation AddCustomersToGroup($groupId: ID!, $customerIds: [ID!]!) {
        addCustomersToGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
export const REMOVE_CUSTOMERS_FROM_GROUP = gql `
    mutation RemoveCustomersFromGroup($groupId: ID!, $customerIds: [ID!]!) {
        removeCustomersFromGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
export const GET_CUSTOMER_HISTORY = gql `
    query GetCustomerHistory($id: ID!, $options: HistoryEntryListOptions) {
        customer(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`;
export const ADD_NOTE_TO_CUSTOMER = gql `
    mutation AddNoteToCustomer($input: AddNoteToCustomerInput!) {
        addNoteToCustomer(input: $input) {
            id
        }
    }
`;
export const UPDATE_CUSTOMER_NOTE = gql `
    mutation UpdateCustomerNote($input: UpdateCustomerNoteInput!) {
        updateCustomerNote(input: $input) {
            id
            data
            isPublic
        }
    }
`;
export const DELETE_CUSTOMER_NOTE = gql `
    mutation DeleteCustomerNote($id: ID!) {
        deleteCustomerNote(id: $id) {
            result
            message
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvY3VzdG9tZXItZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJsQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9COUIsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Q0FPekMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1CbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXFCekIsaUJBQWlCO0NBQ3RCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O01BTzVCLGlCQUFpQjtNQUNqQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7TUFPNUIsaUJBQWlCO01BQ2pCLHFCQUFxQjtDQUMxQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU9qQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNcEMsZ0JBQWdCO0NBQ3JCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1wQyxnQkFBZ0I7Q0FDckIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQTs7Ozs7O0NBTXpDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1sQyx1QkFBdUI7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTWxDLHVCQUF1QjtDQUM1QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT3ZDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztNQVNoQyx1QkFBdUI7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFpQjlDLHVCQUF1QjtDQUM1QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNbkMsdUJBQXVCO0NBQzVCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU14Qyx1QkFBdUI7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJ0QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Q0FNdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Q0FRdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztDQU90QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBFUlJPUl9SRVNVTFRfRlJBR01FTlQgfSBmcm9tICcuL3NoYXJlZC1kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBBRERSRVNTX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEFkZHJlc3Mgb24gQWRkcmVzcyB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgZnVsbE5hbWVcbiAgICAgICAgY29tcGFueVxuICAgICAgICBzdHJlZXRMaW5lMVxuICAgICAgICBzdHJlZXRMaW5lMlxuICAgICAgICBjaXR5XG4gICAgICAgIHByb3ZpbmNlXG4gICAgICAgIHBvc3RhbENvZGVcbiAgICAgICAgY291bnRyeSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICAgIHBob25lTnVtYmVyXG4gICAgICAgIGRlZmF1bHRTaGlwcGluZ0FkZHJlc3NcbiAgICAgICAgZGVmYXVsdEJpbGxpbmdBZGRyZXNzXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENVU1RPTUVSX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEN1c3RvbWVyIG9uIEN1c3RvbWVyIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICB0aXRsZVxuICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgcGhvbmVOdW1iZXJcbiAgICAgICAgZW1haWxBZGRyZXNzXG4gICAgICAgIHVzZXIge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGlkZW50aWZpZXJcbiAgICAgICAgICAgIHZlcmlmaWVkXG4gICAgICAgICAgICBsYXN0TG9naW5cbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzZXMge1xuICAgICAgICAgICAgLi4uQWRkcmVzc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7QUREUkVTU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDVVNUT01FUl9HUk9VUF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDdXN0b21lckdyb3VwIG9uIEN1c3RvbWVyR3JvdXAge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NVU1RPTUVSX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0Q3VzdG9tZXJMaXN0KCRvcHRpb25zOiBDdXN0b21lckxpc3RPcHRpb25zKSB7XG4gICAgICAgIGN1c3RvbWVycyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgdGl0bGVcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgICAgICBsYXN0TmFtZVxuICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzc1xuICAgICAgICAgICAgICAgIHVzZXIge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZmllZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ1VTVE9NRVIgPSBncWxgXG4gICAgcXVlcnkgR2V0Q3VzdG9tZXIoJGlkOiBJRCEsICRvcmRlckxpc3RPcHRpb25zOiBPcmRlckxpc3RPcHRpb25zKSB7XG4gICAgICAgIGN1c3RvbWVyKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLkN1c3RvbWVyXG4gICAgICAgICAgICBncm91cHMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JkZXJzKG9wdGlvbnM6ICRvcmRlckxpc3RPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsV2l0aFRheFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGVcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NVU1RPTUVSX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9DVVNUT01FUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVDdXN0b21lcigkaW5wdXQ6IENyZWF0ZUN1c3RvbWVySW5wdXQhLCAkcGFzc3dvcmQ6IFN0cmluZykge1xuICAgICAgICBjcmVhdGVDdXN0b21lcihpbnB1dDogJGlucHV0LCBwYXNzd29yZDogJHBhc3N3b3JkKSB7XG4gICAgICAgICAgICAuLi5DdXN0b21lclxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0NVU1RPTUVSX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DVVNUT01FUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVDdXN0b21lcigkaW5wdXQ6IFVwZGF0ZUN1c3RvbWVySW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUN1c3RvbWVyKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkN1c3RvbWVyXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NRVJfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0NVU1RPTUVSID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUN1c3RvbWVyKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZUN1c3RvbWVyKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9DVVNUT01FUl9BRERSRVNTID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUN1c3RvbWVyQWRkcmVzcygkY3VzdG9tZXJJZDogSUQhLCAkaW5wdXQ6IENyZWF0ZUFkZHJlc3NJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlQ3VzdG9tZXJBZGRyZXNzKGN1c3RvbWVySWQ6ICRjdXN0b21lcklkLCBpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5BZGRyZXNzXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBRERSRVNTX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DVVNUT01FUl9BRERSRVNTID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUN1c3RvbWVyQWRkcmVzcygkaW5wdXQ6IFVwZGF0ZUFkZHJlc3NJbnB1dCEpIHtcbiAgICAgICAgdXBkYXRlQ3VzdG9tZXJBZGRyZXNzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLkFkZHJlc3NcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FERFJFU1NfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0NVU1RPTUVSX0FERFJFU1MgPSBncWxgXG4gICAgbXV0YXRpb24gRGVsZXRlQ3VzdG9tZXJBZGRyZXNzKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZUN1c3RvbWVyQWRkcmVzcyhpZDogJGlkKSB7XG4gICAgICAgICAgICBzdWNjZXNzXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0NVU1RPTUVSX0dST1VQID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUN1c3RvbWVyR3JvdXAoJGlucHV0OiBDcmVhdGVDdXN0b21lckdyb3VwSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZUN1c3RvbWVyR3JvdXAoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJHcm91cFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NRVJfR1JPVVBfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0NVU1RPTUVSX0dST1VQID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZUN1c3RvbWVyR3JvdXAoJGlucHV0OiBVcGRhdGVDdXN0b21lckdyb3VwSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUN1c3RvbWVyR3JvdXAoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJHcm91cFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NRVJfR1JPVVBfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0NVU1RPTUVSX0dST1VQID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUN1c3RvbWVyR3JvdXAoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlQ3VzdG9tZXJHcm91cChpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ1VTVE9NRVJfR1JPVVBTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldEN1c3RvbWVyR3JvdXBzKCRvcHRpb25zOiBDdXN0b21lckdyb3VwTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY3VzdG9tZXJHcm91cHMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAuLi5DdXN0b21lckdyb3VwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtDVVNUT01FUl9HUk9VUF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfQ1VTVE9NRVJfR1JPVVBfV0lUSF9DVVNUT01FUlMgPSBncWxgXG4gICAgcXVlcnkgR2V0Q3VzdG9tZXJHcm91cFdpdGhDdXN0b21lcnMoJGlkOiBJRCEsICRvcHRpb25zOiBDdXN0b21lckxpc3RPcHRpb25zKSB7XG4gICAgICAgIGN1c3RvbWVyR3JvdXAoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJHcm91cFxuICAgICAgICAgICAgY3VzdG9tZXJzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NRVJfR1JPVVBfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX0NVU1RPTUVSU19UT19HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGRDdXN0b21lcnNUb0dyb3VwKCRncm91cElkOiBJRCEsICRjdXN0b21lcklkczogW0lEIV0hKSB7XG4gICAgICAgIGFkZEN1c3RvbWVyc1RvR3JvdXAoY3VzdG9tZXJHcm91cElkOiAkZ3JvdXBJZCwgY3VzdG9tZXJJZHM6ICRjdXN0b21lcklkcykge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJHcm91cFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NRVJfR1JPVVBfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX0NVU1RPTUVSU19GUk9NX0dST1VQID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlbW92ZUN1c3RvbWVyc0Zyb21Hcm91cCgkZ3JvdXBJZDogSUQhLCAkY3VzdG9tZXJJZHM6IFtJRCFdISkge1xuICAgICAgICByZW1vdmVDdXN0b21lcnNGcm9tR3JvdXAoY3VzdG9tZXJHcm91cElkOiAkZ3JvdXBJZCwgY3VzdG9tZXJJZHM6ICRjdXN0b21lcklkcykge1xuICAgICAgICAgICAgLi4uQ3VzdG9tZXJHcm91cFxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q1VTVE9NRVJfR1JPVVBfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0NVU1RPTUVSX0hJU1RPUlkgPSBncWxgXG4gICAgcXVlcnkgR2V0Q3VzdG9tZXJIaXN0b3J5KCRpZDogSUQhLCAkb3B0aW9uczogSGlzdG9yeUVudHJ5TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY3VzdG9tZXIoaWQ6ICRpZCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGhpc3Rvcnkob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICBpc1B1YmxpY1xuICAgICAgICAgICAgICAgICAgICBhZG1pbmlzdHJhdG9yIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRERfTk9URV9UT19DVVNUT01FUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGROb3RlVG9DdXN0b21lcigkaW5wdXQ6IEFkZE5vdGVUb0N1c3RvbWVySW5wdXQhKSB7XG4gICAgICAgIGFkZE5vdGVUb0N1c3RvbWVyKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0NVU1RPTUVSX05PVEUgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlQ3VzdG9tZXJOb3RlKCRpbnB1dDogVXBkYXRlQ3VzdG9tZXJOb3RlSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUN1c3RvbWVyTm90ZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgaXNQdWJsaWNcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfQ1VTVE9NRVJfTk9URSA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVDdXN0b21lck5vdGUoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlQ3VzdG9tZXJOb3RlKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcbiJdfQ==