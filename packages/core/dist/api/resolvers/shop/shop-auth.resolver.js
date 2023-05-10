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
exports.ShopAuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_shop_types_1 = require("@vendure/common/lib/generated-shop-types");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const error_result_1 = require("../../../common/error/error-result");
const errors_1 = require("../../../common/error/errors");
const native_authentication_strategy_1 = require("../../../config/auth/native-authentication-strategy");
const config_service_1 = require("../../../config/config.service");
const service_1 = require("../../../service");
const administrator_service_1 = require("../../../service/services/administrator.service");
const auth_service_1 = require("../../../service/services/auth.service");
const customer_service_1 = require("../../../service/services/customer.service");
const history_service_1 = require("../../../service/services/history.service");
const user_service_1 = require("../../../service/services/user.service");
const request_context_1 = require("../../common/request-context");
const set_session_token_1 = require("../../common/set-session-token");
const allow_decorator_1 = require("../../decorators/allow.decorator");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const transaction_decorator_1 = require("../../decorators/transaction.decorator");
const base_auth_resolver_1 = require("../base/base-auth.resolver");
let ShopAuthResolver = class ShopAuthResolver extends base_auth_resolver_1.BaseAuthResolver {
    constructor(authService, userService, administratorService, configService, customerGroupService, customerService, historyService, userService2) {
        super(authService, userService, administratorService, configService);
        this.customerGroupService = customerGroupService;
        this.customerService = customerService;
        this.historyService = historyService;
        this.userService2 = userService2;
    }
    async login(args, ctx, req, res) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        return (await super.baseLogin(args, ctx, req, res));
    }
    async authenticate(args, ctx, req, res) {
        return (await this.authenticateAndCreateSession(ctx, args, req, res));
    }
    async logout(ctx, req, res) {
        return super.logout(ctx, req, res);
    }
    me(ctx) {
        return super.me(ctx, 'shop');
    }
    async registerCustomerAccount(ctx, args) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const result = await this.customerService.registerCustomerAccount(ctx, args.input);
        if (error_result_1.isGraphQlErrorResult(result)) {
            return result;
        }
        return { success: true };
    }
    async verifyCustomerAccount(ctx, args, req, res) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const { token, password } = args;
        const customer = await this.customerService.verifyCustomerEmailAddress(ctx, token, args.phoneNumber, password || undefined);
        if (error_result_1.isGraphQlErrorResult(customer)) {
            return customer;
        }
        const session = await this.authService.createAuthenticatedSessionForUser(ctx, 
        // We know that there is a user, since the Customer
        // was found with the .getCustomerByUserId() method.
        // tslint:disable-next-line:no-non-null-assertion
        customer.user, native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME);
        if (error_result_1.isGraphQlErrorResult(session)) {
            // This code path should never be reached - in this block
            // the type of `session` is `NotVerifiedError`, however we
            // just successfully verified the user above. So throw it
            // so that we have some record of the error if it somehow
            // occurs.
            throw session;
        }
        set_session_token_1.setSessionToken({
            req,
            res,
            authOptions: this.configService.authOptions,
            rememberMe: true,
            sessionToken: session.token,
        });
        return this.publiclyAccessibleUser(session.user);
    }
    async refreshCustomerVerification(ctx, args) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const output = await this.customerService.refreshVerificationToken(ctx, args.phoneNumber);
        if (error_result_1.isGraphQlErrorResult(output)) {
            return output;
        }
        return { success: true };
    }
    async requestPasswordReset(ctx, args) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const output = await this.customerService.requestPasswordReset(ctx, args.phoneNumber);
        if (error_result_1.isGraphQlErrorResult(output)) {
            return output;
        }
        return { success: true };
    }
    async resetPassword(ctx, args, req, res) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const { token, password } = args;
        const resetResult = await this.customerService.resetPassword(ctx, args.phoneNumber, token, password);
        if (error_result_1.isGraphQlErrorResult(resetResult)) {
            return resetResult;
        }
        const authResult = await super.authenticateAndCreateSession(ctx, {
            input: {
                [native_authentication_strategy_1.NATIVE_AUTH_STRATEGY_NAME]: {
                    username: resetResult.identifier,
                    password: args.password,
                },
            },
        }, req, res);
        if (error_result_1.isGraphQlErrorResult(authResult) && authResult.__typename === 'NotVerifiedError') {
            return authResult;
        }
        if (error_result_1.isGraphQlErrorResult(authResult)) {
            // This should never occur in theory
            throw authResult;
        }
        return authResult;
    }
    async updateCustomerPassword(ctx, args) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const result = await super.updatePassword(ctx, args.currentPassword, args.newPassword);
        if (error_result_1.isGraphQlErrorResult(result)) {
            return result;
        }
        if (result && ctx.activeUserId) {
            const customer = await this.customerService.findOneByUserId(ctx, ctx.activeUserId);
            if (customer) {
                await this.historyService.createHistoryEntryForCustomer({
                    ctx,
                    customerId: customer.id,
                    type: generated_types_1.HistoryEntryType.CUSTOMER_PASSWORD_UPDATED,
                    data: {},
                });
            }
        }
        return { success: result };
    }
    // @Transaction()
    // @Mutation()
    // @Allow(Permission.Owner)
    // async requestUpdateCustomerEmailAddress(
    //     @Ctx() ctx: RequestContext,
    //     @Args() args: MutationRequestUpdateCustomerEmailAddressArgs,
    // ): Promise<RequestUpdateCustomerEmailAddressResult> {
    //     const nativeAuthStrategyError = this.requireNativeAuthStrategy();
    //     if (nativeAuthStrategyError) {
    //         return nativeAuthStrategyError;
    //     }
    //     if (!ctx.activeUserId) {
    //         throw new ForbiddenError();
    //     }
    //     const verify = await this.authService.verifyUserPassword(ctx, ctx.activeUserId, args.password);
    //     if (isGraphQlErrorResult(verify)) {
    //         return verify as InvalidCredentialsError;
    //     }
    //     const result = await this.customerService.requestUpdateEmailAddress(
    //         ctx,
    //         ctx.activeUserId,
    //         args.newEmailAddress,
    //     );
    //     if (isGraphQlErrorResult(result)) {
    //         return result;
    //     }
    //     return {
    //         success: result,
    //     };
    // }
    // @Transaction()
    // @Mutation()
    // @Allow(Permission.Owner)
    // async updateCustomerEmailAddress(
    //     @Ctx() ctx: RequestContext,
    //     @Args() args: MutationUpdateCustomerEmailAddressArgs,
    // ): Promise<UpdateCustomerEmailAddressResult> {
    //     const nativeAuthStrategyError = this.requireNativeAuthStrategy();
    //     if (nativeAuthStrategyError) {
    //         return nativeAuthStrategyError;
    //     }
    //     const result = await this.customerService.updateEmailAddress(ctx, args.token);
    //     if (isGraphQlErrorResult(result)) {
    //         return result;
    //     }
    //     return { success: result };
    // }
    requireNativeAuthStrategy() {
        return super.requireNativeAuthStrategy();
    }
    async deleteCustomerFromShop(ctx, args, req, res) {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const authResult = (await super.baseLogin({ password: args.password, username: args.phoneNumber, rememberMe: false }, ctx, req, res));
        if (error_result_1.isGraphQlErrorResult(authResult)) {
            return authResult;
        }
        const customer = await this.getCustomerForOwner(ctx);
        const groups = await this.customerService.getCustomerGroups(ctx, customer.id);
        for (const group of groups) {
            await this.customerGroupService.removeCustomersFromGroup(ctx, {
                customerGroupId: group.id,
                customerIds: [customer.id],
            });
        }
        const customerResponse = await this.customerService.softDelete(ctx, customer.id);
        const logout = await super.logout(ctx, req, res);
        return customerResponse;
    }
    async getCustomerForOwner(ctx) {
        const userId = ctx.activeUserId;
        if (!userId) {
            throw new errors_1.ForbiddenError();
        }
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        if (!customer) {
            throw new errors_1.InternalServerError(`error.no-customer-found-for-current-user`);
        }
        return customer;
    }
};
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, graphql_1.Args()),
    __param(1, request_context_decorator_1.Ctx()),
    __param(2, graphql_1.Context('req')),
    __param(3, graphql_1.Context('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_context_1.RequestContext, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "login", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, graphql_1.Args()),
    __param(1, request_context_decorator_1.Ctx()),
    __param(2, graphql_1.Context('req')),
    __param(3, graphql_1.Context('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_context_1.RequestContext, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "authenticate", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Context('req')),
    __param(2, graphql_1.Context('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "logout", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Authenticated),
    __param(0, request_context_decorator_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext]),
    __metadata("design:returntype", void 0)
], ShopAuthResolver.prototype, "me", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "registerCustomerAccount", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('req')),
    __param(3, graphql_1.Context('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "verifyCustomerAccount", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "refreshCustomerVerification", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "requestPasswordReset", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Public),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('req')),
    __param(3, graphql_1.Context('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "resetPassword", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Owner),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "updateCustomerPassword", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_shop_types_1.Permission.Owner),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __param(2, graphql_1.Context('req')),
    __param(3, graphql_1.Context('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopAuthResolver.prototype, "deleteCustomerFromShop", null);
ShopAuthResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        administrator_service_1.AdministratorService,
        config_service_1.ConfigService,
        service_1.CustomerGroupService,
        customer_service_1.CustomerService,
        history_service_1.HistoryService,
        user_service_1.UserService])
], ShopAuthResolver);
exports.ShopAuthResolver = ShopAuthResolver;
//# sourceMappingURL=shop-auth.resolver.js.map