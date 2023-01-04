import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CustomFieldConfig, DataService, FacetValue, FacetWithValues, GlobalFlag, LanguageCode, ModalService, Permission, ProductDetail, ProductOptionFragment, ProductVariant, TaxCategory, UpdateProductOptionInput } from '@vendure/admin-ui/core';
import { AssetChange } from '../assets/assets.component';
import { PaginationConfig, SelectedAssets } from '../product-detail/product-detail.component';
export interface VariantAssetChange extends AssetChange {
    variantId: string;
}
export declare class ProductVariantsListComponent implements OnChanges, OnInit, OnDestroy {
    private changeDetector;
    private modalService;
    private dataService;
    formArray: FormArray;
    variants: ProductVariant.Fragment[];
    paginationConfig: PaginationConfig;
    channelPriceIncludesTax: boolean;
    taxCategories: TaxCategory[];
    facets: FacetWithValues.Fragment[];
    optionGroups: ProductDetail.OptionGroups[];
    customFields: CustomFieldConfig[];
    customOptionFields: CustomFieldConfig[];
    activeLanguage: LanguageCode;
    pendingAssetChanges: {
        [variantId: string]: SelectedAssets;
    };
    assignToChannel: EventEmitter<import("@vendure/admin-ui/core").ProductVariantFragment>;
    removeFromChannel: EventEmitter<{
        channelId: string;
        variant: ProductVariant.Fragment;
    }>;
    assetChange: EventEmitter<VariantAssetChange>;
    selectionChange: EventEmitter<string[]>;
    selectFacetValueClick: EventEmitter<string[]>;
    updateProductOption: EventEmitter<UpdateProductOptionInput & {
        autoUpdate: boolean;
    }>;
    selectedVariantIds: string[];
    formGroupMap: Map<string, FormGroup>;
    GlobalFlag: typeof GlobalFlag;
    globalTrackInventory: boolean;
    globalOutOfStockThreshold: number;
    readonly updatePermission: Permission[];
    private facetValues;
    private subscription;
    constructor(changeDetector: ChangeDetectorRef, modalService: ModalService, dataService: DataService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    isDefaultChannel(channelCode: string): boolean;
    trackById(index: number, item: ProductVariant.Fragment): string;
    inventoryIsNotTracked(formGroup: FormGroup): boolean;
    getTaxCategoryName(group: FormGroup): string;
    getStockOnHandMinValue(variant: FormGroup): any;
    getSaleableStockLevel(variant: ProductVariant.Fragment): number;
    areAllSelected(): boolean;
    onAssetChange(variantId: string, event: AssetChange): void;
    toggleSelectAll(): void;
    toggleSelectVariant(variantId: string): void;
    optionGroupName(optionGroupId: string): string | undefined;
    optionName(option: ProductOptionFragment): string;
    pendingFacetValues(variant: ProductVariant.Fragment): import("@vendure/admin-ui/core").FacetValueFragment[];
    existingFacetValues(variant: ProductVariant.Fragment): ({
        __typename?: "FacetValue" | undefined;
    } & Pick<FacetValue, "id" | "name" | "code"> & {
        facet: {
            __typename?: "Facet" | undefined;
        } & Pick<import("@vendure/admin-ui/core").Facet, "id" | "name">;
    })[];
    removeFacetValue(variant: ProductVariant.Fragment, facetValueId: string): void;
    isVariantSelected(variantId: string): boolean;
    editOption(option: ProductVariant.Options): void;
    private buildFormGroupMap;
    private getFacetValueIds;
}
