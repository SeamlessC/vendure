/// <reference types="node" />
import { Order, RequestContext, TransactionalConnection } from '@vendure/core';
import Stripe from 'stripe';
import { StripePluginOptions } from './types';
export declare class StripeService {
    private connection;
    private options;
    protected stripe: Stripe;
    constructor(connection: TransactionalConnection, options: StripePluginOptions);
    createPaymentIntent(ctx: RequestContext, order: Order): Promise<string | undefined>;
    createRefund(paymentIntentId: string, amount: number): Promise<Stripe.Refund | Stripe.StripeError>;
    constructEventFromPayload(payload: Buffer, signature: string): Stripe.Event;
    /**
     * Returns the stripeCustomerId if the Customer has one. If that's not the case, queries Stripe to check
     * if the customer is already registered, in which case it saves the id as stripeCustomerId and returns it.
     * Otherwise, creates a new Customer record in Stripe and returns the generated id.
     */
    private getStripeCustomerId;
}
