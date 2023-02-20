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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MollieResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core");
const mollie_service_1 = require("./mollie.service");
let MollieResolver = class MollieResolver {
    constructor(mollieService) {
        this.mollieService = mollieService;
    }
    async createMolliePaymentIntent(ctx, input) {
        return this.mollieService.createPaymentIntent(ctx, input);
    }
    __resolveType(value) {
        if (value.errorCode) {
            return 'MolliePaymentIntentError';
        }
        else {
            return 'MolliePaymentIntent';
        }
    }
    async molliePaymentMethods(ctx, { paymentMethodCode }) {
        return this.mollieService.getEnabledPaymentMethods(ctx, paymentMethodCode);
    }
};
__decorate([
    graphql_1.Mutation(),
    core_1.Allow(core_1.Permission.Owner),
    __param(0, core_1.Ctx()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.RequestContext !== "undefined" && core_1.RequestContext) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], MollieResolver.prototype, "createMolliePaymentIntent", null);
__decorate([
    graphql_1.ResolveField(),
    graphql_1.Resolver('MolliePaymentIntentResult'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MollieResolver.prototype, "__resolveType", null);
__decorate([
    graphql_1.Query(),
    core_1.Allow(core_1.Permission.Public),
    __param(0, core_1.Ctx()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof core_1.RequestContext !== "undefined" && core_1.RequestContext) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], MollieResolver.prototype, "molliePaymentMethods", null);
MollieResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [mollie_service_1.MollieService])
], MollieResolver);
exports.MollieResolver = MollieResolver;
//# sourceMappingURL=mollie.resolver.js.map