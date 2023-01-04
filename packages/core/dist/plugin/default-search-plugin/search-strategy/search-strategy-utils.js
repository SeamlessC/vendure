"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyLanguageConstraints = exports.createPlaceholderFromId = exports.createCollectionIdCountMap = exports.createFacetIdCountMap = exports.mapToSearchResult = void 0;
const unique_1 = require("@vendure/common/lib/unique");
const search_index_item_entity_1 = require("../entities/search-index-item.entity");
const search_strategy_common_1 = require("./search-strategy-common");
/**
 * Maps a raw database result to a SearchResult.
 */
function mapToSearchResult(raw, currencyCode) {
    const price = raw.minPrice !== undefined
        ? { min: raw.minPrice, max: raw.maxPrice }
        : { value: raw.si_price };
    const priceWithTax = raw.minPriceWithTax !== undefined
        ? { min: raw.minPriceWithTax, max: raw.maxPriceWithTax }
        : { value: raw.si_priceWithTax };
    const productAsset = !raw.si_productAssetId
        ? undefined
        : {
            id: raw.si_productAssetId,
            preview: raw.si_productPreview,
            focalPoint: parseFocalPoint(raw.si_productPreviewFocalPoint),
        };
    const productVariantAsset = !raw.si_productVariantAssetId
        ? undefined
        : {
            id: raw.si_productVariantAssetId,
            preview: raw.si_productVariantPreview,
            focalPoint: parseFocalPoint(raw.si_productVariantPreviewFocalPoint),
        };
    const enabled = raw.productEnabled != null ? !!Number(raw.productEnabled) : raw.si_enabled;
    return {
        sku: raw.si_sku,
        slug: raw.si_slug,
        price,
        enabled,
        priceWithTax,
        currencyCode,
        productVariantId: raw.si_productVariantId,
        productId: raw.si_productId,
        productName: raw.si_productName,
        productVariantName: raw.si_productVariantName,
        description: raw.si_description,
        facetIds: raw.si_facetIds.split(',').map((x) => x.trim()),
        facetValueIds: raw.si_facetValueIds.split(',').map((x) => x.trim()),
        collectionIds: raw.si_collectionIds.split(',').map((x) => x.trim()),
        channelIds: raw.si_channelIds.split(',').map((x) => x.trim()),
        productAsset,
        productVariantAsset,
        score: raw.score || 0,
        // @ts-ignore
        inStock: raw.si_inStock,
    };
}
exports.mapToSearchResult = mapToSearchResult;
/**
 * Given the raw query results containing rows with a `facetValues` property line "1,2,1,2",
 * this function returns a map of FacetValue ids => count of how many times they occur.
 */
function createFacetIdCountMap(facetValuesResult) {
    const result = new Map();
    for (const res of facetValuesResult) {
        const facetValueIds = unique_1.unique(res.facetValues.split(',').filter(x => x !== ''));
        for (const id of facetValueIds) {
            const count = result.get(id);
            const newCount = count ? count + 1 : 1;
            result.set(id, newCount);
        }
    }
    return result;
}
exports.createFacetIdCountMap = createFacetIdCountMap;
/**
 * Given the raw query results containing rows with a `collections` property line "1,2,1,2",
 * this function returns a map of Collection ids => count of how many times they occur.
 */
function createCollectionIdCountMap(collectionsResult) {
    const result = new Map();
    for (const res of collectionsResult) {
        const collectionIds = unique_1.unique(res.collections.split(',').filter(x => x !== ''));
        for (const id of collectionIds) {
            const count = result.get(id);
            const newCount = count ? count + 1 : 1;
            result.set(id, newCount);
        }
    }
    return result;
}
exports.createCollectionIdCountMap = createCollectionIdCountMap;
function parseFocalPoint(focalPoint) {
    if (focalPoint && typeof focalPoint === 'string') {
        try {
            return JSON.parse(focalPoint);
        }
        catch (e) {
            // fall though
        }
    }
    return;
}
function createPlaceholderFromId(id) {
    return '_' + id.toString().replace(/-/g, '_');
}
exports.createPlaceholderFromId = createPlaceholderFromId;
/**
 * Applies language constraints for {@link SearchIndexItem} query.
 *
 * @param qb QueryBuilder instance
 * @param languageCode Preferred language code
 * @param defaultLanguageCode Default language code that is used if {@link SearchIndexItem} is not available in preferred language
 */
function applyLanguageConstraints(qb, languageCode, defaultLanguageCode) {
    if (languageCode === defaultLanguageCode) {
        qb.andWhere('si.languageCode = :languageCode', { languageCode });
    }
    else {
        qb.andWhere('si.languageCode IN (:...languageCodes)', {
            languageCodes: [languageCode, defaultLanguageCode],
        });
        const joinFieldConditions = search_strategy_common_1.identifierFields.map(field => `si.${field} = sil.${field}`).join(' AND ');
        qb.leftJoin(search_index_item_entity_1.SearchIndexItem, 'sil', `
            ${joinFieldConditions}
            AND si.languageCode != sil.languageCode
            AND sil.languageCode = :languageCode
        `, {
            languageCode,
        });
        qb.andWhere('sil.languageCode IS NULL');
    }
    return qb;
}
exports.applyLanguageConstraints = applyLanguageConstraints;
//# sourceMappingURL=search-strategy-utils.js.map