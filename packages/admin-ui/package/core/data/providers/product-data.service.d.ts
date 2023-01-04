import { AddOptionGroupToProduct, AssignProductsToChannelInput, AssignProductVariantsToChannelInput, CreateProductInput, CreateProductOptionGroupInput, CreateProductOptionInput, CreateProductVariantInput, CreateTagInput, ProductListOptions, ProductVariantListOptions, RemoveOptionGroupFromProduct, RemoveProductsFromChannelInput, RemoveProductVariantsFromChannelInput, TagListOptions, UpdateAssetInput, UpdateProductInput, UpdateProductOptionGroupInput, UpdateProductOptionInput, UpdateProductVariantInput, UpdateTagInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class ProductDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    searchProducts(term: string, take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").SearchProductsQuery, import("../../common/generated-types").Exact<{
        input: import("../../common/generated-types").SearchInput;
    }>>;
    productSelectorSearch(term: string, take: number): import("../query-result").QueryResult<import("../../common/generated-types").ProductSelectorSearchQuery, import("../../common/generated-types").Exact<{
        term: string;
        take: number;
    }>>;
    reindex(): import("rxjs").Observable<import("../../common/generated-types").ReindexMutation>;
    getPendingSearchIndexUpdates(): import("../query-result").QueryResult<import("../../common/generated-types").GetPendingSearchIndexUpdatesQuery, Record<string, any>>;
    runPendingSearchIndexUpdates(): import("rxjs").Observable<import("../../common/generated-types").RunPendingSearchIndexUpdatesMutation>;
    getProducts(options: ProductListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetProductListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<ProductListOptions> | undefined;
    }>>;
    getProduct(id: string, variantListOptions?: ProductVariantListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetProductWithVariantsQuery, import("../../common/generated-types").Exact<{
        id: string;
        variantListOptions?: import("../../common/generated-types").Maybe<ProductVariantListOptions> | undefined;
    }>>;
    getProductSimple(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductSimpleQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductVariantsSimple(options: ProductVariantListOptions, productId?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantListSimpleQuery, import("../../common/generated-types").Exact<{
        options: ProductVariantListOptions;
        productId?: import("../../common/generated-types").Maybe<string> | undefined;
    }>>;
    getProductVariants(options: ProductVariantListOptions, productId?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantListQuery, import("../../common/generated-types").Exact<{
        options: ProductVariantListOptions;
        productId?: import("../../common/generated-types").Maybe<string> | undefined;
    }>>;
    getProductVariant(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductVariantsOptions(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductVariantOptionsQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getProductOptionGroup(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductOptionGroupQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createProduct(product: CreateProductInput): import("rxjs").Observable<import("../../common/generated-types").CreateProductMutation>;
    updateProduct(product: UpdateProductInput): import("rxjs").Observable<import("../../common/generated-types").UpdateProductMutation>;
    deleteProduct(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteProductMutation>;
    deleteProducts(ids: string[]): import("rxjs").Observable<import("../../common/generated-types").DeleteProductsMutation>;
    createProductVariants(input: CreateProductVariantInput[]): import("rxjs").Observable<import("../../common/generated-types").CreateProductVariantsMutation>;
    updateProductVariants(variants: UpdateProductVariantInput[]): import("rxjs").Observable<import("../../common/generated-types").UpdateProductVariantsMutation>;
    deleteProductVariant(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteProductVariantMutation>;
    createProductOptionGroups(productOptionGroup: CreateProductOptionGroupInput): import("rxjs").Observable<import("../../common/generated-types").CreateProductOptionGroupMutation>;
    addOptionGroupToProduct(variables: AddOptionGroupToProduct.Variables): import("rxjs").Observable<import("../../common/generated-types").AddOptionGroupToProductMutation>;
    addOptionToGroup(input: CreateProductOptionInput): import("rxjs").Observable<import("../../common/generated-types").AddOptionToGroupMutation>;
    deleteProductOption(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteProductOptionMutation>;
    removeOptionGroupFromProduct(variables: RemoveOptionGroupFromProduct.Variables): import("rxjs").Observable<import("../../common/generated-types").RemoveOptionGroupFromProductMutation>;
    updateProductOption(input: UpdateProductOptionInput): import("rxjs").Observable<import("../../common/generated-types").UpdateProductOptionMutation>;
    updateProductOptionGroup(input: UpdateProductOptionGroupInput): import("rxjs").Observable<import("../../common/generated-types").UpdateProductOptionGroupMutation>;
    getProductOptionGroups(filterTerm?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetProductOptionGroupsQuery, import("../../common/generated-types").Exact<{
        filterTerm?: import("../../common/generated-types").Maybe<string> | undefined;
    }>>;
    getAssetList(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetAssetListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<import("../../common/generated-types").AssetListOptions> | undefined;
    }>>;
    getAsset(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetAssetQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createAssets(files: File[]): import("rxjs").Observable<import("../../common/generated-types").CreateAssetsMutation>;
    updateAsset(input: UpdateAssetInput): import("rxjs").Observable<import("../../common/generated-types").UpdateAssetMutation>;
    deleteAssets(ids: string[], force: boolean): import("rxjs").Observable<import("../../common/generated-types").DeleteAssetsMutation>;
    assignProductsToChannel(input: AssignProductsToChannelInput): import("rxjs").Observable<import("../../common/generated-types").AssignProductsToChannelMutation>;
    removeProductsFromChannel(input: RemoveProductsFromChannelInput): import("rxjs").Observable<import("../../common/generated-types").RemoveProductsFromChannelMutation>;
    assignVariantsToChannel(input: AssignProductVariantsToChannelInput): import("rxjs").Observable<import("../../common/generated-types").AssignVariantsToChannelMutation>;
    removeVariantsFromChannel(input: RemoveProductVariantsFromChannelInput): import("rxjs").Observable<import("../../common/generated-types").RemoveVariantsFromChannelMutation>;
    getTag(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetTagQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    getTagList(options?: TagListOptions): import("../query-result").QueryResult<import("../../common/generated-types").GetTagListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<TagListOptions> | undefined;
    }>>;
    createTag(input: CreateTagInput): import("rxjs").Observable<import("../../common/generated-types").CreateTagMutation>;
    updateTag(input: UpdateTagInput): import("rxjs").Observable<import("../../common/generated-types").UpdateTagMutation>;
    deleteTag(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteTagMutation>;
}
