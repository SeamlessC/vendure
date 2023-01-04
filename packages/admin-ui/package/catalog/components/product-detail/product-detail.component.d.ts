import { Location } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset, BaseDetailComponent, CustomFieldConfig, DataService, FacetWithValues, GetProductWithVariants, GlobalFlag, LanguageCode, ModalService, NotificationService, Permission, ProductDetail, ProductVariant, ServerConfigService, TaxCategory, UpdateProductOptionInput } from '@vendure/admin-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDetailService } from '../../providers/product-detail/product-detail.service';
import { CreateProductVariantsConfig } from '../generate-product-variants/generate-product-variants.component';
import { VariantAssetChange } from '../product-variants-list/product-variants-list.component';
export declare type TabName = 'details' | 'variants';
export interface VariantFormValue {
    id: string;
    enabled: boolean;
    sku: string;
    name: string;
    price: number;
    priceWithTax: number;
    taxCategoryId: string;
    stockOnHand: number;
    useGlobalOutOfStockThreshold: boolean;
    outOfStockThreshold: number;
    trackInventory: GlobalFlag;
    facetValueIds: string[];
    customFields?: any;
}
export interface SelectedAssets {
    assets?: Asset[];
    featuredAsset?: Asset;
}
export interface PaginationConfig {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
}
export declare class ProductDetailComponent extends BaseDetailComponent<GetProductWithVariants.Product> implements OnInit, OnDestroy {
    private productDetailService;
    private formBuilder;
    private modalService;
    private notificationService;
    protected dataService: DataService;
    private location;
    private changeDetector;
    activeTab$: Observable<TabName>;
    product$: Observable<GetProductWithVariants.Product>;
    variants$: Observable<ProductVariant.Fragment[]>;
    taxCategories$: Observable<TaxCategory.Fragment[]>;
    customFields: CustomFieldConfig[];
    customVariantFields: CustomFieldConfig[];
    customOptionGroupFields: CustomFieldConfig[];
    customOptionFields: CustomFieldConfig[];
    detailForm: FormGroup;
    filterInput: FormControl;
    assetChanges: SelectedAssets;
    variantAssetChanges: {
        [variantId: string]: SelectedAssets;
    };
    variantFacetValueChanges: {
        [variantId: string]: string[];
    };
    productChannels$: Observable<ProductDetail.Channels[]>;
    facetValues$: Observable<ProductDetail.FacetValues[]>;
    facets$: Observable<FacetWithValues.Fragment[]>;
    totalItems$: Observable<number>;
    currentPage$: BehaviorSubject<number>;
    itemsPerPage$: BehaviorSubject<number>;
    paginationConfig$: Observable<PaginationConfig>;
    selectedVariantIds: string[];
    variantDisplayMode: 'card' | 'table';
    createVariantsConfig: CreateProductVariantsConfig;
    channelPriceIncludesTax$: Observable<boolean>;
    private productVariantMap;
    readonly updatePermissions: Permission[];
    constructor(route: ActivatedRoute, router: Router, serverConfigService: ServerConfigService, productDetailService: ProductDetailService, formBuilder: FormBuilder, modalService: ModalService, notificationService: NotificationService, dataService: DataService, location: Location, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    navigateToTab(tabName: TabName): void;
    isDefaultChannel(channelCode: string): boolean;
    setPage(page: number): void;
    setItemsPerPage(value: string): void;
    assignToChannel(): void;
    removeFromChannel(channelId: string): void;
    assignVariantToChannel(variant: ProductVariant.Fragment): import("rxjs").Subscription;
    removeVariantFromChannel({ channelId, variant, }: {
        channelId: string;
        variant: ProductVariant.Fragment;
    }): void;
    assetsChanged(): boolean;
    variantAssetsChanged(): boolean;
    variantAssetChange(event: VariantAssetChange): void;
    /**
     * If creating a new product, automatically generate the slug based on the product name.
     */
    updateSlug(nameValue: string): void;
    selectProductFacetValue(): void;
    updateProductOption(input: UpdateProductOptionInput & {
        autoUpdate: boolean;
    }): void;
    removeProductFacetValue(facetValueId: string): void;
    /**
     * Opens a dialog to select FacetValues to apply to the select ProductVariants.
     */
    selectVariantFacetValue(selectedVariantIds: string[]): void;
    variantsToCreateAreValid(): boolean;
    private displayFacetValueModal;
    create(): void;
    save(): void;
    canDeactivate(): boolean;
    /**
     * Sets the values of the form on changes to the product or current language.
     */
    protected setFormValues(product: GetProductWithVariants.Product, languageCode: LanguageCode): void;
    private buildVariantFormArray;
    /**
     * Given a product and the value of the detailForm, this method creates an updated copy of the product which
     * can then be persisted to the API.
     */
    private getUpdatedProduct;
    /**
     * Given an array of product variants and the values from the detailForm, this method creates an new array
     * which can be persisted to the API.
     */
    private getUpdatedProductVariants;
    private getProductFormGroup;
    /**
     * The server may alter the slug value in order to normalize and ensure uniqueness upon saving.
     */
    private updateSlugAfterSave;
}
