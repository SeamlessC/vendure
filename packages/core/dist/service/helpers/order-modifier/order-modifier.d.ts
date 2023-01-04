import { ModifyOrderInput, ModifyOrderResult } from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';
import { RequestContext } from '../../../api/common/request-context';
import { JustErrorResults } from '../../../common/error/error-result';
import { ConfigService } from '../../../config/config.service';
import { TransactionalConnection } from '../../../connection/transactional-connection';
import { OrderLine } from '../../../entity/order-line/order-line.entity';
import { OrderModification } from '../../../entity/order-modification/order-modification.entity';
import { Order } from '../../../entity/order/order.entity';
import { ProductVariant } from '../../../entity/product-variant/product-variant.entity';
import { EventBus } from '../../../event-bus/event-bus';
import { CountryService } from '../../services/country.service';
import { HistoryService } from '../../services/history.service';
import { PaymentService } from '../../services/payment.service';
import { ProductVariantService } from '../../services/product-variant.service';
import { PromotionService } from '../../services/promotion.service';
import { StockMovementService } from '../../services/stock-movement.service';
import { CustomFieldRelationService } from '../custom-field-relation/custom-field-relation.service';
import { EntityHydrator } from '../entity-hydrator/entity-hydrator.service';
import { OrderCalculator } from '../order-calculator/order-calculator';
import { TranslatorService } from '../translator/translator.service';
/**
 * @description
 * This helper is responsible for modifying the contents of an Order.
 *
 * Note:
 * There is not a clear separation of concerns between the OrderService and this, since
 * the OrderService also contains some method which modify the Order (e.g. removeItemFromOrder).
 * So this helper was mainly extracted to isolate the huge `modifyOrder` method since the
 * OrderService was just growing too large. Future refactoring could improve the organization
 * of these Order-related methods into a more clearly-delineated set of classes.
 *
 * @docsCategory service-helpers
 */
export declare class OrderModifier {
    private connection;
    private configService;
    private orderCalculator;
    private paymentService;
    private countryService;
    private stockMovementService;
    private productVariantService;
    private customFieldRelationService;
    private promotionService;
    private eventBus;
    private entityHydrator;
    private historyService;
    private translator;
    constructor(connection: TransactionalConnection, configService: ConfigService, orderCalculator: OrderCalculator, paymentService: PaymentService, countryService: CountryService, stockMovementService: StockMovementService, productVariantService: ProductVariantService, customFieldRelationService: CustomFieldRelationService, promotionService: PromotionService, eventBus: EventBus, entityHydrator: EntityHydrator, historyService: HistoryService, translator: TranslatorService);
    /**
     * @description
     * Ensure that the ProductVariant has sufficient saleable stock to add the given
     * quantity to an Order.
     */
    constrainQuantityToSaleable(ctx: RequestContext, variant: ProductVariant, quantity: number, existingQuantity?: number): Promise<number>;
    /**
     * @description
     * Given a ProductVariant ID and optional custom fields, this method will return an existing OrderLine that
     * matches, or `undefined` if no match is found.
     */
    getExistingOrderLine(ctx: RequestContext, order: Order, productVariantId: ID, customFields?: {
        [key: string]: any;
    }): Promise<OrderLine | undefined>;
    /**
     * @description
     * Returns the OrderLine to which a new OrderItem belongs, creating a new OrderLine
     * if no existing line is found.
     */
    getOrCreateOrderLine(ctx: RequestContext, order: Order, productVariantId: ID, customFields?: {
        [key: string]: any;
    }): Promise<OrderLine>;
    /**
     * @description
     * Updates the quantity of an OrderLine, taking into account the available saleable stock level.
     * Returns the actual quantity that the OrderLine was updated to (which may be less than the
     * `quantity` argument if insufficient stock was available.
     */
    updateOrderLineQuantity(ctx: RequestContext, orderLine: OrderLine, quantity: number, order: Order): Promise<OrderLine>;
    modifyOrder(ctx: RequestContext, input: ModifyOrderInput, order: Order): Promise<JustErrorResults<ModifyOrderResult> | {
        order: Order;
        modification: OrderModification;
    }>;
    private noChangesSpecified;
    private getAdjustmentFromNewlyAppliedPromotions;
    private getOrderPayments;
    private customFieldsAreEqual;
    /**
     * This function is required because with the MySQL driver, boolean customFields with a default
     * of `false` were being represented as `0`, thus causing the equality check to fail.
     * So if it's a boolean, we'll explicitly coerce the value to a boolean.
     */
    private coerceValue;
    private getProductVariantOrThrow;
}
