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
exports.OrderLineEntityResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const entity_1 = require("../../../entity");
const service_1 = require("../../../service");
const request_context_1 = require("../../common/request-context");
const relations_decorator_1 = require("../../decorators/relations.decorator");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
let OrderLineEntityResolver = class OrderLineEntityResolver {
    constructor(productVariantService, assetService, orderService, fulfillmentService) {
        this.productVariantService = productVariantService;
        this.assetService = assetService;
        this.orderService = orderService;
        this.fulfillmentService = fulfillmentService;
    }
    async productVariant(ctx, orderLine) {
        if (orderLine.productVariant) {
            return orderLine.productVariant;
        }
        return this.productVariantService.getVariantByOrderLineId(ctx, orderLine.id);
    }
    async featuredAsset(ctx, orderLine) {
        if (orderLine.featuredAsset) {
            return orderLine.featuredAsset;
        }
        else {
            return this.assetService.getFeaturedAsset(ctx, orderLine);
        }
    }
    async order(ctx, orderLine, relations) {
        return this.orderService.findOneByOrderLineId(ctx, orderLine.id, relations);
    }
    async fulfillments(ctx, orderLine, relations) {
        return this.fulfillmentService
            .getFulfillmentsByOrderLineId(ctx, orderLine.id)
            .then(results => results.map(r => r.fulfillment));
    }
};
__decorate([
    graphql_1.ResolveField(),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext,
        entity_1.OrderLine]),
    __metadata("design:returntype", Promise)
], OrderLineEntityResolver.prototype, "productVariant", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext,
        entity_1.OrderLine]),
    __metadata("design:returntype", Promise)
], OrderLineEntityResolver.prototype, "featuredAsset", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Parent()),
    __param(2, relations_decorator_1.Relations(entity_1.Order)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext,
        entity_1.OrderLine, Array]),
    __metadata("design:returntype", Promise)
], OrderLineEntityResolver.prototype, "order", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Parent()),
    __param(2, relations_decorator_1.Relations(entity_1.Order)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext,
        entity_1.OrderLine, Array]),
    __metadata("design:returntype", Promise)
], OrderLineEntityResolver.prototype, "fulfillments", null);
OrderLineEntityResolver = __decorate([
    graphql_1.Resolver('OrderLine'),
    __metadata("design:paramtypes", [service_1.ProductVariantService,
        service_1.AssetService,
        service_1.OrderService,
        service_1.FulfillmentService])
], OrderLineEntityResolver);
exports.OrderLineEntityResolver = OrderLineEntityResolver;
//# sourceMappingURL=order-line-entity.resolver.js.map