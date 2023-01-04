import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const DISCOUNT_FRAGMENT = gql `
    fragment Discount on Discount {
        adjustmentSource
        amount
        amountWithTax
        description
        type
    }
`;
export const PAYMENT_FRAGMENT = gql `
    fragment Payment on Payment {
        id
        transactionId
        amount
        method
        state
        metadata
    }
`;
export const REFUND_FRAGMENT = gql `
    fragment Refund on Refund {
        id
        state
        items
        shipping
        adjustment
        transactionId
        paymentId
    }
`;
export const ORDER_ADDRESS_FRAGMENT = gql `
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
    }
`;
export const ORDER_FRAGMENT = gql `
    fragment Order on Order {
        id
        createdAt
        updatedAt
        orderPlacedAt
        code
        state
        nextStates
        total
        payments {
            id
            method
            state
        }
        totalWithTax
        currencyCode
        customer {
            id
            firstName
            lastName
            phoneNumber
        }
        shippingLines {
            shippingMethod {
                name
            }
        }
        customFields {
            scheduledTime
        }
    }
`;
export const FULFILLMENT_FRAGMENT = gql `
    fragment Fulfillment on Fulfillment {
        id
        state
        nextStates
        createdAt
        updatedAt
        method
        summary {
            orderLine {
                id
            }
            quantity
        }
        trackingCode
    }
`;
export const ORDER_LINE_FRAGMENT = gql `
    fragment OrderLine on OrderLine {
        id
        featuredAsset {
            preview
        }
        productVariant {
            id
            name
            sku
            trackInventory
            stockOnHand
        }
        discounts {
            ...Discount
        }
        fulfillments {
            ...Fulfillment
        }
        unitPrice
        unitPriceWithTax
        proratedUnitPrice
        proratedUnitPriceWithTax
        quantity
        items {
            id
            refundId
            cancelled
        }
        linePrice
        lineTax
        linePriceWithTax
        discountedLinePrice
        discountedLinePriceWithTax
    }
`;
export const ORDER_DETAIL_FRAGMENT = gql `
    fragment OrderDetail on Order {
        id
        createdAt
        updatedAt
        code
        state
        nextStates
        active
        couponCodes
        customer {
            id
            firstName
            lastName
            phoneNumber
        }
        lines {
            ...OrderLine
        }
        surcharges {
            id
            sku
            description
            price
            priceWithTax
            taxRate
        }
        discounts {
            ...Discount
        }
        promotions {
            id
            couponCode
        }
        subTotal
        subTotalWithTax
        total
        totalWithTax
        currencyCode
        shipping
        shippingWithTax
        shippingLines {
            shippingMethod {
                id
                code
                name
                fulfillmentHandlerCode
                description
            }
        }
        taxSummary {
            description
            taxBase
            taxRate
            taxTotal
        }
        shippingAddress {
            ...OrderAddress
        }
        billingAddress {
            ...OrderAddress
        }
        payments {
            id
            createdAt
            transactionId
            amount
            method
            state
            nextStates
            errorMessage
            metadata
            refunds {
                id
                createdAt
                state
                items
                adjustment
                total
                paymentId
                reason
                transactionId
                method
                metadata
                orderItems {
                    id
                }
            }
        }
        fulfillments {
            ...Fulfillment
        }
        modifications {
            id
            createdAt
            isSettled
            priceChange
            note
            payment {
                id
                amount
            }
            orderItems {
                id
            }
            refund {
                id
                paymentId
                total
            }
            surcharges {
                id
            }
        }
    }
    ${DISCOUNT_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
    ${FULFILLMENT_FRAGMENT}
    ${ORDER_LINE_FRAGMENT}
`;
export const GET_ORDERS_LIST = gql `
    query GetOrderList($options: OrderListOptions) {
        orders(options: $options) {
            items {
                ...Order
            }
            totalItems
        }
    }
    ${ORDER_FRAGMENT}
`;
export const GET_ORDER = gql `
    query GetOrder($id: ID!) {
        order(id: $id) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
export const SETTLE_PAYMENT = gql `
    mutation SettlePayment($id: ID!) {
        settlePayment(id: $id) {
            ...Payment
            ...ErrorResult
            ... on SettlePaymentError {
                paymentErrorMessage
            }
            ... on PaymentStateTransitionError {
                transitionError
            }
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ERROR_RESULT_FRAGMENT}
    ${PAYMENT_FRAGMENT}
`;
export const CANCEL_PAYMENT = gql `
    mutation CancelPayment($id: ID!) {
        cancelPayment(id: $id) {
            ...Payment
            ...ErrorResult
            ... on CancelPaymentError {
                paymentErrorMessage
            }
            ... on PaymentStateTransitionError {
                transitionError
            }
        }
    }
    ${ERROR_RESULT_FRAGMENT}
    ${PAYMENT_FRAGMENT}
`;
export const TRANSITION_PAYMENT_TO_STATE = gql `
    mutation TransitionPaymentToState($id: ID!, $state: String!) {
        transitionPaymentToState(id: $id, state: $state) {
            ...Payment
            ...ErrorResult
            ... on PaymentStateTransitionError {
                transitionError
            }
        }
    }
    ${PAYMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const CREATE_FULFILLMENT = gql `
    mutation CreateFulfillment($input: FulfillOrderInput!) {
        addFulfillmentToOrder(input: $input) {
            ...Fulfillment
            ... on CreateFulfillmentError {
                errorCode
                message
                fulfillmentHandlerError
            }
            ... on FulfillmentStateTransitionError {
                errorCode
                message
                transitionError
            }
            ...ErrorResult
        }
    }
    ${FULFILLMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const CANCEL_ORDER = gql `
    mutation CancelOrder($input: CancelOrderInput!) {
        cancelOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const REFUND_ORDER = gql `
    mutation RefundOrder($input: RefundOrderInput!) {
        refundOrder(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${REFUND_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const SETTLE_REFUND = gql `
    mutation SettleRefund($input: SettleRefundInput!) {
        settleRefund(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${REFUND_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_ORDER_HISTORY = gql `
    query GetOrderHistory($id: ID!, $options: HistoryEntryListOptions) {
        order(id: $id) {
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
export const ADD_NOTE_TO_ORDER = gql `
    mutation AddNoteToOrder($input: AddNoteToOrderInput!) {
        addNoteToOrder(input: $input) {
            id
        }
    }
`;
export const UPDATE_ORDER_NOTE = gql `
    mutation UpdateOrderNote($input: UpdateOrderNoteInput!) {
        updateOrderNote(input: $input) {
            id
            data
            isPublic
        }
    }
`;
export const DELETE_ORDER_NOTE = gql `
    mutation DeleteOrderNote($id: ID!) {
        deleteOrderNote(id: $id) {
            result
            message
        }
    }
`;
export const TRANSITION_ORDER_TO_STATE = gql `
    mutation TransitionOrderToState($id: ID!, $state: String!) {
        transitionOrderToState(id: $id, state: $state) {
            ...Order
            ...ErrorResult
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ORDER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const UPDATE_ORDER_CUSTOM_FIELDS = gql `
    mutation UpdateOrderCustomFields($input: UpdateOrderInput!) {
        setOrderCustomFields(input: $input) {
            ...Order
        }
    }
    ${ORDER_FRAGMENT}
`;
export const TRANSITION_FULFILLMENT_TO_STATE = gql `
    mutation TransitionFulfillmentToState($id: ID!, $state: String!) {
        transitionFulfillmentToState(id: $id, state: $state) {
            ...Fulfillment
            ...ErrorResult
            ... on FulfillmentStateTransitionError {
                transitionError
            }
        }
    }
    ${FULFILLMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_ORDER_SUMMARY = gql `
    query GetOrderSummary($start: DateTime!, $end: DateTime!) {
        orders(options: { filter: { orderPlacedAt: { between: { start: $start, end: $end } } } }) {
            totalItems
            items {
                id
                total
                currencyCode
            }
        }
    }
`;
export const MODIFY_ORDER = gql `
    mutation ModifyOrder($input: ModifyOrderInput!) {
        modifyOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const ADD_MANUAL_PAYMENT_TO_ORDER = gql `
    mutation AddManualPayment($input: ManualPaymentInput!) {
        addManualPaymentToOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const CREATE_DRAFT_ORDER = gql `
    mutation CreateDraftOrder {
        createDraftOrder {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
export const DELETE_DRAFT_ORDER = gql `
    mutation DeleteDraftOrder($orderId: ID!) {
        deleteDraftOrder(orderId: $orderId) {
            result
            message
        }
    }
`;
export const ADD_ITEM_TO_DRAFT_ORDER = gql `
    mutation AddItemToDraftOrder($orderId: ID!, $input: AddItemToDraftOrderInput!) {
        addItemToDraftOrder(orderId: $orderId, input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const ADJUST_DRAFT_ORDER_LINE = gql `
    mutation AdjustDraftOrderLine($orderId: ID!, $input: AdjustDraftOrderLineInput!) {
        adjustDraftOrderLine(orderId: $orderId, input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const REMOVE_DRAFT_ORDER_LINE = gql `
    mutation RemoveDraftOrderLine($orderId: ID!, $orderLineId: ID!) {
        removeDraftOrderLine(orderId: $orderId, orderLineId: $orderLineId) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const SET_CUSTOMER_FOR_DRAFT_ORDER = gql `
    mutation SetCustomerForDraftOrder($orderId: ID!, $customerId: ID, $input: CreateCustomerInput) {
        setCustomerForDraftOrder(orderId: $orderId, customerId: $customerId, input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const SET_SHIPPING_ADDRESS_FOR_DRAFT_ORDER = gql `
    mutation SetDraftOrderShippingAddress($orderId: ID!, $input: CreateAddressInput!) {
        setDraftOrderShippingAddress(orderId: $orderId, input: $input) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
export const SET_BILLING_ADDRESS_FOR_DRAFT_ORDER = gql `
    mutation SetDraftOrderBillingAddress($orderId: ID!, $input: CreateAddressInput!) {
        setDraftOrderBillingAddress(orderId: $orderId, input: $input) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
export const APPLY_COUPON_CODE_TO_DRAFT_ORDER = gql `
    mutation ApplyCouponCodeToDraftOrder($orderId: ID!, $couponCode: String!) {
        applyCouponCodeToDraftOrder(orderId: $orderId, couponCode: $couponCode) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const REMOVE_COUPON_CODE_FROM_DRAFT_ORDER = gql `
    mutation RemoveCouponCodeFromDraftOrder($orderId: ID!, $couponCode: String!) {
        removeCouponCodeFromDraftOrder(orderId: $orderId, couponCode: $couponCode) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
export const DRAFT_ORDER_ELIGIBLE_SHIPPING_METHODS = gql `
    query DraftOrderEligibleShippingMethods($orderId: ID!) {
        eligibleShippingMethodsForDraftOrder(orderId: $orderId) {
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
export const SET_DRAFT_ORDER_SHIPPING_METHOD = gql `
    mutation SetDraftOrderShippingMethod($orderId: ID!, $shippingMethodId: ID!) {
        setDraftOrderShippingMethod(orderId: $orderId, shippingMethodId: $shippingMethodId) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvZGVmaW5pdGlvbnMvb3JkZXItZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Q0FRbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7O0NBU2xDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7O0NBVWpDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Q0FheEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0NoQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0J0QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1DckMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1I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LHFCQUFxQjtNQUNyQixxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQTs7Ozs7OztNQU9wQyxxQkFBcUI7TUFDckIscUJBQXFCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7TUFPekMscUJBQXFCO01BQ3JCLHFCQUFxQjtDQUMxQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQUcsR0FBRyxDQUFBOzs7Ozs7TUFNakQscUJBQXFCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1oRCxxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFHLEdBQUcsQ0FBQTs7Ozs7OztNQU83QyxxQkFBcUI7TUFDckIscUJBQXFCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBRyxHQUFHLENBQUE7Ozs7OztNQU1oRCxxQkFBcUI7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHFDQUFxQyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWXZELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7TUFPNUMscUJBQXFCO01BQ3JCLHFCQUFxQjtDQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBFUlJPUl9SRVNVTFRfRlJBR01FTlQgfSBmcm9tICcuL3NoYXJlZC1kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBESVNDT1VOVF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBEaXNjb3VudCBvbiBEaXNjb3VudCB7XG4gICAgICAgIGFkanVzdG1lbnRTb3VyY2VcbiAgICAgICAgYW1vdW50XG4gICAgICAgIGFtb3VudFdpdGhUYXhcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgdHlwZVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQQVlNRU5UX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFBheW1lbnQgb24gUGF5bWVudCB7XG4gICAgICAgIGlkXG4gICAgICAgIHRyYW5zYWN0aW9uSWRcbiAgICAgICAgYW1vdW50XG4gICAgICAgIG1ldGhvZFxuICAgICAgICBzdGF0ZVxuICAgICAgICBtZXRhZGF0YVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBSRUZVTkRfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgUmVmdW5kIG9uIFJlZnVuZCB7XG4gICAgICAgIGlkXG4gICAgICAgIHN0YXRlXG4gICAgICAgIGl0ZW1zXG4gICAgICAgIHNoaXBwaW5nXG4gICAgICAgIGFkanVzdG1lbnRcbiAgICAgICAgdHJhbnNhY3Rpb25JZFxuICAgICAgICBwYXltZW50SWRcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgT1JERVJfQUREUkVTU19GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBPcmRlckFkZHJlc3Mgb24gT3JkZXJBZGRyZXNzIHtcbiAgICAgICAgZnVsbE5hbWVcbiAgICAgICAgY29tcGFueVxuICAgICAgICBzdHJlZXRMaW5lMVxuICAgICAgICBzdHJlZXRMaW5lMlxuICAgICAgICBjaXR5XG4gICAgICAgIHByb3ZpbmNlXG4gICAgICAgIHBvc3RhbENvZGVcbiAgICAgICAgY291bnRyeVxuICAgICAgICBjb3VudHJ5Q29kZVxuICAgICAgICBwaG9uZU51bWJlclxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBPUkRFUl9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBPcmRlciBvbiBPcmRlciB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgb3JkZXJQbGFjZWRBdFxuICAgICAgICBjb2RlXG4gICAgICAgIHN0YXRlXG4gICAgICAgIG5leHRTdGF0ZXNcbiAgICAgICAgdG90YWxcbiAgICAgICAgcGF5bWVudHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICAgICAgc3RhdGVcbiAgICAgICAgfVxuICAgICAgICB0b3RhbFdpdGhUYXhcbiAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgIGN1c3RvbWVyIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgIGxhc3ROYW1lXG4gICAgICAgICAgICBwaG9uZU51bWJlclxuICAgICAgICB9XG4gICAgICAgIHNoaXBwaW5nTGluZXMge1xuICAgICAgICAgICAgc2hpcHBpbmdNZXRob2Qge1xuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXN0b21GaWVsZHMge1xuICAgICAgICAgICAgc2NoZWR1bGVkVGltZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEZVTEZJTExNRU5UX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEZ1bGZpbGxtZW50IG9uIEZ1bGZpbGxtZW50IHtcbiAgICAgICAgaWRcbiAgICAgICAgc3RhdGVcbiAgICAgICAgbmV4dFN0YXRlc1xuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG1ldGhvZFxuICAgICAgICBzdW1tYXJ5IHtcbiAgICAgICAgICAgIG9yZGVyTGluZSB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1YW50aXR5XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2tpbmdDb2RlXG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IE9SREVSX0xJTkVfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgT3JkZXJMaW5lIG9uIE9yZGVyTGluZSB7XG4gICAgICAgIGlkXG4gICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgcHJldmlld1xuICAgICAgICB9XG4gICAgICAgIHByb2R1Y3RWYXJpYW50IHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBza3VcbiAgICAgICAgICAgIHRyYWNrSW52ZW50b3J5XG4gICAgICAgICAgICBzdG9ja09uSGFuZFxuICAgICAgICB9XG4gICAgICAgIGRpc2NvdW50cyB7XG4gICAgICAgICAgICAuLi5EaXNjb3VudFxuICAgICAgICB9XG4gICAgICAgIGZ1bGZpbGxtZW50cyB7XG4gICAgICAgICAgICAuLi5GdWxmaWxsbWVudFxuICAgICAgICB9XG4gICAgICAgIHVuaXRQcmljZVxuICAgICAgICB1bml0UHJpY2VXaXRoVGF4XG4gICAgICAgIHByb3JhdGVkVW5pdFByaWNlXG4gICAgICAgIHByb3JhdGVkVW5pdFByaWNlV2l0aFRheFxuICAgICAgICBxdWFudGl0eVxuICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgcmVmdW5kSWRcbiAgICAgICAgICAgIGNhbmNlbGxlZFxuICAgICAgICB9XG4gICAgICAgIGxpbmVQcmljZVxuICAgICAgICBsaW5lVGF4XG4gICAgICAgIGxpbmVQcmljZVdpdGhUYXhcbiAgICAgICAgZGlzY291bnRlZExpbmVQcmljZVxuICAgICAgICBkaXNjb3VudGVkTGluZVByaWNlV2l0aFRheFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBPUkRFUl9ERVRBSUxfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgT3JkZXJEZXRhaWwgb24gT3JkZXIge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGNvZGVcbiAgICAgICAgc3RhdGVcbiAgICAgICAgbmV4dFN0YXRlc1xuICAgICAgICBhY3RpdmVcbiAgICAgICAgY291cG9uQ29kZXNcbiAgICAgICAgY3VzdG9tZXIge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGZpcnN0TmFtZVxuICAgICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgICAgIHBob25lTnVtYmVyXG4gICAgICAgIH1cbiAgICAgICAgbGluZXMge1xuICAgICAgICAgICAgLi4uT3JkZXJMaW5lXG4gICAgICAgIH1cbiAgICAgICAgc3VyY2hhcmdlcyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgc2t1XG4gICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgcHJpY2VcbiAgICAgICAgICAgIHByaWNlV2l0aFRheFxuICAgICAgICAgICAgdGF4UmF0ZVxuICAgICAgICB9XG4gICAgICAgIGRpc2NvdW50cyB7XG4gICAgICAgICAgICAuLi5EaXNjb3VudFxuICAgICAgICB9XG4gICAgICAgIHByb21vdGlvbnMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvdXBvbkNvZGVcbiAgICAgICAgfVxuICAgICAgICBzdWJUb3RhbFxuICAgICAgICBzdWJUb3RhbFdpdGhUYXhcbiAgICAgICAgdG90YWxcbiAgICAgICAgdG90YWxXaXRoVGF4XG4gICAgICAgIGN1cnJlbmN5Q29kZVxuICAgICAgICBzaGlwcGluZ1xuICAgICAgICBzaGlwcGluZ1dpdGhUYXhcbiAgICAgICAgc2hpcHBpbmdMaW5lcyB7XG4gICAgICAgICAgICBzaGlwcGluZ01ldGhvZCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIGZ1bGZpbGxtZW50SGFuZGxlckNvZGVcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRheFN1bW1hcnkge1xuICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIHRheEJhc2VcbiAgICAgICAgICAgIHRheFJhdGVcbiAgICAgICAgICAgIHRheFRvdGFsXG4gICAgICAgIH1cbiAgICAgICAgc2hpcHBpbmdBZGRyZXNzIHtcbiAgICAgICAgICAgIC4uLk9yZGVyQWRkcmVzc1xuICAgICAgICB9XG4gICAgICAgIGJpbGxpbmdBZGRyZXNzIHtcbiAgICAgICAgICAgIC4uLk9yZGVyQWRkcmVzc1xuICAgICAgICB9XG4gICAgICAgIHBheW1lbnRzIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWRcbiAgICAgICAgICAgIGFtb3VudFxuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgICAgICBzdGF0ZVxuICAgICAgICAgICAgbmV4dFN0YXRlc1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICBtZXRhZGF0YVxuICAgICAgICAgICAgcmVmdW5kcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICBzdGF0ZVxuICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgYWRqdXN0bWVudFxuICAgICAgICAgICAgICAgIHRvdGFsXG4gICAgICAgICAgICAgICAgcGF5bWVudElkXG4gICAgICAgICAgICAgICAgcmVhc29uXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JZFxuICAgICAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhXG4gICAgICAgICAgICAgICAgb3JkZXJJdGVtcyB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bGZpbGxtZW50cyB7XG4gICAgICAgICAgICAuLi5GdWxmaWxsbWVudFxuICAgICAgICB9XG4gICAgICAgIG1vZGlmaWNhdGlvbnMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgaXNTZXR0bGVkXG4gICAgICAgICAgICBwcmljZUNoYW5nZVxuICAgICAgICAgICAgbm90ZVxuICAgICAgICAgICAgcGF5bWVudCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBhbW91bnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9yZGVySXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWZ1bmQge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgcGF5bWVudElkXG4gICAgICAgICAgICAgICAgdG90YWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1cmNoYXJnZXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtESVNDT1VOVF9GUkFHTUVOVH1cbiAgICAke09SREVSX0FERFJFU1NfRlJBR01FTlR9XG4gICAgJHtGVUxGSUxMTUVOVF9GUkFHTUVOVH1cbiAgICAke09SREVSX0xJTkVfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX09SREVSU19MSVNUID0gZ3FsYFxuICAgIHF1ZXJ5IEdldE9yZGVyTGlzdCgkb3B0aW9uczogT3JkZXJMaXN0T3B0aW9ucykge1xuICAgICAgICBvcmRlcnMob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAuLi5PcmRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX09SREVSID0gZ3FsYFxuICAgIHF1ZXJ5IEdldE9yZGVyKCRpZDogSUQhKSB7XG4gICAgICAgIG9yZGVyKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUVExFX1BBWU1FTlQgPSBncWxgXG4gICAgbXV0YXRpb24gU2V0dGxlUGF5bWVudCgkaWQ6IElEISkge1xuICAgICAgICBzZXR0bGVQYXltZW50KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLlBheW1lbnRcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgICAgICAuLi4gb24gU2V0dGxlUGF5bWVudEVycm9yIHtcbiAgICAgICAgICAgICAgICBwYXltZW50RXJyb3JNZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi4gb24gUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC4uLiBvbiBPcmRlclN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbiAgICAke1BBWU1FTlRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ0FOQ0VMX1BBWU1FTlQgPSBncWxgXG4gICAgbXV0YXRpb24gQ2FuY2VsUGF5bWVudCgkaWQ6IElEISkge1xuICAgICAgICBjYW5jZWxQYXltZW50KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIC4uLlBheW1lbnRcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgICAgICAuLi4gb24gQ2FuY2VsUGF5bWVudEVycm9yIHtcbiAgICAgICAgICAgICAgICBwYXltZW50RXJyb3JNZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi4gb24gUGF5bWVudFN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbiAgICAke1BBWU1FTlRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9QQVlNRU5UX1RPX1NUQVRFID0gZ3FsYFxuICAgIG11dGF0aW9uIFRyYW5zaXRpb25QYXltZW50VG9TdGF0ZSgkaWQ6IElEISwgJHN0YXRlOiBTdHJpbmchKSB7XG4gICAgICAgIHRyYW5zaXRpb25QYXltZW50VG9TdGF0ZShpZDogJGlkLCBzdGF0ZTogJHN0YXRlKSB7XG4gICAgICAgICAgICAuLi5QYXltZW50XG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICAgICAgLi4uIG9uIFBheW1lbnRTdGF0ZVRyYW5zaXRpb25FcnJvciB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQQVlNRU5UX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9GVUxGSUxMTUVOVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVGdWxmaWxsbWVudCgkaW5wdXQ6IEZ1bGZpbGxPcmRlcklucHV0ISkge1xuICAgICAgICBhZGRGdWxmaWxsbWVudFRvT3JkZXIoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uRnVsZmlsbG1lbnRcbiAgICAgICAgICAgIC4uLiBvbiBDcmVhdGVGdWxmaWxsbWVudEVycm9yIHtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGVcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgICAgZnVsZmlsbG1lbnRIYW5kbGVyRXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC4uLiBvbiBGdWxmaWxsbWVudFN0YXRlVHJhbnNpdGlvbkVycm9yIHtcbiAgICAgICAgICAgICAgICBlcnJvckNvZGVcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7RlVMRklMTE1FTlRfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ0FOQ0VMX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIENhbmNlbE9yZGVyKCRpbnB1dDogQ2FuY2VsT3JkZXJJbnB1dCEpIHtcbiAgICAgICAgY2FuY2VsT3JkZXIoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uT3JkZXJEZXRhaWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVGVU5EX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlZnVuZE9yZGVyKCRpbnB1dDogUmVmdW5kT3JkZXJJbnB1dCEpIHtcbiAgICAgICAgcmVmdW5kT3JkZXIoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUmVmdW5kXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UkVGVU5EX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNFVFRMRV9SRUZVTkQgPSBncWxgXG4gICAgbXV0YXRpb24gU2V0dGxlUmVmdW5kKCRpbnB1dDogU2V0dGxlUmVmdW5kSW5wdXQhKSB7XG4gICAgICAgIHNldHRsZVJlZnVuZChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5SZWZ1bmRcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtSRUZVTkRfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX09SREVSX0hJU1RPUlkgPSBncWxgXG4gICAgcXVlcnkgR2V0T3JkZXJIaXN0b3J5KCRpZDogSUQhLCAkb3B0aW9uczogSGlzdG9yeUVudHJ5TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgb3JkZXIoaWQ6ICRpZCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGhpc3Rvcnkob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICBpc1B1YmxpY1xuICAgICAgICAgICAgICAgICAgICBhZG1pbmlzdHJhdG9yIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRERfTk9URV9UT19PUkRFUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGROb3RlVG9PcmRlcigkaW5wdXQ6IEFkZE5vdGVUb09yZGVySW5wdXQhKSB7XG4gICAgICAgIGFkZE5vdGVUb09yZGVyKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX09SREVSX05PVEUgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlT3JkZXJOb3RlKCRpbnB1dDogVXBkYXRlT3JkZXJOb3RlSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZU9yZGVyTm90ZShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgaXNQdWJsaWNcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfT1JERVJfTk9URSA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVPcmRlck5vdGUoJGlkOiBJRCEpIHtcbiAgICAgICAgZGVsZXRlT3JkZXJOb3RlKGlkOiAkaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFRSQU5TSVRJT05fT1JERVJfVE9fU1RBVEUgPSBncWxgXG4gICAgbXV0YXRpb24gVHJhbnNpdGlvbk9yZGVyVG9TdGF0ZSgkaWQ6IElEISwgJHN0YXRlOiBTdHJpbmchKSB7XG4gICAgICAgIHRyYW5zaXRpb25PcmRlclRvU3RhdGUoaWQ6ICRpZCwgc3RhdGU6ICRzdGF0ZSkge1xuICAgICAgICAgICAgLi4uT3JkZXJcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgICAgICAuLi4gb24gT3JkZXJTdGF0ZVRyYW5zaXRpb25FcnJvciB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfT1JERVJfQ1VTVE9NX0ZJRUxEUyA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVPcmRlckN1c3RvbUZpZWxkcygkaW5wdXQ6IFVwZGF0ZU9yZGVySW5wdXQhKSB7XG4gICAgICAgIHNldE9yZGVyQ3VzdG9tRmllbGRzKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX0ZVTEZJTExNRU5UX1RPX1NUQVRFID0gZ3FsYFxuICAgIG11dGF0aW9uIFRyYW5zaXRpb25GdWxmaWxsbWVudFRvU3RhdGUoJGlkOiBJRCEsICRzdGF0ZTogU3RyaW5nISkge1xuICAgICAgICB0cmFuc2l0aW9uRnVsZmlsbG1lbnRUb1N0YXRlKGlkOiAkaWQsIHN0YXRlOiAkc3RhdGUpIHtcbiAgICAgICAgICAgIC4uLkZ1bGZpbGxtZW50XG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICAgICAgLi4uIG9uIEZ1bGZpbGxtZW50U3RhdGVUcmFuc2l0aW9uRXJyb3Ige1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7RlVMRklMTE1FTlRfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX09SREVSX1NVTU1BUlkgPSBncWxgXG4gICAgcXVlcnkgR2V0T3JkZXJTdW1tYXJ5KCRzdGFydDogRGF0ZVRpbWUhLCAkZW5kOiBEYXRlVGltZSEpIHtcbiAgICAgICAgb3JkZXJzKG9wdGlvbnM6IHsgZmlsdGVyOiB7IG9yZGVyUGxhY2VkQXQ6IHsgYmV0d2VlbjogeyBzdGFydDogJHN0YXJ0LCBlbmQ6ICRlbmQgfSB9IH0gfSkge1xuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgdG90YWxcbiAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBNT0RJRllfT1JERVIgPSBncWxgXG4gICAgbXV0YXRpb24gTW9kaWZ5T3JkZXIoJGlucHV0OiBNb2RpZnlPcmRlcklucHV0ISkge1xuICAgICAgICBtb2RpZnlPcmRlcihpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5PcmRlckRldGFpbFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke09SREVSX0RFVEFJTF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRERfTUFOVUFMX1BBWU1FTlRfVE9fT1JERVIgPSBncWxgXG4gICAgbXV0YXRpb24gQWRkTWFudWFsUGF5bWVudCgkaW5wdXQ6IE1hbnVhbFBheW1lbnRJbnB1dCEpIHtcbiAgICAgICAgYWRkTWFudWFsUGF5bWVudFRvT3JkZXIoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uT3JkZXJEZXRhaWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX0RSQUZUX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZURyYWZ0T3JkZXIge1xuICAgICAgICBjcmVhdGVEcmFmdE9yZGVyIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX0RSQUZUX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZURyYWZ0T3JkZXIoJG9yZGVySWQ6IElEISkge1xuICAgICAgICBkZWxldGVEcmFmdE9yZGVyKG9yZGVySWQ6ICRvcmRlcklkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRERfSVRFTV9UT19EUkFGVF9PUkRFUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGRJdGVtVG9EcmFmdE9yZGVyKCRvcmRlcklkOiBJRCEsICRpbnB1dDogQWRkSXRlbVRvRHJhZnRPcmRlcklucHV0ISkge1xuICAgICAgICBhZGRJdGVtVG9EcmFmdE9yZGVyKG9yZGVySWQ6ICRvcmRlcklkLCBpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5PcmRlckRldGFpbFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke09SREVSX0RFVEFJTF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBREpVU1RfRFJBRlRfT1JERVJfTElORSA9IGdxbGBcbiAgICBtdXRhdGlvbiBBZGp1c3REcmFmdE9yZGVyTGluZSgkb3JkZXJJZDogSUQhLCAkaW5wdXQ6IEFkanVzdERyYWZ0T3JkZXJMaW5lSW5wdXQhKSB7XG4gICAgICAgIGFkanVzdERyYWZ0T3JkZXJMaW5lKG9yZGVySWQ6ICRvcmRlcklkLCBpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5PcmRlckRldGFpbFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke09SREVSX0RFVEFJTF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBSRU1PVkVfRFJBRlRfT1JERVJfTElORSA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVEcmFmdE9yZGVyTGluZSgkb3JkZXJJZDogSUQhLCAkb3JkZXJMaW5lSWQ6IElEISkge1xuICAgICAgICByZW1vdmVEcmFmdE9yZGVyTGluZShvcmRlcklkOiAkb3JkZXJJZCwgb3JkZXJMaW5lSWQ6ICRvcmRlckxpbmVJZCkge1xuICAgICAgICAgICAgLi4uT3JkZXJEZXRhaWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUX0NVU1RPTUVSX0ZPUl9EUkFGVF9PUkRFUiA9IGdxbGBcbiAgICBtdXRhdGlvbiBTZXRDdXN0b21lckZvckRyYWZ0T3JkZXIoJG9yZGVySWQ6IElEISwgJGN1c3RvbWVySWQ6IElELCAkaW5wdXQ6IENyZWF0ZUN1c3RvbWVySW5wdXQpIHtcbiAgICAgICAgc2V0Q3VzdG9tZXJGb3JEcmFmdE9yZGVyKG9yZGVySWQ6ICRvcmRlcklkLCBjdXN0b21lcklkOiAkY3VzdG9tZXJJZCwgaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uT3JkZXJEZXRhaWxcbiAgICAgICAgICAgIC4uLkVycm9yUmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG4gICAgJHtFUlJPUl9SRVNVTFRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUX1NISVBQSU5HX0FERFJFU1NfRk9SX0RSQUZUX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIFNldERyYWZ0T3JkZXJTaGlwcGluZ0FkZHJlc3MoJG9yZGVySWQ6IElEISwgJGlucHV0OiBDcmVhdGVBZGRyZXNzSW5wdXQhKSB7XG4gICAgICAgIHNldERyYWZ0T3JkZXJTaGlwcGluZ0FkZHJlc3Mob3JkZXJJZDogJG9yZGVySWQsIGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUX0JJTExJTkdfQUREUkVTU19GT1JfRFJBRlRfT1JERVIgPSBncWxgXG4gICAgbXV0YXRpb24gU2V0RHJhZnRPcmRlckJpbGxpbmdBZGRyZXNzKCRvcmRlcklkOiBJRCEsICRpbnB1dDogQ3JlYXRlQWRkcmVzc0lucHV0ISkge1xuICAgICAgICBzZXREcmFmdE9yZGVyQmlsbGluZ0FkZHJlc3Mob3JkZXJJZDogJG9yZGVySWQsIGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtPUkRFUl9ERVRBSUxfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQVBQTFlfQ09VUE9OX0NPREVfVE9fRFJBRlRfT1JERVIgPSBncWxgXG4gICAgbXV0YXRpb24gQXBwbHlDb3Vwb25Db2RlVG9EcmFmdE9yZGVyKCRvcmRlcklkOiBJRCEsICRjb3Vwb25Db2RlOiBTdHJpbmchKSB7XG4gICAgICAgIGFwcGx5Q291cG9uQ29kZVRvRHJhZnRPcmRlcihvcmRlcklkOiAkb3JkZXJJZCwgY291cG9uQ29kZTogJGNvdXBvbkNvZGUpIHtcbiAgICAgICAgICAgIC4uLk9yZGVyRGV0YWlsXG4gICAgICAgICAgICAuLi5FcnJvclJlc3VsdFxuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfREVUQUlMX0ZSQUdNRU5UfVxuICAgICR7RVJST1JfUkVTVUxUX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFJFTU9WRV9DT1VQT05fQ09ERV9GUk9NX0RSQUZUX09SREVSID0gZ3FsYFxuICAgIG11dGF0aW9uIFJlbW92ZUNvdXBvbkNvZGVGcm9tRHJhZnRPcmRlcigkb3JkZXJJZDogSUQhLCAkY291cG9uQ29kZTogU3RyaW5nISkge1xuICAgICAgICByZW1vdmVDb3Vwb25Db2RlRnJvbURyYWZ0T3JkZXIob3JkZXJJZDogJG9yZGVySWQsIGNvdXBvbkNvZGU6ICRjb3Vwb25Db2RlKSB7XG4gICAgICAgICAgICAuLi5PcmRlckRldGFpbFxuICAgICAgICB9XG4gICAgfVxuICAgICR7T1JERVJfREVUQUlMX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERSQUZUX09SREVSX0VMSUdJQkxFX1NISVBQSU5HX01FVEhPRFMgPSBncWxgXG4gICAgcXVlcnkgRHJhZnRPcmRlckVsaWdpYmxlU2hpcHBpbmdNZXRob2RzKCRvcmRlcklkOiBJRCEpIHtcbiAgICAgICAgZWxpZ2libGVTaGlwcGluZ01ldGhvZHNGb3JEcmFmdE9yZGVyKG9yZGVySWQ6ICRvcmRlcklkKSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIHByaWNlXG4gICAgICAgICAgICBwcmljZVdpdGhUYXhcbiAgICAgICAgICAgIG1ldGFkYXRhXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VUX0RSQUZUX09SREVSX1NISVBQSU5HX01FVEhPRCA9IGdxbGBcbiAgICBtdXRhdGlvbiBTZXREcmFmdE9yZGVyU2hpcHBpbmdNZXRob2QoJG9yZGVySWQ6IElEISwgJHNoaXBwaW5nTWV0aG9kSWQ6IElEISkge1xuICAgICAgICBzZXREcmFmdE9yZGVyU2hpcHBpbmdNZXRob2Qob3JkZXJJZDogJG9yZGVySWQsIHNoaXBwaW5nTWV0aG9kSWQ6ICRzaGlwcGluZ01ldGhvZElkKSB7XG4gICAgICAgICAgICAuLi5PcmRlckRldGFpbFxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke09SREVSX0RFVEFJTF9GUkFHTUVOVH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG4iXX0=