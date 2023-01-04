"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripePaymentMethodHandler = void 0;
const core_1 = require("@vendure/core");
const stripe_1 = __importDefault(require("stripe"));
const stripe_utils_1 = require("./stripe-utils");
const stripe_service_1 = require("./stripe.service");
const { StripeError } = stripe_1.default.errors;
let stripeService;
/**
 * The handler for Stripe payments.
 */
exports.stripePaymentMethodHandler = new core_1.PaymentMethodHandler({
    code: 'stripe',
    description: [{ languageCode: core_1.LanguageCode.en, value: 'Stripe payments' }],
    args: {},
    init(injector) {
        stripeService = injector.get(stripe_service_1.StripeService);
    },
    async createPayment(ctx, order, amount, ___, metadata) {
        // Payment is already settled in Stripe by the time the webhook in stripe.controller.ts
        // adds the payment to the order
        if (ctx.apiType !== 'admin') {
            throw Error(`CreatePayment is not allowed for apiType '${ctx.apiType}'`);
        }
        const amountInMinorUnits = stripe_utils_1.getAmountFromStripeMinorUnits(order, metadata.paymentIntentAmountReceived);
        return {
            amount: amountInMinorUnits,
            state: 'Settled',
            transactionId: metadata.paymentIntentId,
        };
    },
    settlePayment() {
        return {
            success: true,
        };
    },
    async createRefund(ctx, input, amount, order, payment, args) {
        const result = await stripeService.createRefund(payment.transactionId, amount);
        if (result instanceof StripeError) {
            return {
                state: 'Failed',
                transactionId: payment.transactionId,
                metadata: {
                    type: result.type,
                    message: result.message,
                },
            };
        }
        if (result.status === 'succeeded') {
            return {
                state: 'Settled',
                transactionId: payment.transactionId,
            };
        }
        if (result.status === 'pending') {
            return {
                state: 'Pending',
                transactionId: payment.transactionId,
            };
        }
        return {
            state: 'Failed',
            transactionId: payment.transactionId,
            metadata: {
                message: result.failure_reason,
            },
        };
    },
});
//# sourceMappingURL=stripe.handler.js.map