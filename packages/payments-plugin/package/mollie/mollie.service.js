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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MollieService = void 0;
const api_client_1 = __importStar(require("@mollie/api-client"));
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const generated_graphql_shop_errors_1 = require("@vendure/core/dist/common/error/generated-graphql-shop-errors");
const constants_1 = require("./constants");
const generated_shop_types_1 = require("./graphql/generated-shop-types");
const api_client_2 = require("@mollie/api-client");
class PaymentIntentError {
    constructor(message) {
        this.message = message;
        this.errorCode = generated_shop_types_1.ErrorCode.ORDER_PAYMENT_STATE_ERROR;
    }
}
class InvalidInput {
    constructor(message) {
        this.message = message;
        this.errorCode = generated_shop_types_1.ErrorCode.INELIGIBLE_PAYMENT_METHOD_ERROR;
    }
}
let MollieService = class MollieService {
    constructor(paymentMethodService, options, activeOrderService, orderService, channelService, entityHydrator) {
        this.paymentMethodService = paymentMethodService;
        this.options = options;
        this.activeOrderService = activeOrderService;
        this.orderService = orderService;
        this.channelService = channelService;
        this.entityHydrator = entityHydrator;
    }
    /**
     * Creates a redirectUrl to Mollie for the given paymentMethod and current activeOrder
     */
    async createPaymentIntent(ctx, { paymentMethodCode, molliePaymentMethodCode }) {
        var _a, _b, _c, _d;
        const allowedMethods = Object.values(api_client_2.PaymentMethod);
        if (molliePaymentMethodCode && !allowedMethods.includes(molliePaymentMethodCode)) {
            return new InvalidInput(`molliePaymentMethodCode has to be one of "${allowedMethods.join(',')}"`);
        }
        const [order, paymentMethod] = await Promise.all([
            this.activeOrderService.getOrderFromContext(ctx),
            this.getPaymentMethod(ctx, paymentMethodCode),
        ]);
        if (!order) {
            return new PaymentIntentError('No active order found for session');
        }
        await this.entityHydrator.hydrate(ctx, order, { relations: ['lines', 'customer', 'shippingLines'] });
        if (!((_a = order.lines) === null || _a === void 0 ? void 0 : _a.length)) {
            return new PaymentIntentError('Cannot create payment intent for empty order');
        }
        if (!order.customer) {
            return new PaymentIntentError('Cannot create payment intent for order without customer');
        }
        if (!((_b = order.shippingLines) === null || _b === void 0 ? void 0 : _b.length)) {
            return new PaymentIntentError('Cannot create payment intent for order without shippingMethod');
        }
        if (!paymentMethod) {
            return new PaymentIntentError(`No paymentMethod found with code ${paymentMethodCode}`);
        }
        const apiKey = (_c = paymentMethod.handler.args.find(arg => arg.name === 'apiKey')) === null || _c === void 0 ? void 0 : _c.value;
        let redirectUrl = (_d = paymentMethod.handler.args.find(arg => arg.name === 'redirectUrl')) === null || _d === void 0 ? void 0 : _d.value;
        if (!apiKey || !redirectUrl) {
            core_1.Logger.warn(`CreatePaymentIntent failed, because no apiKey or redirect is configured for ${paymentMethod.code}`, constants_1.loggerCtx);
            return new PaymentIntentError(`Paymentmethod ${paymentMethod.code} has no apiKey or redirectUrl configured`);
        }
        const mollieClient = api_client_1.default({ apiKey });
        redirectUrl = redirectUrl.endsWith('/') ? redirectUrl.slice(0, -1) : redirectUrl; // remove appending slash
        const vendureHost = this.options.vendureHost.endsWith('/')
            ? this.options.vendureHost.slice(0, -1)
            : this.options.vendureHost; // remove appending slash
        const paymentInput = {
            amount: {
                value: `${(order.totalWithTax / 100).toFixed(2)}`,
                currency: order.currencyCode,
            },
            metadata: {
                orderCode: order.code,
            },
            description: `Order ${order.code}`,
            redirectUrl: `${redirectUrl}/${order.code}`,
            webhookUrl: `${vendureHost}/payments/mollie/${ctx.channel.token}/${paymentMethod.id}`,
        };
        if (molliePaymentMethodCode) {
            paymentInput.method = molliePaymentMethodCode;
        }
        const payment = await mollieClient.payments.create(paymentInput);
        const url = payment.getCheckoutUrl();
        if (!url) {
            throw Error(`Unable to getCheckoutUrl() from Mollie payment`);
        }
        return {
            url,
        };
    }
    /**
     * Makes a request to Mollie to verify the given payment by id
     */
    async settlePayment({ channelToken, paymentMethodId, paymentId }) {
        var _a;
        const ctx = await this.createContext(channelToken);
        core_1.Logger.info(`Received payment for ${channelToken}`, constants_1.loggerCtx);
        const paymentMethod = await this.paymentMethodService.findOne(ctx, paymentMethodId);
        if (!paymentMethod) {
            // Fail silently, as we don't want to expose if a paymentMethodId exists or not
            return core_1.Logger.warn(`No paymentMethod found with id ${paymentMethodId}`, constants_1.loggerCtx);
        }
        const apiKey = (_a = paymentMethod.handler.args.find(a => a.name === 'apiKey')) === null || _a === void 0 ? void 0 : _a.value;
        if (!apiKey) {
            throw Error(`No apiKey found for payment ${paymentMethod.id} for channel ${channelToken}`);
        }
        const client = api_client_1.default({ apiKey });
        const molliePayment = await client.payments.get(paymentId);
        const orderCode = molliePayment.metadata.orderCode;
        if (molliePayment.status !== api_client_1.PaymentStatus.paid) {
            return core_1.Logger.warn(`Received payment for ${channelToken} for order ${orderCode} with status ${molliePayment.status}`, constants_1.loggerCtx);
        }
        if (!orderCode) {
            throw Error(`Molliepayment does not have metadata.orderCode, unable to settle payment ${molliePayment.id}!`);
        }
        core_1.Logger.info(`Received payment ${molliePayment.id} for order ${orderCode} with status ${molliePayment.status}`, constants_1.loggerCtx);
        const order = await this.orderService.findOneByCode(ctx, orderCode);
        if (!order) {
            throw Error(`Unable to find order ${orderCode}, unable to settle payment ${molliePayment.id}!`);
        }
        if (order.state !== 'ArrangingPayment') {
            const transitionToStateResult = await this.orderService.transitionToState(ctx, order.id, 'ArrangingPayment');
            if (transitionToStateResult instanceof generated_graphql_shop_errors_1.OrderStateTransitionError) {
                throw Error(`Error transitioning order ${order.code} from ${transitionToStateResult.fromState} to ${transitionToStateResult.toState}: ${transitionToStateResult.message}`);
            }
        }
        const addPaymentToOrderResult = await this.orderService.addPaymentToOrder(ctx, order.id, {
            method: paymentMethod.code,
            metadata: {
                paymentId: molliePayment.id,
                mode: molliePayment.mode,
                method: molliePayment.method,
                profileId: molliePayment.profileId,
                settlementAmount: molliePayment.settlementAmount,
                customerId: molliePayment.customerId,
                authorizedAt: molliePayment.authorizedAt,
                paidAt: molliePayment.paidAt,
            },
        });
        if (!(addPaymentToOrderResult instanceof core_1.Order)) {
            throw Error(`Error adding payment to order ${orderCode}: ${addPaymentToOrderResult.message}`);
        }
        core_1.Logger.info(`Payment for order ${molliePayment.metadata.orderCode} settled`, constants_1.loggerCtx);
    }
    async getEnabledPaymentMethods(ctx, paymentMethodCode) {
        var _a;
        const paymentMethod = await this.getPaymentMethod(ctx, paymentMethodCode);
        const apiKey = (_a = paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.handler.args.find(arg => arg.name === 'apiKey')) === null || _a === void 0 ? void 0 : _a.value;
        if (!apiKey) {
            throw Error(`No apiKey configured for payment method ${paymentMethodCode}`);
        }
        const client = api_client_1.default({ apiKey });
        const methods = await client.methods.list();
        return methods.map(m => (Object.assign(Object.assign({}, m), { code: m.id })));
    }
    async getPaymentMethod(ctx, paymentMethodCode) {
        const paymentMethods = await this.paymentMethodService.findAll(ctx);
        return paymentMethods.items.find(pm => pm.code === paymentMethodCode);
    }
    async createContext(channelToken) {
        const channel = await this.channelService.getChannelFromToken(channelToken);
        return new core_1.RequestContext({
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: core_1.LanguageCode.en,
        });
    }
};
MollieService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(constants_1.PLUGIN_INIT_OPTIONS)),
    __metadata("design:paramtypes", [core_1.PaymentMethodService, Object, core_1.ActiveOrderService,
        core_1.OrderService,
        core_1.ChannelService,
        core_1.EntityHydrator])
], MollieService);
exports.MollieService = MollieService;
//# sourceMappingURL=mollie.service.js.map