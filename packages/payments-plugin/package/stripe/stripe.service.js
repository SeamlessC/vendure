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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const stripe_1 = __importDefault(require("stripe"));
const constants_1 = require("./constants");
const stripe_utils_1 = require("./stripe-utils");
let StripeService = class StripeService {
    constructor(connection, options) {
        this.connection = connection;
        this.options = options;
        this.stripe = new stripe_1.default(this.options.apiKey, {
            apiVersion: '2020-08-27',
        });
    }
    async createPaymentIntent(ctx, order) {
        let customerId;
        if (this.options.storeCustomersInStripe && ctx.activeUserId) {
            customerId = await this.getStripeCustomerId(ctx, order);
        }
        const amountInMinorUnits = stripe_utils_1.getAmountInStripeMinorUnits(order);
        const { client_secret } = await this.stripe.paymentIntents.create({
            amount: amountInMinorUnits,
            currency: order.currencyCode.toLowerCase(),
            customer: customerId,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                channelToken: ctx.channel.token,
                orderId: order.id,
                orderCode: order.code,
            },
        }, { idempotencyKey: `${order.code}_${amountInMinorUnits}` });
        if (!client_secret) {
            // This should never happen
            core_1.Logger.warn(`Payment intent creation for order ${order.code} did not return client secret`, constants_1.loggerCtx);
        }
        return client_secret !== null && client_secret !== void 0 ? client_secret : undefined;
    }
    async createRefund(paymentIntentId, amount) {
        // TODO: Consider passing the "reason" property once this feature request is addressed:
        // https://github.com/vendure-ecommerce/vendure/issues/893
        try {
            const refund = await this.stripe.refunds.create({
                payment_intent: paymentIntentId,
                amount,
            });
            return refund;
        }
        catch (e) {
            return e;
        }
    }
    constructEventFromPayload(payload, signature) {
        return this.stripe.webhooks.constructEvent(payload, signature, this.options.webhookSigningSecret);
    }
    /**
     * Returns the stripeCustomerId if the Customer has one. If that's not the case, queries Stripe to check
     * if the customer is already registered, in which case it saves the id as stripeCustomerId and returns it.
     * Otherwise, creates a new Customer record in Stripe and returns the generated id.
     */
    async getStripeCustomerId(ctx, activeOrder) {
        // Load relation with customer not available in the response from activeOrderService.getOrderFromContext()
        const order = await this.connection.getRepository(core_1.Order).findOne(activeOrder.id, {
            relations: ['customer'],
        });
        if (!order || !order.customer) {
            // This should never happen
            return undefined;
        }
        const { customer } = order;
        if (customer.customFields.stripeCustomerId) {
            return customer.customFields.stripeCustomerId;
        }
        let stripeCustomerId;
        const stripeCustomers = await this.stripe.customers.list({ email: customer.emailAddress });
        if (stripeCustomers.data.length > 0) {
            stripeCustomerId = stripeCustomers.data[0].id;
        }
        else {
            const newStripeCustomer = await this.stripe.customers.create({
                email: customer.emailAddress,
                name: `${customer.firstName} ${customer.lastName}`,
            });
            stripeCustomerId = newStripeCustomer.id;
            core_1.Logger.info(`Created Stripe Customer record for customerId ${customer.id}`, constants_1.loggerCtx);
        }
        customer.customFields.stripeCustomerId = stripeCustomerId;
        await this.connection.getRepository(ctx, core_1.Customer).save(customer, { reload: false });
        return stripeCustomerId;
    }
};
StripeService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(constants_1.STRIPE_PLUGIN_OPTIONS)),
    __metadata("design:paramtypes", [core_1.TransactionalConnection, Object])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map