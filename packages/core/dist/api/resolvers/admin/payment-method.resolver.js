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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const payment_method_entity_1 = require("../../../entity/payment-method/payment-method.entity");
const payment_method_service_1 = require("../../../service/services/payment-method.service");
const request_context_1 = require("../../common/request-context");
const allow_decorator_1 = require("../../decorators/allow.decorator");
const relations_decorator_1 = require("../../decorators/relations.decorator");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const transaction_decorator_1 = require("../../decorators/transaction.decorator");
let PaymentMethodResolver = class PaymentMethodResolver {
    constructor(paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }
    paymentMethods(ctx, args, relations) {
        return this.paymentMethodService.findAll(ctx, args.options || undefined, relations);
    }
    paymentMethod(ctx, args, relations) {
        return this.paymentMethodService.findOne(ctx, args.id, relations);
    }
    createPaymentMethod(ctx, args) {
        return this.paymentMethodService.create(ctx, args.input);
    }
    updatePaymentMethod(ctx, args) {
        return this.paymentMethodService.update(ctx, args.input);
    }
    deletePaymentMethod(ctx, args) {
        return this.paymentMethodService.delete(ctx, args.id, args.force);
    }
    paymentMethodHandlers(ctx) {
        return this.paymentMethodService.getPaymentMethodHandlers(ctx);
    }
    paymentMethodEligibilityCheckers(ctx) {
        return this.paymentMethodService.getPaymentMethodEligibilityCheckers(ctx);
    }
};
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadSettings, generated_types_1.Permission.ReadPaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __param(2, relations_decorator_1.Relations(payment_method_entity_1.PaymentMethod)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object, Array]),
    __metadata("design:returntype", Promise)
], PaymentMethodResolver.prototype, "paymentMethods", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadSettings, generated_types_1.Permission.ReadPaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __param(2, relations_decorator_1.Relations(payment_method_entity_1.PaymentMethod)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object, Array]),
    __metadata("design:returntype", Promise)
], PaymentMethodResolver.prototype, "paymentMethod", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.CreateSettings, generated_types_1.Permission.CreatePaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodResolver.prototype, "createPaymentMethod", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateSettings, generated_types_1.Permission.UpdatePaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodResolver.prototype, "updatePaymentMethod", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.DeleteSettings, generated_types_1.Permission.DeletePaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodResolver.prototype, "deletePaymentMethod", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadSettings, generated_types_1.Permission.ReadPaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext]),
    __metadata("design:returntype", Array)
], PaymentMethodResolver.prototype, "paymentMethodHandlers", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadSettings, generated_types_1.Permission.ReadPaymentMethod),
    __param(0, request_context_decorator_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext]),
    __metadata("design:returntype", Array)
], PaymentMethodResolver.prototype, "paymentMethodEligibilityCheckers", null);
PaymentMethodResolver = __decorate([
    graphql_1.Resolver('PaymentMethod'),
    __metadata("design:paramtypes", [payment_method_service_1.PaymentMethodService])
], PaymentMethodResolver);
exports.PaymentMethodResolver = PaymentMethodResolver;
//# sourceMappingURL=payment-method.resolver.js.map