import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GetAssetList } from '../../../common/generated-types';
import { SelectionManager } from '../../../common/utilities/selection-manager';
import { ModalService } from '../../../providers/modal/modal.service';
export declare type AssetLike = GetAssetList.Items;
export declare class AssetGalleryComponent implements OnChanges {
    private modalService;
    assets: AssetLike[];
    /**
     * If true, allows multiple assets to be selected by ctrl+clicking.
     */
    multiSelect: boolean;
    canDelete: boolean;
    selectionChange: EventEmitter<({
        __typename?: "Asset" | undefined;
    } & {
        tags: ({
            __typename?: "Tag" | undefined;
        } & {
            __typename?: "Tag" | undefined;
        } & Pick<import("../../../common/generated-types").Tag, "id" | "value">)[];
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<import("../../../common/generated-types").Asset, "id" | "name" | "createdAt" | "updatedAt" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: import("../../../common/generated-types").Maybe<{
            __typename?: "Coordinate" | undefined;
        } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">> | undefined;
    })[]>;
    deleteAssets: EventEmitter<({
        __typename?: "Asset" | undefined;
    } & {
        tags: ({
            __typename?: "Tag" | undefined;
        } & {
            __typename?: "Tag" | undefined;
        } & Pick<import("../../../common/generated-types").Tag, "id" | "value">)[];
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<import("../../../common/generated-types").Asset, "id" | "name" | "createdAt" | "updatedAt" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: import("../../../common/generated-types").Maybe<{
            __typename?: "Coordinate" | undefined;
        } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">> | undefined;
    })[]>;
    selectionManager: SelectionManager<{
        __typename?: "Asset" | undefined;
    } & {
        tags: ({
            __typename?: "Tag" | undefined;
        } & {
            __typename?: "Tag" | undefined;
        } & Pick<import("../../../common/generated-types").Tag, "id" | "value">)[];
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<import("../../../common/generated-types").Asset, "id" | "name" | "createdAt" | "updatedAt" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: import("../../../common/generated-types").Maybe<{
            __typename?: "Coordinate" | undefined;
        } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">> | undefined;
    }>;
    constructor(modalService: ModalService);
    ngOnChanges(changes: SimpleChanges): void;
    toggleSelection(asset: AssetLike, event?: MouseEvent): void;
    selectMultiple(assets: AssetLike[]): void;
    isSelected(asset: AssetLike): boolean;
    lastSelected(): AssetLike;
    previewAsset(asset: AssetLike): void;
    entityInfoClick(event: MouseEvent): void;
}
