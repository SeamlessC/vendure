import { RequestContext } from '../../../api/common/request-context';
import { Transitions } from '../../../common/finite-state-machine/types';
import { Order } from '../../../entity/order/order.entity';

/**
 * @description
 * These are the default states of the Order process. They can be augmented and
 * modified by using the {@link OrderOptions} `process` property.
 *
 * @docsCategory orders
 */
export type OrderState =
    | 'Created'
    | 'AddingItems'
    | 'ArrangingCardPayment'
    | 'AwaitingCashCollection'
    | 'PaymentSettled'
    | 'Delivering'
    | 'Modifying'
    | 'OrderReceived'
    | 'Processing'
    | 'ReadyForPickup'
    | 'Completed'
    | 'Cancelled'
    | 'ReadyForDelivery';

export const orderStateTransitions: Transitions<OrderState> = {
    Created: {
        to: ['AddingItems'],
    },
    AddingItems: {
        to: ['AwaitingCashCollection', 'ArrangingCardPayment', 'Cancelled'],
    },
    ArrangingCardPayment: {
        to: ['PaymentSettled', 'Cancelled', 'Completed'],
    },
    AwaitingCashCollection: {
        to: ['PaymentSettled', 'Cancelled', 'Completed'],
    },
    PaymentSettled: {
        to: ['OrderReceived', 'Completed', 'Cancelled'],
    },
    OrderReceived: {
        to: ['Processing'],
    },
    Processing: {
        to: ['ReadyForDelivery', 'ReadyForPickup'],
    },
    ReadyForPickup: {
        to: ['Completed', 'AwaitingCashCollection'],
    },
    ReadyForDelivery: {
        to: ['Delivering'],
    },
    Delivering: {
        to: ['AwaitingCashCollection', 'Completed', 'Cancelled'],
    },
    Modifying: {
        to: ['PaymentSettled'],
    },
    Cancelled: {
        to: [],
    },
    Completed: {
        to: [],
    },
};

export interface OrderTransitionData {
    ctx: RequestContext;
    order: Order;
}
