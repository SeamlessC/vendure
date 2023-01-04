import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Asset, ModalService, Permission } from '@vendure/admin-ui/core';
export interface AssetChange {
    assets: Asset[];
    featuredAsset: Asset | undefined;
}
/**
 * A component which displays the Assets, and allows assets to be removed and
 * added, and for the featured asset to be set.
 *
 * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
 * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
 */
export declare class AssetsComponent {
    private modalService;
    private changeDetector;
    set assetsSetter(val: Asset[]);
    featuredAsset: Asset | undefined;
    compact: boolean;
    change: EventEmitter<AssetChange>;
    assets: Asset[];
    updatePermissions: string | string[] | Permission | Permission[];
    constructor(modalService: ModalService, changeDetector: ChangeDetectorRef);
    selectAssets(): void;
    setAsFeatured(asset: Asset): void;
    isFeatured(asset: Asset): boolean;
    previewAsset(asset: Asset): void;
    removeAsset(asset: Asset): void;
    private emitChangeEvent;
    dropListDropped(event: CdkDragDrop<number>): void;
}
