import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from './shared-definitions';
export const ASSET_FRAGMENT = gql `
    fragment Asset on Asset {
        id
        createdAt
        updatedAt
        name
        fileSize
        mimeType
        type
        preview
        source
        width
        height
        focalPoint {
            x
            y
        }
    }
`;
export const TAG_FRAGMENT = gql `
    fragment Tag on Tag {
        id
        value
    }
`;
export const PRODUCT_OPTION_GROUP_FRAGMENT = gql `
    fragment ProductOptionGroup on ProductOptionGroup {
        id
        createdAt
        updatedAt
        code
        languageCode
        name
        translations {
            id
            languageCode
            name
        }
    }
`;
export const PRODUCT_OPTION_FRAGMENT = gql `
    fragment ProductOption on ProductOption {
        id
        createdAt
        updatedAt
        code
        languageCode
        name
        groupId
        translations {
            id
            languageCode
            name
        }
    }
`;
export const PRODUCT_VARIANT_FRAGMENT = gql `
    fragment ProductVariant on ProductVariant {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        price
        currencyCode
        priceWithTax
        stockOnHand
        stockAllocated
        trackInventory
        outOfStockThreshold
        useGlobalOutOfStockThreshold
        taxRateApplied {
            id
            name
            value
        }
        taxCategory {
            id
            name
        }
        sku
        options {
            ...ProductOption
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
        }
        channels {
            id
            code
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
    ${ASSET_FRAGMENT}
`;
export const PRODUCT_DETAIL_FRAGMENT = gql `
    fragment ProductDetail on Product {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        slug
        description
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        optionGroups {
            ...ProductOptionGroup
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        channels {
            id
            code
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
    ${ASSET_FRAGMENT}
`;
export const PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT = gql `
    fragment ProductOptionGroupWithOptions on ProductOptionGroup {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            name
        }
        options {
            id
            languageCode
            name
            code
            translations {
                name
            }
        }
    }
`;
export const UPDATE_PRODUCT = gql `
    mutation UpdateProduct($input: UpdateProductInput!, $variantListOptions: ProductVariantListOptions) {
        updateProduct(input: $input) {
            ...ProductDetail
            variantList(options: $variantListOptions) {
                items {
                    ...ProductVariant
                }
                totalItems
            }
        }
    }
    ${PRODUCT_DETAIL_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const CREATE_PRODUCT = gql `
    mutation CreateProduct($input: CreateProductInput!, $variantListOptions: ProductVariantListOptions) {
        createProduct(input: $input) {
            ...ProductDetail
            variantList(options: $variantListOptions) {
                items {
                    ...ProductVariant
                }
                totalItems
            }
        }
    }
    ${PRODUCT_DETAIL_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const DELETE_PRODUCT = gql `
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            result
            message
        }
    }
`;
export const DELETE_PRODUCTS = gql `
    mutation DeleteProducts($ids: [ID!]!) {
        deleteProducts(ids: $ids) {
            result
            message
        }
    }
`;
export const CREATE_PRODUCT_VARIANTS = gql `
    mutation CreateProductVariants($input: [CreateProductVariantInput!]!) {
        createProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const UPDATE_PRODUCT_VARIANTS = gql `
    mutation UpdateProductVariants($input: [UpdateProductVariantInput!]!) {
        updateProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const CREATE_PRODUCT_OPTION_GROUP = gql `
    mutation CreateProductOptionGroup($input: CreateProductOptionGroupInput!) {
        createProductOptionGroup(input: $input) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT}
`;
export const GET_PRODUCT_OPTION_GROUP = gql `
    query GetProductOptionGroup($id: ID!) {
        productOptionGroup(id: $id) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT}
`;
export const ADD_OPTION_TO_GROUP = gql `
    mutation AddOptionToGroup($input: CreateProductOptionInput!) {
        createProductOption(input: $input) {
            id
            createdAt
            updatedAt
            name
            code
            groupId
        }
    }
`;
export const ADD_OPTION_GROUP_TO_PRODUCT = gql `
    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {
        addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {
            id
            createdAt
            updatedAt
            optionGroups {
                id
                createdAt
                updatedAt
                code
                options {
                    id
                    createdAt
                    updatedAt
                    code
                }
            }
        }
    }
`;
export const REMOVE_OPTION_GROUP_FROM_PRODUCT = gql `
    mutation RemoveOptionGroupFromProduct($productId: ID!, $optionGroupId: ID!) {
        removeOptionGroupFromProduct(productId: $productId, optionGroupId: $optionGroupId) {
            ... on Product {
                id
                createdAt
                updatedAt
                optionGroups {
                    id
                    createdAt
                    updatedAt
                    code
                    options {
                        id
                        createdAt
                        updatedAt
                        code
                    }
                }
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_PRODUCT_WITH_VARIANTS = gql `
    query GetProductWithVariants($id: ID!, $variantListOptions: ProductVariantListOptions) {
        product(id: $id) {
            ...ProductDetail
            variantList(options: $variantListOptions) {
                items {
                    ...ProductVariant
                }
                totalItems
            }
        }
    }
    ${PRODUCT_DETAIL_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const GET_PRODUCT_SIMPLE = gql `
    query GetProductSimple($id: ID!) {
        product(id: $id) {
            id
            name
            featuredAsset {
                ...Asset
            }
        }
    }
    ${ASSET_FRAGMENT}
`;
export const GET_PRODUCT_LIST = gql `
    query GetProductList($options: ProductListOptions) {
        products(options: $options) {
            items {
                id
                createdAt
                updatedAt
                enabled
                languageCode
                name
                slug
                featuredAsset {
                    id
                    createdAt
                    updatedAt
                    preview
                }
            }
            totalItems
        }
    }
`;
export const GET_PRODUCT_OPTION_GROUPS = gql `
    query GetProductOptionGroups($filterTerm: String) {
        productOptionGroups(filterTerm: $filterTerm) {
            id
            createdAt
            updatedAt
            languageCode
            code
            name
            options {
                id
                createdAt
                updatedAt
                languageCode
                code
                name
            }
        }
    }
`;
export const GET_ASSET_LIST = gql `
    query GetAssetList($options: AssetListOptions) {
        assets(options: $options) {
            items {
                ...Asset
                tags {
                    ...Tag
                }
            }
            totalItems
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const GET_ASSET = gql `
    query GetAsset($id: ID!) {
        asset(id: $id) {
            ...Asset
            tags {
                ...Tag
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const CREATE_ASSETS = gql `
    mutation CreateAssets($input: [CreateAssetInput!]!) {
        createAssets(input: $input) {
            ...Asset
            ... on Asset {
                tags {
                    ...Tag
                }
            }
            ... on ErrorResult {
                message
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const UPDATE_ASSET = gql `
    mutation UpdateAsset($input: UpdateAssetInput!) {
        updateAsset(input: $input) {
            ...Asset
            tags {
                ...Tag
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
export const DELETE_ASSETS = gql `
    mutation DeleteAssets($input: DeleteAssetsInput!) {
        deleteAssets(input: $input) {
            result
            message
        }
    }
`;
export const SEARCH_PRODUCTS = gql `
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            totalItems
            items {
                enabled
                productId
                productName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                productVariantId
                productVariantName
                productVariantAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                sku
                channelIds
            }
            facetValues {
                count
                facetValue {
                    id
                    createdAt
                    updatedAt
                    name
                    facet {
                        id
                        createdAt
                        updatedAt
                        name
                    }
                }
            }
        }
    }
`;
export const PRODUCT_SELECTOR_SEARCH = gql `
    query ProductSelectorSearch($term: String!, $take: Int!) {
        search(input: { groupByProduct: false, term: $term, take: $take }) {
            items {
                productVariantId
                productVariantName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                price {
                    ... on SinglePrice {
                        value
                    }
                }
                priceWithTax {
                    ... on SinglePrice {
                        value
                    }
                }
                sku
            }
        }
    }
`;
export const UPDATE_PRODUCT_OPTION_GROUP = gql `
    mutation UpdateProductOptionGroup($input: UpdateProductOptionGroupInput!) {
        updateProductOptionGroup(input: $input) {
            ...ProductOptionGroup
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
`;
export const UPDATE_PRODUCT_OPTION = gql `
    mutation UpdateProductOption($input: UpdateProductOptionInput!) {
        updateProductOption(input: $input) {
            ...ProductOption
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
`;
export const DELETE_PRODUCT_OPTION = gql `
    mutation DeleteProductOption($id: ID!) {
        deleteProductOption(id: $id) {
            result
            message
        }
    }
`;
export const DELETE_PRODUCT_VARIANT = gql `
    mutation DeleteProductVariant($id: ID!) {
        deleteProductVariant(id: $id) {
            result
            message
        }
    }
`;
export const GET_PRODUCT_VARIANT_OPTIONS = gql `
    query GetProductVariantOptions($id: ID!) {
        product(id: $id) {
            id
            createdAt
            updatedAt
            name
            optionGroups {
                ...ProductOptionGroup
                options {
                    ...ProductOption
                }
            }
            variants {
                id
                createdAt
                updatedAt
                enabled
                name
                sku
                price
                stockOnHand
                enabled
                options {
                    id
                    createdAt
                    updatedAt
                    name
                    code
                    groupId
                }
            }
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
    ${PRODUCT_OPTION_FRAGMENT}
`;
export const ASSIGN_PRODUCTS_TO_CHANNEL = gql `
    mutation AssignProductsToChannel($input: AssignProductsToChannelInput!) {
        assignProductsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const ASSIGN_VARIANTS_TO_CHANNEL = gql `
    mutation AssignVariantsToChannel($input: AssignProductVariantsToChannelInput!) {
        assignProductVariantsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const REMOVE_PRODUCTS_FROM_CHANNEL = gql `
    mutation RemoveProductsFromChannel($input: RemoveProductsFromChannelInput!) {
        removeProductsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const REMOVE_VARIANTS_FROM_CHANNEL = gql `
    mutation RemoveVariantsFromChannel($input: RemoveProductVariantsFromChannelInput!) {
        removeProductVariantsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
export const GET_PRODUCT_VARIANT = gql `
    query GetProductVariant($id: ID!) {
        productVariant(id: $id) {
            id
            name
            sku
            stockOnHand
            stockAllocated
            stockLevel
            useGlobalOutOfStockThreshold
            featuredAsset {
                id
                preview
                focalPoint {
                    x
                    y
                }
            }
            price
            priceWithTax
            product {
                id
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
        }
    }
`;
export const GET_PRODUCT_VARIANT_LIST_SIMPLE = gql `
    query GetProductVariantListSimple($options: ProductVariantListOptions!, $productId: ID) {
        productVariants(options: $options, productId: $productId) {
            items {
                id
                name
                sku
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                product {
                    id
                    featuredAsset {
                        id
                        preview
                        focalPoint {
                            x
                            y
                        }
                    }
                }
            }
            totalItems
        }
    }
`;
export const GET_PRODUCT_VARIANT_LIST = gql `
    query GetProductVariantList($options: ProductVariantListOptions!, $productId: ID) {
        productVariants(options: $options, productId: $productId) {
            items {
                ...ProductVariant
            }
            totalItems
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
export const GET_TAG_LIST = gql `
    query GetTagList($options: TagListOptions) {
        tags(options: $options) {
            items {
                ...Tag
            }
            totalItems
        }
    }
    ${TAG_FRAGMENT}
`;
export const GET_TAG = gql `
    query GetTag($id: ID!) {
        tag(id: $id) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
export const CREATE_TAG = gql `
    mutation CreateTag($input: CreateTagInput!) {
        createTag(input: $input) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
export const UPDATE_TAG = gql `
    mutation UpdateTag($input: UpdateTagInput!) {
        updateTag(input: $input) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
export const DELETE_TAG = gql `
    mutation DeleteTag($id: ID!) {
        deleteTag(id: $id) {
            message
            result
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1kZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvZGF0YS9kZWZpbml0aW9ucy9wcm9kdWN0LWRlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQmhDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBOzs7OztDQUs5QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7OztDQWMvQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Q0FlekMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0RyQyx1QkFBdUI7TUFDdkIsY0FBYztDQUNuQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bd0NwQyw2QkFBNkI7TUFDN0IsY0FBYztDQUNuQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sMENBQTBDLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0I1RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O01BWTNCLHVCQUF1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VSxHQUFHLEdBQUcsQ0FBQTs7Ozs7O01BTXZCLFlBQVk7Q0FDakIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Q0FPNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1hbmd1bGFyJztcblxuaW1wb3J0IHsgRVJST1JfUkVTVUxUX0ZSQUdNRU5UIH0gZnJvbSAnLi9zaGFyZWQtZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgQVNTRVRfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQXNzZXQgb24gQXNzZXQge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIG5hbWVcbiAgICAgICAgZmlsZVNpemVcbiAgICAgICAgbWltZVR5cGVcbiAgICAgICAgdHlwZVxuICAgICAgICBwcmV2aWV3XG4gICAgICAgIHNvdXJjZVxuICAgICAgICB3aWR0aFxuICAgICAgICBoZWlnaHRcbiAgICAgICAgZm9jYWxQb2ludCB7XG4gICAgICAgICAgICB4XG4gICAgICAgICAgICB5XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgVEFHX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFRhZyBvbiBUYWcge1xuICAgICAgICBpZFxuICAgICAgICB2YWx1ZVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX09QVElPTl9HUk9VUF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBQcm9kdWN0T3B0aW9uR3JvdXAgb24gUHJvZHVjdE9wdGlvbkdyb3VwIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBjb2RlXG4gICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUFJPRFVDVF9PUFRJT05fRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgUHJvZHVjdE9wdGlvbiBvbiBQcm9kdWN0T3B0aW9uIHtcbiAgICAgICAgaWRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBjb2RlXG4gICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICBuYW1lXG4gICAgICAgIGdyb3VwSWRcbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX1ZBUklBTlRfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgUHJvZHVjdFZhcmlhbnQgb24gUHJvZHVjdFZhcmlhbnQge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGVuYWJsZWRcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIG5hbWVcbiAgICAgICAgcHJpY2VcbiAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgIHByaWNlV2l0aFRheFxuICAgICAgICBzdG9ja09uSGFuZFxuICAgICAgICBzdG9ja0FsbG9jYXRlZFxuICAgICAgICB0cmFja0ludmVudG9yeVxuICAgICAgICBvdXRPZlN0b2NrVGhyZXNob2xkXG4gICAgICAgIHVzZUdsb2JhbE91dE9mU3RvY2tUaHJlc2hvbGRcbiAgICAgICAgdGF4UmF0ZUFwcGxpZWQge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgdGF4Q2F0ZWdvcnkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBza3VcbiAgICAgICAgb3B0aW9ucyB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0T3B0aW9uXG4gICAgICAgIH1cbiAgICAgICAgZmFjZXRWYWx1ZXMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIGZhY2V0IHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXRzIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY29kZVxuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9PUFRJT05fRlJBR01FTlR9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX0RFVEFJTF9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBQcm9kdWN0RGV0YWlsIG9uIFByb2R1Y3Qge1xuICAgICAgICBpZFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgIGVuYWJsZWRcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIG5hbWVcbiAgICAgICAgc2x1Z1xuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXRzIHtcbiAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNsYXRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHNsdWdcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uR3JvdXBzIHtcbiAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25Hcm91cFxuICAgICAgICB9XG4gICAgICAgIGZhY2V0VmFsdWVzIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBmYWNldCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hhbm5lbHMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfT1BUSU9OX0dST1VQX0ZSQUdNRU5UfVxuICAgICR7QVNTRVRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgUFJPRFVDVF9PUFRJT05fR1JPVVBfV0lUSF9PUFRJT05TX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IFByb2R1Y3RPcHRpb25Hcm91cFdpdGhPcHRpb25zIG9uIFByb2R1Y3RPcHRpb25Hcm91cCB7XG4gICAgICAgIGlkXG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgIGNvZGVcbiAgICAgICAgbmFtZVxuICAgICAgICB0cmFuc2xhdGlvbnMge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBsYW5ndWFnZUNvZGVcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucyB7XG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9QUk9EVUNUID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVByb2R1Y3QoJGlucHV0OiBVcGRhdGVQcm9kdWN0SW5wdXQhLCAkdmFyaWFudExpc3RPcHRpb25zOiBQcm9kdWN0VmFyaWFudExpc3RPcHRpb25zKSB7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3QoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdERldGFpbFxuICAgICAgICAgICAgdmFyaWFudExpc3Qob3B0aW9uczogJHZhcmlhbnRMaXN0T3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uUHJvZHVjdFZhcmlhbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9ERVRBSUxfRlJBR01FTlR9XG4gICAgJHtQUk9EVUNUX1ZBUklBTlRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1BST0RVQ1QgPSBncWxgXG4gICAgbXV0YXRpb24gQ3JlYXRlUHJvZHVjdCgkaW5wdXQ6IENyZWF0ZVByb2R1Y3RJbnB1dCEsICR2YXJpYW50TGlzdE9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgY3JlYXRlUHJvZHVjdChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0RGV0YWlsXG4gICAgICAgICAgICB2YXJpYW50TGlzdChvcHRpb25zOiAkdmFyaWFudExpc3RPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICAuLi5Qcm9kdWN0VmFyaWFudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQUk9EVUNUX0RFVEFJTF9GUkFHTUVOVH1cbiAgICAke1BST0RVQ1RfVkFSSUFOVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfUFJPRFVDVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVQcm9kdWN0KCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZVByb2R1Y3QoaWQ6ICRpZCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1BST0RVQ1RTID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVByb2R1Y3RzKCRpZHM6IFtJRCFdISkge1xuICAgICAgICBkZWxldGVQcm9kdWN0cyhpZHM6ICRpZHMpIHtcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9QUk9EVUNUX1ZBUklBTlRTID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZVByb2R1Y3RWYXJpYW50cygkaW5wdXQ6IFtDcmVhdGVQcm9kdWN0VmFyaWFudElucHV0IV0hKSB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3RWYXJpYW50cyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0VmFyaWFudFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9WQVJJQU5UX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9QUk9EVUNUX1ZBUklBTlRTID0gZ3FsYFxuICAgIG11dGF0aW9uIFVwZGF0ZVByb2R1Y3RWYXJpYW50cygkaW5wdXQ6IFtVcGRhdGVQcm9kdWN0VmFyaWFudElucHV0IV0hKSB7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3RWYXJpYW50cyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0VmFyaWFudFxuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9WQVJJQU5UX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IENSRUFURV9QUk9EVUNUX09QVElPTl9HUk9VUCA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVQcm9kdWN0T3B0aW9uR3JvdXAoJGlucHV0OiBDcmVhdGVQcm9kdWN0T3B0aW9uR3JvdXBJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlUHJvZHVjdE9wdGlvbkdyb3VwKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25Hcm91cFdpdGhPcHRpb25zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQUk9EVUNUX09QVElPTl9HUk9VUF9XSVRIX09QVElPTlNfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BST0RVQ1RfT1BUSU9OX0dST1VQID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RPcHRpb25Hcm91cCgkaWQ6IElEISkge1xuICAgICAgICBwcm9kdWN0T3B0aW9uR3JvdXAoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uUHJvZHVjdE9wdGlvbkdyb3VwV2l0aE9wdGlvbnNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfT1BUSU9OX0dST1VQX1dJVEhfT1BUSU9OU19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBRERfT1BUSU9OX1RPX0dST1VQID0gZ3FsYFxuICAgIG11dGF0aW9uIEFkZE9wdGlvblRvR3JvdXAoJGlucHV0OiBDcmVhdGVQcm9kdWN0T3B0aW9uSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3RPcHRpb24oaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICBncm91cElkXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQUREX09QVElPTl9HUk9VUF9UT19QUk9EVUNUID0gZ3FsYFxuICAgIG11dGF0aW9uIEFkZE9wdGlvbkdyb3VwVG9Qcm9kdWN0KCRwcm9kdWN0SWQ6IElEISwgJG9wdGlvbkdyb3VwSWQ6IElEISkge1xuICAgICAgICBhZGRPcHRpb25Hcm91cFRvUHJvZHVjdChwcm9kdWN0SWQ6ICRwcm9kdWN0SWQsIG9wdGlvbkdyb3VwSWQ6ICRvcHRpb25Hcm91cElkKSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgIG9wdGlvbkdyb3VwcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgICAgb3B0aW9ucyB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBSRU1PVkVfT1BUSU9OX0dST1VQX0ZST01fUFJPRFVDVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVPcHRpb25Hcm91cEZyb21Qcm9kdWN0KCRwcm9kdWN0SWQ6IElEISwgJG9wdGlvbkdyb3VwSWQ6IElEISkge1xuICAgICAgICByZW1vdmVPcHRpb25Hcm91cEZyb21Qcm9kdWN0KHByb2R1Y3RJZDogJHByb2R1Y3RJZCwgb3B0aW9uR3JvdXBJZDogJG9wdGlvbkdyb3VwSWQpIHtcbiAgICAgICAgICAgIC4uLiBvbiBQcm9kdWN0IHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIG9wdGlvbkdyb3VwcyB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLi4uRXJyb3JSZXN1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0VSUk9SX1JFU1VMVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVF9XSVRIX1ZBUklBTlRTID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RXaXRoVmFyaWFudHMoJGlkOiBJRCEsICR2YXJpYW50TGlzdE9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnMpIHtcbiAgICAgICAgcHJvZHVjdChpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0RGV0YWlsXG4gICAgICAgICAgICB2YXJpYW50TGlzdChvcHRpb25zOiAkdmFyaWFudExpc3RPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgICAgICAuLi5Qcm9kdWN0VmFyaWFudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQUk9EVUNUX0RFVEFJTF9GUkFHTUVOVH1cbiAgICAke1BST0RVQ1RfVkFSSUFOVF9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVF9TSU1QTEUgPSBncWxgXG4gICAgcXVlcnkgR2V0UHJvZHVjdFNpbXBsZSgkaWQ6IElEISkge1xuICAgICAgICBwcm9kdWN0KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7QVNTRVRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BST0RVQ1RfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0TGlzdCgkb3B0aW9uczogUHJvZHVjdExpc3RPcHRpb25zKSB7XG4gICAgICAgIHByb2R1Y3RzKG9wdGlvbnM6ICRvcHRpb25zKSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICBlbmFibGVkXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHNsdWdcbiAgICAgICAgICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QUk9EVUNUX09QVElPTl9HUk9VUFMgPSBncWxgXG4gICAgcXVlcnkgR2V0UHJvZHVjdE9wdGlvbkdyb3VwcygkZmlsdGVyVGVybTogU3RyaW5nKSB7XG4gICAgICAgIHByb2R1Y3RPcHRpb25Hcm91cHMoZmlsdGVyVGVybTogJGZpbHRlclRlcm0pIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBvcHRpb25zIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZVxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX0FTU0VUX0xJU1QgPSBncWxgXG4gICAgcXVlcnkgR2V0QXNzZXRMaXN0KCRvcHRpb25zOiBBc3NldExpc3RPcHRpb25zKSB7XG4gICAgICAgIGFzc2V0cyhvcHRpb25zOiAkb3B0aW9ucykge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLkFzc2V0XG4gICAgICAgICAgICAgICAgdGFncyB7XG4gICAgICAgICAgICAgICAgICAgIC4uLlRhZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke0FTU0VUX0ZSQUdNRU5UfVxuICAgICR7VEFHX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9BU1NFVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRBc3NldCgkaWQ6IElEISkge1xuICAgICAgICBhc3NldChpZDogJGlkKSB7XG4gICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICAgICAgdGFncyB7XG4gICAgICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbiAgICAke1RBR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfQVNTRVRTID0gZ3FsYFxuICAgIG11dGF0aW9uIENyZWF0ZUFzc2V0cygkaW5wdXQ6IFtDcmVhdGVBc3NldElucHV0IV0hKSB7XG4gICAgICAgIGNyZWF0ZUFzc2V0cyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICAgICAgLi4uIG9uIEFzc2V0IHtcbiAgICAgICAgICAgICAgICB0YWdzIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLi4uIG9uIEVycm9yUmVzdWx0IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbiAgICAke1RBR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfQVNTRVQgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlQXNzZXQoJGlucHV0OiBVcGRhdGVBc3NldElucHV0ISkge1xuICAgICAgICB1cGRhdGVBc3NldChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Bc3NldFxuICAgICAgICAgICAgdGFncyB7XG4gICAgICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtBU1NFVF9GUkFHTUVOVH1cbiAgICAke1RBR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfQVNTRVRTID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZUFzc2V0cygkaW5wdXQ6IERlbGV0ZUFzc2V0c0lucHV0ISkge1xuICAgICAgICBkZWxldGVBc3NldHMoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU0VBUkNIX1BST0RVQ1RTID0gZ3FsYFxuICAgIHF1ZXJ5IFNlYXJjaFByb2R1Y3RzKCRpbnB1dDogU2VhcmNoSW5wdXQhKSB7XG4gICAgICAgIHNlYXJjaChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZFxuICAgICAgICAgICAgICAgIHByb2R1Y3ROYW1lXG4gICAgICAgICAgICAgICAgcHJvZHVjdEFzc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld1xuICAgICAgICAgICAgICAgICAgICBmb2NhbFBvaW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhcbiAgICAgICAgICAgICAgICAgICAgICAgIHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudElkXG4gICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnROYW1lXG4gICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRBc3NldCB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdcbiAgICAgICAgICAgICAgICAgICAgZm9jYWxQb2ludCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgICAgICB5XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2t1XG4gICAgICAgICAgICAgICAgY2hhbm5lbElkc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmFjZXRWYWx1ZXMge1xuICAgICAgICAgICAgICAgIGNvdW50XG4gICAgICAgICAgICAgICAgZmFjZXRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICBmYWNldCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUX1NFTEVDVE9SX1NFQVJDSCA9IGdxbGBcbiAgICBxdWVyeSBQcm9kdWN0U2VsZWN0b3JTZWFyY2goJHRlcm06IFN0cmluZyEsICR0YWtlOiBJbnQhKSB7XG4gICAgICAgIHNlYXJjaChpbnB1dDogeyBncm91cEJ5UHJvZHVjdDogZmFsc2UsIHRlcm06ICR0ZXJtLCB0YWtlOiAkdGFrZSB9KSB7XG4gICAgICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRJZFxuICAgICAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50TmFtZVxuICAgICAgICAgICAgICAgIHByb2R1Y3RBc3NldCB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdcbiAgICAgICAgICAgICAgICAgICAgZm9jYWxQb2ludCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgICAgICB5XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJpY2Uge1xuICAgICAgICAgICAgICAgICAgICAuLi4gb24gU2luZ2xlUHJpY2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmljZVdpdGhUYXgge1xuICAgICAgICAgICAgICAgICAgICAuLi4gb24gU2luZ2xlUHJpY2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza3VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfUFJPRFVDVF9PUFRJT05fR1JPVVAgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlUHJvZHVjdE9wdGlvbkdyb3VwKCRpbnB1dDogVXBkYXRlUHJvZHVjdE9wdGlvbkdyb3VwSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3RPcHRpb25Hcm91cChpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5Qcm9kdWN0T3B0aW9uR3JvdXBcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfT1BUSU9OX0dST1VQX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9QUk9EVUNUX09QVElPTiA9IGdxbGBcbiAgICBtdXRhdGlvbiBVcGRhdGVQcm9kdWN0T3B0aW9uKCRpbnB1dDogVXBkYXRlUHJvZHVjdE9wdGlvbklucHV0ISkge1xuICAgICAgICB1cGRhdGVQcm9kdWN0T3B0aW9uKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAke1BST0RVQ1RfT1BUSU9OX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IERFTEVURV9QUk9EVUNUX09QVElPTiA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVQcm9kdWN0T3B0aW9uKCRpZDogSUQhKSB7XG4gICAgICAgIGRlbGV0ZVByb2R1Y3RPcHRpb24oaWQ6ICRpZCkge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgREVMRVRFX1BST0RVQ1RfVkFSSUFOVCA9IGdxbGBcbiAgICBtdXRhdGlvbiBEZWxldGVQcm9kdWN0VmFyaWFudCgkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVQcm9kdWN0VmFyaWFudChpZDogJGlkKSB7XG4gICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVF9WQVJJQU5UX09QVElPTlMgPSBncWxgXG4gICAgcXVlcnkgR2V0UHJvZHVjdFZhcmlhbnRPcHRpb25zKCRpZDogSUQhKSB7XG4gICAgICAgIHByb2R1Y3QoaWQ6ICRpZCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBvcHRpb25Hcm91cHMge1xuICAgICAgICAgICAgICAgIC4uLlByb2R1Y3RPcHRpb25Hcm91cFxuICAgICAgICAgICAgICAgIG9wdGlvbnMge1xuICAgICAgICAgICAgICAgICAgICAuLi5Qcm9kdWN0T3B0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyaWFudHMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgZW5hYmxlZFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBza3VcbiAgICAgICAgICAgICAgICBwcmljZVxuICAgICAgICAgICAgICAgIHN0b2NrT25IYW5kXG4gICAgICAgICAgICAgICAgZW5hYmxlZFxuICAgICAgICAgICAgICAgIG9wdGlvbnMge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0XG4gICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgY29kZVxuICAgICAgICAgICAgICAgICAgICBncm91cElkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICR7UFJPRFVDVF9PUFRJT05fR1JPVVBfRlJBR01FTlR9XG4gICAgJHtQUk9EVUNUX09QVElPTl9GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBBU1NJR05fUFJPRFVDVFNfVE9fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBBc3NpZ25Qcm9kdWN0c1RvQ2hhbm5lbCgkaW5wdXQ6IEFzc2lnblByb2R1Y3RzVG9DaGFubmVsSW5wdXQhKSB7XG4gICAgICAgIGFzc2lnblByb2R1Y3RzVG9DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQVNTSUdOX1ZBUklBTlRTX1RPX0NIQU5ORUwgPSBncWxgXG4gICAgbXV0YXRpb24gQXNzaWduVmFyaWFudHNUb0NoYW5uZWwoJGlucHV0OiBBc3NpZ25Qcm9kdWN0VmFyaWFudHNUb0NoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgYXNzaWduUHJvZHVjdFZhcmlhbnRzVG9DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX1BST0RVQ1RTX0ZST01fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVQcm9kdWN0c0Zyb21DaGFubmVsKCRpbnB1dDogUmVtb3ZlUHJvZHVjdHNGcm9tQ2hhbm5lbElucHV0ISkge1xuICAgICAgICByZW1vdmVQcm9kdWN0c0Zyb21DaGFubmVsKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBjaGFubmVscyB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFX1ZBUklBTlRTX0ZST01fQ0hBTk5FTCA9IGdxbGBcbiAgICBtdXRhdGlvbiBSZW1vdmVWYXJpYW50c0Zyb21DaGFubmVsKCRpbnB1dDogUmVtb3ZlUHJvZHVjdFZhcmlhbnRzRnJvbUNoYW5uZWxJbnB1dCEpIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdFZhcmlhbnRzRnJvbUNoYW5uZWwoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGNoYW5uZWxzIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfUFJPRFVDVF9WQVJJQU5UID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFByb2R1Y3RWYXJpYW50KCRpZDogSUQhKSB7XG4gICAgICAgIHByb2R1Y3RWYXJpYW50KGlkOiAkaWQpIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBza3VcbiAgICAgICAgICAgIHN0b2NrT25IYW5kXG4gICAgICAgICAgICBzdG9ja0FsbG9jYXRlZFxuICAgICAgICAgICAgc3RvY2tMZXZlbFxuICAgICAgICAgICAgdXNlR2xvYmFsT3V0T2ZTdG9ja1RocmVzaG9sZFxuICAgICAgICAgICAgZmVhdHVyZWRBc3NldCB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgZm9jYWxQb2ludCB7XG4gICAgICAgICAgICAgICAgICAgIHhcbiAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByaWNlXG4gICAgICAgICAgICBwcmljZVdpdGhUYXhcbiAgICAgICAgICAgIHByb2R1Y3Qge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgZmVhdHVyZWRBc3NldCB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdcbiAgICAgICAgICAgICAgICAgICAgZm9jYWxQb2ludCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgICAgICB5XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1BST0RVQ1RfVkFSSUFOVF9MSVNUX1NJTVBMRSA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0VmFyaWFudExpc3RTaW1wbGUoJG9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnMhLCAkcHJvZHVjdElkOiBJRCkge1xuICAgICAgICBwcm9kdWN0VmFyaWFudHMob3B0aW9uczogJG9wdGlvbnMsIHByb2R1Y3RJZDogJHByb2R1Y3RJZCkge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgICAgIGZlYXR1cmVkQXNzZXQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgIGZvY2FsUG9pbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgeFxuICAgICAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb2R1Y3Qge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEFzc2V0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2NhbFBvaW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxJdGVtc1xuICAgICAgICB9XG4gICAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdFVF9QUk9EVUNUX1ZBUklBTlRfTElTVCA9IGdxbGBcbiAgICBxdWVyeSBHZXRQcm9kdWN0VmFyaWFudExpc3QoJG9wdGlvbnM6IFByb2R1Y3RWYXJpYW50TGlzdE9wdGlvbnMhLCAkcHJvZHVjdElkOiBJRCkge1xuICAgICAgICBwcm9kdWN0VmFyaWFudHMob3B0aW9uczogJG9wdGlvbnMsIHByb2R1Y3RJZDogJHByb2R1Y3RJZCkge1xuICAgICAgICAgICAgaXRlbXMge1xuICAgICAgICAgICAgICAgIC4uLlByb2R1Y3RWYXJpYW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEl0ZW1zXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtQUk9EVUNUX1ZBUklBTlRfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgR0VUX1RBR19MSVNUID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFRhZ0xpc3QoJG9wdGlvbnM6IFRhZ0xpc3RPcHRpb25zKSB7XG4gICAgICAgIHRhZ3Mob3B0aW9uczogJG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAuLi5UYWdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSXRlbXNcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBHRVRfVEFHID0gZ3FsYFxuICAgIHF1ZXJ5IEdldFRhZygkaWQ6IElEISkge1xuICAgICAgICB0YWcoaWQ6ICRpZCkge1xuICAgICAgICAgICAgLi4uVGFnXG4gICAgICAgIH1cbiAgICB9XG4gICAgJHtUQUdfRlJBR01FTlR9XG5gO1xuXG5leHBvcnQgY29uc3QgQ1JFQVRFX1RBRyA9IGdxbGBcbiAgICBtdXRhdGlvbiBDcmVhdGVUYWcoJGlucHV0OiBDcmVhdGVUYWdJbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlVGFnKGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIC4uLlRhZ1xuICAgICAgICB9XG4gICAgfVxuICAgICR7VEFHX0ZSQUdNRU5UfVxuYDtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9UQUcgPSBncWxgXG4gICAgbXV0YXRpb24gVXBkYXRlVGFnKCRpbnB1dDogVXBkYXRlVGFnSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZVRhZyhpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICAuLi5UYWdcbiAgICAgICAgfVxuICAgIH1cbiAgICAke1RBR19GUkFHTUVOVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBERUxFVEVfVEFHID0gZ3FsYFxuICAgIG11dGF0aW9uIERlbGV0ZVRhZygkaWQ6IElEISkge1xuICAgICAgICBkZWxldGVUYWcoaWQ6ICRpZCkge1xuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgIH1cbiAgICB9XG5gO1xuIl19