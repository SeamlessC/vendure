import { ID } from '@vendure/common/lib/shared-types';
import { RequestContext } from '../../../api/common/request-context';
import { Transitions } from '../../../common/finite-state-machine/types';
import { Order } from '../../../entity/order/order.entity';
/**
 * @description
 * An interface to extend standard {@link OrderState}.
 *
 * @docsCategory orders
 */
export interface CustomOrderStates {
}
/**
 * @description
 * These are the default states of the Order process. They can be augmented and
 * modified by using the {@link OrderOptions} `process` property.
 *
 * @docsCategory orders
 */
export declare type OrderState = 'Created' | 'Draft' | 'AddingItems' | 'ArrangingPayment' | 'PaymentAuthorized' | 'PaymentSettled' | 'Processing' | 'ReadyForPickup' | 'Completed' | 'Modifying' | 'Delivering' | 'Cancelled' | keyof CustomOrderStates;
export declare const orderStateTransitions: Transitions<OrderState>;
export interface OrderTransitionData {
    ctx: RequestContext;
    order: Order;
    fulfillmentIds?: ID[];
}
