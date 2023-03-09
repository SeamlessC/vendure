"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStateTransitions = void 0;
exports.orderStateTransitions = {
    Created: {
        to: ['AddingItems', 'Draft'],
    },
    Draft: {
        to: ['Cancelled', 'ArrangingPayment'],
    },
    AddingItems: {
        to: ['ArrangingPayment', 'Cancelled'],
    },
    ArrangingPayment: {
        to: ['PaymentAuthorized', 'PaymentSettled', 'AddingItems', 'Cancelled'],
    },
    PaymentAuthorized: {
        to: ['PaymentSettled', 'Cancelled', 'Modifying', 'Processing'],
    },
    PaymentSettled: {
        to: ['Processing', 'Cancelled', 'Modifying', 'Completed'],
    },
    Processing: {
        to: ['ReadyForPickup', 'Cancelled'],
    },
    ReadyForPickup: {
        to: ['Delivering', 'Cancelled', 'Completed', 'PaymentSettled'],
    },
    Delivering: {
        to: ['Completed', 'Cancelled'],
    },
    Modifying: {
        to: ['PaymentAuthorized', 'PaymentSettled'],
    },
    Cancelled: {
        to: [],
    },
    Completed: {
        to: [],
    },
};
//# sourceMappingURL=order-state.js.map