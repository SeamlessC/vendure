import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    AuthenticationResult,
    DeleteCustomerAccountResult,
    ErrorCode,
    InvalidCredentialsError,
    MissingPasswordError,
    MutationAuthenticateArgs,
    MutationDeleteCustomerFromShopArgs,
    MutationLoginArgs,
    MutationRefreshCustomerVerificationArgs,
    MutationRegisterCustomerAccountArgs,
    MutationRequestPasswordResetArgs,
    // MutationRequestUpdateCustomerEmailAddressArgs,
    MutationResetPasswordArgs,
    // MutationUpdateCustomerEmailAddressArgs,
    MutationUpdateCustomerPasswordArgs,
    MutationVerifyCustomerAccountArgs,
    NativeAuthenticationResult,
    Permission,
    RefreshCustomerVerificationResult,
    RegisterCustomerAccountResult,
    RequestPasswordResetResult,
    RequestUpdateCustomerEmailAddressResult,
    ResetPasswordResult,
    Success,
    UpdateCustomerEmailAddressResult,
    UpdateCustomerPasswordResult,
    VerifyCustomerAccountResult,
} from '@vendure/common/lib/generated-shop-types';
import { DeletionResult, HistoryEntryType } from '@vendure/common/lib/generated-types';
import { Request, Response } from 'express';

import { isGraphQlErrorResult } from '../../../common/error/error-result';
import { ForbiddenError, InternalServerError } from '../../../common/error/errors';
import { NativeAuthStrategyError } from '../../../common/error/generated-graphql-shop-errors';
import { NATIVE_AUTH_STRATEGY_NAME } from '../../../config/auth/native-authentication-strategy';
import { ConfigService } from '../../../config/config.service';
import { Customer } from '../../../entity';
import { CustomerGroupService } from '../../../service';
import { AdministratorService } from '../../../service/services/administrator.service';
import { AuthService } from '../../../service/services/auth.service';
import { CustomerService } from '../../../service/services/customer.service';
import { HistoryService } from '../../../service/services/history.service';
import { UserService } from '../../../service/services/user.service';
import { RequestContext } from '../../common/request-context';
import { setSessionToken } from '../../common/set-session-token';
import { Allow } from '../../decorators/allow.decorator';
import { Ctx } from '../../decorators/request-context.decorator';
import { Transaction } from '../../decorators/transaction.decorator';
import { BaseAuthResolver } from '../base/base-auth.resolver';

