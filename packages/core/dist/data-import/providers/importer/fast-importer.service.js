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
exports.FastImporterService = void 0;
const common_1 = require("@nestjs/common");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const unique_1 = require("@vendure/common/lib/unique");
const request_context_1 = require("../../../api/common/request-context");
const transactional_connection_1 = require("../../../connection/transactional-connection");
const entity_1 = require("../../../entity");
const product_option_group_translation_entity_1 = require("../../../entity/product-option-group/product-option-group-translation.entity");
const product_option_group_entity_1 = require("../../../entity/product-option-group/product-option-group.entity");
const product_option_translation_entity_1 = require("../../../entity/product-option/product-option-translation.entity");
const product_option_entity_1 = require("../../../entity/product-option/product-option.entity");
const product_variant_asset_entity_1 = require("../../../entity/product-variant/product-variant-asset.entity");
const product_variant_price_entity_1 = require("../../../entity/product-variant/product-variant-price.entity");
const product_variant_translation_entity_1 = require("../../../entity/product-variant/product-variant-translation.entity");
const product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
const product_asset_entity_1 = require("../../../entity/product/product-asset.entity");
const product_translation_entity_1 = require("../../../entity/product/product-translation.entity");
const product_entity_1 = require("../../../entity/product/product.entity");
const translatable_saver_1 = require("../../../service/helpers/translatable-saver/translatable-saver");
const index_1 = require("../../../service/index");
const channel_service_1 = require("../../../service/services/channel.service");
const stock_movement_service_1 = require("../../../service/services/stock-movement.service");
function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
/**
 * @description
 * A service to import entities into the database. This replaces the regular `create` methods of the service layer with faster
 * versions which skip much of the defensive checks and other DB calls which are not needed when running an import. It also
 * does not publish any events, so e.g. will not trigger search index jobs.
 *
 * In testing, the use of the FastImporterService approximately doubled the speed of bulk imports.
 *
 * @docsCategory import-export
 */
