import { OrderState } from '../service';
import { OrderTransitionData } from '../service/helpers/order-state-machine/order-state';

import { CustomOrderProcess } from './order/custom-order-process';

export const orderReceivedProcess: CustomOrderProcess<any> = {
    transitions: {
        PaymentAuthorized: {
            to: ['Received'],
            mergeStrategy: 'replace',
        },
        Received: {
            to: ['PaymentSettled'],
        },
    },
};

export const orderProcessingProcess: CustomOrderProcess<'Processing'> = {
    transitions: {
        ReadyForDelivery: {
            to: ['ReadyForDelivery', 'ReadyForPickup'],
            mergeStrategy: 'replace',
        },
        Processing: {
            to: ['ReadyForPickup'],
        },
    },
};

export const orderReadyForPickupProcess: CustomOrderProcess<'ReadyForPickup'> = {
    transitions: {
        Processing: {
            to: ['ReadyForPickup'],
            mergeStrategy: 'replace',
        },
        ReadyForPickup: {
            to: ['ReadyForPickup'],
        },
    },
};

export const orderFinishedProcess: CustomOrderProcess<'Completed'> = {
    transitions: {
        ReadyForPickup: {
            to: ['Completed'],
            mergeStrategy: 'replace',
        },
        Completed: {
            to: [],
        },
    },
};
