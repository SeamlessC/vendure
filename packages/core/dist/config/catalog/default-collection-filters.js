"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCollectionFilters = exports.productIdCollectionFilter = exports.variantIdCollectionFilter = exports.variantNameCollectionFilter = exports.facetValueCollectionFilter = exports.combineWithAndArg = exports.randomSuffix = void 0;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const nanoid_1 = require("nanoid");
const errors_1 = require("../../common/error/errors");
const product_variant_entity_1 = require("../../entity/product-variant/product-variant.entity");
const collection_filter_1 = require("./collection-filter");
/**
 * @description
 * Used to created unique key names for DB query parameters, to avoid conflicts if the
 * same filter is applied multiple times.
 */
function randomSuffix(prefix) {
    const nanoid = nanoid_1.customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 6);
    return `${prefix}_${nanoid()}`;
}
exports.randomSuffix = randomSuffix;
/**
 * @description
 * Add this to your CollectionFilter `args` object to display the standard UI component
 * for selecting the combination mode when working with multiple filters.
 */
exports.combineWithAndArg = {
    type: 'boolean',
    label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Combination mode' }],
    description: [
        {
            languageCode: generated_types_1.LanguageCode.en,
            value: 'If this filter is being combined with other filters, do all conditions need to be satisfied (AND), or just one or the other (OR)?',
        },
    ],
    defaultValue: true,
    ui: {
        component: 'combination-mode-form-input',
    },
};
/**
 * Filters for ProductVariants having the given facetValueIds (including parent Product)
 */
