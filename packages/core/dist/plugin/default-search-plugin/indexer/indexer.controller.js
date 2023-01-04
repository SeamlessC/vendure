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
exports.IndexerController = exports.workerLoggerCtx = exports.variantRelations = exports.productRelations = exports.BATCH_SIZE = void 0;
const common_1 = require("@nestjs/common");
const unique_1 = require("@vendure/common/lib/unique");
const FindOptionsUtils_1 = require("typeorm/find-options/FindOptionsUtils");
const request_context_cache_service_1 = require("../../../cache/request-context-cache.service");
const async_queue_1 = require("../../../common/async-queue");
const utils_1 = require("../../../common/utils");
const config_service_1 = require("../../../config/config.service");
const vendure_logger_1 = require("../../../config/logger/vendure-logger");
const transactional_connection_1 = require("../../../connection/transactional-connection");
const product_variant_entity_1 = require("../../../entity/product-variant/product-variant.entity");
const product_entity_1 = require("../../../entity/product/product.entity");
const product_price_applicator_1 = require("../../../service/helpers/product-price-applicator/product-price-applicator");
const product_variant_service_1 = require("../../../service/services/product-variant.service");
const constants_1 = require("../constants");
const search_index_item_entity_1 = require("../entities/search-index-item.entity");
const mutable_request_context_1 = require("./mutable-request-context");
exports.BATCH_SIZE = 1000;
exports.productRelations = ['featuredAsset', 'facetValues', 'facetValues.facet', 'channels'];
exports.variantRelations = [
    'featuredAsset',
    'facetValues',
    'facetValues.facet',
    'collections',
    'taxCategory',
    'channels',
    'channels.defaultTaxZone',
];
exports.workerLoggerCtx = 'DefaultSearchPlugin Worker';
let IndexerController = class IndexerController {
    constructor(connection, productPriceApplicator, configService, requestContextCache, productVariantService, options) {
        this.connection = connection;
        this.productPriceApplicator = productPriceApplicator;
        this.configService = configService;
        this.requestContextCache = requestContextCache;
        this.productVariantService = productVariantService;
        this.options = options;
        this.queue = new async_queue_1.AsyncQueue('search-index');
    }
    reindex({ ctx: rawContext }) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(rawContext);
        return utils_1.asyncObservable(async (observer) => {
            const timeStart = Date.now();
            const qb = this.getSearchIndexQueryBuilder(ctx, ctx.channelId);
            const count = await qb.getCount();
            vendure_logger_1.Logger.verbose(`Reindexing ${count} variants for channel ${ctx.channel.code}`, exports.workerLoggerCtx);
            const batches = Math.ceil(count / exports.BATCH_SIZE);
            await this.connection
                .getRepository(ctx, search_index_item_entity_1.SearchIndexItem)
                .delete({ languageCode: ctx.languageCode, channelId: ctx.channelId });
            vendure_logger_1.Logger.verbose('Deleted existing index items', exports.workerLoggerCtx);
            for (let i = 0; i < batches; i++) {
                vendure_logger_1.Logger.verbose(`Processing batch ${i + 1} of ${batches}`, exports.workerLoggerCtx);
                const variants = await qb
                    .take(exports.BATCH_SIZE)
                    .skip(i * exports.BATCH_SIZE)
                    .getMany();
                await this.saveVariants(ctx, variants);
                observer.next({
                    total: count,
                    completed: Math.min((i + 1) * exports.BATCH_SIZE, count),
                    duration: +new Date() - timeStart,
                });
            }
            vendure_logger_1.Logger.verbose(`Completed reindexing`, exports.workerLoggerCtx);
            return {
                total: count,
                completed: count,
                duration: +new Date() - timeStart,
            };
        });
    }
    updateVariantsById({ ctx: rawContext, ids, }) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(rawContext);
        return utils_1.asyncObservable(async (observer) => {
            const timeStart = Date.now();
            if (ids.length) {
                const batches = Math.ceil(ids.length / exports.BATCH_SIZE);
                vendure_logger_1.Logger.verbose(`Updating ${ids.length} variants...`);
                for (let i = 0; i < batches; i++) {
                    const begin = i * exports.BATCH_SIZE;
                    const end = begin + exports.BATCH_SIZE;
                    vendure_logger_1.Logger.verbose(`Updating ids from index ${begin} to ${end}`);
                    const batchIds = ids.slice(begin, end);
                    const batch = await this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).findByIds(batchIds, {
                        relations: exports.variantRelations,
                        where: { deletedAt: null },
                    });
                    await this.saveVariants(ctx, batch);
                    observer.next({
                        total: ids.length,
                        completed: Math.min((i + 1) * exports.BATCH_SIZE, ids.length),
                        duration: +new Date() - timeStart,
                    });
                }
            }
            vendure_logger_1.Logger.verbose(`Completed reindexing!`);
            return {
                total: ids.length,
                completed: ids.length,
                duration: +new Date() - timeStart,
            };
        });
    }
    async updateProduct(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        return this.updateProductInChannel(ctx, data.productId, ctx.channelId);
    }
    async updateVariants(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        return this.updateVariantsInChannel(ctx, data.variantIds, ctx.channelId);
    }
    async deleteProduct(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        return this.deleteProductInChannel(ctx, data.productId, ctx.channelId);
    }
    async deleteVariant(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        const variants = await this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).findByIds(data.variantIds);
        if (variants.length) {
            const languageVariants = unique_1.unique([
                ...variants
                    .reduce((vt, v) => [...vt, ...v.translations], [])
                    .map(t => t.languageCode),
            ]);
            await this.removeSearchIndexItems(ctx, ctx.channelId, variants.map(v => v.id), languageVariants);
        }
        return true;
    }
    async assignProductToChannel(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        return this.updateProductInChannel(ctx, data.productId, data.channelId);
    }
    async removeProductFromChannel(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        return this.deleteProductInChannel(ctx, data.productId, data.channelId);
    }
    async assignVariantToChannel(data) {
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        return this.updateVariantsInChannel(ctx, [data.productVariantId], data.channelId);
    }
    async removeVariantFromChannel(data) {
        var _a;
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        const variant = await this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).findOne(data.productVariantId);
        const languageVariants = (_a = variant === null || variant === void 0 ? void 0 : variant.translations.map(t => t.languageCode)) !== null && _a !== void 0 ? _a : [];
        await this.removeSearchIndexItems(ctx, data.channelId, [data.productVariantId], languageVariants);
        return true;
    }
    async updateAsset(data) {
        const id = data.asset.id;
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        function getFocalPoint(point) {
            return point && point.x && point.y ? point : null;
        }
        const focalPoint = getFocalPoint(data.asset.focalPoint);
        await this.connection
            .getRepository(ctx, search_index_item_entity_1.SearchIndexItem)
            .update({ productAssetId: id }, { productPreviewFocalPoint: focalPoint });
        await this.connection
            .getRepository(ctx, search_index_item_entity_1.SearchIndexItem)
            .update({ productVariantAssetId: id }, { productVariantPreviewFocalPoint: focalPoint });
        return true;
    }
    async deleteAsset(data) {
        const id = data.asset.id;
        const ctx = mutable_request_context_1.MutableRequestContext.deserialize(data.ctx);
        await this.connection
            .getRepository(ctx, search_index_item_entity_1.SearchIndexItem)
            .update({ productAssetId: id }, { productAssetId: null });
        await this.connection
            .getRepository(ctx, search_index_item_entity_1.SearchIndexItem)
            .update({ productVariantAssetId: id }, { productVariantAssetId: null });
        return true;
    }
    async updateProductInChannel(ctx, productId, channelId) {
        const product = await this.connection.getRepository(ctx, product_entity_1.Product).findOne(productId, {
            relations: ['variants'],
        });
        if (product) {
            const updatedVariants = await this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).findByIds(product.variants.map(v => v.id), {
                relations: exports.variantRelations,
                where: { deletedAt: null },
            });
            if (updatedVariants.length === 0) {
                await this.saveSyntheticVariant(ctx, product);
            }
            else {
                if (product.enabled === false) {
                    updatedVariants.forEach(v => (v.enabled = false));
                }
                const variantsInCurrentChannel = updatedVariants.filter(v => !!v.channels.find(c => utils_1.idsAreEqual(c.id, ctx.channelId)));
                vendure_logger_1.Logger.verbose(`Updating ${variantsInCurrentChannel.length} variants`, exports.workerLoggerCtx);
                if (variantsInCurrentChannel.length) {
                    await this.saveVariants(ctx, variantsInCurrentChannel);
                }
            }
        }
        return true;
    }
    async updateVariantsInChannel(ctx, variantIds, channelId) {
        const variants = await this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).findByIds(variantIds, {
            relations: exports.variantRelations,
            where: { deletedAt: null },
        });
        if (variants) {
            vendure_logger_1.Logger.verbose(`Updating ${variants.length} variants`, exports.workerLoggerCtx);
            await this.saveVariants(ctx, variants);
        }
        return true;
    }
    async deleteProductInChannel(ctx, productId, channelId) {
        const product = await this.connection.getRepository(ctx, product_entity_1.Product).findOne(productId, {
            relations: ['variants'],
        });
        if (product) {
            const languageVariants = unique_1.unique([
                ...product.translations.map(t => t.languageCode),
                ...product.variants
                    .reduce((vt, v) => [...vt, ...v.translations], [])
                    .map(t => t.languageCode),
            ]);
            const removedVariantIds = product.variants.map(v => v.id);
            if (removedVariantIds.length) {
                await this.removeSearchIndexItems(ctx, channelId, removedVariantIds, languageVariants);
            }
        }
        return true;
    }
    getSearchIndexQueryBuilder(ctx, channelId) {
        const qb = this.connection.getRepository(ctx, product_variant_entity_1.ProductVariant).createQueryBuilder('variants');
        FindOptionsUtils_1.FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
            relations: exports.variantRelations,
        });
        FindOptionsUtils_1.FindOptionsUtils.joinEagerRelations(qb, qb.alias, this.connection.rawConnection.getMetadata(product_variant_entity_1.ProductVariant));
        qb.leftJoin('variants.product', 'product')
            .leftJoin('product.channels', 'channel')
            .where('channel.id = :channelId', { channelId })
            .andWhere('product.deletedAt IS NULL')
            .andWhere('variants.deletedAt IS NULL');
        return qb;
    }
    async saveVariants(ctx, variants) {
        const items = [];
        await this.removeSyntheticVariants(ctx, variants);
        const productMap = new Map();
        for (const variant of variants) {
            let product = productMap.get(variant.productId);
            if (!product) {
                product = await this.connection.getEntityOrThrow(ctx, product_entity_1.Product, variant.productId, {
                    relations: exports.productRelations,
                });
                productMap.set(variant.productId, product);
            }
            const languageVariants = unique_1.unique([
                ...variant.translations.map(t => t.languageCode),
                ...product.translations.map(t => t.languageCode),
            ]);
            for (const languageCode of languageVariants) {
                const productTranslation = this.getTranslation(product, languageCode);
                const variantTranslation = this.getTranslation(variant, languageCode);
                const collectionTranslations = variant.collections.map(c => this.getTranslation(c, languageCode));
                for (const channel of variant.channels) {
                    ctx.setChannel(channel);
                    await this.productPriceApplicator.applyChannelPriceAndTax(variant, ctx);
                    const item = new search_index_item_entity_1.SearchIndexItem({
                        channelId: channel.id,
                        languageCode,
                        productVariantId: variant.id,
                        price: variant.price,
                        priceWithTax: variant.priceWithTax,
                        sku: variant.sku,
                        enabled: product.enabled === false ? false : variant.enabled,
                        slug: productTranslation.slug,
                        productId: product.id,
                        productName: productTranslation.name,
                        description: this.constrainDescription(productTranslation.description),
                        productVariantName: variantTranslation.name,
                        productAssetId: product.featuredAsset ? product.featuredAsset.id : null,
                        productPreviewFocalPoint: product.featuredAsset
                            ? product.featuredAsset.focalPoint
                            : null,
                        productVariantPreviewFocalPoint: variant.featuredAsset
                            ? variant.featuredAsset.focalPoint
                            : null,
                        productVariantAssetId: variant.featuredAsset ? variant.featuredAsset.id : null,
                        productPreview: product.featuredAsset ? product.featuredAsset.preview : '',
                        productVariantPreview: variant.featuredAsset ? variant.featuredAsset.preview : '',
                        channelIds: variant.channels.map(c => c.id),
                        facetIds: this.getFacetIds(variant, product),
                        facetValueIds: this.getFacetValueIds(variant, product),
                        collectionIds: variant.collections.map(c => c.id.toString()),
                        collectionSlugs: collectionTranslations.map(c => c.slug),
                    });
                    if (this.options.indexStockStatus) {
                        item.inStock =
                            0 < (await this.productVariantService.getSaleableStockLevel(ctx, variant));
                        const productInStock = await this.requestContextCache.get(ctx, `productVariantsStock-${variant.productId}`, () => this.connection
                            .getRepository(ctx, product_variant_entity_1.ProductVariant)
                            .find({
                            loadEagerRelations: false,
                            where: {
                                productId: variant.productId,
                            },
                        })
                            .then(_variants => Promise.all(_variants.map(v => this.productVariantService.getSaleableStockLevel(ctx, v))))
                            .then(stockLevels => stockLevels.some(stockLevel => 0 < stockLevel)));
                        item.productInStock = productInStock;
                    }
                    items.push(item);
                }
            }
        }
        await this.queue.push(() => this.connection.getRepository(ctx, search_index_item_entity_1.SearchIndexItem).save(items, { chunk: 2500 }));
    }
    /**
     * If a Product has no variants, we create a synthetic variant for the purposes
     * of making that product visible via the search query.
     */
    async saveSyntheticVariant(ctx, product) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const productTranslation = this.getTranslation(product, ctx.languageCode);
        const item = new search_index_item_entity_1.SearchIndexItem({
            channelId: ctx.channelId,
            languageCode: ctx.languageCode,
            productVariantId: 0,
            price: 0,
            priceWithTax: 0,
            sku: '',
            enabled: false,
            slug: productTranslation.slug,
            productId: product.id,
            productName: productTranslation.name,
            description: this.constrainDescription(productTranslation.description),
            productVariantName: productTranslation.name,
            productAssetId: (_b = (_a = product.featuredAsset) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null,
            productPreviewFocalPoint: (_d = (_c = product.featuredAsset) === null || _c === void 0 ? void 0 : _c.focalPoint) !== null && _d !== void 0 ? _d : null,
            productVariantPreviewFocalPoint: null,
            productVariantAssetId: null,
            productPreview: (_f = (_e = product.featuredAsset) === null || _e === void 0 ? void 0 : _e.preview) !== null && _f !== void 0 ? _f : '',
            productVariantPreview: '',
            channelIds: [ctx.channelId.toString()],
            facetIds: (_h = (_g = product.facetValues) === null || _g === void 0 ? void 0 : _g.map(fv => fv.facet.id.toString())) !== null && _h !== void 0 ? _h : [],
            facetValueIds: (_k = (_j = product.facetValues) === null || _j === void 0 ? void 0 : _j.map(fv => fv.id.toString())) !== null && _k !== void 0 ? _k : [],
            collectionIds: [],
            collectionSlugs: [],
        });
        await this.queue.push(() => this.connection.getRepository(ctx, search_index_item_entity_1.SearchIndexItem).save(item));
    }
    /**
     * Removes any synthetic variants for the given product
     */
    async removeSyntheticVariants(ctx, variants) {
        const prodIds = unique_1.unique(variants.map(v => v.productId));
        for (const productId of prodIds) {
            await this.queue.push(() => this.connection.getRepository(ctx, search_index_item_entity_1.SearchIndexItem).delete({
                productId,
                sku: '',
                price: 0,
            }));
        }
    }
    getTranslation(translatable, languageCode) {
        return (translatable.translations.find(t => t.languageCode === languageCode) ||
            translatable.translations.find(t => t.languageCode === this.configService.defaultLanguageCode) ||
            translatable.translations[0]);
    }
    getFacetIds(variant, product) {
        const facetIds = (fv) => fv.facet.id.toString();
        const variantFacetIds = variant.facetValues.map(facetIds);
        const productFacetIds = product.facetValues.map(facetIds);
        return unique_1.unique([...variantFacetIds, ...productFacetIds]);
    }
    getFacetValueIds(variant, product) {
        const facetValueIds = (fv) => fv.id.toString();
        const variantFacetValueIds = variant.facetValues.map(facetValueIds);
        const productFacetValueIds = product.facetValues.map(facetValueIds);
        return unique_1.unique([...variantFacetValueIds, ...productFacetValueIds]);
    }
    /**
     * Remove items from the search index
     */
    async removeSearchIndexItems(ctx, channelId, variantIds, languageCodes) {
        const keys = [];
        for (const productVariantId of variantIds) {
            for (const languageCode of languageCodes) {
                keys.push({
                    productVariantId,
                    channelId,
                    languageCode,
                });
            }
        }
        await this.queue.push(() => this.connection.getRepository(ctx, search_index_item_entity_1.SearchIndexItem).delete(keys));
    }
    /**
     * Prevent postgres errors from too-long indices
     * https://github.com/vendure-ecommerce/vendure/issues/745
     */
    constrainDescription(description) {
        const { type } = this.connection.rawConnection.options;
        const isPostgresLike = type === 'postgres' || type === 'aurora-data-api-pg' || type === 'cockroachdb';
        if (isPostgresLike) {
            return description.substring(0, 2600);
        }
        return description;
    }
};
IndexerController = __decorate([
    common_1.Injectable(),
    __param(5, common_1.Inject(constants_1.PLUGIN_INIT_OPTIONS)),
    __metadata("design:paramtypes", [transactional_connection_1.TransactionalConnection,
        product_price_applicator_1.ProductPriceApplicator,
        config_service_1.ConfigService,
        request_context_cache_service_1.RequestContextCacheService,
        product_variant_service_1.ProductVariantService, Object])
], IndexerController);
exports.IndexerController = IndexerController;
//# sourceMappingURL=indexer.controller.js.map