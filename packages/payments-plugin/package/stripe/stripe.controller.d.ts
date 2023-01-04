import { OrderService, RequestContextService, TransactionalConnection } from '@vendure/core';
import { Response } from 'express';
import { StripeService } from './stripe.service';
import { RequestWithRawBody } from './types';
export declare class StripeController {
    private connection;
    private orderService;
    private stripeService;
    private requestContextService;
    constructor(connection: TransactionalConnection, orderService: OrderService, stripeService: StripeService, requestContextService: RequestContextService);
    webhook(signature: string | undefined, request: RequestWithRawBody, response: Response): Promise<void>;
    private createContext;
    private getPaymentMethod;
}
