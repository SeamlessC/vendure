"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
/**
 * This is a handler which integrates Vendure with an imaginary
 * payment provider, who provide a Node SDK which we use to
 * interact with their APIs.
 */
const cardPaymentHandler = new core_1.PaymentMethodHandler({
    code: 'card',
    description: [
        {
            languageCode: core_1.LanguageCode.en,
            value: 'Card Payment',
        },
    ],
    args: {},
    /** This is called when the `addPaymentToOrder` mutation is executed */
    createPayment: async (ctx, order, amount, args, metadata) => {
        return {
            amount: order.totalWithTax,
            state: 'Declined',
            metadata: {
                errorMessage: 'This endpoint should not be called!',
            },
        };
    },
    /** This is called when the `settlePayment` mutation is executed */
    settlePayment: async (ctx, order, payment, args) => {
        return {
            success: false,
            errorMessage: 'This endpoint should not be called!',
        };
    },
});
exports.default = cardPaymentHandler;
//# sourceMappingURL=card-payment.js.map