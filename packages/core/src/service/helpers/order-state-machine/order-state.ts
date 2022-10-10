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
    | 'Delivered'
    | 'Delivering'
    | 'Modifying'
    | 'Received'
    | 'Processing'
    | 'ReadyForPickup'
    | 'Completed'
    | 'Cancelled';

export const orderStateTransitions: Transitions<OrderState> = {
    Created: {
        to: ['AddingItems'],
    },
    AddingItems: {
        to: ['ArrangingCardPayment', 'Cancelled'],
    },
    ArrangingCardPayment: {
        to: ['PaymentSettled', 'AddingItems', 'Cancelled'],
    },
    AwaitingCashCollection: {
        to: ['PaymentSettled', 'AddingItems', 'Cancelled'],
    },
    PaymentSettled: {
        to: ['Received', 'Delivered', 'Cancelled', 'Modifying'],
    },
    Received: {
        to: ['PaymentSettled'],
    },
    Processing: {
        to: ['ReadyForPickup'],
    },
    ReadyForPickup: {
        to: ['Completed'],
    },
    Delivering: {
        to: ['Delivered', 'Cancelled', 'Modifying'],
    },
    Delivered: {
        to: ['Cancelled'],
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
