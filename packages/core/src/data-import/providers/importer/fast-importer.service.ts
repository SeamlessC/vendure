import { Injectable } from '@nestjs/common';
import {
    AssignAssetsToChannelInput,
    AssignProductVariantsToChannelInput,
    CreateRoleInput,
    CurrencyCode,
    LanguageCode,
    Permission,
} from '@vendure/common/lib/generated-types';
import {
    CreateProductInput,
    CreateProductOptionGroupInput,
    CreateProductOptionInput,
    CreateProductVariantInput,
} from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';
import { unique } from '@vendure/common/lib/unique';

import { RequestContext } from '../../../api/common/request-context';
import { isGraphQlErrorResult } from '../../../common';
import { TransactionalConnection } from '../../../connection/transactional-connection';
import { Asset, Role } from '../../../entity';
import { Channel } from '../../../entity/channel/channel.entity';
import { ProductOptionGroupTranslation } from '../../../entity/product-option-group/product-option-group-translation.entity';
import { ProductOptionGroup } from '../../../entity/product-option-group/product-option-group.entity';
import { ProductOptionTranslation } from '../../../entity/product-option/product-option-translation.entity';
import { ProductOption } from '../../../entity/product-option/product-option.entity';
import { ProductVariantAsset } from '../../../entity/product-variant/product-variant-asset.entity';
import { ProductVariantPrice } from '../../../entity/product-variant/product-variant-price.entity';
import { ProductVariantTranslation } from '../../../entity/product-variant/product-variant-translation.entity';
import { ProductVariant } from '../../../entity/product-variant/product-variant.entity';
import { ProductAsset } from '../../../entity/product/product-asset.entity';
import { ProductTranslation } from '../../../entity/product/product-translation.entity';
import { Product } from '../../../entity/product/product.entity';
import { TranslatableSaver } from '../../../service/helpers/translatable-saver/translatable-saver';
import {
    AssetService,
    ProductVariantService,
    RequestContextService,
    RoleService,
} from '../../../service/index';
import { ChannelService } from '../../../service/services/channel.service';
import { StockMovementService } from '../../../service/services/stock-movement.service';

