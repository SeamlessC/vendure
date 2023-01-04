import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Permission, ProductDetail, ProductVariant } from '@vendure/admin-ui/core';
import { PaginationConfig, SelectedAssets } from '../product-detail/product-detail.component';
export declare class ProductVariantsTableComponent implements OnInit, OnDestroy {
    private changeDetector;
    formArray: FormArray;
    variants: ProductVariant.Fragment[];
    paginationConfig: PaginationConfig;
    channelPriceIncludesTax: boolean;
    optionGroups: ProductDetail.OptionGroups[];
    pendingAssetChanges: {
        [variantId: string]: SelectedAssets;
    };
    formGroupMap: Map<string, FormGroup>;
    readonly updatePermission: Permission[];
    private subscription;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    trackByFn(index: number, item: any): any;
    getFeaturedAsset(variant: ProductVariant.Fragment): import("@vendure/admin-ui/core").Maybe<{
        __typename?: "Asset" | undefined;
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<import("@vendure/admin-ui/core").Asset, "id" | "createdAt" | "updatedAt" | "name" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: import("@vendure/admin-ui/core").Maybe<{
            __typename?: "Coordinate" | undefined;
        } & Pick<import("@vendure/admin-ui/core").Coordinate, "x" | "y">> | undefined;
    }> | undefined;
    optionGroupName(optionGroupId: string): string | undefined;
    private buildFormGroupMap;
}
