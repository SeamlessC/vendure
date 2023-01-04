import { ActiveOrderService, ChannelService, EntityHydrator, OrderService, PaymentMethodService, RequestContext } from '@vendure/core';
import { MolliePaymentIntentInput, MolliePaymentIntentResult, MolliePaymentMethod } from './graphql/generated-shop-types';
import { MolliePluginOptions } from './mollie.plugin';
interface SettlePaymentInput {
    channelToken: string;
    paymentMethodId: string;
    paymentId: string;
}
export declare class MollieService {
    private paymentMethodService;
    private options;
    private activeOrderService;
    private orderService;
    private channelService;
    private entityHydrator;
    constructor(paymentMethodService: PaymentMethodService, options: MolliePluginOptions, activeOrderService: ActiveOrderService, orderService: OrderService, channelService: ChannelService, entityHydrator: EntityHydrator);
    /**
     * Creates a redirectUrl to Mollie for the given paymentMethod and current activeOrder
     */
    createPaymentIntent(ctx: RequestContext, { paymentMethodCode, molliePaymentMethodCode }: MolliePaymentIntentInput): Promise<MolliePaymentIntentResult>;
    /**
     * Makes a request to Mollie to verify the given payment by id
     */
    settlePayment({ channelToken, paymentMethodId, paymentId }: SettlePaymentInput): Promise<void>;
    getEnabledPaymentMethods(ctx: RequestContext, paymentMethodCode: string): Promise<MolliePaymentMethod[]>;
    private getPaymentMethod;
    private createContext;
}
export {};
