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
exports.RestPlugin = exports.PayhereController = exports.PayhereResponseDTO = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const generated_graphql_shop_errors_1 = require("@vendure/core/dist/common/error/generated-graphql-shop-errors");
const payment_state_machine_1 = require("@vendure/core/dist/service/helpers/payment-state-machine/payment-state-machine");
const md5_1 = __importDefault(require("crypto-js/md5"));
const secrets_1 = require("../secrets");
class PayhereResponseDTO {
}
exports.PayhereResponseDTO = PayhereResponseDTO;
let PayhereController = class PayhereController {
    constructor(connection, paymentStateMachine, orderService, eventBus) {
        this.connection = connection;
        this.paymentStateMachine = paymentStateMachine;
        this.orderService = orderService;
        this.eventBus = eventBus;
    }
    async get() {
        return 'Hello World!';
    }
    async settlePayment(ctx) {
        var _a;
        const body = (_a = ctx.req) === null || _a === void 0 ? void 0 : _a.body;
        console.log(body);
        const { merchant_id, order_id, payment_id, custom_1, payhere_amount, payhere_currency, status_code, md5sig, } = body;
        const order = await this.orderService.getOrderOrThrow(ctx, custom_1);
        const localSig = md5_1.default(merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            md5_1.default(secrets_1.PAYHERE_SECRET).toString().toUpperCase())
            .toString()
            .toUpperCase();
        if (!this.orderService.canAddPaymentToOrder(order)) {
            return new generated_graphql_shop_errors_1.OrderPaymentStateError();
        }
        const result = {
            amount: Math.ceil(Number.parseFloat(payhere_amount) * 100),
            state: 'Created',
            transactionId: payment_id,
            metadata: {
                public: {
                    payment_id,
                    currency: payhere_currency,
                },
                status_code,
                merchant_id,
            },
            method: 'card',
        };
        const payment = await this.connection.getRepository(ctx, core_1.Payment).save(new core_1.Payment(result));
        if (localSig === md5sig) {
            if (status_code === '2') {
                result.state = 'Settled';
                await this.paymentStateMachine.transition(ctx, order, payment, result.state);
            }
            else if (status_code === '0') {
                result.state = 'Authorized';
                await this.paymentStateMachine.transition(ctx, order, payment, result.state);
            }
            else if (status_code === '-1') {
                result.state = 'Cancelled';
                await this.paymentStateMachine.transition(ctx, order, payment, result.state);
            }
            else if (status_code === '-2') {
                result.state = 'Declined';
                await this.paymentStateMachine.transition(ctx, order, payment, result.state);
            }
            else {
                result.state = 'Error';
                await this.paymentStateMachine.transition(ctx, order, payment, result.state);
            }
        }
        else {
            result.state = 'Error';
            await this.paymentStateMachine.transition(ctx, order, payment, result.state);
        }
        await this.connection.getRepository(ctx, core_1.Payment).save(payment, { reload: false });
        this.eventBus.publish(new core_1.PaymentStateTransitionEvent('Created', result.state, ctx, payment, order));
        if (core_1.isGraphQlErrorResult(payment)) {
            return payment;
        }
        const existingPayments = await this.orderService.getOrderPayments(ctx, order.id);
        order.payments = [...existingPayments, payment];
        await this.connection.getRepository(ctx, core_1.Order).save(order, { reload: false });
        if (payment.state === 'Error') {
            return new generated_graphql_shop_errors_1.PaymentFailedError(payment.errorMessage || '');
        }
        if (payment.state === 'Declined') {
            return new generated_graphql_shop_errors_1.PaymentDeclinedError(payment.errorMessage || '');
        }
        if (payment.state === 'Cancelled') {
            return new generated_graphql_shop_errors_1.PaymentDeclinedError('Payment Cancelled!' || '');
        }
        await this.orderService.addSurchargeToOrder(ctx, order.id, {
            description: 'Payhere Fee',
            sku: 'payhere-fee',
            listPrice: Math.floor(order.totalWithTax * 0.03),
            listPriceIncludesTax: true,
        });
        return this.orderService.transitionOrderIfTotalIsCovered(ctx, order);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayhereController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, core_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext]),
    __metadata("design:returntype", Promise)
], PayhereController.prototype, "settlePayment", null);
PayhereController = __decorate([
    common_1.Controller('payhere'),
    __metadata("design:paramtypes", [core_1.TransactionalConnection,
        payment_state_machine_1.PaymentStateMachine,
        core_1.OrderService,
        core_1.EventBus])
], PayhereController);
exports.PayhereController = PayhereController;
let RestPlugin = class RestPlugin {
};
RestPlugin = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        controllers: [PayhereController],
    })
], RestPlugin);
exports.RestPlugin = RestPlugin;
//# sourceMappingURL=payhere-listener.controller.js.map