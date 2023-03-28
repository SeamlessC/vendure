"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerChannelsPlugin = void 0;
const core_1 = require("@vendure/core");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const customer_channels_resolver_1 = __importDefault(require("./customer-channels.resolver"));
let CustomerChannelsPlugin = class CustomerChannelsPlugin {
};
CustomerChannelsPlugin = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        shopApiExtensions: {
            schema: graphql_tag_1.default `
            extend type Query {
                customerChannels: [Channel!]!
            }
        `,
            resolvers: [customer_channels_resolver_1.default],
        },
    })
], CustomerChannelsPlugin);
exports.CustomerChannelsPlugin = CustomerChannelsPlugin;
//# sourceMappingURL=cutomer-channels.module.js.map