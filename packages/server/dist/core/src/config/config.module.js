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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const shared_utils_1 = require("@vendure/common/lib/shared-utils");
const injector_1 = require("../common/injector");
const config_helpers_1 = require("./config-helpers");
const config_service_1 = require("./config.service");
let ConfigModule = class ConfigModule {
    constructor(configService, moduleRef) {
        this.configService = configService;
        this.moduleRef = moduleRef;
    }
    async onApplicationBootstrap() {
        await this.initInjectableStrategies();
        await this.initConfigurableOperations();
    }
    async onApplicationShutdown(signal) {
        await this.destroyInjectableStrategies();
        await this.destroyConfigurableOperations();
        /**
         * When the application shuts down, we reset the activeConfig to the default. Usually this is
         * redundant, as the app shutdown would normally coincide with the process ending. However, in some
         * circumstances, such as when running migrations immediately followed by app bootstrap, the activeConfig
         * will persist between these two applications and mutations e.g. to the CustomFields will result in
         * hard-to-debug errors. So resetting is a precaution against this scenario.
         */
        config_helpers_1.resetConfig();
    }
    async initInjectableStrategies() {
        const injector = new injector_1.Injector(this.moduleRef);
        for (const strategy of this.getInjectableStrategies()) {
            if (typeof strategy.init === 'function') {
                await strategy.init(injector);
            }
        }
    }
    async destroyInjectableStrategies() {
        for (const strategy of this.getInjectableStrategies()) {
            if (typeof strategy.destroy === 'function') {
                await strategy.destroy();
            }
        }
    }
    async initConfigurableOperations() {
        const injector = new injector_1.Injector(this.moduleRef);
        for (const operation of this.getConfigurableOperations()) {
            await operation.init(injector);
        }
    }
    async destroyConfigurableOperations() {
        for (const operation of this.getConfigurableOperations()) {
            await operation.destroy();
        }
    }
    getInjectableStrategies() {
        const { assetNamingStrategy, assetPreviewStrategy, assetStorageStrategy } = this.configService.assetOptions;
        const { productVariantPriceCalculationStrategy, stockDisplayStrategy } = this.configService.catalogOptions;
        const { adminAuthenticationStrategy, shopAuthenticationStrategy, sessionCacheStrategy, passwordHashingStrategy, passwordValidationStrategy, } = this.configService.authOptions;
        const { taxZoneStrategy } = this.configService.taxOptions;
        const { jobQueueStrategy, jobBufferStorageStrategy } = this.configService.jobQueueOptions;
        const { mergeStrategy, checkoutMergeStrategy, orderItemPriceCalculationStrategy, process, orderCodeStrategy, orderByCodeAccessStrategy, stockAllocationStrategy, } = this.configService.orderOptions;
        const { customFulfillmentProcess } = this.configService.shippingOptions;
        const { customPaymentProcess } = this.configService.paymentOptions;
        const { entityIdStrategy: entityIdStrategyDeprecated } = this.configService;
        const { entityIdStrategy } = this.configService.entityOptions;
        const { healthChecks } = this.configService.systemOptions;
        const { assetImportStrategy } = this.configService.importExportOptions;
        return [
            ...adminAuthenticationStrategy,
            ...shopAuthenticationStrategy,
            sessionCacheStrategy,
            passwordHashingStrategy,
            passwordValidationStrategy,
            assetNamingStrategy,
            assetPreviewStrategy,
            assetStorageStrategy,
            taxZoneStrategy,
            jobQueueStrategy,
            jobBufferStorageStrategy,
            mergeStrategy,
            checkoutMergeStrategy,
            orderCodeStrategy,
            orderByCodeAccessStrategy,
            entityIdStrategyDeprecated,
            ...[entityIdStrategy].filter(shared_utils_1.notNullOrUndefined),
            productVariantPriceCalculationStrategy,
            orderItemPriceCalculationStrategy,
            ...process,
            ...customFulfillmentProcess,
            ...customPaymentProcess,
            stockAllocationStrategy,
            stockDisplayStrategy,
            ...healthChecks,
            assetImportStrategy,
        ];
    }
    getConfigurableOperations() {
        const { paymentMethodHandlers, paymentMethodEligibilityCheckers } = this.configService.paymentOptions;
        const { collectionFilters } = this.configService.catalogOptions;
        const { promotionActions, promotionConditions } = this.configService.promotionOptions;
        const { shippingCalculators, shippingEligibilityCheckers, fulfillmentHandlers } = this.configService.shippingOptions;
        return [
            ...(paymentMethodEligibilityCheckers || []),
            ...paymentMethodHandlers,
            ...collectionFilters,
            ...(promotionActions || []),
            ...(promotionConditions || []),
            ...(shippingCalculators || []),
            ...(shippingEligibilityCheckers || []),
            ...(fulfillmentHandlers || []),
        ];
    }
};
ConfigModule = __decorate([
    common_1.Module({
        providers: [config_service_1.ConfigService],
        exports: [config_service_1.ConfigService],
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, core_1.ModuleRef])
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map