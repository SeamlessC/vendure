import { AddItemToDraftOrderInput, AddItemToDraftOrderMutation, AddNoteToOrderInput, AdjustDraftOrderLineInput, AdjustDraftOrderLineMutation, ApplyCouponCodeToDraftOrderMutation, CancelOrderInput, CreateAddressInput, CreateCustomerInput, CreateDraftOrderMutation, DeleteDraftOrderMutation, DraftOrderEligibleShippingMethodsQuery, FulfillOrderInput, HistoryEntryListOptions, ManualPaymentInput, ModifyOrderInput, OrderListOptions, RefundOrderInput, RemoveCouponCodeFromDraftOrderMutation, RemoveDraftOrderLineMutation, SetCustomerForDraftOrderMutation, SetDraftOrderBillingAddressMutation, SetDraftOrderShippingAddressMutation, SetDraftOrderShippingMethodMutation, SettleRefundInput, UpdateOrderInput, UpdateOrderNoteInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class OrderDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getOrders(options?: OrderListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<OrderListOptions> | undefined;
    }>>;
    getOrder(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getOrderHistory(id: string, options?: HistoryEntryListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderHistoryQuery, import("../../common/generated-types").Exact<{
        id: string;
        options?: import("../../common/generated-types").Maybe<HistoryEntryListOptions> | undefined;
    }>>;
    settlePayment(id: string): import("rxjs").Observable<import("../../common/generated-types").SettlePaymentMutation>;
    cancelPayment(id: string): import("rxjs").Observable<import("../../common/generated-types").CancelPaymentMutation>;
    transitionPaymentToState(id: string, state: string): import("rxjs").Observable<import("../../common/generated-types").TransitionPaymentToStateMutation>;
    createFulfillment(input: FulfillOrderInput): import("rxjs").Observable<import("../../common/generated-types").CreateFulfillmentMutation>;
    transitionFulfillmentToState(id: string, state: string): import("rxjs").Observable<import("../../common/generated-types").TransitionFulfillmentToStateMutation>;
    cancelOrder(input: CancelOrderInput): import("rxjs").Observable<import("../../common/generated-types").CancelOrderMutation>;
    refundOrder(input: RefundOrderInput): import("rxjs").Observable<import("../../common/generated-types").RefundOrderMutation>;
    settleRefund(input: SettleRefundInput, orderId: string): import("rxjs").Observable<import("../../common/generated-types").SettleRefundMutation>;
    addNoteToOrder(input: AddNoteToOrderInput): import("rxjs").Observable<import("../../common/generated-types").AddNoteToOrderMutation>;
    updateOrderNote(input: UpdateOrderNoteInput): import("rxjs").Observable<import("../../common/generated-types").UpdateOrderNoteMutation>;
    deleteOrderNote(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteOrderNoteMutation>;
    transitionToState(id: string, state: string): import("rxjs").Observable<import("../../common/generated-types").TransitionOrderToStateMutation>;
    updateOrderCustomFields(input: UpdateOrderInput): import("rxjs").Observable<import("../../common/generated-types").UpdateOrderCustomFieldsMutation>;
    getOrderSummary(start: Date, end: Date): import("../query-result").QueryResult<import("../../common/generated-types").GetOrderSummaryQuery, import("../../common/generated-types").Exact<{
        start: any;
        end: any;
    }>>;
    modifyOrder(input: ModifyOrderInput): import("rxjs").Observable<import("../../common/generated-types").ModifyOrderMutation>;
    addManualPaymentToOrder(input: ManualPaymentInput): import("rxjs").Observable<import("../../common/generated-types").AddManualPaymentMutation>;
    createDraftOrder(): import("rxjs").Observable<CreateDraftOrderMutation>;
    deleteDraftOrder(orderId: string): import("rxjs").Observable<DeleteDraftOrderMutation>;
    addItemToDraftOrder(orderId: string, input: AddItemToDraftOrderInput): import("rxjs").Observable<AddItemToDraftOrderMutation>;
    adjustDraftOrderLine(orderId: string, input: AdjustDraftOrderLineInput): import("rxjs").Observable<AdjustDraftOrderLineMutation>;
    removeDraftOrderLine(orderId: string, orderLineId: string): import("rxjs").Observable<RemoveDraftOrderLineMutation>;
    setCustomerForDraftOrder(orderId: string, { customerId, input }: {
        customerId?: string;
        input?: CreateCustomerInput;
    }): import("rxjs").Observable<SetCustomerForDraftOrderMutation>;
    setDraftOrderShippingAddress(orderId: string, input: CreateAddressInput): import("rxjs").Observable<SetDraftOrderShippingAddressMutation>;
    setDraftOrderBillingAddress(orderId: string, input: CreateAddressInput): import("rxjs").Observable<SetDraftOrderBillingAddressMutation>;
    applyCouponCodeToDraftOrder(orderId: string, couponCode: string): import("rxjs").Observable<ApplyCouponCodeToDraftOrderMutation>;
    removeCouponCodeFromDraftOrder(orderId: string, couponCode: string): import("rxjs").Observable<RemoveCouponCodeFromDraftOrderMutation>;
    getDraftOrderEligibleShippingMethods(orderId: string): import("../query-result").QueryResult<DraftOrderEligibleShippingMethodsQuery, import("../../common/generated-types").Exact<{
        orderId: string;
    }>>;
    setDraftOrderShippingMethod(orderId: string, shippingMethodId: string): import("rxjs").Observable<SetDraftOrderShippingMethodMutation>;
}
