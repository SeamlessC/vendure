"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vendure/core");
/**
 * This is a handler which integrates Vendure with an imaginary
 * payment provider, who provide a Node SDK which we use to
 * interact with their APIs.
 */
const cashPaymentHandler = new core_1.PaymentMethodHandler({
    code: 'cash',
    description: [
        {
            languageCode: core_1.LanguageCode.en,
            value: 'Cash Payment',
        },
    ],
    args: {},
    /** This is called when the `addPaymentToOrder` mutation is executed */
    createPayment: async (ctx, order, amount, args, metadata) => {
        try {
            return {
                amount: order.totalWithTax,
                state: 'Authorized',
            };
        }
        catch (err) {
            return {
                amount: order.totalWithTax,
                state: 'Declined',
                metadata: {
                    errorMessage: err.message,
                },
            };
        }
    },
    /** This is called when the `settlePayment` mutation is executed */
    settlePayment: async (ctx, order, payment, args) => {
        try {
            return { success: true };
        }
        catch (err) {
            return {
                success: false,
                errorMessage: err.message,
            };
        }
    },
});
exports.default = cashPaymentHandler;
//# sourceMappingURL=cash-payment.js.map