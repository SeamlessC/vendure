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
        Received: {
            to: ['Processing'],
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

export const orderFinishedProcess: CustomOrderProcess<'Finished'> = {
    transitions: {
        ReadyForPickup: {
            to: ['Finished'],
            mergeStrategy: 'replace',
        },
        Finished: {
            to: [],
        },
    },
};
