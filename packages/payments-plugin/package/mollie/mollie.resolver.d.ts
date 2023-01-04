import { RequestContext } from '@vendure/core';
import { MolliePaymentIntent, MolliePaymentIntentError, MolliePaymentIntentInput, MolliePaymentIntentResult, MolliePaymentMethod, MolliePaymentMethodsInput } from './graphql/generated-shop-types';
import { MollieService } from './mollie.service';
export declare class MollieResolver {
    private mollieService;
    constructor(mollieService: MollieService);
    createMolliePaymentIntent(ctx: RequestContext, input: MolliePaymentIntentInput): Promise<MolliePaymentIntentResult>;
    __resolveType(value: MolliePaymentIntentError | MolliePaymentIntent): string;
    molliePaymentMethods(ctx: RequestContext, { paymentMethodCode }: MolliePaymentMethodsInput): Promise<MolliePaymentMethod[]>;
}
