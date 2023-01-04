"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldsToSelect = exports.identifierFields = exports.fieldsToSelect = void 0;
exports.fieldsToSelect = [
    'sku',
    'enabled',
    'slug',
    'price',
    'priceWithTax',
    'productVariantId',
    'languageCode',
    'productId',
    'productName',
    'productVariantName',
    'description',
    'facetIds',
    'facetValueIds',
    'collectionIds',
    'channelIds',
    'productAssetId',
    'productPreview',
    'productPreviewFocalPoint',
    'productVariantAssetId',
    'productVariantPreview',
    'productVariantPreviewFocalPoint',
];
exports.identifierFields = [
    'channelId',
    'productVariantId',
    'productId',
    'productAssetId',
    'productVariantAssetId',
];
function getFieldsToSelect(includeStockStatus = false) {
    return includeStockStatus ? [...exports.fieldsToSelect, 'inStock', 'productInStock'] : exports.fieldsToSelect;
}
exports.getFieldsToSelect = getFieldsToSelect;
//# sourceMappingURL=search-strategy-common.js.map