import { OptionMapT } from './importer';
function makeid(length: number) {
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
const roles: CreateRoleInput[] = [
    {
        code: 'administrator',
        description: 'Administrator',
        permissions: [
            Permission.CreateCatalog,
            Permission.ReadCatalog,
            Permission.UpdateCatalog,
            Permission.DeleteCatalog,
            Permission.CreateSettings,
            Permission.ReadSettings,
            Permission.UpdateSettings,
            Permission.DeleteSettings,
            Permission.CreateCustomer,
            Permission.ReadCustomer,
            Permission.UpdateCustomer,
            Permission.DeleteCustomer,
            Permission.CreateCustomerGroup,
            Permission.ReadCustomerGroup,
            Permission.UpdateCustomerGroup,
            Permission.DeleteCustomerGroup,
            Permission.CreateOrder,
            Permission.ReadOrder,
            Permission.UpdateOrder,
            Permission.DeleteOrder,
            Permission.CreateSystem,
            Permission.ReadSystem,
            Permission.UpdateSystem,
            Permission.DeleteSystem,
        ],
    },
    {
        code: 'order-manager',
        description: 'Order manager',
        permissions: [
            Permission.CreateOrder,
            Permission.ReadOrder,
            Permission.UpdateOrder,
            Permission.DeleteOrder,
            Permission.ReadCustomer,
            Permission.ReadPaymentMethod,
            Permission.ReadShippingMethod,
            Permission.ReadPromotion,
            Permission.ReadCountry,
            Permission.ReadZone,
        ],
    },
    {
        code: 'inventory-manager',
        description: 'Inventory manager',
        permissions: [
            Permission.CreateCatalog,
            Permission.ReadCatalog,
            Permission.UpdateCatalog,
            Permission.DeleteCatalog,
            Permission.CreateTag,
            Permission.ReadTag,
            Permission.UpdateTag,
            Permission.DeleteTag,
            Permission.ReadCustomer,
        ],
    },
];
@Injectable()
export class FastImporterService {
    private defaultChannel: Channel;
    private importCtx: RequestContext;

    /** @internal */
    constructor(
        private connection: TransactionalConnection,
        private channelService: ChannelService,
        private stockMovementService: StockMovementService,
        private translatableSaver: TranslatableSaver,
        private requestContextService: RequestContextService,
        private productVariantService: ProductVariantService,
        private roleService: RoleService,
        private assetService: AssetService,
    ) {}

    /**
     * @description
     * This should be called prior to any of the import methods, as it establishes the
     * default Channel as well as the context in which the new entities will be created.
     *
     * Passing a `channel` argument means that Products and ProductVariants will be assigned
     * to that Channel.
     */
    async initialize(channel?: Channel) {
        // await this.channelService.initChannels();
        this.importCtx = channel
            ? await this.requestContextService.create({
                  apiType: 'admin',
                  channelOrToken: channel,
              })
            : RequestContext.empty();
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
        await Promise.all(
            outputChannelList.map(async channelValue => {
                await Promise.all(
                    roles.map(async role => {
                        const result = await this.createRoles(
                            this.importCtx,
                            {
                                ...role,
                                code: role.code + '-' + channelValue.code,
                                description: role.description + ' - ' + channelValue.code,
                            },
                            [channelValue],
                        );
                    }),
                );
            }),
        );
    }

    async createProduct(input: CreateProductInput): Promise<ID> {
        this.ensureInitialized();
        const product = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: Product,
            translationType: ProductTranslation,
            beforeSave: async p => {
                p.channels = unique([this.defaultChannel, this.importCtx.channel], 'id');
                if (input.facetValueIds) {
                    p.facetValues = input.facetValueIds.map(id => ({ id } as any));
                }
                if (input.featuredAssetId) {
                    p.featuredAsset = { id: input.featuredAssetId } as any;
                }
            },
        });
        if (input.assetIds) {
            const productAssets = input.assetIds.map(
                (id, i) =>
                    new ProductAsset({
                        assetId: id,
                        productId: product.id,
                        position: i,
                    }),
            );
            await this.connection
                .getRepository(this.importCtx, ProductAsset)
                .save(productAssets, { reload: false });
        }
        return product.id;
    }

    async createProductOptionGroup(input: CreateProductOptionGroupInput): Promise<ID> {
        this.ensureInitialized();
        const group = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: ProductOptionGroup,
            translationType: ProductOptionGroupTranslation,
        });
        return group.id;
    }

    async createProductOption(input: CreateProductOptionInput): Promise<ID> {
        this.ensureInitialized();
        const option = await this.translatableSaver.create({
            ctx: this.importCtx,
            input,
            entityType: ProductOption,
            translationType: ProductOptionTranslation,
            beforeSave: po => (po.group = { id: input.productOptionGroupId } as any),
        });
        return option.id;
    }

    private createRoleForChannels(ctx: RequestContext, input: CreateRoleInput, channels: Channel[]) {
        const role = new Role({
            code: input.code,
            description: input.description,
            permissions: unique([Permission.Authenticated, ...input.permissions]),
        });
        role.channels = channels;
        return this.connection.getRepository(ctx, Role).save(role);
    }
    async createRoles(ctx: RequestContext, input: CreateRoleInput, channels: Channel[]): Promise<Role> {
        const targetChannels: Channel[] = channels;
        const role = await this.createRoleForChannels(ctx, input, targetChannels);
        return role;
    }
    async addOptionGroupToProduct(productId: ID, optionGroupId: ID) {
        this.ensureInitialized();
        await this.connection
            .getRepository(this.importCtx, Product)
            .createQueryBuilder()
            .relation('optionGroups')
            .of(productId)
            .add(optionGroupId);
    }
    async assignAssetToChannel(ctx: RequestContext, input: AssignAssetsToChannelInput): Promise<Asset[]> {
        const assets = await this.connection.findByIdsInChannel(
            ctx,
            Asset,
            input.assetIds,
            ctx.channelId,
            {},
        );
        await Promise.all(
            assets.map(async asset => {
                await this.channelService.assignToChannels(ctx, Asset, asset.id, [input.channelId]);
            }),
        );
        return this.connection.findByIdsInChannel(
            ctx,
            Asset,
            assets.map(a => a.id),
            ctx.channelId,
            {},
        );
    }
    async assignProductVariantToChannels(ctx: RequestContext, input: AssignProductVariantsToChannelInput) {
        const variants = await this.connection
            .getRepository(ctx, ProductVariant)
            .findByIds(input.productVariantIds, { relations: ['taxCategory', 'assets'] });
        const priceFactor = input.priceFactor != null ? input.priceFactor : 1;
        for (const variant of variants) {
            if (variant.deletedAt) {
                continue;
            }
            await this.productVariantService.applyChannelPriceAndTax(variant, ctx);
            await this.channelService.assignToChannels(ctx, Product, variant.productId, [input.channelId]);
            await this.channelService.assignToChannels(ctx, ProductVariant, variant.id, [input.channelId]);
            const targetChannel = await this.channelService.findOne(ctx, input.channelId);
            const price = targetChannel?.pricesIncludeTax ? variant.priceWithTax : variant.price;
            await this.productVariantService.createOrUpdateProductVariantPrice(
                ctx,
                variant.id,
                Math.round(price * priceFactor),
                input.channelId,
            );
            const assetIds = variant.assets?.map(a => a.assetId) || [];
            await this.assignAssetToChannel(ctx, { channelId: input.channelId, assetIds });
        }
        const result = await this.productVariantService.findByIds(
            ctx,
            variants.map(v => v.id),
        );
        // for (const variant of variants) {
        //     this.eventBus.publish(new ProductVariantChannelEvent(ctx, variant, input.channelId, 'assigned'));
        // }
        return result;
    }
    async createProductVariant(
        input: CreateProductVariantInput,
        channelList: Channel[],
        optionsMap: OptionMapT,
    ): Promise<ID> {
        this.ensureInitialized();
        if (!input.optionIds) {
            input.optionIds = [];
        }
        if (input.price == null) {
            input.price = 0;
        }
        const channelCode = optionsMap.filter(option => option.id === input.optionIds![0]);
        const inputChannelId = channelList.filter(channel => channel.code === channelCode[0].code).pop();
        const inputWithoutPrice = {
            ...input,
        };
        delete inputWithoutPrice.price;

        const createdVariant = await this.translatableSaver.create({
            ctx: this.importCtx,
            input: inputWithoutPrice,
            entityType: ProductVariant,
            translationType: ProductVariantTranslation,
            beforeSave: async variant => {
                variant.channels = unique([this.defaultChannel, this.importCtx.channel], 'id');
                const { optionIds } = input;
                if (optionIds && optionIds.length) {
                    variant.options = optionIds.map(id => ({ id } as any));
                }
                if (input.facetValueIds) {
                    variant.facetValues = input.facetValueIds.map(id => ({ id } as any));
                }
                variant.product = { id: input.productId } as any;
                variant.taxCategory = { id: input.taxCategoryId } as any;
                if (input.featuredAssetId) {
                    variant.featuredAsset = { id: input.featuredAssetId } as any;
                }
            },
        });
        if (input.assetIds) {
            const variantAssets = input.assetIds.map(
                (id, i) =>
                    new ProductVariantAsset({
                        assetId: id,
                        productVariantId: createdVariant.id,
                        position: i,
                    }),
            );
            await this.connection
                .getRepository(this.importCtx, ProductVariantAsset)
                .save(variantAssets, { reload: false });
        }
        if (input.stockOnHand != null && input.stockOnHand !== 0) {
            await this.stockMovementService.adjustProductVariantStock(
                this.importCtx,
                createdVariant.id,
                0,
                input.stockOnHand,
            );
        }
        const assignedChannelIds = unique([this.defaultChannel, this.importCtx.channel], 'id').map(c => c.id);
        for (const channelId of assignedChannelIds) {
            const variantPrice = new ProductVariantPrice({
                price: input.price,
                channelId,
            });
            variantPrice.variant = createdVariant;
            await this.connection
                .getRepository(this.importCtx, ProductVariantPrice)
                .save(variantPrice, { reload: false });
        }
        const output = await this.assignProductVariantToChannels(this.importCtx, {
            channelId: inputChannelId!.id,
            productVariantIds: [createdVariant.id],
            priceFactor: 1,
        });
        // console.log(output);
        return createdVariant.id;
    }

    private ensureInitialized() {
        if (!this.defaultChannel || !this.importCtx) {
            throw new Error(
                `The FastImporterService must be initialized with a call to 'initialize()' before importing data`,
            );
        }
    }
}