exports.facetValueCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        facetValueIds: {
            type: 'ID',
            list: true,
            ui: {
                component: 'facet-value-form-input',
            },
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Facet values' }],
        },
        containsAny: {
            type: 'boolean',
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Contains any' }],
            description: [
                {
                    languageCode: generated_types_1.LanguageCode.en,
                    value: 'If checked, product variants must have at least one of the selected facet values. If not checked, the variant must have all selected values.',
                },
            ],
        },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'facet-value-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Filter by facet values' }],
    apply: (qb, args) => {
        const ids = args.facetValueIds;
        if (ids.length) {
            // uuid IDs can include `-` chars, which we cannot use in a TypeORM key name.
            const safeIdsConcat = ids.join('_').replace(/-/g, '_');
            const idsName = `ids_${safeIdsConcat}`;
            const countName = `count_${safeIdsConcat}`;
            const productFacetValues = qb.connection
                .createQueryBuilder(product_variant_entity_1.ProductVariant, 'product_variant')
                .select('product_variant.id', 'variant_id')
                .addSelect('facet_value.id', 'facet_value_id')
                .leftJoin('product_variant.facetValues', 'facet_value')
                .where(`facet_value.id IN (:...${idsName})`);
            const variantFacetValues = qb.connection
                .createQueryBuilder(product_variant_entity_1.ProductVariant, 'product_variant')
                .select('product_variant.id', 'variant_id')
                .addSelect('facet_value.id', 'facet_value_id')
                .leftJoin('product_variant.product', 'product')
                .leftJoin('product.facetValues', 'facet_value')
                .where(`facet_value.id IN (:...${idsName})`);
            const union = qb.connection
                .createQueryBuilder()
                .select('union_table.variant_id')
                .from(`(${productFacetValues.getQuery()} UNION ${variantFacetValues.getQuery()})`, 'union_table')
                .groupBy('variant_id')
                .having(`COUNT(*) >= :${countName}`);
            const variantIds = qb.connection
                .createQueryBuilder()
                .select('variant_ids_table.variant_id')
                .from(`(${union.getQuery()})`, 'variant_ids_table');
            const clause = `productVariant.id IN (${variantIds.getQuery()})`;
            const params = {
                [idsName]: ids,
                [countName]: args.containsAny ? 1 : ids.length,
            };
            if (args.combineWithAnd !== false) {
                qb.andWhere(clause).setParameters(params);
            }
            else {
                qb.orWhere(clause).setParameters(params);
            }
        }
        else {
            // If no facetValueIds are specified, no ProductVariants will be matched.
            if (args.combineWithAnd !== false) {
                qb.andWhere('1 = 0');
            }
        }
        return qb;
    },
});
exports.variantNameCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        operator: {
            type: 'string',
            ui: {
                component: 'select-form-input',
                options: [
                    { value: 'startsWith' },
                    { value: 'endsWith' },
                    { value: 'contains' },
                    { value: 'doesNotContain' },
                ],
            },
        },
        term: { type: 'string' },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'variant-name-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Filter by product variant name' }],
    apply: (qb, args) => {
        let translationAlias = `variant_name_filter_translation`;
        const termName = randomSuffix(`term`);
        const translationsJoin = qb.expressionMap.joinAttributes.find(ja => ja.entityOrProperty === 'productVariant.translations');
        if (!translationsJoin) {
            qb.leftJoin('productVariant.translations', translationAlias);
        }
        else {
            translationAlias = translationsJoin.alias.name;
        }
        const LIKE = qb.connection.options.type === 'postgres' ? 'ILIKE' : 'LIKE';
        let clause;
        let params;
        switch (args.operator) {
            case 'contains':
                clause = `${translationAlias}.name ${LIKE} :${termName}`;
                params = {
                    [termName]: `%${args.term}%`,
                };
                break;
            case 'doesNotContain':
                clause = `${translationAlias}.name NOT ${LIKE} :${termName}`;
                params = {
                    [termName]: `%${args.term}%`,
                };
                break;
            case 'startsWith':
                clause = `${translationAlias}.name ${LIKE} :${termName}`;
                params = {
                    [termName]: `${args.term}%`,
                };
                break;
            case 'endsWith':
                clause = `${translationAlias}.name ${LIKE} :${termName}`;
                params = {
                    [termName]: `%${args.term}`,
                };
                break;
            default:
                throw new errors_1.UserInputError(`${args.operator} is not a valid operator`);
        }
        if (args.combineWithAnd === false) {
            return qb.orWhere(clause, params);
        }
        else {
            return qb.andWhere(clause, params);
        }
    },
});
exports.variantIdCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        variantIds: {
            type: 'ID',
            list: true,
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Product variants' }],
            ui: {
                component: 'product-multi-form-input',
                selectionMode: 'variant',
            },
        },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'variant-id-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Manually select product variants' }],
    apply: (qb, args) => {
        if (args.variantIds.length === 0) {
            return qb;
        }
        const variantIdsKey = randomSuffix(`variantIds`);
        const clause = `productVariant.id IN (:...${variantIdsKey})`;
        const params = { [variantIdsKey]: args.variantIds };
        if (args.combineWithAnd === false) {
            return qb.orWhere(clause, params);
        }
        else {
            return qb.andWhere(clause, params);
        }
    },
});
exports.productIdCollectionFilter = new collection_filter_1.CollectionFilter({
    args: {
        productIds: {
            type: 'ID',
            list: true,
            label: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Products' }],
            ui: {
                component: 'product-multi-form-input',
                selectionMode: 'product',
            },
        },
        combineWithAnd: exports.combineWithAndArg,
    },
    code: 'product-id-filter',
    description: [{ languageCode: generated_types_1.LanguageCode.en, value: 'Manually select products' }],
    apply: (qb, args) => {
        if (args.productIds.length === 0) {
            return qb;
        }
        const productIdsKey = randomSuffix(`productIds`);
        const clause = `productVariant.productId IN (:...${productIdsKey})`;
        const params = { [productIdsKey]: args.productIds };
        if (args.combineWithAnd === false) {
            return qb.orWhere(clause, params);
        }
        else {
            return qb.andWhere(clause, params);
        }
    },
});
exports.defaultCollectionFilters = [
    exports.facetValueCollectionFilter,
    exports.variantNameCollectionFilter,
    exports.variantIdCollectionFilter,
    exports.productIdCollectionFilter,
];
//# sourceMappingURL=default-collection-filters.js.map