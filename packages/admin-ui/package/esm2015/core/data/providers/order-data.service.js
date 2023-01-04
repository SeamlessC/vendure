import { ADD_ITEM_TO_DRAFT_ORDER, ADD_MANUAL_PAYMENT_TO_ORDER, ADD_NOTE_TO_ORDER, ADJUST_DRAFT_ORDER_LINE, CANCEL_ORDER, CANCEL_PAYMENT, CREATE_DRAFT_ORDER, CREATE_FULFILLMENT, DELETE_ORDER_NOTE, GET_ORDER, GET_ORDERS_LIST, GET_ORDER_HISTORY, GET_ORDER_SUMMARY, MODIFY_ORDER, REFUND_ORDER, REMOVE_DRAFT_ORDER_LINE, SETTLE_PAYMENT, SETTLE_REFUND, SET_CUSTOMER_FOR_DRAFT_ORDER, TRANSITION_FULFILLMENT_TO_STATE, TRANSITION_ORDER_TO_STATE, TRANSITION_PAYMENT_TO_STATE, UPDATE_ORDER_CUSTOM_FIELDS, UPDATE_ORDER_NOTE, SET_SHIPPING_ADDRESS_FOR_DRAFT_ORDER, SET_BILLING_ADDRESS_FOR_DRAFT_ORDER, APPLY_COUPON_CODE_TO_DRAFT_ORDER, REMOVE_COUPON_CODE_FROM_DRAFT_ORDER, DRAFT_ORDER_ELIGIBLE_SHIPPING_METHODS, SET_DRAFT_ORDER_SHIPPING_METHOD, DELETE_DRAFT_ORDER, } from '../definitions/order-definitions';
export class OrderDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getOrders(options = { take: 10 }) {
        return this.baseDataService.query(GET_ORDERS_LIST, {
            options,
        });
    }
    getOrder(id) {
        return this.baseDataService.query(GET_ORDER, { id });
    }
    getOrderHistory(id, options) {
        return this.baseDataService.query(GET_ORDER_HISTORY, {
            id,
            options,
        });
    }
    settlePayment(id) {
        return this.baseDataService.mutate(SETTLE_PAYMENT, {
            id,
        });
    }
    cancelPayment(id) {
        return this.baseDataService.mutate(CANCEL_PAYMENT, {
            id,
        });
    }
    transitionPaymentToState(id, state) {
        return this.baseDataService.mutate(TRANSITION_PAYMENT_TO_STATE, {
            id,
            state,
        });
    }
    createFulfillment(input) {
        return this.baseDataService.mutate(CREATE_FULFILLMENT, {
            input,
        });
    }
    transitionFulfillmentToState(id, state) {
        return this.baseDataService.mutate(TRANSITION_FULFILLMENT_TO_STATE, {
            id,
            state,
        });
    }
    cancelOrder(input) {
        return this.baseDataService.mutate(CANCEL_ORDER, {
            input,
        });
    }
    refundOrder(input) {
        return this.baseDataService.mutate(REFUND_ORDER, {
            input,
        });
    }
    settleRefund(input, orderId) {
        return this.baseDataService.mutate(SETTLE_REFUND, {
            input,
        });
    }
    addNoteToOrder(input) {
        return this.baseDataService.mutate(ADD_NOTE_TO_ORDER, {
            input,
        });
    }
    updateOrderNote(input) {
        return this.baseDataService.mutate(UPDATE_ORDER_NOTE, {
            input,
        });
    }
    deleteOrderNote(id) {
        return this.baseDataService.mutate(DELETE_ORDER_NOTE, {
            id,
        });
    }
    transitionToState(id, state) {
        return this.baseDataService.mutate(TRANSITION_ORDER_TO_STATE, {
            id,
            state,
        });
    }
    updateOrderCustomFields(input) {
        return this.baseDataService.mutate(UPDATE_ORDER_CUSTOM_FIELDS, {
            input,
        });
    }
    getOrderSummary(start, end) {
        return this.baseDataService.query(GET_ORDER_SUMMARY, {
            start: start.toISOString(),
            end: end.toISOString(),
        });
    }
    modifyOrder(input) {
        return this.baseDataService.mutate(MODIFY_ORDER, {
            input,
        });
    }
    addManualPaymentToOrder(input) {
        return this.baseDataService.mutate(ADD_MANUAL_PAYMENT_TO_ORDER, { input });
    }
    createDraftOrder() {
        return this.baseDataService.mutate(CREATE_DRAFT_ORDER);
    }
    deleteDraftOrder(orderId) {
        return this.baseDataService.mutate(DELETE_DRAFT_ORDER, { orderId });
    }
    addItemToDraftOrder(orderId, input) {
        return this.baseDataService.mutate(ADD_ITEM_TO_DRAFT_ORDER, { orderId, input });
    }
    adjustDraftOrderLine(orderId, input) {
        return this.baseDataService.mutate(ADJUST_DRAFT_ORDER_LINE, { orderId, input });
    }
    removeDraftOrderLine(orderId, orderLineId) {
        return this.baseDataService.mutate(REMOVE_DRAFT_ORDER_LINE, { orderId, orderLineId });
    }
    setCustomerForDraftOrder(orderId, { customerId, input }) {
        return this.baseDataService.mutate(SET_CUSTOMER_FOR_DRAFT_ORDER, { orderId, customerId, input });
    }
    setDraftOrderShippingAddress(orderId, input) {
        return this.baseDataService.mutate(SET_SHIPPING_ADDRESS_FOR_DRAFT_ORDER, { orderId, input });
    }
    setDraftOrderBillingAddress(orderId, input) {
        return this.baseDataService.mutate(SET_BILLING_ADDRESS_FOR_DRAFT_ORDER, { orderId, input });
    }
    applyCouponCodeToDraftOrder(orderId, couponCode) {
        return this.baseDataService.mutate(APPLY_COUPON_CODE_TO_DRAFT_ORDER, { orderId, couponCode });
    }
    removeCouponCodeFromDraftOrder(orderId, couponCode) {
        return this.baseDataService.mutate(REMOVE_COUPON_CODE_FROM_DRAFT_ORDER, { orderId, couponCode });
    }
    getDraftOrderEligibleShippingMethods(orderId) {
        return this.baseDataService.query(DRAFT_ORDER_ELIGIBLE_SHIPPING_METHODS, { orderId });
    }
    setDraftOrderShippingMethod(orderId, shippingMethodId) {
        return this.baseDataService.mutate(SET_DRAFT_ORDER_SHIPPING_METHOD, { orderId, shippingMethodId });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9kYXRhL3Byb3ZpZGVycy9vcmRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNERBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsMkJBQTJCLEVBQzNCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsY0FBYyxFQUNkLGFBQWEsRUFDYiw0QkFBNEIsRUFDNUIsK0JBQStCLEVBQy9CLHlCQUF5QixFQUN6QiwyQkFBMkIsRUFDM0IsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQixvQ0FBb0MsRUFDcEMsbUNBQW1DLEVBQ25DLGdDQUFnQyxFQUNoQyxtQ0FBbUMsRUFDbkMscUNBQXFDLEVBQ3JDLCtCQUErQixFQUMvQixrQkFBa0IsR0FDckIsTUFBTSxrQ0FBa0MsQ0FBQztBQUkxQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQ3pCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7SUFFeEQsU0FBUyxDQUFDLFVBQTRCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM5QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUE2QyxlQUFlLEVBQUU7WUFDM0YsT0FBTztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQXFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJ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OlsiaW1wb3J0IHtcbiAgICBBZGRJdGVtVG9EcmFmdE9yZGVySW5wdXQsXG4gICAgQWRkSXRlbVRvRHJhZnRPcmRlck11dGF0aW9uLFxuICAgIEFkZEl0ZW1Ub0RyYWZ0T3JkZXJNdXRhdGlvblZhcmlhYmxlcyxcbiAgICBBZGRNYW51YWxQYXltZW50LFxuICAgIEFkZE5vdGVUb09yZGVyLFxuICAgIEFkZE5vdGVUb09yZGVySW5wdXQsXG4gICAgQWRqdXN0RHJhZnRPcmRlckxpbmVJbnB1dCxcbiAgICBBZGp1c3REcmFmdE9yZGVyTGluZU11dGF0aW9uLFxuICAgIEFkanVzdERyYWZ0T3JkZXJMaW5lTXV0YXRpb25WYXJpYWJsZXMsXG4gICAgQXBwbHlDb3Vwb25Db2RlVG9EcmFmdE9yZGVyTXV0YXRpb24sXG4gICAgQXBwbHlDb3Vwb25Db2RlVG9EcmFmdE9yZGVyTXV0YXRpb25WYXJpYWJsZXMsXG4gICAgQ2FuY2VsT3JkZXIsXG4gICAgQ2FuY2VsT3JkZXJJbnB1dCxcbiAgICBDYW5jZWxQYXltZW50LFxuICAgIENyZWF0ZUFkZHJlc3NJbnB1dCxcbiAgICBDcmVhdGVDdXN0b21lcklucHV0LFxuICAgIENyZWF0ZURyYWZ0T3JkZXJNdXRhdGlvbixcbiAgICBDcmVhdGVEcmFmdE9yZGVyTXV0YXRpb25WYXJpYWJsZXMsXG4gICAgQ3JlYXRlRnVsZmlsbG1lbnQsXG4gICAgRGVsZXRlRHJhZnRPcmRlck11dGF0aW9uLFxuICAgIERlbGV0ZURyYWZ0T3JkZXJNdXRhdGlvblZhcmlhYmxlcyxcbiAgICBEZWxldGVPcmRlck5vdGUsXG4gICAgRHJhZnRPcmRlckVsaWdpYmxlU2hpcHBpbmdNZXRob2RzUXVlcnksXG4gICAgRHJhZnRPcmRlckVsaWdpYmxlU2hpcHBpbmdNZXRob2RzUXVlcnlWYXJpYWJsZXMsXG4gICAgRnVsZmlsbE9yZGVySW5wdXQsXG4gICAgR2V0T3JkZXIsXG4gICAgR2V0T3JkZXJIaXN0b3J5LFxuICAgIEdldE9yZGVyTGlzdCxcbiAgICBHZXRPcmRlclN1bW1hcnksXG4gICAgSGlzdG9yeUVudHJ5TGlzdE9wdGlvbnMsXG4gICAgTWFudWFsUGF5bWVudElucHV0LFxuICAgIE1vZGlmeU9yZGVyLFxuICAgIE1vZGlmeU9yZGVySW5wdXQsXG4gICAgT3JkZXJMaXN0T3B0aW9ucyxcbiAgICBSZWZ1bmRPcmRlcixcbiAgICBSZWZ1bmRPcmRlcklucHV0LFxuICAgIFJlbW92ZUNvdXBvbkNvZGVGcm9tRHJhZnRPcmRlck11dGF0aW9uLFxuICAgIFJlbW92ZUNvdXBvbkNvZGVGcm9tRHJhZnRPcmRlck11dGF0aW9uVmFyaWFibGVzLFxuICAgIFJlbW92ZURyYWZ0T3JkZXJMaW5lTXV0YXRpb24sXG4gICAgUmVtb3ZlRHJhZnRPcmRlckxpbmVNdXRhdGlvblZhcmlhYmxlcyxcbiAgICBTZXRDdXN0b21lckZvckRyYWZ0T3JkZXJNdXRhdGlvbixcbiAgICBTZXRDdXN0b21lckZvckRyYWZ0T3JkZXJNdXRhdGlvblZhcmlhYmxlcyxcbiAgICBTZXREcmFmdE9yZGVyQmlsbGluZ0FkZHJlc3NNdXRhdGlvbixcbiAgICBTZXREcmFmdE9yZGVyQmlsbGluZ0FkZHJlc3NNdXRhdGlvblZhcmlhYmxlcyxcbiAgICBTZXREcmFmdE9yZGVyU2hpcHBpbmdBZGRyZXNzTXV0YXRpb24sXG4gICAgU2V0RHJhZnRPcmRlclNoaXBwaW5nQWRkcmVzc011dGF0aW9uVmFyaWFibGVzLFxuICAgIFNldERyYWZ0T3JkZXJTaGlwcGluZ01ldGhvZE11dGF0aW9uLFxuICAgIFNldERyYWZ0T3JkZXJTaGlwcGluZ01ldGhvZE11dGF0aW9uVmFyaWFibGVzLFxuICAgIFNldHRsZVBheW1lbnQsXG4gICAgU2V0dGxlUmVmdW5kLFxuICAgIFNldHRsZVJlZnVuZElucHV0LFxuICAgIFRyYW5zaXRpb25GdWxmaWxsbWVudFRvU3RhdGUsXG4gICAgVHJhbnNpdGlvbk9yZGVyVG9TdGF0ZSxcbiAgICBUcmFuc2l0aW9uUGF5bWVudFRvU3RhdGUsXG4gICAgVXBkYXRlT3JkZXJDdXN0b21GaWVsZHMsXG4gICAgVXBkYXRlT3JkZXJJbnB1dCxcbiAgICBVcGRhdGVPcmRlck5vdGUsXG4gICAgVXBkYXRlT3JkZXJOb3RlSW5wdXQsXG59IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHtcbiAgICBBRERfSVRFTV9UT19EUkFGVF9PUkRFUixcbiAgICBBRERfTUFOVUFMX1BBWU1FTlRfVE9fT1JERVIsXG4gICAgQUREX05PVEVfVE9fT1JERVIsXG4gICAgQURKVVNUX0RSQUZUX09SREVSX0xJTkUsXG4gICAgQ0FOQ0VMX09SREVSLFxuICAgIENBTkNFTF9QQVlNRU5ULFxuICAgIENSRUFURV9EUkFGVF9PUkRFUixcbiAgICBDUkVBVEVfRlVMRklMTE1FTlQsXG4gICAgREVMRVRFX09SREVSX05PVEUsXG4gICAgR0VUX09SREVSLFxuICAgIEdFVF9PUkRFUlNfTElTVCxcbiAgICBHRVRfT1JERVJfSElTVE9SWSxcbiAgICBHRVRfT1JERVJfU1VNTUFSWSxcbiAgICBNT0RJRllfT1JERVIsXG4gICAgUkVGVU5EX09SREVSLFxuICAgIFJFTU9WRV9EUkFGVF9PUkRFUl9MSU5FLFxuICAgIFNFVFRMRV9QQVlNRU5ULFxuICAgIFNFVFRMRV9SRUZVTkQsXG4gICAgU0VUX0NVU1RPTUVSX0ZPUl9EUkFGVF9PUkRFUixcbiAgICBUUkFOU0lUSU9OX0ZVTEZJTExNRU5UX1RPX1NUQVRFLFxuICAgIFRSQU5TSVRJT05fT1JERVJfVE9fU1RBVEUsXG4gICAgVFJBTlNJVElPTl9QQVlNRU5UX1RPX1NUQVRFLFxuICAgIFVQREFURV9PUkRFUl9DVVNUT01fRklFTERTLFxuICAgIFVQREFURV9PUkRFUl9OT1RFLFxuICAgIFNFVF9TSElQUElOR19BRERSRVNTX0ZPUl9EUkFGVF9PUkRFUixcbiAgICBTRVRfQklMTElOR19BRERSRVNTX0ZPUl9EUkFGVF9PUkRFUixcbiAgICBBUFBMWV9DT1VQT05fQ09ERV9UT19EUkFGVF9PUkRFUixcbiAgICBSRU1PVkVfQ09VUE9OX0NPREVfRlJPTV9EUkFGVF9PUkRFUixcbiAgICBEUkFGVF9PUkRFUl9FTElHSUJMRV9TSElQUElOR19NRVRIT0RTLFxuICAgIFNFVF9EUkFGVF9PUkRFUl9TSElQUElOR19NRVRIT0QsXG4gICAgREVMRVRFX0RSQUZUX09SREVSLFxufSBmcm9tICcuLi9kZWZpbml0aW9ucy9vcmRlci1kZWZpbml0aW9ucyc7XG5cbmltcG9ydCB7IEJhc2VEYXRhU2VydmljZSB9IGZyb20gJy4vYmFzZS1kYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgT3JkZXJEYXRhU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlRGF0YVNlcnZpY2U6IEJhc2VEYXRhU2VydmljZSkge31cblxuICAgIGdldE9yZGVycyhvcHRpb25zOiBPcmRlckxpc3RPcHRpb25zID0geyB0YWtlOiAxMCB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRPcmRlckxpc3QuUXVlcnksIEdldE9yZGVyTGlzdC5WYXJpYWJsZXM+KEdFVF9PUkRFUlNfTElTVCwge1xuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3JkZXIoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0T3JkZXIuUXVlcnksIEdldE9yZGVyLlZhcmlhYmxlcz4oR0VUX09SREVSLCB7IGlkIH0pO1xuICAgIH1cblxuICAgIGdldE9yZGVySGlzdG9yeShpZDogc3RyaW5nLCBvcHRpb25zPzogSGlzdG9yeUVudHJ5TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldE9yZGVySGlzdG9yeS5RdWVyeSwgR2V0T3JkZXJIaXN0b3J5LlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBHRVRfT1JERVJfSElTVE9SWSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXR0bGVQYXltZW50KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxTZXR0bGVQYXltZW50Lk11dGF0aW9uLCBTZXR0bGVQYXltZW50LlZhcmlhYmxlcz4oU0VUVExFX1BBWU1FTlQsIHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5jZWxQYXltZW50KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxDYW5jZWxQYXltZW50Lk11dGF0aW9uLCBDYW5jZWxQYXltZW50LlZhcmlhYmxlcz4oQ0FOQ0VMX1BBWU1FTlQsIHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uUGF5bWVudFRvU3RhdGUoaWQ6IHN0cmluZywgc3RhdGU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFxuICAgICAgICAgICAgVHJhbnNpdGlvblBheW1lbnRUb1N0YXRlLk11dGF0aW9uLFxuICAgICAgICAgICAgVHJhbnNpdGlvblBheW1lbnRUb1N0YXRlLlZhcmlhYmxlc1xuICAgICAgICA+KFRSQU5TSVRJT05fUEFZTUVOVF9UT19TVEFURSwge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlRnVsZmlsbG1lbnQoaW5wdXQ6IEZ1bGZpbGxPcmRlcklucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8Q3JlYXRlRnVsZmlsbG1lbnQuTXV0YXRpb24sIENyZWF0ZUZ1bGZpbGxtZW50LlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBDUkVBVEVfRlVMRklMTE1FTlQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRyYW5zaXRpb25GdWxmaWxsbWVudFRvU3RhdGUoaWQ6IHN0cmluZywgc3RhdGU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFxuICAgICAgICAgICAgVHJhbnNpdGlvbkZ1bGZpbGxtZW50VG9TdGF0ZS5NdXRhdGlvbixcbiAgICAgICAgICAgIFRyYW5zaXRpb25GdWxmaWxsbWVudFRvU3RhdGUuVmFyaWFibGVzXG4gICAgICAgID4oVFJBTlNJVElPTl9GVUxGSUxMTUVOVF9UT19TVEFURSwge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsT3JkZXIoaW5wdXQ6IENhbmNlbE9yZGVySW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxDYW5jZWxPcmRlci5NdXRhdGlvbiwgQ2FuY2VsT3JkZXIuVmFyaWFibGVzPihDQU5DRUxfT1JERVIsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZ1bmRPcmRlcihpbnB1dDogUmVmdW5kT3JkZXJJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFJlZnVuZE9yZGVyLk11dGF0aW9uLCBSZWZ1bmRPcmRlci5WYXJpYWJsZXM+KFJFRlVORF9PUkRFUiwge1xuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldHRsZVJlZnVuZChpbnB1dDogU2V0dGxlUmVmdW5kSW5wdXQsIG9yZGVySWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFNldHRsZVJlZnVuZC5NdXRhdGlvbiwgU2V0dGxlUmVmdW5kLlZhcmlhYmxlcz4oU0VUVExFX1JFRlVORCwge1xuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZE5vdGVUb09yZGVyKGlucHV0OiBBZGROb3RlVG9PcmRlcklucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8QWRkTm90ZVRvT3JkZXIuTXV0YXRpb24sIEFkZE5vdGVUb09yZGVyLlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBBRERfTk9URV9UT19PUkRFUixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlT3JkZXJOb3RlKGlucHV0OiBVcGRhdGVPcmRlck5vdGVJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFVwZGF0ZU9yZGVyTm90ZS5NdXRhdGlvbiwgVXBkYXRlT3JkZXJOb3RlLlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBVUERBVEVfT1JERVJfTk9URSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlT3JkZXJOb3RlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxEZWxldGVPcmRlck5vdGUuTXV0YXRpb24sIERlbGV0ZU9yZGVyTm90ZS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgREVMRVRFX09SREVSX05PVEUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRyYW5zaXRpb25Ub1N0YXRlKGlkOiBzdHJpbmcsIHN0YXRlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxUcmFuc2l0aW9uT3JkZXJUb1N0YXRlLk11dGF0aW9uLCBUcmFuc2l0aW9uT3JkZXJUb1N0YXRlLlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBUUkFOU0lUSU9OX09SREVSX1RPX1NUQVRFLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVPcmRlckN1c3RvbUZpZWxkcyhpbnB1dDogVXBkYXRlT3JkZXJJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFxuICAgICAgICAgICAgVXBkYXRlT3JkZXJDdXN0b21GaWVsZHMuTXV0YXRpb24sXG4gICAgICAgICAgICBVcGRhdGVPcmRlckN1c3RvbUZpZWxkcy5WYXJpYWJsZXNcbiAgICAgICAgPihVUERBVEVfT1JERVJfQ1VTVE9NX0ZJRUxEUywge1xuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE9yZGVyU3VtbWFyeShzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRPcmRlclN1bW1hcnkuUXVlcnksIEdldE9yZGVyU3VtbWFyeS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgR0VUX09SREVSX1NVTU1BUlksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgZW5kOiBlbmQudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbW9kaWZ5T3JkZXIoaW5wdXQ6IE1vZGlmeU9yZGVySW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxNb2RpZnlPcmRlci5NdXRhdGlvbiwgTW9kaWZ5T3JkZXIuVmFyaWFibGVzPihNT0RJRllfT1JERVIsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRNYW51YWxQYXltZW50VG9PcmRlcihpbnB1dDogTWFudWFsUGF5bWVudElucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8QWRkTWFudWFsUGF5bWVudC5NdXRhdGlvbiwgQWRkTWFudWFsUGF5bWVudC5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgQUREX01BTlVBTF9QQVlNRU5UX1RPX09SREVSLFxuICAgICAgICAgICAgeyBpbnB1dCB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNyZWF0ZURyYWZ0T3JkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8Q3JlYXRlRHJhZnRPcmRlck11dGF0aW9uPihDUkVBVEVfRFJBRlRfT1JERVIpO1xuICAgIH1cblxuICAgIGRlbGV0ZURyYWZ0T3JkZXIob3JkZXJJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8RGVsZXRlRHJhZnRPcmRlck11dGF0aW9uLCBEZWxldGVEcmFmdE9yZGVyTXV0YXRpb25WYXJpYWJsZXM+KFxuICAgICAgICAgICAgREVMRVRFX0RSQUZUX09SREVSLFxuICAgICAgICAgICAgeyBvcmRlcklkIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkSXRlbVRvRHJhZnRPcmRlcihvcmRlcklkOiBzdHJpbmcsIGlucHV0OiBBZGRJdGVtVG9EcmFmdE9yZGVySW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxBZGRJdGVtVG9EcmFmdE9yZGVyTXV0YXRpb24sIEFkZEl0ZW1Ub0RyYWZ0T3JkZXJNdXRhdGlvblZhcmlhYmxlcz4oXG4gICAgICAgICAgICBBRERfSVRFTV9UT19EUkFGVF9PUkRFUixcbiAgICAgICAgICAgIHsgb3JkZXJJZCwgaW5wdXQgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhZGp1c3REcmFmdE9yZGVyTGluZShvcmRlcklkOiBzdHJpbmcsIGlucHV0OiBBZGp1c3REcmFmdE9yZGVyTGluZUlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8XG4gICAgICAgICAgICBBZGp1c3REcmFmdE9yZGVyTGluZU11dGF0aW9uLFxuICAgICAgICAgICAgQWRqdXN0RHJhZnRPcmRlckxpbmVNdXRhdGlvblZhcmlhYmxlc1xuICAgICAgICA+KEFESlVTVF9EUkFGVF9PUkRFUl9MSU5FLCB7IG9yZGVySWQsIGlucHV0IH0pO1xuICAgIH1cblxuICAgIHJlbW92ZURyYWZ0T3JkZXJMaW5lKG9yZGVySWQ6IHN0cmluZywgb3JkZXJMaW5lSWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFxuICAgICAgICAgICAgUmVtb3ZlRHJhZnRPcmRlckxpbmVNdXRhdGlvbixcbiAgICAgICAgICAgIFJlbW92ZURyYWZ0T3JkZXJMaW5lTXV0YXRpb25WYXJpYWJsZXNcbiAgICAgICAgPihSRU1PVkVfRFJBRlRfT1JERVJfTElORSwgeyBvcmRlcklkLCBvcmRlckxpbmVJZCB9KTtcbiAgICB9XG5cbiAgICBzZXRDdXN0b21lckZvckRyYWZ0T3JkZXIoXG4gICAgICAgIG9yZGVySWQ6IHN0cmluZyxcbiAgICAgICAgeyBjdXN0b21lcklkLCBpbnB1dCB9OiB7IGN1c3RvbWVySWQ/OiBzdHJpbmc7IGlucHV0PzogQ3JlYXRlQ3VzdG9tZXJJbnB1dCB9LFxuICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFxuICAgICAgICAgICAgU2V0Q3VzdG9tZXJGb3JEcmFmdE9yZGVyTXV0YXRpb24sXG4gICAgICAgICAgICBTZXRDdXN0b21lckZvckRyYWZ0T3JkZXJNdXRhdGlvblZhcmlhYmxlc1xuICAgICAgICA+KFNFVF9DVVNUT01FUl9GT1JfRFJBRlRfT1JERVIsIHsgb3JkZXJJZCwgY3VzdG9tZXJJZCwgaW5wdXQgfSk7XG4gICAgfVxuXG4gICAgc2V0RHJhZnRPcmRlclNoaXBwaW5nQWRkcmVzcyhvcmRlcklkOiBzdHJpbmcsIGlucHV0OiBDcmVhdGVBZGRyZXNzSW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxcbiAgICAgICAgICAgIFNldERyYWZ0T3JkZXJTaGlwcGluZ0FkZHJlc3NNdXRhdGlvbixcbiAgICAgICAgICAgIFNldERyYWZ0T3JkZXJTaGlwcGluZ0FkZHJlc3NNdXRhdGlvblZhcmlhYmxlc1xuICAgICAgICA+KFNFVF9TSElQUElOR19BRERSRVNTX0ZPUl9EUkFGVF9PUkRFUiwgeyBvcmRlcklkLCBpbnB1dCB9KTtcbiAgICB9XG5cbiAgICBzZXREcmFmdE9yZGVyQmlsbGluZ0FkZHJlc3Mob3JkZXJJZDogc3RyaW5nLCBpbnB1dDogQ3JlYXRlQWRkcmVzc0lucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8XG4gICAgICAgICAgICBTZXREcmFmdE9yZGVyQmlsbGluZ0FkZHJlc3NNdXRhdGlvbixcbiAgICAgICAgICAgIFNldERyYWZ0T3JkZXJCaWxsaW5nQWRkcmVzc011dGF0aW9uVmFyaWFibGVzXG4gICAgICAgID4oU0VUX0JJTExJTkdfQUREUkVTU19GT1JfRFJBRlRfT1JERVIsIHsgb3JkZXJJZCwgaW5wdXQgfSk7XG4gICAgfVxuXG4gICAgYXBwbHlDb3Vwb25Db2RlVG9EcmFmdE9yZGVyKG9yZGVySWQ6IHN0cmluZywgY291cG9uQ29kZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8XG4gICAgICAgICAgICBBcHBseUNvdXBvbkNvZGVUb0RyYWZ0T3JkZXJNdXRhdGlvbixcbiAgICAgICAgICAgIEFwcGx5Q291cG9uQ29kZVRvRHJhZnRPcmRlck11dGF0aW9uVmFyaWFibGVzXG4gICAgICAgID4oQVBQTFlfQ09VUE9OX0NPREVfVE9fRFJBRlRfT1JERVIsIHsgb3JkZXJJZCwgY291cG9uQ29kZSB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVDb3Vwb25Db2RlRnJvbURyYWZ0T3JkZXIob3JkZXJJZDogc3RyaW5nLCBjb3Vwb25Db2RlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxcbiAgICAgICAgICAgIFJlbW92ZUNvdXBvbkNvZGVGcm9tRHJhZnRPcmRlck11dGF0aW9uLFxuICAgICAgICAgICAgUmVtb3ZlQ291cG9uQ29kZUZyb21EcmFmdE9yZGVyTXV0YXRpb25WYXJpYWJsZXNcbiAgICAgICAgPihSRU1PVkVfQ09VUE9OX0NPREVfRlJPTV9EUkFGVF9PUkRFUiwgeyBvcmRlcklkLCBjb3Vwb25Db2RlIH0pO1xuICAgIH1cblxuICAgIGdldERyYWZ0T3JkZXJFbGlnaWJsZVNoaXBwaW5nTWV0aG9kcyhvcmRlcklkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PFxuICAgICAgICAgICAgRHJhZnRPcmRlckVsaWdpYmxlU2hpcHBpbmdNZXRob2RzUXVlcnksXG4gICAgICAgICAgICBEcmFmdE9yZGVyRWxpZ2libGVTaGlwcGluZ01ldGhvZHNRdWVyeVZhcmlhYmxlc1xuICAgICAgICA+KERSQUZUX09SREVSX0VMSUdJQkxFX1NISVBQSU5HX01FVEhPRFMsIHsgb3JkZXJJZCB9KTtcbiAgICB9XG5cbiAgICBzZXREcmFmdE9yZGVyU2hpcHBpbmdNZXRob2Qob3JkZXJJZDogc3RyaW5nLCBzaGlwcGluZ01ldGhvZElkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxcbiAgICAgICAgICAgIFNldERyYWZ0T3JkZXJTaGlwcGluZ01ldGhvZE11dGF0aW9uLFxuICAgICAgICAgICAgU2V0RHJhZnRPcmRlclNoaXBwaW5nTWV0aG9kTXV0YXRpb25WYXJpYWJsZXNcbiAgICAgICAgPihTRVRfRFJBRlRfT1JERVJfU0hJUFBJTkdfTUVUSE9ELCB7IG9yZGVySWQsIHNoaXBwaW5nTWV0aG9kSWQgfSk7XG4gICAgfVxufVxuIl19