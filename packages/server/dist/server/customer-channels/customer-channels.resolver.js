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
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core");
let CustomerChannelsResolver = class CustomerChannelsResolver {
    constructor(channelService) {
        this.channelService = channelService;
    }
    returnNullShippingZone(ctx, channel) {
        return null;
    }
    async customerChannels(ctx, args) {
        const channels = await this.channelService.findAll(ctx);
        const strippedChannels = channels
            .map((channel) => {
            return Object.assign(Object.assign({}, channel), { defaultShippingZone: null, defaultTaxZone: null, pricesIncludeTax: true });
        })
            .filter(value => value.code !== '__default_channel__' && value.customFields.isShopActive == true);
        return strippedChannels;
    }
};
__decorate([
    graphql_1.ResolveField('defaultShippingZone', () => core_1.Zone, { nullable: true }),
    __param(0, core_1.Ctx()),
    __param(1, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, core_1.Channel]),
    __metadata("design:returntype", void 0)
], CustomerChannelsResolver.prototype, "returnNullShippingZone", null);
__decorate([
    graphql_1.Query(),
    __param(0, core_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerChannelsResolver.prototype, "customerChannels", null);
CustomerChannelsResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [core_1.ChannelService])
], CustomerChannelsResolver);
exports.default = CustomerChannelsResolver;
//# sourceMappingURL=customer-channels.resolver.js.map