@Resolver()
export class ShopAuthResolver extends BaseAuthResolver {
    constructor(
        authService: AuthService,
        userService: UserService,
        administratorService: AdministratorService,
        configService: ConfigService,
        private customerGroupService: CustomerGroupService,
        protected customerService: CustomerService,
        protected historyService: HistoryService,
        private userService2: UserService,
    ) {
        super(authService, userService, administratorService, configService);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async login(
        @Args() args: MutationLoginArgs,
        @Ctx() ctx: RequestContext,
        @Context('req') req: Request,
        @Context('res') res: Response,
    ): Promise<NativeAuthenticationResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        return (await super.baseLogin(args, ctx, req, res)) as AuthenticationResult;
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async authenticate(
        @Args() args: MutationAuthenticateArgs,
        @Ctx() ctx: RequestContext,
        @Context('req') req: Request,
        @Context('res') res: Response,
    ): Promise<AuthenticationResult> {
        return (await this.authenticateAndCreateSession(ctx, args, req, res)) as AuthenticationResult;
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async logout(
        @Ctx() ctx: RequestContext,
        @Context('req') req: Request,
        @Context('res') res: Response,
    ): Promise<Success> {
        return super.logout(ctx, req, res);
    }

    @Query()
    @Allow(Permission.Authenticated)
    me(@Ctx() ctx: RequestContext) {
        return super.me(ctx, 'shop');
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async registerCustomerAccount(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationRegisterCustomerAccountArgs,
    ): Promise<RegisterCustomerAccountResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const result = await this.customerService.registerCustomerAccount(ctx, args.input);
        if (isGraphQlErrorResult(result)) {
            return result;
        }
        return { success: true };
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async verifyCustomerAccount(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationVerifyCustomerAccountArgs,
        @Context('req') req: Request,
        @Context('res') res: Response,
    ): Promise<VerifyCustomerAccountResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const { token, password } = args;
        const customer = await this.customerService.verifyCustomerEmailAddress(
            ctx,
            token,
            args.phoneNumber,
            password || undefined,
        );
        if (isGraphQlErrorResult(customer)) {
            return customer;
        }
        const session = await this.authService.createAuthenticatedSessionForUser(
            ctx,
            // We know that there is a user, since the Customer
            // was found with the .getCustomerByUserId() method.
            // tslint:disable-next-line:no-non-null-assertion
            customer.user!,
            NATIVE_AUTH_STRATEGY_NAME,
        );
        if (isGraphQlErrorResult(session)) {
            // This code path should never be reached - in this block
            // the type of `session` is `NotVerifiedError`, however we
            // just successfully verified the user above. So throw it
            // so that we have some record of the error if it somehow
            // occurs.
            throw session;
        }
        setSessionToken({
            req,
            res,
            authOptions: this.configService.authOptions,
            rememberMe: true,
            sessionToken: session.token,
        });
        return this.publiclyAccessibleUser(session.user);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async refreshCustomerVerification(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationRefreshCustomerVerificationArgs,
    ): Promise<RefreshCustomerVerificationResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const output = await this.customerService.refreshVerificationToken(ctx, args.phoneNumber);
        if (isGraphQlErrorResult(output)) {
            return output;
        }
        return { success: true };
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async requestPasswordReset(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationRequestPasswordResetArgs,
    ): Promise<RequestPasswordResetResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const output = await this.customerService.requestPasswordReset(ctx, args.phoneNumber);
        if (isGraphQlErrorResult(output)) {
            return output;
        }
        return { success: true };
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async resetPassword(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationResetPasswordArgs,
        @Context('req') req: Request,
        @Context('res') res: Response,
    ): Promise<ResetPasswordResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const { token, password } = args;
        const resetResult = await this.customerService.resetPassword(ctx, args.phoneNumber, token, password);
        if (isGraphQlErrorResult(resetResult)) {
            return resetResult;
        }

        const authResult = await super.authenticateAndCreateSession(
            ctx,
            {
                input: {
                    [NATIVE_AUTH_STRATEGY_NAME]: {
                        username: resetResult.identifier,
                        password: args.password,
                    },
                },
            },
            req,
            res,
        );
        if (isGraphQlErrorResult(authResult) && authResult.__typename === 'NotVerifiedError') {
            return authResult;
        }
        if (isGraphQlErrorResult(authResult)) {
            // This should never occur in theory
            throw authResult;
        }
        return authResult;
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Owner)
    async updateCustomerPassword(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateCustomerPasswordArgs,
    ): Promise<UpdateCustomerPasswordResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const result = await super.updatePassword(ctx, args.currentPassword, args.newPassword);
        if (isGraphQlErrorResult(result)) {
            return result;
        }
        if (result && ctx.activeUserId) {
            const customer = await this.customerService.findOneByUserId(ctx, ctx.activeUserId);
            if (customer) {
                await this.historyService.createHistoryEntryForCustomer({
                    ctx,
                    customerId: customer.id,
                    type: HistoryEntryType.CUSTOMER_PASSWORD_UPDATED,
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

    protected requireNativeAuthStrategy() {
        return super.requireNativeAuthStrategy() as NativeAuthStrategyError | undefined;
    }
    @Transaction()
    @Mutation()
    @Allow(Permission.Owner)
    async deleteCustomerFromShop(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationDeleteCustomerFromShopArgs,
        @Context('req') req: Request,
        @Context('res') res: Response,
    ): Promise<DeleteCustomerAccountResult> {
        const nativeAuthStrategyError = this.requireNativeAuthStrategy();
        if (nativeAuthStrategyError) {
            return nativeAuthStrategyError;
        }
        const authResult = (await super.baseLogin(
            { password: args.password, username: args.phoneNumber, rememberMe: false },
            ctx,
            req,
            res,
        )) as AuthenticationResult;
        if (isGraphQlErrorResult(authResult)) {
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

    private async getCustomerForOwner(ctx: RequestContext): Promise<Customer> {
        const userId = ctx.activeUserId;
        if (!userId) {
            throw new ForbiddenError();
        }
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        if (!customer) {
            throw new InternalServerError(`error.no-customer-found-for-current-user`);
        }
        return customer;
    }
}
