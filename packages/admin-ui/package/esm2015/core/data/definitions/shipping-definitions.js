import { gql } from 'apollo-angular';
import { CONFIGURABLE_OPERATION_DEF_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT } from './shared-definitions';
export const SHIPPING_METHOD_FRAGMENT = gql `
    fragment ShippingMethod on ShippingMethod {
        id
        createdAt
        updatedAt
        code
        name
        description
        fulfillmentHandlerCode
        checker {
            ...ConfigurableOperation
        }
        calculator {
            ...ConfigurableOperation
        }
        translations {
            id
            languageCode
            name
            description
        }
    }
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
export const GET_SHIPPING_METHOD_LIST = gql `
    query GetShippingMethodList($options: ShippingMethodListOptions) {
        shippingMethods(options: $options) {
            items {
                ...ShippingMethod
            }
            totalItems
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
export const GET_SHIPPING_METHOD = gql `
    query GetShippingMethod($id: ID!) {
        shippingMethod(id: $id) {
            ...ShippingMethod
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
export const GET_SHIPPING_METHOD_OPERATIONS = gql `
    query GetShippingMethodOperations {
        shippingEligibilityCheckers {
            ...ConfigurableOperationDef
        }
        shippingCalculators {
            ...ConfigurableOperationDef
        }
        fulfillmentHandlers {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
export const CREATE_SHIPPING_METHOD = gql `
    mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
        createShippingMethod(input: $input) {
            ...ShippingMethod
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
export const UPDATE_SHIPPING_METHOD = gql `
    mutation UpdateShippingMethod($input: UpdateShippingMethodInput!) {
        updateShippingMethod(input: $input) {
            ...ShippingMethod
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
export const DELETE_SHIPPING_METHOD = gql `
    mutation DeleteShippingMethod($id: ID!) {
        deleteShippingMethod(id: $id) {
            result
            message
        }
    }
`;
export const TEST_SHIPPING_METHOD = gql `
    query TestShippingMethod($input: TestShippingMethodInput!) {
        testShippingMethod(input: $input) {
            eligible
            quote {
                price
                priceWithTax
                metadata
            }
        }
    }
`;
export const TEST_ELIGIBLE_SHIPPING_METHODS = gql `
    query TestEligibleShippingMethods($input: TestEligibleShippingMethodsInput!) {
        testEligibleShippingMethods(input: $input) {
            id
            name
            code
            description
            price
            priceWithTax
            metadata
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmctZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvc2hpcHBpbmctZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTVHLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXNCckMsK0JBQStCO0NBQ3BDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7OztNQVNyQyx3QkFBd0I7Q0FDN0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTWhDLHdCQUF3QjtDQUM3QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7TUFZM0MsbUNBQW1DO0NBQ3hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1uQyx3QkFBd0I7Q0FDN0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTW5DLHdCQUF3QjtDQUM3QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7O0NBT3hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7O0NBV3RDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7OztDQVloRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBDT05GSUdVUkFCTEVfT1BFUkFUSU9OX0RFRl9GUkFHTUVOVCwgQ09ORklHVVJBQkxFX09QRVJBVElPTl9GUkFHTUVOVCB9IGZyb20gJy4vc2hhcmVkLWRlZmluaXRpb25zJztcblxuZXhwb3J0IGNvbnN0IFNISVBQSU5HX01FVEhPRF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBTaGlwcGluZ01ldGhvZCBvbiBTaGlwcGluZ01ldGhvZCB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgY29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgIGZ1bGZpbGxtZW50SGFuZGxlckNvZGVcbiAgICAgICAgY2hlY2tlciB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25cbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdG9yIHtcbiAgICAgICAgICAgIC4uLkNvbmZpZ3VyYWJsZU9wZXJhdGlvblxuICAgICAgICB9XG4gICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09ORklHVVJBQkxFX09QRVJBVElPTl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfU0hJUFBJTkdfTUVUSE9EX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0U2hpcHBpbmdNZXRob2RMaXN0KCRvcHRpb25zOiBTaGlwcGluZ01ldGhvZExpc3RPcHRpb25zKSB7XG4gICAgICAgIHNoaXBwaW5nTWV0aG9kcyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLlNoaXBwaW5nTWV0aG9kXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtTSElQUElOR19NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1NISVBQSU5HX01FVEhPRCA9IGdxbGBcbiAgICBxdWVyeSBHZXRTaGlwcGluZ01ldGhvZCgkaWQ6IElEISkge1xuICAgICAgICBzaGlwcGluZ01ldGhvZChpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5TaGlwcGluZ01ldGhvZFxuICAgICAgICB9XG4gICAgfVxuICAgICR7U0hJUFBJTkdfTUVUSE9EX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9TSElQUElOR19NRVRIT0RfT1BFUkFUSU9OUyA9IGdxbGBcbiAgICBxdWVyeSBHZXRTaGlwcGluZ01ldGhvZE9wZXJhdGlvbnMge1xuICAgICAgICBzaGlwcGluZ0VsaWdpYmlsaXR5Q2hlY2tlcnMge1xuICAgICAgICAgICAgLi4uQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmXG4gICAgICAgIH1cbiAgICAgICAgc2hpcHBpbmdDYWxjdWxhdG9ycyB7XG4gICAgICAgICAgICAuLi5Db25maWd1cmFibGVPcGVyYXRpb25EZWZcbiAgICAgICAgfVxuICAgICAgICBmdWxmaWxsbWVudEhhbmRsZXJzIHtcbiAgICAgICAgICAgIC4uLkNvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZlxuICAgICAgICB9XG4gICAgfVxuICAgICR7Q09ORklHVVJBQkxFX09QRVJBVElPTl9ERUZfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1NISVBQSU5HX01FVEhPRCA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVTaGlwcGluZ01ldGhvZCgkaW5wdXQ6IENyZWF0ZVNoaXBwaW5nTWV0aG9kSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVNoaXBwaW5nTWV0aG9kKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlNoaXBwaW5nTWV0aG9kXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtTSElQUElOR19NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX1NISVBQSU5HX01FVEhPRCA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVTaGlwcGluZ01ldGhvZCgkaW5wdXQ6IFVwZGF0ZVNoaXBwaW5nTWV0aG9kSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVNoaXBwaW5nTWV0aG9kKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlNoaXBwaW5nTWV0aG9kXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtTSElQUElOR19NRVRIT0RfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1NISVBQSU5HX01FVEhPRCA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVTaGlwcGluZ01ldGhvZCgkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVTaGlwcGluZ01ldGhvZChpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBURVNUX1NISVBQSU5HX01FVEhPRCA9IGdxbGBcbiAgICBxdWVyeSBUZXN0U2hpcHBpbmdNZXRob2QoJGlucHV0OiBUZXN0U2hpcHBpbmdNZXRob2RJbnB1dCEpIHtcbiAgICAgICAgdGVzdFNoaXBwaW5nTWV0aG9kKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGVsaWdpYmxlXG4gICAgICAgICAgICBxdW90ZSB7XG4gICAgICAgICAgICAgICAgcHJpY2VcbiAgICAgICAgICAgICAgICBwcmljZVdpdGhUYXhcbiAgICAgICAgICAgICAgICBtZXRhZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFRFU1RfRUxJR0lCTEVfU0hJUFBJTkdfTUVUSE9EUyA9IGdxbGBcbiAgICBxdWVyeSBUZXN0RWxpZ2libGVTaGlwcGluZ01ldGhvZHMoJGlucHV0OiBUZXN0RWxpZ2libGVTaGlwcGluZ01ldGhvZHNJbnB1dCEpIHtcbiAgICAgICAgdGVzdEVsaWdpYmxlU2hpcHBpbmdNZXRob2RzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgcHJpY2VcbiAgICAgICAgICAgIHByaWNlV2l0aFRheFxuICAgICAgICAgICAgbWV0YWRhdGFcbiAgICAgICAgfVxuICAgIH1cbmA7XG4iXX0=