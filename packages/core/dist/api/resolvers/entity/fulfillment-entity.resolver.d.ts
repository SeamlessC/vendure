import { RequestContextCacheService } from '../../../cache/index';
import { Fulfillment } from '../../../entity/fulfillment/fulfillment.entity';
import { FulfillmentService } from '../../../service/services/fulfillment.service';
import { RequestContext } from '../../common/request-context';
export declare class FulfillmentEntityResolver {
    private fulfillmentService;
    private requestContextCache;
    constructor(fulfillmentService: FulfillmentService, requestContextCache: RequestContextCacheService);
    orderItems(ctx: RequestContext, fulfillment: Fulfillment): Promise<import("../../..").OrderItem[]>;
    summary(ctx: RequestContext, fulfillment: Fulfillment): Promise<{
        orderLine: import("../../..").OrderLine;
        quantity: number;
    }[]>;
}
export declare class FulfillmentAdminEntityResolver {
    private fulfillmentService;
    constructor(fulfillmentService: FulfillmentService);
    nextStates(fulfillment: Fulfillment): Promise<readonly import("../../../service/index").FulfillmentState[]>;
}