const roles = [
    {
        code: 'administrator',
        description: 'Administrator',
        permissions: [
            generated_types_1.Permission.CreateCatalog,
            generated_types_1.Permission.ReadCatalog,
            generated_types_1.Permission.UpdateCatalog,
            generated_types_1.Permission.DeleteCatalog,
            generated_types_1.Permission.CreateSettings,
            generated_types_1.Permission.ReadSettings,
            generated_types_1.Permission.UpdateSettings,
            generated_types_1.Permission.DeleteSettings,
            generated_types_1.Permission.CreateCustomer,
            generated_types_1.Permission.ReadCustomer,
            generated_types_1.Permission.UpdateCustomer,
            generated_types_1.Permission.DeleteCustomer,
            generated_types_1.Permission.CreateCustomerGroup,
            generated_types_1.Permission.ReadCustomerGroup,
            generated_types_1.Permission.UpdateCustomerGroup,
            generated_types_1.Permission.DeleteCustomerGroup,
            generated_types_1.Permission.CreateOrder,
            generated_types_1.Permission.ReadOrder,
            generated_types_1.Permission.UpdateOrder,
            generated_types_1.Permission.DeleteOrder,
            generated_types_1.Permission.CreateSystem,
            generated_types_1.Permission.ReadSystem,
            generated_types_1.Permission.UpdateSystem,
            generated_types_1.Permission.DeleteSystem,
        ],
    },
    {
        code: 'order-manager',
        description: 'Order manager',
        permissions: [
            generated_types_1.Permission.CreateOrder,
            generated_types_1.Permission.ReadOrder,
            generated_types_1.Permission.UpdateOrder,
            generated_types_1.Permission.DeleteOrder,
            generated_types_1.Permission.ReadCustomer,
            generated_types_1.Permission.ReadPaymentMethod,
            generated_types_1.Permission.ReadShippingMethod,
            generated_types_1.Permission.ReadPromotion,
            generated_types_1.Permission.ReadCountry,
            generated_types_1.Permission.ReadZone,
        ],
    },
    {
        code: 'inventory-manager',
        description: 'Inventory manager',
        permissions: [
            generated_types_1.Permission.CreateCatalog,
            generated_types_1.Permission.ReadCatalog,
            generated_types_1.Permission.UpdateCatalog,
            generated_types_1.Permission.DeleteCatalog,
            generated_types_1.Permission.CreateTag,
            generated_types_1.Permission.ReadTag,
            generated_types_1.Permission.UpdateTag,
            generated_types_1.Permission.DeleteTag,
            generated_types_1.Permission.ReadCustomer,
        ],
    },
];
let FastImporterService = class FastImporterService {
    /** @internal */
    constructor(connection, channelService, stockMovementService, translatableSaver, requestContextService, productVariantService, roleService, assetService) {
        this.connection = connection;
        this.channelService = channelService;
        this.stockMovementService = stockMovementService;
        this.translatableSaver = translatableSaver;
        this.requestContextService = requestContextService;
        this.productVariantService = productVariantService;
        this.roleService = roleService;
        this.assetService = assetService;
    }
    /**
     * @description
     * This should be called prior to any of the import methods, as it establishes the
     * default Channel as well as the context in which the new entities will be created.
     *
     * Passing a `channel` argument means that Products and ProductVariants will be assigned
     * to that Channel.
     */
    async initialize(channel) {
        // await this.channelService.initChannels();
        this.importCtx = channel
            ? await this.requestContextService.create({
                apiType: 'admin',
                channelOrToken: channel,
            })
            : request_context_1.RequestContext.empty();
        // const channelList = ['mount-lavinia', 'maharagama', 'bambalapitiya', 'kollupitiya', 'one-galle-face'];
        // const fullChannelList = await Promise.all(
        //     channelList.map(async code => {
        //         const result = await this.channelService.create(this.importCtx, {
        //             code: code,
        //             currencyCode: CurrencyCode.LKR,
        //             defaultLanguageCode: LanguageCode.en,
        //             defaultShippingZoneId: 1,
        //             pricesIncludeTax: true,
        //             token: makeid(20),
        //             defaultTaxZoneId: 1,
        //         });
        //         if (isGraphQlErrorResult(result)) {
        //             return result;
        //         }
        //         const superAdminRole = await this.roleService.getSuperAdminRole(this.importCtx);
        //         const customerRole = await this.roleService.getCustomerRole(this.importCtx);
        //         await this.roleService.assignRoleToChannel(this.importCtx, superAdminRole.id, result.id);
        //         await this.roleService.assignRoleToChannel(this.importCtx, customerRole.id, result.id);
        //         return result;
        //     }),
        // );
        this.defaultChannel = await this.channelService.getDefaultChannel(this.importCtx);
        // const outputChannelList = fullChannelList
        //     .map(value => {
        //         if (isGraphQlErrorResult(value)) {
        //             throw new Error('Error in creating channels');
        //         }
        //         return value;
        //     })
        //     .concat(this.defaultChannel);
        const outputChannelList = await this.channelService.findAll(this.importCtx);
        await Promise.all(outputChannelList.map(async (channelValue) => {
            await Promise.all(roles.map(async (role) => {
                const result = await this.createRoles(this.importCtx, Object.assign(Object.assign({}, role), { code: role.code + '-' + channelValue.code, description: role.description + ' - ' + channelValue.code }), [channelValue]);
            }));
        }));
    }
    async createProduct(input) {
        this.ensureInitialized();
        const product = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: product_entity_1.Product,
            translationType: product_translation_entity_1.ProductTranslation,
            beforeSave: async (p) => {
                p.channels = unique_1.unique([this.defaultChannel, this.importCtx.channel], 'id');
                if (input.facetValueIds) {
                    p.facetValues = input.facetValueIds.map(id => ({ id }));
                }
                if (input.featuredAssetId) {
                    p.featuredAsset = { id: input.featuredAssetId };
                }
            },
        });
        if (input.assetIds) {
            const productAssets = input.assetIds.map((id, i) => new product_asset_entity_1.ProductAsset({
                assetId: id,
                productId: product.id,
                position: i,
            }));
            await this.connection
                .getRepository(this.importCtx, product_asset_entity_1.ProductAsset)
                .save(productAssets, { reload: false });
        }
        return product.id;
    }
    async createProductOptionGroup(input) {
        this.ensureInitialized();
        const group = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: product_option_group_entity_1.ProductOptionGroup,
            translationType: product_option_group_translation_entity_1.ProductOptionGroupTranslation,
        });
        return group.id;
    }
    async createProductOption(input) {
        this.ensureInitialized();
        const option = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: product_option_entity_1.ProductOption,
            translationType: product_option_translation_entity_1.ProductOptionTranslation,
            beforeSave: po => (po.group = { id: input.productOptionGroupId }),
        });
        return option.id;
    }
    createRoleForChannels(ctx, input, channels) {
        const role = new entity_1.Role({
            code: input.code,
            description: input.description,
            permissions: unique_1.unique([generated_types_1.Permission.Authenticated, ...input.permissions]),
        });
        role.channels = channels;
        return this.connection.getRepository(ctx, entity_1.Role).save(role);
    }
    async createRoles(ctx, input, channels) {
        let targetChannels = channels;
        const role = await this.createRoleForChannels(ctx, input, targetChannels);
        return role;
    }
    async addOptionGroupToProduct(productId, optionGroupId) {
        this.ensureInitialized();
        await this.connection
            .getRepository(this.importCtx, product_entity_1.Product)
            .createQueryBuilder()
            .relation('optionGroups')
            .of(productId)
            .add(optionGroupId);
    }
    async assignAssetToChannel(ctx, input) {
        const assets = await this.connection.findByIdsInChannel(ctx, entity_1.Asset, input.assetIds, ctx.channelId, {});
        await Promise.all(assets.map(async (asset) => {
            await this.channelService.assignToChannels(ctx, entity_1.Asset, asset.id, [input.channelId]);
        }));
        return this.connection.findByIdsInChannel(ctx, entity_1.Asset, assets.map(a => a.id), ctx.channelId, {});
    }
    async assignProductVariantToChannels(ctx, input) {
        var _a;
        const variants = await this.connection
            .getRepository(ctx, product_variant_entity_1.ProductVariant)
            .findByIds(input.productVariantIds, { relations: ['taxCategory', 'assets'] });
        const priceFactor = input.priceFactor != null ? input.priceFactor : 1;
        for (const variant of variants) {
            if (variant.deletedAt) {
                continue;
            }
            await this.productVariantService.applyChannelPriceAndTax(variant, ctx);
            await this.channelService.assignToChannels(ctx, product_entity_1.Product, variant.productId, [input.channelId]);
            await this.channelService.assignToChannels(ctx, product_variant_entity_1.ProductVariant, variant.id, [input.channelId]);
            const targetChannel = await this.channelService.findOne(ctx, input.channelId);
            const price = (targetChannel === null || targetChannel === void 0 ? void 0 : targetChannel.pricesIncludeTax) ? variant.priceWithTax : variant.price;
            await this.productVariantService.createOrUpdateProductVariantPrice(ctx, variant.id, Math.round(price * priceFactor), input.channelId);
            const assetIds = ((_a = variant.assets) === null || _a === void 0 ? void 0 : _a.map(a => a.assetId)) || [];
            await this.assignAssetToChannel(ctx, { channelId: input.channelId, assetIds });
        }
        const result = await this.productVariantService.findByIds(ctx, variants.map(v => v.id));
        // for (const variant of variants) {
        //     this.eventBus.publish(new ProductVariantChannelEvent(ctx, variant, input.channelId, 'assigned'));
        // }
        return result;
    }
    async createProductVariant(input, channelList, optionsMap) {
        this.ensureInitialized();
        if (!input.optionIds) {
            input.optionIds = [];
        }
        if (input.price == null) {
            input.price = 0;
        }
        const channelCode = optionsMap.filter(option => option.id === input.optionIds[0]);
        const inputChannelId = channelList.filter(channel => channel.code === channelCode[0].code).pop();
        const inputWithoutPrice = Object.assign({}, input);
        delete inputWithoutPrice.price;
        const createdVariant = await this.translatableSaver.create({
            ctx: this.importCtx,
            input: inputWithoutPrice,
            entityType: product_variant_entity_1.ProductVariant,
            translationType: product_variant_translation_entity_1.ProductVariantTranslation,
            beforeSave: async (variant) => {
                variant.channels = unique_1.unique([this.defaultChannel, this.importCtx.channel], 'id');
                const { optionIds } = input;
                if (optionIds && optionIds.length) {
                    variant.options = optionIds.map(id => ({ id }));
                }
                if (input.facetValueIds) {
                    variant.facetValues = input.facetValueIds.map(id => ({ id }));
                }
                variant.product = { id: input.productId };
                variant.taxCategory = { id: input.taxCategoryId };
                if (input.featuredAssetId) {
                    variant.featuredAsset = { id: input.featuredAssetId };
                }
            },
        });
        if (input.assetIds) {
            const variantAssets = input.assetIds.map((id, i) => new product_variant_asset_entity_1.ProductVariantAsset({
                assetId: id,
                productVariantId: createdVariant.id,
                position: i,
            }));
            await this.connection
                .getRepository(this.importCtx, product_variant_asset_entity_1.ProductVariantAsset)
                .save(variantAssets, { reload: false });
        }
        if (input.stockOnHand != null && input.stockOnHand !== 0) {
            await this.stockMovementService.adjustProductVariantStock(this.importCtx, createdVariant.id, 0, input.stockOnHand);
        }
        const assignedChannelIds = unique_1.unique([this.defaultChannel, this.importCtx.channel], 'id').map(c => c.id);
        for (const channelId of assignedChannelIds) {
            const variantPrice = new product_variant_price_entity_1.ProductVariantPrice({
                price: input.price,
                channelId,
            });
            variantPrice.variant = createdVariant;
            await this.connection
                .getRepository(this.importCtx, product_variant_price_entity_1.ProductVariantPrice)
                .save(variantPrice, { reload: false });
        }
        const output = await this.assignProductVariantToChannels(this.importCtx, {
            channelId: inputChannelId.id,
            productVariantIds: [createdVariant.id],
            priceFactor: 1,
        });
        // console.log(output);
        return createdVariant.id;
    }
    ensureInitialized() {
        if (!this.defaultChannel || !this.importCtx) {
            throw new Error(`The FastImporterService must be initialized with a call to 'initialize()' before importing data`);
        }
    }
};
FastImporterService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [transactional_connection_1.TransactionalConnection,
        channel_service_1.ChannelService,
        stock_movement_service_1.StockMovementService,
        translatable_saver_1.TranslatableSaver,
        index_1.RequestContextService,
        index_1.ProductVariantService,
        index_1.RoleService,
        index_1.AssetService])
], FastImporterService);
exports.FastImporterService = FastImporterService;
//# sourceMappingURL=fast-importer.service.js.map