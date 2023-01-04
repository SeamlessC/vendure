import { RequestContextCacheService } from '../../../cache/index';
import { Fulfillment, OrderItem } from '../../../entity';
import { FulfillmentService } from '../../../service';
import { RequestContext } from '../../common/request-context';
export declare class OrderItemEntityResolver {
    private fulfillmentService;
    private requestContextCache;
    constructor(fulfillmentService: FulfillmentService, requestContextCache: RequestContextCacheService);
    fulfillment(ctx: RequestContext, orderItem: OrderItem): Promise<Fulfillment | undefined>;
}
