"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const generated_graphql_shop_errors_1 = require("@vendure/core/dist/common/error/generated-graphql-shop-errors");
const constants_1 = require("./constants");
const stripe_handler_1 = require("./stripe.handler");
const stripe_service_1 = require("./stripe.service");
const missingHeaderErrorMessage = 'Missing stripe-signature header';
const signatureErrorMessage = 'Error verifying Stripe webhook signature';
const noPaymentIntentErrorMessage = 'No payment intent in the event payload';
let StripeController = class StripeController {
    constructor(connection, orderService, stripeService, requestContextService) {
        this.connection = connection;
        this.orderService = orderService;
        this.stripeService = stripeService;
        this.requestContextService = requestContextService;
    }
    async webhook(signature, request, response) {
        var _a;
        if (!signature) {
            core_1.Logger.error(missingHeaderErrorMessage, constants_1.loggerCtx);
            response.status(common_1.HttpStatus.BAD_REQUEST).send(missingHeaderErrorMessage);
            return;
        }
        let event = null;
        try {
            event = this.stripeService.constructEventFromPayload(request.rawBody, signature);
        }
        catch (e) {
            core_1.Logger.error(`${signatureErrorMessage} ${signature}: ${e.message}`, constants_1.loggerCtx);
            response.status(common_1.HttpStatus.BAD_REQUEST).send(signatureErrorMessage);
            return;
        }
        const paymentIntent = event.data.object;
        if (!paymentIntent) {
            core_1.Logger.error(noPaymentIntentErrorMessage, constants_1.loggerCtx);
            response.status(common_1.HttpStatus.BAD_REQUEST).send(noPaymentIntentErrorMessage);
            return;
        }
        const { metadata: { channelToken, orderCode, orderId } = {} } = paymentIntent;
        if (event.type === 'payment_intent.payment_failed') {
            const message = (_a = paymentIntent.last_payment_error) === null || _a === void 0 ? void 0 : _a.message;
            core_1.Logger.warn(`Payment for order ${orderCode} failed: ${message}`, constants_1.loggerCtx);
            return;
        }
        if (event.type !== 'payment_intent.succeeded') {
            // This should never happen as the webhook is configured to receive
            // payment_intent.succeeded and payment_intent.payment_failed events only
            core_1.Logger.info(`Received ${event.type} status update for order ${orderCode}`, constants_1.loggerCtx);
            return;
        }
        const ctx = await this.createContext(channelToken, request);
        const order = await this.orderService.findOneByCode(ctx, orderCode);
        if (!order) {
            throw Error(`Unable to find order ${orderCode}, unable to settle payment ${paymentIntent.id}!`);
        }
        if (order.state !== 'ArrangingPayment') {
            const transitionToStateResult = await this.orderService.transitionToState(ctx, orderId, 'ArrangingPayment');
            if (transitionToStateResult instanceof generated_graphql_shop_errors_1.OrderStateTransitionError) {
                core_1.Logger.error(`Error transitioning order ${orderCode} to ArrangingPayment state: ${transitionToStateResult.message}`, constants_1.loggerCtx);
                return;
            }
        }
        const paymentMethod = await this.getPaymentMethod(ctx);
        const addPaymentToOrderResult = await this.orderService.addPaymentToOrder(ctx, orderId, {
            method: paymentMethod.code,
            metadata: {
                paymentIntentAmountReceived: paymentIntent.amount_received,
                paymentIntentId: paymentIntent.id,
            },
        });
        if (!(addPaymentToOrderResult instanceof core_1.Order)) {
            core_1.Logger.error(`Error adding payment to order ${orderCode}: ${addPaymentToOrderResult.message}`, constants_1.loggerCtx);
            return;
        }
        core_1.Logger.info(`Stripe payment intent id ${paymentIntent.id} added to order ${orderCode}`, constants_1.loggerCtx);
        response.status(common_1.HttpStatus.OK).send('Ok');
    }
    async createContext(channelToken, req) {
        return this.requestContextService.create({
            apiType: 'admin',
            channelOrToken: channelToken,
            req,
            languageCode: core_1.LanguageCode.en,
        });
    }
    async getPaymentMethod(ctx) {
        const method = (await this.connection.getRepository(ctx, core_1.PaymentMethod).find()).find(m => m.handler.code === stripe_handler_1.stripePaymentMethodHandler.code);
        if (!method) {
            throw new core_1.InternalServerError(`[${constants_1.loggerCtx}] Could not find Stripe PaymentMethod`);
        }
        return method;
    }
};
__decorate([
    common_1.Post('stripe'),
    __param(0, common_1.Headers('stripe-signature')),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "webhook", null);
StripeController = __decorate([
    common_1.Controller('payments'),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.TransactionalConnection !== "undefined" && core_1.TransactionalConnection) === "function" ? _a : Object, typeof (_b = typeof core_1.OrderService !== "undefined" && core_1.OrderService) === "function" ? _b : Object, stripe_service_1.StripeService, typeof (_c = typeof core_1.RequestContextService !== "undefined" && core_1.RequestContextService) === "function" ? _c : Object])
], StripeController);
exports.StripeController = StripeController;
//# sourceMappingURL=stripe.controller.js.map