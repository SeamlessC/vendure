"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.molliePaymentHandler = void 0;
const api_client_1 = __importStar(require("@mollie/api-client"));
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const mollie_service_1 = require("./mollie.service");
let mollieService;
exports.molliePaymentHandler = new core_1.PaymentMethodHandler({
    code: 'mollie-payment-handler',
    description: [
        {
            languageCode: generated_types_1.LanguageCode.en,
            value: 'Mollie payment',
        },
    ],
    args: {
        apiKey: {
            type: 'string',
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'API Key' }],
        },
        redirectUrl: {
            type: 'string',
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Redirect URL' }],
            description: [
                { languageCode: generated_types_1.LanguageCode.en, value: 'Redirect the client to this URL after payment' },
            ],
        },
    },
    init(injector) {
        mollieService = injector.get(mollie_service_1.MollieService);
    },
    createPayment: async (ctx, order, amount, args, metadata) => {
        // Creating a payment immediately settles the payment in Mollie flow, so only Admins and internal calls should be allowed to do this
        if (ctx.apiType !== 'admin') {
            throw Error(`CreatePayment is not allowed for apiType '${ctx.apiType}'`);
        }
        return {
            amount,
            state: 'Settled',
            transactionId: metadata.paymentId,
            metadata // Store all given metadata on a payment
        };
    },
    settlePayment: async (ctx, order, payment, args) => {
        // this should never be called
        return { success: true };
    },
    createRefund: async (ctx, input, amount, order, payment, args) => {
        const { apiKey } = args;
        const mollieClient = api_client_1.default({ apiKey });
        const refund = await mollieClient.payments_refunds.create({
            paymentId: payment.transactionId,
            description: input.reason,
            amount: {
                value: (amount / 100).toFixed(2),
                currency: order.currencyCode,
            },
        });
        if (refund.status === api_client_1.RefundStatus.failed) {
            core_1.Logger.error(`Failed to create refund of ${amount.toFixed()} for order ${order.code} for transaction ${payment.transactionId}`, constants_1.loggerCtx);
            return {
                state: 'Failed',
                transactionId: payment.transactionId,
            };
        }
        core_1.Logger.info(`Created refund of ${amount.toFixed()} for order ${order.code} for transaction ${payment.transactionId}`, constants_1.loggerCtx);
        return {
            state: 'Settled',
            transactionId: payment.transactionId,
        };
    },
});
//# sourceMappingURL=mollie.handler.js.map