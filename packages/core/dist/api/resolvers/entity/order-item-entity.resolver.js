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
exports.OrderItemEntityResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const index_1 = require("../../../cache/index");
const entity_1 = require("../../../entity");
const service_1 = require("../../../service");
const request_context_1 = require("../../common/request-context");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
let OrderItemEntityResolver = class OrderItemEntityResolver {
    constructor(fulfillmentService, requestContextCache) {
        this.fulfillmentService = fulfillmentService;
        this.requestContextCache = requestContextCache;
    }
    async fulfillment(ctx, orderItem) {
        var _a;
        if (orderItem.fulfillment) {
            return orderItem.fulfillment;
        }
        const lineFulfillments = await this.requestContextCache.get(ctx, `OrderItemEntityResolver.fulfillment(${orderItem.lineId})`, () => this.fulfillmentService.getFulfillmentsByOrderLineId(ctx, orderItem.lineId));
        const otherResult = (_a = lineFulfillments.find(({ orderItemIds }) => orderItemIds.has(orderItem.id))) === null || _a === void 0 ? void 0 : _a.fulfillment;
        return otherResult;
    }
};
__decorate([
    graphql_1.ResolveField(),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext,
        entity_1.OrderItem]),
    __metadata("design:returntype", Promise)
], OrderItemEntityResolver.prototype, "fulfillment", null);
OrderItemEntityResolver = __decorate([
    graphql_1.Resolver('OrderItem'),
    __metadata("design:paramtypes", [service_1.FulfillmentService,
        index_1.RequestContextCacheService])
], OrderItemEntityResolver);
exports.OrderItemEntityResolver = OrderItemEntityResolver;
//# sourceMappingURL=order-item-entity.resolver.js.map